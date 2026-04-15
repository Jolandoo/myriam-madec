export interface Article {
  slug: string
  titre: string
  date: string
  image: string
  imageAlt: string
  extrait: string
  contenu: string          // HTML simple ou texte long
  images?: { src: string; alt: string }[]
}

export const articles: Article[] = [
    {
    slug: 'journee-internationale-guides-2022',
    titre: 'Journée Internationale des Guides 2022',
    date: '28 mars 2022',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/0-1024x768.jpg',
    imageAlt: 'Guides officiels du Bassin d\'Arcachon — Quartier du Lapin Blanc, La Teste de Buch',
    extrait: 'Retour sur la Journée Internationale des Guides 2022 — une balade dans le quartier méconnu du Lapin Blanc à La Teste de Buch.',
    contenu: `Le 21 février est la Journée Internationale des Guides. Et oui, guider est un métier.

Le Lapin Blanc constitue un quartier peu connu de La Teste de Buch, adjacent à l'Aiguillon. Selon la légende, une femme âgée y aurait possédé un lapin doté de pouvoirs miraculeux. Quelques habitations subsistent de cette époque, témoins silencieux d'un passé oublié.

Pour célébrer cette journée, les professionnels du secteur touristique du Bassin ont proposé une reconstitution des moments importants de ce quartier. Une balade entre histoire locale et anecdotes savoureuses, guidée par les conférenciers officiels du Bassin d'Arcachon.

Reportage TVBA publié par Fanny Peyrazat.`,
    images: [
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0005-920x1024.jpg', alt: 'Guides du Bassin d\'Arcachon lors de la Journée Internationale 2022' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0003-1024x711.jpg', alt: 'Quartier du Lapin Blanc, La Teste de Buch' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0004-674x1024.jpg', alt: 'Guides officiels en balade dans le quartier du Lapin Blanc' },
    ],
  },
  {
    slug: 'fat-bike-foret-littoral',
    titre: 'Entre forêt et littoral en FAT BIKE',
    date: '25 avril 2022',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/277766484_2223405004475339_634637019580051229_n.jpg',
    imageAlt: 'Fat bike devant une cabane ostréicole du Bassin d\'Arcachon',
    extrait: 'Une nouvelle façon de découvrir le littoral arcachonnais — à bord d\'un fat bike électrique pour glisser entre pinède et Bassin.',
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
    imageAlt: 'Visite guidée sur le front de mer d\'Arcachon — Histoire des bains de mer',
    extrait: 'Retour sur les origines balnéaires d\'Arcachon — comment la ville est devenue l\'une des premières stations de bains de mer de France.',
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
    extrait: 'Célébration de la Journée Internationale des Guides — un métier de passion au service de la transmission culturelle, malgré une année marquée par les restrictions sanitaires.',
    contenu: `Le 21 février marque la Journée Internationale des Guides, célébrant ce métier unique au monde.

Malgré les périodes de confinement et les restrictions de circulation qui ont marqué 2020 et 2021, les guides officiels du Bassin d'Arcachon ont maintenu leur passion intacte. L'absence des visites de groupes a été difficile à vivre, mais l'enthousiasme pour accueillir et faire découvrir les richesses du patrimoine local reste entier.

Face aux limitations sanitaires, l'équipe a encouragé la privatisation des visites pour continuer à proposer des découvertes du patrimoine en toute sécurité. N'hésitez pas à privatiser votre guide !

**#2021JePrivatiseMonGuide**

Pour l'occasion, les guides ont produit une petite vidéo pleine d'humour présentant leur travail et leur dévouement — parce qu'on peut être sérieux sans se prendre au sérieux.`,
  },
]
