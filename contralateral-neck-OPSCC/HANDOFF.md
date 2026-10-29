# Session Handoff: Contralateral Neck in HPV+ OPSCC (CONTRA-OPC)

**From:** Cloud Claude Code session, 2026-10-28/29
**To:** Local Claude session on the Mac Mini, working in `/Volumes/NAS_ROOT/05_PROJECTS/Research/Oropharynx`
**PI:** Sandeep Samant, MD (Northwestern, Otolaryngology–HNS)
**GitHub:** `ssamant123/ssamant123`, branch `claude/oropharyngeal-nodal-metastasis-3hsag0`, folder `contralateral-neck-OPSCC/`
(The NAS copy was made from this branch and is **not** a git repo yet.)

## Read first
1. `README.md`: design, aims, corrections to the original premise, statistical reality check
2. `02_literature_review/evidence_brief.md`: 8-theme synthesis, citation table, gap analysis, unverified leads
3. `04_statistical_analysis/SAP.md`: populations, endpoints, analyses

## The study in one paragraph
This is a retrospective review of about 250 surgically treated (TORS) OPSCC patients at Northwestern since 2015. About 75–80 had bilateral neck dissection (ND). Indications for contralateral ND were BOT primary, any BOT or palate involvement, an equivocal contralateral node, or a positive contralateral node. **Institutional policy is to omit contralateral RT when the contralateral ND is pN0.** The PI's goal is to show that this policy is safe (no contralateral nodal recurrence).

## Cohorts (decided)
| Cohort | Definition | Question |
|---|---|---|
| A0 / A1 | Bilateral ND; contralateral neck negative / equivocal on **blinded** imaging re-read | Occult contralateral pN+ rate by indication and by ipsilateral node count |
| **A-pN0 (co-primary, likely headline)** | Contralateral pN0, contralateral level II mean dose <30 Gy (sensitivity <20 Gy) | Contralateral failure when RT is omitted after pathologic staging |
| B | Ipsilateral ND only | Contralateral failure by contralateral RT received |
| B-key | Lateralized, ≥2 ipsilateral pN+, 0 Gy contralateral | The N2b controversy; probably too small to support a claim alone |

## Key conclusions reached (don't re-litigate without new information)
- **CCTG HN.11 = "SELECT" (NCT05451004).** It is a phase III non-inferiority RCT of SPECT-CT lymphatic-mapping-guided contralateral **RT** vs bilateral RT, with DFS as primary endpoint. It is *not* a surgical sentinel node trial.
- **The survey premise was too broad.** Per the 2021 international survey (PMID 33524796), 97–99% treat small N0 lateralized tonsil cancer unilaterally. Radiation oncologists go bilateral for palate/BOT extension (100%), midline proximity (84%), and higher nodal burden.
- **Occult-rate papers already exist** (Last 2020, Yao 2021, Kornfeld 2024). **"No failures after omitting RT for pN0 contralateral neck" has also been reported** (Last 2020, Wang 2025, Belau 2023). The novelty is therefore:
  - contralateral pN+ by ipsilateral node count in lateralized tumors
  - contralateral pN+ by **measured** palate/BOT extension
  - **inter-rater reliability** of palate/BOT involvement (never studied)
  - **functional payoff** of the pN0 policy (contralateral parotid/SMG dose, G-tube, MDADI) vs bilateral RT
- **"Omitted RT" must be dosimetric.** Incidental primary-bed dose to contralateral level II can reach 30–50 Gy. Pull it from the RT plans.
- **Precision:** 0/65 failures gives a 95% upper bound of 5.5%; 0/20 gives 16.8%. A single-institution "safe for N2b" claim isn't defensible; pooling (e.g., with Toronto/SELECT investigators) is the route.
- **IRB:** expedited Category 5, waiver of consent and HIPAA authorization. Request follow-up accrual after approval.

## Files produced
| Path | Status |
|---|---|
| `01_irb/CONTRA-OPC_IRB_Protocol_v0.1_2026-10-28.docx` | Draft. Built by `01_irb/build_irb_docx.py` from `background_for_irb.md`. **Not yet checked against the current NU HRP-503/eIRB+ template** (NU site was unreachable from the cloud). **Not yet updated for Aim 1b (A-pN0) or the dosimetric/functional variables.** |
| `02_literature_review/evidence_brief.md`, `references.ris` | 47 RIS entries; some PMIDs/authors flagged unverified (section 5). Imported into Zotero; PDFs downloaded by the PI. |
| `03_data_collection/redcap_data_dictionary.csv` | 81 fields, REDCap import format, includes contralateral dosimetry and function fields |
| `03_data_collection/DATA_HANDLING.md` | No PHI on the NAS or GitHub; REDCap is the system of record |
| `04_statistical_analysis/SAP.md`, `code/01_analysis_skeleton.R` | Draft. **R skeleton does not yet include the A-pN0 analysis.** The 5% "safety" threshold is still blank in the SAP. |
| `05_manuscript/outline.md`, `00_admin/timeline_and_team.md` | Drafts. Team roles are unfilled. |
| `setup_nas_folders.sh`, `move_to_nas_oropharynx.sh` | Done; already run |

## Open to-dos (in priority order)
1. **PI decisions:**
   - operational definition of "lateralized"
   - acceptable failure threshold (suggested 5%)
   - co-investigators: radiation oncology, neuroradiology, H&N pathology, biostatistics
2. **Feasibility count before anything else:** number in A-pN0 with level II <30 Gy and ≥24 months of follow-up, plus the B-key count.
3. Update the IRB draft for Aim 1b and the new variables. Check the section headings against the live NU template. Confirm whether Lurie SRC review is required.
4. Verify flagged citations against the downloaded PDFs. Read ASTRO 2024 (Margalit, PMID 39078350) for its unilateral-neck wording.
5. Add the A-pN0 analysis and the functional comparison to `01_analysis_skeleton.R`.
6. Optional: NotebookLM notebook "Oropharynx – Contralateral Neck" with the PDFs and evidence brief (manual upload by PI; check Galter licensing on AI uploads).
7. Optional: `git init` the NAS folder and link it to the GitHub branch for version history.

## Ground rules for the next session
- **No PHI** in the NAS folder, GitHub, or NotebookLM. Patient-level data lives in NU REDCap only.
- **No automated bulk downloading** through Galter EZproxy (license terms). Zotero "Find Full Text" under the PI's own login is fine.
- **Communication style (PI preference):** act as a challenging advisor, not an assistant. Lead with the uncomfortable point, tag confidence ([certain]/[likely]/[guessing]), give no stock agreement, and hold your position unless given new information.
- **Briefs and decks:** clinical/academic decks use Northwestern branding.
