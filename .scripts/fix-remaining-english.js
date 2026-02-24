const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'HTML', '1_FUTURE_PROJECT');

// Corrections additionnelles: mots anglais -> français
const moreReplacements = {
  'orchestrating': 'orchestrant',
  ' gods': ' dieux',
  'Gods': 'Dieux',
  'weapon legendary': 'arme légendaire',
  'legendary weapon': 'arme légendaire',
  'skill prodigius': 'compétence prodigieuse',
  ' inspired ': ' inspiré ',
  'losing': 'perdant',
  'epic ': 'épique ',
  'powerful ': 'puissant ',
  'inherent ': 'inhérent ',
  ' odds': ' l\'impossible',
  'deepening': 'approfondissant',
  'honor-bound': 'lié par l\'honneur',
  'Sharp': 'Aiguisé',
  'sharp': 'aiguisé',
  'unwavering ': 'inébranlable ',
  'orchestrating': 'orchestrant',
  'cutting-edge': 'de pointe',
  'bittersweet': 'doux-amer',
  'vulnerable': 'vulnérable',
  'tenacious': 'tenace',
  'formidable': 'formidable',
  'daunting': 'intimidant',
  'relentless': 'implacable',
  'harrowing': 'glaçant',
  'enigmatic': 'énigmatique',
  'ethereal': 'éthéré',
  'melancholic': 'mélancolique',
  'vivacious': 'vivace',
  'ebullient': 'enthousiaste',
  'sagacious': 'sagace',
  'judicious': 'judicieux',
  'prudent': 'prudent',
  'stalwart': 'loyal',
  'steadfast': 'inébranlable',
  'dedicated': 'dédicacé',
  'committed': 'engagé',
  'devoted': 'dévoué',
  'indomitable': 'indomptable',
  'unconquerable': 'invincible',
  'unflinching': 'sans fléchir',
  'audacious': 'audacieux',
  'intrepid': 'intrépide',
  'valiant': 'vaillant',
  'brave': 'courageux',
  'fearless': 'sans peur',
  'courageous': 'courageux',
  'stalwart': 'robuste',
  'hardy': 'robuste',
  'resilient': 'résiliant',
  'robust': 'robuste',
  'stalwart': 'solide',
  ' for ': ' pour ',
  ' and ': ' et ',
  ' or ': ' ou ',
  ' but ': ' mais ',
  ' the ': ' le ',
};

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Apply corrections in descriptions (only inside <p> tags)
  content = content.replace(/<p>([\s\S]*?)<\/p>/g, (match) => {
    let p = match;
    Object.entries(moreReplacements).forEach(([english, french]) => {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      p = p.replace(regex, french);
    });
    return p;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log('Done!');
