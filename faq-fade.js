window.addEventListener('load', function() {
    const header = document.querySelector('header');
    const h1 = document.querySelector('h1');
    const table = document.querySelector('table');

    header.style.opacity = 1;

    setTimeout(() => {
        h1.style.opacity = 1;
        table.style.opacity = 1;
    }, 540); // fade-in time here
});