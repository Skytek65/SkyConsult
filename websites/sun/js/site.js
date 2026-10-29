document.querySelectorAll('.menu-button').forEach(function (button) {
  var nav = document.getElementById(button.getAttribute('aria-controls'));
  var symbol = button.querySelector('.menu-symbol');
  function closeMenu() {
    button.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    symbol.textContent = '+';
  }
  button.addEventListener('click', function () {
    var expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
    symbol.textContent = expanded ? '+' : '−';
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      button.focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!button.contains(event.target) && !nav.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
});
var form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function () {
    document.getElementById('form-feedback').textContent = 'This concept form does not send messages. Please call or email SUN Electric directly.';
  });
}
