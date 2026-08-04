/* =====================================================
   ISTD KALEHE — Chargement des réglages du site
   Lit /content/site.json (éditable depuis /admin) et met à jour
   le slogan, les phrases du pied de page et les coordonnées de
   contact sur TOUTES les pages.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  fetch('/content/site.json', { cache: 'no-store' })
    .then(function (res) { return res.json(); })
    .then(applySiteSettings)
    .catch(function () { /* silencieux : le contenu statique du HTML reste affiché */ });
});

function applySiteSettings(data) {
  if (data.slogan) {
    document.querySelectorAll('.logo-slogan').forEach(function (el) {
      el.textContent = data.slogan;
    });
  }

  (data.footer_taglines || []).forEach(function (item, index) {
    var el = document.querySelector('[data-field="tagline-' + index + '"]');
    if (el) el.textContent = item.tagline;
  });

  if (data.contact) {
    var map = { address: data.contact.address, phone: data.contact.phone, email: data.contact.email };
    Object.keys(map).forEach(function (key) {
      if (!map[key]) return;
      var el = document.querySelector('[data-field="' + key + '"]');
      if (el) el.textContent = map[key];
    });
  }
}
