/* Subtle scroll parallax for the large home-page heading.
   - Only runs while the hero is on screen (IntersectionObserver).
   - One passive scroll listener, updates batched with requestAnimationFrame.
   - Movement is capped (±40px) and disabled for prefers-reduced-motion. */
(function () {
  var el = document.querySelector("[data-parallax]");
  if (!el) return;

  /* Split the heading into letters so each one can animate and react to hover. */
  (function () {
    var node = el.firstChild;
    if (!node || node.nodeType !== 3) return;
    var text = node.nodeValue.trim();
    var frag = document.createDocumentFragment();
    var chars = Array.from(text);
    chars.forEach(function (c, i) {
      var s = document.createElement("span");
      s.className = "ch"; s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--i", i); s.style.setProperty("--n", chars.length);
      s.textContent = c;
      frag.appendChild(s);
    });
    el.replaceChild(frag, node);
    el.classList.add("is-split");
  })();
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SPEED = 0.12;   // lower = subtler
  var MAX = 40;       // px cap
  var visible = true, ticking = false;

  function update() {
    ticking = false;
    var y = Math.min(window.scrollY * SPEED, MAX);
    el.style.setProperty("--parallax-y", y.toFixed(1) + "px");
  }
  function onScroll() {
    if (!visible || ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) onScroll();
    }, { threshold: 0 }).observe(el.closest(".hero") || el);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
})();
