'use strict';
/* ================================================
   SURAH AN-NABA — app.js  (data layer only)
   Shared mechanics in shared/engine.js
   Shared UI/lifecycle in shared/ui.js
   ================================================ */

window.STORAGE_KEY = 'nabaQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Checked:false,
  s2Answers: {}, s2Checked: false,
  s3Checked: false,
  s4Checked: false,
  s5Order:   [], s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Checked: false,
  s8Answers: {}, s8Checked: false,
  s9Answers: {}, s9Checked: false,
};

const REWARDS = {
  1: { xp: 60,  gems: 3, icon: '📖', title: 'Words Learned!',
       msg: 'MashAllah! You learned the key Arabic words of this surah!' },
  2: { xp: 90,  gems: 3, icon: '❓', title: 'THE GREAT NEWS KNOWN!',
       msg: 'SubhanAllah! "An-Naba Al-Atheem" — The Great News. They argued about it. But Allah says twice: "Kalla saya\'lamoon!" — They are going to know. On to the Signs of Creation!' },
  3: { xp: 100, gems: 4, icon: '⛰️', title: 'EARTH SIGNS UNLOCKED!',
       msg: 'MashAllah! Earth as a resting bed. Mountains as pegs. Sleep as rest. Night as a covering. Day for livelihood. Six gifts, six signs — all custom-designed for YOU.' },
  4: { xp: 100, gems: 4, icon: '🌧️', title: 'SKY SIGNS DISCOVERED!',
       msg: 'SubhanAllah! Seven strong heavens. A blazing lamp. Torrential rain. Dense gardens. One chain of mercy — from sky to soil.' },
  5: { xp: 110, gems: 4, icon: '📯', title: 'THE DAY UNDERSTOOD!',
       msg: 'Allahu Akbar! Yawm al-Fasl — the Day of Sorting. The Horn is blown. You come in crowds. The sky opens as gates. The mountains become a mirage. Prepare now!' },
  6: { xp: 110, gems: 4, icon: '🔥', title: 'THE AMBUSH MAPPED!',
       msg: 'MashAllah! Hellfire is a "mirsad" — waiting, watching. "They did not expect any account." Let us never be like them.' },
  7: { xp: 120, gems: 5, icon: '🌿', title: 'PARADISE ENTERED!',
       msg: 'SubhanAllah! "Inna lil-muttaqeena mafaza!" — For the righteous is success! Gardens, vines, companions, a full cup. No idle talk, no lies. Pure peace.' },
  8: { xp: 100, gems: 3, icon: '👑', title: 'THE ROWS WITNESSED!',
       msg: 'Allahu Akbar! Only those given permission may speak — and only truth. The absolute sovereignty of Allah.' },
  9: { xp: 160, gems: 8, icon: '🏆', title: 'SURAH AN-NABA COMPLETE!',
       msg: "ALLAHUMMA BARIK! All 9 levels complete! \"Fa-man sha'a ittakhadha ila rabbihi ma'aba.\" May Allah make us from those who rush toward Him. Ameen!" },
};

window.SURAH_CONFIG = {
  totalLevels: 9,
  rewards: REWARDS,
  tileIcons:['📖','❓','⛰️','🌧️','📯','🔥','🌿','👑','🏆'],
  tileLabels:['Word by Word','Great News','Earth Signs','Sky Signs','Day of Sorting','Hellfire','Paradise','The Rows','Final Warning'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Surah An-Naba — "The Great News." What were they arguing about? 9 levels. Let's begin!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Kalla saya'lamoon!" Keep learning! 📯`,
    complete: name => `MashAllah, ${name}! All 9 levels of An-Naba complete! May Allah make us from those who rush toward Him. Ameen! 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'78:1 — عَمَّ يَتَسَاءَلُونَ', words:[
    {ar:'يَتَسَاءَلُونَ', tr:'yatasāʾalūn', en:'they are asking one another', freq:3},
    {ar:'عَمَّ', tr:'ʿamma', en:'about what', freq:2},
  ]},
  {label:'78:2 — عَنِ النَّبَإِ الْعَظِيمِ', words:[
    {ar:'الْعَظِيمِ', tr:'al-ʿaẓīm', en:'the great', freq:79},
    {ar:'النَّبَإِ', tr:'al-nabaʾ', en:'the news', freq:6},
    {ar:'عَنِ', tr:'ʿan', en:'about', freq:330},
  ]},
  {label:'78:3 — الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ', words:[
    {ar:'مُخْتَلِفُونَ', tr:'mukhtalifūn', en:'in disagreement', freq:7},
    'fiiha',
    'hum',
    'alladhi',
  ]},
  {label:'78:4 — كَلَّا سَيَعْلَمُونَ', words:[
    {ar:'سَيَعْلَمُونَ', tr:'sa-yaʿlamūn', en:'they will come to know', freq:12},
    'kalla',
  ]},
  {label:'78:5 — ثُمَّ كَلَّا سَيَعْلَمُونَ', words:[
    {ar:'سَيَعْلَمُونَ', tr:'sa-yaʿlamūn', en:'they will come to know', freq:12},
    'kalla',
    'thumma',
  ]},
  {label:'78:6 — أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا', words:[
    {ar:'مِهَادًا', tr:'mihādan', en:'a resting place', freq:2},
    'al-ard',
    {ar:'نَجْعَلِ', tr:'najʿal', en:'We made', freq:30},
    'alam',
  ]},
  {label:'78:7 — وَالْجِبَالَ أَوْتَادًا', words:[
    {ar:'أَوْتَادًا', tr:'awtādan', en:'as stakes / pegs', freq:3},
    'al-jibal',
  ]},
  {label:'78:8 — وَخَلَقْنَاكُمْ أَزْوَاجًا', words:[
    {ar:'أَزْوَاجًا', tr:'azwājan', en:'in pairs', freq:20},
    {ar:'وَخَلَقْنَاكُمْ', tr:'wa-khalaqnākum', en:'And We created you', freq:5},
  ]},
  {label:'78:9 — وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا', words:[
    {ar:'سُبَاتًا', tr:'subātan', en:'a means of rest', freq:1},
    {ar:'نَوْمَكُمْ', tr:'nawmakum', en:'your sleep', freq:1},
    'wa-ja-alna',
  ]},
  {label:'78:10 — وَجَعَلْنَا اللَّيْلَ لِبَاسًا', words:[
    {ar:'لِبَاسًا', tr:'libāsan', en:'a covering', freq:5},
    'al-layl',
    'wa-ja-alna',
  ]},
  {label:'78:11 — وَجَعَلْنَا النَّهَارَ مَعَاشًا', words:[
    {ar:'مَعَاشًا', tr:'maʿāshan', en:'for livelihood', freq:1},
    'al-nahar',
    'wa-ja-alna',
  ]},
  {label:'78:12 — وَبَنَيْنَا فَوْقَكُمْ سَبْعًا شِدَادًا', words:[
    {ar:'شِدَادًا', tr:'shidādan', en:'strong / mighty', freq:1},
    {ar:'سَبْعًا', tr:'sabʿan', en:'seven', freq:24},
    {ar:'فَوْقَكُمْ', tr:'fawqakum', en:'above you', freq:3},
    {ar:'وَبَنَيْنَا', tr:'wa-banaynā', en:'And We built', freq:2},
  ]},
  {label:'78:13 — وَجَعَلْنَا سِرَاجًا وَهَّاجًا', words:[
    {ar:'وَهَّاجًا', tr:'wahhājan', en:'blazing / glowing', freq:1},
    {ar:'سِرَاجًا', tr:'sirājan', en:'a lamp (the sun)', freq:4},
    'wa-ja-alna',
  ]},
  {label:'78:14 — وَأَنزَلْنَا مِنَ الْمُعْصِرَاتِ مَاءً ثَجَّاجًا', words:[
    {ar:'ثَجَّاجًا', tr:'thajjājan', en:'pouring abundantly', freq:1},
    'maa',
    {ar:'الْمُعْصِرَاتِ', tr:'al-muʿṣirāt', en:'the rain clouds', freq:1},
    'min',
    'wa-anzalna',
  ]},
  {label:'78:15 — لِّنُخْرِجَ بِهِ حَبًّا وَنَبَاتًا', words:[
    {ar:'وَنَبَاتًا', tr:'wa-nabātan', en:'and vegetation', freq:2},
    {ar:'حَبًّا', tr:'ḥabban', en:'grain', freq:5},
    'bihi',
    {ar:'لِّنُخْرِجَ', tr:'li-nukhrija', en:'that We may bring forth', freq:7},
  ]},
  {label:'78:16 — وَجَنَّاتٍ أَلْفَافًا', words:[
    {ar:'أَلْفَافًا', tr:'alfāfan', en:'of dense growth', freq:1},
    {ar:'وَجَنَّاتٍ', tr:'wa-jannātin', en:'and gardens', freq:20},
  ]},
  {label:'78:17 — إِنَّ يَوْمَ الْفَصْلِ كَانَ مِيقَاتًا', words:[
    {ar:'مِيقَاتًا', tr:'mīqātan', en:'an appointed time', freq:3},
    'kaana',
    'al-fasl',
    'yawma',
    'inna',
  ]},
  {label:'78:18 — يَوْمَ يُنفَخُ فِي الصُّورِ فَتَأْتُونَ أَفْوَاجًا', words:[
    'afwaja',
    {ar:'فَتَأْتُونَ', tr:'fa-taʾtūna', en:'and you will come forth', freq:1},
    'al-sur',
    'fi',
    {ar:'يُنفَخُ', tr:'yunfakhu', en:'it is blown', freq:4},
    'yawma',
  ]},
  {label:'78:19 — وَفُتِحَتِ السَّمَاءُ فَكَانَتْ أَبْوَابًا', words:[
    {ar:'أَبْوَابًا', tr:'abwāban', en:'gateways', freq:8},
    {ar:'فَكَانَتْ', tr:'fa-kānat', en:'and becomes', freq:3},
    'al-sama',
    {ar:'وَفُتِحَتِ', tr:'wa-futiḥat', en:'And is opened', freq:2},
  ]},
  {label:'78:20 — وَسُيِّرَتِ الْجِبَالُ فَكَانَتْ سَرَابًا', words:[
    {ar:'سَرَابًا', tr:'sarāban', en:'a mirage', freq:2},
    {ar:'فَكَانَتْ', tr:'fa-kānat', en:'and becomes', freq:3},
    'al-jibal-u',
    {ar:'وَسُيِّرَتِ', tr:'wa-suyyirat', en:'And are removed', freq:1},
  ]},
  {label:'78:21 — إِنَّ جَهَنَّمَ كَانَتْ مِرْصَادًا', words:[
    {ar:'مِرْصَادًا', tr:'mirṣādan', en:'lying in wait', freq:1},
    'kaanat',
    'jahannam',
    'inna',
  ]},
  {label:'78:22 — لِّلطَّاغِينَ مَآبًا', words:[
    {ar:'مَآبًا', tr:'maʾāban', en:'a place of return', freq:3},
    {ar:'لِّلطَّاغِينَ', tr:'lil-ṭāghīn', en:'for the transgressors', freq:3},
  ]},
  {label:'78:23 — لَّابِثِينَ فِيهَا أَحْقَابًا', words:[
    {ar:'أَحْقَابًا', tr:'aḥqāban', en:'for ages / eons', freq:1},
    'fiiha',
    {ar:'لَّابِثِينَ', tr:'lābithīn', en:'remaining / dwelling', freq:1},
  ]},
  {label:'78:24 — لَّا يَذُوقُونَ فِيهَا بَرْدًا وَلَا شَرَابًا', words:[
    {ar:'شَرَابًا', tr:'sharāban', en:'drink', freq:5},
    'wala',
    {ar:'بَرْدًا', tr:'bardan', en:'coolness', freq:2},
    'fiiha',
    {ar:'يَذُوقُونَ', tr:'yadhūqūna', en:'they will taste', freq:4},
    'la',
  ]},
  {label:'78:25 — إِلَّا حَمِيمًا وَغَسَّاقًا', words:[
    {ar:'وَغَسَّاقًا', tr:'wa-ghassāqan', en:'and purulence (foul fluid)', freq:2},
    {ar:'حَمِيمًا', tr:'ḥamīman', en:'scalding water', freq:5},
    'illa',
  ]},
  {label:'78:26 — جَزَاءً وِفَاقًا', words:[
    {ar:'وِفَاقًا', tr:'wifāqan', en:'appropriate / fitting', freq:1},
    'jazaa',
  ]},
  {label:'78:27 — إِنَّهُمْ كَانُوا لَا يَرْجُونَ حِسَابًا', words:[
    'hisaab',
    {ar:'يَرْجُونَ', tr:'yarjūna', en:'expecting', freq:5},
    'la',
    'kaanu',
    {ar:'إِنَّهُمْ', tr:'innahum', en:'Indeed they', freq:50},
  ]},
  {label:'78:28 — وَكَذَّبُوا بِآيَاتِنَا كِذَّابًا', words:[
    {ar:'كِذَّابًا', tr:'kidhdhāban', en:'(emphatic) denial', freq:2},
    {ar:'بِآيَاتِنَا', tr:'bi-āyātinā', en:'Our verses / signs', freq:40},
    {ar:'وَكَذَّبُوا', tr:'wa-kadhdhabū', en:'And they denied', freq:25},
  ]},
  {label:'78:29 — وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ كِتَابًا', words:[
    {ar:'كِتَابًا', tr:'kitāban', en:'in writing', freq:230},
    {ar:'أَحْصَيْنَاهُ', tr:'aḥṣaynāhu', en:'We have recorded it', freq:1},
    'shay',
    {ar:'وَكُلَّ', tr:'wa-kulla', en:'And every', freq:330},
  ]},
  {label:'78:30 — فَذُوقُوا فَلَن نَّزِيدَكُمْ إِلَّا عَذَابًا', words:[
    'adhaab',
    'illa',
    {ar:'نَّزِيدَكُمْ', tr:'nazīdakum', en:'We will increase you', freq:1},
    {ar:'فَلَن', tr:'fa-lan', en:'for never will', freq:15},
    {ar:'فَذُوقُوا', tr:'fa-dhūqū', en:'So taste!', freq:5},
  ]},
  {label:'78:31 — إِنَّ لِلْمُتَّقِينَ مَفَازًا', words:[
    {ar:'مَفَازًا', tr:'mafāzan', en:'triumph / success', freq:1},
    'al-muttaqin',
    'inna',
  ]},
  {label:'78:32 — حَدَائِقَ وَأَعْنَابًا', words:[
    {ar:'وَأَعْنَابًا', tr:'wa-aʿnāban', en:'and grapevines', freq:11},
    {ar:'حَدَائِقَ', tr:'ḥadāʾiq', en:'gardens (enclosed)', freq:3},
  ]},
  {label:'78:33 — وَكَوَاعِبَ أَتْرَابًا', words:[
    {ar:'أَتْرَابًا', tr:'atrāban', en:'of equal age', freq:3},
    {ar:'وَكَوَاعِبَ', tr:'wa-kawāʿib', en:'and companions', freq:1},
  ]},
  {label:'78:34 — وَكَأْسًا دِهَاقًا', words:[
    {ar:'دِهَاقًا', tr:'dihāqan', en:'full / overflowing', freq:1},
    {ar:'وَكَأْسًا', tr:'wa-kaʾsan', en:'and a cup', freq:3},
  ]},
  {label:'78:35 — لَّا يَسْمَعُونَ فِيهَا لَغْوًا وَلَا كِذَّابًا', words:[
    {ar:'كِذَّابًا', tr:'kidhdhāban', en:'any falsehood', freq:2},
    'wala',
    {ar:'لَغْوًا', tr:'laghwan', en:'vain / ill speech', freq:5},
    'fiiha',
    {ar:'يَسْمَعُونَ', tr:'yasmaʿūna', en:'they will hear', freq:10},
    'la',
  ]},
  {label:'78:36 — جَزَاءً مِّن رَّبِّكَ عَطَاءً حِسَابًا', words:[
    'hisaab',
    {ar:'عَطَاءً', tr:'ʿaṭāʾan', en:'a generous gift', freq:5},
    'rabbika',
    'min',
    'jazaa',
  ]},
  {label:'78:37 — رَّبِّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الرَّحْمَٰنِ', words:[
    'al-rahman',
    {ar:'بَيْنَهُمَا', tr:'baynahumā', en:'between them', freq:21},
    'ma',
    'wal-ard',
    'al-samawat',
    'rabb',
  ]},
  {label:'78:37b — لَا يَمْلِكُونَ مِنْهُ خِطَابًا', words:[
    {ar:'خِطَابًا', tr:'khiṭāban', en:'(authority for) speech', freq:2},
    {ar:'مِنْهُ', tr:'minhu', en:'from Him', freq:50},
    {ar:'يَمْلِكُونَ', tr:'yamlikūna', en:'they possess', freq:5},
    'la',
  ]},
  {label:'78:38 — يَوْمَ يَقُومُ الرُّوحُ وَالْمَلَائِكَةُ صَفًّا', words:[
    {ar:'صَفًّا', tr:'ṣaffan', en:'in rows', freq:3},
    'al-malaika',
    'al-ruh',
    {ar:'يَقُومُ', tr:'yaqūmu', en:'will stand', freq:9},
    'yawma',
  ]},
  {label:'78:38b — لَّا يَتَكَلَّمُونَ إِلَّا مَنْ أَذِنَ لَهُ الرَّحْمَٰنُ وَقَالَ صَوَابًا', words:[
    {ar:'صَوَابًا', tr:'ṣawāban', en:'what is correct', freq:1},
    'qala',
    'al-rahman-u',
    {ar:'لَهُ', tr:'lahu', en:'for him', freq:460},
    {ar:'أَذِنَ', tr:'adhina', en:'permits', freq:4},
    'man',
    'illa',
    {ar:'يَتَكَلَّمُونَ', tr:'yatakallamūna', en:'they will speak', freq:3},
    'la',
  ]},
  {label:'78:39 — ذَٰلِكَ الْيَوْمُ الْحَقُّ', words:[
    'al-haqq',
    'al-yawm',
    'dhalika',
  ]},
  {label:'78:39b — فَمَن شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ مَآبًا', words:[
    {ar:'مَآبًا', tr:'maʾāban', en:'a way of return', freq:3},
    {ar:'رَبِّهِ', tr:'rabbihi', en:'his Lord', freq:95},
    'ila',
    {ar:'اتَّخَذَ', tr:'ittakhadha', en:'may take', freq:15},
    {ar:'شَاءَ', tr:'shāʾa', en:'wills', freq:30},
    {ar:'فَمَن', tr:'fa-man', en:'so whoever', freq:40},
  ]},
  {label:'78:40 — إِنَّا أَنذَرْنَاكُمْ عَذَابًا قَرِيبًا', words:[
    {ar:'قَرِيبًا', tr:'qarīban', en:'near / imminent', freq:10},
    'adhaab',
    {ar:'أَنذَرْنَاكُمْ', tr:'andharnākum', en:'We have warned you', freq:2},
    'innaa',
  ]},
  {label:'78:40b — يَوْمَ يَنظُرُ الْمَرْءُ مَا قَدَّمَتْ يَدَاهُ', words:[
    {ar:'يَدَاهُ', tr:'yadāhu', en:'his hands', freq:35},
    {ar:'قَدَّمَتْ', tr:'qaddamat', en:'have put forth', freq:5},
    'ma',
    {ar:'الْمَرْءُ', tr:'al-marʾ', en:'a person', freq:7},
    {ar:'يَنظُرُ', tr:'yanẓuru', en:'will observe', freq:6},
    'yawma',
  ]},
  {label:'78:40c — وَيَقُولُ الْكَافِرُ يَا لَيْتَنِي كُنتُ تُرَابًا', words:[
    {ar:'تُرَابًا', tr:'turāban', en:'dust', freq:5},
    {ar:'كُنتُ', tr:'kuntu', en:'I had been', freq:70},
    {ar:'لَيْتَنِي', tr:'laytanī', en:'I wish that I', freq:7},
    'ya',
    'al-kaafir',
    {ar:'وَيَقُولُ', tr:'wa-yaqūlu', en:'and will say', freq:20},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_QUIZ = [
  { q: "What is \"An-Naba Al-Atheem\" (The Great News) that the Quraysh disputed?",
    opts: ['The birth of Prophet Muhammad ﷺ in Makkah',
           'The Day of Resurrection when all will be raised and held to account',
           'The revelation and origin of the Quran itself',
           'The original creation of the heavens and the earth'],
    correct: 1 },
  { q: "What does \"Kalla saya'lamoon\" (78:4-5) mean?",
    opts: ['"They will never come to know the truth at all"',
           '"No! They are going to know!" — a firm warning the Day is certain',
           '"Perhaps they will eventually learn one day in the future"',
           '"They should ask their scholars and learned ones"'],
    correct: 1 },
  { q: 'Why is "they will know" repeated TWICE in verses 4 and 5?',
    opts: ['Because there are two completely separate types of people',
           'Repetition signals absolute certainty — nothing could be more sure',
           'For rhythmic and beautiful poetic effect only',
           'Because the warning happened at two separate different times'],
    correct: 1 },
  { q: 'What does the surah name "An-Naba" mean?',
    opts: ['The Warning sent to disbelievers',
           'The Question being disputed',
           'The Great News / The Important Announcement',
           'The Dispute that is taking place'],
    correct: 2 },
];

const S2_ITEMS = [
  { id: 'e1', text: 'مِهَادًا',    zone: 'z1' },
  { id: 'e2', text: 'أَوْتَادًا',  zone: 'z2' },
  { id: 'e3', text: 'سُبَاتًا',   zone: 'z3' },
  { id: 'e4', text: 'لِبَاسًا',   zone: 'z4' },
  { id: 'e5', text: 'مَعَاشًا',   zone: 'z5' },
];
const S2_ZONES = [
  { id: 'z1', desc: 'a resting place — "the earth a resting place" (78:6)' },
  { id: 'z2', desc: 'as stakes / pegs — "the mountains as pegs" (78:7)' },
  { id: 'z3', desc: 'a means of rest — "your sleep as rest" (78:9)' },
  { id: 'z4', desc: 'a covering — "the night as a covering" (78:10)' },
  { id: 'z5', desc: 'for livelihood — "the day for livelihood" (78:11)' },
];

const S3_ITEMS = [
  { id: 's1', text: 'شِدَادًا',   zone: 'z1' },
  { id: 's2', text: 'سِرَاجًا وَهَّاجًا', zone: 'z2' },
  { id: 's3', text: 'ثَجَّاجًا',  zone: 'z3' },
  { id: 's4', text: 'حَبًّا وَنَبَاتًا', zone: 'z4' },
];
const S3_ZONES = [
  { id: 'z1', desc: 'strong / mighty — "seven strong heavens" (78:12)' },
  { id: 'z2', desc: 'a blazing lamp — "a burning lamp (the sun)" (78:13)' },
  { id: 'z3', desc: 'pouring abundantly — "water in torrents" (78:14)' },
  { id: 'z4', desc: 'grain and vegetation — "grain, plants, and gardens" (78:15-16)' },
];

const S4_EVENTS_CORRECT = [
  { id: 'd1', text: '📅 The Day of Decision (Yawm al-Fasl) has its fixed, appointed time (78:17)' },
  { id: 'd2', text: '📯 The Horn is blown — all the dead rise and come forth in vast crowds (78:18)' },
  { id: 'd3', text: '🌌 The sky is torn open and becomes like gates (78:19)' },
  { id: 'd4', text: '⛰️ The mountains are moved away completely — they become a mirage (78:20)' },
];
window._S4_EVENTS = S4_EVENTS_CORRECT;

const S5_QUIZ = [
  { q: 'What does "mirsad" mean for Hell in 78:21?',
    opts: ['A watch-post / ambush — Hell is lying in wait and alert',
           'A training ground where sinners are corrected and reformed',
           'A temporary holding place before the judgment begins',
           'A dark cave that contains absolutely no fire at all'],
    correct: 0 },
  { q: 'How long do the transgressors remain in Hell according to 78:23?',
    opts: ['100 years — after which they are finally allowed to leave',
           'Until the Day of Judgment — then moved to their final place',
           '"Ahqaban" — ages upon ages, an immeasurably long time',
           'It varies based on the precise nature of their sins'],
    correct: 2 },
  { q: 'What do they drink in Hell instead of cold water (78:24-25)?',
    opts: ['Nothing at all — they receive absolutely no drink',
           '"Hameem" (scalding water) and "Ghassaq" (dark, putrid fluid)',
           'Bitter water that has a horrible taste of aloe plant',
           'Only hot, suffocating steam and nothing liquid at all'],
    correct: 1 },
  { q: 'What was the root cause of their punishment (78:27-28)?',
    opts: ['They were too poor to fulfil the charity requirement of zakat',
           'They forgot to pray on many occasions during their lives',
           'They made repeated mistakes in reciting the Quran aloud',
           '"They did not expect any account" and "denied Our signs"'],
    correct: 3 },
];

const S6_ITEMS = [
  { id: 'p1', text: 'حَدَائِقَ وَأَعْنَابًا', zone: 'z1' },
  { id: 'p2', text: 'أَتْرَابًا',              zone: 'z2' },
  { id: 'p3', text: 'دِهَاقًا',               zone: 'z3' },
  { id: 'p4', text: 'لَغْوًا وَلَا كِذَّابًا', zone: 'z4' },
];
const S6_ZONES = [
  { id: 'z1', desc: 'gardens and grapevines — reward for the righteous (78:31-32)' },
  { id: 'z2', desc: 'of equal age — companions in Paradise (78:33)' },
  { id: 'z3', desc: 'full / overflowing — a brimming cup (78:34)' },
  { id: 'z4', desc: 'no vain speech or falsehood — peace in Paradise (78:35)' },
];

const S7_QUIZ = [
  { q: 'Who is "ar-Ruh" (the Spirit) who stands in a row on that Day (78:38)?',
    opts: ["The soul of every single individual person",
           "The souls of all the prophets gathered together",
           "A special creation that Allah has not yet fully described",
           "Jibreel (Angel Gabriel) — the greatest of all angels"],
    correct: 3 },
  { q: 'Who may speak on the Day the Spirit and angels stand in rows (78:38)?',
    opts: ["Only one given permission by ar-Rahman — speaking only truth",
           "All prophets speak freely as advocates for their nations",
           "The believers can fully explain their deeds and intentions",
           "The angels speak on behalf of every human soul"],
    correct: 0 },
  { q: 'What does "Rabb al-samawati wal-ard wa ma baynahuma ar-Rahman" establish?',
    opts: ["That Allah rules only the sky and not the earth",
           "Lord of heavens, earth, and ALL between — His complete sovereignty",
           "That ar-Rahman is a separate name from the name Allah",
           "That only believers have a Lord to answer to"],
    correct: 1 },
];

const S8_QUIZ = [
  { q: 'What is "Yawm al-Haqq" (The Day of Truth) in 78:39?',
    opts: ['A day of judgment reserved only for non-believers',
           'The specific day the Quran was first revealed to the Prophet ﷺ',
           'The day when the sun rises from the West as a final sign',
           'The Day when all truth becomes clear — every lie dissolved'],
    correct: 3 },
  { q: 'How near is the punishment according to 78:40?',
    opts: ['"It is far away — nothing to worry about yet at all"',
           '"It will only happen after exactly 1000 years have passed"',
           '"We have warned you of a punishment that is NEAR (qarib)"',
           '"Nobody knows at all when exactly it will come"'],
    correct: 2 },
  { q: 'What will the disbeliever cry out when he sees his deeds (78:40)?',
    opts: ['"I wish I had given far more charity in my life!"',
           '"Ya laytani kuntu turaban!" — "I wish I were dust!"',
           '"I wish I had been given more time to repent!"',
           '"I wish I could return to the world just once more!"'],
    correct: 1 },
];

// =============================================
//  SECTION WRAPPERS
// =============================================



function renderSection2Game() { renderQuiz(2, S1_QUIZ); }
function checkSection2()      { checkQuiz(2, S1_QUIZ); }
function renderSection3Game() { renderDragDrop(3, S2_ITEMS, S2_ZONES); }
function checkSection3()      { checkDragDrop(3, S2_ZONES); }
function renderSection4Game() { renderDragDrop(4, S3_ITEMS, S3_ZONES); }
function checkSection4()      { checkDragDrop(4, S3_ZONES); }
function renderSection5Game() { renderStoryOrder(5, S4_EVENTS_CORRECT); }
function checkSection5()      { checkStoryOrder(5, S4_EVENTS_CORRECT); }
function renderSection6Game() { renderQuiz(6, S5_QUIZ); }
function checkSection6()      { checkQuiz(6, S5_QUIZ); }
function renderSection7Game() { renderDragDrop(7, S6_ITEMS, S6_ZONES); }
function checkSection7()      { checkDragDrop(7, S6_ZONES); }
function renderSection8Game() { renderQuiz(8, S7_QUIZ); }
function checkSection8()      { checkQuiz(8, S7_QUIZ); }
function renderSection9Game() { renderQuiz(9, S8_QUIZ); }
function checkSection9()      { checkQuiz(9, S8_QUIZ); }

// =============================================
//  PARADISE GATE WORLD BUILDER (surah-specific)
// =============================================
function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  if (n >= 8) {
    const sk = ctx.createLinearGradient(0, 0, W, 0);
    sk.addColorStop(0, '#080215'); sk.addColorStop(0.45, '#1a3208'); sk.addColorStop(1, '#2a5010');
    ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
  } else { ctx.fillStyle = '#080215'; ctx.fillRect(0, 0, W, H); }
  for (let i = 0; i < 45; i++) {
    const sx = (i * 7123) % 260, sy = (i * 4419) % 175, br = 0.35 + (i % 3) * 0.18;
    ctx.fillStyle = `rgba(200,170,255,${br})`; ctx.fillRect(sx, sy, 1, 1);
  }
  if (n < 1) { _buildLabelNaba(ctx, W, '🌿 Complete levels to open the Gate of Paradise!', 0, 8); return; }
  ctx.fillStyle = '#2e2818'; ctx.fillRect(0, 210, W, 40);
  ctx.fillStyle = '#d0c8b0'; ctx.fillRect(215, 195, 130, 55);
  if (n < 2) { _buildLabelNaba(ctx, W, '🌿 Path to Paradise laid — 1/8', 1, 8); return; }
  if (n >= 2) { ctx.fillStyle = '#c8b880'; ctx.fillRect(192, 95, 38, 122); ctx.fillStyle = '#d8c890'; ctx.fillRect(192, 95, 38, 5); ctx.fillRect(188, 90, 46, 10); }
  if (n >= 3) { ctx.fillStyle = '#c8b880'; ctx.fillRect(330, 95, 38, 122); ctx.fillStyle = '#d8c890'; ctx.fillRect(330, 95, 38, 5); ctx.fillRect(326, 90, 46, 10); }
  if (n >= 4) { ctx.fillStyle = '#b8a870'; ctx.fillRect(96, 115, 96, 98); }
  if (n >= 5) { ctx.fillStyle = '#b8a870'; ctx.fillRect(368, 115, 96, 98); }
  if (n >= 6) {
    ctx.strokeStyle = '#d8c050'; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.arc(280, 95, 88, Math.PI, 0, false); ctx.stroke();
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(280, 4, 11, 0, Math.PI * 2); ctx.fill();
  }
  if (n >= 7 && n < 8) {
    ctx.fillStyle = '#a07808'; ctx.fillRect(230, 95, 50, 122); ctx.fillRect(280, 95, 50, 122);
    ctx.fillStyle = '#e0b020'; ctx.fillRect(234, 99, 42, 114); ctx.fillRect(284, 99, 42, 114);
  }
  if (n >= 8) {
    const pGrad = ctx.createLinearGradient(230, 0, 330, 0);
    pGrad.addColorStop(0, '#1a4a10'); pGrad.addColorStop(0.5, '#2a6018'); pGrad.addColorStop(1, '#1a4a10');
    ctx.fillStyle = pGrad; ctx.fillRect(230, 95, 100, 122);
    ctx.fillStyle = '#1c5012'; ctx.beginPath(); ctx.arc(258, 152, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#287018'; ctx.beginPath(); ctx.arc(302, 146, 17, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText('ALLAHUMMA BARIK! 🌿 GATES OF PARADISE OPEN!', W / 2, 20);
    ctx.textAlign = 'left';
  } else { _buildLabelNaba(ctx, W, `Building the Gate — ${n}/9 levels`, n, 8); }
}
function _buildLabelNaba(ctx, W, msg, done, total) {
  ctx.fillStyle = '#8840c8'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#0e0420'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#5a20a0'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
