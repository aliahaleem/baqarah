'use strict';
/* SURAH AL-ALA (87) — app.js */
window.STORAGE_KEY='alaQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s1Checked:false,s2Answers:{},s2Checked:false,s3Answers:{},s3Checked:false,s4Answers:{},s4Checked:false,s5Answers:{},s5Checked:false,s6Answers:{},s6Checked:false};

const REWARDS={
  1:{xp:80,gems:3,icon:'🌿',title:'GLORIFY THE MOST HIGH!',msg:"SubhanAllah — Subhana Rabbiya Al-A\'la! When you say these words in sujood (prostration), you are directly reciting Surah Al-Ala verse 1! The Prophet ﷺ commanded this du'a in sujood after this surah was revealed. Every sajdah, every prayer — you glorify the Most High with His own words. SubhanAllah!"},
  2:{xp:80,gems:3,icon:'📿',title:'THE PROMISE OF MEMORY!',msg:"Allahu Akbar! 'Sanuqri\'uka fa-la tansa!' We will make you RECITE and you will NOT FORGET. This was a divine promise to Prophet Muhammad ﷺ — the Quran would be preserved in his memory perfectly. And through him and the Ummah: the Quran has been memorised by millions across 1400+ years! The promise is fulfilled daily."},
  3:{xp:90,gems:3,icon:'🤲',title:'KHASHYAH OPENS THE HEART!',msg:"MashAllah! 'Sayyadhdhakkaru man yakhsha.' The one who FEARS Allah with awe will be reminded. Khashyah — not just fear but awe, reverence, awareness. This is the key that opens the heart to benefit from the Quran and reminder. A heart with khashyah absorbs every reminder. Cultivate khashyah and every reminder will benefit you!"},
  4:{xp:90,gems:4,icon:'✨',title:'SUCCESS FORMULA FOUND!',msg:"SubhanAllah! 'Qad aflaha man tazakka — wa dhakara isma Rabbih fa-salla.' CERTAINLY SUCCEEDED who purified himself AND mentioned Allah's name AND prayed. Three steps: purification (tazakka), dhikr (dhakara), salah (salla). This is the formula for falah — for complete success. Keep purifying, keep in dhikr, keep your prayers!"},
  5:{xp:100,gems:4,icon:'⚡',title:'DUNYA vs AKHIRA DECIDED!',msg:"Allahu Akbar! 'Bal tu\'thirun al-hayat al-dunya — wa al-akhiratu khayrun wa abqa.' But you PREFER the worldly life — while the Hereafter is BETTER AND MORE LASTING. Better in quality. Longer in duration. The choice is clear when you see it like this. Use the world as a vehicle to the Hereafter — not as a destination."},
  6:{xp:120,gems:5,icon:'📜',title:'SURAH AL-ALA COMPLETE!',msg:"ALLAHUMMA BARIK! All 6 levels of Surah Al-Ala complete! Glorify the Most High. He will make you not forget. Fear Allah to be reminded. Purify and pray for success. Prefer the Hereafter. And remember: these truths were in the scrolls of Ibrahim and Musa too! This message is eternal. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:6,rewards:REWARDS,
  tileIcons:['🌿','📿','🤲','✨','⚡','📜'],
  tileLabels:['Glorify','Recite','Who Fears','Purify','Dunya/Akhira','Scrolls'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Ala — The Most High! Glorify His name. He will make you recite without forgetting. Fear Allah and be reminded. Purify yourself and succeed. Prefer the Hereafter. This is in the earliest scriptures too. 6 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Sabbihi isma Rabbika al-A\'la" — Keep glorifying! 🌿`,
    complete:name=>`MashAllah, ${name}! Surah Al-Ala complete! "Qad aflaha man tazakka." He has certainly succeeded who purified himself. May we be among them! Ameen! 📜`,
  },
};

const S1_ITEMS=[{id:'i1',text:'🌿 Khalq\n& Taswiya',zone:'z1'},{id:'i2',text:'🎯 Qadr\n& Huda',zone:'z2'},{id:'i3',text:'🌾 Pasture\n& Debris',zone:'z3'}];
const S1_ZONES=[{id:'z1',desc:'"Alladhi khalaqa fa-sawwa" (87:2) — Who CREATED and then PROPORTIONED. "Khalaqa" — brought into existence from nothing. "Sawwa" — balanced, proportioned, made even. Every creation of Allah is complete and perfectly proportioned — nothing missing, nothing excess.'},{id:'z2',desc:'"Wa alladhi qaddara fa-hada" (87:3) — Who DESTINED and then GUIDED. "Qaddara" — decreed, fixed the measure of all things. "Hada" — guided each thing to fulfil its purpose. The bee is guided to its hive, the seed to its growth, the human to what benefits them — if they listen.'},{id:'z3',desc:'"Wa alladhi akhraja al-mar\'a — fa-ja\'alahu ghuthaan ahwa" (87:4-5) — Who brought out the pasture — then made it dark debris. Green, thriving pasture becomes dry, withered, dark debris. The world\'s cycles of growth and decay — all under Allah\'s command.'}];

const S2_QUIZ=[
  {q:'What is the significance of "Sanuqri\'uka" (سَنُقْرِئُكَ) in 87:6?',opts:['It means "you will read (the Quran yourself)"','It uses the first person plural "We will MAKE you recite" — Allah is the One who places the Quran in the Prophet\'s memory. The Prophet ﷺ didn\'t just learn it — Allah deposited it into his heart. This is why the Quran is so perfectly preserved.','It means "We will send you more revelations"','It means "You should recite loudly"'],correct:1},
  {q:'What does the promise "fa-la tansa" (فَلَا تَنسَىٰ) mean and what was its context?',opts:['The Prophet ﷺ would never forget anything in his entire life','You (the Prophet ﷺ) will NOT FORGET (the Quran). Before this verse, the Prophet ﷺ would rush to repeat the revelation as soon as it came, fearing he would forget it. This verse assured him: Allah will preserve it in your memory. Just receive it — don\'t rush.','The believers who memorise Quran will never have poor memory','The Quran itself will never be lost from the world'],correct:1},
  {q:'What is the exception "illa ma sha\' Allah" (إِلَّا مَا شَاءَ اللَّه) in 87:7?',opts:['Sometimes the Prophet ﷺ would forget major events','EXCEPT what Allah WILLS — referring to some verses that were later abrogated in revelation and whose memory was allowed to fade. This shows that even "forgetting" in those cases was by Allah\'s will, not the Prophet\'s failure.','The Prophet ﷺ could forget non-Quranic matters','Allah would sometimes reveal new details to replace forgotten ones'],correct:1},
  {q:'Why does 87:7 say "He knows the declared and what is hidden" after the promise?',opts:['To remind us that Allah knows if we miss prayers','To establish that the ONE making this promise is ALL-KNOWING. He knows every declared (open) matter and everything hidden. The same knowledge that makes the Quran what it is — is the knowledge that guarantees its preservation in the Prophet\'s memory. His promise is backed by infinite knowledge.','To warn the Prophet ﷺ not to hide the revelations','To tell believers to be honest in their recitation'],correct:1},
];

const S3_QUIZ=[
  {q:'What does "yakhsha" (يَخْشَى) mean in "sayyadhdhakkaru man yakhsha" (87:10)?',opts:['Anyone who hears the reminder will benefit','Who FEARS Allah with AWE — "khashyah" is a deep, reverential fear mixed with knowledge and love. It is the fear of a servant who is aware of Allah\'s greatness and his own smallness. This fear OPENS the heart to reminder.','Those who memorize the Quran','Those who pray five times daily'],correct:1},
  {q:'Who is "al-ashqa" (الأَشْقَى) — the most wretched — in 87:11?',opts:['The person who commits many sins but repents','The one who AVOIDS the reminder — "yatasajjanabha" means to carefully avoid, steer clear of, dodge the reminder. Not just someone who doesn\'t hear it — but someone who actively avoids it. This deliberate avoidance is the mark of the most wretched.','Poor people who cannot access religious education','Those who forget the Quran after memorising'],correct:1},
  {q:'What happens to "al-ashqa" according to 87:12?',opts:['"Who will enter a small fire for a limited time"','"Alladhi yasla al-nar al-kubra" — Who will ENTER the GREAT FIRE. "Yasla" means to be plunged into, scorched by, enter completely. "Al-kubra" — the GREATEST. The contrast with "al-A\'la" (Most High) — the most wretched enters the greatest fire.','Who will face judgment but then be forgiven','Who will be condemned to wander without purpose'],correct:1},
  {q:'What is the spiritual connection between "khashyah" (87:10) and benefit from reminder?',opts:['Khashyah makes people pray more and thus study more Quran','A heart with khashyah (awe/fear of Allah) is a HUMBLE heart — humble enough to be shaped by reminder. It says: this reminder is true, I am accountable, I need to change. A proud or heedless heart deflects reminder. Khashyah is the softness that allows reminder to penetrate and benefit.','Khashyah is only found in scholars and imams','Khashyah means being afraid of punishment, not spiritual openness'],correct:1},
];

const S4_QUIZ=[
  {q:'What does "tazakka" (تَزَكَّى) mean in "qad aflaha man tazakka" (87:14)?',opts:['Someone who pays Zakat al-Fitr on Eid','To PURIFY oneself — from shirk (associating partners with Allah), from wrong beliefs, from spiritual diseases of the heart like pride, envy, and love of this world. The root "zaka" means pure, growing, blessed.','Someone who regularly gives to charity','Someone who avoids all worldly activities'],correct:1},
  {q:'What is the sequence in 87:14-15: tazakka → dhakara → salla?',opts:['They are three independent acts with no particular order','The sequence is meaningful: first PURIFY (tazakka) — prepare the vessel. Then MENTION Allah\'s name (dhakara) — fill the vessel with consciousness of Allah. Then PRAY (salla) — perform the act that expresses this consciousness. Inner purification enables true dhikr, which enables true prayer.','They are three alternative paths to success','Prayer comes before dhikr in the correct Islamic order'],correct:1},
  {q:'"Qad aflaha" (قَدْ أَفْلَحَ) — what does "qad" add to "aflaha"?',opts:['It makes it a future tense verb','QAD adds CERTAINTY and COMPLETION — "qad aflaha" means: he has CERTAINLY and DEFINITIVELY succeeded. Not "might succeed" or "hopes to succeed." The use of "qad" is an emphatic confirmation: whoever follows this path has already, certainly, achieved success in the truest sense.','It makes it a conditional statement','It refers only to success in the afterlife, not this world'],correct:1},
  {q:'Why does the surah say "mentions the name of his Lord" (dhakara isma Rabbih) before "prays" (salla)?',opts:['Because remembrance is more important than prayer in Islam','Because prayer without awareness of Who you are praying to is incomplete. "Dhakara isma Rabbih" establishes the CONSCIOUSNESS of Allah — knowing, remembering, being aware of your Lord. Prayer then becomes an expression of this awareness, not just a mechanical ritual.','Because du\'a is a higher act than formal salah','Because dhikr was revealed before salah in Islamic history'],correct:1},
];

const S5_QUIZ=[
  {q:'What does "tu\'thirun" (تُؤْثِرُونَ) mean in 87:16?',opts:['You are busy with the life of this world','You PREFER, PRIORITIZE, CHOOSE — "ithar" means giving preference to something over another option. The verse doesn\'t say you\'re forced to live in this world — it says you actively CHOOSE it, prefer it, give it priority over the Hereafter.','You are unaware of the life of this world\'s flaws','You are afraid of the Hereafter so you focus on this world'],correct:1},
  {q:'The Hereafter is described as "khayrun wa abqa" (87:17) — what two dimensions does this cover?',opts:['More peaceful and more beautiful','BETTER (khayr — higher in quality, goodness, benefit) AND MORE LASTING (abqa — permanent, enduring, never-ending). Two dimensions: quality and duration. This world is lower quality AND temporary. The Hereafter is higher quality AND eternal. Both comparisons favor the Hereafter decisively.','More exciting and more certain','More accessible and more rewarding'],correct:1},
  {q:'This verse doesn\'t say "don\'t live in this world." What does it actually teach?',opts:['Muslims should withdraw from worldly life completely','To CORRECT the PRIORITY. The world is not evil — but preferring it OVER the Hereafter is the problem. Use the world as a vehicle to the Hereafter. Work, earn, live — but know that the real destination is the Hereafter. Keep priorities in order.','The world is inherently evil and should be avoided','Only religious activities have value in this life'],correct:1},
  {q:'How does the contrast between Al-Ala (Most High) and al-hayat al-dunya (lowest life) work linguistically?',opts:['There is no linguistic connection between them','Al-A\'la means the MOST HIGH — the highest. "Al-dunya" literally means the LOWEST, the nearest, the one below. They are exact opposites. Allah is al-A\'la (highest) — and humans prefer al-dunya (the lowest). The surah\'s opening name is itself the answer to why we shouldn\'t prefer al-dunya.','Both words come from the same Arabic root','The comparison is between Allah\'s name and human shortcomings generally'],correct:1},
];

const S6_QUIZ=[
  {q:'What are the "first scriptures" (al-suhuf al-ula) mentioned in 87:18?',opts:['The first copies of the Quran written by the companions','The EARLIEST SCRIPTURES — referred to in 87:19 as the suhuf (scrolls) of Ibrahim and Musa. This shows that the core message of Surah Al-Ala — glorify Allah, purify yourself, prefer the Hereafter — is not new. It was in the earliest revelations to the prophets.','The tablets of the ten commandments only','The oral traditions passed down from Adam'],correct:1},
  {q:'What is the significance of linking this surah to "suhuf Ibrahim wa Musa" (87:19)?',opts:['To show that Ibrahim and Musa were more important than Muhammad ﷺ','To show the UNITY of the message across all prophets. The instruction to glorify Allah, purify oneself, prefer the Hereafter — these are not innovations of Islam. They were in the first scriptures. This establishes Islam as the completion and confirmation of eternal truths.','To suggest that Muslims should follow the scrolls of Ibrahim and Musa','To prove that Ibrahim and Musa knew about Prophet Muhammad ﷺ'],correct:1},
  {q:'The surah opens with "Sabbihi isma Rabbika al-A\'la" (87:1). What does the Prophet ﷺ teach us to say in sujood based on this verse?',opts:['"SubhanAllahu wa bi-hamdihi" in sujood','SUBHANA RABBIYA AL-A\'LA — "Glory be to my Lord, the Most High." The Prophet ﷺ commanded this specific dhikr in sujood (prostration) after this surah was revealed. Every prayer, every sujood, the Muslims recite the first verse of this surah directly. This verse lives in our daily worship.','The entire surah in each prostration','The basmalah followed by this surah\'s opening verse'],correct:1},
  {q:'What is the central message that connects all parts of Surah Al-Ala?',opts:['Study Islam carefully and become a scholar','ORIENTATION: Orient yourself correctly toward Allah (glorify Him), trust His preservation of His message, open your heart with khashyah, purify yourself and pray for success, prefer the Hereafter over this world. This orientation was in Ibrahim\'s scriptures and is eternal truth.','Focus on avoiding sin more than doing good deeds','Make sure your prayers are technically correct'],correct:1},
];

function renderSection1Game(){renderDragDrop(1,S1_ITEMS,S1_ZONES);}function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}function checkSection5(){checkQuiz(5,S5_QUIZ);}
function renderSection6Game(){renderQuiz(6,S6_QUIZ);}function checkSection6(){checkQuiz(6,S6_QUIZ);}

function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#c8a020';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#041008';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#1a6030';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#041008');sk.addColorStop(1,'#0c2010');ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  if(n<1){_lbl(ctx,W,"🌿 Complete levels to build the Garden of Glorification!",0,6);return;}
  // Ground
  ctx.fillStyle='#102010';ctx.fillRect(0,210,W,40);ctx.fillStyle='#183018';ctx.fillRect(0,210,W,5);
  if(n<2){_lbl(ctx,W,"🌿 Earth appears — 1/6",1,6);return;}
  // Grasses
  for(let g=0;g<16;g++){const gx=30+g*33;ctx.fillStyle='#1a5010';ctx.fillRect(gx,194,6,16);ctx.fillStyle='#0a3008';ctx.fillRect(gx-4,184,14,14);}
  if(n<3){_lbl(ctx,W,"🌱 Pasture grows — 2/6",2,6);return;}
  // Golden "Al-Ala" text above
  const pulse=0.5+Math.sin(Date.now()*0.002)*0.4;ctx.fillStyle=`rgba(200,160,32,${pulse})`;ctx.font='10px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText('الأَعْلَى',W/2,45);ctx.textAlign='left';
  if(n<4){_lbl(ctx,W,"✨ The Most High above — 3/6",3,6);return;}
  // Light beam from above
  ctx.fillStyle='rgba(200,160,32,0.08)';ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2-60,210);ctx.lineTo(W/2+60,210);ctx.closePath();ctx.fill();
  if(n<5){_lbl(ctx,W,"☀️ Divine light descends — 4/6",4,6);return;}
  // Two scrolls (Ibrahim and Musa)
  [[60,150],[W-140,150]].forEach(([sx,sy])=>{fillRect(ctx,sx,sy,80,50,'#201808');ctx.strokeStyle='rgba(200,160,32,0.5)';ctx.lineWidth=1;ctx.strokeRect(sx,sy,80,50);});
  if(n<6){_lbl(ctx,W,"📜 Scrolls of Ibrahim and Musa — 5/6",5,6);return;}
  ctx.fillStyle='#c8a020';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! 🌿 AL-ALA COMPLETE!",W/2,237);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Sabbihi isma Rabbika al-A\'la — Qad aflaha man tazakka"',W/2,H-2);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
