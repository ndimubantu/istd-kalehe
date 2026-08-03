/* =====================================================
   ISTD KALEHE — Chargement dynamique des actualités
   Lit /content/actualites.json (éditable depuis /admin) et
   génère les cartes dans #actualites-list.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const list = document.getElementById('actualites-list');
  if (!list) return;

  fetch('/content/actualites.json', { cache: 'no-store' })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      renderActualites(list, data.items || []);
    })
    .catch(function () {
      list.innerHTML = '<p style="color:var(--text-muted);">Impossible de charger les actualités pour le moment.</p>';
    });
});

function renderActualites(container, items) {
  if (!items.length) {
    container.innerHTML = '<p style="color:var(--text-muted);">Aucune actualité publiée pour le moment.</p>';
    return;
  }

  // Plus récent en premier
  items = items.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

  const formatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  container.innerHTML = items.map(function (item) {
    const dateLabel = item.date ? formatter.format(new Date(item.date + 'T00:00:00')) : '';
    const icon = item.icon || 'fa-solid fa-bullhorn';
    const linkText = item.link_text || 'En savoir plus';
    const linkUrl = item.link_url || '#';

    return (
      '<article class="card">' +
        (dateLabel ? '<span class="tag-pill">' + escapeHtml(dateLabel) + '</span>' : '') +
        '<div class="card-icon"><i class="' + escapeHtml(icon) + '"></i></div>' +
        '<h3 class="card-title">' + escapeHtml(item.title || '') + '</h3>' +
        '<p class="card-text">' + escapeHtml(item.body || '') + '</p>' +
        '<a href="' + escapeAttr(linkUrl) + '" class="card-link">' + escapeHtml(linkText) + ' <i class="fa-solid fa-arrow-right"></i></a>' +
      '</article>'
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
