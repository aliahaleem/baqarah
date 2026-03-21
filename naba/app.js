'use strict';
/* ================================================
   SURAH AN-NABA — app.js  (data layer only)
   Shared mechanics in shared/engine.js
   Shared UI/lifecycle in shared/ui.js
   ================================================ */

window.STORAGE_KEY = 'nabaQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Checked:false,
  s2Answers: {}, s2Checked: false,
  s3Checked: false,
  s4Checked: false,
  s5Order:   [], s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Checked: false,
  s8Answers: {}, s8Checked: false,
  s9Answers: {}, s9Checked: false,
};

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
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
       msg: "ALLAHUMMA BARIK! All 9 levels complete! \"Fa-man sha'a ittakhadha ila rabbihi ma'aba.\" May Allah make us from those who rush toward Him. Ameen!" },
};

window.SURAH_CONFIG = {
  totalLevels: 9,
  rewards: REWARDS,
  tileIcons:['📖','❓','⛰️','🌧️','📯','🔥','🌿','👑','🏆'],
  tileLabels:['Word by Word','Great News','Earth Signs','Sky Signs','Day of Sorting','Hellfire','Paradise','The Rows','Final Warning'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Surah An-Naba — "The Great News." What were they arguing about? 9 levels. Let's begin!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Kalla saya'lamoon!" Keep learning! 📯`,
    complete: name => `MashAllah, ${name}! All 9 levels of An-Naba complete! May Allah make us from those who rush toward Him. Ameen! 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1-2 — عَمَّ يَتَسَاءَلُونَ · عَنِ النَّبَإِ الْعَظِيمِ', words:[
    {ar:'الْعَظِيمِ', tr:'al-ʿaẓīm', en:'the great', freq:79},
    {ar:'النَّبَإِ', tr:'al-nabaʾ', en:'the news', freq:6},
    {ar:'عَنِ', tr:'ʿan', en:'about', freq:330},
    {ar:'يَتَسَاءَلُونَ', tr:'yatasāʾalūn', en:'they are asking', freq:3},
    {ar:'عَمَّ', tr:'ʿamma', en:'about what', freq:2},
  ]},
  {label:'Verse 6-7 — أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا · وَالْجِبَالَ أَوْتَادًا', words:[
    {ar:'أَوْتَادًا', tr:'awtādan', en:'as pegs/stakes', freq:3},
    {ar:'وَالْجِبَالَ', tr:'wal-jibāl', en:'and the mountains', freq:33},
    {ar:'مِهَادًا', tr:'mihādan', en:'a resting place', freq:2},
    {ar:'الْأَرْضَ', tr:'al-arḍ', en:'the earth', freq:461},
    {ar:'نَجْعَلِ', tr:'najʿal', en:'did We not make', freq:30},
    {ar:'أَلَمْ', tr:'alam', en:'did We not', freq:40},
  ]},
  {label:'Verse 31-32 — إِنَّ لِلْمُتَّقِينَ مَفَازًا · حَدَائِقَ وَأَعْنَابًا', words:[
    {ar:'وَأَعْنَابًا', tr:'wa-aʿnāban', en:'and grapes', freq:11},
    {ar:'حَدَائِقَ', tr:'ḥadāʾiq', en:'gardens', freq:3},
    {ar:'مَفَازًا', tr:'mafāzan', en:'a place of success', freq:1},
    {ar:'لِلْمُتَّقِينَ', tr:'lil-muttaqīn', en:'for the righteous', freq:26},
    'inna',
  ]},
];


const S1_MATCH_ITEMS = [
  {id:'w1', text:'الْعَظِيمِ', zone:'wz1'},
  {id:'w2', text:'النَّبَإِ', zone:'wz2'},
  {id:'w3', text:'عَنِ', zone:'wz3'},
  {id:'w4', text:'يَتَسَاءَلُونَ', zone:'wz4'},
  {id:'w5', text:'عَمَّ', zone:'wz5'},
  {id:'w6', text:'أَوْتَادًا', zone:'wz6'}
];
const S1_MATCH_ZONES = [
  {id:'wz1', desc:'the great'},
  {id:'wz2', desc:'the news'},
  {id:'wz3', desc:'about'},
  {id:'wz4', desc:'they are asking'},
  {id:'wz5', desc:'about what'},
  {id:'wz6', desc:'as pegs/stakes'}
];
window.setupWBWLevel(WBW_DATA, S1_MATCH_ITEMS, S1_MATCH_ZONES);

const S1_QUIZ = [
  { q: "What is \"An-Naba Al-Atheem\" (The Great News) that the Quraysh disputed?",
    opts: ['The birth of Prophet Muhammad ﷺ in Makkah',
           'The Day of Resurrection when all will be raised and held to account',
           'The revelation and origin of the Quran itself',
           'The original creation of the heavens and the earth'],
    correct: 1 },
  { q: "What does \"Kalla saya'lamoon\" (78:4-5) mean?",
    opts: ['"They will never come to know the truth at all"',
           '"No! They are going to know!" — a firm warning the Day is certain',
           '"Perhaps they will eventually learn one day in the future"',
           '"They should ask their scholars and learned ones"'],
    correct: 1 },
  { q: 'Why is "they will know" repeated TWICE in verses 4 and 5?',
    opts: ['Because there are two completely separate types of people',
           'Repetition signals absolute certainty — nothing could be more sure',
           'For rhythmic and beautiful poetic effect only',
           'Because the warning happened at two separate different times'],
    correct: 1 },
  { q: 'What does the surah name "An-Naba" mean?',
    opts: ['The Warning sent to disbelievers',
           'The Question being disputed',
           'The Great News / The Important Announcement',
           'The Dispute that is taking place'],
    correct: 2 },
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
    opts: ['A watch-post / ambush — Hell is lying in wait and alert',
           'A training ground where sinners are corrected and reformed',
           'A temporary holding place before the judgment begins',
           'A dark cave that contains absolutely no fire at all'],
    correct: 0 },
  { q: 'How long do the transgressors remain in Hell according to 78:23?',
    opts: ['100 years — after which they are finally allowed to leave',
           'Until the Day of Judgment — then moved to their final place',
           '"Ahqaban" — ages upon ages, an immeasurably long time',
           'It varies based on the precise nature of their sins'],
    correct: 2 },
  { q: 'What do they drink in Hell instead of cold water (78:24-25)?',
    opts: ['Nothing at all — they receive absolutely no drink',
           '"Hameem" (scalding water) and "Ghassaq" (dark, putrid fluid)',
           'Bitter water that has a horrible taste of aloe plant',
           'Only hot, suffocating steam and nothing liquid at all'],
    correct: 1 },
  { q: 'What was the root cause of their punishment (78:27-28)?',
    opts: ['They were too poor to fulfil the charity requirement of zakat',
           'They forgot to pray on many occasions during their lives',
           'They made repeated mistakes in reciting the Quran aloud',
           '"They did not expect any account" and "denied Our signs"'],
    correct: 3 },
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
    opts: ["The soul of every single individual person",
           "The souls of all the prophets gathered together",
           "A special creation that Allah has not yet fully described",
           "Jibreel (Angel Gabriel) — the greatest of all angels"],
    correct: 3 },
  { q: 'Who may speak on the Day the Spirit and angels stand in rows (78:38)?',
    opts: ["Only one given permission by ar-Rahman — speaking only truth",
           "All prophets speak freely as advocates for their nations",
           "The believers can fully explain their deeds and intentions",
           "The angels speak on behalf of every human soul"],
    correct: 0 },
  { q: 'What does "Rabb al-samawati wal-ard wa ma baynahuma ar-Rahman" establish?',
    opts: ["That Allah rules only the sky and not the earth",
           "Lord of heavens, earth, and ALL between — His complete sovereignty",
           "That ar-Rahman is a separate name from the name Allah",
           "That only believers have a Lord to answer to"],
    correct: 1 },
];

const S8_QUIZ = [
  { q: 'What is "Yawm al-Haqq" (The Day of Truth) in 78:39?',
    opts: ['A day of judgment reserved only for non-believers',
           'The specific day the Quran was first revealed to the Prophet ﷺ',
           'The day when the sun rises from the West as a final sign',
           'The Day when all truth becomes clear — every lie dissolved'],
    correct: 3 },
  { q: 'How near is the punishment according to 78:40?',
    opts: ['"It is far away — nothing to worry about yet at all"',
           '"It will only happen after exactly 1000 years have passed"',
           '"We have warned you of a punishment that is NEAR (qarib)"',
           '"Nobody knows at all when exactly it will come"'],
    correct: 2 },
  { q: 'What will the disbeliever cry out when he sees his deeds (78:40)?',
    opts: ['"I wish I had given far more charity in my life!"',
           '"Ya laytani kuntu turaban!" — "I wish I were dust!"',
           '"I wish I had been given more time to repent!"',
           '"I wish I could return to the world just once more!"'],
    correct: 1 },
];

// =============================================
//  SECTION WRAPPERS
// =============================================



function renderSection2Game() { renderQuiz(2, S1_QUIZ); }
function checkSection2()      { checkQuiz(2, S1_QUIZ); }
function renderSection3Game() { renderDragDrop(3, S2_ITEMS, S2_ZONES); }
function checkSection3()      { checkDragDrop(3, S2_ZONES); }
function renderSection4Game() { renderDragDrop(4, S3_ITEMS, S3_ZONES); }
function checkSection4()      { checkDragDrop(4, S3_ZONES); }
function renderSection5Game() { renderStoryOrder(5, S4_EVENTS_CORRECT); }
function checkSection5()      { checkStoryOrder(5, S4_EVENTS_CORRECT); }
function renderSection6Game() { renderQuiz(6, S5_QUIZ); }
function checkSection6()      { checkQuiz(6, S5_QUIZ); }
function renderSection7Game() { renderDragDrop(7, S6_ITEMS, S6_ZONES); }
function checkSection7()      { checkDragDrop(7, S6_ZONES); }
function renderSection8Game() { renderQuiz(8, S7_QUIZ); }
function checkSection8()      { checkQuiz(8, S7_QUIZ); }
function renderSection9Game() { renderQuiz(9, S8_QUIZ); }
function checkSection9()      { checkQuiz(9, S8_QUIZ); }

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
  } else { _buildLabelNaba(ctx, W, `Building the Gate — ${n}/9 levels`, n, 8); }
}
function _buildLabelNaba(ctx, W, msg, done, total) {
  ctx.fillStyle = '#8840c8'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#0e0420'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#5a20a0'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
