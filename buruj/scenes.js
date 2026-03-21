'use strict';
// SURAH AL-BURUJ (85) — scenes.js
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.dataset.theme==='stars';return s?{sky0:'#0e1840',sky1:'#182458',sky2:'#243070',gnd:'#304080',gndAcc:'#405090',starStr:'rgba(200,216,255,',acStr:'rgba(224,216,96,',label:'#e0d860',hint:'#c0b840'}:{sky0:'#04080e',sky1:'#080e18',sky2:'#0e1828',gnd:'#121e30',gndAcc:'#182838',starStr:'rgba(100,140,220,',acStr:'rgba(200,176,48,',label:'#c8b030',hint:'#a09020'};}
function fillRect(ctx,x,y,w,h,col){if(col)ctx.fillStyle=col;const rx=Math.round(x),ry=Math.round(y),rw=Math.round(w),rh=Math.round(h);if(document.documentElement.dataset.theme==='stars'&&rw<120&&rh<120&&rw>4&&rh>4){const r=Math.min(rw*0.3,rh*0.3,7);ctx.shadowColor='rgba(64,96,192,0.2)';ctx.shadowBlur=3;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(rx,ry,rw,rh,r);else ctx.rect(rx,ry,rw,rh);ctx.fill();ctx.shadowBlur=0;}else{ctx.fillRect(rx,ry,rw,rh);}}
function _sky(ctx){const p=sceneP();const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(0.6,p.sky1);g.addColorStop(1,p.sky2);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y=170){const p=sceneP();fillRect(ctx,0,y,CW,CH-y,p.gnd);fillRect(ctx,0,y,CW,5,p.gndAcc);}
function _label(ctx,txt,y=18){ctx.fillStyle=sceneP().label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(txt,CW/2,y);ctx.textAlign='left';}
function _stars(ctx,n=15){const p=sceneP();const pts=[[40,15],[90,8],[160,22],[220,5],[300,18],[380,10],[440,25],[510,8],[70,45],[200,38],[330,42],[460,35],[140,55],[290,60],[420,50]];pts.slice(0,n).forEach(([x,y],i)=>{ctx.fillStyle=p.starStr+(0.4+i%4*0.15)+')';ctx.beginPath();ctx.arc(x,y,i%3===0?2:1.2,0,Math.PI*2);ctx.fill();});}
function _fig(ctx,x,y,hc,bc,pc){fillRect(ctx,x+P,y,P*3,P*3,hc);fillRect(ctx,x,y+P*3,P*5,P*4,bc);fillRect(ctx,x-P,y+P*3,P,P*3,hc);fillRect(ctx,x+P*5,y+P*3,P,P*3,hc);fillRect(ctx,x,y+P*7,P*2,P*4,pc);fillRect(ctx,x+P*3,y+P*7,P*2,P*4,pc);}

const VD={
  oath:{ref:'Al-Buruj 85:1-3',arabic:'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ ۩ وَالْيَوْمِ الْمَوْعُودِ ۩ وَشَاهِدٍ وَمَشْهُودٍ',english:'"By the sky with its constellations — by the Promised Day — by the witness and the witnessed." (85:1-3)',note:'"Al-buruj" — the constellations, the great star formations. Three oaths: the sky with its constellations (vast, ordered, magnificent), the Promised Day (Yawm al-Qiyamah, which is certain), and the witness and the witnessed (scholars interpret as: Friday and the day of Arafah; the Prophet ﷺ and his community; or the recording angels and the deeds witnessed). Three powerful oaths of certainty.'},
  ditch:{ref:'Al-Buruj 85:4-7',arabic:'قُتِلَ أَصْحَابُ الْأُخْدُودِ ۩ النَّارِ ذَاتِ الْوَقُودِ ۩ إِذْ هُمْ عَلَيْهَا قُعُودٌ ۩ وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِالْمُؤْمِنِينَ شُهُودٌ',english:'"Destroyed were the People of the Ditch — of the fire with burning fuel — while they were sitting over it — and they were witnesses to what they were doing to the believers." (85:4-7)',note:'"Ukhdud" — a trench, a ditch. Historically: the tyrant Dhunuwas of Yemen dug trenches filled with burning fire and threw believers into them for refusing to abandon their faith in Allah. The persecutors sat by the ditches and WATCHED, witnessing their own atrocity. This is evil at its most deliberate and public.'},
  reason:{ref:'Al-Buruj 85:8-9',arabic:'وَمَا نَقَمُوا مِنْهُمْ إِلَّا أَن يُؤْمِنُوا بِاللَّهِ الْعَزِيزِ الْحَمِيدِ ۩ الَّذِي لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ',english:'"And they resented them for nothing except that they believed in Allah, the Exalted in Might, the Praiseworthy — to whom belongs the dominion of the heavens and earth." (85:8-9)',note:'The only "crime" of the believers? Faith. "Ma naqamu minhum illa an yu\'minu bi-Allah al-Aziz al-Hamid." They were thrown into fire for BELIEVING in Allah — specifically, Allah the Exalted in Might (al-Aziz) and the Praiseworthy (al-Hamid). These two divine names are chosen deliberately: the believers believed in the Most Powerful and Most Worthy of Praise — and were destroyed for it.'},
  watching:{ref:'Al-Buruj 85:11',arabic:'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ۚ ذَٰلِكَ الْفَوْزُ الْكَبِيرُ',english:'"Indeed those who believed and did righteous deeds will have gardens beneath which rivers flow — that is the great attainment." (85:11)',note:'"Al-Fawz al-kabir" — the GREAT attainment/success. Not small. Not average. GREAT. Jannatin tajri min tahtiha al-anhar — gardens with rivers flowing beneath them. This comes immediately after describing the People of the Ditch — showing that the believers who were burned alive entered directly into the greatest success. Their deaths were not defeats — they were entries into victory.'},
  tablet:{ref:'Al-Buruj 85:21-22',arabic:'بَلْ هُوَ قُرْآنٌ مَّجِيدٌ ۩ فِي لَوْحٍ مَّحْفُوظٍ',english:'"But this is a glorious Quran — preserved in a Tablet." (85:21-22)',note:'"Quranun Majid" — a GLORIOUS Quran. "Majid" from "majd" meaning glory, honour, greatness. "Fi lawhin mahfudh" — in a Preserved/Protected Tablet. The Lawh al-Mahfudh — the original source of all revelation, preserved with Allah before it was ever revealed to the Prophet ﷺ. The persecutors attacked the believers. The tyrants burned the faithful. But the Quran? It is PRESERVED — untouchable, immutable, glorious — in a Tablet beyond all harm.'},
};

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.oath);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,15);_label(ctx,'CLICK: By the Sky with Constellations — 85:1-3');
// Constellations
const constellations=[[[80,30],[100,20],[120,35],[95,45]],[[200,15],[230,25],[250,10],[225,35]],[[350,20],[380,10],[400,30],[370,38]],[[450,15],[480,25],[500,10],[470,35]]];
constellations.forEach(pts=>{ctx.strokeStyle=p.acStr+'0.4)';ctx.lineWidth=1;ctx.beginPath();pts.forEach(([x,y],i)=>{if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.stroke();pts.forEach(([x,y])=>{ctx.fillStyle=p.acStr+'0.9)';ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill();});});
// Promised Day glow
const glow=0.15+Math.sin(this.t*0.03)*0.1;ctx.fillStyle=`rgba(200,176,48,${glow})`;ctx.beginPath();ctx.arc(CW/2,CH/2,80,0,Math.PI*2);ctx.fill();
_label(ctx,'"By the Promised Day — Witness and Witnessed" (85:1-3)',CH-10);};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.ditch);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,6);_ground(ctx,175);_label(ctx,'CLICK: People of the Ditch — 85:4-7');
// Ditch/trench with fire
const ditch={x:150,y:155,w:260,h:25};fillRect(ctx,ditch.x,ditch.y,ditch.w,ditch.h,'#200808');
// Flames in ditch
for(let f=0;f<12;f++){const fx=ditch.x+10+f*21,fh=15+Math.sin(this.t*0.15+f)*8;const r=180+f*4;ctx.fillStyle=`rgba(${r},${40+f*8},10,0.85)`;ctx.beginPath();ctx.moveTo(fx+4,ditch.y+ditch.h);ctx.lineTo(fx,ditch.y+ditch.h-fh);ctx.lineTo(fx+8,ditch.y+ditch.h);ctx.fill();}
// Tyrant sitting on edge, watching
_fig(ctx,100,130,'#d0b080','#3a2010','#201008');_fig(ctx,420,128,'#d0b080','#3a2010','#201008');
// Believer in fire
fillRect(ctx,CW/2-8,158,20,14,'#e8c39a');ctx.fillStyle='rgba(220,80,20,0.6)';ctx.fillRect(CW/2-12,154,28,18);
ctx.fillStyle='#ff8080';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"DESTROYED were the People of the Ditch!" (85:4)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.reason);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,8);_ground(ctx,175);_label(ctx,'CLICK: Their Only Crime — Believing in Allah — 85:8-9');
// Figure with faith symbol
_fig(ctx,CW/2-10,100,'#e8c39a','#2a4060','#1a2840');
// Forbidden sign / punishment
ctx.strokeStyle='rgba(220,80,20,0.8)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(CW/2+5,125,35,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(CW/2+5-35*0.7,125-35*0.7);ctx.lineTo(CW/2+5+35*0.7,125+35*0.7);ctx.stroke();
// Faith text
ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الْعَزِيزِ',CW/2+60,95);ctx.fillText('الْحَمِيدِ',CW/2+60,110);ctx.fillText('Believed in',CW/2+60,128);ctx.fillText('AL-AZIZ',CW/2+60,140);ctx.fillText('AL-HAMID',CW/2+60,152);
ctx.fillStyle='#ff8080';ctx.fillText('"Resented for NOTHING except — FAITH" (85:8)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.watching);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#041408');g.addColorStop(1,'#082010');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_stars(ctx,10);_label(ctx,'CLICK: The Great Attainment — 85:11');
// Gardens with rivers
fillRect(ctx,20,180,CW-40,25,'#0a2808');
// River
ctx.fillStyle='rgba(30,100,200,0.6)';ctx.fillRect(50,185,460,12);
// Trees
[[80,150],[160,145],[240,155],[320,148],[400,152],[480,145]].forEach(([tx,ty])=>{fillRect(ctx,tx-4,ty,8,30,'#2a4810');fillRect(ctx,tx-12,ty-20,24,25,'#1a5010');});
// Believer in garden
const glow=0.3+Math.sin(this.t*0.05)*0.2;ctx.shadowColor=`rgba(80,220,80,${glow})`;ctx.shadowBlur=12;_fig(ctx,CW/2-10,140,'#f0e8c0','#3a6828','#1a3818');ctx.shadowBlur=0;
ctx.fillStyle='#80ff80';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الْفَوْزُ الْكَبِيرُ',CW/2,100);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Al-Fawz al-Kabir" — THE GREAT ATTAINMENT (85:11)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S6 extends BS{constructor(){super('canvas-6');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.watching);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,12);_ground(ctx,175);_label(ctx,'CLICK: Allah\'s Grip is Severe — 85:12');
// Tyrant falling
_fig(ctx,80,140,'#d0b080','#3a2010','#201008');const shake=Math.sin(this.t*0.3)*3;ctx.fillStyle='rgba(220,80,20,0.6)';ctx.fillRect(55,135+shake,50,30);
// Lightning bolt from above
const pulse=0.5+Math.sin(this.t*0.06)*0.4;ctx.fillStyle=`rgba(224,216,96,${pulse})`;ctx.beginPath();ctx.moveTo(100,0);ctx.lineTo(85,70);ctx.lineTo(105,70);ctx.lineTo(90,140);ctx.lineTo(120,70);ctx.lineTo(100,70);ctx.lineTo(115,0);ctx.closePath();ctx.fill();
// Believer protected
_fig(ctx,420,130,'#f0e8c0','#2a4060','#1a2840');ctx.fillStyle='rgba(60,100,220,0.2)';ctx.beginPath();ctx.arc(440,150,40,0,Math.PI*2);ctx.fill();
ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"Inna batsha Rabbika la-shadid" — 85:12',CW/2,CH-5);ctx.fillText('"Indeed the GRIP of your Lord is SEVERE"',CW/2,CH+5);ctx.textAlign='left';};draw();}}

class S7 extends BS{constructor(){super('canvas-7');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.tablet);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,15);_ground(ctx,180);_label(ctx,'CLICK: The Preserved Tablet — 85:21-22');
// Glowing tablet
const pulse=0.4+Math.sin(this.t*0.04)*0.3;ctx.shadowColor=p.acStr+pulse+')';ctx.shadowBlur=20;
fillRect(ctx,CW/2-50,50,100,100,p.sky2||'#0e1828');ctx.strokeStyle=p.acStr+'0.9)';ctx.lineWidth=2;ctx.strokeRect(CW/2-50,50,100,100);ctx.shadowBlur=0;
// Arabic text on tablet
ctx.fillStyle=p.label;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('قُرْآنٌ',CW/2,85);ctx.fillText('مَّجِيدٌ',CW/2,100);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('PRESERVED',CW/2,120);ctx.fillText('GLORIOUS',CW/2,133);
// Protected aura
ctx.fillStyle=`rgba(200,176,48,0.05)`;ctx.beginPath();ctx.arc(CW/2,100,80,0,Math.PI*2);ctx.fill();
ctx.textAlign='left';_label(ctx,'"Quran Majid — fi Lawhin Mahfudh" (85:21-22)',CH-5);};draw();}}

const scenes={};




const VD_wbw={ref:'Al-Buruj (85)',arabic:'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ ۩ وَالْيَوْمِ الْمَوْعُودِ ۩ إِنَّ بَطْشَ رَبِّكَ لَشَدِيدٌ ۩ إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ',english:'"By the sky full of great constellations, and the Promised Day — indeed the grip of your Lord is severe. It is He who originates and repeats." (85:1-2, 12-13)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'✨',label:'THE CONSTELLATIONS',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();scenes[6]=new S6();scenes[7]=new S7();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
