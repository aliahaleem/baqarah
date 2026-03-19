'use strict';
/* Surah Ad-Duha (93) — The Morning Brightness */
window.STORAGE_KEY = 'duhaQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false, s4Order:[], s4Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'🌄', title:'Dawn Witness',  msg:"SubhanAllah! This surah was revealed after a pause in revelation. The Prophet ﷺ was sad, wondering if Allah had abandoned him. Then this surah came — 'Your Lord has not forsaken you, nor does He hate you.' What comfort!"},
  2:{xp:80, gems:3, icon:'💛', title:'Blessings Known', msg:"MashAllah! Allah reminds the Prophet of His blessings: orphan, found and sheltered; lost, found and guided; poor, found and enriched. Every difficulty had a divine answer. May we count our blessings!"},
  3:{xp:90, gems:3, icon:'🙏', title:'Duty Fulfilled', msg:"MashAllah! Three duties: do not oppress the orphan, do not drive away the asker, and proclaim the blessings of Allah. Gratitude in action — Ameen!"},
  4:{xp:100, gems:4, icon:'☀️', title:'Ad-Duha Complete', msg:"Allahu Akbar! Ad-Duha complete! When times are dark and you feel alone — remember: 'The Hereafter is better for you than the first!' Allah has not abandoned us. Ever. Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s93', surahName:'Ad-Duha', surahArabic:'الضحى', totalLevels:4, rewards:REWARDS,
  tileIcons:['🌄','💛','🙏','☀️'], tileLabels:['Revelation','Blessings','Duties','Complete'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Welcome to Surah Ad-Duha — The Morning Brightness! Allah directly consoles Prophet Muhammad ﷺ after a painful pause in revelation. 'Your Lord has not forsaken you!' — A surah of divine love. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 levels done. The morning light awaits! 🌄`,
    complete:n=>`MashAllah, ${n}! Ad-Duha complete! "Wa lal-akhiratu khayrun laka minal-ula." May the Hereafter always feel closer than this world! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'Why was Surah Ad-Duha revealed?',
   opts:['Revelation had paused and the Prophet ﷺ was grieving','A new law needed to be announced','A new battle was approaching','The companions asked for comfort'],
   correct:0},
  {q:'What does "al-duha" mean?',
   opts:['The night','The morning brightness','The sunset','The midday heat'],
   correct:1},
  {q:'What does "ma wadda\'aka rabbuka wa ma qala" mean?',
   opts:['Your Lord is pleased with you forever','Your Lord has not forsaken you, nor does He hate you','Your Lord will guide you always','Your Lord commands you to pray more'],
   correct:1},
  {q:'What does 93:4 promise to the Prophet ﷺ?',
   opts:['More wealth and children','The Hereafter is better for you than the first','Safety from all enemies','Guidance for all people'],
   correct:1},
];

const S2_ITEMS = [
  {id:'b1', text:'Found as\nan orphan', zone:'z1'},
  {id:'b2', text:'Found\nwandering', zone:'z2'},
  {id:'b3', text:'Found\nin need', zone:'z3'},
];
const S2_ZONES = [
  {id:'z1', desc:'Allah gave him shelter — lost his father before birth (93:6)'},
  {id:'z2', desc:'Allah gave him guidance — before prophethood (93:7)'},
  {id:'z3', desc:'Allah enriched him — from poverty to contentment (93:8)'},
];

const S3_QUIZ = [
  {q:'What are we commanded NOT to do to the orphan? (93:9)',
   opts:['Not to feed the orphan','Not to oppress or mistreat the orphan','Not to ignore the orphan','Not to take wealth from the orphan'],
   correct:1},
  {q:'What are we commanded NOT to do to the one who asks? (93:10)',
   opts:['Not to give too much','Not to test their sincerity','Not to drive them away or rebuke them','Not to delay giving to them'],
   correct:2},
  {q:'What is the third command in 93:11?',
   opts:['Fast and pray more','Give more in charity','Proclaim and speak about Allah\'s blessings','Study the Quran more deeply'],
   correct:2},
  {q:'What is the Arabic word used for "the blessings of your Lord" in 93:11?',
   opts:['Hidayah (guidance)','Ni\'mah (blessing/favour)','Rahmah (mercy)','Barakah (blessings)'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'e1', text:'😔 Revelation paused — the Prophet ﷺ feared Allah had abandoned him (Context of 93:1-3)'},
  {id:'e2', text:'🌅 Allah swears by the morning brightness and the still night (93:1-2)'},
  {id:'e3', text:'💛 Reassurance: "Your Lord has NOT forsaken you, nor does He hate you!" (93:3)'},
  {id:'e4', text:'🌟 Promise: The Hereafter is better for you than the first life (93:4)'},
  {id:'e5', text:'🤲 Reminder of blessings: orphan sheltered, wanderer guided, needy enriched (93:6-8)'},
  {id:'e6', text:'🙏 Three duties given: protect orphans, welcome askers, proclaim Allah\'s blessings (93:9-11)'},
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderStoryOrder(4,S4_EVENTS_CORRECT);}function checkSection4(){checkStoryOrder(4,S4_EVENTS_CORRECT);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1e0c06':'#120800',acc=st?'#f8b050':'#d0c018';
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,st?'#2a1810':'#1a0e04');g.addColorStop(1,sky);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  if(n>=1){const sg=ctx.createRadialGradient(W*0.7,H*0.3,3,W*0.7,H*0.3,50);sg.addColorStop(0,'rgba(255,200,80,0.9)');sg.addColorStop(1,'transparent');ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);ctx.fillStyle='#ffe080';ctx.beginPath();ctx.arc(W*0.7,H*0.3,14,0,Math.PI*2);ctx.fill();}
  if(n>=2){ctx.fillStyle=st?'#4a2a10':'#361a08';ctx.fillRect(0,H*0.65,W,H*0.35);}
  if(n>=3){ctx.fillStyle=acc;ctx.font='14px serif';ctx.textAlign='center';ctx.fillText('🌄',W*0.3,H*0.5);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AD-DUHA COMPLETE ☀️':`Ad-Duha — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
