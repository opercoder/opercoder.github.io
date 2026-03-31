// Папка со статьями
const ARTICLES_PATH = 'articles/';

// Список статей с тегами
const articles = [
    { 
        file: 'screen_tmux.md', 
        title: 'Screen && Tmux', 
        date: '2026-03-26', 
        excerpt: 'Основные команды',
        tags: ['devops', 'linux']
    },
    { 
        file: 'markdown.md', 
        title: 'Markdown', 
        date: '2026-03-27', 
        excerpt: 'Синтаксис Markdown',
        tags: ['markdown']
    },
    { 
        file: 'smev4.md', 
        title: 'СМЭВ4', 
        date: '2026-03-31', 
        excerpt: 'Подключение к СМЭВ4',
        tags: ['smev4']
    }
];

// Глобальные переменные
let currentArticles = [];
let currentTag = 'all';
let currentSearchTerm = '';

// Экранирование спецсимволов для regex
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Подсветка текста
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Получение всех уникальных тегов
function getAllTags() {
    const tagsSet = new Set();
    articles.forEach(article => {
        if (article.tags && Array.isArray(article.tags)) {
            article.tags.forEach(tag => tagsSet.add(tag));
        }
    });
    return Array.from(tagsSet).sort();
}

// Отображение тегов в фильтре
function renderTags() {
    const allTags = getAllTags();
    const tagsContainer = document.getElementById('tags-container');
    if (!tagsContainer) return;
    
    let tagsHtml = '<div class="tag active" data-tag="all">📌 Все статьи</div>';
    
    // Добавляем теги с счетчиками
    allTags.forEach(tag => {
        const count = articles.filter(article => article.tags && article.tags.includes(tag)).length;
        tagsHtml += `<div class="tag" data-tag="${tag}">🏷️ ${tag} (${count})</div>`;
    });
    
    tagsContainer.innerHTML = tagsHtml;
    
    // Добавляем обработчики кликов
    document.querySelectorAll('.tag').forEach(tagElement => {
        tagElement.addEventListener('click', () => {
            const tag = tagElement.dataset.tag;
            
            // Обновляем активный тег
            document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            tagElement.classList.add('active');
            
            // Обновляем текущий тег и применяем фильтры
            currentTag = tag;
            applyFilters();
        });
    });
}

// Фильтрация по тегу
function filterByTag(article, tag) {
    if (tag === 'all') return true;
    return article.tags && article.tags.includes(tag);
}

// Поиск по тексту
function searchInArticle(article, searchTerm) {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    const titleMatch = article.title.toLowerCase().includes(term);
    const excerptMatch = article.excerpt.toLowerCase().includes(term);
    const dateMatch = formatDate(article.date).toLowerCase().includes(term);
    const tagsMatch = article.tags && article.tags.some(tag => tag.toLowerCase().includes(term));
    
    return titleMatch || excerptMatch || dateMatch || tagsMatch;
}

// Применение всех фильтров
function applyFilters() {
    let visibleCount = 0;
    
    currentArticles.forEach((article, index) => {
        const card = document.getElementById(`post-card-${index}`);
        if (!card) return;
        
        // Проверяем соответствие тегу и поиску
        const matchesTag = filterByTag(article, currentTag);
        const matchesSearch = searchInArticle(article, currentSearchTerm);
        
        if (matchesTag && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
            
            // Обновляем содержимое с подсветкой, если есть поиск
            if (currentSearchTerm) {
                const titleElement = card.querySelector('.post-title');
                const excerptElement = card.querySelector('.post-excerpt');
                
                if (titleElement) {
                    titleElement.innerHTML = highlightText(article.title, currentSearchTerm);
                }
                if (excerptElement) {
                    excerptElement.innerHTML = highlightText(article.excerpt, currentSearchTerm);
                }
            } else {
                // Восстанавливаем оригинальный текст
                const titleElement = card.querySelector('.post-title');
                const excerptElement = card.querySelector('.post-excerpt');
                
                if (titleElement) {
                    titleElement.innerHTML = article.title;
                }
                if (excerptElement) {
                    excerptElement.innerHTML = article.excerpt;
                }
            }
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Обновляем статистику
    updateStats(visibleCount);
}

// Обновление статистики
function updateStats(visibleCount) {
    const statsElement = document.getElementById('search-stats');
    if (!statsElement) return;
    
    const totalCount = currentArticles.length;
    
    if (visibleCount === 0) {
        statsElement.innerHTML = '😕 Ничего не найдено. Попробуйте изменить запрос или выбрать другой тег.';
        statsElement.style.color = '#f44336';
    } else {
        let message = `📄 Найдено статей: ${visibleCount} из ${totalCount}`;
        
        if (currentSearchTerm) {
            message += ` по запросу "${currentSearchTerm}"`;
        }
        if (currentTag !== 'all') {
            message += ` в теге "${currentTag}"`;
        }
        
        statsElement.innerHTML = message;
        statsElement.style.color = '#666';
    }
}

// Обработчик поиска
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();
        
        // Показываем/скрываем кнопку очистки
        if (clearButton) {
            clearButton.style.display = currentSearchTerm ? 'block' : 'none';
        }
        
        applyFilters();
    });
    
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchTerm = '';
            clearButton.style.display = 'none';
            applyFilters();
            searchInput.focus();
        });
    }
}

// Загрузка и отображение списка статей
async function loadPostsList() {
    const container = document.getElementById('posts-list');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align: center; padding: 2rem;">⏳ Загрузка статей...</div>';
    
    let postsHtml = '';
    
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        
        // Генерируем HTML для тегов
        const tagsHtml = article.tags && article.tags.length > 0 
            ? `<div class="post-tags">${article.tags.map(tag => `<span class="post-tag" data-tag="${tag}">#${tag}</span>`).join('')}</div>`
            : '';
        
        postsHtml += `
            <div class="post-card" id="post-card-${i}">
                <h2>
                    <a href="post.html?post=${article.file}" class="post-title">${article.title}</a>
                </h2>
                <div class="post-meta">
                    <span>📅 ${formatDate(article.date)}</span>
                    ${tagsHtml}
                </div>
                <div class="post-excerpt">${article.excerpt}</div>
                <a href="post.html?post=${article.file}" class="read-more">Читать статью →</a>
            </div>
        `;
    }
    
    container.innerHTML = postsHtml;
    
    // Сохраняем ссылки на текущие статьи
    currentArticles = [...articles];
    
    // Добавляем обработчики для тегов внутри карточек
    document.querySelectorAll('.post-tag').forEach(tagElement => {
        tagElement.addEventListener('click', (e) => {
            e.preventDefault();
            const tag = tagElement.dataset.tag;
            
            // Находим и активируем соответствующий тег в фильтре
            const filterTag = document.querySelector(`.tag[data-tag="${tag}"]`);
            if (filterTag) {
                filterTag.click();
            }
        });
    });
    
    // Настраиваем поиск
    setupSearch();
    
    // Отображаем теги
    renderTags();
    
    // Применяем начальные фильтры
    applyFilters();
}

// Запуск
loadPostsList();