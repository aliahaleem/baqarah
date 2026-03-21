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
const VD_jinn5={ref:'Al-Jinn 72:5-7',arabic:'وَأَنَّا ظَنَنَّا أَن لَّن تَقُولَ الْإِنسُ وَالْجِنُّ عَلَى اللَّهِ كَذِبًا ۩ وَأَنَّهُ كَانَ رِجَالٌ مِّنَ الْإِنسِ يَعُوذُونَ بِرِجَالٍ مِّنَ الْجِنِّ فَزَادُوهُمْ رَهَقًا ۩ وَأَنَّهُمْ ظَنُّوا كَمَا ظَنَنتُمْ أَن لَّن يَبْعَثَ اللَّهُ أَحَدًا',english:'"We had thought that mankind and jinn would never speak a lie about Allah. And there were men among mankind who sought refuge in men among the jinn, so they increased them in burden. And they assumed, as you assumed, that Allah would never raise anyone." (72:5-7)',note:"Humans used to seek protection from jinn \u2014 but it only increased them in fear and misguidance. Both jinn and humans shared the same false assumption: no resurrection. The Quran corrected them both."};

class S5 extends BS{
  constructor(){super('canvas-5');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn5);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,25);_ground(ctx,CH*0.78,p.gnd);
      _fig(ctx,CW*0.3,CH*0.76,'#c0a070');
      _fig(ctx,CW*0.7,CH*0.76,`rgba(112,48,176,0.7)`);
      ctx.strokeStyle='rgba(200,60,60,0.4)';ctx.lineWidth=2;
      for(let i=0;i<3;i++){const r=20+i*15+Math.sin(this.t*0.05)*5;
        ctx.beginPath();ctx.arc(CW*0.5,CH*0.55,r,0,Math.PI*2);ctx.stroke();}
      ctx.fillStyle=`rgba(200,60,60,${0.3+Math.sin(this.t*0.06)*0.15})`;
      ctx.font='8px serif';ctx.textAlign='center';
      ctx.fillText('\u0631\u064e\u0647\u064e\u0642\u064b\u0627',CW*0.5,CH*0.38);ctx.textAlign='left';
      _label(ctx,'CLICK: Jinn & Humans \u2014 False Refuge (72:5-7)',p.label);
    };draw();
  }
}
const VD_jinn6={ref:'Al-Jinn 72:10-13',arabic:'وَأَنَّا لَا نَدْرِي أَشَرٌّ أُرِيدَ بِمَن فِي الْأَرْضِ أَمْ أَرَادَ بِهِمْ رَبُّهُمْ رَشَدًا ۩ وَأَنَّا مِنَّا الصَّالِحُونَ وَمِنَّا دُونَ ذَٰلِكَ ۖ كُنَّا طَرَائِقَ قِدَدًا ۩ وَأَنَّا ظَنَنَّا أَن لَّن نُّعْجِزَ اللَّهَ فِي الْأَرْضِ وَلَن نُّعْجِزَهُ هَرَبًا ۩ وَأَنَّا لَمَّا سَمِعْنَا الْهُدَىٰ آمَنَّا بِهِ',english:'"We do not know whether evil is intended for those on earth, or their Lord intends guidance for them. Among us are the righteous and less than that \u2014 we are of divided paths. We know we cannot escape Allah on earth, nor escape Him by fleeing. When we heard the guidance, we believed in it." (72:10-13)',note:"The jinn confess: we are diverse \u2014 righteous and less so, on different paths (taraa\u2019iq qidada). But they all know: you cannot outrun Allah. And when guidance came, they believed. Humility before truth."};

class S6 extends BS{
  constructor(){super('canvas-6');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn6);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,20);_ground(ctx,CH*0.8,p.gnd);
      const cols=['#30a060','#5080c0','#c06040','#a050b0','#80a040'];
      for(let i=0;i<5;i++){
        const fl=Math.sin(this.t*0.04+i)*4;
        _fig(ctx,CW*0.12+i*CW*0.2,CH*0.78+fl,cols[i],9);}
      ctx.fillStyle=p.acc;ctx.font='8px serif';ctx.textAlign='center';
      ctx.fillText('\u0637\u064e\u0631\u064e\u0627\u0626\u0650\u0642\u064e \u0642\u0650\u062f\u064e\u062f\u064b\u0627',CW*0.5,CH*0.35);ctx.textAlign='left';
      _label(ctx,'CLICK: Diverse Paths Among the Jinn (72:10-13)',p.label);
    };draw();
  }
}
const VD_jinn7={ref:'Al-Jinn 72:14-17',arabic:'وَأَنَّا مِنَّا الْمُسْلِمُونَ وَمِنَّا الْقَاسِطُونَ ۩ وَأَمَّا الْقَاسِطُونَ فَكَانُوا لِجَهَنَّمَ حَطَبًا ۩ وَأَلَّوِ اسْتَقَامُوا عَلَى الطَّرِيقَةِ لَأَسْقَيْنَاهُم مَّاءً غَدَقًا ۩ لِّنَفْتِنَهُمْ فِيهِ',english:'"Among us are Muslims, and among us are the unjust. Whoever submits \u2014 they have sought the right course. But the unjust will be fuel for Hell. If they had stayed straight on the path, We would have given them abundant water \u2014 to test them therein." (72:14-17)',note:"Muslim jinn and deviant jinn: a clear split. The deviant become firewood for Hell. And a stunning principle: if they had stayed straight, Allah would have given them abundance \u2014 as a test! Provision can be a trial."};

class S7 extends BS{
  constructor(){super('canvas-7');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn7);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      ctx.fillStyle='#0a1a10';ctx.fillRect(0,CH*0.5,CW*0.5,CH*0.5);
      ctx.fillStyle='#2a0808';ctx.fillRect(CW*0.5,CH*0.5,CW*0.5,CH*0.5);
      _fig(ctx,CW*0.25,CH*0.72,'#30a060');
      _fig(ctx,CW*0.75,CH*0.72,'#a03030');
      const fl=0.3+Math.sin(this.t*0.08)*0.2;
      ctx.fillStyle=`rgba(220,100,20,${fl})`;ctx.fillRect(CW*0.5,CH*0.3,CW*0.5,CH*0.3);
      ctx.fillStyle=p.acc;ctx.font='8px serif';ctx.textAlign='center';
      ctx.fillText('\u0627\u0644\u0645\u064f\u0633\u0644\u0650\u0645\u064f\u0648\u0646\u064e',CW*0.25,CH*0.4);
      ctx.fillStyle='#e04040';
      ctx.fillText('\u0627\u0644\u0642\u064e\u0627\u0633\u0650\u0637\u064f\u0648\u0646\u064e',CW*0.75,CH*0.4);ctx.textAlign='left';
      _label(ctx,'CLICK: Muslim vs Deviant Jinn (72:14-17)',p.label);
    };draw();
  }
}
const VD_jinn8={ref:'Al-Jinn 72:20-24',arabic:'قُلْ إِنَّمَا أَدْعُو رَبِّي وَلَا أُشْرِكُ بِهِ أَحَدًا ۩ قُلْ إِنِّي لَا أَمْلِكُ لَكُمْ ضَرًّا وَلَا رَشَدًا ۩ قُلْ إِنِّي لَن يُجِيرَنِي مِنَ اللَّهِ أَحَدٌ وَلَنْ أَجِدَ مِن دُونِهِ مُلْتَحَدًا ۩ إِلَّا بَلَاغًا مِّنَ اللَّهِ وَرِسَالَاتِهِ ۩ وَمَن يَعْصِ اللَّهَ وَرَسُولَهُ فَإِنَّ لَهُ نَارَ جَهَنَّمَ خَالِدِينَ فِيهَا أَبَدًا',english:'"Say: I only call upon my Lord and associate none with Him. Say: I hold no power to harm or guide you. Say: None can protect me from Allah, nor will I find any refuge besides Him \u2014 except delivering from Allah and His messages. Whoever disobeys Allah and His Messenger \u2014 for him is the fire of Hell, abiding therein forever." (72:20-24)',note:"Four times 'qul' \u2014 say! The Prophet declares: I cannot harm you or guide you on my own. No one can protect me from Allah. My only role is to deliver the message. Pure tawhid, pure humility."};

class S8 extends BS{
  constructor(){super('canvas-8');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn8);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,30);_ground(ctx,CH*0.78,p.gnd);
      _fig(ctx,CW*0.5,CH*0.76,'#e0c080',12);
      const g=ctx.createRadialGradient(CW*0.5,CH*0.35,5,CW*0.5,CH*0.35,60);
      const fl=0.4+Math.sin(this.t*0.04)*0.2;
      g.addColorStop(0,`rgba(64,224,144,${fl})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      ctx.fillStyle=p.acc;ctx.font='9px serif';ctx.textAlign='center';
      ctx.fillText('\u0642\u064f\u0644\u0652',CW*0.35,CH*0.3);
      ctx.fillText('\u0642\u064f\u0644\u0652',CW*0.45,CH*0.3);
      ctx.fillText('\u0642\u064f\u0644\u0652',CW*0.55,CH*0.3);
      ctx.fillText('\u0642\u064f\u0644\u0652',CW*0.65,CH*0.3);ctx.textAlign='left';
      _label(ctx,'CLICK: The Prophet\'s Declaration \u2014 Say! (72:20-24)',p.label);
    };draw();
  }
}
const VD_jinn9={ref:'Al-Jinn 72:25-28',arabic:'حَتَّىٰ إِذَا رَأَوْا مَا يُوعَدُونَ فَسَيَعْلَمُونَ مَنْ أَضْعَفُ نَاصِرًا وَأَقَلُّ عَدَدًا ۩ قُلْ إِنْ أَدْرِي أَقَرِيبٌ مَّا تُوعَدُونَ أَمْ يَجْعَلُ لَهُ رَبِّي أَمَدًا ۩ عَالِمُ الْغَيْبِ فَلَا يُظْهِرُ عَلَىٰ غَيْبِهِ أَحَدًا ۩ إِلَّا مَنِ ارْتَضَىٰ مِن رَّسُولٍ',english:'"Until when they see what they are promised, they will know who is weaker in helpers and fewer in number. Say: I do not know whether what you are promised is near or if my Lord will grant it a long period. Knower of the unseen \u2014 He does not reveal His unseen to anyone, except a messenger He approves." (72:25-28)',note:"Only Allah knows the unseen. He reveals it only to chosen messengers. No jinn, no fortune-teller, no astrologer has access to the ghayb. The surah ends by sealing this truth forever."};

class S9 extends BS{
  constructor(){super('canvas-9');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_jinn9);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _stars(ctx,40);
      const fl=0.3+Math.sin(this.t*0.03)*0.2;
      ctx.fillStyle=`rgba(64,224,144,${fl})`;ctx.fillRect(0,0,CW,CH*0.15);
      fillRect(ctx,CW*0.38,CH*0.25,CW*0.24,CH*0.35,'rgba(20,8,40,0.8)',8);
      ctx.fillStyle='#f0e060';ctx.font='bold 20px serif';ctx.textAlign='center';
      ctx.fillText('\u061f',CW*0.5,CH*0.48);ctx.textAlign='left';
      _ground(ctx,CH*0.78,p.gnd);
      ctx.fillStyle=p.acc;ctx.font='7px serif';ctx.textAlign='center';
      ctx.fillText('\u0639\u064e\u0627\u0644\u0650\u0645\u064f \u0627\u0644\u0652\u063a\u064e\u064a\u0652\u0628\u0650',CW*0.5,CH*0.7);ctx.textAlign='left';
      _label(ctx,'CLICK: Knower of the Unseen (72:25-28)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();_scenes[5]=new S5();_scenes[6]=new S6();_scenes[7]=new S7();_scenes[8]=new S8();_scenes[9]=new S9();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
