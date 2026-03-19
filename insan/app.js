'use strict';
/* Surah Al-Insan (76) — The Human / Man */
window.STORAGE_KEY = 'insanQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'💧', title:'Origin of Man',         msg:"SubhanAllah! 'Hal ata \'ala al-insani heenan mina al-dahri lam yakun shay\'an madhkoora' — Was there not a period of time when man was nothing worth mentioning? From nothing to a drop — then tested. We gave him hearing and sight. WE showed him the way. Now it's HIS choice: grateful or ungrateful!"},
  2:{xp:80, gems:3, icon:'🍷', title:'Jannah Described',      msg:"Allahu Akbar! The rewards of the righteous — described in detail: no heat or cold in Jannah. Drinks from cups of Kawthar. The spring called Salsabeel. Silver goblets. And they feed the poor and orphan and captive saying 'we feed you for Allah's sake — we want no reward from you.' SubhanAllah!"},
  3:{xp:85, gems:3, icon:'🌸', title:'Seven Jannah Gifts',    msg:"MashAllah! Seven specific Jannah gifts: green garments of fine silk, silver bracelets, drink given by their Lord, pure and good drinks, their Lord is pleased with them, rewarded for patience, Jannah and silk robes! Seven layers of reward. Each one more beautiful than the last!"},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Insan Complete!',   msg:"ALLAHUMMA BARIK! Al-Insan complete! Man was nothing — then given sight and hearing and a choice. The righteous feed others despite their own hunger. Seven beautiful Jannah rewards. Gradual revelation of Quran. And remember the name of your Lord morning and evening! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s76', surahName:'Al-Insan', surahArabic:'الإنسان', totalLevels:4, rewards:REWARDS,
  tileIcons:['💧','🍷','🌸','✨'],
  tileLabels:['Origin','Jannah','7 Gifts','Complete'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Insan — The Human! Man was nothing — then given hearing, sight, and choice. Beautiful Jannah rewards. The righteous feed others. 4 levels of deep reflection!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Your journey from nothing to greatness continues! 💧`,
    complete: name=>`MashAllah, ${name}! Al-Insan complete! May Allah make us of the righteous who earn Jannah! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does the famous opening of 76:1 ask about man?',
   opts:['Was man not created with strength and purpose?','Was there not a time when man was nothing worth mentioning?','Has man not been given every blessing he could need?','Was man not created with knowledge of all things?'],
   correct:1},
  {q:'From what was man created according to 76:2?',
   opts:['From light mixed with dust of the earth','From a mixed drop — nutfa amshaaj — We tested him','From clay and water as a humble beginning','From the soul breathed in by the angel Jibreel'],
   correct:1},
  {q:'What did Allah give man to find the path according to 76:3?',
   opts:['The Quran and the prophets to guide him','We showed him the way — grateful or ungrateful','Reason and intellect to understand good and evil','A pure heart that seeks the truth by nature'],
   correct:1},
  {q:'What do the righteous say when feeding the poor, orphan, and captive (76:9)?',
   opts:['We feed you because you deserve our kindness','We feed you only for the sake of Allah — no reward needed','We give because our Lord commanded us to give','We serve you because mercy is the way of the believers'],
   correct:1},
];

const S2_ITEMS = [
  {id:'j1', text:'🌬️ No sun\nor cold in Jannah',      zone:'z1'},
  {id:'j2', text:'🍷 Drink from\ncups of Kawthar',     zone:'z2'},
  {id:'j3', text:'💧 Spring called\nSalsabeel',         zone:'z3'},
  {id:'j4', text:'🏺 Goblets of\npure silver',         zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"La yarawna feeha shamsan wa la zamhareeran" — no burning heat or biting cold (76:13) — perfect climate'},
  {id:'z2', desc:'They drink from cups whose mixture is from Kawthar — a special spring (76:5-6, 17)'},
  {id:'z3', desc:'"Salsabeela" — a spring in Jannah, flowing fresh and delicious (76:18) — named for its ease'},
  {id:'z4', desc:'They are served from goblets of silver and cups of crystal, measured precisely (76:15-16)'},
];

const S3_QUIZ = [
  {q:'What does 76:11 say Allah protected the righteous FROM on the Day of Judgment?',
   opts:['From the shame and regret of their sins','Allah saved them from the evil of that Day and gave them radiance','From standing too long in the heat of reckoning','From seeing the punishment given to the wicked'],
   correct:1},
  {q:'What does "wa jaza-hum bima sabaru" (76:12) mean?',
   opts:['And He rewarded them for being patient and steadfast','And He punished them for what they had delayed','And He gave them a trial because of their patience','And He tested them again after their patience'],
   correct:0},
  {q:'What does 76:23 say about the revelation of the Quran?',
   opts:['The Quran was sent all at once on one powerful night','Truly it is We who sent down this Quran in stages upon you','The Quran was preserved first in the heart of the Prophet','The Quran descended through Jibreel over 23 years exactly'],
   correct:1},
  {q:'What does 76:25 command the Prophet ﷺ to do morning and evening?',
   opts:['Feed the poor at both ends of the day','Glorify and remember the name of your Lord','Pray the extra prayers morning and evening','Recite the Quran to the people twice daily'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'i1', text:'💧 Man was nothing — then created from a mixed drop and tested (76:1-2)'},
  {id:'i2', text:'👁️ Allah gave man hearing and sight — then showed him the way (76:2-3)'},
  {id:'i3', text:'🍞 The righteous feed the poor, orphan, and captive for Allah\'s sake alone (76:8-9)'},
  {id:'i4', text:'🌿 Jannah reward: no heat, Salsabeel, goblets, green silk, silver bracelets (76:11-21)'},
  {id:'i5', text:'📖 The Quran was sent gradually — in stages — upon the Prophet ﷺ (76:23)'},
  {id:'i6', text:'🙏 Command: glorify and remember your Lord morning, evening, and prostrate to Him (76:25-26)'},
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
  const sky=st?'#040e04':'#020602', acc=st?'#c0e8f0':'#a0d8e8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// Garden green ground
    ctx.fillStyle=st?'#1a4020':'#102a14';ctx.fillRect(0,H*0.6,W,H*0.4);}
  if(n>=2){// Trees and flowers
    for(let i=0;i<5;i++){ctx.fillStyle='#308040';ctx.fillRect(W*0.05+i*W*0.19,H*0.35,W*0.12,H*0.28);ctx.fillStyle='#50a060';ctx.beginPath();ctx.arc(W*0.11+i*W*0.19,H*0.35,W*0.065,0,Math.PI*2);ctx.fill();}}
  if(n>=3){// Person giving food
    ctx.fillStyle='#c0a080';ctx.beginPath();ctx.arc(W*0.82,H*0.48,10,0,Math.PI*2);ctx.fill();ctx.fillRect(W*0.82-5,H*0.48+10,10,16);
    ctx.fillStyle='#f8d070';ctx.fillRect(W*0.72,H*0.55,18,8);}
  if(n>=4){ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('AL-INSAN COMPLETE 🌸',W/2,12);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Al-Insan — ${n}/4 levels`,W/2,12);ctx.textAlign='left';}
};
