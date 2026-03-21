'use strict';
/* Surah At-Takathur (102) — Competing for More */
window.STORAGE_KEY = 'takathurQuestSave';
window.state = window.buildDefaultState(4);

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'💰', title:'Distracted Exposed', msg:"SubhanAllah! 'Al-hakumut-takathur hatta zurtumul-maqabir.' Competing for MORE distracted you until you visited the graves! The grave is what it takes to stop the race for MORE. What a wake-up call!"},
  3:{xp:80, gems:3, icon:'👁️', title:'Hellfire Seen',     msg:"MashAllah! 'Kalla law ta\'lamuna \'ilmal-yaqin — latarawun al-jahim.' If you KNEW with certain knowledge, you would see the Hellfire. Three types of knowledge in the surah: \'ilm al-yaqin, \'ayn al-yaqin, haqq al-yaqin!"},
  4:{xp:90, gems:4, icon:'❓', title:'At-Takathur Complete', msg:"Allahu Akbar! At-Takathur complete! 'Thumma latus\'alunna yawma\'idhin \'anin-na\'im.' Then you will be asked about the blessings (na\'im)! Every blessing — are we grateful? May we answer well on that Day! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s102', surahName:'At-Takathur', surahArabic:'التكاثر', totalLevels:4, rewards:REWARDS,
  tileIcons:['📖','💰','👁️','❓'], tileLabels:['Word by Word','Distracted','Hellfire','Questioned'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah At-Takathur — Competing for More! Competing and boasting of MORE distracted you until the grave. Three warnings. Three types of certainty. And a final question about the blessings. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. Step away from the race! 💰`,
    complete:n=>`MashAllah, ${n}! At-Takathur complete! "Thumma latus\'alunna yawma\'idhin \'anin-na\'im." May we be grateful for every blessing! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'102:1 — أَلْهَاكُمُ التَّكَاثُرُ', words:[
    {ar:'التَّكَاثُرُ', tr:'al-takāthur', en:'competition for more', freq:1},
    {ar:'أَلْهَاكُمُ', tr:'alhākum', en:'has diverted you', freq:1},
  ]},
  {label:'102:2 — حَتَّىٰ زُرْتُمُ الْمَقَابِرَ', words:[
    {ar:'الْمَقَابِرَ', tr:'al-maqābir', en:'the graves', freq:1},
    {ar:'زُرْتُمُ', tr:'zurtum', en:'you visited', freq:1},
    {ar:'حَتَّىٰ', tr:'ḥattā', en:'until', freq:129},
  ]},
  {label:'102:3 — كَلَّا سَوْفَ تَعْلَمُونَ', words:[
    {ar:'تَعْلَمُونَ', tr:'taʿlamūn', en:'you will know', freq:50},
    {ar:'سَوْفَ', tr:'sawfa', en:'soon / you will', freq:30},
    'kalla',
  ]},
  {label:'102:4 — ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ', words:[
    {ar:'تَعْلَمُونَ', tr:'taʿlamūn', en:'you will know', freq:50},
    {ar:'سَوْفَ', tr:'sawfa', en:'soon / you will', freq:30},
    'kalla',
    'thumma',
  ]},
  {label:'102:5 — كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ', words:[
    {ar:'الْيَقِينِ', tr:'al-yaqīn', en:'certainty', freq:5},
    {ar:'عِلْمَ', tr:'ʿilma', en:'knowledge of', freq:105},
    {ar:'تَعْلَمُونَ', tr:'taʿlamūn', en:'you knew', freq:50},
    {ar:'لَوْ', tr:'law', en:'if', freq:192},
    'kalla',
  ]},
  {label:'102:6 — لَتَرَوُنَّ الْجَحِيمَ', words:[
    {ar:'الْجَحِيمَ', tr:'al-jaḥīm', en:'the Hellfire', freq:26},
    {ar:'لَتَرَوُنَّ', tr:'la-tarawunna', en:'you will surely see', freq:1},
  ]},
  {label:'102:7 — ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ', words:[
    {ar:'الْيَقِينِ', tr:'al-yaqīn', en:'certainty', freq:5},
    {ar:'عَيْنَ', tr:'ʿayna', en:'eye / vision of', freq:30},
    {ar:'لَتَرَوُنَّهَا', tr:'la-tarawunnahā', en:'you will surely see it', freq:1},
    'thumma',
  ]},
  {label:'102:8 — ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ', words:[
    {ar:'النَّعِيمِ', tr:'al-naʿīm', en:'the blessings', freq:16},
    {ar:'عَنِ', tr:'ʿan', en:'about', freq:330},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:37},
    {ar:'لَتُسْأَلُنَّ', tr:'la-tusʾalunna', en:'you will surely be asked', freq:2},
    'thumma',
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

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
  {id:'t1', text:'عِلْمَ الْيَقِينِ',   zone:'z1'},
  {id:'t2', text:'عَيْنَ الْيَقِينِ',   zone:'z2'},
  {id:'t3', text:'حَقَّ الْيَقِينِ',    zone:'z3'},
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

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerQuiz(2, S1_QUIZ);
window.registerMatch(3, S2_ITEMS,S2_ZONES);
window.registerQuiz(4, S3_QUIZ);

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
  ctx.fillText(n>=3?'AT-TAKATHUR COMPLETE! ❓':`At-Takathur — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
