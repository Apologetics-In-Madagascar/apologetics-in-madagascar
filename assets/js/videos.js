
function renderVideosList() {
    const list = document.getElementById('video-list');
    if (!list) return;

    fetch('/assets/data/videos.json')
        .then(res => res.json())
        .then(data => {
            list.innerHTML = data.map(vid => `
                <div class="video-card">
                    <a href="/assets/pages/videos/video?id=${vid.id}" data-link>
                        <img src="${vid.thumbnail}" alt="Thumbnail">
                        <h2>${vid.title}</h2>
                    </a>
                </div>
            `).join('');
        });
}

function renderDirectVideo(id) {
    const mainContainer = document.querySelector('main');

    fetch('/assets/data/videos.json')
        .then(res => res.json())
        .then(data => {
            const vid = data.find(v => v.id == id);
            if (vid) {
                fetch(vid.content)
                    .then(r => r.text())
                    .then(html => {
                        mainContainer.innerHTML = html;
                        document.title = vid.title;
                        window.scrollTo(0,0);
                    });
            }
        })
        .catch(err => console.error("Video injection error:", err));
}