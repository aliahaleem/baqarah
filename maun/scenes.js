'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Al-Maun 107:1-3',arabic:'يَدُعُّ الْيَتِيمَ',english:'"Pushes away the orphan." (107:2)',note:'Denying the deen shows in mistreating the orphan.'};
const VD_s2={ref:'Al-Maun 107:5-6',arabic:'الَّذِينَ هُمْ يُرَاءُونَ',english:'"Those who pray to be seen." (107:6)',note:'Heedless prayer + showing off = Al-Riya.'};
const VD_s3={ref:'Al-Maun 107:7',arabic:'وَيَمْنَعُونَ الْمَاعُونَ',english:'"They withhold small kindnesses." (107:7)',note:"Even the smallest help withheld reveals the deen's absence."};

/* S1 — Word by Word canvas: thematic scene only */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  const VD_wbw_l={ref:'MAUN 107:1',arabic:'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ۩ فَذَٰلِكَ الَّذِي ...',english:'"Have you seen the one who denies the deen? He is the one who pushes away the or...',note:'Learn every word — tap the flip cards below!'};
  this.canvas.onclick=()=>showVersePopup(VD_wbw_l);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    const t2=this.t;
    ctx.fillStyle='#020608';ctx.fillRect(0,0,CW,CH);
    const rg=ctx.createRadialGradient(CW/2,CH*0.5,5,CW/2,CH*0.5,100+Math.sin(t2*0.025)*10);
    rg.addColorStop(0,`rgba(80,140,220,{0.15+Math.sin(t2*0.03)*0.06})`);
    rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='rgba(130,185,240,0.92)';ctx.font='18px serif';ctx.textAlign='center';
    ctx.fillText('وَيَمْنَعُونَ الْمَاعُونَ',CW/2,CH*0.48);
    ctx.fillStyle='rgba(180,180,180,0.55)';ctx.font='5px "Press Start 2P",monospace';
    ctx.fillText('"They withhold even small kindnesses" · Tap cards below',CW/2,CH-10);
    ctx.textAlign='left';
    _lbl(ctx,'CLICK: Full Al-Maun 107:1-7','#fff8f0');
  };draw();
}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#060e20';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#162640';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('😢',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#80b8f0';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('يَدُعُّ الْيَتِيمَ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Pushes away the orphan." (107:2)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Denier Exposed — 107:1-3','#e8f4ff');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#060e20';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#162640';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🙏',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#80b8f0';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('الَّذِينَ هُمْ يُرَاءُونَ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Those who pray to be seen." (107:6)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Hollow Prayer — 107:5-6','#e8f4ff');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#060e20';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#162640';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🤲',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#80b8f0';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('وَيَمْنَعُونَ الْمَاعُونَ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"They withhold small kindnesses." (107:7)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Small Kindness Withheld — 107:7','#e8f4ff');};draw();}}
const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
