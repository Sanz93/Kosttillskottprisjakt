// Hamburger-meny
(function () {
  var btn = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  var OPEN_ICON = '✕';    // ✕
  var CLOSED_ICON = '☰';  // ☰
  btn.textContent = CLOSED_ICON;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? OPEN_ICON : CLOSED_ICON;
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!nav.classList.contains('open'));
  });

  // Klick utanför navigationen stänger menyn
  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || btn.contains(e.target)) return;
    setOpen(false);
  });

  // Esc stänger menyn
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
  });

  // Klick på en länk i menyn stänger den (viktigt för same-page anchors)
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });
})();

// Pretty-link redirect (används på /go/<id>/index.html)
window.__redirectPretty = function (id) {
  try {
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'referrer');
    meta.setAttribute('content', 'no-referrer');
    document.head.appendChild(meta);
  } catch (e) {}
  var url = (window.REAL_LINKS && window.REAL_LINKS[id]) || '/';
  setTimeout(function () { window.location.replace(url); }, 250);
};
