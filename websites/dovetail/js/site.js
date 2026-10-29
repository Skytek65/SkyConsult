(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.sidebar');
  const shade = document.querySelector('.nav-shade');
  const desktop = window.matchMedia('(min-width: 1000px)');
  function setMenu(open, returnFocus = false) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.inert = !desktop.matches && !open;
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  shade.addEventListener('click', () => setMenu(false, true));
  desktop.addEventListener('change', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('menu-open')) return;
    if (event.key === 'Escape') setMenu(false, true);
    if (event.key === 'Tab') {
      const links = [...nav.querySelectorAll('a')];
      if (!event.shiftKey && document.activeElement === links.at(-1)) {
        event.preventDefault(); toggle.focus();
      } else if (event.shiftKey && document.activeElement === toggle) {
        event.preventDefault(); links.at(-1).focus();
      }
    }
  });
  setMenu(false);

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-categories]')];
  const count = document.querySelector('[data-gallery-count]');
  function applyFilter(key, updateHash = false) {
    if (!filters.some(filter => filter.dataset.filter === key)) key = 'all';
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter.dataset.filter === key)));
    let visible = 0;
    cards.forEach(card => {
      card.hidden = key !== 'all' && !card.dataset.categories.split(' ').includes(key);
      if (!card.hidden) visible++;
    });
    if (count) count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} on view`;
    if (updateHash) history.replaceState(null, '', '#' + key);
  }
  filters.forEach(filter => filter.addEventListener('click', () => applyFilter(filter.dataset.filter, true)));
  if (filters.length) {
    applyFilter(location.hash.slice(1) || 'all');
    window.addEventListener('hashchange', () => applyFilter(location.hash.slice(1) || 'all'));
  }
  const form = document.querySelector('.contact-form');
  if (form) form.addEventListener('submit', () => {
    document.querySelector('.form-status').hidden = false;
  });
})();
