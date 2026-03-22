'use strict';
/* Surah Al-Alaq (96) — The Clot / Read! */
window.STORAGE_KEY = 'alaqQuestSave';
window.state = window.buildDefaultState(6);

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'📖', title:'First Word',    msg:"SubhanAllah! The very first word revealed to any prophet — 'IQRA!' Read! Not 'pray', not 'fast' — READ. In the name of your Lord who CREATED. Knowledge is from Allah. The pen taught what man did not know."},
  3:{xp:80, gems:3, icon:'🩸', title:'Origin Known',  msg:"MashAllah! 'Khalaqal-insana min alaq' — man was created from a clinging blood clot. From something so humble — such an arrogant creature! Yet Allah honoured him with the pen, with knowledge."},
  4:{xp:85, gems:3, icon:'⚠️', title:'Tyrant Warned', msg:"SubhanAllah! Man transgresses when he sees himself as self-sufficient. Abu Jahl threatened to crush the Prophet ﷺ. Allah warned: 'Kalla! Truly, if he does not stop — We will drag him by the forelock!'"},
  5:{xp:90, gems:3, icon:'📜', title:'Story Ordered',  msg:"MashAllah! You ordered the story of the first revelation correctly. From the cave of Hira to the arrogance of Abu Jahl to the command: bow down and draw near!"},
  6:{xp:100, gems:4, icon:'🌟', title:'Al-Alaq Complete', msg:"Allahu Akbar! Al-Alaq complete! 'Kalla la tuti\'hu wasjud waqtarib.' Do not obey him — PROSTRATE and draw near! The surah ends with sujud — the closest we get to Allah. Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s96', surahName:'Al-Alaq', surahArabic:'العلق', totalLevels:6, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','📖','🩸','⚠️','📜','🌟'], tileLabels:['Word by Word','Read!','The Clot','Transgression','Story','Draw Near'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Alaq — The Clot! The FIRST revealed surah. 'Iqra!' — Read! Then it jumps to arrogant man who thinks he's self-sufficient. Then a direct confrontation with Abu Jahl. Ends with: prostrate and draw near to Allah. 6 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/6 done. Keep reading — Iqra! 📖`,
    complete:n=>`MashAllah, ${n}! Al-Alaq complete! From the first "Iqra!" to "Wasjud waqtarib." May we always be of those who draw near! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'96:1 — اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', words:[
    {ar:'خَلَقَ', tr:'khalaqa', en:'created', freq:29},
    'alladhi',
    'rabbika',
    {ar:'بِاسْمِ', tr:'bismi', en:'in the name of', freq:22},
    {ar:'اقْرَأْ', tr:'iqraʾ', en:'Read! / Recite!', freq:3},
  ]},
  {label:'96:2 — خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ', words:[
    {ar:'عَلَقٍ', tr:'ʿalaq', en:'a clinging clot', freq:2},
    'min',
    {ar:'الْإِنسَانَ', tr:'al-insān', en:'mankind', freq:65},
    {ar:'خَلَقَ', tr:'khalaqa', en:'He created', freq:29},
  ]},
  {label:'96:3 — اقْرَأْ وَرَبُّكَ الْأَكْرَمُ', words:[
    {ar:'الْأَكْرَمُ', tr:'al-akram', en:'the Most Generous', freq:1},
    'rabbuka',
    {ar:'اقْرَأْ', tr:'iqraʾ', en:'Read! / Recite!', freq:3},
  ]},
  {label:'96:4 — الَّذِي عَلَّمَ بِالْقَلَمِ', words:[
    {ar:'بِالْقَلَمِ', tr:'bil-qalam', en:'by the pen', freq:2},
    {ar:'عَلَّمَ', tr:'ʿallama', en:'taught', freq:20},
    'alladhi',
  ]},
  {label:'96:5 — عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ', words:[
    {ar:'يَعْلَمْ', tr:'yaʿlam', en:'he knew', freq:382},
    'lam',
    'ma',
    {ar:'الْإِنسَانَ', tr:'al-insān', en:'mankind', freq:65},
    {ar:'عَلَّمَ', tr:'ʿallama', en:'taught', freq:20},
  ]},
  {label:'96:6 — كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ', words:[
    {ar:'لَيَطْغَىٰ', tr:'la-yaṭghā', en:'surely transgresses', freq:9},
    {ar:'الْإِنسَانَ', tr:'al-insān', en:'man', freq:65},
    'inna',
    'kalla',
  ]},
  {label:'96:7 — أَن رَّآهُ اسْتَغْنَىٰ', words:[
    {ar:'اسْتَغْنَىٰ', tr:'istaghnā', en:'sees himself rich', freq:2},
    {ar:'رَّآهُ', tr:'raʾāhu', en:'he sees himself', freq:9},
    {ar:'أَن', tr:'an', en:'because', freq:680},
  ]},
  {label:'96:8 — إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ', words:[
    {ar:'الرُّجْعَىٰ', tr:'al-rujʿā', en:'is the return', freq:1},
    'rabbika',
    'ila',
    'inna',
  ]},
  {label:'96:9 — أَرَأَيْتَ الَّذِي يَنْهَىٰ', words:[
    {ar:'يَنْهَىٰ', tr:'yanhā', en:'forbids', freq:8},
    'alladhi',
    {ar:'أَرَأَيْتَ', tr:'araʾayta', en:'have you seen', freq:9},
  ]},
  {label:'96:10 — عَبْدًا إِذَا صَلَّىٰ', words:[
    {ar:'صَلَّىٰ', tr:'ṣallā', en:'prays', freq:83},
    'idha',
    {ar:'عَبْدًا', tr:'ʿabdan', en:'a servant', freq:275},
  ]},
  {label:'96:11 — أَرَأَيْتَ إِن كَانَ عَلَى الْهُدَىٰ', words:[
    {ar:'الْهُدَىٰ', tr:'al-hudā', en:'the guidance', freq:80},
    {ar:'عَلَى', tr:'ʿalā', en:'upon', freq:471},
    {ar:'كَانَ', tr:'kāna', en:'he was', freq:1358},
    {ar:'إِن', tr:'in', en:'if', freq:743},
    {ar:'أَرَأَيْتَ', tr:'araʾayta', en:'have you seen', freq:9},
  ]},
  {label:'96:12 — أَوْ أَمَرَ بِالتَّقْوَىٰ', words:[
    {ar:'بِالتَّقْوَىٰ', tr:'bil-taqwā', en:'righteousness', freq:15},
    {ar:'أَمَرَ', tr:'amara', en:'commanded', freq:40},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
  ]},
  {label:'96:13 — أَرَأَيْتَ إِن كَذَّبَ وَتَوَلَّىٰ', words:[
    {ar:'وَتَوَلَّىٰ', tr:'wa-tawallā', en:'and turned away', freq:30},
    {ar:'كَذَّبَ', tr:'kadhdhaba', en:'denied', freq:25},
    {ar:'إِن', tr:'in', en:'if', freq:743},
    {ar:'أَرَأَيْتَ', tr:'araʾayta', en:'have you seen', freq:9},
  ]},
  {label:'96:14 — أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ', words:[
    {ar:'يَرَىٰ', tr:'yarā', en:'sees', freq:328},
    {ar:'اللَّهَ', tr:'Allāha', en:'Allah', freq:2699},
    {ar:'بِأَنَّ', tr:'bi-anna', en:'that', freq:100},
    {ar:'يَعْلَم', tr:'yaʿlam', en:'does he know', freq:382},
    'alam',
  ]},
  {label:'96:15 — كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ', words:[
    {ar:'بِالنَّاصِيَةِ', tr:'bil-nāṣiya', en:'by the forelock', freq:1},
    {ar:'لَنَسْفَعًا', tr:'la-nasfaʿan', en:'We will drag', freq:1},
    {ar:'يَنتَهِ', tr:'yantahi', en:'he desists', freq:2},
    {ar:'لَّمْ', tr:'lam', en:'does not', freq:234},
    {ar:'لَئِن', tr:'laʾin', en:'surely if', freq:26},
    'kalla',
  ]},
  {label:'96:16 — نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ', words:[
    {ar:'خَاطِئَةٍ', tr:'khāṭiʾa', en:'sinful', freq:1},
    {ar:'كَاذِبَةٍ', tr:'kādhibatin', en:'lying', freq:2},
    {ar:'نَاصِيَةٍ', tr:'nāṣiyatin', en:'a forelock', freq:1},
  ]},
  {label:'96:17 — فَلْيَدْعُ نَادِيَهُ', words:[
    {ar:'نَادِيَهُ', tr:'nādiyahu', en:'his associates', freq:1},
    {ar:'فَلْيَدْعُ', tr:'fal-yadʿu', en:'then let him call', freq:7},
  ]},
  {label:'96:18 — سَنَدْعُ الزَّبَانِيَةَ', words:[
    {ar:'الزَّبَانِيَةَ', tr:'al-zabāniya', en:'the angels of Hell', freq:1},
    {ar:'سَنَدْعُ', tr:'sanadʿu', en:'We will call', freq:1},
  ]},
  {label:'96:19 — كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِبْ', words:[
    {ar:'وَاقْتَرِبْ', tr:'waqtarib', en:'and draw near', freq:2},
    {ar:'وَاسْجُدْ', tr:'wasjud', en:'and prostrate', freq:34},
    {ar:'تُطِعْهُ', tr:'tuṭiʿhu', en:'obey him', freq:10},
    'la',
    'kalla',
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  {q:'What was the first word revealed to Prophet Muhammad ﷺ?',
   opts:['Salli (Pray)','Iqra (Read)','Qul (Say)','Bismi (In the name)'],
   correct:1},
  {q:'In whose name are we commanded to read? (96:1)',
   opts:['In the name of the angels','In the name of the Prophet','In the name of your Lord who created','In the name of truth and justice'],
   correct:2},
  {q:'What did Allah teach man through the pen? (96:4-5)',
   opts:['How to fight and be brave','What he did not know','How to worship and pray','How to memorise the Quran'],
   correct:1},
  {q:'What was the Prophet ﷺ doing when the first revelation came?',
   opts:['Praying at the Kaaba','Resting at home in Mecca','In seclusion/contemplation in the cave of Hira','Travelling on a trade journey'],
   correct:2},
];

const S2_ITEMS = [
  {id:'c1', text:'عَلَقٍ',                zone:'z1'},
  {id:'c2', text:'الْقَلَمُ',             zone:'z2'},
  {id:'c3', text:'اسْتَغْنَىٰ',          zone:'z3'},
  {id:'c4', text:'النَّاصِيَةِ',         zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'What man was created from — a humble biological origin (96:2)'},
  {id:'z2', desc:'The instrument of knowledge — Allah taught man through it (96:4)'},
  {id:'z3', desc:'Feeling free of need from Allah — the root cause of transgression (96:7)'},
  {id:'z4', desc:'The "lying, sinful" forelock — by which the transgressor will be dragged (96:15-16)'},
];

const S3_QUIZ = [
  {q:'Why does man transgress according to 96:6-7?',
   opts:['Because he is hungry and poor','Because he sees himself as self-sufficient','Because he has enemies around him','Because he does not know better'],
   correct:1},
  {q:'What did Abu Jahl threaten to do to the Prophet ﷺ?',
   opts:['Exile him from Mecca','Kill his companions','Step on his neck while he prays','Destroy the Kaaba'],
   correct:2},
  {q:'What does Allah call the forelock of the transgressor in 96:16?',
   opts:['Noble and blessed','Honoured and respected','Lying and sinful','Lost and wandering'],
   correct:2},
  {q:'What command does Allah give the Prophet ﷺ at the end? (96:19)',
   opts:['Leave Mecca immediately','Fear him not — prostrate and draw near','Fight back with strength','Ask for help from the angels'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'e1', text:'🏔️ Prophet ﷺ retreats to cave of Hira for contemplation and reflection'},
  {id:'e2', text:'📖 Angel Jibreel (AS) appears: "Iqra!" — the first revelation begins (96:1)'},
  {id:'e3', text:'😨 Prophet ﷺ rushes home trembling — Khadijah (RA) consoles him'},
  {id:'e4', text:'😤 Abu Jahl threatens to step on the Prophet\'s neck while he prays (96:9-10)'},
  {id:'e5', text:'⚡ Allah warns: if he does not stop, We will seize his lying, sinful forelock (96:15-16)'},
  {id:'e6', text:'🕌 Final command: "Kalla la tuti\'hu — wasjud waqtarib!" Do not obey — prostrate and draw near! (96:19)'},
];

const S5_QUIZ = [
  {q:'What is the last command in Surah Al-Alaq? (96:19)',
   opts:['Memorise the Quran fully','Wasjud waqtarib — prostrate and draw near to Allah','Give charity every day','Fast the month of Ramadan'],
   correct:1},
  {q:'What is special about sajdah (prostration) in relation to closeness to Allah?',
   opts:['It burns more calories','A hadith says: closest to Allah is in sujud (prostration)','It faces directly towards the Kaaba','It was commanded before salah'],
   correct:1},
  {q:'This surah contains a sajdah tilawah — what should you do when you recite 96:19?',
   opts:['Raise your hands in du\'a','Recite it three times for emphasis','Perform a prostration of recitation','Skip it and continue reading'],
   correct:2},
  {q:'What is the overall message of Al-Alaq about knowledge and humility?',
   opts:['Knowledge leads to arrogance and pride','Read and learn in Allah\'s name — but stay humble and close to Allah','Only scholars need to read','Knowledge is only for the wealthy'],
   correct:1},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerQuiz(2, S1_QUIZ);
window.registerMatch(3, S2_ITEMS,S2_ZONES);
window.registerQuiz(4, S3_QUIZ);
window.registerOrder(5, S4_EVENTS_CORRECT);
window.registerQuiz(6, S5_QUIZ);

function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1a0404':'#100002',acc=st?'#f06040':'#d03010';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('اقْرَأْ',W/2,H*0.45);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('"READ!" — First word revealed',W/2,H*0.6);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=5?'AL-ALAQ COMPLETE! 📖':`Al-Alaq — ${n}/6 levels`,W/2,14);ctx.textAlign='left';
};
