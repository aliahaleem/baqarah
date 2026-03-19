'use strict';
/* scenes.js — Surah Al-Muzzammil */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#080c1e',sky1:'#101a30',gnd:'#141e38',acc:'#c0d8f8',label:'#e8eeff',hint:'#7080a0'}:{sky0:'#04060e',sky1:'#080c18',gnd:'#0e1424',acc:'#a8c8f0',label:'#e0e8ff',hint:'#506078'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_muzzammil1={ref:'Al-Muzzammil 73:1-4',arabic:'يَا أَيُّهَا الْمُزَّمِّلُ ۩ قُمِ اللَّيْلَ إِلَّا قَلِيلًا ۩ نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا ۩ أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',english:'"O you wrapped in garments — arise and pray the night, except a little. Half of it or subtract a little. Or add to it — and recite the Quran with measured recitation." (73:1-4)',note:'The Prophet ﷺ is cloaked/wrapped. Allah calls him by his state, not by rank — intimate and tender. Then: arise! Half the night. The night prayer builds the inner strength needed for the heavy mission ahead.'};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_muzzammilz1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,30);_ground(ctx,CH*0.8,p.gnd);
      // Moon
      ctx.fillStyle='#c8d8f0';ctx.beginPath();ctx.arc(CW*0.8,CH*0.18,18,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=p.sky0;ctx.beginPath();ctx.arc(CW*0.86,CH*0.15,14,0,Math.PI*2);ctx.fill();
      // Prophet wrapped then arising
      const arise=Math.min(1,this.t*0.01);
      _fig(ctx,CW*0.3,CH*0.8,'#e0c080');
      ctx.fillStyle='rgba(224,192,128,0.3)';ctx.fillRect(CW*0.24,CH*0.5+arise*CH*0.2,18,CH*0.3-arise*CH*0.2);
      _label(ctx,'CLICK: Arise and Pray the Night (73:1-4)',p.label);
    };draw();
  }
}
const VD_muzzammil2={ref:'Al-Muzzammil 73:5-6',arabic:'إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا ۩ إِنَّ نَاشِئَةَ اللَّيْلِ هِيَ أَشَدُّ وَطْئًا وَأَقْوَمُ قِيلًا',english:'"Indeed We will cast upon you a heavy word. Indeed the night devotion is more impactful spiritually and more suitable for the tongue." (73:5-6)',note:"The Quran is a 'heavy word' (qawlun thaqeel). Heavy in responsibility, in demands, in transformation it requires. The night prayer prepares you to carry this weight. Deep roots to hold great trees."};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_muzzammilz2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,20);_ground(ctx,CH*0.82,p.gnd);
      // Heavy book pressing down
      const heavy=3+Math.sin(this.t*0.04)*2;
      fillRect(ctx,CW*0.35,CH*0.25+heavy,CW*0.3,CH*0.3,p.acc,6);
      // Weight arrows
      ctx.strokeStyle=p.acc;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(CW*0.5,CH*0.58+heavy);ctx.lineTo(CW*0.5,CH*0.72);
      ctx.lineTo(CW*0.46,CH*0.66);ctx.moveTo(CW*0.5,CH*0.72);ctx.lineTo(CW*0.54,CH*0.66);ctx.stroke();
      // Roots below
      ctx.strokeStyle='rgba(128,100,60,0.6)';ctx.lineWidth=2;
      for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(CW*0.3+i*CW*0.1,CH*0.82);ctx.lineTo(CW*0.25+i*CW*0.12,CH*0.95+i*4);ctx.stroke();}
      _label(ctx,'CLICK: The Heavy Word — Night Builds Roots (73:5-6)',p.label);
    };draw();
  }
}
const VD_muzzammil3={ref:'Al-Muzzammil 73:20',arabic:'إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ تَقُومُ أَدْنَىٰ مِن ثُلُثَيِ اللَّيْلِ وَنِصْفَهُ وَثُلُثَهُ ۩ وَطَائِفَةٌ مِّنَ الَّذِينَ مَعَكَ ۩ وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ',english:'"Your Lord knows that you stand in prayer nearly two-thirds of the night, or half of it, or a third — and a group of those with you. Whatever good you send ahead for yourself, you will find it better with Allah." (73:20)',note:'Allah SEES the precise measure of the night prayer. Two-thirds, half, a third — He knows. Then the beautiful promise: whatever good you send ahead, you will find it better with Allah. Bank your deeds for the akhirah!'};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_muzzammilz3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,35);_ground(ctx,CH*0.82,p.gnd);
      // Clock / time fraction markers
      const ang=(this.t*0.01)%(Math.PI*2);
      ctx.strokeStyle='rgba(192,216,248,0.3)';ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(CW*0.5,CH*0.45,40,0,Math.PI*2);ctx.stroke();
      ctx.strokeStyle=p.acc;ctx.lineWidth=4;
      ctx.beginPath();ctx.moveTo(CW*0.5,CH*0.45);
      ctx.arc(CW*0.5,CH*0.45,40,-Math.PI/2,-Math.PI/2+ang);ctx.fill();
      // Praying figure
      _fig(ctx,CW*0.5,CH*0.82,'#e0c080');
      _label(ctx,'CLICK: Allah Counts Your Night Prayer (73:20)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
