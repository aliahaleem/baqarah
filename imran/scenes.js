'use strict';
// =============================================
//  AL-IMRAN QUEST — scenes.js
//  Canvas pixel-art animated scenes
// =============================================

const CW = 560, CH = 220, GY = 160, P = 4;

// --- THEME PALETTE ---
function sceneP() {
  const s = document.documentElement.dataset.theme === 'stars';
  return s ? {
    sky0:    '#06021a', sky1:    '#0a0422', sky2:    '#080318',
    gnd:     '#1a0e30', gndAcc:  '#241840',
    starStr: 'rgba(200,170,255,',
    acStr:   'rgba(210,140,200,',
    label:   '#c898e8',
    hint:    '#9870b8',
  } : {
    sky0:    '#0a1a2a', sky1:    '#08101a', sky2:    '#060c18',
    gnd:     '#1a2a10', gndAcc:  '#2a3a18',
    starStr: 'rgba(255,250,200,',
    acStr:   'rgba(255,215,0,',
    label:   '#ffd700',
    hint:    '#aaa',
  };
}

function fillRect(ctx, x, y, w, h, col) {
  if (col) ctx.fillStyle = col;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

// =============================================
//  VERSES — click popup data
// =============================================
const VERSES = {
  muhkam_verse: {
    ref: 'Al-Imran 3:7',
    arabic: 'هُوَ الَّذِي أَنزَلَ عَلَيْكَ الْكِتَابَ مِنْهُ آيَاتٌ مُّحْكَمَاتٌ هُنَّ أُمُّ الْكِتَابِ',
    english: '"It is He who revealed to you the Book. Some of its verses are definitive (muhkam) — they are the foundation of the Book — and others are ambiguous (mutashabih)."',
    note: 'The muhkam verses are the clear, foundational verses. They form the core of Islamic belief and practice. The mutashabih have deeper meanings — and those with deviated hearts chase them to cause confusion. The truly grounded say: "We believe in all of it — it is all from our Lord." This is the safe path.',
  },
  maryam_food: {
    ref: 'Al-Imran 3:37',
    arabic: 'كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا الْمِحْرَابَ وَجَدَ عِندَهَا رِزْقًا ۖ قَالَ يَا مَرْيَمُ أَنَّىٰ لَكِ هَٰذَا ۖ قَالَتْ هُوَ مِنْ عِندِ اللَّهِ',
    english: '"Every time Zakariyya entered the prayer room to see her, he found food with her. He said: Maryam! Where did this come from? She said: It is from Allah. Indeed Allah provides for whom He wills without account."',
    note: 'Winter fruit in summer, summer fruit in winter — Maryam\'s mihrab was a place of baraka. This miracle of daily provision moved Zakariyya so deeply that he immediately turned to Allah to ask for a child. When you see Allah\'s provisions around you — let them inspire you to make du\'a.',
  },
  zakariyya_dua: {
    ref: 'Al-Imran 3:38',
    arabic: 'هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُ ۖ قَالَ رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ',
    english: '"At that moment, Zakariyya called upon his Lord saying: My Lord! Grant me from You a good child. Indeed You are the Hearer of du\'a."',
    note: 'Zakariyya (AS) was very old, and his wife was barren. But the miracle he just witnessed — miraculous food for Maryam — reminded him that Allah\'s power has no limits. So he asked. This is a lesson: never let your circumstances stop you from making du\'a. Allah is As-Sami\' — He hears every word.',
  },
  kun_fayakun: {
    ref: 'Al-Imran 3:47',
    arabic: 'إِذَا قَضَىٰ أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُن فَيَكُونُ',
    english: '"When He decrees a matter, He only says to it: Be! — and it is."',
    note: 'Isa (AS) was born without a father — by the same power that created Adam without a father or mother. The Arabic "كُن فَيَكُون" (Kun Fayakun — Be! And it is) is one of the most powerful phrases in the Quran. Allah does not need causes or conditions. He simply wills — and it happens.',
  },
  isa_speaking: {
    ref: 'Al-Imran 3:46, 3:49',
    arabic: 'وَيُكَلِّمُ النَّاسَ فِي الْمَهْدِ وَكَهْلًا وَمِنَ الصَّالِحِينَ',
    english: '"He will speak to the people in the cradle and in maturity — and he will be among the righteous." And: "He heals those born blind and lepers, and brings the dead to life — by Allah\'s permission."',
    note: 'Every one of Isa\'s miracles ends with "bi idhnillah" — by Allah\'s permission. This is the Islamic understanding of Isa (AS): a honoured Prophet and servant of Allah who performed extraordinary miracles — but always as a proof of Allah\'s power, never his own. He was a human being, born of Maryam, given miracles by Allah.',
  },
  common_word: {
    ref: 'Al-Imran 3:64',
    arabic: 'قُلْ يَا أَهْلَ الْكِتَابِ تَعَالَوْا إِلَىٰ كَلِمَةٍ سَوَاءٍ بَيْنَنَا وَبَيْنَكُمْ أَلَّا نَعْبُدَ إِلَّا اللَّهَ',
    english: '"Say: O People of the Book! Come to a word that is equal between us and you — that we worship none but Allah, and associate nothing with Him, and none of us take others as lords besides Allah."',
    note: 'This verse is the basis for interfaith dialogue in Islam. Allah invites all people — regardless of their scripture — to the shared foundation: Tawhid (worship of Allah alone). The differences in law and ritual are secondary to this shared core. If they turn away — the Muslims declare: "Bear witness that we are Muslims (those who submit)."',
  },
  ibrahim_hanif: {
    ref: 'Al-Imran 3:67',
    arabic: 'مَا كَانَ إِبْرَاهِيمُ يَهُودِيًّا وَلَا نَصْرَانِيًّا وَلَٰكِن كَانَ حَنِيفًا مُّسْلِمًا',
    english: '"Ibrahim was neither Jewish nor Christian. He was a hanif — a pure monotheist who submitted to Allah. And he was never one of the polytheists."',
    note: '"Hanif" means one who turns away from all false worship toward the pure worship of Allah alone. Ibrahim (AS) predated both Judaism and Christianity — he was simply a Muslim in the true sense: one who submits to Allah alone. This is why every Muslim is called to the "millat Ibrahim" — the way of Ibrahim.',
  },
  hold_rope_verse: {
    ref: 'Al-Imran 3:103',
    arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا',
    english: '"Hold fast to the rope of Allah, all together, and do not be divided. Remember Allah\'s favour upon you — you were enemies, and He united your hearts, so you became brothers."',
    note: '"Allah\'s rope" refers to the Quran and the Sunnah — the unifying connection between the believers and their Lord. Division is one of the greatest dangers to the Ummah. Unity does not mean blind agreement — it means holding to the same rope while maintaining brotherhood. The Companions were once enemies — tribal rivals — and Islam made them brothers.',
  },
  best_nation_verse: {
    ref: 'Al-Imran 3:110',
    arabic: 'كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ',
    english: '"You are the best nation raised up for humanity — you command what is right, forbid what is wrong, and believe in Allah."',
    note: 'The honour of being "the best nation" is conditional — it depends on actively commanding good and forbidding evil. This is not a passive honour given at birth. It is an active responsibility. Every Muslim who speaks up against wrongdoing, who guides someone to good, who lives with integrity — they are fulfilling this verse.',
  },
  angels_badr: {
    ref: 'Al-Imran 3:124-125',
    arabic: 'أَلَن يَكْفِيَكُمْ أَن يُمِدَّكُمْ رَبُّكُم بِثَلَاثَةِ آلَافٍ مِّنَ الْمَلَائِكَةِ مُنزَلِينَ',
    english: '"Is it not sufficient for you that your Lord should support you with three thousand angels sent down? Yes! — if you are patient and mindful of Allah, and the enemy attacks you suddenly, your Lord will reinforce you with five thousand swooping angels!"',
    note: 'At Badr, the Muslims were outnumbered more than 3:1. But they made du\'a and trusted Allah. Allah answered with something beyond imagination — thousands of angels. The angels did not fight — they steadied the hearts of the believers. The lesson: when you align your will with Allah\'s, the forces of the unseen are with you.',
  },
  badr_lesson: {
    ref: 'Al-Imran 3:126',
    arabic: 'وَمَا النَّصْرُ إِلَّا مِنْ عِندِ اللَّهِ الْعَزِيزِ الْحَكِيمِ',
    english: '"And victory is not except from Allah, the Almighty, the All-Wise."',
    note: 'This is the master principle of Islamic strategy. Numbers, weapons, and plans matter — but they are secondary. True victory is from Allah. The Companions understood this. At Badr: 313 Muslims defeated 1,000. At Uhud: when they forgot this principle and chased worldly gain — they suffered. Tawakkul (trust in Allah) is a strategic tool, not just a spiritual one.',
  },
  archers_disobey: {
    ref: 'Al-Imran 3:152',
    arabic: 'حَتَّىٰ إِذَا فَشِلْتُمْ وَتَنَازَعْتُمْ فِي الْأَمْرِ وَعَصَيْتُم مِّن بَعْدِ مَا أَرَاكُم مَّا تُحِبُّونَ',
    english: '"Until when you faltered and disputed about the matter and disobeyed after He had shown you what you loved — among you are those who desire this world and those who desire the next."',
    note: 'The Prophet ﷺ placed 50 archers on a hill at Uhud with a clear order: "Do not leave your positions — even if you see birds eating our flesh." When the battle turned in the Muslims\' favour and spoils appeared, most of the archers left. The enemy cavalry circled back. This one act of disobedience changed the battle. Lesson: Obedience to the Prophet ﷺ is never negotiable — especially when victory seems certain.',
  },
  uhud_test: {
    ref: 'Al-Imran 3:166-167',
    arabic: 'وَمَا أَصَابَكُمْ يَوْمَ الْتَقَى الْجَمْعَانِ فَبِإِذْنِ اللَّهِ وَلِيَعْلَمَ الْمُؤْمِنِينَ',
    english: '"What you suffered on the day the two armies met — it was by Allah\'s permission — and so that He might make evident those who truly believe."',
    note: 'Uhud was not a defeat in the eyes of Allah — it was a test and a purification. The true believers were distinguished from the hypocrites. Seventy Companions including Hamzah (RA) — the "Lion of Allah" — were martyred. They are alive with Allah in the highest stations. Every hardship that a believer faces is an opportunity to prove their faith and to be elevated.',
  },
  hasbunallah: {
    ref: 'Al-Imran 3:173',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    english: '"Allah is sufficient for us, and He is the best Disposer of affairs."',
    note: 'After Uhud, people came and told the believers: "A great army has gathered against you — fear them!" Instead of running, the true believers said this phrase. The Prophet ﷺ said Ibrahim (AS) also said these same words when he was thrown into the fire. The fire became cool. Whoever says "Hasbunallahu wa ni\'mal wakeel" with true trust — Allah is enough for them.',
  },
  shuhada_alive: {
    ref: 'Al-Imran 3:169',
    arabic: 'وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ',
    english: '"Do not think of those killed in the cause of Allah as dead. Rather, they are alive with their Lord, being provided for."',
    note: 'After Uhud, the families of the shuhada grieved. This verse was a direct comfort to them — and to all who have ever lost a loved one in the cause of Allah. They are not in a dark grave. They are alive with their Lord, receiving provision, joyful, wanting the living to know: "We are happy — do not grieve for us!" SubhanAllah.',
  },
  shuhada_rizq: {
    ref: 'Al-Imran 3:170',
    arabic: 'فَرِحِينَ بِمَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ وَيَسْتَبْشِرُونَ بِالَّذِينَ لَمْ يَلْحَقُوا بِهِم',
    english: '"Rejoicing in what Allah has given them of His bounty — and giving glad tidings about those who have not yet joined them — that there will be no fear upon them, nor will they grieve."',
    note: 'The shuhada of Uhud are overjoyed. They have no fear, no grief — two things that define human suffering on earth. And they are looking forward to seeing their brothers and sisters who are still alive, knowing that when they arrive, they too will have nothing to fear. This is the ultimate comfort — and the ultimate motivation for a life of righteousness.',
  },
  creation_signs: {
    ref: 'Al-Imran 3:190',
    arabic: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ',
    english: '"Indeed, in the creation of the heavens and the earth and the alternation of night and day are signs for people of understanding (Ulu al-Albab)."',
    note: 'The Prophet ﷺ wept when this verse was revealed and said: "Woe to those who read it without reflecting on it." Every sunrise, every star, every turn of the season is a verse — an ayah — in the book of creation. The Ulu al-Albab (people of understanding) are those who read this book constantly and let it bring them closer to Allah.',
  },
  ulu_albab_verse: {
    ref: 'Al-Imran 3:191',
    arabic: 'الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ',
    english: '"Those who remember Allah while standing, sitting, and lying on their sides, and who reflect on the creation of the heavens and the earth: Our Lord, You did not create this in vain! Glory be to You — protect us from the punishment of the Fire."',
    note: 'The Ulu al-Albab do not remember Allah only in formal prayer. They remember Him in every position, every moment. Their dhikr is inseparable from their tafakkur (reflection). They see a star and say "SubhanAllah." They breathe and feel gratitude. This constant awareness — taqwa in motion — is what makes them the people of understanding.',
  },
  rabbanaa_verse: {
    ref: 'Al-Imran 3:8-9',
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
    english: '"Our Lord, do not let our hearts deviate after You have guided us. Grant us Your mercy — indeed You are the Giver of gifts. Our Lord, You will surely gather all people on a Day about which there is no doubt."',
    note: 'This is one of the most important du\'as in the Quran. "Rabbanaa la tuzigh quloobana ba\'da idh hadaytana." The fact that we need to ask for our hearts to stay guided shows that guidance is not guaranteed — it must be maintained with du\'a, remembrance, and obedience. Ask for this du\'a especially after every salah.',
  },
  final_dua_verse: {
    ref: 'Al-Imran 3:193-194',
    arabic: 'رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ ۞ رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ',
    english: '"Our Lord, forgive us our sins and erase our bad deeds and let us die with the righteous. Our Lord, give us what You promised us through Your messengers — and do not disgrace us on the Day of Resurrection."',
    note: 'These are the closing du\'as of Surah Al-Imran — made by the Ulu al-Albab who have reflected on creation and feared the Fire. They ask for forgiveness, for a blessed death, for the fulfilment of promises, and for protection from disgrace. Allah\'s answer follows: "I will not let the deeds of any worker among you go to waste — male or female." (3:195)',
  },
};

// =============================================
//  POPUP
// =============================================
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

// =============================================
//  BASE SCENE
// =============================================
class BaseScene {
  constructor(canvasId) {
    this.canvas  = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx     = this.canvas.getContext('2d');
    this.canvas.width  = CW;
    this.canvas.height = CH;
    this.t       = 0;
    this.running = false;
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
  stop()  { this.running = false; }
  draw()  {}
  hint(text, x, y) {
    if (Math.floor(this.t / 28) % 2 === 0) {
      this.ctx.fillStyle = 'rgba(255,215,0,0.85)';
      this.ctx.font = '7px "Press Start 2P", monospace';
      this.ctx.fillText(text, x, y);
    }
  }
}

// =============================================
//  SCENE 1 — THE LIVING BOOK (Muhkam vs Mutashabih)
// =============================================
class Scene1 extends BaseScene {
  constructor() {
    super('canvas-s1');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,      y: 0, w: CW * 0.5, h: CH, key: 'muhkam_verse' },
      { x: CW*0.5, y: 0, w: CW * 0.5, h: CH, key: 'muhkam_verse' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Split background
    const p = sceneP();
    ctx.fillStyle = p.sky0; fillRect(ctx, 0, 0, CW * 0.5, CH);
    ctx.fillStyle = p.sky1; fillRect(ctx, CW * 0.5, 0, CW * 0.5, CH);

    // LEFT — Muhkam: clear glowing verses (orderly pillars of light)
    const pulse = 0.5 + 0.5 * Math.sin(this.t * 0.04);
    for (let i = 0; i < 4; i++) {
      const lx   = 28 + i * 55;
      const lh   = 80 + i % 2 * 20;
      const glow = 0.4 + 0.3 * Math.sin(this.t * 0.03 + i);
      ctx.fillStyle = `rgba(100,200,255,${glow})`;
      fillRect(ctx, lx, CH * 0.55 - lh, 14, lh);
      ctx.fillStyle = `rgba(200,240,255,${glow})`;
      fillRect(ctx, lx + 2, CH * 0.55 - lh, 10, 4);
    }
    ctx.fillStyle = `rgba(150,230,255,${pulse})`;
    ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('آيَاتٌ مُّحْكَمَاتٌ', CW * 0.25, 22);
    ctx.fillStyle = '#88ccff'; ctx.font = '8px sans-serif';
    ctx.fillText('CLEAR VERSES', CW * 0.25, 35);
    ctx.fillText('(click)', CW * 0.25, CH - 12);

    // Figure pulled LEFT (toward the clear light)
    const figX = CW * 0.5 - 30 + Math.sin(this.t * 0.015) * 8;
    ctx.fillStyle = '#c8d8f0';
    fillRect(ctx, figX, 105, 16, 24); fillRect(ctx, figX + 2, 91, 12, 12);
    // arrow pointing left
    ctx.fillStyle = '#88ccff'; ctx.font = '12px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('←', figX + 8, 87);

    // RIGHT — Mutashabih: swirling golden particles of confusion
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + this.t * 0.015;
      const orb   = 50 + Math.sin(this.t * 0.02 + i) * 20;
      const sx    = CW * 0.75 + Math.cos(angle) * orb;
      const sy    = 100 + Math.sin(angle * 1.3) * orb * 0.5;
      const a     = 0.3 + 0.4 * Math.sin(this.t * 0.04 + i * 0.7);
      ctx.fillStyle = `rgba(200,160,60,${a})`;
      fillRect(ctx, sx - 3, sy - 3, 6, 6);
    }
    ctx.fillStyle = `rgba(255,200,80,${0.7 + 0.3 * pulse})`;
    ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('مُتَشَابِهَاتٌ', CW * 0.75, 22);
    ctx.fillStyle = '#ffcc88'; ctx.font = '8px sans-serif';
    ctx.fillText('AMBIGUOUS VERSES', CW * 0.75, 35);
    ctx.fillText('(click)', CW * 0.75, CH - 12);

    // Divider
    ctx.strokeStyle = '#ffffff22'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(CW * 0.5, 0); ctx.lineTo(CW * 0.5, CH); ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, 2, 168, 16);
    ctx.fillStyle = '#88ccff'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('💎 CLICK LEFT OR RIGHT', 6, 13);
  }
}

// =============================================
//  SCENE 2 — MARYAM'S FAMILY (Mihrab + Zakariyya)
// =============================================
class Scene2 extends BaseScene {
  constructor() {
    super('canvas-s2');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 150, y: 20,  w: 260, h: 160, key: 'maryam_food'    },
      { x: 30,  y: 60,  w: 110, h: 120, key: 'zakariyya_dua'  },
      { x: 410, y: 60,  w: 130, h: 130, key: 'zakariyya_dua'  },
    ];
  }
  draw() {
    const ctx = this.ctx;
    this.t++;
    // Background — warm golden interior
    ctx.fillStyle = '#1a100a'; fillRect(ctx, 0, 0, CW, CH);
    ctx.fillStyle = '#3a2010'; fillRect(ctx, 0, CH * 0.7, CW, CH * 0.3);

    // Mihrab arch (centre)
    const mx = CW * 0.5 - 80, my = 15, mw = 160, mh = 170;
    // Arch body
    ctx.fillStyle = '#3a2060';
    fillRect(ctx, mx, my + 40, mw, mh - 40);
    // Arch curve (approximated with rectangles)
    ctx.fillStyle = '#3a2060';
    for (let r = 0; r < 40; r++) {
      const half = Math.sqrt(Math.max(0, 40 * 40 - (r - 20) * (r - 20))) * (mw / 2) / 40;
      fillRect(ctx, mx + mw / 2 - half, my + r, half * 2, 2);
    }
    // Arch border
    ctx.strokeStyle = '#a07800'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(mx, my + 40); ctx.lineTo(mx, my + mh);
    ctx.moveTo(mx + mw, my + 40); ctx.lineTo(mx + mw, my + mh);
    ctx.stroke();
    ctx.strokeStyle = '#a07800'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(mx + mw/2, my + 40, mw/2, Math.PI, 0); ctx.stroke();

    // Miraculous food inside mihrab (fruit items)
    const fruitBob = Math.sin(this.t * 0.04) * 3;
    const fruits = ['🍇','🍈','🍊','🍎'];
    fruits.forEach((f, i) => {
      ctx.font = '16px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(f, mx + 30 + i * 32, my + 80 + fruitBob + (i % 2) * 12);
    });
    // Glow inside mihrab
    const glowA = 0.1 + 0.08 * Math.sin(this.t * 0.03);
    ctx.fillStyle = `rgba(255,210,80,${glowA})`;
    fillRect(ctx, mx + 10, my + 10, mw - 20, mh - 10);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('CLICK', CW * 0.5, my + mh - 8);

    // Zakariyya figure (left) — aged man in du'a
    const zx = 55, zy = 100;
    ctx.fillStyle = '#a08870'; fillRect(ctx, zx, zy, 18, 28); fillRect(ctx, zx+2, zy-14, 14, 13);
    // raised hands
    ctx.fillStyle = '#a08870';
    fillRect(ctx, zx - 14, zy + 2, 14, 6); fillRect(ctx, zx + 18, zy + 2, 14, 6);
    // du'a glow
    const duaA = 0.5 + 0.4 * Math.sin(this.t * 0.05);
    ctx.globalAlpha = duaA;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('رَبِّ هَبْ لِي', zx + 9, zy - 24);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#aaa'; ctx.font = '7px sans-serif';
    ctx.fillText('Zakariyya (click)', zx + 9, CH - 10);

    // Angel (right) — bringing tidings of Yahya
    const ax = 440, ay = 75;
    ctx.fillStyle = 'rgba(200,210,255,0.75)'; // wings
    ctx.beginPath(); ctx.moveTo(ax+8, ay+8); ctx.bezierCurveTo(ax+50, ay-20, ax+40, ay+40, ax+16, ay+24); ctx.fill();
    ctx.beginPath(); ctx.moveTo(ax+8, ay+8); ctx.bezierCurveTo(ax-34, ay-20, ax-24, ay+40, ax, ay+24); ctx.fill();
    ctx.fillStyle = '#d0d8ff'; fillRect(ctx, ax, ay, 16, 26); fillRect(ctx, ax+2, ay-14, 12, 12);
    // "YAHYA" announcement
    const annA = 0.5 + 0.5 * Math.sin(this.t * 0.04);
    ctx.globalAlpha = annA;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('يَحْيَىٰ', ax + 8, ay - 22);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#aaa'; ctx.font = '7px sans-serif';
    ctx.fillText('Angel (click)', ax + 8, CH - 10);

    // Stars
    const p2 = sceneP();
    [[20,15],[520,10],[480,40],[40,45],[CW/2,8]].forEach(([sx,sy],i) => {
      const br = 0.4 + 0.5 * Math.sin(this.t * 0.03 + i);
      ctx.fillStyle = p2.starStr + br + ')'; fillRect(ctx, sx, sy, 2, 2);
    });
  }
}

// =============================================
//  SCENE 3 — BIRTH OF ISA (Palm tree + Kun Fayakun)
// =============================================
class Scene3 extends BaseScene {
  constructor() {
    super('canvas-s3');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 340, y: 0,   w: 220, h: 160, key: 'kun_fayakun'   },
      { x: 0,   y: 0,   w: 340, h: CH,  key: 'isa_speaking'  },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Desert dusk sky
    const p3 = sceneP();
    const skyGrad = ctx.createLinearGradient(0,0,0,CH);
    skyGrad.addColorStop(0, p3.sky0); skyGrad.addColorStop(0.6, p3.sky1); skyGrad.addColorStop(1, p3.gnd);
    ctx.fillStyle = skyGrad; fillRect(ctx, 0, 0, CW, CH);
    ctx.fillStyle = p3.gndAcc; fillRect(ctx, 0, CH*0.72, CW, CH*0.28);

    // Stars
    [[30,20],[100,15],[200,30],[500,18],[460,35],[520,12]].forEach(([sx,sy],i) => {
      const br = 0.4 + 0.5 * Math.sin(this.t * 0.03 + i * 1.5);
      ctx.fillStyle = p3.starStr + br + ')'; fillRect(ctx, sx, sy, 2, 2);
    });

    // كُن فَيَكُون — cosmic text (right sky)
    const kfA = 0.6 + 0.4 * Math.sin(this.t * 0.035);
    ctx.globalAlpha = kfA;
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 22px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('كُن فَيَكُون', 450, 55);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#ffeebb'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('"Be — and it is"', 450, 72);
    ctx.globalAlpha = 1;
    // glow rays
    ctx.globalAlpha = 0.08 + 0.05 * Math.sin(this.t * 0.03);
    ctx.fillStyle = '#ffd700';
    for (let r = 0; r < 6; r++) {
      const angle = (r / 6) * Math.PI * 2;
      const rx2 = 450 + Math.cos(angle) * 80, ry2 = 55 + Math.sin(angle) * 40;
      ctx.beginPath(); ctx.moveTo(450-5,55); ctx.lineTo(rx2, ry2); ctx.lineTo(450+5,55); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Palm tree (centre-left)
    const px = 180, pBase = 160;
    // trunk
    ctx.fillStyle = '#7a5030';
    for (let seg = 0; seg < 8; seg++) fillRect(ctx, px + seg % 2, pBase - seg * 14, 12 - seg, 14);
    // leaves
    ctx.fillStyle = '#2a7a20';
    const leafAngles = [-0.8,-0.4,0,0.4,0.8,1.2,-1.2];
    leafAngles.forEach(angle => {
      const lx = px + 6 + Math.cos(angle) * 40, ly = pBase - 8*14 + Math.sin(angle - Math.PI/2) * 25;
      ctx.beginPath(); ctx.moveTo(px+6, pBase-8*14);
      ctx.quadraticCurveTo(lx, ly - 10, lx + Math.cos(angle)*20, ly + 15); ctx.strokeStyle = '#2a7a20'; ctx.lineWidth = 3; ctx.stroke();
    });
    // Dates falling
    const dateY = ((this.t * 0.6) % 60) + pBase - 8*14 + 10;
    ctx.fillStyle = '#d4a000'; ctx.beginPath(); ctx.arc(px + 6, dateY, 5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(px + 16, dateY + 8, 4, 0, Math.PI*2); ctx.fill();

    // Maryam — modest silhouette (from behind only, no face)
    const mfX = 100, mfY = 120;
    ctx.fillStyle = '#2a1840'; // dark robe (modest)
    fillRect(ctx, mfX, mfY, 22, 40); // body/robe
    fillRect(ctx, mfX - 4, mfY - 6, 30, 20); // headscarf (wider than body)
    ctx.fillStyle = '#1a1030'; // headscarf top
    fillRect(ctx, mfX - 2, mfY - 14, 26, 14);

    // Cradle (baby Isa) — glowing
    const cX = 55, cY = 138;
    const craGlow = 0.3 + 0.2 * Math.sin(this.t * 0.05);
    ctx.fillStyle = `rgba(255,220,100,${craGlow})`; fillRect(ctx, cX-6, cY-6, 52, 42);
    ctx.fillStyle = '#7a5030'; fillRect(ctx, cX, cY, 40, 30); // cradle body
    ctx.fillStyle = '#c8d8f0'; fillRect(ctx, cX+8, cY+4, 24, 18); // baby blanket
    ctx.fillStyle = '#f0d8c0'; fillRect(ctx, cX+12, cY+2, 16, 10); // baby head
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('CLICK → MIRACLES', 160, CH - 10);
    ctx.fillText('CLICK → "كن فيكون"', 450, CH - 10);
  }
}

// =============================================
//  SCENE 4 — IBRAHIM THE PURE MONOTHEIST
// =============================================
class Scene4 extends BaseScene {
  constructor() {
    super('canvas-s4');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,   y: 0, w: CW * 0.38, h: CH, key: 'common_word'    },
      { x: CW*0.38, y: 0, w: CW * 0.24, h: CH, key: 'ibrahim_hanif' },
      { x: CW*0.62, y: 0, w: CW * 0.38, h: CH, key: 'common_word'   },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Desert bg
    const p4 = sceneP();
    ctx.fillStyle = p4.sky0; fillRect(ctx, 0, 0, CW, CH*0.65);
    ctx.fillStyle = p4.gnd; fillRect(ctx, 0, CH*0.65, CW, CH*0.35);
    // Stars
    [[50,20],[150,15],[250,30],[350,18],[450,25],[500,12]].forEach(([sx,sy],i) => {
      const br = 0.3 + 0.4 * Math.sin(this.t * 0.03 + i);
      ctx.fillStyle = p4.starStr + br + ')'; fillRect(ctx, sx, sy, 2, 2);
    });

    // Ibrahim (centre) — pure light radiating
    const ibX = CW/2 - 10, ibY = 90;
    const coreGlow = 0.5 + 0.4 * Math.sin(this.t * 0.04);
    ctx.fillStyle = `rgba(255,215,0,${coreGlow * 0.25})`;
    ctx.beginPath(); ctx.arc(CW/2, ibY+14, 55, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(CW/2, ibY+14, 30, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#c8a870'; fillRect(ctx, ibX, ibY, 20, 30); fillRect(ctx, ibX+2, ibY-16, 16, 14);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('IBRAHIM AS', CW/2, ibY + 56);
    ctx.fillText('حَنِيفًا مُّسْلِمًا', CW/2, ibY + 68);
    ctx.fillStyle = '#ffd700'; ctx.font = '7px sans-serif';
    ctx.fillText('(click)', CW/2, CH - 10);

    // Left panel — People of the Book symbol (fading)
    const fadeL = 0.5 + 0.25 * Math.sin(this.t * 0.025);
    ctx.globalAlpha = fadeL;
    ctx.fillStyle = '#8888aa'; ctx.font = '32px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('✡', 105, 110);
    ctx.font = '28px sans-serif'; ctx.fillText('✝', 140, 130);
    ctx.fillStyle = '#88aacc'; ctx.font = 'bold 7px sans-serif';
    ctx.fillText('People of', 120, 158); ctx.fillText('the Book', 120, 170);
    ctx.fillStyle = '#aaccff'; ctx.font = '7px sans-serif';
    ctx.fillText('"Common Word"', 120, CH-10);
    ctx.globalAlpha = 1;

    // Right panel — same (symmetry)
    ctx.globalAlpha = fadeL;
    ctx.fillStyle = '#8888aa'; ctx.font = '30px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('📖', 440, 110);
    ctx.fillStyle = '#88aacc'; ctx.font = 'bold 7px sans-serif';
    ctx.fillText('Call to', 440, 158); ctx.fillText('Unity', 440, 170);
    ctx.fillStyle = '#aaccff'; ctx.font = '7px sans-serif';
    ctx.fillText('(click)', 440, CH-10);
    ctx.globalAlpha = 1;

    // Light rays from Ibrahim outward
    ctx.globalAlpha = 0.07 + 0.04 * Math.sin(this.t * 0.03);
    ctx.fillStyle = '#ffd700';
    for (let r = 0; r < 8; r++) {
      const angle = (r/8)*Math.PI*2 + this.t*0.005;
      ctx.beginPath(); ctx.moveTo(CW/2,ibY+14); ctx.lineTo(CW/2+Math.cos(angle)*220, ibY+14+Math.sin(angle)*120); ctx.lineTo(CW/2+Math.cos(angle+0.15)*220, ibY+14+Math.sin(angle+0.15)*120); ctx.closePath(); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

// =============================================
//  SCENE 5 — HOLD THE ROPE (Unity)
// =============================================
class Scene5 extends BaseScene {
  constructor() {
    super('canvas-s5');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0, y: 60,  w: CW, h: 60, key: 'hold_rope_verse'   },
      { x: 0, y: 120, w: CW, h: CH - 120, key: 'best_nation_verse' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    const p5 = sceneP();
    const united = (Math.floor(this.t / 180) % 2 === 0);
    ctx.fillStyle = united ? p5.sky0 : '#1a0a0a'; fillRect(ctx, 0, 0, CW, CH);
    ctx.fillStyle = p5.gnd; fillRect(ctx, 0, CH*0.7, CW, CH*0.3);

    // The Rope (horizontal, centre)
    const ropeY = 100;
    const ropeCol  = united ? '#ffd700' : '#555';
    const ropeGlow = united ? 0.4 + 0.2 * Math.sin(this.t * 0.05) : 0.1;
    ctx.fillStyle = `rgba(255,215,0,${ropeGlow})`;
    fillRect(ctx, 20, ropeY - 6, CW - 40, 16);
    ctx.fillStyle = ropeCol;
    fillRect(ctx, 20, ropeY - 3, CW - 40, 8);
    // rope twist lines
    for (let rx = 20; rx < CW - 40; rx += 20) {
      ctx.strokeStyle = united ? '#a07800' : '#333'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(rx, ropeY - 3); ctx.lineTo(rx + 10, ropeY + 4); ctx.stroke();
    }

    // Figures holding rope
    const figCount = 5;
    const figColours = ['#c8a870','#a07840','#d4b080','#b08050','#c8a060'];
    for (let f = 0; f < figCount; f++) {
      const fx = 40 + f * 110, fy = 115;
      ctx.fillStyle = figColours[f % figColours.length];
      fillRect(ctx, fx, fy, 16, 28); fillRect(ctx, fx+2, fy-14, 12, 12);
      // hands on rope
      ctx.fillStyle = figColours[f % figColours.length];
      fillRect(ctx, fx + 4, ropeY + 2, 8, 14);
    }

    // Status text
    ctx.fillStyle = united ? '#5dcc5d' : '#ff6666';
    ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(united ? '⚡ UNITED — ROPE GLOWS!' : '⚡ DIVIDED — ROPE DARK', CW/2, 50);
    ctx.fillStyle = '#aaa'; ctx.font = '7px sans-serif';
    ctx.fillText(united ? 'Click rope = the command | Click figures = best nation' : '', CW/2, 65);

    // "Hold the Rope" Arabic
    const alpha = 0.5 + 0.5 * Math.sin(this.t * 0.03);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 9px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا', CW/2, 22);
    ctx.globalAlpha = 1;

    // Label
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, CH-18, 220, 16);
    ctx.fillStyle = '#aaffaa'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('↑ click rope  |  ↓ click figures', 6, CH-7);
  }
}

// =============================================
//  SCENE 6 — BATTLE OF BADR (Angels descend)
// =============================================
class Scene6 extends BaseScene {
  constructor() {
    super('canvas-s6');
    if (!this.canvas) return;
    this.clickZones = [
      { x: CW*0.3, y: 0,    w: CW*0.4, h: 90,      key: 'angels_badr'  },
      { x: 0,      y: 80,   w: CW*0.4, h: CH-80,   key: 'badr_lesson'  },
      { x: CW*0.6, y: 80,   w: CW*0.4, h: CH-80,   key: 'badr_lesson'  },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Battle-field sky
    const p6 = sceneP();
    ctx.fillStyle = p6.sky0; fillRect(ctx, 0, 0, CW, CH*0.65);
    ctx.fillStyle = p6.gnd; fillRect(ctx, 0, CH*0.65, CW, CH*0.35);
    // Dust
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = 'rgba(150,120,60,0.18)';
      fillRect(ctx, (this.t * 0.3 + i * 110) % CW, 130 + i*6, 60, 12);
    }

    // Angels descending (top centre)
    for (let a = 0; a < 5; a++) {
      const ax = 140 + a * 64;
      const ay = 10 + Math.sin(this.t * 0.04 + a * 0.8) * 14;
      const ag = 0.6 + 0.3 * Math.sin(this.t * 0.05 + a);
      ctx.globalAlpha = ag;
      // wings
      ctx.fillStyle = 'rgba(200,215,255,0.8)';
      ctx.beginPath(); ctx.moveTo(ax+6,ay+6); ctx.bezierCurveTo(ax+40,ay-10,ax+30,ay+30,ax+12,ay+22); ctx.fill();
      ctx.beginPath(); ctx.moveTo(ax+6,ay+6); ctx.bezierCurveTo(ax-28,ay-10,ax-18,ay+30,ax,ay+22);   ctx.fill();
      ctx.fillStyle = '#d8e0ff';
      fillRect(ctx, ax, ay, 12, 20); fillRect(ctx, ax+1, ay-10, 10, 10);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = '#c8d8ff'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('3000+ ANGELS (click)', CW/2, 8);

    // Muslim army (left) — 4 figures
    ctx.fillStyle = '#4a7a3a';
    for (let f = 0; f < 4; f++) {
      fillRect(ctx, 30 + f*32, 100, 14, 24); fillRect(ctx, 32+f*32, 86, 10, 12);
      fillRect(ctx, 42+f*32, 104, 18, 4); // spear
    }
    ctx.fillStyle = '#88cc88'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('313 Muslims', 80, 148);
    ctx.fillText('(click)', 80, 158);

    // Enemy army (right) — 9 figures in 2 rows
    ctx.fillStyle = '#7a2a2a';
    for (let f = 0; f < 9; f++) {
      const rr = Math.floor(f/5);
      fillRect(ctx, 340 + (f%5)*34, 90+rr*34, 16, 26); fillRect(ctx, 342+(f%5)*34, 76+rr*34, 12, 12);
    }
    ctx.fillStyle = '#ff9999'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('1000+ Quraysh', 430, 162);
    ctx.fillText('(click)', 430, 172);

    // Victory flash
    const phase = Math.floor(this.t / 240) % 3;
    if (phase === 2) {
      ctx.fillStyle = 'rgba(255,215,0,0.08)'; fillRect(ctx, 0, 0, CW, CH);
      ctx.fillStyle = '#ffd700'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('وَمَا النَّصْرُ إِلَّا مِنْ عِندِ اللَّهِ', CW/2, CH/2);
    }
  }
}

// =============================================
//  SCENE 7 — BATTLE OF UHUD (Archers disobey)
// =============================================
class Scene7 extends BaseScene {
  constructor() {
    super('canvas-s7');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0,   y: 0, w: CW*0.5, h: CH,    key: 'archers_disobey' },
      { x: CW*0.5, y: 0, w: CW*0.5, h: CH, key: 'uhud_test'       },
    ];
  }
  draw() {
    const ctx = this.ctx;
    const p7 = sceneP();
    const phase = Math.floor(this.t / 180) % 3;
    ctx.fillStyle = p7.sky0; fillRect(ctx, 0, 0, CW, CH*0.65);
    ctx.fillStyle = p7.gnd; fillRect(ctx, 0, CH*0.65, CW, CH*0.35);
    // Mount Uhud (silhouette)
    ctx.fillStyle = '#2a2010';
    ctx.beginPath(); ctx.moveTo(0, CH*0.65); ctx.lineTo(100, 55); ctx.lineTo(180, 85); ctx.lineTo(240, CH*0.65); ctx.closePath(); ctx.fill();

    if (phase === 0) {
      // Archers on hill, holding position
      ctx.fillStyle = '#5a8a3a';
      for (let a = 0; a < 5; a++) {
        fillRect(ctx, 20+a*35, 70, 12, 22); fillRect(ctx, 22+a*35, 56, 10, 12);
        // bow
        ctx.strokeStyle = '#8a6030'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(30+a*35, 70, 10, -Math.PI/2, Math.PI/2); ctx.stroke();
        // arrow
        ctx.strokeStyle = '#d4a060'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(30+a*35, 70); ctx.lineTo(50+a*35, 70); ctx.stroke();
      }
      ctx.fillStyle = '#88cc88'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('Archers holding position ✓', 95, CH-8);
      ctx.fillText('"Do not leave!"', 95, CH-20);
    } else if (phase === 1) {
      // Archers seeing gold and leaving
      for (let a = 0; a < 5; a++) {
        const leaveX = 20 + a*35 + (this.t % 180) * 0.7;
        ctx.fillStyle = '#c8a040';
        fillRect(ctx, Math.min(leaveX, 200+a*30), 100, 12, 22);
        fillRect(ctx, Math.min(leaveX+2, 202+a*30), 86, 10, 12);
      }
      // gold coins
      ctx.fillStyle = '#ffd700'; ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('💰', 260, 90); ctx.fillText('💰', 290, 110);
      ctx.fillStyle = '#ff9999'; ctx.font = '7px sans-serif';
      ctx.fillText('Archers leave for spoils! ✗', 95, CH-8);
    } else {
      // Cavalry circling around from behind
      for (let c = 0; c < 4; c++) {
        const cx = CW - 100 + c*28, cy = 85;
        ctx.fillStyle = '#8a2020';
        fillRect(ctx, cx, cy, 18, 24); fillRect(ctx, cx+2, cy-14, 14, 12);
        // horse
        ctx.fillStyle = '#603010'; fillRect(ctx, cx - 10, cy+10, 14, 18);
      }
      ctx.fillStyle = '#ff8888'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('Cavalry circles from behind', 400, CH-8);
    }

    // "Hasbunallah" verse appearing right side
    const hasbA = 0.5 + 0.4 * Math.sin(this.t * 0.04);
    ctx.globalAlpha = hasbA;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 9px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', CW*0.75, 28);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#aaa'; ctx.font = '7px sans-serif';
    ctx.fillText('(click right side)', CW*0.75, 42);
    ctx.fillText('(click left side)', CW*0.25, CH-8);
  }
}

// =============================================
//  SCENE 8 — SHUHADA ALIVE IN JANNAH
// =============================================
class Scene8 extends BaseScene {
  constructor() {
    super('canvas-s8');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0, y: 0,     w: CW, h: CH*0.5, key: 'shuhada_alive' },
      { x: 0, y: CH*0.5, w: CW, h: CH*0.5, key: 'shuhada_rizq'  },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Jannah — lush golden-green
    const jGrad = ctx.createLinearGradient(0,0,0,CH);
    jGrad.addColorStop(0, '#001420'); jGrad.addColorStop(0.5, '#0a2810'); jGrad.addColorStop(1, '#1a4010');
    ctx.fillStyle = jGrad; fillRect(ctx, 0, 0, CW, CH);
    // River of light (horizontal)
    ctx.fillStyle = 'rgba(80,160,255,0.35)';
    fillRect(ctx, 0, CH*0.58, CW, 20);
    for (let rx = 0; rx < CW; rx += 4) {
      const wr = 0.15 + 0.15 * Math.sin(this.t * 0.04 + rx * 0.05);
      ctx.fillStyle = `rgba(120,200,255,${wr})`;
      fillRect(ctx, rx, CH*0.58, 3, 20);
    }

    // Shuhada (figures of light)
    const shuhadaX = [70, 160, 260, 380, 470];
    shuhadaX.forEach((sx, i) => {
      const sy    = 75;
      const glow  = 0.5 + 0.4 * Math.sin(this.t * 0.04 + i * 1.2);
      ctx.fillStyle = `rgba(255,230,100,${glow * 0.25})`;
      ctx.beginPath(); ctx.arc(sx+8, sy+14, 28, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = `rgba(220,240,255,${0.7 + glow * 0.3})`;
      fillRect(ctx, sx, sy, 16, 26); fillRect(ctx, sx+2, sy-14, 12, 12);
    });

    // Provision raining down from above (light drops)
    for (let p = 0; p < 12; p++) {
      const px  = (p * 47 + this.t * 0.4) % CW;
      const py  = ((this.t * 0.5 + p * 18) % (CH * 0.6));
      const pa  = 0.3 + 0.5 * Math.sin(this.t * 0.04 + p);
      ctx.fillStyle = `rgba(255,215,80,${pa})`;
      fillRect(ctx, px, py, 3, 3);
    }

    // Stars (Jannah stars)
    const p8 = sceneP();
    [[40,15],[130,22],[220,10],[320,18],[420,12],[510,25]].forEach(([sx,sy],i) => {
      const br = 0.4 + 0.5 * Math.sin(this.t * 0.03 + i*1.4);
      ctx.fillStyle = p8.starStr + br + ')'; fillRect(ctx, sx, sy, i%3===0?3:2, i%3===0?3:2);
    });

    // ALIVE text
    const aliveA = 0.7 + 0.3 * Math.sin(this.t * 0.05);
    ctx.globalAlpha = aliveA;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('✓ ALIVE — بَلْ أَحْيَاءٌ', CW/2, 30);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#aaeebb'; ctx.font = '7px sans-serif';
    ctx.fillText('Click upper half → being alive | Click lower half → rizq', CW/2, CH-8);

    // Green trees on sides
    ctx.fillStyle = '#1a5010'; fillRect(ctx, 0, 80, 15, 70);
    ctx.fillStyle = '#2a7020'; fillRect(ctx, 0, 60, 22, 30);
    ctx.fillStyle = '#1a5010'; fillRect(ctx, CW-15, 80, 15, 70);
    ctx.fillStyle = '#2a7020'; fillRect(ctx, CW-22, 60, 22, 30);
  }
}

// =============================================
//  SCENE 9 — SIGNS IN THE HEAVENS (Ulu al-Albab)
// =============================================
class Scene9 extends BaseScene {
  constructor() {
    super('canvas-s9');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0, y: 0,      w: CW, h: CH*0.6, key: 'creation_signs'  },
      { x: 0, y: CH*0.6, w: CW, h: CH*0.4, key: 'ulu_albab_verse' },
    ];
  }
  draw() {
    const ctx = this.ctx;
    const dayNight = (this.t % 400) / 400; // 0 = night, 0.5 = day
    const isDay    = dayNight > 0.25 && dayNight < 0.75;
    const transition = Math.min(1, Math.abs(dayNight - 0.5) / 0.25);
    const skyR = Math.round(isDay ? 40 + transition*130 : 5 + (1-transition)*40);
    const skyG = Math.round(isDay ? 90 + transition*100 : 8 + (1-transition)*60);
    const skyB = Math.round(isDay ? 180 + transition*60 : 30 + (1-transition)*130);
    ctx.fillStyle = `rgb(${skyR},${skyG},${skyB})`; fillRect(ctx, 0, 0, CW, CH*0.7);
    ctx.fillStyle = '#3a5820'; fillRect(ctx, 0, CH*0.7, CW, CH*0.3);

    // Stars (night)
    const p9 = sceneP();
    if (!isDay || transition < 0.7) {
      const starA = Math.max(0, 1 - transition);
      [[40,20],[110,15],[200,28],[300,12],[390,25],[470,18],[530,10],[80,45],[250,50],[420,48]].forEach(([sx,sy],i) => {
        const br = starA * (0.4 + 0.5 * Math.sin(this.t * 0.03 + i * 1.5));
        ctx.fillStyle = p9.starStr + br + ')'; fillRect(ctx, sx, sy, 2, 2);
      });
    }

    // Sun or Moon
    if (isDay) {
      ctx.fillStyle = `rgba(255,220,80,${transition})`;
      ctx.beginPath(); ctx.arc(CW-60, 40, 28, 0, Math.PI*2); ctx.fill();
    } else {
      ctx.fillStyle = '#ffe87a';
      ctx.beginPath(); ctx.arc(CW-60, 40, 22, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = `rgb(${skyR},${skyG},${skyB})`;
      ctx.beginPath(); ctx.arc(CW-48, 36, 17, 0, Math.PI*2); ctx.fill();
    }

    // Verse text scrolling
    const alpha = 0.4 + 0.3 * Math.sin(this.t * 0.025);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 9px "Amiri", serif'; ctx.textAlign = 'center';
    ctx.fillText('إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ', CW/2, 15);
    ctx.globalAlpha = 1;

    // Figure in 3 positions (standing, sitting, lying)
    const posPhase = Math.floor(this.t / 120) % 3;
    const fx = CW/2 - 60;
    ctx.fillStyle = '#c8a870';
    if (posPhase === 0) {
      // Standing
      fillRect(ctx, fx, 105, 16, 32); fillRect(ctx, fx+2, 89, 12, 14);
      ctx.fillStyle = '#fff'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('STANDING', fx+8, 152);
    } else if (posPhase === 1) {
      // Sitting
      fillRect(ctx, fx, 120, 16, 20); fillRect(ctx, fx+2, 104, 12, 14);
      fillRect(ctx, fx, 136, 24, 10); // legs
      ctx.fillStyle = '#fff'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('SITTING', fx+8, 162);
    } else {
      // Lying (on side)
      fillRect(ctx, fx-10, 135, 36, 12); fillRect(ctx, fx+18, 126, 14, 12);
      ctx.fillStyle = '#fff'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('LYING DOWN', fx+8, 162);
    }
    ctx.fillStyle = '#ffd700'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('يَذْكُرُونَ اللَّهَ', CW/2, 100);

    // Labels
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, 2, 190, 16);
    ctx.fillStyle = '#aacfff'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('↑ click sky | ↓ click figure', 6, 13);
  }
}

// =============================================
//  SCENE 10 — FINAL DU'A OF AL-IMRAN (Night du'a)
// =============================================
class Scene10 extends BaseScene {
  constructor() {
    super('canvas-s10');
    if (!this.canvas) return;
    this.clickZones = [
      { x: 0, y: 0,      w: CW, h: CH*0.6, key: 'rabbanaa_verse'    },
      { x: 0, y: CH*0.6, w: CW, h: CH*0.4, key: 'final_dua_verse'  },
    ];
  }
  draw() {
    const ctx = this.ctx;
    // Deep indigo night
    const p10 = sceneP();
    const grad = ctx.createLinearGradient(0,0,0,CH);
    grad.addColorStop(0, p10.sky0); grad.addColorStop(1, p10.sky1);
    ctx.fillStyle = grad; fillRect(ctx, 0, 0, CW, CH);
    ctx.fillStyle = p10.gnd; fillRect(ctx, 0, CH*0.78, CW, CH*0.22);

    // Stars lighting up
    const allStars = [[55,20],[115,14],[200,28],[285,10],[365,24],[445,16],[510,30],[90,52],[170,46],[250,58],[330,40],[410,54],[490,42],[530,18],[60,38]];
    const litCount = Math.min(allStars.length, Math.floor(this.t / 14));
    allStars.forEach(([sx,sy],i) => {
      if (i >= litCount) return;
      const br = 0.5 + 0.5 * Math.sin(this.t * 0.04 + i * 1.7);
      ctx.fillStyle = p10.starStr + br + ')';
      fillRect(ctx, sx, sy, i%4===0?3:2, i%4===0?3:2);
    });

    // Crescent moon
    ctx.fillStyle = '#ffe87a';
    ctx.beginPath(); ctx.arc(480, 45, 26, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = p10.sky0;
    ctx.beginPath(); ctx.arc(494, 39, 21, 0, Math.PI*2); ctx.fill();

    // Du'a words appearing in stars
    const duaWords = ['رَبَّنَا', 'لَا تُزِغْ', 'قُلُوبَنَا', 'وَهَبْ لَنَا', 'رَحْمَةً'];
    const wordPositions = [[70,34],[170,22],[290,40],[400,28],[500,40]];
    const visWords = Math.min(duaWords.length, Math.floor(this.t / 50));
    for (let w = 0; w < visWords; w++) {
      const glow = 0.6 + 0.4 * Math.sin(this.t * 0.03 + w);
      ctx.globalAlpha = glow;
      ctx.fillStyle = '#ffd700'; ctx.font = 'bold 9px "Amiri", serif'; ctx.textAlign = 'center';
      ctx.fillText(duaWords[w], wordPositions[w][0], wordPositions[w][1]);
    }
    ctx.globalAlpha = 1;

    // 3 figures in sajdah
    const sajdaX = [160, 260, 360];
    sajdaX.forEach(sx => {
      const sy = 148;
      ctx.fillStyle = '#6a4ac0';
      fillRect(ctx, sx-10, sy, 20, 16); fillRect(ctx, sx-14, sy+2, 8, 6); fillRect(ctx, sx+6, sy+2, 8, 6);
      fillRect(ctx, sx-5, sy+6, 10, 10); // head on ground
      ctx.fillStyle = '#2d1b5a'; fillRect(ctx, sx-24, sy+14, 48, 8); // prayer mat
    });

    // Peaceful glow
    const pg = 0.1 + 0.07 * Math.sin(this.t * 0.03);
    ctx.fillStyle = `rgba(100,80,200,${pg})`; fillRect(ctx, 0, 120, CW, 80);

    // Labels
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; fillRect(ctx, 2, 2, 230, 16);
    ctx.fillStyle = '#c8b0ff'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('↑ click sky | ↓ click figures', 6, 13);
  }
}

// =============================================
//  SCENE REGISTRY
// =============================================
const scenes = {};

function initScenes() {
  scenes.s1  = new Scene1();
  scenes.s2  = new Scene2();
  scenes.s3  = new Scene3();
  scenes.s4  = new Scene4();
  scenes.s5  = new Scene5();
  scenes.s6  = new Scene6();
  scenes.s7  = new Scene7();
  scenes.s8  = new Scene8();
  scenes.s9  = new Scene9();
  scenes.s10 = new Scene10();
}

function startScene(n) {
  const s = scenes[`s${n}`];
  if (s) s.start();
}

function stopAllScenes() {
  Object.values(scenes).forEach(s => s && s.stop && s.stop());
}
