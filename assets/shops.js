// Data för butikssidor och pris-jämförelser.
// Verkliga produkter och priser hämtade direkt från butikerna 2026-05-17.
// Båda butikerna ägs av Svenska Hälsogruppen — basprislistan delas, men
// kampanjer skiljer sig från vecka till vecka. Uppdatera regelbundet.
const SHOPS = [
  {
    id: "svenskt_kosttillskott",
    slug: "svenskt-kosttillskott",
    name: "Svenskt Kosttillskott",
    short: "SK",
    logo: "assets/logos/svenskt-kosttillskott.png",
    color: "#1F4730",
    location: "Helsingborg",
    pretty_link: "/go/svenskt-kosttillskott/",
    clean_url: "https://www.svensktkosttillskott.se",
    tagline: "Sportkost-fokus med eget Core-märke. Vassast kampanjer på basvaror som protein och kreatin.",
    strengths: [
      "Eget Core-märke ger lägst grundpris på whey, kreatin, BCAA och omega-3",
      "Återkommande kampanjer på Core-serien — ofta 20–30 % rabatt",
      "Brett urval av sportnutrition: RAW, Optimum Nutrition, Bodylab, Trainimal"
    ],
    weaknesses: [
      "Mindre fokus på naturmedel, adaptogener och premium-vitaminer",
      "Sortimentet inom örtbaserade tillskott är begränsat"
    ],
    price_level: "Lågt till medel",
    top_products: [
      { name: "Core Whey Protein 1 kg",        price: 349, normal: 349 },
      { name: "Core Creatine 300 g",            price: 124, normal: 155 },
      { name: "Core Vitamins Man 120 kaps",     price: 167, normal: 239 },
      { name: "Core BCAA Powder 400 g",         price: 259, normal: 259 },
      { name: "Core Omega-3+ 120 kaps",         price: 155, normal: 155 }
    ]
  },
  {
    id: "svensk_halsokost",
    slug: "svensk-halsokost",
    name: "Svensk Hälsokost",
    short: "SH",
    logo: "assets/logos/svensk-halsokost.png",
    color: "#1F4730",
    location: "Stockholm",
    pretty_link: "/go/svensk-halsokost/",
    clean_url: "https://www.svenskhalsokost.se",
    tagline: "Hälsofokus med starkt utbud av vitaminer, omega-3 och naturmedel. Premium-serier som Holistic, Healthwell och Thorne.",
    strengths: [
      "Bredast urval av vitaminer, mineraler och adaptogener",
      "Premium-omega och algoljor från Holistic, ArcticMed och Minami",
      "Specialistmärken som Thorne och Better You till stamkundspris"
    ],
    weaknesses: [
      "Sportkost-sortimentet smalare (ingen gainer eller pre-workout-bredd)",
      "Färre kampanjer på basvaror jämfört med systerbutiken"
    ],
    price_level: "Medel till premium",
    top_products: [
      { name: "Healthwell Omega-3 Plus 120 kaps",     price: 155, normal: 155 },
      { name: "Healthwell Multivitamin Kvinna 90 kaps", price: 239, normal: 239 },
      { name: "Holistic Vassleprotein 750 g",         price: 264, normal: 330 },
      { name: "Pureness Kreatin Creapure 250 g",      price: 175, normal: 219 },
      { name: "Holistic Omega-3 Algolja 60 kaps",     price: 193, normal: 241 }
    ]
  }
];

if (typeof module !== "undefined") module.exports = { SHOPS };
