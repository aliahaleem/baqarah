'use strict';
/* Surah Ash-Sharh (94) — The Opening / The Relief */
window.STORAGE_KEY = 'sharhQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'💙', title:'Chest Opened',  msg:"SubhanAllah! Allah expanded the Prophet's ﷺ chest — removed his burden — and raised his mention worldwide. Every time someone says 'Allahu Akbar' or recites the shahadah, the Prophet's name is mentioned. SubhanAllah!"},
  2:{xp:80, gems:3, icon:'🌟', title:'Ease Found',    msg:"MashAllah! 'Fa-inna ma\'al-usri yusra — inna ma\'al-usri yusra.' With hardship comes ease — twice! In Arabic grammar, when 'usri' (hardship) is definite and 'yusra' (ease) is indefinite, the ease is different BOTH times. Double ease from one hardship!"},
  3:{xp:90, gems:4, icon:'🕊️', title:'Ash-Sharh Complete', msg:"Allahu Akbar! Ash-Sharh complete! 'Fa-idha faraghta fansab — wa ila rabbika farghab.' When you finish, strive again — and turn to your Lord with yearning. Rest leads to the next striving. Keep going! Ameen 🏆"},
};

window.SURAH_CONFIG = {
  id:'s94', surahName:'Ash-Sharh', surahArabic:'الشرح', totalLevels:3, rewards:REWARDS,
  tileIcons:['💙','🌟','🕊️'], tileLabels:['Expanded Chest','Ease after Hardship','Keep Striving'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Ash-Sharh — The Opening! Just 8 verses, but overflowing with comfort. Allah tells the Prophet ﷺ — I expanded your chest, removed your burden, and raised your name. And twice: with hardship COMES ease! 3 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/3 done. The chest is expanding! 💙`,
    complete:n=>`MashAllah, ${n}! Ash-Sharh complete! "Inna ma\'al-usri yusra." With every difficulty, ease is coming. Trust Allah completely! 🏆`,
  },
};

const S1_ITEMS = [
  {id:'a1', text:'Expanded your\nchest for you', zone:'z1'},
  {id:'a2', text:'Removed the\nburden / weight', zone:'z2'},
  {id:'a3', text:'Raised high\nyour mention', zone:'z3'},
];
const S1_ZONES = [
  {id:'z1', desc:'"Sharaha" — opened, expanded. His chest was opened for prophethood (94:1)'},
  {id:'z2', desc:'"Wizr" — heavy burden that weighed down his back — worries before prophethood (94:2-3)'},
  {id:'z3', desc:'"Rafa\'na laka dhikrak" — his name linked with Allah\'s in every adhan and shahadah (94:4)'},
];

const S2_QUIZ = [
  {q:'How many times is "with hardship comes ease" repeated in 94:5-6?',
   opts:['Once','Twice','Three times','Four times'],
   correct:1},
  {q:'What is the key grammatical insight about "usri" and "yusra" in 94:5-6?',
   opts:['"Usri" (hardship) is indefinite both times — different hardships','\'Usri\' is definite (the same hardship), \'yusra\' is indefinite — different eases','They are identical in meaning — just for emphasis','There is no grammatical significance'],
   correct:1},
  {q:'What command is given in 94:7 — "fa-idha faraghta fansab"?',
   opts:['When you finish eating, sleep','When you are free, remember Allah','When you finish one task, strive hard again','When you pray, recite longer surahs'],
   correct:2},
  {q:'What does "fa-ila rabbika farghab" (94:8) command?',
   opts:['Turn away from people','Turn to your Lord with desire and yearning','Fast and pray more than usual','Give more charity to the poor'],
   correct:1},
];

const S3_QUIZ = [
  {q:'What is the meaning of "sharaha sadrak" in 94:1?',
   opts:['We sealed your heart','We expanded/opened your chest','We tested your patience','We revealed to your heart'],
   correct:1},
  {q:'In 94:4, what does "rafa\'na laka dhikrak" mean practically?',
   opts:['We gave you the Quran','We wrote your name in Paradise','Every adhan includes the Prophet\'s ﷺ name alongside Allah\'s','We made you the greatest human'],
   correct:2},
  {q:'This surah was revealed to comfort the Prophet ﷺ — what had happened before?',
   opts:['He was persecuted in battle','Revelation paused (like in Duha) and he felt grief','He lost a beloved family member','His companions were doubting him'],
   correct:1},
  {q:'What is the key lesson of Ash-Sharh for believers?',
   opts:['Hardship eventually ends — ease always follows','Pray longer to avoid difficulty','Give more charity when things are hard','Study the Quran every day'],
   correct:0},
];

function renderSection1Game(){renderDragDrop(1,S1_ITEMS,S1_ZONES);}function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#061820':'#020c10',acc=st?'#40d8c0':'#18c0a0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const g=ctx.createRadialGradient(W/2,H*0.4,5,W/2,H*0.4,60);g.addColorStop(0,'rgba(64,216,192,0.3)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(n>=2){ctx.fillStyle=acc;ctx.font='9px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('مَعَ الْعُسْرِ يُسْرًا',W/2,H*0.45);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('"With hardship comes ease"',W/2,H*0.58);ctx.textAlign='left';}
  if(n>=3){ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('ASH-SHARH COMPLETE! 💙',W/2,14);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Ash-Sharh — ${n}/3 levels`,W/2,14);ctx.textAlign='left';}
};
