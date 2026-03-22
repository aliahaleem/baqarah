'use strict';
/* Surah Ash-Sharh (94) — The Opening / The Relief */
window.STORAGE_KEY = 'sharhQuestSave';
window.state = window.buildDefaultState(4);

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'💙', title:'Chest Opened',  msg:"SubhanAllah! Allah expanded the Prophet's ﷺ chest — removed his burden — and raised his mention worldwide. Every time someone says 'Allahu Akbar' or recites the shahadah, the Prophet's name is mentioned. SubhanAllah!"},
  3:{xp:80, gems:3, icon:'🌟', title:'Ease Found',    msg:"MashAllah! 'Fa-inna ma\'al-usri yusra — inna ma\'al-usri yusra.' With hardship comes ease — twice! In Arabic grammar, when 'usri' (hardship) is definite and 'yusra' (ease) is indefinite, the ease is different BOTH times. Double ease from one hardship!"},
  4:{xp:90, gems:4, icon:'🕊️', title:'Ash-Sharh Complete', msg:"Allahu Akbar! Ash-Sharh complete! 'Fa-idha faraghta fansab — wa ila rabbika farghab.' When you finish, strive again — and turn to your Lord with yearning. Rest leads to the next striving. Keep going! Ameen 🏆"},
};

window.SURAH_CONFIG = {
  id:'s94', surahName:'Ash-Sharh', surahArabic:'الشرح', totalLevels:4, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','💙','🌟','🕊️'], tileLabels:['Word by Word','Expanded Chest','Ease after Hardship','Keep Striving'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Ash-Sharh — The Opening! Just 8 verses, but overflowing with comfort. Allah tells the Prophet ﷺ — I expanded your chest, removed your burden, and raised your name. And twice: with hardship COMES ease! 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The chest is expanding! 💙`,
    complete:n=>`MashAllah, ${n}! Ash-Sharh complete! "Inna ma\'al-usri yusra." With every difficulty, ease is coming. Trust Allah completely! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'94:1 — أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ', words:[
    {ar:'صَدْرَكَ', tr:'ṣadraka', en:'your chest/heart', freq:5},
    {ar:'لَكَ', tr:'laka', en:'for you', freq:202},
    {ar:'نَشْرَحْ', tr:'nashraḥ', en:'We expanded', freq:1},
    'alam',
  ]},
  {label:'94:2 — وَوَضَعْنَا عَنكَ وِزْرَكَ', words:[
    {ar:'وِزْرَكَ', tr:'wizraka', en:'your burden', freq:3},
    {ar:'عَنكَ', tr:'ʿanka', en:'from you', freq:18},
    {ar:'وَوَضَعْنَا', tr:'wa-waḍaʿnā', en:'and We removed', freq:1},
  ]},
  {label:'94:3 — الَّذِي أَنقَضَ ظَهْرَكَ', words:[
    {ar:'ظَهْرَكَ', tr:'ẓahraka', en:'your back', freq:1},
    {ar:'أَنقَضَ', tr:'anqaḍa', en:'which weighed down', freq:1},
    'alladhi',
  ]},
  {label:'94:4 — وَرَفَعْنَا لَكَ ذِكْرَكَ', words:[
    {ar:'ذِكْرَكَ', tr:'dhikraka', en:'your mention / fame', freq:1},
    {ar:'لَكَ', tr:'laka', en:'for you', freq:202},
    {ar:'وَرَفَعْنَا', tr:'wa-rafaʿnā', en:'and We raised', freq:2},
  ]},
  {label:'94:5 — فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', words:[
    {ar:'يُسْرًا', tr:'yusran', en:'ease', freq:5},
    {ar:'الْعُسْرِ', tr:'al-ʿusr', en:'hardship', freq:3},
    {ar:'مَعَ', tr:'maʿa', en:'with', freq:161},
    {ar:'فَإِنَّ', tr:'fa-inna', en:'for indeed', freq:743},
  ]},
  {label:'94:6 — إِنَّ مَعَ الْعُسْرِ يُسْرًا', words:[
    {ar:'يُسْرًا', tr:'yusran', en:'ease', freq:5},
    {ar:'الْعُسْرِ', tr:'al-ʿusr', en:'hardship', freq:3},
    {ar:'مَعَ', tr:'maʿa', en:'with', freq:161},
    'inna',
  ]},
  {label:'94:7 — فَإِذَا فَرَغْتَ فَانصَبْ', words:[
    {ar:'فَانصَبْ', tr:'fanṣab', en:'then strive [in worship]', freq:1},
    {ar:'فَرَغْتَ', tr:'faraghta', en:'you have finished', freq:1},
    {ar:'فَإِذَا', tr:'fa-idhā', en:'so when', freq:406},
  ]},
  {label:'94:8 — وَإِلَىٰ رَبِّكَ فَارْغَب', words:[
    {ar:'فَارْغَب', tr:'farghab', en:'turn your longing', freq:1},
    'rabbika',
    {ar:'وَإِلَىٰ', tr:'wa-ilā', en:'and to', freq:189},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS = [
  {id:'a1', text:'نَشْرَحْ لَكَ\nصَدْرَكَ',   zone:'z1'},
  {id:'a2', text:'وَوَضَعْنَا عَنكَ\nوِزْرَكَ', zone:'z2'},
  {id:'a3', text:'وَرَفَعْنَا لَكَ\nذِكْرَكَ',  zone:'z3'},
];
const S1_ZONES = [
  {id:'z1', desc:'Expanded your chest — opened for prophethood and guidance (94:1)'},
  {id:'z2', desc:'Removed the burden that weighed down your back (94:2-3)'},
  {id:'z3', desc:'Raised high your mention — linked with Allah\'s in every adhan (94:4)'},
];

const S2_QUIZ = [
  {q:'How many times is "with hardship comes ease" repeated in 94:5-6?',
   opts:['Once','Twice','Three times','Four times'],
   correct:1},
  {q:'What is the key grammatical insight about "usri" and "yusra" in 94:5-6?',
   opts:['"Usri" (hardship) is indefinite both times — different hardships','\'Usri\' is definite (the same hardship), \'yusra\' is indefinite — different eases','They are identical in meaning — just for emphasis','There is no grammatical significance'],
   correct:1},
  {q:'What command is given in 94:7 — "fa-idha faraghta fansab"?',
   opts:['When you finish eating, sleep','When you are free, remember Allah','When you finish one task, strive hard again','When you pray, recite longer surahs'],
   correct:2},
  {q:'What does "fa-ila rabbika farghab" (94:8) command?',
   opts:['Turn away from people','Turn to your Lord with desire and yearning','Fast and pray more than usual','Give more charity to the poor'],
   correct:1},
];

const S3_QUIZ = [
  {q:'What is the meaning of "sharaha sadrak" in 94:1?',
   opts:['We sealed your heart','We expanded/opened your chest','We tested your patience','We revealed to your heart'],
   correct:1},
  {q:'In 94:4, what does "rafa\'na laka dhikrak" mean practically?',
   opts:['We gave you the Quran','We wrote your name in Paradise','Every adhan includes the Prophet\'s ﷺ name alongside Allah\'s','We made you the greatest human'],
   correct:2},
  {q:'This surah was revealed to comfort the Prophet ﷺ — what had happened before?',
   opts:['He was persecuted in battle','Revelation paused (like in Duha) and he felt grief','He lost a beloved family member','His companions were doubting him'],
   correct:1},
  {q:'What is the key lesson of Ash-Sharh for believers?',
   opts:['Hardship eventually ends — ease always follows','Pray longer to avoid difficulty','Give more charity when things are hard','Study the Quran every day'],
   correct:0},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerMatch(2, S1_ITEMS,S1_ZONES);
window.registerQuiz(3, S2_QUIZ);
window.registerQuiz(4, S3_QUIZ);

function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#061820':'#020c10',acc=st?'#40d8c0':'#18c0a0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const g=ctx.createRadialGradient(W/2,H*0.4,5,W/2,H*0.4,60);g.addColorStop(0,'rgba(64,216,192,0.3)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(n>=2){ctx.fillStyle=acc;ctx.font='9px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('مَعَ الْعُسْرِ يُسْرًا',W/2,H*0.45);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('"With hardship comes ease"',W/2,H*0.58);ctx.textAlign='left';}
  if(n>=3){ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('ASH-SHARH COMPLETE! 💙',W/2,14);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Ash-Sharh — ${n}/4 levels`,W/2,14);ctx.textAlign='left';}
};
