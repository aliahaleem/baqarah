'use strict';
/* scenes.js — Surah Al-Haqqah */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#1e0606',sky1:'#300e0e',gnd:'#3a1a1a',acc:'#f8d040',label:'#fff0e8',hint:'#d08070'}:{sky0:'#0e0202',sky1:'#1a0606',gnd:'#2a0e0e',acc:'#e8c030',label:'#ffe8e0',hint:'#905050'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_haqqah1={ref:'Al-Haqqah 69:1-3',arabic:'الْحَاقَّةُ ۩ مَا الْحَاقَّةُ ۩ وَمَا أَدْرَاكَ مَا الْحَاقَّةُ',english:'"The Inevitable Reality! What is the Inevitable Reality? And what could make you know what the Inevitable Reality is?" (69:1-3)',note:"Three rapid questions build the awe. The name Al-Haqqah comes from 'haqqa' — to be true, inevitable, certain. The repetition mimics the weight of the day: you can't contain it in one mention."};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_haqqah1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      const pulse=0.7+Math.sin(this.t*0.05)*0.3;
      ctx.fillStyle=`rgba(255,80,30,${pulse*0.4})`;ctx.fillRect(0,0,CW,CH);
      ctx.fillStyle=`rgba(248,208,64,${pulse})`;ctx.font='28px serif';ctx.textAlign='center';
      ctx.fillText('الْحَاقَّةُ',CW*0.5,CH*0.45);ctx.textAlign='left';
      _stars(ctx,15);
      _label(ctx,'CLICK: Al-Haqqah — The Inevitable Reality (69:1-3)',p.label);
    };draw();
  }
}
const VD_haqqah2={ref:'Al-Haqqah 69:5-8',arabic:'فَأَمَّا ثَمُودُ فَأُهْلِكُوا بِالطَّاغِيَةِ ۩ وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ ۩ سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا',english:'"Thamud was destroyed by the overwhelming blast. And Ad was destroyed by a furious howling wind which He imposed on them for seven nights and eight days uninterrupted." (69:5-7)',note:'Thamud: one blast. Ad: seven nights and eight days of relentless wind. Different destructions for different denials — each perfectly suited to expose the futility of their arrogance.'};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_haqqah2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.7,p.gnd);
      // Wind streaks for Ad
      for(let i=0;i<10;i++){
        ctx.strokeStyle=`rgba(255,160,30,${0.3+Math.random()*0.3})`;ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(0,CH*0.1+i*CH*0.08);ctx.lineTo(CW,CH*0.1+i*CH*0.08+Math.sin(this.t*0.03+i)*20);ctx.stroke();}
      // Rubble
      for(let i=0;i<8;i++)fillRect(ctx,CW*0.05+i*CW*0.12,CH*0.6+Math.random()*8,CW*0.08,CH*0.12,p.gnd,4);
      _label(ctx,'CLICK: Thamud & Ad Destroyed (69:5-8)',p.label);
    };draw();
  }
}
const VD_haqqah3={ref:'Al-Haqqah 69:13-15',arabic:'فَإِذَا نُفِخَ فِي الصُّورِ نَفْخَةٌ وَاحِدَةٌ ۩ وَحُمِلَتِ الْأَرْضُ وَالْجِبَالُ فَدُكَّتَا دَكَّةً وَاحِدَةً',english:'"Then when the Trumpet is blown with one blast — and the earth and mountains are lifted and leveled with one blow." (69:13-14)',note:"One blast — one blow — and the entire physical universe is shattered. The certainty and swiftness of Allah's power on that Day is absolute."};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_haqqah3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Trumpet blast — shock wave
      const ring=((this.t*3)%120);
      ctx.strokeStyle=`rgba(248,208,64,${1-ring/120})`;ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(CW*0.5,CH*0.5,ring,0,Math.PI*2);ctx.stroke();
      ctx.strokeStyle=`rgba(255,120,30,${1-ring/120})`;ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(CW*0.5,CH*0.5,ring*0.6,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle=p.acc;ctx.font='24px serif';ctx.textAlign='center';
      ctx.fillText('📯',CW*0.5,CH*0.5+8);ctx.textAlign='left';
      _label(ctx,'CLICK: The Trumpet Blast (69:13-15)',p.label);
    };draw();
  }
}
const VD_haqqah4={ref:'Al-Haqqah 69:19-22',arabic:'فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ فَيَقُولُ هَاؤُمُ اقْرَءُوا كِتَابِيَهْ ۩ إِنِّي ظَنَنتُ أَنِّي مُلَاقٍ حِسَابِيَهْ ۩ فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ',english:'"As for he who is given his record in his right hand — he will say: Here, read my record! I was certain I would meet my account! And he will be in a pleasant life." (69:19-21)',note:'The right-hand person announces their book publicly — full of joy and confidence! They KNEW this Day was coming and they prepared for it. Certainty of the Day motivates action.'};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_haqqah4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.75,p.gnd);
      // Right hand (gold book)
      _fig(ctx,CW*0.28,CH*0.75,'#f0d080');
      fillRect(ctx,CW*0.32,CH*0.54,24,32,p.acc,4);
      ctx.fillStyle=p.sky0;ctx.font='7px serif';ctx.textAlign='center';
      ctx.fillText('📖',CW*0.32+12,CH*0.54+20);ctx.textAlign='left';
      // Left hand (dark book)
      _fig(ctx,CW*0.72,CH*0.75,'#4a3030');
      fillRect(ctx,CW*0.56,CH*0.54,24,32,'#3a1010',4);
      _label(ctx,'CLICK: Right & Left Hand — Two Fates (69:19-25)',p.label);
    };draw();
  }
}
const VD_haqqah5={ref:'Al-Haqqah 69:40-43',arabic:'إِنَّهُ لَقَوْلُ رَسُولٍ كَرِيمٍ ۩ وَمَا هُوَ بِقَوْلِ شَاعِرٍ ۩ قَلِيلًا مَّا تُؤْمِنُونَ ۩ وَلَا بِقَوْلِ كَاهِنٍ',english:'"Indeed it is the word of a noble Messenger — and it is not the word of a poet (little do you believe!) — and not the word of a soothsayer!" (69:40-42)',note:'After the overwhelming imagery of Judgment Day, Allah defends the Quran: noble messenger (not madman), not a poet, not a soothsayer. Three denials, one affirmation: this is revelation.'};

class S5 extends BS{
  constructor(){super('canvas-5');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_haqqah5);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,25);_ground(ctx,CH*0.78,p.gnd);
      // Quran scroll with glow
      const glow=0.5+Math.sin(this.t*0.05)*0.3;
      const g=ctx.createRadialGradient(CW*0.5,CH*0.45,5,CW*0.5,CH*0.45,60);
      g.addColorStop(0,`rgba(248,208,64,${glow})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      fillRect(ctx,CW*0.38,CH*0.3,CW*0.24,CH*0.32,p.acc,8);
      ctx.fillStyle=p.sky0;ctx.font='7px serif';ctx.textAlign='center';
      ctx.fillText('قَوْلُ رَسُولٍ كَرِيمٍ',CW*0.5,CH*0.5);ctx.textAlign='left';
      _label(ctx,'CLICK: The Quran — Word of Noble Messenger (69:40-43)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();_scenes[5]=new S5();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
