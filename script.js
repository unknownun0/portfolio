// ---------- nav scroll state ----------
const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

// ---------- reveal on scroll ----------
const revealEls = document.querySelectorAll("[data-reveal]");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => io.observe(el));

// ---------- timeline active dot on scroll ----------
const tlItems = document.querySelectorAll(".tl-item");
const tlIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting)
        tlItems.forEach((i) =>
          i.classList.toggle("active", i === e.target),
        );
    });
  },
  { threshold: 0.5 },
);
tlItems.forEach((i) => tlIo.observe(i));

// ---------- copy email to clipboard ----------
const emailLink = document.getElementById("emailLink");
const copyToast = document.getElementById("copyToast");
if (emailLink) {
  emailLink.addEventListener("click", (e) => {
    if (navigator.clipboard) {
      e.preventDefault();
      navigator.clipboard
        .writeText(emailLink.dataset.email)
        .then(() => {
          copyToast.style.opacity = "1";
          clearTimeout(emailLink._t);
          emailLink._t = setTimeout(() => {
            copyToast.style.opacity = "0";
          }, 1800);
        })
        .catch(() => {
          window.location.href = emailLink.href;
        });
    }
  });
}

// ---------- generic carousel controller ----------
const AUTO_SCROLL_MS = 2000;
const RESUME_DELAY_MS = 4000;
const reduceMotionPref = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function initCarousel(trackId, prevId, nextId, fillId, countId, total) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const fill = document.getElementById(fillId);
  const count = document.getElementById(countId);
  const cards = Array.from(track.children);
  let current = 0;
  let autoTimer = null;
  let resumeTimer = null;

  function cardStep() {
    return cards[1]
      ? cards[1].offsetLeft - cards[0].offsetLeft
      : track.clientWidth;
  }

  function goTo(index) {
    current = ((index % total) + total) % total; // wrap around both directions
    track.scrollTo({ left: cardStep() * current, behavior: "smooth" });
  }

  function update() {
    const step = cardStep();
    current = Math.round(track.scrollLeft / step);
    current = Math.max(0, Math.min(current, total - 1));
    count.textContent = String(current + 1).padStart(2, "0");
    const pct = total <= 1 ? 0 : (current / (total - 1)) * 74;
    fill.style.left = pct + "%";
    prev.disabled = false;
    next.disabled = false;
  }

  function startAuto() {
    if (reduceMotionPref) return;
    stopAuto();
    autoTimer = setInterval(() => {
      goTo(current + 1);
    }, AUTO_SCROLL_MS);
  }
  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
  }
  function pauseThenResume() {
    stopAuto();
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAuto, RESUME_DELAY_MS);
  }

  prev.addEventListener("click", () => {
    pauseThenResume();
    goTo(current - 1);
  });
  next.addEventListener("click", () => {
    pauseThenResume();
    goTo(current + 1);
  });

  let raf;
  track.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    },
    { passive: true },
  );

  // pause on hover / touch / focus, resume after a short delay
  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);
  track.addEventListener("touchstart", pauseThenResume, {
    passive: true,
  });
  track.addEventListener("focusin", stopAuto);
  track.addEventListener("focusout", startAuto);

  // drag to scroll
  let isDown = false,
    startX = 0,
    startScroll = 0;
  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("dragging");
    startX = e.pageX;
    startScroll = track.scrollLeft;
    pauseThenResume();
  });
  window.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove("dragging");
    update();
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    track.scrollLeft = startScroll - (e.pageX - startX);
  });

  window.addEventListener("resize", update);
  update();
  startAuto();
}
initCarousel(
  "projTrack",
  "projPrev",
  "projNext",
  "projFill",
  "projCount",
  4,
);
initCarousel(
  "certTrack",
  "certPrev",
  "certNext",
  "certFill",
  "certCount",
  3,
);

// ---------- background thread canvas: cursor-follow strand ----------
const canvas = document.getElementById("thread-canvas");
const ctx = canvas.getContext("2d");
let w, h, dpr;
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = window.innerWidth * dpr;
  h = canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
}
resize();
window.addEventListener("resize", resize);

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let anchor = { x: mouse.x, y: mouse.y };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// fixed web anchor points (subtle, corner-biased) original "signal grid" motif
const anchors = [
  { x: 0.06, y: 0.1 },
  { x: 0.94, y: 0.08 },
  { x: 0.5, y: 0.02 },
  { x: 0.02, y: 0.55 },
  { x: 0.98, y: 0.6 },
];

function draw() {
  ctx.clearRect(0, 0, w, h);
  if (!reduceMotion) {
    anchor.x += (mouse.x - anchor.x) * 0.06;
    anchor.y += (mouse.y - anchor.y) * 0.06;
  } else {
    anchor.x = mouse.x;
    anchor.y = mouse.y;
  }
  ctx.lineWidth = 1 * dpr;
  anchors.forEach((a, i) => {
    const ax = a.x * window.innerWidth * dpr,
      ay = a.y * window.innerHeight * dpr;
    const mx = anchor.x * dpr,
      my = anchor.y * dpr;
    const midx =
      (ax + mx) / 2 + Math.sin(Date.now() / 1400 + i) * 14 * dpr;
    const midy =
      (ay + my) / 2 + Math.cos(Date.now() / 1600 + i) * 14 * dpr;
    const dist = Math.hypot(ax - mx, ay - my);
    const alpha = Math.max(0, 0.16 - dist / (2600 * dpr));
    ctx.strokeStyle = `rgba(243,243,241,${alpha})`;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(midx, midy, mx, my);
    ctx.stroke();
  });
  requestAnimationFrame(draw);
}
draw();
