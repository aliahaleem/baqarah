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
const VD_nuh5={ref:'Nuh 71:1-4',arabic:'إِنَّا أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ أَنْ أَنذِرْ قَوْمَكَ مِن قَبْلِ أَن يَأْتِيَهُمْ عَذَابٌ أَلِيمٌ ۩ قَالَ يَا قَوْمِ إِنِّي لَكُمْ نَذِيرٌ مُّبِينٌ ۩ أَنِ اعْبُدُوا اللَّهَ وَاتَّقُوهُ وَأَطِيعُونِ ۩ يَغْفِرْ لَكُم مِّن ذُنُوبِكُمْ وَيُؤَخِّرْكُمْ إِلَىٰ أَجَلٍ مُّسَمًّى',english:'"We sent Nuh to his people: Warn your people before a painful punishment comes to them. He said: O my people, I am to you a clear warner — worship Allah, fear Him, and obey me. He will forgive your sins and delay you until an appointed term." (71:1-4)',note:"The opening of the surah: Nuh's mission in three words — worship, fear, obey. The reward: forgiveness and reprieve. Simple, clear, direct. This is the essence of every prophet's message."};

class S5 extends BS{
  constructor(){super('canvas-5');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh5);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,20);_ground(ctx,CH*0.75,p.gnd);
      _fig(ctx,CW*0.5,CH*0.74,'#e0c080',12);
      const fl=0.5+Math.sin(this.t*0.05)*0.3;
      const g=ctx.createRadialGradient(CW*0.5,CH*0.4,5,CW*0.5,CH*0.4,80);
      g.addColorStop(0,`rgba(96,208,192,${fl})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      for(let i=0;i<6;i++)_fig(ctx,CW*0.08+i*CW*0.16,CH*0.75,'#606880');
      _label(ctx,'CLICK: Nuh\'s Mission — Warn Before Punishment (71:1-4)',p.label);
    };draw();
  }
}
const VD_nuh6={ref:'Nuh 71:8-9',arabic:'ثُمَّ إِنِّي دَعَوْتُهُمْ جِهَارًا ۩ ثُمَّ إِنِّي أَعْلَنتُ لَهُمْ وَأَسْرَرْتُ لَهُمْ إِسْرَارًا',english:'"Then I called them publicly. Then I announced to them openly and confided to them privately." (71:8-9)',note:"Nuh tried every method: public and private, loud and quiet, open and secret. He adapted his approach over 950 years. Da'wah is not one-size-fits-all — use every means available."};

class S6 extends BS{
  constructor(){super('canvas-6');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh6);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.75,p.gnd);
      _fig(ctx,CW*0.3,CH*0.74,'#e0c080');
      ctx.strokeStyle=p.acc;ctx.lineWidth=2;
      for(let i=0;i<4;i++){const r=15+i*18;
        ctx.beginPath();ctx.arc(CW*0.3,CH*0.6,r*Math.abs(Math.sin(this.t*0.03)),0,Math.PI*2);ctx.stroke();}
      _fig(ctx,CW*0.7,CH*0.74,'#e0c080');
      _fig(ctx,CW*0.78,CH*0.74,'#606880');
      ctx.fillStyle=`rgba(96,208,192,${0.3+Math.sin(this.t*0.06)*0.2})`;
      ctx.font='7px serif';ctx.textAlign='center';
      ctx.fillText('\u062c\u0650\u0647\u064e\u0627\u0631\u064b\u0627',CW*0.3,CH*0.38);
      ctx.fillText('\u0625\u0650\u0633\u0631\u064e\u0627\u0631\u064b\u0627',CW*0.7,CH*0.38);ctx.textAlign='left';
      _label(ctx,'CLICK: Public & Private Da\'wah (71:8-9)',p.label);
    };draw();
  }
}
const VD_nuh7={ref:'Nuh 71:14-20',arabic:'وَقَدْ خَلَقَكُمْ أَطْوَارًا ۩ أَلَمْ تَرَوْا كَيْفَ خَلَقَ اللَّهُ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۩ وَجَعَلَ الْقَمَرَ فِيهِنَّ نُورًا وَجَعَلَ الشَّمْسَ سِرَاجًا ۩ وَاللَّهُ أَنبَتَكُم مِّنَ الْأَرْضِ نَبَاتًا ۩ ثُمَّ يُعِيدُكُمْ فِيهَا وَيُخْرِجُكُمْ إِخْرَاجًا ۩ وَاللَّهُ جَعَلَ لَكُمُ الْأَرْضَ بِسَاطًا ۩ لِّتَسْلُكُوا مِنْهَا سُبُلًا فِجَاجًا',english:'"He created you in stages. Do you not see how Allah created seven heavens in layers? He made the moon a light therein and the sun a lamp. Allah caused you to grow from the earth like plants. Then He will return you into it and bring you out again. Allah made the earth a spread for you — to walk therein on spacious paths." (71:14-20)',note:"Nuh's da'wah used creation as evidence: stages of human development, seven layered heavens, moon as light, sun as lamp, growth from earth, and the earth spread out with paths. Science and faith together."};

class S7 extends BS{
  constructor(){super('canvas-7');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh7);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,30);
      for(let i=0;i<7;i++){ctx.strokeStyle=`rgba(96,208,192,${0.15+i*0.04})`;ctx.lineWidth=1;
        ctx.beginPath();ctx.arc(CW*0.5,CH*1.2,CH*0.5+i*18,Math.PI*1.1,Math.PI*1.9);ctx.stroke();}
      const ma=this.t*0.01;
      ctx.fillStyle='#f0e060';ctx.beginPath();ctx.arc(CW*0.7,CH*0.2,12,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#c0d0e0';ctx.beginPath();ctx.arc(CW*0.3,CH*0.25,8,0,Math.PI*2);ctx.fill();
      _ground(ctx,CH*0.78,'#1a3018');
      ctx.strokeStyle='rgba(120,180,100,0.3)';ctx.lineWidth=2;
      for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(CW*0.05+i*CW*0.18,CH*0.78);
        ctx.lineTo(CW*0.05+i*CW*0.18,CH*0.62+Math.sin(this.t*0.04+i)*4);ctx.stroke();}
      _label(ctx,'CLICK: Signs of Creation \u2014 Heavens, Moon, Sun (71:14-20)',p.label);
    };draw();
  }
}
const VD_nuh8={ref:'Nuh 71:21-24',arabic:'قَالَ نُوحٌ رَّبِّ إِنَّهُمْ عَصَوْنِي وَاتَّبَعُوا مَن لَّمْ يَزِدْهُ مَالُهُ وَوَلَدُهُ إِلَّا خَسَارًا ۩ وَمَكَرُوا مَكْرًا كُبَّارًا ۩ وَقَالُوا لَا تَذَرُنَّ آلِهَتَكُمْ وَلَا تَذَرُنَّ وَدًّا وَلَا سُوَاعًا وَلَا يَغُوثَ وَيَعُوقَ وَنَسْرًا ۩ وَقَدْ أَضَلُّوا كَثِيرًا',english:'"Nuh said: My Lord, they disobeyed me and followed those whose wealth and children only increased them in loss. They plotted a tremendous plot. They said: Do not abandon your gods — do not abandon Wadd, Suwa\u2019a, Yaghuth, Ya\u2019uq, and Nasr! And they have already misled many." (71:21-24)',note:"Five idols named by name \u2014 Wadd, Suwa\u2019a, Yaghuth, Ya\u2019uq, Nasr. Originally righteous people whose images became objects of worship over generations. The origin of idol worship in human history."};

class S8 extends BS{
  constructor(){super('canvas-8');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh8);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.72,p.gnd);
      for(let i=0;i<5;i++){
        fillRect(ctx,CW*0.08+i*CW*0.18,CH*0.35,CW*0.1,CH*0.2,'#3a2820',4);
        fillRect(ctx,CW*0.1+i*CW*0.18,CH*0.3,CW*0.06,CH*0.08,'#4a3828',3);}
      for(let i=0;i<4;i++){
        const bx=CW*0.12+i*CW*0.22,by=CH*0.72;
        _fig(ctx,bx,by,'#606880');
        ctx.fillStyle='#404858';fillRect(ctx,bx-4,by-6,8,4,'#404858',2);}
      const fl=0.3+Math.sin(this.t*0.06)*0.2;
      ctx.fillStyle=`rgba(180,60,40,${fl})`;ctx.fillRect(0,0,CW,CH*0.15);
      _label(ctx,'CLICK: Five Idols \u2014 Wadd, Suwa, Yaghuth... (71:21-24)',p.label);
    };draw();
  }
}
const VD_nuh9={ref:'Nuh 71:27',arabic:'إِنَّكَ إِن تَذَرْهُمْ يُضِلُّوا عِبَادَكَ وَلَا يَلِدُوا إِلَّا فَاجِرًا كَفَّارًا',english:'"If You leave them, they will mislead Your servants and will not give birth except to wicked ungrateful disbelievers." (71:27)',note:"After 950 years, Nuh reached this conclusion: they are beyond reform and will only breed more corruption. This is not cruelty \u2014 it is the wisdom of a prophet who exhausted every possible means of guidance."};

class S9 extends BS{
  constructor(){super('canvas-9');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_nuh9);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,15);_ground(ctx,CH*0.8,p.gnd);
      _fig(ctx,CW*0.5,CH*0.8,'#e0c080',12);
      const fl=0.5+Math.sin(this.t*0.04)*0.3;
      ctx.fillStyle=`rgba(200,60,40,${fl})`;ctx.fillRect(0,0,CW,CH*0.2);
      ctx.fillStyle=p.acc;ctx.font='9px serif';ctx.textAlign='center';
      ctx.fillText('\u0631\u064e\u0628\u0650\u0651',CW*0.5,CH*0.42);ctx.textAlign='left';
      for(let i=0;i<5;i++){
        const x=CW*0.15+i*CW*0.18,y=CH*0.78;
        _fig(ctx,x,y,'#404050',7);
        ctx.strokeStyle='#e04040';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(x-5,y-16);ctx.lineTo(x+5,y-10);ctx.moveTo(x+5,y-16);ctx.lineTo(x-5,y-10);ctx.stroke();}
      _label(ctx,'CLICK: Nuh\'s Final Plea \u2014 They Will Only Mislead (71:27)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();_scenes[5]=new S5();_scenes[6]=new S6();_scenes[7]=new S7();_scenes[8]=new S8();_scenes[9]=new S9();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
