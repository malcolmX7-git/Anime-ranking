const fs = require('fs');
const path = require('path');

const roots = [path.join(__dirname,'HTML'), path.join(__dirname,'HTML','1_FUTURE_PROJECT')];

const blackClover = fs.readFileSync(path.join(__dirname,'HTML','black clover.html'),'utf8');
const headMatch = blackClover.match(/<head>[\s\S]*?<\/head>/i);
const headTemplate = headMatch ? headMatch[0] : null;

if(!headTemplate){
  console.error('Impossible de lire head template');
  process.exit(1);
}

function makeMetaBlock(name, relPathPrefix, fileUrlPath){
  const safeName = name.replace(/"/g,'');
  const slug = fileUrlPath.replace('.html','');
  return `        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Anime Ranking - ${safeName} | Découvrez les personnages principaux</title>
        <meta name="description" content="Découvrez les personnages principaux de ${safeName} et leurs descriptions détaillées.">
        <meta name="keywords" content="anime, ${safeName}, personnages, classement, manga">
        <meta name="author" content="MALCOLM">
        <meta property="og:title" content="Anime Ranking - ${safeName}">
        <meta property="og:description" content="Découvrez les personnages principaux de ${safeName} avec leurs descriptions détaillées.">
        <meta property="og:image" content="https://ton-site.com/IMG/2img-background/${slug}.jpg">
        <meta property="og:url" content="https://ton-site.com/${fileUrlPath}">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Anime Ranking - ${safeName}">
        <meta name="twitter:description" content="Découvrez les personnages principaux de ${safeName}.">
        <meta name="twitter:image" content="https://ton-site.com/IMG/2img-background/${slug}.jpg">
        <link rel="apple-touch-icon" sizes="180x180" href="${relPathPrefix}IMG/Favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${relPathPrefix}IMG/Favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${relPathPrefix}IMG/Favicon/favicon-16x16.png">
        <link rel="manifest" href="${relPathPrefix}IMG/Favicon/site.webmanifest">
        <link rel="stylesheet" href="${relPathPrefix}CSS/style.css">
`;
}

let updatedFiles = [];

roots.forEach(root => {
  if(!fs.existsSync(root)) return;
  const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(root,file);
    let content = fs.readFileSync(filePath,'utf8');
    if(/<meta\s+name=\"description\"/i.test(content)) return; // already has description

    // Try to extract anime name from existing <h1 class="header-title"> or from filename
    let animeName = null;
    const h1 = content.match(/<h1[^>]*class=\"header-title\"[^>]*>([\s\S]*?)<\/h1>/i);
    if(h1) animeName = h1[1].trim().replace(/\s*-\s*Les personnages principaux$/i,'');
    if(!animeName){
      const title = content.match(/<title>([\s\S]*?)<\/title>/i);
      if(title) animeName = title[1].replace(/Anime Ranking -\s*/i,'').replace(/\|.*$/,'').trim();
    }
    if(!animeName) animeName = file.replace('.html','').replace(/_/g,' ');

    // Determine relative path prefix: if file in root `HTML/` then prefix is "../" for links to IMG and CSS, else "../../"? Actually pages currently use ../ so for files in HTML root prefix='../', for files in 1_FUTURE_PROJECT use '../..'?
    // Existing files in 1_FUTURE_PROJECT use "../IMG/..." and "../CSS/..." because they are inside HTML/1_FUTURE_PROJECT and move one level up to reach CSS. So relPathPrefix for files in HTML root should be '../'?? Wait: black clover (in HTML root) uses ../CSS/style.css (one level up). Files in 1_FUTURE_PROJECT also use ../CSS/style.css (one level up from HTML/1_FUTURE_PROJECT). So both use "../". We'll use '../' as prefix.
    const relPathPrefix = '../';
    const fileUrlPath = path.relative(__dirname, filePath).replace(/\\/g,'/'); // e.g. HTML/black clover.html

    // Build meta block
    const metaBlock = makeMetaBlock(animeName, relPathPrefix, fileUrlPath);

    // Remove existing <meta charset> and title if present to avoid duplicates? Safer: Insert metaBlock just before </head>
    if(/<\/head>/i.test(content)){
      content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/i, (m)=>{
        // keep opening <head> tag and replace inner with metaBlock
        return '<head>\n' + metaBlock + '        <style>\n            .background-img{\n                margin-top: 5.5rem;\n                /* image preserved in existing inline style */\n            }\n        </style>\n    </head>';
      });
    } else {
      // if no head tag, prepend at top
      content = '<head>\n' + metaBlock + '</head>\n' + content;
    }

    fs.writeFileSync(filePath, content,'utf8');
    updatedFiles.push(filePath);
  });
});

console.log('Updated metadata for', updatedFiles.length, 'files');
if(updatedFiles.length>0) console.log(updatedFiles.join('\n'));
