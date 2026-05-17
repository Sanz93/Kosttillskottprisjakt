// Priskategorier — verkliga produkter och priser hämtade från svensktkosttillskott.se
// och svenskhalsokost.se 2026-05-17. Båda butikerna ägs av Svenska Hälsogruppen
// och delar mycket av sin katalog: basprislistan är ofta identisk, men kampanjer
// roteras separat. Uppdatera priserna manuellt minst en gång per vecka.
const CATEGORIES = [
  {
    id: "protein",
    name: "Proteinpulver",
    intro: "Whey, isolat och vegan-protein. De vanligaste burkarna finns hos båda butikerna till samma listpris — men kampanjer skiljer sig från vecka till vecka. Vi listar var samma produkt är billigast just nu.",
    intent: "Träning, muskelåterhämtning, daglig proteinbas.",
    products: [
      { name: "Core Whey Protein 1 kg",                   sk: 349, sh: 349, unit: "1 kg" },
      { name: "Core Protein Pro 800 g",                   sk: 479, sh: 479, unit: "800 g" },
      { name: "Holistic Vassleprotein 750 g",             sk: 264, sh: 264, unit: "750 g (kampanj)" },
      { name: "Optimum Nutrition 100% Whey 2273 g",       sk: 979, sh: 979, unit: "2,27 kg" },
      { name: "Trainimal Vassleprotein Choklad",          sk: 305, sh: 305, unit: "burk" }
    ]
  },
  {
    id: "kreatin",
    name: "Kreatin",
    intro: "Kreatin monohydrat är samma molekyl överallt — så priset är det som spelar roll. Denna kategori är där prisjämförelsen tjänar mest: Svenskt Kosttillskott kör ofta hård kampanj på sitt Core-märke samtidigt som Svensk Hälsokost har det till ordinarie pris.",
    intent: "Styrkeökning, volymträning, mikronutrition.",
    products: [
      { name: "Core Creatine 300 g",                      sk: 124, sh: 155, unit: "300 g (SK kampanj)" },
      { name: "Core Creatine Pro 330 g",                  sk: 299, sh: 299, unit: "330 g" },
      { name: "Core Creatine Caps Pro 120 kaps",          sk: 299, sh: 299, unit: "120 kaps" },
      { name: "Healthwell Kreatin Monohydrat 300 g",      sk: 219, sh: 219, unit: "300 g" },
      { name: "Holistic Kreatin 400 g",                   sk: 283, sh: 226, unit: "400 g (SH kampanj)" },
      { name: "Pureness Kreatin Creapure 250 g",          sk: 219, sh: 175, unit: "250 g (SH kampanj)" }
    ]
  },
  {
    id: "vitaminer",
    name: "Multivitamin",
    intro: "Den kategori där prisskillnaden mellan butikerna är allra störst just nu — Svenskt Kosttillskott har 30 % rabatt på sitt Core Vitamins-märke samtidigt som Svensk Hälsokost ligger på fullpris. Healthwell-serien kostar däremot exakt lika hos båda.",
    intent: "Daglig hälsa, immunförsvar, återhämtning.",
    products: [
      { name: "Core Vitamins Man 120 kaps",               sk: 167, sh: 239, unit: "120 kaps (SK kampanj)" },
      { name: "Core Vitamins Woman 120 kaps",             sk: 167, sh: 239, unit: "120 kaps (SK kampanj)" },
      { name: "Healthwell Multivitamin Man 90 kaps",      sk: 239, sh: 239, unit: "90 kaps" },
      { name: "Healthwell Multivitamin Kvinna 90 kaps",   sk: 239, sh: 239, unit: "90 kaps" },
      { name: "Healthwell Multivitamin Vegan 90 kaps",    sk: 239, sh: 239, unit: "90 kaps" },
      { name: "Healthwell Multivitamin 55+ Kvinna 90 kaps", sk: 269, sh: 269, unit: "90 kaps" }
    ]
  },
  {
    id: "bcaa",
    name: "BCAA & aminosyror",
    intro: "Förgrenade aminosyror för intra-workout. Här ligger Core-serien på samma pris hos båda butikerna, men premium-alternativ från Thorne och Holistic finns bara hos Svensk Hälsokost.",
    intent: "Återhämtning under och efter pass.",
    products: [
      { name: "Core BCAA Powder 400 g",                   sk: 259, sh: 259, unit: "400 g" },
      { name: "Core BCAA Energy 400 g",                   sk: 289, sh: 289, unit: "400 g" },
      { name: "Core BCAA Caps 180 kaps",                  sk: 227, sh: 227, unit: "180 kaps" },
      { name: "Better You BCAA Pulver 250 g",             sk: 283, sh: 283, unit: "250 g" },
      { name: "Bodylab BCAA Lemon 400 g",                 sk: 209, sh: null, unit: "400 g (endast SK)" },
      { name: "Holistic BCAA 300 g",                      sk: null, sh: 285, unit: "300 g (endast SH)" }
    ]
  },
  {
    id: "omega3",
    name: "Omega-3 & fettsyror",
    intro: "Fiskolja, alg-omega och premium-koncentrat. Basvarorna kostar samma i båda butikerna — men Svensk Hälsokost har ett mycket bredare sortiment av premium- och algoljor från ArcticMed, Holistic och Minami.",
    intent: "Hjärt- och hjärnhälsa, anti-inflammation.",
    products: [
      { name: "Healthwell Omega-3 Fiskolja 120 kaps",     sk: 99,  sh: 99,  unit: "120 kaps" },
      { name: "Healthwell Omega-3 Plus 120 kaps",         sk: 155, sh: 155, unit: "120 kaps" },
      { name: "Core Omega-3+ 120 kaps",                   sk: 155, sh: 155, unit: "120 kaps" },
      { name: "Healthwell Algolja Omega-3 60 kaps",       sk: 249, sh: 249, unit: "60 kaps (vegan)" },
      { name: "Holistic Omega-3 Algolja 60 kaps",         sk: 241, sh: 193, unit: "60 kaps (SH kampanj)" },
      { name: "BioSalma Omega-3 Salmon Oil 180 kaps",     sk: 98,  sh: null, unit: "180 kaps (endast SK)" }
    ]
  }
];

if (typeof module !== "undefined") module.exports = { CATEGORIES };
