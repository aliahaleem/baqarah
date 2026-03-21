'use strict';
/* scenes.js — Surah Al-Muddaththir */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#180a02',sky1:'#2e1408',gnd:'#381a0c',acc:'#f8c040',label:'#fff0e0',hint:'#c07040'}:{sky0:'#0e0400',sky1:'#180a02',gnd:'#221008',acc:'#e8a830',label:'#ffe8d8',hint:'#904830'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_muddaththir1={ref:'Al-Muddaththir 74:1-5',arabic:'يَا أَيُّهَا الْمُدَّثِّرُ ۩ قُمْ فَأَنذِرْ ۩ وَرَبَّكَ فَكَبِّرْ ۩ وَثِيَابَكَ فَطَهِّرْ ۩ وَالرُّجْزَ فَاهْجُرْ',english:'"O you cloaked one — arise and warn! And your Lord — magnify! And your garments — purify! And filth — abandon!" (74:1-5)',note:'Five commands in rapid-fire succession: arise, warn, magnify Allah, purify, abandon filth. This was the restart of revelation after the pause (fatra). The public mission of Islam began here. Five commands that define an entire life.'};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_muddaththird1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.78,p.gnd);
      // Prophet arising from cloak
      const arise=Math.min(1,this.t*0.008);
      ctx.fillStyle='rgba(192,80,32,0.3)';
      ctx.fillRect(CW*0.38,CH*0.35+arise*CH*0.3,20,CH*0.45-arise*CH*0.3);
      _fig(ctx,CW*0.47,CH*0.78,'#e0c080');
      // Call rings
      ctx.strokeStyle=p.acc;ctx.lineWidth=2;
      for(let i=0;i<4;i++){const r=((this.t*3+i*25)%100);
        ctx.beginPath();ctx.arc(CW*0.47,CH*0.65,r,0,Math.PI*2);
        ctx.globalAlpha=1-r/100;ctx.stroke();ctx.globalAlpha=1;}
      _label(ctx,'CLICK: Arise & Warn — Mission Begins (74:1-5)',p.label);
    };draw();
  }
}
const VD_muddaththir2={ref:'Al-Muddaththir 74:43-46',arabic:'مَا سَلَكَكُمْ فِي سَقَرَ ۩ قَالُوا لَمْ نَكُ مِنَ الْمُصَلِّينَ ۩ وَلَمْ نَكُ نُطْعِمُ الْمِسْكِينَ ۩ وَكُنَّا نَخُوضُ مَعَ الْخَائِضِينَ ۩ وَكُنَّا نُكَذِّبُ بِيَوْمِ الدِّينِ',english:'"What led you into Saqar? They said: We were not of those who prayed, and we did not feed the poor, and we engaged in vain talk with the vain speakers, and we denied the Day of Recompense." (74:43-46)',note:'Four reasons for Hellfire. Note the order: prayer first, then charity, then guarding the tongue, then belief. The foundation is salah. Without it, even if you do good — the other three are compromised.'};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_muddaththird2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Hellfire
      for(let i=0;i<10;i++){
        const fh=CH*0.2+Math.sin(this.t*0.08+i)*CH*0.1;
        const fc=`hsl(${20+i*5},90%,${30+Math.sin(this.t*0.06+i)*10}%)`;
        fillRect(ctx,CW*0.04+i*CW*0.1,CH-fh,CW*0.08,fh,fc,4);}
      // Four figures falling
      for(let i=0;i<4;i++){
        const fy=(this.t*0.5+i*30)%(CH*0.8);
        _fig(ctx,CW*0.15+i*CW*0.22,fy,'#808090',8);}
      _label(ctx,'CLICK: Four Reasons for Saqar (74:43-46)',p.label);
    };draw();
  }
}
const VD_muddaththir3={ref:'Al-Muddaththir 74:18-21',arabic:'إِنَّهُ فَكَّرَ وَقَدَّرَ ۩ فَقُتِلَ كَيْفَ قَدَّرَ ۩ ثُمَّ قُتِلَ كَيْفَ قَدَّرَ ۩ ثُمَّ نَظَرَ ۩ ثُمَّ عَبَسَ وَبَسَرَ',english:'"He thought and plotted — curse on him, how he plotted! Curse on him — how he plotted! Then he looked, then he frowned and scowled." (74:18-21)',note:'Allah exposes the internal process of a denier in real-time. He KNOWS the Quran is great — he thinks it privately — then plots how to publicly dismiss it. Seven verbs track his psychology. Allah sees everything.'};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_muddaththird3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.78,p.gnd);
      // The plotting man
      _fig(ctx,CW*0.5,CH*0.78,'#4a3020');
      // Thought bubble
      ctx.strokeStyle='rgba(255,80,30,0.5)';ctx.lineWidth=2;
      for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(CW*0.55+i*10,CH*0.4-i*8,6+i*6,0,Math.PI*2);ctx.stroke();}
      // Frowning expression
      ctx.strokeStyle='#e04040';ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(CW*0.5,CH*0.58,16,0.3,Math.PI-0.3);ctx.stroke();
      _label(ctx,'CLICK: The Plotting Denier Exposed (74:18-21)',p.label);
    };draw();
  }
}
const VD_muddaththir4={ref:'Al-Muddaththir 74:32-34',arabic:'كَلَّا وَالْقَمَرِ ۩ وَاللَّيْلِ إِذْ أَدْبَرَ ۩ وَالصُّبْحِ إِذَا أَسْفَرَ',english:'"No! By the moon. By the night as it retreats. By the dawn when it brightens." (74:32-34)',note:"Three cosmic oaths: moon, retreating night, brightening dawn. These are signs of Allah's order and precision. The same Lord who arranged the cosmos arranged your reckoning."};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_muddaththird4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Moon rising
      ctx.fillStyle='#d0c090';ctx.beginPath();ctx.arc(CW*0.2,CH*0.3,20,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=p.sky0;ctx.beginPath();ctx.arc(CW*0.27,CH*0.27,15,0,Math.PI*2);ctx.fill();
      // Night retreating (dark band fading)
      ctx.fillStyle='rgba(0,0,20,0.5)';ctx.fillRect(0,0,CW*(1-Math.min(1,this.t*0.005)),CH);
      // Dawn brightening
      const dawn=Math.min(1,this.t*0.005);
      const g=ctx.createLinearGradient(0,0,0,CH*0.5);
      g.addColorStop(0,`rgba(255,${140+dawn*60},${dawn*80},${dawn*0.4})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
      _label(ctx,'CLICK: Moon, Night, Dawn — Cosmic Signs (74:32-34)',p.label);
    };draw();
  }
}
const VD_muddaththir5={ref:'Al-Muddaththir 74:6-10',arabic:'وَلَا تَمْنُن تَسْتَكْثِرُ ۩ وَلِرَبِّكَ فَاصْبِرْ ۩ فَإِذَا نُقِرَ فِي النَّاقُورِ ۩ فَذَٰلِكَ يَوْمَئِذٍ يَوْمٌ عَسِيرٌ ۩ عَلَى الْكَافِرِينَ غَيْرُ يَسِيرٍ',english:'"Do not give expecting more in return. And for your Lord be patient. When the Trumpet is sounded — that Day will be a difficult day, for the disbelievers not easy." (74:6-10)',note:'Two final instructions close the opening commands: sincerity in giving, and patience. Then the scene shifts to the Trumpet blast. The Day is described in two strokes — difficult, and specifically not easy for the deniers. The repetition intensifies: there will be no relief.'};
const VD_muddaththir6={ref:'Al-Muddaththir 74:11-17',arabic:'ذَرْنِي وَمَنْ خَلَقْتُ وَحِيدًا ۩ وَجَعَلْتُ لَهُ مَالًا مَّمْدُودًا ۩ وَبَنِينَ شُهُودًا ۩ وَمَهَّدتُّ لَهُ تَمْهِيدًا ۩ ثُمَّ يَطْمَعُ أَنْ أَزِيدَ ۩ كَلَّا ۖ إِنَّهُ كَانَ لِآيَاتِنَا عَنِيدًا ۩ سَأُرْهِقُهُ صَعُودًا',english:'"Leave Me with the one I created alone — and granted him wealth extended, and sons present, and spread everything before him with ease. Then he desires that I increase him! No — he was stubbornly hostile to Our signs. I will drive him through a painful uphill climb." (74:11-17)',note:'Allah says "Leave Me alone with him" — the most terrifying sentence a human can hear. Every blessing is listed: wealth, sons, comfort — all from Allah. Yet he wants more while rejecting the Source. The punishment: an exhausting, never-ending ascent.'};
const VD_muddaththir7={ref:'Al-Muddaththir 74:22-31',arabic:'ثُمَّ عَبَسَ وَبَسَرَ ۩ ثُمَّ أَدْبَرَ وَاسْتَكْبَرَ ۩ فَقَالَ إِنْ هَٰذَا إِلَّا سِحْرٌ يُؤْثَرُ ۩ إِنْ هَٰذَا إِلَّا قَوْلُ الْبَشَرِ ۩ سَأُصْلِيهِ سَقَرَ ۩ وَمَا أَدْرَاكَ مَا سَقَرُ ۩ لَا تُبْقِي وَلَا تَذَرُ ۩ لَوَّاحَةٌ لِّلْبَشَرِ ۩ عَلَيْهَا تِسْعَةَ عَشَرَ ۩ وَمَا جَعَلْنَا أَصْحَابَ النَّارِ إِلَّا مَلَائِكَةً',english:'"Then he frowned and scowled, then turned his back in arrogance. He said: This is nothing but transmitted magic — nothing but the word of a human. I will burn him in Saqar. And what will make you know what Saqar is? It leaves nothing and spares nothing. It scorches the skin. Over it are nineteen. And We have not made the keepers of the Fire except angels." (74:22-31)',note:'The denier\'s psychology unfolds: frown, arrogance, dismissal — then two false labels: "magic" and "human speech." Allah\'s response: Saqar. Four terrifying descriptions: it leaves nothing, spares nothing, scorches flesh, guarded by nineteen angels. The number nineteen became a test of faith itself.'};
const VD_muddaththir8={ref:'Al-Muddaththir 74:35-42',arabic:'إِنَّهَا لَإِحْدَى الْكُبَرِ ۩ نَذِيرًا لِّلْبَشَرِ ۩ لِمَن شَاءَ مِنكُمْ أَن يَتَقَدَّمَ أَوْ يَتَأَخَّرَ ۩ كُلُّ نَفْسٍ بِمَا كَسَبَتْ رَهِينَةٌ ۩ إِلَّا أَصْحَابَ الْيَمِينِ ۩ فِي جَنَّاتٍ يَتَسَاءَلُونَ ۩ عَنِ الْمُجْرِمِينَ ۩ مَا سَلَكَكُمْ فِي سَقَرَ',english:'"Indeed it is one of the greatest — a warning to humanity. For whoever among you wishes to advance or stay behind. Every soul is held hostage by what it has earned — except the companions of the right, in gardens, asking one another about the criminals: What led you into Saqar?" (74:35-42)',note:'The great warning: every soul is held ransom by its deeds. Only the People of the Right are freed. In Paradise they ask the criminals the question — and the answer that follows reveals four causes of damnation. Choice is real: advance or fall behind.'};
const VD_muddaththir9={ref:'Al-Muddaththir 74:47-56',arabic:'حَتَّىٰ أَتَانَا الْيَقِينُ ۩ فَمَا تَنفَعُهُمْ شَفَاعَةُ الشَّافِعِينَ ۩ فَمَا لَهُمْ عَنِ التَّذْكِرَةِ مُعْرِضِينَ ۩ كَأَنَّهُمْ حُمُرٌ مُّسْتَنفِرَةٌ ۩ فَرَّتْ مِن قَسْوَرَةٍ ۩ بَلْ يُرِيدُ كُلُّ امْرِئٍ مِّنْهُمْ أَن يُؤْتَىٰ صُحُفًا مُّنَشَّرَةً ۩ كَلَّا ۖ بَل لَّا يَخَافُونَ الْآخِرَةَ ۩ كَلَّا إِنَّهُ تَذْكِرَةٌ ۩ فَمَن شَاءَ ذَكَرَهُ ۩ وَمَا يَذْكُرُونَ إِلَّا أَن يَشَاءَ اللَّهُ',english:'"…until the certainty came to us. So no intercession of intercessors will benefit them. What is wrong with them that they turn away from the Reminder — as if they were wild donkeys fleeing from a lion? Rather, each one of them wants to be given scrolls spread out. No! They do not fear the Hereafter. No indeed — this is a Reminder. So whoever wills may remember it. And they will not remember except that Allah wills." (74:47-56)',note:'The surah closes with a devastating image: they flee from the Quran like wild donkeys from a lion. They demand personal scrolls from heaven — an excuse to avoid believing. The final word: this IS the Reminder. Whoever wills may heed it — but even that will is under Allah\'s will. Divine sovereignty seals the surah.'};
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
