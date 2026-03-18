'use strict';
// =============================================
//  SURAH AL-MULK QUEST — app.js
// =============================================

const STORAGE_KEY = 'mulkQuestSave';

let state = {
  explorerName: '',
  xp: 0, gems: 0,
  completed: [],
  s1Answers: {}, s1Checked: false,
  s2Checked: false,
  s3Order: [],   s3Checked: false,
  s4Answers: {}, s4Checked: false,
  s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Order: [],   s7Checked: false,
  s8Answers: {}, s8Checked: false,
};

const REWARDS = {
  1: { xp: 90,  gems: 3, icon: '🌌', title: 'AL-MULK KNOWN!',
       msg: 'MashAllah! "Tabaraka" — Blessed is He in whose hand is all dominion. Death AND life created as a test. Not most deeds — BEST deeds. Ahsanu amala!' },
  2: { xp: 100, gems: 4, icon: '⭐', title: 'PERFECT HEAVENS!',
       msg: 'SubhanAllah! "Look. Look again. Do you see any breaks?" Still no flaws. Your vision returns exhausted and humbled. Every star His lamp — and protection from the devils.' },
  3: { xp: 90,  gems: 3, icon: '🔥', title: 'THE WARNING RECEIVED!',
       msg: 'MashAllah! "Did no warner come to you?" Every person is warned — the Quran, the Prophet ﷺ, the fitrah. Today you heard the warning. Use your hearing and your reason!' },
  4: { xp: 100, gems: 4, icon: '🌙', title: 'FEAR IN SECRET BUILT!',
       msg: 'SubhanAllah! "Does He who created not know?" Al-Latif, Al-Khabir. He knows every thought. Fear Him when no one is watching — that is the truest iman. Forgiveness AND great reward!' },
  5: { xp: 100, gems: 4, icon: '🌍', title: 'EARTH EXPLORED!',
       msg: 'MashAllah! "Dhalul" — the earth made tame FOR YOU. Walk through it, eat from it. And remember: everything you eat is His rizq. And to Him is the resurrection.' },
  6: { xp: 110, gems: 4, icon: '🦅', title: 'TAWAKKUL UNLOCKED!',
       msg: 'SubhanAllah! "None holds them up except ar-Rahman." Spread your wings and work hard — but know that ONLY Allah is holding everything up. That is tawakkul!' },
  7: { xp: 100, gems: 3, icon: '🌟', title: 'SIGNS UNDERSTOOD!',
       msg: 'MashAllah! He gave us hearing, vision, and hearts. "How little thanks you give." (67:23) Today you reflected. Today you gave thanks. May Allah increase you!' },
  8: { xp: 150, gems: 8, icon: '💧', title: 'SURAH AL-MULK COMPLETE!',
       msg: 'ALLAHUMMA BARIK! All 8 levels complete! "If your water was to sink into the earth — who then could bring you flowing water?" Only Allah. May Al-Mulk be your intercessor every night. Ameen!' },
};

// =============================================
//  GAME DATA
// =============================================

// S1: QUIZ — Al-Mulk (67:1-2)
const S1_QUIZ = [
  { q: 'What does "Al-Mulk" mean?',
    opts: ['The Star', 'The Sovereignty / Dominion', 'The Protector', 'The Night'],
    correct: 1 },
  { q: 'According to 67:1, what does Allah hold in His hand?',
    opts: ['The keys to Jannah only', 'All dominion — and He is over all things competent', 'The Book of Deeds', 'The fate of believers only'],
    correct: 1 },
  { q: 'Why did Allah create both death AND life? (67:2)',
    opts: ['To show His power', 'To test which of you is BEST in deed', 'To give people choices', 'To balance the universe'],
    correct: 1 },
  { q: 'The test in 67:2 is "ahsanu amala" — what does this mean?',
    opts: ['Most deeds — quantity over quality', 'Best in deed — quality and sincerity over quantity', 'Most prayers performed', 'Biggest charity given'],
    correct: 1 },
  { q: 'According to a famous hadith, what special role does Surah Al-Mulk perform every night?',
    opts: ['It lights up the grave', 'It intercedes for its reciter until they are forgiven', 'It repels jinns', 'It increases rizq'],
    correct: 1 },
];

// S2: DRAG & DROP — Seven Heavens (67:3-5)
const S2_ITEMS = [
  { id: 'h1', text: '👁️ "Look once —\ndo you see flaws?"',       zone: 'z1' },
  { id: 'h2', text: '🔁 "Look AGAIN —\na second time"',           zone: 'z2' },
  { id: 'h3', text: '⭐ "Stars adorn\nthe nearest heaven"',       zone: 'z3' },
  { id: 'h4', text: '☄️ "Shooting stars\nchase the devils"',      zone: 'z4' },
];
const S2_ZONES = [
  { id: 'z1', desc: '"You see no inconsistency in the creation of the Most Merciful." No flaws anywhere! (67:3)' },
  { id: 'z2', desc: '"Your sight will return to you humbled while it is fatigued." The creation exhausts human vision. (67:4)' },
  { id: 'z3', desc: '"We have adorned the nearest heaven with lamps (stars)." Beauty as a gift to us. (67:5)' },
  { id: 'z4', desc: '"We have made them (stars) as missiles to drive away the devils." Protection as a gift to us. (67:5)' },
];

// S3: STORY ORDER — Gates of Hellfire (67:6-11)
const S3_EVENTS_CORRECT = [
  { id: 'f1', text: '🔥 For those who disbelieve in their Lord — the punishment of Hell awaits (67:6)' },
  { id: 'f2', text: '😱 When they are thrown into it, they hear its terrifying inhaling — it almost bursts with rage (67:7-8)' },
  { id: 'f3', text: '⚔️ The guardians of the Fire ask every group: "Did no warner come to you?" (67:8)' },
  { id: 'f4', text: '😔 They confess: "Yes! A warner did come to us — but we denied him and said: Allah has not revealed anything" (67:9)' },
  { id: 'f5', text: '💭 They say: "If only we had been listening or reasoning — we would not be among the companions of the Blaze!" (67:10)' },
  { id: 'f6', text: '⚡ So they acknowledge their sin — but far removed from mercy are the companions of the Blaze (67:11)' },
];

// S4: QUIZ — Fear in Secret (67:12-14)
const S4_QUIZ = [
  { q: 'What does Allah promise those who fear Him "in the unseen" (bil-ghayb)? (67:12)',
    opts: ['Wealth and health in this world', 'Forgiveness AND a great reward', 'Ease in their daily life only', 'A longer life'],
    correct: 1 },
  { q: 'What powerful logical argument does 67:14 make about Allah\'s knowledge?',
    opts: ['"He reads the Book of Deeds"', '"Does He who CREATED not know?" — He made every heart, so He knows every thought', '"He has angels recording everything"', '"He tests people to find out"'],
    correct: 1 },
  { q: 'What are the two Names of Allah mentioned in 67:14?',
    opts: ['Al-Aziz and Al-Hakim', 'Al-Latif (the Subtle) and Al-Khabir (the Acquainted)', 'Ar-Rahman and Ar-Rahim', 'Al-Malik and Al-Quddus'],
    correct: 1 },
  { q: 'According to 67:13 — whether you speak secretly or openly, what does Allah know?',
    opts: ['Only the spoken words', 'What is within the chests — the innermost thoughts and intentions', 'Only public actions', 'The future deeds only'],
    correct: 1 },
  { q: 'What is "khashyat al-ghayb" — fearing Allah in the unseen?',
    opts: ['Fearing supernatural beings', 'Choosing right even when no human is watching — the truest test of iman', 'Fearing the Day of Judgement only', 'Being afraid of the dark'],
    correct: 1 },
];

// S5: DRAG & DROP — The Earth (67:15-18)
const S5_ITEMS = [
  { id: 'e1', text: '🌍 "The earth made\ntame (dhalul)"',             zone: 'z1' },
  { id: 'e2', text: '⚡ "What if He causes\nearth to swallow you?"', zone: 'z2' },
  { id: 'e3', text: '🌬️ "What if a storm\nof stones is sent?"',      zone: 'z3' },
  { id: 'e4', text: '📜 "Those before you\nalso denied"',             zone: 'z4' },
];
const S5_ZONES = [
  { id: 'z1', desc: '"He made the earth tame for you — walk through its slopes and eat of His provision. And to Him is the resurrection." (67:15)' },
  { id: 'z2', desc: '"Do you feel secure that He who is in the heaven would not cause the earth to swallow you while it shakes?" (67:16)' },
  { id: 'z3', desc: '"Or do you feel secure He would not send against you a storm of stones? Then you would know how serious My warning is." (67:17)' },
  { id: 'z4', desc: '"And already those before them denied — and how terrible was My reproach!" (67:18)' },
];

// S6: QUIZ — Birds & Tawakkul (67:19-21)
const S6_QUIZ = [
  { q: 'According to 67:19 — what holds the birds up in the sky?',
    opts: ['Air currents and wind', 'None holds them except ar-Rahman (the Most Merciful)', 'Their own strength', 'The laws of physics alone'],
    correct: 1 },
  { q: 'What lesson does the image of birds in flight teach about tawakkul?',
    opts: ['Don\'t work — just trust Allah', 'Spread your wings and work hard — AND trust that only Allah is truly holding everything up', 'Birds are the strongest animals', 'Fly away from problems'],
    correct: 1 },
  { q: 'What does 67:20 ask about armies? (a rhetorical question)',
    opts: ['"How many soldiers do you need?"', '"Who is it that could be an army for you other than ar-Rahman?"', '"Which nation has the strongest army?"', '"Should believers form an army?"'],
    correct: 1 },
  { q: 'What does 67:21 warn about provision?',
    opts: ['Provision is earned only through hard work', '"Who could provide for you if He withheld His provision?" — all rizq comes from Him', 'Store extra food for emergencies', 'Never waste food'],
    correct: 1 },
  { q: 'According to 67:20 — what word describes the state of disbelievers who rely on other than Allah?',
    opts: ['Kafir (disbelievers)', 'Fil ghurur — in delusion', 'Dhalimun — wrongdoers', 'Fasiqun — disobedient'],
    correct: 1 },
];

// S7: STORY ORDER — Signs & The Day (67:22-27)
const S7_EVENTS_CORRECT = [
  { id: 'sg1', text: '👁️ Allah gave us hearing, vision, and hearts (af\'ida) — but how little thanks is given! (67:23)' },
  { id: 'sg2', text: '🌍 He scattered us across the earth — and to Him we will be gathered (67:24)' },
  { id: 'sg3', text: '❓ The disbelievers challenge: "When will this promise come — if you are truthful?" (67:25)' },
  { id: 'sg4', text: '🗣️ The Prophet ﷺ responds: "The knowledge of its time is only with Allah — I am only a plain warner" (67:26)' },
  { id: 'sg5', text: '😰 When they SEE it approaching — the faces of disbelievers will be full of grief and distress (67:27)' },
  { id: 'sg6', text: '📢 And it will be said: "This is what you used to call for (in mockery)" — now it has come (67:27)' },
];

// S8: QUIZ — Final / Water Verse (67:28-30)
const S8_QUIZ = [
  { q: 'What is the believer\'s declaration according to 67:29?',
    opts: ['"We fight for Allah\'s sake"', '"He is ar-Rahman — we have believed in Him and upon Him we have relied (tawakkalna)"', '"We obey the Messenger in all things"', '"We give charity every day"'],
    correct: 1 },
  { q: 'What does 67:28 say about even if the Prophet ﷺ and the believers were to die?',
    opts: ['The religion would end', '"Who will protect the disbelievers from a painful punishment?" — nothing saves them', 'Allah would replace them immediately', 'The Quran would be lost'],
    correct: 1 },
  { q: 'What is the final verse (67:30) asking?',
    opts: ['"Who created the seas?"', '"If your water sank into the earth — who then could bring you flowing (ma\'in) water?"', '"Why do rivers flow?"', '"Who made the clouds rain?"'],
    correct: 1 },
  { q: 'What does "ma\'in ma\'in" (repeated "flowing water") emphasize?',
    opts: ['That rivers are beautiful', 'The urgency and extreme need — our total dependence on Allah for the most basic necessity', 'That Allah created two types of water', 'That water is a test only'],
    correct: 1 },
  { q: 'Surah Al-Mulk is also called "Al-Waqiya" — what does that mean?',
    opts: ['The Dominion', 'The Shield / The Protector — it protects its reciter from the punishment of the grave', 'The Surah of Water', 'The Night Surah'],
    correct: 1 },
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
function saveProgress() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {} }
function loadProgress() {
  try { const r = localStorage.getItem(STORAGE_KEY); if (r) Object.assign(state, JSON.parse(r)); } catch(e) {}
}

// =============================================
//  GENERIC HELPERS
// =============================================
function _renderQuiz(n, data) {
  const c = document.getElementById(`quiz-${n}`); if (!c) return; c.innerHTML = '';
  data.forEach((q, qi) => {
    const qEl = document.createElement('div'); qEl.className = 'quiz-question';
    qEl.innerHTML = `<div class="question-text"><span class="q-num">Q${qi+1}.</span>${q.q}</div><div class="options-grid" id="opts-${n}-${qi}"></div>`;
    c.appendChild(qEl);
    q.opts.forEach((opt, oi) => {
      const btn = document.createElement('button'); btn.className = 'option-btn';
      btn.dataset.qi = qi; btn.dataset.oi = oi; btn.dataset.section = n;
      btn.textContent = opt; btn.onclick = () => _selectOption(n, qi, oi);
      qEl.querySelector(`#opts-${n}-${qi}`).appendChild(btn);
    });
  });
  const ans = state[`s${n}Answers`] || {};
  Object.entries(ans).forEach(([qi, oi]) => {
    const btn = document.querySelector(`[data-section="${n}"][data-qi="${qi}"][data-oi="${oi}"]`);
    if (btn) btn.classList.add('selected');
  });
  if (state.completed.includes(n) || state[`s${n}Checked`])
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
}
function _selectOption(n, qi, oi) {
  if (state[`s${n}Checked`]) return;
  document.querySelectorAll(`[data-section="${n}"][data-qi="${qi}"]`).forEach(b => b.classList.remove('selected'));
  const btn = document.querySelector(`[data-section="${n}"][data-qi="${qi}"][data-oi="${oi}"]`);
  if (btn) btn.classList.add('selected');
  if (!state[`s${n}Answers`]) state[`s${n}Answers`] = {};
  state[`s${n}Answers`][qi] = oi; saveProgress();
}
function _checkQuiz(n, data) {
  const ans = state[`s${n}Answers`] || {};
  if (Object.keys(ans).length < data.length) {
    const fb = document.getElementById(`feedback-${n}`);
    fb.textContent = `⚠️ Please answer all ${data.length} questions!`; fb.className = 'game-feedback partial'; return;
  }
  let correct = 0;
  data.forEach((q, qi) => {
    const sel = ans[qi];
    document.querySelectorAll(`[data-section="${n}"][data-qi="${qi}"]`).forEach((btn, oi) => {
      btn.disabled = true; btn.classList.remove('selected');
      if (oi === q.correct)   btn.classList.add('correct');
      else if (oi === sel)    btn.classList.add('incorrect');
    });
    if (sel === q.correct) correct++;
  });
  const fb = document.getElementById(`feedback-${n}`);
  const pass = Math.ceil(data.length * 0.8);
  if (correct >= pass) {
    fb.textContent = `🏆 ${correct}/${data.length} correct! Excellent!`; fb.className = 'game-feedback success';
    state[`s${n}Checked`] = true; saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= Math.ceil(data.length * 0.6)) {
    fb.textContent = `📚 ${correct}/${data.length} — almost! Re-read and try again.`; fb.className = 'game-feedback partial';
    state[`s${n}Answers`] = {}; setTimeout(() => _renderQuiz(n, data), 2500);
  } else {
    fb.textContent = `❌ ${correct}/${data.length} — re-read carefully and try again.`; fb.className = 'game-feedback error';
    state[`s${n}Answers`] = {}; setTimeout(() => _renderQuiz(n, data), 2500);
  }
}

function _renderDragDrop(n, items, zones) {
  const pool = document.getElementById(`drag-pool-${n}`), zonesEl = document.getElementById(`drop-zones-${n}`);
  if (!pool || !zonesEl) return;
  pool.innerHTML = ''; zonesEl.innerHTML = '';
  shuffle(items).forEach(item => {
    const el = document.createElement('div'); el.className = 'drag-item'; el.draggable = true;
    el.dataset.itemId = item.id; el.dataset.zone = item.zone; el.dataset.pool = `drag-pool-${n}`;
    el.textContent = item.text; pool.appendChild(el);
  });
  shuffle(zones).forEach(zone => {
    const el = document.createElement('div'); el.className = 'drop-zone'; el.dataset.zoneId = zone.id;
    el.innerHTML = `<span class="drop-zone-desc">${zone.desc}</span>`; zonesEl.appendChild(el);
  });
  if (state.completed.includes(n) || state[`s${n}Checked`])
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
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
  if (correct === zones.length) {
    fb.textContent = `🏆 Perfect! All ${zones.length} matched! MashAllah!`; fb.className = 'game-feedback success';
    state[`s${n}Checked`] = true; saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= zones.length - 1) {
    fb.textContent = `✅ ${correct}/${zones.length} — so close! Fix the red one.`; fb.className = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${zones.length} — re-read and try again.`; fb.className = 'game-feedback error';
  }
}

function _renderStoryOrder(n, data) {
  const key = `s${n}Order`;
  if (!state[key] || state[key].length !== data.length) { state[key] = shuffle(data).map(e => e.id); saveProgress(); }
  _renderOrderItems(n, data);
  if (state.completed.includes(n) || state[`s${n}Checked`])
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
}
function _renderOrderItems(n, data) {
  const c = document.getElementById(`order-${n}`); if (!c) return; c.innerHTML = '';
  const key = `s${n}Order`;
  state[key].forEach((id, idx) => {
    const ev = data.find(e => e.id === id); if (!ev) return;
    const item = document.createElement('div'); item.className = 'order-item'; item.dataset.id = id;
    item.innerHTML = `<div class="order-num">${idx+1}</div><div class="order-text">${ev.text}</div>
      <div class="order-btns">
        <button class="order-btn" onclick="_moveOrderItem(${n},${idx},-1,S${n}_EVENTS_CORRECT)" ${idx===0?'disabled':''}>↑</button>
        <button class="order-btn" onclick="_moveOrderItem(${n},${idx}, 1,S${n}_EVENTS_CORRECT)" ${idx===state[key].length-1?'disabled':''}>↓</button>
      </div>`;
    c.appendChild(item);
  });
}
function _moveOrderItem(n, idx, dir, data) {
  const key = `s${n}Order`; const ni = idx + dir;
  if (ni < 0 || ni >= state[key].length) return;
  const arr = [...state[key]]; [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
  state[key] = arr; saveProgress(); _renderOrderItems(n, data);
}
function _checkStoryOrder(n, data) {
  const correct = data.map(e => e.id);
  const key = `s${n}Order`; let cnt = 0;
  document.querySelectorAll(`#order-${n} .order-item`).forEach((item, i) => {
    item.classList.remove('correct-pos','incorrect-pos');
    if (item.dataset.id === correct[i]) { item.classList.add('correct-pos'); cnt++; }
    else item.classList.add('incorrect-pos');
  });
  const fb = document.getElementById(`feedback-${n}`);
  if (cnt === data.length) {
    fb.textContent = '🏆 Perfect order! MashAllah!'; fb.className = 'game-feedback success';
    state[`s${n}Checked`] = true; saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (cnt >= data.length - 1) {
    fb.textContent = `✅ ${cnt}/${data.length} — almost! Adjust the red ones.`; fb.className = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${cnt}/${data.length} — re-read and try again.`; fb.className = 'game-feedback error';
  }
}

// ---- SECTION WRAPPERS ----
function renderSection1Game() { _renderQuiz(1, S1_QUIZ); }
function checkSection1()      { _checkQuiz(1, S1_QUIZ); }
function renderSection2Game() { _renderDragDrop(2, S2_ITEMS, S2_ZONES); }
function checkSection2()      { _checkDragDrop(2, S2_ZONES); }
function renderSection3Game() { _renderStoryOrder(3, S3_EVENTS_CORRECT); }
function checkSection3()      { _checkStoryOrder(3, S3_EVENTS_CORRECT); }
function renderSection4Game() { _renderQuiz(4, S4_QUIZ); }
function checkSection4()      { _checkQuiz(4, S4_QUIZ); }
function renderSection5Game() { _renderDragDrop(5, S5_ITEMS, S5_ZONES); }
function checkSection5()      { _checkDragDrop(5, S5_ZONES); }
function renderSection6Game() { _renderQuiz(6, S6_QUIZ); }
function checkSection6()      { _checkQuiz(6, S6_QUIZ); }
function renderSection7Game() { _renderStoryOrder(7, S7_EVENTS_CORRECT); }
function checkSection7()      { _checkStoryOrder(7, S7_EVENTS_CORRECT); }
function renderSection8Game() { _renderQuiz(8, S8_QUIZ); }
function checkSection8()      { _checkQuiz(8, S8_QUIZ); }

// =============================================
//  DRAG & DROP — mouse events
// =============================================
let draggedEl = null;
document.addEventListener('dragstart', e => {
  if (!e.target.classList.contains('drag-item')) return;
  draggedEl = e.target; draggedEl.classList.add('dragging');
});
document.addEventListener('dragend', () => {
  if (draggedEl) { draggedEl.classList.remove('dragging'); draggedEl = null; }
});
document.addEventListener('dragover', e => {
  const z = e.target.closest('.drop-zone'); if (z) { e.preventDefault(); z.classList.add('drag-over'); }
});
document.addEventListener('dragleave', e => {
  const z = e.target.closest('.drop-zone'); if (z) z.classList.remove('drag-over');
});
document.addEventListener('drop', e => {
  const z = e.target.closest('.drop-zone'); if (!z || !draggedEl) return;
  e.preventDefault(); z.classList.remove('drag-over');
  const ex = z.querySelector('.drag-item');
  if (ex) document.getElementById(ex.dataset.pool || 'drag-pool-1').appendChild(ex);
  z.appendChild(draggedEl);
});

// =============================================
//  TOUCH DRAG & DROP — iOS / Android support
// =============================================
(function () {
  let touchEl = null, touchClone = null, offX = 0, offY = 0;
  function zoneAt(x, y) {
    if (touchClone) touchClone.style.visibility = 'hidden';
    const el = document.elementFromPoint(x, y);
    if (touchClone) touchClone.style.visibility = '';
    return el ? el.closest('.drop-zone') : null;
  }
  function poolOf(el) { return document.getElementById(el.dataset.pool) || el.closest('.drag-pool'); }
  document.addEventListener('touchstart', function(e) {
    const t = e.target.closest('.drag-item'); if (!t) return;
    e.preventDefault(); touchEl = t; touchEl.classList.add('dragging');
    const touch = e.touches[0], rect = t.getBoundingClientRect();
    offX = touch.clientX - rect.left; offY = touch.clientY - rect.top;
    touchClone = t.cloneNode(true);
    const cs = window.getComputedStyle(t);
    Object.assign(touchClone.style, {
      position:'fixed', zIndex:'9999', pointerEvents:'none', opacity:'0.85',
      width: rect.width+'px', minHeight: rect.height+'px',
      left:(touch.clientX-offX)+'px', top:(touch.clientY-offY)+'px',
      margin:'0', background:cs.background, border:cs.border, padding:cs.padding,
      color:cs.color, fontSize:cs.fontSize, fontFamily:cs.fontFamily,
      lineHeight:cs.lineHeight, whiteSpace:'pre-line', boxSizing:'border-box', transform:'scale(1.06)',
    });
    document.body.appendChild(touchClone);
  }, { passive: false });
  document.addEventListener('touchmove', function(e) {
    if (!touchEl) return; e.preventDefault();
    const touch = e.touches[0];
    touchClone.style.left = (touch.clientX-offX)+'px'; touchClone.style.top = (touch.clientY-offY)+'px';
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
    const z = zoneAt(touch.clientX, touch.clientY); if (z) z.classList.add('drag-over');
  }, { passive: false });
  document.addEventListener('touchend', function(e) {
    if (!touchEl) return;
    const touch = e.changedTouches[0];
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
    const z = zoneAt(touch.clientX, touch.clientY);
    if (z) {
      const ex = z.querySelector('.drag-item');
      if (ex && ex !== touchEl) { ex.classList.remove('placed'); const p = poolOf(ex); if (p) p.appendChild(ex); }
      touchEl.classList.add('placed'); z.appendChild(touchEl);
    }
    touchEl.classList.remove('dragging'); touchEl = null;
    if (touchClone) { touchClone.remove(); touchClone = null; }
  }, { passive: false });
}());

// =============================================
//  UI & NAVIGATION
// =============================================
function updateUI() {
  if (!state.explorerName) return;
  document.getElementById('header-name').textContent  = state.explorerName;
  document.getElementById('xp-display').textContent   = state.xp;
  document.getElementById('gems-display').textContent = state.gems;
  document.getElementById('done-display').textContent = state.completed.length;

  const welcomeEl = document.getElementById('welcome-text');
  if (welcomeEl) {
    if (!state.completed.length)
      welcomeEl.textContent = `As-salamu alaykum, ${state.explorerName}! Surah Al-Mulk — the Surah that protects you every single night. 8 levels of sovereignty, stars, Jannah, tawakkul, and the final question: "Who will bring you flowing water?" Begin your quest!`;
    else if (state.completed.length < 8)
      welcomeEl.textContent = `Welcome back, ${state.explorerName}! ${state.completed.length} level${state.completed.length>1?'s':''} complete. "None holds them up except ar-Rahman." 🦅`;
    else
      welcomeEl.textContent = `MashAllah, ${state.explorerName}! All 8 levels complete. May Al-Mulk be your intercessor every night. Ameen! 🌌`;
  }

  const icons  = ['🌌','⭐','🔥','🌙','🌍','🦅','🌟','💧'];
  const labels = ['Al-Mulk','7 Heavens','Hellfire','Fear Secret','Earth Gift','Birds','Signs','Water'];
  [1,2,3,4,5,6,7,8].forEach(n => {
    const tile = document.getElementById(`tile-${n}`), status = document.getElementById(`status-${n}`);
    if (!tile || !status) return;
    const done = state.completed.includes(n), unlocked = n === 1 || state.completed.includes(n-1);
    tile.className = 'map-tile';
    if (done)           { tile.classList.add('completed'); tile.onclick = () => openSection(n); status.textContent = '✅ DONE'; }
    else if (unlocked)  { tile.classList.add('unlocked');  tile.onclick = () => openSection(n); status.textContent = '▶ PLAY'; }
    else                { tile.classList.add('locked');    tile.onclick = null; status.textContent = '🔒 LOCKED'; }

    const chunk = document.getElementById(`chunk-${n}`);
    if (chunk) {
      chunk.classList.toggle('built', done);
      const em = chunk.querySelector('.chunk-emoji'), lb = chunk.querySelector('.chunk-label');
      if (em) em.textContent = done ? icons[n-1] : '⬛';
      if (lb) lb.textContent = labels[n-1];
    }
  });
  if (state.completed.length === 8) document.getElementById('all-complete').style.display = 'block';
}

function markSectionComplete(n) {
  const r = REWARDS[n]; if (!r) return;
  document.getElementById('reward-icon').textContent  = r.icon;
  document.getElementById('reward-title').textContent = r.title;
  document.getElementById('reward-xp').textContent    = `+${r.xp} XP`;
  document.getElementById('reward-gems').textContent  = `+${r.gems} 💎`;
  document.getElementById('reward-msg').textContent   = r.msg;
  document.getElementById('reward-overlay').classList.add('visible');
}

function completeSection(n) {
  if (state.completed.includes(n)) return;
  const r = REWARDS[n]; if (r) { state.xp += r.xp; state.gems += r.gems; }
  state.completed.push(n); saveProgress(); markSectionComplete(n); updateUI();
}

function openSection(n) {
  if (n !== 1 && !state.completed.includes(n-1)) return;
  document.getElementById('main-view').style.display    = 'none';
  document.getElementById('section-view').style.display = 'block';
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`section-panel-${n}`).classList.add('active');
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

function dismissReward() { document.getElementById('reward-overlay').classList.remove('visible'); }

function startGame() {
  const name = document.getElementById('explorer-name').value.trim();
  if (!name) { document.getElementById('name-error').textContent = 'Please enter your name!'; return; }
  state.explorerName = name; saveProgress();
  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('game-header').style.display  = 'flex';
  document.getElementById('main-view').style.display    = 'block';
  updateUI();
  if (typeof initScenes === 'function') initScenes();
  [1,2,3,4,5,6,7,8].forEach(n => { const fn = window[`renderSection${n}Game`]; if (fn) fn(); });
}

function resetGame() {
  if (!confirm('Reset ALL progress for Surah Al-Mulk and start over?')) return;
  localStorage.removeItem(STORAGE_KEY); location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  if (state.explorerName) {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-header').style.display  = 'flex';
    document.getElementById('main-view').style.display    = 'block';
    updateUI();
    if (typeof initScenes === 'function') initScenes();
    [1,2,3,4,5,6,7,8].forEach(n => { const fn = window[`renderSection${n}Game`]; if (fn) fn(); });
  }
});
