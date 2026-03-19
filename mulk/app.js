'use strict';
/* ================================================
   SURAH AL-MULK — app.js  (data layer only)
   ================================================ */

window.STORAGE_KEY = 'mulkQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Answers: {}, s1Checked: false,
  s2Checked: false,
  s3Order:   [], s3Checked: false,
  s4Answers: {}, s4Checked: false,
  s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Order:   [], s7Checked: false,
  s8Answers: {}, s8Checked: false,
};

const REWARDS = {
  1: { xp: 90,  gems: 3, icon: '🌌', title: 'AL-MULK KNOWN!',
       msg: 'MashAllah! "Tabaraka" — Blessed is He in whose hand is all dominion. Death AND life created as a test. Not most deeds — BEST deeds. Ahsanu amala!' },
  2: { xp: 100, gems: 4, icon: '⭐', title: 'PERFECT HEAVENS!',
       msg: 'SubhanAllah! "Look. Look again. Do you see any breaks?" Still no flaws. Every star His lamp — and protection from the devils.' },
  3: { xp: 90,  gems: 3, icon: '🔥', title: 'THE WARNING RECEIVED!',
       msg: 'MashAllah! "Did no warner come to you?" Every person is warned — the Quran, the Prophet ﷺ, the fitrah. Use your hearing and your reason!' },
  4: { xp: 100, gems: 4, icon: '🌙', title: 'FEAR IN SECRET BUILT!',
       msg: 'SubhanAllah! "Does He who created not know?" Al-Latif, Al-Khabir. He knows every thought. Fear Him when no one is watching.' },
  5: { xp: 100, gems: 4, icon: '🌍', title: 'EARTH EXPLORED!',
       msg: "MashAllah! \"Dhalul\" — the earth made tame FOR YOU. Walk through it, eat from it. And to Him is the resurrection." },
  6: { xp: 110, gems: 4, icon: '🦅', title: 'TAWAKKUL UNLOCKED!',
       msg: 'SubhanAllah! "None holds them up except ar-Rahman." Spread your wings and work hard — but know that ONLY Allah is holding everything up.' },
  7: { xp: 100, gems: 3, icon: '🌟', title: 'SIGNS UNDERSTOOD!',
       msg: 'MashAllah! He gave us hearing, vision, and hearts. "How little thanks you give." (67:23) Today you gave thanks.' },
  8: { xp: 150, gems: 8, icon: '💧', title: 'SURAH AL-MULK COMPLETE!',
       msg: 'ALLAHUMMA BARIK! All 8 levels complete! "If your water was to sink into the earth — who then could bring you flowing water?" Only Allah. Ameen!' },
};

window.SURAH_CONFIG = {
  totalLevels: 8,
  rewards: REWARDS,
  tileIcons:  ['🌌','⭐','🔥','🌙','🌍','🦅','🌟','💧'],
  tileLabels: ['Al-Mulk','Seven Heavens','The Warning','Fear in Secret','The Earth','Birds & Tawakkul','Signs','The Water'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Surah Al-Mulk — "Tabaraka alladhi biyadihi al-mulk." 8 levels of sovereignty. Let's begin!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Tabaraka!" Keep going! 🌌`,
    complete: name => `MashAllah, ${name}! All 8 levels of Al-Mulk complete! May it be your intercessor. Ameen! 💧`,
  },
};

// =============================================
//  GAME DATA
// =============================================

const S1_QUIZ = [
  { q: 'What does "Al-Mulk" mean?',
    opts: ['The Star above the horizon',
           'The Sovereignty / Dominion',
           'The Protector of believers',
           'The Night and its darkness'],
    correct: 1 },
  { q: 'According to 67:1, what does Allah hold in His hand?',
    opts: ['All dominion — He is over all things competent',
           'The keys to Jannah only',
           'The Book of Deeds of all people',
           'The fate of believers only'],
    correct: 0 },
  { q: 'Why did Allah create both death AND life? (67:2)',
    opts: ['To show His great power and majesty',
           'To give people freedom to make choices',
           'To test which of you is BEST in deed',
           'To balance the universe perfectly'],
    correct: 2 },
  { q: 'The test in 67:2 is "ahsanu amala" — what does this mean?',
    opts: ['Most deeds — quantity is what counts',
           'Biggest charity and donation given',
           'Most prayers performed consistently',
           'BEST in deed — quality and sincerity matter most'],
    correct: 3 },
  { q: 'What special role does Surah Al-Mulk perform according to a hadith?',
    opts: ['It lights up the reciter\'s grave brilliantly',
           'It intercedes for its reciter until they are forgiven',
           'It specifically repels jinn and evil spirits',
           'It increases the reciter\'s provision (rizq)'],
    correct: 1 },
];

const S2_ITEMS = [
  { id: 'h1', text: '👁️ "Look once —\ndo you see flaws?"',   zone: 'z1' },
  { id: 'h2', text: '🔁 "Look AGAIN —\na second time"',       zone: 'z2' },
  { id: 'h3', text: '⭐ "Stars adorn\nthe nearest heaven"',   zone: 'z3' },
  { id: 'h4', text: '☄️ "Shooting stars\nchase the devils"',  zone: 'z4' },
];
const S2_ZONES = [
  { id: 'z1', desc: '"You see no inconsistency in the creation of the Most Merciful." No flaws anywhere! (67:3)' },
  { id: 'z2', desc: '"Your sight will return to you humbled while it is fatigued." (67:4)' },
  { id: 'z3', desc: '"We have adorned the nearest heaven with lamps (stars)." (67:5)' },
  { id: 'z4', desc: '"We have made them as missiles to drive away the devils." (67:5)' },
];

const S3_EVENTS_CORRECT = [
  { id: 'f1', text: '🔥 For those who disbelieve in their Lord — the punishment of Hell awaits (67:6)' },
  { id: 'f2', text: '😱 When thrown into it, they hear its terrifying inhaling — it almost bursts with rage (67:7-8)' },
  { id: 'f3', text: '⚔️ The guardians ask every group: "Did no warner come to you?" (67:8)' },
  { id: 'f4', text: '😔 They confess: "Yes! A warner came — but we denied him" (67:9)' },
  { id: 'f5', text: '💭 They say: "If only we had been listening or reasoning — we would not be here!" (67:10)' },
  { id: 'f6', text: '⚡ So they acknowledge their sin — but far removed from mercy are the companions of the Blaze (67:11)' },
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

const S4_QUIZ = [
  { q: 'What does Allah promise those who fear Him "in the unseen" (bil-ghayb)? (67:12)',
    opts: ['Wealth and health in this world',
           'Forgiveness AND a great reward',
           'Ease in their daily life only',
           'A longer and more blessed life'],
    correct: 1 },
  { q: "What logical argument does 67:14 make about Allah's knowledge?",
    opts: ['"He reads the Book of Deeds carefully"',
           '"Does He who CREATED not know?" — He made every heart',
           '"He has recording angels watching everything"',
           '"He tests people specifically to find out"'],
    correct: 1 },
  { q: 'What are the two Names of Allah mentioned in 67:14?',
    opts: ['Al-Aziz and Al-Hakim',
           'Al-Latif (the Subtle) and Al-Khabir (the Acquainted)',
           'Ar-Rahman and Ar-Rahim',
           'Al-Malik and Al-Quddus'],
    correct: 1 },
  { q: 'According to 67:13, what does Allah know of us?',
    opts: ['Only the spoken words that are said aloud',
           'Only public actions that others can see',
           'The future deeds that have yet to happen',
           'What is within the chests — innermost thoughts'],
    correct: 3 },
  { q: 'What is "khashyat al-ghayb" — fearing Allah in the unseen?',
    opts: ['Fearing supernatural beings and evil spirits',
           'Fearing the Day of Judgment and its events only',
           'Being afraid of the dark and unseen world',
           'Choosing right when no human is watching — the truest test'],
    correct: 3 },
];

const S5_ITEMS = [
  { id: 'e1', text: '🌍 "The earth made\ntame (dhalul)"',            zone: 'z1' },
  { id: 'e2', text: '⚡ "What if He causes\nearth to swallow you?"', zone: 'z2' },
  { id: 'e3', text: '🌬️ "What if a storm\nof stones is sent?"',     zone: 'z3' },
  { id: 'e4', text: '📜 "Those before you\nalso denied"',            zone: 'z4' },
];
const S5_ZONES = [
  { id: 'z1', desc: '"He made the earth tame for you — walk through its slopes and eat of His provision." (67:15)' },
  { id: 'z2', desc: '"Do you feel secure that He would not cause the earth to swallow you?" (67:16)' },
  { id: 'z3', desc: '"Or do you feel secure He would not send against you a storm of stones?" (67:17)' },
  { id: 'z4', desc: '"And already those before them denied — and how terrible was My reproach!" (67:18)' },
];

const S6_QUIZ = [
  { q: 'According to 67:19 — what holds the birds up in the sky?',
    opts: ['Air currents and wind','None holds them except ar-Rahman (the Most Merciful)','Their own strength','The laws of physics alone'],
    correct: 1 },
  { q: 'What lesson does the image of birds in flight teach about tawakkul?',
    opts: ["Don't work — just trust Allah","Spread your wings and work hard — AND trust that only Allah is truly holding everything up","Birds are the strongest animals","Fly away from problems"],
    correct: 1 },
  { q: 'What does 67:20 ask about armies? (a rhetorical question)',
    opts: ['"How many soldiers do you need?"','"Who is it that could be an army for you other than ar-Rahman?"','"Which nation has the strongest army?"','"Should believers form an army?"'],
    correct: 1 },
  { q: 'What does 67:21 warn about provision?',
    opts: ['Provision is earned only through hard work','"Who could provide for you if He withheld His provision?" — all rizq comes from Him','Store extra food for emergencies','Never waste food'],
    correct: 1 },
  { q: 'According to 67:20 — what word describes the state of disbelievers who rely on other than Allah?',
    opts: ['Kafir','Fil ghurur — in delusion','Dhalimun — wrongdoers','Fasiqun — disobedient'],
    correct: 1 },
];

const S7_EVENTS_CORRECT = [
  { id: 'sg1', text: "👁️ Allah gave us hearing, vision, and hearts (af'ida) — but how little thanks is given! (67:23)" },
  { id: 'sg2', text: '🌍 He scattered us across the earth — and to Him we will be gathered (67:24)' },
  { id: 'sg3', text: '❓ The disbelievers challenge: "When will this promise come — if you are truthful?" (67:25)' },
  { id: 'sg4', text: '🗣️ The Prophet ﷺ responds: "The knowledge is only with Allah — I am only a plain warner" (67:26)' },
  { id: 'sg5', text: '😰 When they SEE it approaching — the faces of disbelievers will be full of grief (67:27)' },
  { id: 'sg6', text: '📢 And it will be said: "This is what you used to call for (in mockery)" (67:27)' },
];
window._S7_EVENTS = S7_EVENTS_CORRECT;

const S8_QUIZ = [
  { q: "What is the believer's declaration according to 67:29?",
    opts: ['"We fight for Allah\'s sake"','"He is ar-Rahman — we have believed in Him and upon Him we have relied (tawakkalna)"','"We obey the Messenger in all things"','"We give charity every day"'],
    correct: 1 },
  { q: 'What does 67:28 say about even if the Prophet ﷺ and the believers were to die?',
    opts: ['The religion would end','"Who will protect the disbelievers from a painful punishment?" — nothing saves them','Allah would replace them immediately','The Quran would be lost'],
    correct: 1 },
  { q: 'What is the final verse (67:30) asking?',
    opts: ['"Who created the seas?"','"If your water sank into the earth — who then could bring you flowing (ma\'in) water?"','"Why do rivers flow?"','"Who made the clouds rain?"'],
    correct: 1 },
  { q: 'What does "ma\'in ma\'in" (repeated "flowing water") emphasize?',
    opts: ['That rivers are beautiful','The urgency and extreme need — our total dependence on Allah for the most basic necessity','That Allah created two types of water','That water is a test only'],
    correct: 1 },
  { q: 'Surah Al-Mulk is also called "Al-Waqiya" — what does that mean?',
    opts: ['The Dominion','The Shield / The Protector — it protects its reciter from the punishment of the grave','The Surah of Water','The Night Surah'],
    correct: 1 },
];

// =============================================
//  SECTION WRAPPERS
// =============================================
function renderSection1Game() { renderQuiz(1, S1_QUIZ); }
function checkSection1()      { checkQuiz(1, S1_QUIZ); }
function renderSection2Game() { renderDragDrop(2, S2_ITEMS, S2_ZONES); }
function checkSection2()      { checkDragDrop(2, S2_ZONES); }
function renderSection3Game() { renderStoryOrder(3, S3_EVENTS_CORRECT); }
function checkSection3()      { checkStoryOrder(3, S3_EVENTS_CORRECT); }
function renderSection4Game() { renderQuiz(4, S4_QUIZ); }
function checkSection4()      { checkQuiz(4, S4_QUIZ); }
function renderSection5Game() { renderDragDrop(5, S5_ITEMS, S5_ZONES); }
function checkSection5()      { checkDragDrop(5, S5_ZONES); }
function renderSection6Game() { renderQuiz(6, S6_QUIZ); }
function checkSection6()      { checkQuiz(6, S6_QUIZ); }
function renderSection7Game() { renderStoryOrder(7, S7_EVENTS_CORRECT); }
function checkSection7()      { checkStoryOrder(7, S7_EVENTS_CORRECT); }
function renderSection8Game() { renderQuiz(8, S8_QUIZ); }
function checkSection8()      { checkQuiz(8, S8_QUIZ); }

// =============================================
//  SEVEN HEAVENS WORLD BUILDER (surah-specific)
// =============================================
function _buildLabelMulk(ctx, W, msg, done, total) {
  ctx.fillStyle = '#4060c0'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#080c1a'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#1e3080'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}
function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  const heavenPairs = [
    ['#020308','#05060e'],['#040614','#080c20'],['#060a1c','#0c1230'],
    ['#081030','#102040'],['#0a1440','#142050'],['#0c1850','#183060'],['#101e60','#203880'],
  ];
  const lH = Math.floor(H / 7);
  if (n < 1) { ctx.fillStyle = '#020308'; ctx.fillRect(0, 0, W, H); _buildLabelMulk(ctx, W, '🌌 Complete levels to reveal the Seven Heavens!', 0, 8); return; }
  for (let h = 0; h < 7; h++) {
    const stageNeeded = 7 - h, ly = h * lH, lh2 = h === 6 ? H - ly : lH;
    if (n >= stageNeeded) {
      const grad = ctx.createLinearGradient(0, ly, 0, ly + lh2);
      grad.addColorStop(0, heavenPairs[h][1]); grad.addColorStop(1, heavenPairs[h][0]);
      ctx.fillStyle = grad; ctx.fillRect(0, ly, W, lh2);
      ctx.fillStyle = 'rgba(100,130,255,0.35)'; ctx.font = '6px "Press Start 2P",monospace'; ctx.textAlign = 'right';
      ctx.fillText(`HEAVEN ${7 - h}`, W - 6, ly + lH * 0.58); ctx.textAlign = 'left';
    } else { ctx.fillStyle = '#010204'; ctx.fillRect(0, ly, W, lh2); }
  }
  ctx.strokeStyle = 'rgba(80,100,220,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([4,4]);
  for (let h = 1; h <= Math.min(n, 7); h++) { const ly = (7-h)*lH; ctx.beginPath(); ctx.moveTo(0,ly); ctx.lineTo(W,ly); ctx.stroke(); }
  ctx.setLineDash([]);
  for (let i = 0; i < 80; i++) {
    const sx = (i * 6143) % W, sy = 6 * lH + (i * 3761) % lH, br = 0.3 + (i % 5) * 0.12;
    ctx.fillStyle = `rgba(255,240,200,${br})`; ctx.fillRect(sx, sy, i % 9 === 0 ? 2 : 1, 1);
  }
  if (n >= 5) {
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2;
    for (let ss = 0; ss < 4; ss++) { const sx = 60 + ss * 120, sy = 6 * lH + 6 + ss * 3; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+45,sy-14); ctx.stroke(); ctx.fillStyle='#ffe060'; ctx.fillRect(sx+43,sy-16,7,7); }
  }
  if (n >= 6) {
    const sunR = 18 + (n-6)*8; ctx.strokeStyle='rgba(255,200,0,0.55)'; ctx.lineWidth=3;
    for (let ri=0;ri<8;ri++){const ra=(ri/8)*Math.PI*2;ctx.beginPath();ctx.moveTo(490+Math.cos(ra)*sunR,30+Math.sin(ra)*sunR);ctx.lineTo(490+Math.cos(ra)*(sunR+18),30+Math.sin(ra)*(sunR+18));ctx.stroke();}
    ctx.fillStyle='#ffcc00';ctx.beginPath();ctx.arc(490,30,sunR,0,Math.PI*2);ctx.fill();
  }
  if (n >= 8) {
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText('ALLAHUMMA BARIK! 🌌 SEVEN HEAVENS REVEALED!', W/2, 20); ctx.textAlign = 'left';
  } else { _buildLabelMulk(ctx, W, `Unveiling the heavens — ${n}/8 levels`, n, 8); }
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
