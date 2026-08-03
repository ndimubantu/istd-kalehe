/* =====================================================
   ISTD KALEHE — Réservation de place (pré-inscription)
   Construit un message WhatsApp pré-rempli à partir du
   formulaire (aucun backend, aucune donnée envoyée à un serveur)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  const WHATSAPP_NUMBER = '243999027786';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('#rf-name').value.trim();
    const phone = form.querySelector('#rf-phone').value.trim();
    const cycle = form.querySelector('#rf-cycle').value;
    const filiere = form.querySelector('#rf-filiere').value;
    const message = form.querySelector('#rf-message').value.trim();

    let text = 'Bonjour, je souhaite réserver ma place à l\'ISTD Kalehe pour la nouvelle année académique.\n\n';
    text += 'Nom complet : ' + name + '\n';
    text += 'Téléphone : ' + phone + '\n';
    text += 'Cycle souhaité : ' + cycle + '\n';
    text += 'Filière souhaitée : ' + filiere + '\n';
    if (message) {
      text += 'Message : ' + message + '\n';
    }

    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');
  });
});
