'use strict';
/* Surah Al-Falaq (113) — The Daybreak */
window.STORAGE_KEY = 'falaqQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,                  // word-by-word matching
  s2Answers:{}, s2Checked:false,    // quiz: Lord of Daybreak
  s3Checked:false,                  // drag: 4 evils
  s4Answers:{}, s4Checked:false,    // quiz: sihr/magic
  s5Answers:{}, s5Checked:false,    // quiz: deeper reflection
};

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Al-Falaq Words Learned!',
     msg:"MashAllah! You matched every Arabic word of Al-Falaq to its meaning! أَعُوذُ بِرَبِّ الْفَلَقِ — I seek refuge in the Lord of the Daybreak! Now every time you recite this surah for protection, you know exactly what you are saying to Allah!"},
  2:{xp:70, gems:3, icon:'🌅', title:'Refuge Sought',
     msg:"SubhanAllah! 'Qul a'udhu bi-rabb il-falaq.' Say: I seek refuge in the Lord of the DAYBREAK! Al-Falaq is the splitting of the morning light — dramatic, specific. We seek refuge in the One who COMMANDS the morning to break through darkness!"},
  3:{xp:80, gems:3, icon:'🌑', title:'Evils Matched',
     msg:"MashAllah! You matched the four evils! The evil of what He created (general), the darkness of the night when it settles, the evil of blowers on knots (witchcraft), the evil of an envier when they envy. All four!"},
  4:{xp:85, gems:3, icon:'🔮', title:'Sihr Understood',
     msg:"SubhanAllah! Blowers on knots — 'naffathat fil-uqad' — refers to those who practice sihr (magic/witchcraft). Even the Prophet ﷺ was affected by sihr (Labid ibn al-A'sam). Al-Mu'awwidhatayn (Al-Falaq + An-Nas) were revealed as cure!"},
  5:{xp:100, gems:4, icon:'✨', title:'Al-Falaq Complete!',
     msg:"Allahu Akbar! Al-Falaq complete! We seek refuge from the night, from magic, and from envy. The Prophet ﷺ recited Al-Falaq and An-Nas every night before sleeping and after every prayer. May Allah protect us! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s113', surahName:'Al-Falaq', surahArabic:'الفلق', totalLevels:5, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','🌅','🌑','🔮','✨'],
  tileLabels:['Word by Word','Lord of Dawn','4 Evils','Envy & Magic','Al-Falaq'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Falaq — The Daybreak! First learn every Arabic word, then master the four evils, magic, and envy. One of Al-Mu'awwidhatayn — the two protection surahs! 5 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/5 done. Seek His refuge! 🌅`,
    complete:n=>`MashAllah, ${n}! Al-Falaq complete! Recite every morning and evening — may Allah protect you and your family! Ameen! 🏆`,
  },
};

/* ────────────────────────────────────────────────────────
   LEVEL 1 — Word by Word flip cards (113:1-5)
   ──────────────────────────────────────────────────────── */
const WBW_DATA = [
  {label:'Verse 1 — قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', words:[
    'al-falaq',
    {ar:'بِرَبِّ', tr:'bi-rabb', en:'in the Lord of', freq:15},
    'a-udhu','qul',
  ]},
  {label:'Verse 2 — مِن شَرِّ مَا خَلَقَ', words:[
    'khalaqa','ma','sharr','min',
  ]},
  {label:'Verse 3 — وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', words:[
    'waqab','idha','ghassiq','sharr',
    {ar:'وَمِن', tr:'wa-min', en:'and from', freq:200},
  ]},
  {label:'Verse 4 — وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', words:[
    'al-uqad','fi','al-naffathat','sharr',
    {ar:'وَمِن', tr:'wa-min', en:'and from', freq:200},
  ]},
  {label:'Verse 5 — وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', words:[
    'hasad','idha','hasid','sharr',
    {ar:'وَمِن', tr:'wa-min', en:'and from', freq:200},
  ]},
];

/* ────────────────────────────────────────────────────────
   LEVEL 2 — Quiz: Lord of the Daybreak (113:1)
   ──────────────────────────────────────────────────────── */
const S2_QUIZ = [
  {q:'What does "Rabb al-falaq" (113:1) mean?',
   opts:['Lord of the universe and all its creation','Lord of the Daybreak — who splits the morning light','Lord of the night and all of its darkness','Lord of everything that He has created'],
   correct:1},
  {q:'From what first general evil do we seek refuge in 113:2?',
   opts:['From human enemies and all of their plots','From the evil of what He created — all of creation\'s potential harm','From the evil of wealth and pride alone','From the evil of the jinn and their magic'],
   correct:1},
  {q:'What is "ghassiq idha waqab" (113:3)?',
   opts:['Heavy rain and thunder storms','The darkening night when it fully settles in','Thunderclouds and flashing lightning','The cold winter season and its winds'],
   correct:1},
  {q:'What are "naffathat fil-uqad" (113:4)?',
   opts:['People who gossip and spread lies about others','Those who blow on knots — practitioners of sihr/magic','Birds that fly silently in the night','Snakes that hide in darkness'],
   correct:1},
];

/* ────────────────────────────────────────────────────────
   LEVEL 3 — Drag & Drop: Four evils matched
   ──────────────────────────────────────────────────────── */
const S3_ITEMS = [
  {id:'f1', text:'مِن شَرِّ مَا خَلَقَ',              zone:'z1'},
  {id:'f2', text:'وَمِن شَرِّ غَاسِقٍ\nإِذَا وَقَبَ', zone:'z2'},
  {id:'f3', text:'وَمِن شَرِّ النَّفَّاثَاتِ\nفِي الْعُقَدِ', zone:'z3'},
  {id:'f4', text:'وَمِن شَرِّ حَاسِدٍ\nإِذَا حَسَدَ',  zone:'z4'},
];
const S3_ZONES = [
  {id:'z1', desc:'From the evil of all that He created — a general refuge from every harm (113:2)'},
  {id:'z2', desc:'From the evil of darkness when it settles — night brings hidden dangers (113:3)'},
  {id:'z3', desc:'From the evil of those who blow on knots — protection from witchcraft (113:4)'},
  {id:'z4', desc:'From the evil of an envier when they actively envy (113:5)'},
];

/* ────────────────────────────────────────────────────────
   LEVEL 4 — Quiz: Sihr & Envy (113:4-5)
   ──────────────────────────────────────────────────────── */
const S4_QUIZ = [
  {q:'Who was Labid ibn al-A\'sam and what did he do to the Prophet ﷺ?',
   opts:['He was a companion who memorised the Quran','A Jewish man who practiced sihr on the Prophet ﷺ — knots hidden in a well','He was an enemy who fought at the Battle of Badr','A trader who cheated the Muslim companions'],
   correct:1},
  {q:'What is special about "hasidin idha hasad" (113:5) — "envier when they envy"?',
   opts:['All types of envy are equally harmful and sinful','Envy becomes evil when ACTIVELY directed — "idha hasad" means when actively envying','Envy is always completely harmless and innocent','Only wishing actual harm is spiritually bad'],
   correct:1},
  {q:'Why is Al-Falaq called one of "Al-Mu\'awwidhatayn"?',
   opts:['Because it is the longest protection surah','It is paired with An-Nas — both seek refuge (a\'udhu) together as a pair','It was revealed on the same night as An-Nas','They share exactly the same number of verses'],
   correct:1},
  {q:'What is the sunnah protection practice using Al-Falaq?',
   opts:['Recite it only once before going to sleep','Blow on hands and wipe body after Fajr and Maghrib — plus before sleeping','Only recite it during times of illness','Recite only when you are feeling afraid or scared'],
   correct:1},
];

/* ────────────────────────────────────────────────────────
   LEVEL 5 — Quiz: Deeper reflection (113:1-5)
   ──────────────────────────────────────────────────────── */
const S5_QUIZ = [
  {q:'Why is seeking refuge in the "Lord of the DAYBREAK" (al-falaq) significant?',
   opts:['Dawn is simply a holy and blessed time','The One who commands light through darkness can protect from all darkness','Dawn prayer is the single most important prayer','Darkness only ever exists at nighttime'],
   correct:1},
  {q:'Is envy (hasad) mentioned in other surahs as well?',
   opts:['No — it appears only in Surah Al-Falaq','Yes — the Quran warns about envy in multiple places (including Surah Yusuf)','Only in Surah An-Nisa and nowhere else','Only in Hadith literature, never in the Quran'],
   correct:1},
  {q:'What does reciting Al-Falaq + An-Nas together protect from?',
   opts:['Only specific physical illnesses','Both spiritual and external harms — evil of creation, night, magic, envy, and waswas','Only from harm caused by other humans','Only when recited precisely in classical Arabic'],
   correct:1},
  {q:'The Prophet ﷺ said Al-Falaq is from a type of surah never revealed before — which type?',
   opts:['Surahs of direct command and obligation','Surahs of protection and refuge — al-mu\'awwidhat','Surahs focusing on pure tawhid only','Surahs that tell the stories of ancient nations'],
   correct:1},
];

function renderSection2Game(){renderQuiz(2,S2_QUIZ);}
function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}
function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}
function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}
function checkSection5(){checkQuiz(5,S5_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#100828':'#080414',acc=st?'#e0a0f0':'#c090e0';
  const g=ctx.createLinearGradient(0,0,W,0);
  g.addColorStop(0,st?'#0c0620':'#06020e');
  g.addColorStop(0.5,st?'#201040':'#140830');
  g.addColorStop(1,'rgba(200,80,150,0.3)');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('أَعُوذُ بِرَبِّ الْفَلَقِ',W/2,H*0.28);ctx.textAlign='left';}
  if(n>=2){const dg=ctx.createLinearGradient(0,H*0.4,0,H);dg.addColorStop(0,'rgba(255,160,60,0.4)');dg.addColorStop(1,'transparent');ctx.fillStyle=dg;ctx.fillRect(0,H*0.4,W,H*0.6);}
  if(n>=3){ctx.fillStyle=acc;ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('رَبِّ الْفَلَقِ',W/2,H*0.45);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=5?'AL-FALAQ COMPLETE! 🌅':`Al-Falaq — ${n}/5 levels`,W/2,14);ctx.textAlign='left';
};

window.setupWBWLevel(WBW_DATA, 10);
