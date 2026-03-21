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
const VD_qalam5={ref:'Al-Qalam 68:5-9',arabic:'فَسَتُبْصِرُ وَيُبْصِرُونَ ۩ بِأَيِّيكُمُ الْمَفْتُونُ ۩ إِنَّ رَبَّكَ هُوَ أَعْلَمُ بِمَن ضَلَّ عَن سَبِيلِهِ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ ۩ فَلَا تُطِعِ الْمُكَذِّبِينَ ۩ وَدُّوا لَوْ تُدْهِنُ فَيُدْهِنُونَ',english:'"Soon you will see, and they will see, which of you is the afflicted. Your Lord knows best who has strayed from His way, and He knows best the guided ones. So do not obey the deniers — they wish you would compromise so they could compromise." (68:5-9)',note:"Allah challenges: time will reveal who is truly afflicted. Then the command: do not obey the deniers. They want you to soften your message — to compromise (tudhin). But truth does not bend."};

class S5 extends BS{
  constructor(){super('canvas-5');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam5);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.75,p.gnd);
      ctx.strokeStyle=p.acc;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(CW*0.5,CH*0.75);ctx.lineTo(CW*0.2,CH*0.35);ctx.stroke();
      ctx.strokeStyle='#e04040';
      ctx.beginPath();ctx.moveTo(CW*0.5,CH*0.75);ctx.lineTo(CW*0.8,CH*0.35);ctx.stroke();
      const fl=0.5+Math.sin(this.t*0.06)*0.5;
      ctx.fillStyle=`rgba(240,192,48,${fl})`;ctx.font='bold 20px serif';ctx.textAlign='center';
      ctx.fillText('?',CW*0.5,CH*0.45);ctx.textAlign='left';
      _fig(ctx,CW*0.2,CH*0.38,p.acc);
      _fig(ctx,CW*0.8,CH*0.38,'#804030');
      _label(ctx,'CLICK: Who Is Truly Afflicted? (68:5-9)',p.label);
    };draw();
  }
}
const VD_qalam6={ref:'Al-Qalam 68:14-16',arabic:'أَن كَانَ ذَا مَالٍ وَبَنِينَ ۩ إِذَا تُتْلَىٰ عَلَيْهِ آيَاتُنَا قَالَ أَسَاطِيرُ الْأَوَّلِينَ ۩ سَنَسِمُهُ عَلَى الْخُرْطُومِ',english:'"Just because he has wealth and children — when Our verses are recited to him, he says: Tales of the ancients! We will brand him on the snout." (68:14-16)',note:"Wealth and sons made him arrogant. He dismissed the Quran as old fables. Allah's response is devastating: We will brand him on the khurtoom — the snout — humiliated like an animal."};

class S6 extends BS{
  constructor(){super('canvas-6');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam6);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.75,p.gnd);
      _fig(ctx,CW*0.5,CH*0.72,'#4a3020');
      for(let i=0;i<5;i++){fillRect(ctx,CW*0.2+i*CW*0.13,CH*0.55,14,10,'#e0b020',3);}
      const fl=Math.sin(this.t*0.08);
      if(fl>0){ctx.fillStyle=`rgba(255,60,20,${fl})`;ctx.font='bold 14px serif';ctx.textAlign='center';
        ctx.fillText('\u00d7',CW*0.5,CH*0.47);ctx.textAlign='left';}
      _label(ctx,'CLICK: Branded on the Snout (68:14-16)',p.label);
    };draw();
  }
}
const VD_qalam7={ref:'Al-Qalam 68:34-41',arabic:'إِنَّ لِلْمُتَّقِينَ عِندَ رَبِّهِمْ جَنَّاتِ النَّعِيمِ ۩ أَفَنَجْعَلُ الْمُسْلِمِينَ كَالْمُجْرِمِينَ ۩ مَا لَكُمْ كَيْفَ تَحْكُمُونَ ۩ أَمْ لَكُمْ كِتَابٌ فِيهِ تَدْرُسُونَ ۩ إِنَّ لَكُمْ فِيهِ لَمَا تَخَيَّرُونَ ۩ أَمْ لَكُمْ أَيْمَانٌ عَلَيْنَا بَالِغَةٌ إِلَىٰ يَوْمِ الْقِيَامَةِ ۙ إِنَّ لَكُمْ لَمَا تَحْكُمُونَ ۩ سَلْهُمْ أَيُّهُم بِذَٰلِكَ زَعِيمٌ ۩ أَمْ لَهُمْ شُرَكَاءُ فَلْيَأْتُوا بِشُرَكَائِهِمْ إِن كَانُوا صَادِقِينَ',english:'"For the righteous are Gardens of Bliss with their Lord. Shall We treat the Muslims like the criminals? What is the matter with you — how do you judge? Do you have a book you study? That in it you will have whatever you choose? Or do you have oaths binding on Us until the Day of Resurrection — that you will have whatever you decide? Ask them which of them will guarantee that! Or do they have partners? Let them bring their partners if they are truthful!" (68:34-41)',note:"A devastating series of rhetorical questions: Do you have a book? Oaths? Partners? Each answer is silence. The righteous and the criminals can never be equal — what kind of judgment is that?"};

class S7 extends BS{
  constructor(){super('canvas-7');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam7);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      ctx.fillStyle='#0a2a10';ctx.fillRect(0,CH*0.5,CW*0.5,CH*0.5);
      ctx.fillStyle='#2a0808';ctx.fillRect(CW*0.5,CH*0.5,CW*0.5,CH*0.5);
      for(let i=0;i<4;i++){fillRect(ctx,CW*0.02+i*CW*0.12,CH*0.32,CW*0.08,CH*0.2,'#1a4a1a',4);}
      const fl=0.3+Math.sin(this.t*0.08)*0.15;
      ctx.fillStyle=`rgba(200,40,20,${fl})`;ctx.fillRect(CW*0.5,CH*0.3,CW*0.5,CH*0.4);
      _fig(ctx,CW*0.25,CH*0.72,p.acc);
      _fig(ctx,CW*0.75,CH*0.72,'#804030');
      ctx.fillStyle='#fff';ctx.font='bold 16px serif';ctx.textAlign='center';
      ctx.fillText('\u2260',CW*0.5,CH*0.5);ctx.textAlign='left';
      _label(ctx,'CLICK: Righteous \u2260 Criminals (68:34-41)',p.label);
    };draw();
  }
}
const VD_qalam8={ref:'Al-Qalam 68:42-45',arabic:'يَوْمَ يُكْشَفُ عَن سَاقٍ وَيُدْعَوْنَ إِلَى السُّجُودِ فَلَا يَسْتَطِيعُونَ ۩ خَاشِعَةً أَبْصَارُهُمْ تَرْهَقُهُمْ ذِلَّةٌ ۖ وَقَدْ كَانُوا يُدْعَوْنَ إِلَى السُّجُودِ وَهُمْ سَالِمُونَ ۩ فَذَرْنِي وَمَن يُكَذِّبُ بِهَٰذَا الْحَدِيثِ ۖ سَنَسْتَدْرِجُهُم مِّنْ حَيْثُ لَا يَعْلَمُونَ ۩ وَأُمْلِي لَهُمْ ۚ إِنَّ كَيْدِي مَتِينٌ',english:'"The Day the shin is laid bare and they are called to prostrate but cannot — their eyes humbled, humiliation covering them. They had been called to prostrate while they were sound. So leave Me with whoever denies this discourse. We will progressively lead them from where they do not know. And I give them time — indeed My plan is firm." (68:42-45)',note:"On that Day, prostration will be demanded but their backs will be locked stiff. The greatest regret: they refused to bow when they could. Then the chilling: istidraj — Allah leads them gradually to ruin while they think all is well."};

class S8 extends BS{
  constructor(){super('canvas-8');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam8);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.78,p.gnd);
      for(let i=0;i<5;i++){
        const x=CW*0.15+i*CW*0.18,y=CH*0.76;
        _fig(ctx,x,y,'#808090');
        const strain=Math.sin(this.t*0.05+i)*2;
        ctx.strokeStyle='#e04040';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(x-6,y-12+strain);ctx.lineTo(x+6,y-12+strain);ctx.stroke();}
      const fl=0.4+Math.sin(this.t*0.04)*0.2;
      ctx.fillStyle=`rgba(200,40,40,${fl})`;ctx.fillRect(0,0,CW,CH*0.3);
      _label(ctx,'CLICK: Called to Prostrate but Cannot (68:42-45)',p.label);
    };draw();
  }
}
const VD_qalam9={ref:'Al-Qalam 68:46-50',arabic:'أَمْ تَسْأَلُهُمْ أَجْرًا فَهُم مِّن مَّغْرَمٍ مُّثْقَلُونَ ۩ أَمْ عِندَهُمُ الْغَيْبُ فَهُمْ يَكْتُبُونَ ۩ فَاصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تَكُن كَصَاحِبِ الْحُوتِ إِذْ نَادَىٰ وَهُوَ مَكْظُومٌ ۩ لَّوْلَا أَن تَدَارَكَهُ نِعْمَةٌ مِّن رَّبِّهِ لَنُبِذَ بِالْعَرَاءِ وَهُوَ مَذْمُومٌ ۩ فَاجْتَبَاهُ رَبُّهُ فَجَعَلَهُ مِنَ الصَّالِحِينَ',english:'"Do you ask them a payment so they are burdened by debt? Or have they the unseen so they write it down? So be patient for the judgement of your Lord and do not be like the companion of the whale when he called out while distressed. Had a blessing from his Lord not reached him, he would have been cast onto the bare shore while blamed. But his Lord chose him and made him among the righteous." (68:46-50)',note:"Be patient — but don't be like Yunus who left his people prematurely. Swallowed by the whale, he repented in the depths, and Allah rescued him. The lesson: stay with your mission, Allah's mercy will come."};

class S9 extends BS{
  constructor(){super('canvas-9');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_qalam9);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      ctx.fillStyle='#0a1830';ctx.fillRect(0,CH*0.4,CW,CH*0.6);
      ctx.strokeStyle='rgba(64,128,200,0.4)';ctx.lineWidth=2;
      for(let w=0;w<3;w++){ctx.beginPath();
        for(let x=0;x<=CW;x+=6)ctx.lineTo(x,CH*0.4+w*20+Math.sin(x*0.08+this.t*0.06+w)*6);ctx.stroke();}
      const wy=CH*0.55+Math.sin(this.t*0.03)*8;
      ctx.fillStyle='#1a2840';ctx.beginPath();ctx.ellipse(CW*0.5,wy,60,25,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#101e30';ctx.beginPath();ctx.moveTo(CW*0.57,wy-10);ctx.lineTo(CW*0.7,wy-25);ctx.lineTo(CW*0.7,wy+5);ctx.closePath();ctx.fill();
      _label(ctx,'CLICK: Patience \u2014 Companion of the Whale (68:46-50)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();_scenes[5]=new S5();_scenes[6]=new S6();_scenes[7]=new S7();_scenes[8]=new S8();_scenes[9]=new S9();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
