'use strict';
/* SURAH AL-ALA (87) — app.js */
window.STORAGE_KEY='alaQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s2Checked:false,s3Answers:{},s3Checked:false,s4Answers:{},s4Checked:false,s5Answers:{},s5Checked:false,s6Answers:{},s6Checked:false,s7Answers:{},s7Checked:false};

const REWARDS={
  2:{xp:80,gems:3,icon:'🌿',title:'GLORIFY THE MOST HIGH!',msg:"SubhanAllah — Subhana Rabbiya Al-A\'la! When you say these words in sujood (prostration), you are directly reciting Surah Al-Ala verse 1! The Prophet ﷺ commanded this du'a in sujood after this surah was revealed. Every sajdah, every prayer — you glorify the Most High with His own words. SubhanAllah!"},
  3:{xp:80,gems:3,icon:'📿',title:'THE PROMISE OF MEMORY!',msg:"Allahu Akbar! 'Sanuqri\'uka fa-la tansa!' We will make you RECITE and you will NOT FORGET. This was a divine promise to Prophet Muhammad ﷺ — the Quran would be preserved in his memory perfectly. And through him and the Ummah: the Quran has been memorised by millions across 1400+ years! The promise is fulfilled daily."},
  4:{xp:90,gems:3,icon:'🤲',title:'KHASHYAH OPENS THE HEART!',msg:"MashAllah! 'Sayyadhdhakkaru man yakhsha.' The one who FEARS Allah with awe will be reminded. Khashyah — not just fear but awe, reverence, awareness. This is the key that opens the heart to benefit from the Quran and reminder. A heart with khashyah absorbs every reminder. Cultivate khashyah and every reminder will benefit you!"},
  5:{xp:90,gems:4,icon:'✨',title:'SUCCESS FORMULA FOUND!',msg:"SubhanAllah! 'Qad aflaha man tazakka — wa dhakara isma Rabbih fa-salla.' CERTAINLY SUCCEEDED who purified himself AND mentioned Allah's name AND prayed. Three steps: purification (tazakka), dhikr (dhakara), salah (salla). This is the formula for falah — for complete success. Keep purifying, keep in dhikr, keep your prayers!"},
  6:{xp:100,gems:4,icon:'⚡',title:'DUNYA vs AKHIRA DECIDED!',msg:"Allahu Akbar! 'Bal tu\'thirun al-hayat al-dunya — wa al-akhiratu khayrun wa abqa.' But you PREFER the worldly life — while the Hereafter is BETTER AND MORE LASTING. Better in quality. Longer in duration. The choice is clear when you see it like this. Use the world as a vehicle to the Hereafter — not as a destination."},
  7:{xp:120,gems:5,icon:'📜',title:'SURAH AL-ALA COMPLETE!',msg:"ALLAHUMMA BARIK! All 7 levels of Surah Al-Ala complete! Glorify the Most High. He will make you not forget. Fear Allah to be reminded. Purify and pray for success. Prefer the Hereafter. And remember: these truths were in the scrolls of Ibrahim and Musa too! This message is eternal. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:7,rewards:REWARDS,
  tileIcons:['📖','🌿','📿','🤲','✨','⚡','📜'],
  tileLabels:['Word by Word','Glorify','Recite','Who Fears','Purify','Dunya/Akhira','Scrolls'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Ala — The Most High! Glorify His name. He will make you recite without forgetting. Fear Allah and be reminded. Purify yourself and succeed. Prefer the Hereafter. This is in the earliest scriptures too. 7 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Sabbihi isma Rabbika al-A\'la" — Keep glorifying! 🌿`,
    complete:name=>`MashAllah, ${name}! Surah Al-Ala complete! "Qad aflaha man tazakka." He has certainly succeeded who purified himself. May we be among them! Ameen! 📜`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1 — سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى', words:[
    {ar:'الْأَعْلَى', tr:'al-aʿlā', en:'the Most High', freq:14},
    {ar:'رَبِّكَ', tr:'rabbika', en:'your Lord', freq:49},
    {ar:'اسْمَ', tr:'isma', en:'the name of', freq:22},
    {ar:'سَبِّحِ', tr:'sabbiḥ', en:'glorify', freq:7},
  ]},
  {label:'Verse 2-3 — الَّذِي خَلَقَ فَسَوَّىٰ · وَالَّذِي قَدَّرَ فَهَدَىٰ', words:[
    {ar:'فَهَدَىٰ', tr:'fa-hadā', en:'and then guided', freq:169},
    {ar:'قَدَّرَ', tr:'qaddara', en:'measured/destined', freq:13},
    {ar:'فَسَوَّىٰ', tr:'fa-sawwā', en:'and proportioned', freq:4},
    {ar:'خَلَقَ', tr:'khalaqa', en:'created', freq:29},
    'alladhi',
  ]},
  {label:'Verse 14-15 — قَدْ أَفْلَحَ مَن تَزَكَّىٰ · وَذَكَرَ اسْمَ رَبِّهِ فَصَلَّىٰ', words:[
    {ar:'فَصَلَّىٰ', tr:'fa-ṣallā', en:'and prayed', freq:83},
    {ar:'رَبِّهِ', tr:'rabbihi', en:'his Lord', freq:49},
    {ar:'اسْمَ', tr:'isma', en:'the name of', freq:22},
    {ar:'وَذَكَرَ', tr:'wa-dhakara', en:'and remembers', freq:267},
    {ar:'تَزَكَّىٰ', tr:'tazakkā', en:'purifies himself', freq:5},
    {ar:'أَفْلَحَ', tr:'aflaḥa', en:'has succeeded', freq:10},
    {ar:'قَدْ', tr:'qad', en:'certainly', freq:406},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS=[{id:'i1',text:'🌿 Khalq\n& Taswiya',zone:'z1'},{id:'i2',text:'🎯 Qadr\n& Huda',zone:'z2'},{id:'i3',text:'🌾 Pasture\n& Debris',zone:'z3'}];
const S1_ZONES=[{id:'z1',desc:'"Alladhi khalaqa fa-sawwa" (87:2) — Who CREATED and then PROPORTIONED. "Khalaqa" — brought into existence from nothing. "Sawwa" — balanced, proportioned, made even. Every creation of Allah is complete and perfectly proportioned — nothing missing, nothing excess.'},{id:'z2',desc:'"Wa alladhi qaddara fa-hada" (87:3) — Who DESTINED and then GUIDED. "Qaddara" — decreed, fixed the measure of all things. "Hada" — guided each thing to fulfil its purpose. The bee is guided to its hive, the seed to its growth, the human to what benefits them — if they listen.'},{id:'z3',desc:'"Wa alladhi akhraja al-mar\'a — fa-ja\'alahu ghuthaan ahwa" (87:4-5) — Who brought out the pasture — then made it dark debris. Green, thriving pasture becomes dry, withered, dark debris. The world\'s cycles of growth and decay — all under Allah\'s command.'}];

const S2_QUIZ=[
  {q:'What is the significance of "Sanuqri\'uka" (سَنُقْرِئُكَ) in 87:6?',
   opts:['"You will read the Quran yourself through your own effort"',
         '"We will MAKE you recite" — Allah deposits the Quran into his heart',
         '"We will send you additional revelations in the future"',
         '"You should recite the Quran loudly for people to hear"'],
   correct:1},
  {q:'What does the promise "fa-la tansa" (فَلَا تَنسَىٰ) mean?',
   opts:['The Prophet ﷺ would never forget anything at all in his life',
         'Believers who memorise the Quran will never have poor memory',
         'You will NOT FORGET the Quran — Allah preserves it for you',
         'The Quran will never be completely lost from this world'],
   correct:2},
  {q:'What is the exception "illa ma sha\' Allah" (إِلَّا مَا شَاءَ اللَّه) in 87:7?',
   opts:['EXCEPT what Allah wills — verses later abrogated were allowed to fade',
         'Sometimes the Prophet ﷺ would forget important major events',
         'The Prophet ﷺ could forget non-Quranic matters and other things',
         'Allah would sometimes reveal new details to replace forgotten ones'],
   correct:0},
  {q:'Why does 87:7 say "He knows the declared and what is hidden" after the promise?',
   opts:['To remind us that Allah knows whenever we miss our prayers',
         'To warn the Prophet ﷺ not to hide any of the revelations',
         'To tell all believers to be completely honest in their recitation',
         'The ALL-KNOWING One making this promise backs it with perfect knowledge'],
   correct:3},
];

const S3_QUIZ=[
  {q:'What does "yakhsha" (يَخْشَى) mean in "sayyadhdhakkaru man yakhsha" (87:10)?',
   opts:['Anyone who hears the reminder will automatically benefit from it',
         'Those who regularly pray their five daily prayers',
         'Those who memorise and recite the entire Quran by heart',
         'Who fears Allah with awe — khashyah opens the heart to reminder'],
   correct:3},
  {q:'Who is "al-ashqa" (الأَشْقَى) — the most wretched — in 87:11?',
   opts:['The person who commits many sins but eventually repents',
         'The one who actively AVOIDS the reminder — dodging it deliberately',
         'Poor people who simply cannot access religious education',
         'Those who memorised the Quran and then later forgot it'],
   correct:1},
  {q:'What happens to "al-ashqa" according to 87:12?',
   opts:['They will enter a small fire for a limited and defined time',
         'They will face judgment but ultimately be forgiven by Allah',
         'They will enter AL-NAR AL-KUBRA — the GREAT fire',
         'They will be condemned to wander without any purpose'],
   correct:2},
  {q:'What is the spiritual connection between khashyah and benefiting from reminder?',
   opts:['Khashyah makes people pray more and therefore study more Quran',
         'Khashyah is a quality only found in scholars and senior imams',
         'Khashyah means being afraid of punishment — not spiritual openness',
         'A humble, khashyah-filled heart is soft enough for reminder to penetrate'],
   correct:3},
];

const S4_QUIZ=[
  {q:'What does "tazakka" (تَزَكَّى) mean in "qad aflaha man tazakka" (87:14)?',
   opts:['Someone who pays the Zakat al-Fitr charity on Eid',
         'Someone who regularly gives voluntary charity throughout the year',
         'To PURIFY oneself from shirk, wrong beliefs, spiritual diseases',
         'Someone who completely avoids all worldly activities and life'],
   correct:2},
  {q:'What is the meaningful sequence in 87:14-15: tazakka → dhakara → salla?',
   opts:['They are three independent acts with no connection or order',
         'Purify (tazakka) → remember Allah (dhakara) → pray (salla)',
         'They are three alternative paths — any one leads to success',
         'Prayer comes before dhikr in the correct Islamic sequence'],
   correct:1},
  {q:'"Qad aflaha" (قَدْ أَفْلَحَ) — what does "qad" add to the meaning?',
   opts:['QAD adds CERTAINTY — he has CERTAINLY and DEFINITIVELY succeeded',
         'It makes the verb future tense rather than past tense',
         'It makes the whole statement a conditional hypothetical',
         'It limits the success to the afterlife, not this world'],
   correct:0},
  {q:'Why does "mentions Allah\'s name" (dhakara) come before "prays" (salla)?',
   opts:['Because remembrance (dhikr) is more important than prayer (salah)',
         'Because du\'a is considered a higher act than formal salah',
         'Because dhikr was revealed to the Prophet before salah was',
         'Consciousness of Allah must be established before prayer becomes real'],
   correct:3},
];

const S5_QUIZ=[
  {q:'What does "tu\'thirun" (تُؤْثِرُونَ) mean in 87:16?',
   opts:['You are simply busy with the life of this world',
         'You PREFER and PRIORITIZE this world over the Hereafter',
         'You are unaware of the flaws of the worldly life',
         'You are afraid of the Hereafter so you focus here'],
   correct:1},
  {q:'The Hereafter is "khayrun wa abqa" (87:17) — what two dimensions?',
   opts:['More peaceful in nature and far more beautiful to see',
         'More exciting in experience and more absolutely certain',
         'More accessible to reach and ultimately more rewarding',
         'BETTER in quality (khayr) AND MORE LASTING in duration (abqa)'],
   correct:3},
  {q:'This verse doesn\'t say "don\'t live in this world." What does it teach?',
   opts:['Muslims should completely withdraw from all worldly life',
         'Correct the PRIORITY — use the world as a vehicle to the Hereafter',
         'The world is inherently evil and should be actively avoided',
         'Only religious activities have any real value in this life'],
   correct:1},
  {q:'How does "Al-A\'la" contrast with "al-hayat al-dunya" linguistically?',
   opts:['There is no real linguistic connection between these terms',
         'Both words actually come from the exact same Arabic root',
         'The comparison is between Allah\'s name and human weakness generally',
         'Al-A\'la = MOST HIGH; al-dunya = LOWEST — exact opposites in Arabic'],
   correct:3},
];

const S6_QUIZ=[
  {q:'What are the "first scriptures" (al-suhuf al-ula) mentioned in 87:18?',
   opts:['The first copies of the Quran written by the companions',
         'The earliest scriptures — the scrolls of Ibrahim and Musa',
         'Only the stone tablets of the ten commandments',
         'The oral traditions passed down from the time of Adam'],
   correct:1},
  {q:'What is the significance of linking this surah to "suhuf Ibrahim wa Musa"?',
   opts:['To show Ibrahim and Musa were more important than Muhammad ﷺ',
         'The UNITY of the message — these truths were always in earlier scriptures',
         'To suggest Muslims should actually follow the scrolls of Ibrahim',
         'To prove Ibrahim and Musa knew about Prophet Muhammad ﷺ'],
   correct:1},
  {q:'What does the Prophet ﷺ teach us to say in sujood based on 87:1?',
   opts:['"SubhanAllahu wa bi-hamdihi" in every sujood',
         'SUBHANA RABBIYA AL-A\'LA — he commanded this after this surah',
         'The entire Surah Al-Ala in every single prostration',
         'The basmalah followed by the opening verse of this surah'],
   correct:1},
  {q:'What is the central message connecting all parts of Surah Al-Ala?',
   opts:['Study Islam carefully so you can become a proper scholar',
         'Focus on avoiding sin more than actually doing good deeds',
         'Make sure your prayers are technically and precisely correct',
         'Orient toward Allah — glorify, trust, purify, pray, prefer the Hereafter'],
   correct:3},
];

function renderSection2Game(){renderDragDrop(2,S1_ITEMS,S1_ZONES);}function checkSection2(){checkDragDrop(2,S1_ZONES);}
function renderSection3Game(){renderQuiz(3,S2_QUIZ);}function checkSection3(){checkQuiz(3,S2_QUIZ);}
function renderSection4Game(){renderQuiz(4,S3_QUIZ);}function checkSection4(){checkQuiz(4,S3_QUIZ);}
function renderSection5Game(){renderQuiz(5,S4_QUIZ);}function checkSection5(){checkQuiz(5,S4_QUIZ);}
function renderSection6Game(){renderQuiz(6,S5_QUIZ);}function checkSection6(){checkQuiz(6,S5_QUIZ);}
function renderSection7Game(){renderQuiz(7,S6_QUIZ);}function checkSection7(){checkQuiz(7,S6_QUIZ);}

function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#c8a020';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#041008';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#1a6030';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#041008');sk.addColorStop(1,'#0c2010');ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  if(n<1){_lbl(ctx,W,"🌿 Complete levels to build the Garden of Glorification!",0,6);return;}
  // Ground
  ctx.fillStyle='#102010';ctx.fillRect(0,210,W,40);ctx.fillStyle='#183018';ctx.fillRect(0,210,W,5);
  if(n<2){_lbl(ctx,W,"🌿 Earth appears — 1/6",1,6);return;}
  // Grasses
  for(let g=0;g<16;g++){const gx=30+g*33;ctx.fillStyle='#1a5010';ctx.fillRect(gx,194,6,16);ctx.fillStyle='#0a3008';ctx.fillRect(gx-4,184,14,14);}
  if(n<3){_lbl(ctx,W,"🌱 Pasture grows — 2/6",2,6);return;}
  // Golden "Al-Ala" text above
  const pulse=0.5+Math.sin(Date.now()*0.002)*0.4;ctx.fillStyle=`rgba(200,160,32,${pulse})`;ctx.font='10px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الأَعْلَى',W/2,45);ctx.textAlign='left';
  if(n<4){_lbl(ctx,W,"✨ The Most High above — 3/6",3,6);return;}
  // Light beam from above
  ctx.fillStyle='rgba(200,160,32,0.08)';ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2-60,210);ctx.lineTo(W/2+60,210);ctx.closePath();ctx.fill();
  if(n<5){_lbl(ctx,W,"☀️ Divine light descends — 4/6",4,6);return;}
  // Two scrolls (Ibrahim and Musa)
  [[60,150],[W-140,150]].forEach(([sx,sy])=>{fillRect(ctx,sx,sy,80,50,'#201808');ctx.strokeStyle='rgba(200,160,32,0.5)';ctx.lineWidth=1;ctx.strokeRect(sx,sy,80,50);});
  if(n<6){_lbl(ctx,W,"📜 Scrolls of Ibrahim and Musa — 5/6",5,6);return;}
  ctx.fillStyle='#c8a020';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! 🌿 AL-ALA COMPLETE!",W/2,237);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Sabbihi isma Rabbika al-A\'la — Qad aflaha man tazakka"',W/2,H-2);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
