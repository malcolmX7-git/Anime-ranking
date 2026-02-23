const fs = require('fs');
const path = require('path');

const animes = [
  {
    slug: "assassination_classroom",
    name: "Assassination Classroom",
    folderImg: "assassination_classroom",
    bgImg: "assassination_classroom",
    personnages: [
      {
        nom: "Korosensei",
        image: "korosensei.jpeg",
        description: "Un mystérieux être extraterrestre jaune qui se fait exploser à la fin de l'année scolaire. Malgré sa nature destructrice, il devient un professeur aimant et dévoué, enseignant à ses élèves des leçons de vie précieuses. Son charisme et sa sagesse inspirent chaque élève à devenir meilleur, faisant de lui le plus grand héros pédagogue anime."
      },
      {
        nom: "Nagisa Shiota",
        image: "nagisa.jpeg",
        description: "Un élève calme et réfléchi avec une personnalité douce mais déterminée. Son apparence féminine cache une volonté de fer et un talent naturel pour l'assassinat. Il devient progressivement un leader charismatique, guidant ses camarades vers le succès tout en remettant en question ses propres valeurs."
      },
      {
        nom: "Karma Akabane",
        image: "karma.jpeg",
        description: "Un élève violent et malveillant à première vue, mais fils d'amis au cœur des élèves de la classe. Avec son intelligence supérieure et ses talents martials, il devient un protecteur loyal et un tatou précieux. Son arc personnel montre la transformation d'un mauvais garçon en un véritable allié."
      },
      {
        nom: "Manami Okuda",
        image: "okuda.jpeg",
        description: "Une experte en chimie dotée d'un cerveau brillant et d'une créativité inégalée. Elle crée des poisons et antidotes sophistiqués pour aider la mission d'assassinat de sa classe. Sa loyauté envers ses camarades et son génie scientifique la rendent indispensable à son groupe."
      },
      {
        nom: "Rio Nakamura",
        image: "nakamura.jpeg",
        description: "Une belle fille populaire qui cela un regard laid sur le monde extérieur. Dissimulant ses talents d'espionnage et de sédutruction, elle aide son groupe avec un charme naturel. Sa double vie entre son image publique et son vrai soi la rend captivante et mystérieuse."
      },
      {
        nom: "Tomohito Sugino",
        image: "sugino.jpeg",
        description: "Un athlète de baseball talentueux qui abandonne son rêve pour rejoindre la classe 3-E. Avec sa puissance physique exceptionnelle et sa détermination inébranlable, il devient un combattant redoutable. Son évolution montre comment accepter un nouveau chemin peut mener au vrai succès."
      },
      {
        nom: "Isogai Shouhei",
        image: "isogai.jpeg",
        description: "Le président de classe avec un charisme naturel et une intelligence stratégique. Travaillant dur pour soutenir sa famille tout en poursuivant l'assassinat, il incarne la persévérance. Son dévouement envers ses camarades et sa famille fait de lui un leader inspirant et véritable."
      }
    ]
  },
  {
    slug: "black_butler",
    name: "Black Butler",
    folderImg: "black_butler",
    bgImg: "black_butler",
    personnages: [
      {
        nom: "Sebastian Michaelis",
        image: "sebastian.jpeg",
        description: "Un démon suave et élégant serviteur du jeune comte Ciel Phantomhive. Avec ses capacités surhumaines et son devoir de serviteur fidèle, il réalise toutes les tâches difficiles sans hésitation. Sous son masque courtois se cache un être redoutable et amoral, toujours prêt à protéger son maître."
      },
      {
        nom: "Ciel Phantomhive",
        image: "ciel.jpeg",
        description: "Un jeune comte britannique portant un œil magique qui lui permet de voir l'essence des âmes. Ordonné et strict, il dirige son manoir avec une main de fer tout en cachant ses traumatismes profonds. Son contrat avec Sebastian révèle une volonté de vengeance et une détermination troublante."
      },
      {
        nom: "Grell Sutcliffe",
        image: "grell.jpeg",
        description: "Un faucheur excentrique vêtu de rouge avec une faux à chaîne. Obsédée par Sebastian, elle interfère souvent dans les affaires du manoir avec son charisme flamboyant. Sa folie meurtrière et sa loyauté contrastée font d'elle un personnage imprévisible et divertissant."
      },
      {
        nom: "Undertaker",
        image: "undertaker.jpeg",
        description: "Un croque-mort mystérieux avec une obsession pour les cadavres et les expériences revenants. Son humour macabre et ses secrets profonds le rendent insaisissable. Son lien étrange avec Ciel et Sebastian ajoute des couches de complexité à l'intrigue générale du série."
      },
      {
        nom: "Claude Faustus",
        image: "claude.jpeg",
        description: "Le serviteur démon de Alois Trancy, rivalisant avec Sebastian pour la supériorité. Froid, calcul et impitoyable, il obéit sans questionnement à son maître. Son esthétique sombre et son habileté surdéveloppée en font un antagoniste formidable face à Sebastian."
      },
      {
        nom: "Finnian",
        image: "finnian.jpeg",
        description: "Un jeune domestique enfant soldat rescapé avec une force surhumaine et une innocence déchirante. Malgré son passé brutal, il maintient sa gentillesse naturelle et sa loyauté envers le manoir. Son évolution montre la résilience de ceux qui ont subi des tragédies."
      },
      {
        nom: "Mey-Rin",
        image: "meyrin.jpeg",
        description: "Una femme de chambre maladroite cachant une identité d'ex-tueuse à gages avec une vision améliorée. Bien que clumsy au quotidien, elle révèle ses vraies compétences lors du danger. Son fiel caché sous son comportement naïf la rend fascinante et mystérieuse."
      }
    ]
  },
  {
    slug: "blue_exorcist",
    name: "Blue Exorcist",
    folderImg: "blue_exorcist",
    bgImg: "blue_exorcist",
    personnages: [
      {
        nom: "Rin Okumura",
        image: "rin.jpeg",
        description: "Un adolescent se découvrant fils du démon Satan lui-même. Avec ses crocs, sa queue bleue et ses flammes bleues, il cachait son héritage maudit. Son désir de combattre le mal aux côtés de son frère jumeau révèle sa nature courageuse et droite malgré ses origines diaboliques."
      },
      {
        nom: "Yukio Okumura",
        image: "yukio.jpeg",
        description: "Son frère jumeau moitié-humain, exorciste prodigieux porteur de lunettes bleues. Froid et méthodique, il cache ses sentiments profonds et son ressentiment. Con conflit entre l'amour fraternel et le devoir crée une tension émotionnelle palpable et fascinante."
      },
      {
        nom: "Shura",
        image: "shura.jpeg",
        description: "Une belle demi-démon gardienne avec des pouvoirs de feu et une confiance absolue en elle-même. Elle surveille Rin et Yukio pour assurer qu'ils ne deviennent pas une menace. Sensuelle et forte, elle révèle progressivement son cœur doux sous ses dehors rudes."
      },
      {
        nom: "Suguro Ryoji",
        image: "suguro.jpeg",
        description: "Un jeune exorciste au tempérament colérique, fils d'un prêtre ayant trahi l'Ordre. Ambitieux et tête brûlée, il poursuit son entraînement avec acharnement pour laver la réputation familiale. Sa détermination et son amitié dévouée en font un allié précieux."
      },
      {
        nom: "Konekomaru Miwa",
        image: "konekomaru.jpeg",
        description: "Un jeune exorciste doux et timide avec une force spirituelle sous-estimée. Bien que physiquement fragile, il possède une volonté de fer et une compassion remarquable. Son amitié avec Rin montre la valeur de ceux qui doivent surmonter leurs peurs."
      },
      {
        nom: "Renzou Shima",
        image: "renzou.jpeg",
        description: "Un prêtre gentil et frivole prenant l'entraînement d'exorciste avec légèreté. Cachant de sombres secrets sous son sourire chaleureux, il révèle progressivement sa complexité. Sa dualité entre sa nature joyeuse et son passe brouillé le rend profondément intéressant."
      },
      {
        nom: "Izumo Kamiki",
        image: "izumo.jpeg",
        description: "Une jeune exorciste arrogante et fière, issue d'une riche famille de prêtres shintoïstes. Avec ses talismans puissants et sa personnalité en tête froide, elle maîtrise ses émotions. Son caractère difficile cache une loyauté secrète envers son groupe."
      }
    ]
  },
  {
    slug: "bungo_stray_dog",
    name: "Bungo Stray Dogs",
    folderImg: "bungo_stray_dog",
    bgImg: "bungo_stray_dog",
    personnages: [
      {
        nom: "Atsushi Nakajima",
        image: "atsushi.jpeg",
        description: "Un jeune orphelin sans abri découvrant un pouvoir de transformation en tigre blanc. Ayant tout perdu, il rejoint l'Agence de Détective pour trouver sa place. Son naïveté initiale cache une détermination de fer et une volonté de changer son destin."
      },
      {
        nom: "Osamu Dazai",
        image: "dazai.jpeg",
        description: "Un détective génial mais morbide cherchant constamment un 'suicide douillet'. Avec son intelligence surhumaine et ses yeux qui le rendent psychiquement invulnérable, il manipule les événements des coulisses. Sa folie masquée et son charme le rendent imprévisible et dangereux."
      },
      {
        nom: "Doppo Kunikida",
        image: "kunikida.jpeg",
        description: "Un détective idéaliste guidé par ses notebooks de l'idéal absolu. Avec ses capacités de programmation de la réalité, il essaie de maintenir l'ordre moral face au chaos. Son rigidité et son attachement aux principes le rendent touchant malgré ses frustrations."
      },
      {
        nom: "Akiko Yosano",
        image: "yosano.jpeg",
        description: "Une médecin pacifiste avec un pouvoir sadique de guérison qui cause d'abord la douleur. Masquant son passé traumatique derrière un sourire bienveillant, elle soigne physiquement et émotionnellement son équipe. Sa dualité crée une tension fascinante."
      },
      {
        nom: "Junichiro Tanizaki",
        image: "tanizaki.jpeg",
        description: "Un détective charmant avec un pouvoir d'illusion changeant les sens de la réalité. Bien qu'en apparence superficiel, il cache une compétence martiale impressionnante. Son charme naturel et son dévouement envers son collègue Naomi le rendent attachant."
      },
      {
        nom: "Ranpo Edogawa",
        image: "ranpo.jpeg",
        description: "Un génie détective avec un QI surhumain et le pouvoir de résoudre n'importe quel mystère en un coup d'œil. Portant des lunettes de déduction, il offre analyses brillantes avec confiance provocatrice. Sa naïveté instinctale contraste avec son intelligence exceptionnelle."
      },
      {
        nom: "Yukichi Fukuzawa",
        image: "fukuzawa.jpeg",
        description: "Le directeur calme et sage de l'Agence avec les talents de sabre un redoutable. Portant la responsabilité de protéger ses hommes, il démontre une force tranquille. Son passé de guerrier révèle une philosophie profonde et un cœur noble."
      }
    ]
  },
  {
    slug: "call_of_night",
    name: "Call of the Night",
    folderImg: "call_of_night",
    bgImg: "call_of_night",
    personnages: [
      {
        nom: "Kou Yamori",
        image: "kou.jpeg",
        description: "Un adolescent insomnique cherchant une raison de vivre en errant la nuit. Sa résilience face à l'épuisement émotionnel et son curiosité pour la vie nocturne révèlent une profondeur inattendue. Sa quête d'une raison d'exister crée une connexion palpable avec le spectateur."
      },
      {
        nom: "Nazuna Nanakusa",
        image: "nazuna.jpeg",
        description: "Une vampire jolie et mystérieuse qui subsiste en récoltant des gouttes de sang. Avec sa nature insouciante et sa séduction naturelle, elle cache une profonde solitude. Son charisme nocturne et son humour cynique la rendent captivante et énigmatique."
      },
      {
        nom: "Anju Sakura",
        image: "anju.jpeg",
        description: "Une jeune femme humaine mais avec le secret d'un passé troublant partagé avec Nazuna. Mystérieuse et complexe, elle guide Kou dans les mondes souterrains. Son dévouement envers Nazuna révèle les liens profonds au-delà des frontières humaines-vampires."
      },
      {
        nom: "Kaido Tetsuhito",
        image: "kaido.jpeg",
        description: "Un ami proche de Kou avec une personnalité joyeuse contrastant avec la mélancolie de notre protagoniste. Son innocence et son support sans condition montrent la valeur de true friendship. Bien que mineur, son rôle ancre les émotions du groupe."
      },
      {
        nom: "Yuki Tokiwa",
        image: "yuki.jpeg",
        description: "Une vampire ancienne avec une apparence jeunette mais une sagesse millénaire. Observant Kou et Nazuna depuis l'ombre, elle incarne l'amour parental protecteur. Son existence silencieuse et son intervention subtile guident les événements de manière méticuleuse."
      },
      {
        nom: "Hirayama Seri",
        image: "hirayama.jpeg",
        description: "Une compagnie de nuit bienveillante travaillant dans un conbini la nuit. Bien que basique, elle représente la chaleur ordinaire de la vie nocturne humaine. Son attention constante envers Kou montre la beauté des connections fugaces."
      },
      {
        nom: "Akiman Nakao",
        image: "akiman.jpeg",
        description: "Un vampire noir avec des pouvoirs sombres et une personnalité menaçante. Représentant le danger de cette world nocturne, il crée tension et suspense. Son existence révèle que pas todos les vampires partagent la douceur de Nazuna."
      }
    ]
  },
  {
    slug: "chainsaw_man",
    name: "Chainsaw Man",
    folderImg: "chainsaw_man",
    bgImg: "chainsaw_man",
    personnages: [
      {
        nom: "Denji",
        image: "denji.jpeg",
        description: "Un adolescent endeuillé qui fusionne dengan Pochita, transformant son corps en tronçonneuse vivante. Cherchant la vengeance contre les démons qui ont tué son père, il rejoint une agence gouvernementale. Son combinaison d'innocence et de barbarie crée une contradiction captivante."
      },
      {
        nom: "Makima",
        image: "makima.jpeg",
        description: "Une femme mystérieuse belle et puissante chargée de commander Denji. Avec ses cheveux rouges et ses yeux vides d'émotion, elle cache des secrets redoutables. Son manipulation psychologique et sa nature sombre la rendent terrifiante et magnétique."
      },
      {
        nom: "Aki Hayakawa",
        image: "aki.jpeg",
        description: "Un jeune homme froid et stoïque aspirant à devenir plus puissant que les démons. Cohabitant avec Denji et Power, il maintient une distance émotionnelle. Son arc révèle une profonde vulnérabilité derrière sa façade rigide."
      },
      {
        nom: "Power",
        image: "power.jpeg",
        description: "Une démon femelle mi-humaine avec une faine extrême et un tempérament enfantin. Initalement ennemie de Denji, elle devient sa colocataire et alliée. Son absurdité comique contrastant sa puissance destructrice crée un équilibre dynamique divertissant."
      },
      {
        nom: "Angel Devil",
        image: "angel.jpeg",
        description: "Un démon au cœur bienveillant transformé par gentillesse humaine. Avec ses ailes blanches et son tempérament pacifier, il représente l'espoir au sein du chaos. Son sacrifice ultime montre la beauté de choisir l'humanité."
      },
      {
        nom: "Himeno",
        image: "himeno.jpeg",
        description: "Une chasseuse de démon expérimentée avec charm charismatique et un passé tourmenté. Protectrice et chaleureuse envers son groupe, elle cache une fragilité. Son rôle maternel crée des moments de tendresse dans ce monde brutal."
      },
      {
        nom: "Pochita",
        image: "pochita.jpeg",
        description: "Un petit démon tronçonneuse innocent ayant sacrfié son cœur pour ressusciter Denji. Malgré son apparence chibi adorable, c'est une force destructrice cosmique. Son lien avec Denji transcende toute logique et donne du sens à l'existence duprotagoniste."
      }
    ]
  },
  {
    slug: "cyberpunk_edgurunner",
    name: "Cyberpunk: Edgerunners",
    folderImg: "cyberpunk_edgurunner",
    bgImg: "cyberpunk_edgurunner",
    personnages: [
      {
        nom: "David Martinez",
        image: "david.jpeg",
        description: "Un adolescent street kid cherchant l'assendance sociale dans un monde cyberpunk corrompu. Aspirant à devenir edgerunner, il accumule les implants cybernetiques malgré les risques. Sa quête naïve du succès révèle la tragédie de ceux pris au piège dans le système."
      },
      {
        nom: "Lucy",
        image: "lucy.jpeg",
        description: "Une femme mystérieuse avec un implant spécial lui permettant l'espionnage mental et la manipulation. Devenant le compagnon et amour de David, elle cache des secrets gouvernementaux troublants. Sa vulnérabilité émotionnelle contraste avec sa puissance cybernetique."
      },
      {
        nom: "Maine",
        image: "maine.jpeg",
        description: "Un leader charismatique de gang edgerunner avec des augmentations militaires imposantes. Avec son attitude cool et son code moral flexible, il dirige sa bande vers l'infâmie. Son camaraderie avec David établit une dynamique père-fils décalée."
      },
      {
        nom: "Kiwi",
        image: "kiwi.jpeg",
        description: "Une femme intrépide et sensuelle avec des implants félins contribuant à son agilité surhumaine. Travaillant comme mercenaire et broker d'informations, elle jongle entre loyauté et profit. Son dynamique avec le groupe ajoute une tension flirteuse."
      },
      {
        nom: "Pilar",
        image: "pilar.jpeg",
        description: "Un technicien doué effectuant implants dangereux et modifications cybernetiques pour le groupe. Avec son humour morbide et passion pour son craft, il maintient les edgerunners fonctionnels. Sa familiarité avec la mort en fait un sage philosophe inattendu."
      },
      {
        nom: "Misty",
        image: "misty.jpeg",
        description: "Un vétéran edgerunner chevronné avec une apparence imposante et calme stoïque. Son expérience et sa sagesse guident le groupe et David comme figure mentor. Protecteur mais distant, il représente le coût du succès dans ce monde."
      },
      {
        nom: "Vik Vector",
        image: "vik.jpeg",
        description: "Un fixer noir avec des connexions illimitées dans le monde souterrain cyberpunk. Fournisseur de jobs et d'implants, il maintient une relation transactionnelle mais pas sans chaleur. Son détachement professionnel cache une compréhension profonde du jeu cyberpunk."
      }
    ]
  },
  {
    slug: "dr.stone",
    name: "Dr. Stone",
    folderImg: "dr_stone",
    bgImg: "dr_stone",
    personnages: [
      {
        nom: "Senku Ishigami",
        image: "senku.jpeg",
        description: "Un scientifique prodige réveillé des millénaires after humanity est enpetrified. Avec son intellect incomparable et sa passion pour la science, il révolutionne le monde de pierre. Malgré son obsession scientifique, son cœur contient une profonde humanité."
      },
      {
        nom: "Taiju Oki",
        image: "taiju.jpeg",
        description: "Un adolescent fort et gentil doté d'une force physique surhumaine et d'optimisme invincible. Complément parfait au génie scientifique de Senku, il materialise les visions. Son naïveté touchante et sa dignité font de lui le cœur émotionnel du groupe."
      },
      {
        nom: "Yuzuriha Ogawa",
        image: "yuzuriha.jpeg",
        description: "Une jeune femme intelligente et capable développant des techniques agricoles innovantes. Partenaire loyale de Taiju, elle apporte sensibilité émotionnelle et sagesse pratique. Son rôle d'équilibre entre science et humanité est crucial."
      },
      {
        nom: "Chrome",
        image: "chrome.jpeg",
        description: "Une jeune femme scientifique autodidacte ayant développé des techniques chimiques avant la dépétrification massive. Curieuse et aventureuse, elle devient rapidement précieuse pour l'équipe. Son innocence mélangé à sa brillance crée un charme irrésistible."
      },
      {
        nom: "Kohaku",
        image: "kohaku.jpeg",
        description: "Une guerrière puissante de la montagne avec une force surhumaine et habileté au combat. Initialement opposée à la science, elle accepte progressivement son valeur. Son transformation de guerrière sauvage à scientifique apprentie montre la plasticité humaine."
      },
      {
        nom: "Ginro",
        image: "ginro.jpeg",
        description: "Un guerrier lâche mais capable avec un charisme charming et une personnalité comique. Malgré ses défauts, ses contributions technologiques sont précieuses. Son humour et sa croissance personnelle le rendent attachant."
      },
      {
        nom: "Suika",
        image: "suika.jpeg",
        description: "Une jeune fille intelligente et aimante avec une condition rare affectant sa vision. Cherchant une place dans l'équipe scientifique, elle développe des lunettes innovantes. Sa détermination malgré ses limitations inspire tous autour d'elle."
      }
    ]
  },
  {
    slug: "fairy_tail",
    name: "Fairy Tail",
    folderImg: "fairy_tail",
    bgImg: "fairy_tail",
    personnages: [
      {
        nom: "Natsu Dragneel",
        image: "natsu.jpeg",
        description: "Un adolescent écarlate avec le pouvoir de la magie du feu de dragon. Cherchant son père dragon Igneel, il joint la guilde Fairy Tail comme famille de substitution. Son tempérament combattant et coeur chaleureux font de lui l'âme du groupe."
      },
      {
        nom: "Lucy Heartfilia",
        image: "lucy.jpeg",
        description: "Une mage de constellations beauté héritière d'une riche famille noble. Fuyant sa maison restrictive, elle cherche la liberté avec Fairy Tail. Son évolution d'héritière naïve à mage puissante crée un arc inspirant."
      },
      {
        nom: "Gray Fullbuster",
        image: "gray.jpeg",
        description: "Un mage de glace cool aux muscles impressionnants et l'habitude étrange de se démêtir. Compétiteur naturel avec Natsu, leur chimie comique contraste profond. Sous son apparence Détendue se cache une past sombre et détermination inébranlable."
      },
      {
        nom: "Erza Scarlet",
        image: "erza.jpeg",
        description: "Une guerrière redoutable capable d'équiper différentes armures magiques en un instant. Avec ses cheveux rouges flamboyants et Sa volonté d'acier, elle devient leader naturaliste. Son passé esclavagiste révèle une résilience et un courage extraordinaires."
      },
      {
        nom: "Wendy Marvell",
        image: "wendy.jpeg",
        description: "Une jeune mage du vent de dragon avec apprenance rapide et personnalité douce. Initialement timide et réservée, elle croît pour dévenire membre forte et confiante. Son innocence protégée par son groupe montre la valeur de la famille de choix."
      },
      {
        nom: "Happy",
        image: "happy.jpeg",
        description: "Un chat bleu magique avec des ailes féée ne pouvant pas voler malgré ses efforts. Compagnon loyal de Natsu, ses observations comiques et soutien émotionnel sont priceless. Son «aye» emblématique et naïveté le rendent attachant."
      },
      {
        nom: "Laxus Dreyar",
        image: "laxus.jpeg",
        description: "Un mage de tonnerre puissant et slave de la guilde avec une personnalité originellement arrogante. Son arc redemption montre un coeur capable du vrai changement. Protecteur de sa guilde, il révèle une fierté mal placée cachant l'insécurité."
      }
    ]
  },
  {
    slug: "fire_force",
    name: "Fire Force",
    folderImg: "fire_force",
    bgImg: "fire_force",
    personnages: [
      {
        nom: "Shinra Kusakabe",
        image: "shinra.jpeg",
        description: "Un jeune pompier avec la capacité à igniter ses pieds générant une chaleur extrême. Souriant malgré des traumatismes d'enfance, il cherche vérité derrière l'ordre religieux. Son détermination joyeuse et expertise au combat en font un héros authentique."
      },
      {
        nom: "Arthur Boyle",
        image: "arthur.jpeg",
        description: "Un pompier aristocratique prétentieux avec une épée plasma fantaisiste. Initialement rival de Shinra, il devient camarade lealen dévouement croissant. Son arc d'humanité et confiance brisée crée une profondeur inattendue."
      },
      {
        nom: "Tamaki Kotatsu",
        image: "tamaki.jpeg",
        description: "Une pompière intrépide avec un mauvais chance pouvant paralyser temporairement les hommes. Malgré sa malchance constante, elle montre courage sans compromis. Son persévérance malgré les défis crée un personnage inspirant et drôle."
      },
      {
        nom: "Joker",
        image: "joker.jpeg",
        description: "Un agent mystérieux masqué travaillant dans l'ombre des structures societales. Avec rire érrant et intelligence supérieure, il guide les événements des coulisses. Sa moralité ambiguë et motivations cachées le rendent compliqué et captivant."
      },
      {
        nom: "Princess Hibana",
        image: "hibana.jpeg",
        description: "Une commandant pompier absolue avec traitement inhumain de ses subordonnés. Révélant progressivement sa vulnérabilité, elle questionne l'ordre établi. Son croissance personnelle montrant redemption possible produit un arc mémorable."
      },
      {
        nom: "Obi",
        image: "obi.jpeg",
        description: "Un lieutenant pompier robuste et loyal servant Shinra et sa compagnie. Avec son attitude directe et soutien sans faille, il représente solidité. Son amitié fidèle et sage conseil en font un ancrage du groupe."
      },
      {
        nom: "Maki Oze",
        image: "maki.jpeg",
        description: "Une pompière musculaire avec pouvoirs de renforcement corporel et personnalité amicale. Initialement perçue comme tough, elle cache une feminité délicate. Sa dualité créant profondeur et son humor charmant la rendent mémorable."
      }
    ]
  },
  {
    slug: "free",
    name: "Free!",
    folderImg: "free",
    bgImg: "free",
    personnages: [
      {
        nom: "Haruka Nanase",
        image: "haruka.jpeg",
        description: "Un nageur talentueux avec une passion absolue pour l'eau et le freestyle. Solitaire par nature, il cultive des amitié fortes malgré sa réticence initiale. Son amour pour la natation surpasse toute ambition scolaire, révélant une authenticité profonde."
      },
      {
        nom: "Makoto Tachibana",
        image: "makoto.jpeg",
        description: "Un homosexuel chaleureuse humain actusateur du club nageurs avec lyrisme protecteur. Ami loyal de Haruka, il encourage sa croissance malgré ses limitations. Son compassion patiencia et understanding font de lui un cœur émotionnel du groupe."
      },
      {
        nom: "Rin Matsuoka",
        image: "rin.jpeg",
        description: "Un rival initial devenant allié dans récit. Élevé à l'étranger, il return au Japon avec attitude dominante. Son struggle personnel entre individualité et conformité societale crée tension émotionelle palpable."
      },
      {
        nom: "Nagisa Hazuki",
        image: "nagisa.jpeg",
        description: "Un adolescent expressif enthousiaste avec dévouement touchant au club natation. Malgré manque initial de talent, il développe potentiel impressionnan travers persistance. Son positivité contagieuse équilibre personnalités plus réservées."
      },
      {
        nom: "Rei Ryugazaki",
        image: "rei.jpeg",
        description: "Un nageur studieux perfectionniste obsédé par technique et analyse. Initialement solitaire, il découvre la valeur du teamwork et camaraderie. Son évolution personnelle montre l'importance de connexion humaine au-delà compétition."
      },
      {
        nom: "Sosuke Yamazaki",
        image: "sosuke.jpeg",
        description: "Un nageur populaire et aimable masquant insécurités profondes. Son relationship complexe avec Rin crée tension dynamique au groupe. Malgré aparence détendue, il lutte avec problèmes graves d'identité."
      },
      {
        nom: "Goro Sasabe",
        image: "goro.jpeg",
        description: "Un coach empathique déterminé à motiver ses nageurs. Avec wisdom bienveillante et patience, il guide le groupe trajectoire personnelle. Son soutien inconditionnel montre impact d'un mentor positif."
      }
    ]
  },
  {
    slug: "gachiakuta",
    name: "Gachiakuta",
    folderImg: "gachiakuta",
    bgImg: "gachiakuta",
    personnages: [
      {
        nom: "Rudo Kamanchi",
        image: "rudo.jpeg",
        description: "Un adolescent ordinaire tombant d'un immeuble et réveillé dans dimension d'ordures souterraine. Avec bras transformé en outil multi-fonction, il doit survivre. Son adaptation remarquable et détermination révèlent résilience cachée."
      },
      {
        nom: "Panda-san",
        image: "panda.jpeg",
        description: "Une créature géante ressemblant à panda devenant mentor et protecteur de Rudo. Avec force surhumaine et sagesse tempérée, il guidé protagoniste. Son gentillesse paradoxale contrastant nature brutale crée dynamique attachante."
      },
      {
        nom: "The Cleaner",
        image: "cleaner.jpeg",
        description: "Une figure mystérieuse dominante représentant ordre et hierarchy. Avec autorité absolue sur ordures souterraines, elle maitrise le realm. Son motif cachée et croissance progressive la rendent complexe antagoniste."
      },
      {
        nom: "Pattinson",
        image: "pattinson.jpeg",
        description: "Un habitant ordures sociopath avec instincts meurtriers et manque d'empathie. Antagoniste personnel de Rudo, il représente chaos intestin. Son imprévisibilité constante crée tension et menace réelle."
      },
      {
        nom: "Mung",
        image: "mung.jpeg",
        description: "Un habitant ordures avec intelligencextra-ordinary malgré apparence répugnante. Proposent aide inattendue à Rudo à plusieurs reprises. Sa nature ambigué et motifs cryptiques le rendent intrigue constant."
      },
      {
        nom: "Blue",
        image: "blue.jpeg",
        description: "Une femme mystérieuse aux transformations corporelles extrêmes et pouvoirs mystérieux. Relationship complexe avec Rudo révèle layers de profondeur. Son passé tragique et capacity sacrifice montrent humanité souterraine."
      },
      {
        nom: "Crumble",
        image: "crumble.jpeg",
        description: "Un creature ressemblant débris vivant avec personnalité étrange et communication limitée. Malgre limitations, il contribue aventures Rudo significativement. Sa innocent malchance crée moments comic relief et émotionnel."
      }
    ]
  },
  {
    slug: "gintama",
    name: "Gintama",
    folderImg: "gintama",
    bgImg: "gintama",
    personnages: [
      {
        nom: "Gintoki Sakata",
        image: "gintoki.jpeg",
        description: "Un samouraï fainéant affectueux aux cheveux blancs et obsession pour le sucre. Malgré apparence désabusée, il démontre sagesse et compétences martiales terrifiantes. Son résilience émotionnel et humor morbide font cœur étrange de cette serie."
      },
      {
        nom: "Shinpachi Shimura",
        image: "shinpachi.jpeg",
        description: "Un adolescent maladroit mais courageux servant comme assistant Gintoki. Avec enthousiasme contagieux et naïveté, il equilibre pessimisme du groupe. Son growth steady depuis pauvre swordsman à warrior capable crée arc satisfactioniste."
      },
      {
        nom: "Kagura",
        image: "kagura.jpeg",
        description: "Une alien puissante avec apétit énorme et force réelle. Initialement antagoniste, elle devient precieuse membres famille. Son dualité entre innocence childish et destructive capacity la rendent imprévisible et divertissante."
      },
      {
        nom: "Tatsuko Hijikata",
        image: "hijikata.jpeg",
        description: "Un commandant policier strict avec fascination sadique et personnalité complexe. Respecté par ses subordonnés malgré comportement violent, il montre loyalty profonde. Son arc révèle vulnerabilité masquée sous rigidité."
      },
      {
        nom: "Isao Kondo",
        image: "kondo.jpeg",
        description: "Un capitaine police charismatique avec charme naturel et obsession suspecte. Malgré comportement perverse, il démontre courage et sagesse situación critique. Son humor sarcastic et affection bizarr rendant memorable."
      },
      {
        nom: "Taizo Hasegawa",
        image: "hasegawa.jpeg",
        description: "Un politicien corrompu devenant ami bizarre de Gintoki malgré contexts opposed. Avec schemes constantes et ambitions mal placées, iladmet néanmoins affection sincère. Son character absurdité crée comic relief regretful."
      },
      {
        nom: "Kiheitachi Okita",
        image: "okita.jpeg",
        description: "Un jeune officier police talentueux avec sadism délibéré et charm superficiel. Cachant blessures profondes sous smile, il démontre vulnerability rare. Ses dualité et potential redemption rendant fascinating étude charactere."
      }
    ]
  },
  {
    slug: "konosuba",
    name: "Konosuba",
    folderImg: "konosuba",
    bgImg: "konosuba",
    personnages: [
      {
        nom: "Kazuma Satou",
        image: "kazuma.jpeg",
        description: "Un adolescent ordinaire tué accidentellement et réincarné dans monde fantasy. Avec stratégie pragmatique et absence moralité stricte, il survive. Son humor morbide et pragmatisme contraste idéalisme typical fantasy adventures."
      },
      {
        nom: "Aqua",
        image: "aqua.jpeg",
        description: "Une déesse voluptueuse stupide mais puissante cantonnée ressusciter Kazuma. Avec tendance créer chaos et affection inattendue, elle crée constant headaches. Son naïveté divine et impulsivité rendent divertissante folle."
      },
      {
        nom: "Megumin",
        image: "megumin.jpeg",
        description: "Une jeune magicienne obsédée explosion magical et personnalité chuunibyou. Naïve et sans sens tactique, elle relève continuellement groupe en difficult. Son charm innocent combien avec power térrifiante crée dynamique amusant."
      },
      {
        nom: "Lalatina Darkness",
        image: "darkness.jpeg",
        description: "Un noble knight masochiste cherchant pure love tout en révélant perversites. Avec strength physique improv mais tactical incompétence, elle comique relief frustrant. Son evolution charac montrant growth emotionnel rend attachante."
      },
      {
        nom: "Worser",
        image: "worser.jpeg",
        description: "Un roi demon redoutable et villain aparrant peu mais impactant gravement. Avec puissance cosmique et plans mondiaux, il reste menace constant. Son rare appearances créant tension et stakes réels seria."
      },
      {
        nom: "Hans",
        image: "hans.jpeg",
        description: "Un mage supportive competent et reasonable contrasting group dysfunction. Avec loyalty quiet et skill genuine, il stabilize team chaos. Son presence grounding monter appreciation soutien steadfast."
      },
      {
        nom: "Lia",
        image: "lia.jpeg",
        description: "Une priestess compassionate et utile supportant party plusieurs quests. Malgré capabilities limitées, elle montre determination constant. Son affection sincère party membres rendant sweet anchor emotional series."
      }
    ]
  },
  {
    slug: "moi_quand_je_me_reincarne_en_slime",
    name: "Moi Quand Je Me Réincarne En Slime",
    folderImg: "moi_quand_je_me_reincarne_en_slime",
    bgImg: "moi_quand_je_me_reincarne_en_slime",
    personnages: [
      {
        nom: "Rimuru Tempest",
        image: "rimuru.jpeg",
        description: "Un homme ordinaire réincarné comme slime avec pouvoirs extraordinaires. Adoptant femelle personality, il établit nation monstres. His strategic mind et compassion innattu créent unique approach leadership."
      },
      {
        nom: "Milim Nava",
        image: "milim.jpeg",
        description: "Un demon lord enfantin avec puissance cataclysmisk et affection ludique. Devenant ami Rimuru, elle apporte chaos joyeux. Her duality entre enfance et destructive capacity crée dynamic fascinante."
      },
      {
        nom: "Veldora Tempest",
        image: "veldora.jpeg",
        description: "Un dragon ancien puissant initialement emprisonné devenant allié Rimuru. Avec personality enfantin malgré age cosmique, il apporte wisdom. His loyalty genuine et protection fierce rendent précieux allie."
      },
      {
        nom: "Ramiris",
        image: "ramiris.jpeg",
        description: "Un demon lord apprenticed apparant enfantine mais ancient truly. Devenant alie Rimuru, elle contribue strategies et support. Her appearance trompeuse et genuine friendship rendre touchante."
      },
      {
        nom: "Shion",
        image: "shion.jpeg",
        description: "Un ogre devenant lieutenant Rimuru avec loyauté absolue. Malgré manque sens pratique, elle compense avec dévouement. Her obsessive affection comique montre depth émotionnel possiblement."
      },
      {
        nom: "Benimaru",
        image: "benimaru.jpeg",
        description: "Un ogre leader devenant subordonnée clef Rimuru. Avec courage indomitable et pride martial, il equilibre team. His respect grudging croissance montre personality layered."
      },
      {
        nom: "Diablo",
        image: "diablo.jpeg",
        description: "Un demon noir powerful swearing loyalty Rimuru après summoning. Avec silhouette imposante et intelligence mystérieuse, il inspire reverence. His devotion absolute et skill supreme rendant invaluable ally."
      }
    ]
  },
  {
    slug: "re_zero",
    name: "Re:Zero",
    folderImg: "re_zero",
    bgImg: "re_zero",
    personnages: [
      {
        nom: "Subaru Natsuki",
        image: "subaru.jpeg",
        description: "Un adolescent japonais transported dans monde fantasy avec pouvoir temporel. Avec ability revenir time après mort, il subit psychological torment. His determination malgre trauma montrant human resilience remarkable."
      },
      {
        nom: "Emilia",
        image: "emilia.jpeg",
        description: "Une half-elf candidat royale avec kindness genuine et innocence naïve. Devenant amour Subaru, elle lui donne purpose. Her vulnerability revealed progressively contrasting initial strength extérieure."
      },
      {
        nom: "Rem",
        image: "rem.jpeg",
        description: "Un demon bleu servante avec affection obsessive envers Subaru. Malgré trauma passéal, elle démontre strength and valor. Her devotion transcendant raison créant dynamic emotionally complex."
      },
      {
        nom: "Ram",
        image: "ram.jpeg",
        description: "La sœur jumelle Rem avec personnalité froide et intellect sharp. Malgré détachement apparent, elle cache affection sincère. Her duality créant mystère et intrigue constant."
      },
      {
        nom: "Puck",
        image: "puck.jpeg",
        description: "Un charactère apparent enfantine avec puissance cachée cosmique. Servant Emilia loyalment, il cache ancient nature. His appearance trompeuse et genuine wisdom rendre fascimant archetype."
      },
      {
        nom: "Roswaal L. Mathers",
        image: "roswaal.jpeg",
        description: "Un mage eccentrique puissant avec habits flamboyants et personnalité bizarre. Employant Emilia, il démontre loyalty misplaced combiné avec actual competence. His странный humor et fashion sense memorable."
      },
      {
        nom: "Beatrice",
        image: "beatrice.jpeg",
        description: "Un spirit de bibliothèque prim avec personality snobby initially. Devenant alliée Subaru, elle révèle affection sincère. Her character arc montrant soften malgre pride initial touchante."
      }
    ]
  },
  {
    slug: "record_of_ragnarok",
    name: "Record of Ragnarok",
    folderImg: "record_of_ragnarok",
    bgImg: "record_of_ragnarok",
    personnages: [
      {
        nom: "Brunhilde",
        image: "brunhilde.jpeg",
        description: "Une valkyrie strategist orchestrating humanity's defense contre gods. Avec sharp intellect et unwavering determination, elle combats odds. Her resourcefulness et compassion malgre cynicism touching."
      },
      {
        nom: "Sasaki Kojirou",
        image: "sasaki.jpeg",
        description: "Un samouraï humain premier combattant humain contre gods. Avec weapon legendary et skill prodigius, il inspired hope. His noble death montrant dignity gagnant respect même losing."
      },
      {
        nom: "Adam",
        image: "adam.jpeg",
        description: "Le pater humain affrontant Zeus dans epic battle. Avec powerful physique et inherent courage, il défie odds. His tragedy personnelle révélée progressively deepening emotional impact."
      },
      {
        nom: "Kojiro Sasaki",
        image: "kojiro2.jpeg",
        description: "Un guerrier légendaire avec technique exceptional et personality honor-bound. Sa duel avec opponent divin créant moments marquants. His legacy combattant transcendant victoire finale."
      },
      {
        nom: "Round 3 Champion",
        image: "champion3.jpeg",
        description: "Un combattant formidable defended humanity's future avec ferocity. Avec puissance impressionante et determination absolue, il inspired millions. His contribution humanity's cause monumental."
      },
      {
        nom: "Tesseract",
        image: "tesseract.jpeg",
        description: "Un adversaire mystérieuse combating human representative. Avec pouvoirs énigmatiques et intentions cryptiques, ilengage battle épique. His character adding layers mystère série."
      },
      {
        nom: "Völundr",
        image: "volundr.jpeg",
        description: "Une legendary figure apparaissant throughout narrative. Avec sagesse ancient et influence pervasive, elle guide events. Her role divine dans ragnarok crucial pour understanding"
      }
    ]
  },
  {
    slug: "seven_deadly_sins",
    name: "Seven Deadly Sins",
    folderImg: "seven_deadly_sins",
    bgImg: "seven_deadly_sins",
    personnages: [
      {
        nom: "Meliodas",
        image: "meliodas.jpeg",
        description: "Un demon lord déchu avec affection sincère et power redoutable. Leading Seven Deadly Sins guild, il cache ancient secrets. His growth émotionnel malgre tragic past monumentale."
      },
      {
        nom: "Elizabeth",
        image: "elizabeth.jpeg",
        description: "Une princesse spirituelle avec innocence profound et hidden strength. Son connection Meliodas transcendant lifetimes separating them. Her devotion absolute créant romantic centerpoint série."
      },
      {
        nom: "Ban",
        image: "ban.jpeg",
        description: "Un immortal thief avec personality reckless et heart gold. Malgre immortalité curse, il seeks connection genuine. His loyalty party et love Jericho rendering mémorable."
      },
      {
        nom: "Diane",
        image: "diane.jpeg",
        description: "Un giant warrior avec strength colossal et personality childlike. Navigating feelings toward King, elle discovers identity true. Her journey self-discovery touching malgre power."
      },
      {
        nom: "Gowther",
        image: "gowther.jpeg",
        description: "Un doll magical learning humanité gradually through experiences. Possédant mysterious magic et innocent curiosity, il surprises constantly. His unique perspective enriching group dynamics."
      },
      {
        nom: "Merlin",
        image: "merlin.jpeg",
        description: "Une mage brillante avec intellect unmatched et motivations ambiguous. Cachant secrets profondes, elle manipulates events subtly. Her role complex creating tension philosophical constant."
      },
      {
        nom: "Escanor",
        image: "escanor.jpeg",
        description: "Nain warrior transforming drastically during daylight hours. Contrasting fragility nuit avec immense power jour, creating duality dramatic. His character arc touching révélant humanity profound."
      }
    ]
  },
  {
    slug: "spy_x_familly",
    name: "Spy x Family",
    folderImg: "spy_x_familly",
    bgImg: "spy_x_familly",
    personnages: [
      {
        nom: "Twilight",
        image: "twilight.jpeg",
        description: "Un spy professionnal créant fake family para mission. Despite cynicism professional, il découvre genuine love développing. His conflict personnel vs mission créant emotional core série."
      },
      {
        nom: "Yor Forger",
        image: "yor.jpeg",
        description: "Une assassin secrète posant comme housewife innocent. Malgre dangerous profession, elle démontre maternal instinct authentique. Her duality entre killer et mère poignant."
      },
      {
        nom: "Anya Forger",
        image: "anya.jpeg",
        description: "Une enfant telepath joinant fake family unknowingly. Avec age young et power extraordinary, elle impacts todos around. Her innocent mischief et genuine wisdom touching."
      },
      {
        nom: "Loid Forger",
        image: "loid.jpeg",
        description: "L'identité cover Twilight posant comme psychiatrist ordinaire. Creating facade normal life, il struggles authenticity. His internal conflict richement depicted throughout série."
      },
      {
        nom: "Damian Desmond",
        image: "damian.jpeg",
        description: "Un élève privilégié aristocrat from elite academy. Initially pretentious, il gradually accepts Anya malgre differences. His character growth montrant potential redemption."
      },
      {
        nom: "Becky Blackbell",
        image: "becky.jpeg",
        description: "Une héritière riche avec personality eccentric et heart genuine. Becoming ally Anya, elle provides comic relief constant. Her loyalty devoted dépit différences sociales."
      },
      {
        nom: "Franky Franklin",
        image: "franky.jpeg",
        description: "Un support agent pour Twilight providing assistance crucial. Avec competence professional et eccentric personality, il balances sérieux. His friendship Twilight adding depth humain."
      }
    ]
  },
  {
    slug: "steins_gate",
    name: "Steins;Gate",
    folderImg: "steins_gate",
    bgImg: "steins_gate",
    personnages: [
      {
        nom: "Rintarou Okabe",
        image: "okabe.jpeg",
        description: "Un scientist amateur obsédé time travel et conspiracies. Découvrant capable sending messages passé, il assumes grandeur. His paranoia initiale revealing valid ultimately when realities collide."
      },
      {
        nom: "Makise Kurisu",
        image: "kurisu.jpeg",
        description: "Une genius neuroscientist collaborating time experiments. Malgre scientific detachment initial, elle develops emotional connection genuine. Her intelligence coupled avec vulnerability rendering fascinant."
      },
      {
        nom: "Mayuri Shiina",
        image: "mayuri.jpeg",
        description: "Une character love interest Okabe avec personality childlike. Devenant central twist série, her fate determining hero. Her apparent innocence masking depth profound."
      },
      {
        nom: "Daru",
        image: "daru.jpeg",
        description: "Un internet hacker compétent avec personality perverse et heart loyal. Fournishing technical support crucial, il remains loyal. His humor irreverent offsetting serious moments nombreux."
      },
      {
        nom: "WW3 Soldier",
        image: "soldier.jpeg",
        description: "Un character d'antagonist représenting organization powerful. Chasing time machine, il creates tension series. His role catalyst crucial pour plot développements."
      },
      {
        nom: "Ruka Urushibara",
        image: "ruka.jpeg",
        description: "Une character confessing love Okabe despite masculinity believing. Becoming caught paradoxes temporelles, elle suffers. Her emotional journey montrant effects time travel psychological."
      },
      {
        nom: "Itaru Hashida",
        image: "hashida.jpeg",
        description: "Un technical genius providing support Okabe missions. Malgre eccentric personality, il démontre genuine expertise. His contributions crucial pour succès time machine créé."
      }
    ]
  },
  {
    slug: "summer_time_render",
    name: "Summer Time Render",
    folderImg: "summer_time_render",
    bgImg: "summer_time_render",
    personnages: [
      {
        nom: "Shinpei Ajiro",
        image: "shinpei.jpeg",
        description: "Un adolescent discovering time manipulation powers après sister's death. Avec determination fierce et intelligence tactical, il fights monsters. His responsibility lourd revealing maturity quickly."
      },
      {
        nom: "Ushio Ajiro",
        image: "ushio.jpeg",
        description: "La sœur cadette Shinpei seemingly dying initiating time loop. Possédant connection mystérieuse Shinpei, elle pivôt plot centrale. Her arc révélant twist profonde série."
      },
      {
        nom: "Hitomi Yonezu",
        image: "hitomi.jpeg",
        description: "Une classmate de Shinpei devenant friend puis ally. Avec strength determination et magical abilities développées, elle fights. Her character arc showing progression battler capable."
      },
      {
        nom: "Sou Hiyama",
        image: "sou.jpeg",
        description: "Un mysterious character with seemingly innocent personality masquant truth sombre. His revelations shocking creating major plot twist. His dual nature captivant antagonist complex."
      },
      {
        nom: "Mio Akatsuki",
        image: "mio.jpeg",
        description: "Un shadow girl embodying mysterious girl legend. Avec connection supernatural à events, elle influences destiny. Her nature cryptique et role important révéled gradually."
      },
      {
        nom: "Inui Hisashi",
        image: "hisashi.jpeg",
        description: "Un adult character révéling backstory important à história. Possédant knowledge crucial, il assists trio. His perspective adult adding gravitas."
      },
      {
        nom: "Natsuhiko Kyomoto",
        image: "kyomoto.jpeg",
        description: "Un mysterious character involved avec supernatural phenomena. Cachant true motivations, il appears helpful initially. His antagonism mounting throughout série"
      }
    ]
  },
  {
    slug: "the_apoticary_diaries",
    name: "The Apothecary Diaries",
    folderImg: "the_apoticary_diaries",
    bgImg: "the_apoticary_diaries",
    personnages: [
      {
        nom: "Maomao",
        image: "maomao.jpeg",
        description: "Une jeune apothicaire kidnappée servant mysterious official. Avec expertise herbale extraordinaire et personality detached, elle résoutsolves mysteries. Her analytical mind révélant truth sombre."
      },
      {
        nom: "Jinshi",
        image: "jinshi.jpeg",
        description: "Un official mysterious attractive hiding intelligence sharpness. Employing Maomao to solve mysteries palace, il orchestrates events. His agenda hidden creating intrigue constant."
      },
      {
        nom: "Basen",
        image: "basen.jpeg",
        description: "Un attendant loyal détaché Jinshi with serious demeanor. Malgre appearance intimidante, il possède kindness. His unwavering loyalty Jinshi evident throughout."
      },
      {
        nom: "Ling'an",
        image: "lingan.jpeg",
        description: "Une servant fille concubine with cheerful personality. Devenant friend Maomao, elle provides crucial information. Her innocence malgre position sombre touching."
      },
      {
        nom: "Xiaolan",
        image: "xiaolan.jpeg",
        description: "Une concubine working harem with strong personality. Collaborating Maomao, elle démontre courage et intelligence. Her character depth révèlée progressively."
      },
      {
        nom: "Kiyo",
        image: "kiyo.jpeg",
        description: "Un medical officer with knowledge herbal significant. Assisting investigations, il provides professional expertise. His respect Maomao's skills notable throughout."
      },
      {
        nom: "Mao's Father",
        image: "father.jpeg",
        description: "Un character de backstory Maomao revealed gradually. His past connecting directly au intrigue principale. His shadow looming over Maomao's journey"
      }
    ]
  },
  {
    slug: "the_emminece_in_shadow",
    name: "The Eminence in Shadow",
    folderImg: "the_emminece_in_shadow",
    bgImg: "the_emminece_in_shadow",
    personnages: [
      {
        nom: "Cid Kagenou",
        image: "cid.jpeg",
        description: "Un adolescent ordinary réincarné dans fantasy world. Adopting shadowy persona, il creates elaborate intelligence network. His comedic delusions about influence versus reality amusant."
      },
      {
        nom: "Alpha",
        image: "alpha.jpeg",
        description: "Une artificial human créée par antagonist series contrôlant. Devenant loyal Cid, elle révèle surprising depth. Her devotion absolute despite her digital nature touching."
      },
      {
        nom: "Epsilon",
        image: "epsilon.jpeg",
        description: "Une sister artificial similar Alpha with distinct personality nuances. Serving Cid's organization, elle contributes expertise. Her relationship Alpha complicated rending interesting."
      },
      {
        nom: "Lambda",
        image: "lambda.jpeg",
        description: "Une autre artificial being joining organization Cid's gradually. Malgre lesser prominence, elle possède intéressant characteristics. Her interactions teammates creating dynamics comedic."
      },
      {
        nom: "Alexia Asada",
        image: "alexia.jpeg",
        description: "Une princess idealistic becoming caught Cid's schemes. Initially antagonist, she gradually realizes his true nature. Her character arc révélant comedy confusion mistaken identity."
      },
      {
        nom: "Shadow Master",
        image: "shadow.jpeg",
        description: "Un mysterious figure representing actual threat serie. Possédant true power, il contrasts Cid's delusion. His presence creating genuine stakes throughout."
      },
      {
        nom: "Abyss Cult Leader",
        image: "cult.jpeg",
        description: "Un antagonist leader cult opposing Cid indirectly. With genuine ambitions sombres, il creates true conflict. His pursuit driving much plot progression"
      }
    ]
  },
  {
    slug: "the_promised_neverland",
    name: "The Promised Neverland",
    folderImg: "the_promised_neverland",
    bgImg: "the_promised_neverland",
    personnages: [
      {
        nom: "Emma",
        image: "emma.jpeg",
        description: "Une orpheline brilliant discovering terrible truth orphanage. Avec determination unwavering et heart generous, elle leads groupe. Her optimism malgre circumstances horrific inspirant."
      },
      {
        nom: "Norman",
        image: "norman.jpeg",
        description: "Un orphelin genius planner avec intelligence stratégique exceptional. Malgre kind demeanor, he hides dark sacrifice personal. His internal conflict revealing maturity premature."
      },
      {
        nom: "Ray",
        image: "ray.jpeg",
        description: "Un orphelin adopting cynical demeanor protecting heart. Possédant bomb-making skills et deductive ability, il contributes unique. His family dynamic with Emma and Norman nuanced."
      },
      {
        nom: "Isabella",
        image: "isabella.jpeg",
        description: "Un caretaker orphanage beautiful hiding monstrous truth. Torn between duty et maternal instinct, elle struggles. Her character complexity creating moral ambiguity profound."
      },
      {
        nom: "Phil",
        image: "phil.jpeg",
        description: "Un younger orphelin with surprising intelligence et innocence. Discovering truth late, son character arc tragic-comic. His presence adding stakes emotional series."
      },
      {
        nom: "Don",
        image: "don.jpeg",
        description: "Un orphelin charismatic loyal malgre naïveté persistant. Gradually understanding threats, il matures realizing. His friendship unshakeable supporting group cohesion."
      },
      {
        nom: "Gilda",
        image: "gilda.jpeg",
        description: "Une orpheline sweet observant catching key details. Despite limited role, elle contributes important intelligence. Her kindness creating human moments midst horror"
      }
    ]
  },
  {
    slug: "the_rising_of_the_shield_hero",
    name: "The Rising of the Shield Hero",
    folderImg: "the_rising_of_the_shield_hero",
    bgImg: "the_rising_of_the_shield_hero",
    personnages: [
      {
        nom: "Naofumi Iwatani",
        image: "naofumi.jpeg",
        description: "Un otaku réincarné comme Shield Hero dans fantasy world. Falsely accused and betrayed, il rises through determination. His cynicism justified révélant humanity beneath."
      },
      {
        nom: "Raphtalia",
        image: "raphtalia.jpeg",
        description: "Une slave demi-humaine rachetée devenant loyal companion. Avec racoon-ear transformation et sword skills, elle fights. Her growth émotionnel malgre trauma profound."
      },
      {
        nom: "Filo",
        image: "filo.jpeg",
        description: "Une creatures magiques manifestant mostly avian form. Joining group avec childlike wonder, elle brings joy. Her attachment Naofumi innocent et touching."
      },
      {
        nom: "Motoyasu Kitamura",
        image: "motoyasu.jpeg",
        description: "Un rival hero spear-wielder with shallow personality. Despite pompous demeanor, he gradually matures realizing. His redemption arc showing personal growth possible."
      },
      {
        nom: "Ren Amaki",
        image: "ren.jpeg",
        description: "Un hero katana-wielder with gaming knowledge exploiting. Displaying arrogant behavior, histoire révèle complexity. His conflicts Naofumi testing alliance."
      },
      {
        nom: "Eclair",
        image: "eclair.jpeg",
        description: "Une knight honourable devenant friend Naofumi malgre initial conflict. Possédant military expertise et leadership, elle contributes. Her respect earned through actions demonstrated."
      },
      {
        nom: "Melty Melromarc",
        image: "melty.jpeg",
        description: "Une princess politique naive mais bien-intentionée supporting Naofumi. Despite political position, she reveals genuine kindness. Her character arc showing possibility growth."
      }
    ]
  },
  {
    slug: "tokyo_revengers",
    name: "Tokyo Revengers",
    folderImg: "tokyo_revengers",
    bgImg: "tokyo_revengers",
    personnages: [
      {
        nom: "Takemichi Hanagaki",
        image: "takemichi.jpeg",
        description: "Un adolescent faible voyageant passé après girlfriend's death. Avec determination to save loved ones malgre weakness, il persists. His character arc montrant power will versus physique."
      },
      {
        nom: "Mikey",
        image: "mikey.jpeg",
        description: "Un charismatic gang leader with devastating strength. Malgre dark past, il maintains boyish charm. His complexity révélée progressively throughout série."
      },
      {
        nom: "Draken",
        image: "draken.jpeg",
        description: "Un tall imposing lieutenant loyal following Mikey. Possédant strength physical exceptional et calm demeanor. His friendship authentic malgre gang environment."
      },
      {
        nom: "Baji Keisuke",
        image: "baji.jpeg",
        description: "Un tempestuous member gang with heart surprising. Malgre aggressive exterior, il démontre care genuine. His tragedy personal driving emotional impact narrative."
      },
      {
        nom: "Chifuyu Matsuno",
        image: "chifuyu.jpeg",
        description: "Un dependable lieutenant with strong moral compass. Supporting Takemichi's mission, il provides steady support. His loyalty transcendant gang dynamics."
      },
      {
        nom: "Hina",
        image: "hina.jpeg",
        description: "Une femme gentle motivating Takemichi's entire mission. Her death initiating timeline changes, elle remains central. Her love tragic becoming driving force série."
      },
      {
        nom: "Kazutora Hanemiya",
        image: "kazutora.jpeg",
        description: "Un complex character with dark past haunting présent. Révélant twist shocking, his character becomes central. His redemption arc testing boundaries loyalty."
      }
    ]
  },
  {
    slug: "zom_100",
    name: "Zom 100",
    folderImg: "zom_100",
    bgImg: "zom_100",
    personnages: [
      {
        nom: "Akira Tendou",
        image: "akira.jpeg",
        description: "Un salesman devenant optimist après apocalypse zombie. Créant bucket list goals during zombie apocalypse, il pursues life. His enthusiasm catching inspiring allies constantly."
      },
      {
        nom: "Kencho",
        image: "kencho.jpeg",
        description: "Un ami próximo d'Akira joining bucket list adventures. Avec strength physique et loyalty, il supports mission. His personality comedic offsetting dark circumstances."
      },
      {
        nom: "Shizuka",
        image: "shizuka.jpeg",
        description: "Une jeune femme rejoignant groupe revelation objective. Possédant secrets passé et determination fierce, elle proves. Her character depth revealed gradually throughout."
      },
      {
        nom: "Grandpa",
        image: "grandpa.jpeg",
        description: "Un elderly character guide with wisdom worldly. Coaching Akira's group, il provides perspective aging. His presence adding gravitas episodes."
      },
      {
        nom: "Zombie Horde Leader",
        image: "leader.jpeg",
        description: "Un mysterious entity coordinating zombie attacks purposefully. Représenting true threat, il creates tension narrative. His motivations cryptique driven plot."
      },
      {
        nom: "Scientist Character",
        image: "scientist.jpeg",
        description: "Une mysterious figure researching zombie outbreak origins. Possédant answers crucial, il becomes temporary ally. His agenda ambiguous adding intrigue."
      },
      {
        nom: "Military Official",
        image: "official.jpeg",
        description: "Une authority figure menant zombie containment efforts. Dengan agenda competing, il conflicts with protagonist. His moral ambiguity creating tension political"
      }
    ]
  }
];

const templateHtml = (anime) => {
  const personnagesHtml = anime.personnages.map((perso) => `
                <section>
                    <img src="../IMG/${anime.folderImg}/${perso.image}" alt="${perso.nom} - ${perso.description.substring(0, 50)}...">
                    <div>
                        <h2>${perso.nom}</h2>
                        <p>${perso.description}</p>
                    </div>
                </section>`).join('');

  return `<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Anime Ranking - ${anime.name} | Découvrez les personnages principaux</title>
        <meta name="description" content="Découvrez les personnages principaux de ${anime.name} et leurs descriptions détaillées.">
        <meta name="keywords" content="anime, ${anime.name}, personnages, classement, manga">
        <meta name="author" content="MALCOLM">
        <meta property="og:title" content="Anime Ranking - ${anime.name}">
        <meta property="og:description" content="Découvrez les personnages principaux de ${anime.name} avec leurs descriptions détaillées.">
        <meta property="og:image" content="https://ton-site.com/IMG/2img-background/${anime.bgImg}.jpg">
        <meta property="og:url" content="https://ton-site.com/HTML/1_FUTURE_PROJECT/${anime.slug}.html">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Anime Ranking - ${anime.name}">
        <meta name="twitter:description" content="Découvrez les personnages principaux de ${anime.name}.">
        <meta name="twitter:image" content="https://ton-site.com/IMG/2img-background/${anime.bgImg}.jpg">
        <link rel="apple-touch-icon" sizes="180x180" href="../IMG/Favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../IMG/Favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../IMG/Favicon/favicon-16x16.png">
        <link rel="manifest" href="../IMG/Favicon/site.webmanifest">
        <link rel="stylesheet" href="../CSS/style.css">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Montserrat:wght@700&family=Raleway:wght@500&display=swap" rel="stylesheet">
        <style>
            .background-img{
                margin-top: 5.5rem;
                background: linear-gradient(rgba(0, 0, 0, 0.489)), url("../IMG/2img-background/${anime.bgImg}.jpg") top/cover no-repeat fixed;
            }
        </style>
    </head>
    <body>
        <header>
            <nav>
                <a href="../index.html" class="icone-logo"><img src="../IMG/logo-anime_ranking.webp" alt="logo du site"></a>
                <div>
                    <a href="../index.html">Accueil</a>
                    <a href="anime.html">Animes</a>   
                </div>
                <a href="../index.html" class="icone-logo hidden"><img src="../IMG/logo-anime_ranking.webp" alt="logo du site"></a>
            </nav>
            <section class="background-img">
                <h1 class="header-title">${anime.name} - Les personnages principaux</h1>
            </section>
        </header>
        <main>
            <section class="principale">
${personnagesHtml}
            </section>
            <aside class="sidebar">
                <section class="sidebar-section">
                    <div class="first-div-sidebar">
                        <h3>Voir d'autres animes</h3>
                        <div class="catalogues">
                            <a href="SNK.html">Attaques des Titans</a>
                            <a href="bleach.html">Bleach</a>
                            <a href="black clover.html">Black Clover</a>
                            <a href="HxH.html">Hunter x Hunter</a>
                            <a href="naruto.html">Naruto</a>
                            <a href="one_piece.html">One Piece</a>
                            <a href="SAO.html">Sword Art Online</a>
                            <a href="death_note.html">Death Note</a>
                        </div>
                    </div>
                </section>
                <div class="div-author">
                    <h3 class="author-title">Authors</h3>
                    <div>
                        <a href="" class="author-name">MALCOLM</a>
                    </div>
                </div>
            </aside>
        </main>
        <footer>
            <div class="footer-about">
                <h2>À propos</h2>
                <p>Découvrez les meilleurs personnages d'animes et plongez dans leurs univers. Votre source pour explorer et suivre vos héros préférés.</p>
            </div>
            <div class="footer-bottom">
                &copy; 2025
            </div>
        </footer>
    </body>
</html>
`;
};

// Gen files
animes.forEach((anime) => {
  const filePath = path.join(__dirname, 'HTML', '1_FUTURE_PROJECT', `${anime.slug}.html`);
  const htmlContent = templateHtml(anime);
  fs.writeFileSync(filePath, htmlContent, 'utf8');
  console.log(`✓ Generated: ${anime.slug}.html`);
});

console.log(`\n✅ ${animes.length} HTML files generated successfully!`);
