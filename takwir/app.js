'use strict';
/* ================================================
   SURAH AT-TAKWIR (81) — app.js
   The Overthrowing · Indigo / Silver-Star / Cosmic
   ================================================ */
window.STORAGE_KEY='takwirQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s2Checked:false,s3Answers:{},s3Checked:false,s4Order:[],s4Checked:false,s5Answers:{},s5Checked:false,s6Answers:{},s6Checked:false,s7Answers:{},s7Checked:false};

const REWARDS={
  1: {xp:60, gems:3, icon:'📖', title:'Words Learned!', msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:80,gems:3,icon:'⭐',title:'THE 12 SIGNS KNOWN!',msg:"SubhanAllah! Twelve cosmic events will happen on the Day of Judgment — the sun rolled up, stars falling, mountains set in motion, seas overflowing! Each 'Idha' (when) builds towards one conclusion: your soul will know what it brought forward. Are you ready for that Day?"},
  3:{xp:80,gems:3,icon:'👼',title:'THE BURIED GIRL VINDICATED!',msg:"Allahu Akbar! Al-Maw'udah — the girl buried alive in pre-Islamic Arabia. On the Day of Judgment, Allah will ask HER: 'For what sin were you killed?' Not her killer — HER. The innocent victim testifying against her murderers. Islam completely abolished this practice. Every life is sacred."},
  4:{xp:90,gems:3,icon:'📜',title:'WHAT YOU PREPARED REVEALED!',msg:"MashAllah! The records unroll, the sky is stripped, Hell blazes, Paradise draws near — and THEN: 'Alimat nafsun ma ahdharat.' A soul will know exactly what it brought. This is the moment of total clarity. What are you preparing NOW to bring to that Day?"},
  5:{xp:90,gems:4,icon:'👁️',title:'THE NOBLE ANGEL UNDERSTOOD!',msg:"SubhanAllah! The Quran comes through Jibril (AS) — noble, powerful, honoured, obeyed, trustworthy. Four attributes of the greatest angel. The message comes through the BEST carrier. Yet what Jibril carries is even greater — the Word of Allah Himself. How can you not respect this Book?"},
  6:{xp:100,gems:4,icon:'🌟',title:'THE PROPHET DEFENDED!',msg:"Allahu Akbar! 'Wa ma sahibukum bi-majnun' — Your companion Muhammad ﷺ is NOT mad! He saw Jibril on the clear horizon. He doesn't withhold knowledge. And this is NOT from Shaytan. Four defences in four verses. The Quraysh called him mad — Allah Himself is his defence. SubhanAllah!"},
  7:{xp:120,gems:5,icon:'🌌',title:'SURAH AT-TAKWIR COMPLETE!',msg:"ALLAHUMMA BARIK! All 7 levels of Surah At-Takwir — The Overthrowing — complete! 'Fa-ayna tadh-habun?' Where are you going? The Quran is a reminder for all the worlds — for whoever WILLS to take the straight path. May Allah will for us the straight path. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:7,rewards:REWARDS,
  tileIcons:['📖','⭐','👼','📜','👁️','🌟','🌌'],
  tileLabels:['Word by Word','12 Signs','Buried Girl','Prepared','Noble Angel','Not Mad','Where Going?'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah At-Takwir — "The Overthrowing." The sun rolled up, stars falling, the buried baby girl vindicated, the noble angel Jibril, the Prophet ﷺ defended, and the great question: Where are you going? 7 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Fa-ayna tadh-habun?" — Keep finding your path! ⭐`,
    complete:name=>`MashAllah, ${name}! Surah At-Takwir complete! "Inna huwa illa dhikrun lil-'alamin — liman sha'a minkum an yastaqim." The straight path awaits the willing heart. Ameen! 🌌`,
  },
};

// S1 — Drag & Drop: 5 of the 12 Signs
/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'81:1 — إِذَا الشَّمْسُ كُوِّرَتْ', words:[
    {ar:'كُوِّرَتْ', tr:'kuwwirat', en:'is wound round / folded up', freq:1},
    {ar:'الشَّمْسُ', tr:'al-shams', en:'the sun', freq:33},
    'idha',
  ]},
  {label:'81:2 — وَإِذَا النُّجُومُ انكَدَرَتْ', words:[
    {ar:'انكَدَرَتْ', tr:'inkadarat', en:'fall / lose light', freq:1},
    {ar:'النُّجُومُ', tr:'al-nujūm', en:'the stars', freq:13},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:3 — وَإِذَا الْجِبَالُ سُيِّرَتْ', words:[
    {ar:'سُيِّرَتْ', tr:'suyyirat', en:'are set in motion', freq:1},
    'al-jibal-u',
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:4 — وَإِذَا الْعِشَارُ عُطِّلَتْ', words:[
    {ar:'عُطِّلَتْ', tr:'ʿuṭṭilat', en:'are abandoned', freq:1},
    {ar:'الْعِشَارُ', tr:'al-ʿishār', en:'pregnant she-camels', freq:1},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:5 — وَإِذَا الْوُحُوشُ حُشِرَتْ', words:[
    {ar:'حُشِرَتْ', tr:'ḥushirat', en:'are gathered', freq:19},
    {ar:'الْوُحُوشُ', tr:'al-wuḥūsh', en:'the wild beasts', freq:1},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:6 — وَإِذَا الْبِحَارُ سُجِّرَتْ', words:[
    {ar:'سُجِّرَتْ', tr:'sujjirat', en:'are set on fire', freq:1},
    {ar:'الْبِحَارُ', tr:'al-biḥār', en:'the seas', freq:5},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:7 — وَإِذَا النُّفُوسُ زُوِّجَتْ', words:[
    {ar:'زُوِّجَتْ', tr:'zuwwijat', en:'are paired', freq:20},
    {ar:'النُّفُوسُ', tr:'al-nufūs', en:'the souls', freq:295},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:8 — وَإِذَا الْمَوْءُودَةُ سُئِلَتْ', words:[
    {ar:'سُئِلَتْ', tr:'suʾilat', en:'is asked', freq:2},
    {ar:'الْمَوْءُودَةُ', tr:'al-mawʾūdah', en:'the girl buried alive', freq:1},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:9 — بِأَيِّ ذَنبٍ قُتِلَتْ', words:[
    {ar:'قُتِلَتْ', tr:'qutilat', en:'she was killed', freq:39},
    {ar:'ذَنبٍ', tr:'dhanb', en:'sin', freq:35},
    {ar:'بِأَيِّ', tr:'bi-ayyi', en:'for what', freq:8},
  ]},
  {label:'81:10 — وَإِذَا الصُّحُفُ نُشِرَتْ', words:[
    {ar:'نُشِرَتْ', tr:'nushirat', en:'are laid open', freq:3},
    {ar:'الصُّحُفُ', tr:'al-ṣuḥuf', en:'the records / scrolls', freq:8},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:11 — وَإِذَا السَّمَاءُ كُشِطَتْ', words:[
    {ar:'كُشِطَتْ', tr:'kushiṭat', en:'is stripped away', freq:1},
    'al-sama',
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:12 — وَإِذَا الْجَحِيمُ سُعِّرَتْ', words:[
    {ar:'سُعِّرَتْ', tr:'suʿʿirat', en:'is set ablaze', freq:2},
    {ar:'الْجَحِيمُ', tr:'al-jaḥīm', en:'the Hellfire', freq:26},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:13 — وَإِذَا الْجَنَّةُ أُزْلِفَتْ', words:[
    {ar:'أُزْلِفَتْ', tr:'uzlifat', en:'is brought near', freq:3},
    {ar:'الْجَنَّةُ', tr:'al-jannah', en:'Paradise', freq:66},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'81:14 — عَلِمَتْ نَفْسٌ مَّا أَحْضَرَتْ', words:[
    {ar:'أَحْضَرَتْ', tr:'aḥḍarat', en:'it has brought forward', freq:4},
    'ma',
    {ar:'نَفْسٌ', tr:'nafs', en:'a soul', freq:295},
    {ar:'عَلِمَتْ', tr:'ʿalimat', en:'will know', freq:382},
  ]},
  {label:'81:15 — فَلَا أُقْسِمُ بِالْخُنَّسِ', words:[
    {ar:'بِالْخُنَّسِ', tr:'bil-khunnas', en:'by the retreating stars', freq:1},
    {ar:'أُقْسِمُ', tr:'uqsimu', en:'I swear', freq:7},
    {ar:'فَلَا', tr:'fa-lā', en:'so I do indeed', freq:99},
  ]},
  {label:'81:16 — الْجَوَارِ الْكُنَّسِ', words:[
    {ar:'الْكُنَّسِ', tr:'al-kunnas', en:'the hiding / sweeping ones', freq:1},
    {ar:'الْجَوَارِ', tr:'al-jawāri', en:'those that run their courses', freq:2},
  ]},
  {label:'81:17 — وَاللَّيْلِ إِذَا عَسْعَسَ', words:[
    {ar:'عَسْعَسَ', tr:'ʿasʿas', en:'departs / darkens', freq:1},
    'idha',
    {ar:'وَاللَّيْلِ', tr:'wal-layl', en:'and by the night', freq:73},
  ]},
  {label:'81:18 — وَالصُّبْحِ إِذَا تَنَفَّسَ', words:[
    {ar:'تَنَفَّسَ', tr:'tanaffas', en:'breathes forth / dawns', freq:1},
    'idha',
    {ar:'وَالصُّبْحِ', tr:'waṣ-ṣubḥ', en:'and by the morning', freq:7},
  ]},
  {label:'81:19 — إِنَّهُ لَقَوْلُ رَسُولٍ كَرِيمٍ', words:[
    {ar:'كَرِيمٍ', tr:'karīm', en:'noble / honoured', freq:27},
    {ar:'رَسُولٍ', tr:'rasūl', en:'a messenger', freq:332},
    {ar:'لَقَوْلُ', tr:'la-qawlu', en:'surely the word of', freq:50},
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed it is', freq:40},
  ]},
  {label:'81:20 — ذِي قُوَّةٍ عِندَ ذِي الْعَرْشِ مَكِينٍ', words:[
    {ar:'مَكِينٍ', tr:'makīn', en:'secure in position', freq:2},
    {ar:'الْعَرْشِ', tr:'al-ʿarsh', en:'the Throne', freq:26},
    {ar:'عِندَ', tr:'ʿinda', en:'near / with', freq:200},
    {ar:'قُوَّةٍ', tr:'quwwah', en:'power / strength', freq:42},
    {ar:'ذِي', tr:'dhī', en:'possessor of', freq:47},
  ]},
  {label:'81:21 — مُّطَاعٍ ثَمَّ أَمِينٍ', words:[
    {ar:'أَمِينٍ', tr:'amīn', en:'trustworthy', freq:14},
    {ar:'ثَمَّ', tr:'thamma', en:'there (in the heavens)', freq:20},
    {ar:'مُّطَاعٍ', tr:'muṭāʿ', en:'obeyed', freq:1},
  ]},
  {label:'81:22 — وَمَا صَاحِبُكُم بِمَجْنُونٍ', words:[
    {ar:'بِمَجْنُونٍ', tr:'bi-majnūn', en:'a madman', freq:2},
    {ar:'صَاحِبُكُم', tr:'ṣāḥibukum', en:'your companion', freq:5},
    'ma', 'wa',
  ]},
  {label:'81:23 — وَلَقَدْ رَآهُ بِالْأُفُقِ الْمُبِينِ', words:[
    {ar:'الْمُبِينِ', tr:'al-mubīn', en:'the clear', freq:119},
    {ar:'بِالْأُفُقِ', tr:'bil-ufuqi', en:'on the horizon', freq:2},
    {ar:'رَآهُ', tr:'raʾāhu', en:'he saw him', freq:50},
    {ar:'وَلَقَدْ', tr:'wa-laqad', en:'and indeed', freq:90},
  ]},
  {label:'81:24 — وَمَا هُوَ عَلَى الْغَيْبِ بِضَنِينٍ', words:[
    {ar:'بِضَنِينٍ', tr:'bi-ḍanīn', en:'a withholder', freq:1},
    {ar:'الْغَيْبِ', tr:'al-ghayb', en:'the unseen', freq:49},
    {ar:'عَلَى', tr:'ʿalā', en:'regarding', freq:1445},
    'huwa', 'ma', 'wa',
  ]},
  {label:'81:25 — وَمَا هُوَ بِقَوْلِ شَيْطَانٍ رَّجِيمٍ', words:[
    {ar:'رَّجِيمٍ', tr:'rajīm', en:'accursed / outcast', freq:6},
    {ar:'شَيْطَانٍ', tr:'shayṭān', en:'a devil', freq:68},
    {ar:'بِقَوْلِ', tr:'bi-qawli', en:'the word of', freq:50},
    'huwa', 'ma', 'wa',
  ]},
  {label:'81:26 — فَأَيْنَ تَذْهَبُونَ', words:[
    {ar:'تَذْهَبُونَ', tr:'tadh-habūn', en:'are you going', freq:5},
    {ar:'فَأَيْنَ', tr:'fa-ayna', en:'so where', freq:3},
  ]},
  {label:'81:27 — إِنْ هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ', words:[
    {ar:'لِّلْعَالَمِينَ', tr:'lil-ʿālamīn', en:'for all the worlds', freq:73},
    {ar:'ذِكْرٌ', tr:'dhikr', en:'a reminder', freq:78},
    'illa', 'huwa',
    {ar:'إِنْ', tr:'in', en:'not (it is)', freq:663},
  ]},
  {label:'81:28 — لِمَن شَاءَ مِنكُمْ أَن يَسْتَقِيمَ', words:[
    {ar:'يَسْتَقِيمَ', tr:'yastaqīm', en:'to be upright', freq:46},
    {ar:'أَن', tr:'an', en:'to', freq:1000},
    {ar:'مِنكُمْ', tr:'minkum', en:'among you', freq:100},
    {ar:'شَاءَ', tr:'shāʾa', en:'wills', freq:236},
    {ar:'لِمَن', tr:'li-man', en:'for whoever', freq:50},
  ]},
  {label:'81:29 — وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ رَبُّ الْعَالَمِينَ', words:[
    {ar:'الْعَالَمِينَ', tr:'al-ʿālamīn', en:'the worlds', freq:73},
    {ar:'رَبُّ', tr:'rabb', en:'Lord of', freq:950},
    'allahu',
    {ar:'يَشَاءَ', tr:'yashāʾa', en:'(He) wills', freq:236},
    {ar:'أَن', tr:'an', en:'that', freq:1000},
    'illa',
    {ar:'تَشَاءُونَ', tr:'tashāʾūn', en:'you will', freq:10},
    'ma', 'wa',
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS=[
  {id:'sg1',text:'الشَّمْسُ\nكُوِّرَتْ',zone:'z1'},
  {id:'sg2',text:'النُّجُومُ\nانكَدَرَتْ',zone:'z2'},
  {id:'sg3',text:'الْجِبَالُ\nسُيِّرَتْ',zone:'z3'},
  {id:'sg4',text:'الْعِشَارُ\nعُطِّلَتْ',zone:'z4'},
  {id:'sg5',text:'الْوُحُوشُ\nحُشِرَتْ',zone:'z5'},
];
const S1_ZONES=[
  {id:'z1',desc:'"When the sun is rolled up (kuwwirat)" — (81:1). The word is from "kawwara" — to wrap a turban. The sun will be dimmed and folded away like a cloth. Its light extinguished.'},
  {id:'z2',desc:'"When the stars fall scattered (inkadarat)" — (81:2). Stars will lose their light and scatter/fall. The ordered universe unmade.'},
  {id:'z3',desc:'"When the mountains are set in motion (suyyirat)" — (81:3). Mountains that seem permanent will float, fly, and crumble like wool. See also 81:10 — the sky stripped away.'},
  {id:'z4',desc:'"When the she-camels 10 months pregnant are abandoned (\'uttilat)" — (81:4). The most precious possession in Arabia abandoned. Life itself stops caring about wealth.'},
  {id:'z5',desc:'"When the wild animals are gathered (hushirat)" — (81:5). Even animals will be resurrected and gathered. Every creature answers on that Day.'},
];

// S2 — Quiz: The Buried Baby Girl
const S2_QUIZ=[
  {q:'Who was "Al-Maw\'udah" (الْمَوْءُودَة) in 81:8?',
   opts:['A woman who refused to believe in the resurrection',
         'A girl buried alive — some Arab tribes killed newborn daughters',
         'A woman punished for committing a crime in Arabia',
         'A woman who died during a war against early Muslims'],
   correct:1},
  {q:'On Judgment Day, WHO is asked about the buried girl (81:8-9)?',
   opts:['Her father is questioned directly about his decision',
         'The whole tribe is held collectively responsible for the act',
         'The girl HERSELF is asked: "For what sin were you killed?"',
         'The angels who recorded the deed are questioned first'],
   correct:2},
  {q:'What does the question "bi-ayyi dhanbin qutilat" (81:9) reveal?',
   opts:['That she committed a sin justifying her death',
         'The question IS the indictment — her only crime was existing',
         'It asks whether she was a believer or a disbeliever',
         'It asks what mistake she made before she died'],
   correct:1},
  {q:'What was Islam\'s ruling on burying girls alive (al-wa\'d)?',
   opts:['Completely forbidden — every life is sacred and honoured',
         'Permitted in cases of extreme famine and poverty',
         'Discouraged but allowed during times of wartime hardship',
         'Forbidden only if the girl was born healthy and strong'],
   correct:0},
];

// S3 — Story Order: The 4 events of 81:10-14
const S3_EVENTS_CORRECT=[
  {id:'e1',text:'📜 The records (suhuf) are unrolled and laid open — every deed visible (81:10)'},
  {id:'e2',text:'🌌 The sky is stripped away (kushitat) — the heavens removed (81:11)'},
  {id:'e3',text:'🔥 Hell (al-Jahim) is set ablaze (su\'\'irat) and blazing (81:12)'},
  {id:'e4',text:'🌿 Paradise (al-Jannah) is brought near (uzlifat) — close enough to see (81:13)'},
  {id:'e5',text:'💡 Then a soul will KNOW (alimat nafsun) what it has brought forward (81:14)'},
];
window._S3_EVENTS=S3_EVENTS_CORRECT;

// S4 — Quiz: The Noble Angel
const S4_QUIZ=[
  {q:'Who is the "noble Messenger (rasul karim)" in 81:19?',
   opts:['All prophets collectively as carriers of divine messages',
         'Jibril (AS) — the Angel of Revelation who brought the Quran',
         'A previous prophet such as Musa (AS) on Mount Sinai',
         'Prophet Muhammad ﷺ bringing the final message to mankind'],
   correct:1},
  {q:'What does "dhi quwwah" (of great power) tell us about Jibril (AS)?',
   opts:['He has immense power — among the strongest of all creation',
         'He has physical strength to carry enormous weights easily',
         'He has authority to override the decrees of other angels',
         'He has the power to change Allah\'s divine decisions'],
   correct:0},
  {q:'What does "maki\'n ind dhi al-\'Arsh" mean for Jibril (AS)?',
   opts:['He physically lives and dwells inside the Throne of Allah',
         'He physically guards every side of the Throne at all times',
         'He has an elevated, honoured rank near Allah\'s Throne',
         'He represents the Throne whenever delivering revelation'],
   correct:2},
  {q:'Why does Allah describe Jibril (AS) in such detail in this surah?',
   opts:['Because people in Makkah had begun to worship Jibril',
         'Because Jibril had made a mistake that needed addressing',
         'Because people were curious what real angels look like',
         'To prove the Quran is not from Shaytan — the carrier is pure'],
   correct:3},
];

// S5 — Quiz: The Prophet Defended
const S5_QUIZ=[
  {q:'What does "Wa ma sahibukum bi-majnun" (81:22) mean?',
   opts:['Your companion sometimes acts confused or strangely',
         '"Your companion (Muhammad ﷺ) is NOT mad!" — a clear defence',
         'Your companion does not always speak to you clearly',
         'Your companion is occasionally confused by events'],
   correct:1},
  {q:'What did the Prophet ﷺ actually see on the clear horizon (81:23)?',
   opts:['A vision of Paradise shown to him in a vivid dream',
         'He saw the signs and portents of the Day of Judgment',
         'He truly saw Jibril (AS) in his real angelic form',
         'He saw the Throne of Allah surrounded by angels'],
   correct:2},
  {q:'What does "wa ma huwa \'ala al-ghayb bi-dhannin" (81:24) mean?',
   opts:['He has no knowledge of the unseen whatsoever',
         'He keeps some secrets of the unseen from the people',
         'He does not withhold — he shares everything Allah reveals',
         'He only shares the most important revelations with people'],
   correct:2},
  {q:'What does 81:25 prove about the Quran\'s source?',
   opts:['It is too beautiful in language to come from any evil',
         'Only prophets have the ability to receive such words',
         '"The Quran itself says it is from Allah directly"',
         '"Not the word of a cursed devil" — it comes through a noble angel'],
   correct:3},
];

// S6 — Quiz: Where Are You Going?
const S6_QUIZ=[
  {q:'What is the challenge in "Fa-ayna tadh-habun?" (81:26)?',
   opts:['A question asking people to physically return home',
         'A rhetorical challenge: where are you going if you turn from guidance?',
         'A geographical question about where people are travelling',
         'An encouragement to travel and see the world for yourself'],
   correct:1},
  {q:'Who is the Quran a reminder for according to 81:27?',
   opts:['Only for Arabs who understand the Arabic language',
         'Only for those who have memorised it completely',
         'For "al-\'alamin" — ALL worlds, all peoples of every time',
         'Only for scholars and imams who study it deeply'],
   correct:2},
  {q:'What condition is needed to benefit from the Quran (81:28)?',
   opts:['You must study it under a qualified Islamic scholar',
         'You must know Arabic fluently to understand its meaning',
         'You must be born into a Muslim family first',
         'You must "sha\'a" — WILL it. Make a choice to receive it'],
   correct:3},
  {q:'How does 81:29 balance human free will with Allah\'s will?',
   opts:['Humans have no real free will — only Allah decides everything',
         'You can will and choose — but your will is within Allah\'s will',
         'Allah forces guidance onto whoever He chooses to guide',
         'Human choice is ultimately an illusion with no real effect'],
   correct:1},
];

function renderSection2Game(){renderDragDrop(2,S1_ITEMS,S1_ZONES);}
function checkSection2(){checkDragDrop(2,S1_ZONES);}
function renderSection3Game(){renderQuiz(3,S2_QUIZ);}
function checkSection3(){checkQuiz(3,S2_QUIZ);}
function renderSection4Game(){renderStoryOrder(4,S3_EVENTS_CORRECT);}
function checkSection4(){checkStoryOrder(4,S3_EVENTS_CORRECT);}
function renderSection5Game(){renderQuiz(5,S4_QUIZ);}
function checkSection5(){checkQuiz(5,S4_QUIZ);}
function renderSection6Game(){renderQuiz(6,S5_QUIZ);}
function checkSection6(){checkQuiz(6,S5_QUIZ);}
function renderSection7Game(){renderQuiz(7,S6_QUIZ);}
function checkSection7(){checkQuiz(7,S6_QUIZ);}

// WORLD BUILDER — Celestial Canvas (stars appearing as levels unlock)
function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#c8c070';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#04040e';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#2828a0';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);
  sk.addColorStop(0,n>=6?'#0a0a30':'#04040e');sk.addColorStop(1,n>=6?'#181860':'#08081c');
  ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  // Stars
  const starData=[[80,30],[140,15],[200,45],[260,20],[320,35],[380,12],[440,28],[500,42],[60,55],[170,60],[290,50],[410,65],[530,30],[100,80],[350,75],[480,58]];
  starData.slice(0,n*3).forEach(([sx,sy],i)=>{
    const r=i%3===0?2.5:i%3===1?1.5:1;
    ctx.fillStyle=`rgba(200,200,255,${0.5+i%3*0.2})`;ctx.beginPath();ctx.arc(sx,sy,r,0,Math.PI*2);ctx.fill();
    if(n>=6){ctx.fillStyle=`rgba(255,230,100,${0.3+i%3*0.2})`;ctx.beginPath();ctx.arc(sx,sy,r*1.5,0,Math.PI*2);ctx.fill();}
  });
  if(n<1){_lbl(ctx,W,"⭐ Complete levels to build the Celestial Canvas!",0,6);return;}
  // Horizon
  ctx.fillStyle='#12123a';ctx.fillRect(0,200,W,50);ctx.fillStyle='#1c1c4a';ctx.fillRect(0,200,W,4);
  if(n<2){_lbl(ctx,W,"🌌 Cosmic horizon set — 1/6",1,6);return;}
  // Rolling sun (dimming)
  const sunG=ctx.createRadialGradient(W/2,100,0,W/2,100,40);sunG.addColorStop(0,'#ffffa0');sunG.addColorStop(1,'rgba(255,200,0,0)');
  ctx.globalAlpha=Math.max(0.1,1-n*0.15);ctx.fillStyle=sunG;ctx.beginPath();ctx.arc(W/2,100,40,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  if(n<3){_lbl(ctx,W,"☀️ Sun rolls up — 2/6",2,6);return;}
  // Mountains
  [[60,200,80],[240,200,60],[400,200,70],[480,200,55]].forEach(([mx,my,mw])=>{ctx.fillStyle='#1c1c4a';ctx.beginPath();ctx.moveTo(mx,my);ctx.lineTo(mx+mw/2,my-35);ctx.lineTo(mx+mw,my);ctx.fill();});
  if(n<4){_lbl(ctx,W,"⛰️ Mountains in motion — 3/6",3,6);return;}
  // Records unrolling
  ctx.fillStyle='#c8c090';ctx.fillRect(W/2-40,120,80,50);ctx.strokeStyle='#a08030';ctx.lineWidth=1;ctx.strokeRect(W/2-40,120,80,50);
  ctx.fillStyle='#2a2060';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText('DEEDS',W/2,148);ctx.textAlign='left';
  if(n<5){_lbl(ctx,W,"📜 Records laid open — 4/6",4,6);return;}
  // Hell and Paradise
  ctx.fillStyle='rgba(220,60,20,0.5)';ctx.fillRect(40,170,100,30);
  ctx.fillStyle='rgba(40,180,80,0.5)';ctx.fillRect(420,170,100,30);
  ctx.fillStyle='#fff';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText('🔥',90,190);ctx.fillText('🌿',470,190);ctx.textAlign='left';
  if(n<6){_lbl(ctx,W,"⚖️ Hell & Paradise revealed — 5/6",5,6);return;}
  // Complete: full cosmic scene
  const lg=ctx.createRadialGradient(W/2,50,0,W/2,50,180);
  lg.addColorStop(0,'rgba(200,200,255,0.15)');lg.addColorStop(1,'rgba(100,100,200,0)');
  ctx.fillStyle=lg;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#c8c070';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText("ALLAHUMMA BARIK! 🌌 CELESTIAL CANVAS COMPLETE!",W/2,230);
  ctx.font='6px "Press Start 2P",monospace';ctx.fillText('"Fa-ayna tadh-habun?" — 81:26',W/2,242);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
