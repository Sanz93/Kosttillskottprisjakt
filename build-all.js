// Kör alla build-scripts i ordning.
console.log('==> Bygger shops');       require('./build-shops.js');
console.log('==> Bygger categories');  require('./build-categories.js');
console.log('==> Bygger articles');    require('./build-articles.js');
console.log('==> Bygger pretty-links');require('./build-pretty-links.js');
console.log('==> Bygger static pages');require('./build-static.js');
console.log('==> Bygger sitemap');     require('./build-sitemap.js');
console.log('Klart.');
