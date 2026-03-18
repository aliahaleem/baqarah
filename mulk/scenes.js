'use strict';
// =============================================
//  SURAH AL-MULK QUEST — scenes.js
// =============================================

const CW = 560, CH = 220, P = 4;

// --- THEME PALETTE ---
function sceneP() {
  const s = document.documentElement.dataset.theme === 'stars';
  return s ? {
    sky0:    '#203068', sky1:    '#2c3e80', sky2:    '#384c96',
    gnd:     '#4458a4', gndAcc:  '#5468b4',
    starStr: 'rgba(190,200,255,',
    acStr:   'rgba(216,192,96,',
    label:   '#d8c060',
    hint:    '#b8a848',
  } : {
    sky0:    '#010208', sky1:    '#020414', sky2:    '#030618',
    gnd:     '#1a2808', gndAcc:  '#2a3a10',
    starStr: 'rgba(200,220,255,',
    acStr:   'rgba(255,215,0,',
    label:   '#8898cc',
    hint:    '#aaa',
  };
}

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

// =============================================
//  VERSES
// =============================================
const VERSES = {
  sovereignty: {
    ref: 'Al-Mulk 67:1-2',
    arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ۩ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا',
    english: '"Blessed is He in whose hand is dominion (al-mulk) — and He is over all things competent. Who created death and life to test you [as to] which of you is best in deed."',
    note: '"Tabaraka" — a word used only for Allah in the Quran, meaning He is Blessed in the most exalted sense. He holds all dominion. Then: He created DEATH and LIFE as a test. Note: death is mentioned before life — because death is the destination that gives life its meaning. The test is "ahsanu amala" — not MOST deeds, but BEST deeds. Quality over quantity.',
  },
  perfect_heavens: {
    ref: 'Al-Mulk 67:3-4',
    arabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ',
    english: '"He who created seven heavens in layers — you see no inconsistency in the creation of the Most Merciful. So return your vision — do you see any breaks? Then return your vision twice again — your sight will return to you humbled while it is fatigued."',
    note: 'Allah challenges: Look at My creation. Look again. And again. Do you find a single flaw? From the quantum level to the cosmic scale — perfectly ordered, balanced, consistent. No breaks. No errors. Every time science looks deeper, it finds more perfection. And what happens to your vision when you try? It returns "khasi\'an" — humbled, exhausted. The creation testifies to its Creator.',
  },
  stars_guards: {
    ref: 'Al-Mulk 67:5',
    arabic: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ',
    english: '"And We have adorned the nearest heaven with lamps (stars) and have made them as missiles to drive away the devils, and We have prepared for them the punishment of the Blaze."',
    note: 'Stars serve two purposes: beauty and protection. They beautify the nearest heaven for us to gaze upon — and are used to repel devils who try to ascend and overhear the heavenly realm. Ibn Kathir explains that shooting stars are the "ruujum" — the missiles — that chase these devils. Two gifts in one verse: beauty and security.',
  },
  hellfire_guards: {
    ref: 'Al-Mulk 67:8-9',
    arabic: 'تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ ۖ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ',
    english: '"It almost bursts with rage. Every time a group is thrown into it, its keepers ask them: Did no warner come to you?"',
    note: 'The guardians of Hellfire ask every group thrown in: "Did no warner come to you?" Not to inform them — Allah knows. But to establish the proof. Every person had a warning: the Quran, the Prophet ﷺ, the fitrah (natural conscience), the countless signs in creation. No one enters the Fire without having first received a warning. This is the justice of Allah.',
  },
  confession: {
    ref: 'Al-Mulk 67:10-11',
    arabic: 'وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ',
    english: '"And they will say: If only we had been listening or reasoning, we would not be among the companions of the Blaze. So they acknowledge their sin — but far removed from mercy are the companions of the Blaze."',
    note: 'Two things they wish they had used: HEARING (sam\'a) — listening to the message. REASON (\'aql) — thinking it through. Both were given to them. Both were neglected. This confession comes too late. Today, while we are alive, both hearing and reason are still available to us. The question is: are we using them to reflect, understand, and submit?',
  },
  fear_secret: {
    ref: 'Al-Mulk 67:12',
    arabic: 'إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ',
    english: '"Indeed, those who fear their Lord in the unseen (bil-ghayb) — for them is forgiveness and a great reward."',
    note: '"Khashyat al-ghayb" — fearing Allah when no one is watching. No camera, no teacher, no parents. In those moments when you COULD do something wrong and no one would know — do you still choose right? That is the truest measure of iman. The reward: forgiveness AND a great reward. Not just reward — FORGIVENESS first. SubhanAllah.',
  },
  knows_all: {
    ref: 'Al-Mulk 67:13-14',
    arabic: 'أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ',
    english: '"Does He who created not know? While He is the Subtle, the Acquainted (Al-Latif, Al-Khabir). And whether you conceal your speech or make it known — He is Knowing of what is within the chests."',
    note: '"Does He who CREATED not know?" — one of the most logical proofs in the Quran. Who knows a machine better than its maker? Allah created the human heart — every thought, every hidden feeling. Al-Latif (The Subtle, who knows every fine detail) and Al-Khabir (The All-Acquainted) — these two Names are the answer to every "no one will ever know."',
  },
  earth_gift: {
    ref: 'Al-Mulk 67:15',
    arabic: 'هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ ۖ وَإِلَيْهِ النُّشُورُ',
    english: '"He is the One who made the earth tame (dhalul) for you — so walk through its slopes and eat of His provision. And to Him is the resurrection."',
    note: '"Dhalul" — tame, submissive. The earth does not fight against you. It grows food, holds mountains stable, maintains atmosphere. This is not accidental — Allah made it this way FOR you. Walk through it, benefit from it, eat from it. Everything you eat is His rizq. Then the reminder: "and to Him is the resurrection." Enjoy the earth — but remember where you are going.',
  },
  birds_tawakkul: {
    ref: 'Al-Mulk 67:19',
    arabic: 'أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ ۚ إِنَّهُ بِكُلِّ شَيْءٍ بَصِيرٌ',
    english: '"Have they not seen the birds above them — spreading their wings and contracting them? None holds them up except the Most Merciful (ar-Rahman). Indeed He is, of all things, Seeing."',
    note: 'The birds spread their wings — and physics says they should fall. But they don\'t. "Ma yumsikuhunna illa ar-Rahman" — NOTHING holds them except the Most Merciful. Every moment of flight is His direct sustenance. This verse teaches tawakkul: spread your wings, do your work, strive — and trust that it is ONLY Allah holding everything up. You are never truly in control. He is.',
  },
  who_helps: {
    ref: 'Al-Mulk 67:20-21',
    arabic: 'أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ الرَّحْمَٰنِ ۚ إِنِ الْكَافِرُونَ إِلَّا فِي غُرُورٍ',
    english: '"Or who is it that could be an army for you to aid you other than the Most Merciful? The disbelievers are not but in delusion. Or who is it that could provide for you if He withheld His provision?"',
    note: 'Two of the most powerful rhetorical questions in the Quran: WHO will help you if not Allah? WHO will feed you if not Allah? No one. When we run to others for help before running to Allah — that is the delusion (ghurur) mentioned here. True security, true provision, true protection — all exclusively from ar-Rahman.',
  },
  water_verse: {
    ref: 'Al-Mulk 67:30',
    arabic: 'قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ',
    english: '"Say: Have you considered — if your water was to become sunken into the earth, who then could bring you flowing water (ma\'in ma\'in)?"',
    note: 'The very last verse ends with the most fundamental question: water. Life cannot exist without it. And it is entirely in Allah\'s hands. "Ma\'in ma\'in" — flowing, fresh water. The repetition emphasizes the extreme need. Turn on a tap — that is Allah\'s mercy. Every drop of rain — Allah\'s mercy. This is how the Surah of Sovereignty ends: with the most basic reminder of total dependence on the Most Merciful.',
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
    if (this.running) return; this.running = true;
    const step = () => { if (!this.running) return; this.t++; this.draw(); requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  stop() { this.running = false; }
  draw() {}
}

// =============================================
//  SCENE 1 — AL-MULK SOVEREIGNTY (67:1-2)
// =============================================
class Scene1 extends BaseScene {
  constructor() {
    super('canvas-s1');
    if (!this.canvas) return;
    this.clickZones = [{ x: 0, y: 0, w: CW, h: CH, key: 'sovereignty' }];
    this.stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * CW, y: Math.random() * CH,
      r: Math.random() * 2 + 1, ph: Math.random() * Math.PI * 2,
    }));
  }
  draw() {
    const ctx = this.ctx;
    const p = sceneP();
    const grad = ctx.createLinearGradient(0, 0, 0, CH);
    grad.addColorStop(0, p.sky0); grad.addColorStop(1, p.sky1);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH);

    // Stars
    this.stars.forEach((s, i) => {
      const br = 0.3 + 0.6 * Math.abs(Math.sin(this.t * 0.02 + s.ph));
      ctx.fillStyle = p.starStr + br + ')'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });

    // Orbiting planets
    const cx = CW / 2, cy = CH / 2;
    [[80, 0.015, '#3a5a8a', 4], [130, -0.01, '#5a3a2a', 5], [55, 0.025, '#2a4a2a', 3]].forEach(([r, sp, col, sz]) => {
      const angle = this.t * sp;
      const px = cx + Math.cos(angle) * r, py = cy + Math.sin(angle) * r * 0.35;
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, sz, 0, Math.PI * 2); ctx.fill();
    });

    // Glow behind text
    const glow = 0.15 + 0.1 * Math.sin(this.t * 0.03);
    ctx.fillStyle = `rgba(50,80,200,${glow})`; ctx.beginPath(); ctx.arc(cx, cy, 70, 0, Math.PI * 2); ctx.fill();

    // Arabic "الملك" in centre
    const alpha = 0.7 + 0.3 * Math.sin(this.t * 0.025);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 36px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('الْمُلْكُ', cx, cy + 14);
    ctx.globalAlpha = 1;

    ctx.fillStyle = p.starStr + '0.8)'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('"Blessed is He in whose hand is all dominion"', cx, CH - 18);
    ctx.fillStyle = p.hint; ctx.font = '7px sans-serif';
    ctx.fillText('Click anywhere', cx, CH - 6);
  }
}

// =============================================
//  SCENE 2 — SEVEN HEAVENS (67:3-5)
// =============================================
class Scene2 extends BaseScene {
  constructor() {
    super('canvas-s2');
    if (!this.canvas) return;
    const bH = Math.floor(CH / 7);
    this.clickZones = Array.from({ length: 7 }, (_, i) => ({
      x: 0, y: i * bH, w: CW, h: bH,
      key: i === 6 ? 'stars_guards' : 'perfect_heavens',
    }));
    this.bH = bH;
  }
  draw() {
    const ctx = this.ctx;
    const bands = [
      '#000010', '#050818', '#080e20', '#0a1228',
      '#0c1630', '#0e1a38', '#101e40',
    ];
    bands.forEach((col, i) => {
      ctx.fillStyle = col; fillRect(ctx, 0, i * this.bH, CW, this.bH);
      ctx.fillStyle = `rgba(255,255,255,0.06)`;
      ctx.fillRect(0, i * this.bH + this.bH - 1, CW, 1);
      ctx.fillStyle = '#c0d0ff'; ctx.font = '7px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(`Heaven ${7 - i}`, 8, i * this.bH + this.bH - 5);
    });
    // Stars in lowest band (i=6)
    const p2 = sceneP();
    for (let s = 0; s < 30; s++) {
      const sx = (s * 61 + this.t * 0.3) % CW;
      const sy = 6 * this.bH + 2 + (s % 7) * 3;
      const br = 0.4 + 0.5 * Math.abs(Math.sin(this.t * 0.025 + s));
      ctx.fillStyle = p2.starStr + br + ')'; fillRect(ctx, sx, sy, 2, 2);
    }
    // "No breaks!" label
    const a = 0.6 + 0.4 * Math.sin(this.t * 0.025);
    ctx.globalAlpha = a;
    ctx.fillStyle = p2.acStr + '1)'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('مَا تَرَىٰ مِن تَفَاوُتٍ — No inconsistency!', CW / 2, 14);
    ctx.globalAlpha = 1;
    ctx.fillStyle = p2.hint; ctx.font = '7px sans-serif';
    ctx.fillText('Click any layer', CW / 2, CH - 5);
  }
}

// =============================================
//  SCENE 3 — GATES OF HELLFIRE (67:6-11)
// =============================================
class Scene3 extends BaseScene {
  constructor() {
    super('canvas-s3');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,       y: 0, w: CW * 0.25, h: CH, key: 'hellfire_guards' },
      { x: CW*0.75, y: 0, w: CW * 0.25, h: CH, key: 'hellfire_guards' },
      { x: CW*0.3,  y: 60, w: CW * 0.4, h: 100, key: 'confession' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Dark background
    ctx.fillStyle = '#0a0202'; fillRect(ctx, 0, 0, CW, CH);
    // Hellfire glow at bottom
    const fireGlow = 0.3 + 0.2 * Math.sin(this.t * 0.06);
    const fireGrad = ctx.createLinearGradient(0, CH * 0.6, 0, CH);
    fireGrad.addColorStop(0, `rgba(180,40,0,0)`);
    fireGrad.addColorStop(1, `rgba(220,80,0,${fireGlow})`);
    ctx.fillStyle = fireGrad; fillRect(ctx, 0, CH * 0.6, CW, CH * 0.4);
    // Pixel flames
    for (let f = 0; f < 20; f++) {
      const fx = 20 + f * 27;
      const fh = 10 + Math.abs(Math.sin(this.t * 0.08 + f * 0.7)) * 18;
      const fcol = f % 3 === 0 ? '#ff6000' : f % 3 === 1 ? '#ff8800' : '#ffaa00';
      ctx.fillStyle = fcol; fillRect(ctx, fx, CH - fh - 2, 10, fh);
    }
    // Gate pillars
    ctx.fillStyle = '#1a0808'; fillRect(ctx, 0, 30, 70, CH - 30);
    ctx.fillStyle = '#1a0808'; fillRect(ctx, CW - 70, 30, 70, CH - 30);
    ctx.fillStyle = '#2a1010'; fillRect(ctx, 5, 35, 60, CH - 40);
    ctx.fillStyle = '#2a1010'; fillRect(ctx, CW - 65, 35, 60, CH - 40);
    // Gate top arch
    ctx.fillStyle = '#1a0808'; fillRect(ctx, 0, 30, CW, 20);
    ctx.fillStyle = '#8a0000';
    ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('أَلَمْ يَأْتِكُمْ نَذِيرٌ', CW / 2, 44);
    // Guardian figures
    const gf = (gx) => {
      ctx.fillStyle = '#2a0000'; fillRect(ctx, gx, 60, 18, 40); fillRect(ctx, gx + 2, 46, 14, 12);
      // glowing eyes
      const eg = 0.6 + 0.4 * Math.sin(this.t * 0.06); ctx.fillStyle = `rgba(255,80,0,${eg})`;
      fillRect(ctx, gx + 3, 51, 4, 3); fillRect(ctx, gx + 10, 51, 4, 3);
    };
    gf(18); gf(CW - 46);
    // Approaching soul (small figure, trembling)
    const sx = CW / 2 - 8 + Math.sin(this.t * 0.1) * 2;
    ctx.fillStyle = '#888'; fillRect(ctx, sx, 90, 16, 24); fillRect(ctx, sx + 2, 76, 12, 12);
    ctx.fillStyle = '#ff6666'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('(click guardians or soul)', CW / 2, CH - 8);
  }
}

// =============================================
//  SCENE 4 — FEAR IN SECRET (67:12-14)
// =============================================
class Scene4 extends BaseScene {
  constructor() {
    super('canvas-s4');
    if (!this.canvas) return;
    this.clickZones = [
      { x: CW * 0.3, y: 80, w: CW * 0.4, h: 120, key: 'fear_secret' },
      { x: 0, y: 0, w: CW, h: 60, key: 'knows_all' },
    ];
    this.stars = Array.from({ length: 40 }, () => ({ x: Math.random() * CW, y: Math.random() * 70, ph: Math.random() * Math.PI * 2 }));
  }
  draw() {
    const ctx = this.ctx;
    const p4 = sceneP();
    const grad = ctx.createLinearGradient(0, 0, 0, CH);
    grad.addColorStop(0, p4.sky0); grad.addColorStop(1, p4.sky1);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH);
    ctx.fillStyle = p4.gnd; fillRect(ctx, 0, CH * 0.75, CW, CH * 0.25);

    // Stars
    this.stars.forEach((s, i) => {
      const br = 0.2 + 0.6 * Math.abs(Math.sin(this.t * 0.02 + s.ph));
      ctx.fillStyle = p4.starStr + br + ')'; fillRect(ctx, s.x, s.y, 2, 2);
    });

    // Light beam from above
    const lGlow = 0.08 + 0.05 * Math.sin(this.t * 0.03);
    const lGrad = ctx.createLinearGradient(CW / 2, 0, CW / 2, CH * 0.8);
    lGrad.addColorStop(0, `rgba(200,220,255,${lGlow * 2})`);
    lGrad.addColorStop(1, `rgba(200,220,255,0)`);
    ctx.fillStyle = lGrad;
    ctx.beginPath(); ctx.moveTo(CW/2 - 30, 0); ctx.lineTo(CW/2 + 30, 0); ctx.lineTo(CW/2 + 60, CH * 0.75); ctx.lineTo(CW/2 - 60, CH * 0.75); ctx.closePath(); ctx.fill();

    // Figure in sujood (prostration)
    const fx = CW / 2 - 20, fy = 150;
    ctx.fillStyle = '#c8a870';
    // body bent forward
    fillRect(ctx, fx, fy, 30, 14);
    // head on ground
    fillRect(ctx, fx + 22, fy + 12, 10, 10);
    // legs
    fillRect(ctx, fx - 2, fy + 8, 12, 10);

    // Glowing heart
    const hg = 0.5 + 0.4 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,215,0,${hg * 0.4})`; ctx.beginPath(); ctx.arc(fx + 5, fy - 4, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(255,100,100,${hg})`; ctx.beginPath(); ctx.arc(fx + 5, fy - 4, 5, 0, Math.PI * 2); ctx.fill();

    // Label
    ctx.fillStyle = `rgba(200,220,255,${0.5 + 0.4 * Math.sin(this.t * 0.025)})`;
    ctx.font = 'bold 9px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ', CW / 2, 28);
    ctx.fillStyle = p4.starStr + '0.8)'; ctx.font = '7px sans-serif';
    ctx.fillText('"Those who fear their Lord in secret"', CW / 2, 44);
    ctx.fillStyle = p4.hint; ctx.font = '7px sans-serif';
    ctx.fillText('Click the figure or the sky', CW / 2, CH - 8);
  }
}

// =============================================
//  SCENE 5 — THE EARTH: A GIFT (67:15-18)
// =============================================
class Scene5 extends BaseScene {
  constructor() {
    super('canvas-s5');
    if (!this.canvas) return;
    this.clickZones = [{ x: 0, y: 0, w: CW, h: CH, key: 'earth_gift' }];
  }
  draw() {
    const ctx = this.ctx;
    // Sky
    const p5 = sceneP();
    const skyGrad = ctx.createLinearGradient(0, 0, 0, CH * 0.55);
    skyGrad.addColorStop(0, p5.sky0); skyGrad.addColorStop(1, p5.sky1);
    ctx.fillStyle = skyGrad; fillRect(ctx, 0, 0, CW, CH * 0.55);
    // Ground
    ctx.fillStyle = p5.gnd; fillRect(ctx, 0, CH * 0.55, CW, CH * 0.45);
    ctx.fillStyle = p5.gndAcc; fillRect(ctx, 0, CH * 0.55, CW, 8);
    // Mountains
    const mts = [[60, 130, 80, 55], [160, 120, 100, 65], [320, 110, 120, 70], [480, 125, 90, 60]];
    mts.forEach(([mx, my, mw, mh]) => {
      ctx.fillStyle = '#1a2a0e';
      ctx.beginPath(); ctx.moveTo(mx, my + mh); ctx.lineTo(mx + mw/2, my); ctx.lineTo(mx + mw, my + mh); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#2a3a1a';
      ctx.beginPath(); ctx.moveTo(mx + mw*0.3, my + mh*0.5); ctx.lineTo(mx + mw/2, my); ctx.lineTo(mx + mw*0.7, my + mh*0.5); ctx.closePath(); ctx.fill();
    });
    // River
    for (let rx = 200; rx < 360; rx += 2) {
      const ry = CH * 0.6 + Math.sin(rx * 0.05) * 4;
      const wa = 0.3 + 0.2 * Math.sin((rx + this.t * 2) * 0.1);
      ctx.fillStyle = `rgba(40,100,200,${wa})`; fillRect(ctx, rx, ry, 2, 8);
    }
    // Trees / crops
    [[80, 170], [110, 165], [420, 168], [450, 163], [480, 170]].forEach(([tx, ty]) => {
      ctx.fillStyle = '#2a5010'; fillRect(ctx, tx, ty - 20, 12, 20);
      ctx.fillStyle = '#1a4008'; fillRect(ctx, tx - 6, ty - 30, 24, 18);
    });
    // Walking figure
    const wx = 260 + Math.sin(this.t * 0.02) * 5;
    ctx.fillStyle = '#c8a870'; fillRect(ctx, wx, 160, 12, 20); fillRect(ctx, wx + 1, 148, 10, 10);

    const a = 0.5 + 0.4 * Math.sin(this.t * 0.025);
    ctx.globalAlpha = a;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 9px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('فَامْشُوا فِي مَنَاكِبِهَا', CW / 2, 20);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#88cc88'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('"Walk through its slopes — eat of His provision"', CW / 2, 34);
    ctx.fillStyle = p5.hint; ctx.font = '7px sans-serif';
    ctx.fillText('Click anywhere', CW / 2, CH - 8);
  }
}

// =============================================
//  SCENE 6 — BIRDS & TAWAKKUL (67:19)
// =============================================
class Scene6 extends BaseScene {
  constructor() {
    super('canvas-s6');
    if (!this.canvas) return;
    this.clickZones = [{ x: 0, y: 0, w: CW, h: CH * 0.75, key: 'birds_tawakkul' }];
    this.birds = [
      { x: 120, y: 70,  spd: 0.4 },
      { x: 280, y: 50,  spd: 0.35 },
      { x: 440, y: 80,  spd: 0.45 },
      { x: 200, y: 100, spd: 0.3 },
    ];
  }
  _drawBird(ctx, bx, by, t, spd) {
    const wing = Math.sin(t * spd * 0.08) > 0;
    ctx.fillStyle = '#c8a870';
    // Body
    fillRect(ctx, bx - 8, by - 2, 16, 6);
    // Head
    fillRect(ctx, bx + 6, by - 5, 6, 5);
    // Beak
    fillRect(ctx, bx + 12, by - 3, 4, 2);
    // Wings: spread or contracted
    if (wing) {
      ctx.fillStyle = '#a08050';
      fillRect(ctx, bx - 20, by - 4, 14, 4);
      fillRect(ctx, bx + 10, by - 4, 14, 4);
    } else {
      ctx.fillStyle = '#a08050';
      fillRect(ctx, bx - 10, by - 1, 8, 3);
      fillRect(ctx, bx + 6,  by - 1, 8, 3);
    }
  }
  draw() {
    const ctx = this.ctx;
    // Sky gradient
    const p6 = sceneP();
    const grad = ctx.createLinearGradient(0, 0, 0, CH);
    grad.addColorStop(0, p6.sky0); grad.addColorStop(0.7, p6.sky1); grad.addColorStop(1, p6.sky2);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH);
    // Ground
    ctx.fillStyle = p6.gnd; fillRect(ctx, 0, CH * 0.75, CW, CH * 0.25);

    // Wind currents
    for (let w = 0; w < 6; w++) {
      const wy = 40 + w * 22;
      const wx = (this.t * 0.6 + w * 90) % CW;
      ctx.strokeStyle = `rgba(100,160,255,0.08)`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(wx, wy); ctx.bezierCurveTo(wx + 30, wy - 5, wx + 60, wy + 5, wx + 80, wy); ctx.stroke();
    }

    // Birds
    this.birds.forEach(b => this._drawBird(ctx, b.x, b.y, this.t, b.spd));

    // "ar-Rahman" glow label
    const rg = 0.5 + 0.4 * Math.sin(this.t * 0.03);
    ctx.globalAlpha = rg;
    ctx.fillStyle = '#c0d8ff'; ctx.font = 'bold 10px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ', CW / 2, 16);
    ctx.globalAlpha = 1;
    ctx.fillStyle = p6.starStr + '0.8)'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('"None holds them up except ar-Rahman"', CW / 2, 30);
    ctx.fillStyle = p6.hint; ctx.font = '7px sans-serif';
    ctx.fillText('Click the birds', CW / 2, CH - 8);
  }
}

// =============================================
//  SCENE 7 — SIGNS & QUESTIONS (67:20-27)
// =============================================
class Scene7 extends BaseScene {
  constructor() {
    super('canvas-s7');
    if (!this.canvas) return;
    this.clickZones = [{ x: 0, y: 0, w: CW, h: CH, key: 'who_helps' }];
    this.stars = Array.from({ length: 50 }, () => ({ x: Math.random() * CW, y: Math.random() * CH * 0.65, ph: Math.random() * Math.PI * 2 }));
    this.questions = [
      'Who will be your army if not ar-Rahman?',
      'Who will provide for you if He withholds?',
      'Who gave you hearing, sight, and hearts?',
    ];
  }
  draw() {
    const ctx = this.ctx;
    const p7 = sceneP();
    ctx.fillStyle = p7.sky0; ctx.fillRect(0, 0, CW, CH);
    ctx.fillStyle = p7.gnd; fillRect(ctx, 0, CH * 0.7, CW, CH * 0.3);

    // Stars
    this.stars.forEach(s => {
      const br = 0.2 + 0.6 * Math.abs(Math.sin(this.t * 0.02 + s.ph));
      ctx.fillStyle = p7.starStr + br + ')'; fillRect(ctx, s.x, s.y, 2, 2);
    });

    // Cycling question text
    const qi = Math.floor(this.t / 90) % this.questions.length;
    const phase = (this.t % 90) / 90;
    const qa = phase < 0.2 ? phase * 5 : phase > 0.8 ? (1 - phase) * 5 : 1;
    ctx.globalAlpha = qa;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(this.questions[qi], CW / 2, CH * 0.38);
    ctx.globalAlpha = 1;

    // Arabic question
    const aq = 0.5 + 0.4 * Math.sin(this.t * 0.025);
    ctx.globalAlpha = aq;
    ctx.fillStyle = '#c0d0ff'; ctx.font = 'bold 14px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ', CW / 2, 22);
    ctx.globalAlpha = 1;

    // Figures: believer (right, peaceful) vs disbeliever (left, worried)
    // Left figure — worried
    ctx.fillStyle = '#884444'; fillRect(ctx, 80, 120, 14, 24); fillRect(ctx, 81, 106, 12, 12);
    // raised arms in worry
    fillRect(ctx, 68, 118, 12, 4); fillRect(ctx, 94, 118, 12, 4);
    ctx.fillStyle = '#ff8888'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('غُرُور', 87, 156); ctx.fillText('"Delusion"', 87, 168);

    // Right figure — peaceful
    const pg = 0.3 + 0.2 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,215,0,${pg})`; ctx.beginPath(); ctx.arc(460, 130, 28, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#88c888'; fillRect(ctx, 452, 120, 14, 24); fillRect(ctx, 453, 106, 12, 12);
    ctx.fillStyle = '#88ff88'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('تَوَكُّل', 459, 156); ctx.fillText('"Trust"', 459, 168);

    ctx.fillStyle = p7.hint; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Click anywhere', CW / 2, CH - 8);
  }
}

// =============================================
//  SCENE 8 — WHO WILL BRING WATER? (67:30)
// =============================================
class Scene8 extends BaseScene {
  constructor() {
    super('canvas-s8');
    if (!this.canvas) return;
    this.clickZones = [{ x: 0, y: 0, w: CW, h: CH, key: 'water_verse' }];
  }
  draw() {
    const ctx = this.ctx;
    // Top half — parched earth / night sky
    const p8 = sceneP();
    ctx.fillStyle = p8.sky0; fillRect(ctx, 0, 0, CW, CH * 0.5);
    // Stars
    [[50,15],[140,8],[230,20],[380,12],[470,18],[310,6]].forEach(([sx,sy],i) => {
      const br = 0.3 + 0.5 * Math.abs(Math.sin(this.t * 0.025 + i * 1.4));
      ctx.fillStyle = `rgba(200,220,255,${br})`; fillRect(ctx, sx, sy, 2, 2);
    });
    // Parched cracked ground (top)
    ctx.fillStyle = '#2a1808'; fillRect(ctx, 0, CH * 0.42, CW, 14);
    // Cracks
    ctx.strokeStyle = '#1a0e04'; ctx.lineWidth = 1;
    [[60,96,80,106],[150,98,165,108],[260,94,275,107],[380,96,395,108],[470,98,485,106]].forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });

    // Bottom half — water sinking underground
    ctx.fillStyle = '#0a0e08'; fillRect(ctx, 0, CH * 0.5, CW, CH * 0.5);
    // Underground layers
    ctx.fillStyle = '#1a1005'; fillRect(ctx, 0, CH * 0.5, CW, 6);
    ctx.fillStyle = '#120e04'; fillRect(ctx, 0, CH * 0.58, CW, 5);
    ctx.fillStyle = '#0e0c04'; fillRect(ctx, 0, CH * 0.66, CW, 5);
    // Water sinking (droplets moving down)
    for (let d = 0; d < 12; d++) {
      const dy = CH * 0.5 + ((this.t * 0.5 + d * 20) % (CH * 0.5 - 10));
      const dx = 50 + d * 40;
      const da = 0.5 - dy / CH;
      ctx.fillStyle = `rgba(40,120,200,${Math.max(0, da)})`; ctx.beginPath(); ctx.arc(dx, dy, 3, 0, Math.PI * 2); ctx.fill();
    }

    // Figure looking up, hands raised
    const figX = CW / 2 - 8, figY = CH * 0.35 - 20;
    ctx.fillStyle = '#c8a870'; fillRect(ctx, figX, figY, 16, 24); fillRect(ctx, figX + 2, figY - 14, 12, 12);
    fillRect(ctx, figX - 14, figY + 4, 14, 5);
    fillRect(ctx, figX + 16, figY + 4, 14, 5);

    // Question glow
    const qg = 0.6 + 0.4 * Math.sin(this.t * 0.03);
    ctx.globalAlpha = qg;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ ؟', CW / 2, 18);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#c0d0ff'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('"Who then could bring you flowing water?"', CW / 2, 32);
    ctx.fillStyle = p8.hint; ctx.font = '7px sans-serif';
    ctx.fillText('Click anywhere', CW / 2, CH - 8);
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
