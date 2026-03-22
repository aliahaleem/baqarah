'use strict';
/* Surah Al-Qalam (68) — The Pen */
window.STORAGE_KEY = 'qalamQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Answers:{}, s3Checked:false,
  s4Answers:{}, s4Checked:false,
  s5Checked:false,
};

const REWARDS = {
  1:{xp:80, gems:3, icon:'🖊️', title:'Pen & Character',  msg:"SubhanAllah! 'Nun — by the Pen and what they inscribe!' The very first letter is Nun. The very first oath: by the Pen. Knowledge, writing, and record — central to Islam from the very first revelation. And then: you are NOT mad, O Muhammad ﷺ — you are upon an exalted character. Khuluqin 'adheem!"},
  2:{xp:80, gems:3, icon:'🌿', title:'Garden Owners',     msg:"Allahu Akbar! The garden owners swore to harvest without giving to the poor — and they woke to a blackened ruin. Their arrogance cost them everything. 'Inna lil-muttagheen 'inda rabbihim jannat al-na'eem.' For the God-conscious: gardens of paradise. For the arrogant: charred loss."},
  3:{xp:90, gems:3, icon:'⚖️', title:'Character vs Pride', msg:"MashAllah! Allah distinguishes the believer's character from the nine traits of the arrogant disbeliever. Waylun li kulli hummazatin lumazah — woe to every fault-finder! The Prophet ﷺ is on the highest moral ground. May Allah give us that character too!"},
  4:{xp:100, gems:4, icon:'🌊', title:'Qalam Complete!',   msg:"ALLAHUMMA BARIK! Surah Al-Qalam complete! The pen writes your deeds. Your character defines you. The garden owners teach: never withhold from the poor. And the Day is coming when all will be exposed. May Allah write us among those of khuluqin 'adheem!"},
  5:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Al-Qalam word by word!'},
};

window.SURAH_CONFIG = {
  id:'s68', surahName:'Al-Qalam', surahArabic:'القلم', totalLevels:5, wbwSection:5, rewards:REWARDS,
  tileIcons:['🖊️','🌿','⚖️','📋'],
  tileLabels:['Pen & Character','The Garden','Traits','Reckoning'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Surah Al-Qalam — The Pen. By the Pen! The Prophet ﷺ is upon an exalted character. The garden owners lose everything through arrogance. Character vs pride. 4 levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. The Pen is still writing your story — keep going! 🖊️`,
    complete: name=>`MashAllah, ${name}! Al-Qalam complete! May Allah write you among those of great character! 🏆`,
  },
};

/* Level 1 — Quiz: The Pen & The Prophet's Character (68:1-7) */
const S1_QUIZ = [
  {q:'What does "Nun — wal-qalami wa ma yasturoon" (68:1) mean?',
   opts:['By the ink and the scholars who study','By the Pen and what they inscribe','By the word and what is remembered','By the book and what is written'],
   correct:1},
  {q:'What does Allah declare about the Prophet ﷺ in 68:2?',
   opts:['That he is a scholar among scholars','That he is a king with great power','That he is not, by the grace of his Lord, a madman','That he is the greatest of all creation'],
   correct:2},
  {q:'What does "wa innaka la-ala khuluqin adheem" (68:4) mean?',
   opts:['You are upon an exalted and mighty character','You are upon a path of great learning','You are from a noble and ancient lineage','You are given a unique and special mission'],
   correct:0},
  {q:'According to 68:5-6, who will be questioned about which party is afflicted with madness?',
   opts:['The angels will question the believers','Allah will question the disbelievers','Both the Prophet and his opponents will be judged','The scholars will determine the truth'],
   correct:2},
];

/* Level 2 — Drag & Drop: The Garden Owners (68:17-33) */
const S2_ITEMS = [
  {id:'g1', text:'🌙 They planned\nto harvest at dawn',         zone:'z1'},
  {id:'g2', text:'🤫 Made no exception\nfor the poor (insha)',  zone:'z2'},
  {id:'g3', text:'🔥 Garden became\nblackened ruin',            zone:'z3'},
  {id:'g4', text:'😔 They blamed\neach other at first',         zone:'z4'},
  {id:'g5', text:'🙏 Humbled: maybe\nour Lord will replace it', zone:'z5'},
];
const S2_ZONES = [
  {id:'z1', desc:'Their arrogant plan: "We will harvest secretly while the poor sleep" (68:17-19)'},
  {id:'z2', desc:'Their fatal mistake: they said nothing about making exception for the needy — no "insha Allah" (68:18)'},
  {id:'z3', desc:'Allah\'s response: a calamity from your Lord burned and ruined the garden (68:20-21)'},
  {id:'z4', desc:'Their first reaction: mutual blame — "you misled us!" But they had agreed together (68:30)'},
  {id:'z5', desc:'Their realisation and humble prayer: "Perhaps our Lord will give us better in exchange" (68:32)'},
];

/* Level 3 — Fill-in-the-Blank: The Garden Owners (68:17-33) */
const S3_FIB = [
  {verse:'إِنَّا بَلَوْنَاهُمْ كَمَا بَلَوْنَا أَصْحَابَ _____', opts:['الْجَنَّةِ','الْأَرْضِ','الْقَرْيَةِ','الْمَدِينَةِ'], correct:0, ref:'68:17', translation:'Indeed, We have tried them as We tried the companions of the garden'},
  {verse:'وَلَا _____', opts:['يَسْتَثْنُونَ','يَتُوبُونَ','يَشْكُرُونَ','يَذْكُرُونَ'], correct:0, ref:'68:18', translation:'And they made no exception (did not say insha Allah)'},
  {verse:'فَأَصْبَحَتْ _____', opts:['كَالصَّرِيمِ','كَالرَّمَادِ','كَالتُّرَابِ','كَالْهَشِيمِ'], correct:0, ref:'68:20', translation:'And it became as though reaped — completely destroyed'},
  {verse:'قَالَ أَوْسَطُهُمْ أَلَمْ أَقُل لَّكُمْ لَوْلَا _____', opts:['تُسَبِّحُونَ','تَتُوبُونَ','تَسْتَغْفِرُونَ','تَتَّقُونَ'], correct:0, ref:'68:28', translation:'The most moderate of them said: Did I not say to you, why do you not glorify Allah?'},
  {verse:'قَالُوا سُبْحَانَ رَبِّنَا إِنَّا كُنَّا _____', opts:['ظَالِمِينَ','غَافِلِينَ','كَافِرِينَ','خَاسِرِينَ'], correct:0, ref:'68:29', translation:'They said: Glory be to our Lord! Indeed, we were wrongdoers'},
];

/* Level 4 — Quiz: Traits of the Arrogant (68:10-16) */
const S4_QUIZ = [
  {q:'In 68:10-13, how many negative character traits does Allah list for the wicked one?',
   opts:['Five traits listed','Seven traits listed','Nine traits listed','Twelve traits listed'],
   correct:2},
  {q:'What does "halaafin maheen" (68:10) mean?',
   opts:['A generous and kind person','A vile and habitual swearer','A brave and courageous leader','A wise and intelligent elder'],
   correct:1},
  {q:'What does "utullin ba\'da dhalika zaneem" (68:13) mean?',
   opts:['Cruel, and on top of that, of dubious origin','Rich and proud of his wealth','Patient but eventually punished','Powerful yet unworthy of respect'],
   correct:0},
  {q:'What threat does Allah make in 68:16 to the one who rejected?',
   opts:['Their wealth will be taken away soon','They will be branded on the nose','Their family will turn against them','Their deeds will be erased forever'],
   correct:1},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderFillBlank(3,S3_FIB);}
function checkSection3(){checkFillBlank(3,S3_FIB);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}
function checkSection4(){checkQuiz(4,S4_QUIZ);}
// =============================================
//  WORD-BY-WORD DATA — Surah Al-Qalam (68), 52 verses
// =============================================
const WBW_DATA = [
  {label:'68:1 — نۤ وَالْقَلَمِ وَمَا يَسْطُرُونَ', words:[
    {ar:'نۤ', tr:'nūn', en:'Nun', freq:1},
    {ar:'وَالْقَلَمِ', tr:'wal-qalam', en:'by the Pen', freq:2},
    {ar:'وَمَا', tr:'wa-mā', en:'and what', freq:200},
    {ar:'يَسْطُرُونَ', tr:'yasṭurūn', en:'they inscribe', freq:1},
  ]},
  {label:'68:2 — مَا أَنتَ بِنِعْمَةِ رَبِّكَ بِمَجْنُونٍ', words:[
    {ar:'مَا', tr:'mā', en:'not', freq:2005},
    {ar:'أَنتَ', tr:'anta', en:'you are', freq:80},
    {ar:'بِنِعْمَةِ', tr:'bi-niʿmati', en:'by the grace of', freq:15},
    {ar:'رَبِّكَ', tr:'rabbika', en:'your Lord', freq:49},
    {ar:'بِمَجْنُونٍ', tr:'bi-majnūn', en:'a madman', freq:6},
  ]},
  {label:'68:3 — وَإِنَّ لَكَ لَأَجْرًا غَيْرَ مَمْنُونٍ', words:[
    {ar:'وَإِنَّ', tr:'wa-inna', en:'and indeed', freq:100},
    {ar:'لَكَ', tr:'laka', en:'for you', freq:100},
    {ar:'لَأَجْرًا', tr:'la-ajran', en:'surely a reward', freq:50},
    {ar:'غَيْرَ', tr:'ghayra', en:'without', freq:100},
    {ar:'مَمْنُونٍ', tr:'mamnūn', en:'end / interruption', freq:3},
  ]},
  {label:'68:4 — وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ', words:[
    {ar:'وَإِنَّكَ', tr:'wa-innaka', en:'and indeed you are', freq:8},
    {ar:'لَعَلَىٰ', tr:'la-ʿalā', en:'surely upon', freq:10},
    {ar:'خُلُقٍ', tr:'khuluqin', en:'a character', freq:3},
    {ar:'عَظِيمٍ', tr:'ʿaẓīm', en:'exalted / great', freq:79},
  ]},
  {label:'68:5 — فَسَتُبْصِرُ وَيُبْصِرُونَ', words:[
    {ar:'فَسَتُبْصِرُ', tr:'fa-satubṣiru', en:'so you will see', freq:1},
    {ar:'وَيُبْصِرُونَ', tr:'wa-yubṣirūn', en:'and they will see', freq:3},
  ]},
  {label:'68:6 — بِأَيِّيكُمُ الْمَفْتُونُ', words:[
    {ar:'بِأَيِّيكُمُ', tr:'bi-ayyikum', en:'which of you', freq:1},
    {ar:'الْمَفْتُونُ', tr:'al-maftūn', en:'is the afflicted', freq:1},
  ]},
  {label:'68:7 — إِنَّ رَبَّكَ هُوَ أَعْلَمُ بِمَن ضَلَّ عَن سَبِيلِهِ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ', words:[
    {ar:'إِنَّ', tr:'inna', en:'indeed', freq:743},
    {ar:'رَبَّكَ', tr:'rabbaka', en:'your Lord', freq:49},
    {ar:'هُوَ', tr:'huwa', en:'He', freq:526},
    {ar:'أَعْلَمُ', tr:'aʿlamu', en:'is most knowing', freq:40},
    {ar:'بِمَن', tr:'bi-man', en:'of who', freq:30},
    {ar:'ضَلَّ', tr:'ḍalla', en:'has strayed', freq:30},
    {ar:'عَن سَبِيلِهِ', tr:'ʿan sabīlihi', en:'from His path', freq:20},
    {ar:'وَهُوَ', tr:'wa-huwa', en:'and He is', freq:250},
    {ar:'بِالْمُهْتَدِينَ', tr:'bil-muhtadīn', en:'of the guided', freq:8},
  ]},
  {label:'68:8 — فَلَا تُطِعِ الْمُكَذِّبِينَ', words:[
    {ar:'فَلَا', tr:'fa-lā', en:'so do not', freq:100},
    {ar:'تُطِعِ', tr:'tuṭiʿi', en:'obey', freq:13},
    {ar:'الْمُكَذِّبِينَ', tr:'al-mukadhdhibīn', en:'the deniers', freq:16},
  ]},
  {label:'68:9 — وَدُّوا لَوْ تُدْهِنُ فَيُدْهِنُونَ', words:[
    {ar:'وَدُّوا', tr:'waddū', en:'they wish', freq:10},
    {ar:'لَوْ', tr:'law', en:'if only', freq:147},
    {ar:'تُدْهِنُ', tr:'tudhinu', en:'you would compromise', freq:1},
    {ar:'فَيُدْهِنُونَ', tr:'fa-yudhinūn', en:'so they could compromise', freq:1},
  ]},
  {label:'68:10 — وَلَا تُطِعْ كُلَّ حَلَّافٍ مَّهِينٍ', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'and do not', freq:626},
    {ar:'تُطِعْ', tr:'tuṭiʿ', en:'obey', freq:13},
    {ar:'كُلَّ', tr:'kulla', en:'every', freq:330},
    {ar:'حَلَّافٍ', tr:'ḥallāf', en:'habitual swearer', freq:1},
    {ar:'مَّهِينٍ', tr:'mahīn', en:'contemptible', freq:4},
  ]},
  {label:'68:11 — هَمَّازٍ مَّشَّاءٍ بِنَمِيمٍ', words:[
    {ar:'هَمَّازٍ', tr:'hammāz', en:'backbiter / scorner', freq:2},
    {ar:'مَّشَّاءٍ', tr:'mashshāʾ', en:'going about', freq:1},
    {ar:'بِنَمِيمٍ', tr:'bi-namīm', en:'with malicious gossip', freq:1},
  ]},
  {label:'68:12 — مَّنَّاعٍ لِّلْخَيْرِ مُعْتَدٍ أَثِيمٍ', words:[
    {ar:'مَّنَّاعٍ', tr:'mannāʿ', en:'preventer of good', freq:2},
    {ar:'لِّلْخَيْرِ', tr:'lil-khayr', en:'of good', freq:50},
    {ar:'مُعْتَدٍ', tr:'muʿtadin', en:'transgressor', freq:8},
    {ar:'أَثِيمٍ', tr:'athīm', en:'sinful', freq:6},
  ]},
  {label:'68:13 — عُتُلٍّ بَعْدَ ذَٰلِكَ زَنِيمٍ', words:[
    {ar:'عُتُلٍّ', tr:'ʿutullin', en:'cruel', freq:1},
    {ar:'بَعْدَ', tr:'baʿda', en:'moreover / after', freq:200},
    {ar:'ذَٰلِكَ', tr:'dhālika', en:'all that', freq:382},
    {ar:'زَنِيمٍ', tr:'zanīm', en:'of dubious origin', freq:1},
  ]},
  {label:'68:14 — أَن كَانَ ذَا مَالٍ وَبَنِينَ', words:[
    {ar:'أَن', tr:'an', en:'because', freq:500},
    {ar:'كَانَ', tr:'kāna', en:'he is', freq:1358},
    {ar:'ذَا', tr:'dhā', en:'an owner of', freq:20},
    {ar:'مَالٍ', tr:'māl', en:'wealth', freq:50},
    {ar:'وَبَنِينَ', tr:'wa-banīn', en:'and children', freq:20},
  ]},
  {label:'68:15 — إِذَا تُتْلَىٰ عَلَيْهِ آيَاتُنَا قَالَ أَسَاطِيرُ الْأَوَّلِينَ', words:[
    {ar:'إِذَا', tr:'idhā', en:'when', freq:406},
    {ar:'تُتْلَىٰ', tr:'tutlā', en:'are recited', freq:8},
    {ar:'عَلَيْهِ', tr:'ʿalayhi', en:'to him', freq:150},
    {ar:'آيَاتُنَا', tr:'āyātunā', en:'Our verses', freq:50},
    {ar:'قَالَ', tr:'qāla', en:'he says', freq:528},
    {ar:'أَسَاطِيرُ', tr:'asāṭīr', en:'legends of', freq:9},
    {ar:'الْأَوَّلِينَ', tr:'al-awwalīn', en:'the former peoples', freq:30},
  ]},
  {label:'68:16 — سَنَسِمُهُ عَلَى الْخُرْطُومِ', words:[
    {ar:'سَنَسِمُهُ', tr:'sanasimuhu', en:'We will brand him', freq:1},
    {ar:'عَلَى', tr:'ʿalā', en:'upon', freq:700},
    {ar:'الْخُرْطُومِ', tr:'al-khurṭūm', en:'the snout / nose', freq:1},
  ]},
  {label:'68:17 — إِنَّا بَلَوْنَاهُمْ كَمَا بَلَوْنَا أَصْحَابَ الْجَنَّةِ إِذْ أَقْسَمُوا لَيَصْرِمُنَّهَا مُصْبِحِينَ', words:[
    {ar:'إِنَّا', tr:'innā', en:'indeed We', freq:112},
    {ar:'بَلَوْنَاهُمْ', tr:'balawnāhum', en:'have tested them', freq:2},
    {ar:'كَمَا', tr:'kamā', en:'as', freq:90},
    {ar:'بَلَوْنَا', tr:'balawnā', en:'We tested', freq:2},
    {ar:'أَصْحَابَ', tr:'aṣḥāba', en:'the companions of', freq:98},
    {ar:'الْجَنَّةِ', tr:'al-jannah', en:'the garden', freq:66},
    {ar:'إِذْ', tr:'idh', en:'when', freq:200},
    {ar:'أَقْسَمُوا', tr:'aqsamū', en:'they swore', freq:10},
    {ar:'لَيَصْرِمُنَّهَا', tr:'la-yaṣrimunnahā', en:'to cut its fruit', freq:1},
    {ar:'مُصْبِحِينَ', tr:'muṣbiḥīn', en:'in the morning', freq:4},
  ]},
  {label:'68:18 — وَلَا يَسْتَثْنُونَ', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'and they made no', freq:626},
    {ar:'يَسْتَثْنُونَ', tr:'yastathnūn', en:'exception', freq:1},
  ]},
  {label:'68:19 — فَطَافَ عَلَيْهَا طَائِفٌ مِّن رَّبِّكَ وَهُمْ نَائِمُونَ', words:[
    {ar:'فَطَافَ', tr:'fa-ṭāfa', en:'so there came', freq:3},
    {ar:'عَلَيْهَا', tr:'ʿalayhā', en:'upon it', freq:60},
    {ar:'طَائِفٌ', tr:'ṭāʾifun', en:'a calamity', freq:3},
    {ar:'مِّن رَّبِّكَ', tr:'min rabbika', en:'from your Lord', freq:49},
    {ar:'وَهُمْ', tr:'wa-hum', en:'while they were', freq:100},
    {ar:'نَائِمُونَ', tr:'nāʾimūn', en:'asleep', freq:1},
  ]},
  {label:'68:20 — فَأَصْبَحَتْ كَالصَّرِيمِ', words:[
    {ar:'فَأَصْبَحَتْ', tr:'fa-aṣbaḥat', en:'so it became', freq:5},
    {ar:'كَالصَّرِيمِ', tr:'kaṣ-ṣarīm', en:'like one destroyed', freq:1},
  ]},
  {label:'68:21 — فَتَنَادَوْا مُصْبِحِينَ', words:[
    {ar:'فَتَنَادَوْا', tr:'fa-tanādaw', en:'and they called one another', freq:2},
    {ar:'مُصْبِحِينَ', tr:'muṣbiḥīn', en:'at morning', freq:4},
  ]},
  {label:'68:22 — أَنِ اغْدُوا عَلَىٰ حَرْثِكُمْ إِن كُنتُمْ صَارِمِينَ', words:[
    {ar:'أَنِ', tr:'an', en:'that', freq:500},
    {ar:'اغْدُوا', tr:'ighdū', en:'go early', freq:1},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'to', freq:700},
    {ar:'حَرْثِكُمْ', tr:'ḥarthikum', en:'your crop', freq:2},
    {ar:'إِن كُنتُمْ', tr:'in kuntum', en:'if you would', freq:30},
    {ar:'صَارِمِينَ', tr:'ṣārimīn', en:'cut the fruit', freq:1},
  ]},
  {label:'68:23 — فَانطَلَقُوا وَهُمْ يَتَخَافَتُونَ', words:[
    {ar:'فَانطَلَقُوا', tr:'fa-nṭalaqū', en:'so they set out', freq:4},
    {ar:'وَهُمْ', tr:'wa-hum', en:'while they', freq:100},
    {ar:'يَتَخَافَتُونَ', tr:'yatakhāfatūn', en:'were whispering', freq:1},
  ]},
  {label:'68:24 — أَن لَّا يَدْخُلَنَّهَا الْيَوْمَ عَلَيْكُم مِّسْكِينٌ', words:[
    {ar:'أَن لَّا', tr:'an lā', en:'that no', freq:100},
    {ar:'يَدْخُلَنَّهَا', tr:'yadkhulunnahā', en:'will enter it', freq:3},
    {ar:'الْيَوْمَ', tr:'al-yawm', en:'today', freq:365},
    {ar:'عَلَيْكُم', tr:'ʿalaykum', en:'upon you', freq:100},
    {ar:'مِّسْكِينٌ', tr:'miskīn', en:'any poor person', freq:25},
  ]},
  {label:'68:25 — وَغَدَوْا عَلَىٰ حَرْدٍ قَادِرِينَ', words:[
    {ar:'وَغَدَوْا', tr:'wa-ghadaw', en:'and they went early', freq:1},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'in', freq:700},
    {ar:'حَرْدٍ', tr:'ḥardin', en:'determination', freq:1},
    {ar:'قَادِرِينَ', tr:'qādirīn', en:'assuming ability', freq:12},
  ]},
  {label:'68:26 — فَلَمَّا رَأَوْهَا قَالُوا إِنَّا لَضَالُّونَ', words:[
    {ar:'فَلَمَّا', tr:'fa-lammā', en:'but when', freq:70},
    {ar:'رَأَوْهَا', tr:'raʾawhā', en:'they saw it', freq:8},
    {ar:'قَالُوا', tr:'qālū', en:'they said', freq:528},
    {ar:'إِنَّا', tr:'innā', en:'indeed we', freq:112},
    {ar:'لَضَالُّونَ', tr:'la-ḍāllūn', en:'are surely lost', freq:3},
  ]},
  {label:'68:27 — بَلْ نَحْنُ مَحْرُومُونَ', words:[
    {ar:'بَلْ', tr:'bal', en:'rather', freq:127},
    {ar:'نَحْنُ', tr:'naḥnu', en:'we are', freq:60},
    {ar:'مَحْرُومُونَ', tr:'maḥrūmūn', en:'deprived', freq:2},
  ]},
  {label:'68:28 — قَالَ أَوْسَطُهُمْ أَلَمْ أَقُل لَّكُمْ لَوْلَا تُسَبِّحُونَ', words:[
    {ar:'قَالَ', tr:'qāla', en:'said', freq:528},
    {ar:'أَوْسَطُهُمْ', tr:'awsaṭuhum', en:'the most moderate of them', freq:1},
    {ar:'أَلَمْ', tr:'alam', en:'did I not', freq:40},
    {ar:'أَقُل', tr:'aqul', en:'say', freq:10},
    {ar:'لَّكُمْ', tr:'lakum', en:'to you', freq:200},
    {ar:'لَوْلَا', tr:'lawlā', en:'why do you not', freq:30},
    {ar:'تُسَبِّحُونَ', tr:'tusabbiḥūn', en:'glorify Allah', freq:8},
  ]},
  {label:'68:29 — قَالُوا سُبْحَانَ رَبِّنَا إِنَّا كُنَّا ظَالِمِينَ', words:[
    {ar:'قَالُوا', tr:'qālū', en:'they said', freq:528},
    {ar:'سُبْحَانَ', tr:'subḥāna', en:'glory be to', freq:41},
    {ar:'رَبِّنَا', tr:'rabbinā', en:'our Lord', freq:60},
    {ar:'إِنَّا', tr:'innā', en:'indeed we', freq:112},
    {ar:'كُنَّا', tr:'kunnā', en:'have been', freq:60},
    {ar:'ظَالِمِينَ', tr:'ẓālimīn', en:'wrongdoers', freq:40},
  ]},
  {label:'68:30 — فَأَقْبَلَ بَعْضُهُمْ عَلَىٰ بَعْضٍ يَتَلَاوَمُونَ', words:[
    {ar:'فَأَقْبَلَ', tr:'fa-aqbala', en:'then they turned', freq:5},
    {ar:'بَعْضُهُمْ', tr:'baʿḍuhum', en:'some of them', freq:20},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'upon', freq:700},
    {ar:'بَعْضٍ', tr:'baʿḍ', en:'others', freq:20},
    {ar:'يَتَلَاوَمُونَ', tr:'yatalāwamūn', en:'blaming one another', freq:1},
  ]},
  {label:'68:31 — قَالُوا يَا وَيْلَنَا إِنَّا كُنَّا طَاغِينَ', words:[
    {ar:'قَالُوا', tr:'qālū', en:'they said', freq:528},
    {ar:'يَا وَيْلَنَا', tr:'yā waylanā', en:'O woe to us', freq:5},
    {ar:'إِنَّا', tr:'innā', en:'indeed we', freq:112},
    {ar:'كُنَّا', tr:'kunnā', en:'have been', freq:60},
    {ar:'طَاغِينَ', tr:'ṭāghīn', en:'transgressors', freq:5},
  ]},
  {label:'68:32 — عَسَىٰ رَبُّنَا أَن يُبْدِلَنَا خَيْرًا مِّنْهَا إِنَّا إِلَىٰ رَبِّنَا رَاغِبُونَ', words:[
    {ar:'عَسَىٰ', tr:'ʿasā', en:'perhaps', freq:30},
    {ar:'رَبُّنَا', tr:'rabbunā', en:'our Lord', freq:60},
    {ar:'أَن يُبْدِلَنَا', tr:'an yubdilanā', en:'will give us in exchange', freq:3},
    {ar:'خَيْرًا', tr:'khayran', en:'better', freq:100},
    {ar:'مِّنْهَا', tr:'minhā', en:'than it', freq:50},
    {ar:'إِنَّا', tr:'innā', en:'indeed we', freq:112},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:742},
    {ar:'رَبِّنَا', tr:'rabbinā', en:'our Lord', freq:60},
    {ar:'رَاغِبُونَ', tr:'rāghibūn', en:'full of desire', freq:1},
  ]},
  {label:'68:33 — كَذَٰلِكَ الْعَذَابُ وَلَعَذَابُ الْآخِرَةِ أَكْبَرُ لَوْ كَانُوا يَعْلَمُونَ', words:[
    {ar:'كَذَٰلِكَ', tr:'kadhālika', en:'such is', freq:100},
    {ar:'الْعَذَابُ', tr:'al-ʿadhāb', en:'the punishment', freq:230},
    {ar:'وَلَعَذَابُ', tr:'wa-la-ʿadhābu', en:'but the punishment of', freq:5},
    {ar:'الْآخِرَةِ', tr:'al-ākhirah', en:'the Hereafter', freq:115},
    {ar:'أَكْبَرُ', tr:'akbar', en:'is greater', freq:40},
    {ar:'لَوْ', tr:'law', en:'if only', freq:147},
    {ar:'كَانُوا', tr:'kānū', en:'they', freq:226},
    {ar:'يَعْلَمُونَ', tr:'yaʿlamūn', en:'knew', freq:75},
  ]},
  {label:'68:34 — إِنَّ لِلْمُتَّقِينَ عِندَ رَبِّهِمْ جَنَّاتِ النَّعِيمِ', words:[
    {ar:'إِنَّ', tr:'inna', en:'indeed', freq:743},
    {ar:'لِلْمُتَّقِينَ', tr:'lil-muttaqīn', en:'for the righteous', freq:20},
    {ar:'عِندَ', tr:'ʿinda', en:'with', freq:200},
    {ar:'رَبِّهِمْ', tr:'rabbihim', en:'their Lord', freq:60},
    {ar:'جَنَّاتِ', tr:'jannāt', en:'are gardens of', freq:40},
    {ar:'النَّعِيمِ', tr:'an-naʿīm', en:'pleasure', freq:13},
  ]},
  {label:'68:35 — أَفَنَجْعَلُ الْمُسْلِمِينَ كَالْمُجْرِمِينَ', words:[
    {ar:'أَفَنَجْعَلُ', tr:'afanajʿalu', en:'shall We then treat', freq:1},
    {ar:'الْمُسْلِمِينَ', tr:'al-muslimīn', en:'the Muslims', freq:21},
    {ar:'كَالْمُجْرِمِينَ', tr:'kal-mujrimīn', en:'like the criminals', freq:10},
  ]},
  {label:'68:36 — مَا لَكُمْ كَيْفَ تَحْكُمُونَ', words:[
    {ar:'مَا لَكُمْ', tr:'mā lakum', en:'what is wrong with you', freq:15},
    {ar:'كَيْفَ', tr:'kayfa', en:'how', freq:83},
    {ar:'تَحْكُمُونَ', tr:'taḥkumūn', en:'do you judge', freq:7},
  ]},
  {label:'68:37 — أَمْ لَكُمْ كِتَابٌ فِيهِ تَدْرُسُونَ', words:[
    {ar:'أَمْ', tr:'am', en:'or', freq:120},
    {ar:'لَكُمْ', tr:'lakum', en:'do you have', freq:200},
    {ar:'كِتَابٌ', tr:'kitābun', en:'a scripture', freq:230},
    {ar:'فِيهِ', tr:'fīhi', en:'in which', freq:100},
    {ar:'تَدْرُسُونَ', tr:'tadrusūn', en:'you study', freq:3},
  ]},
  {label:'68:38 — إِنَّ لَكُمْ فِيهِ لَمَا تَخَيَّرُونَ', words:[
    {ar:'إِنَّ', tr:'inna', en:'that indeed', freq:743},
    {ar:'لَكُمْ', tr:'lakum', en:'for you is', freq:200},
    {ar:'فِيهِ', tr:'fīhi', en:'therein', freq:100},
    {ar:'لَمَا', tr:'lamā', en:'whatever', freq:30},
    {ar:'تَخَيَّرُونَ', tr:'takhayyarūn', en:'you choose', freq:1},
  ]},
  {label:'68:39 — أَمْ لَكُمْ أَيْمَانٌ عَلَيْنَا بَالِغَةٌ إِلَىٰ يَوْمِ الْقِيَامَةِ إِنَّ لَكُمْ لَمَا تَحْكُمُونَ', words:[
    {ar:'أَمْ', tr:'am', en:'or', freq:120},
    {ar:'أَيْمَانٌ', tr:'aymānun', en:'oaths', freq:10},
    {ar:'عَلَيْنَا', tr:'ʿalaynā', en:'binding upon Us', freq:50},
    {ar:'بَالِغَةٌ', tr:'bālighatun', en:'extending', freq:3},
    {ar:'إِلَىٰ يَوْمِ', tr:'ilā yawmi', en:'until the Day of', freq:20},
    {ar:'الْقِيَامَةِ', tr:'al-qiyāmah', en:'Resurrection', freq:70},
    {ar:'لَمَا تَحْكُمُونَ', tr:'lamā taḥkumūn', en:'what you decide', freq:3},
  ]},
  {label:'68:40 — سَلْهُمْ أَيُّهُم بِذَٰلِكَ زَعِيمٌ', words:[
    {ar:'سَلْهُمْ', tr:'salhum', en:'ask them', freq:3},
    {ar:'أَيُّهُم', tr:'ayyuhum', en:'which of them', freq:5},
    {ar:'بِذَٰلِكَ', tr:'bi-dhālika', en:'for that', freq:50},
    {ar:'زَعِيمٌ', tr:'zaʿīm', en:'is a guarantor', freq:2},
  ]},
  {label:'68:41 — أَمْ لَهُمْ شُرَكَاءُ فَلْيَأْتُوا بِشُرَكَائِهِمْ إِن كَانُوا صَادِقِينَ', words:[
    {ar:'أَمْ', tr:'am', en:'or', freq:120},
    {ar:'لَهُمْ', tr:'lahum', en:'do they have', freq:250},
    {ar:'شُرَكَاءُ', tr:'shurakāʾu', en:'partners', freq:13},
    {ar:'فَلْيَأْتُوا', tr:'fal-yaʾtū', en:'then let them bring', freq:5},
    {ar:'بِشُرَكَائِهِمْ', tr:'bi-shurakāʾihim', en:'their partners', freq:3},
    {ar:'إِن كَانُوا', tr:'in kānū', en:'if they are', freq:50},
    {ar:'صَادِقِينَ', tr:'ṣādiqīn', en:'truthful', freq:14},
  ]},
  {label:'68:42 — يَوْمَ يُكْشَفُ عَن سَاقٍ وَيُدْعَوْنَ إِلَى السُّجُودِ فَلَا يَسْتَطِيعُونَ', words:[
    {ar:'يَوْمَ', tr:'yawma', en:'the Day', freq:365},
    {ar:'يُكْشَفُ', tr:'yukshafu', en:'it is laid bare', freq:2},
    {ar:'عَن سَاقٍ', tr:'ʿan sāqin', en:'the shin / severity', freq:1},
    {ar:'وَيُدْعَوْنَ', tr:'wa-yudʿawna', en:'and they are invited', freq:5},
    {ar:'إِلَى', tr:'ilā', en:'to', freq:742},
    {ar:'السُّجُودِ', tr:'as-sujūd', en:'prostration', freq:12},
    {ar:'فَلَا', tr:'fa-lā', en:'but not', freq:100},
    {ar:'يَسْتَطِيعُونَ', tr:'yastaṭīʿūn', en:'will they be able', freq:10},
  ]},
  {label:'68:43 — خَاشِعَةً أَبْصَارُهُمْ تَرْهَقُهُمْ ذِلَّةٌ وَقَدْ كَانُوا يُدْعَوْنَ إِلَى السُّجُودِ وَهُمْ سَالِمُونَ', words:[
    {ar:'خَاشِعَةً', tr:'khāshiʿatan', en:'humbled', freq:5},
    {ar:'أَبْصَارُهُمْ', tr:'abṣāruhum', en:'will be their eyes', freq:10},
    {ar:'تَرْهَقُهُمْ', tr:'tarhaquhum', en:'covering them', freq:3},
    {ar:'ذِلَّةٌ', tr:'dhillatun', en:'humiliation', freq:5},
    {ar:'وَقَدْ', tr:'wa-qad', en:'and they had', freq:50},
    {ar:'كَانُوا', tr:'kānū', en:'been', freq:226},
    {ar:'يُدْعَوْنَ', tr:'yudʿawna', en:'invited', freq:5},
    {ar:'إِلَى السُّجُودِ', tr:'ilas-sujūd', en:'to prostrate', freq:12},
    {ar:'وَهُمْ', tr:'wa-hum', en:'while they were', freq:100},
    {ar:'سَالِمُونَ', tr:'sālimūn', en:'sound / healthy', freq:1},
  ]},
  {label:'68:44 — فَذَرْنِي وَمَن يُكَذِّبُ بِهَٰذَا الْحَدِيثِ سَنَسْتَدْرِجُهُم مِّنْ حَيْثُ لَا يَعْلَمُونَ', words:[
    {ar:'فَذَرْنِي', tr:'fa-dharnī', en:'so leave Me', freq:2},
    {ar:'وَمَن', tr:'wa-man', en:'and whoever', freq:100},
    {ar:'يُكَذِّبُ', tr:'yukadhdhibu', en:'denies', freq:15},
    {ar:'بِهَٰذَا', tr:'bi-hādhā', en:'this', freq:30},
    {ar:'الْحَدِيثِ', tr:'al-ḥadīth', en:'statement', freq:20},
    {ar:'سَنَسْتَدْرِجُهُم', tr:'sanastadrijuhum', en:'We will lead them on', freq:2},
    {ar:'مِّنْ حَيْثُ', tr:'min ḥaythu', en:'from where', freq:20},
    {ar:'لَا يَعْلَمُونَ', tr:'lā yaʿlamūn', en:'they do not know', freq:75},
  ]},
  {label:'68:45 — وَأُمْلِي لَهُمْ إِنَّ كَيْدِي مَتِينٌ', words:[
    {ar:'وَأُمْلِي', tr:'wa-umlī', en:'and I will give respite', freq:2},
    {ar:'لَهُمْ', tr:'lahum', en:'to them', freq:250},
    {ar:'إِنَّ', tr:'inna', en:'indeed', freq:743},
    {ar:'كَيْدِي', tr:'kaydī', en:'My plan', freq:5},
    {ar:'مَتِينٌ', tr:'matīn', en:'is firm', freq:3},
  ]},
  {label:'68:46 — أَمْ تَسْأَلُهُمْ أَجْرًا فَهُم مِّن مَّغْرَمٍ مُّثْقَلُونَ', words:[
    {ar:'أَمْ', tr:'am', en:'or', freq:120},
    {ar:'تَسْأَلُهُمْ', tr:'tasʾaluhum', en:'do you ask them', freq:5},
    {ar:'أَجْرًا', tr:'ajran', en:'a payment', freq:50},
    {ar:'فَهُم', tr:'fa-hum', en:'so they are', freq:30},
    {ar:'مِّن مَّغْرَمٍ', tr:'min maghram', en:'by debt', freq:2},
    {ar:'مُّثْقَلُونَ', tr:'muthqalūn', en:'burdened', freq:1},
  ]},
  {label:'68:47 — أَمْ عِندَهُمُ الْغَيْبُ فَهُمْ يَكْتُبُونَ', words:[
    {ar:'أَمْ', tr:'am', en:'or', freq:120},
    {ar:'عِندَهُمُ', tr:'ʿindahum', en:'do they have', freq:30},
    {ar:'الْغَيْبُ', tr:'al-ghayb', en:'the unseen', freq:50},
    {ar:'فَهُمْ', tr:'fa-hum', en:'and so they', freq:30},
    {ar:'يَكْتُبُونَ', tr:'yaktubūn', en:'write', freq:10},
  ]},
  {label:'68:48 — فَاصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تَكُن كَصَاحِبِ الْحُوتِ إِذْ نَادَىٰ وَهُوَ مَكْظُومٌ', words:[
    {ar:'فَاصْبِرْ', tr:'fa-ṣbir', en:'so be patient', freq:10},
    {ar:'لِحُكْمِ', tr:'li-ḥukmi', en:'for the decision of', freq:8},
    {ar:'رَبِّكَ', tr:'rabbika', en:'your Lord', freq:49},
    {ar:'وَلَا تَكُن', tr:'wa-lā takun', en:'and do not be', freq:20},
    {ar:'كَصَاحِبِ', tr:'ka-ṣāḥibi', en:'like the companion of', freq:3},
    {ar:'الْحُوتِ', tr:'al-ḥūt', en:'the whale', freq:3},
    {ar:'إِذْ', tr:'idh', en:'when', freq:200},
    {ar:'نَادَىٰ', tr:'nādā', en:'he called out', freq:20},
    {ar:'وَهُوَ', tr:'wa-huwa', en:'while he was', freq:250},
    {ar:'مَكْظُومٌ', tr:'makẓūm', en:'distressed', freq:1},
  ]},
  {label:'68:49 — لَّوْلَا أَن تَدَارَكَهُ نِعْمَةٌ مِّن رَّبِّهِ لَنُبِذَ بِالْعَرَاءِ وَهُوَ مَذْمُومٌ', words:[
    {ar:'لَّوْلَا', tr:'lawlā', en:'had not', freq:30},
    {ar:'أَن تَدَارَكَهُ', tr:'an tadārakahu', en:'overtaken him', freq:1},
    {ar:'نِعْمَةٌ', tr:'niʿmatun', en:'a favor', freq:30},
    {ar:'مِّن رَّبِّهِ', tr:'min rabbihi', en:'from his Lord', freq:30},
    {ar:'لَنُبِذَ', tr:'la-nubidha', en:'he would have been cast', freq:1},
    {ar:'بِالْعَرَاءِ', tr:'bil-ʿarāʾ', en:'onto the bare shore', freq:2},
    {ar:'وَهُوَ', tr:'wa-huwa', en:'while he was', freq:250},
    {ar:'مَذْمُومٌ', tr:'madhmūm', en:'blamed', freq:1},
  ]},
  {label:'68:50 — فَاجْتَبَاهُ رَبُّهُ فَجَعَلَهُ مِنَ الصَّالِحِينَ', words:[
    {ar:'فَاجْتَبَاهُ', tr:'fa-jtabāhu', en:'so chose him', freq:3},
    {ar:'رَبُّهُ', tr:'rabbuhu', en:'his Lord', freq:20},
    {ar:'فَجَعَلَهُ', tr:'fa-jaʿalahu', en:'and made him', freq:10},
    {ar:'مِنَ', tr:'mina', en:'among', freq:1891},
    {ar:'الصَّالِحِينَ', tr:'aṣ-ṣāliḥīn', en:'the righteous', freq:22},
  ]},
  {label:'68:51 — وَإِن يَكَادُ الَّذِينَ كَفَرُوا لَيُزْلِقُونَكَ بِأَبْصَارِهِمْ لَمَّا سَمِعُوا الذِّكْرَ وَيَقُولُونَ إِنَّهُ لَمَجْنُونٌ', words:[
    {ar:'وَإِن', tr:'wa-in', en:'and indeed', freq:80},
    {ar:'يَكَادُ', tr:'yakādu', en:'would almost', freq:12},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1000},
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieved', freq:200},
    {ar:'لَيُزْلِقُونَكَ', tr:'la-yuzliqūnaka', en:'make you slip', freq:1},
    {ar:'بِأَبْصَارِهِمْ', tr:'bi-abṣārihim', en:'with their eyes', freq:3},
    {ar:'لَمَّا', tr:'lammā', en:'when', freq:70},
    {ar:'سَمِعُوا', tr:'samiʿū', en:'they heard', freq:20},
    {ar:'الذِّكْرَ', tr:'adh-dhikr', en:'the Reminder', freq:55},
    {ar:'وَيَقُولُونَ', tr:'wa-yaqūlūn', en:'and they say', freq:40},
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed he is', freq:100},
    {ar:'لَمَجْنُونٌ', tr:'la-majnūn', en:'surely mad', freq:6},
  ]},
  {label:'68:52 — وَمَا هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'and it is not', freq:200},
    {ar:'هُوَ', tr:'huwa', en:'it', freq:526},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:663},
    {ar:'ذِكْرٌ', tr:'dhikrun', en:'a reminder', freq:55},
    {ar:'لِّلْعَالَمِينَ', tr:'lil-ʿālamīn', en:'to all the worlds', freq:42},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#06101e':'#02080e', acc=st?'#f0c030':'#e0b020';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Stars
  if(n>=1){for(let i=0;i<30;i++){ctx.fillStyle=`rgba(200,220,255,${0.3+Math.random()*0.5})`;ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.6,1,0,Math.PI*2);ctx.fill();}}
  // Pen
  if(n>=1){ctx.fillStyle=acc;ctx.fillRect(W*0.1,H*0.15,6,50);ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(W*0.1,H*0.15+50);ctx.lineTo(W*0.1+3,H*0.15+62);ctx.lineTo(W*0.1+6,H*0.15+50);ctx.fill();}
  // Garden
  if(n>=2){ctx.fillStyle=n<3?'#1a4010':'#2a1000';ctx.fillRect(0,H*0.6,W,H*0.4);for(let i=0;i<6;i++){ctx.fillStyle=n<3?'#2a6020':'#402010';ctx.fillRect(W*0.05+i*W*0.16,H*0.4,W*0.1,H*0.25);}}
  // Figure
  if(n>=3){ctx.fillStyle='#c0a080';ctx.beginPath();ctx.arc(W*0.6,H*0.45,12,0,Math.PI*2);ctx.fill();ctx.fillRect(W*0.6-6,H*0.45+12,12,20);}
  // Complete
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=4?'AL-QALAM COMPLETE 🖊️':`Al-Qalam — ${n}/4 levels`,W/2,12);ctx.textAlign='left';
};
