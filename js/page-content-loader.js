/* =====================================================
   ISTD KALEHE — Chargement générique du contenu de page
   Lit /content/{nom}.json (nom défini par <body data-content="...">)
   et met à jour les éléments [data-field] correspondants, en
   gardant la mise en page HTML/CSS existante.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var name = document.body.getAttribute('data-content');
  if (!name) return;

  fetch('/content/' + name + '.json', { cache: 'no-store' })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      document.querySelectorAll('[data-field]').forEach(function (el) {
        var value = resolvePath(data, el.getAttribute('data-field'));
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
