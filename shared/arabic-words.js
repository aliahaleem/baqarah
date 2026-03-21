'use strict';
/* ═══════════════════════════════════════════════════════════════════
   SHARED ARABIC WORD LIBRARY — baqarah/shared/arabic-words.js
   ───────────────────────────────────────────────────────────────────
   Each entry: { ar, tr, en, freq }
     ar   = Arabic text
     tr   = transliteration
     en   = English meaning
     freq = approximate occurrences in the Quran (root/lemma basis).
            freq:1 = confirmed hapax legomenon (appears only in one ayah).
            All other counts are root-based and approximate.
   ═══════════════════════════════════════════════════════════════════ */

window.AW = {

  /* ── Universal connectors / particles ── */
  'qul'        : {ar:'قُلْ',              tr:'Qul',            en:'Say',                              freq:332},
  'wa'         : {ar:'وَ',               tr:'wa',             en:'and',                              freq:13800},
  'min'        : {ar:'مِن',              tr:'min',            en:'from',                             freq:1891},
  'min2'       : {ar:'مِّن',             tr:'min',            en:'from',                             freq:1891},
  'fi'         : {ar:'فِي',              tr:'fī',             en:'in / into',                        freq:1714},
  'ma'         : {ar:'مَا',              tr:'mā',             en:'what',                             freq:2005},
  'la'         : {ar:'لَا',              tr:'lā',             en:'not / no',                         freq:1069},
  'inna'       : {ar:'إِنَّ',            tr:'inna',           en:'Indeed',                           freq:743},
  'innaa'      : {ar:'إِنَّا',           tr:'innā',           en:'Indeed We',                        freq:112},
  'huwa'       : {ar:'هُوَ',             tr:'huwa',           en:'He / it is',                       freq:526},
  'alladhi'    : {ar:'الَّذِي',         tr:'alladhī',        en:'who / that which',                 freq:1283},
  'idha'       : {ar:'إِذَا',            tr:'idhā',           en:'when',                             freq:406},
  'wala'       : {ar:'وَلَا',            tr:'wa-lā',          en:'and not',                          freq:626},
  'walam'      : {ar:'وَلَمْ',           tr:'wa-lam',         en:'and did not',                      freq:74},
  'lam'        : {ar:'لَمْ',             tr:'lam',            en:'did not',                          freq:234},

  /* ── Allah / Lord ── */
  'allah'      : {ar:'اللَّهِ',         tr:'Allāh',          en:'of Allah',                         freq:2699},
  'allahu'     : {ar:'اللَّهُ',         tr:'Allāhu',         en:'Allah',                            freq:2699},
  'rabb'       : {ar:'رَبِّ',           tr:'rabb',           en:'(my) Lord / Lord of',              freq:950},
  'rabba'      : {ar:'رَبَّ',           tr:'rabba',          en:'Lord of',                          freq:950},
  'rabbuka'    : {ar:'رَبُّكَ',          tr:'rabbuka',        en:'your Lord',                        freq:30},
  'rabbika'    : {ar:'رَبِّكَ',          tr:'rabbika',        en:'your Lord',                        freq:49},

  /* ── People ── */
  'al-nas'     : {ar:'النَّاسِ',        tr:'al-nās',         en:'(of) mankind',                     freq:241},
  'al-nas-n'   : {ar:'النَّاسَ',        tr:'al-nās',         en:'the people',                       freq:241},
  'al-jinn'    : {ar:'الْجِنَّةِ',      tr:'al-jinna',       en:'(the) jinn',                       freq:22},
  'al-yateem'  : {ar:'الْيَتِيمَ',      tr:'al-yatīm',       en:'the orphan',                       freq:22},
  'al-miskeen' : {ar:'الْمِسْكِينِ',    tr:'al-miskīn',      en:'the poor / needy',                 freq:25},

  /* ── Worship ── */
  'a-budu'     : {ar:'أَعْبُدُ',        tr:'aʿbudu',         en:'I worship',                        freq:11},
  'ta-budun'   : {ar:'تَعْبُدُونَ',    tr:'taʿbudūn',       en:'you (pl.) worship',                freq:9},
  'abidun'     : {ar:'عَابِدٌ',         tr:'ʿābidun',        en:'a worshipper',                     freq:7},
  'abidun-pl'  : {ar:'عَابِدُونَ',     tr:'ʿābidūn',        en:'worshippers',                      freq:6},
  'abadttum'   : {ar:'عَبَدتُّمْ',     tr:'ʿabadttum',      en:'what you have worshipped',          freq:3},
  'fasalli'    : {ar:'فَصَلِّ',         tr:'faṣalli',        en:'so pray',                          freq:83},
  'fasabbih'   : {ar:'فَسَبِّحْ',       tr:'fasabbiḥ',       en:'so glorify (Allah)',               freq:7},
  'wastaghfirhu':{ar:'وَاسْتَغْفِرْهُ', tr:'wastaghfirhu',   en:'and seek His forgiveness',         freq:4},

  /* ── Religion / Deen ── */
  'al-deen'    : {ar:'بِالدِّينِ',      tr:'bil-dīn',        en:'the religion / deen',              freq:92},
  'dinukum'    : {ar:'دِينُكُمْ',       tr:'dīnukum',        en:'your religion',                    freq:3},
  'dini'       : {ar:'دِينِ',           tr:'dīni',           en:'my religion',                      freq:5},
  'din-allah'  : {ar:'دِينِ اللَّهِ',  tr:'dīn Allāh',      en:'religion of Allah',                freq:3},

  /* ── Common particles / grammar ── */
  'kalla'      : {ar:'كَلَّا',            tr:'kallā',          en:'No! / Nay!',                       freq:33},
  'thumma'     : {ar:'ثُمَّ',             tr:'thumma',         en:'then',                             freq:340},
  'illa'       : {ar:'إِلَّا',            tr:'illā',           en:'except',                           freq:663},
  'alam'       : {ar:'أَلَمْ',            tr:'alam',           en:'have We not / did not',            freq:40},
  'ila'        : {ar:'إِلَىٰ',            tr:'ilā',            en:'to / towards',                     freq:742},
  'bihi'       : {ar:'بِهِ',             tr:'bihi',           en:'with it / thereby',                freq:190},
  'fiiha'      : {ar:'فِيهَا',           tr:'fīhā',           en:'therein / in it',                  freq:183},
  'hum'        : {ar:'هُمْ',             tr:'hum',            en:'they',                             freq:850},
  'man'        : {ar:'مَنْ',             tr:'man',            en:'who / whoever',                    freq:350},
  'kulla'      : {ar:'كُلَّ',            tr:'kulla',          en:'every / all',                      freq:330},
  'dhalika'    : {ar:'ذَٰلِكَ',          tr:'dhālika',        en:'that (is)',                        freq:382},
  'ya'         : {ar:'يَا',              tr:'yā',             en:'O!',                               freq:293},
  'kaana'      : {ar:'كَانَ',            tr:'kāna',           en:'was / is',                         freq:1358},
  'kaanat'     : {ar:'كَانَتْ',          tr:'kānat',          en:'was (fem.)',                       freq:120},
  'kaanu'      : {ar:'كَانُوا',          tr:'kānū',           en:'they were',                        freq:226},
  'qala'       : {ar:'وَقَالَ',          tr:'wa-qāla',        en:'and he said',                      freq:528},
  'shay'       : {ar:'شَيْءٍ',           tr:'shayʾ',          en:'thing',                            freq:283},

  /* ── Nature / Creation ── */
  'al-ard'     : {ar:'الْأَرْضَ',        tr:'al-arḍ',         en:'the earth',                        freq:461},
  'al-ard-i'   : {ar:'الْأَرْضِ',        tr:'al-arḍ',         en:'(of) the earth',                   freq:461},
  'al-sama'    : {ar:'السَّمَاءُ',       tr:'al-samāʾ',       en:'the sky / heaven',                 freq:310},
  'al-samawat' : {ar:'السَّمَاوَاتِ',    tr:'al-samāwāt',     en:'the heavens',                      freq:190},
  'wal-ard'    : {ar:'وَالْأَرْضِ',      tr:'wal-arḍ',        en:'and the earth',                    freq:95},
  'al-jibal'   : {ar:'الْجِبَالَ',       tr:'al-jibāl',       en:'the mountains',                    freq:33},
  'al-jibal-u' : {ar:'الْجِبَالُ',       tr:'al-jibāl',       en:'the mountains',                    freq:33},
  'al-layl'    : {ar:'اللَّيْلَ',        tr:'al-layl',        en:'the night',                        freq:73},
  'al-nahar'   : {ar:'النَّهَارَ',       tr:'al-nahār',       en:'the daytime',                      freq:57},
  'maa'        : {ar:'مَاءً',            tr:'māʾ',            en:'water',                            freq:63},
  'wa-ja-alna' : {ar:'وَجَعَلْنَا',     tr:'wa-jaʿalnā',     en:'And We made',                      freq:30},
  'wa-anzalna' : {ar:'وَأَنزَلْنَا',    tr:'wa-anzalnā',     en:'And We sent down',                 freq:20},

  /* ── Time / Judgement ── */
  'yawma'      : {ar:'يَوْمَ',           tr:'yawma',          en:'(on) the Day',                     freq:365},
  'al-yawm'    : {ar:'الْيَوْمُ',        tr:'al-yawm',        en:'the Day',                          freq:365},
  'al-fasl'    : {ar:'الْفَصْلِ',        tr:'al-faṣl',        en:'of Judgement / Decision',           freq:5},
  'al-sur'     : {ar:'الصُّورِ',         tr:'al-ṣūr',         en:'the Horn / Trumpet',               freq:10},
  'jahannam'   : {ar:'جَهَنَّمَ',        tr:'jahannam',       en:'Hell / Jahannam',                  freq:77},
  'adhaab'     : {ar:'عَذَابًا',         tr:'ʿadhāb',         en:'punishment / torment',             freq:373},
  'jazaa'      : {ar:'جَزَاءً',          tr:'jazāʾ',          en:'recompense / reward',              freq:42},
  'hisaab'     : {ar:'حِسَابًا',         tr:'ḥisāb',          en:'account / reckoning',              freq:32},
  'al-haqq'    : {ar:'الْحَقُّ',         tr:'al-ḥaqq',        en:'the Truth',                        freq:287},

  /* ── Beings ── */
  'al-malaika' : {ar:'الْمَلَائِكَةُ',  tr:'al-malāʾika',   en:'the angels',                       freq:88},
  'al-ruh'     : {ar:'الرُّوحُ',         tr:'al-rūḥ',         en:'the Spirit (Jibreel)',             freq:21},
  'al-rahman'  : {ar:'الرَّحْمَٰنِ',    tr:'al-Raḥmān',      en:'the Most Merciful',                freq:57},
  'al-rahman-u': {ar:'الرَّحْمَٰنُ',    tr:'al-Raḥmān',      en:'the Most Merciful',                freq:57},
  'al-kaafir'  : {ar:'الْكَافِرُ',       tr:'al-kāfir',       en:'the disbeliever',                  freq:525},
  'al-muttaqin': {ar:'لِلْمُتَّقِينَ',  tr:'lil-muttaqīn',   en:'for the righteous',                freq:26},

  /* ── Evil / Protection ── */
  'sharr'      : {ar:'شَرِّ',           tr:'sharr',          en:'evil (of)',                         freq:30},
  'a-udhu'     : {ar:'أَعُوذُ',         tr:'aʿūdhu',         en:'I seek refuge',                    freq:3},
  'khayr'      : {ar:'خَيْرٌ',          tr:'khayr',          en:'good / better',                    freq:189},

  /* ── Al-Fil (105) ── */
  'al-fil'     : {ar:'الْفِيلِ',        tr:'al-fīl',         en:'the elephant',                     freq:1},
  'bi-ashab'   : {ar:'بِأَصْحَابِ',     tr:'bi-aṣḥāb',       en:'with the people of',               freq:40},
  'fa-ala'     : {ar:'فَعَلَ',          tr:'faʿala',         en:'dealt / did',                      freq:172},
  'kayfa'      : {ar:'كَيْفَ',          tr:'kayfa',          en:'how',                              freq:89},
  'kaydahum'   : {ar:'كَيْدَهُمْ',      tr:'kaydahum',       en:'their plot / scheme',              freq:3},
  'tadleel'    : {ar:'تَضْلِيلٍ',       tr:'taḍlīl',         en:'ruin / going astray',              freq:1},
  'ababeel'    : {ar:'أَبَابِيلَ',      tr:'abābīl',         en:'flocks (of birds)',                freq:1},
  'hijara'     : {ar:'حِجَارَةٍ',       tr:'ḥijāra',         en:'stones',                           freq:10},
  'sijjeel'    : {ar:'سِجِّيلٍ',        tr:'sijjīl',         en:'baked clay',                       freq:2},
  'ka-asf'     : {ar:'كَعَصْفٍ',        tr:'kaʿaṣf',         en:'like straw',                       freq:1},
  'makool'     : {ar:'مَّأْكُولٍ',      tr:'maʾkūl',         en:'eaten / devoured',                 freq:2},
  'tarmihim'   : {ar:'تَرْمِيهِم',      tr:'tarmīhim',       en:'pelting them',                     freq:1},
  'tayran'     : {ar:'طَيْرًا',         tr:'ṭayran',         en:'birds',                            freq:5},

  /* ── Quraysh (106) ── */
  'ilaf'       : {ar:'إِيلَافِ',        tr:'īlāf',           en:'tradition / accustomed journey',   freq:1},
  'ilafihim'   : {ar:'إِيلَافِهِمْ',    tr:'īlāfahum',       en:'their tradition',                  freq:1},
  'rihlata'    : {ar:'رِحْلَةَ',        tr:'riḥlata',        en:'journey / travel',                 freq:1},
  'al-shitaa'  : {ar:'الشِّتَاءِ',     tr:'al-shitāʾ',      en:'winter',                           freq:1},
  'al-sayf'    : {ar:'الصَّيْفِ',      tr:'al-ṣayf',         en:'summer',                          freq:1},
  'al-bayt'    : {ar:'الْبَيْتِ',       tr:'al-bayt',        en:'The House (Kaaba)',                freq:65},
  'fa-yabudo'  : {ar:'فَلْيَعْبُدُوا', tr:'fal-yaʿbudū',    en:'so let them worship',              freq:1},
  'at-amahum'  : {ar:'أَطْعَمَهُم',    tr:'aṭʿamahum',      en:'fed them',                         freq:1},
  'ju'         : {ar:'جُوعٍ',           tr:'jūʿ',            en:'hunger',                           freq:3},
  'amanahum'   : {ar:'وَآمَنَهُم',     tr:'wa-āmanahum',    en:'and made them safe',               freq:1},
  'khawf'      : {ar:'خَوْفٍ',          tr:'khawf',          en:'fear',                             freq:8},

  /* ── Al-Maun (107) ── */
  'a-rayta'    : {ar:'أَرَأَيْتَ',      tr:'ara-ayta',       en:'Have you seen',                    freq:9},
  'yukadhdhibu': {ar:'يُكَذِّبُ',       tr:'yukadhdhibu',    en:'denies / rejects',                 freq:2},
  'yad-u'      : {ar:'يَدُعُّ',         tr:'yadhuʿʿ',        en:'pushes away (harshly)',            freq:1},
  'ta-am'      : {ar:'طَعَامِ',         tr:'ṭaʿām',          en:'food (of)',                        freq:48},
  'yahudd'     : {ar:'يَحُضُّ',         tr:'yaḥuḍḍ',         en:'urge / encourage',                 freq:2},
  'waylun'     : {ar:'وَيْلٌ',          tr:'waylun',         en:'woe (to)',                          freq:27},
  'lil-musalin': {ar:'لِّلْمُصَلِّينَ', tr:'lil-muṣallīn',  en:'for the prayer-performers',        freq:1},
  'salatihim'  : {ar:'صَلَاتِهِمْ',    tr:'ṣalātihim',      en:'their prayer',                     freq:8},
  'sahun'      : {ar:'سَاهُونَ',        tr:'sāhūn',          en:'heedless / neglectful',            freq:1},
  'yura-un'    : {ar:'يُرَاءُونَ',     tr:'yurāʾūn',        en:'show off (riya)',                   freq:2},
  'al-maun'    : {ar:'الْمَاعُونَ',    tr:'al-māʿūn',       en:'small kindnesses',                 freq:1},

  /* ── Al-Kawthar (108) ── */
  'a-taynaka'  : {ar:'أَعْطَيْنَاكَ',  tr:'aʿṭaynāka',      en:'We have given you',                freq:1},
  'al-kawthar' : {ar:'الْكَوْثَرَ',    tr:'al-kawthar',     en:'Al-Kawthar (abundance)',            freq:1},
  'li-rabbika' : {ar:'لِرَبِّكَ',      tr:'li-rabbika',     en:'to your Lord',                     freq:10},
  'wanhar'     : {ar:'وَانْحَرْ',       tr:'wanḥar',         en:'and sacrifice',                    freq:1},
  'shaniak'    : {ar:'شَانِئَكَ',       tr:'shāniʾaka',      en:'your enemy / hater',               freq:1},
  'al-abtar'   : {ar:'الْأَبْتَرُ',    tr:'al-abtar',       en:'the one cut off (without legacy)', freq:1},

  /* ── Al-Kafirun (109) ── */
  'al-kafirun' : {ar:'الْكَافِرُونَ',  tr:'al-kāfirūn',     en:'the disbelievers',                 freq:14},
  'lakum'      : {ar:'لَكُمْ',          tr:'lakum',          en:'for you is',                       freq:202},
  'waliya'     : {ar:'وَلِيَ',          tr:'wa-liya',        en:'and for me is',                    freq:5},

  /* ── An-Nasr (110) ── */
  'nasr-allah' : {ar:'نَصْرُ اللَّهِ', tr:'naṣr Allāh',     en:'help of Allah',                    freq:2},
  'nasru'      : {ar:'نَصْرُ',          tr:'naṣr',           en:'the help / victory',               freq:6},
  'al-fath'    : {ar:'الْفَتْحُ',       tr:'al-fatḥ',        en:'the opening / conquest',           freq:6},
  'ja-a'       : {ar:'جَاءَ',           tr:'jāʾa',           en:'came / comes',                     freq:130},
  'yadkhulun'  : {ar:'يَدْخُلُونَ',    tr:'yadkhulūn',      en:'they enter',                       freq:20},
  'afwaja'     : {ar:'أَفْوَاجًا',      tr:'afwājā',         en:'in crowds / groups',               freq:2},
  'bihamd'     : {ar:'بِحَمْدِ',        tr:'biḥamd',         en:'with praise (of)',                 freq:7},
  'tawwaban'   : {ar:'تَوَّابًا',       tr:'tawwābā',        en:'Ever-Accepting of Repentance',     freq:11},

  /* ── Al-Masad (111) ── */
  'tabbat'     : {ar:'تَبَّتْ',         tr:'tabbat',         en:'may it perish / has perished',     freq:1},
  'yada'       : {ar:'يَدَا',           tr:'yadā',           en:'hands (of)',                       freq:35},
  'abi'        : {ar:'أَبِي',           tr:'abī',            en:'father of',                        freq:117},
  'lahab-n'    : {ar:'لَهَبٍ',          tr:'lahab',          en:'flame / blaze',                    freq:4},
  'wa-tabb'    : {ar:'وَتَبَّ',         tr:'wa-tabb',        en:'and he has perished',              freq:1},
  'maluhu'     : {ar:'مَالُهُ',         tr:'māluhu',         en:'his wealth',                       freq:15},
  'kasaba'     : {ar:'كَسَبَ',          tr:'kasaba',         en:'what he earned',                   freq:67},
  'al-hatab'   : {ar:'الْحَطَبِ',      tr:'al-ḥaṭab',       en:'the firewood (thorny branches)',   freq:2},
  'hammalata'  : {ar:'حَمَّالَةَ',     tr:'ḥammālata',      en:'carrier of',                       freq:1},
  'jidiha'     : {ar:'جِيدِهَا',        tr:'jīdihā',         en:'her neck',                         freq:1},
  'hablun'     : {ar:'حَبْلٌ',          tr:'ḥablun',         en:'a rope',                           freq:5},
  'masad-n'    : {ar:'مَّسَدٍ',         tr:'masad',          en:'palm fiber',                       freq:1},

  /* ── Al-Ikhlas (112) ── */
  'ahad'       : {ar:'أَحَدٌ',          tr:'Aḥad',           en:'One / Unique',                     freq:86},
  'al-samad'   : {ar:'الصَّمَدُ',      tr:'al-Ṣamad',       en:'As-Samad (the Self-Sufficient)',   freq:1},
  'yalid'      : {ar:'يَلِدْ',          tr:'yalid',          en:'beget (a child)',                  freq:1},
  'yulad'      : {ar:'يُولَدْ',         tr:'yūlad',          en:'be begotten',                      freq:1},
  'kufuwan'    : {ar:'كُفُوًا',         tr:'kufuwan',        en:'equal / comparable',               freq:1},

  /* ── Al-Falaq (113) ── */
  'al-falaq'   : {ar:'الْفَلَقِ',      tr:'al-falaq',       en:'the daybreak',                     freq:1},
  'khalaqa'    : {ar:'خَلَقَ',          tr:'khalaqa',        en:'He created',                       freq:29},
  'ghassiq'    : {ar:'غَاسِقٍ',         tr:'ghāsiq',         en:'darkness / night when it gathers', freq:1},
  'waqab'      : {ar:'وَقَبَ',          tr:'waqab',          en:'when it gathers / spreads',        freq:1},
  'al-naffathat':{ar:'النَّفَّاثَاتِ',  tr:'al-naffāthāt',   en:'those who blow on knots',          freq:1},
  'al-uqad'    : {ar:'الْعُقَدِ',      tr:'al-ʿuqad',       en:'knots',                            freq:2},
  'hasid'      : {ar:'حَاسِدٍ',         tr:'ḥāsid',          en:'an envier',                        freq:2},
  'hasad'      : {ar:'حَسَدَ',          tr:'ḥasad',          en:'when he envies',                   freq:1},

  /* ── An-Nas (114) ── */
  'malik'      : {ar:'مَلِكِ',          tr:'malik',          en:'King of',                          freq:5},
  'ilah'       : {ar:'إِلَٰهِ',         tr:'ilāh',           en:'God of',                           freq:45},
  'al-waswas'  : {ar:'الْوَسْوَاسِ',   tr:'al-waswās',      en:'the whisperer (waswas)',            freq:1},
  'al-khannas' : {ar:'الْخَنَّاسِ',    tr:'al-khannās',     en:'the retreating one (who withdraws)',freq:1},
  'yuwas-wis'  : {ar:'يُوَسْوِسُ',     tr:'yuwas-wis',      en:'whispers',                         freq:1},
  'fi-sudur'   : {ar:'فِي صُدُورِ',    tr:'fī ṣudūr',       en:'in the chests / hearts of',        freq:5},
};

/* ── SHARED WBW SCENE CLASS ───────────────────────────────────── */

/**
 * Base scene class for canvas animations.
 * Reusable by any surah that lacks its own BS/BaseScene definition.
 */
window._BS = function _BS(id) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
  this.raf = null;
  this.t = 0;
};
window._BS.prototype.stop = function() {
  if (this.raf) { cancelAnimationFrame(this.raf); this.raf = null; }
};

/**
 * Shared Word-by-Word scene — animated canvas with emoji, label, particles.
 * Eliminates the need for a duplicated _S1WBW class in every scenes.js.
 *
 * Usage in scenes.js:
 *   const wbwScene = new window.WBWScene('canvas-1', {
 *     emoji: '📰', label: 'THE GREAT NEWS',
 *     verse: { ref:'An-Naba (78)', arabic:'...', english:'...' }
 *   });
 *   // then in initScenes: scenes[1] = wbwScene;
 *
 * @param {string} canvasId  — e.g. 'canvas-1'
 * @param {object} cfg       — { emoji, label, verse: {ref, arabic, english, note?} }
 */
window.WBWScene = function WBWScene(canvasId, cfg) {
  window._BS.call(this, canvasId);
  this._emoji = cfg.emoji || '📖';
  this._label = (cfg.label || 'WORD BY WORD').toUpperCase();
  this._verse = cfg.verse || null;
};
window.WBWScene.prototype = Object.create(window._BS.prototype);
window.WBWScene.prototype.constructor = window.WBWScene;
window.WBWScene.prototype.start = function() {
  if (!this.ctx) return;
  var self = this, ctx = this.ctx, cv = this.canvas;
  if (this._verse && typeof showVersePopup === 'function') {
    cv.onclick = function() { showVersePopup(self._verse); };
  }
  var draw = function() {
    self.t++;
    self.raf = requestAnimationFrame(draw);
    var W = cv.width, H = cv.height;
    var st = document.documentElement.getAttribute('data-theme') === 'stars';
    ctx.fillStyle = st ? '#1a1440' : '#0e0e1a';
    ctx.fillRect(0, 0, W, H);
    var t = self.t * 0.02;
    ctx.globalAlpha = 0.3;
    for (var i = 0; i < 15; i++) {
      var x = (i * 97 + t * (20 + i * 3)) % W;
      var y = (i * 53 + Math.sin(t + i) * 20 + H * 0.3) % H;
      var r = 1.5 + Math.sin(t + i * 0.7) * 0.8;
      ctx.fillStyle = st ? '#c8a0f8' : '#ffd700';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.fillText(self._emoji, W / 2, H * 0.42);
    ctx.fillStyle = st ? '#e8d0ff' : '#ffd700';
    ctx.font = 'bold 7px "Press Start 2P", monospace';
    ctx.fillText(self._label, W / 2, H * 0.62);
    ctx.fillStyle = st ? '#a89bc8' : '#c8a060';
    ctx.font = '5px "Press Start 2P", monospace';
    ctx.fillText('CLICK: Reveal Full Verse', W / 2, H * 0.78);
    ctx.textAlign = 'left';
  };
  draw();
};

/**
 * Wire up WBW Level 1 with chunked rendering (flip cards + matching every N verses).
 *
 * Usage in app.js:
 *   window.setupWBWLevel(WBW_DATA, 10);
 *
 * No need for S1_MATCH_ITEMS / S1_MATCH_ZONES — matches auto-generate from WBW_DATA.
 *
 * @param {Array}  wbwData    — [{label, words}] for every verse
 * @param {number} [chunk]    — verses per chunk (default 10)
 */
window.setupWBWLevel = function(wbwData, chunk) {
  var sz = (typeof chunk === 'number') ? chunk : 10;
  window.renderSection1Game = function() {
    window.renderWBWChunked('wbw-display', wbwData, sz);
  };
  window.checkSection1 = function() {
    window._checkAllWBWChunks(1);
  };
};

/* ── Chunked WBW Renderer ─────────────────────────────────────── */

window._wbwChunkStatus = {};

/**
 * Render WBW flip cards in chunks of `chunkSize`, each followed by a tap-to-match quiz.
 */
window.renderWBWChunked = function(containerId, wbwData, chunkSize) {
  var el = document.getElementById(containerId);
  if (!el) return;
  chunkSize = chunkSize || 10;
  window._wbwChunkStatus = {};

  var chunks = [];
  for (var i = 0; i < wbwData.length; i += chunkSize) {
    chunks.push(wbwData.slice(i, Math.min(i + chunkSize, wbwData.length)));
  }

  var html = '';
  chunks.forEach(function(chunk, ci) {
    var first = chunk[0].label, last = chunk[chunk.length - 1].label;
    var fv = first.match(/(\d+:\d+\w?)/), lv = last.match(/(\d+:\d+\w?)/);
    var range = (fv && lv) ? fv[1] + ' – ' + lv[1] : 'Part ' + (ci + 1);

    html += '<div class="wbw-chunk" id="wbw-chunk-' + ci + '">';
    html += '<div class="wbw-chunk-header">📖 ' + range + '</div>';

    chunk.forEach(function(g, gi) {
      html += window.wbwGroup(g.label, g.words, ci === 0 && gi === 0);
    });

    var pairs = window._extractMatchPairs(chunk, 8);
    if (pairs.length >= 3) {
      html += window._renderMatchWidget(ci, pairs, range);
    }
    window._wbwChunkStatus[ci] = false;
    html += '</div>';
  });

  el.innerHTML = html;

  chunks.forEach(function(chunk, ci) {
    window._initMatchWidget(ci);
  });
};

/**
 * Extract up to `count` unique {ar, en} pairs from a chunk for the matching quiz.
 */
window._extractMatchPairs = function(chunk, count) {
  var seen = {}, pairs = [];
  for (var g = 0; g < chunk.length; g++) {
    var words = chunk[g].words;
    for (var w = 0; w < words.length; w++) {
      var item = words[w];
      var word = (typeof item === 'string') ? (window.AW[item] || null) : item;
      if (!word || !word.ar || !word.en) continue;
      if (seen[word.ar]) continue;
      if (word.en.length > 30) continue;
      seen[word.ar] = true;
      pairs.push({ar: word.ar, en: word.en});
      if (pairs.length >= count) return pairs;
    }
  }
  return pairs;
};

/**
 * Build HTML for a tap-to-match widget.
 */
window._renderMatchWidget = function(chunkIdx, pairs, rangeLabel) {
  var shuffledEn = pairs.slice();
  for (var i = shuffledEn.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = shuffledEn[i]; shuffledEn[i] = shuffledEn[j]; shuffledEn[j] = tmp;
  }

  var html = '<div class="wbw-match" id="wbw-match-' + chunkIdx + '">';
  html += '<div class="wbw-match-title">🎮 Match Arabic to English (' + rangeLabel + ')</div>';
  html += '<div class="wbw-match-grid">';

  html += '<div class="wbw-match-col">';
  for (var a = 0; a < pairs.length; a++) {
    html += '<button class="wbw-match-btn ar-btn" data-chunk="' + chunkIdx + '" data-side="ar" data-idx="' + a + '">' + pairs[a].ar + '</button>';
  }
  html += '</div>';

  html += '<div class="wbw-match-col">';
  for (var e = 0; e < shuffledEn.length; e++) {
    var origIdx = pairs.indexOf(shuffledEn[e]);
    html += '<button class="wbw-match-btn" data-chunk="' + chunkIdx + '" data-side="en" data-idx="' + origIdx + '">' + shuffledEn[e].en + '</button>';
  }
  html += '</div>';

  html += '</div>';
  html += '<div class="wbw-match-feedback" id="wbw-mfb-' + chunkIdx + '"></div>';
  html += '</div>';
  return html;
};

/**
 * Attach click handlers for a tap-to-match widget.
 */
window._initMatchWidget = function(chunkIdx) {
  var container = document.getElementById('wbw-match-' + chunkIdx);
  if (!container) return;
  var selectedAr = null;

  container.addEventListener('click', function(ev) {
    var btn = ev.target.closest('.wbw-match-btn');
    if (!btn || btn.classList.contains('matched')) return;

    var side = btn.dataset.side, idx = parseInt(btn.dataset.idx, 10);

    if (side === 'ar') {
      container.querySelectorAll('.ar-btn').forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      selectedAr = idx;
    } else if (side === 'en' && selectedAr !== null) {
      var arBtn = container.querySelector('.ar-btn[data-idx="' + selectedAr + '"]');
      if (idx === selectedAr) {
        btn.classList.add('matched');
        if (arBtn) arBtn.classList.add('matched');
        arBtn && arBtn.classList.remove('selected');
        selectedAr = null;
        var total = container.querySelectorAll('.ar-btn').length;
        var done = container.querySelectorAll('.ar-btn.matched').length;
        var fb = document.getElementById('wbw-mfb-' + chunkIdx);
        if (done === total) {
          if (fb) { fb.textContent = '🏆 All matched! MashAllah!'; fb.className = 'wbw-match-feedback success'; }
          window._wbwChunkStatus[chunkIdx] = true;
          window._checkAllWBWChunksDone();
        } else {
          if (fb) { fb.textContent = done + '/' + total + ' matched'; fb.className = 'wbw-match-feedback partial'; }
        }
      } else {
        btn.classList.add('wrong');
        if (arBtn) arBtn.classList.add('wrong');
        setTimeout(function() { btn.classList.remove('wrong'); if (arBtn) arBtn.classList.remove('wrong', 'selected'); }, 500);
        selectedAr = null;
      }
    }
  });
};

/**
 * Check if all chunks are matched — if so, enable the Claim button.
 */
window._checkAllWBWChunksDone = function() {
  var all = true;
  for (var k in window._wbwChunkStatus) {
    if (!window._wbwChunkStatus[k]) { all = false; break; }
  }
  if (all) {
    window.state.s1Checked = true;
    if (typeof saveProgress === 'function') saveProgress();
    var btn = document.getElementById('complete-1-btn');
    if (btn) btn.style.display = 'inline-block';
  }
};

/**
 * Called by checkSection1 — shows overall feedback.
 */
window._checkAllWBWChunks = function(sectionNum) {
  var total = 0, done = 0;
  for (var k in window._wbwChunkStatus) {
    total++;
    if (window._wbwChunkStatus[k]) done++;
  }
  var fb = document.getElementById('feedback-' + sectionNum);
  if (!fb) return;
  if (done === total) {
    fb.textContent = '🏆 All sections matched! MashAllah!';
    fb.className = 'game-feedback success';
    window.state['s' + sectionNum + 'Checked'] = true;
    if (typeof saveProgress === 'function') saveProgress();
    var btn = document.getElementById('complete-' + sectionNum + '-btn');
    if (btn) btn.style.display = 'inline-block';
  } else {
    fb.textContent = done + ' of ' + total + ' sections complete — keep matching!';
    fb.className = 'game-feedback';
  }
};

/* ── HELPERS ───────────────────────────────────────────────────── */

/** Return the frequency badge HTML for the back of a flip card. */
function _freqBadge(freq) {
  if (!freq) return '';
  if (freq <= 10) {
    return '<span class="flip-freq flip-freq-unique">✦</span>';
  }
  return '<span class="flip-freq">⭐ \xd7' + freq.toLocaleString() + ' in Quran</span>';
}

/**
 * Build HTML for a single flip card.
 * @param {string|object} item     — string key into AW, OR inline {ar, tr, en, freq?}
 * @param {boolean}       showHint — show "tap to reveal" on front
 */
window.wbwCard = function(item, showHint) {
  const w = (typeof item === 'string') ? (window.AW[item] || {ar: item, tr: '?', en: '?'}) : item;
  const hint = showHint ? '<span class="flip-hint">tap to reveal</span>' : '';
  return (
    '<div class="flip-card" onclick="this.classList.toggle(\'flipped\')">' +
      '<div class="flip-inner">' +
        '<div class="flip-front">' +
          '<span class="w-arabic">' + w.ar + '</span>' +
          hint +
        '</div>' +
        '<div class="flip-back">' +
          '<span class="w-translit">' + w.tr + '</span>' +
          '<span class="w-meaning">' + w.en + '</span>' +
          _freqBadge(w.freq) +
        '</div>' +
      '</div>' +
    '</div>'
  );
};

/**
 * Build HTML for one verse row (label + flip cards).
 * @param {string}  label     — verse label
 * @param {Array}   words     — keys or inline objects, listed LAST-to-FIRST for RTL
 * @param {boolean} firstCard — show hint on the very first card
 */
window.wbwGroup = function(label, words, firstCard) {
  const cards = words.map(function(w, i) {
    return window.wbwCard(w, firstCard && i === 0);
  }).join('');
  return (
    '<div class="word-grid">' +
      '<div class="word-verse-label">' + label + '</div>' +
      cards +
    '</div>'
  );
};

/**
 * Render a complete word-by-word section into a container element.
 * Call this from renderSection1Game() in each surah's app.js.
 *
 * @param {string} containerId   — id of the <div> to populate
 * @param {Array}  verseGroups   — [{label, words:[key|{ar,tr,en,freq?}]}]
 * @param {string} [revealBtnId] — optional "Reveal All" button id
 */
window.renderWBW = function(containerId, verseGroups, revealBtnId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = verseGroups.map(function(g, gi) {
    return window.wbwGroup(g.label, g.words, gi === 0);
  }).join('');
  if (revealBtnId) {
    const btn = document.getElementById(revealBtnId);
    if (btn) {
      btn.onclick = function() {
        el.querySelectorAll('.flip-card').forEach(function(c) {
          c.classList.add('flipped');
        });
      };
    }
  }
};
