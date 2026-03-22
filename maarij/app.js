'use strict';
/* Surah Al-Maarij (70) — The Ascending Stairways */
window.STORAGE_KEY = 'maarijQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
  s5Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'🪜', title:'Day of 50,000 Years',   msg:"SubhanAllah! A disbeliever asks mockingly — bring on this punishment! Then Allah reveals: the Day is 50,000 years long. But for the believers? It will feel like an afternoon prayer. Patient, beautiful patience — Sabrun jameel. Time belongs to Allah!"},
  2:{xp:80, gems:3, icon:'😰', title:'Nature of Man Known',   msg:"MashAllah! 'Inna al-insana khuliqa halu\'a' — man was created anxious! When evil touches him, he panics. When good touches him, he withholds. This is our default nature. But the believers OVERCOME this nature through prayer, charity, belief in accountability, and humility!"},
  3:{xp:85, gems:3, icon:'🌟', title:'Believer\'s 7 Traits',  msg:"SubhanAllah! Seven qualities distinguish the believer who escapes halu': they pray, give a right in their wealth to the asker, believe in the Day, fear punishment, guard modesty, honour trusts, and stand by their testimony. These are the builders of paradise!"},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Maarij Complete!',  msg:"ALLAHUMMA BARIK! Al-Maarij complete! The ascending stairways lead to Allah. Patient, beautiful patience — Sabrun jameel. The Day of 50,000 years. Man's anxious nature — and how faith conquers it. May Allah make us among those who ascend to Him! Ameen!"},
  5:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Al-Maarij word by word!'},
};

window.SURAH_CONFIG = {
  id:'s70', surahName:'Al-Maarij', surahArabic:'المعارج', totalLevels:5, wbwSection:5, rewards:REWARDS,
  tileIcons:['🪜','😰','🌟','✨'],
  tileLabels:['50,000 Years','Human Nature','7 Traits','The Ascent'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Maarij — The Ascending Stairways! A 50,000 year Day. Man's anxious nature. 7 believer traits. The disbeliever's fate. 4 levels of powerful lessons!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Keep ascending the stairways! 🪜`,
    complete: name=>`MashAllah, ${name}! Al-Maarij complete! May Allah raise us to His ascending stairways! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What is "Dhu al-Maarij" (70:3), the title of Allah in this surah?',
   opts:['Lord of all existing creation','Owner of the Ascending Stairways','The All-Knowing and All-Wise','Master of the Day of Reckoning'],
   correct:1},
  {q:'How long does the Day of Judgment last according to 70:4?',
   opts:['A thousand years by your counting','A hundred thousand years long','Fifty thousand years in measure','Ten thousand years without rest'],
   correct:2},
  {q:'What does "fa-sabrun jamilun" (70:5) mean?',
   opts:['Therefore be patient with beautiful patience','Therefore give charity with beautiful gratitude','Therefore pray with beautiful devotion and focus','Therefore trust in Allah with complete certainty'],
   correct:0},
  {q:'What does 70:4 say about what ascends to Allah?',
   opts:['The souls of believers on the Day of Judgment','The angels and the Spirit — in a Day of great measure','All the deeds of mankind in glowing light','The prayers of the righteous through the seven heavens'],
   correct:1},
];

const S2_ITEMS = [
  {id:'h1', text:'😱 Anxious when\nevil touches him', zone:'z1'},
  {id:'h2', text:'🤑 Withholds when\ngood comes to him', zone:'z2'},
  {id:'h3', text:'🙏 Except those\nwho pray regularly', zone:'z3'},
  {id:'h4', text:'💰 Except those\nwho give a right\nin their wealth',  zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Idha massahu al-sharru jazu\'a" — when evil touches him, he panics and despairs (70:20)'},
  {id:'z2', desc:'"Wa idha massahu al-khairu manu\'a" — when good touches him, he is miserly and stingy (70:21)'},
  {id:'z3', desc:'Those who establish prayer are EXEMPT from halu\' — "illa al-musalleen" (70:22-23)'},
  {id:'z4', desc:'Those in whose wealth there is a known right for the asker and the deprived (70:24-25)'},
];

const S3_QUIZ = [
  {q:'What does "wa alladhina fi amwalihim haqqun ma\'loom" (70:24-25) refer to?',
   opts:['Payment of Zakat once a year to the treasury','A known right in their wealth for the asker and deprived','Giving sadaqah only when asked in the mosque','Spending wealth only in the way of Allah in jihad'],
   correct:1},
  {q:'Which trait among the 7 mentioned involves guarding private parts (70:29-31)?',
   opts:['Believing in the Day of Judgment','Being faithful to trusts and promises','Guarding their chastity — except with spouse','Standing firm in their testimony always'],
   correct:2},
  {q:'What does "wa alladhina hum bi-shahadatihim qa\'imoon" (70:33) mean?',
   opts:['They stand in prayer during the night hours','Those who are upright in their testimony','They witness the suffering of the poor with care','Those who give testimony for Allah\'s sake alone'],
   correct:1},
  {q:'How does the surah describe the fleeing of the disbeliever on Judgment Day (70:10-14)?',
   opts:['He runs to his family for shelter and safety','He wishes to ransom himself with his own children','He hides in the mountains to escape the reckoning','He prostrates to Allah but his prayer is rejected'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'m1', text:'🪜 Allah owns the ascending stairways — He raises angels and the Spirit (70:3-4)'},
  {id:'m2', text:'😰 Man is created anxious by nature — panics at hardship, withholds in ease (70:19-21)'},
  {id:'m3', text:'🙏 Except the believers who pray, give zakah, and guard their trusts (70:22-35)'},
  {id:'m4', text:'🏃 On the Day, the wicked wishes to ransom himself with his family (70:11-14)'},
  {id:'m5', text:'🔥 The disbeliever who denied — hellfire awaits, and no escape (70:15-18)'},
  {id:'m6', text:'✨ The believers are honoured in gardens of paradise (70:35-38)'},
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}
function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderStoryOrder(4,S4_EVENTS_CORRECT);}
function checkSection4(){checkStoryOrder(4,S4_EVENTS_CORRECT);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#041418':'#020c10', acc=st?'#f0c040':'#e0b030';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Stairway
  if(n>=1){for(let i=0;i<8;i++){ctx.fillStyle=`rgba(32,128,160,${0.3+i*0.08})`;ctx.fillRect(W*0.1+i*30,H*0.7-i*22,28,H*0.3+i*22);}}
  // Figure on stair
  if(n>=2){ctx.fillStyle='#c0a080';ctx.beginPath();ctx.arc(W*0.38,H*0.35,10,0,Math.PI*2);ctx.fill();ctx.fillRect(W*0.38-5,H*0.35+10,10,16);}
  // Light from above
  if(n>=3){const g=ctx.createLinearGradient(W*0.5,0,W*0.5,H*0.4);g.addColorStop(0,`rgba(240,200,64,0.5)`);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=5?'AL-MAARIJ COMPLETE 🪜':`Al-Maarij — ${n}/5 levels`,W/2,12);ctx.textAlign='left';
};

const WBW_DATA = [
  {label:'70:1 — سَأَلَ سَائِلٌ بِعَذَابٍ وَاقِعٍ', words:[
    {ar:'سَأَلَ', tr:'saʾala', en:'Asked', freq:24},
    {ar:'سَائِلٌ', tr:'sāʾilun', en:'a questioner', freq:3},
    {ar:'بِعَذَابٍ', tr:'bi-ʿadhābin', en:'about a punishment', freq:20},
    {ar:'وَاقِعٍ', tr:'wāqiʿin', en:'bound to happen', freq:4},
  ]},
  {label:'70:2 — لِّلْكَافِرِينَ لَيْسَ لَهُ دَافِعٌ', words:[
    {ar:'لِّلْكَافِرِينَ', tr:'lil-kāfirīn', en:'For the disbelievers', freq:110},
    {ar:'لَيْسَ', tr:'laysa', en:'there is no', freq:90},
    {ar:'لَهُ', tr:'lahu', en:'for it', freq:500},
    {ar:'دَافِعٌ', tr:'dāfiʿun', en:'preventer', freq:1},
  ]},
  {label:'70:3 — مِّنَ اللَّهِ ذِي الْمَعَارِجِ', words:[
    {ar:'مِّنَ', tr:'mina', en:'From', freq:3000},
    {ar:'اللَّهِ', tr:'Allāhi', en:'Allah', freq:2700},
    {ar:'ذِي', tr:'dhī', en:'Owner of', freq:30},
    {ar:'الْمَعَارِجِ', tr:'al-maʿārij', en:'the Ascending Stairways', freq:1},
  ]},
  {label:'70:4 — تَعْرُجُ الْمَلَائِكَةُ وَالرُّوحُ إِلَيْهِ فِي يَوْمٍ كَانَ مِقْدَارُهُ خَمْسِينَ أَلْفَ سَنَةٍ', words:[
    {ar:'تَعْرُجُ', tr:'taʿruju', en:'Ascend', freq:1},
    {ar:'الْمَلَائِكَةُ', tr:'al-malāʾikah', en:'the angels', freq:68},
    {ar:'وَالرُّوحُ', tr:'war-rūḥ', en:'and the Spirit', freq:10},
    {ar:'إِلَيْهِ', tr:'ilayhi', en:'to Him', freq:100},
    {ar:'فِي', tr:'fī', en:'in', freq:3000},
    {ar:'يَوْمٍ', tr:'yawmin', en:'a Day', freq:400},
    {ar:'كَانَ', tr:'kāna', en:'[whose]', freq:680},
    {ar:'مِقْدَارُهُ', tr:'miqdāruhu', en:'measure is', freq:2},
    {ar:'خَمْسِينَ', tr:'khamsīna', en:'fifty', freq:2},
    {ar:'أَلْفَ', tr:'alfa', en:'thousand', freq:11},
    {ar:'سَنَةٍ', tr:'sanah', en:'years', freq:14},
  ]},
  {label:'70:5 — فَاصْبِرْ صَبْرًا جَمِيلًا', words:[
    {ar:'فَاصْبِرْ', tr:'faṣbir', en:'So be patient', freq:7},
    {ar:'صَبْرًا', tr:'ṣabran', en:'with patience', freq:5},
    {ar:'جَمِيلًا', tr:'jamīlan', en:'beautiful', freq:4},
  ]},
  {label:'70:6 — إِنَّهُمْ يَرَوْنَهُ بَعِيدًا', words:[
    {ar:'إِنَّهُمْ', tr:'innahum', en:'Indeed they', freq:50},
    {ar:'يَرَوْنَهُ', tr:'yarawnahū', en:'see it', freq:4},
    {ar:'بَعِيدًا', tr:'baʿīdan', en:'[as] distant', freq:7},
  ]},
  {label:'70:7 — وَنَرَاهُ قَرِيبًا', words:[
    {ar:'وَنَرَاهُ', tr:'wa-narāhu', en:'But We see it', freq:2},
    {ar:'قَرِيبًا', tr:'qarīban', en:'[as] near', freq:10},
  ]},
  {label:'70:8 — يَوْمَ تَكُونُ السَّمَاءُ كَالْمُهْلِ', words:[
    {ar:'يَوْمَ', tr:'yawma', en:'The Day', freq:400},
    {ar:'تَكُونُ', tr:'takūnu', en:'will become', freq:60},
    {ar:'السَّمَاءُ', tr:'as-samāʾ', en:'the sky', freq:120},
    {ar:'كَالْمُهْلِ', tr:'kal-muhl', en:'like murky oil', freq:2},
  ]},
  {label:'70:9 — وَتَكُونُ الْجِبَالُ كَالْعِهْنِ', words:[
    {ar:'وَتَكُونُ', tr:'wa-takūnu', en:'And will become', freq:10},
    {ar:'الْجِبَالُ', tr:'al-jibāl', en:'the mountains', freq:36},
    {ar:'كَالْعِهْنِ', tr:'kal-ʿihn', en:'like wool', freq:2},
  ]},
  {label:'70:10 — وَلَا يَسْأَلُ حَمِيمٌ حَمِيمًا', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'And no', freq:1000},
    {ar:'يَسْأَلُ', tr:'yasʾalu', en:'will ask', freq:24},
    {ar:'حَمِيمٌ', tr:'ḥamīmun', en:'a close friend', freq:8},
    {ar:'حَمِيمًا', tr:'ḥamīman', en:'[about] a friend', freq:1},
  ]},
  {label:'70:11 — يُبَصَّرُونَهُمْ يَوَدُّ الْمُجْرِمُ لَوْ يَفْتَدِي مِنْ عَذَابِ يَوْمِئِذٍ بِبَنِيهِ', words:[
    {ar:'يُبَصَّرُونَهُمْ', tr:'yubaṣṣarūnahum', en:'They will be shown', freq:1},
    {ar:'يَوَدُّ', tr:'yawaddu', en:'would wish', freq:4},
    {ar:'الْمُجْرِمُ', tr:'al-mujrim', en:'the criminal', freq:10},
    {ar:'لَوْ', tr:'law', en:'if [he could]', freq:100},
    {ar:'يَفْتَدِي', tr:'yaftadī', en:'ransom himself', freq:2},
    {ar:'مِنْ', tr:'min', en:'from', freq:3000},
    {ar:'عَذَابِ', tr:'ʿadhābi', en:'the punishment of', freq:100},
    {ar:'يَوْمِئِذٍ', tr:'yawmiʾidhin', en:'that Day', freq:22},
    {ar:'بِبَنِيهِ', tr:'bi-banīhi', en:'with his children', freq:1},
  ]},
  {label:'70:12 — وَصَاحِبَتِهِ وَأَخِيهِ', words:[
    {ar:'وَصَاحِبَتِهِ', tr:'wa-ṣāḥibatihi', en:'And his wife', freq:2},
    {ar:'وَأَخِيهِ', tr:'wa-akhīhi', en:'and his brother', freq:3},
  ]},
  {label:'70:13 — وَفَصِيلَتِهِ الَّتِي تُؤْوِيهِ', words:[
    {ar:'وَفَصِيلَتِهِ', tr:'wa-faṣīlatihi', en:'And his nearest kin', freq:1},
    {ar:'الَّتِي', tr:'allatī', en:'who', freq:370},
    {ar:'تُؤْوِيهِ', tr:'tuʾwīhi', en:'sheltered him', freq:1},
  ]},
  {label:'70:14 — وَمَن فِي الْأَرْضِ جَمِيعًا ثُمَّ يُنجِيهِ', words:[
    {ar:'وَمَن', tr:'wa-man', en:'And whoever is', freq:100},
    {ar:'فِي', tr:'fī', en:'on', freq:3000},
    {ar:'الْأَرْضِ', tr:'al-arḍi', en:'the earth', freq:461},
    {ar:'جَمِيعًا', tr:'jamīʿan', en:'entirely', freq:28},
    {ar:'ثُمَّ', tr:'thumma', en:'then [it could]', freq:340},
    {ar:'يُنجِيهِ', tr:'yunjīhi', en:'save him', freq:2},
  ]},
  {label:'70:15 — كَلَّا إِنَّهَا لَظَىٰ', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'إِنَّهَا', tr:'innahā', en:'Indeed it is', freq:20},
    {ar:'لَظَىٰ', tr:'laẓā', en:'the Flame', freq:3},
  ]},
  {label:'70:16 — نَزَّاعَةً لِّلشَّوَىٰ', words:[
    {ar:'نَزَّاعَةً', tr:'nazzāʿatan', en:'A remover', freq:1},
    {ar:'لِّلشَّوَىٰ', tr:'lish-shawā', en:'of scalps', freq:1},
  ]},
  {label:'70:17 — تَدْعُو مَنْ أَدْبَرَ وَتَوَلَّىٰ', words:[
    {ar:'تَدْعُو', tr:'tadʿū', en:'It invites', freq:12},
    {ar:'مَنْ', tr:'man', en:'he who', freq:700},
    {ar:'أَدْبَرَ', tr:'adbara', en:'turned his back', freq:4},
    {ar:'وَتَوَلَّىٰ', tr:'wa-tawallā', en:'and went away', freq:10},
  ]},
  {label:'70:18 — وَجَمَعَ فَأَوْعَىٰ', words:[
    {ar:'وَجَمَعَ', tr:'wa-jamaʿa', en:'And collected [wealth]', freq:7},
    {ar:'فَأَوْعَىٰ', tr:'fa-awʿā', en:'and hoarded', freq:1},
  ]},
  {label:'70:19 — إِنَّ الْإِنسَانَ خُلِقَ هَلُوعًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:1500},
    {ar:'الْإِنسَانَ', tr:'al-insān', en:'mankind', freq:65},
    {ar:'خُلِقَ', tr:'khuliqa', en:'was created', freq:18},
    {ar:'هَلُوعًا', tr:'halūʿan', en:'anxious', freq:1},
  ]},
  {label:'70:20 — إِذَا مَسَّهُ الشَّرُّ جَزُوعًا', words:[
    {ar:'إِذَا', tr:'idhā', en:'When', freq:350},
    {ar:'مَسَّهُ', tr:'massahu', en:'touches him', freq:10},
    {ar:'الشَّرُّ', tr:'ash-sharr', en:'evil', freq:28},
    {ar:'جَزُوعًا', tr:'jazūʿan', en:'impatient', freq:1},
  ]},
  {label:'70:21 — وَإِذَا مَسَّهُ الْخَيْرُ مَنُوعًا', words:[
    {ar:'وَإِذَا', tr:'wa-idhā', en:'And when', freq:250},
    {ar:'مَسَّهُ', tr:'massahu', en:'touches him', freq:10},
    {ar:'الْخَيْرُ', tr:'al-khayr', en:'good', freq:110},
    {ar:'مَنُوعًا', tr:'manūʿan', en:'withholding', freq:1},
  ]},
  {label:'70:22 — إِلَّا الْمُصَلِّينَ', words:[
    {ar:'إِلَّا', tr:'illā', en:'Except', freq:660},
    {ar:'الْمُصَلِّينَ', tr:'al-muṣallīn', en:'those who pray', freq:2},
  ]},
  {label:'70:23 — الَّذِينَ هُمْ عَلَىٰ صَلَاتِهِمْ دَائِمُونَ', words:[
    {ar:'الَّذِينَ', tr:'alladhīna', en:'Who', freq:1200},
    {ar:'هُمْ', tr:'hum', en:'are', freq:800},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'in', freq:700},
    {ar:'صَلَاتِهِمْ', tr:'ṣalātihim', en:'their prayer', freq:6},
    {ar:'دَائِمُونَ', tr:'dāʾimūn', en:'constant', freq:1},
  ]},
  {label:'70:24 — وَالَّذِينَ فِي أَمْوَالِهِمْ حَقٌّ مَّعْلُومٌ', words:[
    {ar:'وَالَّذِينَ', tr:'walladhīna', en:'And those in', freq:300},
    {ar:'فِي', tr:'fī', en:'in', freq:3000},
    {ar:'أَمْوَالِهِمْ', tr:'amwālihim', en:'whose wealth', freq:14},
    {ar:'حَقٌّ', tr:'ḥaqqun', en:'is a right', freq:227},
    {ar:'مَّعْلُومٌ', tr:'maʿlūm', en:'recognized', freq:4},
  ]},
  {label:'70:25 — لِّلسَّائِلِ وَالْمَحْرُومِ', words:[
    {ar:'لِّلسَّائِلِ', tr:'lis-sāʾil', en:'For the petitioner', freq:3},
    {ar:'وَالْمَحْرُومِ', tr:'wal-maḥrūm', en:'and the deprived', freq:2},
  ]},
  {label:'70:26 — وَالَّذِينَ يُصَدِّقُونَ بِيَوْمِ الدِّينِ', words:[
    {ar:'وَالَّذِينَ', tr:'walladhīna', en:'And those who', freq:300},
    {ar:'يُصَدِّقُونَ', tr:'yuṣaddiqūn', en:'believe in', freq:4},
    {ar:'بِيَوْمِ', tr:'bi-yawmi', en:'the Day of', freq:15},
    {ar:'الدِّينِ', tr:'ad-dīn', en:'Recompense', freq:15},
  ]},
  {label:'70:27 — وَالَّذِينَ هُم مِّنْ عَذَابِ رَبِّهِم مُّشْفِقُونَ', words:[
    {ar:'وَالَّذِينَ', tr:'walladhīna', en:'And those who', freq:300},
    {ar:'هُم', tr:'hum', en:'are', freq:800},
    {ar:'مِّنْ', tr:'min', en:'of', freq:3000},
    {ar:'عَذَابِ', tr:'ʿadhābi', en:'the punishment of', freq:100},
    {ar:'رَبِّهِم', tr:'rabbihim', en:'their Lord', freq:100},
    {ar:'مُّشْفِقُونَ', tr:'mushfiqūn', en:'fearful', freq:4},
  ]},
  {label:'70:28 — إِنَّ عَذَابَ رَبِّهِمْ غَيْرُ مَأْمُونٍ', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:1500},
    {ar:'عَذَابَ', tr:'ʿadhāba', en:'the punishment of', freq:100},
    {ar:'رَبِّهِمْ', tr:'rabbihim', en:'their Lord', freq:100},
    {ar:'غَيْرُ', tr:'ghayru', en:'is not', freq:150},
    {ar:'مَأْمُونٍ', tr:'maʾmūn', en:'[to be felt] safe', freq:1},
  ]},
  {label:'70:29 — وَالَّذِينَ هُمْ لِفُرُوجِهِمْ حَافِظُونَ', words:[
    {ar:'وَالَّذِينَ', tr:'walladhīna', en:'And those who', freq:300},
    {ar:'هُمْ', tr:'hum', en:'[they]', freq:800},
    {ar:'لِفُرُوجِهِمْ', tr:'li-furūjihim', en:'their private parts', freq:2},
    {ar:'حَافِظُونَ', tr:'ḥāfiẓūn', en:'are guarding', freq:3},
  ]},
  {label:'70:30 — إِلَّا عَلَىٰ أَزْوَاجِهِمْ أَوْ مَا مَلَكَتْ أَيْمَانُهُمْ فَإِنَّهُمْ غَيْرُ مَلُومِينَ', words:[
    {ar:'إِلَّا', tr:'illā', en:'Except', freq:660},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'from', freq:700},
    {ar:'أَزْوَاجِهِمْ', tr:'azwājihim', en:'their wives', freq:10},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
    {ar:'مَا مَلَكَتْ', tr:'mā malakat', en:'whom possess', freq:15},
    {ar:'أَيْمَانُهُمْ', tr:'aymānuhum', en:'their right hands', freq:14},
    {ar:'فَإِنَّهُمْ', tr:'fa-innahum', en:'for indeed they are', freq:5},
    {ar:'غَيْرُ', tr:'ghayru', en:'not', freq:150},
    {ar:'مَلُومِينَ', tr:'malūmīn', en:'to be blamed', freq:2},
  ]},
  {label:'70:31 — فَمَنِ ابْتَغَىٰ وَرَاءَ ذَٰلِكَ فَأُولَٰئِكَ هُمُ الْعَادُونَ', words:[
    {ar:'فَمَنِ', tr:'fa-mani', en:'But whoever seeks', freq:15},
    {ar:'ابْتَغَىٰ', tr:'ibtaghā', en:'seeks', freq:9},
    {ar:'وَرَاءَ', tr:'warāʾa', en:'beyond', freq:17},
    {ar:'ذَٰلِكَ', tr:'dhālika', en:'that', freq:700},
    {ar:'فَأُولَٰئِكَ', tr:'fa-ulāʾika', en:'then those are', freq:30},
    {ar:'هُمُ', tr:'humu', en:'[they are]', freq:800},
    {ar:'الْعَادُونَ', tr:'al-ʿādūn', en:'the transgressors', freq:2},
  ]},
  {label:'70:32 — وَالَّذِينَ هُمْ لِأَمَانَاتِهِمْ وَعَهْدِهِمْ رَاعُونَ', words:[
    {ar:'وَالَّذِينَ', tr:'walladhīna', en:'And those who', freq:300},
    {ar:'هُمْ', tr:'hum', en:'are', freq:800},
    {ar:'لِأَمَانَاتِهِمْ', tr:'li-amānātihim', en:'to their trusts', freq:2},
    {ar:'وَعَهْدِهِمْ', tr:'wa-ʿahdihim', en:'and their promises', freq:2},
    {ar:'رَاعُونَ', tr:'rāʿūn', en:'attentive', freq:2},
  ]},
  {label:'70:33 — وَالَّذِينَ هُم بِشَهَادَاتِهِمْ قَائِمُونَ', words:[
    {ar:'وَالَّذِينَ', tr:'walladhīna', en:'And those who', freq:300},
    {ar:'هُم', tr:'hum', en:'are', freq:800},
    {ar:'بِشَهَادَاتِهِمْ', tr:'bi-shahādātihim', en:'in their testimonies', freq:1},
    {ar:'قَائِمُونَ', tr:'qāʾimūn', en:'upright', freq:3},
  ]},
  {label:'70:34 — وَالَّذِينَ هُمْ عَلَىٰ صَلَاتِهِمْ يُحَافِظُونَ', words:[
    {ar:'وَالَّذِينَ', tr:'walladhīna', en:'And those who', freq:300},
    {ar:'هُمْ', tr:'hum', en:'are', freq:800},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'over', freq:700},
    {ar:'صَلَاتِهِمْ', tr:'ṣalātihim', en:'their prayer', freq:6},
    {ar:'يُحَافِظُونَ', tr:'yuḥāfiẓūn', en:'carefully guarding', freq:5},
  ]},
  {label:'70:35 — أُولَٰئِكَ فِي جَنَّاتٍ مُّكْرَمُونَ', words:[
    {ar:'أُولَٰئِكَ', tr:'ulāʾika', en:'Those are', freq:70},
    {ar:'فِي', tr:'fī', en:'in', freq:3000},
    {ar:'جَنَّاتٍ', tr:'jannātin', en:'Gardens', freq:66},
    {ar:'مُّكْرَمُونَ', tr:'mukramūn', en:'honored', freq:3},
  ]},
  {label:'70:36 — فَمَالِ الَّذِينَ كَفَرُوا قِبَلَكَ مُهْطِعِينَ', words:[
    {ar:'فَمَالِ', tr:'fa-māli', en:'So what is [wrong]', freq:4},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'with those who', freq:1200},
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieve', freq:200},
    {ar:'قِبَلَكَ', tr:'qibalaka', en:'towards you', freq:1},
    {ar:'مُهْطِعِينَ', tr:'muhṭiʿīn', en:'hastening', freq:2},
  ]},
  {label:'70:37 — عَنِ الْيَمِينِ وَعَنِ الشِّمَالِ عِزِينَ', words:[
    {ar:'عَنِ', tr:'ʿani', en:'From', freq:330},
    {ar:'الْيَمِينِ', tr:'al-yamīn', en:'the right', freq:15},
    {ar:'وَعَنِ', tr:'wa-ʿani', en:'and from', freq:50},
    {ar:'الشِّمَالِ', tr:'ash-shimāl', en:'the left', freq:5},
    {ar:'عِزِينَ', tr:'ʿizīn', en:'in separate groups', freq:1},
  ]},
  {label:'70:38 — أَيَطْمَعُ كُلُّ امْرِئٍ مِّنْهُمْ أَن يُدْخَلَ جَنَّةَ نَعِيمٍ', words:[
    {ar:'أَيَطْمَعُ', tr:'a-yaṭmaʿu', en:'Does aspire', freq:1},
    {ar:'كُلُّ', tr:'kullu', en:'every', freq:330},
    {ar:'امْرِئٍ', tr:'imriʾin', en:'person', freq:6},
    {ar:'مِّنْهُمْ', tr:'minhum', en:'among them', freq:130},
    {ar:'أَن', tr:'an', en:'to', freq:800},
    {ar:'يُدْخَلَ', tr:'yudkhala', en:'enter', freq:3},
    {ar:'جَنَّةَ', tr:'jannata', en:'a Garden of', freq:66},
    {ar:'نَعِيمٍ', tr:'naʿīm', en:'Pleasure', freq:15},
  ]},
  {label:'70:39 — كَلَّا إِنَّا خَلَقْنَاهُم مِّمَّا يَعْلَمُونَ', words:[
    {ar:'كَلَّا', tr:'kallā', en:'No!', freq:33},
    {ar:'إِنَّا', tr:'innā', en:'Indeed We', freq:70},
    {ar:'خَلَقْنَاهُم', tr:'khalaqnāhum', en:'created them', freq:7},
    {ar:'مِّمَّا', tr:'mimmā', en:'from that which', freq:70},
    {ar:'يَعْلَمُونَ', tr:'yaʿlamūn', en:'they know', freq:200},
  ]},
  {label:'70:40 — فَلَا أُقْسِمُ بِرَبِّ الْمَشَارِقِ وَالْمَغَارِبِ إِنَّا لَقَادِرُونَ', words:[
    {ar:'فَلَا', tr:'fa-lā', en:'So I swear', freq:90},
    {ar:'أُقْسِمُ', tr:'uqsimu', en:'I swear', freq:7},
    {ar:'بِرَبِّ', tr:'bi-rabbi', en:'by the Lord of', freq:8},
    {ar:'الْمَشَارِقِ', tr:'al-mashāriq', en:'the Easts', freq:3},
    {ar:'وَالْمَغَارِبِ', tr:'wal-maghārib', en:'and the Wests', freq:3},
    {ar:'إِنَّا', tr:'innā', en:'indeed We are', freq:70},
    {ar:'لَقَادِرُونَ', tr:'la-qādirūn', en:'surely Able', freq:3},
  ]},
  {label:'70:41 — عَلَىٰ أَن نُّبَدِّلَ خَيْرًا مِّنْهُمْ وَمَا نَحْنُ بِمَسْبُوقِينَ', words:[
    {ar:'عَلَىٰ', tr:'ʿalā', en:'To', freq:700},
    {ar:'أَن', tr:'an', en:'[to]', freq:800},
    {ar:'نُّبَدِّلَ', tr:'nubaddila', en:'replace [them]', freq:4},
    {ar:'خَيْرًا', tr:'khayran', en:'with better', freq:110},
    {ar:'مِّنْهُمْ', tr:'minhum', en:'than them', freq:130},
    {ar:'وَمَا', tr:'wa-mā', en:'and not', freq:700},
    {ar:'نَحْنُ', tr:'naḥnu', en:'We are', freq:70},
    {ar:'بِمَسْبُوقِينَ', tr:'bi-masbūqīn', en:'to be outdone', freq:2},
  ]},
  {label:'70:42 — فَذَرْهُمْ يَخُوضُوا وَيَلْعَبُوا حَتَّىٰ يُلَاقُوا يَوْمَهُمُ الَّذِي يُوعَدُونَ', words:[
    {ar:'فَذَرْهُمْ', tr:'fa-dharhum', en:'So leave them', freq:4},
    {ar:'يَخُوضُوا', tr:'yakhūḍū', en:'to converse vainly', freq:3},
    {ar:'وَيَلْعَبُوا', tr:'wa-yalʿabū', en:'and amuse themselves', freq:3},
    {ar:'حَتَّىٰ', tr:'ḥattā', en:'until', freq:120},
    {ar:'يُلَاقُوا', tr:'yulāqū', en:'they meet', freq:3},
    {ar:'يَوْمَهُمُ', tr:'yawmahumu', en:'their Day', freq:4},
    {ar:'الَّذِي', tr:'alladhī', en:'which', freq:1283},
    {ar:'يُوعَدُونَ', tr:'yūʿadūn', en:'they are promised', freq:8},
  ]},
  {label:'70:43 — يَوْمَ يَخْرُجُونَ مِنَ الْأَجْدَاثِ سِرَاعًا كَأَنَّهُمْ إِلَىٰ نُصُبٍ يُوفِضُونَ', words:[
    {ar:'يَوْمَ', tr:'yawma', en:'The Day', freq:400},
    {ar:'يَخْرُجُونَ', tr:'yakhrujūn', en:'they will emerge', freq:14},
    {ar:'مِنَ', tr:'mina', en:'from', freq:3000},
    {ar:'الْأَجْدَاثِ', tr:'al-ajdāth', en:'the graves', freq:2},
    {ar:'سِرَاعًا', tr:'sirāʿan', en:'rapidly', freq:2},
    {ar:'كَأَنَّهُمْ', tr:'ka-annahum', en:'as if they were', freq:19},
    {ar:'إِلَىٰ', tr:'ilā', en:'heading toward', freq:700},
    {ar:'نُصُبٍ', tr:'nuṣubin', en:'an erected idol', freq:2},
    {ar:'يُوفِضُونَ', tr:'yūfiḍūn', en:'competing', freq:1},
  ]},
  {label:'70:44 — خَاشِعَةً أَبْصَارُهُمْ تَرْهَقُهُمْ ذِلَّةٌ ذَٰلِكَ الْيَوْمُ الَّذِي كَانُوا يُوعَدُونَ', words:[
    {ar:'خَاشِعَةً', tr:'khāshiʿatan', en:'Humbled', freq:4},
    {ar:'أَبْصَارُهُمْ', tr:'abṣāruhum', en:'their eyes', freq:8},
    {ar:'تَرْهَقُهُمْ', tr:'tarhaquhum', en:'will cover them', freq:2},
    {ar:'ذِلَّةٌ', tr:'dhillatun', en:'humiliation', freq:5},
    {ar:'ذَٰلِكَ', tr:'dhālika', en:'That is', freq:700},
    {ar:'الْيَوْمُ', tr:'al-yawm', en:'the Day', freq:400},
    {ar:'الَّذِي', tr:'alladhī', en:'which', freq:1283},
    {ar:'كَانُوا', tr:'kānū', en:'they had been', freq:280},
    {ar:'يُوعَدُونَ', tr:'yūʿadūn', en:'promised', freq:8},
  ]},
];
window.setupWBWLevel(WBW_DATA, 10);
