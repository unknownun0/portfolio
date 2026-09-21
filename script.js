"use strict";

// Clear old stale localStorage keys
localStorage.removeItem("portfolio_digital_projects");

// ------------------------- localStorage helper -------------------------
const ADMIN_KEY = "portfolio_admin_data";
function getAdminData(section) {
  try {
    const s = localStorage.getItem(ADMIN_KEY);
    if (s) {
      const d = JSON.parse(s);
      if (d && d[section]) return d[section];
    }
  } catch (e) { console.warn("Admin data parse error:", e); }
  return null;
}

// ------------------------- local AI knowledge base -------------------------
// Edit content here — the page renders itself from this data.
const DATA = {
  roles: [
    "Full-Stack Web Developer",
    "AI-Powered Solutions Builder",
    "React.js & Tailwind CSS Craftsman",
    "PHP / Node.js Backend Engineer",
    "Multimedia Editor & Designer",
    "REST API & Chatbot Integrator",
  ],
  projects: [
    {
      id: "SYS / 01",
      role: "Full-Stack Developer",
      img: "image/heritage.png",
      alt: "Heritage Park Taguig Management System",
      title: "Heritage Park Taguig Management System",
      desc: "Architected a full-stack web app to streamline park operations and record management, with a responsive interface built for both desktop and mobile.",
      points: [
        "Designed a responsive frontend with Tailwind CSS for optimal cross-device viewing",
        "Implemented backend logic for database management and data retrieval",
        "Built secure user interaction flows across the platform",
      ],
      stack: ["PHP", "JavaScript", "MySQL", "Tailwind CSS"],
    },
    {
      id: "SYS / 02",
      role: "Full-Stack Developer",
      img: "image/stdom.png",
      alt: "Student Health Record & Admin Analytics System",
      title: "Student Health Record & Admin Analytics System",
      desc: "An interactive analytics dashboard for medical staff and administrators, built around institutional color branding and dynamic metrics.",
      points: [
        "Designed the dashboard interface with Tailwind CSS and JavaScript",
        "Configured PHP/MySQL backend routes to pull dynamic metrics",
        "Integrated role-based documentation and system security access",
      ],
      stack: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    },
    {
      id: "SYS / 03",
      role: "Full-Stack Developer",
      img: "image/roma.png",
      alt: "Online Booking System — ROMA Tours Corp.",
      title: "ROMA Online Booking (Online Bus Ticket Reservation System)",
      desc: "A web-based bus booking platform for real-time availability, schedules, and driver details, with an AI layer on top for customer support.",
      points: [
        "Integrated an AI chatbot for real-time schedule, fare, and bus-type queries",
        "Built a sales analytics dashboard with dynamic charts and moving averages",
        "Automated printable receipts and email notifications for approved bookings",
      ],
      stack: ["PHP", "MySQL", "XAMPP", "AI Chatbot"],
    },
    {
      id: "SYS / 04",
      role: "Full-Stack Developer",
      img: "",
      alt: "",
      title: "Online Grading Management System — AZGH College",
      desc: "A grading system automating grade computation across Performance Tasks, Written Works, and Examinations for an entire college.",
      points: [
        "Automated grade computation and email notifications to students",
        "Designed an accessible, user-friendly frontend interface",
        "Built with maintainability for non-technical administrators in mind",
      ],
      stack: ["PHP", "XAMPP", "HTML5", "Tailwind CSS"],
    },
  ],
  certs: [
    {
      img: "image/python.png",
      name: "Python",
      link: "https://freecodecamp.org/certification/fccaada7d45-00a6-4feb-a757-d51238c2ebea/python-v9",
    },
    {
      img: "image/rwd.png",
      name: "Responsive Web Design",
      link: "https://freecodecamp.org/certification/fccaada7d45-00a6-4feb-a757-d51238c2ebea/responsive-web-design-v9",
    },
    {
      img: "image/java.png",
      name: "JavaScript Algorithms & Data Structures",
      link: "https://freecodecamp.org/certification/fccaada7d45-00a6-4feb-a757-d51238c2ebea/javascript-v9",
    },
  ],
  experience: [
    {
      title: "Web Development Engineer Intern",
      period: "2026 — 2026",
      org: "St. Dominic College of Asia — ICT Department",
      desc: "Built and maintained responsive user interfaces using HTML5, Tailwind CSS, JavaScript, and PHP, while integrating APIs, managing MySQL databases, authoring technical documentation, and performing cross-viewport debugging.",
      img: "",
    },
    {
      title: "Club Promoter & Host — Various Locations (Quezon City, Poblacion, Malate)",
      period: "2024 - 2025",
      org: "Promoter / Host",
      desc: "Promoted nightlife events and hosted club nights. Engaged with audiences to enhance event turnout and customer experience, and maintained active promotion through social platforms.",
      img: "",
    },
    {
      title: "Bimbo's Coffee Shop, Las Piñas",
      period: "2026 — 2026",
      org: "Barista / Graphic Designer",
      desc: "Started as a barista and was promoted to graphic designer. Designed product promotional materials, posters, and edited videos for marketing, helping improve the brand's visual identity.",
      img: "",
    },
    {
      title: "The BLOKC Seminar",
      period: "April 2025",
      org: "Blockchain Technology",
      desc: "",
      img: "image/block.jpg",
    },
    {
      title: "Daytona Seminar",
      period: "August 2024",
      org: "Technical Support Staff",
      desc: "",
      img: "image/daytona.jpg",
    },
    {
      title: "GitHub Seminar",
      period: "October 2025",
      org: "Technical Support Staff",
      desc: "",
      img: "image/github.jpg",
    },
  ],
  digitalProjects: [
    {
      title: "NEFICO NFC Pubmat Posting",
      org: "Digital Design",
      desc: "Pubmat posting design for NEFICO NFC brand promotion.",
      img: "image/digi-02-grand-opening.png",
    },
    {
      title: "Logo Local Brand Creation",
      org: "Brand Design",
      desc: "Custom logo creation for a local brand identity.",
      img: "image/digi-18-makiling-hoodie.png",
    },
    {
      title: "Local Clothing Brand Tshirt Merch Design",
      org: "Merch Design",
      desc: "Tshirt merchandise design for a local clothing brand.",
      img: "image/digi-20-makiling-footer.png",
    },
    {
      title: "SABL Pubmat Menu",
      org: "Menu Design",
      desc: "Pubmat menu design for SABL brand.",
      img: "image/digi-01-coffee-menu.png",
    },
    {
      title: "SABL Logo Creation",
      org: "Brand Design",
      desc: "Custom logo creation for SABL brand.",
      img: "image/digi-22-business-card.png",
    },
    {
      title: "G Ka Brew — Matcha Pubmat",
      org: "Promo Poster · Photoshop",
      desc: "Matcha pubmat post with promo pricing.",
      img: "image/digi-08-frappe-promo.png",
    },
    {
      title: "G Ka Brew — Soda Juice Menu",
      org: "Menu Design · Photoshop",
      desc: "Colorful soda juice lineup with pricing, logo, and location details.",
      img: "image/digi-09-soda-juice.png",
    },
    {
      title: "G Ka Brew — Drinks Promo",
      org: "Promo Poster · Photoshop",
      desc: "Iced coffee lineup with torn-paper effect and layered design.",
      img: "image/digi-10-vanilla-latte-torn.png",
    },
    {
      title: "Club Group Schedule Pubmat Poster",
      org: "Event Poster",
      desc: "Schedule pubmat poster for club group events.",
      img: "image/digi-13-afterdark-venom.png",
    },
    {
      title: "Club Brand Pubmat",
      org: "Brand Design",
      desc: "Brand pubmat design for club identity.",
      img: "image/digi-15-back-to-school.png",
    },
    {
      title: "Frappe Factory — Best Seller Menu (4 Flavors)",
      org: "Menu Design · Photoshop",
      desc: "Compact best seller layout featuring Mango Graham, Avocado Graham, Caramel Macchiato, and Kasoy Avocado.",
      img: "image/digi-12-best-seller-4.png",
    },
    {
      title: "Afterdark Co. — We Are Venom Event",
      org: "Event Poster · Photoshop",
      desc: "Dark event flyer with green snake motif, artist lineup, and phone mockup presentation.",
      img: "image/digi-13-afterdark-venom.png",
    },
    {
      title: "Frappe Factory — Vanilla Biscoff Coffee",
      org: "Product Poster · Photoshop",
      desc: "Featured product spotlight with Biscoff jar pairing and splatter background.",
      img: "image/digi-14-vanilla-biscoff.png",
    },
    {
      title: "G Ka Brew — Back to School Promo",
      org: "Event Poster · Photoshop",
      desc: "Fun illustrated promo poster with school-themed graphics and discount offer.",
      img: "image/digi-15-back-to-school.png",
    },
    {
      title: "G Ka Brew — Product Menu Drinks Lineup",
      org: "Menu Design · Photoshop",
      desc: "Full product menu with drinks lineup featuring coffee and non-coffee options.",
      img: "image/digi-01-coffee-menu.png",
    },
    {
      title: "Frappe Factory — Open for Franchise",
      org: "Business Poster · Photoshop",
      desc: "Franchise opportunity poster with business package details and product lineup.",
      img: "image/digi-16-open-franchise.png",
    },
    {
      title: "Frappe Factory — Shawarma Rice & Wrap",
      org: "Menu Poster · Photoshop",
      desc: "Food menu poster featuring shawarma rice bowl and wrap with pricing.",
      img: "image/digi-17-shawarma.png",
    },
    {
      title: "Makiling Corp — Hero Section Design",
      org: "Web Design · UI/UX",
      desc: "Brand hero section with lifestyle photography, logo overlay, and green-toned aesthetic.",
      img: "image/digi-19-makiling-hero.png",
    },
    {
      title: "Makiling Corp — Footer & Jersey Mockup",
      org: "Web Design · UI/UX",
      desc: "Contact section with jersey product mockup and social media integration.",
      img: "image/digi-20-makiling-footer.png",
    },
    {
      title: "Frappe Factory — Loyalty Card",
      org: "Brand Design · Photoshop",
      desc: "Punch-card loyalty design with 10-drink reward system and product strip.",
      img: "image/digi-21-loyalty-card.png",
    },
    {
      title: "Frappe Factory — Business Card",
      org: "Brand Design · Photoshop",
      desc: "Professional business card with geometric background, contact info, and product collage.",
      img: "image/digi-22-business-card.png",
    },
  ],
  education: [
    {
      year: "2022 — 2026",
      school: "Dr. Filemon C. Aguilar Memorial College, Las Piñas",
      lines: [
        "Bachelor of Science in Information Systems (BSIS)",
        "PSITE Head Programmer since 2023-2026",
        "Academic achiever 2024-2025",
      ],
    },
    {
      year: "2020 — 2022",
      school: "Zarate College",
      lines: [
        "Senior High School Graduate",
        "ICT Top 5 Programmer Grade 11 & 12",
        "Best in Research 2021-2022",
      ],
    },
    {
      year: "2016 — 2020",
      school: "Captain Albert Aguilar National High School",
      lines: [
        "High School Graduate",
        "ICT top achiever since grade 8 to 10",
      ],
    },
  ],
};

// ------------------------- helpers -------------------------
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ------------------------- dynamic renderers -------------------------
function renderProjects() {
  const track = document.getElementById("projTrack");
  if (!track) return;
  const adminProjects = getAdminData("projects");
  const projects = adminProjects || DATA.projects;
  if (!projects || !projects.length) return;
  projects.forEach((p) => {
    if (!p) return;
    const card = el("article", "proj-card");
    const top = el("div", "proj-top");
    top.append(el("span", "proj-id", p.id || ""), el("span", "proj-role", p.role || ""));
    card.append(top);
    if (p.img) {
      const img = el("img", "proj-img");
      img.src = p.img;
      img.alt = p.alt || p.title || "";
      img.loading = "lazy";
      card.append(img);
    }
    card.append(el("h3", null, p.title || ""), el("p", "proj-desc", p.desc || ""));
    const ul = el("ul", "proj-points");
    (p.points || []).forEach((pt) => ul.append(el("li", null, pt)));
    card.append(ul);
    const stack = el("div", "proj-stack");
    (p.stack || []).forEach((s) => stack.append(el("span", null, s)));
    card.append(stack);
    track.append(card);
  });
}

function renderCerts() {
  const track = document.getElementById("certTrack");
  if (!track) return;
  const adminCerts = getAdminData("certs");
  const certs = adminCerts || DATA.certs;
  if (!certs || !certs.length) return;
  certs.forEach((c) => {
    if (!c) return;
    const card = el("article", "cert-card");
    const icon = el("div", "cert-icon");
    icon.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4">' +
      '<path d="M12 15l-5.5 3 1-6L3 8l6-.7L12 2l3 5.3L21 8l-4.5 4 1 6z"/></svg>';
    card.append(icon);
    if (c.img) {
      const img = el("img", "cert-img");
      img.src = c.img;
      img.alt = (c.name || "") + " Certification Badge";
      img.loading = "lazy";
      card.append(img);
    }
    card.append(el("h4", null, c.name || ""));
    if (c.link) {
      const a = el("a", "cert-link", "View credential");
      a.href = c.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML +=
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<path d="M7 17L17 7M7 7h10v10"/></svg>';
      card.append(a);
    }
    track.append(card);
  });
}

function renderExperience() {
  const track = document.getElementById("expTrack");
  if (!track) return;
  const adminExp = getAdminData("experience");
  const experience = adminExp || DATA.experience;
  if (!experience || !experience.length) return;
  experience.forEach((e) => {
    if (!e) return;
    const card = el("article", "cert-card");
    if (e.img) {
      const img = el("img", "cert-img");
      img.src = e.img;
      img.alt = (e.title || "") + " Badge";
      img.loading = "lazy";
      card.append(img);
    }
    card.append(el("h4", null, e.title || ""));
    if (e.period) card.append(el("span", "exp-period", e.period));
    if (e.org) card.append(el("span", "exp-org", e.org));
    if (e.desc) card.append(el("p", null, e.desc));
    track.append(card);
  });
}

function renderDigitalProjects() {
  const grid = document.getElementById("digGrid");
  if (!grid) return;
  const adminDig = getAdminData("digital");
  const items = adminDig || DATA.digitalProjects;
  if (!items || !items.length) return;
  items.forEach((d) => {
    if (!d) return;
    const card = el("article", "dig-card");
    if (d.img) {
      const imgWrap = el("div", "dig-img-wrap");
      const img = el("img", "dig-img");
      img.src = d.img;
      img.alt = (d.title || "") + " Preview";
      img.loading = "lazy";
      img.addEventListener("click", () => openLightbox(d.img, d.title));
      imgWrap.append(img);
      card.append(imgWrap);
    }
    const info = el("div", "dig-info");
    info.append(el("h4", null, d.title || ""));
    if (d.period) info.append(el("span", "dig-period", d.period));
    if (d.org) info.append(el("span", "dig-org", d.org));
    if (d.desc) info.append(el("p", "dig-desc", d.desc));
    card.append(info);
    grid.append(card);
  });
}

// ------------------------- lightbox -------------------------
function openLightbox(src, alt) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  if (!lb || !img) return;
  img.src = src;
  img.alt = alt || "";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  lb.classList.remove("open");
  document.body.style.overflow = "";
}
document.addEventListener("click", (e) => {
  if (e.target.id === "lightboxClose" || e.target.id === "lightbox") {
    closeLightbox();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

function renderEducation() {
  const grid = document.getElementById("eduGrid");
  if (!grid) return;
  const adminEdu = getAdminData("education");
  const education = adminEdu || DATA.education;
  education.forEach((edu, i) => {
    const card = el("div", "edu-card");
    if (i % 2 === 0) card.style.animationDelay = i * 0.08 + "s";
    card.append(el("span", "edu-year", edu.year));
    card.append(el("h4", null, edu.school));
    edu.lines.forEach((l) => card.append(el("p", null, l)));
    grid.append(card);
  });
}

// ------------------------- mobile nav drawer -------------------------
const navToggle = document.getElementById("navToggle");
const navDrawer = document.getElementById("navDrawer");
const navOverlay = document.getElementById("navOverlay");
const drawerClose = document.getElementById("drawerClose");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  navDrawer.classList.toggle("open", open);
  navOverlay.classList.toggle("open", open);
  navToggle.classList.toggle("active", open);
  navDrawer.setAttribute("aria-hidden", String(!open));
  navToggle.setAttribute("aria-expanded", String(open));
}
navToggle.addEventListener("click", () => {
  setMenu(!navDrawer.classList.contains("open"));
});
drawerClose.addEventListener("click", () => setMenu(false));
navOverlay.addEventListener("click", () => setMenu(false));
navDrawer.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => setMenu(false)),
);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenu(false);
});

// ------------------------- nav scroll state -------------------------
const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

// ------------------------- reveal on scroll -------------------------
const revealEls = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !reduceMotion) {
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
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// ------------------------- count-up stats -------------------------
function initCountUp() {
  const nums = document.querySelectorAll(".stat .num");
  if (!nums.length) return;
  if (!("IntersectionObserver" in window)) {
    nums.forEach((n) => {
      n.textContent = (n.dataset.count || "0") + (n.dataset.suffix || "");
    });
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = e.target;
        obs.unobserve(n);
        const target = parseInt(n.dataset.count, 10) || 0;
        const suffix = n.dataset.suffix || "";
        if (reduceMotion) {
          n.textContent = target + suffix;
          return;
        }
        const dur = 1200;
        const t0 = performance.now();
        function step(t) {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          n.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.4 },
  );
  nums.forEach((n) => obs.observe(n));
}

// ------------------------- AI typing effect -------------------------
function initTypewriter() {
  const typeText = document.getElementById("typeText");
  const adminHero = getAdminData("hero");
  const roles = (adminHero && adminHero.roles) || DATA.roles;
  if (!typeText || !roles.length) return;
  if (reduceMotion) {
    typeText.textContent = DATA.roles[0];
    return;
  }
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const TYPE_MS = 55;
  const DELETE_MS = 26;
  const HOLD_MS = 1700;

  function tick() {
    const role = roles[roleIdx];
    if (!deleting) {
      charIdx += 1;
      typeText.textContent = role.slice(0, charIdx);
      if (charIdx === role.length) {
        deleting = true;
        setTimeout(tick, HOLD_MS);
        return;
      }
      setTimeout(tick, TYPE_MS);
    } else {
      charIdx -= 1;
      typeText.textContent = role.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, DELETE_MS);
    }
  }
  setTimeout(tick, 900);
}

// ------------------------- copy email to clipboard -------------------------
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

// ------------------------- generic carousel controller -------------------------
const AUTO_SCROLL_MS = 2000;
const RESUME_DELAY_MS = 4000;

function initCarousel(trackId, prevId, nextId, fillId, countId, total) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const fill = document.getElementById(fillId);
  const count = document.getElementById(countId);
  if (!track || !prev || !next || !fill || !count) return;
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
  }

  function startAuto() {
    if (reduceMotion) return;
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
  track.addEventListener("touchstart", pauseThenResume, { passive: true });
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

// ------------------------- background thread canvas -------------------------
const canvas = document.getElementById("thread-canvas");
let ctx = null;
if (canvas) {
  ctx = canvas.getContext("2d");
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
}

// ------------------------- dynamic year -------------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ------------------------- boot -------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Apply admin hero data to DOM
  const ah = getAdminData("hero");
  if (ah) {
    const h1 = document.querySelector(".hero h1");
    if (h1 && ah.name) {
      const parts = ah.name.split(" ");
      const mid = Math.ceil(parts.length / 2);
      h1.innerHTML = `<span class="line"><span>${parts.slice(0, mid).join(" ")}</span></span><span class="line"><span>${parts.slice(mid).join(" ")}</span></span>`;
    }
    const tagline = document.querySelector(".eyebrow");
    if (tagline && ah.tagline) tagline.innerHTML = `<span class="dot"></span> ${ah.tagline}`;
    const sub = document.querySelector(".hero-sub");
    if (sub && ah.subtitle) sub.textContent = ah.subtitle;
    const profImg = document.querySelector(".portrait-clip img");
    if (profImg && ah.profileImg) profImg.src = ah.profileImg;
    const ctaBtns = document.querySelectorAll(".hero-actions .btn");
    if (ctaBtns[0] && ah.ctaPrimary) { ctaBtns[0].textContent = ah.ctaPrimary; ctaBtns[0].href = ah.ctaPrimaryLink; }
    if (ctaBtns[1] && ah.ctaSecondary) { ctaBtns[1].textContent = ah.ctaSecondary; ctaBtns[1].href = ah.ctaSecondaryLink; }
  }
  // Apply admin about data
  const ab = getAdminData("about");
  if (ab) {
    const bioP = document.querySelector("#about .about-grid p");
    if (bioP && ab.bio) bioP.innerHTML = ab.bio;
    const statNums = document.querySelectorAll(".stat .num");
    if (statNums.length && ab.stats) {
      statNums.forEach((n, i) => {
        if (ab.stats[i]) { n.dataset.count = ab.stats[i].num; n.dataset.suffix = ab.stats[i].suffix; n.textContent = ab.stats[i].num + ab.stats[i].suffix; }
        const lbl = n.parentElement.querySelector(".lbl");
        if (lbl && ab.stats[i]) lbl.textContent = ab.stats[i].label;
      });
    }
  }
  // Apply admin contact data
  const ac = getAdminData("contact");
  if (ac) {
    const emailEl = document.getElementById("emailLink");
    if (emailEl && ac.email) { emailEl.textContent = ac.email; emailEl.dataset.email = ac.email; emailEl.href = "mailto:" + ac.email; }
    const phoneEl = document.getElementById("phoneLink");
    if (phoneEl && ac.phoneDisplay) { phoneEl.textContent = ac.phoneDisplay; phoneEl.href = "tel:" + ac.phone; }
    const titleLink = document.querySelector(".contact-title a");
    if (titleLink && ac.email) titleLink.href = "mailto:" + ac.email;
  }
  // Apply admin nav links
  const navResume = document.getElementById("navResume");
  if (navResume) navResume.href = "ATS CV EARL.pdf";

  // Apply admin global data
  const ag = getAdminData("global");
  if (ag) {
    // Brand name in nav
    document.querySelectorAll(".brand").forEach(b => {
      const svg = b.querySelector("svg");
      if (ag.brandName) {
        b.innerHTML = "";
        if (svg) b.appendChild(svg);
        b.appendChild(document.createTextNode(" " + ag.brandName));
      }
    });
    // Portrait tag
    const ptag = document.querySelector(".portrait-tag");
    if (ptag && ag.portraitTag) ptag.textContent = ag.portraitTag;
    // Scroll cue
    const scue = document.querySelector(".scroll-cue");
    if (scue && ag.scrollCue) scue.innerHTML = `<span class="bar"></span> ${ag.scrollCue}`;
    // Footer
    const footBrand = document.querySelector("footer .brand");
    if (footBrand && ag.footerCopyright) {
      const yearEl = footBrand.querySelector("#year");
      footBrand.textContent = ag.footerCopyright + " ";
      if (yearEl) footBrand.appendChild(yearEl);
      else { const y = document.createElement("span"); y.id = "year"; y.textContent = new Date().getFullYear(); footBrand.appendChild(y); }
    }
    const footText = document.querySelector("footer .foot-row span:last-child");
    if (footText && ag.footerText) footText.textContent = ag.footerText;
    // Resume link
    if (navResume && ag.resumeFile) navResume.href = ag.resumeFile;
    if (navResume && ag.resumeText) navResume.textContent = ag.resumeText;
    // Say hello
    const helloLink = document.querySelector(".nav-hello");
    if (helloLink) {
      if (ag.sayHelloText) helloLink.textContent = ag.sayHelloText;
      if (ag.sayHelloLink) helloLink.href = ag.sayHelloLink;
    }
  }

  // Apply admin section headers
  const ash = getAdminData("sections");
  if (ash) {
    const sectionMap = { about:"#about", projects:"#work", certs:"#certs", experience:"#experience", digital:"#digital", education:"#education", contact:"#contact" };
    Object.keys(ash).forEach(k => {
      const sec = document.querySelector(sectionMap[k]);
      if (!sec) return;
      const numEl = sec.querySelector(".sec-num");
      const titleEl = sec.querySelector(".sec-title");
      const descEl = sec.querySelector(".sec-desc");
      if (numEl && ash[k].num) numEl.textContent = ash[k].num;
      if (titleEl && ash[k].title) titleEl.textContent = ash[k].title;
      if (descEl && ash[k].desc !== undefined) descEl.textContent = ash[k].desc;
    });
    // Contact eyebrow
    const contactEyebrow = document.querySelector("#contact .eyebrow");
    if (contactEyebrow && ash.contact) {
      contactEyebrow.innerHTML = `<span class="dot"></span> ${ash.contact.num}`;
    }
    const contactTitle = document.querySelector(".contact-title a");
    if (contactTitle && ash.contact && ash.contact.title) {
      contactTitle.innerHTML = ash.contact.title.replace("<br />", "<br>").replace("\n", "<br>");
    }
  }

  renderProjects();
  renderCerts();
  renderExperience();
  renderDigitalProjects();
  renderEducation();
  initCountUp();
  initTypewriter();
  initCarousel(
    "projTrack",
    "projPrev",
    "projNext",
    "projFill",
    "projCount",
    (getAdminData("projects") || DATA.projects).length,
  );
  initCarousel(
    "certTrack",
    "certPrev",
    "certNext",
    "certFill",
    "certCount",
    (getAdminData("certs") || DATA.certs).length,
  );
  initCarousel(
    "expTrack",
    "expPrev",
    "expNext",
    "expFill",
    "expCount",
    (getAdminData("experience") || DATA.experience).length,
  );
});