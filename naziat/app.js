'use strict';
/* ================================================
   SURAH AN-NAZI'AT — app.js  (data layer only)
   ================================================ */

window.STORAGE_KEY = 'naziatQuestSave';

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Checked: false,
  s2Answers: {}, s2Checked: false,
  s3Order:   [], s3Checked: false,
  s4Answers: {}, s4Checked: false,
  s5Checked: false,
  s6Answers: {}, s6Checked: false,
  s7Answers: {}, s7Checked: false,
};

const REWARDS = {
  1: { xp: 80,  gems: 3, icon: '👼', title: 'THE FIVE ANGELS KNOWN!',
       msg: "SubhanAllah! Five types of angels — extractors, releasers, floaters, racers, administrators — all swearing oaths in Allah's name. There is a vast cosmic system running every moment that our eyes cannot see. On to the Day of Trembling!" },
  2: { xp: 90,  gems: 3, icon: '💓', title: 'THE DAY UNDERSTOOD!',
       msg: "Allahu Akbar! Two Blasts: al-Rajifa (the destroyer) and al-Radifa (the resurrecter). Hearts pound with fear. Eyes cast downward. The mockers will discover their error in an instant — 'a single shout and they are at the earth's surface.' SubhanAllah!" },
  3: { xp: 90,  gems: 3, icon: '🔥', title: 'HOLY VALLEY REACHED!',
       msg: "MashAllah! The sacred valley of Tuwa. Allah calls Moses personally. The mission: go to Pharaoh. And the message: not a threat first — but an invitation: 'Would you like to purify yourself?' This is how Allah invites: with mercy and tazkiyah before punishment. Beautiful!" },
  4: { xp: 100, gems: 4, icon: '⚡', title: "PHARAOH'S LESSON LEARNED!",
       msg: "SubhanAllah! Greatest signs shown. Pharaoh denied and disobeyed. Turned his back. Gathered his people. Proclaimed 'I am your most exalted lord!' — and Allah seized him as a punishment for both worlds. His body preserved as a sign for all of history. Never be like Pharaoh!" },
  5: { xp: 100, gems: 4, icon: '🌍', title: 'CREATION SIGNS SEEN!',
       msg: "MashAllah! 'Are you harder to create — or the entire sky?' Seven strong heavens built and proportioned. Day and night designed. Earth spread out (daha). Water and pastures brought forth. He who created all of THIS can easily recreate YOU. SubhanAllah!" },
  6: { xp: 120, gems: 5, icon: '⚖️', title: 'AT-TAMMAH MAPPED!',
       msg: "Allahu Akbar! The Greatest Overwhelming comes. Two paths, two eternal destinations. One: transgress + prefer dunya = Hellfire. Two: fear your Lord's standing + restrain your nafs = Paradise al-Ma'wa. The choice is made in this life. Choose wisely!" },
  7: { xp: 150, gems: 7, icon: '🏆', title: "SURAH AN-NAZI'AT COMPLETE!",
       msg: "ALLAHUMMA BARIK! All 7 levels of Surah An-Nazi'at — The Pullers — complete! 'Wa amma man khafa maqama Rabbihi wa naha al-nafsa 'an al-hawa — fa inna al-jannata hiya al-ma'wa.' For the one who feared standing before their Lord and restrained themselves: Paradise is their home. May we be among them. Ameen!" },
};

window.SURAH_CONFIG = {
  totalLevels: 7,
  rewards: REWARDS,
  tileIcons:  ['👼','💓','🔥','⚡','🌍','⚖️','🏆'],
  tileLabels: ['The Angels','Hearts Tremble','Holy Valley','Pharaoh','Creation Signs','At-Tammah','The Hour'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Surah An-Nazi'at — "The Pullers." Five cosmic angels. The trembling Day. Moses in the Holy Valley. Pharaoh's arrogance and downfall. Signs of creation. At-Tammah. And the Final Hour that only Allah knows. 7 levels await!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Wa amma man khafa maqama Rabbihi..." — Keep building the garden! 🌿`,
    complete: name => `MashAllah, ${name}! All 7 levels of An-Nazi'at complete! "Fa-inna al-jannata hiya al-ma'wa." May Allah make it our home. Ameen! 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

const S1_ITEMS = [
  { id: 'a1', text: "🪝 Al-Nazi'at\n(The Extractors)",  zone: 'z1' },
  { id: 'a2', text: "🕊️ Al-Nashitat\n(The Releasers)",  zone: 'z2' },
  { id: 'a3', text: "☁️ Al-Sabihat\n(The Floaters)",    zone: 'z3' },
  { id: 'a4', text: "🏃 Al-Sabiqat\n(The Racers)",      zone: 'z4' },
  { id: 'a5', text: "📋 Al-Mudabbirat\n(The Admins)",   zone: 'z5' },
];
const S1_ZONES = [
  { id: 'z1', desc: '"By those who extract with violent force (gharqa)" (79:1) — Angels who pull out wicked souls forcefully, like iron hooks ripping through water.' },
  { id: 'z2', desc: '"And those who remove with ease (nashtan)" (79:2) — Angels who draw out righteous souls gently, like a pearl sliding off smooth silk.' },
  { id: 'z3', desc: '"And those who float/swim freely through the heavens (sabhan)" (79:3) — Angels gliding through the heavens executing Allah\'s commands.' },
  { id: 'z4', desc: '"And those who race ahead (sabqan)" (79:4) — Angels who race at extraordinary speed to execute divine decrees.' },
  { id: 'z5', desc: '"And those who administer the divine matters (amran)" (79:5) — Angels who manage the entire cosmic program: weather, provisions, souls, and all creation.' },
];

const S2_QUIZ = [
  { q: 'What is "Al-Rajifa" (the trembling one) in 79:6-7?',
    opts: ['The trembling of human hearts on Judgment Day', 'The first Blast of the Horn (Soor) that shatters and destroys the entire universe', 'An earthquake before the Day of Judgment', 'The shaking of mountains'],
    correct: 1 },
  { q: 'What does "Qulub yawma\'idhin wajifa" (79:8) mean?',
    opts: ['Hearts that Day will be singing with joy', '"Hearts that Day will be pounding and trembling with violent fear"', 'Hearts that Day will be at rest', 'Hearts that Day will be asked about their deeds'],
    correct: 1 },
  { q: 'What did the mockers say about resurrection in 79:10-11?',
    opts: ['"We will be resurrected as pure souls, not bodies"', '"Are we really going to be returned to our original state? Even after we are decayed bones?!"', '"We believe in resurrection but not in judgment"', '"Let the Day come — we are not afraid"'],
    correct: 1 },
  { q: 'How quickly does the resurrection happen according to 79:13-14?',
    opts: ['Over seven days, one region at a time', '"A single shout (zajra wahida) — and behold, they are at the surface of the earth." Instantaneous!', 'After 1000 years of preparation', 'Gradually over a period of time'],
    correct: 1 },
];

const S3_EVENTS_CORRECT = [
  { id: 'e1', text: '🌄 Allah calls to Moses from the sacred, holy valley of Tuwa on the slopes of Mount Sinai (79:16)' },
  { id: 'e2', text: '📢 Allah commands: "Go to Pharaoh — indeed he has transgressed (tagha) all limits!" (79:17)' },
  { id: 'e3', text: '🕊️ The message to deliver: "Would you like to purify yourself (tazakka)?" — an invitation to tazkiyah, not a threat (79:18)' },
  { id: 'e4', text: '✨ "And I will guide you to your Lord, so you may fear [Him]." — Allah offers His own guidance (79:19)' },
];
window._S3_EVENTS = S3_EVENTS_CORRECT;

const S4_QUIZ = [
  { q: 'What was "al-aya al-kubra" (the greatest sign) that Moses showed Pharaoh (79:20)?',
    opts: ['A book of scriptures written in gold', 'The miraculous signs given by Allah — including the staff becoming a serpent and the shining hand', 'The splitting of the Red Sea', 'A message written in the stars'],
    correct: 1 },
  { q: 'How did Pharaoh respond to the greatest sign (79:21-22)?',
    opts: ['He asked for more time to think about it', '"He denied completely (kadhdhaba) and disobeyed, then turned his back hastily — almost running away"', 'He was frightened and asked Moses to leave', 'He called a council of his priests to examine the signs'],
    correct: 1 },
  { q: 'What did Pharaoh proclaim to his gathered people (79:24)?',
    opts: ['"Moses is a great magician — beware of him!"', '"Ana rabbukum al-A\'la!" — "I AM YOUR MOST EXALTED LORD!" — claiming divinity', '"The gods of Egypt are the true gods!"', '"Moses has deceived you all"'],
    correct: 1 },
  { q: 'What was Pharaoh\'s consequence according to 79:25?',
    opts: ['He was exiled from Egypt forever', '"Allah seized him with the punishment (nakal) of the Last and the First" — he was drowned and destroyed', 'He was struck blind as a warning', 'His kingdom was given to Moses'],
    correct: 1 },
];

const S5_ITEMS = [
  { id: 'c1', text: '🌌 Sky built,\nraised & proportioned', zone: 'z1' },
  { id: 'c2', text: '🌙 Night darkened /\nDay\'s light extracted', zone: 'z2' },
  { id: 'c3', text: '🌍 Earth spread\nout (daha)',           zone: 'z3' },
  { id: 'c4', text: '💧 Water &\npastures brought forth',   zone: 'z4' },
];
const S5_ZONES = [
  { id: 'z1', desc: '"Are you harder to create — or the sky? He built it (bana-ha). He raised its canopy (rafa\'a samkaha) and proportioned it perfectly." (79:27-28) — Seven firm, perfect heavens above us.' },
  { id: 'z2', desc: '"He darkened its night (aghtasha layla-ha) and extracted its brightness (akhraja duha-ha)." (79:29) — Night and day: both designed by Allah for your benefit.' },
  { id: 'z3', desc: '"And the earth after that He spread out (daha-ha)." (79:30) — The earth laid out as a habitable place. "Daha" relates to an egg-shape — the earth is spherical!' },
  { id: 'z4', desc: '"He brought forth from it its water (ma\'aha) and its pastures (mar\'aha)." (79:31) — All rivers, wells, rainfall, and every green plant for every creature.' },
];

const S6_QUIZ = [
  { q: 'What does "Al-Tammah al-Kubra" (79:34) mean and why is it called that?',
    opts: ['The Day of Judgment only for the wicked', '"The Greatest Catastrophe/Overwhelming" — from \'amma\' (to overwhelm/drown). It overwhelms every other disaster in all of history', 'A great earthquake before the Day of Judgment', 'The moment when all books are opened'],
    correct: 1 },
  { q: 'What happens on that Day regarding a man\'s deeds (79:35)?',
    opts: ['His deeds are weighed by angels in secret', '"That Day man will remember all he strove for (ma sa\'a)" — every choice, every priority, every ignored warning becomes clear', 'His deeds are shown only to Allah', 'His family members testify about his deeds'],
    correct: 1 },
  { q: 'What are the TWO conditions a person must meet for Paradise (79:40)?',
    opts: ['Praying five times daily and giving zakat', '"Feared the standing (maqam) before their Lord" AND "restrained the nafs from hawa (desire/ego)"', 'Memorizing the Quran and fasting all of Ramadan', 'Being patient and giving lots of charity'],
    correct: 1 },
  { q: 'What does "al-ma\'wa" mean for Paradise in verse 79:41?',
    opts: ['A temporary resting place before moving on', '"Dwelling / refuge / permanent home" — al-Jannah as the true, eternal home for those who feared their Lord', 'A special level of Paradise only for prophets', 'A garden visited occasionally as a reward'],
    correct: 1 },
];

const S7_QUIZ = [
  { q: 'What does "Ila Rabbika muntahaha" (79:44) mean?',
    opts: ['The Prophet ﷺ knows the answer but must keep it secret', '"To your Lord alone is its ultimate limit and knowledge" — NO ONE knows except Allah, not even angels or prophets', 'It will come after the Quran is fully memorized worldwide', 'The Hour will come exactly 1000 years after the Prophet ﷺ'],
    correct: 1 },
  { q: 'What is the Prophet\'s ﷺ actual role regarding the Hour (79:45)?',
    opts: ['To explain the exact signs and timing of the Hour', '"Innama anta mundhiru man yakhshaha" — only a Warner for those who FEAR it — not to give its timing', 'To intercede with Allah to delay the Hour', 'To teach people how to escape from the Day'],
    correct: 1 },
  { q: 'What does "Fima anta min dhikriha" (79:43) mean?',
    opts: ['You should remember the Hour in every prayer', '"What do you have to do with mentioning it?" — a gentle rebuke: knowing its timing is beyond the Prophet\'s ﷺ rank', 'You must warn about the Hour every day', 'You know about the Hour from direct revelation'],
    correct: 1 },
  { q: 'What does the final verse (79:46) say about this world?',
    opts: ['They will wish they had lived longer in this world', '"On the Day they see it, as though they had not remained except an evening or its morning" — an entire lifetime feels like one afternoon', 'They will understand every detail of their life perfectly', 'They will feel the world lasted exactly as long as it did'],
    correct: 1 },
];

// =============================================
//  SECTION WRAPPERS
// =============================================
function renderSection1Game() { renderDragDrop(1, S1_ITEMS, S1_ZONES); }
function checkSection1()      { checkDragDrop(1, S1_ZONES); }
function renderSection2Game() { renderQuiz(2, S2_QUIZ); }
function checkSection2()      { checkQuiz(2, S2_QUIZ); }
function renderSection3Game() { renderStoryOrder(3, S3_EVENTS_CORRECT); }
function checkSection3()      { checkStoryOrder(3, S3_EVENTS_CORRECT); }
function renderSection4Game() { renderQuiz(4, S4_QUIZ); }
function checkSection4()      { checkQuiz(4, S4_QUIZ); }
function renderSection5Game() { renderDragDrop(5, S5_ITEMS, S5_ZONES); }
function checkSection5()      { checkDragDrop(5, S5_ZONES); }
function renderSection6Game() { renderQuiz(6, S6_QUIZ); }
function checkSection6()      { checkQuiz(6, S6_QUIZ); }
function renderSection7Game() { renderQuiz(7, S7_QUIZ); }
function checkSection7()      { checkQuiz(7, S7_QUIZ); }

// =============================================
//  GARDEN OF AL-MA'WA — WORLD BUILDER CANVAS
// =============================================
function _buildLabelNaziat(ctx, W, msg, done, total) {
  ctx.fillStyle = '#2a9060'; ctx.font = '7px "Press Start 2P",monospace'; ctx.textAlign = 'center';
  ctx.fillText(msg, W / 2, 18);
  ctx.fillStyle = '#041408'; ctx.fillRect(W/2-100, 26, 200, 8);
  ctx.fillStyle = '#1a6040'; ctx.fillRect(W/2-100, 26, Math.round(200*done/total), 8);
  ctx.textAlign = 'left';
}
function _drawBuildCanvas(n) {
  const c = document.getElementById('build-canvas'); if (!c) return;
  const ctx = c.getContext('2d'), W = 560, H = 250;
  ctx.clearRect(0, 0, W, H);
  if (n >= 7) {
    const sk = ctx.createLinearGradient(0,0,0,H);
    sk.addColorStop(0,'#0a2840'); sk.addColorStop(0.4,'#184820'); sk.addColorStop(1,'#206030');
    ctx.fillStyle=sk; ctx.fillRect(0,0,W,H);
  } else {
    const sk = ctx.createLinearGradient(0,0,0,H);
    sk.addColorStop(0,'#020e08'); sk.addColorStop(1,'#061808');
    ctx.fillStyle=sk; ctx.fillRect(0,0,W,H);
  }
  for (let i=0; i<35; i++) {
    const sx=(i*7123)%W, sy=(i*4419)%(H*0.45);
    ctx.fillStyle=`rgba(220,240,200,${0.2+(i%3)*0.15})`; ctx.fillRect(sx,sy,1,1);
  }
  if (n<1) { _buildLabelNaziat(ctx,W,"🌿 Complete levels to build the Garden of Al-Ma'wa!",0,7); return; }
  ctx.fillStyle='#183a10'; ctx.fillRect(0,195,W,55);
  ctx.fillStyle='#204810'; ctx.fillRect(0,195,W,5);
  for (let gx=5; gx<W-5; gx+=12) { ctx.fillStyle='#2a5c18'; ctx.fillRect(gx,192,3,7+(gx%5)); }
  if (n<2) { _buildLabelNaziat(ctx,W,"🌱 Earth of Al-Ma'wa laid — 1/7",1,7); return; }
  ctx.fillStyle='#d8d0b0'; ctx.fillRect(220,185,120,65);
  ctx.strokeStyle='#b0a888'; ctx.lineWidth=1;
  for (let px=225; px<340; px+=20) { ctx.beginPath(); ctx.moveTo(px,185); ctx.lineTo(px,250); ctx.stroke(); }
  for (let py=190; py<250; py+=15) { ctx.beginPath(); ctx.moveTo(220,py); ctx.lineTo(340,py); ctx.stroke(); }
  if (n<3) { _buildLabelNaziat(ctx,W,"🛤️ Path of return laid — 2/7",2,7); return; }
  if (n>=3) {
    ctx.fillStyle='#4a2808'; ctx.fillRect(110,140,14,55);
    ctx.fillStyle='#1c5012'; ctx.beginPath(); ctx.arc(117,125,32,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#287018'; ctx.beginPath(); ctx.arc(117,118,24,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#e03030';
    [[104,118],[126,112],[110,130],[130,124]].forEach(([fx,fy])=>{ ctx.beginPath(); ctx.arc(fx,fy,5,0,Math.PI*2); ctx.fill(); });
  }
  if (n<4) { _buildLabelNaziat(ctx,W,"🌳 First fruit tree planted — 3/7",3,7); return; }
  if (n>=4) {
    ctx.fillStyle='#4a2808'; ctx.fillRect(436,142,14,53);
    ctx.fillStyle='#1c5012'; ctx.beginPath(); ctx.arc(443,127,30,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#287018'; ctx.beginPath(); ctx.arc(443,120,22,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#d04020';
    [[432,120],[452,115],[436,132],[454,128]].forEach(([fx,fy])=>{ ctx.beginPath(); ctx.arc(fx,fy,5,0,Math.PI*2); ctx.fill(); });
  }
  if (n<5) { _buildLabelNaziat(ctx,W,"🌳 Second fruit tree planted — 4/7",4,7); return; }
  if (n>=5) {
    ctx.fillStyle='#1840a0'; ctx.fillRect(30,182,500,14);
    ctx.fillStyle='rgba(60,140,240,0.55)'; ctx.fillRect(30,182,500,6);
    ctx.fillStyle='#2050c0'; ctx.beginPath(); ctx.arc(280,180,20,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#6090e8'; ctx.beginPath(); ctx.arc(280,170,6,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(120,180,255,0.7)'; ctx.lineWidth=2;
    for (let a=0; a<6; a++) {
      const ang=-Math.PI/2+(a-2.5)*0.4;
      ctx.beginPath(); ctx.moveTo(280,170); ctx.lineTo(280+Math.cos(ang)*18,170+Math.sin(ang)*18); ctx.stroke();
    }
  }
  if (n<6) { _buildLabelNaziat(ctx,W,"💧 River of paradise flows — 5/7",5,7); return; }
  if (n>=6) {
    ctx.fillStyle='#c8e8a0';
    [[100,60],[150,45],[200,68],[380,55],[430,40],[490,65]].forEach(([bx,by])=>{
      ctx.beginPath(); ctx.moveTo(bx-8,by); ctx.quadraticCurveTo(bx-4,by-6,bx,by);
      ctx.quadraticCurveTo(bx+4,by-6,bx+8,by); ctx.stroke();
      ctx.fillStyle='#a8c880'; ctx.fillRect(bx-1,by-1,3,3);
    });
  }
  if (n<7) { _buildLabelNaziat(ctx,W,"🐦 Birds fill the garden — 6/7",6,7); return; }
  ctx.fillStyle='#c8a840'; ctx.fillRect(210,85,36,112);
  ctx.fillStyle='#d8b850'; ctx.fillRect(210,85,36,6); ctx.fillRect(206,80,44,10);
  ctx.fillStyle='#c8a840'; ctx.fillRect(314,85,36,112);
  ctx.fillStyle='#d8b850'; ctx.fillRect(314,85,36,6); ctx.fillRect(310,80,44,10);
  ctx.strokeStyle='#ffd700'; ctx.lineWidth=8;
  ctx.beginPath(); ctx.arc(280,88,70,Math.PI,0,false); ctx.stroke();
  ctx.strokeStyle='#c8a020'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.arc(280,88,70,Math.PI,0,false); ctx.stroke();
  ctx.fillStyle='#ffd700'; ctx.beginPath(); ctx.arc(280,18,12,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#e8b820'; ctx.beginPath(); ctx.arc(280,18,6,0,Math.PI*2); ctx.fill();
  const lg = ctx.createRadialGradient(280,88,0,280,88,160);
  lg.addColorStop(0,'rgba(255,220,60,0.5)'); lg.addColorStop(0.5,'rgba(255,200,40,0.2)'); lg.addColorStop(1,'rgba(255,180,20,0)');
  ctx.fillStyle=lg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#ffd700'; ctx.font='8px "Press Start 2P",monospace'; ctx.textAlign='center';
  ctx.fillText("ALLAHUMMA BARIK! 🌿 AL-MA'WA COMPLETE!",W/2,22);
  ctx.font='7px "Press Start 2P",monospace';
  ctx.fillText('"Inna al-jannata hiya al-ma\'wa" — 79:41',W/2,38); ctx.textAlign='left';
}
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
