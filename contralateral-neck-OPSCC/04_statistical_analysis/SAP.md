# Statistical Analysis Plan (draft v0.1, 2026-10-28)

Lock this SAP before unblinded analysis. Register it on OSF if you want the "pre-specified" claim to hold.

## Populations
- **Cohort A:** p16+ OPSCC, primary surgery, bilateral ND, 2015-01-01 to IRB approval.
  - **A0 (primary analysis set):** contralateral neck negative on blinded re-read
  - **A1:** contralateral neck equivocal on re-read
  - Exclude contralateral cN+ from the occult-rate denominators
- **Cohort B:** p16+ OPSCC, primary surgery, ipsilateral ND only.
  - **B-key:** lateralized (pre-specified definition), ≥2 ipsilateral pN+, contralateral elective dose 0 Gy
- **Comparison:** p16– cases, analyzed descriptively

## Endpoints
| Endpoint | Definition | Cohort |
|---|---|---|
| Occult contralateral pN+ | ≥1 contralateral node with metastasis ≥ micromet. ITCs reported separately | A0 |
| Contralateral regional failure (CRF) | First clinical/radiologic contralateral nodal recurrence, biopsy-proven or unequivocal on imaging | B (and A for completeness) |
| Isolated CRF | CRF without concurrent local, ipsilateral, or distant failure | B |
| Salvage success | NED ≥ 2 years after salvage | Any CRF |

## Analyses
1. **Occult rate:** proportion with exact Clopper–Pearson 95% CI, overall and by indication (BOT primary /
   BOT extension / palate extension / equivocal node).
2. **Predictors of contralateral pN+ (A0):** Expect ≤10–15 events. Use univariable exact logistic regression or
   Firth logistic regression only. Ipsilateral pN count is the single pre-specified predictor, modeled as
   continuous and as 0–1 vs ≥2. Run no stepwise selection. Treat any multivariable model as exploratory and
   report it as such.
3. **CRF (Cohort B):** cumulative incidence (Aalen–Johansen) with death without CRF as a competing risk.
   Report 2- and 3-year estimates with 95% CIs, stratified by contralateral RT (none / ipsilateral-only /
   bilateral). Use Fine–Gray modeling only if there are ≥10 events.
4. **B-key:** report events/n, the exact CI, and the follow-up distribution. Use the rule of three if there are 0 events. Do not claim
   non-inferiority or "safety" unless the upper 95% bound is below a threshold pre-specified here: ____ %
   (suggest 5%, consistent with the risk most RT guidelines accept for omitting elective treatment).
5. **Inter-rater reliability (Aim 4):** Cohen's κ for categorical BOT and palate involvement, and ICC(2,1) for
   distance from midline in mm. Two blinded reviewers, n ≥ 50 cases (κ precision ±~0.15).
6. **Missing data:** Report missingness per variable. Use complete-case analysis for the primary endpoints;
   do not impute the outcome.
7. **Sensitivity analyses:**
   - Include A1 in the occult-rate denominator
   - Count ITCs as positive
   - Restrict to patients with ≥24 months of follow-up

## Software
R ≥ 4.3: `binom`, `logistf`, `tidycmprsk`, `ggsurvfit`, `irr`, `gtsummary`. Code in `code/`.
