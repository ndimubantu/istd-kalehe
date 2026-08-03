# Guide de style — ISTD Kalehe (refonte design)

Ce guide accompagne le fichier `istd-kalehe-redesign.html` (maquette de la page d'accueil).
Objectif : appliquer la même direction visuelle à **toutes les pages** du site
(`/pages/a-propos`, `/pages/programmes`, `/pages/vie-etudiante`, `/pages/partenaires`,
`/pages/admissions`, `/pages/actualites`, `/pages/contact`, `/pages/galerie`).

---

## 1. Palette de couleurs

```css
--ink:         #0F211B;   /* fond footer, texte le plus sombre */
--forest:      #1F4B3C;   /* couleur de marque principale — hero, boutons, nav CTA */
--forest-light:#2E6650;   /* état hover des éléments verts */
--paper:       #F6F2E7;   /* fond de page (parchemin chaud) */
--mist:        #E6EAE0;   /* fond de sections alternées / cartes */
--gold:        #C99A3E;   /* accent principal — CTA, liens actifs, icônes */
--gold-light:  #E4C077;   /* variante claire sur fond sombre */
--clay:        #9C4A2E;   /* accent secondaire, à utiliser avec parcimonie (badges, tags) */
--text:        #1C2620;   /* texte courant */
--text-muted:  #5B665F;   /* texte secondaire / descriptions */
--line:        rgba(15,33,27,0.12); /* bordures fines */
```

Règle : **le vert forêt et le parchemin dominent**, l'or est réservé aux actions/accents,
la terre cuite n'apparaît que ponctuellement (jamais comme couleur de fond large).

## 2. Typographie

| Rôle | Police | Usage |
|---|---|---|
| Titres (h1, h2, h3) | **Fraunces** (serif, poids 500–600) | Tous les titres de page et de section |
| Texte courant | **IBM Plex Sans** | Paragraphes, navigation, boutons |
| Étiquettes / eyebrows / mono | **IBM Plex Mono** | Petites majuscules au-dessus des titres, labels, coordonnées |

Import Google Fonts (à mettre dans le `<head>` de chaque page) :
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
```

Échelle type approximative :
- H1 (hero de page) : `clamp(2.2rem, 4vw, 3.4rem)`
- H2 (titre de section) : `clamp(1.6rem, 3vw, 2.3rem)`
- Corps : `1rem–1.05rem`, line-height `1.6`
- Eyebrow : `0.72rem`, letter-spacing `0.14em`, majuscules

## 3. Élément signature : les lignes topographiques

Un motif de courbes fines (évoquant les collines et le lac autour de Kalehe) doit réapparaître
sur **chaque page**, pas seulement l'accueil — c'est ce qui crée la cohérence de marque :

- En arrière-plan des sections héro (comme dans la maquette)
- Comme séparateur discret entre deux sections (`<svg class="topo">`, voir maquette)
- En petit accent sur les cartes/blocs mis en avant

Ne pas en abuser : 1 à 2 occurrences visibles par page suffisent.

## 4. Composants réutilisables (voir maquette pour le code exact)

- **Header sticky** : fond parchemin translucide + ombre légère au scroll (`.scrolled`)
- **Boutons** : `.btn-gold` (action principale) et `.btn-outline` (action secondaire, sur fond sombre)
- **Cartes** : fond `--paper` ou `--mist`, bordure fine `--line`, hover = bordure or + léger `translateY`
- **Bloc citation** : fond `--ink`, texte serif italique centré, petit filet or au-dessus
- **Footer** : fond `--forest`, 4 colonnes (marque / liens rapides / institution / contact)

## 5. Structure de page type (pages secondaires)

Pour les pages comme `/a-propos`, `/programmes`, etc., garder la même ossature que l'accueil :

1. Header identique (copier tel quel)
2. Un mini-hero de page (fond `--forest`, eyebrow + H1 court + 1 phrase d'intro, hauteur réduite
   par rapport au hero de l'accueil — pas besoin des deux CTA)
3. Contenu de la page en sections alternant `--paper` / `--mist`
4. Footer identique (copier tel quel)

## 6. Ce qu'il ne faut PAS faire

- Ne pas revenir aux couleurs par défaut d'un thème générique (bleu/blanc classique)
- Ne pas mélanger d'autres polices display
- Ne pas utiliser l'or comme couleur de fond de grande section (il doit rester un accent)
- Ne pas dupliquer le motif topographique plus de 2 fois par page (perd son effet)

---

**Instruction à donner à Claude Code :**
> "Applique ce guide de style et la structure du fichier `istd-kalehe-redesign.html`
> à toutes les pages du site (a-propos, programmes, vie-etudiante, partenaires,
> admissions, actualites, contact, galerie), en gardant le contenu réel de chaque
> page mais avec le header, footer, couleurs, typographies et composants définis ici."
