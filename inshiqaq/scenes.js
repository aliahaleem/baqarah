'use strict';
window.SCENE_PALETTE = {
  minecraft: {sky0:'#100802',sky1:'#1a1004',sky2:'#261608',gnd:'#301a08',gndAcc:'#401e08',starStr:'rgba(200,160,100,',acStr:'rgba(240,144,48,',label:'#f09030',hint:'#c07020'},
  stars: {sky0:'#2e1a08',sky1:'#3c2410',sky2:'#503018',gnd:'#604020',gndAcc:'#7a5030',starStr:'rgba(255,220,180,',acStr:'rgba(248,192,96,',label:'#f8c060',hint:'#e0a040'},
};

// SURAH AL-INSHIQAQ (84) — scenes.js
;

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.split);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
// Sunset gradient sky
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#1a0a04');g.addColorStop(0.4,p.sky1);g.addColorStop(0.8,p.gndAcc||'#7a5030');g.addColorStop(1,p.gnd||'#604020');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_label(ctx,'CLICK: Sky Splits, Earth Stretches — 84:1-5');
// Crack in sky
const pulse=0.5+Math.sin(this.t*0.04)*0.4;ctx.strokeStyle=`rgba(248,192,96,${pulse})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(CW/2-20,0);ctx.lineTo(CW/2+10,50);ctx.lineTo(CW/2-15,110);ctx.lineTo(CW/2+5,CH);ctx.stroke();
// Earth cracking / stretching
_ground(ctx,170);ctx.strokeStyle=p.acStr+'0.6)';ctx.lineWidth=1;ctx.setLineDash([4,2]);ctx.beginPath();ctx.moveTo(0,175);ctx.lineTo(CW,175);ctx.stroke();ctx.setLineDash([]);
// Sunrise glow
const glow=0.3+Math.sin(this.t*0.03)*0.15;ctx.fillStyle=`rgba(255,150,50,${glow})`;ctx.beginPath();ctx.arc(CW/2,CH,80,Math.PI,0);ctx.fill();
_label(ctx,'"Listened to its Lord and was OBLIGATED" (84:2,4)',CH-10);};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.strive);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,170);_label(ctx,'CLICK: You Are Striving Toward Your Lord — 84:6');
// Person walking toward a point on the horizon
const walkX=60+((this.t*0.5)%340);const walkBob=Math.sin(this.t*0.2)*2;
_fig(ctx,walkX,110+walkBob,'#e8c39a','#3a2818','#1a1408');
// Footsteps
for(let f=0;f<4;f++){const fx=walkX-20-f*15;if(fx>10){ctx.fillStyle=p.acStr+'0.4)';ctx.fillRect(fx,180,8,3);}}
// Light ahead
const pulse=0.5+Math.sin(this.t*0.05)*0.3;ctx.fillStyle=`rgba(248,192,96,${pulse})`;ctx.beginPath();ctx.arc(CW-40,120,30,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(248,192,96,0.3)';ctx.beginPath();ctx.arc(CW-40,120,55,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(0,0,0,0.5)';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('رَبّ',CW-40,124);ctx.textAlign='left';
_label(ctx,'"Kadihun ila Rabbika kadhan fa-mulaqihi" (84:6)',CH-10);};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.right);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#0a1808');g.addColorStop(1,'#182c08');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_ground(ctx,180);_label(ctx,'CLICK: Book in Right Hand — Happy Return! — 84:7-9');
// Happy figure holding scroll in right hand
const glow=0.4+Math.sin(this.t*0.05)*0.3;ctx.shadowColor=`rgba(80,220,80,${glow})`;ctx.shadowBlur=15;_fig(ctx,CW/2-50,95,'#f0e8c0','#3a6828','#1a3818');ctx.shadowBlur=0;
// Book in right hand
fillRect(ctx,CW/2+10,103,20,28,'#f0e8c8');ctx.strokeStyle='rgba(80,200,80,0.8)';ctx.lineWidth=2;ctx.strokeRect(CW/2+10,103,20,28);ctx.fillStyle='#2a4020';ctx.font='4px monospace';ctx.textAlign='center';ctx.fillText('يَمِين',CW/2+20,120);ctx.textAlign='left';
// Joy burst
ctx.fillStyle='#80ff80';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('😊',CW/2-38,90);ctx.textAlign='left';
// Family reunion
_fig(ctx,CW/2+80,110,'#e0d8b0','#284020','#182810');_fig(ctx,CW/2+110,115,'#e8d0a0','#2a4018','#1a2810');
ctx.fillStyle='rgba(80,220,80,0.5)';ctx.beginPath();ctx.arc(CW/2-38,120,45,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#80ff80';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"Easy account — returns to family JOYFUL!" (84:8-9)',CW/2,CH-10);ctx.textAlign='left';};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.left);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#100204');g.addColorStop(1,'#1a0408');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_ground(ctx,180);_label(ctx,'CLICK: Book Behind the Back — 84:10-12');
// Distressed figure with book behind back
_fig(ctx,CW/2-10,100,'#c09070','#2a1818','#181010');
// Book behind back
fillRect(ctx,CW/2-30,110,18,24,'#fffae0');ctx.strokeStyle='rgba(200,40,20,0.8)';ctx.lineWidth=1;ctx.strokeRect(CW/2-30,110,18,24);ctx.fillStyle='#aa2020';ctx.font='4px monospace';ctx.textAlign='center';ctx.fillText('خَلْف',CW/2-21,125);ctx.textAlign='left';
// Flames below
for(let f=0;f<8;f++){const fx=CW/2-60+f*18,fh=25+Math.sin(this.t*0.15+f)*10;const r=180+f*5,g2=40+f*8;ctx.fillStyle=`rgba(${r},${g2},20,0.8)`;ctx.beginPath();ctx.moveTo(fx+4,CH);ctx.lineTo(fx,CH-fh);ctx.lineTo(fx+8,CH);ctx.fill();}
// Despair
ctx.fillStyle='#ff4444';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('😰',CW/2+5,88);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('يَدْعُو ثُبُورًا — "Calls for destruction!" (84:11)',CW/2,CH-15);ctx.fillText('يَصْلَى سَعِيرًا — "Will enter blazing fire" (84:12)',CW/2,CH-4);ctx.textAlign='left';};draw();}}

class S6 extends BS{constructor(){super('canvas-6');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.stages);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: Stage After Stage — 84:19');
const stages=['Womb','Birth','Child','Youth','Adult','Elder','Death','Grave','Rise'];const cols=['#6a4028','#8a5838','#a06848','#b07858','#c08868','#a07060','#806858','#604838','#f8c060'];stages.forEach((stage,i)=>{const x=30+i*55,y=130-i*8;fillRect(ctx,x,y,44,44,cols[i]);ctx.fillStyle='rgba(0,0,0,0.5)';ctx.font='4px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(stage,x+22,y+25);ctx.textAlign='left';
if(i<stages.length-1){const pulse=i===Math.floor(this.t*0.05)%stages.length;ctx.strokeStyle=pulse?p.acStr+'0.9)':'rgba(255,255,255,0.2)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+44,y+22);ctx.lineTo(x+55,y+14);ctx.stroke();}});
_label(ctx,'"La-tarkabunna tabaqan \'an tabaqin" — Stage by Stage! (84:19)',CH-10);};draw();}}

class S7 extends BS{constructor(){super('canvas-7');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.strive);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,170);_label(ctx,'CLICK: "Why Don\'t They Believe When Quran Recited?" — 84:20-21');
// Person listening to recitation
_fig(ctx,CW/2-10,105,'#e8c39a','#3a1828','#1a0e18');
// Sound waves
for(let w=1;w<=4;w++){const pulse=0.2+Math.sin(this.t*0.08-w*0.5)*0.15;ctx.strokeStyle=`rgba(248,192,96,${Math.max(0,pulse)})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(CW/2+80,120,w*20,Math.PI*0.5,Math.PI*1.5);ctx.stroke();}
// Moon
ctx.fillStyle=p.acStr+'0.8)';ctx.beginPath();ctx.arc(80,40,18,0,Math.PI*2);ctx.fill();ctx.fillStyle=p.sky0||'#100802';ctx.beginPath();ctx.arc(90,35,13,0,Math.PI*2);ctx.fill();
// Question marks
ctx.fillStyle='#ff8888';ctx.font='10px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('?',300,80);ctx.fillText('?',340,60);ctx.textAlign='left';
_label(ctx,'"Ma lahum la yu\'minun?" — What is with them that they do not believe? (84:20)',CH-10);};draw();}}

const scenes={};


const VD_wbw={ref:'Al-Inshiqaq (84)',arabic:'إِذَا السَّمَاءُ انشَقَّتْ ۩ وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ ۩ يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ',english:'"When the sky has split open and obeyed its Lord as it must — O mankind, you are labouring toward your Lord, and you will meet Him." (84:1-2, 6)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🌅',label:'THE SPLITTING OPEN',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();scenes[6]=new S6();scenes[7]=new S7();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
