(() => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.getElementById('main-nav');
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.menu-label').textContent = 'Menu';
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
  });
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('menu-open')) return;
    if (event.key === 'Escape') {
      closeMenu();
      menuButton.focus();
    }
    if (event.key === 'Tab') {
      const focusable = [menuButton, ...nav.querySelectorAll('a')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.matchMedia('(min-width: 961px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const cards = [...bar.parentElement.querySelectorAll('[data-category]')];
    const result = bar.parentElement.querySelector('.filter-result');
    bar.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        bar.querySelectorAll('button').forEach(other => {
          const active = other === button;
          other.classList.toggle('active', active);
          other.setAttribute('aria-pressed', String(active));
        });
        cards.forEach(card => {
          card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
        });
        const shown = cards.filter(card => !card.hidden).length;
        result.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'} shown.`;
      });
    });
  });
})();
