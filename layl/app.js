'use strict';
/* Surah Al-Layl (92) — The Night */
window.STORAGE_KEY = 'laylQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Answers:{}, s3Checked:false,
  s4Order:[], s4Checked:false,
};

const REWARDS = {
  1:{xp:70, gems:3, icon:'🌙', title:'Night Witness',   msg:"SubhanAllah! Three oaths — night, day, creation of male and female — then one question: what is your striving FOR? The night covers everything; what does your heart hide?"},
  2:{xp:80, gems:3, icon:'💝', title:'Giver Recognised', msg:"MashAllah! The generous person gives, fears Allah, and believes in Al-Husna (the best). Allah smooths the way to ease for them. May we always give generously! Ameen."},
  3:{xp:90, gems:3, icon:'💔', title:'Miser Warned',    msg:"SubhanAllah! The miser thinks wealth can protect them forever. But on the Day of Judgement, wealth won't help. 'What will wealth avail him when he perishes?' A warning for us all!"},
  4:{xp:100, gems:4, icon:'🔥', title:'Al-Layl Complete', msg:"Allahu Akbar! Al-Layl complete! Two paths: the path of giving that leads to ease, and the path of stinginess that leads to difficulty. May Allah make us of the givers! Ameen 🏆"},
};

window.SURAH_CONFIG = {
  id:'s92', surahName:'Al-Layl', surahArabic:'الليل', totalLevels:4, rewards:REWARDS,
  tileIcons:['🌙','💝','💔','🔥'],
  tileLabels:['The Oaths','Generous','The Miser','Two Paths'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Welcome to Surah Al-Layl — The Night! Allah swears by the night, the day, and the creation of male and female. Then He describes two opposite types: the generous giver and the stingy miser. Their destinies are completely different. 4 levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. The night awaits — keep striving! 🌙`,
    complete: name=>`MashAllah, ${name}! Al-Layl complete! "Inna alayna lal-huda — wa inna lana lal-akhira wal-ula." Guidance is from Allah. May we follow the path of ease! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What are the three oaths in Surah Al-Layl?',
   opts:['Sun, moon, and stars','Night, day, and creation of male and female','Sky, earth, and mountains','Sea, wind, and rain'],
   correct:1},
  {q:'What does "wa ma khalaqa" in 92:3 refer to?',
   opts:['What Allah created of rivers','The creation of male and female','The mountains and valleys','The angels and jinn'],
   correct:1},
  {q:'What is the question Allah asks after the three oaths (92:4)?',
   opts:['What do you believe in?','What have you eaten?','What are you striving for?','What have you memorised?'],
   correct:2},
  {q:'What does "shatta" (92:4) mean when describing human strivings?',
   opts:['Very fast','Completely united','Scattered and varied','Slow and steady'],
   correct:2},
];

const S2_ITEMS = [
  {id:'g1', text:'Gives charity\nand spends',  zone:'z1'},
  {id:'g2', text:'Has taqwa\nand God-consciousness', zone:'z2'},
  {id:'g3', text:'Believes in\nAl-Husna',      zone:'z3'},
];
const S2_ZONES = [
  {id:'z1', desc:'First quality: "A\'ta" — he gives freely in charity (92:5)'},
  {id:'z2', desc:'Second quality: "Ittaqa" — he has taqwa, consciousness of Allah (92:5)'},
  {id:'z3', desc:'Third quality: "Saddaqa bil-husna" — confirms what is best (92:6)'},
];

const S3_QUIZ = [
  {q:'What does Allah promise for the generous person who has taqwa? (92:7)',
   opts:['Much wealth and children','Ease in this life and next','Yusra — ease and facilitation','Long life and health'],
   correct:2},
  {q:'What does the miser think his wealth will do for him? (92:11)',
   opts:['Build him a palace','Nothing — he never thinks of wealth','Make him immortal / last forever','Buy him good deeds'],
   correct:2},
  {q:'What does Allah promise for the miser who denies Al-Husna? (92:10)',
   opts:['Forgiveness if he repents','He will lose all wealth','Usra — difficulty will be eased for them','Usra — We shall ease his way to difficulty'],
   correct:3},
  {q:'Who is the "self-sufficient" person mentioned in 92:8?',
   opts:['One who has memorised Quran','One who is physically strong','One who considers himself free of need (of Allah)','One who has many children'],
   correct:2},
];

const S4_EVENTS_CORRECT = [
  {id:'p1', text:'🌙 Allah swears by the night, the day, and His creation — human strivings are varied (92:1-4)'},
  {id:'p2', text:'💝 Path 1 — The Generous: gives, fears Allah, believes in Al-Husna → Allah eases their way (92:5-7)'},
  {id:'p3', text:'💔 Path 2 — The Miser: stingy, feels self-sufficient, denies Al-Husna → Allah makes their way difficult (92:8-10)'},
  {id:'p4', text:'⚠️ Warning: "What will his wealth avail him when he falls into the pit?" (92:11)'},
  {id:'p5', text:'📖 Guidance belongs to Allah — both this world and the next are His (92:12-13)'},
  {id:'p6', text:'🔥 The conclusion: the Fire is for those who denied and turned away (92:14-16)'},
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
  const sky=st?'#0c0828':'#04020e', acc=st?'#e8d060':'#c0a820';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){const sx=(i*3917)%W,sy=(i*2713)%(H*0.8);const br=n>=1?0.7:0.3;ctx.fillStyle=`rgba(200,180,255,${br*(0.3+((i*7)%10)*0.05)})`;ctx.fillRect(sx,sy,1+i%2,1+i%2);}
  if(n>=2){ctx.fillStyle=st?'#f0e0ff':'#e8d060';ctx.beginPath();ctx.arc(W*0.8,30,14,0,Math.PI*2);ctx.fill();}
  if(n>=3){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('💝',W*0.3,90);ctx.fillText('💔',W*0.7,90);ctx.textAlign='left';}
  if(n>=4){ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('AL-LAYL COMPLETE! 🌙',W/2,14);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Al-Layl — ${n}/4 levels`,W/2,14);ctx.textAlign='left';}
};
