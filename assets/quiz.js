// Quiz-funnel — ren progression.
//
// VIKTIGT: Affiliate-spårningen sköts av Adtraction atag.js (laddad i footern).
// atag.js skriver om href-attributet på merchant-länkar till en spårnings-URL.
// Quizet får därför ALDRIG intercepta klicket (preventDefault) eller navigera
// manuellt — då bypassas atag.js och klicket spåras inte.
//
// Vi låter klicket gå helt naturligt: ankaret har target="_blank" så merchant
// öppnas i ny flik (via atag.js spårnings-URL), och vi avancerar bara quizet
// i nuvarande flik.
(function () {
  var TOTAL_QUESTIONS = 2;

  function setProgress(idx) {
    var shown = Math.min(idx, TOTAL_QUESTIONS - 1);
    var pct = Math.round(((shown + 1) / TOTAL_QUESTIONS) * 100);
    var fill = document.getElementById("progress-fill");
    if (fill) fill.style.width = pct + "%";
    var label = document.getElementById("progress-label");
    if (label) label.textContent = idx >= TOTAL_QUESTIONS ? "Klar!" : ("Fråga " + (idx + 1) + " av " + TOTAL_QUESTIONS);
    var pctEl = document.getElementById("progress-pct");
    if (pctEl) pctEl.textContent = pct + "%";
  }

  function showQuestion(idx) {
    document.querySelectorAll(".quiz-question[data-question-index]").forEach(function (q) {
      q.style.display = (parseInt(q.dataset.questionIndex, 10) === idx) ? "" : "none";
    });
    var finalEl = document.getElementById("quiz-final");
    if (idx >= TOTAL_QUESTIONS) {
      if (finalEl) finalEl.style.display = "";
      setProgress(TOTAL_QUESTIONS);
      if (finalEl) window.scrollTo({ top: finalEl.offsetTop - 20, behavior: "smooth" });
    } else {
      if (finalEl) finalEl.style.display = "none";
      setProgress(idx);
      var el = document.querySelector('.quiz-question[data-question-index="' + idx + '"]');
      if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
    }
  }

  // Klick på svar: INGEN preventDefault, INGEN manuell navigation.
  // Länken (target="_blank", href omskriven av atag.js) öppnar merchant i ny
  // flik och spåras av Adtraction. Vi avancerar bara quizet efter en kort tick.
  document.querySelectorAll("a.quiz-option").forEach(function (a) {
    a.addEventListener("click", function () {
      var qidx = parseInt(a.dataset.questionIndex, 10);
      setTimeout(function () { showQuestion(qidx + 1); }, 250);
    });
  });
})();
