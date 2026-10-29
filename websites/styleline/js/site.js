(() => {
  const menu = document.getElementById('site-menu');
  const toggle = document.querySelector('.menu-toggle');
  const close = document.querySelector('.menu-close');
  if (!menu || !toggle || !close) return;
  toggle.addEventListener('click', () => {
    menu.showModal();
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    close.focus();
  });
  close.addEventListener('click', () => menu.close());
  menu.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    toggle.focus();
  });
})();
