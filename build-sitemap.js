const path = require('path');
const fs = require('fs');
const { SHOPS } = require('./assets/shops.js');
const { CATEGORIES } = require('./assets/categories.js');
const { ARTICLES } = require('./assets/articles.js');
const L = require('./build-lib.js');

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: "/",                       prio: "1.0", change: "daily"  },
  { loc: "/om/",                    prio: "0.5", change: "monthly"},
  { loc: "/metodik/",               prio: "0.5", change: "monthly"},
  { loc: "/kontakt/",               prio: "0.4", change: "yearly" },
  { loc: "/annonssamarbeten/",      prio: "0.4", change: "yearly" },
  { loc: "/integritet/",            prio: "0.3", change: "yearly" },
  { loc: "/villkor/",               prio: "0.3", change: "yearly" },
  { loc: "/cookies/",               prio: "0.3", change: "yearly" }
];

SHOPS.forEach(s => urls.push({ loc: `/butik/${s.slug}/`,           prio: "0.8", change: "weekly" }));
CATEGORIES.forEach(c => urls.push({ loc: `/priskategori/${c.id}/`, prio: "0.8", change: "weekly" }));
ARTICLES.forEach(a => urls.push({ loc: `/erbjudande/${a.slug}/`,   prio: "0.7", change: "weekly", lastmod: a.published }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${L.SITE.url}${u.loc}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.change}</changefreq>
    <priority>${u.prio}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
console.log('Sitemap built: ' + urls.length + ' URLs.');
