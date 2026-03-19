'use strict';
/* scenes.js — Surah Al-Layl (92) */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#0c0828',sky1:'#1a1240',gnd:'#261c54',acc:'#e8d060',label:'#f0e8ff',hint:'#b090d0'}:{sky0:'#04020e',sky1:'#0c0820',gnd:'#160e30',acc:'#c0a820',label:'#e8e0ff',hint:'#806090'};}
function fillRect(ctx,x,y,w,h,col){if(col)ctx.fillStyle=col;const s=document.documentElement.getAttribute('data-theme')==='stars',rx=Math.round(x),ry=Math.round(y),rw=Math.round(w),rh=Math.round(h);if(s&&rw>4&&rh>4&&rw<120){const r=Math.min(rw,rh)*0.25;ctx.shadowColor='rgba(160,96,224,0.2)';ctx.shadowBlur=3;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(rx,ry,rw,rh,r);else ctx.rect(rx,ry,rw,rh);ctx.fill();ctx.shadowBlur=0;}else ctx.fillRect(rx,ry,rw,rh);}
function _sky(ctx){const p=sceneP(),g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _stars(ctx,t){[[50,20],[110,10],[200,25],[320,8],[420,18],[510,12],[80,50],[280,40],[450,45]].forEach(([x,y],i)=>{const p=sceneP();const br=0.4+Math.sin((t||0)*0.04+i)*0.3;ctx.fillStyle=`rgba(200,180,255,${br})`;ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2);ctx.fill();});}
function _ground(ctx,y=170){fillRect(ctx,0,y,CW,CH-y,sceneP().gnd);}
function _label(ctx,txt,y=16){const p=sceneP();ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(txt,CW/2,y);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc){fillRect(ctx,x+P,y,P*3,P*3,hc);fillRect(ctx,x,y+P*3,P*5,P*4,bc);fillRect(ctx,x,y+P*7,P*2,P*4,pc);fillRect(ctx,x+P*3,y+P*7,P*2,P*4,pc);}

const VD={
  oaths:{ref:'Al-Layl 92:1-4',arabic:'وَاللَّيْلِ إِذَا يَغْشَىٰ ۩ وَالنَّهَارِ إِذَا تَجَلَّىٰ ۩ وَمَا خَلَقَ الذَّكَرَ وَالْأُنثَىٰ',english:'"By the night when it covers, by the day when it shines, by the creation of male and female." (92:1-3)',note:'These three oaths frame the question of 92:4: "Inna sa\'yakum la-shatta" — your strivings are indeed varied/scattered. What are YOU striving for?'},
  giver:{ref:'Al-Layl 92:5-7',arabic:'فَأَمَّا مَنْ أَعْطَىٰ وَاتَّقَىٰ ۩ وَصَدَّقَ بِالْحُسْنَىٰ ۩ فَسَنُيَسِّرُهُ لِلْيُسْرَىٰ',english:'"As for he who gives and fears Allah, and believes in the best — We shall ease his way to ease." (92:5-7)',note:'Three qualities: gives (a\'ta), has taqwa (ittaqa), believes in Al-Husna (the best / Paradise / goodness). The result: Allah makes everything EASIER for them. Giving opens doors.'},
  miser:{ref:'Al-Layl 92:8-11',arabic:'وَأَمَّا مَنْ بَخِلَ وَاسْتَغْنَىٰ ۩ وَكَذَّبَ بِالْحُسْنَىٰ ۩ فَسَنُيَسِّرُهُ لِلْعُسْرَىٰ',english:'"And as for he who is stingy and considers himself self-sufficient, and denies the best — We shall ease his way to difficulty." (92:8-10)',note:'"Istagna" — felt self-sufficient, independent of Allah. The greatest spiritual danger. Wealth that makes you feel you don\'t need Allah is the worst wealth. His wealth will avail him nothing when he falls.'},
};

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S1 extends BS{constructor(){super('canvas-1');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.oaths);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,this.t);_ground(ctx,175);_label(ctx,'CLICK: Night, Day, Creation — 92:1-3');
// Dark night side
ctx.fillStyle='rgba(0,0,30,0.5)';ctx.fillRect(0,0,CW/2,CH);
// Bright day side
const dg=ctx.createLinearGradient(CW/2,0,CW,0);dg.addColorStop(0,'transparent');dg.addColorStop(1,'rgba(255,220,80,0.2)');ctx.fillStyle=dg;ctx.fillRect(CW/2,0,CW/2,CH);
// Moon
ctx.fillStyle='rgba(220,210,240,0.9)';ctx.beginPath();ctx.arc(80,50,18,0,Math.PI*2);ctx.fill();
// Sun
const sg=ctx.createRadialGradient(CW-80,45,3,CW-80,45,30);sg.addColorStop(0,'rgba(255,230,80,0.9)');sg.addColorStop(1,'transparent');ctx.fillStyle=sg;ctx.fillRect(0,0,CW,CH);
ctx.fillStyle='#ffe060';ctx.beginPath();ctx.arc(CW-80,45,14,0,Math.PI*2);ctx.fill();
// Male/female
_fig(ctx,240,130,'#e8c090','#204080','#102060');_fig(ctx,310,130,'#f0d0a0','#801060','#600848');
ctx.fillStyle=p.acc;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';
ctx.fillText('"Your strivings are varied" (92:4)',CW/2,CH-8);ctx.textAlign='left';};draw();}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.giver);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,this.t);_ground(ctx,170);_label(ctx,'CLICK: The Generous Path — 92:5-7');
// Radiant giving figure
const glow=0.2+Math.sin(this.t*0.04)*0.12;const rg=ctx.createRadialGradient(180,120,5,180,120,60);rg.addColorStop(0,`rgba(200,160,255,${glow*3})`);rg.addColorStop(1,'transparent');ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
_fig(ctx,168,100,'#f0d090','#2050a0','#102870');
// Coins being given
for(let i=0;i<4;i++){const cy=90+i*12-Math.sin(this.t*0.06+i)*5;ctx.fillStyle=p.acc;ctx.beginPath();ctx.arc(220+i*8,cy,4,0,Math.PI*2);ctx.fill();}
// Arrow going up
ctx.fillStyle='rgba(180,140,255,0.7)';ctx.font='16px serif';ctx.textAlign='center';ctx.fillText('↑',180,88);
ctx.fillStyle=p.label;ctx.font='6px serif';ctx.fillText('يُسْرَى — EASE',180,155);
ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"We shall ease his way to EASE" (92:7)',CW/2,CH-8);ctx.textAlign='left';};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.miser);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,170);_label(ctx,'CLICK: The Miser\'s Path — 92:8-11');
// Miser hoarding gold
_fig(ctx,150,100,'#b09060','#502010','#380808');
// Gold pile
for(let i=0;i<6;i++){ctx.fillStyle=p.acc;ctx.beginPath();ctx.arc(195+i*8,145,5,0,Math.PI*2);ctx.fill();}
ctx.fillStyle='rgba(100,50,0,0.6)';ctx.fillRect(140,140,80,25);
// Downward spiral
ctx.fillStyle='rgba(200,60,40,0.7)';ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('↓',155,88);
ctx.fillStyle='#ff8080';ctx.font='6px serif';ctx.fillText('عُسْرَى — DIFFICULTY',155,165);
// Pit
const pitY=175+Math.sin(this.t*0.04)*3;ctx.fillStyle='rgba(255,80,40,0.3)';ctx.fillRect(CW*0.55,pitY,120,CH-pitY);
ctx.fillStyle='#ff9060';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"What will his wealth avail when he falls?" (92:11)',CW/2,CH-8);ctx.textAlign='left';};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.oaths);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,this.t);_ground(ctx,175);_label(ctx,'Al-Layl Complete — Two Paths, Two Destinies 🌙');
// Two paths diverging
ctx.strokeStyle='rgba(180,140,255,0.4)';ctx.lineWidth=2;ctx.setLineDash([4,4]);
ctx.beginPath();ctx.moveTo(CW/2,175);ctx.lineTo(100,80);ctx.stroke();
ctx.beginPath();ctx.moveTo(CW/2,175);ctx.lineTo(CW-100,80);ctx.stroke();
ctx.setLineDash([]);
// Giver path (left - glowing)
_fig(ctx,80,90,'#f0d090','#2050a0','#102870');ctx.fillStyle=p.acc;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('EASE ✨',100,78);
// Miser path (right - shadowed)
_fig(ctx,CW-120,90,'#a08060','#502010','#380808');ctx.fillStyle='#ff8080';ctx.fillText('DIFFICULTY ⬇',CW-100,78);
ctx.fillStyle=p.label;ctx.fillText('"Inna alayna lal-huda" — Guidance is from Allah',CW/2,CH-8);ctx.textAlign='left';};draw();}}

const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
