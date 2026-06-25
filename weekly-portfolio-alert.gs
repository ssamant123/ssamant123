/**
 * Weekly Portfolio Alert — Torque-Tilt Sleeve (CLSK/RIOT/APLD/IREN/CORZ)
 * Google Apps Script. Builds a DETAILED holdings dashboard via GOOGLEFINANCE,
 * logs a weekly snapshot, and emails a performance summary.
 *
 * SETUP (one time):
 *   1. Create a blank Google Sheet (sheet.new).
 *   2. Extensions -> Apps Script. Delete any code, paste ALL of this. Save.
 *   3. Edit EMAIL below if desired.
 *   4. Run `setup` once; authorize (Advanced -> Go to project (unsafe) -> Allow).
 *   5. Emails every Friday ~5pm + sends one now.
 *
 * To upgrade later: replace this file, Save, re-run `setup`.
 * To change holdings: edit HOLDINGS, re-run `setup`.
 * Not investment advice. GOOGLEFINANCE prices are ~15-20 min delayed.
 */

const EMAIL = 'sunny2605@gmail.com';
const SHEET_NAME = 'Holdings';
const LOG_NAME = 'WeeklyLog';

// [ symbol, shares, avgCost ] — from holdings-fills-ledger.md
const HOLDINGS = [
  ['CLSK', 666, 15.78],
  ['RIOT', 600, 27.16],
  ['APLD', 180, 40.84],
  ['IREN', 130, 48.05],
  ['CORZ', 225, 27.52],
];

// Columns: A Symbol B Name C Shares D AvgCost E Price F Day% G CostBasis
//          H MktValue I Gain$ J Gain% K Weight% L 52WLow M 52WHigh
function setup() {
  buildSheet_();
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'weeklyEmail') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('weeklyEmail')
    .timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(17).create();
  weeklyEmail();
}

function buildSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sh.clear();
  const header = ['Symbol', 'Name', 'Shares', 'Avg Cost', 'Price', 'Day %',
                  'Cost Basis', 'Mkt Value', 'Gain $', 'Gain %', 'Weight %',
                  '52W Low', '52W High'];
  sh.getRange(1, 1, 1, header.length).setValues([header])
    .setFontWeight('bold').setFontColor('#ffffff').setBackground('#1f3864');

  const t = HOLDINGS.length + 2;  // totals row
  HOLDINGS.forEach((h, i) => {
    const r = i + 2;
    sh.getRange(r, 1).setValue(h[0]);
    sh.getRange(r, 2).setFormula(`=IFERROR(GOOGLEFINANCE(A${r},"name"),"")`);
    sh.getRange(r, 3).setValue(h[1]);
    sh.getRange(r, 4).setValue(h[2]);
    sh.getRange(r, 5).setFormula(`=IFERROR(GOOGLEFINANCE(A${r},"price"),0)`);
    sh.getRange(r, 6).setFormula(`=IFERROR(GOOGLEFINANCE(A${r},"changepct"),0)`);
    sh.getRange(r, 7).setFormula(`=C${r}*D${r}`);
    sh.getRange(r, 8).setFormula(`=C${r}*E${r}`);
    sh.getRange(r, 9).setFormula(`=H${r}-G${r}`);
    sh.getRange(r, 10).setFormula(`=IF(G${r}=0,0,(H${r}-G${r})/G${r})`);
    sh.getRange(r, 11).setFormula(`=IF($H$${t}=0,0,H${r}/$H$${t})`);
    sh.getRange(r, 12).setFormula(`=IFERROR(GOOGLEFINANCE(A${r},"low52"),0)`);
    sh.getRange(r, 13).setFormula(`=IFERROR(GOOGLEFINANCE(A${r},"high52"),0)`);
  });

  sh.getRange(t, 1).setValue('TOTAL');
  sh.getRange(t, 7).setFormula(`=SUM(G2:G${t - 1})`);
  sh.getRange(t, 8).setFormula(`=SUM(H2:H${t - 1})`);
  sh.getRange(t, 9).setFormula(`=SUM(I2:I${t - 1})`);
  sh.getRange(t, 10).setFormula(`=IF(G${t}=0,0,(H${t}-G${t})/G${t})`);
  sh.getRange(t, 11).setFormula(`=SUM(K2:K${t - 1})`);
  sh.getRange(t, 1, 1, 13).setFontWeight('bold').setBackground('#d9e1f2');

  // number formats
  sh.getRange(2, 4, t - 1, 1).setNumberFormat('$0.00');     // avg cost
  sh.getRange(2, 5, t - 1, 1).setNumberFormat('$0.00');     // price
  sh.getRange(2, 6, t - 1, 1).setNumberFormat('0.00"%"');   // day %
  sh.getRange(2, 7, t,    1).setNumberFormat('$#,##0');     // cost basis
  sh.getRange(2, 8, t,    1).setNumberFormat('$#,##0');     // mkt value
  sh.getRange(2, 9, t,    1).setNumberFormat('$#,##0');     // gain $
  sh.getRange(2, 10, t,   1).setNumberFormat('0.0%');       // gain %
  sh.getRange(2, 11, t,   1).setNumberFormat('0.0%');       // weight
  sh.getRange(2, 12, t - 1, 1).setNumberFormat('$0.00');    // 52w low
  sh.getRange(2, 13, t - 1, 1).setNumberFormat('$0.00');    // 52w high
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, 13);
  SpreadsheetApp.flush();
}

function weeklyEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME);
  SpreadsheetApp.flush();
  Utilities.sleep(4000);  // let GOOGLEFINANCE refresh

  const t = HOLDINGS.length + 2;
  const rows = sh.getRange(2, 1, HOLDINGS.length, 13).getValues();
  const tot = sh.getRange(t, 1, 1, 13).getValues()[0];
  const totCost = tot[6], totVal = tot[7], totGain = tot[8], totPct = tot[9];

  let log = ss.getSheetByName(LOG_NAME) || ss.insertSheet(LOG_NAME);
  if (log.getLastRow() === 0) log.appendRow(['Date', 'Total Value', 'Total Gain $']);
  const prevVal = log.getLastRow() > 1 ? log.getRange(log.getLastRow(), 2).getValue() : null;
  const wow = (prevVal !== null && prevVal !== '') ? (totVal - prevVal) : null;
  const tz = Session.getScriptTimeZone();
  const today = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  log.appendRow([today, totVal, totGain]);

  const usd = v => (v < 0 ? '-$' : '$') + Math.abs(Math.round(v)).toLocaleString();
  const px  = v => '$' + Number(v).toFixed(2);
  const pct = v => (v >= 0 ? '+' : '') + (v * 100).toFixed(1) + '%';
  const dch = v => (v >= 0 ? '+' : '') + Number(v).toFixed(2) + '%';

  let body = '<h2 style="font-family:Arial">Weekly Portfolio — Torque-Tilt Sleeve</h2>';
  body += `<p style="font-family:Arial"><b>${today}</b> &middot; live prices via GOOGLEFINANCE (~15-20 min delayed)</p>`;
  body += '<table border="1" cellpadding="6" cellspacing="0" '
        + 'style="border-collapse:collapse;font-family:Arial;font-size:13px">';
  body += '<tr style="background:#1f3864;color:#fff"><th>Symbol</th><th>Price</th>'
        + '<th>Day %</th><th>Mkt Value</th><th>Gain $</th><th>Gain %</th>'
        + '<th>Weight</th><th>52W Range</th></tr>';
  rows.forEach(r => {
    const g = r[8], gc = g >= 0 ? 'green' : 'red';
    const d = r[5], dc = d >= 0 ? 'green' : 'red';
    body += `<tr><td><b>${r[0]}</b></td>`
          + `<td align="right">${px(r[4])}</td>`
          + `<td align="right" style="color:${dc}">${dch(d)}</td>`
          + `<td align="right">${usd(r[7])}</td>`
          + `<td align="right" style="color:${gc}">${usd(g)}</td>`
          + `<td align="right" style="color:${gc}">${pct(r[9])}</td>`
          + `<td align="right">${(r[10] * 100).toFixed(1)}%</td>`
          + `<td align="right">${px(r[11])}–${px(r[12])}</td></tr>`;
  });
  const tc = totGain >= 0 ? 'green' : 'red';
  body += `<tr style="background:#d9e1f2;font-weight:bold"><td>TOTAL</td><td></td><td></td>`
        + `<td align="right">${usd(totVal)}</td>`
        + `<td align="right" style="color:${tc}">${usd(totGain)}</td>`
        + `<td align="right" style="color:${tc}">${pct(totPct)}</td>`
        + `<td align="right">100%</td><td></td></tr>`;
  body += '</table>';
  body += `<p style="font-family:Arial">Cost basis deployed: <b>${usd(totCost)}</b>`;
  if (wow !== null) {
    const wc = wow >= 0 ? 'green' : 'red';
    body += ` &middot; Week-over-week value change: <b style="color:${wc}">${usd(wow)}</b>`;
  }
  body += '</p>';
  body += '<p style="font-size:12px;color:#666;font-family:Arial">Reminder: BTC &lt; $60k '
        + 'is the trim tripwire. CoreWeave watch: APLD + CORZ. Not investment advice.</p>';

  MailApp.sendEmail({
    to: EMAIL,
    subject: `Weekly Portfolio: ${usd(totVal)} (${pct(totPct)})`,
    htmlBody: body,
  });
}
