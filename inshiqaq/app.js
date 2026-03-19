'use strict';
/* SURAH AL-INSHIQAQ (84) — app.js */
window.STORAGE_KEY='inshiqaqQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s1Checked:false,s2Answers:{},s2Checked:false,s3Answers:{},s3Checked:false,s4Answers:{},s4Checked:false,s5Checked:false,s6Answers:{},s6Checked:false};

const REWARDS={
  1:{xp:80,gems:3,icon:'🌅',title:'SKY SPLITS, EARTH STRETCHES!',msg:"SubhanAllah! The sky splits and listens to its Lord. The earth stretches and listens to its Lord. 'Wa adhinat li-Rabbiha wa huqqat' — it was RIGHT for them to do so! The entire universe obeys Allah completely. How about us — do we listen to our Lord and comply?"},
  2:{xp:80,gems:3,icon:'🚶',title:'THE JOURNEY UNDERSTOOD!',msg:"Allahu Akbar! 'Ya ayyuha al-insan, innaka kadihun ila Rabbika kadhan fa-mulaqihi.' You are STRIVING toward your Lord — every breath, every heartbeat, every step is part of this journey. And you WILL meet Him. 'Fa-mulaqihi' — you will meet Him. Prepare well for that meeting!"},
  3:{xp:90,gems:3,icon:'📖',title:'RIGHT HAND PEOPLE KNOWN!',msg:"MashAllah! The right-hand people receive their book joyfully. 'Hisaban yasiran' — an EASY reckoning! And then: 'yanqalibu ila ahlihi masrura' — they return to their people OVERJOYED. The reunion of believers in Paradise is a celebration! May Allah make us among them. Ameen!"},
  4:{xp:90,gems:4,icon:'⚠️',title:'THE WARNING RECEIVED!',msg:"SubhanAllah! The person given their book from behind their back — 'yad\'u thuburan' — calls for destruction. 'Wa yasla sa\'iran' — enters blazing fire. The contrast is total. There are only two paths: the right-hand path of the Abrar, or the left-hand path of the Fujjar. Which path are you building today?"},
  5:{xp:100,gems:4,icon:'🔄',title:'STAGES OF LIFE MAPPED!',msg:"Allahu Akbar! 'La-tarkabunna tabaqan \'an tabaqin.' You will SURELY pass through stage after stage. Womb, birth, childhood, youth, adulthood, old age, death, grave, resurrection, judgment. Every stage is a gift — and every stage passes. The meeting with Allah is the final stage. Use each stage well!"},
  6:{xp:120,gems:5,icon:'🌙',title:'SURAH AL-INSHIQAQ COMPLETE!',msg:"ALLAHUMMA BARIK! All 6 levels of Surah Al-Inshiqaq complete! You are striving toward your Lord, stage after stage. The sky will split. The earth will stretch. You will receive your book. May Allah give us books in our right hands, easy reckonings, and joyful returns to our people. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:6,rewards:REWARDS,
  tileIcons:['🌅','🚶','📖','⚠️','🔄','🌙'],
  tileLabels:['Sky Splits','Striving','Right Hand','Behind Back','Stages','Complete'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Inshiqaq — The Splitting! Sky splits, earth stretches, and you WILL meet your Lord. Right-hand people: joyful return. Left-hand people: destruction. Stage after stage — the journey is real. 6 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Innaka kadihun ila Rabbika kadhan fa-mulaqihi" — Keep striving! 🚶`,
    complete:name=>`MashAllah, ${name}! Surah Al-Inshiqaq complete! Stage after stage you've journeyed through this surah. May your book be given in your right hand. Ameen! 🌙`,
  },
};

const S1_ITEMS=[{id:'i1',text:'🌅 Sky\nAnshaqqa',zone:'z1'},{id:'i2',text:'🌍 Earth\nMuddat',zone:'z2'},{id:'i3',text:'👂 "Listened\nto its Lord"',zone:'z3'},{id:'i4',text:'⚖️ Both\nObligated',zone:'z4'}];
const S1_ZONES=[{id:'z1',desc:'"Idha al-sama\' anshaqqa" (84:1) — When the sky SPLITS/CLEAVES. "Inshaqqa" — broke open, split apart. This is the same root as the surah\'s name. The entire sky, the universe\'s ceiling, cracks and opens.'},{id:'z2',desc:'"Wa idha al-ardhu muddat" (84:3) — When the earth is STRETCHED. "Muddat" — stretched flat, spread out. The earth that contains mountains and depths is stretched smooth and flat for the resurrection.'},{id:'z3',desc:'"Wa adhinat li-Rabbiha" (84:2,4) — The sky AND earth LISTENED to their Lord and obeyed. "Adhina" means to give ear to, to obey, to comply. The sky and earth hear Allah\'s command and respond.'},{id:'z4',desc:'"Wa huqqat" (84:2,4) — They were OBLIGATED/RIGHT to do so — or "it was the right thing for them." Allah is saying: of course they obeyed — how could they not? And how could we humans not also comply?'}];

const S2_QUIZ=[
  {q:'What does "kadihun" (كَادِحٌ) mean in "Innaka kadihun ila Rabbika kadhan" (84:6)?',opts:['Walking slowly without purpose','STRIVING/LABORING/TOILING — "kadh" means exhausting, hard effort. You are putting in great effort, straining, laboring — toward your Lord. Life is serious, purposeful striving.','Sleeping and waiting for death','Being distracted by worldly pleasures'],correct:1},
  {q:'What does "fa-mulaqihi" (فَمُلَاقِيهِ) mean in 84:6?',opts:['You might meet Him if you are righteous','Then you will MEET HIM — absolutely, certainly. "Mulaqi" means "one who meets." The "Hi" is a pronoun for Allah. You will meet Allah. This is guaranteed. There is no escaping this meeting.','You will try to avoid meeting Him','You will be judged from a distance'],correct:1},
  {q:'The verse says you are striving "ILA Rabbika" (toward your Lord). What does this tell us about the destination of all human striving?',opts:['All striving is for worldly success ultimately','All human effort — whether directed at Allah or not — is heading TOWARD meeting Allah. Every life leads to the same destination: standing before your Lord. The question is whether you prepared for this meeting.','Striving is only for believers who intend Allah','You choose your own destination through your intentions'],correct:1},
  {q:'Why does the verse call us "al-insan" (the human) rather than "al-mu\'min" (the believer)?',opts:['Because it is addressed only to non-believers','Because "al-insan" addresses ALL humans — believers and non-believers alike. Everyone is striving toward their Lord, whether they acknowledge it or not. The meeting with Allah applies to every human who ever lived.','Because believers are excluded from this warning','Because "al-mu\'min" was not used in Meccan surahs'],correct:1},
];

const S3_QUIZ=[
  {q:'What does receiving the book in the RIGHT hand (yaminih) symbolize in 84:7?',opts:['Being judged first before others','Right hand in Islamic tradition = honour, blessing, goodness. Receiving the record in the right hand = you are among the righteous, the successful, the people of Paradise.','Being examined more carefully than others','Having a longer list of deeds to review'],correct:1},
  {q:'What does "hisab yasir" (easy reckoning) mean in 84:8?',opts:['A reckoning that takes less time','The Prophet ﷺ explained: whoever is brought to strict account is destroyed. True "easy reckoning" is when Allah presents your deeds to you for acknowledgment WITHOUT strict questioning. Just shown, acknowledged, forgiven.','A reckoning where only good deeds are counted','A reckoning conducted by junior angels'],correct:1},
  {q:'"Yanqalibu ila ahlihi masrura" (84:9) — what makes this scene beautiful?',opts:['It means you will see your worldly family immediately in Paradise','MASRURA — with JOY/HAPPINESS. "Yanqalibu" means returns/turns back. After the Judgment: he returns to his people overjoyed. Reunion in Paradise is a celebration — families, friends, loved ones reunited, all in bliss together.','It means you will be alone after judgment','It means you will be given wealth immediately after judgment'],correct:1},
  {q:'How do we prepare to be among those given books in the right hand?',opts:['By memorising specific du\'as for Judgment Day','By sincerely worshipping Allah, fulfilling obligations, doing good deeds consistently, asking for forgiveness, and trusting in Allah\'s mercy. The right-hand people are those who lived with awareness of meeting Allah.','By performing Hajj multiple times','By having many people pray for you'],correct:1},
];

const S4_QUIZ=[
  {q:'Why is the book given "behind the back" (wara\'a dhahrihi) rather than in the left hand (84:10)?',opts:['Because the person was left-handed','Scholars say his right hand is bound/shackled, so his left hand reaches awkwardly behind his back. The "behind the back" symbolises shame, concealment, and rejection — the opposite of the proud, open right hand.','Because there is no room on the left side','Because the left side is reserved for good deeds'],correct:1},
  {q:'What is "thubur" (ثُبُور) that the person cries out for in 84:11?',opts:['Mercy and forgiveness from Allah','DESTRUCTION/RUIN. "Yad\'u thubura" — he calls for his own destruction. He wishes he could be destroyed and cease to exist rather than face what he faces. The anguish is so great he cries for annihilation.','The names of his family members','Other people to share his punishment'],correct:1},
  {q:'What does "sa\'ir" (سَعِير) in 84:12 mean?',opts:['A cold and isolated punishment place','BLAZING/INTENSE FIRE — from "sa\'ara" meaning to kindle, to blaze. It is one of the names for Hell emphasising its blazing heat and intensity.','A temporary place of purification','Darkness and isolation in Hell'],correct:1},
  {q:'The "book behind the back" people — what made them end up this way according to 84:13-15?',opts:['They committed major crimes that others never forgave','They "used to be among their people joyfully heedless" (84:13) and "thought they would never return" to Allah (84:14). Joy without accountability — this world felt like the only reality to them.','They were born into disbelief and had no chance','They were punished for the sins of their parents'],correct:1},
];

const S5_QUIZ=[
  {q:'List the stages of human life mentioned or implied in "tabaqan \'an tabaqin" (84:19)?',opts:['Birth, school, work, retirement, death','Scholars list: pre-birth (nutfa), womb, birth, childhood, youth, adulthood, old age, death, grave, resurrection, reckoning, final destination. "Stage after stage" encompasses all of human existence.','Only the spiritual stages: ignorance, guidance, piety, death','The four seasons of the year applied to human life'],correct:1},
  {q:'What does the moon in 84:18 ("by the moon") and the night and day (84:17) tell us about time?',opts:['Day and night are signs of Allah\'s power in creation','Allah swears by phases of time — twilight, the night and what it envelops, the moon in its fullness — all signs of the orderly, purposeful passage of time. Time is not random; it moves in stages toward the meeting with Allah.','Day and night are warnings about staying awake for prayer','The moon is a sign only for navigation and agriculture'],correct:1},
  {q:'"La-tarkabunna tabaqan \'an tabaqin" (84:19) — what is the tone of this verse?',opts:['A gentle suggestion that life has multiple phases','A CERTAIN OATH — "La-tarkabunna" uses the emphatic "lam" + "nun" of emphasis = you will DEFINITELY, SURELY, without any doubt pass through stage after stage. This is not optional. It is certainty.','A question asking if people understand life\'s stages','A description of the Day of Judgment only'],correct:1},
  {q:'How does knowing life comes in stages help deal with difficulties?',opts:['It teaches us to accept all difficulties without trying to change them','Knowing every stage PASSES — hardship is a stage, illness is a stage, grief is a stage. "This too shall pass" has a Quranic foundation. And knowing what the FINAL stage is — meeting Allah — gives every earlier stage its purpose and meaning.','It means we should rush through life\'s stages quickly','It teaches that only the afterlife matters'],correct:1},
];

const S6_QUIZ=[
  {q:'"Ma lahum la yu\'minun?" (84:20) — Why do they not believe? What is the Quran\'s own answer?',opts:['Because the signs are hidden and unclear','The Quran asks as a rhetorical question implying there IS no valid reason. The signs are clear: cosmic events, the journey toward Allah, the two destinies. Their refusal is not due to lack of evidence — it is due to preference for this world.','Because they never received proper guidance','Because predestination prevented them'],correct:1},
  {q:'The moon in 84:18 — why does Allah swear by "the moon as it becomes full"?',opts:['Because the full moon is the most beautiful natural phenomenon','The full moon becomes full GRADUALLY — stage after stage, it grows. This echoes the surah\'s theme of stages ("tabaqan \'an tabaqin"). Everything — including faith, including the approach of the Last Day — comes in stages.','Because night prayer is most rewarded at full moon','Because the moon controls tides and thus human fate'],correct:1},
  {q:'Why does the surah begin with cosmic signs (sky, earth) and end with "why don\'t they believe?"',opts:['Because the surah is arranged in reverse chronological order','The cosmic signs are EVIDENCE. The sky will split. The earth will stretch. You ARE striving toward your Lord. The two destinies ARE real. Given all this evidence — "ma lahum la yu\'minun?" WHAT is stopping them? The evidence is overwhelming.','Because the cosmic signs apply to believers and the ending to non-believers','Because it was revealed in two separate occasions'],correct:1},
  {q:'What is the most important personal takeaway from Surah Al-Inshiqaq?',opts:['We should fear death and avoid thinking about it','You are on a journey — striving, stage after stage, toward a certain meeting with your Lord. The question is not IF you will meet Him — but WHETHER you prepared. The book will be given. The account will happen. Start preparing NOW while the stages continue.','Prayer five times a day is sufficient preparation','Only major sins need to be addressed before death'],correct:1},
];

function renderSection1Game(){renderDragDrop(1,S1_ITEMS,S1_ZONES);}function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderQuiz(3,S3_QUIZ);}function checkSection3(){checkQuiz(3,S3_QUIZ);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}function checkSection5(){checkQuiz(5,S5_QUIZ);}
function renderSection6Game(){renderQuiz(6,S6_QUIZ);}function checkSection6(){checkQuiz(6,S6_QUIZ);}

function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#f09030';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#100802';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#883010';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#0a0402');sk.addColorStop(0.5,'#180a04');sk.addColorStop(1,'#261408');ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  if(n<1){_lbl(ctx,W,"🌅 Complete levels to build the Sunset Journey!",0,6);return;}
  // Ground
  ctx.fillStyle='#301808';ctx.fillRect(0,210,W,40);ctx.fillStyle='#401e08';ctx.fillRect(0,210,W,5);
  if(n<2){_lbl(ctx,W,"🌍 Earth appears — 1/6",1,6);return;}
  // Sunset sky
  const sg=ctx.createLinearGradient(0,0,0,210);sg.addColorStop(0,'#1a0802');sg.addColorStop(0.4,'#3a1808');sg.addColorStop(0.8,'#7a3810');sg.addColorStop(1,'#301808');ctx.fillStyle=sg;ctx.fillRect(0,0,W,210);
  if(n<3){_lbl(ctx,W,"🌅 Sunset sky — 2/6",2,6);return;}
  // Crack in sky
  ctx.strokeStyle='rgba(248,192,96,0.8)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2+15,60);ctx.lineTo(W/2-10,130);ctx.lineTo(W/2+5,210);ctx.stroke();
  if(n<4){_lbl(ctx,W,"🌅 Sky splits — 3/6",3,6);return;}
  // Person walking
  ctx.fillStyle='#e8c39a';ctx.fillRect(100,175,16,12);ctx.fillRect(103,163,10,12);ctx.fillStyle='#3a2818';ctx.fillRect(100,163,10,12);
  for(let f=0;f<3;f++){ctx.fillStyle='rgba(248,192,96,0.3)';ctx.fillRect(60-f*15,210,8,3);}
  if(n<5){_lbl(ctx,W,"🚶 Man striving toward Lord — 4/6",4,6);return;}
  // Moon
  ctx.fillStyle='rgba(248,192,96,0.7)';ctx.beginPath();ctx.arc(60,40,22,0,Math.PI*2);ctx.fill();ctx.fillStyle='#0a0402';ctx.beginPath();ctx.arc(70,34,15,0,Math.PI*2);ctx.fill();
  // Stars
  [[200,20],[300,35],[420,15],[480,45]].forEach(([sx,sy])=>{ctx.fillStyle='rgba(248,192,96,0.5)';ctx.beginPath();ctx.arc(sx,sy,1.5,0,Math.PI*2);ctx.fill();});
  if(n<6){_lbl(ctx,W,"🌙 Moon and stars — 5/6",5,6);return;}
  ctx.fillStyle='#f09030';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! 🌅 AL-INSHIQAQ COMPLETE!",W/2,240);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Innaka kadihun ila Rabbika kadhan fa-mulaqihi" — 84:6',W/2,H-2);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
