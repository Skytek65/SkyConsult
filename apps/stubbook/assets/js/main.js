document.documentElement.classList.add('js');
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
if (menu && nav) {
  const close = () => menu.setAttribute('aria-expanded', 'false');
  menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true')));
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });
}
document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('details').forEach(other => { if (other !== detail) other.open = false; });
}));
const prices = {
  year: ['$12.99', '/ year', '7 days free, then $12.99/year. Best annual value.'],
  month: ['$1.99', '/ month', 'Billed monthly. Renews automatically until canceled.'],
  lifetime: ['$24.99', 'once', 'Pay once. Pro without a recurring subscription.']
};
document.querySelectorAll('[data-period]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-period]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  const [amount, period, offer] = prices[button.dataset.period];
  document.querySelector('#price-amount').textContent = amount;
  document.querySelector('#price-period').textContent = period;
  document.querySelector('#price-offer').textContent = offer;
}));
// Switch all .app-icon src values to assets/app-icon-1024.png when the app asset is supplied.
// The bundled SVG is the complete default, avoiding a missing-file request before then.
