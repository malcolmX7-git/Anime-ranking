const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'HTML', '1_FUTURE_PROJECT');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract anime name from <title>Anime Ranking - NAME | ...</title>
  const titleMatch = content.match(/<title>\s*Anime Ranking -\s*([^|<]+)\s*\|/i);
  const animeName = titleMatch ? titleMatch[1].trim() : file.replace('.html','');

  // Replace img alt using the following <h2> name
  // Pattern: <section>\n                    <img ...>\n                    <div>\n                        <h2>Name</h2>
  const sectionRegex = /(<section>\s*\n\s*<img[^>]*src="([^"]+)"[^>]*alt=")[^"]*("[^>]*>\s*\n\s*<div>\s*\n\s*<h2>\s*([^<]+)\s*<\/h2>)/gm;

  content = content.replace(sectionRegex, (match, p1, src, p3, h2name) => {
    const altText = `${h2name.trim()} - Personnage de ${animeName}`;
    return `${p1}${altText}${p3}`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated alts in ${file}`);
});

console.log('\nAll files updated.');
