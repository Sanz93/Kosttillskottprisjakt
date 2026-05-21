// Genererar statiska sidor: index, quiz + alla legala sidor + om/metodik/kontakt
const path = require('path');
const { SHOPS } = require('./assets/shops.js');
const { CATEGORIES } = require('./assets/categories.js');
const { ARTICLES } = require('./assets/articles.js');
const L = require('./build-lib.js');

const MONTHS = ['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
function formatDate(iso) {
  const d = new Date(iso);
  return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}

/* ============================================================
   FRONTPAGE
   ============================================================ */
function buildIndex() {
  const canonical = `${L.SITE.url}/`;
  const ld = [
    L.organizationJsonLd(),
    L.websiteJsonLd(),
    L.breadcrumbJsonLd([{ name: "Hem", url: canonical }])
  ];

  // 5 toppfynd från shops.top_products med störst rabatt
  const allDeals = SHOPS.flatMap(s => s.top_products.map(p => ({
    name: p.name,
    price: p.price,
    normal: p.normal,
    save: p.normal - p.price,
    shop: s
  }))).sort((a, b) => (b.save / b.normal) - (a.save / a.normal)).slice(0, 5);

  const dealTiles = allDeals.map(d => {
    return `<div class="deal-tile">
      <div class="from">
        <img src="assets/logos/${d.shop.slug}.png" alt="${L.escapeAttr(d.shop.name)}" class="from-logo">
        <span>${L.escapeHtml(d.shop.name)}</span>
      </div>
      <h3>${L.escapeHtml(d.name)}</h3>
      <div class="price-row">
        <span class="price">${d.price} kr</span>
        <span class="price-old">${d.normal} kr</span>
      </div>
      <div class="price-save">Spara ${d.save} kr</div>
      <a href="${d.shop.clean_url}" class="btn btn-ghost btn-block" rel="noopener sponsored" target="_blank">Till butiken &rarr;</a>
    </div>`;
  }).join('');

  // Hero-aside: 4 produkter med störst verklig prisskillnad just nu
  const heroProducts = CATEGORIES
    .flatMap(c => c.products.filter(p => p.sk != null && p.sh != null && p.sk !== p.sh))
    .map(p => ({ ...p, diff: Math.abs(p.sk - p.sh) }))
    .sort((a, b) => b.diff - a.diff)
    .slice(0, 4);
  const heroRows = heroProducts.map(p => {
    const winnerShop = p.sk < p.sh ? 'Svenskt Kosttillskott' : 'Svensk Hälsokost';
    const winnerPrice = Math.min(p.sk, p.sh);
    const otherPrice = Math.max(p.sk, p.sh);
    return `<div class="snapshot-row">
      <div>
        <div class="prod">${L.escapeHtml(p.name)}</div>
        <div class="winner">Lägst hos ${L.escapeHtml(winnerShop)} · spar ${p.diff} kr</div>
      </div>
      <div class="price">${winnerPrice}<small>kr (ord. ${otherPrice})</small></div>
    </div>`;
  }).join('');

  const catTiles = CATEGORIES.map((c, i) => `
    <a class="cat-tile" href="priskategori/${c.id}/">
      <div class="num">${String(i + 1).padStart(2, '0')}</div>
      <h3>${L.escapeHtml(c.name)}</h3>
      <p>${c.products.length} produkter jämförda</p>
    </a>`).join('');

  const articleCards = ARTICLES.slice(0, 6).map(a => `
    <a class="article-card" href="erbjudande/${a.slug}/">
      <div class="date">${L.escapeHtml(formatDate(a.published))}</div>
      <h3>${L.escapeHtml(a.title)}</h3>
      <p>${L.escapeHtml(a.meta)}</p>
      <span class="read">Läs guiden &rarr;</span>
    </a>`).join('');

  const shopCompareCards = SHOPS.map(s => `
    <div class="shop-card">
      <div class="brand">
        <img src="assets/logos/${s.slug}.png" alt="${L.escapeAttr(s.name)}" class="brand-logo">
        <h3>${L.escapeHtml(s.name)}</h3>
      </div>
      <p class="tagline">${L.escapeHtml(s.tagline)}</p>
      <ul>
        ${s.strengths.slice(0, 3).map(x => `<li>${L.escapeHtml(x)}</li>`).join('')}
      </ul>
      <a class="btn btn-ghost btn-block" href="butik/${s.slug}/">Läs mer om butiken &rarr;</a>
    </div>`).join('');

  const body = `
${L.header(0, 'home')}

<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="eyebrow">Sveriges prisjämförelse för kosttillskott</span>
      <h1>Lägsta priset på protein, kreatin och vitaminer.</h1>
      <p class="hero-sub">Svenskt Kosttillskott och Svensk Hälsokost ägs av samma koncern men roterar kampanjer oberoende. Vi spårar de viktigaste produkterna och visar vilken butik som har dem billigast just nu.</p>
      <div class="hero-actions">
        <a href="#fynd" class="btn">Se veckans toppfynd</a>
        <a href="priskategori/protein/" class="btn-link">Bläddra alla kategorier &rarr;</a>
      </div>
      <div class="hero-meta">
        <div class="stat"><span class="num">2</span><span class="lbl">Butiker spårade</span></div>
        <div class="stat"><span class="num">${CATEGORIES.reduce((a, c) => a + c.products.length, 0)}</span><span class="lbl">Produkter jämförda</span></div>
        <div class="stat"><span class="num">${ARTICLES.length}</span><span class="lbl">Pris-guider</span></div>
      </div>
    </div>
    <aside class="hero-aside" aria-label="Aktuella priser">
      <h3>Aktuella prisledare</h3>
      ${heroRows}
      <a href="priskategori/protein/" class="btn-link mt-2" style="display:inline-block;">Se hela jämförelsen &rarr;</a>
    </aside>
  </div>
</section>

<section id="fynd" class="bg-alt">
  <div class="wrap">
    <div class="section-head">
      <h2>Veckans toppfynd</h2>
      <div class="meta">Uppdaterat ${formatDate(new Date().toISOString())}</div>
    </div>
    <div class="deal-grid">${dealTiles}</div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head"><h2>Butikerna vi jämför</h2><div class="meta">Två svenska e-handlare, jämbördigt rankade</div></div>
    <div class="shop-compare">${shopCompareCards}</div>
  </div>
</section>

<section class="bg-alt">
  <div class="wrap">
    <div class="section-head"><h2>Bläddra per kategori</h2><div class="meta">Jämför priset på den produkttyp du letar efter</div></div>
    <div class="cat-grid">${catTiles}</div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head"><h2>Pris-guider</h2><div class="meta">Senaste analyserna från redaktionen</div></div>
    <div class="article-grid">${articleCards}</div>
  </div>
</section>
${L.footer(0)}
`;

  const html = L.head({
    title: `${L.SITE.tag} – jämför pris mellan Svenskt Kosttillskott och Svensk Hälsokost`,
    description: "Sveriges prisjämförelse för kosttillskott. Vi visar var samma protein, kreatin, vitaminer och pre-workout kostar minst just nu.",
    canonical,
    depth: 0,
    jsonLd: ld
  }) + body;

  L.write(path.join(__dirname, 'index.html'), html);
}

/* ============================================================
   QUIZ
   ============================================================ */
function buildQuiz() {
  const canonical = `${L.SITE.url}/rabattkod/`;
  const ld = [
    L.organizationJsonLd(),
    L.breadcrumbJsonLd([
      { name: "Hem", url: L.SITE.url + "/" },
      { name: "Rabattkod", url: canonical }
    ])
  ];

  // Frågor — antal = antal pretty-links (2). Varje svar binder en preferred merchant
  // som JS:en sedan deduperar mot session (varje merchant fyrar max 1 gång per session).
  const QUESTIONS = [
    {
      qid: "q1",
      text: "Vad är viktigast för dig när du handlar kosttillskott?",
      options: [
        { label: "Pris och kampanjer",                  merchant: "svensk-halsokost" },
        { label: "Brett sortiment",                     merchant: "svensk-halsokost" },
        { label: "Premium-kvalitet och bra varumärken", merchant: "svensk-halsokost" }
      ]
    },
    {
      qid: "q2",
      text: "När planerar du att handla?",
      options: [
        { label: "Idag",                          merchant: "svenskt-kosttillskott" },
        { label: "Inom en vecka",                 merchant: "svenskt-kosttillskott" },
        { label: "Jag kollar bara runt just nu",  merchant: "svenskt-kosttillskott" }
      ]
    }
  ];

  const DISCOUNT_CODE = "FYND25";
  const DISCOUNT_PCT = 25;

  // Slug → ren merchant-URL. atag.js (Cleanlinks) skriver om href till
  // spårnings-URL efter sidladdning — länken ska vara ren här.
  const URL_BY_SLUG = {
    "svenskt-kosttillskott": "https://www.svensktkosttillskott.se",
    "svensk-halsokost":      "https://www.svenskhalsokost.se"
  };

  function questionBlock(q, idx) {
    const opts = q.options.map(o => {
      const url = URL_BY_SLUG[o.merchant] || `/go/${o.merchant}/`;
      return `<a class="quiz-option" data-question-index="${idx}" href="${url}" target="_blank" rel="noopener sponsored">${L.escapeHtml(o.label)}</a>`;
    }).join('\n        ');
    return `<div class="quiz-question" data-question-index="${idx}"${idx === 0 ? '' : ' style="display:none"'}>
      <h2>${L.escapeHtml(q.text)}</h2>
      <div class="quiz-options-grid">
        ${opts}
      </div>
    </div>`;
  }

  const questionsHtml = QUESTIONS.map(questionBlock).join('\n    ');

  const body = `
${L.header(1, 'rabattkod')}

<section style="padding-top:32px;">
  <div class="narrow text-center">
    <span class="eyebrow">Veckans erbjudande · 2 snabba frågor</span>
    <h1>Lås upp ${DISCOUNT_PCT} % rabatt</h1>
    <p class="text-mute" style="max-width:560px; margin:0 auto 36px;">Svara på två snabba frågor så får du veckans rabattkod på det du letar efter mest.</p>
  </div>

  <div class="quiz-card">
    <div class="quiz-progress-wrap">
      <div class="quiz-progress-bar"><div id="progress-fill" class="quiz-progress-fill" style="width:${Math.round(100 / QUESTIONS.length)}%"></div></div>
      <div class="quiz-progress-meta">
        <span id="progress-label">Fråga 1 av ${QUESTIONS.length}</span>
        <span id="progress-pct">${Math.round(100 / QUESTIONS.length)}%</span>
      </div>
    </div>

    ${questionsHtml}

    <div id="quiz-final" style="display:none">
      <h2>Din rabattkod är klar</h2>
      <p>Använd koden i kassan hos <strong>Svenskt Kosttillskott</strong> eller <strong>Svensk Hälsokost</strong> för upp till ${DISCOUNT_PCT} % rabatt på din nästa order.</p>
      <div class="quiz-code">
        <span class="quiz-code-label">Din kod</span>
        <span class="quiz-code-value">${DISCOUNT_CODE}</span>
      </div>
      <div class="quiz-final-shops">
        <span class="quiz-final-shops-label">Lös in koden hos</span>
        <div class="shop-list">
          <a class="shop-list-item" href="https://www.svensktkosttillskott.se" rel="noopener sponsored" target="_blank">
            <img src="../assets/logos/svenskt-kosttillskott.png" alt="">
            <span class="shop-list-name">Svenskt Kosttillskott</span>
            <span class="shop-list-cta">Besök &rarr;</span>
          </a>
          <a class="shop-list-item" href="https://www.svenskhalsokost.se" rel="noopener sponsored" target="_blank">
            <img src="../assets/logos/svensk-halsokost.png" alt="">
            <span class="shop-list-name">Svensk Hälsokost</span>
            <span class="shop-list-cta">Besök &rarr;</span>
          </a>
        </div>
      </div>
      <p class="text-mute" style="font-size:.85rem; margin-top:24px;">Erbjudandet uppdateras varje vecka och gäller utvalda produkter hos våra samarbetspartners.</p>
    </div>
  </div>
</section>

${L.footer(1)}
`;

  // Injicera quiz.js efter main.js
  const html = (L.head({
    title: "Rabattkod",
    description: "Svara på två snabba frågor och lås upp veckans rabattkod.",
    canonical,
    depth: 1,
    jsonLd: ld,
    noindex: true
  }) + body).replace('<script src="../assets/main.js"></script>',
    '<script src="../assets/main.js"></script>\n<script src="../assets/quiz.js"></script>');

  L.write(path.join(__dirname, 'rabattkod', 'index.html'), html);
}

/* ============================================================
   STATISKA SIDOR (legal + om/metodik/kontakt)
   ============================================================ */
function buildStaticPage({ slug, title, description, content, depth = 1, activePath }) {
  const canonical = `${L.SITE.url}/${slug}/`;
  const ld = [
    L.organizationJsonLd(),
    L.breadcrumbJsonLd([
      { name: "Hem", url: L.SITE.url + "/" },
      { name: title, url: canonical }
    ])
  ];
  const body = `
${L.header(depth, activePath || '')}
${L.breadcrumbsHtml([{ name: "Hem", href: "" }, { name: title }], depth)}

<section style="padding-top:24px;">
  <div class="narrow">
    <h1>${L.escapeHtml(title)}</h1>
    ${content}
  </div>
</section>
${L.footer(depth)}
`;
  const html = L.head({ title, description, canonical, depth, jsonLd: ld }) + body;
  L.write(path.join(__dirname, slug, 'index.html'), html);
}

function buildOm() {
  buildStaticPage({
    slug: 'om',
    title: 'Om Kosttillskottprisjakt',
    description: 'Vi är en svensk prisjämförelse för kosttillskott. Vår mission: göra det självklart att hitta lägsta priset innan du klickar "köp".',
    activePath: 'about',
    content: `
      <p class="hero-sub">Vi är en oberoende prisjämförelse fokuserad på kosttillskott. Vi jämför pris mellan två svenska butiker – Svenskt Kosttillskott och Svensk Hälsokost – så att du som besökare slipper växla mellan flikar och prislappar för att hitta lägst pris.</p>
      <h2>Varför vi finns</h2>
      <p>Kosttillskott är ett av få områden där samma exakta produkt – samma molekyl, samma mängd – kan kosta 20–40% mer hos en butik än hos en annan från en vecka till nästa. Med tydlig pris-jämförelse kan du som konsument fatta beslutet på 10 sekunder istället för 10 minuter.</p>
      <h2>Vem driver sajten?</h2>
      <p>Sajten drivs av <strong>${L.SITE.org}</strong>, ett svenskt företag baserat i Falkenberg. Organisationsnummer ${L.SITE.orgnr}. VAT ${L.SITE.vat}.</p>
      <h2>Hur tjänar vi pengar?</h2>
      <p>Vi får affiliate-provision när du klickar dig vidare till en av våra två partnerbutiker och slutför ett köp. Provisionen påverkar aldrig vilket pris du betalar – och vi sätter aldrig en butik före en annan baserat på provision. Den butik som är billigast är alltid den vi rekommenderar. Mer info på <a href="../annonssamarbeten/">annonssamarbeten</a>.</p>
      <h2>Kontakt</h2>
      <p>Mejla oss på <a href="mailto:${L.SITE.email}">${L.SITE.email}</a> eller använd <a href="../kontakt/">kontaktformuläret</a>.</p>
    `
  });
}

function buildMetodik() {
  buildStaticPage({
    slug: 'metodik',
    title: 'Hur vi spårar priser',
    description: 'Så fungerar vår prisjämförelse: var prisdata kommer från, hur ofta den uppdateras och vad du bör tänka på.',
    content: `
      <p class="hero-sub">Transparens är viktigt – så här fungerar vår prisjämförelse i detalj.</p>
      <h2>Datakällor</h2>
      <p>Vi samlar in priser manuellt från butikernas öppna produktsidor. Vi väljer ett urval av topp-säljande produkter per kategori och uppdaterar siffrorna regelbundet. Pris efter inloggning eller medlemspris noteras separat när det skiljer sig markant.</p>
      <h2>Uppdateringsfrekvens</h2>
      <p>Pris-tabeller granskas och uppdateras minst en gång per vecka. Veckans toppfynd uppdateras oftare – upp till varje vardag under aktiva kampanj-perioder (Black Week, januari-rean, sommarrean).</p>
      <h2>Hur vi väljer "billigast"</h2>
      <ul class="list-clean">
        <li>Vi jämför grundpriset på exakt samma produkt – samma viktangivelse, samma smak när möjligt.</li>
        <li>Vi räknar om alla priser till pris per kilo, pris per gram aktiv substans eller pris per portion – inte pris per burk.</li>
        <li>Vi inkluderar publicerade kampanjpriser. Vi inkluderar inte engångsrabattkoder.</li>
      </ul>
      <h2>Vad vi inte gör</h2>
      <p>Vi har ingen automatiserad pris-spindel, ingen live-API mot butikerna och inga dolda affiliate-länkar. Allt prisdata är manuellt sammanställt – det betyder att enstaka burk-priser kan vara några dagar gamla. Klicka alltid igenom för att se aktuell prislapp innan du slutför köp.</p>
      <h2>Felrapportering</h2>
      <p>Hittar du ett pris som ser fel ut? Mejla <a href="mailto:${L.SITE.email}">${L.SITE.email}</a> så uppdaterar vi inom 24 timmar.</p>
    `
  });
}

function buildKontakt() {
  buildStaticPage({
    slug: 'kontakt',
    title: 'Kontakt',
    description: 'Kontaktuppgifter till Markdrop Solutions och Kosttillskottprisjakt.',
    content: `
      <p class="hero-sub">Vi tar gärna emot felrapporter, samarbetsförslag och frågor.</p>
      <h2>Allmänna ärenden</h2>
      <p>E-post: <a href="mailto:${L.SITE.email}">${L.SITE.email}</a></p>
      <h2>Företagsuppgifter</h2>
      <p>
        <strong>${L.SITE.org}</strong><br>
        ${L.SITE.address}<br>
        Org.nr ${L.SITE.orgnr}<br>
        VAT ${L.SITE.vat}
      </p>
      <h2>Pressförfrågningar</h2>
      <p>Skicka pressförfrågningar till samma adress – märk mejlet "Press" i ämnesraden så hanteras det med högre prioritet.</p>
      <h2>Affiliate &amp; samarbeten</h2>
      <p>Vi har idag två partnerbutiker och utökar inte sortimentet. För övriga kommersiella samarbeten – läs <a href="../annonssamarbeten/">annonssamarbeten</a>.</p>
    `
  });
}

function buildAnnons() {
  buildStaticPage({
    slug: 'annonssamarbeten',
    title: 'Annonssamarbeten &amp; affiliate-information',
    description: 'Så fungerar våra affiliate-länkar och kommersiella samarbeten.',
    content: `
      <p class="hero-sub">Vi vill att du som besökare ska kunna lita på våra rekommendationer. Här är hur våra kommersiella relationer fungerar.</p>
      <h2>Affiliate-länkar</h2>
      <p>Länkar märkta med "Köp hos" eller liknande är affiliate-länkar. Klickar du dig vidare och genomför ett köp får vi en provision från butiken. Provisionen påverkar aldrig vilket pris du betalar.</p>
      <h2>Våra partners</h2>
      <p>Vi har idag två partnerbutiker: <strong>Svenskt Kosttillskott</strong> och <strong>Svensk Hälsokost</strong>. Ingen av dem är prioriterad över den andra – den butik som är billigast på en given produkt är alltid den vi rekommenderar.</p>
      <h2>Hur det inte påverkar våra texter</h2>
      <ul class="list-clean">
        <li>Provisionsnivå styr aldrig vilken butik vi sätter överst i en pris-tabell.</li>
        <li>Vi publicerar negativa observationer om båda partners när det är relevant.</li>
        <li>Pris-data hämtas oberoende av provisionsavtalen.</li>
      </ul>
      <h2>Märkning</h2>
      <p>Alla affiliate-länkar har attributen <code>rel="nofollow sponsored"</code> och öppnas i en ny flik. Vi markerar tydligt på artikelsidor när texten innehåller affiliate-länkar.</p>
      <h2>Frågor?</h2>
      <p>Mejla <a href="mailto:${L.SITE.email}">${L.SITE.email}</a>.</p>
    `
  });
}

function buildIntegritet() {
  buildStaticPage({
    slug: 'integritet',
    title: 'Integritetspolicy',
    description: 'Så här hanterar vi personuppgifter på Kosttillskottprisjakt.',
    content: `
      <p class="hero-sub">Denna integritetspolicy gäller för besökare på kosttillskottprisjakt.se.</p>
      <h2>Personuppgiftsansvarig</h2>
      <p>${L.SITE.org}, ${L.SITE.address}. Org.nr ${L.SITE.orgnr}. Kontakt: <a href="mailto:${L.SITE.email}">${L.SITE.email}</a>.</p>
      <h2>Vilka uppgifter vi samlar in</h2>
      <p>Vi driver en statisk sajt utan inloggning. Vi samlar inte in dina personuppgifter direkt och vi har varken konton, formulär eller nyhetsbrev där du lämnar uppgifter.</p>
      <h2>Vad som händer när du klickar vidare</h2>
      <p>När du klickar på en länk till en partnerbutik lämnar du vår sajt. Då gäller den butikens egen integritetspolicy. Vi sätter <code>no-referrer</code> så butiken inte vet vilken sida på vår domän som skickade trafiken.</p>
      <h2>Cookies</h2>
      <p>Se separat <a href="../cookies/">cookie-information</a>.</p>
      <h2>Dina rättigheter</h2>
      <p>Du har enligt GDPR rätt till information om, rättelse av och radering av personuppgifter. Då vi inte lagrar några uppgifter om enskilda besökare finns ingen data att begära ut – men kontakta oss om du har frågor.</p>
      <h2>Klagomål</h2>
      <p>Klagomål kan lämnas till Integritetsskyddsmyndigheten (IMY).</p>
    `
  });
}

function buildVillkor() {
  buildStaticPage({
    slug: 'villkor',
    title: 'Användarvillkor',
    description: 'Villkor för användning av Kosttillskottprisjakt.',
    content: `
      <p class="hero-sub">Genom att använda kosttillskottprisjakt.se godkänner du följande villkor.</p>
      <h2>Information på sajten</h2>
      <p>All information på sajten ges i informativt syfte. Pris-data är manuellt sammanställd och kan vara inaktuell – kontrollera alltid priset i butiken innan köp.</p>
      <h2>Inga medicinska råd</h2>
      <p>Innehållet utgör inte medicinska eller hälsorelaterade råd. Konsultera läkare eller dietist vid hälsofrågor.</p>
      <h2>Affiliate-länkar</h2>
      <p>Sajten innehåller affiliate-länkar. Se <a href="../annonssamarbeten/">annonssamarbeten</a> för detaljer.</p>
      <h2>Ansvarsbegränsning</h2>
      <p>${L.SITE.org} ansvarar inte för köpbeslut eller transaktioner mellan dig och en partnerbutik. Reklamationer hanteras direkt av butiken där köpet gjordes.</p>
      <h2>Immateriella rättigheter</h2>
      <p>Allt innehåll – texter, design, kod – tillhör ${L.SITE.org}. Du får länka till våra sidor men inte återpublicera innehåll utan tillstånd.</p>
      <h2>Ändringar</h2>
      <p>Vi förbehåller oss rätten att uppdatera dessa villkor när som helst. Senast uppdaterad 2026-05-17.</p>
    `
  });
}

function buildCookies() {
  buildStaticPage({
    slug: 'cookies',
    title: 'Cookies',
    description: 'Så använder Kosttillskottprisjakt cookies – kort version: vi använder inga.',
    content: `
      <p class="hero-sub">Kort version: vi sätter inga cookies. Längre version nedan.</p>
      <h2>Vi sätter inga cookies själva</h2>
      <p>Sajten är en helt statisk affiliate-jämförelse. Vi har inga inloggade konton, inga formulär och ingen analys-tracking – och därför inga cookies som lagras i din webbläsare från vår domän.</p>
      <h2>Cookies från tredje part</h2>
      <p>Vi laddar webbtypsnitt från Google Fonts. Google kan tekniskt sätta cookies vid sådana anrop. Vi har inga affiliate-pixlar eller spårnings-script i sidkoden.</p>
      <h2>När du klickar vidare</h2>
      <p>Klickar du på en länk till en partnerbutik kan den butiken sätta sina egna cookies – t.ex. för att spåra köpet kopplat till oss för affiliate-provision. Dessa cookies styrs av butiken, inte oss.</p>
      <h2>Frågor</h2>
      <p>Mejla <a href="mailto:${L.SITE.email}">${L.SITE.email}</a>.</p>
    `
  });
}

/* ============================================================
   FAVICON + OG-default (enkel SVG)
   ============================================================ */
function buildAssetsSvg() {
  const fs = require('fs');
  const favicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0F1A14"/>
  <text x="32" y="42" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="34" font-weight="900" fill="#00C853">K</text>
  <circle cx="50" cy="14" r="6" fill="#FF6D00"/>
</svg>`;
  fs.writeFileSync(path.join(__dirname, 'assets', 'favicon.svg'), favicon, 'utf8');
  process.stdout.write('  wrote assets/favicon.svg\n');

  const og = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#00C853"/>
      <stop offset="1" stop-color="#FF6D00"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0F1A14"/>
  <rect x="40" y="40" width="1120" height="550" rx="32" fill="url(#g)" opacity="0.18"/>
  <text x="80" y="240" font-family="Arial Black, sans-serif" font-size="78" font-weight="900" fill="#ffffff">KOSTTILLSKOTT</text>
  <text x="80" y="320" font-family="Arial Black, sans-serif" font-size="78" font-weight="900" fill="#FF6D00">PRISJAKT</text>
  <text x="80" y="420" font-family="Arial, sans-serif" font-size="32" fill="#c9d4cd">Sveriges prisjämförelse för kosttillskott</text>
  <text x="80" y="540" font-family="Arial, sans-serif" font-size="26" fill="#FFD600">Svenskt Kosttillskott · Svensk Hälsokost · Lägsta pris just nu</text>
</svg>`;
  fs.writeFileSync(path.join(__dirname, 'assets', 'og-default.svg'), og, 'utf8');
  process.stdout.write('  wrote assets/og-default.svg\n');
}

buildAssetsSvg();
buildIndex();
buildQuiz();
buildOm();
buildMetodik();
buildKontakt();
buildAnnons();
buildIntegritet();
buildVillkor();
buildCookies();
console.log('Static pages built.');
