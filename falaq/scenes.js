'use strict';
/* scenes.js — Surah Al-Falaq (113) */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

const VD_wbw={ref:'Al-Falaq 113:1-5',arabic:'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۩ مِن شَرِّ مَا خَلَقَ ۩ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۩ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۩ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',english:'"Say: I seek refuge in the Lord of the daybreak — from four specific evils." (113:1-5)',note:'23 words. A complete shield. Learn them word by word!'};
const VD_s2={ref:'Al-Falaq 113:1',arabic:'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',english:'"Seek refuge in the Lord of the Daybreak." (113:1)',note:'Lord who commands morning to break through all darkness.'};
const VD_s3={ref:'Al-Falaq 113:2-5',arabic:'مِن شَرِّ مَا خَلَقَ ۩ وَمِن شَرِّ غَاسِقٍ',english:'"From evil of creation, of darkening night..." (113:2-3)',note:'Four evils: creation, night, witchcraft, envy.'};
const VD_s4={ref:'Al-Falaq 113:4-5',arabic:'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۩ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',english:'"From evil of blowers on knots, and from evil of an envier." (113:4-5)',note:"Sihr is real. Hasad is real. Al-Mu'awwidhatayn is your protection."};
const VD_s5={ref:'Al-Falaq 113:1',arabic:'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',english:'"Say: I seek refuge in the Lord of the daybreak." (113:1)',note:"Al-Mu'awwidhatayn — recite morning, evening, and before sleep."};

/* S1 — Word by Word canvas */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  this.canvas.onclick=()=>showVersePopup(VD_wbw);
  const ctx=this.ctx;
  const words=[
    {ar:'أَعُوذُ',en:"I seek refuge"},{ar:'الْفَلَقِ',en:'daybreak'},
    {ar:'شَرِّ',en:'evil'},{ar:'غَاسِقٍ',en:'dark night'},
    {ar:'النَّفَّاثَاتِ',en:'blowers'},{ar:'الْعُقَدِ',en:'knots'},
    {ar:'حَاسِدٍ',en:'envier'},{ar:'حَسَدَ',en:'when envying'},
  ];
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100828';ctx.fillRect(0,0,CW,CH);
    /* Dawn glow */
    const dg=ctx.createLinearGradient(0,0,CW,0);
    dg.addColorStop(0,'rgba(255,140,60,0.06)');dg.addColorStop(0.5,'rgba(255,180,80,0.12)');dg.addColorStop(1,'rgba(200,80,150,0.06)');
    ctx.fillStyle=dg;ctx.fillRect(0,0,CW,CH);
    /* Floating word cards */
    words.forEach((w,i)=>{
      const col=i%4,row=Math.floor(i/4);
      const bx=18+col*135,by=35+row*85+Math.sin(this.t*0.04+i)*4;
      ctx.fillStyle='rgba(200,160,255,0.08)';ctx.strokeStyle='rgba(160,100,240,0.4)';
      ctx.lineWidth=1;ctx.beginPath();ctx.roundRect?ctx.roundRect(bx,by,118,70,4):ctx.rect(bx,by,118,70);ctx.fill();ctx.stroke();
      ctx.fillStyle='#e0a0f0';ctx.font='15px serif';ctx.textAlign='center';ctx.fillText(w.ar,bx+59,by+30);
      ctx.fillStyle='#a070c0';ctx.font='4px "Press Start 2P",monospace';ctx.fillText(w.en,bx+59,by+54);
      ctx.textAlign='left';
    });
    _lbl(ctx,'CLICK: Full Al-Falaq Word by Word','#fff0ff');
  };draw();
}}

/* S2 — Lord of Dawn */
class S2 extends BS{constructor(){super('canvas-2');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100828';ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#281850';ctx.fillRect(0,CH*0.65,CW,CH*0.35);
    ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🌅',CW/2,CH*0.5);ctx.textAlign='left';
    ctx.fillStyle='#e0a0f0';ctx.font='8px serif';ctx.textAlign='center';
    ctx.fillText('قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',CW/2,CH*0.28);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Seek refuge in the Lord of the Daybreak." (113:1)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Lord of Daybreak — 113:1','#fff0ff');
  };draw();
}}

/* S3 — Four Evils */
class S3 extends BS{constructor(){super('canvas-3');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100828';ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#281850';ctx.fillRect(0,CH*0.65,CW,CH*0.35);
    ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🌑',CW/2,CH*0.5);ctx.textAlign='left';
    ctx.fillStyle='#e0a0f0';ctx.font='8px serif';ctx.textAlign='center';
    ctx.fillText('مِن شَرِّ مَا خَلَقَ',CW/2,CH*0.28);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"From evil of creation, of darkening night..." (113:2-3)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Four Evils — 113:2-5','#fff0ff');
  };draw();
}}

/* S4 — Sihr & Envy */
class S4 extends BS{constructor(){super('canvas-4');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s4);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100828';ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#281850';ctx.fillRect(0,CH*0.65,CW,CH*0.35);
    ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🔮',CW/2,CH*0.5);ctx.textAlign='left';
    ctx.fillStyle='#e0a0f0';ctx.font='8px serif';ctx.textAlign='center';
    ctx.fillText('وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',CW/2,CH*0.28);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"From evil of an envier when they envy." (113:5)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Sihr & Hasad — 113:4-5','#fff0ff');
  };draw();
}}

/* S5 — Al-Falaq Complete */
class S5 extends BS{constructor(){super('canvas-5');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s5);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100828';ctx.fillRect(0,0,CW,CH);
    /* Sunrise gradient */
    const g=ctx.createLinearGradient(0,CH*0.3,0,CH);
    g.addColorStop(0,'rgba(255,180,80,0.35)');g.addColorStop(0.5,'rgba(255,120,50,0.15)');g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
    ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('✨',CW/2,CH*0.5);ctx.textAlign='left';
    ctx.fillStyle='#e0a0f0';ctx.font='8px serif';ctx.textAlign='center';
    ctx.fillText('قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',CW/2,CH*0.3);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('AL-FALAQ COMPLETE! Alhamdulillah!',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Al-Falaq — 113:1','#fff0ff');
  };draw();
}}

const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
