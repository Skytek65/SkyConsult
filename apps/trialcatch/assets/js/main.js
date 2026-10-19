'use strict';
document.documentElement.classList.add('js');
const toggle = document.querySelector('.nav-toggle');
const navigation = document.getElementById('navigation');
if (toggle && navigation) {
  toggle.hidden = false;
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { close(); toggle.focus(); }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', close);
}
document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
document.querySelectorAll('.faq details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('.faq details').forEach(other => { if (other !== detail) other.open = false; });
  });
});
