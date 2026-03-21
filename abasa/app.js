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
  1:{xp:60, gems:3, icon:'📖', title:'Words Learned!',
     msg:'MashAllah! You learned the key Arabic words of this surah!'},
  1: { xp: 80,  gems: 3, icon: '🙈', title: 'THE LESSON OF THE BLIND MAN!',
       msg: "SubhanAllah! The Prophet ﷺ turned away from Abdullah ibn Umm Maktum — and Allah gently corrected him. Not a harsh rebuke, but a divine lesson: the one who comes EAGERLY to learn matters more than the indifferent powerful. 'Wa amma man ja\'aka yas\'a wa huwa yakhsha — fa anta anhu talahhha.' Don't be distracted from those who truly seek Allah!" },
  2: { xp: 80,  gems: 3, icon: '📜', title: 'THE NOBLE QURAN UNDERSTOOD!',
       msg: "Allahu Akbar! 'Kalla — inna-ha tadhkirah!' No! Indeed these verses are a Reminder! The Quran is carried by noble, pure, honoured angels. It is written on exalted sheets. It is available to everyone who WANTS it — 'fa man sha\'a dhakarahu.' The Quran is not desperate for you. But your heart desperately needs it!" },
  3: { xp: 90,  gems: 3, icon: '🌱', title: 'CREATION STAGES KNOWN!',
       msg: "MashAllah! 'Qutila al-insan — ma akfarahu!' Destroyed is man — how ungrateful he is! Created from a drop. Formed and proportioned perfectly. Shown the path. Given life. Then death and a grave. Then resurrection when Allah wills. Allah lists five stages of your existence — and still we deny? SubhanAllah!" },
  4: { xp: 90,  gems: 4, icon: '🌾', title: 'THE GARDEN OF PROVISION SEEN!',
       msg: "SubhanAllah! 'Fal-yandhur al-insan ila ta\'amihi' — Let man LOOK at his food! Water poured from the sky. Earth split open. Grain, grapes, greens, olives, palms — seven types of food named by Allah Himself. Every single meal is a series of miracles. Next time you eat, say Bismillah and remember: ALLAH fed you this!" },
  5: { xp: 100, gems: 4, icon: '💥', title: 'THE DEAFENING BLAST MAPPED!',
       msg: "Allahu Akbar! Al-Sakhkhah — The Deafening Blast — overwhelms everything. That Day, brother flees from brother. Mother from child. Wife from husband. Not from cruelty — but because 'li kulli imri\'in minhum yawma\'idhin sha\'nun yughniyhi' — every soul is CONSUMED by their own account. Are you prepared for that Day?" },
  6: { xp: 120, gems: 5, icon: '✨', title: 'SURAH ABASA COMPLETE!',
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
  {label:'Verse 1-2 — عَبَسَ وَتَوَلَّىٰ · أَن جَاءَهُ الْأَعْمَىٰ', words:[
    {ar:'الْأَعْمَىٰ', tr:'al-aʿmā', en:'the blind man', freq:8},
    {ar:'جَاءَهُ', tr:'jāʾahu', en:'came to him', freq:130},
    {ar:'أَن', tr:'an', en:'because', freq:1000},
    {ar:'وَتَوَلَّىٰ', tr:'wa-tawallā', en:'and turned away', freq:15},
    {ar:'عَبَسَ', tr:'ʿabasa', en:'he frowned', freq:1},
  ]},
  {label:'Verse 24 — فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ', words:[
    {ar:'طَعَامِهِ', tr:'ṭaʿāmihi', en:'his food', freq:48},
    {ar:'إِلَىٰ', tr:'ilā', en:'at', freq:189},
    {ar:'الْإِنسَانُ', tr:'al-insān', en:'man', freq:65},
    {ar:'فَلْيَنظُرِ', tr:'fal-yanẓur', en:'let him look', freq:33},
  ]},
];

const S1_MATCH_ITEMS = [
  {id:'w1', text:'الْأَعْمَىٰ', zone:'wz1'},
  {id:'w2', text:'جَاءَهُ', zone:'wz2'},
  {id:'w3', text:'أَن', zone:'wz3'},
  {id:'w4', text:'وَتَوَلَّىٰ', zone:'wz4'},
  {id:'w5', text:'عَبَسَ', zone:'wz5'},
  {id:'w6', text:'طَعَامِهِ', zone:'wz6'}
];
const S1_MATCH_ZONES = [
  {id:'wz1', desc:'the blind man'},
  {id:'wz2', desc:'came to him'},
  {id:'wz3', desc:'because'},
  {id:'wz4', desc:'and turned away'},
  {id:'wz5', desc:'he frowned'},
  {id:'wz6', desc:'his food'}
];
window.setupWBWLevel(WBW_DATA, S1_MATCH_ITEMS, S1_MATCH_ZONES);


const S1_ITEMS = [
  { id: 'i1', text: '👁️ Abdullah ibn\nUmm Maktum',  zone: 'z1' },
  { id: 'i2', text: '👑 The Quraysh\nLeaders',        zone: 'z2' },
  { id: 'i3', text: '🙈 He frowned\nand turned away', zone: 'z3' },
  { id: 'i4', text: '🌟 Perhaps he\nwill be purified', zone: 'z4' },
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
  { id: 'f1', text: '🌧️ Water poured\nfrom the sky',    zone: 'z1' },
  { id: 'f2', text: '🌍 Earth split\nopen',              zone: 'z2' },
  { id: 'f3', text: '🌾 حَبًّا — Grain\n& cereals',       zone: 'z3' },
  { id: 'f4', text: '🍇 عِنَبًا — Grapes\n& 🥬 Greens',    zone: 'z4' },
  { id: 'f5', text: '🫒 زَيْتُونًا —\nOlive & 🌴 Palm',    zone: 'z5' },
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
