const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'HTML', '1_FUTURE_PROJECT');

// Corrections: mots anglais -> français
const replacements = {
  'tatou precieux': 'atout précieux',
  'cala un regard': 'porte un regard',
  'sédutruction': 'séduction',
  'world nocturne': 'monde nocturne',
  'mundo souterrain': 'monde souterrain',
  'todos les': 'tous les',
  'transported': 'transporté',
  'ability ': 'capacité à ',
  'psychological': 'psychologique',
  ' torment': ' tourment',
  ' His ': ' Son ',
  ' Her ': ' Sa ',
  ' appearance ': ' apparence ',
  ' personality ': ' personnalité ',
  ' strength ': ' force ',
  ' combats ': ' combat ',
  'malgre ': 'malgré ',
  'possede ': 'possède ',
  ' demeanor': ' comportement',
  ' humor ': ' humour ',
  ' charm ': ' charisme ',
  ' intelligence ': ' intelligence ',
  'strategist': 'stratégiste',
  'intellect ': 'intellect ',
  'unwavering': 'inébranlable',
  'resourcefulness': 'ingéniosité',
  'compassion': 'compassion',
  'ancient': 'anciens',
  'secrets': 'secrets',
  'power ': 'puissance ',
  'growth': 'croissance',
  'immortal ': 'immortel ',
  'reckless': 'impulsif',
  'heart gold': 'cœur en or',
  'curse': 'malédiction',
  'seeks': 'cherche',
  'connection': 'connexion',
  'genuine': 'sincère',
  'loyalty': 'loyauté',
  'rendering': 'rendant',
  'mémorable': 'mémorable',
  'giant': 'géante',
  'colossal': 'colossale',
  'childlike': 'enfantin',
  'Navigating': 'Naviguant',
  'discovers': 'découvre',
  'true': 'vrai',
  'journey': 'voyage',
  'self-discovery': 'auto-découverte',
  'reaching': 'atteignant',
  'housewife': 'femme au foyer',
  'innocent': 'innocente',
  'assassin': 'assassin',
  'secrète': 'secrète',
  'maternal': 'maternel',
  'instinct': 'instinct',
  'authentique': 'authentique',
  'killer': 'tueuse',
  'élève': 'élève',
  'privilégié': 'privilégié',
  'aristocrat': 'aristocrate',
  'elite': 'élite',
  'academy': 'académie',
  'prétentieux': 'prétentieux',
  'gradually': 'progressivement',
  'accepts': 'accepte',
  'differences': 'différences',
  'redemption': 'rédemption',
  'genius': 'génie',
  'neuroscientist': 'neuroscientifique',
  'collaborating': 'collaborant',
  'detachment': 'détachement',
  'emotional': 'émotionnelle',
  'rendering': 'rendant',
  'fascinant': 'fascinant',
  ' cool': ' cool',
  'charismatic': 'charismatique',
  'devastating': 'dévastatrice',
  'boyish': 'juvénile',
  'charm': 'charisme',
  'complexity': 'complexité',
  'révélée': 'révélée',
  'progressively': 'progressivement',
  'throughout': 'tout au long',
  'série': 'série',
  'tall': 'grand',
  'imposing': 'imposant',
  'lieutenant': 'lieutenant',
  'loyal': 'loyal',
  'following': 'suivant',
  'Possédant': 'Possédant',
  'exceptional': 'exceptionnelle',
  'calm': 'calme',
  'demeanor': 'comportement',
  'authentic': 'authentique',
  'tempestuous': 'tempétueux',
  'member': 'membre',
  'surprising': 'surprenante',
  'aggressive': 'agresseur',
  'exterior': 'extérieur',
  'démontre': 'démontre',
  'care': 'soin',
  'tragedy': 'tragédie',
  'personal': 'personnelle',
  'driving': 'conduisant',
  'impact': 'impact',
  'narrative': 'narrative',
  'adolescent': 'adolescent',
  'ordinary': 'ordinaire',
  'réincarné': 'réincarné',
  'fantasy': 'fantastique',
  'Adopting': 'Adoptant',
  'shadowy': 'ombrageux',
  'persona': 'persona',
  'creates': 'crée',
  'elaborate': 'élaboré',
  'intelligence': 'intelligence',
  'network': 'réseau',
  'comedic': 'comique',
  'delusions': 'délusions',
  'versus': 'versus',
  'reality': 'réalité',
  'amusant': 'amusant',
  'artificial': 'artificiel',
  'being': 'être',
  'joining': 'rejoignant',
  'organization': 'organisation',
  'gradually': 'graduellement',
  'lesser': 'moindre',
  'prominence': 'proéminence',
  'intéressant': 'intéressant',
  'characteristics': 'caractéristiques',
  'interactions': 'interactions',
  'teammates': 'coéquipiers',
  'creating': 'créant',
  'dynamics': 'dynamiques',
  'comedic': 'comique',
  'brilliant': 'brillant',
  'discovering': 'découvrant',
  'terrible': 'terrible',
  'truth': 'vérité',
  'orphanage': 'orphelinat',
  'determination': 'détermination',
  'unwavering': 'inébranlable',
  'heart': 'cœur',
  'generous': 'généreux',
  'leads': 'mène',
  'groupe': 'groupe',
  'optimism': 'optimisme',
  'circumstances': 'circonstances',
  'horrific': 'horrifique',
  'inspirant': 'inspirant',
  'planner': 'planificateur',
  'stratégique': 'stratégique',
  'kind': 'gentil',
  'demeanor': 'comportement',
  'hides': 'cache',
  'dark': 'sombre',
  'sacrifice': 'sacrifice',
  'personal': 'personnel',
  'internal': 'interne',
  'conflict': 'conflit',
  'revealing': 'révélant',
  'maturity': 'maturité',
  'premature': 'prématurée',
  'cynical': 'cynique',
  'demeanor': 'comportement',
  'protecting': 'protégeant',
  'bomb-making': 'fabrication de bombes',
  'skills': 'compétences',
  'deductive': 'déductive',
  'ability': 'capacité',
  'contributes': 'contribue',
  'unique': 'unique',
  'family': 'familiale',
  'dynamic': 'dynamique',
  'Emma': 'Emma',
  'Norman': 'Norman',
  'nuanced': 'nuancée',
  'charismatic': 'charismatique',
  'loyal': 'loyal',
  'persistant': 'persistant',
  'Gradually': 'Progressivement',
  'understanding': 'comprenant',
  'threats': 'menaces',
  'matures': 'mûrit',
  'realizing': 'réalisant',
  'unshakeable': 'inébranlable',
  'supporting': 'soutenant',
  'cohesion': 'cohésion',
  'rejected': 'rejeté',
  'knight': 'chevalière',
  'honourable': 'honorable',
  'friend': 'amie',
  'initial': 'initial',
  'military': 'militaire',
  'expertise': 'expertise',
  'leadership': 'leadership',
  'earned': 'gagnés',
  'actions': 'actions',
  'demonstrated': 'démontrées',
  'otaku': 'otaku',
  'Shield': 'du Bouclier',
  'Falsely': 'Faussement',
  'accused': 'accusé',
  'betrayed': 'trahi',
  'rises': 's\'élève',
  'cynicism': 'cynisme',
  'justified': 'justifié',
  'humanity': 'humanité',
  'beneath': 'sous',
  'demi-humaine': 'demi-humain',
  'rachetée': 'rachetée',
  'becoming': 'devenant',
  'companion': 'compagne',
  'racoon-ear': 'oreilles de raton laveur',
  'transformation': 'transformation',
  'sword': 'épée',
  'fights': 'combat',
  'emotional': 'émotionnelle',
  'profound': 'profonde',
  'features': 'caractéristiques',
};

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Apply corrections in descriptions
  Object.entries(replacements).forEach(([english, french]) => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    content = content.replace(regex, french);
  });

  // Add characters from comments
  // Extract comment with character names
  const commentMatch = content.match(/<!-- ([^-]+) -->/);
  if (commentMatch) {
    const characterNames = commentMatch[1].split(/,\s*/).map(s => s.trim()).filter(Boolean);
    
    // Count current sections
    const currentSections = (content.match(/<section>\s*\n\s*<img/g) || []).length;
    const needToAdd = characterNames.length;

    if (needToAdd > 0 && currentSections < 7 + needToAdd) {
      // Find where to insert (before </section> of principale)
      const insertBeforePattern = /(\s*<\/section>\s*)\n\s*<aside class="sidebar">/;
      
      let newSections = '';
      for (let i = 0; i < needToAdd; i++) {
        const charName = characterNames[i];
        newSections += `
                <section>
                    <img src="../IMG/${file.replace('.html','').toLowerCase()}/${charName.toLowerCase().replace(/\s+/g,'_')}.webp" alt="${charName} - Personnage de Anime">
                    <div>
                        <h2>${charName}</h2>
                        <p>À compléter : description du personnage ${charName}.</p>
                    </div>
                </section>`;
      }

      content = content.replace(insertBeforePattern, newSections + '$1\n        <aside class="sidebar">');
      
      // Remove the comment
      content = content.replace(/\s*<!-- [^-]+ -->/g, '');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log('Done!');
