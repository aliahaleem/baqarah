'use strict';
/* Surah Al-Muzzammil (73) — The Enshrouded One */
window.STORAGE_KEY = 'muzzammilQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Checked:false,
};

const REWARDS = {
  1:{xp:80, gems:3, icon:'🌙', title:'Night Prayer Command',  msg:"SubhanAllah! This was the FIRST major command given to the Prophet ﷺ after prophethood — arise and pray the night! 'Qum al-layla illa qaleelan.' Stand by night except a little. The night prayer was compulsory before the five daily prayers were revealed. The foundation of the Prophet's strength was his night!"},
  2:{xp:85, gems:3, icon:'📿', title:'Weight of the Word',   msg:"Allahu Akbar! 'Inna sanulqi alayka qawlan thaqeela' — We are going to send down to you a heavy Word. The Quran is heavy — spiritually, in its demands, in its responsibilities. It calls for total transformation. This is why you needed to prepare with night prayer. The heavier the mission, the deeper the roots needed!"},
  3:{xp:100, gems:4, icon:'✨', title:'Al-Muzzammil Complete!', msg:"ALLAHUMMA BARIK! Al-Muzzammil complete! Night prayer to strengthen the heart. The heavy Word of the Quran. Patience over what they say — beautiful patience. Prayer, zakat, and trust in Allah alone. 'Wa tawakkal ala Allahi — Rabbi al-mashriq wal-maghrib.' Trust in the Lord of East and West! Ameen!"},
  4:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Al-Muzzammil word by word!'},
};

window.SURAH_CONFIG = {
  id:'s73', surahName:'Al-Muzzammil', surahArabic:'المزمل', totalLevels:4, wbwSection:4, rewards:REWARDS,
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
  {id:'w1', text:'إِنَّا سَنُلْقِي عَلَيْكَ\nقَوْلًا ثَقِيلًا',           zone:'z1'},
  {id:'w2', text:'نَاشِئَةَ اللَّيْلِ هِيَ أَشَدُّ\nوَطْئًا وَأَقْوَمُ قِيلًا', zone:'z2'},
  {id:'w3', text:'وَاصْبِرْ عَلَىٰ\nمَا يَقُولُونَ',                       zone:'z3'},
  {id:'w4', text:'وَاهْجُرْهُمْ\nهَجْرًا جَمِيلًا',                        zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'We are going to send down upon you a heavy Word (73:5)'},
  {id:'z2', desc:'Night devotion is firmest for treading and clearest in speech (73:6)'},
  {id:'z3', desc:'Bear patiently what they say (73:10)'},
  {id:'z4', desc:'And leave them with a beautiful leaving (73:10) — respond to mockery with dignity'},
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

const WBW_DATA = [
  {label:'73:1 — يَا أَيُّهَا الْمُزَّمِّلُ', words:[
    {ar:'يَا', tr:'yā', en:'O', freq:250},
    {ar:'أَيُّهَا', tr:'ayyuhā', en:'you', freq:142},
    {ar:'الْمُزَّمِّلُ', tr:'al-muzzammilu', en:'wrapped one', freq:1},
  ]},
  {label:'73:2 — قُمِ اللَّيْلَ إِلَّا قَلِيلًا', words:[
    {ar:'قُمِ', tr:'qumi', en:'Stand', freq:7},
    {ar:'اللَّيْلَ', tr:'al-layla', en:'the night', freq:60},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:336},
    {ar:'قَلِيلًا', tr:'qalīlan', en:'a little', freq:22},
  ]},
  {label:'73:3 — نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا', words:[
    {ar:'نِّصْفَهُ', tr:'niṣfahu', en:'Half of it', freq:2},
    {ar:'أَوِ', tr:'awi', en:'or', freq:120},
    {ar:'انقُصْ', tr:'unquṣ', en:'reduce', freq:1},
    {ar:'مِنْهُ', tr:'minhu', en:'from it', freq:40},
    {ar:'قَلِيلًا', tr:'qalīlan', en:'a little', freq:22},
  ]},
  {label:'73:4 — أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا', words:[
    {ar:'أَوْ', tr:'aw', en:'Or', freq:120},
    {ar:'زِدْ', tr:'zid', en:'add', freq:3},
    {ar:'عَلَيْهِ', tr:'ʿalayhi', en:'to it', freq:130},
    {ar:'وَرَتِّلِ', tr:'wa-rattili', en:'and recite', freq:1},
    {ar:'الْقُرْآنَ', tr:'al-Qurʾāna', en:'the Quran', freq:58},
    {ar:'تَرْتِيلًا', tr:'tartīlan', en:'distinctly', freq:1},
  ]},
  {label:'73:5 — إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed, We', freq:132},
    {ar:'سَنُلْقِي', tr:'sa-nulqī', en:'will cast upon', freq:2},
    {ar:'عَلَيْكَ', tr:'ʿalayka', en:'upon you', freq:40},
    {ar:'قَوْلًا', tr:'qawlan', en:'a word', freq:26},
    {ar:'ثَقِيلًا', tr:'thaqīlan', en:'heavy', freq:1},
  ]},
  {label:'73:6 — إِنَّ نَاشِئَةَ اللَّيْلِ هِيَ أَشَدُّ وَطْئًا وَأَقْوَمُ قِيلًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'نَاشِئَةَ', tr:'nāshiʾata', en:'the rising', freq:1},
    {ar:'اللَّيْلِ', tr:'al-layli', en:'by night', freq:60},
    {ar:'هِيَ', tr:'hiya', en:'is', freq:80},
    {ar:'أَشَدُّ', tr:'ashaddu', en:'stronger', freq:10},
    {ar:'وَطْئًا', tr:'waṭʾan', en:'in impact', freq:1},
    {ar:'وَأَقْوَمُ', tr:'wa-aqwamu', en:'and more suitable', freq:1},
    {ar:'قِيلًا', tr:'qīlan', en:'for speech', freq:2},
  ]},
  {label:'73:7 — إِنَّ لَكَ فِي النَّهَارِ سَبْحًا طَوِيلًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'لَكَ', tr:'laka', en:'for you', freq:58},
    {ar:'فِي', tr:'fī', en:'in', freq:1700},
    {ar:'النَّهَارِ', tr:'an-nahāri', en:'the day', freq:30},
    {ar:'سَبْحًا', tr:'sabḥan', en:'occupation', freq:1},
    {ar:'طَوِيلًا', tr:'ṭawīlan', en:'prolonged', freq:3},
  ]},
  {label:'73:8 — وَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا', words:[
    {ar:'وَاذْكُرِ', tr:'wa-dhkuri', en:'And remember', freq:18},
    {ar:'اسْمَ', tr:'isma', en:'the name', freq:20},
    {ar:'رَبِّكَ', tr:'Rabbika', en:'of your Lord', freq:58},
    {ar:'وَتَبَتَّلْ', tr:'wa-tabattal', en:'and devote yourself', freq:1},
    {ar:'إِلَيْهِ', tr:'ilayhi', en:'to Him', freq:92},
    {ar:'تَبْتِيلًا', tr:'tabtīlan', en:'completely', freq:1},
  ]},
  {label:'73:9 — رَّبُّ الْمَشْرِقِ وَالْمَغْرِبِ لَا إِلَٰهَ إِلَّا هُوَ فَاتَّخِذْهُ وَكِيلًا', words:[
    {ar:'رَّبُّ', tr:'Rabbu', en:'Lord of', freq:124},
    {ar:'الْمَشْرِقِ', tr:'al-mashriqi', en:'the East', freq:5},
    {ar:'وَالْمَغْرِبِ', tr:'wal-maghribi', en:'and the West', freq:5},
    {ar:'لَا', tr:'lā', en:'there is no', freq:1738},
    {ar:'إِلَٰهَ', tr:'ilāha', en:'deity', freq:60},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:336},
    {ar:'هُوَ', tr:'Huwa', en:'Him', freq:265},
    {ar:'فَاتَّخِذْهُ', tr:'fa-ttakhidhhu', en:'so take Him', freq:1},
    {ar:'وَكِيلًا', tr:'wakīlan', en:'as Disposer of affairs', freq:12},
  ]},
  {label:'73:10 — وَاصْبِرْ عَلَىٰ مَا يَقُولُونَ وَاهْجُرْهُمْ هَجْرًا جَمِيلًا', words:[
    {ar:'وَاصْبِرْ', tr:'wa-ṣbir', en:'And be patient', freq:8},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'over', freq:820},
    {ar:'مَا', tr:'mā', en:'what', freq:2000},
    {ar:'يَقُولُونَ', tr:'yaqūlūna', en:'they say', freq:46},
    {ar:'وَاهْجُرْهُمْ', tr:'wa-hjurhum', en:'and leave them', freq:1},
    {ar:'هَجْرًا', tr:'hajran', en:'a leaving', freq:2},
    {ar:'جَمِيلًا', tr:'jamīlan', en:'gracious', freq:3},
  ]},
  {label:'73:11 — وَذَرْنِي وَالْمُكَذِّبِينَ أُولِي النَّعْمَةِ وَمَهِّلْهُمْ قَلِيلًا', words:[
    {ar:'وَذَرْنِي', tr:'wa-dharnī', en:'And leave Me', freq:2},
    {ar:'وَالْمُكَذِّبِينَ', tr:'wal-mukadhdhibīna', en:'with the deniers', freq:4},
    {ar:'أُولِي', tr:'ulī', en:'possessors of', freq:12},
    {ar:'النَّعْمَةِ', tr:'an-naʿmati', en:'ease and luxury', freq:6},
    {ar:'وَمَهِّلْهُمْ', tr:'wa-mahhilhum', en:'and allow them respite', freq:2},
    {ar:'قَلِيلًا', tr:'qalīlan', en:'for a little', freq:22},
  ]},
  {label:'73:12 — إِنَّ لَدَيْنَا أَنكَالًا وَجَحِيمًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'لَدَيْنَا', tr:'ladaynā', en:'with Us are', freq:8},
    {ar:'أَنكَالًا', tr:'ankālan', en:'shackles', freq:1},
    {ar:'وَجَحِيمًا', tr:'wa-jaḥīman', en:'and a blazing Fire', freq:3},
  ]},
  {label:'73:13 — وَطَعَامًا ذَا غُصَّةٍ وَعَذَابًا أَلِيمًا', words:[
    {ar:'وَطَعَامًا', tr:'wa-ṭaʿāman', en:'and food that chokes', freq:5},
    {ar:'ذَا', tr:'dhā', en:'having', freq:12},
    {ar:'غُصَّةٍ', tr:'ghuṣṣatin', en:'a choking', freq:1},
    {ar:'وَعَذَابًا', tr:'wa-ʿadhāban', en:'and a punishment', freq:110},
    {ar:'أَلِيمًا', tr:'alīman', en:'painful', freq:70},
  ]},
  {label:'73:14 — يَوْمَ تَرْجُفُ الْأَرْضُ وَالْجِبَالُ وَكَانَتِ الْجِبَالُ كَثِيبًا مَّهِيلًا', words:[
    {ar:'يَوْمَ', tr:'yawma', en:'On the Day', freq:400},
    {ar:'تَرْجُفُ', tr:'tarjufu', en:'will tremble', freq:2},
    {ar:'الْأَرْضُ', tr:'al-arḍu', en:'the earth', freq:280},
    {ar:'وَالْجِبَالُ', tr:'wal-jibālu', en:'and the mountains', freq:18},
    {ar:'وَكَانَتِ', tr:'wa-kānati', en:'and will become', freq:18},
    {ar:'الْجِبَالُ', tr:'al-jibālu', en:'the mountains', freq:18},
    {ar:'كَثِيبًا', tr:'kathīban', en:'a heap of sand', freq:1},
    {ar:'مَّهِيلًا', tr:'mahīlan', en:'pouring down', freq:1},
  ]},
  {label:'73:15 — إِنَّا أَرْسَلْنَا إِلَيْكُمْ رَسُولًا شَاهِدًا عَلَيْكُمْ كَمَا أَرْسَلْنَا إِلَىٰ فِرْعَوْنَ رَسُولًا', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed, We', freq:132},
    {ar:'أَرْسَلْنَا', tr:'arsalnā', en:'have sent', freq:31},
    {ar:'إِلَيْكُمْ', tr:'ilaykum', en:'to you', freq:26},
    {ar:'رَسُولًا', tr:'rasūlan', en:'a messenger', freq:75},
    {ar:'شَاهِدًا', tr:'shāhidan', en:'as a witness', freq:7},
    {ar:'عَلَيْكُمْ', tr:'ʿalaykum', en:'upon you', freq:65},
    {ar:'كَمَا', tr:'kamā', en:'just as', freq:82},
    {ar:'أَرْسَلْنَا', tr:'arsalnā', en:'We sent', freq:31},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:700},
    {ar:'فِرْعَوْنَ', tr:'Firʿawna', en:'Pharaoh', freq:44},
    {ar:'رَسُولًا', tr:'rasūlan', en:'a messenger', freq:75},
  ]},
  {label:'73:16 — فَعَصَىٰ فِرْعَوْنُ الرَّسُولَ فَأَخَذْنَاهُ أَخْذًا وَبِيلًا', words:[
    {ar:'فَعَصَىٰ', tr:'fa-ʿaṣā', en:'But disobeyed', freq:4},
    {ar:'فِرْعَوْنُ', tr:'Firʿawnu', en:'Pharaoh', freq:44},
    {ar:'الرَّسُولَ', tr:'ar-rasūla', en:'the messenger', freq:75},
    {ar:'فَأَخَذْنَاهُ', tr:'fa-akhadhnāhu', en:'so We seized him', freq:4},
    {ar:'أَخْذًا', tr:'akhdhan', en:'with a seizure', freq:4},
    {ar:'وَبِيلًا', tr:'wabīlan', en:'devastating', freq:1},
  ]},
  {label:'73:17 — فَكَيْفَ تَتَّقُونَ إِن كَفَرْتُمْ يَوْمًا يَجْعَلُ الْوِلْدَانَ شِيبًا', words:[
    {ar:'فَكَيْفَ', tr:'fa-kayfa', en:'Then how', freq:34},
    {ar:'تَتَّقُونَ', tr:'tattaqūna', en:'can you guard', freq:6},
    {ar:'إِن', tr:'in', en:'if', freq:260},
    {ar:'كَفَرْتُمْ', tr:'kafartum', en:'you disbelieve', freq:8},
    {ar:'يَوْمًا', tr:'yawman', en:'against a Day', freq:42},
    {ar:'يَجْعَلُ', tr:'yajʿalu', en:'that will make', freq:22},
    {ar:'الْوِلْدَانَ', tr:'al-wildāna', en:'the children', freq:2},
    {ar:'شِيبًا', tr:'shīban', en:'white-haired', freq:1},
  ]},
  {label:'73:18 — السَّمَاءُ مُنفَطِرٌ بِهِ كَانَ وَعْدُهُ مَفْعُولًا', words:[
    {ar:'السَّمَاءُ', tr:'as-samāʾu', en:'The heaven', freq:120},
    {ar:'مُنفَطِرٌ', tr:'munfaṭirun', en:'will break apart', freq:1},
    {ar:'بِهِ', tr:'bihī', en:'therefrom', freq:110},
    {ar:'كَانَ', tr:'kāna', en:'ever is', freq:359},
    {ar:'وَعْدُهُ', tr:'waʿduhu', en:'His promise', freq:7},
    {ar:'مَفْعُولًا', tr:'mafʿūlan', en:'fulfilled', freq:2},
  ]},
  {label:'73:19 — إِنَّ هَٰذِهِ تَذْكِرَةٌ فَمَن شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ سَبِيلًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'هَٰذِهِ', tr:'hādhihī', en:'this is', freq:22},
    {ar:'تَذْكِرَةٌ', tr:'tadhkiratun', en:'a reminder', freq:6},
    {ar:'فَمَن', tr:'fa-man', en:'so whoever', freq:540},
    {ar:'شَاءَ', tr:'shāʾa', en:'wills', freq:30},
    {ar:'اتَّخَذَ', tr:'ittakhadha', en:'may take', freq:14},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:700},
    {ar:'رَبِّهِ', tr:'Rabbihī', en:'his Lord', freq:36},
    {ar:'سَبِيلًا', tr:'sabīlan', en:'a way', freq:40},
  ]},
  {label:'73:20 — إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ تَقُومُ أَدْنَىٰ مِن ثُلُثَيِ اللَّيْلِ وَنِصْفَهُ وَثُلُثَهُ وَطَائِفَةٌ مِّنَ الَّذِينَ مَعَكَ وَاللَّهُ يُقَدِّرُ اللَّيْلَ وَالنَّهَارَ عَلِمَ أَن لَّن تُحْصُوهُ فَتَابَ عَلَيْكُمْ فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ عَلِمَ أَن سَيَكُونُ مِنكُم مَّرْضَىٰ وَآخَرُونَ يَضْرِبُونَ فِي الْأَرْضِ يَبْتَغُونَ مِن فَضْلِ اللَّهِ وَآخَرُونَ يُقَاتِلُونَ فِي سَبِيلِ اللَّهِ فَاقْرَءُوا مَا تَيَسَّرَ مِنْهُ وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَأَقْرِضُوا اللَّهَ قَرْضًا حَسَنًا وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ هُوَ خَيْرًا وَأَعْظَمَ أَجْرًا وَاسْتَغْفِرُوا اللَّهَ إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'رَبَّكَ', tr:'Rabbaka', en:'your Lord', freq:42},
    {ar:'يَعْلَمُ', tr:'yaʿlamu', en:'knows', freq:48},
    {ar:'أَنَّكَ', tr:'annaka', en:'that you', freq:10},
    {ar:'تَقُومُ', tr:'taqūmu', en:'stand in prayer', freq:7},
    {ar:'أَدْنَىٰ', tr:'adnā', en:'almost', freq:3},
    {ar:'مِن', tr:'min', en:'of', freq:3000},
    {ar:'ثُلُثَيِ', tr:'thuluthayyi', en:'two-thirds', freq:1},
    {ar:'اللَّيْلِ', tr:'al-layli', en:'of the night', freq:60},
    {ar:'وَنِصْفَهُ', tr:'wa-niṣfahu', en:'and half of it', freq:1},
    {ar:'وَثُلُثَهُ', tr:'wa-thuluthahu', en:'and a third of it', freq:1},
    {ar:'وَطَائِفَةٌ', tr:'wa-ṭāʾifatun', en:'and a group', freq:8},
    {ar:'مِّنَ', tr:'mina', en:'of', freq:3000},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who are', freq:1283},
    {ar:'مَعَكَ', tr:'maʿaka', en:'with you', freq:6},
    {ar:'وَاللَّهُ', tr:'wa-Allāhu', en:'And Allah', freq:2699},
    {ar:'يُقَدِّرُ', tr:'yuqaddiru', en:'determines', freq:5},
    {ar:'اللَّيْلَ', tr:'al-layla', en:'the night', freq:60},
    {ar:'وَالنَّهَارَ', tr:'wan-nahāra', en:'and the day', freq:30},
    {ar:'عَلِمَ', tr:'ʿalima', en:'He knew', freq:48},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'لَّن', tr:'lan', en:'never', freq:40},
    {ar:'تُحْصُوهُ', tr:'tuḥṣūhu', en:'you would count it', freq:1},
    {ar:'فَتَابَ', tr:'fa-tāba', en:'so He turned', freq:10},
    {ar:'عَلَيْكُمْ', tr:'ʿalaykum', en:'to you in mercy', freq:65},
    {ar:'فَاقْرَءُوا', tr:'fa-qraʾū', en:'so recite', freq:2},
    {ar:'مَا', tr:'mā', en:'what', freq:2000},
    {ar:'تَيَسَّرَ', tr:'tayassara', en:'is easy', freq:2},
    {ar:'مِنَ', tr:'mina', en:'of', freq:3000},
    {ar:'الْقُرْآنِ', tr:'al-Qurʾāni', en:'the Quran', freq:58},
    {ar:'عَلِمَ', tr:'ʿalima', en:'He knew', freq:48},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'سَيَكُونُ', tr:'sa-yakūnu', en:'there will be', freq:7},
    {ar:'مِنكُم', tr:'minkum', en:'among you', freq:36},
    {ar:'مَّرْضَىٰ', tr:'marḍā', en:'those who are ill', freq:5},
    {ar:'وَآخَرُونَ', tr:'wa-ākharūna', en:'and others', freq:7},
    {ar:'يَضْرِبُونَ', tr:'yaḍribūna', en:'travelling', freq:4},
    {ar:'فِي', tr:'fī', en:'in', freq:1700},
    {ar:'الْأَرْضِ', tr:'al-arḍi', en:'the land', freq:280},
    {ar:'يَبْتَغُونَ', tr:'yabtaghūna', en:'seeking', freq:4},
    {ar:'مِن', tr:'min', en:'from', freq:3000},
    {ar:'فَضْلِ', tr:'faḍli', en:'the bounty of', freq:22},
    {ar:'اللَّهِ', tr:'Allāhi', en:'Allah', freq:2699},
    {ar:'وَآخَرُونَ', tr:'wa-ākharūna', en:'and others', freq:7},
    {ar:'يُقَاتِلُونَ', tr:'yuqātilūna', en:'fighting', freq:5},
    {ar:'فِي', tr:'fī', en:'in', freq:1700},
    {ar:'سَبِيلِ', tr:'sabīli', en:'the cause of', freq:40},
    {ar:'اللَّهِ', tr:'Allāhi', en:'Allah', freq:2699},
    {ar:'فَاقْرَءُوا', tr:'fa-qraʾū', en:'so recite', freq:2},
    {ar:'مَا', tr:'mā', en:'what', freq:2000},
    {ar:'تَيَسَّرَ', tr:'tayassara', en:'is easy', freq:2},
    {ar:'مِنْهُ', tr:'minhu', en:'of it', freq:40},
    {ar:'وَأَقِيمُوا', tr:'wa-aqīmū', en:'and establish', freq:10},
    {ar:'الصَّلَاةَ', tr:'aṣ-ṣalāta', en:'prayer', freq:60},
    {ar:'وَآتُوا', tr:'wa-ātū', en:'and give', freq:14},
    {ar:'الزَّكَاةَ', tr:'az-zakāta', en:'zakat', freq:30},
    {ar:'وَأَقْرِضُوا', tr:'wa-aqriḍū', en:'and loan', freq:2},
    {ar:'اللَّهَ', tr:'Allāha', en:'Allah', freq:2699},
    {ar:'قَرْضًا', tr:'qarḍan', en:'a loan', freq:4},
    {ar:'حَسَنًا', tr:'ḥasanan', en:'goodly', freq:16},
    {ar:'وَمَا', tr:'wa-mā', en:'and whatever', freq:2000},
    {ar:'تُقَدِّمُوا', tr:'tuqaddimū', en:'you put forward', freq:3},
    {ar:'لِأَنفُسِكُم', tr:'li-anfusikum', en:'for yourselves', freq:6},
    {ar:'مِّنْ', tr:'min', en:'of', freq:3000},
    {ar:'خَيْرٍ', tr:'khayrin', en:'good', freq:108},
    {ar:'تَجِدُوهُ', tr:'tajidūhu', en:'you will find it', freq:4},
    {ar:'عِندَ', tr:'ʿinda', en:'with', freq:140},
    {ar:'اللَّهِ', tr:'Allāhi', en:'Allah', freq:2699},
    {ar:'هُوَ', tr:'huwa', en:'it is', freq:265},
    {ar:'خَيْرًا', tr:'khayran', en:'better', freq:108},
    {ar:'وَأَعْظَمَ', tr:'wa-aʿẓama', en:'and greater', freq:2},
    {ar:'أَجْرًا', tr:'ajran', en:'in reward', freq:28},
    {ar:'وَاسْتَغْفِرُوا', tr:'wa-staghfirū', en:'And seek forgiveness of', freq:7},
    {ar:'اللَّهَ', tr:'Allāha', en:'Allah', freq:2699},
    {ar:'إِنَّ', tr:'inna', en:'indeed', freq:490},
    {ar:'اللَّهَ', tr:'Allāha', en:'Allah is', freq:2699},
    {ar:'غَفُورٌ', tr:'Ghafūrun', en:'Forgiving', freq:71},
    {ar:'رَّحِيمٌ', tr:'Raḥīmun', en:'Merciful', freq:95},
  ]},
];
window.setupWBWLevel(WBW_DATA, 10);
