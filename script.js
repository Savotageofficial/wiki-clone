const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.getElementById("printButton").addEventListener("click", () => {
  window.print();
});

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

document.getElementById("toggleToc").addEventListener("click", () => {
  const toc = document.querySelector(".toc");
  toc.hidden = !toc.hidden;
});

document.getElementById("editButton").addEventListener("click", () => {
  showToast("Editing is disabled in this local mockup.");
});

document.getElementById("historyButton").addEventListener("click", () => {
  showToast("No revision history exists in this local mockup.");
});

document.getElementById("mobileMenu").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

document.querySelectorAll(".side-link, .toc a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
  });
});

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
