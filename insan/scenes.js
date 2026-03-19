'use strict';
/* scenes.js — Surah Al-Insan */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#040e04',sky1:'#0a1c0a',gnd:'#0c1a0c',acc:'#c0e8f0',label:'#e8fff0',hint:'#70a080'}:{sky0:'#020602',sky1:'#060e06',gnd:'#081008',acc:'#a0d8e8',label:'#e0f8e8',hint:'#508060'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_insan1={ref:'Al-Insan 76:1-3',arabic:'هَلْ أَتَىٰ عَلَى الْإِنسَانِ حِينٌ مِّنَ الدَّهْرِ لَمْ يَكُن شَيْئًا مَّذْكُورًا ۩ إِنَّا خَلَقْنَا الْإِنسَانَ مِن نُّطْفَةٍ أَمْشَاجٍ نَّبْتَلِيهِ ۩ فَجَعَلْنَاهُ سَمِيعًا بَصِيرًا',english:'"Was there not upon man a period of time when he was not a thing even mentioned? We created man from a mixed drop — to test him — and We made him hearing and seeing." (76:1-3)',note:"The rhetorical question silences arrogance: you were NOTHING. Less than nothing — not even worth mentioning. Then from a drop, Allah raised you to hearing and seeing. And then gave you the path. Now it's your choice."};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_insann1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Void to existence
      const frac=Math.min(1,this.t*0.008);
      ctx.fillStyle=`rgba(16,60,24,${frac})`;ctx.fillRect(0,CH*0.6,CW,CH*0.4);
      // Drop of water
      ctx.fillStyle=`rgba(64,200,192,${frac})`;ctx.beginPath();
      ctx.arc(CW*0.5,CH*0.4,frac*20,0,Math.PI*2);ctx.fill();
      // Figure emerging
      if(frac>0.5)_fig(ctx,CW*0.5,CH*0.8,'#c0a080',Math.max(1,10*(frac-0.5)*2));
      ctx.fillStyle=p.acc;ctx.font='8px serif';ctx.textAlign='center';
      ctx.fillText('هَلْ أَتَىٰ',CW*0.5,CH*0.2);ctx.textAlign='left';
      _label(ctx,'CLICK: From Nothing to Hearing & Seeing (76:1-3)',p.label);
    };draw();
  }
}
const VD_insan2={ref:'Al-Insan 76:8-9',arabic:'وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا ۩ إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا',english:'"They give food — despite their love for it — to the poor, the orphan, and the captive. [Saying] We feed you only for the sake of Allah. We desire no reward from you nor gratitude." (76:8-9)',note:"The phrase 'despite their love for it' — they are HUNGRY but they give anyway. And their words of pure ikhlas: no reward needed, no thanks needed. This is the highest form of giving — purely for Allah."};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_insann2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.72,p.gnd);
      // Giving figure
      _fig(ctx,CW*0.28,CH*0.72,'#e0c080');
      // Bread/food offering
      fillRect(ctx,CW*0.34,CH*0.58,22,14,'#d0b040',6);
      // Three receiving figures (poor, orphan, captive — third has chain)
      _fig(ctx,CW*0.52,CH*0.72,'#c0a080');
      _fig(ctx,CW*0.64,CH*0.72,'#a08060',7);
      _fig(ctx,CW*0.76,CH*0.72,'#808080');
      ctx.strokeStyle='#606060';ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(CW*0.76,CH*0.72+2,12,0,Math.PI*1.2);ctx.stroke();
      _label(ctx,"CLICK: Feeding the Poor for Allah's Sake (76:8-9)",p.label);
    };draw();
  }
}
const VD_insan3={ref:'Al-Insan 76:13-16',arabic:'مُتَّكِئِينَ فِيهَا عَلَى الْأَرَائِكِ ۩ لَا يَرَوْنَ فِيهَا شَمْسًا وَلَا زَمْهَرِيرًا ۩ وَدَانِيَةً عَلَيْهِمْ ظِلَالُهَا وَوَجُنِيهَا تَذْلِيلًا ۩ وَيُطَافُ عَلَيْهِم بِآنِيَةٍ مِّن فِضَّةٍ',english:'"Reclining therein on raised couches — they will see no sun or cold therein. Close over them its shades, and its bunches of fruit hanging low. And around them will be circulated silver vessels." (76:13-16)',note:'Jannah: reclining, perfect temperature, shade, fruit within reach, silver goblets. These are not metaphors — these are promises from the One who created the universe. Every detail is intentional.'};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_insann3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Jannah scene — green, flowing, peaceful
      ctx.fillStyle='#0a2a0e';ctx.fillRect(0,CH*0.55,CW,CH*0.45);
      // Trees
      for(let i=0;i<6;i++){ctx.fillStyle='#1e6028';ctx.fillRect(CW*0.05+i*CW*0.16,CH*0.32,CW*0.1,CH*0.25);
        ctx.fillStyle='#2a8038';ctx.beginPath();ctx.arc(CW*0.1+i*CW*0.16,CH*0.32,CW*0.065,0,Math.PI*2);ctx.fill();}
      // Fruit hanging low (animated sway)
      for(let i=0;i<5;i++){const sy=Math.sin(this.t*0.03+i)*5;
        ctx.fillStyle='#e07040';ctx.beginPath();ctx.arc(CW*0.08+i*CW*0.2,CH*0.42+sy,6,0,Math.PI*2);ctx.fill();}
      // Person reclining
      ctx.fillStyle='#d0a060';ctx.fillRect(CW*0.42,CH*0.62,CW*0.16,8);
      ctx.fillStyle='#c0a070';ctx.beginPath();ctx.arc(CW*0.42,CH*0.62+4,10,0,Math.PI*2);ctx.fill();
      _label(ctx,'CLICK: Jannah — Shade, Fruit, Silver Goblets (76:13-16)',p.label);
    };draw();
  }
}
const VD_insan4={ref:'Al-Insan 76:25-26',arabic:'وَاذْكُرِ اسْمَ رَبِّكَ بُكْرَةً وَأَصِيلًا ۩ وَمِنَ اللَّيْلِ فَاسْجُدْ لَهُ وَسَبِّحْهُ لَيْلًا طَوِيلًا',english:'"And remember the name of your Lord morning and evening. And during the night prostrate to Him and glorify Him through the long night." (76:25-26)',note:"Three times of remembrance: morning, evening, and the long night. After describing Jannah's rewards for the righteous, this is the practical instruction: dhikr and sujood. The path to Jannah is built through remembrance."};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_insann4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,25);_ground(ctx,CH*0.8,p.gnd);
      // Morning: sunrise glow
      const g=ctx.createRadialGradient(CW*0.1,CH*0.3,5,CW*0.1,CH*0.3,80);
      g.addColorStop(0,'rgba(240,180,60,0.4)');g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      // Evening: moon
      ctx.fillStyle='#c0d0e8';ctx.beginPath();ctx.arc(CW*0.85,CH*0.2,14,0,Math.PI*2);ctx.fill();
      // Praying figure in night
      _fig(ctx,CW*0.5,CH*0.8,'#e0c080');
      ctx.fillStyle=p.acc;ctx.font='7px serif';ctx.textAlign='center';
      ctx.fillText('بُكْرَةً ۩ أَصِيلًا ۩ لَيْلًا',CW*0.5,CH*0.35);ctx.textAlign='left';
      _label(ctx,'CLICK: Remember Allah Morning, Evening & Night (76:25-26)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
