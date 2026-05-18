const path = require('path');
const { SHOPS } = require('./assets/shops.js');
const L = require('./build-lib.js');

function shopPage(shop) {
  const otherShop = SHOPS.find(s => s.id !== shop.id);
  const canonical = `${L.SITE.url}/butik/${shop.slug}/`;
  const crumbs = [
    { name: "Hem", href: "" },
    { name: "Butiker", href: "butik/svenskt-kosttillskott/" },
    { name: shop.name }
  ];
  const ld = [
    L.organizationJsonLd(),
    L.breadcrumbJsonLd(crumbs.map(c => ({ name: c.name, url: c.href ? `${L.SITE.url}/${c.href}` : canonical }))),
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": shop.name,
      "url": canonical,
      "description": shop.tagline,
      "areaServed": "SE",
      "priceRange": shop.price_level
    }
  ];

  const productsRows = shop.top_products.map(p => {
    const save = p.normal - p.price;
    const savePct = Math.round((save / p.normal) * 100);
    return `<tr>
      <td><strong>${L.escapeHtml(p.name)}</strong></td>
      <td class="num sk">${p.price} kr</td>
      <td class="text-mute"><s>${p.normal} kr</s></td>
      <td><span class="win">Spar ${save} kr</span><div class="save">${savePct}% rabatt</div></td>
    </tr>`;
  }).join('\n');

  const body = `
${L.header(2, 'shops')}
${L.breadcrumbsHtml(crumbs, 2)}

<section>
  <div class="wrap">
    <div class="shop-hero">
      <img src="../../assets/logos/${shop.slug}.png" alt="${L.escapeAttr(shop.name)}" class="shop-hero-logo">
      <div>
        <span class="eyebrow">Butik · prisanalys</span>
        <h1>Priser hos ${L.escapeHtml(shop.name)}</h1>
        <p class="hero-sub" style="margin-bottom:24px;">${L.escapeHtml(shop.tagline)}</p>
        <div class="hero-actions">
          <a href="${shop.pretty_link}" class="btn" rel="nofollow sponsored" target="_blank">Till ${L.escapeHtml(shop.name)} &rarr;</a>
          <a href="../${otherShop.slug}/" class="btn-link">Jämför med ${L.escapeHtml(otherShop.name)} &rarr;</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bg-alt">
  <div class="wrap">
    <div class="section-head"><h2>Om butiken</h2><div class="meta">Sortiment och prisnivå</div></div>
    <div class="shop-compare">
      <div class="shop-card">
        <h3>Fakta</h3>
        <p class="tagline">${L.escapeHtml(shop.tagline)}</p>
        <ul>
          <li><strong>Grundat:</strong> ${shop.founded}</li>
          <li><strong>Bas:</strong> ${L.escapeHtml(shop.location)}</li>
          <li><strong>Prisnivå:</strong> ${L.escapeHtml(shop.price_level)}</li>
          <li><strong>Fri frakt från:</strong> ${shop.shipping_free_from} kr</li>
          <li><strong>Snittbesparing i kampanjer:</strong> ${shop.avg_savings_pct}%</li>
        </ul>
      </div>
      <div class="shop-card">
        <h3>Styrkor</h3>
        <ul>${shop.strengths.map(s => `<li>${L.escapeHtml(s)}</li>`).join('')}</ul>
        <h3 class="mt-3">Att tänka på</h3>
        <ul>${shop.weaknesses.map(s => `<li>${L.escapeHtml(s)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head">
      <h2>Toppsäljarnas pris just nu</h2>
      <div class="meta">5 mest köpta produkterna · uppdaterat ${new Date().toISOString().slice(0,10)}</div>
    </div>
    <div class="price-table-wrap"><table class="price-table">
      <thead><tr><th>Produkt</th><th>Pris nu</th><th>Normalt</th><th>Besparing</th></tr></thead>
      <tbody>${productsRows}</tbody>
    </table></div>
    <div class="cta-banner mt-4">
      <h3>Klicka direkt till butiken &amp; lås in dagens pris</h3>
      <div class="actions">
        <a href="${shop.pretty_link}" class="btn" rel="nofollow sponsored" target="_blank">Till ${L.escapeHtml(shop.name)}</a>
        <a href="../../priskategori/protein/" class="btn btn-ghost">Se kategorijämförelse</a>
      </div>
    </div>
  </div>
</section>

<section class="bg-alt">
  <div class="wrap">
    <div class="section-head"><h2>Så jämför vi mot konkurrenten</h2><div class="meta">Pris &middot; sortiment &middot; total kostnad</div></div>
    <p>Vi tar exakt samma 5 toppsäljare och kollar pris hos ${L.escapeHtml(otherShop.name)}. Inkluderar grundpris, kampanjpris och kostnaden efter att stamkundsrabatt dragits.</p>
    <p>I snitt under de senaste 6 månaderna har <strong>${L.escapeHtml(shop.name)}</strong> varit billigast på ${shop.id === 'svenskt_kosttillskott' ? 'protein, kreatin och pre-workout' : 'vitaminer, omega-3 och premium-serier'}, medan <strong>${L.escapeHtml(otherShop.name)}</strong> ofta vinner på övriga kategorier.</p>
    <p><a href="../../erbjudande/samma-agare-olika-kampanjer/" class="btn-link">Läs hela jämförelsen &rarr;</a></p>
  </div>
</section>
${L.footer(2)}
`;

  const html = L.head({
    title: `${shop.name} – pris-analys och dagens deals`,
    description: `Så bra är priserna hos ${shop.name}. Vi listar topp-säljarnas pris, snittbesparing i kampanjer och var det lönar sig att handla.`,
    canonical,
    depth: 2,
    jsonLd: ld
  }) + body;

  L.write(path.join(__dirname, 'butik', shop.slug, 'index.html'), html);
}

// Översikts-index för /butik/ kan ev. läggas till senare
SHOPS.forEach(shopPage);
console.log('Shops built.');
