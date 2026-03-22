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
  var pal = window.SCENE_PALETTE || {};
  ctx.fillStyle = pal.labelText || (window.state ? 'rgba(255,187,68,0.8)' : '#888');
  ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = pal.labelBg || 'rgba(255,255,255,0.08)';
  ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = pal.labelBar || (window.SURAH_CONFIG ? 'rgba(255,187,68,0.7)' : '#3a7a2a');
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
//  QUIZ  (options are shuffled on each fresh render)
// =============================================
window._quizShuffleCache = window._quizShuffleCache || {};

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

function _buildShuffledQuiz(n, data) {
  // Build a shuffled-options version and cache it in memory.
  // Cache is cleared on wrong answer so each retry gets a new shuffle.
  if (!window._quizShuffleCache[n]) {
    window._quizShuffleCache[n] = data.map(q => {
      const indexed = q.opts.map((opt, i) => ({ opt, orig: i }));
      const sh = shuffle(indexed);
      return {
        q: q.q,
        opts: sh.map(x => x.opt),
        correct: sh.findIndex(x => x.orig === q.correct)
      };
    });
  }
  return window._quizShuffleCache[n];
}

function renderQuiz(n, data) {
  const c = document.getElementById(`quiz-${n}`); if (!c) return;
  c.innerHTML = '';
  // Clear any stale saved answers that predate this shuffle (e.g. from a previous session)
  const cached = window._quizShuffleCache[n];
  if (!cached) {
    const stale = window.state[`s${n}Answers`] || {};
    if (Object.keys(stale).length > 0 && !window.state[`s${n}Checked`]) {
      window.state[`s${n}Answers`] = {}; saveProgress();
    }
  }
  const qData = _buildShuffledQuiz(n, data);
  qData.forEach((q, qi) => {
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
  // Use the same shuffled data that was rendered
  const qData = (window._quizShuffleCache && window._quizShuffleCache[n]) || data;
  const ans = window.state[`s${n}Answers`] || {};
  const fb  = document.getElementById(`feedback-${n}`);
  if (Object.keys(ans).length < qData.length) {
    if (fb) { fb.textContent = `⚠️ Please answer all ${qData.length} questions first!`; fb.className = 'game-feedback partial'; }
    return;
  }
  let correct = 0;
  qData.forEach((q, qi) => {
    const sel = ans[qi];
    document.querySelectorAll(`[data-section="${n}"][data-qi="${qi}"]`).forEach((btn, oi) => {
      btn.disabled = true; btn.classList.remove('selected');
      if (oi === q.correct)                   btn.classList.add('correct');
      else if (oi === sel && sel !== q.correct) btn.classList.add('incorrect');
    });
    if (sel === q.correct) correct++;
  });
  const total = qData.length, pass = Math.ceil(total * 0.75);
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
    // Clear cache so next attempt gets a freshly shuffled order
    if (window._quizShuffleCache) delete window._quizShuffleCache[n];
    setTimeout(() => renderQuiz(n, data), 2500);
  } else {
    fb.textContent = `❌ ${correct}/${total} — re-read the story carefully and try again.`;
    fb.className   = 'game-feedback error';
    window.state[`s${n}Answers`] = {};
    if (window._quizShuffleCache) delete window._quizShuffleCache[n];
    setTimeout(() => renderQuiz(n, data), 2500);
  }
}

// =============================================
//  TAP-TO-MATCH (replaces drag & drop)
// =============================================
function renderDragDrop(n, items, zones) {
  const pool = document.getElementById(`drag-pool-${n}`);
  const zonesEl = document.getElementById(`drop-zones-${n}`);
  const orderEl = document.getElementById(`order-${n}`);
  const parent = pool ? pool.parentElement : (zonesEl ? zonesEl.parentElement : (orderEl || null));
  if (!parent) return;

  const pairs = items.map(item => {
    const zone = zones.find(z => z.id === item.zone);
    return { left: item.text, right: zone ? zone.desc : '', origIdx: item.id };
  });
  const shuffledRight = shuffle(pairs.slice());

  let html = '<div class="tap-match-grid">';
  html += '<div class="tap-match-col">';
  pairs.forEach((p, i) => {
    const isAr = /[\u0600-\u06FF]/.test(p.left);
    html += `<button class="wbw-match-btn${isAr ? ' ar-btn' : ''}" data-section="${n}" data-side="left" data-idx="${i}">${p.left}</button>`;
  });
  html += '</div><div class="tap-match-col">';
  shuffledRight.forEach(p => {
    const origIdx = pairs.indexOf(p);
    html += `<button class="wbw-match-btn en-btn" data-section="${n}" data-side="right" data-idx="${origIdx}">${p.right}</button>`;
  });
  html += '</div></div>';

  parent.innerHTML = html;

  let selectedLeft = null;
  parent.addEventListener('click', function(ev) {
    const btn = ev.target.closest('.wbw-match-btn');
    if (!btn || btn.classList.contains('matched')) return;
    const side = btn.dataset.side, idx = parseInt(btn.dataset.idx, 10);

    if (side === 'left') {
      parent.querySelectorAll('[data-side="left"]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedLeft = idx;
    } else if (side === 'right' && selectedLeft !== null) {
      const leftBtn = parent.querySelector(`[data-side="left"][data-idx="${selectedLeft}"]`);
      if (idx === selectedLeft) {
        btn.classList.add('matched');
        if (leftBtn) leftBtn.classList.add('matched');
        if (leftBtn) leftBtn.classList.remove('selected');
        selectedLeft = null;
        const total = parent.querySelectorAll('[data-side="left"]').length;
        const done = parent.querySelectorAll('[data-side="left"].matched').length;
        const fb = document.getElementById(`feedback-${n}`);
        if (done === total) {
          if (fb) { fb.textContent = `🏆 All ${total} matched! MashAllah!`; fb.className = 'game-feedback success'; }
          window.state[`s${n}Checked`] = true; saveProgress();
          const claimBtn = document.getElementById(`complete-${n}-btn`);
          if (claimBtn) claimBtn.style.display = 'inline-block';
        } else if (fb) {
          fb.textContent = `${done}/${total} matched`; fb.className = 'game-feedback partial';
        }
      } else {
        btn.classList.add('wrong');
        if (leftBtn) leftBtn.classList.add('wrong');
        setTimeout(() => {
          btn.classList.remove('wrong');
          if (leftBtn) leftBtn.classList.remove('wrong', 'selected');
        }, 700);
        selectedLeft = null;
      }
    }
  });

  if (window.state.completed.includes(n) || window.state[`s${n}Checked`]) {
    const btn = document.getElementById(`complete-${n}-btn`);
    if (btn) btn.style.display = 'inline-block';
  }
}

function checkDragDrop(n, zones) {
  const pool = document.getElementById(`drag-pool-${n}`);
  const parent = pool ? pool.parentElement : null;
  if (!parent) return;
  const total = parent.querySelectorAll('[data-side="left"]').length;
  const done = parent.querySelectorAll('[data-side="left"].matched').length;
  const fb = document.getElementById(`feedback-${n}`);
  if (done === total && total > 0) {
    if (fb) { fb.textContent = `🏆 All ${total} matched! MashAllah!`; fb.className = 'game-feedback success'; }
    window.state[`s${n}Checked`] = true; saveProgress();
    const btn = document.getElementById(`complete-${n}-btn`); if (btn) btn.style.display = 'inline-block';
  } else if (fb) {
    fb.textContent = `${done}/${total} matched — tap Arabic on left, then tap its English meaning on right!`;
    fb.className = 'game-feedback';
  }
}

// =============================================
//  SECTION REGISTRATION HELPERS (DRY)
// =============================================

window.registerQuiz = function(sectionNum, quizData) {
  window['renderSection' + sectionNum + 'Game'] = function() { renderQuiz(sectionNum, quizData); };
  window['checkSection' + sectionNum]           = function() { checkQuiz(sectionNum, quizData); };
};

window.registerMatch = function(sectionNum, items, zones) {
  window['renderSection' + sectionNum + 'Game'] = function() { renderDragDrop(sectionNum, items, zones); };
  window['checkSection' + sectionNum]           = function() { checkDragDrop(sectionNum, zones); };
};

// =============================================
//  FILL-IN-THE-BLANK (Arabic verse completion)
// =============================================

function renderFillBlank(n, data) {
  const el = document.getElementById(`order-${n}`) || document.getElementById(`quiz-${n}`);
  if (!el) return;
  const saved = window.state[`s${n}Answers`] || {};
  let html = '';
  data.forEach((item, qi) => {
    const picked = saved[qi];
    html += '<div class="fb-question" style="margin-bottom:18px;">';
    html += `<div class="fb-verse" dir="rtl" style="font-family:var(--font-arabic);font-size:22px;line-height:2;text-align:center;padding:10px;background:var(--bg2);border-radius:var(--radius);margin-bottom:8px;">${item.verse}</div>`;
    if (item.ref) html += `<div style="text-align:center;font-size:var(--font-size-xs);color:var(--text-dim);margin-bottom:8px;">${item.ref}</div>`;
    html += `<div class="options-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">`;
    item.opts.forEach((opt, oi) => {
      const isAr = /[\u0600-\u06FF]/.test(opt);
      let cls = 'option-btn';
      if (picked !== undefined) {
        if (oi === item.correct) cls += ' correct-fb';
        else if (oi === picked && picked !== item.correct) cls += ' wrong-fb';
      }
      if (picked !== undefined) cls += ' disabled-fb';
      html += `<button class="${cls}" data-qi="${qi}" data-oi="${oi}" data-section="${n}"${isAr ? ' dir="rtl" style="font-family:var(--font-arabic);font-size:20px;line-height:1.6;"' : ''}>${opt}</button>`;
    });
    html += '</div>';
    if (picked !== undefined && item.translation) {
      html += `<div style="text-align:center;font-size:var(--font-size-sm);color:var(--accent);margin-top:6px;font-style:italic;">${item.translation}</div>`;
    }
    html += '</div>';
  });
  el.innerHTML = html;

  el.querySelectorAll('.option-btn:not(.disabled-fb)').forEach(btn => {
    let _touched = false;
    btn.addEventListener('touchend', function(e) {
      e.preventDefault(); _touched = true;
      _selectFB(n, parseInt(btn.dataset.qi), parseInt(btn.dataset.oi), data);
      setTimeout(() => { _touched = false; }, 500);
    }, { passive: false });
    btn.onclick = function() {
      if (_touched) return;
      _selectFB(n, parseInt(btn.dataset.qi), parseInt(btn.dataset.oi), data);
    };
  });
}

function _selectFB(n, qi, oi, data) {
  if (!window.state[`s${n}Answers`]) window.state[`s${n}Answers`] = {};
  if (window.state[`s${n}Answers`][qi] !== undefined) return;
  window.state[`s${n}Answers`][qi] = oi;
  saveProgress();
  renderFillBlank(n, data);
}

function checkFillBlank(n, data) {
  const saved = window.state[`s${n}Answers`] || {};
  const total = data.length;
  let correct = 0;
  data.forEach((item, qi) => { if (saved[qi] === item.correct) correct++; });
  const fb = document.getElementById(`feedback-${n}`);
  if (!fb) return;
  if (correct === total) {
    fb.textContent = `🏆 ${correct}/${total} correct! MashAllah — you know these verses!`;
    fb.className = 'game-feedback success';
    window.state[`s${n}Checked`] = true; saveProgress();
    const btn = document.getElementById(`complete-${n}-btn`);
    if (btn) btn.style.display = 'inline-block';
  } else if (Object.keys(saved).length < total) {
    fb.textContent = `Answer all ${total} questions first, then check.`;
    fb.className = 'game-feedback';
  } else {
    fb.textContent = `${correct}/${total} — review and try again!`;
    fb.className = 'game-feedback error';
    window.state[`s${n}Answers`] = {};
    setTimeout(() => renderFillBlank(n, data), 2000);
  }
}

window.registerFillBlank = function(sectionNum, data) {
  window['renderSection' + sectionNum + 'Game'] = function() { renderFillBlank(sectionNum, data); };
  window['checkSection' + sectionNum]           = function() { checkFillBlank(sectionNum, data); };
};

// =============================================
//  STATE INITIALISATION HELPER (DRY)
// =============================================

window.buildDefaultState = function(totalLevels) {
  var s = { explorerName: '', xp: 0, gems: 0, completed: [] };
  for (var n = 1; n <= totalLevels; n++) {
    s['s' + n + 'Answers'] = {};
    s['s' + n + 'Checked'] = false;
    s['s' + n + 'Order']   = [];
  }
  return s;
};
