'use strict';
/* ================================================
   SURAH AL-MULK — app.js  (data layer only)
   ================================================ */

window.STORAGE_KEY = 'mulkQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Answers: {}, s1Checked: false,
  s2Checked: false,
  s3Order:   [], s3Checked: false,
  s4Answers: {}, s4Checked: false,
  s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Order:   [], s7Checked: false,
  s8Answers: {}, s8Checked: false,
  s9Checked: false,
};

const REWARDS = {
  1: { xp: 90,  gems: 3, icon: '🌌', title: 'AL-MULK KNOWN!',
       msg: 'MashAllah! "Tabaraka" — Blessed is He in whose hand is all dominion. Death AND life created as a test. Not most deeds — BEST deeds. Ahsanu amala!' },
  2: { xp: 100, gems: 4, icon: '⭐', title: 'PERFECT HEAVENS!',
       msg: 'SubhanAllah! "Look. Look again. Do you see any breaks?" Still no flaws. Every star His lamp — and protection from the devils.' },
  3: { xp: 90,  gems: 3, icon: '🔥', title: 'THE WARNING RECEIVED!',
       msg: 'MashAllah! "Did no warner come to you?" Every person is warned — the Quran, the Prophet ﷺ, the fitrah. Use your hearing and your reason!' },
  4: { xp: 100, gems: 4, icon: '🌙', title: 'FEAR IN SECRET BUILT!',
       msg: 'SubhanAllah! "Does He who created not know?" Al-Latif, Al-Khabir. He knows every thought. Fear Him when no one is watching.' },
  5: { xp: 100, gems: 4, icon: '🌍', title: 'EARTH EXPLORED!',
       msg: "MashAllah! \"Dhalul\" — the earth made tame FOR YOU. Walk through it, eat from it. And to Him is the resurrection." },
  6: { xp: 110, gems: 4, icon: '🦅', title: 'TAWAKKUL UNLOCKED!',
       msg: 'SubhanAllah! "None holds them up except ar-Rahman." Spread your wings and work hard — but know that ONLY Allah is holding everything up.' },
  7: { xp: 100, gems: 3, icon: '🌟', title: 'SIGNS UNDERSTOOD!',
       msg: 'MashAllah! He gave us hearing, vision, and hearts. "How little thanks you give." (67:23) Today you gave thanks.' },
  8: { xp: 150, gems: 8, icon: '💧', title: 'SURAH AL-MULK COMPLETE!',
       msg: 'ALLAHUMMA BARIK! All 8 levels complete! "If your water was to sink into the earth — who then could bring you flowing water?" Only Allah. Ameen!' },
  9: { xp: 80, gems: 3, icon: '📖', title: 'BONUS COMPLETE!',
       msg: 'MashAllah! You mastered the Arabic words of Surah Al-Mulk word by word!' },
};

window.SURAH_CONFIG = {
  totalLevels: 9, wbwSection:9,
  rewards: REWARDS,
  tileIcons:  ['🌌','⭐','🔥','🌙','🌍','🦅','🌟','💧'],
  tileLabels: ['Al-Mulk','Seven Heavens','The Warning','Fear in Secret','The Earth','Birds & Tawakkul','Signs','The Water'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Surah Al-Mulk — "Tabaraka alladhi biyadihi al-mulk." 8 levels of sovereignty. Let's begin!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Tabaraka!" Keep going! 🌌`,
    complete: name => `MashAllah, ${name}! All 8 levels of Al-Mulk complete! May it be your intercessor. Ameen! 💧`,
  },
};

// =============================================
//  GAME DATA
// =============================================

const S1_QUIZ = [
  { q: 'What does "Al-Mulk" mean?',
    opts: ['The Star above the horizon',
           'The Sovereignty / Dominion',
           'The Protector of believers',
           'The Night and its darkness'],
    correct: 1 },
  { q: 'According to 67:1, what does Allah hold in His hand?',
    opts: ['All dominion — He is over all things competent',
           'The keys to Jannah only',
           'The Book of Deeds of all people',
           'The fate of believers only'],
    correct: 0 },
  { q: 'Why did Allah create both death AND life? (67:2)',
    opts: ['To show His great power and majesty',
           'To give people freedom to make choices',
           'To test which of you is BEST in deed',
           'To balance the universe perfectly'],
    correct: 2 },
  { q: 'The test in 67:2 is "ahsanu amala" — what does this mean?',
    opts: ['Most deeds — quantity is what counts',
           'Biggest charity and donation given',
           'Most prayers performed consistently',
           'BEST in deed — quality and sincerity matter most'],
    correct: 3 },
  { q: 'What special role does Surah Al-Mulk perform according to a hadith?',
    opts: ['It lights up the reciter\'s grave brilliantly',
           'It intercedes for its reciter until they are forgiven',
           'It specifically repels jinn and evil spirits',
           'It increases the reciter\'s provision (rizq)'],
    correct: 1 },
];

const S2_ITEMS = [
  { id: 'h1', text: '👁️ "Look once —\ndo you see flaws?"',   zone: 'z1' },
  { id: 'h2', text: '🔁 "Look AGAIN —\na second time"',       zone: 'z2' },
  { id: 'h3', text: '⭐ "Stars adorn\nthe nearest heaven"',   zone: 'z3' },
  { id: 'h4', text: '☄️ "Shooting stars\nchase the devils"',  zone: 'z4' },
];
const S2_ZONES = [
  { id: 'z1', desc: '"You see no inconsistency in the creation of the Most Merciful." No flaws anywhere! (67:3)' },
  { id: 'z2', desc: '"Your sight will return to you humbled while it is fatigued." (67:4)' },
  { id: 'z3', desc: '"We have adorned the nearest heaven with lamps (stars)." (67:5)' },
  { id: 'z4', desc: '"We have made them as missiles to drive away the devils." (67:5)' },
];

const S3_EVENTS_CORRECT = [
  { id: 'f1', text: '🔥 For those who disbelieve in their Lord — the punishment of Hell awaits (67:6)' },
  { id: 'f2', text: '😱 When thrown into it, they hear its terrifying inhaling — it almost bursts with rage (67:7-8)' },
  { id: 'f3', text: '⚔️ The guardians ask every group: "Did no warner come to you?" (67:8)' },
  { id: 'f4', text: '😔 They confess: "Yes! A warner came — but we denied him" (67:9)' },
  { id: 'f5', text: '💭 They say: "If only we had been listening or reasoning — we would not be here!" (67:10)' },
  { id: 'f6', text: '⚡ So they acknowledge their sin — but far removed from mercy are the companions of the Blaze (67:11)' },
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

const S4_QUIZ = [
  { q: 'What does Allah promise those who fear Him "in the unseen" (bil-ghayb)? (67:12)',
    opts: ['Wealth and health in this world',
           'Forgiveness AND a great reward',
           'Ease in their daily life only',
           'A longer and more blessed life'],
    correct: 1 },
  { q: "What logical argument does 67:14 make about Allah's knowledge?",
    opts: ['"He reads the Book of Deeds carefully"',
           '"Does He who CREATED not know?" — He made every heart',
           '"He has recording angels watching everything"',
           '"He tests people specifically to find out"'],
    correct: 1 },
  { q: 'What are the two Names of Allah mentioned in 67:14?',
    opts: ['Al-Aziz and Al-Hakim',
           'Al-Latif (the Subtle) and Al-Khabir (the Acquainted)',
           'Ar-Rahman and Ar-Rahim',
           'Al-Malik and Al-Quddus'],
    correct: 1 },
  { q: 'According to 67:13, what does Allah know of us?',
    opts: ['Only the spoken words that are said aloud',
           'Only public actions that others can see',
           'The future deeds that have yet to happen',
           'What is within the chests — innermost thoughts'],
    correct: 3 },
  { q: 'What is "khashyat al-ghayb" — fearing Allah in the unseen?',
    opts: ['Fearing supernatural beings and evil spirits',
           'Fearing the Day of Judgment and its events only',
           'Being afraid of the dark and unseen world',
           'Choosing right when no human is watching — the truest test'],
    correct: 3 },
];

const S5_ITEMS = [
  { id: 'e1', text: '🌍 "The earth made\ntame (dhalul)"',            zone: 'z1' },
  { id: 'e2', text: '⚡ "What if He causes\nearth to swallow you?"', zone: 'z2' },
  { id: 'e3', text: '🌬️ "What if a storm\nof stones is sent?"',     zone: 'z3' },
  { id: 'e4', text: '📜 "Those before you\nalso denied"',            zone: 'z4' },
];
const S5_ZONES = [
  { id: 'z1', desc: '"He made the earth tame for you — walk through its slopes and eat of His provision." (67:15)' },
  { id: 'z2', desc: '"Do you feel secure that He would not cause the earth to swallow you?" (67:16)' },
  { id: 'z3', desc: '"Or do you feel secure He would not send against you a storm of stones?" (67:17)' },
  { id: 'z4', desc: '"And already those before them denied — and how terrible was My reproach!" (67:18)' },
];

const S6_QUIZ = [
  { q: 'According to 67:19 — what holds the birds up in the sky?',
    opts: ['Air currents and warm wind underneath their wings',
           'None holds them except ar-Rahman (the Most Merciful)',
           'Their own strength and powerful flapping wings',
           'The laws of physics and aerodynamics alone'],
    correct: 1 },
  { q: 'What does birds in flight teach about tawakkul?',
    opts: ["Don't work — just trust Allah for everything",
           'Spread your wings and work — AND know only Allah holds it up',
           'Birds are the strongest example of creation\'s power',
           'Fly away from all problems instead of facing them'],
    correct: 1 },
  { q: 'What does 67:20 ask as a rhetorical question about armies?',
    opts: ['"How many soldiers do you need to be victorious?"',
           '"Who is it that could be an army for you other than ar-Rahman?"',
           '"Which nation currently has the strongest army?"',
           '"Should all believers form a single united army?"'],
    correct: 1 },
  { q: 'What does 67:21 warn about provision (rizq)?',
    opts: ['Provision is earned only through extremely hard work',
           'Store extra food and water for all emergencies',
           'Never waste food — it is a gift from Allah',
           '"Who provides for you if He withholds?" — all rizq is from Allah'],
    correct: 3 },
  { q: 'What word describes disbelievers who rely on other than Allah (67:20)?',
    opts: ['Kafir — a plain disbeliever',
           'Fil ghurur — in delusion',
           'Dhalimun — clear wrongdoers',
           'Fasiqun — openly disobedient'],
    correct: 1 },
];

const S7_EVENTS_CORRECT = [
  { id: 'sg1', text: "👁️ Allah gave us hearing, vision, and hearts (af'ida) — but how little thanks is given! (67:23)" },
  { id: 'sg2', text: '🌍 He scattered us across the earth — and to Him we will be gathered (67:24)' },
  { id: 'sg3', text: '❓ The disbelievers challenge: "When will this promise come — if you are truthful?" (67:25)' },
  { id: 'sg4', text: '🗣️ The Prophet ﷺ responds: "The knowledge is only with Allah — I am only a plain warner" (67:26)' },
  { id: 'sg5', text: '😰 When they SEE it approaching — the faces of disbelievers will be full of grief (67:27)' },
  { id: 'sg6', text: '📢 And it will be said: "This is what you used to call for (in mockery)" (67:27)' },
];
window._S7_EVENTS = S7_EVENTS_CORRECT;

const S8_QUIZ = [
  { q: "What is the believer's declaration according to 67:29?",
    opts: ['"We fight for Allah\'s sake alone"',
           '"He is ar-Rahman — we believed in Him and relied on Him"',
           '"We obey the Messenger in all things always"',
           '"We give charity every single day"'],
    correct: 1 },
  { q: 'What does 67:28 say — even if the Prophet ﷺ and believers were to die?',
    opts: ['The religion of Islam would come to an end',
           '"Who will protect the disbelievers from punishment?" — nothing saves them',
           'Allah would immediately replace them all',
           'The Quran itself would eventually be lost'],
    correct: 1 },
  { q: 'What is the final verse (67:30) asking?',
    opts: ['"Who originally created all the seas?"',
           '"If your water sank — who then could bring you flowing water?"',
           '"Why exactly do rivers flow continuously?"',
           '"Who causes the clouds to make rain fall?"'],
    correct: 1 },
  { q: 'What does the question about flowing water emphasize?',
    opts: ['That rivers and streams are intrinsically beautiful',
           'Allah created two completely different types of water',
           'Water is only a test to see gratitude',
           'Our total dependence on Allah for this most basic necessity'],
    correct: 3 },
  { q: 'Surah Al-Mulk is also called "Al-Waqiya" — what does this mean?',
    opts: ['The Dominion and Kingdom',
           'The Shield / The Protector of its reciter from grave punishment',
           'The Surah of Water and provision',
           'The Night Surah recited at bedtime'],
    correct: 1 },
];

// =============================================
//  SECTION WRAPPERS
// =============================================
function renderSection1Game() { renderQuiz(1, S1_QUIZ); }
function checkSection1()      { checkQuiz(1, S1_QUIZ); }
function renderSection2Game() { renderDragDrop(2, S2_ITEMS, S2_ZONES); }
function checkSection2()      { checkDragDrop(2, S2_ZONES); }
function renderSection3Game() { renderStoryOrder(3, S3_EVENTS_CORRECT); }
function checkSection3()      { checkStoryOrder(3, S3_EVENTS_CORRECT); }
function renderSection4Game() { renderQuiz(4, S4_QUIZ); }
function checkSection4()      { checkQuiz(4, S4_QUIZ); }
function renderSection5Game() { renderDragDrop(5, S5_ITEMS, S5_ZONES); }
function checkSection5()      { checkDragDrop(5, S5_ZONES); }
function renderSection6Game() { renderQuiz(6, S6_QUIZ); }
function checkSection6()      { checkQuiz(6, S6_QUIZ); }
function renderSection7Game() { renderStoryOrder(7, S7_EVENTS_CORRECT); }
function checkSection7()      { checkStoryOrder(7, S7_EVENTS_CORRECT); }
function renderSection8Game() { renderQuiz(8, S8_QUIZ); }
function checkSection8()      { checkQuiz(8, S8_QUIZ); }

// =============================================
//  WORD-BY-WORD DATA — Surah Al-Mulk (67), 30 verses
// =============================================
const WBW_DATA = [
  {label:'67:1 — تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', words:[
    {ar:'تَبَارَكَ', tr:'tabāraka', en:'Blessed is', freq:9},
    {ar:'الَّذِي', tr:'alladhī', en:'He Who', freq:1283},
    {ar:'بِيَدِهِ', tr:'bi-yadihi', en:'in Whose Hand is', freq:5},
    {ar:'الْمُلْكُ', tr:'al-mulk', en:'the dominion', freq:46},
    {ar:'وَهُوَ', tr:'wa-huwa', en:'and He is', freq:250},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'over', freq:700},
    {ar:'كُلِّ', tr:'kulli', en:'every', freq:330},
    {ar:'شَيْءٍ', tr:'shayʾin', en:'thing', freq:283},
    {ar:'قَدِيرٌ', tr:'qadīr', en:'competent', freq:45},
  ]},
  {label:'67:2 — الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا', words:[
    {ar:'خَلَقَ', tr:'khalaqa', en:'created', freq:180},
    {ar:'الْمَوْتَ', tr:'al-mawt', en:'death', freq:50},
    {ar:'وَالْحَيَاةَ', tr:'wal-ḥayāh', en:'and life', freq:73},
    {ar:'لِيَبْلُوَكُمْ', tr:'li-yabluwakum', en:'to test you', freq:5},
    {ar:'أَيُّكُمْ', tr:'ayyukum', en:'which of you', freq:3},
    {ar:'أَحْسَنُ', tr:'aḥsanu', en:'is best', freq:36},
    {ar:'عَمَلًا', tr:'ʿamalan', en:'in deed', freq:60},
    {ar:'الْعَزِيزُ', tr:'al-ʿazīz', en:'the Almighty', freq:90},
    {ar:'الْغَفُورُ', tr:'al-ghafūr', en:'the Forgiving', freq:91},
  ]},
  {label:'67:3 — الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا', words:[
    {ar:'سَبْعَ', tr:'sabʿa', en:'seven', freq:24},
    {ar:'سَمَاوَاتٍ', tr:'samāwāt', en:'heavens', freq:190},
    {ar:'طِبَاقًا', tr:'ṭibāqan', en:'in layers', freq:2},
    {ar:'مَا تَرَىٰ', tr:'mā tarā', en:'you do not see', freq:60},
    {ar:'خَلْقِ', tr:'khalqi', en:'the creation of', freq:73},
    {ar:'الرَّحْمَٰنِ', tr:'ar-raḥmān', en:'the Most Merciful', freq:57},
    {ar:'تَفَاوُتٍ', tr:'tafāwut', en:'inconsistency', freq:1},
    {ar:'فَارْجِعِ', tr:'fa-rjiʿi', en:'so return', freq:5},
    {ar:'الْبَصَرَ', tr:'al-baṣar', en:'your vision', freq:40},
    {ar:'هَلْ تَرَىٰ', tr:'hal tarā', en:'do you see', freq:60},
    {ar:'فُطُورٍ', tr:'fuṭūr', en:'any cracks', freq:1},
  ]},
  {label:'67:4 — ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ', words:[
    {ar:'ثُمَّ', tr:'thumma', en:'then', freq:340},
    {ar:'ارْجِعِ', tr:'irjiʿi', en:'return', freq:5},
    {ar:'الْبَصَرَ', tr:'al-baṣar', en:'your vision', freq:40},
    {ar:'كَرَّتَيْنِ', tr:'karratayni', en:'two more times', freq:1},
    {ar:'يَنقَلِبْ', tr:'yanqalib', en:'it will return', freq:4},
    {ar:'إِلَيْكَ', tr:'ilayka', en:'to you', freq:50},
    {ar:'خَاسِئًا', tr:'khāsiʾan', en:'humbled', freq:2},
    {ar:'حَسِيرٌ', tr:'ḥasīr', en:'fatigued', freq:1},
  ]},
  {label:'67:5 — وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ', words:[
    {ar:'وَلَقَدْ', tr:'wa-laqad', en:'and certainly', freq:75},
    {ar:'زَيَّنَّا', tr:'zayyannā', en:'We adorned', freq:6},
    {ar:'السَّمَاءَ', tr:'as-samāʾ', en:'the sky', freq:310},
    {ar:'الدُّنْيَا', tr:'ad-dunyā', en:'of this world', freq:115},
    {ar:'بِمَصَابِيحَ', tr:'bi-maṣābīḥ', en:'with lamps', freq:2},
    {ar:'وَجَعَلْنَاهَا', tr:'wa-jaʿalnāhā', en:'and made them', freq:10},
    {ar:'رُجُومًا', tr:'rujūman', en:'as missiles', freq:1},
    {ar:'لِّلشَّيَاطِينِ', tr:'lil-shayāṭīn', en:'for the devils', freq:18},
    {ar:'وَأَعْتَدْنَا', tr:'wa-aʿtadnā', en:'and We prepared', freq:5},
    {ar:'عَذَابَ', tr:'ʿadhāb', en:'punishment of', freq:230},
    {ar:'السَّعِيرِ', tr:'as-saʿīr', en:'the Blaze', freq:16},
  ]},
  {label:'67:6 — وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ وَبِئْسَ الْمَصِيرُ', words:[
    {ar:'وَلِلَّذِينَ', tr:'wa-lilladhīna', en:'and for those who', freq:60},
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieved', freq:200},
    {ar:'بِرَبِّهِمْ', tr:'bi-rabbihim', en:'in their Lord', freq:15},
    {ar:'عَذَابُ', tr:'ʿadhābu', en:'is the punishment of', freq:230},
    {ar:'جَهَنَّمَ', tr:'jahannam', en:'Hell', freq:77},
    {ar:'وَبِئْسَ', tr:'wa-biʾsa', en:'and wretched is', freq:13},
    {ar:'الْمَصِيرُ', tr:'al-maṣīr', en:'the destination', freq:28},
  ]},
  {label:'67:7 — إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ', words:[
    {ar:'إِذَا', tr:'idhā', en:'when', freq:406},
    {ar:'أُلْقُوا', tr:'ulqū', en:'they are thrown', freq:5},
    {ar:'فِيهَا', tr:'fīhā', en:'into it', freq:183},
    {ar:'سَمِعُوا', tr:'samiʿū', en:'they will hear', freq:20},
    {ar:'لَهَا', tr:'lahā', en:'from it', freq:100},
    {ar:'شَهِيقًا', tr:'shahīqan', en:'an inhaling', freq:2},
    {ar:'وَهِيَ', tr:'wa-hiya', en:'while it', freq:50},
    {ar:'تَفُورُ', tr:'tafūr', en:'boils up', freq:1},
  ]},
  {label:'67:8 — تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ', words:[
    {ar:'تَكَادُ', tr:'takādu', en:'it almost', freq:12},
    {ar:'تَمَيَّزُ', tr:'tamayyazu', en:'bursts', freq:1},
    {ar:'مِنَ الْغَيْظِ', tr:'minal-ghayẓ', en:'with rage', freq:3},
    {ar:'كُلَّمَا', tr:'kullamā', en:'every time', freq:18},
    {ar:'أُلْقِيَ', tr:'ulqiya', en:'is thrown', freq:5},
    {ar:'فَوْجٌ', tr:'fawjun', en:'a group', freq:3},
    {ar:'سَأَلَهُمْ', tr:'saʾalahum', en:'will ask them', freq:10},
    {ar:'خَزَنَتُهَا', tr:'khazanatuhā', en:'its keepers', freq:3},
    {ar:'أَلَمْ', tr:'alam', en:'did not', freq:40},
    {ar:'يَأْتِكُمْ', tr:'yaʾtikum', en:'come to you', freq:10},
    {ar:'نَذِيرٌ', tr:'nadhīr', en:'a warner', freq:44},
  ]},
  {label:'67:9 — قَالُوا بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا', words:[
    {ar:'قَالُوا', tr:'qālū', en:'they will say', freq:528},
    {ar:'بَلَىٰ', tr:'balā', en:'yes', freq:22},
    {ar:'قَدْ', tr:'qad', en:'indeed', freq:406},
    {ar:'جَاءَنَا', tr:'jāʾanā', en:'came to us', freq:15},
    {ar:'نَذِيرٌ', tr:'nadhīr', en:'a warner', freq:44},
    {ar:'فَكَذَّبْنَا', tr:'fa-kadhdhabnā', en:'but we denied', freq:6},
    {ar:'وَقُلْنَا', tr:'wa-qulnā', en:'and we said', freq:25},
    {ar:'مَا نَزَّلَ', tr:'mā nazzala', en:'not did send down', freq:10},
    {ar:'اللَّهُ', tr:'Allāh', en:'Allah', freq:2699},
    {ar:'مِن شَيْءٍ', tr:'min shayʾ', en:'anything', freq:283},
    {ar:'إِنْ أَنتُمْ', tr:'in antum', en:'you are not', freq:20},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:663},
    {ar:'ضَلَالٍ', tr:'ḍalāl', en:'error', freq:39},
    {ar:'كَبِيرٍ', tr:'kabīr', en:'great', freq:66},
  ]},
  {label:'67:10 — وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ', words:[
    {ar:'وَقَالُوا', tr:'wa-qālū', en:'and they will say', freq:130},
    {ar:'لَوْ', tr:'law', en:'if only', freq:147},
    {ar:'كُنَّا', tr:'kunnā', en:'we had been', freq:60},
    {ar:'نَسْمَعُ', tr:'nasmaʿu', en:'listening', freq:4},
    {ar:'أَوْ', tr:'aw', en:'or', freq:280},
    {ar:'نَعْقِلُ', tr:'naʿqilu', en:'reasoning', freq:1},
    {ar:'مَا كُنَّا', tr:'mā kunnā', en:'we would not be', freq:30},
    {ar:'فِي', tr:'fī', en:'among', freq:1714},
    {ar:'أَصْحَابِ', tr:'aṣḥāb', en:'companions of', freq:98},
    {ar:'السَّعِيرِ', tr:'as-saʿīr', en:'the Blaze', freq:16},
  ]},
  {label:'67:11 — فَاعْتَرَفُوا بِذَنبِهِمْ فَسُحْقًا لِّأَصْحَابِ السَّعِيرِ', words:[
    {ar:'فَاعْتَرَفُوا', tr:'fa-ʿtarafū', en:'so they will confess', freq:1},
    {ar:'بِذَنبِهِمْ', tr:'bi-dhanbihim', en:'their sin', freq:7},
    {ar:'فَسُحْقًا', tr:'fa-suḥqan', en:'so away', freq:1},
    {ar:'لِّأَصْحَابِ', tr:'li-aṣḥābi', en:'with companions of', freq:20},
    {ar:'السَّعِيرِ', tr:'as-saʿīr', en:'the Blaze', freq:16},
  ]},
  {label:'67:12 — إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ', words:[
    {ar:'إِنَّ', tr:'inna', en:'indeed', freq:743},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1000},
    {ar:'يَخْشَوْنَ', tr:'yakhshawna', en:'fear', freq:11},
    {ar:'رَبَّهُم', tr:'rabbahum', en:'their Lord', freq:60},
    {ar:'بِالْغَيْبِ', tr:'bil-ghayb', en:'in the unseen', freq:12},
    {ar:'لَهُم', tr:'lahum', en:'for them is', freq:250},
    {ar:'مَّغْفِرَةٌ', tr:'maghfirah', en:'forgiveness', freq:36},
    {ar:'وَأَجْرٌ', tr:'wa-ajr', en:'and a reward', freq:50},
    {ar:'كَبِيرٌ', tr:'kabīr', en:'great', freq:66},
  ]},
  {label:'67:13 — وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ', words:[
    {ar:'وَأَسِرُّوا', tr:'wa-asirrū', en:'and conceal', freq:1},
    {ar:'قَوْلَكُمْ', tr:'qawlakum', en:'your speech', freq:3},
    {ar:'أَوِ', tr:'aw', en:'or', freq:280},
    {ar:'اجْهَرُوا', tr:'ijharū', en:'publicize it', freq:2},
    {ar:'بِهِ', tr:'bihi', en:'it', freq:190},
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed He is', freq:100},
    {ar:'عَلِيمٌ', tr:'ʿalīm', en:'Knowing', freq:157},
    {ar:'بِذَاتِ', tr:'bi-dhāti', en:'of what is in', freq:5},
    {ar:'الصُّدُورِ', tr:'aṣ-ṣudūr', en:'the chests', freq:15},
  ]},
  {label:'67:14 — أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ', words:[
    {ar:'أَلَا', tr:'alā', en:'does not', freq:30},
    {ar:'يَعْلَمُ', tr:'yaʿlamu', en:'know', freq:75},
    {ar:'مَنْ', tr:'man', en:'He Who', freq:350},
    {ar:'خَلَقَ', tr:'khalaqa', en:'created', freq:180},
    {ar:'وَهُوَ', tr:'wa-huwa', en:'and He is', freq:250},
    {ar:'اللَّطِيفُ', tr:'al-laṭīf', en:'the Subtle', freq:7},
    {ar:'الْخَبِيرُ', tr:'al-khabīr', en:'the Acquainted', freq:35},
  ]},
  {label:'67:15 — هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ وَإِلَيْهِ النُّشُورُ', words:[
    {ar:'هُوَ', tr:'huwa', en:'He is', freq:526},
    {ar:'جَعَلَ', tr:'jaʿala', en:'made', freq:340},
    {ar:'لَكُمُ', tr:'lakum', en:'for you', freq:200},
    {ar:'الْأَرْضَ', tr:'al-arḍ', en:'the earth', freq:461},
    {ar:'ذَلُولًا', tr:'dhalūlan', en:'tame / subservient', freq:1},
    {ar:'فَامْشُوا', tr:'fa-mshū', en:'so walk', freq:2},
    {ar:'مَنَاكِبِهَا', tr:'manākibihā', en:'in its slopes', freq:1},
    {ar:'وَكُلُوا', tr:'wa-kulū', en:'and eat', freq:23},
    {ar:'رِّزْقِهِ', tr:'rizqihi', en:'from His provision', freq:30},
    {ar:'النُّشُورُ', tr:'an-nushūr', en:'the resurrection', freq:4},
  ]},
  {label:'67:16 — أَأَمِنتُم مَّن فِي السَّمَاءِ أَن يَخْسِفَ بِكُمُ الْأَرْضَ فَإِذَا هِيَ تَمُورُ', words:[
    {ar:'أَأَمِنتُم', tr:'a-amintum', en:'do you feel secure', freq:2},
    {ar:'مَّن', tr:'man', en:'from He Who is', freq:350},
    {ar:'فِي السَّمَاءِ', tr:'fis-samāʾ', en:'in the heaven', freq:310},
    {ar:'أَن يَخْسِفَ', tr:'an yakhsifa', en:'that He would swallow', freq:2},
    {ar:'بِكُمُ', tr:'bikum', en:'you into', freq:30},
    {ar:'الْأَرْضَ', tr:'al-arḍ', en:'the earth', freq:461},
    {ar:'فَإِذَا', tr:'fa-idhā', en:'and then', freq:50},
    {ar:'هِيَ', tr:'hiya', en:'it', freq:200},
    {ar:'تَمُورُ', tr:'tamūr', en:'sways', freq:1},
  ]},
  {label:'67:17 — أَمْ أَمِنتُم مَّن فِي السَّمَاءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ', words:[
    {ar:'أَمْ', tr:'am', en:'or', freq:120},
    {ar:'أَمِنتُم', tr:'amintum', en:'do you feel secure', freq:2},
    {ar:'أَن يُرْسِلَ', tr:'an yursila', en:'that He would send', freq:20},
    {ar:'عَلَيْكُمْ', tr:'ʿalaykum', en:'upon you', freq:100},
    {ar:'حَاصِبًا', tr:'ḥāṣiban', en:'a storm of stones', freq:2},
    {ar:'فَسَتَعْلَمُونَ', tr:'fa-sataʿlamūn', en:'then you would know', freq:12},
    {ar:'كَيْفَ', tr:'kayfa', en:'how', freq:83},
    {ar:'نَذِيرِ', tr:'nadhīri', en:'is My warning', freq:44},
  ]},
  {label:'67:18 — وَلَقَدْ كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ', words:[
    {ar:'وَلَقَدْ', tr:'wa-laqad', en:'and already', freq:75},
    {ar:'كَذَّبَ', tr:'kadhdhaba', en:'denied', freq:75},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those', freq:1000},
    {ar:'مِن قَبْلِهِمْ', tr:'min qablihim', en:'before them', freq:40},
    {ar:'فَكَيْفَ', tr:'fa-kayfa', en:'then how', freq:20},
    {ar:'كَانَ', tr:'kāna', en:'was', freq:1358},
    {ar:'نَكِيرِ', tr:'nakīri', en:'My reproach', freq:4},
  ]},
  {label:'67:19 — أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ', words:[
    {ar:'أَوَلَمْ', tr:'awalam', en:'do they not', freq:12},
    {ar:'يَرَوْا', tr:'yaraw', en:'see', freq:35},
    {ar:'إِلَى', tr:'ilā', en:'towards', freq:742},
    {ar:'الطَّيْرِ', tr:'aṭ-ṭayr', en:'the birds', freq:13},
    {ar:'فَوْقَهُمْ', tr:'fawqahum', en:'above them', freq:8},
    {ar:'صَافَّاتٍ', tr:'ṣāffāt', en:'spreading wings', freq:3},
    {ar:'وَيَقْبِضْنَ', tr:'wa-yaqbiḍna', en:'and folding them', freq:1},
    {ar:'مَا يُمْسِكُهُنَّ', tr:'mā yumsikuhunna', en:'none holds them', freq:2},
    {ar:'إِلَّا', tr:'illā', en:'except', freq:663},
    {ar:'الرَّحْمَٰنُ', tr:'ar-raḥmān', en:'the Most Merciful', freq:57},
    {ar:'بِكُلِّ', tr:'bi-kulli', en:'of every', freq:60},
    {ar:'شَيْءٍ', tr:'shayʾin', en:'thing', freq:283},
    {ar:'بَصِيرٌ', tr:'baṣīr', en:'All-Seeing', freq:51},
  ]},
  {label:'67:20 — أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ الرَّحْمَٰنِ', words:[
    {ar:'أَمَّنْ', tr:'amman', en:'or who is', freq:10},
    {ar:'هَٰذَا', tr:'hādhā', en:'this', freq:300},
    {ar:'الَّذِي', tr:'alladhī', en:'who', freq:1283},
    {ar:'هُوَ', tr:'huwa', en:'is', freq:526},
    {ar:'جُندٌ', tr:'jundun', en:'an army', freq:9},
    {ar:'لَّكُمْ', tr:'lakum', en:'for you', freq:200},
    {ar:'يَنصُرُكُم', tr:'yanṣurukum', en:'to help you', freq:5},
    {ar:'مِّن دُونِ', tr:'min dūni', en:'other than', freq:60},
    {ar:'الْكَافِرُونَ', tr:'al-kāfirūn', en:'the disbelievers', freq:100},
    {ar:'غُرُورٍ', tr:'ghurūr', en:'delusion', freq:5},
  ]},
  {label:'67:21 — أَمَّنْ هَٰذَا الَّذِي يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُ بَل لَّجُّوا فِي عُتُوٍّ وَنُفُورٍ', words:[
    {ar:'يَرْزُقُكُمْ', tr:'yarzuqukum', en:'could provide you', freq:3},
    {ar:'إِنْ', tr:'in', en:'if', freq:500},
    {ar:'أَمْسَكَ', tr:'amsaka', en:'He withheld', freq:5},
    {ar:'رِزْقَهُ', tr:'rizqahu', en:'His provision', freq:30},
    {ar:'بَل', tr:'bal', en:'but', freq:127},
    {ar:'لَّجُّوا', tr:'lajjū', en:'they persisted', freq:2},
    {ar:'عُتُوٍّ', tr:'ʿutuwwin', en:'in arrogance', freq:5},
    {ar:'وَنُفُورٍ', tr:'wa-nufūr', en:'and aversion', freq:3},
  ]},
  {label:'67:22 — أَفَمَن يَمْشِي مُكِبًّا عَلَىٰ وَجْهِهِ أَهْدَىٰ أَمَّن يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ', words:[
    {ar:'أَفَمَن', tr:'afaman', en:'is he who', freq:10},
    {ar:'يَمْشِي', tr:'yamshī', en:'walks', freq:17},
    {ar:'مُكِبًّا', tr:'mukibban', en:'fallen on his face', freq:1},
    {ar:'عَلَىٰ وَجْهِهِ', tr:'ʿalā wajhihi', en:'upon his face', freq:7},
    {ar:'أَهْدَىٰ', tr:'ahdā', en:'better guided', freq:5},
    {ar:'أَمَّن', tr:'amman', en:'or one who', freq:10},
    {ar:'سَوِيًّا', tr:'sawiyyan', en:'upright', freq:5},
    {ar:'صِرَاطٍ', tr:'ṣirāṭ', en:'a path', freq:45},
    {ar:'مُّسْتَقِيمٍ', tr:'mustaqīm', en:'straight', freq:37},
  ]},
  {label:'67:23 — قُلْ هُوَ الَّذِي أَنشَأَكُمْ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ قَلِيلًا مَّا تَشْكُرُونَ', words:[
    {ar:'قُلْ', tr:'qul', en:'say', freq:332},
    {ar:'أَنشَأَكُمْ', tr:'anshaʾakum', en:'produced you', freq:4},
    {ar:'وَجَعَلَ', tr:'wa-jaʿala', en:'and made', freq:80},
    {ar:'لَكُمُ', tr:'lakum', en:'for you', freq:200},
    {ar:'السَّمْعَ', tr:'as-samʿ', en:'hearing', freq:30},
    {ar:'وَالْأَبْصَارَ', tr:'wal-abṣār', en:'and vision', freq:15},
    {ar:'وَالْأَفْئِدَةَ', tr:'wal-afʾidah', en:'and hearts', freq:5},
    {ar:'قَلِيلًا', tr:'qalīlan', en:'little', freq:29},
    {ar:'مَّا تَشْكُرُونَ', tr:'mā tashkurūn', en:'you give thanks', freq:12},
  ]},
  {label:'67:24 — قُلْ هُوَ الَّذِي ذَرَأَكُمْ فِي الْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ', words:[
    {ar:'قُلْ', tr:'qul', en:'say', freq:332},
    {ar:'ذَرَأَكُمْ', tr:'dharaʾakum', en:'dispersed you', freq:2},
    {ar:'فِي', tr:'fī', en:'in', freq:1714},
    {ar:'الْأَرْضِ', tr:'al-arḍ', en:'the earth', freq:461},
    {ar:'وَإِلَيْهِ', tr:'wa-ilayhi', en:'and to Him', freq:30},
    {ar:'تُحْشَرُونَ', tr:'tuḥsharūn', en:'you will be gathered', freq:7},
  ]},
  {label:'67:25 — وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ', words:[
    {ar:'وَيَقُولُونَ', tr:'wa-yaqūlūn', en:'and they say', freq:40},
    {ar:'مَتَىٰ', tr:'matā', en:'when is', freq:15},
    {ar:'هَٰذَا', tr:'hādhā', en:'this', freq:300},
    {ar:'الْوَعْدُ', tr:'al-waʿd', en:'promise', freq:20},
    {ar:'إِن كُنتُمْ', tr:'in kuntum', en:'if you are', freq:30},
    {ar:'صَادِقِينَ', tr:'ṣādiqīn', en:'truthful', freq:14},
  ]},
  {label:'67:26 — قُلْ إِنَّمَا الْعِلْمُ عِندَ اللَّهِ وَإِنَّمَا أَنَا نَذِيرٌ مُّبِينٌ', words:[
    {ar:'قُلْ', tr:'qul', en:'say', freq:332},
    {ar:'إِنَّمَا', tr:'innamā', en:'only', freq:130},
    {ar:'الْعِلْمُ', tr:'al-ʿilm', en:'the knowledge', freq:80},
    {ar:'عِندَ', tr:'ʿinda', en:'is with', freq:200},
    {ar:'اللَّهِ', tr:'Allāh', en:'Allah', freq:2699},
    {ar:'وَإِنَّمَا', tr:'wa-innamā', en:'and only', freq:130},
    {ar:'أَنَا', tr:'anā', en:'I am', freq:80},
    {ar:'نَذِيرٌ', tr:'nadhīr', en:'a warner', freq:44},
    {ar:'مُّبِينٌ', tr:'mubīn', en:'clear', freq:119},
  ]},
  {label:'67:27 — فَلَمَّا رَأَوْهُ زُلْفَةً سِيئَتْ وُجُوهُ الَّذِينَ كَفَرُوا وَقِيلَ هَٰذَا الَّذِي كُنتُم بِهِ تَدَّعُونَ', words:[
    {ar:'فَلَمَّا', tr:'fa-lammā', en:'but when', freq:70},
    {ar:'رَأَوْهُ', tr:'raʾawhu', en:'they see it', freq:10},
    {ar:'زُلْفَةً', tr:'zulfatan', en:'approaching', freq:3},
    {ar:'سِيئَتْ', tr:'sīʾat', en:'distressed will be', freq:3},
    {ar:'وُجُوهُ', tr:'wujūhu', en:'the faces of', freq:20},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1000},
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieved', freq:200},
    {ar:'وَقِيلَ', tr:'wa-qīla', en:'and it is said', freq:30},
    {ar:'هَٰذَا الَّذِي', tr:'hādhā alladhī', en:'this is what', freq:20},
    {ar:'كُنتُم بِهِ', tr:'kuntum bihi', en:'you used to', freq:15},
    {ar:'تَدَّعُونَ', tr:'taddaʿūn', en:'call for', freq:3},
  ]},
  {label:'67:28 — قُلْ أَرَأَيْتُمْ إِنْ أَهْلَكَنِيَ اللَّهُ وَمَن مَّعِيَ أَوْ رَحِمَنَا فَمَن يُجِيرُ الْكَافِرِينَ مِنْ عَذَابٍ أَلِيمٍ', words:[
    {ar:'قُلْ', tr:'qul', en:'say', freq:332},
    {ar:'أَرَأَيْتُمْ', tr:'araʾaytum', en:'have you considered', freq:12},
    {ar:'إِنْ', tr:'in', en:'if', freq:500},
    {ar:'أَهْلَكَنِيَ', tr:'ahlakaniya', en:'destroys me', freq:2},
    {ar:'اللَّهُ', tr:'Allāh', en:'Allah', freq:2699},
    {ar:'وَمَن مَّعِيَ', tr:'wa-man maʿiya', en:'and those with me', freq:5},
    {ar:'أَوْ رَحِمَنَا', tr:'aw raḥimanā', en:'or has mercy on us', freq:3},
    {ar:'فَمَن', tr:'fa-man', en:'then who', freq:30},
    {ar:'يُجِيرُ', tr:'yujīru', en:'can protect', freq:4},
    {ar:'الْكَافِرِينَ', tr:'al-kāfirīn', en:'the disbelievers', freq:100},
    {ar:'عَذَابٍ', tr:'ʿadhāb', en:'a punishment', freq:230},
    {ar:'أَلِيمٍ', tr:'alīm', en:'painful', freq:70},
  ]},
  {label:'67:29 — قُلْ هُوَ الرَّحْمَٰنُ آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا فَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ', words:[
    {ar:'قُلْ', tr:'qul', en:'say', freq:332},
    {ar:'هُوَ', tr:'huwa', en:'He is', freq:526},
    {ar:'الرَّحْمَٰنُ', tr:'ar-raḥmān', en:'the Most Merciful', freq:57},
    {ar:'آمَنَّا', tr:'āmannā', en:'we believed', freq:50},
    {ar:'بِهِ', tr:'bihi', en:'in Him', freq:190},
    {ar:'وَعَلَيْهِ', tr:'wa-ʿalayhi', en:'and upon Him', freq:30},
    {ar:'تَوَكَّلْنَا', tr:'tawakkalnā', en:'we relied', freq:6},
    {ar:'فَسَتَعْلَمُونَ', tr:'fa-sataʿlamūn', en:'you will know', freq:12},
    {ar:'مَنْ هُوَ', tr:'man huwa', en:'who is', freq:30},
    {ar:'ضَلَالٍ', tr:'ḍalāl', en:'error', freq:39},
    {ar:'مُّبِينٍ', tr:'mubīn', en:'clear', freq:119},
  ]},
  {label:'67:30 — قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ', words:[
    {ar:'قُلْ', tr:'qul', en:'say', freq:332},
    {ar:'أَرَأَيْتُمْ', tr:'araʾaytum', en:'have you considered', freq:12},
    {ar:'إِنْ', tr:'in', en:'if', freq:500},
    {ar:'أَصْبَحَ', tr:'aṣbaḥa', en:'became', freq:14},
    {ar:'مَاؤُكُمْ', tr:'māʾukum', en:'your water', freq:1},
    {ar:'غَوْرًا', tr:'ghawran', en:'sunken', freq:1},
    {ar:'فَمَن', tr:'fa-man', en:'then who', freq:30},
    {ar:'يَأْتِيكُم', tr:'yaʾtīkum', en:'could bring you', freq:10},
    {ar:'بِمَاءٍ', tr:'bi-māʾ', en:'water', freq:63},
    {ar:'مَّعِينٍ', tr:'maʿīn', en:'flowing', freq:3},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

// =============================================
//  SEVEN HEAVENS WORLD BUILDER (surah-specific)
// =============================================
function _buildLabelMulk(ctx, W, msg, done, total) {
  ctx.fillStyle = '#4060c0'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#080c1a'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#1e3080'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}
function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  const heavenPairs = [
    ['#020308','#05060e'],['#040614','#080c20'],['#060a1c','#0c1230'],
    ['#081030','#102040'],['#0a1440','#142050'],['#0c1850','#183060'],['#101e60','#203880'],
  ];
  const lH = Math.floor(H / 7);
  if (n < 1) { ctx.fillStyle = '#020308'; ctx.fillRect(0, 0, W, H); _buildLabelMulk(ctx, W, '🌌 Complete levels to reveal the Seven Heavens!', 0, 8); return; }
  for (let h = 0; h < 7; h++) {
    const stageNeeded = 7 - h, ly = h * lH, lh2 = h === 6 ? H - ly : lH;
    if (n >= stageNeeded) {
      const grad = ctx.createLinearGradient(0, ly, 0, ly + lh2);
      grad.addColorStop(0, heavenPairs[h][1]); grad.addColorStop(1, heavenPairs[h][0]);
      ctx.fillStyle = grad; ctx.fillRect(0, ly, W, lh2);
      ctx.fillStyle = 'rgba(100,130,255,0.35)'; ctx.font = '6px "Press Start 2P",monospace'; ctx.textAlign = 'right';
      ctx.fillText(`HEAVEN ${7 - h}`, W - 6, ly + lH * 0.58); ctx.textAlign = 'left';
    } else { ctx.fillStyle = '#010204'; ctx.fillRect(0, ly, W, lh2); }
  }
  ctx.strokeStyle = 'rgba(80,100,220,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([4,4]);
  for (let h = 1; h <= Math.min(n, 7); h++) { const ly = (7-h)*lH; ctx.beginPath(); ctx.moveTo(0,ly); ctx.lineTo(W,ly); ctx.stroke(); }
  ctx.setLineDash([]);
  for (let i = 0; i < 80; i++) {
    const sx = (i * 6143) % W, sy = 6 * lH + (i * 3761) % lH, br = 0.3 + (i % 5) * 0.12;
    ctx.fillStyle = `rgba(255,240,200,${br})`; ctx.fillRect(sx, sy, i % 9 === 0 ? 2 : 1, 1);
  }
  if (n >= 5) {
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2;
    for (let ss = 0; ss < 4; ss++) { const sx = 60 + ss * 120, sy = 6 * lH + 6 + ss * 3; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+45,sy-14); ctx.stroke(); ctx.fillStyle='#ffe060'; ctx.fillRect(sx+43,sy-16,7,7); }
  }
  if (n >= 6) {
    const sunR = 18 + (n-6)*8; ctx.strokeStyle='rgba(255,200,0,0.55)'; ctx.lineWidth=3;
    for (let ri=0;ri<8;ri++){const ra=(ri/8)*Math.PI*2;ctx.beginPath();ctx.moveTo(490+Math.cos(ra)*sunR,30+Math.sin(ra)*sunR);ctx.lineTo(490+Math.cos(ra)*(sunR+18),30+Math.sin(ra)*(sunR+18));ctx.stroke();}
    ctx.fillStyle='#ffcc00';ctx.beginPath();ctx.arc(490,30,sunR,0,Math.PI*2);ctx.fill();
  }
  if (n >= 8) {
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText('ALLAHUMMA BARIK! 🌌 SEVEN HEAVENS REVEALED!', W/2, 20); ctx.textAlign = 'left';
  } else { _buildLabelMulk(ctx, W, `Unveiling the heavens — ${n}/8 levels`, n, 8); }
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
