// =================================================================================
// GLOBAL SCRIPT (script.js)
// =================================================================================
// This script now includes the Firebase Authentication state listener, which is
// crucial for managing user sessions across the entire site.

// Import and initialize the Firebase Auth state listener
import { initializeAuthStateListener } from './auth.js';
initializeAuthStateListener();

// --- Existing code from script.js ---
document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
 
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            if (themeToggle && savedTheme === 'dark-mode') {
                themeToggle.checked = true;
            }
        } else {
            body.classList.add('light-mode');
            if (themeToggle) {
                themeToggle.checked = false;
            }
        }
    };
 
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
 
    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }
 
    applyTheme();

    // Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = hamburgerBtn ? hamburgerBtn.querySelector('i') : null;

    if(hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if(hamburgerIcon) {
                hamburgerIcon.classList.toggle('fa-bars');
                hamburgerIcon.classList.toggle('fa-times');
            }
        });
    }

    // Staggered fade-in animation
    const fadeElements = document.querySelectorAll('.stagger-fade');
    if(typeof anime !== 'undefined') {
        anime({
            targets: fadeElements,
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(100, { start: 200 }),
            easing: 'easeOutExpo',
            duration: 1200,
        });

        // Counting animation
        const countElements = document.querySelectorAll('[data-count]');
        countElements.forEach(el => {
            const target = parseFloat(el.getAttribute('data-count'));
            anime({
                targets: el,
                innerHTML: [0, target],
                round: target % 1 !== 0 ? 100 : 1,
                easing: 'easeOutCirc',
                duration: 2500,
                delay: 500,
            });
        });
    }

    // Initialize Splide carousel
    if (document.getElementById('success-stories') && typeof Splide !== 'undefined') {
        new Splide('#success-stories', {
            type: 'loop',
            perPage: 2,
            perMove: 1,
            gap: '2rem',
            pagination: false,
            arrows: true,
            breakpoints: {
                768: {
                    perPage: 1,
                },
            },
        }).mount();
    }

    // NEW: Scroll listener for navigation bar
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
});