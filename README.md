# Site web — ISTD KALEHE

Site vitrine 100% statique (HTML5 / CSS3 / JavaScript vanilla) pour l'Institut
Supérieur des Techniques de Développement de Kalehe (ISTD/KALEHE), Bidabanga,
Territoire de Kalehe, Sud-Kivu, RDC.

Aucune dépendance payante, aucune base de données, aucun backend. Le formulaire
de contact utilise un lien `mailto:`.

## Structure du projet

```
istd-kalehe/
├── index.html                 Page d'accueil
├── pages/                     Pages secondaires (à-propos, programmes, ...)
├── css/                       style.css, responsive.css, animations.css
├── js/                        main.js, scroll-animations.js, contact-form.js
├── images/                    Logo, photos, placeholders
├── README.md                  Ce fichier
└── CONTENU-A-VERIFIER.md      Points à valider avant publication
```

## Prérequis

Aucun. Le site fonctionne dans n'importe quel navigateur moderne, sans
installation ni build.

## Tester le site en local

Ouvrir simplement `index.html` dans un navigateur, ou lancer un petit serveur
local (recommandé pour que les chemins relatifs fonctionnent parfaitement) :

```bash
# Avec Python (si installé)
python -m http.server 8000

# Avec Node.js (si installé)
npx serve .
```

Si ni Python ni Node.js ne sont installés (cas de ce poste de travail), un
script PowerShell autonome est fourni — aucune installation requise :

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Puis ouvrir `http://localhost:8080` dans le navigateur.

---

## Déploiement gratuit

### Option 1 — GitHub Pages

1. Créer un compte sur [github.com](https://github.com) si nécessaire.
2. Créer un nouveau dépôt (ex. `istd-kalehe`).
3. Depuis ce dossier, initialiser Git et pousser le code :
   ```bash
   git init
   git add .
   git commit -m "Site web ISTD Kalehe"
   git branch -M main
   git remote add origin https://github.com/<votre-utilisateur>/istd-kalehe.git
   git push -u origin main
   ```
4. Sur GitHub : **Settings** → **Pages** → dans « Build and deployment »,
   choisir **Branch: main** et dossier **/ (root)** → **Save**.
5. Après 1-2 minutes, le site est accessible à :
   `https://<votre-utilisateur>.github.io/istd-kalehe/`

### Option 2 — Netlify

1. Créer un compte gratuit sur [netlify.com](https://netlify.com).
2. Sur le tableau de bord, cliquer **Add new site → Deploy manually**.
3. Glisser-déposer le dossier `istd-kalehe/` complet dans la zone prévue.
4. Netlify génère automatiquement une URL (ex. `istd-kalehe.netlify.app`).
5. (Optionnel) Dans **Site settings → Domain management**, associer un nom de
   domaine personnalisé si l'institut en possède un.

### Option 3 — Vercel

1. Créer un compte gratuit sur [vercel.com](https://vercel.com).
2. Cliquer **Add New → Project**.
3. Importer le dépôt GitHub (voir Option 1) ou glisser-déposer le dossier via
   la CLI Vercel :
   ```bash
   npm install -g vercel
   vercel
   ```
4. Suivre les instructions à l'écran (aucune configuration de build requise —
   choisir « Other » comme framework).
5. Vercel fournit une URL de production (ex. `istd-kalehe.vercel.app`).

---

## Mettre à jour le contenu

- **Actualités** : éditer `pages/actualites.html`, dupliquer un bloc `<article
  class="card">` pour chaque nouvelle actualité.
- **Galerie** : remplacer les blocs `<div class="image-placeholder">...Photo
  à venir...</div>` dans `pages/galerie.html` par de vraies balises
  `<img src="../images/gallery/...">`.
- **Logo officiel** : `images/logo-istd.png` est le logo officiel de
  l'institut. Pour le remplacer par une future version, gardez le même nom
  de fichier (`logo-istd.png`) ou mettez à jour les références
  `<img src="...logo-istd...">` dans toutes les pages.
- **Mot du Directeur Général** : compléter le texte dans
  `pages/a-propos.html` (section « Mot du Directeur Général »).

## Support

Pour toute question technique sur la structure du code, consulter les
commentaires présents dans chaque fichier CSS/JS, ou contacter la personne
ayant réalisé ce site.
