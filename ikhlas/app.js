'use strict';
/* Surah Al-Ikhlas (112) — Sincerity / Pure Monotheism */
window.STORAGE_KEY = 'ikhlasQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'✨', title:'Tawhid Affirmed', msg:"SubhanAllah! Al-Ikhlas was revealed in response to: 'Describe your Lord!' Four statements — Allahu Ahad, As-Samad, Lam yalid wa lam yulad, Wa lam yakun lahu kufuwan ahad. FOUR REJECTIONS of every false concept of God. One surah = the theology of the entire Quran!"},
  2:{xp:80, gems:3, icon:'🌟', title:'As-Samad Known',  msg:"MashAllah! 'Allah al-Samad' — the Everlasting Refuge. 'Al-Samad' means: He who is depended upon by all, who has no needs, who is Self-Sufficient in perfection. Everything needs Him. He needs nothing. SubhanAllah!"},
  3:{xp:100, gems:5, icon:'💎', title:'Al-Ikhlas Complete', msg:"Allahu Akbar! Al-Ikhlas complete! The Prophet ﷺ said reciting it equals one-third of the Quran! It contains: who Allah IS (Ahad, Samad), what He is NOT (father, son), and that nothing equals Him. May we recite it with full understanding! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s112', surahName:'Al-Ikhlas', surahArabic:'الإخلاص', totalLevels:3, rewards:REWARDS,
  tileIcons:['✨','🌟','💎'], tileLabels:['One','As-Samad','None Equal'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Ikhlas — Pure Monotheism! Just 4 verses but equal to 1/3 of the Quran! Four divine attributes that define the oneness of Allah and reject every false concept of God. 3 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/3 done. The pure truth awaits! ✨`,
    complete:n=>`MashAllah, ${n}! Al-Ikhlas complete! Now recite it with full understanding — every time you say it, it equals 1/3 of the Quran! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "Allahu Ahad" (112:1) mean?',
   opts:['Allah is the First and the Last','Allah is One — unique, singular, indivisible','Allah is the Lord of all creation','Allah is the most powerful'],
   correct:1},
  {q:'What does "Allahu al-Samad" (112:2) mean?',
   opts:['Allah is the Most Merciful','Allah is the Everlasting Refuge — all depend on Him, He depends on nothing','Allah is the Ever-Living','Allah is the All-Knowing'],
   correct:1},
  {q:'What does "lam yalid wa lam yulad" (112:3) negate?',
   opts:['It negates Allah having any partners','It negates Allah having any children OR being born from anyone','It negates angels being daughters of Allah','It negates Allah creating man from clay'],
   correct:1},
  {q:'What does "wa lam yakun lahu kufuwan ahad" (112:4) declare?',
   opts:['No one can see Allah in this world','Nothing and no one is equal or comparable to Allah','Allah has no name or form','Allah is hidden from all creation'],
   correct:1},
];

const S2_ITEMS = [
  {id:'i1', text:'Ahad',      zone:'z1'},
  {id:'i2', text:'As-Samad',  zone:'z2'},
  {id:'i3', text:'Lam yalid', zone:'z3'},
  {id:'i4', text:'Kufuwan',   zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'One — uniquely singular, no division, no partners, no comparison (112:1)'},
  {id:'z2', desc:'The Refuge depended upon by all — He alone is Self-Sufficient (112:2)'},
  {id:'z3', desc:'He did not beget — refutes idea of children/offspring of Allah (112:3)'},
  {id:'z4', desc:'Equal, comparable — nothing is kufuwan (equivalent) to Allah (112:4)'},
];

const S3_QUIZ = [
  {q:'Why does the Prophet ﷺ say Al-Ikhlas equals 1/3 of the Quran?',
   opts:['Because it has 1/3 of the letters of the Quran','Because the Quran\'s themes are stories, laws, and tawhid — Al-Ikhlas is the tawhid section','Because it takes 1/3 of the time to recite','Because scholars counted its reward as 1/3'],
   correct:1},
  {q:'How does Al-Ikhlas respond to those who believe God had a son?',
   opts:['It says this is forgivable if sincere','Verse 3: He did not beget — refuting the concept completely','It does not address this issue','It says this is a misunderstanding only'],
   correct:1},
  {q:'How does Al-Ikhlas respond to those who believe God was born?',
   opts:['Verse 1: Allah is One','Verse 3: Wa lam yulad — and He was not born','Verse 4: Nothing equals Him','Verse 2: He is As-Samad'],
   correct:1},
  {q:'The word "Ikhlas" means sincerity/purity — why is this surah named Al-Ikhlas?',
   opts:['Because it was revealed during Ramadan','Because it purifies tawhid — strips away every false concept until pure oneness remains','Because it requires the most concentration to understand','Because it was the first surah taught to children'],
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
  const sky=st?'#0c0c1e':'#060608',acc=st?'#e8e0a0':'#c0b060';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Radiant center
  const t=Date.now()*0.001;
  const rg=ctx.createRadialGradient(W/2,H/2,5,W/2,H/2,80+Math.sin(t)*10);
  rg.addColorStop(0,'rgba(230,210,140,0.3)');rg.addColorStop(1,'transparent');
  ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('اللَّهُ أَحَدٌ',W/2,H*0.45);ctx.textAlign='left';}
  if(n>=2){ctx.fillStyle=acc;ctx.font='10px serif';ctx.textAlign='center';ctx.fillText('الصَّمَدُ',W/2,H*0.62);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AL-IKHLAS COMPLETE! 💎':`Al-Ikhlas — ${n}/3 levels`,W/2,14);ctx.textAlign='left';
};
