'use strict';
/* Surah An-Nasr (110) — The Help */
window.STORAGE_KEY = 'nasrQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Order:[], s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every word of Surah An-Nasr! إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ — When Allah's help and conquest come! The farewell surah — and the lesson: after every victory comes more worship and tawbah. SubhanAllah!"},

  2:{xp:70, gems:3, icon:'🏆', title:'Victory Seen',   msg:"SubhanAllah! 'Idha jaa\'a nasrullahi wal-fath.' When Allah's help and the opening (Fath — victory/conquest) comes! This refers to the Conquest of Mecca in 8 AH — the turning point when thousands entered Islam!"},
  3:{xp:80, gems:3, icon:'📖', title:'Story Ordered',  msg:"MashAllah! You ordered An-Nasr correctly! Victory → Masses entering Islam → Glorify and seek forgiveness. The sequence is: Allah's plan worked → People flooded in → Now respond with humility!"},
  4:{xp:90, gems:4, icon:'🌅', title:'An-Nasr Complete', msg:"Allahu Akbar! An-Nasr complete! This surah is called the 'farewell surah' — after the Conquest of Mecca, the Prophet ﷺ knew his mission was nearly complete. He started preparing. How beautiful — victory leads to MORE worship and tawbah! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s110', surahName:'An-Nasr', surahArabic:'النصر', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','🏆','📖','🌅'], tileLabels:['Word by Word','Victory','Story Order','An-Nasr'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah An-Nasr — The Help! When Allah's help comes and you see masses entering the religion — glorify your Lord and seek forgiveness. The 'farewell surah.' 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. Victory is near! 🏆`,
    complete:n=>`MashAllah, ${n}! An-Nasr complete! Victory is from Allah. Always respond with gratitude and tawbah! 🏆`,
  },
};


/* ─── LEVEL 1: Word by Word flip-card data (uses shared arabic-words.js) ─── */
const WBW_DATA = [
  {label:'Verse 1 — إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ', words:[
    {ar:'وَالْفَتْحُ',tr:'wal-fatḥ',en:'and the conquest'},
    'allah','nasru','ja-a','idha',
  ]},
  {label:'Verse 2 — وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا', words:[
    'afwaja','din-allah','fi','yadkhulun','al-nas-n',
    {ar:'وَرَأَيْتَ',tr:'wa-raʾayta',en:'and you see'},
  ]},
  {label:'Verse 3 — فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا', words:[
    'tawwaban',
    {ar:'كَانَ',tr:'kāna',en:'He has been / He is (always)'},
    {ar:'إِنَّهُ',tr:'innahu',en:'Indeed He'},
    'wastaghfirhu','rabbika','bihamd','fasabbih',
  ]},
];

/* ─── LEVEL 1: Word by Word matching ─── */
const S1_ITEMS = [
  {id:'w1', text:'نَصْرُ',  zone:'z1'},
  {id:'w2', text:'الْفَتْحُ',  zone:'z2'},
  {id:'w3', text:'يَدْخُلُونَ',  zone:'z3'},
  {id:'w4', text:'أَفْوَاجًا',  zone:'z4'},
  {id:'w5', text:'فَسَبِّحْ',  zone:'z5'},
  {id:'w6', text:'وَاسْتَغْفِرْهُ',  zone:'z6'}
];
const S1_ZONES = [
  {id:'z1', desc:"The help/victory — nasr: Allah's divine assistance coming to the believers (110:1)"},
  {id:'z2', desc:"The opening/conquest — fatḥ: specifically the Conquest of Mecca 8 AH (110:1)"},
  {id:'z3', desc:"They enter — people flowing into Islam after the victory (110:2)"},
  {id:'z4', desc:"In crowds/groups — afwāj: masses, not individuals; thousands at once (110:2)"},
  {id:'z5', desc:"So glorify — respond to victory with tasbih, not pride (110:3)"},
  {id:'z6', desc:"And seek His forgiveness — victory leads to MORE humility and tawbah (110:3)"}
];

const S2_QUIZ = [
  {q:'What is "nasrullahi wal-fath" (110:1)?',
   opts:['The punishment of Allah and the earthquake','The help/victory of Allah and the opening/conquest','The angels of Allah and the revelation','The Book of Allah and its clear message'],
   correct:1},
  {q:'What event did An-Nasr foretell? (Historically)',
   opts:['The Battle of Badr','The conquest of Jerusalem','The Conquest of Mecca in 8 AH','The Battle of the Trench'],
   correct:2},
  {q:'What did people do in "afwaja" (110:2)?',
   opts:['They fled and became enemies','They entered the religion of Allah in crowds/groups','They asked for peace treaties','They joined the army of Islam'],
   correct:1},
  {q:'Why is this surah called the "farewell surah"?',
   opts:['It was revealed at the last pilgrimage','It signalled to the Prophet ﷺ that his mission was completing and his time was near','It contains the last command ever given','It was the last surah memorised by the companions'],
   correct:1},
];

const S3_EVENTS_CORRECT = [
  {id:'n1', text:'🏆 The victory of Allah and the Fath (Conquest of Mecca) arrives in 8 AH'},
  {id:'n2', text:'🕋 The Prophet ﷺ enters Mecca — the city that drove him out now opens its doors'},
  {id:'n3', text:'👥 People enter the deen of Allah in masses/groups — thousands embrace Islam'},
  {id:'n4', text:'🙏 Command: "Fasabbih bi-hamdi rabbika" — Glorify your Lord with His praise'},
  {id:'n5', text:'🤲 "Wastaghfirhu" — and seek His forgiveness — victory is not arrogance'},
  {id:'n6', text:'⭐ "Innahu kana tawwaba" — Indeed He is Ever-Accepting of Repentance'},
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

const S4_QUIZ = [
  {q:'What does "fasabbih bi-hamdi rabbika" (110:3) command?',
   opts:['Celebrate and be proud of the victory','Glorify Allah with His praise — tasbih and hamd','Give out wealth to the poor','Continue fighting until complete peace'],
   correct:1},
  {q:'Why does Allah command ISTIGHFAR (forgiveness) after victory?',
   opts:['Because sins were committed in battle','So that victory doesn\'t lead to arrogance — stay humble before Allah','Because the companions were worried','To prepare for the next battle'],
   correct:1},
  {q:'What is "innahu kana tawwaba" (110:3)?',
   opts:['He is the All-Knowing','He is Ever-Accepting of Repentance (Tawwab)','He is the Most Powerful','He is the King of kings'],
   correct:1},
  {q:'What is the powerful lesson about responding to success and victory?',
   opts:['Increase your worldly goals after each victory','Celebrate loudly and share the news widely','Respond to every success with MORE worship, gratitude, and seeking forgiveness','Rest and take a break after each achievement'],
   correct:2},
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
  const sky=st?'#060e08':'#020804',acc=st?'#80e090':'#50b050';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=st?'#162e18':'#081808';ctx.fillRect(0,H*0.65,W,H*0.35);
  if(n>=1){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('🕋',W/2,H*0.45);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('Conquest of Mecca — 8 AH',W/2,H*0.62);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AN-NASR COMPLETE! 🏆':`An-Nasr — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
