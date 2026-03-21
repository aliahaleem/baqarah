'use strict';
/* Surah Al-Balad (90) — The City */
window.STORAGE_KEY = 'baladQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Answers:{}, s4Checked:false,
  s5Checked:false,
  s6Order:[], s6Checked:false,
  s7Answers:{}, s7Checked:false,
};

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'🕋', title:'City Witness',    msg:"SubhanAllah! Allah swears by THIS city — Mecca — and by the Prophet ﷺ living freely in it. 'Laqad khalaqnal-insan fi kabad' — We created man in hardship. Life is designed for striving. May we strive well!"},
  3:{xp:80, gems:3, icon:'💪', title:'Struggle Knower', msg:"MashAllah! Man has two eyes, a tongue, two lips — and Allah showed him BOTH paths. He was given everything he needs. No excuses! May we choose the right path always."},
  4:{xp:90, gems:3, icon:'🏔️', title:'Path Climber',   msg:"SubhanAllah! Al-aqabah — the steep path — is the path of freeing the oppressed, feeding the hungry. It's HARD — that's why it's called steep! May Allah give us strength to climb it. Ameen!"},
  5:{xp:90, gems:3, icon:'🍲', title:'Feeder of Hungry', msg:"MashAllah! Feeding an orphan relative or a destitute stranger on a day of hunger — this is the aqabah! And not just doing it — ENCOURAGING others too. May Allah make us of the feeders!"},
  6:{xp:100, gems:4, icon:'🤝', title:'Companion Right', msg:"MashAllah! Believe, urge each other to patience, urge each other to mercy — these are the 'Companions of the Right' (Ashaab al-Maymana). May Allah write us among them. Ameen!"},
  7:{xp:110, gems:5, icon:'🔥', title:'Al-Balad Complete', msg:"Allahu Akbar! Al-Balad complete! The two paths are clear. The aqabah is steep. The companions of the right earn Jannah. May Allah make us climb every aqabah in our lives! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s90', surahName:'Al-Balad', surahArabic:'البلد', totalLevels:7, rewards:REWARDS,
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Welcome to Surah Al-Balad — The City! Allah swears by Mecca. Man is created in hardship. Two paths: the easy path of selfishness, and the steep aqabah of freeing slaves, feeding orphans, and urging mercy. Which path will you choose? 7 levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. The aqabah is steep — but keep climbing! 💪`,
    complete: name=>`MashAllah, ${name}! All 7 levels of Al-Balad complete! "Thumma kana minal-ladhina amanu wa-tawassaw bis-sabri wa-tawassaw bil-marhama." May Allah make us companions of the right. Ameen! 🏆`,
  },
};

/* Level 1: Quiz — The Sacred City & Man in Hardship (90:1-4) */
/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1-2 — لَا أُقْسِمُ بِهَٰذَا الْبَلَدِ · وَأَنتَ حِلٌّ بِهَٰذَا الْبَلَدِ', words:[
    {ar:'الْبَلَدِ', tr:'al-balad', en:'the city (Mecca)', freq:19},
    {ar:'بِهَٰذَا', tr:'bi-hādhā', en:'by this', freq:70},
    {ar:'أُقْسِمُ', tr:'uqsimu', en:'I swear', freq:8},
    {ar:'لَا', tr:'lā', en:'no / I do', freq:1069},
  ]},
  {label:'Verse 8-9 — أَلَمْ نَجْعَل لَّهُ عَيْنَيْنِ · وَلِسَانًا وَشَفَتَيْنِ', words:[
    {ar:'وَشَفَتَيْنِ', tr:'wa-shafatayn', en:'and two lips', freq:1},
    {ar:'وَلِسَانًا', tr:'wa-lisānan', en:'and a tongue', freq:25},
    {ar:'عَيْنَيْنِ', tr:'ʿaynayn', en:'two eyes', freq:7},
    {ar:'لَّهُ', tr:'lahu', en:'for him', freq:860},
    {ar:'نَجْعَل', tr:'najʿal', en:'did We not make', freq:30},
    {ar:'أَلَمْ', tr:'alam', en:'did We not', freq:40},
  ]},
  {label:'Verse 11-12 — فَلَا اقْتَحَمَ الْعَقَبَةَ · وَمَا أَدْرَاكَ مَا الْعَقَبَةُ', words:[
    {ar:'الْعَقَبَةُ', tr:'al-ʿaqabah', en:'the difficult path', freq:2},
    {ar:'وَمَا أَدْرَاكَ', tr:'wa-mā adrāka', en:'and what will make you know', freq:13},
    {ar:'الْعَقَبَةَ', tr:'al-ʿaqabah', en:'the steep path', freq:2},
    {ar:'اقْتَحَمَ', tr:'iqtaḥama', en:'attempted', freq:1},
    {ar:'فَلَا', tr:'fa-lā', en:'but he has not', freq:1069},
  ]},
];


const S1_MATCH_ITEMS = [
  {id:'w1', text:'الْبَلَدِ', zone:'wz1'},
  {id:'w2', text:'بِهَٰذَا', zone:'wz2'},
  {id:'w3', text:'أُقْسِمُ', zone:'wz3'},
  {id:'w4', text:'لَا', zone:'wz4'},
  {id:'w5', text:'وَشَفَتَيْنِ', zone:'wz5'},
  {id:'w6', text:'وَلِسَانًا', zone:'wz6'}
];
const S1_MATCH_ZONES = [
  {id:'wz1', desc:'the city (Mecca)'},
  {id:'wz2', desc:'by this'},
  {id:'wz3', desc:'I swear'},
  {id:'wz4', desc:'no / I do'},
  {id:'wz5', desc:'and two lips'},
  {id:'wz6', desc:'and a tongue'}
];
window.setupWBWLevel(WBW_DATA, S1_MATCH_ITEMS, S1_MATCH_ZONES);

const S1_QUIZ = [
  {q:'What city does Allah swear by in 90:1?',
   opts:['Medina','Jerusalem','Mecca','Baghdad'],
   correct:2},
  {q:'What does "wa-anta hillun bi-hadhal-balad" mean?',
   opts:['You are a visitor to the city','You are free of restriction in this city','You are forbidden from this city','You are the king of this city'],
   correct:1},
  {q:'What does "kabad" (90:4) mean?',
   opts:['Easy and comfortable life','Joy and celebration','Hardship and struggle','Wealth and luxury'],
   correct:2},
  {q:'What does Allah swear by in 90:3?',
   opts:['The sun and the moon','The father and what he fathered','The night and the day','The sea and the mountains'],
   correct:1},
];

/* Level 2: Drag & Drop — Eyes, Tongue, Two Paths (90:8-10) */
const S2_ITEMS = [
  {id:'b1', text:'Two eyes',   zone:'z1'},
  {id:'b2', text:'A tongue',   zone:'z2'},
  {id:'b3', text:'Two lips',   zone:'z3'},
  {id:'b4', text:'Two paths',  zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'For seeing and observing the world Allah created'},
  {id:'z2', desc:'For speech — communication and dhikr of Allah'},
  {id:'z3', desc:'For shaping speech and eating provision from Allah'},
  {id:'z4', desc:'"Al-najdayn" — the two highways: good and evil'},
];

/* Level 3: Quiz — Al-Aqabah (90:11-16) */
const S3_QUIZ = [
  {q:'What is "al-aqabah" in Surah Al-Balad?',
   opts:['A mountain near Mecca','The steep and difficult righteous path','A gate of Paradise','A prayer at sunset'],
   correct:1},
  {q:'What is the FIRST act of the aqabah mentioned in 90:13?',
   opts:['Feeding the poor','Giving gold to orphans','Freeing a slave','Praying extra prayers'],
   correct:2},
  {q:'What day makes feeding an orphan especially meritorious? (90:14)',
   opts:['On Friday','On the day of \'Arafah','On a day of severe hunger','On the first of Ramadan'],
   correct:2},
  {q:'Who does "dha matraba" (90:16) describe?',
   opts:['An orphan with relatives','A traveller without home','A person utterly prostrate in poverty','A prisoner in chains'],
   correct:2},
];

/* Level 4: Drag & Drop — Acts of the Aqabah */
const S4_ITEMS = [
  {id:'a1', text:'Freeing\na slave',       zone:'z1'},
  {id:'a2', text:'Feeding an orphan\nnear relative', zone:'z2'},
  {id:'a3', text:'Feeding a person\nin dire poverty', zone:'z3'},
  {id:'a4', text:'Urging others to\ndo all this too', zone:'z4'},
];
const S4_ZONES = [
  {id:'z1', desc:'"Fakku raqabatin" — liberating an enslaved person from bondage (90:13)'},
  {id:'z2', desc:'"Yatiman dha maqraba" — an orphan who is your close relative (90:15)'},
  {id:'z3', desc:'"Miskeenan dha matraba" — someone utterly prostrate in poverty (90:16)'},
  {id:'z4', desc:'"Tawassaw bil-marhama" — urging each other to show mercy (90:17)'},
];

/* Level 5: Story Order — Two Types of People (90:17-20) */
const S5_EVENTS_CORRECT = [
  {id:'p1', text:'🏔️ Allah describes the difficult righteous path as "al-aqabah" — the steep climb (90:11)'},
  {id:'p2', text:'✅ Those who attempted the aqabah: believed, gave in charity, urged patience and mercy (90:17)'},
  {id:'p3', text:'🌟 They become "Ashaab al-Maymana" — Companions of the Right Hand (Jannah) (90:18)'},
  {id:'p4', text:'❌ But those who rejected Our signs — they are "Ashaab al-Mash\'ama" — Companions of the Left (90:19)'},
  {id:'p5', text:'🔥 Over them fire is closing in — they are sealed within it (90:20)'},
  {id:'p6', text:'⚖️ The conclusion: every person chooses their path — aqabah or easy road — then lives with the consequence'},
];
window._S5_EVENTS = S5_EVENTS_CORRECT;

/* Level 6: Quiz — Companions of Right and Left (90:17-20) */
const S6_QUIZ = [
  {q:'What are the three qualities of those who take the aqabah? (90:17)',
   opts:['Prayer, fasting, and hajj only','Belief, urging patience, urging mercy','Wealth, health, and long life','Knowledge, teaching, and writing'],
   correct:1},
  {q:'What are "Ashaab al-Maymana"?',
   opts:['People who live in Mecca','Companions of the left (Hellfire)','Companions of the right (Jannah)','Scholars of the Quran'],
   correct:2},
  {q:'What are "Ashaab al-Mash\'ama"?',
   opts:['People who rejected Allah\'s signs','People who gave less charity','People who asked too many questions','People who lived in hardship'],
   correct:0},
  {q:'What surrounds the companions of the left in 90:20?',
   opts:['Darkness and cold','Closing fire all around them','Loud punishment and noise','Heavy chains and shackles'],
   correct:1},
];




function renderSection2Game(){renderQuiz(2,S1_QUIZ);}
function checkSection2(){checkQuiz(2,S1_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S2_ITEMS,S2_ZONES);}
function checkSection3(){checkDragDrop(3,S2_ZONES);}
function renderSection4Game(){renderQuiz(4,S3_QUIZ);}
function checkSection4(){checkQuiz(4,S3_QUIZ);}
function renderSection5Game(){renderDragDrop(5,S4_ITEMS,S4_ZONES);}
function checkSection5(){checkDragDrop(5,S4_ZONES);}
function renderSection6Game(){renderStoryOrder(6,S5_EVENTS_CORRECT);}
function checkSection6(){checkStoryOrder(6,S5_EVENTS_CORRECT);}
function renderSection7Game(){renderQuiz(7,S6_QUIZ);}
function checkSection7(){checkQuiz(7,S6_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#3d2870':'#120a04', sand=st?'#5a4070':'#3a1e08', acc=st?'#f4c840':'#e8b030';
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
  for(let i=0;i<35;i++){const sx=(i*4517)%W,sy=(i*3701)%(H*0.6);ctx.fillStyle=`rgba(255,240,200,${Math.min(0.8,n*0.15)})`;ctx.fillRect(sx,sy,1,1);}
  if(n<1){ctx.fillStyle=acc;ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('🕋 Complete levels to build Mecca!',W/2,20);ctx.textAlign='left';return;}
  ctx.fillStyle=sand; ctx.fillRect(0,H*0.65,W,H*0.35);
  if(n>=2){ctx.fillStyle=st?'#7050a0':'#6a3810';for(let i=0;i<4;i++){ctx.fillRect(W*0.1+i*W*0.25,H*0.3,25,H*0.4);}}
  if(n>=3){ctx.fillStyle=st?'#9060d0':'#8a5010'; ctx.fillRect(W*0.37,H*0.15,54,55);}
  if(n>=4){ctx.fillStyle=acc; ctx.fillRect(W*0.39,H*0.16,50,6);}
  if(n>=5){ctx.fillStyle=st?'#f4c840':'#e8b030';ctx.font='7px serif';for(let i=0;i<5;i++)ctx.fillText('★',W*0.08+i*20,H*0.25);}
  if(n>=6){ctx.fillStyle=acc;ctx.font='8px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('AL-BALAD COMPLETE! 🕋',W/2,16);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Building Mecca — ${n}/7 levels`,W/2,16);ctx.textAlign='left';}
};
