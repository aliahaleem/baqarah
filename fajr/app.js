'use strict';
/* Surah Al-Fajr (89) — The Dawn */
window.STORAGE_KEY = 'fajrQuestSave';
window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Checked:false,
  s2Checked: false,
  s3Answers: {}, s3Checked: false,
  s4Order: [],    s4Checked: false,
  s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Answers: {}, s7Checked: false,
};

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  1: { xp: 70,  gems: 3, icon: '🌅', title: 'Oath Keeper',      msg: "SubhanAllah! Allah swears by the Fajr — the Dawn is a sign of His power. The ten nights of Dhul-Hijjah are the best days of the year. MashAllah!" },
  2: { xp: 80,  gems: 3, icon: '🏛️', title: 'History Reader',   msg: "MashAllah! \'Aad, Thamud, Pharaoh — three mighty civilisations, all destroyed. Tyranny never endures. Remember this always." },
  3: { xp: 90,  gems: 3, icon: '⚖️', title: 'Test Understander', msg: "SubhanAllah! Both wealth AND poverty are tests from Allah. Man is not honoured by wealth — he is tested by it. May Allah help us pass every test!" },
  4: { xp: 90,  gems: 3, icon: '💔', title: 'Wrong Spotter',     msg: "MashAllah! Not honouring orphans, not feeding the poor, consuming inheritance greedily — three wrongs Allah calls out by name. May we be of those who correct them!" },
  5: { xp: 100, gems: 4, icon: '💫', title: 'Day Witness',       msg: "Allahu Akbar! The Day of Regret — when the earth is levelled, when Allah manifests, when Jahannam is brought near. May we be ready. Ameen!" },
  6: { xp: 120, gems: 5, icon: '🕊️', title: 'Soul of Peace',    msg: "MashAllah! \"Ya ayyatuha an-nafs al-mutma'inna\" — O soul at rest! This is the highest honour: to be called back to Allah in peace, satisfied and pleasing. May we earn this. Ameen!" },
};

window.SURAH_CONFIG = {
  id: 's89',
  surahName: 'Al-Fajr',
  surahArabic: 'الفجر',
  totalLevels: 7,
  rewards: REWARDS,
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Welcome to Surah Al-Fajr — The Dawn! Ancient nations destroyed, the tests of wealth and poverty, the Day of Regret, and the most beautiful ending: "O tranquil soul — return to your Lord!" 7 levels of Quran quest await!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. The Dawn is calling — keep going! 💪`,
    complete: name => `MashAllah, ${name}! All 7 levels of Al-Fajr complete! "Ya ayyatuha an-nafs al-mutma'inna — irji'i ila rabbiki radiyatan mardiyyah." May you be among those souls. Ameen! 🏆`,
  },
};

/* ── Level 1: Drag & Drop — The Oaths (89:1-5) ── */
/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1-2 — وَالْفَجْرِ · وَلَيَالٍ عَشْرٍ', words:[
    {ar:'عَشْرٍ', tr:'ʿashr', en:'ten', freq:10},
    {ar:'وَلَيَالٍ', tr:'wa-layālin', en:'and ten nights', freq:8},
    {ar:'وَالْفَجْرِ', tr:'wal-fajr', en:'by the dawn', freq:6},
  ]},
  {label:'Verse 14 — إِنَّ رَبَّكَ لَبِالْمِرْصَادِ', words:[
    {ar:'لَبِالْمِرْصَادِ', tr:'la-bil-mirṣād', en:'is ever watchful', freq:1},
    {ar:'رَبَّكَ', tr:'rabbaka', en:'your Lord', freq:49},
    'inna',
  ]},
  {label:'Verse 27-28 — يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ · ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً', words:[
    {ar:'مَّرْضِيَّةً', tr:'marḍiyyah', en:'pleasing [to Him]', freq:1},
    {ar:'رَاضِيَةً', tr:'rāḍiyah', en:'satisfied', freq:3},
    {ar:'رَبِّكِ', tr:'rabbiki', en:'your Lord', freq:49},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:189},
    {ar:'ارْجِعِي', tr:'irjiʿī', en:'return', freq:1},
    {ar:'الْمُطْمَئِنَّةُ', tr:'al-muṭmaʾinnah', en:'at peace', freq:1},
    {ar:'النَّفْسُ', tr:'al-nafs', en:'O soul', freq:295},
    {ar:'يَا أَيَّتُهَا', tr:'yā ayyatuhā', en:'O you', freq:70},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS = [
  { id: 'o1', text: 'Wal-Fajr',      zone: 'z1' },
  { id: 'o2', text: 'Wayal-in \'ashr', zone: 'z2' },
  { id: 'o3', text: 'Wash-shaf\'',    zone: 'z3' },
  { id: 'o4', text: 'Wal-watr',       zone: 'z4' },
];
const S1_ZONES = [
  { id: 'z1', desc: 'By the Dawn — Allah swears by the Fajr prayer time' },
  { id: 'z2', desc: 'By the Ten Nights — first 10 nights of Dhul-Hijjah' },
  { id: 'z3', desc: 'By the Even — paired numbers in creation' },
  { id: 'z4', desc: 'By the Odd — especially the witr prayer' },
];

/* ── Level 2: Quiz — Three Destroyed Nations (89:6-14) ── */
const S2_QUIZ = [
  { q: 'Which nation built the great city of Iram with lofty pillars?',
    opts: ['Thamud', '\'Aad of Iram', 'Pharaoh\'s people', 'The people of Lot'],
    correct: 1 },
  { q: 'How were the people of \'Aad destroyed?',
    opts: ['By a violent windstorm', 'By a great earthquake', 'By being drowned', 'By a fire from the sky'],
    correct: 0 },
  { q: 'What crime did Thamud commit to deserve punishment?',
    opts: ['They worshipped idols publicly', 'They killed the she-camel of Allah', 'They attacked Mecca directly', 'They broke the fast of Ramadan'],
    correct: 1 },
  { q: 'What does "sawt al-adhab" (whip of punishment) in 89:13 describe?',
    opts: ['A slow creeping punishment', 'A gentle warning sign', 'A swift certain punishment from Allah', 'A punishment in the afterlife only'],
    correct: 2 },
  { q: 'What quality did all three destroyed nations share?',
    opts: ['They were poor and weak', 'They were ignorant of scriptures', 'They transgressed in the land and spread corruption', 'They lived far from water'],
    correct: 2 },
];

/* ── Level 3: Story Order — Two Attitudes Towards Tests (89:15-20) ── */
const S3_EVENTS_CORRECT = [
  { id: 'e1', text: '💰 Allah tests man by giving him wealth and honour — man says "My Lord honoured me!" (89:15)' },
  { id: 'e2', text: '😟 Allah tests man by restricting his provision — man says "My Lord humiliated me!" (89:16)' },
  { id: 'e3', text: '❌ But man does not honour the orphan or encourage feeding the poor (89:17-18)' },
  { id: 'e4', text: '💸 He consumes inheritance greedily, devouring it all without right (89:19)' },
  { id: 'e5', text: '❤️‍🔥 He loves wealth with an intense and overwhelming love (89:20)' },
  { id: 'e6', text: '⚖️ Allah\'s verdict: Both wealth AND poverty are tests — man misunderstands both (89:15-16)' },
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

/* ── Level 4: Drag & Drop — What Man Does Wrong (89:17-20) ── */
const S4_ITEMS = [
  { id: 'w1', text: 'Not\nhonouring\northans',   zone: 'z1' },
  { id: 'w2', text: 'Not feeding\nthe poor',     zone: 'z2' },
  { id: 'w3', text: 'Consuming\ninheritance',    zone: 'z3' },
  { id: 'w4', text: 'Loving\nwealth obsessively',zone: 'z4' },
];
const S4_ZONES = [
  { id: 'z1', desc: '"You do not honour the orphan" — the weak and vulnerable deserve care (89:17)' },
  { id: 'z2', desc: '"You do not encourage one another to feed the poor" — community responsibility (89:18)' },
  { id: 'z3', desc: '"You consume inheritance, devouring it all" — taking what is not yours (89:19)' },
  { id: 'z4', desc: '"You love wealth with excessive love" — the root of all these wrongs (89:20)' },
];

/* ── Level 5: Quiz — The Day of Regret (89:21-26) ── */
const S5_QUIZ = [
  { q: 'What happens to the earth on that Day according to 89:21?',
    opts: ['It becomes covered in water', 'It is levelled and crushed completely', 'It rises to the sky', 'It becomes like a garden'],
    correct: 1 },
  { q: 'What comes towards the disbeliever on that Day? (89:23)',
    opts: ['Rain and thunder', 'Jahannam is brought near', 'The angels come down', 'A great light appears'],
    correct: 1 },
  { q: 'What will man say on that Day? (89:24)',
    opts: ['"I am ready for judgment"', '"I wish I had obeyed"', '"Ya laytani qaddamtu li-hayati!" — I wish I had prepared', '"I have enough good deeds"'],
    correct: 2 },
  { q: 'How is Allah\'s punishment described in 89:25?',
    opts: ['Light and forgiving', 'None like it — the severest', 'Equal to human punishment', 'Limited to one year'],
    correct: 1 },
  { q: 'How is Allah\'s binding described in 89:26?',
    opts: ['None can escape it', 'Only the angels can escape', 'Prophets are exempt from it', 'None binds like it'],
    correct: 3 },
];

/* ── Level 6: Quiz — The Tranquil Soul (89:27-30) ── */
const S6_QUIZ = [
  { q: 'What is the "nafs mutma\'inna"?',
    opts: ['A soul full of regret', 'The tranquil, satisfied soul', 'A soul that feared death', 'A soul that gave charity'],
    correct: 1 },
  { q: 'What does "radiyatan mardiyyah" mean?',
    opts: ['Fearful and trembling', 'Sad but hopeful', 'Satisfied and pleasing to Allah', 'Angry at the world'],
    correct: 2 },
  { q: 'What does Allah invite the tranquil soul to do?',
    opts: ['Wait at the gates of Jannah', 'Return to Allah — enter His servants, enter His Jannah', 'Rest in a special place', 'Lead the other souls'],
    correct: 1 },
  { q: 'What is the greatest honour a person can receive?',
    opts: ['Being given much wealth', 'Dying on a Friday at Fajr', 'Being addressed by Allah as "ya nafs al-mutma\'inna"', 'Having all sins forgiven'],
    correct: 2 },
];

/* ── Section wrappers ── */

function renderSection2Game() { renderDragDrop(2, S1_ITEMS, S1_ZONES); }
function checkSection2()      { checkDragDrop(2, S1_ZONES); }
function renderSection3Game() { renderQuiz(3, S2_QUIZ); }
function checkSection3()      { checkQuiz(3, S2_QUIZ); }
function renderSection4Game() { renderStoryOrder(4, S3_EVENTS_CORRECT); }
function checkSection4()      { checkStoryOrder(4, S3_EVENTS_CORRECT); }
function renderSection5Game() { renderDragDrop(5, S4_ITEMS, S4_ZONES); }
function checkSection5()      { checkDragDrop(5, S4_ZONES); }
function renderSection6Game() { renderQuiz(6, S5_QUIZ); }
function checkSection6()      { checkQuiz(6, S5_QUIZ); }
function renderSection7Game() { renderQuiz(7, S6_QUIZ); }
function checkSection7()      { checkQuiz(7, S6_QUIZ); }
function updateUIExtra()      { window._drawBuildCanvas(window.state.completed.length); }

/* ── World Builder Canvas ── */
window._drawBuildCanvas = function(n) {
  const cv = document.getElementById('build-canvas'); if (!cv) return;
  const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  const sky = st ? '#3d2870' : '#0e0614';
  const grd = st ? '#5a3a60' : '#2a1440';
  const acc = st ? '#f4c840' : '#e8a030';

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, sky); bg.addColorStop(1, grd);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 40; i++) {
    const sx=(i*4517)%W, sy=(i*3701)%(H*0.6), br=Math.min(0.9,(n/3)*(0.2+(i%3)*0.2));
    ctx.fillStyle=`rgba(255,240,200,${br})`; ctx.fillRect(sx,sy,1,1);
  }

  if (n < 1) {
    ctx.fillStyle=acc; ctx.font='7px "Press Start 2P",monospace'; ctx.textAlign='center';
    ctx.fillText('🌅 Complete levels to reveal the Dawn scene!', W/2, 20); ctx.textAlign='left'; return;
  }

  // Ground
  ctx.fillStyle = st ? '#4a3060' : '#2a1440'; ctx.fillRect(0, H*0.65, W, H*0.35);

  // Dawn gradient sky (grows brighter with more levels)
  const dawnAlpha = Math.min(1, n*0.18);
  const dawn = ctx.createLinearGradient(0, H*0.5, 0, H*0.7);
  dawn.addColorStop(0, `rgba(${st?'180,100,180':'160,40,100'},${dawnAlpha})`);
  dawn.addColorStop(1, 'transparent');
  ctx.fillStyle = dawn; ctx.fillRect(0, H*0.5, W, H*0.5);

  if (n >= 2) {
    // Pillars of Iram
    for (let i = 0; i < 3; i++) {
      const cx = W*0.15+i*W*0.3;
      ctx.fillStyle = st ? '#7050a0' : '#4a2080'; ctx.fillRect(cx, H*0.3, 18, H*0.4);
      ctx.fillStyle = st ? '#9070c0' : '#6030a0'; ctx.fillRect(cx-3, H*0.28, 24, 10);
    }
  }
  if (n >= 3) {
    // Crescent moon
    ctx.fillStyle = acc; ctx.beginPath(); ctx.arc(W*0.78, H*0.18, 14, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = sky; ctx.beginPath(); ctx.arc(W*0.78+8, H*0.18-3, 12, 0, Math.PI*2); ctx.fill();
  }
  if (n >= 4) {
    // Palm trees
    for (let i = 0; i < 4; i++) {
      const tx = W*0.05+i*W*0.28;
      ctx.fillStyle = st ? '#6040a0' : '#3a1460'; ctx.fillRect(tx, H*0.45, 5, H*0.25);
      ctx.fillStyle = st ? '#50a050' : '#1a6020'; ctx.beginPath(); ctx.arc(tx+2, H*0.45, 12, 0, Math.PI*2); ctx.fill();
    }
  }
  if (n >= 5) {
    // Horizon glow (Day of Judgment)
    const hor = ctx.createRadialGradient(W*0.5, H*0.65, 5, W*0.5, H*0.65, W*0.4);
    hor.addColorStop(0, acc+'99'); hor.addColorStop(1, 'transparent');
    ctx.fillStyle = hor; ctx.fillRect(0, 0, W, H);
  }
  if (n >= 6) {
    // Garden of Paradise / tranquil soul
    ctx.fillStyle = '#1a5028'; ctx.fillRect(0, H*0.7, W, H*0.3);
    ctx.fillStyle = acc+'cc'; ctx.font='9px "Press Start 2P",monospace'; ctx.textAlign='center';
    ctx.fillText('يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ', W/2, H*0.85);
    ctx.fillStyle=acc; ctx.font='7px "Press Start 2P",monospace';
    ctx.fillText('AL-FAJR COMPLETE! 🌅', W/2, 16); ctx.textAlign='left';
  } else {
    ctx.fillStyle=acc; ctx.font='7px "Press Start 2P",monospace'; ctx.textAlign='center';
    ctx.fillText(`Dawn rising — ${n}/7 levels`, W/2, 16); ctx.textAlign='left';
  }
};
