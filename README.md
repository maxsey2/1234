# 🎄 Countdown to Christmas

Compte à rebours en direct jusqu'à Noël, avec neige, musique, calendrier de l'Avent et jeux.
Site statique (HTML, CSS, JavaScript) : aucune dépendance, aucun build, hébergeable gratuitement sur GitHub Pages.

**Site en ligne :** https://countdowntoxmas.com

## Fonctionnalités

- Compte à rebours en temps réel (jours, heures, minutes, secondes) et barre de progression du 1er novembre au 25 décembre
- Message « Merry Christmas! » le 25 décembre, puis retour automatique sur le Noël suivant
- Calendrier de l'Avent de 24 portes (une anecdote par porte, ouverture selon la date) et guirlande qui s'allume jour après jour
- Neige animée qui réagit à la souris, étincelles au clic, boules de Noël qui sonnent, sapin interactif
- Jeux : **Catch the gifts** (meilleur score gardé sur l'appareil) et **Christmas quiz** (10 questions)
- Tirage au sort **Secret Santa**
- Musique (« Jingle Bells », domaine public) générée dans le navigateur, sans fichier audio
- Bouton de partage, titre de l'onglet mis à jour avec le nombre de jours restants
- Respect du réglage « réduire les animations » du système

## Structure du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil : compte à rebours, Avent, jeux, sapin, Secret Santa |
| `about.html`, `story.html`, `privacy.html` | Pages secondaires |
| `style.css` | Design futuriste (verre, néons, aurore) aux couleurs de Noël |
| `script.js` | Compte à rebours, neige, jeux, quiz, sons |
| `CNAME` | Nom de domaine personnalisé pour GitHub Pages |

## Mise en ligne sur GitHub Pages

1. Placez tous les fichiers à la racine du dépôt (branche `main`).
2. Dans **Settings → Pages**, choisissez **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le fichier `CNAME` configure automatiquement le domaine `countdowntoxmas.com`. Si vous changez de domaine, modifiez ce fichier : il ne doit contenir que le nom de domaine, sans `https://`.
4. Chez votre registrar, configurez le DNS :
   - Domaine principal : quatre enregistrements `A` vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153` et `185.199.111.153`
   - `www` : un enregistrement `CNAME` vers `maxsey2.github.io`
5. Une fois le DNS propagé, cochez **Enforce HTTPS** dans Settings → Pages.

Vérifiez ces valeurs dans la documentation officielle de GitHub Pages avant de les saisir, au cas où elles auraient changé.

## Personnalisation

- **Couleurs** : variables CSS en haut de `style.css` (`--red`, `--mint`, `--gold`, etc.)
- **Anecdotes du calendrier** : tableau `facts` dans `script.js` (24 entrées)
- **Questions du quiz** : tableau `Q` dans `script.js`, au format `[question, [4 réponses], index de la bonne réponse, anecdote]`
- **Date de Noël** : fonction `target()` dans `script.js`

## À prévoir

Les balises Open Graph et Twitter pointent vers `images/og-home.jpg`, `og-about.jpg`, `og-story.jpg` et `og-privacy.jpg`. Ajoutez ces images dans un dossier `images/` pour obtenir un bel aperçu lors des partages.

## Crédits

- Polices : [Unbounded](https://fonts.google.com/specimen/Unbounded), [Mountains of Christmas](https://fonts.google.com/specimen/Mountains+of+Christmas) et [Figtree](https://fonts.google.com/specimen/Figtree), via Google Fonts (licence SIL Open Font)
- « Jingle Bells » (1857) : domaine public
