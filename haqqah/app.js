'use strict';
/* Surah Al-Haqqah (69) — The Inevitable Reality */
window.STORAGE_KEY = 'haqqahQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
  s5Checked:false,
};

const REWARDS = {
  1:{xp:70, gems:3, icon:'💥', title:'The Reality Unveiled',  msg:"SubhanAllah! Al-Haqqah — The Inevitable! What is it? How stunning that Allah repeats 'wa ma adraaka mal-haqqah' — And what could make you know what the Inevitable is? The repetition itself creates awe and anticipation. The great Day is REAL — and it is coming!"},
  2:{xp:80, gems:3, icon:'🏔️', title:'Nations Destroyed',    msg:"Allahu Akbar! Thamud destroyed by a single mighty blast. Ad destroyed by a furious roaring wind for 7 nights and 8 days. Pharaoh drowned. These weren't stories — they were warnings made manifest. Do we heed the lesson?"},
  3:{xp:80, gems:3, icon:'📯', title:'The Trumpet',           msg:"MashAllah! The trumpet is blown ONCE — and mountains crumble to dust. Then blown AGAIN — and all are gathered. The Day is set in motion by two sounds. SubhanAllah — imagine standing at that gathering, your whole life's record in your hand!"},
  4:{xp:90, gems:3, icon:'📖', title:'Right & Left Hand',     msg:"SubhanAllah! Right hand = rejoicing, easy reckoning. Left hand behind the back = wishing for death, no escape. Which hand will carry your book? Every deed is being written NOW. The right hand is built through righteous deeds today!"},
  5:{xp:110, gems:4, icon:'✨', title:'Al-Haqqah Complete!',  msg:"ALLAHUMMA BARIK! Al-Haqqah complete! The Quran is 'qawlun rasul karim — laa qawlu sha\'ir' — the word of a noble messenger, NOT a poet's word. The whole surah is designed to break denial and awaken the heart. May Allah wake OUR hearts! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s69', surahName:'Al-Haqqah', surahArabic:'الحاقة', totalLevels:5, rewards:REWARDS,
  tileIcons:['💥','🏔️','📯','📖','✨'],
  tileLabels:['What is It?','Nations','The Trumpet','Two Hands','The Truth'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Haqqah — The Inevitable Reality! What destroyed Thamud? Ad? Pharaoh? Two trumpet blasts. Right vs left hand. And the Quran is NOT a poet's word. 5 powerful levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/5 levels done. The Reality is coming — prepare! 💥`,
    complete: name=>`MashAllah, ${name}! Al-Haqqah complete! May Allah give us the book in our right hand! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "Al-Haqqah" mean in Surah 69:1?',
   opts:['The Final Judgment','The Inevitable Reality that must occur','The Day of Rising and Gathering','The Great Announcement of the End'],
   correct:1},
  {q:'What phrase does Allah repeat in 69:2-3 to build awe?',
   opts:['What is the Reality, and why does it come?','The Inevitable — what is the Inevitable?','When the Day arrives and none can stop it?','And you will know it when it approaches?'],
   correct:1},
  {q:'Which nation in 69:4 is said to have denied the Hour?',
   opts:['The people of Nuh and Lut','Thamud and Ad denied the Hour','The Quraysh and their allies','Pharaoh and those before him'],
   correct:1},
  {q:'How was Thamud destroyed according to 69:5?',
   opts:['A devastating flood from the sky','Swallowed by the earth below them','A terrible overwhelming blast or thunderclap','Seven days of fire and burning flames'],
   correct:2},
];

const S2_ITEMS = [
  {id:'n1', text:'⚡ Thamud',       zone:'z1'},
  {id:'n2', text:'🌪️ Ad',            zone:'z2'},
  {id:'n3', text:'💧 People of Nuh', zone:'z3'},
  {id:'n4', text:'👑 Pharaoh',       zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'Destroyed by a single mighty, overwhelming blast (69:5) — they denied the Hour'},
  {id:'z2', desc:'Destroyed by a furious roaring wind for 7 nights and 8 consecutive days (69:6-7)'},
  {id:'z3', desc:'Drowned in the overwhelming flood — carried in the ark (69:11)'},
  {id:'z4', desc:'Sinned with disobedience and transgression — seized with severity (69:9-10)'},
];

const S3_QUIZ = [
  {q:'According to 69:13, how many times is the trumpet blown at the Hour?',
   opts:['Once with a single mighty blast','Three times at different stages','One blast and then a second blast','Many times throughout the Day'],
   correct:2},
  {q:'What happens to the mountains and earth at the first trumpet blast (69:14)?',
   opts:['They shake violently and split open','They are crushed and lifted into the sky','They are smashed to dust in one crumbling blow','They sink slowly into the depths of the sea'],
   correct:2},
  {q:'What does 69:17 say about the angels on the sides?',
   opts:['They descend to assist the believers on that Day','Eight angels carry the Throne of your Lord above them','The angels stand in orderly rows around the gathering','They watch over the record of every soul\'s deeds'],
   correct:1},
  {q:'According to 69:18, what happens on the Day of Gathering?',
   opts:['Nothing will be hidden — you will be fully exposed','Each person will speak their own account freely','The books will be opened and read aloud to all','Every deed will be weighed on the Great Scale'],
   correct:0},
];

const S4_EVENTS_CORRECT = [
  {id:'r1', text:'📖 Right hand receives the book — rejoices: "Here, read my record!"'},
  {id:'r2', text:'😊 Easy reckoning — returning to family in happiness and delight'},
  {id:'r3', text:'💀 Left hand receives book behind their back — wishes for death'},
  {id:'r4', text:'😰 Calls out: "Oh, would that my death had been the end of me!"'},
  {id:'r5', text:'💸 Their wealth and authority availed them nothing on this Day'},
  {id:'r6', text:'🔗 Seized, chained, dragged to the blazing Hellfire'},
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

const S5_QUIZ = [
  {q:'What does Allah say the Quran is NOT in 69:41?',
   opts:['Not the words of a jinn or shaytan','Not the word of a poet — little do you believe!','Not a human creation but divine revelation','Not a story invented for entertainment'],
   correct:1},
  {q:'What does 69:44-46 say would happen if Muhammad ﷺ invented even one word?',
   opts:['The Muslims would leave him immediately','We would have seized him by his right hand','Allah would correct him through revelation','The angels would expose his fabrication'],
   correct:1},
  {q:'What does "wa innahu la-tathkiratun lil-muttaqeen" (69:48) mean?',
   opts:['The Quran is a reminder for the righteous people','This surah is only for the learned scholars','The Day is a warning for those who deny Allah','The angels carry this message to all mankind'],
   correct:0},
  {q:'What does Allah command the Prophet ﷺ at the end of Surah Al-Haqqah (69:52)?',
   opts:['To recite the Quran to all of humanity','To glorify the name of your Lord, the Most Great!','To warn the people of the approaching Day','To establish prayer and give to the poor'],
   correct:1},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}
function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderStoryOrder(4,S4_EVENTS_CORRECT);}
function checkSection4(){checkStoryOrder(4,S4_EVENTS_CORRECT);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}
function checkSection5(){checkQuiz(5,S5_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1e0606':'#0e0202', acc=st?'#f8d040':'#e8c030';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const g=ctx.createRadialGradient(W/2,H/2,10,W/2,H/2,100);g.addColorStop(0,'rgba(255,80,30,0.3)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(n>=2){ctx.fillStyle='#3a1006';ctx.fillRect(0,H*0.65,W,H*0.35);for(let i=0;i<4;i++){ctx.fillStyle=`rgba(255,${80-i*20},0,${0.3+i*0.1})`;ctx.fillRect(W*0.1+i*W*0.2,H*0.4,W*0.15,H*0.28);}}
  if(n>=3){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('📯',W*0.8,H*0.35);ctx.textAlign='left';}
  if(n>=4){ctx.fillStyle='#60a060';ctx.fillRect(W*0.05,H*0.5,30,40);ctx.fillStyle='#e04040';ctx.fillRect(W*0.15,H*0.5,30,40);}
  if(n>=5){ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('AL-HAQQAH COMPLETE 💥',W/2,12);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Al-Haqqah — ${n}/5 levels`,W/2,12);ctx.textAlign='left';}
};
