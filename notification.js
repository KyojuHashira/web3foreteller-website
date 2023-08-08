const diamondButtons = document.querySelectorAll('.diamond-button');
const notificationContainer = document.querySelector('.notification-container');
const notificationText = document.querySelector('.notification-text');
let notificationTimeout; // timer variable here

diamondButtons.forEach(button => {
    button.addEventListener('click', () => {
        showNotification();
    });
});

function showNotification() {
    notificationText.style.border = '2px solid #94a099'; // add a colored frame
    notificationContainer.classList.add('show-notification');

    // cancel previous timer if exists
    clearTimeout(notificationTimeout);

    // set new timer
    notificationTimeout = setTimeout(() => {
        hideNotification();
    }, 5000); // time to show notification (5000 ms = 5 secs)
}

function hideNotification() {
    notificationText.style.border = 'none'; // remove the frame before fading out
    notificationContainer.classList.remove('show-notification');
}