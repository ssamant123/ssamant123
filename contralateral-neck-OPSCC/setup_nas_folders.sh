#!/usr/bin/env bash
# Run on the Mac Mini. Creates the project tree on the NAS share.
# Usage: ./setup_nas_folders.sh "/Volumes/<NAS_SHARE>/Research"
# NOTE: The NAS is NOT an approved store for PHI. Patient-level data stays in NU REDCap.
set -euo pipefail
BASE="${1:?Pass the mounted NAS research path, e.g. /Volumes/Research}"
[ -d "$BASE" ] || { echo "Not mounted: $BASE"; exit 1; }
ROOT="$BASE/Contralateral_Neck_OPSCC"
for d in \
  00_admin/correspondence 00_admin/meetings \
  01_irb/submitted 01_irb/approved 01_irb/amendments \
  02_literature_review/pdfs 02_literature_review/screening \
  03_data_collection/instruments 03_data_collection/abstraction_training \
  04_statistical_analysis/code 04_statistical_analysis/output \
  04_statistical_analysis/deidentified_extracts_ONLY_IF_IRB_APPROVED \
  05_manuscript/drafts 05_manuscript/figures 05_manuscript/tables 05_manuscript/submission \
  06_presentations; do
  mkdir -p "$ROOT/$d"
done
cat > "$ROOT/README_NO_PHI.txt" <<'TXT'
No names, MRNs, dates of birth, exact dates of service, or other HIPAA identifiers in this folder.
Patient-level data lives in Northwestern REDCap. De-identified extracts only if the approved IRB data
security plan permits off-network storage.
TXT
# Optional: pull methods/code/drafts from GitHub
# git clone https://github.com/ssamant123/ssamant123.git "$ROOT/_repo"
echo "Created $ROOT"
