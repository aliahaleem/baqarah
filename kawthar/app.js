'use strict';
/* Surah Al-Kawthar (108) — Abundance */
window.STORAGE_KEY = 'kawtharQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Checked:false, s2Answers:{}, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every word of Surah Al-Kawthar! إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ — Indeed We gave you Al-Kawthar! The shortest surah — 3 verses — but what abundance of meaning! SubhanAllah!"},

  2:{xp:70, gems:3, icon:'🌊', title:'Al-Kawthar Known', msg:"SubhanAllah! Al-Kawthar is a river in Jannah — whiter than milk, sweeter than honey, with cups like stars. And 'Al-Kawthar' also means 'abundant good' — the billions who follow the Prophet ﷺ, the Quran that will last forever!"},
  3:{xp:80, gems:3, icon:'🙏', title:'Gratitude Shown',  msg:"MashAllah! Allah gave the Prophet ﷺ Al-Kawthar — so pray to your Lord and sacrifice. Salah and sacrifice as gratitude for such abundance. When was the last time you made salah as pure thankfulness?"},
  4:{xp:90, gems:4, icon:'✂️', title:'Al-Kawthar Complete', msg:"Allahu Akbar! Al-Kawthar complete! 'Inna shani\'aka huwul-abtar.' Your enemy is the one cut off — not you! The enemies of the Prophet ﷺ who mocked his sons dying are forgotten. Muhammad ﷺ is remembered by 2 billion+ people! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s108', surahName:'Al-Kawthar', surahArabic:'الكوثر', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','🌊','🙏','✂️'], tileLabels:['Word by Word','Al-Kawthar Gift','Pray & Sacrifice','Abtar'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Kawthar — Abundance! The shortest surah in the Quran — 3 verses — but what a message! Allah gave the Prophet ﷺ Al-Kawthar (a river in Jannah + abundant good). His enemies are the ones who are forgotten! 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The river flows! 🌊`,
    complete:n=>`MashAllah, ${n}! Al-Kawthar complete! May we drink from the Prophet's ﷺ river on the Day of Judgement! Ameen! 🏆`,
  },
};


/* ─── LEVEL 1: Word by Word flip-card data (uses shared arabic-words.js) ─── */
const WBW_DATA = [
  {label:'Verse 1 — إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', words:[
    'al-kawthar','a-taynaka','innaa',
  ]},
  {label:'Verse 2 — فَصَلِّ لِرَبِّكَ وَانْحَرْ', words:[
    'wanhar','li-rabbika','fasalli',
  ]},
  {label:'Verse 3 — إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', words:[
    'al-abtar','huwa','shaniak','inna',
  ]},
];

/* ─── LEVEL 1: Word by Word matching ─── */
const S1_ITEMS = [
  {id:'w1', text:'أَعْطَيْنَاكَ',  zone:'z1'},
  {id:'w2', text:'الْكَوْثَرَ',  zone:'z2'},
  {id:'w3', text:'فَصَلِّ',  zone:'z3'},
  {id:'w4', text:'وَانْحَرْ',  zone:'z4'},
  {id:'w5', text:'شَانِئَكَ',  zone:'z5'},
  {id:'w6', text:'الْأَبْتَرُ',  zone:'z6'}
];
const S1_ZONES = [
  {id:'z1', desc:"We have given you — Allah directly addresses and grants the Prophet ﷺ (108:1)"},
  {id:'z2', desc:"Al-Kawthar — the river in Jannah + all abundant good given to him (108:1)"},
  {id:'z3', desc:"So pray — the response to the gift: sincere salah to Allah (108:2)"},
  {id:'z4', desc:"And sacrifice — animal sacrifice (udhiyyah) as additional gratitude (108:2)"},
  {id:'z5', desc:"Your enemy/hater — the one who mocked the Prophet's sons dying (108:3)"},
  {id:'z6', desc:"The one cut off — without legacy, descendants, or memory in history (108:3)"}
];

const S2_QUIZ = [
  {q:'What is Al-Kawthar according to the Prophet ﷺ?',
   opts:['A mountain in Paradise','A river given to the Prophet ﷺ in Jannah','A city in the Hereafter','A title of honour in Paradise'],
   correct:1},
  {q:'What are two broader meanings of "Al-Kawthar"?',
   opts:['River + angels who serve him','River in Jannah + abundant good given to the Prophet ﷺ','Prophecy + wealth in this world','Long life + many companions'],
   correct:1},
  {q:'What command does Allah give the Prophet ﷺ in 108:2 as gratitude for Al-Kawthar?',
   opts:['Fast and give sadaqah','Read the Quran and make du\'a','Pray to your Lord and sacrifice','Travel to seek knowledge'],
   correct:2},
  {q:'What does "abtar" (cut off) mean in 108:3?',
   opts:['Cut off from wealth','Cut off — without legacy, descendants, or memory','Cut off from his homeland','Cut off from his tribe'],
   correct:1},
];

const S3_ITEMS = [
  {id:'k1', text:'إِنَّا أَعْطَيْنَاكَ\nالْكَوْثَرَ',         zone:'z1'},
  {id:'k2', text:'فَصَلِّ لِرَبِّكَ\nوَانْحَرْ',             zone:'z2'},
  {id:'k3', text:'إِنَّ شَانِئَكَ\nهُوَ الْأَبْتَرُ',       zone:'z3'},
];
const S3_ZONES = [
  {id:'z1', desc:'We have given you Al-Kawthar — the gift of abundance (108:1)'},
  {id:'z2', desc:'So pray to your Lord and sacrifice — the response to the gift (108:2)'},
  {id:'z3', desc:'Your enemy is the abtar (cut off) — not you! (108:3)'},
];

const S4_QUIZ = [
  {q:'Who mocked the Prophet ﷺ saying he was "abtar" (cut off)?',
   opts:['Abu Lahab','As ibn Wa\'il al-Sahmi — who said his sons dying made him abtar','Abu Jahl','Walid ibn Mughirah'],
   correct:1},
  {q:'How does history prove 108:3 — "inna shani\'aka huwal-abtar"?',
   opts:['The Prophet\'s enemies outlived him','The Prophet\'s enemies are completely forgotten while he has 2 billion+ followers','His enemies converted to Islam later','His enemies died in battle'],
   correct:1},
  {q:'Surah Al-Kawthar responds to a painful moment for the Prophet ﷺ — what was it?',
   opts:['The death of Khadijah (RA)','His sons dying — enemies mocked saying he had no legacy','The migration to Medina','The prohibition of his companions'],
   correct:1},
  {q:'What does "fasalli" and "wanhar" together suggest?',
   opts:['Fast and give charity','Prayer and animal sacrifice — both as acts of gratitude to Allah','Read Quran and give zakat','Jihad and migration'],
   correct:1},
];


function renderSection1Game(){if(window.renderWBW)renderWBW('wbw-display',WBW_DATA,'wbw-reveal-btn');renderDragDrop(1,S1_ITEMS,S1_ZONES);}
function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#040c18':'#020408',acc=st?'#90d0f8':'#60a0d8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// river
    const rg=ctx.createLinearGradient(0,H*0.55,0,H);rg.addColorStop(0,acc);rg.addColorStop(1,'rgba(30,80,180,0.3)');ctx.fillStyle=rg;ctx.fillRect(0,H*0.55,W,H*0.45);
    ctx.fillStyle='rgba(255,255,255,0.3)';for(let i=0;i<8;i++)ctx.fillRect(W*0.08+i*65,(H*0.6+i*4)%H,40,2);}
  if(n>=2){ctx.fillStyle=acc;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('الكَوْثَر',W/2,H*0.45);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-KAWTHAR COMPLETE! 🌊':`Al-Kawthar — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
