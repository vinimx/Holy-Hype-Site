document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const menu = document.getElementById('menu');
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        if (!isMenuOpen) {
            menu.classList.remove('-right-full');
            menu.classList.add('right-0');
        } else {
            menu.classList.remove('right-0');
            menu.classList.add('-right-full');
        }
        isMenuOpen = !isMenuOpen;
    });

    closeBtn.addEventListener('click', () => {
        menu.classList.remove('right-0');
        menu.classList.add('-right-full');
        isMenuOpen = false;
    });
    
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                menu.classList.remove('right-0');
                menu.classList.add('-right-full');
                isMenuOpen = false;
            }
        });
    });
});