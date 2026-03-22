'use strict';
/* Surah Nuh (71) — Prophet Nuh */
window.STORAGE_KEY = 'nuhQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Order:[], s3Checked:false,
  s4Checked:false,
  s5Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'🚢', title:'950 Year Mission',      msg:"SubhanAllah! Prophet Nuh (AS) preached for 950 years — and only a few believed! 'Wa laqad arsalna Nuhan ila qawmihi fa-labitsa feehim alfa sanatin illa khamseena aman.' Nine centuries and a half — of patience, rejection, mockery. May Allah give us even a fraction of that patience!"},
  2:{xp:80, gems:3, icon:'📢', title:'Three Methods of Da\'wah', msg:"MashAllah! Nuh (AS) used THREE powerful methods: public calls, private whispers, and night-and-day dedication. He never gave up. He connected their worship of Allah to the blessings of rain, wealth, children, gardens, and rivers. This is wisdom in da'wah!"},
  3:{xp:85, gems:3, icon:'🌊', title:'The Flood',              msg:"Allahu Akbar! When Nuh's people refused, Allah commanded him to build the ark. Then the water from the sky and the earth burst forth. The flood covered everything. Only believers on the ark were saved. Nuh's own son refused — and drowned. Guidance is Allah's gift, not guaranteed by blood."},
  4:{xp:100, gems:4, icon:'✨', title:'Nuh Complete!',         msg:"ALLAHUMMA BARIK! Surah Nuh complete! 950 years of calling. Three methods of da'wah. The magnificent benefits of istighfar (forgiveness-seeking). The flood and the ark. And Nuh's beautiful prayer for forgiveness. May Allah accept our calling others to Him! Ameen!"},
  5:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Nuh word by word!'},
};

window.SURAH_CONFIG = {
  id:'s71', surahName:'Nuh', surahArabic:'نوح', totalLevels:5, wbwSection:5, rewards:REWARDS,
  tileIcons:['🚢','📢','🌊','🙏'],
  tileLabels:['950 Years','Da\'wah Methods','The Flood','Nuh\'s Prayer'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Surah Nuh — Prophet Nuh (AS) called his people for 950 years! Three methods of da'wah. The magnificent flood. Nuh's powerful prayer. 4 levels of lessons in patience!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Like Nuh — keep calling, never give up! 🚢`,
    complete: name=>`MashAllah, ${name}! Surah Nuh complete! May Allah grant us patience and wisdom like Nuh! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'How many years did Prophet Nuh (AS) call his people (71:5)?',
   opts:['Five hundred years among his people','Nine hundred and fifty years total','One thousand years less fifty','Seven hundred years calling them'],
   correct:2},
  {q:'What did Nuh\'s people do according to 71:7 to avoid hearing him?',
   opts:['They moved far away to distant lands','They put fingers in ears and covered with garments','They made loud noise to drown his voice','They imprisoned him and his followers'],
   correct:1},
  {q:'What is the theme of Nuh\'s warning in 71:1-4?',
   opts:['Worship only Allah and fear His punishment','Build a great ark before the flood arrives','Leave your false gods and follow the righteous path','Seek forgiveness before the Day approaches'],
   correct:0},
  {q:'What did Nuh (AS) tell his people would happen if they obeyed (71:10-12)?',
   opts:['Allah will send armies to protect their lands','Allah will send rain, give wealth and children and gardens','Allah will grant them power over all their enemies','Allah will remove all illness and bring lasting peace'],
   correct:1},
];

const S2_ITEMS = [
  {id:'d1', text:'📣 Called publicly\nto the people',        zone:'z1'},
  {id:'d2', text:'🤫 Called privately\nin secret whispers',  zone:'z2'},
  {id:'d3', text:'🌙 Called day\nand night — non-stop',      zone:'z3'},
  {id:'d4', text:'🌧️ Connected worship\nto blessings',       zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Thumma inni da\'autuhum jiharan" — Then I called them publicly and openly (71:8)'},
  {id:'z2', desc:'"Thumma inni asrartu lahum israran" — Then I called them secretly in private (71:9)'},
  {id:'z3', desc:'"Inni da\'awtu qawmi laylan wa naharan" — I called my people night and day (71:5)'},
  {id:'z4', desc:'If you seek forgiveness Allah will send rain, increase your wealth, give children and gardens (71:10-12)'},
];

const S3_EVENTS_CORRECT = [
  {id:'f1', text:'🙏 Nuh called his people for 950 years with three methods'},
  {id:'f2', text:'🤦 His people refused, mocked him, and covered their ears'},
  {id:'f3', text:'⚓ Allah commanded Nuh to build the ark — and Nuh obeyed'},
  {id:'f4', text:'💧 Allah opened the gates of the sky and earth — the great flood'},
  {id:'f5', text:'🚢 Nuh and the believers boarded the ark — saved by Allah'},
  {id:'f6', text:'😢 Nuh\'s own son refused — was swallowed by the waves and drowned'},
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

const S4_QUIZ = [
  {q:'What does Nuh pray for in 71:26? A remarkable prayer of firm boundaries.',
   opts:['That his people be guided before the flood comes','Do not leave on earth any home of the disbelievers','That his son be saved from drowning in the water','That Allah give him patience for another thousand years'],
   correct:1},
  {q:'What does Nuh say about the powerful ones among his people (71:21)?',
   opts:['The powerful ones protected and followed him','They oppressed me but I forgave them for Allah\'s sake','They followed their own powerful ones who only increased in loss','They tried to negotiate but I refused to accept their terms'],
   correct:2},
  {q:'What does Nuh (AS) pray at the end of the surah (71:28)?',
   opts:['For rain and prosperity for the whole world','Forgive me, my parents, and believing men and women','Remove all those who wronged him from the earth','Grant him a son who follows in his footsteps'],
   correct:1},
  {q:'What does "rabbi ighfir li wa li-walidayya" (71:28) demonstrate?',
   opts:['Nuh forgot his people and only prayed for himself','The Prophet prays for his own family over his community','A prophet\'s prayer includes both his family and all believers','Nuh was angry at his people and excluded them from prayer'],
   correct:2},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderStoryOrder(3,S3_EVENTS_CORRECT);}
function checkSection3(){checkStoryOrder(3,S3_EVENTS_CORRECT);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}
function checkSection4(){checkQuiz(4,S4_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#040e1c':'#020810', acc=st?'#60d0c0':'#40c0b0';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Ocean
  if(n>=1){ctx.fillStyle=st?'#0a1e30':'#06121e';ctx.fillRect(0,H*0.55,W,H*0.45);for(let i=0;i<5;i++){ctx.fillStyle='rgba(16,88,160,0.3)';ctx.fillRect(i*W/5,H*0.55+i*8,W/5,8);}}
  // Ark
  if(n>=2){ctx.fillStyle='#6a4020';ctx.fillRect(W*0.3,H*0.45,W*0.4,H*0.12);ctx.fillStyle='#8a5a30';ctx.fillRect(W*0.35,H*0.3,W*0.3,H*0.16);}
  // Rain
  if(n>=3){for(let i=0;i<20;i++){ctx.fillStyle='rgba(64,200,192,0.5)';ctx.fillRect(Math.random()*W,Math.random()*H*0.45,2,8);}}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'NUH COMPLETE 🚢':`Nuh — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};

const WBW_DATA = [
  {label:'71:1 — إِنَّآ أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ أَنْ أَنذِرْ قَوْمَكَ مِن قَبْلِ أَن يَأْتِيَهُمْ عَذَابٌ أَلِيمٌ', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed, We', freq:132},
    {ar:'أَرْسَلْنَا', tr:'arsalnā', en:'sent', freq:31},
    {ar:'نُوحًا', tr:'Nūḥan', en:'Nuh', freq:10},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:700},
    {ar:'قَوْمِهِ', tr:'qawmihī', en:'his people', freq:46},
    {ar:'أَنْ', tr:'an', en:'that', freq:560},
    {ar:'أَنذِرْ', tr:'andhir', en:'warn', freq:14},
    {ar:'قَوْمَكَ', tr:'qawmaka', en:'your people', freq:8},
    {ar:'مِن', tr:'min', en:'before', freq:3000},
    {ar:'قَبْلِ', tr:'qabli', en:'before', freq:84},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'يَأْتِيَهُمْ', tr:'yaʾtiyahum', en:'comes to them', freq:8},
    {ar:'عَذَابٌ', tr:'ʿadhābun', en:'a punishment', freq:110},
    {ar:'أَلِيمٌ', tr:'alīmun', en:'painful', freq:70},
  ]},
  {label:'71:2 — قَالَ يَا قَوْمِ إِنِّي لَكُمْ نَذِيرٌ مُّبِينٌ', words:[
    {ar:'قَالَ', tr:'qāla', en:'He said', freq:529},
    {ar:'يَا', tr:'yā', en:'O', freq:250},
    {ar:'قَوْمِ', tr:'qawmi', en:'my people', freq:46},
    {ar:'إِنِّي', tr:'innī', en:'indeed I am', freq:107},
    {ar:'لَكُمْ', tr:'lakum', en:'to you', freq:183},
    {ar:'نَذِيرٌ', tr:'nadhīrun', en:'a warner', freq:17},
    {ar:'مُّبِينٌ', tr:'mubīnun', en:'clear', freq:119},
  ]},
  {label:'71:3 — أَنِ اعْبُدُوا اللَّهَ وَاتَّقُوهُ وَأَطِيعُونِ', words:[
    {ar:'أَنِ', tr:'ani', en:'that', freq:560},
    {ar:'اعْبُدُوا', tr:'uʿbudū', en:'worship', freq:21},
    {ar:'اللَّهَ', tr:'Allāha', en:'Allah', freq:2699},
    {ar:'وَاتَّقُوهُ', tr:'wa-ttaqūhu', en:'and fear Him', freq:5},
    {ar:'وَأَطِيعُونِ', tr:'wa-aṭīʿūni', en:'and obey me', freq:5},
  ]},
  {label:'71:4 — يَغْفِرْ لَكُم مِّن ذُنُوبِكُمْ وَيُؤَخِّرْكُمْ إِلَىٰ أَجَلٍ مُّسَمًّى إِنَّ أَجَلَ اللَّهِ إِذَا جَاءَ لَا يُؤَخَّرُ لَوْ كُنتُمْ تَعْلَمُونَ', words:[
    {ar:'يَغْفِرْ', tr:'yaghfir', en:'He will forgive', freq:14},
    {ar:'لَكُم', tr:'lakum', en:'for you', freq:183},
    {ar:'مِّن', tr:'min', en:'of', freq:3000},
    {ar:'ذُنُوبِكُمْ', tr:'dhunūbikum', en:'your sins', freq:11},
    {ar:'وَيُؤَخِّرْكُمْ', tr:'wa-yuʾakhkhirkum', en:'and delay you', freq:2},
    {ar:'إِلَىٰ', tr:'ilā', en:'until', freq:700},
    {ar:'أَجَلٍ', tr:'ajalin', en:'a term', freq:22},
    {ar:'مُّسَمًّى', tr:'musamman', en:'appointed', freq:10},
    {ar:'إِنَّ', tr:'inna', en:'indeed', freq:490},
    {ar:'أَجَلَ', tr:'ajala', en:'the term', freq:22},
    {ar:'اللَّهِ', tr:'Allāhi', en:'of Allah', freq:2699},
    {ar:'إِذَا', tr:'idhā', en:'when', freq:362},
    {ar:'جَاءَ', tr:'jāʾa', en:'it comes', freq:73},
    {ar:'لَا', tr:'lā', en:'not', freq:1738},
    {ar:'يُؤَخَّرُ', tr:'yuʾakhkharu', en:'is delayed', freq:5},
    {ar:'لَوْ', tr:'law', en:'if', freq:112},
    {ar:'كُنتُمْ', tr:'kuntum', en:'you', freq:36},
    {ar:'تَعْلَمُونَ', tr:'taʿlamūna', en:'knew', freq:49},
  ]},
  {label:'71:5 — قَالَ رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا', words:[
    {ar:'قَالَ', tr:'qāla', en:'He said', freq:529},
    {ar:'رَبِّ', tr:'Rabbi', en:'My Lord', freq:124},
    {ar:'إِنِّي', tr:'innī', en:'indeed I', freq:107},
    {ar:'دَعَوْتُ', tr:'daʿawtu', en:'called', freq:3},
    {ar:'قَوْمِي', tr:'qawmī', en:'my people', freq:14},
    {ar:'لَيْلًا', tr:'laylan', en:'by night', freq:8},
    {ar:'وَنَهَارًا', tr:'wa-nahāran', en:'and by day', freq:6},
  ]},
  {label:'71:6 — فَلَمْ يَزِدْهُمْ دُعَائِي إِلَّا فِرَارًا', words:[
    {ar:'فَلَمْ', tr:'falam', en:'but not', freq:62},
    {ar:'يَزِدْهُمْ', tr:'yazidhum', en:'did it increase them', freq:3},
    {ar:'دُعَائِي', tr:'duʿāʾī', en:'my calling', freq:2},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:336},
    {ar:'فِرَارًا', tr:'firāran', en:'in flight', freq:1},
  ]},
  {label:'71:7 — وَإِنِّي كُلَّمَا دَعَوْتُهُمْ لِتَغْفِرَ لَهُمْ جَعَلُوا أَصَابِعَهُمْ فِي آذَانِهِمْ وَاسْتَغْشَوْا ثِيَابَهُمْ وَأَصَرُّوا وَاسْتَكْبَرُوا اسْتِكْبَارًا', words:[
    {ar:'وَإِنِّي', tr:'wa-innī', en:'and indeed I', freq:107},
    {ar:'كُلَّمَا', tr:'kullamā', en:'every time', freq:14},
    {ar:'دَعَوْتُهُمْ', tr:'daʿawtuhum', en:'I called them', freq:2},
    {ar:'لِتَغْفِرَ', tr:'li-taghfira', en:'so You may forgive', freq:2},
    {ar:'لَهُمْ', tr:'lahum', en:'them', freq:220},
    {ar:'جَعَلُوا', tr:'jaʿalū', en:'they put', freq:22},
    {ar:'أَصَابِعَهُمْ', tr:'aṣābiʿahum', en:'their fingers', freq:2},
    {ar:'فِي', tr:'fī', en:'in', freq:1700},
    {ar:'آذَانِهِمْ', tr:'ādhānihim', en:'their ears', freq:4},
    {ar:'وَاسْتَغْشَوْا', tr:'wa-staghshaw', en:'and covered up', freq:1},
    {ar:'ثِيَابَهُمْ', tr:'thiyābahum', en:'their garments', freq:3},
    {ar:'وَأَصَرُّوا', tr:'wa-aṣarrū', en:'and persisted', freq:2},
    {ar:'وَاسْتَكْبَرُوا', tr:'wa-stakbarū', en:'and were arrogant', freq:8},
    {ar:'اسْتِكْبَارًا', tr:'istikbāran', en:'with arrogance', freq:2},
  ]},
  {label:'71:8 — ثُمَّ إِنِّي دَعَوْتُهُمْ جِهَارًا', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'إِنِّي', tr:'innī', en:'indeed I', freq:107},
    {ar:'دَعَوْتُهُمْ', tr:'daʿawtuhum', en:'called them', freq:2},
    {ar:'جِهَارًا', tr:'jihāran', en:'publicly', freq:1},
  ]},
  {label:'71:9 — ثُمَّ إِنِّي أَعْلَنتُ لَهُمْ وَأَسْرَرْتُ لَهُمْ إِسْرَارًا', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'إِنِّي', tr:'innī', en:'indeed I', freq:107},
    {ar:'أَعْلَنتُ', tr:'aʿlantu', en:'announced to', freq:2},
    {ar:'لَهُمْ', tr:'lahum', en:'them', freq:220},
    {ar:'وَأَسْرَرْتُ', tr:'wa-asrartu', en:'and confided to', freq:1},
    {ar:'لَهُمْ', tr:'lahum', en:'them', freq:220},
    {ar:'إِسْرَارًا', tr:'isrāran', en:'privately', freq:1},
  ]},
  {label:'71:10 — فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا', words:[
    {ar:'فَقُلْتُ', tr:'fa-qultu', en:'And I said', freq:3},
    {ar:'اسْتَغْفِرُوا', tr:'istaghfirū', en:'seek forgiveness', freq:7},
    {ar:'رَبَّكُمْ', tr:'Rabbakum', en:'of your Lord', freq:42},
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed He', freq:76},
    {ar:'كَانَ', tr:'kāna', en:'is', freq:359},
    {ar:'غَفَّارًا', tr:'ghaffāran', en:'Oft-Forgiving', freq:3},
  ]},
  {label:'71:11 — يُرْسِلِ السَّمَاءَ عَلَيْكُم مِّدْرَارًا', words:[
    {ar:'يُرْسِلِ', tr:'yursili', en:'He will send', freq:7},
    {ar:'السَّمَاءَ', tr:'as-samāʾa', en:'the sky', freq:120},
    {ar:'عَلَيْكُم', tr:'ʿalaykum', en:'upon you', freq:65},
    {ar:'مِّدْرَارًا', tr:'midrāran', en:'in abundance', freq:2},
  ]},
  {label:'71:12 — وَيُمْدِدْكُم بِأَمْوَالٍ وَبَنِينَ وَيَجْعَل لَّكُمْ جَنَّاتٍ وَيَجْعَل لَّكُمْ أَنْهَارًا', words:[
    {ar:'وَيُمْدِدْكُم', tr:'wa-yumdidkum', en:'and give you', freq:2},
    {ar:'بِأَمْوَالٍ', tr:'bi-amwālin', en:'wealth', freq:7},
    {ar:'وَبَنِينَ', tr:'wa-banīna', en:'and children', freq:7},
    {ar:'وَيَجْعَل', tr:'wa-yajʿal', en:'and provide', freq:22},
    {ar:'لَّكُمْ', tr:'lakum', en:'for you', freq:183},
    {ar:'جَنَّاتٍ', tr:'jannātin', en:'gardens', freq:35},
    {ar:'وَيَجْعَل', tr:'wa-yajʿal', en:'and provide', freq:22},
    {ar:'لَّكُمْ', tr:'lakum', en:'for you', freq:183},
    {ar:'أَنْهَارًا', tr:'anhāran', en:'rivers', freq:21},
  ]},
  {label:'71:13 — مَّا لَكُمْ لَا تَرْجُونَ لِلَّهِ وَقَارًا', words:[
    {ar:'مَّا', tr:'mā', en:'What is', freq:2000},
    {ar:'لَكُمْ', tr:'lakum', en:'with you', freq:183},
    {ar:'لَا', tr:'lā', en:'not', freq:1738},
    {ar:'تَرْجُونَ', tr:'tarjūna', en:'you expect', freq:3},
    {ar:'لِلَّهِ', tr:'lillāhi', en:'for Allah', freq:170},
    {ar:'وَقَارًا', tr:'waqāran', en:'grandeur', freq:1},
  ]},
  {label:'71:14 — وَقَدْ خَلَقَكُمْ أَطْوَارًا', words:[
    {ar:'وَقَدْ', tr:'wa-qad', en:'while indeed', freq:100},
    {ar:'خَلَقَكُمْ', tr:'khalaqakum', en:'He created you', freq:10},
    {ar:'أَطْوَارًا', tr:'aṭwāran', en:'in stages', freq:1},
  ]},
  {label:'71:15 — أَلَمْ تَرَوْا كَيْفَ خَلَقَ اللَّهُ سَبْعَ سَمَاوَاتٍ طِبَاقًا', words:[
    {ar:'أَلَمْ', tr:'alam', en:'Do you not', freq:44},
    {ar:'تَرَوْا', tr:'taraw', en:'see', freq:12},
    {ar:'كَيْفَ', tr:'kayfa', en:'how', freq:34},
    {ar:'خَلَقَ', tr:'khalaqa', en:'created', freq:38},
    {ar:'اللَّهُ', tr:'Allāhu', en:'Allah', freq:2699},
    {ar:'سَبْعَ', tr:'sabʿa', en:'seven', freq:14},
    {ar:'سَمَاوَاتٍ', tr:'samāwātin', en:'heavens', freq:120},
    {ar:'طِبَاقًا', tr:'ṭibāqan', en:'in layers', freq:2},
  ]},
  {label:'71:16 — وَجَعَلَ الْقَمَرَ فِيهِنَّ نُورًا وَجَعَلَ الشَّمْسَ سِرَاجًا', words:[
    {ar:'وَجَعَلَ', tr:'wa-jaʿala', en:'and made', freq:22},
    {ar:'الْقَمَرَ', tr:'al-qamara', en:'the moon', freq:17},
    {ar:'فِيهِنَّ', tr:'fīhinna', en:'therein', freq:6},
    {ar:'نُورًا', tr:'nūran', en:'a light', freq:24},
    {ar:'وَجَعَلَ', tr:'wa-jaʿala', en:'and made', freq:22},
    {ar:'الشَّمْسَ', tr:'ash-shamsa', en:'the sun', freq:19},
    {ar:'سِرَاجًا', tr:'sirājan', en:'a lamp', freq:3},
  ]},
  {label:'71:17 — وَاللَّهُ أَنبَتَكُم مِّنَ الْأَرْضِ نَبَاتًا', words:[
    {ar:'وَاللَّهُ', tr:'wa-Allāhu', en:'And Allah', freq:2699},
    {ar:'أَنبَتَكُم', tr:'anbatakum', en:'produced you', freq:1},
    {ar:'مِّنَ', tr:'mina', en:'from', freq:3000},
    {ar:'الْأَرْضِ', tr:'al-arḍi', en:'the earth', freq:280},
    {ar:'نَبَاتًا', tr:'nabātan', en:'as a growth', freq:6},
  ]},
  {label:'71:18 — ثُمَّ يُعِيدُكُمْ فِيهَا وَيُخْرِجُكُمْ إِخْرَاجًا', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'يُعِيدُكُمْ', tr:'yuʿīdukum', en:'He will return you', freq:2},
    {ar:'فِيهَا', tr:'fīhā', en:'into it', freq:127},
    {ar:'وَيُخْرِجُكُمْ', tr:'wa-yukhrijukum', en:'and bring you out', freq:2},
    {ar:'إِخْرَاجًا', tr:'ikhrājan', en:'a bringing out', freq:1},
  ]},
  {label:'71:19 — وَاللَّهُ جَعَلَ لَكُمُ الْأَرْضَ بِسَاطًا', words:[
    {ar:'وَاللَّهُ', tr:'wa-Allāhu', en:'And Allah', freq:2699},
    {ar:'جَعَلَ', tr:'jaʿala', en:'made', freq:60},
    {ar:'لَكُمُ', tr:'lakumu', en:'for you', freq:183},
    {ar:'الْأَرْضَ', tr:'al-arḍa', en:'the earth', freq:280},
    {ar:'بِسَاطًا', tr:'bisāṭan', en:'a spread', freq:1},
  ]},
  {label:'71:20 — لِّتَسْلُكُوا مِنْهَا سُبُلًا فِجَاجًا', words:[
    {ar:'لِّتَسْلُكُوا', tr:'li-taslukū', en:'so you may travel', freq:2},
    {ar:'مِنْهَا', tr:'minhā', en:'therein', freq:40},
    {ar:'سُبُلًا', tr:'subulan', en:'paths', freq:10},
    {ar:'فِجَاجًا', tr:'fijājan', en:'wide', freq:2},
  ]},
  {label:'71:21 — قَالَ نُوحٌ رَّبِّ إِنَّهُمْ عَصَوْنِي وَاتَّبَعُوا مَن لَّمْ يَزِدْهُ مَالُهُ وَوَلَدُهُ إِلَّا خَسَارًا', words:[
    {ar:'قَالَ', tr:'qāla', en:'Said', freq:529},
    {ar:'نُوحٌ', tr:'Nūḥun', en:'Nuh', freq:10},
    {ar:'رَّبِّ', tr:'Rabbi', en:'My Lord', freq:124},
    {ar:'إِنَّهُمْ', tr:'innahum', en:'indeed they', freq:35},
    {ar:'عَصَوْنِي', tr:'ʿaṣawnī', en:'disobeyed me', freq:1},
    {ar:'وَاتَّبَعُوا', tr:'wa-ttabaʿū', en:'and followed', freq:18},
    {ar:'مَن', tr:'man', en:'those whose', freq:540},
    {ar:'لَّمْ', tr:'lam', en:'not', freq:175},
    {ar:'يَزِدْهُ', tr:'yazidhu', en:'increase him', freq:3},
    {ar:'مَالُهُ', tr:'māluhu', en:'his wealth', freq:11},
    {ar:'وَوَلَدُهُ', tr:'wa-waladuhu', en:'and his children', freq:2},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:336},
    {ar:'خَسَارًا', tr:'khasāran', en:'in loss', freq:2},
  ]},
  {label:'71:22 — وَمَكَرُوا مَكْرًا كُبَّارًا', words:[
    {ar:'وَمَكَرُوا', tr:'wa-makarū', en:'And they schemed', freq:7},
    {ar:'مَكْرًا', tr:'makran', en:'a scheme', freq:8},
    {ar:'كُبَّارًا', tr:'kubbāran', en:'tremendous', freq:1},
  ]},
  {label:'71:23 — وَقَالُوا لَا تَذَرُنَّ آلِهَتَكُمْ وَلَا تَذَرُنَّ وَدًّا وَلَا سُوَاعًا وَلَا يَغُوثَ وَيَعُوقَ وَنَسْرًا', words:[
    {ar:'وَقَالُوا', tr:'wa-qālū', en:'And they said', freq:92},
    {ar:'لَا', tr:'lā', en:'do not', freq:1738},
    {ar:'تَذَرُنَّ', tr:'tadharunna', en:'leave', freq:2},
    {ar:'آلِهَتَكُمْ', tr:'ālihatakum', en:'your gods', freq:7},
    {ar:'وَلَا', tr:'wa-lā', en:'and do not', freq:400},
    {ar:'تَذَرُنَّ', tr:'tadharunna', en:'leave', freq:2},
    {ar:'وَدًّا', tr:'Waddan', en:'Wadd', freq:1},
    {ar:'وَلَا', tr:'wa-lā', en:'nor', freq:400},
    {ar:'سُوَاعًا', tr:'Suwāʿan', en:'Suwa', freq:1},
    {ar:'وَلَا', tr:'wa-lā', en:'nor', freq:400},
    {ar:'يَغُوثَ', tr:'Yaghūtha', en:'Yaghuth', freq:1},
    {ar:'وَيَعُوقَ', tr:'wa-Yaʿūqa', en:'and Yauq', freq:1},
    {ar:'وَنَسْرًا', tr:'wa-Nasran', en:'and Nasr', freq:1},
  ]},
  {label:'71:24 — وَقَدْ أَضَلُّوا كَثِيرًا وَلَا تَزِدِ الظَّالِمِينَ إِلَّا ضَلَالًا', words:[
    {ar:'وَقَدْ', tr:'wa-qad', en:'And already', freq:100},
    {ar:'أَضَلُّوا', tr:'aḍallū', en:'they have misled', freq:3},
    {ar:'كَثِيرًا', tr:'kathīran', en:'many', freq:60},
    {ar:'وَلَا', tr:'wa-lā', en:'and do not', freq:400},
    {ar:'تَزِدِ', tr:'tazidi', en:'increase', freq:3},
    {ar:'الظَّالِمِينَ', tr:'aẓ-ẓālimīna', en:'the wrongdoers', freq:50},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:336},
    {ar:'ضَلَالًا', tr:'ḍalālan', en:'in error', freq:12},
  ]},
  {label:'71:25 — مِّمَّا خَطِيئَاتِهِمْ أُغْرِقُوا فَأُدْخِلُوا نَارًا فَلَمْ يَجِدُوا لَهُم مِّن دُونِ اللَّهِ أَنصَارًا', words:[
    {ar:'مِّمَّا', tr:'mimmā', en:'Because of', freq:30},
    {ar:'خَطِيئَاتِهِمْ', tr:'khaṭīʾātihim', en:'their sins', freq:2},
    {ar:'أُغْرِقُوا', tr:'ughriqū', en:'they were drowned', freq:2},
    {ar:'فَأُدْخِلُوا', tr:'fa-udkhilū', en:'then admitted to', freq:2},
    {ar:'نَارًا', tr:'nāran', en:'a Fire', freq:67},
    {ar:'فَلَمْ', tr:'falam', en:'and did not', freq:62},
    {ar:'يَجِدُوا', tr:'yajidū', en:'find', freq:16},
    {ar:'لَهُم', tr:'lahum', en:'for themselves', freq:220},
    {ar:'مِّن', tr:'min', en:'besides', freq:3000},
    {ar:'دُونِ', tr:'dūni', en:'other than', freq:73},
    {ar:'اللَّهِ', tr:'Allāhi', en:'Allah', freq:2699},
    {ar:'أَنصَارًا', tr:'anṣāran', en:'any helpers', freq:5},
  ]},
  {label:'71:26 — وَقَالَ نُوحٌ رَّبِّ لَا تَذَرْ عَلَى الْأَرْضِ مِنَ الْكَافِرِينَ دَيَّارًا', words:[
    {ar:'وَقَالَ', tr:'wa-qāla', en:'And said', freq:105},
    {ar:'نُوحٌ', tr:'Nūḥun', en:'Nuh', freq:10},
    {ar:'رَّبِّ', tr:'Rabbi', en:'My Lord', freq:124},
    {ar:'لَا', tr:'lā', en:'do not', freq:1738},
    {ar:'تَذَرْ', tr:'tadhar', en:'leave', freq:4},
    {ar:'عَلَى', tr:'ʿalā', en:'upon', freq:820},
    {ar:'الْأَرْضِ', tr:'al-arḍi', en:'the earth', freq:280},
    {ar:'مِنَ', tr:'mina', en:'of', freq:3000},
    {ar:'الْكَافِرِينَ', tr:'al-kāfirīna', en:'the disbelievers', freq:100},
    {ar:'دَيَّارًا', tr:'dayyāran', en:'a single inhabitant', freq:1},
  ]},
  {label:'71:27 — إِنَّكَ إِن تَذَرْهُمْ يُضِلُّوا عِبَادَكَ وَلَا يَلِدُوا إِلَّا فَاجِرًا كَفَّارًا', words:[
    {ar:'إِنَّكَ', tr:'innaka', en:'Indeed if You', freq:22},
    {ar:'إِن', tr:'in', en:'if', freq:260},
    {ar:'تَذَرْهُمْ', tr:'tadharhum', en:'You leave them', freq:1},
    {ar:'يُضِلُّوا', tr:'yuḍillū', en:'they will mislead', freq:4},
    {ar:'عِبَادَكَ', tr:'ʿibādaka', en:'Your servants', freq:12},
    {ar:'وَلَا', tr:'wa-lā', en:'and not', freq:400},
    {ar:'يَلِدُوا', tr:'yalidū', en:'will they give birth', freq:3},
    {ar:'إِلَّا', tr:'illā', en:'except to', freq:336},
    {ar:'فَاجِرًا', tr:'fājiran', en:'a wicked', freq:2},
    {ar:'كَفَّارًا', tr:'kaffāran', en:'ungrateful one', freq:2},
  ]},
  {label:'71:28 — رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ وَلَا تَزِدِ الظَّالِمِينَ إِلَّا تَبَارًا', words:[
    {ar:'رَّبِّ', tr:'Rabbi', en:'My Lord', freq:124},
    {ar:'اغْفِرْ', tr:'ighfir', en:'forgive', freq:15},
    {ar:'لِي', tr:'lī', en:'me', freq:95},
    {ar:'وَلِوَالِدَيَّ', tr:'wa-li-wālidayya', en:'and my parents', freq:3},
    {ar:'وَلِمَن', tr:'wa-li-man', en:'and whoever', freq:10},
    {ar:'دَخَلَ', tr:'dakhala', en:'enters', freq:18},
    {ar:'بَيْتِيَ', tr:'baytiya', en:'my house', freq:3},
    {ar:'مُؤْمِنًا', tr:'muʾminan', en:'as a believer', freq:20},
    {ar:'وَلِلْمُؤْمِنِينَ', tr:'wa-lil-muʾminīna', en:'and the believing men', freq:15},
    {ar:'وَالْمُؤْمِنَاتِ', tr:'wal-muʾmināti', en:'and believing women', freq:7},
    {ar:'وَلَا', tr:'wa-lā', en:'and do not', freq:400},
    {ar:'تَزِدِ', tr:'tazidi', en:'increase', freq:3},
    {ar:'الظَّالِمِينَ', tr:'aẓ-ẓālimīna', en:'the wrongdoers', freq:50},
    {ar:'إِلَّا', tr:'illā', en:'except in', freq:336},
    {ar:'تَبَارًا', tr:'tabāran', en:'destruction', freq:1},
  ]},
];
window.setupWBWLevel(WBW_DATA, 10);
