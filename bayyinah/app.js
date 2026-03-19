'use strict';
/* Surah Al-Bayyinah (98) — The Clear Evidence */
window.STORAGE_KEY = 'bayyinahQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s1Answers:{}, s1Checked:false, s2Checked:false, s3Answers:{}, s3Checked:false, s4Answers:{}, s4Checked:false };

const REWARDS = {
  1:{xp:70, gems:3, icon:'📜', title:'Evidence Clear',  msg:"SubhanAllah! The People of the Book and polytheists were supposed to leave their old ways when the Clear Evidence came — a Messenger with purified scriptures. Yet most didn't. Clear evidence doesn't guarantee acceptance!"},
  2:{xp:80, gems:3, icon:'🕌', title:'Pure Religion',   msg:"MashAllah! 'Wa ma umiru illa liya\'budu Allaha mukhlisina lahu al-din.' They were commanded nothing except to worship Allah with sincere devotion — uprightly, establish prayer, give zakah. That's the pure religion!"},
  3:{xp:85, gems:3, icon:'😇', title:'Best of Creation', msg:"SubhanAllah! 'Inna alladhina amanu wa amilu al-salihat ula\'ika hum khayrul-bariyya.' Those who believe and do good — THEY are the best of creation. Better than angels? Scholars discussed this!"},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Bayyinah Complete', msg:"Allahu Akbar! Al-Bayyinah complete! Best of creation vs worst of creation — the difference is iman and righteous action. May Allah make us among the best! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s98', surahName:'Al-Bayyinah', surahArabic:'البينة', totalLevels:4, rewards:REWARDS,
  tileIcons:['📜','🕌','😇','✨'], tileLabels:['Clear Evidence','Pure Worship','Best of Creation','Al-Bayyinah'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Bayyinah — The Clear Evidence! A Messenger came with purified scriptures. He commanded pure worship. Then the surah divides humanity: the best of creation vs the worst of creation. 4 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/4 done. The evidence is clear! 📜`,
    complete:n=>`MashAllah, ${n}! Al-Bayyinah complete! "Khayrul-bariyya" — the best of creation! May you be among them always! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'Who are the two groups that would not leave their ways until the Clear Evidence came? (98:1)',
   opts:['Arabs and non-Arabs','People of the Book and polytheists','Rich and poor people','Young and old people'],
   correct:1},
  {q:'What is the "Clear Evidence" (al-bayyinah) mentioned in 98:1?',
   opts:['A miracle of fire and water','A messenger from Allah reciting purified scriptures','An angel visible to all','The Day of Judgement itself'],
   correct:1},
  {q:'What does "suhufan mutahharah" (98:2) mean?',
   opts:['Old destroyed scrolls','Purified/sacred scriptures','Hidden books of wisdom','Scrolls written in gold'],
   correct:1},
  {q:'What happened to the People of the Book after the Clear Evidence came? (98:4)',
   opts:['They all accepted Islam immediately','They divided into factions after it came','They asked for more signs','They wrote new scriptures'],
   correct:1},
];

const S2_ITEMS = [
  {id:'b1', text:'مُخْلِصِينَ\nلَهُ الدِّينَ',       zone:'z1'},
  {id:'b2', text:'حُنَفَاءَ',                        zone:'z2'},
  {id:'b3', text:'يُقِيمُوا\nالصَّلَاةَ',            zone:'z3'},
  {id:'b4', text:'يُؤْتُوا\nالزَّكَاةَ',             zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'Worship Allah with sincere devotion — no shirk, no riyaa (98:5)'},
  {id:'z2', desc:'Hunafa: as upright believers, turned away from all false worship (98:5)'},
  {id:'z3', desc:'Establishing the prayer — the pillar of Islam (98:5)'},
  {id:'z4', desc:'Giving the zakat — purifying wealth and caring for community (98:5)'},
];

const S3_QUIZ = [
  {q:'Who are "khayrul-bariyya" — the best of creation? (98:7)',
   opts:['The prophets and their families','Those who believe and do righteous deeds','The wealthy Muslims who give charity','The scholars of the Quran'],
   correct:1},
  {q:'What reward awaits the best of creation? (98:8)',
   opts:['Jannatu Adn — gardens of Eden beneath which rivers flow','100 cities in Paradise','Seeing Allah every Friday','Living near the Prophet ﷺ in Paradise'],
   correct:0},
  {q:'Who are "sharrul-bariyya" — the worst of creation? (98:6)',
   opts:['Those who are poor','Those who disbelieved among the People of the Book and polytheists','Those who sinned and repented','Those who missed prayers sometimes'],
   correct:1},
  {q:'What does "radiya Allahu anhum wa radu anhu" mean? (98:8)',
   opts:['Allah tested them and they passed','Allah is pleased with them and they are pleased with Him','Allah forgave them and they thanked Him','Allah enriched them and they gave thanks'],
   correct:1},
];

const S4_QUIZ = [
  {q:'What is "dinu al-qayyimah" mentioned in 98:5?',
   opts:['The religion of the powerful','The upright/correct religion of truth','The religion practised in Arabia','The religion of all prophets combined'],
   correct:1},
  {q:'In the verse about pure worship (98:5), what three pillars are mentioned?',
   opts:['Prayer, fasting, hajj','Sincere devotion, establishing prayer, giving zakah','Belief, knowledge, practice','Charity, kindness, patience'],
   correct:1},
  {q:'Are the disbelievers of the People of the Book punished in Jahannam? (98:6)',
   opts:['No — they get a lighter punishment','Yes — they are the worst of creation and dwell in Jahannam','It depends on their intentions','They are forgiven if they were sincere'],
   correct:1},
  {q:'What is special about "Jannatu Adn" mentioned in 98:8?',
   opts:['It is the lowest level of Paradise','It is one name for Paradise — a garden of eternal dwelling','It is only for prophets','It is a temporary resting place'],
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
  const sky=st?'#100820':'#080414',acc=st?'#d0a8f8':'#b090d8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('📜',W/2,H*0.45);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('Al-Bayyinah — Clear Evidence',W/2,H*0.62);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-BAYYINAH COMPLETE! 📜':`Al-Bayyinah — ${n}/4 levels`,W/2,14);ctx.textAlign='left';
};
