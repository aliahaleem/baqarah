'use strict';
/* ═══════════════════════════════════════════════════════════════════
   SHARED SCENE BASE — baqarah/shared/scene-base.js
   ───────────────────────────────────────────────────────────────────
   Centralises utilities duplicated across 27+ surah scenes.js files:
     • CW / CH / P constants
     • sceneP()  — theme-aware palette (configurable per surah)
     • fillRect() — pixel-art rounded rect helper
     • BaseScene  — canvas scene class with click zones, animation loop
     • showVersePopup / hideVersePopup
   ═══════════════════════════════════════════════════════════════════ */

const CW = 560, CH = 220, P = 4;

/* ── Theme palette ─────────────────────────────────────────────────
   Each surah sets window.SCENE_PALETTE = { minecraft:{...}, stars:{...} }
   before loading this file (or after — sceneP reads it at draw time).
   Falls back to a sensible default if not set.                       */

const _DEFAULT_PALETTE = {
  minecraft: {
    sky0:'#0e0528', sky1:'#150830', sky2:'#301840',
    gnd:'#3a2808', gndAcc:'#5a4010',
    starStr:'rgba(255,240,200,', acStr:'rgba(255,170,0,',
    label:'#ffaa00',
  },
  stars: {
    sky0:'#2c2668', sky1:'#3a3282', sky2:'#483e9a',
    gnd:'#5648a8', gndAcc:'#6858b8',
    starStr:'rgba(200,185,255,', acStr:'rgba(232,184,64,',
    label:'#e8b840',
  },
};

function sceneP() {
  const isStars = document.documentElement.dataset.theme === 'stars';
  const custom = window.SCENE_PALETTE || _DEFAULT_PALETTE;
  return isStars ? (custom.stars || _DEFAULT_PALETTE.stars)
                 : (custom.minecraft || _DEFAULT_PALETTE.minecraft);
}

/* ── Pixel-art fillRect with optional rounded corners ────────────── */

function fillRect(ctx, x, y, w, h, col) {
  if (col) ctx.fillStyle = col;
  const rx = Math.round(x), ry = Math.round(y), rw = Math.round(w), rh = Math.round(h);
  if (document.documentElement.dataset.theme === 'stars' && rw < 120 && rh < 120 && rw > 4 && rh > 4) {
    const r = Math.min(rw * 0.3, rh * 0.3, 7);
    ctx.shadowColor = 'rgba(100,80,200,0.2)';
    ctx.shadowBlur  = 3;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(rx, ry, rw, rh, r); else ctx.rect(rx, ry, rw, rh);
    ctx.fill();
    ctx.shadowBlur = 0;
  } else {
    ctx.fillRect(rx, ry, rw, rh);
  }
}

/* showVersePopup / hideVersePopup → shared/engine.js (single source of truth) */

/* ── BaseScene — reusable canvas animation with click zones ─────── */

class BaseScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = CW; this.canvas.height = CH;
    this.t = 0; this.running = false; this.clickZones = [];
    this._bindClick();
  }
  _bindClick() {
    if (!this.canvas) return;
    this.canvas.style.cursor = 'pointer';
    this.canvas.addEventListener('click', e => {
      const r = this.canvas.getBoundingClientRect();
      const cx = (e.clientX - r.left) * (CW / r.width);
      const cy = (e.clientY - r.top)  * (CH / r.height);
      for (const z of this.clickZones) {
        if (cx >= z.x && cx <= z.x + z.w && cy >= z.y && cy <= z.y + z.h) {
          showVersePopup(VERSES[z.key]); return;
        }
      }
    });
  }
  start() {
    if (this.running || !this.canvas) return;
    this.running = true; this._loop();
  }
  stop() { this.running = false; }
  _loop() {
    if (!this.running) return;
    this.draw(); this.t++;
    requestAnimationFrame(() => this._loop());
  }
  draw() {}
  _star(ctx, x, y, r, bright) {
    ctx.fillStyle = sceneP().starStr + bright + ')';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }
  _pixelFigure(ctx, x, y, bodyCol, headCol) {
    fillRect(ctx, x, y,    P*3, P*3, headCol  || '#f5d8b0');
    fillRect(ctx, x-P, y+P*3, P*5, P*4, bodyCol || '#5a20a0');
    fillRect(ctx, x,   y+P*7, P*2, P*3, '#333');
    fillRect(ctx, x+P*2, y+P*7, P*2, P*3, '#333');
  }
  _pixelAngel(ctx, x, y, col) {
    fillRect(ctx, x+P, y,     P*2, P*2, '#fff8e0');
    fillRect(ctx, x,   y+P*2, P*4, P*3, col || '#ddd8ff');
    fillRect(ctx, x-P*3, y+P,  P*3, P*2, '#fff8e0');
    fillRect(ctx, x+P*4, y+P,  P*3, P*2, '#fff8e0');
  }
}
