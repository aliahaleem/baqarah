'use strict';
/* scenes.js — Surah An-Nas (114) */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

const VD_wbw={ref:'An-Nas 114:1-6',arabic:'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۩ مَلِكِ النَّاسِ ۩ إِلَٰهِ النَّاسِ ۩ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۩ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۩ مِنَ الْجِنَّةِ وَالنَّاسِ',english:'"Say: I seek refuge in the Lord, King, and God of mankind — from the whisperer who whispers into chests, from jinn and men." (114:1-6)',note:'20 words. The last surah of the Quran. Learn every word!'};
const VD_s2={ref:'An-Nas 114:1-3',arabic:'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۩ مَلِكِ النَّاسِ ۩ إِلَٰهِ النَّاسِ',english:'"Lord, King, God of Mankind." (114:1-3)',note:'Three titles of divine authority over all of humanity.'};
const VD_s3={ref:'An-Nas 114:4-5',arabic:'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',english:'"The whisperer who withdraws." (114:4)',note:'Shaytan whispers when you forget, retreats when you remember Allah.'};
const VD_s4={ref:'An-Nas 114:5-6',arabic:'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۩ مِنَ الْجِنَّةِ وَالنَّاسِ',english:'"Who whispers into the chests of mankind — from jinn and men." (114:5-6)',note:'The heart is the battlefield. Dhikr is your shield!'};
const VD_s5={ref:'An-Nas 114:1 & Al-Fatihah 1:1',arabic:'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',english:'"Say: I seek refuge in the Lord of mankind." (114:1)',note:'Quran begins: seek guidance. Quran ends: seek protection. SubhanAllah!'};

/* S1 — Word by Word canvas */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  this.canvas.onclick=()=>showVersePopup(VD_wbw);
  const ctx=this.ctx;
  const words=[
    {ar:'رَبِّ',en:'Lord of'},{ar:'مَلِكِ',en:'King of'},
    {ar:'إِلَٰهِ',en:'God of'},{ar:'النَّاسِ',en:'mankind'},
    {ar:'الْوَسْوَاسِ',en:'whisperer'},{ar:'الْخَنَّاسِ',en:'withdrawer'},
    {ar:'صُدُورِ',en:'chests'},{ar:'الْجِنَّةِ',en:'Jinn'},
  ];
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100820';ctx.fillRect(0,0,CW,CH);
    /* Purple radiance */
    const rg=ctx.createRadialGradient(CW/2,CH/2,10,CW/2,CH/2,110);
    rg.addColorStop(0,'rgba(160,100,240,0.15)');rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    /* Floating people at bottom */
    const cols=['#e8c090','#c09060','#f0d0a0','#b08040'];
    for(let i=0;i<8;i++){
      const x=30+i*65,y=CH*0.72;const c=cols[i%4];
      ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();
      ctx.fillRect(x-4,y+5,8,14);
    }
    /* Word cards */
    words.forEach((w,i)=>{
      const col=i%4,row=Math.floor(i/4);
      const bx=18+col*135,by=30+row*85+Math.sin(this.t*0.04+i)*4;
      ctx.fillStyle='rgba(180,120,255,0.08)';ctx.strokeStyle='rgba(140,80,220,0.4)';
      ctx.lineWidth=1;ctx.beginPath();ctx.roundRect?ctx.roundRect(bx,by,118,65,4):ctx.rect(bx,by,118,65);ctx.fill();ctx.stroke();
      ctx.fillStyle='#d0a0f8';ctx.font='15px serif';ctx.textAlign='center';ctx.fillText(w.ar,bx+59,by+28);
      ctx.fillStyle='#9060c0';ctx.font='4px "Press Start 2P",monospace';ctx.fillText(w.en,bx+59,by+50);
      ctx.textAlign='left';
    });
    _lbl(ctx,'CLICK: Full An-Nas Word by Word','#f8f0ff');
  };draw();
}}

/* S2 — Three Titles */
class S2 extends BS{constructor(){super('canvas-2');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);
  const ctx=this.ctx;
  const cols=['#e8c090','#c09060','#f0d0a0','#b08040','#d0a070'];
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100820';ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#281848';ctx.fillRect(0,CH*0.65,CW,CH*0.35);
    /* people crowd */
    for(let i=0;i<12;i++){
      const x=CW*0.05+i*45,y=CH*0.6,c=cols[i%5];
      ctx.fillStyle=c;ctx.beginPath();ctx.arc(x+12,y,5,0,Math.PI*2);ctx.fill();
      ctx.fillRect(x+7,y+5,10,16);
    }
    ctx.fillStyle='#d0a0f8';ctx.font='8px serif';ctx.textAlign='center';
    ctx.fillText('رَبِّ النَّاسِ ۩ مَلِكِ النَّاسِ ۩ إِلَٰهِ النَّاسِ',CW/2,CH*0.28);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Lord, King, God of Mankind." (114:1-3)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Three Titles — 114:1-3','#f8f0ff');
  };draw();
}}

/* S3 — The Whisperer */
class S3 extends BS{constructor(){super('canvas-3');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100820';ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#281848';ctx.fillRect(0,CH*0.65,CW,CH*0.35);
    ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('😈',CW/2,CH*0.5);ctx.textAlign='left';
    ctx.fillStyle='#d0a0f8';ctx.font='8px serif';ctx.textAlign='center';
    ctx.fillText('الْوَسْوَاسِ الْخَنَّاسِ',CW/2,CH*0.28);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"The whisperer who withdraws." (114:4)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Al-Waswas — 114:4','#f8f0ff');
  };draw();
}}

/* S4 — The Chests */
class S4 extends BS{constructor(){super('canvas-4');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s4);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100820';ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#281848';ctx.fillRect(0,CH*0.65,CW,CH*0.35);
    ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🛡️',CW/2,CH*0.5);ctx.textAlign='left';
    const rg=ctx.createRadialGradient(CW/2,CH*0.5,10,CW/2,CH*0.5,60);
    rg.addColorStop(0,'rgba(180,130,240,0.2)');rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#d0a0f8';ctx.font='8px serif';ctx.textAlign='center';
    ctx.fillText('يُوَسْوِسُ فِي صُدُورِ النَّاسِ',CW/2,CH*0.28);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Whispers into the chests of mankind." (114:5)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Sudur — 114:5-6','#f8f0ff');
  };draw();
}}

/* S5 — An-Nas / Quran Complete */
class S5 extends BS{constructor(){super('canvas-5');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s5);
  const ctx=this.ctx;
  const cols=['#e8c090','#c09060','#f0d0a0','#b08040','#d0a070'];
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#100820';ctx.fillRect(0,0,CW,CH);
    const rg=ctx.createRadialGradient(CW/2,CH/2,10,CW/2,CH/2,100);
    rg.addColorStop(0,'rgba(180,130,240,0.35)');rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    for(let i=0;i<12;i++){
      const x=CW*0.05+i*45,y=CH*0.62,c=cols[i%5];
      ctx.fillStyle=c;ctx.beginPath();ctx.arc(x+12,y,5,0,Math.PI*2);ctx.fill();
      ctx.fillRect(x+7,y+5,10,16);
    }
    ctx.fillStyle='#d0a0f8';ctx.font='8px serif';ctx.textAlign='center';
    ctx.fillText('🎊 JUZ AMMA COMPLETE! 🎊',CW/2,CH*0.3);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('MashAllah! Quran Quest Complete!',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: An-Nas — 114:1','#f8f0ff');
  };draw();
}}

const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
