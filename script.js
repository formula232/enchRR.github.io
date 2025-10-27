// Основная функциональность для GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация фильтрации
    initFilters();
    
    // Инициализация поиска
    initSearch();
    
    // Инициализация анимаций
    initAnimations();
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
});

// Фильтрация по редкости
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Обновляем активную кнопку
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем/скрываем карточки
            document.querySelectorAll('.enchantment-card').forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Показываем/скрываем секции
            document.querySelectorAll('.rarity-section').forEach(section => {
                if (filter === 'all') {
                    section.style.display = 'block';
                } else if (section.id === filter) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
}

// Поиск по названиям
function initSearch() {
    const searchBox = document.querySelector('.search-box');
    
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        document.querySelectorAll('.enchantment-card').forEach(card => {
            const name = card.dataset.name;
            const displayName = card.querySelector('.enchantment-name').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || displayName.includes(searchTerm)) {
                card.style.display = 'block';
                card.closest('.rarity-section').style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Скрываем пустые секции
        document.querySelectorAll('.rarity-section').forEach(section => {
            const visibleCards = section.querySelectorAll('.enchantment-card[style="display: block"]');
            if (visibleCards.length === 0) {
                section.style.display = 'none';
            }
        });
    });
}

// Анимации появления
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к карточкам
    document.querySelectorAll('.enchantment-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Плавная прокрутка для якорей
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.log('Произошла ошибка:', e.error);
});

// Сохранение состояния фильтров в URL
function updateURLFilter(filter) {
    const url = new URL(window.location);
    url.searchParams.set('filter', filter);
    window.history.replaceState({}, '', url);
}

// Восстановление состояния из URL
function restoreFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    
    if (filter) {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
}

// Инициализация при загрузке
restoreFromURL();
