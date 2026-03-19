'use strict';
/* scenes.js — Surah Al-Jinn */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#0c0418',sky1:'#180830',gnd:'#1c0a38',acc:'#40e090',label:'#f0e8ff',hint:'#9070c0'}:{sky0:'#060210',sky1:'#0c0418',gnd:'#100620',acc:'#30c070',label:'#e8e0ff',hint:'#705090'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_jinn1={ref:'Al-Jinn 72:1-2',arabic:'قُلْ أُوحِيَ إِلَيَّ أَنَّهُ اسْتَمَعَ نَفَرٌ مِّنَ الْجِنِّ فَقَالُوا إِنَّا سَمِعْنَا قُرْآنًا عَجَبًا ۩ يَهْدِي إِلَى الرُّشْدِ فَآمَنَّا بِهِ',english:'"Say: It has been revealed to me that a group of jinn listened and said: We have heard a wondrous Quran — it guides to the right course and we have believed in it." (72:1-2)',note:"The jinn heard the Quran and immediately recognized its extraordinariness. Their word: 'ajan' — wondrous, amazing! And immediately: 'we believed in it.' The Quran moves all creation."};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,40);_ground(ctx,CH*0.78,p.gnd);
      // Jinn figures listening (smoky/ethereal)
      for(let i=0;i<5;i++){
        const fl=Math.sin(this.t*0.05+i)*5;
        ctx.fillStyle=`rgba(112,48,176,${0.5+i*0.08})`;
        ctx.beginPath();ctx.arc(CW*0.1+i*CW*0.2,CH*0.6+fl,10,0,Math.PI*2);ctx.fill();
        ctx.fillRect(CW*0.1+i*CW*0.2-5,CH*0.6+10+fl,10,16);}
      // Quran light
      const g=ctx.createRadialGradient(CW*0.5,CH*0.3,5,CW*0.5,CH*0.3,50);
      g.addColorStop(0,'rgba(64,224,144,0.5)');g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      _label(ctx,'CLICK: Jinn Hear the Quran & Believe (72:1-2)',p.label);
    };draw();
  }
}
const VD_jinn2={ref:'Al-Jinn 72:3-4',arabic:'وَأَنَّهُ تَعَالَىٰ جَدُّ رَبِّنَا مَا اتَّخَذَ صَاحِبَةً وَلَا وَلَدًا ۩ وَأَنَّهُ كَانَ يَقُولُ سَفِيهُنَا عَلَى اللَّهِ شَطَطًا',english:'"That our Lord is exalted in His majesty — He has taken no wife or son. But the foolish among us used to say outrageous things about Allah." (72:3-4)',note:'The believing jinn immediately correct their theology: Allah has no wife, no son. And they confess: our foolish ones were wrong to say outrageous things. Belief corrects wrong ideas immediately.'};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,35);_ground(ctx,CH*0.8,p.gnd);
      // Jinn figure reporting back
      _fig(ctx,CW*0.2,CH*0.8,'#9050d0');
      ctx.strokeStyle=p.acc;ctx.lineWidth=2;
      for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(CW*0.2,CH*0.7,20+i*15,0,Math.PI*2*(0.5+Math.sin(this.t*0.03)*0.3));ctx.stroke();}
      // Crowd of jinn
      for(let i=0;i<6;i++)_fig(ctx,CW*0.35+i*CW*0.11,CH*0.8,`rgba(96,40,160,${0.5+i*0.07})`);
      _label(ctx,'CLICK: Jinn Report Back to Their People (72:3-4)',p.label);
    };draw();
  }
}
const VD_jinn3={ref:'Al-Jinn 72:8-9',arabic:'وَأَنَّا لَمَسْنَا السَّمَاءَ فَوَجَدْنَاهَا مُلِئَتْ حَرَسًا شَدِيدًا وَشُهُبًا ۩ وَأَنَّا كُنَّا نَقْعُدُ مِنْهَا مَقَاعِدَ لِلسَّمْعِ',english:'"We reached toward the heaven but found it filled with powerful guards and flaming meteors. We used to sit in positions to listen but anyone listening now finds a flaming meteor lying in wait." (72:8-9)',note:"Before the Prophet ﷺ, jinn used to eavesdrop on heavenly news. After his prophethood, the heavens were sealed — guarded by fierce angels and shooting stars. The Prophet's arrival changed the universe."};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Heaven guarded — shooting stars
      for(let i=0;i<15;i++){
        const sx=(this.t*4+i*40)%CW,sy=((this.t*2+i*20)%CH*0.5);
        ctx.strokeStyle=`rgba(255,220,64,0.7)`;ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx-12,sy+8);ctx.stroke();}
      _ground(ctx,CH*0.75,p.gnd);
      // Guard angels
      for(let i=0;i<3;i++){_fig(ctx,CW*0.25+i*CW*0.25,CH*0.55,'#c0d8f8');
        fillRect(ctx,CW*0.22+i*CW*0.25,CH*0.4,16,28,'rgba(192,216,248,0.4)',4);}
      _label(ctx,'CLICK: Heaven Guarded — Shooting Stars (72:8-9)',p.label);
    };draw();
  }
}
const VD_jinn4={ref:'Al-Jinn 72:18-19',arabic:'وَأَنَّ الْمَسَاجِدَ لِلَّهِ فَلَا تَدْعُوا مَعَ اللَّهِ أَحَدًا ۩ وَأَنَّهُ لَمَّا قَامَ عَبْدُ اللَّهِ يَدْعُوهُ كَادُوا يَكُونُونَ عَلَيْهِ لِبَدًا',english:'"The mosques are for Allah — so call on no one beside Him. When the servant of Allah stood calling on Him, they almost crowded upon him in multitudes." (72:18-19)',note:'Pure tawhid: mosques = only for Allah. Then a miraculous scene: when the Prophet ﷺ stood to pray, jinn almost crushed upon him in eagerness! Such is the power of sincere devotion to Allah.'};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.75,p.gnd);
      // Mosque dome
      fillRect(ctx,CW*0.35,CH*0.42,CW*0.3,CH*0.34,'#2a1838',8);
      ctx.fillStyle='rgba(64,224,144,0.4)';ctx.beginPath();ctx.arc(CW*0.5,CH*0.42,CW*0.12,0,Math.PI,true);ctx.fill();
      // Praying prophet figure + jinn crowding
      _fig(ctx,CW*0.5,CH*0.75,'#e0c080');
      for(let i=0;i<8;i++){const a=i/8*Math.PI*2,r=30+Math.sin(this.t*0.04)*5;
        _fig(ctx,CW*0.5+Math.cos(a)*r,CH*0.65+Math.sin(a)*r*0.3,`rgba(112,48,176,0.6)`,7);}
      _label(ctx,'CLICK: Mosques for Allah — Jinn Crowd Around (72:18-19)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
