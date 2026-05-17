// Gemensamma helpers + shared HTML chunks (header/footer/head).
// Allt rent CommonJS, ingen extern dependency.

const fs = require('fs');
const path = require('path');

const SITE = {
  url: "https://kosttillskottprisjakt.se",
  name: "Kosttillskottprisjakt",
  tag: "Sveriges prisjämförelse för kosttillskott",
  org: "Markdrop Solutions",
  orgnr: "930204-2933",
  vat: "SE930204293301",
  email: "robin.svensson93@hotmail.com",
  address: "Stafsinge 557, 311 94 Falkenberg, Sverige"
};

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content, 'utf8');
  process.stdout.write('  wrote ' + path.relative(process.cwd(), filePath) + '\n');
}

function rel(depth) {
  // depth = antal "../" tillbaka till site-root från sidan
  return depth === 0 ? './' : '../'.repeat(depth);
}

function head({ title, description, canonical, ogImage, depth, jsonLd, extraHead, noindex }) {
  const r = rel(depth);
  const ld = [].concat(jsonLd || []).map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n  ');
  return `<!doctype html>
<html lang="sv-SE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} · ${SITE.name}</title>
  <meta name="description" content="${escapeAttr(description)}">
  ${noindex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow">'}
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="sv_SE">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage || (SITE.url + '/assets/og-default.svg')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(title)}">
  <meta name="twitter:description" content="${escapeAttr(description)}">
  <link rel="icon" type="image/svg+xml" href="${r}assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${r}assets/styles.css">
  ${ld}
  ${extraHead || ''}
</head>
<body>`;
}

function header(depth, activePath) {
  const r = rel(depth);
  const link = (href, label, key, extraClass) => {
    const active = activePath === key ? ' aria-current="page"' : '';
    return `<li><a${active}${extraClass ? ` class="${extraClass}"` : ''} href="${r}${href}">${label}</a></li>`;
  };
  return `
<header class="site-header">
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <span><span class="pop">●</span> Lägsta proteinpriset just nu: 249 kr / kilo &nbsp;&nbsp;</span>
      <span><span class="pop">●</span> Kreatin från 33 öre / gram &nbsp;&nbsp;</span>
      <span><span class="pop">●</span> Premium-omega 209 kr (normalt 269 kr) &nbsp;&nbsp;</span>
      <span><span class="pop">●</span> Veckans toppfynd uppdaterade &nbsp;&nbsp;</span>
      <span><span class="pop">●</span> Pris-spårning sedan 2024 &nbsp;&nbsp;</span>
    </div>
  </div>
  <div class="wrap nav">
    <a href="${r}" class="nav-logo">Kosttillskott<span class="accent">prisjakt</span><span class="dot">.</span></a>
    <button class="menu-toggle" aria-label="Meny" aria-expanded="false">&#9776;</button>
    <ul class="nav-links">
      ${link('priskategori/protein/',        'Priskategorier', 'cats')}
      ${link('butik/svenskt-kosttillskott/', 'Butiker',        'shops')}
      ${link('erbjudande/veckans-toppfynd/', 'Erbjudanden',    'deals')}
      ${link('quiz/',                        'Quiz',           'quiz')}
      ${link('om/',                          'Om oss',         'about')}
      ${link('quiz/',                        'Hitta bästa pris', 'cta', 'nav-cta')}
    </ul>
  </div>
</header>`;
}

function footer(depth) {
  const r = rel(depth);
  return `
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <h4>${SITE.name}</h4>
      <p style="margin-top:8px;">${SITE.tag}. Vi jämför pris mellan Svenskt Kosttillskott och Svensk Hälsokost och visar var samma burk kostar minst.</p>
    </div>
    <div>
      <h4>Hitta lägst pris</h4>
      <ul>
        <li><a href="${r}priskategori/protein/">Proteinpulver</a></li>
        <li><a href="${r}priskategori/kreatin/">Kreatin</a></li>
        <li><a href="${r}priskategori/vitaminer/">Vitaminer</a></li>
        <li><a href="${r}priskategori/pre-workout/">Pre-workout</a></li>
        <li><a href="${r}erbjudande/veckans-toppfynd/">Veckans toppfynd</a></li>
      </ul>
    </div>
    <div>
      <h4>Butiker vi jämför</h4>
      <ul>
        <li><a href="${r}butik/svenskt-kosttillskott/">Svenskt Kosttillskott</a></li>
        <li><a href="${r}butik/svensk-halsokost/">Svensk Hälsokost</a></li>
        <li><a href="${r}quiz/">Hitta din matchning</a></li>
      </ul>
    </div>
    <div>
      <h4>Information</h4>
      <ul>
        <li><a href="${r}om/">Om oss</a></li>
        <li><a href="${r}metodik/">Hur vi spårar priser</a></li>
        <li><a href="${r}kontakt/">Kontakt</a></li>
        <li><a href="${r}annonssamarbeten/">Annonssamarbeten</a></li>
        <li><a href="${r}integritet/">Integritet</a></li>
        <li><a href="${r}villkor/">Villkor</a></li>
        <li><a href="${r}cookies/">Cookies</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>&copy; 2026 ${SITE.org} &middot; Org.nr ${SITE.orgnr} &middot; VAT ${SITE.vat}</span>
    <span>${SITE.address}</span>
  </div>
</footer>
<script src="${r}assets/config-links.js"></script>
<script src="${r}assets/main.js"></script>
</body></html>`;
}

function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE.org,
    "url": SITE.url,
    "email": SITE.email,
    "vatID": SITE.vat,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Stafsinge 557",
      "postalCode": "311 94",
      "addressLocality": "Falkenberg",
      "addressCountry": "SE"
    }
  };
}

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE.name,
    "url": SITE.url,
    "inLanguage": "sv-SE"
  };
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": it.url
    }))
  };
}

function breadcrumbsHtml(items, depth) {
  const r = rel(depth);
  return `<nav class="crumbs wrap" aria-label="Brödsmulor">
    ${items.map((it, idx) => {
      const last = idx === items.length - 1;
      const href = (it.href != null) ? `${r}${it.href}` : '#';
      return last
        ? `<span aria-current="page">${escapeHtml(it.name)}</span>`
        : `<a href="${href}">${escapeHtml(it.name)}</a><span class="sep">&rsaquo;</span>`;
    }).join('')}
  </nav>`;
}

function articleJsonLd({ title, description, slug, published }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "inLanguage": "sv-SE",
    "datePublished": published,
    "dateModified": published,
    "mainEntityOfPage": `${SITE.url}/erbjudande/${slug}/`,
    "author": { "@type": "Organization", "name": SITE.org },
    "publisher": {
      "@type": "Organization",
      "name": SITE.name,
      "url": SITE.url
    }
  };
}

function priceTableHtml(products) {
  const rows = products.map(p => {
    const sk = Number(p.sk);
    const sh = Number(p.sh);
    const winner = sk < sh ? 'SK' : (sh < sk ? 'SH' : '–');
    const save = Math.abs(sk - sh);
    const savePct = Math.round((save / Math.max(sk, sh)) * 100);
    return `<tr>
      <td><strong>${escapeHtml(p.name)}</strong><br><span class="text-mute" style="font-size:.85rem;">${escapeHtml(p.unit || '')}</span></td>
      <td class="num sk">${sk} kr</td>
      <td class="num sh">${sh} kr</td>
      <td>${winner === '–'
          ? '<span class="text-mute">Lika</span>'
          : `<span class="win">${winner === 'SK' ? 'Svenskt Kosttillskott' : 'Svensk Hälsokost'}</span>
             <div class="save">spar ${save} kr (${savePct}%)</div>`
        }</td>
      <td>
        <a class="btn btn-sm btn-green" rel="nofollow sponsored" target="_blank" href="/go/${winner === 'SK' ? 'svenskt-kosttillskott' : (winner === 'SH' ? 'svensk-halsokost' : 'svenskt-kosttillskott')}/">Köp billigast</a>
      </td>
    </tr>`;
  }).join('\n');
  return `<div class="price-table-wrap"><table class="price-table">
    <thead><tr>
      <th>Produkt</th>
      <th>Svenskt Kosttillskott</th>
      <th>Svensk Hälsokost</th>
      <th>Billigast</th>
      <th></th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

module.exports = {
  SITE,
  ensureDir,
  write,
  rel,
  head,
  header,
  footer,
  organizationJsonLd,
  websiteJsonLd,
  breadcrumbJsonLd,
  breadcrumbsHtml,
  articleJsonLd,
  priceTableHtml,
  escapeHtml,
  escapeAttr
};
