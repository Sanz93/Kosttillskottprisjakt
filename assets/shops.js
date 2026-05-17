// Data för butikssidor och pris-jämförelser.
// Priser är representativa exempel som ska uppdateras manuellt över tid.
const SHOPS = [
  {
    id: "svenskt_kosttillskott",
    slug: "svenskt-kosttillskott",
    name: "Svenskt Kosttillskott",
    short: "SK",
    color: "#00C853",
    founded: 2004,
    location: "Helsingborg",
    pretty_link: "/go/svenskt-kosttillskott/",
    tagline: "Brett sortiment och snabba kampanjer – ofta lägst pris på protein och kreatin.",
    strengths: [
      "Aggressiv kampanjkalender – nya rea-priser nästan varje vecka",
      "Eget märke (SK Nutrition) ger lägst grundpris på basvaror",
      "Fri frakt från låg ordertröskel"
    ],
    weaknesses: [
      "Mindre utbud av nischade vitaminer",
      "Bonusprogrammet kräver volym för att löna sig"
    ],
    price_level: "Lågt till medel",
    shipping_free_from: 449,
    avg_savings_pct: 22,
    top_products: [
      { name: "SK Whey 1 kg",           price: 249, normal: 329 },
      { name: "Creatine Monohydrate 500 g", price: 169, normal: 219 },
      { name: "BCAA Pulver 400 g",      price: 179, normal: 229 },
      { name: "Pre-Workout Hardcore",   price: 269, normal: 349 },
      { name: "Omega-3 120 kapslar",    price: 119, normal: 159 }
    ]
  },
  {
    id: "svensk_halsokost",
    slug: "svensk-halsokost",
    name: "Svensk Hälsokost",
    short: "SH",
    color: "#FF6D00",
    founded: 2011,
    location: "Stockholm",
    pretty_link: "/go/svensk-halsokost/",
    tagline: "Stort hälso-sortiment, ofta vassast pris på vitaminer och premiumserier.",
    strengths: [
      "Brett urval av vitaminer, mineraler och adaptogener",
      "Många premiumvarumärken till medlemspris",
      "Stamkundspoäng (5 %) gör återköp billigare"
    ],
    weaknesses: [
      "Träningsdrivna basvaror ibland dyrare vid full-pris",
      "Kampanjer roteras långsammare"
    ],
    price_level: "Medel till premium",
    shipping_free_from: 499,
    avg_savings_pct: 18,
    top_products: [
      { name: "Premium Whey 1 kg",         price: 289, normal: 349 },
      { name: "Kreatin Mikroniserad 500 g", price: 189, normal: 229 },
      { name: "Multivitamin Komplett 90 st", price: 149, normal: 199 },
      { name: "Pre-Workout Clean",          price: 299, normal: 369 },
      { name: "Omega-3 Premium 120 kaps",   price: 109, normal: 149 }
    ]
  }
];

if (typeof module !== "undefined") module.exports = { SHOPS };
