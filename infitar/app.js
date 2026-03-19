'use strict';
/* SURAH AL-INFITAR (82) — app.js */
window.STORAGE_KEY='infitarQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s1Checked:false,s2Answers:{},s2Checked:false,s3Checked:false,s4Answers:{},s4Checked:false,s5Answers:{},s5Checked:false,s6Answers:{},s6Checked:false};

const REWARDS={
  1:{xp:80,gems:3,icon:'🌌',title:'THE SKY HAS SPLIT!',msg:"SubhanAllah! The sky splits. Stars scatter. Seas burst. Graves overturn. And then — 'Alimat nafsun ma qaddamat wa akhkharat.' A soul will know what it put forward AND what it left behind. Both matter: what you did AND what you failed to do. Start building your record today!"},
  2:{xp:80,gems:3,icon:'🤔',title:'THE DECEPTION EXPOSED!',msg:"Allahu Akbar! 'Ya ayyuha al-insan — ma gharraka bi-Rabbika al-Karim?' What DECEIVED you? Allah calls Himself 'al-Karim' — the Generous. We took His generosity and thought it meant no accountability. We were deceived by His kindness. SubhanAllah — use His generosity as motivation, not as false security!"},
  3:{xp:90,gems:3,icon:'✍️',title:'THE RECORDING ANGELS KNOWN!',msg:"MashAllah! 'Kiraman Katibin' — Noble Recorders. They are NOBLE — not threatening agents, but honoured beings doing an honourable task. And they know EVERYTHING. Every whisper, every secret thought that leads to action. Your record is being written right now. Make it a record you'd be proud to show."},
  4:{xp:90,gems:4,icon:'⚖️',title:'TWO DESTINIES CLEAR!',msg:"SubhanAllah! Al-Abrar in bliss. Al-Fujjar in Hell. The contrast is absolute. And 'wa ma hum anha bi-gha'ibin' — the wrongdoers will NOT be absent from Hell. No escape. No last-minute reprieve. The time to choose al-Abrar is NOW, while this door is still open."},
  5:{xp:100,gems:4,icon:'⚡',title:'YAWM AL-DIN UNDERSTOOD!',msg:"Allahu Akbar! 'Wa ma adraka ma yawm al-din? Thumma ma adraka ma yawm al-din?' The question is asked TWICE — it is that incomprehensible. That Day, no soul helps another. No wealth, no status, no intercession except by His permission. 'Wa al-amru yawma'idhin li-llah.' Allah alone commands."},
  6:{xp:120,gems:5,icon:'🌊',title:'SURAH AL-INFITAR COMPLETE!',msg:"ALLAHUMMA BARIK! All 6 levels of Surah Al-Infitar — The Cleaving — complete! The sky will split, records will be laid open, and every soul will stand completely alone. 'Wa al-amru yawma'idhin li-llah.' On that Day, only Allah commands. May our records be full of good. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:6,rewards:REWARDS,
  tileIcons:['🌌','🤔','✍️','⚖️','⚡','🌊'],
  tileLabels:['Sky Splits','Deceived?','Angels','Two Destinies','Yawm al-Din','No Help'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Infitar — "The Cleaving." The sky splits. Stars scatter. What deceived you about your Lord? Noble recording angels. The righteous in bliss and the wicked in Hell. And the Day when no soul helps another. 6 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Ma gharraka bi-Rabbika al-Karim?" — Keep building your record! 🌌`,
    complete:name=>`MashAllah, ${name}! Surah Al-Infitar complete! "Wa al-amru yawma'idhin li-llah." Allah commands on That Day. May your record bring you joy. Ameen! 🌊`,
  },
};

const S1_ITEMS=[{id:'i1',text:'🌌 Sky\nInfatarat',zone:'z1'},{id:'i2',text:'⭐ Stars\nIntatharat',zone:'z2'},{id:'i3',text:'🌊 Seas\nFujjirat',zone:'z3'},{id:'i4',text:'⚰️ Graves\nBu\'thirat',zone:'z4'}];
const S1_ZONES=[{id:'z1',desc:'"Idha al-sama\' infatarat" (82:1) — When the sky is CLEFT/split asunder. "Infatara" means to split open with force. The sky that seems permanent above us will be torn apart.'},{id:'z2',desc:'"Wa idha al-kawakib intatharat" (82:2) — When the stars are scattered/fall. "Intathara" means to scatter in every direction like scattered seeds.'},{id:'z3',desc:'"Wa idha al-bihar fujjirat" (82:3) — When the seas are burst forth/set flowing. Water merges, boundaries between seas dissolve, the ocean overflows. Everything orderly becomes chaotic.'},{id:'z4',desc:'"Wa idha al-qubur bu\'thirat" (82:4) — When the graves are overturned/stirred up. Their contents are thrown up — the dead emerge for resurrection. No one stays buried.'}];

const S2_QUIZ=[
  {q:'What does "ma gharraka" (مَا غَرَّكَ) in 82:6 mean?',opts:['What made you happy?','What DECEIVED you? — "Gharra" means to be deceived, lured into false confidence. You were tricked into thinking there would be no accountability','What confused you about religion?','What occupied you with worldly matters?'],correct:1},
  {q:'Allah calls Himself "al-Karim" (the Generous) in 82:6 in the context of reproach. Why?',opts:['Because He is angry and wants to withhold His generosity','Because the human took His GENEROSITY — ease, provision, health — as evidence that there was no accountability coming. The Generous One was being taken advantage of.','Because generosity is His most important attribute','Because He wants to remind us to be generous too'],correct:1},
  {q:'What three things did Allah do for mankind according to 82:7-8?',opts:['Taught him, guided him, and provided for him','CREATED him (khalaqaka), PROPORTIONED him (sawwaka), and ASSEMBLED him (\'adalaka) — three acts of physical perfection, then: in whatever form He willed','Blessed him, protected him, and honoured him','Named him, recorded him, and assigned him a destiny'],correct:1},
  {q:'What is the implied answer to "what deceived you?" in 82:6-8?',opts:['Worldly wealth and status deceived him','Shaytan deceived him by whispering false promises','The question has no clear answer — it is left open','Both Shaytan\'s whispering AND the human\'s own love of ease and comfort deceived him — taking Allah\'s generosity as permission to be heedless'],correct:3},
];

const S3_ITEMS=[{id:'a1',text:'🛡️ Hafizin\n(Guardians)',zone:'z1'},{id:'a2',text:'✍️ Katibin\n(Recorders)',zone:'z2'},{id:'a3',text:'👁️ They Know\nEverything',zone:'z3'}];
const S3_ZONES=[{id:'z1',desc:'"Inna \'alaykum la-hafizin" (82:10) — Over you are GUARDIANS. Hafizin from hafiz (to guard, preserve). They protect and keep your record. This is a blessing — your deeds are preserved accurately, nothing is lost.'},{id:'z2',desc:'"Kiraman katibin" (82:11) — NOBLE RECORDERS. Kiram means noble, generous, dignified. Allah emphasises their nobility — they are honoured beings doing an important duty faithfully.'},{id:'z3',desc:'"Ya\'lamuna ma taf\'alun" (82:12) — They KNOW everything you do. Every act, every word, everything. Complete, perfect knowledge. Your entire life is witnessed and recorded by beings who never sleep, never make mistakes, and never miss anything.'}];

const S4_QUIZ=[
  {q:'What is the meaning of "Al-Abrar" (الأَبْرَار) in 82:13?',opts:['The scholars and imams','The righteous, pious, God-fearing people — those who fulfilled their duties to Allah and to people. "Birr" means righteousness and goodness in all dimensions.','Only the prophets and martyrs','Those who completed the Hajj'],correct:1},
  {q:'What does "Al-Fujjar" (الفُجَّار) mean in 82:14?',opts:['The disbelievers only — those who rejected Islam','The wicked, sinners, those who transgressed — "fujur" is the opposite of "birr." It implies open, brazen sinfulness and rejection of accountability','Poor people who didn\'t worship correctly','Those who were misguided but meant well'],correct:1},
  {q:'What is "al-Jahim" (الجَحِيم) in 82:14?',opts:['A level of Paradise for the partially righteous','One of the names of Hell — from "jahama" meaning intensely blazing fire. It is specifically for the Fujjar (the wicked sinners).','The Day of Judgment itself','The barrier between Paradise and Hell'],correct:1},
  {q:'What makes 82:16 so frightening: "Wa ma hum anha bi-gha\'ibin"?',opts:['The disbelievers will try to escape Hell but fail','They will NOT be absent from it — no escape, no temporary departure, no reduction. The Fujjar will be permanently present in Hell. The permanence is the warning.','They will witness Paradise from Hell','They will be moved between Hell and Purgatory'],correct:1},
];

const S5_QUIZ=[
  {q:'Why is the question "Wa ma adraka ma yawm al-din?" repeated TWICE in 82:17-18?',opts:['Because the Prophet ﷺ did not hear it the first time','The repetition is a device of ENORMITY — it says: this is so great that even asking once cannot convey its magnitude. The Day defies single description.','Because there are two different Days','Because the question is addressed to two different audiences'],correct:1},
  {q:'What does "yawm al-din" (يَوْمُ الدِّين) literally mean?',opts:['The Day of Prayer','The Day of RECOMPENSE/REPAYMENT — "din" here means accountability, reward and punishment. Every soul receives exactly what it earned.','The Day of Religion','The Day of Warning'],correct:1},
  {q:'What does "La tamliku nafsun li-nafsin shay\'an" (82:19) mean?',opts:['People will not be able to speak on that Day','No soul has ANY power or control for another soul — no parent can help their child, no friend can help a friend, no money can buy anything','People will be separated and unable to see each other','No one will remember their loved ones on that Day'],correct:1},
  {q:'What is the central lesson of Surah Al-Infitar?',opts:['The importance of reading Quran every day','On the Day the sky splits and graves overturn — every soul stands ALONE with its record. Noble angels recorded everything. No deception of the Generous Lord. No one helps you. Only your deeds remain.','We should be kind to everyone around us','The angels are more important than humans'],correct:1},
];

const S6_QUIZ=[
  {q:'If "the command that Day is entirely for Allah" (82:19), what does this tell us about authority in this world?',opts:['Humans have no real authority at all — everything is determined already','Human authority is BORROWED and temporary. Leaders, judges, parents — all have delegated authority. On That Day, every borrowed authority returns to its true owner: Allah alone.','It means we should not follow any human laws','It means only religious scholars have authority in this world'],correct:1},
  {q:'Surah Al-Infitar mentions "what it put forward AND left behind" (82:5). What does "left behind" mean?',opts:['Property left behind after death','The deeds you DIDN\'T do — good you had the chance to do but didn\'t, obligations you neglected, worship you missed. Omissions are also recorded.','People you leave behind when you die','Sins committed before becoming Muslim'],correct:1},
  {q:'How does this surah motivate us to treat others?',opts:['By reminding us that Allah will punish those who wrong us','The Recording Angels are noble and write everything — every kind word, every act of help, every moment of patience. Knowing the record is perfect motivates being excellent in private, not just in public.','By promising material rewards for good deeds','By warning that sins make the sky split sooner'],correct:1},
  {q:'What is the connection between "al-Karim" (82:6) and "Kiraman Katibin" (82:11)?',opts:['There is no connection — they are separate topics','Both use the word "karim/kiram" (noble/generous). Allah is al-Karim — yet man was deceived by His generosity. The recording angels are Kiram — noble. There is divine NOBILITY throughout this surah — yet man was heedless of it all.','Both describe angels','Both describe the Day of Judgment'],correct:1},
];

function renderSection1Game(){renderDragDrop(1,S1_ITEMS,S1_ZONES);}function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderDragDrop(3,S3_ITEMS,S3_ZONES);}function checkSection3(){checkDragDrop(3,S3_ZONES);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}function checkSection5(){checkQuiz(5,S5_QUIZ);}
function renderSection6Game(){renderQuiz(6,S6_QUIZ);}function checkSection6(){checkQuiz(6,S6_QUIZ);}

function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#40d0e8';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#020818';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#1848a0';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,n>=6?'#081828':'#020818');sk.addColorStop(1,n>=6?'#102030':'#051428');
  ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  [[80,20],[160,12],[240,30],[320,15],[400,25],[480,10],[120,50],[280,45],[440,55]].slice(0,n*2).forEach(([sx,sy])=>{ctx.fillStyle='rgba(100,200,255,0.6)';ctx.beginPath();ctx.arc(sx,sy,1.5,0,Math.PI*2);ctx.fill();});
  if(n<1){_lbl(ctx,W,"🌌 Complete levels to build the Cleaving Sky!",0,6);return;}
  ctx.fillStyle='#0a1e30';ctx.fillRect(0,200,W,50);ctx.fillStyle='#102838';ctx.fillRect(0,200,W,4);
  if(n<2){_lbl(ctx,W,"🌍 Earth revealed — 1/6",1,6);return;}
  const pulse=0.5+Math.sin(Date.now()*0.002)*0.3;ctx.strokeStyle=`rgba(64,208,232,${pulse})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W/2-30,0);ctx.lineTo(W/2,80);ctx.lineTo(W/2+20,H);ctx.stroke();
  if(n<3){_lbl(ctx,W,"🌌 Sky cleaves — 2/6",2,6);return;}
  for(let i=0;i<4;i++){const sx=(i*140),sy=20+i*10;ctx.fillStyle='rgba(100,200,255,0.8)';ctx.beginPath();ctx.arc(sx+40,sy,3,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(100,200,255,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(sx+40,sy);ctx.lineTo(sx+70,sy+30);ctx.stroke();}
  if(n<4){_lbl(ctx,W,"⭐ Stars scatter — 3/6",3,6);return;}
  // Scales
  ctx.strokeStyle='rgba(64,208,232,0.7)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W/2,100);ctx.lineTo(W/2,130);ctx.stroke();ctx.beginPath();ctx.moveTo(W/2-50,130);ctx.lineTo(W/2+50,130);ctx.stroke();ctx.fillStyle='rgba(64,208,232,0.4)';ctx.fillRect(W/2-60,140,30,12);ctx.fillRect(W/2+30,140,30,12);
  if(n<5){_lbl(ctx,W,"⚖️ Scales of justice — 4/6",4,6);return;}
  // Two groups
  ctx.fillStyle='rgba(40,180,80,0.4)';ctx.fillRect(20,165,120,35);ctx.fillStyle='rgba(200,40,20,0.4)';ctx.fillRect(420,165,120,35);ctx.fillStyle='#80ff80';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('ABRAR',80,188);ctx.fillStyle='#ff8080';ctx.fillText('FUJJAR',480,188);ctx.textAlign='left';
  if(n<6){_lbl(ctx,W,"⚖️ Two destinies revealed — 5/6",5,6);return;}
  const lg=ctx.createRadialGradient(W/2,100,0,W/2,100,150);lg.addColorStop(0,'rgba(64,208,232,0.15)');lg.addColorStop(1,'rgba(30,100,180,0)');ctx.fillStyle=lg;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#40d0e8';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! 🌌 AL-INFITAR COMPLETE!",W/2,225);ctx.font='6px "Press Start 2P",monospace';ctx.fillText('"Wa al-amru yawma\'idhin li-llah" — 82:19',W/2,238);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
