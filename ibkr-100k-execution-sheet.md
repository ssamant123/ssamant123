# $100k Deployment — Execution Sheet (IBKR)
### CLSK + RIOT speculative sleeve · 2–3+ year horizon · high drawdown tolerance

**Prepared:** June 25, 2026 · **For:** self-directed execution on Interactive Brokers

> **Not investment advice.** This sheet is a framework for executing a plan *you*
> decide on. I cannot place orders or access your IBKR account. $100k across two
> correlated Bitcoin-miner names is effectively one concentrated, high-volatility
> bet on Bitcoin + an AI/HPC re-rating. Prices below are reference levels as of
> ~June 25, 2026 (RIOT ~$28.63, CLSK ~$17.24) — refresh live quotes before trading.

---

## Risk frame (read first)
- RIOT and CLSK are **highly correlated** to each other and to Bitcoin — limited
  real diversification within this sleeve.
- Bitcoin is currently **~25% below estimated production cost** → entry timing is
  uncertain. The plan **stages entries** rather than lump-summing.
- This is a **speculative sleeve** you can afford to see swing hard. Size accordingly;
  do **not** use margin/leverage.

---

## Target allocation

| Position | Target weight | Target $ | Role |
|---|---|---|---|
| RIOT | 55% | $55,000 | De-risked core (AMD revenue booked) |
| CLSK | 30% | $30,000 | Higher-torque option (Meta lease pending) |
| Dry powder (cash) | 15% | $15,000 | Pullback adds / post-signature CLSK top-up |

---

## Tranche plan & exact orders

Share counts are illustrative at reference prices — recompute at live quotes.
Use **LIMIT** orders only (never market). Lower tranches = **GTC limit** orders left resting.

### Tranche 1 — deploy now (~50% of equity allocation)
| Ticker | $ | Ref price | ~Shares | Order |
|---|---|---|---|---|
| RIOT | $27,000 | $28.63 | ~943 | Marketable limit (~$28.70, a few cents through offer) |
| CLSK | $15,000 | $17.24 | ~870 | Marketable limit (~$17.30) |

### Tranche 2 — pullback adds (~30%), resting GTC limits
| Ticker | $ | Limit price | ~Shares | Trigger |
|---|---|---|---|---|
| RIOT | $20,000 | **$22.50** (low-$20s) | ~889 | Fills only on a pullback |
| CLSK | $8,000 | **$14.50** (mid-teens) | ~552 | Fills only on weakness |

### Tranche 3 — event-driven (~20%, the dry powder)
| Ticker | $ | Trigger | Action |
|---|---|---|---|
| CLSK | ~$7,000 | **Signed Sandersville / hyperscaler lease** | Pay up for confirmed news; add at market-on-news |
| (flex) | ~$8,000 cash | Optional further RIOT/CLSK weakness | Discretionary |

*If tranche-2 limits never fill and no catalyst hits, you stay ~50% deployed with cash
on hand — that is by design, not a failure.*

---

## IBKR setup checklist
- [ ] Open / fund account — **$100k** via ACH (free, multi-day hold) or wire (same-day, small fee).
- [ ] Use a **cash account** (or margin account with **0** margin used). No leverage.
- [ ] **IBKR Lite** (commission-free US stocks) is sufficient.
- [ ] Set tax-lot method to **Specific Lot identification** (Account Settings) for later harvesting.
- [ ] Enable **fractional shares** to hit exact dollar amounts.

## Order entry (TWS / Client Portal)
- [ ] Place Tranche-1 marketable limits: RIOT ~$27k, CLSK ~$15k.
- [ ] Place Tranche-2 **GTC** limits: RIOT @ $22.50, CLSK @ $14.50.
- [ ] Hold ~$15k cash for Tranche 3.

## Alerts to set (TWS → right-click symbol → Alerts)
- [ ] **BTC < $60,000** — thesis tripwire (TRIM signal, do not average down).
- [ ] RIOT @ $22.50 and CLSK @ $14.50 — tranche-2 fill levels.
- [ ] News alert: CLSK signed AI/HPC lease (Sandersville/Meta) — tranche-3 trigger.

---

## Risk controls (built for a multi-year hold)
- **Tripwire, not a tight stop:** Bitcoin sustained **< $60k** → trim, don't add. A tight
  price stop on these names will whipsaw you out of a 2–3yr thesis.
- **Disaster floor (optional):** a wide GTC stop ~**−50%** purely as a catastrophe backstop,
  set so normal volatility won't trigger it.
- **Rebalance rule:** if a winner pushes the sleeve well past 55/30, **trim back to target**
  — don't let concentration balloon.
- **Re-evaluate on:** Corsicana lease-up (RIOT), a signed CLSK hyperscaler lease, and each
  quarter's cost-to-mine vs. spot BTC.

---

## Position-level summary (at full deployment, all tranches filled)
| | Tranche 1 | Tranche 2 | Tranche 3 | Total $ | Sleeve % |
|---|---|---|---|---|---|
| RIOT | $27,000 | $20,000 | ~$8,000 (flex) | ~$55,000 | 55% |
| CLSK | $15,000 | $8,000 | ~$7,000 | ~$30,000 | 30% |
| Cash | — | — | — | varies | balance |

---

## Optional: reducing single-name risk
If the "two correlated names = one bet" concentration concerns you later, a miners
basket (e.g. **WGMI** ETF) or adding a third operator (e.g. **IREN**) would dilute
single-name risk. That's a portfolio-construction choice, separate from executing
this plan.

*Companion analysis in this branch: `clsk-riot-pitch.md`, `clsk-riot-investment-model.md`,
`clsk-riot-power-ai-narrative.md`, `clsk-riot-bull-bear-skeptic.md`.*
