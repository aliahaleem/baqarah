'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'At-Takathur 102:1-4',arabic:'أَلْهَاكُمُ التَّكَاثُرُ ۩ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ ۩ كَلَّا سَوْفَ تَعْلَمُونَ ۩ ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ',english:'"Competing for more distracted you — until you visited the graves. No! You are going to know. Then no! You are going to know." (102:1-4)',note:'...until you visited the graves! Stark wake-up.'};
const VD_s2={ref:'At-Takathur 102:5-6',arabic:'كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ',english:'"If you knew with certain knowledge..." (102:5)',note:'...you would see the Hellfire. Three certainties.'};
const VD_s3={ref:'At-Takathur 102:8',arabic:'ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ',english:'"You will be asked about the blessings." (102:8)',note:'Every blessing. Are we grateful enough?'};
class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#081408';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#182e18';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('💰',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#70c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('أَلْهَاكُمُ التَّكَاثُرُ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Competing for more distracted you..." (102:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Competing for More — 102:1-2','#f0ffe8');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#081408';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#182e18';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('👁️',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#70c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('كَلَّا لَوْ تَعْلَمُونَ عِلْ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"If you knew with certain knowledge..." (102:5)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: If You Knew — 102:5-7','#f0ffe8');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#081408';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#182e18';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('❓',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#70c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('ثُمَّ لَتُسْأَلُنَّ يَوْمَئِ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"You will be asked about the blessings." (102:8)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Questioned About Blessings — 102:8','#f0ffe8');};draw();}}
const scenes={};




const VD_wbw={ref:'At-Takathur (102)',arabic:'أَلْهَاكُمُ التَّكَاثُرُ ۩ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ ۩ كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ ۩ ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ',english:'"Competition for more has distracted you, until you visit the graves. No! If you only knew with certain knowledge. Then you will surely be asked about the pleasures you enjoyed." (102:1-2, 5, 8)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'💰',label:'THE COMPETITION',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
