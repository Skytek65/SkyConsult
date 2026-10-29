document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
function closeMenu() {
  navbar.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.menu-label').textContent = 'Menu';
}
menuButton.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.querySelector('.menu-label').textContent = isOpen ? 'Close' : 'Menu';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navbar.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!navbar.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
