window.addEventListener('load', function() {
    const header = document.querySelector('header');
    const circularWidget = document.querySelector('.circular-widget');
    const h1 = document.querySelector('h1');
    const actionButtons = document.querySelectorAll('.matrix-button.matrix-button-shadow');
    const informationIcon = document.querySelector('.information-icon');
    const networkAlert = document.querySelector('#networkAlert');

    header.style.opacity = 1;

    const transitionDuration = parseFloat(getComputedStyle(h1).transitionDuration) * 1000;

    setTimeout(() => {
        circularWidget.style.opacity = 1;
        h1.style.opacity = 1;
    }, 510);

    setTimeout(() => {
        actionButtons.forEach(button => {
            button.style.opacity = 1;
        });
        informationIcon.style.opacity = 1;
        networkAlert.style.opacity = 1; // Added this line
    }, 510 + transitionDuration);
});
