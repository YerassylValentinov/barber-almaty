const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
// International format; spaces, brackets and a leading + are accepted.
const WHATSAPP_NUMBER = '+77777777777';
const whatsappDigits = WHATSAPP_NUMBER.replace(/\D/g, '');
const bookingStatus = document.querySelector('#booking-status');

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  if (/^\d{10,15}$/.test(whatsappDigits)) {
    link.href = `https://wa.me/${whatsappDigits}?text=${link.dataset.message}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.addEventListener('click', () => {
      bookingStatus.hidden = false;
    });
  }
});

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  mobileMenu.hidden = true;
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  mobileMenu.hidden = isOpen;
});

mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!mobileMenu.hidden && !event.target.closest('.site-header')) closeMenu();
});
window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });

document.querySelector('#year').textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll('.desktop-nav a');
const sections = [...navLinks].map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  sections.forEach(section => observer.observe(section));
}
