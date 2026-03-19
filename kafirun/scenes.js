'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Al-Kafirun 109:1-2',arabic:'قُلْ يَا أَيُّهَا الْكَافِرُونَ',english:'"Say: O disbelievers!" (109:1)',note:'Bold address. Quraysh proposed worship-exchange. Complete refusal.'};
const VD_s2={ref:'Al-Kafirun 109:3-5',arabic:'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ',english:'"Nor are you worshippers of what I worship." (109:3)',note:'Past, present, future refusal. No compromise.'};
const VD_s3={ref:'Al-Kafirun 109:6',arabic:'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',english:'"For you is your religion, for me is mine." (109:6)',note:'Crystal clear. No mixing. Declaration of disavowal.'};

/* S1 — Word by Word canvas: thematic scene only */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  const VD_wbw_l={ref:'KAFIRUN 109:1',arabic:'قُلْ يَا أَيُّهَا الْكَافِرُونَ ۩ لَا أَعْبُدُ مَا تَعْبُدُو...',english:'"Say: O disbelievers! I do not worship what you worship. Nor are you worshippers...',note:'Learn every word — tap the flip cards below!'};
  this.canvas.onclick=()=>showVersePopup(VD_wbw_l);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    const t2=this.t;
    ctx.fillStyle='#100002';ctx.fillRect(0,0,CW,CH);
    const rg=ctx.createRadialGradient(CW/2,CH*0.5,5,CW/2,CH*0.5,100+Math.sin(t2*0.025)*10);
    rg.addColorStop(0,`rgba(220,80,60,{0.15+Math.sin(t2*0.03)*0.06})`);
    rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='rgba(240,120,100,0.92)';ctx.font='18px serif';ctx.textAlign='center';
    ctx.fillText('لَكُمْ دِينُكُمْ وَلِيَ دِينِ',CW/2,CH*0.48);
    ctx.fillStyle='rgba(180,180,180,0.55)';ctx.font='5px "Press Start 2P",monospace';
    ctx.fillText('"For you your religion — for me mine" · Tap cards below',CW/2,CH-10);
    ctx.textAlign='left';
    _lbl(ctx,'CLICK: Full Al-Kafirun 109:1-6','#fff8f0');
  };draw();
}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1a0404';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381010';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🚫',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f06050';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('قُلْ يَا أَيُّهَا الْكَافِرُ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Say: O disbelievers!" (109:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: O Disbelievers — 109:1-2','#fff0ee');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1a0404';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381010';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🔄',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f06050';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('وَلَا أَنتُمْ عَابِدُونَ مَا',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Nor are you worshippers of what I worship." (109:3)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Triple Refusal — 109:3-5','#fff0ee');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1a0404';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381010';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('✨',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f06050';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('لَكُمْ دِينُكُمْ وَلِيَ دِين',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"For you is your religion, for me is mine." (109:6)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Your Religion, Mine — 109:6','#fff0ee');};draw();}}
const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
