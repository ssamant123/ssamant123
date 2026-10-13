# Mac mini → Claude Remote Control (Synology projects)

Keeps a `claude remote-control` session running on the Mac mini, rooted in the
Synology projects share, so you can drive it from the Claude app on your phone.

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
# edit NAS_HOST / NAS_USER / NAS_SHARE at the top of ~/bin/claude-remote.sh

sed "s/YOURUSER/$(whoami)/g" com.sandeep.claude-remote.plist \
  > ~/Library/LaunchAgents/com.sandeep.claude-remote.plist
plutil -lint ~/Library/LaunchAgents/com.sandeep.claude-remote.plist

launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.sandeep.claude-remote.plist
```

## Check / manage

```bash
launchctl print gui/$(id -u)/com.sandeep.claude-remote | grep -E 'state|last exit'
tail -f ~/Library/Logs/claude-remote.log
tmux attach -t claude        # see the live session (detach: Ctrl-b d)

# reload after edits
launchctl bootout gui/$(id -u)/com.sandeep.claude-remote
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.sandeep.claude-remote.plist
```

On first run macOS may ask whether bash/tmux can access **Network Volumes**. Allow it,
or nothing under `/Volumes` will be readable.
