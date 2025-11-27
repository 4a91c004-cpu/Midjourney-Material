// mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle &&
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

// dropdown behavior
document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
  const menu = btn.nextElementSibling;
  btn.addEventListener("click", (e) => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    menu.classList.toggle("open");
  });
});

// close dropdown when clicking outside
document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
    const menu = btn.nextElementSibling;
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    }
  });
});

// Tab navigation: show/hide sections when clicking top nav links
const tabLinks = document.querySelectorAll('.nav-links a[role="menuitem"]');
const contentWraps = document.querySelectorAll(".content-wrap");

function showSection(id) {
  // hide all
  contentWraps.forEach((wrap) => wrap.classList.remove("is-visible"));
  const target = document.getElementById(id);
  if (!target) return;
  // target is the section; it is wrapped by .content-wrap
  const wrap = target.closest(".content-wrap");
  if (wrap) wrap.classList.add("is-visible");
  // update active link
  tabLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`)
  );
  // scroll into view (CSS handles offset via scroll-margin-top)
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

tabLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const href = a.getAttribute("href") || "";
    const id = href.replace(/^#/, "");
    if (!id) return;
    showSection(id);
    // close mobile nav if open
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// On load, show section based on hash or default to 'glass'
window.addEventListener("DOMContentLoaded", () => {
  const hash = (location.hash || "#glass").replace("#", "");
  showSection(hash);
});
