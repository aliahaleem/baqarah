'use strict';
/* Surah Al-Qiyamah (75) — The Resurrection */
window.STORAGE_KEY = 'qiyamahQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
};

const REWARDS = {
  1:{xp:80, gems:3, icon:'💀', title:'No Oath Needed',        msg:"SubhanAllah! Allah swears by TWO things: the Day of Resurrection itself, AND the reproaching soul (nafs lawwama). The soul that blames itself — that conscience we all feel — is itself a witness to the Day! Every time your conscience bothers you, your soul is testifying to accountability!"},
  2:{xp:80, gems:3, icon:'👁️', title:'Full Sight on That Day', msg:"Allahu Akbar! Man says: who can resurrect these bones? Allah says: YES — We will. Fingertip by fingertip. We will collect him bone by bone. And man WANTS to continue sinning, so he asks foolishly. But the reckoning is certain!"},
  3:{xp:85, gems:3, icon:'✨', title:'Allah Preserves Quran',  msg:"MashAllah! 'La tuharrik bihi lisanaka li-ta\'jala bihi' — Don't move your tongue to hasten the revelation! Allah will collect it and recite it. Allah personally guaranteed the Quran's preservation! This is one of the most important verses about Quranic preservation in the entire Book!"},
  4:{xp:100, gems:4, icon:'🌟', title:'Al-Qiyamah Complete!', msg:"ALLAHUMMA BARIK! Al-Qiyamah complete! Two oaths. The reproaching soul. Bones reassembled. The dying moments — faces bright vs faces gloomy. And Allah's personal guarantee to preserve the Quran. May our faces be bright on That Day! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s75', surahName:'Al-Qiyamah', surahArabic:'القيامة', totalLevels:4, rewards:REWARDS,
  tileIcons:['💀','👁️','📖','🌟'],
  tileLabels:['Two Oaths','Resurrection','Quran Preserved','Two Faces'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Qiyamah — The Resurrection! Two powerful oaths. Bones reassembled. Allah preserves the Quran personally. Bright vs dark faces. 4 unforgettable levels!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. The Day is certain — keep going! 💀`,
    complete: name=>`MashAllah, ${name}! Al-Qiyamah complete! May our faces be bright with joy on That Day! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "la uqsimu bi-yawm al-qiyamah" (75:1) do differently from other Quranic oaths?',
   opts:['Allah swears only once without repetition','Allah swears by the Day itself — an oath by the inevitable','Allah says He does NOT swear yet confirms the truth','Allah swears by all creation at once in one oath'],
   correct:2},
  {q:'What is "al-nafs al-lawwama" (75:2) that Allah swears by?',
   opts:['The peaceful soul that rests in certainty','The soul that reproaches and blames itself','The soul that has been fully purified of sin','The soul that is inspired toward righteousness'],
   correct:1},
  {q:'What does man say in 75:3 in his denial?',
   opts:['There is no God to judge our deeds','Does man think We will not collect his bones?','Why would Allah care about such small creatures?','Man thinks his life is too short to be judged'],
   correct:1},
  {q:'According to 75:4, how precisely will Allah resurrect the human body?',
   opts:['In a completely new and different body','Even able to reconstruct the fingertips precisely','As a spirit without any physical body','Exactly as the person appeared at age 40'],
   correct:1},
];

const S2_ITEMS = [
  {id:'v1', text:'⚡ Sight becomes\ndazzled (75:7)',        zone:'z1'},
  {id:'v2', text:'🌑 Moon is\neclipsed (75:8)',             zone:'z2'},
  {id:'v3', text:'☀️ Sun and moon\nbring together (75:9)',  zone:'z3'},
  {id:'v4', text:'🏃 Man asks:\nwhere to flee? (75:10)',    zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'The sight is dazzled and overwhelmed — "basiqa al-basar" (75:7) — a sign of the cosmic upheaval'},
  {id:'z2', desc:'The moon is eclipsed — "khasafa al-qamar" (75:8) — cosmic order collapses on that Day'},
  {id:'z3', desc:'Sun and moon are joined together — total cosmic dissolution, all light merged (75:9)'},
  {id:'z4', desc:'Man cries: "Where is the place of refuge?" (75:10) — but there is no escape anywhere'},
];

const S3_QUIZ = [
  {q:'What does Allah say in 75:17 about collecting the Quran?',
   opts:['We sent the Quran on the Night of Power','Upon Us is its collection and its recitation','The angels memorise every word for protection','Jibreel will teach it to you letter by letter'],
   correct:1},
  {q:'What does 75:22-23 say about bright faces on that Day?',
   opts:['Faces bright — covered in light and peace','Looking at their Lord — faces radiant and luminous','Faces laughing and celebrating their rewards','Faces filled with gratitude and thankfulness'],
   correct:1},
  {q:'What does 75:24-25 say about dark faces?',
   opts:['Faces dark and covered in dust and shadow','They know that a back-breaking calamity is coming','Faces turned away from Allah in shame and regret','Faces trembling with fear of the blazing fire'],
   correct:1},
  {q:'What does 75:36 challenge: "Does man think he will be left unaccounted?"',
   opts:['Man who ignores prayer will not be judged','Did man think he would be left neglected without purpose?','Does man think his deeds go unseen by Allah?','Will man escape death by being remembered fondly?'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'r1', text:'💀 Two oaths: by the Day of Resurrection and the reproaching soul (75:1-2)'},
  {id:'r2', text:'🤷 Man denies: Does Allah think He can reassemble our bones? (75:3)'},
  {id:'r3', text:'👆 Yes — even fingertip by fingertip, Allah will reconstruct perfectly (75:4)'},
  {id:'r4', text:'📖 Allah personally guarantees Quran\'s collection and recitation (75:17)'},
  {id:'r5', text:'✨ Bright faces gazing at their Lord — dark faces fearing calamity (75:22-25)'},
  {id:'r6', text:'🤔 Final question: Does man think he was left with no purpose or accounting? (75:36)'},
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}
function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderStoryOrder(4,S4_EVENTS_CORRECT);}
function checkSection4(){checkStoryOrder(4,S4_EVENTS_CORRECT);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1a1008':'#0e0a04', acc=st?'#f8f0c0':'#f0e8b0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const g=ctx.createRadialGradient(W/2,H/2,5,W/2,H/2,120);g.addColorStop(0,'rgba(248,240,192,0.3)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(n>=2){// Sun/moon eclipse
    ctx.fillStyle='#d0a030';ctx.beginPath();ctx.arc(W*0.3,H*0.3,18,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#303060';ctx.beginPath();ctx.arc(W*0.37,H*0.27,16,0,Math.PI*2);ctx.fill();}
  if(n>=3){// Two faces
    ctx.fillStyle='#f8e090';ctx.beginPath();ctx.arc(W*0.6,H*0.45,14,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#303020';ctx.beginPath();ctx.arc(W*0.76,H*0.45,14,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-QIYAMAH COMPLETE 💀':`Al-Qiyamah — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};
