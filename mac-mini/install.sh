#!/bin/bash
# One-time installer for the Mac mini. Run:
#   curl -fsSL https://raw.githubusercontent.com/ssamant123/ssamant123/claude/mac-mini-nas-access-fbop4e/mac-mini/install.sh | bash
# Sets up an always-on Claude Remote Control server for the whole NAS share, with
# guardrails that keep Claude in 02_INBOX..05_PROJECTS. Safe to re-run.
set -e
BASE="https://raw.githubusercontent.com/ssamant123/ssamant123/claude/mac-mini-nas-access-fbop4e/mac-mini"
NAS="/Volumes/NAS_ROOT"
AGENT="$HOME/Library/LaunchAgents/com.sandeep.claude-remote.plist"

echo "1/5 Script"
mkdir -p "$HOME/bin" "$HOME/Library/Logs" "$HOME/Library/LaunchAgents"
curl -fsSL "$BASE/claude-remote.sh" -o "$HOME/bin/claude-remote.sh"
chmod +x "$HOME/bin/claude-remote.sh"

echo "2/5 Folder list (~/claude-folders.txt)"
if [ -f "$HOME/claude-folders.txt" ]; then
  cp "$HOME/claude-folders.txt" "$HOME/claude-folders.txt.bak"
fi
printf '.\n' > "$HOME/claude-folders.txt"

echo "3/5 Guardrails on the NAS"
if [ -d "$NAS" ]; then
  mkdir -p "$NAS/.claude"
  if [ ! -f "$NAS/.claude/settings.json" ]; then
    cat > "$NAS/.claude/settings.json" <<'JSON'
{
  "permissions": {
    "deny": [
      "Read(//Volumes/NAS_ROOT/99_ADMIN/**)",
      "Edit(//Volumes/NAS_ROOT/99_ADMIN/**)",
      "Read(//Volumes/NAS_ROOT/01_AUTOBACKUPS/**)",
      "Edit(//Volumes/NAS_ROOT/01_AUTOBACKUPS/**)",
      "Edit(//Volumes/NAS_ROOT/06_ARCHIVE/**)",
      "Read(//Volumes/NAS_ROOT/#recycle/**)",
      "Read(//Volumes/NAS_ROOT/#snapshot/**)",
      "Read(//Volumes/NAS_ROOT/*.sparsebundle/**)",
      "Edit(//Volumes/NAS_ROOT/*.sparsebundle/**)"
    ]
  }
}
JSON
  else
    echo "   $NAS/.claude/settings.json already exists - left unchanged"
  fi
  if [ ! -f "$NAS/CLAUDE.md" ]; then
    cat > "$NAS/CLAUDE.md" <<'MD'
# Sandeep's NAS

Work happens in these folders:
- 02_INBOX - new, unsorted files. Filing them elsewhere is a normal request.
- 03_LIBRARY - reference material (papers, manuals, documents).
- 04_SHARED - shared with family/others (e.g. 04_SHARED/Travel).
- 05_PROJECTS - active projects, one subfolder each.

Rules:
- Stay out of 99_ADMIN, 01_AUTOBACKUPS, #recycle, #snapshot and any .sparsebundle.
- 06_ARCHIVE is read-only.
- When asked to "work on X", find the matching subfolder in 02-05 and cd into it.
- New trips: copy 04_SHARED/Travel/_TEMPLATE_Trip and rename it.
- Never delete files without asking first; move to 02_INBOX/_to_delete instead.
MD
  else
    echo "   $NAS/CLAUDE.md already exists - left unchanged"
  fi
else
  echo "   $NAS is not mounted - guardrails skipped; mount the NAS and re-run"
fi

echo "4/5 Startup file"
cat > "$AGENT" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.sandeep.claude-remote</string>
  <key>ProgramArguments</key>
  <array><string>/bin/bash</string><string>$HOME/bin/claude-remote.sh</string></array>
  <key>EnvironmentVariables</key>
  <dict><key>PATH</key><string>$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string></dict>
  <key>RunAtLoad</key><true/>
  <key>StartInterval</key><integer>300</integer>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/claude-remote.launchd.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/claude-remote.launchd.log</string>
</dict>
</plist>
PLIST
plutil -lint "$AGENT" >/dev/null

echo "5/5 Starting"
tmux kill-server 2>/dev/null || true
launchctl bootout "gui/$(id -u)/com.sandeep.claude-remote" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$AGENT"
sleep 15
echo
tmux ls 2>/dev/null || echo "No session yet - see ~/Library/Logs/claude-remote.log"
echo
echo "Last step (once): run   tmux attach -t rc-NAS_ROOT"
echo "Answer any question it shows, wait for 'Connected', then press Ctrl+B then D."
