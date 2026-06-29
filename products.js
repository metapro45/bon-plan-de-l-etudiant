/**
 * =====================================================
 * FICHIER DE GESTION DES ARTICLES
 * Bon Plan de l'Étudiant
 * =====================================================
 *
 * COMMENT AJOUTER UN ARTICLE :
 * 1. Copie un bloc { ... } existant
 * 2. Colle-le dans le tableau products[]
 * 3. Remplis les champs (voir guide ci-dessous)
 * 4. Sauvegarde le fichier
 *
 * CHAMPS DISPONIBLES :
 * - id         : numéro unique (incrémente à chaque ajout)
 * - titre      : nom de l'article
 * - categorie  : nom de la catégorie (crée une nouvelle catégorie juste en écrivant un nouveau nom)
 * - prix       : prix de vente en euros (nombre)
 * - prixOriginal : prix original barré (optionnel, mettre null sinon)
 * - etat       : "Excellent" | "Très bon" | "Bon" | "Correct"
 * - description: courte description de l'article
 * - emoji      : emoji affiché si pas d'image (ex: "📱", "👕", "💻")
 * - image      : chemin vers une image locale (ex: "images/iphone.jpg") ou null
 * - lienVinted : lien direct vers l'annonce Vinted (obligatoire)
 *
 * =====================================================
 */

const products = [

  // ─── EXEMPLE 1 ────────────────────────────────────
  {
    id: 1,
    titre: "iPhone 11 - 64 Go Noir",
    categorie: "Smartphones",
    prix: 189,
    prixOriginal: 250,
    etat: "Très bon",
    description: "Batterie 87%, écran impeccable, déverrouillé tout opérateur.",
    emoji: "📱",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  // ─── EXEMPLE 2 ────────────────────────────────────
  {
    id: 2,
    titre: "MacBook Air 2019 - Core i5",
    categorie: "Informatique",
    prix: 420,
    prixOriginal: 600,
    etat: "Bon",
    description: "8 Go RAM, 128 Go SSD. Coque avec légères traces d'usage.",
    emoji: "💻",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  // ─── EXEMPLE 3 ────────────────────────────────────
  {
    id: 3,
    titre: "Nike Air Force 1 - T42",
    categorie: "Vêtements & Chaussures",
    prix: 55,
    prixOriginal: 110,
    etat: "Excellent",
    description: "Portées 3 fois, semelles propres, coloris blanc.",
    emoji: "👟",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  // ─── EXEMPLE 4 ────────────────────────────────────
  {
    id: 4,
    titre: "AirPods Pro 1ère génération",
    categorie: "Audio",
    prix: 95,
    prixOriginal: null,
    etat: "Très bon",
    description: "Réduction de bruit active, étui de charge inclus.",
    emoji: "🎧",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  // ─── EXEMPLE 5 ────────────────────────────────────
  {
    id: 5,
    titre: "Calculatrice Texas TI-83",
    categorie: "Scolaire",
    prix: 25,
    prixOriginal: 50,
    etat: "Bon",
    description: "Fonctionne parfaitement, idéale pour lycée et prépa.",
    emoji: "🔢",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  // ─── EXEMPLE 6 ────────────────────────────────────
  {
    id: 6,
    titre: "Samsung Galaxy S21 - 128 Go",
    categorie: "Smartphones",
    prix: 245,
    prixOriginal: 380,
    etat: "Excellent",
    description: "Comme neuf, boîte d'origine, chargeur inclus.",
    emoji: "📱",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  // ─── AJOUTE TES ARTICLES ICI ──────────────────────
  // {
  //   id: 7,
  //   titre: "Nom de ton article",
  //   categorie: "Ta Catégorie",
  //   prix: 00,
  //   prixOriginal: null,
  //   etat: "Très bon",
  //   description: "Description courte.",
  //   emoji: "📦",
  //   image: null,
  //   lienVinted: "https://www.vinted.fr/items/TON-ID"
  // },

];
