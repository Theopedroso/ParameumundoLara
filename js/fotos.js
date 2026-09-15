// ======================================================
// EDITE AQUI: as legendas de cada foto.
// Para trocar uma foto, substitua o arquivo em /fotos/ mantendo o mesmo nome.
// ======================================================
const PHOTOS = [
  { file: "fotos/foto1.jpg", caption: "Dormindo bonito" },
  { file: "fotos/foto2.jpg", caption: "De bobeira na sala" },
  { file: "fotos/foto3.jpg", caption: "Ela sendo ela" },
  { file: "fotos/foto4.jpg", caption: "Careta oficial do casal" },
  { file: "fotos/foto5.jpg", caption: "Aquele olhar" },
  { file: "fotos/foto6.jpg", caption: "Eu e o Shrek" },
  { file: "fotos/foto7.jpg", caption: "As princesas" },
];

const grid = document.getElementById("photoGrid");

PHOTOS.forEach((photo, index) => {
  const card = document.createElement("div");
  card.className = "photo-card";

  const img = document.createElement("img");
  img.src = photo.file;
  img.alt = photo.caption;
  img.loading = "lazy";

  const placeholder = document.createElement("div");
  placeholder.className = "photo-placeholder";
  placeholder.style.display = "none";
  placeholder.innerHTML = `<span class="ph-icon">💗</span><span>${photo.caption}<br>(adicione ${photo.file})</span>`;

  const caption = document.createElement("div");
  caption.className = "photo-caption";
  caption.textContent = photo.caption;

  img.addEventListener("error", () => {
    img.style.display = "none";
    caption.style.display = "none";
    placeholder.style.display = "flex";
  });

  card.appendChild(img);
  card.appendChild(placeholder);
  card.appendChild(caption);
  card.addEventListener("click", () => openLightbox(index));
  grid.appendChild(card);
});

// ---------- Lightbox ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
let currentIndex = 0;

function openLightbox(index) {
  const img = grid.children[index].querySelector("img");
  if (img.style.display === "none") return; // sem foto real ainda
  currentIndex = index;
  lightboxImg.src = PHOTOS[index].file;
  lightboxCaption.textContent = PHOTOS[index].caption;
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
      lightboxCaption.textContent = PHOTOS[currentIndex].caption;
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
