#!/usr/bin/env python3
"""
Quran Quest — Regression Validator (Tier 1 + Tier 2)
Scans every surah's index.html + app.js for consistency.

Run from anywhere:
    python3 baqarah/shared/validate.py

Exit code 0 = all clear, 1 = errors found.
"""
import os, re, sys, glob

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# Thematic match sections where English left-side is intentional
THEMATIC_SKIP = {
    ('baqarah', 4), ('baqarah', 7), ('baqarah', 9),
    ('imran', 3), ('imran', 5),
    ('haqqah', 2), ('qalam', 2),
}

ERRORS = []
WARNINGS = []

def err(surah, msg):
    ERRORS.append(f"  ERROR  {surah}: {msg}")

def warn(surah, msg):
    WARNINGS.append(f"  WARN   {surah}: {msg}")

def has_arabic(text):
    return bool(re.search(r'[\u0600-\u06FF]', text))

# =============================================
#  ACTIVITY TYPE DETECTION
# =============================================

def detect_activity_type_from_js(app_text):
    """Return dict: section_number -> 'quiz'|'match'|'fillblank'|'theme_match'|'wbw'"""
    types = {}
    cfg_match = re.search(r'wbwSection\s*:\s*(\d+)', app_text)
    if cfg_match:
        types[int(cfg_match.group(1))] = 'wbw'
    for m in re.finditer(r'window\.registerQuiz\(\s*(\d+)', app_text):
        types[int(m.group(1))] = 'quiz'
    for m in re.finditer(r'window\.registerMatch\(\s*(\d+)\s*,\s*(\w+)', app_text):
        sec = int(m.group(1))
        types[sec] = 'theme_match' if 'THEME' in m.group(2) else 'match'
    for m in re.finditer(r'window\.registerFillBlank\(\s*(\d+)', app_text):
        types[int(m.group(1))] = 'fillblank'
    for m in re.finditer(r'function\s+renderSection(\d+)Game\s*\(\s*\)\s*\{([^}]+)\}', app_text):
        sec = int(m.group(1))
        body = m.group(2)
        if sec in types:
            continue
        if 'renderDragDrop' in body:
            types[sec] = 'theme_match' if 'THEME' in body else 'match'
        elif 'renderQuiz' in body:
            types[sec] = 'quiz'
        elif 'renderFillBlank' in body:
            types[sec] = 'fillblank'
    return types

def get_total_levels(app_text):
    m = re.search(r'totalLevels\s*:\s*(\d+)', app_text)
    return int(m.group(1)) if m else 0

def get_reward_keys(app_text):
    return set(int(m.group(1)) for m in re.finditer(r'^\s*(\d+)\s*:\s*\{', app_text, re.MULTILINE))

def get_section_panels(html_text):
    return set(int(m.group(1)) for m in re.finditer(r'id="section-panel-(\d+)"', html_text))

def get_container_ids(html_text):
    quiz_ids = set(int(m.group(1)) for m in re.finditer(r'id="quiz-(\d+)"', html_text))
    order_ids = set(int(m.group(1)) for m in re.finditer(r'id="order-(\d+)"', html_text))
    dragpool_ids = set(int(m.group(1)) for m in re.finditer(r'id="drag-pool-(\d+)"', html_text))
    dropzone_ids = set(int(m.group(1)) for m in re.finditer(r'id="drop-zones-(\d+)"', html_text))
    return quiz_ids, order_ids, dragpool_ids, dropzone_ids

def get_instructions_by_section(html_text):
    result = {}
    panels = list(re.finditer(r'id="section-panel-(\d+)"', html_text))
    for i, pm in enumerate(panels):
        sec = int(pm.group(1))
        start = pm.start()
        end = panels[i + 1].start() if i + 1 < len(panels) else len(html_text)
        chunk = html_text[start:end]
        instructions = re.findall(r'class="game-instructions"[^>]*>([^<]+)<', chunk)
        result[sec] = instructions
    return result

def check_items_arabic(app_text, surah_name):
    for m in re.finditer(r'const\s+(S(\d+)_ITEMS)\s*=\s*\[', app_text):
        var_name = m.group(1)
        sec = int(m.group(2))
        if 'THEME' in var_name:
            continue
        if (surah_name, sec) in THEMATIC_SKIP:
            continue
        block_start = m.end()
        depth = 1
        pos = block_start
        while pos < len(app_text) and depth > 0:
            if app_text[pos] == '[': depth += 1
            elif app_text[pos] == ']': depth -= 1
            pos += 1
        block = app_text[block_start:pos]
        texts = re.findall(r"text\s*:\s*['\"]([^'\"]+)['\"]", block)
        if not texts:
            texts = re.findall(r'text\s*:\s*[\'"]([^\'"]+)[\'"]', block)
        for t in texts:
            if not has_arabic(t):
                err(surah_name, f"S{sec}_ITEMS has non-Arabic left-side text: \"{t[:50]}\"")
                break

REMNANT_PATTERNS = [
    (r'STORY ORDER', 'STORY ORDER'),
    (r'PUT IT IN ORDER', 'PUT IT IN ORDER'),
    (r'Check Order', 'Check Order'),
    (r'CHECK ORDER', 'CHECK ORDER'),
    (r'registerOrder', 'registerOrder'),
    (r'renderStoryOrder', 'renderStoryOrder'),
    (r'checkStoryOrder', 'checkStoryOrder'),
    (r'_EVENTS_CORRECT', '_EVENTS_CORRECT'),
]

def check_remnants(text, surah_name, filename):
    for pattern, label in REMNANT_PATTERNS:
        if re.search(pattern, text):
            err(surah_name, f"Remnant '{label}' found in {filename}")

# =============================================
#  SCRIPT LOADING CHECKS (A + B)
# =============================================

CORRECT_SCRIPT_ORDER = [
    'arabic-words.js',
    'scene-base.js',
    'scenes.js',
    'engine.js',
    'ui.js',
    'app.js',
]

def get_script_tags(html_text):
    return re.findall(r'<script\s+src="([^"]+)"', html_text)

def check_scripts(html_text, app_text, surah_name, surah_dir):
    scripts = get_script_tags(html_text)
    basenames = [os.path.basename(s) for s in scripts]

    # Check A: Missing script includes
    if 'setupWBWLevel' in app_text and 'arabic-words.js' not in basenames:
        err(surah_name, "app.js calls setupWBWLevel but arabic-words.js is not loaded in HTML")

    if os.path.exists(os.path.join(surah_dir, 'scenes.js')) and 'scenes.js' not in basenames:
        err(surah_name, "scenes.js exists in surah dir but is not loaded in HTML")

    # Check B: Script load order
    ordered = [b for b in basenames if b in CORRECT_SCRIPT_ORDER]
    expected = [s for s in CORRECT_SCRIPT_ORDER if s in ordered]
    if ordered != expected:
        err(surah_name, f"Script load order wrong: got {ordered}, expected {expected}")

# =============================================
#  CSS VARIABLE CHECK (C)
# =============================================

def check_font_arabic_defined():
    base_css_path = os.path.join(BASE, 'shared', 'base.css')
    if not os.path.exists(base_css_path):
        err('shared', 'base.css not found')
        return
    css = open(base_css_path).read()
    if '--font-arabic' not in css or re.search(r'--font-arabic\s*:', css) is None:
        err('shared', '--font-arabic used in base.css selectors but never defined in :root')

# =============================================
#  CANVAS ID CHECK (D)
# =============================================

def check_canvas_ids(html_text, surah_name, surah_dir):
    scenes_path = os.path.join(surah_dir, 'scenes.js')
    if not os.path.exists(scenes_path):
        return
    scenes_text = open(scenes_path).read()
    html_canvas_ids = set(re.findall(r'id="(canvas-[^"]+)"', html_text))
    js_canvas_refs = set(re.findall(r"getElementById\(['\"]?(canvas-[^'\")\s]+)", scenes_text))
    for ref in js_canvas_refs:
        if ref not in html_canvas_ids:
            err(surah_name, f"scenes.js references '{ref}' but it's not in HTML")

# =============================================
#  HTML LANDMARK CHECK (E)
# =============================================

REQUIRED_IDS = ['game-header', 'intro-screen', 'main-view', 'section-view', 'reward-overlay', 'welcome-text']
OPTIONAL_IDS = ['verse-popup', 'all-complete']

def check_landmarks(html_text, surah_name):
    for rid in REQUIRED_IDS:
        if f'id="{rid}"' not in html_text:
            err(surah_name, f"Missing required HTML landmark: id=\"{rid}\"")
    for rid in OPTIONAL_IDS:
        if f'id="{rid}"' not in html_text:
            warn(surah_name, f"Missing optional HTML landmark: id=\"{rid}\"")

# =============================================
#  HARDCODED COLOR CHECK (F)
# =============================================

HARDCODED_COLOR_MAP = {
    '#ff6666': 'var(--error)',
    '#e74c3c': 'var(--error)',
    '#4caf50': 'var(--success)',
    '#27ae60': 'var(--success)',
    '#f39c12': 'var(--warning)',
    '#00d4ff': 'var(--gem)',
}

def check_hardcoded_colors(html_text, surah_name):
    inline_styles = re.findall(r'style="([^"]+)"', html_text)
    for style in inline_styles:
        for hex_color, var_name in HARDCODED_COLOR_MAP.items():
            if hex_color in style.lower():
                warn(surah_name, f"Hardcoded color {hex_color} in inline style — consider {var_name}")
                break

# =============================================
#  LEGACY CSS VARIABLE DRIFT (G)
# =============================================

LEGACY_VARS = {
    '--green': '--success',
    '--red': '--error',
    '--text-muted': '--text-dim',
}

def check_legacy_css(surah_dir, surah_name):
    style_path = os.path.join(surah_dir, 'style.css')
    if not os.path.exists(style_path):
        return
    css = open(style_path).read()
    for legacy, modern in LEGACY_VARS.items():
        if re.search(re.escape(legacy) + r'\s*:', css):
            warn(surah_name, f"style.css defines '{legacy}' — should use shared '{modern}' from base.css")

# =============================================
#  ARABIC FONT HARDCODING (H)
# =============================================

def check_arabic_font_hardcoded(surah_dir, surah_name):
    for fname in ('style.css', 'index.html'):
        fpath = os.path.join(surah_dir, fname)
        if not os.path.exists(fpath):
            continue
        text = open(fpath).read()
        hits = re.findall(r"font-family\s*:\s*['\"]?Amiri", text)
        if hits:
            warn(surah_name, f"{fname} has hardcoded font-family: Amiri — consider var(--font-serif) or var(--font-arabic)")

# =============================================
#  PALETTE.CSS CONTRACT (I)
# =============================================

REQUIRED_PALETTE_VARS = ['--bg', '--primary', '--accent', '--text']

def check_palette(surah_dir, surah_name):
    pal_path = os.path.join(surah_dir, 'palette.css')
    if not os.path.exists(pal_path):
        warn(surah_name, "No palette.css found")
        return
    css = open(pal_path).read()
    if 'data-theme="stars"' not in css:
        warn(surah_name, "palette.css missing html[data-theme=\"stars\"] block")
    for v in REQUIRED_PALETTE_VARS:
        if v + ':' not in css and v + ' :' not in css:
            warn(surah_name, f"palette.css missing required variable '{v}'")

# =============================================
#  INTRO SCREEN STRUCTURE (J)
# =============================================

def check_intro_screen(html_text, surah_name):
    has_standard = 'intro-form' in html_text or 'intro-input' in html_text
    has_alternate = 'intro-box' in html_text
    if not has_standard and not has_alternate:
        warn(surah_name, "Neither standard intro (.intro-form/.intro-input) nor alternate (.intro-box) found")

# =============================================
#  MAIN SURAH VALIDATION
# =============================================

def validate_surah(surah_dir):
    surah_name = os.path.basename(surah_dir)
    html_path = os.path.join(surah_dir, 'index.html')
    js_path = os.path.join(surah_dir, 'app.js')

    if not os.path.exists(html_path) or not os.path.exists(js_path):
        return

    html_text = open(html_path).read()
    app_text = open(js_path).read()

    total = get_total_levels(app_text)
    if total == 0:
        warn(surah_name, "Could not detect totalLevels")
        return

    activity_types = detect_activity_type_from_js(app_text)
    rewards = get_reward_keys(app_text)
    panels = get_section_panels(html_text)
    quiz_ids, order_ids, dragpool_ids, dropzone_ids = get_container_ids(html_text)
    instructions = get_instructions_by_section(html_text)

    wbw_sec = None
    wbw_m = re.search(r'wbwSection\s*:\s*(\d+)', app_text)
    if wbw_m:
        wbw_sec = int(wbw_m.group(1))

    for n in range(1, total + 1):
        if n not in panels and n != wbw_sec:
            err(surah_name, f"Section {n}: missing section-panel-{n} in HTML")
        if n not in rewards:
            err(surah_name, f"Section {n}: missing REWARDS[{n}] entry in app.js")

        atype = activity_types.get(n)
        if not atype:
            continue

        if atype == 'quiz':
            if n not in quiz_ids:
                err(surah_name, f"Section {n} (quiz): missing id=\"quiz-{n}\" in HTML")
        elif atype in ('match', 'theme_match'):
            has_drag = n in dragpool_ids and n in dropzone_ids
            has_order = n in order_ids
            if not has_drag and not has_order:
                err(surah_name, f"Section {n} ({atype}): missing drag-pool-{n}/drop-zones-{n} or order-{n} in HTML")
        elif atype == 'fillblank':
            if n not in order_ids and n not in quiz_ids:
                err(surah_name, f"Section {n} (fillblank): missing id=\"order-{n}\" or id=\"quiz-{n}\" in HTML")

        instr_list = instructions.get(n, [])
        for instr in instr_list:
            instr_lower = instr.lower().strip()
            if atype in ('match', 'theme_match'):
                if 'fill in the missing' in instr_lower:
                    err(surah_name, f"Section {n} ({atype}): instructions say 'Fill in the missing' but activity is match")
            elif atype == 'fillblank':
                if 'match' in instr_lower and 'fill' not in instr_lower:
                    err(surah_name, f"Section {n} (fillblank): instructions mention 'match' but activity is fill-in-the-blank")

    check_items_arabic(app_text, surah_name)
    check_remnants(html_text, surah_name, 'index.html')
    check_remnants(app_text, surah_name, 'app.js')

    for m in re.finditer(r'class="speech-bubble"[^>]*>(.*?)</div>', html_text, re.DOTALL):
        bubble = m.group(1)
        if re.search(r'[Pp]ut .* in order|[Aa]rrange .* order|[Oo]rder the|in the right order', bubble):
            line = html_text[:m.start()].count('\n') + 1
            err(surah_name, f"Ibn Ameen ordering dialogue at line ~{line}: \"{bubble[:80].strip()}...\"")

    for m in re.finditer(r'class="card-header"[^>]*>([^<]+)<', html_text):
        header = m.group(1)
        if re.search(r'ORDER|Put .* Order|Arrange', header, re.IGNORECASE):
            line = html_text[:m.start()].count('\n') + 1
            err(surah_name, f"Card header ordering remnant at line ~{line}: \"{header}\"")

    # New checks A-J
    check_scripts(html_text, app_text, surah_name, surah_dir)
    check_canvas_ids(html_text, surah_name, surah_dir)
    check_landmarks(html_text, surah_name)
    check_hardcoded_colors(html_text, surah_name)
    check_legacy_css(surah_dir, surah_name)
    check_arabic_font_hardcoded(surah_dir, surah_name)
    check_palette(surah_dir, surah_name)
    check_intro_screen(html_text, surah_name)

# =============================================
#  MAIN
# =============================================

def main():
    surah_dirs = sorted(glob.glob(os.path.join(BASE, '*/')))
    total_surahs = 0

    # Check C: --font-arabic defined in base.css (one-time global check)
    check_font_arabic_defined()

    for d in surah_dirs:
        name = os.path.basename(d.rstrip('/'))
        if name in ('shared',) or not os.path.isdir(d):
            continue
        if not os.path.exists(os.path.join(d, 'app.js')):
            continue
        total_surahs += 1
        validate_surah(d.rstrip('/'))

    print(f"\n{'='*60}")
    print(f"  QURAN QUEST VALIDATOR — {total_surahs} surahs checked")
    print(f"{'='*60}")

    if WARNINGS:
        print(f"\n  Warnings ({len(WARNINGS)}):")
        for w in sorted(WARNINGS):
            print(w)

    if ERRORS:
        print(f"\n  ERRORS ({len(ERRORS)}):")
        for e in sorted(ERRORS):
            print(e)
        print(f"\n  RESULT: FAIL — {len(ERRORS)} error(s) found\n")
        return 1
    else:
        print(f"\n  RESULT: PASS — all checks passed!\n")
        return 0

if __name__ == '__main__':
    sys.exit(main())
