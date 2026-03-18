'use strict';
// =============================================
//  SURAH MUHAMMAD QUEST — scenes.js
// =============================================

const CW = 560, CH = 220, GY = 160, P = 4;

function fillRect(ctx, x, y, w, h, col) {
  if (col) ctx.fillStyle = col;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

// =============================================
//  VERSES
// =============================================
const VERSES = {
  two_paths: {
    ref: 'Muhammad 47:3',
    arabic: 'ذَٰلِكَ بِأَنَّ الَّذِينَ كَفَرُوا اتَّبَعُوا الْبَاطِلَ وَأَنَّ الَّذِينَ آمَنُوا اتَّبَعُوا الْحَقَّ مِن رَّبِّهِمْ',
    english: '"That is because those who disbelieve follow falsehood, and those who believe follow the truth from their Lord. Thus Allah presents to the people their comparisons." (47:3)',
    note: 'The divide is simple: Falsehood vs Truth. Those who follow Truth — Allah removes their bad deeds and improves their state. Those who follow falsehood — their deeds become worthless. Every daily choice is a micro-version of this fundamental choice.',
  },
  support_allah: {
    ref: 'Muhammad 47:7',
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ',
    english: '"O you who have believed — if you support Allah, He will support you and make your feet firm."',
    note: '"Supporting Allah" means following His commands, standing for truth, and helping His deen. When you do this sincerely, Allah gives you thabaat — firmness. The ground shakes but you don\'t fall. Hearts tremble but yours stays steady. This is the greatest support.',
  },
  deeds_worthless: {
    ref: 'Muhammad 47:1',
    arabic: 'الَّذِينَ كَفَرُوا وَصَدُّوا عَن سَبِيلِ اللَّهِ أَضَلَّ أَعْمَالَهُمْ',
    english: '"Those who disbelieve and avert from the way of Allah — He has made their deeds go astray (worthless)."',
    note: 'A person can work very hard and do many things — but without iman, it crumbles. The scholars say: a deed without iman is like a body without a soul. It moves but has no life. This is why iman — WHO you are doing it for — is the foundation of everything.',
  },
  history_lesson: {
    ref: 'Muhammad 47:10',
    arabic: 'أَفَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِن قَبْلِهِمْ',
    english: '"Have they not traveled through the earth and seen how was the end of those before them? Allah destroyed them, and for the disbelievers is something comparable."',
    note: 'Allah has preserved the ruins of past civilizations as a museum — a warning. The Pharaohs, Aad, Thamud. They were more powerful, built more, and thought they were invincible. Reflection on history is itself a Quranic act of worship: sair fi al-ard — traveling the earth with reflecting eyes.',
  },
  jannah_rivers: {
    ref: 'Muhammad 47:15',
    arabic: 'مَثَلُ الْجَنَّةِ الَّتِي وُعِدَ الْمُتَّقُونَ ۖ فِيهَا أَنْهَارٌ مِّن مَّاءٍ غَيْرِ آسِنٍ وَأَنْهَارٌ مِّن لَّبَنٍ لَّمْ يَتَغَيَّرْ طَعْمُهُ وَأَنْهَارٌ مِّنْ خَمْرٍ لَّذَّةٍ لِّلشَّارِبِينَ وَأَنْهَارٌ مِّنْ عَسَلٍ مُّصَفًّى',
    english: '"A description of Jannah promised to the righteous: rivers of water unaltered, rivers of milk of which the taste never changes, rivers of a drink delightful to those who drink, and rivers of purified honey."',
    note: 'Ibn Kathir says Jannah is everything the human heart desires — in perfected, eternal form. Water that never stales. Milk that never sours. Honey always pure. And the drink Allah made haram in this life due to its harm — in Jannah it is pure delight, no intoxication, no loss of mind. Meanwhile those in the Fire drink boiling water that tears their intestines.',
  },
  la_ilaha: {
    ref: 'Muhammad 47:19',
    arabic: 'فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ',
    english: '"So KNOW that there is no deity except Allah — and seek forgiveness for your sin and for the believing men and women."',
    note: '"Fa\'lam" — KNOW. The scholars say: knowledge (ilm) comes before action (amal). You cannot truly worship what you don\'t know. This verse is proof: first know the reality of لا إله إلا الله, then let that knowledge make you humble and push you to seek forgiveness. Knowing Allah\'s greatness is what creates humility.',
  },
  hearts_locked: {
    ref: 'Muhammad 47:24',
    arabic: 'أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا',
    english: '"Do they not then reflect deeply on the Quran? Or are there locks upon their hearts?"',
    note: 'Tadabbur means to sit with a verse and truly ask: What does this mean? What do I need to change? The locks on a heart are: arrogance, desires, love of this world, and not asking Allah to open them. Make this du\'a: "Allahuma iftah qalbi lil-Quran" — O Allah, open my heart to the Quran.',
  },
  obey_messenger: {
    ref: 'Muhammad 47:33',
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَلَا تُبْطِلُوا أَعْمَالَكُمْ',
    english: '"O you who have believed — obey Allah and obey the Messenger, and do not invalidate your deeds."',
    note: 'Obedience protects your deeds. A person can pray, fast, give charity — but if they deliberately disobey Allah and His Messenger ﷺ in other areas, those deeds can be wiped out. Consistency in obedience is how deeds stay protected and accepted.',
  },
  dunya_play: {
    ref: 'Muhammad 47:36',
    arabic: 'إِنَّمَا الْحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ ۚ وَإِن تُؤْمِنُوا وَتَتَّقُوا يُؤْتِكُمْ أُجُورَكُمْ',
    english: '"The life of this world is only play and amusement — if you believe and have taqwa, He will give you your rewards and will not ask you for your wealth."',
    note: 'This is not saying life is meaningless — it is saying it is SHORT. Like a game that ends. When it ends, the score is counted. The good news: He does NOT ask for all your wealth — He asks for iman and taqwa. And if you have those, your deeds are fully rewarded. Every prayer, every kindness, every moment of patience — counted.',
  },
  spend_verse: {
    ref: 'Muhammad 47:38',
    arabic: 'هَا أَنتُمْ هَٰؤُلَاءِ تُدْعَوْنَ لِتُنفِقُوا فِي سَبِيلِ اللَّهِ فَمِنكُم مَّن يَبْخَلُ ۖ وَمَن يَبْخَلْ فَإِنَّمَا يَبْخَلُ عَن نَّفْسِهِ ۚ وَاللَّهُ الْغَنِيُّ وَأَنتُمُ الْفُقَرَاءُ',
    english: '"You are those invited to spend in the cause of Allah — but among you are those who withhold. Whoever withholds only withholds against himself. Allah is the Free of need (Al-Ghani) while you are the needy."',
    note: 'SubhanAllah — the logic of sadaqah: when you give, the reward goes to your own akhirah. When you withhold, you harm yourself. Allah doesn\'t need a single cent — He is Al-Ghani, the Rich who depends on nothing. We are the fuqara — the poor who need His mercy. The final verse: "If you turn away, He will replace you with another people who will not be like you."',
  },
};

// =============================================
//  POPUP
// =============================================
function showVersePopup(v) {
  const p = document.getElementById('verse-popup');
  if (!p) return;
  document.getElementById('vp-ref').textContent    = v.ref;
  document.getElementById('vp-arabic').textContent = v.arabic;
  document.getElementById('vp-eng').textContent    = v.english;
  document.getElementById('vp-note').textContent   = v.note || '';
  p.classList.add('visible');
}
function hideVersePopup() {
  const p = document.getElementById('verse-popup');
  if (p) p.classList.remove('visible');
}

// =============================================
//  BASE SCENE
// =============================================
class BaseScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx  = this.canvas.getContext('2d');
    this.canvas.width  = CW;
    this.canvas.height = CH;
    this.t = 0;
    this.running = false;
    this.clickZones = [];
    this._bindClick();
  }
  _bindClick() {
    if (!this.canvas) return;
    this.canvas.style.cursor = 'pointer';
    this.canvas.addEventListener('click', e => {
      const r  = this.canvas.getBoundingClientRect();
      const cx = (e.clientX - r.left) * (CW / r.width);
      const cy = (e.clientY - r.top)  * (CH / r.height);
      for (const z of this.clickZones) {
        if (cx >= z.x && cx <= z.x + z.w && cy >= z.y && cy <= z.y + z.h) {
          const v = VERSES[z.key]; if (v) showVersePopup(v); return;
        }
      }
    });
  }
  start() {
    if (this.running) return;
    this.running = true;
    const step = () => { if (!this.running) return; this.t++; this.draw(); requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  stop() { this.running = false; }
  draw() {}
}

// =============================================
//  SCENE 1 — TWO PATHS (47:3)
// =============================================
class Scene1 extends BaseScene {
  constructor() {
    super('canvas-s1');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,      y: 0, w: CW*0.5, h: CH, key: 'deeds_worthless' },
      { x: CW*0.5, y: 0, w: CW*0.5, h: CH, key: 'two_paths'       },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Left — falsehood (dark red, crumbling deeds)
    ctx.fillStyle = '#1a0408'; fillRect(ctx, 0, 0, CW*0.5, CH);
    ctx.fillStyle = '#0a0204'; fillRect(ctx, 0, GY, CW*0.5, CH-GY);
    // Right — truth (dark blue-green, rising light)
    ctx.fillStyle = '#041408'; fillRect(ctx, CW*0.5, 0, CW*0.5, CH);
    ctx.fillStyle = '#021008'; fillRect(ctx, CW*0.5, GY, CW*0.5, CH-GY);

    // LEFT: disbeliever figure + crumbling deed particles falling
    const lx = CW*0.25 - 8;
    ctx.fillStyle = '#6a2020'; fillRect(ctx, lx, 95, 16, 28); fillRect(ctx, lx+2, 79, 12, 14);
    // crumbling particles
    for (let i = 0; i < 10; i++) {
      const py = ((this.t * 0.5 + i * 22) % 120) + 25;
      const px = lx - 12 + (i % 5) * 14;
      const a  = 0.6 - (py - 25) / 120;
      ctx.fillStyle = `rgba(200,50,50,${Math.max(0,a)})`;
      fillRect(ctx, px, py, 4, 4);
    }
    ctx.fillStyle = '#ff6666'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('FALSEHOOD', CW*0.25, 165);
    ctx.fillStyle = '#aa4444'; ctx.font = '7px sans-serif';
    ctx.fillText('Deeds crumble ↓', CW*0.25, 180);
    ctx.fillStyle = '#ffaaaa'; ctx.font = '7px sans-serif';
    ctx.fillText('(click)', CW*0.25, CH-8);

    // RIGHT: believer figure + rising golden deeds
    const rx = CW*0.75 - 8;
    const glow = 0.3 + 0.2 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,215,0,${glow})`; ctx.beginPath(); ctx.arc(rx+8, 108, 30, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#a0d080'; fillRect(ctx, rx, 95, 16, 28); fillRect(ctx, rx+2, 79, 12, 14);
    // rising particles
    for (let i = 0; i < 10; i++) {
      const py = 130 - ((this.t * 0.5 + i * 22) % 110);
      const px = rx - 10 + (i % 5) * 12;
      const a  = 0.4 + 0.4 * Math.sin(this.t * 0.04 + i);
      ctx.fillStyle = `rgba(255,215,0,${a})`; fillRect(ctx, px, py, 4, 4);
    }
    ctx.fillStyle = '#88ff88'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('TRUTH', CW*0.75, 165);
    ctx.fillStyle = '#44cc44'; ctx.font = '7px sans-serif';
    ctx.fillText('Deeds rise ↑', CW*0.75, 180);
    ctx.fillStyle = '#aaffaa'; ctx.font = '7px sans-serif';
    ctx.fillText('(click)', CW*0.75, CH-8);

    // Divider
    ctx.strokeStyle = '#ffffff22'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(CW*0.5, 0); ctx.lineTo(CW*0.5, CH); ctx.stroke();
    // Label
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, 2, 200, 16);
    ctx.fillStyle = '#ffaaaa'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('LEFT = falsehood  RIGHT = truth', 6, 13);
  }
}

// =============================================
//  SCENE 2 — SUPPORT ALLAH (47:7)
// =============================================
class Scene2 extends BaseScene {
  constructor() {
    super('canvas-s2');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0, y: 0, w: CW, h: CH, key: 'support_allah' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = '#100808'; fillRect(ctx, 0, 0, CW, CH*0.65);
    ctx.fillStyle = '#3a2818'; fillRect(ctx, 0, CH*0.65, CW, CH*0.35);
    // Ground cracking
    ctx.strokeStyle = '#2a1008'; ctx.lineWidth = 2;
    for (let c = 0; c < 4; c++) {
      ctx.beginPath(); ctx.moveTo(150+c*80, CH*0.68); ctx.lineTo(170+c*80, CH*0.75); ctx.lineTo(155+c*80, CH*0.82); ctx.stroke();
    }
    // Central figure — standing firm
    const fx = CW/2 - 8, fy = 100;
    const glow = 0.5 + 0.35 * Math.sin(this.t * 0.04);
    // Light from above
    for (let r = 0; r < 6; r++) {
      const angle = -Math.PI/2 + (r - 2.5) * 0.18;
      ctx.strokeStyle = `rgba(255,215,0,${0.15 + glow * 0.08})`; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(CW/2, 0); ctx.lineTo(CW/2 + Math.cos(angle)*180, CH*0.65); ctx.stroke();
    }
    ctx.fillStyle = `rgba(255,215,0,${glow * 0.3})`;
    ctx.beginPath(); ctx.arc(CW/2, fy+14, 48, 0, Math.PI*2); ctx.fill();
    // Figure
    ctx.fillStyle = '#c8a870'; fillRect(ctx, fx, fy, 16, 28); fillRect(ctx, fx+2, fy-16, 12, 14);
    // Roots growing from feet
    const rootDepth = Math.min(50, Math.floor(this.t / 3));
    ctx.strokeStyle = '#a07040'; ctx.lineWidth = 2;
    for (let r = 0; r < 4; r++) {
      const angle = Math.PI/2 + (r - 1.5) * 0.35;
      const len   = rootDepth + Math.sin(this.t * 0.03 + r) * 6;
      ctx.beginPath(); ctx.moveTo(fx+8, fy+28);
      ctx.lineTo(fx+8 + Math.cos(angle)*len, fy+28 + Math.sin(angle)*len); ctx.stroke();
    }
    // "THABAAT" label
    ctx.fillStyle = `rgba(255,215,0,${glow})`;
    ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('FIRM FEET — ثَبِّتْ أَقْدَامَكُمْ', CW/2, 24);
    ctx.fillStyle = '#ffcc88'; ctx.font = '7px sans-serif';
    ctx.fillText('Click anywhere', CW/2, CH-8);
    // Stars
    [[40,20],[520,15],[100,40],[450,35],[280,8]].forEach(([sx,sy],i) => {
      const br = 0.3 + 0.5 * Math.sin(this.t * 0.03 + i*1.4);
      ctx.fillStyle = `rgba(255,250,200,${br})`; fillRect(ctx, sx, sy, 2, 2);
    });
  }
}

// =============================================
//  SCENE 3 — HISTORY LESSON (47:10)
// =============================================
class Scene3 extends BaseScene {
  constructor() {
    super('canvas-s3');
    if (!this.canvas) return;
    this.clickZones = [{ x: 0, y: 0, w: CW, h: CH, key: 'history_lesson' }];
  }
  draw() {
    const ctx = this.ctx;
    // Desert sky
    const skyGrad = ctx.createLinearGradient(0,0,0,CH);
    skyGrad.addColorStop(0,'#1a0e08'); skyGrad.addColorStop(1,'#4a3820');
    ctx.fillStyle = skyGrad; fillRect(ctx, 0, 0, CW, CH);
    ctx.fillStyle = '#8a6030'; fillRect(ctx, 0, 150, CW, 70);
    // Sand dunes
    ctx.fillStyle = '#a07840';
    ctx.beginPath(); ctx.moveTo(0,155); ctx.bezierCurveTo(100,135,200,165,300,145); ctx.bezierCurveTo(400,125,500,155,CW,150); ctx.lineTo(CW,CH); ctx.lineTo(0,CH); ctx.closePath(); ctx.fill();

    // Crumbling ruins (pixel art pillars)
    const pillars = [[60,80,20,70],[140,50,18,100],[250,65,22,85],[360,40,20,110],[460,70,18,80],[520,55,16,95]];
    pillars.forEach(([px,py,pw,ph],i) => {
      const crack = Math.floor(this.t / 80 + i) % 3;
      ctx.fillStyle = crack === 0 ? '#6a5030' : crack === 1 ? '#5a4020' : '#4a3010';
      fillRect(ctx, px, py, pw, ph);
      // crack line
      if (crack > 0) {
        ctx.strokeStyle = '#2a1808'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(px+pw/2, py); ctx.lineTo(px+pw/2+4, py+ph/2); ctx.lineTo(px+pw/2, py+ph); ctx.stroke();
      }
    });
    // Dust particles blowing
    for (let d = 0; d < 8; d++) {
      const dx = ((this.t * 0.8 + d * 70) % CW);
      const dy = 120 + d * 6;
      ctx.fillStyle = `rgba(180,140,60,0.2)`; fillRect(ctx, dx, dy, 8, 3);
    }
    // Traveling figure (small, on right)
    const walkX = CW - 100 + Math.sin(this.t * 0.02) * 5;
    ctx.fillStyle = '#c8a870'; fillRect(ctx, walkX, 128, 12, 20); fillRect(ctx, walkX+1, 116, 10, 10);

    const alpha = 0.5 + 0.4 * Math.sin(this.t * 0.025);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 9px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('أَفَلَمْ يَسِيرُوا فِي الْأَرْضِ', CW/2, 22);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffcc88'; ctx.font = '7px sans-serif';
    ctx.fillText('"Have they not traveled the earth?" — Click', CW/2, 36);
  }
}

// =============================================
//  SCENE 4 — RIVERS OF JANNAH (47:15)
// =============================================
class Scene4 extends BaseScene {
  constructor() {
    super('canvas-s4');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0, y: 0,    w: CW, h: CH*0.27, key: 'jannah_rivers' },
      { x: 0, y: CH*0.27, w: CW, h: CH*0.27, key: 'jannah_rivers' },
      { x: 0, y: CH*0.54, w: CW, h: CH*0.23, key: 'jannah_rivers' },
      { x: 0, y: CH*0.77, w: CW, h: CH*0.23, key: 'jannah_rivers' },
    ];
    this.riverCols = [
      { bank: '#0a3a10', water: '#2060c0', label: '💧 WATER (Unaltered)',    wc: '#4080e0' },
      { bank: '#1a3010', water: '#e0e0c0', label: '🥛 MILK (Never Changes)', wc: '#fffff0' },
      { bank: '#2a3010', water: '#c08020', label: '🍯 HONEY (Purified)',     wc: '#d4a030' },
      { bank: '#1a2808', water: '#7030a0', label: '🍷 PURE DRINK (Delight)', wc: '#9040c0' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    const rH = Math.floor(CH / 4);
    this.riverCols.forEach((r, i) => {
      const ry = i * rH;
      ctx.fillStyle = r.bank; fillRect(ctx, 0, ry, CW, rH);
      // River body
      ctx.fillStyle = r.water; fillRect(ctx, 0, ry + 6, CW, rH - 12);
      // Flow ripples
      for (let rx = 0; rx < CW; rx += 3) {
        const wy  = ry + 8 + Math.sin((rx + this.t * 1.5) * 0.06) * 3;
        const wa  = 0.15 + 0.15 * Math.sin((rx + this.t*2) * 0.08);
        ctx.fillStyle = `rgba(255,255,255,${wa})`; fillRect(ctx, rx, wy, 2, 2);
      }
      // Label
      ctx.fillStyle = '#fff'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(r.label, 10, ry + rH - 8);
      ctx.fillStyle = '#ffd700'; ctx.font = '7px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('(click)', CW - 10, ry + rH - 8);
    });
    // Header glow
    const a = 0.5 + 0.4 * Math.sin(this.t * 0.03);
    ctx.globalAlpha = a;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 8px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('JANNAH — 4 RIVERS', CW/2, 12);
    ctx.globalAlpha = 1;
  }
}

// =============================================
//  SCENE 5 — LA ILAHA ILLALLAH (47:19)
// =============================================
class Scene5 extends BaseScene {
  constructor() {
    super('canvas-s5');
    if (!this.canvas) return;
    this.clickZones = [{ x: 0, y: 0, w: CW, h: CH, key: 'la_ilaha' }];
  }
  draw() {
    const ctx = this.ctx;
    // Deep night sky
    const grad = ctx.createLinearGradient(0,0,0,CH);
    grad.addColorStop(0,'#03000a'); grad.addColorStop(1,'#0e0820');
    ctx.fillStyle = grad; fillRect(ctx, 0, 0, CW, CH);
    ctx.fillStyle = '#0a1808'; fillRect(ctx, 0, CH*0.75, CW, CH*0.25);

    // Stars
    [[50,25],[120,15],[200,35],[320,10],[430,20],[510,30],[80,55],[250,48],[400,52],[530,45],[160,8],[480,8]].forEach(([sx,sy],i) => {
      const br = 0.3 + 0.6 * Math.abs(Math.sin(this.t * 0.025 + i * 1.6));
      ctx.fillStyle = `rgba(220,215,255,${br})`; fillRect(ctx, sx, sy, i%4===0?3:2, i%4===0?3:2);
    });

    // لا إله إلا الله lighting up star-by-star
    const kalimaParts = ['لَا', 'إِلَٰهَ', 'إِلَّا', 'اللَّهُ'];
    const kalimaPosX  = [110, 220, 330, 445];
    const visCount    = Math.min(kalimaParts.length, Math.floor(this.t / 55));
    for (let w = 0; w < visCount; w++) {
      const glow = 0.7 + 0.3 * Math.sin(this.t * 0.04 + w);
      ctx.globalAlpha = glow;
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 20px "Amiri", serif'; ctx.textAlign = 'center';
      ctx.fillText(kalimaParts[w], kalimaPosX[w], 55);
    }
    ctx.globalAlpha = 1;

    // Faint glow arc above the text
    if (visCount === 4) {
      const rGlow = 0.06 + 0.04 * Math.sin(this.t * 0.03);
      ctx.fillStyle = `rgba(255,215,0,${rGlow})`; ctx.beginPath(); ctx.ellipse(CW/2, 50, 230, 40, 0, Math.PI, 0); ctx.fill();
    }

    // Figure below in contemplation
    const figX = CW/2 - 8, figY = 140;
    ctx.fillStyle = '#c8a870'; fillRect(ctx, figX, figY, 16, 28); fillRect(ctx, figX+2, figY-16, 12, 14);
    // gaze upward (head tilted)
    const eyeGlow = 0.4 + 0.3 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,215,0,${eyeGlow})`; ctx.beginPath(); ctx.arc(figX+8, figY-10, 4, Math.PI, 0); ctx.fill();

    // "fa'lam" label
    ctx.fillStyle = '#c8b0ff'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('فَاعْلَمْ — KNOW first, then act', CW/2, 75);
    ctx.fillStyle = '#aaa'; ctx.font = '7px sans-serif';
    ctx.fillText('Click anywhere', CW/2, CH-8);
  }
}

// =============================================
//  SCENE 6 — LOCKED HEARTS (47:24)
// =============================================
class Scene6 extends BaseScene {
  constructor() {
    super('canvas-s6');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,       y: 0, w: CW*0.45, h: CH, key: 'hearts_locked'   },
      { x: CW*0.55, y: 0, w: CW*0.45, h: CH, key: 'obey_messenger'  },
    ];
  }
  _drawHeart(ctx, cx, cy, size, col) {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.3);
    ctx.bezierCurveTo(cx - size, cy - size * 0.2, cx - size, cy + size * 0.7, cx, cy + size * 1.3);
    ctx.bezierCurveTo(cx + size, cy + size * 0.7, cx + size, cy - size * 0.2, cx, cy + size * 0.3);
    ctx.fill();
  }
  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = '#100408'; fillRect(ctx, 0, 0, CW, CH);

    // LEFT: Locked heart
    const hx = 145, hy = 85;
    this._drawHeart(ctx, hx, hy, 30, '#5a0a18');
    this._drawHeart(ctx, hx, hy, 22, '#3a0810');
    // Chains
    ctx.strokeStyle = '#888'; ctx.lineWidth = 2;
    for (let c = 0; c < 3; c++) {
      const angle = c * Math.PI * 0.5 + Math.PI * 0.25;
      for (let s = 0; s < 5; s++) {
        ctx.beginPath();
        ctx.arc(hx + Math.cos(angle)*(30+s*10), hy+30 + Math.sin(angle)*(15+s*8), 5, 0, Math.PI*2); ctx.stroke();
      }
    }
    // Padlock
    ctx.fillStyle = '#888'; fillRect(ctx, hx-12, hy+14, 24, 18);
    ctx.fillStyle = '#555'; fillRect(ctx, hx-8, hy+12, 16, 6);
    ctx.fillStyle = '#aaa'; fillRect(ctx, hx-6, hy+20, 12, 8);
    ctx.fillStyle = '#ff4444'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('أَقْفَالُهَا', hx, 155);
    ctx.fillText('"Locks on', hx, 168); ctx.fillText('their hearts"', hx, 180);
    ctx.fillStyle = '#ffaaaa'; ctx.font = '7px sans-serif';
    ctx.fillText('(click)', hx, CH-8);

    // Light bouncing off locked heart
    const bounce = 0.3 + 0.3 * Math.abs(Math.sin(this.t * 0.05));
    ctx.fillStyle = `rgba(255,215,0,${bounce})`; fillRect(ctx, 135, 60, 20, 8);
    ctx.fillStyle = `rgba(255,215,0,${bounce * 0.5})`; fillRect(ctx, 80, 50, 14, 6);

    // RIGHT: Open Quran with light
    const qx = 380, qy = 75;
    const qGlow = 0.4 + 0.3 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,215,0,${qGlow * 0.25})`; ctx.beginPath(); ctx.arc(qx, qy+20, 55, 0, Math.PI*2); ctx.fill();
    // Quran pages
    ctx.fillStyle = '#e8dcc0'; fillRect(ctx, qx-30, qy, 30, 40);
    ctx.fillStyle = '#f0e8c8'; fillRect(ctx, qx,    qy, 30, 40);
    // Text lines
    for (let ln = 0; ln < 5; ln++) {
      ctx.fillStyle = '#8a7040';
      fillRect(ctx, qx-26, qy+6+ln*6, 22, 2);
      fillRect(ctx, qx+4,  qy+6+ln*6, 22, 2);
    }
    // Light rays from Quran
    ctx.globalAlpha = 0.08 + 0.06 * Math.sin(this.t * 0.04);
    ctx.fillStyle = '#ffd700';
    for (let r = 0; r < 6; r++) {
      const angle = (r/6)*Math.PI*2 + this.t*0.005;
      ctx.beginPath(); ctx.moveTo(qx, qy+20); ctx.lineTo(qx+Math.cos(angle)*110, qy+20+Math.sin(angle)*70); ctx.lineTo(qx+Math.cos(angle+0.2)*110, qy+20+Math.sin(angle+0.2)*70); ctx.closePath(); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffd700'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('القرآن الكريم', qx, 155); ctx.fillText('"Reflect on the', qx, 168); ctx.fillText('Quran"', qx, 180);
    ctx.fillStyle = '#ffeebb'; ctx.font = '7px sans-serif';
    ctx.fillText('(click)', qx, CH-8);

    // Divider
    ctx.strokeStyle = '#ffffff18'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(CW*0.5, 0); ctx.lineTo(CW*0.5, CH); ctx.stroke();
  }
}

// =============================================
//  SCENE 7 — DUNYA VS AKHIRAH (47:36)
// =============================================
class Scene7 extends BaseScene {
  constructor() {
    super('canvas-s7');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,       y: 0, w: CW*0.5, h: CH, key: 'dunya_play'  },
      { x: CW*0.5,  y: 0, w: CW*0.5, h: CH, key: 'spend_verse' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Phase: dunya fades (0-100%), akhirah glows
    const phase = (this.t % 300) / 300;
    const dunyaAlpha  = 1 - phase;        // 1 → 0 (fades)
    const akhirahAlpha = phase;           // 0 → 1 (grows)

    // LEFT — Dunya (glittery then gray)
    ctx.fillStyle = '#181008'; fillRect(ctx, 0, 0, CW*0.5, CH);
    // Gold sparkles (fade to gray)
    for (let s = 0; s < 16; s++) {
      const sx  = 20 + s * 17;
      const sy  = 40 + Math.sin(s * 0.8) * 30;
      const col = dunyaAlpha > 0.3 ? `rgba(255,215,0,${0.5 * dunyaAlpha})` : `rgba(150,150,150,${0.3})`;
      ctx.fillStyle = col; fillRect(ctx, sx, sy, 4, 4);
    }
    // Dunya items: coins, toy
    ctx.globalAlpha = Math.max(0.2, dunyaAlpha);
    ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('💰', 100, 100); ctx.fillText('🎮', 150, 130); ctx.fillText('👑', 75, 130);
    ctx.globalAlpha = 1;
    ctx.fillStyle = dunyaAlpha > 0.4 ? '#ffd700' : '#666';
    ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('DUNYA', CW*0.25, 170); ctx.fillText('لَعِبٌ وَلَهْوٌ', CW*0.25, 184);
    ctx.fillStyle = '#ffaaaa'; ctx.font = '7px sans-serif';
    ctx.fillText('(click)', CW*0.25, CH-8);

    // RIGHT — Akhirah (grows brighter)
    ctx.fillStyle = '#080e08'; fillRect(ctx, CW*0.5, 0, CW*0.5, CH);
    // Growing light
    const glow = 0.1 + akhirahAlpha * 0.4 + 0.1 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,215,0,${glow * 0.4})`; ctx.beginPath(); ctx.arc(CW*0.75, 105, 60, 0, Math.PI*2); ctx.fill();
    // Figure in prayer
    const pf = CW*0.75 - 8;
    ctx.fillStyle = '#c8a870'; fillRect(ctx, pf, 100, 16, 28); fillRect(ctx, pf+2, 84, 12, 14);
    // raised hands
    fillRect(ctx, pf-12, 102, 12, 5); fillRect(ctx, pf+16, 102, 12, 5);
    ctx.globalAlpha = 0.3 + akhirahAlpha * 0.6;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 10px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('الآخرة', CW*0.75, 30);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#88ff88'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('AKHIRAH', CW*0.75, 170); ctx.fillText('The Real Reward', CW*0.75, 184);
    ctx.fillStyle = '#aaffaa'; ctx.font = '7px sans-serif';
    ctx.fillText('(click)', CW*0.75, CH-8);

    // Divider
    ctx.strokeStyle = '#ffffff18'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(CW*0.5, 0); ctx.lineTo(CW*0.5, CH); ctx.stroke();
  }
}

// =============================================
//  SCENE 8 — SPEND IN ALLAH'S WAY (47:38)
// =============================================
class Scene8 extends BaseScene {
  constructor() {
    super('canvas-s8');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,      y: 0, w: CW*0.45, h: CH, key: 'spend_verse' },
      { x: CW*0.55, y: 0, w: CW*0.45, h: CH, key: 'spend_verse' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = '#0e0608'; fillRect(ctx, 0, 0, CW, CH);
    ctx.fillStyle = '#2a1808'; fillRect(ctx, 0, CH*0.68, CW, CH*0.32);

    // Scale beam (centre)
    const bx = CW/2, by = 90;
    ctx.fillStyle = '#8a6030'; fillRect(ctx, bx-2, by, 4, 60);
    fillRect(ctx, bx-55, by-2, 110, 4);
    // Fulcrum
    ctx.beginPath(); ctx.moveTo(bx-12, by+60); ctx.lineTo(bx+12, by+60); ctx.lineTo(bx, by+75); ctx.closePath(); ctx.fill();

    // Giving scale (left) — goes UP when t is in certain phase
    const tilt = Math.sin(this.t * 0.025) * 14;
    const lsy  = by - 2 + tilt;  // left side goes up = negative
    const rsy  = by - 2 - tilt;  // right goes down
    ctx.strokeStyle = '#8a6030'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(bx-55, by-2); ctx.lineTo(bx-55, lsy+25); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx+55, by-2); ctx.lineTo(bx+55, rsy+25); ctx.stroke();
    // Pans
    ctx.fillStyle = '#a07840'; fillRect(ctx, bx-75, lsy+25, 40, 6);
    ctx.fillStyle = '#a07840'; fillRect(ctx, bx+35, rsy+25, 40, 6);
    // Coins on giving pan (more coins = higher = lighter)
    for (let c = 0; c < 4; c++) { ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(bx-65+c*10, lsy+22, 5, 0, Math.PI*2); ctx.fill(); }
    // Empty right pan (withholding)
    ctx.fillStyle = '#444'; ctx.beginPath(); ctx.arc(bx+55, rsy+21, 6, 0, Math.PI*2); ctx.fill();

    // LEFT HAND — giving (open)
    ctx.fillStyle = '#c8a870'; fillRect(ctx, bx-90, 120, 22, 16);
    for (let f = 0; f < 4; f++) fillRect(ctx, bx-88+f*6, 112, 4, 12);
    // gold falling from hand
    for (let g = 0; g < 3; g++) {
      const gy2 = 130 + (this.t * 0.4 + g*25) % 40;
      ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(bx-80+g*8, gy2, 3, 0, Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('GIVING', bx-70, 175); ctx.fillText('↑ Scale rises', bx-70, 187);

    // RIGHT HAND — clenched fist
    ctx.fillStyle = '#c8a870'; fillRect(ctx, bx+60, 120, 20, 20);
    for (let f = 0; f < 4; f++) { ctx.fillStyle = '#b89060'; fillRect(ctx, bx+62+f*4, 112, 5, 10); }
    ctx.fillStyle = '#ff6666'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('WITHHOLDING', bx+68, 175);
    ctx.fillStyle = '#ffeebb'; ctx.font = '7px sans-serif';
    ctx.fillText('"Stingy against himself"', bx+68, 187);

    // "Allah is Al-Ghani"
    const ag = 0.5 + 0.4 * Math.sin(this.t * 0.03);
    ctx.globalAlpha = ag;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 9px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('اللَّهُ الْغَنِيُّ وَأَنتُمُ الْفُقَرَاءُ', CW/2, 22);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#aaa'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Click either side', CW/2, CH-8);
  }
}

// =============================================
//  SCENE REGISTRY
// =============================================
const scenes = {};

function initScenes() {
  scenes.s1 = new Scene1(); scenes.s2 = new Scene2();
  scenes.s3 = new Scene3(); scenes.s4 = new Scene4();
  scenes.s5 = new Scene5(); scenes.s6 = new Scene6();
  scenes.s7 = new Scene7(); scenes.s8 = new Scene8();
}
function startScene(n)   { const s = scenes[`s${n}`]; if (s) s.start(); }
function stopAllScenes() { Object.values(scenes).forEach(s => s && s.stop && s.stop()); }
