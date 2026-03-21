'use strict';
/* Surah Ash-Shams (91) — The Sun */
window.STORAGE_KEY = 'shamsQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Answers:{}, s4Checked:false,
  s5Order:[], s5Checked:false,
};

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70,  gems:3, icon:'☀️',  title:'Sun Witness',    msg:"SubhanAllah! Eleven cosmic oaths — sun, moon, day, night, sky, earth, and the SOUL itself. Allah is drawing our attention: LOOK at creation, then look inward at your soul. The nafs is at the heart of this surah!"},
  3:{xp:80,  gems:3, icon:'🌅',  title:'Oath Keeper',    msg:"MashAllah! You matched all eleven cosmic signs. Remember: each oath points to the SOUL and its choice. Purify it or corrupt it — that is the test!"},
  4:{xp:90,  gems:3, icon:'✨',  title:'Soul Purifier',  msg:"SubhanAllah! 'Qad aflaha man zakkaha — wa qad khaba man dassaha.' He who purifies wins. He who corrupts loses. May Allah purify our souls! Ameen."},
  5:{xp:100, gems:4, icon:'🐪',  title:'Thamud Witness', msg:"Allahu Akbar! Thamud had everything — signs, prophets, miracles — but they chose arrogance. They hamstrung Allah's camel. Allah crushed them. Let Thamud's story be our reminder: arrogance destroys. May Allah protect us from it!"},
};

window.SURAH_CONFIG = {
  id:'s91', surahName:'Ash-Shams', surahArabic:'الشمس', totalLevels:5, rewards:REWARDS,
  tileIcons:['📖','☀️','🌅','✨','🐪'],
  tileLabels:['Word by Word','The Oaths','11 Signs','Soul','Thamud'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Welcome to Surah Ash-Shams — The Sun! Allah takes ELEVEN cosmic oaths — the most in the Quran — to make one point: purify your soul. Then the story of Thamud shows what happens when you don't. 5 levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/5 levels done. The sun still shines — keep going! ☀️`,
    complete: name=>`MashAllah, ${name}! Ash-Shams complete! "Qad aflaha man zakkaha." May Allah purify your soul and mine! Ameen 🏆`,
  },
};

/* Level 1 — Quiz: The Cosmic Oaths (91:1-7) */
/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1-2 — وَالشَّمْسِ وَضُحَاهَا · وَالْقَمَرِ إِذَا تَلَاهَا', words:[
    {ar:'تَلَاهَا', tr:'talāhā', en:'follows it', freq:1},
    {ar:'وَالْقَمَرِ', tr:'wal-qamar', en:'and the moon', freq:27},
    {ar:'وَضُحَاهَا', tr:'wa-ḍuḥāhā', en:'and its brightness', freq:3},
    {ar:'وَالشَّمْسِ', tr:'wal-shams', en:'by the sun', freq:33},
  ]},
  {label:'Verse 7-8 — وَنَفْسٍ وَمَا سَوَّاهَا · فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا', words:[
    {ar:'وَتَقْوَاهَا', tr:'wa-taqwāhā', en:'and its righteousness', freq:64},
    {ar:'فُجُورَهَا', tr:'fujūrahā', en:'its wickedness', freq:3},
    {ar:'فَأَلْهَمَهَا', tr:'fa-alhamahā', en:'and inspired it', freq:1},
    {ar:'سَوَّاهَا', tr:'sawwāhā', en:'proportioned it', freq:4},
    {ar:'وَمَا', tr:'wa-mā', en:'and He who', freq:500},
    {ar:'وَنَفْسٍ', tr:'wa-nafs', en:'and [by] the soul', freq:295},
  ]},
  {label:'Verse 9-10 — قَدْ أَفْلَحَ مَن زَكَّاهَا · وَقَدْ خَابَ مَن دَسَّاهَا', words:[
    {ar:'دَسَّاهَا', tr:'dassāhā', en:'corrupts it', freq:1},
    {ar:'خَابَ', tr:'khāba', en:'has failed', freq:5},
    {ar:'زَكَّاهَا', tr:'zakkāhā', en:'purifies it', freq:5},
    {ar:'أَفْلَحَ', tr:'aflaḥa', en:'has succeeded', freq:10},
    {ar:'مَن', tr:'man', en:'he who', freq:89},
    {ar:'قَدْ', tr:'qad', en:'certainly', freq:406},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  {q:'How many oaths does Allah take in Surah Ash-Shams?',
   opts:['Five oaths','Seven oaths','Nine oaths','Eleven oaths'],
   correct:3},
  {q:'What is the first oath in 91:1?',
   opts:['By the night','By the moon','By the sun in its morning brightness','By the sky and its builder'],
   correct:2},
  {q:'What does "wa-l-qamari idha talaha" (91:2) mean?',
   opts:['By the moon when it rises after the sun','By the star when it appears at dawn','By the moon when it sets','By the stars in their orbits'],
   correct:0},
  {q:'What does "wa nafsin wa ma sawwaha" (91:7) mean?',
   opts:['By the earth and what it holds','By the night when it covers','By the soul and He who formed it perfectly','By the sky and its structure'],
   correct:2},
];

/* Level 2 — Drag & Drop: Match Oath to Meaning (91:1-6) */
const S2_ITEMS = [
  {id:'o1', text:'☀️ Ash-Shams\n(The Sun)',      zone:'z1'},
  {id:'o2', text:'🌙 Al-Qamar\n(The Moon)',       zone:'z2'},
  {id:'o3', text:'🌅 An-Nahar\n(The Day)',         zone:'z3'},
  {id:'o4', text:'🌑 Al-Layl\n(The Night)',         zone:'z4'},
  {id:'o5', text:'🌌 As-Sama\n(The Sky)',            zone:'z5'},
  {id:'o6', text:'🌍 Al-Ard\n(The Earth)',           zone:'z6'},
];
const S2_ZONES = [
  {id:'z1', desc:'When it shines in morning brightness (91:1)'},
  {id:'z2', desc:'When it follows the sun / reflects its light (91:2)'},
  {id:'z3', desc:'When it reveals and illuminates (91:3)'},
  {id:'z4', desc:'When it covers and conceals (91:4)'},
  {id:'z5', desc:'By the One who built and raised it (91:5)'},
  {id:'z6', desc:'By the One who spread it out (91:6)'},
];

/* Level 3 — Quiz: Soul Purification vs Corruption (91:7-10) */
const S3_QUIZ = [
  {q:'What does "wa alhamaha fujuraha wa taqwaha" (91:8) mean?',
   opts:['He gave the soul intelligence and reason','He inspired the soul with its wickedness and its piety','He tested the soul with wealth and poverty','He created the soul from light and darkness'],
   correct:1},
  {q:'What is the Arabic term for purifying the soul?',
   opts:['Dassaha','Zakkaha','Sawwaha','Talaha'],
   correct:1},
  {q:'According to 91:9-10, who truly succeeds?',
   opts:['Those who accumulate wealth','Those who have many children','Those who purify their souls','Those who pray the most'],
   correct:2},
  {q:'What does "qad khaba man dassaha" mean?',
   opts:['He succeeds who grows it','He fails who corrupts and buries his soul','He suffers who purifies it','He loses who seeks knowledge'],
   correct:1},
];

/* Level 4 — Story Order: The Thamud Story (91:11-15) */
const S4_EVENTS_CORRECT = [
  {id:'t1', text:'🏔️ Thamud: a powerful ancient people who lived in rock-carved cities (91:11)'},
  {id:'t2', text:'🐪 Allah sent Salih (AS) with a miraculous she-camel as a clear sign (91:13)'},
  {id:'t3', text:'⚠️ Allah warned Thamud: "The she-camel of Allah — let her graze freely!" (91:13)'},
  {id:'t4', text:'🔪 The worst of them rose up and hamstrung (killed) the camel in defiance (91:12,14)'},
  {id:'t5', text:'⚡ Allah destroyed them with a swift and crushing punishment (91:14)'},
  {id:'t6', text:'😔 Allah has no fear of the consequence — arrogance against Him always ends in ruin (91:15)'},
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

function renderSection2Game(){renderQuiz(2,S1_QUIZ);}
function checkSection2(){checkQuiz(2,S1_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S2_ITEMS,S2_ZONES);}
function checkSection3(){checkDragDrop(3,S2_ZONES);}
function renderSection4Game(){renderQuiz(4,S3_QUIZ);}
function checkSection4(){checkQuiz(4,S3_QUIZ);}
function renderSection5Game(){renderStoryOrder(5,S4_EVENTS_CORRECT);}
function checkSection5(){checkStoryOrder(5,S4_EVENTS_CORRECT);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#2a1808':'#180c02', acc=st?'#f8c060':'#e8c020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Sun
  const sunR=n>=1?28:14;
  const sg=ctx.createRadialGradient(W*0.75,H*0.25,2,W*0.75,H*0.25,sunR*2);
  sg.addColorStop(0,'#fff8c0');sg.addColorStop(0.4,'#f0a030');sg.addColorStop(1,'transparent');
  ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=n>=1?'#ffe060':'rgba(255,220,80,0.4)';
  ctx.beginPath();ctx.arc(W*0.75,H*0.25,sunR,0,Math.PI*2);ctx.fill();
  if(n>=2){// ground
    ctx.fillStyle=st?'#5a3010':'#3a1a04';ctx.fillRect(0,H*0.65,W,H*0.35);
    // moon
    ctx.fillStyle='#e8e0c0';ctx.beginPath();ctx.arc(W*0.15,H*0.2,14,0,Math.PI*2);ctx.fill();
  }
  if(n>=3){// soul figure
    ctx.fillStyle='rgba(255,220,80,0.6)';
    ctx.beginPath();ctx.arc(W*0.45,H*0.5,18,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=acc;ctx.font='12px serif';ctx.textAlign='center';
    ctx.fillText('نَفْس',W*0.45,H*0.54);ctx.textAlign='left';
  }
  if(n>=4){// Thamud rocks
    ctx.fillStyle=st?'#604030':'#4a2a10';
    for(let i=0;i<3;i++){ctx.fillRect(W*0.05+i*50,H*0.5,30,35);}
    ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
    ctx.fillText('ASH-SHAMS COMPLETE ☀️',W/2,14);ctx.textAlign='left';
  } else {
    ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
    ctx.fillText(`Ash-Shams — ${n}/5 levels`,W/2,14);ctx.textAlign='left';
  }
};
