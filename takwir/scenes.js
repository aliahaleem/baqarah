'use strict';
// =============================================
//  SURAH AT-TAKWIR (81) — scenes.js
//  The Overthrowing · indigo / silver-star / cosmic
// =============================================

window.SCENE_PALETTE = {
  minecraft: {sky0:'#04040e',sky1:'#08081c',sky2:'#0c0c28',gnd:'#12123a',gndAcc:'#1c1c4a',starStr:'rgba(200,200,255,',acStr:'rgba(200,192,112,',label:'#c8c070',hint:'#a8a050'},
  stars: {sky0:'#1e1a4a',sky1:'#2a2460',sky2:'#363078',gnd:'#42389a',gndAcc:'#524aa8',starStr:'rgba(220,215,255,',acStr:'rgba(232,224,160,',label:'#e8e0a0',hint:'#c8c080'},
};
function _sky(ctx){const p=sceneP();const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(0.6,p.sky1);g.addColorStop(1,p.sky2);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _stars(ctx){const p=sceneP();[[80,22],[150,40],[260,15],[340,30],[440,18],[510,42],[60,60],[200,55],[390,48],[520,20],[100,10],[300,5],[460,35]].forEach(([x,y],i)=>{ctx.fillStyle=p.starStr+(0.3+(i%4)*0.18)+')';ctx.beginPath();ctx.arc(x,y,i%3===0?1.5:1,0,Math.PI*2);ctx.fill();});}
function _ground(ctx,y=170){const p=sceneP();fillRect(ctx,0,y,CW,CH-y,p.gnd);fillRect(ctx,0,y,CW,5,p.gndAcc);}
function _label(ctx,text,y=18){ctx.fillStyle=sceneP().label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(text,CW/2,y);ctx.textAlign='left';}
function _fig(ctx,x,y,hc,bc,pc){fillRect(ctx,x+P,y,P*3,P*3,hc);fillRect(ctx,x,y+P*3,P*5,P*4,bc);fillRect(ctx,x-P,y+P*3,P,P*3,hc);fillRect(ctx,x+P*5,y+P*3,P,P*3,hc);fillRect(ctx,x,y+P*7,P*2,P*4,pc);fillRect(ctx,x+P*3,y+P*7,P*2,P*4,pc);}

// VERSE DATA
const VD={
  signs:{ref:'At-Takwir 81:1-7',arabic:'إِذَا الشَّمْسُ كُوِّرَتْ ۩ وَإِذَا النُّجُومُ انكَدَرَتْ ۩ وَإِذَا الْجِبَالُ سُيِّرَتْ ۩ وَإِذَا الْعِشَارُ عُطِّلَتْ ۩ وَإِذَا الْوُحُوشُ حُشِرَتْ',english:'"When the sun is rolled up — when the stars fall scattered — when the mountains are set in motion — when the she-camels are abandoned — when the wild animals are gathered." (81:1-5)',note:'Five of twelve cosmic signs of the Day. Each begins with "Idha" (When) — building a list of impossible events that WILL happen. The Arabic sun "kuwwirat" means wrapped/rolled like a turban — extinguished and folded away.'},
  baby:{ref:'At-Takwir 81:8-9',arabic:'وَإِذَا الْمَوْءُودَةُ سُئِلَتْ ۩ بِأَيِّ ذَنبٍ قُتِلَتْ',english:'"And when the girl buried alive is asked — for what sin was she killed?" (81:8-9)',note:'Al-Maw\'udah — the buried girl. In pre-Islamic Arabia, some families buried their newborn daughters alive out of shame or poverty. Allah will ask HER — not her killer — "for what sin were you killed?" It is the ultimate vindication of the innocent. Islam forbade this practice completely.'},
  prepared:{ref:'At-Takwir 81:10-14',arabic:'وَإِذَا الصُّحُفُ نُشِرَتْ ۩ وَإِذَا السَّمَاءُ كُشِطَتْ ۩ وَإِذَا الْجَحِيمُ سُعِّرَتْ ۩ وَإِذَا الْجَنَّةُ أُزْلِفَتْ ۩ عَلِمَتْ نَفْسٌ مَّا أَحْضَرَتْ',english:'"When the records are laid open — when the sky is stripped away — when Hell is set ablaze — when Paradise is brought near — a soul will know what it has brought forward." (81:10-14)',note:'"Alimat nafsun ma ahdharat" — a soul will KNOW. All the fog of this world lifts. Every deed, every choice, every secret becomes crystal clear. What did you bring forward? What did you prepare?'},
  angel:{ref:'At-Takwir 81:19-21',arabic:'إِنَّهُ لَقَوْلُ رَسُولٍ كَرِيمٍ ۩ ذِي قُوَّةٍ عِندَ ذِي الْعَرْشِ مَكِينٍ ۩ مُّطَاعٍ ثَمَّ أَمِينٍ',english:'"Indeed it [the Quran] is the word of a noble Messenger — of great power, secure in rank with the Owner of the Throne — obeyed there, and trustworthy." (81:19-21)',note:'This "noble Messenger" is Jibril (AS) — the Angel of Revelation. He is noble (karim), of great power (dhi quwwah), secure in rank (makin), obeyed by all angels, and trustworthy. The Quran comes through the BEST possible carrier.'},
  prophet:{ref:'At-Takwir 81:22-25',arabic:'وَمَا صَاحِبُكُمْ بِمَجْنُونٍ ۩ وَلَقَدْ رَآهُ بِالْأُفُقِ الْمُبِينِ ۩ وَمَا هُوَ عَلَى الْغَيْبِ بِضَنِينٍ ۩ وَمَا هُوَ بِقَوْلِ شَيْطَانٍ رَّجِيمٍ',english:'"Your companion is not mad. He certainly saw him [Jibril] on the clear horizon. He is not withholding [knowledge of] the unseen. And it is not the word of a cursed devil." (81:22-25)',note:'Four defences of the Prophet ﷺ: 1) Not mad. 2) Truly saw Jibril on the horizon. 3) Not hiding information about the unseen. 4) This is NOT from Shaytan. The Quran defends its own messenger against the slanders of Quraysh.'},
  will:{ref:'At-Takwir 81:26-29',arabic:'فَأَيْنَ تَذْهَبُونَ ۩ إِنْ هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ ۩ لِمَن شَاءَ مِنكُمْ أَن يَسْتَقِيمَ ۩ وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ',english:'"So where are you going? It is nothing but a reminder to the worlds — for whoever wills among you to take a straight path. But you cannot will unless Allah wills — the Lord of the worlds." (81:26-29)',note:'"Fa-ayna tadh-habun?" — WHERE are you going? A divine question. The Quran is a reminder for ALL creation. But it requires your WILL to act. And even your will is within Allah\'s will. Humbling and empowering at the same time.'},
};

class Scene2 extends BaseScene{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas.onclick=()=>showVersePopup(VD.baby);
    const draw=()=>{
      this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();
      _sky(ctx);_stars(ctx);
      _label(ctx,'CLICK: The Buried Baby Girl — 81:8-9');
      _ground(ctx,165);
      // Ground crack / grave
      ctx.strokeStyle=p.acStr+'0.8)';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(CW/2-15,165);ctx.lineTo(CW/2-8,182);ctx.lineTo(CW/2+8,182);ctx.lineTo(CW/2+15,165);ctx.stroke();
      // Light beam coming from above
      const lp=0.3+Math.sin(this.t*0.04)*0.2;
      const lg=ctx.createLinearGradient(CW/2,0,CW/2,165);
      lg.addColorStop(0,p.acStr+lp+')');lg.addColorStop(1,p.acStr+'0)');
      ctx.fillStyle=lg;ctx.fillRect(CW/2-20,0,40,165);
      // Angel
      ctx.fillStyle='rgba(200,200,255,0.7)';
      ctx.beginPath();ctx.ellipse(CW/2-30,80,20,10,-0.5,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(CW/2+30,80,20,10,0.5,0,Math.PI*2);ctx.fill();
      fillRect(ctx,CW/2-4,72,8,16,'#f0eee8');fillRect(ctx,CW/2-3,64,6,8,'#e8c39a');
      // Question mark above
      ctx.fillStyle=p.label;ctx.font='14px "Press Start 2P",monospace';ctx.textAlign='center';
      ctx.fillText('?',CW/2,50);ctx.textAlign='left';
      ctx.fillStyle=p.acStr+'0.8)';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
      ctx.fillText('"For what sin was she killed?" (81:9)',CW/2,CH-15);ctx.textAlign='left';
    };
    draw();
  }
}
class Scene3 extends BaseScene{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas.onclick=()=>showVersePopup(VD.prepared);
    const draw=()=>{
      this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();
      _sky(ctx);_stars(ctx);
      _label(ctx,'CLICK: What Each Soul Has Prepared (81:10-14)');
      // Records unrolling
      const scroll=Math.min(200,(this.t*1.5));
      ctx.fillStyle='#f0ead8';ctx.fillRect(CW/2-scroll/2,80,scroll,60);
      ctx.strokeStyle='#c0a040';ctx.lineWidth=2;ctx.strokeRect(CW/2-scroll/2,80,scroll,60);
      if(scroll>20){
        ctx.fillStyle='#2a2060';ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
        ctx.fillText('DEED 1',CW/2,100);if(scroll>60)ctx.fillText('DEED 2',CW/2,115);
        if(scroll>100)ctx.fillText('DEED 3',CW/2,130);ctx.textAlign='left';
      }
      // Sky strip being removed
      const strip=Math.min(CH/2,this.t*0.8);
      ctx.fillStyle='rgba(0,0,0,0.4)';ctx.fillRect(0,0,CW,strip*0.3);
      // Hell blazing (bottom right)
      const fp=0.5+Math.sin(this.t*0.08)*0.5;
      ctx.fillStyle=`rgba(220,60,20,${fp*0.4})`;ctx.fillRect(380,160,100,40);
      // Paradise (bottom left)
      ctx.fillStyle=`rgba(40,180,80,${0.3+fp*0.2})`;ctx.fillRect(80,160,100,40);
      ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';
      ctx.fillText('🔥 HELL',430,195);ctx.fillText('🌿 PARADISE',130,195);ctx.textAlign='left';
      _label(ctx,'"A soul will know what it has brought forward" (81:14)',CH-15);
    };
    draw();
  }
}
class Scene4 extends BaseScene{
  constructor(){super('canvas-5');}
  start(){
    if(!this.ctx)return;
    this.canvas.onclick=()=>showVersePopup(VD.angel);
    const draw=()=>{
      this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();
      _sky(ctx);_stars(ctx);
      _label(ctx,'CLICK: The Noble Angel Jibril (81:19-21)');
      const off=Math.sin(this.t*0.03)*6;
      // Jibril (large angel with wings)
      const glow=0.4+Math.sin(this.t*0.04)*0.3;
      ctx.shadowColor=p.acStr+glow+')';ctx.shadowBlur=20;
      ctx.fillStyle='rgba(200,220,255,0.7)';
      ctx.beginPath();ctx.ellipse(CW/2-60,100+off,50,25,-0.3,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(CW/2+60,100+off,50,25,0.3,0,Math.PI*2);ctx.fill();
      fillRect(ctx,CW/2-10,85+off,20,40,'#f5f0e8');
      fillRect(ctx,CW/2-6,73+off,12,14,'#e8c39a');
      ctx.shadowBlur=0;
      // Glow crown
      ctx.fillStyle=p.acStr+'0.9)';ctx.beginPath();ctx.arc(CW/2,70+off,8,0,Math.PI*2);ctx.fill();
      // Labels
      ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
      ctx.fillText('NOBLE (كَرِيم)',CW/2,160);
      ctx.fillText('POWERFUL (ذِي قُوَّة) · TRUSTWORTHY (أَمِين)',CW/2,175);
      ctx.textAlign='left';
      _label(ctx,'"Noble Messenger...of great power, secure in rank" (81:19-20)',CH-15);
    };
    draw();
  }
}
class Scene5 extends BaseScene{
  constructor(){super('canvas-6');}
  start(){
    if(!this.ctx)return;
    this.canvas.onclick=()=>showVersePopup(VD.prophet);
    const draw=()=>{
      this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();
      _sky(ctx);_stars(ctx);_ground(ctx,170);
      _label(ctx,'CLICK: Your Companion is Not Mad (81:22-25)');
      // Prophet silhouette on horizon
      _fig(ctx,240,110,'#c8a070','#2a5a38','#1a3a28');
      // Horizon horizon line
      ctx.strokeStyle=p.acStr+'0.5)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(0,170);ctx.lineTo(CW,170);ctx.stroke();
      // Jibril on clear horizon (right side)
      const glow=0.5+Math.sin(this.t*0.04)*0.3;
      ctx.fillStyle='rgba(200,220,255,'+glow+')';
      ctx.beginPath();ctx.ellipse(420,120,30,15,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(380,120,30,15,0,0,Math.PI*2);ctx.fill();
      fillRect(ctx,394,108,14,30,'#f0eee8');fillRect(ctx,395,100,12,10,'#e8c39a');
      // Cross-out on "Majnoon" 
      ctx.fillStyle='#ff4444';ctx.font='8px "Press Start 2P",monospace';ctx.textAlign='center';
      ctx.fillText('مَجْنُون',100,110);
      ctx.strokeStyle='#ff4444';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(65,105);ctx.lineTo(135,115);ctx.stroke();
      ctx.fillStyle=p.label;ctx.font='5px "Press Start 2P",monospace';
      ctx.fillText('NOT mad! NOT a devil! SAW Jibril!',CW/2,195);ctx.textAlign='left';
    };
    draw();
  }
}
class Scene6 extends BaseScene{
  constructor(){super('canvas-7');}
  start(){
    if(!this.ctx)return;
    this.canvas.onclick=()=>showVersePopup(VD.will);
    const draw=()=>{
      this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();
      _sky(ctx);_stars(ctx);_ground(ctx,170);
      _label(ctx,'CLICK: "So Where Are You Going?" (81:26-29)');
      // Straight path
      ctx.strokeStyle=p.acStr+'0.7)';ctx.lineWidth=3;
      ctx.setLineDash([8,4]);
      ctx.beginPath();ctx.moveTo(CW/2,170);ctx.lineTo(CW/2,50);ctx.stroke();
      ctx.setLineDash([]);
      // Arrow up
      ctx.fillStyle=p.label;ctx.font='12px sans-serif';ctx.textAlign='center';
      ctx.fillText('▲',CW/2,48);
      // Person on path
      _fig(ctx,CW/2-10,120,'#e8c39a','#2a5a38','#1a3a28');
      // Direction signs
      ctx.fillStyle=p.sky2||'#0c0c28';ctx.fillRect(80,100,120,30);
      ctx.strokeStyle=p.acStr+'0.5)';ctx.lineWidth=1;ctx.strokeRect(80,100,120,30);
      ctx.fillStyle='#ff6666';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';
      ctx.fillText('← AWAY FROM TRUTH',140,119);
      ctx.fillStyle=p.sky2||'#0c0c28';ctx.fillRect(360,100,120,30);
      ctx.strokeStyle=p.acStr+'0.5)';ctx.strokeRect(360,100,120,30);
      ctx.fillStyle='#66ff88';
      ctx.fillText('STRAIGHT PATH →',420,119);
      ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';
      ctx.fillText('"FA-AYNA TADH-HABUN?"',CW/2,CH-20);
      ctx.fillText('"So WHERE are you going?"',CW/2,CH-8);
      ctx.textAlign='left';
    };
    draw();
  }
}

const scenes={};


const VD_wbw={ref:'At-Takwir (81)',arabic:'إِذَا الشَّمْسُ كُوِّرَتْ ۩ وَإِذَا النُّجُومُ انكَدَرَتْ ۩ وَإِذَا الْجِبَالُ سُيِّرَتْ',english:'"When the sun is wound round, when the stars fall losing their light, when the mountains are made to move." (81:1-3)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'🌑',label:'THE FOLDING UP',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new Scene1();scenes[3]=new Scene2();scenes[4]=new Scene3();scenes[5]=new Scene4();scenes[6]=new Scene5();scenes[7]=new Scene6();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
