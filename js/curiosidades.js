// ======================================================
// EDITE AQUI: a história de vocês, em ordem.
// "destaque" é opcional e aparece em itálico no fim do card.
// ======================================================
const HISTORIA = [
  {
    icon: "🏫",
    titulo: "Onde tudo começou",
    texto:
      "No colégio. Muito antes de qualquer encontro marcado, de qualquer música ou apelido, a gente já dividia os mesmos corredores sem fazer ideia do tamanho que isso ia tomar.",
  },
  {
    icon: "🍽️",
    titulo: "O primeiro encontro",
    texto:
      "Foi no restaurante do condomínio dela. Os dois começaram tímidos de um jeito quase engraçado, sem saber direito o que falar. Mas os minutos foram passando, algumas bebidas ajudaram, e a timidez foi virando conversa. A conversa virou o primeiro beijo. E o primeiro beijo virou tudo isso aqui.",
    destaque: "A gente se apaixonou ali, na mesma noite.",
  },
  {
    icon: "👑",
    titulo: 'De onde veio "pequena príncipe"',
    texto:
      "Ela me mandou o vídeo de um cara errando a rima. Foi tão sem noção, e tão engraçado, que a gente não conseguiu mais largar. Do nada aquilo virou apelido, e o apelido ficou.",
    destaque: "Escrito errado de propósito, porque do jeito certo não teria a menor graça.",
  },
  {
    icon: "🎧",
    titulo: "A nossa trilha sonora",
    texto:
      "Não tem uma música só que marque. Tem o Lil Peep e o Chase Atlantic, que cada um de nós já ouvia do seu lado, muito antes de a gente se encontrar. Quando descobrimos que os favoritos eram exatamente os mesmos, ficou meio difícil continuar chamando isso de coincidência.",
    destaque: "Foi o destino escolhendo a playlist antes da gente.",
  },
  {
    icon: "✨",
    titulo: "Um sonho para o futuro",
    texto:
      "Ter uma família. Dito assim parece simples, mas é a coisa mais séria que eu já quis na vida. E é com você.",
  },
];

const timeline = document.getElementById("timeline");

HISTORIA.forEach((item) => {
  const el = document.createElement("article");
  el.className = "tl-item";
  el.innerHTML = `
    <div class="tl-dot">${item.icon}</div>
    <div class="tl-card">
      <h3>${item.titulo}</h3>
      <p>${item.texto}</p>
      ${item.destaque ? `<span class="tl-highlight">${item.destaque}</span>` : ""}
    </div>
  `;
  timeline.appendChild(el);
});
