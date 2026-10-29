const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');
if (toggle && menu) {
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
}

const sections = document.querySelectorAll('.service-section');
if (sections.length && 'IntersectionObserver' in window) {
  const indexLinks = document.querySelectorAll('.practice-sidebar nav a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        indexLinks.forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-5% 0px -65% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
