'use strict';
/* scenes.js — Surah Al-Ikhlas (112) */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

const VD_wbw={ref:'Al-Ikhlas 112:1-4',arabic:'قُلْ هُوَ اللَّهُ أَحَدٌ ۩ اللَّهُ الصَّمَدُ ۩ لَمْ يَلِدْ وَلَمْ يُولَدْ ۩ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',english:'"Say: He is Allah, One. Allah — the Eternal Refuge. He did not beget, nor was He begotten. And there is none equal to Him." (112:1-4)',note:'15 words. Each one a universe of meaning. Learn them all!'};
const VD_ahad={ref:'Al-Ikhlas 112:1',arabic:'قُلْ هُوَ اللَّهُ أَحَدٌ',english:'"Say: He is Allah, One." (112:1)',note:'Ahad — uniquely singular. No division, no parts, nothing comparable.'};
const VD_samad={ref:'Al-Ikhlas 112:2',arabic:'اللَّهُ الصَّمَدُ',english:'"Allah — the Everlasting Refuge." (112:2)',note:'Al-Samad: everything depends on Him, He depends on nothing.'};
const VD_none={ref:'Al-Ikhlas 112:3-4',arabic:'لَمْ يَلِدْ وَلَمْ يُولَدْ ۩ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',english:'"He neither begets nor was He born. And none is equal." (112:3-4)',note:'Refutes: children of God. Refutes: God being born. Nothing equals Him.'};

/* S1 — Word by Word canvas: clean radiant scene, no word cards */
class S1 extends BS{constructor(){super('canvas-1');}start(){
  if(!this.ctx)return;
  this.canvas.onclick=()=>showVersePopup(VD_wbw);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    const t2=this.t;
    ctx.fillStyle='#060610';ctx.fillRect(0,0,CW,CH);
    /* Pulsing radiant core */
    const pulse=0.18+Math.sin(t2*0.03)*0.06;
    const rg=ctx.createRadialGradient(CW/2,CH*0.52,4,CW/2,CH*0.52,90+Math.sin(t2*0.02)*8);
    rg.addColorStop(0,`rgba(240,225,150,${pulse*1.8})`);
    rg.addColorStop(0.45,`rgba(210,190,100,${pulse*0.7})`);
    rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    /* Rotating rays */
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2+t2*0.004;
      const len=55+Math.sin(t2*0.05+i)*10;
      ctx.strokeStyle=`rgba(240,225,130,${0.12+Math.sin(t2*0.03+i)*0.04})`;
      ctx.lineWidth=2;ctx.beginPath();
      ctx.moveTo(CW/2,CH*0.52);
      ctx.lineTo(CW/2+Math.cos(a)*len,CH*0.52+Math.sin(a)*len);
      ctx.stroke();
    }
    /* Central Arabic word */
    ctx.fillStyle=`rgba(240,228,160,${0.85+Math.sin(t2*0.04)*0.1})`;
    ctx.font='28px serif';ctx.textAlign='center';
    ctx.fillText('اللَّهُ أَحَدٌ',CW/2,CH*0.56);
    ctx.fillStyle='rgba(200,185,120,0.6)';
    ctx.font='5px "Press Start 2P",monospace';
    ctx.fillText('"Allah — One." · Tap cards below to learn each word',CW/2,CH-10);
    ctx.textAlign='left';
    _lbl(ctx,'CLICK: Full Al-Ikhlas 112:1-4','#fff8f0');
  };draw();
}}

/* S2 — Ahad & Samad */
class S2 extends BS{constructor(){super('canvas-2');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_ahad);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#0c0c1e';ctx.fillRect(0,0,CW,CH);
    const glow=0.15+Math.sin(this.t*0.04)*0.08;
    const rg=ctx.createRadialGradient(CW/2,CH*0.5,5,CW/2,CH*0.5,80+Math.sin(this.t*0.03)*8);
    rg.addColorStop(0,`rgba(230,220,140,${glow*2})`);rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#e8e0a0';ctx.font='24px serif';ctx.textAlign='center';ctx.fillText('اللَّهُ أَحَدٌ',CW/2,CH*0.5);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Allah is ONE" — unique and singular (112:1)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Allahu Ahad — 112:1','#fff8f0');
  };draw();
}}

/* S3 — Four Attributes drag */
class S3 extends BS{constructor(){super('canvas-3');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_samad);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#0c0c1e';ctx.fillRect(0,0,CW,CH);
    const items=['🌍','🌙','🌟','💫'];
    items.forEach((e,i)=>{
      ctx.font='14px serif';ctx.textAlign='center';
      const a=i*Math.PI/2+this.t*0.01;
      ctx.fillText(e,CW/2+60*Math.cos(a),CH*0.5+50*Math.sin(a));ctx.textAlign='left';
    });
    ctx.fillStyle='#e8e0a0';ctx.font='10px serif';ctx.textAlign='center';
    ctx.fillText('الصَّمَدُ',CW/2,CH*0.5);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('All depend on Him — He needs nothing (112:2)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: Al-Samad — 112:2','#fff8f0');
  };draw();
}}

/* S4 — Pure Tawhid final */
class S4 extends BS{constructor(){super('canvas-4');}start(){
  if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_none);
  const ctx=this.ctx;
  const draw=()=>{
    this.t++;this.raf=requestAnimationFrame(draw);
    ctx.fillStyle='#0c0c1e';ctx.fillRect(0,0,CW,CH);
    const glow=0.15+Math.sin(this.t*0.04)*0.08;
    const rg=ctx.createRadialGradient(CW/2,CH*0.5,5,CW/2,CH*0.5,90);
    rg.addColorStop(0,`rgba(230,220,140,${glow*2})`);rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);
    ctx.fillStyle='#e8e0a0';ctx.font='9px serif';ctx.textAlign='center';
    ctx.fillText('وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',CW/2,CH*0.45);
    ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Nothing is equal to Allah" — Pure Tawhid! (112:4)',CW/2,CH-8);
    ctx.textAlign='left';_lbl(ctx,'CLICK: None Equal — 112:3-4','#fff8f0');
  };draw();
}}

const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
