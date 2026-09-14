// ======================================================
// EDITE AQUI: data em que vocês começaram a namorar
// ======================================================
const START_DATE = new Date("2023-01-01T00:00:00");

// ---------- Marca a página ativa na navegação ----------
(function highlightNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === page) link.classList.add("active");
  });
})();

// ---------- Contador "tempo juntos" ----------
function formatDiff(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function tickCounters() {
  const diff = formatDiff(Date.now() - START_DATE.getTime());

  const compact = document.getElementById("togetherCompact");
  if (compact) {
    compact.textContent = `${diff.days}d ${String(diff.hours).padStart(2, "0")}h ${String(
      diff.minutes
    ).padStart(2, "0")}m`;
  }

  const days = document.getElementById("hDays");
  const hours = document.getElementById("hHours");
  const minutes = document.getElementById("hMinutes");
  const seconds = document.getElementById("hSeconds");
  if (days) days.textContent = diff.days;
  if (hours) hours.textContent = String(diff.hours).padStart(2, "0");
  if (minutes) minutes.textContent = String(diff.minutes).padStart(2, "0");
  if (seconds) seconds.textContent = String(diff.seconds).padStart(2, "0");
}
tickCounters();
setInterval(tickCounters, 1000);

// ---------- Corações flutuantes de fundo ----------
(function floatingHearts() {
  const container = document.createElement("div");
  container.className = "hearts-bg";
  document.body.appendChild(container);

  const symbols = ["💗", "❤️", "💕", "🎵"];

  function spawn() {
    const el = document.createElement("span");
    el.className = "heart-particle";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "vw";
    const duration = 8 + Math.random() * 8;
    el.style.animationDuration = duration + "s";
    el.style.fontSize = 0.9 + Math.random() * 1.4 + "rem";
    container.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }

  setInterval(spawn, 1400);
  spawn();
})();

// ---------- Toast ----------
function showToast(message, duration = 2600) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), duration);
}

// ---------- Confete de corações ----------
function burstHearts(count = 26) {
  const symbols = ["💗", "❤️", "💖", "💘", "✨"];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement("span");
      el.className = "confetti-heart";
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = Math.random() * 100 + "vw";
      const duration = 2.2 + Math.random() * 1.6;
      el.style.animationDuration = duration + "s";
      el.style.fontSize = 1 + Math.random() * 1.2 + "rem";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), duration * 1000);
    }, i * 40);
  }
}
window.burstHearts = burstHearts;
window.showToast = showToast;

// ---------- Easter egg: clique 3x no logo ----------
(function logoEasterEgg() {
  const logo = document.querySelector(".brand .logo");
  if (!logo) return;
  let clicks = 0;
  let timer = null;
  logo.addEventListener("click", () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => (clicks = 0), 1200);
    if (clicks >= 3) {
      clicks = 0;
      burstHearts(40);
      showToast("Eu te amo, Lara 💗", 3200);
    }
  });
})();

// ---------- Carta surpresa ----------
(function letterModal() {
  const trigger = document.getElementById("openLetter");
  const modal = document.getElementById("letterModal");
  const closeBtn = document.getElementById("closeLetter");
  if (!trigger || !modal) return;

  trigger.addEventListener("click", () => {
    modal.classList.add("open");
    burstHearts(16);
  });
  closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
})();
