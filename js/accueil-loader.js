/* =====================================================
   ISTD KALEHE — Chargement du contenu de la page d'accueil
   Lit /content/accueil.json (éditable depuis /admin) et met à
   jour les textes du hero, de la section "Explorer" et de la
   citation, en gardant la mise en page HTML/CSS existante.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  fetch('/content/accueil.json', { cache: 'no-store' })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      document.querySelectorAll('[data-field]').forEach(function (el) {
        var path = el.getAttribute('data-field');
        var value = resolvePath(data, path);
        if (typeof value === 'string') el.textContent = value;
      });
    })
    .catch(function () { /* silencieux : le contenu statique du HTML reste affiché */ });
});

function resolvePath(obj, path) {
  return path.split('.').reduce(function (acc, key) {
    if (acc === undefined || acc === null) return undefined;
    return acc[key];
  }, obj);
}
