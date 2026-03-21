'use strict';
/* Surah Al-Asr (103) — The Time */
window.STORAGE_KEY = 'asrQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s2Answers:{}, s2Checked:false, s3Checked:false, s4Answers:{}, s4Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'⏳', title:'Time Keeper',    msg:"SubhanAllah! Imam Shafi\'i said: if people only reflected on Surah Al-Asr, it would be enough for them. ONE oath (time), ONE claim (man is in loss), ONE exception (4 conditions). The entire formula for success in 3 verses!"},
  3:{xp:80, gems:3, icon:'🤝', title:'Four Found',     msg:"MashAllah! You matched the four conditions for salvation: believe, do good deeds, urge to truth, and urge to patience. All FOUR are required — not just iman alone!"},
  4:{xp:90, gems:4, icon:'✅', title:'Al-Asr Complete', msg:"Allahu Akbar! Al-Asr complete! 'Wa tawassaw bil-haqq wa tawassaw bis-sabr.' Counsel each other to TRUTH and counsel each other to PATIENCE. Two collective duties — not just individual. May we be a community of truth and patience! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s103', surahName:'Al-Asr', surahArabic:'العصر', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','⏳','🤝','✅'], tileLabels:['Word by Word','Time Oath','Four Conditions','Complete'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Asr — The Time! Three verses that contain the ENTIRE formula for human salvation. Imam Shafi\'i said these three verses are enough if you truly understand them. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. Time is running! ⏳`,
    complete:n=>`MashAllah, ${n}! Al-Asr complete! Iman + \'Amal Salih + Tawasi bil-Haqq + Tawasi bis-Sabr. The formula is yours! Live it! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1 — وَالْعَصْرِ', words:[
    {ar:'وَالْعَصْرِ', tr:'wal-ʿaṣr', en:'by Time', freq:3},
  ]},
  {label:'Verse 2 — إِنَّ الْإِنسَانَ لَفِي خُسْرٍ', words:[
    {ar:'خُسْرٍ', tr:'khusr', en:'loss', freq:5},
    {ar:'لَفِي', tr:'la-fī', en:'surely in', freq:1714},
    'inna',
    {ar:'الْإِنسَانَ', tr:'al-insān', en:'mankind', freq:65},
  ]},
  {label:'Verse 3 — إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ', words:[
    {ar:'الصَّالِحَاتِ', tr:'al-ṣāliḥāt', en:'righteous deeds', freq:62},
    {ar:'وَعَمِلُوا', tr:'wa-ʿamilū', en:'and did', freq:360},
    {ar:'آمَنُوا', tr:'āmanū', en:'believed', freq:537},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1450},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:663},
  ]},
  {label:'Verse 3b — وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', words:[
    {ar:'بِالصَّبْرِ', tr:'bil-ṣabr', en:'patience', freq:22},
    {ar:'وَتَوَاصَوْا', tr:'wa-tawāṣaw', en:'and urged one another to', freq:2},
    {ar:'بِالْحَقِّ', tr:'bil-ḥaqq', en:'truth', freq:247},
    {ar:'وَتَوَاصَوْا', tr:'wa-tawāṣaw', en:'and urged one another to', freq:2},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  {q:'What does Allah swear by in 103:1?',
   opts:['By the sun and its brightness','By time (Al-Asr)','By the night and the day','By the earth and what it holds'],
   correct:1},
  {q:'What is the claim made about all of humanity in 103:2?',
   opts:['All people are successful','Most people are on the right path','Indeed mankind is in loss','Man was created weak'],
   correct:2},
  {q:'Why is "time" used as the oath?',
   opts:['Time is the most powerful thing in nature','Time is what we are all losing — it points to urgency','Time was the first thing Allah created','Time controls the Day of Judgement'],
   correct:1},
  {q:'Is every single human being in loss according to 103:2?',
   opts:['Yes — with no exception','No — 103:3 gives an exception for four conditions','Only the disbelievers are in loss','Only the arrogant are in loss'],
   correct:1},
];

const S2_ITEMS = [
  {id:'c1', text:'آمَنُوا',                           zone:'z1'},
  {id:'c2', text:'عَمِلُوا\nالصَّالِحَاتِ',          zone:'z2'},
  {id:'c3', text:'تَوَاصَوْا\nبِالْحَقِّ',           zone:'z3'},
  {id:'c4', text:'تَوَاصَوْا\nبِالصَّبْرِ',          zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'Correct belief in Allah, His messengers, angels, books, last day (103:3)'},
  {id:'z2', desc:'Following faith with action — deeds consistent with belief (103:3)'},
  {id:'z3', desc:'Communally urging/counselling each other to truth (103:3)'},
  {id:'z4', desc:'Communally urging/counselling each other to patience (103:3)'},
];

const S3_QUIZ = [
  {q:'Why is "tawassaw" (urging each other) a community obligation and not individual?',
   opts:['Because the verb is plural — it implies community mutual encouragement','Because individual guidance is forbidden','Because only scholars can urge truth','Because it is only required on Fridays'],
   correct:0},
  {q:'Why does this surah include BOTH "urging truth" AND "urging patience"?',
   opts:['Truth brings rewards; patience brings forgiveness','Truth can be rejected — patience is needed to keep going with it','They are the same thing in different words','Only patience matters; truth is automatic'],
   correct:1},
  {q:'Imam Shafi\'i said Al-Asr was sufficient — what did he mean?',
   opts:['You only need to recite it to be saved','It contains the complete formula for human success and salvation','It is the most rewarding surah to memorise','It was the last surah revealed'],
   correct:1},
  {q:'What is the link between TIME as the oath and humanity being in loss?',
   opts:['Time is the most precious resource — wasting it is the loss','Time will end on the Day of Judgement','Time is worth more than wealth','Time heals all wounds'],
   correct:0},
];

function renderSection2Game(){renderQuiz(2,S1_QUIZ);}function checkSection2(){checkQuiz(2,S1_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S2_ITEMS,S2_ZONES);}function checkSection3(){checkDragDrop(3,S2_ZONES);}
function renderSection4Game(){renderQuiz(4,S3_QUIZ);}function checkSection4(){checkQuiz(4,S3_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1e0e02':'#120800',acc=st?'#f8c050':'#e8b030';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // hourglass
  if(n>=1){ctx.strokeStyle=acc;ctx.lineWidth=2;ctx.strokeRect(W/2-15,H*0.25,30,50);ctx.beginPath();ctx.moveTo(W/2-15,H*0.25);ctx.lineTo(W/2+15,H*0.5);ctx.lineTo(W/2-15,H*0.75);ctx.lineTo(W/2+15,H*0.25);ctx.lineTo(W/2-15,H*0.25);ctx.stroke();ctx.fillStyle=acc;ctx.beginPath();ctx.moveTo(W/2-14,H*0.51);ctx.lineTo(W/2+14,H*0.51);ctx.lineTo(W/2,H*0.74);ctx.fill();}
  if(n>=2){ctx.fillStyle=acc;ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('Believe + Deeds + Truth + Patience',W/2,H*0.88);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AL-ASR COMPLETE! ⏳':`Al-Asr — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
