// This file contains JavaScript functionality for the clothing advertising webpage.
// It includes basic interactivity such as an image slider and form validation.

document.addEventListener('DOMContentLoaded', function() {
    // Image slider functionality
    let currentIndex = 0;
    const images = document.querySelectorAll('.slider img');
    const totalImages = images.length;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    document.querySelector('.next').addEventListener('click', nextImage);
    document.querySelector('.prev').addEventListener('click', prevImage);

    // Show the first image initially
    showImage(currentIndex);

    // Form validation functionality
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        const nameInput = document.querySelector('#name');
        if (nameInput.value.trim() === '') {
            alert('Please enter your name.');
            event.preventDefault();
        }
    });
});