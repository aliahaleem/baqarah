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
};

const STORAGE_KEY = 'baqarahQuestSave';

// ---------- SECTION REWARDS ----------
const REWARDS = {
  1: { xp: 80,  gems: 3, icon: '🌿', title: 'PLAINS UNLOCKED!',   msg: 'You discovered the 5 qualities of the Muttaqeen — the God-conscious believers. The first land of your quest is yours, Explorer! On to the Cave of Shadows...' },
  2: { xp: 100, gems: 4, icon: '🌑', title: 'SHADOWS CLEARED!',   msg: 'MashAllah! You now understand the two groups who rejected guidance. Your torch of knowledge lights the way through the darkness. The Garden awaits...' },
  3: { xp: 120, gems: 5, icon: '🌟', title: 'GARDEN DISCOVERED!', msg: 'SubhanAllah! You have completed the story of our father Adam (AS) — the first human, the first test, the first tawbah. On to the Shores of Sinai!' },
  4: { xp: 110, gems: 4, icon: '🌊', title: 'SHORES DISCOVERED!', msg: 'MashAllah, Explorer! You have matched all five miracles of Bani Isra\'il. From the parted sea to the springs of water — every miracle was a mercy. Keep going!' },
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
  } else if (state.completed.length < 4) {
    welcomeEl.textContent = `Welcome back, ${state.explorerName}! You've completed ${state.completed.length} level${state.completed.length > 1 ? 's' : ''}. Keep going — more knowledge awaits! 💪`;
  } else {
    welcomeEl.textContent = `MashAllah, ${state.explorerName}! Quest complete! You've learned the meaning of all 4 sections. May Allah bless your knowledge. 🏆`;
  }

  // Update map tiles
  [1, 2, 3, 4].forEach(n => {
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
  const chunkEmojis  = ['🌿', '🌑', '🌟', '🌊'];
  const chunkLabels  = ['Plains', 'Caves', 'Garden', 'Shores'];
  [1, 2, 3, 4].forEach(n => {
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

  if (state.completed.length === 4) {
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

  if (state.completed.length === 4) {
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
  }
});
