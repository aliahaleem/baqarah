/* scenes.js — Surah Al-Ghashiyah (88) */
'use strict';

const VERSES = [
  { ar: 'هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ', en: 'Has there reached you the report of the Overwhelming Event?' },
  { ar: 'وُجُوهٌ يَوْمَئِذٍ خَاشِعَةٌ', en: 'On that Day, faces will be downcast.' },
  { ar: 'وُجُوهٌ يَوْمَئِذٍ نَّاعِمَةٌ', en: 'And other faces that Day will be in delight.' },
  { ar: 'فَلَا يُؤْمِنُونَ بِاللَّهِ الْعَظِيمِ', en: 'And they do not believe in Allah, the Most Great.' },
  { ar: 'أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ', en: 'Do they not look at the camels — how they were created?' },
  { ar: 'إِنَّ إِلَيْنَا إِيَابَهُمْ', en: 'Indeed, to Us is their return.' }
];

function sceneP() {
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  return st
    ? { sky:'#3d1a28', ground:'#5a2e40', acc:'#f0c040', acc2:'#e080a0', acStr:'#f8e8b0' }
    : { sky:'#1a0810', ground:'#2e1020', acc:'#c88020', acc2:'#8b2040', acStr:'#f0d080' };
}

function fillRect(ctx, x, y, w, h, col, isChar) {
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  ctx.fillStyle = col;
  if (st && isChar && w >= 4 && h >= 6) {
    const r = Math.min(w, h) * 0.3;
    ctx.save();
    ctx.shadowColor = 'rgba(240,192,64,0.4)';
    ctx.shadowBlur = 8;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); }
    else { ctx.fillRect(x, y, w, h); }
    ctx.restore();
  } else {
    ctx.fillRect(x, y, w, h);
  }
}

class Scene1 {
  constructor(canvas) { this.c = canvas; this.t = 0; }
  draw() {
    const ctx = this.c.getContext('2d'), W = this.c.width, H = this.c.height, p = sceneP();
    this.t++;
    ctx.fillStyle = p.sky; ctx.fillRect(0, 0, W, H);
    // dramatic sky clouds
    for (let i = 0; i < 5; i++) {
      const x = ((i * 80 + this.t * 0.3) % (W + 60)) - 30;
      ctx.fillStyle = `rgba(200,80,100,${0.15 + i * 0.04})`;
      ctx.beginPath(); ctx.ellipse(x, 30 + i * 12, 40, 15, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = p.ground; ctx.fillRect(0, H * 0.65, W, H * 0.35);
    // text "AL-GHASHIYAH"
    ctx.fillStyle = p.acc; ctx.font = 'bold 10px serif';
    ctx.fillText('THE OVERWHELMING', W / 2 - 55, H * 0.5);
    // 2 figures bowing
    for (let i = 0; i < 2; i++) {
      const bx = W * 0.3 + i * 60;
      fillRect(ctx, bx, H * 0.62 - 16, 10, 16, p.acc2, true);
      fillRect(ctx, bx - 4, H * 0.62 - 22, 18, 8, p.acc2, true);
    }
    // verse overlay
    ctx.fillStyle = p.acStr; ctx.font = '7px serif';
    ctx.fillText(VERSES[0].en, 8, H - 10);
  }
}

class Scene2 {
  constructor(canvas) { this.c = canvas; this.t = 0; }
  draw() {
    const ctx = this.c.getContext('2d'), W = this.c.width, H = this.c.height, p = sceneP();
    this.t++;
    ctx.fillStyle = p.sky; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = p.ground; ctx.fillRect(0, H * 0.65, W, H * 0.35);
    // face downcast figure
    fillRect(ctx, W * 0.4, H * 0.45, 12, 20, p.acc2, true);
    fillRect(ctx, W * 0.4 - 2, H * 0.38, 16, 10, p.acc2, true);
    // downward arrows
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = p.acc;
      ctx.fillText('▼', W * 0.3 + i * 20, H * 0.3 + Math.sin(this.t / 15 + i) * 3);
    }
    ctx.fillStyle = p.acStr; ctx.font = '7px serif';
    ctx.fillText(VERSES[1].en, 8, H - 10);
  }
}

class Scene3 {
  constructor(canvas) { this.c = canvas; this.t = 0; }
  draw() {
    const ctx = this.c.getContext('2d'), W = this.c.width, H = this.c.height, p = sceneP();
    this.t++;
    ctx.fillStyle = '#ffd080'; ctx.fillRect(0, 0, W, H);
    // joyful garden
    ctx.fillStyle = '#80e080'; ctx.fillRect(0, H * 0.7, W, H * 0.3);
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = '#40b040';
      ctx.fillRect(W * 0.1 + i * 30, H * 0.5 - 20, 8, 30);
      ctx.fillStyle = '#60d060';
      ctx.beginPath(); ctx.arc(W * 0.14 + i * 30, H * 0.5 - 22, 12, 0, Math.PI * 2); ctx.fill();
    }
    fillRect(ctx, W * 0.45, H * 0.55, 12, 20, '#8040a0', true);
    fillRect(ctx, W * 0.43, H * 0.48, 16, 10, '#8040a0', true);
    ctx.fillStyle = '#4a1040'; ctx.font = '7px serif';
    ctx.fillText(VERSES[2].en, 8, H - 10);
  }
}

class Scene4 {
  constructor(canvas) { this.c = canvas; this.t = 0; }
  draw() {
    const ctx = this.c.getContext('2d'), W = this.c.width, H = this.c.height, p = sceneP();
    this.t++;
    ctx.fillStyle = p.sky; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = p.ground; ctx.fillRect(0, H * 0.65, W, H * 0.35);
    // idol-like shapes
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = '#888';
      ctx.fillRect(W * 0.2 + i * 40, H * 0.35, 20, 35);
      ctx.fillRect(W * 0.22 + i * 40, H * 0.28, 16, 14);
    }
    // X marks
    ctx.strokeStyle = p.acc; ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const cx = W * 0.3 + i * 40, cy = H * 0.38;
      ctx.beginPath(); ctx.moveTo(cx - 8, cy - 8); ctx.lineTo(cx + 8, cy + 8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 8, cy - 8); ctx.lineTo(cx - 8, cy + 8); ctx.stroke();
    }
    ctx.fillStyle = p.acStr; ctx.font = '7px serif';
    ctx.fillText(VERSES[3].en, 8, H - 10);
  }
}

class Scene5 {
  constructor(canvas) { this.c = canvas; this.t = 0; }
  draw() {
    const ctx = this.c.getContext('2d'), W = this.c.width, H = this.c.height, p = sceneP();
    this.t++;
    // desert scene
    ctx.fillStyle = '#d4a040'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#c8922e'; ctx.fillRect(0, H * 0.55, W, H * 0.45);
    // camel
    const cx = (W * 0.2 + this.t * 0.4) % (W + 40) - 20;
    ctx.fillStyle = '#c87828';
    ctx.fillRect(cx, H * 0.38, 40, 22); // body
    ctx.fillRect(cx + 30, H * 0.28, 12, 15); // neck
    ctx.fillRect(cx + 30, H * 0.24, 16, 10); // head
    ctx.fillRect(cx + 26, H * 0.38, 6, 16); // hump
    for (let i = 0; i < 4; i++) ctx.fillRect(cx + 4 + i * 10, H * 0.58, 6, 12); // legs
    ctx.fillStyle = '#4a1040'; ctx.font = '7px serif';
    ctx.fillText(VERSES[4].en, 8, H - 10);
  }
}

class Scene6 {
  constructor(canvas) { this.c = canvas; this.t = 0; }
  draw() {
    const ctx = this.c.getContext('2d'), W = this.c.width, H = this.c.height, p = sceneP();
    this.t++;
    ctx.fillStyle = p.sky; ctx.fillRect(0, 0, W, H);
    // returning arrows upward
    for (let i = 0; i < 4; i++) {
      const y = H * 0.6 - ((this.t * 0.8 + i * 40) % H);
      ctx.fillStyle = p.acc;
      ctx.font = '14px serif';
      ctx.fillText('↑', W * 0.25 + i * 25, y);
    }
    ctx.fillStyle = p.ground; ctx.fillRect(0, H * 0.65, W, H * 0.35);
    fillRect(ctx, W * 0.45, H * 0.5, 12, 20, p.acc2, true);
    fillRect(ctx, W * 0.43, H * 0.43, 16, 10, p.acc2, true);
    ctx.fillStyle = p.acStr; ctx.font = '7px serif';
    ctx.fillText(VERSES[5].en, 8, H - 10);
  }
}

window.SceneClasses = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];
