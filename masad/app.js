'use strict';
/* Surah Al-Masad (111) — The Palm Fiber */
window.STORAGE_KEY = 'masadQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Order:[], s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every word of Surah Al-Masad! تَبَّتْ يَدَا أَبِي لَهَبٍ — May the hands of Abu Lahab perish! The only surah naming a specific enemy — and containing a Quranic prediction that came true. Every word carries deep meaning!"},

  2:{xp:70, gems:3, icon:'🔥', title:'Abu Lahab Known', msg:"SubhanAllah! Abu Lahab — the Prophet's ﷺ own uncle — was his most vicious enemy. His hands perish! His wealth and earnings won't help him in the slightest. This surah was revealed while Abu Lahab was still alive — and he never became Muslim, as Allah predicted!"},
  3:{xp:80, gems:3, icon:'📖', title:'Story Ordered',   msg:"MashAllah! You ordered the story of Abu Lahab correctly. Notice: Allah predicted Abu Lahab would NOT become Muslim — and it happened exactly so. This is one of the scientific miracles of the Quran!"},
  4:{xp:90, gems:4, icon:'🌿', title:'Al-Masad Complete', msg:"Allahu Akbar! Al-Masad complete! 'Fi jidiha hablun min masad' — around her neck a rope of palm fiber! The wife of Abu Lahab carried wood to harm the Prophet ﷺ on his path. May we never be of those who harm the Prophet's ﷺ legacy! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s111', surahName:'Al-Masad', surahArabic:'المسد', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','🔥','📖','🌿'], tileLabels:['Word by Word','Abu Lahab','Story Order','His Wife'],
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
    {ar:'وَمَا',tr:'wa-mā',en:'and what'},
    'maluhu',
    {ar:'عَنْهُ',tr:'ʿanhu',en:'him / from him'},
    {ar:'أَغْنَىٰ',tr:'aghnā',en:'availed / benefited'},
    {ar:'مَا',tr:'mā',en:'did not'},
    'wa-tabb','lahab-n','abi','yada','tabbat',
  ]},
  {label:'Verses 3-4 — سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ · وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ', words:[
    'al-hatab','hammalata',
    {ar:'وَامْرَأَتُهُ',tr:'wa-mraʾatuhu',en:'and his wife'},
    'lahab-n',{ar:'ذَاتَ',tr:'dhāta',en:'full of'},
    {ar:'نَارًا',tr:'nāran',en:'a fire'},
    {ar:'سَيَصْلَىٰ',tr:'sayaṣlā',en:'he will burn in'},
  ]},
  {label:'Verse 5 — فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ', words:[
    'masad-n','min2','hablun','jidiha',
    {ar:'فِي',tr:'fī',en:'around'},
  ]},
];

/* ─── LEVEL 1: Word by Word matching ─── */
const S1_ITEMS = [
  {id:'w1', text:'تَبَّتْ',  zone:'z1'},
  {id:'w2', text:'يَدَا',  zone:'z2'},
  {id:'w3', text:'لَهَبٍ',  zone:'z3'},
  {id:'w4', text:'مَالُهُ',  zone:'z4'},
  {id:'w5', text:'الْحَطَبِ',  zone:'z5'},
  {id:'w6', text:'مَسَدٍ',  zone:'z6'}
];
const S1_ZONES = [
  {id:'z1', desc:"May it perish / has perished — a curse and a Quranic prediction (111:1)"},
  {id:'z2', desc:"Hands (of) — the hands of Abu Lahab — symbol of his hostile actions (111:1)"},
  {id:'z3', desc:"Flame / blaze — his nickname: Father of Flame; also his punishment (111:1,3)"},
  {id:'z4', desc:"His wealth — that which he boasted of but which cannot save him (111:2)"},
  {id:'z5', desc:"The firewood — the thorny branches his wife carried to harm the Prophet ﷺ (111:4)"},
  {id:'z6', desc:"Palm fiber — the twisted rope around her neck in Hellfire (111:5)"}
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

const S3_EVENTS_CORRECT = [
  {id:'m1', text:'📣 Prophet ﷺ calls family to Mount Safa — "Warn your nearest kin!"'},
  {id:'m2', text:'😤 Abu Lahab shouts: "May you perish! Is this why you gathered us?" (His hands!)'},
  {id:'m3', text:'📜 Allah reveals: "Tabbat yada Abi Lahab — wa tabb!" His hands shall perish!'},
  {id:'m4', text:'💰 Warning: His wealth and what he earned will NOT benefit him (111:2)'},
  {id:'m5', text:'🌿 His wife: the wood-carrier — puts thorns on the Prophet\'s ﷺ path (111:4)'},
  {id:'m6', text:'🔥 Around her neck a rope of palm fiber — in the Hellfire (111:5)'},
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

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


function renderSection1Game(){if(window.renderWBW)renderWBW('wbw-display',WBW_DATA,'wbw-reveal-btn');renderDragDrop(1,S1_ITEMS,S1_ZONES);}
function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderStoryOrder(3,S3_EVENTS_CORRECT);}function checkSection3(){checkStoryOrder(3,S3_EVENTS_CORRECT);}
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
