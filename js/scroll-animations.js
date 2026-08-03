/* =====================================================
   ISTD KALEHE — Animations au scroll
   Ajoute la classe .visible aux éléments .reveal / .reveal-*
   dès qu'ils entrent dans le viewport (IntersectionObserver)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    // Repli : affiche tout directement si non supporté
    targets.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach(function (el) { observer.observe(el); });
});
