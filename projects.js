/* "View Project" buttons.
   - If a URL is set for the project in js/config.js, the button becomes a real link.
   - Otherwise it opens a details pop-up built from the card itself (no duplicate text to maintain). */
(function () {
  var cfg = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.projects) || {};

  document.addEventListener("DOMContentLoaded", function () {
    var dialog = document.getElementById("project-dialog");
    var lastTrigger = null;

    document.querySelectorAll("[data-project]").forEach(function (btn) {
      var id = btn.getAttribute("data-project");
      var url = (cfg[id] || "").trim();

      if (url) {
        var a = document.createElement("a");
        a.className = btn.className;
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("aria-label", "View project: " + btn.getAttribute("data-title") + " (opens in a new tab)");
        a.innerHTML = btn.innerHTML;
        btn.replaceWith(a);
        return;
      }
      if (!dialog) return;
      btn.addEventListener("click", function () {
        var card = btn.closest("[data-project-card]");
        lastTrigger = btn;
        dialog.querySelector("[data-d-img]").src = card.querySelector("img").getAttribute("src");
        dialog.querySelector("[data-d-img]").alt = card.querySelector("img").getAttribute("alt");
        dialog.querySelector("[data-d-tags]").innerHTML = card.querySelector(".project-tags").innerHTML;
        dialog.querySelector("[data-d-title]").textContent = card.querySelector("h3").textContent;
        dialog.querySelector("[data-d-desc]").textContent = card.querySelector("p").textContent;
        dialog.showModal();
      });
    });

    if (dialog) {
      dialog.querySelector("[data-close]").addEventListener("click", function () { dialog.close(); });
      dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
      dialog.addEventListener("close", function () { if (lastTrigger) lastTrigger.focus(); });
    }
  });
})();
