# Data handling rules

1. **System of record:** NU REDCap project (HIPAA-compliant, NUCATS-hosted). Import
   `redcap_data_dictionary.csv` to build the instrument.
2. **Identifiers:** MRN and date of surgery live only in REDCap (identifier-flagged fields). The analytic
   export uses the REDCap record ID and *relative* time (days from surgery). No calendar dates.
3. **Linkage key:** If cohort identification comes from an NMEDW extract, the extract stays on NM/NU
   secure storage (e.g., FSM research share), never on the NAS, a laptop desktop, or email.
4. **NAS / GitHub:** No patient-level data, de-identified or not, unless the approved IRB says so.
   `.gitignore` blocks common data file types as a backstop. It is not a substitute for discipline.
5. **Retention:** At least 7 years after study closure, per NU policy.
6. **Abstractor training:** Double-abstract the first 20 charts. Measure agreement on key fields
   (indication, palate/BOT extension, contralateral RT dose) and reconcile them before abstracting the rest.
