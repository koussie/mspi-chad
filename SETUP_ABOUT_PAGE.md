# Configuration finale - Page À Propos

## Image de la façade à ajouter

Pour finaliser la section "Bienvenue" de la page À Propos, copiez l'image de la façade du ministère :

**Source :** `output_(1).png` (image fournie en pièce jointe)
**Destination :** `/public/facade-ministere.jpg`

### Commande pour copier l'image :
```bash
cp output_(1).png public/facade-ministere.jpg
```

L'image sera automatiquement affichée dans la section "Bienvenue" de la page À Propos, positionnée à droite du texte (ou en haut sur mobile).

## Structure de la page À Propos

La page suit maintenant cet ordre :
1. **Hero** - "À Propos du Ministère"
2. **Section Bienvenue** - Texte d'accueil + Mandat (avec photo de la façade) ← NOUVEAU
3. **Mission / Vision / Valeurs** - 3 colonnes
4. **Le Ministre** - Photo et biographie complète

## Traductions

Les traductions FR/AR ont été ajoutées dans :
- `/src/messages/fr.json` → `about.welcome.*`
- `/src/messages/ar.json` → `about.welcome.*`

Le contenu est entièrement bilingue avec support RTL correct pour l'arabe.
