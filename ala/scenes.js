'use strict';
// SURAH AL-ALA (87) — scenes.js
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.dataset.theme==='stars';return s?{sky0:'#0e2820',sky1:'#183830',sky2:'#224840',gnd:'#2c5840',gndAcc:'#3c6850',starStr:'rgba(160,240,200,',acStr:'rgba(240,208,96,',label:'#f0d060',hint:'#d0b040'}:{sky0:'#041008',sky1:'#081a0c',sky2:'#0c2410',gnd:'#10280c',gndAcc:'#183014',starStr:'rgba(80,180,100,',acStr:'rgba(200,160,32,',label:'#c8a020',hint:'#a08018'};}
function fillRect(ctx,x,y,w,h,col){if(col)ctx.fillStyle=col;const rx=Math.round(x),ry=Math.round(y),rw=Math.round(w),rh=Math.round(h);if(document.documentElement.dataset.theme==='stars'&&rw<120&&rh<120&&rw>4&&rh>4){const r=Math.min(rw*0.3,rh*0.3,7);ctx.shadowColor='rgba(48,160,112,0.2)';ctx.shadowBlur=3;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(rx,ry,rw,rh,r);else ctx.rect(rx,ry,rw,rh);ctx.fill();ctx.shadowBlur=0;}else{ctx.fillRect(rx,ry,rw,rh);}}
function _sky(ctx){const p=sceneP();const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(0.6,p.sky1);g.addColorStop(1,p.sky2);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y=170){const p=sceneP();fillRect(ctx,0,y,CW,CH-y,p.gnd);fillRect(ctx,0,y,CW,5,p.gndAcc);}
function _label(ctx,txt,y=18){ctx.fillStyle=sceneP().label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(txt,CW/2,y);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc){fillRect(ctx,x+P,y,P*3,P*3,hc);fillRect(ctx,x,y+P*3,P*5,P*4,bc);fillRect(ctx,x-P,y+P*3,P,P*3,hc);fillRect(ctx,x+P*5,y+P*3,P,P*3,hc);fillRect(ctx,x,y+P*7,P*2,P*4,pc);fillRect(ctx,x+P*3,y+P*7,P*2,P*4,pc);}

const VD={
  glorify:{ref:'Al-Ala 87:1-5',arabic:'سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى ۩ الَّذِي خَلَقَ فَسَوَّىٰ ۩ وَالَّذِي قَدَّرَ فَهَدَىٰ ۩ وَالَّذِي أَخْرَجَ الْمَرْعَىٰ ۩ فَجَعَلَهُ غُثَاءً أَحْوَىٰ',english:'"Glorify the name of your Lord, the Most High — who created and proportioned — who destined and guided — who brought out the pasture — then made it dark debris." (87:1-5)',note:'"Sabbihi isma Rabbika al-A\'la!" — The first word is a command: GLORIFY! The name, "Sabbihi" — "Subhana" comes from this — SubhanAllah. Glorify the NAME of your Lord — His name itself, Al-A\'la — the Most High. When you say "Subhana Rabbiya Al-A\'la" in sujood, you are directly reciting this verse! The Prophet ﷺ commanded this after this surah was revealed. Each attribute: He created AND proportioned. He destined AND guided. Perfect completeness in every act.'},
  recite:{ref:'Al-Ala 87:6-7',arabic:'سَنُقْرِئُكَ فَلَا تَنسَىٰ ۩ إِلَّا مَا شَاءَ اللَّهُ ۚ إِنَّهُ يَعْلَمُ الْجَهْرَ وَمَا يَخْفَىٰ',english:'"We will make you recite, and you will not forget — except what Allah wills. Indeed He knows the declared and what is hidden." (87:6-7)',note:'"Sanuqri\'uka fa-la tansa." — We will make you RECITE and you will NOT FORGET. This is a divine promise to the Prophet ﷺ. The Quran will be preserved in his memory — and in the Ummah\'s memory across generations. "Illa ma sha\' Allah" — except what Allah wills (i.e., whatever was later abrogated in revelation). "Innahu ya\'lam al-jahra wa ma yakhfa" — He knows the declared and the hidden. The One who promises this memory is All-Knowing.'},
  fear:{ref:'Al-Ala 87:9-10',arabic:'فَذَكِّرْ إِن نَّفَعَتِ الذِّكْرَىٰ ۩ سَيَذَّكَّرُ مَن يَخْشَىٰ',english:'"So remind, if the reminder should benefit — the one who fears will be reminded." (87:9-10)',note:'"Fa-dhakkir in nafa\'at al-dhikra." So remind — if the reminder is beneficial. "Sayyadhdhakkaru man yakhsha" — the one who FEARS (yakhsha — fears Allah with awe) will be reminded. This sets up a classification: those who fear Allah are open, receptive, benefited by reminder. The following verse shows the opposite case. Khashyah (awe/fear of Allah) is the key that opens the heart to benefit from reminder.'},
  purify:{ref:'Al-Ala 87:14-15',arabic:'قَدْ أَفْلَحَ مَن تَزَكَّىٰ ۩ وَذَكَرَ اسْمَ اللَّهِ فَصَلَّىٰ',english:'"He has certainly succeeded who purifies himself — and mentions the name of his Lord and prays." (87:14-15)',note:'"Qad aflaha man tazakka — wa dhakara isma Rabbih fa-salla." He has CERTAINLY SUCCEEDED — "aflaha" — who PURIFIES himself. "Tazakka" is to purify oneself — from shirk, from wrong beliefs, from spiritual impurities. And then: mentioned the name of Allah and PRAYED. The sequence: purification of the heart first, then prayer. Prayer without purification is incomplete. This is the path of success.'},
  dunya:{ref:'Al-Ala 87:16-17',arabic:'بَلْ تُؤْثِرُونَ الْحَيَاةَ الدُّنْيَا ۩ وَالْآخِرَةُ خَيْرٌ وَأَبْقَىٰ',english:'"But you prefer the life of this world — while the Hereafter is better and more lasting." (87:16-17)',note:'"Bal tu\'thirun al-hayat al-dunya." But you PREFER the worldly life. "Tu\'thirun" — you give it priority, you choose it over the other option. Then the contrast: "wa al-akhiratu khayrun wa abqa" — the Hereafter is BETTER (khayr) AND MORE LASTING (abqa). Better in quality. More lasting in duration. Both dimensions: quality and time. The world is lower in quality AND temporary. The Hereafter is higher in quality AND eternal.'},
};

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.glorify);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
// Sky to earth gradient
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(0.5,p.sky1);g.addColorStop(1,p.gnd);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_label(ctx,'CLICK: Glorify the Name of Your Lord the Most High! — 87:1-5');
// "Al-Ala" text in sky
const pulse=0.5+Math.sin(this.t*0.05)*0.4;ctx.fillStyle=p.acStr+pulse+')';ctx.font='12px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الأَعْلَى',CW/2,60);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('THE MOST HIGH',CW/2,76);ctx.textAlign='left';
// Pasture / green earth
fillRect(ctx,0,160,CW,50,p.gnd);for(let g2=0;g2<12;g2++){const gx=40+g2*42;fillRect(ctx,gx,145,8,18,p.gndAcc);fillRect(ctx,gx-6,135,20,16,'#0a2008');}
// Wilted debris
for(let w=0;w<4;w++){const wx=300+w*55;ctx.fillStyle='rgba(80,60,20,0.8)';ctx.fillRect(wx,152,18,8);}
_label(ctx,'"Brought out the pasture — then made it dark debris" (87:4-5)',CH-5);};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.recite);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: "We Will Make You Recite — You Will Not Forget!" — 87:6-7');
// Light from above to Prophet figure
const figa={x:CW/2-8,y:100};const pulse=0.3+Math.sin(this.t*0.05)*0.2;ctx.fillStyle=`rgba(240,208,96,${pulse})`;ctx.beginPath();ctx.moveTo(figa.x+8,figa.y-20);ctx.lineTo(figa.x-20,0);ctx.lineTo(figa.x+36,0);ctx.closePath();ctx.fill();
_fig(ctx,figa.x,figa.y,'#e8c39a','#2a4060','#1a2840');
// Quran waves flowing down
for(let w=0;w<3;w++){const wy=40+w*18;ctx.strokeStyle=p.acStr+(0.4+w*0.15)+')';ctx.lineWidth=1;ctx.beginPath();for(let x=0;x<CW;x+=5){ctx.lineTo(x,wy+Math.sin((x+this.t*3)*0.1)*3);}ctx.stroke();}
ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"SANUQRI\'UKA FA-LA TANSA" — Divine promise of memory! (87:6)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.fear);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: He Who Fears Will Be Reminded — 87:9-10');
// Two figures: one open, one closed to reminder
// Left: open/receptive
_fig(ctx,130,100,'#e8c39a','#2a4060','#1a2840');const glow=0.3+Math.sin(this.t*0.05)*0.2;ctx.shadowColor=`rgba(200,208,96,${glow})`;ctx.shadowBlur=10;ctx.fillStyle=p.label;ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('🤲',150,88);ctx.shadowBlur=0;ctx.font='5px "Press Start 2P",monospace';ctx.fillText('يَخْشَى',150,165);ctx.fillText('Fears Allah',150,177);ctx.fillText('RECEPTIVE',150,189);
// Words flowing to left person
ctx.strokeStyle=p.acStr+'0.5)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(CW/2,110);ctx.lineTo(175,110);ctx.stroke();
// Right: closed
_fig(ctx,370,100,'#c09070','#2a1818','#181010');ctx.fillStyle='rgba(200,40,20,0.5)';ctx.fillRect(355,88,40,15);ctx.fillStyle='#ff8888';ctx.font='5px "Press Start 2P",monospace';ctx.fillText('الأَشْقَى',390,165);ctx.fillText('The Wretched',390,177);ctx.fillText('AVOIDS',390,189);
// Words stopped at right person
ctx.strokeStyle='rgba(200,40,20,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(CW/2,110);ctx.lineTo(345,110);ctx.stroke();ctx.fillStyle='#ff4444';ctx.fillText('✗',CW/2+100,108);
ctx.textAlign='left';};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.purify);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
const g2=ctx.createLinearGradient(0,0,0,CH);g2.addColorStop(0,'#041008');g2.addColorStop(1,'#102010');ctx.fillStyle=g2;ctx.fillRect(0,0,CW,CH);
_label(ctx,'CLICK: "He Has Certainly Succeeded Who Purifies!" — 87:14-15');
// Person in sujood/prayer
_fig(ctx,CW/2-40,95,'#e8c39a','#3a6828','#1a3818');
// Prayer mat
fillRect(ctx,CW/2-60,155,100,15,'#2a4818');
// Purification light
const pulse=0.4+Math.sin(this.t*0.05)*0.3;ctx.shadowColor=`rgba(80,200,100,${pulse})`;ctx.shadowBlur=18;ctx.fillStyle='rgba(80,200,100,0.1)';ctx.beginPath();ctx.arc(CW/2-28,125,50,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
// Aflaha! text
ctx.fillStyle=p.label;ctx.font='8px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('قَدْ أَفْلَحَ',CW/2+100,100);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"HE HAS CERTAINLY',CW/2+100,115);ctx.fillText('SUCCEEDED!" (87:14)',CW/2+100,127);
ctx.fillStyle='#80ff80';ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"تَزَكَّى + صَلَّى" — Purify + Pray = SUCCESS',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S6 extends BS{constructor(){super('canvas-6');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.dunya);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: Dunya vs Akhira — 87:16-17');
// Left: dunya (small, temporary)
ctx.fillStyle='rgba(180,140,60,0.8)';ctx.beginPath();ctx.arc(100,120,30,0,Math.PI*2);ctx.fill();ctx.fillStyle='#8a6020';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الدُّنْيَا',100,118);ctx.fillText('World',100,130);
// Fading it
ctx.fillStyle=`rgba(0,0,0,${0.2+Math.sin(this.t*0.03)*0.1})`;ctx.beginPath();ctx.arc(100,120,30,0,Math.PI*2);ctx.fill();
// Right: akhira (large, glowing)
const pulse=0.3+Math.sin(this.t*0.04)*0.2;ctx.shadowColor=`rgba(240,208,96,${pulse})`;ctx.shadowBlur=20;ctx.fillStyle='rgba(200,160,40,0.7)';ctx.beginPath();ctx.arc(420,100,60,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الآخِرَة',420,96);ctx.fillText('Hereafter',420,108);ctx.fillText('BETTER',420,120);ctx.fillText('& LASTING',420,132);
// Arrow comparing
ctx.strokeStyle='white';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(138,120);ctx.lineTo(352,110);ctx.stroke();ctx.fillStyle='white';ctx.font='5px "Press Start 2P",monospace';ctx.fillText('خَيْرٌ وَأَبْقَى',CW/2,170);ctx.textAlign='left';};draw();}}

class S7 extends BS{constructor(){super('canvas-7');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.glorify);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,170);_label(ctx,'CLICK: This Was in the Earlier Scriptures — 87:18-19');
// Two scrolls: Torah and Ibrahim
[[100,100],[350,95]].forEach(([sx,sy],i)=>{fillRect(ctx,sx,sy,80,60,'#201808');ctx.strokeStyle=p.acStr+'0.7)';ctx.lineWidth=1;ctx.strokeRect(sx,sy,80,60);ctx.fillStyle=p.label;ctx.font='5px serif';ctx.textAlign='center';const names=['صُحُفِ إِبْرَاهِيم','صُحُفِ مُوسَى'];ctx.fillText(names[i],sx+40,sy+30);ctx.font='4px "Press Start 2P",monospace';const labels=['Scrolls of','Scrolls of'];ctx.fillText(labels[i],sx+40,sy+43);const names2=['IBRAHIM','MUSA'];ctx.fillText(names2[i],sx+40,sy+53);ctx.textAlign='left';});
ctx.fillStyle=p.acStr+'0.8)';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"This was in the earlier scriptures — of Ibrahim and Musa" (87:18-19)',CW/2,CH-8);ctx.textAlign='left';};draw();}}

const scenes={};




const VD_wbw={ref:'Al-Ala (87)',arabic:'سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى ۩ الَّذِي خَلَقَ فَسَوَّىٰ ۩ قَدْ أَفْلَحَ مَن تَزَكَّىٰ ۩ وَذَكَرَ اسْمَ رَبِّهِ فَصَلَّىٰ',english:'"Glorify the name of your Lord, the Most High, who created and proportioned. He has succeeded who purifies himself and remembers the name of his Lord and prays." (87:1-2, 14-15)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🙌',label:'THE MOST HIGH',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();scenes[6]=new S6();scenes[7]=new S7();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
