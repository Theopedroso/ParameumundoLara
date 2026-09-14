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
  { icon: "👑", front: "De onde veio 'pequena príncipe'", back: "A origem do meme/apelido de vocês." },
  { icon: "📺", front: "Programa/filme favorito", back: "Aquele que vocês assistem juntos sem cansar." },
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

// ======================================================
// EDITE AQUI: as perguntas do quiz sobre o casal.
// "correct" é o índice (0, 1, 2...) da resposta certa em "options".
// ======================================================
const QUIZ = [
  {
    question: "Qual é a comida favorita da Lara?",
    options: ["Pizza", "Sushi", "Hambúrguer", "Brigadeiro"],
    correct: 0,
  },
  {
    question: "Em que mês vocês começaram a namorar?",
    options: ["Janeiro", "Maio", "Setembro", "Dezembro"],
    correct: 0,
  },
  {
    question: "Qual o apelido carinhoso dela?",
    options: ["Pequena príncipe", "Docinho", "Estrela", "Flor"],
    correct: 0,
  },
  {
    question: "Qual série/filme vocês mais assistem juntos?",
    options: ["Ainda não sei", "Comédia", "Terror", "Romance"],
    correct: 0,
  },
  {
    question: "Onde vocês se conheceram?",
    options: ["Ainda não sei", "Escola/faculdade", "Amigos em comum", "Redes sociais"],
    correct: 0,
  },
];

let quizIndex = 0;
let quizScore = 0;
const quizQuestionsEl = document.getElementById("quizQuestions");
const quizProgressEl = document.getElementById("quizProgress");
const quizResultEl = document.getElementById("quizResult");
const quizScoreEl = document.getElementById("quizScore");
const quizMessageEl = document.getElementById("quizMessage");

function renderQuiz() {
  quizQuestionsEl.innerHTML = "";
  quizResultEl.classList.remove("active");
  quizIndex = 0;
  quizScore = 0;
  renderQuestion();
}

function renderQuestion() {
  quizQuestionsEl.innerHTML = "";
  const q = QUIZ[quizIndex];
  quizProgressEl.textContent = `Pergunta ${quizIndex + 1} de ${QUIZ.length}`;

  const block = document.createElement("div");
  block.className = "quiz-question active";
  block.innerHTML = `<h4>${q.question}</h4><div class="quiz-options"></div>`;
  const optsWrap = block.querySelector(".quiz-options");

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => answerQuiz(i, btn, optsWrap));
    optsWrap.appendChild(btn);
  });

  quizQuestionsEl.appendChild(block);
}

function answerQuiz(selected, btn, optsWrap) {
  const q = QUIZ[quizIndex];
  const buttons = optsWrap.querySelectorAll("button");
  buttons.forEach((b) => (b.disabled = true));

  if (selected === q.correct) {
    btn.classList.add("correct");
    quizScore++;
  } else {
    btn.classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < QUIZ.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 900);
}

function finishQuiz() {
  quizQuestionsEl.innerHTML = "";
  quizResultEl.classList.add("active");
  quizScoreEl.textContent = `${quizScore}/${QUIZ.length}`;

  if (quizScore === QUIZ.length) {
    quizMessageEl.textContent = "Perfeito! Você conhece a Lara de cor e salteado 💗";
    if (window.burstHearts) burstHearts(35);
  } else if (quizScore >= QUIZ.length / 2) {
    quizMessageEl.textContent = "Muito bem! Mas ainda dá pra aprender mais sobre ela ✨";
  } else {
    quizMessageEl.textContent = "Hmm, bora conversar mais sobre esses detalhes 😅";
  }
}

document.getElementById("quizRestart").addEventListener("click", renderQuiz);
renderQuiz();
