'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'At-Tin 95:1-3',arabic:'وَالتِّينِ وَالزَّيْتُونِ',english:'"By the fig and the olive..." (95:1)',note:'Fig, Olive, Mt Sinai, Mecca — four sacred oaths.'};
const VD_s2={ref:'At-Tin 95:4-6',arabic:'لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ ۩ ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ ۩ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ',english:'"Created man in the finest of forms — then We returned him to the lowest of the low — except for those who believe and do righteous deeds, for they will have a reward uninterrupted." (95:4-6)',note:'Best form — but can fall to lowest without faith.'};
const VD_s3={ref:'At-Tin 95:7-8',arabic:'أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ',english:'"Is Allah not the Most Just of Judges?" (95:8)',note:'Yes! He gave us the best form — He will judge with perfect justice.'};
class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#0c1804';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#1e300e';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🫐',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#c8d040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('وَالتِّينِ وَالزَّيْتُونِ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"By the fig and the olive..." (95:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Four Sacred Oaths — 95:1-3','#f0ffd8');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#0c1804';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#1e300e';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🧠',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#c8d040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('لَقَدْ خَلَقْنَا الْإِنسَانَ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Created man in the finest of forms." (95:4)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Best of Forms — 95:4','#f0ffd8');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#0c1804';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#1e300e';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('⚖️',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#c8d040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('أَلَيْسَ اللَّهُ بِأَحْكَمِ ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Is Allah not the Most Just of Judges?" (95:8)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Most Just Judge — 95:8','#f0ffd8');};draw();}}
const scenes={};




const VD_wbw={ref:'At-Tin (95)',arabic:'وَالتِّينِ وَالزَّيْتُونِ ۩ وَطُورِ سِينِينَ ۩ لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ ۩ أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ',english:'"By the fig and the olive, and Mount Sinai — We have created man in the best of stature. Is not Allah the most just of judges?" (95:1-2, 4, 8)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🫒',label:'THE FIG',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
