'use strict';
/* Surah Al-Ghashiyah (88) — The Overwhelming */
window.STORAGE_KEY = 'ghashiyahQuestSave';
window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Checked:false,
  s2Checked: false,
  s3Answers: {}, s3Checked: false,
  s4Checked: false,
  s5Answers: {}, s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Answers: {}, s7Checked: false,
};

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  1: { xp: 70,  gems: 3, icon: '⚡', title: 'Day Witness',   msg: "MashAllah! Al-Ghashiyah will OVERWHELM everything — two groups, two fates. May Allah make us among the faces of delight!" },
  2: { xp: 80,  gems: 3, icon: '😶', title: 'Face Keeper',   msg: "SubhanAllah! The wretched labor but gain nothing. Boiling water to drink, bitter thorns to eat. May Allah protect us!" },
  3: { xp: 90,  gems: 3, icon: '🌸', title: 'Garden Seeker', msg: "MashAllah! The blessed are satisfied with their effort — in a high garden with flowing springs. May Allah grant us this! Ameen." },
  4: { xp: 90,  gems: 3, icon: '🐪', title: 'Camel Watcher', msg: "SubhanAllah! The camel — perfectly designed by Allah. Every single feature points to its Creator!" },
  5: { xp: 100, gems: 4, icon: '🌤️', title: 'Sky Ponderer',  msg: "MashAllah! Four signs — camel, sky, mountains, earth. Allah says: LOOK! They all point to Him. Be of the Ulu al-Albab!" },
  6: { xp: 110, gems: 5, icon: '🔄', title: 'Return Knower', msg: "Allahu Akbar! Inna ilayna iyabahum — to US is their RETURN. Every soul will stand before Allah. May we stand with clean hearts. Ameen!" },
};

window.SURAH_CONFIG = {
  id: 's88',
  surahName: 'Al-Ghashiyah',
  surahArabic: 'الغاشية',
  totalLevels: 7,
  rewards: REWARDS,
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Welcome to Al-Ghashiyah — The Overwhelming! A stunning surah about the Day of Judgement. Two groups: faces downcast in the Fire, faces radiant in Paradise. 7 levels await!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. The reckoning is near — keep going! 💪`,
    complete: name => `MashAllah, ${name}! All 7 levels of Al-Ghashiyah done. "Inna ilayna iyabahum" — to Allah is our return. May we stand before Him with pure hearts. Ameen! 🏆`,
  },
};

/* ── Section 1: Drag & Drop — Day of Judgement overview (88:1-7) ── */
/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1 — هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ', words:[
    {ar:'الْغَاشِيَةِ', tr:'al-ghāshiyah', en:'the Overwhelming', freq:2},
    {ar:'حَدِيثُ', tr:'ḥadīth', en:'the story of', freq:36},
    {ar:'أَتَاكَ', tr:'atāka', en:'reached you', freq:130},
    {ar:'هَلْ', tr:'hal', en:'has', freq:101},
  ]},
  {label:'Verse 8-9 — وُجُوهٌ يَوْمَئِذٍ نَّاعِمَةٌ · لِّسَعْيِهَا رَاضِيَةٌ', words:[
    {ar:'رَاضِيَةٌ', tr:'rāḍiyah', en:'satisfied', freq:3},
    {ar:'لِّسَعْيِهَا', tr:'li-saʿyihā', en:'with their effort', freq:2},
    {ar:'نَّاعِمَةٌ', tr:'nāʿimah', en:'joyful', freq:2},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:37},
    {ar:'وُجُوهٌ', tr:'wujūh', en:'[other] faces', freq:34},
  ]},
  {label:'Verse 17 — أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ', words:[
    {ar:'خُلِقَتْ', tr:'khuliqat', en:'they were created', freq:29},
    {ar:'كَيْفَ', tr:'kayfa', en:'how', freq:89},
    {ar:'الْإِبِلِ', tr:'al-ibil', en:'the camels', freq:1},
    {ar:'إِلَى', tr:'ilā', en:'at', freq:189},
    {ar:'يَنظُرُونَ', tr:'yanẓurūn', en:'they look', freq:33},
    {ar:'أَفَلَا', tr:'afalā', en:'do they not', freq:50},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS = [
  { id: 'i1', text: 'Al-Ghashiyah',    zone: 'z1' },
  { id: 'i2', text: 'Faces\nDowncast', zone: 'z2' },
  { id: 'i3', text: 'Faces\nDelighted',zone: 'z3' },
  { id: 'i4', text: 'Boiling\nSpring', zone: 'z4' },
];
const S1_ZONES = [
  { id: 'z1', desc: 'The Overwhelming Event' },
  { id: 'z2', desc: 'The punished in Hellfire' },
  { id: 'z3', desc: 'The blessed in Paradise' },
  { id: 'z4', desc: 'Drink of the wretched' },
];

/* ── Section 2: Quiz — Faces Downcast (88:2-7) ── */
const S2_QUIZ = [
  { q: 'What does "Al-Ghashiyah" mean?',
    opts: ['The Great Darkness', 'The Blazing Fire', 'The Overwhelming Event', 'The Final Hour'],
    correct: 2 },
  { q: 'What does "amilah nasibah" describe?',
    opts: ['Angels carrying good deeds', 'Wretched ones toiling, exhausted', 'Righteous believers praying', 'Children playing in Paradise'],
    correct: 1 },
  { q: 'What is the drink of the wretched in Hellfire?',
    opts: ['Sweet date juice', 'Cold clear water', 'Pure flowing spring', 'Hot boiling spring'],
    correct: 3 },
  { q: 'What food is given to the wretched?',
    opts: ['Bitter thorns (dhari)', 'Ripe sweet dates', 'Fresh garden fruit', 'Warm filling bread'],
    correct: 0 },
];

/* ── Section 3: Drag & Drop — Paradise features (88:8-16) ── */
const S3_ITEMS = [
  { id: 'p1', text: 'Flowing\nsprings', zone: 'z1' },
  { id: 'p2', text: 'Raised\ncouches',  zone: 'z2' },
  { id: 'p3', text: 'Cups\nset ready', zone: 'z3' },
  { id: 'p4', text: 'Spread\ncarpets',  zone: 'z4' },
];
const S3_ZONES = [
  { id: 'z1', desc: 'Water of Paradise' },
  { id: 'z2', desc: 'Furniture of the blessed' },
  { id: 'z3', desc: 'Drinking vessels in Paradise' },
  { id: 'z4', desc: 'Floor coverings in Paradise' },
];

/* ── Section 4: Quiz — The Camel (88:17) ── */
const S4_QUIZ = [
  { q: 'What animal does Allah ask us to observe in 88:17?',
    opts: ['The proud lion', 'The patient camel', 'The swift eagle', 'The strong elephant'],
    correct: 1 },
  { q: 'What are camels traditionally called by Arabs?',
    opts: ['King of all beasts', 'Pride of the tribe', 'Gift from the sky', 'Ship of the desert'],
    correct: 3 },
  { q: "What does the camel's perfect design teach us?",
    opts: ['Nature is very powerful', 'Animals evolved slowly', 'Allah is the perfect Creator', 'Science explains all things'],
    correct: 2 },
  { q: 'How many creation signs does Allah mention in 88:17-20?',
    opts: ['Two signs only', 'Three total signs', 'Four signs: camel, sky, mountains, earth', 'Five separate signs'],
    correct: 2 },
];

/* ── Section 5: Quiz — Sky, Mountains, Earth (88:18-20) ── */
const S5_QUIZ = [
  { q: 'How is the sky described in 88:18?',
    opts: ['Filled with bright stars', 'Raised without pillars', 'Made of thick clouds', 'Always moving above'],
    correct: 1 },
  { q: 'What are mountains called in other Quran verses?',
    opts: ['Pillars of solid stone', 'Barriers of the earth', 'Pegs driven into earth', 'Walls of the world'],
    correct: 2 },
  { q: 'What does "sutihat" (earth) mean?',
    opts: ['Hot and burning', 'Spinning very fast', 'Spread out flat', 'Round and perfect'],
    correct: 2 },
  { q: 'What do all four creation signs together prove?',
    opts: ['The earth is very ancient', 'Nature is very strong', 'Science is always true', 'Allah is the Creator'],
    correct: 3 },
];

/* ── Section 6: Quiz — The Return (88:21-26) ── */
const S6_QUIZ = [
  { q: 'To whom is the final return of all people?',
    opts: ['To the angels above', 'To the prophets', 'To themselves only', 'To Allah alone'],
    correct: 3 },
  { q: "What is the Prophet's ﷺ role in 88:21?",
    opts: ['A judge over all', 'A controller of people', 'A reminder only', 'A king and ruler'],
    correct: 2 },
  { q: 'Who will face the Greatest Punishment?',
    opts: ['The poor and weak', 'Those who turn away and disbelieve', 'Those who miss prayers', 'People who forget Allah'],
    correct: 1 },
  { q: 'What does "Inna ilayna iyabahum" mean?',
    opts: ['Indeed We created them', 'Indeed We will judge them', 'Indeed to Us is their return', 'Indeed We watch over them'],
    correct: 2 },
];

/* ── Section wrappers ── */

function renderSection2Game() { renderDragDrop(2, S1_ITEMS, S1_ZONES); }
function checkSection2()      { checkDragDrop(2, S1_ZONES); }
function renderSection3Game() { renderQuiz(3, S2_QUIZ); }
function checkSection3()      { checkQuiz(3, S2_QUIZ); }
function renderSection4Game() { renderDragDrop(4, S3_ITEMS, S3_ZONES); }
function checkSection4()      { checkDragDrop(4, S3_ZONES); }
function renderSection5Game() { renderQuiz(5, S4_QUIZ); }
function checkSection5()      { checkQuiz(5, S4_QUIZ); }
function renderSection6Game() { renderQuiz(6, S5_QUIZ); }
function checkSection6()      { checkQuiz(6, S5_QUIZ); }
function renderSection7Game() { renderQuiz(7, S6_QUIZ); }
function checkSection7()      { checkQuiz(7, S6_QUIZ); }
function updateUIExtra()      { window._drawBuildCanvas(window.state.completed.length); }

/* ── World Builder Canvas ── */
window._drawBuildCanvas = function(n) {
  const cv = document.getElementById('build-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  const sky = st ? '#3a1248' : '#2a0820';
  const grd = st ? '#5a2270' : '#4e1c38';
  const acc = st ? '#f0c040' : '#e09030';

  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

  if (n >= 1) {
    // sun / dramatic light
    const g = ctx.createRadialGradient(W * 0.7, H * 0.25, 5, W * 0.7, H * 0.25, 60);
    g.addColorStop(0, '#ffdd80'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  if (n >= 2) {
    // ground
    ctx.fillStyle = grd; ctx.fillRect(0, H * 0.65, W, H * 0.35);
    // clouds
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = 'rgba(200,80,100,0.2)';
      ctx.beginPath(); ctx.ellipse(W * 0.2 + i * 60, 35, 35, 12, 0, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (n >= 3) {
    // garden trees
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = '#3a7a40'; ctx.fillRect(W * 0.05 + i * 40, H * 0.45, 8, 25);
      ctx.fillStyle = '#50aa50'; ctx.beginPath(); ctx.arc(W * 0.09 + i * 40, H * 0.43, 13, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (n >= 4) {
    // camel
    ctx.fillStyle = '#c87828';
    ctx.fillRect(W * 0.55, H * 0.48, 38, 20);
    ctx.fillRect(W * 0.84, H * 0.4, 10, 14);
    ctx.fillRect(W * 0.83, H * 0.35, 14, 9);
    ctx.fillRect(W * 0.72, H * 0.42, 6, 8);
    for (let i = 0; i < 4; i++) ctx.fillRect(W * 0.56 + i * 10, H * 0.67, 5, 10);
  }
  if (n >= 5) {
    // mountains
    ctx.fillStyle = '#7a4060';
    ctx.beginPath(); ctx.moveTo(0, H * 0.65); ctx.lineTo(W * 0.2, H * 0.3); ctx.lineTo(W * 0.4, H * 0.65); ctx.fill();
    ctx.fillStyle = '#5a3050';
    ctx.beginPath(); ctx.moveTo(W * 0.35, H * 0.65); ctx.lineTo(W * 0.55, H * 0.25); ctx.lineTo(W * 0.75, H * 0.65); ctx.fill();
  }
  if (n >= 6) {
    // arrows rising — "return to Allah"
    ctx.fillStyle = acc; ctx.font = 'bold 16px serif';
    for (let i = 0; i < 3; i++) ctx.fillText('↑', W * 0.8 + i * 12 - 12, H * 0.3 - i * 14);
    ctx.fillStyle = '#ffffffcc'; ctx.font = '8px serif';
    ctx.fillText('إِنَّ إِلَيْنَا إِيَابَهُمْ', W / 2 - 35, H * 0.12);
  }
};
