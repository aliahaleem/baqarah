'use strict';
// =============================================
//  SURAH AN-NABA QUEST — scenes.js
//  Palette: deep cosmic purple / amber / orange
// =============================================

const CW = 560, CH = 220, P = 4;

// --- THEME PALETTE ---
function sceneP() {
  const s = document.documentElement.dataset.theme === 'stars';
  return s ? {
    sky0:    '#06021a', sky1:    '#0a0422', sky2:    '#140830',
    gnd:     '#1a0e30', gndAcc:  '#241840',
    starStr: 'rgba(200,170,255,',
    acStr:   'rgba(210,140,200,',
    label:   '#c898e8',
  } : {
    sky0:    '#0e0528', sky1:    '#150830', sky2:    '#301840',
    gnd:     '#3a2808', gndAcc:  '#5a4010',
    starStr: 'rgba(255,240,200,',
    acStr:   'rgba(255,170,0,',
    label:   '#ffaa00',
  };
}

function fillRect(ctx, x, y, w, h, col) {
  if (col) ctx.fillStyle = col;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

// =============================================
//  VERSES
// =============================================
const VERSES = {
  great_news: {
    ref: 'An-Naba 78:1-3',
    arabic: 'عَمَّ يَتَسَاءَلُونَ ۩ عَنِ النَّبَإِ الْعَظِيمِ ۩ الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ',
    english: '"About what are they asking one another? About the Great News — the one they are in disagreement about."',
    note: '"An-Naba Al-Atheem" — the Great News. The Quraysh of Makkah were disputing about the Day of Resurrection. Some denied it completely, others mocked it, others were simply confused. The surah opens with a rhetorical question: "About WHAT are they arguing?" — as if to say, can you not see? The evidence of the Day\'s truth surrounds you everywhere. This is not a minor debate — it is the most consequential truth in all of existence.',
  },
  they_will_know: {
    ref: 'An-Naba 78:4-5',
    arabic: 'كَلَّا سَيَعْلَمُونَ ۩ ثُمَّ كَلَّا سَيَعْلَمُونَ',
    english: '"No! They are going to know. Then no! They are going to know."',
    note: '"Kalla" — Arabic for "No! Absolutely not!" It firmly rejects their denial. Then comes the warning: "They are going to know." Repeated TWICE. In Arabic rhetoric, repetition means certainty and emphasis — this is not a maybe. Their denial will not stop what is coming. It is as certain as the rising of the sun. The only question is: will they learn before it is too late, or on the Day itself?',
  },
  earth_signs: {
    ref: 'An-Naba 78:6-8',
    arabic: 'أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا ۩ وَالْجِبَالَ أَوْتَادًا ۩ وَخَلَقْنَاكُمْ أَزْوَاجًا',
    english: '"Have We not made the earth a resting place? And the mountains as pegs? And created you in pairs?"',
    note: '"Mihadan" — a cradle, a resting place, a smooth comfortable bed. The earth does not throw us off, spin us into space, or shake us apart — it holds us gently. "Awtadan" — pegs, like tent stakes hammered deep into the ground. The mountains have deep roots that stabilize the earth\'s crust. Modern geology confirms this. "Azwajan" — in pairs. Male and female. Positive and negative. Day and night. Every creation in complementary pairs. This is not coincidence — it is design.',
  },
  night_day: {
    ref: 'An-Naba 78:9-11',
    arabic: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا ۩ وَجَعَلْنَا اللَّيْلَ لِبَاسًا ۩ وَجَعَلْنَا النَّهَارَ مَعَاشًا',
    english: '"And made your sleep as rest? And made the night as a covering? And made the day for livelihood?"',
    note: '"Subatan" — not just sleep, but complete renewal. The word means a cutting off — complete rest, cell repair, mental reset. No human engineering has replicated this. "Libasan" — a garment. The night wraps you like clothing, hiding you, protecting you, giving you privacy and peace. "Ma\'asha" — livelihood, the time to work and provide. Allah designed the day-night cycle specifically for human needs. SubhanAllah.',
  },
  sky_rain: {
    ref: 'An-Naba 78:12-16',
    arabic: 'وَبَنَيْنَا فَوْقَكُمْ سَبْعًا شِدَادًا ۩ وَجَعَلْنَا سِرَاجًا وَهَّاجًا ۩ وَأَنزَلْنَا مِنَ الْمُعْصِرَاتِ مَاءً ثَجَّاجًا ۩ لِّنُخْرِجَ بِهِ حَبًّا وَنَبَاتًا وَجَنَّاتٍ أَلْفَافًا',
    english: '"And built above you seven strong heavens? And made a blazing lamp (the sun)? And sent down from rain-clouds water in torrents — to bring forth grain, vegetation, and gardens of thick growth?"',
    note: '"Shidadan" — intensely strong, firm. The seven heavens are not fragile constructs — they are powerful and perfectly designed. "Siraj wahhaj" — a blazing lamp. The sun is described as a lamp: functional, purposeful, giving light and warmth. "Mu\'sara" — clouds that are squeezed, heavy with rain. "Thajjaj" — torrential, pouring. One system: strong sky → blazing sun → heavy clouds → pouring rain → grain, crops, dense gardens. All interconnected, all for you.',
  },
  day_sorting: {
    ref: 'An-Naba 78:17-20',
    arabic: 'إِنَّ يَوْمَ الْفَصْلِ كَانَ مِيقَاتًا ۩ يَوْمَ يُنفَخُ فِي الصُّورِ فَتَأْتُونَ أَفْوَاجًا ۩ وَفُتِحَتِ السَّمَاءُ فَكَانَتْ أَبْوَابًا ۩ وَسُيِّرَتِ الْجِبَالُ فَكَانَتْ سَرَابًا',
    english: '"Indeed the Day of Decision/Sorting is an appointed time — the Day the Horn is blown and you come in crowds. And the sky is opened and becomes gates. And the mountains are moved away and become a mirage."',
    note: '"Yawm al-Fasl" — the Day of Sorting/Separation/Decision. A fixed appointment — not cancelled, not delayed. The Horn (Soor) is blown by the angel Israfeel — all the dead rise and come in vast crowds. The sky tears open like curtains with massive gates. The mountains — the "firm pegs" from 78:7 — are dissolved into dust, becoming a mirage. Everything that seemed permanent is gone in an instant. Only Allah remains.',
  },
  hellfire: {
    ref: 'An-Naba 78:21-26',
    arabic: 'إِنَّ جَهَنَّمَ كَانَتْ مِرْصَادًا ۩ لِّلطَّاغِينَ مَآبًا ۩ لَّابِثِينَ فِيهَا أَحْقَابًا ۩ لَّا يَذُوقُونَ فِيهَا بَرْدًا وَلَا شَرَابًا ۩ إِلَّا حَمِيمًا وَغَسَّاقًا',
    english: '"Indeed Hellfire has been lying in wait (mirsad) — for the transgressors, a place of return. They will remain in it for ages. They will taste therein no coolness and no drink — except scalding water and purulent fluid."',
    note: '"Mirsad" — a watch-post, an ambush. Hellfire is waiting, alert, ready — it actively guards the punishment. "Li-l-taghin" — for the "tagheen," those who transgressed all limits, who were arrogant and rejected truth. "Ahqaban" — ages upon ages. "Hameem" — scalding boiling water. "Ghassaq" — dark, putrid, purulent fluid. No coolness, no relief, no comfort. This is the consequence of choosing arrogance over submission.',
  },
  denial: {
    ref: 'An-Naba 78:27-30',
    arabic: 'إِنَّهُمْ كَانُوا لَا يَرْجُونَ حِسَابًا ۩ وَكَذَّبُوا بِآيَاتِنَا كِذَّابًا ۩ وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ كِتَابًا',
    english: '"Indeed they used to not expect any account — and they denied Our signs completely. But We have enumerated all things in a register. So taste — We will never increase you except in punishment."',
    note: '"La yarjoon hisaban" — they did not expect to be held accountable. This is the root cause: they forgot Allah, denied the Afterlife, and lived as if there were no consequences. "Kaththabu bi-ayatina" — and they denied the signs, not casually, but "kidhdhaban" — completely and emphatically. But nothing was lost: "We have enumerated all things in a register." Every deed recorded. Nothing escapes.',
  },
  paradise: {
    ref: 'An-Naba 78:31-36',
    arabic: 'إِنَّ لِلْمُتَّقِينَ مَفَازًا ۩ حَدَائِقَ وَأَعْنَابًا ۩ وَكَوَاعِبَ أَتْرَابًا ۩ وَكَأْسًا دِهَاقًا ۩ لَّا يَسْمَعُونَ فِيهَا لَغْوًا وَلَا كِذَّابًا',
    english: '"Indeed for the righteous (al-muttaqeen) is success (mafazan) — gardens and grape vines, and (companions of) equal age, and a full cup. They will not hear therein ill speech or any falsehood — a reward from your Lord, an ample gift."',
    note: '"Al-muttaqeen" — the God-fearing, the righteous. "Mafaza" — triumph, success, escape from loss. "Hada\'iq" — enclosed gardens, lush. "A\'nab" — grape vines specifically. "Kawa\'ib atrab" — companions of equal age, beautiful, matched. "Ka\'san dihaqan" — a cup filled to the brim. And most beautifully: "La yasma\'un fiha laghwan wa la kidhdhaban" — they hear NO idle talk and NO lying. Paradise is completely free from all negativity. Pure peace.',
  },
  lord_of_all: {
    ref: 'An-Naba 78:37-38',
    arabic: 'رَّبِّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الرَّحْمَٰنِ ۖ لَا يَمْلِكُونَ مِنْهُ خِطَابًا ۩ يَوْمَ يَقُومُ الرُّوحُ وَالْمَلَائِكَةُ صَفًّا ۖ لَّا يَتَكَلَّمُونَ إِلَّا مَنْ أَذِنَ لَهُ الرَّحْمَٰنُ وَقَالَ صَوَابًا',
    english: '"Lord of the heavens, the earth, and whatever is between them — the Most Merciful — none will have authority to speak to Him. On the Day when the Spirit (Jibreel) and the angels stand in rows — none shall speak except one to whom the Most Merciful grants permission, and he will say what is correct."',
    note: '"Ar-Rahman" — The Most Merciful. Even on the greatest, most terrifying Day, Allah is still ar-Rahman. Jibreel (AS) — the greatest of the angels — will stand in a single row. The angels will stand in rows. None may speak without permission. "Sawab" — only truth and correctness may be spoken. This is the awe and majesty of that Day. No one speaks freely — except by His mercy.',
  },
  final_warning: {
    ref: 'An-Naba 78:39-40',
    arabic: 'ذَٰلِكَ الْيَوْمُ الْحَقُّ ۖ فَمَن شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ مَآبًا ۩ إِنَّا أَنذَرْنَاكُمْ عَذَابًا قَرِيبًا ۖ يَوْمَ يَنظُرُ الْمَرْءُ مَا قَدَّمَتْ يَدَاهُ وَيَقُولُ الْكَافِرُ يَا لَيْتَنِي كُنتُ تُرَابًا',
    english: '"That is the Day of Truth. So let whoever wills take a path back to his Lord. Indeed We have warned you of a punishment that is near — the Day a man will see what his hands have sent forth, and the disbeliever will say: I wish I were dust!"',
    note: '"Yawm al-Haqq" — The Day of Truth. Every truth is revealed. Every lie dissolved. Every hidden deed exposed. "Fa-man sha\'a" — so WHOEVER WILLS. The door is open NOW. Take the path back to your Lord while you still can. "Qarib" — near, close, soon. The warning has been given. And the final, haunting image: the disbeliever wishing he were dust — wishing he had never been created at all. That regret — may we never know it. Act now.',
  },
};

// =============================================
//  POPUP
// =============================================
function showVersePopup(v) {
  const p = document.getElementById('verse-popup'); if (!p) return;
  document.getElementById('vp-ref').textContent    = v.ref;
  document.getElementById('vp-arabic').textContent = v.arabic;
  document.getElementById('vp-eng').textContent    = v.english;
  document.getElementById('vp-note').textContent   = v.note || '';
  p.classList.add('visible');
}
function hideVersePopup() {
  const p = document.getElementById('verse-popup'); if (p) p.classList.remove('visible');
}

// =============================================
//  BASE SCENE
// =============================================
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
  // helpers
  _star(ctx, x, y, r, bright) {
    ctx.fillStyle = sceneP().starStr + bright + ')';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }
  _pixelFigure(ctx, x, y, bodyCol, headCol) {
    // head
    fillRect(ctx, x, y,    P*3, P*3, headCol  || '#f5d8b0');
    // body
    fillRect(ctx, x-P, y+P*3, P*5, P*4, bodyCol || '#5a20a0');
    // legs
    fillRect(ctx, x,   y+P*7, P*2, P*3, '#333');
    fillRect(ctx, x+P*2, y+P*7, P*2, P*3, '#333');
  }
  _pixelAngel(ctx, x, y, col) {
    fillRect(ctx, x+P, y,     P*2, P*2, '#fff8e0'); // head
    fillRect(ctx, x,   y+P*2, P*4, P*3, col || '#ddd8ff'); // robe
    fillRect(ctx, x-P*3, y+P,  P*3, P*2, '#fff8e0'); // left wing
    fillRect(ctx, x+P*4, y+P,  P*3, P*2, '#fff8e0'); // right wing
  }
}

// =============================================
//  SCENE 1 — THE GREAT DEBATE (78:1-5)
// =============================================
class Scene1 extends BaseScene {
  constructor() {
    super('canvas-1');
    this.clickZones = [
      { x: 20,  y: 60,  w: 220, h: 140, key: 'great_news' },
      { x: 280, y: 30,  w: 260, h: 150, key: 'they_will_know' },
    ];
  }
  draw() {
    const c = this.ctx, t = this.t, p = sceneP();
    // Sky
    c.fillStyle = p.sky0; c.fillRect(0, 0, CW, CH);
    // Animated stars
    const seed = (n) => ((n*2654435769)>>>0)/4294967296;
    for (let i = 0; i < 50; i++) {
      const sx = seed(i*7)*CW, sy = seed(i*13)*CH*0.65;
      const br = 0.3 + 0.5*Math.abs(Math.sin(t*0.03 + i));
      this._star(c, sx, sy, 1+seed(i*3), br);
    }
    // Ground — sandy desert
    fillRect(c, 0, 165, CW, 55, p.gnd);
    fillRect(c, 0, 165, CW, 6,  p.gndAcc);

    // === LEFT GROUP (2 figures arguing) ===
    // Figure 1 — gesturing arm
    this._pixelFigure(c, 60, 118, '#3a8040', '#f5c890');
    // arm pointing right
    fillRect(c, 72, 128, P*4, P, '#3a8040');
    // Figure 2
    this._pixelFigure(c, 110, 120, '#203880', '#f0c888');
    // arm pointing left
    fillRect(c, 102, 130, P*3, P, '#203880');

    // Speech bubble left
    c.fillStyle = '#fff8e0'; c.fillRect(40, 88, 70, 24);
    c.fillStyle = '#fff8e0'; c.fillRect(68, 112, 8, 8);
    c.fillStyle = '#111';
    c.font = 'bold 11px monospace'; c.fillText('? ? ?', 46, 104);

    // === RIGHT GROUP ===
    this._pixelFigure(c, 390, 118, '#803030', '#f5c890');
    fillRect(c, 382, 128, P*3, P, '#803030');
    this._pixelFigure(c, 440, 120, '#806020', '#f0c888');
    fillRect(c, 456, 130, P*3, P, '#806020');

    // Speech bubble right
    c.fillStyle = '#fff8e0'; c.fillRect(418, 88, 80, 24);
    c.fillStyle = '#fff8e0'; c.fillRect(450, 112, 8, 8);
    c.fillStyle = '#111';
    c.font = 'bold 11px monospace'; c.fillText('! ! !', 428, 104);

    // === COSMIC QUESTION in the center sky ===
    const glow = 0.5 + 0.4*Math.sin(t*0.05);
    c.shadowBlur = 18; c.shadowColor = `rgba(255,170,0,${glow})`;
    c.fillStyle = `rgba(255,170,0,${0.7+glow*0.3})`;
    c.font = 'bold 52px serif'; c.textAlign = 'center';
    c.fillText('?', CW/2, 90);
    c.shadowBlur = 0; c.textAlign = 'left';

    // Click zone hints (subtle golden border)
    c.strokeStyle = `rgba(255,170,0,${0.15+0.1*Math.sin(t*0.04)})`;
    c.lineWidth = 2; c.setLineDash([4,4]);
    c.strokeRect(22, 62, 216, 136);
    c.strokeRect(282, 32, 256, 148);
    c.setLineDash([]);

    // Labels
    c.fillStyle = p.label; c.font = '7px monospace';
    c.fillText('👆 Click to reveal verse', 25, 76);
    c.fillText('👆 Click to reveal verse', 284, 46);
  }
}

// =============================================
//  SCENE 2 — SIGNS OF EARTH (78:6-11)
// =============================================
class Scene2 extends BaseScene {
  constructor() {
    super('canvas-2');
    this.clickZones = [
      { x: 0,   y: 130, w: 280, h: 90,  key: 'earth_signs' },
      { x: 280, y: 60,  w: 280, h: 160, key: 'night_day' },
    ];
  }
  draw() {
    const c = this.ctx, t = this.t, p = sceneP();
    // Night sky left, twilight right
    const grad = c.createLinearGradient(0, 0, CW, 0);
    grad.addColorStop(0,   p.sky0);
    grad.addColorStop(0.5, p.sky1);
    grad.addColorStop(1,   p.sky2);
    c.fillStyle = grad; c.fillRect(0, 0, CW, CH);

    // Stars (left side)
    const seed = (n) => ((n*1234567891)>>>0)/4294967296;
    for (let i = 0; i < 30; i++) {
      const sx = seed(i*5)*260, sy = seed(i*11)*130;
      const br = 0.4 + 0.4*Math.abs(Math.sin(t*0.04 + i*0.8));
      this._star(c, sx, sy, 1, br);
    }

    // Crescent moon
    const moonX = 50, moonY = 35;
    c.fillStyle = '#ffe88a'; c.beginPath(); c.arc(moonX, moonY, 18, 0, Math.PI*2); c.fill();
    c.fillStyle = p.sky0; c.beginPath(); c.arc(moonX+8, moonY-4, 15, 0, Math.PI*2); c.fill();

    // Orange sunrise glow (right)
    c.fillStyle = 'rgba(255,100,0,0.15)'; c.fillRect(350, 0, 210, 130);
    c.fillStyle = 'rgba(255,160,0,0.1)';  c.fillRect(400, 0, 160, 100);

    // Ground — earth as resting bed
    fillRect(c, 0, 155, CW, 65, p.gnd);
    fillRect(c, 0, 155, CW, 8,  p.gndAcc);

    // Mountains as pegs
    // Left mountain
    c.fillStyle = '#4a3020';
    c.beginPath(); c.moveTo(80, 155); c.lineTo(150, 80); c.lineTo(220, 155); c.closePath(); c.fill();
    c.fillStyle = '#5a4030';
    c.beginPath(); c.moveTo(100, 155); c.lineTo(150, 90); c.lineTo(200, 155); c.closePath(); c.fill();
    // Mountain pegs underground (visual)
    fillRect(c, 138, 155, 24, 30, '#2a1808');

    // Right mountain
    c.fillStyle = '#3a2820';
    c.beginPath(); c.moveTo(310, 155); c.lineTo(380, 70); c.lineTo(450, 155); c.closePath(); c.fill();
    fillRect(c, 368, 155, 24, 30, '#2a1808');

    // Small hut — sleeping figure
    fillRect(c, 230, 130, 60, 25, '#6a4020');  // hut wall
    c.fillStyle = '#8a5030';
    c.beginPath(); c.moveTo(225, 132); c.lineTo(260, 110); c.lineTo(295, 132); c.closePath(); c.fill();
    // window with warm light
    const glow = 0.6 + 0.4*Math.sin(t*0.06);
    fillRect(c, 248, 136, 14, 10, `rgba(255,200,80,${glow})`);
    // sleeping person (Z z)
    c.fillStyle = '#ffaa00'; c.font = 'bold 12px monospace';
    c.fillText('z', 256, 128);
    c.font = 'bold 9px monospace'; c.fillText('z', 264, 122);

    // Day livelihood — person working (right side)
    this._pixelFigure(c, 480, 118, '#2a6040', '#f5c890');
    // farming tool
    fillRect(c, 496, 126, P, P*8, '#8a6030');

    // Click hint borders
    c.strokeStyle = p.acStr+'0.2)'; c.lineWidth = 2; c.setLineDash([4,4]);
    c.strokeRect(2, 132, 276, 86);
    c.strokeRect(282, 62, 276, 156);
    c.setLineDash([]);
    c.fillStyle = p.label; c.font = '7px monospace';
    c.fillText('👆 Earth & Mountains', 5, 145);
    c.fillText('👆 Sleep / Night / Day', 285, 75);
  }
}

// =============================================
//  SCENE 3 — SIGNS OF SKY & RAIN (78:12-16)
// =============================================
class Scene3 extends BaseScene {
  constructor() {
    super('canvas-3');
    this.clickZones = [
      { x: 0,   y: 0,   w: 260, h: 100, key: 'sky_rain' },
      { x: 360, y: 0,   w: 200, h: 130, key: 'sky_rain' },
      { x: 100, y: 100, w: 360, h: 120, key: 'sky_rain' },
    ];
  }
  draw() {
    const c = this.ctx, t = this.t, p = sceneP();
    // Seven layered heavens
    const layers = ['#0a0220','#120530','#1a0840','#220e50','#2a1460','#321a70','#3a2080'];
    layers.forEach((col, i) => {
      fillRect(c, 0, i*22, CW, 22, col);
    });
    // Ground
    fillRect(c, 0, 165, CW, 55, p.gnd);
    fillRect(c, 0, 165, CW, 6,  p.gndAcc);

    // Blazing sun (right)
    const pulse = 1 + 0.08*Math.sin(t*0.06);
    const sunX = 470, sunY = 55;
    // Rays
    for (let i = 0; i < 8; i++) {
      const angle = (i/8)*Math.PI*2 + t*0.02;
      const rx = sunX + Math.cos(angle)*28*pulse;
      const ry = sunY + Math.sin(angle)*28*pulse;
      c.strokeStyle = 'rgba(255,180,0,0.5)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(sunX + Math.cos(angle)*14, sunY + Math.sin(angle)*14);
      c.lineTo(rx, ry); c.stroke();
    }
    c.fillStyle = '#ffcc00'; c.beginPath(); c.arc(sunX, sunY, 20*pulse, 0, Math.PI*2); c.fill();
    c.fillStyle = '#ffee80'; c.beginPath(); c.arc(sunX, sunY, 12, 0, Math.PI*2); c.fill();

    // Rain clouds (center)
    const cloudX = 160, cloudY = 80 + 4*Math.sin(t*0.04);
    c.fillStyle = '#5a5a8a';
    c.beginPath(); c.arc(cloudX, cloudY, 28, 0, Math.PI*2); c.fill();
    c.beginPath(); c.arc(cloudX+30, cloudY-6, 22, 0, Math.PI*2); c.fill();
    c.beginPath(); c.arc(cloudX-20, cloudY+4, 18, 0, Math.PI*2); c.fill();
    c.beginPath(); c.arc(cloudX+50, cloudY+4, 18, 0, Math.PI*2); c.fill();

    // Rain drops
    c.strokeStyle = '#8888cc'; c.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const rx = cloudX - 30 + i*8;
      const ry = cloudY + 28 + ((t*3 + i*20) % 60);
      const len = 8 + (i%3)*4;
      c.beginPath(); c.moveTo(rx, ry); c.lineTo(rx-2, ry+len); c.stroke();
    }

    // Crops/vegetation at bottom
    for (let i = 0; i < 14; i++) {
      const gx = 20 + i*38;
      fillRect(c, gx+6, 160, P, 10, '#2a5010');  // stem
      fillRect(c, gx+2, 153, P*3, P*2, '#3a6818'); // leaves
      // grain head
      fillRect(c, gx+4, 147, P*2, P*2, '#8a7010');
    }

    // Left tree/garden
    c.fillStyle = '#2a5010';
    c.beginPath(); c.arc(50, 148, 22, 0, Math.PI*2); c.fill();
    fillRect(c, 46, 160, P*2, 18, '#5a3010');

    // Labels
    c.fillStyle = p.label; c.font = '7px monospace';
    c.fillText('👆 Seven Heavens', 5, 14);
    c.fillText('👆 Blazing Lamp (Sun)', 365, 12);
    c.fillText('👆 Rain Clouds → Crops', 105, 114);
  }
}

// =============================================
//  SCENE 4 — THE DAY OF SORTING (78:17-20)
// =============================================
class Scene4 extends BaseScene {
  constructor() {
    super('canvas-4');
    this.clickZones = [
      { x: 220, y: 40,  w: 120, h: 100, key: 'day_sorting' },
      { x: 0,   y: 0,   w: 220, h: 100, key: 'day_sorting' },
      { x: 340, y: 0,   w: 220, h: 80,  key: 'day_sorting' },
      { x: 0,   y: 140, w: CW,  h: 80,  key: 'day_sorting' },
    ];
  }
  draw() {
    const c = this.ctx, t = this.t;
    // Red-orange apocalyptic sky
    const grad = c.createRadialGradient(CW/2, 0, 0, CW/2, 0, CH);
    grad.addColorStop(0, '#8a2000');
    grad.addColorStop(0.5, '#501000');
    grad.addColorStop(1, '#200000');
    c.fillStyle = grad; c.fillRect(0, 0, CW, CH);

    // Sky "cracks" (gates opening)
    c.strokeStyle = '#ffcc00'; c.lineWidth = 3;
    const crack1x = 80 + 6*Math.sin(t*0.03);
    c.beginPath(); c.moveTo(crack1x, 0); c.lineTo(crack1x+20, 70); c.lineTo(crack1x-10, 130); c.stroke();
    const crack2x = 440 - 4*Math.sin(t*0.04);
    c.beginPath(); c.moveTo(crack2x, 0); c.lineTo(crack2x-15, 60); c.lineTo(crack2x+10, 120); c.stroke();
    // Golden light pouring through cracks
    c.fillStyle = 'rgba(255,200,0,0.15)';
    c.beginPath(); c.moveTo(crack1x, 0); c.lineTo(crack1x+80, 130); c.lineTo(crack1x+20, 130); c.lineTo(crack1x-30, 0); c.closePath(); c.fill();

    // Horn / Trumpet (center)
    const hornY = 55 + 3*Math.sin(t*0.05);
    fillRect(c, 248, hornY, 64, 20, '#c8a000');
    fillRect(c, 240, hornY+4, 80, 12, '#e8c020');
    // Mouth of horn (flare)
    c.fillStyle = '#ffd700';
    c.beginPath(); c.moveTo(320, hornY); c.lineTo(360, hornY-12); c.lineTo(360, hornY+32); c.lineTo(320, hornY+20); c.closePath(); c.fill();
    // Sound waves
    for (let w = 1; w <= 3; w++) {
      const wt = ((t*2 + w*30) % 90) / 90;
      c.strokeStyle = `rgba(255,210,0,${0.6*(1-wt)})`; c.lineWidth = 2;
      c.beginPath(); c.arc(360, hornY+10, 10 + w*15*wt, -Math.PI*0.4, Math.PI*0.4); c.stroke();
    }

    // Mountains dissolving into mirage (bottom left & right)
    // Left mountain — partially dissolved
    const dissolve = 0.3 + 0.3*Math.sin(t*0.02);
    c.globalAlpha = 1 - dissolve*0.5;
    c.fillStyle = '#4a3020';
    c.beginPath(); c.moveTo(30, 220); c.lineTo(90, 155); c.lineTo(150, 220); c.closePath(); c.fill();
    c.globalAlpha = 1;
    // Dust particles
    for (let i = 0; i < 8; i++) {
      const dx = 60 + i*12 + 5*Math.sin(t*0.08 + i);
      const dy = 155 - i*5 - ((t + i*15) % 40);
      c.fillStyle = `rgba(180,120,40,${0.5-i*0.05})`;
      c.fillRect(dx, dy, 4, 4);
    }
    // Right mountain dissolving
    c.globalAlpha = 0.5;
    c.fillStyle = '#3a2810';
    c.beginPath(); c.moveTo(400, 220); c.lineTo(470, 148); c.lineTo(540, 220); c.closePath(); c.fill();
    c.globalAlpha = 1;

    // Ground with crowds of figures
    fillRect(c, 0, 185, CW, 35, '#1a0808');
    // Crowd figures marching in rows
    const figCols = ['#8a4040','#406040','#404880','#806020','#804040','#208050'];
    for (let i = 0; i < 18; i++) {
      const fx = 15 + i*30 + 5*Math.sin(t*0.04 + i*0.5);
      const fc = figCols[i % figCols.length];
      fillRect(c, fx+2, 173, P*2, P*2, '#f5c890');
      fillRect(c, fx,   179, P*3+2, P*3, fc);
    }

    // Labels
    const p4 = sceneP();
    c.fillStyle = p4.label; c.font = '7px monospace';
    c.fillText('👆 Horn Blown', 224, 52);
    c.fillText('👆 Sky Opens', 5, 12);
    c.fillText('👆 Mountains Move', 342, 12);
    c.fillText('👆 Crowds Gather', 5, 198);
  }
}

// =============================================
//  SCENE 5 — THE AMBUSH: HELLFIRE (78:21-30)
// =============================================
class Scene5 extends BaseScene {
  constructor() {
    super('canvas-5');
    this.clickZones = [
      { x: 0,   y: 0,   w: 140, h: CH,  key: 'hellfire' },
      { x: 420, y: 0,   w: 140, h: CH,  key: 'hellfire' },
      { x: 140, y: 80,  w: 280, h: 140, key: 'denial' },
    ];
  }
  draw() {
    const c = this.ctx, t = this.t;
    // Dark hellfire background
    c.fillStyle = '#100005'; c.fillRect(0, 0, CW, CH);
    // Lava glow at bottom
    const lava = c.createLinearGradient(0, 160, 0, CH);
    lava.addColorStop(0, 'rgba(200,40,0,0.4)');
    lava.addColorStop(1, 'rgba(255,80,0,0.7)');
    c.fillStyle = lava; c.fillRect(0, 160, CW, 60);

    // Fire walls left and right
    const drawFlame = (baseX, baseW, flameH, col1, col2) => {
      for (let i = 0; i < 6; i++) {
        const fx = baseX + i*(baseW/6);
        const fh = flameH + 15*Math.sin(t*0.08 + i*1.3);
        c.fillStyle = col1;
        c.beginPath(); c.moveTo(fx, 220); c.lineTo(fx + baseW/12, 220-fh*0.6); c.lineTo(fx + baseW/6, 220); c.closePath(); c.fill();
        c.fillStyle = col2;
        c.beginPath(); c.moveTo(fx + baseW/12, 220); c.lineTo(fx + baseW/12 + baseW/24, 220-fh*0.9); c.lineTo(fx + baseW/4, 220); c.closePath(); c.fill();
      }
    };
    drawFlame(0, 130, 160, '#c82000', '#ff6000');
    drawFlame(430, 130, 160, '#c82000', '#ff6000');

    // Prison bars (center)
    fillRect(c, 140, 20, 280, 4, '#5a4020');   // top bar
    fillRect(c, 140, 190, 280, 4, '#5a4020');  // bottom bar
    for (let i = 0; i < 8; i++) {
      fillRect(c, 148 + i*34, 20, 6, 174, '#4a3018');
    }

    // Trapped figures inside bars
    const figY = 110;
    this._pixelFigure(c, 200, figY, '#602020', '#d4a880');
    this._pixelFigure(c, 270, figY, '#602020', '#d4a880');
    this._pixelFigure(c, 340, figY, '#602020', '#d4a880');

    // Scalding water / ghassaq dripping from top
    c.strokeStyle = '#804000'; c.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      const drx = 175 + i*42;
      const dry = 24 + ((t*2 + i*30) % 80);
      c.beginPath(); c.moveTo(drx, 24); c.lineTo(drx-2, dry); c.stroke();
      // Drop tip
      c.fillStyle = '#602000'; c.beginPath(); c.arc(drx-2, dry, 4, 0, Math.PI*2); c.fill();
    }

    // Glow effect
    c.fillStyle = 'rgba(255,60,0,0.08)';
    for (let g = 0; g < 3; g++) c.fillRect(0, 0, CW, CH);

    // Labels
    const p5 = sceneP();
    c.fillStyle = p5.label; c.font = '7px monospace';
    c.fillText('👆 Hellfire Waits', 4, 14);
    c.fillText('👆 Trapped Transgressors', 144, 94);
    c.fillText('👆 Hellfire', 425, 14);
  }
}

// =============================================
//  SCENE 6 — GARDENS OF PARADISE (78:31-36)
// =============================================
class Scene6 extends BaseScene {
  constructor() {
    super('canvas-6');
    this.clickZones = [
      { x: 0,   y: 0,   w: 200, h: CH,  key: 'paradise' },
      { x: 200, y: 60,  w: 200, h: 160, key: 'paradise' },
      { x: 400, y: 0,   w: 160, h: CH,  key: 'paradise' },
    ];
  }
  draw() {
    const c = this.ctx, t = this.t;
    // Sky gradient — serene
    const sky = c.createLinearGradient(0, 0, 0, CH);
    sky.addColorStop(0, '#1a0848');
    sky.addColorStop(0.5, '#382080');
    sky.addColorStop(1, '#2a5030');
    c.fillStyle = sky; c.fillRect(0, 0, CW, CH);

    // Ground — lush green
    fillRect(c, 0, 155, CW, 65, '#1a4010');
    fillRect(c, 0, 155, CW, 8,  '#2a6018');

    // River / flowing water (center)
    const riverWave = 3*Math.sin(t*0.05);
    c.fillStyle = '#1a5880';
    c.beginPath();
    c.moveTo(180, 155); c.lineTo(180, 190);
    c.quadraticCurveTo(280+riverWave, 175, 380, 190);
    c.lineTo(380, 155); c.closePath(); c.fill();
    // Water sparkles
    for (let i = 0; i < 6; i++) {
      const sx = 200 + i*28 + 5*Math.sin(t*0.07 + i);
      c.fillStyle = 'rgba(150,200,255,0.6)';
      c.fillRect(sx, 165 + 2*Math.sin(t*0.08+i*0.5), 4, 2);
    }

    // Grape vine trees (left cluster)
    for (let i = 0; i < 3; i++) {
      const tx = 30 + i*52;
      fillRect(c, tx+8, 135, P*2, 24, '#5a3808');  // trunk
      // Vine leaves
      c.fillStyle = '#2a6010';
      c.beginPath(); c.arc(tx+12, 128, 18+2*Math.sin(t*0.04+i), 0, Math.PI*2); c.fill();
      c.fillStyle = '#3a8018';
      c.beginPath(); c.arc(tx+20, 122, 12, 0, Math.PI*2); c.fill();
      // Grapes
      c.fillStyle = '#6030a0';
      for (let g = 0; g < 5; g++) {
        c.beginPath(); c.arc(tx+6+g*5, 132+2*(g%2), 4, 0, Math.PI*2); c.fill();
      }
    }

    // Peaceful figures (center-right)
    this._pixelFigure(c, 310, 115, '#304880', '#f5d8b0');
    this._pixelFigure(c, 360, 115, '#304060', '#f5c8a0');
    // Cup
    fillRect(c, 294, 138, 12, 14, '#c8a000');
    fillRect(c, 292, 136, 16, 4, '#e8c030');

    // Garden trees (right)
    for (let i = 0; i < 2; i++) {
      const tx = 410 + i*60;
      fillRect(c, tx+8, 130, P*2, 28, '#4a2808');
      c.fillStyle = '#1a5010';
      c.beginPath(); c.arc(tx+12, 118, 22+3*Math.sin(t*0.03+i*2), 0, Math.PI*2); c.fill();
      c.fillStyle = '#3a7820';
      c.beginPath(); c.arc(tx+22, 112, 14, 0, Math.PI*2); c.fill();
      // Fruit
      c.fillStyle = '#c82020';
      c.beginPath(); c.arc(tx+8, 120, 5, 0, Math.PI*2); c.fill();
      c.beginPath(); c.arc(tx+20, 126, 4, 0, Math.PI*2); c.fill();
    }

    // Golden glow
    c.fillStyle = 'rgba(255,200,80,0.04)';
    for (let i = 0; i < 5; i++) c.fillRect(0,0,CW,CH);

    // Labels
    const p6 = sceneP();
    c.fillStyle = p6.label; c.font = '7px monospace';
    c.fillText('👆 Gardens & Vines', 5, 12);
    c.fillText('👆 Companions & Cup', 204, 74);
    c.fillText('👆 Thick Gardens', 404, 12);
  }
}

// =============================================
//  SCENE 7 — STANDING BEFORE THE LORD (78:37-38)
// =============================================
class Scene7 extends BaseScene {
  constructor() {
    super('canvas-7');
    this.clickZones = [
      { x: 0,   y: 40,  w: CW,  h: 80,  key: 'lord_of_all' },
      { x: 180, y: 20,  w: 200, h: 140, key: 'lord_of_all' },
      { x: 0,   y: 160, w: CW,  h: 60,  key: 'lord_of_all' },
    ];
  }
  draw() {
    const c = this.ctx, t = this.t;
    // Grand white-gold cosmic background
    const bg = c.createRadialGradient(CW/2, 0, 0, CW/2, 0, CH*1.5);
    bg.addColorStop(0, '#fff8e0');
    bg.addColorStop(0.3, '#d0c060');
    bg.addColorStop(0.7, '#604820');
    bg.addColorStop(1, '#200e00');
    c.fillStyle = bg; c.fillRect(0, 0, CW, CH);

    // Divine light rays from top center
    c.save();
    c.globalAlpha = 0.3 + 0.1*Math.sin(t*0.04);
    for (let i = 0; i < 12; i++) {
      const angle = (i/12)*Math.PI*2;
      c.fillStyle = '#fff8c0';
      c.beginPath();
      c.moveTo(CW/2, 0);
      c.lineTo(CW/2 + Math.cos(angle)*300, Math.sin(angle)*300);
      c.lineTo(CW/2 + Math.cos(angle + 0.1)*300, Math.sin(angle + 0.1)*300);
      c.closePath(); c.fill();
    }
    c.restore();

    // Angel rows (top area)
    // Row 1
    for (let i = 0; i < 10; i++) {
      this._pixelAngel(c, 10 + i*54, 50, '#d8d0ff');
    }
    // Row 2
    for (let i = 0; i < 10; i++) {
      this._pixelAngel(c, 10 + i*54, 90, '#c8c0f0');
    }

    // The Spirit — Jibreel (tall central figure, glowing)
    const jglow = 0.7 + 0.3*Math.sin(t*0.05);
    c.shadowBlur = 20; c.shadowColor = `rgba(255,240,180,${jglow})`;
    fillRect(c, 256, 28, P*4, P*4, '#fffde0'); // head (large)
    fillRect(c, 252, 44, P*6, P*6, '#e8e0c8'); // robe (wide)
    fillRect(c, 240, 34, P*3, P*3, '#f8f0d0'); // left wing
    fillRect(c, 272, 34, P*3, P*3, '#f8f0d0'); // right wing
    c.shadowBlur = 0;

    // Ground
    fillRect(c, 0, 170, CW, 50, '#1a1008');

    // Small human figures at bottom — humble, bowing
    for (let i = 0; i < 12; i++) {
      const hx = 15 + i*44;
      fillRect(c, hx+4, 158, P*2, P*2, '#f0c890'); // head
      fillRect(c, hx+2, 164, P*3, P*3, '#303880'); // body (bowed)
    }

    // Labels (dark text on golden bg — keep dark for readability)
    c.fillStyle = '#3a2800'; c.font = '7px monospace';
    c.fillText('👆 Angels in Rows', 4, 54);
    c.fillText('👆 The Spirit (Jibreel)', 184, 32);
    c.fillText('👆 Humble Humans', 4, 175);
  }
}

// =============================================
//  SCENE 8 — THE FINAL WARNING (78:39-40)
// =============================================
class Scene8 extends BaseScene {
  constructor() {
    super('canvas-8');
    this.clickZones = [
      { x: 0,   y: 0,   w: 240, h: CH,  key: 'final_warning' },
      { x: 240, y: 60,  w: 80,  h: 160, key: 'final_warning' },
      { x: 320, y: 0,   w: 240, h: CH,  key: 'final_warning' },
    ];
  }
  draw() {
    const c = this.ctx, t = this.t;
    // Split scene — darkness left, light right
    c.fillStyle = '#050110'; c.fillRect(0, 0, CW/2, CH);
    c.fillStyle = '#3a2800'; c.fillRect(CW/2, 0, CW/2, CH);

    // Left: darkness — dull stars, dust
    const p8 = sceneP();
    const seed = (n) => ((n*987654321)>>>0)/4294967296;
    for (let i = 0; i < 20; i++) {
      const sx = seed(i*3)*260, sy = seed(i*7)*CH;
      this._star(c, sx, sy, 1, 0.2);
    }
    fillRect(c, 0, 175, 260, 45, '#080310');
    // Thorns/rocks on dark side
    c.fillStyle = '#1a1020';
    c.beginPath(); c.moveTo(20,175); c.lineTo(40,145); c.lineTo(60,175); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(100,175); c.lineTo(115,155); c.lineTo(130,175); c.closePath(); c.fill();

    // Right: golden light from heaven
    const glow = 0.6 + 0.3*Math.sin(t*0.04);
    c.fillStyle = `rgba(255,180,0,${0.2+glow*0.1})`; c.fillRect(300, 0, 260, CH);
    // Radiating light
    for (let i = 0; i < 8; i++) {
      const angle = -Math.PI*0.7 + (i/8)*Math.PI*1.4;
      c.strokeStyle = `rgba(255,210,80,${0.3*glow})`; c.lineWidth = 4;
      c.beginPath(); c.moveTo(CW, 0); c.lineTo(CW + Math.cos(angle)*400, Math.sin(angle)*400); c.stroke();
    }
    fillRect(c, 300, 175, 260, 45, '#3a2808');
    // Garden path on light side
    fillRect(c, 370, 165, 80, 12, '#5a4010'); // path
    // Trees on right
    c.fillStyle = '#2a5010';
    c.beginPath(); c.arc(450, 140, 26, 0, Math.PI*2); c.fill();
    fillRect(c, 446, 158, 8, 20, '#5a3010');
    c.fillStyle = '#c82020'; c.beginPath(); c.arc(442, 132, 5, 0, Math.PI*2); c.fill();

    // Dividing path (center)
    fillRect(c, 256, 155, 48, 65, '#4a3810');
    fillRect(c, 268, 155, 24, 60, '#5a4818');

    // Figure at crossroads
    const figX = 268, figY = 120;
    this._pixelFigure(c, figX, figY, '#303880', '#f5d0a0');

    // Directional arrows
    c.fillStyle = '#ffaa00'; c.font = 'bold 20px serif';
    c.fillText('←', 200, 138); // pointing to darkness
    c.fillStyle = '#00ff88'; c.font = 'bold 20px serif';
    c.fillText('→', 345, 138); // pointing to light

    // Warning text
    c.fillStyle = '#ffaa00'; c.font = 'bold 8px monospace';
    c.textAlign = 'center';
    c.fillText('YAWM AL-HAQQ', CW/2, 28);
    c.fillText('THE DAY OF TRUTH', CW/2, 44);
    c.font = '7px monospace';
    c.fillText('⚠️ Punishment Near', CW/2, 56);
    c.textAlign = 'left';

    // Labels
    c.fillStyle = '#8888ff'; c.font = '7px monospace';
    c.fillText('Darkness', 80, 185);
    c.fillStyle = '#88ff88'; c.fillText('Path to Allah', 345, 185);
    c.fillStyle = p8.label; c.fillText('👆 Choose', 245, 72);
  }
}

// =============================================
//  SCENE MANAGER
// =============================================
const _scenes = {};

function initScenes() {
  [1,2,3,4,5,6,7,8].forEach(n => {
    const cls = [Scene1,Scene2,Scene3,Scene4,Scene5,Scene6,Scene7,Scene8][n-1];
    _scenes[n] = new cls();
  });
}

function startScene(n) {
  stopAllScenes();
  if (_scenes[n]) _scenes[n].start();
}

function stopAllScenes() {
  Object.values(_scenes).forEach(s => s && s.stop && s.stop());
}
