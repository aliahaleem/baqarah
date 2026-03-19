'use strict';
/* Surah Al-Qadr (97) — The Night of Power */
window.STORAGE_KEY = 'qadrQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'🌃', title:'Night Revealed', msg:"SubhanAllah! The Quran was sent down on one single night — Laylat al-Qadr. Better than a THOUSAND months. The angels and Ruh (Jibreel) descend. Peace reigns until Fajr. One night of worship = 83+ years!"},
  2:{xp:80, gems:3, icon:'👼', title:'Angels Descend',  msg:"MashAllah! The angels and Jibreel (AS) descend with every decree for the coming year. Imagine: on that night, the angels of your provision, health, guidance — all descend. Seek it in the last 10 nights of Ramadan!"},
  3:{xp:90, gems:4, icon:'✨', title:'Al-Qadr Complete', msg:"Allahu Akbar! Al-Qadr complete! 'Salamun hiya hatta matla\'il-fajr.' Peace — PEACE — until the break of dawn. May Allah grant us Laylat al-Qadr every year! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s97', surahName:'Al-Qadr', surahArabic:'القدر', totalLevels:3, rewards:REWARDS,
  tileIcons:['🌃','👼','✨'], tileLabels:['Night of Power','Angels Descend','Peace till Fajr'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Qadr — The Night of Power! Just 5 verses — but what verses! The Quran was revealed on this night. It's better than 1,000 months. Angels descend. Peace until dawn. 3 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/3 done. The night awaits! 🌃`,
    complete:n=>`MashAllah, ${n}! Al-Qadr complete! May Allah grant you Laylat al-Qadr and all its blessings every Ramadan! Ameen! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What was sent down on Laylat al-Qadr? (97:1)',
   opts:['Rain and mercy','The full Quran','The Tawrah of Musa','The decrees of the year'],
   correct:1},
  {q:'How does 97:2 describe the night?',
   opts:['A night of great calamity','A night better than all others','A night of which you have no knowledge','A night that terrifies the disbelievers'],
   correct:2},
  {q:'Laylat al-Qadr is better than how many months? (97:3)',
   opts:['100 months','500 months','1,000 months','All of this world\'s time'],
   correct:2},
  {q:'According to scholars, when is Laylat al-Qadr most likely?',
   opts:['First night of Ramadan','15th of Ramadan','Odd nights of the last 10 of Ramadan','The night before Eid'],
   correct:2},
];

const S2_ITEMS = [
  {id:'q1', text:'Laylat al-Qadr',      zone:'z1'},
  {id:'q2', text:'The Angels and Ruh',  zone:'z2'},
  {id:'q3', text:'Alf shahr',           zone:'z3'},
  {id:'q4', text:'Salamun',             zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'The Night of Power/Decree — when the Quran was first revealed'},
  {id:'z2', desc:'They descend to earth with every decree by permission of their Lord (97:4)'},
  {id:'z3', desc:'One thousand months — the value of this single night of worship (97:3)'},
  {id:'z4', desc:'Peace — the quality of this night until the break of dawn (97:5)'},
];

const S3_QUIZ = [
  {q:'Who descends on Laylat al-Qadr? (97:4)',
   opts:['Prophets and their companions','The angels and Ruh (Jibreel)','The souls of the righteous dead','The messengers of all nations'],
   correct:1},
  {q:'By whose permission do the angels descend on that night? (97:4)',
   opts:['The Prophet\'s ﷺ permission','Permission of the senior angels','Permission of their Lord for every decreed matter','Permission of all the believers'],
   correct:2},
  {q:'What word is used to describe the quality of Laylat al-Qadr in 97:5?',
   opts:['Noor (light)','Rahmah (mercy)','Salamun (peace)','Farah (joy)'],
   correct:2},
  {q:'Until when does the peace last on Laylat al-Qadr? (97:5)',
   opts:['Until midnight','Until the Fajr prayer','Until sunrise','Until the Isha prayer'],
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
  const sky=st?'#080c1e':'#02040c',acc=st?'#c0d0f8':'#90a8d8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  for(let i=0;i<50;i++){const sx=(i*3319)%W,sy=(i*2741)%(H*0.85);const br=n>=1?0.7+((i*7)%10)*0.03:0.2;ctx.fillStyle=`rgba(200,210,255,${br})`;ctx.fillRect(sx,sy,1,1);}
  if(n>=2){ctx.fillStyle=acc;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('👼 👼 👼 👼',W/2,H*0.45);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('Angels descending...',W/2,H*0.58);ctx.textAlign='left';}
  if(n>=3){ctx.fillStyle=acc;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('سَلَامٌ',W/2,H*0.75);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AL-QADR COMPLETE! ✨':`Al-Qadr — ${n}/3 levels`,W/2,14);ctx.textAlign='left';
};
