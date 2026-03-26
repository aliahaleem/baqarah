'use strict';
/* ================================================
   SURAH AL-BAQARAH — app.js  (23-level structure)
   Juz 1 (L1-10) fully playable.
   Juz 2 (L11-17) & Juz 3 (L18-23) are stubs for now.
   ================================================ */

window.STORAGE_KEY = 'baqarahQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Checked:false,
  s2Answers:{}, s2Checked:false,
  s3Answers:{}, s3Checked:false,
  s4Checked:false,
  s5Checked:false,
  s6Answers:{}, s6Checked:false,
  s7Answers:{}, s7Checked:false,
  s8Answers:{}, s8Checked:false,
  s9Checked:false,
  s11Answers:{}, s11Checked:false,
  s12Checked:false, s13Checked:false, s14Checked:false,
  s15Checked:false, s16Checked:false,
  s18Checked:false, s19Checked:false,
  s20Answers:{}, s20Checked:false,
  s21Checked:false, s22Checked:false,
};

const REWARDS = {
  1:  {xp:80,  gems:3,  icon:'🌿', title:'PLAINS UNLOCKED!',      msg:'You discovered the 5 qualities of the Muttaqeen. The first land of your quest is yours!'},
  2:  {xp:100, gems:4,  icon:'🌑', title:'SHADOWS CLEARED!',      msg:'MashAllah! You understand the two groups who rejected guidance. Your torch lights the way!'},
  3:  {xp:90,  gems:3,  icon:'📢', title:'FIRST CALL HEARD!',     msg:'SubhanAllah! The challenge stands: produce even one surah like it — and no one ever will.'},
  4:  {xp:120, gems:5,  icon:'🌟', title:'GARDEN DISCOVERED!',    msg:"The story of Adam (AS) — the first human, the first test, the first tawbah. On to the Shores of Sinai!"},
  5:  {xp:110, gems:4,  icon:'🌊', title:'SHORES DISCOVERED!',    msg:"MashAllah! You matched all five miracles of Bani Isra'il. Keep going!"},
  6:  {xp:100, gems:4,  icon:'🐄', title:'MYSTERY SOLVED!',       msg:'SubhanAllah! Simple obedience is wisdom. On to the Broken Covenants!'},
  7:  {xp:110, gems:4,  icon:'💔', title:'COVENANTS KNOWN!',      msg:'MashAllah! May Allah keep our hearts soft and our covenants strong.'},
  8:  {xp:100, gems:4,  icon:'🌐', title:'TRUTH PREVAILS!',       msg:"To Allah belong the East and the West — wherever you turn is the Face of Allah. Kun fa yakun!"},
  9:  {xp:120, gems:5,  icon:'🕋', title:"KA'BA DISCOVERED!",     msg:"SubhanAllah! Every time you pray, you face the place Ibrahim and Ismail built with du'a."},
  10: {xp:60,  gems:3,  icon:'📖', title:'JUZ 1 WORDS LEARNED!',  msg:'MashAllah! You now know key Arabic words from Juz 1 of Al-Baqarah!'},
  11: {xp:100, gems:4,  icon:'🧭', title:'DIRECTION FOUND!',      msg:'MashAllah! Now you know the Qibla and the verse of patience.'},
  12: {xp:90,  gems:3,  icon:'📜', title:'COMPLETE WAY!',          msg:'Safa & Marwa, halal food, and the definition of true righteousness — Al-Birr.'},
  13: {xp:110, gems:4,  icon:'🌙', title:'RAMADAN MASTERED!',     msg:"Fasting is prescribed — and when My servant asks about Me, I am near. (2:186)"},
  14: {xp:100, gems:4,  icon:'⚡', title:'TRUE VS FALSE!',         msg:'Some impress with speech but destroy in secret. Allah sees the hearts.'},
  15: {xp:110, gems:4,  icon:'⚖️', title:'JUSTICE SERVED!',       msg:"Marriage, divorce, orphans — Allah's social laws protect the vulnerable."},
  16: {xp:130, gems:5,  icon:'⚔️', title:'BATTLE WON!',           msg:'ALLAHU AKBAR! Small faithful armies beat giants when Allah is with them.'},
  17: {xp:60,  gems:3,  icon:'📖', title:'JUZ 2 WORDS!',          msg:'Key Arabic words from the middle of Al-Baqarah mastered!'},
  18: {xp:100, gems:4,  icon:'💡', title:'NO COMPULSION!',         msg:'There is no compulsion in religion — truth stands clear from error.'},
  19: {xp:150, gems:6,  icon:'👑', title:'KURSI MASTERED!',        msg:'SubhanAllah! You know the greatest verse in the Quran. Recite it after every salah.'},
  20: {xp:120, gems:5,  icon:'🌱', title:'GARDEN GROWN!',          msg:'One grain → 700. Give sincerely and never fear losing.'},
  21: {xp:110, gems:4,  icon:'📝', title:'DEBT RECORDED!',         msg:'The longest verse in the Quran — protecting justice in every transaction.'},
  22: {xp:200, gems:10, icon:'🏆', title:'SURAH COMPLETE!',        msg:'ALLAHUMMA BARIK! All of Al-Baqarah understood. May Allah make you among the Muttaqeen. آمين'},
  23: {xp:60,  gems:3,  icon:'📖', title:'JUZ 3 WORDS!',           msg:'Key Arabic words from the end of Al-Baqarah mastered!'},
};

window.SURAH_CONFIG = {
  id:'s002', surahName:'Al-Baqarah', surahArabic:'البقرة',
  totalLevels:23, wbwSection:10, rewards:REWARDS,
  tileIcons: ['🌿','🌑','📢','🌟','🌊','🐄','💔','🌐','🕋','📖',
              '🧭','📜','🌙','⚡','⚖️','⚔️','📖',
              '💡','👑','🌱','📝','🏆','📖'],
  tileLabels:['The Guided','Sealed & Masked','First Call','First Test',
              'Rescued Nation','Cow & Stone','Broken Covenants','Jealous Refuted',
              "Ibrahim's Legacy",'Juz 1 WBW',
              'New Direction','Complete Way','Ramadan & Du\'a','True vs False',
              'Social Justice','Small Army','Juz 2 WBW',
              'No Compulsion','The Throne','Charity Garden','Riba & Debt',
              'Final Du\'a','Juz 3 WBW'],
  welcomeMsg:{
    fresh:   name=>`As-salamu alaykum, ${name}! Welcome to Baqarah Quest. You've memorised the greatest Surah — now discover its meaning! Choose Level 1 on the map below. 🗺️`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete — more knowledge awaits! 💪`,
    complete:name=>`MashAllah, ${name}! Quest complete! All 23 levels done. May Allah bless your knowledge of Al-Baqarah. 🏆`,
  },
};

/* ════════════════════════════════════════════════
   JUZ 1 — GAME DATA  (Levels 1-9, L10 = WBW)
   ════════════════════════════════════════════════ */

// ── L1: Match — Qualities of Muttaqeen (2:1-5) ──
const L1_ITEMS = [
  {id:'i1', text:'🌙 الْغَيْبِ',     zone:'z1'},
  {id:'i2', text:'🕌 الصَّلَاةَ',     zone:'z2'},
  {id:'i3', text:'💰 يُنفِقُونَ',     zone:'z3'},
  {id:'i4', text:'📖 الْقُرْآن',      zone:'z4'},
  {id:'i5', text:'📜 الْكُتُبِ',      zone:'z5'},
  {id:'i6', text:'⚖️ الْآخِرَةِ',     zone:'z6'},
];
const L1_ZONES = [
  {id:'z1', desc:'Things unseen by human eyes — angels, fate, Jannah, Jahannam, the Day of Judgment'},
  {id:'z2', desc:'Keeping the 5 daily prayers — your direct connection to Allah'},
  {id:'z3', desc:'Giving sadaqah & zakat — sharing your blessings with those in need'},
  {id:'z4', desc:'The final revelation sent to Prophet Muhammad ﷺ'},
  {id:'z5', desc:'The Torah of Musa, Injeel of Isa, and all earlier divine books'},
  {id:'z6', desc:'Full certainty in Paradise, Hellfire, and the Day of Return to Allah'},
];

// ── L2: Quiz — The Disbelievers & Hypocrites (2:6-20) ──
const L2_QUIZ = [
  {q:"When Allah says disbelievers' hearts are \"sealed,\" this means:",
   opts:['They completely forgot the Quran','They were born unable to believe','They are physically deaf to words','They chose to close their hearts so Allah sealed them'],
   correct:3},
  {q:"What is the KEY difference between hypocrites and open disbelievers?",
   opts:['Hypocrites secretly pray more often','Hypocrites say they believe but do not mean it','Hypocrites are actually less dangerous','Hypocrites read the Quran but disbelievers do not'],
   correct:1},
  {q:"In the Fire Parable (2:17), what happened to the hypocrites?",
   opts:['Their fire burned them badly','They found a better fire','They all ran away safely','Allah took away their light, leaving darkness'],
   correct:3},
  {q:'When told "Don\'t spread corruption," the hypocrites replied:',
   opts:['"We will try our very best"','"Please forgive us for mistakes"','"WE are only the reformers!"','"We simply don\'t understand"'],
   correct:2},
  {q:"According to verse 2:10, what was in the hypocrites' hearts?",
   opts:['Deep anger and jealousy','A disease (spiritual sickness)','Extreme fear and sadness','Arrogance and excessive pride'],
   correct:1},
];

// ── L3: Quiz — The First Call (2:21-29) — NEW ──
const L3_QUIZ = [
  {q:'In verse 2:21, what is the FIRST command to all of mankind in Surah Al-Baqarah?',
   opts:['Give charity to the poor','Fast during Ramadan','Worship your Lord who created you','Perform Hajj to Mecca'],
   correct:2},
  {q:'What challenge does Allah issue in verse 2:23?',
   opts:['Produce a book as long as the Quran','Produce even ONE surah like it — and call your witnesses besides Allah','Count all the stars in the sky','Memorise the entire Quran in one night'],
   correct:1},
  {q:'In verse 2:26, Allah gives the parable of a mosquito. Why?',
   opts:['To show how small creatures can be dangerous','Allah is not shy to use ANY example — the faithful understand it, the arrogant reject it','To teach biology and science','To show that mosquitoes are sacred in Islam'],
   correct:1},
  {q:'According to 2:28, what is the sequence of human existence?',
   opts:['Born → live → die → nothing','Dead → brought to life → die → raised back to Him','Live → die → live again on earth','Created → tested → rewarded immediately'],
   correct:1},
  {q:'In 2:29, what did Allah create for mankind?',
   opts:['Only the earth and nothing else','The seven heavens only','Everything on the earth, then He turned to the heaven and fashioned seven heavens','Only the sun and moon for light'],
   correct:2},
];

// ── L4: Fill-in-Blank — The First Test (2:30-39) ──
const L4_FIB = [
  {verse:'إِنِّي جَاعِلٌ فِي الْأَرْضِ _____',
   opts:['خَلِيفَةً','مَلِكًا','نَبِيًّا','عَابِدًا'], correct:0,
   ref:'2:30', translation:'Indeed, I will make upon the earth a successive authority (khalifah)'},
  {verse:'وَعَلَّمَ آدَمَ _____ كُلَّهَا',
   opts:['الْأَسْمَاءَ','الْكُتُبَ','الصَّلَاةَ','اللُّغَاتِ'], correct:0,
   ref:'2:31', translation:'And He taught Adam the names — all of them'},
  {verse:'وَإِذْ قُلْنَا لِلْمَلَائِكَةِ اسْجُدُوا لِآدَمَ فَسَجَدُوا إِلَّا _____',
   opts:['إِبْلِيسَ','جِبْرِيلَ','مِيكَائِيلَ','إِسْرَافِيلَ'], correct:0,
   ref:'2:34', translation:'When We told the angels: Prostrate to Adam — they all prostrated except Iblis'},
  {verse:'وَلَا تَقْرَبَا هَٰذِهِ _____ فَتَكُونَا مِنَ الظَّالِمِينَ',
   opts:['الشَّجَرَةَ','الْحَدِيقَةَ','الْمَدِينَةَ','الْجَبَلَ'], correct:0,
   ref:'2:35', translation:'Do not approach this tree, or you will be among the wrongdoers'},
  {verse:'فَتَلَقَّىٰ آدَمُ مِن رَّبِّهِ _____ فَتَابَ عَلَيْهِ',
   opts:['كَلِمَاتٍ','رِسَالَةً','كِتَابًا','عِلْمًا'], correct:0,
   ref:'2:37', translation:'Then Adam received words from his Lord, and He accepted his repentance'},
];

// ── L5: Match — Rescued Nation: Miracles of Bani Isra'il (2:40-61) ──
const L5_ITEMS = [
  {id:'f1', text:'🌊 The Sea\nSplit in Two',   zone:'z1'},
  {id:'f2', text:'🍞 Manna\n& Salwa Birds',    zone:'z2'},
  {id:'f3', text:'💧 12 Springs\nfrom a Rock', zone:'z3'},
  {id:'f4', text:'☁️ The Cloud\nof Shade',     zone:'z4'},
  {id:'f5', text:'⛰️ Mount Sinai\nCovenant',   zone:'z5'},
];
const L5_ZONES = [
  {id:'z1', desc:'"We parted it — you walked through on dry land — then it closed over your enemies" (2:50)'},
  {id:'z2', desc:'"We sent sweet food and birds from the sky — without farming or hunting" (2:57)'},
  {id:'z3', desc:'"One strike of the staff on a single rock — and twelve springs gushed out, one per tribe" (2:60)'},
  {id:'z4', desc:'"We covered you with it in the scorching heat of the Sinai desert" (2:57)'},
  {id:'z5', desc:'"We raised it above you and gave you the Book — hold it firmly and remember!" (2:63)'},
];

// ── L6: Quiz — The Cow & The Stone (2:62-74) ──
const L6_QUIZ = [
  {q:"When Allah told Bani Isra'il to slaughter a cow, what was their FIRST reaction?",
   opts:['They obeyed without any questions','They asked: "Are you mocking us?"','They completely refused','They asked which Prophet said this'],
   correct:1},
  {q:"How many extra questions did Bani Isra'il ask before obeying?",
   opts:['None — they obeyed straight away','One quick question only','Three questions: age, colour, type','Ten detailed questions in total'],
   correct:2},
  {q:"What happened when they touched the dead man with the cow's part?",
   opts:['A mark appeared on the killer\'s hand','A voice from the sky named the killer','The murderer immediately confessed','The dead man revived and named his killer'],
   correct:3},
  {q:"What is the KEY lesson of the Cow story?",
   opts:['Always ask detailed questions first','Simple obedience is best — extra questions make it harder','Cows are sacred animals in Islam','Miracles happen only through animals'],
   correct:1},
  {q:'After all these miracles, what happened to their hearts? (2:74)',
   opts:['Their hearts became soft and grateful','Their hearts became hardened — like stones or even harder','They immediately became the best believers','They asked for even more miracles'],
   correct:1},
];

// ── L7: Quiz — Broken Covenants (2:75-103) — NEW ──
const L7_QUIZ = [
  {q:'In 2:75-79, what did some scholars among Bani Isra\'il do with the Torah?',
   opts:['They memorised it perfectly and taught it','They distorted and changed its words, then said "this is from Allah"','They translated it into every language','They burned it to hide the truth'],
   correct:1},
  {q:'What false claim did they make about the Hellfire? (2:80)',
   opts:['"The Fire does not exist at all"','"Only our enemies will enter the Fire"','"The Fire will only touch us for a few numbered days"','"The Fire is actually cold and comfortable"'],
   correct:2},
  {q:'When the covenant was taken at Mount Sinai, what did Bani Isra\'il do soon after? (2:92-93)',
   opts:['They obeyed every command perfectly','They worshipped the golden calf despite seeing the miracles','They built a grand mosque immediately','They distributed the Torah to all nations'],
   correct:1},
  {q:'What did the angels Harut and Marut teach people? (2:102)',
   opts:['How to grow food in the desert','Magic — but they warned: "We are only a test, so do not disbelieve"','How to build pyramids','Medical knowledge from ancient times'],
   correct:1},
  {q:'Verse 2:79 warns: "Woe to those who write the book with their own hands then say it is from Allah." Why?',
   opts:['Because handwriting is not as neat as printing','To gain a small price — selling the truth for worldly gain','Because only prophets are allowed to write books','To make the book longer than it should be'],
   correct:1},
];

// ── L8: Quiz — The Jealous & The Refuted (2:104-123) — NEW ──
const L8_QUIZ = [
  {q:'In 2:104, Allah tells the believers to stop saying "Ra\'ina" and instead say "Undhurna." Why?',
   opts:['Ra\'ina was grammatically incorrect Arabic','Some enemies twisted the word to sound like an insult — so Allah closed the loophole','Undhurna was the Prophet\'s favourite word','Ra\'ina was a word from a foreign language'],
   correct:1},
  {q:'In 2:111, some People of the Book claimed "None will enter Paradise except Jews or Christians." How does Allah respond?',
   opts:['"You are absolutely correct — only your group is saved"','"Produce your proof if you are truthful" — and: whoever submits to Allah and does good has their reward','Allah ignores their claim entirely','He says only Arabs will enter Paradise'],
   correct:1},
  {q:'What powerful statement does 2:115 make about Allah\'s presence?',
   opts:['"Allah lives only in the heavens"','"To Allah belong the East and the West — wherever you turn, there is the Face of Allah"','"Allah can only be found in mosques"','"Allah is far away from this world"'],
   correct:1},
  {q:'In 2:116-117, they say "Allah has taken a son." How does the Quran refute this?',
   opts:['It says Allah has daughters instead','It says "Be!" and it is — He is the Originator of heavens and earth, He does not need a son','It ignores the claim completely','It says this is a minor disagreement'],
   correct:1},
  {q:'In 2:120, what does Allah warn the Prophet ﷺ about?',
   opts:['"The Jews and Christians will never be happy with you until you follow THEIR way"','"Everyone will immediately accept Islam"','"You should compromise on the core teachings"','"Do not speak to the People of the Book at all"'],
   correct:0},
];

// ── L9: Match — Ibrahim's Legacy (2:124-141) ──
const L9_ITEMS = [
  {id:'t1', text:'وَإِذِ ابْتَلَىٰ إِبْرَاهِيمَ رَبُّهُ\nبِكَلِمَاتٍ فَأَتَمَّهُنَّ', zone:'z1'},
  {id:'t2', text:'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ\nمِنَ الْبَيْتِ وَإِسْمَاعِيلُ', zone:'z2'},
  {id:'t3', text:'رَبَّنَا وَاجْعَلْنَا\nمُسْلِمَيْنِ لَكَ', zone:'z3'},
  {id:'t4', text:'رَبَّنَا وَابْعَثْ فِيهِمْ\nرَسُولًا مِّنْهُمْ', zone:'z4'},
  {id:'t5', text:'قُلْ بَلْ مِلَّةَ\nإِبْرَاهِيمَ حَنِيفًا', zone:'z5'},
];
const L9_ZONES = [
  {id:'z1', desc:'True Imamah (leadership) is earned through tested obedience — not inherited or claimed (2:124)'},
  {id:'z2', desc:'The best deeds combine action with du\'a — they built the Ka\'ba and prayed simultaneously (2:127)'},
  {id:'z3', desc:'Even a Prophet feared deviation — no one is safe without begging Allah for steadfastness (2:128)'},
  {id:'z4', desc:'A parent\'s du\'a can shape generations — our Prophet ﷺ was Ibrahim\'s du\'a answered (2:129)'},
  {id:'z5', desc:'True religion has no sect label — it is pure submission (hanifiyyah) to Allah alone (2:135)'},
];

/* ════════════════════════════════════════════════
   JUZ 1 — WBW DATA  (Level 10)
   ════════════════════════════════════════════════ */
const WBW_DATA = [
  {ar:'الْمُتَّقِينَ', en:'the God-conscious', root:'و ق ي'},
  {ar:'الْغَيْبِ',     en:'the unseen',        root:'غ ي ب'},
  {ar:'الصَّلَاةَ',    en:'the prayer',         root:'ص ل و'},
  {ar:'يُنفِقُونَ',    en:'they spend',         root:'ن ف ق'},
  {ar:'الْمُفْلِحُونَ', en:'the successful',    root:'ف ل ح'},
  {ar:'خَتَمَ',        en:'He sealed',           root:'خ ت م'},
  {ar:'الْمُنَافِقِينَ', en:'the hypocrites',   root:'ن ف ق'},
  {ar:'يُخَادِعُونَ',  en:'they try to deceive', root:'خ د ع'},
  {ar:'ظُلُمَاتٍ',     en:'darknesses',          root:'ظ ل م'},
  {ar:'خَلِيفَةً',     en:'a successor / vicegerent', root:'خ ل ف'},
  {ar:'اسْجُدُوا',     en:'prostrate!',          root:'س ج د'},
  {ar:'اسْتَكْبَرَ',   en:'he was arrogant',     root:'ك ب ر'},
  {ar:'الشَّجَرَةَ',   en:'the tree',            root:'ش ج ر'},
  {ar:'تَوْبَة',       en:'repentance',           root:'ت و ب'},
  {ar:'التَّوَّابُ',   en:'the Acceptor of repentance', root:'ت و ب'},
  {ar:'الْبَحْرَ',     en:'the sea',             root:'ب ح ر'},
  {ar:'فِرْعَوْنَ',    en:'Pharaoh',             root:'—'},
  {ar:'الْعِجْلَ',     en:'the calf',            root:'ع ج ل'},
  {ar:'الْمَنَّ وَالسَّلْوَىٰ', en:'manna and quails', root:'—'},
  {ar:'بَقَرَةً',      en:'a cow',               root:'ب ق ر'},
  {ar:'قَسَتْ',        en:'hardened',             root:'ق س و'},
  {ar:'كَالْحِجَارَةِ', en:'like stones',         root:'ح ج ر'},
  {ar:'يَكْتُبُونَ',   en:'they write',          root:'ك ت ب'},
  {ar:'الْمَشْرِقُ وَالْمَغْرِبُ', en:'the East and the West', root:'ش ر ق / غ ر ب'},
  {ar:'بَدِيعُ',       en:'Originator',           root:'ب د ع'},
  {ar:'كُن فَيَكُونُ', en:'Be! And it is',       root:'ك و ن'},
  {ar:'إِبْرَاهِيمَ',  en:'Ibrahim (Abraham)',    root:'—'},
  {ar:'الْقَوَاعِدَ',  en:'the foundations',      root:'ق ع د'},
  {ar:'حَنِيفًا',      en:'pure in faith',        root:'ح ن ف'},
  {ar:'صِبْغَةَ اللَّهِ', en:'the colour/baptism of Allah', root:'ص ب غ'},
];

/* ════════════════════════════════════════════════
   JUZ 2 & 3 — GAME DATA STUBS
   (preserved from old levels 8-13, registered to new section #s)
   ════════════════════════════════════════════════ */

// L11 (old L8): Quiz — The New Direction (2:142-157)
const L11_QUIZ = [
  {q:'What was the original Qibla direction for Muslims?',
   opts:['Mecca (al-Masjid al-Haram)','Jerusalem — Masjid al-Aqsa','Medina — Masjid an-Nabawi','Cairo — the great mosque'], correct:1},
  {q:'What is the correct Qibla for Muslims today?',
   opts:['Jerusalem (Masjid al-Aqsa)','Damascus (Umayyad Mosque)','Mecca — al-Masjid al-Haram','Medina (Masjid an-Nabawi)'], correct:2},
  {q:'According to 2:155, what are the types of tests Allah sends?',
   opts:['Only wealth and children tests','Only sickness and weakness','Fear, hunger, loss of wealth, lives and fruits','Only enemies and battles'], correct:2},
  {q:"What do we say when hardship strikes? (2:156)",
   opts:['"Alhamdulillah" only','"Inna lillahi wa inna ilayhi raji\'un"','"Astaghfirullahi al-Azeem"','"Allahu Akbar"'], correct:1},
  {q:'What does Allah promise those who are patient? (2:157)',
   opts:['Immediate wealth and comfort','Freedom from all future tests','Allah\'s blessings, mercy and guidance upon them','They enter Jannah before everyone else'], correct:2},
];

// L13 (old L9): Match — Al-Birr & Ramadan (2:177+183)
const L13_ITEMS = [
  {id:'b1', text:'الْإِيمَانِ\nBelief',        zone:'z1'},
  {id:'b2', text:'الزَّكَاةَ\nZakat',           zone:'z2'},
  {id:'b3', text:'الصَّابِرِينَ\nPatient',      zone:'z3'},
  {id:'b4', text:'يُنفِقُونَ\nSpending',        zone:'z4'},
  {id:'b5', text:'الصِّيَامُ\nFasting',         zone:'z5'},
];
const L13_ZONES = [
  {id:'z1', desc:'Believing in Allah, the Last Day, angels, the Books and the Prophets (2:177)'},
  {id:'z2', desc:'Giving the obligatory charity — purifying your wealth for Allah (2:177)'},
  {id:'z3', desc:'Being patient in times of poverty, illness and during battle (2:177)'},
  {id:'z4', desc:'Giving wealth despite loving it — to relatives, orphans, the needy and travellers (2:177)'},
  {id:'z5', desc:'Prescribed for you as it was for those before you — so you may develop taqwa (2:183)'},
];

// L16 (old L10): FIB — Battle & Light (2:253-260) — stub for now
const L16_FIB = [
  {verse:'تِلْكَ الرُّسُلُ فَضَّلْنَا بَعْضَهُمْ عَلَىٰ _____',
   opts:['بَعْضٍ','النَّاسِ','الْأَنبِيَاءِ','الْخَلْقِ'], correct:0, ref:'2:253', translation:'Those messengers — We favoured some over others'},
  {verse:'لَا إِكْرَاهَ فِي _____',
   opts:['الدِّينِ','الْإِسْلَامِ','الْعِبَادَةِ','الْحَيَاةِ'], correct:0, ref:'2:256', translation:'There is no compulsion in religion'},
  {verse:'اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا يُخْرِجُهُم مِّنَ الظُّلُمَاتِ إِلَى _____',
   opts:['النُّورِ','الْهُدَىٰ','الْجَنَّةِ','الْإِيمَانِ'], correct:0, ref:'2:257', translation:'Allah brings them out of darkness into light'},
];

// L19 (old L11): Match — Ayat al-Kursi (2:255)
const L19_ITEMS = [
  {id:'ac1', text:'اللَّهُ لَا إِلَٰهَ\nإِلَّا هُوَ',                     zone:'z1'},
  {id:'ac2', text:'الْحَيُّ الْقَيُّومُ',                                   zone:'z2'},
  {id:'ac3', text:'لَا تَأْخُذُهُ سِنَةٌ\nوَلَا نَوْمٌ',                   zone:'z3'},
  {id:'ac4', text:'وَسِعَ كُرْسِيُّهُ\nالسَّمَاوَاتِ وَالْأَرْضَ',          zone:'z4'},
  {id:'ac5', text:'وَلَا يُحِيطُونَ بِشَيْءٍ\nمِّنْ عِلْمِهِ',              zone:'z5'},
];
const L19_ZONES = [
  {id:'z1', desc:'Allah — there is no deity except Him (2:255)'},
  {id:'z2', desc:'The Ever-Living, the Sustainer of all existence (2:255)'},
  {id:'z3', desc:'Neither drowsiness overtakes Him nor sleep (2:255)'},
  {id:'z4', desc:'His Throne extends over the heavens and the earth (2:255)'},
  {id:'z5', desc:'They encompass nothing of His knowledge except what He wills (2:255)'},
];

// L20 (old L12): Quiz — Charity Garden (2:261-274)
const L20_QUIZ = [
  {q:"In Allah's parable (2:261), one grain of wheat becomes how many grains?",
   opts:['70 grains','100 grains','700 grains','1,000 grains'], correct:2},
  {q:'What TWO things completely cancel your charity reward? (2:264)',
   opts:['Giving too much at once','Reminding of your gift (mann) and hurting feelings (adha)','Giving to non-Muslims','Giving secretly instead of openly'], correct:1},
  {q:'What is charity followed by hurt and reminders like? (2:264)',
   opts:['Like a river that slowly dries up','Like a tree that gets cut down','Like a smooth rock — rain washes away the thin soil','Like a star that fades'], correct:2},
  {q:'According to 2:271, which form of charity is better?',
   opts:['Giving openly so others are inspired','Giving secretly to the poor','Giving only to mosques','All forms are equal'], correct:1},
  {q:'A kind word is better than charity followed by what? (2:263)',
   opts:['Spending too much money','Giving to the wrong person','Hurt (adha) — injuring the recipient\'s feelings','Making a public announcement'], correct:2},
];

// L22 (old L13): Match — The Final Treasure (2:284-286)
const L22_ITEMS = [
  {id:'d1', text:'لَا نُفَرِّقُ بَيْنَ أَحَدٍ\nمِّن رُّسُلِهِ',               zone:'z1'},
  {id:'d2', text:'لَا يُكَلِّفُ اللَّهُ نَفْسًا\nإِلَّا وُسْعَهَا',            zone:'z2'},
  {id:'d3', text:'رَبَّنَا لَا تُؤَاخِذْنَا\nإِن نَّسِينَا أَوْ أَخْطَأْنَا', zone:'z3'},
  {id:'d4', text:'رَبَّنَا وَلَا تَحْمِلْ\nعَلَيْنَا إِصْرًا',               zone:'z4'},
  {id:'d5', text:'وَانصُرْنَا عَلَى\nالْقَوْمِ الْكَافِرِينَ',               zone:'z5'},
];
const L22_ZONES = [
  {id:'z1', desc:'We believe in ALL the Prophets equally — Musa, Isa, Ibrahim, Muhammad ﷺ (2:285)'},
  {id:'z2', desc:"Allah's ultimate mercy: He never asks more than you can do (2:286)"},
  {id:'z3', desc:'Asking forgiveness for honest mistakes and forgetfulness (2:286)'},
  {id:'z4', desc:'Asking Allah not to place on us the heavy burdens given to those before (2:286)'},
  {id:'z5', desc:"The final plea of the Surah — asking Allah's help for the believers (2:286)"},
];

/* ════════════════════════════════════════════════
   SECTION WRAPPERS
   ════════════════════════════════════════════════ */

// Juz 1 (fully wired)
function renderSection1Game()  { renderDragDrop(1, L1_ITEMS, L1_ZONES); }
function checkSection1()       { checkDragDrop(1, L1_ZONES); }
function renderSection2Game()  { renderQuiz(2, L2_QUIZ); }
function checkSection2()       { checkQuiz(2, L2_QUIZ); }
function renderSection3Game()  { renderQuiz(3, L3_QUIZ); }
function checkSection3()       { checkQuiz(3, L3_QUIZ); }
window.registerFillBlank(4, L4_FIB);
function renderSection5Game()  { renderDragDrop(5, L5_ITEMS, L5_ZONES); }
function checkSection5()       { checkDragDrop(5, L5_ZONES); }
function renderSection6Game()  { renderQuiz(6, L6_QUIZ); }
function checkSection6()       { checkQuiz(6, L6_QUIZ); }
function renderSection7Game()  { renderQuiz(7, L7_QUIZ); }
function checkSection7()       { checkQuiz(7, L7_QUIZ); }
function renderSection8Game()  { renderQuiz(8, L8_QUIZ); }
function checkSection8()       { checkQuiz(8, L8_QUIZ); }
window.registerMatch(9, L9_ITEMS, L9_ZONES);

// Juz 2 & 3 (wired to preserved data where available)
function renderSection11Game() { renderQuiz(11, L11_QUIZ); }
function checkSection11()      { checkQuiz(11, L11_QUIZ); }
window.registerMatch(13, L13_ITEMS, L13_ZONES);
window.registerFillBlank(16, L16_FIB);
window.registerMatch(19, L19_ITEMS, L19_ZONES);
function renderSection20Game() { renderQuiz(20, L20_QUIZ); }
function checkSection20()      { checkQuiz(20, L20_QUIZ); }
function renderSection22Game() { renderDragDrop(22, L22_ITEMS, L22_ZONES); }
function checkSection22()      { checkDragDrop(22, L22_ZONES); }

// WBW
window.setupWBWLevel(WBW_DATA, 10);

/* ════════════════════════════════════════════════
   KA'BA WORLD BUILDER  (spreads across 23 levels)
   ════════════════════════════════════════════════ */
function _buildLabel(ctx, W, msg, done, total) {
  ctx.fillStyle = 'rgba(255,215,0,0.8)'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#3a7a2a'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}

function _drawBuildCanvas(n) {
  var c = document.getElementById('build-canvas'); if (!c) return;
  var ctx = c.getContext('2d'), W = 560, H = 250, T = 23;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#06080f'; ctx.fillRect(0, 0, W, H);
  for (var i = 0; i < 90; i++) {
    var sx = (i * 5783 + 3) % W, sy = (i * 3917 + 7) % 170;
    var br = Math.min(0.9, (n / 8) * (0.3 + 0.6 * ((i * 7 % 10) / 10)));
    ctx.fillStyle = 'rgba(255,240,200,' + br + ')'; ctx.fillRect(sx, sy, i % 7 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1);
  }
  if (n >= 7) {
    ctx.fillStyle = '#ffe8a0'; ctx.beginPath(); ctx.arc(490, 40, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#06080f'; ctx.beginPath(); ctx.arc(501, 33, 17, 0, Math.PI * 2); ctx.fill();
  }
  if (n < 1) { _buildLabel(ctx, W, "Complete levels to build the Ka'ba!", 0, T); return; }
  ctx.fillStyle = '#d0c8b8'; ctx.fillRect(0, 215, W, 35);
  ctx.strokeStyle = '#b8b0a0'; ctx.lineWidth = 1;
  for (var x2 = 0; x2 <= W; x2 += 40) { ctx.beginPath(); ctx.moveTo(x2, 215); ctx.lineTo(x2, 250); ctx.stroke(); }
  for (var y2 = 215; y2 < 250; y2 += 18) { ctx.beginPath(); ctx.moveTo(0, y2); ctx.lineTo(W, y2); ctx.stroke(); }
  if (n < 2) { _buildLabel(ctx, W, 'Plaza laid... 1/' + T, 1, T); return; }
  ctx.fillStyle = '#bab0a0'; ctx.fillRect(155, 203, 250, 14);
  ctx.fillStyle = '#d0c8b8'; ctx.fillRect(155, 203, 250, 3);
  ctx.fillStyle = '#a09888'; ctx.fillRect(158, 214, 244, 3);
  if (n < 3) { _buildLabel(ctx, W, 'Platform placed! 2/' + T, 2, T); return; }
  var KL = 200, KW = 160, KB = 203, KH = 136, KT = KB - KH;
  function drawWallBand(bx, by, bw, bh) {
    ctx.fillStyle = '#1c1a14'; ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = '#2a2820'; ctx.lineWidth = 1;
    for (var ly = by + 8; ly < by + bh; ly += 8) { ctx.beginPath(); ctx.moveTo(bx, ly); ctx.lineTo(bx + bw, ly); ctx.stroke(); }
    for (var lx = bx + 14; lx < bx + bw; lx += 18) { ctx.beginPath(); ctx.moveTo(lx, by); ctx.lineTo(lx, by + bh); ctx.stroke(); }
  }
  var bh = KH / 4, bandsBuilt = Math.min(4, Math.floor((n - 2) / 4) + 1);
  for (var b = 0; b < bandsBuilt; b++) drawWallBand(KL, KB - bh * (b + 1), KW, bh);
  if (n >= 12) {
    var dw = 46, dh = 66, dx = KL + KW / 2 - 23, dy = KB - dh;
    ctx.fillStyle = '#b07808'; ctx.fillRect(dx, dy, dw, dh);
    ctx.fillStyle = '#e8b820'; ctx.fillRect(dx + 4, dy + 4, dw - 8, dh - 4);
    ctx.fillStyle = '#ffd700'; ctx.fillRect(dx + 20, dy + 33, 7, 7);
  }
  if (n >= 17) {
    var ky = KT + 18;
    ctx.fillStyle = '#c8a010'; ctx.fillRect(KL, ky, KW, 20);
    ctx.fillStyle = '#e0c030'; ctx.fillRect(KL, ky - 1, KW, 3); ctx.fillRect(KL, ky + 20, KW, 3);
  }
  if (n >= 20) {
    ctx.fillStyle = '#2a2018'; ctx.fillRect(KL - 7, KT - 11, KW + 14, 14);
  }
  if (n >= T) {
    var grd = ctx.createRadialGradient(KL + KW/2, KB - KH/2, KH/5, KL + KW/2, KB - KH/2, KH*1.1);
    grd.addColorStop(0, 'rgba(255,200,0,0.32)'); grd.addColorStop(1, 'rgba(255,200,0,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText("ALLAHUMMA BARIK! KA'BA COMPLETE!", W / 2, 20);
    ctx.textAlign = 'left';
  } else {
    _buildLabel(ctx, W, "Building the Ka'ba — " + n + '/' + T + ' levels', n, T);
  }
}

function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
