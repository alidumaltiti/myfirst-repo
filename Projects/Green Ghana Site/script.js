
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
 
    // Function to apply the saved theme
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            // Ensure themeToggle exists before trying to access its properties
            if (themeToggle && savedTheme === 'dark-mode') {
                themeToggle.checked = true;
            }
        } else {
            // Default to light mode
            body.classList.add('light-mode');
            // Ensure themeToggle exists and is unchecked for light mode
            if (themeToggle) {
                themeToggle.checked = false;
            }
        }
    };
 
    // Function to toggle the theme
    const toggleTheme = () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    };
 
    // Event listener for the theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }
 
    // Apply the theme on initial load
    applyTheme();
});