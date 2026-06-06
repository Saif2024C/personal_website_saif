const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function makePetal(className = "petal") {
  const petal = document.createElement("div");
  petal.className = className;

  const startX = Math.random() * window.innerWidth;
  const endX = startX + (Math.random() * 220 - 110);
  const duration = 7 + Math.random() * 6;
  const delay = Math.random() * 2;
  const rot = (Math.random() * 720 - 360) + "deg";

  petal.style.setProperty("--x-start", `${startX}px`);
  petal.style.setProperty("--x-end", `${endX}px`);
  petal.style.setProperty("--rot", rot);
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;

  document.body.appendChild(petal);

  const removeAfter = (duration + delay) * 1000 + 1000;
  setTimeout(() => petal.remove(), removeAfter);
}

function spawnBurst(x, y) {
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("div");
    petal.className = "burst-petal";

    const angle = (Math.PI * 2 * i) / 18;
    const distance = 40 + Math.random() * 80;
    const dx = Math.cos(angle) * distance + (Math.random() * 20 - 10);
    const dy = Math.sin(angle) * distance + (Math.random() * 20 - 10);

    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;
    petal.style.setProperty("--dx", `${dx}px`);
    petal.style.setProperty("--dy", `${dy}px`);

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 950);
  }
}

if (!prefersReducedMotion) {
  for (let i = 0; i < 14; i++) {
    setTimeout(() => makePetal(), i * 250);
  }

  setInterval(() => {
    makePetal();
  }, 700);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || link.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }

  e.preventDefault();

  const x = e.clientX || window.innerWidth / 2;
  const y = e.clientY || window.innerHeight / 2;

  if (!prefersReducedMotion) {
    spawnBurst(x, y);
  }

  setTimeout(() => {
    window.location.href = link.href;
  }, 180);
});
