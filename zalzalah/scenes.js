'use strict';
/* scenes.js */
const CW=560,CH=220,P=4;
function _lbl(ctx,t,c,y){ctx.fillStyle=c||'#ffffff';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y||15);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc,r){const S=document.documentElement.getAttribute('data-theme')==='stars';ctx.fillStyle=hc;if(S&&r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x+P,y,P*3,P*3,2);else ctx.rect(x+P,y,P*3,P*3);ctx.fill();}else ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}
const VD_s1={ref:'Az-Zalzalah 99:1-3',arabic:'إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا ۩ وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا ۩ وَقَالَ الْإِنسَانُ مَا لَهَا',english:'"When the earth is shaken with its final earthquake, and the earth discharges its burdens, and man says, \'What is wrong with it?\'" (99:1-3)',note:'Heavy burdens emerge. The dead rise. Man is bewildered.'};
const VD_s2={ref:'Az-Zalzalah 99:4-6',arabic:'يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا ۩ بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا ۩ يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِّيُرَوْا أَعْمَالَهُمْ',english:'"That Day it will report its news, because your Lord has commanded it. That Day, the people will depart separated to be shown their deeds." (99:4-6)',note:'The earth speaks all that happened upon it. People scatter to see their deeds.'};
const VD_s3={ref:'Az-Zalzalah 99:7-8',arabic:'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',english:'"An atom\'s weight of good — he will see it." (99:7)',note:'Every deed. Atom by atom. Nothing forgotten.'};
class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s1);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1a0c04';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381e10';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('🌍',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f8a040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('إِذَا زُلْزِلَتِ الْأَرْضُ ز',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"When the earth is shaken fully." (99:1)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: The Earthquake — 99:1-2','#fff0d8');};draw();}}
class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s2);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1a0c04';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381e10';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('📣',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f8a040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('يَوْمَئِذٍ تُحَدِّثُ أَخْبَا',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"That Day it will report its news." (99:4)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,'CLICK: Earth Confesses — 99:4-5','#fff0d8');};draw();}}
class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_s3);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1a0c04';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#381e10';ctx.fillRect(0,CH*0.65,CW,CH*0.35);ctx.font='26px serif';ctx.textAlign='center';ctx.fillText('⚖️',CW/2,CH*0.5);ctx.textAlign='left';ctx.fillStyle='#f8a040';ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('فَمَن يَعْمَلْ مِثْقَالَ ذَر',CW/2,CH*0.28);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"An atom\'s weight of good — he will see it." (99:7)',CW/2,CH-8);ctx.textAlign='left';_lbl(ctx,"CLICK: Atom's Weight — 99:7-8",'#fff0d8');};draw();}}
const scenes={};




const VD_wbw={ref:'Az-Zalzalah (99)',arabic:'إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا ۩ يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا ۩ فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۩ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ',english:'"When the earth is shaken with its final earthquake, that Day it will report its news. So whoever does an an atoms weight of good will see it, and whoever does an an atoms weight of evil will see it." (99:1, 4, 7-8)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🌍',label:'THE EARTHQUAKE',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
