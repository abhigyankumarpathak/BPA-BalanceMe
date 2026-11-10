// Shared behaviour for all navigation prototypes.
// Each option page sets <body data-mode="pages|scroll" data-option="N">.

const SECTION_COUNT = 5;

const OPTIONS = [
  { file: "option-1-top-bar.html", name: "Top Bar" },
  { file: "option-2-sidebar.html", name: "Sidebar" },
  { file: "option-3-scroll.html", name: "One-Page Scroll" },
  { file: "option-4-bottom-tabs.html", name: "Bottom Tabs" },
  { file: "option-5-overlay.html", name: "Full-Screen Menu" },
];

const body = document.body;
const mode = body.dataset.mode || "pages";

// Build placeholder sections
const content = document.getElementById("content");
for (let i = 1; i <= SECTION_COUNT; i++) {
  const section = document.createElement("section");
  section.className = "page";
  section.id = "s" + i;
  section.innerHTML = `
    <h1>Section ${i}</h1>
    <p class="lead">Placeholder content for section ${i}.</p>
    <div class="ph ph-hero">Hero / banner</div>
    <div class="ph-grid">
      <div class="ph ph-card">Card</div>
      <div class="ph ph-card">Card</div>
      <div class="ph ph-card">Card</div>
    </div>
    <div class="ph-line"></div><div class="ph-line"></div><div class="ph-line"></div>
    <div class="ph-line"></div><div class="ph-line"></div>`;
  content.appendChild(section);
}

const navLinks = document.querySelectorAll("[data-nav]");

function setActive(id) {
  navLinks.forEach((a) => {
    a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
  });
  if (mode === "pages") {
    document.querySelectorAll(".page").forEach((p) => {
      p.classList.toggle("is-active", p.id === id);
    });
  }
}

if (mode === "pages") {
  // Hash routing: each section acts like its own page
  const route = () => {
    const id = location.hash.slice(1) || "s1";
    setActive(id);
    window.scrollTo(0, 0);
  };
  window.addEventListener("hashchange", route);
  route();
} else {
  // Scroll spy: highlight whichever section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  document.querySelectorAll(".page").forEach((p) => observer.observe(p));
  setActive("s1");
}

// Menu toggles (hamburger, overlay, sidebar drawer)
document.querySelectorAll("[data-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", open);
  });
});
navLinks.forEach((a) => a.addEventListener("click", () => body.classList.remove("nav-open")));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") body.classList.remove("nav-open");
});

// Prototype switcher (bottom-left pill)
const current = Number(body.dataset.option);
if (current) {
  const prev = OPTIONS[(current - 2 + OPTIONS.length) % OPTIONS.length];
  const next = OPTIONS[current % OPTIONS.length];
  const switcher = document.createElement("div");
  switcher.className = "demo-switcher";
  switcher.innerHTML = `
    <a href="${prev.file}" title="${prev.name}">&larr;</a>
    <span>${current}/${OPTIONS.length}: ${OPTIONS[current - 1].name}</span>
    <a href="${next.file}" title="${next.name}">&rarr;</a>
    <a href="index.html" title="All options">&#9776;</a>`;
  body.appendChild(switcher);
}
