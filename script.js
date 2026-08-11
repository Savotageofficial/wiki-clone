const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Generic "not wired up" buttons ---------- */
document.querySelectorAll("[data-toast]").forEach(el => {
  el.addEventListener("click", event => {
    event.preventDefault();
    showToast(el.getAttribute("data-toast"));
  });
});

/* ---------- Print ---------- */
["printButton", "printButton2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", () => window.print());
});

/* ---------- Dark mode ---------- */
document.getElementById("themeButton").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "andalusia-dark-mode",
    document.body.classList.contains("dark") ? "1" : "0"
  );
});

if (localStorage.getItem("andalusia-dark-mode") === "1") {
  document.body.classList.add("dark");
}

/* ---------- Table of contents toggle (sidebar + inline) ---------- */
function setTocVisible(visible) {
  const toc = document.getElementById("tocBox");
  const inlineToggle = document.getElementById("tocToggleInline");
  toc.classList.toggle("collapsed", !visible);
  if (inlineToggle) {
    inlineToggle.textContent = visible ? "hide" : "show";
    inlineToggle.setAttribute("aria-expanded", String(visible));
  }
}

document.getElementById("toggleToc").addEventListener("click", () => {
  const toc = document.getElementById("tocBox");
  setTocVisible(toc.classList.contains("collapsed"));
});

const tocToggleInline = document.getElementById("tocToggleInline");
if (tocToggleInline) {
  tocToggleInline.addEventListener("click", () => {
    const toc = document.getElementById("tocBox");
    setTocVisible(toc.classList.contains("collapsed"));
  });
}

/* ---------- Page action tabs ---------- */
document.getElementById("readButton").addEventListener("click", () => {
  document.getElementById("top").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("editButton").addEventListener("click", () => {
  showToast("Editing is disabled in this local mockup.");
});

document.getElementById("historyButton").addEventListener("click", () => {
  showToast("No revision history exists in this local mockup.");
});

const permalinkButton = document.getElementById("permalinkButton");
if (permalinkButton) {
  permalinkButton.addEventListener("click", () => {
    showToast("Permanent link copied (mock): " + window.location.href.split("#")[0] + "#top");
  });
}

const citeButton = document.getElementById("citeButton");
if (citeButton) {
  citeButton.addEventListener("click", () => {
    showToast("Citation tools aren't available in this local mockup.");
  });
}

const moreLanguages = document.getElementById("moreLanguages");
if (moreLanguages) {
  moreLanguages.addEventListener("click", () => {
    showToast("Additional languages aren't available in this local mockup.");
  });
}

/* ---------- Watch star ---------- */
const watchButton = document.getElementById("watchButton");
if (watchButton) {
  watchButton.addEventListener("click", () => {
    const watching = watchButton.getAttribute("aria-pressed") === "true";
    watchButton.setAttribute("aria-pressed", String(!watching));
    watchButton.querySelector(".watch-label").textContent = watching ? "Watch" : "Unwatch";
    showToast(watching ? "Removed from your watchlist (mock)." : "Added to your watchlist (mock).");
  });
}

/* ---------- Header account buttons ---------- */
["donateButton", "loginButton", "createAccountButton"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("click", () => {
      showToast("Accounts and donations aren't available in this local mockup.");
    });
  }
});

/* ---------- Mobile sidebar ---------- */
document.getElementById("mobileMenu").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

document.querySelectorAll(".side-link, .toc a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
  });
});

/* ---------- Search ---------- */
document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();

  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) {
    showToast("Type something to search.");
    return;
  }

  const sections = [...document.querySelectorAll(".section")];
  const match = sections.find(section =>
    section.innerText.toLowerCase().includes(query)
  );

  if (!match) {
    showToast(`No result for "${query}".`);
    return;
  }

  match.scrollIntoView({ behavior: "smooth", block: "start" });
  match.style.outline = "2px solid #36c";
  setTimeout(() => match.style.outline = "", 1400);
});

/* ---------- Footer "last edited" timestamp ---------- */
const lastEdited = document.getElementById("lastEdited");
if (lastEdited) {
  const now = new Date();
  const formatted = now.toLocaleString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  lastEdited.textContent = `This page was last edited on ${formatted} (local mockup timestamp).`;
}
