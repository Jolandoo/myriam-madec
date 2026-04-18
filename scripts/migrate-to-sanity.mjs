/**
 * Script de migration — pousse les données statiques vers Sanity
 * Usage : node scripts/migrate-to-sanity.mjs
 *
 * Prérequis : NEXT_PUBLIC_SANITY_PROJECT_ID et NEXT_PUBLIC_SANITY_DATASET dans .env.local
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Lire .env.local ──────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
const env = {}
try {
  readFileSync(envPath, 'utf-8').split('\n').forEach((line) => {
    const [key, ...val] = line.split('=')
    if (key && val.length) env[key.trim()] = val.join('=').trim()
  })
} catch { /* ignore */ }

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: env.SANITY_API_TOKEN, // facultatif — voir note ci-dessous
})

// ── Données statiques ────────────────────────────────────────────────────────

const visites = [
  {
    slug: 'bunker-502',
    titre: 'Bunker 502',
    sousTitre: "Arcachon sous l'Occupation",
    categorie: 'pied',
    duree: '1h',
    description: "Après la guerre, les bunkers du Mur de l'Atlantique sur le Bassin d'Arcachon sont pillés, ferraillés, détruits, enterrés ou immergés. Fin 1946, le bunker 502 est arasé à la demande du maire pour des raisons esthétiques et de sécurité. Il disparaît pour des décennies — jusqu'en 2015, quand un projet de parking révèle son existence sous l'office de tourisme. Je vous invite à plonger dans cette période de notre histoire et à découvrir la vie arcachonnaise durant l'Occupation.",
    descriptionCourte: "Un bunker de l'Atlantikwall redécouvert en 2015 — plongez dans l'Arcachon de l'Occupation.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/IMG-20211215-WA0006-qewz1bkelqrvujace62f8fg00jwrxvmmtl2d3w8e5c.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Coucher_de_soleil_sur_le_bassin_%2810731201504%29.jpg',
    reservation: 'office-tourisme',
    reservationUrl: 'https://www.arcachon.com/offres/visite-guidee-du-bunker-502-arcachon-fr-3498385/',
    tags: ['histoire', 'seconde guerre mondiale', 'patrimoine', 'bunker'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    ordre: 1,
  },
  {
    slug: 'criee-arcachon',
    titre: "La Criée du Port d'Arcachon",
    sousTitre: 'Découvrez la pêche locale',
    categorie: 'pied',
    duree: '1h30',
    description: "Ne repartez pas d'un séjour à Arcachon sans avoir assisté à cette visite captivante qui transporte petits et grands dans les coulisses de la pêche locale. Pour s'immerger dans l'univers de la pêche et vivre l'effervescence de ce lieu unique, un seul mot d'ordre : se lever tôt ! C'est à 6h15 que je vous donne rendez-vous pour vous faire pénétrer au cœur d'un univers réservé aux professionnels de la mer. Parcourez le cheminement complet du poisson, de la pêche à l'expédition : débarque, pesage, calibrage, mareyage, enchères.",
    descriptionCourte: 'Rendez-vous à 6h15 pour les coulisses de la pêche — de la débarque aux enchères.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/94-qewz1amkewqlixbpjnnsnxojf61eq6iwhgevmm9sbk.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Aerial_view_of_Bassin_d%27Arcachon_and_Dune_du_Pilat_%281%29.JPG',
    reservation: 'office-tourisme',
    reservationUrl: 'https://www.arcachon.com/offres/visite-guidee-visite-de-la-criee-arcachon-fr-2481926/',
    tags: ['pêche', 'gastronomie', 'maritime', 'artisanat', 'lève-tôt'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    ordre: 2,
  },
  {
    slug: 'ville-hiver',
    titre: "Ville d'Hiver",
    sousTitre: 'Histoire et architecture',
    categorie: 'pied',
    duree: '2h',
    description: "Suivez-moi dans les allées de la Ville d'Hiver à la découverte de cette architecture remarquable du XIXe siècle. Conçue comme un jardin à l'anglaise, elle nous invite à flâner en admirant ses superbes \"chalets\". Créée par les Frères Pereire pour y accueillir des curistes du monde entier, je vous invite sur leurs pas, tout en profitant des effluves balsamiques de ce quartier d'Arcachon.",
    descriptionCourte: "Flânez parmi les villas Belle Époque créées par les Frères Pereire pour les curistes du monde entier.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/ville-hiver-qewz0dq7rphk8knhvrfuqnzemojk8rwaoxkvtxmkdc.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Arcachon_beach_2025_1.jpg',
    reservation: 'contact-direct',
    tags: ['architecture', 'XIXe siècle', 'Belle Époque', 'patrimoine', 'villas'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    ordre: 3,
  },
  {
    slug: 'origines-arcachon',
    titre: "Aux Origines d'Arcachon",
    sousTitre: 'Histoire des bains de mer',
    categorie: 'pied',
    duree: '2h',
    description: "Tout en longeant le front de mer, vous découvrirez la mode des bains de mer et l'histoire de ceux qui ont créé la station balnéaire d'Arcachon : François Legallais, Aldebert Deganne ou les Frères Pereire. Et pourquoi ne pas finir les pieds dans l'eau.",
    descriptionCourte: "Sur le front de mer, retracez la naissance d'Arcachon à travers ses fondateurs.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/plage_pereire-1600x900-1-qewz0ifepvnzumgo4bgzl4spllweb9eydkub8bfli8.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Arcachon_beach_2025_1.jpg',
    reservation: 'contact-direct',
    tags: ['histoire', 'bains de mer', 'front de mer', 'XIXe siècle', 'patrimoine'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    ordre: 4,
  },
  {
    slug: 'pres-sales-pied',
    titre: 'Randonnée des Prés Salés',
    sousTitre: 'De port en port',
    categorie: 'pied',
    duree: '2-3h',
    description: "Découverte de cet ancien quartier de pêcheurs qui s'est installé dans les prés salés. Pêche, plaisance, ostréiculture, faune et flore. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.",
    descriptionCourte: "L'ancien quartier de pêcheurs, les prés salés et — en option — une dégustation d'huîtres.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/Dune-02-qewz075cfv8jzax1y6lgr7n6gzfzqw66c10hgzwbkw.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/La_Tremblade_17_Cabane_ostr%C3%A9icole_2014.jpg',
    reservation: 'contact-direct',
    tags: ['nature', 'huîtres', 'ostréiculture', 'prés salés', 'dégustation'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
    ordre: 5,
  },
  {
    slug: 'dune-lever-soleil',
    titre: 'La Dune du Pilat au Lever du Soleil',
    sousTitre: 'Entre océan et forêt',
    categorie: 'pied',
    duree: '1h30',
    description: "Vivez une expérience unique en profitant de la magie de la palette des couleurs du lever de soleil. Départ vers 6 heures, montée en silence sur la plus haute dune d'Europe, avant que les premiers rayons n'embrasent le Bassin, la forêt des Landes et l'Atlantique.",
    descriptionCourte: "Départ à 6h pour gravir la dune dans le silence — le lever de soleil depuis la plus haute dune d'Europe.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/lever-du-soleil-qewz0gjqc7lf7ejefanqg59seu5nvv7hpbjc9riduo.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dune_du_Pilat_-_Panorama_01.jpg',
    reservation: 'contact-direct',
    tags: ['dune du Pilat', 'lever de soleil', 'nature', 'expérience unique'],
    niveauActivite: 'modere',
    enfantsFriendly: false,
    ordre: 6,
  },
  {
    slug: 'decouverte-archeologique',
    titre: 'Découverte Archéologique',
    sousTitre: 'De la Dune du Pilat',
    categorie: 'pied',
    duree: '2h',
    description: "Site naturel classé et protégé, panorama à couper le souffle, terrain de jeu pour les plus petits — c'est aussi une archive patrimoniale qui, grâce aux fouilles archéologiques, nous raconte l'histoire du Pays de Buch et de ses habitants depuis la préhistoire. Tout savoir sur les 4 500 ans d'histoire de la plus haute dune d'Europe. Je vous proposerai de terminer cette ascension en retrouvant votre âme d'enfant, en dévalant la pente douce de l'océan vers un bain de mer bien mérité.",
    descriptionCourte: "4 500 ans d'histoire révélés par les fouilles archéologiques — et une descente vers la mer.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/fouilles-archeologiques-qewz075cfv8jzax1y6lgr7n6gzfzqw66c10hgzwbkw.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dune_du_Pilat_-_Panorama_01.jpg',
    reservation: 'contact-direct',
    tags: ['archéologie', 'dune', 'préhistoire', 'Pays de Buch', 'patrimoine'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
    ordre: 7,
  },
  {
    slug: 'randonnee-crete',
    titre: 'Randonnée sur la Crête de Dune',
    sousTitre: 'Sur la Crête de dune',
    categorie: 'pied',
    duree: '2-3h',
    description: "Du haut de sa centaine de mètres, partez en randonnée sur les 3 kilomètres de la crête. Plusieurs options s'offrent à vous : retour par la plage, ou petit déjeuner et déjeuner au restaurant Le Panorama avec retour par la plage ou en bus.",
    descriptionCourte: "3 km de crête à 100 m d'altitude, avec options retour plage ou déjeuner au Panorama.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/crete-de-dune-scaled-qewz059o275zc2zs95s7m849a7p9bhypnrpiifz3xc.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Sommet_de_la_Dune_du_Pilat.jpg',
    reservation: 'contact-direct',
    tags: ['randonnée', 'dune', 'panorama', 'nature', 'sportif'],
    niveauActivite: 'sportif',
    enfantsFriendly: false,
    ordre: 8,
  },
  {
    slug: 'velo-ville-hiver',
    titre: "De Pereire à la Ville d'Hiver",
    sousTitre: 'Balade à vélo électrique',
    categorie: 'velo-electrique',
    duree: '2h',
    description: "Aux origines de la Ville d'Hiver, sur les pas des Frères Pereire. En VTT à assistance électrique, je vous propose une visite hors des circuits, depuis la plage, à travers la forêt, par les allées cavalières, jusqu'à la Ville d'Hiver. Vous pourrez prolonger cette visite en haut du Belvédère, avec la plus belle vue sur la Ville d'Hiver.",
    descriptionCourte: "De la plage à la Ville d'Hiver en VTT électrique, par les allées cavalières de la forêt.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/nonos-myriam-qewz0tpgzw3fpy0aagcif1y8q8csvmnqf4o4zmyvfk.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Piste_cyclable_Carcans_oc%C3%A9an_-_Lacanau_oc%C3%A9an.jpg',
    reservation: 'contact-direct',
    tags: ['vélo électrique', 'forêt', "Ville d'Hiver", 'Pereire', 'belvédère'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    ordre: 9,
  },
  {
    slug: 'velo-pres-sales',
    titre: 'Randonnée des Prés Salés',
    sousTitre: 'De port en port',
    categorie: 'velo-electrique',
    duree: '1-2h',
    description: "Découverte de cet ancien quartier de pêcheurs qui s'est installé dans les prés salés. Pêche, plaisance, ostréiculture, faune et flore. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.",
    descriptionCourte: 'Les prés salés et les ports ostréicoles à vélo électrique — avec dégustation possible.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/Port-Ostreicole-qewz0buje1ezlcq86qmlloghfwsttdou0o9wvdpcps.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/La_Tremblade_17_Cabane_ostr%C3%A9icole_2014.jpg',
    reservation: 'contact-direct',
    tags: ['vélo électrique', 'ostréiculture', 'prés salés', 'dégustation'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    ordre: 10,
  },
  {
    slug: 'littoral-velo',
    titre: 'Le Littoral Arcachonnais',
    sousTitre: 'Balade en Ville de Printemps',
    categorie: 'velo',
    duree: '2h',
    description: "Nous sommes tous impatients de retrouver la plage et son ambiance — c'est pour cela que je vous propose cette découverte des différentes ambiances des quartiers arcachonnais, Pereire, Abatilles et Moulleau, en longeant le littoral. Nous prolongerons ce plaisir en dégustant une glace artisanale ou en faisant un tour de manège.",
    descriptionCourte: 'Pereire, Abatilles, Moulleau — le littoral d\'Arcachon quartier par quartier, avec glace artisanale.',
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/plage-pereire-qewz0vl5dk60d5xjzh5rk1h5x03jb0v73dz3y6w334.jpg',
    imageDetail: 'https://images.pexels.com/photos/9729433/pexels-photo-9729433.jpeg',
    reservation: 'contact-direct',
    tags: ['vélo', 'front de mer', 'plage', 'quartiers', 'balade'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    ordre: 11,
  },
  {
    slug: 'sentier-littoral',
    titre: 'Sur le Sentier du Littoral',
    sousTitre: "Au cœur du Bassin d'Arcachon",
    categorie: 'velo',
    duree: '2-3h',
    description: "Sur le Sentier du Littoral, depuis la Réserve Ornithologique du Teich, vers les ports ostréicoles de Gujan-Mestras, imprégnez-vous de l'ambiance des sites naturels du cœur du Bassin d'Arcachon. Nous pourrons prolonger cette visite par un moment convivial, en dégustant des huîtres dans une cabane ostréicole.",
    descriptionCourte: "De la Réserve du Teich aux ports de Gujan-Mestras — nature et huîtres au cœur du Bassin.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/nonos-velo-qewz0unb6q4q1jyx4yr4zjppbm863brgr9bmgwxh9c.jpg',
    imageDetail: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Coucher_de_soleil_sur_le_bassin_%2810731201504%29.jpg',
    reservation: 'contact-direct',
    tags: ['vélo', 'Réserve du Teich', 'huîtres', 'ornithologie', 'Gujan-Mestras'],
    niveauActivite: 'modere',
    enfantsFriendly: true,
    ordre: 12,
  },
  {
    slug: 'balades-bateau',
    titre: "Bassin d'Arcachon en Bateau",
    sousTitre: 'Balades en bateau',
    categorie: 'bateau',
    duree: '2h à 1 journée',
    description: "Embarquez vers les Cabanes Tchanquées pour un tour de l'Île aux Oiseaux, avec ou sans escale au Cap Ferret. Tous les charmes du Bassin d'Arcachon s'offrent à vous : découverte d'un village ostréicole, des parcs à huîtres, dégustation d'huîtres, découverte du Banc d'Arguin et de la Dune du Pilat, balade à vélo, visite du phare du Cap Ferret.",
    descriptionCourte: "Île aux Oiseaux, Cabanes Tchanquées, Banc d'Arguin — le Bassin depuis l'eau.",
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/02/VIN2108-scaled.jpg',
    reservation: 'contact-direct',
    tags: ['bateau', 'Île aux Oiseaux', 'cabanes tchanquées', 'Cap Ferret', 'huîtres'],
    niveauActivite: 'facile',
    enfantsFriendly: true,
    ordre: 13,
  },
]

const articles = [
  {
    slug: 'journee-internationale-guides-2022',
    titre: 'Journée Internationale des Guides 2022',
    date: '28 mars 2022',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/0-1024x768.jpg',
    imageAlt: "Guides officiels du Bassin d'Arcachon — Quartier du Lapin Blanc, La Teste de Buch",
    extrait: "Retour sur la Journée Internationale des Guides 2022 — une balade dans le quartier méconnu du Lapin Blanc à La Teste de Buch.",
    contenu: `Le 21 février est la Journée Internationale des Guides. Et oui, guider est un métier.

Le Lapin Blanc constitue un quartier peu connu de La Teste de Buch, adjacent à l'Aiguillon. Selon la légende, une femme âgée y aurait possédé un lapin doté de pouvoirs miraculeux. Quelques habitations subsistent de cette époque, témoins silencieux d'un passé oublié.

Pour célébrer cette journée, les professionnels du secteur touristique du Bassin ont proposé une reconstitution des moments importants de ce quartier. Une balade entre histoire locale et anecdotes savoureuses, guidée par les conférenciers officiels du Bassin d'Arcachon.

Reportage TVBA publié par Fanny Peyrazat.`,
    images: [
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0005-920x1024.jpg', alt: "Guides du Bassin d'Arcachon lors de la Journée Internationale 2022" },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0003-1024x711.jpg', alt: 'Quartier du Lapin Blanc, La Teste de Buch' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0004-674x1024.jpg', alt: 'Guides officiels en balade dans le quartier du Lapin Blanc' },
    ],
  },
  {
    slug: 'fat-bike-foret-littoral',
    titre: 'Entre forêt et littoral en FAT BIKE',
    date: '25 avril 2022',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/277766484_2223405004475339_634637019580051229_n.jpg',
    imageAlt: "Fat bike devant une cabane ostréicole du Bassin d'Arcachon",
    extrait: "Une nouvelle façon de découvrir le littoral arcachonnais — à bord d'un fat bike électrique pour glisser entre pinède et Bassin.",
    contenu: `Une expérience originale et fun pour explorer le Bassin d'Arcachon autrement — à bord d'un fat bike électrique.

La visite débute au Vélotier, situé au parking de Décathlon, pour une balade bucolique à travers les sentiers de la Chêneraie et du littoral. Le parcours traverse plusieurs écosystèmes emblématiques : canaux, forêts de pins, prés salés et ports ostréicoles.

Au fil des pédales, vous découvrirez des paysages insoupçonnés, loin des circuits habituels. L'expérience peut se prolonger par une halte dégustation dans une cabane ostréicole locale — une immersion dans l'atmosphère typique du rivage arcachonnais.

**Tarif :** 60 € par personne (fat bike électrique + accompagnement guide inclus)`,
    images: [
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/P1030717-2-1024x693.jpg', alt: 'Fat bike en forêt de pins landaise' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/277750196_2223405111141995_8856548811987035528_n.jpg', alt: 'Sentier du littoral en fat bike' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/P1030789-1024x683.jpg', alt: 'Fat bike devant les ports ostréicoles' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/Canal_Cazaux-1024x768.jpg', alt: 'Canal de Cazaux depuis les airs' },
    ],
  },
  {
    slug: 'visites-2021-histoire-bains-de-mer',
    titre: 'Visites 2021 : Histoire des bains de mer',
    date: '11 mai 2021',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/04/71559405_10217253503988131_4387037376052985856_o.jpg',
    imageAlt: "Visite guidée sur le front de mer d'Arcachon — Histoire des bains de mer",
    extrait: "Retour sur les origines balnéaires d'Arcachon — comment la ville est devenue l'une des premières stations de bains de mer de France.",
    contenu: `À pied, en ma compagnie, longez le front de mer pour découvrir la mode des bains de mer et l'histoire de ceux qui ont créé la station balnéaire d'Arcachon : F. Legallais, A. Deganne ou les Frères Pereire.

Une promenade de deux heures qui retrace la naissance de cette ville unique, imaginée au XIXe siècle pour accueillir les curistes venus se ressourcer au bord du Bassin. Vous terminerez la visite les pieds dans l'eau — comme il se doit.

**Informations pratiques :**
Durée : environ 2 heures
Visites programmées les 21 et 28 mai 2021, de 14h30 à 16h30
Réservations : Office de tourisme d'Arcachon — 05 57 52 97 97

Visites disponibles aussi en famille ou entre amis sur demande directe.`,
  },
  {
    slug: 'journee-internationale-guides-2021',
    titre: 'Journée Internationale des Guides 2021',
    date: '24 février 2021',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/02/tourist-_internationnale.jpg',
    imageAlt: 'Journée Internationale des Guides Touristiques',
    extrait: "Célébration de la Journée Internationale des Guides — un métier de passion au service de la transmission culturelle, malgré une année marquée par les restrictions sanitaires.",
    contenu: `Le 21 février marque la Journée Internationale des Guides, célébrant ce métier unique au monde.

Malgré les périodes de confinement et les restrictions de circulation qui ont marqué 2020 et 2021, les guides officiels du Bassin d'Arcachon ont maintenu leur passion intacte. L'absence des visites de groupes a été difficile à vivre, mais l'enthousiasme pour accueillir et faire découvrir les richesses du patrimoine local reste entier.

Face aux limitations sanitaires, l'équipe a encouragé la privatisation des visites pour continuer à proposer des découvertes du patrimoine en toute sécurité. N'hésitez pas à privatiser votre guide !

**#2021JePrivatiseMonGuide**

Pour l'occasion, les guides ont produit une petite vidéo pleine d'humour présentant leur travail et leur dévouement — parce qu'on peut être sérieux sans se prendre au sérieux.`,
  },
]

const tarifs = {
  _id: 'singleton-tarifs',
  _type: 'tarifs',
  lignes: [
    { _key: '2h',  duree: '2 heures',        prix: '200 €' },
    { _key: '3h',  duree: '3 heures',        prix: '230 €' },
    { _key: '4h',  duree: '4 heures',        prix: '260 €' },
    { _key: '5h',  duree: '5 heures',        prix: '290 €' },
    { _key: '6h',  duree: '6 heures',        prix: '320 €' },
    { _key: '7h',  duree: '7 heures',        prix: '350 €' },
    { _key: 'jj',  duree: 'Journée entière', prix: '400 €' },
  ],
  conditions: [
    'Tarifs TTC (toutes taxes comprises).',
    'Prestations le 1er mai et le 1er janvier majorées au double.',
    "Réservations de plus d'un jour : acompte de 30 % à la réservation.",
    'Entrées de sites et repas du guide non inclus — à la charge du client.',
    'Dégustations, balades en bateau et location de vélos non compris.',
  ],
  annulation: [
    { _key: '48h', delai: 'Annulation à 48h', montant: '50 % du montant de la prestation' },
    { _key: '24h', delai: 'Annulation à 24h', montant: '100 % du montant de la prestation' },
  ],
  note: 'Groupes à pied : minimum 30 personnes · Groupes à vélo : minimum 15 personnes',
}

// ── Migration ────────────────────────────────────────────────────────────────

async function migrate() {
  console.log(`\n🚀  Migration vers Sanity (projet: ${projectId}, dataset: ${dataset})\n`)

  // Visites
  console.log('📍  Visites guidées...')
  for (const v of visites) {
    const doc = {
      _id:  `visite-${v.slug}`,
      _type: 'visite',
      titre:            v.titre,
      slug:             { _type: 'slug', current: v.slug },
      sousTitre:        v.sousTitre,
      categorie:        v.categorie,
      duree:            v.duree,
      description:      v.description,
      descriptionCourte: v.descriptionCourte,
      image:            v.image,
      imageDetail:      v.imageDetail ?? null,
      imageCredit:      v.imageCredit ?? null,
      programme:        v.programme ?? null,
      reservation:      v.reservation,
      reservationUrl:   v.reservationUrl ?? null,
      tags:             v.tags,
      niveauActivite:   v.niveauActivite,
      enfantsFriendly:  v.enfantsFriendly,
      ordre:            v.ordre,
    }
    await client.createOrReplace(doc)
    console.log(`   ✓ ${v.titre}`)
  }

  // Articles
  console.log('\n📰  Articles...')
  for (const a of articles) {
    const doc = {
      _id:   `article-${a.slug}`,
      _type: 'article',
      titre:    a.titre,
      slug:     { _type: 'slug', current: a.slug },
      date:     a.date,
      image:    a.image,
      imageAlt: a.imageAlt,
      extrait:  a.extrait,
      contenu:  a.contenu,
      images:   (a.images ?? []).map((img, i) => ({ _key: `img-${i}`, src: img.src, alt: img.alt })),
    }
    await client.createOrReplace(doc)
    console.log(`   ✓ ${a.titre}`)
  }

  // Tarifs
  console.log('\n💶  Tarifs...')
  await client.createOrReplace(tarifs)
  console.log('   ✓ Tarifs 2026')

  console.log('\n✅  Migration terminée ! Vérifie le Studio sur localhost:3000/studio\n')
}

migrate().catch((err) => {
  console.error('\n❌  Erreur :', err.message)
  if (err.message.includes('Unauthorized') || err.message.includes('403')) {
    console.error('\n💡  Token manquant. Ajoute dans .env.local :')
    console.error('    SANITY_API_TOKEN=ton_token')
    console.error('\n    → sanity.io/manage → projet → API → Tokens → Add token (Editor)\n')
  }
  process.exit(1)
})
