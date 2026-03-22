'use strict';
/* SURAH AL-INSHIQAQ (84) — app.js */
window.STORAGE_KEY='inshiqaqQuestSave';
window.state = window.buildDefaultState(7);

const REWARDS={
  1: {xp:60, gems:3, icon:'📖', title:'Words Learned!', msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:80,gems:3,icon:'🌅',title:'SKY SPLITS, EARTH STRETCHES!',msg:"SubhanAllah! The sky splits and listens to its Lord. The earth stretches and listens to its Lord. 'Wa adhinat li-Rabbiha wa huqqat' — it was RIGHT for them to do so! The entire universe obeys Allah completely. How about us — do we listen to our Lord and comply?"},
  3:{xp:80,gems:3,icon:'🚶',title:'THE JOURNEY UNDERSTOOD!',msg:"Allahu Akbar! 'Ya ayyuha al-insan, innaka kadihun ila Rabbika kadhan fa-mulaqihi.' You are STRIVING toward your Lord — every breath, every heartbeat, every step is part of this journey. And you WILL meet Him. 'Fa-mulaqihi' — you will meet Him. Prepare well for that meeting!"},
  4:{xp:90,gems:3,icon:'📖',title:'RIGHT HAND PEOPLE KNOWN!',msg:"MashAllah! The right-hand people receive their book joyfully. 'Hisaban yasiran' — an EASY reckoning! And then: 'yanqalibu ila ahlihi masrura' — they return to their people OVERJOYED. The reunion of believers in Paradise is a celebration! May Allah make us among them. Ameen!"},
  5:{xp:90,gems:4,icon:'⚠️',title:'THE WARNING RECEIVED!',msg:"SubhanAllah! The person given their book from behind their back — 'yad\'u thuburan' — calls for destruction. 'Wa yasla sa\'iran' — enters blazing fire. The contrast is total. There are only two paths: the right-hand path of the Abrar, or the left-hand path of the Fujjar. Which path are you building today?"},
  6:{xp:100,gems:4,icon:'🔄',title:'STAGES OF LIFE MAPPED!',msg:"Allahu Akbar! 'La-tarkabunna tabaqan \'an tabaqin.' You will SURELY pass through stage after stage. Womb, birth, childhood, youth, adulthood, old age, death, grave, resurrection, judgment. Every stage is a gift — and every stage passes. The meeting with Allah is the final stage. Use each stage well!"},
  7:{xp:120,gems:5,icon:'🌙',title:'SURAH AL-INSHIQAQ COMPLETE!',msg:"ALLAHUMMA BARIK! All 7 levels of Surah Al-Inshiqaq complete! You are striving toward your Lord, stage after stage. The sky will split. The earth will stretch. You will receive your book. May Allah give us books in our right hands, easy reckonings, and joyful returns to our people. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:7, wbwSection:1,rewards:REWARDS,
  tileIcons:['📖','🌅','🚶','📖','⚠️','🔄','🌙'],
  tileLabels:['Word by Word','Sky Splits','Striving','Right Hand','Behind Back','Stages','Complete'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Inshiqaq — The Splitting! Sky splits, earth stretches, and you WILL meet your Lord. Right-hand people: joyful return. Left-hand people: destruction. Stage after stage — the journey is real. 7 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Innaka kadihun ila Rabbika kadhan fa-mulaqihi" — Keep striving! 🚶`,
    complete:name=>`MashAllah, ${name}! Surah Al-Inshiqaq complete! Stage after stage you've journeyed through this surah. May your book be given in your right hand. Ameen! 🌙`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'84:1 — إِذَا السَّمَاءُ انشَقَّتْ', words:[
    {ar:'انشَقَّتْ', tr:'inshaqqat', en:'has split open', freq:1},
    'al-sama',
    'idha',
  ]},
  {label:'84:2 — وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ', words:[
    {ar:'وَحُقَّتْ', tr:'wa-ḥuqqat', en:'as it must', freq:1},
    {ar:'لِرَبِّهَا', tr:'li-rabbihā', en:'its Lord', freq:49},
    {ar:'وَأَذِنَتْ', tr:'wa-adhinat', en:'and obeyed', freq:2},
  ]},
  {label:'84:3 — وَإِذَا الْأَرْضُ مُدَّتْ', words:[
    {ar:'مُدَّتْ', tr:'muddat', en:'is stretched out', freq:1},
    {ar:'الْأَرْضُ', tr:'al-arḍ', en:'the earth', freq:461},
    {ar:'وَإِذَا', tr:'wa idhā', en:'and when', freq:406},
  ]},
  {label:'84:4 — وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ', words:[
    {ar:'وَتَخَلَّتْ', tr:'wa-takhallat', en:'and became empty', freq:1},
    'fiiha',
    'ma',
    {ar:'وَأَلْقَتْ', tr:'wa-alqat', en:'and cast out', freq:6},
  ]},
  {label:'84:5 — وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ', words:[
    {ar:'وَحُقَّتْ', tr:'wa-ḥuqqat', en:'as it must', freq:1},
    {ar:'لِرَبِّهَا', tr:'li-rabbihā', en:'its Lord', freq:49},
    {ar:'وَأَذِنَتْ', tr:'wa-adhinat', en:'and obeyed', freq:2},
  ]},
  {label:'84:6 — يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ', words:[
    {ar:'فَمُلَاقِيهِ', tr:'fa-mulāqīhi', en:'and you will meet Him', freq:1},
    {ar:'كَدْحًا', tr:'kadḥan', en:'a [great] striving', freq:1},
    'rabbika',
    'ila',
    {ar:'كَادِحٌ', tr:'kādiḥ', en:'labouring', freq:1},
    {ar:'إِنَّكَ', tr:'innaka', en:'indeed you are', freq:743},
    {ar:'الْإِنسَانُ', tr:'al-insān', en:'O mankind', freq:65},
    {ar:'أَيُّهَا', tr:'ayyuhā', en:'O you', freq:142},
    'ya',
  ]},
  {label:'84:7 — فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ', words:[
    {ar:'بِيَمِينِهِ', tr:'bi-yamīnihi', en:'in his right hand', freq:5},
    {ar:'كِتَابَهُ', tr:'kitābahu', en:'his book', freq:29},
    {ar:'أُوتِيَ', tr:'ūtiya', en:'is given', freq:68},
    'man',
    {ar:'فَأَمَّا', tr:'fa-ammā', en:'as for', freq:18},
  ]},
  {label:'84:8 — فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيرًا', words:[
    {ar:'يَسِيرًا', tr:'yasīran', en:'an easy [one]', freq:7},
    {ar:'حِسَابًا', tr:'ḥisāban', en:'a reckoning', freq:32},
    {ar:'يُحَاسَبُ', tr:'yuḥāsabu', en:'he will be judged', freq:32},
    {ar:'فَسَوْفَ', tr:'fa-sawfa', en:'then he will', freq:60},
  ]},
  {label:'84:9 — وَيَنقَلِبُ إِلَىٰ أَهْلِهِ مَسْرُورًا', words:[
    {ar:'مَسْرُورًا', tr:'masrūran', en:'delighted', freq:1},
    {ar:'أَهْلِهِ', tr:'ahlihi', en:'his people', freq:73},
    'ila',
    {ar:'وَيَنقَلِبُ', tr:'wa yanqalibu', en:'and will return', freq:5},
  ]},
  {label:'84:10 — وَأَمَّا مَنْ أُوتِيَ كِتَابَهُ وَرَاءَ ظَهْرِهِ', words:[
    {ar:'ظَهْرِهِ', tr:'ẓahrihi', en:'his back', freq:12},
    {ar:'وَرَاءَ', tr:'warāʾa', en:'behind', freq:15},
    {ar:'كِتَابَهُ', tr:'kitābahu', en:'his book', freq:29},
    {ar:'أُوتِيَ', tr:'ūtiya', en:'is given', freq:68},
    'man',
    {ar:'وَأَمَّا', tr:'wa-ammā', en:'but as for', freq:18},
  ]},
  {label:'84:11 — فَسَوْفَ يَدْعُو ثُبُورًا', words:[
    {ar:'ثُبُورًا', tr:'thubūran', en:'destruction', freq:1},
    {ar:'يَدْعُو', tr:'yadʿū', en:'he will call out', freq:76},
    {ar:'فَسَوْفَ', tr:'fa-sawfa', en:'then he will', freq:60},
  ]},
  {label:'84:12 — وَيَصْلَىٰ سَعِيرًا', words:[
    {ar:'سَعِيرًا', tr:'saʿīran', en:'a Blaze', freq:17},
    {ar:'وَيَصْلَىٰ', tr:'wa yaṣlā', en:'and will burn in', freq:3},
  ]},
  {label:'84:13 — إِنَّهُ كَانَ فِي أَهْلِهِ مَسْرُورًا', words:[
    {ar:'مَسْرُورًا', tr:'masrūran', en:'happy / joyful', freq:1},
    {ar:'أَهْلِهِ', tr:'ahlihi', en:'his people', freq:73},
    'fi',
    'kaana',
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed he', freq:743},
  ]},
  {label:'84:14 — إِنَّهُ ظَنَّ أَن لَّن يَحُورَ', words:[
    {ar:'يَحُورَ', tr:'yaḥūra', en:'he would return [to Allah]', freq:1},
    {ar:'لَّن', tr:'lan', en:'never', freq:167},
    {ar:'أَن', tr:'an', en:'that', freq:986},
    {ar:'ظَنَّ', tr:'ẓanna', en:'he thought', freq:69},
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed he', freq:743},
  ]},
  {label:'84:15 — بَلَىٰ إِنَّ رَبَّهُ كَانَ بِهِ بَصِيرًا', words:[
    {ar:'بَصِيرًا', tr:'baṣīran', en:'All-Seeing', freq:51},
    'bihi',
    'kaana',
    {ar:'رَبَّهُ', tr:'rabbahu', en:'his Lord', freq:49},
    'inna',
    {ar:'بَلَىٰ', tr:'balā', en:'yes indeed', freq:22},
  ]},
  {label:'84:16 — فَلَا أُقْسِمُ بِالشَّفَقِ', words:[
    {ar:'بِالشَّفَقِ', tr:'bil-shafaq', en:'by the twilight glow', freq:1},
    {ar:'أُقْسِمُ', tr:'uqsimu', en:'I swear', freq:16},
    {ar:'فَلَا', tr:'falā', en:'so no', freq:50},
  ]},
  {label:'84:17 — وَاللَّيْلِ وَمَا وَسَقَ', words:[
    {ar:'وَسَقَ', tr:'wasaqa', en:'it envelops', freq:1},
    {ar:'وَمَا', tr:'wa mā', en:'and what', freq:2005},
    {ar:'وَاللَّيْلِ', tr:'wal-layl', en:'and the night', freq:72},
  ]},
  {label:'84:18 — وَالْقَمَرِ إِذَا اتَّسَقَ', words:[
    {ar:'اتَّسَقَ', tr:'ittasaqa', en:'it becomes full', freq:1},
    'idha',
    {ar:'وَالْقَمَرِ', tr:'wal-qamar', en:'and the moon', freq:27},
  ]},
  {label:'84:19 — لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍ', words:[
    {ar:'طَبَقٍ', tr:'ṭabaq', en:'stage', freq:2},
    {ar:'عَن', tr:'ʿan', en:'after', freq:264},
    {ar:'طَبَقًا', tr:'ṭabaqan', en:'stage', freq:2},
    {ar:'لَتَرْكَبُنَّ', tr:'la-tarkabunna', en:'you will surely pass through', freq:1},
  ]},
  {label:'84:20 — فَمَا لَهُمْ لَا يُؤْمِنُونَ', words:[
    {ar:'يُؤْمِنُونَ', tr:'yuʾminūn', en:'they believe', freq:811},
    'la',
    {ar:'لَهُمْ', tr:'lahum', en:'what is with them', freq:850},
    {ar:'فَمَا', tr:'fa-mā', en:'so what is [wrong]', freq:2005},
  ]},
  {label:'84:21 — وَإِذَا قُرِئَ عَلَيْهِمُ الْقُرْآنُ لَا يَسْجُدُونَ', words:[
    {ar:'يَسْجُدُونَ', tr:'yasjudūn', en:'they prostrate', freq:34},
    'la',
    {ar:'الْقُرْآنُ', tr:'al-Qurʾān', en:'the Quran', freq:70},
    {ar:'عَلَيْهِمُ', tr:'ʿalayhim', en:'to them', freq:108},
    {ar:'قُرِئَ', tr:'quriʾa', en:'is recited', freq:70},
    {ar:'وَإِذَا', tr:'wa idhā', en:'and when', freq:406},
  ]},
  {label:'84:22 — بَلِ الَّذِينَ كَفَرُوا يُكَذِّبُونَ', words:[
    {ar:'يُكَذِّبُونَ', tr:'yukadhdhibūn', en:'deny', freq:79},
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieved', freq:525},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    {ar:'بَلِ', tr:'bal', en:'rather / nay', freq:126},
  ]},
  {label:'84:23 — وَاللَّهُ أَعْلَمُ بِمَا يُوعُونَ', words:[
    {ar:'يُوعُونَ', tr:'yūʿūn', en:'they gather [in their hearts]', freq:1},
    {ar:'بِمَا', tr:'bimā', en:'of what', freq:413},
    {ar:'أَعْلَمُ', tr:'aʿlamu', en:'most knowing', freq:50},
    {ar:'وَاللَّهُ', tr:'wallāhu', en:'and Allah', freq:2699},
  ]},
  {label:'84:24 — فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ', words:[
    {ar:'أَلِيمٍ', tr:'alīm', en:'painful', freq:72},
    {ar:'بِعَذَابٍ', tr:'bi-ʿadhāb', en:'of a punishment', freq:373},
    {ar:'فَبَشِّرْهُم', tr:'fa-bashshirhum', en:'so give them tidings', freq:2},
  ]},
  {label:'84:25 — إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ', words:[
    {ar:'مَمْنُونٍ', tr:'mamnūn', en:'interrupted', freq:3},
    {ar:'غَيْرُ', tr:'ghayru', en:'without being', freq:45},
    {ar:'أَجْرٌ', tr:'ajr', en:'a reward', freq:105},
    {ar:'لَهُمْ', tr:'lahum', en:'for them is', freq:850},
    {ar:'الصَّالِحَاتِ', tr:'al-ṣāliḥāt', en:'righteous deeds', freq:73},
    {ar:'وَعَمِلُوا', tr:'wa ʿamilū', en:'and did', freq:73},
    {ar:'آمَنُوا', tr:'āmanū', en:'believed', freq:811},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    'illa',
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS=[{id:'i1',text:'السَّمَاءُ\nانشَقَّتْ',zone:'z1'},{id:'i2',text:'الْأَرْضُ\nمُدَّتْ',zone:'z2'},{id:'i3',text:'وَأَذِنَتْ\nلِرَبِّهَا',zone:'z3'},{id:'i4',text:'وَحُقَّتْ',zone:'z4'}];
const S1_ZONES=[{id:'z1',desc:'The sky splits open — the universe\'s ceiling cracks (84:1)'},{id:'z2',desc:'The earth is stretched flat and spread out (84:3)'},{id:'z3',desc:'And listened to its Lord and obeyed His command (84:2,5)'},{id:'z4',desc:'As it must — it was the right thing to obey (84:2,5)'}];

const S2_QUIZ=[
  {q:'What does "kadihun" (كَادِحٌ) mean in "Innaka kadihun ila Rabbika kadhan" (84:6)?',
   opts:['Walking slowly and without real purpose through life',
         'Striving, laboring, toiling with great and exhausting effort',
         'Sleeping and simply waiting for the moment of death',
         'Being endlessly distracted by all the worldly pleasures'],
   correct:1},
  {q:'What does "fa-mulaqihi" (فَمُلَاقِيهِ) mean in 84:6?',
   opts:['You might meet Allah if you are truly righteous enough',
         'You will try in vain to avoid meeting your Lord',
         'Then you will MEET HIM — absolutely and certainly',
         'You will be judged by Allah from a safe distance'],
   correct:2},
  {q:'What does striving "ILA Rabbika" (toward your Lord) tell us?',
   opts:['All striving is ultimately for worldly success and status',
         'Only believers who intend Allah are truly striving toward Him',
         'Every life — believer or not — leads to meeting Allah',
         'You choose your own destination completely through intentions'],
   correct:2},
  {q:'Why does the verse address "al-insan" (the human) not "al-mu\'min" (the believer)?',
   opts:['Because it is addressed only to disbelievers and rejecters',
         '"Al-insan" addresses ALL humans — the meeting applies to everyone',
         'Because believers are entirely excluded from this specific warning',
         'Because the term al-mu\'min was not used in any Meccan surahs'],
   correct:1},
];

const S3_QUIZ=[
  {q:'What does receiving the book in the RIGHT hand (yaminih) symbolize in 84:7?',
   opts:['Being judged first before all other people',
         'Being examined more carefully than everyone else',
         'Having a particularly long list of deeds to review',
         'Honour and goodness — you are among the people of Paradise'],
   correct:3},
  {q:'What does "hisab yasir" (easy reckoning) mean in 84:8?',
   opts:['A reckoning that simply takes less time than others',
         'A reckoning where only good deeds are counted and tallied',
         'Allah presents your deeds for acknowledgment without strict scrutiny',
         'A reckoning conducted by junior angels not senior ones'],
   correct:2},
  {q:'"Yanqalibu ila ahlihi masrura" (84:9) — what is the beautiful meaning?',
   opts:['You will see your worldly family immediately in Paradise',
         'You will be completely alone and isolated after the Judgment',
         'You will be given great wealth immediately after the Judgment',
         'MASRURA — with joy! He returns to his people overjoyed in Paradise'],
   correct:3},
  {q:'How do we prepare to be given our book in our right hand?',
   opts:['By memorising specific du\'as specifically for Judgment Day',
         'By performing the Hajj pilgrimage multiple times in life',
         'By having as many people as possible pray for you',
         'Sincerely worshipping Allah, fulfilling obligations, asking forgiveness'],
   correct:3},
];

const S4_QUIZ=[
  {q:'Why is the book given "behind the back" (wara\'a dhahrihi) in 84:10?',
   opts:['Because the person was naturally left-handed all their life',
         'His right hand is bound — left hand reaches shamefully behind the back',
         'Because the left side of the body is reserved for good deeds',
         'Because there is no room available on the left side'],
   correct:1},
  {q:'What is "thubur" (ثُبُور) that the person cries out for in 84:11?',
   opts:['He cries for mercy and forgiveness from Allah in despair',
         'He calls out the names of his family members for help',
         'He asks other people nearby to share in his punishment',
         'DESTRUCTION/RUIN — he calls for his own annihilation'],
   correct:3},
  {q:'What does "sa\'ir" (سَعِير) in 84:12 mean?',
   opts:['Blazing, intense fire — from "sa\'ara" meaning to kindle and blaze',
         'A cold and isolated punishment chamber in the afterlife',
         'A temporary place of purification before Paradise',
         'Deep darkness and total isolation as punishment in Hell'],
   correct:0},
  {q:'What made the "book behind the back" people end up this way?',
   opts:['They committed terrible crimes that their community never forgave',
         'They were born into families of disbelief and had no chance',
         'They were being punished for the sins of their parents',
         'They were joyfully heedless and thought they\'d never face Allah'],
   correct:3},
];

const S5_QUIZ=[
  {q:'What stages of life are implied in "tabaqan \'an tabaqin" (84:19)?',
   opts:['Birth, school, work, retirement, and finally death',
         'Only spiritual stages: ignorance, guidance, piety, and death',
         'The four seasons of the year applied to human life',
         'Scholars list: womb, birth, childhood, youth, death, grave, resurrection'],
   correct:3},
  {q:'What do the oaths by twilight, night, and moon (84:17-18) teach about time?',
   opts:['Day and night are primarily signs of Allah\'s power in creation',
         'Allah swears by phases of time — all moving in orderly stages toward Allah',
         'Day and night mainly warn us to stay awake for prayer',
         'The moon is a sign used only for navigation and agriculture'],
   correct:1},
  {q:'"La-tarkabunna tabaqan \'an tabaqin" (84:19) — what is the tone?',
   opts:['A gentle suggestion that life naturally has multiple phases',
         'A question asking whether people understand life\'s many stages',
         'A description specifically of the Day of Judgment and its events',
         'A certain oath — you will DEFINITELY pass stage after stage'],
   correct:3},
  {q:'How does knowing life comes in stages help us through difficulties?',
   opts:['It teaches accepting all difficulties without any resistance',
         'Every stage PASSES — hardship, illness, grief — "this too shall pass"',
         'It means we should rush quickly through each stage of life',
         'It teaches that only the afterlife truly matters at all'],
   correct:1},
];

const S6_QUIZ=[
  {q:'"Ma lahum la yu\'minun?" — why do they not believe?',
   opts:['Because the signs of Allah are hidden and genuinely unclear',
         'Because they never received any proper guidance or evidence',
         'Because predestination prevented them from ever believing',
         'No valid reason — the evidence is clear, but they prefer this world'],
   correct:3},
  {q:'Why does Allah swear by "the moon as it becomes full" in 84:18?',
   opts:['Because the full moon is the most beautiful natural phenomenon',
         'The moon grows stage by stage — echoing "tabaqan \'an tabaqin"',
         'Because night prayer is most rewarded during a full moon',
         'Because the moon controls human tides and thus human fate'],
   correct:1},
  {q:'Why does the surah open with cosmic signs and close with "why don\'t they believe?"',
   opts:['Because the surah is arranged in reverse chronological order',
         'Because cosmic signs apply to believers, the ending to non-believers',
         'Because it was revealed in two separate separate occasions',
         'The signs ARE the evidence — with all this, what is stopping them?'],
   correct:3},
  {q:'What is the key personal takeaway from Surah Al-Inshiqaq?',
   opts:['We should fear death and generally try to avoid thinking about it',
         'Prayer five times a day is fully sufficient preparation',
         'Only major sins really need to be addressed before death comes',
         'You are striving stage by stage toward a certain meeting with Allah'],
   correct:3},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerMatch(2, S1_ITEMS,S1_ZONES);
window.registerQuiz(3, S2_QUIZ);
window.registerQuiz(4, S3_QUIZ);
window.registerQuiz(5, S4_QUIZ);
window.registerQuiz(6, S5_QUIZ);
window.registerQuiz(7, S6_QUIZ);

function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#0a0402');sk.addColorStop(0.5,'#180a04');sk.addColorStop(1,'#261408');ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  if(n<1){_buildLabel(ctx,W,"🌅 Complete levels to build the Sunset Journey!",0,6);return;}
  // Ground
  ctx.fillStyle='#301808';ctx.fillRect(0,210,W,40);ctx.fillStyle='#401e08';ctx.fillRect(0,210,W,5);
  if(n<2){_buildLabel(ctx,W,"🌍 Earth appears — 1/6",1,6);return;}
  // Sunset sky
  const sg=ctx.createLinearGradient(0,0,0,210);sg.addColorStop(0,'#1a0802');sg.addColorStop(0.4,'#3a1808');sg.addColorStop(0.8,'#7a3810');sg.addColorStop(1,'#301808');ctx.fillStyle=sg;ctx.fillRect(0,0,W,210);
  if(n<3){_buildLabel(ctx,W,"🌅 Sunset sky — 2/6",2,6);return;}
  // Crack in sky
  ctx.strokeStyle='rgba(248,192,96,0.8)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2+15,60);ctx.lineTo(W/2-10,130);ctx.lineTo(W/2+5,210);ctx.stroke();
  if(n<4){_buildLabel(ctx,W,"🌅 Sky splits — 3/6",3,6);return;}
  // Person walking
  ctx.fillStyle='#e8c39a';ctx.fillRect(100,175,16,12);ctx.fillRect(103,163,10,12);ctx.fillStyle='#3a2818';ctx.fillRect(100,163,10,12);
  for(let f=0;f<3;f++){ctx.fillStyle='rgba(248,192,96,0.3)';ctx.fillRect(60-f*15,210,8,3);}
  if(n<5){_buildLabel(ctx,W,"🚶 Man striving toward Lord — 4/6",4,6);return;}
  // Moon
  ctx.fillStyle='rgba(248,192,96,0.7)';ctx.beginPath();ctx.arc(60,40,22,0,Math.PI*2);ctx.fill();ctx.fillStyle='#0a0402';ctx.beginPath();ctx.arc(70,34,15,0,Math.PI*2);ctx.fill();
  // Stars
  [[200,20],[300,35],[420,15],[480,45]].forEach(([sx,sy])=>{ctx.fillStyle='rgba(248,192,96,0.5)';ctx.beginPath();ctx.arc(sx,sy,1.5,0,Math.PI*2);ctx.fill();});
  if(n<6){_buildLabel(ctx,W,"🌙 Moon and stars — 5/6",5,6);return;}
  ctx.fillStyle='#f09030';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! 🌅 AL-INSHIQAQ COMPLETE!",W/2,240);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Innaka kadihun ila Rabbika kadhan fa-mulaqihi" — 84:6',W/2,H-2);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
