// Observador para detectar elementos entrando na viewport e adicionar animações
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.hide-on-scroll').forEach((el) => observer.observe(el));

// Efeito parallax - move elementos com velocidades diferentes durante o scroll
document.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Criação e controle do cursor personalizado
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Controle da animação do logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.img-flutuante');
    
    function restartAnimation() {
        if (logo) {
            logo.classList.remove('animate');
            void logo.offsetWidth;
            logo.classList.add('animate');
        }
    }

    restartAnimation();

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            restartAnimation();
        }
    });
});