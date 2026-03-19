'use strict';
/* Surah Al-Falaq (113) — The Daybreak */
window.STORAGE_KEY = 'falaqQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false, s4Answers:{}, s4Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'🌅', title:'Refuge Sought',   msg:"SubhanAllah! 'Qul a\'udhu bi-rabb il-falaq.' Say: I seek refuge in the Lord of the DAYBREAK! Al-Falaq is the splitting of the morning light — dramatic, specific. We seek refuge in the One who COMMANDS the morning to break through darkness!"},
  2:{xp:80, gems:3, icon:'🌑', title:'Evils Matched',   msg:"MashAllah! You matched the four evils! The evil of what He created (general), the darkness of the night when it settles, the evil of blowers on knots (witchcraft), the evil of an envier when they envy. All four!"},
  3:{xp:85, gems:3, icon:'🔮', title:'Sihr Understood',  msg:"SubhanAllah! Blowers on knots — 'naffathat fil-uqad' — refers to those who practice sihr (magic/witchcraft). Even the Prophet ﷺ was affected by sihr (Labid ibn al-A\'sam). Al-Mu\'awwidhatayn (Al-Falaq + An-Nas) were revealed as cure!"},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Falaq Complete', msg:"Allahu Akbar! Al-Falaq complete! We seek refuge from the night, from magic, and from envy. The Prophet ﷺ recited Al-Falaq and An-Nas every night before sleeping and after every prayer. May Allah protect us! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s113', surahName:'Al-Falaq', surahArabic:'الفلق', totalLevels:4, rewards:REWARDS,
  tileIcons:['🌅','🌑','🔮','✨'], tileLabels:['Lord of Daybreak','4 Evils','Envy & Magic','Al-Falaq'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Falaq — The Daybreak! One of Al-Mu\'awwidhatayn — the two protection surahs. Seek refuge from four specific evils: creation's harm, night's darkness, witchcraft, and envy. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. Seek His refuge! 🌅`,
    complete:n=>`MashAllah, ${n}! Al-Falaq complete! Recite every morning and evening — may Allah protect you and your family! Ameen! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "Rabb al-falaq" (113:1) mean?',
   opts:['Lord of the universe','Lord of the Daybreak — who splits the morning light','Lord of the night and darkness','Lord of all that He created'],
   correct:1},
  {q:'From what first general evil do we seek refuge in 113:2?',
   opts:['From human enemies and their plots','From the evil of what He created — all of creation\'s potential harm','From the evil of wealth and pride','From the evil of the jinn alone'],
   correct:1},
  {q:'What is "ghassiq" (113:3)?',
   opts:['Heavy rain and storms','The darkening night when it settles in','Thunder and lightning','The cold winter season'],
   correct:1},
  {q:'What are "naffathat fil-uqad" (113:4)?',
   opts:['People who gossip and spread lies','Those who blow on knots — practitioners of sihr/magic','Birds that fly at night','Snakes that hide in the dark'],
   correct:1},
];

const S2_ITEMS = [
  {id:'f1', text:'Evil of\nwhat He created', zone:'z1'},
  {id:'f2', text:'Darkness of night\nwhen it settles', zone:'z2'},
  {id:'f3', text:'Blowers on knots\n(witchcraft)', zone:'z3'},
  {id:'f4', text:'Envier when\nthey envy', zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'General: "min sharri ma khalaq" — from all created evil (113:2)'},
  {id:'z2', desc:'"Wa min sharri ghasiqin idha waqab" — night brings hidden dangers (113:3)'},
  {id:'z3', desc:'"Wa min sharri al-naffathat fil-uqad" — sihr/magic (113:4)'},
  {id:'z4', desc:'"Wa min sharri hasidin idha hasad" — envy when actively envied (113:5)'},
];

const S3_QUIZ = [
  {q:'Who was Labid ibn al-A\'sam and what did he do to the Prophet ﷺ?',
   opts:['He was a companion who memorised Quran','He was a Jewish man who did sihr on the Prophet ﷺ — knots hidden in a well','He was an enemy who fought at Badr','He was a trader who cheated the companions'],
   correct:1},
  {q:'What is special about "hasidin idha hasad" (113:5) — "envier when they envy"?',
   opts:['All types of envy equally','Envy becomes evil when ACTED upon — "idha hasad" means when actively envying','Envy is always harmless','Only wishing for harm is bad'],
   correct:1},
  {q:'Why is Al-Falaq called one of "Al-Mu\'awwidhatayn"?',
   opts:['Because it is the longest protection surah','It is paired with An-Nas — both seek refuge (a\'udhu) together','It was revealed on the same night as An-Nas','They share the same number of verses'],
   correct:1},
  {q:'What is the sunnah protection practice using Al-Falaq?',
   opts:['Recite once before sleeping','Blow on hands and wipe body after Fajr and Maghrib — plus before sleeping','Only recite during illness','Recite only when feeling afraid'],
   correct:1},
];

const S4_QUIZ = [
  {q:'Why is seeking refuge in the "Lord of the DAYBREAK" (al-falaq) significant?',
   opts:['Dawn is a holy time','The One who commands light to break through darkness can protect from all darkness','Dawn prayer is the most important','Darkness only exists at night'],
   correct:1},
  {q:'Is envy (hasad) mentioned in other surahs as well?',
   opts:['No — only in Al-Falaq','Yes — Quran warns about envy in multiple places (like Surah Yusuf)','Only in Sura An-Nisa','Only in the Hadith, not the Quran'],
   correct:1},
  {q:'What does reciting Al-Falaq + An-Nas together protect from?',
   opts:['Only physical illness','Both spiritual and external harms — evil of creation, night, magic, envy, waswas of Shaytan','Only from other humans','Only when said in Arabic'],
   correct:1},
  {q:'The Prophet ﷺ said Al-Falaq is from a type of surah that had not been revealed before — what type?',
   opts:['Surahs of command','Surahs of protection and refuge (al-mu\'awwidhat)','Surahs of tawhid','Surahs of stories'],
   correct:1},
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
  const sky=st?'#100828':'#080414',acc=st?'#e0a0f0':'#c090e0';
  const g=ctx.createLinearGradient(0,0,W,0);g.addColorStop(0,st?'#0c0620':'#06020e');g.addColorStop(0.5,st?'#201040':'#140830');g.addColorStop(1,'rgba(200,80,150,0.3)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  if(n>=1){// dawn line
    const dg=ctx.createLinearGradient(0,H*0.4,0,H);dg.addColorStop(0,'rgba(255,160,60,0.4)');dg.addColorStop(1,'transparent');ctx.fillStyle=dg;ctx.fillRect(0,H*0.4,W,H*0.6);}
  if(n>=2){ctx.fillStyle=acc;ctx.font='7px serif';ctx.textAlign='center';ctx.fillText('رَبِّ الْفَلَقِ',W/2,H*0.3);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-FALAQ COMPLETE! 🌅':`Al-Falaq — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
