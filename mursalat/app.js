'use strict';
/* Surah Al-Mursalat (77) — The Emissaries */
window.STORAGE_KEY = 'mursalatQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
  s5Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'💨', title:'Five Wind Oaths',       msg:"SubhanAllah! Allah swears by five groups of things sent forth — the winds, their order, their spreading, their separating, and their delivering of the reminder. Everything in the cosmos has a mission. And the refrain begins: 'Waylun yawma\'idhin lil-mukadhdhbeen' — Woe that Day to the deniers!"},
  2:{xp:80, gems:3, icon:'📅', title:'Day of Sorting',        msg:"Allahu Akbar! The surah now describes the Day of Sorting (Yawm al-Fasl) — when it was appointed — when the stars are extinguished — when the mountains are blown away — when the messengers were gathered. 'Li ayyi yawmin ujjilat? Li-yawm al-fasl!' For what Day was it delayed? The Day of Sorting!"},
  3:{xp:85, gems:3, icon:'🌊', title:'Destroyed Nations',     msg:"MashAllah! Allah recalls the destroyed nations: Did We not destroy the earlier peoples? Will We follow them with the later ones? 'Alam nuhlik al-awwaleen?' Then asks rhetorically — have We not created them in a fixed proportion? MashAllah, it is all planned and proportioned by the All-Knowing!"},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Mursalat Complete!', msg:"ALLAHUMMA BARIK! Al-Mursalat complete! The refrain 'Woe that Day to the deniers' appears TEN TIMES — a rhythmic warning that never lets the listener rest. Eat and enjoy — the deniers say. But woe to them! May we never be among the deniers. Ameen! Wa billahi tawfeeq!"},
  5:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Al-Mursalat word by word!'},
};

window.SURAH_CONFIG = {
  id:'s77', surahName:'Al-Mursalat', surahArabic:'المرسلات', totalLevels:5, wbwSection:5, rewards:REWARDS,
  tileIcons:['💨','📅','🌊','✨'],
  tileLabels:['Five Oaths','Day of Sorting','Nations','Refrain'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Mursalat — The Emissaries! Five oath-groups. The Day of Sorting. Destroyed nations. And the stunning refrain — "Woe to the deniers!" — said 10 times! 4 powerful levels!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. The refrain echoes — woe to the deniers! 💨`,
    complete: name=>`MashAllah, ${name}! Al-Mursalat complete! 10 times: woe to the deniers — may we never be among them! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "wal-mursalati \'urfa" (77:1) refer to according to scholars?',
   opts:['The prophets sent one after another throughout history','The winds sent forth one after the other gracefully','The angels sent down with glad tidings and warnings','The verses of Quran delivered in beautiful order'],
   correct:1},
  {q:'How many times does the refrain "Waylun yawma\'idhin lil-mukadhdhbeen" appear?',
   opts:['Five times in total','Seven times throughout','Ten times — a powerful repeating refrain','Twelve times from beginning to end'],
   correct:2},
  {q:'What does "waylun yawma\'idhin lil-mukadhdhbeen" mean?',
   opts:['Victory that Day to the believers in Allah','Woe that Day to the deniers of truth','Mercy that Day to all the repentant ones','Warning that Day to the ungrateful servants'],
   correct:1},
  {q:'What does Allah say was appointed in 77:11-12 for "what day"?',
   opts:['For the Day of Hajj and great gathering','For what day were the messengers gathered? The Day of Sorting!','For the Day when every soul returns to its Lord','For the night that is better than a thousand months'],
   correct:1},
];

const S2_ITEMS = [
  {id:'d1', text:'⭐ Stars are\nextinguished',          zone:'z1'},
  {id:'d2', text:'🏔️ Mountains are\nblown away',        zone:'z2'},
  {id:'d3', text:'📩 Messengers are\ngathered together', zone:'z3'},
  {id:'d4', text:'📅 The Day of\nSorting arrives',       zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"Wa idha al-nujumu tumisat" — when the stars are extinguished (77:8) — cosmic signs of the Hour'},
  {id:'z2', desc:'"Wa idha al-jibalu nusifat" — when the mountains are blown away to dust (77:10)'},
  {id:'z3', desc:'"Wa idha al-rusulu uqqitat" — when the messengers\' appointed time arrives (77:11)'},
  {id:'z4', desc:'"Li-yawm al-fasl" — for the Day of Sorting and Deciding (77:13) — all gathered for judgment'},
];

const S3_QUIZ = [
  {q:'What rhetorical question does Allah ask in 77:16?',
   opts:['Did We not create the heavens and the earth?','Did We not destroy the earlier peoples — Alam nuhlik al-awwaleen?','Did We not send messengers to every nation on earth?','Did We not warn them before the punishment came?'],
   correct:1},
  {q:'What does "alam najal al-ardha kifatan? Ahya\'an wa amwatan" (77:25-26) describe?',
   opts:['The earth as our provider of all food and water','The earth as a container — for the living and the dead','The earth that opens up to receive the rainfall','The earth that holds mountains to keep it stable'],
   correct:1},
  {q:'What are the deniers told to "eat and enjoy" but only for a little while (77:46)?',
   opts:['Eat from the gardens of this world temporarily','Eat and enjoy — for a little while — the deniers are warned','Enjoy the pleasures before the accounting comes','Eat what is halal now before the day of reckoning'],
   correct:1},
  {q:'What does the surah invite in its final verse 77:50?',
   opts:['So believe in Allah before the Day arrives','In what speech after this will they believe?','So submit to Allah and earn His beautiful reward','Recite the Quran and ponder its magnificent verses'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'w1', text:'💨 Five oaths by the winds/emissaries sent successively (77:1-5)'},
  {id:'w2', text:'📅 Stars extinguished, mountains blown, messengers gathered — Day of Sorting (77:8-13)'},
  {id:'w3', text:'🌊 Destroyed nations recalled: "Did We not destroy the earlier peoples?" (77:16)'},
  {id:'w4', text:'💧 Allah recalls: We created you from water (77:20) — still you deny!'},
  {id:'w5', text:'🌿 Earth as container for living and dead — designed and measured (77:25-28)'},
  {id:'w6', text:'🔟 Refrain sounds 10 times — "Woe that Day to the deniers!" (throughout)'},
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
  const sky=st?'#0c0818':'#060410', acc=st?'#40d0c0':'#28b8a8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// Wind streaks
    for(let i=0;i<12;i++){ctx.strokeStyle=`rgba(64,208,192,${0.2+Math.random()*0.3})`;ctx.lineWidth=2;ctx.beginPath();const y=Math.random()*H;ctx.moveTo(0,y);ctx.lineTo(W,y+Math.random()*40-20);ctx.stroke();}}
  if(n>=2){// Stars extinguishing
    for(let i=0;i<15;i++){ctx.fillStyle=`rgba(200,200,255,${Math.random()*0.4})`;ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*0.5,1.5,0,Math.PI*2);ctx.fill();}}
  if(n>=3){// Earth layer
    ctx.fillStyle=st?'#1a2818':'#0e1a0c';ctx.fillRect(0,H*0.65,W,H*0.35);}
  ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText(n>=5?'AL-MURSALAT COMPLETE 💨':`Al-Mursalat — ${n}/5 levels`,W/2,12);ctx.textAlign='left';
};

var WBW_DATA = [
  {label:'77:1 — وَالْمُرْسَلَاتِ عُرْفًا', words:[
    {ar:'وَالْمُرْسَلَاتِ', tr:'wal-mursalāti', en:'By those sent forth', freq:1},
    {ar:'عُرْفًا', tr:'ʿurfan', en:'one after another', freq:1},
  ]},
  {label:'77:2 — فَالْعَاصِفَاتِ عَصْفًا', words:[
    {ar:'فَالْعَاصِفَاتِ', tr:'fal-ʿāṣifāti', en:'And the winds blowing', freq:1},
    {ar:'عَصْفًا', tr:'ʿaṣfan', en:'violently', freq:2},
  ]},
  {label:'77:3 — وَالنَّاشِرَاتِ نَشْرًا', words:[
    {ar:'وَالنَّاشِرَاتِ', tr:'wan-nāshirāti', en:'And those spreading', freq:1},
    {ar:'نَشْرًا', tr:'nashran', en:'widely', freq:1},
  ]},
  {label:'77:4 — فَالْفَارِقَاتِ فَرْقًا', words:[
    {ar:'فَالْفَارِقَاتِ', tr:'fal-fāriqāti', en:'And those separating', freq:1},
    {ar:'فَرْقًا', tr:'farqan', en:'with distinction', freq:2},
  ]},
  {label:'77:5 — فَالْمُلْقِيَاتِ ذِكْرًا', words:[
    {ar:'فَالْمُلْقِيَاتِ', tr:'fal-mulqiyāti', en:'And those delivering', freq:1},
    {ar:'ذِكْرًا', tr:'dhikran', en:'a reminder', freq:60},
  ]},
  {label:'77:6 — عُذْرًا أَوْ نُذْرًا', words:[
    {ar:'عُذْرًا', tr:'ʿudhran', en:'As justification', freq:2},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
    {ar:'نُذْرًا', tr:'nudhran', en:'warning', freq:3},
  ]},
  {label:'77:7 — إِنَّمَا تُوعَدُونَ لَوَاقِعٌ', words:[
    {ar:'إِنَّمَا', tr:'innamā', en:'Indeed what', freq:110},
    {ar:'تُوعَدُونَ', tr:'tūʿadūna', en:'you are promised', freq:5},
    {ar:'لَوَاقِعٌ', tr:'la-wāqiʿun', en:'will surely occur', freq:2},
  ]},
  {label:'77:8 — فَإِذَا النُّجُومُ طُمِسَتْ', words:[
    {ar:'فَإِذَا', tr:'fa-idhā', en:'So when', freq:80},
    {ar:'النُّجُومُ', tr:'an-nujūmu', en:'the stars', freq:10},
    {ar:'طُمِسَتْ', tr:'ṭumisat', en:'are obliterated', freq:1},
  ]},
  {label:'77:9 — وَإِذَا السَّمَاءُ فُرِجَتْ', words:[
    {ar:'وَإِذَا', tr:'wa-idhā', en:'And when', freq:409},
    {ar:'السَّمَاءُ', tr:'as-samāʾu', en:'the sky', freq:120},
    {ar:'فُرِجَتْ', tr:'furijat', en:'is split open', freq:1},
  ]},
  {label:'77:10 — وَإِذَا الْجِبَالُ نُسِفَتْ', words:[
    {ar:'وَإِذَا', tr:'wa-idhā', en:'And when', freq:409},
    {ar:'الْجِبَالُ', tr:'al-jibālu', en:'the mountains', freq:30},
    {ar:'نُسِفَتْ', tr:'nusifat', en:'are blown away', freq:1},
  ]},
  {label:'77:11 — وَإِذَا الرُّسُلُ أُقِّتَتْ', words:[
    {ar:'وَإِذَا', tr:'wa-idhā', en:'And when', freq:409},
    {ar:'الرُّسُلُ', tr:'ar-rusulu', en:'the messengers', freq:80},
    {ar:'أُقِّتَتْ', tr:'uqqitat', en:'are given their time', freq:1},
  ]},
  {label:'77:12 — لِأَيِّ يَوْمٍ أُجِّلَتْ', words:[
    {ar:'لِأَيِّ', tr:'li-ayyi', en:'For what Day', freq:3},
    {ar:'يَوْمٍ', tr:'yawmin', en:'Day', freq:365},
    {ar:'أُجِّلَتْ', tr:'ujjilat', en:'were they postponed', freq:1},
  ]},
  {label:'77:13 — لِيَوْمِ الْفَصْلِ', words:[
    {ar:'لِيَوْمِ', tr:'li-yawmi', en:'For the Day of', freq:15},
    {ar:'الْفَصْلِ', tr:'al-faṣli', en:'Sorting', freq:5},
  ]},
  {label:'77:14 — وَمَا أَدْرَاكَ مَا يَوْمُ الْفَصْلِ', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'And what', freq:2000},
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'can make you know', freq:13},
    {ar:'مَا', tr:'mā', en:'what', freq:2000},
    {ar:'يَوْمُ', tr:'yawmu', en:'the Day of', freq:365},
    {ar:'الْفَصْلِ', tr:'al-faṣli', en:'Sorting is', freq:5},
  ]},
  {label:'77:15 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:16 — أَلَمْ نُهْلِكِ الْأَوَّلِينَ', words:[
    {ar:'أَلَمْ', tr:'a-lam', en:'Did We not', freq:100},
    {ar:'نُهْلِكِ', tr:'nuhliki', en:'destroy', freq:5},
    {ar:'الْأَوَّلِينَ', tr:'al-awwalīna', en:'the former peoples', freq:22},
  ]},
  {label:'77:17 — ثُمَّ نُتْبِعُهُمُ الْآخِرِينَ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'نُتْبِعُهُمُ', tr:'nutbiʿuhumu', en:'We follow them', freq:1},
    {ar:'الْآخِرِينَ', tr:'al-ākhirīna', en:'with the later ones', freq:22},
  ]},
  {label:'77:18 — كَذَٰلِكَ نَفْعَلُ بِالْمُجْرِمِينَ', words:[
    {ar:'كَذَٰلِكَ', tr:'kadhālika', en:'Thus', freq:80},
    {ar:'نَفْعَلُ', tr:'nafʿalu', en:'We deal', freq:3},
    {ar:'بِالْمُجْرِمِينَ', tr:'bil-mujrimīna', en:'with the criminals', freq:42},
  ]},
  {label:'77:19 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:20 — أَلَمْ نَخْلُقكُّم مِّن مَّاءٍ مَّهِينٍ', words:[
    {ar:'أَلَمْ', tr:'a-lam', en:'Did We not', freq:100},
    {ar:'نَخْلُقكُّم', tr:'nakhluqkum', en:'create you', freq:2},
    {ar:'مِّن', tr:'min', en:'from', freq:3000},
    {ar:'مَّاءٍ', tr:'māʾin', en:'a fluid', freq:40},
    {ar:'مَّهِينٍ', tr:'mahīnin', en:'despised', freq:3},
  ]},
  {label:'77:21 — فَجَعَلْنَاهُ فِي قَرَارٍ مَّكِينٍ', words:[
    {ar:'فَجَعَلْنَاهُ', tr:'fa-jaʿalnāhu', en:'And We placed it', freq:5},
    {ar:'فِي', tr:'fī', en:'in', freq:1700},
    {ar:'قَرَارٍ', tr:'qarārin', en:'a resting place', freq:3},
    {ar:'مَّكِينٍ', tr:'makīnin', en:'secure', freq:3},
  ]},
  {label:'77:22 — إِلَىٰ قَدَرٍ مَّعْلُومٍ', words:[
    {ar:'إِلَىٰ', tr:'ilā', en:'For', freq:700},
    {ar:'قَدَرٍ', tr:'qadarin', en:'a period', freq:10},
    {ar:'مَّعْلُومٍ', tr:'maʿlūmin', en:'known', freq:5},
  ]},
  {label:'77:23 — فَقَدَرْنَا فَنِعْمَ الْقَادِرُونَ', words:[
    {ar:'فَقَدَرْنَا', tr:'fa-qadarnā', en:'So We determined', freq:1},
    {ar:'فَنِعْمَ', tr:'fa-niʿma', en:'and excellent are', freq:5},
    {ar:'الْقَادِرُونَ', tr:'al-qādirūna', en:'those who determine', freq:1},
  ]},
  {label:'77:24 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:25 — أَلَمْ نَجْعَلِ الْأَرْضَ كِفَاتًا', words:[
    {ar:'أَلَمْ', tr:'a-lam', en:'Have We not', freq:100},
    {ar:'نَجْعَلِ', tr:'najʿali', en:'made', freq:40},
    {ar:'الْأَرْضَ', tr:'al-arḍa', en:'the earth', freq:280},
    {ar:'كِفَاتًا', tr:'kifātan', en:'a container', freq:1},
  ]},
  {label:'77:26 — أَحْيَاءً وَأَمْوَاتًا', words:[
    {ar:'أَحْيَاءً', tr:'aḥyāʾan', en:'for the living', freq:3},
    {ar:'وَأَمْوَاتًا', tr:'wa-amwātan', en:'and the dead', freq:3},
  ]},
  {label:'77:27 — وَجَعَلْنَا فِيهَا رَوَاسِيَ شَامِخَاتٍ وَأَسْقَيْنَاكُم مَّاءً فُرَاتًا', words:[
    {ar:'وَجَعَلْنَا', tr:'wa-jaʿalnā', en:'And We placed', freq:40},
    {ar:'فِيهَا', tr:'fīhā', en:'therein', freq:100},
    {ar:'رَوَاسِيَ', tr:'rawāsiya', en:'mountains', freq:6},
    {ar:'شَامِخَاتٍ', tr:'shāmikhātin', en:'lofty', freq:1},
    {ar:'وَأَسْقَيْنَاكُم', tr:'wa-asqaynākum', en:'and We gave you drink', freq:2},
    {ar:'مَّاءً', tr:'māʾan', en:'water', freq:40},
    {ar:'فُرَاتًا', tr:'furātan', en:'sweet', freq:3},
  ]},
  {label:'77:28 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:29 — انطَلِقُوا إِلَىٰ مَا كُنتُم بِهِ تُكَذِّبُونَ', words:[
    {ar:'انطَلِقُوا', tr:'inṭaliqū', en:'Proceed', freq:2},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:700},
    {ar:'مَا', tr:'mā', en:'that which', freq:2000},
    {ar:'كُنتُم', tr:'kuntum', en:'you used to', freq:80},
    {ar:'بِهِ', tr:'bihī', en:'in it', freq:100},
    {ar:'تُكَذِّبُونَ', tr:'tukadhdhibūna', en:'deny', freq:10},
  ]},
  {label:'77:30 — انطَلِقُوا إِلَىٰ ظِلٍّ ذِي ثَلَاثِ شُعَبٍ', words:[
    {ar:'انطَلِقُوا', tr:'inṭaliqū', en:'Proceed', freq:2},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:700},
    {ar:'ظِلٍّ', tr:'ẓillin', en:'a shadow', freq:5},
    {ar:'ذِي', tr:'dhī', en:'having', freq:20},
    {ar:'ثَلَاثِ', tr:'thalāthi', en:'three', freq:12},
    {ar:'شُعَبٍ', tr:'shuʿabin', en:'columns', freq:1},
  ]},
  {label:'77:31 — لَّا ظَلِيلٍ وَلَا يُغْنِي مِنَ اللَّهَبِ', words:[
    {ar:'لَّا', tr:'lā', en:'No', freq:1500},
    {ar:'ظَلِيلٍ', tr:'ẓalīlin', en:'shade', freq:1},
    {ar:'وَلَا', tr:'wa-lā', en:'and will not', freq:700},
    {ar:'يُغْنِي', tr:'yughnī', en:'protect', freq:5},
    {ar:'مِنَ', tr:'mina', en:'from', freq:3000},
    {ar:'اللَّهَبِ', tr:'al-lahabi', en:'the flame', freq:3},
  ]},
  {label:'77:32 — إِنَّهَا تَرْمِي بِشَرَرٍ كَالْقَصْرِ', words:[
    {ar:'إِنَّهَا', tr:'innahā', en:'Indeed it throws', freq:22},
    {ar:'تَرْمِي', tr:'tarmī', en:'sparks', freq:3},
    {ar:'بِشَرَرٍ', tr:'bi-shararin', en:'of sparks', freq:1},
    {ar:'كَالْقَصْرِ', tr:'kal-qaṣri', en:'like huge logs', freq:1},
  ]},
  {label:'77:33 — كَأَنَّهُ جِمَالَتٌ صُفْرٌ', words:[
    {ar:'كَأَنَّهُ', tr:'kaʾannahū', en:'As if they were', freq:8},
    {ar:'جِمَالَتٌ', tr:'jimālatun', en:'camels', freq:1},
    {ar:'صُفْرٌ', tr:'ṣufrun', en:'bright yellow', freq:1},
  ]},
  {label:'77:34 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:35 — هَٰذَا يَوْمُ لَا يَنطِقُونَ', words:[
    {ar:'هَٰذَا', tr:'hādhā', en:'This is', freq:350},
    {ar:'يَوْمُ', tr:'yawmu', en:'a Day', freq:365},
    {ar:'لَا', tr:'lā', en:'they will not', freq:1500},
    {ar:'يَنطِقُونَ', tr:'yanṭiqūna', en:'speak', freq:3},
  ]},
  {label:'77:36 — وَلَا يُؤْذَنُ لَهُمْ فَيَعْتَذِرُونَ', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'Nor will it be', freq:700},
    {ar:'يُؤْذَنُ', tr:'yuʾdhanu', en:'permitted', freq:3},
    {ar:'لَهُمْ', tr:'lahum', en:'for them', freq:380},
    {ar:'فَيَعْتَذِرُونَ', tr:'fa-yaʿtadhirūna', en:'to make excuses', freq:1},
  ]},
  {label:'77:37 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:38 — هَٰذَا يَوْمُ الْفَصْلِ ۖ جَمَعْنَاكُمْ وَالْأَوَّلِينَ', words:[
    {ar:'هَٰذَا', tr:'hādhā', en:'This is', freq:350},
    {ar:'يَوْمُ', tr:'yawmu', en:'the Day of', freq:365},
    {ar:'الْفَصْلِ', tr:'al-faṣli', en:'Sorting', freq:5},
    {ar:'جَمَعْنَاكُمْ', tr:'jamaʿnākum', en:'We gathered you', freq:1},
    {ar:'وَالْأَوَّلِينَ', tr:'wal-awwalīna', en:'and the former peoples', freq:22},
  ]},
  {label:'77:39 — فَإِن كَانَ لَكُمْ كَيْدٌ فَكِيدُونِ', words:[
    {ar:'فَإِن', tr:'fa-in', en:'So if', freq:60},
    {ar:'كَانَ', tr:'kāna', en:'you have', freq:1358},
    {ar:'لَكُمْ', tr:'lakum', en:'for you', freq:60},
    {ar:'كَيْدٌ', tr:'kaydun', en:'a plan', freq:12},
    {ar:'فَكِيدُونِ', tr:'fa-kīdūni', en:'then plan against Me', freq:1},
  ]},
  {label:'77:40 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:41 — إِنَّ الْمُتَّقِينَ فِي ظِلَالٍ وَعُيُونٍ', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'الْمُتَّقِينَ', tr:'al-muttaqīna', en:'the righteous', freq:30},
    {ar:'فِي', tr:'fī', en:'will be amid', freq:1700},
    {ar:'ظِلَالٍ', tr:'ẓilālin', en:'shades', freq:5},
    {ar:'وَعُيُونٍ', tr:'wa-ʿuyūnin', en:'and springs', freq:6},
  ]},
  {label:'77:42 — وَفَوَاكِهَ مِمَّا يَشْتَهُونَ', words:[
    {ar:'وَفَوَاكِهَ', tr:'wa-fawākiha', en:'And fruits', freq:4},
    {ar:'مِمَّا', tr:'mimmā', en:'from whatever', freq:40},
    {ar:'يَشْتَهُونَ', tr:'yashtahūna', en:'they desire', freq:2},
  ]},
  {label:'77:43 — كُلُوا وَاشْرَبُوا هَنِيئًا بِمَا كُنتُمْ تَعْمَلُونَ', words:[
    {ar:'كُلُوا', tr:'kulū', en:'Eat', freq:7},
    {ar:'وَاشْرَبُوا', tr:'washrabū', en:'and drink', freq:5},
    {ar:'هَنِيئًا', tr:'hanīʾan', en:'pleasantly', freq:3},
    {ar:'بِمَا', tr:'bi-mā', en:'for what', freq:100},
    {ar:'كُنتُمْ', tr:'kuntum', en:'you used to', freq:80},
    {ar:'تَعْمَلُونَ', tr:'taʿmalūna', en:'do', freq:50},
  ]},
  {label:'77:44 — إِنَّا كَذَٰلِكَ نَجْزِي الْمُحْسِنِينَ', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed We', freq:60},
    {ar:'كَذَٰلِكَ', tr:'kadhālika', en:'thus', freq:80},
    {ar:'نَجْزِي', tr:'najzī', en:'reward', freq:10},
    {ar:'الْمُحْسِنِينَ', tr:'al-muḥsinīna', en:'the good-doers', freq:12},
  ]},
  {label:'77:45 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:46 — كُلُوا وَتَمَتَّعُوا قَلِيلًا إِنَّكُم مُّجْرِمُونَ', words:[
    {ar:'كُلُوا', tr:'kulū', en:'Eat', freq:7},
    {ar:'وَتَمَتَّعُوا', tr:'wa-tamattaʿū', en:'and enjoy', freq:4},
    {ar:'قَلِيلًا', tr:'qalīlan', en:'a little', freq:30},
    {ar:'إِنَّكُم', tr:'innakum', en:'indeed you are', freq:10},
    {ar:'مُّجْرِمُونَ', tr:'mujrimūna', en:'criminals', freq:42},
  ]},
  {label:'77:47 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:48 — وَإِذَا قِيلَ لَهُمُ ارْكَعُوا لَا يَرْكَعُونَ', words:[
    {ar:'وَإِذَا', tr:'wa-idhā', en:'And when', freq:409},
    {ar:'قِيلَ', tr:'qīla', en:'it is said to', freq:22},
    {ar:'لَهُمُ', tr:'lahumu', en:'them', freq:380},
    {ar:'ارْكَعُوا', tr:'irkaʿū', en:'bow down', freq:1},
    {ar:'لَا', tr:'lā', en:'they do not', freq:1500},
    {ar:'يَرْكَعُونَ', tr:'yarkaʿūna', en:'bow', freq:1},
  ]},
  {label:'77:49 — وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ', words:[
    {ar:'وَيْلٌ', tr:'waylun', en:'Woe', freq:20},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:50},
    {ar:'لِّلْمُكَذِّبِينَ', tr:'lil-mukadhdhibīna', en:'to the deniers', freq:10},
  ]},
  {label:'77:50 — فَبِأَيِّ حَدِيثٍ بَعْدَهُ يُؤْمِنُونَ', words:[
    {ar:'فَبِأَيِّ', tr:'fa-bi-ayyi', en:'Then in what', freq:5},
    {ar:'حَدِيثٍ', tr:'ḥadīthin', en:'speech', freq:20},
    {ar:'بَعْدَهُ', tr:'baʿdahū', en:'after it', freq:8},
    {ar:'يُؤْمِنُونَ', tr:'yuʾminūna', en:'will they believe', freq:50},
  ]},
];
window.setupWBWLevel(WBW_DATA, 10);
