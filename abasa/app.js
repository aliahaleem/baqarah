'use strict';
/* ================================================
   SURAH ABASA (80) — app.js  (data layer only)
   He Frowned · Terracotta / Amber / Earth-gold
   ================================================ */

window.STORAGE_KEY = 'abasaQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Checked:false,
  s2Checked: false,
  s3Answers: {}, s3Checked: false,
  s4Order:   [], s4Checked: false,
  s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Answers: {}, s7Checked: false,
};

const REWARDS = {
  1: {xp:60, gems:3, icon:'📖', title:'Words Learned!', msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2: { xp: 80,  gems: 3, icon: '🙈', title: 'THE LESSON OF THE BLIND MAN!',
       msg: "SubhanAllah! The Prophet ﷺ turned away from Abdullah ibn Umm Maktum — and Allah gently corrected him. Not a harsh rebuke, but a divine lesson: the one who comes EAGERLY to learn matters more than the indifferent powerful. 'Wa amma man ja\'aka yas\'a wa huwa yakhsha — fa anta anhu talahhha.' Don't be distracted from those who truly seek Allah!" },
  3: { xp: 80,  gems: 3, icon: '📜', title: 'THE NOBLE QURAN UNDERSTOOD!',
       msg: "Allahu Akbar! 'Kalla — inna-ha tadhkirah!' No! Indeed these verses are a Reminder! The Quran is carried by noble, pure, honoured angels. It is written on exalted sheets. It is available to everyone who WANTS it — 'fa man sha\'a dhakarahu.' The Quran is not desperate for you. But your heart desperately needs it!" },
  4: { xp: 90,  gems: 3, icon: '🌱', title: 'CREATION STAGES KNOWN!',
       msg: "MashAllah! 'Qutila al-insan — ma akfarahu!' Destroyed is man — how ungrateful he is! Created from a drop. Formed and proportioned perfectly. Shown the path. Given life. Then death and a grave. Then resurrection when Allah wills. Allah lists five stages of your existence — and still we deny? SubhanAllah!" },
  5: { xp: 90,  gems: 4, icon: '🌾', title: 'THE GARDEN OF PROVISION SEEN!',
       msg: "SubhanAllah! 'Fal-yandhur al-insan ila ta\'amihi' — Let man LOOK at his food! Water poured from the sky. Earth split open. Grain, grapes, greens, olives, palms — seven types of food named by Allah Himself. Every single meal is a series of miracles. Next time you eat, say Bismillah and remember: ALLAH fed you this!" },
  6: { xp: 100, gems: 4, icon: '💥', title: 'THE DEAFENING BLAST MAPPED!',
       msg: "Allahu Akbar! Al-Sakhkhah — The Deafening Blast — overwhelms everything. That Day, brother flees from brother. Mother from child. Wife from husband. Not from cruelty — but because 'li kulli imri\'in minhum yawma\'idhin sha\'nun yughniyhi' — every soul is CONSUMED by their own account. Are you prepared for that Day?" },
  7: { xp: 120, gems: 5, icon: '✨', title: 'SURAH ABASA COMPLETE!',
       msg: "ALLAHUMMA BARIK! All 7 levels of Surah Abasa — He Frowned — complete! 'Wujuhun yawma\'idhin musfirah — dahikah mustabshirah.' Faces bright, laughing, rejoicing. May Allah make our faces THOSE faces on that Day. The lesson of Abasa: every sincere seeker matters. Every morsel of food is a gift. Every breath is a trust. Make it count! Ameen!" },
};

window.SURAH_CONFIG = {
  totalLevels: 7,
  rewards: REWARDS,
  tileIcons:['📖','🙈','📜','🌱','🌾','💥','✨'],
  tileLabels:['Word by Word','He Frowned','Noble Quran','From a Drop','Your Food','The Blast','Two Faces'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Surah Abasa — "He Frowned." The Prophet ﷺ learns who truly matters. The noble Quran in angel hands. Creation from a drop. Seven foods of provision. The Deafening Blast. And two faces on That Day. 7 levels await!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Wujuhun yawma'idhin musfirah dahikah mustabshirah..." — Keep building the harvest! 🌾`,
    complete: name => `MashAllah, ${name}! All 7 levels of Abasa complete! "Wujuhun yawma'idhin musfirah — dahikah mustabshirah." May Allah make our faces bright with joy on That Day. Ameen! ✨`,
  },
};

// =============================================
//  GAME DATA
// =============================================

// SECTION 1 — Drag & Drop: The Incident (80:1-10)
/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'80:1 — عَبَسَ وَتَوَلَّىٰ', words:[
    {ar:'وَتَوَلَّىٰ', tr:'wa-tawallā', en:'and turned away', freq:15},
    {ar:'عَبَسَ', tr:'ʿabasa', en:'he frowned', freq:1},
  ]},
  {label:'80:2 — أَن جَاءَهُ الْأَعْمَىٰ', words:[
    {ar:'الْأَعْمَىٰ', tr:'al-aʿmā', en:'the blind man', freq:8},
    {ar:'جَاءَهُ', tr:'jāʾahu', en:'came to him', freq:130},
    {ar:'أَن', tr:'an', en:'because', freq:1000},
  ]},
  {label:'80:3 — وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ', words:[
    {ar:'يَزَّكَّىٰ', tr:'yazzakkā', en:'would purify himself', freq:11},
    {ar:'لَعَلَّهُ', tr:'laʿallahu', en:'perhaps he', freq:30},
    {ar:'يُدْرِيكَ', tr:'yudrīka', en:'would make you know', freq:13},
    'ma', 'wa',
  ]},
  {label:'80:4 — أَوْ يَذَّكَّرُ فَتَنفَعَهُ الذِّكْرَىٰ', words:[
    {ar:'الذِّكْرَىٰ', tr:'al-dhikrā', en:'the reminder', freq:25},
    {ar:'فَتَنفَعَهُ', tr:'fa-tanfaʿuhu', en:'and benefit him', freq:1},
    {ar:'يَذَّكَّرُ', tr:'yadhdhakkaru', en:'would be reminded', freq:9},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
  ]},
  {label:'80:5 — أَمَّا مَنِ اسْتَغْنَىٰ', words:[
    {ar:'اسْتَغْنَىٰ', tr:'istaghna', en:'considers himself free of need', freq:3},
    'man',
    {ar:'أَمَّا', tr:'ammā', en:'as for', freq:20},
  ]},
  {label:'80:6 — فَأَنتَ لَهُ تَصَدَّىٰ', words:[
    {ar:'تَصَدَّىٰ', tr:'taṣaddā', en:'you give attention', freq:1},
    {ar:'لَهُ', tr:'lahu', en:'to him', freq:500},
    {ar:'فَأَنتَ', tr:'fa-anta', en:'so you', freq:35},
  ]},
  {label:'80:7 — وَمَا عَلَيْكَ أَلَّا يَزَّكَّىٰ', words:[
    {ar:'يَزَّكَّىٰ', tr:'yazzakkā', en:'he purifies himself', freq:11},
    {ar:'أَلَّا', tr:'allā', en:'that not', freq:50},
    {ar:'عَلَيْكَ', tr:'ʿalayka', en:'upon you', freq:68},
    'ma', 'wa',
  ]},
  {label:'80:8 — وَأَمَّا مَن جَاءَكَ يَسْعَىٰ', words:[
    {ar:'يَسْعَىٰ', tr:'yasʿā', en:'striving', freq:30},
    {ar:'جَاءَكَ', tr:'jāʾaka', en:'came to you', freq:130},
    'man',
    {ar:'وَأَمَّا', tr:'wa-ammā', en:'but as for', freq:20},
  ]},
  {label:'80:9 — وَهُوَ يَخْشَىٰ', words:[
    {ar:'يَخْشَىٰ', tr:'yakhshā', en:'fears (Allah)', freq:42},
    'huwa', 'wa',
  ]},
  {label:'80:10 — فَأَنتَ عَنْهُ تَلَهَّىٰ', words:[
    {ar:'تَلَهَّىٰ', tr:'talahhā', en:'you are neglectful', freq:1},
    {ar:'عَنْهُ', tr:'ʿanhu', en:'from him', freq:385},
    {ar:'فَأَنتَ', tr:'fa-anta', en:'so you', freq:35},
  ]},
  {label:'80:11 — كَلَّا إِنَّهَا تَذْكِرَةٌ', words:[
    {ar:'تَذْكِرَةٌ', tr:'tadhkirah', en:'a reminder', freq:8},
    {ar:'إِنَّهَا', tr:'innahā', en:'indeed these are', freq:40},
    'kalla',
  ]},
  {label:'80:12 — فَمَن شَاءَ ذَكَرَهُ', words:[
    {ar:'ذَكَرَهُ', tr:'dhakarahu', en:'will remember it', freq:78},
    {ar:'شَاءَ', tr:'shāʾa', en:'wills', freq:236},
    {ar:'فَمَن', tr:'fa-man', en:'so whoever', freq:350},
  ]},
  {label:'80:13 — فِي صُحُفٍ مُّكَرَّمَةٍ', words:[
    {ar:'مُّكَرَّمَةٍ', tr:'mukarramah', en:'honoured', freq:4},
    {ar:'صُحُفٍ', tr:'ṣuḥuf', en:'scriptures / sheets', freq:8},
    'fi',
  ]},
  {label:'80:14 — مَّرْفُوعَةٍ مُّطَهَّرَةٍ', words:[
    {ar:'مُّطَهَّرَةٍ', tr:'muṭahharah', en:'purified', freq:6},
    {ar:'مَّرْفُوعَةٍ', tr:'marfūʿah', en:'exalted', freq:3},
  ]},
  {label:'80:15 — بِأَيْدِي سَفَرَةٍ', words:[
    {ar:'سَفَرَةٍ', tr:'safarah', en:'angel-scribes', freq:1},
    {ar:'بِأَيْدِي', tr:'bi-aydī', en:'in the hands of', freq:35},
  ]},
  {label:'80:16 — كِرَامٍ بَرَرَةٍ', words:[
    {ar:'بَرَرَةٍ', tr:'bararah', en:'dutiful / obedient', freq:1},
    {ar:'كِرَامٍ', tr:'kirām', en:'noble / honourable', freq:27},
  ]},
  {label:'80:17 — قُتِلَ الْإِنسَانُ مَا أَكْفَرَهُ', words:[
    {ar:'أَكْفَرَهُ', tr:'akfarahu', en:'how ungrateful he is!', freq:1},
    'ma',
    {ar:'الْإِنسَانُ', tr:'al-insān', en:'man', freq:65},
    {ar:'قُتِلَ', tr:'qutila', en:'destroyed is / cursed is', freq:39},
  ]},
  {label:'80:18 — مِنْ أَيِّ شَيْءٍ خَلَقَهُ', words:[
    {ar:'خَلَقَهُ', tr:'khalaqahu', en:'He created him', freq:250},
    'shay',
    {ar:'أَيِّ', tr:'ayyi', en:'what', freq:8},
    'min',
  ]},
  {label:'80:19 — مِن نُّطْفَةٍ خَلَقَهُ فَقَدَّرَهُ', words:[
    {ar:'فَقَدَّرَهُ', tr:'fa-qaddarahu', en:'and proportioned him', freq:30},
    {ar:'خَلَقَهُ', tr:'khalaqahu', en:'He created him', freq:250},
    {ar:'نُّطْفَةٍ', tr:'nuṭfah', en:'a sperm-drop', freq:12},
    'min',
  ]},
  {label:'80:20 — ثُمَّ السَّبِيلَ يَسَّرَهُ', words:[
    {ar:'يَسَّرَهُ', tr:'yassarahu', en:'He eased for him', freq:29},
    {ar:'السَّبِيلَ', tr:'al-sabīl', en:'the way', freq:176},
    'thumma',
  ]},
  {label:'80:21 — ثُمَّ أَمَاتَهُ فَأَقْبَرَهُ', words:[
    {ar:'فَأَقْبَرَهُ', tr:'fa-aqbarahu', en:'and provided a grave', freq:1},
    {ar:'أَمَاتَهُ', tr:'amātahu', en:'He caused him to die', freq:54},
    'thumma',
  ]},
  {label:'80:22 — ثُمَّ إِذَا شَاءَ أَنشَرَهُ', words:[
    {ar:'أَنشَرَهُ', tr:'ansharahu', en:'He will resurrect him', freq:1},
    {ar:'شَاءَ', tr:'shāʾa', en:'He wills', freq:236},
    'idha', 'thumma',
  ]},
  {label:'80:23 — كَلَّا لَمَّا يَقْضِ مَا أَمَرَهُ', words:[
    {ar:'أَمَرَهُ', tr:'amarahu', en:'He commanded him', freq:248},
    'ma',
    {ar:'يَقْضِ', tr:'yaqḍi', en:'he has fulfilled', freq:53},
    {ar:'لَمَّا', tr:'lammā', en:'not yet', freq:234},
    'kalla',
  ]},
  {label:'80:24 — فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ', words:[
    {ar:'طَعَامِهِ', tr:'ṭaʿāmihi', en:'his food', freq:48},
    'ila',
    {ar:'الْإِنسَانُ', tr:'al-insān', en:'man', freq:65},
    {ar:'فَلْيَنظُرِ', tr:'fal-yanẓur', en:'let him look', freq:33},
  ]},
  {label:'80:25 — أَنَّا صَبَبْنَا الْمَاءَ صَبًّا', words:[
    {ar:'صَبًّا', tr:'ṣabban', en:'pouring abundantly', freq:1},
    {ar:'الْمَاءَ', tr:'al-māʾ', en:'the water', freq:63},
    {ar:'صَبَبْنَا', tr:'ṣababnā', en:'We poured', freq:1},
    {ar:'أَنَّا', tr:'annā', en:'that We', freq:112},
  ]},
  {label:'80:26 — ثُمَّ شَقَقْنَا الْأَرْضَ شَقًّا', words:[
    {ar:'شَقًّا', tr:'shaqqan', en:'splitting it open', freq:1},
    'al-ard',
    {ar:'شَقَقْنَا', tr:'shaqaqnā', en:'We split', freq:1},
    'thumma',
  ]},
  {label:'80:27 — فَأَنبَتْنَا فِيهَا حَبًّا', words:[
    {ar:'حَبًّا', tr:'ḥabban', en:'grain', freq:12},
    'fiiha',
    {ar:'فَأَنبَتْنَا', tr:'fa-anbatnā', en:'and We caused to grow', freq:26},
  ]},
  {label:'80:28 — وَعِنَبًا وَقَضْبًا', words:[
    {ar:'وَقَضْبًا', tr:'wa-qaḍban', en:'and herbage / greens', freq:1},
    {ar:'وَعِنَبًا', tr:'wa-ʿinaban', en:'and grapes', freq:11},
  ]},
  {label:'80:29 — وَزَيْتُونًا وَنَخْلًا', words:[
    {ar:'وَنَخْلًا', tr:'wa-nakhlan', en:'and palm trees', freq:20},
    {ar:'وَزَيْتُونًا', tr:'wa-zaytūnan', en:'and olive trees', freq:6},
  ]},
  {label:'80:30 — وَحَدَائِقَ غُلْبًا', words:[
    {ar:'غُلْبًا', tr:'ghulban', en:'luxuriant / dense', freq:1},
    {ar:'وَحَدَائِقَ', tr:'wa-ḥadāʾiqa', en:'and gardens', freq:3},
  ]},
  {label:'80:31 — وَفَاكِهَةً وَأَبًّا', words:[
    {ar:'وَأَبًّا', tr:'wa-abban', en:'and pasture / fodder', freq:1},
    {ar:'وَفَاكِهَةً', tr:'wa-fākihatan', en:'and fruit', freq:11},
  ]},
  {label:'80:32 — مَّتَاعًا لَّكُمْ وَلِأَنْعَامِكُمْ', words:[
    {ar:'وَلِأَنْعَامِكُمْ', tr:'wa-li-anʿāmikum', en:'and for your cattle', freq:5},
    'lakum',
    {ar:'مَّتَاعًا', tr:'matāʿan', en:'provision / enjoyment', freq:70},
  ]},
  {label:'80:33 — فَإِذَا جَاءَتِ الصَّاخَّةُ', words:[
    {ar:'الصَّاخَّةُ', tr:'al-ṣākhkhah', en:'the Deafening Blast', freq:1},
    {ar:'جَاءَتِ', tr:'jāʾat', en:'comes', freq:130},
    {ar:'فَإِذَا', tr:'fa-idhā', en:'then when', freq:406},
  ]},
  {label:'80:34 — يَوْمَ يَفِرُّ الْمَرْءُ مِنْ أَخِيهِ', words:[
    {ar:'أَخِيهِ', tr:'akhīhi', en:'his brother', freq:96},
    'min',
    {ar:'الْمَرْءُ', tr:'al-marʾ', en:'a man', freq:10},
    {ar:'يَفِرُّ', tr:'yafirru', en:'will flee', freq:6},
    'yawma',
  ]},
  {label:'80:35 — وَأُمِّهِ وَأَبِيهِ', words:[
    {ar:'وَأَبِيهِ', tr:'wa-abīhi', en:'and his father', freq:117},
    {ar:'وَأُمِّهِ', tr:'wa-ummihi', en:'and his mother', freq:35},
  ]},
  {label:'80:36 — وَصَاحِبَتِهِ وَبَنِيهِ', words:[
    {ar:'وَبَنِيهِ', tr:'wa-banīhi', en:'and his children', freq:158},
    {ar:'وَصَاحِبَتِهِ', tr:'wa-ṣāḥibatihi', en:'and his wife', freq:1},
  ]},
  {label:'80:37 — لِكُلِّ امْرِئٍ مِّنْهُمْ يَوْمَئِذٍ شَأْنٌ يُغْنِيهِ', words:[
    {ar:'يُغْنِيهِ', tr:'yughnīhi', en:'will make him unconcerned', freq:1},
    {ar:'شَأْنٌ', tr:'shaʾn', en:'a matter / concern', freq:9},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:70},
    {ar:'مِّنْهُمْ', tr:'minhum', en:'among them', freq:100},
    {ar:'امْرِئٍ', tr:'imriʾ', en:'a person', freq:10},
    {ar:'لِكُلِّ', tr:'li-kulli', en:'for every', freq:330},
  ]},
  {label:'80:38 — وُجُوهٌ يَوْمَئِذٍ مُّسْفِرَةٌ', words:[
    {ar:'مُّسْفِرَةٌ', tr:'musfirah', en:'bright / glowing', freq:1},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:70},
    {ar:'وُجُوهٌ', tr:'wujūh', en:'faces', freq:73},
  ]},
  {label:'80:39 — ضَاحِكَةٌ مُّسْتَبْشِرَةٌ', words:[
    {ar:'مُّسْتَبْشِرَةٌ', tr:'mustabshirah', en:'rejoicing at good news', freq:1},
    {ar:'ضَاحِكَةٌ', tr:'ḍāḥikah', en:'laughing', freq:3},
  ]},
  {label:'80:40 — وَوُجُوهٌ يَوْمَئِذٍ عَلَيْهَا غَبَرَةٌ', words:[
    {ar:'غَبَرَةٌ', tr:'ghabarah', en:'dust', freq:1},
    {ar:'عَلَيْهَا', tr:'ʿalayhā', en:'upon them', freq:300},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:70},
    {ar:'وَوُجُوهٌ', tr:'wa-wujūh', en:'and faces', freq:73},
  ]},
  {label:'80:41 — تَرْهَقُهَا قَتَرَةٌ', words:[
    {ar:'قَتَرَةٌ', tr:'qatarah', en:'darkness / gloom', freq:1},
    {ar:'تَرْهَقُهَا', tr:'tarhaquhā', en:'will cover them', freq:1},
  ]},
  {label:'80:42 — أُولَٰئِكَ هُمُ الْكَفَرَةُ الْفَجَرَةُ', words:[
    {ar:'الْفَجَرَةُ', tr:'al-fajarah', en:'the wicked sinners', freq:3},
    {ar:'الْكَفَرَةُ', tr:'al-kafarah', en:'the disbelievers', freq:525},
    'hum',
    {ar:'أُولَٰئِكَ', tr:'ulāʾika', en:'those are', freq:88},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS = [
  { id: 'i1', text: 'جَاءَهُ\nالْأَعْمَىٰ',  zone: 'z1' },
  { id: 'i2', text: 'مَنِ اسْتَغْنَىٰ\nتَصَدَّىٰ',        zone: 'z2' },
  { id: 'i3', text: 'عَبَسَ\nوَتَوَلَّىٰ', zone: 'z3' },
  { id: 'i4', text: 'لَعَلَّهُ\nيَزَّكَّىٰ', zone: 'z4' },
];
const S1_ZONES = [
  { id: 'z1', desc: 'He was blind and poor — yet he came eagerly to the Prophet ﷺ wanting to learn. Allah honoured HIM, not the powerful men. "Wa amma man ja\'aka yas\'a wa huwa yakhsha" (80:8-9).' },
  { id: 'z2', desc: 'The rich, powerful men of Quraysh. The Prophet ﷺ hoped they would accept Islam. But they were free from need and felt no urgency. "Amma man istaghnaa — fa anta lahu tasaddaa" (80:5-6).' },
  { id: 'z3', desc: 'This is what the Prophet ﷺ did when the blind man came — he frowned and turned away. "Abasa wa-tawalla — an ja\'ahu al-a\'ma" (80:1-2). Allah gently corrected this.' },
  { id: 'z4', desc: '"Wa ma yudrika la\'allahu yazzakka — aw yadhdhakkaru fa-tanfa\'ahu al-dhikra." What would make you know? Perhaps HE would purify himself or be reminded (80:3-4). The eager seeker holds the key to their own benefit.' },
];

// SECTION 2 — Quiz: The Noble Quran (80:11-16)
const S2_QUIZ = [
  { q: 'What does "Kalla" (كَلَّا) mean at the start of 80:11?',
    opts: ['"Yes!" — affirming the Prophet\'s focus on the Quraysh leaders',
           '"Listen!" — Allah calling everyone to pay close attention',
           '"No!/Stop!" — a divine correction redirecting the Prophet ﷺ',
           '"Truly!" — emphasising the importance of what was said before'],
    correct: 2 },
  { q: 'In what are these noble verses written, according to 80:13-14?',
    opts: ['In honoured, exalted, purified heavenly sheets (suhuf mukarramah)',
           'Carved in stone tablets given to Moses on Sinai',
           'Written in the hearts of believers who memorise the Quran',
           'On scrolls kept hidden deep beneath the Throne'],
    correct: 0 },
  { q: 'Who carries these honoured sheets according to 80:15-16?',
    opts: ['Human scholars and huffadh (Quran memorisers)',
           'The prophets themselves as custodians of revelation',
           'Jibril (AS) alone, as chief of all the angels',
           'Noble, virtuous messenger-angels — safarah kiram bararah'],
    correct: 3 },
  { q: 'What does "fa-man sha\'a dhakarahu" (80:12) tell us about the Quran?',
    opts: ['Everyone must memorise the entire Quran by heart',
           'Whoever wills may benefit — available to any willing heart',
           'Only scholars and senior clerics can truly understand it',
           'You benefit only if you recite it in the Arabic language'],
    correct: 1 },
];

// SECTION 3 — Story Order: Creation Stages (80:17-23)
const S3_EVENTS_CORRECT = [
  { id: 'e1', text: '💧 Created from a drop of liquid (nutfah) — the very beginning of human existence (80:18-19)' },
  { id: 'e2', text: '🔧 Allah formed him and proportioned him perfectly (qaddarahu) — every organ, every function (80:19)' },
  { id: 'e3', text: '🛤️ Allah made the path easy for him (yassara al-sabil) — guidance, language, reasoning given (80:20)' },
  { id: 'e4', text: '☠️ Allah causes him to die (amatahu) at the appointed time (80:21)' },
  { id: 'e5', text: '⚰️ Allah provides a grave (aqbarahu) — honourable burial (80:21)' },
  { id: 'e6', text: '🌟 When Allah wills, He resurrects him (anshara) — the return to Him (80:22)' },
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

// SECTION 4 — Drag & Drop: Provision (80:24-32)
const S4_ITEMS = [
  { id: 'f1', text: 'صَبَبْنَا الْمَاءَ\nصَبًّا',    zone: 'z1' },
  { id: 'f2', text: 'شَقَقْنَا الْأَرْضَ\nشَقًّا',              zone: 'z2' },
  { id: 'f3', text: 'فَأَنبَتْنَا فِيهَا\nحَبًّا',       zone: 'z3' },
  { id: 'f4', text: 'وَعِنَبًا\nوَقَضْبًا',    zone: 'z4' },
  { id: 'f5', text: 'وَزَيْتُونًا\nوَنَخْلًا',    zone: 'z5' },
];
const S4_ZONES = [
  { id: 'z1', desc: '"Anna sababna al-ma\'a sabba" (80:25) — We poured water abundantly. Every drop of rain is a miracle of provision planned for you before creation.' },
  { id: 'z2', desc: '"Thumma shaqaqna al-ardha shaqqan" (80:26) — Then We split the earth in splits. The earth opens to receive the seed and grow your food. SubhanAllah!' },
  { id: 'z3', desc: '"Fa-anbatna fiha habba" (80:27) — We cause grain to grow in it. Wheat, rice, barley — the staple of humanity. All from water + earth + divine command.' },
  { id: 'z4', desc: '"Wa \'inaban wa qadhba" (80:28) — And grapes and greens. Sweet fruits and fresh vegetables — designed perfectly for human nutrition and enjoyment.' },
  { id: 'z5', desc: '"Wa zaytuna wa nakhla" (80:29) — Olive trees and palms. Mentioned together because both produce sustenance AND oil — blessings layered upon blessings.' },
];

// SECTION 5 — Quiz: The Deafening Blast (80:33-37)
const S5_QUIZ = [
  { q: 'What is "Al-Sakhkhah" (الصَّاخَّة) in verse 80:33?',
    opts: ['A gentle wind that announces the beginning of Judgment Day',
           'The Deafening Blast — from "sakha" meaning to deafen the ears',
           'A massive earthquake that occurs just before the Hour',
           'The sound of the gates of Paradise opening wide'],
    correct: 1 },
  { q: 'From whom does a man flee on the Day of Judgment (80:34-36)?',
    opts: ['From the angels who carry his record of deeds',
           'From the Fire and its guardian angels on either side',
           'From his enemies and all who wronged him in life',
           'From brother, mother, father, wife, and all his children'],
    correct: 3 },
  { q: 'WHY does a man flee from his own family on that Day (80:37)?',
    opts: ['Each person is wholly consumed by their own account alone',
           'He is ashamed of his bad deeds in front of family',
           'The angels command every soul to separate on that Day',
           'He simply does not recognise his family in the chaos'],
    correct: 0 },
  { q: 'What is the core lesson about priorities from verses 80:34-37?',
    opts: ['We should cut family ties in this world to prepare well',
           'The Day of Judgment is too far away to worry about',
           'Only your personal deeds will matter — plant them now',
           'We should focus only on helping family in this world'],
    correct: 2 },
];

// SECTION 6 — Quiz: Two Faces (80:38-42)
const S6_QUIZ = [
  { q: 'What does "wujuhun yawma\'idhin musfirah" (80:38) describe?',
    opts: ['Faces that Day will be bright and glowing with light',
           'Faces covered in sweat from hard labour on that Day',
           'Faces burned and scarred by the long sun of that Day',
           'Faces sweating with relief at receiving their good record'],
    correct: 0 },
  { q: 'What two qualities describe the believers\' faces in 80:39?',
    opts: ['Serious and solemn as they await the final judgment',
           'Humble and bowed down, waiting patiently for mercy',
           'Laughing (dahikah) and radiant with good news (mustabshirah)',
           'Weeping quiet tears of deep gratitude to Allah'],
    correct: 2 },
  { q: 'What covers the faces of the disbelievers in 80:40-41?',
    opts: ['A veil of regret for the choices they made in life',
           'Dust (ghabarah) and dark soot (qatarah) covering them',
           'Tears of sorrow as they witness companions suffer',
           'The shadow of lost opportunity visible on every feature'],
    correct: 1 },
  { q: 'Who are the "Al-Kafarah al-Fajarah" (الْكَفَرَةُ الْفَجَرَةُ) in 80:42?',
    opts: ['People who missed some prayers but were mostly righteous',
           'People who were ignorant of Islam through no fault',
           'Those who harmed others but still believed in Allah',
           'Disbelievers who combined denial of truth with open sinning'],
    correct: 3 },
];

// =============================================
//  SECTION WRAPPERS
// =============================================

function renderSection2Game() { renderDragDrop(2, S1_ITEMS, S1_ZONES); }
function checkSection2()      { checkDragDrop(2, S1_ZONES); }
function renderSection3Game() { renderQuiz(3, S2_QUIZ); }
function checkSection3()      { checkQuiz(3, S2_QUIZ); }
function renderSection4Game() { renderStoryOrder(4, S3_EVENTS_CORRECT); }
function checkSection4()      { checkStoryOrder(4, S3_EVENTS_CORRECT); }
function renderSection5Game() { renderDragDrop(5, S4_ITEMS, S4_ZONES); }
function checkSection5()      { checkDragDrop(5, S4_ZONES); }
function renderSection6Game() { renderQuiz(6, S5_QUIZ); }
function checkSection6()      { checkQuiz(6, S5_QUIZ); }
function renderSection7Game() { renderQuiz(7, S6_QUIZ); }
function checkSection7()      { checkQuiz(7, S6_QUIZ); }

// =============================================
//  HARVEST GARDEN — WORLD BUILDER CANVAS
// =============================================
function _label80(ctx, W, msg, done, total) {
  ctx.fillStyle = '#c07818'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#100802'; ctx.fillRect(W/2-100, 26, 200, 8);
  ctx.fillStyle = '#8a3a10'; ctx.fillRect(W/2-100, 26, Math.round(200*done/total), 8);
  ctx.textAlign = 'left';
}
function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  // Sky
  const sk = ctx.createLinearGradient(0,0,0,H);
  if (n >= 6) {
    sk.addColorStop(0,'#1a3008'); sk.addColorStop(0.5,'#2a1c04'); sk.addColorStop(1,'#1a2a08');
  } else {
    sk.addColorStop(0,'#0a0602'); sk.addColorStop(1,'#180e04');
  }
  ctx.fillStyle = sk; ctx.fillRect(0,0,W,H);
  // Stars
  for (let i=0; i<25; i++) {
    const sx=(i*6131)%W, sy=(i*3977)%(H*0.5);
    ctx.fillStyle=`rgba(255,230,150,${0.15+(i%4)*0.12})`; ctx.fillRect(sx,sy,1,1);
  }
  if (n < 1) { _label80(ctx,W,"🌱 Complete levels to build the Harvest Garden!",0,6); return; }
  // Ground
  ctx.fillStyle = '#2a1a08'; ctx.fillRect(0,195,W,55);
  ctx.fillStyle = '#3a2a10'; ctx.fillRect(0,195,W,5);
  for (let gx=5; gx<W-5; gx+=10) { ctx.fillStyle='#4a3418'; ctx.fillRect(gx,192,3,6+(gx%4)); }
  if (n < 2) { _label80(ctx,W,"🌍 Earth prepared — 1/6",1,6); return; }
  // Rain
  ctx.fillStyle = 'rgba(100,160,220,0.5)';
  for (let r=0; r<6; r++) { ctx.fillRect(40+r*90, 30+r*8, 2, 12); }
  ctx.fillStyle = '#5a9ad0';
  ctx.font = '6px "Press Start 2P",monospace'; ctx.textAlign='center';
  ctx.fillText('Water from the sky', W/2, 22); ctx.textAlign='left';
  if (n < 3) { _label80(ctx,W,"🌧️ Rain pours — 2/6",2,6); return; }
  // Grain
  ctx.fillStyle = '#8a6018'; ctx.fillRect(50,175,10,25);
  ctx.fillStyle = '#c8a030'; ctx.fillRect(46,168,18,12);
  ctx.font='16px sans-serif'; ctx.textAlign='center'; ctx.fillText('🌾',55,170); ctx.textAlign='left';
  ctx.fillStyle = '#8a6018'; ctx.fillRect(130,175,10,25);
  ctx.fillStyle = '#c8a030'; ctx.fillRect(126,168,18,12);
  ctx.font='16px sans-serif'; ctx.textAlign='center'; ctx.fillText('🌾',135,170); ctx.textAlign='left';
  if (n < 4) { _label80(ctx,W,"🌾 Grain grows — 3/6",3,6); return; }
  // Olive tree
  ctx.fillStyle = '#5a3a10'; ctx.fillRect(228,155,12,45);
  ctx.fillStyle = '#3a6818'; ctx.beginPath(); ctx.ellipse(234,145,24,20,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#5a8820'; ctx.beginPath(); ctx.ellipse(234,138,16,14,0,0,Math.PI*2); ctx.fill();
  ['#3a7a28','#4a8a30','#5a6010'].forEach((c,i)=>{
    ctx.fillStyle=c; ctx.beginPath(); ctx.arc(218+i*12,148,4,0,Math.PI*2); ctx.fill();
  });
  // Palm tree
  ctx.fillStyle = '#6a4020'; ctx.fillRect(348,148,14,50);
  [[330,135],[345,125],[360,118],[375,125],[390,130]].forEach(([px,py])=>{
    ctx.strokeStyle='#3a7820'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(355,148); ctx.quadraticCurveTo((px+355)/2,(py+148)/2,px,py); ctx.stroke();
  });
  ctx.font='14px sans-serif'; ctx.textAlign='center'; ctx.fillText('🌴',355,148); ctx.textAlign='left';
  if (n < 5) { _label80(ctx,W,"🫒 Olive & Palm grown — 4/6",4,6); return; }
  // Grapes and greens
  ctx.fillStyle = '#4a2878'; ctx.fillRect(448,165,8,35);
  [[440,150],[452,145],[462,152],[455,160]].forEach(([gx,gy])=>{
    ctx.fillStyle='#8a40c8'; ctx.beginPath(); ctx.arc(gx,gy,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#aa60e8'; ctx.beginPath(); ctx.arc(gx,gy,3,0,Math.PI*2); ctx.fill();
  });
  ctx.font='14px sans-serif'; ctx.textAlign='center'; ctx.fillText('🍇',452,155); ctx.textAlign='left';
  if (n < 6) { _label80(ctx,W,"🍇 Grapes planted — 5/6",5,6); return; }
  // Full harvest — sun above
  const lg = ctx.createRadialGradient(W/2,0,0,W/2,0,200);
  lg.addColorStop(0,'rgba(255,200,60,0.25)'); lg.addColorStop(1,'rgba(255,160,20,0)');
  ctx.fillStyle = lg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle = '#e8a030'; ctx.beginPath(); ctx.arc(W/2, 5, 18, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#ffd070'; ctx.beginPath(); ctx.arc(W/2, 5, 10, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#ffd700'; ctx.font='8px "Press Start 2P",monospace'; ctx.textAlign='center';
  ctx.fillText("ALLAHUMMA BARIK! 🌾 HARVEST GARDEN COMPLETE!", W/2, 40);
  ctx.font='6px "Press Start 2P",monospace';
  ctx.fillText('"Fal-yandhur al-insan ila ta\'amihi" — 80:24', W/2, 52); ctx.textAlign='left';
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
