'use strict';
/* SURAH AT-TARIQ (86) — app.js */
window.STORAGE_KEY='tariqQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s2Checked:false,s3Answers:{},s3Checked:false,s4Answers:{},s4Checked:false,s5Answers:{},s5Checked:false,s6Checked:false,s7Answers:{},s7Checked:false};

const REWARDS={
  1: {xp:60, gems:3, icon:'📖', title:'Words Learned!', msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:80,gems:3,icon:'💫',title:'THE PIERCING STAR KNOWN!',msg:"SubhanAllah! 'Al-Tariq' — the night comer. 'Al-najm al-thaqib' — the PIERCING star. A star so brilliant it pierces through the darkness of night. And the conclusion: 'In kullu nafsin lamma alayha hafidh.' Every single soul has a guardian over it. Right now — you are watched, protected, and recorded. Never think you are unguarded!"},
  3:{xp:80,gems:3,icon:'💧',title:'YOUR ORIGIN UNDERSTOOD!',msg:"Allahu Akbar! 'Fa-l-yandhur al-insan mimma khuliq — khuliq min ma\'in dafiq.' Let man OBSERVE what he was created from — from gushing, rushing water! From such a humble origin, Allah fashioned a thinking, feeling human being. And the proof of resurrection: 'Innahu \'ala raj\'ihi la-qadir.' He who created from nothing can RECREATE perfectly."},
  4:{xp:90,gems:3,icon:'🔍',title:'THE SECRETS EXAMINED!',msg:"MashAllah! 'Yawma tubla al-sara\'ir.' The Day secrets are EXAMINED — tested through and through. Everything hidden, every private act, every concealed hypocrisy — brought out and examined perfectly. And on That Day: no power, no helper. Only what you prepared. Make sure your private reality matches your public appearance!"},
  5:{xp:90,gems:4,icon:'📖',title:'THE DECISIVE WORD GRASPED!',msg:"SubhanAllah! 'Innahu la-qawlun fasl — wa ma huwa bi-al-hazl.' The Quran is a DECISIVE, SEPARATING word — not jest, not play, not entertainment. It separates truth from falsehood. When you recite it, you are reciting the most serious, consequential words in existence. Treat the Quran with the gravity it deserves!"},
  6:{xp:100,gems:4,icon:'🌧️',title:'RAIN AND RESURRECTION!',msg:"Allahu Akbar! 'Wa al-sama\' dhat al-raj\' — wa al-ardh dhat al-sad\'.' By the sky that RETURNS (rain) and the earth that SPLITS OPEN (for plants). Allah swears by the water cycle as proof of resurrection. The same Allah who sends rain to a dead earth and brings it back to life — will bring dead humans back to life. Same principle, same power!"},
  7:{xp:120,gems:5,icon:'⚡',title:'SURAH AT-TARIQ COMPLETE!',msg:"ALLAHUMMA BARIK! All 7 levels of Surah At-Tariq complete! The piercing star. Created from water. Secrets examined. The decisive Quran. Rain as proof. And: 'Innahum yakiduna kaydan — wa akidu kaydan.' They plot. Allah plans. 'Fa-mahhil al-kafirin amhilhum ruwayda.' The plan is already in motion. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:7,rewards:REWARDS,
  tileIcons:['📖','💫','💧','🔍','📖','🌧️','⚡'],
  tileLabels:['Word by Word','Night Star','From Water','Secrets','Decisive','Rain/Rise','They Plot'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah At-Tariq — The Night Comer! The piercing star that lights the night. Created from water — Allah can recreate you. Your secrets will be examined. The Quran is decisive. And Allah's plan defeats all plotting. 7 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Al-najm al-thaqib" — keep shining through the darkness! 💫`,
    complete:name=>`MashAllah, ${name}! Surah At-Tariq complete! "Innahu la-qawlun fasl." A decisive word. May our deeds be decisive on That Day. Ameen! ⚡`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'86:1 — وَالسَّمَاءِ وَالطَّارِقِ', words:[
    {ar:'وَالطَّارِقِ', tr:'wal-ṭāriq', en:'and the night-comer', freq:2},
    {ar:'وَالسَّمَاءِ', tr:'wal-samāʾi', en:'by the sky', freq:120},
  ]},
  {label:'86:2 — وَمَا أَدْرَاكَ مَا الطَّارِقُ', words:[
    {ar:'الطَّارِقُ', tr:'al-ṭāriq', en:'the night-comer', freq:2},
    'ma',
    {ar:'أَدْرَاكَ', tr:'adrāka', en:'will make you know', freq:13},
    {ar:'وَمَا', tr:'wa-mā', en:'and what', freq:2005},
  ]},
  {label:'86:3 — النَّجْمُ الثَّاقِبُ', words:[
    {ar:'الثَّاقِبُ', tr:'al-thāqib', en:'the piercing', freq:2},
    {ar:'النَّجْمُ', tr:'al-najm', en:'the star', freq:4},
  ]},
  {label:'86:4 — إِن كُلُّ نَفْسٍ لَّمَّا عَلَيْهَا حَافِظٌ', words:[
    {ar:'حَافِظٌ', tr:'ḥāfiẓ', en:'a guardian', freq:10},
    {ar:'عَلَيْهَا', tr:'ʿalayhā', en:'over it', freq:34},
    {ar:'لَّمَّا', tr:'lammā', en:'except', freq:4},
    {ar:'نَفْسٍ', tr:'nafsin', en:'soul', freq:295},
    {ar:'كُلُّ', tr:'kullu', en:'every', freq:330},
    {ar:'إِن', tr:'in', en:'there is no', freq:743},
  ]},
  {label:'86:5 — فَلْيَنظُرِ الْإِنسَانُ مِمَّ خُلِقَ', words:[
    {ar:'خُلِقَ', tr:'khuliqa', en:'he was created', freq:29},
    {ar:'مِمَّ', tr:'mimma', en:'from what', freq:8},
    {ar:'الْإِنسَانُ', tr:'al-insān', en:'man', freq:65},
    {ar:'فَلْيَنظُرِ', tr:'fal-yanẓur', en:'so let him look', freq:33},
  ]},
  {label:'86:6 — خُلِقَ مِن مَّاءٍ دَافِقٍ', words:[
    {ar:'دَافِقٍ', tr:'dāfiq', en:'gushing', freq:1},
    {ar:'مَّاءٍ', tr:'māʾ', en:'water / fluid', freq:63},
    'min',
    {ar:'خُلِقَ', tr:'khuliqa', en:'he was created', freq:29},
  ]},
  {label:'86:7 — يَخْرُجُ مِن بَيْنِ الصُّلْبِ وَالتَّرَائِبِ', words:[
    {ar:'وَالتَّرَائِبِ', tr:'wal-tarāʾib', en:'and the ribs', freq:1},
    {ar:'الصُّلْبِ', tr:'al-ṣulb', en:'the backbone', freq:1},
    {ar:'بَيْنِ', tr:'bayni', en:'between', freq:160},
    'min',
    {ar:'يَخْرُجُ', tr:'yakhruju', en:'it comes forth', freq:30},
  ]},
  {label:'86:8 — إِنَّهُ عَلَىٰ رَجْعِهِ لَقَادِرٌ', words:[
    {ar:'لَقَادِرٌ', tr:'la-qādir', en:'surely Able', freq:45},
    {ar:'رَجْعِهِ', tr:'rajʿihi', en:'his return', freq:3},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'upon', freq:471},
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed He', freq:98},
  ]},
  {label:'86:9 — يَوْمَ تُبْلَى السَّرَائِرُ', words:[
    {ar:'السَّرَائِرُ', tr:'al-sarāʾir', en:'the secrets', freq:1},
    {ar:'تُبْلَى', tr:'tublā', en:'are examined', freq:1},
    'yawma',
  ]},
  {label:'86:10 — فَمَا لَهُ مِن قُوَّةٍ وَلَا نَاصِرٍ', words:[
    {ar:'نَاصِرٍ', tr:'nāṣir', en:'helper', freq:14},
    'wala',
    {ar:'قُوَّةٍ', tr:'quwwatin', en:'strength', freq:42},
    'min',
    {ar:'لَهُ', tr:'lahu', en:'for him', freq:860},
    {ar:'فَمَا', tr:'fa-mā', en:'then not', freq:2005},
  ]},
  {label:'86:11 — وَالسَّمَاءِ ذَاتِ الرَّجْعِ', words:[
    {ar:'الرَّجْعِ', tr:'al-rajʿ', en:'the return (rain)', freq:3},
    {ar:'ذَاتِ', tr:'dhāti', en:'possessor of', freq:38},
    {ar:'وَالسَّمَاءِ', tr:'wal-samāʾi', en:'by the sky', freq:120},
  ]},
  {label:'86:12 — وَالْأَرْضِ ذَاتِ الصَّدْعِ', words:[
    {ar:'الصَّدْعِ', tr:'al-ṣadʿ', en:'the splitting', freq:1},
    {ar:'ذَاتِ', tr:'dhāti', en:'possessor of', freq:38},
    {ar:'وَالْأَرْضِ', tr:'wal-arḍi', en:'and the earth', freq:95},
  ]},
  {label:'86:13 — إِنَّهُ لَقَوْلٌ فَصْلٌ', words:[
    {ar:'فَصْلٌ', tr:'faṣl', en:'decisive', freq:5},
    {ar:'لَقَوْلٌ', tr:'la-qawlun', en:'surely a word', freq:92},
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed it', freq:98},
  ]},
  {label:'86:14 — وَمَا هُوَ بِالْهَزْلِ', words:[
    {ar:'بِالْهَزْلِ', tr:'bil-hazl', en:'in jest', freq:1},
    'huwa',
    {ar:'وَمَا', tr:'wa-mā', en:'and not', freq:2005},
  ]},
  {label:'86:15 — إِنَّهُمْ يَكِيدُونَ كَيْدًا', words:[
    {ar:'كَيْدًا', tr:'kaydan', en:'a plot', freq:35},
    {ar:'يَكِيدُونَ', tr:'yakīdūna', en:'they are plotting', freq:3},
    {ar:'إِنَّهُمْ', tr:'innahum', en:'indeed they', freq:50},
  ]},
  {label:'86:16 — وَأَكِيدُ كَيْدًا', words:[
    {ar:'كَيْدًا', tr:'kaydan', en:'a plan', freq:35},
    {ar:'وَأَكِيدُ', tr:'wa-akīdu', en:'and I plan', freq:1},
  ]},
  {label:'86:17 — فَمَهِّلِ الْكَافِرِينَ أَمْهِلْهُمْ رُوَيْدًا', words:[
    {ar:'رُوَيْدًا', tr:'ruwaydan', en:'a little while', freq:1},
    {ar:'أَمْهِلْهُمْ', tr:'amhilhum', en:'give them respite', freq:1},
    {ar:'الْكَافِرِينَ', tr:'al-kāfirīn', en:'the disbelievers', freq:525},
    {ar:'فَمَهِّلِ', tr:'fa-mahhil', en:'so allow time', freq:1},
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS=[{id:'i1',text:'الطَّارِقِ',zone:'z1'},{id:'i2',text:'النَّجْمُ\nالثَّاقِبُ',zone:'z2'},{id:'i3',text:'حَافِظٌ',zone:'z3'}];
const S1_ZONES=[{id:'z1',desc:'"Wa al-sama\' wa al-Tariq" (86:1) — By the sky and the night comer. "Tariq" from "tariqa" — to knock on a door at night, to come by night. The "tariq" comes unexpectedly in darkness. Applied to the piercing star — it appears in the night sky and knocks on the eye with its brilliance.'},{id:'z2',desc:'"Al-najm al-thaqib" (86:3) — The PIERCING star. "Thaqib" from "thaqaba" — to pierce, drill through, penetrate. A star so brilliant it pierces through the darkness of night. Modern understanding: this may refer to a pulsar — a neutron star that pulses brilliantly. 1400 years before pulsars were discovered!'},{id:'z3',desc:'"In kullu nafsin lamma alayha hafidh" (86:4) — There is no soul except that it has over it a GUARDIAN. "Hafidh" — a protector, preserver, guardian. Every human being has a guardian angel watching over them — their deeds recorded, their life preserved by Allah\'s command.'}];

const S2_QUIZ=[
  {q:'What does "ma\'in dafiq" (مَاءٍ دَافِقٍ) mean in 86:6?',
   opts:['Holy water that descends from the sky above',
         'Gushing, ejected fluid — "dafiq" means rushing out with force',
         'Rainwater that naturally falls from clouds above',
         'The blessed water of Zamzam deep in Makkah'],
   correct:1},
  {q:'"Yakhruju min bayn al-sulb wa al-tara\'ib" (86:7) — what are these?',
   opts:['The head and the feet of the human body',
         'Sulb (backbone/spine) and tara\'ib (ribs/chest area)',
         'The stomach and the kidneys of the body',
         'The heart and the lungs working together'],
   correct:1},
  {q:'What does "innahu \'ala raj\'ihi la-qadir" (86:8) mean?',
   opts:['Allah is able to return the fallen rain water to the sky',
         'Man can somehow return to his youth through Allah\'s power',
         'Allah can return the soul temporarily to a dead body',
         'Allah is ABLE to RETURN man — to resurrect him completely'],
   correct:3},
  {q:'Why does Allah remind man of his humble origin in this surah?',
   opts:['To embarrass man about his humble physical nature',
         'To discourage pride only in wealth and physical beauty',
         'To remind people of their biological similarity to animals',
         'To produce humility — he came from a drop, yet will be accountable'],
   correct:3},
];

const S3_QUIZ=[
  {q:'What does "tubla al-sara\'ir" (تُبْلَى السَّرَائِر) mean in 86:9?',
   opts:['Secrets will be carefully hidden away on That Day',
         'Everyone will voluntarily reveal their own secrets themselves',
         'Only the most major secrets will be investigated at all',
         'Secrets will be EXAMINED/TESTED — everything concealed revealed'],
   correct:3},
  {q:'What kinds of things are included in "al-sara\'ir" (secrets)?',
   opts:['Only crimes that were committed directly against other people',
         'Only religious sins, not worldly ones committed in life',
         'Only sins that at least one other person already knew about',
         'ALL hidden matters: secret sins, concealed intentions, hidden hypocrisy'],
   correct:3},
  {q:'"Fa-ma lahu min quwwatin wa la nasir" (86:10) — what does this mean?',
   opts:['We should not plan for death because it happens regardless',
         'On That Day no personal POWER and no HELPER — prepare NOW',
         'We should ask others to pray for us after we have died',
         'We should donate generously to ensure our place in Paradise'],
   correct:1},
  {q:'How does knowing "secrets will be examined" change private behaviour?',
   opts:['It makes private actions irrelevant since they\'re already recorded',
         'It means we should only do good deeds in front of others',
         'It has no real practical effect on daily private life',
         'Private worship — prayer, charity, repentance — all will be valued'],
   correct:3},
];

const S4_QUIZ=[
  {q:'What does "qawlun fasl" (قَوْلٌ فَصْلٌ) mean in 86:13?',
   opts:['A poetic and beautifully artistic word',
         'A decisive/separating word — it clearly separates truth from falsehood',
         'A gentle and comforting word for the believers',
         'An incomplete and still developing word of guidance'],
   correct:1},
  {q:'What does "wa ma huwa bi-al-hazl" (86:14) mean?',
   opts:['The Quran is not a very old or ancient book',
         'It is NOT jest/amusement — it is the most serious communication',
         'The Quran was not originally written in the Arabic language',
         'The Quran is not meant for everyone to fully understand'],
   correct:1},
  {q:'The Quran is "qawlun fasl" — a decisive word. What does it separate?',
   opts:['Different sects and groups of Muslims from each other',
         'Those who memorise it from those who do not',
         'Ancient wisdom from modern scientific knowledge',
         'Truth from falsehood, right from wrong, guidance from misguidance'],
   correct:3},
  {q:'How should "the Quran is not jest" affect how we treat it?',
   opts:['The Quran should only be read by properly trained scholars',
         'The Quran should never be translated into other languages',
         'The Quran should only be recited during the five daily prayers',
         'With seriousness and reflection — not as background decoration'],
   correct:3},
];

const S5_QUIZ=[
  {q:'What is "al-sama\' dhat al-raj\'" (السَّمَاءِ ذَاتِ الرَّجْع) in 86:11?',
   opts:['The sky that RETURNS rain — proof that Allah can resurrect',
         'The sky that shakes and trembles before the end of the world',
         'The sky that eventually returns to its original form',
         'The sky that brings back souls after death to the body'],
   correct:0},
  {q:'What is "al-ardh dhat al-sad\'" (الْأَرْضِ ذَاتِ الصَّدْع) in 86:12?',
   opts:['The earth that shakes violently during powerful earthquakes',
         'The earth that cracks from thirst when deprived of water',
         'The earth that SPLITS open as plants burst through the ground',
         'The earth that physically separates itself from the sky'],
   correct:2},
  {q:'What is the argument linking rain/plants (86:11-12) to resurrection?',
   opts:['Rain and plants are used only as beautiful poetic imagery',
         'Rain happens purely by natural laws, without Allah\'s action',
         'The argument is only relevant to agricultural societies',
         'Dead earth comes to life every year — Allah can do this once finally'],
   correct:3},
  {q:'Why does Allah swear by natural phenomena (sky, earth)?',
   opts:['Because these are simply the most beautiful things in creation',
         'Because people in Arabia didn\'t understand spiritual arguments',
         'To show that nature is more important than divine revelation',
         'These are visible evidence everyone sees — accept the same Power'],
   correct:3},
];

const S6_QUIZ=[
  {q:'"Innahum yakiduna kaydan — wa akidu kaydan" (86:15-16) — what is the contrast?',
   opts:['Allah and humans are plotting completely equal and balanced plots',
         'Allah\'s plot is simply to punish the disbelievers immediately',
         'Allah never actually plans or acts against wrongdoers at all',
         'Human plotting vs. DIVINE PLANNING — His plan encompasses theirs'],
   correct:3},
  {q:'"Fa-mahhil al-kafirin, amhilhum ruwayda" (86:17) — what does "ruwayda" mean?',
   opts:['Forever — without any time limit for the disbelievers at all',
         'Just a short, gentle respite — a brief time before His plan executes',
         'Immediately and absolutely without any delay whatsoever',
         'Until all the disbelievers repent and finally become believers'],
   correct:1},
  {q:'What is the overall reassurance Surah At-Tariq gives to believers?',
   opts:['Believers should immediately fight back against every single attack',
         'Believers will always win in this world against all their enemies',
         'Allah only helps believers after they have first helped themselves',
         'Every soul is guarded, Allah plots His response — you are not forgotten'],
   correct:3},
  {q:'How does "al-tariq" (the piercing star) relate to the believer\'s condition?',
   opts:['Believers should come to prayer only at night like the tariq',
         'Only scholars and imams are truly like the piercing star',
         'The tariq star represents the Prophet ﷺ specifically, not believers',
         'The believer pierces through a heedless world with the light of faith'],
   correct:3},
];

function renderSection2Game(){renderDragDrop(2,S1_ITEMS,S1_ZONES);}function checkSection2(){checkDragDrop(2,S1_ZONES);}
function renderSection3Game(){renderQuiz(3,S2_QUIZ);}function checkSection3(){checkQuiz(3,S2_QUIZ);}
function renderSection4Game(){renderQuiz(4,S3_QUIZ);}function checkSection4(){checkQuiz(4,S3_QUIZ);}
function renderSection5Game(){renderQuiz(5,S4_QUIZ);}function checkSection5(){checkQuiz(5,S4_QUIZ);}
function renderSection6Game(){renderQuiz(6,S5_QUIZ);}function checkSection6(){checkQuiz(6,S5_QUIZ);}
function renderSection7Game(){renderQuiz(7,S6_QUIZ);}function checkSection7(){checkQuiz(7,S6_QUIZ);}

function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#90b8e0';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#040810';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#102060';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#040810');sk.addColorStop(1,'#0c1428');ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  [[40,15],[90,8],[160,22],[220,5],[300,18],[380,10],[440,25],[510,8],[70,45],[200,38],[330,42],[460,35]].slice(0,n*2).forEach(([x,y],i)=>{ctx.fillStyle=`rgba(80,120,200,${0.3+i%3*0.2})`;ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2);ctx.fill();});
  if(n<1){_lbl(ctx,W,"💫 Complete levels to build the Night Sky!",0,6);return;}
  ctx.fillStyle='#101c28';ctx.fillRect(0,215,W,35);ctx.fillStyle='#182430';ctx.fillRect(0,215,W,5);
  if(n<2){_lbl(ctx,W,"🌙 Night sky base — 1/6",1,6);return;}
  // Pulsing star
  const pulse=0.5+Math.sin(Date.now()*0.003)*0.5;ctx.shadowColor=`rgba(216,232,255,${pulse})`;ctx.shadowBlur=15*pulse;ctx.fillStyle=`rgba(220,235,255,${0.6+pulse*0.4})`;ctx.beginPath();ctx.arc(W/2,H*0.3,8,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  if(n<3){_lbl(ctx,W,"💫 Piercing star appears — 2/6",2,6);return;}
  // Water drops
  for(let d=0;d<4;d++){const dx=100+d*120,dy=H*0.6+10;ctx.fillStyle='rgba(144,184,224,0.6)';ctx.beginPath();ctx.arc(dx,dy,5,0,Math.PI*2);ctx.fill();}
  if(n<4){_lbl(ctx,W,"💧 Water of creation — 3/6",3,6);return;}
  // Quran tablet
  fillRect(ctx,W-80,70,55,70,'#0c1428');ctx.strokeStyle='rgba(144,184,224,0.8)';ctx.lineWidth=1;ctx.strokeRect(W-80,70,55,70);ctx.fillStyle='rgba(144,184,224,0.7)';ctx.font='5px serif';ctx.textAlign='center';ctx.fillText('فَصْل',W-52,108);ctx.textAlign='left';
  if(n<5){_lbl(ctx,W,"📖 Decisive Quran — 4/6",4,6);return;}
  // Rain / earth splitting
  for(let r=0;r<5;r++){ctx.fillStyle='rgba(144,184,224,0.5)';ctx.fillRect(40+r*60,50,2,25);}
  ctx.strokeStyle='rgba(144,184,224,0.3)';ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(0,220);ctx.lineTo(W,220);ctx.stroke();ctx.setLineDash([]);
  if(n<6){_lbl(ctx,W,"🌧️ Rain and earth — 5/6",5,6);return;}
  ctx.fillStyle='#90b8e0';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! 💫 AT-TARIQ COMPLETE!",W/2,240);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Innahum yakiduna kaydan — wa akidu kaydan" 86:15-16',W/2,H-2);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
