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

/* S1 — Word by Word canvas: clean dawn scene, no word cards */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  this.canvas.onclick=()=>showVersePopup(VD_wbw);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    const t2=this.t;
    /* Deep night sky */
    ctx.fillStyle='#080418';ctx.fillRect(0,0,CW,CH);
    /* Stars fading out */
    const starFade=Math.max(0,0.5-t2*0.002);
    if(starFade>0){
      ctx.fillStyle=`rgba(255,255,255,${starFade})`;
      [[40,30],[120,18],[230,45],[310,22],[420,38],[500,15],[90,55],[370,50]].forEach(([x,y])=>{
        ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fill();
      });
    }
    /* Dawn horizon rising */
    const dawnY=CH*(0.55+Math.sin(t2*0.008)*0.05);
    const dg=ctx.createLinearGradient(0,dawnY,0,CH);
    dg.addColorStop(0,`rgba(255,160,60,${0.25+Math.sin(t2*0.02)*0.05})`);
    dg.addColorStop(0.4,'rgba(255,100,30,0.12)');
    dg.addColorStop(1,'transparent');
    ctx.fillStyle=dg;ctx.fillRect(0,0,CW,CH);
    /* Horizon line */
    ctx.strokeStyle=`rgba(255,175,70,${0.3+Math.sin(t2*0.02)*0.08})`;
    ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,dawnY);ctx.lineTo(CW,dawnY);ctx.stroke();
    /* Sun peeking */
    const sunY=dawnY+Math.sin(t2*0.015)*4;
    const sunRg=ctx.createRadialGradient(CW/2,sunY,2,CW/2,sunY,32);
    sunRg.addColorStop(0,'rgba(255,220,100,0.7)');
    sunRg.addColorStop(0.5,'rgba(255,160,50,0.25)');
    sunRg.addColorStop(1,'transparent');
    ctx.fillStyle=sunRg;ctx.fillRect(0,0,CW,CH);
    /* Central Arabic */
    ctx.fillStyle='rgba(255,210,120,0.9)';ctx.font='18px serif';ctx.textAlign='center';
    ctx.fillText('قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',CW/2,CH*0.38);
    ctx.fillStyle='rgba(220,170,80,0.55)';ctx.font='5px "Press Start 2P",monospace';
    ctx.fillText('"Seek refuge in the Lord of the Daybreak" · Tap cards below',CW/2,CH-10);
    ctx.textAlign='left';
    _lbl(ctx,'CLICK: Full Al-Falaq 113:1-5','#fff0ff');
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
