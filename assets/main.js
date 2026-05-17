// Hamburger-meny
(function () {
  var btn = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }
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
