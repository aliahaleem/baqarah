'use strict';
/* ================================================
   SURAH AL-IMRAN — app.js  (data layer only)
   ================================================ */

window.STORAGE_KEY = 'imranQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Answers: {}, s1Checked: false,
  s2Answers: {}, s2Checked: false,
  s3Checked: false,
  s4Answers: {}, s4Checked: false,
  s5Checked: false,
  s6Checked: false,
  s7Answers: {}, s7Checked: false,
  s8Checked: false,
  s9Answers: {}, s9Checked: false,
  s10Checked: false,
};

const REWARDS = {
  1:  { xp: 80,  gems: 3, icon: '🌟', title: 'THE BOOK UNDERSTOOD!',    msg: 'MashAllah! Muhkam vs mutashabih — those firmly grounded say "We believe in it all." You are among them!' },
  2:  { xp: 90,  gems: 3, icon: '👶', title: "MARYAM'S FAMILY KNOWN!",  msg: "SubhanAllah! Imran's wife, Maryam, Zakariyya, Yahya — every du'a made sincerely is answered." },
  3:  { xp: 100, gems: 4, icon: '✨', title: "ISA'S MIRACLES KNOWN!",   msg: "MashAllah! Spoke from the cradle, healed, raised the dead — all \"by Allah's permission.\"" },
  4:  { xp: 90,  gems: 3, icon: '🕊️', title: 'IBRAHIM THE PURE!',       msg: 'SubhanAllah! Neither Jewish nor Christian — he was a pure Muslim. So are we.' },
  5:  { xp: 100, gems: 4, icon: '🤝', title: 'ROPE HELD TIGHT!',         msg: "MashAllah! United in worship, generosity, self-control and forgiveness. May Allah make us the best nation." },
  6:  { xp: 110, gems: 4, icon: '⚔️', title: 'BADR UNDERSTOOD!',         msg: "Allahu Akbar! 313 vs 1000 — angels and tawakkul. Victory is ONLY from Allah. On to Uhud!" },
  7:  { xp: 120, gems: 5, icon: '🏹', title: 'UHUD LESSON LEARNED!',     msg: "MashAllah! Obedience is never optional. \"Hasbunallahu wa ni'mal wakeel\" — say it whenever you feel overwhelmed." },
  8:  { xp: 110, gems: 4, icon: '💫', title: 'SHUHADA HONOURED!',        msg: 'SubhanAllah! Not dead — alive, provided for, rejoicing. May Allah grant the shuhada the highest stations. Ameen.' },
  9:  { xp: 120, gems: 5, icon: '🌌', title: 'SIGNS SEEN!',              msg: "MashAllah! Every star, every sunrise — signs for Ulu al-Albab. You are becoming one of the people of understanding!" },
  10: { xp: 150, gems: 8, icon: '🤲', title: 'AL-IMRAN COMPLETE!',       msg: 'ALLAHUMMA BARIK! All 10 levels done. رَبَّنَا لَا تُزِغْ قُلُوبَنَا — May Allah keep your heart guided. Ameen!' },
};

window.SURAH_CONFIG = {
  totalLevels: 10,
  rewards: REWARDS,
  tileIcons:  ['🌟','👶','✨','🕊️','🤝','⚔️','🏹','💫','🌌','🤲'],
  tileLabels: ['The Book','Maryam','Isa','Ibrahim','Rope','Badr','Uhud','Shuhada','Signs',"Du'a"],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Welcome to Al-Imran Quest — the Surah of Maryam's family, Ibrahim, Uhud and the greatest du'as. Choose your first level!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. Keep going — knowledge awaits! 💪`,
    complete: name => `MashAllah, ${name}! All 10 levels of Al-Imran done. May Allah bless your understanding. 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

const S1_QUIZ = [
  { q: "What does \"Al-Imran\" (the Surah's title) refer to?",
    opts: ['A great king of Arabia',
           "The Family of Imran — Maryam's family",
           'A type of prayer in Islam',
           'A place near Mecca'],
    correct: 1 },
  { q: 'What are "muhkam" verses? (3:7)',
    opts: ['Hidden verses only scholars understand',
           'Clear, foundational, unambiguous verses',
           'Very long Quranic verses revealed late',
           'Verses revealed only in Mecca alone'],
    correct: 1 },
  { q: 'What do those with "zaygh" (deviation) do with mutashabih verses?',
    opts: ['Avoid them and stay far away',
           'Follow them in the correct way',
           'Ask scholars to explain them fully',
           'Chase their hidden meanings to cause confusion'],
    correct: 3 },
  { q: 'Who truly knows the FULL meaning of the ambiguous verses? (3:7)',
    opts: ['The greatest Islamic scholars',
           'The Prophet ﷺ and companions only',
           'The angels who delivered the revelation',
           'Allah — firmly grounded say "We believe in all"'],
    correct: 3 },
  { q: 'What is the response of those "firmly grounded in knowledge"?',
    opts: ['They point out the difficult verses',
           '"All is from our Lord — we believe in it"',
           'They only follow the very clear verses',
           'They ask for more explanation every time'],
    correct: 1 },
];

// S2: Fill-in-the-Blank — Zakariyya & Maryam (3:33-51)
const S2_FIB = [
  {verse:'إِنَّ اللَّهَ اصْطَفَىٰ آدَمَ وَنُوحًا وَآلَ إِبْرَاهِيمَ وَآلَ _____ عَلَى الْعَالَمِينَ', opts:['عِمْرَانَ','مُوسَىٰ','دَاوُودَ','يَعْقُوبَ'], correct:0, ref:'3:33', translation:'Indeed, Allah chose Adam, Nuh, the family of Ibrahim, and the family of Imran over all people'},
  {verse:'إِذْ قَالَتِ امْرَأَتُ عِمْرَانَ رَبِّ إِنِّي نَذَرْتُ لَكَ مَا فِي بَطْنِي _____', opts:['مُحَرَّرًا','مُخْلِصًا','مُبَارَكًا','صَالِحًا'], correct:0, ref:'3:35', translation:'When the wife of Imran said: My Lord, I have pledged what is in my womb to be dedicated to You'},
  {verse:'فَتَقَبَّلَهَا رَبُّهَا بِقَبُولٍ حَسَنٍ وَأَنبَتَهَا _____ حَسَنًا', opts:['نَبَاتًا','شَجَرًا','عِلْمًا','نُورًا'], correct:0, ref:'3:37', translation:'So her Lord accepted her with good acceptance and caused her to grow in a good manner'},
  {verse:'هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُ قَالَ رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً _____', opts:['طَيِّبَةً','صَالِحَةً','مُبَارَكَةً','كَثِيرَةً'], correct:0, ref:'3:38', translation:'There Zakariyya called upon his Lord: My Lord, grant me from You a good offspring'},
  {verse:'قَالَتْ رَبِّ أَنَّىٰ يَكُونُ لِي وَلَدٌ وَلَمْ يَمْسَسْنِي _____', opts:['بَشَرٌ','رَجُلٌ','أَحَدٌ','زَوْجٌ'], correct:0, ref:'3:47', translation:'She said: My Lord, how can I have a child when no man has touched me?'},
];

const S3_ITEMS = [
  { id: 'i1', text: '🗣️ Spoke from\nthe cradle',     zone: 'z1' },
  { id: 'i2', text: '🐦 Created birds\nfrom clay',   zone: 'z2' },
  { id: 'i3', text: '🦯 Healed the blind\nand lepers',zone: 'z3' },
  { id: 'i4', text: '⚰️ Raised the\ndead to life',   zone: 'z4' },
  { id: 'i5', text: '📖 Confirmed the\nTorah & Injeel',zone: 'z5' },
];
const S3_ZONES = [
  { id: 'z1', desc: '"He will speak to the people in the cradle and in maturity" (3:46)' },
  { id: 'z2', desc: '"He shapes from clay something like a bird — breathes into it — and it becomes a real bird, by Allah\'s permission" (3:49)' },
  { id: 'z3', desc: '"He heals those born blind and those with leprosy — by Allah\'s permission" (3:49)' },
  { id: 'z4', desc: '"He brings the dead back to life — by Allah\'s permission" (3:49)' },
  { id: 'z5', desc: '"Coming confirming what was before him in the Torah, and bringing the Injeel" (3:50)' },
];

const S4_QUIZ = [
  { q: 'According to 3:67, what was Ibrahim (AS)?',
    opts: ['A Prophet without any religion',
           'A follower of Musa (AS) only',
           'A hanif — a pure monotheist who submitted to Allah',
           'He followed the Torah only'],
    correct: 2 },
  { q: 'What is the "common word" Allah invites all people to in 3:64?',
    opts: ['Follow the same prayer direction',
           'Worship Allah alone and associate nothing with Him',
           'Accept the Quran as the final scripture',
           'Fast in Ramadan together'],
    correct: 1 },
  { q: 'According to 3:96, what was the FIRST House established for humanity?',
    opts: ['The Temple in Jerusalem',
           'The one in Bakkah (Mecca) — a blessing for all',
           'The tent of Ibrahim in the desert',
           'Masjid al-Aqsa in Palestine'],
    correct: 1 },
  { q: 'Who has the strongest claim to Ibrahim according to 3:68?',
    opts: ['Those who share his bloodline only',
           'The Jewish people who came later',
           'The people of Mecca alone',
           'Those who follow him — especially the Prophet ﷺ and believers'],
    correct: 3 },
  { q: 'What did ALL Prophets promise in Allah\'s covenant? (3:81)',
    opts: ['To build mosques in every land',
           'To never contradict each other',
           'If a confirming messenger came, believe in and support him',
           'To only speak in Arabic'],
    correct: 2 },
];

const S5_ITEMS = [
  { id: 'r1', text: "🤝 Hold fast to\nAllah's rope,\nall together",    zone: 'z1' },
  { id: 'r2', text: '🌟 Command good,\nforbid evil,\nbelieve in Allah', zone: 'z2' },
  { id: 'r3', text: '❤️ Spend in ease\nAND hardship',                  zone: 'z3' },
  { id: 'r4', text: '😤 Swallow\nyour anger',                          zone: 'z4' },
  { id: 'r5', text: '🙏 Pardon and\nforgive people',                   zone: 'z5' },
];
const S5_ZONES = [
  { id: 'z1', desc: '"Hold fast to Allah\'s rope, all together. Do not be divided." (3:103)' },
  { id: 'z2', desc: '"You are the best nation raised for humanity — you command what is right, forbid what is wrong, and believe in Allah." (3:110)' },
  { id: 'z3', desc: "A quality of the Muttaqeen: they give even when it is difficult. (3:134)" },
  { id: 'z4', desc: '"Allah loves those who do good." (3:134)' },
  { id: 'z5', desc: 'A quality of the Muttaqeen: they pardon people — forgive even when they could retaliate. (3:134)' },
];

// S6: Verse-to-Theme — Uhud Lessons (3:139-175)
const S6_THEME_ITEMS = [
  {id:'t1', text:'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ', zone:'z1'},
  {id:'t2', text:'وَتِلْكَ الْأَيَّامُ نُدَاوِلُهَا بَيْنَ النَّاسِ', zone:'z2'},
  {id:'t3', text:'وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ', zone:'z3'},
  {id:'t4', text:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', zone:'z4'},
  {id:'t5', text:'وَلِيُمَحِّصَ اللَّهُ الَّذِينَ آمَنُوا وَيَمْحَقَ الْكَافِرِينَ', zone:'z5'},
];
const S6_THEME_ZONES = [
  {id:'z1', desc:'Believers are always on top spiritually — even when the world says you are losing (3:139)'},
  {id:'z2', desc:'Allah rotates victory and hardship to test sincerity — setbacks are purification, not punishment (3:140)'},
  {id:'z3', desc:'Your faith cannot depend on any person — it must be anchored in Allah alone (3:144)'},
  {id:'z4', desc:'The ultimate response to fear: total reliance on Allah dissolves all anxiety (3:173)'},
  {id:'z5', desc:'Hardship is Allah\'s filter — it purifies the sincere and exposes the insincere (3:141)'},
];

const S7_QUIZ = [
  { q: 'What was the main reason Muslims suffered at Uhud?',
    opts: ['They had far too few weapons',
           'Archers disobeyed and left positions for the spoils',
           'The Prophet ﷺ made a strategic error',
           'The enemy simply had too many soldiers'],
    correct: 1 },
  { q: 'What does 3:144 teach about Prophet Muhammad ﷺ?',
    opts: ['He will never leave the believers',
           'He chose who enters Jannah personally',
           'He is only a messenger — if he dies, will you turn back?',
           'He will return before the Day of Judgement'],
    correct: 2 },
  { q: 'What did true believers say when told the enemy doubled? (3:173)',
    opts: ['They asked for more soldiers',
           '"Hasbunallahu wa ni\'mal wakeel — Allah is enough!"',
           'They asked the Prophet ﷺ to retreat',
           'They immediately asked for a truce'],
    correct: 1 },
  { q: 'What was the deeper wisdom of the setback at Uhud?',
    opts: ['Allah abandoned the believers temporarily',
           'The disbelievers were genuinely much stronger',
           'To test believers and expose hypocrites — purification',
           'The angels simply did not arrive in time'],
    correct: 2 },
  { q: "What does \"Hasbunallahu wa ni'mal wakeel\" mean?",
    opts: ['"There is no god but Allah alone"',
           '"Allah is sufficient and the best Disposer of affairs"',
           '"We belong to Allah and return to Him"',
           '"Victory comes from Allah alone"'],
    correct: 1 },
];

const S8_ITEMS = [
  { id: 'sh1', text: 'وَلَا تَحْسَبَنَّ الَّذِينَ\nقُتِلُوا فِي سَبِيلِ اللَّهِ\nأَمْوَاتًا',  zone: 'z1' },
  { id: 'sh2', text: 'بَلْ أَحْيَاءٌ عِندَ\nرَبِّهِمْ يُرْزَقُونَ',                              zone: 'z2' },
  { id: 'sh3', text: 'فَرِحِينَ بِمَا آتَاهُمُ\nاللَّهُ مِن فَضْلِهِ',                            zone: 'z3' },
  { id: 'sh4', text: 'وَيَسْتَبْشِرُونَ بِالَّذِينَ\nلَمْ يَلْحَقُوا بِهِم',                      zone: 'z4' },
  { id: 'sh5', text: 'أَلَّا خَوْفٌ عَلَيْهِمْ\nوَلَا هُمْ يَحْزَنُونَ',                          zone: 'z5' },
];
const S8_ZONES = [
  { id: 'z1', desc: 'Do not think of those killed in Allah\'s cause as dead — they are alive with their Lord (3:169)' },
  { id: 'z2', desc: 'They are alive, provided for by their Lord with sustenance (3:169)' },
  { id: 'z3', desc: 'Rejoicing in the bounty Allah has given them from His favour (3:170)' },
  { id: 'z4', desc: 'They give glad tidings about those who have not yet joined them (3:170-171)' },
  { id: 'z5', desc: 'No fear shall come upon them, nor shall they grieve — free forever (3:170)' },
];

// S9: Fill-in-the-Blank — Closing Wisdom (3:185-200)
const S9_FIB = [
  {verse:'كُلُّ نَفْسٍ ذَائِقَةُ _____', opts:['الْمَوْتِ','الْحَيَاةِ','الْحِسَابِ','الْعَذَابِ'], correct:0, ref:'3:185', translation:'Every soul will taste death'},
  {verse:'لَتُبْلَوُنَّ فِي أَمْوَالِكُمْ وَ _____', opts:['أَنفُسِكُمْ','أَوْلَادِكُمْ','أَهْلِيكُمْ','دِيَارِكُمْ'], correct:0, ref:'3:186', translation:'You will surely be tested in your wealth and yourselves'},
  {verse:'الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ _____', opts:['جُنُوبِهِمْ','رُكَبِهِمْ','ظُهُورِهِمْ','وُجُوهِهِمْ'], correct:0, ref:'3:191', translation:'Those who remember Allah standing, sitting, and on their sides'},
  {verse:'رَبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلْإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ _____', opts:['فَآمَنَّا','فَصَبَرْنَا','فَسَجَدْنَا','فَأَطَعْنَا'], correct:0, ref:'3:193', translation:'Our Lord, we heard a caller calling to faith: "Believe in your Lord" — so we believed'},
  {verse:'يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَ _____', opts:['رَابِطُوا','جَاهِدُوا','اعْتَصِمُوا','تَوَاصَوْا'], correct:0, ref:'3:200', translation:'O you who believe, be patient, endure, and remain stationed'},
];

const S10_ITEMS = [
  { id: 'du1', text: 'رَبَّنَا لَا تُزِغْ\nقُلُوبَنَا بَعْدَ\nإِذْ هَدَيْتَنَا',          zone: 'z1' },
  { id: 'du2', text: 'رَبَّنَا إِنَّكَ\nجَامِعُ النَّاسِ',                                   zone: 'z2' },
  { id: 'du3', text: 'رَبَّنَا فَاغْفِرْ لَنَا\nذُنُوبَنَا وَكَفِّرْ\nعَنَّا سَيِّئَاتِنَا', zone: 'z3' },
  { id: 'du4', text: 'رَبَّنَا وَآتِنَا مَا\nوَعَدتَّنَا عَلَىٰ رُسُلِكَ',                  zone: 'z4' },
  { id: 'du5', text: 'وَلَا تُخْزِنَا\nيَوْمَ الْقِيَامَةِ',                                zone: 'z5' },
];
const S10_ZONES = [
  { id: 'z1', desc: 'Our Lord, do not let our hearts deviate after You have guided us (3:8)' },
  { id: 'z2', desc: 'Our Lord, You will surely gather all people on the Day about which there is no doubt (3:9)' },
  { id: 'z3', desc: 'Our Lord, forgive our sins and erase our misdeeds (3:193)' },
  { id: 'z4', desc: 'Our Lord, give us what You promised through Your messengers (3:194)' },
  { id: 'z5', desc: 'Our Lord, do not disgrace us on the Day of Resurrection (3:192)' },
];

// =============================================
//  SECTION WRAPPERS
// =============================================
function renderSection1Game()  { renderQuiz(1, S1_QUIZ); }
function checkSection1()       { checkQuiz(1, S1_QUIZ); }
window.registerFillBlank(2, S2_FIB);
function renderSection3Game()  { renderDragDrop(3, S3_ITEMS, S3_ZONES); }
function checkSection3()       { checkDragDrop(3, S3_ZONES); }
function renderSection4Game()  { renderQuiz(4, S4_QUIZ); }
function checkSection4()       { checkQuiz(4, S4_QUIZ); }
function renderSection5Game()  { renderDragDrop(5, S5_ITEMS, S5_ZONES); }
function checkSection5()       { checkDragDrop(5, S5_ZONES); }
window.registerMatch(6, S6_THEME_ITEMS, S6_THEME_ZONES);
function renderSection7Game()  { renderQuiz(7, S7_QUIZ); }
function checkSection7()       { checkQuiz(7, S7_QUIZ); }
function renderSection8Game()  { renderDragDrop(8, S8_ITEMS, S8_ZONES); }
function checkSection8()       { checkDragDrop(8, S8_ZONES); }
window.registerFillBlank(9, S9_FIB);
function renderSection10Game() { renderDragDrop(10, S10_ITEMS, S10_ZONES); }
function checkSection10()      { checkDragDrop(10, S10_ZONES); }

// =============================================
//  MASJID WORLD BUILDER (surah-specific)
// =============================================
function _buildLabelImran(ctx, W, msg, done, total) {
  ctx.fillStyle = '#7a5ab0'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#120a28'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#5a3aa0'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}
function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  const sk = ctx.createLinearGradient(0, 0, 0, H);
  sk.addColorStop(0, n >= 10 ? '#1a0838' : '#060812'); sk.addColorStop(1, n >= 10 ? '#0e0420' : '#0a0c1a');
  ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 65; i++) {
    const sx = (i*6143)%W, sy=(i*4517)%165, br=Math.min(0.9,(n/4)*(0.3+(i%3)*0.3));
    ctx.fillStyle = `rgba(220,200,255,${br})`; ctx.fillRect(sx, sy, 1, 1);
  }
  if (n < 1) { _buildLabelImran(ctx, W, '🕌 Complete levels to build the Masjid!', 0, 10); return; }
  ctx.fillStyle = '#d0c8b0'; ctx.fillRect(0, 215, W, 35);
  if (n < 2) { _buildLabelImran(ctx, W, '🕌 Plaza laid — 1/10', 1, 10); return; }
  ctx.fillStyle = '#c0b8a0'; ctx.fillRect(80, 207, 400, 12);
  if (n < 3) { _buildLabelImran(ctx, W, '🕌 Foundation placed — 2/10', 2, 10); return; }
  const WL = 120, WW = 320, WB = 207, bh = 34, bands = Math.min(3, n - 2);
  for (let b = 0; b < bands; b++) {
    ctx.fillStyle = '#c8b890'; ctx.fillRect(WL, WB - bh * (b+1), WW, bh);
    ctx.strokeStyle = '#a09870'; ctx.lineWidth = 1;
    for (let ly = WB - bh*(b+1)+9; ly < WB - bh*b; ly+=10) { ctx.beginPath(); ctx.moveTo(WL,ly); ctx.lineTo(WL+WW,ly); ctx.stroke(); }
  }
  if (n >= 4) {
    for (let wi = 0; wi < 4; wi++) {
      const wx = WL+28+wi*74, wy = WB-bh*2+6;
      ctx.fillStyle = '#2a3850'; ctx.fillRect(wx, wy, 22, 26);
      ctx.fillStyle = '#3050a0'; ctx.beginPath(); ctx.arc(wx+11, wy, 8, Math.PI, 0); ctx.fill();
    }
  }
  if (n >= 5) {
    ctx.fillStyle = '#2a3850'; ctx.fillRect(258, WB-52, 44, 52);
    ctx.beginPath(); ctx.arc(280, WB-52, 22, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#c0a860'; ctx.fillRect(262, WB-50, 36, 48);
  }
  if (n >= 6) { ctx.fillStyle = '#d8c8a0'; ctx.fillRect(199, WB-bh*3-12, 162, 14); }
  if (n >= 7) {
    const dcy = WB-bh*3-14;
    ctx.fillStyle = '#c8b888'; ctx.beginPath(); ctx.arc(280, dcy, 62, Math.PI, 0, false); ctx.fill();
    ctx.fillStyle = '#c8b880'; ctx.fillRect(272, dcy-28, 16, 30);
  }
  if (n >= 8) { ctx.fillStyle = '#c8b890'; ctx.fillRect(88, 118, 26, 92); ctx.fillStyle = '#b8a870'; ctx.beginPath(); ctx.moveTo(83,118); ctx.lineTo(101,92); ctx.lineTo(119,118); ctx.closePath(); ctx.fill(); }
  if (n >= 9) { ctx.fillStyle = '#c8b890'; ctx.fillRect(446, 118, 26, 92); ctx.fillStyle = '#b8a870'; ctx.beginPath(); ctx.moveTo(441,118); ctx.lineTo(459,92); ctx.lineTo(477,118); ctx.closePath(); ctx.fill(); }
  if (n >= 10) {
    const dcy = WB-bh*3-14;
    ctx.fillStyle = '#e8c840'; ctx.beginPath(); ctx.arc(280, dcy-40, 13, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(101, 84, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(459, 84, 8, 0, Math.PI*2); ctx.fill();
    const grd = ctx.createRadialGradient(280, 150, 30, 280, 150, 200);
    grd.addColorStop(0, 'rgba(180,140,60,0.28)'); grd.addColorStop(1, 'rgba(180,140,60,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText('ALLAHUMMA BARIK! 🕌 MASJID COMPLETE!', W/2, 20); ctx.textAlign = 'left';
  } else { _buildLabelImran(ctx, W, `Building the Masjid — ${n}/10 levels`, n, 10); }
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
