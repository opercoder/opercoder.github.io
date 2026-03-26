async function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('post');
    
    if (!postFile) {
        document.getElementById('post-content').innerHTML = '<p>Статья не найдена</p>';
        return;
    }
    
    try {
        const response = await fetch(`articles/${postFile}`);
        const markdown = await response.text();
        
        // Конвертируем Markdown в HTML
        const html = marked.parse(markdown);
        document.getElementById('post-content').innerHTML = html;
        
        // Обновляем заголовок страницы
        const title = document.querySelector('h1')?.textContent || 'Статья';
        document.title = `${title} - Мой блог`;
        
        // Добавляем мета-теги для SEO
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            // Можно добавить описание из эксцерпта
        }
    } catch (error) {
        document.getElementById('post-content').innerHTML = '<p>❌ Ошибка загрузки статьи. Проверьте, существует ли файл.</p>';
        console.error('Error loading post:', error);
    }
}

loadPost();