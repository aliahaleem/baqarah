'use strict';
/* Surah Az-Zalzalah (99) — The Earthquake */
window.STORAGE_KEY = 'zalzalahQuestSave';
window.state = window.buildDefaultState(4);

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'🌍', title:'Earth Shook',   msg:"SubhanAllah! 'Idha zulzilatil-ardu zilzalaha' — When the earth is shaken with its full shaking! Imagine: the earth brings forth all its hidden burdens. The dead rise. The account begins!"},
  3:{xp:80, gems:3, icon:'📋', title:'Story Ordered',  msg:"MashAllah! You ordered the earthquake correctly — from the shaking to the earth's confession to the viewing of all deeds. The sequence is vivid!"},
  4:{xp:90, gems:4, icon:'⚖️', title:'Az-Zalzalah Complete', msg:"Allahu Akbar! Az-Zalzalah complete! 'Faman ya\'mal mithqala dharratin khayran yarah — wa man ya\'mal mithqala dharratin sharran yarah.' An atom's weight of good, an atom's weight of evil — ALL SEEN. Nothing is lost. Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s99', surahName:'Az-Zalzalah', surahArabic:'الزلزلة', totalLevels:4, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','🌍','📋','⚖️'], tileLabels:['Word by Word','The Earthquake','Story Order','Atom\'s Weight'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Az-Zalzalah — The Earthquake! The earth shakes, reveals its secrets, and then every soul sees every deed — down to an atom's weight. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The earth is shaking! 🌍`,
    complete:n=>`MashAllah, ${n}! Az-Zalzalah complete! An atom's weight of good — you shall see it. May every good atom be counted for us! Ameen! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'99:1 — إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا', words:[
    {ar:'زِلْزَالَهَا', tr:'zilzālahā', en:'its [ultimate] earthquake', freq:2},
    {ar:'الْأَرْضُ', tr:'al-arḍ', en:'the earth', freq:461},
    {ar:'زُلْزِلَتِ', tr:'zulzilat', en:'is shaken', freq:2},
    'idha',
  ]},
  {label:'99:2 — وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا', words:[
    {ar:'أَثْقَالَهَا', tr:'athqālahā', en:'its burdens', freq:1},
    {ar:'الْأَرْضُ', tr:'al-arḍ', en:'the earth', freq:461},
    {ar:'وَأَخْرَجَتِ', tr:'wa-akhrajat', en:'and brings forth', freq:55},
  ]},
  {label:'99:3 — وَقَالَ الْإِنسَانُ مَا لَهَا', words:[
    {ar:'لَهَا', tr:'lahā', en:'is [wrong] with it?', freq:176},
    'ma',
    {ar:'الْإِنسَانُ', tr:'al-insān', en:'mankind', freq:65},
    {ar:'وَقَالَ', tr:'wa-qāla', en:'and says', freq:528},
  ]},
  {label:'99:4 — يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا', words:[
    {ar:'أَخْبَارَهَا', tr:'akhbārahā', en:'its stories / news', freq:3},
    {ar:'تُحَدِّثُ', tr:'tuḥaddithu', en:'it will report', freq:1},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:37},
  ]},
  {label:'99:5 — بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا', words:[
    {ar:'لَهَا', tr:'lahā', en:'to it', freq:176},
    {ar:'أَوْحَىٰ', tr:'awḥā', en:'inspired / revealed', freq:36},
    {ar:'رَبَّكَ', tr:'rabbaka', en:'your Lord', freq:30},
    {ar:'بِأَنَّ', tr:'bi-anna', en:'because', freq:24},
  ]},
  {label:'99:6 — يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِّيُرَوْا أَعْمَالَهُمْ', words:[
    {ar:'أَعْمَالَهُمْ', tr:'aʿmālahum', en:'their deeds', freq:38},
    {ar:'لِّيُرَوْا', tr:'li-yuraw', en:'to be shown', freq:1},
    {ar:'أَشْتَاتًا', tr:'ashtātan', en:'in scattered groups', freq:2},
    {ar:'النَّاسُ', tr:'al-nās', en:'the people', freq:241},
    {ar:'يَصْدُرُ', tr:'yaṣduru', en:'will proceed', freq:2},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:37},
  ]},
  {label:'99:7 — فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ', words:[
    {ar:'يَرَهُ', tr:'yarahu', en:'will see it', freq:3},
    {ar:'خَيْرًا', tr:'khayran', en:'good', freq:189},
    {ar:'ذَرَّةٍ', tr:'dharratin', en:'an atom', freq:3},
    {ar:'مِثْقَالَ', tr:'mithqāla', en:'weight of', freq:7},
    {ar:'يَعْمَلْ', tr:'yaʿmal', en:'does', freq:360},
    {ar:'فَمَن', tr:'fa-man', en:'so whoever', freq:89},
  ]},
  {label:'99:8 — وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ', words:[
    {ar:'يَرَهُ', tr:'yarahu', en:'will see it', freq:3},
    {ar:'شَرًّا', tr:'sharran', en:'evil', freq:30},
    {ar:'ذَرَّةٍ', tr:'dharratin', en:'an atom', freq:3},
    {ar:'مِثْقَالَ', tr:'mithqāla', en:'weight of', freq:7},
    {ar:'يَعْمَلْ', tr:'yaʿmal', en:'does', freq:360},
    {ar:'وَمَن', tr:'wa-man', en:'and whoever', freq:89},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  {q:'What is the Arabic word "zalzalah" translated as?',
   opts:['Thunder and lightning','The violent earthquake','The Day of Judgement','The sounding of the trumpet'],
   correct:1},
  {q:'What does the earth bring forth on that Day? (99:2)',
   opts:['Water and fire','The treasures of the earth','Its heavy burdens (the dead)','Seeds and plants'],
   correct:2},
  {q:'What does the earth do to confess? (99:4)',
   opts:['It shakes and rumbles louder','It speaks and reports its news (its records)','It opens up to show Jahannam','It cracks and floods with water'],
   correct:1},
  {q:'Who inspired the earth to report its news? (99:5)',
   opts:['The angels of recording','The winds of that day','Your Lord inspired it','The Prophet\'s command'],
   correct:2},
];

const S2_EVENTS_CORRECT = [
  {id:'z1', text:'🌍 The earth is shaken with its full, violent shaking (99:1)'},
  {id:'z2', text:'💀 The earth brings forth its heavy burdens — the dead emerge (99:2)'},
  {id:'z3', text:'😮 Man asks: what is happening to the earth? (99:3)'},
  {id:'z4', text:'📣 The earth speaks and reports all that happened upon it (99:4-5)'},
  {id:'z5', text:'👣 People go forth in different groups to be shown their deeds (99:6)'},
  {id:'z6', text:'⚖️ An atom\'s weight of good is seen. An atom\'s weight of evil is seen. (99:7-8)'},
];

const S3_QUIZ = [
  {q:'What is the smallest unit of deeds that will be seen on the Day of Judgement? (99:7-8)',
   opts:['The weight of a mountain','A single prayer','The weight of an atom/mustard seed','A year of good deeds'],
   correct:2},
  {q:'"Faman ya\'mal mithqala dharratin khayran yarah" means:',
   opts:['Whoever does a mountain of good will be rewarded','Whoever does an atom\'s weight of GOOD will see it','Whoever does good will enter Paradise immediately','Whoever is good at heart will be forgiven'],
   correct:1},
  {q:'Does Az-Zalzalah mention both good AND evil deeds of atom\'s weight?',
   opts:['Only good deeds are mentioned','Only evil deeds are recorded','Yes — both good and evil of atom\'s weight are seen','Only major sins are recorded'],
   correct:2},
  {q:'What is the key lesson of Az-Zalzalah for daily life?',
   opts:['Only big good deeds matter','Every single deed — even the smallest — is recorded and will be seen','Pray five times and you will be fine','Focus only on Ramadan worship'],
   correct:1},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerQuiz(2, S1_QUIZ);
window.registerOrder(3, S2_EVENTS_CORRECT);
window.registerQuiz(4, S3_QUIZ);

function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1a0c04':'#100800',acc=st?'#f8a040':'#e08030';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.strokeStyle=`rgba(255,160,60,0.5)`;ctx.lineWidth=2;for(let i=0;i<5;i++){const x=(i*113)%W;ctx.beginPath();ctx.moveTo(x,H*0.3);ctx.lineTo(x+30,H*0.8);ctx.stroke();}}
  if(n>=2){ctx.fillStyle=acc;ctx.font='9px serif';ctx.textAlign='center';ctx.fillText('مِثْقَالَ ذَرَّةٍ',W/2,H*0.55);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Weight of an atom"',W/2,H*0.68);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AZ-ZALZALAH COMPLETE! ⚖️':`Az-Zalzalah — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
