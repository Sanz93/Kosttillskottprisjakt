// Pris-guider — bygger på verkliga produkter och priser från
// svensktkosttillskott.se och svenskhalsokost.se per 2026-05-17.
// Båda butikerna ägs av Svenska Hälsogruppen och delar mycket katalog —
// vinkeln är kampanj-jämförelse, inte grundpris.
const ARTICLES = [
  {
    slug: "samma-agare-olika-kampanjer",
    title: "Samma ägare, olika kampanjer — så fungerar Sveriges två största kosttillskottsbutiker",
    meta: "Svenskt Kosttillskott och Svensk Hälsokost ägs av samma koncern. Här är varför det fortfarande lönar sig att jämföra pris mellan butikerna.",
    published: "2026-05-15",
    category: "vitaminer",
    lead: "Att Svenskt Kosttillskott och Svensk Hälsokost delar ägare är ingen hemlighet — båda hör till Svenska Hälsogruppen. Men det betyder inte att priset är samma. Vi har spårat ett urval basvaror i båda butikerna i flera veckor. Det här är vad vi sett.",
    sections: [
      {
        h: "Grundpriset är ofta exakt detsamma",
        p: "På de produkter som båda butikerna säljer — t.ex. Core Whey Protein 1 kg eller Healthwell Omega-3 Plus — är listpriset identiskt. 349 kr hos båda. 155 kr hos båda. Det är ingen slump: katalogen synkas mellan systerbutikerna."
      },
      {
        h: "Men kampanjerna roteras oberoende",
        p: "Det är där prisjämförelsen får sitt värde. Just nu har Svenskt Kosttillskott exempelvis 30 % rabatt på Core Vitamins Man 120 kaps (167 kr istället för 239 kr) — samtidigt som Svensk Hälsokost ligger på fullpris. Samma sak händer åt motsatt håll: Holistic Omega-3 Algolja har 20 % rabatt hos Svensk Hälsokost men inte hos Svenskt Kosttillskott."
      },
      {
        h: "Sortimenten differentierar sig",
        p: "Svenskt Kosttillskott profilerar sig tydligare mot träning: RAW, Optimum Nutrition, Bodylab och eget Core dominerar hyllorna. Svensk Hälsokost lutar mot hälsa och naturmedel: Holistic, Healthwell, Better You, Thorne och Pureness. Vissa produkter finns bara hos den ena."
      },
      {
        h: "Vår rekommendation",
        p: "Innan du lägger en order — kolla båda butikerna. Det tar tio sekunder här på sajten, och i ungefär en av fem produkter just nu skiljer priset rejält. Det är där prisjämförelsen tjänar pengar åt dig."
      }
    ],
    cta_label: "Se aktuella jämförelser",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "kreatin-pris-maj-2026",
    title: "Kreatin-priserna i maj 2026 — där prisjämförelsen sparar mest",
    meta: "Pris-test på Core Creatine, Healthwell, Holistic och Pureness Creapure. Här är vart 500 g och kapslar är billigast just nu.",
    published: "2026-05-14",
    category: "kreatin",
    lead: "Kreatin monohydrat är samma molekyl oavsett varumärke. Det enda du betalar för är förpackning och vinstmarginal. Vi har kollat priserna på de mest populära burkarna hos båda butikerna — och just nu är prisskillnaden större än vanligt.",
    sections: [
      {
        h: "Core Creatine 300 g — 20 % skillnad",
        p: "Svenskt Kosttillskott kör kampanj på sin Core Creatine 300 g: 124 kr istället för ordinarie 155 kr. Samma burk hos Svensk Hälsokost ligger på 155 kr. Konkret: 31 kr (20 %) skillnad på samma produkt."
      },
      {
        h: "Pureness Creapure 250 g — bara hos Svensk Hälsokost",
        p: "Letar du efter Creapure (tysk premium-kreatin) är Svensk Hälsokost ditt enda alternativ av de två. Just nu 175 kr (rea från 219 kr). Det är ungefär samma kilopris som Core Creatine — så premium-stämpeln är inte dyrare än grundvarianten."
      },
      {
        h: "Holistic Kreatin 400 g — kampanj hos Svensk Hälsokost",
        p: "226 kr hos Svensk Hälsokost (rea från 283 kr). Hos Svenskt Kosttillskott säljs samma produkt till fullpris. Inte den största skillnaden men en bra påminnelse om att kampanjerna roteras separat."
      },
      {
        h: "Kapselformen — exakt samma pris",
        p: "Core Creatine Caps Pro 120 kaps kostar 299 kr på båda butikerna. Här finns ingen prisfördel mellan butikerna — välj på fraktrösk istället."
      }
    ],
    cta_label: "Jämför kreatin-priser",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "multivitamin-priser-2026",
    title: "Multivitamin maj 2026: Core Vitamins 30 % billigare hos Svenskt Kosttillskott",
    meta: "Prisjämförelse på Core Vitamins och Healthwell-multivitaminerna. En äkta skillnad värd att klicka på.",
    published: "2026-05-12",
    category: "vitaminer",
    lead: "Multivitamin är just nu den kategori med tydligast prisskillnad mellan de två butikerna. Anledningen är en aktiv kampanj på Svenskt Kosttillskott — och en Healthwell-prislista som är spikrak lika i båda butikerna.",
    sections: [
      {
        h: "Core Vitamins Man och Woman 120 kaps — 30 % rabatt",
        p: "Båda Core Vitamins-varianterna ligger på 167 kr hos Svenskt Kosttillskott just nu (ordinarie 239 kr). Hos Svensk Hälsokost finns 90-kaps-versionen för 239 kr men inte 120-kaps-rean. Det här är veckans tydligaste pris-fynd i hela jämförelsen."
      },
      {
        h: "Healthwell-serien — identiskt pris",
        p: "Healthwell Multivitamin Man, Kvinna, Vegan och 55+-varianter kostar exakt samma i båda butikerna: 239 kr för 90 kaps respektive 269 kr för 55+. Här är det fri frakt och leveranstid som avgör — inte priset."
      },
      {
        h: "Vad gör en multivitamin värd pengarna?",
        p: "Du betalar inte för 'fler vitaminer' när priset stiger — du betalar för formulering. Bisglycinat-bundna mineraler tas upp bättre än oxidvarianten. Folat (5-MTHF) är att föredra framför folsyra. Båda Core Vitamins och Healthwell premium-formula använder dessa. Generiska billigvarianter använder oftare oxid och syntetiskt folsyra."
      },
      {
        h: "Slutsats",
        p: "Köp Core Vitamins 120 kaps hos Svenskt Kosttillskott medan kampanjen rullar — du sparar 72 kr per burk. För Healthwell-serien spelar butiksvalet ingen roll prismässigt."
      }
    ],
    cta_label: "Se multivitamin-priser",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "omega3-jamforelse-2026",
    title: "Omega-3 i maj 2026: var hittar du de bästa pris-fynden?",
    meta: "Vi jämför Healthwell, Holistic, ArcticMed och Core omega-3 mellan butikerna. Premium-algoljor är just nu billigare hos Svensk Hälsokost.",
    published: "2026-05-10",
    category: "omega3",
    lead: "Omega-3 är ett område där butikerna har snarlika basvaror till identiskt pris — men där sortimentens bredd skiljer sig markant. Här är vad du ska titta efter just nu.",
    sections: [
      {
        h: "Basvarorna kostar samma",
        p: "Healthwell Omega-3 Fiskolja 120 kaps ligger på 99 kr i båda butikerna. Healthwell Omega-3 Plus 120 kaps på 155 kr i båda. Core Omega-3+ 120 kaps på 155 kr i båda. För dessa tre produkter spelar butiken ingen roll."
      },
      {
        h: "Holistic Algolja — 20 % rabatt hos Svensk Hälsokost",
        p: "Holistic Omega-3 Algolja 60 kaps kostar just nu 193 kr (rea från 241 kr) hos Svensk Hälsokost — och fullpris hos Svenskt Kosttillskott. För vegan-omegan är detta en konkret 48 kr-besparing."
      },
      {
        h: "Premium-segmentet — bara hos Svensk Hälsokost",
        p: "ArcticMed Omega-3 Premium 300 ml (374 kr) och Minami MorEPA 60 kaps finns bara hos Svensk Hälsokost. Letar du efter hög EPA/DHA-koncentrat är detta din enda väg av de två butikerna."
      },
      {
        h: "BioSalma — bara hos Svenskt Kosttillskott",
        p: "BioSalma Omega-3 Salmon Oil 180 kaps för 98 kr är ett lågprisalternativ som bara säljs hos Svenskt Kosttillskott. Pris per kapsel är klart lägst i hela testet — men koncentrationen är också lägre än premium-varianterna."
      }
    ],
    cta_label: "Hitta din omega-3",
    cta_shops: ["svensk_halsokost", "svenskt_kosttillskott"]
  },
  {
    slug: "fraktrosk-svenska-halsogruppen",
    title: "Fraktrösk-strategi: så fyller du ordern utan att betala leveransen",
    meta: "Båda butikerna har fri frakt över en viss tröskel. Med rätt strategi når du den utan att överköpa.",
    published: "2026-05-08",
    category: "protein",
    lead: "Frakt är en av de tystaste tilläggsavgifterna i kosttillskottsbranschen. På en order på 300 kr är 49 kr i frakt 16 % extra du betalar utan att få något i utbyte. Här är hur du undviker den utan att handla saker du inte behöver.",
    sections: [
      {
        h: "Kontrollera tröskeln innan kassan",
        p: "Båda butikerna visar fraktrösken i kassan — kolla beloppet och se hur många kronor du saknar. Ofta är det 50–100 kr, vilket är samma summa som frakten."
      },
      {
        h: "Smart påfyllning",
        p: "Lågpris-produkter du behöver i grunden är bra påfyllning: Healthwell Omega-3 Fiskolja för 99 kr, Healthwell D3 för runt 80 kr, eller en burk Core Creatine. Du fyller upp ordern, slipper frakten och får faktiska varor du använder."
      },
      {
        h: "Stack-orders",
        p: "Lägger du en två-månaders-order istället för månadsvis sparar du i regel 49 kr varje gång. Över ett år: 300–600 kr i ren fraktbesparing."
      },
      {
        h: "När frakt är värt att betala",
        p: "Behöver du bara en enskild kampanjvara med rejäl rabatt — och totalpriset minus rabatt minus frakt ändå är billigare än fullpris — så köp den. Räkna alltid på slutsumman inklusive frakt."
      }
    ],
    cta_label: "Börja shoppa smart",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "veckans-kampanjer-maj-2026",
    title: "Veckans äkta kampanjer (maj 2026) — där priset faktiskt skiljer sig",
    meta: "Fem produkter där prisskillnaden mellan butikerna är verklig och värd att klicka på.",
    published: "2026-05-17",
    category: "kreatin",
    lead: "Av de produkter vi jämför finns just nu fem där prisskillnaden mellan butikerna är minst 15 %. Det är där prisjämförelsen tjänar mest — och här är de.",
    sections: [
      {
        h: "1. Core Vitamins Man 120 kaps — 72 kr billigare hos Svenskt Kosttillskott",
        p: "167 kr (kampanj) mot 239 kr (fullpris). 30 % skillnad. Tydligaste fyndet i hela jämförelsen just nu."
      },
      {
        h: "2. Core Vitamins Woman 120 kaps — 72 kr billigare hos Svenskt Kosttillskott",
        p: "Samma kampanj som ovan. 167 kr mot 239 kr."
      },
      {
        h: "3. Core Creatine 300 g — 31 kr billigare hos Svenskt Kosttillskott",
        p: "124 kr (kampanj) mot 155 kr (fullpris). 20 % skillnad."
      },
      {
        h: "4. Holistic Kreatin 400 g — 57 kr billigare hos Svensk Hälsokost",
        p: "226 kr (kampanj) mot 283 kr (fullpris). 20 % skillnad."
      },
      {
        h: "5. Holistic Omega-3 Algolja 60 kaps — 48 kr billigare hos Svensk Hälsokost",
        p: "193 kr (kampanj) mot 241 kr (fullpris). 20 % skillnad."
      }
    ],
    cta_label: "Klicka in på fyndet",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  }
];

if (typeof module !== "undefined") module.exports = { ARTICLES };
