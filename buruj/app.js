'use strict';
/* SURAH AL-BURUJ (85) — app.js */
window.STORAGE_KEY='burujQuestSave';
window.state = window.buildDefaultState(7);

const REWARDS={
  1: {xp:60, gems:3, icon:'📖', title:'Words Learned!', msg:'MashAllah! You learned the key Arabic words of this surah!'},
  2:{xp:80,gems:3,icon:'⭐',title:'THE OATHS UNDERSTOOD!',msg:"SubhanAllah! Three powerful oaths: By the sky with its constellations — by the Promised Day — by the witness and the witnessed. Allah swears by the vast, ordered sky; by the certain Day of Judgment; by the witnesses of this world and the next. These oaths certify: everything you are about to read is TRUTH."},
  3:{xp:80,gems:3,icon:'🔥',title:'THE DITCH EXPOSED!',msg:"Allahu Akbar! The People of the Ditch — 'Ashab al-Ukhdud.' The tyrant Dhunuwas dug trenches of fire in Yemen and threw believers in for refusing to abandon their faith. The persecutors sat watching, witnessing their own evil. They were 'DESTROYED.' But the believers? They entered the gardens of the Greatest Success."},
  4:{xp:90,gems:3,icon:'✊',title:'THE TRUE CRIME REVEALED!',msg:"MashAllah! 'Wa ma naqamu minhum illa an yu\'minu bi-Allah al-Aziz al-Hamid.' Their ONLY crime was believing in Allah — the Most Powerful and Most Praiseworthy. No worldly crime. No harm done to others. Just faith. This is the highest form of persecution — and the highest form of martyrdom."},
  5:{xp:90,gems:4,icon:'🌿',title:'AL-FAWZ AL-KABIR CLAIMED!',msg:"SubhanAllah! 'Lahum jannatun tajri min tahtiha al-anhar — dhalika al-fawz al-kabir.' For the believers: gardens with rivers flowing beneath. And it is called 'AL-FAWZ AL-KABIR' — THE GREAT ATTAINMENT. The believers burned in earthly ditches and entered directly into the greatest success in existence!"},
  6:{xp:100,gems:4,icon:'⚡',title:'ALLAH\'S GRIP KNOWN!',msg:"Allahu Akbar! 'Inna batsha Rabbika la-shadid.' Indeed the GRIP of your Lord is SEVERE. The tyrants who burned believers — destroyed. Pharaoh and Thamud (85:17-20) — destroyed. Allah's grip catches every oppressor perfectly. No one escapes. 'Wa Allahu min wara\'ihim muhit' — Allah surrounds them from behind (85:20)."},
  7:{xp:120,gems:5,icon:'📜',title:'SURAH AL-BURUJ COMPLETE!',msg:"ALLAHUMMA BARIK! All 7 levels of Surah Al-Buruj complete! The sky with constellations. The People of the Ditch. The only crime: faith. The great attainment. Allah's severe grip. And the Quran Majid — preserved in the Lawh al-Mahfudh, beyond all harm. May we be among the faithful. Ameen!"},
};
window.SURAH_CONFIG={
  totalLevels:7,rewards:REWARDS,
  tileIcons:['📖','⭐','🔥','✊','🌿','⚡','📜'],
  tileLabels:['Word by Word','The Oaths','Ditch','Their Crime','Attainment','Grip','Tablet'],
  welcomeMsg:{
    fresh:name=>`As-salamu alaykum, ${name}! Surah Al-Buruj — The Constellations! By the starry sky, by the Promised Day. The People of the Ditch burned for believing. Their only crime: faith in Allah. Allah's grip is severe. The Quran is Preserved forever. 7 levels await!`,
    partial:(name,done)=>`Welcome back, ${name}! ${done} level${done>1?'s':''} complete. "Wa ma naqamu minhum illa an yu\'minu bi-Allah" — They believed and stood firm. Keep going! ⭐`,
    complete:name=>`MashAllah, ${name}! Surah Al-Buruj complete! "Bal huwa Quranun Majid — fi Lawhin Mahfudh." Glorious Quran, Preserved forever. Ameen! 📜`,
  },
};

/* ── LEVEL 1: Word by Word ── */
const WBW_DATA = [
  {label:'85:1 — وَالسَّمَاءِ ذَاتِ الْبُرُوجِ', words:[
    {ar:'الْبُرُوجِ', tr:'al-burūj', en:'the great constellations', freq:3},
    {ar:'ذَاتِ', tr:'dhāti', en:'possessor of', freq:36},
    {ar:'وَالسَّمَاءِ', tr:'wal-samāʾ', en:'by the sky', freq:120},
  ]},
  {label:'85:2 — وَالْيَوْمِ الْمَوْعُودِ', words:[
    {ar:'الْمَوْعُودِ', tr:'al-mawʿūd', en:'the Promised [Day]', freq:3},
    {ar:'وَالْيَوْمِ', tr:'wal-yawm', en:'and the Day', freq:365},
  ]},
  {label:'85:3 — وَشَاهِدٍ وَمَشْهُودٍ', words:[
    {ar:'وَمَشْهُودٍ', tr:'wa-mashhūd', en:'and what is witnessed', freq:4},
    {ar:'وَشَاهِدٍ', tr:'wa-shāhid', en:'and a witness', freq:35},
  ]},
  {label:'85:4 — قُتِلَ أَصْحَابُ الْأُخْدُودِ', words:[
    {ar:'الْأُخْدُودِ', tr:'al-ukhdūd', en:'the ditch', freq:1},
    {ar:'أَصْحَابُ', tr:'aṣḥābu', en:'the people of', freq:40},
    {ar:'قُتِلَ', tr:'qutila', en:'cursed / destroyed were', freq:7},
  ]},
  {label:'85:5 — النَّارِ ذَاتِ الْوَقُودِ', words:[
    {ar:'الْوَقُودِ', tr:'al-waqūd', en:'the fuel', freq:2},
    {ar:'ذَاتِ', tr:'dhāti', en:'full of', freq:36},
    {ar:'النَّارِ', tr:'al-nār', en:'the Fire', freq:145},
  ]},
  {label:'85:6 — إِذْ هُمْ عَلَيْهَا قُعُودٌ', words:[
    {ar:'قُعُودٌ', tr:'quʿūd', en:'sitting', freq:1},
    {ar:'عَلَيْهَا', tr:'ʿalayhā', en:'by it', freq:108},
    'hum',
    {ar:'إِذْ', tr:'idh', en:'when', freq:183},
  ]},
  {label:'85:7 — وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِالْمُؤْمِنِينَ شُهُودٌ', words:[
    {ar:'شُهُودٌ', tr:'shuhūd', en:'witnesses', freq:35},
    {ar:'بِالْمُؤْمِنِينَ', tr:'bil-muʾminīn', en:'to the believers', freq:65},
    {ar:'يَفْعَلُونَ', tr:'yafʿalūn', en:'they were doing', freq:172},
    'ma',
    {ar:'عَلَىٰ', tr:'ʿalā', en:'over', freq:472},
    {ar:'وَهُمْ', tr:'wa hum', en:'and they', freq:850},
  ]},
  {label:'85:8 — وَمَا نَقَمُوا مِنْهُمْ إِلَّا أَن يُؤْمِنُوا بِاللَّهِ الْعَزِيزِ الْحَمِيدِ', words:[
    {ar:'الْحَمِيدِ', tr:'al-ḥamīd', en:'the Praiseworthy', freq:17},
    {ar:'الْعَزِيزِ', tr:'al-ʿazīz', en:'the Almighty', freq:92},
    {ar:'بِاللَّهِ', tr:'billāhi', en:'in Allah', freq:2699},
    {ar:'يُؤْمِنُوا', tr:'yuʾminū', en:'they believe', freq:811},
    {ar:'أَن', tr:'an', en:'that', freq:986},
    'illa',
    {ar:'مِنْهُمْ', tr:'minhum', en:'against them', freq:270},
    {ar:'نَقَمُوا', tr:'naqamū', en:'they resented', freq:2},
    {ar:'وَمَا', tr:'wa mā', en:'and not', freq:2005},
  ]},
  {label:'85:9 — الَّذِي لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ', words:[
    'wal-ard',
    'al-samawat',
    {ar:'مُلْكُ', tr:'mulku', en:'dominion of', freq:48},
    {ar:'لَهُ', tr:'lahu', en:'to Him belongs', freq:850},
    'alladhi',
  ]},
  {label:'85:9b — وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ', words:[
    {ar:'شَهِيدٌ', tr:'shahīd', en:'Witness', freq:35},
    'shay',
    {ar:'كُلِّ', tr:'kulli', en:'every', freq:330},
    {ar:'عَلَىٰ', tr:'ʿalā', en:'over', freq:472},
    {ar:'وَاللَّهُ', tr:'wallāhu', en:'and Allah', freq:2699},
  ]},
  {label:'85:10 — إِنَّ الَّذِينَ فَتَنُوا الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ ثُمَّ لَمْ يَتُوبُوا', words:[
    {ar:'يَتُوبُوا', tr:'yatūbū', en:'they repent', freq:12},
    'lam',
    'thumma',
    {ar:'وَالْمُؤْمِنَاتِ', tr:'wal-muʾmināt', en:'and the believing women', freq:24},
    {ar:'الْمُؤْمِنِينَ', tr:'al-muʾminīn', en:'the believing men', freq:65},
    {ar:'فَتَنُوا', tr:'fatanū', en:'persecuted', freq:7},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    'inna',
  ]},
  {label:'85:10b — فَلَهُمْ عَذَابُ جَهَنَّمَ وَلَهُمْ عَذَابُ الْحَرِيقِ', words:[
    {ar:'الْحَرِيقِ', tr:'al-ḥarīq', en:'the Burning', freq:5},
    {ar:'عَذَابُ', tr:'ʿadhābu', en:'punishment of', freq:373},
    {ar:'وَلَهُمْ', tr:'wa lahum', en:'and for them is', freq:850},
    'jahannam',
    {ar:'عَذَابُ', tr:'ʿadhābu', en:'punishment of', freq:373},
    {ar:'فَلَهُمْ', tr:'fa-lahum', en:'then for them is', freq:850},
  ]},
  {label:'85:11 — إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ جَنَّاتٌ', words:[
    {ar:'جَنَّاتٌ', tr:'jannāt', en:'gardens', freq:147},
    {ar:'لَهُمْ', tr:'lahum', en:'for them are', freq:850},
    {ar:'الصَّالِحَاتِ', tr:'al-ṣāliḥāt', en:'righteous deeds', freq:73},
    {ar:'وَعَمِلُوا', tr:'wa ʿamilū', en:'and did', freq:73},
    {ar:'آمَنُوا', tr:'āmanū', en:'believed', freq:811},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    'inna',
  ]},
  {label:'85:11b — تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ذَٰلِكَ الْفَوْزُ الْكَبِيرُ', words:[
    {ar:'الْكَبِيرُ', tr:'al-kabīr', en:'the Great', freq:52},
    {ar:'الْفَوْزُ', tr:'al-fawz', en:'the Attainment', freq:7},
    'dhalika',
    {ar:'الْأَنْهَارُ', tr:'al-anhār', en:'the rivers', freq:54},
    {ar:'تَحْتِهَا', tr:'taḥtihā', en:'beneath them', freq:54},
    'min',
    {ar:'تَجْرِي', tr:'tajrī', en:'flow', freq:54},
  ]},
  {label:'85:12 — إِنَّ بَطْشَ رَبِّكَ لَشَدِيدٌ', words:[
    {ar:'لَشَدِيدٌ', tr:'la-shadīd', en:'truly severe', freq:52},
    'rabbika',
    {ar:'بَطْشَ', tr:'baṭsha', en:'the grip of', freq:5},
    'inna',
  ]},
  {label:'85:13 — إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ', words:[
    {ar:'وَيُعِيدُ', tr:'wa-yuʿīd', en:'and repeats', freq:7},
    {ar:'يُبْدِئُ', tr:'yubdiʾ', en:'originates', freq:7},
    'huwa',
    {ar:'إِنَّهُ', tr:'innahu', en:'indeed He', freq:743},
  ]},
  {label:'85:14 — وَهُوَ الْغَفُورُ الْوَدُودُ', words:[
    {ar:'الْوَدُودُ', tr:'al-wadūd', en:'the Loving', freq:2},
    {ar:'الْغَفُورُ', tr:'al-ghafūr', en:'the Forgiving', freq:91},
    {ar:'وَهُوَ', tr:'wa huwa', en:'and He is', freq:526},
  ]},
  {label:'85:15 — ذُو الْعَرْشِ الْمَجِيدُ', words:[
    {ar:'الْمَجِيدُ', tr:'al-majīd', en:'the Glorious', freq:4},
    {ar:'الْعَرْشِ', tr:'al-ʿarsh', en:'the Throne', freq:26},
    {ar:'ذُو', tr:'dhū', en:'Owner of', freq:28},
  ]},
  {label:'85:16 — فَعَّالٌ لِّمَا يُرِيدُ', words:[
    {ar:'يُرِيدُ', tr:'yurīd', en:'He intends', freq:139},
    {ar:'لِّمَا', tr:'limā', en:'for what', freq:2005},
    {ar:'فَعَّالٌ', tr:'faʿʿāl', en:'Doer (Effecter)', freq:1},
  ]},
  {label:'85:17 — هَلْ أَتَاكَ حَدِيثُ الْجُنُودِ', words:[
    {ar:'الْجُنُودِ', tr:'al-junūd', en:'the soldiers / armies', freq:10},
    {ar:'حَدِيثُ', tr:'ḥadīthu', en:'the story of', freq:36},
    {ar:'أَتَاكَ', tr:'atāka', en:'reached you', freq:130},
    {ar:'هَلْ', tr:'hal', en:'has', freq:101},
  ]},
  {label:'85:18 — فِرْعَوْنَ وَثَمُودَ', words:[
    {ar:'وَثَمُودَ', tr:'wa Thamūd', en:'and Thamud', freq:26},
    {ar:'فِرْعَوْنَ', tr:'Firʿawn', en:'Pharaoh', freq:74},
  ]},
  {label:'85:19 — بَلِ الَّذِينَ كَفَرُوا فِي تَكْذِيبٍ', words:[
    {ar:'تَكْذِيبٍ', tr:'takdhīb', en:'denial', freq:5},
    'fi',
    {ar:'كَفَرُوا', tr:'kafarū', en:'disbelieved', freq:525},
    {ar:'الَّذِينَ', tr:'alladhīna', en:'those who', freq:1283},
    {ar:'بَلِ', tr:'bal', en:'rather / nay', freq:126},
  ]},
  {label:'85:20 — وَاللَّهُ مِن وَرَائِهِم مُّحِيطٌ', words:[
    {ar:'مُّحِيطٌ', tr:'muḥīṭ', en:'encompassing', freq:8},
    {ar:'وَرَائِهِم', tr:'warāʾihim', en:'behind them', freq:15},
    'min',
    {ar:'وَاللَّهُ', tr:'wallāhu', en:'and Allah', freq:2699},
  ]},
  {label:'85:21 — بَلْ هُوَ قُرْآنٌ مَّجِيدٌ', words:[
    {ar:'مَّجِيدٌ', tr:'majīd', en:'glorious', freq:4},
    {ar:'قُرْآنٌ', tr:'Qurʾān', en:'a Quran', freq:70},
    'huwa',
    {ar:'بَلْ', tr:'bal', en:'rather / nay', freq:126},
  ]},
  {label:'85:22 — فِي لَوْحٍ مَّحْفُوظٍ', words:[
    {ar:'مَّحْفُوظٍ', tr:'maḥfūẓ', en:'preserved', freq:3},
    {ar:'لَوْحٍ', tr:'lawḥ', en:'a Tablet', freq:4},
    'fi',
  ]},
];

window.setupWBWLevel(WBW_DATA, 10);

const S1_ITEMS=[{id:'i1',text:'وَالسَّمَاءِ ذَاتِ\nالْبُرُوجِ',zone:'z1'},{id:'i2',text:'وَالْيَوْمِ\nالْمَوْعُودِ',zone:'z2'},{id:'i3',text:'وَشَاهِدٍ\nوَمَشْهُودٍ',zone:'z3'}];
const S1_ZONES=[{id:'z1',desc:'By the sky with constellations — the great star formations, towers of the sky (85:1)'},{id:'z2',desc:'And the Promised Day — the Day of Judgment, guaranteed by Allah (85:2)'},{id:'z3',desc:'And a witness and what is witnessed — all of reality is observed (85:3)'}];

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
  {q:'What is "al-Fawz al-Kabir" (الفَوْزُ الكَبِير) in 85:11?',
   opts:['A small but meaningful victory in this temporary world',
         'The final battle eventually won by the believers',
         'THE GREAT ATTAINMENT — gardens with rivers for the faithful',
         'Just another poetic name for Paradise in general'],
   correct:2},
  {q:'What is special about "gardens beneath which rivers flow" in Paradise?',
   opts:['The rivers are the literal Nile and Euphrates flowing there',
         'Believers thrown into fire on earth will have rivers beneath them',
         'The rivers flow above the tops of the trees of Paradise',
         'The gardens have no specific features other than their size'],
   correct:1},
  {q:'Who specifically receives "al-Fawz al-Kabir" according to 85:11?',
   opts:['Only those who died specifically as martyrs in battle',
         'Only the prophets and their close companions',
         'Those who memorised the entire Quran by heart',
         'Those who believed AND did righteous deeds — both conditions'],
   correct:3},
  {q:'Why does this verse come immediately after the story of the Ditch?',
   opts:['To show the story has a happy ending for the tyrants too',
         'To show that Paradise is reserved only for actual martyrs',
         'To warn that good deeds must always follow after faith',
         'Immediate response: yes they burned — but here is where they went'],
   correct:3},
];

const S5_QUIZ=[
  {q:'"Inna batsha Rabbika la-shadid" (85:12) — what does this teach?',
   opts:['Allah\'s punishment is always quick and immediate in this world',
         'Allah\'s grip is SEVERE — inescapable even if delayed',
         'Only the very worst criminals will face Allah\'s severe grip',
         'Allah only punishes in the afterlife, never in this world'],
   correct:1},
  {q:'Why are Pharaoh and Thamud mentioned in 85:17-20?',
   opts:['Because they had the largest and most powerful armies in history',
         'Because they believed in Islam and then rejected it later',
         'Because they were contemporaries of the People of the Ditch',
         'Historical proof that Allah\'s grip is severe — both were destroyed'],
   correct:3},
  {q:'"Wa Allahu min wara\'ihim muhit" (85:20) — what does this mean?',
   opts:['Allah only watches oppressors from a safe distance',
         'Allah physically circles around the oppressors at all times',
         'Allah surrounds only the believers in order to protect them',
         'Allah encompasses them completely — their freedom is an illusion'],
   correct:3},
  {q:'How does "Allah\'s grip is severe" affect a believer facing oppression?',
   opts:['It makes the believer want to take immediate personal revenge',
         'It teaches that injustice in this world should simply be ignored',
         'It means believers should not bother praying for justice at all',
         'It gives patience — the oppressor faces Allah\'s certain grip'],
   correct:3},
];

const S6_QUIZ=[
  {q:'What does "Quranun Majid" (قُرْآنٌ مَّجِيد) in 85:21 mean?',
   opts:['A Quran that is difficult for ordinary people to understand',
         'A Glorious, Magnificent Quran — "majd" means glory and honour',
         'A Quran that is widely recited by many people around the world',
         'An ancient Quran that has survived thousands of years'],
   correct:1},
  {q:'What is "Lawh al-Mahfudh" (لَوْحٍ مَّحْفُوظٍ) in 85:22?',
   opts:['A physical stone tablet that is kept safely in Makkah',
         'The Preserved Tablet — Allah\'s primordial record, beyond all harm',
         'A backup copy of the Quran that is kept safe in Paradise',
         'The tablet on which the Prophet ﷺ personally wrote revelations'],
   correct:1},
  {q:'What is the significance of ending with the Preserved Tablet?',
   opts:['Believers can read the Quran to feel better after persecution',
         'It shows the Quran was specifically revealed in response to persecution',
         'The Preserved Tablet was actually shown to the believers in the ditch',
         'Persecutors tried to destroy the faith — "Glorious Quran — PRESERVED"'],
   correct:3},
  {q:'What is the overall message of Surah Al-Buruj for believers?',
   opts:['Avoid all situations that could possibly lead to persecution',
         'Only the major prophets ever faced genuinely real persecution',
         'Study history carefully so you never repeat its past mistakes',
         'The sky witnesses, the Day is certain, the Quran is preserved — hold on'],
   correct:3},
];

// =============================================
//  SECTION REGISTRATION (shared helpers from engine.js)
// =============================================
window.registerMatch(2, S1_ITEMS,S1_ZONES);
window.registerQuiz(3, S2_QUIZ);
window.registerQuiz(4, S3_QUIZ);
window.registerQuiz(5, S4_QUIZ);
window.registerQuiz(6, S5_QUIZ);
window.registerQuiz(7, S6_QUIZ);

function _drawBuildCanvas(n){
  const c=document.getElementById('build-canvas');if(!c)return;
  const ctx=c.getContext('2d'),W=560,H=250;ctx.clearRect(0,0,W,H);
  const sk=ctx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#04080e');sk.addColorStop(1,'#0e1828');ctx.fillStyle=sk;ctx.fillRect(0,0,W,H);
  const pts=[[40,15],[90,8],[160,22],[220,5],[300,18],[380,10],[440,25],[510,8],[70,45],[200,38],[330,42],[460,35],[140,55],[290,60],[420,50]];
  pts.slice(0,n*3).forEach(([x,y],i)=>{ctx.fillStyle=`rgba(100,140,220,${0.3+i%3*0.2})`;ctx.beginPath();ctx.arc(x,y,i%3===0?2:1.2,0,Math.PI*2);ctx.fill();});
  if(n<1){_buildLabel(ctx,W,"⭐ Complete levels to build the Constellation Sky!",0,6);return;}
  ctx.fillStyle='#121e28';ctx.fillRect(0,210,W,40);ctx.fillStyle='#182838';ctx.fillRect(0,210,W,5);
  if(n<2){_buildLabel(ctx,W,"⭐ Constellation sky revealed — 1/6",1,6);return;}
  // Fire trench
  fillRect(ctx,W/2-80,190,160,20,'#200808');for(let f=0;f<7;f++){const fx=W/2-65+f*20,fh=10+f%3*5;ctx.fillStyle=`rgba(200,${40+f*12},10,0.8)`;ctx.beginPath();ctx.moveTo(fx+3,210);ctx.lineTo(fx,210-fh);ctx.lineTo(fx+6,210);ctx.fill();}
  if(n<3){_buildLabel(ctx,W,"🔥 Ditch of fire — 2/6",2,6);return;}
  // Constellations connected
  const con=[[80,30],[100,20],[120,35],[95,45],[80,30]];ctx.strokeStyle='rgba(200,176,48,0.5)';ctx.lineWidth=1;ctx.beginPath();con.forEach(([x,y],i)=>{if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.stroke();con.forEach(([x,y])=>{ctx.fillStyle='rgba(200,176,48,0.8)';ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();});
  if(n<4){_buildLabel(ctx,W,"⭐ Constellations mapped — 3/6",3,6);return;}
  // Garden
  ctx.fillStyle='rgba(40,180,80,0.2)';ctx.fillRect(350,175,180,35);ctx.fillStyle='rgba(30,100,200,0.4)';ctx.fillRect(360,190,160,12);[[370,170],[400,165],[430,172],[460,168]].forEach(([tx,ty])=>{ctx.fillStyle='#1a3808';ctx.fillRect(tx-2,ty,4,20);ctx.fillStyle='#0a2808';ctx.fillRect(tx-6,ty-12,12,16);});
  if(n<5){_buildLabel(ctx,W,"🌿 Gardens of Fawz al-Kabir — 4/6",4,6);return;}
  // Preserved tablet glow
  ctx.shadowColor='rgba(200,176,48,0.5)';ctx.shadowBlur=12;fillRect(ctx,W/2-30,80,60,70,'#0e1828');ctx.strokeStyle='rgba(200,176,48,0.8)';ctx.lineWidth=1;ctx.strokeRect(W/2-30,80,60,70);ctx.shadowBlur=0;ctx.fillStyle='rgba(200,176,48,0.7)';ctx.font='6px serif';ctx.textAlign='center';ctx.fillText('قُرْآن',W/2,115);ctx.fillText('مَجِيد',W/2,128);ctx.textAlign='left';
  if(n<6){_buildLabel(ctx,W,"📜 Preserved Tablet appears — 5/6",5,6);return;}
  ctx.fillStyle='#c8b030';ctx.font='7px "Press Start 2P",monospace';ctx.textAlign='center';ctx.fillText("ALLAHUMMA BARIK! ⭐ AL-BURUJ COMPLETE!",W/2,237);ctx.font='5px "Press Start 2P",monospace';ctx.fillText('"Bal huwa Quranun Majid — fi Lawhin Mahfudh" 85:21-22',W/2,H-2);ctx.textAlign='left';
}
function updateUIExtra(){_drawBuildCanvas(window.state.completed.length);}
