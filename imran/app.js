'use strict';
// =============================================
//  AL-IMRAN QUEST — app.js
// =============================================

const STORAGE_KEY = 'imranQuestSave';

let state = {
  explorerName: '',
  xp: 0, gems: 0,
  completed: [],
  s1Answers: {}, s1Checked: false,
  s2Order: [],   s2Checked: false,
  s3Checked: false,
  s4Answers: {}, s4Checked: false,
  s5Checked: false,
  s6Order: [],   s6Checked: false,
  s7Answers: {}, s7Checked: false,
  s8Checked: false,
  s9Order: [],   s9Checked: false,
  s10Checked: false,
};

const REWARDS = {
  1:  { xp: 80,  gems: 3, icon: '🌟', title: 'THE BOOK UNDERSTOOD!',  msg: 'MashAllah! Muhkam vs mutashabih — those firmly grounded say "We believe in it all." You are among them!' },
  2:  { xp: 90,  gems: 3, icon: '👶', title: "MARYAM'S FAMILY KNOWN!", msg: 'SubhanAllah! Imran\'s wife, Maryam, Zakariyya, Yahya — every du\'a made sincerely is answered. Level 3 has miracles!' },
  3:  { xp: 100, gems: 4, icon: '✨', title: "ISA'S MIRACLES KNOWN!",  msg: 'MashAllah! Spoke from the cradle, healed, raised the dead — all "by Allah\'s permission." His miracles point to One Creator.' },
  4:  { xp: 90,  gems: 3, icon: '🕊️', title: 'IBRAHIM THE PURE!',      msg: 'SubhanAllah! Neither Jewish nor Christian — he was a pure Muslim. So are we. Hold the Rope is next!' },
  5:  { xp: 100, gems: 4, icon: '🤝', title: 'ROPE HELD TIGHT!',        msg: 'MashAllah! United in worship, generosity, self-control and forgiveness. May Allah make us the best nation. The battles are coming!' },
  6:  { xp: 110, gems: 4, icon: '⚔️', title: 'BADR UNDERSTOOD!',        msg: 'Allahu Akbar! 313 vs 1000 — angels and tawakkul. Victory is ONLY from Allah. On to the great lesson of Uhud!' },
  7:  { xp: 120, gems: 5, icon: '🏹', title: 'UHUD LESSON LEARNED!',    msg: 'MashAllah! Obedience is never optional. And "Hasbunallahu wa ni\'mal wakeel" — say it whenever you feel overwhelmed.' },
  8:  { xp: 110, gems: 4, icon: '💫', title: 'SHUHADA HONOURED!',       msg: 'SubhanAllah! Not dead — alive, provided for, rejoicing. May Allah grant the shuhada the highest stations. Ameen.' },
  9:  { xp: 120, gems: 5, icon: '🌌', title: 'SIGNS SEEN!',             msg: 'MashAllah! Every star, every sunrise — signs for Ulu al-Albab. You are becoming one of the people of understanding!' },
  10: { xp: 150, gems: 8, icon: '🤲', title: 'AL-IMRAN COMPLETE!',      msg: 'ALLAHUMMA BARIK! All 10 levels done. رَبَّنَا لَا تُزِغْ قُلُوبَنَا — May Allah keep your heart guided and give you what He promised. Ameen!' },
};

// =============================================
//  GAME DATA — SECTION 1: QUIZ
// =============================================
const S1_QUIZ = [
  { q: 'What does "Al-Imran" (the Surah\'s title) refer to?',
    opts: ['A great king of Arabia', 'The Family of Imran — Maryam\'s family', 'A type of prayer', 'A place near Mecca'],
    correct: 1 },
  { q: 'What are "muhkam" verses? (3:7)',
    opts: ['Hidden verses only scholars understand', 'Clear, foundational, unambiguous verses', 'Very long Quranic verses', 'Verses revealed only in Mecca'],
    correct: 1 },
  { q: 'What do those with "zaygh" (deviation) in their hearts do with mutashabih verses?',
    opts: ['Avoid them completely', 'Follow them correctly', 'Chase their hidden meanings to spread confusion', 'Memorize them before the clear ones'],
    correct: 2 },
  { q: 'Who truly knows the FULL meaning of the ambiguous verses? (3:7)',
    opts: ['The greatest scholars', 'The Prophet ﷺ only', 'Allah — and those firmly grounded say "We believe in all of it"', 'The angels who brought the revelation'],
    correct: 2 },
  { q: 'What is the response of those "firmly grounded in knowledge" to the entire Quran?',
    opts: ['They point out the difficult verses', '"All is from our Lord — we believe in it"', 'They only follow the clear verses', 'They ask for more explanation every time'],
    correct: 1 },
];

// =============================================
//  SECTION 2: STORY ORDER
// =============================================
const S2_EVENTS_CORRECT = [
  { id: 'm1', text: '🤲 Imran\'s wife dedicates her unborn child to Allah\'s service: "What is in my womb is given to You" (3:35)' },
  { id: 'm2', text: '👶 She gives birth to a girl and names her Maryam — she asks Allah\'s protection for her and her descendants (3:36)' },
  { id: 'm3', text: '🏛️ Zakariyya (AS) becomes Maryam\'s guardian; she grows under his care (3:37)' },
  { id: 'm4', text: '🍎 Zakariyya finds miraculous food in her prayer room — winter fruit in summer! (3:37)' },
  { id: 'm5', text: '🙏 Inspired by the miracle, Zakariyya makes du\'a for a righteous child of his own (3:38)' },
  { id: 'm6', text: '🌸 Angels give Zakariyya glad tidings: his son will be named Yahya — no one was named this before (3:39)' },
];

// =============================================
//  SECTION 3: DRAG & DROP — MIRACLES OF ISA
// =============================================
const S3_ITEMS = [
  { id: 'i1', text: '🗣️ Spoke from\nthe cradle',             zone: 'z1' },
  { id: 'i2', text: '🐦 Created birds\nfrom clay',           zone: 'z2' },
  { id: 'i3', text: '🦯 Healed the blind\nand lepers',       zone: 'z3' },
  { id: 'i4', text: '⚰️ Raised the\ndead to life',           zone: 'z4' },
  { id: 'i5', text: '📖 Confirmed the\nTorah & Injeel',      zone: 'z5' },
];
const S3_ZONES = [
  { id: 'z1', desc: '"He will speak to the people in the cradle and in maturity" (3:46)' },
  { id: 'z2', desc: '"He shapes from clay something like a bird — breathes into it — and it becomes a real bird, by Allah\'s permission" (3:49)' },
  { id: 'z3', desc: '"He heals those born blind and those with leprosy — by Allah\'s permission" (3:49)' },
  { id: 'z4', desc: '"He brings the dead back to life — by Allah\'s permission" (3:49)' },
  { id: 'z5', desc: '"Coming confirming what was before him in the Torah, and bringing the Injeel" (3:50)' },
];

// =============================================
//  SECTION 4: QUIZ — IBRAHIM THE PURE
// =============================================
const S4_QUIZ = [
  { q: 'According to 3:67, what was Ibrahim (AS)?',
    opts: ['A Prophet without a religion', 'A hanif — a pure monotheist who submitted to Allah alone', 'A follower of Musa (AS)', 'He followed the Torah only'],
    correct: 1 },
  { q: 'What is the "common word" Allah invites all to in 3:64?',
    opts: ['Follow the same prayer direction', 'Worship Allah alone and associate nothing with Him', 'Accept the Quran as the final scripture', 'Fast in Ramadan'],
    correct: 1 },
  { q: 'According to 3:96, what was the FIRST House established for humanity?',
    opts: ['The Temple in Jerusalem', 'The one in Bakkah (Mecca) — a blessing and guidance for all people', 'The tent of Ibrahim in the desert', 'Masjid al-Aqsa'],
    correct: 1 },
  { q: 'Who has the strongest claim to Ibrahim according to 3:68?',
    opts: ['Those who share his bloodline', 'The Jewish people who came later', 'Those who follow him — especially the Prophet ﷺ and the believers', 'The people of Mecca'],
    correct: 2 },
  { q: 'Allah took a covenant from ALL the Prophets (3:81). What did they promise?',
    opts: ['To build mosques in every land', 'To never contradict each other', 'That if a confirming messenger came, they must believe in and support him', 'To only speak Arabic'],
    correct: 2 },
];

// =============================================
//  SECTION 5: DRAG & DROP — HOLD THE ROPE
// =============================================
const S5_ITEMS = [
  { id: 'r1', text: '🤝 Hold fast to\nAllah\'s rope,\nall together',    zone: 'z1' },
  { id: 'r2', text: '🌟 Command good,\nforbid evil,\nbelieve in Allah', zone: 'z2' },
  { id: 'r3', text: '❤️ Spend in ease\nAND hardship',                  zone: 'z3' },
  { id: 'r4', text: '😤 Swallow\nyour anger',                          zone: 'z4' },
  { id: 'r5', text: '🙏 Pardon and\nforgive people',                   zone: 'z5' },
];
const S5_ZONES = [
  { id: 'z1', desc: '"Hold fast to Allah\'s rope, all together. Do not be divided. Remember — you were enemies and He united your hearts." (3:103)' },
  { id: 'z2', desc: '"You are the best nation raised for humanity — you command what is right, forbid what is wrong, and believe in Allah." (3:110)' },
  { id: 'z3', desc: 'A quality of the Muttaqeen: they give even when it is difficult — they trust Allah\'s provision completely. (3:134)' },
  { id: 'z4', desc: 'A quality of the Muttaqeen: they swallow their anger instead of acting on it — "Allah loves those who do good." (3:134)' },
  { id: 'z5', desc: 'A quality of the Muttaqeen: they pardon people — they forgive even when they could retaliate. (3:134)' },
];

// =============================================
//  SECTION 6: STORY ORDER — BATTLE OF BADR
// =============================================
const S6_EVENTS_CORRECT = [
  { id: 'b1', text: '🏃 The Prophet ﷺ and the Muslims march out to face the much larger Quraysh army (3:121)' },
  { id: 'b2', text: '🙏 The believers are outnumbered — they make du\'a and place complete tawakkul in Allah (3:122)' },
  { id: 'b3', text: '👼 Allah promises to reinforce them with 3,000 angels — and 5,000 if they are patient (3:124-125)' },
  { id: 'b4', text: '⚔️ The Battle of Badr begins — the small faithful force engages the massive enemy (3:123)' },
  { id: 'b5', text: '🏆 Allah gives the Muslims a decisive and unexpected victory over the much larger army (3:123)' },
  { id: 'b6', text: '📖 The lesson: "Victory comes only from Allah, the Almighty, the All-Wise." (3:126)' },
];

// =============================================
//  SECTION 7: QUIZ — LESSON OF UHUD
// =============================================
const S7_QUIZ = [
  { q: 'What was the main reason the Muslims suffered at the Battle of Uhud?',
    opts: ['They had too few weapons', 'The archers disobeyed and left their positions for the spoils of war', 'The Prophet ﷺ made a strategic error', 'The enemy had simply too many soldiers'],
    correct: 1 },
  { q: 'What does 3:144 teach about Prophet Muhammad ﷺ?',
    opts: ['He will never leave the believers', 'He is only a messenger — messengers passed before him; if he dies, will you turn back on your heels?', 'He chose who enters Jannah', 'He will return before the Day of Judgement'],
    correct: 1 },
  { q: 'What did the true believers say when told the enemy army had doubled? (3:173)',
    opts: ['They requested more soldiers', '"Hasbunallahu wa ni\'mal wakeel — Allah is sufficient for us!"', 'They asked the Prophet ﷺ to retreat', 'They asked for a truce'],
    correct: 1 },
  { q: 'What was the deeper wisdom of the setback at Uhud?',
    opts: ['Allah abandoned them temporarily', 'The disbelievers were genuinely stronger', 'To test true believers and expose the hypocrites — purification through difficulty', 'The angels did not arrive in time'],
    correct: 2 },
  { q: 'What does "Hasbunallahu wa ni\'mal wakeel" mean?',
    opts: ['"There is no god but Allah"', '"Allah is sufficient for us and the best Disposer of affairs"', '"We belong to Allah and to Him we return"', '"Victory comes from Allah alone"'],
    correct: 1 },
];

// =============================================
//  SECTION 8: DRAG & DROP — SHUHADA ALIVE
// =============================================
const S8_ITEMS = [
  { id: 'sh1', text: '🌟 "Do not think\nof them as dead"',          zone: 'z1' },
  { id: 'sh2', text: '🍽️ "Provided for\nby their Lord"',            zone: 'z2' },
  { id: 'sh3', text: '😊 "Rejoicing in\nAllah\'s bounty"',          zone: 'z3' },
  { id: 'sh4', text: '📣 "Glad news for\nthose still behind"',      zone: 'z4' },
  { id: 'sh5', text: '💛 "No fear shall\ncome upon them"',          zone: 'z5' },
];
const S8_ZONES = [
  { id: 'z1', desc: '"Do not think of those killed in Allah\'s cause as dead. No — they are alive with their Lord." (3:169)' },
  { id: 'z2', desc: '"They are being provided for by their Lord." Rizq (provision) reaches them from the unseen. (3:169)' },
  { id: 'z3', desc: '"Rejoicing in the bounty Allah has given them — and glad for those who follow them." (3:170)' },
  { id: 'z4', desc: '"They give glad tidings to those who have not yet joined them." Their joy overflows for the believers still on earth. (3:171)' },
  { id: 'z5', desc: '"That no fear shall come upon them, nor shall they grieve." Free from all anxiety — forever. (3:170)' },
];

// =============================================
//  SECTION 9: STORY ORDER — ULU AL-ALBAB
// =============================================
const S9_EVENTS_CORRECT = [
  { id: 'u1', text: '🌌 Allah points to the creation of the heavens, earth, and alternation of night and day as signs for people of understanding (3:190)' },
  { id: 'u2', text: '🙏 The Ulu al-Albab remember Allah while standing, sitting, and lying on their sides — in all states at all times (3:191)' },
  { id: 'u3', text: '🤔 They reflect: "Our Lord, You did not create all this without purpose! Glory be to You!" (3:191)' },
  { id: 'u4', text: '🔥 They ask: "Protect us from the punishment of the Fire — it is a dreadful fate!" (3:191)' },
  { id: 'u5', text: '🤲 They ask for forgiveness, for goodness in this life and the next, and to die with the righteous (3:193)' },
  { id: 'u6', text: '✅ Allah responds: "I will not let the deeds of any worker among you go to waste — male or female." (3:195)' },
];

// =============================================
//  SECTION 10: DRAG & DROP — FINAL DU'A
// =============================================
const S10_ITEMS = [
  { id: 'du1', text: '"Don\'t let\nhearts deviate"',                zone: 'z1' },
  { id: 'du2', text: '"Gather all\non the Day"',                    zone: 'z2' },
  { id: 'du3', text: '"Forgive sins\n& erase bad\ndeeds"',         zone: 'z3' },
  { id: 'du4', text: '"Give what\nYou promised\nthrough messengers"', zone: 'z4' },
  { id: 'du5', text: '"Don\'t disgrace\nus on the\nDay of Resurrection"', zone: 'z5' },
];
const S10_ZONES = [
  { id: 'z1', desc: '🔤 رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا — "Our Lord, do not let our hearts deviate after You have guided us" (3:8)' },
  { id: 'z2', desc: '🔤 رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ — "Our Lord, You will surely gather all people on the Day about which there is no doubt" (3:9)' },
  { id: 'z3', desc: '🔤 رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا — "Our Lord! Forgive our sins and erase our misdeeds" (3:193)' },
  { id: 'z4', desc: '🔤 رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ — "Our Lord! Give us what You promised through Your messengers" (3:194)' },
  { id: 'z5', desc: '🔤 رَبَّنَا لَا تُخْزِنَا يَوْمَ الْقِيَامَةِ — "Our Lord! Do not disgrace us on the Day of Resurrection" (3:192)' },
];

// =============================================
//  UTILITIES
// =============================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {}
}
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) Object.assign(state, JSON.parse(raw));
  } catch(e) {}
}

// =============================================
//  GENERIC GAME HELPERS
// =============================================
function _renderQuiz(n, quizData) {
  const container = document.getElementById(`quiz-${n}`);
  if (!container) return;
  container.innerHTML = '';
  quizData.forEach((q, qi) => {
    const qEl = document.createElement('div');
    qEl.className = 'quiz-question';
    qEl.innerHTML = `<div class="question-text"><span class="q-num">Q${qi+1}.</span>${q.q}</div>
      <div class="options-grid" id="opts-${n}-${qi}"></div>`;
    container.appendChild(qEl);
    q.opts.forEach((opt, oi) => {
      const btn = document.createElement('button');
      btn.className       = 'option-btn';
      btn.dataset.qi      = qi;
      btn.dataset.oi      = oi;
      btn.dataset.section = n;
      btn.textContent     = opt;
      btn.onclick         = () => _selectOption(n, qi, oi);
      qEl.querySelector(`#opts-${n}-${qi}`).appendChild(btn);
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
      if (oi === q.correct)                                btn.classList.add('correct');
      else if (oi === selected && selected !== q.correct)  btn.classList.add('incorrect');
    });
    if (selected === q.correct) correct++;
  });
  const fb = document.getElementById(`feedback-${n}`);
  const total = quizData.length, pass = Math.ceil(total * 0.8);
  if (correct >= pass) {
    fb.textContent = `🏆 ${correct}/${total} correct! Excellent, Explorer! MashAllah!`;
    fb.className   = 'game-feedback success';
    state[`s${n}Checked`] = true;
    saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= Math.ceil(total * 0.6)) {
    fb.textContent = `📚 ${correct}/${total} — almost! Re-read the story and try again.`;
    fb.className   = 'game-feedback partial';
    state[`s${n}Checked`] = false;
    setTimeout(() => { state[`s${n}Answers`] = {}; _renderQuiz(n, quizData); }, 2500);
  } else {
    fb.textContent = `❌ ${correct}/${total} — re-read the story carefully and try again.`;
    fb.className   = 'game-feedback error';
    state[`s${n}Checked`] = false;
    setTimeout(() => { state[`s${n}Answers`] = {}; _renderQuiz(n, quizData); }, 2500);
  }
}

function _renderDragDrop(n, items, zones) {
  const pool    = document.getElementById(`drag-pool-${n}`);
  const zonesEl = document.getElementById(`drop-zones-${n}`);
  if (!pool || !zonesEl) return;
  pool.innerHTML = ''; zonesEl.innerHTML = '';
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
  dropZones.forEach(zone => {
    zone.classList.remove('correct', 'incorrect');
    const item = zone.querySelector('.drag-item');
    if (item && item.dataset.zone === zone.dataset.zoneId) { zone.classList.add('correct'); correct++; }
    else if (item) zone.classList.add('incorrect');
  });
  const fb = document.getElementById(`feedback-${n}`);
  const total = zones.length;
  if (correct === total) {
    fb.textContent = `🏆 Perfect! All ${total} matched! MashAllah, Explorer!`;
    fb.className   = 'game-feedback success';
    state[`s${n}Checked`] = true;
    saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= total - 1) {
    fb.textContent = `✅ ${correct}/${total} — so close! Fix the red one and try again.`;
    fb.className   = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${total} — re-read the story and try again.`;
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
      <div class="order-num">${idx+1}</div>
      <div class="order-text">${event.text}</div>
      <div class="order-btns">
        <button class="order-btn" onclick="_moveOrderItem(${n},${idx},-1,S${n}_EVENTS_CORRECT)" ${idx===0?'disabled':''}>↑</button>
        <button class="order-btn" onclick="_moveOrderItem(${n},${idx}, 1,S${n}_EVENTS_CORRECT)" ${idx===state[orderKey].length-1?'disabled':''}>↓</button>
      </div>`;
    container.appendChild(item);
  });
}
function _moveOrderItem(n, idx, dir, eventsData) {
  const orderKey = `s${n}Order`;
  const newIdx   = idx + dir;
  if (newIdx < 0 || newIdx >= state[orderKey].length) return;
  const arr = [...state[orderKey]];
  [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
  state[orderKey] = arr;
  saveProgress();
  _renderOrderItems(n, eventsData);
}
function _checkStoryOrder(n, eventsData) {
  const correctOrder = eventsData.map(e => e.id);
  const orderKey = `s${n}Order`;
  let correct = 0;
  document.querySelectorAll(`#order-${n} .order-item`).forEach((item, idx) => {
    item.classList.remove('correct-pos', 'incorrect-pos');
    if (item.dataset.id === correctOrder[idx]) { item.classList.add('correct-pos');   correct++; }
    else                                        { item.classList.add('incorrect-pos'); }
  });
  const fb = document.getElementById(`feedback-${n}`);
  const total = eventsData.length;
  if (correct === total) {
    fb.textContent = '🏆 Perfect order! MashAllah! You know this story by heart!';
    fb.className   = 'game-feedback success';
    state[`s${n}Checked`] = true; saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= total - 1) {
    fb.textContent = `✅ ${correct}/${total} correct — almost! Adjust the red ones.`;
    fb.className   = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${total} correct — re-read the story and try again.`;
    fb.className   = 'game-feedback error';
  }
}

// ---- SECTION WRAPPERS ----
function renderSection1Game()  { _renderQuiz(1, S1_QUIZ); }
function checkSection1()       { _checkQuiz(1, S1_QUIZ); }
function renderSection2Game()  { _renderStoryOrder(2, S2_EVENTS_CORRECT); }
function checkSection2()       { _checkStoryOrder(2, S2_EVENTS_CORRECT); }
function renderSection3Game()  { _renderDragDrop(3, S3_ITEMS, S3_ZONES); }
function checkSection3()       { _checkDragDrop(3, S3_ZONES); }
function renderSection4Game()  { _renderQuiz(4, S4_QUIZ); }
function checkSection4()       { _checkQuiz(4, S4_QUIZ); }
function renderSection5Game()  { _renderDragDrop(5, S5_ITEMS, S5_ZONES); }
function checkSection5()       { _checkDragDrop(5, S5_ZONES); }
function renderSection6Game()  { _renderStoryOrder(6, S6_EVENTS_CORRECT); }
function checkSection6()       { _checkStoryOrder(6, S6_EVENTS_CORRECT); }
function renderSection7Game()  { _renderQuiz(7, S7_QUIZ); }
function checkSection7()       { _checkQuiz(7, S7_QUIZ); }
function renderSection8Game()  { _renderDragDrop(8, S8_ITEMS, S8_ZONES); }
function checkSection8()       { _checkDragDrop(8, S8_ZONES); }
function renderSection9Game()  { _renderStoryOrder(9, S9_EVENTS_CORRECT); }
function checkSection9()       { _checkStoryOrder(9, S9_EVENTS_CORRECT); }
function renderSection10Game() { _renderDragDrop(10, S10_ITEMS, S10_ZONES); }
function checkSection10()      { _checkDragDrop(10, S10_ZONES); }

// =============================================
//  DRAG & DROP EVENT HANDLERS (global)
// =============================================
let draggedEl = null;
document.addEventListener('dragstart', e => {
  if (!e.target.classList.contains('drag-item')) return;
  draggedEl = e.target;
  draggedEl.classList.add('dragging');
});
document.addEventListener('dragend', () => {
  if (draggedEl) { draggedEl.classList.remove('dragging'); draggedEl = null; }
});
document.addEventListener('dragover', e => {
  const zone = e.target.closest('.drop-zone');
  if (zone) { e.preventDefault(); zone.classList.add('drag-over'); }
});
document.addEventListener('dragleave', e => {
  const zone = e.target.closest('.drop-zone');
  if (zone) zone.classList.remove('drag-over');
});
document.addEventListener('drop', e => {
  const zone = e.target.closest('.drop-zone');
  if (!zone || !draggedEl) return;
  e.preventDefault();
  zone.classList.remove('drag-over');
  const existing = zone.querySelector('.drag-item');
  if (existing) document.getElementById(existing.dataset.pool || 'drag-pool-1').appendChild(existing);
  zone.appendChild(draggedEl);
});

// =============================================
//  UI & NAVIGATION
// =============================================
function updateUI() {
  if (!state.explorerName) return;
  document.getElementById('header-name').textContent = state.explorerName;
  document.getElementById('xp-display').textContent  = state.xp;
  document.getElementById('gems-display').textContent = state.gems;
  document.getElementById('done-display').textContent = state.completed.length;

  const welcomeEl = document.getElementById('welcome-text');
  if (welcomeEl) {
    if (!state.completed.length) {
      welcomeEl.textContent = `As-salamu alaykum, ${state.explorerName}! Welcome to Al-Imran Quest — the Surah of Maryam's family, Ibrahim, Uhud and the greatest du'as. Choose your first level!`;
    } else if (state.completed.length < 10) {
      welcomeEl.textContent = `Welcome back, ${state.explorerName}! ${state.completed.length} level${state.completed.length > 1 ? 's' : ''} complete. Keep going — knowledge awaits! 💪`;
    } else {
      welcomeEl.textContent = `MashAllah, ${state.explorerName}! All 10 levels of Al-Imran done. May Allah bless your understanding. 🏆`;
    }
  }

  const chunkEmojis = ['🌟','👶','✨','🕊️','🤝','⚔️','🏹','💫','🌌','🤲'];
  const chunkLabels = ['The Book','Maryam','Isa','Ibrahim','Rope','Badr','Uhud','Shuhada','Signs',"Du'a"];
  [1,2,3,4,5,6,7,8,9,10].forEach(n => {
    const tile   = document.getElementById(`tile-${n}`);
    const status = document.getElementById(`status-${n}`);
    if (!tile || !status) return;
    const isCompleted = state.completed.includes(n);
    const isUnlocked  = n === 1 || state.completed.includes(n - 1);
    tile.className = 'map-tile';
    if (isCompleted) {
      tile.classList.add('completed'); tile.onclick = () => openSection(n);
      status.textContent = '✅ DONE';
    } else if (isUnlocked) {
      tile.classList.add('unlocked'); tile.onclick = () => openSection(n);
      status.textContent = '▶ PLAY';
    } else {
      tile.classList.add('locked'); tile.onclick = null;
      status.textContent = '🔒 LOCKED';
    }
    const chunk = document.getElementById(`chunk-${n}`);
    if (chunk) {
      const emojiEl = chunk.querySelector('.chunk-emoji');
      const labelEl = chunk.querySelector('.chunk-label');
      if (isCompleted) {
        chunk.classList.add('built');
        if (emojiEl) emojiEl.textContent = chunkEmojis[n-1];
        if (labelEl) labelEl.textContent = chunkLabels[n-1];
      } else {
        chunk.classList.remove('built');
        if (emojiEl) emojiEl.textContent = '⬛';
        if (labelEl) labelEl.textContent = chunkLabels[n-1];
      }
    }
  });
  if (state.completed.length === 10) {
    document.getElementById('all-complete').style.display = 'block';
  }
}

function markSectionComplete(n, showReward = true) {
  const tile = document.getElementById(`tile-${n}`);
  if (tile) { tile.className = 'map-tile completed'; }
  if (showReward) {
    const r = REWARDS[n];
    if (r) {
      document.getElementById('reward-icon').textContent  = r.icon;
      document.getElementById('reward-title').textContent = r.title;
      document.getElementById('reward-xp').textContent    = `+${r.xp} XP`;
      document.getElementById('reward-gems').textContent  = `+${r.gems} 💎`;
      document.getElementById('reward-msg').textContent   = r.msg;
      document.getElementById('reward-overlay').classList.add('visible');
    }
  }
}

function completeSection(n) {
  if (state.completed.includes(n)) return;
  const r = REWARDS[n];
  if (r) { state.xp += r.xp; state.gems += r.gems; }
  state.completed.push(n);
  saveProgress();
  markSectionComplete(n, true);
  updateUI();
}

function openSection(n) {
  const isUnlocked = n === 1 || state.completed.includes(n - 1);
  if (!isUnlocked) return;
  document.getElementById('main-view').style.display    = 'none';
  document.getElementById('section-view').style.display = 'block';
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`section-panel-${n}`).classList.add('active');
  if (state.completed.length === 10) document.getElementById('all-complete').style.display = 'block';
  if (typeof startScene === 'function') startScene(n);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSection() {
  document.getElementById('section-view').style.display = 'none';
  document.getElementById('main-view').style.display    = 'block';
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  if (typeof stopAllScenes  === 'function') stopAllScenes();
  if (typeof hideVersePopup === 'function') hideVersePopup();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function dismissReward() {
  document.getElementById('reward-overlay').classList.remove('visible');
}

function startGame() {
  const name = document.getElementById('explorer-name').value.trim();
  if (!name) { document.getElementById('name-error').textContent = 'Please enter your name!'; return; }
  state.explorerName = name;
  saveProgress();
  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('game-header').style.display  = 'flex';
  document.getElementById('main-view').style.display    = 'block';
  updateUI();
  if (typeof initScenes === 'function') initScenes();
  [1,2,3,4,5,6,7,8,9,10].forEach(n => {
    const fn = window[`renderSection${n}Game`];
    if (fn) fn();
  });
}

function resetGame() {
  if (!confirm('Reset ALL progress and start over? This cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// =============================================
//  BOOT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  if (state.explorerName) {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-header').style.display  = 'flex';
    document.getElementById('main-view').style.display    = 'block';
    updateUI();
    if (typeof initScenes === 'function') initScenes();
    [1,2,3,4,5,6,7,8,9,10].forEach(n => {
      const fn = window[`renderSection${n}Game`];
      if (fn) fn();
    });
  }
});
