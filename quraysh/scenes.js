'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Quraysh 106:1-2',arabic:'لِإِيلَافِ قُرَيْشٍ',english:'"For the tradition of the Quraysh." (106:1)',note:'Two annual trade journeys: winter to Yemen, summer to Sham.'};
const VD_s2={ref:'Quraysh 106:3',arabic:'فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ',english:'"So worship the Lord of this House." (106:3)',note:'The Kaaba gives you your blessing — worship the One who gave it.'};
const VD_s3={ref:'Quraysh 106:4',arabic:'الَّذِي أَطْعَمَهُم مِّن جُوعٍ',english:'"Who fed them from hunger." (106:4)',note:'Food from hunger. Safety from fear. Two basic blessings.'};

/* S1 — Word by Word canvas: thematic scene only */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  const VD_wbw_l={ref:'QURAYSH 106:1',arabic:'لِإِيلَافِ قُرَيْشٍ ۩ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالص...',english:'"For the tradition of the Quraysh — their tradition of the winter and summer jou...',note:'Learn every word — tap the flip cards below!'};
  this.canvas.onclick=()=>showVersePopup(VD_wbw_l);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    const t2=this.t;
    ctx.fillStyle='#120c00';ctx.fillRect(0,0,CW,CH);
    const rg=ctx.createRadialGradient(CW/2,CH*0.5,5,CW/2,CH*0.5,100+Math.sin(t2*0.025)*10);
    rg.addColorStop(0,`rgba(220,180,60,{0.15+Math.sin(t2*0.03)*0.06})`);
    rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='rgba(240,200,80,0.92)';ctx.font='18px serif';ctx.textAlign='center';
    ctx.fillText('رَبَّ هَٰذَا الْبَيْتِ',CW/2,CH*0.48);
    ctx.fillStyle='rgba(180,180,180,0.55)';ctx.font='5px "Press Start 2P",monospace';
    ctx.fillText('"Lord of this House" · Tap cards below to learn each word',CW/2,CH-10);
    ctx.textAlign='left';
    _lbl(ctx,'CLICK: Full Quraysh 106:1-4','#fff8f0');
  };draw();
}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1e1204';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#3e2610';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🕋',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#e8c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('لِإِيلَافِ قُرَيْشٍ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"For the tradition of the Quraysh." (106:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Two Journeys — 106:1-2','#fff8e0');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1e1204';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#3e2610';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🙏',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#e8c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('فَلْيَعْبُدُوا رَبَّ هَٰذَا ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"So worship the Lord of this House." (106:3)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Worship the Lord — 106:3','#fff8e0');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1e1204';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#3e2610';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🍞',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#e8c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('الَّذِي أَطْعَمَهُم مِّن جُو',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Who fed them from hunger." (106:4)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Fed and Made Safe — 106:4','#fff8e0');};draw();}}
const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
