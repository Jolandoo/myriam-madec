export interface Visite {
  slug: string
  titre: string
  sousTitre: string
  categorie: 'pied' | 'velo' | 'bateau' | 'velo-electrique'
  duree: string
  description: string
  descriptionCourte: string  // Max 120 caractères pour les cards
  // Image : URL WordPress (provisoire) ou chemin /images/... local
  // Pour remplacer par une image locale : copier la photo dans public/images/
  // et mettre le chemin ici, ex: '/images/bunker-502.jpg'
  image: string
  reservation: 'office-tourisme' | 'contact-direct'
  reservationUrl?: string
  tags: string[]
  niveauActivite: 'facile' | 'modere' | 'sportif'
  enfantsFriendly: boolean
}

export const visites: Visite[] = [
  {
    slug: 'bunker-502',
    titre: 'Bunker 502',
    sousTitre: 'Arcachon sous l\'Occupation',
    categorie: 'pied',
    duree: '1h',
    description:
      'Après la guerre, les bunkers du Mur de l\'Atlantique sur le Bassin d\'Arcachon sont pillés, ferraillés, détruits, enterrés ou immergés. Fin 1946, le bunker 502 est arasé à la demande du maire pour des raisons esthétiques et de sécurité. Il disparaît pour des décennies — jusqu\'en 2015, quand un projet de parking révèle son existence sous l\'office de tourisme. Je vous invite à plonger dans cette période de notre histoire et à découvrir la vie arcachonnaise durant l\'Occupation.',
    descriptionCourte: 'Un bunker de l\'Atlantikwall redécouvert en 2015 — plongez dans l\'Arcachon de l\'Occupation.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/IMG-20211215-WA0006-qewz1bkelqrvujace62f8fg00jwrxvmmtl2d3w8e5c.jpg',
    reservation: 'office-tourisme',
    reservationUrl: 'https://www.arcachon.com/offres/visite-guidee-du-bunker-502-arcachon-fr-3498385/',
    tags: ['histoire', 'seconde guerre mondiale', 'patrimoine', 'bunker'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
  },
  {
    slug: 'criee-arcachon',
    titre: 'La Criée du Port d\'Arcachon',
    sousTitre: 'Découvrez la pêche locale',
    categorie: 'pied',
    duree: '1h30',
    description:
      'Ne repartez pas d\'un séjour à Arcachon sans avoir assisté à cette visite captivante qui transporte petits et grands dans les coulisses de la pêche locale. Pour s\'immerger dans l\'univers de la pêche et vivre l\'effervescence de ce lieu unique, un seul mot d\'ordre : se lever tôt ! C\'est à 6h15 que je vous donne rendez-vous pour vous faire pénétrer au cœur d\'un univers réservé aux professionnels de la mer. Parcourez le cheminement complet du poisson, de la pêche à l\'expédition : débarque, pesage, calibrage, mareyage, enchères.',
    descriptionCourte: 'Rendez-vous à 6h15 pour les coulisses de la pêche — de la débarque aux enchères.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/94-qewz1amkewqlixbpjnnsnxojf61eq6iwhgevmm9sbk.jpg',
    reservation: 'office-tourisme',
    reservationUrl: 'https://www.arcachon.com/offres/visite-guidee-visite-de-la-criee-arcachon-fr-2481926/',
    tags: ['pêche', 'gastronomie', 'maritime', 'artisanat', 'lève-tôt'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
  },
  {
    slug: 'ville-hiver',
    titre: 'Ville d\'Hiver',
    sousTitre: 'Histoire et architecture',
    categorie: 'pied',
    duree: '2h',
    description:
      'Suivez-moi dans les allées de la Ville d\'Hiver à la découverte de cette architecture remarquable du XIXe siècle. Conçue comme un jardin à l\'anglaise, elle nous invite à flâner en admirant ses superbes "chalets". Créée par les Frères Pereire pour y accueillir des curistes du monde entier, je vous invite sur leurs pas, tout en profitant des effluves balsamiques de ce quartier d\'Arcachon.',
    descriptionCourte: 'Flânez parmi les villas Belle Époque créées par les Frères Pereire pour les curistes du monde entier.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/ville-hiver-qewz0dq7rphk8knhvrfuqnzemojk8rwaoxkvtxmkdc.jpg',
    reservation: 'contact-direct',
    tags: ['architecture', 'XIXe siècle', 'Belle Époque', 'patrimoine', 'villas'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
  },
  {
    slug: 'origines-arcachon',
    titre: 'Aux Origines d\'Arcachon',
    sousTitre: 'Histoire des bains de mer',
    categorie: 'pied',
    duree: '2h',
    description:
      'Tout en longeant le front de mer, vous découvrirez la mode des bains de mer et l\'histoire de ceux qui ont créé la station balnéaire d\'Arcachon : François Legallais, Aldebert Deganne ou les Frères Pereire. Et pourquoi ne pas finir les pieds dans l\'eau.',
    descriptionCourte: 'Sur le front de mer, retracez la naissance d\'Arcachon à travers ses fondateurs.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/plage_pereire-1600x900-1-qewz0ifepvnzumgo4bgzl4spllweb9eydkub8bfli8.jpg',
    reservation: 'contact-direct',
    tags: ['histoire', 'bains de mer', 'front de mer', 'XIXe siècle', 'patrimoine'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
  },
  {
    slug: 'pres-sales-pied',
    titre: 'Randonnée des Prés Salés',
    sousTitre: 'De port en port',
    categorie: 'pied',
    duree: '2-3h',
    description:
      'Découverte de cet ancien quartier de pêcheurs qui s\'est installé dans les prés salés. Pêche, plaisance, ostréiculture, faune et flore. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.',
    descriptionCourte: 'L\'ancien quartier de pêcheurs, les prés salés et — en option — une dégustation d\'huîtres.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/Dune-02-qewz075cfv8jzax1y6lgr7n6gzfzqw66c10hgzwbkw.jpg',
    reservation: 'contact-direct',
    tags: ['nature', 'huîtres', 'ostréiculture', 'prés salés', 'dégustation'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
  },
  {
    slug: 'dune-lever-soleil',
    titre: 'La Dune du Pilat au Lever du Soleil',
    sousTitre: 'Entre océan et forêt',
    categorie: 'pied',
    duree: '1h30',
    description:
      'Vivez une expérience unique en profitant de la magie de la palette des couleurs du lever de soleil. Départ vers 6 heures, montée en silence sur la plus haute dune d\'Europe, avant que les premiers rayons n\'embrasent le Bassin, la forêt des Landes et l\'Atlantique.',
    descriptionCourte: 'Départ à 6h pour gravir la dune dans le silence — le lever de soleil depuis la plus haute dune d\'Europe.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/lever-du-soleil-qewz0gjqc7lf7ejefanqg59seu5nvv7hpbjc9riduo.jpg',
    reservation: 'contact-direct',
    tags: ['dune du Pilat', 'lever de soleil', 'nature', 'expérience unique'],
    niveauActivite: 'modere',
    enfantsFriendly: false,
  },
  {
    slug: 'decouverte-archeologique',
    titre: 'Découverte Archéologique',
    sousTitre: 'De la Dune du Pilat',
    categorie: 'pied',
    duree: '2h',
    description:
      'Site naturel classé et protégé, panorama à couper le souffle, terrain de jeu pour les plus petits — c\'est aussi une archive patrimoniale qui, grâce aux fouilles archéologiques, nous raconte l\'histoire du Pays de Buch et de ses habitants depuis la préhistoire. Tout savoir sur les 4 500 ans d\'histoire de la plus haute dune d\'Europe. Je vous proposerai de terminer cette ascension en retrouvant votre âme d\'enfant, en dévalant la pente douce de l\'océan vers un bain de mer bien mérité.',
    descriptionCourte: '4 500 ans d\'histoire révélés par les fouilles archéologiques — et une descente vers la mer.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/fouilles-archeologiques-qewz075cfv8jzax1y6lgr7n6gzfzqw66c10hgzwbkw.jpg',
    reservation: 'contact-direct',
    tags: ['archéologie', 'dune', 'préhistoire', 'Pays de Buch', 'patrimoine'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
  },
  {
    slug: 'randonnee-crete',
    titre: 'Randonnée sur la Crête de Dune',
    sousTitre: 'Sur la Crête de dune',
    categorie: 'pied',
    duree: '2-3h',
    description:
      'Du haut de sa centaine de mètres, partez en randonnée sur les 3 kilomètres de la crête. Plusieurs options s\'offrent à vous : retour par la plage, ou petit déjeuner et déjeuner au restaurant Le Panorama avec retour par la plage ou en bus.',
    descriptionCourte: '3 km de crête à 100 m d\'altitude, avec options retour plage ou déjeuner au Panorama.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/crete-de-dune-scaled-qewz059o275zc2zs95s7m849a7p9bhypnrpiifz3xc.jpg',
    reservation: 'contact-direct',
    tags: ['randonnée', 'dune', 'panorama', 'nature', 'sportif'],
    niveauActivite: 'sportif',
    enfantsFriendly: false,
  },
  {
    slug: 'velo-ville-hiver',
    titre: 'De Pereire à la Ville d\'Hiver',
    sousTitre: 'Balade à vélo électrique',
    categorie: 'velo-electrique',
    duree: '2h',
    description:
      'Aux origines de la Ville d\'Hiver, sur les pas des Frères Pereire. En VTT à assistance électrique, je vous propose une visite hors des circuits, depuis la plage, à travers la forêt, par les allées cavalières, jusqu\'à la Ville d\'Hiver. Vous pourrez prolonger cette visite en haut du Belvédère, avec la plus belle vue sur la Ville d\'Hiver.',
    descriptionCourte: 'De la plage à la Ville d\'Hiver en VTT électrique, par les allées cavalières de la forêt.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/nonos-myriam-qewz0tpgzw3fpy0aagcif1y8q8csvmnqf4o4zmyvfk.jpg',
    reservation: 'contact-direct',
    tags: ['vélo électrique', 'forêt', 'Ville d\'Hiver', 'Pereire', 'belvédère'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
  },
  {
    slug: 'velo-pres-sales',
    titre: 'Randonnée des Prés Salés',
    sousTitre: 'De port en port',
    categorie: 'velo-electrique',
    duree: '1-2h',
    description:
      'Découverte de cet ancien quartier de pêcheurs qui s\'est installé dans les prés salés. Pêche, plaisance, ostréiculture, faune et flore. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.',
    descriptionCourte: 'Les prés salés et les ports ostréicoles à vélo électrique — avec dégustation possible.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/Port-Ostreicole-qewz0buje1ezlcq86qmlloghfwsttdou0o9wvdpcps.jpg',
    reservation: 'contact-direct',
    tags: ['vélo électrique', 'ostréiculture', 'prés salés', 'dégustation'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
  },
  {
    slug: 'littoral-velo',
    titre: 'Le Littoral Arcachonnais',
    sousTitre: 'Balade en Ville de Printemps',
    categorie: 'velo',
    duree: '2h',
    description:
      'Nous sommes tous impatients de retrouver la plage et son ambiance — c\'est pour cela que je vous propose cette découverte des différentes ambiances des quartiers arcachonnais, Pereire, Abatilles et Moulleau, en longeant le littoral. Nous prolongerons ce plaisir en dégustant une glace artisanale ou en faisant un tour de manège.',
    descriptionCourte: 'Pereire, Abatilles, Moulleau — le littoral d\'Arcachon quartier par quartier, avec glace artisanale.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/plage-pereire-qewz0vl5dk60d5xjzh5rk1h5x03jb0v73dz3y6w334.jpg',
    reservation: 'contact-direct',
    tags: ['vélo', 'front de mer', 'plage', 'quartiers', 'balade'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
  },
  {
    slug: 'sentier-littoral',
    titre: 'Sur le Sentier du Littoral',
    sousTitre: 'Au cœur du Bassin d\'Arcachon',
    categorie: 'velo',
    duree: '2-3h',
    description:
      'Sur le Sentier du Littoral, depuis la Réserve Ornithologique du Teich, vers les ports ostréicoles de Gujan-Mestras, imprégnez-vous de l\'ambiance des sites naturels du cœur du Bassin d\'Arcachon. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.',
    descriptionCourte: 'De la Réserve du Teich aux ports de Gujan-Mestras — nature et huîtres au cœur du Bassin.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/nonos-velo-qewz0unb6q4q1jyx4yr4zjppbm863brgr9bmgwxh9c.jpg',
    reservation: 'contact-direct',
    tags: ['vélo', 'Réserve du Teich', 'huîtres', 'ornithologie', 'Gujan-Mestras'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
  },
  {
    slug: 'balades-bateau',
    titre: 'Bassin d\'Arcachon en Bateau',
    sousTitre: 'Balades en bateau',
    categorie: 'bateau',
    duree: '2h à 1 journée',
    description:
      'Embarquez vers les Cabanes Tchanquées pour un tour de l\'Île aux Oiseaux, avec ou sans escale au Cap Ferret. Tous les charmes du Bassin d\'Arcachon s\'offrent à vous : découverte d\'un village ostréicole, des parcs à huîtres, dégustation d\'huîtres, découverte du Banc d\'Arguin et de la Dune du Pilat, balade à vélo, visite du phare du Cap Ferret.',
    descriptionCourte: 'Île aux Oiseaux, Cabanes Tchanquées, Banc d\'Arguin — le Bassin depuis l\'eau.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/02/VIN2108-scaled.jpg',
    reservation: 'contact-direct',
    tags: ['bateau', 'Île aux Oiseaux', 'cabanes tchanquées', 'Cap Ferret', 'huîtres'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const categorieLabels: Record<Visite['categorie'], string> = {
  pied:             'À pied',
  velo:             'À vélo',
  'velo-electrique':'Vélo électrique',
  bateau:           'En bateau',
}

export const niveauLabels: Record<Visite['niveauActivite'], string> = {
  facile:  'Facile',
  modere:  'Modéré',
  sportif: 'Sportif',
}
