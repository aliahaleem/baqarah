'use strict';
/* Surah Al-Muzzammil (73) — The Enshrouded One */
window.STORAGE_KEY = 'muzzammilQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
};

const REWARDS = {
  1:{xp:80, gems:3, icon:'🌙', title:'Night Prayer Command',  msg:"SubhanAllah! This was the FIRST major command given to the Prophet ﷺ after prophethood — arise and pray the night! 'Qum al-layla illa qaleelan.' Stand by night except a little. The night prayer was compulsory before the five daily prayers were revealed. The foundation of the Prophet's strength was his night!"},
  2:{xp:85, gems:3, icon:'📿', title:'Weight of the Word',   msg:"Allahu Akbar! 'Inna sanulqi alayka qawlan thaqeela' — We are going to send down to you a heavy Word. The Quran is heavy — spiritually, in its demands, in its responsibilities. It calls for total transformation. This is why you needed to prepare with night prayer. The heavier the mission, the deeper the roots needed!"},
  3:{xp:100, gems:4, icon:'✨', title:'Al-Muzzammil Complete!', msg:"ALLAHUMMA BARIK! Al-Muzzammil complete! Night prayer to strengthen the heart. The heavy Word of the Quran. Patience over what they say — beautiful patience. Prayer, zakat, and trust in Allah alone. 'Wa tawakkal ala Allahi — Rabbi al-mashriq wal-maghrib.' Trust in the Lord of East and West! Ameen!"},
};

window.SURAH_CONFIG = {
  id:'s73', surahName:'Al-Muzzammil', surahArabic:'المزمل', totalLevels:3, rewards:REWARDS,
  tileIcons:['🌙','📿','✨'],
  tileLabels:['Night Prayer','Heavy Word','Trust Allah'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Muzzammil — O You Wrapped in Garments! Night prayer, the heavy Word of Quran, patience, prayer and zakat. 3 levels of deep spiritual lessons!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/3 levels done. The night is short — keep praying! 🌙`,
    complete: name=>`MashAllah, ${name}! Al-Muzzammil complete! May Allah strengthen our nights! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "Ya ayyuha al-muzzammil" (73:1) mean?',
   opts:['O you wrapped in garments, arise!','O Prophet, recite the Quran to your people!','O Messenger, stand before your Lord!','O you who believes, pray in the night!'],
   correct:0},
  {q:'What does "qum al-layla illa qaleelan" (73:2) command?',
   opts:['Stand all night in prayer without any rest','Stand by night except a little — half or less','Rise early before dawn for the morning prayer','Spend the night in remembrance and recitation'],
   correct:1},
  {q:'What does "rattil al-Qur\'ana tarteela" (73:4) mean?',
   opts:['Memorize the whole Quran carefully','Recite the Quran slowly and distinctly with care','Write the Quran with precision and care','Recite the Quran beautifully for the people'],
   correct:1},
  {q:'Why does Allah command the night prayer in 73:6?',
   opts:['Night prayer is easier for the lazy and distracted','Night standing is most effective for spiritual focus','The night is when the angels come to assist prayers','Night worship brings more reward than daytime worship'],
   correct:1},
];

const S2_ITEMS = [
  {id:'w1', text:'⚖️ The Quran\nis a heavy Word',          zone:'z1'},
  {id:'w2', text:'🌙 Night prayer\nstrengthens the heart',  zone:'z2'},
  {id:'w3', text:'😤 Be patient over\nwhat they say',       zone:'z3'},
  {id:'w4', text:'🏃 Leave them\nwith beautiful grace',     zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Inna sanulqi alayka qawlan thaqeela" — We are going to send you a heavy Word (73:5)'},
  {id:'z2', desc:'"Inna nashiata al-layli hiya ashaddu wat\'an wa aqwamu qeela" — night devotion is firmest for treading and clearest in speech (73:6)'},
  {id:'z3', desc:'"Wa\'sbir \'ala ma yaquloon" — Bear patiently what they say (73:10)'},
  {id:'z4', desc:'"Wa uhjurhum hajran jameela" — And leave them gracefully (73:10) — respond to mockery with dignity'},
];

const S3_QUIZ = [
  {q:'What does 73:15-16 compare the Prophet ﷺ to?',
   opts:['Like a shepherd guiding his lost sheep home','We sent you as a witness as We sent a messenger to Pharaoh','Like a father who warns his own beloved children','We sent you like a warrior against the forces of disbelief'],
   correct:1},
  {q:'What does Allah mention in 73:20 about those who cannot pray the full night?',
   opts:['They should pray at least two rak\'ahs at night','Allah knows you cannot keep exact time — pray what you can','They should make up missed prayers in the day','Allah forgives those who sleep through the night prayer'],
   correct:1},
  {q:'What does "wa aqimu al-salata wa atu al-zakah" (73:20) combine?',
   opts:['Night prayer and fasting in Ramadan together','Establishing prayer and giving zakat regularly','Hajj pilgrimage and charity to the poor together','Learning the Quran and teaching it to others'],
   correct:1},
  {q:'How does the surah end in 73:20?',
   opts:['By promising gardens to those who pray at night','Whatever good you send ahead, you will find it better with Allah','The angels witness your deeds in the night watches','Whoever trusts in Allah — He will provide sufficiently'],
   correct:1},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}
function checkSection3(){checkQuiz(3,S3_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#080c1e':'#04060e', acc=st?'#c0d8f8':'#a8c8f0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// Moon
    ctx.fillStyle='#c8d8f0';ctx.beginPath();ctx.arc(W*0.8,H*0.2,20,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=sky;ctx.beginPath();ctx.arc(W*0.85,H*0.18,16,0,Math.PI*2);ctx.fill();
    for(let i=0;i<25;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.5})`;ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.7,1,0,Math.PI*2);ctx.fill();}}
  if(n>=2){// Praying figure
    ctx.fillStyle='#8090c0';ctx.fillRect(W*0.15,H*0.55,14,20);ctx.fillRect(W*0.12,H*0.55,20,4);}
  if(n>=3){// Book (Quran) symbol
    ctx.fillStyle=acc;ctx.fillRect(W*0.5,H*0.4,30,38);ctx.fillStyle=sky;ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('📖',W*0.5+15,H*0.4+24);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=3?'AL-MUZZAMMIL COMPLETE 🌙':`Al-Muzzammil — ${n}/3 levels`,W/2,12);ctx.textAlign='left';
};
