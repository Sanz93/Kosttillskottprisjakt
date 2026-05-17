const path = require('path');
const { SHOPS } = require('./assets/shops.js');
const L = require('./build-lib.js');

function prettyLink(shop) {
  // /go/<slug>/index.html — meta refresh + JS-redirect + no-referrer + noindex
  const html = `<!doctype html>
<html lang="sv-SE">
<head>
  <meta charset="utf-8">
  <title>Vidarekoppling till ${L.escapeHtml(shop.name)}...</title>
  <meta name="robots" content="noindex, nofollow">
  <meta name="referrer" content="no-referrer">
  <meta http-equiv="refresh" content="0; url=about:blank" id="meta-r">
  <style>
    html, body { margin:0; padding:0; height:100%; }
    body {
      display:flex; align-items:center; justify-content:center;
      background:#0F1A14; color:#fff;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    }
    .box { text-align:center; }
    .dot {
      width:14px; height:14px; background:#00C853;
      border-radius:99px; display:inline-block;
      animation: pulse 0.9s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity:.4; }
      50%      { transform: scale(1.4); opacity:1; }
    }
  </style>
  <script src="/assets/config-links.js"></script>
</head>
<body>
  <div class="box">
    <img src="/assets/logos/${shop.slug}.png" alt="${L.escapeAttr(shop.name)}" style="max-height:70px; width:auto; max-width:240px; object-fit:contain; margin-bottom:18px; background:#fff; padding:8px 14px; border-radius:8px;">
    <div class="dot"></div>
    <p style="margin-top:14px;">Vidarekoppling till <strong>${L.escapeHtml(shop.name)}</strong>...</p>
  </div>
  <script>
    (function () {
      var id = "${shop.id}";
      var url = (window.REAL_LINKS && window.REAL_LINKS[id]) || "/";
      try {
        var m = document.getElementById('meta-r');
        if (m) m.setAttribute('content', '0; url=' + url);
      } catch (e) {}
      setTimeout(function () { window.location.replace(url); }, 300);
    })();
  </script>
  <noscript>
    <p>JavaScript är avstängt. <a href="/" rel="nofollow">Gå tillbaka</a>.</p>
  </noscript>
</body>
</html>`;
  L.write(path.join(__dirname, 'go', shop.slug, 'index.html'), html);
}

SHOPS.forEach(prettyLink);
console.log('Pretty-links built.');
