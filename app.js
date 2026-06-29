/**
 * app.js — v3
 * Bon Plan de l'Étudiant
 * Nouveautés : partage par lien, modal article, copie URL
 */

const WHATSAPP_NUMBER = "330758993464";

// ===== Couleurs par catégorie =====
const CAT_COLORS = [
  { bg: "#E6FAF5", color: "#00A87B" },
  { bg: "#EFF6FF", color: "#2563EB" },
  { bg: "#F3EFFE", color: "#7C3AED" },
  { bg: "#FFF0EB", color: "#EA580C" },
  { bg: "#FFFBE6", color: "#B45309" },
  { bg: "#FDF2F8", color: "#BE185D" },
  { bg: "#F0FFF4", color: "#166534" },
];
const catColorMap = {};
let catColorIndex = 0;
function getCatColor(cat) {
  if (!catColorMap[cat]) {
    catColorMap[cat] = CAT_COLORS[catColorIndex % CAT_COLORS.length];
    catColorIndex++;
  }
  return catColorMap[cat];
}

// ===== Classe état =====
const ETAT_MAP = {
  "Excellent": "etat-excellent",
  "Très bon": "etat-tres-bon",
  "Bon": "etat-bon",
  "Correct": "etat-correct",
};

// ===== WhatsApp pré-rempli =====
function whatsappLink(titre, prix) {
  const msg = encodeURIComponent(`Bonjour ! Je suis intéressé(e) par "${titre}" à ${prix}€. Est-il toujours disponible ?`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

// ===== Calcul réduction =====
function getReduction(prix, prixOriginal) {
  if (!prixOriginal || prixOriginal <= prix) return null;
  return Math.round((1 - prix / prixOriginal) * 100);
}

// ===== Rendu badges =====
function renderBadges(p) {
  const reduc = getReduction(p.prix, p.prixOriginal);
  let badges = "";
  if (p.nouveaute) badges += `<span class="badge badge-new">🆕 Nouveau</span>`;
  if (reduc) badges += `<span class="badge badge-promo">-${reduc}%</span>`;
  if (p.stock <= 2 && p.stock > 0) badges += `<span class="badge badge-low">⚡ Plus que ${p.stock}</span>`;
  return badges ? `<div class="card-badges">${badges}</div>` : "";
}

// ===== Rendu stock =====
function renderStock(stock) {
  if (stock === 0) return `<div class="stock-bar sold"><span class="stock-dot"></span>Vendu</div>`;
  if (stock <= 2) return `<div class="stock-bar low"><span class="stock-dot"></span>${stock} dispo — dépêche-toi !</div>`;
  return `<div class="stock-bar ok"><span class="stock-dot"></span>${stock} disponibles</div>`;
}

// ===== Lien de partage =====
function getShareUrl(id) {
  return `${location.origin}${location.pathname}#article-${id}`;
}

// ===== Copier le lien =====
function copyShareLink(id, btn) {
  const url = getShareUrl(id);
  navigator.clipboard.writeText(url).then(() => {
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copié !`;
    btn.classList.add("copied");
    setTimeout(() => {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Partager`;
      btn.classList.remove("copied");
    }, 2000);
  });
}

// ===== Rendu carte produit =====
function renderCard(p, showSuggestion = false) {
  const color = getCatColor(p.categorie);
  const etatClass = ETAT_MAP[p.etat] || "etat-bon";
  const imgHtml = p.image
    ? `<img class="card-img" src="${p.image}" alt="${p.titre}" loading="lazy" />`
    : `<div class="card-img-placeholder">${p.emoji || "📦"}</div>`;
  const prixOriginalHtml = p.prixOriginal
    ? `<span class="prix-barre">${p.prixOriginal} €</span>` : "";

  return `
    <div class="product-card${showSuggestion ? " suggestion-card" : ""}" data-id="${p.id}" data-cat="${p.categorie}">
      <div class="card-img-wrap">
        ${imgHtml}
        ${renderBadges(p)}
      </div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-cat" style="background:${color.bg};color:${color.color}">${p.categorie}</span>
          <span class="card-etat ${etatClass}">${p.etat}</span>
        </div>
        <div class="card-title">${p.titre}</div>
        <div class="card-desc">${p.description}</div>
        <div class="card-price-row">
          <div class="card-price">${p.prix} € ${prixOriginalHtml}</div>
          ${renderStock(p.stock)}
        </div>
        <div class="card-actions">
          <a href="${p.lienVinted}" target="_blank" class="btn-vinted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            Acheter sur Vinted
          </a>
          <a href="${whatsappLink(p.titre, p.prix)}" target="_blank" class="btn-wa-small" title="Contacter sur WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <button class="btn-share" onclick="copyShareLink(${p.id}, this)" title="Copier le lien de partage">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            Partager
          </button>
        </div>
      </div>
    </div>
  `;
}

// ===== MODAL article =====
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const color = getCatColor(p.categorie);
  const etatClass = ETAT_MAP[p.etat] || "etat-bon";
  const reduc = getReduction(p.prix, p.prixOriginal);
  const imgHtml = p.image
    ? `<img class="modal-img" src="${p.image}" alt="${p.titre}" />`
    : `<div class="modal-img-placeholder">${p.emoji || "📦"}</div>`;
  const prixOriginalHtml = p.prixOriginal ? `<span class="prix-barre">${p.prixOriginal} €</span>` : "";
  const shareUrl = getShareUrl(id);

  document.getElementById("modalOverlay").innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <button class="modal-close" onclick="closeModal()" title="Fermer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-inner">
        <div class="modal-left">
          <div class="modal-img-wrap">
            ${imgHtml}
            ${renderBadges(p)}
          </div>
        </div>
        <div class="modal-right">
          <div class="modal-cats">
            <span class="card-cat" style="background:${color.bg};color:${color.color}">${p.categorie}</span>
            <span class="card-etat ${etatClass}">${p.etat}</span>
          </div>
          <h2 class="modal-title">${p.titre}</h2>
          <p class="modal-desc">${p.description}</p>
          <div class="modal-price-row">
            <div class="card-price">${p.prix} € ${prixOriginalHtml}</div>
            ${reduc ? `<span class="badge badge-promo">-${reduc}%</span>` : ""}
          </div>
          ${renderStock(p.stock)}

          <div class="modal-share-box">
            <span class="share-label">🔗 Lien de partage</span>
            <div class="share-input-row">
              <input class="share-input" type="text" value="${shareUrl}" readonly onclick="this.select()" />
              <button class="btn-copy-modal" id="modalCopyBtn" onclick="copyModalLink('${shareUrl}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copier
              </button>
            </div>
          </div>

          <div class="modal-actions">
            <a href="${p.lienVinted}" target="_blank" class="btn-vinted modal-btn-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
              Acheter sur Vinted
            </a>
            <a href="${whatsappLink(p.titre, p.prix)}" target="_blank" class="btn-whatsapp-modal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("modalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
  history.pushState(null, "", `#article-${id}`);
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.body.style.overflow = "";
  history.pushState(null, "", location.pathname);
}

function copyModalLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById("modalCopyBtn");
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copié !`;
    btn.classList.add("copied");
    setTimeout(() => {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copier`;
      btn.classList.remove("copied");
    }, 2000);
  });
}

// ===== Suggestions similaires =====
function getSuggestions(currentId, categorie, count = 3) {
  return products
    .filter(p => p.id !== currentId && p.categorie === categorie && p.stock > 0)
    .slice(0, count);
}

function renderSuggestions(productId, categorie) {
  const suggestions = getSuggestions(productId, categorie);
  if (suggestions.length === 0) return "";
  return `
    <div class="suggestions-section">
      <div class="suggestions-title">📦 Tu pourrais aussi aimer</div>
      <div class="suggestions-grid">
        ${suggestions.map(p => renderCard(p, true)).join("")}
      </div>
    </div>
  `;
}

// ===== Filtres & tri =====
let activeFilter = "all";
let searchQuery = "";
let activeTri = "defaut";

function getCategories() {
  return ["all", ...new Set(products.map(p => p.categorie))];
}

function renderFilters() {
  const cats = getCategories();
  const container = document.getElementById("catFilters");
  const nav = document.getElementById("navCats");

  cats.forEach(cat => {
    if (cat === "all") return;
    const btn = document.createElement("button");
    btn.className = "cat-btn";
    btn.dataset.cat = cat;
    btn.textContent = cat;
    container.appendChild(btn);

    const link = document.createElement("button");
    link.className = "nav-cat-link";
    link.textContent = cat;
    link.addEventListener("click", () => {
      setActiveFilter(cat);
      document.getElementById("catalogue").scrollIntoView({ behavior: "smooth" });
    });
    nav.appendChild(link);
  });
}

function setActiveFilter(cat) {
  activeFilter = cat;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.toggle("active", b.dataset.cat === cat));
  renderProducts();
}

function sortProducts(list) {
  const sorted = [...list];
  switch (activeTri) {
    case "prix-asc":   return sorted.sort((a, b) => a.prix - b.prix);
    case "prix-desc":  return sorted.sort((a, b) => b.prix - a.prix);
    case "nouveautes": return sorted.sort((a, b) => new Date(b.dateAjout) - new Date(a.dateAjout));
    case "etat":
      const ordre = ["Excellent", "Très bon", "Bon", "Correct"];
      return sorted.sort((a, b) => ordre.indexOf(a.etat) - ordre.indexOf(b.etat));
    default: return sorted;
  }
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");
  const q = searchQuery.toLowerCase().trim();

  let filtered = products.filter(p => {
    if (p.stock === 0) return false;
    const matchCat = activeFilter === "all" || p.categorie === activeFilter;
    const matchSearch = !q || p.titre.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.categorie.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  filtered = sortProducts(filtered);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "flex";
  } else {
    empty.style.display = "none";
    grid.innerHTML = filtered.map(p => renderCard(p)).join("");

    grid.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a") || e.target.closest("button")) return;
        openModal(parseInt(card.dataset.id));
      });
    });
  }
}

// ===== Stats =====
function updateStats() {
  const dispo = products.filter(p => p.stock > 0);
  const cats = new Set(products.map(p => p.categorie));
  animateCount(document.getElementById("statCount"), dispo.length);
  animateCount(document.getElementById("statCats"), cats.size);
}

function animateCount(el, target) {
  if (!el) return;
  let current = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 30);
}

// ===== Gestion du hash dans l'URL =====
function handleHash() {
  const hash = location.hash;
  if (hash.startsWith("#article-")) {
    const id = parseInt(hash.replace("#article-", ""));
    if (!isNaN(id)) openModal(id);
  }
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  products.forEach(p => getCatColor(p.categorie));
  renderFilters();
  renderProducts();
  updateStats();

  document.getElementById("catFilters").addEventListener("click", e => {
    if (e.target.classList.contains("cat-btn")) setActiveFilter(e.target.dataset.cat);
  });

  document.getElementById("searchInput").addEventListener("input", e => {
    searchQuery = e.target.value;
    renderProducts();
  });

  document.getElementById("triSelect").addEventListener("change", e => {
    activeTri = e.target.value;
    renderProducts();
  });

  // Fermer modal avec Échap ou clic sur l'overlay
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modalOverlay")) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // Ouvre automatiquement l'article si lien partagé
  handleHash();
});
