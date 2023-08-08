window.addEventListener('load', function() {
    const header = document.querySelector('header');
    const circularWidget = document.querySelector('.circular-widget');
    const h1 = document.querySelector('h1');
    const buttonsContainer = document.querySelector('.button-container');

    header.style.opacity = 1;

    const transitionDuration = parseFloat(getComputedStyle(h1).transitionDuration) * 1000;

    setTimeout(() => {
        circularWidget.style.opacity = 1;
        h1.style.opacity = 1;
    }, 510);

    setTimeout(() => {
        buttonsContainer.style.opacity = 1;
        const diamondButtons = document.querySelectorAll('.diamond-button');
        const diamondContents = document.querySelectorAll('.diamond-content');
        diamondButtons.forEach(button => {
            button.style.opacity = 1;
        });
        diamondContents.forEach(content => {
            content.style.opacity = 1;
        });
    }, 510 + transitionDuration); // set fade-in time here
});