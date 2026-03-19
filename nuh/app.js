'use strict';
/* Surah Nuh (71) — Prophet Nuh */
window.STORAGE_KEY = 'nuhQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Order:[], s3Checked:false,
  s4Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'🚢', title:'950 Year Mission',      msg:"SubhanAllah! Prophet Nuh (AS) preached for 950 years — and only a few believed! 'Wa laqad arsalna Nuhan ila qawmihi fa-labitsa feehim alfa sanatin illa khamseena aman.' Nine centuries and a half — of patience, rejection, mockery. May Allah give us even a fraction of that patience!"},
  2:{xp:80, gems:3, icon:'📢', title:'Three Methods of Da\'wah', msg:"MashAllah! Nuh (AS) used THREE powerful methods: public calls, private whispers, and night-and-day dedication. He never gave up. He connected their worship of Allah to the blessings of rain, wealth, children, gardens, and rivers. This is wisdom in da'wah!"},
  3:{xp:85, gems:3, icon:'🌊', title:'The Flood',              msg:"Allahu Akbar! When Nuh's people refused, Allah commanded him to build the ark. Then the water from the sky and the earth burst forth. The flood covered everything. Only believers on the ark were saved. Nuh's own son refused — and drowned. Guidance is Allah's gift, not guaranteed by blood."},
  4:{xp:100, gems:4, icon:'✨', title:'Nuh Complete!',         msg:"ALLAHUMMA BARIK! Surah Nuh complete! 950 years of calling. Three methods of da'wah. The magnificent benefits of istighfar (forgiveness-seeking). The flood and the ark. And Nuh's beautiful prayer for forgiveness. May Allah accept our calling others to Him! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s71', surahName:'Nuh', surahArabic:'نوح', totalLevels:4, rewards:REWARDS,
  tileIcons:['🚢','📢','🌊','🙏'],
  tileLabels:['950 Years','Da\'wah Methods','The Flood','Nuh\'s Prayer'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Surah Nuh — Prophet Nuh (AS) called his people for 950 years! Three methods of da'wah. The magnificent flood. Nuh's powerful prayer. 4 levels of lessons in patience!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Like Nuh — keep calling, never give up! 🚢`,
    complete: name=>`MashAllah, ${name}! Surah Nuh complete! May Allah grant us patience and wisdom like Nuh! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'How many years did Prophet Nuh (AS) call his people (71:5)?',
   opts:['Five hundred years among his people','Nine hundred and fifty years total','One thousand years less fifty','Seven hundred years calling them'],
   correct:2},
  {q:'What did Nuh\'s people do according to 71:7 to avoid hearing him?',
   opts:['They moved far away to distant lands','They put fingers in ears and covered with garments','They made loud noise to drown his voice','They imprisoned him and his followers'],
   correct:1},
  {q:'What is the theme of Nuh\'s warning in 71:1-4?',
   opts:['Worship only Allah and fear His punishment','Build a great ark before the flood arrives','Leave your false gods and follow the righteous path','Seek forgiveness before the Day approaches'],
   correct:0},
  {q:'What did Nuh (AS) tell his people would happen if they obeyed (71:10-12)?',
   opts:['Allah will send armies to protect their lands','Allah will send rain, give wealth and children and gardens','Allah will grant them power over all their enemies','Allah will remove all illness and bring lasting peace'],
   correct:1},
];

const S2_ITEMS = [
  {id:'d1', text:'📣 Called publicly\nto the people',        zone:'z1'},
  {id:'d2', text:'🤫 Called privately\nin secret whispers',  zone:'z2'},
  {id:'d3', text:'🌙 Called day\nand night — non-stop',      zone:'z3'},
  {id:'d4', text:'🌧️ Connected worship\nto blessings',       zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Thumma inni da\'autuhum jiharan" — Then I called them publicly and openly (71:8)'},
  {id:'z2', desc:'"Thumma inni asrartu lahum israran" — Then I called them secretly in private (71:9)'},
  {id:'z3', desc:'"Inni da\'awtu qawmi laylan wa naharan" — I called my people night and day (71:5)'},
  {id:'z4', desc:'If you seek forgiveness Allah will send rain, increase your wealth, give children and gardens (71:10-12)'},
];

const S3_EVENTS_CORRECT = [
  {id:'f1', text:'🙏 Nuh called his people for 950 years with three methods'},
  {id:'f2', text:'🤦 His people refused, mocked him, and covered their ears'},
  {id:'f3', text:'⚓ Allah commanded Nuh to build the ark — and Nuh obeyed'},
  {id:'f4', text:'💧 Allah opened the gates of the sky and earth — the great flood'},
  {id:'f5', text:'🚢 Nuh and the believers boarded the ark — saved by Allah'},
  {id:'f6', text:'😢 Nuh\'s own son refused — was swallowed by the waves and drowned'},
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

const S4_QUIZ = [
  {q:'What does Nuh pray for in 71:26? A remarkable prayer of firm boundaries.',
   opts:['That his people be guided before the flood comes','Do not leave on earth any home of the disbelievers','That his son be saved from drowning in the water','That Allah give him patience for another thousand years'],
   correct:1},
  {q:'What does Nuh say about the powerful ones among his people (71:21)?',
   opts:['The powerful ones protected and followed him','They oppressed me but I forgave them for Allah\'s sake','They followed their own powerful ones who only increased in loss','They tried to negotiate but I refused to accept their terms'],
   correct:2},
  {q:'What does Nuh (AS) pray at the end of the surah (71:28)?',
   opts:['For rain and prosperity for the whole world','Forgive me, my parents, and believing men and women','Remove all those who wronged him from the earth','Grant him a son who follows in his footsteps'],
   correct:1},
  {q:'What does "rabbi ighfir li wa li-walidayya" (71:28) demonstrate?',
   opts:['Nuh forgot his people and only prayed for himself','The Prophet prays for his own family over his community','A prophet\'s prayer includes both his family and all believers','Nuh was angry at his people and excluded them from prayer'],
   correct:2},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderStoryOrder(3,S3_EVENTS_CORRECT);}
function checkSection3(){checkStoryOrder(3,S3_EVENTS_CORRECT);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}
function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#040e1c':'#020810', acc=st?'#60d0c0':'#40c0b0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Ocean
  if(n>=1){ctx.fillStyle=st?'#0a1e30':'#06121e';ctx.fillRect(0,H*0.55,W,H*0.45);for(let i=0;i<5;i++){ctx.fillStyle='rgba(16,88,160,0.3)';ctx.fillRect(i*W/5,H*0.55+i*8,W/5,8);}}
  // Ark
  if(n>=2){ctx.fillStyle='#6a4020';ctx.fillRect(W*0.3,H*0.45,W*0.4,H*0.12);ctx.fillStyle='#8a5a30';ctx.fillRect(W*0.35,H*0.3,W*0.3,H*0.16);}
  // Rain
  if(n>=3){for(let i=0;i<20;i++){ctx.fillStyle='rgba(64,200,192,0.5)';ctx.fillRect(Math.random()*W,Math.random()*H*0.45,2,8);}}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'NUH COMPLETE 🚢':`Nuh — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};
