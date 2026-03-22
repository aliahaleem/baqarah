'use strict';
/* ================================================
   SURAH MUHAMMAD — app.js  (data layer only)
   Note: Section 2 has both a drag-drop AND a bonus
   quiz — both must pass before completing the level.
   ================================================ */

window.STORAGE_KEY = 'muhammadQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Answers: {}, s1Checked: false,
  s2Checked: false, s2DdChecked: false,
  s2Answers: {}, s2QuizChecked: false,
  s3Answers: {}, s3Checked: false,
  s4Checked: false,
  s5Answers: {}, s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Checked: false,
  s8Checked: false,
};

const REWARDS = {
  1: { xp: 90,  gems: 3, icon: '⚖️', title: 'TWO PATHS KNOWN!',          msg: 'MashAllah! Those who follow Truth — deeds rise. Those who follow falsehood — deeds crumble. Every day you choose. Choose Truth.' },
  2: { xp: 100, gems: 4, icon: '🌟', title: 'SUPPORT GIVEN!',             msg: 'SubhanAllah! "If you support Allah, He will support you and make your feet firm." (47:7) This is one of the greatest promises in the Quran.' },
  3: { xp: 90,  gems: 3, icon: '🏛️', title: 'HISTORY UNDERSTOOD!',        msg: "MashAllah! Earlier nations were stronger — and still Allah wiped them out. Power is temporary. Only obedience to Allah lasts." },
  4: { xp: 100, gems: 4, icon: '🌊', title: 'JANNAH RIVERS KNOWN!',       msg: 'SubhanAllah! Water that never stales, milk that never sours, honey always pure. May Allah make us among the people of Jannah. Ameen.' },
  5: { xp: 110, gems: 4, icon: '✨', title: 'لا إله إلا الله KNOWN!',      msg: 'Allahu Akbar! "KNOW that there is no god except Allah." Knowledge comes FIRST. You are becoming Ulu al-Albab!' },
  6: { xp: 110, gems: 4, icon: '🔒', title: 'HEARTS OPENED!',              msg: 'MashAllah! "Are there locks on their hearts?" The key is tadabbur — reflecting on the Quran sincerely.' },
  7: { xp: 100, gems: 3, icon: '🎮', title: 'DUNYA SEEN CLEARLY!',        msg: 'SubhanAllah! The dunya is "only play and amusement." Short like a game. Use it to earn the akhirah.' },
  8: { xp: 150, gems: 8, icon: '🤲', title: 'SURAH MUHAMMAD COMPLETE!',   msg: "ALLAHUMMA BARIK! All 8 levels complete! \"If you support Allah, He will support you.\" May Allah never replace us. Ameen!" },
};

window.SURAH_CONFIG = {
  totalLevels: 8,
  rewards: REWARDS,
  tileIcons:  ['⚖️','🌟','🏛️','🌊','✨','🔒','🎮','🤲'],
  tileLabels: ['Two Paths','Support Allah','History','Jannah','Laa Ilaaha','Hypocrisy','Dunya','Spend'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Welcome to Surah Muhammad Quest — the Surah of Two Paths, the Rivers of Jannah, and "Know لا إله إلا الله." Choose your first level!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. Support Allah and He will support you! 💪`,
    complete: name => `MashAllah, ${name}! All 8 levels of Surah Muhammad complete. May Allah keep you firm! 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

const S1_QUIZ = [
  { q: 'Surah Muhammad (47) is also known by what other name?',
    opts: ['Al-Fath (The Victory)',
           'Al-Qital (The Fighting)',
           'Al-Jihad (The Struggle)',
           'Al-Nasr (The Help)'],
    correct: 1 },
  { q: "What happens to the deeds of disbelievers who block Allah's way? (47:1)",
    opts: ['They are all recorded and punished later',
           'Allah renders their deeds completely worthless',
           'They are given one more chance to redo them',
           'Nothing changes — all deeds still count equally'],
    correct: 1 },
  { q: 'What does Allah do for believers who do righteous deeds? (47:2)',
    opts: ['Gives them immediate wealth and health right away',
           'Records every single deed twice for them',
           'Removes their bad deeds and improves their condition',
           'Shows all their deeds publicly to everyone'],
    correct: 2 },
  { q: 'According to 47:3, believers follow Truth (al-haqq). What do disbelievers follow?',
    opts: ["Their scholars' scholarly opinions and rulings",
           'Falsehood (al-batil)',
           'Their long-standing cultural traditions',
           'Their own independent reasoning only'],
    correct: 1 },
  { q: 'What does 47:4 say about prisoners of war after they are subdued?',
    opts: ['Keep them as slaves permanently in the land',
           'Execute all of them without any exception',
           'Banish them permanently from the land',
           'Either free them as a favour OR let them ransom themselves'],
    correct: 3 },
];

// Section 2 has a unique combined drag-drop + bonus quiz
const S2_ITEMS = [
  { id: 'sa1', text: 'إِن تَنصُرُوا اللَّهَ\nيَنصُرْكُمْ',                           zone: 'z1' },
  { id: 'sa2', text: 'وَالَّذِينَ كَفَرُوا\nفَتَعْسًا لَّهُمْ',                        zone: 'z2' },
  { id: 'sa3', text: 'زُيِّنَ لَهُ سُوءُ عَمَلِهِ\nوَاتَّبَعُوا أَهْوَاءَهُمْ',        zone: 'z3' },
  { id: 'sa4', text: 'وَالَّذِينَ قُتِلُوا\nفِي سَبِيلِ اللَّهِ',                      zone: 'z4' },
];
const S2_ZONES = [
  { id: 'z1', desc: 'He will support you and make your feet firm — the believer stands firm (47:7)' },
  { id: 'z2', desc: 'Destruction for them — He made their deeds worthless, their toil counts for nothing (47:8)' },
  { id: 'z3', desc: 'He let them go in their own wrongdoing and blinded them — desires lead to blindness (47:14-17)' },
  { id: 'z4', desc: 'He will not waste their deeds — He guides them and improves their state (47:4-5)' },
];
const S2_BONUS_QUIZ = [
  { q: 'What is the great promise of 47:7?',
    opts: ['"He will give you Jannah immediately"',
           '"If you support Allah, He will support you and make your feet firm"',
           '"He will remove all worldly hardships from you"',
           '"He will never test you in any way again"'],
    correct: 1 },
  { q: 'What happens to the deeds of disbelievers according to 47:8?',
    opts: ['They are recorded and judged on the Day of Judgment',
           'Destruction is their lot and He made their deeds worthless',
           'All deeds are given back to them completely in full',
           'Their deeds are transferred to their closest family'],
    correct: 1 },
];

// S3: Fill-in-the-Blank — Battlefield & Forgiveness (47:3-10)
const S3_FIB = [
  {verse:'فَإِذَا لَقِيتُمُ الَّذِينَ كَفَرُوا فَضَرْبَ _____', opts:['الرِّقَابِ','الْأَعْدَاءِ','السُّيُوفِ','الْجُنُودِ'], correct:0, ref:'47:4', translation:'So when you meet those who disbelieve, strike their necks'},
  {verse:'وَالَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ فَلَن يُضِلَّ _____', opts:['أَعْمَالَهُمْ','أَرْوَاحَهُمْ','ذُنُوبَهُمْ','أَهْلَهُمْ'], correct:0, ref:'47:4', translation:'And those killed in the cause of Allah — He will never render their deeds worthless'},
  {verse:'ذَٰلِكَ بِأَنَّ الَّذِينَ كَفَرُوا اتَّبَعُوا _____', opts:['الْبَاطِلَ','الشَّيْطَانَ','الْهَوَىٰ','الظُّلْمَ'], correct:0, ref:'47:3', translation:'That is because those who disbelieve follow falsehood'},
  {verse:'سَيَهْدِيهِمْ وَيُصْلِحُ _____', opts:['بَالَهُمْ','حَالَهُمْ','قَلْبَهُمْ','أَمْرَهُمْ'], correct:0, ref:'47:5', translation:'He will guide them and improve their condition'},
  {verse:'أَفَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِن _____', opts:['قَبْلِهِمْ','حَوْلِهِمْ','بَعْدِهِمْ','فَوْقِهِمْ'], correct:0, ref:'47:10', translation:'Have they not traveled through the earth to see the fate of those before them?'},
];

const S4_ITEMS = [
  { id: 'r1', text: 'أَنْهَارٌ مِّن مَّاءٍ\nغَيْرِ آسِنٍ',                zone: 'z1' },
  { id: 'r2', text: 'أَنْهَارٌ مِّن لَّبَنٍ\nلَّمْ يَتَغَيَّرْ طَعْمُهُ', zone: 'z2' },
  { id: 'r3', text: 'أَنْهَارٌ مِّنْ عَسَلٍ\nمُّصَفًّى',                  zone: 'z3' },
  { id: 'r4', text: 'أَنْهَارٌ مِّنْ خَمْرٍ\nلَّذَّةٍ لِّلشَّارِبِينَ',   zone: 'z4' },
];
const S4_ZONES = [
  { id: 'z1', desc: 'Rivers of water that never changes in taste (47:15)' },
  { id: 'z2', desc: 'Rivers of milk whose taste never changes (47:15)' },
  { id: 'z3', desc: 'Rivers of purified honey (47:15)' },
  { id: 'z4', desc: 'Rivers of a drink that is a delight to those who drink (47:15)' },
];

const S5_QUIZ = [
  { q: 'What is the first WORD of the command in verse 47:19?',
    opts: ['"Amal" — Act first',
           '"Istaqim" — Be upright',
           '"Fa\'lam" — KNOW',
           '"Tawakkul" — Trust'],
    correct: 2 },
  { q: 'What is the full command of 47:19?',
    opts: ['"Pray more and fast even more often"',
           '"Know there is no god except Allah — seek forgiveness for your sin"',
           '"Support all believers with your wealth generously"',
           '"Obey the Messenger in every single matter"'],
    correct: 1 },
  { q: 'Who is mentioned in 47:19 to also seek forgiveness for?',
    opts: ['The enemies of Islam specifically',
           'The people of the Book who received scripture',
           'The believing men and women — the whole Ummah',
           "The Prophet's immediate family only"],
    correct: 2 },
  { q: 'Why is 47:19 unique? What principle does it teach?',
    opts: ['It is the single longest verse in the entire Quran',
           '"Al-ilm qabla al-amal" — knowledge comes BEFORE action',
           'It was the very last verse of the Quran revealed',
           'It contains a summary of all five pillars of Islam'],
    correct: 1 },
  { q: 'What must true knowledge of لا إله إلا الله produce?',
    opts: ['Just saying it with the tongue alone is sufficient',
           'Performing more religious rituals and ceremonies',
           'Memorising more of the Quran by heart',
           'Humility and obedience to Allah alone — must change actions'],
    correct: 3 },
];

const S6_QUIZ = [
  { q: "What does 47:24 ask about those who don't reflect on the Quran?",
    opts: ['"Why do they not read more Quran?"',
           '"Are there locks upon their hearts?"',
           '"Why do they not attend more learning circles?"',
           '"Have they not memorised enough yet?"'],
    correct: 1 },
  { q: 'What is the sign of hypocrisy when a verse about fighting is revealed? (47:20)',
    opts: ['They immediately argue about military strategy',
           'They pretend to agree but leave quickly',
           'They look at the Prophet ﷺ like one about to faint',
           'They ask polite but deflecting questions'],
    correct: 2 },
  { q: 'What do the hypocrites think they can hide? (47:29)',
    opts: ['Their poverty and financial difficulties',
           'Their plans to secretly leave the city',
           'Their resentment and hatred — but Allah exposes it',
           'Their inner doubts about the Quran'],
    correct: 2 },
  { q: 'What does 47:33 command believers?',
    opts: ['Give all your wealth freely in charity',
           '"Obey Allah and the Messenger — do not invalidate your deeds"',
           'Participate and fight in every single battle',
           'Follow only certified scholars in all matters'],
    correct: 1 },
  { q: 'What happens when someone follows desires over Allah\'s commands? (47:14)',
    opts: ['They are immediately and severely punished in this world',
           '"He let them go in wrongdoing — and blinded them." Spiritual blindness.',
           'They are given additional time and chances to repent',
           'There are no consequences in this life — only the afterlife'],
    correct: 1 },
];

const S7_ITEMS = [
  { id: 'd1', text: 'إِنَّمَا الْحَيَاةُ الدُّنْيَا\nلَعِبٌ وَلَهْوٌ',              zone: 'z1' },
  { id: 'd2', text: 'وَإِن تُؤْمِنُوا وَتَتَّقُوا\nيُؤْتِكُمْ أُجُورَكُمْ',        zone: 'z2' },
  { id: 'd3', text: 'إِن يَسْأَلْكُمُوهَا\nفَيُحْفِكُمْ تَبْخَلُوا',               zone: 'z3' },
  { id: 'd4', text: 'تُدْعَوْنَ لِتُنفِقُوا\nفِي سَبِيلِ اللَّهِ',                  zone: 'z4' },
];
const S7_ZONES = [
  { id: 'z1', desc: 'Only play and amusement — brief like a game (47:36)' },
  { id: 'z2', desc: 'He gives you your full rewards and does not ask you for your wealth (47:36)' },
  { id: 'z3', desc: 'You would be stingy and it would expose the miserliness in your heart (47:37)' },
  { id: 'z4', desc: 'Whoever withholds only withholds against himself — Allah is the Rich, you are the poor (47:38)' },
];

// S8: Verse-to-Theme — Final Warnings (47:22-38)
const S8_THEME_ITEMS = [
  {id:'t1', text:'أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا', zone:'z1'},
  {id:'t2', text:'فَهَلْ عَسَيْتُمْ إِن تَوَلَّيْتُمْ أَن تُفْسِدُوا فِي الْأَرْضِ', zone:'z2'},
  {id:'t3', text:'إِنَّ الَّذِينَ ارْتَدُّوا عَلَىٰ أَدْبَارِهِم مِّن بَعْدِ مَا تَبَيَّنَ لَهُمُ الْهُدَى', zone:'z3'},
  {id:'t4', text:'وَلَنَبْلُوَنَّكُمْ حَتَّىٰ نَعْلَمَ الْمُجَاهِدِينَ مِنكُمْ وَالصَّابِرِينَ', zone:'z4'},
  {id:'t5', text:'هَا أَنتُمْ هَٰؤُلَاءِ تُدْعَوْنَ لِتُنفِقُوا فِي سَبِيلِ اللَّهِ فَمِنكُم مَّن يَبْخَلُ', zone:'z5'},
];
const S8_THEME_ZONES = [
  {id:'z1', desc:'The Quran demands deep tadabbur — ignoring it places invisible locks on the heart (47:24)'},
  {id:'z2', desc:'Turning away from guidance leads to corruption — the first casualty is family ties (47:22)'},
  {id:'z3', desc:'Knowing the truth yet still choosing otherwise is the deepest spiritual danger (47:25)'},
  {id:'z4', desc:'Tests reveal who you truly are — patience and striving are the only proof of faith (47:31)'},
  {id:'z5', desc:'How you spend reveals your heart — stinginess toward Allah is stinginess against yourself (47:38)'},
];

// =============================================
//  SECTION WRAPPERS
// =============================================
function renderSection1Game() { renderQuiz(1, S1_QUIZ); }
function checkSection1()      { checkQuiz(1, S1_QUIZ); }
function renderSection2Game() {
  renderDragDrop(2, S2_ITEMS, S2_ZONES);
  _renderS2BonusQuiz();
}
// Section 2 dual-check: drag-drop AND bonus quiz must both pass
function checkSection2() {
  const dropZones = document.querySelectorAll('#drop-zones-2 .drop-zone');
  let ddOk = 0;
  dropZones.forEach(zone => {
    zone.classList.remove('correct','incorrect');
    const item = zone.querySelector('.drag-item');
    if (item && item.dataset.zone === zone.dataset.zoneId) { zone.classList.add('correct'); ddOk++; }
    else if (item) zone.classList.add('incorrect');
  });
  const ddFb = document.getElementById('feedback-2');
  if (ddOk === S2_ZONES.length) {
    ddFb.textContent = `🏆 All ${S2_ZONES.length} matched! MashAllah!`; ddFb.className = 'game-feedback success';
    window.state.s2DdChecked = true; saveProgress();
  } else if (ddOk >= S2_ZONES.length - 1) {
    ddFb.textContent = `✅ ${ddOk}/${S2_ZONES.length} — so close! Fix the red one.`; ddFb.className = 'game-feedback partial';
  } else {
    ddFb.textContent = `❌ ${ddOk}/${S2_ZONES.length} — re-read the story and try again.`; ddFb.className = 'game-feedback error';
  }
  // Bonus quiz check
  const ans = window.state.s2Answers || {};
  const fb2b = document.getElementById('feedback-2b');
  if (Object.keys(ans).length < S2_BONUS_QUIZ.length) {
    if (fb2b) { fb2b.textContent = '⚠️ Answer both reflection questions below too!'; fb2b.className = 'game-feedback partial'; }
    return;
  }
  let correct = 0;
  S2_BONUS_QUIZ.forEach((q, qi) => {
    const sel = ans[qi];
    document.querySelectorAll(`[data-section="2b"][data-qi="${qi}"]`).forEach((btn, oi) => {
      btn.disabled = true; btn.classList.remove('selected');
      if (oi === q.correct) btn.classList.add('correct'); else if (oi === sel) btn.classList.add('incorrect');
    });
    if (sel === q.correct) correct++;
  });
  if (fb2b) {
    if (correct === S2_BONUS_QUIZ.length) {
      fb2b.textContent = `✅ ${correct}/${S2_BONUS_QUIZ.length} — Spot on!`; fb2b.className = 'game-feedback success';
      window.state.s2QuizChecked = true; saveProgress();
      if (window.state.s2DdChecked) document.getElementById('complete-2-btn').style.display = 'inline-block';
    } else {
      fb2b.textContent = `❌ ${correct}/${S2_BONUS_QUIZ.length} — re-read and try again.`; fb2b.className = 'game-feedback error';
      window.state.s2Answers = {}; setTimeout(_renderS2BonusQuiz, 2500);
    }
  }
}
function _selectS2Bonus(qi, oi) {
  if (window.state.s2QuizChecked) return;
  document.querySelectorAll(`[data-section="2b"][data-qi="${qi}"]`).forEach(b => b.classList.remove('selected'));
  const btn = document.querySelector(`[data-section="2b"][data-qi="${qi}"][data-oi="${oi}"]`);
  if (btn) btn.classList.add('selected');
  if (!window.state.s2Answers) window.state.s2Answers = {};
  window.state.s2Answers[qi] = oi; saveProgress();
}
function _renderS2BonusQuiz() {
  const c = document.getElementById('quiz-2b'); if (!c) return; c.innerHTML = '';
  S2_BONUS_QUIZ.forEach((q, qi) => {
    const qEl = document.createElement('div'); qEl.className = 'quiz-question';
    qEl.innerHTML = `<div class="question-text"><span class="q-num">Q${qi+1}.</span>${q.q}</div><div class="options-grid" id="opts-2b-${qi}"></div>`;
    c.appendChild(qEl);
    q.opts.forEach((opt, oi) => {
      const btn = document.createElement('button'); btn.className = 'option-btn';
      btn.dataset.qi = qi; btn.dataset.oi = oi; btn.dataset.section = '2b';
      btn.textContent = opt;
      let _t = false;
      btn.addEventListener('touchend', (e) => { e.preventDefault(); _t = true; _selectS2Bonus(qi, oi); setTimeout(() => { _t = false; }, 500); }, { passive: false });
      btn.onclick = () => { if (_t) return; _selectS2Bonus(qi, oi); };
      qEl.querySelector(`#opts-2b-${qi}`).appendChild(btn);
    });
  });
  const ans = window.state.s2Answers || {};
  Object.entries(ans).forEach(([qi, oi]) => {
    const btn = document.querySelector(`[data-section="2b"][data-qi="${qi}"][data-oi="${oi}"]`);
    if (btn) btn.classList.add('selected');
  });
  if (window.state.s2Checked) document.getElementById('complete-2-btn').style.display = 'inline-block';
}
window.registerFillBlank(3, S3_FIB);
function renderSection4Game() { renderDragDrop(4, S4_ITEMS, S4_ZONES); }
function checkSection4()      { checkDragDrop(4, S4_ZONES); }
function renderSection5Game() { renderQuiz(5, S5_QUIZ); }
function checkSection5()      { checkQuiz(5, S5_QUIZ); }
function renderSection6Game() { renderQuiz(6, S6_QUIZ); }
function checkSection6()      { checkQuiz(6, S6_QUIZ); }
function renderSection7Game() { renderDragDrop(7, S7_ITEMS, S7_ZONES); }
function checkSection7()      { checkDragDrop(7, S7_ZONES); }
window.registerMatch(8, S8_THEME_ITEMS, S8_THEME_ZONES);

// =============================================
//  BATTLE BANNER WORLD BUILDER (surah-specific)
// =============================================
function _buildLabelMuhammad(ctx, W, msg, done, total) {
  ctx.fillStyle = '#a04050'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#160408'; ctx.fillRect(W / 2 - 100, 26, 200, 8);
  ctx.fillStyle = '#8a2030'; ctx.fillRect(W / 2 - 100, 26, Math.round(200 * done / total), 8);
  ctx.textAlign = 'left';
}
function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#060208'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 60; i++) {
    const sx=(i*7283)%W, sy=(i*5017)%185, br=Math.min(0.9,(n/4)*(0.4+(i%3)*0.25));
    ctx.fillStyle = `rgba(255,210,180,${br})`; ctx.fillRect(sx, sy, 1, 1);
  }
  if (n < 1) { _buildLabelMuhammad(ctx, W, '⚔️ Complete levels to raise the banner!', 0, 8); return; }
  ctx.fillStyle = '#2a1a06'; ctx.fillRect(0, 212, W, 38);
  if (n < 2) { _buildLabelMuhammad(ctx, W, '⚔️ Battlefield set — 1/8', 1, 8); return; }
  ctx.fillStyle = '#a08040'; ctx.fillRect(277, 32, 6, 180);
  if (n < 3) { _buildLabelMuhammad(ctx, W, '⚔️ Pole raised — 2/8', 2, 8); return; }
  const flagW = Math.min(210, 60 + (n-2)*50), flagY = 32, flagH = 114;
  ctx.fillStyle = '#14100c'; ctx.fillRect(283, flagY, flagW, flagH);
  if (n < 4) { _buildLabelMuhammad(ctx, W, '⚔️ Banner unfurling — 3/8', 3, 8); return; }
  if (n >= 5 && flagW > 100) {
    const fcx = 283+flagW*0.38, fcy = flagY+flagH*0.43;
    ctx.fillStyle = '#c8a010'; ctx.beginPath(); ctx.arc(fcx, fcy, 30, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#14100c'; ctx.beginPath(); ctx.arc(fcx+12, fcy-9, 23, 0, Math.PI*2); ctx.fill();
  }
  if (n >= 6 && flagW > 140) {
    const fsx = 283+flagW*0.65, fsy = flagY+flagH*0.37;
    ctx.fillStyle = '#c8a010'; ctx.beginPath(); ctx.moveTo(fsx, fsy-17);
    for (let si=0;si<5;si++){const a1=si*(Math.PI*2/5)-Math.PI/2,a2=a1+Math.PI/5;ctx.lineTo(fsx+Math.cos(a1)*17,fsy+Math.sin(a1)*17);ctx.lineTo(fsx+Math.cos(a2)*7,fsy+Math.sin(a2)*7);}
    ctx.closePath(); ctx.fill();
  }
  if (n >= 7 && flagW > 150) {
    ctx.fillStyle = '#c8a010'; ctx.font = '15px Amiri,serif'; ctx.textAlign = 'center';
    ctx.fillText('لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', 283+flagW*0.5, flagY+flagH*0.79); ctx.textAlign = 'left';
  }
  if (n >= 8) {
    const grd = ctx.createRadialGradient(280, 120, 20, 280, 120, 220);
    grd.addColorStop(0, 'rgba(255,140,0,0.28)'); grd.addColorStop(1, 'rgba(255,140,0,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = '9px "Press Start 2P",monospace'; ctx.textAlign = 'center';
    ctx.fillText('ALLAHU AKBAR! ⚔️ BANNER OF TRUTH RAISED!', W/2, 20); ctx.textAlign = 'left';
  } else { _buildLabelMuhammad(ctx, W, `Raising the banner — ${n}/8 levels`, n, 8); }
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
