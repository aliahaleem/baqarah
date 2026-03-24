'use strict';
/* ================================================
   SURAH AL-BAQARAH — app.js
   Data layer only: STORAGE_KEY, state, SURAH_CONFIG,
   game data, section wrappers, world builder.
   All game mechanics live in shared/engine.js.
   All navigation/rewards live in shared/ui.js.
   ================================================ */

window.STORAGE_KEY = 'baqarahQuestSave';

window.state = {
  explorerName: '',
  xp: 0, gems: 0,
  completed: [],
  s1Checked: false,
  s2Answers: {}, s2Checked: false,
  s3Answers: {}, s3Checked: false,
  s4Checked: false,
  s5Answers: {}, s5Checked: false,
  s6Checked: false,
  s7Checked: false,
  s8Answers: {}, s8Checked: false,
  s9Checked: false,
  s10Answers:{}, s10Checked: false,
  s11Checked: false,
  s12Answers:{}, s12Checked: false,
  s13Checked: false,
};

const REWARDS = {
  1:  { xp:  80, gems: 3,  icon: '🌿', title: 'PLAINS UNLOCKED!',        msg: 'You discovered the 5 qualities of the Muttaqeen. The first land of your quest is yours! On to the Cave of Shadows...' },
  2:  { xp: 100, gems: 4,  icon: '🌑', title: 'SHADOWS CLEARED!',        msg: 'MashAllah! You understand the two groups who rejected guidance. Your torch lights the way! The Garden awaits...' },
  3:  { xp: 120, gems: 5,  icon: '🌟', title: 'GARDEN DISCOVERED!',      msg: "SubhanAllah! The story of Adam (AS) — the first human, the first test, the first tawbah. On to the Shores of Sinai!" },
  4:  { xp: 110, gems: 4,  icon: '🌊', title: 'SHORES DISCOVERED!',      msg: "MashAllah! You matched all five miracles of Bani Isra'il. Keep going!" },
  5:  { xp: 100, gems: 4,  icon: '🐄', title: 'MYSTERY SOLVED!',         msg: "SubhanAllah! Simple obedience is wisdom. On to Level 6!" },
  6:  { xp: 110, gems: 4,  icon: '💎', title: 'HARD HEART CRACKED!',     msg: "MashAllah! May Allah keep our hearts soft. Level 7 — the Ka'ba — awaits!" },
  7:  { xp: 120, gems: 5,  icon: '🕋', title: "KA'BA DISCOVERED!",       msg: "SubhanAllah! Every time you pray, you face the place Ibrahim and Ismail built with du'a." },
  8:  { xp: 100, gems: 4,  icon: '🧭', title: 'DIRECTION FOUND!',        msg: 'MashAllah! Now you know the Qibla and the verse of patience. Level 9 has the Big Rules!' },
  9:  { xp: 110, gems: 4,  icon: '📋', title: 'AL-BIRR MASTERED!',       msg: 'Excellent! Al-Birr is belief + generosity + worship + integrity + patience — all together.' },
  10: { xp: 130, gems: 5,  icon: '⚔️', title: 'BATTLE WON!',             msg: 'ALLAHU AKBAR! Small faithful armies beat giants when Allah is with them. Ayat al-Kursi is next!' },
  11: { xp: 150, gems: 6,  icon: '👑', title: 'KURSI MASTERED!',         msg: 'SubhanAllah! You know the greatest verse in the Quran. Recite it after every salah. The Garden awaits!' },
  12: { xp: 120, gems: 5,  icon: '🌱', title: 'GARDEN GROWN!',           msg: 'MashAllah! One grain → 700. Give sincerely and never fear losing. The Final Treasure is last!' },
  13: { xp: 200, gems: 10, icon: '🏆', title: 'SURAH COMPLETE!',         msg: 'ALLAHUMMA BARIK! All 13 levels done — all 286 verses of Al-Baqarah understood. May Allah make you among the Muttaqeen. آمين' },
};

window.SURAH_CONFIG = {
  totalLevels: 13,
  rewards: REWARDS,
  tileIcons:  ['🌿','🌑','🌟','🌊','🐄','💎','🕋','🧭','📋','⚔️','👑','🌱','🤲'],
  tileLabels: ["Plains","Caves","Garden","Shores","The Cow","Hard Heart","Ka'ba","Qibla","Al-Birr","Battle","Kursi","Charity","Du'a"],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Welcome to Baqarah Quest. You've memorised the greatest Surah — now discover its meaning! Choose Level 1 on the map below. 🗺️`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete — more knowledge awaits! 💪`,
    complete: name => `MashAllah, ${name}! Quest complete! All 13 levels done. May Allah bless your knowledge of Al-Baqarah. 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

// S1: Drag & Drop — Qualities of Muttaqeen (2:1-5)
const S1_ITEMS = [
  { id: 'i1', text: '🌙 الْغَيْبِ',     zone: 'z1' },
  { id: 'i2', text: '🕌 الصَّلَاةَ',     zone: 'z2' },
  { id: 'i3', text: '💰 يُنفِقُونَ',     zone: 'z3' },
  { id: 'i4', text: '📖 الْقُرْآن',      zone: 'z4' },
  { id: 'i5', text: '📜 الْكُتُبِ',      zone: 'z5' },
  { id: 'i6', text: '⚖️ الْآخِرَةِ',     zone: 'z6' },
];
const S1_ZONES = [
  { id: 'z1', desc: 'Things unseen by human eyes — angels, fate, Jannah, Jahannam, the Day of Judgment' },
  { id: 'z2', desc: 'Keeping the 5 daily prayers — your direct connection to Allah' },
  { id: 'z3', desc: 'Giving sadaqah & zakat — sharing your blessings with those in need' },
  { id: 'z4', desc: 'The final revelation sent to Prophet Muhammad ﷺ' },
  { id: 'z5', desc: 'The Torah of Musa, Injeel of Isa, and all earlier divine books' },
  { id: 'z6', desc: 'Full certainty in Paradise, Hellfire, and the Day of Return to Allah' },
];

// S2: Quiz — The Disbelievers & Hypocrites (2:6-20)
const S2_QUIZ = [
  { q: "When Allah says disbelievers' hearts are \"sealed,\" this means:",
    opts: ['They completely forgot the Quran',
           'They were born unable to believe',
           'They are physically deaf to words',
           'They chose to close their hearts so Allah sealed them'],
    correct: 3 },
  { q: "What is the KEY difference between hypocrites and open disbelievers?",
    opts: ['Hypocrites secretly pray more often',
           'Hypocrites say they believe but do not mean it',
           'Hypocrites are actually less dangerous',
           'Hypocrites read the Quran but disbelievers do not'],
    correct: 1 },
  { q: "In the Fire Parable (2:17), what happened to the hypocrites?",
    opts: ['Their fire burned them badly',
           'They found a better fire',
           'They all ran away safely',
           'Allah took away their light, leaving darkness'],
    correct: 3 },
  { q: "When told \"Don't spread corruption,\" the hypocrites replied:",
    opts: ['"We will try our very best"',
           '"Please forgive us for mistakes"',
           '"WE are only the reformers!"',
           '"We simply don\'t understand"'],
    correct: 2 },
  { q: "According to verse 2:10, what was in the hypocrites' hearts?",
    opts: ['Deep anger and jealousy',
           'A disease (spiritual sickness)',
           'Extreme fear and sadness',
           'Arrogance and excessive pride'],
    correct: 1 },
];

// S3: Fill-in-the-Blank — Banu Israel's Favours (2:47-60)
const S3_FIB = [
  {verse:'يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ الَّتِي أَنْعَمْتُ _____', opts:['عَلَيْكُمْ','لَكُمْ','فِيكُمْ','بَيْنَكُمْ'], correct:0, ref:'2:47', translation:'O Children of Israel, remember My favour which I bestowed upon you'},
  {verse:'وَإِذْ نَجَّيْنَاكُم مِّنْ آلِ _____ يَسُومُونَكُمْ سُوءَ الْعَذَابِ', opts:['فِرْعَوْنَ','قَارُونَ','هَامَانَ','جَالُوتَ'], correct:0, ref:'2:49', translation:'And when We saved you from the people of Pharaoh, who afflicted you with terrible torment'},
  {verse:'وَإِذْ فَرَقْنَا بِكُمُ _____ فَأَنجَيْنَاكُمْ', opts:['الْبَحْرَ','النَّهْرَ','الْأَرْضَ','الْجَبَلَ'], correct:0, ref:'2:50', translation:'And when We parted the sea for you and saved you'},
  {verse:'ثُمَّ اتَّخَذْتُمُ الْعِجْلَ مِن بَعْدِهِ وَأَنتُمْ _____', opts:['ظَالِمُونَ','غَافِلُونَ','كَافِرُونَ','خَاسِرُونَ'], correct:0, ref:'2:51', translation:'Then you took the calf for worship after him, and you were wrongdoers'},
  {verse:'وَإِذِ اسْتَسْقَىٰ مُوسَىٰ لِقَوْمِهِ فَقُلْنَا اضْرِب بِّعَصَاكَ _____', opts:['الْحَجَرَ','الْأَرْضَ','الْبَحْرَ','الْجَبَلَ'], correct:0, ref:'2:60', translation:'And when Musa asked for water for his people, We said: Strike the rock with your staff'},
];

// S4: Drag & Drop — Miracles of Bani Isra'il (2:49-60)
const S4_ITEMS = [
  { id: 'f1', text: '🌊 The Sea\nSplit in Two',   zone: 'z1' },
  { id: 'f2', text: '🍞 Manna\n& Salwa Birds',    zone: 'z2' },
  { id: 'f3', text: '💧 12 Springs\nfrom a Rock', zone: 'z3' },
  { id: 'f4', text: '☁️ The Cloud\nof Shade',     zone: 'z4' },
  { id: 'f5', text: '⛰️ Mount Sinai\nCovenant',   zone: 'z5' },
];
const S4_ZONES = [
  { id: 'z1', desc: '"We parted it — you walked through on dry land — then it closed over your enemies" (2:50)' },
  { id: 'z2', desc: '"We sent sweet food and birds from the sky — without farming or hunting" (2:57)' },
  { id: 'z3', desc: '"One strike of the staff on a single rock — and twelve springs gushed out, one per tribe" (2:60)' },
  { id: 'z4', desc: '"We covered you with it in the scorching heat of the Sinai desert" (2:57)' },
  { id: 'z5', desc: '"We raised it above you and gave you the Book — hold it firmly and remember!" (2:63)' },
];

// S5: Quiz — The Mystery Cow (2:62-74)
const S5_QUIZ = [
  { q: "When Allah told Bani Isra'il to slaughter a cow, what was their FIRST reaction?",
    opts: ['They obeyed without any questions',
           'They asked: "Are you mocking us?"',
           'They completely refused',
           'They asked which Prophet said this'],
    correct: 1 },
  { q: "How many extra questions did Bani Isra'il ask before obeying?",
    opts: ['None — they obeyed straight away',
           'One quick question only',
           'Three questions: age, colour, type',
           'Ten detailed questions in total'],
    correct: 2 },
  { q: "What happened when they touched the dead man with the cow's part?",
    opts: ['A mark appeared on the killer\'s hand',
           'A voice from the sky named the killer',
           'The murderer immediately confessed',
           'The dead man revived and named his killer'],
    correct: 3 },
  { q: "What is the KEY lesson of the Cow story?",
    opts: ['Always ask detailed questions first',
           'Simple obedience is best — extra questions make it harder',
           'Cows are sacred animals in Islam',
           'Miracles happen only through animals'],
    correct: 1 },
  { q: 'Why is "Al-Baqarah" the perfect name for this Surah?',
    opts: ['Cows are mentioned the most in it',
           'The Cow story tests simple obedience — the Surah\'s main theme',
           'Cattle were most important to Arabs',
           'It was a favourite story of the Companions'],
    correct: 1 },
];

// S6: Verse-to-Theme — Ibrahim's Journey (2:124-141)
const S6_THEME_ITEMS = [
  {id:'t1', text:'وَإِذِ ابْتَلَىٰ إِبْرَاهِيمَ رَبُّهُ بِكَلِمَاتٍ فَأَتَمَّهُنَّ', zone:'z1'},
  {id:'t2', text:'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ', zone:'z2'},
  {id:'t3', text:'رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ', zone:'z3'},
  {id:'t4', text:'رَبَّنَا وَابْعَثْ فِيهِمْ رَسُولًا مِّنْهُمْ', zone:'z4'},
  {id:'t5', text:'قُلْ بَلْ مِلَّةَ إِبْرَاهِيمَ حَنِيفًا', zone:'z5'},
];
const S6_THEME_ZONES = [
  {id:'z1', desc:'True Imamah (leadership) is earned through tested obedience — not inherited or claimed (2:124)'},
  {id:'z2', desc:'The best deeds combine action with du\'a — they built the Ka\'ba and prayed simultaneously (2:127)'},
  {id:'z3', desc:'Even a Prophet feared deviation — no one is safe without begging Allah for steadfastness (2:128)'},
  {id:'z4', desc:'A parent\'s du\'a can shape generations — our Prophet ﷺ was Ibrahim\'s du\'a answered (2:129)'},
  {id:'z5', desc:'True religion has no sect label — it is pure submission (hanifiyyah) to Allah alone (2:135)'},
];

// S7: Drag & Drop — Ibrahim & the Ka'ba (2:124-141)
const S7_ITEMS = [
  { id: 'k1', text: '🔥 Thrown\ninto the Fire',       zone: 'z1' },
  { id: 'k2', text: '👦 Son Ismail\nin the desert',   zone: 'z2' },
  { id: 'k3', text: "🕋 Raising\nthe Ka'ba walls",    zone: 'z3' },
  { id: 'k4', text: "🤲 Du'a for\na future Prophet",  zone: 'z4' },
  { id: 'k5', text: '⭐ Saw stars,\nmoon & sun',      zone: 'z5' },
];
const S7_ZONES = [
  { id: 'z1', desc: 'Allah made it cool and peaceful — the fire did not harm him (reference from Surah Al-Anbiya)' },
  { id: 'z2', desc: 'Allah blessed him and made a great nation from his descendants here (2:128)' },
  { id: 'z3', desc: 'Ibrahim and Ismail did this together, saying "Accept from us, O Allah" (2:127)' },
  { id: 'z4', desc: "He asked Allah to send a Prophet from his children — and our Prophet ﷺ came (2:129)" },
  { id: 'z5', desc: 'He first thought each was his Lord — but each set — until he turned to the Creator of all (6:76–79)' },
];

// S8: Quiz — The New Direction (2:142-157)
const S8_QUIZ = [
  { q: 'What was the original Qibla direction for Muslims?',
    opts: ['Mecca (al-Masjid al-Haram)',
           'Jerusalem — Masjid al-Aqsa',
           'Medina — Masjid an-Nabawi',
           'Cairo — the great mosque'],
    correct: 1 },
  { q: 'What is the correct Qibla for Muslims today?',
    opts: ['Jerusalem (Masjid al-Aqsa)',
           'Damascus (Umayyad Mosque)',
           'Mecca — al-Masjid al-Haram',
           'Medina (Masjid an-Nabawi)'],
    correct: 2 },
  { q: 'According to 2:155, what are the types of tests Allah sends?',
    opts: ['Only wealth and children tests',
           'Only sickness and weakness',
           'Fear, hunger, loss of wealth, lives and fruits',
           'Only enemies and battles'],
    correct: 2 },
  { q: "What do we say when hardship strikes? (2:156)",
    opts: ['"Alhamdulillah" only',
           '"Inna lillahi wa inna ilayhi raji\'un"',
           '"Astaghfirullahi al-Azeem"',
           '"Allahu Akbar"'],
    correct: 1 },
  { q: 'What does Allah promise those who are patient? (2:157)',
    opts: ['Immediate wealth and comfort',
           'Freedom from all future tests',
           'Allah\'s blessings, mercy and guidance upon them',
           'They enter Jannah before everyone else'],
    correct: 2 },
];

// S9: Drag & Drop — Al-Birr (2:177)
const S9_ITEMS = [
  { id: 'b1', text: '💚 Believing in\nAllah, angels\n& all Prophets', zone: 'z1' },
  { id: 'b2', text: '💰 Giving wealth\nto orphans,\nthe poor & needy',zone: 'z2' },
  { id: 'b3', text: '🙏 Establishing\nSalah & giving\nZakah',         zone: 'z3' },
  { id: 'b4', text: '🤝 Keeping your\npromises when\nyou make them',  zone: 'z4' },
  { id: 'b5', text: '💪 Being patient\nin hardship\n& difficulty',    zone: 'z5' },
];
const S9_ZONES = [
  { id: 'z1', desc: '"BELIEF" — Righteousness includes believing in Allah, angels, books, prophets and the Last Day (2:177)' },
  { id: 'z2', desc: '"GENEROSITY" — Giving wealth to those in need: relatives, orphans, the poor, travellers (2:177)' },
  { id: 'z3', desc: '"WORSHIP" — The formal pillars: establishing prayer and paying zakah (2:177)' },
  { id: 'z4', desc: '"INTEGRITY" — Fulfilling covenants and commitments you have made (2:177)' },
  { id: 'z5', desc: '"PATIENCE (Sabr)" — Bearing poverty, hardship and battles with patience (2:177)' },
];

// S10: Fill-in-the-Blank — Messengers, Light & Ibrahim's Proof (2:253-260)
const S10_FIB = [
  {verse:'تِلْكَ الرُّسُلُ فَضَّلْنَا بَعْضَهُمْ عَلَىٰ _____', opts:['بَعْضٍ','النَّاسِ','الْأَنبِيَاءِ','الْخَلْقِ'], correct:0, ref:'2:253', translation:'Those messengers — We favoured some of them over others'},
  {verse:'لَا إِكْرَاهَ فِي _____', opts:['الدِّينِ','الْإِسْلَامِ','الْعِبَادَةِ','الْحَيَاةِ'], correct:0, ref:'2:256', translation:'There is no compulsion in religion'},
  {verse:'اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا يُخْرِجُهُم مِّنَ الظُّلُمَاتِ إِلَى _____', opts:['النُّورِ','الْهُدَىٰ','الْجَنَّةِ','الْإِيمَانِ'], correct:0, ref:'2:257', translation:'Allah is the Protector of those who believe — He brings them out of darkness into light'},
  {verse:'أَلَمْ تَرَ إِلَى الَّذِي حَاجَّ إِبْرَاهِيمَ فِي رَبِّهِ أَنْ آتَاهُ اللَّهُ _____', opts:['الْمُلْكَ','الْعِلْمَ','الْمَالَ','الْقُوَّةَ'], correct:0, ref:'2:258', translation:'Have you not seen the one who argued with Ibrahim about his Lord because Allah had given him kingship?'},
  {verse:'فَخُذْ أَرْبَعَةً مِّنَ _____ فَصُرْهُنَّ إِلَيْكَ', opts:['الطَّيْرِ','الْأَنْعَامِ','الْحَيَوَانِ','الْخَيْلِ'], correct:0, ref:'2:260', translation:'Take four birds and draw them to you — then put a part on each mountain'},
];

// S11: Drag & Drop — Ayat al-Kursi (2:255)
const S11_ITEMS = [
  { id: 'ac1', text: 'اللَّهُ لَا إِلَٰهَ\nإِلَّا هُوَ',                     zone: 'z1' },
  { id: 'ac2', text: 'الْحَيُّ الْقَيُّومُ',                                   zone: 'z2' },
  { id: 'ac3', text: 'لَا تَأْخُذُهُ سِنَةٌ\nوَلَا نَوْمٌ',                   zone: 'z3' },
  { id: 'ac4', text: 'وَسِعَ كُرْسِيُّهُ\nالسَّمَاوَاتِ وَالْأَرْضَ',          zone: 'z4' },
  { id: 'ac5', text: 'وَلَا يُحِيطُونَ بِشَيْءٍ\nمِّنْ عِلْمِهِ',              zone: 'z5' },
];
const S11_ZONES = [
  { id: 'z1', desc: 'Allah — there is no deity except Him (2:255)' },
  { id: 'z2', desc: 'The Ever-Living, the Sustainer of all existence (2:255)' },
  { id: 'z3', desc: 'Neither drowsiness overtakes Him nor sleep (2:255)' },
  { id: 'z4', desc: 'His Throne extends over the heavens and the earth (2:255)' },
  { id: 'z5', desc: 'They encompass nothing of His knowledge except what He wills (2:255)' },
];

// S12: Quiz — The Charity Garden (2:261-274)
const S12_QUIZ = [
  { q: "In Allah's parable (2:261), one grain of wheat becomes how many grains?",
    opts: ['70 grains', '100 grains', '700 grains', '1,000 grains'],
    correct: 2 },
  { q: 'What TWO things completely cancel your charity reward? (2:264)',
    opts: ['Giving too much at once',
           'Reminding of your gift (mann) and hurting feelings (adha)',
           'Giving to non-Muslims',
           'Giving secretly instead of openly'],
    correct: 1 },
  { q: 'What is charity followed by hurt and reminders like? (2:264)',
    opts: ['Like a river that slowly dries up',
           'Like a tree that gets cut down',
           'Like a smooth rock — rain washes away the thin soil',
           'Like a star that fades and disappears'],
    correct: 2 },
  { q: 'According to 2:271, which form of charity is better?',
    opts: ['Giving openly so others are inspired',
           'Giving secretly to the poor',
           'Giving only to mosques and madrasas',
           'All forms are completely equal'],
    correct: 1 },
  { q: 'A kind word is better than charity followed by what? (2:263)',
    opts: ['Spending too much money',
           'Giving to the wrong person',
           'Hurt (adha) — injuring the recipient\'s feelings',
           'Making a public announcement'],
    correct: 2 },
];

// S13: Drag & Drop — The Final Treasure (2:284-286)
const S13_ITEMS = [
  { id: 'd1', text: 'لَا نُفَرِّقُ بَيْنَ أَحَدٍ\nمِّن رُّسُلِهِ',               zone: 'z1' },
  { id: 'd2', text: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا\nإِلَّا وُسْعَهَا',            zone: 'z2' },
  { id: 'd3', text: 'رَبَّنَا لَا تُؤَاخِذْنَا\nإِن نَّسِينَا أَوْ أَخْطَأْنَا', zone: 'z3' },
  { id: 'd4', text: 'رَبَّنَا وَلَا تَحْمِلْ\nعَلَيْنَا إِصْرًا',               zone: 'z4' },
  { id: 'd5', text: 'وَانصُرْنَا عَلَى\nالْقَوْمِ الْكَافِرِينَ',               zone: 'z5' },
];
const S13_ZONES = [
  { id: 'z1', desc: 'We believe in ALL the Prophets equally — Musa, Isa, Ibrahim, Muhammad ﷺ (2:285)' },
  { id: 'z2', desc: "Allah's ultimate mercy: He never asks more than you can do (2:286)" },
  { id: 'z3', desc: 'Asking forgiveness for honest mistakes and forgetfulness (2:286)' },
  { id: 'z4', desc: 'Asking Allah not to place on us the heavy burdens given to those before (2:286)' },
  { id: 'z5', desc: "The final plea of the Surah — asking Allah's help for the believers (2:286)" },
];

// =============================================
//  SECTION WRAPPERS
// =============================================
function renderSection1Game()  { renderDragDrop(1, S1_ITEMS, S1_ZONES); }
function checkSection1()       { checkDragDrop(1, S1_ZONES); }

function renderSection2Game()  { renderQuiz(2, S2_QUIZ); }
function checkSection2()       { checkQuiz(2, S2_QUIZ); }

window.registerFillBlank(3, S3_FIB);

function renderSection4Game()  { renderDragDrop(4, S4_ITEMS, S4_ZONES); }
function checkSection4()       { checkDragDrop(4, S4_ZONES); }

function renderSection5Game()  { renderQuiz(5, S5_QUIZ); }
function checkSection5()       { checkQuiz(5, S5_QUIZ); }

window.registerMatch(6, S6_THEME_ITEMS, S6_THEME_ZONES);

function renderSection7Game()  { renderDragDrop(7, S7_ITEMS, S7_ZONES); }
function checkSection7()       { checkDragDrop(7, S7_ZONES); }

function renderSection8Game()  { renderQuiz(8, S8_QUIZ); }
function checkSection8()       { checkQuiz(8, S8_QUIZ); }

function renderSection9Game()  { renderDragDrop(9, S9_ITEMS, S9_ZONES); }
function checkSection9()       { checkDragDrop(9, S9_ZONES); }

window.registerFillBlank(10, S10_FIB);

function renderSection11Game() { renderDragDrop(11, S11_ITEMS, S11_ZONES); }
function checkSection11()      { checkDragDrop(11, S11_ZONES); }

function renderSection12Game() { renderQuiz(12, S12_QUIZ); }
function checkSection12()      { checkQuiz(12, S12_QUIZ); }

function renderSection13Game() { renderDragDrop(13, S13_ITEMS, S13_ZONES); }
function checkSection13()      { checkDragDrop(13, S13_ZONES); }

// =============================================
//  KA'BA WORLD BUILDER (surah-specific canvas)
// =============================================
function _buildLabel(ctx, W, msg, done, total) {
  ctx.fillStyle = 'rgba(255,215,0,0.8)'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#3a7a2a'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}

function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#06080f'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 90; i++) {
    const sx = (i * 5783 + 3) % W, sy = (i * 3917 + 7) % 170;
    const br = Math.min(0.9, (n / 5) * (0.3 + 0.6 * ((i * 7 % 10) / 10)));
    ctx.fillStyle = `rgba(255,240,200,${br})`; ctx.fillRect(sx, sy, i % 7 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1);
  }
  // Crescent (level 5+)
  if (n >= 5) {
    ctx.fillStyle = '#ffe8a0'; ctx.beginPath(); ctx.arc(490, 40, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#06080f'; ctx.beginPath(); ctx.arc(501, 33, 17, 0, Math.PI * 2); ctx.fill();
  }
  if (n < 1) { _buildLabel(ctx, W, "Complete levels to build the Ka'ba! 🕋", 0, 13); return; }
  // Plaza
  ctx.fillStyle = '#d0c8b8'; ctx.fillRect(0, 215, W, 35);
  ctx.strokeStyle = '#b8b0a0'; ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 215); ctx.lineTo(x, 250); ctx.stroke(); }
  for (let y = 215; y < 250; y += 18) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  if (n < 2) { _buildLabel(ctx, W, 'Plaza laid... 1/13', 1, 13); return; }
  // Raised platform
  ctx.fillStyle = '#bab0a0'; ctx.fillRect(155, 203, 250, 14);
  ctx.fillStyle = '#d0c8b8'; ctx.fillRect(155, 203, 250, 3);
  ctx.fillStyle = '#a09888'; ctx.fillRect(158, 214, 244, 3);
  if (n < 3) { _buildLabel(ctx, W, 'Platform placed! 2/13', 2, 13); return; }
  // Ka'ba geometry
  const KL = 200, KW = 160, KB = 203, KH = 136, KT = KB - KH;
  function drawWallBand(x, y, w, h) {
    ctx.fillStyle = '#1c1a14'; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#2a2820'; ctx.lineWidth = 1;
    for (let ly = y + 8; ly < y + h; ly += 8) { ctx.beginPath(); ctx.moveTo(x, ly); ctx.lineTo(x + w, ly); ctx.stroke(); }
    for (let lx = x + 14; lx < x + w; lx += 18) { ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx, y + h); ctx.stroke(); }
  }
  const bh = KH / 4, bandsBuilt = Math.min(4, Math.floor((n - 2) / 2.5) + 1);
  for (let b = 0; b < bandsBuilt; b++) drawWallBand(KL, KB - bh * (b + 1), KW, bh);
  if (n >= 8) {
    const dw = 46, dh = 66, dx = KL + KW / 2 - 23, dy = KB - dh;
    ctx.fillStyle = '#b07808'; ctx.fillRect(dx, dy, dw, dh);
    ctx.fillStyle = '#e8b820'; ctx.fillRect(dx + 4, dy + 4, dw - 8, dh - 4);
    ctx.fillStyle = '#ffd700'; ctx.fillRect(dx + 20, dy + 33, 7, 7);
  }
  if (n >= 11) {
    const ky = KT + 18;
    ctx.fillStyle = '#c8a010'; ctx.fillRect(KL, ky, KW, 20);
    ctx.fillStyle = '#e0c030'; ctx.fillRect(KL, ky - 1, KW, 3); ctx.fillRect(KL, ky + 20, KW, 3);
  }
  if (n >= 12) {
    ctx.fillStyle = '#2a2018'; ctx.fillRect(KL - 7, KT - 11, KW + 14, 14);
  }
  if (n >= 13) {
    const grd = ctx.createRadialGradient(KL + KW/2, KB - KH/2, KH/5, KL + KW/2, KB - KH/2, KH*1.1);
    grd.addColorStop(0, 'rgba(255,200,0,0.32)'); grd.addColorStop(1, 'rgba(255,200,0,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText("ALLAHUMMA BARIK! 🕋 KA'BA COMPLETE!", W / 2, 20);
    ctx.textAlign = 'left';
  } else {
    _buildLabel(ctx, W, `Building the Ka'ba — ${n}/13 levels`, n, 13);
  }
}

function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
