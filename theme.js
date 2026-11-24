/* Theme logic — loaded in <head> (no defer) so the saved theme applies before first paint. */
(function () {
  var KEY = "portfolio-theme";
  var root = document.documentElement;
  root.classList.add("js");

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function systemPref() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0a0e2e" : "#eef1ff");
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }
  function set(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) { /* storage blocked: theme still changes for this page */ }
    apply(theme);
  }

  apply(saved() || systemPref());

  window.PortfolioTheme = {
    current: function () { return root.getAttribute("data-theme"); },
    toggle: function () { set(this.current() === "dark" ? "light" : "dark"); },
    refresh: function () { apply(this.current()); }
  };

  // Keep other open tabs/pages in sync.
  window.addEventListener("storage", function (e) {
    if (e.key === KEY && e.newValue) apply(e.newValue);
  });
})();
