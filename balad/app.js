'use strict';
/* Surah Al-Balad (90) — The City */
window.STORAGE_KEY = 'baladQuestSave';
window.state = window.buildDefaultState(7);

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'🕋', title:'City Witness',    msg:"SubhanAllah! Allah swears by THIS city — Mecca — and by the Prophet ﷺ living freely in it. 'Laqad khalaqnal-insan fi kabad' — We created man in hardship. Life is designed for striving. May we strive well!"},
  3:{xp:80, gems:3, icon:'💪', title:'Struggle Knower', msg:"MashAllah! Man has two eyes, a tongue, two lips — and Allah showed him BOTH paths. He was given everything he needs. No excuses! May we choose the right path always."},
  4:{xp:90, gems:3, icon:'🏔️', title:'Path Climber',   msg:"SubhanAllah! Al-aqabah — the steep path — is the path of freeing the oppressed, feeding the hungry. It's HARD — that's why it's called steep! May Allah give us strength to climb it. Ameen!"},
  5:{xp:90, gems:3, icon:'🍲', title:'Feeder of Hungry', msg:"MashAllah! Feeding an orphan relative or a destitute stranger on a day of hunger — this is the aqabah! And not just doing it — ENCOURAGING others too. May Allah make us of the feeders!"},
  6:{xp:100, gems:4, icon:'🤝', title:'Companion Right', msg:"MashAllah! Believe, urge each other to patience, urge each other to mercy — these are the 'Companions of the Right' (Ashaab al-Maymana). May Allah write us among them. Ameen!"},
  7:{xp:110, gems:5, icon:'🔥', title:'Al-Balad Complete', msg:"Allahu Akbar! Al-Balad complete! The two paths are clear. The aqabah is steep. The companions of the right earn Jannah. May Allah make us climb every aqabah in our lives! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s90', surahName:'Al-Balad', surahArabic:'البلد', totalLevels:7, wbwSection:1, rewards:REWARDS,
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Welcome to Surah Al-Balad — The City! Allah swears by Mecca. Man is created in hardship. Two paths: the easy path of selfishness, and the steep aqabah of freeing slaves, feeding orphans, and urging mercy. Which path will you choose? 7 levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. The aqabah is steep — but keep climbing! 💪`,
    complete: name=>`MashAllah, ${name}! All 7 levels of Al-Balad complete! "Thumma kana minal-ladhina amanu wa-tawassaw bis-sabri wa-tawassaw bil-marhama." May Allah make us companions of the right. Ameen! 🏆`,
  },
};

/* Level 1: Quiz — The Sacred City & Man in Hardship (90:1-4) */
/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'90:1 — لَا أُقْسِمُ بِهَٰذَا الْبَلَدِ', words:[
    {ar:'الْبَلَدِ', tr:'al-balad', en:'the city (Mecca)', freq:19},
    {ar:'بِهَٰذَا', tr:'bi-hādhā', en:'by this', freq:70},
    {ar:'أُقْسِمُ', tr:'uqsimu', en:'I swear', freq:8},
    'la',
  ]},
  {label:'90:2 — وَأَنتَ حِلٌّ بِهَٰذَا الْبَلَدِ', words:[
    {ar:'الْبَلَدِ', tr:'al-balad', en:'the city', freq:19},
    {ar:'بِهَٰذَا', tr:'bi-hādhā', en:'in this', freq:70},
    {ar:'حِلٌّ', tr:'ḥill', en:'free / lawful', freq:1},
    {ar:'وَأَنتَ', tr:'wa-anta', en:'and you are', freq:105},
  ]},
  {label:'90:3 — وَوَالِدٍ وَمَا وَلَدَ', words:[
    {ar:'وَلَدَ', tr:'walad', en:'he fathered', freq:56},
    {ar:'وَمَا', tr:'wa-mā', en:'and what', freq:2005},
    {ar:'وَوَالِدٍ', tr:'wa-wālidin', en:'and (by) a father', freq:3},
  ]},
  {label:'90:4 — لَقَدْ خَلَقْنَا الْإِنسَانَ فِي كَبَدٍ', words:[
    {ar:'كَبَدٍ', tr:'kabad', en:'hardship', freq:1},
    'fi',
    {ar:'الْإِنسَانَ', tr:'al-insān', en:'man', freq:65},
    {ar:'خَلَقْنَا', tr:'khalaqnā', en:'We created', freq:29},
    {ar:'لَقَدْ', tr:'laqad', en:'certainly', freq:406},
  ]},
  {label:'90:5 — أَيَحْسَبُ أَن لَّن يَقْدِرَ عَلَيْهِ أَحَدٌ', words:[
    {ar:'أَحَدٌ', tr:'aḥadun', en:'anyone', freq:86},
    {ar:'عَلَيْهِ', tr:'ʿalayhi', en:'over him', freq:34},
    {ar:'يَقْدِرَ', tr:'yaqdira', en:'has power', freq:45},
    {ar:'لَّن', tr:'lan', en:'never', freq:69},
    {ar:'أَن', tr:'an', en:'that', freq:680},
    {ar:'أَيَحْسَبُ', tr:'ayaḥsabu', en:'does he think', freq:8},
  ]},
  {label:'90:6 — يَقُولُ أَهْلَكْتُ مَالًا لُّبَدًا', words:[
    {ar:'لُّبَدًا', tr:'lubadan', en:'in abundance', freq:1},
    {ar:'مَالًا', tr:'mālan', en:'wealth', freq:86},
    {ar:'أَهْلَكْتُ', tr:'ahlaktu', en:'I have spent', freq:5},
    {ar:'يَقُولُ', tr:'yaqūlu', en:'he says', freq:528},
  ]},
  {label:'90:7 — أَيَحْسَبُ أَن لَّمْ يَرَهُ أَحَدٌ', words:[
    {ar:'أَحَدٌ', tr:'aḥadun', en:'anyone', freq:86},
    {ar:'يَرَهُ', tr:'yarahu', en:'has seen him', freq:328},
    'lam',
    {ar:'أَن', tr:'an', en:'that', freq:680},
    {ar:'أَيَحْسَبُ', tr:'ayaḥsabu', en:'does he think', freq:8},
  ]},
  {label:'90:8 — أَلَمْ نَجْعَل لَّهُ عَيْنَيْنِ', words:[
    {ar:'عَيْنَيْنِ', tr:'ʿaynayn', en:'two eyes', freq:7},
    {ar:'لَّهُ', tr:'lahu', en:'for him', freq:860},
    {ar:'نَجْعَل', tr:'najʿal', en:'did We not make', freq:30},
    'alam',
  ]},
  {label:'90:9 — وَلِسَانًا وَشَفَتَيْنِ', words:[
    {ar:'وَشَفَتَيْنِ', tr:'wa-shafatayn', en:'and two lips', freq:1},
    {ar:'وَلِسَانًا', tr:'wa-lisānan', en:'and a tongue', freq:25},
  ]},
  {label:'90:10 — وَهَدَيْنَاهُ النَّجْدَيْنِ', words:[
    {ar:'النَّجْدَيْنِ', tr:'al-najdayn', en:'the two paths', freq:1},
    {ar:'وَهَدَيْنَاهُ', tr:'wa-hadaynāhu', en:'and We showed him', freq:3},
  ]},
  {label:'90:11 — فَلَا اقْتَحَمَ الْعَقَبَةَ', words:[
    {ar:'الْعَقَبَةَ', tr:'al-ʿaqaba', en:'the steep path', freq:2},
    {ar:'اقْتَحَمَ', tr:'iqtaḥama', en:'attempted', freq:1},
    {ar:'فَلَا', tr:'fa-lā', en:'but he has not', freq:1069},
  ]},
  {label:'90:12 — وَمَا أَدْرَاكَ مَا الْعَقَبَةُ', words:[
    {ar:'الْعَقَبَةُ', tr:'al-ʿaqaba', en:'the steep path', freq:2},
    'ma',
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'will make you know', freq:13},
    {ar:'وَمَا', tr:'wa-mā', en:'and what', freq:2005},
  ]},
  {label:'90:13 — فَكُّ رَقَبَةٍ', words:[
    {ar:'رَقَبَةٍ', tr:'raqabatin', en:'a slave / neck', freq:8},
    {ar:'فَكُّ', tr:'fakku', en:'freeing', freq:1},
  ]},
  {label:'90:14 — أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ', words:[
    {ar:'مَسْغَبَةٍ', tr:'masghaba', en:'severe hunger', freq:1},
    {ar:'ذِي', tr:'dhī', en:'of / possessing', freq:38},
    {ar:'يَوْمٍ', tr:'yawmin', en:'a day', freq:365},
    'fi',
    {ar:'إِطْعَامٌ', tr:'iṭʿām', en:'feeding', freq:4},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
  ]},
  {label:'90:15 — يَتِيمًا ذَا مَقْرَبَةٍ', words:[
    {ar:'مَقْرَبَةٍ', tr:'maqraba', en:'relationship', freq:1},
    {ar:'ذَا', tr:'dhā', en:'possessing', freq:38},
    {ar:'يَتِيمًا', tr:'yatīman', en:'an orphan', freq:22},
  ]},
  {label:'90:16 — أَوْ مِسْكِينًا ذَا مَتْرَبَةٍ', words:[
    {ar:'مَتْرَبَةٍ', tr:'matraba', en:'destitution', freq:1},
    {ar:'ذَا', tr:'dhā', en:'possessing', freq:38},
    {ar:'مِسْكِينًا', tr:'miskīnan', en:'a needy person', freq:25},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
  ]},
  {label:'90:17 — ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ', words:[
    {ar:'بِالْمَرْحَمَةِ', tr:'bil-marḥama', en:'to mercy', freq:1},
    {ar:'وَتَوَاصَوْا', tr:'wa-tawāṣaw', en:'and urged each other', freq:2},
    {ar:'بِالصَّبْرِ', tr:'bil-ṣabr', en:'to patience', freq:7},
    {ar:'وَتَوَاصَوْا', tr:'wa-tawāṣaw', en:'and urged each other', freq:2},
    {ar:'آمَنُوا', tr:'āmanū', en:'believed', freq:537},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    {ar:'مِنَ', tr:'mina', en:'of / among', freq:1891},
    'kaana',
    'thumma',
  ]},
  {label:'90:18 — أُولَٰئِكَ أَصْحَابُ الْمَيْمَنَةِ', words:[
    {ar:'الْمَيْمَنَةِ', tr:'al-maymana', en:'the right (hand)', freq:3},
    {ar:'أَصْحَابُ', tr:'aṣḥābu', en:'companions of', freq:40},
    {ar:'أُولَٰئِكَ', tr:'ulāʾika', en:'those are', freq:160},
  ]},
  {label:'90:19 — وَالَّذِينَ كَفَرُوا بِآيَاتِنَا هُمْ أَصْحَابُ الْمَشْأَمَةِ', words:[
    {ar:'الْمَشْأَمَةِ', tr:'al-mashʾama', en:'the left (hand)', freq:3},
    {ar:'أَصْحَابُ', tr:'aṣḥābu', en:'companions of', freq:40},
    'hum',
    {ar:'بِآيَاتِنَا', tr:'bi-āyātinā', en:'in Our signs', freq:38},
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieved', freq:525},
    {ar:'وَالَّذِينَ', tr:'walladhīna', en:'and those who', freq:1283},
  ]},
  {label:'90:20 — عَلَيْهِمْ نَارٌ مُّؤْصَدَةٌ', words:[
    {ar:'مُّؤْصَدَةٌ', tr:'muʾṣada', en:'closed over them', freq:2},
    {ar:'نَارٌ', tr:'nārun', en:'a fire', freq:145},
    {ar:'عَلَيْهِمْ', tr:'ʿalayhim', en:'upon them', freq:44},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  {q:'What city does Allah swear by in 90:1?',
   opts:['Medina','Jerusalem','Mecca','Baghdad'],
   correct:2},
  {q:'What does "wa-anta hillun bi-hadhal-balad" mean?',
   opts:['You are a visitor to the city','You are free of restriction in this city','You are forbidden from this city','You are the king of this city'],
   correct:1},
  {q:'What does "kabad" (90:4) mean?',
   opts:['Easy and comfortable life','Joy and celebration','Hardship and struggle','Wealth and luxury'],
   correct:2},
  {q:'What does Allah swear by in 90:3?',
   opts:['The sun and the moon','The father and what he fathered','The night and the day','The sea and the mountains'],
   correct:1},
];

/* Level 2: Drag & Drop — Eyes, Tongue, Two Paths (90:8-10) */
const S2_ITEMS = [
  {id:'b1', text:'عَيْنَيْنِ',   zone:'z1'},
  {id:'b2', text:'لِسَانًا',   zone:'z2'},
  {id:'b3', text:'شَفَتَيْنِ',   zone:'z3'},
  {id:'b4', text:'النَّجْدَيْنِ',  zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Alam naj\'al lahu \'aynayn" (90:8) — Two eyes for seeing and observing Allah\'s creation'},
  {id:'z2', desc:'"Wa lisānan" (90:9) — A tongue for speech, communication and dhikr of Allah'},
  {id:'z3', desc:'"Wa shafatayn" (90:9) — Two lips for shaping speech and eating provision'},
  {id:'z4', desc:'"Wa hadaynāhu al-najdayn" (90:10) — The two paths: good and evil'},
];

/* Level 3: Quiz — Al-Aqabah (90:11-16) */
const S3_QUIZ = [
  {q:'What is "al-aqabah" in Surah Al-Balad?',
   opts:['A mountain near Mecca','The steep and difficult righteous path','A gate of Paradise','A prayer at sunset'],
   correct:1},
  {q:'What is the FIRST act of the aqabah mentioned in 90:13?',
   opts:['Feeding the poor','Giving gold to orphans','Freeing a slave','Praying extra prayers'],
   correct:2},
  {q:'What day makes feeding an orphan especially meritorious? (90:14)',
   opts:['On Friday','On the day of \'Arafah','On a day of severe hunger','On the first of Ramadan'],
   correct:2},
  {q:'Who does "dha matraba" (90:16) describe?',
   opts:['An orphan with relatives','A traveller without home','A person utterly prostrate in poverty','A prisoner in chains'],
   correct:2},
];

/* Level 4: Drag & Drop — Acts of the Aqabah */
const S4_ITEMS = [
  {id:'a1', text:'فَكُّ رَقَبَةٍ',       zone:'z1'},
  {id:'a2', text:'يَتِيمًا\nذَا مَقْرَبَةٍ', zone:'z2'},
  {id:'a3', text:'مِسْكِينًا\nذَا مَتْرَبَةٍ', zone:'z3'},
  {id:'a4', text:'تَوَاصَوْا\nبِالْمَرْحَمَةِ', zone:'z4'},
];
const S4_ZONES = [
  {id:'z1', desc:'"Fakku raqabatin" — liberating an enslaved person from bondage (90:13)'},
  {id:'z2', desc:'"Yatiman dha maqraba" — an orphan who is your close relative (90:15)'},
  {id:'z3', desc:'"Miskeenan dha matraba" — someone utterly prostrate in poverty (90:16)'},
  {id:'z4', desc:'"Tawassaw bil-marhama" — urging each other to show mercy (90:17)'},
];

/* Level 5: Complete the Verse — Two Types of People (90:17-20) */
const S6_FIB = [
  {verse:'فَلَا اقْتَحَمَ _____', opts:['الْعَقَبَةَ','الصِّرَاطَ','الْجَبَلَ','الطَّرِيقَ'], correct:0, ref:'90:11', translation:'But he has not attempted the steep path'},
  {verse:'فَكُّ _____', opts:['رَقَبَةٍ','أَسِيرٍ','عَبْدٍ','سَجِينٍ'], correct:0, ref:'90:13', translation:'Freeing a slave'},
  {verse:'أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي _____', opts:['مَسْغَبَةٍ','مَجَاعَةٍ','شِدَّةٍ','فَاقَةٍ'], correct:0, ref:'90:14', translation:'Or feeding on a day of severe hunger'},
  {verse:'وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِ_____', opts:['الْمَرْحَمَةِ','الْعَدَالَةِ','الصِّدْقِ','الْأَمَانَةِ'], correct:0, ref:'90:17', translation:'And urged each other to patience and urged each other to mercy'},
  {verse:'عَلَيْهِمْ نَارٌ _____', opts:['مُّؤْصَدَةٌ','مُسَعَّرَةٌ','مُشْتَعِلَةٌ','حَامِيَةٌ'], correct:0, ref:'90:20', translation:'Upon them is a fire closed over them'},
];

/* Level 6: Quiz — Companions of Right and Left (90:17-20) */
const S6_QUIZ = [
  {q:'What are the three qualities of those who take the aqabah? (90:17)',
   opts:['Prayer, fasting, and hajj only','Belief, urging patience, urging mercy','Wealth, health, and long life','Knowledge, teaching, and writing'],
   correct:1},
  {q:'What are "Ashaab al-Maymana"?',
   opts:['People who live in Mecca','Companions of the left (Hellfire)','Companions of the right (Jannah)','Scholars of the Quran'],
   correct:2},
  {q:'What are "Ashaab al-Mash\'ama"?',
   opts:['People who rejected Allah\'s signs','People who gave less charity','People who asked too many questions','People who lived in hardship'],
   correct:0},
  {q:'What surrounds the companions of the left in 90:20?',
   opts:['Darkness and cold','Closing fire all around them','Loud punishment and noise','Heavy chains and shackles'],
   correct:1},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerQuiz(2, S1_QUIZ);
window.registerMatch(3, S2_ITEMS,S2_ZONES);
window.registerQuiz(4, S3_QUIZ);
window.registerMatch(5, S4_ITEMS,S4_ZONES);
window.registerFillBlank(6, S6_FIB);
window.registerQuiz(7, S6_QUIZ);

function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#3d2870':'#120a04', sand=st?'#5a4070':'#3a1e08', acc=st?'#f4c840':'#e8b030';
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
  for(let i=0;i<35;i++){const sx=(i*4517)%W,sy=(i*3701)%(H*0.6);ctx.fillStyle=`rgba(255,240,200,${Math.min(0.8,n*0.15)})`;ctx.fillRect(sx,sy,1,1);}
  if(n<1){ctx.fillStyle=acc;ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('🕋 Complete levels to build Mecca!',W/2,20);ctx.textAlign='left';return;}
  ctx.fillStyle=sand; ctx.fillRect(0,H*0.65,W,H*0.35);
  if(n>=2){ctx.fillStyle=st?'#7050a0':'#6a3810';for(let i=0;i<4;i++){ctx.fillRect(W*0.1+i*W*0.25,H*0.3,25,H*0.4);}}
  if(n>=3){ctx.fillStyle=st?'#9060d0':'#8a5010'; ctx.fillRect(W*0.37,H*0.15,54,55);}
  if(n>=4){ctx.fillStyle=acc; ctx.fillRect(W*0.39,H*0.16,50,6);}
  if(n>=5){ctx.fillStyle=st?'#f4c840':'#e8b030';ctx.font='7px serif';for(let i=0;i<5;i++)ctx.fillText('★',W*0.08+i*20,H*0.25);}
  if(n>=6){ctx.fillStyle=acc;ctx.font='8px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('AL-BALAD COMPLETE! 🕋',W/2,16);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Building Mecca — ${n}/7 levels`,W/2,16);ctx.textAlign='left';}
};
