'use strict';
/* scenes.js — Surah Nuh */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#040e1c',sky1:'#0a1a30',gnd:'#0e2038',acc:'#60d0c0',label:'#d8f0ff',hint:'#6088a8'}:{sky0:'#020810',sky1:'#040e1a',gnd:'#081828',acc:'#40c0b0',label:'#d0ecff',hint:'#407080'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_nuh1={ref:'Nuh 71:5-7',arabic:'قَالَ رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا ۩ فَلَمْ يَزِدْهُمْ دُعَائِي إِلَّا فِرَارًا ۩ وَإِنِّي كُلَّمَا دَعَوْتُهُمْ لِتَغْفِرَ لَهُمْ جَعَلُوا أَصَابِعَهُمْ فِي آذَانِهِمْ',english:'"O my Lord — I called my people night and day. But my calling only increased them in fleeing away. And whenever I called them so You might forgive them, they put fingers in their ears and covered themselves with garments." (71:5-7)',note:"Nine hundred and fifty years of calling — and this was Nuh's complaint. They literally physically blocked their ears. Yet he persisted. Patience in da'wah has no equal."};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.7,p.gnd);
      // Prophet figure calling
      _fig(ctx,CW*0.25,CH*0.7,'#e0c080');
      ctx.strokeStyle=p.acc;ctx.lineWidth=2;
      for(let i=0;i<5;i++){const r=20+i*20,a=this.t*0.02;
        ctx.beginPath();ctx.arc(CW*0.25,CH*0.6,r*Math.abs(Math.sin(a)),0,Math.PI*2);ctx.stroke();}
      // People covering ears
      for(let i=0;i<4;i++){_fig(ctx,CW*0.45+i*CW*0.14,CH*0.7,'#808090');
        ctx.fillStyle='#606080';ctx.fillRect(CW*0.43+i*CW*0.14,CH*0.55,8,6);
        ctx.fillRect(CW*0.43+i*CW*0.14+12,CH*0.55,8,6);}
      _label(ctx,'CLICK: 950 Years of Calling — Fingers in Ears (71:5-7)',p.label);
    };draw();
  }
}
const VD_nuh2={ref:'Nuh 71:10-13',arabic:'فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا ۩ يُرْسِلِ السَّمَاءَ عَلَيْكُم مِّدْرَارًا ۩ وَيُمْدِدْكُم بِأَمْوَالٍ وَبَنِينَ وَيَجْعَل لَّكُمْ جَنَّاتٍ وَيَجْعَل لَّكُمْ أَنْهَارًا',english:'"I said: Seek forgiveness of your Lord — He is ever-Forgiving! He will send rain in abundance, support you with wealth and children, provide you gardens and rivers." (71:10-13)',note:"Nuh connected seeking forgiveness to WORLDLY blessings — rain, wealth, children, gardens, rivers. This is profound da'wah wisdom: connect deen to dunya. Istighfar opens doors of provision."};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.72,p.gnd);
      // Rain falling
      for(let i=0;i<20;i++){
        const rx=Math.random()*CW,ry=(this.t*3+i*CH/20)%CH;
        ctx.strokeStyle=`rgba(64,200,192,0.6)`;ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx-2,ry+10);ctx.stroke();}
      // Growing garden
      ctx.fillStyle='#204020';ctx.fillRect(0,CH*0.72,CW,CH*0.28);
      for(let i=0;i<7;i++){ctx.fillStyle='#306030';
        ctx.fillRect(CW*0.03+i*CW*0.13,CH*0.55,CW*0.08,CH*0.18);}
      _label(ctx,'CLICK: Istighfar Brings Blessings (71:10-13)',p.label);
    };draw();
  }
}
const VD_nuh3={ref:'Nuh 71:25-26',arabic:'مِمَّا خَطِيئَاتِهِمْ أُغْرِقُوا فَأُدْخِلُوا نَارًا ۩ فَلَمْ يَجِدُوا لَهُم مِّن دُونِ اللَّهِ أَنصَارًا ۩ وَقَالَ نُوحٌ رَّبِّ لَا تَذَرْ عَلَى الْأَرْضِ مِنَ الْكَافِرِينَ دَيَّارًا',english:'"Because of their sins they were drowned and put into Fire — and they found no helpers other than Allah. And Nuh said: O Lord, do not leave on earth any home of the disbelievers!" (71:25-26)',note:"Drowned in water, entered fire. And Nuh's prayer after 950 years: don't leave a single one. This is a prayer that sets a boundary — after exhausting every means of guidance."};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Flood water rising
      const lvl=CH*0.3+Math.sin(this.t*0.04)*CH*0.1;
      ctx.fillStyle='#0a1a2e';ctx.fillRect(0,lvl,CW,CH-lvl);
      // Waves
      ctx.strokeStyle='rgba(64,128,200,0.5)';ctx.lineWidth=3;
      ctx.beginPath();for(let x=0;x<=CW;x+=8)ctx.lineTo(x,lvl+Math.sin(x*0.1+this.t*0.08)*8);ctx.stroke();
      // Ark
      if(lvl<CH*0.55){fillRect(ctx,CW*0.3,lvl-30,CW*0.4,20,'#6a4020',4);
        fillRect(ctx,CW*0.35,lvl-55,CW*0.3,28,'#8a5a30',4);}
      _label(ctx,'CLICK: The Great Flood (71:25-26)',p.label);
    };draw();
  }
}
const VD_nuh4={ref:'Nuh 71:28',arabic:'رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ',english:'"My Lord, forgive me and my parents and whoever enters my house as a believer — and the believing men and believing women." (71:28)',note:"Nuh's final prayer: himself, his parents, his household, and ALL believing men and women. A prophet who lost his own son to denial still prays for every believer in the world. Subhan Allah."};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,30);_ground(ctx,CH*0.8,p.gnd);
      // Nuh praying figure with light above
      _fig(ctx,CW*0.5,CH*0.8,'#e0c080');
      const glow=0.4+Math.sin(this.t*0.04)*0.2;
      const g=ctx.createRadialGradient(CW*0.5,CH*0.3,5,CW*0.5,CH*0.3,70);
      g.addColorStop(0,`rgba(96,208,192,${glow})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      ctx.fillStyle=p.acc;ctx.font='9px serif';ctx.textAlign='center';
      ctx.fillText('رَبِّ اغْفِرْ لِي',CW*0.5,CH*0.35);ctx.textAlign='left';
      _label(ctx,"CLICK: Nuh's Prayer for All Believers (71:28)",p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
