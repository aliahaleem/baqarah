'use strict';
/* Surah Al-Maun (107) — Small Kindnesses */
window.STORAGE_KEY = 'maunQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'😢', title:'Denier Exposed',  msg:"SubhanAllah! 'Ara\'aytal-ladhi yukadhdhibu bid-din?' Did you see the one who denies the DEEN? He pushes away the orphan harshly and doesn't encourage feeding the poor. Denying the deen shows up in HOW you treat people!"},
  2:{xp:80, gems:3, icon:'🙏', title:'Hypocrisy Warned', msg:"MashAllah! 'Waylul lil-musallin alladhina hum \'an salatihim sahun.' Woe to the musalliin (prayer-performers) — those who are HEEDLESS of their prayer and pray to be seen! Prayer without heart or humility = showing off!"},
  3:{xp:90, gems:4, icon:'🤲', title:'Al-Maun Complete', msg:"Allahu Akbar! Al-Maun complete! The surah ends with 'wa yamna\'una al-ma\'un' — they withhold small kindnesses! If you deny your deen inwardly, it shows in NOT giving even the smallest help. May we be generous and sincere! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s107', surahName:'Al-Maun', surahArabic:'الماعون', totalLevels:3, rewards:REWARDS,
  tileIcons:['😢','🙏','🤲'], tileLabels:['Denier','Hypocrite','Small Kindness'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Maun — Small Kindnesses! 7 verses that connect RELIGION to SOCIAL action. Denying the orphan and withholding small kindnesses = denying the deen. And hollow prayer without heart = hypocrisy! 3 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/3 done. Be generous! 🤲`,
    complete:n=>`MashAllah, ${n}! Al-Maun complete! Help the orphan, feed the poor, pray sincerely, share small kindnesses! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'Who is the one who denies the deen (religion) according to 107:1?',
   opts:['The one who never prays','The one who pushes away the orphan and doesn\'t encourage feeding the poor','The one who breaks his promises','The one who refuses to fast in Ramadan'],
   correct:1},
  {q:'What does "yadu\'ul-yatim" (107:2) mean?',
   opts:['He protects and shields the orphan','He pushes/shoves the orphan away harshly','He ignores the orphan completely','He makes the orphan work hard'],
   correct:1},
  {q:'What is the person guilty of regarding the poor in 107:3?',
   opts:['He takes charity from the poor','He does not encourage or urge feeding the poor','He tells the poor to find work','He refuses to give zakah'],
   correct:1},
  {q:'Connecting denial of deen to mistreating orphans shows what?',
   opts:['Social action is separate from faith','True iman shows up in how we treat the vulnerable','Only prayer matters for iman','Feeding others is optional sunnah'],
   correct:1},
];

const S2_ITEMS = [
  {id:'m1', text:'Yukadhdhibu\nbid-din', zone:'z1'},
  {id:'m2', text:'Yadu\' al-yatim', zone:'z2'},
  {id:'m3', text:'La yahuddu\n\'ala ta\'am', zone:'z3'},
  {id:'m4', text:'Yamna\'una\nal-ma\'un', zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'He denies the religion/judgement — the root attitude (107:1)'},
  {id:'z2', desc:'He harshly pushes away the orphan (107:2)'},
  {id:'z3', desc:'He does not urge feeding the poor (107:3)'},
  {id:'z4', desc:'They withhold even small kindnesses/utensils from neighbours (107:7)'},
];

const S3_QUIZ = [
  {q:'Who are "al-musallin" warned in 107:4?',
   opts:['Non-Muslims who deny prayer','Those who perform the prayer but are heedless of it','People who pray too quickly','Those who pray only sometimes'],
   correct:1},
  {q:'What is "al-riya\'" mentioned in 107:6?',
   opts:['Excessive praying','Showing off — praying to be seen by people','Rushing through the prayer','Forgetting the words of prayer'],
   correct:1},
  {q:'What is "al-ma\'un" (107:7) that they withhold?',
   opts:['Their zakah and large donations','Small tools, utensils, neighbourly help — everyday small kindnesses','Their mosque contributions','Their children\'s education'],
   correct:1},
  {q:'What is the deep message: what does withholding small kindnesses reveal?',
   opts:['The person is just busy with work','An inward attitude of selfishness disconnected from true deen','Only wealthy people are generous','It is minor and not significant'],
   correct:1},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#060e20':'#020608',acc=st?'#80b8f0':'#5088c8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('🤲',W/2,H*0.45);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Give even the smallest kindness"',W/2,H*0.6);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AL-MAUN COMPLETE! 🤲':`Al-Maun — ${n}/3 levels`,W/2,14);ctx.textAlign='left';
};
