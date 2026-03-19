'use strict';
/* Surah Al-Mursalat (77) — The Emissaries */
window.STORAGE_KEY = 'mursalatQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'💨', title:'Five Wind Oaths',       msg:"SubhanAllah! Allah swears by five groups of things sent forth — the winds, their order, their spreading, their separating, and their delivering of the reminder. Everything in the cosmos has a mission. And the refrain begins: 'Waylun yawma\'idhin lil-mukadhdhbeen' — Woe that Day to the deniers!"},
  2:{xp:80, gems:3, icon:'📅', title:'Day of Sorting',        msg:"Allahu Akbar! The surah now describes the Day of Sorting (Yawm al-Fasl) — when it was appointed — when the stars are extinguished — when the mountains are blown away — when the messengers were gathered. 'Li ayyi yawmin ujjilat? Li-yawm al-fasl!' For what Day was it delayed? The Day of Sorting!"},
  3:{xp:85, gems:3, icon:'🌊', title:'Destroyed Nations',     msg:"MashAllah! Allah recalls the destroyed nations: Did We not destroy the earlier peoples? Will We follow them with the later ones? 'Alam nuhlik al-awwaleen?' Then asks rhetorically — have We not created them in a fixed proportion? MashAllah, it is all planned and proportioned by the All-Knowing!"},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Mursalat Complete!', msg:"ALLAHUMMA BARIK! Al-Mursalat complete! The refrain 'Woe that Day to the deniers' appears TEN TIMES — a rhythmic warning that never lets the listener rest. Eat and enjoy — the deniers say. But woe to them! May we never be among the deniers. Ameen! Wa billahi tawfeeq!"},
};

window.SURAH_CONFIG = {
  id:'s77', surahName:'Al-Mursalat', surahArabic:'المرسلات', totalLevels:4, rewards:REWARDS,
  tileIcons:['💨','📅','🌊','✨'],
  tileLabels:['Five Oaths','Day of Sorting','Nations','Refrain'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Mursalat — The Emissaries! Five oath-groups. The Day of Sorting. Destroyed nations. And the stunning refrain — "Woe to the deniers!" — said 10 times! 4 powerful levels!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. The refrain echoes — woe to the deniers! 💨`,
    complete: name=>`MashAllah, ${name}! Al-Mursalat complete! 10 times: woe to the deniers — may we never be among them! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "wal-mursalati \'urfa" (77:1) refer to according to scholars?',
   opts:['The prophets sent one after another throughout history','The winds sent forth one after the other gracefully','The angels sent down with glad tidings and warnings','The verses of Quran delivered in beautiful order'],
   correct:1},
  {q:'How many times does the refrain "Waylun yawma\'idhin lil-mukadhdhbeen" appear?',
   opts:['Five times in total','Seven times throughout','Ten times — a powerful repeating refrain','Twelve times from beginning to end'],
   correct:2},
  {q:'What does "waylun yawma\'idhin lil-mukadhdhbeen" mean?',
   opts:['Victory that Day to the believers in Allah','Woe that Day to the deniers of truth','Mercy that Day to all the repentant ones','Warning that Day to the ungrateful servants'],
   correct:1},
  {q:'What does Allah say was appointed in 77:11-12 for "what day"?',
   opts:['For the Day of Hajj and great gathering','For what day were the messengers gathered? The Day of Sorting!','For the Day when every soul returns to its Lord','For the night that is better than a thousand months'],
   correct:1},
];

const S2_ITEMS = [
  {id:'d1', text:'⭐ Stars are\nextinguished',          zone:'z1'},
  {id:'d2', text:'🏔️ Mountains are\nblown away',        zone:'z2'},
  {id:'d3', text:'📩 Messengers are\ngathered together', zone:'z3'},
  {id:'d4', text:'📅 The Day of\nSorting arrives',       zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Wa idha al-nujumu tumisat" — when the stars are extinguished (77:8) — cosmic signs of the Hour'},
  {id:'z2', desc:'"Wa idha al-jibalu nusifat" — when the mountains are blown away to dust (77:10)'},
  {id:'z3', desc:'"Wa idha al-rusulu uqqitat" — when the messengers\' appointed time arrives (77:11)'},
  {id:'z4', desc:'"Li-yawm al-fasl" — for the Day of Sorting and Deciding (77:13) — all gathered for judgment'},
];

const S3_QUIZ = [
  {q:'What rhetorical question does Allah ask in 77:16?',
   opts:['Did We not create the heavens and the earth?','Did We not destroy the earlier peoples — Alam nuhlik al-awwaleen?','Did We not send messengers to every nation on earth?','Did We not warn them before the punishment came?'],
   correct:1},
  {q:'What does "alam najal al-ardha kifatan? Ahya\'an wa amwatan" (77:25-26) describe?',
   opts:['The earth as our provider of all food and water','The earth as a container — for the living and the dead','The earth that opens up to receive the rainfall','The earth that holds mountains to keep it stable'],
   correct:1},
  {q:'What are the deniers told to "eat and enjoy" but only for a little while (77:46)?',
   opts:['Eat from the gardens of this world temporarily','Eat and enjoy — for a little while — the deniers are warned','Enjoy the pleasures before the accounting comes','Eat what is halal now before the day of reckoning'],
   correct:1},
  {q:'What does the surah invite in its final verse 77:50?',
   opts:['So believe in Allah before the Day arrives','In what speech after this will they believe?','So submit to Allah and earn His beautiful reward','Recite the Quran and ponder its magnificent verses'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'w1', text:'💨 Five oaths by the winds/emissaries sent successively (77:1-5)'},
  {id:'w2', text:'📅 Stars extinguished, mountains blown, messengers gathered — Day of Sorting (77:8-13)'},
  {id:'w3', text:'🌊 Destroyed nations recalled: "Did We not destroy the earlier peoples?" (77:16)'},
  {id:'w4', text:'💧 Allah recalls: We created you from water (77:20) — still you deny!'},
  {id:'w5', text:'🌿 Earth as container for living and dead — designed and measured (77:25-28)'},
  {id:'w6', text:'🔟 Refrain sounds 10 times — "Woe that Day to the deniers!" (throughout)'},
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
  const sky=st?'#0c0818':'#060410', acc=st?'#40d0c0':'#28b8a8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// Wind streaks
    for(let i=0;i<12;i++){ctx.strokeStyle=`rgba(64,208,192,${0.2+Math.random()*0.3})`;ctx.lineWidth=2;ctx.beginPath();const y=Math.random()*H;ctx.moveTo(0,y);ctx.lineTo(W,y+Math.random()*40-20);ctx.stroke();}}
  if(n>=2){// Stars extinguishing
    for(let i=0;i<15;i++){ctx.fillStyle=`rgba(200,200,255,${Math.random()*0.4})`;ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.5,1.5,0,Math.PI*2);ctx.fill();}}
  if(n>=3){// Earth layer
    ctx.fillStyle=st?'#1a2818':'#0e1a0c';ctx.fillRect(0,H*0.65,W,H*0.35);}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-MURSALAT COMPLETE 💨':`Al-Mursalat — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};
