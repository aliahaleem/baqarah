// =============================================
//  BAQARAH QUEST — scenes.js
//  Animated pixel-art canvas scenes
// =============================================

const P  = 5;    // pixels per block unit
const CW = 700;  // canvas internal width
const CH = 200;  // canvas internal height
const GY = 152;  // ground y level

// ---- DRAWING UTILITIES ----

function spr(ctx, ox, oy, parts) {
  parts.forEach(([dx, dy, w, h, c]) => {
    if (!c) return;
    ctx.fillStyle = c;
    ctx.fillRect(ox + dx * P, oy + dy * P, w * P, h * P);
  });
}

function fillRect(ctx, x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

// ---- SPRITE DEFINITIONS ----
// Each sprite: array of [dx, dy, w, h, color] in block units

const SKIN  = '#e8c39a';
const SKIN2 = '#c68642';

function human(shirt, pants, sk = SKIN, eyeC = '#333') {
  return [
    [1, 0, 4, 3, sk],           // head
    [2, 1, 1, 1, eyeC],         // left eye
    [4, 1, 1, 1, eyeC],         // right eye
    [0, 3, 6, 4, shirt],        // body
    [-1, 3, 1, 4, sk],          // left arm
    [6, 3, 1, 4, sk],           // right arm
    [0, 7, 2, 5, pants],        // left leg
    [3, 7, 2, 5, pants],        // right leg
  ];
}

function humanBow(shirt, pants, sk = SKIN) {
  return [
    [-1, 4, 3, 3, sk],          // head forward
    [2,  3, 5, 2, shirt],       // body horizontal
    [6,  3, 1, 5, sk],          // arm hanging
    [1,  5, 2, 5, pants],       // left leg down
    [4,  5, 2, 5, pants],       // right leg down
  ];
}

function humanSajdah(shirt, pants, sk = SKIN) {
  return [
    [0, 6, 3, 2, sk],           // head on ground
    [2, 5, 5, 2, shirt],        // body flat
    [6, 4, 1, 3, pants],        // raised knees
  ];
}

function angelSpr(bowing = false) {
  const W = '#f0f0f8', G = '#d0d0ff', H = '#ffd700';
  if (bowing) return [
    [1, -1, 3, 1, H],           // halo
    [-1, 0, 2, 3, G],           // wing left (up)
    [0, 2, 3, 3, SKIN],         // head down
    [2, 1, 5, 2, W],            // body horizontal
    [2, 3, 2, 4, W],            // legs
    [5, 3, 2, 4, W],
  ];
  return [
    [1, -1, 3, 1, H],           // halo
    [1,  0, 3, 3, SKIN],        // head
    [-2, 2, 2, 4, G],           // wing left
    [5,  2, 2, 4, G],           // wing right
    [0,  3, 5, 4, W],           // robe
    [1,  7, 1, 3, W],
    [3,  7, 1, 3, W],
  ];
}

function iblisSpr() {
  const D = '#1a1a2e', M = '#2d2d50';
  return [
    [1, 0, 4, 3, D],            // head
    [2, 1, 1, 1, '#ff2222'],    // red eye L
    [4, 1, 1, 1, '#ff2222'],    // red eye R
    [0, 3, 6, 4, M],            // body
    [-1, 3, 7, 1, D],           // crossed arms bar
    [0, 7, 2, 4, D],            // left leg
    [3, 7, 2, 4, D],            // right leg
  ];
}

function treeSpr() {
  const T = '#6b3a1f', L = '#2d8a27', G = 'rgba(255,215,0,0.18)';
  return [
    [2, 8, 2, 5, T],            // trunk
    [0, 5, 6, 4, L],            // canopy low
    [1, 3, 4, 3, L],            // canopy mid
    [2, 1, 2, 3, L],            // canopy top
    [0, 1, 8, 12, G],           // glow overlay
  ];
}

function torchSpr(lit) {
  const W = '#8B5E3C', F = lit ? '#ff7700' : '#333', T = lit ? '#ffcc00' : null;
  return [
    [0, 3, 1, 4, W],            // stick
    [0, 1, 2, 2, F],            // flame body
    T ? [0, 0, 2, 1, T] : null, // flame tip
  ].filter(Boolean);
}

function lockSpr() {
  return [
    [0, 1, 3, 3, '#888'],       // lock body
    [1, 0, 1, 2, '#888'],       // shackle
    [1, 2, 1, 1, '#555'],       // keyhole
  ];
}

// ---- HEART PIXEL ART ----
// 8 cols × 7 rows grid (1 = heart cell, 0 = empty)
const HEART_GRID = [
  [0,1,1,0,0,1,1,0],
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,0,0],
  [0,0,0,1,1,0,0,0],
];

// Order in which black spots cover the heart (outer → inner)
const HEART_SPOT_ORDER = [
  [0,1],[0,2],[0,5],[0,6],
  [1,0],[1,7],
  [2,0],[2,7],
  [3,0],[3,7],
  [4,1],[4,6],
  [5,2],[5,5],
  [6,3],[6,4],
  [1,1],[1,6],
  [2,1],[2,6],
  [3,1],[3,6],
  [1,2],[1,5],
  [2,2],[2,5],
  [3,2],[3,5],
  [4,2],[4,5],
  [1,3],[1,4],
  [2,3],[2,4],
  [3,3],[3,4],
  [4,3],[4,4],
  [5,3],[5,4],
];

function drawHeart(ctx, x, y, spots, t) {
  const SC  = 11; // scale: 11px per block
  const tot = HEART_SPOT_ORDER.length;

  // Set of covered positions for fast lookup
  const covered = new Set();
  for (let i = 0; i < spots && i < tot; i++) {
    const [r, c] = HEART_SPOT_ORDER[i];
    covered.add(`${r},${c}`);
  }

  HEART_GRID.forEach((row, ry) => {
    row.forEach((cell, rx) => {
      if (!cell) return;
      const isCovered = covered.has(`${ry},${rx}`);
      let color;
      if (isCovered) {
        color = '#0a0a0a';
      } else {
        // Healthy heart pulses slightly red→crimson
        const pulse = (Math.sin(t * 0.06) + 1) / 2;
        const r = Math.round(180 + pulse * 40);
        color = `rgb(${r},20,20)`;
      }
      ctx.fillStyle = color;
      ctx.fillRect(x + rx * SC, y + ry * SC, SC - 1, SC - 1);
    });
  });

  // Glow: warm red when healthy, dims to nothing as it fills
  const healthRatio = 1 - Math.min(spots / tot, 1);
  if (healthRatio > 0.05) {
    const cx = x + 4 * SC, cy = y + 3.5 * SC;
    const gR = ctx.createRadialGradient(cx, cy, 4, cx, cy, 52);
    gR.addColorStop(0, `rgba(220,40,40,${0.22 * healthRatio})`);
    gR.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gR;
    ctx.fillRect(x - 10, y - 10, 8 * SC + 20, 7 * SC + 20);
  }

  // Label above heart
  ctx.font = '7px "Press Start 2P", monospace';
  const label = spots === 0 ? '💗 Heart'
    : spots < tot * 0.4  ? '⚫ Darkening...'
    : spots < tot * 0.85 ? '🖤 Almost sealed'
    : '🔒 Sealed';
  ctx.fillStyle = spots < tot * 0.5 ? 'rgba(255,120,120,0.9)' : 'rgba(180,80,80,0.7)';
  ctx.fillText(label, x + 4, y - 8);
}

function boltSpr() {
  const Y = '#FFFF55';
  return [
    [2, 0, 1, 2, Y], [1, 2, 1, 2, Y],
    [2, 4, 1, 2, Y], [1, 6, 1, 2, Y],
  ];
}

function bookSpr() {
  return [
    [0, 0, 6, 5, '#1a3a1a'],    // cover
    [1, 0, 4, 5, '#f5f5e8'],    // pages
    [2, 1, 2, 1, '#aaa'],
    [2, 2, 2, 1, '#aaa'],
    [2, 3, 2, 1, '#aaa'],
  ];
}

// ---- VERSE DATA ----

const VERSES = {
  believer_prayer: {
    ref: 'Al-Baqarah 2:3',
    arabic: 'وَيُقِيمُونَ ٱلصَّلَوٰةَ',
    english: '"...and establish prayer..."',
    note: 'The Muttaqeen truly maintain their salah — their direct line to Allah, five times every day.',
  },
  believer_charity: {
    ref: 'Al-Baqarah 2:3',
    arabic: 'وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ',
    english: '"...and spend out of what We have provided for them."',
    note: 'They give from their wealth knowing it is from Allah first. Charity is a sign of true belief.',
  },
  believer_quran: {
    ref: 'Al-Baqarah 2:4',
    arabic: 'وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ',
    english: '"...who believe in what has been revealed to you [O Muhammad]..."',
    note: 'They hold the Quran as pure truth — the final and preserved revelation from Allah.',
  },
  hypocrite_claim: {
    ref: 'Al-Baqarah 2:8–9',
    arabic: 'يَقُولُ ءَامَنَّا بِٱللَّهِ وَبِٱلْيَوْمِ ٱلْءَاخِرِ وَمَا هُم بِمُؤْمِنِينَ',
    english: '"...they say: We believe in Allah and the Last Day — but they are not believers."',
    note: 'Their lips say one thing; their hearts mean another. This is the essence of nifaq (hypocrisy).',
  },
  truth_light: {
    ref: 'Al-Baqarah 2:6',
    arabic: 'سَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ',
    english: '"It is all the same for them whether you warn them or do not warn them — they will not believe."',
    note: 'The light of truth is right there. The Quran was read to them. Warnings came. But they turned away every time — until their hearts were sealed.',
  },
  hypocrite_corrupt: {
    ref: 'Al-Baqarah 2:11–12',
    arabic: 'وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا۟ فِى ٱلْأَرْضِ قَالُوٓا۟ إِنَّمَا نَحْنُ مُصْلِحُونَ',
    english: '"When told: Do not spread corruption — they say: We are only reformers!"',
    note: 'Self-deception is the root of hypocrisy. They genuinely cannot see what they are doing wrong.',
  },
  heart_sealed: {
    ref: 'Al-Baqarah 2:7 + Hadith (Ibn Majah)',
    arabic: 'خَتَمَ ٱللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ',
    english: '"Allah has set a seal upon their hearts and upon their hearing..."',
    note: 'The Prophet ﷺ explained: When a person sins, a black dot appears on their heart. If they repent, it is removed. If they keep sinning, the dots spread until the heart is completely sealed. This is "the Ran" (the stain) mentioned in Surah Al-Mutaffifin. Watch the heart in this scene — every time truth is rejected, another spot appears.',
  },
  fire_parable: {
    ref: 'Al-Baqarah 2:17',
    arabic: 'ذَهَبَ ٱللَّهُ بِنُورِهِمْ وَتَرَكَهُمْ فِى ظُلُمَٰتٍ لَّا يُبْصِرُونَ',
    english: '"Allah took away their light and left them in darkness — they could not see."',
    note: 'They had access to truth and guidance — but they chose to extinguish it themselves.',
  },
  storm_parable: {
    ref: 'Al-Baqarah 2:20',
    arabic: 'كُلَّمَآ أَضَآءَ لَهُم مَّشَوْا۟ فِيهِ وَإِذَآ أَظْلَمَ عَلَيْهِمْ قَامُوا۟',
    english: '"Whenever lightning flashes for them, they walk by its light. When darkness covers them, they stand still."',
    note: 'The hypocrite only uses faith when it benefits them personally. When it costs something, they freeze.',
  },
  angels_bow: {
    ref: 'Al-Baqarah 2:34',
    arabic: 'وَإِذْ قُلْنَا لِلْمَلَٰٓئِكَةِ ٱسْجُدُوا۟ لِءَادَمَ فَسَجَدُوٓا۟',
    english: '"...when We said to the angels: Prostrate before Adam — so they prostrated..."',
    note: 'Every single angel obeyed immediately and completely. Obedience to Allah is their nature.',
  },
  iblis_refuse: {
    ref: 'Al-Baqarah 2:34',
    arabic: 'أَبَىٰ وَٱسْتَكْبَرَ وَكَانَ مِنَ ٱلْكَٰفِرِينَ',
    english: '"He refused and was arrogant — and became of the disbelievers."',
    note: 'Arrogance was the very first sin ever committed. One moment of pride destroyed Iblis forever.',
  },
  forbidden_tree: {
    ref: 'Al-Baqarah 2:35',
    arabic: 'وَلَا تَقْرَبَا هَٰذِهِ ٱلشَّجَرَةَ فَتَكُونَا مِنَ ٱلظَّٰلِمِينَ',
    english: '"...do not approach this tree, lest you become of the wrongdoers."',
    note: 'One rule. One test. Every human being faces tests from Allah — and Allah always provides a way back.',
  },
  khalifah: {
    ref: 'Al-Baqarah 2:30',
    arabic: 'إِنِّى جَاعِلٌ فِى ٱلْأَرْضِ خَلِيفَةً',
    english: '"Indeed, I will make upon the earth a successive authority [khalifah]."',
    note: 'YOU are Allah\'s khalifah. You carry the honour and responsibility of being His steward on this Earth.',
  },
  iblis_whisper: {
    ref: 'Al-Baqarah 2:36',
    arabic: 'فَأَزَلَّهُمَا ٱلشَّيْطَٰنُ عَنْهَا فَأَخْرَجَهُمَا مِمَّا كَانَا فِيهِ',
    english: '"But Satan caused them to slip from it and removed them from that [condition] in which they had been."',
    note: 'Iblis didn\'t force them — he whispered. His weapon was deception, not power. He couldn\'t touch them; he could only suggest. This is why we say "A\'ūdhu billāhi min ash-Shayṭān ir-rajīm" — we seek Allah\'s protection because our own strength is not enough against these whispers.',
  },
  adam_tawbah: {
    ref: 'Al-Baqarah 2:37',
    arabic: 'فَتَلَقَّىٰٓ ءَادَمُ مِن رَّبِّهِۦ كَلِمَٰتٍ فَتَابَ عَلَيْهِ ۚ إِنَّهُۥ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ',
    english: '"Then Adam received from his Lord [some] words, and He accepted his repentance. Indeed, it is He who is the Accepting of repentance, the Merciful."',
    note: 'Adam (AS) didn\'t despair. He didn\'t make excuses. He turned straight back to Allah with sincere words. This is the Sunnah of tawbah — immediate, honest, without blame. And Allah accepted it completely. The door of tawbah is always open.',
  },
  sea_parting: {
    ref: 'Al-Baqarah 2:50',
    arabic: 'وَإِذْ فَرَقْنَا بِكُمُ ٱلْبَحْرَ فَأَنجَيْنَٰكُمْ وَأَغْرَقْنَآ ءَالَ فِرْعَوْنَ وَأَنتُمْ تَنظُرُونَ',
    english: '"And [recall] when We parted the sea for you and saved you and drowned the people of Pharaoh while you were looking on."',
    note: 'They watched Pharaoh\'s entire army drown before their eyes. This was not just a rescue — it was a complete, visible proof of Allah\'s power. And yet some still doubted later. This is why the Quran repeats: "Remember My favour upon you!"',
  },
  manna_salwa: {
    ref: 'Al-Baqarah 2:57',
    arabic: 'وَظَلَّلْنَا عَلَيْكُمُ ٱلْغَمَامَ وَأَنزَلْنَا عَلَيْكُمُ ٱلْمَنَّ وَٱلسَّلْوَىٰ',
    english: '"And We shaded you with clouds and sent down to you manna and quails — eat from the good things We have provided for you."',
    note: 'They were in a desert with no food and no shade. Allah solved both problems without them having to lift a finger. Food from the sky, shade from the clouds. Every single day. Pure rizq (provision) from Allah — no farming, no effort. SubhanAllah.',
  },
  twelve_springs: {
    ref: 'Al-Baqarah 2:60',
    arabic: 'فَٱنفَجَرَتْ مِنْهُ ٱثْنَتَا عَشْرَةَ عَيْنًا ۖ قَدْ عَلِمَ كُلُّ أُنَاسٍ مَّشْرَبَهُمْ',
    english: '"There gushed forth twelve springs, and every people knew their watering place."',
    note: 'One rock. One strike from Musa\'s staff. Twelve springs — one for each tribe — so that no tribe would crowd or argue. Allah solved the social problem AND the thirst problem in one miracle. This is the precision of Allah\'s care.',
  },
};

// ---- HTML POPUP ----

function showVersePopup(verse) {
  const p = document.getElementById('verse-popup');
  if (!p) return;
  document.getElementById('vp-ref').textContent    = verse.ref;
  document.getElementById('vp-arabic').textContent = verse.arabic;
  document.getElementById('vp-eng').textContent    = verse.english;
  document.getElementById('vp-note').textContent   = verse.note || '';
  p.classList.add('visible');
}

function hideVersePopup() {
  const p = document.getElementById('verse-popup');
  if (p) p.classList.remove('visible');
}

// ---- BASE SCENE ----

class BaseScene {
  constructor(canvasId) {
    this.canvas     = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx        = this.canvas.getContext('2d');
    this.canvas.width  = CW;
    this.canvas.height = CH;
    this.t          = 0;
    this.running    = false;
    this.clickZones = [];
    this._bindClick();
  }

  _bindClick() {
    if (!this.canvas) return;
    this.canvas.style.cursor = 'pointer';
    this.canvas.addEventListener('click', e => {
      const r  = this.canvas.getBoundingClientRect();
      const sx = CW / r.width;
      const sy = CH / r.height;
      const cx = (e.clientX - r.left) * sx;
      const cy = (e.clientY - r.top)  * sy;
      for (const z of this.clickZones) {
        if (cx >= z.x && cx <= z.x + z.w && cy >= z.y && cy <= z.y + z.h) {
          const v = VERSES[z.key];
          if (v) showVersePopup(v);
          return;
        }
      }
    });
  }

  stars(n = 22) {
    const ctx = this.ctx;
    for (let i = 0; i < n; i++) {
      const x  = (i * 137 * 31337) % CW;
      const y  = (i * 97  * 54321) % (GY - 30);
      const br = (Math.sin(this.t * 0.05 + i * 1.3) + 1) / 2;
      ctx.fillStyle = `rgba(255,255,220,${0.3 + br * 0.7})`;
      ctx.fillRect(x, y, i % 3 === 0 ? 2 : 1, i % 3 === 0 ? 2 : 1);
    }
  }

  ground(top, bot) {
    fillRect(this.ctx, 0, GY,     CW, 8,          top);
    fillRect(this.ctx, 0, GY + 8, CW, CH - GY - 8, bot);
  }

  hint(text, x, y) {
    if (Math.floor(this.t / 28) % 2 === 0) {
      this.ctx.fillStyle = 'rgba(255,215,0,0.85)';
      this.ctx.font = '7px "Press Start 2P", monospace';
      this.ctx.fillText(text, x, y);
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    const step = () => {
      if (!this.running) return;
      this.t++;
      this.draw();
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  stop() { this.running = false; }
  draw() {}
}

// ====================================================
//  SCENE 1 — PLAINS OF GUIDANCE
// ====================================================

class Scene1 extends BaseScene {
  constructor() {
    super('canvas-s1');
    if (!this.canvas) return;
    this.bX  = 290; // charity giver X
    this.bDir = 1;
    this.prayPhase = 0;
    this.prayTimer = 0;
    this.clickZones = [
      { x: 65,  y: GY - 68, w: 55, h: 68, key: 'believer_prayer'  },
      { x: 255, y: GY - 68, w: 110, h: 68, key: 'believer_charity' },
      { x: 550, y: 35,      w: 60,  h: 70, key: 'believer_quran'   },
    ];
  }

  draw() {
    const ctx = this.ctx;

    // Sky
    fillRect(ctx, 0, 0, CW, CH, '#1a3660');
    this.stars(28);

    // Horizon glow
    const hGrad = ctx.createLinearGradient(0, GY - 40, 0, GY);
    hGrad.addColorStop(0, 'rgba(80,180,80,0)');
    hGrad.addColorStop(1, 'rgba(50,150,50,0.25)');
    ctx.fillStyle = hGrad;
    ctx.fillRect(0, GY - 40, CW, 40);

    this.ground('#3a8a2a', '#2a5a1a');

    // Grass tufts
    for (let gx = 0; gx < CW; gx += 11) {
      const h = 3 + (gx * 7) % 5;
      fillRect(ctx, gx, GY - h, 2, h, '#4aaa3a');
    }

    // ---- PRAYING CHARACTER ----
    this.prayTimer++;
    if (this.prayTimer > 75) {
      this.prayPhase = (this.prayPhase + 1) % 3;
      this.prayTimer = 0;
    }
    const pX = 70, pY = GY - 65;
    if (this.prayPhase === 0)      spr(ctx, pX, pY,      human('#3a6b3a', '#1a3a6e'));
    else if (this.prayPhase === 1) spr(ctx, pX, pY + 10, humanBow('#3a6b3a', '#1a3a6e'));
    else                           spr(ctx, pX, pY + 18, humanSajdah('#3a6b3a', '#1a3a6e'));

    // Prayer rug
    fillRect(ctx, pX - 4, GY - 3, 52, 3, '#6a2a8a');

    // Prayer dots (twinkling)
    if (Math.floor(this.t / 14) % 2 === 0) {
      ctx.fillStyle = 'rgba(255,215,0,0.9)';
      [pX + 5, pX + 15, pX + 24].forEach(sx => ctx.fillRect(sx, pY - 14, 4, 4));
    }

    // ---- CHARITY GIVERS ----
    this.bX += this.bDir * 0.35;
    if (this.bX > 355) this.bDir = -1;
    if (this.bX < 260) this.bDir =  1;

    const lp = Math.floor(this.t / 9) % 2;
    const giver = human('#5a2a8a', '#3a3a6a');
    // Animate legs
    giver[6] = lp === 0 ? [0, 7, 2, 6, '#3a3a6a'] : [0, 8, 2, 4, '#3a3a6a'];
    giver[7] = lp === 0 ? [3, 8, 2, 4, '#3a3a6a'] : [3, 7, 2, 6, '#3a3a6a'];
    spr(ctx, Math.round(this.bX), GY - 65, giver);

    // Receiver
    spr(ctx, 400, GY - 65, human('#8a5a2a', '#3a3a1a'));

    // Gift block floating between them
    if (this.bX > 318 && this.bX < 378) {
      const giftX = (this.bX + 400) / 2;
      const bob   = Math.sin(this.t * 0.12) * 3;
      fillRect(ctx, giftX, GY - 72 + bob, P, P, '#ffd700');
    }

    // Sadaqah label
    if (this.bDir === 1) {
      ctx.fillStyle = 'rgba(255,255,150,0.7)';
      ctx.font = '6px "Press Start 2P", monospace';
      ctx.fillText('Sadaqah!', Math.round(this.bX) - 8, GY - 76);
    }

    // ---- FLOATING QURAN ----
    const bob  = Math.sin(this.t * 0.04) * 5;
    const bkX  = 555, bkY = 42 + bob;
    spr(ctx, bkX, bkY, bookSpr());

    // Book glow
    const bGlow = ctx.createRadialGradient(bkX + 15, bkY + 12, 0, bkX + 15, bkY + 12, 28 + Math.sin(this.t * 0.06) * 6);
    bGlow.addColorStop(0, 'rgba(0,255,120,0.3)');
    bGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bGlow;
    ctx.fillRect(bkX - 28, bkY - 28, 86, 86);

    // Click hints
    this.hint('👆', 68, GY - 74);
    this.hint('👆', 293, GY - 74);
    this.hint('👆', 553, 28);
  }
}

// ====================================================
//  SCENE 2 — CAVE OF SHADOWS  (3 sub-scenes)
//  A: Disbelievers — sealed hearts (2:6-7)
//  B: Hypocrites   — two faces    (2:8-12)
//  C: Parables     — fire/storm   (2:17-20)
// ====================================================

class Scene2 extends BaseScene {
  constructor() {
    super('canvas-s2');
    if (!this.canvas) return;
    this.sub        = 'A';
    // Sub-A state — truth moves toward figure; figure turns away
    this.lightX     = 570;  // x position of approaching truth/book
    this.lightDir   = -1;   // -1 = approaching, 1 = retreating
    this.figFacing  = 1;    // 1 = facing truth,  -1 = turned away
    this.heartSpots = 0;
    this._sealPause = 0;
    // Sub-B state
    this.hX         = 220;
    this.hDir       = 1;
    // Sub-C state
    this.tLit       = true;
    this.tTimer     = 0;
    this._setupToggle();
    this._setZones();
  }

  _setupToggle() {
    const btn = document.getElementById('s2-toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      this.sub = this.sub === 'A' ? 'B' : this.sub === 'B' ? 'C' : 'A';
      const labels = {
        A: '🎭 SEE THE HYPOCRITE →',
        B: '⛈️ SEE THE PARABLES →',
        C: '🔒 SEE SEALED HEARTS →',
      };
      btn.textContent = labels[this.sub];
      // Reset each sub-scene state on switch
      this.lightX = 570; this.lightDir = -1; this.figFacing = 1;
      this.heartSpots = 0; this._sealPause = 0;
      this.hX = 220;  this.hDir = 1;
      this.tLit = true; this.tTimer = 0;
      this._setZones();
    });
  }

  _setZones() {
    if (this.sub === 'A') {
      this.clickZones = [
        { x: 285, y: GY - 130, w: 92,  h: 88, key: 'heart_sealed' },
        { x: 430, y: 0,        w: 270, h: CH,  key: 'truth_light'  }, // whole right area — book moves but stays right
      ];
    } else if (this.sub === 'B') {
      this.clickZones = [
        { x: 0,      y: GY - 85, w: CW / 2 - 10, h: 85, key: 'hypocrite_claim'   },
        { x: CW / 2, y: GY - 85, w: CW / 2,      h: 85, key: 'hypocrite_corrupt' },
      ];
    } else {
      this.clickZones = [
        { x: 10,     y: GY - 120, w: CW / 2 - 20, h: 120, key: 'fire_parable'  },
        { x: CW / 2, y: GY - 120, w: CW / 2,      h: 120, key: 'storm_parable' },
      ];
    }
  }

  draw() {
    if      (this.sub === 'A') this._drawDisbeliever();
    else if (this.sub === 'B') this._drawHypocrite();
    else                       this._drawParables();
  }

  // ---- SUB-SCENE A: THE SEALED HEART ----
  // Truth COMES to the figure — figure turns away each time
  _drawDisbeliever() {
    const ctx = this.ctx;

    // Dark background — the figure lives in shadow
    fillRect(ctx, 0, 0, CW, CH, '#050510');
    fillRect(ctx, 0, GY, CW, CH - GY, '#1a1a2a');
    for (let bx = 0; bx < CW; bx += 28) {
      fillRect(ctx, bx, GY, 28, 8, bx % 56 === 0 ? '#141422' : '#222232');
    }

    // Heavy darkness on far left where figure stands
    const cDark = ctx.createLinearGradient(0, 0, 180, 0);
    cDark.addColorStop(0, 'rgba(0,0,0,0.85)');
    cDark.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = cDark;
    ctx.fillRect(0, 0, 180, CH);

    // Section label
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillStyle = 'rgba(180,100,100,0.85)';
    ctx.fillText('2:6–7 — The Disbelievers', 12, 18);

    // ---- MOVE THE TRUTH / BOOK ----
    this.lightX += this.lightDir * 0.85;

    const figX   = 88;           // figure is stationary
    const lightY = GY - 112;

    // Truth reaches the figure → figure rejects → truth retreats
    if (this.lightX < figX + 95 && this.lightDir === -1) {
      this.lightDir  =  1;        // truth retreats
      this.figFacing = -1;        // figure turns away
      this.heartSpots = Math.min(this.heartSpots + 3, HEART_SPOT_ORDER.length);
    }
    // Truth fully retreated — start approaching again
    if (this.lightX > 555 && this.lightDir === 1) {
      this.lightDir = -1;
    }
    // Figure turns back to face truth once it's far enough away
    if (this.lightX > 380 && this.figFacing === -1) {
      this.figFacing = 1;
    }

    // Fully sealed → pause → reset cycle
    if (this.heartSpots >= HEART_SPOT_ORDER.length) {
      if (!this._sealPause) this._sealPause = this.t;
      if (this.t - this._sealPause > 120) {
        this.heartSpots = 0; this._sealPause = 0;
        this.lightX = 570;   this.lightDir = -1;
        this.figFacing = 1;
      }
    }

    const lX    = Math.round(this.lightX);
    const pulse = (Math.sin(this.t * 0.04) + 1) / 2;

    // ---- TRUTH LIGHT / BOOK (moving) ----
    // Broad glow radiating from book, pointing LEFT toward figure
    const lGlow = ctx.createRadialGradient(lX + 15, lightY + 28, 6,
                                           lX + 15, lightY + 28, 130 + pulse * 20);
    lGlow.addColorStop(0,    `rgba(255,215,0,${0.3 + pulse * 0.15})`);
    lGlow.addColorStop(0.4,  `rgba(255,200,50,${0.12 + pulse * 0.06})`);
    lGlow.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = lGlow;
    ctx.fillRect(lX - 120, lightY - 50, 280, 185);

    // Book sprite
    spr(ctx, lX, lightY, bookSpr());

    // Rays pointing LEFT (toward the figure)
    ctx.save();
    ctx.strokeStyle = `rgba(255,215,0,${0.2 + pulse * 0.12})`;
    ctx.lineWidth = 2;
    [[-1,-0.1],[-1,-0.7],[-0.9,0.4],[-1.4,-0.3],[-0.6,-1.2]].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(lX + 5, lightY + 14);
      ctx.lineTo(lX + 5 + dx * 48, lightY + 14 + dy * 36);
      ctx.stroke();
    });
    ctx.restore();

    // Label on book — changes based on direction
    ctx.font = '7px "Press Start 2P", monospace';
    const approaching = this.lightDir === -1;
    ctx.fillStyle = `rgba(255,215,0,${0.5 + pulse * 0.4})`;
    ctx.fillText(approaching ? '← WARNING' : 'Retreating...', lX - 18, lightY - 10);

    // Light trail stretching toward the figure when close
    if (lX < 380) {
      const alpha = Math.min(0.18, (380 - lX) / 900);
      const trailG = ctx.createLinearGradient(figX + 45, 0, lX, 0);
      trailG.addColorStop(0, 'rgba(255,215,0,0)');
      trailG.addColorStop(1, `rgba(255,215,0,${alpha})`);
      ctx.fillStyle = trailG;
      ctx.fillRect(figX + 45, lightY, lX - figX - 45, 55);
    }

    // ---- HEART (center stage) ----
    const heartX = 290, heartY = GY - 122;
    drawHeart(ctx, heartX, heartY, this.heartSpots, this.t);

    // ---- FIGURE (stationary, turns back on incoming truth) ----
    const turnedAway = this.figFacing === -1;
    const bob        = Math.round(Math.sin(this.t * 0.05));

    if (turnedAway) {
      // Shirt very dark — in spiritual darkness
      const fSpr = human('#1a0e22', '#1a1a2e');
      // Shift eyes to left side to suggest facing away
      fSpr[1] = [1, 1, 1, 1, '#333'];
      fSpr[2] = [2, 1, 1, 1, '#333'];
      spr(ctx, figX, GY - 65 + bob, fSpr);

      // Dark shadow overlay — back turned
      fillRect(ctx, figX, GY - 62 + bob, 6 * P, 2 * P, 'rgba(0,0,0,0.45)');

      // "Rejected!" flash
      if (Math.floor(this.t / 8) % 4 < 2) {
        ctx.fillStyle = '#cc2222';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText('✗ REJECTED', figX - 4, GY - 80);
      }
    } else {
      // Facing right — watching truth approach (lighter shirt, some hope visible)
      spr(ctx, figX, GY - 65 + bob, human('#5a3a7a', '#2a2a4a'));
    }

    this.hint('👆 click heart or the glowing book!', 200, CH - 8);
  }

  // ---- SUB-SCENE B: THE HYPOCRITE ----
  _drawHypocrite() {
    const ctx = this.ctx;
    fillRect(ctx, 0, 0, CW, CH, '#080818');
    fillRect(ctx, 0, GY, CW, CH - GY, '#2a2a3a');
    for (let bx = 0; bx < CW; bx += 28) {
      fillRect(ctx, bx, GY, 28, 8, bx % 56 === 0 ? '#1e1e30' : '#363648');
    }
    fillRect(ctx, CW / 2 - 2, 0, 4, GY, '#12122a');

    // Belief aura (left side)
    const bAura = ctx.createRadialGradient(100, GY - 40, 10, 100, GY - 40, 80);
    bAura.addColorStop(0, 'rgba(80,200,80,0.12)');
    bAura.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bAura;
    ctx.fillRect(0, GY - 120, 210, 120);

    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillStyle = 'rgba(100,220,100,0.7)';
    ctx.fillText('Believers', 12, 18);
    ctx.fillStyle = 'rgba(200,80,80,0.7)';
    ctx.fillText('Disbelievers', CW - 140, 18);
    ctx.fillStyle = 'rgba(160,160,200,0.65)';
    ctx.fillText('2:8–12', CW / 2 - 25, 18);

    // Background characters
    spr(ctx, 25,  GY - 65, human('#3a6b3a', '#1a3a6e'));
    spr(ctx, 108, GY - 65, human('#2a5a8a', '#1a1a4a'));
    spr(ctx, CW - 130, GY - 65, human('#6a2a2a', '#3a1a1a', SKIN2));
    spr(ctx, CW - 60,  GY - 65, human('#5a1a1a', '#2a1a1a', SKIN2));

    // Moving hypocrite
    this.hX += this.hDir * 0.55;
    if (this.hX > CW * 0.60) this.hDir = -1;
    if (this.hX < CW * 0.28) this.hDir =  1;

    const onLeft   = this.hX < CW / 2;
    const hypoSpr  = human(
      onLeft ? '#5a9a5a' : '#8a3a3a',
      '#4a4a7a', '#d4a870',
      onLeft ? '#00cc00' : '#cc0000'
    );
    const hXr = Math.round(this.hX);
    spr(ctx, hXr, GY - 65, hypoSpr);

    // Face emoji
    ctx.font = '13px serif';
    ctx.fillText(onLeft ? '😊' : '😏', hXr + 6, GY - 72);

    // Chat bubble
    fillRect(ctx, hXr - 18, GY - 100, 92, 20, 'rgba(255,255,255,0.12)');
    ctx.fillStyle = 'rgba(255,255,180,0.9)';
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillText(onLeft ? '"We believe!"' : '"Heh..."', hXr - 13, GY - 85);

    // MASK label above
    if (Math.floor(this.t / 30) % 2 === 0) {
      ctx.fillStyle = onLeft ? 'rgba(100,220,100,0.8)' : 'rgba(200,80,80,0.8)';
      ctx.font = '7px "Press Start 2P", monospace';
      ctx.fillText(onLeft ? 'MASK ON' : 'TRUE FACE', hXr - 8, GY - 110);
    }

    this.hint('👆 click each side!', CW / 2 - 75, CH - 8);
  }

  // ---- SUB-SCENE C: FIRE & STORM PARABLES ----
  _drawParables() {
    const ctx = this.ctx;
    fillRect(ctx, 0, 0, CW, CH, '#05050e');
    fillRect(ctx, 0, GY, CW, CH - GY, '#1e1e2e');
    fillRect(ctx, CW / 2 - 1, 0, 2, GY, '#111128');

    this.tTimer++;
    if (this.tTimer === 180) this.tLit = false;
    if (this.tTimer === 320) { this.tLit = true; this.tTimer = 0; }

    // --- LEFT: FIRE PARABLE ---
    if (this.tLit) {
      const tGlow = ctx.createRadialGradient(220, GY - 45, 0, 220, GY - 45, 90 + Math.sin(this.t * 0.1) * 12);
      tGlow.addColorStop(0, 'rgba(255,140,40,0.35)');
      tGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = tGlow;
      ctx.fillRect(130, GY - 135, 180, 135);
    }

    spr(ctx, 215, GY - 38, torchSpr(this.tLit));

    if (this.tLit) {
      const ff = Math.floor(this.t / 5) % 3;
      [
        [[215, GY-52,8,10,'#ff6600'],[218,GY-58,5,8,'#ffcc00']],
        [[213, GY-55,12,12,'#ff4400'],[217,GY-62,7,10,'#ffaa00']],
        [[215, GY-50,8,14,'#ff7700'],[216,GY-58,6,8,'#ffdd00']],
      ][ff].forEach(([fx,fy,fw,fh,fc]) => fillRect(ctx, fx, fy, fw, fh, fc));

      spr(ctx, 130, GY - 65, human('#5a3a7a', '#2a2a4a'));
    } else {
      ctx.globalAlpha = 0.25;
      spr(ctx, 130, GY - 65, human('#333', '#222'));
      ctx.globalAlpha = 1;
      for (let bk = 0; bk < 6; bk++) {
        fillRect(ctx, 115+(bk%3)*30, GY-75+Math.floor(bk/3)*30, 28, 28, '#0a0a18');
      }
      ctx.fillStyle = 'rgba(150,150,200,0.6)';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('?', 148, GY - 70);
    }

    // --- RIGHT: STORM PARABLE ---
    const lPhase = Math.floor(this.t / 38) % 5;
    const litS   = lPhase < 2;

    for (let r = 0; r < 22; r++) {
      fillRect(ctx, CW/2 + (r*57)%(CW/2-10), (this.t*5+r*28)%GY, 1, 8, 'rgba(100,150,255,0.45)');
    }
    if (litS) {
      spr(ctx, CW * 0.72, 8, boltSpr());
      fillRect(ctx, CW / 2, 0, CW / 2, GY, 'rgba(255,255,200,0.07)');
    }

    const sfX = CW * 0.62;
    if (litS) {
      const wlp = Math.floor(this.t / 10) % 2;
      const wSpr = human('#4a4a8a', '#2a2a3a');
      wSpr[6] = wlp===0 ? [0,7,2,6,'#2a2a3a'] : [0,8,2,4,'#2a2a3a'];
      wSpr[7] = wlp===0 ? [3,8,2,4,'#2a2a3a'] : [3,7,2,6,'#2a2a3a'];
      spr(ctx, sfX, GY - 65, wSpr);
      ctx.fillStyle = 'rgba(255,255,80,0.8)';
      ctx.font = '10px monospace';
      ctx.fillText('→', sfX + 46, GY - 38);
    } else {
      ctx.globalAlpha = 0.45;
      spr(ctx, sfX, GY - 65, human('#4a4a8a', '#2a2a3a'));
      ctx.globalAlpha = 1;
      ctx.font = '14px serif';
      ctx.fillText('❄️', sfX + 5, GY - 78);
    }

    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillStyle = 'rgba(255,140,80,0.8)';
    ctx.fillText('🔥 Fire Parable (2:17)', 12, 17);
    ctx.fillStyle = 'rgba(100,150,255,0.8)';
    ctx.fillText('⛈️ Storm Parable (2:20)', CW / 2 + 8, 17);

    this.hint('👆 click each side!', CW / 2 - 75, CH - 8);
  }
}

// ====================================================
//  SCENE 3 — GARDEN OF FIRST LIGHT
//  Sub-A: The First Command (2:30–34) — angels, Iblis
//  Sub-B: The First Test   (2:35–38) — tree, whisper, tawbah
// ====================================================

class Scene3 extends BaseScene {
  constructor() {
    super('canvas-s3');
    if (!this.canvas) return;
    this.sub = 'A';         // 'A' = creation/angels,  'B' = forbidden tree/whisper
    this.whisperTimer = 0;
    this.whisperPhase = 0;  // 0=peaceful, 1=whispering, 2=reaching/eating, 3=tawbah
    this._setupToggle();
    this._setZones();
  }

  _setupToggle() {
    const btn = document.getElementById('s3-toggle-btn');
    if (!btn) return;
    btn.textContent = '🌳 SEE TREE SCENE →';
    btn.onclick = () => {
      this.sub = this.sub === 'A' ? 'B' : 'A';
      btn.textContent = this.sub === 'A' ? '🌳 SEE TREE SCENE →' : '👼 SEE ANGELS →';
      this.whisperTimer = 0;
      this.whisperPhase = 0;
      this._setZones();
    };
  }

  _setZones() {
    if (this.sub === 'A') {
      this.clickZones = [
        { x: 0,   y: 0,        w: CW,  h: 38,  key: 'khalifah'       },
        { x: 55,  y: GY - 88,  w: 280, h: 88,  key: 'angels_bow'     },
        { x: 310, y: GY - 125, w: 80,  h: 125, key: 'forbidden_tree' },
        { x: 555, y: GY - 80,  w: 90,  h: 80,  key: 'iblis_refuse'   },
      ];
    } else {
      this.clickZones = [
        { x: 340,      y: GY - 120, w: 90,  h: 120, key: 'forbidden_tree' },
        { x: CW - 115, y: GY - 95,  w: 115, h: 95,  key: 'iblis_whisper'  },
        { x: 0,        y: 0,        w: CW,  h: 42,   key: 'adam_tawbah'   },
      ];
    }
  }

  draw() {
    if (this.sub === 'A') this._drawAngels();
    else                   this._drawTree();
  }

  // ---- SUB-SCENE A: THE FIRST COMMAND (2:30–34) ----
  _drawAngels() {
    const ctx = this.ctx;

    const skyG = ctx.createLinearGradient(0, 0, 0, GY);
    skyG.addColorStop(0,   '#0d1f3c');
    skyG.addColorStop(0.5, '#1a3a28');
    skyG.addColorStop(1,   '#2a5a1a');
    ctx.fillStyle = skyG;
    ctx.fillRect(0, 0, CW, GY);

    this.stars(32);

    // Divine light — pulsing from top
    const divPulse = (Math.sin(this.t * 0.025) + 1) / 2;
    const divG = ctx.createLinearGradient(0, 0, 0, 90);
    divG.addColorStop(0, `rgba(255,215,0,${0.06 + divPulse * 0.08})`);
    divG.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.fillStyle = divG;
    ctx.fillRect(0, 0, CW, 90);

    if (Math.floor(this.t / 28) % 2 === 0) {
      ctx.fillStyle = 'rgba(255,215,0,0.6)';
      ctx.font = '7px "Press Start 2P", monospace';
      ctx.fillText('☝️ click the sky — or anything!', 190, 18);
    }

    this.ground('#3a7a2a', '#2a5a1a');

    for (let fl = 0; fl < 12; fl++) {
      fillRect(ctx, (fl * 59) % CW, GY - 5, 3, 3, '#ffd700');
    }
    for (let gx = 0; gx < CW; gx += 10) {
      fillRect(ctx, gx, GY - (3 + (gx * 3) % 5), 2, 3 + (gx * 3) % 5, '#4aaa3a');
    }

    // ---- FORBIDDEN TREE (center) ----
    const tPulse = (Math.sin(this.t * 0.04) + 1) / 2;
    const tX = 320;
    spr(ctx, tX, GY - 108, treeSpr());
    const tGlow = ctx.createRadialGradient(tX + 20, GY - 60, 6, tX + 20, GY - 60, 55 + tPulse * 18);
    tGlow.addColorStop(0, `rgba(255,215,0,${0.18 + tPulse * 0.12})`);
    tGlow.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.fillStyle = tGlow;
    ctx.fillRect(tX - 35, GY - 140, 110, 140);

    // ---- ANGELS (bowing in staggered sequence) ----
    const aPositions = [60, 120, 182, 244];
    aPositions.forEach((ax, i) => {
      const phase = Math.floor((this.t - i * 18) / 65) % 2;
      spr(ctx, ax, phase === 1 ? GY - 72 : GY - 80, angelSpr(phase === 1));
    });

    // ---- IBLIS (upright, defiant — refuses to bow) ----
    const iX = 565;
    spr(ctx, iX, GY - 65, iblisSpr());
    const iGlow = ctx.createRadialGradient(iX + 15, GY - 35, 5, iX + 15, GY - 35, 48);
    iGlow.addColorStop(0, 'rgba(255,40,40,0.22)');
    iGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = iGlow;
    ctx.fillRect(iX - 33, GY - 80, 96, 80);

    if (Math.floor(this.t / 20) % 2 === 0) {
      ctx.fillStyle = '#ff3333';
      ctx.font = 'bold 15px monospace';
      ctx.fillText('!', iX + 18, GY - 78);
    }

    this.hint('👆', 62,  GY - 94);
    this.hint('👆', 332, GY - 130);
    this.hint('👆', 565, GY - 88);
  }

  // ---- SUB-SCENE B: THE FIRST TEST (2:35–38) ----
  _drawTree() {
    const ctx = this.ctx;

    // Jannah sky — slightly deeper, more intimate
    const skyG = ctx.createLinearGradient(0, 0, 0, GY);
    skyG.addColorStop(0,    '#0b1a30');
    skyG.addColorStop(0.45, '#142618');
    skyG.addColorStop(1,    '#2a5a1a');
    ctx.fillStyle = skyG;
    ctx.fillRect(0, 0, CW, GY);

    this.stars(26);
    this.ground('#3a7a2a', '#2a5a1a');

    for (let fl = 0; fl < 14; fl++) {
      fillRect(ctx, (fl * 51) % CW, GY - 5, 3, 3, '#ffd700');
    }
    for (let gx = 0; gx < CW; gx += 10) {
      fillRect(ctx, gx, GY - (3 + (gx * 3) % 5), 2, 3 + (gx * 3) % 5, '#4aaa3a');
    }

    // ---- DARKNESS VEIL — Iblis lurks on far right ----
    const darkVeil = ctx.createLinearGradient(CW - 130, 0, CW, 0);
    darkVeil.addColorStop(0, 'rgba(0,0,0,0)');
    darkVeil.addColorStop(1, 'rgba(0,0,6,0.9)');
    ctx.fillStyle = darkVeil;
    ctx.fillRect(CW - 130, 0, 130, CH);

    // Iblis red eyes — always visible, glow intensifies during whisper
    const eyeAlpha = this.whisperPhase === 0
      ? 0.3 + Math.sin(this.t * 0.05) * 0.12
      : 0.55 + Math.sin(this.t * 0.09) * 0.28;
    const ieX = CW - 22;
    const ieY = GY - 44;
    fillRect(ctx, ieX - 5, ieY,     5, 4, `rgba(255,20,20,${eyeAlpha})`);
    fillRect(ctx, ieX + 7, ieY,     5, 4, `rgba(255,20,20,${eyeAlpha})`);
    // Inner eye glow
    const eyeGlow = ctx.createRadialGradient(ieX + 3, ieY + 2, 2, ieX + 3, ieY + 2, 38);
    eyeGlow.addColorStop(0, `rgba(180,0,0,${eyeAlpha * 0.45})`);
    eyeGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = eyeGlow;
    ctx.fillRect(ieX - 35, ieY - 36, 76, 76);

    // ---- PHASE TIMER ----
    this.whisperTimer++;
    if (this.whisperPhase === 0 && this.whisperTimer > 85)  { this.whisperPhase = 1; this.whisperTimer = 0; }
    if (this.whisperPhase === 1 && this.whisperTimer > 155) { this.whisperPhase = 2; this.whisperTimer = 0; }
    if (this.whisperPhase === 2 && this.whisperTimer > 115) { this.whisperPhase = 3; this.whisperTimer = 0; }
    if (this.whisperPhase === 3 && this.whisperTimer > 120) { this.whisperPhase = 0; this.whisperTimer = 0; }

    // ---- WHISPER PARTICLES (phase 1 & 2) ----
    if (this.whisperPhase === 1 || this.whisperPhase === 2) {
      const targetX = 310;
      for (let p = 0; p < 12; p++) {
        const elapsed  = this.whisperTimer + p * 14;
        const progress = Math.min(1, elapsed / 155);
        if (progress <= 0) continue;
        const pX     = Math.round(ieX - progress * (ieX - targetX));
        const pY     = Math.round(ieY + Math.sin(progress * Math.PI * 3 + p * 0.7) * 17);
        const pAlpha = (progress > 0.85 ? (1 - progress) / 0.15 : 1) * 0.72;
        ctx.fillStyle = `rgba(130,0,0,${pAlpha})`;
        ctx.fillRect(pX, pY, 5, 5);
        ctx.fillStyle = `rgba(55,0,0,${pAlpha})`;
        ctx.fillRect(pX + 1, pY + 1, 3, 3);
      }
      // "psst…" text floating near the eyes
      if (Math.floor(this.t / 18) % 2 === 0) {
        ctx.fillStyle = 'rgba(160,18,18,0.78)';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillText('psst...', ieX - 62, ieY - 20);
      }
    }

    // ---- FORBIDDEN TREE ----
    const treeX  = 360;
    const tPulse = this.whisperPhase < 2 ? (Math.sin(this.t * 0.04) + 1) / 2 : 0.08;
    spr(ctx, treeX, GY - 108, treeSpr());
    const tGlow = ctx.createRadialGradient(treeX + 20, GY - 60, 6, treeX + 20, GY - 60, 55 + tPulse * 18);
    tGlow.addColorStop(0, `rgba(255,215,0,${0.18 + tPulse * 0.12})`);
    tGlow.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.fillStyle = tGlow;
    ctx.fillRect(treeX - 35, GY - 140, 110, 140);

    // Fruit — visible on tree, then falls to hand, then eaten in bites
    const handX = 274 + 32 + 6;   // f2X(274) + arm(32) + centre(6)
    const handY = GY - 50;
    if (this.whisperPhase < 2) {
      fillRect(ctx, treeX + 14, GY - 83, 7, 7, '#cc1111');
      fillRect(ctx, treeX + 27, GY - 71, 7, 7, '#dd2222');
    } else if (this.whisperPhase === 2) {
      const t2 = this.whisperTimer;

      if (t2 < 38) {
        // Arc from tree to hand
        const p  = t2 / 38;
        const fx = Math.round((treeX + 14) + p * (handX - (treeX + 14)));
        const fy = Math.round((GY - 83)    + p * (handY - (GY - 83)) - Math.sin(p * Math.PI) * 18);
        fillRect(ctx, fx, fy, 7, 7, '#cc1111');

      } else if (t2 < 55) {
        // In hand — whole fruit, slight bob
        const bob = Math.round(Math.sin(t2 * 0.4) * 1.5);
        fillRect(ctx, handX, handY + bob, 7, 7, '#cc1111');

      } else if (t2 < 72) {
        // First bite — 5×5, one crumb
        fillRect(ctx, handX,     handY,     5, 5, '#cc1111');
        fillRect(ctx, handX + 6, handY - 3, 2, 2, '#992222');

      } else if (t2 < 88) {
        // Second bite — 3×3, more crumbs
        fillRect(ctx, handX + 1, handY + 1, 3, 3, '#cc1111');
        fillRect(ctx, handX + 5, handY - 4, 2, 2, '#992222');
        fillRect(ctx, handX - 3, handY - 2, 2, 2, '#992222');
        fillRect(ctx, handX + 7, handY + 2, 2, 2, '#992222');

      } else {
        // Eaten — crumbs scatter + dark flash + label
        fillRect(ctx, handX + 6, handY - 5, 2, 2, '#992222');
        fillRect(ctx, handX - 4, handY - 1, 2, 2, '#882222');
        fillRect(ctx, handX + 2, handY + 4, 2, 2, '#772211');
        fillRect(ctx, handX + 9, handY + 1, 2, 2, '#882222');
        // Dark ripple overlay
        if (Math.floor(t2 / 6) % 2 === 0) {
          ctx.fillStyle = 'rgba(40,0,0,0.22)';
          ctx.fillRect(0, 0, CW, CH);
        }
        ctx.fillStyle = 'rgba(200,30,30,0.85)';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText('✗ EATEN', 218, GY - 82);
      }
    }

    // ---- TWO HUMAN FIGURES ----
    // They gradually lean toward the tree as the whisper reaches them
    const figShift = this.whisperPhase === 1 && this.whisperTimer > 85
      ? Math.min(24, (this.whisperTimer - 85) / 2.2)
      : this.whisperPhase >= 2 ? 24 : 0;

    if (this.whisperPhase === 3) {
      // Tawbah — both bow to the ground
      spr(ctx, 188, GY - 55, humanBow('#8a7a5a', '#4a3a2a'));
      spr(ctx, 252, GY - 55, humanBow('#7a8a6a', '#3a4a2a'));
    } else {
      const f1X = Math.round(188 + figShift);
      const f2X = Math.round(250 + figShift);
      spr(ctx, f1X, GY - 65, human('#8a7a5a', '#4a3a2a'));
      spr(ctx, f2X, GY - 65, human('#7a8a6a', '#3a4a2a'));
      // Arm reaching toward tree — extended through whole eating sequence
      if (this.whisperPhase === 2) {
        // Arm starts short and extends as fruit arcs in
        const armLen = this.whisperTimer < 38
          ? Math.round(20 * (this.whisperTimer / 38))
          : 20;
        ctx.fillStyle = '#c49060';
        ctx.fillRect(f2X + 32, GY - 50, armLen, 4);
      }
    }

    // ---- TAWBAH LIGHT (phase 3) — golden mercy descends ----
    if (this.whisperPhase === 3) {
      const gI = Math.min(1, this.whisperTimer / 45);
      const tawbahG = ctx.createRadialGradient(270, 0, 0, 270, 0, 175 + gI * 35);
      tawbahG.addColorStop(0,   `rgba(255,215,0,${0.4 * gI})`);
      tawbahG.addColorStop(0.5, `rgba(255,200,50,${0.13 * gI})`);
      tawbahG.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = tawbahG;
      ctx.fillRect(0, 0, CW, CH);
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillStyle = `rgba(255,215,0,${gI * 0.95})`;
      ctx.fillText('Allah forgives... (2:37)', 180, 30);
    }

    // Phase label (top-left)
    const labels = [
      'In the Garden of Jannah...',
      'Iblis whispers...',
      'The moment of the test',
      'Tawbah — Allah forgives',
    ];
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillStyle = 'rgba(200,200,200,0.6)';
    ctx.fillText(labels[this.whisperPhase] || '', 12, 18);

    this.hint('👆 click tree, shadow, or sky!', 175, CH - 8);
  }
}

// ====================================================
//  SCENE 4 — SHORES OF SINAI (2:40–61)
//  Three-panel: Sea Parting | Manna & Salwa | 12 Springs
// ====================================================

class Scene4 extends BaseScene {
  constructor() {
    super('canvas-s4');
    if (!this.canvas) return;
    const W = Math.floor(CW / 3);
    this.clickZones = [
      { x: 0,     y: 0, w: W,        h: CH, key: 'sea_parting'   },
      { x: W,     y: 0, w: W,        h: CH, key: 'manna_salwa'   },
      { x: W * 2, y: 0, w: CW-W*2,  h: CH, key: 'twelve_springs' },
    ];
    // Sea panel phase state
    this.seaPhase = 0;  // 0=crossing, 1=soldiers, 2=closing, 3=drowning, 4=calm
    this.seaTimer = 0;
  }

  draw() {
    const W = Math.floor(CW / 3);
    this._drawSea(0, W);
    this._drawManna(W, W);
    this._drawSprings(W * 2, CW - W * 2);
    // Panel dividers
    fillRect(this.ctx, W - 1,     0, 3, CH, 'rgba(0,0,0,0.65)');
    fillRect(this.ctx, W * 2 - 1, 0, 3, CH, 'rgba(0,0,0,0.65)');
  }

  // ---- PANEL 1: SEA PARTING (2:50) — 5-phase narrative ----
  _drawSea(x, w) {
    const ctx = this.ctx;

    // ---- PHASE TIMER ----
    this.seaTimer++;
    if (this.seaPhase === 0 && this.seaTimer > 105) { this.seaPhase = 1; this.seaTimer = 0; }
    if (this.seaPhase === 1 && this.seaTimer > 85)  { this.seaPhase = 2; this.seaTimer = 0; }
    if (this.seaPhase === 2 && this.seaTimer > 48)  { this.seaPhase = 3; this.seaTimer = 0; }
    if (this.seaPhase === 3 && this.seaTimer > 60)  { this.seaPhase = 4; this.seaTimer = 0; }
    if (this.seaPhase === 4 && this.seaTimer > 75)  { this.seaPhase = 0; this.seaTimer = 0; }

    // ---- DYNAMIC WALL WIDTH ----
    const baseW = 32;
    let wallW = baseW;
    if (this.seaPhase === 2) {
      wallW = baseW + Math.round((this.seaTimer / 48) * (Math.floor(w / 2) - baseW + 6));
    } else if (this.seaPhase >= 3) {
      wallW = Math.floor(w / 2) + 6;
    }

    // ---- BACKGROUND ----
    fillRect(ctx, x, 0,  w, CH, '#061420');

    // Sea floor: sand when parted, water when closed
    if (this.seaPhase <= 1) {
      fillRect(ctx, x, GY, w, CH - GY, '#9a7840');
      for (let s = x; s < x + w; s += 14) {
        fillRect(ctx, s, GY - 3, 10, 2, '#7a5a30');
      }
    } else {
      // Blend from sand to dark water as walls close
      fillRect(ctx, x, GY, w, CH - GY, '#9a7840');
      const wp = this.seaPhase === 2 ? Math.min(1, this.seaTimer / 35) : 1;
      fillRect(ctx, x, GY, w, CH - GY, `rgba(8,36,72,${wp * 0.85})`);
    }

    // Stars
    [[x+22,8],[x+65,14],[x+105,7],[x+155,20],[x+195,10],[x+222,4]].forEach(([sx,sy]) => {
      fillRect(ctx, sx, sy, 2, 2, `rgba(255,255,200,${0.38 + Math.sin(this.t*0.04+sx)*0.28})`);
    });

    const wav = Math.round(Math.sin(this.t * 0.055) * 3);

    // ---- LEFT WATER WALL ----
    for (let wy = 8; wy < GY; wy += 8) {
      fillRect(ctx, x, wy + wav, wallW, 8, wy % 16 === 0 ? '#1a6a9a' : '#145080');
      if (wy % 24 === 0) fillRect(ctx, x, wy, wallW, 2, 'rgba(255,255,255,0.16)');
    }
    const foamW = Math.min(wallW, 36);
    for (let fx = 0; fx < foamW; fx += 4) {
      fillRect(ctx, x + fx, 8 + Math.round(Math.sin(this.t*0.09+fx)*3), 3, 3, 'rgba(200,235,255,0.7)');
    }

    // ---- RIGHT WATER WALL ----
    const rStart = x + w - wallW;
    for (let wy = 8; wy < GY; wy += 8) {
      fillRect(ctx, rStart, wy - wav, wallW, 8, wy % 16 === 0 ? '#1a6a9a' : '#145080');
      if (wy % 24 === 0) fillRect(ctx, rStart, wy, wallW, 2, 'rgba(255,255,255,0.16)');
    }
    for (let fx = 0; fx < foamW; fx += 4) {
      fillRect(ctx, rStart + fx, 8 + Math.round(Math.sin(this.t*0.09+fx+3)*3), 3, 3, 'rgba(200,235,255,0.7)');
    }

    const corridor = Math.max(0, w - wallW * 2 - 16);

    // ---- PHASE 0: BANI ISRA'IL CROSSING ----
    if (this.seaPhase === 0 || (this.seaPhase === 1 && this.seaTimer < 45)) {
      const elapsed = this.seaPhase === 0 ? this.seaTimer : 105 + this.seaTimer;
      [0, 32, 64].forEach((off, i) => {
        const p = Math.min(1, (elapsed + off) / 145);
        if (p >= 1) return;
        const fx  = x + baseW + 8 + Math.round(p * (corridor + 10));
        const bob = Math.round(Math.sin(this.t * 0.12 + i) * 1);
        spr(ctx, fx, GY - 65 + bob, human(
          ['#5a6a4a','#4a4a6a','#6a5a3a'][i],
          ['#2a3a1a','#1a1a3a','#3a2a1a'][i]
        ));
      });
    }

    // ---- PHASES 1 & 2: SOLDIERS ENTER AND GET TRAPPED ----
    if (this.seaPhase === 1 || this.seaPhase === 2) {
      const elapsed = this.seaPhase === 1 ? this.seaTimer : 85 + this.seaTimer;
      [0, 26, 52].forEach((off, i) => {
        const p  = Math.min(0.82, (elapsed + off) / 110);
        const fx = x + wallW + 8 + Math.round(p * (corridor - 8));
        const bob = Math.round(Math.sin(this.t * 0.15 + i * 0.9) * 1);

        if (this.seaPhase === 2) {
          // Soldiers sinking — clip to above rising water line
          const sinkY = Math.round((this.seaTimer / 48) * 62);
          ctx.save();
          ctx.beginPath();
          ctx.rect(x, 0, w, GY - sinkY);
          ctx.clip();
          spr(ctx, fx, GY - 65 + bob, human('#8a2020', '#4a1010', '#c87060'));
          ctx.restore();
        } else {
          spr(ctx, fx, GY - 65 + bob, human('#8a2020', '#4a1010', '#c87060'));
        }
      });
    }

    // ---- PHASE 3: SPLASH & DROWNED ----
    if (this.seaPhase === 3) {
      const sp = this.seaTimer / 60;
      // Expanding splash particles
      for (let dot = 0; dot < 20; dot++) {
        const angle  = (dot / 20) * Math.PI * 2;
        const radius = 18 + sp * 38;
        const dX = x + Math.floor(w / 2) + Math.round(Math.cos(angle) * radius * 0.85);
        const dY = GY - 28 - Math.round(Math.abs(Math.sin(angle)) * radius * 0.55);
        const dA = Math.max(0, 1 - sp);
        fillRect(ctx, dX, dY, 4, 4, `rgba(100,200,255,${dA * 0.85})`);
      }
      // Foam surface
      for (let wx = x + 8; wx < x + w - 8; wx += 8) {
        const wA = Math.max(0, 0.65 - sp * 0.75);
        fillRect(ctx, wx, GY - 10 + Math.round(Math.sin(this.t*0.15+wx)*3), 6, 4, `rgba(80,180,255,${wA})`);
      }
      if (Math.floor(this.t / 8) % 2 === 0) {
        ctx.fillStyle = 'rgba(80,200,255,0.95)';
        ctx.font      = '7px "Press Start 2P", monospace';
        ctx.fillText('DROWNED!', x + 18, GY - 42);
      }
    }

    // ---- PHASE 4: CALM SEA — BANI ISRA'IL SAFE ----
    if (this.seaPhase === 4) {
      for (let wx = x + 5; wx < x + w - 5; wx += 10) {
        fillRect(ctx, wx, GY - 7 + Math.round(Math.sin(this.t * 0.08 + wx) * 2), 8, 4, 'rgba(28,95,150,0.5)');
      }
      const vA = Math.min(1, this.seaTimer / 30);
      ctx.fillStyle = `rgba(100,230,120,${vA * 0.95})`;
      ctx.font      = '7px "Press Start 2P", monospace';
      ctx.fillText('SAVED! ✓', x + 24, GY - 42);
    }

    // ---- PHASE LABEL (bottom of panel) ----
    const labels = [
      "Bani Isra'il crossing...",
      "Pharaoh's army enters...",
      'Sea is closing!',
      '',
      "Safe! ✓",
    ];
    if (this.seaPhase !== 3 && labels[this.seaPhase]) {
      ctx.font      = '5px "Press Start 2P", monospace';
      ctx.fillStyle = 'rgba(140,195,255,0.72)';
      ctx.fillText(labels[this.seaPhase], x + 4, GY - 15);
    }

    // Permanent label + verse
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = 'rgba(80,200,255,0.9)';
    ctx.fillText('🌊 Sea Split', x + 5, 56);
    ctx.fillStyle = 'rgba(180,180,180,0.5)';
    ctx.fillText('2:50', x + 8, 68);
    this.hint('👆', x + w / 2 - 6, CH - 8);
  }

  // ---- PANEL 2: MANNA & SALWA (2:57) ----
  _drawManna(x, w) {
    const ctx = this.ctx;

    const skyG = ctx.createLinearGradient(x, 0, x, GY);
    skyG.addColorStop(0, '#0f1f35');
    skyG.addColorStop(1, '#2e4a2a');
    ctx.fillStyle = skyG;
    ctx.fillRect(x, 0, w, GY);
    fillRect(ctx, x, GY, w, CH - GY, '#c4a060');

    // Manna particles (soft white/cream dots falling)
    for (let m = 0; m < 22; m++) {
      const mx = x + ((m * 43 + Math.round(this.t * 0.25)) % w);
      const my = (m * 29 + this.t * 1.1) % (GY - 12);
      const a  = my < GY * 0.12 ? 0.3 : 0.82;
      fillRect(ctx, Math.round(mx),     Math.round(my),     3, 3, `rgba(255,245,215,${a})`);
      fillRect(ctx, Math.round(mx) + 1, Math.round(my) + 1, 2, 2, 'rgba(255,255,255,0.42)');
    }

    // Salwa birds (simple pixel Vs)
    [55, 128, 190].forEach((bx, i) => {
      const bxp = x + ((bx + Math.round(this.t * 0.55)) % w);
      const by  = 14 + Math.round(Math.sin(this.t * 0.04 + i * 1.3) * 7);
      ctx.fillStyle = '#885533';
      ctx.fillRect(bxp,     by,     3, 2);
      ctx.fillRect(bxp + 5, by,     3, 2);
      ctx.fillRect(bxp + 2, by + 2, 3, 2);
    });

    // Figure with arms raised
    const fX = x + Math.floor(w / 2) - 15;
    spr(ctx, fX, GY - 65, human('#6a5a3a', '#3a2a1a'));
    ctx.fillStyle = SKIN;
    ctx.fillRect(fX - 4,  GY - 80, 5, 18);  // left arm raised
    ctx.fillRect(fX + 35, GY - 80, 5, 18);  // right arm raised

    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = 'rgba(255,240,160,0.9)';
    ctx.fillText('🍞 Manna & Salwa', x + 5, 56);
    ctx.fillStyle = 'rgba(180,180,180,0.5)';
    ctx.fillText('2:57', x + 8, 68);
    this.hint('👆', x + w / 2 - 6, CH - 8);
  }

  // ---- PANEL 3: TWELVE SPRINGS (2:60) ----
  _drawSprings(x, w) {
    const ctx = this.ctx;

    const skyG = ctx.createLinearGradient(x, 0, x, GY);
    skyG.addColorStop(0, '#12121e');
    skyG.addColorStop(1, '#384020');
    ctx.fillStyle = skyG;
    ctx.fillRect(x, 0, w, GY);
    fillRect(ctx, x, GY, w, CH - GY, '#c4a060');

    // Desert stars
    [[x+22,12],[x+80,7],[x+142,18],[x+198,9]].forEach(([sx,sy]) => {
      fillRect(ctx, sx, sy, 2, 2, `rgba(255,255,200,${0.35 + Math.sin(this.t*0.04+sx)*0.22})`);
    });

    // Rock
    const rX = x + 48, rY = GY - 57;
    fillRect(ctx, rX,      rY,      54, 44, '#787878');
    fillRect(ctx, rX + 6,  rY - 9,  42, 10, '#8a8a8a');
    fillRect(ctx, rX + 16, rY - 16, 22,  9, '#969696');
    // Crack
    fillRect(ctx, rX + 24, rY,      3, 34, '#404040');
    fillRect(ctx, rX + 26, rY + 10, 2, 22, '#333');
    // Crack glow
    const cG = ctx.createRadialGradient(rX + 25, rY + 17, 1, rX + 25, rY + 17, 24);
    cG.addColorStop(0, 'rgba(70,180,255,0.42)');
    cG.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = cG;
    ctx.fillRect(rX + 2, rY - 4, 50, 56);

    // Four animated water streams (representing 12)
    ['#2090cc','#1880b8','#22a0dd','#1890c8'].forEach((col, i) => {
      const sX  = rX + 14 + i * 7;
      const len = 22 + Math.round(Math.sin(this.t * 0.07 + i * 0.8) * 4);
      for (let fy = 0; fy < len; fy += 3) {
        const offs = Math.round(Math.sin(fy * 0.3 + this.t * 0.1 + i) * 2);
        fillRect(ctx, sX + offs, rY + 32 + fy, 3, 3, col);
      }
    });

    // Puddle
    fillRect(ctx, rX + 8,  GY - 10, 46, 8, '#1888c0');
    fillRect(ctx, rX + 6,  GY - 7,  50, 4, 'rgba(100,200,255,0.38)');

    // Drinking figure
    spr(ctx, x + 128, GY - 55, humanBow('#7a6040', '#3a2818'));

    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = 'rgba(80,200,255,0.9)';
    ctx.fillText('💧 12 Springs', x + 5, 56);
    ctx.fillStyle = 'rgba(180,180,180,0.5)';
    ctx.fillText('2:60', x + 8, 68);
    this.hint('👆', x + w / 2 - 6, CH - 8);
  }
}

// ====================================================
//  PUBLIC API
// ====================================================

const scenes = {};

function initScenes() {
  scenes.s1 = new Scene1();
  scenes.s2 = new Scene2();
  scenes.s3 = new Scene3();
  scenes.s4 = new Scene4();
}

function startScene(n) {
  const s = scenes[`s${n}`];
  if (s) s.start();
}

function stopAllScenes() {
  Object.values(scenes).forEach(s => s && s.stop && s.stop());
}
