// Quiz-funnel: tab-swap popunder med dedupe.
// Antal frågor = antal pretty-links. Varje merchant fyrar ENDAST en gång per session.
// Click → ny flik öppnas (samme-origin popup) med quizet på nästa steg, current tab
// navigerar till /go/<merchant>/ vilket top-level redirectar via affiliate till merchant.com
// (first-party cookies sätts på merchant-domänen). På så vis får varje besökare BÅDA
// butikerna fyrade oavsett hur de svarar.
(function () {
  var TOTAL_QUESTIONS = 2;
  var SLUG = "rabattkod";
  var MERCHANT_POOL = ["svenskt-kosttillskott", "svensk-halsokost"];
  var FIRED_KEY = "quiz_fired_" + SLUG;

  var currentIdx = 0;

  function getFiredList() {
    try { return JSON.parse(sessionStorage.getItem(FIRED_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function markFired(merchant) {
    var list = getFiredList();
    list.push(merchant);
    try { sessionStorage.setItem(FIRED_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function pickMerchant(preferred) {
    var fired = getFiredList();
    // 1. Användarens val om det inte fyrat än
    if (preferred && fired.indexOf(preferred) === -1) return preferred;
    // 2. Nästa ofyrade från poolen
    for (var i = 0; i < MERCHANT_POOL.length; i++) {
      if (fired.indexOf(MERCHANT_POOL[i]) === -1) return MERCHANT_POOL[i];
    }
    // 3. Poolen tom — fyra inte mer
    return null;
  }

  function setProgress(idx) {
    var pct = Math.round(((idx + 1) / TOTAL_QUESTIONS) * 100);
    var fill = document.getElementById("progress-fill");
    var label = document.getElementById("progress-label");
    var pctEl = document.getElementById("progress-pct");
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = idx >= TOTAL_QUESTIONS ? "Klar!" : ("Fråga " + (idx + 1) + " av " + TOTAL_QUESTIONS);
    if (pctEl) pctEl.textContent = pct + "%";
  }

  // skipScroll = true vid fresh page-load via ?step=N — användaren är redan på toppen
  function showQuestion(idx, skipScroll) {
    document.querySelectorAll(".quiz-question[data-question-index]").forEach(function (q) {
      q.style.display = (parseInt(q.dataset.questionIndex, 10) === idx) ? "" : "none";
    });
    var finalEl = document.getElementById("quiz-final");
    if (idx >= TOTAL_QUESTIONS) {
      if (finalEl) finalEl.style.display = "";
      setProgress(TOTAL_QUESTIONS);
      if (!skipScroll && finalEl) {
        window.scrollTo({ top: finalEl.offsetTop - 20, behavior: "smooth" });
      }
    } else {
      if (finalEl) finalEl.style.display = "none";
      setProgress(idx);
      if (!skipScroll) {
        var el = document.querySelector('.quiz-question[data-question-index="' + idx + '"]');
        if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
      }
    }
  }

  // Bygg URL till samma quiz-sida men med ?step=N så popup-fliken landar på nästa fråga
  function buildNextStepUrl(nextStepIdx) {
    var u = new URL(window.location.href);
    u.searchParams.set("step", String(nextStepIdx));
    return u.pathname + u.search;
  }

  // TAB-SWAP klick-handler med dedupe:
  // 1. Plocka merchant (preferred ELLER fallback om dup)
  // 2. Öppna NY FLIK till nuvarande quiz-sida (samme-origin popup, mindre popup-blocking)
  // 3. Navigera CURRENT tab till /go/<merchant>/ → affiliate → merchant.com
  document.querySelectorAll("a.quiz-option[data-merchant]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var qidx = parseInt(a.dataset.questionIndex, 10);
      var preferred = a.dataset.merchant;
      var actual = pickMerchant(preferred);

      // Visuell feedback
      a.classList.add("selected");

      // Öppna NY FLIK med quizet på nästa steg
      try {
        window.open(buildNextStepUrl(qidx + 1), "_blank");
      } catch (err) {}

      if (actual) {
        markFired(actual);
        var fireUrl = "/go/" + encodeURIComponent(actual) + "/?_fire=1&from=quiz-" + encodeURIComponent(SLUG)
          + "&q=" + encodeURIComponent(a.dataset.question || ("q" + (qidx + 1)));
        window.location.href = fireUrl;
      } else {
        // Pool tom — fyra inte, gå bara vidare till nästa fråga
        setTimeout(function () {
          currentIdx = qidx + 1;
          showQuestion(currentIdx);
        }, 200);
      }
    });
  });

  // Om sidan laddas med ?step=N (från popup-fliken), hoppa direkt till den frågan
  var stepParam = new URLSearchParams(window.location.search).get("step");
  if (stepParam) {
    var stepIdx = parseInt(stepParam, 10);
    if (!isNaN(stepIdx) && stepIdx > 0) {
      currentIdx = stepIdx;
      showQuestion(stepIdx, true);
    }
  }
})();
