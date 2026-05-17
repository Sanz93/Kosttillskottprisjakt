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

// Countdown — "erbjudande löper ut" (visuell brådska, nollas vid midnatt)
(function () {
  var nodes = document.querySelectorAll('[data-countdown]');
  if (!nodes.length) return;
  function tick() {
    var now = new Date();
    var end = new Date(now);
    end.setHours(23, 59, 59, 0);
    var diff = Math.max(0, end - now);
    var h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    var m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    var s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    nodes.forEach(function (n) {
      n.textContent = h + ':' + m + ':' + s;
    });
  }
  tick();
  setInterval(tick, 1000);
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
