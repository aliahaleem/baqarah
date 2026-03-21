'use strict';
window.SCENE_PALETTE = {

  labelText:'#c8b030', labelBg:'#04080e', labelBar:'#182880',  minecraft: {sky0:'#04080e',sky1:'#080e18',sky2:'#0e1828',gnd:'#121e30',gndAcc:'#182838',starStr:'rgba(100,140,220,',acStr:'rgba(200,176,48,',label:'#c8b030',hint:'#a09020'},
  stars: {sky0:'#0e1840',sky1:'#182458',sky2:'#243070',gnd:'#304080',gndAcc:'#405090',starStr:'rgba(200,216,255,',acStr:'rgba(224,216,96,',label:'#e0d860',hint:'#c0b840'},
};

// SURAH AL-BURUJ (85) — scenes.js
;

class BS{constructor(id){this.canvas=document.getElementById(id);this.ctx=this.canvas?this.canvas.getContext('2d'):null;this.raf=null;this.t=0;}stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=null;}}}

class S2 extends BS{constructor(){super('canvas-2');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.oath);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,15);_label(ctx,'CLICK: By the Sky with Constellations — 85:1-3');
// Constellations
const constellations=[[[80,30],[100,20],[120,35],[95,45]],[[200,15],[230,25],[250,10],[225,35]],[[350,20],[380,10],[400,30],[370,38]],[[450,15],[480,25],[500,10],[470,35]]];
constellations.forEach(pts=>{ctx.strokeStyle=p.acStr+'0.4)';ctx.lineWidth=1;ctx.beginPath();pts.forEach(([x,y],i)=>{if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.stroke();pts.forEach(([x,y])=>{ctx.fillStyle=p.acStr+'0.9)';ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill();});});
// Promised Day glow
const glow=0.15+Math.sin(this.t*0.03)*0.1;ctx.fillStyle=`rgba(200,176,48,${glow})`;ctx.beginPath();ctx.arc(CW/2,CH/2,80,0,Math.PI*2);ctx.fill();
_label(ctx,'"By the Promised Day — Witness and Witnessed" (85:1-3)',CH-10);};draw();}}

class S3 extends BS{constructor(){super('canvas-3');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.ditch);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,6);_ground(ctx,175);_label(ctx,'CLICK: People of the Ditch — 85:4-7');
// Ditch/trench with fire
const ditch={x:150,y:155,w:260,h:25};fillRect(ctx,ditch.x,ditch.y,ditch.w,ditch.h,'#200808');
// Flames in ditch
for(let f=0;f<12;f++){const fx=ditch.x+10+f*21,fh=15+Math.sin(this.t*0.15+f)*8;const r=180+f*4;ctx.fillStyle=`rgba(${r},${40+f*8},10,0.85)`;ctx.beginPath();ctx.moveTo(fx+4,ditch.y+ditch.h);ctx.lineTo(fx,ditch.y+ditch.h-fh);ctx.lineTo(fx+8,ditch.y+ditch.h);ctx.fill();}
// Tyrant sitting on edge, watching
_fig(ctx,100,130,'#d0b080','#3a2010','#201008');_fig(ctx,420,128,'#d0b080','#3a2010','#201008');
// Believer in fire
fillRect(ctx,CW/2-8,158,20,14,'#e8c39a');ctx.fillStyle='rgba(220,80,20,0.6)';ctx.fillRect(CW/2-12,154,28,18);
ctx.fillStyle='#ff8080';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"DESTROYED were the People of the Ditch!" (85:4)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S4 extends BS{constructor(){super('canvas-4');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.reason);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,8);_ground(ctx,175);_label(ctx,'CLICK: Their Only Crime — Believing in Allah — 85:8-9');
// Figure with faith symbol
_fig(ctx,CW/2-10,100,'#e8c39a','#2a4060','#1a2840');
// Forbidden sign / punishment
ctx.strokeStyle='rgba(220,80,20,0.8)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(CW/2+5,125,35,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(CW/2+5-35*0.7,125-35*0.7);ctx.lineTo(CW/2+5+35*0.7,125+35*0.7);ctx.stroke();
// Faith text
ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الْعَزِيزِ',CW/2+60,95);ctx.fillText('الْحَمِيدِ',CW/2+60,110);ctx.fillText('Believed in',CW/2+60,128);ctx.fillText('AL-AZIZ',CW/2+60,140);ctx.fillText('AL-HAMID',CW/2+60,152);
ctx.fillStyle='#ff8080';ctx.fillText('"Resented for NOTHING except — FAITH" (85:8)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S5 extends BS{constructor(){super('canvas-5');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.watching);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();
const g=ctx.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#041408');g.addColorStop(1,'#082010');ctx.fillStyle=g;ctx.fillRect(0,0,CW,CH);
_stars(ctx,10);_label(ctx,'CLICK: The Great Attainment — 85:11');
// Gardens with rivers
fillRect(ctx,20,180,CW-40,25,'#0a2808');
// River
ctx.fillStyle='rgba(30,100,200,0.6)';ctx.fillRect(50,185,460,12);
// Trees
[[80,150],[160,145],[240,155],[320,148],[400,152],[480,145]].forEach(([tx,ty])=>{fillRect(ctx,tx-4,ty,8,30,'#2a4810');fillRect(ctx,tx-12,ty-20,24,25,'#1a5010');});
// Believer in garden
const glow=0.3+Math.sin(this.t*0.05)*0.2;ctx.shadowColor=`rgba(80,220,80,${glow})`;ctx.shadowBlur=12;_fig(ctx,CW/2-10,140,'#f0e8c0','#3a6828','#1a3818');ctx.shadowBlur=0;
ctx.fillStyle='#80ff80';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الْفَوْزُ الْكَبِيرُ',CW/2,100);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Al-Fawz al-Kabir" — THE GREAT ATTAINMENT (85:11)',CW/2,CH-5);ctx.textAlign='left';};draw();}}

class S6 extends BS{constructor(){super('canvas-6');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.watching);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,12);_ground(ctx,175);_label(ctx,'CLICK: Allah\'s Grip is Severe — 85:12');
// Tyrant falling
_fig(ctx,80,140,'#d0b080','#3a2010','#201008');const shake=Math.sin(this.t*0.3)*3;ctx.fillStyle='rgba(220,80,20,0.6)';ctx.fillRect(55,135+shake,50,30);
// Lightning bolt from above
const pulse=0.5+Math.sin(this.t*0.06)*0.4;ctx.fillStyle=`rgba(224,216,96,${pulse})`;ctx.beginPath();ctx.moveTo(100,0);ctx.lineTo(85,70);ctx.lineTo(105,70);ctx.lineTo(90,140);ctx.lineTo(120,70);ctx.lineTo(100,70);ctx.lineTo(115,0);ctx.closePath();ctx.fill();
// Believer protected
_fig(ctx,420,130,'#f0e8c0','#2a4060','#1a2840');ctx.fillStyle='rgba(60,100,220,0.2)';ctx.beginPath();ctx.arc(440,150,40,0,Math.PI*2);ctx.fill();
ctx.fillStyle=p.label;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('"Inna batsha Rabbika la-shadid" — 85:12',CW/2,CH-5);ctx.fillText('"Indeed the GRIP of your Lord is SEVERE"',CW/2,CH+5);ctx.textAlign='left';};draw();}}

class S7 extends BS{constructor(){super('canvas-7');}start(){if(!this.ctx)return;this.canvas.onclick=()=>showVersePopup(VD.tablet);const draw=()=>{this.t++;this.raf=requestAnimationFrame(draw);const ctx=this.ctx,p=sceneP();_sky(ctx);_stars(ctx,15);_ground(ctx,180);_label(ctx,'CLICK: The Preserved Tablet — 85:21-22');
// Glowing tablet
const pulse=0.4+Math.sin(this.t*0.04)*0.3;ctx.shadowColor=p.acStr+pulse+')';ctx.shadowBlur=20;
fillRect(ctx,CW/2-50,50,100,100,p.sky2||'#0e1828');ctx.strokeStyle=p.acStr+'0.9)';ctx.lineWidth=2;ctx.strokeRect(CW/2-50,50,100,100);ctx.shadowBlur=0;
// Arabic text on tablet
ctx.fillStyle=p.label;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('قُرْآنٌ',CW/2,85);ctx.fillText('مَّجِيدٌ',CW/2,100);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('PRESERVED',CW/2,120);ctx.fillText('GLORIOUS',CW/2,133);
// Protected aura
ctx.fillStyle=`rgba(200,176,48,0.05)`;ctx.beginPath();ctx.arc(CW/2,100,80,0,Math.PI*2);ctx.fill();
ctx.textAlign='left';_label(ctx,'"Quran Majid — fi Lawhin Mahfudh" (85:21-22)',CH-5);};draw();}}

const VD={
  oath:{ref:'Al-Buruj 85:1-3',arabic:'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ ۩ وَالْيَوْمِ الْمَوْعُودِ ۩ وَشَاهِدٍ وَمَشْهُودٍ',english:'"By the sky full of great constellations — and the Promised Day — and a witness and what is witnessed." (85:1-3)',note:'Three oaths: the sky with its towers of stars (buruj), the Day of Judgment that is PROMISED, and the witness and witnessed — all of reality is observed. These oaths certify everything that follows about the People of the Ditch.'},
  ditch:{ref:'Al-Buruj 85:4-7',arabic:'قُتِلَ أَصْحَابُ الْأُخْدُودِ ۩ النَّارِ ذَاتِ الْوَقُودِ ۩ إِذْ هُمْ عَلَيْهَا قُعُودٌ ۩ وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِالْمُؤْمِنِينَ شُهُودٌ',english:'"Destroyed were the People of the Ditch — the fire full of fuel — when they sat by it — and they were witnesses to what they were doing to the believers." (85:4-7)',note:'"Qutila" — cursed and destroyed were the persecutors who dug the ditch of fire. They sat at the edge, watching believers burn. "Shuhud" — they themselves were witnesses to their own crime. History records their evil and Allah recorded it forever.'},
  reason:{ref:'Al-Buruj 85:8-10',arabic:'وَمَا نَقَمُوا مِنْهُمْ إِلَّا أَن يُؤْمِنُوا بِاللَّهِ الْعَزِيزِ الْحَمِيدِ ۩ الَّذِي لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ ۩ إِنَّ الَّذِينَ فَتَنُوا الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ ثُمَّ لَمْ يَتُوبُوا فَلَهُمْ عَذَابُ جَهَنَّمَ وَلَهُمْ عَذَابُ الْحَرِيقِ',english:'"And they resented them only because they believed in Allah, the Almighty, the Praiseworthy — to whom belongs the dominion of the heavens and the earth. And Allah is Witness over all things. Indeed, those who have tortured the believing men and believing women and then have not repented will have the punishment of Hell, and they will have the punishment of the Burning Fire." (85:8-10)',note:'Their only "crime" was faith in Allah — al-Aziz al-Hamid (the Mighty, the Praiseworthy). Then the warning: those who persecuted believing men AND believing women and did not repent face double punishment — Hell AND the Burning Fire. Yet even here, the door of repentance remains open: "thumma lam yatubu" — IF they had repented, even this could have been forgiven.'},
  watching:{ref:'Al-Buruj 85:11-18',arabic:'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ذَٰلِكَ الْفَوْزُ الْكَبِيرُ ۩ إِنَّ بَطْشَ رَبِّكَ لَشَدِيدٌ ۩ إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ ۩ وَهُوَ الْغَفُورُ الْوَدُودُ ۩ ذُو الْعَرْشِ الْمَجِيدُ ۩ فَعَّالٌ لِّمَا يُرِيدُ ۩ هَلْ أَتَاكَ حَدِيثُ الْجُنُودِ ۩ فِرْعَوْنَ وَثَمُودَ',english:'"Indeed, those who have believed and done righteous deeds will have gardens beneath which rivers flow. That is the great attainment. Indeed, the grip of your Lord is severe. Indeed, it is He who originates and repeats. And He is the Forgiving, the Loving — Owner of the Glorious Throne — Effecter of what He intends. Has there reached you the story of the soldiers? Of Pharaoh and Thamud?" (85:11-18)',note:'The believers burned on earth receive gardens with rivers — "al-Fawz al-Kabir" (the Great Attainment). Then five attributes of Allah: His grip is severe (12), He originates and repeats creation (13), He is the Forgiving and Loving (14), Owner of the Glorious Throne (15), Effecter of what He intends (16). Then the historical proof: Pharaoh and Thamud (17-18) — mighty armies, all destroyed by Allah\'s grip.'},
  tablet:{ref:'Al-Buruj 85:19-22',arabic:'بَلِ الَّذِينَ كَفَرُوا فِي تَكْذِيبٍ ۩ وَاللَّهُ مِن وَرَائِهِم مُّحِيطٌ ۩ بَلْ هُوَ قُرْآنٌ مَّجِيدٌ ۩ فِي لَوْحٍ مَّحْفُوظٍ',english:'"But they who disbelieve are in persistent denial — while Allah encompasses them from behind. Rather, it is a Glorious Quran — in a Preserved Tablet." (85:19-22)',note:'The deniers persist in denial (takdhib) — but Allah surrounds them completely, "muhit" (85:20). Their freedom is an illusion. And the final word: this Quran is "Majid" (Glorious) — preserved in the "Lawh al-Mahfudh" (Preserved Tablet), beyond all harm. Persecutors tried to destroy the faith, but the Quran is PRESERVED forever.'},
};

const scenes={};


const VD_wbw={ref:'Al-Buruj (85)',arabic:'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ ۩ وَالْيَوْمِ الْمَوْعُودِ ۩ إِنَّ بَطْشَ رَبِّكَ لَشَدِيدٌ ۩ إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ',english:'"By the sky full of great constellations, and the Promised Day — indeed the grip of your Lord is severe. It is He who originates and repeats." (85:1-2, 12-13)',note:'Key Arabic words from this surah. Tap each flip card below to learn them one by one.'};
const _s1wbw = new window.WBWScene('canvas-1', {emoji:'✨',label:'THE CONSTELLATIONS',verse:VD_wbw});

function initScenes(){scenes[1]=_s1wbw;scenes[2]=new S2();scenes[3]=new S3();scenes[4]=new S4();scenes[5]=new S5();scenes[6]=new S6();scenes[7]=new S7();}
function startScene(n) {
  if(scenes[n])scenes[n].start();}
function stopAllScenes() {
  Object.values(scenes).forEach(s=>s.stop());}
