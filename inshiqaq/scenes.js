'use strict';
// SURAH AL-INSHIQAQ (84) — scenes.js
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.dataset.theme==='stars';return s?{sky0:'#2e1a08',sky1:'#3c2410',sky2:'#503018',gnd:'#604020',gndAcc:'#7a5030',starStr:'rgba(255,220,180,',acStr:'rgba(248,192,96,',label:'#f8c060',hint:'#e0a040'}:{sky0:'#100802',sky1:'#1a1004',sky2:'#261608',gnd:'#301a08',gndAcc:'#401e08',starStr:'rgba(200,160,100,',acStr:'rgba(240,144,48,',label:'#f09030',hint:'#c07020'};}
function fillRect(ctx,x,y,w,h,col){if(col)ctx.fillStyle=col;const rx=Math.round(x),ry=Math.round(y),rw=Math.round(w),rh=Math.round(h);if(document.documentElement.dataset.theme==='stars'&&rw<120&&rh<120&&rw>4&&rh>4){const r=Math.min(rw*0.3,rh*0.3,7);ctx.shadowColor='rgba(200,104,32,0.2)';ctx.shadowBlur=3;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(rx,ry,rw,rh,r);else ctx.rect(rx,ry,rw,rh);ctx.fill();ctx.shadowBlur=0;}else{ctx.fillRect(rx,ry,rw,rh);}}
function _sky(ctx){const p=sceneP();const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(0.5,p.sky1);g.addColorStop(1,p.sky2);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y=170){const p=sceneP();fillRect(ctx,0,y,CW,CH-y,p.gnd);fillRect(ctx,0,y,CW,5,p.gndAcc);}
function _label(ctx,txt,y=18){ctx.fillStyle=sceneP().label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(txt,CW/2,y);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc){fillRect(ctx,x+P,y,P*3,P*3,hc);fillRect(ctx,x,y+P*3,P*5,P*4,bc);fillRect(ctx,x-P,y+P*3,P,P*3,hc);fillRect(ctx,x+P*5,y+P*3,P,P*3,hc);fillRect(ctx,x,y+P*7,P*2,P*4,pc);fillRect(ctx,x+P*3,y+P*7,P*2,P*4,pc);}

const VD={
  split:{ref:'Al-Inshiqaq 84:1-5',arabic:'إِذَا السَّمَاءُ انشَقَّتْ ۩ وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ ۩ وَإِذَا الْأَرْضُ مُدَّتْ ۩ وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ ۩ وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ',english:'"When the sky has split apart — and listened to its Lord and was obligated — and when the earth has been stretched out — and has cast out what was within it and vacated — and listened to its Lord and was obligated." (84:1-5)',note:'Two cosmic events: sky splits, earth stretches. But notice the unique phrase: "Wa adhimat li-Rabbiha wa huqqat" — it LISTENED to its Lord and was obligated/was right to do so. The sky and earth obey Allah completely. They have no choice — and they joyfully comply. What are we doing?'},
  strive:{ref:'Al-Inshiqaq 84:6',arabic:'يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ',english:'"O man — indeed you are laboring/striving toward your Lord with [great] effort and will meet Him." (84:6)',note:'"Kadihun ila Rabbika kadhan fa-mulaqihi." — "Kadh" means to strive, labour, toil, exhausted effort. You are laboring toward your Lord — whether you know it or not. Every step of your life is a step toward meeting Him. And you WILL meet Him. "Fa-mulaqihi" — then you will MEET HIM. This is the most important meeting of your existence.'},
  right:{ref:'Al-Inshiqaq 84:7-9',arabic:'فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ ۩ فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيرًا ۩ وَيَنقَلِبُ إِلَىٰ أَهْلِهِ مَسْرُورًا',english:'"As for he who is given his record in his right hand — he will be judged with an easy reckoning — and return to his people in happiness." (84:7-9)',note:'"Hisaban yasiran" — an EASY reckoning. Not "forgiven" but "easy" — a light, quick account. The Prophet ﷺ said whoever is brought to strict account is destroyed — truly easy reckoning is when Allah just shows you your deeds without detailed questioning. And "yanqalibu ila ahlihi masrura" — returns to his family JOYFUL. The reunion will be celebration.'},
  left:{ref:'Al-Inshiqaq 84:10-12',arabic:'وَأَمَّا مَنْ أُوتِيَ كِتَابَهُ وَرَاءَ ظَهْرِهِ ۩ فَسَوْفَ يَدْعُو ثُبُورًا ۩ وَيَصْلَىٰ سَعِيرًا',english:'"But as for he who is given his record behind his back — he will cry out for destruction — and he will enter a Blaze." (84:10-12)',note:'The book behind the back — "wara\'a dhahrihi." Scholars say his right hand is shackled, so his left hand reaches behind him. He will cry "thubura" — destruction, ruin. And he will enter "sa\'ir" — intense, blazing fire. The contrast with the right-hand person is total: joy vs. despair, easy account vs. destruction.'},
  stages:{ref:'Al-Inshiqaq 84:19',arabic:'لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍ',english:'"You will surely pass through stage after stage." (84:19)',note:'"La-tarkabunna tabaqan \'an tabaqin" — You will SURELY ride stage upon stage. Stage after stage: womb, infancy, childhood, youth, old age, death, grave, resurrection, judgment. Some scholars say "tabaq" means different states: rich and poor, health and sickness, ease and hardship. Life is a journey of stages — and Meeting Allah is the final destination.'},
};

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S1 extends BS{constructor(){super('canvas-1');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.split);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
// Sunset gradient sky
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#1a0a04');g.addColorStop(0.4,p.sky1);g.addColorStop(0.8,p.gndAcc||'#7a5030');g.addColorStop(1,p.gnd||'#604020');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_label(ctx,'CLICK: Sky Splits, Earth Stretches — 84:1-5');
// Crack in sky
const pulse=0.5+Math.sin(this.t*0.04)*0.4;ctx.strokeStyle=`rgba(248,192,96,${pulse})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(CW/2-20,0);ctx.lineTo(CW/2+10,50);ctx.lineTo(CW/2-15,110);ctx.lineTo(CW/2+5,CH);ctx.stroke();
// Earth cracking / stretching
_ground(ctx,170);ctx.strokeStyle=p.acStr+'0.6)';ctx.lineWidth=1;ctx.setLineDash([4,2]);ctx.beginPath();ctx.moveTo(0,175);ctx.lineTo(CW,175);ctx.stroke();ctx.setLineDash([]);
// Sunrise glow
const glow=0.3+Math.sin(this.t*0.03)*0.15;ctx.fillStyle=`rgba(255,150,50,${glow})`;ctx.beginPath();ctx.arc(CW/2,CH,80,Math.PI,0);ctx.fill();
_label(ctx,'"Listened to its Lord and was OBLIGATED" (84:2,4)',CH-10);};draw();}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.strive);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,170);_label(ctx,'CLICK: You Are Striving Toward Your Lord — 84:6');
// Person walking toward a point on the horizon
const walkX=60+((this.t*0.5)%340);const walkBob=Math.sin(this.t*0.2)*2;
_fig(ctx,walkX,110+walkBob,'#e8c39a','#3a2818','#1a1408');
// Footsteps
for(let f=0;f<4;f++){const fx=walkX-20-f*15;if(fx>10){ctx.fillStyle=p.acStr+'0.4)';ctx.fillRect(fx,180,8,3);}}
// Light ahead
const pulse=0.5+Math.sin(this.t*0.05)*0.3;ctx.fillStyle=`rgba(248,192,96,${pulse})`;ctx.beginPath();ctx.arc(CW-40,120,30,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(248,192,96,0.3)';ctx.beginPath();ctx.arc(CW-40,120,55,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(0,0,0,0.5)';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('رَبّ',CW-40,124);ctx.textAlign='left';
_label(ctx,'"Kadihun ila Rabbika kadhan fa-mulaqihi" (84:6)',CH-10);};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.right);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#0a1808');g.addColorStop(1,'#182c08');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_ground(ctx,180);_label(ctx,'CLICK: Book in Right Hand — Happy Return! — 84:7-9');
// Happy figure holding scroll in right hand
const glow=0.4+Math.sin(this.t*0.05)*0.3;ctx.shadowColor=`rgba(80,220,80,${glow})`;ctx.shadowBlur=15;_fig(ctx,CW/2-50,95,'#f0e8c0','#3a6828','#1a3818');ctx.shadowBlur=0;
// Book in right hand
fillRect(ctx,CW/2+10,103,20,28,'#f0e8c8');ctx.strokeStyle='rgba(80,200,80,0.8)';ctx.lineWidth=2;ctx.strokeRect(CW/2+10,103,20,28);ctx.fillStyle='#2a4020';ctx.font='4px monospace';ctx.textAlign='center';ctx.fillText('يَمِين',CW/2+20,120);ctx.textAlign='left';
// Joy burst
ctx.fillStyle='#80ff80';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('😊',CW/2-38,90);ctx.textAlign='left';
// Family reunion
_fig(ctx,CW/2+80,110,'#e0d8b0','#284020','#182810');_fig(ctx,CW/2+110,115,'#e8d0a0','#2a4018','#1a2810');
ctx.fillStyle='rgba(80,220,80,0.5)';ctx.beginPath();ctx.arc(CW/2-38,120,45,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#80ff80';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"Easy account — returns to family JOYFUL!" (84:8-9)',CW/2,CH-10);ctx.textAlign='left';};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.left);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#100204');g.addColorStop(1,'#1a0408');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_ground(ctx,180);_label(ctx,'CLICK: Book Behind the Back — 84:10-12');
// Distressed figure with book behind back
_fig(ctx,CW/2-10,100,'#c09070','#2a1818','#181010');
// Book behind back
fillRect(ctx,CW/2-30,110,18,24,'#fffae0');ctx.strokeStyle='rgba(200,40,20,0.8)';ctx.lineWidth=1;ctx.strokeRect(CW/2-30,110,18,24);ctx.fillStyle='#aa2020';ctx.font='4px monospace';ctx.textAlign='center';ctx.fillText('خَلْف',CW/2-21,125);ctx.textAlign='left';
// Flames below
for(let f=0;f<8;f++){const fx=CW/2-60+f*18,fh=25+Math.sin(this.t*0.15+f)*10;const r=180+f*5,g2=40+f*8;ctx.fillStyle=`rgba(${r},${g2},20,0.8)`;ctx.beginPath();ctx.moveTo(fx+4,CH);ctx.lineTo(fx,CH-fh);ctx.lineTo(fx+8,CH);ctx.fill();}
// Despair
ctx.fillStyle='#ff4444';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('😰',CW/2+5,88);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('يَدْعُو ثُبُورًا — "Calls for destruction!" (84:11)',CW/2,CH-15);ctx.fillText('يَصْلَى سَعِيرًا — "Will enter blazing fire" (84:12)',CW/2,CH-4);ctx.textAlign='left';};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.stages);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,175);_label(ctx,'CLICK: Stage After Stage — 84:19');
const stages=['Womb','Birth','Child','Youth','Adult','Elder','Death','Grave','Rise'];const cols=['#6a4028','#8a5838','#a06848','#b07858','#c08868','#a07060','#806858','#604838','#f8c060'];stages.forEach((stage,i)=>{const x=30+i*55,y=130-i*8;fillRect(ctx,x,y,44,44,cols[i]);ctx.fillStyle='rgba(0,0,0,0.5)';ctx.font='4px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(stage,x+22,y+25);ctx.textAlign='left';
if(i<stages.length-1){const pulse=i===Math.floor(this.t*0.05)%stages.length;ctx.strokeStyle=pulse?p.acStr+'0.9)':'rgba(255,255,255,0.2)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+44,y+22);ctx.lineTo(x+55,y+14);ctx.stroke();}});
_label(ctx,'"La-tarkabunna tabaqan \'an tabaqin" — Stage by Stage! (84:19)',CH-10);};draw();}}

class S6 extends BS{constructor(){super('canvas-6');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.strive);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_ground(ctx,170);_label(ctx,'CLICK: "Why Don\'t They Believe When Quran Recited?" — 84:20-21');
// Person listening to recitation
_fig(ctx,CW/2-10,105,'#e8c39a','#3a1828','#1a0e18');
// Sound waves
for(let w=1;w<=4;w++){const pulse=0.2+Math.sin(this.t*0.08-w*0.5)*0.15;ctx.strokeStyle=`rgba(248,192,96,${Math.max(0,pulse)})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(CW/2+80,120,w*20,Math.PI*0.5,Math.PI*1.5);ctx.stroke();}
// Moon
ctx.fillStyle=p.acStr+'0.8)';ctx.beginPath();ctx.arc(80,40,18,0,Math.PI*2);ctx.fill();ctx.fillStyle=p.sky0||'#100802';ctx.beginPath();ctx.arc(90,35,13,0,Math.PI*2);ctx.fill();
// Question marks
ctx.fillStyle='#ff8888';ctx.font='10px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('?',300,80);ctx.fillText('?',340,60);ctx.textAlign='left';
_label(ctx,'"Ma lahum la yu\'minun?" — What is with them that they do not believe? (84:20)',CH-10);};draw();}}

const scenes={};
function initScenes(){scenes[1]=new S1();scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();scenes[6]=new S6();}
function startScene(n){if(scenes[n])scenes[n].start();}
function stopAllScenes(){Object.values(scenes).forEach(s=>s.stop());}
