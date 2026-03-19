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
  {q:'What does "kadihun" (كَادِحٌ) mean in "Innaka kadihun ila Rabbika kadhan" (84:6)?',
   opts:['Walking slowly and without real purpose through life',
         'Striving, laboring, toiling with great and exhausting effort',
         'Sleeping and simply waiting for the moment of death',
         'Being endlessly distracted by all the worldly pleasures'],
   correct:1},
  {q:'What does "fa-mulaqihi" (فَمُلَاقِيهِ) mean in 84:6?',
   opts:['You might meet Allah if you are truly righteous enough',
         'You will try in vain to avoid meeting your Lord',
         'Then you will MEET HIM — absolutely and certainly',
         'You will be judged by Allah from a safe distance'],
   correct:2},
  {q:'What does striving "ILA Rabbika" (toward your Lord) tell us?',
   opts:['All striving is ultimately for worldly success and status',
         'Only believers who intend Allah are truly striving toward Him',
         'Every life — believer or not — leads to meeting Allah',
         'You choose your own destination completely through intentions'],
   correct:2},
  {q:'Why does the verse address "al-insan" (the human) not "al-mu\'min" (the believer)?',
   opts:['Because it is addressed only to disbelievers and rejecters',
         '"Al-insan" addresses ALL humans — the meeting applies to everyone',
         'Because believers are entirely excluded from this specific warning',
         'Because the term al-mu\'min was not used in any Meccan surahs'],
   correct:1},
];

const S3_QUIZ=[
  {q:'What does receiving the book in the RIGHT hand (yaminih) symbolize in 84:7?',
   opts:['Being judged first before all other people',
         'Being examined more carefully than everyone else',
         'Having a particularly long list of deeds to review',
         'Honour and goodness — you are among the people of Paradise'],
   correct:3},
  {q:'What does "hisab yasir" (easy reckoning) mean in 84:8?',
   opts:['A reckoning that simply takes less time than others',
         'A reckoning where only good deeds are counted and tallied',
         'Allah presents your deeds for acknowledgment without strict scrutiny',
         'A reckoning conducted by junior angels not senior ones'],
   correct:2},
  {q:'"Yanqalibu ila ahlihi masrura" (84:9) — what is the beautiful meaning?',
   opts:['You will see your worldly family immediately in Paradise',
         'You will be completely alone and isolated after the Judgment',
         'You will be given great wealth immediately after the Judgment',
         'MASRURA — with joy! He returns to his people overjoyed in Paradise'],
   correct:3},
  {q:'How do we prepare to be given our book in our right hand?',
   opts:['By memorising specific du\'as specifically for Judgment Day',
         'By performing the Hajj pilgrimage multiple times in life',
         'By having as many people as possible pray for you',
         'Sincerely worshipping Allah, fulfilling obligations, asking forgiveness'],
   correct:3},
];

const S4_QUIZ=[
  {q:'Why is the book given "behind the back" (wara\'a dhahrihi) in 84:10?',
   opts:['Because the person was naturally left-handed all their life',
         'His right hand is bound — left hand reaches shamefully behind the back',
         'Because the left side of the body is reserved for good deeds',
         'Because there is no room available on the left side'],
   correct:1},
  {q:'What is "thubur" (ثُبُور) that the person cries out for in 84:11?',
   opts:['He cries for mercy and forgiveness from Allah in despair',
         'He calls out the names of his family members for help',
         'He asks other people nearby to share in his punishment',
         'DESTRUCTION/RUIN — he calls for his own annihilation'],
   correct:3},
  {q:'What does "sa\'ir" (سَعِير) in 84:12 mean?',
   opts:['Blazing, intense fire — from "sa\'ara" meaning to kindle and blaze',
         'A cold and isolated punishment chamber in the afterlife',
         'A temporary place of purification before Paradise',
         'Deep darkness and total isolation as punishment in Hell'],
   correct:0},
  {q:'What made the "book behind the back" people end up this way?',
   opts:['They committed terrible crimes that their community never forgave',
         'They were born into families of disbelief and had no chance',
         'They were being punished for the sins of their parents',
         'They were joyfully heedless and thought they\'d never face Allah'],
   correct:3},
];

const S5_QUIZ=[
  {q:'What stages of life are implied in "tabaqan \'an tabaqin" (84:19)?',
   opts:['Birth, school, work, retirement, and finally death',
         'Only spiritual stages: ignorance, guidance, piety, and death',
         'The four seasons of the year applied to human life',
         'Scholars list: womb, birth, childhood, youth, death, grave, resurrection'],
   correct:3},
  {q:'What do the oaths by twilight, night, and moon (84:17-18) teach about time?',
   opts:['Day and night are primarily signs of Allah\'s power in creation',
         'Allah swears by phases of time — all moving in orderly stages toward Allah',
         'Day and night mainly warn us to stay awake for prayer',
         'The moon is a sign used only for navigation and agriculture'],
   correct:1},
  {q:'"La-tarkabunna tabaqan \'an tabaqin" (84:19) — what is the tone?',
   opts:['A gentle suggestion that life naturally has multiple phases',
         'A question asking whether people understand life\'s many stages',
         'A description specifically of the Day of Judgment and its events',
         'A certain oath — you will DEFINITELY pass stage after stage'],
   correct:3},
  {q:'How does knowing life comes in stages help us through difficulties?',
   opts:['It teaches accepting all difficulties without any resistance',
         'Every stage PASSES — hardship, illness, grief — "this too shall pass"',
         'It means we should rush quickly through each stage of life',
         'It teaches that only the afterlife truly matters at all'],
   correct:1},
];

const S6_QUIZ=[
  {q:'"Ma lahum la yu\'minun?" — why do they not believe?',
   opts:['Because the signs of Allah are hidden and genuinely unclear',
         'Because they never received any proper guidance or evidence',
         'Because predestination prevented them from ever believing',
         'No valid reason — the evidence is clear, but they prefer this world'],
   correct:3},
  {q:'Why does Allah swear by "the moon as it becomes full" in 84:18?',
   opts:['Because the full moon is the most beautiful natural phenomenon',
         'The moon grows stage by stage — echoing "tabaqan \'an tabaqin"',
         'Because night prayer is most rewarded during a full moon',
         'Because the moon controls human tides and thus human fate'],
   correct:1},
  {q:'Why does the surah open with cosmic signs and close with "why don\'t they believe?"',
   opts:['Because the surah is arranged in reverse chronological order',
         'Because cosmic signs apply to believers, the ending to non-believers',
         'Because it was revealed in two separate separate occasions',
         'The signs ARE the evidence — with all this, what is stopping them?'],
   correct:3},
  {q:'What is the key personal takeaway from Surah Al-Inshiqaq?',
   opts:['We should fear death and generally try to avoid thinking about it',
         'Prayer five times a day is fully sufficient preparation',
         'Only major sins really need to be addressed before death comes',
         'You are striving stage by stage toward a certain meeting with Allah'],
   correct:3},
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
