'use strict';
/* Surah An-Nas (114) — Mankind */
window.STORAGE_KEY = 'nasQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false, s4Answers:{}, s4Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'🌍', title:'Three Titles',    msg:"SubhanAllah! Three titles of Allah — Rabb (Lord and Sustainer), Malik (King), Ilah (God) — all belonging to MANKIND. He is Lord of us, King of us, God of us. Three angles of His authority over humanity!"},
  2:{xp:80, gems:3, icon:'😈', title:'Whisperer Exposed', msg:"MashAllah! 'Al-waswas al-khannas' — the whisperer who withdraws/slinks away. Shaytan whispers when you forget Allah — but slinks away when you remember. So dhikr IS your weapon against waswas!"},
  3:{xp:85, gems:3, icon:'🛡️', title:'Hidden Evil',     msg:"SubhanAllah! 'Alladhi yuwaswisu fi sudur al-nas.' He whispers into the CHESTS (hearts/minds) of mankind. The battlefield is your heart. The enemy whispers doubts, desires, distractions. Seek refuge in Rabb al-Nas, Malik al-Nas, Ilah al-Nas!"},
  4:{xp:100, gems:5, icon:'✨', title:'An-Nas Complete! Quran Complete!', msg:"Allahu Akbar! AN-NAS COMPLETE — AND WITH IT, THE FULL QURAN QUEST! The Quran ends with humanity seeking refuge in Allah from the hidden whisperer. May every day of your life begin and end with this surah! Ameen! 🏆🎊"},
};

window.SURAH_CONFIG = {
  id:'s114', surahName:'An-Nas', surahArabic:'الناس', totalLevels:4, rewards:REWARDS,
  tileIcons:['🌍','😈','🛡️','✨'], tileLabels:['Three Titles','Whisperer','The Chests','Quran Complete!'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah An-Nas — Mankind! The FINAL surah of the Quran! Three titles of Allah, one enemy: the withdrawing whisperer. Seek refuge — the Quran begins with Al-Fatihah seeking Allah's guidance and ends with An-Nas seeking His protection! 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. Almost at the end of the Quran! 🌍`,
    complete:n=>`MashAllah, ${n}! AN-NAS COMPLETE — and with it, Juz Amma is DONE! "Qul a\'udhu bi-rabb al-nas." May Allah protect you from all evil and waswas! Ameen! 🏆🎊`,
  },
};

const S1_QUIZ = [
  {q:'What is the first title of Allah in 114:1?',
   opts:['Malik al-Nas (King of Mankind)','Rabb al-Nas (Lord and Sustainer of Mankind)','Ilah al-Nas (God of Mankind)','Rahman al-Nas (Mercy of Mankind)'],
   correct:1},
  {q:'What does "Malik al-Nas" (114:2) mean?',
   opts:['Lord and sustainer of mankind','King and sovereign owner of mankind','God and object of worship of mankind','Creator and former of mankind'],
   correct:1},
  {q:'What does "Ilah al-Nas" (114:3) mean?',
   opts:['Master of mankind','Protector of mankind','God of mankind — the one worthy of worship','The one who guides mankind'],
   correct:2},
  {q:'Why are THREE titles used instead of just one?',
   opts:['For poetic rhyme only','Each covers a different aspect: Rabb=nurture, Malik=authority, Ilah=worship','To make it easy to memorise','They all mean exactly the same thing'],
   correct:1},
];

const S2_ITEMS = [
  {id:'n1', text:'Al-Waswas',     zone:'z1'},
  {id:'n2', text:'Al-Khannas',    zone:'z2'},
  {id:'n3', text:'Yuwaswisu\nfil-sudur', zone:'z3'},
  {id:'n4', text:'Min al-jinnati\nwal-nas', zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"The whisperer" — Shaytan who plants whispers of doubt and desire (114:4)'},
  {id:'z2', desc:'"Who withdraws/slinks" — retreats when Allah is remembered (114:4)'},
  {id:'z3', desc:'"Whispers into the chests/hearts" — the battlefield is the heart (114:5)'},
  {id:'z4', desc:'"From among jinn and men" — evil comes from both (114:6)'},
];

const S3_QUIZ = [
  {q:'What does "al-khannas" (from khunuus) describe about Shaytan?',
   opts:['He is small and hidden','He withdraws and retreats when Allah is remembered','He whispers during sleep only','He hides in dark places'],
   correct:1},
  {q:'Where does Shaytan whisper according to 114:5?',
   opts:['In our dreams and visions','In our ears and eyes','In our chests/hearts (sudur)','In our mouths and speech'],
   correct:2},
  {q:'What is the most effective shield against waswas?',
   opts:['Fighting the thoughts','Keeping busy with work','Dhikr of Allah — remembering Allah makes Shaytan retreat','Sleeping more to avoid thoughts'],
   correct:2},
  {q:'An-Nas says waswas comes "from jinn AND men" — what does this teach us?',
   opts:['Jinn are stronger than men','Evil whispering can come from humans too — bad company, media, propaganda','Men cannot cause spiritual harm','Only jinn cause waswas'],
   correct:1},
];

const S4_QUIZ = [
  {q:'Why is it significant that the Quran ENDS with a surah about seeking refuge?',
   opts:['It was revealed last so it was placed last','The ending mirrors the beginning: Fatihah seeks guidance, An-Nas seeks protection — the whole of life','It was the easiest surah to memorise','Surahs are arranged by length only'],
   correct:1},
  {q:'The Prophet ﷺ recited Al-Falaq and An-Nas together — what are they called together?',
   opts:['Al-Mu\'awwidhatan (The Two Protection Surahs)','Al-Mukhlisat (The Two Purity Surahs)','Al-Qasiran (The Two Short Surahs)','Al-Mutashabihan (The Two Similar Surahs)'],
   correct:0},
  {q:'An-Nas seeks refuge in Allah as Rabb, Malik, and Ilah — what do these three cover?',
   opts:['Past, present, and future','Creation, guidance, and judgement','All relationships with Allah: nurturing, authority, and worship','Youth, adulthood, and old age'],
   correct:2},
  {q:'Completing Juz Amma — what is the best next step for a young Muslim?',
   opts:['Rest — you are done with the Quran','Celebrate and never open the Quran again','Revise what you learned, memorise deeply, and explore more surahs!','Only recite on Fridays'],
   correct:2},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#100820':'#080414',acc=st?'#d0a0f8':'#b080d0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Crowd of people
  const cols=['#e8c090','#c09060','#f0d0a0','#b08040','#d0a070'];
  if(n>=1){for(let i=0;i<12;i++){const x=W*0.05+i*45,y=H*0.55,c=cols[i%5];ctx.fillStyle=c;ctx.beginPath();ctx.arc(x+12,y,6,0,Math.PI*2);ctx.fill();ctx.fillRect(x+7,y+6,10,18);}}
  if(n>=2){// radiant shield
    const rg=ctx.createRadialGradient(W/2,H/2,10,W/2,H/2,60);rg.addColorStop(0,`rgba(180,130,240,0.3)`);rg.addColorStop(1,'transparent');ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);}
  if(n>=4){ctx.fillStyle=acc;ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('🎊 JUZ AMMA COMPLETE! 🎊',W/2,H*0.3);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AN-NAS COMPLETE! ✨':`An-Nas — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
