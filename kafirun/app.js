'use strict';
/* Surah Al-Kafirun (109) — The Disbelievers */
window.STORAGE_KEY = 'kafirunQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:"MashAllah! You know every word of Surah Al-Kafirun! قُلْ يَا أَيُّهَا الْكَافِرُونَ — Say: O disbelievers! Six verses of absolute clarity — no compromise on tawhid. Now every time you recite it, you understand the bold declaration!"},

  2:{xp:70, gems:3, icon:'🚫', title:'No Compromise',  msg:"SubhanAllah! The Quraysh proposed: 'Worship our gods for one year, we\'ll worship yours for one year.' Allah revealed Al-Kafirun: absolute NO. This surah is called 'Al-Bara\'ah' — the declaration of disavowal from shirk. No negotiation on tawhid!"},
  3:{xp:80, gems:3, icon:'🔄', title:'Repetition Known', msg:"MashAllah! The surah repeats 'la a\'budu ma ta\'budun' — I do not worship what you worship — multiple times. Scholars explain: it refutes PAST, PRESENT, and FUTURE worship of their gods. Triple refusal!"},
  4:{xp:90, gems:4, icon:'✨', title:'Al-Kafirun Complete', msg:"Allahu Akbar! Al-Kafirun complete! 'Lakum dinukum wa liya din.' For you is your religion and for me is mine. A declaration of absolute clarity. No mixing. No compromise. May we hold our deen firmly! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s109', surahName:'Al-Kafirun', surahArabic:'الكافرون', totalLevels:4, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','🚫','🔄','✨'], tileLabels:['Word by Word','Declaration','No Compromise','Clear Deen'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Kafirun — The Disbelievers! A clear, firm, bold declaration: I do not worship what you worship. No compromise on tawhid. The Prophet ﷺ recited this in Fajr and before sleeping. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. Hold firm! 🚫`,
    complete:n=>`MashAllah, ${n}! Al-Kafirun complete! "Lakum dinukum wa liya din." Crystal clarity in deen! 🏆`,
  },
};


/* ─── LEVEL 1: Word by Word flip-card data (uses shared arabic-words.js) ─── */
const WBW_DATA = [
  {label:'Verses 1-2 — قُلْ يَا أَيُّهَا الْكَافِرُونَ · لَا أَعْبُدُ مَا تَعْبُدُونَ', words:[
    'ta-budun','ma','a-budu','la',
    'al-kafirun',
    {ar:'يَا أَيُّهَا',tr:'yā ayyuhā',en:'O you', freq:70},
    'qul',
  ]},
  {label:'Verses 3-5 — وَلَا أَنتُمْ عَابِدُونَ · وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ', words:[
    'abidun-pl',
    {ar:'أَنتُمْ',tr:'antum',en:'you (are)', freq:120},
    'wala',
    'abadttum','ma','abidun',
    {ar:'أَنَا',tr:'anā',en:'I (am)', freq:100},
    'wala',
  ]},
  {label:'Verse 6 — لَكُمْ دِينُكُمْ وَلِيَ دِينِ', words:[
    'dini','waliya','dinukum','lakum',
  ]},
];

const S2_QUIZ = [
  {q:'Why was Surah Al-Kafirun revealed?',
   opts:['A new prayer was being introduced','The Quraysh proposed a year-year worship exchange — worship their gods and they would worship Allah','A disbeliever asked about Islam','The companions needed clarity about interfaith'],
   correct:1},
  {q:'What is the first address in 109:1?',
   opts:['Ya ayyuhannas (O Mankind)','Ya ayyuhal-kafirun (O disbelievers)','Ya ayyuhal-mushrikun (O polytheists)','Ya ayyuhal-munafiqun (O hypocrites)'],
   correct:1},
  {q:'What is the key declaration in 109:2?',
   opts:['I worship only Allah in private','La a\'budu ma ta\'budun — I do not worship what you worship','I will never speak to disbelievers','La ilaha ill Allah — no god but Allah'],
   correct:1},
  {q:'Is there any possibility of compromise suggested in this surah?',
   opts:['Yes — in cases of peace and necessity','Yes — if they convert first','Absolutely none — the surah is a complete refusal','Only if the Prophet ﷺ approves the terms'],
   correct:2},
];

const S3_ITEMS = [
  {id:'kf1', text:'لَا أَعْبُدُ\nمَا تَعْبُدُونَ',             zone:'z1'},
  {id:'kf2', text:'وَلَا أَنتُمْ عَابِدُونَ\nمَا أَعْبُدُ',   zone:'z2'},
  {id:'kf3', text:'وَلَا أَنَا عَابِدٌ\nمَّا عَبَدتُّمْ',     zone:'z3'},
  {id:'kf4', text:'لَكُمْ دِينُكُمْ\nوَلِيَ دِينِ',           zone:'z4'},
];
const S3_ZONES = [
  {id:'z1', desc:'"I do not worship what you worship" — present refusal (109:2)'},
  {id:'z2', desc:'"Nor are you worshippers of what I worship" — their state (109:3)'},
  {id:'z3', desc:'"Nor will I be a worshipper of what you worship" — future refusal (109:4)'},
  {id:'z4', desc:'"For you is your religion and for me is mine" — final declaration (109:6)'},
];

const S4_QUIZ = [
  {q:'Why is Surah Al-Kafirun called "Al-Bara\'ah" (Declaration of Disavowal)?',
   opts:['Because it mentions the Day of Judgement','Because it declares complete disavowal from worshipping anything other than Allah','Because it was revealed at the start of Islam','Because it contains a prohibition on speaking to disbelievers'],
   correct:1},
  {q:'The Prophet ﷺ would recite Al-Kafirun and Al-Ikhlas in which prayer?',
   opts:['In Dhuhr and Asr prayers','In the two rakats of Fajr sunnah and two rakats of witr','In the tarawih prayer only','In the Friday Jumuah prayer'],
   correct:1},
  {q:'What does "lakum dinukum wa liya din" establish?',
   opts:['All religions lead to the same place','Muslims and non-Muslims must cooperate equally','Complete clarity and separation of belief systems — no mixing of worship','Muslims should avoid all contact with non-Muslims'],
   correct:2},
  {q:'How does this surah help Muslims in daily life?',
   opts:['It teaches us to memorise many surahs','It gives clarity when pressured to compromise on beliefs','It teaches us to debate disbelievers effectively','It gives us permission to avoid all social contact'],
   correct:1},
];


function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1a0404':'#100002',acc=st?'#f06050':'#d03020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='10px serif';ctx.textAlign='center';ctx.fillText('لَكُمْ دِينُكُمْ وَلِيَ دِينِ',W/2,H*0.45);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"For you is your religion, for me is mine"',W/2,H*0.6);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-KAFIRUN COMPLETE! 🚫':`Al-Kafirun — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};

window.setupWBWLevel(WBW_DATA, 10);
