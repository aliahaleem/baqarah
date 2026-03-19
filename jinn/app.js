'use strict';
/* Surah Al-Jinn (72) — The Jinn */
window.STORAGE_KEY = 'jinnQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'👁️', title:'Jinn Heard the Quran!', msg:"SubhanAllah! A group of jinn — unseen beings — heard the Quran being recited by the Prophet ﷺ. And they believed! 'Inna sami'na Quranan 'ajaba — we have heard a wondrous Quran!' Even the jinn recognized the truth. How remarkable that the Book of Allah moves hearts across the unseen world!"},
  2:{xp:80, gems:3, icon:'🌌', title:'Jinn Report Back',      msg:"MashAllah! The jinn went back to their people and reported: 'We heard amazing Quran — guides to truth!' They warned against shirk, affirmed Allah has no wife or child, confessed their old mistakes of spying on heaven, and accepted Islam. Amazing da'wah from the jinn themselves!"},
  3:{xp:85, gems:3, icon:'🛡️', title:'Only Allah Guides',    msg:"Allahu Akbar! The message: 'Whoever believes and does right has no fear of wrong.' The mosques are for Allah alone. When the Prophet ﷺ stands to call on Allah, they almost rush over him in crowds — such is the power of the Quran! And guidance is ONLY from Allah."},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Jinn Complete!',    msg:"ALLAHUMMA BARIK! Al-Jinn complete! The unseen world believes. The Quran moves jinn and humans alike. 'Wa an al-masajida lillahi fala tad'u ma'a Allahi ahada' — the mosques are for Allah alone, so call on no one beside Him. May we call on Allah alone! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s72', surahName:'Al-Jinn', surahArabic:'الجن', totalLevels:4, rewards:REWARDS,
  tileIcons:['👁️','🌌','🛡️','✨'],
  tileLabels:['Jinn Believe','Their Report','Straight Path','Jinn Complete'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Jinn — A group of jinn heard the Quran and immediately believed! They went back to warn their people. 4 levels exploring the unseen world's testimony to the Quran!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Even the jinn are on the straight path! 👁️`,
    complete: name=>`MashAllah, ${name}! Al-Jinn complete! May we believe like those jinn! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "inna sami\'na Quranan \'ajaban" (72:1) mean?',
   opts:['We have seen a wondrous prophet among them','We have heard a wondrous and amazing Quran','We have found a wonderful new way of life','We have learned a beautiful and astonishing language'],
   correct:1},
  {q:'What did the jinn say they believed the Quran would guide them to (72:2)?',
   opts:['To prosperity and riches in this world','To right conduct — so they believed in it','To peace among the jinn and human people','To wisdom and knowledge they had never known'],
   correct:1},
  {q:'What did the jinn declare about Allah having a partner (72:3)?',
   opts:['They said Allah has partners who assist Him','He has taken no wife and no son — exalted is He','They believed Allah shares power with the jinn','They thought the angels were Allah\'s children'],
   correct:1},
  {q:'What does 72:6 say some men used to do with the jinn?',
   opts:['Made agreements with jinn for protection','Some men sought refuge with jinn and increased in sin','Used jinn magic to harm their enemies always','Traded knowledge with jinn for worldly power'],
   correct:1},
];

const S2_ITEMS = [
  {id:'j1', text:'✅ Jinn believed\nin Quran',          zone:'z1'},
  {id:'j2', text:'👶 No wife\nor son for Allah',        zone:'z2'},
  {id:'j3', text:'🌠 They used to\nspy on heaven',      zone:'z3'},
  {id:'j4', text:'🚫 Now heaven\nis heavily guarded',   zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'The jinn who believed went back to warn their people: this Quran is amazing — believe in it (72:1-2)'},
  {id:'z2', desc:'Jinn confessed: our Lord is exalted — He has taken no wife or son (72:3)'},
  {id:'z3', desc:'Jinn admit: we used to sit in positions of the sky to listen in on the heavens (72:9)'},
  {id:'z4', desc:'But now we find it filled with fierce guards and burning flames — shooting stars drive us away (72:8)'},
];

const S3_QUIZ = [
  {q:'What does "wa an al-masajida lillahi fala tad\'u ma\'a Allahi ahadan" (72:18) mean?',
   opts:['The jinn are forbidden from entering mosques','The mosques belong to Allah — call on no one beside Him','The Prophet ﷺ should pray in every place on earth','The believers should build mosques in every nation'],
   correct:1},
  {q:'What happened when the Prophet ﷺ stood to invoke Allah according to 72:19?',
   opts:['The jinn attacked him with burning flames','The jinn almost crowded over him in multitudes','The jinn flew away afraid of the Quran\'s power','The jinn went silent and listened in deep reverence'],
   correct:1},
  {q:'What does 72:13 say about fear when one believes in the straight way?',
   opts:['Whoever believes has no fear of wrong or injustice','Those who believe will be protected from the jinn','Belief removes fear of death and the hereafter','The believer is protected from every evil attack'],
   correct:0},
  {q:'Who knows the unseen (ghayb) according to 72:26?',
   opts:['The senior jinn who guard the heavens above','Only Allah — He discloses none except to chosen messengers','The prophets and the angels who serve Allah','Those who are pure of heart and deep in worship'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'q1', text:'👁️ A group of jinn passed by the Prophet ﷺ while he was reciting Quran'},
  {id:'q2', text:'✅ They heard the Quran, were amazed, and believed on the spot'},
  {id:'q3', text:'📢 They returned to their people as warners: "Believe in this Quran!"'},
  {id:'q4', text:'🌌 They confessed: we used to spy on heaven but now it\'s heavily guarded'},
  {id:'q5', text:'🛡️ Message: Mosques are for Allah alone — call on no one with Him'},
  {id:'q6', text:'🔮 Allah alone knows the unseen — He reveals it only to chosen messengers'},
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
  const sky=st?'#0c0418':'#060210', acc=st?'#40e090':'#30c070';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Stars/mystery
  if(n>=1){for(let i=0;i<40;i++){const r=Math.random();ctx.fillStyle=`rgba(${r>0.5?'100,220,180':'180,100,255'},${0.4+Math.random()*0.5})`;ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.7,1.5,0,Math.PI*2);ctx.fill();}}
  // Jinn figures
  if(n>=2){for(let i=0;i<4;i++){ctx.fillStyle=`rgba(112,48,176,${0.5+i*0.1})`;ctx.beginPath();ctx.arc(W*0.15+i*W*0.22,H*0.55,10,0,Math.PI*2);ctx.fill();ctx.fillRect(W*0.15+i*W*0.22-5,H*0.55+10,10,14);}}
  // Mosque silhouette
  if(n>=3){ctx.fillStyle='rgba(64,224,144,0.3)';ctx.fillRect(W*0.4,H*0.35,W*0.2,H*0.3);ctx.beginPath();ctx.arc(W*0.5,H*0.35,W*0.07,0,Math.PI,true);ctx.fill();}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-JINN COMPLETE 👁️':`Al-Jinn — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};
