const menuToggle = document.querySelector('#menuToggle');
const nav = document.querySelector('.desktop-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('mobile-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('mobile-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}));