// =============================================
//  BAQARAH QUEST — app.js
//  Interactive learning game for Surah Al-Baqarah
// =============================================

// ---------- GAME STATE ----------
let state = {
  explorerName: '',
  xp: 0,
  gems: 0,
  completed: [],      // [1, 2, 3, 4]
  s1Checked: false,
  s2Answers: {},      // { 0: optionIndex, 1: ... }
  s2Checked: false,
  s3Order: [],        // current order of event ids
  s3Checked: false,
  s4Checked: false,
  s5Answers: {},  s5Checked: false,
  s6Order:   [],  s6Checked: false,
  s7Checked: false,
  s8Answers: {},  s8Checked: false,
  s9Checked: false,
  s10Order:  [], s10Checked: false,
  s11Checked: false,
  s12Answers: {}, s12Checked: false,
  s13Checked: false,
};

const STORAGE_KEY = 'baqarahQuestSave';

// ---------- SECTION REWARDS ----------
const REWARDS = {
  1: { xp: 80,  gems: 3, icon: '🌿', title: 'PLAINS UNLOCKED!',   msg: 'You discovered the 5 qualities of the Muttaqeen — the God-conscious believers. The first land of your quest is yours, Explorer! On to the Cave of Shadows...' },
  2: { xp: 100, gems: 4, icon: '🌑', title: 'SHADOWS CLEARED!',   msg: 'MashAllah! You now understand the two groups who rejected guidance. Your torch of knowledge lights the way through the darkness. The Garden awaits...' },
  3: { xp: 120, gems: 5, icon: '🌟', title: 'GARDEN DISCOVERED!', msg: 'SubhanAllah! You have completed the story of our father Adam (AS) — the first human, the first test, the first tawbah. On to the Shores of Sinai!' },
  4:  { xp: 110, gems:  4, icon: '🌊', title: 'SHORES DISCOVERED!',  msg: 'MashAllah! You matched all five miracles of Bani Isra\'il. Keep going!' },
  5:  { xp: 100, gems:  4, icon: '🐄', title: 'MYSTERY SOLVED!',     msg: 'SubhanAllah! The Surah is named after this story — simple obedience is wisdom. On to Level 6!' },
  6:  { xp: 110, gems:  4, icon: '💎', title: 'HARD HEART CRACKED!', msg: 'MashAllah! May Allah keep our hearts soft. Level 7 — the Ka\'ba — awaits!' },
  7:  { xp: 120, gems:  5, icon: '🕋', title: "KA'BA DISCOVERED!",   msg: 'SubhanAllah! Every time you pray, you face the place Ibrahim and Ismail built with du\'a.' },
  8:  { xp: 100, gems:  4, icon: '🧭', title: 'DIRECTION FOUND!',    msg: 'MashAllah! Now you know the Qibla and the verse of patience. Level 9 has the Big Rules!' },
  9:  { xp: 110, gems:  4, icon: '📋', title: 'AL-BIRR MASTERED!',   msg: 'Excellent! Al-Birr is belief + generosity + worship + integrity + patience — all together.' },
  10: { xp: 130, gems:  5, icon: '⚔️', title: 'BATTLE WON!',         msg: 'ALLAHU AKBAR! Small faithful armies beat giants when Allah is with them. Ayat al-Kursi is next!' },
  11: { xp: 150, gems:  6, icon: '👑', title: 'KURSI MASTERED!',     msg: 'SubhanAllah! You know the greatest verse in the Quran. Recite it after every salah. The Garden awaits!' },
  12: { xp: 120, gems:  5, icon: '🌱', title: 'GARDEN GROWN!',       msg: 'MashAllah! One grain → 700. Give sincerely and never fear losing. The Final Treasure is last!' },
  13: { xp: 200, gems: 10, icon: '🏆', title: 'SURAH COMPLETE!',     msg: 'ALLAHUMMA BARIK! All 13 levels done — all 286 verses of Al-Baqarah understood. May Allah make you among the Muttaqeen. آمين' },
};

// ---------- SECTION 1: DRAG & DROP DATA ----------
const S1_ITEMS = [
  { id: 'i1', text: '🌙 Al-Ghayb\n(The Unseen)',        zone: 'z1' },
  { id: 'i2', text: '🕌 As-Salah\n(Prayer)',             zone: 'z2' },
  { id: 'i3', text: '💰 Al-Infaq\n(Spending / Charity)', zone: 'z3' },
  { id: 'i4', text: '📖 The Quran\n(Revealed to Muhammad ﷺ)', zone: 'z4' },
  { id: 'i5', text: '📜 Previous\nScriptures',           zone: 'z5' },
  { id: 'i6', text: '⚖️ Al-Akhirah\n(The Hereafter)',    zone: 'z6' },
];

const S1_ZONES = [
  { id: 'z1', desc: 'Things unseen by human eyes — angels, fate, Jannah, Jahannam, the Day of Judgment' },
  { id: 'z2', desc: 'Keeping the 5 daily prayers — your direct connection to Allah' },
  { id: 'z3', desc: 'Giving sadaqah & zakat — sharing your blessings with those in need' },
  { id: 'z4', desc: 'The final revelation sent to Prophet Muhammad ﷺ' },
  { id: 'z5', desc: 'The Torah of Musa (AS), Injeel of Isa (AS), and all earlier divine books' },
  { id: 'z6', desc: 'Full certainty in Paradise, Hellfire, and the Day of Return to Allah' },
];

// ---------- SECTION 2: QUIZ DATA ----------
const S2_QUIZ = [
  {
    q: 'When Allah says the disbelievers\' hearts are "sealed," this means:',
    opts: [
      'They forgot the Quran',
      'They were born unable to believe',
      'They chose to close their hearts, so Allah sealed them',
      'They are physically deaf'
    ],
    correct: 2
  },
  {
    q: 'What is the KEY difference between hypocrites and open disbelievers?',
    opts: [
      'Hypocrites pray more often',
      'Hypocrites say they believe but don\'t mean it in their hearts',
      'Hypocrites are less dangerous',
      'Hypocrites read the Quran but disbelievers do not'
    ],
    correct: 1
  },
  {
    q: 'In the Fire Parable (2:17), what happened to the hypocrites?',
    opts: [
      'Their fire burned them',
      'They found a better fire',
      'They ran away safely',
      'Allah took away their light, leaving them in darkness'
    ],
    correct: 3
  },
  {
    q: 'When told "Don\'t spread corruption," the hypocrites replied:',
    opts: [
      '"We will try our best"',
      '"Forgive us for our mistakes"',
      '"WE are only reformers!"',
      '"We don\'t understand"'
    ],
    correct: 2
  },
  {
    q: 'According to verse 2:10, what was in the hypocrites\' hearts?',
    opts: [
      'Anger and jealousy',
      'A disease (spiritual sickness)',
      'Fear and sadness',
      'Arrogance and pride'
    ],
    correct: 1
  },
];

// ---------- SECTION 3: STORY ORDER DATA ----------
const S3_EVENTS_CORRECT = [
  { id: 'e1', text: '🌍 Allah announces He will place a Khalifah on Earth' },
  { id: 'e2', text: '👼 Allah teaches Adam the names of ALL things' },
  { id: 'e3', text: '❓ The angels cannot name what Adam was taught' },
  { id: 'e4', text: '🙏 ALL angels bow to Adam in honor — Iblis arrogantly refuses' },
  { id: 'e5', text: '🍃 Adam and his wife live in Jannah — one tree is forbidden' },
  { id: 'e6', text: '😈 Shaytan tricks them — they eat from the forbidden tree' },
  { id: 'e7', text: '🤲 Adam makes sincere tawbah — Allah forgives — they descend to Earth' },
];

// =============================================
//  SECTION 4: DRAG & DROP — MIRACLE MATCHING
// =============================================

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

// =============================================
//  SECTION 5 — QUIZ: THE MYSTERY COW (2:62–74)
// =============================================
const S5_QUIZ = [
  { q: 'When Allah told Bani Isra\'il to slaughter a cow, what was their FIRST reaction?',
    opts: ['They obeyed immediately', 'They asked: "Are you mocking us?"', 'They refused completely', 'They asked which Prophet told them'],
    correct: 1 },
  { q: 'How many extra questions did Bani Isra\'il ask about the cow before obeying?',
    opts: ['None — they obeyed straight away', 'One', 'Three (age, colour, and type)', 'Ten'],
    correct: 2 },
  { q: 'What happened when they touched the dead man with part of the slaughtered cow?',
    opts: ['A mark appeared on the killer\'s hand', 'A voice from the sky named the killer', 'The dead man came back to life and named his killer', 'The murderer confessed on his own'],
    correct: 2 },
  { q: 'What is the KEY lesson of the Cow story?',
    opts: ['Always ask detailed questions before obeying', 'Simple obedience is best — unnecessary questions make commands harder', 'Cows are sacred animals in Islam', 'Miracles only happen through animals'],
    correct: 1 },
  { q: 'Why is "Al-Baqarah" (The Cow) the perfect name for this whole Surah?',
    opts: ['Cows are mentioned the most in this Surah', 'The Cow story is a test of simple obedience — the theme of the whole Surah', 'Cattle were most important to Arabs', 'It was a favourite story of the Companions'],
    correct: 1 },
];

// =============================================
//  SECTION 6 — STORY ORDER: THE HARD HEART (2:75–103)
// =============================================
const S6_EVENTS_CORRECT = [
  { id: 'h1', text: '📜 Allah takes a covenant: Bani Isra\'il must worship Him alone and be good to parents, orphans and the needy (2:83)' },
  { id: 'h2', text: '📖 Some of them change and corrupt the words of their own scripture (2:75–79)' },
  { id: 'h3', text: '🔄 Despite knowing the truth, most of them turn away and break their covenant (2:84)' },
  { id: 'h4', text: '🔮 They follow magic and what Shaytan spread, abandoning the Book of Allah (2:102)' },
  { id: 'h5', text: '💎 Their hearts become harder than stone — warnings no longer soften them (2:74)' },
  { id: 'h6', text: '🌊 Allah points out: even stones have rivers flowing from them — but their hearts have nothing left (2:74)' },
];

// =============================================
//  SECTION 7 — DRAG & DROP: IBRAHIM & THE KA'BA (2:124–141)
// =============================================
const S7_ITEMS = [
  { id: 'k1', text: '🔥 Thrown\ninto the Fire',         zone: 'z1' },
  { id: 'k2', text: '👦 Son Ismail\nin the desert',     zone: 'z2' },
  { id: 'k3', text: '🕋 Raising\nthe Ka\'ba walls',     zone: 'z3' },
  { id: 'k4', text: '🤲 Du\'a for\na future Prophet',   zone: 'z4' },
  { id: 'k5', text: '⭐ Saw stars,\nmoon & sun',        zone: 'z5' },
];
const S7_ZONES = [
  { id: 'z1', desc: 'Allah made it cool and peaceful — the fire did not harm him (reference from Surah Al-Anbiya)' },
  { id: 'z2', desc: 'Allah blessed him and made a great nation from his descendants here (2:128)' },
  { id: 'z3', desc: 'Ibrahim and Ismail did this together, saying "Accept from us, O Allah" (2:127)' },
  { id: 'z4', desc: 'He asked Allah to send a Prophet from his children — and our Prophet ﷺ came (2:129)' },
  { id: 'z5', desc: 'He first thought each was his Lord — but each set — until he turned to the Creator of all (6:76–79)' },
];

// =============================================
//  SECTION 8 — QUIZ: THE NEW DIRECTION (2:142–157)
// =============================================
const S8_QUIZ = [
  { q: 'What was the original Qibla direction for Muslims (before the command changed)?',
    opts: ['Mecca', 'Jerusalem — Masjid al-Aqsa', 'Medina', 'Cairo'],
    correct: 1 },
  { q: 'What is the correct Qibla for Muslims today?',
    opts: ['Jerusalem', 'Damascus', 'Mecca — al-Masjid al-Haram', 'Medina'],
    correct: 2 },
  { q: 'According to 2:155, what are the types of tests Allah uses to try the believers?',
    opts: ['Only wealth and children', 'Only sickness', 'Fear, hunger, loss of wealth, lives and fruits', 'Only enemies and battles'],
    correct: 2 },
  { q: 'What do we say when loss or hardship strikes? (2:156)',
    opts: ['"Alhamdulillah" only', '"Inna lillahi wa inna ilayhi raji\'un" — We belong to Allah and to Him we return', '"Astaghfirullah"', '"Allahu Akbar"'],
    correct: 1 },
  { q: 'What does Allah promise those who are patient and say "Inna lillahi..."? (2:157)',
    opts: ['Immediate wealth', 'Freedom from all future tests', 'Allah\'s salawat (blessings), mercy and guidance are upon them', 'They enter Jannah before everyone else'],
    correct: 2 },
];

// =============================================
//  SECTION 9 — DRAG & DROP: AL-BIRR + RAMADAN (2:177 + 2:183)
// =============================================
const S9_ITEMS = [
  { id: 'b1', text: '💚 Believing in\nAllah, angels\n& all Prophets',  zone: 'z1' },
  { id: 'b2', text: '💰 Giving wealth\nto orphans,\nthe poor & needy', zone: 'z2' },
  { id: 'b3', text: '🙏 Establishing\nSalah & giving\nZakah',          zone: 'z3' },
  { id: 'b4', text: '🤝 Keeping your\npromises when\nyou make them',   zone: 'z4' },
  { id: 'b5', text: '💪 Being patient\nin hardship\n& difficulty',     zone: 'z5' },
];
const S9_ZONES = [
  { id: 'z1', desc: '"BELIEF" — Righteousness includes believing in Allah, angels, books, prophets and the Last Day (2:177)' },
  { id: 'z2', desc: '"GENEROSITY" — Giving wealth to those in need: relatives, orphans, the poor, travellers (2:177)' },
  { id: 'z3', desc: '"WORSHIP" — The formal pillars: establishing prayer and paying zakah (2:177)' },
  { id: 'z4', desc: '"INTEGRITY" — Fulfilling covenants and commitments you have made (2:177)' },
  { id: 'z5', desc: '"PATIENCE (Sabr)" — Bearing poverty, hardship and battles with patience (2:177)' },
];

// =============================================
//  SECTION 10 — STORY ORDER: TALUT, JALUT & DAWUD (2:243–253)
// =============================================
const S10_EVENTS_CORRECT = [
  { id: 't1', text: '🏰 Bani Isra\'il ask their Prophet for a king to lead them in battle (2:246)' },
  { id: 't2', text: '👑 Allah appoints Talut (Saul) as king — the people object: "He\'s not wealthy enough!" (2:247)' },
  { id: 't3', text: '🌊 Talut tests the army at a river: "Do not drink — except one small handful" (2:249)' },
  { id: 't4', text: '🏃 Most of the army drinks and leaves; only a small faithful group remains (2:249)' },
  { id: 't5', text: '⚔️ The small army faces the massive army of Jalut (Goliath) and make du\'a to Allah (2:250)' },
  { id: 't6', text: '🗿 Young Dawud kills Jalut with a sling and stone — the great army is defeated (2:251)' },
  { id: 't7', text: '🌟 Allah gives Dawud kingship and wisdom and teaches him what He wills (2:251)' },
];

// =============================================
//  SECTION 11 — DRAG & DROP: AYAT AL-KURSI (2:255)
// =============================================
const S11_ITEMS = [
  { id: 'ac1', text: '"No deity\nexcept Him"',                    zone: 'z1' },
  { id: 'ac2', text: '"Ever-Living,\nSustainer of All"',          zone: 'z2' },
  { id: 'ac3', text: '"Neither sleep\nnor drowsiness"',           zone: 'z3' },
  { id: 'ac4', text: '"Throne extends\nover heavens & earth"',    zone: 'z4' },
  { id: 'ac5', text: '"None grasp\nany of His knowledge"',        zone: 'z5' },
];
const S11_ZONES = [
  { id: 'z1', desc: '🔤 اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ — Allahu la ilaha illa huwa' },
  { id: 'z2', desc: '🔤 الْحَيُّ الْقَيُّومُ — Al-Hayyu Al-Qayyum' },
  { id: 'z3', desc: '🔤 لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ — La ta\'khudhuhu sinatun wa la nawm' },
  { id: 'z4', desc: '🔤 وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ — Wasi\'a kursiyyuhu as-samawati wal-ard' },
  { id: 'z5', desc: '🔤 وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ — Wala yuhituna bi shay\'in min ilmihi' },
];

// =============================================
//  SECTION 12 — QUIZ: THE CHARITY GARDEN (2:261–274)
// =============================================
const S12_QUIZ = [
  { q: 'In Allah\'s parable (2:261), one grain of wheat becomes how many grains?',
    opts: ['70', '100', '700', '1,000'],
    correct: 2 },
  { q: 'What TWO things completely cancel the reward of your charity? (2:264)',
    opts: ['Giving too much at once', 'Reminding the person of your gift (mann) and hurting their feelings (adha)', 'Giving to non-Muslims', 'Giving secretly instead of openly'],
    correct: 1 },
  { q: 'What is the parable of charity followed by hurt and reminders? (2:264)',
    opts: ['Like a river that dries up', 'Like a tree that gets cut down', 'Like a smooth rock covered in soil — rain washes away the soil, leaving only bare rock', 'Like a star that disappears'],
    correct: 2 },
  { q: 'According to 2:271, which form of charity is better?',
    opts: ['Giving openly so others are inspired to give', 'Giving secretly to the poor', 'Giving only to mosques', 'All forms are equal'],
    correct: 1 },
  { q: 'A kind word and forgiveness is better than charity followed by what? (2:263)',
    opts: ['Spending too much', 'Giving to the wrong person', 'Hurt (adha) — hurting the person\'s feelings', 'Making an announcement of it'],
    correct: 2 },
];

// =============================================
//  SECTION 13 — DRAG & DROP: THE FINAL TREASURE (2:284–286)
// =============================================
const S13_ITEMS = [
  { id: 'd1', text: '"No difference\nbetween Prophets"',         zone: 'z1' },
  { id: 'd2', text: '"Allah doesn\'t\nburden beyond\ncapacity"', zone: 'z2' },
  { id: 'd3', text: '"Don\'t hold us\naccountable\nfor mistakes"', zone: 'z3' },
  { id: 'd4', text: '"Don\'t burden\nus like those\nbefore us"',  zone: 'z4' },
  { id: 'd5', text: '"Grant us\nvictory over\ndisbelievers"',     zone: 'z5' },
];
const S13_ZONES = [
  { id: 'z1', desc: '🕊️ We believe in ALL the Prophets equally — Musa, Isa, Ibrahim, Muhammad ﷺ (2:285)' },
  { id: 'z2', desc: '💛 Allah\'s ultimate mercy: He never asks more than you can do (2:286)' },
  { id: 'z3', desc: '🙏 Asking forgiveness for honest mistakes and forgetfulness (2:286)' },
  { id: 'z4', desc: '🌿 Asking Allah not to place on us the heavy burdens given to those before (2:286)' },
  { id: 'z5', desc: '⚔️ The final plea of the Surah — asking Allah\'s help for the believers (2:286)' },
];

// =============================================
//  INITIALIZATION
// =============================================

function startGame() {
  const nameInput = document.getElementById('explorer-name').value.trim();
  const name = nameInput || 'Explorer';
  state.explorerName = name;
  loadProgress();
  state.explorerName = name; // keep name from input
  saveProgress();
  document.getElementById('intro-screen').style.display = 'none';
  updateUI();
  renderSection1Game();
  renderSection2Game();
  renderSection3Game();
  renderSection4Game();
  renderSection5Game();  renderSection6Game();  renderSection7Game();
  renderSection8Game();  renderSection9Game();  renderSection10Game();
  renderSection11Game(); renderSection12Game(); renderSection13Game();
}

function resetGame() {
  if (!confirm('Reset ALL progress and start over? This cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function initOnLoad() {
  const saved = loadProgress();
  if (saved && saved.explorerName) {
    document.getElementById('intro-screen').style.display = 'none';
    updateUI();
    renderSection1Game();
    renderSection2Game();
    renderSection3Game();
  }
}

// =============================================
//  LOCALSTORAGE
// =============================================

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch(e) {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      Object.assign(state, saved);
      return saved;
    }
  } catch(e) {}
  return null;
}

// =============================================
//  UI UPDATES
// =============================================

function updateUI() {
  document.getElementById('header-name').textContent    = state.explorerName || '—';
  document.getElementById('xp-display').textContent     = state.xp;
  document.getElementById('gems-display').textContent   = state.gems;
  document.getElementById('done-display').textContent   = state.completed.length;

  const welcomeEl = document.getElementById('welcome-text');
  if (state.completed.length === 0) {
    welcomeEl.textContent = `As-salamu alaykum, ${state.explorerName}! Welcome to Baqarah Quest. You've memorized the greatest Surah — now let's discover its meaning! Choose Level 1 on the map below. 🗺️`;
  } else if (state.completed.length < 13) {
    welcomeEl.textContent = `Welcome back, ${state.explorerName}! You've completed ${state.completed.length} level${state.completed.length > 1 ? 's' : ''}. Keep going — more knowledge awaits! 💪`;
  } else {
    welcomeEl.textContent = `MashAllah, ${state.explorerName}! Quest complete! All 13 levels done. May Allah bless your knowledge of Al-Baqarah. 🏆`;
  }

  // Update map tiles
  [1,2,3,4,5,6,7,8,9,10,11,12,13].forEach(n => {
    const tile   = document.getElementById(`tile-${n}`);
    const status = document.getElementById(`status-${n}`);
    if (!tile || !status) return;
    const isCompleted = state.completed.includes(n);
    const isUnlocked  = n === 1 || state.completed.includes(n - 1);

    tile.className = 'map-tile';
    if (isCompleted) {
      tile.classList.add('completed');
      tile.onclick = () => openSection(n);
      status.textContent = '✅ DONE';
    } else if (isUnlocked) {
      tile.classList.add('unlocked');
      tile.onclick = () => openSection(n);
      status.textContent = '▶ PLAY';
    } else {
      tile.classList.add('locked');
      tile.onclick = null;
      status.textContent = '🔒 LOCKED';
    }
  });

  // World builder chunks
  const chunkEmojis  = ['🌿','🌑','🌟','🌊','🐄','💎','🕋','🧭','📋','⚔️','👑','🌱','🤲'];
  const chunkLabels  = ['Plains','Caves','Garden','Shores','The Cow','Hard Heart',"Ka'ba",'Qibla','Al-Birr','Battle','Kursi','Charity',"Du'a"];
  [1,2,3,4,5,6,7,8,9,10,11,12,13].forEach(n => {
    const chunk = document.getElementById(`chunk-${n}`);
    if (!chunk) return;
    const emojiEl = chunk.querySelector('.chunk-emoji');
    const labelEl = chunk.querySelector('.chunk-label');
    if (state.completed.includes(n)) {
      chunk.classList.add(`revealed-${n}`);
      emojiEl.textContent = chunkEmojis[n - 1];
      labelEl.textContent = chunkLabels[n - 1] + ' ✅';
    } else {
      emojiEl.textContent = '⬛';
      labelEl.textContent = chunkLabels[n - 1];
    }
  });
}

// =============================================
//  NAVIGATION
// =============================================

function openSection(n) {
  const isUnlocked = n === 1 || state.completed.includes(n - 1);
  if (!isUnlocked) return;

  document.getElementById('main-view').style.display    = 'none';
  document.getElementById('section-view').style.display = 'block';

  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`section-panel-${n}`).classList.add('active');

  if (state.completed.length === 13) {
    document.getElementById('all-complete').style.display = 'block';
  }

  // Start the animated scene for this section
  if (typeof startScene === 'function') startScene(n);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSection() {
  document.getElementById('section-view').style.display = 'none';
  document.getElementById('main-view').style.display    = 'block';
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));

  // Stop all scene animation loops and hide any open popups
  if (typeof stopAllScenes  === 'function') stopAllScenes();
  if (typeof hideVersePopup === 'function') hideVersePopup();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
//  SECTION 1 — DRAG & DROP MATCH
// =============================================

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function renderSection1Game() {
  const pool      = document.getElementById('drag-pool-1');
  const zonesEl   = document.getElementById('drop-zones-1');
  if (!pool || !zonesEl) return;

  pool.innerHTML    = '';
  zonesEl.innerHTML = '';

  const shuffledItems = shuffle(S1_ITEMS);
  const shuffledZones = shuffle(S1_ZONES);

  shuffledItems.forEach(item => {
    const el = document.createElement('div');
    el.className        = 'drag-item';
    el.draggable        = true;
    el.dataset.itemId   = item.id;
    el.dataset.zone     = item.zone;
    el.dataset.pool     = 'drag-pool-1';
    el.textContent      = item.text;
    pool.appendChild(el);
  });

  shuffledZones.forEach(zone => {
    const el = document.createElement('div');
    el.className        = 'drop-zone';
    el.dataset.zoneId   = zone.id;
    el.innerHTML        = `<span class="drop-zone-desc">${zone.desc}</span>`;
    zonesEl.appendChild(el);
  });

  if (state.completed.includes(1) || state.s1Checked) {
    document.getElementById('complete-1-btn').style.display = 'inline-block';
    if (state.completed.includes(1)) markSectionComplete(1, false);
  }
}

// Global drag state
let dragging = null;

document.addEventListener('dragstart', e => {
  const item = e.target.closest('.drag-item');
  if (!item) return;
  dragging = item;
  setTimeout(() => item.classList.add('dragging'), 0);
  e.dataTransfer.setData('text/plain', item.dataset.itemId);
});

document.addEventListener('dragend', e => {
  const item = e.target.closest('.drag-item');
  if (item) item.classList.remove('dragging');
  dragging = null;
});

document.addEventListener('dragover', e => {
  const zone = e.target.closest('.drop-zone');
  if (zone) {
    e.preventDefault();
    zone.classList.add('drag-over');
  }
  const pool = e.target.closest('.drag-pool');
  if (pool) e.preventDefault();
});

document.addEventListener('dragleave', e => {
  const zone = e.target.closest('.drop-zone');
  if (zone && !zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
});

document.addEventListener('drop', e => {
  e.preventDefault();
  if (!dragging) return;

  const targetZone = e.target.closest('.drop-zone');
  const targetPool = e.target.closest('.drag-pool');

  if (targetZone) {
    targetZone.classList.remove('drag-over');
    // If zone already has an item, return it to its pool
    const existing = targetZone.querySelector('.drag-item');
    if (existing) {
      existing.classList.remove('placed');
      const poolEl = document.getElementById(existing.dataset.pool || 'drag-pool-1');
      if (poolEl) poolEl.appendChild(existing);
    }
    dragging.classList.add('placed');
    targetZone.appendChild(dragging);
  } else if (targetPool) {
    dragging.classList.remove('placed');
    targetPool.appendChild(dragging);
  }

  dragging = null;
});

// =============================================
//  TOUCH DRAG & DROP — iOS / Android support
// =============================================
(function () {
  let touchEl    = null;
  let touchClone = null;
  let offX = 0, offY = 0;

  function zoneAt(x, y) {
    if (touchClone) touchClone.style.visibility = 'hidden';
    const el = document.elementFromPoint(x, y);
    if (touchClone) touchClone.style.visibility = '';
    return el ? el.closest('.drop-zone') : null;
  }
  function poolOf(el) {
    return document.getElementById(el.dataset.pool) ||
           el.closest('.drag-pool');
  }

  document.addEventListener('touchstart', function (e) {
    const target = e.target.closest('.drag-item');
    if (!target) return;
    e.preventDefault();
    touchEl = target;
    touchEl.classList.add('dragging');
    const touch = e.touches[0];
    const rect  = target.getBoundingClientRect();
    offX = touch.clientX - rect.left;
    offY = touch.clientY - rect.top;
    touchClone = target.cloneNode(true);
    const cs   = window.getComputedStyle(target);
    Object.assign(touchClone.style, {
      position: 'fixed', zIndex: '9999', pointerEvents: 'none', opacity: '0.85',
      width: rect.width + 'px', minHeight: rect.height + 'px',
      left: (touch.clientX - offX) + 'px', top: (touch.clientY - offY) + 'px',
      margin: '0', background: cs.background, border: cs.border,
      padding: cs.padding, color: cs.color, fontSize: cs.fontSize,
      fontFamily: cs.fontFamily, lineHeight: cs.lineHeight,
      whiteSpace: 'pre-line', boxSizing: 'border-box', transform: 'scale(1.06)',
    });
    document.body.appendChild(touchClone);
  }, { passive: false });

  document.addEventListener('touchmove', function (e) {
    if (!touchEl) return;
    e.preventDefault();
    const touch = e.touches[0];
    touchClone.style.left = (touch.clientX - offX) + 'px';
    touchClone.style.top  = (touch.clientY - offY) + 'px';
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
    const zone = zoneAt(touch.clientX, touch.clientY);
    if (zone) zone.classList.add('drag-over');
  }, { passive: false });

  document.addEventListener('touchend', function (e) {
    if (!touchEl) return;
    const touch = e.changedTouches[0];
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
    const zone = zoneAt(touch.clientX, touch.clientY);
    if (zone) {
      const existing = zone.querySelector('.drag-item');
      if (existing && existing !== touchEl) {
        existing.classList.remove('placed');
        const p = poolOf(existing);
        if (p) p.appendChild(existing);
      }
      touchEl.classList.add('placed');
      zone.appendChild(touchEl);
    }
    touchEl.classList.remove('dragging');
    touchEl = null;
    if (touchClone) { touchClone.remove(); touchClone = null; }
  }, { passive: false });
}());

function checkSection1() {
  const zones    = document.querySelectorAll('#drop-zones-1 .drop-zone');
  let correct    = 0;
  const total    = S1_ZONES.length;

  zones.forEach(zone => {
    zone.classList.remove('correct', 'incorrect');
    const item = zone.querySelector('.drag-item');
    if (item && item.dataset.zone === zone.dataset.zoneId) {
      zone.classList.add('correct');
      correct++;
    } else if (item) {
      zone.classList.add('incorrect');
    }
  });

  const fb = document.getElementById('feedback-1');
  if (correct === total) {
    fb.textContent  = `🏆 Perfect! All ${total} matches correct! MashAllah!`;
    fb.className    = 'game-feedback success';
    state.s1Checked = true;
    saveProgress();
    document.getElementById('complete-1-btn').style.display = 'inline-block';
  } else if (correct >= 4) {
    fb.textContent = `✅ ${correct}/${total} correct! So close! Fix the incorrect ones (shown in red) and try again.`;
    fb.className   = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${total} correct. Re-read the story and try again. You can do it!`;
    fb.className   = 'game-feedback error';
  }
}

// =============================================
//  SECTION 2 — QUIZ
// =============================================

function renderSection2Game() {
  const container = document.getElementById('quiz-2');
  if (!container) return;
  container.innerHTML = '';

  S2_QUIZ.forEach((q, qi) => {
    const qEl = document.createElement('div');
    qEl.className = 'quiz-question';
    qEl.innerHTML = `<div class="question-text"><span class="q-num">Q${qi + 1}.</span>${q.q}</div>
      <div class="options-grid" id="opts-${qi}"></div>`;
    container.appendChild(qEl);

    const optsEl = qEl.querySelector(`#opts-${qi}`);
    q.opts.forEach((opt, oi) => {
      const btn = document.createElement('button');
      btn.className       = 'option-btn';
      btn.dataset.qi      = qi;
      btn.dataset.oi      = oi;
      btn.textContent     = opt;
      btn.onclick         = () => selectOption(qi, oi);
      optsEl.appendChild(btn);
    });
  });

  // Restore previous answers
  Object.entries(state.s2Answers).forEach(([qi, oi]) => {
    const btn = document.querySelector(`[data-qi="${qi}"][data-oi="${oi}"]`);
    if (btn) btn.classList.add('selected');
  });

  if (state.completed.includes(2) || state.s2Checked) {
    document.getElementById('complete-2-btn').style.display = 'inline-block';
    if (state.completed.includes(2)) markSectionComplete(2, false);
  }
}

function selectOption(qi, oi) {
  if (state.s2Checked) return;

  // Deselect all in this question
  document.querySelectorAll(`[data-qi="${qi}"]`).forEach(b => b.classList.remove('selected'));

  const btn = document.querySelector(`[data-qi="${qi}"][data-oi="${oi}"]`);
  if (btn) btn.classList.add('selected');
  state.s2Answers[qi] = oi;
  saveProgress();
}

function checkSection2() {
  const answered = Object.keys(state.s2Answers).length;
  if (answered < S2_QUIZ.length) {
    const fb = document.getElementById('feedback-2');
    fb.textContent = `⚠️ Please answer all ${S2_QUIZ.length} questions first!`;
    fb.className   = 'game-feedback partial';
    return;
  }

  let correct = 0;
  S2_QUIZ.forEach((q, qi) => {
    const selected = state.s2Answers[qi];
    document.querySelectorAll(`[data-qi="${qi}"]`).forEach((btn, oi) => {
      btn.disabled = true;
      btn.classList.remove('selected');
      if (oi === q.correct) btn.classList.add('correct');
      else if (oi === selected && selected !== q.correct) btn.classList.add('incorrect');
    });
    if (selected === q.correct) correct++;
  });

  const fb = document.getElementById('feedback-2');
  state.s2Checked = true;
  saveProgress();

  if (correct >= 4) {
    fb.textContent = `🏆 ${correct}/5 correct! Excellent work, Explorer! MashAllah!`;
    fb.className   = 'game-feedback success';
    document.getElementById('complete-2-btn').style.display = 'inline-block';
  } else if (correct >= 3) {
    fb.textContent = `📚 ${correct}/5 correct. Almost there — re-read the story and try again!`;
    fb.className   = 'game-feedback partial';
    state.s2Checked = false;
    setTimeout(() => {
      state.s2Answers = {};
      renderSection2Game();
    }, 2500);
  } else {
    fb.textContent = `❌ ${correct}/5 correct. Go back and re-read the story carefully, then try again!`;
    fb.className   = 'game-feedback error';
    state.s2Checked = false;
    setTimeout(() => {
      state.s2Answers = {};
      renderSection2Game();
    }, 2500);
  }
}

// =============================================
//  SECTION 3 — STORY ORDER
// =============================================

function renderSection3Game() {
  const container = document.getElementById('order-3');
  if (!container) return;

  // Initialize shuffle if not set
  if (!state.s3Order || state.s3Order.length !== S3_EVENTS_CORRECT.length) {
    state.s3Order = shuffle(S3_EVENTS_CORRECT).map(e => e.id);
    saveProgress();
  }

  renderOrderList();

  if (state.completed.includes(3) || state.s3Checked) {
    document.getElementById('complete-3-btn').style.display = 'inline-block';
    if (state.completed.includes(3)) markSectionComplete(3, false);
  }
}

function renderOrderList() {
  const container = document.getElementById('order-3');
  if (!container) return;
  container.innerHTML = '';

  state.s3Order.forEach((id, idx) => {
    const event = S3_EVENTS_CORRECT.find(e => e.id === id);
    if (!event) return;

    const item = document.createElement('div');
    item.className        = 'order-item';
    item.dataset.id       = id;
    item.innerHTML = `
      <div class="order-num">${idx + 1}</div>
      <div class="order-text">${event.text}</div>
      <div class="order-btns">
        <button class="order-btn" onclick="moveItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>↑</button>
        <button class="order-btn" onclick="moveItem(${idx},  1)" ${idx === state.s3Order.length - 1 ? 'disabled' : ''}>↓</button>
      </div>`;
    container.appendChild(item);
  });
}

function moveItem(idx, dir) {
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= state.s3Order.length) return;
  const arr   = [...state.s3Order];
  const temp  = arr[idx];
  arr[idx]    = arr[newIdx];
  arr[newIdx] = temp;
  state.s3Order = arr;
  saveProgress();
  renderOrderList();
}

function checkSection3() {
  const correctOrder = S3_EVENTS_CORRECT.map(e => e.id);
  let correct = 0;

  const items = document.querySelectorAll('#order-3 .order-item');
  items.forEach((item, idx) => {
    item.classList.remove('correct-pos', 'incorrect-pos');
    if (item.dataset.id === correctOrder[idx]) {
      item.classList.add('correct-pos');
      correct++;
    } else {
      item.classList.add('incorrect-pos');
    }
  });

  const fb = document.getElementById('feedback-3');
  const total = S3_EVENTS_CORRECT.length;

  if (correct === total) {
    fb.textContent = `🏆 Perfect order! MashAllah! You know the story of Adam (AS) by heart!`;
    fb.className   = 'game-feedback success';
    state.s3Checked = true;
    saveProgress();
    document.getElementById('complete-3-btn').style.display = 'inline-block';
  } else if (correct >= 5) {
    fb.textContent = `✅ ${correct}/${total} in the right position! Almost — adjust the red ones and check again.`;
    fb.className   = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${total} correct. Re-read the story above and try to reorder them again!`;
    fb.className   = 'game-feedback error';
  }
}

// =============================================
//  SECTION 4 — DRAG & DROP MIRACLE MATCH
// =============================================

function renderSection4Game() {
  const pool    = document.getElementById('drag-pool-4');
  const zonesEl = document.getElementById('drop-zones-4');
  if (!pool || !zonesEl) return;

  pool.innerHTML    = '';
  zonesEl.innerHTML = '';

  const shuffledItems = shuffle(S4_ITEMS);
  const shuffledZones = shuffle(S4_ZONES);

  shuffledItems.forEach(item => {
    const el = document.createElement('div');
    el.className      = 'drag-item';
    el.draggable      = true;
    el.dataset.itemId = item.id;
    el.dataset.zone   = item.zone;
    el.dataset.pool   = 'drag-pool-4';
    el.textContent    = item.text;
    pool.appendChild(el);
  });

  shuffledZones.forEach(zone => {
    const el = document.createElement('div');
    el.className      = 'drop-zone';
    el.dataset.zoneId = zone.id;
    el.innerHTML      = `<span class="drop-zone-desc">${zone.desc}</span>`;
    zonesEl.appendChild(el);
  });

  if (state.completed.includes(4) || state.s4Checked) {
    document.getElementById('complete-4-btn').style.display = 'inline-block';
    if (state.completed.includes(4)) markSectionComplete(4, false);
  }
}

function checkSection4() {
  const zones = document.querySelectorAll('#drop-zones-4 .drop-zone');
  let correct = 0;
  const total = S4_ZONES.length;

  zones.forEach(zone => {
    zone.classList.remove('correct', 'incorrect');
    const item = zone.querySelector('.drag-item');
    if (item && item.dataset.zone === zone.dataset.zoneId) {
      zone.classList.add('correct');
      correct++;
    } else if (item) {
      zone.classList.add('incorrect');
    }
  });

  const fb = document.getElementById('feedback-4');
  if (correct === total) {
    fb.textContent  = `🏆 Perfect! All ${total} miracles matched! MashAllah, Explorer!`;
    fb.className    = 'game-feedback success';
    state.s4Checked = true;
    saveProgress();
    document.getElementById('complete-4-btn').style.display = 'inline-block';
  } else if (correct >= 4) {
    fb.textContent = `✅ ${correct}/${total} correct! So close — fix the red ones and try again!`;
    fb.className   = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${total} correct. Re-read the story and try again, Explorer!`;
    fb.className   = 'game-feedback error';
  }
}

// =============================================
//  GENERIC GAME HELPERS (used by sections 5–13)
// =============================================

function _renderQuiz(n, quizData) {
  const container = document.getElementById(`quiz-${n}`);
  if (!container) return;
  container.innerHTML = '';
  quizData.forEach((q, qi) => {
    const qEl = document.createElement('div');
    qEl.className = 'quiz-question';
    qEl.innerHTML = `<div class="question-text"><span class="q-num">Q${qi + 1}.</span>${q.q}</div>
      <div class="options-grid" id="opts-${n}-${qi}"></div>`;
    container.appendChild(qEl);
    const optsEl = qEl.querySelector(`#opts-${n}-${qi}`);
    q.opts.forEach((opt, oi) => {
      const btn = document.createElement('button');
      btn.className       = 'option-btn';
      btn.dataset.qi      = qi;
      btn.dataset.oi      = oi;
      btn.dataset.section = n;
      btn.textContent     = opt;
      btn.onclick         = () => _selectOption(n, qi, oi);
      optsEl.appendChild(btn);
    });
  });
  const answers = state[`s${n}Answers`] || {};
  Object.entries(answers).forEach(([qi, oi]) => {
    const btn = document.querySelector(`[data-section="${n}"][data-qi="${qi}"][data-oi="${oi}"]`);
    if (btn) btn.classList.add('selected');
  });
  if (state.completed.includes(n) || state[`s${n}Checked`]) {
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
    if (state.completed.includes(n)) markSectionComplete(n, false);
  }
}

function _selectOption(n, qi, oi) {
  if (state[`s${n}Checked`]) return;
  document.querySelectorAll(`[data-section="${n}"][data-qi="${qi}"]`).forEach(b => b.classList.remove('selected'));
  const btn = document.querySelector(`[data-section="${n}"][data-qi="${qi}"][data-oi="${oi}"]`);
  if (btn) btn.classList.add('selected');
  if (!state[`s${n}Answers`]) state[`s${n}Answers`] = {};
  state[`s${n}Answers`][qi] = oi;
  saveProgress();
}

function _checkQuiz(n, quizData) {
  const answers  = state[`s${n}Answers`] || {};
  const answered = Object.keys(answers).length;
  if (answered < quizData.length) {
    const fb = document.getElementById(`feedback-${n}`);
    fb.textContent = `⚠️ Please answer all ${quizData.length} questions first!`;
    fb.className   = 'game-feedback partial';
    return;
  }
  let correct = 0;
  quizData.forEach((q, qi) => {
    const selected = answers[qi];
    document.querySelectorAll(`[data-section="${n}"][data-qi="${qi}"]`).forEach((btn, oi) => {
      btn.disabled = true;
      btn.classList.remove('selected');
      if (oi === q.correct)                             btn.classList.add('correct');
      else if (oi === selected && selected !== q.correct) btn.classList.add('incorrect');
    });
    if (selected === q.correct) correct++;
  });
  const fb    = document.getElementById(`feedback-${n}`);
  const total = quizData.length;
  const pass  = Math.ceil(total * 0.8);
  if (correct >= pass) {
    fb.textContent = `🏆 ${correct}/${total} correct! Excellent work, Explorer! MashAllah!`;
    fb.className   = 'game-feedback success';
    state[`s${n}Checked`] = true;
    saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= Math.ceil(total * 0.6)) {
    fb.textContent = `📚 ${correct}/${total} correct. Almost there — re-read the story and try again!`;
    fb.className   = 'game-feedback partial';
    state[`s${n}Checked`] = false;
    setTimeout(() => { state[`s${n}Answers`] = {}; _renderQuiz(n, quizData); }, 2500);
  } else {
    fb.textContent = `❌ ${correct}/${total} correct. Re-read the story carefully and try again!`;
    fb.className   = 'game-feedback error';
    state[`s${n}Checked`] = false;
    setTimeout(() => { state[`s${n}Answers`] = {}; _renderQuiz(n, quizData); }, 2500);
  }
}

function _renderDragDrop(n, items, zones) {
  const pool    = document.getElementById(`drag-pool-${n}`);
  const zonesEl = document.getElementById(`drop-zones-${n}`);
  if (!pool || !zonesEl) return;
  pool.innerHTML    = '';
  zonesEl.innerHTML = '';
  shuffle(items).forEach(item => {
    const el = document.createElement('div');
    el.className      = 'drag-item';
    el.draggable      = true;
    el.dataset.itemId = item.id;
    el.dataset.zone   = item.zone;
    el.dataset.pool   = `drag-pool-${n}`;
    el.textContent    = item.text;
    pool.appendChild(el);
  });
  shuffle(zones).forEach(zone => {
    const el = document.createElement('div');
    el.className      = 'drop-zone';
    el.dataset.zoneId = zone.id;
    el.innerHTML      = `<span class="drop-zone-desc">${zone.desc}</span>`;
    zonesEl.appendChild(el);
  });
  if (state.completed.includes(n) || state[`s${n}Checked`]) {
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
    if (state.completed.includes(n)) markSectionComplete(n, false);
  }
}

function _checkDragDrop(n, zones) {
  const dropZones = document.querySelectorAll(`#drop-zones-${n} .drop-zone`);
  let correct = 0;
  const total = zones.length;
  dropZones.forEach(zone => {
    zone.classList.remove('correct', 'incorrect');
    const item = zone.querySelector('.drag-item');
    if (item && item.dataset.zone === zone.dataset.zoneId) {
      zone.classList.add('correct');  correct++;
    } else if (item) {
      zone.classList.add('incorrect');
    }
  });
  const fb = document.getElementById(`feedback-${n}`);
  if (correct === total) {
    fb.textContent = `🏆 Perfect! All ${total} matched! MashAllah, Explorer!`;
    fb.className   = 'game-feedback success';
    state[`s${n}Checked`] = true;
    saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= total - 1) {
    fb.textContent = `✅ ${correct}/${total} correct! So close — fix the red one and try again!`;
    fb.className   = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${total} correct. Re-read the story and try again!`;
    fb.className   = 'game-feedback error';
  }
}

function _renderStoryOrder(n, eventsData) {
  const container = document.getElementById(`order-${n}`);
  if (!container) return;
  const orderKey = `s${n}Order`;
  if (!state[orderKey] || state[orderKey].length !== eventsData.length) {
    state[orderKey] = shuffle(eventsData).map(e => e.id);
    saveProgress();
  }
  _renderOrderItems(n, eventsData);
  if (state.completed.includes(n) || state[`s${n}Checked`]) {
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
    if (state.completed.includes(n)) markSectionComplete(n, false);
  }
}

function _renderOrderItems(n, eventsData) {
  const container = document.getElementById(`order-${n}`);
  if (!container) return;
  container.innerHTML = '';
  const orderKey = `s${n}Order`;
  state[orderKey].forEach((id, idx) => {
    const event = eventsData.find(e => e.id === id);
    if (!event) return;
    const item = document.createElement('div');
    item.className  = 'order-item';
    item.dataset.id = id;
    item.innerHTML  = `
      <div class="order-num">${idx + 1}</div>
      <div class="order-text">${event.text}</div>
      <div class="order-btns">
        <button class="order-btn" onclick="_moveOrderItem(${n},${idx},-1,S${n}_EVENTS_CORRECT)" ${idx === 0 ? 'disabled' : ''}>↑</button>
        <button class="order-btn" onclick="_moveOrderItem(${n},${idx}, 1,S${n}_EVENTS_CORRECT)" ${idx === state[orderKey].length - 1 ? 'disabled' : ''}>↓</button>
      </div>`;
    container.appendChild(item);
  });
}

function _moveOrderItem(n, idx, dir, eventsData) {
  const orderKey = `s${n}Order`;
  const newIdx   = idx + dir;
  if (newIdx < 0 || newIdx >= state[orderKey].length) return;
  const arr      = [...state[orderKey]];
  [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
  state[orderKey] = arr;
  saveProgress();
  _renderOrderItems(n, eventsData);
}

function _checkStoryOrder(n, eventsData) {
  const correctOrder = eventsData.map(e => e.id);
  const orderKey     = `s${n}Order`;
  let correct        = 0;
  const items        = document.querySelectorAll(`#order-${n} .order-item`);
  items.forEach((item, idx) => {
    item.classList.remove('correct-pos', 'incorrect-pos');
    if (item.dataset.id === correctOrder[idx]) { item.classList.add('correct-pos');   correct++; }
    else                                        { item.classList.add('incorrect-pos'); }
  });
  const fb    = document.getElementById(`feedback-${n}`);
  const total = eventsData.length;
  if (correct === total) {
    fb.textContent = '🏆 Perfect order! MashAllah! You know this story by heart!';
    fb.className   = 'game-feedback success';
    state[`s${n}Checked`] = true;
    saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= total - 1) {
    fb.textContent = `✅ ${correct}/${total} in the right position! Almost — adjust the red ones.`;
    fb.className   = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${total} correct. Re-read the story and try again!`;
    fb.className   = 'game-feedback error';
  }
}

// ---- SECTION WRAPPERS ----
function renderSection5Game()  { _renderQuiz(5, S5_QUIZ); }
function checkSection5()       { _checkQuiz(5, S5_QUIZ); }

function renderSection6Game()  { _renderStoryOrder(6, S6_EVENTS_CORRECT); }
function checkSection6()       { _checkStoryOrder(6, S6_EVENTS_CORRECT); }

function renderSection7Game()  { _renderDragDrop(7, S7_ITEMS, S7_ZONES); }
function checkSection7()       { _checkDragDrop(7, S7_ZONES); }

function renderSection8Game()  { _renderQuiz(8, S8_QUIZ); }
function checkSection8()       { _checkQuiz(8, S8_QUIZ); }

function renderSection9Game()  { _renderDragDrop(9, S9_ITEMS, S9_ZONES); }
function checkSection9()       { _checkDragDrop(9, S9_ZONES); }

function renderSection10Game() { _renderStoryOrder(10, S10_EVENTS_CORRECT); }
function checkSection10()      { _checkStoryOrder(10, S10_EVENTS_CORRECT); }

function renderSection11Game() { _renderDragDrop(11, S11_ITEMS, S11_ZONES); }
function checkSection11()      { _checkDragDrop(11, S11_ZONES); }

function renderSection12Game() { _renderQuiz(12, S12_QUIZ); }
function checkSection12()      { _checkQuiz(12, S12_QUIZ); }

function renderSection13Game() { _renderDragDrop(13, S13_ITEMS, S13_ZONES); }
function checkSection13()      { _checkDragDrop(13, S13_ZONES); }

// =============================================
//  SECTION COMPLETION
// =============================================

function completeSection(n) {
  if (state.completed.includes(n)) return;
  state.completed.push(n);

  const r = REWARDS[n];
  state.xp   += r.xp;
  state.gems += r.gems;
  saveProgress();
  updateUI();

  // Show reward
  document.getElementById('reward-icon').textContent  = r.icon;
  document.getElementById('reward-title').textContent = r.title;
  document.getElementById('reward-msg').textContent   = r.msg;
  document.getElementById('reward-xp-stat').textContent  = `+${r.xp} ⭐ XP`;
  document.getElementById('reward-gem-stat').textContent = `+${r.gems} 💎`;
  document.getElementById('reward-overlay').classList.add('visible');

  markSectionComplete(n, true);

  if (state.completed.length === 13) {
    document.getElementById('all-complete').style.display = 'block';
  }
}

function markSectionComplete(n, withAnimation) {
  const btn = document.getElementById(`complete-${n}-btn`);
  if (btn) {
    btn.style.display = 'inline-block';
    btn.disabled      = true;
    btn.textContent   = '✅ COMPLETED';
  }
}

function closeReward() {
  document.getElementById('reward-overlay').classList.remove('visible');
}

// =============================================
//  BOOT
// =============================================

window.addEventListener('DOMContentLoaded', () => {
  // Initialize animated scenes (canvases are ready even if hidden)
  if (typeof initScenes === 'function') initScenes();

  const saved = loadProgress();
  if (saved && saved.explorerName) {
    document.getElementById('intro-screen').style.display = 'none';
    updateUI();
    renderSection1Game();
    renderSection2Game();
    renderSection3Game();
    renderSection4Game();
    renderSection5Game();  renderSection6Game();  renderSection7Game();
    renderSection8Game();  renderSection9Game();  renderSection10Game();
    renderSection11Game(); renderSection12Game(); renderSection13Game();
  }
});
