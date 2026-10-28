# Contralateral neck OPSCC - analysis skeleton (draft). Reads a DE-IDENTIFIED REDCap export.
# Path is set via env var so no data path is hard-coded in the repo.
library(dplyr); library(binom); library(logistf); library(tidycmprsk); library(ggsurvfit); library(gtsummary)

dat <- read.csv(Sys.getenv("CONTRA_DATA", stop("Set CONTRA_DATA to the de-identified export")))
dat <- dat |> filter(p16 == 1)

# ---- Cohort A0: occult contralateral pN+ ----
A0 <- dat |> filter(nd_extent == 2, contra_cn_reread == 0) |>
  mutate(contra_pos = as.integer(contra_pn_count > 0 & contra_deposit >= 2),
         ipsi_burden = cut(ipsi_pn_count, c(-Inf, 0, 1, 4, Inf), labels = c("0", "1", "2-4", ">=5")))
binom.confint(sum(A0$contra_pos), nrow(A0), methods = "exact")
A0 |> group_by(ipsi_burden) |> summarise(n = n(), pos = sum(contra_pos))
logistf(contra_pos ~ ipsi_pn_count, data = A0)   # single pre-specified predictor (Firth)

# ---- Cohort B: contralateral regional failure, competing risk of death ----
B <- dat |> filter(nd_extent == 1) |>
  mutate(contra_rt = case_when(is.na(adj_rt_contra_dose) | adj_rt_contra_dose == 0 ~ "none",
                               adj_rt_fields == 1 ~ "ipsi only", TRUE ~ "bilateral"),
         time = ifelse(contra_fail == 1, contra_fail_days, pmin(last_fu_days, death_days, na.rm = TRUE)) / 30.44,
         event = factor(case_when(contra_fail == 1 ~ "CRF", vital != 0 ~ "death", TRUE ~ "censor"),
                        levels = c("censor", "CRF", "death")))
cuminc(Surv(time, event) ~ contra_rt, data = B) |> ggcuminc(outcome = "CRF") + add_confidence_interval()
