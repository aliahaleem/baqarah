'use strict';
/* scenes.js — Surah Al-Qalam */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#06101e',sky1:'#0e1c30',gnd:'#162438',acc:'#f0c030',label:'#e8f0ff',hint:'#8090b0'}:{sky0:'#02080e',sky1:'#060e18',gnd:'#0e1a28',acc:'#e0b020',label:'#e0e8f8',hint:'#607090'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_qalam1={ref:'Al-Qalam 68:1-4',arabic:'وَالْقَلَمِ وَمَا يَسْطُرُونَ ۩ مَا أَنتَ بِنِعْمَةِ رَبِّكَ بِمَجْنُونٍ ۩ وَإِنَّ لَكَ لَأَجْرًا غَيْرَ مَمْنُونٍ ۩ وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',english:'"By the Pen and what they inscribe — you are not, by the grace of your Lord, a madman. And indeed, for you is a reward unceasing. And indeed, you are of an exalted character." (68:1-4)',note:"The first oath of this surah is by the Pen itself — the instrument of knowledge and record. Then Allah defends His Prophet with the most beautiful description: 'khuluqin adheem' — exalted character. Aisha (RA) said: his character WAS the Quran."};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.75,p.gnd);
      // Pen drawing
      const px=CW*0.5,py=CH*0.45,a=Math.sin(this.t*0.04)*0.2;
      ctx.save();ctx.translate(px,py);ctx.rotate(a);
      fillRect(ctx,-4,-50,8,60,p.acc,4);
      ctx.fillStyle='#fff8f0';ctx.beginPath();ctx.moveTo(-4,10);ctx.lineTo(0,24);ctx.lineTo(4,10);ctx.fill();
      ctx.restore();
      // Ink trail
      ctx.strokeStyle=p.acc;ctx.lineWidth=2;ctx.beginPath();
      for(let i=0;i<8;i++)ctx.lineTo(CW*0.15+i*CW*0.1,CH*0.55+Math.sin(i*0.8+this.t*0.05)*12);ctx.stroke();
      _label(ctx,'CLICK: By the Pen & Exalted Character (68:1-4)',p.label);
    };draw();
  }
}
const VD_qalam2={ref:'Al-Qalam 68:17-21',arabic:'إِنَّا بَلَوْنَاهُمْ كَمَا بَلَوْنَا أَصْحَابَ الْجَنَّةِ إِذْ أَقْسَمُوا لَيَصْرِمُنَّهَا مُصْبِحِينَ',english:'"Indeed We have tried them as We tried the companions of the garden — when they swore to harvest it in the morning." (68:17)',note:"The garden owners swore to harvest at dawn without mentioning Allah (no 'insha Allah'). A calamity came by night and burned it black. The lesson: never plan without acknowledging Allah's will."};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.65,p.gnd);
      // Garden (green if n<3, black if burned)
      for(let i=0;i<6;i++){
        fillRect(ctx,CW*0.06+i*CW*0.15,CH*0.4,CW*0.1,CH*0.26,'#1a3010',6);
        fillRect(ctx,CW*0.04+i*CW*0.15,CH*0.3,CW*0.14,CH*0.12,'#254520',8);}
      // Fire glow
      const fi=0.4+Math.sin(this.t*0.1)*0.2;
      ctx.fillStyle=`rgba(255,100,0,${fi})`;ctx.fillRect(0,0,CW,CH);
      _label(ctx,'CLICK: The Garden Owners — Arrogance (68:17-33)',p.label);
    };draw();
  }
}
const VD_qalam3={ref:'Al-Qalam 68:10-13',arabic:'وَلَا تُطِعْ كُلَّ حَلَّافٍ مَّهِينٍ ۩ هَمَّازٍ مَّشَّاءٍ بِنَمِيمٍ ۩ مَّنَّاعٍ لِّلْخَيْرِ مُعْتَدٍ أَثِيمٍ ۩ عُتُلٍّ بَعْدَ ذَٰلِكَ زَنِيمٍ',english:'"Do not obey every worthless habitual swearer, backbiter, slanderer, preventer of good, transgressor, sinful, cruel, and of illegitimate origin." (68:10-13)',note:"Nine negative traits listed. Allah describes who NOT to follow. The contrast with the Prophet ﷺ's exalted character is stark and deliberate."};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.72,p.gnd);
      // Two figures: Prophet (bright) vs arrogant (dark)
      _fig(ctx,CW*0.3,CH*0.72,'#f0d080');
      ctx.fillStyle='#f8e040';ctx.font='8px serif';ctx.textAlign='center';
      ctx.fillText('خُلُق عَظِيم',CW*0.3,CH*0.4);ctx.textAlign='left';
      _fig(ctx,CW*0.7,CH*0.72,'#4a3020');
      ctx.fillStyle='#e04040';ctx.font='7px serif';ctx.textAlign='center';
      ctx.fillText('حَلَّاف مَهِين',CW*0.7,CH*0.42);ctx.textAlign='left';
      _label(ctx,'CLICK: Traits of the Wicked (68:10-13)',p.label);
    };draw();
  }
}
const VD_qalam4={ref:'Al-Qalam 68:51-52',arabic:'وَإِن يَكَادُ الَّذِينَ كَفَرُوا لَيُزْلِقُونَكَ بِأَبْصَارِهِمْ لَمَّا سَمِعُوا الذِّكْرَ ۩ وَيَقُولُونَ إِنَّهُ لَمَجْنُونٌ ۩ وَمَا هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ',english:'"Those who disbelieve almost stab you with their looks when they hear the Reminder — and they say: Indeed he is mad! But it is not except a reminder for all the worlds." (68:51-52)',note:"The surah ends by returning to the opening theme: they call him mad, but the Quran is dhikr lil-'alameen — a reminder for all worlds. The Pen writes the truth forever."};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,20);_ground(ctx,CH*0.78,p.gnd);
      // Eyes staring from sides (the evil eye scene)
      const blink=Math.sin(this.t*0.08)>0.8?0.1:1;
      ctx.fillStyle='#e04040';
      ctx.beginPath();ctx.ellipse(CW*0.2,CH*0.4,18,12*blink,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#111';ctx.beginPath();ctx.arc(CW*0.2,CH*0.4,6,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#e04040';
      ctx.beginPath();ctx.ellipse(CW*0.8,CH*0.4,18,12*blink,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#111';ctx.beginPath();ctx.arc(CW*0.8,CH*0.4,6,0,Math.PI*2);ctx.fill();
      // Quran book in center
      fillRect(ctx,CW*0.42,CH*0.35,CW*0.16,CH*0.25,p.acc,6);
      _label(ctx,'CLICK: The Quran — Dhikr for All Worlds (68:51-52)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
