'use strict';
/* Surah Al-Bayyinah (98) — The Clear Evidence */
window.STORAGE_KEY = 'bayyinahQuestSave';
window.state = { explorerName:'', xp:0, gems:0, completed:[], s2Answers:{}, s2Checked:false, s3Checked:false, s4Answers:{}, s4Checked:false, s5Answers:{}, s5Checked:false };

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'📜', title:'Evidence Clear',  msg:"SubhanAllah! The People of the Book and polytheists were supposed to leave their old ways when the Clear Evidence came — a Messenger with purified scriptures. Yet most didn't. Clear evidence doesn't guarantee acceptance!"},
  3:{xp:80, gems:3, icon:'🕌', title:'Pure Religion',   msg:"MashAllah! 'Wa ma umiru illa liya\'budu Allaha mukhlisina lahu al-din.' They were commanded nothing except to worship Allah with sincere devotion — uprightly, establish prayer, give zakah. That's the pure religion!"},
  4:{xp:85, gems:3, icon:'😇', title:'Best of Creation', msg:"SubhanAllah! 'Inna alladhina amanu wa amilu al-salihat ula\'ika hum khayrul-bariyya.' Those who believe and do good — THEY are the best of creation. Better than angels? Scholars discussed this!"},
  5:{xp:100, gems:4, icon:'✨', title:'Al-Bayyinah Complete', msg:"Allahu Akbar! Al-Bayyinah complete! Best of creation vs worst of creation — the difference is iman and righteous action. May Allah make us among the best! Ameen! 🏆"},
};

window.SURAH_CONFIG = {
  id:'s98', surahName:'Al-Bayyinah', surahArabic:'البينة', totalLevels:5, rewards:REWARDS,
  tileIcons:['📖','📜','🕌','😇','✨'], tileLabels:['Word by Word','Clear Evidence','Pure Worship','Best of Creation','Al-Bayyinah'],
  welcomeMsg:{
    fresh:   n=>`As-salamu alaykum, ${n}! Surah Al-Bayyinah — The Clear Evidence! A Messenger came with purified scriptures. He commanded pure worship. Then the surah divides humanity: the best of creation vs the worst of creation. 5 levels!`,
    partial: (n,d)=>`Welcome back, ${n}! ${d}/5 done. The evidence is clear! 📜`,
    complete:n=>`MashAllah, ${n}! Al-Bayyinah complete! "Khayrul-bariyya" — the best of creation! May you be among them always! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'98:1 — لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ مُنفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ الْبَيِّنَةُ', words:[
    {ar:'الْبَيِّنَةُ', tr:'al-bayyinah', en:'the clear evidence', freq:17},
    {ar:'تَأْتِيَهُمُ', tr:'taʾtiyahum', en:'came to them', freq:15},
    {ar:'حَتَّىٰ', tr:'ḥattā', en:'until', freq:129},
    {ar:'مُنفَكِّينَ', tr:'munfakkīn', en:'to desist / leave off', freq:1},
    {ar:'وَالْمُشْرِكِينَ', tr:'wal-mushrikīn', en:'and the polytheists', freq:20},
    {ar:'الْكِتَابِ', tr:'al-kitāb', en:'the Scripture', freq:261},
    {ar:'أَهْلِ', tr:'ahli', en:'People of', freq:70},
    'min',
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieved', freq:368},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1450},
    {ar:'يَكُنِ', tr:'yakun', en:'were', freq:200},
    'lam',
  ]},
  {label:'98:2 — رَسُولٌ مِّنَ اللَّهِ يَتْلُو صُحُفًا مُّطَهَّرَةً', words:[
    {ar:'مُّطَهَّرَةً', tr:'muṭahharah', en:'purified', freq:3},
    {ar:'صُحُفًا', tr:'ṣuḥufan', en:'scriptures / pages', freq:8},
    {ar:'يَتْلُو', tr:'yatlū', en:'reciting', freq:10},
    'allah',
    'min2',
    {ar:'رَسُولٌ', tr:'rasūl', en:'a Messenger', freq:236},
  ]},
  {label:'98:3 — فِيهَا كُتُبٌ قَيِّمَةٌ', words:[
    {ar:'قَيِّمَةٌ', tr:'qayyimah', en:'upright / correct', freq:6},
    {ar:'كُتُبٌ', tr:'kutubun', en:'scriptures / decrees', freq:23},
    'fiiha',
  ]},
  {label:'98:4 — وَمَا تَفَرَّقَ الَّذِينَ أُوتُوا الْكِتَابَ إِلَّا مِن بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَةُ', words:[
    {ar:'الْبَيِّنَةُ', tr:'al-bayyinah', en:'the clear evidence', freq:17},
    {ar:'جَاءَتْهُمُ', tr:'jāʾathum', en:'came to them', freq:15},
    'ma',
    {ar:'بَعْدِ', tr:'baʿdi', en:'after', freq:169},
    'min',
    'illa',
    {ar:'الْكِتَابَ', tr:'al-kitāba', en:'the Scripture', freq:261},
    {ar:'أُوتُوا', tr:'ūtū', en:'were given', freq:86},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1450},
    {ar:'تَفَرَّقَ', tr:'tafarraqa', en:'divided', freq:13},
    {ar:'وَمَا', tr:'wa-mā', en:'and not', freq:2005},
  ]},
  {label:'98:5 — وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ وَذَٰلِكَ دِينُ الْقَيِّمَةِ', words:[
    {ar:'الْقَيِّمَةِ', tr:'al-qayyimah', en:'the upright (religion)', freq:6},
    {ar:'دِينُ', tr:'dīnu', en:'religion of', freq:92},
    {ar:'وَذَٰلِكَ', tr:'wa-dhālika', en:'and that is', freq:382},
    {ar:'الزَّكَاةَ', tr:'al-zakāh', en:'the zakat', freq:32},
    {ar:'وَيُؤْتُوا', tr:'wa-yuʾtū', en:'and give', freq:2},
    {ar:'الصَّلَاةَ', tr:'al-ṣalāh', en:'the prayer', freq:67},
    {ar:'وَيُقِيمُوا', tr:'wa-yuqīmū', en:'and establish', freq:5},
    {ar:'حُنَفَاءَ', tr:'ḥunafāʾ', en:'inclining to truth', freq:4},
    {ar:'الدِّينَ', tr:'al-dīn', en:'the religion', freq:92},
    {ar:'لَهُ', tr:'lahu', en:'to Him', freq:1010},
    {ar:'مُخْلِصِينَ', tr:'mukhliṣīn', en:'being sincere', freq:6},
    {ar:'اللَّهَ', tr:'Allāha', en:'Allah', freq:2699},
    {ar:'لِيَعْبُدُوا', tr:'li-yaʿbudū', en:'to worship', freq:11},
    'illa',
    {ar:'أُمِرُوا', tr:'umirū', en:'they were commanded', freq:14},
    {ar:'وَمَا', tr:'wa-mā', en:'and not', freq:2005},
  ]},
  {label:'98:6 — إِنَّ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ فِي نَارِ جَهَنَّمَ خَالِدِينَ فِيهَا أُولَٰئِكَ هُمْ شَرُّ الْبَرِيَّةِ', words:[
    {ar:'الْبَرِيَّةِ', tr:'al-bariyyah', en:'creation', freq:2},
    {ar:'شَرُّ', tr:'sharru', en:'worst of', freq:30},
    'hum',
    {ar:'أُولَٰئِكَ', tr:'ulāʾika', en:'those', freq:190},
    'fiiha',
    {ar:'خَالِدِينَ', tr:'khālidīn', en:'abiding forever', freq:43},
    'jahannam',
    {ar:'نَارِ', tr:'nāri', en:'Fire of', freq:145},
    'fi',
    {ar:'وَالْمُشْرِكِينَ', tr:'wal-mushrikīn', en:'and the polytheists', freq:20},
    {ar:'الْكِتَابِ', tr:'al-kitāb', en:'the Scripture', freq:261},
    {ar:'أَهْلِ', tr:'ahli', en:'People of', freq:70},
    'min',
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieved', freq:368},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1450},
    'inna',
  ]},
  {label:'98:7 — إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ', words:[
    {ar:'الْبَرِيَّةِ', tr:'al-bariyyah', en:'creation', freq:2},
    {ar:'خَيْرُ', tr:'khayru', en:'best of', freq:189},
    'hum',
    {ar:'أُولَٰئِكَ', tr:'ulāʾika', en:'those', freq:190},
    {ar:'الصَّالِحَاتِ', tr:'al-ṣāliḥāt', en:'righteous deeds', freq:62},
    {ar:'وَعَمِلُوا', tr:'wa-ʿamilū', en:'and did', freq:62},
    {ar:'آمَنُوا', tr:'āmanū', en:'believed', freq:537},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1450},
    'inna',
  ]},
  {label:'98:8 — جَزَاؤُهُمْ عِندَ رَبِّهِمْ جَنَّاتُ عَدْنٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ ذَٰلِكَ لِمَنْ خَشِيَ رَبَّهُ', words:[
    {ar:'رَبَّهُ', tr:'rabbahu', en:'his Lord', freq:950},
    {ar:'خَشِيَ', tr:'khashiya', en:'feared', freq:21},
    {ar:'لِمَنْ', tr:'li-man', en:'for whoever', freq:30},
    'dhalika',
    {ar:'عَنْهُ', tr:'ʿanhu', en:'with Him', freq:95},
    {ar:'وَرَضُوا', tr:'wa-raḍū', en:'and they were pleased', freq:2},
    {ar:'عَنْهُمْ', tr:'ʿanhum', en:'with them', freq:63},
    'allahu',
    {ar:'رَّضِيَ', tr:'raḍiya', en:'is pleased', freq:6},
    {ar:'أَبَدًا', tr:'abadan', en:'forever', freq:28},
    'fiiha',
    {ar:'خَالِدِينَ', tr:'khālidīn', en:'abiding', freq:43},
    {ar:'الْأَنْهَارُ', tr:'al-anhāru', en:'the rivers', freq:54},
    {ar:'تَحْتِهَا', tr:'taḥtihā', en:'beneath them', freq:36},
    'min',
    {ar:'تَجْرِي', tr:'tajrī', en:'flow', freq:36},
    {ar:'عَدْنٍ', tr:'ʿadnin', en:'Eden / perpetual bliss', freq:11},
    {ar:'جَنَّاتُ', tr:'jannātu', en:'gardens of', freq:147},
    {ar:'رَبِّهِمْ', tr:'rabbihim', en:'their Lord', freq:49},
    {ar:'عِندَ', tr:'ʿinda', en:'with / near', freq:200},
    {ar:'جَزَاؤُهُمْ', tr:'jazāʾuhum', en:'their reward', freq:42},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

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

function renderSection2Game(){renderQuiz(2,S1_QUIZ);}function checkSection2(){checkQuiz(2,S1_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S2_ITEMS,S2_ZONES);}function checkSection3(){checkDragDrop(3,S2_ZONES);}
function renderSection4Game(){renderQuiz(4,S3_QUIZ);}function checkSection4(){checkQuiz(4,S3_QUIZ);}
function renderSection5Game(){renderQuiz(5,S4_QUIZ);}function checkSection5(){checkQuiz(5,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#100820':'#080414',acc=st?'#d0a8f8':'#b090d8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('📜',W/2,H*0.45);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('Al-Bayyinah — Clear Evidence',W/2,H*0.62);ctx.textAlign='left';}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-BAYYINAH COMPLETE! 📜':`Al-Bayyinah — ${n}/5 levels`,W/2,14);ctx.textAlign='left';
};
