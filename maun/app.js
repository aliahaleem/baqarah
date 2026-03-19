'use strict';
/* Surah Al-Maun (107) — Small Kindnesses */
window.STORAGE_KEY = 'maunQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every key word of Surah Al-Maun! أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ — Have you seen the one who denies the deen? Now you know what Allah connects: denying deen → harming orphans → hollow prayer → withholding kindness. SubhanAllah!"},

  2:{xp:70, gems:3, icon:'😢', title:'Denier Exposed',  msg:"SubhanAllah! 'Ara\'aytal-ladhi yukadhdhibu bid-din?' Did you see the one who denies the DEEN? He pushes away the orphan harshly and doesn't encourage feeding the poor. Denying the deen shows up in HOW you treat people!"},
  3:{xp:80, gems:3, icon:'🙏', title:'Hypocrisy Warned', msg:"MashAllah! 'Waylul lil-musallin alladhina hum \'an salatihim sahun.' Woe to the musalliin (prayer-performers) — those who are HEEDLESS of their prayer and pray to be seen! Prayer without heart or humility = showing off!"},
  4:{xp:90, gems:4, icon:'🤲', title:'Al-Maun Complete', msg:"Allahu Akbar! Al-Maun complete! The surah ends with 'wa yamna\'una al-ma\'un' — they withhold small kindnesses! If you deny your deen inwardly, it shows in NOT giving even the smallest help. May we be generous and sincere! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s107', surahName:'Al-Maun', surahArabic:'الماعون', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','😢','🙏','🤲'], tileLabels:['Word by Word','The Denier','Hypocrisy','Small Kindness'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Maun — Small Kindnesses! 7 verses that connect RELIGION to SOCIAL action. Denying the orphan and withholding small kindnesses = denying the deen. And hollow prayer without heart = hypocrisy! 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. Be generous! 🤲`,
    complete:n=>`MashAllah, ${n}! Al-Maun complete! Help the orphan, feed the poor, pray sincerely, share small kindnesses! 🏆`,
  },
};


/* ─── LEVEL 1: Word by Word flip-card data (uses shared arabic-words.js) ─── */
const WBW_DATA = [
  {label:'Verses 1-3 — أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ · يَدُعُّ الْيَتِيمَ · لَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ', words:[
    'al-miskeen','ta-am','yahudd',
    {ar:'عَلَىٰ',tr:'ʿalā',en:'upon / to', freq:1390},
    'la','al-yateem','yad-u',
    {ar:'فَذَٰلِكَ',tr:'fadhālika',en:'so that is the one', freq:5},
    'al-deen','yukadhdhibu','a-rayta',
  ]},
  {label:'Verses 4-7 — فَوَيْلٌ لِّلْمُصَلِّينَ · سَاهُونَ · يُرَاءُونَ · يَمْنَعُونَ الْمَاعُونَ', words:[
    'al-maun',
    {ar:'وَيَمْنَعُونَ',tr:'wa-yamnaʿūn',en:'and they withhold', freq:5},
    'yura-un','sahun','salatihim',
    {ar:'عَن',tr:'ʿan',en:'of', freq:330},
    {ar:'هُمْ',tr:'hum',en:'they (are)', freq:300},
    {ar:'الَّذِينَ',tr:'alladhīna',en:'those who', freq:1450},
    'lil-musalin','waylun',
  ]},
];

/* ─── LEVEL 1: Word by Word matching ─── */
const S1_ITEMS = [
  {id:'w1', text:'يُكَذِّبُ',  zone:'z1'},
  {id:'w2', text:'الْيَتِيمَ',  zone:'z2'},
  {id:'w3', text:'الْمِسْكِينِ',  zone:'z3'},
  {id:'w4', text:'سَاهُونَ',  zone:'z4'},
  {id:'w5', text:'يُرَاءُونَ',  zone:'z5'},
  {id:'w6', text:'الْمَاعُونَ',  zone:'z6'}
];
const S1_ZONES = [
  {id:'z1', desc:"Denies/rejects — the root attitude of disconnection from deen (107:1)"},
  {id:'z2', desc:"The orphan — the one he pushes away harshly (107:2)"},
  {id:'z3', desc:"The poor/needy — whose feeding he does not encourage (107:3)"},
  {id:'z4', desc:"Heedless/neglectful — praying while being completely inattentive (107:5)"},
  {id:'z5', desc:"Show off / riya — praying only to be seen by people (107:6)"},
  {id:'z6', desc:"Small kindnesses — basic neighbourly help they withhold (107:7)"}
];

const S2_QUIZ = [
  {q:'Who is the one who denies the deen (religion) according to 107:1?',
   opts:['The one who never prays','The one who pushes away the orphan and doesn\'t encourage feeding the poor','The one who breaks his promises','The one who refuses to fast in Ramadan'],
   correct:1},
  {q:'What does "yadu\'ul-yatim" (107:2) mean?',
   opts:['He protects and shields the orphan','He pushes/shoves the orphan away harshly','He ignores the orphan completely','He makes the orphan work hard'],
   correct:1},
  {q:'What is the person guilty of regarding the poor in 107:3?',
   opts:['He takes charity from the poor','He does not encourage or urge feeding the poor','He tells the poor to find work','He refuses to give zakah'],
   correct:1},
  {q:'Connecting denial of deen to mistreating orphans shows what?',
   opts:['Social action is separate from faith','True iman shows up in how we treat the vulnerable','Only prayer matters for iman','Feeding others is optional sunnah'],
   correct:1},
];

const S3_ITEMS = [
  {id:'m1', text:'يُكَذِّبُ\nبِالدِّينِ',           zone:'z1'},
  {id:'m2', text:'يَدُعُّ\nالْيَتِيمَ',             zone:'z2'},
  {id:'m3', text:'لَا يَحُضُّ عَلَىٰ\nطَعَامِ الْمِسْكِينِ', zone:'z3'},
  {id:'m4', text:'يَمْنَعُونَ\nالْمَاعُونَ',        zone:'z4'},
];
const S3_ZONES = [
  {id:'z1', desc:'He denies the religion/judgement — the root attitude (107:1)'},
  {id:'z2', desc:'He harshly pushes away the orphan (107:2)'},
  {id:'z3', desc:'He does not urge feeding the poor (107:3)'},
  {id:'z4', desc:'They withhold even small kindnesses/utensils from neighbours (107:7)'},
];

const S4_QUIZ = [
  {q:'Who are "al-musallin" warned in 107:4?',
   opts:['Non-Muslims who deny prayer','Those who perform the prayer but are heedless of it','People who pray too quickly','Those who pray only sometimes'],
   correct:1},
  {q:'What is "al-riya\'" mentioned in 107:6?',
   opts:['Excessive praying','Showing off — praying to be seen by people','Rushing through the prayer','Forgetting the words of prayer'],
   correct:1},
  {q:'What is "al-ma\'un" (107:7) that they withhold?',
   opts:['Their zakah and large donations','Small tools, utensils, neighbourly help — everyday small kindnesses','Their mosque contributions','Their children\'s education'],
   correct:1},
  {q:'What is the deep message: what does withholding small kindnesses reveal?',
   opts:['The person is just busy with work','An inward attitude of selfishness disconnected from true deen','Only wealthy people are generous','It is minor and not significant'],
   correct:1},
];


function renderSection1Game(){if(window.renderWBW)renderWBW('wbw-display',WBW_DATA,'wbw-reveal-btn');renderDragDrop(1,S1_ITEMS,S1_ZONES);}
function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#060e20':'#020608',acc=st?'#80b8f0':'#5088c8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('🤲',W/2,H*0.45);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Give even the smallest kindness"',W/2,H*0.6);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-MAUN COMPLETE! 🤲':`Al-Maun — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
