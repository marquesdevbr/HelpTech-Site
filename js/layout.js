/* ==========================================================
   HelpTech — layout.js
   Monta o cabeçalho e o rodapé em todas as páginas.
   Para mudar o menu ou o rodapé, edite SOMENTE este arquivo.

   Cada página informa no <body>:
     data-root=""    (index.html, na raiz)  ou  data-root="../" (pages/*.html)
     data-page="inicio | servicos | produtos | projetos | sobre | contato"
   ========================================================== */

(function () {
  const root = document.body.dataset.root || "";
  const current = document.body.dataset.page || "";

  const links = [
    { id: "inicio", label: "Início", href: root + "index.html" },
    { id: "servicos", label: "Serviços", href: root + "pages/servicos.html" },
    { id: "produtos", label: "Produtos", href: root + "pages/produtos.html" },
    { id: "projetos", label: "Projetos", href: root + "pages/projetos.html" },
    { id: "sobre", label: "Sobre", href: root + "pages/sobre.html" },
    { id: "contato", label: "Contato", href: root + "pages/contato.html" },
  ];

  const navItems = links
    .map((l) => {
      const aria = l.id === current ? ' aria-current="page"' : "";
      return `<li><a class="nav-link" href="${l.href}"${aria}>${l.label}</a></li>`;
    })
    .join("");

  const footerItems = links
    .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join("");

  const headerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="${root}index.html" aria-label="HelpTech — página inicial">
          <span class="brand-help">Help</span><span class="brand-tech">Tech</span>
        </a>

        <button class="nav-toggle" type="button" aria-expanded="false"
                aria-controls="primary-nav" aria-label="Abrir menu">
          <span class="nav-toggle-bars" aria-hidden="true"></span>
        </button>

        <nav class="primary-nav" id="primary-nav" aria-label="Navegação principal">
          <ul class="nav-list">${navItems}</ul>
        </nav>
      </div>
    </header>`;

  const footerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h2>HelpTech</h2>
            <p>Tecnologia prática para negócios e pessoas.</p>
            <p>Biguaçu – Santa Catarina</p>
          </div>
          <div>
            <h2>Navegação</h2>
            <ul class="footer-links">${footerItems}</ul>
          </div>
          <div>
            <h2>Sobre este site</h2>
            <p>A HelpTech é um projeto empresarial acadêmico. Os projetos e produtos exibidos são demonstrativos.</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} HelpTech</span>
          <span>Projeto empresarial acadêmico — Biguaçu/SC</span>
        </div>
      </div>
    </footer>`;

  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.innerHTML = headerHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;
})();