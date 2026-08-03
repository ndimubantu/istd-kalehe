/* =====================================================
   ISTD KALEHE — Formulaire de contact statique
   Construit un lien mailto: à partir des champs saisis
   (aucun backend, aucune donnée envoyée à un serveur)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('#cf-name').value.trim();
    const email = form.querySelector('#cf-email').value.trim();
    const subject = form.querySelector('#cf-subject').value.trim();
    const message = form.querySelector('#cf-message').value.trim();

    const destination = 'istdkalehe@gmail.com';
    const mailSubject = encodeURIComponent(subject || 'Message depuis le site ISTD Kalehe');
    const mailBody = encodeURIComponent(
      'Nom : ' + name + '\n' +
      'Email : ' + email + '\n\n' +
      message
    );

    window.location.href = 'mailto:' + destination + '?subject=' + mailSubject + '&body=' + mailBody;
  });
});
