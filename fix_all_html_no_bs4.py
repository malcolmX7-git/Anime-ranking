#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os, re, glob

html_dir = 'HTML'
changed = []

def derive_alt_from_src(src):
    name = os.path.basename(src)
    name = os.path.splitext(name)[0]
    name = name.replace('_',' ').replace('-',' ').strip()
    if not name:
        return 'Image'
    return 'Image ' + name

for path in glob.glob(os.path.join(html_dir, '*.html')):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Clean leftover tokens
    content = content.replace('$2<script', '')
    content = content.replace('`n<script', '<script')
    content = content.replace('`n', '\n')

    # Fix common encoding residues
    content = content.replace('â€™', "'")
    content = content.replace('Ã©', 'é')
    content = content.replace('Ã¨', 'è')
    content = content.replace('Ã ', 'à')
    content = content.replace('Â ', ' ')
    content = content.replace('ââ', "'")

    # Ensure minified CSS
    content = re.sub(r'href="(../CSS/)style\.css"', r'href="\1style.min.css"', content)
    content = re.sub(r'href="(../CSS/)anime\.css"', r'href="\1anime.min.css"', content)
    content = re.sub(r'href="(../CSS/)accueil\.css"', r'href="\1accueil.min.css"', content)
    content = re.sub(r'href="(../CSS/)classement\.css"', r'href="\1classement.min.css"', content)

    # Remove any interactions.js in head or elsewhere (we'll add one cleanly)
    content = re.sub(r'<script[^>]*interactions\.js[^>]*>\s*</script>', '', content, flags=re.IGNORECASE)

    # Ensure single interactions.js before </body>
    if 'interactions.js' not in content:
        content = re.sub(r'</body>', '\n<script src="../JS/interactions.js" defer></script>\n</body>', content, flags=re.IGNORECASE)

    # Fix empty alt attributes by deriving from src
    def replace_alt(match):
        before = match.group(1)
        src = match.group(2)
        after = match.group(3) or ''
        alt = derive_alt_from_src(src)
        return f'{before}alt="{alt}"{after}'

    content = re.sub(r'(<img[^>]*?)src="([^"]+)"([^>]*?)alt=""', replace_alt, content, flags=re.IGNORECASE)

    # Also fix images missing alt attribute entirely: add alt derived
    def add_alt(match):
        tag_start = match.group(1)
        src = match.group(2)
        rest = match.group(3) or ''
        alt = derive_alt_from_src(src)
        return f'{tag_start}src="{src}" alt="{alt}"{rest}'

    content = re.sub(r'(<img[^>]*?)src="([^"]+)"([^>]*?>)', add_alt, content, flags=re.IGNORECASE)

    # Remove leftover sequences like 'DDDD' or multiple 'D' at start of titles/descriptions
    content = content.replace('DDDDécouvrez', 'Découvrez')
    content = content.replace('DDécouvrez', 'Découvrez')
    content = content.replace('DDD', 'D')

    # Clean doubled letters produced earlier
    content = re.sub(r'dd([éa-zA-Z])', r'd\1', content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        changed.append(path)

print('Modified files count:', len(changed))
for p in changed:
    print('-', p)

# Post-check quick reports
non_min = []
missing_inter = []
empty_alt_files = []
for path in glob.glob(os.path.join(html_dir, '*.html')):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    if re.search(r'href="../CSS/(style|anime|accueil|classement)\.css"', c):
        non_min.append(path)
    if 'interactions.js' not in c:
        missing_inter.append(path)
    if re.search(r'alt=""', c) or re.search(r'alt=\'\'', c):
        empty_alt_files.append(path)

print('\nPost-checks:')
print('Non-minified CSS refs:', len(non_min))
print('Missing interactions.js:', len(missing_inter))
print('Files with empty alt left:', len(empty_alt_files))
