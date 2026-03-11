document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');

    function loadPage(path) {
        // 1. DIRECT ARTICLE/VIDEO LOGIC (Deep links with IDs)
        if (path.includes('?id=')) {
            const params = new URLSearchParams(path.split('?')[1]);
            const id = params.get('id');
            if (path.includes('article')) renderDirectArticle(id);
            else if (path.includes('video')) renderDirectVideo(id);
            return;
        }

        // 2. THE FLOOR-AWARE LOGIC
        // We force every path to be absolute from the root house folder
        let finalPath = path;
        if (!path.startsWith('/')) {
            finalPath = '/' + path;
        }

        fetch(finalPath)
            .then(res => {
                if (!res.ok) throw new Error("404");
                return res.text();
            })
            .then(html => {
                mainContainer.innerHTML = html;
                // Re-init lists if the container exists
                if (document.getElementById('article-list')) renderArticlesList();
                if (document.getElementById('video-list')) renderVideosList();
            })
            .catch((err) => {
                console.error("Router Error:", finalPath, err);
                mainContainer.innerHTML = `
                <div class="error-container">
                    <h2>Page non trouvée / Olana teo am-pamamoahana</h2>
                    <p><strong>MG:</strong> Raha misy olana, manasa anao hanavao (Refresh) ny pejy na hivoaka ary hiverina ato indray.</p>
                    <p><strong>EN:</strong> If you encounter an error, please refresh the page or restart your browser.</p>
                    <button onclick="location.reload()" class="btn">Actualiser / Refresh</button>
                </div>
    `           ;
            });
        }

    document.addEventListener('click', e => {
        const link = e.target.closest('a[data-link], a[href^="/"]');
        if (link) {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Push the history as a root-relative path
            const absoluteHref = href.startsWith('/') ? href : '/' + href;
            window.history.pushState({}, '', absoluteHref);
            
            loadPage(absoluteHref);
        }
    });

    window.addEventListener('popstate', () => {
        loadPage(location.pathname + location.search);
    });

    // Initial load
    loadPage(location.pathname + location.search);
});