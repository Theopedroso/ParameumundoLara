// ======================================================
// EDITE AQUI: as músicas e a frase que aparece em cada uma.
// "id" é o trecho do link do Spotify que vem depois de /track/
// "frase" é o texto que aparece no card junto com a música.
// ======================================================
const TRACKS = [
  { id: "44A0o4jA8F2ZF03Zacwlwx", frase: "Começa por aqui. Essa é a nossa abertura." },
  { id: "3M0lSi5WW79CXQamgSBIjx", frase: "Toca essa quando eu estiver longe demais." },
  { id: "7uDUb37h7Xdhza1eWMkoJv", frase: "Tem dia que eu só quero isso: você, essa música e nada de pressa." },
  { id: "4HwDCXsMBC7SUdp2WT4MZP", frase: "Se um dia você esquecer o quanto eu te amo, volta nessa." },
  { id: "1WbhIxkn5ECsOwUm795iX1", frase: "Essa tem o barulho exato das nossas madrugadas." },
  { id: "09DFJg2KCnbBXkYItMubU5", frase: "Pra ouvir de olho fechado, pensando na gente." },
  { id: "1ACA277B6f46DYCgZW8di3", frase: "Essa aqui é sobre química, e você sabe muito bem disso." },
  { id: "2wEHxTBxLJk3vYzyW6dsAU", frase: "Pra dançar descalça na sala, sem ninguém vendo." },
  { id: "2pBzPtrGVQV8zURanVJLsd", frase: "Tem um pedaço meu escondido nessa letra." },
  { id: "0V5lqrDMb69gfnEZW7flmg", frase: "Quando o dia for ruim, começa por essa." },
  { id: "3eJokSSCz00X5qrHxAUJd1", frase: "É o tipo de música que eu queria ter escrito pra você." },
  { id: "21IYMdzTrzSe191Cy5eMap", frase: "Pra quando a saudade apertar mais que o normal." },
  { id: "5yJaXWIErrrsjQ3J0eR5aK", frase: "E essa fecha a playlist. Mas a gente não." },
];

const card = document.getElementById("playerCard");
const phraseEl = document.getElementById("playerPhrase");
const embedEl = document.getElementById("playerEmbed");
const counterEl = document.getElementById("playerCounter");
const dotsEl = document.getElementById("playerDots");
const hero = document.getElementById("playlistHero");

let current = 0;

TRACKS.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "player-dot";
  dot.setAttribute("aria-label", `Ir para a faixa ${i + 1}`);
  dot.addEventListener("click", () => render(i));
  dotsEl.appendChild(dot);
});

function render(index) {
  current = (index + TRACKS.length) % TRACKS.length;
  const track = TRACKS[current];

  card.classList.remove("is-visible");

  setTimeout(() => {
    phraseEl.textContent = track.frase;
    embedEl.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    counterEl.textContent = `Faixa ${String(current + 1).padStart(2, "0")} de ${TRACKS.length}`;
    hero.classList.add("playing");

    dotsEl.querySelectorAll(".player-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });

    card.classList.add("is-visible");
  }, 180);
}

document.getElementById("prevTrack").addEventListener("click", () => render(current - 1));
document.getElementById("nextTrack").addEventListener("click", () => render(current + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") render(current - 1);
  if (e.key === "ArrowRight") render(current + 1);
});

render(0);
