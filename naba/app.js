'use strict';
/* ================================================
   SURAH AN-NABA — app.js  (data layer only)
   Shared mechanics in shared/engine.js
   Shared UI/lifecycle in shared/ui.js
   ================================================ */

window.STORAGE_KEY = 'nabaQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Answers: {}, s1Checked: false,
  s2Checked: false,
  s3Checked: false,
  s4Order:   [], s4Checked: false,
  s5Answers: {}, s5Checked: false,
  s6Checked: false,
  s7Answers: {}, s7Checked: false,
  s8Answers: {}, s8Checked: false,
};

const REWARDS = {
  1: { xp: 90,  gems: 3, icon: '❓', title: 'THE GREAT NEWS KNOWN!',
       msg: 'SubhanAllah! "An-Naba Al-Atheem" — The Great News. They argued about it. But Allah says twice: "Kalla saya\'lamoon!" — They are going to know. On to the Signs of Creation!' },
  2: { xp: 100, gems: 4, icon: '⛰️', title: 'EARTH SIGNS UNLOCKED!',
       msg: 'MashAllah! Earth as a resting bed. Mountains as pegs. Sleep as rest. Night as a covering. Day for livelihood. Six gifts, six signs — all custom-designed for YOU.' },
  3: { xp: 100, gems: 4, icon: '🌧️', title: 'SKY SIGNS DISCOVERED!',
       msg: 'SubhanAllah! Seven strong heavens. A blazing lamp. Torrential rain. Dense gardens. One chain of mercy — from sky to soil.' },
  4: { xp: 110, gems: 4, icon: '📯', title: 'THE DAY UNDERSTOOD!',
       msg: 'Allahu Akbar! Yawm al-Fasl — the Day of Sorting. The Horn is blown. You come in crowds. The sky opens as gates. The mountains become a mirage. Prepare now!' },
  5: { xp: 110, gems: 4, icon: '🔥', title: 'THE AMBUSH MAPPED!',
       msg: 'MashAllah! Hellfire is a "mirsad" — waiting, watching. "They did not expect any account." Let us never be like them.' },
  6: { xp: 120, gems: 5, icon: '🌿', title: 'PARADISE ENTERED!',
       msg: 'SubhanAllah! "Inna lil-muttaqeena mafaza!" — For the righteous is success! Gardens, vines, companions, a full cup. No idle talk, no lies. Pure peace.' },
  7: { xp: 100, gems: 3, icon: '👑', title: 'THE ROWS WITNESSED!',
       msg: 'Allahu Akbar! Only those given permission may speak — and only truth. The absolute sovereignty of Allah.' },
  8: { xp: 160, gems: 8, icon: '🏆', title: 'SURAH AN-NABA COMPLETE!',
       msg: "ALLAHUMMA BARIK! All 8 levels complete! \"Fa-man sha'a ittakhadha ila rabbihi ma'aba.\" May Allah make us from those who rush toward Him. Ameen!" },
};

window.SURAH_CONFIG = {
  totalLevels: 8,
  rewards: REWARDS,
  tileIcons:  ['❓','⛰️','🌧️','📯','🔥','🌿','👑','🏆'],
  tileLabels: ['Great News','Earth Signs','Sky Signs','Day of Sorting','Hellfire','Paradise','The Rows','Final Warning'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Surah An-Naba — "The Great News." What were they arguing about? 8 levels. Let's begin!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Kalla saya'lamoon!" Keep learning! 📯`,
    complete: name => `MashAllah, ${name}! All 8 levels of An-Naba complete! May Allah make us from those who rush toward Him. Ameen! 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

const S1_QUIZ = [
  { q: "What is \"An-Naba Al-Atheem\" (The Great News) that the Quraysh were disputing about?",
    opts: ['The birth of Prophet Muhammad ﷺ','The Day of Resurrection — the Day everyone will be raised and held to account','The revelation of the Quran','The creation of the heavens and earth'],
    correct: 1 },
  { q: "What does \"Kalla saya'lamoon\" (78:4-5) mean?",
    opts: ['"They will never know the truth"','"No! They are going to know!" — a firm warning that the Day is certain','"Perhaps they will learn someday"','"They should ask the scholars"'],
    correct: 1 },
  { q: 'Why is the warning "they will know" repeated TWICE in verses 4 and 5?',
    opts: ['Because there are two types of people','For rhythm and poetry only','Arabic repetition signals absolute certainty — nothing could be more sure','Because it happened in two different times'],
    correct: 2 },
  { q: 'What does the surah name "An-Naba" mean?',
    opts: ['The Warning','The Great News / The Important Announcement','The Question','The Dispute'],
    correct: 1 },
];

const S2_ITEMS = [
  { id: 'e1', text: '🌍 Earth made as\na resting place',    zone: 'z1' },
  { id: 'e2', text: '⛰️ Mountains set as\nfirm pegs',        zone: 'z2' },
  { id: 'e3', text: '😴 Sleep given as\ncomplete rest',       zone: 'z3' },
  { id: 'e4', text: '🌙 Night made as\na covering garment',  zone: 'z4' },
  { id: 'e5', text: '☀️ Day made for\nseeking livelihood',   zone: 'z5' },
];
const S2_ZONES = [
  { id: 'z1', desc: '"Have We not made the earth a resting place (mihadan)?" (78:6)' },
  { id: 'z2', desc: '"And the mountains as pegs (awtadan)?" (78:7)' },
  { id: 'z3', desc: '"And made your sleep as rest (subatan)?" (78:9)' },
  { id: 'z4', desc: '"And made the night as a covering (libasan)?" (78:10)' },
  { id: 'z5', desc: '"And made the day for livelihood (ma\'asha)?" (78:11)' },
];

const S3_ITEMS = [
  { id: 's1', text: '7️⃣ Seven strong\nheavens built above', zone: 'z1' },
  { id: 's2', text: '🔆 Blazing lamp\n(the sun) set alight', zone: 'z2' },
  { id: 's3', text: '🌧️ Rain clouds squeezed\n— torrents of water', zone: 'z3' },
  { id: 's4', text: '🌾 Grain, gardens\n& thick vegetation',   zone: 'z4' },
];
const S3_ZONES = [
  { id: 'z1', desc: '"And built above you seven strong (shidadan) heavens?" (78:12)' },
  { id: 'z2', desc: '"And made a blazing lamp (siraj wahhaj)?" (78:13)' },
  { id: 'z3', desc: '"And sent down from rain-clouds water in torrents (thajjaj)?" (78:14)' },
  { id: 'z4', desc: '"That We may bring forth grain, vegetation, and gardens of thick growth." (78:15-16)' },
];

const S4_EVENTS_CORRECT = [
  { id: 'd1', text: '📅 The Day of Decision (Yawm al-Fasl) has its fixed, appointed time (78:17)' },
  { id: 'd2', text: '📯 The Horn is blown — all the dead rise and come forth in vast crowds (78:18)' },
  { id: 'd3', text: '🌌 The sky is torn open and becomes like gates (78:19)' },
  { id: 'd4', text: '⛰️ The mountains are moved away completely — they become a mirage (78:20)' },
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

const S5_QUIZ = [
  { q: 'What does "mirsad" mean for Hell in 78:21?',
    opts: ['A training ground for sinners','A watch-post / ambush — Hell is lying in wait, ready and alert','A temporary holding place','A dark cave with no fire'],
    correct: 1 },
  { q: 'How long do the transgressors remain in Hell according to 78:23?',
    opts: ['100 years — then they leave','"Ahqaban" — ages upon ages, a very long time','Until the Day of Judgment only','It varies based on their sins'],
    correct: 1 },
  { q: 'What do they drink in Hell instead of cold water (78:24-25)?',
    opts: ['Nothing — they get no drink at all','"Hameem" (scalding water) and "Ghassaq" (dark, putrid fluid)','Bitter water that tastes of aloe','Hot steam only'],
    correct: 1 },
  { q: 'According to 78:27-28, what was the root cause of their punishment?',
    opts: ['They were too poor to give charity','"They did not expect any account (hisab)" and "denied Our signs completely"','They forgot to pray a few times','They made mistakes in reciting Quran'],
    correct: 1 },
];

const S6_ITEMS = [
  { id: 'p1', text: '🌿 Gardens and\ngrape vines',            zone: 'z1' },
  { id: 'p2', text: '👫 Companions of\nequal age (atrab)',    zone: 'z2' },
  { id: 'p3', text: '🥛 A full cup,\noverflowing (dihaq)',    zone: 'z3' },
  { id: 'p4', text: '🚫 No idle talk\nor falsehood heard',    zone: 'z4' },
];
const S6_ZONES = [
  { id: 'z1', desc: '"Indeed for the righteous is success (mafaza) — gardens and grape vines." (78:31-32)' },
  { id: 'z2', desc: '"And companions of equal age (kawa\'ib atrab)." (78:33)' },
  { id: 'z3', desc: '"And a cup (ka\'san) full to the brim (dihaqan)." (78:34)' },
  { id: 'z4', desc: '"They will not hear therein ill speech (laghw) or any falsehood (kidhdhab)." (78:35)' },
];

const S7_QUIZ = [
  { q: 'Who is "ar-Ruh" (the Spirit) who stands in a row on that Day (78:38)?',
    opts: ["The soul of every person","Jibreel (Angel Gabriel) — the greatest of all angels, filling the entire row","The souls of all prophets together","A special creation Allah has not described"],
    correct: 1 },
  { q: 'Who may speak on the Day when the Spirit and angels stand in rows (78:38)?',
    opts: ["All prophets speak freely for their nations",'"Only one who is given permission by ar-Rahman — and he will say what is correct (sawab)"',"The believers can explain their deeds fully","The angels speak on behalf of everyone"],
    correct: 1 },
  { q: 'What does "Rabb al-samawati wal-ard wa ma baynahuma ar-Rahman" (78:37) establish?',
    opts: ["That Allah only rules the sky",'"Lord of the heavens, the earth, and ALL that is between them — the Most Merciful" — His total, complete sovereignty',"That ar-Rahman is a different name from Allah","That only believers have a Lord"],
    correct: 1 },
];

const S8_QUIZ = [
  { q: 'What is "Yawm al-Haqq" (The Day of Truth) in 78:39?',
    opts: ['A day of judgment only for non-believers','The Day when all truth becomes clear and undeniable — every lie dissolved, every deed revealed','The day the Quran was revealed','The day the sun rises from the West'],
    correct: 1 },
  { q: 'How near is the punishment according to 78:40?',
    opts: ['"It is far away — nothing to worry about yet"','"We have warned you of a punishment that is NEAR (qarib)" — it is close, not distant','"It will happen only after 1000 years"','"Nobody knows when it will come"'],
    correct: 1 },
  { q: 'What will the disbeliever say when he sees his deeds on that Day (78:40)?',
    opts: ['"I wish I had done more charity!"','"Ya laytani kuntu turaban!" — "I wish I were dust!" — wishing he had never been created','"I wish I had more time to repent!"','"I wish I could go back to the world!"'],
    correct: 1 },
];

// =============================================
//  SECTION WRAPPERS
// =============================================
function renderSection1Game() { renderQuiz(1, S1_QUIZ); }
function checkSection1()      { checkQuiz(1, S1_QUIZ); }
function renderSection2Game() { renderDragDrop(2, S2_ITEMS, S2_ZONES); }
function checkSection2()      { checkDragDrop(2, S2_ZONES); }
function renderSection3Game() { renderDragDrop(3, S3_ITEMS, S3_ZONES); }
function checkSection3()      { checkDragDrop(3, S3_ZONES); }
function renderSection4Game() { renderStoryOrder(4, S4_EVENTS_CORRECT); }
function checkSection4()      { checkStoryOrder(4, S4_EVENTS_CORRECT); }
function renderSection5Game() { renderQuiz(5, S5_QUIZ); }
function checkSection5()      { checkQuiz(5, S5_QUIZ); }
function renderSection6Game() { renderDragDrop(6, S6_ITEMS, S6_ZONES); }
function checkSection6()      { checkDragDrop(6, S6_ZONES); }
function renderSection7Game() { renderQuiz(7, S7_QUIZ); }
function checkSection7()      { checkQuiz(7, S7_QUIZ); }
function renderSection8Game() { renderQuiz(8, S8_QUIZ); }
function checkSection8()      { checkQuiz(8, S8_QUIZ); }

// =============================================
//  PARADISE GATE WORLD BUILDER (surah-specific)
// =============================================
function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  if (n >= 8) {
    const sk = ctx.createLinearGradient(0, 0, W, 0);
    sk.addColorStop(0, '#080215'); sk.addColorStop(0.45, '#1a3208'); sk.addColorStop(1, '#2a5010');
    ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
  } else { ctx.fillStyle = '#080215'; ctx.fillRect(0, 0, W, H); }
  for (let i = 0; i < 45; i++) {
    const sx = (i * 7123) % 260, sy = (i * 4419) % 175, br = 0.35 + (i % 3) * 0.18;
    ctx.fillStyle = `rgba(200,170,255,${br})`; ctx.fillRect(sx, sy, 1, 1);
  }
  if (n < 1) { _buildLabelNaba(ctx, W, '🌿 Complete levels to open the Gate of Paradise!', 0, 8); return; }
  ctx.fillStyle = '#2e2818'; ctx.fillRect(0, 210, W, 40);
  ctx.fillStyle = '#d0c8b0'; ctx.fillRect(215, 195, 130, 55);
  if (n < 2) { _buildLabelNaba(ctx, W, '🌿 Path to Paradise laid — 1/8', 1, 8); return; }
  if (n >= 2) { ctx.fillStyle = '#c8b880'; ctx.fillRect(192, 95, 38, 122); ctx.fillStyle = '#d8c890'; ctx.fillRect(192, 95, 38, 5); ctx.fillRect(188, 90, 46, 10); }
  if (n >= 3) { ctx.fillStyle = '#c8b880'; ctx.fillRect(330, 95, 38, 122); ctx.fillStyle = '#d8c890'; ctx.fillRect(330, 95, 38, 5); ctx.fillRect(326, 90, 46, 10); }
  if (n >= 4) { ctx.fillStyle = '#b8a870'; ctx.fillRect(96, 115, 96, 98); }
  if (n >= 5) { ctx.fillStyle = '#b8a870'; ctx.fillRect(368, 115, 96, 98); }
  if (n >= 6) {
    ctx.strokeStyle = '#d8c050'; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.arc(280, 95, 88, Math.PI, 0, false); ctx.stroke();
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(280, 4, 11, 0, Math.PI * 2); ctx.fill();
  }
  if (n >= 7 && n < 8) {
    ctx.fillStyle = '#a07808'; ctx.fillRect(230, 95, 50, 122); ctx.fillRect(280, 95, 50, 122);
    ctx.fillStyle = '#e0b020'; ctx.fillRect(234, 99, 42, 114); ctx.fillRect(284, 99, 42, 114);
  }
  if (n >= 8) {
    const pGrad = ctx.createLinearGradient(230, 0, 330, 0);
    pGrad.addColorStop(0, '#1a4a10'); pGrad.addColorStop(0.5, '#2a6018'); pGrad.addColorStop(1, '#1a4a10');
    ctx.fillStyle = pGrad; ctx.fillRect(230, 95, 100, 122);
    ctx.fillStyle = '#1c5012'; ctx.beginPath(); ctx.arc(258, 152, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#287018'; ctx.beginPath(); ctx.arc(302, 146, 17, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText('ALLAHUMMA BARIK! 🌿 GATES OF PARADISE OPEN!', W / 2, 20);
    ctx.textAlign = 'left';
  } else { _buildLabelNaba(ctx, W, `Building the Gate — ${n}/8 levels`, n, 8); }
}
function _buildLabelNaba(ctx, W, msg, done, total) {
  ctx.fillStyle = '#8840c8'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#0e0420'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#5a20a0'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
