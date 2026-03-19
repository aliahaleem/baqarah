'use strict';
/* Surah Al-Ikhlas (112) — Sincerity / Pure Monotheism */
window.STORAGE_KEY = 'ikhlasQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,                  // word-by-word matching
  s2Answers:{}, s2Checked:false,    // quiz: Ahad & Samad
  s3Checked:false,                  // drag: four attributes
  s4Answers:{}, s4Checked:false,    // quiz: deeper tawhid
};

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every word of Surah Al-Ikhlas in Arabic! قُلْ هُوَ اللَّهُ أَحَدٌ — Say: He is Allah, One! Now every time you recite it, you understand EXACTLY what you are saying. This is the beauty of learning Arabic word by word!"},
  2:{xp:70, gems:3, icon:'✨', title:'Tawhid Affirmed',
     msg:"SubhanAllah! Al-Ikhlas was revealed in response to: 'Describe your Lord!' Four statements — Allahu Ahad, As-Samad, Lam yalid wa lam yulad, Wa lam yakun lahu kufuwan ahad. FOUR REJECTIONS of every false concept of God. One surah = the theology of the entire Quran!"},
  3:{xp:80, gems:3, icon:'🌟', title:'As-Samad Known',
     msg:"MashAllah! 'Allah al-Samad' — the Everlasting Refuge. 'Al-Samad' means: He who is depended upon by all, who has no needs, who is Self-Sufficient in perfection. Everything needs Him. He needs nothing. SubhanAllah!"},
  4:{xp:100, gems:5, icon:'💎', title:'Al-Ikhlas Complete!',
     msg:"Allahu Akbar! Al-Ikhlas complete! The Prophet ﷺ said reciting it equals one-third of the Quran! It contains: who Allah IS (Ahad, Samad), what He is NOT (father, son), and that nothing equals Him. May we recite it with full understanding! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s112', surahName:'Al-Ikhlas', surahArabic:'الإخلاص', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','✨','🌟','💎'],
  tileLabels:['Word by Word','Ahad & Samad','Attributes','Pure Tawhid'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Ikhlas — Pure Monotheism! Start by learning EVERY ARABIC WORD in this surah, then deepen your understanding across 4 levels. This surah equals 1/3 of the Quran!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The pure truth awaits! ✨`,
    complete:n=>`MashAllah, ${n}! Al-Ikhlas complete! Now recite it with full understanding — every time you say it, it equals 1/3 of the Quran! 🏆`,
  },
};

/* ────────────────────────────────────────────────────────
   LEVEL 1 — Word by Word flip cards (112:1-4)
   ──────────────────────────────────────────────────────── */
const WBW_DATA = [
  {label:'Verse 1 — قُلْ هُوَ اللَّهُ أَحَدٌ', words:[
    'ahad','allahu','huwa','qul',
  ]},
  {label:'Verse 2 — اللَّهُ الصَّمَدُ', words:[
    'al-samad','allahu',
  ]},
  {label:'Verse 3 — لَمْ يَلِدْ وَلَمْ يُولَدْ', words:[
    'yulad','walam','yalid','lam',
  ]},
  {label:'Verse 4 — وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', words:[
    'ahad','kufuwan',
    {ar:'لَّهُ',   tr:'lahu',   en:'for/to Him', freq:860},
    {ar:'يَكُن',  tr:'yakun',  en:'be / exist', freq:200},
    'walam',
  ]},
];

/* ────────────────────────────────────────────────────────
   LEVEL 1 — Word by Word: Match Arabic word to English
   ──────────────────────────────────────────────────────── */
const S1_ITEMS = [
  {id:'w1', text:'قُلْ',       zone:'z1'},
  {id:'w2', text:'أَحَدٌ',     zone:'z2'},
  {id:'w3', text:'الصَّمَدُ', zone:'z3'},
  {id:'w4', text:'يَلِدْ',     zone:'z4'},
  {id:'w5', text:'يُولَدْ',   zone:'z5'},
  {id:'w6', text:'كُفُوًا',   zone:'z6'},
];
const S1_ZONES = [
  {id:'z1', desc:'Say — a command to proclaim clearly and openly (112:1)'},
  {id:'z2', desc:'One — uniquely singular, indivisible, no equal or parallel (112:1)'},
  {id:'z3', desc:'The Eternal Refuge — all creation depends on Him, He needs nothing (112:2)'},
  {id:'z4', desc:'He begets — Allah did NOT do this; no offspring or children (112:3)'},
  {id:'z5', desc:'He was born — Allah was NOT this; He has no origin or beginning (112:3)'},
  {id:'z6', desc:'Equal/comparable — absolutely NOTHING is kufuwan (equivalent) to Allah (112:4)'},
];

/* ────────────────────────────────────────────────────────
   LEVEL 2 — Quiz: Ahad & Samad (112:1-2)
   ──────────────────────────────────────────────────────── */
const S2_QUIZ = [
  {q:'What does "Allahu Ahad" (112:1) mean?',
   opts:['Allah is the First and the Last of all things','Allah is One — unique, singular, indivisible','Allah is the Lord of all creation','Allah is the Almighty and most powerful'],
   correct:1},
  {q:'What does "Allahu al-Samad" (112:2) mean?',
   opts:['Allah is the Most Merciful of all','Allah is the Everlasting Refuge — all depend on Him, He on nothing','Allah is the Ever-Living who never dies','Allah is the All-Knowing of hidden things'],
   correct:1},
  {q:'What does "lam yalid wa lam yulad" (112:3) negate?',
   opts:['It negates Allah having any partners or helpers','It negates Allah having children OR being born from anyone','It negates the angels being daughters of Allah','It negates Allah creating man from clay alone'],
   correct:1},
  {q:'What does "wa lam yakun lahu kufuwan ahad" (112:4) declare?',
   opts:['No one can see Allah in this present world','Nothing and no one is equal or comparable to Allah','Allah has no name or visible form','Allah is hidden from all of His creation'],
   correct:1},
];

/* ────────────────────────────────────────────────────────
   LEVEL 3 — Drag & Drop: Match attribute to meaning
   ──────────────────────────────────────────────────────── */
const S3_ITEMS = [
  {id:'i1', text:'Ahad',      zone:'z1'},
  {id:'i2', text:'As-Samad',  zone:'z2'},
  {id:'i3', text:'Lam yalid', zone:'z3'},
  {id:'i4', text:'Kufuwan',   zone:'z4'},
];
const S3_ZONES = [
  {id:'z1', desc:'One — uniquely singular, no division, no partners, no comparison (112:1)'},
  {id:'z2', desc:'The Refuge depended upon by all — He alone is Self-Sufficient (112:2)'},
  {id:'z3', desc:'He did not beget — refutes idea of children/offspring of Allah (112:3)'},
  {id:'z4', desc:'Equal, comparable — nothing is kufuwan (equivalent) to Allah (112:4)'},
];

/* ────────────────────────────────────────────────────────
   LEVEL 4 — Quiz: Pure Tawhid (deeper)
   ──────────────────────────────────────────────────────── */
const S4_QUIZ = [
  {q:'Why does the Prophet ﷺ say Al-Ikhlas equals 1/3 of the Quran?',
   opts:['Because it contains exactly 1/3 of all Quranic letters','The Quran covers stories, laws, and tawhid — Al-Ikhlas IS the tawhid section','Because it takes 1/3 of the time to recite','Because scholars counted its reward mathematically'],
   correct:1},
  {q:'How does Al-Ikhlas respond to those who believe God had a son?',
   opts:['It says this concept is forgivable if sincere','Verse 3: Lam yalid — He did not beget, refuting it completely','It does not address this issue at all','It says this is simply a misunderstanding only'],
   correct:1},
  {q:'How does Al-Ikhlas respond to those who believe God was born?',
   opts:['Verse 1: Allah is Ahad — One','Verse 3: Wa lam yulad — and He was NOT born','Verse 4: Nothing is equal to Him','Verse 2: He is As-Samad — the Refuge'],
   correct:1},
  {q:'The word "Ikhlas" means sincerity — why is this surah named Al-Ikhlas?',
   opts:['Because it was revealed during the holy month of Ramadan','It purifies tawhid — strips away every false concept until pure oneness remains','Because it requires the most concentration to fully understand','Because it was the first surah traditionally taught to children'],
   correct:1},
];

function renderSection1Game(){if(window.renderWBW)renderWBW('wbw-display',WBW_DATA,'wbw-reveal-btn');renderDragDrop(1,S1_ITEMS,S1_ZONES);}
function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}
function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}
function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}
function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#0c0c1e':'#060608',acc=st?'#e8e0a0':'#c0b060';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  const t=Date.now()*0.001;
  const rg=ctx.createRadialGradient(W/2,H/2,5,W/2,H/2,80+Math.sin(t)*10);
  rg.addColorStop(0,'rgba(230,210,140,0.3)');rg.addColorStop(1,'transparent');
  ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='9px serif';ctx.textAlign='center';ctx.fillText('قُلْ هُوَ اللَّهُ أَحَدٌ',W/2,H*0.38);ctx.textAlign='left';}
  if(n>=2){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('اللَّهُ أَحَدٌ',W/2,H*0.5);ctx.textAlign='left';}
  if(n>=3){ctx.fillStyle=acc;ctx.font='10px serif';ctx.textAlign='center';ctx.fillText('الصَّمَدُ',W/2,H*0.65);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-IKHLAS COMPLETE! 💎':`Al-Ikhlas — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
