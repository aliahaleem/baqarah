'use strict';
/* Surah Al-Humazah (104) — The Slanderer */
window.STORAGE_KEY = 'humazahQuestSave';
window.state = window.buildDefaultState(4);

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'👆', title:'Slanderer Named',  msg:"SubhanAllah! 'Waylul li-kulli humazatin lumazah!' Woe to every backbiter and slanderer! Two different words: humazah = one who criticises with gestures and mocking, lumazah = one who slanders behind the back. Both condemned!"},
  3:{xp:80, gems:3, icon:'💰', title:'Wealth Delusion',  msg:"MashAllah! His wealth makes him think he will live forever! The delusion of wealth: 'Ya\'sabu anna malahu akhladah.' He thinks his money made him IMMORTAL. How many people live as if they'll never die?"},
  4:{xp:90, gems:4, icon:'🔥', title:'Al-Humazah Complete', msg:"Allahu Akbar! Al-Humazah complete! Hutamah — the Crushing Fire! Closed over them, tied in extended columns. May Allah protect us from slander, from the delusion of wealth, and from Hutamah! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s104', surahName:'Al-Humazah', surahArabic:'الهمزة', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','👆','💰','🔥'], tileLabels:['Word by Word','The Slanderer','Wealth Delusion','Hutamah'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Humazah — The Slanderer! Woe to the backbiter who hoards wealth thinking it will make them live forever. Then the crushing fire — Hutamah! 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. Avoid the path of the slanderer! 👆`,
    complete:n=>`MashAllah, ${n}! Al-Humazah complete! Guard your tongue, give your wealth, and remember mortality! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'104:1 — وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ', words:[
    {ar:'لُّمَزَةٍ', tr:'lumazah', en:'backbiter', freq:1},
    {ar:'هُمَزَةٍ', tr:'humazah', en:'slanderer', freq:1},
    {ar:'لِّكُلِّ', tr:'li-kulli', en:'to every', freq:99},
    'waylun',
  ]},
  {label:'104:2 — الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ', words:[
    {ar:'وَعَدَّدَهُ', tr:'wa-ʿaddadahu', en:'and counted it', freq:1},
    {ar:'مَالًا', tr:'mālan', en:'wealth', freq:85},
    {ar:'جَمَعَ', tr:'jamaʿa', en:'who amassed', freq:29},
    'alladhi',
  ]},
  {label:'104:3 — يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ', words:[
    {ar:'أَخْلَدَهُ', tr:'akhladahu', en:'will make him immortal', freq:1},
    {ar:'مَالَهُ', tr:'mālahu', en:'his wealth', freq:15},
    {ar:'أَنَّ', tr:'anna', en:'that', freq:407},
    {ar:'يَحْسَبُ', tr:'yaḥsabu', en:'he thinks', freq:12},
  ]},
  {label:'104:4 — كَلَّا لَيُنبَذَنَّ فِي الْحُطَمَةِ', words:[
    {ar:'الْحُطَمَةِ', tr:'al-ḥuṭamah', en:'the Crusher (Hellfire)', freq:2},
    'fi',
    {ar:'لَيُنبَذَنَّ', tr:'la-yunbadhanna', en:'he will surely be thrown', freq:1},
    'kalla',
  ]},
  {label:'104:5 — وَمَا أَدْرَاكَ مَا الْحُطَمَةُ', words:[
    {ar:'الْحُطَمَةُ', tr:'al-ḥuṭamah', en:'the Crusher', freq:2},
    'ma',
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'can make you know', freq:13},
    {ar:'وَمَا', tr:'wa-mā', en:'and what', freq:2005},
  ]},
  {label:'104:6 — نَارُ اللَّهِ الْمُوقَدَةُ', words:[
    {ar:'الْمُوقَدَةُ', tr:'al-mūqadah', en:'ever-burning', freq:1},
    'allah',
    {ar:'نَارُ', tr:'nār', en:'the Fire of', freq:145},
  ]},
  {label:'104:7 — الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ', words:[
    {ar:'الْأَفْئِدَةِ', tr:'al-afʾidah', en:'the hearts', freq:5},
    {ar:'عَلَى', tr:'ʿalā', en:'over / upon', freq:1445},
    {ar:'تَطَّلِعُ', tr:'taṭṭaliʿu', en:'it mounts up / rises', freq:1},
    {ar:'الَّتِي', tr:'allatī', en:'which', freq:270},
  ]},
  {label:'104:8 — إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌ', words:[
    {ar:'مُّؤْصَدَةٌ', tr:'muʾṣadah', en:'closed / sealed', freq:2},
    {ar:'عَلَيْهِم', tr:'ʿalayhim', en:'over them', freq:140},
    {ar:'إِنَّهَا', tr:'innahā', en:'indeed it is', freq:15},
  ]},
  {label:'104:9 — فِي عَمَدٍ مُّمَدَّدَةٍ', words:[
    {ar:'مُّمَدَّدَةٍ', tr:'mumaddadah', en:'extended / outstretched', freq:1},
    {ar:'عَمَدٍ', tr:'ʿamadin', en:'columns / pillars', freq:2},
    'fi',
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  {q:'What does "waylun" at the start of 104:1 express?',
   opts:['Congratulations and good news','A greeting of peace','Woe and severe warning — a threat of punishment','A mild reminder'],
   correct:2},
  {q:'What is "humazah" (104:1)?',
   opts:['One who gives much charity','One who criticises, mocks, speaks badly (backbiter)','One who forgets to pray','One who is arrogant in wealth'],
   correct:1},
  {q:'What does the slanderer DO with his wealth? (104:2)',
   opts:['Gives it all in charity','Collects and counts it repeatedly','Spends it on the poor','Donates it to build mosques'],
   correct:1},
  {q:'What delusion does wealth create in him? (104:3)',
   opts:['He thinks he is smarter than others','He thinks his wealth made him immortal','He thinks he deserves more','He thinks he will always be healthy'],
   correct:1},
];

const S2_ITEMS = [
  {id:'h1', text:'الْحُطَمَةُ',              zone:'z1'},
  {id:'h2', text:'تَطَّلِعُ عَلَى\nالْأَفْئِدَةِ', zone:'z2'},
  {id:'h3', text:'مُّؤْصَدَةٌ',             zone:'z3'},
  {id:'h4', text:'عَمَدٍ\nمُّمَدَّدَةٍ',    zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'The Crushing Fire — "Hutamah" means something that crushes and destroys (104:4)'},
  {id:'z2', desc:'The fire rises over the hearts — penetrates to what is deepest (104:7)'},
  {id:'z3', desc:'"Mu\'sadah" — closed/shut tight over them — no escape (104:8)'},
  {id:'z4', desc:'"In extended columns" — tied up in them (104:9)'},
];

const S3_QUIZ = [
  {q:'What is the fire of Hutamah described as doing to hearts? (104:7)',
   opts:['Burning the outer body only','Rising over their hearts — penetrating to the core','Filling their mouths with fire','Burning their hands and feet first'],
   correct:1},
  {q:'What does "mu\'sadah" (104:8) describe about Hutamah?',
   opts:['It burns extra hot','It is closed and locked shut over them','It makes a crushing sound','It is higher than the sky'],
   correct:1},
  {q:'What is the key cause leading to Hutamah?',
   opts:['Poverty and need','Slander + hoarding wealth + delusion of immortality','Ignorance of Islam','Missing the prayers'],
   correct:1},
  {q:'What lesson should Muslims take from "ya\'sabu anna malahu akhlada"?',
   opts:['Wealth should be invested wisely','Wealth is a test — it should not make us forget death','Rich Muslims are blessed with extra time','Wealth helps us worship Allah better'],
   correct:1},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerQuiz(2, S1_QUIZ);
window.registerMatch(3, S2_ITEMS,S2_ZONES);
window.registerQuiz(4, S3_QUIZ);

function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#180a04':'#100600',acc=st?'#f8a040':'#e08020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='20px serif';ctx.textAlign='center';ctx.fillText('وَيْلٌ',W/2,H*0.45);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"WOE to every slanderer!"',W/2,H*0.6);ctx.textAlign='left';}
  if(n>=2){const fp=0.4+Math.sin(Date.now()*0.002)*0.2;ctx.fillStyle=`rgba(255,100,30,${fp})`;ctx.fillRect(0,H*0.75,W,H*0.25);}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AL-HUMAZAH COMPLETE! 🔥':`Al-Humazah — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
