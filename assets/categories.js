// Priskategorier — pris-jämförelse mellan de två butikerna per kategori.
// Pris angivet i SEK. Uppdatera manuellt vid behov.
const CATEGORIES = [
  {
    id: "protein",
    name: "Proteinpulver",
    intro: "Whey, isolat och vegan-protein – här jämför vi grundpriset per kilo så du ser var samma burk är billigast just nu.",
    intent: "Träning, muskelåterhämtning, daglig proteinbas.",
    products: [
      { name: "Whey 80% 1 kg, naturell",        sk: 249, sh: 289, unit: "1 kg" },
      { name: "Whey Isolate 1 kg, vanilj",      sk: 329, sh: 349, unit: "1 kg" },
      { name: "Vegan Protein 750 g",            sk: 279, sh: 259, unit: "750 g" },
      { name: "Casein 900 g, choklad",          sk: 289, sh: 309, unit: "900 g" },
      { name: "Protein Bars 12-pack",           sk: 199, sh: 189, unit: "12 st" }
    ]
  },
  {
    id: "kreatin",
    name: "Kreatin",
    intro: "Kreatin monohydrat är samma molekyl överallt – så det enda som skiljer är pris per gram. Vi listar de vanligaste storlekarna.",
    intent: "Styrkeökning, volymträning, mikronutrition.",
    products: [
      { name: "Kreatin Monohydrat 500 g",        sk: 169, sh: 189, unit: "500 g" },
      { name: "Kreatin Monohydrat 1 kg",         sk: 299, sh: 329, unit: "1 kg" },
      { name: "Kreatin Creapure 500 g",          sk: 219, sh: 209, unit: "500 g" },
      { name: "Kreatin Kapslar 240 st",          sk: 199, sh: 219, unit: "240 kaps" }
    ]
  },
  {
    id: "gainer",
    name: "Gainer & viktökare",
    intro: "Carbs + protein i en burk – mest kalorier för pengarna. Pris per kilo varierar rejält, så det här är en kategori där det lönar sig att jämföra.",
    intent: "Kaloriöverskott, bulk-period, snabb återhämtning.",
    products: [
      { name: "Mass Gainer 3 kg, choklad",       sk: 449, sh: 499, unit: "3 kg" },
      { name: "Lean Gainer 2 kg",                sk: 379, sh: 369, unit: "2 kg" },
      { name: "Carb Boost 1.5 kg",               sk: 199, sh: 229, unit: "1.5 kg" }
    ]
  },
  {
    id: "pre-workout",
    name: "Pre-workout",
    intro: "Koffein, citrullin, beta-alanin – allt som ger ett extra kick innan passet. Pris per portion är nyckeln, inte pris per burk.",
    intent: "Energi, pump, fokus före passet.",
    products: [
      { name: "Pre-Workout Hardcore 400 g",      sk: 269, sh: 299, unit: "30 portioner" },
      { name: "Pre-Workout Clean 350 g",         sk: 289, sh: 279, unit: "25 portioner" },
      { name: "Pump Booster Stim-fri 300 g",     sk: 229, sh: 249, unit: "30 portioner" }
    ]
  },
  {
    id: "vitaminer",
    name: "Vitaminer & mineraler",
    intro: "Multivitaminer, D3, magnesium och zink – kategorin där Svensk Hälsokost ofta drar ifrån, men inte alltid.",
    intent: "Daglig hälsa, immunförsvar, återhämtning.",
    products: [
      { name: "Multivitamin 90 tabletter",       sk: 159, sh: 149, unit: "90 st" },
      { name: "D3 4000 IE 120 kapslar",          sk: 99,  sh: 89,  unit: "120 kaps" },
      { name: "Magnesium Citrat 90 kaps",        sk: 119, sh: 109, unit: "90 kaps" },
      { name: "Zink 25 mg 120 tab",              sk: 79,  sh: 79,  unit: "120 tab" }
    ]
  },
  {
    id: "bcaa",
    name: "BCAA & aminosyror",
    intro: "Förgrenade aminosyror för intra-workout. Vi jämför pris per portion och tittar på vilka smaker som faktiskt finns i lager.",
    intent: "Återhämtning under och efter pass.",
    products: [
      { name: "BCAA Pulver 400 g, hallon",       sk: 179, sh: 199, unit: "40 portioner" },
      { name: "EAA Pulver 450 g, citrus",        sk: 259, sh: 249, unit: "30 portioner" },
      { name: "Glutamin 500 g",                  sk: 199, sh: 219, unit: "500 g" }
    ]
  },
  {
    id: "omega3",
    name: "Omega-3 & fettsyror",
    intro: "Fiskolja, alg-omega och CLA. Här tittar vi på pris per gram EPA+DHA, inte bara pris per burk.",
    intent: "Hjärt- och hjärnhälsa, anti-inflammation.",
    products: [
      { name: "Omega-3 120 kapslar",             sk: 119, sh: 109, unit: "120 kaps" },
      { name: "Omega-3 Premium 240 kaps",        sk: 229, sh: 209, unit: "240 kaps" },
      { name: "Alg-Omega 60 kaps (vegan)",       sk: 199, sh: 189, unit: "60 kaps" }
    ]
  }
];

if (typeof module !== "undefined") module.exports = { CATEGORIES };
