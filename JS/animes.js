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

// Fonction throttle pour optimiser les événements scroll
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

// Back-to-top button functionality
function initBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return; // Bouton n'existe pas
    
    // Afficher/Masquer le bouton en fonction du scroll
    const scrollThreshold = 100; // Afficher après 100px scrollé
    
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > scrollThreshold) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 100)); // Throttle à 100ms pour performance
    
    // Scroll fluide vers le haut au clic
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Optionnel: Focus sur bouton après scroll pour accessibilité
    backToTopBtn.addEventListener('click', function() {
        // Retard léger pour laisser le scroll se faire avant focus
        setTimeout(() => {
            document.querySelector('h1')?.focus();
        }, 600);
    });
}

// Initialiser le bouton back-to-top au chargement de la page
document.addEventListener('DOMContentLoaded', initBackToTopButton);