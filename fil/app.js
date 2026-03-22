'use strict';
/* Surah Al-Fil (105) — The Elephant */
window.STORAGE_KEY = 'filQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Order:[], s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every word of Surah Al-Fil! أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ — Did you not see how your Lord dealt with them? Now every time you recite this surah, you know EXACTLY what Allah is describing!"},

  2:{xp:70, gems:3, icon:'🐘', title:'Elephant Witnessed', msg:"SubhanAllah! 570 CE — the Year of the Elephant. Abraha, governor of Yemen, marched 60,000 soldiers and 13 elephants to destroy the Kaaba. The Quraysh fled to the mountains. No army could stop them — only Allah!"},
  3:{xp:80, gems:3, icon:'🐦', title:'Birds Sent',        msg:"MashAllah! You mastered the story of Al-Fil! Allah sent flocks of birds (Ababil) each carrying three stones — one in each claw, one in the beak — and pelted Abraha\'s army. They were left like eaten straw!"},
  4:{xp:90, gems:4, icon:'✨', title:'Al-Fil Complete',   msg:"Allahu Akbar! Al-Fil complete! Prophet Muhammad ﷺ was born in the Year of the Elephant — the very year Allah protected Mecca. Allah was already preparing the world for His Prophet's birth! SubhanAllah! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s105', surahName:'Al-Fil', surahArabic:'الفيل', totalLevels:4, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','🐘','🐦','✨'], tileLabels:['Word by Word','Army of Elephant','Complete the Verse','Al-Fil Complete'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Fil — The Elephant! Did you not see how your Lord dealt with the people of the Elephant? 60,000 soldiers, 13 war elephants — destroyed by tiny birds carrying stones. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The birds are coming! 🐦`,
    complete:n=>`MashAllah, ${n}! Al-Fil complete! Allah protects His house. No army can defeat His decree! 🏆`,
  },
};


/* ─── LEVEL 1: Word by Word flip-card data (uses shared arabic-words.js) ─── */
const WBW_DATA = [
  {label:'Verse 1 — أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ', words:[
    'al-fil','bi-ashab','rabbuka','fa-ala','kayfa',
    {ar:'تَرَ',tr:'tara',en:'you see', freq:15},
    {ar:'أَلَمْ',tr:'alam',en:'did you not', freq:40},
  ]},
  {label:'Verse 2 — أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ', words:[
    'tadleel','fi','kaydahum',
    {ar:'يَجْعَلْ',tr:'yajʿal',en:'make / place', freq:30},
  ]},
  {label:'Verses 3-4 — طَيْرًا أَبَابِيلَ · تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ', words:[
    'sijjeel','min2','hijara','tarmihim','ababeel','tayran',
  ]},
  {label:'Verse 5 — فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ', words:[
    'makool','ka-asf',
    {ar:'فَجَعَلَهُمْ',tr:'fajaʿalahum',en:'and He made them', freq:5},
  ]},
];

const S2_QUIZ = [
  {q:'Who was Abraha and what did he want to do?',
   opts:['A general who protected Mecca from the Romans','The governor of Yemen who marched to DESTROY the Kaaba','A Qurayshi leader who rebuilt the Kaaba','A prophet sent to warn the people of Mecca'],
   correct:1},
  {q:'What does "alam tara kayfa fa\'ala rabbuka" (105:1) convey?',
   opts:['A command to fight back','A rhetorical question — did you not see what your Lord did?','A promise of future protection','A description of the Day of Judgement'],
   correct:1},
  {q:'What were "tayr ababil" (105:3)?',
   opts:['Eagles that attacked the army','Flocks of birds sent by Allah','Angels in the form of birds','Wasps and insects from the sea'],
   correct:1},
  {q:'What did each bird carry according to Islamic tradition?',
   opts:['Fire in their wings','Three stones: two in claws, one in beak','Just one large stone each','Arrows of lightning'],
   correct:1},
];

const S3_FIB = [
  {verse:'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ _____', opts:['الْفِيلِ','الْجَيْشِ','الْقَرْيَةِ','الْكُفَّارِ'], correct:0, ref:'105:1', translation:'Have you not seen how your Lord dealt with the People of the Elephant?'},
  {verse:'أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي _____', opts:['تَضْلِيلٍ','خَسَارَةٍ','هَلَاكٍ','بُطْلَانٍ'], correct:0, ref:'105:2', translation:'Did He not make their plan go astray?'},
  {verse:'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا _____', opts:['أَبَابِيلَ','كَثِيرَةً','عَظِيمَةً','سَرِيعَةً'], correct:0, ref:'105:3', translation:'And He sent against them birds in flocks'},
  {verse:'تَرْمِيهِم بِحِجَارَةٍ مِّن _____', opts:['سِجِّيلٍ','نَارٍ','جَهَنَّمَ','حَدِيدٍ'], correct:0, ref:'105:4', translation:'Striking them with stones of baked clay'},
  {verse:'فَجَعَلَهُمْ كَعَصْفٍ _____', opts:['مَّأْكُولٍ','مَنْثُورٍ','مَطْحُونٍ','مَحْرُوقٍ'], correct:0, ref:'105:5', translation:'And He made them like eaten straw'},
];

const S4_QUIZ = [
  {q:'What does "ka\'asfin ma\'kul" (105:5) compare the destroyed army to?',
   opts:['Ashes from a fire','Scattered sand in the wind','Eaten/devoured straw','Dried leaves in autumn'],
   correct:2},
  {q:'What does this surah prove about the protection of Mecca?',
   opts:['The Quraysh were the greatest warriors','Allah Himself is the Protector of His house','Mecca has special geographical protection','Angels guard Mecca physically at all times'],
   correct:1},
  {q:'Why is it significant that the Prophet ﷺ was born in the Year of the Elephant?',
   opts:['He was born during the battle itself','Allah showed His protection of Mecca before the greatest man was born there','The elephants were a sign of his coming','His parents fought in the battle'],
   correct:1},
  {q:'What is "sijjil" (105:4)?',
   opts:['Rocks from the mountains of Yemen','Baked clay stones — projectiles carried by the birds','Fiery arrows from the sky','Stones from the Kaaba itself'],
   correct:1},
];


function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderFillBlank(3,S3_FIB);}function checkSection3(){checkFillBlank(3,S3_FIB);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#101418':'#080a0c',acc=st?'#a0b8d0':'#708898';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=st?'#283848':'#1a2030';ctx.fillRect(0,H*0.6,W,H*0.4);
  if(n>=1){// elephant silhouette
    ctx.fillStyle=acc;ctx.fillRect(W*0.55,H*0.4,50,28);ctx.fillRect(W*0.8,H*0.32,10,16);ctx.fillRect(W*0.8,H*0.44,8,20);ctx.fillRect(W*0.82,H*0.27,16,10);ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(W*0.58,H*0.66,8,14);ctx.fillRect(W*0.68,H*0.66,8,14);}
  if(n>=2){ctx.fillStyle='#c87030';ctx.font='14px serif';ctx.textAlign='center';ctx.fillText('🐦🐦🐦',W/2,H*0.35);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-FIL COMPLETE! 🐘':`Al-Fil — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};

window.setupWBWLevel(WBW_DATA, 10);
