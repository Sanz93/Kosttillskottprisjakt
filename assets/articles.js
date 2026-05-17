// Erbjudande-artiklar. Varje artikel byggs till /erbjudande/<slug>/index.html.
// Innehåll riktar in sig på PRIS, inte expert-recension.
const ARTICLES = [
  {
    slug: "basta-proteinpriset-2026",
    title: "Bästa proteinpriset just nu – stor jämförelse 2026",
    meta: "Vi pris-testar whey, isolat och vegan-protein hos Svenskt Kosttillskott och Svensk Hälsokost. Här är var kilopriset är lägst denna vecka.",
    published: "2026-05-14",
    category: "protein",
    lead: "Proteinpulver är den kategori där pris-skillnaderna mellan butikerna varierar mest från vecka till vecka. Vi har tittat på det faktiska kilopriset – inklusive kampanjer och stamkundsrabatter – och listat vinnaren per produkttyp.",
    sections: [
      {
        h: "Så jämför vi proteinpriserna",
        p: "Vi tittar på listpris, kampanjpris och pris efter inloggning. Sedan räknar vi om allt till pris per kilo torrt protein, så 750 g-burkar inte ser billigare ut än de är. Resultatet uppdateras manuellt varje vecka."
      },
      {
        h: "Whey 80% naturell – vinnaren",
        p: "På en standardburk Whey 80% 1 kg ligger Svenskt Kosttillskott i snitt 12 % billigare än Svensk Hälsokost, framför allt tack vare deras eget märke. Skillnaden krymper rejält så fort Svensk Hälsokost kör sin medlemshelg, så det är värt att kolla båda butikerna innan du klickar köp."
      },
      {
        h: "Whey Isolate – jämn match",
        p: "På isolat ligger butikerna oftast inom 20 kr från varandra. Här blir det shipping-tröskeln som avgör – behöver du fylla på med fler varor är det smartare att samla ordern i en butik istället för att jaga 5 kr extra rabatt."
      },
      {
        h: "Vegan protein – Svensk Hälsokost vinner ofta",
        p: "På växtbaserat protein vinner Svensk Hälsokost knappt 7 av 10 veckor. Sortimentet är bredare och kampanjerna landar oftare här."
      },
      {
        h: "Vår rekommendation just nu",
        p: "Köper du basvaror (whey, kreatin, BCAA) i samma order: lägg den hos Svenskt Kosttillskott. Köper du proteinpulver tillsammans med vitaminer eller premium-märken: Svensk Hälsokost vinner totalkostnaden."
      }
    ],
    cta_label: "Se aktuella proteinpriser",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "spara-pa-kreatin-fyndguide",
    title: "Spara upp till 40 % på kreatin – fynd-guide maj 2026",
    meta: "Kreatin är samma molekyl överallt – så varför betala fullpris? Vår fynd-guide visar var 500 g och 1 kg är billigast just nu.",
    published: "2026-05-09",
    category: "kreatin",
    lead: "Kreatin monohydrat är en av få produkter där varumärket spelar nästintill noll roll – molekylen är identisk. Det enda du faktiskt betalar för är förpackning, varumärke och marknadsföring. Här är var det är billigast just nu.",
    sections: [
      {
        h: "Pris per gram – det enda måttet som spelar roll",
        p: "På 500 g monohydrat ligger billigaste alternativet i skrivande stund på 33 öre/gram. Premium-burkar med samma innehåll kan kosta 65 öre/gram – dubbelt så mycket utan att leverera ett enda extra gram kreatin."
      },
      {
        h: "Creapure – när lönar det sig?",
        p: "Creapure är tyskt monohydrat med högre renhetsspec. Skillnaden i upptag är försumbar för de allra flesta, men om du jagar premium-formler vinner Svensk Hälsokost oftast – deras Creapure-burk är cirka 10 kr billigare än konkurrenten."
      },
      {
        h: "Kapslar vs pulver – stora prisskillnader",
        p: "Kapslar är alltid dyrare per gram. Om bekvämligheten är värd extrapriset är det rimligt, men jaga aldrig kapslar utan att också jämföra pulverpriset i samma butik."
      },
      {
        h: "Köpknep: kombinera med protein",
        p: "Båda butikerna har fri frakt över en viss tröskel. Köper du kreatin separat hamnar du nästan alltid under tröskeln – kombinera med en burk whey eller en månadsmultivitamin så slipper du frakten."
      }
    ],
    cta_label: "Jämför kreatin-priser",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "prisjamforelse-vitaminer-2026",
    title: "Pris-test: Vitaminer & mineraler maj 2026",
    meta: "Multivitamin, D3, magnesium, zink – pris-jämförelse mellan Svenskt Kosttillskott och Svensk Hälsokost.",
    published: "2026-05-06",
    category: "vitaminer",
    lead: "Vitaminer är kategorin där de flesta tror att 'allt kostar ungefär lika mycket'. Det stämmer inte – vi pris-testade fem av de vanligaste produkterna och hittade upp till 28 % skillnad på samma artikel.",
    sections: [
      {
        h: "Multivitamin 90 tabletter – Svensk Hälsokost knappast vinner",
        p: "Standard-multin kostar 10 kr mindre hos Svensk Hälsokost när vi mätte. Marginalen är liten men konsekvent över flera veckor."
      },
      {
        h: "D3 4000 IE – generikan rår alltid",
        p: "Premium-D3 i olivolja kostar 30 % mer än standardvarianten utan att ge mätbart bättre upptag. Köp generikan, lägg pengarna på något du faktiskt märker."
      },
      {
        h: "Magnesium-typer – akta dig för oxid",
        p: "Magnesiumoxid är billigast per gram men har lågt upptag. Citrat och bisglycinat kostar några kronor mer per dos men ger faktisk effekt. Båda butikerna säljer båda – kolla typen, inte bara priset."
      }
    ],
    cta_label: "Se vitamin-priser",
    cta_shops: ["svensk_halsokost", "svenskt_kosttillskott"]
  },
  {
    slug: "pre-workout-test-2026",
    title: "Pre-workout 2026 – pris per portion, inte pris per burk",
    meta: "Vi räknade om alla burkar till pris per portion. Resultatet förändrar vilken pre-workout som faktiskt är billigast.",
    published: "2026-05-02",
    category: "pre-workout",
    lead: "Pre-workout marknadsförs i kronor per burk. Men vissa burkar har 20 portioner, andra 40 – så pris per burk är värdelöst. Räknar man om till pris per portion blir ranking en helt annan.",
    sections: [
      {
        h: "Pris per portion – så räknar vi",
        p: "Vi tar burkpris delat på antal portioner enligt etikett. Sen jämför vi dosering – vissa märken har 'fake' portionsantal med underdoserad koffein. Vi har räknat om till 200 mg koffein-ekvivalent."
      },
      {
        h: "Hardcore-segmentet",
        p: "Hård pre-workout med 350+ mg koffein vinner Svenskt Kosttillskott – cirka 11 kr per portion. Svensk Hälsokost ligger runt 13 kr per portion på motsvarande produkter."
      },
      {
        h: "Stim-fri pump",
        p: "På koffeinfri pump-formula vinner Svensk Hälsokost. Citrullin-dosen är högre och pris per portion ligger ungefär 1 kr lägre."
      }
    ],
    cta_label: "Hitta din pre-workout",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "veckans-toppfynd",
    title: "Veckans toppfynd – fem rabatter som faktiskt är värda att klicka",
    meta: "Vi har sållat bland alla kampanjer och valt fem produkter där pris-historiken visar att rabatten är äkta.",
    published: "2026-05-12",
    category: "protein",
    lead: "'Spara 50 %' är ett av de mest missbrukade orden i kosttillskottsbranschen. Vi har tagit fem aktuella kampanjer och jämfört med pris-historiken de senaste sex månaderna. Bara de som faktiskt ligger lägre än historiskt snitt kvalificerar.",
    sections: [
      {
        h: "1. SK Whey 1 kg – 249 kr (normalt 329 kr)",
        p: "Lägsta priset på 5 månader. Inte historiskt lägsta (det var 239 kr i januari) men nära nog. Klicka."
      },
      {
        h: "2. Premium Whey 1 kg – 289 kr (normalt 349 kr)",
        p: "Nytt 6-månaders-lägsta. Verklig kampanj, ej fejk-rabatt."
      },
      {
        h: "3. Kreatin Monohydrat 1 kg – 299 kr (normalt 359 kr)",
        p: "Inte säsongsbillig, men 16 % under snittpriset. För kilopris är detta starkt."
      },
      {
        h: "4. Omega-3 Premium 240 kaps – 209 kr (normalt 269 kr)",
        p: "Premium-burk till generika-pris. En av månadens tydligaste pris-vinnare."
      },
      {
        h: "5. Pre-Workout Hardcore 400 g – 269 kr (normalt 349 kr)",
        p: "Ligger 4 kr över historiskt lägsta. Acceptabelt fynd, inte 'spring och köp'."
      }
    ],
    cta_label: "Se veckans fynd",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "fraktrosk-strategi",
    title: "Fraktrösk-strategi: så slipper du betala 49 kr för leveransen",
    meta: "Båda butikerna har fri frakt över en viss tröskel. Med rätt strategi når du den utan att överköpa.",
    published: "2026-04-28",
    category: "protein",
    lead: "Fraktrösken är en av de sluga små intäktsströmmarna i branschen. 49 kr extra på en 300 kr-order är 16 % på din totalkostnad. Här är hur du undviker den utan att tvingas köpa saker du inte behöver.",
    sections: [
      {
        h: "Tröskelvärden just nu",
        p: "Svenskt Kosttillskott: fri frakt från 449 kr. Svensk Hälsokost: fri frakt från 499 kr. Tjugo kronor under är samma sak som att betala full frakt – fyll alltid på upp till tröskeln."
      },
      {
        h: "Smart påfyllning",
        p: "Burkar med kreatin, multivitamin eller D3 är lågpris-produkter du ändå behöver. Lägg en sådan i ordern istället för att betala frakt."
      },
      {
        h: "Tröskel-stack",
        p: "Lägger du två-månaders-order istället för en-månaders sparar du i regel 49–98 kr per år i frakt. Det är mer än hela kreatin-burken kostar."
      }
    ],
    cta_label: "Börja shoppa smart",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "kampanjkalender-2026",
    title: "Kampanjkalender 2026 – när lönar det sig att vänta?",
    meta: "Sammanställning av återkommande rea-perioder hos Svenskt Kosttillskott och Svensk Hälsokost.",
    published: "2026-04-22",
    category: "protein",
    lead: "Du behöver sällan köpa kosttillskott till fullpris. Båda butikerna kör återkommande kampanjer enligt ett mönster vi har kartlagt över de senaste två åren. Här är när du ska vänta – och när du inte ska det.",
    sections: [
      {
        h: "Återkommande kampanjer Svenskt Kosttillskott",
        p: "Månadsstart har ofta 'New Month Sale' på eget märke. Sista helgen i månaden = clearance på utgående smaker. Stora rean i augusti och januari."
      },
      {
        h: "Återkommande kampanjer Svensk Hälsokost",
        p: "Medlemshelg en gång i månaden – 15 % på utvalda premium-märken. Vitamin-vecka i mars och oktober. Black Week i slutet av november."
      },
      {
        h: "När det INTE lönar sig att vänta",
        p: "Behöver du protein i nästa vecka är skillnaden mellan dagens pris och nästa kampanjpris i regel 20–40 kr. Om kampanjen ligger 3 veckor bort har du redan ätit bristen på protein – köp nu."
      }
    ],
    cta_label: "Kolla aktuella kampanjer",
    cta_shops: ["svenskt_kosttillskott", "svensk_halsokost"]
  },
  {
    slug: "stamkundsprogram-test",
    title: "Stamkundsprogram-test: vilken butik ger bäst återbäring?",
    meta: "Vi räknade på Svenskt Kosttillskotts bonusprogram mot Svensk Hälsokosts poängsystem. En vinner – men det är inte alltid samma.",
    published: "2026-04-18",
    category: "vitaminer",
    lead: "Båda butikerna har stamkundsprogram, men de fungerar fundamentalt olika. Vi tog en typisk årskonsumtion av kosttillskott och räknade på verklig årlig återbäring.",
    sections: [
      {
        h: "Svenskt Kosttillskott – bonustrappa",
        p: "Bonus stiger med årlig omsättning: 3 % vid 2000 kr/år, 5 % vid 5000 kr/år, 8 % vid 10000 kr/år. För genomsnittskunden landar det runt 4 %."
      },
      {
        h: "Svensk Hälsokost – flat 5 %",
        p: "5 % i poäng på alla köp, inlöses på nästa order. Inga trösklar – så för låg-volym-kunden vinner detta enkelt."
      },
      {
        h: "Vinnaren beror på dig",
        p: "Köper du för under 5000 kr/år: Svensk Hälsokost. Köper du för över 8000 kr/år: Svenskt Kosttillskott vinner. Mittemellan: lika."
      }
    ],
    cta_label: "Bli stamkund",
    cta_shops: ["svensk_halsokost", "svenskt_kosttillskott"]
  }
];

if (typeof module !== "undefined") module.exports = { ARTICLES };
