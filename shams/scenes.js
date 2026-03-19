'use strict';
/* scenes.js — Surah Ash-Shams (91) */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#2a1808',sky1:'#3a2010',gnd:'#4e2e14',acc:'#f8c060',label:'#fff8e8',hint:'#e0b870'}:{sky0:'#180c02',sky1:'#241204',gnd:'#361a08',acc:'#e8c020',label:'#fff4d8',hint:'#b08040'};}
function fillRect(ctx,x,y,w,h,col){if(col)ctx.fillStyle=col;const s=document.documentElement.getAttribute('data-theme')==='stars',rx=Math.round(x),ry=Math.round(y),rw=Math.round(w),rh=Math.round(h);if(s&&rw>4&&rh>4&&rw<120){const r=Math.min(rw,rh)*0.25;ctx.shadowColor='rgba(248,192,96,0.2)';ctx.shadowBlur=3;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(rx,ry,rw,rh,r);else ctx.rect(rx,ry,rw,rh);ctx.fill();ctx.shadowBlur=0;}else ctx.fillRect(rx,ry,rw,rh);}
function _sky(ctx){const p=sceneP(),g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y=170){const p=sceneP();fillRect(ctx,0,y,CW,CH-y,p.gnd);}
function _label(ctx,txt,y=16){const p=sceneP();ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(txt,CW/2,y);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc){fillRect(ctx,x+P,y,P*3,P*3,hc);fillRect(ctx,x,y+P*3,P*5,P*4,bc);fillRect(ctx,x,y+P*7,P*2,P*4,pc);fillRect(ctx,x+P*3,y+P*7,P*2,P*4,pc);}

const VD={
  oaths:{ref:'Ash-Shams 91:1-6',arabic:'وَالشَّمْسِ وَضُحَاهَا ۩ وَالْقَمَرِ إِذَا تَلَاهَا ۩ وَالنَّهَارِ إِذَا جَلَّاهَا',english:'"By the sun in its morning brightness, by the moon when it follows it, by the day when it reveals it." (91:1-3)',note:'Eleven oaths — the most in the Quran — all leading to one point: the soul and its choice. Allah draws our eyes to the cosmos to make us look inward.'},
  soul:{ref:'Ash-Shams 91:7-10',arabic:'وَنَفْسٍ وَمَا سَوَّاهَا ۩ فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا ۩ قَدْ أَفْلَحَ مَن زَكَّاهَا',english:'"By the soul and He who formed it perfectly — He inspired it with its wickedness and its piety. He who purifies it succeeds; he who corrupts it fails." (91:7-10)',note:'"Zakkaha" — to purify, to grow. The soul knows right from wrong. The test is whether you develop that awareness or bury it. This is the entire purpose of the eleven oaths above.'},
  thamud:{ref:'Ash-Shams 91:11-15',arabic:'كَذَّبَتْ ثَمُودُ بِطَغْوَاهَا ۩ إِذِ انبَعَثَ أَشْقَاهَا',english:'"Thamud rejected by reason of their transgression — when the worst of them rose up." (91:11-12)',note:'The worst ONE of them rose up to hamstring the camel. But Allah destroyed ALL of Thamud — showing that when a community permits transgression without stopping it, collective punishment follows. The soul corrupted, then society corrupted.'},
};

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S1 extends BS{constructor(){super('canvas-1');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.oaths);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: The Eleven Cosmic Oaths — 91:1-7');
// Pulsing sun
const pulse=0.7+Math.sin(this.t*0.06)*0.3;
const sg=ctx.createRadialGradient(CW*0.75,40,3,CW*0.75,40,50*pulse);sg.addColorStop(0,'rgba(255,240,150,0.95)');sg.addColorStop(0.5,'rgba(240,160,40,0.7)');sg.addColorStop(1,'transparent');ctx.fillStyle=sg;ctx.fillRect(0,0,CW,CH);
ctx.fillStyle=`rgba(255,230,80,${pulse})`;ctx.beginPath();ctx.arc(CW*0.75,40,18,0,Math.PI*2);ctx.fill();
// Moon
ctx.fillStyle='rgba(220,210,180,0.9)';ctx.beginPath();ctx.arc(CW*0.2,45,13,0,Math.PI*2);ctx.fill();
// Stars
[[60,25],[120,15],[200,30],[300,12],[400,22],[500,18]].forEach(([x,y],i)=>{const tw=0.3+Math.sin(this.t*0.04+i)*0.3;ctx.fillStyle=`rgba(255,240,180,${tw})`;ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2);ctx.fill();});
// Ground figures looking up
_fig(ctx,220,140,'#e8c090','#8a4820','#5a2810');_fig(ctx,300,140,'#d0b080','#6a3810','#4a2408');
ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"By the sun, moon, day, night, sky, earth, and the SOUL" (91:1-7)',CW/2,CH-8);ctx.textAlign='left';};draw();}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.soul);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: Purify the Soul — 91:7-10');
// Split scene: left = purified soul (bright), right = corrupted (dark)
ctx.fillStyle='rgba(255,220,80,0.15)';ctx.fillRect(0,0,CW/2,CH);
ctx.fillStyle='rgba(40,10,0,0.3)';ctx.fillRect(CW/2,0,CW/2,CH);
// Left: radiant figure
const rg=ctx.createRadialGradient(CW*0.25,130,5,CW*0.25,130,40);rg.addColorStop(0,'rgba(255,230,80,0.4)');rg.addColorStop(1,'transparent');ctx.fillStyle=rg;ctx.fillRect(0,80,CW/2,CH);
_fig(ctx,CW*0.25-10,110,'#f0d090','#2050a0','#102870');
ctx.fillStyle='#f8e040';ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('✨',CW*0.25,105);
ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';ctx.fillText('ZAKKAHA',CW*0.25,175);ctx.fillText('Purified',CW*0.25,185);
// Right: shadowed figure
_fig(ctx,CW*0.75-10,115,'#806040','#501010','#380808');
ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(CW/2+50,95,40,60);
ctx.fillStyle=p.hint;ctx.fillText('DASSAHA',CW*0.75,175);ctx.fillText('Corrupted',CW*0.75,185);
ctx.textAlign='left';};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.thamud);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
ctx.fillStyle=p.sky0;ctx.fillRect(0,0,CW,CH);
ctx.fillStyle=p.gnd;ctx.fillRect(0,H*0.55||CH*0.55,CW,CH*0.45);
const H=CH;
_ground(ctx,H*0.55);_label(ctx,'CLICK: The Story of Thamud — 91:11-15');
// Rock city
[[20,100,35,80],[80,110,30,70],[155,105,28,75],[215,115,35,60]].forEach(([x,y,w,h])=>{ctx.fillStyle=p.sky1||'#3a2010';ctx.fillRect(x,y,w,h);ctx.fillStyle='rgba(0,0,0,0.3)';ctx.fillRect(x+w*0.3,y+h*0.4,w*0.3,h*0.35);});
// Camel
ctx.fillStyle='#c87828';ctx.fillRect(350,140,45,22);ctx.fillRect(380,130,10,15);ctx.fillRect(380,126,14,10);
ctx.fillRect(358,160,7,16);ctx.fillRect(372,160,7,16);ctx.fillRect(381,160,7,16);ctx.fillRect(395,160,7,16);
// Lightning bolt (destruction)
const lp=0.4+Math.sin(this.t*0.2)*0.4;
ctx.fillStyle=`rgba(255,240,80,${lp})`;ctx.font='28px serif';ctx.textAlign='center';ctx.fillText('⚡',CW*0.8,80);ctx.textAlign='left';
ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';
ctx.fillText('"They hamstrung the camel — Allah crushed them!" (91:14)',CW/2,CH-8);ctx.textAlign='left';};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.oaths);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,170);_label(ctx,'Complete! Ash-Shams — Purify Your Soul ☀️');
// Full scene: sun, moon, soul glow, lesson
const sg=ctx.createRadialGradient(CW*0.8,30,3,CW*0.8,30,60);sg.addColorStop(0,'rgba(255,230,80,0.9)');sg.addColorStop(1,'transparent');ctx.fillStyle=sg;ctx.fillRect(0,0,CW,CH);
ctx.fillStyle='#ffe060';ctx.beginPath();ctx.arc(CW*0.8,30,16,0,Math.PI*2);ctx.fill();
// Glowing soul
const glow=0.3+Math.sin(this.t*0.04)*0.2;const rg=ctx.createRadialGradient(CW/2,120,5,CW/2,120,50);rg.addColorStop(0,`rgba(255,230,80,${glow*2})`);rg.addColorStop(1,'transparent');ctx.fillStyle=rg;ctx.fillRect(0,60,CW,CH);
_fig(ctx,CW/2-10,100,'#f0d090','#2050a0','#102870');
ctx.fillStyle=p.acc;ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('قَدْ أَفْلَحَ مَن زَكَّاهَا',CW/2,90);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"He who purifies his soul succeeds"',CW/2,CH-8);ctx.textAlign='left';};draw();}}

const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
