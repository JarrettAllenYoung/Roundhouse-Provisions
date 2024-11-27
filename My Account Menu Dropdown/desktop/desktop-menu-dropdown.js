
document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.querySelector('.my-account-dropdown-toggle');
    const dropdownMenu = document.querySelector('.my-account-dropdown-menu');

    dropdownToggle.addEventListener('click', () => {
        // Toggle the 'active' class on the dropdown menu
        dropdownMenu.classList.toggle('active');
    });

    // Close the dropdown if clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
});
