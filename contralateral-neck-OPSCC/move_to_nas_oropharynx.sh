#!/usr/bin/env bash
# Run on the Mac Mini. Copies this project into <NAS>/Projects/Oropharynx.
# Usage:  ./move_to_nas_oropharynx.sh "/Volumes/<NAS_SHARE>/Projects"
# If the NAS is not mounted: Finder > Go > Connect to Server (smb://<nas>/<share>).
set -euo pipefail
PROJECTS="${1:?Pass the mounted NAS Projects path, e.g. /Volumes/Research/Projects}"
[ -d "$PROJECTS" ] || { echo "Not found or not mounted: $PROJECTS"; exit 1; }
DEST="$PROJECTS/Oropharynx"
SRC="$(cd "$(dirname "$0")" && pwd)"

if [ -d "$DEST" ] && [ -n "$(ls -A "$DEST")" ]; then
  echo "$DEST already exists and is not empty. Contents:"; ls -la "$DEST"
  read -r -p "Merge into it (existing files with the same name are kept, not overwritten)? [y/N] " ok
  [ "$ok" = "y" ] || exit 1
fi
mkdir -p "$DEST"

# Copy everything (including .gitignore). --ignore-existing never overwrites files on the NAS.
rsync -a --ignore-existing --exclude '.DS_Store' "$SRC/" "$DEST/"

# Empty working folders that git does not track
mkdir -p "$DEST"/02_literature_review/pdfs \
         "$DEST"/04_statistical_analysis/{output,deidentified_extracts_ONLY_IF_IRB_APPROVED} \
         "$DEST"/05_manuscript/{drafts,figures,tables,submission} \
         "$DEST"/01_irb/{submitted,approved,amendments} "$DEST"/06_presentations
printf 'No PHI in this folder. Patient-level data lives in Northwestern REDCap.\n' > "$DEST/README_NO_PHI.txt"

# Verify every source file arrived
missing=$(cd "$SRC" && find . -type f ! -name '.DS_Store' | while read -r f; do [ -e "$DEST/$f" ] || echo "$f"; done)
[ -z "$missing" ] && echo "Verified: all files present in $DEST" || { echo "MISSING:"; echo "$missing"; exit 1; }
