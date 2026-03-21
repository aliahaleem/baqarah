'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Al-Qadr 97:1',arabic:'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',english:'"We sent it down on the Night of Power." (97:1)',note:'One night. The Quran revealed. Better than 1000 months.'};
const VD_s2={ref:'Al-Qadr 97:4',arabic:'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا',english:'"Angels and Ruh descend in it." (97:4)',note:'Every decree for the year. Angels of provision, health, guidance.'};
const VD_s3={ref:'Al-Qadr 97:5',arabic:'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',english:'"Peace until the break of dawn." (97:5)',note:'Pure peace. The entire night until Fajr.'};
class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#080c1e';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#182438';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🌃',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#c0d0f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('إِنَّا أَنزَلْنَاهُ فِي لَيْ',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"We sent it down on the Night of Power." (97:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Night of Power — 97:1','#f0f4ff');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#080c1e';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#182438';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('👼',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#c0d0f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('تَنَزَّلُ الْمَلَائِكَةُ وَا',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Angels and Ruh descend in it." (97:4)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Angels Descend — 97:4','#f0f4ff');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#080c1e';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#182438';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('✨',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#c0d0f8';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('سَلَامٌ هِيَ حَتَّىٰ مَطْلَع',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Peace until the break of dawn." (97:5)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Peace Until Fajr — 97:5','#f0f4ff');};draw();}}
const scenes={};




const VD_wbw={ref:'Al-Qadr (97)',arabic:'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۩ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ ۩ تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا ۩ سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',english:'"Indeed, We sent it down during the Night of Decree. The Night of Decree is better than a thousand months. The angels and the Spirit descend therein. Peace it is until the emergence of dawn." (97:1, 3-5)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🌙',label:'THE NIGHT OF DECREE',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
