/* =====================================================
   ISTD KALEHE — Comportements communs
   Menu hamburger + surlignage du lien de navigation actif
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initHamburgerMenu();
  setActiveNavLink();
});

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  const overlay = document.getElementById('nav-overlay');

  if (!hamburger || !mainNav) return;

  function closeMenu() {
    hamburger.classList.remove('active');
    mainNav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    if (overlay) overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Ferme le menu quand un lien est cliqué (mobile)
  mainNav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Ferme le menu si on repasse en desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeMenu();
  });
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}
