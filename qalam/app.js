'use strict';
/* Surah Al-Qalam (68) — The Pen */
window.STORAGE_KEY = 'qalamQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Order:[], s3Checked:false,
  s4Answers:{}, s4Checked:false,
};

const REWARDS = {
  1:{xp:80, gems:3, icon:'🖊️', title:'Pen & Character',  msg:"SubhanAllah! 'Nun — by the Pen and what they inscribe!' The very first letter is Nun. The very first oath: by the Pen. Knowledge, writing, and record — central to Islam from the very first revelation. And then: you are NOT mad, O Muhammad ﷺ — you are upon an exalted character. Khuluqin 'adheem!"},
  2:{xp:80, gems:3, icon:'🌿', title:'Garden Owners',     msg:"Allahu Akbar! The garden owners swore to harvest without giving to the poor — and they woke to a blackened ruin. Their arrogance cost them everything. 'Inna lil-muttagheen 'inda rabbihim jannat al-na'eem.' For the God-conscious: gardens of paradise. For the arrogant: charred loss."},
  3:{xp:90, gems:3, icon:'⚖️', title:'Character vs Pride', msg:"MashAllah! Allah distinguishes the believer's character from the nine traits of the arrogant disbeliever. Waylun li kulli hummazatin lumazah — woe to every fault-finder! The Prophet ﷺ is on the highest moral ground. May Allah give us that character too!"},
  4:{xp:100, gems:4, icon:'🌊', title:'Qalam Complete!',   msg:"ALLAHUMMA BARIK! Surah Al-Qalam complete! The pen writes your deeds. Your character defines you. The garden owners teach: never withhold from the poor. And the Day is coming when all will be exposed. May Allah write us among those of khuluqin 'adheem!"},
};

window.SURAH_CONFIG = {
  id:'s68', surahName:'Al-Qalam', surahArabic:'القلم', totalLevels:4, rewards:REWARDS,
  tileIcons:['🖊️','🌿','⚖️','📋'],
  tileLabels:['Pen & Character','The Garden','Traits','Reckoning'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Surah Al-Qalam — The Pen. By the Pen! The Prophet ﷺ is upon an exalted character. The garden owners lose everything through arrogance. Character vs pride. 4 levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. The Pen is still writing your story — keep going! 🖊️`,
    complete: name=>`MashAllah, ${name}! Al-Qalam complete! May Allah write you among those of great character! 🏆`,
  },
};

/* Level 1 — Quiz: The Pen & The Prophet's Character (68:1-7) */
const S1_QUIZ = [
  {q:'What does "Nun — wal-qalami wa ma yasturoon" (68:1) mean?',
   opts:['By the ink and the scholars who study','By the Pen and what they inscribe','By the word and what is remembered','By the book and what is written'],
   correct:1},
  {q:'What does Allah declare about the Prophet ﷺ in 68:2?',
   opts:['That he is a scholar among scholars','That he is a king with great power','That he is not, by the grace of his Lord, a madman','That he is the greatest of all creation'],
   correct:2},
  {q:'What does "wa innaka la-ala khuluqin adheem" (68:4) mean?',
   opts:['You are upon an exalted and mighty character','You are upon a path of great learning','You are from a noble and ancient lineage','You are given a unique and special mission'],
   correct:0},
  {q:'According to 68:5-6, who will be questioned about which party is afflicted with madness?',
   opts:['The angels will question the believers','Allah will question the disbelievers','Both the Prophet and his opponents will be judged','The scholars will determine the truth'],
   correct:2},
];

/* Level 2 — Drag & Drop: The Garden Owners (68:17-33) */
const S2_ITEMS = [
  {id:'g1', text:'🌙 They planned\nto harvest at dawn',         zone:'z1'},
  {id:'g2', text:'🤫 Made no exception\nfor the poor (insha)',  zone:'z2'},
  {id:'g3', text:'🔥 Garden became\nblackened ruin',            zone:'z3'},
  {id:'g4', text:'😔 They blamed\neach other at first',         zone:'z4'},
  {id:'g5', text:'🙏 Humbled: maybe\nour Lord will replace it', zone:'z5'},
];
const S2_ZONES = [
  {id:'z1', desc:'Their arrogant plan: "We will harvest secretly while the poor sleep" (68:17-19)'},
  {id:'z2', desc:'Their fatal mistake: they said nothing about making exception for the needy — no "insha Allah" (68:18)'},
  {id:'z3', desc:'Allah\'s response: a calamity from your Lord burned and ruined the garden (68:20-21)'},
  {id:'z4', desc:'Their first reaction: mutual blame — "you misled us!" But they had agreed together (68:30)'},
  {id:'z5', desc:'Their realisation and humble prayer: "Perhaps our Lord will give us better in exchange" (68:32)'},
];

/* Level 3 — Story Order: Events of the Garden (68:17-33) */
const S3_EVENTS_CORRECT = [
  {id:'e1', text:'🌿 A garden owner had a flourishing garden he was grateful to Allah for'},
  {id:'e2', text:'🌙 His heirs decided to harvest secretly at dawn without giving to the poor'},
  {id:'e3', text:'🔕 They said "insha Allah" was not needed — no exception for the needy'},
  {id:'e4', text:'🌅 They went to the garden early calling out to each other in the morning'},
  {id:'e5', text:'🔥 Allah struck the garden with a calamity — it became completely blackened'},
  {id:'e6', text:'😔 They realised their wrongdoing, turned to each other in blame, then humbled themselves'},
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

/* Level 4 — Quiz: Traits of the Arrogant (68:10-16) */
const S4_QUIZ = [
  {q:'In 68:10-13, how many negative character traits does Allah list for the wicked one?',
   opts:['Five traits listed','Seven traits listed','Nine traits listed','Twelve traits listed'],
   correct:2},
  {q:'What does "halaafin maheen" (68:10) mean?',
   opts:['A generous and kind person','A vile and habitual swearer','A brave and courageous leader','A wise and intelligent elder'],
   correct:1},
  {q:'What does "utullin ba\'da dhalika zaneem" (68:13) mean?',
   opts:['Cruel, and on top of that, of dubious origin','Rich and proud of his wealth','Patient but eventually punished','Powerful yet unworthy of respect'],
   correct:0},
  {q:'What threat does Allah make in 68:16 to the one who rejected?',
   opts:['Their wealth will be taken away soon','They will be branded on the nose','Their family will turn against them','Their deeds will be erased forever'],
   correct:1},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderStoryOrder(3,S3_EVENTS_CORRECT);}
function checkSection3(){checkStoryOrder(3,S3_EVENTS_CORRECT);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}
function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#06101e':'#02080e', acc=st?'#f0c030':'#e0b020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Stars
  if(n>=1){for(let i=0;i<30;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.5})`;ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.6,1,0,Math.PI*2);ctx.fill();}}
  // Pen
  if(n>=1){ctx.fillStyle=acc;ctx.fillRect(W*0.1,H*0.15,6,50);ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(W*0.1,H*0.15+50);ctx.lineTo(W*0.1+3,H*0.15+62);ctx.lineTo(W*0.1+6,H*0.15+50);ctx.fill();}
  // Garden
  if(n>=2){ctx.fillStyle=n<3?'#1a4010':'#2a1000';ctx.fillRect(0,H*0.6,W,H*0.4);for(let i=0;i<6;i++){ctx.fillStyle=n<3?'#2a6020':'#402010';ctx.fillRect(W*0.05+i*W*0.16,H*0.4,W*0.1,H*0.25);}}
  // Figure
  if(n>=3){ctx.fillStyle='#c0a080';ctx.beginPath();ctx.arc(W*0.6,H*0.45,12,0,Math.PI*2);ctx.fill();ctx.fillRect(W*0.6-6,H*0.45+12,12,20);}
  // Complete
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-QALAM COMPLETE 🖊️':`Al-Qalam — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};
