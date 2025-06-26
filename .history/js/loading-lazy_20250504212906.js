document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todas as imagens que precisam de lazy loading
    const images = document.querySelectorAll('img[data-src]');
    
    // Configura o Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Pré-carrega a imagem
                const preloadImage = new Image();
                preloadImage.src = img.dataset.src;
                
                preloadImage.onload = () => {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                };
                
                // Para de observar depois de carregar
                observer.unobserve(img);
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '50px 0px', // carrega quando estiver 50px antes de aparecer
        threshold: 0.1 // começa a carregar quando 10% da imagem estiver visível
    });
    
    // Aplica o observer em todas as imagens
    images.forEach(img => {
        // Adiciona loading lazy nativo como fallback
        img.setAttribute('loading', 'lazy');
        
        // Aplica placeholder/blur enquanto carrega
        img.style.filter = 'blur(5px)';
        img.style.transition = 'filter 0.3s ease-out';
        
        imageObserver.observe(img);
    });
});

  