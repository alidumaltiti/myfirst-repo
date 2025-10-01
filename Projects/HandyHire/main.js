// Green Skills Ghana - Main JavaScript File

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCarousel();
    initializeCounters();
    initializeScrollEffects();
    initializeNavigation();
});

// Animation Initialization
function initializeAnimations() {
    // Stagger fade-in animations for elements
    const staggerElements = document.querySelectorAll('.stagger-fade');
    
    anime({
        targets: staggerElements,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutQuart'
    });

    // Hero text animation with split letters
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        // Split text into spans for letter-by-letter animation
        const textWrapper = heroTitle;
        textWrapper.innerHTML = textWrapper.innerHTML.replace(/\S/g, "<span class='letter'>$&</span>");
        
        anime({
            targets: heroTitle.querySelectorAll('.letter'),
            opacity: [0, 1],
            translateY: [50, 0],
            rotateZ: [10, 0],
            delay: anime.stagger(50),
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    // Skill cards hover animations
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                translateY: -8,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });

        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Initialize Success Stories Carousel
function initializeCarousel() {
    const splide = document.getElementById('success-stories');
    if (splide) {
        new Splide('#success-stories', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                640: {
                    perPage: 1,
                }
            }
        }).mount();
    }
}

// Animated Counters for Statistics
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    anime({
        targets: { count: 0 },
        count: target,
        duration: 2000,
        easing: 'easeOutQuart',
        update: function(anim) {
            const value = Math.floor(anim.animatables[0].target.count);
            element.textContent = value.toLocaleString();
        }
    });
}

// Scroll Effects and Parallax
function initializeScrollEffects() {
    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 248, 220, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 248, 220, 0.9)';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.stagger-fade');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Navigation and Smooth Scrolling
function initializeNavigation() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Local Storage Functions for User Progress
function saveUserProgress(data) {
    const userProgress = getUserProgress();
    const updatedProgress = { ...userProgress, ...data };
    localStorage.setItem('greenSkillsGhana', JSON.stringify(updatedProgress));
}

function getUserProgress() {
    const stored = localStorage.getItem('greenSkillsGhana');
    return stored ? JSON.parse(stored) : {};
}

function updateSkillProgress(skill, progress) {
    const userProgress = getUserProgress();
    if (!userProgress.skills) userProgress.skills = {};
    userProgress.skills[skill] = progress;
    saveUserProgress(userProgress);
}

// Achievement System
const achievements = {
    firstAssessment: {
        name: 'First Steps',
        description: 'Completed your first skills assessment',
        icon: '🌱',
        unlocked: false
    },
    greenEnthusiast: {
        name: 'Green Enthusiast',
        description: 'Explored all 5 skill categories',
        icon: '🌿',
        unlocked: false
    },
    carbonAware: {
        name: 'Carbon Conscious',
        description: 'Calculated your carbon footprint',
        icon: '🌍',
        unlocked: false
    }
};

function unlockAchievement(achievementId) {
    if (achievements[achievementId] && !achievements[achievementId].unlocked) {
        achievements[achievementId].unlocked = true;
        showNotification(`Achievement Unlocked: ${achievements[achievementId].name}!`, 'success');
        
        // Save to localStorage
        const userProgress = getUserProgress();
        if (!userProgress.achievements) userProgress.achievements = [];
        userProgress.achievements.push(achievementId);
        saveUserProgress(userProgress);
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Progress rings animation
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    progressRings.forEach(ring => {
        const radius = ring.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        ring.style.strokeDasharray = `${circumference} ${circumference}`;
        ring.style.strokeDashoffset = circumference;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress') || 0;
                    const offset = circumference - (progress / 100) * circumference;
                    
                    anime({
                        targets: entry.target,
                        strokeDashoffset: offset,
                        duration: 1500,
                        easing: 'easeOutQuart'
                    });
                }
            });
        });
        
        observer.observe(ring);
    });
}

// Form Validation and Interaction
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Loading States
function showLoading(element) {
    const originalText = element.textContent;
    element.textContent = 'Loading...';
    element.disabled = true;
    element.dataset.originalText = originalText;
}

function hideLoading(element) {
    element.textContent = element.dataset.originalText || element.textContent;
    element.disabled = false;
}

// Responsive Design Helpers
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveElements();
    initializeLazyLoading();
    
    // Add click handlers for buttons that don't have specific pages yet
    const getStartedButtons = document.querySelectorAll('button');
    getStartedButtons.forEach(button => {
        if (!button.onclick && button.textContent.includes('Get Started')) {
            button.addEventListener('click', function() {
                showNotification('Assessment feature coming soon! Redirecting to quiz...', 'success');
                setTimeout(() => {
                    window.location.href = 'assessment.html';
                }, 1500);
            });
        }
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Optionally show user-friendly error message
});

// Export functions for use in other pages
window.GreenSkillsGhana = {
    showNotification,
    saveUserProgress,
    getUserProgress,
    updateSkillProgress,
    unlockAchievement,
    validateForm,
    showLoading,
    hideLoading,
    isMobile,
    isTablet
};