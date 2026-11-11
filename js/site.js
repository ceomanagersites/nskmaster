/* Обложка, меню и мелочи страницы. Калькулятор — в calc.js */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Фасад: дом на Димитрова, 7, окна загораются ночью ---------- */
  const tower = document.getElementById("tower");
  if (tower) {
    const floors = 9, cols = 6;
    const office = { floor: 8, col: 1 }; // 8 этаж — офис компании, ближнее к подписи окно
    // Заранее выбранный «случайный» набор горящих окон, чтобы картинка была одинаковой у всех
    const lit = new Set([3, 8, 13, 16, 22, 27, 31, 38, 41, 45, 50]);
    const frag = document.createDocumentFragment();
    let i = 0, order = 0;
    for (let f = floors; f >= 1; f--) {
      for (let c = 1; c <= cols; c++, i++) {
        const w = document.createElement("span");
        w.className = "win";
        if (f === office.floor && c === office.col) {
          w.classList.add("win--office");
          w.style.setProperty("--d", "1250ms");
        } else if (lit.has(i)) {
          w.classList.add("win--lit");
          w.style.setProperty("--d", `${180 + ((order++ * 137) % 900)}ms`);
        }
        frag.append(w);
      }
    }
    tower.append(frag);
    // Подпись «Мы здесь» указывает пунктиром ровно на окно офиса
    const tag = document.querySelector(".tower__tag");
    const officeWin = tower.querySelector(".win--office");
    const placeTag = () => { tag.style.top = `${officeWin.offsetTop + officeWin.offsetHeight / 2 - 11}px`; };
    placeTag();
    addEventListener("resize", placeTag, { passive: true });
    document.fonts?.ready.then(placeTag);
    // Один оркестрованный момент: окна зажигаются после загрузки
    requestAnimationFrame(() => requestAnimationFrame(() => tower.classList.add(reduce ? "is-on-now" : "is-on")));
  }

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
  matchMedia("(min-width: 961px)").addEventListener("change", () => setMenu(false));

  /* ---------- Год в подвале ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
