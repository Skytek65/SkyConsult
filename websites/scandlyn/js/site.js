(() => {
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  if (button && nav) {
    const close = () => { button.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); };
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { close(); button.focus(); } });
    nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    const desktop = window.matchMedia('(min-width: 901px)');
    desktop.addEventListener('change', () => { if (desktop.matches) close(); });
  }
  const search = document.querySelector('[data-builder-search]');
  if (search) {
    const builders = [...document.querySelectorAll('.builder')];
    const status = document.querySelector('[data-search-status]');
    search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      let count = 0;
      builders.forEach(builder => { const show = builder.textContent.toLowerCase().includes(query); builder.hidden = !show; if (show) count++; });
      status.hidden = count !== 0;
      document.querySelector('[data-builder-count]').textContent = `${count} ${count === 1 ? 'listing' : 'listings'} shown`;
    });
  }
})();
