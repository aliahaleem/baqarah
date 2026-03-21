'use strict';
/* Surah Ad-Duha (93) — The Morning Brightness */
window.STORAGE_KEY = 'duhaQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s2Answers:{}, s2Checked:false, s3Checked:false, s4Answers:{}, s4Checked:false, s5Order:[], s5Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'🌄', title:'Dawn Witness',  msg:"SubhanAllah! This surah was revealed after a pause in revelation. The Prophet ﷺ was sad, wondering if Allah had abandoned him. Then this surah came — 'Your Lord has not forsaken you, nor does He hate you.' What comfort!"},
  3:{xp:80, gems:3, icon:'💛', title:'Blessings Known', msg:"MashAllah! Allah reminds the Prophet of His blessings: orphan, found and sheltered; lost, found and guided; poor, found and enriched. Every difficulty had a divine answer. May we count our blessings!"},
  4:{xp:90, gems:3, icon:'🙏', title:'Duty Fulfilled', msg:"MashAllah! Three duties: do not oppress the orphan, do not drive away the asker, and proclaim the blessings of Allah. Gratitude in action — Ameen!"},
  5:{xp:100, gems:4, icon:'☀️', title:'Ad-Duha Complete', msg:"Allahu Akbar! Ad-Duha complete! When times are dark and you feel alone — remember: 'The Hereafter is better for you than the first!' Allah has not abandoned us. Ever. Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s93', surahName:'Ad-Duha', surahArabic:'الضحى', totalLevels:5, rewards:REWARDS,
  tileIcons:['📖','🌄','💛','🙏','☀️'], tileLabels:['Word by Word','Revelation','Blessings','Duties','Complete'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Welcome to Surah Ad-Duha — The Morning Brightness! Allah directly consoles Prophet Muhammad ﷺ after a painful pause in revelation. 'Your Lord has not forsaken you!' — A surah of divine love. 5 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/5 levels done. The morning light awaits! 🌄`,
    complete:n=>`MashAllah, ${n}! Ad-Duha complete! "Wa lal-akhiratu khayrun laka minal-ula." May the Hereafter always feel closer than this world! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'93:1 — وَالضُّحَىٰ', words:[
    {ar:'وَالضُّحَىٰ', tr:'waḍ-ḍuḥā', en:'by the morning brightness', freq:3},
  ]},
  {label:'93:2 — وَاللَّيْلِ إِذَا سَجَىٰ', words:[
    {ar:'سَجَىٰ', tr:'sajā', en:'covers with darkness', freq:1},
    'idha',
    {ar:'وَاللَّيْلِ', tr:'wal-layl', en:'and the night', freq:72},
  ]},
  {label:'93:3 — مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ', words:[
    {ar:'قَلَىٰ', tr:'qalā', en:'(nor) hated', freq:1},
    {ar:'وَمَا', tr:'wa-mā', en:'and not', freq:500},
    'rabbuka',
    {ar:'وَدَّعَكَ', tr:'waddaʿaka', en:'forsaken you', freq:1},
    {ar:'مَا', tr:'mā', en:'not (negation)', freq:2005},
  ]},
  {label:'93:4 — وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ', words:[
    {ar:'الْأُولَىٰ', tr:'al-ūlā', en:'the first [life]', freq:37},
    {ar:'مِنَ', tr:'min', en:'than', freq:1891},
    {ar:'لَّكَ', tr:'laka', en:'for you', freq:202},
    {ar:'خَيْرٌ', tr:'khayr', en:'better', freq:189},
    {ar:'وَلَلْآخِرَةُ', tr:'wal-ākhirah', en:'and the Hereafter', freq:115},
  ]},
  {label:'93:5 — وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ', words:[
    {ar:'فَتَرْضَىٰ', tr:'fa-tarḍā', en:'and you will be satisfied', freq:1},
    'rabbuka',
    {ar:'يُعْطِيكَ', tr:'yuʿṭīka', en:'will give you', freq:1},
    {ar:'وَلَسَوْفَ', tr:'wa-la-sawfa', en:'and surely', freq:2},
  ]},
  {label:'93:6 — أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ', words:[
    {ar:'فَآوَىٰ', tr:'fa-āwā', en:'and gave shelter', freq:2},
    {ar:'يَتِيمًا', tr:'yatīman', en:'an orphan', freq:22},
    {ar:'يَجِدْكَ', tr:'yajidka', en:'find you', freq:1},
    'alam',
  ]},
  {label:'93:7 — وَوَجَدَكَ ضَالًّا فَهَدَىٰ', words:[
    {ar:'فَهَدَىٰ', tr:'fa-hadā', en:'and guided [you]', freq:4},
    {ar:'ضَالًّا', tr:'ḍāllan', en:'lost / unaware', freq:10},
    {ar:'وَوَجَدَكَ', tr:'wa-wajadaka', en:'and He found you', freq:1},
  ]},
  {label:'93:8 — وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ', words:[
    {ar:'فَأَغْنَىٰ', tr:'fa-aghnā', en:'and made self-sufficient', freq:3},
    {ar:'عَائِلًا', tr:'ʿāʾilan', en:'in need / poor', freq:1},
    {ar:'وَوَجَدَكَ', tr:'wa-wajadaka', en:'and He found you', freq:1},
  ]},
  {label:'93:9 — فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ', words:[
    {ar:'تَقْهَرْ', tr:'taqhar', en:'oppress', freq:1},
    {ar:'فَلَا', tr:'fa-lā', en:'then do not', freq:1069},
    'al-yateem',
    {ar:'فَأَمَّا', tr:'fa-ammā', en:'so as for', freq:18},
  ]},
  {label:'93:10 — وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ', words:[
    {ar:'تَنْهَرْ', tr:'tanhar', en:'repel', freq:1},
    {ar:'فَلَا', tr:'fa-lā', en:'then do not', freq:1069},
    {ar:'السَّائِلَ', tr:'al-sāʾil', en:'the one who asks', freq:5},
    {ar:'وَأَمَّا', tr:'wa-ammā', en:'but as for', freq:18},
  ]},
  {label:'93:11 — وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ', words:[
    {ar:'فَحَدِّثْ', tr:'fa-ḥaddith', en:'then proclaim', freq:1},
    'rabbika',
    {ar:'بِنِعْمَةِ', tr:'bi-niʿmati', en:'about the blessing of', freq:9},
    {ar:'وَأَمَّا', tr:'wa-ammā', en:'but as for', freq:18},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

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
  {id:'b1', text:'يَتِيمًا', zone:'z1'},
  {id:'b2', text:'ضَالًّا', zone:'z2'},
  {id:'b3', text:'عَائِلًا', zone:'z3'},
];
const S2_ZONES = [
  {id:'z1', desc:'An orphan — Allah gave him shelter (93:6)'},
  {id:'z2', desc:'Lost / unaware — Allah guided him (93:7)'},
  {id:'z3', desc:'Poor / in need — Allah enriched him (93:8)'},
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

function renderSection2Game(){renderQuiz(2,S1_QUIZ);}function checkSection2(){checkQuiz(2,S1_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S2_ITEMS,S2_ZONES);}function checkSection3(){checkDragDrop(3,S2_ZONES);}
function renderSection4Game(){renderQuiz(4,S3_QUIZ);}function checkSection4(){checkQuiz(4,S3_QUIZ);}
function renderSection5Game(){renderStoryOrder(5,S4_EVENTS_CORRECT);}function checkSection5(){checkStoryOrder(5,S4_EVENTS_CORRECT);}
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
  ctx.fillText(n>=4?'AD-DUHA COMPLETE ☀️':`Ad-Duha — ${n}/5 levels`,W/2,14);ctx.textAlign='left';
};
