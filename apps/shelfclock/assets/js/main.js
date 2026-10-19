'use strict';
const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#navigation');
function closeNavigation() {
  toggle?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}
toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) closeNavigation();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    closeNavigation();
    toggle.focus();
  }
});
matchMedia('(min-width: 801px)').addEventListener('change', closeNavigation);
document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});
// Keep each question group calm: opening one answer closes its siblings.
document.querySelectorAll('.faq details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    detail.parentElement.querySelectorAll('details').forEach(sibling => {
      if (sibling !== detail) sibling.open = false;
    });
  });
});
