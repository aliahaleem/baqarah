'use strict';
/* scenes.js — Surah Al-Maarij */
const CW=560,CH=220,P=4;
function sceneP(){const s=document.documentElement.getAttribute('data-theme')==='stars';return s?{sky0:'#041418',sky1:'#082028',gnd:'#0e2030',acc:'#f0c040',label:'#e0f4f8',hint:'#6090a0'}:{sky0:'#020c10',sky1:'#040e14',gnd:'#081820',acc:'#e0b030',label:'#d8f0f8',hint:'#406070'};}
function fillRect(ctx,x,y,w,h,col,r){if(r===undefined)r=w>18&&h>18&&w<120&&h<120?8:0;ctx.fillStyle=col;if(r>0&&ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}else{ctx.fillRect(x,y,w,h);}}
function _sky(ctx,p){const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,p.sky0);g.addColorStop(1,p.sky1);ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);}
function _ground(ctx,y,col){ctx.fillStyle=col||'#2a1a0a';ctx.fillRect(0,y,CW,CH-y);}
function _label(ctx,txt,col){ctx.font='7px "Press Start 2P",monospace';ctx.fillStyle=col||'rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText(txt,CW/2,CH-8);ctx.textAlign='left';}
function _fig(ctx,x,y,col,sz){sz=sz||10;fillRect(ctx,x-sz/2,y-sz*2,sz,sz,col||'#c0a070',sz/3);fillRect(ctx,x-sz*0.4,y-sz,sz*0.8,sz*1.6,col||'#c0a070',4);}
function _stars(ctx,n){for(let i=0;i<n;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.6})`;ctx.beginPath();ctx.arc(Math.random()*CW,Math.random()*CH*0.7,1,0,Math.PI*2);ctx.fill();}}

class BS{constructor(id){this.cv=document.getElementById(id);this.ctx=this.cv?this.cv.getContext('2d'):null;this.t=0;this.raf=null;}
stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}if(this.ctx)this.ctx.clearRect(0,0,CW,CH);if(this.cv)this.cv.onclick=null;}}


const VD_maarij0={ref:'Al-Maarij 70:1-2',arabic:'سَأَلَ سَائِلٌ بِعَذَابٍ وَاقِعٍ ۩ لِّلْكَافِرِينَ لَيْسَ لَهُ دَافِعٌ',english:'"A questioner asked about a punishment bound to happen — to the disbelievers; of it there is no preventer." (70:1-2)',note:'The surah opens with someone demanding the punishment: bring it on! Allah responds: it IS coming, and for the disbelievers no one can push it away — "laysa lahu daafi\'." The arrogance of asking for punishment while standing before the One who sends it.'};
const VD_maarij1={ref:'Al-Maarij 70:3-5',arabic:'مِنَ اللَّهِ ذِي الْمَعَارِجِ ۩ تَعْرُجُ الْمَلَائِكَةُ وَالرُّوحُ إِلَيْهِ فِي يَوْمٍ كَانَ مِقْدَارُهُ خَمْسِينَ أَلْفَ سَنَةٍ ۩ فَاصْبِرْ صَبْرًا جَمِيلًا',english:'"From Allah, Owner of the Ascending Stairways. The angels and the Spirit ascend to Him in a Day whose measure is fifty thousand years. So be patient with beautiful patience." (70:3-5)',note:"The angels ascend to Allah on stairways (ma'arij). The Day is 50,000 years. Yet for the believer it will feel like an afternoon or morning prayer. And the response? Beautiful patience — sabrun jameel."};

class S1 extends BS{
  constructor(){super('canvas-1');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_maarij1);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Ascending stairway with angels rising
      for(let i=0;i<8;i++){
        const oy=(this.t*0.3+i*12)%CH;
        fillRect(ctx,CW*0.1+i*28,CH*0.7-i*18,26,14,`rgba(32,128,160,${0.4+i*0.06})`,4);
        // Angel
        ctx.fillStyle=`rgba(200,220,255,${0.7-oy/CH})`;
        ctx.beginPath();ctx.arc(CW*0.23+i*28,CH*0.7-i*18-oy*0.1,4,0,Math.PI*2);ctx.fill();}
      _label(ctx,'CLICK: Ascending Stairways — 50,000 Year Day (70:3-5)',p.label);
    };draw();
  }
}
const VD_maarij_farnear={ref:'Al-Maarij 70:6-9',arabic:'إِنَّهُمْ يَرَوْنَهُ بَعِيدًا ۩ وَنَرَاهُ قَرِيبًا ۩ يَوْمَ تَكُونُ السَّمَاءُ كَالْمُهْلِ ۩ وَتَكُونُ الْجِبَالُ كَالْعِهْنِ',english:'"Indeed they see it as distant. But We see it as near. The Day the sky will be like murky oil. And the mountains will be like wool." (70:6-9)',note:'They think the Day of Judgment is far away — ba\'eeda. But Allah sees it as near — qareeba. When it comes: the sky becomes like boiling molten metal (muhl) and the mountains become like carded wool (\'ihn) — weightless, scattered. Everything you thought was permanent dissolves.'};
const VD_maarij_nofriend={ref:'Al-Maarij 70:10-14',arabic:'وَلَا يَسْأَلُ حَمِيمٌ حَمِيمًا ۩ يُبَصَّرُونَهُمْ ۚ يَوَدُّ الْمُجْرِمُ لَوْ يَفْتَدِي مِنْ عَذَابِ يَوْمِئِذٍ بِبَنِيهِ ۩ وَصَاحِبَتِهِ وَأَخِيهِ ۩ وَفَصِيلَتِهِ الَّتِي تُؤْوِيهِ ۩ وَمَن فِي الْأَرْضِ جَمِيعًا ثُمَّ يُنجِيهِ',english:'"No close friend will ask about his friend. They will be shown each other. The criminal will wish he could be ransomed from the punishment of that Day by his children, his wife, his brother, his nearest kindred who shelter him, and everyone on earth — so it could save him." (70:10-14)',note:'On that Day no friend asks about another — not from lack of love, but from overwhelming terror. The criminal would sacrifice EVERYTHING: his own children, his wife, his brother, his clan, every person on earth — just to escape. But nothing can ransom him. The most beloved relationships become worthless currency.'};
const VD_maarij_laza={ref:'Al-Maarij 70:15-18',arabic:'كَلَّا ۖ إِنَّهَا لَظَىٰ ۩ نَزَّاعَةً لِّلشَّوَىٰ ۩ تَدْعُو مَنْ أَدْبَرَ وَتَوَلَّىٰ ۩ وَجَمَعَ فَأَوْعَىٰ',english:'"No! Indeed it is the Laza (Blaze) — a remover of scalps. It invites he who turned his back and went away. And collected wealth and hoarded." (70:15-18)',note:'Laza — one of the names of Hellfire. "Nazzaa\'atan lil-shawa" — it strips away the scalps, the skin of the head. It actively CALLS to the one who turned away from truth, who hoarded wealth and refused to give. The Fire is not passive; it seeks its people.'};
const VD_maarij2={ref:'Al-Maarij 70:19-21',arabic:'إِنَّ الْإِنسَانَ خُلِقَ هَلُوعًا ۩ إِذَا مَسَّهُ الشَّرُّ جَزُوعًا ۩ إِذَا مَسَّهُ الْخَيْرُ مَنُوعًا',english:'"Indeed man was created anxious (halu\'a). When evil touches him, he is agitated. When good touches him, he is withholding." (70:19-21)',note:"Halu' is one of the most powerful Arabic words — combining extreme anxiety, impatience, and greed. This is our DEFAULT state. The antidote? The seven traits listed next — all rooted in faith and remembrance."};

class S2 extends BS{
  constructor(){super('canvas-2');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_maarij2);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.72,p.gnd);
      // Anxious man figure — shaking
      const shake=Math.sin(this.t*0.2)*3;
      _fig(ctx,CW*0.5+shake,CH*0.72,'#c0a070');
      // Panic swirls
      ctx.strokeStyle=`rgba(255,80,30,0.5)`;ctx.lineWidth=2;
      for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(CW*0.5+shake,CH*0.5,20+i*12,0,Math.PI*1.5);ctx.stroke();}
      _label(ctx,"CLICK: Man Created Anxious — Halu' (70:19-21)",p.label);
    };draw();
  }
}
const VD_maarij3={ref:'Al-Maarij 70:22-27',arabic:'إِلَّا الْمُصَلِّينَ ۩ الَّذِينَ هُمْ عَلَىٰ صَلَاتِهِمْ دَائِمُونَ ۩ وَالَّذِينَ فِي أَمْوَالِهِمْ حَقٌّ مَّعْلُومٌ ۩ لِّلسَّائِلِ وَالْمَحْرُومِ ۩ وَالَّذِينَ يُصَدِّقُونَ بِيَوْمِ الدِّينِ ۩ وَالَّذِينَ هُم مِّنْ عَذَابِ رَبِّهِم مُّشْفِقُونَ',english:'"Except those who pray — those who are constant in their prayer. And in whose wealth there is a known right for the beggar and the deprived. And those who believe in the Day of Recompense. And those who are afraid of the punishment of their Lord..." (70:22-27)',note:"The 'except' clause: prayer, charity, belief in the Day, fear of punishment, guarding chastity, honoring trusts, upright testimony. Seven shields against the default state of anxiety and greed."};

class S3 extends BS{
  constructor(){super('canvas-3');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_maarij3);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      _ground(ctx,CH*0.75,p.gnd);
      // Seven figures in prayer
      for(let i=0;i<7;i++){
        const glow=0.5+Math.sin(this.t*0.04+i)*0.3;
        _fig(ctx,CW*0.08+i*CW*0.13,CH*0.75,`rgba(240,200,80,${glow})`);
        ctx.fillStyle=p.acc;ctx.font='6px serif';ctx.textAlign='center';
        ctx.fillText(String(i+1),CW*0.08+i*CW*0.13,CH*0.55);ctx.textAlign='left';}
      _label(ctx,"CLICK: 7 Believer Traits — Escape from Halu' (70:22-35)",p.label);
    };draw();
  }
}
const VD_maarij_deniers={ref:'Al-Maarij 70:36-41',arabic:'فَمَالِ الَّذِينَ كَفَرُوا قِبَلَكَ مُهْطِعِينَ ۩ عَنِ الْيَمِينِ وَعَنِ الشِّمَالِ عِزِينَ ۩ أَيَطْمَعُ كُلُّ امْرِئٍ مِّنْهُمْ أَن يُدْخَلَ جَنَّةَ نَعِيمٍ ۩ كَلَّا ۖ إِنَّا خَلَقْنَاهُم مِّمَّا يَعْلَمُونَ ۩ فَلَا أُقْسِمُ بِرَبِّ الْمَشَارِقِ وَالْمَغَارِبِ إِنَّا لَقَادِرُونَ ۩ عَلَىٰ أَن نُّبَدِّلَ خَيْرًا مِّنْهُمْ وَمَا نَحْنُ بِمَسْبُوقِينَ',english:'"So what is the matter with those who disbelieve, hastening toward you from the right and the left in separate groups? Does every person among them aspire to enter a Garden of Pleasure? No! Indeed We created them from that which they know. So I swear by the Lord of the rising and setting points — indeed We are able to replace them with better than them, and We are not to be outdone." (70:36-41)',note:'The disbelievers rush toward the Prophet ﷺ in mocking crowds — from every direction, in scattered groups (\'izeen). Do they think they will enter Paradise while rejecting the message? "Kalla!" — Absolutely not. Allah reminds them of their humble origin — created from what they know (a drop of fluid). Then He swears by the Lord of every sunrise and sunset: We can replace you entirely with better people. Allah is never outrun or outdone.'};
const VD_maarij4={ref:'Al-Maarij 70:42-44',arabic:'فَذَرْهُمْ يَخُوضُوا وَيَلْعَبُوا حَتَّىٰ يُلَاقُوا يَوْمَهُمُ الَّذِي يُوعَدُونَ ۩ يَوْمَ يَخْرُجُونَ مِنَ الْأَجْدَاثِ سِرَاعًا',english:'"So leave them to plunge and play until they meet their Day which they are promised — the Day they will emerge from the graves in haste." (70:42-44)',note:"The surah ends with a stark warning: let them play. The graves will open. They will emerge in haste — eyes downcast, covered in humiliation. Contrast this with the believers ascending the ma'arij."};

class S4 extends BS{
  constructor(){super('canvas-4');}
  start(){
    if(!this.ctx)return;
    this.canvas=this.cv;
    this.canvas.onclick=()=>showVersePopup(VD_maarij4);
    const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);
      const ctx=this.ctx,p=sceneP();_sky(ctx,p);
      // Graves opening
      _ground(ctx,CH*0.6,p.gnd);
      for(let i=0;i<5;i++){
        const open=Math.sin(this.t*0.03+i*0.7)*0.5+0.5;
        ctx.fillStyle='#1a0808';
        ctx.fillRect(CW*0.06+i*CW*0.18,CH*0.5,CW*0.12,CH*0.14*(1-open));
        _fig(ctx,CW*0.12+i*CW*0.18,CH*0.6-CH*0.1*open,'#808080');}
      _label(ctx,'CLICK: Emerging from Graves in Haste (70:42-44)',p.label);
    };draw();
  }
}
const _scenes={};
function initScenes(){for(let k in _scenes)_scenes[k]=null;_scenes[1]=new S1();_scenes[2]=new S2();_scenes[3]=new S3();_scenes[4]=new S4();}
function startScene(n){if(_scenes[n])_scenes[n].start();}
function stopAllScenes(){Object.values(_scenes).forEach(s=>s&&s.stop());}
