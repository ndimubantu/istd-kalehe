/* =====================================================
   ISTD KALEHE — Chargement dynamique de la galerie photo
   Lit /content/galerie.json (éditable depuis /admin) et
   génère les sections par catégorie dans #galerie-list.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('galerie-list');
  if (!container) return;

  fetch('/content/galerie.json', { cache: 'no-store' })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      renderGalerie(container, data.items || []);
    })
    .catch(function () {
      container.innerHTML = '<p style="color:var(--text-muted);">Impossible de charger la galerie pour le moment.</p>';
    });
});

var CATEGORY_ORDER = [
  'Campus',
  'Vie étudiante',
  'Cérémonies / Graduations',
  'Activités académiques',
  'Infrastructures'
];

var CATEGORY_ICONS = {
  'Campus': 'fa-solid fa-tree-city',
  'Vie étudiante': 'fa-solid fa-people-group',
  'Cérémonies / Graduations': 'fa-solid fa-award',
  'Activités académiques': 'fa-solid fa-book-open',
  'Infrastructures': 'fa-solid fa-building'
};

function renderGalerie(container, items) {
  if (!items.length) {
    container.innerHTML = '<p style="color:var(--text-muted);">Aucune photo publiée pour le moment.</p>';
    return;
  }

  const byCategory = {};
  items.forEach(function (item) {
    const cat = item.category || 'Autres';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(item);
  });

  const categories = CATEGORY_ORDER.filter(function (c) { return byCategory[c]; })
    .concat(Object.keys(byCategory).filter(function (c) { return CATEGORY_ORDER.indexOf(c) === -1; }));

  container.innerHTML = categories.map(function (cat) {
    const icon = CATEGORY_ICONS[cat] || 'fa-solid fa-image';
    const cards = byCategory[cat].map(function (item) {
      const alt = escapeAttr(item.title || cat);
      if (item.image) {
        return '<div class="gallery-item"><img src="' + escapeAttr(item.image) + '" alt="' + alt + '"></div>';
      }
      return (
        '<div class="gallery-item">' +
          '<div class="image-placeholder">' +
            '<i class="fa-solid fa-image"></i>' +
            '<span>Photo à venir</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<h2 class="gallery-cat-title"><i class="' + icon + '"></i> ' + escapeHtml(cat) + '</h2>' +
      '<div class="gallery-grid">' + cards + '</div>'
    );
  }).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}
