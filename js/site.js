/* Мобильное меню и год в подвале. Больше на сайте скриптов нет */
(() => {
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
  matchMedia("(min-width: 1025px)").addEventListener("change", () => setMenu(false));

  document.getElementById("year").textContent = new Date().getFullYear();

  /* Жёлтые черты у заголовков прорисовываются, когда заголовок появляется на экране */
  const bars = document.querySelectorAll(".sec__title, .srv__body h3");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    bars.forEach((el) => io.observe(el));
  } else {
    bars.forEach((el) => el.classList.add("is-in"));
  }
})();
