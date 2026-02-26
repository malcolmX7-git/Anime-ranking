#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import glob
from bs4 import BeautifulSoup

html_dir = 'HTML'
changed_files = []

for path in glob.glob(os.path.join(html_dir, '*.html')):
    with open(path, 'r', encoding='utf-8') as f:
        raw = f.read()

    # quick cleanup of leftover sequences
    raw = raw.replace('$2<script', '')
    raw = raw.replace('`n<script', '<script')
    raw = raw.replace('\r\n', '\n')

    soup = BeautifulSoup(raw, 'html.parser')
    head = soup.head
    body = soup.body
    updated = False

    # 1) Ensure minified CSS references
    for link in list(soup.find_all('link', rel='stylesheet')):
        href = link.get('href','')
        if '../CSS/style.css' in href:
            link['href'] = href.replace('style.css', 'style.min.css')
            updated = True
        if 'anime.css' in href:
            link['href'] = href.replace('anime.css', 'anime.min.css')
            updated = True
        if 'accueil.css' in href:
            link['href'] = href.replace('accueil.css', 'accueil.min.css')
            updated = True
        if 'classement.css' in href:
            link['href'] = href.replace('classement.css', 'classement.min.css')
            updated = True

    # 2) Remove any interactions.js occurrences in head
    if head:
        for s in head.find_all('script'):
            src = s.get('src','')
            if 'interactions.js' in src:
                s.decompose(); updated = True

    # 3) Ensure a single interactions.js before </body>
    has_interactions = False
    if body:
        for s in body.find_all('script'):
            if s.get('src','') and 'interactions.js' in s.get('src',''):
                has_interactions = True
    if not has_interactions and body:
        new_tag = soup.new_tag('script', src='../JS/interactions.js')
        new_tag.attrs['defer'] = True
        body.append(new_tag)
        updated = True

    # 4) Fix empty alt attributes on <img>
    for img in soup.find_all('img'):
        alt = img.get('alt')
        src = img.get('src','')
        if alt is None or alt.strip() == '':
            # derive alt from filename
            name = os.path.basename(src)
            name = os.path.splitext(name)[0]
            name = name.replace('_',' ').replace('-',' ').strip()
            if name == '':
                name = 'image'
            img['alt'] = f'Image {name}'
            updated = True

    # 5) Remove leftover weird sequences and fix common spacing issues
    final_html = str(soup)
    final_html = final_html.replace('Ã', 'À') if 'Ã' in final_html and 'é' not in final_html else final_html
    final_html = final_html.replace('ââ', "'")
    final_html = final_html.replace('â€™', "'")
    final_html = final_html.replace('Ã©', 'é')
    final_html = final_html.replace('  ', ' ')

    if updated:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(final_html)
        changed_files.append(path)

print('Files changed:', len(changed_files))
for p in changed_files:
    print('-', p)

# quick post-checks
problems = {
    'non_min_css': [],
    'missing_interactions': [],
    'empty_alt': [],
}
for path in glob.glob(os.path.join(html_dir, '*.html')):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    if 'href="../CSS/style.css"' in c or 'href="../CSS/anime.css"' in c or 'href="../CSS/accueil.css"' in c:
        problems['non_min_css'].append(path)
    if 'interactions.js' not in c:
        problems['missing_interactions'].append(path)
    if 'alt="Image' in c:
        problems['empty_alt'].append(path)

print('\nPost-checks:')
print('Non-minified CSS refs:', len(problems['non_min_css']))
print('Missing interactions.js:', len(problems['missing_interactions']))
print('Images assigned generated alt (count files):', len(problems['empty_alt']))
