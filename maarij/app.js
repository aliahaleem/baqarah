'use strict';
/* Surah Al-Maarij (70) — The Ascending Stairways */
window.STORAGE_KEY = 'maarijQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'🪜', title:'Day of 50,000 Years',   msg:"SubhanAllah! A disbeliever asks mockingly — bring on this punishment! Then Allah reveals: the Day is 50,000 years long. But for the believers? It will feel like an afternoon prayer. Patient, beautiful patience — Sabrun jameel. Time belongs to Allah!"},
  2:{xp:80, gems:3, icon:'😰', title:'Nature of Man Known',   msg:"MashAllah! 'Inna al-insana khuliqa halu\'a' — man was created anxious! When evil touches him, he panics. When good touches him, he withholds. This is our default nature. But the believers OVERCOME this nature through prayer, charity, belief in accountability, and humility!"},
  3:{xp:85, gems:3, icon:'🌟', title:'Believer\'s 7 Traits',  msg:"SubhanAllah! Seven qualities distinguish the believer who escapes halu': they pray, give a right in their wealth to the asker, believe in the Day, fear punishment, guard modesty, honour trusts, and stand by their testimony. These are the builders of paradise!"},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Maarij Complete!',  msg:"ALLAHUMMA BARIK! Al-Maarij complete! The ascending stairways lead to Allah. Patient, beautiful patience — Sabrun jameel. The Day of 50,000 years. Man's anxious nature — and how faith conquers it. May Allah make us among those who ascend to Him! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s70', surahName:'Al-Maarij', surahArabic:'المعارج', totalLevels:4, rewards:REWARDS,
  tileIcons:['🪜','😰','🌟','✨'],
  tileLabels:['50,000 Years','Human Nature','7 Traits','The Ascent'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Maarij — The Ascending Stairways! A 50,000 year Day. Man's anxious nature. 7 believer traits. The disbeliever's fate. 4 levels of powerful lessons!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Keep ascending the stairways! 🪜`,
    complete: name=>`MashAllah, ${name}! Al-Maarij complete! May Allah raise us to His ascending stairways! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What is "Dhu al-Maarij" (70:3), the title of Allah in this surah?',
   opts:['Lord of all existing creation','Owner of the Ascending Stairways','The All-Knowing and All-Wise','Master of the Day of Reckoning'],
   correct:1},
  {q:'How long does the Day of Judgment last according to 70:4?',
   opts:['A thousand years by your counting','A hundred thousand years long','Fifty thousand years in measure','Ten thousand years without rest'],
   correct:2},
  {q:'What does "fa-sabrun jamilun" (70:5) mean?',
   opts:['Therefore be patient with beautiful patience','Therefore give charity with beautiful gratitude','Therefore pray with beautiful devotion and focus','Therefore trust in Allah with complete certainty'],
   correct:0},
  {q:'What does 70:4 say about what ascends to Allah?',
   opts:['The souls of believers on the Day of Judgment','The angels and the Spirit — in a Day of great measure','All the deeds of mankind in glowing light','The prayers of the righteous through the seven heavens'],
   correct:1},
];

const S2_ITEMS = [
  {id:'h1', text:'😱 Anxious when\nevil touches him', zone:'z1'},
  {id:'h2', text:'🤑 Withholds when\ngood comes to him', zone:'z2'},
  {id:'h3', text:'🙏 Except those\nwho pray regularly', zone:'z3'},
  {id:'h4', text:'💰 Except those\nwho give a right\nin their wealth',  zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Idha massahu al-sharru jazu\'a" — when evil touches him, he panics and despairs (70:20)'},
  {id:'z2', desc:'"Wa idha massahu al-khairu manu\'a" — when good touches him, he is miserly and stingy (70:21)'},
  {id:'z3', desc:'Those who establish prayer are EXEMPT from halu\' — "illa al-musalleen" (70:22-23)'},
  {id:'z4', desc:'Those in whose wealth there is a known right for the asker and the deprived (70:24-25)'},
];

const S3_QUIZ = [
  {q:'What does "wa alladhina fi amwalihim haqqun ma\'loom" (70:24-25) refer to?',
   opts:['Payment of Zakat once a year to the treasury','A known right in their wealth for the asker and deprived','Giving sadaqah only when asked in the mosque','Spending wealth only in the way of Allah in jihad'],
   correct:1},
  {q:'Which trait among the 7 mentioned involves guarding private parts (70:29-31)?',
   opts:['Believing in the Day of Judgment','Being faithful to trusts and promises','Guarding their chastity — except with spouse','Standing firm in their testimony always'],
   correct:2},
  {q:'What does "wa alladhina hum bi-shahadatihim qa\'imoon" (70:33) mean?',
   opts:['They stand in prayer during the night hours','Those who are upright in their testimony','They witness the suffering of the poor with care','Those who give testimony for Allah\'s sake alone'],
   correct:1},
  {q:'How does the surah describe the fleeing of the disbeliever on Judgment Day (70:10-14)?',
   opts:['He runs to his family for shelter and safety','He wishes to ransom himself with his own children','He hides in the mountains to escape the reckoning','He prostrates to Allah but his prayer is rejected'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'m1', text:'🪜 Allah owns the ascending stairways — He raises angels and the Spirit (70:3-4)'},
  {id:'m2', text:'😰 Man is created anxious by nature — panics at hardship, withholds in ease (70:19-21)'},
  {id:'m3', text:'🙏 Except the believers who pray, give zakah, and guard their trusts (70:22-35)'},
  {id:'m4', text:'🏃 On the Day, the wicked wishes to ransom himself with his family (70:11-14)'},
  {id:'m5', text:'🔥 The disbeliever who denied — hellfire awaits, and no escape (70:15-18)'},
  {id:'m6', text:'✨ The believers are honoured in gardens of paradise (70:35-38)'},
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}
function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderStoryOrder(4,S4_EVENTS_CORRECT);}
function checkSection4(){checkStoryOrder(4,S4_EVENTS_CORRECT);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#041418':'#020c10', acc=st?'#f0c040':'#e0b030';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Stairway
  if(n>=1){for(let i=0;i<8;i++){ctx.fillStyle=`rgba(32,128,160,${0.3+i*0.08})`;ctx.fillRect(W*0.1+i*30,H*0.7-i*22,28,H*0.3+i*22);}}
  // Figure on stair
  if(n>=2){ctx.fillStyle='#c0a080';ctx.beginPath();ctx.arc(W*0.38,H*0.35,10,0,Math.PI*2);ctx.fill();ctx.fillRect(W*0.38-5,H*0.35+10,10,16);}
  // Light from above
  if(n>=3){const g=ctx.createLinearGradient(W*0.5,0,W*0.5,H*0.4);g.addColorStop(0,`rgba(240,200,64,0.5)`);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-MAARIJ COMPLETE 🪜':`Al-Maarij — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};
