#!/bin/bash
# Watchdog run by launchd: mounts the Synology share, then makes sure a
# `claude remote-control` session is running inside tmux. Safe to run repeatedly.

# ---- edit these ----
NAS_HOST="192.168.4.202"           # reserve this IP for the NAS in your router
NAS_USER="SunnyMed"                 # DSM account with SMB access
NAS_SHARE="NAS_ROOT"                # mounts at /Volumes/NAS_ROOT
PROJECTS_SUBDIR=""                 # optional subfolder inside the share, e.g. "code"
# --------------------

MOUNT_POINT="/Volumes/${NAS_SHARE}"
WORKDIR="${MOUNT_POINT}${PROJECTS_SUBDIR:+/$PROJECTS_SUBDIR}"
SESSION="claude"
LOG="$HOME/Library/Logs/claude-remote.log"

log() { echo "$(date '+%F %T') $*" >> "$LOG"; }

# 1. Mount the share (credentials come from the login Keychain).
if ! mount | grep -q " on ${MOUNT_POINT} "; then
  log "mounting smb://${NAS_USER}@${NAS_HOST}/${NAS_SHARE}"
  osascript -e "mount volume \"smb://${NAS_USER}@${NAS_HOST}/${NAS_SHARE}\"" >> "$LOG" 2>&1
fi

# Don't start Claude against an empty /Volumes path.
for _ in $(seq 1 30); do
  mount | grep -q " on ${MOUNT_POINT} " && [ -d "$WORKDIR" ] && break
  sleep 2
done
if ! mount | grep -q " on ${MOUNT_POINT} "; then
  log "share not mounted; will retry on next run"
  exit 1
fi

# 2. Start the Remote Control session if it isn't already running.
if ! tmux has-session -t "$SESSION" 2>/dev/null; then
  log "starting claude remote-control in $WORKDIR"
  tmux new-session -d -s "$SESSION" -c "$WORKDIR" "claude remote-control"
fi
