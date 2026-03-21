'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Al-Bayyinah 98:1-3',arabic:'رَسُولٌ مِّنَ اللَّهِ يَتْلُو صُحُفًا مُّطَهَّرَةً',english:'"A Messenger reciting purified scriptures." (98:2)',note:'The Clear Evidence — the Prophet ﷺ himself.'};
const VD_s2={ref:'Al-Bayyinah 98:5',arabic:'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ',english:'"Commanded only to worship Allah sincerely." (98:5)',note:'Sincere devotion + prayer + zakah. Pure religion.'};
const VD_s3={ref:'Al-Bayyinah 98:7',arabic:'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ',english:'"Those who believe and do good — best of creation." (98:7)',note:'Khayrul-bariyya. Not by birth — by iman and deeds.'};
class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#100820';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#262040';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('📜',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#d0a8f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('رَسُولٌ مِّنَ اللَّهِ يَتْلُ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"A Messenger reciting purified scriptures." (98:2)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Clear Evidence — 98:1-3','#f4e8ff');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#100820';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#262040';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🙏',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#d0a8f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('وَمَا أُمِرُوا إِلَّا لِيَعْ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Commanded only to worship Allah sincerely." (98:5)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Pure Worship — 98:5','#f4e8ff');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#100820';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#262040';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('😇',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#d0a8f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('إِنَّ الَّذِينَ آمَنُوا وَعَ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Those who believe and do good — best of creation." (98:7)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Best of Creation — 98:7','#f4e8ff');};draw();}}
const scenes={};




const VD_wbw={ref:'Al-Bayyinah (98)',arabic:'رَسُولٌ مِّنَ اللَّهِ يَتْلُو صُحُفًا مُّطَهَّرَةً ۩ وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ',english:'"A Messenger from Allah reciting purified scriptures. And they were not commanded except to worship Allah, being sincere to Him in religion." (98:2, 5)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'📜',label:'THE CLEAR PROOF',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
