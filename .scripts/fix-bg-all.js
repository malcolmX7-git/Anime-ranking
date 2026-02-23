const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'IMG', '2img-background');
const htmlDirs = [path.join(__dirname,'HTML'), path.join(__dirname,'HTML','1_FUTURE_PROJECT')];

function norm(s){
  return s.toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]/gi,'');
}

const imgs = fs.readdirSync(imgDir);
const normMap = new Map();
imgs.forEach(f=> normMap.set(norm(f), f));

function findBestMatch(name){
  const n = norm(name);
  if(normMap.has(n)) return normMap.get(n);
  for(const [k,v] of normMap.entries()){
    if(k.includes(n) && n.length>0) return v;
  }
  for(const [k,v] of normMap.entries()){
    if(n.includes(k) && k.length>0) return v;
  }
  const parts = n.split(/\s+/).filter(Boolean);
  for(const p of parts){
    for(const [k,v] of normMap.entries()){
      if(k.includes(p)) return v;
    }
  }
  return null;
}

const updated=[];

htmlDirs.forEach(dir=>{
  if(!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f=>f.endsWith('.html'));
  files.forEach(file=>{
    const filePath = path.join(dir,file);
    let content = fs.readFileSync(filePath,'utf8');

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

    // replace any IMG/2img-background/... occurrences
    const newPath = `../IMG/2img-background/${match}`;
    const newAbsolute = `https://ton-site.com/IMG/2img-background/${match}`;

    let newContent = content.replace(/IMG\/2img-background\/[^"')>\s]+/g, `IMG/2img-background/${match}`);
    // ensure style url uses ../IMG path
    newContent = newContent.replace(/url\(["']?[^"')]+["']?\)/g, (m)=>{
      if(m.includes('2img-background')) return `url("${newPath.replace(/\\/g,'/')}")`;
      return m;
    });
    // replace absolute ton-site urls too
    newContent = newContent.replace(new RegExp('https://ton-site.com/IMG/2img-background/[^"\)\s]+','g'), newAbsolute);

    if(newContent !== content){
      fs.writeFileSync(filePath, newContent, 'utf8');
      updated.push({file:filePath, image:match});
    }
  });
});

console.log('Updated', updated.length, 'files');
updated.forEach(u=>console.log(u.file,'->',u.image));
