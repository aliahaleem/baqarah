'use strict';
/* Surah Al-Haqqah (69) — The Inevitable Reality */
window.STORAGE_KEY = 'haqqahQuestSave';
window.state = {
  explorerName:'', xp:0, gems:0, completed:[],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Checked:false,
  s4Order:[], s4Checked:false,
  s5Checked:false,
  s6Checked:false,
};

const REWARDS = {
  1:{xp:70, gems:3, icon:'💥', title:'The Reality Unveiled',  msg:"SubhanAllah! Al-Haqqah — The Inevitable! What is it? How stunning that Allah repeats 'wa ma adraaka mal-haqqah' — And what could make you know what the Inevitable is? The repetition itself creates awe and anticipation. The great Day is REAL — and it is coming!"},
  2:{xp:80, gems:3, icon:'🏔️', title:'Nations Destroyed',    msg:"Allahu Akbar! Thamud destroyed by a single mighty blast. Ad destroyed by a furious roaring wind for 7 nights and 8 days. Pharaoh drowned. These weren't stories — they were warnings made manifest. Do we heed the lesson?"},
  3:{xp:80, gems:3, icon:'📯', title:'The Trumpet',           msg:"MashAllah! The trumpet is blown ONCE — and mountains crumble to dust. Then blown AGAIN — and all are gathered. The Day is set in motion by two sounds. SubhanAllah — imagine standing at that gathering, your whole life's record in your hand!"},
  4:{xp:90, gems:3, icon:'📖', title:'Right & Left Hand',     msg:"SubhanAllah! Right hand = rejoicing, easy reckoning. Left hand behind the back = wishing for death, no escape. Which hand will carry your book? Every deed is being written NOW. The right hand is built through righteous deeds today!"},
  5:{xp:110, gems:4, icon:'✨', title:'Al-Haqqah Complete!',  msg:"ALLAHUMMA BARIK! Al-Haqqah complete! The Quran is 'qawlun rasul karim — laa qawlu sha\'ir' — the word of a noble messenger, NOT a poet's word. The whole surah is designed to break denial and awaken the heart. May Allah wake OUR hearts! Ameen!"},
  6:{xp:80, gems:3, icon:'📖', title:'BONUS COMPLETE!', msg:'MashAllah! You mastered the Arabic words of Surah Al-Haqqah word by word!'},
};

window.SURAH_CONFIG = {
  id:'s69', surahName:'Al-Haqqah', surahArabic:'الحاقة', totalLevels:6, wbwSection:6, rewards:REWARDS,
  tileIcons:['💥','🏔️','📯','📖','✨'],
  tileLabels:['What is It?','Nations','The Trumpet','Two Hands','The Truth'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Al-Haqqah — The Inevitable Reality! What destroyed Thamud? Ad? Pharaoh? Two trumpet blasts. Right vs left hand. And the Quran is NOT a poet's word. 5 powerful levels await!`,
    partial: (name,done)=>`Welcome back, ${name}! ${done}/5 levels done. The Reality is coming — prepare! 💥`,
    complete: name=>`MashAllah, ${name}! Al-Haqqah complete! May Allah give us the book in our right hand! 🏆`,
  },
};

const S1_QUIZ = [
  {q:'What does "Al-Haqqah" mean in Surah 69:1?',
   opts:['The Final Judgment','The Inevitable Reality that must occur','The Day of Rising and Gathering','The Great Announcement of the End'],
   correct:1},
  {q:'What phrase does Allah repeat in 69:2-3 to build awe?',
   opts:['What is the Reality, and why does it come?','The Inevitable — what is the Inevitable?','When the Day arrives and none can stop it?','And you will know it when it approaches?'],
   correct:1},
  {q:'Which nation in 69:4 is said to have denied the Hour?',
   opts:['The people of Nuh and Lut','Thamud and Ad denied the Hour','The Quraysh and their allies','Pharaoh and those before him'],
   correct:1},
  {q:'How was Thamud destroyed according to 69:5?',
   opts:['A devastating flood from the sky','Swallowed by the earth below them','A terrible overwhelming blast or thunderclap','Seven days of fire and burning flames'],
   correct:2},
];

const S2_ITEMS = [
  {id:'n1', text:'⚡ Thamud',       zone:'z1'},
  {id:'n2', text:'🌪️ Ad',            zone:'z2'},
  {id:'n3', text:'💧 People of Nuh', zone:'z3'},
  {id:'n4', text:'👑 Pharaoh',       zone:'z4'},
];
const S2_ZONES = [
  {id:'z1', desc:'Destroyed by a single mighty, overwhelming blast (69:5) — they denied the Hour'},
  {id:'z2', desc:'Destroyed by a furious roaring wind for 7 nights and 8 consecutive days (69:6-7)'},
  {id:'z3', desc:'Drowned in the overwhelming flood — carried in the ark (69:11)'},
  {id:'z4', desc:'Sinned with disobedience and transgression — seized with severity (69:9-10)'},
];

const S3_QUIZ = [
  {q:'According to 69:13, how many times is the trumpet blown at the Hour?',
   opts:['Once with a single mighty blast','Three times at different stages','One blast and then a second blast','Many times throughout the Day'],
   correct:2},
  {q:'What happens to the mountains and earth at the first trumpet blast (69:14)?',
   opts:['They shake violently and split open','They are crushed and lifted into the sky','They are smashed to dust in one crumbling blow','They sink slowly into the depths of the sea'],
   correct:2},
  {q:'What does 69:17 say about the angels on the sides?',
   opts:['They descend to assist the believers on that Day','Eight angels carry the Throne of your Lord above them','The angels stand in orderly rows around the gathering','They watch over the record of every soul\'s deeds'],
   correct:1},
  {q:'According to 69:18, what happens on the Day of Gathering?',
   opts:['Nothing will be hidden — you will be fully exposed','Each person will speak their own account freely','The books will be opened and read aloud to all','Every deed will be weighed on the Great Scale'],
   correct:0},
];

const S4_EVENTS_CORRECT = [
  {id:'r1', text:'📖 Right hand receives the book — rejoices: "Here, read my record!"'},
  {id:'r2', text:'😊 Easy reckoning — returning to family in happiness and delight'},
  {id:'r3', text:'💀 Left hand receives book behind their back — wishes for death'},
  {id:'r4', text:'😰 Calls out: "Oh, would that my death had been the end of me!"'},
  {id:'r5', text:'💸 Their wealth and authority availed them nothing on this Day'},
  {id:'r6', text:'🔗 Seized, chained, dragged to the blazing Hellfire'},
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

const S5_QUIZ = [
  {q:'What does Allah say the Quran is NOT in 69:41?',
   opts:['Not the words of a jinn or shaytan','Not the word of a poet — little do you believe!','Not a human creation but divine revelation','Not a story invented for entertainment'],
   correct:1},
  {q:'What does 69:44-46 say would happen if Muhammad ﷺ invented even one word?',
   opts:['The Muslims would leave him immediately','We would have seized him by his right hand','Allah would correct him through revelation','The angels would expose his fabrication'],
   correct:1},
  {q:'What does "wa innahu la-tathkiratun lil-muttaqeen" (69:48) mean?',
   opts:['The Quran is a reminder for the righteous people','This surah is only for the learned scholars','The Day is a warning for those who deny Allah','The angels carry this message to all mankind'],
   correct:0},
  {q:'What does Allah command the Prophet ﷺ at the end of Surah Al-Haqqah (69:52)?',
   opts:['To recite the Quran to all of humanity','To glorify the name of your Lord, the Most Great!','To warn the people of the approaching Day','To establish prayer and give to the poor'],
   correct:1},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}
function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}
function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}
function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderStoryOrder(4,S4_EVENTS_CORRECT);}
function checkSection4(){checkStoryOrder(4,S4_EVENTS_CORRECT);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}
function checkSection5(){checkQuiz(5,S5_QUIZ);}
function updateUIExtra(){window._drawBuildCanvas(window.state.completed.length);}

window._drawBuildCanvas = function(n) {
  const cv=document.getElementById('build-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const st=document.documentElement.getAttribute('data-theme')==='stars';
  const sky=st?'#1e0606':'#0e0202', acc=st?'#f8d040':'#e8c030';
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  if(n>=1){const g=ctx.createRadialGradient(W/2,H/2,10,W/2,H/2,100);g.addColorStop(0,'rgba(255,80,30,0.3)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(n>=2){ctx.fillStyle='#3a1006';ctx.fillRect(0,H*0.65,W,H*0.35);for(let i=0;i<4;i++){ctx.fillStyle=`rgba(255,${80-i*20},0,${0.3+i*0.1})`;ctx.fillRect(W*0.1+i*W*0.2,H*0.4,W*0.15,H*0.28);}}
  if(n>=3){ctx.fillStyle=acc;ctx.font='18px serif';ctx.textAlign='center';ctx.fillText('📯',W*0.8,H*0.35);ctx.textAlign='left';}
  if(n>=4){ctx.fillStyle='#60a060';ctx.fillRect(W*0.05,H*0.5,30,40);ctx.fillStyle='#e04040';ctx.fillRect(W*0.15,H*0.5,30,40);}
  if(n>=5){ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('AL-HAQQAH COMPLETE 💥',W/2,12);ctx.textAlign='left';}
  else{ctx.fillStyle=acc;ctx.font='6px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(`Al-Haqqah — ${n}/6 levels`,W/2,12);ctx.textAlign='left';}
};

const WBW_DATA = [
  {label:'69:1 — الْحَاقَّةُ', words:[
    {ar:'الْحَاقَّةُ', tr:'al-ḥāqqah', en:'The Inevitable Reality', freq:3},
  ]},
  {label:'69:2 — مَا الْحَاقَّةُ', words:[
    {ar:'مَا', tr:'mā', en:'What is', freq:2300},
    {ar:'الْحَاقَّةُ', tr:'al-ḥāqqah', en:'the Inevitable Reality', freq:3},
  ]},
  {label:'69:3 — وَمَا أَدْرَاكَ مَا الْحَاقَّةُ', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'And what', freq:700},
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'could make you know', freq:13},
    {ar:'مَا', tr:'mā', en:'what is', freq:2300},
    {ar:'الْحَاقَّةُ', tr:'al-ḥāqqah', en:'the Inevitable Reality', freq:3},
  ]},
  {label:'69:4 — كَذَّبَتْ ثَمُودُ وَعَادٌ بِالْقَارِعَةِ', words:[
    {ar:'كَذَّبَتْ', tr:'kadhdhabat', en:'Denied', freq:30},
    {ar:'ثَمُودُ', tr:'thamūd', en:'Thamud', freq:26},
    {ar:'وَعَادٌ', tr:'wa-ʿĀd', en:'and Ad', freq:7},
    {ar:'بِالْقَارِعَةِ', tr:'bil-qāriʿah', en:'the Striking Calamity', freq:2},
  ]},
  {label:'69:5 — فَأَمَّا ثَمُودُ فَأُهْلِكُوا بِالطَّاغِيَةِ', words:[
    {ar:'فَأَمَّا', tr:'fa-ammā', en:'As for', freq:20},
    {ar:'ثَمُودُ', tr:'thamūd', en:'Thamud', freq:26},
    {ar:'فَأُهْلِكُوا', tr:'fa-uhlikū', en:'they were destroyed', freq:4},
    {ar:'بِالطَّاغِيَةِ', tr:'biṭ-ṭāghiyah', en:'by the overwhelming blast', freq:1},
  ]},
  {label:'69:6 — وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ', words:[
    {ar:'وَأَمَّا', tr:'wa-ammā', en:'And as for', freq:14},
    {ar:'عَادٌ', tr:'ʿĀd', en:'Ad', freq:7},
    {ar:'فَأُهْلِكُوا', tr:'fa-uhlikū', en:'they were destroyed', freq:4},
    {ar:'بِرِيحٍ', tr:'bi-rīḥin', en:'by a wind', freq:6},
    {ar:'صَرْصَرٍ', tr:'ṣarṣarin', en:'furiously cold', freq:3},
    {ar:'عَاتِيَةٍ', tr:'ʿātiyah', en:'violent', freq:1},
  ]},
  {label:'69:7 — سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا …', words:[
    {ar:'سَخَّرَهَا', tr:'sakhkharahā', en:'He imposed it', freq:6},
    {ar:'عَلَيْهِمْ', tr:'ʿalayhim', en:'upon them', freq:700},
    {ar:'سَبْعَ', tr:'sabʿa', en:'seven', freq:12},
    {ar:'لَيَالٍ', tr:'layālin', en:'nights', freq:5},
    {ar:'وَثَمَانِيَةَ', tr:'wa-thamāniyata', en:'and eight', freq:2},
    {ar:'أَيَّامٍ', tr:'ayyāmin', en:'days', freq:40},
    {ar:'حُسُومًا', tr:'ḥusūman', en:'in succession', freq:1},
    {ar:'فَتَرَى', tr:'fa-tarā', en:'and you would see', freq:27},
    {ar:'الْقَوْمَ', tr:'al-qawm', en:'the people', freq:380},
    {ar:'فِيهَا', tr:'fīhā', en:'therein', freq:200},
    {ar:'صَرْعَىٰ', tr:'ṣarʿā', en:'fallen', freq:1},
    {ar:'كَأَنَّهُمْ', tr:'ka-annahum', en:'as if they were', freq:19},
    {ar:'أَعْجَازُ', tr:'aʿjāzu', en:'trunks of', freq:2},
    {ar:'نَخْلٍ', tr:'nakhlin', en:'palm trees', freq:5},
    {ar:'خَاوِيَةٍ', tr:'khāwiyah', en:'hollow', freq:4},
  ]},
  {label:'69:8 — فَهَلْ تَرَىٰ لَهُم مِّن بَاقِيَةٍ', words:[
    {ar:'فَهَلْ', tr:'fa-hal', en:'Then do', freq:17},
    {ar:'تَرَىٰ', tr:'tarā', en:'you see', freq:50},
    {ar:'لَهُم', tr:'lahum', en:'for them', freq:300},
    {ar:'مِّن', tr:'min', en:'any', freq:3000},
    {ar:'بَاقِيَةٍ', tr:'bāqiyah', en:'remnants', freq:2},
  ]},
  {label:'69:9 — وَجَاءَ فِرْعَوْنُ وَمَن قَبْلَهُ وَالْمُؤْتَفِكَاتُ بِالْخَاطِئَةِ', words:[
    {ar:'وَجَاءَ', tr:'wa-jāʾa', en:'And there came', freq:30},
    {ar:'فِرْعَوْنُ', tr:'firʿawn', en:'Pharaoh', freq:74},
    {ar:'وَمَن', tr:'wa-man', en:'and those', freq:100},
    {ar:'قَبْلَهُ', tr:'qablahu', en:'before him', freq:30},
    {ar:'وَالْمُؤْتَفِكَاتُ', tr:'wal-muʾtafikāt', en:'and the overturned cities', freq:2},
    {ar:'بِالْخَاطِئَةِ', tr:'bil-khāṭiʾah', en:'with sin', freq:1},
  ]},
  {label:'69:10 — فَعَصَوْا رَسُولَ رَبِّهِمْ فَأَخَذَهُمْ أَخْذَةً رَّابِيَةً', words:[
    {ar:'فَعَصَوْا', tr:'fa-ʿaṣaw', en:'They disobeyed', freq:2},
    {ar:'رَسُولَ', tr:'rasūla', en:'the messenger of', freq:330},
    {ar:'رَبِّهِمْ', tr:'rabbihim', en:'their Lord', freq:100},
    {ar:'فَأَخَذَهُمْ', tr:'fa-akhadhahum', en:'so He seized them', freq:10},
    {ar:'أَخْذَةً', tr:'akhdatan', en:'with a seizing', freq:4},
    {ar:'رَّابِيَةً', tr:'rābiyah', en:'that was excessive', freq:1},
  ]},
  {label:'69:11 — إِنَّا لَمَّا طَغَى الْمَاءُ حَمَلْنَاكُمْ فِي الْجَارِيَةِ', words:[
    {ar:'إِنَّا', tr:'innā', en:'Indeed We', freq:70},
    {ar:'لَمَّا', tr:'lammā', en:'when', freq:65},
    {ar:'طَغَى', tr:'ṭaghā', en:'overflowed', freq:5},
    {ar:'الْمَاءُ', tr:'al-māʾ', en:'the water', freq:59},
    {ar:'حَمَلْنَاكُمْ', tr:'ḥamalnākum', en:'We carried you', freq:2},
    {ar:'فِي', tr:'fī', en:'in', freq:3000},
    {ar:'الْجَارِيَةِ', tr:'al-jāriyah', en:'the sailing ship', freq:3},
  ]},
  {label:'69:12 — لِنَجْعَلَهَا لَكُمْ تَذْكِرَةً وَتَعِيَهَا أُذُنٌ وَاعِيَةٌ', words:[
    {ar:'لِنَجْعَلَهَا', tr:'li-najʿalahā', en:'that We might make it', freq:2},
    {ar:'لَكُمْ', tr:'lakum', en:'for you', freq:500},
    {ar:'تَذْكِرَةً', tr:'tadhkiratan', en:'a reminder', freq:8},
    {ar:'وَتَعِيَهَا', tr:'wa-taʿiyahā', en:'and would retain it', freq:1},
    {ar:'أُذُنٌ', tr:'udhunun', en:'an ear', freq:3},
    {ar:'وَاعِيَةٌ', tr:'wāʿiyah', en:'that is conscious', freq:1},
  ]},
  {label:'69:13 — فَإِذَا نُفِخَ فِي الصُّورِ نَفْخَةٌ وَاحِدَةٌ', words:[
    {ar:'فَإِذَا', tr:'fa-idhā', en:'Then when', freq:70},
    {ar:'نُفِخَ', tr:'nufikha', en:'is blown', freq:7},
    {ar:'فِي', tr:'fī', en:'into', freq:3000},
    {ar:'الصُّورِ', tr:'aṣ-ṣūr', en:'the Horn', freq:10},
    {ar:'نَفْخَةٌ', tr:'nafkhatun', en:'one blast', freq:2},
    {ar:'وَاحِدَةٌ', tr:'wāḥidah', en:'single', freq:20},
  ]},
  {label:'69:14 — وَحُمِلَتِ الْأَرْضُ وَالْجِبَالُ فَدُكَّتَا دَكَّةً وَاحِدَةً', words:[
    {ar:'وَحُمِلَتِ', tr:'wa-ḥumilati', en:'And are lifted', freq:1},
    {ar:'الْأَرْضُ', tr:'al-arḍ', en:'the earth', freq:461},
    {ar:'وَالْجِبَالُ', tr:'wal-jibāl', en:'and the mountains', freq:19},
    {ar:'فَدُكَّتَا', tr:'fa-dukkatā', en:'and crushed', freq:1},
    {ar:'دَكَّةً', tr:'dakkatan', en:'with a crushing', freq:2},
    {ar:'وَاحِدَةً', tr:'wāḥidatan', en:'single', freq:20},
  ]},
  {label:'69:15 — فَيَوْمَئِذٍ وَقَعَتِ الْوَاقِعَةُ', words:[
    {ar:'فَيَوْمَئِذٍ', tr:'fa-yawmaʾidhin', en:'Then on that Day', freq:16},
    {ar:'وَقَعَتِ', tr:'waqaʿati', en:'will occur', freq:5},
    {ar:'الْوَاقِعَةُ', tr:'al-wāqiʿah', en:'the Occurrence', freq:3},
  ]},
  {label:'69:16 — وَانشَقَّتِ السَّمَاءُ فَهِيَ يَوْمَئِذٍ وَاهِيَةٌ', words:[
    {ar:'وَانشَقَّتِ', tr:'wanshaqati', en:'And will split open', freq:2},
    {ar:'السَّمَاءُ', tr:'as-samāʾ', en:'the sky', freq:120},
    {ar:'فَهِيَ', tr:'fa-hiya', en:'for it is', freq:30},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:22},
    {ar:'وَاهِيَةٌ', tr:'wāhiyah', en:'fragile', freq:1},
  ]},
  {label:'69:17 — وَالْمَلَكُ عَلَىٰ أَرْجَائِهَا وَيَحْمِلُ عَرْشَ رَبِّكَ فَوْقَهُمْ يَوْمَئِذٍ ثَمَانِيَةٌ', words:[
    {ar:'وَالْمَلَكُ', tr:'wal-malak', en:'And the angels', freq:50},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'on', freq:700},
    {ar:'أَرْجَائِهَا', tr:'arjāʾihā', en:'its edges', freq:1},
    {ar:'وَيَحْمِلُ', tr:'wa-yaḥmilu', en:'and will bear', freq:3},
    {ar:'عَرْشَ', tr:'ʿarsha', en:'the Throne of', freq:22},
    {ar:'رَبِّكَ', tr:'rabbika', en:'your Lord', freq:170},
    {ar:'فَوْقَهُمْ', tr:'fawqahum', en:'above them', freq:12},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:22},
    {ar:'ثَمَانِيَةٌ', tr:'thamāniyah', en:'eight [angels]', freq:2},
  ]},
  {label:'69:18 — يَوْمَئِذٍ تُعْرَضُونَ لَا تَخْفَىٰ مِنكُمْ خَافِيَةٌ', words:[
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'That Day', freq:22},
    {ar:'تُعْرَضُونَ', tr:'tuʿraḍūn', en:'you will be exhibited', freq:3},
    {ar:'لَا', tr:'lā', en:'not', freq:5000},
    {ar:'تَخْفَىٰ', tr:'takhfā', en:'will be concealed', freq:4},
    {ar:'مِنكُمْ', tr:'minkum', en:'from you', freq:200},
    {ar:'خَافِيَةٌ', tr:'khāfiyah', en:'any secret', freq:1},
  ]},
  {label:'69:19 — فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ فَيَقُولُ هَاؤُمُ اقْرَءُوا كِتَابِيَهْ', words:[
    {ar:'فَأَمَّا', tr:'fa-ammā', en:'Then as for', freq:20},
    {ar:'مَنْ', tr:'man', en:'he who', freq:700},
    {ar:'أُوتِيَ', tr:'ūtiya', en:'is given', freq:50},
    {ar:'كِتَابَهُ', tr:'kitābahu', en:'his record', freq:10},
    {ar:'بِيَمِينِهِ', tr:'bi-yamīnihi', en:'in his right hand', freq:4},
    {ar:'فَيَقُولُ', tr:'fa-yaqūlu', en:'he will say', freq:30},
    {ar:'هَاؤُمُ', tr:'hāʾumu', en:'Here', freq:1},
    {ar:'اقْرَءُوا', tr:'iqraʾū', en:'read', freq:3},
    {ar:'كِتَابِيَهْ', tr:'kitābiyah', en:'my record', freq:2},
  ]},
  {label:'69:20 — إِنِّي ظَنَنتُ أَنِّي مُلَاقٍ حِسَابِيَهْ', words:[
    {ar:'إِنِّي', tr:'innī', en:'Indeed I', freq:150},
    {ar:'ظَنَنتُ', tr:'ẓanantu', en:'was certain', freq:5},
    {ar:'أَنِّي', tr:'annī', en:'that I [would]', freq:100},
    {ar:'مُلَاقٍ', tr:'mulāqin', en:'meet', freq:2},
    {ar:'حِسَابِيَهْ', tr:'ḥisābiyah', en:'my account', freq:2},
  ]},
  {label:'69:21 — فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ', words:[
    {ar:'فَهُوَ', tr:'fa-huwa', en:'So he is', freq:50},
    {ar:'فِي', tr:'fī', en:'in', freq:3000},
    {ar:'عِيشَةٍ', tr:'ʿīshatin', en:'a life', freq:3},
    {ar:'رَّاضِيَةٍ', tr:'rāḍiyah', en:'pleasant', freq:3},
  ]},
  {label:'69:22 — فِي جَنَّةٍ عَالِيَةٍ', words:[
    {ar:'فِي', tr:'fī', en:'In', freq:3000},
    {ar:'جَنَّةٍ', tr:'jannatin', en:'a Garden', freq:66},
    {ar:'عَالِيَةٍ', tr:'ʿāliyah', en:'elevated', freq:4},
  ]},
  {label:'69:23 — قُطُوفُهَا دَانِيَةٌ', words:[
    {ar:'قُطُوفُهَا', tr:'quṭūfuhā', en:'Its fruit clusters', freq:1},
    {ar:'دَانِيَةٌ', tr:'dāniyah', en:'hanging near', freq:2},
  ]},
  {label:'69:24 — كُلُوا وَاشْرَبُوا هَنِيئًا بِمَا أَسْلَفْتُمْ فِي الْأَيَّامِ الْخَالِيَةِ', words:[
    {ar:'كُلُوا', tr:'kulū', en:'Eat', freq:17},
    {ar:'وَاشْرَبُوا', tr:'washrabū', en:'and drink', freq:11},
    {ar:'هَنِيئًا', tr:'hanīʾan', en:'in satisfaction', freq:3},
    {ar:'بِمَا', tr:'bi-mā', en:'for what', freq:200},
    {ar:'أَسْلَفْتُمْ', tr:'aslaftum', en:'you put forth', freq:1},
    {ar:'فِي', tr:'fī', en:'in', freq:3000},
    {ar:'الْأَيَّامِ', tr:'al-ayyām', en:'the days', freq:40},
    {ar:'الْخَالِيَةِ', tr:'al-khāliyah', en:'past', freq:2},
  ]},
  {label:'69:25 — وَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِشِمَالِهِ فَيَقُولُ يَا لَيْتَنِي لَمْ أُوتَ كِتَابِيَهْ', words:[
    {ar:'وَأَمَّا', tr:'wa-ammā', en:'But as for', freq:14},
    {ar:'مَنْ', tr:'man', en:'he who', freq:700},
    {ar:'أُوتِيَ', tr:'ūtiya', en:'is given', freq:50},
    {ar:'كِتَابَهُ', tr:'kitābahu', en:'his record', freq:10},
    {ar:'بِشِمَالِهِ', tr:'bi-shimālihi', en:'in his left hand', freq:1},
    {ar:'فَيَقُولُ', tr:'fa-yaqūlu', en:'he will say', freq:30},
    {ar:'يَا لَيْتَنِي', tr:'yā laytanī', en:'Oh I wish', freq:10},
    {ar:'لَمْ', tr:'lam', en:'I had not', freq:700},
    {ar:'أُوتَ', tr:'ūta', en:'been given', freq:1},
    {ar:'كِتَابِيَهْ', tr:'kitābiyah', en:'my record', freq:2},
  ]},
  {label:'69:26 — وَلَمْ أَدْرِ مَا حِسَابِيَهْ', words:[
    {ar:'وَلَمْ', tr:'wa-lam', en:'And had not', freq:200},
    {ar:'أَدْرِ', tr:'adri', en:'known', freq:6},
    {ar:'مَا', tr:'mā', en:'what is', freq:2300},
    {ar:'حِسَابِيَهْ', tr:'ḥisābiyah', en:'my account', freq:2},
  ]},
  {label:'69:27 — يَا لَيْتَهَا كَانَتِ الْقَاضِيَةَ', words:[
    {ar:'يَا لَيْتَهَا', tr:'yā laytahā', en:'Oh I wish it', freq:2},
    {ar:'كَانَتِ', tr:'kānati', en:'had been', freq:150},
    {ar:'الْقَاضِيَةَ', tr:'al-qāḍiyah', en:'the decisive end', freq:1},
  ]},
  {label:'69:28 — مَا أَغْنَىٰ عَنِّي مَالِيَهْ', words:[
    {ar:'مَا', tr:'mā', en:'Not', freq:2300},
    {ar:'أَغْنَىٰ', tr:'aghnā', en:'availed', freq:8},
    {ar:'عَنِّي', tr:'ʿannī', en:'me', freq:30},
    {ar:'مَالِيَهْ', tr:'māliyah', en:'my wealth', freq:3},
  ]},
  {label:'69:29 — هَلَكَ عَنِّي سُلْطَانِيَهْ', words:[
    {ar:'هَلَكَ', tr:'halaka', en:'Gone', freq:7},
    {ar:'عَنِّي', tr:'ʿannī', en:'from me is', freq:30},
    {ar:'سُلْطَانِيَهْ', tr:'sulṭāniyah', en:'my authority', freq:1},
  ]},
  {label:'69:30 — خُذُوهُ فَغُلُّوهُ', words:[
    {ar:'خُذُوهُ', tr:'khudhūhu', en:'Seize him', freq:2},
    {ar:'فَغُلُّوهُ', tr:'fa-ghullūhu', en:'and shackle him', freq:1},
  ]},
  {label:'69:31 — ثُمَّ الْجَحِيمَ صَلُّوهُ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'الْجَحِيمَ', tr:'al-jaḥīm', en:'into Hellfire', freq:22},
    {ar:'صَلُّوهُ', tr:'ṣallūhu', en:'drive him', freq:1},
  ]},
  {label:'69:32 — ثُمَّ فِي سِلْسِلَةٍ ذَرْعُهَا سَبْعُونَ ذِرَاعًا فَاسْلُكُوهُ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'فِي', tr:'fī', en:'in', freq:3000},
    {ar:'سِلْسِلَةٍ', tr:'silsilatin', en:'a chain', freq:1},
    {ar:'ذَرْعُهَا', tr:'dharʿuhā', en:'whose length is', freq:1},
    {ar:'سَبْعُونَ', tr:'sabʿūna', en:'seventy', freq:2},
    {ar:'ذِرَاعًا', tr:'dhirāʿan', en:'cubits', freq:1},
    {ar:'فَاسْلُكُوهُ', tr:'faslukūhu', en:'insert him', freq:1},
  ]},
  {label:'69:33 — إِنَّهُ كَانَ لَا يُؤْمِنُ بِاللَّهِ الْعَظِيمِ', words:[
    {ar:'إِنَّهُ', tr:'innahu', en:'Indeed he', freq:100},
    {ar:'كَانَ', tr:'kāna', en:'used to', freq:680},
    {ar:'لَا', tr:'lā', en:'not', freq:5000},
    {ar:'يُؤْمِنُ', tr:'yuʾminu', en:'believe', freq:30},
    {ar:'بِاللَّهِ', tr:'billāhi', en:'in Allah', freq:150},
    {ar:'الْعَظِيمِ', tr:'al-ʿaẓīm', en:'the Most Great', freq:79},
  ]},
  {label:'69:34 — وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'And did not', freq:1000},
    {ar:'يَحُضُّ', tr:'yaḥuḍḍu', en:'encourage', freq:3},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'the', freq:700},
    {ar:'طَعَامِ', tr:'ṭaʿāmi', en:'feeding of', freq:15},
    {ar:'الْمِسْكِينِ', tr:'al-miskīn', en:'the needy', freq:20},
  ]},
  {label:'69:35 — فَلَيْسَ لَهُ الْيَوْمَ هَاهُنَا حَمِيمٌ', words:[
    {ar:'فَلَيْسَ', tr:'fa-laysa', en:'So there is not', freq:10},
    {ar:'لَهُ', tr:'lahu', en:'for him', freq:500},
    {ar:'الْيَوْمَ', tr:'al-yawm', en:'today', freq:400},
    {ar:'هَاهُنَا', tr:'hāhunā', en:'here', freq:8},
    {ar:'حَمِيمٌ', tr:'ḥamīm', en:'a devoted friend', freq:8},
  ]},
  {label:'69:36 — وَلَا طَعَامٌ إِلَّا مِنْ غِسْلِينٍ', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'And no', freq:1000},
    {ar:'طَعَامٌ', tr:'ṭaʿām', en:'food', freq:15},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:660},
    {ar:'مِنْ', tr:'min', en:'from', freq:3000},
    {ar:'غِسْلِينٍ', tr:'ghislīn', en:'discharge of wounds', freq:1},
  ]},
  {label:'69:37 — لَّا يَأْكُلُهُ إِلَّا الْخَاطِئُونَ', words:[
    {ar:'لَّا', tr:'lā', en:'None', freq:5000},
    {ar:'يَأْكُلُهُ', tr:'yaʾkuluhu', en:'will eat it', freq:4},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:660},
    {ar:'الْخَاطِئُونَ', tr:'al-khāṭiʾūn', en:'the sinners', freq:2},
  ]},
  {label:'69:38 — فَلَا أُقْسِمُ بِمَا تُبْصِرُونَ', words:[
    {ar:'فَلَا', tr:'fa-lā', en:'So I swear', freq:90},
    {ar:'أُقْسِمُ', tr:'uqsimu', en:'I swear', freq:7},
    {ar:'بِمَا', tr:'bi-mā', en:'by what', freq:200},
    {ar:'تُبْصِرُونَ', tr:'tubṣirūn', en:'you see', freq:8},
  ]},
  {label:'69:39 — وَمَا لَا تُبْصِرُونَ', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'And what', freq:700},
    {ar:'لَا', tr:'lā', en:'not', freq:5000},
    {ar:'تُبْصِرُونَ', tr:'tubṣirūn', en:'you see', freq:8},
  ]},
  {label:'69:40 — إِنَّهُ لَقَوْلُ رَسُولٍ كَرِيمٍ', words:[
    {ar:'إِنَّهُ', tr:'innahu', en:'Indeed it is', freq:100},
    {ar:'لَقَوْلُ', tr:'la-qawlu', en:'the word of', freq:3},
    {ar:'رَسُولٍ', tr:'rasūlin', en:'a messenger', freq:330},
    {ar:'كَرِيمٍ', tr:'karīm', en:'noble', freq:27},
  ]},
  {label:'69:41 — وَمَا هُوَ بِقَوْلِ شَاعِرٍ قَلِيلًا مَّا تُؤْمِنُونَ', words:[
    {ar:'وَمَا', tr:'wa-mā', en:'And it is not', freq:700},
    {ar:'هُوَ', tr:'huwa', en:'[it]', freq:500},
    {ar:'بِقَوْلِ', tr:'bi-qawli', en:'the word of', freq:5},
    {ar:'شَاعِرٍ', tr:'shāʿirin', en:'a poet', freq:2},
    {ar:'قَلِيلًا', tr:'qalīlan', en:'little', freq:33},
    {ar:'مَّا', tr:'mā', en:'[is what]', freq:2300},
    {ar:'تُؤْمِنُونَ', tr:'tuʾminūn', en:'you believe', freq:18},
  ]},
  {label:'69:42 — وَلَا بِقَوْلِ كَاهِنٍ قَلِيلًا مَّا تَذَكَّرُونَ', words:[
    {ar:'وَلَا', tr:'wa-lā', en:'Nor', freq:1000},
    {ar:'بِقَوْلِ', tr:'bi-qawli', en:'the word of', freq:5},
    {ar:'كَاهِنٍ', tr:'kāhinin', en:'a soothsayer', freq:2},
    {ar:'قَلِيلًا', tr:'qalīlan', en:'little', freq:33},
    {ar:'مَّا', tr:'mā', en:'[is what]', freq:2300},
    {ar:'تَذَكَّرُونَ', tr:'tadhakkarūn', en:'you remember', freq:10},
  ]},
  {label:'69:43 — تَنزِيلٌ مِّن رَّبِّ الْعَالَمِينَ', words:[
    {ar:'تَنزِيلٌ', tr:'tanzīlun', en:'A revelation', freq:10},
    {ar:'مِّن', tr:'min', en:'from', freq:3000},
    {ar:'رَّبِّ', tr:'rabbi', en:'the Lord of', freq:980},
    {ar:'الْعَالَمِينَ', tr:'al-ʿālamīn', en:'the worlds', freq:73},
  ]},
  {label:'69:44 — وَلَوْ تَقَوَّلَ عَلَيْنَا بَعْضَ الْأَقَاوِيلِ', words:[
    {ar:'وَلَوْ', tr:'wa-law', en:'And if he had', freq:80},
    {ar:'تَقَوَّلَ', tr:'taqawwala', en:'fabricated', freq:1},
    {ar:'عَلَيْنَا', tr:'ʿalaynā', en:'against Us', freq:100},
    {ar:'بَعْضَ', tr:'baʿḍa', en:'some', freq:130},
    {ar:'الْأَقَاوِيلِ', tr:'al-aqāwīl', en:'false sayings', freq:1},
  ]},
  {label:'69:45 — لَأَخَذْنَا مِنْهُ بِالْيَمِينِ', words:[
    {ar:'لَأَخَذْنَا', tr:'la-akhadhnā', en:'We would have seized him', freq:1},
    {ar:'مِنْهُ', tr:'minhu', en:'by', freq:100},
    {ar:'بِالْيَمِينِ', tr:'bil-yamīn', en:'the right hand', freq:5},
  ]},
  {label:'69:46 — ثُمَّ لَقَطَعْنَا مِنْهُ الْوَتِينَ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'Then', freq:340},
    {ar:'لَقَطَعْنَا', tr:'la-qaṭaʿnā', en:'We would have cut', freq:1},
    {ar:'مِنْهُ', tr:'minhu', en:'from him', freq:100},
    {ar:'الْوَتِينَ', tr:'al-watīn', en:'the aorta', freq:1},
  ]},
  {label:'69:47 — فَمَا مِنكُم مِّنْ أَحَدٍ عَنْهُ حَاجِزِينَ', words:[
    {ar:'فَمَا', tr:'fa-mā', en:'And none', freq:40},
    {ar:'مِنكُم', tr:'minkum', en:'of you', freq:200},
    {ar:'مِّنْ', tr:'min', en:'from', freq:3000},
    {ar:'أَحَدٍ', tr:'aḥadin', en:'anyone', freq:85},
    {ar:'عَنْهُ', tr:'ʿanhu', en:'from him', freq:50},
    {ar:'حَاجِزِينَ', tr:'ḥājizīn', en:'could prevent [Us]', freq:2},
  ]},
  {label:'69:48 — وَإِنَّهُ لَتَذْكِرَةٌ لِّلْمُتَّقِينَ', words:[
    {ar:'وَإِنَّهُ', tr:'wa-innahu', en:'And indeed it is', freq:15},
    {ar:'لَتَذْكِرَةٌ', tr:'la-tadhkiratun', en:'a reminder', freq:3},
    {ar:'لِّلْمُتَّقِينَ', tr:'lil-muttaqīn', en:'for the righteous', freq:17},
  ]},
  {label:'69:49 — وَإِنَّا لَنَعْلَمُ أَنَّ مِنكُمْ مُّكَذِّبِينَ', words:[
    {ar:'وَإِنَّا', tr:'wa-innā', en:'And indeed We', freq:15},
    {ar:'لَنَعْلَمُ', tr:'la-naʿlamu', en:'surely know', freq:5},
    {ar:'أَنَّ', tr:'anna', en:'that', freq:500},
    {ar:'مِنكُمْ', tr:'minkum', en:'among you are', freq:200},
    {ar:'مُّكَذِّبِينَ', tr:'mukadhdhibīn', en:'deniers', freq:6},
  ]},
  {label:'69:50 — وَإِنَّهُ لَحَسْرَةٌ عَلَى الْكَافِرِينَ', words:[
    {ar:'وَإِنَّهُ', tr:'wa-innahu', en:'And indeed it will be', freq:15},
    {ar:'لَحَسْرَةٌ', tr:'la-ḥasratun', en:'a regret', freq:2},
    {ar:'عَلَى', tr:'ʿalā', en:'upon', freq:700},
    {ar:'الْكَافِرِينَ', tr:'al-kāfirīn', en:'the disbelievers', freq:110},
  ]},
  {label:'69:51 — وَإِنَّهُ لَحَقُّ الْيَقِينِ', words:[
    {ar:'وَإِنَّهُ', tr:'wa-innahu', en:'And indeed it is', freq:15},
    {ar:'لَحَقُّ', tr:'la-ḥaqqu', en:'the truth of', freq:3},
    {ar:'الْيَقِينِ', tr:'al-yaqīn', en:'certainty', freq:5},
  ]},
  {label:'69:52 — فَسَبِّحْ بِاسْمِ رَبِّكَ الْعَظِيمِ', words:[
    {ar:'فَسَبِّحْ', tr:'fa-sabbiḥ', en:'So glorify', freq:5},
    {ar:'بِاسْمِ', tr:'bismi', en:'the name of', freq:20},
    {ar:'رَبِّكَ', tr:'rabbika', en:'your Lord', freq:170},
    {ar:'الْعَظِيمِ', tr:'al-ʿaẓīm', en:'the Most Great', freq:79},
  ]},
];
window.setupWBWLevel(WBW_DATA, 10);
