'use strict';
/* SURAH AL-BURUJ (85) — app.js */
window.STORAGE_KEY='burujQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s1Checked:false,s2Answers:{},s2Checked:false,s3Answers:{},s3Checked:false,s4Answers:{},s4Checked:false,s5Answers:{},s5Checked:false,s6Answers:{},s6Checked:false};

const REWARDS={
  1:{xp:80,gems:3,icon:'⭐',title:'THE OATHS UNDERSTOOD!',msg:"SubhanAllah! Three powerful oaths: By the sky with its constellations — by the Promised Day — by the witness and the witnessed. Allah swears by the vast, ordered sky; by the certain Day of Judgment; by the witnesses of this world and the next. These oaths certify: everything you are about to read is TRUTH."},
  2:{xp:80,gems:3,icon:'🔥',title:'THE DITCH EXPOSED!',msg:"Allahu Akbar! The People of the Ditch — 'Ashab al-Ukhdud.' The tyrant Dhunuwas dug trenches of fire in Yemen and threw believers in for refusing to abandon their faith. The persecutors sat watching, witnessing their own evil. They were 'DESTROYED.' But the believers? They entered the gardens of the Greatest Success."},
  3:{xp:90,gems:3,icon:'✊',title:'THE TRUE CRIME REVEALED!',msg:"MashAllah! 'Wa ma naqamu minhum illa an yu\'minu bi-Allah al-Aziz al-Hamid.' Their ONLY crime was believing in Allah — the Most Powerful and Most Praiseworthy. No worldly crime. No harm done to others. Just faith. This is the highest form of persecution — and the highest form of martyrdom."},
  4:{xp:90,gems:4,icon:'🌿',title:'AL-FAWZ AL-KABIR CLAIMED!',msg:"SubhanAllah! 'Lahum jannatun tajri min tahtiha al-anhar — dhalika al-fawz al-kabir.' For the believers: gardens with rivers flowing beneath. And it is called 'AL-FAWZ AL-KABIR' — THE GREAT ATTAINMENT. The believers burned in earthly ditches and entered directly into the greatest success in existence!"},
  5:{xp:100,gems:4,icon:'⚡',title:'ALLAH\'S GRIP KNOWN!',msg:"Allahu Akbar! 'Inna batsha Rabbika la-shadid.' Indeed the GRIP of your Lord is SEVERE. The tyrants who burned believers — destroyed. Pharaoh and Thamud (85:17-20) — destroyed. Allah's grip catches every oppressor perfectly. No one escapes. 'Wa Allahu min wara\'ihim muhit' — Allah surrounds them from behind (85:20)."},
  6:{xp:120,gems:5,icon:'📜',title:'SURAH AL-BURUJ COMPLETE!',msg:"ALLAHUMMA BARIK! All 6 levels of Surah Al-Buruj complete! The sky with constellations. The People of the Ditch. The only crime: faith. The great attainment. Allah's severe grip. And the Quran Majid — preserved in the Lawh al-Mahfudh, beyond all harm. May we be among the faithful. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:6,rewards:REWARDS,
  tileIcons:['⭐','🔥','✊','🌿','⚡','📜'],
  tileLabels:['The Oaths','Ditch','Their Crime','Attainment','Grip','Tablet'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Buruj — The Constellations! By the starry sky, by the Promised Day. The People of the Ditch burned for believing. Their only crime: faith in Allah. Allah's grip is severe. The Quran is Preserved forever. 6 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Wa ma naqamu minhum illa an yu\'minu bi-Allah" — They believed and stood firm. Keep going! ⭐`,
    complete:name=>`MashAllah, ${name}! Surah Al-Buruj complete! "Bal huwa Quranun Majid — fi Lawhin Mahfudh." Glorious Quran, Preserved forever. Ameen! 📜`,
  },
};

const S1_ITEMS=[{id:'i1',text:'⭐ Sky with\nBuruj',zone:'z1'},{id:'i2',text:'📅 Promised\nDay',zone:'z2'},{id:'i3',text:'👁️ Witness &\nWitnessed',zone:'z3'}];
const S1_ZONES=[{id:'z1',desc:'"Wa al-sama\' dhat al-buruj" (85:1) — By the sky possessing constellations. "Al-buruj" are the great star formations, the towers of the sky. A vast, ordered sky with permanent, majestic constellations — evidence of Allah\'s perfect creation and power.'},{id:'z2',desc:'"Wa al-yawm al-maw\'ud" (85:2) — By the Promised Day. The Day of Judgment — "maw\'ud" means promised, guaranteed. Allah swears by the certainty of the Day He Himself promised. If Allah swears by it — how real must it be?'},{id:'z3',desc:'"Wa shahedin wa mashhud" (85:3) — By the witness and the witnessed. Scholars interpret this as: Friday (witness) and Arafah (witnessed); the Prophet ﷺ (witness) and his community (witnessed); or the recording angels (witness) and the deeds (witnessed). All of human reality is being observed.'}];

const S2_QUIZ=[
  {q:'What is "al-Ukhdud" (الأُخْدُود) mentioned in 85:4?',
   opts:['A type of weapon used specifically against the believers',
         'A deep ditch/trench filled with fire to burn believers alive',
         'A prison tower where believers were locked in Arabia',
         'A mountain pass where the believers became trapped'],
   correct:1},
  {q:'What were the persecutors doing while believers burned (85:6-7)?',
   opts:['They were hiding away from the sight of Allah\'s punishment',
         'They sat at the edge of the trenches, watching and witnessing',
         'They were fleeing the scene out of their own great fear',
         'They tried to convince the believers to recant their faith'],
   correct:1},
  {q:'What happened to the believers who refused to abandon their faith?',
   opts:['They were eventually rescued and freed by a Muslim army',
         'They were enslaved for many years and eventually released',
         'They escaped the persecution and founded a new community',
         'They were burned alive — tradition says they entered Paradise directly'],
   correct:3},
  {q:'What does "Qutila ashab al-ukhdud" (85:4) refer to?',
   opts:['It refers to the believers who were thrown into the ditch',
         '"Qutila" is a curse against the PERSECUTORS who dug the ditch',
         'The ditch itself and the fire that burned within it',
         'Both the believers and the persecutors are referred to'],
   correct:1},
];

const S3_QUIZ=[
  {q:'What was the ONLY reason the believers were persecuted (85:8)?',
   opts:['They attacked and physically challenged the king\'s army',
         'They refused to pay the required taxes to the tyrant',
         'Their only "crime" was believing in Allah, the Mighty and Praiseworthy',
         'They preached loudly in public and disturbed the city\'s peace'],
   correct:2},
  {q:'Why does Allah specifically mention "al-Aziz" and "al-Hamid" in 85:8?',
   opts:['Because these are simply the two most important names of Allah',
         'Because these names specifically protect believers from fire',
         'Because the people of Yemen believed only in these two names',
         'The powerless believers clung to THE Mighty and THE Praiseworthy'],
   correct:3},
  {q:'"Wa Allah \'ala kulli shay\'in shahid" — what does this mean in context?',
   opts:['Allah watches from a distance without directly intervening',
         'Allah witnesses only the most important events in history',
         'Allah witnesses only the believers and not the oppressors',
         'Allah is WITNESS to every burning, every scream — justice WILL come'],
   correct:3},
  {q:'What is the deeper lesson about persecution of believers in history?',
   opts:['Believers should always immediately fight back physically',
         'Believers should gain political power before practising openly',
         'Oppressors seem to win in this world but Allah surrounds them',
         'Allah prevents all persecution of believers in this world'],
   correct:2},
];

const S4_QUIZ=[
  {q:'What is "al-Fawz al-Kabir" (الفَوْزُ الكَبِير) in 85:11?',opts:['A small victory in this world','THE GREAT ATTAINMENT/SUCCESS — "fawz" means winning, success, attainment; "kabir" means GREAT. Allah could have said "fawz" — just success. He added "kabir" — GREAT success. The gardens with flowing rivers for the believers who endured persecution is the GREATEST possible success.','The final battle won by the believers','Just another name for Paradise'],correct:1},
  {q:'"Lahum jannatun tajri min tahtiha al-anhar" — what is special about "gardens beneath which rivers flow"?',opts:['The rivers are literal physical rivers like Nile and Euphrates','This is one of the most repeated descriptions of Paradise — "tajri min tahtiha al-anhar" (beneath which rivers flow). The believers who were thrown into fire on earth will have rivers flowing beneath them in the next life. The contrast is complete: earthly fire → heavenly water.','The rivers flow above the trees of Paradise','The gardens have no specific features except their size'],correct:1},
  {q:'Who specifically receives "al-Fawz al-Kabir" according to 85:11?',opts:['Only those who died as martyrs','Specifically: "alladhina amanu wa \'amilu al-salihat" — those who BELIEVED AND DID RIGHTEOUS DEEDS. Both conditions. Faith alone is not mentioned — but in the context of the People of the Ditch who proved their faith through ultimate sacrifice, this includes the martyrs and all faithful believers.','Only the prophets and their companions','Those who memorised the Quran'],correct:1},
  {q:'Why does this verse appear immediately after the story of the Ditch (85:4-10)?',opts:['To show that the story of the Ditch has a happy ending for the tyrants too','As an immediate response to the persecution: yes, the believers burned in the ditch. But here is where they went: gardens with rivers — the GREAT attainment. The Quran doesn\'t let the story of martyrdom end in tragedy. It ends in the greatest possible victory.','To show that paradise is only for martyrs','To warn that good deeds must follow faith'],correct:1},
];

const S5_QUIZ=[
  {q:'"Inna batsha Rabbika la-shadid" (85:12) — what does this verse tell us about justice?',opts:['Allah\'s punishment is quick and immediate in this world','Allah\'s GRIP/GRASP is SEVERE. "Batsh" means the seizure, the grip, the taking — when Allah takes hold of an oppressor, His grip is severe and inescapable. The tyrants who burned believers were eventually destroyed. Pharaoh drowned. Thamud was wiped out. Allah\'s grip comes — even if delayed.','Only the worst criminals face Allah\'s grip','Allah only punishes in the afterlife, not in this world'],correct:1},
  {q:'Pharaoh (Fir\'awn) and Thamud are mentioned in 85:17-20. Why are they examples in this surah?',opts:['Because they had the largest armies in history','As historical proof that "Allah\'s grip is severe." Both Pharaoh — with his vast army and power — and Thamud — with their strength and civilisation — were destroyed when they persecuted believers and rejected Allah. They are precedents showing what awaits those who oppose Allah.','Because they believed and then rejected faith','Because they were in the time of the People of the Ditch'],correct:1},
  {q:'"Wa Allahu min wara\'ihim muhit" (85:20) — what does "Allah surrounds them from behind" mean?',opts:['Allah only watches from a distance','The oppressors think they are free, unconstrained, beyond reach — but Allah ENCOMPASSES them from behind, surrounds them completely. There is no direction they can flee, no protection that saves them. Their apparent freedom is an illusion — they are completely surrounded by Allah\'s knowledge and power.','Allah literally circles around the oppressors','Allah only surrounds believers to protect them'],correct:1},
  {q:'How does knowing "Allah\'s grip is severe" affect a believer facing oppression?',opts:['It makes the believer want to take immediate revenge','It gives PATIENCE and CERTAINTY. If you know that the oppressor will face Allah\'s severe grip — perfectly, inescapably — you can endure injustice with patience and certainty. The People of the Ditch faced the fire with this certainty. Their oppressors were destroyed.','It teaches that injustice should be ignored','It means believers should not pray for justice'],correct:1},
];

const S6_QUIZ=[
  {q:'What does "Quranun Majid" (قُرْآنٌ مَّجِيد) in 85:21 mean?',opts:['A Quran that was difficult to understand','A GLORIOUS/MAGNIFICENT Quran — "majid" from "majd" meaning glory, honour, greatness, nobility. The Quran is not just a book — it is the most glorious book in existence, whose every word carries the glory of Allah.','A Quran that many people recite','An old and ancient Quran that has been preserved'],correct:1},
  {q:'What is "Lawh al-Mahfudh" (لَوْحٍ مَّحْفُوظٍ) in 85:22?',opts:['A physical stone tablet kept in Makkah','The PRESERVED TABLET — the original, primordial record of everything Allah has decreed and all He has revealed. The Quran existed in the Lawh al-Mahfudh before it was revealed to the Prophet ﷺ. It is beyond all harm, tampering, or loss — preserved with Allah.','A backup copy of the Quran in Paradise','The tablet on which the Prophet ﷺ wrote his revelations'],correct:1},
  {q:'What is the significance of ending this surah with the Preserved Tablet after the story of persecution?',opts:['It means persecuted believers can read the Quran to feel better','The persecutors burned believers, attacked the faith, tried to destroy it. But the Quran answers: "Bal huwa Quranun Majid — fi Lawhin Mahfudh." RATHER, it is a Glorious Quran — PRESERVED. You cannot touch it. You cannot destroy it. The torturers are gone; the Quran endures, perfectly preserved.','It shows that the Quran was revealed as a response to persecution','It means the Preserved Tablet was shown to the believers in the Ditch'],correct:1},
  {q:'What is the overall message of Surah Al-Buruj for believers facing hardship?',opts:['Avoid all situations that might lead to persecution','The sky with constellations witnesses everything. The Promised Day is certain. The persecutors face Allah\'s severe grip. The believers receive the Greatest Attainment. And the Quran — the source of their faith — is Glorious and Preserved forever. THEREFORE: hold onto faith no matter the cost.','Only major prophets faced real persecution','We should study history to avoid repeating the mistakes of the past'],correct:1},
];

function renderSection1Game(){renderDragDrop(1,S1_ITEMS,S1_ZONES);}function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}function checkSection5(){checkQuiz(5,S5_QUIZ);}
function renderSection6Game(){renderQuiz(6,S6_QUIZ);}function checkSection6(){checkQuiz(6,S6_QUIZ);}

function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#c8b030';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#04080e';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#182880';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#04080e');sk.addColorStop(1,'#0e1828');ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  const pts=[[40,15],[90,8],[160,22],[220,5],[300,18],[380,10],[440,25],[510,8],[70,45],[200,38],[330,42],[460,35],[140,55],[290,60],[420,50]];
  pts.slice(0,n*3).forEach(([x,y],i)=>{ctx.fillStyle=`rgba(100,140,220,${0.3+i%3*0.2})`;ctx.beginPath();ctx.arc(x,y,i%3===0?2:1.2,0,Math.PI*2);ctx.fill();});
  if(n<1){_lbl(ctx,W,"⭐ Complete levels to build the Constellation Sky!",0,6);return;}
  ctx.fillStyle='#121e28';ctx.fillRect(0,210,W,40);ctx.fillStyle='#182838';ctx.fillRect(0,210,W,5);
  if(n<2){_lbl(ctx,W,"⭐ Constellation sky revealed — 1/6",1,6);return;}
  // Fire trench
  fillRect(ctx,W/2-80,190,160,20,'#200808');for(let f=0;f<7;f++){const fx=W/2-65+f*20,fh=10+f%3*5;ctx.fillStyle=`rgba(200,${40+f*12},10,0.8)`;ctx.beginPath();ctx.moveTo(fx+3,210);ctx.lineTo(fx,210-fh);ctx.lineTo(fx+6,210);ctx.fill();}
  if(n<3){_lbl(ctx,W,"🔥 Ditch of fire — 2/6",2,6);return;}
  // Constellations connected
  const con=[[80,30],[100,20],[120,35],[95,45],[80,30]];ctx.strokeStyle='rgba(200,176,48,0.5)';ctx.lineWidth=1;ctx.beginPath();con.forEach(([x,y],i)=>{if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.stroke();con.forEach(([x,y])=>{ctx.fillStyle='rgba(200,176,48,0.8)';ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();});
  if(n<4){_lbl(ctx,W,"⭐ Constellations mapped — 3/6",3,6);return;}
  // Garden
  ctx.fillStyle='rgba(40,180,80,0.2)';ctx.fillRect(350,175,180,35);ctx.fillStyle='rgba(30,100,200,0.4)';ctx.fillRect(360,190,160,12);[[370,170],[400,165],[430,172],[460,168]].forEach(([tx,ty])=>{ctx.fillStyle='#1a3808';ctx.fillRect(tx-2,ty,4,20);ctx.fillStyle='#0a2808';ctx.fillRect(tx-6,ty-12,12,16);});
  if(n<5){_lbl(ctx,W,"🌿 Gardens of Fawz al-Kabir — 4/6",4,6);return;}
  // Preserved tablet glow
  ctx.shadowColor='rgba(200,176,48,0.5)';ctx.shadowBlur=12;fillRect(ctx,W/2-30,80,60,70,'#0e1828');ctx.strokeStyle='rgba(200,176,48,0.8)';ctx.lineWidth=1;ctx.strokeRect(W/2-30,80,60,70);ctx.shadowBlur=0;ctx.fillStyle='rgba(200,176,48,0.7)';ctx.font='6px serif';ctx.textAlign='center';ctx.fillText('قُرْآن',W/2,115);ctx.fillText('مَجِيد',W/2,128);ctx.textAlign='left';
  if(n<6){_lbl(ctx,W,"📜 Preserved Tablet appears — 5/6",5,6);return;}
  ctx.fillStyle='#c8b030';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! ⭐ AL-BURUJ COMPLETE!",W/2,237);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Bal huwa Quranun Majid — fi Lawhin Mahfudh" 85:21-22',W/2,H-2);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
