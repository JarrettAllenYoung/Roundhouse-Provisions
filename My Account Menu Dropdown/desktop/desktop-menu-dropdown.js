document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.querySelector('.my-account-dropdown-toggle');
    const dropdownMenu = document.querySelector('.my-account-dropdown-menu');
    const userNameElement = document.querySelector('.ghm-user-first-name');

    // Fetch user data from your API
    fetch('/api/user')
        .then(response => response.json())
        .then(data => {
            if (data.firstName) {
                userNameElement.textContent = data.firstName;
            } else {
                userNameElement.textContent = 'Guest'; // Default fallback if no name
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userNameElement.textContent = 'Guest'; // Default fallback in case of error
        });

    // Dropdown functionality
    dropdownToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
});
