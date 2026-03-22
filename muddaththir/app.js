'use strict';
/* Surah Al-Muddaththir (74) — The Cloaked One */
window.STORAGE_KEY = 'muddaththirQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Answers:{}, s4Checked:false,
  s5Checked:false,
};

const REWARDS = {
  1:{xp:80, gems:3, icon:'📯', title:'Arise & Warn!',         msg:"SubhanAllah! After the pause in revelation (fatra), THIS surah restarted the mission. 'Qum fa-andhir!' — Arise and warn! The Prophet ﷺ was cloaked in his garment, perhaps frightened, perhaps resting — and Allah says: ARISE! The public mission of Islam began with these words. Every da'ee must arise!"},
  2:{xp:80, gems:3, icon:'🔥', title:'Saqar — Hellfire',      msg:"Allahu Akbar! 'Ma salakakum fi Saqar?' — What led you into Saqar (Hellfire)? The answer: we didn't pray, didn't feed the poor, engaged in vain talk, and denied the Day. FOUR reasons — four actions that build or destroy a life. Prayer, charity, guarding your tongue, and believing in accountability!"},
  3:{xp:85, gems:3, icon:'🌙', title:'The Rejector Exposed',  msg:"MashAllah! One man heard the Quran — admitted privately it was extraordinary — then publicly called it 'sihr mu'thar' (bewitching sorcery). Allah exposed him: he thought and plotted — curse on him! One verse at a time, Allah systematically dismantles his excuse. The truth has no equal!"},
  4:{xp:100, gems:4, icon:'✨', title:'Muddaththir Complete!', msg:"ALLAHUMMA BARIK! Al-Muddaththir complete! Arise and warn! Keep your garments pure. Abandon all filth. Don't give to gain more. Four reasons for Hellfire. 19 angels over Saqar. The moon and night as signs. May Allah make us among those who arise and act! Ameen!"},
  5:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Al-Muddaththir word by word!'},
};

window.SURAH_CONFIG = {
  id:'s74', surahName:'Al-Muddaththir', surahArabic:'المدثر', totalLevels:5, wbwSection:5, rewards:REWARDS,
  tileIcons:['📯','🔥','🌙','✨'],
  tileLabels:['Arise & Warn','Hellfire','The Rejector','Complete'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Muddaththir — O Cloaked One! The restart of revelation. Arise and warn! Four reasons for hellfire. The exposed rejector. 4 powerful levels!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Arise and continue the mission! 📯`,
    complete: name=>`MashAllah, ${name}! Al-Muddaththir complete! May Allah make us arise and warn! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "qum fa-andhir" (74:2) command the Prophet ﷺ?',
   opts:['Pray all night and rest in the day','Arise and warn — begin the public mission','Memorize the Quran before teaching it','Hide from the people and worship in secret'],
   correct:1},
  {q:'What does "wa rabbaka fa-kabbir" (74:3) mean?',
   opts:['Praise your Lord in the night hours','And your Lord — magnify and glorify Him!','And your Lord — bow down and prostrate','And pray to your Lord in the morning light'],
   correct:1},
  {q:'What does "wa thiyabaka fa-tahhir" (74:4) command?',
   opts:['And purify your heart from all arrogance','And purify your garments from all filth','And cleanse yourself with water before prayer','And prepare your home for the coming revelation'],
   correct:1},
  {q:'What does "wa la tamnun tastakthir" (74:6) warn against?',
   opts:['Do not give charity expecting no return','Do not give expecting more in return — don\'t do favours for gain','Do not spend more than what you have earned','Do not boast about your acts of worship to others'],
   correct:1},
];

const S2_ITEMS = [
  {id:'s1', text:'قَالُوا لَمْ نَكُ\nمِنَ الْمُصَلِّينَ',             zone:'z1'},
  {id:'s2', text:'وَلَمْ نَكُ نُطْعِمُ\nالْمِسْكِينَ',               zone:'z2'},
  {id:'s3', text:'وَكُنَّا نَخُوضُ\nمَعَ الْخَائِضِينَ',             zone:'z3'},
  {id:'s4', text:'وَكُنَّا نُكَذِّبُ\nبِيَوْمِ الدِّينِ',            zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'We were not among those who prayed — first reason for entering Saqar (74:43)'},
  {id:'z2', desc:'We did not feed the poor and needy — second reason (74:44)'},
  {id:'z3', desc:'We engaged in vain talk with the vain speakers — third reason (74:45)'},
  {id:'z4', desc:'We denied the Day of Judgment — fourth reason (74:46)'},
];

const S3_QUIZ = [
  {q:'What does the man in 74:24 call the Quran after initially admitting its greatness privately?',
   opts:['The words of a madman or a possessed poet','This is nothing but bewitching transmitted sorcery','The lies of a man who seeks only power and wealth','A beautiful poem but not from any god above'],
   correct:1},
  {q:'What does Allah say about the man who "thought and plotted" in 74:19-20?',
   opts:['He will be punished with a severe punishment','How he plotted — then again, curse on him how he plotted!','His plot was exposed and he was humiliated publicly','He was wrong and will be corrected by the truth'],
   correct:1},
  {q:'How many angels guard over Saqar (Hellfire) according to 74:30?',
   opts:['Seven strong and powerful angels','Twelve specially assigned guardians','Nineteen in total over the Hellfire','Eight great angels standing guard'],
   correct:2},
  {q:'What does Allah swear by in 74:32-34?',
   opts:['By the sun and its glorious brightness','By the moon and the night as it retreats','By the earth and all that it contains','By the angels and what they inscribe'],
   correct:1},
];

const S4_FIB = [
  {verse:'قُمْ _____', opts:['فَأَنذِرْ','فَصَلِّ','فَاذْكُرْ','فَاسْجُدْ'], correct:0, ref:'74:2', translation:'Arise and warn!'},
  {verse:'وَرَبَّكَ _____', opts:['فَكَبِّرْ','فَاحْمَدْ','فَسَبِّحْ','فَاعْبُدْ'], correct:0, ref:'74:3', translation:'And your Lord — glorify!'},
  {verse:'إِنْ هَٰذَا إِلَّا سِحْرٌ _____', opts:['يُؤْثَرُ','يُذْكَرُ','يُنْشَرُ','يُقَدَّرُ'], correct:0, ref:'74:24', translation:'This is nothing but transmitted sorcery'},
  {verse:'عَلَيْهَا _____ عَشَرَ', opts:['تِسْعَةَ','سَبْعَةَ','خَمْسَةَ','ثَلَاثَةَ'], correct:0, ref:'74:30', translation:'Over it are nineteen (angels)'},
  {verse:'كُلُّ نَفْسٍ بِمَا كَسَبَتْ _____', opts:['رَهِينَةٌ','مَسْؤُولَةٌ','مَحْفُوظَةٌ','مَحْبُوسَةٌ'], correct:0, ref:'74:38', translation:'Every soul, for what it has earned, is held in pledge'},
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
  const sky=st?'#180a02':'#0e0400', acc=st?'#f8c040':'#e8a830';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// Rising sun / call
    const g=ctx.createRadialGradient(W*0.5,H*0.1,0,W*0.5,H*0.1,80);
    g.addColorStop(0,'rgba(248,160,64,0.5)');g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(n>=2){// Fire
    for(let i=0;i<8;i++){ctx.fillStyle=`rgba(${200+i*5},${40+i*5},0,${0.4+i*0.05})`;ctx.fillRect(W*0.1+i*W*0.1,H*0.7-i*8,W*0.08,H*0.3+i*8);}}
  if(n>=3){// Moon
    ctx.fillStyle='#d0c090';ctx.beginPath();ctx.arc(W*0.75,H*0.2,16,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=sky;ctx.beginPath();ctx.arc(W*0.8,H*0.18,12,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=5?'MUDDATHTHIR COMPLETE 📯':`Muddaththir — ${n}/5 levels`,W/2,12);ctx.textAlign='left';
};

var WBW_DATA = [
  {label:'74:1 — يَا أَيُّهَا الْمُدَّثِّرُ', words:[
    {ar:'يَا', tr:'yā', en:'O', freq:142},
    {ar:'أَيُّهَا', tr:'ayyuhā', en:'you', freq:142},
    {ar:'الْمُدَّثِّرُ', tr:'al-muddaththiru', en:'the one enveloped', freq:1},
  ]},
  {label:'74:2 — قُمْ فَأَنذِرْ', words:[
    {ar:'قُمْ', tr:'qum', en:'Arise', freq:4},
    {ar:'فَأَنذِرْ', tr:'fa-andhir', en:'and warn', freq:2},
  ]},
  {label:'74:3 — وَرَبَّكَ فَكَبِّرْ', words:[
    {ar:'وَرَبَّكَ', tr:'wa-Rabbaka', en:'And your Lord', freq:42},
    {ar:'فَكَبِّرْ', tr:'fa-kabbir', en:'glorify', freq:1},
  ]},
  {label:'74:4 — وَثِيَابَكَ فَطَهِّرْ', words:[
    {ar:'وَثِيَابَكَ', tr:'wa-thiyābaka', en:'And your garments', freq:1},
    {ar:'فَطَهِّرْ', tr:'fa-ṭahhir', en:'purify', freq:1},
  ]},
  {label:'74:5 — وَالرُّجْزَ فَاهْجُرْ', words:[
    {ar:'وَالرُّجْزَ', tr:'war-rujza', en:'And the filth', freq:2},
    {ar:'فَاهْجُرْ', tr:'fa-hjur', en:'abandon', freq:1},
  ]},
  {label:'74:6 — وَلَا تَمْنُن تَسْتَكْثِرُ', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'And do not', freq:700},
    {ar:'تَمْنُن', tr:'tamnun', en:'give a favour', freq:1},
    {ar:'تَسْتَكْثِرُ', tr:'tastakthiru', en:'expecting more', freq:1},
  ]},
  {label:'74:7 — وَلِرَبِّكَ فَاصْبِرْ', words:[
    {ar:'وَلِرَبِّكَ', tr:'wa-li-Rabbika', en:'And for your Lord', freq:1},
    {ar:'فَاصْبِرْ', tr:'fa-ṣbir', en:'be patient', freq:4},
  ]},
  {label:'74:8 — فَإِذَا نُقِرَ فِي النَّاقُورِ', words:[
    {ar:'فَإِذَا', tr:'fa-idhā', en:'Then when', freq:80},
    {ar:'نُقِرَ', tr:'nuqira', en:'is blown', freq:1},
    {ar:'فِي', tr:'fī', en:'in', freq:1700},
    {ar:'النَّاقُورِ', tr:'an-nāqūri', en:'the trumpet', freq:1},
  ]},
  {label:'74:9 — فَذَٰلِكَ يَوْمَئِذٍ يَوْمٌ عَسِيرٌ', words:[
    {ar:'فَذَٰلِكَ', tr:'fa-dhālika', en:'That, that Day', freq:30},
    {ar:'يَوْمَئِذٍ', tr:'yawma-idhin', en:'that Day', freq:50},
    {ar:'يَوْمٌ', tr:'yawmun', en:'will be a Day', freq:365},
    {ar:'عَسِيرٌ', tr:'ʿasīrun', en:'difficult', freq:3},
  ]},
  {label:'74:10 — عَلَى الْكَافِرِينَ غَيْرُ يَسِيرٍ', words:[
    {ar:'عَلَى', tr:'ʿalā', en:'Upon', freq:1445},
    {ar:'الْكَافِرِينَ', tr:'al-kāfirīna', en:'the disbelievers', freq:120},
    {ar:'غَيْرُ', tr:'ghayru', en:'not', freq:100},
    {ar:'يَسِيرٍ', tr:'yasīrin', en:'easy', freq:5},
  ]},
  {label:'74:11 — ذَرْنِي وَمَنْ خَلَقْتُ وَحِيدًا', words:[
    {ar:'ذَرْنِي', tr:'dharnī', en:'Leave Me', freq:2},
    {ar:'وَمَنْ', tr:'wa-man', en:'and whom', freq:100},
    {ar:'خَلَقْتُ', tr:'khalaqtu', en:'I created', freq:14},
    {ar:'وَحِيدًا', tr:'waḥīdan', en:'alone', freq:3},
  ]},
  {label:'74:12 — وَجَعَلْتُ لَهُ مَالًا مَّمْدُودًا', words:[
    {ar:'وَجَعَلْتُ', tr:'wa-jaʿaltu', en:'And I granted', freq:14},
    {ar:'لَهُ', tr:'lahū', en:'him', freq:800},
    {ar:'مَالًا', tr:'mālan', en:'wealth', freq:50},
    {ar:'مَّمْدُودًا', tr:'mamdūdan', en:'extensive', freq:2},
  ]},
  {label:'74:13 — وَبَنِينَ شُهُودًا', words:[
    {ar:'وَبَنِينَ', tr:'wa-banīna', en:'And sons', freq:10},
    {ar:'شُهُودًا', tr:'shuhūdan', en:'present', freq:2},
  ]},
  {label:'74:14 — وَمَهَّدتُّ لَهُ تَمْهِيدًا', words:[
    {ar:'وَمَهَّدتُّ', tr:'wa-mahhadtu', en:'And I spread', freq:1},
    {ar:'لَهُ', tr:'lahū', en:'for him', freq:800},
    {ar:'تَمْهِيدًا', tr:'tamhīdan', en:'ease', freq:1},
  ]},
  {label:'74:15 — ثُمَّ يَطْمَعُ أَنْ أَزِيدَ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'يَطْمَعُ', tr:'yaṭmaʿu', en:'he desires', freq:2},
    {ar:'أَنْ', tr:'an', en:'that', freq:560},
    {ar:'أَزِيدَ', tr:'azīda', en:'I increase', freq:1},
  ]},
  {label:'74:16 — كَلَّا ۖ إِنَّهُ كَانَ لِآيَاتِنَا عَنِيدًا', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'إِنَّهُ', tr:'innahū', en:'Indeed he', freq:50},
    {ar:'كَانَ', tr:'kāna', en:'has been', freq:1358},
    {ar:'لِآيَاتِنَا', tr:'li-āyātinā', en:'to Our signs', freq:18},
    {ar:'عَنِيدًا', tr:'ʿanīdan', en:'obstinate', freq:2},
  ]},
  {label:'74:17 — سَأُرْهِقُهُ صَعُودًا', words:[
    {ar:'سَأُرْهِقُهُ', tr:'sa-urhiquhū', en:'I will drive him', freq:1},
    {ar:'صَعُودًا', tr:'ṣaʿūdan', en:'to a painful ascent', freq:2},
  ]},
  {label:'74:18 — إِنَّهُ فَكَّرَ وَقَدَّرَ', words:[
    {ar:'إِنَّهُ', tr:'innahū', en:'Indeed he', freq:50},
    {ar:'فَكَّرَ', tr:'fakkara', en:'thought', freq:1},
    {ar:'وَقَدَّرَ', tr:'wa-qaddara', en:'and plotted', freq:2},
  ]},
  {label:'74:19 — فَقُتِلَ كَيْفَ قَدَّرَ', words:[
    {ar:'فَقُتِلَ', tr:'fa-qutila', en:'So may he be destroyed', freq:2},
    {ar:'كَيْفَ', tr:'kayfa', en:'how', freq:80},
    {ar:'قَدَّرَ', tr:'qaddara', en:'he plotted', freq:2},
  ]},
  {label:'74:20 — ثُمَّ قُتِلَ كَيْفَ قَدَّرَ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'قُتِلَ', tr:'qutila', en:'may he be destroyed', freq:6},
    {ar:'كَيْفَ', tr:'kayfa', en:'how', freq:80},
    {ar:'قَدَّرَ', tr:'qaddara', en:'he plotted', freq:2},
  ]},
  {label:'74:21 — ثُمَّ نَظَرَ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'نَظَرَ', tr:'naẓara', en:'he looked', freq:10},
  ]},
  {label:'74:22 — ثُمَّ عَبَسَ وَبَسَرَ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'عَبَسَ', tr:'ʿabasa', en:'he frowned', freq:2},
    {ar:'وَبَسَرَ', tr:'wa-basara', en:'and scowled', freq:1},
  ]},
  {label:'74:23 — ثُمَّ أَدْبَرَ وَاسْتَكْبَرَ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'أَدْبَرَ', tr:'adbara', en:'he turned back', freq:5},
    {ar:'وَاسْتَكْبَرَ', tr:'wa-stakbara', en:'and was arrogant', freq:5},
  ]},
  {label:'74:24 — فَقَالَ إِنْ هَٰذَا إِلَّا سِحْرٌ يُؤْثَرُ', words:[
    {ar:'فَقَالَ', tr:'fa-qāla', en:'And said', freq:200},
    {ar:'إِنْ', tr:'in', en:'This is not', freq:560},
    {ar:'هَٰذَا', tr:'hādhā', en:'this', freq:350},
    {ar:'إِلَّا', tr:'illā', en:'but', freq:663},
    {ar:'سِحْرٌ', tr:'siḥrun', en:'magic', freq:20},
    {ar:'يُؤْثَرُ', tr:'yuʾtharu', en:'transmitted', freq:1},
  ]},
  {label:'74:25 — إِنْ هَٰذَا إِلَّا قَوْلُ الْبَشَرِ', words:[
    {ar:'إِنْ', tr:'in', en:'This is not', freq:560},
    {ar:'هَٰذَا', tr:'hādhā', en:'this', freq:350},
    {ar:'إِلَّا', tr:'illā', en:'but', freq:663},
    {ar:'قَوْلُ', tr:'qawlu', en:'the word of', freq:70},
    {ar:'الْبَشَرِ', tr:'al-bashari', en:'a human', freq:16},
  ]},
  {label:'74:26 — سَأُصْلِيهِ سَقَرَ', words:[
    {ar:'سَأُصْلِيهِ', tr:'sa-uṣlīhi', en:'I will burn him in', freq:1},
    {ar:'سَقَرَ', tr:'saqara', en:'Saqar (Hellfire)', freq:4},
  ]},
  {label:'74:27 — وَمَا أَدْرَاكَ مَا سَقَرُ', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'And what', freq:2000},
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'can make you know', freq:13},
    {ar:'مَا', tr:'mā', en:'what', freq:2000},
    {ar:'سَقَرُ', tr:'saqaru', en:'Saqar is', freq:4},
  ]},
  {label:'74:28 — لَا تُبْقِي وَلَا تَذَرُ', words:[
    {ar:'لَا', tr:'lā', en:'It spares not', freq:1500},
    {ar:'تُبْقِي', tr:'tubqī', en:'leaves nothing', freq:1},
    {ar:'وَلَا', tr:'wa-lā', en:'and does not', freq:700},
    {ar:'تَذَرُ', tr:'tadharu', en:'leave alone', freq:2},
  ]},
  {label:'74:29 — لَوَّاحَةٌ لِّلْبَشَرِ', words:[
    {ar:'لَوَّاحَةٌ', tr:'lawwāḥatun', en:'Scorching', freq:1},
    {ar:'لِّلْبَشَرِ', tr:'lil-bashari', en:'for mankind', freq:16},
  ]},
  {label:'74:30 — عَلَيْهَا تِسْعَةَ عَشَرَ', words:[
    {ar:'عَلَيْهَا', tr:'ʿalayhā', en:'Over it are', freq:40},
    {ar:'تِسْعَةَ', tr:'tisʿata', en:'nineteen', freq:1},
    {ar:'عَشَرَ', tr:'ʿashara', en:'(angels)', freq:2},
  ]},
  {label:'74:31 — وَمَا جَعَلْنَا أَصْحَابَ النَّارِ إِلَّا مَلَائِكَةً ۙ وَمَا جَعَلْنَا عِدَّتَهُمْ إِلَّا فِتْنَةً لِّلَّذِينَ كَفَرُوا', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'And We have not', freq:2000},
    {ar:'جَعَلْنَا', tr:'jaʿalnā', en:'made', freq:40},
    {ar:'أَصْحَابَ', tr:'aṣḥāba', en:'keepers of', freq:80},
    {ar:'النَّارِ', tr:'an-nāri', en:'the Fire', freq:125},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:663},
    {ar:'مَلَائِكَةً', tr:'malāʾikatan', en:'angels', freq:60},
    {ar:'وَمَا', tr:'wa-mā', en:'And We have not', freq:2000},
    {ar:'جَعَلْنَا', tr:'jaʿalnā', en:'made', freq:40},
    {ar:'عِدَّتَهُمْ', tr:'ʿiddatahum', en:'their number', freq:1},
    {ar:'إِلَّا', tr:'illā', en:'except as', freq:663},
    {ar:'فِتْنَةً', tr:'fitnatan', en:'a trial', freq:18},
    {ar:'لِّلَّذِينَ', tr:'lilladhīna', en:'for those who', freq:1283},
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieve', freq:180},
    {ar:'لِيَسْتَيْقِنَ', tr:'li-yastayqina', en:'that may be certain', freq:1},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    {ar:'أُوتُوا', tr:'ūtū', en:'were given', freq:30},
    {ar:'الْكِتَابَ', tr:'al-kitāba', en:'the Scripture', freq:230},
    {ar:'وَيَزْدَادَ', tr:'wa-yazdāda', en:'and may increase', freq:1},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    {ar:'آمَنُوا', tr:'āmanū', en:'believe', freq:537},
    {ar:'إِيمَانًا', tr:'īmānan', en:'in faith', freq:17},
    {ar:'وَلَا', tr:'wa-lā', en:'and not', freq:700},
    {ar:'يَرْتَابَ', tr:'yartāba', en:'may doubt', freq:2},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    {ar:'أُوتُوا', tr:'ūtū', en:'were given', freq:30},
    {ar:'الْكِتَابَ', tr:'al-kitāba', en:'the Scripture', freq:230},
    {ar:'وَالْمُؤْمِنُونَ', tr:'wal-muʾminūna', en:'and the believers', freq:18},
    {ar:'وَلِيَقُولَ', tr:'wa-li-yaqūla', en:'and that may say', freq:2},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those', freq:1283},
    {ar:'فِي', tr:'fī', en:'in', freq:1700},
    {ar:'قُلُوبِهِم', tr:'qulūbihim', en:'their hearts', freq:40},
    {ar:'مَّرَضٌ', tr:'maraḍun', en:'is disease', freq:12},
    {ar:'وَالْكَافِرُونَ', tr:'wal-kāfirūna', en:'and the disbelievers', freq:120},
    {ar:'مَاذَا', tr:'mādhā', en:'What did', freq:30},
    {ar:'أَرَادَ', tr:'arāda', en:'intend', freq:10},
    {ar:'اللَّهُ', tr:'Allāhu', en:'Allah', freq:2699},
    {ar:'بِهَٰذَا', tr:'bi-hādhā', en:'by this', freq:8},
    {ar:'مَثَلًا', tr:'mathalan', en:'example', freq:30},
    {ar:'كَذَٰلِكَ', tr:'kadhālika', en:'Thus', freq:80},
    {ar:'يُضِلُّ', tr:'yuḍillu', en:'lets go astray', freq:10},
    {ar:'اللَّهُ', tr:'Allāhu', en:'Allah', freq:2699},
    {ar:'مَن', tr:'man', en:'whom', freq:540},
    {ar:'يَشَاءُ', tr:'yashāʾu', en:'He wills', freq:30},
    {ar:'وَيَهْدِي', tr:'wa-yahdī', en:'and guides', freq:10},
    {ar:'مَن', tr:'man', en:'whom', freq:540},
    {ar:'يَشَاءُ', tr:'yashāʾu', en:'He wills', freq:30},
    {ar:'وَمَا', tr:'wa-mā', en:'And none', freq:2000},
    {ar:'يَعْلَمُ', tr:'yaʿlamu', en:'knows', freq:48},
    {ar:'جُنُودَ', tr:'junūda', en:'the soldiers of', freq:5},
    {ar:'رَبِّكَ', tr:'Rabbika', en:'your Lord', freq:42},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:663},
    {ar:'هُوَ', tr:'Huwa', en:'Him', freq:265},
    {ar:'وَمَا', tr:'wa-mā', en:'And it is not', freq:2000},
    {ar:'هِيَ', tr:'hiya', en:'it', freq:20},
    {ar:'إِلَّا', tr:'illā', en:'but', freq:663},
    {ar:'ذِكْرَىٰ', tr:'dhikrā', en:'a reminder', freq:18},
    {ar:'لِلْبَشَرِ', tr:'lil-bashari', en:'for mankind', freq:16},
  ]},
  {label:'74:32 — كَلَّا وَالْقَمَرِ', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'وَالْقَمَرِ', tr:'wal-qamari', en:'By the moon', freq:8},
  ]},
  {label:'74:33 — وَاللَّيْلِ إِذْ أَدْبَرَ', words:[
    {ar:'وَاللَّيْلِ', tr:'wal-layli', en:'And the night', freq:60},
    {ar:'إِذْ', tr:'idh', en:'when', freq:245},
    {ar:'أَدْبَرَ', tr:'adbara', en:'it departs', freq:5},
  ]},
  {label:'74:34 — وَالصُّبْحِ إِذَا أَسْفَرَ', words:[
    {ar:'وَالصُّبْحِ', tr:'waṣ-ṣubḥi', en:'And the dawn', freq:3},
    {ar:'إِذَا', tr:'idhā', en:'when', freq:409},
    {ar:'أَسْفَرَ', tr:'asfara', en:'it shines', freq:1},
  ]},
  {label:'74:35 — إِنَّهَا لَإِحْدَى الْكُبَرِ', words:[
    {ar:'إِنَّهَا', tr:'innahā', en:'Indeed it', freq:22},
    {ar:'لَإِحْدَى', tr:'la-iḥdā', en:'is one of', freq:2},
    {ar:'الْكُبَرِ', tr:'al-kubari', en:'the greatest', freq:1},
  ]},
  {label:'74:36 — نَذِيرًا لِّلْبَشَرِ', words:[
    {ar:'نَذِيرًا', tr:'nadhīran', en:'A warning', freq:22},
    {ar:'لِّلْبَشَرِ', tr:'lil-bashari', en:'for mankind', freq:16},
  ]},
  {label:'74:37 — لِمَن شَاءَ مِنكُمْ أَن يَتَقَدَّمَ أَوْ يَتَأَخَّرَ', words:[
    {ar:'لِمَن', tr:'li-man', en:'For whoever', freq:40},
    {ar:'شَاءَ', tr:'shāʾa', en:'wills', freq:30},
    {ar:'مِنكُمْ', tr:'minkum', en:'among you', freq:36},
    {ar:'أَن', tr:'an', en:'to', freq:560},
    {ar:'يَتَقَدَّمَ', tr:'yataqaddama', en:'go forward', freq:1},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
    {ar:'يَتَأَخَّرَ', tr:'yataʾakhkhara', en:'stay behind', freq:1},
  ]},
  {label:'74:38 — كُلُّ نَفْسٍ بِمَا كَسَبَتْ رَهِينَةٌ', words:[
    {ar:'كُلُّ', tr:'kullu', en:'Every', freq:152},
    {ar:'نَفْسٍ', tr:'nafsin', en:'soul', freq:153},
    {ar:'بِمَا', tr:'bi-mā', en:'for what', freq:100},
    {ar:'كَسَبَتْ', tr:'kasabat', en:'it has earned', freq:18},
    {ar:'رَهِينَةٌ', tr:'rahīnatun', en:'is held in pledge', freq:1},
  ]},
  {label:'74:39 — إِلَّا أَصْحَابَ الْيَمِينِ', words:[
    {ar:'إِلَّا', tr:'illā', en:'Except', freq:663},
    {ar:'أَصْحَابَ', tr:'aṣḥāba', en:'companions of', freq:80},
    {ar:'الْيَمِينِ', tr:'al-yamīni', en:'the right', freq:7},
  ]},
  {label:'74:40 — فِي جَنَّاتٍ يَتَسَاءَلُونَ', words:[
    {ar:'فِي', tr:'fī', en:'In', freq:1700},
    {ar:'جَنَّاتٍ', tr:'jannātin', en:'gardens', freq:60},
    {ar:'يَتَسَاءَلُونَ', tr:'yatasāʾalūna', en:'they will ask', freq:3},
  ]},
  {label:'74:41 — عَنِ الْمُجْرِمِينَ', words:[
    {ar:'عَنِ', tr:'ʿani', en:'About', freq:420},
    {ar:'الْمُجْرِمِينَ', tr:'al-mujrimīna', en:'the criminals', freq:42},
  ]},
  {label:'74:42 — مَا سَلَكَكُمْ فِي سَقَرَ', words:[
    {ar:'مَا', tr:'mā', en:'What', freq:2000},
    {ar:'سَلَكَكُمْ', tr:'salakakum', en:'led you into', freq:1},
    {ar:'فِي', tr:'fī', en:'into', freq:1700},
    {ar:'سَقَرَ', tr:'saqara', en:'Saqar', freq:4},
  ]},
  {label:'74:43 — قَالُوا لَمْ نَكُ مِنَ الْمُصَلِّينَ', words:[
    {ar:'قَالُوا', tr:'qālū', en:'They will say', freq:332},
    {ar:'لَمْ', tr:'lam', en:'We were not', freq:320},
    {ar:'نَكُ', tr:'naku', en:'among', freq:5},
    {ar:'مِنَ', tr:'mina', en:'of', freq:3000},
    {ar:'الْمُصَلِّينَ', tr:'al-muṣallīna', en:'those who prayed', freq:4},
  ]},
  {label:'74:44 — وَلَمْ نَكُ نُطْعِمُ الْمِسْكِينَ', words:[
    {ar:'وَلَمْ', tr:'wa-lam', en:'And we did not', freq:320},
    {ar:'نَكُ', tr:'naku', en:'used to', freq:5},
    {ar:'نُطْعِمُ', tr:'nuṭʿimu', en:'feed', freq:3},
    {ar:'الْمِسْكِينَ', tr:'al-miskīna', en:'the needy', freq:18},
  ]},
  {label:'74:45 — وَكُنَّا نَخُوضُ مَعَ الْخَائِضِينَ', words:[
    {ar:'وَكُنَّا', tr:'wa-kunnā', en:'And we used to', freq:14},
    {ar:'نَخُوضُ', tr:'nakhūḍu', en:'engage in vain talk', freq:1},
    {ar:'مَعَ', tr:'maʿa', en:'with', freq:160},
    {ar:'الْخَائِضِينَ', tr:'al-khāʾiḍīna', en:'those who engaged', freq:1},
  ]},
  {label:'74:46 — وَكُنَّا نُكَذِّبُ بِيَوْمِ الدِّينِ', words:[
    {ar:'وَكُنَّا', tr:'wa-kunnā', en:'And we used to', freq:14},
    {ar:'نُكَذِّبُ', tr:'nukadhdhibu', en:'deny', freq:2},
    {ar:'بِيَوْمِ', tr:'bi-yawmi', en:'the Day of', freq:15},
    {ar:'الدِّينِ', tr:'ad-dīni', en:'Judgment', freq:62},
  ]},
  {label:'74:47 — حَتَّىٰ أَتَانَا الْيَقِينُ', words:[
    {ar:'حَتَّىٰ', tr:'ḥattā', en:'Until', freq:133},
    {ar:'أَتَانَا', tr:'atānā', en:'came to us', freq:5},
    {ar:'الْيَقِينُ', tr:'al-yaqīnu', en:'the certainty (death)', freq:4},
  ]},
  {label:'74:48 — فَمَا تَنفَعُهُمْ شَفَاعَةُ الشَّافِعِينَ', words:[
    {ar:'فَمَا', tr:'fa-mā', en:'So will not', freq:100},
    {ar:'تَنفَعُهُمْ', tr:'tanfaʿuhum', en:'benefit them', freq:4},
    {ar:'شَفَاعَةُ', tr:'shafāʿatu', en:'the intercession of', freq:7},
    {ar:'الشَّافِعِينَ', tr:'ash-shāfiʿīna', en:'the intercessors', freq:1},
  ]},
  {label:'74:49 — فَمَا لَهُمْ عَنِ التَّذْكِرَةِ مُعْرِضِينَ', words:[
    {ar:'فَمَا', tr:'fa-mā', en:'Then what is', freq:100},
    {ar:'لَهُمْ', tr:'lahum', en:'with them', freq:380},
    {ar:'عَنِ', tr:'ʿani', en:'from', freq:420},
    {ar:'التَّذْكِرَةِ', tr:'at-tadhkirati', en:'the reminder', freq:6},
    {ar:'مُعْرِضِينَ', tr:'muʿriḍīna', en:'turning away', freq:6},
  ]},
  {label:'74:50 — كَأَنَّهُمْ حُمُرٌ مُّسْتَنفِرَةٌ', words:[
    {ar:'كَأَنَّهُمْ', tr:'ka-annahum', en:'As if they were', freq:8},
    {ar:'حُمُرٌ', tr:'ḥumurun', en:'wild donkeys', freq:1},
    {ar:'مُّسْتَنفِرَةٌ', tr:'mustanfiratun', en:'fleeing', freq:1},
  ]},
  {label:'74:51 — فَرَّتْ مِن قَسْوَرَةٍ', words:[
    {ar:'فَرَّتْ', tr:'farrat', en:'Fleeing', freq:1},
    {ar:'مِن', tr:'min', en:'from', freq:3000},
    {ar:'قَسْوَرَةٍ', tr:'qaswara', en:'a lion', freq:1},
  ]},
  {label:'74:52 — بَلْ يُرِيدُ كُلُّ امْرِئٍ مِّنْهُمْ أَن يُؤْتَىٰ صُحُفًا مُّنَشَّرَةً', words:[
    {ar:'بَلْ', tr:'bal', en:'Rather', freq:112},
    {ar:'يُرِيدُ', tr:'yurīdu', en:'wants', freq:28},
    {ar:'كُلُّ', tr:'kullu', en:'every', freq:152},
    {ar:'امْرِئٍ', tr:'imriʾin', en:'person', freq:4},
    {ar:'مِّنْهُمْ', tr:'minhum', en:'among them', freq:100},
    {ar:'أَن', tr:'an', en:'to', freq:560},
    {ar:'يُؤْتَىٰ', tr:'yuʾtā', en:'be given', freq:6},
    {ar:'صُحُفًا', tr:'ṣuḥufan', en:'scriptures', freq:4},
    {ar:'مُّنَشَّرَةً', tr:'munashsharatan', en:'spread out', freq:1},
  ]},
  {label:'74:53 — كَلَّا ۖ بَل لَّا يَخَافُونَ الْآخِرَةَ', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'بَل', tr:'bal', en:'But', freq:112},
    {ar:'لَّا', tr:'lā', en:'they do not', freq:1500},
    {ar:'يَخَافُونَ', tr:'yakhāfūna', en:'fear', freq:8},
    {ar:'الْآخِرَةَ', tr:'al-ākhirata', en:'the Hereafter', freq:100},
  ]},
  {label:'74:54 — كَلَّا إِنَّهُ تَذْكِرَةٌ', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'إِنَّهُ', tr:'innahū', en:'Indeed it is', freq:50},
    {ar:'تَذْكِرَةٌ', tr:'tadhkiratun', en:'a reminder', freq:6},
  ]},
  {label:'74:55 — فَمَن شَاءَ ذَكَرَهُ', words:[
    {ar:'فَمَن', tr:'fa-man', en:'So whoever', freq:540},
    {ar:'شَاءَ', tr:'shāʾa', en:'wills', freq:30},
    {ar:'ذَكَرَهُ', tr:'dhakarahū', en:'will remember it', freq:2},
  ]},
  {label:'74:56 — وَمَا يَذْكُرُونَ إِلَّا أَن يَشَاءَ اللَّهُ ۚ هُوَ أَهْلُ التَّقْوَىٰ وَأَهْلُ الْمَغْفِرَةِ', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'And they will not', freq:2000},
    {ar:'يَذْكُرُونَ', tr:'yadhkurūna', en:'remember', freq:10},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:663},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'يَشَاءَ', tr:'yashāʾa', en:'wills', freq:30},
    {ar:'اللَّهُ', tr:'Allāhu', en:'Allah', freq:2699},
    {ar:'هُوَ', tr:'Huwa', en:'He is', freq:265},
    {ar:'أَهْلُ', tr:'ahlu', en:'worthy of', freq:10},
    {ar:'التَّقْوَىٰ', tr:'at-taqwā', en:'righteousness', freq:15},
    {ar:'وَأَهْلُ', tr:'wa-ahlu', en:'and worthy of', freq:10},
    {ar:'الْمَغْفِرَةِ', tr:'al-maghfirati', en:'forgiveness', freq:15},
  ]},
];
window.setupWBWLevel(WBW_DATA, 10);
