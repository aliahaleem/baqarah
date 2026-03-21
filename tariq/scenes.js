'use strict';
// SURAH AT-TARIQ (86) — scenes.js
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.dataset.theme==='stars';return s?{sky0:'#101828',sky1:'#182438',sky2:'#243050',gnd:'#303c60',gndAcc:'#405070',starStr:'rgba(200,220,255,',acStr:'rgba(216,232,255,',label:'#d8e8ff',hint:'#a8c8f0'}:{sky0:'#040810',sky1:'#080c1a',sky2:'#0c1428',gnd:'#101c30',gndAcc:'#182438',starStr:'rgba(80,120,200,',acStr:'rgba(144,184,224,',label:'#90b8e0',hint:'#607090'};}
function fillRect(ctx,x,y,w,h,col){if(col)ctx.fillStyle=col;const rx=Math.round(x),ry=Math.round(y),rw=Math.round(w),rh=Math.round(h);if(document.documentElement.dataset.theme==='stars'&&rw<120&&rh<120&&rw>4&&rh>4){const r=Math.min(rw*0.3,rh*0.3,7);ctx.shadowColor='rgba(56,88,160,0.2)';ctx.shadowBlur=3;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(rx,ry,rw,rh,r);else ctx.rect(rx,ry,rw,rh);ctx.fill();ctx.shadowBlur=0;}else{ctx.fillRect(rx,ry,rw,rh);}}
function _sky(ctx){const p=sceneP();const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(0.6,p.sky1);g.addColorStop(1,p.sky2);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y=170){const p=sceneP();fillRect(ctx,0,y,CW,CH-y,p.gnd);fillRect(ctx,0,y,CW,5,p.gndAcc);}
function _label(ctx,txt,y=18){ctx.fillStyle=sceneP().label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(txt,CW/2,y);ctx.textAlign='left';}
function _stars(ctx){const p=sceneP();[[40,15],[90,8],[160,22],[220,5],[300,18],[380,10],[440,25],[510,8],[70,45],[200,38],[330,42],[460,35]].forEach(([x,y],i)=>{ctx.fillStyle=p.starStr+(0.3+i%4*0.15)+')';ctx.beginPath();ctx.arc(x,y,i%3===0?1.5:1,0,Math.PI*2);ctx.fill();});}
function _fig(ctx,x,y,hc,bc,pc){fillRect(ctx,x+P,y,P*3,P*3,hc);fillRect(ctx,x,y+P*3,P*5,P*4,bc);fillRect(ctx,x-P,y+P*3,P,P*3,hc);fillRect(ctx,x+P*5,y+P*3,P,P*3,hc);fillRect(ctx,x,y+P*7,P*2,P*4,pc);fillRect(ctx,x+P*3,y+P*7,P*2,P*4,pc);}

const VD={
  tariq:{ref:'At-Tariq 86:1-4',arabic:'وَالسَّمَاءِ وَالطَّارِقِ ۩ وَمَا أَدْرَاكَ مَا الطَّارِقُ ۩ النَّجْمُ الثَّاقِبُ ۩ إِن كُلُّ نَفْسٍ لَّمَّا عَلَيْهَا حَافِظٌ',english:'"By the sky and the night comer — and what would make you know what the night comer is? — The piercing star! There is no soul but that it has over it a guardian." (86:1-4)',note:'"Al-Tariq" — the night comer, night visitor, the one who comes in darkness. Revealed to be "al-najm al-thaqib" — the PIERCING star. "Thaqib" means to pierce through, to drill through, to penetrate. A star so bright it pierces the darkness. The conclusion: every soul has a guardian (hafiz) over it. The most powerful star in the sky is used to make you think of the guardian assigned to YOU.'},
  water:{ref:'At-Tariq 86:5-8',arabic:'فَلْيَنظُرِ الْإِنسَانُ مِمَّ خُلِقَ ۩ خُلِقَ مِن مَّاءٍ دَافِقٍ ۩ يَخْرُجُ مِن بَيْنِ الصُّلْبِ وَالتَّرَائِبِ ۩ إِنَّهُ عَلَىٰ رَجْعِهِ لَقَادِرٌ',english:'"So let man observe what he was created from — he was created from a fluid, ejected — emerging from between the backbone and the ribs — indeed He (Allah) is able to return him." (86:5-8)',note:'"Fa-l-yandhur al-insan mimma khuliq" — Let man LOOK and PONDER at what he was created from. Not philosophically — physically. Look at the origin: "ma\'in dafiq" — a gushing/ejected fluid. From something so humble, Allah made the thinking, prideful human. And the conclusion: "innahu \'ala raj\'ihi la-qadir" — He is ABLE to return him (resurrect him). The One who created from nothing can recreate with ease.'},
  secrets:{ref:'At-Tariq 86:9-10',arabic:'يَوْمَ تُبْلَى السَّرَائِرُ ۩ فَمَا لَهُ مِن قُوَّةٍ وَلَا نَاصِرٍ',english:'"The Day when secrets will be tried/examined — then he will have no power and no helper." (86:9-10)',note:'"Yawma tubla al-sara\'ir" — the Day the SECRETS are tried/examined. "Tubla" from "bala" — to test, to try, to examine thoroughly. "Al-sara\'ir" — the hidden things, the secrets, the inner realities. All that was hidden — every private deed, every secret thought acted upon, every concealed hypocrisy — EXAMINED. And on That Day: "fa-ma lahu min quwwatin wa la nasir" — he will have NO POWER and NO HELPER.'},
  quran:{ref:'At-Tariq 86:13-14',arabic:'إِنَّهُ لَقَوْلٌ فَصْلٌ ۩ وَمَا هُوَ بِالْهَزْلِ',english:'"Indeed this is a decisive/separating word — and it is not amusement/jest." (86:13-14)',note:'"Qawlun fasl" — a DECISIVE word, a SEPARATING word. "Fasl" means to separate, distinguish, cut clearly between two things. The Quran separates truth from falsehood, right from wrong, believer from disbeliever. And "wa ma huwa bi-al-hazl" — it is NOT amusement, NOT jest, NOT play. This is serious. This is real. This is final.'},
  plot:{ref:'At-Tariq 86:15-17',arabic:'إِنَّهُمْ يَكِيدُونَ كَيْدًا ۩ وَأَكِيدُ كَيْدًا ۩ فَمَهِّلِ الْكَافِرِينَ أَمْهِلْهُمْ رُوَيْدًا',english:'"Indeed they are planning a plan — and I am planning a plan — so give respite to the disbelievers. Relieve them gently." (86:15-17)',note:'"Innahum yakiduna kaydan — wa akidu kaydan." They plot a plot — AND I am plotting a plan. Same verb — completely asymmetric results. Human plotting vs. Divine planning. And then: "fa-mahhil al-kafirin, amhilhum ruwayda" — give them respite, let them go slowly/gently. The disbelievers plot against Islam. Allah says: give them time. His plan is already in motion. They don\'t know they are building their own trap.'},
};

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.tariq);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_label(ctx,'CLICK: The Piercing Night Star — 86:1-4');
// Pulsing bright star
const pulse=0.5+Math.sin(this.t*0.08)*0.5;ctx.shadowColor=`rgba(216,232,255,${pulse})`;ctx.shadowBlur=20*pulse;ctx.fillStyle=`rgba(220,235,255,${0.7+pulse*0.3})`;ctx.beginPath();ctx.arc(CW/2,CH/2,8,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
// Rays
ctx.strokeStyle=p.acStr+(0.3+pulse*0.4)+')';ctx.lineWidth=1;for(let r=0;r<8;r++){const a=r*Math.PI/4;const len=15+pulse*10;ctx.beginPath();ctx.moveTo(CW/2+Math.cos(a)*10,CH/2+Math.sin(a)*10);ctx.lineTo(CW/2+Math.cos(a)*(10+len),CH/2+Math.sin(a)*(10+len));ctx.stroke();}
// Other stars dimmer
_stars(ctx);
// Guardian angel
const off=Math.sin(this.t*0.03)*3;ctx.fillStyle='rgba(200,220,255,0.5)';ctx.beginPath();ctx.ellipse(CW/2+100,80+off,20,10,0.3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(CW/2+140,80+off,20,10,-0.3,0,Math.PI*2);ctx.fill();fillRect(ctx,CW/2+112,68+off,12,24,'#f0eee8');
_label(ctx,'"Every soul has a GUARDIAN over it" (86:4)',CH-10);};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.water);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: Created from Rushing Water — 86:5-8');
// Drop of water
const drop_y=60+Math.sin(this.t*0.05)*5;ctx.fillStyle='rgba(144,184,224,0.8)';ctx.beginPath();ctx.arc(CW/2,drop_y,12,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(180,220,255,0.5)';ctx.beginPath();ctx.moveTo(CW/2,drop_y-12);ctx.quadraticCurveTo(CW/2+8,drop_y-25,CW/2,drop_y-35);ctx.quadraticCurveTo(CW/2-8,drop_y-25,CW/2,drop_y-12);ctx.fill();
// Arrow down to person
ctx.fillStyle=p.acStr+'0.5)';ctx.font='12px sans-serif';ctx.textAlign='center';ctx.fillText('↓',CW/2,95);ctx.textAlign='left';
// Full human figure
_fig(ctx,CW/2-10,105,'#e8c39a','#2a4060','#1a2840');
// Resurrection arrow up
ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('مِن مَاءٍ دَافِقٍ',CW/2,58);ctx.fillText('"Created from gushing water"',CW/2,70);ctx.fillText('"He is ABLE to return him" (86:8)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.secrets);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: The Day Secrets Are Examined — 86:9-10');
// X-ray of person (secrets visible)
_fig(ctx,CW/2-10,100,'#e8c39a','#2a4060','#1a2840');
// Radiating examination lines
const pulse=0.3+Math.sin(this.t*0.06)*0.2;for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.strokeStyle=p.acStr+pulse+')';ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(CW/2+5,125);ctx.lineTo(CW/2+5+Math.cos(a)*50,125+Math.sin(a)*50);ctx.stroke();}ctx.setLineDash([]);
// Secrets floating out
ctx.fillStyle='rgba(144,184,224,0.5)';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('?',CW/2-50,90);ctx.fillText('?',CW/2+60,95);ctx.fillText('?',CW/2-60,140);
// Alone
ctx.fillStyle='#ff8888';ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"No power, no helper on That Day"',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.quran);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_ground(ctx,180);_label(ctx,'CLICK: The Decisive Word — 86:13-14');
// Book - Quran
fillRect(ctx,CW/2-30,80,60,80,'#0c1428');ctx.strokeStyle=p.acStr+'0.8)';ctx.lineWidth=2;ctx.strokeRect(CW/2-30,80,60,80);
// Light beam from book
const pulse=0.2+Math.sin(this.t*0.05)*0.15;ctx.fillStyle=`rgba(216,232,255,${pulse})`;ctx.beginPath();ctx.moveTo(CW/2-30,80);ctx.lineTo(CW/2-100,140);ctx.lineTo(CW/2-80,160);ctx.lineTo(CW/2,120);ctx.fill();ctx.beginPath();ctx.moveTo(CW/2+30,80);ctx.lineTo(CW/2+100,140);ctx.lineTo(CW/2+80,160);ctx.lineTo(CW/2,120);ctx.fill();
ctx.fillStyle=p.label;ctx.font='6px serif';ctx.textAlign='center';ctx.fillText('قَوْلٌ',CW/2,115);ctx.fillText('فَصْلٌ',CW/2,128);
ctx.fillStyle=p.acStr+'0.9)';ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"A DECISIVE word — not jest" (86:13-14)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S6 extends BS{constructor(){super('canvas-6');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.tariq);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_ground(ctx,175);_label(ctx,'CLICK: Sky Returns, Earth Opens Up — 86:11-12');
// Sky returning rain
for(let r=0;r<5;r++){const rx=80+r*100,ry=(this.t*2+r*40)%150;ctx.fillStyle='rgba(144,184,224,0.6)';ctx.fillRect(rx,ry,2,8);}
// Earth cracking open
ctx.strokeStyle=p.acStr+'0.5)';ctx.lineWidth=1;ctx.setLineDash([3,2]);ctx.beginPath();ctx.moveTo(0,180);ctx.lineTo(CW,180);ctx.stroke();ctx.setLineDash([]);
// Plants emerging
[[80,160],[200,155],[330,162],[450,158]].forEach(([px,py])=>{ctx.fillStyle='#1a3808';ctx.fillRect(px-2,py,4,18);ctx.fillStyle='#0a2008';ctx.fillRect(px-6,py-8,12,12);});
ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"By the sky that returns water" (86:11)',CW/2,55);ctx.fillText('"By the earth that splits open" (86:12)',CW/2,68);ctx.fillText('EVIDENCE: Allah who sends rain CAN send resurrection!',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S7 extends BS{constructor(){super('canvas-7');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.plot);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx);_ground(ctx,175);_label(ctx,'CLICK: They Plot, Allah Plans — 86:15-17');
// Humans plotting
_fig(ctx,100,110,'#d0b080','#2a1818','#181010');_fig(ctx,150,115,'#c8a880','#221818','#181010');ctx.fillStyle='rgba(200,50,50,0.3)';ctx.beginPath();ctx.arc(120,120,30,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#ff8888';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('يَكِيدُون',120,158);ctx.fillText('"They plot"',120,170);
// vs
ctx.fillStyle='white';ctx.font='8px "Press Start 2P",monospace';ctx.fillText('VS',CW/2,125);
// Allah's plan (vast)
const glow=0.2+Math.sin(this.t*0.04)*0.1;ctx.fillStyle=`rgba(216,232,255,${glow})`;ctx.beginPath();ctx.arc(420,80,60,0,Math.PI*2);ctx.fill();ctx.fillStyle=p.label;ctx.font='6px serif';ctx.textAlign='center';ctx.fillText('أَكِيدُ',420,80);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"I am planning"',420,95);ctx.fillText('— Allah',420,108);
ctx.fillStyle='#90b8e0';ctx.fillText('"Give them respite — gently" (86:17)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

const scenes={};




const VD_wbw={ref:'At-Tariq (86)',arabic:'وَالسَّمَاءِ وَالطَّارِقِ ۩ وَمَا أَدْرَاكَ مَا الطَّارِقُ ۩ النَّجْمُ الثَّاقِبُ',english:'"By the sky and the night-comer — and what will make you know what the night-comer is? It is the piercing star." (86:1-3)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🌟',label:'THE NIGHT-COMER',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();scenes[6]=new S6();scenes[7]=new S7();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
