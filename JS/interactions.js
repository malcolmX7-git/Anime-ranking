// ============================================
// Interactions pour les pages d'anime
// Utilisé par les 55 pages de personnages
// ============================================

// 1. Menu burger
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu-links');

if (burger && menu) {
    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Fermer le menu au clic sur un lien
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
    
    // Fermer au clic en dehors du menu
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
}

// 2. Lazy loading avec Intersection Observer
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// 3. Back to top button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    // Throttle function pour éviter les appels répétés
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            if (!inThrottle) {
                func.apply(this);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Afficher/cacher le bouton au scroll
    const handleScroll = throttle(() => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 200);
    
    window.addEventListener('scroll', handleScroll);
    
    // Au clic, remonter en haut
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 4. Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 5. Effet hover sur les cartes (anime.html)
const cards = document.querySelectorAll('.card');
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (!isMobile) {
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// 6. Effet de transition au chargement des images
const allImages = document.querySelectorAll('img');
allImages.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// 7. Animation des sections au scroll
if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('section, article');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// 8. Gestion des touches clavier
document.addEventListener('keydown', (e) => {
    // Échap pour fermer le menu
    if (e.key === 'Escape' && menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        if (burger) burger.classList.remove('toggle');
    }
});

// 9. Focus visible pour l'accessibilité
document.addEventListener('keydown', () => {
    document.body.classList.add('keyboard-nav');
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// 10. Gestion des états des liens actifs
function updateActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href.replace('../', ''))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Appeler à la fin du chargement
window.addEventListener('load', updateActiveLink);
