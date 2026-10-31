#!/bin/bash
# Watchdog run by launchd every 5 minutes: mounts the Synology share, then keeps one
# `claude remote-control` server running (in tmux) for every folder listed in
# ~/claude-folders.txt. Add a folder = add a line; it goes live on the next run.

NAS_HOST="192.168.4.202"
NAS_USER="SunnyMed"
NAS_SHARE="NAS_ROOT"

MOUNT_POINT="/Volumes/${NAS_SHARE}"
FOLDERS="$HOME/claude-folders.txt"
LOG="$HOME/Library/Logs/claude-remote.log"
log() { echo "$(date '+%F %T') $*" >> "$LOG"; }

if ! mount | grep -q " on ${MOUNT_POINT} "; then
  log "mounting smb://${NAS_USER}@${NAS_HOST}/${NAS_SHARE}"
  osascript -e "mount volume \"smb://${NAS_USER}@${NAS_HOST}/${NAS_SHARE}\"" >> "$LOG" 2>&1
  for _ in $(seq 1 30); do mount | grep -q " on ${MOUNT_POINT} " && break; sleep 2; done
fi
if ! mount | grep -q " on ${MOUNT_POINT} "; then
  log "share not mounted; will retry on next run"
  exit 1
fi

[ -f "$FOLDERS" ] || { log "no $FOLDERS"; exit 0; }

# Each line: a folder path, relative to the share or absolute. Blank lines and # comments skipped.
while IFS= read -r line || [ -n "$line" ]; do
  line="${line%%#*}"; line="$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  [ -z "$line" ] && continue
  case "$line" in /*) dir="$line" ;; *) dir="${MOUNT_POINT}/${line}" ;; esac
  dir="${dir%/.}"; dir="${dir%/}"
  name="$(basename "$dir")"
  session="rc-$(printf '%s' "$name" | tr -c 'A-Za-z0-9_-' '_')"
  if [ ! -d "$dir" ]; then
    log "skipping missing folder: $dir"
    continue
  fi
  if ! tmux has-session -t "$session" 2>/dev/null; then
    log "starting $session in $dir"
    tmux new-session -d -s "$session" -c "$dir" "claude remote-control --name \"$name\""
  fi
done < "$FOLDERS"
