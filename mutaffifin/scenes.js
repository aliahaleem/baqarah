'use strict';
window.SCENE_PALETTE = {

  labelText:'#c88030', labelBg:'#140408', labelBar:'#6a1828',  minecraft: {sky0:'#140408',sky1:'#200810',sky2:'#2c0e18',gnd:'#38121e',gndAcc:'#481828',starStr:'rgba(200,150,130,',acStr:'rgba(200,128,48,',label:'#c88030',hint:'#a06020'},
  stars: {sky0:'#3a1a28',sky1:'#4a2238',sky2:'#5c2e48',gnd:'#6a3858',gndAcc:'#7a4868',starStr:'rgba(255,200,220,',acStr:'rgba(240,184,96,',label:'#f0b860',hint:'#d09040'},
};

// SURAH AL-MUTAFFIFIN (83) — scenes.js

const VD = {
  woe: {
    ref: 'Al-Mutaffifin 83:1-6',
    arabic: 'وَيْلٌ لِّلْمُطَفِّفِينَ ۩ الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ ۩ وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ ۩ أَلَا يَظُنُّ أُولَٰئِكَ أَنَّهُم مَّبْعُوثُونَ ۩ لِيَوْمٍ عَظِيمٍ ۩ يَوْمَ يَقُومُ النَّاسُ لِرَبِّ الْعَالَمِينَ',
    english: '"Woe to those who defraud — who demand full measure when receiving from others, but give less when they measure or weigh for them. Do they not think they will be resurrected for a tremendous Day — the Day mankind will stand before the Lord of the worlds?" (83:1-6)',
    note: 'The surah opens with "Waylun" — woe and destruction. The defrauders (mutaffifin) cheat in weights and measures. Allah links this dishonesty to disbelief in resurrection — if you truly believed in standing before Allah, you would never cheat.',
  },
  sijjin: {
    ref: 'Al-Mutaffifin 83:7-17',
    arabic: 'كَلَّا إِنَّ كِتَابَ الْفُجَّارِ لَفِي سِجِّينٍ ۩ وَمَا أَدْرَاكَ مَا سِجِّينٌ ۩ كِتَابٌ مَّرْقُومٌ ۩ وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ ۩ الَّذِينَ يُكَذِّبُونَ بِيَوْمِ الدِّينِ ۩ وَمَا يُكَذِّبُ بِهِ إِلَّا كُلُّ مُعْتَدٍ أَثِيمٍ ۩ إِذَا تُتْلَىٰ عَلَيْهِ آيَاتُنَا قَالَ أَسَاطِيرُ الْأَوَّلِينَ ۩ كَلَّا ۖ بَلْ ۜ رَانَ عَلَىٰ قُلُوبِهِم مَّا كَانُوا يَكْسِبُونَ ۩ كَلَّا إِنَّهُمْ عَن رَّبِّهِمْ يَوْمَئِذٍ لَّمَحْجُوبُونَ ۩ ثُمَّ إِنَّهُمْ لَصَالُو الْجَحِيمِ ۩ ثُمَّ يُقَالُ هَٰذَا الَّذِي كُنتُم بِهِ تُكَذِّبُونَ',
    english: '"No! The record of the wicked is in Sijjin. What will make you know what Sijjin is? A clearly inscribed record. Woe that Day to the deniers — who deny the Day of Recompense. None denies it except every sinful transgressor. When Our verses are recited to him, he says: Legends of the former peoples! No! Rather, what they earned has covered their hearts. No! They will be veiled from their Lord that Day. Then they will burn in Hellfire. Then it will be said: This is what you used to deny." (83:7-17)',
    note: 'Sijjin — from "sijn" (prison). The record of every wicked deed is filed in the lowest, most degraded place. "Rana" (rust/covering on the heart) — sins accumulate layer by layer until the heart is sealed. The worst punishment: being veiled from seeing Allah on that Day.',
  },
  illiyyin: {
    ref: 'Al-Mutaffifin 83:18-21',
    arabic: 'كَلَّا إِنَّ كِتَابَ الْأَبْرَارِ لَفِي عِلِّيِّينَ ۩ وَمَا أَدْرَاكَ مَا عِلِّيُّونَ ۩ كِتَابٌ مَّرْقُومٌ ۩ يَشْهَدُهُ الْمُقَرَّبُونَ',
    english: '"No! The record of the righteous is in Illiyyin. What will make you know what Illiyyun is? A clearly inscribed record, witnessed by those brought nearest to Allah." (83:18-21)',
    note: 'Illiyyin — from "ula" (high). The record of every good deed is filed in the highest, most honoured place. Witnessed by the Muqarrabun — the angels closest to Allah. The perfect contrast to Sijjin: one in the lowest depths, the other at the highest heights.',
  },
  bliss: {
    ref: 'Al-Mutaffifin 83:22-28',
    arabic: 'إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ ۩ عَلَى الْأَرَائِكِ يَنظُرُونَ ۩ تَعْرِفُ فِي وُجُوهِهِمْ نَضْرَةَ النَّعِيمِ ۩ يُسْقَوْنَ مِن رَّحِيقٍ مَّخْتُومٍ ۩ خِتَامُهُ مِسْكٌ ۚ وَفِي ذَٰلِكَ فَلْيَتَنَافَسِ الْمُتَنَافِسُونَ ۩ وَمِزَاجُهُ مِن تَسْنِيمٍ ۩ عَيْنًا يَشْرَبُ بِهَا الْمُقَرَّبُونَ',
    english: '"Indeed the righteous are in bliss — on couches, looking on. You recognise the radiance of bliss on their faces. They are given sealed pure nectar to drink — its seal is of musk. For this let the competitors compete! And its mixture is of Tasnim — a spring from which those nearest to Allah drink." (83:22-28)',
    note: 'Nahrat al-na\'im — the radiance of bliss visible on their faces. Rahiq makhtum — sealed pure nectar with a seal of musk. Tasnim — the highest spring of Paradise, shared with the Muqarrabun. This is what is truly worth competing for!',
  },
  laugh: {
    ref: 'Al-Mutaffifin 83:29-36',
    arabic: 'إِنَّ الَّذِينَ أَجْرَمُوا كَانُوا مِنَ الَّذِينَ آمَنُوا يَضْحَكُونَ ۩ وَإِذَا مَرُّوا بِهِمْ يَتَغَامَزُونَ ۩ وَإِذَا انقَلَبُوا إِلَىٰ أَهْلِهِمُ انقَلَبُوا فَكِهِينَ ۩ وَإِذَا رَأَوْهُمْ قَالُوا إِنَّ هَٰؤُلَاءِ لَضَالُّونَ ۩ وَمَا أُرْسِلُوا عَلَيْهِمْ حَافِظِينَ ۩ فَالْيَوْمَ الَّذِينَ آمَنُوا مِنَ الْكُفَّارِ يَضْحَكُونَ ۩ عَلَى الْأَرَائِكِ يَنظُرُونَ ۩ هَلْ ثُوِّبَ الْكُفَّارُ مَا كَانُوا يَفْعَلُونَ',
    english: '"Indeed the criminals used to laugh at the believers — winking mockingly as they passed, returning to their people amused, saying: Those are surely astray! But they were not sent as guardians over them. So Today the believers are laughing at the disbelievers — on couches, looking on. Have the disbelievers been repaid for what they used to do?" (83:29-36)',
    note: 'The great reversal: in this world the criminals mocked the believers. On That Day the believers laugh at the disbelievers from their elevated couches. "Hal thuwwiba?" — Were they repaid? Yes, perfectly.',
  },
};

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.woe);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,160);_label(ctx,'CLICK: Woe to the Defrauders — 83:1-3');
// Market scene: scales
ctx.strokeStyle=p.acStr+'0.8)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(CW/2,60);ctx.lineTo(CW/2,90);ctx.stroke();ctx.beginPath();ctx.moveTo(CW/2-60,90);ctx.lineTo(CW/2+60,90);ctx.stroke();
// One side heavy, one light (tilted)
const tilt=12;ctx.beginPath();ctx.moveTo(CW/2-60,90);ctx.lineTo(CW/2-70,110+tilt);ctx.stroke();ctx.beginPath();ctx.moveTo(CW/2+60,90);ctx.lineTo(CW/2+70,110-tilt);ctx.stroke();
fillRect(ctx,CW/2-85,120+tilt,30,12,p.gndAcc);fillRect(ctx,CW/2+55,120-tilt,30,12,p.gndAcc);
// Coins on heavy side
for(let i=0;i<4;i++){ctx.fillStyle=p.acStr+'0.9)';ctx.beginPath();ctx.arc(CW/2-70+i*6,118+tilt,4,0,Math.PI*2);ctx.fill();}
// Merchant figures
_fig(ctx,120,100,'#e8c39a','#4a1828','#2a0e18');_fig(ctx,380,105,'#c8a080','#3a2818','#1a1808');
ctx.fillStyle='#ff6666';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('FULL for me',130,155);ctx.fillStyle='#ff9966';ctx.fillText('LESS for you',390,158);ctx.textAlign='left';};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.sijjin);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: The Book of Sijjin — 83:7-9');
// Underground prison
const depth=140;fillRect(ctx,CW/2-60,depth,120,50,'#1a0a10');ctx.strokeStyle='#6a1828';ctx.lineWidth=2;ctx.strokeRect(CW/2-60,depth,120,50);
// Bars
for(let b=0;b<5;b++){ctx.strokeStyle='#4a1020';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(CW/2-50+b*25,depth);ctx.lineTo(CW/2-50+b*25,depth+50);ctx.stroke();}
// Scroll inside
ctx.fillStyle='#f0e8c8';ctx.fillRect(CW/2-20,depth+10,40,30);ctx.strokeStyle='#c88030';ctx.lineWidth=1;ctx.strokeRect(CW/2-20,depth+10,40,30);ctx.fillStyle='#2a1020';ctx.font='5px monospace';ctx.textAlign='center';ctx.fillText('SIJJIN',CW/2,depth+30);ctx.textAlign='left';
// Arrow pointing down
ctx.fillStyle=p.label;ctx.font='12px sans-serif';ctx.textAlign='center';ctx.fillText('▼',CW/2,depth-10);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('LOWEST RECORD — PRISON OF DEEDS',CW/2,CH-10);ctx.textAlign='left';};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.illiyyin);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: The Book of Illiyyin — 83:18-21');
// High place with glow
const pulse=0.5+Math.sin(this.t*0.04)*0.3;ctx.shadowColor=p.acStr+pulse+')';ctx.shadowBlur=15;
// Elevated scroll
fillRect(ctx,CW/2-30,30,60,45,p.sky2||'#2c0e18');ctx.strokeStyle=p.acStr+'0.8)';ctx.lineWidth=2;ctx.strokeRect(CW/2-30,30,60,45);
ctx.fillStyle=p.acStr+'0.9)';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('عِلِّيُّون',CW/2,58);ctx.textAlign='left';ctx.shadowBlur=0;
// Angels attending
[[CW/2-90,70],[CW/2+70,70]].forEach(([ax,ay])=>{ctx.fillStyle='rgba(255,220,200,0.7)';ctx.beginPath();ctx.ellipse(ax+15,ay,20,10,0,0,Math.PI*2);ctx.fill();fillRect(ctx,ax+8,ay-8,12,24,'#f0eee8');fillRect(ctx,ax+9,ay-16,10,10,'#e8c39a');});
// Arrow pointing up
ctx.fillStyle=p.label;ctx.font='12px sans-serif';ctx.textAlign='center';ctx.fillText('▲',CW/2,22);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('HIGHEST RECORD — WITNESSED BY MUQARRABUN',CW/2,CH-10);ctx.textAlign='left';};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.bliss);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#0a1808');g.addColorStop(1,'#182808');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_label(ctx,'CLICK: The Righteous on Couches of Bliss — 83:22-26');
// Couch / throne
fillRect(ctx,80,130,180,20,'#6a4020');fillRect(ctx,80,105,180,30,'#8a5030');fillRect(ctx,80,80,20,55,'#8a5030');fillRect(ctx,240,80,20,55,'#8a5030');
// Person reclining
_fig(ctx,130,88,'#f0e8c0','#3a6828','#1a3818');
// Glow of bliss
const glow=0.3+Math.sin(this.t*0.05)*0.2;ctx.shadowColor=`rgba(80,220,80,${glow})`;ctx.shadowBlur=15;ctx.fillStyle='rgba(80,220,80,0.1)';ctx.beginPath();ctx.arc(170,110,50,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
// Cup
fillRect(ctx,300,105,24,30,'#f0b860');ctx.fillStyle='rgba(100,50,180,0.8)';ctx.beginPath();ctx.arc(312,105,12,0,Math.PI*2);ctx.fill();ctx.fillStyle=p.acStr+'0.9)';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('رَحِيق مَخْتُوم',312,155);ctx.fillText('Sealed Nectar',312,167);ctx.textAlign='left';
ctx.fillStyle='#80ff80';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"You would recognise RADIANCE on their faces" (83:24)',CW/2,CH-12);ctx.textAlign='left';};draw();}}

class S6 extends BS{constructor(){super('canvas-6');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.laugh);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
ctx.fillStyle='#0a0a20';ctx.fillRect(0,0,CW,CH);
_label(ctx,'CLICK: The Great Reversal — 83:29-36');
// Left: mockers in this world (big, proud)
_fig(ctx,80,95,'#e8c39a','#3a2838','#1a1428');ctx.fillStyle='#ff6666';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('😂',105,92);
// Right: believers looking humble
_fig(ctx,200,105,'#e0d8c0','#284020','#1a2818');ctx.fillStyle='#ffaa00';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('In this world:',140,155);ctx.fillText('MOCKERS laughed',140,165);ctx.textAlign='left';
// Arrow
ctx.fillStyle='#ffffff';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('→',280,120);ctx.textAlign='left';
// On That Day: reversed
_fig(ctx,330,95,'#e0d8c0','#284020','#1a2818');const glow=0.4+Math.sin(this.t*0.05)*0.3;ctx.shadowColor=`rgba(80,220,80,${glow})`;ctx.shadowBlur=10;ctx.fillStyle='rgba(80,220,80,0.15)';ctx.beginPath();ctx.arc(352,110,30,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('😊',352,92);
_fig(ctx,420,105,'#c09070','#2a1818','#181010');
ctx.fillStyle='#80ff80';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('On That Day:',385,155);ctx.fillText('BELIEVERS laugh',385,165);ctx.textAlign='left';};draw();}}

class S7 extends BS{constructor(){super('canvas-7');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.woe);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,170);_label(ctx,'CLICK: Do They Not Know They Will Rise? — 83:4-6');
// Graves with question marks
[[100,160],[230,158],[360,162],[480,160]].forEach(([gx,gy])=>{fillRect(ctx,gx-15,gy,30,12,p.gndAcc);ctx.fillStyle=p.label;ctx.font='8px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('?',gx,gy-5);ctx.textAlign='left';});
// Person looking upward in wonder
_fig(ctx,CW/2-10,100,'#e8c39a','#3a1828','#1a0e18');
ctx.fillStyle=p.acStr+'0.8)';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"Do they not think they will be resurrected?"',CW/2,55);ctx.fillText('"Liyawmin \'adhim" — For a Great Day!',CW/2,70);ctx.fillText('(83:4-5)',CW/2,82);ctx.textAlign='left';};draw();}}

const scenes={};


const VD_wbw={ref:'Al-Mutaffifin (83)',arabic:'وَيْلٌ لِّلْمُطَفِّفِينَ ۩ كَلَّا إِنَّ كِتَابَ الْفُجَّارِ لَفِي سِجِّينٍ ۩ كَلَّا إِنَّ كِتَابَ الْأَبْرَارِ لَفِي عِلِّيِّينَ',english:'"Woe to those who give less [than due]! The record of the wicked is in Sijjin. The record of the righteous is in Illiyyun." (83:1, 7, 18)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'⚖️',label:'THE DEFRAUDING',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();scenes[6]=new S6();scenes[7]=new S7();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
