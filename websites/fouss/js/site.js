(() => {
  const menu = document.getElementById('site-menu');
  const buttons = document.querySelectorAll('[data-menu-open]');
  let opener;
  const sync = open => {
    buttons.forEach(button => button.setAttribute('aria-expanded', String(open)));
    document.body.classList.toggle('menu-open', open);
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    opener = button;
    menu.showModal();
    sync(true);
  }));
  document.querySelector('[data-menu-close]').addEventListener('click', () => menu.close());
  menu.addEventListener('close', () => { sync(false); if (opener) opener.focus(); });
  menu.addEventListener('click', event => {
    const rect = menu.getBoundingClientRect();
    if (event.target === menu && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) menu.close();
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
})();
