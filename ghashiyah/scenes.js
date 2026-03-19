'use strict';
/* scenes.js — Surah Al-Ghashiyah (88) — The Overwhelming */
const CW = 560, CH = 220, P = 4;

function sceneP() {
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  return st
    ? { sky0:'#3a1848', sky1:'#4a2060', sky2:'#5a2870', gnd:'#6a3480', gndAcc:'#8040a0',
        starStr:'rgba(255,200,240,', acStr:'rgba(255,220,248,', label:'#ffe0f8', hint:'#e0a0d0',
        fireR:'rgba(255,100,80,', fireY:'rgba(255,220,80,' }
    : { sky0:'#1c0820', sky1:'#2a1030', sky2:'#380c28', gnd:'#3c1428', gndAcc:'#501830',
        starStr:'rgba(255,120,160,', acStr:'rgba(255,200,200,', label:'#ffd8e8', hint:'#d08090',
        fireR:'rgba(255,80,40,', fireY:'rgba(255,180,40,' };
}

function fillRect(ctx, x, y, w, h, col) {
  if (col) ctx.fillStyle = col;
  const rx = Math.round(x), ry = Math.round(y), rw = Math.round(w), rh = Math.round(h);
  if (document.documentElement.getAttribute('data-theme') === 'stars' && rw < 120 && rh < 120 && rw > 4 && rh > 4) {
    const r = Math.min(rw * 0.3, rh * 0.3, 7);
    ctx.shadowColor = 'rgba(200,100,220,0.25)'; ctx.shadowBlur = 4;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(rx, ry, rw, rh, r); else ctx.rect(rx, ry, rw, rh);
    ctx.fill(); ctx.shadowBlur = 0;
  } else { ctx.fillRect(rx, ry, rw, rh); }
}

function _sky(ctx) {
  const p = sceneP();
  const g = ctx.createLinearGradient(0, 0, 0, CH);
  g.addColorStop(0, p.sky0); g.addColorStop(0.6, p.sky1); g.addColorStop(1, p.sky2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, CW, CH);
}
function _ground(ctx, y = 170) {
  const p = sceneP();
  fillRect(ctx, 0, y, CW, CH - y, p.gnd);
  fillRect(ctx, 0, y, CW, 4, p.gndAcc);
}
function _label(ctx, txt, y = 18) {
  ctx.fillStyle = sceneP().label;
  ctx.font = '6px "Press Start 2P",monospace';
  ctx.textAlign = 'center'; ctx.fillText(txt, CW / 2, y); ctx.textAlign = 'left';
}
function _stars(ctx, t) {
  const p = sceneP();
  [[40,15],[90,8],[160,22],[220,5],[300,18],[380,10],[440,25],[510,8],[70,45],[200,38],[330,42],[460,35]].forEach(([x,y],i) => {
    const twinkle = 0.4 + Math.sin((t || 0) * 0.05 + i) * 0.3;
    ctx.fillStyle = p.starStr + twinkle + ')';
    ctx.beginPath(); ctx.arc(x, y, i % 3 === 0 ? 1.5 : 1, 0, Math.PI * 2); ctx.fill();
  });
}
function _fig(ctx, x, y, hc, bc, pc) {
  fillRect(ctx, x + P, y, P * 3, P * 3, hc);
  fillRect(ctx, x, y + P * 3, P * 5, P * 4, bc);
  fillRect(ctx, x - P, y + P * 3, P, P * 3, hc);
  fillRect(ctx, x + P * 5, y + P * 3, P, P * 3, hc);
  fillRect(ctx, x, y + P * 7, P * 2, P * 4, pc);
  fillRect(ctx, x + P * 3, y + P * 7, P * 2, P * 4, pc);
}

const VD = {
  ghashiyah: {
    ref: 'Al-Ghashiyah 88:1-3',
    arabic: 'هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ ۩ وُجُوهٌ يَوْمَئِذٍ خَاشِعَةٌ ۩ عَامِلَةٌ نَّاصِبَةٌ',
    english: '"Has there reached you the report of the Overwhelming Event? On that Day, faces will be downcast — laboring and exhausted." (88:1-3)',
    note: '"Al-Ghashiyah" means something that overwhelms and covers — like a flood covering all. The Day of Judgement will overwhelm every previous human experience. Two groups follow: those who suffer and those who rejoice.',
  },
  downcast: {
    ref: 'Al-Ghashiyah 88:4-7',
    arabic: 'تَصْلَىٰ نَارًا حَامِيَةً ۩ تُسْقَىٰ مِنْ عَيْنٍ آنِيَةٍ ۩ لَّيْسَ لَهُمْ طَعَامٌ إِلَّا مِن ضَرِيعٍ',
    english: '"They will enter a scorching fire — given to drink from a boiling spring — no food for them except bitter thorns." (88:4-7)',
    note: '"Amilah nasibah" — laboring and exhausted. They toiled in this world without faith, so their deeds availed them nothing. May Allah protect us from this fate.',
  },
  paradise: {
    ref: 'Al-Ghashiyah 88:8-11',
    arabic: 'وُجُوهٌ يَوْمَئِذٍ نَّاعِمَةٌ ۩ لِّسَعْيِهَا رَاضِيَةٌ ۩ فِي جَنَّةٍ عَالِيَةٍ ۩ لَّا تَسْمَعُ فِيهَا لَاغِيَةً',
    english: '"And other faces that Day will be in delight — satisfied with their effort — in a high garden — hearing no vain talk within it." (88:8-11)',
    note: '"Na\'imah" — soft, radiant, glowing with comfort. They strove in worship and are now satisfied. "Jannatin aliyah" — a HIGH garden. Peace and dignity only. No noise or nonsense of this world.',
  },
  camel: {
    ref: 'Al-Ghashiyah 88:17-18',
    arabic: 'أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ ۩ وَإِلَى السَّمَاءِ كَيْفَ رُفِعَتْ',
    english: '"Do they not look at the camels — how they were created? And at the sky — how it was raised?" (88:17-18)',
    note: 'The camel: triple-eyelids for sandstorms, padded feet for sand, stores water in blood, can carry huge loads. Every feature points to a perfect Designer. The "ship of the desert" as a gateway to recognising the Creator.',
  },
  mountains: {
    ref: 'Al-Ghashiyah 88:19-20',
    arabic: 'وَإِلَى الْجِبَالِ كَيْفَ نُصِبَتْ ۩ وَإِلَى الْأَرْضِ كَيْفَ سُطِحَتْ',
    english: '"And at the mountains — how they were set? And at the earth — how it was spread out?" (88:19-20)',
    note: 'Mountains are stabilisers of the earth\'s crust — pegs driven in (awatad). The earth is spread accessible for human habitation. Four signs: camel, sky, mountains, earth — all point to Allah.',
  },
  return: {
    ref: 'Al-Ghashiyah 88:25-26',
    arabic: 'إِنَّ إِلَيْنَا إِيَابَهُمْ ۩ ثُمَّ إِنَّ عَلَيْنَا حِسَابَهُمْ',
    english: '"Indeed to Us is their return — then indeed upon Us is their reckoning." (88:25-26)',
    note: 'Two "Inna" — two emphatic certainties. The return is certain. The reckoning is certain. No one escapes either. The Prophet\'s ﷺ role: to remind, not to force. Every soul will stand before Allah.',
  },
};

/* ── Base Scene Class ── */
class BS {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.raf = null; this.t = 0;
  }
  stop() { if (this.raf) { cancelAnimationFrame(this.raf); this.raf = null; } }
}

/* ── Scene 1: The Overwhelming — Two Groups ── */
class S1 extends BS {
  constructor() { super('canvas-1'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VD.ghashiyah);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      _sky(ctx); _stars(ctx, this.t); _ground(ctx, 170);
      _label(ctx, 'CLICK: The Overwhelming Event — 88:1');
      // Dramatic sky sweep
      const sweep = Math.sin(this.t * 0.02) * 0.08 + 0.12;
      ctx.fillStyle = `rgba(180,40,80,${sweep})`;
      ctx.beginPath(); ctx.ellipse(CW * 0.5, 30, 180, 40, 0, 0, Math.PI * 2); ctx.fill();
      // Two groups: left (downcast), right (radiant)
      // Left: downcast figure
      _fig(ctx, 120, 120, '#c09060', '#6a1828', '#4a0c18');
      ctx.fillStyle = p.hint; ctx.font = '5px "Press Start 2P",monospace';
      ctx.textAlign = 'center'; ctx.fillText('DOWNCAST ▼', 136, 175); ctx.textAlign = 'left';
      // Right: radiant figure
      _fig(ctx, 380, 115, '#e8c890', '#204870', '#102848');
      ctx.fillStyle = p.label; ctx.font = '5px "Press Start 2P",monospace';
      ctx.textAlign = 'center'; ctx.fillText('RADIANT ✦', 396, 175); ctx.textAlign = 'left';
      // Dividing line
      ctx.strokeStyle = `rgba(255,200,200,0.3)`; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(CW / 2, 50); ctx.lineTo(CW / 2, 165); ctx.stroke();
      ctx.setLineDash([]);
      _label(ctx, '"THE OVERWHELMING" — Two fates await — 88:1', CH - 8);
    };
    draw();
  }
}

/* ── Scene 2: Faces Downcast in Hellfire ── */
class S2 extends BS {
  constructor() { super('canvas-2'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VD.downcast);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      // Dark sky
      _sky(ctx);
      // Fire glow at bottom
      const flicker = 0.6 + Math.sin(this.t * 0.15) * 0.2;
      ctx.fillStyle = p.fireR + flicker + ')';
      ctx.fillRect(0, CH * 0.65, CW, CH * 0.35);
      // Fire flames
      for (let i = 0; i < 8; i++) {
        const fx = 30 + i * 65, fh = 30 + Math.sin(this.t * 0.12 + i) * 15;
        ctx.fillStyle = p.fireY + (0.7 + Math.sin(this.t * 0.1 + i) * 0.2) + ')';
        ctx.beginPath(); ctx.moveTo(fx, CH * 0.65);
        ctx.quadraticCurveTo(fx - 10, CH * 0.65 - fh * 0.5, fx, CH * 0.65 - fh);
        ctx.quadraticCurveTo(fx + 10, CH * 0.65 - fh * 0.5, fx + 15, CH * 0.65); ctx.fill();
      }
      // Downcast figures
      for (let i = 0; i < 3; i++) {
        const fx = 140 + i * 100;
        _fig(ctx, fx, 115 + Math.sin(this.t * 0.05 + i) * 2, '#b08060', '#701828', '#501020');
      }
      _label(ctx, 'CLICK: Faces Downcast — 88:2-7');
      ctx.fillStyle = '#ff9090'; ctx.font = '5px "Press Start 2P",monospace';
      ctx.textAlign = 'center';
      ctx.fillText('"Scorching fire — boiling drink — bitter thorns"', CW / 2, CH - 8);
      ctx.textAlign = 'left';
    };
    draw();
  }
}

/* ── Scene 3: Paradise — Faces in Delight ── */
class S3 extends BS {
  constructor() { super('canvas-3'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VD.paradise);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx;
      // Bright paradise sky
      const g = ctx.createLinearGradient(0, 0, 0, CH);
      g.addColorStop(0, '#e8c8f8'); g.addColorStop(0.6, '#f0d8ff'); g.addColorStop(1, '#c8e8c0');
      ctx.fillStyle = g; ctx.fillRect(0, 0, CW, CH);
      // Lush ground
      ctx.fillStyle = '#80c870'; ctx.fillRect(0, CH * 0.68, CW, CH * 0.32);
      ctx.fillStyle = '#60b050'; ctx.fillRect(0, CH * 0.68, CW, 5);
      // Garden trees
      for (let i = 0; i < 6; i++) {
        const tx = 40 + i * 80, ty = CH * 0.45;
        ctx.fillStyle = '#3a8a30'; ctx.fillRect(tx - 3, ty, 6, 35);
        ctx.fillStyle = '#60c050';
        ctx.beginPath(); ctx.arc(tx, ty - 2, 16 + Math.sin(this.t * 0.04 + i) * 2, 0, Math.PI * 2); ctx.fill();
      }
      // Flowing spring
      for (let i = 0; i < 5; i++) {
        const sx = 200 + i * 30, sy = CH * 0.6 + Math.sin(this.t * 0.08 + i) * 4;
        ctx.fillStyle = `rgba(80,160,220,${0.5 + i * 0.06})`;
        ctx.beginPath(); ctx.ellipse(sx, sy, 12, 5, 0, 0, Math.PI * 2); ctx.fill();
      }
      // Radiant figures
      _fig(ctx, 250, 105 + Math.sin(this.t * 0.04) * 2, '#f0d090', '#2a5090', '#1a3070');
      _fig(ctx, 300, 105 + Math.sin(this.t * 0.04 + 1) * 2, '#e8c880', '#285098', '#183068');
      // Stars/sparkles above figures
      ['✦','✦','✦'].forEach((s, i) => {
        ctx.fillStyle = `rgba(220,180,255,${0.5 + Math.sin(this.t * 0.06 + i) * 0.3})`;
        ctx.font = '12px serif'; ctx.textAlign = 'center';
        ctx.fillText(s, 240 + i * 35, 95 + Math.sin(this.t * 0.05 + i) * 4);
      });
      ctx.textAlign = 'left';
      ctx.fillStyle = '#2a4020'; ctx.font = '6px "Press Start 2P",monospace';
      _label(ctx, 'CLICK: Faces Radiant in Paradise — 88:8-16');
      ctx.textAlign = 'center'; ctx.fillStyle = '#304820';
      ctx.fillText('"Satisfied with their effort — in a HIGH garden"', CW / 2, CH - 8);
      ctx.textAlign = 'left';
    };
    draw();
  }
}

/* ── Scene 4: The Camel ── */
class S4 extends BS {
  constructor() { super('canvas-4'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VD.camel);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      // Desert sky
      const g = ctx.createLinearGradient(0, 0, 0, CH);
      g.addColorStop(0, '#e8c060'); g.addColorStop(0.5, '#d4a840'); g.addColorStop(1, '#c89030');
      ctx.fillStyle = g; ctx.fillRect(0, 0, CW, CH);
      // Desert sand
      ctx.fillStyle = '#c8922e'; ctx.fillRect(0, CH * 0.6, CW, CH * 0.4);
      ctx.fillStyle = '#e0a840'; ctx.fillRect(0, CH * 0.6, CW, 5);
      // Sun
      const pulse = 0.8 + Math.sin(this.t * 0.04) * 0.1;
      ctx.fillStyle = `rgba(255,240,100,${pulse})`;
      ctx.beginPath(); ctx.arc(CW * 0.85, 35, 22, 0, Math.PI * 2); ctx.fill();
      // Moving camel
      const cx = ((this.t * 0.5 + 80) % (CW + 80)) - 60;
      ctx.fillStyle = '#b87828';
      // Body
      fillRect(ctx, cx, CH * 0.38, 55, 28, '#b87828');
      // Hump
      ctx.beginPath();
      ctx.arc(cx + 30, CH * 0.38, 12, Math.PI, 0); ctx.fill();
      // Neck + head
      fillRect(ctx, cx + 40, CH * 0.3, 10, 22, '#b87828');
      fillRect(ctx, cx + 36, CH * 0.25, 18, 12, '#b87828');
      // Eye
      ctx.fillStyle = '#2a1408'; ctx.beginPath(); ctx.arc(cx + 52, CH * 0.27, 2, 0, Math.PI * 2); ctx.fill();
      // Legs
      for (let i = 0; i < 4; i++) fillRect(ctx, cx + 6 + i * 12, CH * 0.64, 7, 18, '#a06820');
      // Sand puff
      if (this.t % 6 === 0) {
        ctx.fillStyle = 'rgba(200,150,40,0.3)';
        ctx.beginPath(); ctx.ellipse(cx, CH * 0.68, 15, 6, 0, 0, Math.PI * 2); ctx.fill();
      }
      _label(ctx, 'CLICK: The Amazing Camel — 88:17');
      ctx.fillStyle = '#2a1408'; ctx.font = '5px "Press Start 2P",monospace';
      ctx.textAlign = 'center';
      ctx.fillText('"Do they not LOOK at the camel — how it was CREATED?" (88:17)', CW / 2, CH - 8);
      ctx.textAlign = 'left';
    };
    draw();
  }
}

/* ── Scene 5: Sky, Mountains, Earth ── */
class S5 extends BS {
  constructor() { super('canvas-5'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VD.mountains);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      _sky(ctx); _stars(ctx, this.t);
      // Sky gradient (raised sky)
      ctx.fillStyle = `rgba(80,120,200,${0.15 + Math.sin(this.t * 0.02) * 0.05})`;
      ctx.fillRect(0, 0, CW, 90);
      // Mountains
      const mc = [[0, CH * 0.7, 120, CH * 0.25], [80, CH * 0.7, 160, CH * 0.2], [200, CH * 0.7, 130, CH * 0.3], [290, CH * 0.7, 180, CH * 0.22], [420, CH * 0.7, 140, CH * 0.28]];
      mc.forEach(([mx, my, mw, mh], i) => {
        const col = i % 2 === 0 ? '#6a3860' : '#4a2848';
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + mw / 2, my - mh); ctx.lineTo(mx + mw, my); ctx.fill();
        // Snow caps
        ctx.fillStyle = 'rgba(255,240,250,0.4)';
        ctx.beginPath(); ctx.moveTo(mx + mw / 2, my - mh); ctx.lineTo(mx + mw / 2 - 12, my - mh + 20); ctx.lineTo(mx + mw / 2 + 12, my - mh + 20); ctx.fill();
      });
      // Ground
      _ground(ctx, CH * 0.7);
      // Labels for the 4 signs
      const signs = [['🐪', 'CAMEL', 60], ['🌌', 'SKY', 195], ['⛰️', 'MOUNTAINS', 330], ['🌍', 'EARTH', 465]];
      signs.forEach(([em, lbl, sx]) => {
        ctx.font = '16px serif'; ctx.textAlign = 'center'; ctx.fillText(em, sx, 55);
        ctx.fillStyle = p.label; ctx.font = '5px "Press Start 2P",monospace';
        ctx.fillText(lbl, sx, 68);
      });
      ctx.textAlign = 'left';
      _label(ctx, 'CLICK: 4 Signs of Allah — 88:17-20');
      ctx.fillStyle = p.label; ctx.font = '5px "Press Start 2P",monospace';
      ctx.textAlign = 'center';
      ctx.fillText('"Look! — All point to the Creator" (88:17-20)', CW / 2, CH - 8);
      ctx.textAlign = 'left';
    };
    draw();
  }
}

/* ── Scene 6: The Return to Allah ── */
class S6 extends BS {
  constructor() { super('canvas-6'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VD.return);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      _sky(ctx); _stars(ctx, this.t); _ground(ctx, 175);
      _label(ctx, 'CLICK: To Allah is the Return — 88:25-26');
      // Figures walking / being drawn upward
      for (let i = 0; i < 4; i++) {
        const fx = 90 + i * 110;
        const fy = 115 - ((this.t * 0.3 + i * 25) % 100);
        _fig(ctx, fx, fy, '#e0c090', '#2a4868', '#182838');
      }
      // Rising arrows
      for (let i = 0; i < 6; i++) {
        const ay = ((this.t * 1.2 + i * 35) % (CH * 1.1)) - 20;
        const pulse = 0.4 + Math.sin(this.t * 0.07 + i) * 0.3;
        ctx.fillStyle = `rgba(255,220,120,${pulse})`;
        ctx.font = '18px serif'; ctx.textAlign = 'center';
        ctx.fillText('↑', 50 + i * 90, CH * 0.7 - ay);
      }
      ctx.textAlign = 'left';
      // Divine glow at top
      const glow = 0.15 + Math.sin(this.t * 0.03) * 0.08;
      const gr = ctx.createRadialGradient(CW / 2, 0, 0, CW / 2, 0, 80);
      gr.addColorStop(0, `rgba(255,230,150,${glow * 2})`);
      gr.addColorStop(1, 'transparent');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, CW, 80);
      // Verse text
      ctx.fillStyle = p.label; ctx.font = '7px serif';
      ctx.textAlign = 'center';
      ctx.fillText('إِنَّ إِلَيْنَا إِيَابَهُمْ', CW / 2, CH - 18);
      ctx.font = '5px "Press Start 2P",monospace';
      ctx.fillText('"Indeed to US is their RETURN" (88:25)', CW / 2, CH - 7);
      ctx.textAlign = 'left';
    };
    draw();
  }
}

/* ── Scene Lifecycle ── */
const scenes = {};
function initScenes() {
  scenes[1] = new S1(); scenes[2] = new S2(); scenes[3] = new S3();
  scenes[4] = new S4(); scenes[5] = new S5(); scenes[6] = new S6();
}
function startScene(n) { if (scenes[n]) scenes[n].start(); }
function stopAllScenes() { Object.values(scenes).forEach(s => s.stop()); }
