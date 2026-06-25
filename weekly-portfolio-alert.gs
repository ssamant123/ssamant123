/**
 * Weekly Portfolio Alert — Torque-Tilt Sleeve (CLSK/RIOT/APLD/IREN/CORZ)
 * Google Apps Script. Builds a holdings sheet, pulls live prices via
 * GOOGLEFINANCE, logs a weekly snapshot, and emails a performance summary.
 *
 * SETUP (one time):
 *   1. Create a blank Google Sheet (sheet.new).
 *   2. Extensions -> Apps Script. Delete any default code, paste ALL of this.
 *   3. Edit EMAIL below if you don't want it sent to the default address.
 *   4. Run the `setup` function once. Authorize when prompted (it needs
 *      permission to manage the sheet, send mail as you, and create a trigger).
 *   5. Done. It emails every Friday ~5pm (your script timezone) + sends one now.
 *
 * To change cost basis later, edit HOLDINGS and re-run `setup`.
 * Not investment advice. GOOGLEFINANCE prices are ~15-20 min delayed.
 */

const EMAIL = 'sunny2605@gmail.com';          // change if desired
const SHEET_NAME = 'Holdings';
const LOG_NAME = 'WeeklyLog';

// [ symbol, shares, avgCost ]  — from holdings-fills-ledger.md
const HOLDINGS = [
  ['CLSK', 666, 15.78],
  ['RIOT', 600, 27.16],
  ['APLD', 180, 40.84],
  ['IREN', 130, 48.05],
  ['CORZ', 225, 27.52],
];

function setup() {
  buildSheet_();
  // weekly trigger: Friday ~5pm (after US close). Adjust day/hour as you like.
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'weeklyEmail') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('weeklyEmail')
    .timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(17).create();
  weeklyEmail();  // send one immediately to confirm it works
}

function buildSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sh.clear();
  const header = ['Symbol', 'Shares', 'Avg Cost', 'Cost Basis',
                  'Price', 'Mkt Value', 'Gain $', 'Gain %'];
  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');

  HOLDINGS.forEach((h, i) => {
    const r = i + 2;
    sh.getRange(r, 1).setValue(h[0]);
    sh.getRange(r, 2).setValue(h[1]);
    sh.getRange(r, 3).setValue(h[2]);
    sh.getRange(r, 4).setFormula(`=B${r}*C${r}`);
    sh.getRange(r, 5).setFormula(`=GOOGLEFINANCE(A${r},"price")`);
    sh.getRange(r, 6).setFormula(`=B${r}*E${r}`);
    sh.getRange(r, 7).setFormula(`=F${r}-D${r}`);
    sh.getRange(r, 8).setFormula(`=IF(D${r}=0,0,(F${r}-D${r})/D${r})`);
  });

  const t = HOLDINGS.length + 2;  // totals row
  sh.getRange(t, 1).setValue('TOTAL').setFontWeight('bold');
  sh.getRange(t, 4).setFormula(`=SUM(D2:D${t - 1})`);
  sh.getRange(t, 6).setFormula(`=SUM(F2:F${t - 1})`);
  sh.getRange(t, 7).setFormula(`=SUM(G2:G${t - 1})`);
  sh.getRange(t, 8).setFormula(`=IF(D${t}=0,0,(F${t}-D${t})/D${t})`);

  sh.getRange(2, 3, t - 1, 1).setNumberFormat('$0.00');     // avg cost
  sh.getRange(2, 4, t - 1, 1).setNumberFormat('$#,##0');    // cost basis
  sh.getRange(2, 5, t - 1, 1).setNumberFormat('$0.00');     // price
  sh.getRange(2, 6, t - 1, 1).setNumberFormat('$#,##0');    // mkt value
  sh.getRange(2, 7, t - 1, 1).setNumberFormat('$#,##0');    // gain $
  sh.getRange(2, 8, t - 1, 1).setNumberFormat('0.0%');      // gain %
  SpreadsheetApp.flush();
}

function weeklyEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME);
  SpreadsheetApp.flush();
  Utilities.sleep(3000);  // let GOOGLEFINANCE refresh

  const t = HOLDINGS.length + 2;
  const rows = sh.getRange(2, 1, HOLDINGS.length, 8).getValues();
  const tot = sh.getRange(t, 1, 1, 8).getValues()[0];
  const totCost = tot[3], totVal = tot[5], totGain = tot[6], totPct = tot[7];

  // week-over-week from the log sheet
  let log = ss.getSheetByName(LOG_NAME) || ss.insertSheet(LOG_NAME);
  if (log.getLastRow() === 0) log.appendRow(['Date', 'Total Value', 'Total Gain $']);
  const prevVal = log.getLastRow() > 1
    ? log.getRange(log.getLastRow(), 2).getValue() : null;
  const wow = (prevVal !== null && prevVal !== '')
    ? (totVal - prevVal) : null;
  const tz = Session.getScriptTimeZone();
  const today = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  log.appendRow([today, totVal, totGain]);

  const usd = v => (v < 0 ? '-$' : '$') + Math.abs(Math.round(v)).toLocaleString();
  const pct = v => (v >= 0 ? '+' : '') + (v * 100).toFixed(1) + '%';

  let body = '<h2>Weekly Portfolio Update — Torque-Tilt Sleeve</h2>';
  body += `<p><b>${today}</b> &middot; prices via GOOGLEFINANCE (~15-20 min delayed)</p>`;
  body += '<table border="1" cellpadding="6" cellspacing="0" '
        + 'style="border-collapse:collapse;font-family:Arial;font-size:13px">';
  body += '<tr style="background:#f0f0f0"><th>Symbol</th><th>Shares</th>'
        + '<th>Avg Cost</th><th>Price</th><th>Mkt Value</th>'
        + '<th>Gain $</th><th>Gain %</th></tr>';
  rows.forEach(r => {
    const g = r[6], color = g >= 0 ? 'green' : 'red';
    body += `<tr><td><b>${r[0]}</b></td><td align="right">${r[1]}</td>`
          + `<td align="right">$${r[2].toFixed(2)}</td>`
          + `<td align="right">$${Number(r[4]).toFixed(2)}</td>`
          + `<td align="right">${usd(r[5])}</td>`
          + `<td align="right" style="color:${color}">${usd(g)}</td>`
          + `<td align="right" style="color:${color}">${pct(r[7])}</td></tr>`;
  });
  const tc = totGain >= 0 ? 'green' : 'red';
  body += `<tr style="background:#f0f0f0;font-weight:bold"><td>TOTAL</td><td></td>`
        + `<td></td><td></td><td align="right">${usd(totVal)}</td>`
        + `<td align="right" style="color:${tc}">${usd(totGain)}</td>`
        + `<td align="right" style="color:${tc}">${pct(totPct)}</td></tr>`;
  body += '</table>';
  body += `<p>Cost basis deployed: <b>${usd(totCost)}</b>`;
  if (wow !== null) {
    const wc = wow >= 0 ? 'green' : 'red';
    body += ` &middot; Week-over-week value change: <b style="color:${wc}">${usd(wow)}</b>`;
  }
  body += '</p>';
  body += '<p style="font-size:12px;color:#666">Reminder: BTC &lt; $60k is the trim '
        + 'tripwire. CoreWeave watch: APLD + CORZ. Not investment advice.</p>';

  MailApp.sendEmail({
    to: EMAIL,
    subject: `Weekly Portfolio: ${usd(totVal)} (${pct(totPct)})`,
    htmlBody: body,
  });
}
