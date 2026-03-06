// assets/js/main.js
// Dynamically load common HTML components (header, nav, footer) into the page
document.addEventListener("DOMContentLoaded", () => {
  const rootPath = getRootPath();

  loadInclude("#site-header", `${rootPath}/includes/header.html`);
  loadInclude("#site-nav", `${rootPath}/includes/nav.html`);
  loadInclude("#site-footer", `${rootPath}/includes/footer.html`);
});

function loadInclude(selector, filePath) {
  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${filePath} (${res.status})`);
      return res.text();
    })
    .then(html => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = html;
    })
    .catch(err => console.error(err));
}

// compute how many "../" are needed to reach repo root
function getRootPath() {
  // location.pathname like "/pages/articles/articles_index.html" or "/accueil_index.html"
  const segments = location.pathname.split("/"); // first item is "" because pathname starts with "/"
  // remove empty leading and final file element
  // want: for "/accueil_index.html" -> depth = 0 -> ""
  // for "/pages/articles/articles_index.html" -> depth = 2 -> "../../"
  const depth = Math.max(0, segments.length - 2);
  return "../".repeat(depth);
}
