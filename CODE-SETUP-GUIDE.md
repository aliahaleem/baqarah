# Quran Quest — Code Setup Guide

> For developers adding new surahs, new activity types, new themes, or maintaining existing content.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Architecture Principles](#3-architecture-principles)
4. [The Three Shared Files](#4-the-three-shared-files)
5. [Per-Surah File Responsibilities](#5-per-surah-file-responsibilities)
6. [Theme System](#6-theme-system)
7. [Game Activity Types](#7-game-activity-types)
8. [Adding a New Surah — Step-by-Step](#8-adding-a-new-surah--step-by-step)
9. [Adding a New Activity Type](#9-adding-a-new-activity-type)
10. [State & LocalStorage](#10-state--localstorage)
11. [World Builder Canvas](#11-world-builder-canvas)
12. [Scenes (Animated Canvas)](#12-scenes-animated-canvas)
13. [Common Mistakes to Avoid](#13-common-mistakes-to-avoid)

---

## 1. Project Overview

Quran Quest is a browser-based interactive learning game. Each Surah is its own self-contained quest with:

- A map of levels (tiles)
- Each level contains a reading card + an interactive game activity
- Completing a level rewards XP and Gems
- Completing all levels builds a unique world-builder canvas (e.g. Ka'ba, Garden of Al-Ma'wa)

The app supports **two visual themes**: Adventure (Minecraft pixel art) and Stars & Ink (soft, feminine). The theme is selected once on the Hub and persists across all Surahs via `localStorage`.

**Live entry point:** `baqarah/index.html` (the hub page)

---

## 2. Folder Structure

```
baqarah/                        ← Git repository root
│
├── index.html                  ← Hub: lists all Surah portals + theme toggle
│
├── shared/                     ← Shared code reused by ALL surahs
│   ├── base.css                ← All structural CSS + both theme definitions
│   ├── engine.js               ← All game logic (quiz, drag-drop, story order)
│   └── ui.js                   ← Navigation, rewards, lifecycle, theme switching
│
├── baqarah/                    ← Surah Al-Baqarah quest
│   ├── index.html              ← Game page (HTML structure only)
│   ├── palette.css             ← Surah-specific colour variables
│   ├── style.css               ← Surah-specific scene/override CSS
│   ├── scenes.js               ← Animated canvas scenes
│   └── app.js                  ← DATA ONLY: config, game content, world builder
│
├── imran/                      ← Surah Al-Imran quest  (same structure)
├── mulk/                       ← Surah Al-Mulk quest   (same structure)
├── naba/                       ← Surah An-Naba quest   (same structure)
├── muhammad/                   ← Surah Muhammad quest  (same structure)
└── naziat/                     ← Surah An-Nazi'at quest (same structure)
```

**Rule:** Everything lives inside `baqarah/`. Never create surah folders at the parent `rahman/` level.

---

## 3. Architecture Principles

The codebase follows **SOLID / DRY** principles:

| Principle | How it's applied |
|-----------|-----------------|
| **Single Responsibility** | `engine.js` only handles game logic. `ui.js` only handles navigation/lifecycle. `app.js` only holds data. |
| **Open/Closed** | Add a new activity type by adding functions to `engine.js` — existing code doesn't change. |
| **DRY** | All quiz/drag-drop/story-order rendering is in `engine.js` once. Surah `app.js` files just call those functions. |
| **Dependency Inversion** | `ui.js` depends on `window.SURAH_CONFIG` (an interface), not on any specific surah's hardcoded values. |

**Script loading order in every surah `index.html`:**
```html
<script src="scenes.js"></script>       <!-- 1. Surah-specific scene animations -->
<script src="../shared/engine.js"></script>  <!-- 2. Generic game mechanics -->
<script src="../shared/ui.js"></script>      <!-- 3. UI/navigation/lifecycle -->
<script src="app.js"></script>          <!-- 4. Surah data (runs last, after engine is ready) -->
```

**CSS loading order:**
```html
<link rel="stylesheet" href="../shared/base.css"/>  <!-- 1. Structure + both themes -->
<link rel="stylesheet" href="palette.css"/>         <!-- 2. Surah colour variables -->
<link rel="stylesheet" href="style.css"/>           <!-- 3. Surah scene overrides -->
```

---

## 4. The Three Shared Files

### `shared/base.css`

Defines:
- Google Fonts imports (Press Start 2P, Quicksand, Amiri)
- All semantic CSS variables (`--bg`, `--primary`, `--accent`, `--font-body`, etc.)
- **Minecraft theme** as the default (`:root`)
- **Stars & Ink theme** overrides (`html[data-theme="stars"]`)
- All shared structural CSS: header, intro screen, map grid, cards, quiz, drag-drop, story order, verse popup, reward overlay, world builder

**Never** put layout CSS into a surah's individual `style.css` if it could be reused. Add it here instead.

### `shared/engine.js`

Contains all reusable game mechanics. These functions are available globally:

| Function | Purpose |
|----------|---------|
| `shuffle(arr)` | Returns a shuffled copy of array |
| `saveProgress()` | Saves `window.state` to `localStorage` |
| `loadProgress()` | Loads from `localStorage` into `window.state` |
| `showVersePopup(v)` / `hideVersePopup()` | Controls the verse popup overlay |
| `selectOption(n, qi, oi)` | Handles quiz option selection (iOS-safe) |
| `renderQuiz(n, data)` | Renders a quiz for section `n` using `data` array |
| `checkQuiz(n, data)` | Checks answers, shows feedback, reveals Complete button |
| `renderDragDrop(n, items, zones)` | Renders a drag-and-drop activity |
| `checkDragDrop(n, zones)` | Checks drag-drop matches |
| `renderStoryOrder(n, data)` | Renders a story ordering activity |
| `renderOrderItems(n, data)` | Re-renders the current order (called internally) |
| `moveOrderItem(n, idx, dir, data)` | Moves an item up/down in the list |
| `checkStoryOrder(n, data)` | Checks the order against the correct sequence |

Also includes global mouse and touch event listeners for drag-and-drop (works on desktop and iOS).

### `shared/ui.js`

Contains all UI management functions:

| Function | Purpose |
|----------|---------|
| `getTheme()` | Returns current theme from `localStorage` |
| `setTheme(t)` | Sets `data-theme` on `<html>`, updates buttons, saves to `localStorage` |
| `updateUI()` | Updates header stats, map tiles, world builder chunks, welcome message |
| `openSection(n)` | Shows section panel `n`, hides map view, starts scene |
| `closeSection()` | Returns to map view, stops scenes |
| `markSectionComplete(n)` | Populates and shows the reward overlay |
| `completeSection(n)` | Adds XP/gems to state, marks complete, calls `markSectionComplete` |
| `dismissReward()` | Hides the reward overlay |
| `startGame()` | Reads name input, saves, reveals game, renders all sections |
| `resetGame()` | Clears `localStorage` for the current surah and reloads |

On `DOMContentLoaded`, `ui.js` automatically: applies saved theme, loads progress, and boots the game if a name is already saved.

---

## 5. Per-Surah File Responsibilities

### `app.js` — Data Layer Only

Every surah's `app.js` must define these globals **before** `ui.js` runs (the script order ensures this):

```javascript
window.STORAGE_KEY = 'mysurahQuestSave';   // Unique per surah

window.state = {
  explorerName: '', xp: 0, gems: 0, completed: [],
  s1Answers: {}, s1Checked: false,
  // ... one entry per section
};

window.SURAH_CONFIG = {
  totalLevels: 8,                           // How many levels/sections
  rewards: { 1: { xp, gems, icon, title, msg }, ... },
  tileIcons:  ['🌟', ...],                  // One per level
  tileLabels: ['Topic Name', ...],          // One per level
  welcomeMsg: {
    fresh:    name => `...`,                // First visit
    partial:  (name, done) => `...`,        // In progress
    complete: name => `...`,                // All done
  },
};
```

Then define game data constants and section wrapper functions:

```javascript
const S1_QUIZ = [ { q: '...', opts: [...], correct: 0 }, ... ];

function renderSection1Game() { renderQuiz(1, S1_QUIZ); }
function checkSection1()      { checkQuiz(1, S1_QUIZ); }
```

Finally, define the world builder canvas function and hook:

```javascript
function _drawBuildCanvas(n) { /* canvas drawing logic */ }
function updateUIExtra() { _drawBuildCanvas(window.state.completed.length); }
```

### `palette.css` — Surah Colours

Defines the surah's colour identity using the standard variable names:

```css
:root {
  --bg:             #...;   /* Page background */
  --bg2:            #...;   /* Secondary background */
  --surface:        #...;   /* Card surfaces */
  --card-bg:        #...;   /* Card backgrounds */
  --primary:        #...;   /* Main brand colour */
  --primary-lit:    #...;   /* Lighter/hover brand colour */
  --accent:         #...;   /* Gold/highlight accent */
  --accent2:        #...;   /* Secondary accent */
  --text:           #...;   /* Body text */
  --text-dim:       #...;   /* Dimmed/secondary text */
  --tile-locked:    #...;   /* Locked map tile */
  --tile-unlocked:  #...;   /* Unlocked map tile */
  --tile-completed: #...;   /* Completed map tile */
}
```

### `style.css` — Scene & Override CSS

Only contains styles that are **unique to this surah**: animated scene canvas styling, scene-specific overlays, and any minor component overrides. Do not duplicate anything already in `base.css`.

### `scenes.js` — Canvas Animations

Exports (via global functions):
- `initScenes()` — called once when the game starts
- `startScene(n)` — called when section `n` is opened
- `stopAllScenes()` — called when returning to the map

Each scene is a canvas animation. Scene drawing functions can read `document.documentElement.dataset.theme` to adjust colours for the active theme.

### `index.html` — HTML Structure Only

Contains the DOM skeleton. No inline CSS beyond what's absolutely necessary for display toggling (`style="display:none"`). All styling comes from the three CSS files above.

Required elements (IDs that `ui.js` looks for):

| ID | Purpose |
|----|---------|
| `intro-screen` | Name entry form |
| `explorer-name` | Name text input |
| `name-error` | Error message span |
| `game-header` | Sticky header (hidden until game starts) |
| `header-name` | Explorer name display |
| `xp-display` | XP counter |
| `gems-display` | Gem counter |
| `done-display` | Levels completed counter |
| `main-view` | Map + world builder view |
| `welcome-text` | Ibn Ameen welcome message |
| `tile-N` | Map tile for level N |
| `status-N` | Status label inside tile N |
| `chunk-N` | World builder chunk for level N |
| `all-complete` | Shown when all levels done |
| `section-view` | Section panels container |
| `section-panel-N` | Panel for section N |
| `quiz-N` | Quiz container in section N |
| `drag-pool-N` | Drag items pool in section N |
| `drop-zones-N` | Drop zones in section N |
| `order-N` | Story order list in section N |
| `feedback-N` | Feedback message in section N |
| `complete-N-btn` | "Claim Reward" button in section N |
| `verse-popup` | Floating verse overlay |
| `reward-overlay` | Level complete reward overlay |
| `build-canvas` | World builder canvas element |

---

## 6. Theme System

Themes are controlled by a `data-theme` attribute on the `<html>` element:

```html
<html lang="en" data-theme="minecraft">   <!-- or data-theme="stars" -->
```

The active theme is stored in `localStorage` under the key `quranQuestTheme`.

**Minecraft** (default): Pixel art feel — `Press Start 2P` font, hard `4px 4px 0 #000` shadows, sharp corners.

**Stars & Ink**: Soft, feminine — `Quicksand` font, glowing radial shadows, rounded corners, larger text.

### Adding a theme-aware style rule

In `base.css`:
```css
/* Minecraft default */
.my-component { border-radius: 2px; font-size: 9px; }

/* Stars & Ink override */
html[data-theme="stars"] .my-component { border-radius: 16px; font-size: 13px; }
```

### Theme in canvas (scenes / world builder)

Read the current theme inside canvas draw functions:
```javascript
const isStars = document.documentElement.dataset.theme === 'stars';
ctx.fillStyle = isStars ? '#d4a0ff' : '#ffd700';
```

### Switching themes on the Hub

The Hub calls `setHubTheme(t)` (defined inline in `baqarah/index.html`). This writes to `localStorage` so all surah pages pick it up immediately.

### Switching themes inside a Surah page

`ui.js` exports `setTheme(t)`. Add toggle buttons to the surah's `index.html`:
```html
<button class="theme-btn" data-theme="minecraft" onclick="setTheme('minecraft')">⚔️ Adventure</button>
<button class="theme-btn" data-theme="stars"     onclick="setTheme('stars')">✨ Stars & Ink</button>
```

---

## 7. Game Activity Types

### Quiz

```javascript
// Data format
const S1_QUIZ = [
  { q: 'Question text', opts: ['A', 'B', 'C', 'D'], correct: 1 },
  // ...
];

// Wrappers in app.js
function renderSection1Game() { renderQuiz(1, S1_QUIZ); }
function checkSection1()      { checkQuiz(1, S1_QUIZ); }
```

HTML required in `index.html`:
```html
<div id="quiz-1"></div>
<div class="game-feedback" id="feedback-1"></div>
<button onclick="checkSection1()">✅ Check Answers</button>
<button id="complete-1-btn" style="display:none" onclick="completeSection(1)">🏆 Claim Reward!</button>
```

Pass threshold: **75%** correct (hardcoded in `engine.js → checkQuiz`).

---

### Drag & Drop

```javascript
const S2_ITEMS = [
  { id: 'i1', text: 'Label text', zone: 'z1' },  // zone = correct zone id
];
const S2_ZONES = [
  { id: 'z1', desc: 'Zone description shown to user' },
];

function renderSection2Game() { renderDragDrop(2, S2_ITEMS, S2_ZONES); }
function checkSection2()      { checkDragDrop(2, S2_ZONES); }
```

HTML required:
```html
<div class="drag-game-container">
  <div class="drag-pool" id="drag-pool-2"></div>
  <div class="drop-zones" id="drop-zones-2"></div>
</div>
<div class="game-feedback" id="feedback-2"></div>
<button onclick="checkSection2()">✅ Check Matches</button>
<button id="complete-2-btn" style="display:none" onclick="completeSection(2)">🏆 Claim Reward!</button>
```

Pass threshold: **All correct** (all items must be in their correct zones).

---

### Story Order

```javascript
const S3_EVENTS_CORRECT = [
  { id: 'e1', text: 'First event' },
  { id: 'e2', text: 'Second event' },
  // Items in the CORRECT order
];
window._S3_EVENTS = S3_EVENTS_CORRECT;  // Required for moveOrderItem() inline calls in HTML

function renderSection3Game() { renderStoryOrder(3, S3_EVENTS_CORRECT); }
function checkSection3()      { checkStoryOrder(3, S3_EVENTS_CORRECT); }
```

HTML required:
```html
<div class="order-list" id="order-3"></div>
<div class="game-feedback" id="feedback-3"></div>
<button onclick="checkSection3()">✅ Check Order</button>
<button id="complete-3-btn" style="display:none" onclick="completeSection(3)">🏆 Claim Reward!</button>
```

Pass threshold: **All in correct position**.

---

## 8. Adding a New Surah — Step-by-Step

### Step 1 — Create the folder and files

Inside `baqarah/`, create a new folder (e.g. `abasa/`). It needs these 5 files:
```
baqarah/abasa/
  index.html
  palette.css
  style.css
  scenes.js
  app.js
```

Copy `naziat/` as a starting template — it's the simplest, cleanest surah.

---

### Step 2 — `palette.css`

Pick a unique colour identity for the Surah and define all 13 variables (see Section 5 above).

---

### Step 3 — `app.js`

1. Set `window.STORAGE_KEY` to a unique value (e.g. `'abasaQuestSave'`)
2. Define `window.state` with one entry per section: `sNAnswers: {}`, `sNChecked: false`
3. Define `REWARDS` object (one entry per level)
4. Define `window.SURAH_CONFIG` (totalLevels, rewards, tileIcons, tileLabels, welcomeMsg)
5. Add game data constants for each section
6. Add section wrapper functions (`renderSectionNGame`, `checkSectionN`)
7. Add world builder (`_drawBuildCanvas`, `updateUIExtra`)

---

### Step 4 — `index.html`

Copy `naziat/index.html` as a base. Update:
- `<title>` tag
- Surah name, Arabic text, verse range in all visible text
- Number of levels (map tiles, `done-display` counter, world builder chunks)
- Each section panel's content (story text, verse blocks, game type markup)
- `all-complete` message
- Section count in `startGame` render loop (handled automatically by `SURAH_CONFIG.totalLevels`)

The `<head>` should contain exactly:
```html
<meta charset="UTF-8">
<script>(function(){var t=localStorage.getItem('quranQuestTheme');if(t)document.documentElement.setAttribute('data-theme',t);})();</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Surah X Quest</title>
<link rel="stylesheet" href="../shared/base.css"/>
<link rel="stylesheet" href="palette.css"/>
<link rel="stylesheet" href="style.css"/>
```

And the scripts at the bottom:
```html
<script src="scenes.js"></script>
<script src="../shared/engine.js"></script>
<script src="../shared/ui.js"></script>
<script src="app.js"></script>
```

---

### Step 5 — Add a portal to the Hub

In `baqarah/index.html`, add a new portal div inside `.portals` and add CSS for it in the `<style>` block (copy a portal's CSS and adjust the colour). Add a `renderProgress(...)` call at the bottom of the `<script>` block.

---

## 9. Adding a New Activity Type

1. Add `renderMyActivity(n, data)` and `checkMyActivity(n, data)` functions to `shared/engine.js`
2. Add the required CSS classes to `shared/base.css`
3. In each surah's `app.js` that uses it, add the data constant and wrapper functions:
   ```javascript
   function renderSection5Game() { renderMyActivity(5, S5_DATA); }
   function checkSection5()      { checkMyActivity(5, S5_DATA); }
   ```
4. Add the HTML structure to that surah's `index.html` section panel

---

## 10. State & LocalStorage

Each surah's state object lives in `window.state` and is persisted via `localStorage[window.STORAGE_KEY]`.

**Standard state shape:**
```javascript
window.state = {
  explorerName: '',       // String — player's name
  xp:           0,        // Number — total XP earned
  gems:         0,        // Number — total gems earned
  completed:    [],       // Array of completed level numbers [1, 2, 3...]
  s1Answers:    {},       // Object — quiz answers for section 1 { qi: oi }
  s1Checked:    false,    // Boolean — true after successful quiz check
  s2Checked:    false,    // For drag-drop / story order sections
  s3Order:      [],       // Array of event IDs for story order section 3
  s3Checked:    false,
  // ... repeat for each section
};
```

`saveProgress()` and `loadProgress()` in `engine.js` handle serialisation automatically.

---

## 11. World Builder Canvas

Each surah has a canvas that progressively reveals a scene as levels are completed. It is drawn by `_drawBuildCanvas(n)` in the surah's `app.js` where `n` = number of completed levels.

The function is called via the `updateUIExtra()` hook that `ui.js` calls after every `updateUI()`:
```javascript
// In app.js — required hook
function updateUIExtra() {
  _drawBuildCanvas(window.state.completed.length);
}
```

The canvas element in `index.html`:
```html
<canvas id="build-canvas" width="560" height="250" style="width:100%;display:block;"></canvas>
```

The canvas drawing should be **theme-aware** — check `document.documentElement.dataset.theme` and adjust colours accordingly.

Existing world builders for reference:
- `baqarah/` → Ka'ba build-up
- `naba/` → Paradise Gate
- `mulk/` → Seven Heavens
- `imran/` → Masjid
- `muhammad/` → Battle Banner of Truth
- `naziat/` → Garden of Al-Ma'wa

---

## 12. Scenes (Animated Canvas)

Each surah's `scenes.js` contains pixel art or illustrated canvas animations shown when a section is open.

**Required exports (global functions):**

```javascript
function initScenes() {
  // Called once on game start.
  // Set up canvases, event listeners for verse popups on click, etc.
}

function startScene(n) {
  // Called when section n is opened.
  // Start the animation loop for canvas-n.
}

function stopAllScenes() {
  // Called when returning to the map.
  // Cancel all animation frames.
}
```

**Verse popup on scene click:**
```javascript
canvas.onclick = () => showVersePopup({
  ref:     'Al-Baqarah 2:255',
  arabic:  'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ...',
  english: 'Allah — there is no deity except Him...',
  note:    'Optional footnote text',
});
```

**Theme-aware drawing:**
```javascript
const isStars = document.documentElement.dataset.theme === 'stars';
ctx.fillStyle = isStars ? '#d4a0ff' : '#4a8a30';
```

---

## 13. Common Mistakes to Avoid

| Mistake | Correct approach |
|---------|-----------------|
| Putting utility functions (`shuffle`, `saveProgress`) in `app.js` | They live in `shared/engine.js` — just call them |
| Duplicating UI logic (e.g. `updateUI`, `openSection`) in `app.js` | They live in `shared/ui.js` — already global |
| Using `const STORAGE_KEY` or `let state` in `app.js` | Must use `window.STORAGE_KEY` and `window.state` so `engine.js` and `ui.js` can access them |
| Creating surah folders at `rahman/` level | Always create inside `rahman/baqarah/` |
| Adding layout CSS to a surah's `style.css` | Layout CSS goes in `shared/base.css` |
| Hardcoding total level count in `ui.js` | It reads `window.SURAH_CONFIG.totalLevels` — just set that correctly |
| Calling `renderSectionNGame()` manually at startup | `ui.js → _renderAllSections()` calls all of them automatically via `SURAH_CONFIG.totalLevels` |
| Forgetting `window._SN_EVENTS = SN_EVENTS_CORRECT` for story order | The HTML's `moveOrderItem(n, idx, dir, SN_EVENTS_CORRECT)` needs this global reference |
| Forgetting `data-theme="minecraft"` on `<html>` | Set it as default to prevent FOUC before `ui.js` loads |
| Forgetting the early-apply theme script in `<head>` | Add `<script>(function(){var t=localStorage.getItem('quranQuestTheme');if(t)document.documentElement.setAttribute('data-theme',t);})();</script>` right after `<meta charset>` |

---

*Last updated: March 2026 — Architecture version 2 (SOLID refactor with shared engine/ui/base)*
