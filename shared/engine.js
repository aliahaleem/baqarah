'use strict';
/* ================================================
   QURAN QUEST — shared/engine.js
   Single Responsibility: all game mechanics.
   Reads window.state and window.STORAGE_KEY
   (set by each surah's app.js before this loads).
   ================================================ */

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
  try { localStorage.setItem(window.STORAGE_KEY, JSON.stringify(window.state)); } catch(e) {}
}
function loadProgress() {
  try {
    const raw = localStorage.getItem(window.STORAGE_KEY);
    if (raw) Object.assign(window.state, JSON.parse(raw));
  } catch(e) {}
}

function _buildLabel(ctx, W, msg, done, total) {
  ctx.fillStyle = window.state ? 'rgba(255,187,68,0.8)' : '#888';
  ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = window.SURAH_CONFIG ? 'rgba(255,187,68,0.7)' : '#3a7a2a';
  ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}

// =============================================
//  VERSE POPUP
// =============================================
function showVersePopup(v) {
  const p = document.getElementById('verse-popup');
  if (!p) return;
  const ref    = document.getElementById('vp-ref');
  const arabic = document.getElementById('vp-arabic');
  const eng    = document.getElementById('vp-eng');
  const note   = document.getElementById('vp-note');
  if (ref)    ref.textContent    = v.ref    || '';
  if (arabic) arabic.textContent = v.arabic || '';
  if (eng)    eng.textContent    = v.english || v.eng || '';
  if (note)   note.textContent   = v.note   || '';
  p.classList.add('visible');
}
function hideVersePopup() {
  const p = document.getElementById('verse-popup');
  if (p) p.classList.remove('visible');
  // Also handle slide-up variants
  document.querySelectorAll('.verse-popup-slide').forEach(el => el.classList.remove('visible'));
}

// =============================================
//  QUIZ
// =============================================
function selectOption(n, qi, oi) {
  if (window.state[`s${n}Checked`]) return;
  document.querySelectorAll(`[data-section="${n}"][data-qi="${qi}"]`).forEach(b => b.classList.remove('selected'));
  const btn = document.querySelector(`[data-section="${n}"][data-qi="${qi}"][data-oi="${oi}"]`);
  if (btn) btn.classList.add('selected');
  if (!window.state[`s${n}Answers`]) window.state[`s${n}Answers`] = {};
  window.state[`s${n}Answers`][qi] = oi;
  saveProgress();
  // Re-apply ALL saved answers — prevents iOS ghost-click from losing selections
  Object.entries(window.state[`s${n}Answers`]).forEach(([q, o]) => {
    if (parseInt(q) === qi) return;
    const b = document.querySelector(`[data-section="${n}"][data-qi="${q}"][data-oi="${o}"]`);
    if (b) b.classList.add('selected');
  });
}

function renderQuiz(n, data) {
  const c = document.getElementById(`quiz-${n}`); if (!c) return;
  c.innerHTML = '';
  data.forEach((q, qi) => {
    const qEl = document.createElement('div');
    qEl.className = 'quiz-question';
    qEl.innerHTML = `<div class="question-text"><span class="q-num">Q${qi+1}.</span>${q.q}</div>
      <div class="options-grid" id="opts-${n}-${qi}"></div>`;
    c.appendChild(qEl);
    const optsEl = qEl.querySelector(`#opts-${n}-${qi}`);
    q.opts.forEach((opt, oi) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.qi = qi; btn.dataset.oi = oi; btn.dataset.section = n;
      btn.textContent = opt;
      let _touched = false;
      btn.addEventListener('touchend', (e) => {
        e.preventDefault(); _touched = true; selectOption(n, qi, oi);
        setTimeout(() => { _touched = false; }, 500);
      }, { passive: false });
      btn.onclick = () => { if (_touched) return; selectOption(n, qi, oi); };
      optsEl.appendChild(btn);
    });
  });
  const ans = window.state[`s${n}Answers`] || {};
  Object.entries(ans).forEach(([qi, oi]) => {
    const btn = document.querySelector(`[data-section="${n}"][data-qi="${qi}"][data-oi="${oi}"]`);
    if (btn) btn.classList.add('selected');
  });
  if (window.state.completed.includes(n) || window.state[`s${n}Checked`]) {
    const btn = document.getElementById(`complete-${n}-btn`);
    if (btn) btn.style.display = 'inline-block';
  }
}

function checkQuiz(n, data) {
  const ans = window.state[`s${n}Answers`] || {};
  const fb  = document.getElementById(`feedback-${n}`);
  if (Object.keys(ans).length < data.length) {
    if (fb) { fb.textContent = `⚠️ Please answer all ${data.length} questions first!`; fb.className = 'game-feedback partial'; }
    return;
  }
  let correct = 0;
  data.forEach((q, qi) => {
    const sel = ans[qi];
    document.querySelectorAll(`[data-section="${n}"][data-qi="${qi}"]`).forEach((btn, oi) => {
      btn.disabled = true; btn.classList.remove('selected');
      if (oi === q.correct)                   btn.classList.add('correct');
      else if (oi === sel && sel !== q.correct) btn.classList.add('incorrect');
    });
    if (sel === q.correct) correct++;
  });
  const total = data.length, pass = Math.ceil(total * 0.75);
  if (!fb) return;
  if (correct >= pass) {
    fb.textContent = `🏆 ${correct}/${total} correct! Excellent work! MashAllah!`;
    fb.className   = 'game-feedback success';
    window.state[`s${n}Checked`] = true; saveProgress();
    const btn = document.getElementById(`complete-${n}-btn`);
    if (btn) btn.style.display = 'inline-block';
  } else if (correct >= Math.ceil(total * 0.6)) {
    fb.textContent = `📚 ${correct}/${total} — almost! Re-read and try again.`;
    fb.className   = 'game-feedback partial';
    window.state[`s${n}Answers`] = {};
    setTimeout(() => renderQuiz(n, data), 2500);
  } else {
    fb.textContent = `❌ ${correct}/${total} — re-read the story carefully and try again.`;
    fb.className   = 'game-feedback error';
    window.state[`s${n}Answers`] = {};
    setTimeout(() => renderQuiz(n, data), 2500);
  }
}

// =============================================
//  DRAG & DROP
// =============================================
function renderDragDrop(n, items, zones) {
  const pool    = document.getElementById(`drag-pool-${n}`);
  const zonesEl = document.getElementById(`drop-zones-${n}`);
  if (!pool || !zonesEl) return;
  pool.innerHTML = ''; zonesEl.innerHTML = '';
  shuffle(items).forEach(item => {
    const el = document.createElement('div');
    el.className      = 'drag-item'; el.draggable = true;
    el.dataset.itemId = item.id; el.dataset.zone = item.zone;
    el.dataset.pool   = `drag-pool-${n}`; el.textContent = item.text;
    pool.appendChild(el);
  });
  shuffle(zones).forEach(zone => {
    const el = document.createElement('div');
    el.className      = 'drop-zone'; el.dataset.zoneId = zone.id;
    el.innerHTML      = `<span class="drop-zone-desc">${zone.desc}</span>`;
    zonesEl.appendChild(el);
  });
  if (window.state.completed.includes(n) || window.state[`s${n}Checked`]) {
    const btn = document.getElementById(`complete-${n}-btn`);
    if (btn) btn.style.display = 'inline-block';
  }
}

function checkDragDrop(n, zones) {
  const dropZones = document.querySelectorAll(`#drop-zones-${n} .drop-zone`);
  let correct = 0;
  dropZones.forEach(zone => {
    zone.classList.remove('correct', 'incorrect');
    const item = zone.querySelector('.drag-item');
    if (item && item.dataset.zone === zone.dataset.zoneId) { zone.classList.add('correct');   correct++; }
    else if (item)                                          { zone.classList.add('incorrect'); }
  });
  const fb = document.getElementById(`feedback-${n}`), total = zones.length;
  if (!fb) return;
  if (correct === total) {
    fb.textContent = `🏆 Perfect! All ${total} matched! MashAllah!`; fb.className = 'game-feedback success';
    window.state[`s${n}Checked`] = true; saveProgress();
    const btn = document.getElementById(`complete-${n}-btn`);
    if (btn) btn.style.display = 'inline-block';
  } else if (correct >= total - 1) {
    fb.textContent = `✅ ${correct}/${total} — so close! Fix the red one.`; fb.className = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${correct}/${total} — re-read and try again!`; fb.className = 'game-feedback error';
  }
}

// =============================================
//  STORY ORDER
// =============================================
function renderStoryOrder(n, data) {
  const key = `s${n}Order`;
  if (!window.state[key] || window.state[key].length !== data.length) {
    window.state[key] = shuffle(data).map(e => e.id); saveProgress();
  }
  renderOrderItems(n, data);
  if (window.state.completed.includes(n) || window.state[`s${n}Checked`]) {
    const btn = document.getElementById(`complete-${n}-btn`);
    if (btn) btn.style.display = 'inline-block';
  }
}

function renderOrderItems(n, data) {
  const c = document.getElementById(`order-${n}`); if (!c) return;
  const key = `s${n}Order`; c.innerHTML = '';
  window.state[key].forEach((id, idx) => {
    const ev = data.find(e => e.id === id); if (!ev) return;
    const item = document.createElement('div');
    item.className = 'order-item'; item.dataset.id = id;
    item.innerHTML = `<div class="order-num">${idx+1}</div>
      <div class="order-text">${ev.text}</div>
      <div class="order-btns">
        <button class="order-btn" onclick="moveOrderItem(${n},${idx},-1,window['_S${n}_EVENTS'])" ${idx===0?'disabled':''}>↑</button>
        <button class="order-btn" onclick="moveOrderItem(${n},${idx}, 1,window['_S${n}_EVENTS'])" ${idx===window.state[key].length-1?'disabled':''}>↓</button>
      </div>`;
    c.appendChild(item);
  });
}

function moveOrderItem(n, idx, dir, data) {
  const key = `s${n}Order`, ni = idx + dir;
  if (ni < 0 || ni >= window.state[key].length) return;
  const arr = [...window.state[key]]; [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
  window.state[key] = arr; saveProgress(); renderOrderItems(n, data);
}
// Alias for older baqarah inline calls
function _moveOrderItem(n, idx, dir, data) { moveOrderItem(n, idx, dir, data); }

function checkStoryOrder(n, data) {
  const correct = data.map(e => e.id), key = `s${n}Order`; let cnt = 0;
  document.querySelectorAll(`#order-${n} .order-item`).forEach((item, i) => {
    item.classList.remove('correct-pos','incorrect-pos');
    if (item.dataset.id === correct[i]) { item.classList.add('correct-pos'); cnt++; }
    else item.classList.add('incorrect-pos');
  });
  const fb = document.getElementById(`feedback-${n}`), total = data.length;
  if (!fb) return;
  if (cnt === total) {
    fb.textContent = '🏆 Perfect order! MashAllah!'; fb.className = 'game-feedback success';
    window.state[`s${n}Checked`] = true; saveProgress();
    const btn = document.getElementById(`complete-${n}-btn`);
    if (btn) btn.style.display = 'inline-block';
  } else if (cnt >= total - 1) {
    fb.textContent = `✅ ${cnt}/${total} — almost! Adjust the red one.`; fb.className = 'game-feedback partial';
  } else {
    fb.textContent = `❌ ${cnt}/${total} — re-read and try again!`; fb.className = 'game-feedback error';
  }
}

// =============================================
//  MOUSE DRAG EVENTS (desktop)
// =============================================
let _dragging = null;
document.addEventListener('dragstart', e => {
  const item = e.target.closest('.drag-item'); if (!item) return;
  _dragging = item;
  setTimeout(() => item.classList.add('dragging'), 0);
  e.dataTransfer.setData('text/plain', item.dataset.itemId || '');
});
document.addEventListener('dragend', e => {
  const item = e.target.closest('.drag-item'); if (item) item.classList.remove('dragging');
  _dragging = null;
});
document.addEventListener('dragover', e => {
  const zone = e.target.closest('.drop-zone');
  if (zone) { e.preventDefault(); zone.classList.add('drag-over'); }
  if (e.target.closest('.drag-pool')) e.preventDefault();
});
document.addEventListener('dragleave', e => {
  const zone = e.target.closest('.drop-zone');
  if (zone && !zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
});
document.addEventListener('drop', e => {
  e.preventDefault(); if (!_dragging) return;
  const targetZone = e.target.closest('.drop-zone');
  const targetPool = e.target.closest('.drag-pool');
  if (targetZone) {
    targetZone.classList.remove('drag-over');
    const ex = targetZone.querySelector('.drag-item');
    if (ex) { ex.classList.remove('placed'); const p = document.getElementById(ex.dataset.pool) || ex.closest('.drag-pool'); if (p) p.appendChild(ex); }
    _dragging.classList.add('placed'); targetZone.appendChild(_dragging);
  } else if (targetPool) {
    _dragging.classList.remove('placed'); targetPool.appendChild(_dragging);
  }
  _dragging = null;
});

// =============================================
//  TOUCH DRAG & DROP — iOS / Android
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
      width:rect.width+'px', minHeight:rect.height+'px',
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
