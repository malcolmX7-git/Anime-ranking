const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'IMG', '2img-background');
const htmlDirs = [path.join(__dirname,'HTML'), path.join(__dirname,'HTML','1_FUTURE_PROJECT')];

function norm(s){
  return s.toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]/gi,'')
    .replace(/jpg|jpeg|png/g,'');
}

const imgs = fs.readdirSync(imgDir);
const normMap = new Map();
imgs.forEach(f=> normMap.set(norm(f), f));

function findBestMatch(name){
  const n = norm(name);
  if(normMap.has(n)) return normMap.get(n);
  // exact substring or reverse
  for(const [k,v] of normMap.entries()){
    if(k.includes(n) && n.length>0) return v;
  }
  for(const [k,v] of normMap.entries()){
    if(n.includes(k) && k.length>0) return v;
  }
  // try word by word
  const parts = n.match(/.{1,6}/g) || [];
  for(const p of parts){
    for(const [k,v] of normMap.entries()){
      if(k.includes(p)) return v;
    }
  }
  return null;
}

const updated = [];

htmlDirs.forEach(dir=>{
  if(!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f=>f.endsWith('.html'));
  files.forEach(file=>{
    const filePath = path.join(dir,file);
    let content = fs.readFileSync(filePath,'utf8');
    // extract anime name from H1.header-title
    let animeName = null;
    const h1 = content.match(/<h1[^>]*class=["']header-title["'][^>]*>([\s\S]*?)<\/h1>/i);
    if(h1) animeName = h1[1].replace(/\s*-\s*Les personnages principaux$/i,'').trim();
    if(!animeName){
      const title = content.match(/<title>([\s\S]*?)<\/title>/i);
      if(title) animeName = title[1].replace(/Anime Ranking -\s*/i,'').replace(/\|.*$/,'').trim();
    }
    if(!animeName) animeName = file.replace('.html','').replace(/_/g,' ');

    const match = findBestMatch(animeName);
    if(!match) return;

    // replace url("../IMG/2img-background/...") in the style block
    const newUrl = `url("../IMG/2img-background/${match}")`;
    const newStyle = content.replace(/background:\s*linear-gradient\([^)]*\),\s*url\(["'][^"')]+["']\)\s*[^;]+;/i, (m)=>{
      return m.replace(/url\(["'][^"')]+["']\)/i, newUrl);
    });
    if(newStyle !== content){
      fs.writeFileSync(filePath, newStyle, 'utf8');
      updated.push({file: filePath, image: match});
    }
  });
});

console.log('Updated', updated.length, 'files:');
updated.forEach(u=>console.log(u.file, '->', u.image));
