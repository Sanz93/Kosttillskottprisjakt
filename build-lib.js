// Gemensamma helpers + shared HTML chunks (header/footer/head).
// Allt rent CommonJS, ingen extern dependency.

const fs = require('fs');
const path = require('path');
const { SHOPS } = require('./assets/shops.js');

// Slug → clean_url lookup
const SHOP_URL_BY_SLUG = SHOPS.reduce((acc, s) => {
  acc[s.slug] = s.clean_url || s.pretty_link;
  return acc;
}, {});

// Adtraction Cleanlinks tracking script.
// data-cfasync="false" hindrar Cloudflare Rocket Loader från att fördröja/bryta scriptet.
const ADTRACTION_SCRIPT = `<script data-cfasync="false" type="text/javascript" src="https://cdn.adt523.net/atag.js?as=2008851212" charset="UTF-8"></script>`;

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
  ${noindex ? '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">' : '<meta name="robots" content="index, follow">'}
  <meta name="referrer" content="origin">
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
  <link rel="icon" type="image/png" href="${r}assets/logos/favicon.png">
  <link rel="apple-touch-icon" href="${r}assets/logos/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
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
  <div class="wrap nav">
    <a href="${r}" class="nav-logo" aria-label="Kosttillskottprisjakt – startsida">
      <img src="${r}assets/logos/kosttillskottprisjakt.png" alt="Kosttillskottprisjakt" class="nav-logo-img">
    </a>
    <button class="menu-toggle" aria-label="Meny" aria-expanded="false">&#9776;</button>
    <ul class="nav-links">
      ${link('priskategori/protein/',        'Priskategorier', 'cats')}
      ${link('butik/svenskt-kosttillskott/', 'Butiker',        'shops')}
      ${link('erbjudande/veckans-kampanjer-maj-2026/', 'Pris-guider',    'deals')}
      ${link('metodik/',                     'Metodik',        'methodology')}
      ${link('om/',                          'Om oss',         'about')}
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
        <li><a href="${r}erbjudande/veckans-kampanjer-maj-2026/">Veckans kampanjer</a></li>
      </ul>
    </div>
    <div>
      <h4>Butiker vi jämför</h4>
      <ul>
        <li><a href="${r}butik/svenskt-kosttillskott/">Svenskt Kosttillskott</a></li>
        <li><a href="${r}butik/svensk-halsokost/">Svensk Hälsokost</a></li>
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
${ADTRACTION_SCRIPT}
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

function priceTableHtml(products, depth) {
  const r = rel(depth || 0);
  const rows = products.map(p => {
    const sk = p.sk == null ? null : Number(p.sk);
    const sh = p.sh == null ? null : Number(p.sh);
    const skCell = sk == null ? '<span class="text-mute">–</span>' : `${sk} kr`;
    const shCell = sh == null ? '<span class="text-mute">–</span>' : `${sh} kr`;

    let winnerLabel, winnerSlug, saveLine;
    if (sk == null && sh != null) {
      winnerLabel = 'Endast Svensk Hälsokost'; winnerSlug = 'svensk-halsokost'; saveLine = '';
    } else if (sh == null && sk != null) {
      winnerLabel = 'Endast Svenskt Kosttillskott'; winnerSlug = 'svenskt-kosttillskott'; saveLine = '';
    } else if (sk < sh) {
      winnerLabel = 'Svenskt Kosttillskott'; winnerSlug = 'svenskt-kosttillskott';
      saveLine = `<div class="save">spar ${sh - sk} kr (${Math.round(((sh - sk) / sh) * 100)}%)</div>`;
    } else if (sh < sk) {
      winnerLabel = 'Svensk Hälsokost'; winnerSlug = 'svensk-halsokost';
      saveLine = `<div class="save">spar ${sk - sh} kr (${Math.round(((sk - sh) / sk) * 100)}%)</div>`;
    } else {
      winnerLabel = null; winnerSlug = null; saveLine = '';
    }

    const winCell = winnerLabel
      ? `<span class="win">${winnerLabel}</span>${saveLine}`
      : '<span class="text-mute">Lika pris</span>';
    const targetSlug = winnerSlug || 'svenskt-kosttillskott';
    const targetUrl = SHOP_URL_BY_SLUG[targetSlug] || `${r}go/${targetSlug}/`;
    const ctaCell = `<a class="btn btn-sm btn-ghost" rel="noopener sponsored" target="_blank" href="${targetUrl}">Till butiken</a>`;

    return `<tr>
      <td><strong>${escapeHtml(p.name)}</strong><br><span class="text-mute" style="font-size:.85rem;">${escapeHtml(p.unit || '')}</span></td>
      <td class="num">${skCell}</td>
      <td class="num">${shCell}</td>
      <td>${winCell}</td>
      <td>${ctaCell}</td>
    </tr>`;
  }).join('\n');

  return `<div class="price-table-wrap"><table class="price-table">
    <thead><tr>
      <th>Produkt</th>
      <th><img src="${r}assets/logos/svenskt-kosttillskott.png" alt="Svenskt Kosttillskott" class="th-logo"><span class="th-label">Svenskt Kosttillskott</span></th>
      <th><img src="${r}assets/logos/svensk-halsokost.png" alt="Svensk Hälsokost" class="th-logo"><span class="th-label">Svensk Hälsokost</span></th>
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
