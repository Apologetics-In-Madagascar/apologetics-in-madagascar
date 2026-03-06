
function renderArticlesList() {
    const list = document.getElementById('article-list');
    if (!list) return;

    fetch('/assets/data/articles.json')
        .then(res => res.json())
        .then(data => {
            list.innerHTML = data.map(art => `
                <article class="card">
                    <a href="/assets/pages/articles/article?id=${art.id}" data-link>
                        <img src="${art.thumbnail}" alt="Thumbnail">
                        <h2>${art.title}</h2>
                    </a>
                </article>
            `).join('');
        });
}

function renderDirectArticle(id) {
    const mainContainer = document.querySelector('main');

    fetch('/assets/data/articles.json')
        .then(res => res.json())
        .then(data => {
            const art = data.find(a => a.id == id);
            if (art) {
                fetch(art.content)
                    .then(r => r.text())
                    .then(html => {
                        // Inject the article content directly into the main site
                        mainContainer.innerHTML = html;
                        document.title = art.title;
                        window.scrollTo(0,0);
                    });
            }
        })
        .catch(err => console.error("Article Injection error:", err));
}  