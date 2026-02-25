// Cache sélecteurs DOM pour éviter les répétitions
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu-links');

// Vérifier que les éléments existent avant d'ajouter event listener
if (burger && menu) {
    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Intersection Observer pour améliorations futures de lazy loading
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// Optimisation pour anime.html: lazy-load des cartes après le premier écran
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    if (cards.length > 15) { // Si baucoup de cartes sur anime.html
        let cardCount = 0;
        cards.forEach((card, index) => {
            if (index >= 12) { // Masquer les cartes après les 12 premières
                card.style.display = 'none';
            }
        });
        
        // Créer conteneur de pagination s'il n'existe pas
        const main = document.querySelector('main');
        if (main && !document.querySelector('.pagination-container')) {
            const paginationDiv = document.createElement('div');
            paginationDiv.className = 'pagination-container';
            paginationDiv.style.cssText = 'text-align: center; padding: 2rem; margin: 2rem 0;';
            
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.textContent = 'Charger plus d\'animes';
            loadMoreBtn.style.cssText = 'padding: 1rem 2rem; font-size: 1.1rem; background: rgba(138, 155, 252, 0.753); border: none; border-radius: 1.5rem; cursor: pointer; font-weight: bold;';
            loadMoreBtn.addEventListener('click', () => {
                cards.forEach((card, index) => {
                    if (index >= 12) {
                        card.style.display = 'flex';
                    }
                });
                loadMoreBtn.style.display = 'none';
            });
            paginationDiv.appendChild(loadMoreBtn);
            main.appendChild(paginationDiv);
        }
    }
});
