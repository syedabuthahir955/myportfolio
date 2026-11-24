/* Shared layout: navigation, footer, icons, social links, resume links, reveal + page transitions. */
(function () {
  var cfg = window.PORTFOLIO_CONFIG || {};
  var page = document.body.getAttribute("data-page");

  /* ---------- Icons (24x24, stroke) ---------- */
  var P = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    marketing: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 6a9 9 0 0 1 0 12"/>',
    seo: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/><path d="M8.5 12.5 10.5 10l1.5 1.5 2-2.5"/>',
    uiux: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18"/><path d="M9 9v11"/>',
    figma: '<rect x="5" y="3" width="14" height="18" rx="7" opacity="0"/><path d="M8 3h4a3 3 0 0 1 0 6H8a3 3 0 0 1 0-6z"/><path d="M12 3h4a3 3 0 0 1 0 6h-4z"/><path d="M8 9h4v6H8a3 3 0 0 1 0-6z"/><circle cx="16" cy="12" r="3"/><path d="M8 15h4v3a3 3 0 1 1-4-2.8"/>',
    html: '<path d="m8 8-5 4 5 4"/><path d="m16 8 5 4-5 4"/><path d="m14 5-4 14"/>',
    css: '<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.3-1-1.6-1-2.7 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4C21 6.4 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    wordpress: '<circle cx="12" cy="12" r="9"/><path d="M6.5 8.5 10 18l2.2-6.3L14.5 18 18 8.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10.5V17"/><circle cx="8" cy="7.6" r=".6"/><path d="M12 17v-6.5m0 3c0-2 1.2-3 2.8-3S17 11.6 17 13.5V17"/>',
    github: '<circle cx="6" cy="5.5" r="2.2"/><circle cx="6" cy="18.5" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 7.7v8.6"/><path d="M18 11.2c0 3-3 4-6 4H8.4"/>',
    cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5"/><path d="M22 9v5"/>',
    download: '<path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" ' + P + ' aria-hidden="true" focusable="false">' + (ICONS[name] || "") + "</svg>";
  }
  window.PortfolioIcon = svg;
  function hydrateIcons(scope) {
    (scope || document).querySelectorAll("[data-icon]").forEach(function (el) {
      if (!el.querySelector("svg")) el.insertAdjacentHTML("afterbegin", svg(el.getAttribute("data-icon")));
    });
  }

  /* ---------- Navigation ---------- */
  var NAV = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" }
  ];

  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var links = NAV.map(function (n) {
      return '<li><a href="' + n.href + '"' + (n.id === "home" ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
    }).join("");
    host.className = "site-header";
    host.innerHTML =
      '<div class="container"><nav class="nav" aria-label="Main navigation">' +
      '<a class="brand" href="#home" aria-label="R. M. Syed Abuthahir — Home"><span class="brand-mark" aria-hidden="true">SA</span><span class="brand-name">R. M. Syed Abuthahir</span></a>' +
      '<ul class="nav-links" id="nav-links">' + links + "</ul>" +
      '<div class="nav-actions">' +
      '<button class="icon-btn theme-toggle" id="theme-toggle" type="button" aria-pressed="false" aria-label="Switch to dark mode">' + svg("sun", "i-sun") + svg("moon", "i-moon") + "</button>" +
      '<button class="icon-btn menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">' + svg("menu") + "</button>" +
      "</div></nav></div>";

    document.getElementById("theme-toggle").addEventListener("click", function () { window.PortfolioTheme.toggle(); });
    window.PortfolioTheme.refresh();

    var menuBtn = document.getElementById("menu-toggle");
    var list = document.getElementById("nav-links");
    function setMenu(open) {
      list.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuBtn.innerHTML = svg(open ? "close" : "menu");
    }
    menuBtn.addEventListener("click", function () { setMenu(!list.classList.contains("open")); });
    list.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

    // Scroll-spy: highlight the nav link of the section currently in view
    var links = list.querySelectorAll("a");
    function setActive(id) {
      links.forEach(function (a) {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
    }
    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
      }, { rootMargin: "-35% 0px -60% 0px" });
      NAV.forEach(function (n) { var sec = document.getElementById(n.id); if (sec) spy.observe(sec); });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && list.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
    });
  }

  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.className = "site-footer";
    host.innerHTML = '<div class="container"><p>© ' + new Date().getFullYear() + " R. M. Syed Abuthahir · Madurai, Tamil Nadu, India</p></div>";
  }

  function renderBackground() {
    if (document.querySelector(".bg")) return;
    document.body.insertAdjacentHTML("afterbegin", '<div class="bg" aria-hidden="true"><i class="shape s0"></i><i class="shape s1"></i><i class="shape s2"></i><i class="shape s3"></i><i class="shape dots d1"></i><i class="shape dots d2"></i></div>');
  }

  /* ---------- Config-driven links ---------- */
  function wireLinks() {
    // Social + contact links
    document.querySelectorAll("[data-social]").forEach(function (el) {
      var key = el.getAttribute("data-social");
      var raw = (cfg[key] || "").trim();
      var href = key === "email" && raw ? "mailto:" + raw : raw;
      var valEl = el.querySelector(".val");
      var label = el.getAttribute("data-label") || key;
      if (href) {
        // Remove tracking parameters (?utm_source=...) so the opened link is clean
        if (key !== "email") { try { var u = new URL(href); u.search = ""; href = u.toString(); } catch (e) {} }
        el.setAttribute("href", href);
        if (key !== "email") { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener noreferrer"); }
        el.classList.remove("is-placeholder");
        el.removeAttribute("aria-disabled");
        if (valEl) valEl.textContent = key === "email" ? raw : (cfg.displayName || "R. M. Syed Abuthahir"); else el.setAttribute("aria-label", label);
      } else {
        el.removeAttribute("href");
        el.classList.add("is-placeholder");
        el.setAttribute("aria-disabled", "true");
        el.setAttribute("title", label + " — not added yet (edit js/config.js)");
        if (valEl) valEl.textContent = "Not added yet — edit js/config.js"; else el.setAttribute("aria-label", label + " — not added yet");
      }
    });
    document.querySelectorAll("[data-social-note]").forEach(function (n) {
      var any = cfg.email || cfg.linkedin || cfg.github;
      if (any) n.hidden = true;
    });

    // Resume
    document.querySelectorAll("[data-resume]").forEach(function (a) {
      a.setAttribute("href", cfg.resume || "assets/resume/Syed-Abuthahir-Resume.pdf");
      a.setAttribute("download", "");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function reveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach(function (i) { i.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------- Smooth page transition between pages ---------- */
  function transitions() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.addEventListener("pageshow", function () { document.body.classList.remove("is-leaving"); });
    if (reduce) return;
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      document.body.classList.add("is-leaving");
      setTimeout(function () { location.href = a.href; }, 200);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderBackground();
    renderHeader();
    renderFooter();
    hydrateIcons();
    wireLinks();
    reveal();
    transitions();
  });
})();
