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
  let maxSave = 0, maxSaveProd = '';
  cat.products.forEach(p => {
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
    .map(c => `<a class="cat-tile" href="../${c.id}/"><div class="num">${String(c.products.length).padStart(2, '0')}</div><h3>${L.escapeHtml(c.name)}</h3><p>Pris-jämförelse</p></a>`)
    .join('');

  const body = `
${L.header(2, 'cats')}
${L.breadcrumbsHtml(crumbs, 2)}

<section style="padding-top:24px;">
  <div class="wrap">
    <div class="hero-tag">Priskategori</div>
    <h1>${L.escapeHtml(cat.name)} – var är priset lägst?</h1>
    <p class="hero-sub">${L.escapeHtml(cat.intro)}</p>
    <p class="text-mute" style="font-size:.92rem;"><strong>Användning:</strong> ${L.escapeHtml(cat.intent)}</p>
    <div class="hero-actions">
      <a href="#tabell" class="btn">Gå till pris-tabellen</a>
      <a href="../../quiz/" class="btn btn-ghost">Hitta din butik via quiz</a>
    </div>
  </div>
</section>

<section class="bg-alt">
  <div class="wrap">
    <div class="section-head"><h2>Snabbfakta</h2><div class="meta">Statistik från dagens jämförelse</div></div>
    <div class="cat-grid">
      <div class="cat-tile"><div class="num">${totalProducts}</div><h3>Produkter jämförda</h3><p>I denna kategori</p></div>
      <div class="cat-tile"><div class="num">${skWins}</div><h3>Svenskt Kosttillskott vinner</h3><p>Av ${totalProducts} produkter</p></div>
      <div class="cat-tile"><div class="num">${shWins}</div><h3>Svensk Hälsokost vinner</h3><p>Av ${totalProducts} produkter</p></div>
      <div class="cat-tile"><div class="num">${maxSave} kr</div><h3>Största prisskillnad</h3><p>${L.escapeHtml(maxSaveProd)}</p></div>
    </div>
  </div>
</section>

<section id="tabell">
  <div class="wrap">
    <div class="section-head">
      <h2>Pris-tabell ${L.escapeHtml(cat.name.toLowerCase())}</h2>
      <div class="meta">Uppdaterat ${new Date().toISOString().slice(0,10)}</div>
    </div>
    ${L.priceTableHtml(cat.products)}
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
