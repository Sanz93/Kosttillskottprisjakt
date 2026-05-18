const path = require('path');
const { CATEGORIES } = require('./assets/categories.js');
const L = require('./build-lib.js');

function categoryPage(cat) {
  const canonical = `${L.SITE.url}/priskategori/${cat.id}/`;
  const crumbs = [
    { name: "Hem", href: "" },
    { name: "Priskategorier", href: "priskategori/protein/" },
    { name: cat.name }
  ];

  // Räkna ut samlade fakta för intro
  const totalProducts = cat.products.length;
  let skWins = 0, shWins = 0, ties = 0;
  let maxSave = 0, maxSaveProd = '–';
  cat.products.forEach(p => {
    if (p.sk == null || p.sh == null) return; // exklusiva produkter räknas inte i vinster
    if (p.sk < p.sh) skWins++;
    else if (p.sh < p.sk) shWins++;
    else ties++;
    const diff = Math.abs(p.sk - p.sh);
    if (diff > maxSave) { maxSave = diff; maxSaveProd = p.name; }
  });

  const ld = [
    L.organizationJsonLd(),
    L.breadcrumbJsonLd(crumbs.map(c => ({
      name: c.name,
      url: c.href ? `${L.SITE.url}/${c.href}` : canonical
    }))),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": cat.name,
      "url": canonical,
      "numberOfItems": cat.products.length,
      "itemListElement": cat.products.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": p.name
      }))
    }
  ];

  const relatedLinks = CATEGORIES
    .filter(c => c.id !== cat.id)
    .slice(0, 6)
    .map((c, i) => `<a class="cat-tile" href="../${c.id}/"><div class="num">${String(i + 1).padStart(2, '0')}</div><h3>${L.escapeHtml(c.name)}</h3><p>${c.products.length} produkter jämförda</p></a>`)
    .join('');

  const body = `
${L.header(2, 'cats')}
${L.breadcrumbsHtml(crumbs, 2)}

<section>
  <div class="wrap">
    <span class="eyebrow">Priskategori</span>
    <h1>Priser på ${L.escapeHtml(cat.name.toLowerCase())}</h1>
    <p class="hero-sub">${L.escapeHtml(cat.intro)}</p>
    <p class="text-mute" style="font-size:.92rem;"><strong>Användning:</strong> ${L.escapeHtml(cat.intent)}</p>
    <div class="hero-actions">
      <a href="#tabell" class="btn btn-ghost">Gå till pris-tabellen</a>
      <a href="../../butik/svenskt-kosttillskott/" class="btn-link">Läs om butikerna &rarr;</a>
    </div>
  </div>
</section>

<section class="bg-alt">
  <div class="wrap">
    <div class="section-head"><h2>Snabbfakta</h2><div class="meta">Från dagens jämförelse</div></div>
    <div class="cat-grid">
      <div class="cat-tile"><div class="num">${String(totalProducts).padStart(2,'0')}</div><h3>Produkter jämförda</h3><p>I denna kategori</p></div>
      <div class="cat-tile"><div class="num">${String(ties).padStart(2,'0')}</div><h3>Identiskt pris</h3><p>Båda butikerna lika</p></div>
      <div class="cat-tile"><div class="num">${String(skWins + shWins).padStart(2,'0')}</div><h3>Pris skiljer sig</h3><p>${skWins} hos Svenskt Kosttillskott · ${shWins} hos Svensk Hälsokost</p></div>
      <div class="cat-tile"><div class="num">${maxSave > 0 ? maxSave + ' kr' : '–'}</div><h3>Största skillnad</h3><p>${L.escapeHtml(maxSaveProd)}</p></div>
    </div>
  </div>
</section>

<section id="tabell">
  <div class="wrap">
    <div class="section-head">
      <h2>Pris-tabell ${L.escapeHtml(cat.name.toLowerCase())}</h2>
      <div class="meta">Uppdaterat ${new Date().toISOString().slice(0,10)}</div>
    </div>
    ${L.priceTableHtml(cat.products, 2)}
    <p class="disclosure mt-3">Priserna uppdateras manuellt och kan skilja sig från butikens dagspris. Klicka alltid igenom för att se aktuell prislapp innan köp.</p>
  </div>
</section>

<section class="bg-alt">
  <div class="wrap">
    <div class="section-head"><h2>Fler priskategorier</h2><div class="meta">Jämför fler typer av tillskott</div></div>
    <div class="cat-grid">${relatedLinks}</div>
  </div>
</section>
${L.footer(2)}
`;

  const html = L.head({
    title: `${cat.name} – pris-jämförelse mellan Svenskt Kosttillskott och Svensk Hälsokost`,
    description: `Vi jämför ${cat.products.length} produkter inom ${cat.name.toLowerCase()} och visar var samma burk kostar minst just nu.`,
    canonical,
    depth: 2,
    jsonLd: ld
  }) + body;

  L.write(path.join(__dirname, 'priskategori', cat.id, 'index.html'), html);
}

CATEGORIES.forEach(categoryPage);
console.log('Categories built.');
