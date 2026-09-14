// ======================================================
// EDITE AQUI: quantas fotos existem e a legenda de cada uma.
// Salve os arquivos em /fotos/ com o nome indicado em "file".
// ======================================================
const PHOTOS = [
  { file: "fotos/foto1.jpg", caption: "Momento 1" },
  { file: "fotos/foto2.jpg", caption: "Momento 2" },
  { file: "fotos/foto3.jpg", caption: "Momento 3" },
  { file: "fotos/foto4.jpg", caption: "Momento 4" },
  { file: "fotos/foto5.jpg", caption: "Momento 5" },
  { file: "fotos/foto6.jpg", caption: "Momento 6" },
  { file: "fotos/foto7.jpg", caption: "Momento 7" },
  { file: "fotos/foto8.jpg", caption: "Momento 8" },
];

const grid = document.getElementById("photoGrid");
const loadedPhotos = [];

PHOTOS.forEach((photo, index) => {
  const card = document.createElement("div");
  card.className = "photo-card";
  card.dataset.index = index;

  const img = document.createElement("img");
  img.src = photo.file;
  img.alt = photo.caption;
  img.loading = "lazy";

  const placeholder = document.createElement("div");
  placeholder.className = "photo-placeholder";
  placeholder.style.display = "none";
  placeholder.innerHTML = `<span class="ph-icon">💗</span><span>${photo.caption}<br>(adicione ${photo.file})</span>`;

  img.addEventListener("error", () => {
    img.style.display = "none";
    placeholder.style.display = "flex";
  });
  img.addEventListener("load", () => loadedPhotos.push(photo.file));

  card.appendChild(img);
  card.appendChild(placeholder);
  card.addEventListener("click", () => openLightbox(index));
  grid.appendChild(card);
});

// ---------- Lightbox ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
let currentIndex = 0;

function openLightbox(index) {
  const img = grid.children[index].querySelector("img");
  if (img.style.display === "none") return; // sem foto real ainda
  currentIndex = index;
  lightboxImg.src = PHOTOS[index].file;
  lightbox.classList.add("open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

function showRelative(delta) {
  const total = PHOTOS.length;
  let next = currentIndex;
  for (let i = 0; i < total; i++) {
    next = (next + delta + total) % total;
    const img = grid.children[next].querySelector("img");
    if (img.style.display !== "none") {
      currentIndex = next;
      lightboxImg.src = PHOTOS[currentIndex].file;
      return;
    }
  }
}

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => showRelative(-1));
document.getElementById("lightboxNext").addEventListener("click", () => showRelative(1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showRelative(-1);
  if (e.key === "ArrowRight") showRelative(1);
});
