'use strict';
/* Surah Al-Ghashiyah (88) — The Overwhelming */
window.STORAGE_KEY = 'ghashiyahQuestSave';
window.state = { currentLevel: 0, completedLevels: [], stars: 0, explorerName: '' };

const REWARDS = {
  1: { title: 'Day Witness', icon: '⚡' },
  2: { title: 'Face Keeper', icon: '😶' },
  3: { title: 'Garden Seeker', icon: '🌸' },
  4: { title: 'Camel Watcher', icon: '🐪' },
  5: { title: 'Sky Ponderer', icon: '🌤️' },
  6: { title: 'Return Knower', icon: '🔄' }
};

window.SURAH_CONFIG = {
  id: 's88',
  surahName: 'Al-Ghashiyah',
  surahArabic: 'الغاشية',
  totalLevels: 6,
  rewards: REWARDS,
  tiles: [
    { level: 1, icon: '⚡', label: 'The Overwhelming', locked: false },
    { level: 2, icon: '😶', label: 'Faces Downcast', locked: true },
    { level: 3, icon: '🌸', label: 'Faces Delighted', locked: true },
    { level: 4, icon: '🐪', label: 'The Camel', locked: true },
    { level: 5, icon: '🌤️', label: 'Sky & Mountains', locked: true },
    { level: 6, icon: '🔄', label: 'The Return', locked: true }
  ],
  welcomeMessages: [
    'The Day of Judgement is real and close!',
    'Some faces will be in distress on that Day.',
    'The righteous will rejoice in Paradise.',
    'Look at the camel — how perfectly Allah created it!',
    'The sky, mountains, earth — all signs of Allah.',
    'To Allah is our final return — He will call us back.'
  ]
};

/* ── Drag & Drop Data ── */
const DD1 = {
  prompt: 'Match the Day of Judgement scenes:',
  pairs: [
    { term: 'Al-Ghashiyah', def: 'The Overwhelming Event' },
    { term: 'Faces Downcast', def: 'The punished in Hell' },
    { term: 'Faces Delighted', def: 'The blessed in Paradise' },
    { term: 'Al-Camel', def: 'Sign of Allah\'s creation' }
  ]
};
const DD2 = {
  prompt: 'Match the Hereafter descriptions:',
  pairs: [
    { term: 'Boiling spring', def: 'Drink of the wretched' },
    { term: 'Bitter thorns', def: 'Food of the wretched' },
    { term: 'Raised couches', def: 'Furniture of the blessed' },
    { term: 'Flowing springs', def: 'Water of Paradise' }
  ]
};
const DD3 = {
  prompt: 'Match the signs of Allah:',
  pairs: [
    { term: 'Camel', def: 'Created in wonder' },
    { term: 'Sky', def: 'Raised without pillars' },
    { term: 'Mountains', def: 'Set firm in earth' },
    { term: 'Earth', def: 'Spread out flat' }
  ]
};

/* ── Quiz Data ── */
const Q4 = [
  { q: 'What does "Al-Ghashiyah" mean?', opts: ['The Great', 'The Overwhelming', 'The Hour', 'The Fire'], ans: 1 },
  { q: 'What will the faces of the wretched look like?', opts: ['Glowing', 'Downcast', 'Smiling', 'Hidden'], ans: 1 },
  { q: 'What will the blessed drink in Paradise?', opts: ['Boiling water', 'Salty water', 'Sweet spring water', 'Nothing'], ans: 2 },
  { q: 'What fruit is NOT for the wretched?', opts: ['Bitter thorns', 'Dhari', 'Dates', 'Zaqqum'], ans: 2 }
];
const Q5 = [
  { q: 'What animal does Allah ask us to observe?', opts: ['Lion', 'Camel', 'Horse', 'Eagle'], ans: 1 },
  { q: 'What is raised without pillars?', opts: ['Mountains', 'Sky', 'Trees', 'Rivers'], ans: 1 },
  { q: 'What is set firm in the earth?', opts: ['Camels', 'Mountains', 'Rivers', 'Stars'], ans: 1 },
  { q: 'How is the earth described in this surah?', opts: ['Hot', 'Spread out', 'Round', 'Shaking'], ans: 1 }
];
const Q6 = [
  { q: 'To whom is all return?', opts: ['To the angels', 'To Allah', 'To the prophets', 'To themselves'], ans: 1 },
  { q: 'Who is the Reminder — the Prophet ﷺ?', opts: ['A warner only', 'A controller', 'A reminder', 'A judge'], ans: 2 },
  { q: 'Who will Allah punish on that Day?', opts: ['Everyone', 'Those who turn away and disbelieve', 'Only idolaters', 'The poor'], ans: 1 },
  { q: 'What is the greatest punishment?', opts: ['Darkness', 'The Greatest Punishment', 'Hunger', 'Thirst'], ans: 1 }
];

/* ── Section wrappers ── */
window.runSection1 = () => window._runDragDrop(1, DD1);
window.runSection2 = () => window._runDragDrop(2, DD2);
window.runSection3 = () => window._runDragDrop(3, DD3);
window.runSection4 = () => window._runQuiz(4, Q4);
window.runSection5 = () => window._runQuiz(5, Q5);
window.runSection6 = () => window._runQuiz(6, Q6);

/* ── World Builder Canvas ── */
window._drawBuildCanvas = function(n) {
  const cv = document.getElementById('build-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  const sky = st ? '#3d1a28' : '#1a0810';
  const grd = st ? '#5a2e40' : '#2e1020';
  const acc = st ? '#f0c040' : '#c88020';

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
