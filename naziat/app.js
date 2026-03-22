'use strict';
/* ================================================
   SURAH AN-NAZI'AT — app.js  (data layer only)
   ================================================ */

window.STORAGE_KEY = 'naziatQuestSave';

window.state = window.buildDefaultState(8);

const REWARDS = {
  1: { xp: 60,  gems: 3, icon: '📖', title: 'Words Learned!',
       msg: 'MashAllah! You learned the key Arabic words of this surah!' },
  2: { xp: 80,  gems: 3, icon: '👼', title: 'THE FIVE ANGELS KNOWN!',
       msg: "SubhanAllah! Five types of angels — extractors, releasers, floaters, racers, administrators — all swearing oaths in Allah's name. There is a vast cosmic system running every moment that our eyes cannot see. On to the Day of Trembling!" },
  3: { xp: 90,  gems: 3, icon: '💓', title: 'THE DAY UNDERSTOOD!',
       msg: "Allahu Akbar! Two Blasts: al-Rajifa (the destroyer) and al-Radifa (the resurrecter). Hearts pound with fear. Eyes cast downward. The mockers will discover their error in an instant — 'a single shout and they are at the earth's surface.' SubhanAllah!" },
  4: { xp: 90,  gems: 3, icon: '🔥', title: 'HOLY VALLEY REACHED!',
       msg: "MashAllah! The sacred valley of Tuwa. Allah calls Moses personally. The mission: go to Pharaoh. And the message: not a threat first — but an invitation: 'Would you like to purify yourself?' This is how Allah invites: with mercy and tazkiyah before punishment. Beautiful!" },
  5: { xp: 100, gems: 4, icon: '⚡', title: "PHARAOH'S LESSON LEARNED!",
       msg: "SubhanAllah! Greatest signs shown. Pharaoh denied and disobeyed. Turned his back. Gathered his people. Proclaimed 'I am your most exalted lord!' — and Allah seized him as a punishment for both worlds. His body preserved as a sign for all of history. Never be like Pharaoh!" },
  6: { xp: 100, gems: 4, icon: '🌍', title: 'CREATION SIGNS SEEN!',
       msg: "MashAllah! 'Are you harder to create — or the entire sky?' Seven strong heavens built and proportioned. Day and night designed. Earth spread out (daha). Water and pastures brought forth. He who created all of THIS can easily recreate YOU. SubhanAllah!" },
  7: { xp: 120, gems: 5, icon: '⚖️', title: 'AT-TAMMAH MAPPED!',
       msg: "Allahu Akbar! The Greatest Overwhelming comes. Two paths, two eternal destinations. One: transgress + prefer dunya = Hellfire. Two: fear your Lord's standing + restrain your nafs = Paradise al-Ma'wa. The choice is made in this life. Choose wisely!" },
  8: { xp: 150, gems: 7, icon: '🏆', title: "SURAH AN-NAZI'AT COMPLETE!",
       msg: "ALLAHUMMA BARIK! All 8 levels of Surah An-Nazi'at — The Pullers — complete! 'Wa amma man khafa maqama Rabbihi wa naha al-nafsa 'an al-hawa — fa inna al-jannata hiya al-ma'wa.' For the one who feared standing before their Lord and restrained themselves: Paradise is their home. May we be among them. Ameen!" },
};

window.SURAH_CONFIG = {
  totalLevels: 8, wbwSection:1,
  rewards: REWARDS,
  tileIcons:['📖','👼','💓','🔥','⚡','🌍','⚖️','🏆'],
  tileLabels:['Word by Word','The Angels','Hearts Tremble','Holy Valley','Pharaoh','Creation Signs','At-Tammah','The Hour'],
  welcomeMsg: {
    fresh:    name => `As-salamu alaykum, ${name}! Surah An-Nazi'at — "The Pullers." Five cosmic angels. The trembling Day. Moses in the Holy Valley. Pharaoh's arrogance and downfall. Signs of creation. At-Tammah. And the Final Hour that only Allah knows. 8 levels await!`,
    partial:  (name, done) => `Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Wa amma man khafa maqama Rabbihi..." — Keep building the garden! 🌿`,
    complete: name => `MashAllah, ${name}! All 8 levels of An-Nazi'at complete! "Fa-inna al-jannata hiya al-ma'wa." May Allah make it our home. Ameen! 🏆`,
  },
};

// =============================================
//  GAME DATA
// =============================================

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'Verse 1-2 — وَالنَّازِعَاتِ غَرْقًا · وَالنَّاشِطَاتِ نَشْطًا', words:[
    {ar:'نَشْطًا', tr:'nashṭan', en:'briskly', freq:1},
    {ar:'وَالنَّاشِطَاتِ', tr:'wal-nāshiṭāt', en:'and those who draw out gently', freq:1},
    {ar:'غَرْقًا', tr:'gharqan', en:'violently', freq:1},
    {ar:'وَالنَّازِعَاتِ', tr:'wal-nāziʿāt', en:'by those who extract', freq:1},
  ]},
  {label:'Verse 40-41 — وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ · فَإِنَّ الْجَنَّةَ هِيَ الْمَأْوَىٰ', words:[
    {ar:'الْمَأْوَىٰ', tr:'al-maʾwā', en:'the refuge', freq:8},
    {ar:'الْجَنَّةَ', tr:'al-jannah', en:'Paradise', freq:66},
    {ar:'الْهَوَىٰ', tr:'al-hawā', en:'desire', freq:4},
    {ar:'النَّفْسَ', tr:'al-nafs', en:'the soul', freq:295},
    {ar:'وَنَهَى', tr:'wa-nahā', en:'and restrained', freq:7},
    {ar:'رَبِّهِ', tr:'rabbihi', en:'his Lord', freq:49},
    {ar:'مَقَامَ', tr:'maqāma', en:'the standing before', freq:5},
    {ar:'خَافَ', tr:'khāfa', en:'feared', freq:42},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

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
    opts: ['The trembling of human hearts specifically on Judgment Day',
           'The first Blast of the Horn that shatters the entire universe',
           'A massive earthquake that occurs just before Judgment Day',
           'The shaking of mountains as they are finally uprooted'],
    correct: 1 },
  { q: 'What does "Qulub yawma\'idhin wajifa" (79:8) mean?',
    opts: ['Hearts that Day will be singing and filled with great joy',
           'Hearts that Day will be pounding and trembling with fear',
           'Hearts that Day will finally be completely at rest',
           'Hearts that Day will be questioned about all their deeds'],
    correct: 1 },
  { q: 'What did the mockers say about resurrection in 79:10-11?',
    opts: ['"We will be resurrected as pure souls, without our bodies"',
           '"We believe in resurrection but not in the judgment after"',
           '"Are we really to be returned — even after we are decayed bones?!"',
           '"Let the Day come — we are not in the least afraid of it"'],
    correct: 2 },
  { q: 'How quickly does the resurrection happen according to 79:13-14?',
    opts: ['Over seven days, one region of earth at a time',
           'After 1000 years of cosmic preparation and rebuilding',
           'Gradually, over a long and extended period of time',
           'A single shout (zajra wahida) — instantly at the earth\'s surface'],
    correct: 3 },
];

const S4_FIB = [
  {verse:'إِذْ نَادَاهُ رَبُّهُ بِالْوَادِ الْمُقَدَّسِ _____', opts:['طُوًى','سِينَاءَ','بَكَّةَ','حِرَاءَ'], correct:0, ref:'79:16', translation:'When his Lord called to him in the sacred valley of Tuwa'},
  {verse:'اذْهَبْ إِلَىٰ _____ إِنَّهُ طَغَىٰ', opts:['فِرْعَوْنَ','قَارُونَ','هَامَانَ','أَبِي لَهَبٍ'], correct:0, ref:'79:17', translation:'Go to Pharaoh — indeed he has transgressed'},
  {verse:'فَقُلْ هَل لَّكَ إِلَىٰ أَن _____', opts:['تَزَكَّىٰ','تُسْلِمَ','تَتُوبَ','تُؤْمِنَ'], correct:0, ref:'79:18', translation:'And say: Would you like to purify yourself?'},
  {verse:'وَأَهْدِيَكَ إِلَىٰ رَبِّكَ _____', opts:['فَتَخْشَىٰ','فَتُحِبَّ','فَتَشْكُرَ','فَتَعْبُدَ'], correct:0, ref:'79:19', translation:'And I will guide you to your Lord so you may fear Him'},
  {verse:'فَأَرَاهُ الْآيَةَ _____', opts:['الْكُبْرَىٰ','الْعُظْمَىٰ','الصُّغْرَىٰ','الْأُولَىٰ'], correct:0, ref:'79:20', translation:'And he showed him the greatest sign'},
];

const S4_QUIZ = [
  { q: 'What was "al-aya al-kubra" (the greatest sign) shown to Pharaoh (79:20)?',
    opts: ['A book of golden scriptures presented by Moses',
           'The miraculous signs — the staff becoming a serpent, the shining hand',
           'The dramatic splitting of the Red Sea for all to witness',
           'A message written across the stars in the night sky'],
    correct: 1 },
  { q: 'How did Pharaoh respond to the greatest sign (79:21-22)?',
    opts: ['He respectfully asked Moses for more time to consider',
           'He was frightened and politely asked Moses to leave Egypt',
           'He called a council of his priests to carefully examine the signs',
           'He denied completely and disobeyed, then turned his back hastily'],
    correct: 3 },
  { q: 'What did Pharaoh proclaim to his gathered people (79:24)?',
    opts: ['"Moses is a great and dangerous magician — beware!"',
           '"Ana rabbukum al-A\'la!" — "I AM YOUR MOST EXALTED LORD!"',
           '"The ancient gods of Egypt alone are the true gods!"',
           '"Moses has deceived and misled all of you here!"'],
    correct: 1 },
  { q: 'What was Pharaoh\'s consequence according to 79:25?',
    opts: ['He was permanently exiled from all of Egypt',
           'He was struck blind as a divine warning and reminder',
           'His entire kingdom was handed over to Moses',
           'Allah seized him with the punishment of the Last and the First'],
    correct: 3 },
];

const S5_ITEMS = [
  { id: 'c1', text: 'بَنَاهَا ۝ رَفَعَ سَمْكَهَا\nفَسَوَّاهَا', zone: 'z1' },
  { id: 'c2', text: 'وَأَغْطَشَ لَيْلَهَا\nوَأَخْرَجَ ضُحَاهَا', zone: 'z2' },
  { id: 'c3', text: 'وَالْأَرْضَ بَعْدَ ذَٰلِكَ\nدَحَاهَا', zone: 'z3' },
  { id: 'c4', text: 'أَخْرَجَ مِنْهَا\nمَاءَهَا وَمَرْعَاهَا', zone: 'z4' },
];
const S5_ZONES = [
  { id: 'z1', desc: 'Are you harder to create, or the sky? He built it, raised its canopy, and proportioned it perfectly (79:27-28)' },
  { id: 'z2', desc: 'He darkened its night and extracted its brightness (79:29) — Night and day, both designed by Allah' },
  { id: 'z3', desc: 'And the earth after that He spread it out (79:30) — laid out as a habitable place' },
  { id: 'z4', desc: 'He brought forth from it its water and its pastures (79:31) — all provision for every creature' },
];

const S6_QUIZ = [
  { q: 'What does "Al-Tammah al-Kubra" (79:34) mean?',
    opts: ['The Day of Judgment that is only for the truly wicked',
           'A great earthquake that immediately precedes Judgment Day',
           'The moment when all the books of deeds are finally opened',
           'The Greatest Overwhelming — it overwhelms every disaster in history'],
    correct: 3 },
  { q: 'What happens regarding a man\'s deeds on that Day (79:35)?',
    opts: ['His deeds are carefully weighed by angels in complete secret',
           'That Day man will REMEMBER all he ever strove for — clarity',
           'His deeds are reviewed and shown exclusively to Allah alone',
           'His family members are called to testify about his deeds'],
    correct: 1 },
  { q: 'What are the TWO conditions for Paradise according to 79:40?',
    opts: ['Praying five times daily AND giving all required zakat',
           'Memorising the entire Quran AND fasting all of Ramadan',
           'Feared standing before Allah AND restrained the nafs from desire',
           'Being completely patient AND giving very generous charity'],
    correct: 2 },
  { q: 'What does "al-ma\'wa" mean for Paradise in verse 79:41?',
    opts: ['A temporary resting place enjoyed before moving further on',
           'A special level of Paradise reserved only for the prophets',
           'A garden that is occasionally visited as an earned reward',
           'Dwelling/refuge/permanent home — the true eternal home'],
    correct: 3 },
];

const S7_QUIZ = [
  { q: 'What does "Ila Rabbika muntahaha" (79:44) mean?',
    opts: ['To your Lord alone is the knowledge of its timing',
           'The Prophet ﷺ knows the answer but must keep it secret',
           'It will come after the Quran is memorised by all humanity',
           'The Hour comes exactly 1000 years after the Prophet ﷺ'],
    correct: 0 },
  { q: 'What is the Prophet\'s ﷺ actual role regarding the Hour (79:45)?',
    opts: ['To explain the exact signs and specific timing of the Hour',
           'To intercede with Allah so the Hour can be delayed',
           'To teach people specific methods to escape from that Day',
           'Only a Warner for those who fear it — not to give its timing'],
    correct: 3 },
  { q: 'What does "Fima anta min dhikriha" (79:43) mean?',
    opts: ['You should remember the Hour during each of your prayers',
           '"What do you have to do with mentioning it?" — its timing is beyond him',
           'You must warn specifically about the Hour every single day',
           'You know details about the Hour from your direct revelation'],
    correct: 1 },
  { q: 'What does the final verse (79:46) say about this world?',
    opts: ['They will wish they had been given more time in the world',
           'They will understand every single detail of their past life',
           'They will feel the world lasted exactly as it did in length',
           'An entire lifetime will feel like just one evening or morning'],
    correct: 3 },
];

// =============================================
// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerMatch(2, S1_ITEMS, S1_ZONES);
window.registerQuiz(3, S2_QUIZ);
window.registerFillBlank(4, S4_FIB);
window.registerQuiz(5, S4_QUIZ);
window.registerMatch(6, S5_ITEMS, S5_ZONES);
window.registerQuiz(7, S6_QUIZ);
window.registerQuiz(8, S7_QUIZ);
// =============================================

// =============================================
//  GARDEN OF AL-MA'WA — WORLD BUILDER CANVAS
// =============================================
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
  if (n<1) { _buildLabel(ctx,W,"🌿 Complete levels to build the Garden of Al-Ma'wa!",0,7); return; }
  ctx.fillStyle='#183a10'; ctx.fillRect(0,195,W,55);
  ctx.fillStyle='#204810'; ctx.fillRect(0,195,W,5);
  for (let gx=5; gx<W-5; gx+=12) { ctx.fillStyle='#2a5c18'; ctx.fillRect(gx,192,3,7+(gx%5)); }
  if (n<2) { _buildLabel(ctx,W,"🌱 Earth of Al-Ma'wa laid — 1/7",1,7); return; }
  ctx.fillStyle='#d8d0b0'; ctx.fillRect(220,185,120,65);
  ctx.strokeStyle='#b0a888'; ctx.lineWidth=1;
  for (let px=225; px<340; px+=20) { ctx.beginPath(); ctx.moveTo(px,185); ctx.lineTo(px,250); ctx.stroke(); }
  for (let py=190; py<250; py+=15) { ctx.beginPath(); ctx.moveTo(220,py); ctx.lineTo(340,py); ctx.stroke(); }
  if (n<3) { _buildLabel(ctx,W,"🛤️ Path of return laid — 2/7",2,7); return; }
  if (n>=3) {
    ctx.fillStyle='#4a2808'; ctx.fillRect(110,140,14,55);
    ctx.fillStyle='#1c5012'; ctx.beginPath(); ctx.arc(117,125,32,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#287018'; ctx.beginPath(); ctx.arc(117,118,24,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#e03030';
    [[104,118],[126,112],[110,130],[130,124]].forEach(([fx,fy])=>{ ctx.beginPath(); ctx.arc(fx,fy,5,0,Math.PI*2); ctx.fill(); });
  }
  if (n<4) { _buildLabel(ctx,W,"🌳 First fruit tree planted — 3/7",3,7); return; }
  if (n>=4) {
    ctx.fillStyle='#4a2808'; ctx.fillRect(436,142,14,53);
    ctx.fillStyle='#1c5012'; ctx.beginPath(); ctx.arc(443,127,30,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#287018'; ctx.beginPath(); ctx.arc(443,120,22,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#d04020';
    [[432,120],[452,115],[436,132],[454,128]].forEach(([fx,fy])=>{ ctx.beginPath(); ctx.arc(fx,fy,5,0,Math.PI*2); ctx.fill(); });
  }
  if (n<5) { _buildLabel(ctx,W,"🌳 Second fruit tree planted — 4/7",4,7); return; }
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
  if (n<6) { _buildLabel(ctx,W,"💧 River of paradise flows — 5/7",5,7); return; }
  if (n>=6) {
    ctx.fillStyle='#c8e8a0';
    [[100,60],[150,45],[200,68],[380,55],[430,40],[490,65]].forEach(([bx,by])=>{
      ctx.beginPath(); ctx.moveTo(bx-8,by); ctx.quadraticCurveTo(bx-4,by-6,bx,by);
      ctx.quadraticCurveTo(bx+4,by-6,bx+8,by); ctx.stroke();
      ctx.fillStyle='#a8c880'; ctx.fillRect(bx-1,by-1,3,3);
    });
  }
  if (n<7) { _buildLabel(ctx,W,"🐦 Birds fill the garden — 6/7",6,7); return; }
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
