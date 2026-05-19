const path = require('path');
const { ARTICLES } = require('./assets/articles.js');
const { SHOPS } = require('./assets/shops.js');
const L = require('./build-lib.js');

const MONTHS = ['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
function formatDate(iso) {
  const d = new Date(iso);
  return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}

function articlePage(art) {
  const canonical = `${L.SITE.url}/erbjudande/${art.slug}/`;
  const crumbs = [
    { name: "Hem", href: "" },
    { name: "Pris-guider", href: "erbjudande/veckans-kampanjer-maj-2026/" },
    { name: art.title }
  ];
  const ld = [
    L.organizationJsonLd(),
    L.breadcrumbJsonLd(crumbs.map(c => ({ name: c.name, url: c.href ? `${L.SITE.url}/${c.href}` : canonical }))),
    L.articleJsonLd({ title: art.title, description: art.meta, slug: art.slug, published: art.published })
  ];

  const ctaShops = (art.cta_shops || []).map(id => SHOPS.find(s => s.id === id)).filter(Boolean);
  const ctaButtons = ctaShops.map((s, i) =>
    `<a href="${s.clean_url || s.pretty_link}" class="btn ${i === 0 ? '' : 'btn-ghost'}" rel="noopener sponsored" target="_blank">${L.escapeHtml(s.name)}</a>`
  ).join(' ');

  const sectionsHtml = art.sections.map((s, i) => {
    const insertBanner = (i === Math.floor(art.sections.length / 2)) ? `
    <div class="cta-banner">
      <h3>${L.escapeHtml(art.cta_label || 'Klicka in dig och kolla aktuellt pris')}</h3>
      <div class="actions">${ctaButtons}</div>
    </div>` : '';
    return `<h2>${L.escapeHtml(s.h)}</h2><p>${L.escapeHtml(s.p)}</p>${insertBanner}`;
  }).join('\n');

  // Relaterade artiklar
  const related = ARTICLES.filter(a => a.slug !== art.slug).slice(0, 3);
  const relatedCards = related.map(a => `
    <a class="article-card" href="../${a.slug}/">
      <div class="date">${L.escapeHtml(formatDate(a.published))}</div>
      <h3>${L.escapeHtml(a.title)}</h3>
      <p>${L.escapeHtml(a.meta)}</p>
      <span class="read">Läs guiden &rarr;</span>
    </a>`).join('');

  const body = `
${L.header(2, 'deals')}
${L.breadcrumbsHtml(crumbs, 2)}

<section class="article-hero">
  <div class="narrow">
    <span class="eyebrow">Pris-guide</span>
    <h1>${L.escapeHtml(art.title)}</h1>
    <p class="article-meta">Publicerad ${L.escapeHtml(formatDate(art.published))}</p>
    <p class="article-lead">${L.escapeHtml(art.lead)}</p>
  </div>
</section>

<article class="article-body">
  <div class="narrow">
    <div class="disclosure">Vi kan få provision om du klickar på länkar i denna text och genomför ett köp. Det påverkar inte vilket pris du betalar. Läs mer på <a href="../../annonssamarbeten/">annonssamarbeten</a>.</div>
    ${sectionsHtml}

    <div class="cta-banner">
      <h3>${L.escapeHtml(art.cta_label || 'Hitta lägsta priset just nu')}</h3>
      <div class="actions">${ctaButtons}</div>
    </div>
  </div>
</article>

<section class="bg-alt">
  <div class="wrap">
    <div class="section-head"><h2>Fler pris-guider</h2><div class="meta">Mer fynd-jakt</div></div>
    <div class="article-grid">${relatedCards}</div>
  </div>
</section>
${L.footer(2)}
`;

  const html = L.head({
    title: art.title,
    description: art.meta,
    canonical,
    depth: 2,
    jsonLd: ld
  }) + body;

  L.write(path.join(__dirname, 'erbjudande', art.slug, 'index.html'), html);
}

ARTICLES.forEach(articlePage);
console.log('Articles built.');
