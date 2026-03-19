'use strict';
/* Surah Al-Humazah (104) — The Slanderer */
window.STORAGE_KEY = 'humazahQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'👆', title:'Slanderer Named',  msg:"SubhanAllah! 'Waylul li-kulli humazatin lumazah!' Woe to every backbiter and slanderer! Two different words: humazah = one who criticises with gestures and mocking, lumazah = one who slanders behind the back. Both condemned!"},
  2:{xp:80, gems:3, icon:'💰', title:'Wealth Delusion',  msg:"MashAllah! His wealth makes him think he will live forever! The delusion of wealth: 'Ya\'sabu anna malahu akhladah.' He thinks his money made him IMMORTAL. How many people live as if they'll never die?"},
  3:{xp:90, gems:4, icon:'🔥', title:'Al-Humazah Complete', msg:"Allahu Akbar! Al-Humazah complete! Hutamah — the Crushing Fire! Closed over them, tied in extended columns. May Allah protect us from slander, from the delusion of wealth, and from Hutamah! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s104', surahName:'Al-Humazah', surahArabic:'الهمزة', totalLevels:3, rewards:REWARDS,
  tileIcons:['👆','💰','🔥'], tileLabels:['The Slanderer','Wealth Delusion','Hutamah'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Humazah — The Slanderer! Woe to the backbiter who hoards wealth thinking it will make them live forever. Then the crushing fire — Hutamah! 3 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/3 done. Avoid the path of the slanderer! 👆`,
    complete:n=>`MashAllah, ${n}! Al-Humazah complete! Guard your tongue, give your wealth, and remember mortality! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "waylun" at the start of 104:1 express?',
   opts:['Congratulations and good news','A greeting of peace','Woe and severe warning — a threat of punishment','A mild reminder'],
   correct:2},
  {q:'What is "humazah" (104:1)?',
   opts:['One who gives much charity','One who criticises, mocks, speaks badly (backbiter)','One who forgets to pray','One who is arrogant in wealth'],
   correct:1},
  {q:'What does the slanderer DO with his wealth? (104:2)',
   opts:['Gives it all in charity','Collects and counts it repeatedly','Spends it on the poor','Donates it to build mosques'],
   correct:1},
  {q:'What delusion does wealth create in him? (104:3)',
   opts:['He thinks he is smarter than others','He thinks his wealth made him immortal','He thinks he deserves more','He thinks he will always be healthy'],
   correct:1},
];

const S2_ITEMS = [
  {id:'h1', text:'الْحُطَمَةُ',              zone:'z1'},
  {id:'h2', text:'تَطَّلِعُ عَلَى\nالْأَفْئِدَةِ', zone:'z2'},
  {id:'h3', text:'مُّؤْصَدَةٌ',             zone:'z3'},
  {id:'h4', text:'عَمَدٍ\nمُّمَدَّدَةٍ',    zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'The Crushing Fire — "Hutamah" means something that crushes and destroys (104:4)'},
  {id:'z2', desc:'The fire rises over the hearts — penetrates to what is deepest (104:7)'},
  {id:'z3', desc:'"Mu\'sadah" — closed/shut tight over them — no escape (104:8)'},
  {id:'z4', desc:'"In extended columns" — tied up in them (104:9)'},
];

const S3_QUIZ = [
  {q:'What is the fire of Hutamah described as doing to hearts? (104:7)',
   opts:['Burning the outer body only','Rising over their hearts — penetrating to the core','Filling their mouths with fire','Burning their hands and feet first'],
   correct:1},
  {q:'What does "mu\'sadah" (104:8) describe about Hutamah?',
   opts:['It burns extra hot','It is closed and locked shut over them','It makes a crushing sound','It is higher than the sky'],
   correct:1},
  {q:'What is the key cause leading to Hutamah?',
   opts:['Poverty and need','Slander + hoarding wealth + delusion of immortality','Ignorance of Islam','Missing the prayers'],
   correct:1},
  {q:'What lesson should Muslims take from "ya\'sabu anna malahu akhlada"?',
   opts:['Wealth should be invested wisely','Wealth is a test — it should not make us forget death','Rich Muslims are blessed with extra time','Wealth helps us worship Allah better'],
   correct:1},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#180a04':'#100600',acc=st?'#f8a040':'#e08020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='20px serif';ctx.textAlign='center';ctx.fillText('وَيْلٌ',W/2,H*0.45);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"WOE to every slanderer!"',W/2,H*0.6);ctx.textAlign='left';}
  if(n>=2){const fp=0.4+Math.sin(Date.now()*0.002)*0.2;ctx.fillStyle=`rgba(255,100,30,${fp})`;ctx.fillRect(0,H*0.75,W,H*0.25);}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AL-HUMAZAH COMPLETE! 🔥':`Al-Humazah — ${n}/3 levels`,W/2,14);ctx.textAlign='left';
};
