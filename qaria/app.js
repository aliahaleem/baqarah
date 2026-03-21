'use strict';
/* Surah Al-Qaria (101) — The Striking Hour */
window.STORAGE_KEY = 'qariaQuestSave';
window.state = window.buildDefaultState(5);

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'💥', title:'Hour Strikes',   msg:"SubhanAllah! 'Al-Qaria! Mal-Qaria? Wa ma adraka mal-Qaria?' The Striking Hour! What is the Striking Hour? And what can make you know what it is? The repetition builds dread — this is coming, and it is MORE than you can imagine!"},
  3:{xp:80, gems:3, icon:'📋', title:'Story Ordered',  msg:"MashAllah! You ordered the Day of Al-Qaria correctly — from the strike to the scattered moths to the carded wool to the weighing of the scales!"},
  4:{xp:85, gems:3, icon:'⚖️', title:'Scales Known',   msg:"SubhanAllah! Heavy scales → comfortable life in high Jannah. Light scales → the abyss of Hawiyah — whose mother is a blazing fire! Two outcomes. Two eternities!"},
  5:{xp:100, gems:4, icon:'🔥', title:'Al-Qaria Complete', msg:"Allahu Akbar! Al-Qaria complete! 'Ummuhul hawiyah — wa ma adraka ma hiyah — narun hamiyah.' May Allah protect us from the fire that blazes and may our scales be heavy with good deeds! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s101', surahName:'Al-Qaria', surahArabic:'القارعة', totalLevels:5, rewards:REWARDS,
  tileIcons:['📖','💥','📋','⚖️','🔥'], tileLabels:['Word by Word','The Strike','Story Order','The Scales','Hawiyah'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Qaria — The Striking Hour! The Day strikes like a hammer. People scatter like moths. Mountains become fluffed wool. Then the scales: heavy = Jannah. Light = Hawiyah (Hellfire). 5 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/5 done. The scales await! ⚖️`,
    complete:n=>`MashAllah, ${n}! Al-Qaria complete! May our scales of deeds be heavy on that Day! Ameen! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'101:1 — الْقَارِعَةُ', words:[
    {ar:'الْقَارِعَةُ', tr:'al-qāriʿah', en:'the Striking Hour', freq:4},
  ]},
  {label:'101:2 — مَا الْقَارِعَةُ', words:[
    {ar:'الْقَارِعَةُ', tr:'al-qāriʿah', en:'the Striking Hour', freq:4},
    'ma',
  ]},
  {label:'101:3 — وَمَا أَدْرَاكَ مَا الْقَارِعَةُ', words:[
    {ar:'الْقَارِعَةُ', tr:'al-qāriʿah', en:'the Striking Hour', freq:4},
    'ma',
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'can make you know', freq:13},
    {ar:'وَمَا', tr:'wa-mā', en:'and what', freq:500},
  ]},
  {label:'101:4 — يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ', words:[
    {ar:'الْمَبْثُوثِ', tr:'al-mabthūth', en:'scattered', freq:1},
    {ar:'كَالْفَرَاشِ', tr:'kal-farāsh', en:'like moths', freq:1},
    {ar:'النَّاسُ', tr:'al-nās', en:'the people', freq:241},
    {ar:'يَكُونُ', tr:'yakūnu', en:'will be', freq:200},
    'yawma',
  ]},
  {label:'101:5 — وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنفُوشِ', words:[
    {ar:'الْمَنفُوشِ', tr:'al-manfūsh', en:'fluffed up', freq:1},
    {ar:'كَالْعِهْنِ', tr:'kal-ʿihn', en:'like wool', freq:1},
    'al-jibal-u',
    {ar:'وَتَكُونُ', tr:'wa-takūnu', en:'and will be', freq:200},
  ]},
  {label:'101:6 — فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ', words:[
    {ar:'مَوَازِينُهُ', tr:'mawāzīnuhu', en:'his scales', freq:3},
    {ar:'ثَقُلَتْ', tr:'thaqulat', en:'are heavy', freq:2},
    'man',
    {ar:'فَأَمَّا', tr:'fa-ammā', en:'so as for', freq:18},
  ]},
  {label:'101:7 — فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ', words:[
    {ar:'رَّاضِيَةٍ', tr:'rāḍiyah', en:'pleasant / satisfied', freq:3},
    {ar:'عِيشَةٍ', tr:'ʿīshah', en:'a life', freq:2},
    'fi',
    {ar:'فَهُوَ', tr:'fa-huwa', en:'then he (will be)', freq:526},
  ]},
  {label:'101:8 — وَأَمَّا مَن خَفَّتْ مَوَازِينُهُ', words:[
    {ar:'مَوَازِينُهُ', tr:'mawāzīnuhu', en:'his scales', freq:3},
    {ar:'خَفَّتْ', tr:'khaffat', en:'are light', freq:1},
    'man',
    {ar:'وَأَمَّا', tr:'wa-ammā', en:'but as for', freq:18},
  ]},
  {label:'101:9 — فَأُمُّهُ هَاوِيَةٌ', words:[
    {ar:'هَاوِيَةٌ', tr:'hāwiyah', en:'Hawiyah (the Abyss)', freq:1},
    {ar:'فَأُمُّهُ', tr:'fa-ummuhu', en:'then his abode/mother', freq:1},
  ]},
  {label:'101:10 — وَمَا أَدْرَاكَ مَا هِيَهْ', words:[
    {ar:'هِيَهْ', tr:'hiyah', en:'it is', freq:1},
    'ma',
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'can make you know', freq:13},
    {ar:'وَمَا', tr:'wa-mā', en:'and what', freq:500},
  ]},
  {label:'101:11 — نَارٌ حَامِيَةٌ', words:[
    {ar:'حَامِيَةٌ', tr:'ḥāmiyah', en:'intensely hot', freq:2},
    {ar:'نَارٌ', tr:'nār', en:'a Fire', freq:145},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  {q:'What does "Al-Qaria" mean?',
   opts:['The Great Earthquake','The Striking Calamity / The Striking Hour','The Final Trumpet','The Day of Accounting'],
   correct:1},
  {q:'How will people appear on the Day of Al-Qaria? (101:4)',
   opts:['Like warriors marching in rows','Like scattered moths / butterflies','Like peaceful sleeping children','Like waves of the ocean'],
   correct:1},
  {q:'How will the mountains appear on the Day of Al-Qaria? (101:5)',
   opts:['Like towering unshakeable walls','Like carded / fluffed colourful wool','Like burning rivers of lava','Like dust scattered by wind'],
   correct:1},
  {q:'What question is repeated twice in the surah opening? (101:1-3)',
   opts:['"When will it happen?"','"Who will be saved?"','"What is Al-Qaria?" — asked twice for emphasis','\\The time and place of Al-Qaria'],
   correct:2},
];

const S2_EVENTS_CORRECT = [
  {id:'q1', text:'💥 Al-Qaria strikes! The Day is announced three times with building dread (101:1-3)'},
  {id:'q2', text:'🦋 People are scattered like moths — helpless, overwhelmed (101:4)'},
  {id:'q3', text:'🏔️ Mountains become like carded/fluffy colourful wool — nothing solid remains (101:5)'},
  {id:'q4', text:'⚖️ The scales are set up — heavy with good deeds leads to a pleasant life (101:6-7)'},
  {id:'q5', text:'🌟 Heavy scales: a pleased and comfortable life in the highest garden (101:7)'},
  {id:'q6', text:'🔥 Light scales: Hawiyah — his mother is a blazing fire! (101:8-11)'},
];

const S3_QUIZ = [
  {q:'What happens to the person whose scales are heavy with good deeds? (101:7)',
   opts:['They enter a comfortable pleasant life — Jannah','They are given one more chance to do good','They sleep peacefully until Fajr','They are asked to account for every sin'],
   correct:0},
  {q:'What happens to the person whose scales are light? (101:8)',
   opts:['They enter a mild punishment first','His home/mother will be Hawiyah','They are sent back to do more good deeds','They wait in a middle place'],
   correct:1},
  {q:'What does "hawiyah" literally suggest?',
   opts:['A high mountain peak','A deep abyss — something you fall into','A wide open desert','A cold dark cave'],
   correct:1},
  {q:'How is Hawiyah described in 101:11?',
   opts:['A cold and dark prison','Dark and completely silent','A blazing, intensely hot fire','Filled with boiling water'],
   correct:2},
];

const S4_QUIZ = [
  {q:'What makes scales HEAVY on the Day of Al-Qaria?',
   opts:['Physical size and weight','Good deeds, faith, and righteous actions','The number of prayers performed','The amount of charity given'],
   correct:1},
  {q:'What phrase is used to intensify the description of Hawiyah? (101:10)',
   opts:['"It is the greatest punishment"','"Wa ma adraka ma hiyah" — What will make you know what it is?','\\It cannot be described','\\It is beyond imagination'],
   correct:1},
  {q:'What does the image of "moths scattered" tell us about people on that Day?',
   opts:['People will be happy and flying freely','People will be completely overwhelmed and directionless','People will be running towards safety','People will know exactly where to go'],
   correct:1},
  {q:'What is the overall message of Al-Qaria about preparation?',
   opts:['Focus only on avoiding major sins','Fill your scales with good deeds now — they will be weighed!','Worry only about the last days before death','Trust that all Muslims will have heavy scales'],
   correct:1},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerQuiz(2, S1_QUIZ);
window.registerOrder(3, S2_EVENTS_CORRECT);
window.registerQuiz(4, S3_QUIZ);
window.registerQuiz(5, S4_QUIZ);

function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1a0408':'#100002',acc=st?'#f86050':'#d03020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// scales visual
    ctx.strokeStyle=`rgba(255,160,100,0.6)`;ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(W/2,40);ctx.lineTo(W/2-80,90);ctx.stroke();
    ctx.beginPath();ctx.moveTo(W/2,40);ctx.lineTo(W/2+80,90);ctx.stroke();
    ctx.fillStyle=st?'#c02040':'#900820';ctx.fillRect(W/2-100,90,40,20);
    ctx.fillStyle=st?'#40a060':'#208040';ctx.fillRect(W/2+60,80,40,20);}
  if(n>=3){ctx.fillStyle=acc;ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('⚖️ Heavy = 🌟 Light = 🔥',W/2,H*0.75);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-QARIA COMPLETE! ⚖️':`Al-Qaria — ${n}/5 levels`,W/2,14);ctx.textAlign='left';
};
