'use strict';
// SURAH AL-INFITAR (82) — scenes.js
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.dataset.theme==='stars';return s?{sky0:'#1a2850',sky1:'#223268',sky2:'#2e4080',gnd:'#3a4e90',gndAcc:'#4a5ea0',starStr:'rgba(180,220,255,',acStr:'rgba(128,232,248,',label:'#80e8f8',hint:'#50c0d8'}:{sky0:'#020818',sky1:'#051428',sky2:'#0a1e38',gnd:'#0f2840',gndAcc:'#183050',starStr:'rgba(100,180,255,',acStr:'rgba(64,208,232,',label:'#40d0e8',hint:'#20a8c0'};}
function fillRect(ctx,x,y,w,h,col){if(col)ctx.fillStyle=col;const rx=Math.round(x),ry=Math.round(y),rw=Math.round(w),rh=Math.round(h);if(document.documentElement.dataset.theme==='stars'&&rw<120&&rh<120&&rw>4&&rh>4){const r=Math.min(rw*0.3,rh*0.3,7);ctx.shadowColor='rgba(80,120,200,0.2)';ctx.shadowBlur=3;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(rx,ry,rw,rh,r);else ctx.rect(rx,ry,rw,rh);ctx.fill();ctx.shadowBlur=0;}else{ctx.fillRect(rx,ry,rw,rh);}}
function _sky(ctx){const p=sceneP();const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(0.6,p.sky1);g.addColorStop(1,p.sky2);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _stars(ctx){const p=sceneP();[[80,22],[150,40],[260,15],[340,30],[440,18],[510,42],[60,60],[200,55],[390,48]].forEach(([x,y],i)=>{ctx.fillStyle=p.starStr+(0.3+i%4*0.18)+')';ctx.beginPath();ctx.arc(x,y,i%3===0?1.5:1,0,Math.PI*2);ctx.fill();});}
function _ground(ctx,y=170){const p=sceneP();fillRect(ctx,0,y,CW,CH-y,p.gnd);fillRect(ctx,0,y,CW,5,p.gndAcc);}
function _label(ctx,txt,y=18){ctx.fillStyle=sceneP().label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(txt,CW/2,y);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc){fillRect(ctx,x+P,y,P*3,P*3,hc);fillRect(ctx,x,y+P*3,P*5,P*4,bc);fillRect(ctx,x-P,y+P*3,P,P*3,hc);fillRect(ctx,x+P*5,y+P*3,P,P*3,hc);fillRect(ctx,x,y+P*7,P*2,P*4,pc);fillRect(ctx,x+P*3,y+P*7,P*2,P*4,pc);}

const VD={
  signs:{ref:'Al-Infitar 82:1-5',arabic:'إِذَا السَّمَاءُ انفَطَرَتْ ۩ وَإِذَا الْكَوَاكِبُ انتَثَرَتْ ۩ وَإِذَا الْبِحَارُ فُجِّرَتْ ۩ وَإِذَا الْقُبُورُ بُعْثِرَتْ ۩ عَلِمَتْ نَفْسٌ مَّا قَدَّمَتْ وَأَخَّرَتْ',english:'"When the sky is cleft asunder — when the stars are scattered — when the seas are burst forth — when the graves are overturned — a soul will know what it has put forward and left behind." (82:1-5)',note:'"Infatarat" — split open, cleaved apart. The sky cracks open. Stars "intatharat" — scattered in every direction. Seas "fujjirat" — burst through their bounds and overflow. Graves "bu\'thirat" — overturned, their contents thrown up. And THEN: a soul knows what it prepared.'},
  deceived:{ref:'Al-Infitar 82:6-8',arabic:'يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ ۩ الَّذِي خَلَقَكَ فَسَوَّاكَ فَعَدَلَكَ ۩ فِي أَيِّ صُورَةٍ مَّا شَاءَ رَكَّبَكَ',english:'"O man! What has deceived you about your generous Lord — who created you, proportioned you, and assembled you? In whatever form He willed, He assembled you." (82:6-8)',note:'"Ma gharraka bi-Rabbika al-Karim?" — What DECEIVED you? The word "gharraka" means deception, false confidence. And notice: He calls Himself "al-Karim" — the Generous. You took His generosity for granted and thought it meant you would never be held accountable.'},
  angels:{ref:'Al-Infitar 82:10-12',arabic:'وَإِنَّ عَلَيْكُمْ لَحَافِظِينَ ۩ كِرَامًا كَاتِبِينَ ۩ يَعْلَمُونَ مَا تَفْعَلُونَ',english:'"Indeed over you are guardians — noble recorders — who know everything you do." (82:10-12)',note:'Three descriptions of the Kiraman Katibin (noble recording angels): 1) Hafizin — guardians, protectors (not spies, but custodians of your record). 2) Kiraman Katibin — noble recorders — NOBLE. They are honoured beings. 3) They KNOW everything you do. Nothing is missed. This is complete, perfect accountability.'},
  destiny:{ref:'Al-Infitar 82:13-16',arabic:'إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ ۩ وَإِنَّ الْفُجَّارَ لَفِي جَحِيمٍ ۩ يَصْلَوْنَهَا يَوْمَ الدِّينِ ۩ وَمَا هُمْ عَنْهَا بِغَائِبِينَ',english:'"Indeed the righteous will be in bliss — and indeed the wicked will be in Hell — they will enter it on the Day of Recompense — and they will not be absent from it." (82:13-16)',note:'"Al-Abrar" — the righteous, the God-fearing. "Al-Fujjar" — the wicked, the sinners. The contrast is absolute. And the end of 82:16 is chilling: "Wa ma hum anha bi-gha\'ibin" — they will NOT be absent from it. No escape, no temporary reprieve.'},
  yawm:{ref:'Al-Infitar 82:17-19',arabic:'وَمَا أَدْرَاكَ مَا يَوْمُ الدِّينِ ۩ ثُمَّ مَا أَدْرَاكَ مَا يَوْمُ الدِّينِ ۩ يَوْمَ لَا تَمْلِكُ نَفْسٌ لِّنَفْسٍ شَيْئًا وَالْأَمْرُ يَوْمَئِذٍ لِّلَّهِ',english:'"And what would make you know what the Day of Recompense is? Then what would make you know what the Day of Recompense is? It is the Day when no soul will have power for another soul at all, and the command that Day is entirely for Allah." (82:17-19)',note:'The repeated question — "Wa ma adraka ma yawm al-din?" twice — is a rhetorical device of enormity. It says: the Day is so beyond comprehension that asking once is not enough. Then the definition: no soul helps another. No intercession by permission given. Allah alone commands.'},
};

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S1 extends BS{constructor(){super('canvas-1');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.signs);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_label(ctx,'CLICK: When the Sky Splits — 82:1-5');
// Sky crack
const pulse=0.6+Math.sin(this.t*0.04)*0.4;ctx.strokeStyle=`rgba(128,232,248,${pulse})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(CW/2-30,0);ctx.lineTo(CW/2-10,40);ctx.lineTo(CW/2+20,80);ctx.lineTo(CW/2+5,CH);ctx.stroke();
ctx.strokeStyle=`rgba(128,232,248,${pulse*0.5})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(CW/2+50,0);ctx.lineTo(CW/2+30,50);ctx.lineTo(CW/2+60,CH);ctx.stroke();
// Stars scattering
for(let i=0;i<6;i++){const sx=((this.t*0.5+i*90)%CW);const sy=((this.t*0.3+i*35)%CH);ctx.fillStyle=p.acStr+'0.8)';ctx.beginPath();ctx.arc(sx,sy,2,0,Math.PI*2);ctx.fill();}
// Graves overturning
_ground(ctx,165);[[80,155],[200,160],[350,158],[480,155]].forEach(([gx,gy])=>{fillRect(ctx,gx-10,gy,20,10,p.gndAcc);});
_label(ctx,'"A soul will know what it put forward and left behind" (82:5)',CH-15);};draw();}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.deceived);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_ground(ctx,170);_label(ctx,'CLICK: "O Man, What Has Deceived You?" — 82:6-8');
// Human figure looking proud
_fig(ctx,CW/2-10,100,'#e8c39a','#3a5a80','#1a2840');
// Crown symbol above (pride/deception)
ctx.fillStyle=p.acStr+'0.7)';ctx.font='18px sans-serif';ctx.textAlign='center';ctx.fillText('👑',CW/2,88);ctx.textAlign='left';
// Question marks
ctx.fillStyle='#ff8888';ctx.font='12px "Press Start 2P",monospace';ctx.textAlign='center';
ctx.fillText('?',CW/2-80,120);ctx.fillText('?',CW/2+80,115);ctx.textAlign='left';
ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"What DECEIVED you about your Generous Lord?" (82:6)',CW/2,CH-15);ctx.textAlign='left';};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.angels);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_ground(ctx,175);_label(ctx,'CLICK: The Recording Angels — 82:10-12');
// Two angels flanking a person
const off=Math.sin(this.t*0.03)*4;
// Right angel (writing)
ctx.fillStyle='rgba(200,230,255,0.7)';ctx.beginPath();ctx.ellipse(380,90+off,25,12,0.3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(440,90+off,25,12,-0.3,0,Math.PI*2);ctx.fill();
fillRect(ctx,404,78+off,12,30,'#f0eee8');fillRect(ctx,405,70+off,10,10,'#e8c39a');
// Scroll in angel's hand
fillRect(ctx,418,85+off,14,18,'#fffff0');ctx.fillStyle='#2a2060';ctx.font='4px monospace';ctx.textAlign='center';ctx.fillText('كَاتِب',425,96+off);ctx.textAlign='left';
// Left angel
ctx.fillStyle='rgba(200,230,255,0.7)';ctx.beginPath();ctx.ellipse(140,90+off,25,12,0.3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(90,90+off,25,12,-0.3,0,Math.PI*2);ctx.fill();
fillRect(ctx,132,78+off,12,30,'#f0eee8');fillRect(ctx,133,70+off,10,10,'#e8c39a');
// Person in middle
_fig(ctx,CW/2-10,105,'#e8c39a','#2a4060','#1a2840');
_label(ctx,'"Noble recorders — who know everything you do" (82:11-12)',CH-15);};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.destiny);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
// Split background
ctx.fillStyle='#0a2808';ctx.fillRect(0,0,CW/2,CH);ctx.fillStyle='#200808';ctx.fillRect(CW/2,0,CW/2,CH);
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(CW/2,0);ctx.lineTo(CW/2,CH);ctx.stroke();ctx.setLineDash([]);
_label(ctx,'CLICK: Al-Abrar in Bliss · Al-Fujjar in Hell — 82:13-16');
// Left: Abrar in bliss
const glow=0.5+Math.sin(this.t*0.04)*0.3;
ctx.shadowColor=`rgba(80,220,100,${glow})`;ctx.shadowBlur=15;_fig(ctx,100,90,'#f0e8c8','#3a6828','#1a3818');ctx.shadowBlur=0;
ctx.fillStyle='rgba(80,220,80,0.3)';ctx.beginPath();ctx.arc(120,100,35,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#80ff80';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الأَبْرَار',120,185);ctx.fillText('IN BLISS',120,196);
// Right: Fujjar in hell
ctx.fillStyle='rgba(220,60,20,0.4)';ctx.fillRect(CW/2+10,CH-60,150,60);
_fig(ctx,380,95,'#c09070','#2a1818','#181010');
for(let f=0;f<5;f++){const fx=CW/2+20+f*26,fy=CH-60+Math.sin(this.t*0.1+f)*10;ctx.fillStyle=`rgba(220,${80+f*20},20,0.7)`;ctx.beginPath();ctx.arc(fx,fy,6,0,Math.PI*2);ctx.fill();}
ctx.fillStyle='#ff8888';ctx.fillText('الفُجَّار',CW/2+100,185);ctx.fillText('IN HELL',CW/2+100,196);ctx.textAlign='left';};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.yawm);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_ground(ctx,175);_label(ctx,'CLICK: "What Makes You Know What the Day is?" — 82:17-19');
// Large scales
const tilt=Math.sin(this.t*0.02)*8;
ctx.strokeStyle=p.acStr+'0.8)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(CW/2,50);ctx.lineTo(CW/2,90);ctx.stroke();
ctx.beginPath();ctx.moveTo(CW/2-80,90);ctx.lineTo(CW/2+80,90);ctx.stroke();
ctx.beginPath();ctx.moveTo(CW/2-80,90);ctx.lineTo(CW/2-100,140+tilt);ctx.stroke();
ctx.beginPath();ctx.moveTo(CW/2+80,90);ctx.lineTo(CW/2+100,140-tilt);ctx.stroke();
fillRect(ctx,CW/2-120,140+tilt,40,15,p.gndAcc);fillRect(ctx,CW/2+80,140-tilt,40,15,p.gndAcc);
// Top circle
ctx.fillStyle=p.label;ctx.beginPath();ctx.arc(CW/2,48,8,0,Math.PI*2);ctx.fill();
// Allah text
ctx.fillStyle=p.acStr+'0.9)';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الأَمْرُ لِلَّه',CW/2,CH-15);ctx.fillText('"The command that Day is ENTIRELY for Allah"',CW/2,CH-4);ctx.textAlign='left';};draw();}}

class S6 extends BS{constructor(){super('canvas-6');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.yawm);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_ground(ctx,170);_label(ctx,'CLICK: No Soul Helps Another — 82:19');
// Multiple figures standing alone
[[80,105],[180,110],[280,105],[380,108],[480,110]].forEach(([fx,fy],i)=>{
  _fig(ctx,fx,fy,'#e8c39a',['#2a5080','#3a3a60','#204820','#5a2020','#2a4060'][i],['#1a2840','#1a1a40','#0e2010','#2a1010','#1a2840'][i]);
  // Isolation barrier
  ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.strokeRect(fx-8,fy-8,P*5+16,P*11+16);});
ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"No soul has power for another — ALONE before Allah"',CW/2,CH-15);ctx.textAlign='left';};draw();}}

const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();scenes[6]=new S6();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
