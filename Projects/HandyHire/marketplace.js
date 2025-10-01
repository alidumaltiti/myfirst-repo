// Tamale TVET Marketplace - Main JavaScript File

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCounters();
    initializeServiceCategories();
    initializeSearch();
    initializeProviderGrid();
    initializeScrollEffects();
    initializeNavigation();
});

// Sample provider data
const providersData = [
    {
        id: 1,
        name: "Kwame Adu",
        photo: "https://kimi-web-img.moonshot.cn/img/cdn.ghanaweb.com/39a2e0e00dfddbbf34c692e14303eb0a7a80631b.jpg",
        category: "carpentry",
        services: ["Custom Furniture", "Door Installation", "Roofing", "Cabinet Making"],
        rating: 4.9,
        reviews: 127,
        price: "GHS 80-120/hour",
        experience: "8 years",
        availability: "available",
        location: "Tamale Central",
        completedJobs: 89,
        specialties: ["Traditional Furniture", "Modern Designs", "Repairs"],
        tools: ["Power Tools", "Hand Tools", "Measuring Equipment"],
        certification: "NVTI Level II",
        description: "Experienced carpenter specializing in custom furniture and home renovations."
    },
    {
        id: 2,
        name: "Amina Ibrahim",
        photo: "https://kimi-web-img.moonshot.cn/img/ghanaeducation.org/1c06ca6e2b3bb7e37f9fb8813a3ab18efbea1fea.jpg",
        category: "welding",
        services: ["Metal Fabrication", "Structural Welding", "Gates & Fences", "Repairs"],
        rating: 4.8,
        reviews: 93,
        price: "GHS 90-150/hour",
        experience: "6 years",
        availability: "available",
        location: "Tamale Industrial",
        completedJobs: 76,
        specialties: ["Steel Fabrication", "Aluminum Work", "Industrial Welding"],
        tools: ["Arc Welder", "Gas Equipment", "Grinding Tools"],
        certification: "NVTI Level I",
        description: "Professional welder with expertise in metal fabrication and structural work."
    },
    {
        id: 3,
        name: "Abdul Rahman",
        photo: "https://kimi-web-img.moonshot.cn/img/www.theghanareport.com/431eaca3f591b5601e9e72b1cf45be7f82d44d6d.png",
        category: "plumbing",
        services: ["Pipe Installation", "Leak Repairs", "Drainage Systems", "Bathroom Fittings"],
        rating: 4.7,
        reviews: 156,
        price: "GHS 70-100/hour",
        experience: "10 years",
        availability: "busy",
        location: "Tamale South",
        completedJobs: 134,
        specialties: ["Residential Plumbing", "Commercial Systems", "Emergency Repairs"],
        tools: ["Pipe Wrenches", "Cutting Tools", "Testing Equipment"],
        certification: "NVTI Level II",
        description: "Licensed plumber with extensive experience in residential and commercial systems."
    },
    {
        id: 4,
        name: "Fatima Alhassan",
        photo: "https://kimi-web-img.moonshot.cn/img/static.wixstatic.com/135648978d93325b056ed80846de3bf82a5cdb6b.jpg",
        category: "electrical",
        services: ["Wiring Installation", "Electrical Repairs", "Safety Inspections", "Appliance Installation"],
        rating: 4.9,
        reviews: 89,
        price: "GHS 85-130/hour",
        experience: "7 years",
        availability: "available",
        location: "Tamale North",
        completedJobs: 67,
        specialties: ["Home Wiring", "Commercial Installations", "Safety Systems"],
        tools: ["Multimeter", "Wire Strippers", "Safety Equipment"],
        certification: "NVTI Level I",
        description: "Certified electrician specializing in safe, efficient electrical installations and repairs."
    },
    {
        id: 5,
        name: "Ibrahim Yakubu",
        photo: "https://kimi-web-img.moonshot.cn/img/vsctools.com/edc4f02044e0b2013851303d6618443001daf43a.jpg",
        category: "auto-repair",
        services: ["Engine Repair", "Electrical Systems", "Brake Service", "Maintenance"],
        rating: 4.6,
        reviews: 112,
        price: "GHS 100-180/hour",
        experience: "9 years",
        availability: "available",
        location: "Tamale East",
        completedJobs: 98,
        specialties: ["Engine Diagnostics", "Electrical Repairs", "Preventive Maintenance"],
        tools: ["Diagnostic Tools", "Mechanical Tools", "Lifting Equipment"],
        certification: "NVTI Level II",
        description: "Skilled auto mechanic with expertise in both mechanical and electrical repairs."
    },
    {
        id: 6,
        name: "Mariama Sule",
        photo: "https://kimi-web-img.moonshot.cn/img/www.sulzer.com/60d9bc00e084bf082b7a38d307616f657c5e6074.jpg",
        category: "construction",
        services: ["Building Construction", "Renovations", "Masonry", "Plastering"],
        rating: 4.8,
        reviews: 74,
        price: "GHS 120-200/hour",
        experience: "12 years",
        availability: "busy",
        location: "Tamale West",
        completedJobs: 45,
        specialties: ["Residential Building", "Commercial Construction", "Renovations"],
        tools: ["Construction Tools", "Measuring Equipment", "Safety Gear"],
        certification: "NVTI Level II",
        description: "Experienced construction professional specializing in quality building and renovation work."
    },
    {
        id: 7,
        name: "Yakubu Musa",
        photo: "https://kimi-web-img.moonshot.cn/img/kmtools.com/067424483834dbc0e17b906a363ea5a1730c0e3b.jpg",
        category: "tailoring",
        services: ["Custom Clothing", "Alterations", "Repairs", "Traditional Wear"],
        rating: 4.7,
        reviews: 201,
        price: "GHS 50-80/hour",
        experience: "15 years",
        availability: "available",
        location: "Tamale Central",
        completedJobs: 167,
        specialties: ["Custom Designs", "Traditional Smocks", "Quick Alterations"],
        tools: ["Sewing Machines", "Cutting Tools", "Measuring Tools"],
        certification: "NVTI Level I",
        description: "Master tailor with expertise in both modern and traditional garment making."
    },
    {
        id: 8,
        name: "Hassan Iddrisu",
        photo: "https://kimi-web-img.moonshot.cn/img/www.craftsman.com/347cabfeb076f614d3279c612db815854ba25530",
        category: "metalwork",
        services: ["Blacksmithing", "Tool Making", "Ornamental Work", "Repairs"],
        rating: 4.5,
        reviews: 67,
        price: "GHS 75-120/hour",
        experience: "20 years",
        availability: "available",
        location: "Tamale Industrial",
        completedJobs: 89,
        specialties: ["Traditional Blacksmithing", "Tool Fabrication", "Decorative Metalwork"],
        tools: ["Forge Equipment", "Anvil", "Hand Tools"],
        certification: "Traditional Master",
        description: "Traditional blacksmith with decades of experience in tool making and metalwork."
    }
];

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

    // Service category hover animations
    const serviceCategories = document.querySelectorAll('.service-category');
    serviceCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            anime({
                targets: category,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: 'easeOutQuart'
            });
        }, index * 100);

        category.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                translateY: -4,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        category.addEventListener('mouseleave', function() {
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
                const target = parseFloat(counter.getAttribute('data-count'));
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
            const value = anim.animatables[0].target.count;
            element.textContent = target % 1 === 0 ? Math.floor(value) : value.toFixed(1);
        }
    });
}

// Service Categories Functionality
function initializeServiceCategories() {
    const categories = document.querySelectorAll('.service-category');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryType = this.getAttribute('data-category');
            filterProvidersByCategory(categoryType);
            
            // Update active state
            categories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterProvidersByCategory(category) {
    const filteredProviders = category === 'all' ? 
        providersData : 
        providersData.filter(provider => provider.category === category);
    
    renderProviderGrid(filteredProviders);
    
    // Scroll to providers section
    document.getElementById('providers').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const filterChips = document.querySelectorAll('.filter-chip');
    
    // Search input handler
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        performSearch(searchTerm);
    });
    
    // Filter chips handler
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
}

function performSearch(searchTerm = '') {
    let filteredProviders = providersData;
    
    if (searchTerm) {
        filteredProviders = providersData.filter(provider => 
            provider.name.toLowerCase().includes(searchTerm) ||
            provider.services.some(service => service.toLowerCase().includes(searchTerm)) ||
            provider.location.toLowerCase().includes(searchTerm) ||
            provider.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
        );
    }
    
    renderProviderGrid(filteredProviders);
}

function applyFilter(filter) {
    let filteredProviders = providersData;
    
    switch(filter) {
        case 'available':
            filteredProviders = providersData.filter(provider => provider.availability === 'available');
            break;
        case 'top-rated':
            filteredProviders = providersData.filter(provider => provider.rating >= 4.7);
            break;
        case 'affordable':
            filteredProviders = providersData.filter(provider => {
                const price = parseInt(provider.price.split('-')[0].replace('GHS ', ''));
                return price <= 80;
            });
            break;
        case 'experienced':
            filteredProviders = providersData.filter(provider => {
                const experience = parseInt(provider.experience);
                return experience >= 5;
            });
            break;
        default:
            filteredProviders = providersData;
    }
    
    renderProviderGrid(filteredProviders);
}

// Provider Grid Management
function initializeProviderGrid() {
    renderProviderGrid(providersData);
}

function renderProviderGrid(providers) {
    const grid = document.getElementById('providers-grid');
    grid.innerHTML = '';
    
    providers.forEach((provider, index) => {
        const providerCard = createProviderCard(provider);
        grid.appendChild(providerCard);
        
        // Animate card appearance
        providerCard.style.opacity = '0';
        providerCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            anime({
                targets: providerCard,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: 'easeOutQuart'
            });
        }, index * 100);
    });
}

function createProviderCard(provider) {
    const card = document.createElement('div');
    card.className = 'provider-card p-6';
    
    const availabilityClass = provider.availability === 'available' ? 'available' : 
                             provider.availability === 'busy' ? 'busy' : 'offline';
    
    card.innerHTML = `
        <div class="relative">
            <div class="availability-badge ${availabilityClass}"></div>
            <img src="${provider.photo}" alt="${provider.name}" class="w-20 h-20 rounded-full object-cover mx-auto mb-4">
        </div>
        
        <div class="text-center mb-4">
            <h3 class="font-display text-xl font-bold mb-2" style="color: var(--craftsman-blue);">${provider.name}</h3>
            <div class="flex items-center justify-center mb-2">
                <div class="rating-stars text-sm mr-2">${'⭐'.repeat(Math.floor(provider.rating))}</div>
                <span class="text-sm font-medium">${provider.rating} (${provider.reviews} reviews)</span>
            </div>
            <div class="service-badge mb-2">${provider.category.charAt(0).toUpperCase() + provider.category.slice(1)}</div>
            <p class="text-gray-600 text-sm mb-2">${provider.location}</p>
            <p class="text-gray-600 text-sm">${provider.experience} experience</p>
        </div>
        
        <div class="mb-4">
            <h4 class="font-semibold text-sm mb-2" style="color: var(--craftsman-blue);">Services:</h4>
            <div class="flex flex-wrap gap-1">
                ${provider.services.slice(0, 3).map(service => 
                    `<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">${service}</span>`
                ).join('')}
                ${provider.services.length > 3 ? `<span class="text-xs text-gray-500">+${provider.services.length - 3} more</span>` : ''}
            </div>
        </div>
        
        <div class="flex items-center justify-between mb-4">
            <div class="price-tag text-sm">
                ${provider.price}
            </div>
            <div class="text-sm text-gray-600">
                ${provider.completedJobs} jobs completed
            </div>
        </div>
        
        <div class="flex gap-2">
            <button onclick="viewProfile(${provider.id})" class="flex-1 btn-secondary py-2 px-4 rounded-lg text-sm font-medium">
                View Profile
            </button>
            <button onclick="requestQuote(${provider.id})" class="flex-1 btn-primary py-2 px-4 rounded-lg text-sm font-medium">
                Request Quote
            </button>
        </div>
    `;
    
    return card;
}

function loadMoreProviders() {
    // Simulate loading more providers
    showNotification('Loading more professionals...', 'info');
    
    setTimeout(() => {
        showNotification('All available professionals loaded!', 'success');
    }, 1500);
}

function viewProfile(providerId) {
    const provider = providersData.find(p => p.id === providerId);
    if (provider) {
        showNotification(`Viewing profile for ${provider.name}. Profile page coming soon!`, 'info');
        // In a real implementation, this would navigate to a detailed profile page
    }
}

function requestQuote(providerId) {
    const provider = providersData.find(p => p.id === providerId);
    if (provider) {
        showNotification(`Quote request sent to ${provider.name}! They will contact you soon.`, 'success');
        // In a real implementation, this would open a quote request form
    }
}

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    performSearch(searchTerm);
}

// Scroll Effects and Parallax
function initializeScrollEffects() {
    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(250, 250, 250, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(250, 250, 250, 0.95)';
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
function scrollToServices() {
    document.getElementById('services').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function showLoginModal() {
    document.getElementById('login-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideLoginModal() {
    document.getElementById('login-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function handleLogin() {
    // Simulate login process
    showNotification('Login successful! Welcome back.', 'success');
    hideLoginModal();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Local Storage Functions
function saveUserData(data) {
    const userData = getUserData();
    const updatedData = { ...userData, ...data };
    localStorage.setItem('tamaleTVET', JSON.stringify(updatedData));
}

function getUserData() {
    const stored = localStorage.getItem('tamaleTVET');
    return stored ? JSON.parse(stored) : {};
}

// Form Validation
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

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Something went wrong. Please try again.', 'error');
});

// Export functions for use in other pages
window.TamaleTVET = {
    showNotification,
    saveUserData,
    getUserData,
    validateForm,
    showLoading,
    hideLoading,
    isMobile,
    isTablet,
    showLoginModal,
    hideLoginModal
};