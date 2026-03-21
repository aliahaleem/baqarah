'use strict';
/* Surah At-Tin (95) — The Fig */
window.STORAGE_KEY = 'tinQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s2Answers:{}, s2Checked:false, s3Checked:false, s4Answers:{}, s4Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'🫐', title:'Oath Keeper',   msg:"SubhanAllah! Four oaths: the fig (land of Sham/Syria), the olive (Jerusalem), Mount Sinai (where Musa spoke to Allah), and Mecca (the city of security). Four of the most blessed lands on earth — all as witnesses!"},
  3:{xp:80, gems:3, icon:'🧠', title:'Form Knower',   msg:"MashAllah! 'Laqad khalaqnal-insana fi ahsani taqwim' — We created man in the BEST of forms. Best in shape, intellect, potential. Then he can fall to the lowest — unless he believes and does good!"},
  4:{xp:90, gems:4, icon:'⚖️', title:'At-Tin Complete', msg:"Allahu Akbar! At-Tin complete! The question: 'Alaisa Allahu bi-ahkam al-hakimin?' — Is Allah not the most just of judges? YES! May we stand before Him with good deeds! Ameen 🏆"},
};

window.SURAH_CONFIG = {
  id:'s95', surahName:'At-Tin', surahArabic:'التين', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','🫐','🧠','⚖️'], tileLabels:['Word by Word','Four Oaths','Best Form','Divine Justice'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah At-Tin — The Fig! Four blessed oaths point to one truth: man was created in the finest form — but can fall to the lowest. The exception: those who believe and do good. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The fig tree stands tall! 🫐`,
    complete:n=>`MashAllah, ${n}! At-Tin complete! "Laqad khalaqnal-insana fi ahsani taqwim." You were made in the best form — use it well! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1-2 — وَالتِّينِ وَالزَّيْتُونِ · وَطُورِ سِينِينَ', words:[
    {ar:'سِينِينَ', tr:'sīnīn', en:'Sinai', freq:2},
    {ar:'وَطُورِ', tr:'wa-ṭūr', en:'and [Mount] Tur', freq:10},
    {ar:'وَالزَّيْتُونِ', tr:'wal-zaytūn', en:'and the olive', freq:6},
    {ar:'وَالتِّينِ', tr:'wal-tīn', en:'by the fig', freq:1},
  ]},
  {label:'Verse 4 — لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ', words:[
    {ar:'تَقْوِيمٍ', tr:'taqwīm', en:'form / stature', freq:1},
    {ar:'أَحْسَنِ', tr:'aḥsani', en:'the best', freq:35},
    {ar:'فِي', tr:'fī', en:'in', freq:1714},
    {ar:'الْإِنسَانَ', tr:'al-insān', en:'mankind', freq:65},
    {ar:'خَلَقْنَا', tr:'khalaqnā', en:'We created', freq:29},
    {ar:'لَقَدْ', tr:'laqad', en:'certainly', freq:84},
  ]},
  {label:'Verse 5 — ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ', words:[
    {ar:'سَافِلِينَ', tr:'sāfilīn', en:'the lowest [of low]', freq:1},
    {ar:'أَسْفَلَ', tr:'asfala', en:'the lowest', freq:4},
    {ar:'رَدَدْنَاهُ', tr:'radadnāhu', en:'We returned him', freq:2},
    {ar:'ثُمَّ', tr:'thumma', en:'then', freq:340},
  ]},
  {label:'Verse 8 — أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ', words:[
    {ar:'الْحَاكِمِينَ', tr:'al-ḥākimīn', en:'the judges', freq:4},
    {ar:'بِأَحْكَمِ', tr:'bi-aḥkami', en:'the Most Just', freq:1},
    {ar:'اللَّهُ', tr:'Allāh', en:'Allah', freq:2699},
    {ar:'أَلَيْسَ', tr:'alaysa', en:'is not', freq:25},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS = [
  {id:'o1', text:'🫐 At-Tin\n(The Fig)',       zone:'z1'},
  {id:'o2', text:'🫒 Az-Zaytun\n(The Olive)',   zone:'z2'},
  {id:'o3', text:'⛰️ Tur Sineen\n(Mt Sinai)',   zone:'z3'},
  {id:'o4', text:'🕋 Al-Balad\n(The City)',     zone:'z4'},
];
const S1_ZONES = [
  {id:'z1', desc:'A blessed land — associated with the prophets of Sham (Greater Syria)'},
  {id:'z2', desc:'Symbol of the blessed land of Jerusalem and the olive of Palestine'},
  {id:'z3', desc:'The mountain where Allah spoke directly to Musa (Moses) (AS)'},
  {id:'z4', desc:'"Al-Balad al-Amin" — the city of security: Mecca al-Mukarramah'},
];

const S2_QUIZ = [
  {q:'What does "fi ahsani taqwim" (95:4) mean?',
   opts:['In the lowest of the low','In the best/finest of forms','In a form made of clay','In a form like the angels'],
   correct:1},
  {q:'To what state can man fall? (95:5)',
   opts:['Asfala safilin — the lowest of the low','Into the sea and drown','Into poverty and hunger','Into weakness and illness'],
   correct:0},
  {q:'Who is EXCLUDED from falling to the lowest? (95:6)',
   opts:['Those who memorise the Quran','Those who believe and do righteous deeds','Those who give the most charity','Those who fast the most'],
   correct:1},
  {q:'What is their reward mentioned in 95:6?',
   opts:['Great wealth in this world','Long life and health','Ajrun ghayru mamnun — unending reward','Being remembered forever on earth'],
   correct:2},
];

const S3_QUIZ = [
  {q:'What is the closing question of At-Tin? (95:8)',
   opts:['"Is Allah not the best of creators?"','"Is Allah not the most just of judges?"','"Is Allah not watching over us?"','"Is Allah not the most merciful?"'],
   correct:1},
  {q:'What is the Arabic phrase for "most just of judges" in 95:8?',
   opts:['Ahsan al-khaliqin','Ahkam al-hakimin','Rahman al-rahimin','Rabb al-alamin'],
   correct:1},
  {q:'Why does Allah use the fig and olive as oaths specifically?',
   opts:['They are the most nutritious foods','They represent the blessed lands of the prophets','They grow only in Arabia','They symbolise wealth and power'],
   correct:1},
  {q:'What is the main message of Surah At-Tin?',
   opts:['Man was created in the best form and must use it by believing and doing good','Man must eat figs and olives daily','Man must travel to the four blessed lands','Man must memorise all of Juz Amma'],
   correct:0},
];

function renderSection2Game(){renderDragDrop(2,S1_ITEMS,S1_ZONES);}function checkSection2(){checkDragDrop(2,S1_ZONES);}
function renderSection3Game(){renderQuiz(3,S2_QUIZ);}function checkSection3(){checkQuiz(3,S2_QUIZ);}
function renderSection4Game(){renderQuiz(4,S3_QUIZ);}function checkSection4(){checkQuiz(4,S3_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#0c1804':'#040c02',acc=st?'#c8d040':'#a0c018';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const items=['🫐','🫒','⛰️','🕋'];items.forEach((em,i)=>{ctx.font='22px serif';ctx.textAlign='center';ctx.fillText(em,80+i*130,H*0.45);});}
  if(n>=2){ctx.fillStyle=acc;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('أَحْسَنِ تَقْوِيمٍ',W/2,H*0.7);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Best of Forms"',W/2,H*0.82);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AT-TIN COMPLETE! 🫐':`At-Tin — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
