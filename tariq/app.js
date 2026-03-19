'use strict';
/* SURAH AT-TARIQ (86) — app.js */
window.STORAGE_KEY='tariqQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s1Checked:false,s2Answers:{},s2Checked:false,s3Answers:{},s3Checked:false,s4Answers:{},s4Checked:false,s5Checked:false,s6Answers:{},s6Checked:false};

const REWARDS={
  1:{xp:80,gems:3,icon:'💫',title:'THE PIERCING STAR KNOWN!',msg:"SubhanAllah! 'Al-Tariq' — the night comer. 'Al-najm al-thaqib' — the PIERCING star. A star so brilliant it pierces through the darkness of night. And the conclusion: 'In kullu nafsin lamma alayha hafidh.' Every single soul has a guardian over it. Right now — you are watched, protected, and recorded. Never think you are unguarded!"},
  2:{xp:80,gems:3,icon:'💧',title:'YOUR ORIGIN UNDERSTOOD!',msg:"Allahu Akbar! 'Fa-l-yandhur al-insan mimma khuliq — khuliq min ma\'in dafiq.' Let man OBSERVE what he was created from — from gushing, rushing water! From such a humble origin, Allah fashioned a thinking, feeling human being. And the proof of resurrection: 'Innahu \'ala raj\'ihi la-qadir.' He who created from nothing can RECREATE perfectly."},
  3:{xp:90,gems:3,icon:'🔍',title:'THE SECRETS EXAMINED!',msg:"MashAllah! 'Yawma tubla al-sara\'ir.' The Day secrets are EXAMINED — tested through and through. Everything hidden, every private act, every concealed hypocrisy — brought out and examined perfectly. And on That Day: no power, no helper. Only what you prepared. Make sure your private reality matches your public appearance!"},
  4:{xp:90,gems:4,icon:'📖',title:'THE DECISIVE WORD GRASPED!',msg:"SubhanAllah! 'Innahu la-qawlun fasl — wa ma huwa bi-al-hazl.' The Quran is a DECISIVE, SEPARATING word — not jest, not play, not entertainment. It separates truth from falsehood. When you recite it, you are reciting the most serious, consequential words in existence. Treat the Quran with the gravity it deserves!"},
  5:{xp:100,gems:4,icon:'🌧️',title:'RAIN AND RESURRECTION!',msg:"Allahu Akbar! 'Wa al-sama\' dhat al-raj\' — wa al-ardh dhat al-sad\'.' By the sky that RETURNS (rain) and the earth that SPLITS OPEN (for plants). Allah swears by the water cycle as proof of resurrection. The same Allah who sends rain to a dead earth and brings it back to life — will bring dead humans back to life. Same principle, same power!"},
  6:{xp:120,gems:5,icon:'⚡',title:'SURAH AT-TARIQ COMPLETE!',msg:"ALLAHUMMA BARIK! All 6 levels of Surah At-Tariq complete! The piercing star. Created from water. Secrets examined. The decisive Quran. Rain as proof. And: 'Innahum yakiduna kaydan — wa akidu kaydan.' They plot. Allah plans. 'Fa-mahhil al-kafirin amhilhum ruwayda.' The plan is already in motion. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:6,rewards:REWARDS,
  tileIcons:['💫','💧','🔍','📖','🌧️','⚡'],
  tileLabels:['Night Star','From Water','Secrets','Decisive','Rain/Rise','They Plot'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah At-Tariq — The Night Comer! The piercing star that lights the night. Created from water — Allah can recreate you. Your secrets will be examined. The Quran is decisive. And Allah's plan defeats all plotting. 6 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Al-najm al-thaqib" — keep shining through the darkness! 💫`,
    complete:name=>`MashAllah, ${name}! Surah At-Tariq complete! "Innahu la-qawlun fasl." A decisive word. May our deeds be decisive on That Day. Ameen! ⚡`,
  },
};

const S1_ITEMS=[{id:'i1',text:'🌙 Al-Tariq\nNight Comer',zone:'z1'},{id:'i2',text:'💫 Al-Najm\nAl-Thaqib',zone:'z2'},{id:'i3',text:'👁️ Hafidh\nGuardian',zone:'z3'}];
const S1_ZONES=[{id:'z1',desc:'"Wa al-sama\' wa al-Tariq" (86:1) — By the sky and the night comer. "Tariq" from "tariqa" — to knock on a door at night, to come by night. The "tariq" comes unexpectedly in darkness. Applied to the piercing star — it appears in the night sky and knocks on the eye with its brilliance.'},{id:'z2',desc:'"Al-najm al-thaqib" (86:3) — The PIERCING star. "Thaqib" from "thaqaba" — to pierce, drill through, penetrate. A star so brilliant it pierces through the darkness of night. Modern understanding: this may refer to a pulsar — a neutron star that pulses brilliantly. 1400 years before pulsars were discovered!'},{id:'z3',desc:'"In kullu nafsin lamma alayha hafidh" (86:4) — There is no soul except that it has over it a GUARDIAN. "Hafidh" — a protector, preserver, guardian. Every human being has a guardian angel watching over them — their deeds recorded, their life preserved by Allah\'s command.'}];

const S2_QUIZ=[
  {q:'What does "ma\'in dafiq" (مَاءٍ دَافِقٍ) mean in 86:6?',opts:['Holy water from the sky','GUSHING/EJECTED FLUID — "dafiq" means rushing, gushing, flowing out with force. Man was created from a humble fluid that surges forth. Allah reminds the proud human of his humble physical origin.','Rainwater that falls from clouds','The water of Zamzam in Makkah'],correct:1},
  {q:'"Yakhruju min bayn al-sulb wa al-tara\'ib" (86:7) — what are "sulb" and "tara\'ib"?',opts:['The head and the feet','SULB (backbone/spine) and TARA\'IB (ribs/chest area). The fluid comes from between the backbone and the ribcage. A precise anatomical reference — 1400 years before modern reproductive science confirmed the general area.','The stomach and the kidneys','The heart and the lungs'],correct:1},
  {q:'What does "innahu \'ala raj\'ihi la-qadir" (86:8) mean?',opts:['He is able to return the water to the sky','He — Allah — is ABLE to RETURN him (resurrect man). "Raj\'" means return. The One who created man the first time from this fluid — has complete power to recreate him. First creation is harder than second, yet He did both.','Man can return to his youth','Allah can return the soul to the body temporarily'],correct:1},
  {q:'Why does Allah remind man of his humble origin (created from fluid) in this surah?',opts:['To embarrass man about his physical nature','To produce HUMILITY and ACCOUNTABILITY. A person who remembers "I came from a drop of fluid" is less likely to be proud, heedless, and dismissive of accountability. The same Allah who created you from nothing WILL hold you accountable. How can you be arrogant?','To discourage pride in wealth and beauty only','To remind people of their biological similarity to animals'],correct:1},
];

const S3_QUIZ=[
  {q:'What does "tubla al-sara\'ir" (تُبْلَى السَّرَائِر) mean in 86:9?',opts:['Secrets will be hidden on That Day','Secrets will be TRIED/EXAMINED/TESTED — "tubla" from "bala" means to test, try, examine. "Al-sara\'ir" — the hidden things, inner realities, secrets. Everything concealed will be brought out and examined completely on That Day.','Everyone will reveal their own secrets voluntarily','Only major secrets will be investigated'],correct:1},
  {q:'What kinds of things are included in "al-sara\'ir" (secrets)?',opts:['Only crimes committed against other people','ALL hidden matters: secret sins, concealed hypocrisy, private good deeds done for show, real intentions behind apparent worship, hidden hatred, unrevealed disbelief, private charity done with arrogance. Everything inner becomes outer.','Only religious sins, not worldly ones','Only sins that others knew about'],correct:1},
  {q:'"Fa-ma lahu min quwwatin wa la nasir" (86:10) — what does this tell us about preparation?',opts:['We should not plan for death as it will happen regardless','On That Day: no personal POWER and no HELPER. This means: the only "preparation" that works must be done NOW, in this life. There will be no borrowing of good deeds, no powerful ally, no wealth to pay for a pass. What you built in this life is all you have.','We should ask others to pray for us after death','We should donate money to ensure our place in Paradise'],correct:1},
  {q:'How does knowing "secrets will be examined" change daily private behavior?',opts:['It makes private actions irrelevant since they\'re already recorded','It elevates the importance of PRIVATE worship. If secrets will be examined — then your private Quran recitation, your private charity, your private midnight prayer, your private sincere repentance — all of it will be seen and valued. The private self is the real self.','It means we should only do good deeds publicly','It has no practical effect on daily life'],correct:1},
];

const S4_QUIZ=[
  {q:'What does "qawlun fasl" (قَوْلٌ فَصْلٌ) mean in 86:13?',opts:['A poetic and artistic word','A DECISIVE/SEPARATING word — "fasl" means to separate clearly, to distinguish, to decide. The Quran makes a clear, definitive cut between truth and falsehood. It doesn\'t blur — it separates and decides.','A gentle and soft word','An incomplete and developing word'],correct:1},
  {q:'What does "wa ma huwa bi-al-hazl" (86:14) mean?',opts:['It is not a very old book','It is NOT amusement/jest/play — "hazl" is the opposite of seriousness. The Quran is not entertainment to be enjoyed superficially and then set aside. It is the most serious communication in existence — from the Creator to His creation.','It is not written in Arabic originally','It is not for everyone to understand'],correct:1},
  {q:'The Quran is called "qawlun fasl" — a decisive word. What does it separate?',opts:['Different sects of Muslims from each other','TRUTH from FALSEHOOD, RIGHT from WRONG, GUIDANCE from MISGUIDANCE. In theology: it decides between true monotheism and shirk. In ethics: it decides what is permissible and forbidden. In the final judgment: its teachings separate the people of Paradise from the people of Hell.','Those who memorize it from those who don\'t','Ancient wisdom from modern knowledge'],correct:1},
  {q:'How should "the Quran is not jest" affect how Muslims treat the Quran?',opts:['Quran should only be read by scholars with proper training','With SERIOUSNESS, PRESENCE, and REFLECTION. Not just reciting for sound — but for meaning. Not treating it as background music or cultural decoration — but as the decisive word of Allah that requires engagement, understanding, and action.','Quran should never be translated to other languages','Quran should only be read in ritual prayer'],correct:1},
];

const S5_QUIZ=[
  {q:'What is "al-sama\' dhat al-raj\'" (السَّمَاءِ ذَاتِ الرَّجْع) in 86:11?',opts:['The sky that shakes before the end of the world','The sky that RETURNS/GIVES BACK — it returns rain to earth. The water cycle: evaporation rises, clouds form, rain returns. Allah swears by this natural cycle of return as evidence for resurrection — the ultimate return.','The sky that returns to its original form','The sky that brings back the souls after death'],correct:1},
  {q:'What is "al-ardh dhat al-sad\'" (الْأَرْضِ ذَاتِ الصَّدْع) in 86:12?',opts:['The earth that shakes in earthquakes','The earth that SPLITS/CRACKS open — for plants bursting through the ground. Dead seeds under dead earth split the ground when rain comes. This cracking open is the proof: the same earth that splits for plants will split for resurrection.','The earth that cracks from thirst without water','The earth that separates from the sky'],correct:1},
  {q:'What is the logical argument linking rain/plants (86:11-12) to resurrection?',opts:['Rain and plants are only used as beautiful poetic imagery','If you see it happening EVERY YEAR — dead earth receiving water, splitting open, producing life from nothing — how can you doubt that Allah can do this once more at resurrection? The One who does this annually can easily do it once finally.','Rain happens by natural laws, not Allah\'s direct action','The connection is only for people who live in agricultural societies'],correct:1},
  {q:'Why does Allah swear by natural phenomena (sky, earth) to make His arguments?',opts:['Because these are the most beautiful things in creation','These phenomena are VISIBLE EVIDENCE that everyone sees and cannot deny. By swearing by them and linking them to resurrection, Allah is saying: you accept these natural processes — now accept that the same Power behind them will bring resurrection.','Because humans in Arabia didn\'t understand spiritual arguments','To show that nature is more important than revelation'],correct:1},
];

const S6_QUIZ=[
  {q:'"Innahum yakiduna kaydan — wa akidu kaydan" (86:15-16) — what is the key contrast?',opts:['Both Allah and humans plot equal plots that may or may not succeed','Human plotting vs. DIVINE PLANNING. "Kayd" means scheming, plotting, planning. The disbelievers plot against Islam — and Allah counters with His own plan. But His "kayd" is infinite, all-knowing, all-powerful. Their plotting is used by Allah as part of His own plan to strengthen the believers.','Allah\'s plot is to punish immediately','Allah never actually plans against wrongdoers'],correct:1},
  {q:'"Fa-mahhil al-kafirin, amhilhum ruwayda" (86:17) — what does "ruwayda" mean?',opts:['Forever, without limit','GENTLY/SLOWLY/GRADUALLY — give them a brief respite. "Ruwayda" is a diminutive implying: just a little time. The disbelievers are given a SHORT reprieve. This is not permission for them — it is Allah giving them just enough time before His plan is executed.','Immediately and without delay','Until they repent and become believers'],correct:1},
  {q:'What is the overall reassurance that At-Tariq gives to believers facing opposition?',opts:['Believers should fight back against every attack immediately','The night has a piercing star. Every soul is guarded. Allah created you from a drop — He can recreate you. Your secrets will be examined. The Quran is decisive. And their plotting? Allah is already planning His response. YOU are not alone, unguarded, or forgotten.','Believers will always win in this world against enemies','Allah only helps believers after they help themselves first'],correct:1},
  {q:'How does the image of "al-tariq" (the night comer, the piercing star) relate to the believer\'s condition?',opts:['Believers should come to prayer only at night like the tariq star','The believer is like al-tariq — appearing in the darkness of a heedless world, piercing through the darkness with the light of faith. Even one person of faith standing firm in a corrupt environment is like the piercing star in a dark night — it stands out, it pierces, it guides.','Only scholars and imams are like the piercing star','The tariq star represents the Prophet ﷺ specifically, not all believers'],correct:1},
];

function renderSection1Game(){renderDragDrop(1,S1_ITEMS,S1_ZONES);}function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}function checkSection5(){checkQuiz(5,S5_QUIZ);}
function renderSection6Game(){renderQuiz(6,S6_QUIZ);}function checkSection6(){checkQuiz(6,S6_QUIZ);}

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
