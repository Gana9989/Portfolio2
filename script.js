(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var btn = document.getElementById("theme");

  function isDark() {
    var t = root.getAttribute("data-theme");
    return t
      ? t === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function label() {
    btn.textContent = isDark() ? "Light mode" : "Dark mode";
  }

  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}
  label();

  btn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    label();
  });

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
