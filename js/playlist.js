// ======================================================
// EDITE AQUI: para adicionar/trocar músicas, pegue o link do Spotify
// (Compartilhar > Copiar link da música) e coloque só o ID (o trecho
// depois de /track/) na lista abaixo.
// ======================================================
const TRACK_IDS = [
  "44A0o4jA8F2ZF03Zacwlwx",
  "3M0lSi5WW79CXQamgSBIjx",
  "7uDUb37h7Xdhza1eWMkoJv",
  "4HwDCXsMBC7SUdp2WT4MZP",
  "1WbhIxkn5ECsOwUm795iX1",
  "09DFJg2KCnbBXkYItMubU5",
  "1ACA277B6f46DYCgZW8di3",
  "2wEHxTBxLJk3vYzyW6dsAU",
  "2pBzPtrGVQV8zURanVJLsd",
  "0V5lqrDMb69gfnEZW7flmg",
  "3eJokSSCz00X5qrHxAUJd1",
  "21IYMdzTrzSe191Cy5eMap",
  "5yJaXWIErrrsjQ3J0eR5aK",
];

const list = document.getElementById("playlistList");
const hero = document.getElementById("playlistHero");
document.getElementById("trackCount").textContent = TRACK_IDS.length;

TRACK_IDS.forEach((id, index) => {
  const row = document.createElement("div");
  row.className = "track-row";
  row.innerHTML = `
    <div class="track-summary">
      <span class="track-num">${index + 1}</span>
      <img class="track-thumb" alt="" />
      <div class="track-info">
        <div class="track-title">Faixa ${index + 1}</div>
        <div class="track-artist">toque para tocar</div>
      </div>
      <div class="track-play">▶</div>
    </div>
    <div class="track-embed-wrap"></div>
  `;
  list.appendChild(row);

  const summary = row.querySelector(".track-summary");
  const embedWrap = row.querySelector(".track-embed-wrap");
  const titleEl = row.querySelector(".track-title");
  const artistEl = row.querySelector(".track-artist");
  const thumbEl = row.querySelector(".track-thumb");

  // Busca título, artista e capa reais via oEmbed do Spotify (funciona no navegador de quem visita o site).
  fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${id}`)
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      if (data.title) {
        const parts = data.title.split(" - ");
        titleEl.textContent = parts[0] || data.title;
        artistEl.textContent = parts.slice(1).join(" - ") || "Spotify";
      }
      if (data.thumbnail_url) thumbEl.src = data.thumbnail_url;
    })
    .catch(() => {
      // sem internet até o Spotify (ou CORS bloqueado) — mantém "Faixa N", sem quebrar nada.
    });

  summary.addEventListener("click", () => {
    const alreadyOpen = row.classList.contains("expanded");

    document.querySelectorAll(".track-row.expanded").forEach((r) => {
      r.classList.remove("expanded");
      r.querySelector(".track-embed-wrap").innerHTML = "";
    });

    if (!alreadyOpen) {
      row.classList.add("expanded");
      embedWrap.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
      hero.classList.add("playing");
      row.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      hero.classList.remove("playing");
    }
  });
});
