'use strict';
/* Surah At-Tin (95) — The Fig */
window.STORAGE_KEY = 'tinQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'🫐', title:'Oath Keeper',   msg:"SubhanAllah! Four oaths: the fig (land of Sham/Syria), the olive (Jerusalem), Mount Sinai (where Musa spoke to Allah), and Mecca (the city of security). Four of the most blessed lands on earth — all as witnesses!"},
  2:{xp:80, gems:3, icon:'🧠', title:'Form Knower',   msg:"MashAllah! 'Laqad khalaqnal-insana fi ahsani taqwim' — We created man in the BEST of forms. Best in shape, intellect, potential. Then he can fall to the lowest — unless he believes and does good!"},
  3:{xp:90, gems:4, icon:'⚖️', title:'At-Tin Complete', msg:"Allahu Akbar! At-Tin complete! The question: 'Alaisa Allahu bi-ahkam al-hakimin?' — Is Allah not the most just of judges? YES! May we stand before Him with good deeds! Ameen 🏆"},
};

window.SURAH_CONFIG = {
  id:'s95', surahName:'At-Tin', surahArabic:'التين', totalLevels:3, rewards:REWARDS,
  tileIcons:['🫐','🧠','⚖️'], tileLabels:['Four Oaths','Best Form','Divine Justice'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah At-Tin — The Fig! Four blessed oaths point to one truth: man was created in the finest form — but can fall to the lowest. The exception: those who believe and do good. 3 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/3 done. The fig tree stands tall! 🫐`,
    complete:n=>`MashAllah, ${n}! At-Tin complete! "Laqad khalaqnal-insana fi ahsani taqwim." You were made in the best form — use it well! 🏆`,
  },
};

const S1_ITEMS = [
  {id:'o1', text:'🫐 At-Tin\n(The Fig)',       zone:'z1'},
  {id:'o2', text:'🫒 Az-Zaytun\n(The Olive)',   zone:'z2'},
  {id:'o3', text:'⛰️ Tur Sineen\n(Mt Sinai)',   zone:'z3'},
  {id:'o4', text:'🕋 Al-Balad\n(The City)',     zone:'z4'},
];
const S1_ZONES = [
  {id:'z1', desc:'A blessed land — associated with the prophets of Sham (Greater Syria)'},
  {id:'z2', desc:'Symbol of the blessed land of Jerusalem and the olive of Palestine'},
  {id:'z3', desc:'The mountain where Allah spoke directly to Musa (Moses) (AS)'},
  {id:'z4', desc:'"Al-Balad al-Amin" — the city of security: Mecca al-Mukarramah'},
];

const S2_QUIZ = [
  {q:'What does "fi ahsani taqwim" (95:4) mean?',
   opts:['In the lowest of the low','In the best/finest of forms','In a form made of clay','In a form like the angels'],
   correct:1},
  {q:'To what state can man fall? (95:5)',
   opts:['Asfala safilin — the lowest of the low','Into the sea and drown','Into poverty and hunger','Into weakness and illness'],
   correct:0},
  {q:'Who is EXCLUDED from falling to the lowest? (95:6)',
   opts:['Those who memorise the Quran','Those who believe and do righteous deeds','Those who give the most charity','Those who fast the most'],
   correct:1},
  {q:'What is their reward mentioned in 95:6?',
   opts:['Great wealth in this world','Long life and health','Ajrun ghayru mamnun — unending reward','Being remembered forever on earth'],
   correct:2},
];

const S3_QUIZ = [
  {q:'What is the closing question of At-Tin? (95:8)',
   opts:['"Is Allah not the best of creators?"','"Is Allah not the most just of judges?"','"Is Allah not watching over us?"','"Is Allah not the most merciful?"'],
   correct:1},
  {q:'What is the Arabic phrase for "most just of judges" in 95:8?',
   opts:['Ahsan al-khaliqin','Ahkam al-hakimin','Rahman al-rahimin','Rabb al-alamin'],
   correct:1},
  {q:'Why does Allah use the fig and olive as oaths specifically?',
   opts:['They are the most nutritious foods','They represent the blessed lands of the prophets','They grow only in Arabia','They symbolise wealth and power'],
   correct:1},
  {q:'What is the main message of Surah At-Tin?',
   opts:['Man was created in the best form and must use it by believing and doing good','Man must eat figs and olives daily','Man must travel to the four blessed lands','Man must memorise all of Juz Amma'],
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
  const sky=st?'#0c1804':'#040c02',acc=st?'#c8d040':'#a0c018';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const items=['🫐','🫒','⛰️','🕋'];items.forEach((em,i)=>{ctx.font='22px serif';ctx.textAlign='center';ctx.fillText(em,80+i*130,H*0.45);});}
  if(n>=2){ctx.fillStyle=acc;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('أَحْسَنِ تَقْوِيمٍ',W/2,H*0.7);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Best of Forms"',W/2,H*0.82);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AT-TIN COMPLETE! 🫐':`At-Tin — ${n}/3 levels`,W/2,14);ctx.textAlign='left';
};
