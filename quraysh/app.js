'use strict';
/* Surah Quraysh (106) — The Quraysh */
window.STORAGE_KEY = 'qurayshQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Checked:false, s2Answers:{}, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every word of Surah Quraysh! لِإِيلَافِ قُرَيْشٍ — for the tradition of the Quraysh! Their two journeys, their sacred status, and the blessings of food and safety. Now when you recite it, you understand every word!"},

  2:{xp:70, gems:3, icon:'🕋', title:'Trade Known',   msg:"SubhanAllah! The Quraysh had the honour of two great journeys every year — winter to Yemen and summer to Sham (Syria). This was their livelihood: trade. And it was all made possible by their guardianship of the Kaaba!"},
  3:{xp:80, gems:3, icon:'🙏', title:'Gratitude Commanded', msg:"MashAllah! Allah commands the Quraysh: worship the Lord of THIS HOUSE — the Kaaba — who fed you from hunger and gave you safety from fear. The Kaaba is the centre of their world and must be the centre of their worship!"},
  4:{xp:90, gems:4, icon:'🌟', title:'Quraysh Complete', msg:"Allahu Akbar! Quraysh complete! Allah is saying: I gave you trade routes, safety, food — so WORSHIP ME ALONE. Gratitude expressed in worship! May we always link Allah's blessings to worship! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s106', surahName:'Quraysh', surahArabic:'قريش', totalLevels:4, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','🕋','🙏','🌟'], tileLabels:['Word by Word','Two Journeys','Worship the Lord','Quraysh'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Quraysh! For the Quraysh's tradition of two trade journeys, let them worship the Lord of this House — who fed them and gave them safety. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The caravans travel on! 🕋`,
    complete:n=>`MashAllah, ${n}! Quraysh complete! May we always be grateful for Allah's blessings! 🏆`,
  },
};


/* ─── LEVEL 1: Word by Word flip-card data (uses shared arabic-words.js) ─── */
const WBW_DATA = [
  {label:'Verses 1-2 — لِإِيلَافِ قُرَيْشٍ · إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ', words:[
    'al-sayf',{ar:'وَ',tr:'wa',en:'and'},'al-shitaa','rihlata','ilafihim',
    {ar:'قُرَيْشٍ',tr:'Quraysh',en:'(of) Quraysh'},
    {ar:'لِـ',tr:'li',en:'for the'},
    'ilaf',
  ]},
  {label:'Verse 3 — فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ', words:[
    'al-bayt',{ar:'هَٰذَا',tr:'hādhā',en:'this'},'rabba','fa-yabudo',
  ]},
  {label:'Verse 4 — الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ', words:[
    'khawf','min2','amanahum','ju','min2','at-amahum','alladhi',
  ]},
];

const S2_QUIZ = [
  {q:'What is the "ilaf" of the Quraysh mentioned in 106:1-2?',
   opts:['Their military strength and armor','Their tradition of two annual trade journeys','Their holy status as keepers of Mecca','Their unity as a tribe'],
   correct:1},
  {q:'Where did the Quraysh travel in winter? (106:2)',
   opts:['To Egypt and North Africa','To Persia and Central Asia','To Yemen','To Iraq and Babylon'],
   correct:2},
  {q:'Where did the Quraysh travel in summer? (106:2)',
   opts:['To Sham (Greater Syria)','To Egypt and the Nile','To Persia and its markets','To the mountains of Hijaz'],
   correct:0},
  {q:'What made the Quraysh special enough to have these safe trade routes?',
   opts:['Their military power and strength','Their wealth and gold','Their honoured status as guardians of the Kaaba','Their large numbers and family connections'],
   correct:2},
];

const S3_ITEMS = [
  {id:'q1', text:'فَلْيَعْبُدُوا\nرَبَّ هَٰذَا الْبَيْتِ', zone:'z1'},
  {id:'q2', text:'أَطْعَمَهُم مِّن جُوعٍ',               zone:'z2'},
  {id:'q3', text:'وَآمَنَهُم مِّنْ خَوْفٍ',              zone:'z3'},
];
const S3_ZONES = [
  {id:'z1', desc:'Let them worship the Lord of this House — the Kaaba — so worship Him alone (106:3)'},
  {id:'z2', desc:'He fed them when they were hungry — provided their food and sustenance (106:4)'},
  {id:'z3', desc:'He gave them safety from fear — security to travel and trade (106:4)'},
];

const S4_QUIZ = [
  {q:'Who is "Rabb hadhil-bayt" (106:3)?',
   opts:['The chief of the Quraysh tribe','The guardian of the Kaaba','Allah — Lord of the Kaaba','The angel who guards the house'],
   correct:2},
  {q:'What are the two blessings mentioned in 106:4 for which the Quraysh should worship Allah?',
   opts:['Wealth and children','Food from hunger and safety from fear','Strong armies and fortified cities','Knowledge and wisdom'],
   correct:1},
  {q:'What is the main message of Surah Quraysh?',
   opts:['Trade and business are halal','Travelling in safety is blessed','Gratitude for blessings must be expressed through worship of Allah alone','The Kaaba belongs to all of humanity'],
   correct:2},
  {q:'Why does Allah connect their trade success directly to worshipping Him in this surah?',
   opts:['Because trade is a form of worship','Because all their blessings came from Allah through the Kaaba — worship is the response','Because they needed to pray before trading','Because their trade routes passed through holy lands'],
   correct:1},
];


function renderSection2Game(){renderDragDrop(2,[{id:'j1',text:'رِحْلَةَ\nالشِّتَاءِ',zone:'z1'},{id:'j2',text:'رِحْلَةَ\nالصَّيْفِ',zone:'z2'}],[{id:'z1',desc:'The winter journey — trade to Yemen in the warm south'},{id:'z2',desc:'The summer journey — trade to the north during cooler months'}]);}
function checkSection2(){checkDragDrop(2,[{id:'z1'},{id:'z2'}]);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1e1204':'#120c00',acc=st?'#e8c040':'#d0a830';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=st?'#3a2010':'#281808';ctx.fillRect(0,H*0.65,W,H*0.35);
  if(n>=1){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('🕋',W/2,H*0.45);ctx.textAlign='left';}
  if(n>=2){ctx.fillStyle=acc;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('رَبِّ هَٰذَا الْبَيْتِ',W/2,H*0.7);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'QURAYSH COMPLETE! 🕋':`Quraysh — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};

window.setupWBWLevel(WBW_DATA, 10);
