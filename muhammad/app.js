'use strict';
// =============================================
//  SURAH MUHAMMAD QUEST — app.js
// =============================================

const STORAGE_KEY = 'muhammadQuestSave';

let state = {
  explorerName: '',
  xp: 0, gems: 0,
  completed: [],
  s1Answers: {}, s1Checked: false,
  s2Checked: false,
  s3Order: [],   s3Checked: false,
  s4Checked: false,
  s5Answers: {}, s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Checked: false,
  s8Order: [],   s8Checked: false,
};

const REWARDS = {
  1: { xp: 90,  gems: 3, icon: '⚖️', title: 'TWO PATHS KNOWN!',      msg: 'MashAllah! Those who follow Truth — deeds rise. Those who follow falsehood — deeds crumble. Every day you choose. Choose Truth.' },
  2: { xp: 100, gems: 4, icon: '🌟', title: 'SUPPORT GIVEN!',         msg: 'SubhanAllah! "If you support Allah, He will support you and make your feet firm." (47:7) This is one of the greatest promises in the Quran.' },
  3: { xp: 90,  gems: 3, icon: '🏛️', title: 'HISTORY UNDERSTOOD!',    msg: 'MashAllah! Earlier nations were stronger — and still Allah wiped them out. The lesson: power is temporary. Only obedience to Allah lasts.' },
  4: { xp: 100, gems: 4, icon: '🌊', title: 'JANNAH RIVERS KNOWN!',   msg: 'SubhanAllah! Water that never stales, milk that never sours, honey always pure. May Allah make us among the people of Jannah. Ameen.' },
  5: { xp: 110, gems: 4, icon: '✨', title: 'لا إله إلا الله KNOWN!',  msg: 'Allahu Akbar! "KNOW that there is no god except Allah." Knowledge comes FIRST. You are becoming Ulu al-Albab!' },
  6: { xp: 110, gems: 4, icon: '🔒', title: 'HEARTS OPENED!',          msg: 'MashAllah! "Are there locks on their hearts?" The key is tadabbur — reflecting on the Quran sincerely. Keep reflecting and asking Allah to open your heart.' },
  7: { xp: 100, gems: 3, icon: '🎮', title: 'DUNYA SEEN CLEARLY!',    msg: 'SubhanAllah! The dunya is "only play and amusement." Short like a game. Use it to earn the akhirah. Believe, have taqwa, receive full rewards.' },
  8: { xp: 150, gems: 8, icon: '🤲', title: 'SURAH MUHAMMAD COMPLETE!', msg: 'ALLAHUMMA BARIK! You\'ve completed all 8 levels. "If you support Allah, He will support you." Every sadaqah is for yourself. May Allah never replace us. Ameen!' },
};

// =============================================
//  GAME DATA
// =============================================

// S1: QUIZ — Two Paths (47:1-3)
const S1_QUIZ = [
  { q: 'Surah Muhammad (47) is also known by what other name?',
    opts: ['Al-Fath (The Victory)', 'Al-Qital (The Fighting)', 'Al-Jihad (The Struggle)', 'Al-Nasr (The Help)'],
    correct: 1 },
  { q: 'What happens to the deeds of those who disbelieve and block Allah\'s way? (47:1)',
    opts: ['They are recorded and punished later', 'Allah renders their deeds worthless — like smoke blown away', 'They are given a chance to redo them', 'Nothing — they still count'],
    correct: 1 },
  { q: 'What does Allah do for the believers who do righteous deeds? (47:2)',
    opts: ['Gives them wealth right away', 'Removes their bad deeds and improves their condition', 'Records every deed twice', 'Shows their deeds to everyone'],
    correct: 1 },
  { q: 'What is the powerful promise of 47:7 — one of the greatest in the Quran?',
    opts: ['"He will give you Jannah immediately"', '"If you support Allah, He will support you and make your feet firm"', '"He will remove all hardships"', '"He will never test you again"'],
    correct: 1 },
  { q: 'Why are the disbelievers\' deeds made worthless according to 47:28?',
    opts: ['They did not pray enough', 'They followed what angers Allah and disliked His pleasure', 'They did not give enough charity', 'They were born into disbelief'],
    correct: 1 },
];

// S2: DRAG & DROP — Support Allah (outcomes)
const S2_ITEMS = [
  { id: 'sa1', text: '🌟 "Support Allah\nin His cause"',          zone: 'z1' },
  { id: 'sa2', text: '❌ "Disbelieve\nand block the way"',        zone: 'z2' },
  { id: 'sa3', text: '🚫 "Follow your\ndesires over guidance"',   zone: 'z3' },
  { id: 'sa4', text: '🏆 "Killed in\nAllah\'s cause"',            zone: 'z4' },
];
const S2_ZONES = [
  { id: 'z1', desc: '"He will support YOU and make your feet firm." The ground shakes but the believer stands. (47:7)' },
  { id: 'z2', desc: '"Destruction for them — He made their deeds worthless." Their toil counts for nothing. (47:8)' },
  { id: 'z3', desc: '"He let them go in their own wrongdoing — and blinded them." Desires lead to blindness. (47:14-17)' },
  { id: 'z4', desc: '"He will not waste their deeds — He guides them and improves their state." Honoured. (47:4-5)' },
];

// S3: STORY ORDER — History Lesson (47:10-13)
const S3_EVENTS_CORRECT = [
  { id: 'h1', text: '⚡ Earlier nations were STRONGER than today — they left far greater marks on the earth (47:10)' },
  { id: 'h2', text: '📜 Their messengers came to them with clear proofs and signs (47:13)' },
  { id: 'h3', text: '😤 They rejected the messengers out of arrogance, pride, and denial' },
  { id: 'h4', text: '🌍 Allah asks: "Have they not traveled the earth to see what happened before them?" (47:10)' },
  { id: 'h5', text: '⚡ Allah destroyed them — not a single helper came to their rescue (47:11)' },
  { id: 'h6', text: '📖 The lesson: those who disbelieve today are on the same path — their end will come too' },
];

// S4: DRAG & DROP — Rivers of Jannah (47:15)
const S4_ITEMS = [
  { id: 'r1', text: '💧 Water that\nnever goes stale',    zone: 'z1' },
  { id: 'r2', text: '🥛 Milk whose\ntaste never changes', zone: 'z2' },
  { id: 'r3', text: '🍯 Purified honey\n— always pure',   zone: 'z3' },
  { id: 'r4', text: '🍷 A drink of\npure delight',        zone: 'z4' },
];
const S4_ZONES = [
  { id: 'z1', desc: '"Rivers of water that never changes in taste" — unlike the water of this world (47:15)' },
  { id: 'z2', desc: '"Rivers of milk whose taste never changes" — always fresh and wholesome (47:15)' },
  { id: 'z3', desc: '"Rivers of purified honey" — no impurities, no bitterness (47:15)' },
  { id: 'z4', desc: '"Rivers of a drink that is a delight to those who drink" — no intoxication, unlike the boiling water for those in the Fire (47:15)' },
];

// S5: QUIZ — La Ilaha Illallah (47:19)
const S5_QUIZ = [
  { q: 'What is the first WORD of the command in verse 47:19?',
    opts: ['"Amal" — Act', '"Fa\'lam" — KNOW', '"Istaqim" — Be upright', '"Tawakkul" — Trust'],
    correct: 1 },
  { q: 'What is the full command of 47:19?',
    opts: ['"Pray more and fast more"', '"Know there is no god except Allah — and seek forgiveness for your sin"', '"Support the believers with your wealth"', '"Obey the Messenger in all matters"'],
    correct: 1 },
  { q: 'Who is also mentioned in 47:19 to seek forgiveness for?',
    opts: ['The enemies of Islam', 'The people of the Book', 'The believing men and women — the whole Ummah', 'The Prophet\'s family only'],
    correct: 2 },
  { q: 'Why is 47:19 unique? What principle does it teach?',
    opts: ['It is the longest verse in the Quran', '"Al-ilm qabla al-amal" — knowledge comes BEFORE action', 'It was the last verse revealed', 'It contains the 5 pillars'],
    correct: 1 },
  { q: 'What must true knowledge of لا إله إلا الله produce in us?',
    opts: ['Just saying it with the tongue is enough', 'Humility, worship and obedience to Allah alone — it must change our actions', 'Performing more rituals', 'Memorizing more Quran'],
    correct: 1 },
];

// S6: QUIZ — The Hypocrites (47:16-33)
const S6_QUIZ = [
  { q: 'What powerful question does 47:24 ask about those who don\'t reflect on the Quran?',
    opts: ['"Why do they not read more?"', '"Are there locks upon their hearts?"', '"Why do they not attend more circles?"', '"Have they not memorized enough?"'],
    correct: 1 },
  { q: 'What is the sign of hypocrisy when a verse about fighting is revealed? (47:20)',
    opts: ['They argue about strategy', 'They look at the Prophet ﷺ with the look of one about to faint from death', 'They pretend to agree', 'They ask questions politely'],
    correct: 1 },
  { q: 'What do the hypocrites think they can hide? (47:29)',
    opts: ['Their poverty', 'Their plans to leave the city', 'Their resentment and hatred — but Allah exposes their hearts', 'Their doubts about the Quran'],
    correct: 2 },
  { q: 'What does 47:33 command every single believer?',
    opts: ['Give all your wealth in charity', '"Obey Allah and obey the Messenger — do not invalidate your deeds"', 'Fight in every battle', 'Only follow scholars'],
    correct: 1 },
  { q: 'What happens when someone follows their desires over Allah\'s commands? (47:14)',
    opts: ['They are immediately punished', '"He let them go in their wrongdoing — blinded them." Desires lead to spiritual blindness', 'They are given more time', 'Nothing in this life — only akhirah'],
    correct: 1 },
];

// S7: DRAG & DROP — Dunya vs Akhirah (47:36-38)
const S7_ITEMS = [
  { id: 'd1', text: '🎮 Life of\nthis world',                     zone: 'z1' },
  { id: 'd2', text: '🌱 Believe AND\nhave taqwa',                 zone: 'z2' },
  { id: 'd3', text: '💰 Asked to give\nALL your wealth',          zone: 'z3' },
  { id: 'd4', text: '🤲 Give for\nAllah\'s sake',                  zone: 'z4' },
];
const S7_ZONES = [
  { id: 'z1', desc: '"Only play and amusement" — brief like a game. When it ends, the score is counted. (47:36)' },
  { id: 'z2', desc: '"He gives you your full rewards and does not ask you for your wealth." Faith + taqwa = complete reward. (47:36)' },
  { id: 'z3', desc: '"You would be stingy — and it would expose the miserliness in your heart." Wealth tests character. (47:37)' },
  { id: 'z4', desc: '"Whoever withholds only withholds against himself — Allah is the Rich, you are the poor." (47:38)' },
];

// S8: STORY ORDER — Spend in Allah's Way (47:38)
const S8_EVENTS_CORRECT = [
  { id: 'sp1', text: '📢 Allah addresses the believers: "You are those invited to spend in the cause of Allah" (47:38)' },
  { id: 'sp2', text: '💛 Some among them give generously — their deeds are written and reward is certain' },
  { id: 'sp3', text: '😰 Others hesitate — their hearts are pulled back by attachment to the dunya' },
  { id: 'sp4', text: '💡 Allah reveals the truth: "Whoever withholds is only stingy against himself"' },
  { id: 'sp5', text: '👑 The reality: "Allah is Al-Ghani (the Rich) — and YOU are the poor ones who need Him" (47:38)' },
  { id: 'sp6', text: '⚠️ The warning: "If you turn away, He will replace you with another people who will not be like you" (47:38)' },
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
      if (oi === q.correct)              btn.classList.add('correct');
      else if (oi === sel)               btn.classList.add('incorrect');
    });
    if (sel === q.correct) correct++;
  });
  const fb = document.getElementById(`feedback-${n}`);
  const pass = Math.ceil(data.length * 0.8);
  if (correct >= pass) {
    fb.textContent = `🏆 ${correct}/${data.length} correct! Excellent, Explorer!`; fb.className = 'game-feedback success';
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
    fb.textContent = `❌ ${correct}/${zones.length} — re-read the story and try again.`; fb.className = 'game-feedback error';
  }
}

function _renderStoryOrder(n, data) {
  const c = document.getElementById(`order-${n}`); if (!c) return;
  const key = `s${n}Order`;
  if (!state[key] || state[key].length !== data.length) { state[key] = shuffle(data).map(e => e.id); saveProgress(); }
  _renderOrderItems(n, data);
  if (state.completed.includes(n) || state[`s${n}Checked`])
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
}
function _renderOrderItems(n, data) {
  const c = document.getElementById(`order-${n}`); if (!c) return;
  c.innerHTML = '';
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
function renderSection4Game() { _renderDragDrop(4, S4_ITEMS, S4_ZONES); }
function checkSection4()      { _checkDragDrop(4, S4_ZONES); }
function renderSection5Game() { _renderQuiz(5, S5_QUIZ); }
function checkSection5()      { _checkQuiz(5, S5_QUIZ); }
function renderSection6Game() { _renderQuiz(6, S6_QUIZ); }
function checkSection6()      { _checkQuiz(6, S6_QUIZ); }
function renderSection7Game() { _renderDragDrop(7, S7_ITEMS, S7_ZONES); }
function checkSection7()      { _checkDragDrop(7, S7_ZONES); }
function renderSection8Game() { _renderStoryOrder(8, S8_EVENTS_CORRECT); }
function checkSection8()      { _checkStoryOrder(8, S8_EVENTS_CORRECT); }

// =============================================
//  DRAG & DROP — mouse + touch events
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
      welcomeEl.textContent = `As-salamu alaykum, ${state.explorerName}! Welcome to Surah Muhammad Quest — the Surah of Two Paths, the Rivers of Jannah, and the greatest call to "Know لا إله إلا الله." Choose your first level!`;
    else if (state.completed.length < 8)
      welcomeEl.textContent = `Welcome back, ${state.explorerName}! ${state.completed.length} level${state.completed.length>1?'s':''} complete. Support Allah and He will support you! 💪`;
    else
      welcomeEl.textContent = `MashAllah, ${state.explorerName}! All 8 levels of Surah Muhammad complete. May Allah keep you firm! 🏆`;
  }

  const icons   = ['⚖️','🌟','🏛️','🌊','✨','🔒','🎮','🤲'];
  const labels  = ['Two Paths','Support Allah','History','Jannah','Laa Ilaaha','Hypocrisy','Dunya','Spend'];
  [1,2,3,4,5,6,7,8].forEach(n => {
    const tile = document.getElementById(`tile-${n}`), status = document.getElementById(`status-${n}`);
    if (!tile || !status) return;
    const done = state.completed.includes(n), unlocked = n === 1 || state.completed.includes(n-1);
    tile.className = 'map-tile';
    if (done)      { tile.classList.add('completed'); tile.onclick = () => openSection(n); status.textContent = '✅ DONE'; }
    else if (unlocked) { tile.classList.add('unlocked'); tile.onclick = () => openSection(n); status.textContent = '▶ PLAY'; }
    else           { tile.classList.add('locked'); tile.onclick = null; status.textContent = '🔒 LOCKED'; }

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

function markSectionComplete(n, showReward = true) {
  const tile = document.getElementById(`tile-${n}`);
  if (tile) tile.className = 'map-tile completed';
  if (showReward) {
    const r = REWARDS[n]; if (!r) return;
    document.getElementById('reward-icon').textContent  = r.icon;
    document.getElementById('reward-title').textContent = r.title;
    document.getElementById('reward-xp').textContent    = `+${r.xp} XP`;
    document.getElementById('reward-gems').textContent  = `+${r.gems} 💎`;
    document.getElementById('reward-msg').textContent   = r.msg;
    document.getElementById('reward-overlay').classList.add('visible');
  }
}

function completeSection(n) {
  if (state.completed.includes(n)) return;
  const r = REWARDS[n]; if (r) { state.xp += r.xp; state.gems += r.gems; }
  state.completed.push(n); saveProgress(); markSectionComplete(n, true); updateUI();
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
  if (!confirm('Reset ALL progress and start over? This cannot be undone.')) return;
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
