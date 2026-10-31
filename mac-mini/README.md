# Mac mini → Claude Remote Control (Synology projects)

Keeps one `claude remote-control` server running on the Mac mini for every folder
listed in `~/claude-folders.txt` (paths relative to the NAS share), so you can drive
any of them from the Claude app on your phone or claude.ai/code on another computer.
Add a folder = add a line; it comes online within 5 minutes.

## One-time prep

1. **Synology (DSM):** Control Panel → File Services → SMB: enabled, minimum SMB2/SMB3.
   Give the NAS a fixed IP (DHCP reservation on your router).
2. **Mac mini:** install tmux and Claude Code, log in once interactively:
   ```bash
   brew install tmux
   claude            # log in, then accept the folder-trust prompt inside the share
   ```
3. Mount the share once in Finder (⌘K → `smb://<user>@<nas>/<share>`) and tick
   **Remember this password in my keychain**. The script relies on that Keychain entry.
4. Energy settings: prevent automatic sleep; start up after power failure.

## Install

```bash
mkdir -p ~/bin
cp claude-remote.sh ~/bin/ && chmod +x ~/bin/claude-remote.sh
printf '04_SHARED/Travel\n05_PROJECTS\n' > ~/claude-folders.txt

sed "s/YOURUSER/$(whoami)/g" com.sandeep.claude-remote.plist \
  > ~/Library/LaunchAgents/com.sandeep.claude-remote.plist
plutil -lint ~/Library/LaunchAgents/com.sandeep.claude-remote.plist

launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.sandeep.claude-remote.plist
```

## Check / manage

```bash
launchctl print gui/$(id -u)/com.sandeep.claude-remote | grep -E 'state|last exit'
tail -f ~/Library/Logs/claude-remote.log
tmux ls                      # one rc-<folder> session per listed folder
tmux attach -t rc-Travel     # see one live (detach: Ctrl-b d)

# reload after edits
launchctl bootout gui/$(id -u)/com.sandeep.claude-remote
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.sandeep.claude-remote.plist
```

On first run macOS may ask whether bash/tmux can access **Network Volumes**. Allow it,
or nothing under `/Volumes` will be readable.
