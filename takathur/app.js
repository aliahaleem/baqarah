'use strict';
/* Surah At-Takathur (102) — Competing for More */
window.STORAGE_KEY = 'takathurQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'💰', title:'Distracted Exposed', msg:"SubhanAllah! 'Al-hakumut-takathur hatta zurtumul-maqabir.' Competing for MORE distracted you until you visited the graves! The grave is what it takes to stop the race for MORE. What a wake-up call!"},
  2:{xp:80, gems:3, icon:'👁️', title:'Hellfire Seen',     msg:"MashAllah! 'Kalla law ta\'lamuna \'ilmal-yaqin — latarawun al-jahim.' If you KNEW with certain knowledge, you would see the Hellfire. Three types of knowledge in the surah: \'ilm al-yaqin, \'ayn al-yaqin, haqq al-yaqin!"},
  3:{xp:90, gems:4, icon:'❓', title:'At-Takathur Complete', msg:"Allahu Akbar! At-Takathur complete! 'Thumma latus\'alunna yawma\'idhin \'anin-na\'im.' Then you will be asked about the blessings (na\'im)! Every blessing — are we grateful? May we answer well on that Day! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s102', surahName:'At-Takathur', surahArabic:'التكاثر', totalLevels:3, rewards:REWARDS,
  tileIcons:['💰','👁️','❓'], tileLabels:['Distracted','Hellfire','Questioned'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah At-Takathur — Competing for More! Competing and boasting of MORE distracted you until the grave. Three warnings. Three types of certainty. And a final question about the blessings. 3 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/3 done. Step away from the race! 💰`,
    complete:n=>`MashAllah, ${n}! At-Takathur complete! "Thumma latus\'alunna yawma\'idhin \'anin-na\'im." May we be grateful for every blessing! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "al-hakumut-takathur" (102:1) mean?',
   opts:['You were grateful for more blessings','Competition for MORE / mutual boasting distracted you','You thanked Allah for His gifts','You competed in worship and prayer'],
   correct:1},
  {q:'What event finally stops the competing for MORE? (102:2)',
   opts:['The Day of Judgement','Visiting the graves','The end of Ramadan','Seeing the Hellfire'],
   correct:1},
  {q:'What does "kalla" at the beginning of 102:3 convey?',
   opts:['Encouragement: Yes, keep going!','A strong warning: No! Stop! You are wrong!','A question: Are you sure?','A promise: Soon you will know'],
   correct:1},
  {q:'How many times is "kalla sawfa ta\'lamun" (You will soon know) repeated?',
   opts:['Once','Twice — for strong emphasis','Three times','Four times'],
   correct:1},
];

const S2_ITEMS = [
  {id:'t1', text:'\'Ilm al-Yaqin\n(Certain knowledge)',   zone:'z1'},
  {id:'t2', text:'\'Ayn al-Yaqin\n(Eye-certain — seeing)', zone:'z2'},
  {id:'t3', text:'Haqq al-Yaqin\n(True certainty)',        zone:'z3'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Law ta\'lamuna \'ilmal-yaqin" — if you truly KNEW with certainty (102:5)'},
  {id:'z2', desc:'"Latarawunna al-jahim" — you would SEE the Hellfire with your eyes (102:6)'},
  {id:'z3', desc:'"Thumma latarawunnaha \'aynal-yaqin" — then you will see it with TRUE certainty (102:7)'},
];

const S3_QUIZ = [
  {q:'What will people be questioned about on the Day of Judgement? (102:8)',
   opts:['The number of prayers they prayed','The blessings (al-na\'im) they received','Their wealth and how they spent it','Their family and how they raised them'],
   correct:1},
  {q:'What is "al-na\'im" scholars say refers to in 102:8?',
   opts:['Only food and drink','Every blessing: health, wealth, safety, faith, time, and more','Only wealth and property','Only Islamic acts of worship'],
   correct:1},
  {q:'What is the main warning of At-Takathur?',
   opts:['Build mosques and schools','Competing for more wealth and status distracts from what truly matters','Give all wealth in charity','Only scholars need to worry about this'],
   correct:1},
  {q:'When does "zurtumul-maqabir" (visiting the graves) happen in 102:2?',
   opts:['On Fridays as a Sunnah','When you die — the grave is the final stop','When you pray janazah for others','As a reminder on Eid'],
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
  const sky=st?'#081408':'#040a04',acc=st?'#70c040':'#50a020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=st?'#162e16':'#0c1a0c';ctx.fillRect(0,H*0.6,W,H*0.4);
  if(n>=1){// gravestones
    for(let i=0;i<5;i++){ctx.fillStyle=st?'#304030':'#203020';ctx.fillRect(W*0.08+i*100,H*0.45,22,32);ctx.fillStyle=ctx.fillStyle;ctx.beginPath();ctx.arc(W*0.08+i*100+11,H*0.45,11,Math.PI,0);ctx.fill();}}
  if(n>=2){ctx.fillStyle=acc;ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('كَلَّا!',W/2,H*0.3);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"No! Stop!"',W/2,H*0.42);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AT-TAKATHUR COMPLETE! ❓':`At-Takathur — ${n}/3 levels`,W/2,14);ctx.textAlign='left';
};
