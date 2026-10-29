(() => {
  const menu = document.querySelector('#mobile-menu');
  const opener = document.querySelector('.menu-toggle');
  const closer = document.querySelector('.close-menu');
  if (menu && opener) {
    opener.addEventListener('click', () => {
      menu.showModal();
      opener.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    });
    const close = () => menu.close();
    closer.addEventListener('click', close);
    menu.addEventListener('click', e => { if (e.target === menu && e.clientY < menu.getBoundingClientRect().top) close(); });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    menu.addEventListener('close', () => {
      opener.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
    window.matchMedia('(min-width:1000px)').addEventListener('change', e => { if (e.matches && menu.open) close(); });
  }
  const filterGroup = document.querySelector('.filter-group');
  if (filterGroup) {
    const cards = [...document.querySelectorAll('.worksheet')];
    const count = document.querySelector('.library-count');
    filterGroup.addEventListener('click', e => {
      const button = e.target.closest('[data-filter]');
      if (!button) return;
      filterGroup.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
      count.textContent = `${cards.filter(card => !card.hidden).length} worksheets · Excel format`;
    });
  }
  const form = document.querySelector('.contact-form');
  if (form) form.addEventListener('submit', () => {
    document.querySelector('.form-result').textContent = 'This concept form does not send messages. Please call (724) 452-9261 or email karenv@karenlvidtcpa.com.';
  });
})();
