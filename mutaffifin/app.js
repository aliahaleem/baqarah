'use strict';
/* SURAH AL-MUTAFFIFIN (83) — app.js */
window.STORAGE_KEY='mutaffifinQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s1Answers:{},s1Checked:false,s2Checked:false,s3Checked:false,s4Answers:{},s4Checked:false,s5Answers:{},s5Checked:false,s6Answers:{},s6Checked:false};

const REWARDS={
  1:{xp:80,gems:3,icon:'⚖️',title:'THE DEFRAUDERS EXPOSED!',msg:"SubhanAllah! 'Waylun lil-mutaffifin!' Woe to those who take full measure for themselves but give less to others. This surah was revealed to fix an economic injustice. The lesson? Every transaction — with people, with time, with effort — should be honest. What you expect from others, give to them too."},
  2:{xp:80,gems:3,icon:'📕',title:'SIJJIN MAPPED!',msg:"Allahu Akbar! The record of the wicked is in Sijjin — the lowest, most confining place. 'Kitab marqum' — a clearly inscribed, sealed record. The deeds of the Fujjar are filed away in the most degraded place in existence. Contrast this with the record of the Abrar — filed in Illiyyin above!"},
  3:{xp:90,gems:3,icon:'📗',title:'ILLIYYIN REACHED!',msg:"MashAllah! The record of the righteous is in Illiyyin — the highest, most elevated register. Witnessed by the Muqarrabun — angels closest to Allah! Your good deeds are preserved in the most honoured location in all of creation. Let this motivate you to add more good deeds to that register today!"},
  4:{xp:90,gems:4,icon:'🌿',title:'THE RIGHTEOUS IN BLISS!',msg:"SubhanAllah! Reclining on couches. 'Nahrat al-na\'im' — the RADIANCE of bliss on their faces. And 'rahiq makhtum' — sealed pure nectar, whose seal is MUSK. 'Wa fi dhalika fal-yatanafas al-mutanafisun' — For THIS, let those who want to compete — compete! This is the true competition."},
  5:{xp:100,gems:4,icon:'🔄',title:'THE GREAT REVERSAL!',msg:"Allahu Akbar! In this world the wrongdoers laughed at the believers — mocking their prayers, their hijab, their commitment. On That Day, the believers laugh at the disbelievers: 'Hal thuwwiba al-kuffar ma kanu yaf\'alun?' Were the disbelievers rewarded for what they used to do? Yes — the most painful reward. Patience in this world pays in That world!"},
  6:{xp:120,gems:5,icon:'📊',title:'SURAH AL-MUTAFFIFIN COMPLETE!',msg:"ALLAHUMMA BARIK! All 6 levels of Surah Al-Mutaffifin — Those Who Defraud — complete! The lesson: be honest in every measure. Your record is being written — either in Sijjin or in Illiyyin. On That Day, what you gave in this world — full or less — will determine where you stand. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:6,rewards:REWARDS,
  tileIcons:['⚖️','📕','📗','🌿','🔄','📊'],
  tileLabels:['Defrauders','Sijjin','Illiyyin','Bliss','Reversal','Complete'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Mutaffifin — Those Who Give Less. Woe to those who defraud! The Book of Sijjin. The Book of Illiyyin. The Righteous in Bliss. And the Great Reversal on That Day. 6 levels of justice and accountability await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Kalla inna kitab al-abrar la-fi \'illiyyin..." — Your record is being built! ⚖️`,
    complete:name=>`MashAllah, ${name}! Surah Al-Mutaffifin complete! The honest scale never fails. May Allah write our records in Illiyyin. Ameen! 📊`,
  },
};

const S1_QUIZ=[
  {q:'What does "al-mutaffifin" (المُطَفِّفِين) mean?',
   opts:['Those who refuse to trade or sell their goods',
         'Those who charge unfairly high prices for their goods',
         'Those who defraud by giving slightly less than the full measure',
         'The generous merchants who always give a little extra'],
   correct:2},
  {q:'What do the defrauders do when receiving vs giving (83:2-3)?',
   opts:['They always measure incorrectly due to poor equipment',
         'Receive: take full measure. Give: give less. Deliberate cheating.',
         'They give more to friends and give less to strangers',
         'They always give equally but demand discounts when buying'],
   correct:1},
  {q:'What question does Allah ask about these defrauders in 83:4-5?',
   opts:['"Do they not know that Allah watches all of them?"',
         '"Do they not fear the market inspectors of their city?"',
         '"Do they not THINK they will be RESURRECTED for a Great Day?"',
         '"Do they not remember the promise of the Day of Judgment?"'],
   correct:2},
  {q:'Why does Allah link marketplace cheating to the Day of Judgment?',
   opts:['Because economic crimes were more common than spiritual sins',
         'Cheating in weights reveals disbelief in being perfectly weighed',
         'Because merchants needed specific and detailed economic guidance',
         'Because the marketplace was considered a form of worship'],
   correct:1},
];

const S2_ITEMS=[{id:'s1',text:'📕 Sijjin\nسِجِّين',zone:'z1'},{id:'s2',text:'⬇️ Lowest of\nthe Low',zone:'z2'},{id:'s3',text:'📜 Kitab\nMarqum',zone:'z3'}];
const S2_ZONES=[{id:'z1',desc:'"Inna kitab al-fujjar la-fi Sijjin" (83:7) — The record of the wicked (al-fujjar) is in Sijjin. Scholars say Sijjin is in the lowest earth — beneath all creation, the most confined and degraded location.'},{id:'z2',desc:'"Wa ma adraka ma Sijjin?" (83:8) — What would make you know what Sijjin is? Its enormity is signalled by the rhetorical question. It is below the seven earths, in the furthest possible place from Allah\'s mercy.'},{id:'z3',desc:'"Kitabun marqumun" (83:9) — A marked, inscribed record. "Marqum" means clearly written, well-defined, sealed. The record of the wicked is specific, complete, marked, and permanently recorded.'}];

const S3_ITEMS=[{id:'i1',text:'📗 Illiyyin\nعِلِّيُّون',zone:'z1'},{id:'i2',text:'⬆️ Highest of\nthe High',zone:'z2'},{id:'i3',text:'👁️ Witnessed by\nMuqarrabun',zone:'z3'}];
const S3_ZONES=[{id:'z1',desc:'"Inna kitab al-abrar la-fi Illiyyin" (83:18) — The record of the righteous (al-abrar) is in Illiyyin. From \'ala (high). The highest register — elevated above all creation. Your good deeds go up, up, up to the most exalted location.'},{id:'z2',desc:'"Wa ma adraka ma Illiyyun?" (83:19) — The same rhetorical question as Sijjin — but now signalling something magnificent. What could this elevated place be? Far beyond human comprehension.'},{id:'z3',desc:'"Yash-haduhu al-muqarrabun" (83:21) — Witnessed by the Muqarrabun — those brought closest to Allah. The highest angels attend and witness the records of the Abrar. Your good deeds are watched by the most noble beings in existence.'}];

const S4_QUIZ=[
  {q:'What does "nahrat al-na\'im" (نَضْرَةَ النَّعِيمِ) in 83:24 mean?',
   opts:['The colour of the lush green gardens of Paradise',
         'The flowing rivers and streams throughout Paradise',
         'A radiant glow of bliss shining outward on their faces',
         'The brilliant light that comes from Paradise\'s gates'],
   correct:2},
  {q:'What is "rahiq makhtum" (رَحِيق مَّخْتُوم) in 83:25?',
   opts:['A sealed pure nectar of Paradise — its seal is musk',
         'A special protected copy of the Quran kept in Paradise',
         'A holy book that is witnessed by the nearest angels',
         'Sacred Zamzam water preserved and kept in Paradise'],
   correct:0},
  {q:'What does "wa fi dhalika fal-yatanafas al-mutanafisun" (83:26) mean?',
   opts:['"Those who breathe should breathe only this air"',
         '"For THIS let those who want to compete — compete!"',
         '"People should not compete with each other in this world"',
         '"Those who love beauty will find it only in Paradise"'],
   correct:1},
  {q:'From the couches (ara\'ik) in 83:23, what does the righteous person see?',
   opts:['They see only the gardens and rivers all around them',
         'They watch the entire world below them from above',
         'They see the records of their good deeds playing back',
         'They look at the blessings and people around them in delight'],
   correct:3},
];

const S5_QUIZ=[
  {q:'What did the wrongdoers do to the believers (83:29-32)?',
   opts:['They ignored believers and refused all interaction with them',
         'They laughed, winked mockingly, and called believers misguided',
         'They competed with believers in doing good deeds publicly',
         'They debated believers publicly about Islamic beliefs'],
   correct:1},
  {q:'What is the great reversal described in 83:34?',
   opts:['Believers will be the judges of all disbelievers on That Day',
         'Believers will avoid all contact with disbelievers in Paradise',
         'On That Day those who believed are LAUGHING at the disbelievers',
         'Believers will choose to forgive all those who mocked them'],
   correct:2},
  {q:'What does "hal thuwwiba al-kuffaru ma kanu yaf\'alun?" (83:36) mean?',
   opts:['Were disbelievers rewarded with Paradise for their worship?',
         '"Were disbelievers repaid for what they used to do?" — Yes, perfectly',
         'Were the disbelievers shown any mercy at the very end?',
         'Were disbelievers given any chance to repent on That Day?'],
   correct:1},
  {q:'What is the core message of the "Great Reversal" in 83:29-36?',
   opts:['Believers should not care about what others say about them',
         'Patience in this world is always followed by honour in the next',
         'Believers should publicly mock disbelievers in this world',
         'The mockery proves that Islam was unpopular among the Quraysh'],
   correct:1},
];

const S6_QUIZ=[
  {q:'What connects cheating in weights to "Do they think they\'ll be resurrected?" (83:4)?',
   opts:['There is no real direct connection — they are separate topics',
         'Cheating reveals hidden disbelief — if you truly believed, you\'d be fair',
         'Only those who denied resurrection were guilty of this cheating',
         'Resurrection generally affects people\'s attitudes toward all wealth'],
   correct:1},
  {q:'What is the core contrast between Sijjin and Illiyyin?',
   opts:['Sijjin is for minor sins only; Illiyyin is for major good deeds',
         'Sijjin is in this world while Illiyyin is located in Paradise',
         'Sijjin (lowest) holds wicked records; Illiyyin (highest) holds righteous records',
         'They are simply two different poetic names for Hell'],
   correct:2},
  {q:'What does "radiance on their faces" (83:24) teach about inner and outer?',
   opts:['Outer appearance in Paradise will be unrelated to inner state',
         'Only the wicked will have their inner state shown outwardly',
         'The radiance comes only from the rivers flowing near them',
         'Inner joy and faith becomes visible outward radiance on your face'],
   correct:3},
  {q:'How does this surah apply beyond marketplace weights today?',
   opts:['It only applies to old-fashioned sellers with physical scales',
         'It applies only to businesspeople — not to ordinary people',
         '"Full measure" applies to all exchanges: time, effort, trust, friendship',
         'It has no modern relevance since we now use digital scales'],
   correct:2},
];

function renderSection1Game(){renderQuiz(1,S1_QUIZ);}function checkSection1(){checkQuiz(1,S1_QUIZ);}
function renderSection2Game(){renderDragDrop(2,S2_ITEMS,S2_ZONES);}function checkSection2(){checkDragDrop(2,S2_ZONES);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}function checkSection5(){checkQuiz(5,S5_QUIZ);}
function renderSection6Game(){renderQuiz(6,S6_QUIZ);}function checkSection6(){checkQuiz(6,S6_QUIZ);}

function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#c88030';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#140408';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#6a1828';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#0a0408');sk.addColorStop(1,'#180810');ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  for(let i=0;i<20;i++){const sx=(i*5997)%W,sy=(i*3821)%(H*0.4);ctx.fillStyle=`rgba(200,150,100,${0.1+i%3*0.1})`;ctx.fillRect(sx,sy,1,1);}
  if(n<1){_lbl(ctx,W,"⚖️ Complete levels to build the Scales of Justice!",0,6);return;}
  ctx.fillStyle='#1a0e08';ctx.fillRect(0,200,W,50);ctx.fillStyle='#281408';ctx.fillRect(0,200,W,5);
  if(n<2){_lbl(ctx,W,"⚖️ Base of scales set — 1/6",1,6);return;}
  // Scales
  ctx.strokeStyle='rgba(200,128,48,0.8)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(W/2,80);ctx.lineTo(W/2,110);ctx.stroke();ctx.beginPath();ctx.moveTo(W/2-80,110);ctx.lineTo(W/2+80,110);ctx.stroke();ctx.beginPath();ctx.moveTo(W/2-80,110);ctx.lineTo(W/2-90,145);ctx.stroke();ctx.beginPath();ctx.moveTo(W/2+80,110);ctx.lineTo(W/2+90,145);ctx.stroke();ctx.fillStyle='rgba(200,128,48,0.8)';ctx.beginPath();ctx.arc(W/2,78,6,0,Math.PI*2);ctx.fill();fillRect(ctx,W/2-100,145,30,12,'#5a3010');fillRect(ctx,W/2+70,145,30,12,'#5a3010');
  if(n<3){_lbl(ctx,W,"⚖️ Scales of Justice raised — 2/6",2,6);return;}
  // Sijjin below
  const sy=185;fillRect(ctx,W/2-180,sy,80,25,'#1a0a10');ctx.strokeStyle='#6a1828';ctx.lineWidth=1;ctx.strokeRect(W/2-180,sy,80,25);ctx.fillStyle='#aa3040';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('SIJJIN',W/2-140,sy+17);ctx.textAlign='left';
  if(n<4){_lbl(ctx,W,"📕 Sijjin revealed below — 3/6",3,6);return;}
  // Illiyyin above
  ctx.shadowColor='rgba(200,200,80,0.5)';ctx.shadowBlur=10;fillRect(ctx,W/2+100,20,80,25,'#4a4010');ctx.strokeStyle='rgba(200,180,60,0.8)';ctx.lineWidth=1;ctx.strokeRect(W/2+100,20,80,25);ctx.shadowBlur=0;ctx.fillStyle='#e8d840';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('ILLIYYIN',W/2+140,37);ctx.textAlign='left';
  if(n<5){_lbl(ctx,W,"📗 Illiyyin revealed above — 4/6",4,6);return;}
  // Two groups
  ctx.fillStyle='rgba(80,200,80,0.3)';ctx.fillRect(20,165,100,35);ctx.fillStyle='rgba(200,40,40,0.3)';ctx.fillRect(440,165,100,35);ctx.fillStyle='#80ff80';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('ABRAR',70,188);ctx.fillStyle='#ff8080';ctx.fillText('FUJJAR',490,188);ctx.textAlign='left';
  if(n<6){_lbl(ctx,W,"⚖️ Two sides of the scale — 5/6",5,6);return;}
  ctx.fillStyle='#c88030';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! ⚖️ AL-MUTAFFIFIN COMPLETE!",W/2,225);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Waylun lil-mutaffifin...kalla inna kitab al-abrar la-fi Illiyyin"',W/2,238);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
