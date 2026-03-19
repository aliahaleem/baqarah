'use strict';
/* Surah Al-Muddaththir (74) — The Cloaked One */
window.STORAGE_KEY = 'muddaththirQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
};

const REWARDS = {
  1:{xp:80, gems:3, icon:'📯', title:'Arise & Warn!',         msg:"SubhanAllah! After the pause in revelation (fatra), THIS surah restarted the mission. 'Qum fa-andhir!' — Arise and warn! The Prophet ﷺ was cloaked in his garment, perhaps frightened, perhaps resting — and Allah says: ARISE! The public mission of Islam began with these words. Every da'ee must arise!"},
  2:{xp:80, gems:3, icon:'🔥', title:'Saqar — Hellfire',      msg:"Allahu Akbar! 'Ma salakakum fi Saqar?' — What led you into Saqar (Hellfire)? The answer: we didn't pray, didn't feed the poor, engaged in vain talk, and denied the Day. FOUR reasons — four actions that build or destroy a life. Prayer, charity, guarding your tongue, and believing in accountability!"},
  3:{xp:85, gems:3, icon:'🌙', title:'The Rejector Exposed',  msg:"MashAllah! One man heard the Quran — admitted privately it was extraordinary — then publicly called it 'sihr mu'thar' (bewitching sorcery). Allah exposed him: he thought and plotted — curse on him! One verse at a time, Allah systematically dismantles his excuse. The truth has no equal!"},
  4:{xp:100, gems:4, icon:'✨', title:'Muddaththir Complete!', msg:"ALLAHUMMA BARIK! Al-Muddaththir complete! Arise and warn! Keep your garments pure. Abandon all filth. Don't give to gain more. Four reasons for Hellfire. 19 angels over Saqar. The moon and night as signs. May Allah make us among those who arise and act! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s74', surahName:'Al-Muddaththir', surahArabic:'المدثر', totalLevels:4, rewards:REWARDS,
  tileIcons:['📯','🔥','🌙','✨'],
  tileLabels:['Arise & Warn','Hellfire','The Rejector','Complete'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Muddaththir — O Cloaked One! The restart of revelation. Arise and warn! Four reasons for hellfire. The exposed rejector. 4 powerful levels!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Arise and continue the mission! 📯`,
    complete: name=>`MashAllah, ${name}! Al-Muddaththir complete! May Allah make us arise and warn! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "qum fa-andhir" (74:2) command the Prophet ﷺ?',
   opts:['Pray all night and rest in the day','Arise and warn — begin the public mission','Memorize the Quran before teaching it','Hide from the people and worship in secret'],
   correct:1},
  {q:'What does "wa rabbaka fa-kabbir" (74:3) mean?',
   opts:['Praise your Lord in the night hours','And your Lord — magnify and glorify Him!','And your Lord — bow down and prostrate','And pray to your Lord in the morning light'],
   correct:1},
  {q:'What does "wa thiyabaka fa-tahhir" (74:4) command?',
   opts:['And purify your heart from all arrogance','And purify your garments from all filth','And cleanse yourself with water before prayer','And prepare your home for the coming revelation'],
   correct:1},
  {q:'What does "wa la tamnun tastakthir" (74:6) warn against?',
   opts:['Do not give charity expecting no return','Do not give expecting more in return — don\'t do favours for gain','Do not spend more than what you have earned','Do not boast about your acts of worship to others'],
   correct:1},
];

const S2_ITEMS = [
  {id:'s1', text:'🚫 Did not\npray (salah)',             zone:'z1'},
  {id:'s2', text:'🍞 Did not\nfeed the poor',            zone:'z2'},
  {id:'s3', text:'💬 Engaged in\nvain talk',              zone:'z3'},
  {id:'s4', text:'❌ Denied\nthe Day of Judgment',       zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Lam naku mina al-musalleen" — we were not among those who prayed (74:43) — first reason for Saqar'},
  {id:'z2', desc:'"Wa lam naku nut\'im al-miskeen" — we did not feed the poor and needy (74:44) — second reason'},
  {id:'z3', desc:'"Wa kunna nakhudu ma\'a al-kha\'ideen" — we talked idly with the vain speakers (74:45) — third reason'},
  {id:'z4', desc:'"Wa kunna nukadhdhibu bi-yawm al-deen" — we denied the Day of Reckoning (74:46) — fourth reason'},
];

const S3_QUIZ = [
  {q:'What does the man in 74:24 call the Quran after initially admitting its greatness privately?',
   opts:['The words of a madman or a possessed poet','This is nothing but bewitching transmitted sorcery','The lies of a man who seeks only power and wealth','A beautiful poem but not from any god above'],
   correct:1},
  {q:'What does Allah say about the man who "thought and plotted" in 74:19-20?',
   opts:['He will be punished with a severe punishment','How he plotted — then again, curse on him how he plotted!','His plot was exposed and he was humiliated publicly','He was wrong and will be corrected by the truth'],
   correct:1},
  {q:'How many angels guard over Saqar (Hellfire) according to 74:30?',
   opts:['Seven strong and powerful angels','Twelve specially assigned guardians','Nineteen in total over the Hellfire','Eight great angels standing guard'],
   correct:2},
  {q:'What does Allah swear by in 74:32-34?',
   opts:['By the sun and its glorious brightness','By the moon and the night as it retreats','By the earth and all that it contains','By the angels and what they inscribe'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'m1', text:'🧥 The Prophet ﷺ was wrapped in his garment after the pause in revelation'},
  {id:'m2', text:'📯 Allah reveals: Arise! Warn! Glorify your Lord! Purify yourself!'},
  {id:'m3', text:'🎭 A man hears Quran, admits it\'s extraordinary, then publicly calls it sorcery'},
  {id:'m4', text:'💀 Allah exposes him: curse on him — how he plotted! (74:19-20)'},
  {id:'m5', text:'🔥 Four reasons stated for entering Saqar: no prayer, no charity, vain talk, denied Day'},
  {id:'m6', text:'🌙 Allah swears by the moon, night, and dawn as signs of His truth'},
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
  const sky=st?'#180a02':'#0e0400', acc=st?'#f8c040':'#e8a830';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// Rising sun / call
    const g=ctx.createRadialGradient(W*0.5,H*0.1,0,W*0.5,H*0.1,80);
    g.addColorStop(0,'rgba(248,160,64,0.5)');g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(n>=2){// Fire
    for(let i=0;i<8;i++){ctx.fillStyle=`rgba(${200+i*5},${40+i*5},0,${0.4+i*0.05})`;ctx.fillRect(W*0.1+i*W*0.1,H*0.7-i*8,W*0.08,H*0.3+i*8);}}
  if(n>=3){// Moon
    ctx.fillStyle='#d0c090';ctx.beginPath();ctx.arc(W*0.75,H*0.2,16,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=sky;ctx.beginPath();ctx.arc(W*0.8,H*0.18,12,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'MUDDATHTHIR COMPLETE 📯':`Muddaththir — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};
