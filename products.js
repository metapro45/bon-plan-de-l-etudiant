/**
 * =====================================================
 * FICHIER DE GESTION DES ARTICLES
 * Bon Plan de l'Étudiant — v2
 * =====================================================
 *
 * COMMENT AJOUTER UN ARTICLE :
 * 1. Copie un bloc { ... } existant
 * 2. Colle-le dans le tableau products[]
 * 3. Remplis les champs (voir guide ci-dessous)
 * 4. Sauvegarde le fichier et commit sur GitHub
 *
 * ─── TOUS LES CHAMPS DISPONIBLES ───────────────────
 *
 * - id          : numéro unique (incrémente à chaque ajout)
 * - titre       : nom de l'article
 * - categorie   : nom de la catégorie
 *                 → écrire un nouveau nom crée une nouvelle catégorie automatiquement
 * - prix        : prix de vente en euros (nombre entier)
 * - prixOriginal: prix original barré (optionnel → mettre null si pas voulu)
 *                 → si prixOriginal > prix, le badge "-XX%" s'affiche automatiquement
 * - etat        : état de l'article, 4 valeurs possibles :
 *                 "Excellent" | "Très bon" | "Bon" | "Correct"
 * - stock       : quantité disponible (nombre entier)
 *                 → 0        = article masqué automatiquement du catalogue
 *                 → 1 ou 2   = badge "⚡ Plus que X" affiché automatiquement
 *                 → 3 et +   = affiche "X disponibles" en vert
 * - nouveaute   : true  = badge "🆕 Nouveau" affiché
 *                 false = pas de badge
 * - dateAjout   : date d'ajout au format "YYYY-MM-DD" (ex: "2025-06-29")
 *                 → utilisée pour le tri "Nouveautés"
 * - description : courte description de l'article (1-2 phrases)
 * - emoji       : emoji affiché si pas d'image (ex: "📱", "👕", "💻")
 * - image       : chemin vers une image locale (ex: "images/iphone.jpg")
 *                 → mettre null si pas d'image
 * - lienVinted  : lien direct vers l'annonce Vinted (obligatoire)
 *                 → le bouton WhatsApp inclut aussi le titre et le prix automatiquement
 *
 * =====================================================
 */

const products = [

  {
    id: 1,
    titre: "iPhone 11 - 64 Go Noir",
    categorie: "Smartphones",
    prix: 189,
    prixOriginal: 250,
    etat: "Très bon",
    stock: 1,
    nouveaute: false,
    dateAjout: "2025-06-01",
    description: "Batterie 87%, écran impeccable, déverrouillé tout opérateur.",
    emoji: "📱",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  {
    id: 2,
    titre: "MacBook Air 2019 - Core i5",
    categorie: "Informatique",
    prix: 420,
    prixOriginal: 600,
    etat: "Bon",
    stock: 1,
    nouveaute: false,
    dateAjout: "2025-06-05",
    description: "8 Go RAM, 128 Go SSD. Coque avec légères traces d'usage.",
    emoji: "💻",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  {
    id: 3,
    titre: "Nike Air Force 1 - T42",
    categorie: "Vêtements & Chaussures",
    prix: 55,
    prixOriginal: 110,
    etat: "Excellent",
    stock: 2,
    nouveaute: true,
    dateAjout: "2025-06-20",
    description: "Portées 3 fois, semelles propres, coloris blanc.",
    emoji: "👟",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  {
    id: 4,
    titre: "AirPods Pro 1ère génération",
    categorie: "Audio",
    prix: 95,
    prixOriginal: null,
    etat: "Très bon",
    stock: 3,
    nouveaute: false,
    dateAjout: "2025-05-15",
    description: "Réduction de bruit active, étui de charge inclus.",
    emoji: "🎧",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  {
    id: 5,
    titre: "Calculatrice Texas TI-83",
    categorie: "Scolaire",
    prix: 25,
    prixOriginal: 50,
    etat: "Bon",
    stock: 4,
    nouveaute: false,
    dateAjout: "2025-05-10",
    description: "Fonctionne parfaitement, idéale pour lycée et prépa.",
    emoji: "🔢",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  {
    id: 6,
    titre: "Samsung Galaxy S21 - 128 Go",
    categorie: "Smartphones",
    prix: 245,
    prixOriginal: 380,
    etat: "Excellent",
    stock: 1,
    nouveaute: true,
    dateAjout: "2025-06-25",
    description: "Comme neuf, boîte d'origine, chargeur inclus.",
    emoji: "📱",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  {
    id: 7,
    titre: "Casque Sony WH-1000XM4",
    categorie: "Audio",
    prix: 130,
    prixOriginal: 280,
    etat: "Très bon",
    stock: 2,
    nouveaute: true,
    dateAjout: "2025-06-28",
    description: "Noise cancelling premium, autonomie 30h, pochette incluse.",
    emoji: "🎧",
    image: null,
    lienVinted: "https://www.vinted.fr"
  },

  // ─── AJOUTE TES ARTICLES ICI ──────────────────────
  // {
  //   id: 8,
  //   titre: "Nom de l'article",
  //   categorie: "Catégorie",
  //   prix: 00,
  //   prixOriginal: null,       // null ou prix barré
  //   etat: "Très bon",
  //   stock: 1,                 // 0 = masqué automatiquement
  //   nouveaute: true,
  //   dateAjout: "2025-06-29",
  //   description: "Description courte.",
  //   emoji: "📦",
  //   image: null,
  //   lienVinted: "https://www.vinted.fr/items/TON-ID"
  // },

];
