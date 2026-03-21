'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Al-Humazah 104:1',arabic:'وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ',english:'"Woe to every backbiter and slanderer!" (104:1)',note:'Humazah + lumazah = two types of mockery/slander.'};
const VD_s2={ref:'Al-Humazah 104:2-3',arabic:'يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ',english:'"He thinks his wealth made him immortal." (104:3)',note:'Collects, counts, and thinks wealth = eternity. Fatal delusion.'};
const VD_s3={ref:'Al-Humazah 104:4-9',arabic:'كَلَّا لَيُنبَذَنَّ فِي الْحُطَمَةِ',english:'"He shall be flung into Hutamah!" (104:4)',note:'The Crushing Fire. Rises over hearts. Sealed shut.'};
class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#180a04';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381a10';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('👆',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f8a040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Woe to every backbiter and slanderer!" (104:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Woe to Slanderer — 104:1','#fff0d8');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#180a04';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381a10';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('💰',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f8a040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('يَحْسَبُ أَنَّ مَالَهُ أَخْل',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"He thinks his wealth made him immortal." (104:3)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Wealth Delusion — 104:2-3','#fff0d8');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#180a04';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381a10';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🔥',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f8a040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('كَلَّا لَيُنبَذَنَّ فِي الْح',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"He shall be flung into Hutamah!" (104:4)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Hutamah Fire — 104:4-9','#fff0d8');};draw();}}
const scenes={};




const VD_wbw={ref:'Al-Humazah (104)',arabic:'وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ ۩ الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ ۩ كَلَّا لَيُنبَذَنَّ فِي الْحُطَمَةِ ۩ نَارُ اللَّهِ الْمُوقَدَةُ',english:'"Woe to every slanderer and backbiter, who amasses wealth and counts it. No! He will surely be thrown into the Crusher — the fire of Allah, ever-burning." (104:1-2, 4, 6)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🔥',label:'THE CRUSHER',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
