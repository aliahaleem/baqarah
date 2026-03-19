'use strict';
/* ================================================
   SURAH AT-TAKWIR (81) — app.js
   The Overthrowing · Indigo / Silver-Star / Cosmic
   ================================================ */
window.STORAGE_KEY='takwirQuestSave';
window.state={explorerName:'',xp:0,gems:0,completed:[],s1Checked:false,s2Answers:{},s2Checked:false,s3Order:[],s3Checked:false,s4Answers:{},s4Checked:false,s5Answers:{},s5Checked:false,s6Answers:{},s6Checked:false};

const REWARDS={
  1:{xp:80,gems:3,icon:'⭐',title:'THE 12 SIGNS KNOWN!',msg:"SubhanAllah! Twelve cosmic events will happen on the Day of Judgment — the sun rolled up, stars falling, mountains set in motion, seas overflowing! Each 'Idha' (when) builds towards one conclusion: your soul will know what it brought forward. Are you ready for that Day?"},
  2:{xp:80,gems:3,icon:'👼',title:'THE BURIED GIRL VINDICATED!',msg:"Allahu Akbar! Al-Maw'udah — the girl buried alive in pre-Islamic Arabia. On the Day of Judgment, Allah will ask HER: 'For what sin were you killed?' Not her killer — HER. The innocent victim testifying against her murderers. Islam completely abolished this practice. Every life is sacred."},
  3:{xp:90,gems:3,icon:'📜',title:'WHAT YOU PREPARED REVEALED!',msg:"MashAllah! The records unroll, the sky is stripped, Hell blazes, Paradise draws near — and THEN: 'Alimat nafsun ma ahdharat.' A soul will know exactly what it brought. This is the moment of total clarity. What are you preparing NOW to bring to that Day?"},
  4:{xp:90,gems:4,icon:'👁️',title:'THE NOBLE ANGEL UNDERSTOOD!',msg:"SubhanAllah! The Quran comes through Jibril (AS) — noble, powerful, honoured, obeyed, trustworthy. Four attributes of the greatest angel. The message comes through the BEST carrier. Yet what Jibril carries is even greater — the Word of Allah Himself. How can you not respect this Book?"},
  5:{xp:100,gems:4,icon:'🌟',title:'THE PROPHET DEFENDED!',msg:"Allahu Akbar! 'Wa ma sahibukum bi-majnun' — Your companion Muhammad ﷺ is NOT mad! He saw Jibril on the clear horizon. He doesn't withhold knowledge. And this is NOT from Shaytan. Four defences in four verses. The Quraysh called him mad — Allah Himself is his defence. SubhanAllah!"},
  6:{xp:120,gems:5,icon:'🌌',title:'SURAH AT-TAKWIR COMPLETE!',msg:"ALLAHUMMA BARIK! All 6 levels of Surah At-Takwir — The Overthrowing — complete! 'Fa-ayna tadh-habun?' Where are you going? The Quran is a reminder for all the worlds — for whoever WILLS to take the straight path. May Allah will for us the straight path. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:6,rewards:REWARDS,
  tileIcons:['⭐','👼','📜','👁️','🌟','🌌'],
  tileLabels:['12 Signs','Buried Girl','Prepared','Noble Angel','Not Mad','Where Going?'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah At-Takwir — "The Overthrowing." The sun rolled up, stars falling, the buried baby girl vindicated, the noble angel Jibril, the Prophet ﷺ defended, and the great question: Where are you going? 6 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Fa-ayna tadh-habun?" — Keep finding your path! ⭐`,
    complete:name=>`MashAllah, ${name}! Surah At-Takwir complete! "Inna huwa illa dhikrun lil-'alamin — liman sha'a minkum an yastaqim." The straight path awaits the willing heart. Ameen! 🌌`,
  },
};

// S1 — Drag & Drop: 5 of the 12 Signs
const S1_ITEMS=[
  {id:'sg1',text:'☀️ Al-Shams\nKuwwirat',zone:'z1'},
  {id:'sg2',text:'⭐ Al-Nujum\nInkadarat',zone:'z2'},
  {id:'sg3',text:'⛰️ Al-Jibaal\nSuyyirat',zone:'z3'},
  {id:'sg4',text:'🐪 Al-Ishar\n\'Uttilat',zone:'z4'},
  {id:'sg5',text:'🦁 Al-Wuhush\nHushirat',zone:'z5'},
];
const S1_ZONES=[
  {id:'z1',desc:'"When the sun is rolled up (kuwwirat)" — (81:1). The word is from "kawwara" — to wrap a turban. The sun will be dimmed and folded away like a cloth. Its light extinguished.'},
  {id:'z2',desc:'"When the stars fall scattered (inkadarat)" — (81:2). Stars will lose their light and scatter/fall. The ordered universe unmade.'},
  {id:'z3',desc:'"When the mountains are set in motion (suyyirat)" — (81:3). Mountains that seem permanent will float, fly, and crumble like wool. See also 81:10 — the sky stripped away.'},
  {id:'z4',desc:'"When the she-camels 10 months pregnant are abandoned (\'uttilat)" — (81:4). The most precious possession in Arabia abandoned. Life itself stops caring about wealth.'},
  {id:'z5',desc:'"When the wild animals are gathered (hushirat)" — (81:5). Even animals will be resurrected and gathered. Every creature answers on that Day.'},
];

// S2 — Quiz: The Buried Baby Girl
const S2_QUIZ=[
  {q:'Who was "Al-Maw\'udah" (الْمَوْءُودَة) in 81:8?',opts:['A woman who refused to believe in resurrection','The girl who was buried alive in pre-Islamic Arabia — a practice some Arab tribes did to newborn daughters out of shame or fear of poverty','A woman punished for a crime','A woman who died during a war'],correct:1},
  {q:'On the Day of Judgment, WHO is asked about the buried girl according to 81:8-9?',opts:['Her father is asked why he buried her','The girl HERSELF is asked — "For what sin (dhanb) were you killed?" — the innocent victim is given voice, not the perpetrator','The whole tribe is asked collectively','The angels who recorded the deed are asked'],correct:1},
  {q:'What does "bi-ayyi dhanbin qutilat" (81:9) mean and why is it powerful?',opts:['"She is guilty of the sin of being born female" — justifying the practice','The question "For what SIN was she killed?" — the answer is NONE. There is no sin. The question is itself the indictment against her killers.','It asks what mistake she made before death','It asks whether she was a believer or disbeliever'],correct:1},
  {q:'What was the Islamic verdict on burying girls alive (al-wa\'d)?',opts:['It was permitted in cases of extreme poverty','It was completely and absolutely FORBIDDEN — Islam declared every life sacred, declared female infanticide a major crime, and elevated the status of daughters entirely','It was discouraged but allowed in war','It was forbidden only if the girl was born healthy'],correct:1},
];

// S3 — Story Order: The 4 events of 81:10-14
const S3_EVENTS_CORRECT=[
  {id:'e1',text:'📜 The records (suhuf) are unrolled and laid open — every deed visible (81:10)'},
  {id:'e2',text:'🌌 The sky is stripped away (kushitat) — the heavens removed (81:11)'},
  {id:'e3',text:'🔥 Hell (al-Jahim) is set ablaze (su\'\'irat) and blazing (81:12)'},
  {id:'e4',text:'🌿 Paradise (al-Jannah) is brought near (uzlifat) — close enough to see (81:13)'},
  {id:'e5',text:'💡 Then a soul will KNOW (alimat nafsun) what it has brought forward (81:14)'},
];
window._S3_EVENTS=S3_EVENTS_CORRECT;

// S4 — Quiz: The Noble Angel
const S4_QUIZ=[
  {q:'Who is the "noble Messenger (rasul karim)" in 81:19?',opts:['The Prophet Muhammad ﷺ bringing the message to mankind','Jibril (AS) — the Angel of Revelation, who brought the Quran from Allah to the Prophet ﷺ','A previous prophet such as Musa (AS)','All prophets collectively'],correct:1},
  {q:'What does "dhi quwwah" (of great power) in 81:20 tell us about Jibril (AS)?',opts:['He has physical strength to carry heavy objects','He has immense power — Jibril (AS) destroyed entire nations with one wing-beat, and he is among the greatest of all creation in strength','He has authority over other angels','He has the power to change decrees'],correct:1},
  {q:'What does "maki\'n ind dhi al-\'Arsh" (secure in rank with the Owner of the Throne) mean?',opts:['He lives inside the Throne of Allah','He has an elevated, established, honoured RANK near Allah\'s Throne — he is truly close to Allah in status','He guards the Throne physically','He represents the Throne when communicating'],correct:1},
  {q:'Why does Allah describe Jibril (AS) in such detail in this surah?',opts:['Because people were worshipping Jibril and needed to be corrected','To counter the claim that the Quran came from Shaytan — the carrier is pure, noble, trustworthy, powerful, and honoured with Allah. The message is authentic and blessed.','Because Jibril had made a mistake that needed addressing','Because people were curious about what angels look like'],correct:1},
];

// S5 — Quiz: The Prophet Defended
const S5_QUIZ=[
  {q:'What does "Wa ma sahibukum bi-majnun" (81:22) mean?',opts:['Your companion sometimes acts strangely','STOP — "Your companion (Muhammad ﷺ) is NOT mad!" — a direct refutation of the Quraysh\'s most common insult against the Prophet ﷺ','Your companion is sometimes confused','Your companion does not always speak clearly'],correct:1},
  {q:'What did the Prophet ﷺ actually SEE on the clear horizon (81:23)?',opts:['A vision of Paradise shown to him as a dream','He truly saw Jibril (AS) — the angel — in his real form, on the bright/clear horizon. This is one of two confirmed sightings of Jibril in his real form.','He saw the Throne of Allah','He saw the signs of the Day of Judgment'],correct:1},
  {q:'What does "wa ma huwa \'ala al-ghayb bi-dhannin" (81:24) mean?',opts:['He does not know anything about the unseen','He is NOT withholding knowledge of the unseen — he tells everything Allah reveals to him. He is completely transparent about revelation.','He keeps some secrets from the people','He only shares some revelations'],correct:1},
  {q:'What is the final proof in 81:25 that the Quran is not from Shaytan?',opts:['It is too beautiful to be from evil','It is "not the word of a cursed devil (Shaytan rajim)" — Shaytan is cursed, expelled, far from Allah. The Quran comes through a NOBLE, HONOURED angel, not an expelled devil.','"The Quran itself says it is from Allah"','Only prophets can receive such words'],correct:1},
];

// S6 — Quiz: Where Are You Going?
const S6_QUIZ=[
  {q:'What is the challenge in "Fa-ayna tadh-habun?" (81:26)?',opts:['A geographical question about where people are travelling','A rhetorical divine challenge: WHERE are you going? If the Quran is guidance and you\'re turning away — where exactly are you heading? There is no better destination.','A question asking people to return home','An encouragement to travel the world'],correct:1},
  {q:'Who is the Quran a reminder for according to 81:27?',opts:['Only for Arabs who speak the language','For "al-\'alamin" — ALL the worlds, all of creation, all peoples of every time and place. The Quran is for everyone, forever.','Only for those who memorise it','Only for scholars who study it'],correct:1},
  {q:'What condition is required to benefit from the Quran according to 81:28?',opts:['You must know Arabic fluently','You must "sha\'a" — WILL it. Make a choice to take the straight path. The Quran is available — but you must choose to receive it.','You must be a Muslim from birth','You must study it under a scholar'],correct:1},
  {q:'How does 81:29 balance human free will with Allah\'s will?',opts:['It teaches that humans have no free will at all — only Allah decides','It balances both: you CAN will and choose — but even your ability to will is within Allah\'s greater will. "You cannot will unless Allah wills."','It teaches that Allah forces guidance on whoever He chooses','It means human choice is an illusion'],correct:1},
];

function renderSection1Game(){renderDragDrop(1,S1_ITEMS,S1_ZONES);}
function checkSection1(){checkDragDrop(1,S1_ZONES);}
function renderSection2Game(){renderQuiz(2,S2_QUIZ);}
function checkSection2(){checkQuiz(2,S2_QUIZ);}
function renderSection3Game(){renderStoryOrder(3,S3_EVENTS_CORRECT);}
function checkSection3(){checkStoryOrder(3,S3_EVENTS_CORRECT);}
function renderSection4Game(){renderQuiz(4,S4_QUIZ);}
function checkSection4(){checkQuiz(4,S4_QUIZ);}
function renderSection5Game(){renderQuiz(5,S5_QUIZ);}
function checkSection5(){checkQuiz(5,S5_QUIZ);}
function renderSection6Game(){renderQuiz(6,S6_QUIZ);}
function checkSection6(){checkQuiz(6,S6_QUIZ);}

// WORLD BUILDER — Celestial Canvas (stars appearing as levels unlock)
function _lbl(ctx,W,msg,d,t){ctx.fillStyle='#c8c070';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText(msg,W/2,18);ctx.fillStyle='#04040e';ctx.fillRect(W/2-100,26,200,8);ctx.fillStyle='#2828a0';ctx.fillRect(W/2-100,26,Math.round(200*d/t),8);ctx.textAlign='left';}
function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);
  sk.addColorStop(0,n>=6?'#0a0a30':'#04040e');sk.addColorStop(1,n>=6?'#181860':'#08081c');
  ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  // Stars
  const starData=[[80,30],[140,15],[200,45],[260,20],[320,35],[380,12],[440,28],[500,42],[60,55],[170,60],[290,50],[410,65],[530,30],[100,80],[350,75],[480,58]];
  starData.slice(0,n*3).forEach(([sx,sy],i)=>{
    const r=i%3===0?2.5:i%3===1?1.5:1;
    ctx.fillStyle=`rgba(200,200,255,${0.5+i%3*0.2})`;ctx.beginPath();ctx.arc(sx,sy,r,0,Math.PI*2);ctx.fill();
    if(n>=6){ctx.fillStyle=`rgba(255,230,100,${0.3+i%3*0.2})`;ctx.beginPath();ctx.arc(sx,sy,r*1.5,0,Math.PI*2);ctx.fill();}
  });
  if(n<1){_lbl(ctx,W,"⭐ Complete levels to build the Celestial Canvas!",0,6);return;}
  // Horizon
  ctx.fillStyle='#12123a';ctx.fillRect(0,200,W,50);ctx.fillStyle='#1c1c4a';ctx.fillRect(0,200,W,4);
  if(n<2){_lbl(ctx,W,"🌌 Cosmic horizon set — 1/6",1,6);return;}
  // Rolling sun (dimming)
  const sunG=ctx.createRadialGradient(W/2,100,0,W/2,100,40);sunG.addColorStop(0,'#ffffa0');sunG.addColorStop(1,'rgba(255,200,0,0)');
  ctx.globalAlpha=Math.max(0.1,1-n*0.15);ctx.fillStyle=sunG;ctx.beginPath();ctx.arc(W/2,100,40,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  if(n<3){_lbl(ctx,W,"☀️ Sun rolls up — 2/6",2,6);return;}
  // Mountains
  [[60,200,80],[240,200,60],[400,200,70],[480,200,55]].forEach(([mx,my,mw])=>{ctx.fillStyle='#1c1c4a';ctx.beginPath();ctx.moveTo(mx,my);ctx.lineTo(mx+mw/2,my-35);ctx.lineTo(mx+mw,my);ctx.fill();});
  if(n<4){_lbl(ctx,W,"⛰️ Mountains in motion — 3/6",3,6);return;}
  // Records unrolling
  ctx.fillStyle='#c8c090';ctx.fillRect(W/2-40,120,80,50);ctx.strokeStyle='#a08030';ctx.lineWidth=1;ctx.strokeRect(W/2-40,120,80,50);
  ctx.fillStyle='#2a2060';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText('DEEDS',W/2,148);ctx.textAlign='left';
  if(n<5){_lbl(ctx,W,"📜 Records laid open — 4/6",4,6);return;}
  // Hell and Paradise
  ctx.fillStyle='rgba(220,60,20,0.5)';ctx.fillRect(40,170,100,30);
  ctx.fillStyle='rgba(40,180,80,0.5)';ctx.fillRect(420,170,100,30);
  ctx.fillStyle='#fff';ctx.font='5px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText('🔥',90,190);ctx.fillText('🌿',470,190);ctx.textAlign='left';
  if(n<6){_lbl(ctx,W,"⚖️ Hell & Paradise revealed — 5/6",5,6);return;}
  // Complete: full cosmic scene
  const lg=ctx.createRadialGradient(W/2,50,0,W/2,50,180);
  lg.addColorStop(0,'rgba(200,200,255,0.15)');lg.addColorStop(1,'rgba(100,100,200,0)');
  ctx.fillStyle=lg;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#c8c070';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';
  ctx.fillText("ALLAHUMMA BARIK! 🌌 CELESTIAL CANVAS COMPLETE!",W/2,230);
  ctx.font='6px "Press Start 2P",monospace';ctx.fillText('"Fa-ayna tadh-habun?" — 81:26',W/2,242);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
