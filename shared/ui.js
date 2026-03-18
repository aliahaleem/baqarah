'use strict';
/* ================================================
   QURAN QUEST — shared/ui.js
   Single Responsibility: navigation, rewards,
   game lifecycle, theme switching.
   Reads window.SURAH_CONFIG and window.state
   (set by each surah's app.js before this loads).
   ================================================ */

// =============================================
//  THEME MANAGEMENT
// =============================================
function getTheme() { return localStorage.getItem('quranQuestTheme') || 'minecraft'; }

function _applyNamePlaceholder(theme) {
  const input = document.getElementById('explorer-name');
  if (!input) return;
  input.placeholder = theme === 'stars'
    ? 'Your name, e.g. Ayesha...'
    : 'Your name, e.g. Ahmad...';
}

function setTheme(t) {
  localStorage.setItem('quranQuestTheme', t);
  document.documentElement.setAttribute('data-theme', t);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === t);
  });
  _applyNamePlaceholder(t);
}

// =============================================
//  STATS BAR
// =============================================
function updateUI() {
  const cfg = window.SURAH_CONFIG;
  if (!window.state || !window.state.explorerName) return;

  const headerName = document.getElementById('header-name');
  const xpEl       = document.getElementById('xp-display');
  const gemsEl     = document.getElementById('gems-display');
  const doneEl     = document.getElementById('done-display');
  if (headerName) headerName.textContent = window.state.explorerName;
  if (xpEl)       xpEl.textContent       = window.state.xp;
  if (gemsEl)     gemsEl.textContent     = window.state.gems;
  if (doneEl)     doneEl.textContent     = window.state.completed.length;

  // Welcome message (defined per-surah in SURAH_CONFIG.welcomeMsg)
  const welcomeEl = document.getElementById('welcome-text');
  if (welcomeEl && cfg && cfg.welcomeMsg) {
    const done = window.state.completed.length;
    if (!done)                  welcomeEl.textContent = cfg.welcomeMsg.fresh(window.state.explorerName);
    else if (done < cfg.totalLevels) welcomeEl.textContent = cfg.welcomeMsg.partial(window.state.explorerName, done);
    else                        welcomeEl.textContent = cfg.welcomeMsg.complete(window.state.explorerName);
  }

  // Map tiles
  if (cfg) {
    for (let n = 1; n <= cfg.totalLevels; n++) {
      const tile   = document.getElementById(`tile-${n}`);
      const status = document.getElementById(`status-${n}`);
      if (!tile || !status) continue;
      const done     = window.state.completed.includes(n);
      const unlocked = n === 1 || window.state.completed.includes(n - 1);
      tile.className = 'map-tile';
      if (done) {
        tile.classList.add('completed');
        tile.onclick = () => openSection(n);
        status.textContent = '✅ DONE';
      } else if (unlocked) {
        tile.classList.add('unlocked');
        tile.onclick = () => openSection(n);
        status.textContent = '▶ PLAY';
      } else {
        tile.classList.add('locked');
        tile.onclick = null;
        status.textContent = '🔒 LOCKED';
      }

      // World builder chunk
      const chunk = document.getElementById(`chunk-${n}`);
      if (chunk) {
        chunk.classList.toggle('built', done);
        const em = chunk.querySelector('.chunk-emoji');
        const lb = chunk.querySelector('.chunk-label');
        if (em) em.textContent = done ? (cfg.tileIcons[n-1] || '✅') : '⬛';
        if (lb) lb.textContent = cfg.tileLabels[n-1] || `Level ${n}`;
      }
    }
    if (window.state.completed.length === cfg.totalLevels) {
      const allComplete = document.getElementById('all-complete');
      if (allComplete) allComplete.style.display = 'block';
    }
  }

  // Surah-specific extras (world builder canvas, etc.)
  if (typeof window.updateUIExtra === 'function') window.updateUIExtra();
}

// =============================================
//  SECTION NAVIGATION
// =============================================
function openSection(n) {
  const unlocked = n === 1 || (window.state && window.state.completed.includes(n - 1));
  if (!unlocked) return;
  document.getElementById('main-view').style.display    = 'none';
  document.getElementById('section-view').style.display = 'block';
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`section-panel-${n}`);
  if (panel) panel.classList.add('active');
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

// =============================================
//  REWARDS
// =============================================
function markSectionComplete(n) {
  const cfg = window.SURAH_CONFIG;
  const r   = cfg && cfg.rewards[n]; if (!r) return;
  const icon  = document.getElementById('reward-icon');
  const title = document.getElementById('reward-title');
  const xpEl  = document.getElementById('reward-xp');
  const gems  = document.getElementById('reward-gems');
  const msg   = document.getElementById('reward-msg');
  if (icon)  icon.textContent  = r.icon;
  if (title) title.textContent = r.title;
  if (xpEl)  xpEl.textContent  = `+${r.xp} XP`;
  if (gems)  gems.textContent  = `+${r.gems} 💎`;
  if (msg)   msg.textContent   = r.msg;
  const overlay = document.getElementById('reward-overlay');
  if (overlay) overlay.classList.add('visible');
}
function completeSection(n) {
  if (!window.state || window.state.completed.includes(n)) return;
  const cfg = window.SURAH_CONFIG;
  const r   = cfg && cfg.rewards[n];
  if (r) { window.state.xp += r.xp; window.state.gems += r.gems; }
  window.state.completed.push(n);
  saveProgress();
  markSectionComplete(n);
  updateUI();
}
function dismissReward()  { const o = document.getElementById('reward-overlay'); if (o) o.classList.remove('visible'); }
function closeReward()    { dismissReward(); }

// =============================================
//  GAME START & RESET
// =============================================
function startGame() {
  const input = document.getElementById('explorer-name') || document.getElementById('name-input');
  const name  = input ? input.value.trim() : '';
  const errEl = document.getElementById('name-error');
  if (!name) { if (errEl) errEl.textContent = 'Please enter your name!'; return; }
  if (errEl) errEl.textContent = '';
  window.state.explorerName = name;
  saveProgress();
  document.getElementById('intro-screen').style.display = 'none';
  const header = document.getElementById('game-header');
  if (header) header.style.display = 'flex';
  document.getElementById('main-view').style.display = 'block';
  updateUI();
  if (typeof initScenes === 'function') initScenes();
  _renderAllSections();
}
function resetGame() {
  if (!confirm(`Reset ALL progress for this Surah and start over?`)) return;
  localStorage.removeItem(window.STORAGE_KEY);
  location.reload();
}

function _renderAllSections() {
  const cfg = window.SURAH_CONFIG;
  if (!cfg) return;
  for (let n = 1; n <= cfg.totalLevels; n++) {
    const fn = window[`renderSection${n}Game`];
    if (typeof fn === 'function') fn();
  }
}

// =============================================
//  BOOTSTRAP ON DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const savedTheme = getTheme();
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === savedTheme);
  });
  _applyNamePlaceholder(savedTheme);

  // Load saved progress
  loadProgress();

  if (window.state && window.state.explorerName) {
    const introEl  = document.getElementById('intro-screen');
    const headerEl = document.getElementById('game-header');
    const mainEl   = document.getElementById('main-view');
    if (introEl)  introEl.style.display  = 'none';
    if (headerEl) headerEl.style.display = 'flex';
    if (mainEl)   mainEl.style.display   = 'block';
    updateUI();
    if (typeof initScenes === 'function') initScenes();
    _renderAllSections();
  }
});
