'use strict';
// =============================================
//  SURAH ABASA (80) — scenes.js
//  He Frowned · earth / amber / harvest gold
// =============================================


window.SCENE_PALETTE = {
  minecraft: {
    sky0: '#0e0402', sky1: '#1a0a04', sky2: '#261206',
    gnd:  '#3a1c08', gndAcc: '#4a2810',
    starStr: 'rgba(255,220,150,',
    acStr:   'rgba(232,160,48,',
    label:   '#e8a030',
    hint:    '#c07818',
  },
  stars: {
    sky0: '#2e2460', sky1: '#3c3078', sky2: '#4a3c90',
    gnd:  '#5a4898', gndAcc: '#6a58a8',
    starStr: 'rgba(200,185,255,',
    acStr:   'rgba(244,200,64,',
    label:   '#f4c840',
    hint:    '#d4a820',
  },
};
// =============================================
//  VERSES
// =============================================
const VERSES = {
  frowned: {
    ref: 'Abasa 80:1-4',
    arabic: 'عَبَسَ وَتَوَلَّىٰ ۩ أَن جَاءَهُ الْأَعْمَىٰ ۩ وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ ۩ أَوْ يَذَّكَّرُ فَتَنفَعَهُ الذِّكْرَىٰ',
    english: '"He frowned and turned away — because the blind man came to him. But what would make you know? Perhaps he might be purified — or be reminded and the reminder benefit him."',
    note: 'These first verses are Allah gently rebuking the Prophet ﷺ. Not a harsh criticism — but a divine lesson: the sincere seeker matters more than the indifferent powerful. Abdullah ibn Umm Maktum came eager to learn. The Quraysh leaders sat there but their hearts were sealed. Who deserves more of your time?',
  },
  nobles: {
    ref: 'Abasa 80:5-10',
    arabic: 'أَمَّا مَنِ اسْتَغْنَىٰ ۩ فَأَنتَ لَهُ تَصَدَّىٰ ۩ وَمَا عَلَيْكَ أَلَّا يَزَّكَّىٰ ۩ وَأَمَّا مَن جَاءَكَ يَسْعَىٰ ۩ وَهُوَ يَخْشَىٰ ۩ فَأَنتَ عَنْهُ تَلَهَّىٰ',
    english: '"As for he who considers himself free from need — to him you give attention. But not upon you is any blame if he does not purify himself. And as for he who came to you striving eagerly — while he fears Allah — from him you are distracted."',
    note: 'Allah is teaching the Prophet ﷺ (and us) about priorities. The rich man who ignores you? You are not responsible if he does not seek purification. But the one who comes eagerly, humbly, fearing Allah — he is the one who deserves your full attention. This is the Islamic principle of prioritizing the willing heart.',
  },
  quran: {
    ref: 'Abasa 80:11-16',
    arabic: 'كَلَّا إِنَّهَا تَذْكِرَةٌ ۩ فَمَن شَاءَ ذَكَرَهُ ۩ فِي صُحُفٍ مُّكَرَّمَةٍ ۩ مَّرْفُوعَةٍ مُّطَهَّرَةٍ ۩ بِأَيْدِي سَفَرَةٍ ۩ كِرَامٍ بَرَرَةٍ',
    english: '"No! Indeed these verses are a reminder. So whoever wills may remember it. In honoured sheets — exalted and purified — in the hands of messenger-angels, noble and virtuous."',
    note: '"Kalla" — No! Stop! A divine correction. The Quran is too precious to be wasted on those who are not interested. It is carried by honoured, noble, pure angels. It is written on exalted sheets. Whoever wants to benefit from it CAN — the door is open. But it will not be forced on anyone.',
  },
  creation: {
    ref: 'Abasa 80:17-23',
    arabic: 'قُتِلَ الْإِنسَانُ مَا أَكْفَرَهُ ۩ مِنْ أَيِّ شَيْءٍ خَلَقَهُ ۩ مِن نُّطْفَةٍ خَلَقَهُ فَقَدَّرَهُ ۩ ثُمَّ السَّبِيلَ يَسَّرَهُ ۩ ثُمَّ أَمَاتَهُ فَأَقْبَرَهُ ۩ ثُمَّ إِذَا شَاءَ أَنشَرَهُ',
    english: '"Destroyed is man — how ungrateful he is! From what thing did He create him? From a drop of liquid He created him and proportioned him. Then He made the path easy for him. Then He causes him to die and provides a grave. Then when He wills He will resurrect him."',
    note: '"Qutila al-insaan — ma akfarahu!" — Destroyed is man, how ungrateful! Created from a tiny drop, given a perfectly functioning body, guided with a path, given a lifespan — then denied and turned away. Allah lists His gifts one by one to highlight the stunning ingratitude.',
  },
  food: {
    ref: 'Abasa 80:24-32',
    arabic: 'فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ ۩ أَنَّا صَبَبْنَا الْمَاءَ صَبًّا ۩ ثُمَّ شَقَقْنَا الْأَرْضَ شَقًّا ۩ فَأَنبَتْنَا فِيهَا حَبًّا ۩ وَعِنَبًا وَقَضْبًا ۩ وَزَيْتُونًا وَنَخْلًا',
    english: '"Let man look at his food: We pour water abundantly, then split the earth in splits, and cause grain to grow, and grapes and greens, and olive and palm trees."',
    note: 'A beautiful command: "Fal-yandhur al-insan ila ta\'amihi" — Let man LOOK at his food. Before eating, contemplate. The water poured from the sky. The earth splitting open. Seven specific foods are mentioned: grain, grapes, greens, olives, palms, dense gardens, and fruit — all for you and your animals. Every meal is a miracle of provision.',
  },
  blast: {
    ref: 'Abasa 80:33-37',
    arabic: 'فَإِذَا جَاءَتِ الصَّاخَّةُ ۩ يَوْمَ يَفِرُّ الْمَرْءُ مِنْ أَخِيهِ ۩ وَأُمِّهِ وَأَبِيهِ ۩ وَصَاحِبَتِهِ وَبَنِيهِ ۩ لِكُلِّ امْرِئٍ مِّنْهُمْ يَوْمَئِذٍ شَأْنٌ يُغْنِيهِ',
    english: '"Then when the Deafening Blast comes — the day a man will flee from his brother, and his mother and his father, and his wife and his children — for each person among them that Day will be a matter to occupy him."',
    note: '"Al-Sakhkhah" — The Deafening Blast. The word itself suggests a noise so overwhelming it deafens. On that Day, the strongest human bonds — brother, mother, father, wife, children — all break. Not because they don\'t love each other. But because each person is completely consumed by their own account. "Li kulli imri\'in minhum yawma\'idhin sha\'nun yughniyhi" — every soul has enough to worry about.',
  },
  faces: {
    ref: 'Abasa 80:38-42',
    arabic: 'وُجُوهٌ يَوْمَئِذٍ مُّسْفِرَةٌ ۩ ضَاحِكَةٌ مُّسْتَبْشِرَةٌ ۩ وَوُجُوهٌ يَوْمَئِذٍ عَلَيْهَا غَبَرَةٌ ۩ تَرْهَقُهَا قَتَرَةٌ ۩ أُولَٰئِكَ هُمُ الْكَفَرَةُ الْفَجَرَةُ',
    english: '"[Some] faces that Day will be bright — laughing, rejoicing! And [other] faces that Day will have dust upon them — covered in darkness. Those are the disbelievers, the sinners."',
    note: '"Wujuhun yawma\'idhin musfirah" — Faces glowing with light, laughing, full of joy. These are the believers who pleased their Lord. Then "wujuhun alayhā ghabarah tarhaqu-ha qatarah" — faces covered in dust and darkness. The contrast is total. Which face do you want on that Day? Your choices today determine which group you\'re in.',
  },
};

// =============================================
//  SCENE 1 — He Frowned (80:1-10)
// =============================================
class Scene1 extends BaseScene {
  constructor() { super('canvas-2'); }
  start() {
    if (!this.ctx) return;
    const c = this.canvas;
    c.onclick = () => {
      const x = arguments[0]?.offsetX || 0;
      showVersePopup(x < CW/2 ? VERSES.frowned : VERSES.nobles);
    };
    c.onclick = e => showVersePopup(e.offsetX < CW/2 ? VERSES.frowned : VERSES.nobles);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      this._sky(ctx); this._stars(ctx); this._ground(ctx, 168);
      this._label(ctx, 'CLICK LEFT: The Blind Man   RIGHT: The Nobles');
      // Dividing line
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
      ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(CW/2,0); ctx.lineTo(CW/2,CH); ctx.stroke(); ctx.setLineDash([]);
      // LEFT: blind man approaching
      const bx = 80 + Math.round(Math.sin(this.t*0.02)*3);
      this._blindMan(ctx, bx, 108);
      // Walking stick
      ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(bx+P*3, 168); ctx.lineTo(bx+P*6, 128); ctx.stroke();
      // Label
      ctx.fillStyle = '#a8e8a8'; ctx.font = '6px "Press Start 2P",monospace';
      ctx.fillText('Abdullah ibn', 55, 200); ctx.fillText("Umm Maktum", 55, 210);
      // RIGHT: two nobles standing proud
      this._figure(ctx, 320, 100, '#c8a878', '#4a2a60', '#2a1840');
      this._figure(ctx, 400, 95,  '#d4b890', '#3a3a70', '#1a1a50');
      ctx.fillStyle = p.acStr + '0.9)'; ctx.font = '6px "Press Start 2P",monospace';
      ctx.fillText('Quraysh Leaders', 310, 200);
      // Prophet silhouette (centre-left, slight lean away)
      this._figure(ctx, 190, 98, '#c8a070', '#2a5a38', '#1a3a28');
      ctx.fillStyle = p.label; ctx.font = '6px "Press Start 2P",monospace';
      ctx.fillText('← approached', 95, 98);
    };
    draw();
  }
}

// =============================================
//  SCENE 2 — A Reminder / Noble Quran (80:11-16)
// =============================================
class Scene2 extends BaseScene {
  constructor() { super('canvas-3'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VERSES.quran);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      this._sky(ctx); this._stars(ctx);
      this._label(ctx, 'CLICK: The Noble Quran in Honoured Sheets');
      // Glowing scroll/pages floating
      const pulse = 0.7 + Math.sin(this.t * 0.04) * 0.3;
      [[160,60],[280,40],[400,65]].forEach(([sx,sy], i) => {
        const off = Math.sin(this.t * 0.03 + i * 1.2) * 8;
        ctx.shadowColor = p.acStr + '0.8)'; ctx.shadowBlur = 16 * pulse;
        fillRect(ctx, sx-14, sy+off-10, 28, 36, p.gndAcc || '#3a1c0c');
        fillRect(ctx, sx-10, sy+off-6,  20, 28, '#fff8f0');
        ctx.fillStyle = '#c07818'; ctx.font = '5px "Press Start 2P",monospace';
        ctx.textAlign = 'center'; ctx.fillText('بسم الله', sx, sy+off+8); ctx.textAlign = 'left';
        ctx.shadowBlur = 0;
        for (let l=0;l<4;l++) { fillRect(ctx, sx-8, sy+off+10+l*5, 16, 2, 'rgba(100,60,20,0.4)'); }
      });
      // Angels carrying scrolls (simple winged figures)
      [[160,55],[400,60]].forEach(([ax,ay]) => {
        const off = Math.sin(this.t*0.03+ax)*5;
        // Wings
        ctx.fillStyle = 'rgba(200,220,255,0.6)';
        ctx.beginPath(); ctx.ellipse(ax-18, ay+off, 14, 8, -0.4, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(ax+18, ay+off, 14, 8, 0.4, 0, Math.PI*2); ctx.fill();
        // Body
        fillRect(ctx, ax-4, ay+off-2, 8, 14, '#f0eee8');
        fillRect(ctx, ax-2, ay+off-8, 6, 6,  '#e8c39a');
        ctx.fillStyle = '#ffd700'; ctx.font = '8px sans-serif';
        ctx.textAlign = 'center'; ctx.fillText('●', ax, ay+off-11); ctx.textAlign = 'left';
      });
      this._label(ctx, '"In honoured sheets — in the hands of noble angels" (80:13-16)', CH-18);
    };
    draw();
  }
}

// =============================================
//  SCENE 3 — Created from Earth (80:17-23)
// =============================================
class Scene3 extends BaseScene {
  constructor() { super('canvas-4'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VERSES.creation);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      this._sky(ctx); this._stars(ctx);
      this._label(ctx, 'CLICK: The Stages of Human Creation');
      const stages = ['💧 Drop', '🧬 Form', '🚶 Life', '⚰️ Death', '✨ Rise'];
      stages.forEach((s,i) => {
        const bx = 60 + i*100, progress = Math.min(1, (this.t - i*40) / 60);
        if (progress <= 0) return;
        // Background box
        ctx.globalAlpha = Math.min(1, progress*1.5);
        fillRect(ctx, bx-30, 70, 60, 80, p.sky2 || '#261206');
        ctx.strokeStyle = i < 3 ? p.acStr+'0.8)' : (i===3?'#666':'rgba(200,200,255,0.8)');
        ctx.lineWidth = 2; ctx.strokeRect(bx-30, 70, 60, 80);
        ctx.fillStyle = p.label; ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(s.split(' ')[0], bx, 115);
        ctx.font = '5px "Press Start 2P",monospace';
        ctx.fillStyle = p.hint || p.label; ctx.fillText(s.split(' ')[1], bx, 138);
        ctx.textAlign = 'left'; ctx.globalAlpha = 1;
        // Arrow between stages
        if (i < 4) {
          ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px sans-serif';
          ctx.textAlign = 'center'; ctx.fillText('→', bx+45, 115); ctx.textAlign = 'left';
        }
      });
      ctx.fillStyle = p.acStr+'0.8)'; ctx.font = '6px "Press Start 2P",monospace';
      ctx.textAlign = 'center'; ctx.fillText('"From what thing did He create him?" (80:18)', CW/2, CH-15); ctx.textAlign = 'left';
    };
    draw();
  }
}

// =============================================
//  SCENE 4 — Look at Your Food (80:24-32)
// =============================================
class Scene4 extends BaseScene {
  constructor() { super('canvas-5'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VERSES.food);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      // Sky gradient with warm colours
      const g = ctx.createLinearGradient(0,0,0,CH);
      g.addColorStop(0,'#1a0c04'); g.addColorStop(0.5,'#2a1a08'); g.addColorStop(1,'#1a2808');
      ctx.fillStyle = g; ctx.fillRect(0,0,CW,CH);
      if (document.documentElement.dataset.theme==='stars') {
        ctx.fillStyle = p.sky0; ctx.fillRect(0,0,CW,CH);
      }
      this._ground(ctx, 160);
      this._label(ctx, 'CLICK: "Let man look at his food" (80:24)');
      // Rain drops from sky
      for (let r=0; r<8; r++) {
        const rx = 40 + r*70, ry = ((this.t*2 + r*40) % 160);
        ctx.fillStyle = 'rgba(100,160,240,0.7)';
        fillRect(ctx, rx, ry, 3, 8, 'rgba(100,160,240,0.7)');
      }
      // Ground crack
      ctx.strokeStyle = '#8a6a2a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(240,160); ctx.lineTo(230,175); ctx.lineTo(248,185); ctx.lineTo(235,200); ctx.stroke();
      // Plants growing
      const plants = [
        { x:80,  color:'#3a8040', label:'حَبًّا\nGrain',  emoji:'🌾' },
        { x:180, color:'#6a3a8a', label:'عِنَبًا\nGrapes', emoji:'🍇' },
        { x:290, color:'#5a9030', label:'زَيْتُون\nOlive',  emoji:'🫒' },
        { x:390, color:'#8a5020', label:'نَخْلًا\nPalm',   emoji:'🌴' },
        { x:480, color:'#2a8a50', label:'قَضْبًا\nGreens', emoji:'🥬' },
      ];
      plants.forEach(pl => {
        const grow = Math.min(1, (this.t * 0.005));
        const h = Math.round(40 * grow);
        fillRect(ctx, pl.x-2, 160-h, 4, h, pl.color);
        ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(pl.emoji, pl.x, 160-h-4);
        ctx.fillStyle = p.label; ctx.font = '5px "Press Start 2P",monospace';
        ctx.fillText(pl.label.split('\n')[0], pl.x, 185);
        ctx.fillStyle = p.hint || p.label;
        ctx.fillText(pl.label.split('\n')[1], pl.x, 195);
        ctx.textAlign = 'left';
      });
    };
    draw();
  }
}

// =============================================
//  SCENE 5 — The Deafening Blast (80:33-37)
// =============================================
class Scene5 extends BaseScene {
  constructor() { super('canvas-6'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VERSES.blast);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx, p = sceneP();
      this._sky(ctx);
      this._label(ctx, 'CLICK: "When the Deafening Blast comes..." (80:33)');
      // Sky cracks with light
      const crackPulse = 0.6 + Math.sin(this.t * 0.05) * 0.4;
      ctx.strokeStyle = `rgba(255,230,100,${crackPulse})`; ctx.lineWidth = 2;
      [[140,0,110,60],[280,0,240,80],[380,0,420,55],[80,30,50,90],[490,10,510,75]].forEach(([x1,y1,x2,y2])=>{
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      });
      this._ground(ctx, 170);
      // Fleeing figures
      const flee = [
        { x: 60 + (this.t * 0.3) % 100, y: 130, col:'#4a2a60' },
        { x: 200 + (this.t * 0.4) % 80,  y: 125, col:'#2a3a5a' },
        { x: 320 - (this.t * 0.25) % 80, y: 135, col:'#5a3a20' },
        { x: 440 + (this.t * 0.35) % 60, y: 128, col:'#2a5a2a' },
      ];
      flee.forEach(f => {
        this._figure(ctx, f.x % (CW-80) + 20, f.y, '#e8c39a', f.col, '#1a1a3a');
      });
      ctx.fillStyle = p.acStr+'0.9)'; ctx.font = '6px "Press Start 2P",monospace';
      ctx.textAlign = 'center'; ctx.fillText('"Each person consumed by their own account" (80:37)', CW/2, CH-15); ctx.textAlign = 'left';
    };
    draw();
  }
}

// =============================================
//  SCENE 6 — Two Faces: Bright and Dusty (80:38-42)
// =============================================
class Scene6 extends BaseScene {
  constructor() { super('canvas-7'); }
  start() {
    if (!this.ctx) return;
    this.canvas.onclick = () => showVersePopup(VERSES.faces);
    const draw = () => {
      this.t++; this.raf = requestAnimationFrame(draw);
      const ctx = this.ctx;
      // Split background
      ctx.fillStyle = '#0e0a28'; ctx.fillRect(0,0,CW/2,CH);
      ctx.fillStyle = '#1a0c04'; ctx.fillRect(CW/2,0,CW/2,CH);
      // Divider
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
      ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(CW/2,0); ctx.lineTo(CW/2,CH); ctx.stroke(); ctx.setLineDash([]);
      // LEFT: Bright glowing face
      const glow = 0.6 + Math.sin(this.t*0.05)*0.4;
      ctx.shadowColor = `rgba(255,220,100,${glow})`; ctx.shadowBlur = 20;
      // Bright figure
      this._figure(ctx, 130, 90, '#ffe8a0', '#4a6a20', '#2a4010');
      ctx.shadowBlur = 0;
      // Face glow circle
      ctx.fillStyle = `rgba(255,230,80,${0.15+Math.sin(this.t*0.06)*0.1})`;
      ctx.beginPath(); ctx.arc(145, 103, 28, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#ffd700'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
      ctx.fillText('مُسْفِرَةٌ', 145, 185); ctx.font = '6px "Press Start 2P",monospace';
      ctx.fillText('BRIGHT · LAUGHING', 145, 197); ctx.fillText('REJOICING', 145, 207);
      // RIGHT: Dusty dark face
      this._figure(ctx, 360, 95, '#907060', '#2a2030', '#181428');
      // Dust overlay
      for (let d=0; d<12; d++) {
        const dx = 330 + (d*23+this.t)%120, dy = 90 + (d*17+this.t/2)%70;
        ctx.fillStyle = `rgba(150,120,80,${0.15+d*0.02})`;
        ctx.beginPath(); ctx.arc(dx, dy, 3, 0, Math.PI*2); ctx.fill();
      }
      ctx.fillStyle = '#888'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
      ctx.fillText('غَبَرَةٌ', 370, 185); ctx.font = '6px "Press Start 2P",monospace';
      ctx.fillText('DUSTY · DARK', 370, 197); ctx.fillText('COVERED', 370, 207);
      ctx.textAlign = 'left';
    };
    draw();
  }
}

// =============================================
//  ENGINE
// =============================================
const scenes = {};


const VD_wbw={ref:'Abasa (80)',arabic:'عَبَسَ وَتَوَلَّىٰ ۩ أَن جَاءَهُ الْأَعْمَىٰ ۩ وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ',english:'"He frowned and turned away because there came to him the blind man. But what would make you perceive that perhaps he might be purified?" (80:1-3)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'👤',label:'HE FROWNED',verse:VD_wbw});

function initScenes() {
  scenes[1]=_s1wbw;
  scenes[2] = new Scene1(); scenes[3] = new Scene2(); scenes[4] = new Scene3();
  scenes[5] = new Scene4(); scenes[6] = new Scene5(); scenes[7] = new Scene6();
}
function startScene(n) {
   if (scenes[n]) scenes[n].start(); }
function stopAllScenes() {
  Object.values(scenes).forEach(s => s.stop()); }
