import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
const env = {}
try {
  readFileSync(envPath, 'utf-8').split('\n').forEach((line) => {
    const [key, ...val] = line.split('=')
    if (key && val.length) env[key.trim()] = val.join('=').trim()
  })
} catch { /* ignore */ }

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  token: env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── VISITES ───────────────────────────────────────────────

const visiteTranslations = {
  'visite-origines-arcachon': {
    en: {
      titre: 'The Origins of Arcachon',
      sousTitre: 'History of sea bathing',
      descriptionCourte: 'Along the seafront, trace the birth of Arcachon through its founders.',
      description: 'Walking along the seafront, you will discover the fashion of sea bathing and the history of those who created the seaside resort of Arcachon: François Legallais, Aldebert Deganne and the Pereire Brothers. And why not finish with your feet in the water.',
    },
    es: {
      titre: 'Los Orígenes de Arcachon',
      sousTitre: 'Historia de los baños de mar',
      descriptionCourte: 'A lo largo del paseo marítimo, recorra el nacimiento de Arcachon a través de sus fundadores.',
      description: 'Recorriendo el paseo marítimo, descubrirá la moda de los baños de mar y la historia de quienes crearon la estación balnearia de Arcachon: François Legallais, Aldebert Deganne o los Hermanos Pereire. Y por qué no terminar con los pies en el agua.',
    },
  },
  'visite-balades-bateau': {
    en: {
      titre: 'Arcachon Bay by Boat',
      sousTitre: 'Boat trips',
      descriptionCourte: 'Bird Island, Tchanquées Cabins, Arguin Sandbank — the Bay from the water.',
      description: 'Set sail towards the Tchanquées Cabins for a tour of Bird Island, with or without a stop at Cap Ferret. All the charms of the Arcachon Bay are yours to discover: an oyster village, oyster parks, oyster tasting, the Arguin Sandbank and the Pilat Dune, a bike ride, and a visit to the Cap Ferret lighthouse.',
    },
    es: {
      titre: 'Bahía de Arcachon en Barco',
      sousTitre: 'Paseos en barco',
      descriptionCourte: 'Isla de los Pájaros, Cabañas Tchanquées, Banco de Arguin — la Bahía desde el agua.',
      description: 'Embarque hacia las Cabañas Tchanquées para un recorrido por la Isla de los Pájaros, con o sin escala en Cap Ferret. Todos los encantos de la Bahía de Arcachon se ofrecen ante usted: descubrimiento de un pueblo ostrícola, los parques de ostras, degustación de ostras, el Banco de Arguin y la Duna de Pilat, paseo en bicicleta, visita del faro de Cap Ferret.',
    },
  },
  'visite-bunker-502': {
    en: {
      titre: 'Bunker 502',
      sousTitre: 'Arcachon under the Occupation',
      descriptionCourte: 'An Atlantic Wall bunker rediscovered in 2015 — dive into wartime Arcachon.',
      description: "After the war, the Atlantic Wall bunkers around the Arcachon Bay were looted, scrapped, destroyed, buried or submerged. In late 1946, Bunker 502 was razed at the mayor's request for aesthetic and safety reasons. It vanished for decades — until 2015, when a parking project revealed its existence beneath the tourist office. I invite you to plunge into this period of our history and discover life in Arcachon during the Occupation.",
    },
    es: {
      titre: 'Búnker 502',
      sousTitre: 'Arcachon bajo la Ocupación',
      descriptionCourte: 'Un búnker del Muro Atlántico redescubierto en 2015 — sumérjase en el Arcachon de la Ocupación.',
      description: 'Después de la guerra, los búnkeres del Muro Atlántico en la Bahía de Arcachon fueron saqueados, desguazados, destruidos, enterrados o sumergidos. A finales de 1946, el búnker 502 fue arrasado a petición del alcalde por razones estéticas y de seguridad. Desapareció durante décadas — hasta 2015, cuando un proyecto de aparcamiento reveló su existencia bajo la oficina de turismo. Les invito a sumergirse en este período de nuestra historia y descubrir la vida en Arcachon durante la Ocupación.',
    },
  },
  'visite-velo-ville-hiver': {
    en: {
      titre: 'From Pereire to Winter Town',
      sousTitre: 'Electric bike ride',
      descriptionCourte: "From the beach to Winter Town on an electric mountain bike, through the forest's bridle paths.",
      description: 'Discover the origins of Winter Town, following in the footsteps of the Pereire Brothers. On an electric mountain bike, I offer you an off-the-beaten-track tour, from the beach, through the forest, along the bridle paths, to Winter Town. You can extend this visit at the top of the Belvedere, with the most beautiful view over Winter Town.',
    },
    es: {
      titre: 'De Pereire a la Villa de Invierno',
      sousTitre: 'Paseo en bicicleta eléctrica',
      descriptionCourte: 'De la playa a la Villa de Invierno en bicicleta eléctrica, por los caminos ecuestres del bosque.',
      description: 'En los orígenes de la Villa de Invierno, tras los pasos de los Hermanos Pereire. En bicicleta eléctrica de montaña, le propongo una visita fuera de los circuitos habituales, desde la playa, a través del bosque, por los caminos ecuestres, hasta la Villa de Invierno. Podrá prolongar esta visita en lo alto del Belvedere, con la vista más hermosa sobre la Villa de Invierno.',
    },
  },
  'visite-decouverte-archeologique': {
    en: {
      titre: 'Archaeological Discovery',
      sousTitre: 'Of the Pilat Dune',
      descriptionCourte: '4,500 years of history revealed by archaeological digs — and a descent towards the sea.',
      description: "A classified and protected natural site, a breathtaking panorama, a playground for the little ones — it is also a heritage archive that, thanks to archaeological excavations, tells us the story of the Pays de Buch and its inhabitants since prehistory. Learn everything about the 4,500 years of history of Europe's tallest dune. I will suggest ending this ascent by rediscovering your inner child, running down the gentle ocean slope towards a well-deserved swim.",
    },
    es: {
      titre: 'Descubrimiento Arqueológico',
      sousTitre: 'De la Duna de Pilat',
      descriptionCourte: '4 500 años de historia revelados por las excavaciones arqueológicas — y un descenso hacia el mar.',
      description: 'Sitio natural clasificado y protegido, panorama impresionante, terreno de juego para los más pequeños — es también un archivo patrimonial que, gracias a las excavaciones arqueológicas, nos cuenta la historia del País de Buch y sus habitantes desde la prehistoria. Descubra todo sobre los 4 500 años de historia de la duna más alta de Europa. Le propondré terminar esta ascensión recuperando su alma de niño, bajando la suave pendiente oceánica hacia un merecido baño de mar.',
    },
  },
  'visite-criee-arcachon': {
    en: {
      titre: 'The Arcachon Fish Auction',
      sousTitre: 'Discover local fishing',
      descriptionCourte: 'Meet at 6:15 AM for a behind-the-scenes look at fishing — from landing to auction.',
      description: "Don't leave Arcachon without attending this captivating visit that takes young and old behind the scenes of local fishing. To immerse yourself in the world of fishing and experience the buzz of this unique place, there is only one rule: get up early! I'll meet you at 6:15 AM to take you into a world reserved for sea professionals. Follow the entire journey of the fish, from catch to dispatch: landing, weighing, grading, fish processing, and auctions.",
    },
    es: {
      titre: 'La Lonja del Puerto de Arcachon',
      sousTitre: 'Descubra la pesca local',
      descriptionCourte: 'Cita a las 6:15 para descubrir los entresijos de la pesca — de la descarga a la subasta.',
      description: 'No se vaya de Arcachon sin haber asistido a esta visita cautivadora que transporta a grandes y pequeños a los entresijos de la pesca local. Para sumergirse en el universo de la pesca y vivir la efervescencia de este lugar único, una sola consigna: ¡madrugar! Es a las 6:15 cuando le espero para hacerle entrar en un mundo reservado a los profesionales del mar. Recorra el camino completo del pescado, de la pesca a la expedición: descarga, pesaje, calibración, procesamiento, subastas.',
    },
  },
  'visite-dune-lever-soleil': {
    en: {
      titre: 'The Pilat Dune at Sunrise',
      sousTitre: 'Between ocean and forest',
      descriptionCourte: "Departure at 6 AM to climb the dune in silence — sunrise from Europe's tallest dune.",
      description: "Experience a unique moment enjoying the magical colour palette of the sunrise. Departure around 6 AM, a silent ascent of Europe's tallest dune, before the first rays set ablaze the Bay, the Landes forest and the Atlantic.",
    },
    es: {
      titre: 'La Duna de Pilat al Amanecer',
      sousTitre: 'Entre océano y bosque',
      descriptionCourte: 'Salida a las 6h para subir la duna en silencio — el amanecer desde la duna más alta de Europa.',
      description: 'Viva una experiencia única disfrutando de la magia de la paleta de colores del amanecer. Salida hacia las 6 de la mañana, ascenso en silencio a la duna más alta de Europa, antes de que los primeros rayos incendien la Bahía, el bosque de las Landas y el Atlántico.',
    },
  },
  'visite-littoral-velo': {
    en: {
      titre: 'The Arcachon Coastline',
      sousTitre: 'Spring Town bike ride',
      descriptionCourte: 'Pereire, Abatilles, Moulleau — the Arcachon coastline neighbourhood by neighbourhood, with artisan ice cream.',
      description: "We are all eager to get back to the beach and its atmosphere — that's why I offer you this discovery of the different vibes of Arcachon's neighbourhoods, Pereire, Abatilles and Moulleau, along the coastline. We'll extend this pleasure by tasting artisan ice cream or taking a carousel ride.",
    },
    es: {
      titre: 'El Litoral de Arcachon',
      sousTitre: 'Paseo en la Villa de Primavera',
      descriptionCourte: 'Pereire, Abatilles, Moulleau — el litoral de Arcachon barrio por barrio, con helado artesanal.',
      description: 'Todos estamos impacientes por volver a la playa y su ambiente — por eso le propongo este descubrimiento de los diferentes ambientes de los barrios de Arcachon, Pereire, Abatilles y Moulleau, recorriendo el litoral. Prolongaremos este placer degustando un helado artesanal o dando una vuelta en el carrusel.',
    },
  },
  'visite-pres-sales-pied': {
    en: {
      titre: 'Salt Meadows Walk',
      sousTitre: 'From port to port',
      descriptionCourte: "The old fishermen's quarter, the salt meadows and — optionally — an oyster tasting.",
      description: "Discover this old fishermen's quarter that settled in the salt meadows. Fishing, sailing, oyster farming, fauna and flora. We can extend this visit with a convivial moment, tasting oysters in an oyster cabin.",
    },
    es: {
      titre: 'Senderismo por los Prados Salados',
      sousTitre: 'De puerto en puerto',
      descriptionCourte: 'El antiguo barrio de pescadores, los prados salados y — opcionalmente — una degustación de ostras.',
      description: 'Descubrimiento de este antiguo barrio de pescadores que se instaló en los prados salados. Pesca, navegación, ostricultura, fauna y flora. Podremos prolongar esta visita con un momento de convivencia, degustando ostras en una cabaña ostrícola.',
    },
  },
  'visite-velo-pres-sales': {
    en: {
      titre: 'Salt Meadows by E-Bike',
      sousTitre: 'From port to port',
      descriptionCourte: 'The salt meadows and oyster ports by electric bike — with optional tasting.',
      description: "Discover this old fishermen's quarter that settled in the salt meadows. Fishing, sailing, oyster farming, fauna and flora. We can extend this visit with a convivial moment, tasting oysters in an oyster cabin.",
    },
    es: {
      titre: 'Prados Salados en Bici Eléctrica',
      sousTitre: 'De puerto en puerto',
      descriptionCourte: 'Los prados salados y los puertos ostrícolas en bicicleta eléctrica — con degustación posible.',
      description: 'Descubrimiento de este antiguo barrio de pescadores que se instaló en los prados salados. Pesca, navegación, ostricultura, fauna y flora. Podremos prolongar esta visita con un momento de convivencia, degustando ostras en una cabaña ostrícola.',
    },
  },
  'visite-randonnee-crete': {
    en: {
      titre: 'Dune Crest Hike',
      sousTitre: 'On the dune crest',
      descriptionCourte: '3 km of crest at 100 m altitude, with options for a beach return or lunch at Le Panorama.',
      description: 'From the top of its hundred metres, set off on a hike along the 3 kilometres of the crest. Several options are available: return via the beach, or breakfast and lunch at Le Panorama restaurant with a return by beach or bus.',
    },
    es: {
      titre: 'Senderismo por la Cresta de la Duna',
      sousTitre: 'Sobre la cresta de la duna',
      descriptionCourte: '3 km de cresta a 100 m de altitud, con opciones de vuelta por la playa o almuerzo en Le Panorama.',
      description: 'Desde lo alto de sus cien metros, parta en senderismo por los 3 kilómetros de la cresta. Varias opciones se ofrecen a usted: regreso por la playa, o desayuno y almuerzo en el restaurante Le Panorama con regreso por la playa o en autobús.',
    },
  },
  'visite-sentier-littoral': {
    en: {
      titre: 'The Coastal Path',
      sousTitre: 'In the heart of Arcachon Bay',
      descriptionCourte: 'From the Teich Reserve to the ports of Gujan-Mestras — nature and oysters in the heart of the Bay.',
      description: "On the Coastal Path, from the Teich Bird Reserve towards the oyster ports of Gujan-Mestras, soak in the atmosphere of the natural sites at the heart of the Arcachon Bay. We can extend this visit with a convivial moment, tasting oysters in an oyster cabin.",
    },
    es: {
      titre: 'El Sendero del Litoral',
      sousTitre: 'En el corazón de la Bahía de Arcachon',
      descriptionCourte: 'De la Reserva del Teich a los puertos de Gujan-Mestras — naturaleza y ostras en el corazón de la Bahía.',
      description: 'Por el Sendero del Litoral, desde la Reserva Ornitológica del Teich hacia los puertos ostrícolas de Gujan-Mestras, imprégnese del ambiente de los sitios naturales del corazón de la Bahía de Arcachon. Podremos prolongar esta visita con un momento de convivencia, degustando ostras en una cabaña ostrícola.',
    },
  },
  'visite-ville-hiver': {
    en: {
      titre: 'Winter Town',
      sousTitre: 'History and architecture',
      descriptionCourte: 'Stroll among the Belle Époque villas created by the Pereire Brothers for visitors from around the world.',
      description: 'Follow me through the lanes of Winter Town to discover this remarkable 19th-century architecture. Designed as an English garden, it invites us to stroll while admiring its superb "chalets". Created by the Pereire Brothers to welcome health seekers from around the world, I invite you to follow in their footsteps, while enjoying the balsamic fragrances of this Arcachon neighbourhood.',
    },
    es: {
      titre: 'La Villa de Invierno',
      sousTitre: 'Historia y arquitectura',
      descriptionCourte: 'Pasee entre las villas Belle Époque creadas por los Hermanos Pereire para los visitantes de todo el mundo.',
      description: 'Sígame por las calles de la Villa de Invierno para descubrir esta arquitectura notable del siglo XIX. Concebida como un jardín inglés, nos invita a pasear admirando sus soberbios "chalets". Creada por los Hermanos Pereire para acoger a curistas del mundo entero, le invito a seguir sus pasos, disfrutando de los efluvios balsámicos de este barrio de Arcachon.',
    },
  },
}

// ─── ARTICLES ──────────────────────────────────────────────

const articleTranslations = {
  'article-fat-bike-foret-littoral': {
    en: {
      titre: 'Forest & Coast by Fat Bike',
      imageAlt: 'Fat bike in front of an oyster cabin in Arcachon Bay',
      extrait: 'A new way to discover the Arcachon coastline — aboard an electric fat bike, gliding between pine forest and Bay.',
      contenu: "An original and fun experience to explore Arcachon Bay differently — aboard an electric fat bike.\n\nThe tour starts at Le Vélotier, located at the Décathlon car park, for a bucolic ride through the trails of the Chêneraie and the coastline. The route crosses several iconic ecosystems: canals, pine forests, salt meadows and oyster ports.\n\nAs you pedal along, you'll discover unsuspected landscapes, far from the usual circuits. The experience can be extended with a tasting stop at a local oyster cabin — an immersion in the typical atmosphere of the Arcachon shore.\n\n**Price:** €60 per person (electric fat bike + guide included)",
    },
    es: {
      titre: 'Bosque y Litoral en Fat Bike',
      imageAlt: 'Fat bike frente a una cabaña ostrícola de la Bahía de Arcachon',
      extrait: 'Una nueva forma de descubrir el litoral de Arcachon — a bordo de una fat bike eléctrica entre pinares y Bahía.',
      contenu: "Una experiencia original y divertida para explorar la Bahía de Arcachon de otra manera — a bordo de una fat bike eléctrica.\n\nLa visita comienza en Le Vélotier, situado en el aparcamiento de Décathlon, para un paseo bucólico por los senderos de la Chêneraie y el litoral. El recorrido atraviesa varios ecosistemas emblemáticos: canales, bosques de pinos, prados salados y puertos ostrícolas.\n\nPedaleando, descubrirá paisajes insospechados, lejos de los circuitos habituales. La experiencia puede prolongarse con una parada de degustación en una cabaña ostrícola local — una inmersión en la atmósfera típica de la costa de Arcachon.\n\n**Tarifa:** 60 € por persona (fat bike eléctrica + acompañamiento de guía incluido)",
    },
  },
  'article-journee-internationale-guides-2021': {
    en: {
      titre: 'International Tour Guide Day 2021',
      imageAlt: 'International Tourist Guide Day',
      extrait: 'Celebrating International Tour Guide Day — a profession driven by passion and cultural sharing, despite a year marked by health restrictions.',
      contenu: "February 21st marks International Tour Guide Day, celebrating this unique profession.\n\nDespite the lockdowns and travel restrictions that marked 2020 and 2021, the official guides of Arcachon Bay kept their passion intact. The absence of group tours was hard to bear, but the enthusiasm for welcoming visitors and sharing the local heritage remains unwavering.\n\nFacing health limitations, the team encouraged private tours to continue offering heritage discoveries in complete safety. Don't hesitate to book your own private guide!\n\n**#2021BookYourPrivateGuide**\n\nFor the occasion, the guides produced a short, humorous video presenting their work and dedication — because you can be serious without taking yourself too seriously.",
    },
    es: {
      titre: 'Día Internacional de los Guías 2021',
      imageAlt: 'Día Internacional de los Guías Turísticos',
      extrait: 'Celebración del Día Internacional de los Guías — una profesión de pasión al servicio de la transmisión cultural, a pesar de un año marcado por las restricciones sanitarias.',
      contenu: "El 21 de febrero marca el Día Internacional de los Guías, celebrando esta profesión única en el mundo.\n\nA pesar de los confinamientos y las restricciones de circulación que marcaron 2020 y 2021, los guías oficiales de la Bahía de Arcachon mantuvieron intacta su pasión. La ausencia de visitas en grupo fue difícil de sobrellevar, pero el entusiasmo por acoger y dar a conocer las riquezas del patrimonio local sigue intacto.\n\nAnte las limitaciones sanitarias, el equipo fomentó la privatización de las visitas para seguir ofreciendo descubrimientos del patrimonio con total seguridad. ¡No dude en privatizar su guía!\n\n**#2021PrivatizoMiGuía**\n\nPara la ocasión, los guías produjeron un pequeño vídeo lleno de humor presentando su trabajo y su dedicación — porque se puede ser serio sin tomarse demasiado en serio.",
    },
  },
  'article-journee-internationale-guides-2022': {
    en: {
      titre: 'International Tour Guide Day 2022',
      imageAlt: 'Official guides of Arcachon Bay — Lapin Blanc quarter, La Teste de Buch',
      extrait: 'A look back at International Tour Guide Day 2022 — a walk through the little-known Lapin Blanc quarter in La Teste de Buch.',
      contenu: "February 21st is International Tour Guide Day. Yes, guiding is a real profession.\n\nThe Lapin Blanc is a little-known quarter of La Teste de Buch, adjacent to l'Aiguillon. According to legend, an elderly woman once owned a rabbit with miraculous powers. A few dwellings remain from that era, silent witnesses of a forgotten past.\n\nTo celebrate this day, tourism professionals from the Bay offered a re-enactment of key moments from this quarter's history. A walk between local history and colourful anecdotes, led by the official guides of Arcachon Bay.\n\nTVBA report published by Fanny Peyrazat.",
    },
    es: {
      titre: 'Día Internacional de los Guías 2022',
      imageAlt: 'Guías oficiales de la Bahía de Arcachon — Barrio del Lapin Blanc, La Teste de Buch',
      extrait: 'Repaso del Día Internacional de los Guías 2022 — un paseo por el desconocido barrio del Lapin Blanc en La Teste de Buch.',
      contenu: "El 21 de febrero es el Día Internacional de los Guías. Sí, guiar es una profesión.\n\nEl Lapin Blanc constituye un barrio poco conocido de La Teste de Buch, adyacente a l'Aiguillon. Según la leyenda, una mujer mayor habría poseído un conejo con poderes milagrosos. Algunas viviendas subsisten de esa época, testigos silenciosos de un pasado olvidado.\n\nPara celebrar esta jornada, los profesionales del sector turístico de la Bahía propusieron una reconstitución de los momentos importantes de este barrio. Un paseo entre historia local y anécdotas sabrosas, guiado por los conferenciantes oficiales de la Bahía de Arcachon.\n\nReportaje TVBA publicado por Fanny Peyrazat.",
    },
  },
  'article-visites-2021-histoire-bains-de-mer': {
    en: {
      titre: '2021 Tours: History of Sea Bathing',
      imageAlt: 'Guided tour on the Arcachon seafront — History of sea bathing',
      extrait: "A look back at Arcachon's seaside origins — how the town became one of France's first sea bathing resorts.",
      contenu: "On foot, in my company, walk along the seafront to discover the fashion of sea bathing and the history of those who created the seaside resort of Arcachon: F. Legallais, A. Deganne and the Pereire Brothers.\n\nA two-hour walk that traces the birth of this unique town, imagined in the 19th century to welcome health seekers coming to recharge by the Bay. You'll finish the tour with your feet in the water — as it should be.\n\n**Practical information:**\nDuration: approximately 2 hours\nScheduled tours on 21 and 28 May 2021, from 2:30 PM to 4:30 PM\nBookings: Arcachon Tourist Office — 05 57 52 97 97\n\nTours also available for families or friends on direct request.",
    },
    es: {
      titre: 'Visitas 2021: Historia de los baños de mar',
      imageAlt: 'Visita guiada en el paseo marítimo de Arcachon — Historia de los baños de mar',
      extrait: 'Repaso de los orígenes balnearios de Arcachon — cómo la ciudad se convirtió en una de las primeras estaciones de baños de mar de Francia.',
      contenu: "A pie, en mi compañía, recorra el paseo marítimo para descubrir la moda de los baños de mar y la historia de quienes crearon la estación balnearia de Arcachon: F. Legallais, A. Deganne o los Hermanos Pereire.\n\nUn paseo de dos horas que recorre el nacimiento de esta ciudad única, imaginada en el siglo XIX para acoger a los curistas que venían a reponerse junto a la Bahía. Terminará la visita con los pies en el agua — como debe ser.\n\n**Información práctica:**\nDuración: aproximadamente 2 horas\nVisitas programadas los días 21 y 28 de mayo de 2021, de 14:30 a 16:30\nReservas: Oficina de turismo de Arcachon — 05 57 52 97 97\n\nVisitas disponibles también en familia o entre amigos bajo petición directa.",
    },
  },
}

// ─── TARIFS ────────────────────────────────────────────────

const tarifsTranslations = {
  lignes: {
    '2h':  { en: '2 hours', es: '2 horas' },
    '3h':  { en: '3 hours', es: '3 horas' },
    '4h':  { en: '4 hours', es: '4 horas' },
    '5h':  { en: '5 hours', es: '5 horas' },
    '6h':  { en: '6 hours', es: '6 horas' },
    '7h':  { en: '7 hours', es: '7 horas' },
    'jj':  { en: 'Full day', es: 'Día completo' },
  },
  conditions: {
    'cond-0': { en: 'Prices include all taxes (VAT included).', es: 'Tarifas con todos los impuestos incluidos (IVA incluido).' },
    'cond-1': { en: 'Services on May 1st and January 1st are charged at double rate.', es: 'Servicios el 1 de mayo y el 1 de enero con tarifa doble.' },
    'cond-2': { en: 'Bookings over one day: 30% deposit at reservation.', es: 'Reservas de más de un día: anticipo del 30% en la reserva.' },
    'cond-3': { en: "Site entrance fees and guide's meals not included — at the client's expense.", es: 'Entradas a sitios y comidas del guía no incluidas — a cargo del cliente.' },
    'cond-4': { en: 'Tastings, boat trips and bike rentals not included.', es: 'Degustaciones, paseos en barco y alquiler de bicicletas no incluidos.' },
  },
  annulation: {
    '48h': {
      delai:   { en: 'Cancellation at 48h', es: 'Cancelación a 48h' },
      montant: { en: '50% of the service amount', es: '50% del importe de la prestación' },
    },
    '24h': {
      delai:   { en: 'Cancellation at 24h', es: 'Cancelación a 24h' },
      montant: { en: '100% of the service amount', es: '100% del importe de la prestación' },
    },
  },
  note: { en: 'Walking groups: minimum 30 people · Cycling groups: minimum 15 people', es: 'Grupos a pie: mínimo 30 personas · Grupos en bicicleta: mínimo 15 personas' },
}

// ─── PAGE GUIDE ────────────────────────────────────────────

const pageGuideTranslations = {
  heroTitle:       { en: 'Myriam Madec', es: 'Myriam Madec' },
  heroDescription: { en: 'Official guide of Arcachon Bay since 1994.', es: 'Guía oficial de la Bahía de Arcachon desde 1994.' },
  citation:        { en: 'Unforgettable tours etched in your memory.', es: 'Visitas inolvidables grabadas en su memoria.' },
  bio: {
    'bio-0': {
      en: "Passionate about the heritage and history of Arcachon Bay, I have been guiding you for over 30 years through a territory of exceptional richness. As an official National Interpreter Guide, I offer tours in French, English and Spanish, for all audiences: families, groups, schools, and businesses.",
      es: 'Apasionada por el patrimonio y la historia de la Bahía de Arcachon, les acompaño desde hace más de 30 años en el descubrimiento de un territorio de riqueza excepcional. Guía Intérprete Nacional oficial, propongo visitas en francés, inglés y español, para todo tipo de público: familias, grupos, colegios, empresas.',
    },
    'bio-1': {
      en: "My ambition: to offer you much more than a tour. A moment of sharing, curiosity and wonder. Whether it's the lanes of Winter Town, the salt meadows or the sunrise over the Pilat Dune, each outing is an authentic encounter with the Bay.",
      es: 'Mi ambición: ofrecerles mucho más que una visita. Un momento de intercambio, de curiosidad y de asombro. Ya sean las calles de la Villa de Invierno, los prados salados o el amanecer sobre la Duna de Pilat, cada salida es un encuentro auténtico con la Bahía.',
    },
  },
}

// ─── APPLY PATCHES ─────────────────────────────────────────

let patched = 0
let errors = 0

async function patchDoc(id, patches) {
  try {
    let tx = client.patch(id)
    for (const [path, value] of Object.entries(patches)) {
      tx = tx.set({ [path]: value })
    }
    await tx.commit()
    patched++
    console.log(`  ✓ ${id}`)
  } catch (err) {
    errors++
    console.error(`  ✗ ${id}: ${err.message}`)
  }
}

console.log('─── Visites (13) ───')
for (const [id, langs] of Object.entries(visiteTranslations)) {
  const patches = {}
  for (const [lang, fields] of Object.entries(langs)) {
    for (const [field, value] of Object.entries(fields)) {
      patches[`${field}.${lang}`] = value
    }
  }
  await patchDoc(id, patches)
}

console.log('\n─── Articles (4) ───')
for (const [id, langs] of Object.entries(articleTranslations)) {
  const patches = {}
  for (const [lang, fields] of Object.entries(langs)) {
    for (const [field, value] of Object.entries(fields)) {
      patches[`${field}.${lang}`] = value
    }
  }
  await patchDoc(id, patches)
}

console.log('\n─── Tarifs ───')
{
  const patches = {}
  patches['note.en'] = tarifsTranslations.note.en
  patches['note.es'] = tarifsTranslations.note.es

  // We need to patch array items by key, so we fetch and rebuild
  const tarifs = await client.fetch('*[_type == "tarifs"][0]')

  for (const ligne of tarifs.lignes) {
    const t = tarifsTranslations.lignes[ligne._key]
    if (t) {
      ligne.duree.en = t.en
      ligne.duree.es = t.es
    }
  }
  for (const cond of tarifs.conditions) {
    const t = tarifsTranslations.conditions[cond._key]
    if (t) {
      cond.en = t.en
      cond.es = t.es
    }
  }
  for (const ann of tarifs.annulation) {
    const t = tarifsTranslations.annulation[ann._key]
    if (t) {
      ann.delai.en = t.delai.en
      ann.delai.es = t.delai.es
      ann.montant.en = t.montant.en
      ann.montant.es = t.montant.es
    }
  }

  try {
    await client.patch('singleton-tarifs')
      .set({
        'note.en': tarifsTranslations.note.en,
        'note.es': tarifsTranslations.note.es,
        lignes: tarifs.lignes,
        conditions: tarifs.conditions,
        annulation: tarifs.annulation,
      })
      .commit()
    patched++
    console.log('  ✓ singleton-tarifs')
  } catch (err) {
    errors++
    console.error(`  ✗ singleton-tarifs: ${err.message}`)
  }
}

console.log('\n─── Page Guide ───')
{
  const patches = {}
  patches['heroTitle.en'] = pageGuideTranslations.heroTitle.en
  patches['heroTitle.es'] = pageGuideTranslations.heroTitle.es
  patches['heroDescription.en'] = pageGuideTranslations.heroDescription.en
  patches['heroDescription.es'] = pageGuideTranslations.heroDescription.es
  patches['citation.en'] = pageGuideTranslations.citation.en
  patches['citation.es'] = pageGuideTranslations.citation.es

  const guide = await client.fetch('*[_type == "pageGuide"][0]')
  for (const bio of guide.bio) {
    const t = pageGuideTranslations.bio[bio._key]
    if (t) {
      bio.en = t.en
      bio.es = t.es
    }
  }
  patches['bio'] = guide.bio

  await patchDoc('singleton-page-guide', patches)
}

console.log(`\n✅ Done — ${patched} patched, ${errors} errors`)
