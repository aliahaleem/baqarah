'use strict';
/* Surah An-Nas (114) — Mankind */
window.STORAGE_KEY = 'nasQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,                  // word-by-word matching
  s2Answers:{}, s2Checked:false,    // quiz: three titles
  s3Checked:false,                  // drag: key terms
  s4Answers:{}, s4Checked:false,    // quiz: the whisperer
  s5Answers:{}, s5Checked:false,    // quiz: final — Quran complete
};

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'An-Nas Words Learned!',
     msg:"MashAllah! You matched every Arabic word of An-Nas! رَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ — Lord of mankind, King of mankind, God of mankind! Now when you say these words for protection, you know their full meaning. SubhanAllah!"},
  2:{xp:70, gems:3, icon:'🌍', title:'Three Titles Known!',
     msg:"SubhanAllah! Three titles of Allah — Rabb (Lord and Sustainer), Malik (King), Ilah (God) — all belonging to MANKIND. He is Lord of us, King of us, God of us. Three angles of His authority over humanity!"},
  3:{xp:80, gems:3, icon:'😈', title:'Whisperer Exposed!',
     msg:"MashAllah! 'Al-waswas al-khannas' — the whisperer who withdraws/slinks away. Shaytan whispers when you forget Allah — but slinks away when you remember. So dhikr IS your weapon against waswas!"},
  4:{xp:85, gems:3, icon:'🛡️', title:'Hidden Evil Understood!',
     msg:"SubhanAllah! 'Alladhi yuwaswisu fi sudur al-nas.' He whispers into the CHESTS (hearts/minds) of mankind. The battlefield is your heart. The enemy whispers doubts, desires, distractions. Seek refuge in Rabb al-Nas, Malik al-Nas, Ilah al-Nas!"},
  5:{xp:100, gems:5, icon:'✨', title:'AN-NAS COMPLETE! QURAN COMPLETE!',
     msg:"Allahu Akbar! AN-NAS COMPLETE — AND WITH IT, THE FULL QURAN QUEST! The Quran ends with humanity seeking refuge in Allah from the hidden whisperer. May every day of your life begin and end with this surah! Ameen! 🏆🎊"},
};

window.SURAH_CONFIG = {
  id:'s114', surahName:'An-Nas', surahArabic:'الناس', totalLevels:5, rewards:REWARDS,
  tileIcons:['📖','🌍','😈','🛡️','✨'],
  tileLabels:['Word by Word','Three Titles','Whisperer','The Chests','Quran Complete!'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah An-Nas — Mankind! THE FINAL SURAH of the Quran! Start by learning every Arabic word, then master the three titles of Allah and the enemy within. 5 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/5 done. Almost at the end of the entire Quran! 🌍`,
    complete:n=>`MashAllah, ${n}! AN-NAS COMPLETE — and with it, Juz Amma is DONE! "Qul a'udhu bi-rabb al-nas." May Allah protect you from all evil and waswas! Ameen! 🏆🎊`,
  },
};

/* ────────────────────────────────────────────────────────
   LEVEL 1 — Word by Word flip cards (114:1-6)
   ──────────────────────────────────────────────────────── */
const WBW_DATA = [
  {label:'Verse 1 — قُلْ أَعُوذُ بِرَبِّ النَّاسِ', words:[
    'al-nas',
    {ar:'بِرَبِّ', tr:'bi-rabb', en:'in the Lord of'},
    'a-udhu','qul',
  ]},
  {label:'Verse 2 — مَلِكِ النَّاسِ', words:[
    'al-nas','malik',
  ]},
  {label:'Verse 3 — إِلَٰهِ النَّاسِ', words:[
    'al-nas','ilah',
  ]},
  {label:'Verse 4 — مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', words:[
    'al-khannas','al-waswas','sharr','min',
  ]},
  {label:'Verse 5 — الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', words:[
    'al-nas','fi-sudur','yuwas-wis','alladhi',
  ]},
  {label:'Verse 6 — مِنَ الْجِنَّةِ وَالنَّاسِ', words:[
    {ar:'وَالنَّاسِ', tr:'wal-nās', en:'and mankind'},
    'al-jinn',
    {ar:'مِنَ', tr:'mina', en:'from among'},
  ]},
];

/* ────────────────────────────────────────────────────────
   LEVEL 1 — Word by Word: Match Arabic word to English
   ──────────────────────────────────────────────────────── */
const S1_ITEMS = [
  {id:'w1', text:'مَلِكِ',        zone:'z1'},
  {id:'w2', text:'إِلَٰهِ',      zone:'z2'},
  {id:'w3', text:'الْوَسْوَاسِ', zone:'z3'},
  {id:'w4', text:'الْخَنَّاسِ', zone:'z4'},
  {id:'w5', text:'صُدُورِ',      zone:'z5'},
  {id:'w6', text:'الْجِنَّةِ',  zone:'z6'},
];
const S1_ZONES = [
  {id:'z1', desc:'King, Sovereign — Malik: He who owns and rules with complete authority (114:2)'},
  {id:'z2', desc:'God, object of worship — Ilah: He alone deserves to be worshipped (114:3)'},
  {id:'z3', desc:'The whisperer — al-waswas: one who plants whispering thoughts of doubt (114:4)'},
  {id:'z4', desc:'The withdrawer — al-khannas: who slinks away when Allah is remembered (114:4)'},
  {id:'z5', desc:'Chests/hearts — sudur: the battlefield where Shaytan whispers doubts (114:5)'},
  {id:'z6', desc:'The Jinn — al-jinnah: unseen beings who can also whisper evil (114:6)'},
];

/* ────────────────────────────────────────────────────────
   LEVEL 2 — Quiz: Three Titles (114:1-3)
   ──────────────────────────────────────────────────────── */
const S2_QUIZ = [
  {q:'What is the first title of Allah in 114:1?',
   opts:['Malik al-Nas — King and Sovereign of Mankind','Rabb al-Nas — Lord and Sustainer of Mankind','Ilah al-Nas — God and object of worship','Rahman al-Nas — Mercy given to all Mankind'],
   correct:1},
  {q:'What does "Malik al-Nas" (114:2) mean?',
   opts:['Lord and sustainer of all of mankind','King and sovereign owner of mankind','God and object of worship of mankind','Creator and former of all of mankind'],
   correct:1},
  {q:'What does "Ilah al-Nas" (114:3) mean?',
   opts:['Master and controller of mankind','Protector and guardian of mankind','God of mankind — the one worthy of worship','The one who guides mankind to truth'],
   correct:2},
  {q:'Why are THREE titles used instead of just one name?',
   opts:['For poetic rhyme and rhythm only','Each covers a different aspect: Rabb=nurture, Malik=authority, Ilah=worship','To make the surah easier to memorise','They all mean exactly the same thing'],
   correct:1},
];

/* ────────────────────────────────────────────────────────
   LEVEL 3 — Drag & Drop: Match key terms
   ──────────────────────────────────────────────────────── */
const S3_ITEMS = [
  {id:'n1', text:'Al-Waswas',        zone:'z1'},
  {id:'n2', text:'Al-Khannas',       zone:'z2'},
  {id:'n3', text:'Yuwaswisu\nfil-sudur', zone:'z3'},
  {id:'n4', text:'Min al-jinnati\nwal-nas', zone:'z4'},
];
const S3_ZONES = [
  {id:'z1', desc:'"The whisperer" — Shaytan who plants whispers of doubt and desire (114:4)'},
  {id:'z2', desc:'"Who withdraws/slinks" — retreats when Allah is remembered (114:4)'},
  {id:'z3', desc:'"Whispers into the chests/hearts" — the battlefield is the heart (114:5)'},
  {id:'z4', desc:'"From among jinn and men" — evil whispering comes from both (114:6)'},
];

/* ────────────────────────────────────────────────────────
   LEVEL 4 — Quiz: The Whisperer (114:4-6)
   ──────────────────────────────────────────────────────── */
const S4_QUIZ = [
  {q:'What does "al-khannas" (from khunuus) describe about Shaytan?',
   opts:['He is small in size and always hidden','He withdraws and retreats when Allah is remembered','He whispers only during sleep and dreams','He hides specifically in dark and quiet places'],
   correct:1},
  {q:'Where does Shaytan whisper according to 114:5?',
   opts:['In our dreams and visions at night','In our physical ears and eyes','In our chests/hearts — sudur — our inner selves','In our mouths and in our speech'],
   correct:2},
  {q:'What is the most effective shield against waswas?',
   opts:['Actively fighting and engaging the thoughts','Keeping yourself very busy with work','Dhikr of Allah — remembering Allah makes Shaytan retreat','Sleeping more to avoid any disturbing thoughts'],
   correct:2},
  {q:'An-Nas says waswas comes "from jinn AND men" — what does this teach?',
   opts:['Jinn are always more powerful than men','Evil whispering can come from humans too — bad company, media, propaganda','Men are incapable of causing any spiritual harm','Only jinn are able to cause true waswas'],
   correct:1},
];

/* ────────────────────────────────────────────────────────
   LEVEL 5 — Final Quiz: Quran Complete! (114:1-6)
   ──────────────────────────────────────────────────────── */
const S5_QUIZ = [
  {q:'Why is it significant that the Quran ENDS with a surah about seeking refuge?',
   opts:['It was revealed last so it was placed last','The ending mirrors the beginning: Fatihah seeks guidance, An-Nas seeks protection — the arc of life','It was the easiest surah for people to memorise','Surahs are arranged only by their length'],
   correct:1},
  {q:'The Prophet ﷺ recited Al-Falaq and An-Nas together — what are they called?',
   opts:['Al-Mu\'awwidhatan — The Two Protection Surahs','Al-Mukhlisat — The Two Surahs of Purity','Al-Qasiran — The Two Short Surahs','Al-Mutashabihan — The Two Similar Surahs'],
   correct:0},
  {q:'An-Nas seeks refuge as Rabb, Malik, and Ilah — what do these three cover?',
   opts:['Allah\'s relationship to the past, present, and future','Creation, guidance, and day of judgement','All our relationships with Allah: nurturing, authority, and worship','Youth, adulthood, and old age of mankind'],
   correct:2},
  {q:'Completing Juz Amma — what is the best next step for a young Muslim?',
   opts:['Rest — you have finished all your Quran studies','Celebrate and keep it as a memory only','Revise deeply, memorise with meaning, and explore more surahs!','Only recite what you learned on Fridays'],
   correct:2},
];

function renderSection1Game(){if(window.renderWBW)renderWBW('wbw-display',WBW_DATA,'wbw-reveal-btn');renderDragDrop(1,S1_ITEMS,S1_ZONES);}
function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}
function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}
function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}
function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}
function checkSection5(){checkQuiz(5,S5_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#100820':'#080414',acc=st?'#d0a0f8':'#b080d0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  const cols=['#e8c090','#c09060','#f0d0a0','#b08040','#d0a070'];
  if(n>=1){ctx.fillStyle=acc;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('قُلْ أَعُوذُ بِرَبِّ النَّاسِ',W/2,H*0.25);ctx.textAlign='left';}
  if(n>=2){for(let i=0;i<12;i++){const x=W*0.05+i*45,y=H*0.55,c=cols[i%5];ctx.fillStyle=c;ctx.beginPath();ctx.arc(x+12,y,6,0,Math.PI*2);ctx.fill();ctx.fillRect(x+7,y+6,10,18);}}
  if(n>=3){const rg=ctx.createRadialGradient(W/2,H/2,10,W/2,H/2,60);rg.addColorStop(0,`rgba(180,130,240,0.3)`);rg.addColorStop(1,'transparent');ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);}
  if(n>=5){ctx.fillStyle=acc;ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('🎊 JUZ AMMA COMPLETE! 🎊',W/2,H*0.35);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=5?'AN-NAS COMPLETE! ✨':`An-Nas — ${n}/5 levels`,W/2,14);ctx.textAlign='left';
};
