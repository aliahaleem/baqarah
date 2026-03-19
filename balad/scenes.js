'use strict';
/* ── Al-Balad scenes ── */

const VERSES_BALAD = {
  1: { ref:'90:1-4', ar:'لَا أُقْسِمُ بِهَٰذَا الْبَلَدِ ۩ وَأَنتَ حِلٌّ بِهَٰذَا الْبَلَدِ ۩ وَوَالِدٍ وَمَا وَلَدَ ۩ لَقَدْ خَلَقْنَا الْإِنسَانَ فِي كَبَدٍ', en:'"I swear by this city — and you are free of restriction in this city — and by the father and what he fathered — We have certainly created man in hardship." (90:1-4)', note:'"Kabad" — hardship, struggle, striving. Life is designed with difficulty. But this is the soil in which virtue grows.' },
  2: { ref:'90:5-7', ar:'أَيَحْسَبُ أَن لَّن يَقْدِرَ عَلَيْهِ أَحَدٌ ۩ يَقُولُ أَهْلَكْتُ مَالًا لُّبَدًا', en:'"Does he think that no one has power over him? He says: I have spent enormous wealth!" (90:5-6) — Arrogance from wealth.', note:'The boast of the wealthy oppressor — but Allah sees everything and has complete power over him.' },
  3: { ref:'90:8-10', ar:'أَلَمْ نَجْعَل لَّهُ عَيْنَيْنِ ۩ وَلِسَانًا وَشَفَتَيْنِ ۩ وَهَدَيْنَاهُ النَّجْدَيْنِ', en:'"Have We not made for him two eyes, and a tongue and two lips? And We guided him to the two highways?" (90:8-10) — Man was given everything he needs.', note:'"Al-najdayn" — the two paths: good and evil. Allah has shown both ways clearly.' },
  4: { ref:'90:11-16', ar:'فَلَا اقْتَحَمَ الْعَقَبَةَ ۩ وَمَا أَدْرَاكَ مَا الْعَقَبَةُ ۩ فَكُّ رَقَبَةٍ', en:'"But he has not attempted the steep path — and what will make you know what the steep path is? It is the freeing of a slave!" (90:11-13)', note:'Al-aqabah — the steep mountain path — is a metaphor for the difficult but righteous path. Freeing slaves was its greatest example.' },
  5: { ref:'90:14-17', ar:'أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ ۩ يَتِيمًا ذَا مَقْرَبَةٍ ۩ أَوْ مِسْكِينًا ذَا مَتْرَبَةٍ', en:'"Or feeding on a day of severe hunger — an orphan of near relationship — or a needy person in misery." (90:14-16)', note:'"Dha matraba" — someone utterly prostrate in poverty, literally face-down in the dust. The most destitute person.' },
  6: { ref:'90:17-20', ar:'ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ', en:'"Then he should be of those who believe, urge each other to patience, and urge each other to mercy — those are the companions of the right." (90:17-18)', note:'"Ashaab al-maymana" — companions of the right hand (Jannah). The left: those who rejected Our signs — fire will be upon them.' },
};

function sceneP() {
  const st = document.documentElement.getAttribute('data-theme') === 'stars';
  return st ? {
    sky:'#3d2870', ground:'#4a3060', sand:'#6a4880', pri:'#9060d0',
    acc:'#f4c840', wall:'#7050a0', char:'#f0d0c0', robe:'#7040a0',
  } : {
    sky:'#120a04', ground:'#1e1008', sand:'#4a2c10', pri:'#8a5010',
    acc:'#e8b030', wall:'#6a3810', char:'#f0d0b0', robe:'#5a2810',
  };
}

function spr(ctx, x, y, w, h, col) { ctx.fillStyle=col; ctx.fillRect(x,y,w,h); }

function drawBaladBg(ctx, W, H) {
  const p = sceneP();
  ctx.fillStyle = p.sky; ctx.fillRect(0,0,W,H);
  // desert ground
  spr(ctx,0,H*0.65,W,H*0.35,p.sand);
  // stones/pebbles
  for (let i=0;i<8;i++) { const sx=(i*1123)%W; spr(ctx,sx,H*0.67,8,5,p.wall+'88'); }
}

function drawScene1(ctx,W,H) {
  drawBaladBg(ctx,W,H); const p=sceneP();
  // Mecca cityscape silhouette
  const walls = [[W*0.1,H*0.3,40,H*0.4],[W*0.3,H*0.25,60,H*0.45],[W*0.5,H*0.2,80,H*0.5],[W*0.72,H*0.3,50,H*0.4]];
  walls.forEach(([x,y,w,h])=>{ spr(ctx,x,y,w,h,p.wall); spr(ctx,x+4,y+4,w-8,6,p.acc+'88'); });
  // Ka'ba
  spr(ctx,W*0.42,H*0.15,48,50,p.pri); spr(ctx,W*0.44,H*0.16,44,6,p.acc);
}

function drawScene2(ctx,W,H) {
  drawBaladBg(ctx,W,H); const p=sceneP();
  // Arrogant wealthy figure
  spr(ctx,W*0.4,H*0.4,14,20,p.char);
  spr(ctx,W*0.37,H*0.5,20,15,p.acc);
  // Gold coins scattered
  for (let i=0;i<6;i++) { ctx.fillStyle=p.acc; ctx.beginPath(); ctx.arc(W*(0.25+i*0.08),H*0.7,6,0,Math.PI*2); ctx.fill(); }
}

function drawScene3(ctx,W,H) {
  drawBaladBg(ctx,W,H); const p=sceneP();
  // Two paths
  ctx.strokeStyle=p.acc; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(W*0.5,H*0.9); ctx.lineTo(W*0.2,H*0.4); ctx.stroke();
  ctx.strokeStyle=p.pri+'88'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(W*0.5,H*0.9); ctx.lineTo(W*0.8,H*0.4); ctx.stroke();
  // Eyes/lips icons
  ctx.fillStyle=p.acc; ctx.font='20px serif';
  ctx.fillText('👁️', W*0.15, H*0.35); ctx.fillText('👁️', W*0.25, H*0.35);
  ctx.fillText('🗣️', W*0.7, H*0.35);
}

function drawScene4(ctx,W,H) {
  drawBaladBg(ctx,W,H); const p=sceneP();
  // Mountain/aqabah
  ctx.fillStyle=p.wall;
  ctx.beginPath(); ctx.moveTo(0,H*0.65); ctx.lineTo(W*0.5,H*0.15); ctx.lineTo(W,H*0.65); ctx.fill();
  // Person climbing
  spr(ctx,W*0.45,H*0.35,10,14,p.char);
  spr(ctx,W*0.43,H*0.44,14,10,p.robe);
  // Broken chains
  ctx.strokeStyle=p.acc; ctx.lineWidth=2;
  for (let i=0;i<3;i++) { ctx.beginPath(); ctx.arc(W*0.15+i*30,H*0.5,8,0,Math.PI*2); ctx.stroke(); }
}

function drawScene5(ctx,W,H) {
  drawBaladBg(ctx,W,H); const p=sceneP();
  // Person feeding orphan
  spr(ctx,W*0.35,H*0.4,12,16,p.char); spr(ctx,W*0.33,H*0.5,16,12,p.robe);
  spr(ctx,W*0.55,H*0.45,10,14,p.char); spr(ctx,W*0.53,H*0.54,14,10,p.robe);
  // Bowl of food
  ctx.fillStyle=p.acc+'cc'; ctx.beginPath(); ctx.ellipse(W*0.47,H*0.58,14,6,0,0,Math.PI*2); ctx.fill();
}

function drawScene6(ctx,W,H) {
  drawBaladBg(ctx,W,H); const p=sceneP();
  // Right companions ascending
  for (let i=0;i<4;i++) {
    const cx=W*(0.15+i*0.22);
    spr(ctx,cx,H*0.3+i*10,10,14,p.char);
    spr(ctx,cx-2,H*0.4+i*10,14,10,p.robe);
    ctx.fillStyle=p.acc+'88'; ctx.fillRect(cx+3,H*0.28+i*10,4,4);
  }
  // Star above right side
  ctx.fillStyle=p.acc; ctx.font='16px serif'; ctx.fillText('✨',W*0.7,H*0.2);
}

const SCENE_FNS={1:drawScene1,2:drawScene2,3:drawScene3,4:drawScene4,5:drawScene5,6:drawScene6};
function startScene(n){const cv=document.getElementById(`canvas-${n}`);if(!cv)return;const fn=SCENE_FNS[n];if(fn)fn(cv.getContext('2d'),cv.width,cv.height);cv.onclick=()=>showVerse(n);}
function stopAllScenes(){}
function initScenes(){for(let i=1;i<=6;i++){const cv=document.getElementById(`canvas-${i}`);if(cv){const fn=SCENE_FNS[i];if(fn)fn(cv.getContext('2d'),cv.width,cv.height);}}}
function showVerse(n){const v=VERSES_BALAD[n];if(!v)return;const el=id=>document.getElementById(id);if(el('vp-ref'))el('vp-ref').textContent=v.ref;if(el('vp-arabic'))el('vp-arabic').textContent=v.ar;if(el('vp-eng'))el('vp-eng').textContent=v.en;if(el('vp-note'))el('vp-note').textContent=v.note||'';const p=el('verse-popup');if(p)p.classList.add('visible');}
function hideVersePopup(){const p=document.getElementById('verse-popup');if(p)p.classList.remove('visible');}
