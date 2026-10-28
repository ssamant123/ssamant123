# Contralateral Nodal Metastasis in HPV-Associated Oropharyngeal SCC: The Northwestern TORS Experience

**PI:** Sandeep Samant, MD, Department of Otolaryngology–Head and Neck Surgery, Feinberg School of Medicine
**Status:** Planning / pre-IRB · **Started:** 2026-10-28

> **This repository and the NAS project folder must never contain PHI.** Patient-level data lives only in
> Northwestern REDCap (or another NU/NM-approved store named in the IRB data security plan). The NAS holds
> literature, protocol and IRB drafts, analysis code, manuscript drafts, and figures, plus de-identified
> analytic extracts only if the approved IRB allows that. See `03_data_collection/DATA_HANDLING.md`.

---

## 1. The question as first posed, and the problem with it

**Clinical controversy:** Can patients with a lateralized HPV+ OPSCC and *multiple ipsilateral nodes*
(AJCC-7 N2b; AJCC-8 cN1) safely receive ipsilateral-only treatment? Surveys suggest most radiation
oncologists still treat the contralateral neck. CCTG HN.11 tests whether lymphoscintigraphy can
select which cN0 contralateral necks to treat.

**The problem:** The ~75–80 bilateral neck dissections at Northwestern were done *because* of
features that raise contralateral risk: BOT primary, BOT or palate extension, or an equivocal or
positive contralateral node. So that cohort measures occult contralateral disease in **non-lateralized**
tumors. Taken alone, it says almost nothing about the **lateralized N2b** patient at the center of
the controversy. Those patients mostly got an ipsilateral dissection, so their contralateral
information is *follow-up failure*, not pathology. Their failure rate also depends on whether
adjuvant RT covered the contralateral neck.

The study therefore needs **two linked cohorts**, and it has to be honest about which cohort answers
which question.

| Cohort | Approx. n | Contralateral "truth" | What it answers |
|---|---|---|---|
| A. Bilateral ND | 75–80 | Pathology (pN status of contralateral neck) | Occult contralateral rate when indications are present; which indication carries the risk; whether ipsilateral nodal burden predicts it |
| B. Ipsilateral ND only | ~170 | Clinical/radiologic contralateral failure over follow-up | Real-world contralateral failure in (mostly) lateralized tumors, **stratified by contralateral RT received** |
| B-key. Lateralized, ≥2 ipsilateral pN+, **no** contralateral RT | unknown; likely small | Contralateral failure | The controversy itself |

**Retrieve the count for B-key before writing anything else.** If most adjuvant RT at NM was bilateral
in this era, B-key may be under 20 patients, and the study becomes mainly a Cohort A paper.

## 2. Statistical reality check (exact 95% Clopper–Pearson CIs)

| Observed | Rate | 95% CI | Meaning |
|---|---|---|---|
| 8/78 contralateral pN+ | 10.3% | 4.5–19.2% | Cohort A gives a usable estimate, but there are only ~8 events: **1 predictor in a multivariable model at most** |
| 0/20 contralateral failures (B-key) | 0% | 0–16.8% | **Cannot claim safety.** Upper bound is above any acceptable threshold |
| 0/40 | 0% | 0–8.8% | Still not convincing |
| 0/60 | 0% | 0–6.0% | Rule of three: ~60 events-free patients are needed to put the upper bound near 5% |
| 3/120 | 2.5% | 0.5–7.1% | Roughly the size where a "safe" claim becomes defensible |

**Implication:** A single-institution claim of "ipsilateral treatment is safe for N2b" will not survive
review. Options: (a) frame the result as a risk estimate with its CI, not a safety claim; (b) pool with
other TORS centers; (c) position the paper as pathologic ground truth that supports HN.11's premise.

## 3. Research questions

**Aim 1 (primary, Cohort A).** Among patients with a clinically and radiologically negative contralateral
neck (contralateral cN0 on blinded re-read) who underwent contralateral ND, what is the rate of pathologic
contralateral metastasis? Stratify it by indication:
- BOT primary
- Tonsil primary with BOT extension
- Tonsil primary with soft-palate extension
- Equivocal contralateral node on imaging (analyze separately; these are not truly occult)

**Aim 2 (Cohort A).** Does ipsilateral nodal burden predict contralateral pN+? Burden means the number of
pN+ nodes (0 / 1 / 2–4 / ≥5), ENE, level IV/V involvement, and largest node size. This is the
pathologic proxy for the N2b question.

**Aim 3 (Cohort B).** Contralateral regional failure (cumulative incidence, death as competing risk) after
ipsilateral ND. Stratify by contralateral treatment: none, ipsilateral-only adjuvant RT, or bilateral
adjuvant RT. Focus on the B-key subgroup.

**Aim 4 (secondary).** Quantifying midline and palate/BOT extension:
- Pathologic: mm of extension and distance from midline, if gross or margin descriptions allow
- Radiologic: distance of the primary from midline on CT/MRI/PET
- Reliability: inter-rater agreement (two blinded reviewers, κ / ICC) for "BOT involvement" and
  "palate involvement." You state these are hard to quantify; this measures how hard. It is a
  publishable finding on its own.

**Aim 5 (descriptive).** Pattern of occult contralateral disease: levels (II vs III vs IV), deposit size
(isolated tumor cells / micro / macro), and ENE. This informs which levels and doses elective treatment
needs to cover.

**Aim 6 (descriptive).** Costs of elective contralateral treatment: complications of the contralateral ND
(hematoma, chyle, CN XI/XII, bilateral IJ issues), and the effect on adjuvant RT field size. Also the
consequences of contralateral failure: salvage success, survival after salvage.

## 4. Design decisions to make now

1. **Era and HPV definition.** Use 2015-01-01 through the IRB approval date. HPV+ means p16 IHC ≥70%
   (CAP), with ISH/PCR where available. Keep p16– cases as a separate comparison cohort, not excluded.
2. **Staging.** Record raw node counts, sizes, laterality, and ENE so each case can be staged in both AJCC-7
   (N2b language that radiation oncologists still use) and AJCC-8 (pN1 ≤4 nodes).
3. **"Lateralized" needs an operational definition before data collection.** Example: tonsil/lateral
   pharyngeal wall primary, ≤1 cm extension into BOT or soft palate, ≥1 cm from midline. ASTRO and
   the PMH/O'Sullivan criteria differ, so pick one and pre-register it.
4. **Blinded radiologic re-read** of the pre-treatment contralateral neck (cN0 / equivocal / cN+), so that
   the indication category does not rely on chart wording.
5. **Adjuvant RT fields from RT plans** (Aria/Mosaiq DVH or plan summary), not from consult notes.
   Contralateral neck dose ≥ ~45–50 Gy counts as "treated."
6. **Follow-up for contralateral failure.** Most regional failures occur within 2–3 years. The analysis
   needs a minimum follow-up rule and must count patients lost to follow-up.
7. **Retrospective vs. prospective chart review.** Ask the IRB to cover follow-up accruing after approval
   (records "existing at the time of review through [date]"). Otherwise you will need an amendment to update
   outcomes.

## 5. Other things to think about

- **Multi-institutional pooling.** TORS cohorts at other centers (e.g., Mayo, Penn, MSKCC, Pittsburgh) have
  the same data. Pooling is the only realistic route to the B-key sample size. Consider building the REDCap
  instrument so it can be shared from day one.
- **Engage the HN.11 investigators** (CCTG / Canadian HN group). A surgical pathology series with blinded
  imaging is complementary to their trial, and a joint paper or abstract is plausible.
- **Lurie Cancer Center Scientific Review Committee.** Cancer-related protocols at NU go through
  scientific review before or alongside IRB. Confirm whether that applies to retrospective chart reviews.
  [likely]
- **Cohort identification.** Use an NM Enterprise Data Warehouse (NMEDW) request by CPT (TORS / radical
  tonsillectomy / BOT resection plus neck dissection codes) and ICD-10 C09.x / C10.x / C01, and cross-check
  against the surgeon case logs. Do not rely on case logs alone.
- **Pathology re-review:** decide whether you will re-review contralateral ND slides for micrometastases.
  Doing so raises the occult rate and makes it less comparable to the literature, so report both numbers.
- **Target journals:** JAMA Otolaryngology–HNS, Oral Oncology, Head & Neck, IJROBP (if framed for the
  radiation oncology audience, which is arguably the audience that matters for this question).
- **Authorship plan and roles** should be agreed before data abstraction starts: residents/fellows as
  abstractors, a radiologist for re-reads, a pathologist, a radiation oncologist, and a biostatistician.

## 6. Folder map

| Folder | Contents |
|---|---|
| `00_admin/` | Timeline, team, SRC/IRB correspondence (no PHI) |
| `01_irb/` | Draft IRB protocol (expedited, waiver of consent + HIPAA) |
| `02_literature_review/` | Evidence brief, citation table, RIS library |
| `03_data_collection/` | REDCap data dictionary, abstraction manual, data handling rules |
| `04_statistical_analysis/` | Statistical analysis plan, R code skeleton (`output/` is git-ignored) |
| `05_manuscript/` | Outline, drafts, figures, tables |
| `06_presentations/` | Abstracts, slides |

The script `setup_nas_folders.sh` creates the same tree on the NAS from the Mac Mini.
