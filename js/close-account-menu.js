
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded.');

    // Identify the popup container and other relevant elements
    const popupContainer = document.querySelector('#elementor-popup-modal-2329'); // Replace with the correct popup class
    const closeTrigger = document.querySelector('.close-popup-trigger'); // Button to explicitly close the popup

    if (!popupContainer) {
        console.error('Popup container not found. Check your class name.');
        return;
    }

    // Function to close the popup
    const closePopup = () => {
        console.log('Closing popup...');
        popupContainer.style.display = 'none'; // Hides the popup
    };

    // Close popup when clicking the close button
    if (closeTrigger) {
        closeTrigger.addEventListener('click', () => {
            console.log('Close trigger clicked.');
            closePopup();
        });
    } else {
        console.warn('Close trigger element not found.');
    }

    // Close popup when clicking outside it
    document.addEventListener('click', (event) => {
        const isInsidePopup = popupContainer.contains(event.target);
        if (!isInsidePopup) {
            console.log('Clicked outside popup, closing it...');
            closePopup();
        }
    });
});

