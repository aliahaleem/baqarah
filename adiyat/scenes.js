'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Al-Adiyat 100:1-5',arabic:'وَالْعَادِيَاتِ ضَبْحًا',english:'"By the charging mares panting." (100:1)',note:'Five oaths: panting, sparking, dawn raid, dust, charge.'};
const VD_s2={ref:'Al-Adiyat 100:6-8',arabic:'إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ',english:'"Man is ungrateful to his Lord." (100:6)',note:'Kanud — ungrateful, withholding. Fierce for wealth.'};
const VD_s3={ref:'Al-Adiyat 100:9-11',arabic:'أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ',english:'"Does he not know when graves are emptied?" (100:9)',note:'Secrets revealed. Lord All-Aware on that Day.'};
class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#180c02';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#3a1a08';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🐎',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#e8c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('وَالْعَادِيَاتِ ضَبْحًا',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"By the charging mares panting." (100:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Charging Horses — 100:1-5','#fff8e0');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#180c02';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#3a1a08';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('💔',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#e8c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('إِنَّ الْإِنسَانَ لِرَبِّهِ ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Man is ungrateful to his Lord." (100:6)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Human Ingratitude — 100:6-8','#fff8e0');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#180c02';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#3a1a08';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('💀',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#e8c040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('أَفَلَا يَعْلَمُ إِذَا بُعْث',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Does he not know when graves are emptied?" (100:9)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Graves Emptied — 100:9-11','#fff8e0');};draw();}}
const scenes={};




const VD_wbw={ref:'Al-Adiyat (100)',arabic:'وَالْعَادِيَاتِ ضَبْحًا ۩ إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ ۩ أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ ۩ وَحُصِّلَ مَا فِي الصُّدُورِ',english:'"By the charging steeds, panting — indeed mankind is ungrateful to his Lord. Does he not know that when the contents of the graves are scattered and what is within the chests is obtained?" (100:1, 6, 9-10)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🐎',label:'THE CHARGING STEEDS',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
