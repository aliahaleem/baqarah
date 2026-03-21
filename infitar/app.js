'use strict';
/* SURAH AL-INFITAR (82) — app.js */
window.STORAGE_KEY='infitarQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s2Checked:false,s3Answers:{},s3Checked:false,s4Checked:false,s5Answers:{},s5Checked:false,s6Answers:{},s6Checked:false,s7Answers:{},s7Checked:false};

const REWARDS={
  1: {xp:60, gems:3, icon:'📖', title:'Words Learned!', msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:80,gems:3,icon:'🌌',title:'THE SKY HAS SPLIT!',msg:"SubhanAllah! The sky splits. Stars scatter. Seas burst. Graves overturn. And then — 'Alimat nafsun ma qaddamat wa akhkharat.' A soul will know what it put forward AND what it left behind. Both matter: what you did AND what you failed to do. Start building your record today!"},
  3:{xp:80,gems:3,icon:'🤔',title:'THE DECEPTION EXPOSED!',msg:"Allahu Akbar! 'Ya ayyuha al-insan — ma gharraka bi-Rabbika al-Karim?' What DECEIVED you? Allah calls Himself 'al-Karim' — the Generous. We took His generosity and thought it meant no accountability. We were deceived by His kindness. SubhanAllah — use His generosity as motivation, not as false security!"},
  4:{xp:90,gems:3,icon:'✍️',title:'THE RECORDING ANGELS KNOWN!',msg:"MashAllah! 'Kiraman Katibin' — Noble Recorders. They are NOBLE — not threatening agents, but honoured beings doing an honourable task. And they know EVERYTHING. Every whisper, every secret thought that leads to action. Your record is being written right now. Make it a record you'd be proud to show."},
  5:{xp:90,gems:4,icon:'⚖️',title:'TWO DESTINIES CLEAR!',msg:"SubhanAllah! Al-Abrar in bliss. Al-Fujjar in Hell. The contrast is absolute. And 'wa ma hum anha bi-gha'ibin' — the wrongdoers will NOT be absent from Hell. No escape. No last-minute reprieve. The time to choose al-Abrar is NOW, while this door is still open."},
  6:{xp:100,gems:4,icon:'⚡',title:'YAWM AL-DIN UNDERSTOOD!',msg:"Allahu Akbar! 'Wa ma adraka ma yawm al-din? Thumma ma adraka ma yawm al-din?' The question is asked TWICE — it is that incomprehensible. That Day, no soul helps another. No wealth, no status, no intercession except by His permission. 'Wa al-amru yawma'idhin li-llah.' Allah alone commands."},
  7:{xp:120,gems:5,icon:'🌊',title:'SURAH AL-INFITAR COMPLETE!',msg:"ALLAHUMMA BARIK! All 7 levels of Surah Al-Infitar — The Cleaving — complete! The sky will split, records will be laid open, and every soul will stand completely alone. 'Wa al-amru yawma'idhin li-llah.' On that Day, only Allah commands. May our records be full of good. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:7,rewards:REWARDS,
  tileIcons:['📖','🌌','🤔','✍️','⚖️','⚡','🌊'],
  tileLabels:['Word by Word','Sky Splits','Deceived?','Angels','Two Destinies','Yawm al-Din','No Help'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Infitar — "The Cleaving." The sky splits. Stars scatter. What deceived you about your Lord? Noble recording angels. The righteous in bliss and the wicked in Hell. And the Day when no soul helps another. 7 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Ma gharraka bi-Rabbika al-Karim?" — Keep building your record! 🌌`,
    complete:name=>`MashAllah, ${name}! Surah Al-Infitar complete! "Wa al-amru yawma'idhin li-llah." Allah commands on That Day. May your record bring you joy. Ameen! 🌊`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'82:1 — إِذَا السَّمَاءُ انفَطَرَتْ', words:[
    {ar:'انفَطَرَتْ', tr:'infaṭarat', en:'has broken apart', freq:1},
    {ar:'السَّمَاءُ', tr:'al-samāʾ', en:'the sky', freq:120},
    'idha',
  ]},
  {label:'82:2 — وَإِذَا الْكَوَاكِبُ انتَثَرَتْ', words:[
    {ar:'انتَثَرَتْ', tr:'intatharat', en:'scattered', freq:1},
    {ar:'الْكَوَاكِبُ', tr:'al-kawākib', en:'the stars', freq:5},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'82:3 — وَإِذَا الْبِحَارُ فُجِّرَتْ', words:[
    {ar:'فُجِّرَتْ', tr:'fujjirat', en:'burst forth', freq:1},
    {ar:'الْبِحَارُ', tr:'al-biḥār', en:'the seas', freq:9},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'82:4 — وَإِذَا الْقُبُورُ بُعْثِرَتْ', words:[
    {ar:'بُعْثِرَتْ', tr:'buʿthirat', en:'overturned', freq:1},
    {ar:'الْقُبُورُ', tr:'al-qubūr', en:'the graves', freq:7},
    {ar:'وَإِذَا', tr:'wa-idhā', en:'and when', freq:406},
  ]},
  {label:'82:5 — عَلِمَتْ نَفْسٌ مَّا قَدَّمَتْ وَأَخَّرَتْ', words:[
    {ar:'وَأَخَّرَتْ', tr:'wa-akhkharat', en:'and delayed', freq:5},
    {ar:'قَدَّمَتْ', tr:'qaddamat', en:'put forward', freq:14},
    {ar:'مَّا', tr:'mā', en:'what', freq:2005},
    {ar:'نَفْسٌ', tr:'nafsun', en:'a soul', freq:295},
    {ar:'عَلِمَتْ', tr:'ʿalimat', en:'will know', freq:382},
  ]},
  {label:'82:6 — يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ', words:[
    {ar:'الْكَرِيمِ', tr:'al-karīm', en:'the Generous', freq:27},
    {ar:'بِرَبِّكَ', tr:'bi-rabbika', en:'concerning your Lord', freq:49},
    {ar:'غَرَّكَ', tr:'gharraka', en:'deceived you', freq:2},
    'ma',
    {ar:'الْإِنسَانُ', tr:'al-insān', en:'O mankind', freq:65},
    {ar:'أَيُّهَا', tr:'ayyuhā', en:'O you', freq:142},
    'ya',
  ]},
  {label:'82:7 — الَّذِي خَلَقَكَ فَسَوَّاكَ فَعَدَلَكَ', words:[
    {ar:'فَعَدَلَكَ', tr:'fa-ʿadalaka', en:'and balanced you', freq:1},
    {ar:'فَسَوَّاكَ', tr:'fa-sawwāka', en:'and proportioned you', freq:1},
    {ar:'خَلَقَكَ', tr:'khalaqaka', en:'created you', freq:29},
    'alladhi',
  ]},
  {label:'82:8 — فِي أَيِّ صُورَةٍ مَّا شَاءَ رَكَّبَكَ', words:[
    {ar:'رَكَّبَكَ', tr:'rakkabaka', en:'assembled you', freq:1},
    {ar:'شَاءَ', tr:'shāʾa', en:'He willed', freq:236},
    {ar:'مَّا', tr:'mā', en:'whatever', freq:2005},
    {ar:'صُورَةٍ', tr:'ṣūratin', en:'form', freq:3},
    {ar:'أَيِّ', tr:'ayyi', en:'any / whichever', freq:16},
    'fi',
  ]},
  {label:'82:9 — كَلَّا بَلْ تُكَذِّبُونَ بِالدِّينِ', words:[
    'al-deen',
    {ar:'تُكَذِّبُونَ', tr:'tukadhdhibūna', en:'you deny', freq:25},
    {ar:'بَلْ', tr:'bal', en:'rather / nay', freq:126},
    'kalla',
  ]},
  {label:'82:10 — وَإِنَّ عَلَيْكُمْ لَحَافِظِينَ', words:[
    {ar:'لَحَافِظِينَ', tr:'la-ḥāfiẓīn', en:'surely guardians', freq:10},
    {ar:'عَلَيْكُمْ', tr:'ʿalaykum', en:'over you', freq:44},
    {ar:'وَإِنَّ', tr:'wa-inna', en:'and indeed', freq:743},
  ]},
  {label:'82:11 — كِرَامًا كَاتِبِينَ', words:[
    {ar:'كَاتِبِينَ', tr:'kātibīn', en:'recording (angels)', freq:1},
    {ar:'كِرَامًا', tr:'kirāman', en:'noble / honourable', freq:5},
  ]},
  {label:'82:12 — يَعْلَمُونَ مَا تَفْعَلُونَ', words:[
    {ar:'تَفْعَلُونَ', tr:'tafʿalūna', en:'you do', freq:80},
    'ma',
    {ar:'يَعْلَمُونَ', tr:'yaʿlamūna', en:'they know', freq:382},
  ]},
  {label:'82:13 — إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ', words:[
    {ar:'نَعِيمٍ', tr:'naʿīm', en:'bliss', freq:16},
    {ar:'لَفِي', tr:'la-fī', en:'surely in', freq:1714},
    {ar:'الْأَبْرَارَ', tr:'al-abrār', en:'the righteous', freq:6},
    'inna',
  ]},
  {label:'82:14 — وَإِنَّ الْفُجَّارَ لَفِي جَحِيمٍ', words:[
    {ar:'جَحِيمٍ', tr:'jaḥīm', en:'Hellfire', freq:26},
    {ar:'لَفِي', tr:'la-fī', en:'surely in', freq:1714},
    {ar:'الْفُجَّارَ', tr:'al-fujjār', en:'the wicked', freq:3},
    {ar:'وَإِنَّ', tr:'wa-inna', en:'and indeed', freq:743},
  ]},
  {label:'82:15 — يَصْلَوْنَهَا يَوْمَ الدِّينِ', words:[
    {ar:'الدِّينِ', tr:'al-dīn', en:'of Judgement', freq:92},
    'yawma',
    {ar:'يَصْلَوْنَهَا', tr:'yaṣlawnahā', en:'they will enter it', freq:5},
  ]},
  {label:'82:16 — وَمَا هُم عَنْهَا بِغَائِبِينَ', words:[
    {ar:'بِغَائِبِينَ', tr:'bi-ghāʾibīn', en:'absent', freq:1},
    {ar:'عَنْهَا', tr:'ʿanhā', en:'from it', freq:30},
    'hum',
    {ar:'وَمَا', tr:'wa-mā', en:'and not', freq:2005},
  ]},
  {label:'82:17 — وَمَا أَدْرَاكَ مَا يَوْمُ الدِّينِ', words:[
    {ar:'الدِّينِ', tr:'al-dīn', en:'of Judgement', freq:92},
    {ar:'يَوْمُ', tr:'yawmu', en:'the Day', freq:365},
    'ma',
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'will make you know', freq:13},
    {ar:'وَمَا', tr:'wa-mā', en:'and what', freq:2005},
  ]},
  {label:'82:18 — ثُمَّ مَا أَدْرَاكَ مَا يَوْمُ الدِّينِ', words:[
    {ar:'الدِّينِ', tr:'al-dīn', en:'of Judgement', freq:92},
    {ar:'يَوْمُ', tr:'yawmu', en:'the Day', freq:365},
    'ma',
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'will make you know', freq:13},
    'ma',
    'thumma',
  ]},
  {label:'82:19 — يَوْمَ لَا تَمْلِكُ نَفْسٌ لِّنَفْسٍ شَيْئًا وَالْأَمْرُ يَوْمَئِذٍ لِّلَّهِ', words:[
    {ar:'لِّلَّهِ', tr:'li-llāh', en:'for Allah', freq:170},
    {ar:'يَوْمَئِذٍ', tr:'yawmaʾidhin', en:'that Day', freq:42},
    {ar:'وَالْأَمْرُ', tr:'wal-amr', en:'and the command', freq:30},
    {ar:'شَيْئًا', tr:'shayʾan', en:'anything', freq:283},
    {ar:'لِّنَفْسٍ', tr:'li-nafsin', en:'for (another) soul', freq:295},
    {ar:'نَفْسٌ', tr:'nafsun', en:'a soul', freq:295},
    {ar:'تَمْلِكُ', tr:'tamliku', en:'possesses', freq:18},
    'la',
    'yawma',
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS=[{id:'i1',text:'السَّمَاءُ\nانفَطَرَتْ',zone:'z1'},{id:'i2',text:'الْكَوَاكِبُ\nانتَثَرَتْ',zone:'z2'},{id:'i3',text:'الْبِحَارُ\nفُجِّرَتْ',zone:'z3'},{id:'i4',text:'الْقُبُورُ\nبُعْثِرَتْ',zone:'z4'}];
const S1_ZONES=[{id:'z1',desc:'"Idha al-sama\' infatarat" (82:1) — When the sky is CLEFT/split asunder. "Infatara" means to split open with force. The sky that seems permanent above us will be torn apart.'},{id:'z2',desc:'"Wa idha al-kawakib intatharat" (82:2) — When the stars are scattered/fall. "Intathara" means to scatter in every direction like scattered seeds.'},{id:'z3',desc:'"Wa idha al-bihar fujjirat" (82:3) — When the seas are burst forth/set flowing. Water merges, boundaries between seas dissolve, the ocean overflows. Everything orderly becomes chaotic.'},{id:'z4',desc:'"Wa idha al-qubur bu\'thirat" (82:4) — When the graves are overturned/stirred up. Their contents are thrown up — the dead emerge for resurrection. No one stays buried.'}];

const S2_QUIZ=[
  {q:'What does "ma gharraka" (مَا غَرَّكَ) in 82:6 mean?',
   opts:['What made you happy about your worldly situation?',
         'What DECEIVED you into thinking there was no accountability?',
         'What confused you so deeply about your religion?',
         'What kept you so occupied with worldly matters?'],
   correct:1},
  {q:'Why does Allah call Himself "al-Karim" (the Generous) in 82:6?',
   opts:['Because generosity is His single most important attribute',
         'Because He wants us to also be generous with others',
         'Because He is angry and plans to withhold all generosity',
         'The human took Allah\'s kindness as proof of no accountability'],
   correct:3},
  {q:'What three acts did Allah do for mankind according to 82:7-8?',
   opts:['Taught him, guided him on the path, and provided for him',
         'Blessed him, protected him, and always honoured him',
         'Created (khalaqaka), proportioned (sawwaka), assembled (\'adalaka)',
         'Named him, recorded him, and assigned him his destiny'],
   correct:2},
  {q:'What is the implied answer to "what deceived you?" in 82:6?',
   opts:['Shaytan alone deceived him with persistent whispering',
         'Worldly wealth and status gave him a false sense of safety',
         'Both his love of ease AND Shaytan\'s whispers deceived him',
         'The question has no answer — it is deliberately left open'],
   correct:2},
];

const S3_ITEMS=[{id:'a1',text:'لَحَافِظِينَ',zone:'z1'},{id:'a2',text:'كِرَامًا\nكَاتِبِينَ',zone:'z2'},{id:'a3',text:'يَعْلَمُونَ\nمَا تَفْعَلُونَ',zone:'z3'}];
const S3_ZONES=[{id:'z1',desc:'"Inna \'alaykum la-hafizin" (82:10) — Over you are GUARDIANS. Hafizin from hafiz (to guard, preserve). They protect and keep your record. This is a blessing — your deeds are preserved accurately, nothing is lost.'},{id:'z2',desc:'"Kiraman katibin" (82:11) — NOBLE RECORDERS. Kiram means noble, generous, dignified. Allah emphasises their nobility — they are honoured beings doing an important duty faithfully.'},{id:'z3',desc:'"Ya\'lamuna ma taf\'alun" (82:12) — They KNOW everything you do. Every act, every word, everything. Complete, perfect knowledge. Your entire life is witnessed and recorded by beings who never sleep, never make mistakes, and never miss anything.'}];

const S4_QUIZ=[
  {q:'What is the meaning of "Al-Abrar" (الأَبْرَار) in 82:13?',
   opts:['The scholars, imams, and teachers of Islamic knowledge',
         'The righteous, pious, God-fearing — those who fulfilled duties',
         'Only prophets, companions, and martyrs of the faith',
         'Those who completed the Hajj pilgrimage to Makkah'],
   correct:1},
  {q:'What does "Al-Fujjar" (الفُجَّار) mean in 82:14?',
   opts:['The wicked, open sinners — the opposite of the Abrar',
         'The disbelievers only — those who explicitly rejected Islam',
         'Poor people who struggled to fulfil worship correctly',
         'Those who were misguided but genuinely intended good'],
   correct:0},
  {q:'What is "al-Jahim" (الجَحِيم) in 82:14?',
   opts:['A level of Paradise for the partially righteous',
         'The Day of Judgment and its overwhelming events',
         'The barrier separating Paradise from Hell',
         'One of Hell\'s names — from "jahama" meaning intensely blazing'],
   correct:3},
  {q:'What makes 82:16 so frightening: "Wa ma hum anha bi-gha\'ibin"?',
   opts:['The Fujjar will try desperately to escape Hell but fail',
         'They will NOT be absent from it — permanent, no exit, no break',
         'They will be able to witness Paradise clearly from Hell',
         'They will be moved between different chambers of Hell'],
   correct:1},
];

const S5_QUIZ=[
  {q:'Why is the question about Yawm al-Din repeated TWICE in 82:17-18?',
   opts:['Because the Prophet ﷺ did not hear it the very first time',
         'Repetition signals enormity — the Day defies a single description',
         'Because there are actually two separate Days of Judgment',
         'The question is addressed to two completely different audiences'],
   correct:1},
  {q:'What does "yawm al-din" (يَوْمُ الدِّين) literally mean?',
   opts:['The Day of communal prayer and Islamic worship',
         'The Day of Judgment — literally "the Day of Religion"',
         'The Day of Recompense — every soul is repaid exactly',
         'The Day of Warning sent to all of humankind'],
   correct:2},
  {q:'What does "La tamliku nafsun li-nafsin shay\'an" (82:19) mean?',
   opts:['People will be completely unable to speak on that Day',
         'No soul controls anything for another — no help, no leverage',
         'People will be separated and prevented from seeing each other',
         'No one will remember their loved ones on that Day'],
   correct:1},
  {q:'What is the central lesson of Surah Al-Infitar?',
   opts:['The sky splits and every soul stands alone with its record',
         'It is very important to read the Quran regularly each day',
         'We should show great kindness to everyone around us',
         'Recording angels are the most important creation of Allah'],
   correct:0},
];

const S6_QUIZ=[
  {q:'If "the command that Day is entirely for Allah" (82:19), what does this tell us?',
   opts:['Humans have no real authority — everything is pre-determined',
         'Human authority is borrowed — on That Day it all returns to Allah',
         'We should refuse to follow any human laws whatsoever',
         'Only religious scholars have legitimate authority in this world'],
   correct:1},
  {q:'What does "left behind" (ma akhkharat) mean in 82:5?',
   opts:['Property and wealth left behind after your death',
         'Good deeds you had the chance to do but neglected and missed',
         'The family and loved ones you leave behind at death',
         'Sins that were committed before you became a Muslim'],
   correct:1},
  {q:'How does knowing "angels are recording everything" motivate us?',
   opts:['It reminds us that Allah will punish anyone who wrongs us',
         'It promises material rewards for every good deed done',
         'Knowing the record is perfect motivates excellence in private',
         'It warns us that sins will cause the sky to split sooner'],
   correct:2},
  {q:'What connects "al-Karim" (82:6) and "Kiraman Katibin" (82:11)?',
   opts:['There is no real connection between these two phrases',
         'Both describe different aspects of the Day of Judgment',
         'Both phrases describe different types of angels here',
         'Both use karim/kiram — divine nobility runs through this surah'],
   correct:3},
];

function renderSection2Game(){renderDragDrop(2,S1_ITEMS,S1_ZONES);}function checkSection2(){checkDragDrop(2,S1_ZONES);}
function renderSection3Game(){renderQuiz(3,S2_QUIZ);}function checkSection3(){checkQuiz(3,S2_QUIZ);}
function renderSection4Game(){renderDragDrop(4,S3_ITEMS,S3_ZONES);}function checkSection4(){checkDragDrop(4,S3_ZONES);}
function renderSection5Game(){renderQuiz(5,S4_QUIZ);}function checkSection5(){checkQuiz(5,S4_QUIZ);}
function renderSection6Game(){renderQuiz(6,S5_QUIZ);}function checkSection6(){checkQuiz(6,S5_QUIZ);}
function renderSection7Game(){renderQuiz(7,S6_QUIZ);}function checkSection7(){checkQuiz(7,S6_QUIZ);}

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
