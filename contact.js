/* Contact form — FRONT-END VALIDATION ONLY.
   No backend is configured, so nothing is sent anywhere.
   After validation the visitor can open their own email app (needs `email` set in js/config.js). */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var result = document.getElementById("form-result");
    var cfg = window.PORTFOLIO_CONFIG || {};

    var rules = {
      name: function (v) {
        if (!v.trim()) return "Please enter your name.";
        if (v.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      },
      email: function (v) {
        if (!v.trim()) return "Please enter your email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Please enter a valid email address, like name@example.com.";
        return "";
      },
      subject: function (v) {
        if (!v.trim()) return "Please enter a subject.";
        return "";
      },
      message: function (v) {
        if (!v.trim()) return "Please write a message.";
        if (v.trim().length < 10) return "Message must be at least 10 characters.";
        return "";
      }
    };

    function check(field) {
      var input = form.elements[field];
      var msg = rules[field](input.value);
      var err = document.getElementById("err-" + field);
      err.textContent = msg;
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    }

    Object.keys(rules).forEach(function (f) {
      var input = form.elements[f];
      input.addEventListener("blur", function () { check(f); });
      input.addEventListener("input", function () { if (input.getAttribute("aria-invalid") === "true") check(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      result.hidden = true;
      var firstBad = null;
      Object.keys(rules).forEach(function (f) {
        if (!check(f) && !firstBad) firstBad = form.elements[f];
      });
      if (firstBad) { firstBad.focus(); return; }

      var html = "<strong>Your details look good — but nothing has been sent.</strong> " +
        "This website has no backend, so the form only checks your input in the browser.";
      var mail = (cfg.email || "").trim();
      if (mail) {
        var body = "Name: " + form.elements.name.value.trim() + "\nEmail: " + form.elements.email.value.trim() + "\n\n" + form.elements.message.value.trim();
        var href = "mailto:" + mail + "?subject=" + encodeURIComponent(form.elements.subject.value.trim()) + "&body=" + encodeURIComponent(body);
        html += ' <a href="' + href + '">Open this message in your email app</a> to send it.';
      } else {
        html += " (The site owner has not added an email address yet.)";
      }
      result.innerHTML = html;
      result.hidden = false;
      result.focus();
    });
  });
})();
