/* ==========================================================
   HelpTech — interactions.js
   Interações de página. Por enquanto:
   1. Filtros por categoria (Produtos e, depois, Projetos)
   Mais tarde: validação do formulário de contato.
   ========================================================== */

/* 1. FILTROS POR CATEGORIA
   Como usar no HTML:
     <div class="filters" data-filter-group data-target="#lista" data-status="#status">
       <button class="chip-btn" data-filter="todos" aria-pressed="true">Todos</button>
       <button class="chip-btn" data-filter="gpu" aria-pressed="false">Placas</button>
     </div>
     <p id="status"></p>
     <div id="lista"> <article data-category="gpu">...</article> </div>
*/
(function () {
  const groups = document.querySelectorAll("[data-filter-group]");

  groups.forEach((group) => {
    const target = document.querySelector(group.dataset.target);
    const status = document.querySelector(group.dataset.status);
    if (!target) return;

    const buttons = group.querySelectorAll("[data-filter]");
    const items = target.querySelectorAll("[data-category]");

    function applyFilter(filter) {
      let visible = 0;

      // mostra ou esconde cada item conforme a categoria escolhida
      items.forEach((item) => {
        const show = filter === "todos" || item.dataset.category === filter;
        item.hidden = !show;
        if (show) visible++;
      });

      // marca visualmente (e para leitores de tela) qual botão está ativo
      buttons.forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter));
      });

      // avisa quantos itens aparecem (a região tem aria-live no HTML)
      if (status) {
        status.textContent =
          filter === "todos"
            ? `Mostrando todas as ${items.length} categorias.`
            : `Mostrando ${visible} de ${items.length} categorias.`;
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
    });

    applyFilter("todos"); // estado inicial
  });
})();