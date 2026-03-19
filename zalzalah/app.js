'use strict';
/* Surah Az-Zalzalah (99) — The Earthquake */
window.STORAGE_KEY = 'zalzalahQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Order:[], s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'🌍', title:'Earth Shook',   msg:"SubhanAllah! 'Idha zulzilatil-ardu zilzalaha' — When the earth is shaken with its full shaking! Imagine: the earth brings forth all its hidden burdens. The dead rise. The account begins!"},
  2:{xp:80, gems:3, icon:'📋', title:'Story Ordered',  msg:"MashAllah! You ordered the earthquake correctly — from the shaking to the earth's confession to the viewing of all deeds. The sequence is vivid!"},
  3:{xp:90, gems:4, icon:'⚖️', title:'Az-Zalzalah Complete', msg:"Allahu Akbar! Az-Zalzalah complete! 'Faman ya\'mal mithqala dharratin khayran yarah — wa man ya\'mal mithqala dharratin sharran yarah.' An atom's weight of good, an atom's weight of evil — ALL SEEN. Nothing is lost. Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s99', surahName:'Az-Zalzalah', surahArabic:'الزلزلة', totalLevels:3, rewards:REWARDS,
  tileIcons:['🌍','📋','⚖️'], tileLabels:['The Earthquake','Story Order','Atom\'s Weight'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Az-Zalzalah — The Earthquake! The earth shakes, reveals its secrets, and then every soul sees every deed — down to an atom's weight. 3 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/3 done. The earth is shaking! 🌍`,
    complete:n=>`MashAllah, ${n}! Az-Zalzalah complete! An atom's weight of good — you shall see it. May every good atom be counted for us! Ameen! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What is the Arabic word "zalzalah" translated as?',
   opts:['Thunder and lightning','The violent earthquake','The Day of Judgement','The sounding of the trumpet'],
   correct:1},
  {q:'What does the earth bring forth on that Day? (99:2)',
   opts:['Water and fire','The treasures of the earth','Its heavy burdens (the dead)','Seeds and plants'],
   correct:2},
  {q:'What does the earth do to confess? (99:4)',
   opts:['It shakes and rumbles louder','It speaks and reports its news (its records)','It opens up to show Jahannam','It cracks and floods with water'],
   correct:1},
  {q:'Who inspired the earth to report its news? (99:5)',
   opts:['The angels of recording','The winds of that day','Your Lord inspired it','The Prophet\'s command'],
   correct:2},
];

const S2_EVENTS_CORRECT = [
  {id:'z1', text:'🌍 The earth is shaken with its full, violent shaking (99:1)'},
  {id:'z2', text:'💀 The earth brings forth its heavy burdens — the dead emerge (99:2)'},
  {id:'z3', text:'😮 Man asks: what is happening to the earth? (99:3)'},
  {id:'z4', text:'📣 The earth speaks and reports all that happened upon it (99:4-5)'},
  {id:'z5', text:'👣 People go forth in different groups to be shown their deeds (99:6)'},
  {id:'z6', text:'⚖️ An atom\'s weight of good is seen. An atom\'s weight of evil is seen. (99:7-8)'},
];
window._S2_EVENTS = S2_EVENTS_CORRECT;

const S3_QUIZ = [
  {q:'What is the smallest unit of deeds that will be seen on the Day of Judgement? (99:7-8)',
   opts:['The weight of a mountain','A single prayer','The weight of an atom/mustard seed','A year of good deeds'],
   correct:2},
  {q:'"Faman ya\'mal mithqala dharratin khayran yarah" means:',
   opts:['Whoever does a mountain of good will be rewarded','Whoever does an atom\'s weight of GOOD will see it','Whoever does good will enter Paradise immediately','Whoever is good at heart will be forgiven'],
   correct:1},
  {q:'Does Az-Zalzalah mention both good AND evil deeds of atom\'s weight?',
   opts:['Only good deeds are mentioned','Only evil deeds are recorded','Yes — both good and evil of atom\'s weight are seen','Only major sins are recorded'],
   correct:2},
  {q:'What is the key lesson of Az-Zalzalah for daily life?',
   opts:['Only big good deeds matter','Every single deed — even the smallest — is recorded and will be seen','Pray five times and you will be fine','Focus only on Ramadan worship'],
   correct:1},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderStoryOrder(2,S2_EVENTS_CORRECT);}function checkSection2(){checkStoryOrder(2,S2_EVENTS_CORRECT);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1a0c04':'#100800',acc=st?'#f8a040':'#e08030';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.strokeStyle=`rgba(255,160,60,0.5)`;ctx.lineWidth=2;for(let i=0;i<5;i++){const x=(i*113)%W;ctx.beginPath();ctx.moveTo(x,H*0.3);ctx.lineTo(x+30,H*0.8);ctx.stroke();}}
  if(n>=2){ctx.fillStyle=acc;ctx.font='9px serif';ctx.textAlign='center';ctx.fillText('مِثْقَالَ ذَرَّةٍ',W/2,H*0.55);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Weight of an atom"',W/2,H*0.68);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AZ-ZALZALAH COMPLETE! ⚖️':`Az-Zalzalah — ${n}/3 levels`,W/2,14);ctx.textAlign='left';
};
