/**
 * Données statiques de fallback (utilisées si Sanity est injoignable).
 * Chaque champ texte est localisé FR / EN / ES.
 *
 * Pour ajouter une visite : copier un objet ci-dessous et adapter.
 * Le slug reste identique entre les langues (URL stable).
 */

export interface Visite {
  slug: string
  titre: string
  sousTitre: string
  categorie: 'pied' | 'velo' | 'bateau' | 'velo-electrique'
  duree: string
  description: string
  descriptionCourte: string
  image: string
  imageDetail?: string
  imageCredit?: string
  programme?: string
  reservation: 'office-tourisme' | 'contact-direct'
  reservationUrl?: string
  tags: string[]
  niveauActivite: 'facile' | 'modere' | 'sportif'
  enfantsFriendly: boolean
}

type Locale = 'fr' | 'en' | 'es'
type L = Record<Locale, string>

interface VisiteSource extends Omit<Visite, 'titre' | 'sousTitre' | 'duree' | 'description' | 'descriptionCourte' | 'programme'> {
  i18n: {
    titre: L
    sousTitre: L
    duree: L
    description: L
    descriptionCourte: L
    programme?: L
  }
}

const visitesSource: VisiteSource[] = [
  {
    slug: 'bunker-502',
    categorie: 'pied',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/IMG-20211215-WA0006-qewz1bkelqrvujace62f8fg00jwrxvmmtl2d3w8e5c.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Coucher_de_soleil_sur_le_bassin_%2810731201504%29.jpg',
    reservation: 'office-tourisme',
    reservationUrl: 'https://www.arcachon.com/offres/visite-guidee-du-bunker-502-arcachon-fr-3498385/',
    tags: ['histoire', 'seconde guerre mondiale', 'patrimoine', 'bunker'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    i18n: {
      titre: { fr: 'Bunker 502', en: 'Bunker 502', es: 'Búnker 502' },
      sousTitre: {
        fr: 'Arcachon sous l\'Occupation',
        en: 'Arcachon under the Occupation',
        es: 'Arcachon bajo la Ocupación',
      },
      duree: { fr: '1h', en: '1h', es: '1h' },
      description: {
        fr: 'Après la guerre, les bunkers du Mur de l\'Atlantique sur le Bassin d\'Arcachon sont pillés, ferraillés, détruits, enterrés ou immergés. Fin 1946, le bunker 502 est arasé à la demande du maire pour des raisons esthétiques et de sécurité. Il disparaît pour des décennies. En 2015, un projet de parking révèle son existence sous l\'office de tourisme. Je vous invite à plonger dans cette période de notre histoire et à découvrir la vie arcachonnaise durant l\'Occupation.',
        en: 'After the war, the Atlantic Wall bunkers around Arcachon Bay were looted, dismantled, destroyed, buried or submerged. In late 1946, Bunker 502 was levelled at the mayor\'s request for aesthetic and safety reasons. It disappeared for decades. In 2015, a car park project revealed it beneath the tourist office. I invite you to dive into that period of our history and discover everyday life in Arcachon under the Occupation.',
        es: 'Tras la guerra, los búnkeres del Muro Atlántico en la Bahía de Arcachon fueron saqueados, desmantelados, destruidos, enterrados o sumergidos. A finales de 1946, el búnker 502 fue arrasado por petición del alcalde por motivos estéticos y de seguridad. Desapareció durante décadas. En 2015, un proyecto de aparcamiento reveló su existencia bajo la oficina de turismo. Le invito a sumergirse en aquel periodo de nuestra historia y descubrir la vida en Arcachon durante la Ocupación.',
      },
      descriptionCourte: {
        fr: 'Un bunker de l\'Atlantikwall redécouvert en 2015 : plongez dans l\'Arcachon de l\'Occupation.',
        en: 'An Atlantikwall bunker rediscovered in 2015: step into Arcachon under the Occupation.',
        es: 'Un búnker del Atlantikwall redescubierto en 2015: sumérjase en el Arcachon de la Ocupación.',
      },
    },
  },
  {
    slug: 'criee-arcachon',
    categorie: 'pied',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/94-qewz1amkewqlixbpjnnsnxojf61eq6iwhgevmm9sbk.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Aerial_view_of_Bassin_d%27Arcachon_and_Dune_du_Pilat_%281%29.JPG',
    reservation: 'office-tourisme',
    reservationUrl: 'https://www.arcachon.com/offres/visite-guidee-visite-de-la-criee-arcachon-fr-2481926/',
    tags: ['pêche', 'gastronomie', 'maritime', 'artisanat', 'lève-tôt'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'La Criée du Port d\'Arcachon',
        en: 'The Arcachon Fish Auction',
        es: 'La Lonja del Puerto de Arcachon',
      },
      sousTitre: {
        fr: 'Découvrez la pêche locale',
        en: 'Discover the local fishery',
        es: 'Descubra la pesca local',
      },
      duree: { fr: '1h30', en: '1h30', es: '1h30' },
      description: {
        fr: 'Ne repartez pas d\'un séjour à Arcachon sans avoir assisté à cette visite captivante qui transporte petits et grands dans les coulisses de la pêche locale. Pour s\'immerger dans l\'univers de la pêche et vivre l\'effervescence de ce lieu unique, un seul mot d\'ordre : se lever tôt ! C\'est à 6h15 que je vous donne rendez-vous pour vous faire pénétrer au cœur d\'un univers réservé aux professionnels de la mer. Parcourez le cheminement complet du poisson, de la pêche à l\'expédition : débarque, pesage, calibrage, mareyage, enchères.',
        en: 'Don\'t leave Arcachon without joining this captivating visit that takes young and old behind the scenes of the local fishery. To soak in the buzz of this unique place, one rule: get up early! Meet me at 6:15 a.m. to step into a world usually reserved for seafood professionals. Follow the fish from boat to dispatch: landing, weighing, sorting, wholesaling, auctions.',
        es: 'No se vaya de Arcachon sin disfrutar de esta visita cautivadora que lleva a pequeños y mayores entre bastidores de la pesca local. Para vivir la efervescencia de este lugar único, una sola consigna: madrugar. Le cito a las 6:15 para entrar en un mundo reservado a los profesionales del mar. Siga el recorrido completo del pescado, de la captura al envío: desembarque, pesado, clasificación, distribución, subastas.',
      },
      descriptionCourte: {
        fr: 'Rendez-vous à 6h15 pour les coulisses de la pêche, de la débarque aux enchères.',
        en: 'Meet at 6:15 a.m. for behind-the-scenes of the fishery, from landing to auction.',
        es: 'Cita a las 6:15 entre bastidores de la pesca, del desembarque a las subastas.',
      },
    },
  },
  {
    slug: 'ville-hiver',
    categorie: 'pied',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/ville-hiver-qewz0dq7rphk8knhvrfuqnzemojk8rwaoxkvtxmkdc.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Arcachon_beach_2025_1.jpg',
    reservation: 'contact-direct',
    tags: ['architecture', 'XIXe siècle', 'Belle Époque', 'patrimoine', 'villas'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    i18n: {
      titre: { fr: 'Ville d\'Hiver', en: 'Winter District', es: 'Ciudad de Invierno' },
      sousTitre: {
        fr: 'Histoire et architecture',
        en: 'History and architecture',
        es: 'Historia y arquitectura',
      },
      duree: { fr: '2h', en: '2h', es: '2h' },
      description: {
        fr: 'Suivez-moi dans les allées de la Ville d\'Hiver à la découverte de cette architecture remarquable du XIXe siècle. Conçue comme un jardin à l\'anglaise, elle nous invite à flâner en admirant ses superbes "chalets". Créée par les Frères Pereire pour y accueillir des curistes du monde entier, je vous invite sur leurs pas, tout en profitant des effluves balsamiques de ce quartier d\'Arcachon.',
        en: 'Follow me through the alleys of the Winter District to discover its remarkable 19th-century architecture. Laid out as an English garden, it invites you to stroll among magnificent "chalets". Created by the Pereire Brothers to welcome visitors from around the world, I take you in their footsteps, with the balsamic scent of pine in the air.',
        es: 'Sígame por las avenidas de la Ciudad de Invierno para descubrir esta arquitectura notable del siglo XIX. Concebida como un jardín a la inglesa, invita a pasear entre sus magníficos "chalets". Creada por los Hermanos Pereire para acoger a curistas del mundo entero, le invito a seguir sus pasos disfrutando del perfume balsámico de este barrio de Arcachon.',
      },
      descriptionCourte: {
        fr: 'Flânez parmi les villas Belle Époque créées par les Frères Pereire pour les curistes du monde entier.',
        en: 'Stroll among the Belle Époque villas created by the Pereire Brothers for visitors from across the world.',
        es: 'Pasee entre las villas Belle Époque creadas por los Hermanos Pereire para curistas del mundo entero.',
      },
    },
  },
  {
    slug: 'origines-arcachon',
    categorie: 'pied',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/plage_pereire-1600x900-1-qewz0ifepvnzumgo4bgzl4spllweb9eydkub8bfli8.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Arcachon_beach_2025_1.jpg',
    reservation: 'contact-direct',
    tags: ['histoire', 'bains de mer', 'front de mer', 'XIXe siècle', 'patrimoine'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'Aux Origines d\'Arcachon',
        en: 'The Origins of Arcachon',
        es: 'En los Orígenes de Arcachon',
      },
      sousTitre: {
        fr: 'Histoire des bains de mer',
        en: 'History of seaside bathing',
        es: 'Historia de los baños de mar',
      },
      duree: { fr: '2h', en: '2h', es: '2h' },
      description: {
        fr: 'Tout en longeant le front de mer, vous découvrirez la mode des bains de mer et l\'histoire de ceux qui ont créé la station balnéaire d\'Arcachon : François Legallais, Aldebert Deganne ou les Frères Pereire. Et pourquoi ne pas finir les pieds dans l\'eau.',
        en: 'Walking along the seafront, you\'ll discover the seaside-bathing craze and the story of those who created the resort of Arcachon: François Legallais, Aldebert Deganne and the Pereire Brothers. Why not end with your feet in the water?',
        es: 'Bordeando el paseo marítimo, descubrirá la moda de los baños de mar y la historia de quienes crearon la estación balnearia de Arcachon: François Legallais, Aldebert Deganne o los Hermanos Pereire. Y por qué no terminar con los pies en el agua.',
      },
      descriptionCourte: {
        fr: 'Sur le front de mer, retracez la naissance d\'Arcachon à travers ses fondateurs.',
        en: 'Along the seafront, retrace the birth of Arcachon through its founders.',
        es: 'En el paseo marítimo, repase el nacimiento de Arcachon a través de sus fundadores.',
      },
    },
  },
  {
    slug: 'pres-sales-pied',
    categorie: 'pied',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/Dune-02-qewz075cfv8jzax1y6lgr7n6gzfzqw66c10hgzwbkw.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/La_Tremblade_17_Cabane_ostr%C3%A9icole_2014.jpg',
    reservation: 'contact-direct',
    tags: ['nature', 'huîtres', 'ostréiculture', 'prés salés', 'dégustation'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'Randonnée des Prés Salés',
        en: 'Salt Meadows Walk',
        es: 'Caminata por los Prados Salados',
      },
      sousTitre: { fr: 'De port en port', en: 'From port to port', es: 'De puerto en puerto' },
      duree: { fr: '2-3h', en: '2-3h', es: '2-3h' },
      description: {
        fr: 'Découverte de cet ancien quartier de pêcheurs qui s\'est installé dans les prés salés. Pêche, plaisance, ostréiculture, faune et flore. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.',
        en: 'Discover this former fishermen\'s district set in the salt meadows. Fishing, sailing, oyster farming, flora and fauna. We can extend the tour with a friendly oyster tasting at a local oyster cabin.',
        es: 'Descubrimiento de este antiguo barrio de pescadores instalado en los prados salados. Pesca, navegación, ostricultura, fauna y flora. Podemos prolongar la visita con una degustación de ostras en una caseta ostrícola.',
      },
      descriptionCourte: {
        fr: 'L\'ancien quartier de pêcheurs, les prés salés et, en option, une dégustation d\'huîtres.',
        en: 'The old fishermen\'s district, the salt meadows and, optionally, an oyster tasting.',
        es: 'El antiguo barrio de pescadores, los prados salados y, opcional, una degustación de ostras.',
      },
    },
  },
  {
    slug: 'dune-lever-soleil',
    categorie: 'pied',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/lever-du-soleil-qewz0gjqc7lf7ejefanqg59seu5nvv7hpbjc9riduo.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dune_du_Pilat_-_Panorama_01.jpg',
    reservation: 'contact-direct',
    tags: ['dune du Pilat', 'lever de soleil', 'nature', 'expérience unique'],
    niveauActivite: 'modere',
    enfantsFriendly: false,
    i18n: {
      titre: {
        fr: 'La Dune du Pilat au Lever du Soleil',
        en: 'The Pilat Dune at Sunrise',
        es: 'La Duna de Pilat al Amanecer',
      },
      sousTitre: {
        fr: 'Entre océan et forêt',
        en: 'Between ocean and forest',
        es: 'Entre océano y bosque',
      },
      duree: { fr: '1h30', en: '1h30', es: '1h30' },
      description: {
        fr: 'Vivez une expérience unique en profitant de la magie de la palette des couleurs du lever de soleil. Départ vers 6 heures, montée en silence sur la plus haute dune d\'Europe, avant que les premiers rayons n\'embrasent le Bassin, la forêt des Landes et l\'Atlantique.',
        en: 'A unique experience to soak up the magic of sunrise colours. Departure around 6 a.m., a silent climb up Europe\'s tallest dune before the first rays light up the Bay, the Landes forest and the Atlantic.',
        es: 'Viva una experiencia única disfrutando de la magia de la paleta de colores del amanecer. Salida hacia las 6 de la mañana, ascenso en silencio a la duna más alta de Europa, antes de que los primeros rayos enciendan la Bahía, el bosque de las Landas y el Atlántico.',
      },
      descriptionCourte: {
        fr: 'Départ à 6h pour gravir la dune dans le silence. Le lever de soleil depuis la plus haute dune d\'Europe.',
        en: 'Departure at 6 a.m. for a silent climb. Sunrise from Europe\'s tallest dune.',
        es: 'Salida a las 6 para subir la duna en silencio. El amanecer desde la duna más alta de Europa.',
      },
    },
  },
  {
    slug: 'decouverte-archeologique',
    categorie: 'pied',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/fouilles-archeologiques-qewz075cfv8jzax1y6lgr7n6gzfzqw66c10hgzwbkw.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dune_du_Pilat_-_Panorama_01.jpg',
    reservation: 'contact-direct',
    tags: ['archéologie', 'dune', 'préhistoire', 'Pays de Buch', 'patrimoine'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'Découverte Archéologique',
        en: 'Archaeological Discovery',
        es: 'Descubrimiento Arqueológico',
      },
      sousTitre: { fr: 'De la Dune du Pilat', en: 'Of the Pilat Dune', es: 'De la Duna de Pilat' },
      duree: { fr: '2h', en: '2h', es: '2h' },
      description: {
        fr: 'Site naturel classé et protégé, panorama à couper le souffle, terrain de jeu pour les plus petits, c\'est aussi une archive patrimoniale qui, grâce aux fouilles archéologiques, nous raconte l\'histoire du Pays de Buch et de ses habitants depuis la préhistoire. Tout savoir sur les 4 500 ans d\'histoire de la plus haute dune d\'Europe. Je vous proposerai de terminer cette ascension en retrouvant votre âme d\'enfant, en dévalant la pente douce de l\'océan vers un bain de mer bien mérité.',
        en: 'A classified natural site, a breathtaking panorama, a playground for kids — and also a heritage archive whose archaeological digs reveal the history of the Pays de Buch and its inhabitants since prehistory. Learn about 4,500 years of history at Europe\'s tallest dune. We\'ll end our climb the kid way: running down the gentle ocean side for a well-earned dip.',
        es: 'Sitio natural protegido, panorama impresionante, parque infantil para los más pequeños y, gracias a las excavaciones arqueológicas, un archivo patrimonial que cuenta la historia del Pays de Buch y de sus habitantes desde la prehistoria. Todo sobre los 4.500 años de historia de la duna más alta de Europa. Terminaremos el ascenso recuperando el alma de niño, bajando la suave pendiente del océano para un baño merecido.',
      },
      descriptionCourte: {
        fr: '4 500 ans d\'histoire révélés par les fouilles archéologiques, puis une descente vers la mer.',
        en: '4,500 years of history revealed by archaeological digs, then a run down to the sea.',
        es: '4500 años de historia revelados por las excavaciones, y bajada hasta el mar.',
      },
    },
  },
  {
    slug: 'randonnee-crete',
    categorie: 'pied',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/crete-de-dune-scaled-qewz059o275zc2zs95s7m849a7p9bhypnrpiifz3xc.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Sommet_de_la_Dune_du_Pilat.jpg',
    reservation: 'contact-direct',
    tags: ['randonnée', 'dune', 'panorama', 'nature', 'sportif'],
    niveauActivite: 'sportif',
    enfantsFriendly: false,
    i18n: {
      titre: {
        fr: 'Randonnée sur la Crête de Dune',
        en: 'Dune Ridge Hike',
        es: 'Caminata por la Cresta de la Duna',
      },
      sousTitre: {
        fr: 'Sur la Crête de dune',
        en: 'Along the dune ridge',
        es: 'Por la cresta de la duna',
      },
      duree: { fr: '2-3h', en: '2-3h', es: '2-3h' },
      description: {
        fr: 'Du haut de sa centaine de mètres, partez en randonnée sur les 3 kilomètres de la crête. Plusieurs options s\'offrent à vous : retour par la plage, ou petit déjeuner et déjeuner au restaurant Le Panorama avec retour par la plage ou en bus.',
        en: 'From around 100 m up, hike the 3 km of the ridge. Several options: return via the beach, or breakfast and lunch at Le Panorama restaurant with a return via the beach or by bus.',
        es: 'Desde sus cien metros de altura, recorra los 3 kilómetros de la cresta. Varias opciones: vuelta por la playa, o desayuno y almuerzo en el restaurante Le Panorama con regreso por la playa o en autobús.',
      },
      descriptionCourte: {
        fr: '3 km de crête à 100 m d\'altitude, avec options retour plage ou déjeuner au Panorama.',
        en: '3 km of ridge at 100 m, with beach-return or lunch-at-Le-Panorama options.',
        es: '3 km de cresta a 100 m, con opciones de vuelta por la playa o almuerzo en Le Panorama.',
      },
    },
  },
  {
    slug: 'velo-ville-hiver',
    categorie: 'velo-electrique',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/nonos-myriam-qewz0tpgzw3fpy0aagcif1y8q8csvmnqf4o4zmyvfk.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Piste_cyclable_Carcans_oc%C3%A9an_-_Lacanau_oc%C3%A9an.jpg',
    reservation: 'contact-direct',
    tags: ['vélo électrique', 'forêt', 'Ville d\'Hiver', 'Pereire', 'belvédère'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'De Pereire à la Ville d\'Hiver',
        en: 'From Pereire to the Winter District',
        es: 'De Pereire a la Ciudad de Invierno',
      },
      sousTitre: {
        fr: 'Balade à vélo électrique',
        en: 'E-bike ride',
        es: 'Paseo en bicicleta eléctrica',
      },
      duree: { fr: '2h', en: '2h', es: '2h' },
      description: {
        fr: 'Aux origines de la Ville d\'Hiver, sur les pas des Frères Pereire. En VTT à assistance électrique, je vous propose une visite hors des circuits, depuis la plage, à travers la forêt, par les allées cavalières, jusqu\'à la Ville d\'Hiver. Vous pourrez prolonger cette visite en haut du Belvédère, avec la plus belle vue sur la Ville d\'Hiver.',
        en: 'Tracing the origins of the Winter District in the footsteps of the Pereire Brothers. On an electric mountain bike, off the beaten path, from the beach through the forest along bridleways up to the Winter District. You can extend the tour to the top of the Belvedere, with the best view of the district.',
        es: 'En los orígenes de la Ciudad de Invierno, tras los pasos de los Hermanos Pereire. En bicicleta eléctrica de montaña, le propongo una visita fuera de los circuitos, desde la playa, atravesando el bosque por los caminos de herradura, hasta la Ciudad de Invierno. Puede prolongar la visita en lo alto del Belvedere, con la mejor vista del barrio.',
      },
      descriptionCourte: {
        fr: 'De la plage à la Ville d\'Hiver en VTT électrique, par les allées cavalières de la forêt.',
        en: 'From the beach to the Winter District by e-MTB, along the forest bridleways.',
        es: 'De la playa a la Ciudad de Invierno en bici eléctrica, por los caminos del bosque.',
      },
    },
  },
  {
    slug: 'velo-pres-sales',
    categorie: 'velo-electrique',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/Port-Ostreicole-qewz0buje1ezlcq86qmlloghfwsttdou0o9wvdpcps.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/La_Tremblade_17_Cabane_ostr%C3%A9icole_2014.jpg',
    reservation: 'contact-direct',
    tags: ['vélo électrique', 'ostréiculture', 'prés salés', 'dégustation'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'Randonnée des Prés Salés',
        en: 'Salt Meadows Ride',
        es: 'Paseo por los Prados Salados',
      },
      sousTitre: { fr: 'De port en port', en: 'From port to port', es: 'De puerto en puerto' },
      duree: { fr: '1-2h', en: '1-2h', es: '1-2h' },
      description: {
        fr: 'Découverte de cet ancien quartier de pêcheurs qui s\'est installé dans les prés salés. Pêche, plaisance, ostréiculture, faune et flore. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.',
        en: 'Discover this former fishermen\'s district set in the salt meadows. Fishing, sailing, oyster farming, flora and fauna. We can extend the tour with a friendly oyster tasting at a local oyster cabin.',
        es: 'Descubrimiento de este antiguo barrio de pescadores instalado en los prados salados. Pesca, navegación, ostricultura, fauna y flora. Podemos prolongar la visita con una degustación de ostras en una caseta ostrícola.',
      },
      descriptionCourte: {
        fr: 'Les prés salés et les ports ostréicoles à vélo électrique, avec dégustation possible.',
        en: 'Salt meadows and oyster ports by e-bike, with optional tasting.',
        es: 'Prados salados y puertos ostrícolas en bici eléctrica, con degustación opcional.',
      },
    },
  },
  {
    slug: 'littoral-velo',
    categorie: 'velo',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/plage-pereire-qewz0vl5dk60d5xjzh5rk1h5x03jb0v73dz3y6w334.jpg',
    imageDetail: 'https://images.pexels.com/photos/9729433/pexels-photo-9729433.jpeg',
    reservation: 'contact-direct',
    tags: ['vélo', 'front de mer', 'plage', 'quartiers', 'balade'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'Le Littoral Arcachonnais',
        en: 'The Arcachon Coast',
        es: 'El Litoral de Arcachon',
      },
      sousTitre: {
        fr: 'Balade en Ville de Printemps',
        en: 'Spring District ride',
        es: 'Paseo por la Ciudad de Primavera',
      },
      duree: { fr: '2h', en: '2h', es: '2h' },
      description: {
        fr: 'Nous sommes tous impatients de retrouver la plage et son ambiance, c\'est pour cela que je vous propose cette découverte des différentes ambiances des quartiers arcachonnais, Pereire, Abatilles et Moulleau, en longeant le littoral. Nous prolongerons ce plaisir en dégustant une glace artisanale ou en faisant un tour de manège.',
        en: 'We\'re all eager to get back to the beach and its atmosphere — so I take you on a ride through the different moods of Arcachon\'s districts: Pereire, Abatilles and Moulleau, all along the coast. We\'ll extend the fun with an artisan ice cream or a ride on the merry-go-round.',
        es: 'Todos estamos deseando reencontrarnos con la playa y su ambiente, por eso le propongo este descubrimiento de los distintos ambientes de los barrios de Arcachon: Pereire, Abatilles y Moulleau, bordeando el litoral. Prolongaremos el placer con un helado artesanal o una vuelta en el tiovivo.',
      },
      descriptionCourte: {
        fr: 'Pereire, Abatilles, Moulleau : le littoral d\'Arcachon quartier par quartier, avec glace artisanale.',
        en: 'Pereire, Abatilles, Moulleau: the Arcachon coast district by district, with an artisan ice cream.',
        es: 'Pereire, Abatilles, Moulleau: el litoral de Arcachon barrio a barrio, con helado artesanal.',
      },
    },
  },
  {
    slug: 'sentier-littoral',
    categorie: 'velo',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/nonos-velo-qewz0unb6q4q1jyx4yr4zjppbm863brgr9bmgwxh9c.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Coucher_de_soleil_sur_le_bassin_%2810731201504%29.jpg',
    reservation: 'contact-direct',
    tags: ['vélo', 'Réserve du Teich', 'huîtres', 'ornithologie', 'Gujan-Mestras'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'Sur le Sentier du Littoral',
        en: 'On the Coastal Path',
        es: 'Por el Sendero del Litoral',
      },
      sousTitre: {
        fr: 'Au cœur du Bassin d\'Arcachon',
        en: 'In the heart of Arcachon Bay',
        es: 'En el corazón de la Bahía de Arcachon',
      },
      duree: { fr: '2-3h', en: '2-3h', es: '2-3h' },
      description: {
        fr: 'Sur le Sentier du Littoral, depuis la Réserve Ornithologique du Teich, vers les ports ostréicoles de Gujan-Mestras, imprégnez-vous de l\'ambiance des sites naturels du cœur du Bassin d\'Arcachon. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.',
        en: 'Along the Coastal Path from the Teich Bird Reserve to the oyster ports of Gujan-Mestras, soak in the natural sites at the heart of Arcachon Bay. We can extend the tour with a friendly oyster tasting at a local oyster cabin.',
        es: 'Por el Sendero del Litoral, desde la Reserva Ornitológica del Teich hasta los puertos ostrícolas de Gujan-Mestras, impregnese del ambiente de los sitios naturales del corazón de la Bahía. Podemos prolongar la visita con una degustación de ostras en una caseta ostrícola.',
      },
      descriptionCourte: {
        fr: 'De la Réserve du Teich aux ports de Gujan-Mestras : nature et huîtres au cœur du Bassin.',
        en: 'From the Teich Reserve to the Gujan-Mestras ports: nature and oysters at the heart of the Bay.',
        es: 'De la Reserva del Teich a los puertos de Gujan-Mestras: naturaleza y ostras en el corazón de la Bahía.',
      },
    },
  },
  {
    slug: 'balades-bateau',
    categorie: 'bateau',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/02/VIN2108-scaled.jpg',
    reservation: 'contact-direct',
    tags: ['bateau', 'Île aux Oiseaux', 'cabanes tchanquées', 'Cap Ferret', 'huîtres'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    i18n: {
      titre: {
        fr: 'Bassin d\'Arcachon en Bateau',
        en: 'Arcachon Bay by Boat',
        es: 'Bahía de Arcachon en Barco',
      },
      sousTitre: { fr: 'Balades en bateau', en: 'Boat tours', es: 'Paseos en barco' },
      duree: { fr: '2h à 1 journée', en: '2h to 1 day', es: '2h a 1 día' },
      description: {
        fr: 'Embarquez vers les Cabanes Tchanquées pour un tour de l\'Île aux Oiseaux, avec ou sans escale au Cap Ferret. Tous les charmes du Bassin d\'Arcachon s\'offrent à vous : découverte d\'un village ostréicole, des parcs à huîtres, dégustation d\'huîtres, découverte du Banc d\'Arguin et de la Dune du Pilat, balade à vélo, visite du phare du Cap Ferret.',
        en: 'Set sail towards the Tchanqué Cabins for a tour of Bird Island, with or without a stop at Cap Ferret. All the charms of Arcachon Bay open up to you: an oyster village, oyster beds, oyster tasting, the Arguin Sandbank and the Pilat Dune, a bike ride, a visit to the Cap Ferret lighthouse.',
        es: 'Embarque hacia las Cabañas Tchanquées para una vuelta a la Isla de los Pájaros, con o sin escala en Cap Ferret. Todos los encantos de la Bahía de Arcachon se le ofrecen: un pueblo ostrícola, los parques de ostras, degustación de ostras, el Banco de Arguin y la Duna de Pilat, paseo en bicicleta, visita al faro de Cap Ferret.',
      },
      descriptionCourte: {
        fr: 'Île aux Oiseaux, Cabanes Tchanquées, Banc d\'Arguin : le Bassin depuis l\'eau.',
        en: 'Bird Island, Tchanqué Cabins, Arguin Sandbank: the Bay from the water.',
        es: 'Isla de los Pájaros, Cabañas Tchanquées, Banco de Arguin: la Bahía desde el agua.',
      },
    },
  },
]

// ─── Resolvers ────────────────────────────────────────────────────────────────

export function resolveVisites(locale: Locale = 'fr'): Visite[] {
  return visitesSource.map((v) => {
    const { i18n, ...rest } = v
    return {
      ...rest,
      titre:             i18n.titre[locale]             || i18n.titre.fr,
      sousTitre:         i18n.sousTitre[locale]         || i18n.sousTitre.fr,
      duree:             i18n.duree[locale]             || i18n.duree.fr,
      description:       i18n.description[locale]       || i18n.description.fr,
      descriptionCourte: i18n.descriptionCourte[locale] || i18n.descriptionCourte.fr,
      programme:         i18n.programme?.[locale]       || i18n.programme?.fr,
    }
  })
}

/** Backward-compat : version FR (égale à la précédente structure plate). */
export const visites: Visite[] = resolveVisites('fr')

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
