/**
 * Articles statiques de fallback (utilisés si Sanity est injoignable).
 * Chaque champ texte est localisé FR / EN / ES.
 */

export interface Article {
  slug: string
  titre: string
  date: string
  image: string
  imageAlt: string
  extrait: string
  contenu: string
  images?: { src: string; alt: string }[]
}

type Locale = 'fr' | 'en' | 'es'
type L = Record<Locale, string>

interface ArticleSource extends Omit<Article, 'titre' | 'imageAlt' | 'extrait' | 'contenu'> {
  i18n: {
    titre:    L
    imageAlt: L
    extrait:  L
    contenu:  L
  }
}

const articlesSource: ArticleSource[] = [
  {
    slug: 'journee-internationale-guides-2022',
    date: '28 mars 2022',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/0-1024x768.jpg',
    images: [
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0005-920x1024.jpg', alt: 'Guides du Bassin d\'Arcachon lors de la Journée Internationale 2022' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0003-1024x711.jpg', alt: 'Quartier du Lapin Blanc, La Teste de Buch' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220217-WA0004-674x1024.jpg', alt: 'Guides officiels en balade dans le quartier du Lapin Blanc' },
    ],
    i18n: {
      titre: {
        fr: 'Journée Internationale des Guides 2022',
        en: 'International Tour Guide Day 2022',
        es: 'Día Internacional de los Guías 2022',
      },
      imageAlt: {
        fr: 'Guides officiels du Bassin d\'Arcachon, Quartier du Lapin Blanc, La Teste de Buch',
        en: 'Official guides of Arcachon Bay, Lapin Blanc District, La Teste de Buch',
        es: 'Guías oficiales de la Bahía de Arcachon, Barrio del Lapin Blanc, La Teste de Buch',
      },
      extrait: {
        fr: 'Retour sur la Journée Internationale des Guides 2022 : une balade dans le quartier méconnu du Lapin Blanc à La Teste de Buch.',
        en: 'A look back at International Tour Guide Day 2022: a stroll through the lesser-known Lapin Blanc district in La Teste de Buch.',
        es: 'Repaso al Día Internacional de los Guías 2022: un paseo por el desconocido barrio del Lapin Blanc en La Teste de Buch.',
      },
      contenu: {
        fr: `Le 21 février est la Journée Internationale des Guides. Et oui, guider est un métier.

Le Lapin Blanc constitue un quartier peu connu de La Teste de Buch, adjacent à l'Aiguillon. Selon la légende, une femme âgée y aurait possédé un lapin doté de pouvoirs miraculeux. Quelques habitations subsistent de cette époque, témoins silencieux d'un passé oublié.

Pour célébrer cette journée, les professionnels du secteur touristique du Bassin ont proposé une reconstitution des moments importants de ce quartier. Une balade entre histoire locale et anecdotes savoureuses, guidée par les conférenciers officiels du Bassin d'Arcachon.

Reportage TVBA publié par Fanny Peyrazat.`,
        en: `21 February is International Tour Guide Day. Yes — guiding is a profession.

Lapin Blanc is a little-known district of La Teste de Buch, next to Aiguillon. According to legend, an elderly woman there owned a rabbit with miraculous powers. A few houses from that era still stand, silent witnesses of a forgotten past.

To celebrate the day, local tourism professionals organised a re-enactment of the district's key moments — a walk blending local history and tasty anecdotes, led by the official guides of Arcachon Bay.

TVBA report published by Fanny Peyrazat.`,
        es: `El 21 de febrero es el Día Internacional de los Guías. Sí, guiar es una profesión.

El Lapin Blanc es un barrio poco conocido de La Teste de Buch, junto a Aiguillon. Según la leyenda, una anciana poseía allí un conejo con poderes milagrosos. Quedan algunas viviendas de esa época, testigos silenciosos de un pasado olvidado.

Para celebrar este día, los profesionales del sector turístico de la Bahía propusieron una reconstrucción de los momentos clave del barrio. Un paseo entre historia local y sabrosas anécdotas, guiado por los conferenciantes oficiales de la Bahía de Arcachon.

Reportaje TVBA publicado por Fanny Peyrazat.`,
      },
    },
  },
  {
    slug: 'fat-bike-foret-littoral',
    date: '25 avril 2022',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/277766484_2223405004475339_634637019580051229_n.jpg',
    images: [
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/P1030717-2-1024x693.jpg', alt: 'Fat bike en forêt de pins landaise' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/277750196_2223405111141995_8856548811987035528_n.jpg', alt: 'Sentier du littoral en fat bike' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/P1030789-1024x683.jpg', alt: 'Fat bike devant les ports ostréicoles' },
      { src: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/Canal_Cazaux-1024x768.jpg', alt: 'Canal de Cazaux depuis les airs' },
    ],
    i18n: {
      titre: {
        fr: 'Entre forêt et littoral en FAT BIKE',
        en: 'Between forest and coast on a FAT BIKE',
        es: 'Entre bosque y litoral en FAT BIKE',
      },
      imageAlt: {
        fr: 'Fat bike devant une cabane ostréicole du Bassin d\'Arcachon',
        en: 'Fat bike in front of an oyster cabin in Arcachon Bay',
        es: 'Fat bike frente a una caseta ostrícola de la Bahía de Arcachon',
      },
      extrait: {
        fr: 'Une nouvelle façon de découvrir le littoral arcachonnais, à bord d\'un fat bike électrique pour glisser entre pinède et Bassin.',
        en: 'A new way to discover the Arcachon coast on an electric fat bike, gliding between pine forest and Bay.',
        es: 'Una nueva forma de descubrir el litoral de Arcachon, en una fat bike eléctrica para deslizarse entre el pinar y la Bahía.',
      },
      contenu: {
        fr: `Une expérience originale et fun pour explorer le Bassin d'Arcachon autrement, à bord d'un fat bike électrique.

La visite débute au Vélotier, situé au parking de Décathlon, pour une balade bucolique à travers les sentiers de la Chêneraie et du littoral. Le parcours traverse plusieurs écosystèmes emblématiques : canaux, forêts de pins, prés salés et ports ostréicoles.

Au fil des pédales, vous découvrirez des paysages insoupçonnés, loin des circuits habituels. L'expérience peut se prolonger par une halte dégustation dans une cabane ostréicole locale, une immersion dans l'atmosphère typique du rivage arcachonnais.

**Tarif :** 60 € par personne (fat bike électrique + accompagnement guide inclus)`,
        en: `An original and fun way to explore Arcachon Bay differently, on an electric fat bike.

The tour starts at Vélotier, by the Decathlon car park, for a peaceful ride through the trails of the Chêneraie and the coast. The route crosses several emblematic ecosystems: canals, pine forests, salt meadows and oyster ports.

As you pedal, you'll discover unexpected landscapes off the beaten track. The experience can be extended with an oyster tasting at a local cabin, an immersion in the typical atmosphere of the Arcachon shore.

**Price:** €60 per person (electric fat bike + guide included)`,
        es: `Una experiencia original y divertida para explorar la Bahía de Arcachon de otra forma, en una fat bike eléctrica.

La visita comienza en Vélotier, junto al aparcamiento de Decathlon, para un paseo bucólico por los senderos de la Chêneraie y del litoral. El recorrido atraviesa varios ecosistemas emblemáticos: canales, bosques de pinos, prados salados y puertos ostrícolas.

Pedaleando, descubrirá paisajes insospechados, lejos de los circuitos habituales. La experiencia puede prolongarse con una degustación en una caseta ostrícola local, una inmersión en la atmósfera típica de la costa de Arcachon.

**Precio:** 60 € por persona (fat bike eléctrica + acompañamiento del guía incluidos)`,
      },
    },
  },
  {
    slug: 'visites-2021-histoire-bains-de-mer',
    date: '11 mai 2021',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/04/71559405_10217253503988131_4387037376052985856_o.jpg',
    i18n: {
      titre: {
        fr: 'Visites 2021 : Histoire des bains de mer',
        en: '2021 Tours: History of seaside bathing',
        es: 'Visitas 2021: Historia de los baños de mar',
      },
      imageAlt: {
        fr: 'Visite guidée sur le front de mer d\'Arcachon, Histoire des bains de mer',
        en: 'Guided tour along Arcachon\'s seafront, History of seaside bathing',
        es: 'Visita guiada en el paseo marítimo de Arcachon, Historia de los baños de mar',
      },
      extrait: {
        fr: 'Retour sur les origines balnéaires d\'Arcachon : comment la ville est devenue l\'une des premières stations de bains de mer de France.',
        en: 'A look back at Arcachon\'s seaside origins: how the town became one of the first seaside resorts in France.',
        es: 'Un repaso a los orígenes balnearios de Arcachon: cómo la ciudad se convirtió en una de las primeras estaciones de baños de mar de Francia.',
      },
      contenu: {
        fr: `À pied, en ma compagnie, longez le front de mer pour découvrir la mode des bains de mer et l'histoire de ceux qui ont créé la station balnéaire d'Arcachon : F. Legallais, A. Deganne ou les Frères Pereire.

Une promenade de deux heures qui retrace la naissance de cette ville unique, imaginée au XIXe siècle pour accueillir les curistes venus se ressourcer au bord du Bassin. Vous terminerez la visite les pieds dans l'eau, comme il se doit.

**Informations pratiques :**
Durée : environ 2 heures
Visites programmées les 21 et 28 mai 2021, de 14h30 à 16h30
Réservations : Office de tourisme d'Arcachon, 05 57 52 97 97

Visites disponibles aussi en famille ou entre amis sur demande directe.`,
        en: `Walk with me along the seafront to discover the seaside-bathing fashion and the story of those who created the resort of Arcachon: F. Legallais, A. Deganne and the Pereire Brothers.

A two-hour stroll that retraces the birth of this unique town, imagined in the 19th century to welcome visitors coming to recharge by the Bay. You'll finish the tour with your feet in the water, as it should be.

**Practical info:**
Duration: about 2 hours
Tours scheduled 21 and 28 May 2021, from 2:30 p.m. to 4:30 p.m.
Bookings: Arcachon Tourist Office, 05 57 52 97 97

Tours also available for families or groups of friends on direct request.`,
        es: `A pie, en mi compañía, recorra el paseo marítimo para descubrir la moda de los baños de mar y la historia de quienes crearon la estación balnearia de Arcachon: F. Legallais, A. Deganne o los Hermanos Pereire.

Un paseo de dos horas que repasa el nacimiento de esta ciudad única, ideada en el siglo XIX para acoger a los curistas que venían a reponerse junto a la Bahía. Terminará la visita con los pies en el agua, como debe ser.

**Información práctica:**
Duración: unas 2 horas
Visitas programadas el 21 y el 28 de mayo de 2021, de 14:30 a 16:30
Reservas: Oficina de turismo de Arcachon, 05 57 52 97 97

Visitas también disponibles en familia o entre amigos previa solicitud directa.`,
      },
    },
  },
  {
    slug: 'journee-internationale-guides-2021',
    date: '24 février 2021',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/02/tourist-_internationnale.jpg',
    i18n: {
      titre: {
        fr: 'Journée Internationale des Guides 2021',
        en: 'International Tour Guide Day 2021',
        es: 'Día Internacional de los Guías 2021',
      },
      imageAlt: {
        fr: 'Journée Internationale des Guides Touristiques',
        en: 'International Tourist Guide Day',
        es: 'Día Internacional de los Guías Turísticos',
      },
      extrait: {
        fr: 'Célébration de la Journée Internationale des Guides, un métier de passion au service de la transmission culturelle, malgré une année marquée par les restrictions sanitaires.',
        en: 'Celebrating International Tour Guide Day — a profession driven by passion for sharing culture, despite a year marked by health restrictions.',
        es: 'Celebración del Día Internacional de los Guías, una profesión apasionada al servicio de la transmisión cultural, pese a un año marcado por las restricciones sanitarias.',
      },
      contenu: {
        fr: `Le 21 février marque la Journée Internationale des Guides, célébrant ce métier unique au monde.

Malgré les périodes de confinement et les restrictions de circulation qui ont marqué 2020 et 2021, les guides officiels du Bassin d'Arcachon ont maintenu leur passion intacte. L'absence des visites de groupes a été difficile à vivre, mais l'enthousiasme pour accueillir et faire découvrir les richesses du patrimoine local reste entier.

Face aux limitations sanitaires, l'équipe a encouragé la privatisation des visites pour continuer à proposer des découvertes du patrimoine en toute sécurité. N'hésitez pas à privatiser votre guide !

**#2021JePrivatiseMonGuide**

Pour l'occasion, les guides ont produit une petite vidéo pleine d'humour présentant leur travail et leur dévouement, parce qu'on peut être sérieux sans se prendre au sérieux.`,
        en: `21 February marks International Tour Guide Day, celebrating this unique profession around the world.

Despite the lockdowns and movement restrictions of 2020 and 2021, the official guides of Arcachon Bay kept their passion intact. The absence of group tours was hard to bear, but the enthusiasm for welcoming visitors and sharing local heritage remains undimmed.

Faced with health restrictions, the team encouraged privatised tours to keep offering safe heritage discoveries. Don't hesitate to privatise your guide!

**#2021IPrivatiseMyGuide**

For the occasion, the guides produced a humorous short video showcasing their work and dedication — because you can be serious without taking yourself too seriously.`,
        es: `El 21 de febrero marca el Día Internacional de los Guías, celebrando esta profesión única en el mundo.

Pese a los confinamientos y las restricciones de circulación que marcaron 2020 y 2021, los guías oficiales de la Bahía de Arcachon mantuvieron intacta su pasión. La ausencia de visitas de grupo fue difícil de vivir, pero el entusiasmo por acoger y dar a conocer el patrimonio local sigue intacto.

Ante las limitaciones sanitarias, el equipo animó a privatizar las visitas para seguir ofreciendo descubrimientos del patrimonio con total seguridad. ¡No dude en privatizar a su guía!

**#2021PrivatizoMiGuía**

Con motivo del día, los guías produjeron un breve vídeo lleno de humor presentando su trabajo y su dedicación, porque uno puede ser serio sin tomarse demasiado en serio.`,
      },
    },
  },
]

// ─── Resolvers ────────────────────────────────────────────────────────────────

export function resolveArticles(locale: Locale = 'fr'): Article[] {
  return articlesSource.map((a) => {
    const { i18n, ...rest } = a
    return {
      ...rest,
      titre:    i18n.titre[locale]    || i18n.titre.fr,
      imageAlt: i18n.imageAlt[locale] || i18n.imageAlt.fr,
      extrait:  i18n.extrait[locale]  || i18n.extrait.fr,
      contenu:  i18n.contenu[locale]  || i18n.contenu.fr,
    }
  })
}

/** Backward-compat : version FR. */
export const articles: Article[] = resolveArticles('fr')
