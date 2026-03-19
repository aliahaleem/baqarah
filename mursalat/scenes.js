'use strict';
/* scenes.js — Surah Al-Mursalat */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#0c0818',sky1:'#181428',gnd:'#1c1430',acc:'#40d0c0',label:'#f0ecff',hint:'#8070a8'}:{sky0:'#060410',sky1:'#0c0818',gnd:'#101020',acc:'#28b8a8',label:'#e8e4ff',hint:'#605088'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_mursalat1={ref:'Al-Mursalat 77:1-5',arabic:'وَالْمُرْسَلَاتِ عُرْفًا ۩ فَالْعَاصِفَاتِ عَصْفًا ۩ وَالنَّاشِرَاتِ نَشْرًا ۩ فَالْفَارِقَاتِ فَرْقًا ۩ فَالْمُلْقِيَاتِ ذِكْرًا',english:'"By those sent forth in succession! By the raging winds! By those which spread and scatter! By those who separate! By those who deliver the reminder!" (77:1-5)',note:"Five groups of oaths — each describing a different aspect of how Allah sends His signs and messages: gently, powerfully, spreading, distinguishing, and finally delivering the reminder (the Quran). Everything in creation serves the mission of da'wah."};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_mursalatu1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Wind streaks — five different directions
      const dirs=[[0,0.2,1,0.3],[0,0.5,1,0.6],[0,0.8,1,0.7],[0.2,0,0.3,1],[0.7,0,0.6,1]];
      dirs.forEach((d,i)=>{
        ctx.strokeStyle=`rgba(64,208,192,${0.3+i*0.1})`;ctx.lineWidth=2+i*0.5;
        ctx.beginPath();ctx.moveTo(CW*d[0],CH*d[1]);
        ctx.lineTo(CW*d[2]+Math.sin(this.t*0.04+i)*20,CH*d[3]);ctx.stroke();});
      // Stars being scattered
      for(let i=0;i<15;i++){const sx=CW*0.1+i*CW*0.06,sy=CH*0.1+i*4;
        const scatter=Math.sin(this.t*0.03+i)*30;
        ctx.fillStyle=`rgba(200,220,255,${0.5+Math.sin(i)*0.3})`;
        ctx.beginPath();ctx.arc(sx+scatter,sy,2,0,Math.PI*2);ctx.fill();}
      _label(ctx,'CLICK: Five Wind Oaths — Sent in Succession (77:1-5)',p.label);
    };draw();
  }
}
const VD_mursalat2={ref:'Al-Mursalat 77:7-13',arabic:'إِنَّمَا تُوعَدُونَ لَوَاقِعٌ ۩ فَإِذَا النُّجُومُ طُمِسَتْ ۩ وَإِذَا السَّمَاءُ فُرِجَتْ ۩ وَإِذَا الْجِبَالُ نُسِفَتْ ۩ وَإِذَا الرُّسُلُ أُقِّتَتْ ۩ لِأَيِّ يَوْمٍ أُجِّلَتْ ۩ لِيَوْمِ الْفَصْلِ',english:'"Indeed that which you are promised will occur. When the stars are extinguished, when the sky is opened, when the mountains are blown away, when the messengers are gathered — for what day was it delayed? For the Day of Sorting!" (77:7-13)',note:"The Hour is certain. Four cosmic signs precede it. And the rhetorical build: 'For WHAT Day was this delayed?' — then the thunderous answer: YAWM AL-FASL — the Day of Sorting. Every ambiguity is resolved."};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_mursalatu2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Stars extinguishing
      for(let i=0;i<20;i++){const brightness=Math.max(0,0.8-this.t*0.005+Math.sin(i)*0.3);
        ctx.fillStyle=`rgba(200,220,255,${brightness})`;
        ctx.beginPath();ctx.arc(CW*0.05+i*CW*0.048,CH*0.08+i*CH*0.02,2,0,Math.PI*2);ctx.fill();}
      // Mountains being blown
      for(let i=0;i<5;i++){const blow=Math.min(50,this.t*0.3+i*5);
        ctx.fillStyle=`rgba(64,40,20,${0.8-blow*0.015})`;
        ctx.beginPath();ctx.moveTo(CW*0.08+i*CW*0.18,CH*0.75);
        ctx.lineTo(CW*0.14+i*CW*0.18+blow,CH*0.45+blow*0.5);
        ctx.lineTo(CW*0.20+i*CW*0.18+blow*2,CH*0.75);ctx.fill();}
      _label(ctx,'CLICK: Stars Extinguished — Day of Sorting (77:7-13)',p.label);
    };draw();
  }
}
const VD_mursalat3={ref:'Al-Mursalat 77:16-19',arabic:'أَلَمْ نُهْلِكِ الْأَوَّلِينَ ۩ ثُمَّ نُتْبِعُهُمُ الْآخِرِينَ ۩ كَذَٰلِكَ نَفْعَلُ بِالْمُجْرِمِينَ ۩ وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',english:'"Did We not destroy the former peoples? Then We will follow them with the later ones. Thus do We deal with the criminals. Woe that Day to the deniers!" (77:16-19)',note:"History as proof: we destroyed them. The later ones will follow. The pattern is consistent. And then — the refrain: Waylun yawma'idhin lil-mukadhdhbin. The 10 repetitions create an inescapable rhythm."};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_mursalatu3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.68,p.gnd);
      // Ruined cities
      for(let i=0;i<5;i++){ctx.fillStyle=`rgba(60,40,20,0.7)`;
        ctx.fillRect(CW*0.06+i*CW*0.18,CH*0.45,CW*0.12,CH*0.24);
        ctx.fillStyle=`rgba(80,50,25,0.5)`;
        ctx.fillRect(CW*0.08+i*CW*0.18,CH*0.35,CW*0.08,CH*0.12);}
      // Refrain text pulsing
      const p2=0.6+Math.sin(this.t*0.08)*0.4;
      ctx.fillStyle=`rgba(64,208,192,${p2})`;ctx.font='7px serif';ctx.textAlign='center';
      ctx.fillText('وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',CW*0.5,CH*0.25);ctx.textAlign='left';
      _label(ctx,'CLICK: Destroyed Nations — Refrain (77:16-19)',p.label);
    };draw();
  }
}
const VD_mursalat4={ref:'Al-Mursalat 77:46,50',arabic:'كُلُوا وَتَمَتَّعُوا قَلِيلًا إِنَّكُمْ مُّجْرِمُونَ ۩ فَبِأَيِّ حَدِيثٍ بَعْدَهُ يُؤْمِنُونَ',english:'"Eat and enjoy a little — indeed you are criminals. Then in what speech after this will they believe?" (77:46,50)',note:"The surah's devastating closing challenge: Allah grants permission to enjoy — but labels it 'a little' and 'criminals.' Then the final question: in what speech AFTER this Quran will they believe? If the Quran doesn't move you — nothing will."};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_mursalatu4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.75,p.gnd);
      // People eating/enjoying briefly
      for(let i=0;i<4;i++)_fig(ctx,CW*0.15+i*CW*0.22,CH*0.75,'#c0a080');
      fillRect(ctx,CW*0.24,CH*0.6,16,10,'#d0b040',4);
      fillRect(ctx,CW*0.45,CH*0.6,16,10,'#c04030',4);
      // Closing question text
      const qa=0.5+Math.sin(this.t*0.05)*0.3;
      ctx.fillStyle=`rgba(64,208,192,${qa})`;ctx.font='7px serif';ctx.textAlign='center';
      ctx.fillText('فَبِأَيِّ حَدِيثٍ بَعْدَهُ يُؤْمِنُونَ',CW*0.5,CH*0.25);ctx.textAlign='left';
      _label(ctx,'CLICK: In What Speech After This? (77:46,50)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
