'use strict';
/* scenes.js — Surah Al-Qiyamah */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#1a1008',sky1:'#2c1e10',gnd:'#321a0c',acc:'#f8f0c0',label:'#fffff0',hint:'#c0a870'}:{sky0:'#0e0a04',sky1:'#180e06',gnd:'#1c1008',acc:'#f0e8b0',label:'#fffff0',hint:'#a08050'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_qiyamah1={ref:'Al-Qiyamah 75:1-4',arabic:'لَا أُقْسِمُ بِيَوْمِ الْقِيَامَةِ ۩ وَلَا أُقْسِمُ بِالنَّفْسِ اللَّوَّامَةِ ۩ أَيَحْسَبُ الْإِنسَانُ أَلَّن نَجْمَعَ عِظَامَهُ ۩ بَلَىٰ قَادِرِينَ عَلَىٰ أَن نُّسَوِّيَ بَنَانَهُ',english:'"I swear by the Day of Resurrection. And I swear by the reproaching soul. Does man think We will not collect his bones? Yes indeed — We are able to restore even his fingertips." (75:1-4)',note:'The first oath by the Day itself is unprecedented. The second is by the nafs lawwama — the self-reproaching soul, the conscience. Allah swears by YOUR CONSCIENCE. It is a witness to the Day. Then: even fingertips, bone by bone.'};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qiyamahy1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      const pulse=0.5+Math.sin(this.t*0.04)*0.3;
      const g=ctx.createRadialGradient(CW*0.5,CH*0.5,10,CW*0.5,CH*0.5,100);
      g.addColorStop(0,`rgba(248,240,160,${pulse})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      _stars(ctx,20);
      // Bones
      ctx.fillStyle='rgba(240,224,180,0.7)';
      for(let i=0;i<6;i++){ctx.fillRect(CW*0.2+i*40,CH*0.5+Math.sin(i+this.t*0.02)*8,24,8);
        ctx.fillRect(CW*0.22+i*40,CH*0.4,8,24);}
      _label(ctx,'CLICK: Two Oaths — Bone by Bone (75:1-4)',p.label);
    };draw();
  }
}
const VD_qiyamah2={ref:'Al-Qiyamah 75:7-10',arabic:'فَإِذَا بَرِقَ الْبَصَرُ ۩ وَخَسَفَ الْقَمَرُ ۩ وَجُمِعَ الشَّمْسُ وَالْقَمَرُ ۩ يَقُولُ الْإِنسَانُ يَوْمَئِذٍ أَيْنَ الْمَفَرُّ',english:'"When the sight is dazzled, and the moon is eclipsed, and the sun and moon are brought together — man will say on that Day: Where is the place of escape?" (75:7-10)',note:"Sun and moon joined together — all light merging into dissolution. And man asks: 'Ayna al-mafar?' — where can I flee? The answer: nowhere. The refuge is only in Allah, and the time for that refuge is NOW."};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qiyamahy2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Eclipse — sun and moon merging
      const merge=Math.sin(this.t*0.02)*0.5+0.5;
      ctx.fillStyle='#c08020';ctx.beginPath();ctx.arc(CW*(0.35+merge*0.15),CH*0.35,25,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#e0e8c0';ctx.beginPath();ctx.arc(CW*(0.65-merge*0.15),CH*0.35,22,0,Math.PI*2);ctx.fill();
      _ground(ctx,CH*0.75,p.gnd);
      // Fleeing man
      const fx=CW*0.3+(this.t*0.5)%(CW*0.6);
      _fig(ctx,fx,CH*0.75,'#808090');
      _label(ctx,'CLICK: Sun & Moon Merge — Where to Flee? (75:7-10)',p.label);
    };draw();
  }
}
const VD_qiyamah3={ref:'Al-Qiyamah 75:17-18',arabic:'إِنَّ عَلَيْنَا جَمْعَهُ وَقُرْآنَهُ ۩ فَإِذَا قَرَأْنَاهُ فَاتَّبِعْ قُرْآنَهُ',english:'"Indeed upon Us is its collection and recitation. So when We have recited it, follow its recitation." (75:17-18)',note:"Allah personally takes responsibility for preserving the Quran — collecting it in the Prophet's heart, and guiding its recitation. This is one of the most significant divine commitments in the entire Quran: the preservation is guaranteed by Allah Himself."};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qiyamahy3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,25);_ground(ctx,CH*0.82,p.gnd);
      const glow=0.4+Math.sin(this.t*0.03)*0.2;
      const g=ctx.createRadialGradient(CW*0.5,CH*0.4,5,CW*0.5,CH*0.4,80);
      g.addColorStop(0,`rgba(192,216,248,${glow})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      fillRect(ctx,CW*0.38,CH*0.28,CW*0.24,CH*0.35,p.acc,8);
      ctx.fillStyle=p.sky0;ctx.font='8px serif';ctx.textAlign='center';
      ctx.fillText('إِنَّ عَلَيْنَا جَمْعَهُ',CW*0.5,CH*0.48);ctx.textAlign='left';
      _label(ctx,'CLICK: Allah Personally Preserves the Quran (75:17-18)',p.label);
    };draw();
  }
}
const VD_qiyamah4={ref:'Al-Qiyamah 75:22-25',arabic:'وُجُوهٌ يَوْمَئِذٍ نَّاضِرَةٌ ۩ إِلَىٰ رَبِّهَا نَاظِرَةٌ ۩ وَوُجُوهٌ يَوْمَئِذٍ بَاسِرَةٌ ۩ تَظُنُّ أَن يُفْعَلَ بِهَا فَاقِرَةٌ',english:'"Faces that Day will be radiant — looking at their Lord. And faces that Day will be gloomy — thinking that a back-breaking calamity is coming." (75:22-25)',note:'Two contrasting faces. The believer: radiant, looking at their Lord — the greatest reward in Jannah. The disbeliever: gloomy, sensing the coming catastrophe. The face reflects the inner state built throughout a lifetime.'};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qiyamahy4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.78,p.gnd);
      // Bright face (left) vs dark face (right)
      const gb=0.5+Math.sin(this.t*0.04)*0.2;
      const brightG=ctx.createRadialGradient(CW*0.28,CH*0.45,2,CW*0.28,CH*0.45,28);
      brightG.addColorStop(0,`rgba(248,240,160,${gb})`);brightG.addColorStop(1,'transparent');
      ctx.fillStyle=brightG;ctx.fillRect(0,0,CW,CH);
      ctx.fillStyle='#f8e890';ctx.beginPath();ctx.arc(CW*0.28,CH*0.45,18,0,Math.PI*2);ctx.fill();
      // Dark face
      ctx.fillStyle='#303020';ctx.beginPath();ctx.arc(CW*0.72,CH*0.45,18,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#606040';ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(CW*0.72,CH*0.5,12,0.3,Math.PI-0.3);ctx.stroke();
      _label(ctx,'CLICK: Two Faces — Radiant vs Gloomy (75:22-25)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
