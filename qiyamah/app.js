'use strict';
/* Surah Al-Qiyamah (75) — The Resurrection */
window.STORAGE_KEY = 'qiyamahQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Answers:{}, s4Checked:false,
  s5Checked:false,
};

const REWARDS = {
  1:{xp:80, gems:3, icon:'💀', title:'No Oath Needed',        msg:"SubhanAllah! Allah swears by TWO things: the Day of Resurrection itself, AND the reproaching soul (nafs lawwama). The soul that blames itself — that conscience we all feel — is itself a witness to the Day! Every time your conscience bothers you, your soul is testifying to accountability!"},
  2:{xp:80, gems:3, icon:'👁️', title:'Full Sight on That Day', msg:"Allahu Akbar! Man says: who can resurrect these bones? Allah says: YES — We will. Fingertip by fingertip. We will collect him bone by bone. And man WANTS to continue sinning, so he asks foolishly. But the reckoning is certain!"},
  3:{xp:85, gems:3, icon:'✨', title:'Allah Preserves Quran',  msg:"MashAllah! 'La tuharrik bihi lisanaka li-ta\'jala bihi' — Don't move your tongue to hasten the revelation! Allah will collect it and recite it. Allah personally guaranteed the Quran's preservation! This is one of the most important verses about Quranic preservation in the entire Book!"},
  4:{xp:100, gems:4, icon:'🌟', title:'Al-Qiyamah Complete!', msg:"ALLAHUMMA BARIK! Al-Qiyamah complete! Two oaths. The reproaching soul. Bones reassembled. The dying moments — faces bright vs faces gloomy. And Allah's personal guarantee to preserve the Quran. May our faces be bright on That Day! Ameen!"},
  5:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Al-Qiyamah word by word!'},
};

window.SURAH_CONFIG = {
  id:'s75', surahName:'Al-Qiyamah', surahArabic:'القيامة', totalLevels:5, wbwSection:5, rewards:REWARDS,
  tileIcons:['💀','👁️','📖','🌟'],
  tileLabels:['Two Oaths','Resurrection','Quran Preserved','Two Faces'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Qiyamah — The Resurrection! Two powerful oaths. Bones reassembled. Allah preserves the Quran personally. Bright vs dark faces. 4 unforgettable levels!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. The Day is certain — keep going! 💀`,
    complete: name=>`MashAllah, ${name}! Al-Qiyamah complete! May our faces be bright with joy on That Day! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "la uqsimu bi-yawm al-qiyamah" (75:1) do differently from other Quranic oaths?',
   opts:['Allah swears only once without repetition','Allah swears by the Day itself — an oath by the inevitable','Allah says He does NOT swear yet confirms the truth','Allah swears by all creation at once in one oath'],
   correct:2},
  {q:'What is "al-nafs al-lawwama" (75:2) that Allah swears by?',
   opts:['The peaceful soul that rests in certainty','The soul that reproaches and blames itself','The soul that has been fully purified of sin','The soul that is inspired toward righteousness'],
   correct:1},
  {q:'What does man say in 75:3 in his denial?',
   opts:['There is no God to judge our deeds','Does man think We will not collect his bones?','Why would Allah care about such small creatures?','Man thinks his life is too short to be judged'],
   correct:1},
  {q:'According to 75:4, how precisely will Allah resurrect the human body?',
   opts:['In a completely new and different body','Even able to reconstruct the fingertips precisely','As a spirit without any physical body','Exactly as the person appeared at age 40'],
   correct:1},
];

const S2_ITEMS = [
  {id:'v1', text:'فَإِذَا بَرِقَ\nالْبَصَرُ',                       zone:'z1'},
  {id:'v2', text:'وَخَسَفَ الْقَمَرُ',                              zone:'z2'},
  {id:'v3', text:'وَجُمِعَ الشَّمْسُ\nوَالْقَمَرُ',                  zone:'z3'},
  {id:'v4', text:'يَقُولُ الْإِنسَانُ\nيَوْمَئِذٍ أَيْنَ الْمَفَرُّ', zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'The sight is dazzled and overwhelmed — a sign of the cosmic upheaval (75:7)'},
  {id:'z2', desc:'The moon is eclipsed — cosmic order collapses on that Day (75:8)'},
  {id:'z3', desc:'Sun and moon are joined together — total cosmic dissolution, all light merged (75:9)'},
  {id:'z4', desc:'Man cries out: Where is the place of refuge? But there is no escape anywhere (75:10)'},
];

const S3_QUIZ = [
  {q:'What does Allah say in 75:17 about collecting the Quran?',
   opts:['We sent the Quran on the Night of Power','Upon Us is its collection and its recitation','The angels memorise every word for protection','Jibreel will teach it to you letter by letter'],
   correct:1},
  {q:'What does 75:22-23 say about bright faces on that Day?',
   opts:['Faces bright — covered in light and peace','Looking at their Lord — faces radiant and luminous','Faces laughing and celebrating their rewards','Faces filled with gratitude and thankfulness'],
   correct:1},
  {q:'What does 75:24-25 say about dark faces?',
   opts:['Faces dark and covered in dust and shadow','They know that a back-breaking calamity is coming','Faces turned away from Allah in shame and regret','Faces trembling with fear of the blazing fire'],
   correct:1},
  {q:'What does 75:36 challenge: "Does man think he will be left unaccounted?"',
   opts:['Man who ignores prayer will not be judged','Did man think he would be left neglected without purpose?','Does man think his deeds go unseen by Allah?','Will man escape death by being remembered fondly?'],
   correct:1},
];

const S4_FIB = [
  {verse:'لَا أُقْسِمُ بِيَوْمِ _____', opts:['الْقِيَامَةِ','الْحَشْرِ','الْحِسَابِ','الْبَعْثِ'], correct:0, ref:'75:1', translation:'I swear by the Day of Resurrection'},
  {verse:'أَيَحْسَبُ الْإِنسَانُ أَلَّن نَّجْمَعَ _____', opts:['عِظَامَهُ','جِسْمَهُ','رُوحَهُ','تُرَابَهُ'], correct:0, ref:'75:3', translation:'Does man think that We will not assemble his bones?'},
  {verse:'بَلَىٰ قَادِرِينَ عَلَىٰ أَن نُّسَوِّيَ _____', opts:['بَنَانَهُ','يَدَيْهِ','جِلْدَهُ','وَجْهَهُ'], correct:0, ref:'75:4', translation:'Yes! We are able to put together even his fingertips'},
  {verse:'وُجُوهٌ يَوْمَئِذٍ _____ إِلَىٰ رَبِّهَا نَاظِرَةٌ', opts:['نَّاضِرَةٌ','ضَاحِكَةٌ','مُشْرِقَةٌ','بَيْضَاءُ'], correct:0, ref:'75:22-23', translation:'Faces that Day will be radiant, looking at their Lord'},
  {verse:'أَيَحْسَبُ الْإِنسَانُ أَن يُتْرَكَ _____', opts:['سُدًى','هَمَلًا','عَبَثًا','بَاطِلًا'], correct:0, ref:'75:36', translation:'Does man think he will be left neglected?'},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}
function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderFillBlank(4,S4_FIB);}
function checkSection4(){checkFillBlank(4,S4_FIB);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1a1008':'#0e0a04', acc=st?'#f8f0c0':'#f0e8b0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const g=ctx.createRadialGradient(W/2,H/2,5,W/2,H/2,120);g.addColorStop(0,'rgba(248,240,192,0.3)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(n>=2){// Sun/moon eclipse
    ctx.fillStyle='#d0a030';ctx.beginPath();ctx.arc(W*0.3,H*0.3,18,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#303060';ctx.beginPath();ctx.arc(W*0.37,H*0.27,16,0,Math.PI*2);ctx.fill();}
  if(n>=3){// Two faces
    ctx.fillStyle='#f8e090';ctx.beginPath();ctx.arc(W*0.6,H*0.45,14,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#303020';ctx.beginPath();ctx.arc(W*0.76,H*0.45,14,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=5?'AL-QIYAMAH COMPLETE 💀':`Al-Qiyamah — ${n}/5 levels`,W/2,12);ctx.textAlign='left';
};

var WBW_DATA = [
  {label:'75:1 — لَا أُقْسِمُ بِيَوْمِ الْقِيَامَةِ', words:[
    {ar:'لَا', tr:'lā', en:'I swear', freq:1500},
    {ar:'أُقْسِمُ', tr:'uqsimu', en:'by', freq:7},
    {ar:'بِيَوْمِ', tr:'bi-yawmi', en:'the Day of', freq:15},
    {ar:'الْقِيَامَةِ', tr:'al-qiyāmati', en:'Resurrection', freq:70},
  ]},
  {label:'75:2 — وَلَا أُقْسِمُ بِالنَّفْسِ اللَّوَّامَةِ', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'And I swear', freq:700},
    {ar:'أُقْسِمُ', tr:'uqsimu', en:'by', freq:7},
    {ar:'بِالنَّفْسِ', tr:'bin-nafsi', en:'the soul', freq:153},
    {ar:'اللَّوَّامَةِ', tr:'al-lawwāmati', en:'that reproaches', freq:1},
  ]},
  {label:'75:3 — أَيَحْسَبُ الْإِنسَانُ أَلَّن نَّجْمَعَ عِظَامَهُ', words:[
    {ar:'أَيَحْسَبُ', tr:'a-yaḥsabu', en:'Does man think', freq:5},
    {ar:'الْإِنسَانُ', tr:'al-insānu', en:'the human', freq:60},
    {ar:'أَلَّن', tr:'allan', en:'that never', freq:3},
    {ar:'نَّجْمَعَ', tr:'najmaʿa', en:'We will assemble', freq:3},
    {ar:'عِظَامَهُ', tr:'ʿiẓāmahū', en:'his bones', freq:2},
  ]},
  {label:'75:4 — بَلَىٰ قَادِرِينَ عَلَىٰ أَن نُّسَوِّيَ بَنَانَهُ', words:[
    {ar:'بَلَىٰ', tr:'balā', en:'Yes!', freq:22},
    {ar:'قَادِرِينَ', tr:'qādirīna', en:'We are able', freq:6},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'to', freq:1445},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'نُّسَوِّيَ', tr:'nusawwiya', en:'We proportion', freq:2},
    {ar:'بَنَانَهُ', tr:'banānahū', en:'his fingertips', freq:2},
  ]},
  {label:'75:5 — بَلْ يُرِيدُ الْإِنسَانُ لِيَفْجُرَ أَمَامَهُ', words:[
    {ar:'بَلْ', tr:'bal', en:'Rather', freq:112},
    {ar:'يُرِيدُ', tr:'yurīdu', en:'man wishes', freq:28},
    {ar:'الْإِنسَانُ', tr:'al-insānu', en:'the human', freq:60},
    {ar:'لِيَفْجُرَ', tr:'li-yafjura', en:'to sin', freq:1},
    {ar:'أَمَامَهُ', tr:'amāmahū', en:'ahead of him', freq:2},
  ]},
  {label:'75:6 — يَسْأَلُ أَيَّانَ يَوْمُ الْقِيَامَةِ', words:[
    {ar:'يَسْأَلُ', tr:'yasʾalu', en:'He asks', freq:20},
    {ar:'أَيَّانَ', tr:'ayyāna', en:'when is', freq:4},
    {ar:'يَوْمُ', tr:'yawmu', en:'the Day of', freq:365},
    {ar:'الْقِيَامَةِ', tr:'al-qiyāmati', en:'Resurrection', freq:70},
  ]},
  {label:'75:7 — فَإِذَا بَرِقَ الْبَصَرُ', words:[
    {ar:'فَإِذَا', tr:'fa-idhā', en:'When', freq:80},
    {ar:'بَرِقَ', tr:'bariqa', en:'is dazzled', freq:1},
    {ar:'الْبَصَرُ', tr:'al-baṣaru', en:'the sight', freq:20},
  ]},
  {label:'75:8 — وَخَسَفَ الْقَمَرُ', words:[
    {ar:'وَخَسَفَ', tr:'wa-khasafa', en:'And is eclipsed', freq:1},
    {ar:'الْقَمَرُ', tr:'al-qamaru', en:'the moon', freq:20},
  ]},
  {label:'75:9 — وَجُمِعَ الشَّمْسُ وَالْقَمَرُ', words:[
    {ar:'وَجُمِعَ', tr:'wa-jumiʿa', en:'And are joined', freq:2},
    {ar:'الشَّمْسُ', tr:'ash-shamsu', en:'the sun', freq:20},
    {ar:'وَالْقَمَرُ', tr:'wal-qamaru', en:'and the moon', freq:20},
  ]},
  {label:'75:10 — يَقُولُ الْإِنسَانُ يَوْمَئِذٍ أَيْنَ الْمَفَرُّ', words:[
    {ar:'يَقُولُ', tr:'yaqūlu', en:'Man will say', freq:200},
    {ar:'الْإِنسَانُ', tr:'al-insānu', en:'the human', freq:60},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'أَيْنَ', tr:'ayna', en:'Where is', freq:15},
    {ar:'الْمَفَرُّ', tr:'al-mafarru', en:'the escape', freq:1},
  ]},
  {label:'75:11 — كَلَّا لَا وَزَرَ', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'لَا', tr:'lā', en:'There is no', freq:1500},
    {ar:'وَزَرَ', tr:'wazara', en:'refuge', freq:1},
  ]},
  {label:'75:12 — إِلَىٰ رَبِّكَ يَوْمَئِذٍ الْمُسْتَقَرُّ', words:[
    {ar:'إِلَىٰ', tr:'ilā', en:'To', freq:700},
    {ar:'رَبِّكَ', tr:'Rabbika', en:'your Lord', freq:42},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'الْمُسْتَقَرُّ', tr:'al-mustaqarru', en:'is the final place', freq:4},
  ]},
  {label:'75:13 — يُنَبَّأُ الْإِنسَانُ يَوْمَئِذٍ بِمَا قَدَّمَ وَأَخَّرَ', words:[
    {ar:'يُنَبَّأُ', tr:'yunabbaʾu', en:'Man will be informed', freq:3},
    {ar:'الْإِنسَانُ', tr:'al-insānu', en:'the human', freq:60},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'بِمَا', tr:'bi-mā', en:'of what', freq:100},
    {ar:'قَدَّمَ', tr:'qaddama', en:'he sent ahead', freq:5},
    {ar:'وَأَخَّرَ', tr:'wa-akhkhara', en:'and kept back', freq:2},
  ]},
  {label:'75:14 — بَلِ الْإِنسَانُ عَلَىٰ نَفْسِهِ بَصِيرَةٌ', words:[
    {ar:'بَلِ', tr:'bali', en:'Rather', freq:112},
    {ar:'الْإِنسَانُ', tr:'al-insānu', en:'man', freq:60},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'against', freq:1445},
    {ar:'نَفْسِهِ', tr:'nafsihī', en:'himself', freq:20},
    {ar:'بَصِيرَةٌ', tr:'baṣīratun', en:'will be a witness', freq:2},
  ]},
  {label:'75:15 — وَلَوْ أَلْقَىٰ مَعَاذِيرَهُ', words:[
    {ar:'وَلَوْ', tr:'wa-law', en:'Even if', freq:50},
    {ar:'أَلْقَىٰ', tr:'alqā', en:'he presents', freq:6},
    {ar:'مَعَاذِيرَهُ', tr:'maʿādhīrahū', en:'his excuses', freq:1},
  ]},
  {label:'75:16 — لَا تُحَرِّكْ بِهِ لِسَانَكَ لِتَعْجَلَ بِهِ', words:[
    {ar:'لَا', tr:'lā', en:'Do not', freq:1500},
    {ar:'تُحَرِّكْ', tr:'tuḥarrik', en:'move', freq:1},
    {ar:'بِهِ', tr:'bihī', en:'with it', freq:100},
    {ar:'لِسَانَكَ', tr:'lisānaka', en:'your tongue', freq:3},
    {ar:'لِتَعْجَلَ', tr:'li-taʿjala', en:'to hasten', freq:1},
    {ar:'بِهِ', tr:'bihī', en:'with it', freq:100},
  ]},
  {label:'75:17 — إِنَّ عَلَيْنَا جَمْعَهُ وَقُرْآنَهُ', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'عَلَيْنَا', tr:'ʿalaynā', en:'upon Us', freq:12},
    {ar:'جَمْعَهُ', tr:'jamʿahū', en:'is its collection', freq:2},
    {ar:'وَقُرْآنَهُ', tr:'wa-qurʾānahū', en:'and its recitation', freq:1},
  ]},
  {label:'75:18 — فَإِذَا قَرَأْنَاهُ فَاتَّبِعْ قُرْآنَهُ', words:[
    {ar:'فَإِذَا', tr:'fa-idhā', en:'So when', freq:80},
    {ar:'قَرَأْنَاهُ', tr:'qaraʾnāhū', en:'We have recited it', freq:1},
    {ar:'فَاتَّبِعْ', tr:'fattabiʿ', en:'then follow', freq:4},
    {ar:'قُرْآنَهُ', tr:'qurʾānahū', en:'its recitation', freq:1},
  ]},
  {label:'75:19 — ثُمَّ إِنَّ عَلَيْنَا بَيَانَهُ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'إِنَّ', tr:'inna', en:'indeed', freq:490},
    {ar:'عَلَيْنَا', tr:'ʿalaynā', en:'upon Us', freq:12},
    {ar:'بَيَانَهُ', tr:'bayānahū', en:'is its explanation', freq:1},
  ]},
  {label:'75:20 — كَلَّا بَلْ تُحِبُّونَ الْعَاجِلَةَ', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'بَلْ', tr:'bal', en:'But', freq:112},
    {ar:'تُحِبُّونَ', tr:'tuḥibbūna', en:'you love', freq:5},
    {ar:'الْعَاجِلَةَ', tr:'al-ʿājilata', en:'the immediate life', freq:3},
  ]},
  {label:'75:21 — وَتَذَرُونَ الْآخِرَةَ', words:[
    {ar:'وَتَذَرُونَ', tr:'wa-tadharūna', en:'And you leave', freq:2},
    {ar:'الْآخِرَةَ', tr:'al-ākhirata', en:'the Hereafter', freq:100},
  ]},
  {label:'75:22 — وُجُوهٌ يَوْمَئِذٍ نَّاضِرَةٌ', words:[
    {ar:'وُجُوهٌ', tr:'wujūhun', en:'Faces', freq:22},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'نَّاضِرَةٌ', tr:'nāḍiratun', en:'will be radiant', freq:1},
  ]},
  {label:'75:23 — إِلَىٰ رَبِّهَا نَاظِرَةٌ', words:[
    {ar:'إِلَىٰ', tr:'ilā', en:'At', freq:700},
    {ar:'رَبِّهَا', tr:'Rabbihā', en:'their Lord', freq:42},
    {ar:'نَاظِرَةٌ', tr:'nāẓiratun', en:'looking', freq:1},
  ]},
  {label:'75:24 — وَوُجُوهٌ يَوْمَئِذٍ بَاسِرَةٌ', words:[
    {ar:'وَوُجُوهٌ', tr:'wa-wujūhun', en:'And faces', freq:22},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'بَاسِرَةٌ', tr:'bāsiratun', en:'will be gloomy', freq:1},
  ]},
  {label:'75:25 — تَظُنُّ أَن يُفْعَلَ بِهَا فَاقِرَةٌ', words:[
    {ar:'تَظُنُّ', tr:'taẓunnu', en:'Expecting', freq:5},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'يُفْعَلَ', tr:'yufʿala', en:'will be done', freq:2},
    {ar:'بِهَا', tr:'bihā', en:'to them', freq:50},
    {ar:'فَاقِرَةٌ', tr:'fāqiratun', en:'a calamity', freq:1},
  ]},
  {label:'75:26 — كَلَّا إِذَا بَلَغَتِ التَّرَاقِيَ', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'إِذَا', tr:'idhā', en:'When', freq:409},
    {ar:'بَلَغَتِ', tr:'balaghati', en:'it reaches', freq:5},
    {ar:'التَّرَاقِيَ', tr:'at-tarāqiya', en:'the collarbones', freq:1},
  ]},
  {label:'75:27 — وَقِيلَ مَنْ ۜ رَاقٍ', words:[
    {ar:'وَقِيلَ', tr:'wa-qīla', en:'And it is said', freq:22},
    {ar:'مَنْ', tr:'man', en:'Who is', freq:540},
    {ar:'رَاقٍ', tr:'rāqin', en:'a healer', freq:1},
  ]},
  {label:'75:28 — وَظَنَّ أَنَّهُ الْفِرَاقُ', words:[
    {ar:'وَظَنَّ', tr:'wa-ẓanna', en:'And he is certain', freq:5},
    {ar:'أَنَّهُ', tr:'annahū', en:'that it is', freq:40},
    {ar:'الْفِرَاقُ', tr:'al-firāqu', en:'the parting', freq:1},
  ]},
  {label:'75:29 — وَالْتَفَّتِ السَّاقُ بِالسَّاقِ', words:[
    {ar:'وَالْتَفَّتِ', tr:'waltaffati', en:'And is wound', freq:1},
    {ar:'السَّاقُ', tr:'as-sāqu', en:'the leg', freq:2},
    {ar:'بِالسَّاقِ', tr:'bis-sāqi', en:'with the leg', freq:1},
  ]},
  {label:'75:30 — إِلَىٰ رَبِّكَ يَوْمَئِذٍ الْمَسَاقُ', words:[
    {ar:'إِلَىٰ', tr:'ilā', en:'To', freq:700},
    {ar:'رَبِّكَ', tr:'Rabbika', en:'your Lord', freq:42},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'الْمَسَاقُ', tr:'al-masāqu', en:'is the driving', freq:1},
  ]},
  {label:'75:31 — فَلَا صَدَّقَ وَلَا صَلَّىٰ', words:[
    {ar:'فَلَا', tr:'fa-lā', en:'He did not', freq:50},
    {ar:'صَدَّقَ', tr:'ṣaddaqa', en:'believe', freq:5},
    {ar:'وَلَا', tr:'wa-lā', en:'nor did he', freq:700},
    {ar:'صَلَّىٰ', tr:'ṣallā', en:'pray', freq:8},
  ]},
  {label:'75:32 — وَلَٰكِن كَذَّبَ وَتَوَلَّىٰ', words:[
    {ar:'وَلَٰكِن', tr:'wa-lākin', en:'But he', freq:50},
    {ar:'كَذَّبَ', tr:'kadhdhaba', en:'denied', freq:60},
    {ar:'وَتَوَلَّىٰ', tr:'wa-tawallā', en:'and turned away', freq:12},
  ]},
  {label:'75:33 — ثُمَّ ذَهَبَ إِلَىٰ أَهْلِهِ يَتَمَطَّىٰ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'ذَهَبَ', tr:'dhahaba', en:'he went', freq:10},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:700},
    {ar:'أَهْلِهِ', tr:'ahlihī', en:'his people', freq:10},
    {ar:'يَتَمَطَّىٰ', tr:'yatamaṭṭā', en:'swaggering', freq:1},
  ]},
  {label:'75:34 — أَوْلَىٰ لَكَ فَأَوْلَىٰ', words:[
    {ar:'أَوْلَىٰ', tr:'awlā', en:'Woe to you', freq:6},
    {ar:'لَكَ', tr:'laka', en:'for you', freq:60},
    {ar:'فَأَوْلَىٰ', tr:'fa-awlā', en:'and more woe', freq:2},
  ]},
  {label:'75:35 — ثُمَّ أَوْلَىٰ لَكَ فَأَوْلَىٰ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'أَوْلَىٰ', tr:'awlā', en:'woe to you', freq:6},
    {ar:'لَكَ', tr:'laka', en:'for you', freq:60},
    {ar:'فَأَوْلَىٰ', tr:'fa-awlā', en:'and more woe', freq:2},
  ]},
  {label:'75:36 — أَيَحْسَبُ الْإِنسَانُ أَن يُتْرَكَ سُدًى', words:[
    {ar:'أَيَحْسَبُ', tr:'a-yaḥsabu', en:'Does man think', freq:5},
    {ar:'الْإِنسَانُ', tr:'al-insānu', en:'the human', freq:60},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'يُتْرَكَ', tr:'yutraka', en:'he will be left', freq:3},
    {ar:'سُدًى', tr:'sudan', en:'neglected', freq:1},
  ]},
  {label:'75:37 — أَلَمْ يَكُ نُطْفَةً مِّن مَّنِيٍّ يُمْنَىٰ', words:[
    {ar:'أَلَمْ', tr:'a-lam', en:'Was he not', freq:100},
    {ar:'يَكُ', tr:'yaku', en:'a', freq:5},
    {ar:'نُطْفَةً', tr:'nuṭfatan', en:'a drop', freq:8},
    {ar:'مِّن', tr:'min', en:'of', freq:3000},
    {ar:'مَّنِيٍّ', tr:'maniyyin', en:'fluid', freq:2},
    {ar:'يُمْنَىٰ', tr:'yumnā', en:'emitted', freq:2},
  ]},
  {label:'75:38 — ثُمَّ كَانَ عَلَقَةً فَخَلَقَ فَسَوَّىٰ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'كَانَ', tr:'kāna', en:'he became', freq:1358},
    {ar:'عَلَقَةً', tr:'ʿalaqatan', en:'a clinging clot', freq:3},
    {ar:'فَخَلَقَ', tr:'fa-khalaqa', en:'and He created', freq:10},
    {ar:'فَسَوَّىٰ', tr:'fa-sawwā', en:'and proportioned', freq:3},
  ]},
  {label:'75:39 — فَجَعَلَ مِنْهُ الزَّوْجَيْنِ الذَّكَرَ وَالْأُنثَىٰ', words:[
    {ar:'فَجَعَلَ', tr:'fa-jaʿala', en:'And made', freq:14},
    {ar:'مِنْهُ', tr:'minhū', en:'from him', freq:40},
    {ar:'الزَّوْجَيْنِ', tr:'az-zawjayni', en:'two mates', freq:5},
    {ar:'الذَّكَرَ', tr:'adh-dhakara', en:'the male', freq:8},
    {ar:'وَالْأُنثَىٰ', tr:'wal-unthā', en:'and the female', freq:8},
  ]},
  {label:'75:40 — أَلَيْسَ ذَٰلِكَ بِقَادِرٍ عَلَىٰ أَن يُحْيِيَ الْمَوْتَىٰ', words:[
    {ar:'أَلَيْسَ', tr:'a-laysa', en:'Is not', freq:18},
    {ar:'ذَٰلِكَ', tr:'dhālika', en:'that One', freq:350},
    {ar:'بِقَادِرٍ', tr:'bi-qādirin', en:'able', freq:6},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'to', freq:1445},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'يُحْيِيَ', tr:'yuḥyiya', en:'give life to', freq:8},
    {ar:'الْمَوْتَىٰ', tr:'al-mawtā', en:'the dead', freq:12},
  ]},
];
window.setupWBWLevel(WBW_DATA, 10);
