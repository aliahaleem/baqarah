'use strict';
/* Surah Al-Adiyat (100) — The Charging Mares */
window.STORAGE_KEY = 'adiyatQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Order:[], s3Checked:false, s4Answers:{}, s4Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'🐎', title:'Horses Witnessed', msg:"SubhanAllah! Five powerful oaths by the charging warhorses: they pant, they strike sparks, they raid at dawn, they kick up dust, they charge into the centre. The energy and loyalty of the horse — used to condemn human ingratitude!"},
  2:{xp:80, gems:3, icon:'💔', title:'Ingratitude Exposed', msg:"MashAllah! 'Inna al-insana li-rabbihi la-kanud.' Truly, man is KANUD — ungrateful, withholding. He WITNESSES his own ingratitude. He is FIERCE in his love of wealth. Yet the graves will be emptied and the secrets revealed!"},
  3:{xp:90, gems:3, icon:'📜', title:'Story Ordered',    msg:"MashAllah! You ordered the structure of Al-Adiyat correctly — from the oath to the condemnation to the Day when all is exposed!"},
  4:{xp:100, gems:4, icon:'⚡', title:'Al-Adiyat Complete', msg:"Allahu Akbar! Al-Adiyat complete! The loyal horse charges for its master despite dangers. The ungrateful human hoards wealth despite all Allah's gifts. May we be grateful horses — loyal to our Creator! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s100', surahName:'Al-Adiyat', surahArabic:'العاديات', totalLevels:4, rewards:REWARDS,
  tileIcons:['🐎','💔','📜','⚡'], tileLabels:['Charging Mares','Ingratitude','Story','Complete'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Adiyat — The Charging Mares! Five dramatic oaths by warhorses panting, sparking, raiding at dawn — all to condemn one thing: human ingratitude towards Allah. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The horses charge on! 🐎`,
    complete:n=>`MashAllah, ${n}! Al-Adiyat complete! "Inna al-insana li-rabbihi la-kanud." May we never be ungrateful to our Lord! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What are "al-adiyat" in 100:1?',
   opts:['Racing camels in a desert caravan','Charging warhorses that pant','Wild animals of the desert','Strong winds of a storm'],
   correct:1},
  {q:'What do the horses do in 100:2 when they strike with their hooves?',
   opts:['Make a thunderous sound','Produce sparks from the flint','Create clouds of smoke','Dig into the earth'],
   correct:1},
  {q:'When do the horses raid in 100:3?',
   opts:['At high noon in the heat','At midnight in darkness','In the morning — at dawn (subhan)','In the afternoon heat'],
   correct:2},
  {q:'What does "fawasatna bihi jam\'a" (100:5) describe?',
   opts:['Dispersing into the desert','Charging into the centre/midst of the enemy','Stopping at the boundary','Running away in fear'],
   correct:1},
];

const S2_ITEMS = [
  {id:'a1', text:'كَنُودٌ',                    zone:'z1'},
  {id:'a2', text:'شَهِيدٌ',                    zone:'z2'},
  {id:'a3', text:'شَدِيدٌ لِّلْخَيْرِ',        zone:'z3'},
  {id:'a4', text:'تُثِيرُ الْقُبُورَ',         zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'Human is ungrateful to his Lord — the central accusation (100:6)'},
  {id:'z2', desc:'He himself is witness to his own ingratitude (100:7)'},
  {id:'z3', desc:'His love of wealth is fierce and intense (100:8)'},
  {id:'z4', desc:'On the Day when what is in the graves is scattered out (100:9)'},
];

const S3_EVENTS_CORRECT = [
  {id:'e1', text:'🐎 Five oaths by warhorses: panting, sparking, raiding at dawn (100:1-5)'},
  {id:'e2', text:'😤 Conclusion: Man is KANUD — deeply ungrateful to his Lord (100:6)'},
  {id:'e3', text:'👁️ He is himself a witness to his own ingratitude (100:7)'},
  {id:'e4', text:'💰 He is fierce/intense in his love of wealth (100:8)'},
  {id:'e5', text:'💀 Does he not know? When graves are emptied and secrets revealed! (100:9-10)'},
  {id:'e6', text:'🌟 On that Day, their Lord is All-Aware of them and their deeds (100:11)'},
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

const S4_QUIZ = [
  {q:'What contrast does Surah Al-Adiyat make?',
   opts:['Between wealth and poverty','Between loyal horses and ungrateful man','Between angels and humans','Between Paradise and Hellfire'],
   correct:1},
  {q:'What does "lil-khayr la-shadid" (100:8) mean?',
   opts:['His knowledge of good is fierce','His love of wealth/good is intense and fierce','His strength in battle is great','His desire for Paradise is strong'],
   correct:1},
  {q:'What happens when "buthira ma fil-qubur" (100:9)?',
   opts:['People pray at the graves','The graves are dug up and hidden secrets exposed','The angels guard the graves','The graves become gardens'],
   correct:1},
  {q:'What is "ma fil-sudur" (100:10)?',
   opts:['What is in the mountains','What is in the sea','What is hidden in the chests (hearts)','What is written in the books'],
   correct:2},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderStoryOrder(3,S3_EVENTS_CORRECT);}function checkSection3(){checkStoryOrder(3,S3_EVENTS_CORRECT);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#180c02':'#0e0800',acc=st?'#e8c040':'#d0b030';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=st?'#3a1a08':'#2a1004';ctx.fillRect(0,H*0.65,W,H*0.35);
  if(n>=1){// charging horse
    const hx=((n>=2?200:100)+50)%W;
    ctx.fillStyle='#c87828';ctx.fillRect(hx,H*0.45,45,22);ctx.fillRect(hx+32,H*0.35,10,16);ctx.fillRect(hx+30,H*0.3,14,10);
    ctx.fillRect(hx+5,H*0.65,7,14);ctx.fillRect(hx+18,H*0.65,7,14);ctx.fillRect(hx+28,H*0.65,7,14);ctx.fillRect(hx+38,H*0.65,7,14);}
  if(n>=3){ctx.fillStyle=acc;ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('كَنُود',W/2,H*0.3);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-ADIYAT COMPLETE! 🐎':`Al-Adiyat — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
