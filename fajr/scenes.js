'use strict';
/* ── Al-Fajr scenes ── */

const VERSES_FAJR = {
  1: { ref:'89:1-5', ar:'وَالْفَجْرِ ۩ وَلَيَالٍ عَشْرٍ ۩ وَالشَّفْعِ وَالْوَتْرِ', en:'"By the dawn — and the ten nights — and the even and the odd." (89:1-3) — Allah swears by four cosmic signs to emphasise the gravity of what follows.', note:'The "ten nights" are the first ten nights of Dhul-Hijjah — the most virtuous days of the year.' },
  2: { ref:'89:6-10', ar:'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِعَادٍ ۩ إِرَمَ ذَاتِ الْعِمَادِ', en:'"Have you not seen how your Lord dealt with \'Aad — of Iram, with lofty pillars?" (89:6-7) — The towering nation of \'Aad, who built the great city of Iram, were utterly destroyed.', note:'\'Aad were a powerful nation of Arabia who rejected Prophet Hud (AS) and were destroyed by a violent windstorm.' },
  3: { ref:'89:11-14', ar:'الَّذِينَ طَغَوْا فِي الْبِلَادِ ۩ فَأَكْثَرُوا فِيهَا الْفَسَادَ ۩ فَصَبَّ عَلَيْهِمْ رَبُّكَ سَوْطَ عَذَابٍ', en:'"Those who transgressed in the lands and spread much corruption — so your Lord poured upon them a whip of punishment." (89:11-13) — Transgression brings divine consequence.', note:'The Arabic "sawt al-adhab" — whip of punishment — is a vivid image of swift, certain punishment.' },
  4: { ref:'89:15-16', ar:'فَأَمَّا الْإِنسَانُ إِذَا مَا ابْتَلَاهُ رَبُّهُ فَأَكْرَمَهُ وَنَعَّمَهُ فَيَقُولُ رَبِّي أَكْرَمَنِ', en:'"As for man — when his Lord tests him and honours him with wealth, he says: My Lord has honoured me! But when He tests him with hardship, he says: My Lord has humiliated me!" (89:15-16) — Both are tests.', note:'The tragedy: man thinks wealth = honour and poverty = humiliation. In reality BOTH are tests from Allah.' },
  5: { ref:'89:21-23', ar:'كَلَّا إِذَا دُكَّتِ الْأَرْضُ دَكًّا دَكًّا ۩ وَجَاءَ رَبُّكَ وَالْمَلَكُ صَفًّا صَفًّا', en:'"No! When the earth is levelled to the ground completely, and your Lord comes — and the angels, rank upon rank." (89:21-22) — The Day when everything changes.', note:'On that Day, Jahannam is brought forth and man will finally understand — but too late.' },
  6: { ref:'89:27-30', ar:'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ۩ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً', en:'"O tranquil soul — return to your Lord, satisfied and pleasing — and enter among My servants — and enter My Paradise!" (89:27-30) — The ultimate honour.', note:'"Nafs mutma\'inna" — the soul at complete peace with its Lord. This is the goal of all our worship.' },
};

function sceneP() {
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  return st ? {
    sky1:'#3d2870', sky2:'#5a3a90', ground:'#4a3060', accent:'#f4c840',
    pri:'#9060d0', lit:'#c090f0', body:'#d4b8f0',
    sun1:'#f4a0c0', sun2:'#e8c840',
    pillar:'#8060a0', sand:'#6a4880',
    char1:'#f0d0c0', char2:'#d4a0b0', robe:'#7040a0',
  } : {
    sky1:'#0e0614', sky2:'#1c0c28', ground:'#2a1440', accent:'#e8a030',
    pri:'#7a2090', lit:'#b040c0', body:'#ffeeff',
    sun1:'#c04080', sun2:'#e85020',
    pillar:'#5a2080', sand:'#3a1860',
    char1:'#f0d0c0', char2:'#c07050', robe:'#4a1870',
  };
}

function spr(ctx, x, y, w, h, col, rx) {
  ctx.fillStyle = col;
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  if (st && rx && ctx.roundRect) {
    ctx.beginPath(); ctx.roundRect(x, y, w, h, rx); ctx.fill();
  } else {
    ctx.fillRect(x, y, w, h);
  }
}

function drawFajrBg(ctx, W, H) {
  const p = sceneP();
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, p.sky1); g.addColorStop(0.6, p.sky2); g.addColorStop(1, p.ground);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // Dawn light
  const dawn = ctx.createRadialGradient(W*0.5, H*0.4, 5, W*0.5, H*0.4, H*0.5);
  dawn.addColorStop(0, p.sun1+'66'); dawn.addColorStop(1, 'transparent');
  ctx.fillStyle = dawn; ctx.fillRect(0, 0, W, H);
  // Stars
  for (let i = 0; i < 30; i++) {
    const sx = (i*4517+113)%W, sy = (i*3701+97)%(H*0.55);
    ctx.fillStyle = `rgba(255,240,220,${0.2+((i%4)*0.15)})`;
    ctx.fillRect(sx, sy, 1, 1);
  }
}

function drawScene1(ctx, W, H) {
  drawFajrBg(ctx, W, H);
  const p = sceneP();
  // Dawn horizon glow
  const hor = ctx.createLinearGradient(0, H*0.55, 0, H*0.7);
  hor.addColorStop(0, p.sun2+'88'); hor.addColorStop(1, p.ground);
  ctx.fillStyle = hor; ctx.fillRect(0, H*0.55, W, H*0.45);
  // Crescent moon
  ctx.fillStyle = p.accent;
  ctx.beginPath(); ctx.arc(W*0.8, H*0.15, 14, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = p.sky1;
  ctx.beginPath(); ctx.arc(W*0.8+8, H*0.15-4, 12, 0, Math.PI*2); ctx.fill();
  // Fajr (dawn) line
  ctx.fillStyle = p.sun1+'aa';
  ctx.fillRect(0, H*0.6, W, 4);
  // Desert ground
  spr(ctx, 0, H*0.7, W, H*0.3, p.sand);
  // Palm trees
  for (let i = 0; i < 3; i++) {
    const tx = W*0.15 + i*W*0.3;
    spr(ctx, tx, H*0.45, 6, H*0.3, p.pillar);
    ctx.fillStyle = p.pri+'cc';
    for (let b = 0; b < 5; b++) {
      const a = (b/5)*Math.PI - Math.PI*0.1;
      ctx.fillRect(tx+3+Math.cos(a)*20, H*0.45+Math.sin(a)*8, 16, 4);
    }
  }
}

function drawScene2(ctx, W, H) {
  drawFajrBg(ctx, W, H);
  const p = sceneP();
  spr(ctx, 0, H*0.65, W, H*0.35, p.sand);
  // Ancient pillars of Iram
  const cols = [W*0.1, W*0.28, W*0.55, W*0.73];
  cols.forEach(cx => {
    spr(ctx, cx, H*0.2, 22, H*0.5, p.pillar, 3);
    spr(ctx, cx-4, H*0.2, 30, 12, p.pillar+'cc', 2);
  });
  // Destruction lightning/cracks
  ctx.strokeStyle = p.accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W*0.5, H*0.05); ctx.lineTo(W*0.45, H*0.3); ctx.lineTo(W*0.52, H*0.4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W*0.7, H*0.08); ctx.lineTo(W*0.72, H*0.35); ctx.stroke();
}

function drawScene3(ctx, W, H) {
  drawFajrBg(ctx, W, H);
  const p = sceneP();
  spr(ctx, 0, H*0.7, W, H*0.3, p.sand);
  // Three figures representing three nations
  const ppl = [{x:W*0.2,c:p.char1},{x:W*0.5,c:p.char2},{x:W*0.75,c:p.char1}];
  ppl.forEach(({x,c}) => {
    spr(ctx, x-5, H*0.55, 10, 16, c, 5);
    spr(ctx, x-7, H*0.6, 14, 12, p.robe, 2);
  });
  // Wave of destruction
  ctx.strokeStyle = p.lit; ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= W; i += 10) ctx.lineTo(i, H*0.5 + Math.sin(i*0.05)*8);
  ctx.stroke();
}

function drawScene4(ctx, W, H) {
  drawFajrBg(ctx, W, H);
  const p = sceneP();
  spr(ctx, 0, H*0.7, W, H*0.3, p.sand);
  // Scales of wealth vs poverty
  spr(ctx, W*0.5-2, H*0.3, 4, H*0.35, p.pri);
  ctx.strokeStyle = p.lit; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W*0.5, H*0.3); ctx.lineTo(W*0.25, H*0.45); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W*0.5, H*0.3); ctx.lineTo(W*0.75, H*0.52); ctx.stroke();
  // Left (wealth) - gold coins
  spr(ctx, W*0.15, H*0.44, 22, 10, p.accent, 5);
  spr(ctx, W*0.17, H*0.48, 18, 8, p.accent2, 4);
  // Right (poverty) - empty
  ctx.strokeStyle = p.lit+'88'; ctx.lineWidth = 1;
  ctx.strokeRect(W*0.68, H*0.5, 20, 14);
}

function drawScene5(ctx, W, H) {
  drawFajrBg(ctx, W, H);
  const p = sceneP();
  // Earth cracking
  spr(ctx, 0, H*0.7, W, H*0.3, p.sand);
  ctx.strokeStyle = p.lit; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(W*0.3, H*0.7); ctx.lineTo(W*0.5, H*0.85); ctx.lineTo(W*0.7, H*0.7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W*0.15, H*0.72); ctx.lineTo(W*0.35, H*0.82); ctx.stroke();
  // Angels in rows
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 6; col++) {
      const ax = W*0.08 + col*(W*0.14), ay = H*0.2 + row*30;
      spr(ctx, ax, ay, 8, 12, p.body, 4);
      ctx.fillStyle = p.accent+'aa'; ctx.fillRect(ax-4, ay+4, 4, 8); ctx.fillRect(ax+8, ay+4, 4, 8);
    }
  }
}

function drawScene6(ctx, W, H) {
  drawFajrBg(ctx, W, H);
  const p = sceneP();
  // Garden / Paradise
  spr(ctx, 0, H*0.65, W, H*0.35, '#1a4020');
  // Flowers
  for (let i = 0; i < 7; i++) {
    const fx = W*0.06 + i*(W*0.13);
    ctx.fillStyle = p.sun1; ctx.beginPath(); ctx.arc(fx, H*0.65, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(fx, H*0.65, 4, 0, Math.PI*2); ctx.fill();
  }
  // Soul ascending
  spr(ctx, W*0.5-5, H*0.35, 10, 16, p.char1, 5);
  ctx.fillStyle = p.lit+'88';
  ctx.beginPath(); ctx.moveTo(W*0.5, H*0.3); ctx.lineTo(W*0.5, H*0.1); ctx.stroke && ctx.stroke();
  ctx.strokeStyle = p.lit+'88'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W*0.5, H*0.1); ctx.lineTo(W*0.5-6, H*0.18); ctx.moveTo(W*0.5, H*0.1); ctx.lineTo(W*0.5+6, H*0.18); ctx.stroke();
  // Light rays
  ctx.fillStyle = p.accent+'55';
  ctx.beginPath(); ctx.moveTo(W*0.5, H*0.05); ctx.lineTo(W*0.2, H*0.4); ctx.lineTo(W*0.8, H*0.4); ctx.fill();
}

const SCENE_FNS = { 2:drawScene1, 3:drawScene2, 4:drawScene3, 5:drawScene4, 6:drawScene5, 7:drawScene6 };
let _activeScene = null, _sceneCanvas = null, _sceneCtx = null;

function startScene(n) {
  if (n === 1) { _s1wbw.start(); return; }
  
  stopAllScenes();
  const cv = document.getElementById(`canvas-${n}`);
  if (!cv) return;
  _sceneCanvas = cv; _sceneCtx = cv.getContext('2d'); _activeScene = n;
  const fn = SCENE_FNS[n];
  if (fn) fn(_sceneCtx, cv.width, cv.height);
  cv.onclick = () => showVerse(n);
}
function stopAllScenes() {
  _activeScene = null; }




const VD_wbw={ref:'Al-Fajr (89)',arabic:'وَالْفَجْرِ ۩ وَلَيَالٍ عَشْرٍ ۩ إِنَّ رَبَّكَ لَبِالْمِرْصَادِ ۩ يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ۩ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً',english:'"By the dawn, and ten nights — your Lord is ever watchful. O tranquil soul, return to your Lord, pleased and pleasing." (89:1-2, 14, 27-28)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🌄',label:'THE DAWN',verse:VD_wbw});
function initScenes() { for (let i = 2; i <= 7; i++) { const cv = document.getElementById(`canvas-${i}`); if (cv) { const fn = SCENE_FNS[i]; if (fn) fn(cv.getContext('2d'), cv.width, cv.height); } } }
function showVerse(n) {
  const v = VERSES_FAJR[n]; if (!v) return;
  const el = id => document.getElementById(id);
  if (el('vp-ref'))    el('vp-ref').textContent    = v.ref;
  if (el('vp-arabic')) el('vp-arabic').textContent = v.ar;
  if (el('vp-eng'))    el('vp-eng').textContent    = v.en;
  if (el('vp-note'))   el('vp-note').textContent   = v.note || '';
  const popup = el('verse-popup'); if (popup) popup.classList.add('visible');
}
function hideVersePopup() {
  const p = document.getElementById('verse-popup'); if (p) p.classList.remove('visible');
}
