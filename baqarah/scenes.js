// =============================================
//  BAQARAH QUEST — scenes.js
//  Animated pixel-art canvas scenes
// =============================================

const P  = 5;    // pixels per block unit
const CW = 700;  // canvas internal width
const CH = 200;  // canvas internal height
const GY = 152;  // ground y level

// --- THEME PALETTE ---
function sceneP() {
  const s = document.documentElement.dataset.theme === 'stars';
  return s ? {
    sky0:    '#302c70', sky1:    '#3e3888', sky2:    '#4c45a0',
    gnd:     '#5a50b0', gndAcc:  '#6a60c0',
    starStr: 'rgba(200,185,255,',
    acStr:   'rgba(212,184,96,',
    hint:    'rgba(212,184,96,0.9)',
    label:   '#d4b860',
  } : {
    sky0:    '#1a3660', sky1:    '#122448', sky2:    '#0e1c30',
    gnd:     '#3a8a2a', gndAcc:  '#2a5a1a',
    starStr: 'rgba(255,255,220,',
    acStr:   'rgba(255,215,0,',
    hint:    'rgba(255,215,0,0.85)',
    label:   '#ffd700',
  };
}

// ---- DRAWING UTILITIES ----

function spr(ctx, ox, oy, parts) {
  const elegant = document.documentElement.dataset.theme === 'stars';
  parts.forEach(([dx, dy, w, h, c]) => {
    if (!c) return;
    ctx.fillStyle = c;
    const x = ox + dx * P, y = oy + dy * P, W = w * P, H = h * P;
    if (elegant) {
      const r = Math.min(W * 0.35, H * 0.35, 7);
      ctx.shadowColor = 'rgba(100,80,200,0.25)';
      ctx.shadowBlur  = 4;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, W, H, r); else ctx.rect(x, y, W, H);
      ctx.fill();
      ctx.shadowBlur = 0;
    } else {
      ctx.fillRect(x, y, W, H);
    }
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
  cow_slaughter: {
    ref: 'Al-Baqarah 2:67',
    arabic: 'إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تَذْبَحُوا بَقَرَةً',
    english: '"Indeed, Allah commands you to slaughter a cow."',
    note: 'A simple command. But Bani Isra\'il asked so many questions that the command became harder on themselves. The lesson: when Allah commands, obey first. Asking unnecessary questions is a sign of a heart that resists obedience.',
  },
  man_revived: {
    ref: 'Al-Baqarah 2:73',
    arabic: 'فَقُلْنَا اضْرِبُوهُ بِبَعْضِهَا ۚ كَذَٰلِكَ يُحْيِي اللَّهُ الْمَوْتَىٰ',
    english: '"We said: Strike him [the dead man] with part of it. Thus does Allah bring the dead to life, and He shows you His signs so that you might reason."',
    note: 'A miracle of justice: the dead man came back to life, named his killer, then died again. Allah can reverse death to bring out truth. He who controls life and death needs no courtroom.',
  },
  hard_heart: {
    ref: 'Al-Baqarah 2:74',
    arabic: 'ثُمَّ قَسَتْ قُلُوبُكُم مِّن بَعْدِ ذَٰلِكَ فَهِيَ كَالْحِجَارَةِ أَوْ أَشَدُّ قَسْوَةً',
    english: '"Then your hearts became hardened after that, being like stones or even harder. For indeed, some rocks have rivers gushing from them — some split and water comes out — but from your hearts: nothing."',
    note: 'The Prophet ﷺ said: "When a person commits a sin, a black dot appears on his heart. If he repents, it is erased. If he continues, it spreads until his heart is completely covered." (Ibn Majah). This is the "Ran" — the stain — of the heart. The cure: tawbah today, before tomorrow.',
  },
  ka_ba_building: {
    ref: 'Al-Baqarah 2:127',
    arabic: 'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
    english: '"And when Ibrahim was raising the foundations of the House with Ismail: Our Lord! Accept from us! Indeed You are the All-Hearing, All-Knowing."',
    note: 'Every time you face the Ka\'ba in salah, you face the place these two built with their own hands. And they made du\'a with every stone: "Accept from us, O Allah." What a beautiful way to work — always asking Allah to accept what you do.',
  },
  ibrahim_dua: {
    ref: 'Al-Baqarah 2:129',
    arabic: 'رَبَّنَا وَابْعَثْ فِيهِمْ رَسُولًا مِّنْهُمْ يَتْلُو عَلَيْهِمْ آيَاتِكَ',
    english: '"Our Lord! Raise from among them a messenger who will recite Your verses to them, teach them the Book and wisdom, and purify them."',
    note: 'Ibrahim and Ismail made this du\'a over 2,500 years before the Prophet ﷺ was born. And Allah answered it with our beloved Prophet Muhammad ﷺ. No du\'a made sincerely is ever wasted. SubhanAllah.',
  },
  qibla_verse: {
    ref: 'Al-Baqarah 2:144',
    arabic: 'فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ ۚ وَحَيْثُ مَا كُنتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ',
    english: '"Turn your face toward al-Masjid al-Haram. And wherever you are, turn your faces toward it."',
    note: 'Before this command, Muslims faced Jerusalem (Masjid al-Aqsa). The change of Qibla was a test: who truly follows the Messenger ﷺ, and who follows their own preferences?',
  },
  inna_lillahi: {
    ref: 'Al-Baqarah 2:155–157',
    arabic: 'الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
    english: '"Those who, when disaster strikes them, say: Indeed we belong to Allah, and indeed to Him we will return — upon those are blessings from their Lord and mercy. And it is those who are rightly guided."',
    note: 'The Prophet ﷺ said no Muslim is struck by even a thorn except that Allah uses it to raise their rank or erase a sin — if they are patient. Say "Inna lillahi wa inna ilayhi raji\'un" whenever anything goes wrong, big or small.',
  },
  al_birr: {
    ref: 'Al-Baqarah 2:177',
    arabic: 'لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ',
    english: '"Righteousness is not that you turn your faces East or West. Righteousness is in one who believes in Allah, the Last Day, the angels, the Book, and the Prophets — and gives wealth despite love of it to relatives, orphans, the needy and travellers..."',
    note: 'Al-Birr is the Arabic word for complete goodness — a tree with many branches. Belief is the root. From it grows generosity, worship, integrity and patience. You can\'t claim to be truly righteous if even one branch is missing.',
  },
  ramadan_verse: {
    ref: 'Al-Baqarah 2:183',
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
    english: '"O believers! Fasting has been prescribed for you — as it was prescribed for those before you — so that you may develop taqwa (God-consciousness)."',
    note: 'Every Prophet\'s nation was commanded to fast. It is not unique to Islam — it is the universal training of the soul. The goal is taqwa: being aware of Allah in every moment, even when no one is watching.',
  },
  small_army: {
    ref: 'Al-Baqarah 2:249',
    arabic: 'كَم مِّن فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللَّهِ ۗ وَاللَّهُ مَعَ الصَّابِرِينَ',
    english: '"How many a small company has overcome a large company by permission of Allah. And Allah is with the patient."',
    note: 'This verse was revealed about Talut\'s army — but it applies to every test in life. When you feel overwhelmed and outnumbered, remember: it is not the size of the army. It is whether Allah is with you.',
  },
  dawud_jalut: {
    ref: 'Al-Baqarah 2:251',
    arabic: 'فَهَزَمُوهُم بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ وَآتَاهُ اللَّهُ الْمُلْكَ وَالْحِكْمَةَ',
    english: '"So they defeated them by Allah\'s permission, and Dawud killed Jalut, and Allah gave him the kingship and wisdom and taught him from whatever He willed."',
    note: 'Dawud was not a king or general when he faced Jalut. He was young — perhaps a shepherd. But he had certainty in Allah. That certainty moved a stone further than any sword.',
  },
  ayat_kursi: {
    ref: 'Al-Baqarah 2:255',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    english: '"Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth..."',
    note: 'The Prophet ﷺ said this is the greatest verse in the Quran. Whoever recites it after every salah — nothing stands between them and Paradise except death. Whoever recites it before sleeping — an angel guards them all night.',
  },
  charity_parable: {
    ref: 'Al-Baqarah 2:261',
    arabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ',
    english: '"The example of those who spend in the way of Allah is like a grain that grows seven spikes; in each spike is a hundred grains. And Allah multiplies for whom He wills."',
    note: '1 grain → 7 heads → 700 grains. And then "Allah multiplies for whom He wills" — meaning it can go far beyond 700. Every dirham given sincerely for Allah multiplies in the next life in ways we cannot imagine.',
  },
  charity_cancelled: {
    ref: 'Al-Baqarah 2:264',
    arabic: 'لَا تُبْطِلُوا صَدَقَاتِكُم بِالْمَنِّ وَالْأَذَىٰ',
    english: '"Do not cancel your charities with reminders and hurt (mann and adha)."',
    note: 'The two destroyers of charity: 1) Mann — reminding the person what you gave them. 2) Adha — hurting their feelings or looking down on them. A single word of reminder can erase years of giving.',
  },
  amana_rasul: {
    ref: 'Al-Baqarah 2:285',
    arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ',
    english: '"The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah, His angels, His books, and His messengers — we make no distinction between any of His messengers."',
    note: 'This is the declaration of the whole Ummah. We believe in ALL the Prophets. Not just Muhammad ﷺ — but also Musa, Isa, Ibrahim, Dawud and every Prophet sent before. They all brought the same message: worship Allah alone.',
  },
  la_yukallifu: {
    ref: 'Al-Baqarah 2:286',
    arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    english: '"Allah does not burden a soul beyond its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned."',
    note: 'This is one of the most comforting verses in the Quran. Whatever you are going through — Allah already knows it is within your ability. He designed you for exactly the life He gave you. You are never given more than you can carry with His help.',
  },
  first_call: {
    ref: 'Al-Baqarah 2:21',
    arabic: 'يَا أَيُّهَا النَّاسُ اعْبُدُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ وَالَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
    english: '"O mankind! Worship your Lord, who created you and those before you, so that you may become righteous."',
    note: 'This is the first direct command in Surah Al-Baqarah. After describing the believers, the disbelievers, and the hypocrites, Allah now speaks to ALL of mankind: worship Me alone.',
  },
  quran_challenge: {
    ref: 'Al-Baqarah 2:23-24',
    arabic: 'وَإِن كُنتُمْ فِي رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا بِسُورَةٍ مِّن مِّثْلِهِ وَادْعُوا شُهَدَاءَكُم مِّن دُونِ اللَّهِ إِن كُنتُمْ صَادِقِينَ',
    english: '"If you are in doubt about what We have revealed to Our servant, then produce a surah like it and call your witnesses besides Allah — if you are truthful. But if you cannot — and you never will — then fear the Fire whose fuel is people and stones."',
    note: 'Over 1,400 years and no one has met this challenge. Not the poets of Arabia, not the scholars of every age, not AI. The Quran\'s linguistic miracle stands unchallenged.',
  },
  mosquito_parable: {
    ref: 'Al-Baqarah 2:26',
    arabic: 'إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا',
    english: '"Allah is not shy to use any example — even a mosquito or what is above it. Those who believe know it is the truth from their Lord. But the disbelievers say: What did Allah intend by this example?"',
    note: 'A mosquito is tiny — but it has a heart, brain, kidneys, and wings that beat 600 times per second. If you cannot create even a mosquito, how dare you set up rivals to the Creator?',
  },
  distort_torah: {
    ref: 'Al-Baqarah 2:79',
    arabic: 'فَوَيْلٌ لِّلَّذِينَ يَكْتُبُونَ الْكِتَابَ بِأَيْدِيهِمْ ثُمَّ يَقُولُونَ هَٰذَا مِنْ عِندِ اللَّهِ لِيَشْتَرُوا بِهِ ثَمَنًا قَلِيلًا',
    english: '"Woe to those who write the book with their own hands and then say: This is from Allah — to exchange it for a small price. Woe to them for what their hands have written, and woe to them for what they earn."',
    note: 'Changing Allah\'s words for personal benefit — for status, money, or power. This is among the worst crimes: selling divine truth for worldly gain.',
  },
  fire_days: {
    ref: 'Al-Baqarah 2:80-81',
    arabic: 'وَقَالُوا لَن تَمَسَّنَا النَّارُ إِلَّا أَيَّامًا مَّعْدُودَةً ۚ قُلْ أَتَّخَذْتُمْ عِندَ اللَّهِ عَهْدًا',
    english: '"They say: The Fire will not touch us except for a few numbered days. Say: Have you taken a covenant from Allah? For Allah does not break His covenant. Or do you say about Allah what you do not know?"',
    note: 'False hope is dangerous. Thinking "I will only be punished briefly" leads to carelessness. Allah asks: who gave you that guarantee?',
  },
  harut_marut: {
    ref: 'Al-Baqarah 2:102',
    arabic: 'وَمَا أُنزِلَ عَلَى الْمَلَكَيْنِ بِبَابِلَ هَارُوتَ وَمَارُوتَ ۚ وَمَا يُعَلِّمَانِ مِنْ أَحَدٍ حَتَّىٰ يَقُولَا إِنَّمَا نَحْنُ فِتْنَةٌ فَلَا تَكْفُرْ',
    english: '"...and what was revealed to the two angels at Babylon — Harut and Marut. They did not teach anyone without first warning: We are only a test, so do not disbelieve!"',
    note: 'Even the knowledge of magic came with a clear warning. People chose to use it for harm anyway. Sorcery separates husband and wife — but it cannot harm anyone except by Allah\'s permission.',
  },
  east_west: {
    ref: 'Al-Baqarah 2:115',
    arabic: 'وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ ۚ فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ',
    english: '"To Allah belong the East and the West. Wherever you turn, there is the Face of Allah. Indeed, Allah is All-Encompassing, All-Knowing."',
    note: 'Allah is not confined to a direction, a building, or a place. His presence encompasses everything. This verse is both a comfort and a warning: wherever you are, Allah is aware.',
  },
  kun_fayakun: {
    ref: 'Al-Baqarah 2:117',
    arabic: 'بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ ۖ وَإِذَا قَضَىٰ أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُن فَيَكُونُ',
    english: '"He is the Originator of the heavens and the earth. When He decrees a matter, He only says to it: Be! — and it is."',
    note: 'This refutes the claim that Allah "took a son." He does not need offspring or helpers. He creates by command alone. The entire universe obeyed a single word: Kun.',
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
    const ss  = sceneP().starStr;
    for (let i = 0; i < n; i++) {
      const x  = (i * 137 * 31337) % CW;
      const y  = (i * 97  * 54321) % (GY - 30);
      const br = (Math.sin(this.t * 0.05 + i * 1.3) + 1) / 2;
      ctx.fillStyle = ss + (0.3 + br * 0.7) + ')';
      ctx.fillRect(x, y, i % 3 === 0 ? 2 : 1, i % 3 === 0 ? 2 : 1);
    }
  }

  ground(top, bot) {
    fillRect(this.ctx, 0, GY,     CW, 8,          top);
    fillRect(this.ctx, 0, GY + 8, CW, CH - GY - 8, bot);
  }

  hint(text, x, y) {
    if (Math.floor(this.t / 28) % 2 === 0) {
      this.ctx.fillStyle = sceneP().hint;
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
    super('canvas-1');
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
    const p = sceneP();
    fillRect(ctx, 0, 0, CW, CH, p.sky0);
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
    super('canvas-2');
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
    const pDb = sceneP();
    fillRect(ctx, 0, 0, CW, CH, pDb.sky1);
    fillRect(ctx, 0, GY, CW, CH - GY, pDb.gnd);
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
    const pHy = sceneP();
    fillRect(ctx, 0, 0, CW, CH, pHy.sky1);
    fillRect(ctx, 0, GY, CW, CH - GY, pHy.gnd);
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
    super('canvas-4');
    if (!this.canvas) return;
    this.sub = 'A';         // 'A' = creation/angels,  'B' = forbidden tree/whisper
    this.whisperTimer = 0;
    this.whisperPhase = 0;  // 0=peaceful, 1=whispering, 2=reaching/eating, 3=tawbah
    this._setupToggle();
    this._setZones();
  }

  _setupToggle() {
    const btn = document.getElementById('s4-toggle-btn');
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

    const pAng = sceneP();
    const skyG = ctx.createLinearGradient(0, 0, 0, GY);
    skyG.addColorStop(0,   pAng.sky0);
    skyG.addColorStop(0.5, pAng.sky1);
    skyG.addColorStop(1,   pAng.sky2);
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
    super('canvas-5');
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

// =============================================
//  SCENE 5 — MYSTERY COW
// =============================================
class Scene5 extends BaseScene {
  constructor() {
    super('canvas-6');
    if (!this.canvas) return;
    this.phase = 0; this.phaseTimer = 0;
    this.clickZones = [
      { x: 215, y: 78,  w: 135, h: 100, key: 'cow_slaughter' },
      { x: 375, y: 55,  w: 115, h: 120, key: 'man_revived'   },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    // Sky + ground
    ctx.fillStyle = '#7ec8e3'; fillRect(ctx, 0, 0, CW, CH * 0.55);
    ctx.fillStyle = '#5d8a3c'; fillRect(ctx, 0, CH * 0.55, CW, CH * 0.45);
    // Crowd (left)
    const crowd = ['#c8a870','#a07840','#d4b080','#b08050'];
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = crowd[i % crowd.length];
      const cx = 30 + i * 36, cy = 80;
      fillRect(ctx, cx, cy, 16, 22); // body
      fillRect(ctx, cx + 2, cy - 14, 12, 12); // head
      // "?" bubble
      ctx.fillStyle = '#fff'; ctx.font = `bold 10px sans-serif`; ctx.textAlign = 'center';
      ctx.fillText('?', cx + 8, cy - 18);
    }
    // Golden Cow (centre)
    const bobY = Math.sin(this.t * 0.04) * 2;
    const glow = Math.abs(Math.sin(this.t * 0.05));
    ctx.fillStyle = `rgba(255,215,0,${0.2 + glow * 0.2})`;
    fillRect(ctx, 210, 88 + bobY, 140, 80);
    ctx.fillStyle = '#d4a800'; // body
    fillRect(ctx, 228, 102 + bobY, 88, 50);
    ctx.fillStyle = '#e8bc00'; // lighter top
    fillRect(ctx, 232, 98  + bobY, 80, 20);
    ctx.fillStyle = '#a07800'; // legs
    for (let i = 0; i < 4; i++) fillRect(ctx, 236 + i*20, 148 + bobY, 10, 20);
    ctx.fillStyle = '#c09000'; // head
    fillRect(ctx, 226, 96 + bobY, 22, 24);
    // horns
    ctx.fillStyle = '#804000';
    fillRect(ctx, 224, 88 + bobY, 4, 10);
    fillRect(ctx, 244, 88 + bobY, 4, 10);
    // cow label
    ctx.fillStyle = '#fff'; ctx.font = `bold 9px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('🐄 CLICK ME', 280, 96 + bobY);

    // Dead/rising figure (right)
    const risingY = this.phase >= 1 ? Math.max(60, 110 - (this.t - this.phaseTimer) * 0.5) : 110;
    ctx.fillStyle = this.phase >= 1 ? '#c8d8f0' : '#808080';
    fillRect(ctx, 400, risingY, 18, 26); // body
    fillRect(ctx, 402, risingY - 14, 14, 12); // head
    if (this.phase >= 1) {
      // pointing arm
      ctx.fillStyle = '#c8d8f0';
      fillRect(ctx, 416, risingY + 4, 20, 6);
      ctx.fillStyle = '#fff'; ctx.font = `bold 8px sans-serif`;
      ctx.fillText('ALIVE! 👆', 440, risingY - 2);
    }
    // grave mound
    ctx.fillStyle = '#8b6040';
    fillRect(ctx, 390, 152, 40, 14);
    ctx.fillStyle = '#fff'; ctx.font = `8px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('CLICK', 410, 178);

    // Phase cycling
    if (this.t % 180 === 0) {
      this.phase = (this.phase + 1) % 2;
      this.phaseTimer = this.t;
    }

    // Labels
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; fillRect(ctx, 0, 0, 160, 20);
    ctx.fillStyle = '#fff'; ctx.font = `bold 9px sans-serif`; ctx.textAlign = 'left';
    ctx.fillText('⬅ QUESTIONING CROWD', 6, 13);
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; fillRect(ctx, 365, 0, 195, 20);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'right';
    ctx.fillText('MIRACLE OF RESURRECTION ➡', CW - 6, 13);
  }
}

// =============================================
//  SCENE 6 — HARD HEART
// =============================================
class Scene6 extends BaseScene {
  constructor() {
    super('canvas-7');
    if (!this.canvas) return;
    this.spots = 0; this.spotTimer = 0;
    this.clickZones = [
      { x: 0,      y: 0, w: CW / 2, h: CH, key: 'hard_heart' },
      { x: CW / 2, y: 0, w: CW / 2, h: CH, key: 'hard_heart' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    // Split bg
    ctx.fillStyle = '#2a1a2a'; fillRect(ctx, 0, 0, CW / 2, CH);
    ctx.fillStyle = '#1a2a3a'; fillRect(ctx, CW / 2, 0, CW / 2, CH);

    // --- LEFT: HEART ---
    const hx = 110, hy = 75, hw = 90, hh = 80;
    const spotsNow = Math.min(5, Math.floor(this.t / 60));
    const darkness  = Math.min(0.85, spotsNow * 0.17);
    const heartCol  = `rgb(${Math.round(180 - darkness*160)},${Math.round(30 - darkness*20)},${Math.round(40 - darkness*30)})`;
    ctx.fillStyle = heartCol;
    // heart shape (two bumps + triangle)
    ctx.beginPath();
    ctx.moveTo(hx + hw/2, hy + hh * 0.3);
    ctx.bezierCurveTo(hx + hw/2, hy, hx, hy, hx, hy + hh * 0.3);
    ctx.bezierCurveTo(hx, hy + hh * 0.6, hx + hw/2, hy + hh * 0.85, hx + hw/2, hy + hh);
    ctx.bezierCurveTo(hx + hw/2, hy + hh * 0.85, hx + hw, hy + hh * 0.6, hx + hw, hy + hh * 0.3);
    ctx.bezierCurveTo(hx + hw, hy, hx + hw/2, hy, hx + hw/2, hy + hh * 0.3);
    ctx.fill();
    // black spots
    ctx.fillStyle = '#0a0a0a';
    const spotPos = [{x:0.35,y:0.4},{x:0.6,y:0.35},{x:0.45,y:0.65},{x:0.25,y:0.6},{x:0.65,y:0.62}];
    for (let i = 0; i < spotsNow; i++) {
      const sp = spotPos[i];
      const r2 = 6 + i * 2;
      ctx.beginPath(); ctx.arc(hx + sp.x*hw, hy + sp.y*hh, r2, 0, Math.PI*2); ctx.fill();
    }
    // glow if fresh spots
    if (spotsNow < 5) {
      const pulse = Math.abs(Math.sin(this.t * 0.08));
      ctx.fillStyle = `rgba(255,80,80,${pulse*0.3})`;
      ctx.beginPath(); ctx.arc(hx + hw/2, hy + hh/2, 52, 0, Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = '#fff'; ctx.font = `bold 9px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('HEART (click)', 155, 175);
    ctx.fillStyle = '#e85858'; ctx.font = `8px sans-serif`;
    ctx.fillText(spotsNow >= 5 ? '⚫ SEALED' : `${spotsNow} black spots`, 155, 188);

    // --- RIGHT: ROCK with streams ---
    const rx = 300, ry = 60;
    // rock body
    ctx.fillStyle = '#6a7a8a';
    ctx.beginPath(); ctx.moveTo(rx, ry+60); ctx.lineTo(rx+20, ry); ctx.lineTo(rx+100, ry+10); ctx.lineTo(rx+130, ry+50); ctx.lineTo(rx+120, ry+100); ctx.lineTo(rx+10, ry+100); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#8a9aaa';
    ctx.beginPath(); ctx.moveTo(rx+20, ry); ctx.lineTo(rx+60, ry-10); ctx.lineTo(rx+100, ry+10); ctx.lineTo(rx+20, ry); ctx.closePath(); ctx.fill();
    // streams
    const streamPts = [0.2, 0.4, 0.65, 0.85];
    ctx.strokeStyle = `rgba(80,160,255,0.85)`; ctx.lineWidth = 3;
    streamPts.forEach((p, i) => {
      const sx = rx + p * 130;
      const wave = Math.sin(this.t * 0.07 + i) * 4;
      ctx.beginPath(); ctx.moveTo(sx, ry + 100);
      for (let dy = 0; dy < 60; dy += 4) {
        ctx.lineTo(sx + Math.sin(this.t * 0.05 + dy * 0.3 + i) * 3 + wave, ry + 100 + dy);
      }
      ctx.stroke();
    });
    ctx.fillStyle = '#5ab8ff'; ctx.font = `bold 9px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('STONE has rivers', 365, 178);
    ctx.fillText('Hearts had nothing', 365, 191);

    // divider
    ctx.strokeStyle = '#ffffff33'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(CW/2, 0); ctx.lineTo(CW/2, CH); ctx.stroke();

    // labels
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; fillRect(ctx, 5, 5, 145, 18);
    ctx.fillStyle = '#ff8888'; ctx.font = `bold 8px sans-serif`; ctx.textAlign = 'left';
    ctx.fillText('💔 THE HARDENED HEART', 10, 17);
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; fillRect(ctx, CW/2+5, 5, 175, 18);
    ctx.fillStyle = '#88ddff'; ctx.textAlign = 'left';
    ctx.fillText('💧 THE GENEROUS STONE (2:74)', CW/2+10, 17);
  }
}

// =============================================
//  SCENE 7 — IBRAHIM BUILDS THE KA'BA
// =============================================
class Scene7 extends BaseScene {
  constructor() {
    super('canvas-9');
    if (!this.canvas) return;
    this.blocksBuilt = 0;
    this.clickZones = [
      { x: 190, y: 30, w: 185, h: 135, key: 'ka_ba_building' },
      { x: 0,   y: 0,  w: 190, h: CH,  key: 'ibrahim_dua'    },
      { x: 375, y: 0,  w: 185, h: CH,  key: 'ibrahim_dua'    },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    // Night sky
    const p7 = sceneP();
    ctx.fillStyle = p7.sky0; fillRect(ctx, 0, 0, CW, CH * 0.7);
    ctx.fillStyle = '#5d8a3c'; fillRect(ctx, 0, CH * 0.7, CW, CH * 0.3);
    // Stars
    ctx.fillStyle = p7.starStr + '0.9)';
    [[50,20],[100,35],[160,15],[220,40],[350,22],[420,30],[490,18],[520,40],[80,60],[450,55]].forEach(([sx,sy]) => {
      const pulse = 0.5 + 0.5 * Math.sin(this.t * 0.03 + sx);
      ctx.globalAlpha = pulse;
      fillRect(ctx, sx, sy, 2, 2);
    });
    ctx.globalAlpha = 1;
    // Crescent moon
    const moonX = 480, moonY = 35;
    ctx.fillStyle = '#ffe87a';
    ctx.beginPath(); ctx.arc(moonX, moonY, 18, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#0d1b2a';
    ctx.beginPath(); ctx.arc(moonX+10, moonY-4, 15, 0, Math.PI*2); ctx.fill();

    // Ka'ba being built (growing blocks)
    const maxBlocks   = 6;
    const blocksNow   = Math.min(maxBlocks, Math.floor(this.t / 50) + 1);
    const kabaX = 195, kabaBaseY = 152, blockW = 170, blockH = 18;
    // glow beneath
    const glow = 0.3 + 0.2 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,200,80,${glow})`;
    fillRect(ctx, kabaX - 10, kabaBaseY - blocksNow * blockH - 10, blockW + 20, blocksNow * blockH + 20);
    // blocks
    for (let b = 0; b < blocksNow; b++) {
      const by    = kabaBaseY - (b + 1) * blockH;
      const shade = b % 2 === 0 ? '#2c2c2c' : '#1a1a1a';
      ctx.fillStyle = shade;
      fillRect(ctx, kabaX, by, blockW, blockH - 2);
      ctx.fillStyle = '#444';
      fillRect(ctx, kabaX, by, blockW, 3);
    }
    // door
    ctx.fillStyle = '#8b6914';
    fillRect(ctx, kabaX + blockW/2 - 12, kabaBaseY - blockH * 2, 24, blockH * 2);
    // CLICK label
    ctx.fillStyle = '#ffe87a'; ctx.font = `bold 9px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('🕋 CLICK', 280, kabaBaseY - blocksNow * blockH - 16);

    // Ibrahim figure (left, passing stone)
    const ibX = 100, ibY = 118;
    ctx.fillStyle = '#c8a870';
    fillRect(ctx, ibX, ibY, 18, 26); fillRect(ctx, ibX+2, ibY-16, 14, 13);
    ctx.fillStyle = '#d4a060'; fillRect(ctx, ibX+16, ibY+4, 20, 8);  // arm holding stone
    // stone
    ctx.fillStyle = '#888'; fillRect(ctx, ibX+34, ibY+2, 10, 10);

    // Ismail figure (right, placing stone at top)
    const isX = 390, isY = kabaBaseY - blocksNow * blockH - 26;
    ctx.fillStyle = '#a07840';
    fillRect(ctx, isX, isY, 18, 26); fillRect(ctx, isX+2, isY-16, 14, 13);
    // raised arms
    ctx.fillStyle = '#a07840';
    fillRect(ctx, isX-12, isY+2, 14, 8);

    // du'a text
    const alpha = 0.5 + 0.5 * Math.sin(this.t * 0.03);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffe87a'; ctx.font = `bold 8px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('رَبَّنَا تَقَبَّلْ مِنَّا', 280, 20);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#aaa'; ctx.font = `8px sans-serif`;
    ctx.fillText('"Our Lord, accept from us"', 280, 35);
  }
}

// =============================================
//  SCENE 8 — THE NEW DIRECTION (QIBLA CHANGE)
// =============================================
class Scene8 extends BaseScene {
  constructor() {
    super('canvas-11');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,      y: 0, w: CW / 2, h: CH, key: 'qibla_verse'  },
      { x: CW / 2, y: 0, w: CW / 2, h: CH, key: 'inna_lillahi' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    // Sky
    const p8 = sceneP();
    const skyGrad = ctx.createLinearGradient(0,0,0,CH);
    skyGrad.addColorStop(0, p8.sky0); skyGrad.addColorStop(1, p8.sky1);
    ctx.fillStyle = skyGrad; fillRect(ctx, 0, 0, CW, CH);
    ctx.fillStyle = '#5d8a3c'; fillRect(ctx, 0, CH*0.68, CW, CH*0.32);

    // Jerusalem dome (left)
    ctx.fillStyle = '#8b6914'; fillRect(ctx, 40, 100, 80, 60);
    ctx.fillStyle = '#c8a030';
    ctx.beginPath(); ctx.arc(80, 100, 28, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#ffe87a'; ctx.font = `8px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('Jerusalem ✡', 80, 180);

    // Ka'ba (right)
    ctx.fillStyle = '#1a1a1a'; fillRect(ctx, 420, 90, 80, 70);
    ctx.fillStyle = '#333'; fillRect(ctx, 420, 90, 80, 10);
    ctx.fillStyle = '#8b6914'; fillRect(ctx, 450, 130, 22, 30);
    ctx.fillStyle = '#ffe87a'; ctx.font = `8px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('Mecca 🕋', 460, 180);

    // Arrow showing direction
    const arrowProgress = (Math.sin(this.t * 0.025) + 1) / 2; // 0→1→0
    const arrowX = 120 + arrowProgress * 280;
    ctx.strokeStyle = '#ffe87a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(120, 95); ctx.lineTo(arrowX, 95); ctx.stroke();
    ctx.fillStyle = '#ffe87a';
    ctx.beginPath(); ctx.moveTo(arrowX+14, 95); ctx.lineTo(arrowX, 88); ctx.lineTo(arrowX, 102); ctx.closePath(); ctx.fill();

    // Figure in salah (centre)
    const figX = 255, figY = 98;
    ctx.fillStyle = '#c8a870';
    fillRect(ctx, figX, figY, 20, 28); fillRect(ctx, figX+3, figY-16, 14, 13);
    // sijdah arms forward
    ctx.fillStyle = '#c8a870';
    fillRect(ctx, figX-6, figY+8, 8, 8);
    fillRect(ctx, figX+18, figY+8, 8, 8);

    // "Inna lillahi" text — right side label
    const il_alpha = 0.6 + 0.4 * Math.sin(this.t * 0.04);
    ctx.globalAlpha = il_alpha;
    ctx.fillStyle = '#88ddff'; ctx.font = `bold 8px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ', CW/2, 210);
    ctx.globalAlpha = 1;

    // Labels
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 0, 0, 150, 18);
    ctx.fillStyle = '#ffcc88'; ctx.font = `bold 8px sans-serif`; ctx.textAlign = 'left';
    ctx.fillText('← ORIGINAL QIBLA', 6, 13);
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, CW-160, 0, 160, 18);
    ctx.fillStyle = '#ffe87a'; ctx.textAlign = 'right';
    ctx.fillText('NEW QIBLA: MECCA →', CW-6, 13);
  }
}

// =============================================
//  SCENE 9 — AL-BIRR (5 TRAITS ORBITING)
// =============================================
class Scene9 extends BaseScene {
  constructor() {
    super('canvas-13');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,      y: 0, w: CW / 2, h: CH, key: 'al_birr'       },
      { x: CW / 2, y: 0, w: CW / 2, h: CH, key: 'ramadan_verse'  },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    const p9 = sceneP();
    ctx.fillStyle = p9.sky0; fillRect(ctx, 0, 0, CW, CH);

    // Left half: Al-Birr traits
    const traitData = [
      { label: '💚 BELIEF',     angle: 0 },
      { label: '💰 GENEROSITY', angle: Math.PI * 0.4 },
      { label: '🙏 WORSHIP',    angle: Math.PI * 0.8 },
      { label: '🤝 INTEGRITY',  angle: Math.PI * 1.2 },
      { label: '💪 PATIENCE',   angle: Math.PI * 1.6 },
    ];
    const cx0 = 135, cy0 = 108, orbitR = 75;
    // centre glow
    const pulse = 0.4 + 0.3 * Math.sin(this.t * 0.05);
    ctx.fillStyle = `rgba(100,200,100,${pulse})`;
    ctx.beginPath(); ctx.arc(cx0, cy0, 30, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5dcc5d';
    ctx.beginPath(); ctx.arc(cx0, cy0, 22, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = `bold 7px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('AL-BIRR', cx0, cy0 + 3);

    traitData.forEach((tr) => {
      const angle = tr.angle + this.t * 0.008;
      const tx = cx0 + Math.cos(angle) * orbitR;
      const ty = cy0 + Math.sin(angle) * orbitR;
      // orbit dot
      ctx.strokeStyle = 'rgba(100,200,100,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx0, cy0, orbitR, 0, Math.PI*2); ctx.stroke();
      // trait bubble
      ctx.fillStyle = 'rgba(0,80,0,0.85)';
      fillRect(ctx, tx-32, ty-10, 64, 20);
      ctx.fillStyle = '#aaffaa'; ctx.font = `bold 7px sans-serif`; ctx.textAlign = 'center';
      ctx.fillText(tr.label, tx, ty+4);
    });

    // Right half: Ramadan / crescent moon
    const rx = 390;
    // moon
    ctx.fillStyle = '#ffe87a';
    ctx.beginPath(); ctx.arc(rx, 80, 40, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#0e1c2e';
    ctx.beginPath(); ctx.arc(rx+18, 72, 32, 0, Math.PI*2); ctx.fill();
    // stars
    ctx.fillStyle = '#fff';
    [[rx+58,50],[rx+68,80],[rx+50,30]].forEach(([sx,sy]) => {
      const p = 0.5 + 0.5 * Math.sin(this.t * 0.04 + sx);
      ctx.globalAlpha = p; fillRect(ctx, sx, sy, 2, 2);
    });
    ctx.globalAlpha = 1;
    // fasting figure
    ctx.fillStyle = '#c8a870';
    fillRect(ctx, rx+20, 115, 18, 26); fillRect(ctx, rx+22, 100, 14, 13);
    // no food icon
    ctx.fillStyle = '#ff4444'; ctx.font = `14px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('🚫🍽️', rx+28, 160);
    // iftar glow
    const sunsetGlow = (Math.sin(this.t * 0.02) + 1) / 2;
    ctx.fillStyle = `rgba(255,150,50,${sunsetGlow * 0.2})`;
    fillRect(ctx, CW/2, 0, CW/2, CH);

    // divider
    ctx.strokeStyle = '#ffffff22'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(CW/2, 0); ctx.lineTo(CW/2, CH); ctx.stroke();

    // labels
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, 2, 130, 18);
    ctx.fillStyle = '#aaffaa'; ctx.font = `bold 8px sans-serif`; ctx.textAlign = 'left';
    ctx.fillText('📋 AL-BIRR (click)', 6, 14);
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, CW/2+2, 2, 165, 18);
    ctx.fillStyle = '#ffe87a'; ctx.font = `bold 8px sans-serif`;
    ctx.fillText('🌙 RAMADAN FASTING (click)', CW/2+6, 14);
  }
}

// =============================================
//  SCENE 10 — BATTLE: TALUT, JALUT & DAWUD
// =============================================
class Scene10 extends BaseScene {
  constructor() {
    super('canvas-16');
    if (!this.canvas) return;
    this.phase = 0;
    this.clickZones = [
      { x: 0,          y: 0, w: CW * 0.55,  h: CH, key: 'small_army'  },
      { x: CW * 0.55,  y: 0, w: CW * 0.45,  h: CH, key: 'dawud_jalut' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    const p10 = sceneP();
    const phase = Math.floor(this.t / 200) % 3;
    // Sky + ground
    const skyCol = phase === 2 ? '#2a0a0a' : p10.sky0;
    ctx.fillStyle = skyCol; fillRect(ctx, 0, 0, CW, CH * 0.65);
    ctx.fillStyle = '#4a6a30'; fillRect(ctx, 0, CH * 0.65, CW, CH * 0.35);
    // Dust particles
    if (phase > 0) {
      ctx.fillStyle = 'rgba(180,140,80,0.3)';
      for (let i = 0; i < 8; i++) {
        const dx = (this.t * 0.5 + i * 70) % CW;
        const dy = 100 + i * 8;
        fillRect(ctx, dx, dy, 8, 4);
      }
    }

    if (phase === 0) {
      // Phase 0: Two armies facing each other
      // Small faithful army (left) — 4 figures
      ctx.fillStyle = '#4a8a4a';
      for (let i = 0; i < 4; i++) {
        const fx = 40 + i * 30, fy = 100;
        fillRect(ctx, fx, fy, 14, 22); fillRect(ctx, fx+2, fy-13, 10, 11);
        fillRect(ctx, fx+12, fy+4, 16, 4); // spear
      }
      ctx.fillStyle = '#fff'; ctx.font = `7px sans-serif`; ctx.textAlign = 'center';
      ctx.fillText('Talut\'s faithful army', 90, 148);
      ctx.fillText('(small but true)', 90, 158);
      // Large enemy army (right) — 10 figures
      ctx.fillStyle = '#8a2a2a';
      for (let i = 0; i < 10; i++) {
        const fx = 310 + (i % 5) * 40, fy = 90 + Math.floor(i/5) * 32;
        fillRect(ctx, fx, fy, 16, 24); fillRect(ctx, fx+2, fy-14, 12, 12);
      }
      ctx.fillStyle = '#ff9999'; ctx.font = `7px sans-serif`;
      ctx.fillText("Jalut's massive army", 400, 162);
      // vs
      ctx.fillStyle = '#ffe87a'; ctx.font = `bold 20px sans-serif`;
      ctx.fillText('VS', CW/2, 120);
    } else if (phase === 1) {
      // Phase 1: Dawud faces Jalut
      // Dawud (young, small)
      ctx.fillStyle = '#c8d060';
      fillRect(ctx, 140, 100, 16, 24); fillRect(ctx, 142, 86, 12, 12);
      // sling in hand
      ctx.strokeStyle = '#c8a870'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(156, 104); ctx.bezierCurveTo(180, 85, 195, 90, 200, 110); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = `7px sans-serif`; ctx.textAlign = 'center';
      ctx.fillText('Dawud (young)', 148, 148);
      // Jalut (giant)
      ctx.fillStyle = '#6a1a1a';
      fillRect(ctx, 370, 60, 36, 56); fillRect(ctx, 372, 40, 32, 26);
      // shield
      ctx.fillStyle = '#3a0a0a'; fillRect(ctx, 342, 70, 22, 36);
      ctx.fillStyle = '#ff6666'; ctx.font = `7px sans-serif`;
      ctx.fillText('JALUT (giant)', 388, 148);
      // stone flying
      const stoneX = 156 + (this.t % 200) * 1.1;
      ctx.fillStyle = '#aaa';
      ctx.beginPath(); ctx.arc(Math.min(stoneX, 372), 90 + Math.sin((this.t % 200) * 0.03) * 20, 5, 0, Math.PI*2); ctx.fill();
    } else {
      // Phase 2: Victory
      ctx.fillStyle = '#ffe87a'; ctx.font = `bold 16px sans-serif`; ctx.textAlign = 'center';
      const shimmer = 0.7 + 0.3 * Math.sin(this.t * 0.08);
      ctx.globalAlpha = shimmer;
      ctx.fillText('بِإِذْنِ اللَّهِ', CW/2, 60);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#88ff88'; ctx.font = `bold 12px sans-serif`;
      ctx.fillText('VICTORY — BY ALLAH\'S PERMISSION', CW/2, 85);
      // Jalut fallen
      ctx.fillStyle = '#6a1a1a';
      fillRect(ctx, 330, 120, 56, 22); // lying down
      fillRect(ctx, 376, 110, 26, 22);
      // Dawud standing victorious
      ctx.fillStyle = '#c8d060';
      fillRect(ctx, 200, 98, 16, 24); fillRect(ctx, 202, 84, 12, 12);
      // raised arm
      fillRect(ctx, 214, 98, 20, 8);
      ctx.fillStyle = '#ffe87a'; ctx.font = `7px sans-serif`;
      ctx.fillText('Dawud — king + wisdom given', CW/2, 170);
    }

    // Labels
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, 2, 155, 18);
    ctx.fillStyle = '#88ff88'; ctx.font = `bold 8px sans-serif`; ctx.textAlign = 'left';
    const phaseLabels = ['⬅ CLICK: Small beats large', '⬅ CLICK: Dawud faces Jalut', '⬅ CLICK: Victory with Allah'];
    ctx.fillText(phaseLabels[phase], 6, 14);
  }
}

// =============================================
//  SCENE 11 — AYAT AL-KURSI (COSMIC THRONE)
// =============================================
class Scene11 extends BaseScene {
  constructor() {
    super('canvas-19');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0, y: 0, w: CW, h: CH, key: 'ayat_kursi' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    // Deep space background
    const p11 = sceneP();
    ctx.fillStyle = p11.sky0; fillRect(ctx, 0, 0, CW, CH);
    // Stars (many)
    const starSeeds = [11,22,37,55,70,93,110,140,170,200,230,260,300,330,360,400,430,460,500,530];
    starSeeds.forEach((s, i) => {
      const sx = (s * 37 + i * 53) % CW;
      const sy = (s * 19 + i * 31) % (CH * 0.75);
      const brightness = 0.4 + 0.6 * Math.sin(this.t * 0.02 + i * 1.3);
      ctx.fillStyle = p11.starStr + brightness + ')';
      fillRect(ctx, sx, sy, i % 3 === 0 ? 2 : 1, i % 3 === 0 ? 2 : 1);
    });

    // Earth (bottom)
    ctx.fillStyle = '#1a5a2a';
    ctx.beginPath(); ctx.arc(CW/2, CH+20, 80, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#2a7ae0';
    ctx.beginPath(); ctx.arc(CW/2 - 20, CH+15, 30, Math.PI, 0); ctx.fill();

    // Heavens layers (rings)
    for (let layer = 6; layer > 0; layer--) {
      const alpha = 0.06 + (7 - layer) * 0.03;
      const radius = 50 + layer * 25;
      ctx.strokeStyle = `rgba(100,180,255,${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(CW/2, CH*0.55, radius, radius * 0.25, 0, 0, Math.PI*2); ctx.stroke();
    }

    // Throne (top centre) — majestic golden structure
    const throneGlow = 0.6 + 0.4 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,210,50,${throneGlow * 0.3})`;
    ctx.beginPath(); ctx.ellipse(CW/2, 55, 110, 30, 0, 0, Math.PI*2); ctx.fill();
    // Throne base
    ctx.fillStyle = '#b8860b'; fillRect(ctx, CW/2-80, 28, 160, 40);
    ctx.fillStyle = '#d4a800'; fillRect(ctx, CW/2-80, 28, 160, 10);
    ctx.fillStyle = '#ffd700'; fillRect(ctx, CW/2-70, 20, 140, 14);
    // pillars
    ctx.fillStyle = '#b8860b';
    fillRect(ctx, CW/2-65, 38, 10, 30); fillRect(ctx, CW/2+55, 38, 10, 30);
    // top decoration
    ctx.fillStyle = '#ffe87a';
    fillRect(ctx, CW/2-72, 16, 144, 8);
    // CLICK label on throne
    ctx.fillStyle = '#fff'; ctx.font = `bold 9px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('👑 CLICK — READ AYAT AL-KURSI', CW/2, 12);

    // Light rays from throne
    ctx.globalAlpha = 0.12 + 0.05 * Math.sin(this.t * 0.03);
    ctx.fillStyle = '#ffe87a';
    for (let r = 0; r < 8; r++) {
      const angle = (r / 8) * Math.PI + Math.PI; // downward fan
      const endX  = CW/2 + Math.cos(angle) * 240;
      const endY  = 55    + Math.sin(angle) * 200;
      ctx.beginPath(); ctx.moveTo(CW/2-10, 55); ctx.lineTo(endX-10, endY);
      ctx.moveTo(CW/2+10, 55); ctx.lineTo(endX+10, endY); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Angels flanking (pixel art)
    const aColors = ['#c0c8ff','#d0d8ff'];
    [[80, 90], [CW-96, 90]].forEach(([ax, ay], side) => {
      // wings
      ctx.fillStyle = 'rgba(220,230,255,0.7)';
      if (side === 0) {
        ctx.beginPath(); ctx.moveTo(ax+8, ay+8); ctx.bezierCurveTo(ax-30, ay-20, ax-20, ay+40, ax, ay+24); ctx.fill();
      } else {
        ctx.beginPath(); ctx.moveTo(ax+8, ay+8); ctx.bezierCurveTo(ax+46, ay-20, ax+36, ay+40, ax+16, ay+24); ctx.fill();
      }
      ctx.fillStyle = aColors[0];
      fillRect(ctx, ax, ay, 16, 26); fillRect(ctx, ax+2, ay-14, 12, 12);
      // bowing head
      fillRect(ctx, ax+2, ay+2, 12, 6);
    });

    // Scroll text: Arabic phrase
    const scrollAlpha = 0.5 + 0.5 * Math.sin(this.t * 0.025);
    ctx.globalAlpha = scrollAlpha;
    ctx.fillStyle = '#ffe87a'; ctx.font = `bold 11px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ', CW/2, CH - 10);
    ctx.globalAlpha = 1;
  }
}

// =============================================
//  SCENE 12 — CHARITY GARDEN (GROWING PLANT)
// =============================================
class Scene12 extends BaseScene {
  constructor() {
    super('canvas-20');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,          y: 0, w: CW * 0.62, h: CH, key: 'charity_parable'   },
      { x: CW * 0.62,  y: 0, w: CW * 0.38, h: CH, key: 'charity_cancelled' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    // Background: day sky left, grey right
    ctx.fillStyle = '#7ec8e3'; fillRect(ctx, 0, 0, CW * 0.62, CH);
    ctx.fillStyle = '#5a6a7a'; fillRect(ctx, CW * 0.62, 0, CW * 0.38, CH);
    ctx.fillStyle = '#5d8a3c'; fillRect(ctx, 0, CH * 0.72, CW * 0.62, CH * 0.28);
    ctx.fillStyle = '#4a5a6a'; fillRect(ctx, CW * 0.62, CH * 0.72, CW * 0.38, CH * 0.28);

    // LEFT SIDE: Growing plant (1 grain → 7 spikes → 700)
    const growProgress = Math.min(1, (this.t % 300) / 180);
    const plantX = 160, plantBaseY = 152;
    const stalkH  = Math.round(growProgress * 90);
    // stem
    ctx.fillStyle = '#4a8a4a';
    fillRect(ctx, plantX - 3, plantBaseY - stalkH, 6, stalkH);
    // leaves
    if (growProgress > 0.3) {
      ctx.fillStyle = '#5dcc5d';
      fillRect(ctx, plantX - 20, plantBaseY - stalkH * 0.5, 18, 8);
      fillRect(ctx, plantX + 3,  plantBaseY - stalkH * 0.65, 18, 8);
    }
    // 7 heads
    if (growProgress > 0.65) {
      const headCount = Math.min(7, Math.round((growProgress - 0.65) / 0.05));
      for (let h = 0; h < headCount; h++) {
        const angle  = (h / 7) * Math.PI * 2 - Math.PI/2;
        const headX  = plantX + Math.cos(angle) * 30;
        const headY  = plantBaseY - stalkH - 8 + Math.sin(angle) * 12;
        ctx.fillStyle = '#d4a800';
        ctx.beginPath(); ctx.ellipse(headX, headY, 8, 20, angle, 0, Math.PI*2); ctx.fill();
      }
    }
    // grain counter
    ctx.fillStyle = '#fff'; ctx.font = `bold 9px sans-serif`; ctx.textAlign = 'center';
    if (growProgress < 0.3)       ctx.fillText('1 grain planted...', plantX, 178);
    else if (growProgress < 0.65) ctx.fillText('Stalk growing...', plantX, 178);
    else                          ctx.fillText(`→ 7 spikes × 100 = 700 🌾`, plantX, 178);

    // RIGHT SIDE: Rock parable (charity cancelled)
    const rockX = 390, rockY = 80;
    // rock
    ctx.fillStyle = '#7a8a9a';
    ctx.beginPath(); ctx.moveTo(rockX, rockY+50); ctx.lineTo(rockX+20, rockY); ctx.lineTo(rockX+90, rockY+10); ctx.lineTo(rockX+120, rockY+45); ctx.lineTo(rockX+110, rockY+80); ctx.lineTo(rockX+10, rockY+80); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#9aaabb'; ctx.beginPath(); ctx.moveTo(rockX+20, rockY); ctx.lineTo(rockX+55, rockY-10); ctx.lineTo(rockX+90, rockY+10); ctx.lineTo(rockX+20, rockY); ctx.closePath(); ctx.fill();
    // soil layer that washes away
    const soilAlpha = Math.max(0, 0.7 - (this.t % 240) / 200);
    if (soilAlpha > 0) {
      ctx.fillStyle = `rgba(100,70,30,${soilAlpha})`;
      fillRect(ctx, rockX+10, rockY+30, 100, 20);
    }
    // rain
    ctx.strokeStyle = 'rgba(100,160,255,0.6)'; ctx.lineWidth = 1.5;
    for (let dr = 0; dr < 6; dr++) {
      const rx2 = rockX + 10 + dr * 18;
      const ry2 = ((this.t * 2 + dr * 30) % 80) + rockY - 20;
      ctx.beginPath(); ctx.moveTo(rx2, ry2); ctx.lineTo(rx2-2, ry2+8); ctx.stroke();
    }
    ctx.fillStyle = '#ff9999'; ctx.font = `7px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('Charity + reminder/hurt =', rockX+60, 178);
    ctx.fillText('bare rock — nothing remains', rockX+60, 188);

    // divider
    ctx.strokeStyle = '#ffffff33'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(CW*0.62, 0); ctx.lineTo(CW*0.62, CH); ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; fillRect(ctx, 2, 2, 200, 18);
    ctx.fillStyle = '#ffe87a'; ctx.font = `bold 8px sans-serif`; ctx.textAlign = 'left';
    ctx.fillText('🌱 SINCERE CHARITY → 700x (click)', 6, 14);
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; fillRect(ctx, CW*0.62+2, 2, 185, 18);
    ctx.fillStyle = '#ffaaaa'; ctx.font = `bold 8px sans-serif`;
    ctx.fillText('🪨 CANCELLED CHARITY (click)', CW*0.62+6, 14);
  }
}

// =============================================
//  SCENE 13 — THE FINAL TREASURE (NIGHT DU'A)
// =============================================
class Scene13 extends BaseScene {
  constructor() {
    super('canvas-22');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0, y: 0,          w: CW, h: CH * 0.6, key: 'amana_rasul'  },
      { x: 0, y: CH * 0.6,   w: CW, h: CH * 0.4, key: 'la_yukallifu' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    // Deep blue night
    const p13 = sceneP();
    const nightGrad = ctx.createLinearGradient(0,0,0,CH);
    nightGrad.addColorStop(0, p13.sky0); nightGrad.addColorStop(1, p13.sky1);
    ctx.fillStyle = nightGrad; fillRect(ctx, 0, 0, CW, CH);
    // Ground
    ctx.fillStyle = '#1a2a14'; fillRect(ctx, 0, CH*0.75, CW, CH*0.25);

    // Stars — slowly lighting up one by one
    const allStars = [
      [60,25],[120,18],[200,30],[280,12],[360,28],[440,20],[500,35],[540,15],
      [90,55],[170,48],[250,62],[330,44],[410,58],[490,45],[530,62],
      [40,80],[150,75],[300,82],[450,78],[510,72],
    ];
    const litStars = Math.min(allStars.length, Math.floor(this.t / 18));
    allStars.forEach(([sx, sy], i) => {
      if (i >= litStars) return;
      const twinkle = 0.5 + 0.5 * Math.sin(this.t * 0.04 + i * 1.7);
      ctx.fillStyle = p13.starStr + twinkle + ')';
      fillRect(ctx, sx, sy, i % 4 === 0 ? 3 : 2, i % 4 === 0 ? 3 : 2);
    });

    // Moon
    ctx.fillStyle = '#ffe87a';
    ctx.beginPath(); ctx.arc(480, 50, 30, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = p13.sky0;
    ctx.beginPath(); ctx.arc(494, 44, 24, 0, Math.PI*2); ctx.fill();

    // Glowing du'a words appearing in sequence
    const duaWords = ['آمَنَ', 'الرَّسُولُ', 'لَا يُكَلِّفُ', 'اللَّهُ', 'نَفْسًا', 'إِلَّا وُسْعَهَا'];
    const visibleWords = Math.min(duaWords.length, Math.floor(this.t / 60));
    const wordPositions = [[80,38],[180,22],[280,42],[380,28],[450,42],[520,30]];
    for (let w = 0; w < visibleWords; w++) {
      const alpha = Math.min(1, (this.t - w*60) / 40);
      const glow  = 0.5 + 0.5 * Math.sin(this.t * 0.03 + w);
      ctx.globalAlpha = alpha * glow;
      ctx.fillStyle = '#ffe87a'; ctx.font = `bold 9px sans-serif`; ctx.textAlign = 'center';
      ctx.fillText(duaWords[w], wordPositions[w][0], wordPositions[w][1]);
    }
    ctx.globalAlpha = 1;

    // Figure in sajdah at the bottom
    const figX = CW/2, figY = 148;
    ctx.fillStyle = '#c8a870';
    // prostration — head forward, arms out
    fillRect(ctx, figX-10, figY,   20, 16); // torso
    fillRect(ctx, figX-14, figY+2, 8, 6);   // left arm
    fillRect(ctx, figX+6,  figY+2, 8, 6);   // right arm
    fillRect(ctx, figX-5,  figY+6, 10, 10); // head on ground
    // prayer mat
    ctx.fillStyle = '#2a5a2a'; fillRect(ctx, figX-26, figY+14, 52, 8);

    // Peaceful glow around figure
    const peaceGlow = 0.15 + 0.1 * Math.sin(this.t * 0.03);
    ctx.fillStyle = `rgba(255,235,150,${peaceGlow})`;
    ctx.beginPath(); ctx.ellipse(figX, figY+8, 60, 25, 0, 0, Math.PI*2); ctx.fill();

    // Labels
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; fillRect(ctx, 2, 2, 185, 18);
    ctx.fillStyle = '#ffe87a'; ctx.font = `bold 8px sans-serif`; ctx.textAlign = 'left';
    ctx.fillText('🤲 CLICK: The final du\'a (2:285–286)', 6, 14);
  }
}

// ====================================================
//  SCENE 3 (Level 3) — THE FIRST CALL  (2:21-29)
// ====================================================

class SceneFirstCall extends BaseScene {
  constructor() {
    super('canvas-3');
    if (!this.canvas) return;
    this.tabletY = -40;
    this.mosquitoAngle = 0;
    this.clickZones = [
      { x: 30,  y: 20,  w: 180, h: 140, key: 'first_call' },
      { x: 260, y: 30,  w: 180, h: 130, key: 'quran_challenge' },
      { x: 500, y: 20,  w: 170, h: 140, key: 'mosquito_parable' },
    ];
  }

  draw() {
    const ctx = this.ctx, p = sceneP();
    fillRect(ctx, 0, 0, CW, CH, p.sky0);
    this.stars(30);
    this.ground(p.gnd, p.gndAcc);

    if (this.tabletY < 40) this.tabletY += 0.3;
    var tY = this.tabletY + Math.sin(this.t * 0.03) * 4;
    var grd = ctx.createRadialGradient(120, tY + 40, 10, 120, tY + 40, 90);
    grd.addColorStop(0, 'rgba(255,215,0,0.35)');
    grd.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(30, tY - 20, 180, 140);
    ctx.fillStyle = '#f5f0d8'; ctx.fillRect(70, tY, 100, 70);
    ctx.fillStyle = '#1a3a1a';
    ctx.font = 'bold 18px "Amiri", serif';
    ctx.textAlign = 'center';
    ctx.fillText('ٱعْبُدُوا۟', 120, tY + 30);
    ctx.font = 'bold 12px "Amiri", serif';
    ctx.fillText('رَبَّكُمُ', 120, tY + 52);
    ctx.textAlign = 'left';

    var cx = 350, cy = 65 + Math.sin(this.t * 0.025) * 5;
    ctx.fillStyle = '#d4b060';
    ctx.fillRect(cx - 50, cy - 30, 100, 60);
    ctx.fillStyle = '#3a2a0a';
    ctx.fillRect(cx - 46, cy - 26, 92, 52);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 9px "Amiri", serif';
    ctx.textAlign = 'center';
    ctx.fillText('فَأْتُوا بِسُورَةٍ', cx, cy - 6);
    ctx.fillText('مِّن مِّثْلِهِ', cx, cy + 10);
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillText('CHALLENGE', cx, cy + 28);
    ctx.textAlign = 'left';

    this.mosquitoAngle += 0.07;
    var mx = 585 + Math.sin(this.mosquitoAngle) * 30;
    var my = 60 + Math.cos(this.mosquitoAngle * 1.3) * 20;
    ctx.fillStyle = '#333'; ctx.beginPath(); ctx.ellipse(mx, my, 6, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx - 2, my - 3); ctx.lineTo(mx - 8, my - 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx + 2, my - 3); ctx.lineTo(mx + 8, my - 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx + 6, my); ctx.lineTo(mx + 14, my + 2); ctx.stroke();
    var mGlow = ctx.createRadialGradient(mx, my, 4, mx, my, 40);
    mGlow.addColorStop(0, 'rgba(255,240,180,0.25)');
    mGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = mGlow;
    ctx.fillRect(mx - 40, my - 40, 80, 80);

    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, 2, 195, 16);
    ctx.fillStyle = p.label; ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillText('👆 CLICK: Worship (2:21)', 6, 13);
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 245, 2, 200, 16);
    ctx.fillStyle = p.label; ctx.fillText('👆 CLICK: Challenge (2:23)', 249, 13);
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 490, 2, 195, 16);
    ctx.fillStyle = p.label; ctx.fillText('👆 CLICK: Mosquito (2:26)', 494, 13);
  }
}

// ====================================================
//  SCENE 8 (Level 8) — THE JEALOUS & THE REFUTED (2:104-123)
// ====================================================

class SceneRefuted extends BaseScene {
  constructor() {
    super('canvas-8');
    if (!this.canvas) return;
    this.kunFlash = 0;
    this.clickZones = [
      { x: 20,  y: 10,  w: 200, h: 150, key: 'east_west' },
      { x: 250, y: 20,  w: 200, h: 140, key: 'kun_fayakun' },
      { x: 490, y: 10,  w: 190, h: 150, key: 'distort_torah' },
    ];
  }

  draw() {
    const ctx = this.ctx, p = sceneP();
    fillRect(ctx, 0, 0, CW, CH, '#0a0a1a');
    this.stars(40);

    var arrowPulse = 0.5 + 0.3 * Math.sin(this.t * 0.04);
    ctx.globalAlpha = arrowPulse;
    ctx.fillStyle = '#ffa040';
    ctx.beginPath(); ctx.moveTo(30, 90); ctx.lineTo(60, 70); ctx.lineTo(60, 110); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ff6040';
    ctx.fillRect(60, 82, 50, 16);
    ctx.fillStyle = '#40a0ff';
    ctx.beginPath(); ctx.moveTo(200, 90); ctx.lineTo(170, 70); ctx.lineTo(170, 110); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#4060ff';
    ctx.fillRect(120, 82, 50, 16);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffd700';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('EAST ← ALLAH → WEST', 115, 130);

    this.kunFlash += 0.04;
    var flashR = 30 + 20 * Math.abs(Math.sin(this.kunFlash));
    var grd = ctx.createRadialGradient(350, 85, 5, 350, 85, flashR + 40);
    grd.addColorStop(0, 'rgba(255,255,200,0.5)');
    grd.addColorStop(0.5, 'rgba(255,200,50,0.2)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(250, 10, 200, 160);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px "Amiri", serif';
    ctx.fillText('كُن فَيَكُونُ', 350, 75);
    ctx.fillStyle = '#ffd700';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText('BE! AND IT IS', 350, 100);

    var figX = 560, figY = GY - 60;
    spr(ctx, figX, figY, human('#5a2a2a', '#3a1a1a', SKIN2));
    ctx.fillStyle = 'rgba(100,50,50,0.3)';
    ctx.beginPath(); ctx.ellipse(figX + 15, figY - 15, 40, 25, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff6666'; ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillText('JEALOUSY', figX - 10, figY - 22);
    ctx.textAlign = 'left';

    fillRect(ctx, 0, GY, CW, CH - GY, '#1a1a30');

    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, 2, 210, 16);
    ctx.fillStyle = '#ffd700'; ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillText('👆 CLICK: East & West (2:115)', 6, 13);
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 235, 2, 230, 16);
    ctx.fillStyle = '#ffd700'; ctx.fillText('👆 CLICK: Kun fa yakun (2:117)', 239, 13);
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 480, 2, 210, 16);
    ctx.fillStyle = '#ffd700'; ctx.fillText('👆 CLICK: Woe to them (2:79)', 484, 13);
  }
}

// ====================================================
//  INIT & CONTROL
// ====================================================

function initScenes() {
  scenes.s1  = new Scene1();
  scenes.s2  = new Scene2();
  scenes.s3  = new SceneFirstCall();
  scenes.s4  = new Scene3();
  scenes.s5  = new Scene4();
  scenes.s6  = new Scene5();
  scenes.s7  = new Scene6();
  scenes.s8  = new SceneRefuted();
  scenes.s9  = new Scene7();
  scenes.s11 = new Scene8();
  scenes.s13 = new Scene9();
  scenes.s16 = new Scene10();
  scenes.s19 = new Scene11();
  scenes.s20 = new Scene12();
  scenes.s22 = new Scene13();
}

function startScene(n) {
  const s = scenes[`s${n}`];
  if (s) s.start();
}

function stopAllScenes() {
  Object.values(scenes).forEach(s => s && s.stop && s.stop());
}
