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
