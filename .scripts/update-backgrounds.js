const fs = require('fs');
const path = require('path');

const roots = [path.join(__dirname,'HTML'), path.join(__dirname,'HTML','1_FUTURE_PROJECT')];

let updated = [];

roots.forEach(root => {
  if(!fs.existsSync(root)) return;
  const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(root, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // find anime name from <h1 class="header-title">
    let animeName = null;
    const h1 = content.match(/<h1[^>]*class=["']header-title["'][^>]*>([\s\S]*?)<\/h1>/i);
    if(h1) {
      animeName = h1[1].trim().replace(/\s*-\s*Les personnages principaux$/i, '').trim();
    }
    if(!animeName){
      // fallback: title or filename
      const title = content.match(/<title>([\s\S]*?)<\/title>/i);
      if(title) {
        animeName = title[1].replace(/Anime Ranking -\s*/i,'').replace(/\|.*$/,'').trim();
      }
    }
    if(!animeName) animeName = file.replace('.html','');

    const imageFile = encodeURIComponent(animeName) + '.jpg';

    const styleBlock = `        <style>\n            .background-img{\n                margin-top: 5.5rem;\n                background: linear-gradient(rgba(0, 0, 0, 0.489)), url("../IMG/2img-background/${imageFile}") top/cover no-repeat fixed;\n            }\n        </style>\n`;

    if(/<style>[\s\S]*?<\/style>/i.test(content)){
      // replace the first style block inside head
      content = content.replace(/<style>[\s\S]*?<\/style>/i, styleBlock);
    } else if(/<head[^>]*>/i.test(content)){
      // insert before </head>
      content = content.replace(/<\/head>/i, styleBlock + '</head>');
    } else {
      // no head tag, skip
      return;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    updated.push(filePath);
  });
});

console.log('Updated backgrounds for', updated.length, 'files');
if(updated.length) console.log(updated.join('\n'));
