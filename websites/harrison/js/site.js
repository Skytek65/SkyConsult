(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const mobile = window.matchMedia('(max-width: 800px)');
  function closeMenu() {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('.menu-label').textContent = 'Menu';
  }
  toggle.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
  });
  document.querySelectorAll('.submenu-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const open = !item.classList.contains('submenu-open');
      document.querySelectorAll('.submenu-open').forEach(other => {
        other.classList.remove('submenu-open');
        other.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('submenu-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (document.body.classList.contains('menu-open')) { closeMenu(); toggle.focus(); }
      document.querySelectorAll('.submenu-open').forEach(item => {
        item.classList.remove('submenu-open');
        item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
      });
    }
    if (event.key === 'Tab' && mobile.matches && document.body.classList.contains('menu-open')) {
      const links = [toggle, ...nav.querySelectorAll('a, button')].filter(el => el.getClientRects().length);
      const first = links[0], last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  mobile.addEventListener('change', event => { if (!event.matches) closeMenu(); });
  document.querySelectorAll('form').forEach(form => form.addEventListener('submit', () => {
    form.querySelector('.form-status').textContent = 'This concept form does not send information. Please call or email using the contact details on this page.';
  }));
})();
