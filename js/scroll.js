<<<<<<< HEAD
function scrollToElement(elementId, event) {
    event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
=======
function scrollToElement(elementId, event) {
    event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
>>>>>>> 72251ae6e9797e36dfed64a53ab4b3baf00cd72b
}