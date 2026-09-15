// ======================================================
// EDITE AQUI: as curiosidades reais sobre vocês dois.
// "front" é o título do card, "back" é o texto que aparece ao virar.
// ======================================================
const CURIOSIDADES = [
  { icon: "💌", front: "Primeiro encontro", back: "Escreva aqui como e onde foi o primeiro encontro de vocês." },
  { icon: "🎶", front: "Música da vez", back: "Conte qual música marcou algum momento importante de vocês." },
  { icon: "🍕", front: "Comida favorita dela", back: "Qual é o prato ou doce favorito da Lara?" },
  { icon: "🤫", front: "Um segredo bobo", back: "Alguma mania ou segredinho engraçado só de vocês dois." },
  { icon: "📍", front: "Onde se conheceram", back: "Conte a história de como vocês se conheceram." },
  { icon: "👑", front: "De onde veio 'pequena príncipe'", back: "A origem do apelido de vocês." },
  { icon: "📺", front: "Programa favorito", back: "Aquele que vocês assistem juntos sem cansar." },
  { icon: "✨", front: "Um sonho para o futuro", back: "Algo que vocês querem viver ou conquistar juntos." },
];

const flipGrid = document.getElementById("flipGrid");
CURIOSIDADES.forEach((c) => {
  const card = document.createElement("div");
  card.className = "flip-card";
  card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-face flip-front">
        <span class="fi">${c.icon}</span>
        <h4>${c.front}</h4>
        <span class="tap">toque para ver</span>
      </div>
      <div class="flip-face flip-back">${c.back}</div>
    </div>
  `;
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  flipGrid.appendChild(card);
});
