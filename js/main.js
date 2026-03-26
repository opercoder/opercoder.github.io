// Папка со статьями
const ARTICLES_PATH = 'articles/';

// Список статей (добавляйте новые статьи сюда)
const articles = [
    { file: 'hello-world.md', title: 'Привет, мир!', date: '2025-01-15', excerpt: 'Моя первая статья в блоге...' },
    { file: 'my-second-post.md', title: 'Моя вторая статья', date: '2025-01-20', excerpt: 'Продолжаю вести блог...' }
];

// Загрузка и отображение списка статей
async function loadPostsList() {
    const container = document.getElementById('posts-list');
    if (!container) return;
    
    container.innerHTML = '<p>Загрузка статей...</p>';
    
    let postsHtml = '';
    
    for (const article of articles) {
        postsHtml += `
            <div class="post-card">
                <h2><a href="post.html?post=${article.file}">${article.title}</a></h2>
                <div class="post-meta">📅 ${formatDate(article.date)}</div>
                <div class="post-excerpt">${article.excerpt}</div>
                <a href="post.html?post=${article.file}" class="read-more">Читать →</a>
            </div>
        `;
    }
    
    container.innerHTML = postsHtml || '<p>Статей пока нет</p>';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Запуск
loadPostsList();