/* Меню, год в подвале и анимации при прокрутке */
(() => {
  window.__nskReady = true;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = matchMedia("(min-width: 1025px)");

  /* ---------- Мобильное меню ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    document.body.classList.toggle("menu-open", open);
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  desktop.addEventListener("change", () => setMenu(false));

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Появление блоков при прокрутке ----------
     Скрытие задано в CSS (только при классе .js и без «уменьшения движения»),
     здесь лишь добавляем .is-in и задержку для волны. */
  const groups = [
    [".perks li", (i) => 0.45 + i * 0.08],
    [".sec__title", () => 0],
    [".sec__sub", () => 0.1],
    [".sec__head .more", () => 0.15],
    [".srv__pic", () => 0],
    [".srv__body", () => 0.15],
    [".srv__body h3", () => 0.35],
    [".num", (i) => i * 0.12],
    [".lead", () => 0],
    [".steps li", (i) => (i % 4) * 0.07],
    [".night", () => 0],
    [".review", (i) => (i % 3) * 0.09],
    [".worklist > div", (i) => i * 0.1],
    [".contacts__info", () => 0],
    [".contacts__card", () => 0.12],
  ];
  const targets = [];
  groups.forEach(([sel, delay]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.setProperty("--d", `${delay(i)}s`);
      targets.push(el);
    });
  });

  const reveal = (el) => {
    el.classList.add("is-in");
    if (el.classList.contains("num")) countUp(el.querySelector("b"));
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach(reveal);
  }

  /* Шторка у фото: после раскрытия снимаем обрезку, чтобы вернулась тень */
  document.querySelectorAll(".srv__pic").forEach((pic) => {
    pic.addEventListener("transitionend", (e) => {
      if (e.propertyName === "clip-path" && pic.classList.contains("is-in")) pic.classList.add("is-done");
    });
  });

  /* ---------- Счётчики: 5,0 и 16 отсчитываются от нуля ---------- */
  function countUp(b) {
    if (!b || reduce || b.dataset.counted) return;
    const m = b.textContent.trim().match(/^(\d+)(?:,(\d+))?([\s\S]*)$/);
    if (!m) return;
    const dec = m[2] ? m[2].length : 0;
    const target = parseFloat(m[1] + "." + (m[2] || "0"));
    if (target < 2 && !dec) return; // «1 ночь» не считаем
    b.dataset.counted = "1";
    const rest = m[3];
    const start = performance.now();
    const dur = 1400;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      b.textContent = (target * ease(t)).toFixed(dec).replace(".", ",") + rest;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Шапка: тень и золотая полоса прогресса, параллакс обложки ---------- */
  const head = document.querySelector(".head");
  const card = document.querySelector(".hero__card");
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    head.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : "0");
    head.classList.toggle("is-scrolled", y > 8);
    if (card && !reduce && desktop.matches && y < card.offsetHeight + 300) {
      card.style.setProperty("--sy", y.toFixed(1));
    }
  };
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener("resize", update, { passive: true });
  update();
})();
