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

/* S1 — Word by Word canvas: clean people + shield scene, no word cards */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  this.canvas.onclick=()=>showVersePopup(VD_wbw);
  const ctx=this.ctx;
  const skinTones=['#e8c090','#c09060','#f0d0a0','#b08040','#d0a070'];
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    const t2=this.t;
    ctx.fillStyle='#080318';ctx.fillRect(0,0,CW,CH);
    /* Soft purple glow behind crowd */
    const rg=ctx.createRadialGradient(CW/2,CH*0.65,5,CW/2,CH*0.65,130);
    rg.addColorStop(0,`rgba(140,90,220,${0.18+Math.sin(t2*0.025)*0.06})`);
    rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    /* Stars */
    [[55,20],[140,12],[250,30],[340,16],[460,25],[510,40],[75,45],[390,35],[180,50]].forEach(([x,y],i)=>{
      const twinkle=0.4+Math.sin(t2*0.05+i)*0.25;
      ctx.fillStyle=`rgba(220,200,255,${twinkle})`;
      ctx.beginPath();ctx.arc(x,y,0.8,0,Math.PI*2);ctx.fill();
    });
    /* People crowd — spread across the full width */
    const count=11;
    for(let i=0;i<count;i++){
      const x=28+i*(CW-56)/(count-1);
      const bobY=CH*0.62+Math.sin(t2*0.04+i*0.7)*2;
      const sk=skinTones[i%5];
      /* body */
      ctx.fillStyle=sk;
      ctx.beginPath();ctx.arc(x,bobY,7,0,Math.PI*2);ctx.fill();
      ctx.fillRect(x-5,bobY+7,10,16);
    }
    /* Protection shield arc above crowd */
    const shieldAlpha=0.12+Math.sin(t2*0.02)*0.04;
    const sg=ctx.createRadialGradient(CW/2,CH*0.7,60,CW/2,CH*0.7,160);
    sg.addColorStop(0,'transparent');
    sg.addColorStop(0.85,`rgba(180,130,255,${shieldAlpha})`);
    sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg;ctx.fillRect(0,0,CW,CH);
    /* Central Arabic */
    ctx.fillStyle='rgba(208,165,248,0.92)';ctx.font='15px serif';ctx.textAlign='center';
    ctx.fillText('قُلْ أَعُوذُ بِرَبِّ النَّاسِ',CW/2,CH*0.33);
    ctx.fillStyle='rgba(170,130,210,0.55)';ctx.font='5px "Press Start 2P",monospace';
    ctx.fillText('"Seek refuge in the Lord of Mankind" · Tap cards below',CW/2,CH-10);
    ctx.textAlign='left';
    _lbl(ctx,'CLICK: Full An-Nas 114:1-6','#f8f0ff');
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
