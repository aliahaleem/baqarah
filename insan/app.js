'use strict';
/* Surah Al-Insan (76) — The Human / Man */
window.STORAGE_KEY = 'insanQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
  s5Checked:false,
};

const REWARDS = {
  1:{xp:75, gems:3, icon:'💧', title:'Origin of Man',         msg:"SubhanAllah! 'Hal ata \'ala al-insani heenan mina al-dahri lam yakun shay\'an madhkoora' — Was there not a period of time when man was nothing worth mentioning? From nothing to a drop — then tested. We gave him hearing and sight. WE showed him the way. Now it's HIS choice: grateful or ungrateful!"},
  2:{xp:80, gems:3, icon:'🍷', title:'Jannah Described',      msg:"Allahu Akbar! The rewards of the righteous — described in detail: no heat or cold in Jannah. Drinks from cups of Kawthar. The spring called Salsabeel. Silver goblets. And they feed the poor and orphan and captive saying 'we feed you for Allah's sake — we want no reward from you.' SubhanAllah!"},
  3:{xp:85, gems:3, icon:'🌸', title:'Seven Jannah Gifts',    msg:"MashAllah! Seven specific Jannah gifts: green garments of fine silk, silver bracelets, drink given by their Lord, pure and good drinks, their Lord is pleased with them, rewarded for patience, Jannah and silk robes! Seven layers of reward. Each one more beautiful than the last!"},
  4:{xp:100, gems:4, icon:'✨', title:'Al-Insan Complete!',   msg:"ALLAHUMMA BARIK! Al-Insan complete! Man was nothing — then given sight and hearing and a choice. The righteous feed others despite their own hunger. Seven beautiful Jannah rewards. Gradual revelation of Quran. And remember the name of your Lord morning and evening! Ameen!"},
  5:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Al-Insan word by word!'},
};

window.SURAH_CONFIG = {
  id:'s76', surahName:'Al-Insan', surahArabic:'الإنسان', totalLevels:5, wbwSection:5, rewards:REWARDS,
  tileIcons:['💧','🍷','🌸','✨'],
  tileLabels:['Origin','Jannah','7 Gifts','Complete'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Insan — The Human! Man was nothing — then given hearing, sight, and choice. Beautiful Jannah rewards. The righteous feed others. 4 levels of deep reflection!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/4 levels done. Your journey from nothing to greatness continues! 💧`,
    complete: name=>`MashAllah, ${name}! Al-Insan complete! May Allah make us of the righteous who earn Jannah! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does the famous opening of 76:1 ask about man?',
   opts:['Was man not created with strength and purpose?','Was there not a time when man was nothing worth mentioning?','Has man not been given every blessing he could need?','Was man not created with knowledge of all things?'],
   correct:1},
  {q:'From what was man created according to 76:2?',
   opts:['From light mixed with dust of the earth','From a mixed drop — nutfa amshaaj — We tested him','From clay and water as a humble beginning','From the soul breathed in by the angel Jibreel'],
   correct:1},
  {q:'What did Allah give man to find the path according to 76:3?',
   opts:['The Quran and the prophets to guide him','We showed him the way — grateful or ungrateful','Reason and intellect to understand good and evil','A pure heart that seeks the truth by nature'],
   correct:1},
  {q:'What do the righteous say when feeding the poor, orphan, and captive (76:9)?',
   opts:['We feed you because you deserve our kindness','We feed you only for the sake of Allah — no reward needed','We give because our Lord commanded us to give','We serve you because mercy is the way of the believers'],
   correct:1},
];

const S2_ITEMS = [
  {id:'j1', text:'🌬️ No sun\nor cold in Jannah',      zone:'z1'},
  {id:'j2', text:'🍷 Drink from\ncups of Kawthar',     zone:'z2'},
  {id:'j3', text:'💧 Spring called\nSalsabeel',         zone:'z3'},
  {id:'j4', text:'🏺 Goblets of\npure silver',         zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'"La yarawna feeha shamsan wa la zamhareeran" — no burning heat or biting cold (76:13) — perfect climate'},
  {id:'z2', desc:'They drink from cups whose mixture is from Kawthar — a special spring (76:5-6, 17)'},
  {id:'z3', desc:'"Salsabeela" — a spring in Jannah, flowing fresh and delicious (76:18) — named for its ease'},
  {id:'z4', desc:'They are served from goblets of silver and cups of crystal, measured precisely (76:15-16)'},
];

const S3_QUIZ = [
  {q:'What does 76:11 say Allah protected the righteous FROM on the Day of Judgment?',
   opts:['From the shame and regret of their sins','Allah saved them from the evil of that Day and gave them radiance','From standing too long in the heat of reckoning','From seeing the punishment given to the wicked'],
   correct:1},
  {q:'What does "wa jaza-hum bima sabaru" (76:12) mean?',
   opts:['And He rewarded them for being patient and steadfast','And He punished them for what they had delayed','And He gave them a trial because of their patience','And He tested them again after their patience'],
   correct:0},
  {q:'What does 76:23 say about the revelation of the Quran?',
   opts:['The Quran was sent all at once on one powerful night','Truly it is We who sent down this Quran in stages upon you','The Quran was preserved first in the heart of the Prophet','The Quran descended through Jibreel over 23 years exactly'],
   correct:1},
  {q:'What does 76:25 command the Prophet ﷺ to do morning and evening?',
   opts:['Feed the poor at both ends of the day','Glorify and remember the name of your Lord','Pray the extra prayers morning and evening','Recite the Quran to the people twice daily'],
   correct:1},
];

const S4_EVENTS_CORRECT = [
  {id:'i1', text:'💧 Man was nothing — then created from a mixed drop and tested (76:1-2)'},
  {id:'i2', text:'👁️ Allah gave man hearing and sight — then showed him the way (76:2-3)'},
  {id:'i3', text:'🍞 The righteous feed the poor, orphan, and captive for Allah\'s sake alone (76:8-9)'},
  {id:'i4', text:'🌿 Jannah reward: no heat, Salsabeel, goblets, green silk, silver bracelets (76:11-21)'},
  {id:'i5', text:'📖 The Quran was sent gradually — in stages — upon the Prophet ﷺ (76:23)'},
  {id:'i6', text:'🙏 Command: glorify and remember your Lord morning, evening, and prostrate to Him (76:25-26)'},
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
  const sky=st?'#040e04':'#020602', acc=st?'#c0e8f0':'#a0d8e8';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){// Garden green ground
    ctx.fillStyle=st?'#1a4020':'#102a14';ctx.fillRect(0,H*0.6,W,H*0.4);}
  if(n>=2){// Trees and flowers
    for(let i=0;i<5;i++){ctx.fillStyle='#308040';ctx.fillRect(W*0.05+i*W*0.19,H*0.35,W*0.12,H*0.28);ctx.fillStyle='#50a060';ctx.beginPath();ctx.arc(W*0.11+i*W*0.19,H*0.35,W*0.065,0,Math.PI*2);ctx.fill();}}
  if(n>=3){// Person giving food
    ctx.fillStyle='#c0a080';ctx.beginPath();ctx.arc(W*0.82,H*0.48,10,0,Math.PI*2);ctx.fill();ctx.fillRect(W*0.82-5,H*0.48+10,10,16);
    ctx.fillStyle='#f8d070';ctx.fillRect(W*0.72,H*0.55,18,8);}
  if(n>=5){ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('AL-INSAN COMPLETE 🌸',W/2,12);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Al-Insan — ${n}/5 levels`,W/2,12);ctx.textAlign='left';}
};

var WBW_DATA = [
  {label:'76:1 — هَلْ أَتَىٰ عَلَى الْإِنسَانِ حِينٌ مِّنَ الدَّهْرِ لَمْ يَكُن شَيْئًا مَّذْكُورًا', words:[
    {ar:'هَلْ', tr:'hal', en:'Has there', freq:70},
    {ar:'أَتَىٰ', tr:'atā', en:'come upon', freq:40},
    {ar:'عَلَى', tr:'ʿalā', en:'upon', freq:1445},
    {ar:'الْإِنسَانِ', tr:'al-insāni', en:'man', freq:60},
    {ar:'حِينٌ', tr:'ḥīnun', en:'a period', freq:10},
    {ar:'مِّنَ', tr:'mina', en:'of', freq:3000},
    {ar:'الدَّهْرِ', tr:'ad-dahri', en:'time', freq:2},
    {ar:'لَمْ', tr:'lam', en:'he was not', freq:320},
    {ar:'يَكُن', tr:'yakun', en:'a', freq:200},
    {ar:'شَيْئًا', tr:'shayʾan', en:'thing', freq:80},
    {ar:'مَّذْكُورًا', tr:'madhkūran', en:'worth mentioning', freq:1},
  ]},
  {label:'76:2 — إِنَّا خَلَقْنَا الْإِنسَانَ مِن نُّطْفَةٍ أَمْشَاجٍ نَّبْتَلِيهِ فَجَعَلْنَاهُ سَمِيعًا بَصِيرًا', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed We', freq:60},
    {ar:'خَلَقْنَا', tr:'khalaqnā', en:'created', freq:14},
    {ar:'الْإِنسَانَ', tr:'al-insāna', en:'man', freq:60},
    {ar:'مِن', tr:'min', en:'from', freq:3000},
    {ar:'نُّطْفَةٍ', tr:'nuṭfatin', en:'a drop', freq:8},
    {ar:'أَمْشَاجٍ', tr:'amshājin', en:'mixed', freq:1},
    {ar:'نَّبْتَلِيهِ', tr:'nabtalīhi', en:'We test him', freq:1},
    {ar:'فَجَعَلْنَاهُ', tr:'fa-jaʿalnāhu', en:'so We made him', freq:5},
    {ar:'سَمِيعًا', tr:'samīʿan', en:'hearing', freq:30},
    {ar:'بَصِيرًا', tr:'baṣīran', en:'seeing', freq:30},
  ]},
  {label:'76:3 — إِنَّا هَدَيْنَاهُ السَّبِيلَ إِمَّا شَاكِرًا وَإِمَّا كَفُورًا', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed We', freq:60},
    {ar:'هَدَيْنَاهُ', tr:'hadaynāhu', en:'guided him', freq:2},
    {ar:'السَّبِيلَ', tr:'as-sabīla', en:'the way', freq:40},
    {ar:'إِمَّا', tr:'immā', en:'either', freq:10},
    {ar:'شَاكِرًا', tr:'shākiran', en:'grateful', freq:3},
    {ar:'وَإِمَّا', tr:'wa-immā', en:'or', freq:10},
    {ar:'كَفُورًا', tr:'kafūran', en:'ungrateful', freq:4},
  ]},
  {label:'76:4 — إِنَّا أَعْتَدْنَا لِلْكَافِرِينَ سَلَاسِلَ وَأَغْلَالًا وَسَعِيرًا', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed We', freq:60},
    {ar:'أَعْتَدْنَا', tr:'aʿtadnā', en:'have prepared', freq:5},
    {ar:'لِلْكَافِرِينَ', tr:'lil-kāfirīna', en:'for the disbelievers', freq:120},
    {ar:'سَلَاسِلَ', tr:'salāsila', en:'chains', freq:2},
    {ar:'وَأَغْلَالًا', tr:'wa-aghlālan', en:'and shackles', freq:2},
    {ar:'وَسَعِيرًا', tr:'wa-saʿīran', en:'and a blazing Fire', freq:10},
  ]},
  {label:'76:5 — إِنَّ الْأَبْرَارَ يَشْرَبُونَ مِن كَأْسٍ كَانَ مِزَاجُهَا كَافُورًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'الْأَبْرَارَ', tr:'al-abrāra', en:'the righteous', freq:6},
    {ar:'يَشْرَبُونَ', tr:'yashrabūna', en:'will drink', freq:5},
    {ar:'مِن', tr:'min', en:'from', freq:3000},
    {ar:'كَأْسٍ', tr:'kaʾsin', en:'a cup', freq:5},
    {ar:'كَانَ', tr:'kāna', en:'whose', freq:1358},
    {ar:'مِزَاجُهَا', tr:'mizājuhā', en:'mixture is', freq:2},
    {ar:'كَافُورًا', tr:'kāfūran', en:'Kafur (camphor)', freq:1},
  ]},
  {label:'76:6 — عَيْنًا يَشْرَبُ بِهَا عِبَادُ اللَّهِ يُفَجِّرُونَهَا تَفْجِيرًا', words:[
    {ar:'عَيْنًا', tr:'ʿaynan', en:'A spring', freq:10},
    {ar:'يَشْرَبُ', tr:'yashrabu', en:'from which drink', freq:5},
    {ar:'بِهَا', tr:'bihā', en:'from it', freq:50},
    {ar:'عِبَادُ', tr:'ʿibādu', en:'the servants of', freq:80},
    {ar:'اللَّهِ', tr:'Allāhi', en:'Allah', freq:2699},
    {ar:'يُفَجِّرُونَهَا', tr:'yufajjirūnahā', en:'causing it to gush', freq:1},
    {ar:'تَفْجِيرًا', tr:'tafjīran', en:'abundantly', freq:1},
  ]},
  {label:'76:7 — يُوفُونَ بِالنَّذْرِ وَيَخَافُونَ يَوْمًا كَانَ شَرُّهُ مُسْتَطِيرًا', words:[
    {ar:'يُوفُونَ', tr:'yūfūna', en:'They fulfil', freq:3},
    {ar:'بِالنَّذْرِ', tr:'bin-nadhri', en:'their vows', freq:2},
    {ar:'وَيَخَافُونَ', tr:'wa-yakhāfūna', en:'and fear', freq:8},
    {ar:'يَوْمًا', tr:'yawman', en:'a Day', freq:365},
    {ar:'كَانَ', tr:'kāna', en:'whose', freq:1358},
    {ar:'شَرُّهُ', tr:'sharruhū', en:'evil', freq:6},
    {ar:'مُسْتَطِيرًا', tr:'mustaṭīran', en:'widespread', freq:1},
  ]},
  {label:'76:8 — وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا', words:[
    {ar:'وَيُطْعِمُونَ', tr:'wa-yuṭʿimūna', en:'And they give food', freq:3},
    {ar:'الطَّعَامَ', tr:'aṭ-ṭaʿāma', en:'the food', freq:18},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'despite', freq:1445},
    {ar:'حُبِّهِ', tr:'ḥubbihī', en:'their love for it', freq:2},
    {ar:'مِسْكِينًا', tr:'miskīnan', en:'to the needy', freq:18},
    {ar:'وَيَتِيمًا', tr:'wa-yatīman', en:'and the orphan', freq:10},
    {ar:'وَأَسِيرًا', tr:'wa-asīran', en:'and the captive', freq:2},
  ]},
  {label:'76:9 — إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا', words:[
    {ar:'إِنَّمَا', tr:'innamā', en:'We feed you only', freq:110},
    {ar:'نُطْعِمُكُمْ', tr:'nuṭʿimukum', en:'we feed you', freq:1},
    {ar:'لِوَجْهِ', tr:'li-wajhi', en:'for the sake of', freq:5},
    {ar:'اللَّهِ', tr:'Allāhi', en:'Allah', freq:2699},
    {ar:'لَا', tr:'lā', en:'We desire not', freq:1500},
    {ar:'نُرِيدُ', tr:'nurīdu', en:'we want', freq:5},
    {ar:'مِنكُمْ', tr:'minkum', en:'from you', freq:36},
    {ar:'جَزَاءً', tr:'jazāʾan', en:'reward', freq:22},
    {ar:'وَلَا', tr:'wa-lā', en:'nor', freq:700},
    {ar:'شُكُورًا', tr:'shukūran', en:'gratitude', freq:1},
  ]},
  {label:'76:10 — إِنَّا نَخَافُ مِن رَّبِّنَا يَوْمًا عَبُوسًا قَمْطَرِيرًا', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed we fear', freq:60},
    {ar:'نَخَافُ', tr:'nakhāfu', en:'we fear', freq:3},
    {ar:'مِن', tr:'min', en:'from', freq:3000},
    {ar:'رَّبِّنَا', tr:'Rabbinā', en:'our Lord', freq:42},
    {ar:'يَوْمًا', tr:'yawman', en:'a Day', freq:365},
    {ar:'عَبُوسًا', tr:'ʿabūsan', en:'austere', freq:1},
    {ar:'قَمْطَرِيرًا', tr:'qamṭarīran', en:'and distressful', freq:1},
  ]},
  {label:'76:11 — فَوَقَاهُمُ اللَّهُ شَرَّ ذَٰلِكَ الْيَوْمِ وَلَقَّاهُمْ نَضْرَةً وَسُرُورًا', words:[
    {ar:'فَوَقَاهُمُ', tr:'fa-waqāhumu', en:'So Allah protected them', freq:1},
    {ar:'اللَّهُ', tr:'Allāhu', en:'Allah', freq:2699},
    {ar:'شَرَّ', tr:'sharra', en:'from the evil of', freq:6},
    {ar:'ذَٰلِكَ', tr:'dhālika', en:'that', freq:350},
    {ar:'الْيَوْمِ', tr:'al-yawmi', en:'Day', freq:365},
    {ar:'وَلَقَّاهُمْ', tr:'wa-laqqāhum', en:'and gave them', freq:1},
    {ar:'نَضْرَةً', tr:'naḍratan', en:'radiance', freq:2},
    {ar:'وَسُرُورًا', tr:'wa-surūran', en:'and happiness', freq:1},
  ]},
  {label:'76:12 — وَجَزَاهُم بِمَا صَبَرُوا جَنَّةً وَحَرِيرًا', words:[
    {ar:'وَجَزَاهُم', tr:'wa-jazāhum', en:'And rewarded them', freq:3},
    {ar:'بِمَا', tr:'bi-mā', en:'for', freq:100},
    {ar:'صَبَرُوا', tr:'ṣabarū', en:'they patiently endured', freq:8},
    {ar:'جَنَّةً', tr:'jannatan', en:'with a Garden', freq:60},
    {ar:'وَحَرِيرًا', tr:'wa-ḥarīran', en:'and silk', freq:2},
  ]},
  {label:'76:13 — مُّتَّكِئِينَ فِيهَا عَلَى الْأَرَائِكِ ۖ لَا يَرَوْنَ فِيهَا شَمْسًا وَلَا زَمْهَرِيرًا', words:[
    {ar:'مُّتَّكِئِينَ', tr:'muttakiʾīna', en:'Reclining', freq:5},
    {ar:'فِيهَا', tr:'fīhā', en:'therein', freq:100},
    {ar:'عَلَى', tr:'ʿalā', en:'on', freq:1445},
    {ar:'الْأَرَائِكِ', tr:'al-arāʾiki', en:'couches', freq:4},
    {ar:'لَا', tr:'lā', en:'they will see no', freq:1500},
    {ar:'يَرَوْنَ', tr:'yarawna', en:'they see', freq:12},
    {ar:'فِيهَا', tr:'fīhā', en:'therein', freq:100},
    {ar:'شَمْسًا', tr:'shamsan', en:'sun', freq:20},
    {ar:'وَلَا', tr:'wa-lā', en:'nor', freq:700},
    {ar:'زَمْهَرِيرًا', tr:'zamharīran', en:'bitter cold', freq:1},
  ]},
  {label:'76:14 — وَدَانِيَةً عَلَيْهِمْ ظِلَالُهَا وَذُلِّلَتْ قُطُوفُهَا تَذْلِيلًا', words:[
    {ar:'وَدَانِيَةً', tr:'wa-dāniyatan', en:'And near', freq:1},
    {ar:'عَلَيْهِمْ', tr:'ʿalayhim', en:'above them', freq:200},
    {ar:'ظِلَالُهَا', tr:'ẓilāluhā', en:'are its shades', freq:1},
    {ar:'وَذُلِّلَتْ', tr:'wa-dhullilat', en:'and lowered', freq:1},
    {ar:'قُطُوفُهَا', tr:'quṭūfuhā', en:'its fruit clusters', freq:1},
    {ar:'تَذْلِيلًا', tr:'tadhlīlan', en:'completely', freq:1},
  ]},
  {label:'76:15 — وَيُطَافُ عَلَيْهِم بِآنِيَةٍ مِّن فِضَّةٍ وَأَكْوَابٍ كَانَتْ قَوَارِيرَا', words:[
    {ar:'وَيُطَافُ', tr:'wa-yuṭāfu', en:'And circulated among them', freq:2},
    {ar:'عَلَيْهِم', tr:'ʿalayhim', en:'upon them', freq:200},
    {ar:'بِآنِيَةٍ', tr:'bi-āniyatin', en:'will be vessels', freq:1},
    {ar:'مِّن', tr:'min', en:'of', freq:3000},
    {ar:'فِضَّةٍ', tr:'fiḍḍatin', en:'silver', freq:3},
    {ar:'وَأَكْوَابٍ', tr:'wa-akwābin', en:'and cups', freq:2},
    {ar:'كَانَتْ', tr:'kānat', en:'that are', freq:200},
    {ar:'قَوَارِيرَا', tr:'qawārīrā', en:'of crystal', freq:2},
  ]},
  {label:'76:16 — قَوَارِيرَ مِن فِضَّةٍ قَدَّرُوهَا تَقْدِيرًا', words:[
    {ar:'قَوَارِيرَ', tr:'qawārīra', en:'Crystal of', freq:2},
    {ar:'مِن', tr:'min', en:'from', freq:3000},
    {ar:'فِضَّةٍ', tr:'fiḍḍatin', en:'silver', freq:3},
    {ar:'قَدَّرُوهَا', tr:'qaddarūhā', en:'they determined', freq:1},
    {ar:'تَقْدِيرًا', tr:'taqdīran', en:'precisely', freq:3},
  ]},
  {label:'76:17 — وَيُسْقَوْنَ فِيهَا كَأْسًا كَانَ مِزَاجُهَا زَنجَبِيلًا', words:[
    {ar:'وَيُسْقَوْنَ', tr:'wa-yusqawna', en:'And they will be given', freq:2},
    {ar:'فِيهَا', tr:'fīhā', en:'therein', freq:100},
    {ar:'كَأْسًا', tr:'kaʾsan', en:'a cup', freq:5},
    {ar:'كَانَ', tr:'kāna', en:'whose', freq:1358},
    {ar:'مِزَاجُهَا', tr:'mizājuhā', en:'mixture is', freq:2},
    {ar:'زَنجَبِيلًا', tr:'zanjabīlan', en:'ginger', freq:1},
  ]},
  {label:'76:18 — عَيْنًا فِيهَا تُسَمَّىٰ سَلْسَبِيلًا', words:[
    {ar:'عَيْنًا', tr:'ʿaynan', en:'A spring', freq:10},
    {ar:'فِيهَا', tr:'fīhā', en:'within it', freq:100},
    {ar:'تُسَمَّىٰ', tr:'tusammā', en:'called', freq:5},
    {ar:'سَلْسَبِيلًا', tr:'salsabīlan', en:'Salsabeel', freq:1},
  ]},
  {label:'76:19 — وَيَطُوفُ عَلَيْهِمْ وِلْدَانٌ مُّخَلَّدُونَ إِذَا رَأَيْتَهُمْ حَسِبْتَهُمْ لُؤْلُؤًا مَّنثُورًا', words:[
    {ar:'وَيَطُوفُ', tr:'wa-yaṭūfu', en:'And will circulate', freq:2},
    {ar:'عَلَيْهِمْ', tr:'ʿalayhim', en:'among them', freq:200},
    {ar:'وِلْدَانٌ', tr:'wildānun', en:'young boys', freq:2},
    {ar:'مُّخَلَّدُونَ', tr:'mukhalladūna', en:'eternal', freq:3},
    {ar:'إِذَا', tr:'idhā', en:'when', freq:409},
    {ar:'رَأَيْتَهُمْ', tr:'raʾaytahum', en:'you see them', freq:5},
    {ar:'حَسِبْتَهُمْ', tr:'ḥasibtahum', en:'you would think them', freq:1},
    {ar:'لُؤْلُؤًا', tr:'luʾluʾan', en:'scattered pearls', freq:4},
    {ar:'مَّنثُورًا', tr:'manthūran', en:'spread about', freq:1},
  ]},
  {label:'76:20 — وَإِذَا رَأَيْتَ ثَمَّ رَأَيْتَ نَعِيمًا وَمُلْكًا كَبِيرًا', words:[
    {ar:'وَإِذَا', tr:'wa-idhā', en:'And when', freq:409},
    {ar:'رَأَيْتَ', tr:'raʾayta', en:'you look', freq:20},
    {ar:'ثَمَّ', tr:'thamma', en:'there', freq:10},
    {ar:'رَأَيْتَ', tr:'raʾayta', en:'you will see', freq:20},
    {ar:'نَعِيمًا', tr:'naʿīman', en:'bliss', freq:12},
    {ar:'وَمُلْكًا', tr:'wa-mulkan', en:'and a great kingdom', freq:3},
    {ar:'كَبِيرًا', tr:'kabīran', en:'great', freq:22},
  ]},
  {label:'76:21 — عَالِيَهُمْ ثِيَابُ سُندُسٍ خُضْرٌ وَإِسْتَبْرَقٌ ۖ وَحُلُّوا أَسَاوِرَ مِن فِضَّةٍ وَسَقَاهُمْ رَبُّهُمْ شَرَابًا طَهُورًا', words:[
    {ar:'عَالِيَهُمْ', tr:'ʿāliyahum', en:'Upon them', freq:1},
    {ar:'ثِيَابُ', tr:'thiyābu', en:'will be garments of', freq:3},
    {ar:'سُندُسٍ', tr:'sundusin', en:'fine green silk', freq:3},
    {ar:'خُضْرٌ', tr:'khuḍrun', en:'green', freq:3},
    {ar:'وَإِسْتَبْرَقٌ', tr:'wa-istabraqun', en:'and brocade', freq:3},
    {ar:'وَحُلُّوا', tr:'wa-ḥullū', en:'And they will be adorned', freq:2},
    {ar:'أَسَاوِرَ', tr:'asāwira', en:'with bracelets', freq:3},
    {ar:'مِن', tr:'min', en:'of', freq:3000},
    {ar:'فِضَّةٍ', tr:'fiḍḍatin', en:'silver', freq:3},
    {ar:'وَسَقَاهُمْ', tr:'wa-saqāhum', en:'And their Lord gave them', freq:1},
    {ar:'رَبُّهُمْ', tr:'Rabbuhum', en:'their Lord', freq:42},
    {ar:'شَرَابًا', tr:'sharāban', en:'a drink', freq:5},
    {ar:'طَهُورًا', tr:'ṭahūran', en:'purifying', freq:2},
  ]},
  {label:'76:22 — إِنَّ هَٰذَا كَانَ لَكُمْ جَزَاءً وَكَانَ سَعْيُكُم مَّشْكُورًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'هَٰذَا', tr:'hādhā', en:'this', freq:350},
    {ar:'كَانَ', tr:'kāna', en:'is', freq:1358},
    {ar:'لَكُمْ', tr:'lakum', en:'for you', freq:60},
    {ar:'جَزَاءً', tr:'jazāʾan', en:'a reward', freq:22},
    {ar:'وَكَانَ', tr:'wa-kāna', en:'and has been', freq:200},
    {ar:'سَعْيُكُم', tr:'saʿyukum', en:'your effort', freq:1},
    {ar:'مَّشْكُورًا', tr:'mashkūran', en:'appreciated', freq:1},
  ]},
  {label:'76:23 — إِنَّا نَحْنُ نَزَّلْنَا عَلَيْكَ الْقُرْآنَ تَنزِيلًا', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed We', freq:60},
    {ar:'نَحْنُ', tr:'naḥnu', en:'We', freq:30},
    {ar:'نَزَّلْنَا', tr:'nazzalnā', en:'have sent down', freq:10},
    {ar:'عَلَيْكَ', tr:'ʿalayka', en:'upon you', freq:65},
    {ar:'الْقُرْآنَ', tr:'al-Qurʾāna', en:'the Quran', freq:58},
    {ar:'تَنزِيلًا', tr:'tanzīlan', en:'progressively', freq:5},
  ]},
  {label:'76:24 — فَاصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تُطِعْ مِنْهُمْ آثِمًا أَوْ كَفُورًا', words:[
    {ar:'فَاصْبِرْ', tr:'fa-ṣbir', en:'So be patient', freq:4},
    {ar:'لِحُكْمِ', tr:'li-ḥukmi', en:'for the decision of', freq:4},
    {ar:'رَبِّكَ', tr:'Rabbika', en:'your Lord', freq:42},
    {ar:'وَلَا', tr:'wa-lā', en:'and do not', freq:700},
    {ar:'تُطِعْ', tr:'tuṭiʿ', en:'obey', freq:10},
    {ar:'مِنْهُمْ', tr:'minhum', en:'from them', freq:100},
    {ar:'آثِمًا', tr:'āthiman', en:'a sinner', freq:2},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
    {ar:'كَفُورًا', tr:'kafūran', en:'ungrateful one', freq:4},
  ]},
  {label:'76:25 — وَاذْكُرِ اسْمَ رَبِّكَ بُكْرَةً وَأَصِيلًا', words:[
    {ar:'وَاذْكُرِ', tr:'wadhkuri', en:'And remember', freq:10},
    {ar:'اسْمَ', tr:'isma', en:'the name of', freq:22},
    {ar:'رَبِّكَ', tr:'Rabbika', en:'your Lord', freq:42},
    {ar:'بُكْرَةً', tr:'bukratan', en:'morning', freq:5},
    {ar:'وَأَصِيلًا', tr:'wa-aṣīlan', en:'and evening', freq:3},
  ]},
  {label:'76:26 — وَمِنَ اللَّيْلِ فَاسْجُدْ لَهُ وَسَبِّحْهُ لَيْلًا طَوِيلًا', words:[
    {ar:'وَمِنَ', tr:'wa-mina', en:'And during part of', freq:100},
    {ar:'اللَّيْلِ', tr:'al-layli', en:'the night', freq:60},
    {ar:'فَاسْجُدْ', tr:'fa-sjud', en:'prostrate to', freq:2},
    {ar:'لَهُ', tr:'lahū', en:'Him', freq:800},
    {ar:'وَسَبِّحْهُ', tr:'wa-sabbiḥhū', en:'and exalt Him', freq:2},
    {ar:'لَيْلًا', tr:'laylan', en:'a night', freq:60},
    {ar:'طَوِيلًا', tr:'ṭawīlan', en:'long', freq:8},
  ]},
  {label:'76:27 — إِنَّ هَٰؤُلَاءِ يُحِبُّونَ الْعَاجِلَةَ وَيَذَرُونَ وَرَاءَهُمْ يَوْمًا ثَقِيلًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'هَٰؤُلَاءِ', tr:'hāʾulāʾi', en:'these people', freq:18},
    {ar:'يُحِبُّونَ', tr:'yuḥibbūna', en:'love', freq:5},
    {ar:'الْعَاجِلَةَ', tr:'al-ʿājilata', en:'the immediate', freq:3},
    {ar:'وَيَذَرُونَ', tr:'wa-yadharūna', en:'and leave behind', freq:2},
    {ar:'وَرَاءَهُمْ', tr:'warāʾahum', en:'behind them', freq:6},
    {ar:'يَوْمًا', tr:'yawman', en:'a Day', freq:365},
    {ar:'ثَقِيلًا', tr:'thaqīlan', en:'heavy', freq:3},
  ]},
  {label:'76:28 — نَّحْنُ خَلَقْنَاهُمْ وَشَدَدْنَا أَسْرَهُمْ ۖ وَإِذَا شِئْنَا بَدَّلْنَا أَمْثَالَهُمْ تَبْدِيلًا', words:[
    {ar:'نَّحْنُ', tr:'naḥnu', en:'We', freq:30},
    {ar:'خَلَقْنَاهُمْ', tr:'khalaqnāhum', en:'created them', freq:5},
    {ar:'وَشَدَدْنَا', tr:'wa-shadadnā', en:'and strengthened', freq:1},
    {ar:'أَسْرَهُمْ', tr:'asrahum', en:'their forms', freq:1},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'And when', freq:409},
    {ar:'شِئْنَا', tr:'shiʾnā', en:'We will', freq:5},
    {ar:'بَدَّلْنَا', tr:'baddalnā', en:'We can replace', freq:3},
    {ar:'أَمْثَالَهُمْ', tr:'amthālahum', en:'their likes', freq:2},
    {ar:'تَبْدِيلًا', tr:'tabdīlan', en:'completely', freq:3},
  ]},
  {label:'76:29 — إِنَّ هَٰذِهِ تَذْكِرَةٌ ۖ فَمَن شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ سَبِيلًا', words:[
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'هَٰذِهِ', tr:'hādhihī', en:'this is', freq:22},
    {ar:'تَذْكِرَةٌ', tr:'tadhkiratun', en:'a reminder', freq:6},
    {ar:'فَمَن', tr:'fa-man', en:'So whoever', freq:540},
    {ar:'شَاءَ', tr:'shāʾa', en:'wills', freq:30},
    {ar:'اتَّخَذَ', tr:'ittakhadha', en:'may take', freq:14},
    {ar:'إِلَىٰ', tr:'ilā', en:'to', freq:700},
    {ar:'رَبِّهِ', tr:'Rabbihī', en:'his Lord', freq:42},
    {ar:'سَبِيلًا', tr:'sabīlan', en:'a way', freq:40},
  ]},
  {label:'76:30 — وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ ۚ إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'But you do not', freq:2000},
    {ar:'تَشَاءُونَ', tr:'tashāʾūna', en:'will', freq:3},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:663},
    {ar:'أَن', tr:'an', en:'that', freq:560},
    {ar:'يَشَاءَ', tr:'yashāʾa', en:'wills', freq:30},
    {ar:'اللَّهُ', tr:'Allāhu', en:'Allah', freq:2699},
    {ar:'إِنَّ', tr:'inna', en:'Indeed', freq:490},
    {ar:'اللَّهَ', tr:'Allāha', en:'Allah', freq:2699},
    {ar:'كَانَ', tr:'kāna', en:'is', freq:1358},
    {ar:'عَلِيمًا', tr:'ʿalīman', en:'All-Knowing', freq:125},
    {ar:'حَكِيمًا', tr:'ḥakīman', en:'All-Wise', freq:90},
  ]},
  {label:'76:31 — يُدْخِلُ مَن يَشَاءُ فِي رَحْمَتِهِ ۚ وَالظَّالِمِينَ أَعَدَّ لَهُمْ عَذَابًا أَلِيمًا', words:[
    {ar:'يُدْخِلُ', tr:'yudkhilu', en:'He admits', freq:5},
    {ar:'مَن', tr:'man', en:'whom', freq:540},
    {ar:'يَشَاءُ', tr:'yashāʾu', en:'He wills', freq:30},
    {ar:'فِي', tr:'fī', en:'into', freq:1700},
    {ar:'رَحْمَتِهِ', tr:'raḥmatihī', en:'His mercy', freq:15},
    {ar:'وَالظَّالِمِينَ', tr:'waẓ-ẓālimīna', en:'And the wrongdoers', freq:20},
    {ar:'أَعَدَّ', tr:'aʿadda', en:'He has prepared', freq:5},
    {ar:'لَهُمْ', tr:'lahum', en:'for them', freq:380},
    {ar:'عَذَابًا', tr:'ʿadhāban', en:'a punishment', freq:60},
    {ar:'أَلِيمًا', tr:'alīman', en:'painful', freq:60},
  ]},
];
window.setupWBWLevel(WBW_DATA, 10);
