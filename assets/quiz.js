// Quiz-tunnel — 5 frågor, rekommenderar Svenskt Kosttillskott eller Svensk Hälsokost.
// Använder tab-swap pop-under-tekniken vid slutresultat.

const QUIZ = [
  {
    q: "Vad är du primärt ute efter?",
    options: [
      { text: "Träningsbaserade tillskott (protein, kreatin, BCAA)", w: { sk: 2, sh: 0 } },
      { text: "Vitaminer, mineraler & dagshälsa",                      w: { sk: 0, sh: 2 } },
      { text: "Mix av båda – månadens helhetspaket",                   w: { sk: 1, sh: 1 } }
    ]
  },
  {
    q: "Hur stor är din månadsbudget?",
    options: [
      { text: "Under 300 kr",   w: { sk: 2, sh: 0 } },
      { text: "300–600 kr",     w: { sk: 1, sh: 1 } },
      { text: "Över 600 kr",    w: { sk: 0, sh: 2 } }
    ]
  },
  {
    q: "Hur viktigt är ett brett premium-sortiment?",
    options: [
      { text: "Inte alls – ge mig basvarorna billigt",        w: { sk: 2, sh: 0 } },
      { text: "Vissa premium-produkter, men inte mest",       w: { sk: 1, sh: 1 } },
      { text: "Mycket viktigt – jag vill ha specialmärken",   w: { sk: 0, sh: 2 } }
    ]
  },
  {
    q: "Hur ofta handlar du?",
    options: [
      { text: "En gång i månaden eller mer",  w: { sk: 2, sh: 0 } },
      { text: "Var-annan månad",              w: { sk: 1, sh: 1 } },
      { text: "Mer sällan – jag fyller på i parti", w: { sk: 0, sh: 2 } }
    ]
  },
  {
    q: "Vad lockar dig mest?",
    options: [
      { text: "Rejäla rabatter och rea-priser",          w: { sk: 2, sh: 0 } },
      { text: "Smarta stamkundspoäng på varje köp",      w: { sk: 0, sh: 2 } },
      { text: "Stort utbud så jag slipper handla flera ställen", w: { sk: 1, sh: 1 } }
    ]
  }
];

const RESULTS = {
  sk: {
    id: "svenskt_kosttillskott",
    name: "Svenskt Kosttillskott",
    text: "Baserat på dina svar maxar du sparpotentialen hos Svenskt Kosttillskott. Lägre baspris, aggressiv kampanjkalender och deras egen serie ger dig lägst pris per kilo – särskilt om du handlar tränings-tillskott.",
    pretty: "/go/svenskt-kosttillskott/",
    logo: "/assets/logos/svenskt-kosttillskott.png",
    color: "#00C853"
  },
  sh: {
    id: "svensk_halsokost",
    name: "Svensk Hälsokost",
    text: "Svensk Hälsokost är ditt bästa val. Bredare premium-sortiment, generösa stamkundspoäng och vassa vitaminpriser – din profil tjänar mest på deras setup.",
    pretty: "/go/svensk-halsokost/",
    logo: "/assets/logos/svensk-halsokost.png",
    color: "#FF6D00"
  }
};

(function () {
  var root = document.getElementById('quiz-root');
  if (!root) return;

  var step = 0;
  var scores = { sk: 0, sh: 0 };

  function render() {
    if (step >= QUIZ.length) return renderResult();
    var q = QUIZ[step];
    var pct = Math.round((step / QUIZ.length) * 100);
    root.innerHTML = ''
      + '<div class="quiz-progress"><div class="bar" style="width:' + pct + '%"></div></div>'
      + '<div class="quiz-question">' + escapeHtml(q.q) + '</div>'
      + '<div class="quiz-options">'
        + q.options.map(function (o, i) {
            return '<button data-i="' + i + '">' + escapeHtml(o.text) + '</button>';
          }).join('')
      + '</div>'
      + '<p class="text-mute mt-3" style="font-size:.85rem;">Steg ' + (step + 1) + ' av ' + QUIZ.length + '</p>';

    Array.prototype.forEach.call(root.querySelectorAll('button[data-i]'), function (b) {
      b.addEventListener('click', function () {
        var i = parseInt(b.getAttribute('data-i'), 10);
        var w = q.options[i].w;
        scores.sk += w.sk;
        scores.sh += w.sh;
        step++;
        render();
      });
    });
  }

  function renderResult() {
    var winnerKey = scores.sk >= scores.sh ? 'sk' : 'sh';
    var r = RESULTS[winnerKey];
    root.innerHTML = ''
      + '<div class="quiz-result">'
        + '<div class="quiz-progress"><div class="bar" style="width:100%"></div></div>'
        + '<div style="text-align:center; margin-bottom:18px;">'
          + '<img src="' + r.logo + '" alt="' + escapeHtml(r.name) + '" style="max-height:80px; width:auto; max-width:240px; object-fit:contain;">'
        + '</div>'
        + '<h2 style="font-size:2rem; margin-top:0; text-align:center;">Din matchning: <span style="color:' + r.color + '">' + escapeHtml(r.name) + '</span></h2>'
        + '<p style="font-size:1.05rem;">' + escapeHtml(r.text) + '</p>'
        + '<a href="' + r.pretty + '" id="quiz-cta" class="btn btn-block mt-3" rel="nofollow sponsored" target="_blank">Gå vidare till ' + escapeHtml(r.name) + ' &rarr;</a>'
        + '<button id="quiz-restart" class="btn btn-ghost btn-sm mt-3" style="display:block; margin:18px auto 0;">Gör om quizet</button>'
      + '</div>';

    document.getElementById('quiz-restart').addEventListener('click', function () {
      step = 0; scores = { sk: 0, sh: 0 }; render();
    });

    // Tab-swap pop-under: öppna affiliate-länk i ny flik, swap originalfönstret till content-sida
    var cta = document.getElementById('quiz-cta');
    cta.addEventListener('click', function (e) {
      e.preventDefault();
      try {
        var newTab = window.open('about:blank', '_blank');
        if (newTab) {
          newTab.opener = null;
          newTab.location = '/'; // ny flik tar besökaren till frontpage
        }
      } catch (err) {}
      // Originalfliken byter till pretty-link (som i sin tur redirectar till affiliate-URL)
      window.location.href = r.pretty;
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  render();
})();
