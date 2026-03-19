'use strict';
/* ================================================
   SURAH AL-BAQARAH — app.js
   Data layer only: STORAGE_KEY, state, SURAH_CONFIG,
   game data, section wrappers, world builder.
   All game mechanics live in shared/engine.js.
   All navigation/rewards live in shared/ui.js.
   ================================================ */

window.STORAGE_KEY = 'baqarahQuestSave';

window.state = {
  explorerName: '',
  xp: 0, gems: 0,
  completed: [],
  s1Checked: false,
  s2Answers: {}, s2Checked: false,
  s3Order:   [], s3Checked: false,
  s4Checked: false,
  s5Answers: {}, s5Checked: false,
  s6Order:   [], s6Checked: false,
  s7Checked: false,
  s8Answers: {}, s8Checked: false,
  s9Checked: false,
  s10Order:  [], s10Checked: false,
  s11Checked: false,
  s12Answers:{}, s12Checked: false,
  s13Checked: false,
};

const REWARDS = {
  1:  { xp:  80, gems: 3,  icon: '🌿', title: 'PLAINS UNLOCKED!',        msg: 'You discovered the 5 qualities of the Muttaqeen. The first land of your quest is yours! On to the Cave of Shadows...' },
  2:  { xp: 100, gems: 4,  icon: '🌑', title: 'SHADOWS CLEARED!',        msg: 'MashAllah! You understand the two groups who rejected guidance. Your torch lights the way! The Garden awaits...' },
  3:  { xp: 120, gems: 5,  icon: '🌟', title: 'GARDEN DISCOVERED!',      msg: "SubhanAllah! The story of Adam (AS) — the first human, the first test, the first tawbah. On to the Shores of Sinai!" },
  4:  { xp: 110, gems: 4,  icon: '🌊', title: 'SHORES DISCOVERED!',      msg: "MashAllah! You matched all five miracles of Bani Isra'il. Keep going!" },
  5:  { xp: 100, gems: 4,  icon: '🐄', title: 'MYSTERY SOLVED!',         msg: "SubhanAllah! Simple obedience is wisdom. On to Level 6!" },
  6:  { xp: 110, gems: 4,  icon: '💎', title: 'HARD HEART CRACKED!',     msg: "MashAllah! May Allah keep our hearts soft. Level 7 — the Ka'ba — awaits!" },
  7:  { xp: 120, gems: 5,  icon: '🕋', title: "KA'BA DISCOVERED!",       msg: "SubhanAllah! Every time you pray, you face the place Ibrahim and Ismail built with du'a." },
  8:  { xp: 100, gems: 4,  icon: '🧭', title: 'DIRECTION FOUND!',        msg: 'MashAllah! Now you know the Qibla and the verse of patience. Level 9 has the Big Rules!' },
  9:  { xp: 110, gems: 4,  icon: '📋', title: 'AL-BIRR MASTERED!',       msg: 'Excellent! Al-Birr is belief + generosity + worship + integrity + patience — all together.' },
  10: { xp: 130, gems: 5,  icon: '⚔️', title: 'BATTLE WON!',             msg: 'ALLAHU AKBAR! Small faithful armies beat giants when Allah is with them. Ayat al-Kursi is next!' },
  11: { xp: 150, gems: 6,  icon: '👑', title: 'KURSI MASTERED!',         msg: 'SubhanAllah! You know the greatest verse in the Quran. Recite it after every salah. The Garden awaits!' },
  12: { xp: 120, gems: 5,  icon: '🌱', title: 'GARDEN GROWN!',           msg: 'MashAllah! One grain → 700. Give sincerely and never fear losing. The Final Treasure is last!' },
  13: { xp: 200, gems: 10, icon: '🏆', title: 'SURAH COMPLETE!',         msg: 'ALLAHUMMA BARIK! All 13 levels done — all 286 verses of Al-Baqarah understood. May Allah make you among the Muttaqeen. آمين' },
};

window.SURAH_CONFIG = {
  totalLevels: 13,
  rewards: REWARDS,
  tileIcons:  ['🌿','🌑','🌟','🌊','🐄','💎','🕋','🧭','📋','⚔️','👑','🌱','🤲'],
  tileLabels: ["Plains","Caves","Garden","Shores","The Cow","Hard Heart","Ka'ba","Qibla","Al-Birr","Battle","Kursi","Charity","Du'a"],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Welcome to Baqarah Quest. You've memorised the greatest Surah — now discover its meaning! Choose Level 1 on the map below. 🗺️`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete — more knowledge awaits! 💪`,
    complete: name => `MashAllah, ${name}! Quest complete! All 13 levels done. May Allah bless your knowledge of Al-Baqarah. 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

// S1: Drag & Drop — Qualities of Muttaqeen (2:1-5)
const S1_ITEMS = [
  { id: 'i1', text: '🌙 Al-Ghayb\n(The Unseen)',             zone: 'z1' },
  { id: 'i2', text: '🕌 As-Salah\n(Prayer)',                 zone: 'z2' },
  { id: 'i3', text: '💰 Al-Infaq\n(Spending / Charity)',     zone: 'z3' },
  { id: 'i4', text: '📖 The Quran\n(Revealed to Muhammad ﷺ)',zone: 'z4' },
  { id: 'i5', text: '📜 Previous\nScriptures',               zone: 'z5' },
  { id: 'i6', text: '⚖️ Al-Akhirah\n(The Hereafter)',        zone: 'z6' },
];
const S1_ZONES = [
  { id: 'z1', desc: 'Things unseen by human eyes — angels, fate, Jannah, Jahannam, the Day of Judgment' },
  { id: 'z2', desc: 'Keeping the 5 daily prayers — your direct connection to Allah' },
  { id: 'z3', desc: 'Giving sadaqah & zakat — sharing your blessings with those in need' },
  { id: 'z4', desc: 'The final revelation sent to Prophet Muhammad ﷺ' },
  { id: 'z5', desc: 'The Torah of Musa (AS), Injeel of Isa (AS), and all earlier divine books' },
  { id: 'z6', desc: 'Full certainty in Paradise, Hellfire, and the Day of Return to Allah' },
];

// S2: Quiz — The Disbelievers & Hypocrites (2:6-20)
const S2_QUIZ = [
  { q: "When Allah says disbelievers' hearts are \"sealed,\" this means:",
    opts: ['They completely forgot the Quran',
           'They were born unable to believe',
           'They are physically deaf to words',
           'They chose to close their hearts so Allah sealed them'],
    correct: 3 },
  { q: "What is the KEY difference between hypocrites and open disbelievers?",
    opts: ['Hypocrites secretly pray more often',
           'Hypocrites say they believe but do not mean it',
           'Hypocrites are actually less dangerous',
           'Hypocrites read the Quran but disbelievers do not'],
    correct: 1 },
  { q: "In the Fire Parable (2:17), what happened to the hypocrites?",
    opts: ['Their fire burned them badly',
           'They found a better fire',
           'They all ran away safely',
           'Allah took away their light, leaving darkness'],
    correct: 3 },
  { q: "When told \"Don't spread corruption,\" the hypocrites replied:",
    opts: ['"We will try our very best"',
           '"Please forgive us for mistakes"',
           '"WE are only the reformers!"',
           '"We simply don\'t understand"'],
    correct: 2 },
  { q: "According to verse 2:10, what was in the hypocrites' hearts?",
    opts: ['Deep anger and jealousy',
           'A disease (spiritual sickness)',
           'Extreme fear and sadness',
           'Arrogance and excessive pride'],
    correct: 1 },
];

// S3: Story Order — Story of Adam (AS) (2:30-39)
const S3_EVENTS_CORRECT = [
  { id: 'e1', text: '🌍 Allah announces He will place a Khalifah on Earth' },
  { id: 'e2', text: '👼 Allah teaches Adam the names of ALL things' },
  { id: 'e3', text: '❓ The angels cannot name what Adam was taught' },
  { id: 'e4', text: '🙏 ALL angels bow to Adam in honor — Iblis arrogantly refuses' },
  { id: 'e5', text: '🍃 Adam and his wife live in Jannah — one tree is forbidden' },
  { id: 'e6', text: '😈 Shaytan tricks them — they eat from the forbidden tree' },
  { id: 'e7', text: '🤲 Adam makes sincere tawbah — Allah forgives — they descend to Earth' },
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

// S4: Drag & Drop — Miracles of Bani Isra'il (2:49-60)
const S4_ITEMS = [
  { id: 'f1', text: '🌊 The Sea\nSplit in Two',   zone: 'z1' },
  { id: 'f2', text: '🍞 Manna\n& Salwa Birds',    zone: 'z2' },
  { id: 'f3', text: '💧 12 Springs\nfrom a Rock', zone: 'z3' },
  { id: 'f4', text: '☁️ The Cloud\nof Shade',     zone: 'z4' },
  { id: 'f5', text: '⛰️ Mount Sinai\nCovenant',   zone: 'z5' },
];
const S4_ZONES = [
  { id: 'z1', desc: '"We parted it — you walked through on dry land — then it closed over your enemies" (2:50)' },
  { id: 'z2', desc: '"We sent sweet food and birds from the sky — without farming or hunting" (2:57)' },
  { id: 'z3', desc: '"One strike of the staff on a single rock — and twelve springs gushed out, one per tribe" (2:60)' },
  { id: 'z4', desc: '"We covered you with it in the scorching heat of the Sinai desert" (2:57)' },
  { id: 'z5', desc: '"We raised it above you and gave you the Book — hold it firmly and remember!" (2:63)' },
];

// S5: Quiz — The Mystery Cow (2:62-74)
const S5_QUIZ = [
  { q: "When Allah told Bani Isra'il to slaughter a cow, what was their FIRST reaction?",
    opts: ['They obeyed without any questions',
           'They asked: "Are you mocking us?"',
           'They completely refused',
           'They asked which Prophet said this'],
    correct: 1 },
  { q: "How many extra questions did Bani Isra'il ask before obeying?",
    opts: ['None — they obeyed straight away',
           'One quick question only',
           'Three questions: age, colour, type',
           'Ten detailed questions in total'],
    correct: 2 },
  { q: "What happened when they touched the dead man with the cow's part?",
    opts: ['A mark appeared on the killer\'s hand',
           'A voice from the sky named the killer',
           'The murderer immediately confessed',
           'The dead man revived and named his killer'],
    correct: 3 },
  { q: "What is the KEY lesson of the Cow story?",
    opts: ['Always ask detailed questions first',
           'Simple obedience is best — extra questions make it harder',
           'Cows are sacred animals in Islam',
           'Miracles happen only through animals'],
    correct: 1 },
  { q: 'Why is "Al-Baqarah" the perfect name for this Surah?',
    opts: ['Cows are mentioned the most in it',
           'The Cow story tests simple obedience — the Surah\'s main theme',
           'Cattle were most important to Arabs',
           'It was a favourite story of the Companions'],
    correct: 1 },
];

// S6: Story Order — The Hard Heart (2:75-103)
const S6_EVENTS_CORRECT = [
  { id: 'h1', text: "📜 Allah takes a covenant: Bani Isra'il must worship Him alone and be good to parents, orphans and the needy (2:83)" },
  { id: 'h2', text: '📖 Some of them change and corrupt the words of their own scripture (2:75–79)' },
  { id: 'h3', text: '🔄 Despite knowing the truth, most of them turn away and break their covenant (2:84)' },
  { id: 'h4', text: '🔮 They follow magic and what Shaytan spread, abandoning the Book of Allah (2:102)' },
  { id: 'h5', text: '💎 Their hearts become harder than stone — warnings no longer soften them (2:74)' },
  { id: 'h6', text: '🌊 Allah points out: even stones have rivers flowing from them — but their hearts have nothing left (2:74)' },
];
window._S6_EVENTS = S6_EVENTS_CORRECT;

// S7: Drag & Drop — Ibrahim & the Ka'ba (2:124-141)
const S7_ITEMS = [
  { id: 'k1', text: '🔥 Thrown\ninto the Fire',       zone: 'z1' },
  { id: 'k2', text: '👦 Son Ismail\nin the desert',   zone: 'z2' },
  { id: 'k3', text: "🕋 Raising\nthe Ka'ba walls",    zone: 'z3' },
  { id: 'k4', text: "🤲 Du'a for\na future Prophet",  zone: 'z4' },
  { id: 'k5', text: '⭐ Saw stars,\nmoon & sun',      zone: 'z5' },
];
const S7_ZONES = [
  { id: 'z1', desc: 'Allah made it cool and peaceful — the fire did not harm him (reference from Surah Al-Anbiya)' },
  { id: 'z2', desc: 'Allah blessed him and made a great nation from his descendants here (2:128)' },
  { id: 'z3', desc: 'Ibrahim and Ismail did this together, saying "Accept from us, O Allah" (2:127)' },
  { id: 'z4', desc: "He asked Allah to send a Prophet from his children — and our Prophet ﷺ came (2:129)" },
  { id: 'z5', desc: 'He first thought each was his Lord — but each set — until he turned to the Creator of all (6:76–79)' },
];

// S8: Quiz — The New Direction (2:142-157)
const S8_QUIZ = [
  { q: 'What was the original Qibla direction for Muslims?',
    opts: ['Mecca (al-Masjid al-Haram)',
           'Jerusalem — Masjid al-Aqsa',
           'Medina — Masjid an-Nabawi',
           'Cairo — the great mosque'],
    correct: 1 },
  { q: 'What is the correct Qibla for Muslims today?',
    opts: ['Jerusalem (Masjid al-Aqsa)',
           'Damascus (Umayyad Mosque)',
           'Mecca — al-Masjid al-Haram',
           'Medina (Masjid an-Nabawi)'],
    correct: 2 },
  { q: 'According to 2:155, what are the types of tests Allah sends?',
    opts: ['Only wealth and children tests',
           'Only sickness and weakness',
           'Fear, hunger, loss of wealth, lives and fruits',
           'Only enemies and battles'],
    correct: 2 },
  { q: "What do we say when hardship strikes? (2:156)",
    opts: ['"Alhamdulillah" only',
           '"Inna lillahi wa inna ilayhi raji\'un"',
           '"Astaghfirullahi al-Azeem"',
           '"Allahu Akbar"'],
    correct: 1 },
  { q: 'What does Allah promise those who are patient? (2:157)',
    opts: ['Immediate wealth and comfort',
           'Freedom from all future tests',
           'Allah\'s blessings, mercy and guidance upon them',
           'They enter Jannah before everyone else'],
    correct: 2 },
];

// S9: Drag & Drop — Al-Birr (2:177)
const S9_ITEMS = [
  { id: 'b1', text: '💚 Believing in\nAllah, angels\n& all Prophets', zone: 'z1' },
  { id: 'b2', text: '💰 Giving wealth\nto orphans,\nthe poor & needy',zone: 'z2' },
  { id: 'b3', text: '🙏 Establishing\nSalah & giving\nZakah',         zone: 'z3' },
  { id: 'b4', text: '🤝 Keeping your\npromises when\nyou make them',  zone: 'z4' },
  { id: 'b5', text: '💪 Being patient\nin hardship\n& difficulty',    zone: 'z5' },
];
const S9_ZONES = [
  { id: 'z1', desc: '"BELIEF" — Righteousness includes believing in Allah, angels, books, prophets and the Last Day (2:177)' },
  { id: 'z2', desc: '"GENEROSITY" — Giving wealth to those in need: relatives, orphans, the poor, travellers (2:177)' },
  { id: 'z3', desc: '"WORSHIP" — The formal pillars: establishing prayer and paying zakah (2:177)' },
  { id: 'z4', desc: '"INTEGRITY" — Fulfilling covenants and commitments you have made (2:177)' },
  { id: 'z5', desc: '"PATIENCE (Sabr)" — Bearing poverty, hardship and battles with patience (2:177)' },
];

// S10: Story Order — Talut, Jalut & Dawud (2:243-253)
const S10_EVENTS_CORRECT = [
  { id: 't1', text: "🏰 Bani Isra'il ask their Prophet for a king to lead them in battle (2:246)" },
  { id: 't2', text: '👑 Allah appoints Talut (Saul) as king — the people object: "He\'s not wealthy enough!" (2:247)' },
  { id: 't3', text: '🌊 Talut tests the army at a river: "Do not drink — except one small handful" (2:249)' },
  { id: 't4', text: '🏃 Most of the army drinks and leaves; only a small faithful group remains (2:249)' },
  { id: 't5', text: "⚔️ The small army faces the massive army of Jalut (Goliath) and make du'a to Allah (2:250)" },
  { id: 't6', text: '🗿 Young Dawud kills Jalut with a sling and stone — the great army is defeated (2:251)' },
  { id: 't7', text: '🌟 Allah gives Dawud kingship and wisdom and teaches him what He wills (2:251)' },
];
window._S10_EVENTS = S10_EVENTS_CORRECT;

// S11: Drag & Drop — Ayat al-Kursi (2:255)
const S11_ITEMS = [
  { id: 'ac1', text: '"No deity\nexcept Him"',                  zone: 'z1' },
  { id: 'ac2', text: '"Ever-Living,\nSustainer of All"',        zone: 'z2' },
  { id: 'ac3', text: '"Neither sleep\nnor drowsiness"',         zone: 'z3' },
  { id: 'ac4', text: '"Throne extends\nover heavens & earth"',  zone: 'z4' },
  { id: 'ac5', text: '"None grasp\nany of His knowledge"',      zone: 'z5' },
];
const S11_ZONES = [
  { id: 'z1', desc: '🔤 اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ — Allahu la ilaha illa huwa' },
  { id: 'z2', desc: '🔤 الْحَيُّ الْقَيُّومُ — Al-Hayyu Al-Qayyum' },
  { id: 'z3', desc: '🔤 لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ — La ta\'khudhuhu sinatun wa la nawm' },
  { id: 'z4', desc: '🔤 وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ — Wasi\'a kursiyyuhu as-samawati wal-ard' },
  { id: 'z5', desc: '🔤 وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ — Wala yuhituna bi shay\'in min ilmihi' },
];

// S12: Quiz — The Charity Garden (2:261-274)
const S12_QUIZ = [
  { q: "In Allah's parable (2:261), one grain of wheat becomes how many grains?",
    opts: ['70 grains', '100 grains', '700 grains', '1,000 grains'],
    correct: 2 },
  { q: 'What TWO things completely cancel your charity reward? (2:264)',
    opts: ['Giving too much at once',
           'Reminding of your gift (mann) and hurting feelings (adha)',
           'Giving to non-Muslims',
           'Giving secretly instead of openly'],
    correct: 1 },
  { q: 'What is charity followed by hurt and reminders like? (2:264)',
    opts: ['Like a river that slowly dries up',
           'Like a tree that gets cut down',
           'Like a smooth rock — rain washes away the thin soil',
           'Like a star that fades and disappears'],
    correct: 2 },
  { q: 'According to 2:271, which form of charity is better?',
    opts: ['Giving openly so others are inspired',
           'Giving secretly to the poor',
           'Giving only to mosques and madrasas',
           'All forms are completely equal'],
    correct: 1 },
  { q: 'A kind word is better than charity followed by what? (2:263)',
    opts: ['Spending too much money',
           'Giving to the wrong person',
           'Hurt (adha) — injuring the recipient\'s feelings',
           'Making a public announcement'],
    correct: 2 },
];

// S13: Drag & Drop — The Final Treasure (2:284-286)
const S13_ITEMS = [
  { id: 'd1', text: '"No difference\nbetween Prophets"',          zone: 'z1' },
  { id: 'd2', text: "\"Allah doesn't\nburden beyond\ncapacity\"", zone: 'z2' },
  { id: 'd3', text: '"Don\'t hold us\naccountable\nfor mistakes"',zone: 'z3' },
  { id: 'd4', text: '"Don\'t burden\nus like those\nbefore us"',  zone: 'z4' },
  { id: 'd5', text: '"Grant us\nvictory over\ndisbelievers"',      zone: 'z5' },
];
const S13_ZONES = [
  { id: 'z1', desc: '🕊️ We believe in ALL the Prophets equally — Musa, Isa, Ibrahim, Muhammad ﷺ (2:285)' },
  { id: 'z2', desc: "💛 Allah's ultimate mercy: He never asks more than you can do (2:286)" },
  { id: 'z3', desc: '🙏 Asking forgiveness for honest mistakes and forgetfulness (2:286)' },
  { id: 'z4', desc: '🌿 Asking Allah not to place on us the heavy burdens given to those before (2:286)' },
  { id: 'z5', desc: "⚔️ The final plea of the Surah — asking Allah's help for the believers (2:286)" },
];

// =============================================
//  SECTION WRAPPERS
// =============================================
function renderSection1Game()  { renderDragDrop(1, S1_ITEMS, S1_ZONES); }
function checkSection1()       { checkDragDrop(1, S1_ZONES); }

function renderSection2Game()  { renderQuiz(2, S2_QUIZ); }
function checkSection2()       { checkQuiz(2, S2_QUIZ); }

function renderSection3Game()  { renderStoryOrder(3, S3_EVENTS_CORRECT); }
function checkSection3()       { checkStoryOrder(3, S3_EVENTS_CORRECT); }

function renderSection4Game()  { renderDragDrop(4, S4_ITEMS, S4_ZONES); }
function checkSection4()       { checkDragDrop(4, S4_ZONES); }

function renderSection5Game()  { renderQuiz(5, S5_QUIZ); }
function checkSection5()       { checkQuiz(5, S5_QUIZ); }

function renderSection6Game()  { renderStoryOrder(6, S6_EVENTS_CORRECT); }
function checkSection6()       { checkStoryOrder(6, S6_EVENTS_CORRECT); }

function renderSection7Game()  { renderDragDrop(7, S7_ITEMS, S7_ZONES); }
function checkSection7()       { checkDragDrop(7, S7_ZONES); }

function renderSection8Game()  { renderQuiz(8, S8_QUIZ); }
function checkSection8()       { checkQuiz(8, S8_QUIZ); }

function renderSection9Game()  { renderDragDrop(9, S9_ITEMS, S9_ZONES); }
function checkSection9()       { checkDragDrop(9, S9_ZONES); }

function renderSection10Game() { renderStoryOrder(10, S10_EVENTS_CORRECT); }
function checkSection10()      { checkStoryOrder(10, S10_EVENTS_CORRECT); }

function renderSection11Game() { renderDragDrop(11, S11_ITEMS, S11_ZONES); }
function checkSection11()      { checkDragDrop(11, S11_ZONES); }

function renderSection12Game() { renderQuiz(12, S12_QUIZ); }
function checkSection12()      { checkQuiz(12, S12_QUIZ); }

function renderSection13Game() { renderDragDrop(13, S13_ITEMS, S13_ZONES); }
function checkSection13()      { checkDragDrop(13, S13_ZONES); }

// =============================================
//  KA'BA WORLD BUILDER (surah-specific canvas)
// =============================================
function _buildLabel(ctx, W, msg, done, total) {
  ctx.fillStyle = 'rgba(255,215,0,0.8)'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#3a7a2a'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}

function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#06080f'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 90; i++) {
    const sx = (i * 5783 + 3) % W, sy = (i * 3917 + 7) % 170;
    const br = Math.min(0.9, (n / 5) * (0.3 + 0.6 * ((i * 7 % 10) / 10)));
    ctx.fillStyle = `rgba(255,240,200,${br})`; ctx.fillRect(sx, sy, i % 7 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1);
  }
  // Crescent (level 5+)
  if (n >= 5) {
    ctx.fillStyle = '#ffe8a0'; ctx.beginPath(); ctx.arc(490, 40, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#06080f'; ctx.beginPath(); ctx.arc(501, 33, 17, 0, Math.PI * 2); ctx.fill();
  }
  if (n < 1) { _buildLabel(ctx, W, "Complete levels to build the Ka'ba! 🕋", 0, 13); return; }
  // Plaza
  ctx.fillStyle = '#d0c8b8'; ctx.fillRect(0, 215, W, 35);
  ctx.strokeStyle = '#b8b0a0'; ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 215); ctx.lineTo(x, 250); ctx.stroke(); }
  for (let y = 215; y < 250; y += 18) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  if (n < 2) { _buildLabel(ctx, W, 'Plaza laid... 1/13', 1, 13); return; }
  // Raised platform
  ctx.fillStyle = '#bab0a0'; ctx.fillRect(155, 203, 250, 14);
  ctx.fillStyle = '#d0c8b8'; ctx.fillRect(155, 203, 250, 3);
  ctx.fillStyle = '#a09888'; ctx.fillRect(158, 214, 244, 3);
  if (n < 3) { _buildLabel(ctx, W, 'Platform placed! 2/13', 2, 13); return; }
  // Ka'ba geometry
  const KL = 200, KW = 160, KB = 203, KH = 136, KT = KB - KH;
  function drawWallBand(x, y, w, h) {
    ctx.fillStyle = '#1c1a14'; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#2a2820'; ctx.lineWidth = 1;
    for (let ly = y + 8; ly < y + h; ly += 8) { ctx.beginPath(); ctx.moveTo(x, ly); ctx.lineTo(x + w, ly); ctx.stroke(); }
    for (let lx = x + 14; lx < x + w; lx += 18) { ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx, y + h); ctx.stroke(); }
  }
  const bh = KH / 4, bandsBuilt = Math.min(4, Math.floor((n - 2) / 2.5) + 1);
  for (let b = 0; b < bandsBuilt; b++) drawWallBand(KL, KB - bh * (b + 1), KW, bh);
  if (n >= 8) {
    const dw = 46, dh = 66, dx = KL + KW / 2 - 23, dy = KB - dh;
    ctx.fillStyle = '#b07808'; ctx.fillRect(dx, dy, dw, dh);
    ctx.fillStyle = '#e8b820'; ctx.fillRect(dx + 4, dy + 4, dw - 8, dh - 4);
    ctx.fillStyle = '#ffd700'; ctx.fillRect(dx + 20, dy + 33, 7, 7);
  }
  if (n >= 11) {
    const ky = KT + 18;
    ctx.fillStyle = '#c8a010'; ctx.fillRect(KL, ky, KW, 20);
    ctx.fillStyle = '#e0c030'; ctx.fillRect(KL, ky - 1, KW, 3); ctx.fillRect(KL, ky + 20, KW, 3);
  }
  if (n >= 12) {
    ctx.fillStyle = '#2a2018'; ctx.fillRect(KL - 7, KT - 11, KW + 14, 14);
  }
  if (n >= 13) {
    const grd = ctx.createRadialGradient(KL + KW/2, KB - KH/2, KH/5, KL + KW/2, KB - KH/2, KH*1.1);
    grd.addColorStop(0, 'rgba(255,200,0,0.32)'); grd.addColorStop(1, 'rgba(255,200,0,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText("ALLAHUMMA BARIK! 🕋 KA'BA COMPLETE!", W / 2, 20);
    ctx.textAlign = 'left';
  } else {
    _buildLabel(ctx, W, `Building the Ka'ba — ${n}/13 levels`, n, 13);
  }
}

function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
