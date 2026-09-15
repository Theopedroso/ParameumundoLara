// ======================================================
// EDITE AQUI: as músicas e a frase que aparece em cada uma.
// "id" é o trecho do link do Spotify que vem depois de /track/
// "frase" é o textinho que aparece em destaque no card.
// (O nome da música e o artista aparecem sozinhos, buscados do Spotify.)
// ======================================================
const TRACKS = [
  { id: "44A0o4jA8F2ZF03Zacwlwx", frase: "Começa por aqui. Toda história boa merece uma primeira faixa." },
  { id: "3M0lSi5WW79CXQamgSBIjx", frase: "Essa é pra quando eu estiver longe. Aperta o play e finge que eu tô aí." },
  { id: "7uDUb37h7Xdhza1eWMkoJv", frase: "Tem dia que eu quero só isso: você, essa música, e o mundo esperando lá fora." },
  { id: "4HwDCXsMBC7SUdp2WT4MZP", frase: "Se um dia você duvidar do quanto eu te amo, volta nessa aqui." },
  { id: "1WbhIxkn5ECsOwUm795iX1", frase: "Essa tem o barulho exato das nossas madrugadas, quando ninguém quer desligar." },
  { id: "09DFJg2KCnbBXkYItMubU5", frase: "Pra ouvir de olho fechado, lembrando do dia em que a gente se soltou." },
  { id: "1ACA277B6f46DYCgZW8di3", frase: "Essa é pura química. E você entende bem do assunto." },
  { id: "2wEHxTBxLJk3vYzyW6dsAU", frase: "Pra você dançar descalça pela casa achando que ninguém tá vendo. Eu tô." },
  { id: "2pBzPtrGVQV8zURanVJLsd", frase: "Tem um pedaço meu escondido no meio dessa aqui." },
  { id: "0V5lqrDMb69gfnEZW7flmg", frase: "Quando o dia for horrível, começa por essa. Eu prometo que ajuda." },
  { id: "3eJokSSCz00X5qrHxAUJd1", frase: "O tipo de música que eu queria ter escrito pra você antes de alguém escrever." },
  { id: "21IYMdzTrzSe191Cy5eMap", frase: "Pra quando a saudade vier mais forte que o normal." },
  { id: "5yJaXWIErrrsjQ3J0eR5aK", frase: "Essa fecha a playlist. A gente não fecha nunca, minha pequena príncipe." },
];

const card = document.getElementById("playerCard");
const phraseEl = document.getElementById("playerPhrase");
const embedEl = document.getElementById("playerEmbed");
const counterEl = document.getElementById("playerCounter");
const nameEl = document.getElementById("playerTrackName");
const dotsEl = document.getElementById("playerDots");
const hero = document.getElementById("playlistHero");

const nameCache = {};
let current = 0;

TRACKS.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "player-dot";
  dot.setAttribute("aria-label", `Ir para a faixa ${i + 1}`);
  dot.addEventListener("click", () => render(i));
  dotsEl.appendChild(dot);
});

// Busca nome e artista no Spotify. Se não der, o card fica só com o verso.
function loadName(id) {
  if (nameCache[id] !== undefined) {
    nameEl.textContent = nameCache[id];
    return;
  }
  nameEl.textContent = "";
  fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${id}`)
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      nameCache[id] = data.title || "";
      if (TRACKS[current].id === id) nameEl.textContent = nameCache[id];
    })
    .catch(() => {
      nameCache[id] = "";
    });
}

function render(index) {
  current = (index + TRACKS.length) % TRACKS.length;
  const track = TRACKS[current];

  card.classList.remove("is-visible");

  setTimeout(() => {
    phraseEl.textContent = track.frase;
    embedEl.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    counterEl.textContent = `Faixa ${String(current + 1).padStart(2, "0")} de ${TRACKS.length}`;
    loadName(track.id);
    hero.classList.add("playing");

    dotsEl.querySelectorAll(".player-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });

    card.classList.add("is-visible");
  }, 200);
}

document.getElementById("prevTrack").addEventListener("click", () => render(current - 1));
document.getElementById("nextTrack").addEventListener("click", () => render(current + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") render(current - 1);
  if (e.key === "ArrowRight") render(current + 1);
});

render(0);
