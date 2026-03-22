'use strict';
/* Surah Al-Masad (111) — The Palm Fiber */
window.STORAGE_KEY = 'masadQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Order:[], s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every word of Surah Al-Masad! تَبَّتْ يَدَا أَبِي لَهَبٍ — May the hands of Abu Lahab perish! The only surah naming a specific enemy — and containing a Quranic prediction that came true. Every word carries deep meaning!"},

  2:{xp:70, gems:3, icon:'🔥', title:'Abu Lahab Known', msg:"SubhanAllah! Abu Lahab — the Prophet's ﷺ own uncle — was his most vicious enemy. His hands perish! His wealth and earnings won't help him in the slightest. This surah was revealed while Abu Lahab was still alive — and he never became Muslim, as Allah predicted!"},
  3:{xp:80, gems:3, icon:'📖', title:'Verse Completed',   msg:"MashAllah! You mastered the story of Abu Lahab. Notice: Allah predicted Abu Lahab would NOT become Muslim — and it happened exactly so. This is one of the scientific miracles of the Quran!"},
  4:{xp:90, gems:4, icon:'🌿', title:'Al-Masad Complete', msg:"Allahu Akbar! Al-Masad complete! 'Fi jidiha hablun min masad' — around her neck a rope of palm fiber! The wife of Abu Lahab carried wood to harm the Prophet ﷺ on his path. May we never be of those who harm the Prophet's ﷺ legacy! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s111', surahName:'Al-Masad', surahArabic:'المسد', totalLevels:4, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','🔥','📖','🌿'], tileLabels:['Word by Word','Abu Lahab','Complete the Verse','His Wife'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Masad — The Palm Fiber! The only surah to name a specific enemy of the Prophet ﷺ by name — Abu Lahab (Father of Flame). And a Quranic prediction fulfilled! 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The truth is revealed! 🔥`,
    complete:n=>`MashAllah, ${n}! Al-Masad complete! Allah's words are truth — every prediction came true! 🏆`,
  },
};


/* ─── LEVEL 1: Word by Word flip-card data (uses shared arabic-words.js) ─── */
const WBW_DATA = [
  {label:'Verses 1-2 — تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ · مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ', words:[
    'kasaba',
    {ar:'وَمَا',tr:'wa-mā',en:'and what', freq:500},
    'maluhu',
    {ar:'عَنْهُ',tr:'ʿanhu',en:'him / from him', freq:70},
    {ar:'أَغْنَىٰ',tr:'aghnā',en:'availed / benefited', freq:7},
    {ar:'مَا',tr:'mā',en:'did not', freq:2005},
    'wa-tabb','lahab-n','abi','yada','tabbat',
  ]},
  {label:'Verses 3-4 — سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ · وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ', words:[
    'al-hatab','hammalata',
    {ar:'وَامْرَأَتُهُ',tr:'wa-mraʾatuhu',en:'and his wife', freq:2},
    'lahab-n',{ar:'ذَاتَ',tr:'dhāta',en:'full of', freq:20},
    {ar:'نَارًا',tr:'nāran',en:'a fire', freq:20},
    {ar:'سَيَصْلَىٰ',tr:'sayaṣlā',en:'he will burn in', freq:3},
  ]},
  {label:'Verse 5 — فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ', words:[
    'masad-n','min2','hablun','jidiha',
    {ar:'فِي',tr:'fī',en:'around', freq:1714},
  ]},
];

const S2_QUIZ = [
  {q:'What is the real name of "Abu Lahab"?',
   opts:['Uqbah ibn Abi Mu\'ayt','Abd al-Uzza ibn Abd al-Muttalib','Walid ibn Mughirah','Abu Jahl ibn Hisham'],
   correct:1},
  {q:'What does "Abu Lahab" literally mean?',
   opts:['Father of Strength','Father of Wisdom','Father of Flame (of fire)','Father of the Enemy'],
   correct:2},
  {q:'What does "tabbat yada Abi Lahab" (111:1) mean?',
   opts:['May the hands of Abu Lahab be praised','May the hands of Abu Lahab perish and be destroyed','May Abu Lahab be guided to truth','May the wealth of Abu Lahab increase'],
   correct:1},
  {q:'What is the miraculous proof in Surah Al-Masad?',
   opts:['It predicted the Battle of Badr','It predicted Abu Lahab would die — which he did','It predicted Abu Lahab would NEVER become Muslim — which he never did','It predicted Mecca would be conquered'],
   correct:2},
];

const S3_FIB = [
  {verse:'تَبَّتْ يَدَا أَبِي _____ وَتَبَّ', opts:['لَهَبٍ','جَهْلٍ','سُفْيَانَ','أُمَيَّةَ'], correct:0, ref:'111:1', translation:'May the hands of Abu Lahab perish, and he has perished'},
  {verse:'مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا _____', opts:['كَسَبَ','جَمَعَ','مَلَكَ','وَجَدَ'], correct:0, ref:'111:2', translation:'His wealth did not avail him, nor what he earned'},
  {verse:'سَيَصْلَىٰ _____ ذَاتَ لَهَبٍ', opts:['نَارًا','جَحِيمًا','سَعِيرًا','حُطَمَةً'], correct:0, ref:'111:3', translation:'He will burn in a Fire of blazing flame'},
  {verse:'وَامْرَأَتُهُ حَمَّالَةَ _____', opts:['الْحَطَبِ','النَّارِ','الشَّوْكِ','الْحِجَارَةِ'], correct:0, ref:'111:4', translation:'And his wife, the carrier of firewood'},
  {verse:'فِي جِيدِهَا حَبْلٌ مِّن _____', opts:['مَّسَدٍ','نَارٍ','حَدِيدٍ','لِيفٍ'], correct:0, ref:'111:5', translation:'Around her neck is a rope of palm fiber'},
];

const S4_QUIZ = [
  {q:'What is Abu Lahab\'s wife known for doing to harm the Prophet ﷺ?',
   opts:['Spreading false news about him','Carrying thorny wood/branches and putting them on his path','Poisoning his food','Threatening his companions'],
   correct:1},
  {q:'What title does the Quran give Abu Lahab\'s wife in 111:4?',
   opts:['Al-kafira (the disbeliever)','Hammaalat al-hatab — the carrier of firewood/thorns','Umm al-kufr — mother of disbelief','Al-aduwwah — the enemy'],
   correct:1},
  {q:'What does "fi jidiha hablun min masad" (111:5) describe?',
   opts:['Her necklace of gold and jewels','A rope of palm fiber around her neck in Hellfire','The wood she carries on her back','The thorns she scatters on the path'],
   correct:1},
  {q:'Why is this surah a scientific miracle?',
   opts:['It contains mathematical codes','Allah predicted Abu Lahab would die a disbeliever — and he did, never accepting Islam','It was revealed before any opponent existed','It was memorised by the most companions'],
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
  const sky=st?'#1a0404':'#100200',acc=st?'#f07030':'#e06020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const fp=0.3+Math.sin(Date.now()*0.002)*0.2;ctx.fillStyle=`rgba(255,100,40,${fp})`;ctx.fillRect(0,H*0.7,W,H*0.3);}
  if(n>=2){ctx.fillStyle=acc;ctx.font='9px serif';ctx.textAlign='center';ctx.fillText('تَبَّتْ يَدَا أَبِي لَهَبٍ',W/2,H*0.45);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-MASAD COMPLETE! 🌿':`Al-Masad — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};

window.setupWBWLevel(WBW_DATA, 10);
