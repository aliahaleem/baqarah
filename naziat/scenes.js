'use strict';
// =============================================
//  SURAH AN-NAZI'AT QUEST — scenes.js
//  Palette: deep teal / warm amber / emerald
// =============================================

const CW = 560, CH = 220, P = 4;

// --- THEME PALETTE ---
// Returns color tokens for the active theme so draw() methods stay DRY.
function sceneP() {
  const s = document.documentElement.dataset.theme === 'stars';
  return s ? {
    sky0:    '#161d38', sky1:    '#1e2852', sky2:    '#263268',
    gnd:     '#2e3870', gndAcc:  '#3e4888',
    starStr: 'rgba(190,200,255,',
    acStr:   'rgba(208,176,80,',
    label:   '#d0b050',
  } : {
    sky0:    '#020810', sky1:    '#060c18', sky2:    '#0e2010',
    gnd:     '#1a2808', gndAcc:  '#2a4010',
    starStr: 'rgba(255,240,200,',
    acStr:   'rgba(255,187,68,',
    label:   '#a8ffe0',
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
  angels: {
    ref: "An-Nazi'at 79:1-5",
    arabic: "وَالنَّازِعَاتِ غَرْقًا ۩ وَالنَّاشِطَاتِ نَشْطًا ۩ وَالسَّابِحَاتِ سَبْحًا ۩ فَالسَّابِقَاتِ سَبْقًا ۩ فَالْمُدَبِّرَاتِ أَمْرًا",
    english: '"By the [angels] who extract with violent force / and those who remove with ease / and those who float through the heavens / and those who race ahead / and those who administer the divine matters!"',
    note: "Allah swears by five descriptions of angels. 'Al-Nazi'at gharqa' — the ones who extract souls with violent, drowning force: these are angels of death who pull out wicked souls like iron hooks ripping through water. 'Al-Nashitat nashtan' — those who remove gently: they draw out righteous souls with ease, like a pearl sliding off silk. 'Al-Sabihat sabhan' — those who float/swim freely through the heavens. 'Al-Sabiqat sabqan' — those who race ahead to execute divine commands before others can blink. 'Al-Mudabbirat amran' — those who administer the entire divine program of creation. These five oaths reveal a vast cosmic administration — entirely invisible to human eyes — yet operating every moment.",
  },
  trembling: {
    ref: "An-Nazi'at 79:6-14",
    arabic: "يَوْمَ تَرْجُفُ الرَّاجِفَةُ ۩ تَتْبَعُهَا الرَّادِفَةُ ۩ قُلُوبٌ يَوْمَئِذٍ وَاجِفَةٌ ۩ أَبْصَارُهَا خَاشِعَةٌ",
    english: '"On the Day the trembling one trembles — and the following one follows — hearts that Day will be pounding / their eyes will be downcast."',
    note: "'Al-Rajifa' — the first Blast of the Horn (Soor) that shakes and shatters the entire universe. 'Al-Radifa' — the second Blast that follows, which raises everyone from the dead. Two blasts: the first destroys, the second resurrects all of creation. 'Qulub yawma'idhin wajifa' — hearts on that Day will be in violent, pounding trembling — like a terrified bird. 'Absaruha khashi'a' — eyes downcast and humbled. Yet in this world the mockers laughed and said: 'Shall we really be returned to our original state? Even after we are decayed bones?' They thought resurrection was impossible. Verse 14 answers them: 'It will be only a single shout (zajra wahida) — and behold, they are at the surface of the earth.' One shout. Instantaneous. Undeniable.",
  },
  holy_valley: {
    ref: "An-Nazi'at 79:15-19",
    arabic: "هَلْ أَتَاكَ حَدِيثُ مُوسَىٰ ۩ إِذْ نَادَاهُ رَبُّهُ بِالْوَادِ الْمُقَدَّسِ طُوًى ۩ اذْهَبْ إِلَىٰ فِرْعَوْنَ إِنَّهُ طَغَىٰ ۩ فَقُلْ هَل لَّكَ إِلَىٰ أَن تَزَكَّىٰ",
    english: '"Has the story of Moses reached you? When his Lord called to him in the sacred valley of Tuwa: \'Go to Pharaoh — indeed he has transgressed! And say to him: Would you like to purify yourself?\'"',
    note: "'Hal ataka hadeeth Musa?' — Has the story of Moses come to you? This gentle opening draws us in. The event: Moses is in the sacred valley of Tuwa on the slopes of Mount Sinai — holy ground. Allah calls to him directly. The mission given: go to Pharaoh, for 'innahu tagha' — he has transgressed all limits. But the message Moses is to deliver is NOT a threat first — it is an invitation: 'Hal laka ila an tazakka?' — 'Would you like to PURIFY yourself?' Tazkiyah — purification of the soul. Allah sent His messenger with a gentle offer of salvation before any punishment. This is how Islam invites: with mercy and purification as the first word.",
  },
  pharaoh_denial: {
    ref: "An-Nazi'at 79:20-26",
    arabic: "فَأَرَاهُ الْآيَةَ الْكُبْرَىٰ ۩ فَكَذَّبَ وَعَصَىٰ ۩ ثُمَّ أَدْبَرَ يَسْعَىٰ ۩ فَحَشَرَ فَنَادَىٰ ۩ فَقَالَ أَنَا رَبُّكُمُ الْأَعْلَىٰ ۩ فَأَخَذَهُ اللَّهُ نَكَالَ الْآخِرَةِ وَالْأُولَىٰ",
    english: '"So [Moses] showed him the greatest sign. But he denied and disobeyed. Then he turned away hastily. Then he gathered [his people] and proclaimed: \'I am your most exalted lord!\' — So Allah seized him with the punishment of the Last and the First."',
    note: "'Al-aya al-kubra' — Moses showed Pharaoh the greatest sign: the staff becoming a serpent, the shining hand. Clear, undeniable miracles from the Lord of creation. Pharaoh's response: 'Fakadhdhaba wa 'asa' — he DENIED (emphatically) and DISOBEYED. 'Thumma adbara yas'a' — then he turned his back HASTILY — almost running, as if he could flee the truth. He gathered all his people and SHOUTED: 'Ana rabbukum al-A'la!' — 'I AM YOUR MOST EXALTED LORD!' The peak of arrogance: claiming divinity when face to face with Allah's signs. The consequence: 'Fa-akhadha-hu Allahu nakal al-akhirah wal-ula' — Allah seized him as a punishment and warning for both this world AND the next. He drowned. His body was preserved as a sign. A lesson for all of history.",
  },
  creation_signs: {
    ref: "An-Nazi'at 79:27-33",
    arabic: "أَأَنتُمْ أَشَدُّ خَلْقًا أَمِ السَّمَاءُ ۚ بَنَاهَا ۩ رَفَعَ سَمْكَهَا فَسَوَّاهَا ۩ وَأَغْطَشَ لَيْلَهَا وَأَخْرَجَ ضُحَاهَا ۩ وَالْأَرْضَ بَعْدَ ذَٰلِكَ دَحَاهَا",
    english: '"Are you more difficult to create — or the sky? He built it. He raised its canopy and proportioned it. He darkened its night and extracted its brightness. And the earth — He spread it out. He brought forth from it its water and its pastures."',
    note: "'A-antum ashaddu khalqan am al-sama'?' — Are YOU harder to create, or the entire sky/cosmos? SubhanAllah! Those who doubted that Allah could recreate them after death had forgotten: He created the entire universe! 'Bana-ha' — He BUILT it. 'Rafa'a samkaha' — He raised its ceiling to incomprehensible heights. 'Sawwaha' — He proportioned and perfected it — not a crack, not a flaw. 'Aghtasha layla-ha' — He darkened its night. 'Akhraja duhaha' — He extracted its daytime brightness. Then the earth: 'Daha-ha' — He spread it out (related to 'daha' — like an egg shape — subhanAllah, the earth is indeed spherical). And from it: water and green pastures for every living creature. He created all of this. Re-creating you is effortless.",
  },
  at_tammah: {
    ref: "An-Nazi'at 79:34-41",
    arabic: "فَإِذَا جَاءَتِ الطَّامَّةُ الْكُبْرَىٰ ۩ يَوْمَ يَتَذَكَّرُ الْإِنسَانُ مَا سَعَىٰ ۩ فَأَمَّا مَن طَغَىٰ وَآثَرَ الْحَيَاةَ الدُّنْيَا فَإِنَّ الْجَحِيمَ هِيَ الْمَأْوَىٰ ۩ وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ فَإِنَّ الْجَنَّةَ هِيَ الْمَأْوَىٰ",
    english: '"When the Greatest Catastrophe (At-Tammah) comes — the Day man will remember all he strove for — as for the one who transgressed and preferred this world: Hellfire is his refuge. But as for the one who feared standing before his Lord and restrained himself from desire: Paradise (al-ma\'wa) is his refuge."',
    note: "'Al-Tamma al-Kubra' — The Greatest Catastrophe/Overwhelming. 'Tammah' from 'amma' — to overwhelm completely, to drown out all else. Every disaster in history is nothing compared to this Day. 'Yawma yatadhakkaru al-insanu ma sa'a' — the Day man will REMEMBER EVERYTHING he strove for — every choice, every priority, every ignored warning. Then comes the great fork: those who CHOSE transgression and preferred dunya over akhira → Hellfire is their permanent dwelling. But those who FEARED standing before their Lord — 'maqam Rabb' — the moment of full accountability — and who RESTRAINED their nafs from 'hawa' (ego, desire, whims) → Paradise al-Ma'wa is their permanent dwelling. Two simple choices. Made in this life. With permanent consequences.",
  },
  the_hour: {
    ref: "An-Nazi'at 79:42-46",
    arabic: "يَسْأَلُونَكَ عَنِ السَّاعَةِ أَيَّانَ مُرْسَاهَا ۩ فِيمَ أَنتَ مِن ذِكْرَاهَا ۩ إِلَىٰ رَبِّكَ مُنتَهَاهَا ۩ إِنَّمَا أَنتَ مُنذِرُ مَن يَخْشَاهَا ۩ كَأَنَّهُمْ يَوْمَ يَرَوْنَهَا لَمْ يَلْبَثُوا إِلَّا عَشِيَّةً أَوْ ضُحَاهَا",
    english: '"They ask you about the Hour: when is its arrival? What have you to do with its mention? To your Lord alone is its ultimate limit. You are only a warner for whoever fears it. The Day they see it — as though they had not remained [in this world] except for an evening or its morning."',
    note: "'Yas'aloonaka 'an al-Sa'ah' — They ask you [O Muhammad ﷺ] about the Hour: 'Ayyan mursaha?' — When exactly will it drop anchor? A demanding, sometimes taunting question. Allah's response: 'Fima anta min dhikriha?' — What do you have to do with mentioning it? That knowledge is above your rank. 'Ila Rabbika muntahaha' — To your Lord ALONE belongs its ultimate limit. No angel, no prophet, no human being knows. 'Innama anta mundhiru man yakhshaha' — You are ONLY a warner for those who FEAR it. And the final, breathtaking verse: when they SEE that Day — all of this world's life will feel like no more than an evening or its morning. A lifetime of 80 years reduced to the feeling of a single afternoon. This world is fleeting. The Akhira is forever.",
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
  start() { if (this.running || !this.canvas) return; this.running = true; this._loop(); }
  stop()  { this.running = false; }
  _loop() { if (!this.running) return; this.draw(); this.t++; requestAnimationFrame(() => this._loop()); }
  draw()  {}
  _star(ctx, x, y, r, bright) {
    ctx.fillStyle = sceneP().starStr + bright + ')';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }
  _pixelFigure(ctx, x, y, bodyCol, headCol) {
    fillRect(ctx, x,    y,      P*3, P*3, headCol  || '#f5d8b0');
    fillRect(ctx, x-P,  y+P*3,  P*5, P*4, bodyCol || '#1a6040');
    fillRect(ctx, x,    y+P*7,  P*2, P*3, '#333');
    fillRect(ctx, x+P*2,y+P*7,  P*2, P*3, '#333');
  }
  _pixelAngel(ctx, x, y, col) {
    fillRect(ctx, x+P,   y,     P*2, P*2, '#fff8e0');
    fillRect(ctx, x,     y+P*2, P*4, P*3, col || '#c8f0d8');
    fillRect(ctx, x-P*3, y+P,   P*3, P*2, '#fff8e0');
    fillRect(ctx, x+P*4, y+P,   P*3, P*2, '#fff8e0');
  }
}

// =============================================
//  SCENE 1 — THE FIVE ANGELS (79:1-5)
// =============================================
class Scene1 extends BaseScene {
  constructor() { super('canvas-1'); this.clickZones = [{ x:0, y:0, w:CW, h:CH, key:'angels' }]; }
  draw() {
    const c = this.ctx, t = this.t, p = sceneP();
    c.fillStyle = p.sky0; c.fillRect(0, 0, CW, CH);
    const seed = n => ((n*2654435769)>>>0)/4294967296;
    for (let i = 0; i < 60; i++) {
      this._star(c, seed(i*7)*CW, seed(i*13)*CH*0.7, 1+seed(i*3)*1.5, 0.3+0.5*Math.abs(Math.sin(t*0.02+i)));
    }
    fillRect(c, 0, 185, CW, 35, p.gnd); fillRect(c, 0, 185, CW, 4, p.gndAcc);
    c.fillStyle=p.acStr+'0.9)';c.font='7px "Press Start 2P",monospace';c.textAlign='center';
    c.fillText('THE FIVE ANGELS — 79:1-5', CW/2, 18); c.textAlign='left';

    // Angel 1 — Extractor (red/forceful)
    c.shadowBlur=10;c.shadowColor=`rgba(255,80,80,${0.5+0.4*Math.sin(t*0.05)})`;
    this._pixelAngel(c, 30, 80, '#d04040'); c.shadowBlur=0;
    fillRect(c, 44, 100, P, P*3, '#c83030');
    c.fillStyle='#ff8888';c.font='6px monospace';c.textAlign='center';c.fillText('Extractors',44,140);

    // Angel 2 — Releaser (soft teal)
    c.shadowBlur=10;c.shadowColor=`rgba(180,255,220,${0.5+0.4*Math.sin(t*0.04+1)})`;
    this._pixelAngel(c, 110, 85, '#60c090'); c.shadowBlur=0;
    c.fillStyle='#a8ffe0';c.textAlign='center';c.fillText('Releasers',124,140);

    // Angel 3 — Floater (floating, light blue)
    const a3y = 65+6*Math.sin(t*0.03+2);
    c.shadowBlur=12;c.shadowColor=`rgba(180,220,255,${0.5+0.4*Math.sin(t*0.03+2)})`;
    this._pixelAngel(c, 200, a3y, '#80b8e0'); c.shadowBlur=0;
    c.fillStyle='#b0d8ff';c.textAlign='center';c.fillText('Floaters',214,140);

    // Angel 4 — Racer (gold, leaning forward)
    const a4x=300+3*Math.sin(t*0.08);
    c.shadowBlur=14;c.shadowColor=`rgba(255,220,80,${0.6+0.4*Math.sin(t*0.06+3)})`;
    this._pixelAngel(c, a4x, 75, '#d0a830'); c.shadowBlur=0;
    c.strokeStyle='rgba(255,220,80,0.4)';c.lineWidth=1;
    c.beginPath();c.moveTo(a4x-5,88);c.lineTo(a4x-20,88);c.stroke();
    c.beginPath();c.moveTo(a4x-5,95);c.lineTo(a4x-18,95);c.stroke();
    c.fillStyle='#ffe090';c.textAlign='center';c.fillText('Racers',a4x+12,140);

    // Angel 5 — Administrator (purple, with scroll)
    c.shadowBlur=12;c.shadowColor=`rgba(220,180,255,${0.5+0.4*Math.sin(t*0.04+4)})`;
    this._pixelAngel(c, 440, 78, '#a878e8'); c.shadowBlur=0;
    fillRect(c, 454, 98, P*3, P*2, '#f8f0d0'); fillRect(c, 456, 97, P, P*4, '#d0c090');
    c.fillStyle='#d8b8ff';c.textAlign='center';c.fillText('Admins',454,140);

    // Connecting dotted arrows
    c.strokeStyle=p.acStr+'0.25)';c.lineWidth=1;c.setLineDash([4,4]);
    [[68,108],[148,198],[236,298],[340,438]].forEach(([x1,x2])=>{
      c.beginPath();c.moveTo(x1,95);c.lineTo(x2,95);c.stroke();
    });
    c.setLineDash([]);
    c.fillStyle=p.acStr+'0.6)';c.font='6px monospace';c.textAlign='center';
    c.fillText('Click for verses — 5 Oaths about the Angels',CW/2,210);c.textAlign='left';
  }
}

// =============================================
//  SCENE 2 — HEARTS TREMBLE (79:6-14)
// =============================================
class Scene2 extends BaseScene {
  constructor() {
    super('canvas-2');
    this.clickZones = [{ x:0,y:0,w:CW,h:CH,key:'trembling' }];
  }
  draw() {
    const c = this.ctx, t = this.t;
    const sky = c.createLinearGradient(0,0,0,CH);
    sky.addColorStop(0,'#150508');sky.addColorStop(0.5,'#2a0810');sky.addColorStop(1,'#3a1508');
    c.fillStyle=sky;c.fillRect(0,0,CW,CH);
    const quake=1.5*Math.sin(t*0.15);
    fillRect(c,0,185+quake,CW,35,'#3a1808');fillRect(c,0,185+quake,CW,4,'#5a2808');

    // First blast
    const b1=0.6+0.4*Math.sin(t*0.08);
    c.strokeStyle=`rgba(255,120,40,${b1})`;c.lineWidth=3;
    c.beginPath();c.arc(80,60,30+t%40,0,Math.PI*2);c.stroke();
    c.beginPath();c.arc(80,60,45+t%40,0,Math.PI*2);c.stroke();
    c.fillStyle=`rgba(255,160,80,${b1})`;c.font='7px monospace';c.textAlign='center';
    c.fillText('AL-RAJIFA',80,22);c.fillText('1st Blast',80,34);

    // Second blast
    const b2=0.4+0.4*Math.sin(t*0.08+Math.PI);
    c.strokeStyle=`rgba(255,220,80,${b2})`;c.lineWidth=2;
    c.beginPath();c.arc(480,60,25+t%35,0,Math.PI*2);c.stroke();
    c.fillStyle=`rgba(255,220,80,${b2})`;c.textAlign='center';
    c.fillText('AL-RADIFA',480,22);c.fillText('2nd Blast',480,34);

    // Trembling figures
    const tr=2*Math.sin(t*0.12);
    this._pixelFigure(c,200+tr,115,'#404080','#f5c890');
    fillRect(c,204,118,P,P,'#000');fillRect(c,208,118,P,P,'#000');
    const hp=0.7+0.3*Math.sin(t*0.15);
    c.fillStyle=`rgba(220,50,50,${hp})`;c.font='12px serif';c.textAlign='center';c.fillText('❤️',212,112);
    this._pixelFigure(c,260+tr*0.5,125,'#804040','#f0c888');
    fillRect(c,264,128,P,P,'#000');fillRect(c,268,128,P,P,'#000');

    // Mocker
    this._pixelFigure(c,380,120,'#305030','#f5d0a0');
    c.fillStyle='#fff8e0';c.fillRect(350,90,80,22);c.fillRect(388,112,8,8);
    c.fillStyle='#333';c.font='9px serif';c.textAlign='left';c.fillText('No way!',354,105);

    c.fillStyle='rgba(255,120,40,0.9)';c.font='7px monospace';c.textAlign='center';
    c.fillText('HEARTS TREMBLE — 79:6-14',CW/2,210);c.textAlign='left';
  }
}

// =============================================
//  SCENE 3 — MOSES IN THE HOLY VALLEY (79:15-19)
// =============================================
class Scene3 extends BaseScene {
  constructor() { super('canvas-3'); this.clickZones=[{x:0,y:0,w:CW,h:CH,key:'holy_valley'}]; }
  draw() {
    const c = this.ctx, t = this.t, p = sceneP();
    const sky=c.createLinearGradient(0,0,0,CH);
    sky.addColorStop(0,p.sky0);sky.addColorStop(0.6,p.sky1);sky.addColorStop(1,p.sky2);
    c.fillStyle=sky;c.fillRect(0,0,CW,CH);
    const seed=n=>((n*2654435769)>>>0)/4294967296;
    for(let i=0;i<40;i++) this._star(c,seed(i*5)*CW*0.8+CW*0.1,seed(i*11)*80,0.8+seed(i*7),0.4+0.4*Math.abs(Math.sin(t*0.02+i)));
    fillRect(c,0,180,CW,40,'#2a1808');fillRect(c,0,180,CW,4,'#3a2010');
    c.fillStyle='#0e1c14';
    c.beginPath();c.moveTo(60,180);c.lineTo(160,90);c.lineTo(260,180);c.closePath();c.fill();
    c.beginPath();c.moveTo(300,180);c.lineTo(380,110);c.lineTo(460,180);c.closePath();c.fill();

    // Divine fire / burning bush
    const ff=t*0.08;
    const gw=c.createRadialGradient(290,140,0,290,140,60+10*Math.sin(t*0.05));
    gw.addColorStop(0,'rgba(255,220,80,0.8)');gw.addColorStop(0.4,'rgba(255,120,30,0.4)');gw.addColorStop(1,'rgba(255,80,20,0)');
    c.fillStyle=gw;c.fillRect(230,90,120,100);
    fillRect(c,284,152,P*3,P*4,'#3a2808');
    for(let i=0;i<5;i++){
      const bx=272+i*8,by=132+Math.sin(ff+i)*4,bh=20+Math.sin(ff*1.3+i)*6;
      fillRect(c,bx,by,8,bh,i%2===0?'#ff8820':'#ffcc20');
    }
    c.save();c.globalAlpha=0.2+0.1*Math.sin(t*0.04);c.fillStyle='#ffee80';
    for(let i=0;i<6;i++){
      const ang=-Math.PI/2+(i-2.5)*0.15;
      c.beginPath();c.moveTo(290,0);c.lineTo(290+Math.cos(ang)*200,Math.sin(ang)*200);
      c.lineTo(290+Math.cos(ang+0.08)*200,Math.sin(ang+0.08)*200);c.closePath();c.fill();
    }
    c.restore();

    // Moses
    this._pixelFigure(c,175,130,'#4a6840','#e8c890');
    fillRect(c,185,120,P/2+1,P*8,'#6a4020');
    fillRect(c,188,140,P*2,P,'#e8c890');

    c.fillStyle='rgba(255,220,80,0.5)';c.font='7px monospace';c.textAlign='center';
    c.fillText('WADI TUWA — HOLY VALLEY',290,22);
    c.fillStyle='rgba(200,255,200,0.7)';
    c.fillText('"Has the story of Moses reached you?"',CW/2,38);c.textAlign='left';
  }
}

// =============================================
//  SCENE 4 — PHARAOH'S DEFIANCE (79:20-26)
// =============================================
class Scene4 extends BaseScene {
  constructor() { super('canvas-4'); this.clickZones=[{x:0,y:0,w:CW,h:CH,key:'pharaoh_denial'}]; }
  draw() {
    const c = this.ctx, t = this.t;
    const sky=c.createLinearGradient(0,0,0,CH);
    sky.addColorStop(0,'#1a0808');sky.addColorStop(0.5,'#2a1008');sky.addColorStop(1,'#3a1e08');
    c.fillStyle=sky;c.fillRect(0,0,CW,CH);
    fillRect(c,0,185,CW,35,'#3a2808');fillRect(c,0,185,CW,4,'#6a5020');
    c.strokeStyle='#5a4010';c.lineWidth=1;
    for(let px=0;px<CW;px+=40){c.beginPath();c.moveTo(px,185);c.lineTo(px,220);c.stroke();}
    for(const px of[40,200,360,520]){
      fillRect(c,px,60,20,128,'#6a5020');fillRect(c,px-4,55,28,12,'#8a7030');fillRect(c,px-4,176,28,10,'#8a7030');
      c.strokeStyle='#4a3808';c.lineWidth=1;c.beginPath();c.moveTo(px+10,67);c.lineTo(px+10,175);c.stroke();
    }
    fillRect(c,380,110,80,75,'#6a5018');fillRect(c,370,90,100,24,'#8a7028');
    this._pixelFigure(c,410,90,'#c83020','#f5c890');
    fillRect(c,410,78,P*3,P*3,'#e8b818');fillRect(c,412,74,P*2,P*2,'#ffd830');
    fillRect(c,422,100,P*3,P,'#c83020');fillRect(c,434,96,P,P*2,'#c83020');
    c.fillStyle='#ffd080';c.fillRect(355,55,120,28);c.fillRect(425,83,10,10);
    c.fillStyle='#3a0808';c.font='bold 8px monospace';c.fillText('I AM YOUR',360,68);c.fillText('LORD!',384,80);

    this._pixelFigure(c,120,125,'#3a5828','#e8c890');
    const sg=0.7+0.3*Math.sin(t*0.07);
    c.shadowBlur=14;c.shadowColor=`rgba(255,220,80,${sg})`;
    fillRect(c,130,108,P/2+1,P*10,'#70a030');c.shadowBlur=0;
    fillRect(c,133,136,P*2,P,'#e8c890');
    const sp=0.5+0.4*Math.sin(t*0.06);
    c.fillStyle=`rgba(255,255,200,${sp})`;c.font='20px serif';c.textAlign='center';c.fillText('✨',155,122);
    const wa=0.3+0.3*Math.sin(t*0.04);
    fillRect(c,0,200,CW,20,`rgba(20,60,180,${wa})`);
    c.fillStyle='rgba(255,120,40,0.9)';c.font='7px monospace';c.textAlign='center';
    c.fillText("PHARAOH'S DEFIANCE — 79:20-26",CW/2,18);c.textAlign='left';
  }
}

// =============================================
//  SCENE 5 — SIGNS OF CREATION (79:27-33)
// =============================================
class Scene5 extends BaseScene {
  constructor() { super('canvas-5'); this.clickZones=[{x:0,y:0,w:CW,h:CH,key:'creation_signs'}]; }
  draw() {
    const c = this.ctx, t = this.t, p = sceneP();
    const sky=c.createLinearGradient(0,0,0,CH*0.55);
    sky.addColorStop(0,p.sky0);sky.addColorStop(0.5,p.sky1);sky.addColorStop(1,p.sky2);
    c.fillStyle=sky;c.fillRect(0,0,CW,CH*0.55);
    const seed=n=>((n*2654435769)>>>0)/4294967296;
    for(let i=0;i<45;i++) this._star(c,seed(i*7)*CW,seed(i*13)*80,0.8+seed(i*3),0.3+0.5*Math.abs(Math.sin(t*0.025+i)));
    const hg=0.35+0.2*Math.sin(t*0.03);
    c.strokeStyle=`rgba(180,240,255,${hg})`;c.lineWidth=1;
    for(let i=1;i<=4;i++){c.beginPath();c.arc(CW/2,-20,60+i*30,0,Math.PI);c.stroke();}
    c.fillStyle='rgba(180,240,255,0.7)';c.font='6px monospace';c.textAlign='center';
    c.fillText('SEVEN STRONG HEAVENS — built & proportioned',CW/2,22);
    const sp=0.8+0.2*Math.sin(t*0.04);
    c.fillStyle=`rgba(255,220,80,${sp})`;c.beginPath();c.arc(80,52,22,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(255,240,120,0.4)';c.beginPath();c.arc(80,52,34,0,Math.PI*2);c.fill();
    c.fillStyle='#cce0ff';c.beginPath();c.arc(480,48,18,0,Math.PI*2);c.fill();
    c.fillStyle='#020c18';c.beginPath();c.arc(490,44,16,0,Math.PI*2);c.fill();
    c.fillStyle='#ffe080';c.font='7px monospace';c.textAlign='left';c.fillText('Day (duha)',55,86);
    c.fillStyle='#a8c8ff';c.textAlign='right';c.fillText('Night (layl)',CW-40,78);
    fillRect(c,0,118,CW,62,p.gnd);
    c.fillStyle='#1e2e0e';
    [[0,60,120],[100,180,260],[240,300,360],[350,440,530],[480,540,CW]].forEach(([a,b,cc])=>{
      c.beginPath();c.moveTo(a,118);c.lineTo(b,72+Math.random()*18|0);c.lineTo(cc,118);c.closePath();c.fill();
    });
    fillRect(c,0,160,CW,60,'#183a10');fillRect(c,0,160,CW,4,'#2a5a18');
    const ws=t*0.5;
    c.fillStyle='#1840a0';c.fillRect(0,178,CW,14);
    c.fillStyle='rgba(60,120,220,0.6)';
    for(let wx=(ws%40)-40;wx<CW;wx+=40){c.beginPath();c.arc(wx+20,185,15,0,Math.PI);c.fill();}
    c.fillStyle='#2a6820';
    for(let px=10;px<CW-10;px+=28){
      const ph=12+Math.sin(px*0.1)*4+Math.sin(t*0.03+px*0.05)*2;
      c.beginPath();c.arc(px,162,ph*0.5,0,Math.PI*2);c.fill();
    }
    c.fillStyle=p.acStr+'0.85)';c.font='6px monospace';c.textAlign='center';
    c.fillText('CREATION SIGNS — 79:27-33',CW/2,CH-6);c.textAlign='left';
  }
}

// =============================================
//  SCENE 6 — AT-TAMMAH (79:34-41)
// =============================================
class Scene6 extends BaseScene {
  constructor() { super('canvas-6'); this.clickZones=[{x:0,y:0,w:CW,h:CH,key:'at_tammah'}]; }
  draw() {
    const c = this.ctx, t = this.t;
    c.fillStyle='#200404';c.fillRect(0,0,CW/2,CH);
    c.fillStyle='#041408';c.fillRect(CW/2,0,CW/2,CH);
    for(let i=0;i<8;i++){
      const fx=15+i*28,fbase=185,fh=30+Math.sin(t*0.1+i*0.7)*18;
      fillRect(c,fx,fbase-fh,18,fh+5,i%2===0?'#e84010':'#ff6820');
      fillRect(c,fx+5,fbase-fh-14,8,14,'#ffaa20');
    }
    const fg=c.createRadialGradient(125,150,0,125,150,120);
    fg.addColorStop(0,'rgba(255,80,20,0.25)');fg.addColorStop(1,'rgba(255,80,20,0)');
    c.fillStyle=fg;c.fillRect(0,0,CW/2,CH);
    c.fillStyle='#ff8040';c.font='7px monospace';c.textAlign='center';
    c.fillText('AL-JAHEEM',125,26);c.fillText('Hellfire',125,40);
    this._pixelFigure(c,80,130,'#803030','#f5c890');
    c.fillStyle='rgba(255,60,20,0.5)';c.font='10px serif';c.textAlign='center';c.fillText('⬇',89,125);

    c.fillStyle='#1a4818';c.fillRect(CW/2,0,CW/2,CH);
    c.fillStyle='#2a6820';c.beginPath();c.arc(380,120,28,0,Math.PI*2);c.fill();
    c.fillStyle='#3a8030';c.beginPath();c.arc(380,110,22,0,Math.PI*2);c.fill();
    fillRect(c,376,146,8,30,'#4a2808');
    c.fillStyle='#2a6820';c.beginPath();c.arc(480,125,24,0,Math.PI*2);c.fill();
    c.fillStyle='#3a8030';c.beginPath();c.arc(480,116,18,0,Math.PI*2);c.fill();
    fillRect(c,476,145,8,30,'#4a2808');
    const fp=0.7+0.3*Math.sin(t*0.05);
    c.fillStyle=`rgba(220,60,40,${fp})`;
    [[370,112],[388,118],[472,118]].forEach(([fx,fy])=>{c.beginPath();c.arc(fx,fy,4,0,Math.PI*2);c.fill();});
    c.fillStyle='#1848c0';c.fillRect(310,175,250,12);
    c.fillStyle='rgba(80,160,255,0.5)';
    for(let wx=310-30+(t*0.4)%30;wx<560;wx+=30){c.beginPath();c.arc(wx+15,181,10,0,Math.PI);c.fill();}
    c.fillStyle='#a8e8a0';c.font='7px monospace';c.textAlign='center';
    c.fillText('AL-JANNAH',435,26);c.fillText('Paradise',435,40);
    this._pixelFigure(c,430,130,'#3a6838','#f5d0a0');
    c.fillStyle='rgba(80,255,120,0.7)';c.font='10px serif';c.textAlign='center';c.fillText('⬆',439,125);

    c.fillStyle='#101010';c.fillRect(CW/2-30,0,60,CH);
    c.strokeStyle='#ffbb44';c.lineWidth=2;c.setLineDash([6,4]);
    c.beginPath();c.moveTo(CW/2,0);c.lineTo(CW/2,CH);c.stroke();c.setLineDash([]);
    const tg=0.8+0.2*Math.sin(t*0.05);
    c.fillStyle=`rgba(255,187,68,${tg})`;c.font='6px "Press Start 2P",monospace';c.textAlign='center';
    c.fillText('AT-TAMMAH',CW/2,55);c.font='6px monospace';
    c.fillText('THE',CW/2,70);c.fillText('OVERWHELMING',CW/2,84);
    c.fillStyle='rgba(255,120,40,0.8)';c.font='6px monospace';c.textAlign='center';
    c.fillText('Transgressed +',125,170);c.fillText('Preferred Dunya',125,182);
    c.fillStyle='rgba(100,240,120,0.8)';
    c.fillText('Feared Lord +',435,170);c.fillText('Restrained Nafs',435,182);c.textAlign='left';
  }
}

// =============================================
//  SCENE 7 — THE FINAL HOUR (79:42-46)
// =============================================
class Scene7 extends BaseScene {
  constructor() { super('canvas-7'); this.clickZones=[{x:0,y:0,w:CW,h:CH,key:'the_hour'}]; }
  draw() {
    const c = this.ctx, t = this.t, p = sceneP();
    c.fillStyle=p.sky0;c.fillRect(0,0,CW,CH);
    const seed=n=>((n*2654435769)>>>0)/4294967296;
    for(let i=0;i<70;i++) this._star(c,seed(i*7)*CW,seed(i*11)*CH*0.75,0.8+seed(i*3)*1.5,0.3+0.6*Math.abs(Math.sin(t*0.02+i*0.4)));
    fillRect(c,0,188,CW,32,p.gnd);fillRect(c,0,188,CW,3,p.gndAcc);
    const qg=0.7+0.3*Math.sin(t*0.04);
    c.save();c.shadowBlur=30+10*Math.sin(t*0.04);c.shadowColor=`rgba(255,187,68,${qg})`;
    c.fillStyle=`rgba(255,187,68,${0.6+0.3*qg})`;c.font='bold 72px serif';c.textAlign='center';
    c.fillText('?',CW/2,110);c.restore();
    c.fillStyle=p.acStr+'0.8)';c.font='8px "Press Start 2P",monospace';c.textAlign='center';
    c.fillText('WHEN IS THE HOUR?',CW/2,22);c.font='7px monospace';
    c.fillText('"Ayyan mursaha?" — only Allah knows',CW/2,38);
    this._pixelFigure(c,90,130,'#3a5060','#e8c890');
    fillRect(c,103,140,P*3,P,'#e8c890');
    const wg=0.5+0.4*Math.sin(t*0.06);
    c.shadowBlur=8;c.shadowColor=`rgba(255,220,80,${wg})`;
    fillRect(c,115,140,P*2,P,'#ffee80');c.shadowBlur=0;
    c.fillStyle='rgba(255,220,80,0.8)';c.font='6px monospace';c.textAlign='center';
    c.fillText('The Warner',100,125);c.fillText('(Al-Mundhir)',100,136);
    fillRect(c,430,95,30,40,'rgba(180,160,80,0.4)');
    fillRect(c,427,95,36,6,'#a09040');fillRect(c,427,130,36,6,'#a09040');
    const sy=105+(t%24);
    c.fillStyle='rgba(255,220,100,0.6)';c.fillRect(443,sy,4,18);
    c.fillStyle='rgba(255,220,100,0.3)';c.fillRect(430,104,30,sy-104);
    c.fillStyle=p.acStr+'0.7)';c.font='6px monospace';c.textAlign='center';c.fillText('TIME',445,152);
    c.fillStyle='rgba(160,240,180,0.85)';c.font='7px monospace';c.textAlign='center';
    c.fillText('"To your Lord alone is its limit"',CW/2,165);
    c.fillText('"As if they lived only one afternoon"',CW/2,180);c.textAlign='left';
  }
}

// =============================================
//  SCENE MANAGER
// =============================================
const _scenes = {};
function initScenes() {
  [Scene1,Scene2,Scene3,Scene4,Scene5,Scene6,Scene7].forEach((cls,i) => { _scenes[i+1] = new cls(); });
}
function startScene(n)   { stopAllScenes(); if (_scenes[n]) _scenes[n].start(); }
function stopAllScenes() { Object.values(_scenes).forEach(s => s && s.stop && s.stop()); }
