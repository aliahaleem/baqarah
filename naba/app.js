'use strict';
// =============================================
//  SURAH AN-NABA QUEST — app.js
// =============================================

const STORAGE_KEY = 'nabaQuestSave';

let state = {
  explorerName: '',
  xp: 0, gems: 0,
  completed: [],
  s1Answers: {}, s1Checked: false,
  s2Checked: false,
  s3Checked: false,
  s4Order:   [],  s4Checked: false,
  s5Answers: {}, s5Checked: false,
  s6Checked: false,
  s7Answers: {}, s7Checked: false,
  s8Answers: {}, s8Checked: false,
};

const REWARDS = {
  1: { xp: 90,  gems: 3, icon: '❓', title: 'THE GREAT NEWS KNOWN!',
       msg: 'SubhanAllah! "An-Naba Al-Atheem" — The Great News. They argued about it. But Allah says twice: "Kalla saya\'lamoon!" — They are going to know. The Day of Resurrection is as certain as the dawn. On to the Signs of Creation!' },
  2: { xp: 100, gems: 4, icon: '⛰️', title: 'EARTH SIGNS UNLOCKED!',
       msg: 'MashAllah! Earth as a resting bed. Mountains as pegs. Sleep as rest. Night as a covering. Day for livelihood. Six gifts, six signs — all custom-designed for YOU. SubhanAllah!' },
  3: { xp: 100, gems: 4, icon: '🌧️', title: 'SKY SIGNS DISCOVERED!',
       msg: 'SubhanAllah! Seven strong heavens. A blazing lamp. Torrential rain. Dense gardens. One chain of mercy — from sky to soil. "Linu\'khrija bihi habban wa nabatan..." Level 4 — The Day is coming!' },
  4: { xp: 110, gems: 4, icon: '📯', title: 'THE DAY UNDERSTOOD!',
       msg: 'Allahu Akbar! Yawm al-Fasl — the Day of Sorting. The Horn is blown. You come in crowds. The sky opens as gates. The mountains become a mirage. Everything changes in an instant. Prepare now!' },
  5: { xp: 110, gems: 4, icon: '🔥', title: 'THE AMBUSH MAPPED!',
       msg: 'MashAllah! Hellfire is a "mirsad" — it is waiting, watching. For those who denied and transgressed. No coolness — only hameem and ghassaq. "They did not expect any account." Let us never be like them.' },
  6: { xp: 120, gems: 5, icon: '🌿', title: 'PARADISE ENTERED!',
       msg: 'SubhanAllah! "Inna lil-muttaqeena mafaza!" — For the righteous is success! Gardens, vines, companions, a full cup. No idle talk, no lies. Pure peace. This is waiting for those who fear Allah. Keep going!' },
  7: { xp: 100, gems: 3, icon: '👑', title: 'THE ROWS WITNESSED!',
       msg: 'Allahu Akbar! Ar-Rahman — even on that Day, He is the Most Merciful. The Spirit and angels in rows. Only those given permission may speak — and only truth. The absolute sovereignty of Allah.' },
  8: { xp: 160, gems: 8, icon: '🏆', title: 'SURAH AN-NABA COMPLETE!',
       msg: 'ALLAHUMMA BARIK! All 8 levels of Surah An-Naba — The Great News — complete! "Fa-man sha\'a ittakhadha ila rabbihi ma\'aba." The path is open. The choice is yours. May Allah make us from those who rush toward Him. Ameen!' },
};

// =============================================
//  GAME DATA
// =============================================

// S1: QUIZ — An-Naba (78:1-5)
const S1_QUIZ = [
  { q: 'What is "An-Naba Al-Atheem" (The Great News) that the Quraysh were disputing about?',
    opts: ['The birth of Prophet Muhammad ﷺ', 'The Day of Resurrection — the Day everyone will be raised and held to account', 'The revelation of the Quran', 'The creation of the heavens and earth'],
    correct: 1 },
  { q: 'What does "Kalla saya\'lamoon" (78:4-5) mean?',
    opts: ['"They will never know the truth"', '"No! They are going to know!" — a firm warning that the Day is certain', '"Perhaps they will learn someday"', '"They should ask the scholars"'],
    correct: 1 },
  { q: 'Why is the warning "they will know" repeated TWICE in verses 4 and 5?',
    opts: ['Because there are two types of people', 'For rhythm and poetry only', 'Arabic repetition signals absolute certainty — nothing could be more sure', 'Because it happened in two different times'],
    correct: 2 },
  { q: 'What does the surah name "An-Naba" mean?',
    opts: ['The Warning', 'The Great News / The Important Announcement', 'The Question', 'The Dispute'],
    correct: 1 },
];

// S2: DRAG & DROP — Signs of Earth (78:6-11)
const S2_ITEMS = [
  { id: 'e1', text: '🌍 Earth made as\na resting place',   zone: 'z1' },
  { id: 'e2', text: '⛰️ Mountains set as\nfirm pegs',       zone: 'z2' },
  { id: 'e3', text: '😴 Sleep given as\ncomplete rest',      zone: 'z3' },
  { id: 'e4', text: '🌙 Night made as\na covering garment', zone: 'z4' },
  { id: 'e5', text: '☀️ Day made for\nseeking livelihood',  zone: 'z5' },
];
const S2_ZONES = [
  { id: 'z1', desc: '"Have We not made the earth a resting place (mihadan)?" (78:6) — A stable cradle for all life.' },
  { id: 'z2', desc: '"And the mountains as pegs (awtadan)?" (78:7) — Deep roots anchoring the earth\'s crust.' },
  { id: 'z3', desc: '"And made your sleep as rest (subatan)?" (78:9) — Complete shutdown: body repair, brain reset.' },
  { id: 'z4', desc: '"And made the night as a covering (libasan)?" (78:10) — Like a garment wrapping you in peace.' },
  { id: 'z5', desc: '"And made the day for livelihood (ma\'asha)?" (78:11) — Daytime for work, provision, and purpose.' },
];

// S3: DRAG & DROP — Signs of Sky (78:12-16)
const S3_ITEMS = [
  { id: 's1', text: '7️⃣ Seven strong\nheavens built above', zone: 'z1' },
  { id: 's2', text: '🔆 Blazing lamp\n(the sun) set alight', zone: 'z2' },
  { id: 's3', text: '🌧️ Rain clouds squeezed\n— torrents of water',  zone: 'z3' },
  { id: 's4', text: '🌾 Grain, gardens\n& thick vegetation',          zone: 'z4' },
];
const S3_ZONES = [
  { id: 'z1', desc: '"And built above you seven strong (shidadan) heavens?" (78:12) — Powerful, firm, perfectly ordered.' },
  { id: 'z2', desc: '"And made a blazing lamp (siraj wahhaj)?" (78:13) — The sun: fire, light, and warmth for all.' },
  { id: 'z3', desc: '"And sent down from rain-clouds water in torrents (thajjaj)?" (78:14) — Squeezed clouds, pouring rain.' },
  { id: 'z4', desc: '"That We may bring forth grain, vegetation, and gardens of thick growth." (78:15-16) — All from one rain.' },
];

// S4: STORY ORDER — The Day of Sorting (78:17-20)
const S4_EVENTS_CORRECT = [
  { id: 'd1', text: '📅 The Day of Decision (Yawm al-Fasl) has its fixed, appointed time — it cannot be delayed (78:17)' },
  { id: 'd2', text: '📯 The Horn is blown by Israfeel — all the dead rise and come forth in vast crowds (78:18)' },
  { id: 'd3', text: '🌌 The sky is torn open and becomes like gates — the barrier between worlds breaks (78:19)' },
  { id: 'd4', text: '⛰️ The mountains are moved away completely — the firm "pegs" become a mirage, nothing (78:20)' },
];

// S5: QUIZ — Hellfire (78:21-30)
const S5_QUIZ = [
  { q: 'What does "mirsad" mean for Hell in 78:21?',
    opts: ['A training ground for sinners', 'A watch-post / ambush — Hell is lying in wait, ready and alert', 'A temporary holding place', 'A dark cave with no fire'],
    correct: 1 },
  { q: 'How long do the transgressors remain in Hell according to 78:23?',
    opts: ['100 years — then they leave', '"Ahqaban" — ages upon ages, a very long time', 'Until the Day of Judgment only', 'It varies based on their sins'],
    correct: 1 },
  { q: 'What do they drink in Hell instead of cold water (78:24-25)?',
    opts: ['Nothing — they get no drink at all', '"Hameem" (scalding water) and "Ghassaq" (dark, putrid fluid) — no coolness, no relief', 'Bitter water that tastes of aloe', 'Hot steam only'],
    correct: 1 },
  { q: 'According to 78:27-28, what was the root cause of their punishment?',
    opts: ['They were too poor to give charity', '"They did not expect any account (hisab)" and "denied Our signs completely"', 'They forgot to pray a few times', 'They made mistakes in reciting Quran'],
    correct: 1 },
];

// S6: DRAG & DROP — Paradise (78:31-36)
const S6_ITEMS = [
  { id: 'p1', text: '🌿 Gardens and\ngrape vines', zone: 'z1' },
  { id: 'p2', text: '👫 Companions of\nequal age (atrab)', zone: 'z2' },
  { id: 'p3', text: '🥛 A full cup,\noverflowing (dihaq)', zone: 'z3' },
  { id: 'p4', text: '🚫 No idle talk\nor falsehood heard', zone: 'z4' },
];
const S6_ZONES = [
  { id: 'z1', desc: '"Indeed for the righteous is success (mafaza) — gardens and grape vines." (78:31-32) — Lush, enclosed gardens.' },
  { id: 'z2', desc: '"And companions of equal age (kawa\'ib atrab)." (78:33) — Perfect, beautiful, matched companions.' },
  { id: 'z3', desc: '"And a cup (ka\'san) full to the brim (dihaqan)." (78:34) — Pure drink, overflowing, no harm.' },
  { id: 'z4', desc: '"They will not hear therein ill speech (laghw) or any falsehood (kidhdhab)." (78:35) — Pure peace, no negativity.' },
];

// S7: QUIZ — Standing Before the Lord (78:37-38)
const S7_QUIZ = [
  { q: 'Who is "ar-Ruh" (the Spirit) who stands in a row on that Day (78:38)?',
    opts: ['The soul of every person', 'Jibreel (Angel Gabriel) — the greatest of all angels, filling the entire row', 'The souls of all prophets together', 'A special creation Allah has not described'],
    correct: 1 },
  { q: 'Who may speak on the Day when the Spirit and angels stand in rows (78:38)?',
    opts: ['All prophets speak freely for their nations', '"Only one who is given permission by ar-Rahman — and he will say what is correct (sawab)"', 'The believers can explain their deeds fully', 'The angels speak on behalf of everyone'],
    correct: 1 },
  { q: 'What does "Rabb al-samawati wal-ard wa ma baynahuma ar-Rahman" (78:37) establish?',
    opts: ['That Allah only rules the sky', '"Lord of the heavens, the earth, and ALL that is between them — the Most Merciful" — His total, complete sovereignty', 'That ar-Rahman is a different name from Allah', 'That only believers have a Lord'],
    correct: 1 },
];

// S8: QUIZ — The Final Warning (78:39-40)
const S8_QUIZ = [
  { q: 'What is "Yawm al-Haqq" (The Day of Truth) in 78:39?',
    opts: ['A day of judgment only for non-believers', 'The Day when all truth becomes clear and undeniable — every lie dissolved, every deed revealed', 'The day the Quran was revealed', 'The day the sun rises from the West'],
    correct: 1 },
  { q: 'How near is the punishment according to 78:40?',
    opts: ['"It is far away — nothing to worry about yet"', '"We have warned you of a punishment that is NEAR (qarib)" — it is close, not distant', '"It will happen only after 1000 years"', '"Nobody knows when it will come"'],
    correct: 1 },
  { q: 'What will the disbeliever say when he sees his deeds on that Day (78:40)?',
    opts: ['"I wish I had done more charity!"', '"Ya laytani kuntu turaban!" — "I wish I were dust!" — wishing he had never been created', '"I wish I had more time to repent!"', '"I wish I could go back to the world!"'],
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
      btn.textContent = opt;
      let _touched = false;
      btn.addEventListener('touchend', (e) => {
        e.preventDefault(); _touched = true; _selectOption(n, qi, oi);
        setTimeout(() => { _touched = false; }, 500);
      }, { passive: false });
      btn.onclick = () => { if (_touched) return; _selectOption(n, qi, oi); };
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
  // Re-apply all saved answers (iOS protection)
  Object.entries(state[`s${n}Answers`]).forEach(([q, o]) => {
    if (parseInt(q) === qi) return;
    const b = document.querySelector(`[data-section="${n}"][data-qi="${q}"][data-oi="${o}"]`);
    if (b) b.classList.add('selected');
  });
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
      if (oi === q.correct)  btn.classList.add('correct');
      else if (oi === sel)   btn.classList.add('incorrect');
    });
    if (sel === q.correct) correct++;
  });
  const fb = document.getElementById(`feedback-${n}`);
  const pass = Math.ceil(data.length * 0.75);
  if (correct >= pass) {
    fb.textContent = `🏆 ${correct}/${data.length} correct! Excellent!`; fb.className = 'game-feedback success';
    state[`s${n}Checked`] = true; saveProgress();
    document.getElementById(`complete-${n}-btn`).style.display = 'inline-block';
  } else if (correct >= Math.ceil(data.length * 0.5)) {
    fb.textContent = `📚 ${correct}/${data.length} — re-read and try again.`; fb.className = 'game-feedback partial';
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
    fb.textContent = `✅ ${cnt}/${data.length} — almost! Adjust the red one.`; fb.className = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${cnt}/${data.length} — re-read and try again.`; fb.className = 'game-feedback error';
  }
}

// ---- SECTION WRAPPERS ----
function renderSection1Game() { _renderQuiz(1, S1_QUIZ); }
function checkSection1()      { _checkQuiz(1, S1_QUIZ); }
function renderSection2Game() { _renderDragDrop(2, S2_ITEMS, S2_ZONES); }
function checkSection2()      { _checkDragDrop(2, S2_ZONES); }
function renderSection3Game() { _renderDragDrop(3, S3_ITEMS, S3_ZONES); }
function checkSection3()      { _checkDragDrop(3, S3_ZONES); }
function renderSection4Game() { _renderStoryOrder(4, S4_EVENTS_CORRECT); }
function checkSection4()      { _checkStoryOrder(4, S4_EVENTS_CORRECT); }
function renderSection5Game() { _renderQuiz(5, S5_QUIZ); }
function checkSection5()      { _checkQuiz(5, S5_QUIZ); }
function renderSection6Game() { _renderDragDrop(6, S6_ITEMS, S6_ZONES); }
function checkSection6()      { _checkDragDrop(6, S6_ZONES); }
function renderSection7Game() { _renderQuiz(7, S7_QUIZ); }
function checkSection7()      { _checkQuiz(7, S7_QUIZ); }
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
  if (ex) document.getElementById(ex.dataset.pool || 'drag-pool-2').appendChild(ex);
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
  document.addEventListener('touchcancel', function() {
    if (!touchEl) return;
    touchEl.classList.remove('dragging'); touchEl = null;
    if (touchClone) { touchClone.remove(); touchClone = null; }
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
  });
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
      welcomeEl.textContent = `As-salamu alaykum, ${state.explorerName}! Surah An-Naba — "The Great News." What were they arguing about? The Day of Resurrection — the most important truth in existence. 8 levels: creation signs, the Day of Sorting, Hellfire, Paradise, and the final choice. "Whoever wills — let him take a path to his Lord." Let's begin!`;
    else if (state.completed.length < 8)
      welcomeEl.textContent = `Welcome back, ${state.explorerName}! ${state.completed.length} level${state.completed.length>1?'s':''} complete. "Kalla saya'lamoon!" — Keep learning! 📯`;
    else
      welcomeEl.textContent = `MashAllah, ${state.explorerName}! All 8 levels of An-Naba complete! "Fa-man sha'a ittakhadha ila Rabbihi ma'aba." May Allah make us from those who rush toward Him. Ameen! 🏆`;
  }

  const icons  = ['❓','⛰️','🌧️','📯','🔥','🌿','👑','🏆'];
  const labels = ['Great News','Earth Signs','Sky Signs','Day of Sorting','Hellfire','Paradise','The Rows','Final Warning'];
  [1,2,3,4,5,6,7,8].forEach(n => {
    const tile = document.getElementById(`tile-${n}`), status = document.getElementById(`status-${n}`);
    if (!tile || !status) return;
    const done = state.completed.includes(n), unlocked = n === 1 || state.completed.includes(n-1);
    tile.className = 'map-tile';
    if (done)          { tile.classList.add('completed'); tile.onclick = () => openSection(n); status.textContent = '✅ DONE'; }
    else if (unlocked) { tile.classList.add('unlocked');  tile.onclick = () => openSection(n); status.textContent = '▶ PLAY'; }
    else               { tile.classList.add('locked');    tile.onclick = null; status.textContent = '🔒 LOCKED'; }

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
  if (!confirm('Reset ALL progress for Surah An-Naba and start over?')) return;
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
