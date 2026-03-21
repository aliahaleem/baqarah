'use strict';
window.SCENE_PALETTE = {
  minecraft: {sky0:'var(--bg)',sky1:'var(--bg2)',gnd:'var(--surface)',acc:'var(--accent)',label:'var(--text)',hint:'var(--text-dim)'},
  stars: {sky0:'var(--bg)',sky1:'var(--bg2)',gnd:'var(--surface)',acc:'var(--accent)',label:'var(--text)',hint:'var(--text-dim)'},
};

/* scenes.js — duha */
function _sky(ctx,c0,c1){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,c0);g.addColorStop(1,c1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _label(ctx,t,col,y=15){ctx.fillStyle=col;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(t,CW/2,y);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc){ctx.fillStyle=hc;ctx.fillRect(x+P,y,P*3,P*3);ctx.fillStyle=bc;ctx.fillRect(x,y+P*3,P*5,P*4);ctx.fillStyle=pc;ctx.fillRect(x,y+P*7,P*2,P*4);ctx.fillRect(x+P*3,y+P*7,P*2,P*4);}
const VD_dawn={ref:'Ad-Duha 93:1-3',arabic:'وَالضُّحَىٰ ۩ وَاللَّيْلِ إِذَا سَجَىٰ',english:'"By the morning brightness and the night when it settles still." (93:1-2)',note:'The contrast: morning brightness (hope, energy, revelation) and still night (pause, quiet). When revelation paused, Allah swore by both — the cycle always continues.'};
const VD_blessing={ref:'Ad-Duha 93:6-8',arabic:'أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ ۩ وَوَجَدَكَ ضَالًّا فَهَدَىٰ ۩ وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ',english:'"Did He not find you an orphan and shelter you? Find you wandering and guide you? Find you poor and enrich you?" (93:6-8)',note:'Three rhetorical questions — each a reminder of His care. From orphan to the most loved human in history. From uncertain to guided prophet. From poor to content. SubhanAllah.'};
const VD_duty={ref:'Ad-Duha 93:9-11',arabic:'فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ ۩ وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ ۩ وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ',english:'"Do not oppress the orphan. Do not drive away the asker. And proclaim the blessings of your Lord." (93:9-11)',note:'Three duties match the three blessings received. Were sheltered as orphan → protect orphans. Were guided → welcome those who ask. Were enriched → proclaim and share blessings.'};
const VD_reassurance={ref:'Ad-Duha 93:3-5',arabic:'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۩ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ',english:'"Your Lord has not forsaken you, nor does He hate you. And the Hereafter is better for you than the first." (93:3-4)',note:'When you feel alone, forgotten, or abandoned — remember Ad-Duha. Allah said these words directly to His beloved Prophet ﷺ in his darkest moment. He says them to every believing heart.'};
class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_dawn);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#1e0c06');g.addColorStop(1,'#3a2010');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);const sg=ctx.createRadialGradient(CW*0.7,40,3,CW*0.7,40,50+Math.sin(this.t*0.04)*5);sg.addColorStop(0,'rgba(255,200,80,0.9)');sg.addColorStop(1,'transparent');ctx.fillStyle=sg;ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#ffe080';ctx.beginPath();ctx.arc(CW*0.7,40,16,0,Math.PI*2);ctx.fill();ctx.fillStyle='#4a2a10';ctx.fillRect(0,CH*0.7,CW,CH*0.3);_label(ctx,'CLICK: The Oath of Dawn — 93:1-2','#fff4e0');};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_blessing);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1e0c06';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#3a1a08';ctx.fillRect(0,CH*0.65,CW,CH*0.35);const emojis=['🏠','🧭','💛'];emojis.forEach((e,i)=>{ctx.font='22px serif';ctx.textAlign='center';ctx.fillText(e,CW*0.2+i*CW*0.3,CH*0.5);ctx.textAlign='left';});ctx.fillStyle='#f8b050';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('Orphan→Sheltered | Wandering→Guided | Poor→Enriched',CW/2,CH-8);ctx.textAlign='left';_label(ctx,'CLICK: Three Blessings — 93:6-8','#fff4e0');};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_duty);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1e0c06';ctx.fillRect(0,0,CW,CH);ctx.fillStyle='#3a1a08';ctx.fillRect(0,CH*0.65,CW,CH*0.35);_fig(ctx,80,110,'#e8c090','#204080','#102060');_fig(ctx,240,110,'#d0b080','#603010','#401808');const ap=0.4+Math.sin(this.t*0.06)*0.3;ctx.fillStyle=`rgba(248,176,80,${ap})`;ctx.font='12px serif';ctx.textAlign='center';ctx.fillText('📣',CW*0.75,130);ctx.textAlign='left';ctx.fillStyle='#f8b050';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('Protect orphans · Welcome askers · Proclaim blessings',CW/2,CH-8);ctx.textAlign='left';_label(ctx,'CLICK: Three Duties — 93:9-11','#fff4e0');};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD_reassurance);const ctx=this.ctx;const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);ctx.fillStyle='#1e0c06';ctx.fillRect(0,0,CW,CH);const glow=0.15+Math.sin(this.t*0.04)*0.08;const rg=ctx.createRadialGradient(CW/2,CH*0.5,5,CW/2,CH*0.5,100);rg.addColorStop(0,`rgba(248,176,80,${glow*3})`);rg.addColorStop(1,'transparent');ctx.fillStyle=rg;ctx.fillRect(0,0,CW,CH);_fig(ctx,CW/2-10,100,'#f0d090','#204080','#102060');ctx.fillStyle='#f8b050';ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('مَا وَدَّعَكَ رَبُّكَ',CW/2,85);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Your Lord has not forsaken you"',CW/2,CH-8);ctx.textAlign='left';_label(ctx,'CLICK: Never Forsaken — 93:3-5','#fff4e0');};draw();}}
const scenes={};


const VD_wbw={ref:'Ad-Duha (93)',arabic:'وَالضُّحَىٰ ۩ وَاللَّيْلِ إِذَا سَجَىٰ ۩ مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۩ فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ',english:'"By the morning brightness, and the night when it covers with darkness — your Lord has not forsaken you nor hated you. So as for the orphan, do not oppress." (93:1-3, 9)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🌅',label:'THE MORNING HOURS',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
