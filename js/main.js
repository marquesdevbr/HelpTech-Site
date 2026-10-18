/* ==========================================================
   HelpTech — main.js
   Comportamentos comuns a todas as páginas:
   1. menu mobile   2. animação ao rolar
   (precisa ser carregado DEPOIS do layout.js)
   ========================================================== */

/* 1. MENU MOBILE */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // fecha ao escolher um link
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  // fecha com a tecla Esc e devolve o foco ao botão
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // se a tela voltar a ser larga, garante o menu fechado
  window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
})();

/* 2. ANIMAÇÃO AO ROLAR (elementos com a classe "reveal") */
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
})();