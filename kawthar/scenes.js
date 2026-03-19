'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Al-Kawthar 108:1',arabic:'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',english:'"We have given you Al-Kawthar." (108:1)',note:'River in Jannah + abundant good. Gift to the Prophet ﷺ.'};
const VD_s2={ref:'Al-Kawthar 108:2',arabic:'فَصَلِّ لِرَبِّكَ وَانْحَرْ',english:'"Pray to your Lord and sacrifice." (108:2)',note:'Gratitude: salah + qurbani. Action in response to gift.'};
const VD_s3={ref:'Al-Kawthar 108:3',arabic:'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',english:'"Your enemy is the abtar (cut off)." (108:3)',note:'The enemy is forgotten. Prophet ﷺ: 2 billion+ followers!'};

/* S1 — Word by Word canvas: thematic scene only */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  const VD_wbw_l={ref:'KAWTHAR 108:1',arabic:'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۩ فَصَلِّ لِرَبِّكَ وَانْحَ...',english:'"Indeed We have given you Al-Kawthar. So pray to your Lord and sacrifice. Indeed...',note:'Learn every word — tap the flip cards below!'};
  this.canvas.onclick=()=>showVersePopup(VD_wbw_l);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    const t2=this.t;
    ctx.fillStyle='#020408';ctx.fillRect(0,0,CW,CH);
    const rg=ctx.createRadialGradient(CW/2,CH*0.5,5,CW/2,CH*0.5,100+Math.sin(t2*0.025)*10);
    rg.addColorStop(0,`rgba(80,170,230,{0.15+Math.sin(t2*0.03)*0.06})`);
    rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='rgba(130,210,240,0.92)';ctx.font='18px serif';ctx.textAlign='center';
    ctx.fillText('إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',CW/2,CH*0.48);
    ctx.fillStyle='rgba(180,180,180,0.55)';ctx.font='5px "Press Start 2P",monospace';
    ctx.fillText('"We have given you Al-Kawthar" · Tap cards below',CW/2,CH-10);
    ctx.textAlign='left';
    _lbl(ctx,'CLICK: Full Al-Kawthar 108:1-3','#fff8f0');
  };draw();
}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#040c18';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#101e38';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🌊',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#90d0f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('إِنَّا أَعْطَيْنَاكَ الْكَوْ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"We have given you Al-Kawthar." (108:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Al-Kawthar Given — 108:1','#e8f8ff');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#040c18';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#101e38';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🙏',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#90d0f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('فَصَلِّ لِرَبِّكَ وَانْحَرْ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Pray to your Lord and sacrifice." (108:2)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Pray and Sacrifice — 108:2','#e8f8ff');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#040c18';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#101e38';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('✂️',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#90d0f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('إِنَّ شَانِئَكَ هُوَ الْأَبْ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Your enemy is the abtar (cut off)." (108:3)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Enemy Cut Off — 108:3','#e8f8ff');};draw();}}
const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
