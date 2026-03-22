'use strict';
/* Surah Al-Layl (92) — The Night */
window.STORAGE_KEY = 'laylQuestSave';
window.state = window.buildDefaultState(5);

const REWARDS = {
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:70, gems:3, icon:'🌙', title:'Night Witness',   msg:"SubhanAllah! Three oaths — night, day, creation of male and female — then one question: what is your striving FOR? The night covers everything; what does your heart hide?"},
  3:{xp:80, gems:3, icon:'💝', title:'Giver Recognised', msg:"MashAllah! The generous person gives, fears Allah, and believes in Al-Husna (the best). Allah smooths the way to ease for them. May we always give generously! Ameen."},
  4:{xp:90, gems:3, icon:'💔', title:'Miser Warned',    msg:"SubhanAllah! The miser thinks wealth can protect them forever. But on the Day of Judgement, wealth won't help. 'What will wealth avail him when he perishes?' A warning for us all!"},
  5:{xp:100, gems:4, icon:'🔥', title:'Al-Layl Complete', msg:"Allahu Akbar! Al-Layl complete! Two paths: the path of giving that leads to ease, and the path of stinginess that leads to difficulty. May Allah make us of the givers! Ameen 🏆"},
};

window.SURAH_CONFIG = {
  id:'s92', surahName:'Al-Layl', surahArabic:'الليل', totalLevels:5, wbwSection:1, rewards:REWARDS,
  tileIcons:['📖','🌙','💝','💔','🔥'],
  tileLabels:['Word by Word','The Oaths','Generous','The Miser','Two Paths'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Welcome to Surah Al-Layl — The Night! Allah swears by the night, the day, and the creation of male and female. Then He describes two opposite types: the generous giver and the stingy miser. Their destinies are completely different. 5 levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/5 levels done. The night awaits — keep striving! 🌙`,
    complete: name=>`MashAllah, ${name}! Al-Layl complete! "Inna alayna lal-huda — wa inna lana lal-akhira wal-ula." Guidance is from Allah. May we follow the path of ease! 🏆`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'92:1 — وَاللَّيْلِ إِذَا يَغْشَىٰ', words:[
    {ar:'يَغْشَىٰ', tr:'yaghshā', en:'it covers', freq:3},
    'idha',
    {ar:'وَاللَّيْلِ', tr:'wal-layl', en:'by the night', freq:72},
  ]},
  {label:'92:2 — وَالنَّهَارِ إِذَا تَجَلَّىٰ', words:[
    {ar:'تَجَلَّىٰ', tr:'tajallā', en:'it appears', freq:2},
    'idha',
    {ar:'وَالنَّهَارِ', tr:'wal-nahār', en:'and the day', freq:57},
  ]},
  {label:'92:3 — وَمَا خَلَقَ الذَّكَرَ وَالْأُنثَىٰ', words:[
    {ar:'وَالْأُنثَىٰ', tr:'wal-unthā', en:'and the female', freq:21},
    {ar:'الذَّكَرَ', tr:'al-dhakara', en:'the male', freq:18},
    {ar:'خَلَقَ', tr:'khalaqa', en:'He created', freq:29},
    {ar:'وَمَا', tr:'wa mā', en:'and what', freq:2005},
  ]},
  {label:'92:4 — إِنَّ سَعْيَكُمْ لَشَتَّىٰ', words:[
    {ar:'لَشَتَّىٰ', tr:'la-shattā', en:'surely diverse', freq:2},
    {ar:'سَعْيَكُمْ', tr:'saʿyakum', en:'your efforts', freq:2},
    'inna',
  ]},
  {label:'92:5 — فَأَمَّا مَنْ أَعْطَىٰ وَاتَّقَىٰ', words:[
    {ar:'وَاتَّقَىٰ', tr:'wattaqā', en:'and feared Allah', freq:64},
    {ar:'أَعْطَىٰ', tr:'aʿṭā', en:'gives', freq:10},
    'man',
    {ar:'فَأَمَّا', tr:'fa-ammā', en:'as for', freq:18},
  ]},
  {label:'92:6 — وَصَدَّقَ بِالْحُسْنَىٰ', words:[
    {ar:'بِالْحُسْنَىٰ', tr:'bil-ḥusnā', en:'in the best [reward]', freq:12},
    {ar:'وَصَدَّقَ', tr:'wa-ṣaddaqa', en:'and believed in', freq:20},
  ]},
  {label:'92:7 — فَسَنُيَسِّرُهُ لِلْيُسْرَىٰ', words:[
    {ar:'لِلْيُسْرَىٰ', tr:'lil-yusrā', en:'to ease', freq:5},
    {ar:'فَسَنُيَسِّرُهُ', tr:'fa-sanuyassiruhu', en:'We will ease him', freq:2},
  ]},
  {label:'92:8 — وَأَمَّا مَن بَخِلَ وَاسْتَغْنَىٰ', words:[
    {ar:'وَاسْتَغْنَىٰ', tr:'wastaghna', en:'and felt self-sufficient', freq:3},
    {ar:'بَخِلَ', tr:'bakhila', en:'withheld / was stingy', freq:5},
    'man',
    {ar:'وَأَمَّا', tr:'wa-ammā', en:'but as for', freq:18},
  ]},
  {label:'92:9 — وَكَذَّبَ بِالْحُسْنَىٰ', words:[
    {ar:'بِالْحُسْنَىٰ', tr:'bil-ḥusnā', en:'in the best [reward]', freq:12},
    {ar:'وَكَذَّبَ', tr:'wa-kadhdhaba', en:'and denied', freq:20},
  ]},
  {label:'92:10 — فَسَنُيَسِّرُهُ لِلْعُسْرَىٰ', words:[
    {ar:'لِلْعُسْرَىٰ', tr:'lil-ʿusrā', en:'to difficulty', freq:2},
    {ar:'فَسَنُيَسِّرُهُ', tr:'fa-sanuyassiruhu', en:'We will ease him', freq:2},
  ]},
  {label:'92:11 — وَمَا يُغْنِي عَنْهُ مَالُهُ إِذَا تَرَدَّىٰ', words:[
    {ar:'تَرَدَّىٰ', tr:'taraddā', en:'he falls / perishes', freq:1},
    'idha',
    {ar:'مَالُهُ', tr:'māluhu', en:'his wealth', freq:15},
    {ar:'عَنْهُ', tr:'ʿanhu', en:'from him', freq:122},
    {ar:'يُغْنِي', tr:'yughnī', en:'will avail', freq:7},
    {ar:'وَمَا', tr:'wa mā', en:'and not', freq:2005},
  ]},
  {label:'92:12 — إِنَّ عَلَيْنَا لَلْهُدَىٰ', words:[
    {ar:'لَلْهُدَىٰ', tr:'lal-hudā', en:'surely is guidance', freq:80},
    {ar:'عَلَيْنَا', tr:'ʿalaynā', en:'upon Us', freq:37},
    'inna',
  ]},
  {label:'92:13 — وَإِنَّ لَنَا لَلْآخِرَةَ وَالْأُولَىٰ', words:[
    {ar:'وَالْأُولَىٰ', tr:'wal-ūlā', en:'and the first [life]', freq:20},
    {ar:'لَلْآخِرَةَ', tr:'lal-ākhirah', en:'surely the Hereafter', freq:115},
    {ar:'لَنَا', tr:'lanā', en:'to Us belongs', freq:92},
    {ar:'وَإِنَّ', tr:'wa inna', en:'and indeed', freq:743},
  ]},
  {label:'92:14 — فَأَنذَرْتُكُمْ نَارًا تَلَظَّىٰ', words:[
    {ar:'تَلَظَّىٰ', tr:'talaẓẓā', en:'blazing', freq:1},
    {ar:'نَارًا', tr:'nāran', en:'a Fire', freq:145},
    {ar:'فَأَنذَرْتُكُمْ', tr:'fa-andhartukum', en:'so I have warned you', freq:1},
  ]},
  {label:'92:15 — لَا يَصْلَاهَا إِلَّا الْأَشْقَى', words:[
    {ar:'الْأَشْقَى', tr:'al-ashqā', en:'the most wretched', freq:1},
    'illa',
    {ar:'يَصْلَاهَا', tr:'yaṣlāhā', en:'will burn in it', freq:3},
    'la',
  ]},
  {label:'92:16 — الَّذِي كَذَّبَ وَتَوَلَّىٰ', words:[
    {ar:'وَتَوَلَّىٰ', tr:'wa tawallā', en:'and turned away', freq:12},
    {ar:'كَذَّبَ', tr:'kadhdhaba', en:'denied', freq:79},
    'alladhi',
  ]},
  {label:'92:17 — وَسَيُجَنَّبُهَا الْأَتْقَى', words:[
    {ar:'الْأَتْقَى', tr:'al-atqā', en:'the most righteous', freq:1},
    {ar:'وَسَيُجَنَّبُهَا', tr:'wa sa-yujannabuhā', en:'will be kept away from it', freq:1},
  ]},
  {label:'92:18 — الَّذِي يُؤْتِي مَالَهُ يَتَزَكَّىٰ', words:[
    {ar:'يَتَزَكَّىٰ', tr:'yatazakkā', en:'to purify himself', freq:2},
    {ar:'مَالَهُ', tr:'mālahu', en:'his wealth', freq:15},
    {ar:'يُؤْتِي', tr:'yuʾtī', en:'who gives', freq:34},
    'alladhi',
  ]},
  {label:'92:19 — وَمَا لِأَحَدٍ عِندَهُ مِن نِّعْمَةٍ تُجْزَىٰ', words:[
    {ar:'تُجْزَىٰ', tr:'tujzā', en:'to be repaid', freq:1},
    {ar:'نِّعْمَةٍ', tr:'niʿmatin', en:'a favour', freq:34},
    'min',
    {ar:'عِندَهُ', tr:'ʿindahu', en:'with him', freq:52},
    {ar:'لِأَحَدٍ', tr:'li-aḥadin', en:'for anyone', freq:86},
    {ar:'وَمَا', tr:'wa mā', en:'and not', freq:2005},
  ]},
  {label:'92:20 — إِلَّا ابْتِغَاءَ وَجْهِ رَبِّهِ الْأَعْلَىٰ', words:[
    {ar:'الْأَعْلَىٰ', tr:'al-aʿlā', en:'the Most High', freq:2},
    {ar:'رَبِّهِ', tr:'rabbihi', en:'his Lord', freq:49},
    {ar:'وَجْهِ', tr:'wajhi', en:'the face of', freq:72},
    {ar:'ابْتِغَاءَ', tr:'ibtighāʾa', en:'seeking', freq:5},
    'illa',
  ]},
  {label:'92:21 — وَلَسَوْفَ يَرْضَىٰ', words:[
    {ar:'يَرْضَىٰ', tr:'yarḍā', en:'he will be satisfied', freq:3},
    {ar:'وَلَسَوْفَ', tr:'wa la-sawfa', en:'and surely he will', freq:1},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  {q:'What are the three oaths in Surah Al-Layl?',
   opts:['Sun, moon, and stars','Night, day, and creation of male and female','Sky, earth, and mountains','Sea, wind, and rain'],
   correct:1},
  {q:'What does "wa ma khalaqa" in 92:3 refer to?',
   opts:['What Allah created of rivers','The creation of male and female','The mountains and valleys','The angels and jinn'],
   correct:1},
  {q:'What is the question Allah asks after the three oaths (92:4)?',
   opts:['What do you believe in?','What have you eaten?','What are you striving for?','What have you memorised?'],
   correct:2},
  {q:'What does "shatta" (92:4) mean when describing human strivings?',
   opts:['Very fast','Completely united','Scattered and varied','Slow and steady'],
   correct:2},
];

const S2_ITEMS = [
  {id:'g1', text:'أَعْطَىٰ',  zone:'z1'},
  {id:'g2', text:'وَاتَّقَىٰ', zone:'z2'},
  {id:'g3', text:'وَصَدَّقَ\nبِالْحُسْنَىٰ', zone:'z3'},
];
const S2_ZONES = [
  {id:'z1', desc:'gives — he gives freely in charity (92:5)'},
  {id:'z2', desc:'and feared Allah — taqwa, consciousness of Allah (92:5)'},
  {id:'z3', desc:'and believed in the best [reward] — confirms Al-Husna (92:6)'},
];

const S3_QUIZ = [
  {q:'What does Allah promise for the generous person who has taqwa? (92:7)',
   opts:['Much wealth and children','Ease in this life and next','Yusra — ease and facilitation','Long life and health'],
   correct:2},
  {q:'What does the miser think his wealth will do for him? (92:11)',
   opts:['Build him a palace','Nothing — he never thinks of wealth','Make him immortal / last forever','Buy him good deeds'],
   correct:2},
  {q:'What does Allah promise for the miser who denies Al-Husna? (92:10)',
   opts:['Forgiveness if he repents','He will lose all wealth','Usra — difficulty will be eased for them','Usra — We shall ease his way to difficulty'],
   correct:3},
  {q:'Who is the "self-sufficient" person mentioned in 92:8?',
   opts:['One who has memorised Quran','One who is physically strong','One who considers himself free of need (of Allah)','One who has many children'],
   correct:2},
];

const S5_FIB = [
  {verse:'فَأَمَّا مَنْ أَعْطَىٰ وَ_____', opts:['اتَّقَىٰ','صَبَرَ','شَكَرَ','آمَنَ'], correct:0, ref:'92:5', translation:'As for he who gives and fears Allah'},
  {verse:'وَصَدَّقَ بِ_____', opts:['الْحُسْنَىٰ','الْجَنَّةِ','الْآخِرَةِ','الرَّحْمَةِ'], correct:0, ref:'92:6', translation:'And believed in the best reward'},
  {verse:'فَسَنُيَسِّرُهُ _____', opts:['لِلْيُسْرَىٰ','لِلْعُسْرَىٰ','لِلْجَنَّةِ','لِلْهُدَىٰ'], correct:0, ref:'92:7', translation:'We will ease him to the path of ease'},
  {verse:'وَأَمَّا مَن _____ وَاسْتَغْنَىٰ', opts:['بَخِلَ','كَفَرَ','أَعْرَضَ','ظَلَمَ'], correct:0, ref:'92:8', translation:'But as for he who withheld and felt self-sufficient'},
  {verse:'فَأَنذَرْتُكُمْ نَارًا _____', opts:['تَلَظَّىٰ','حَامِيَةً','مُسَعَّرَةً','مُؤْصَدَةً'], correct:0, ref:'92:14', translation:'So I have warned you of a blazing Fire'},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerQuiz(2, S1_QUIZ);
window.registerMatch(3, S2_ITEMS,S2_ZONES);
window.registerQuiz(4, S3_QUIZ);
window.registerFillBlank(5, S5_FIB);

function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#0c0828':'#04020e', acc=st?'#e8d060':'#c0a820';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){const sx=(i*3917)%W,sy=(i*2713)%(H*0.8);const br=n>=1?0.7:0.3;ctx.fillStyle=`rgba(200,180,255,${br*(0.3+((i*7)%10)*0.05)})`;ctx.fillRect(sx,sy,1+i%2,1+i%2);}
  if(n>=2){ctx.fillStyle=st?'#f0e0ff':'#e8d060';ctx.beginPath();ctx.arc(W*0.8,30,14,0,Math.PI*2);ctx.fill();}
  if(n>=3){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('💝',W*0.3,90);ctx.fillText('💔',W*0.7,90);ctx.textAlign='left';}
  if(n>=4){ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('AL-LAYL COMPLETE! 🌙',W/2,14);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Al-Layl — ${n}/5 levels`,W/2,14);ctx.textAlign='left';}
};
