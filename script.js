/* ============================================
   SILLS CUMMIS & GROSS - JAVASCRIPT
   Form Validation & Navigation Active State
   ============================================ */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    highlightActiveNavLink();
    initializeContactForm();
    addScrollAnimations();
});

// ============================================
// IMAGE / LOGO FALLBACKS
// If the logo or slide images are missing, replace logo <img> with styled text so the site remains presentable.
// ============================================

function applyImageFallbacks() {
    // Logo fallbacks inside slides
    const logos = document.querySelectorAll('.slide-logo');
    logos.forEach(img => {
        // If image fails to load or has no natural width, replace with text node
        function replaceWithText() {
            const span = document.createElement('span');
            span.className = 'logo-text';
            span.textContent = 'Sills Cummis & Gross';
            img.replaceWith(span);
        }

        if (img.complete) {
            if (!img.naturalWidth) replaceWithText();
        } else {
            img.addEventListener('error', replaceWithText);
            img.addEventListener('load', () => {
                if (!img.naturalWidth) replaceWithText();
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', applyImageFallbacks);

// ============================================
// HERO SLIDESHOW
// ============================================

function initHeroSlideshow() {
    const slideshow = document.getElementById('heroSlideshow');
    if (!slideshow) return;

    const slidesWrap = slideshow.querySelector('.slides');
    const slides = Array.from(slidesWrap.querySelectorAll('.slide'));
    const prevBtn = slideshow.querySelector('.slide-control.prev');
    const nextBtn = slideshow.querySelector('.slide-control.next');
    const dots = Array.from(slideshow.querySelectorAll('.dot'));

    let current = 0;
    let interval = null;
    const delay = 5000;

    function goTo(index) {
        index = (index + slides.length) % slides.length;
        current = index;
        slidesWrap.style.transform = `translateX(${ -index * 100 }%)`;
        slides.forEach((s, i) => s.setAttribute('aria-hidden', i !== index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function start() { interval = setInterval(next, delay); }
    function stop() { if (interval) { clearInterval(interval); interval = null; } }

    nextBtn.addEventListener('click', () => { next(); stop(); start(); });
    prevBtn.addEventListener('click', () => { prev(); stop(); start(); });

    dots.forEach(dot => dot.addEventListener('click', (e) => {
        const idx = parseInt(dot.getAttribute('data-index'), 10) || 0;
        goTo(idx);
        stop(); start();
    }));

    slideshow.addEventListener('mouseenter', stop);
    slideshow.addEventListener('focusin', stop);
    slideshow.addEventListener('mouseleave', start);
    slideshow.addEventListener('focusout', start);

    // Initialize
    goTo(0);
    start();
}

// initialize hero slideshow after DOM ready
document.addEventListener('DOMContentLoaded', initHeroSlideshow);

// ============================================
// SCROLL ANIMATIONS
// ============================================

function addScrollAnimations() {
    const cards = document.querySelectorAll('.card, .benefit-card, .service-card, .attorney-card, .office-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// ============================================
// NAVIGATION - ACTIVE LINK HIGHLIGHTING
// ============================================

function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.pathname;
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Check if link matches current page
        if (currentUrl.includes(href) || 
            (currentUrl.endsWith('/') && href === 'index.html') ||
            (currentUrl.endsWith('index.html'))) {
            if (href === 'index.html' || currentUrl.includes('index.html')) {
                link.classList.add('active');
            }
        } else if (href === 'about.html' && currentUrl.includes('about')) {
            link.classList.add('active');
        } else if (href === 'contact.html' && currentUrl.includes('contact')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Clear any error states
            clearFormErrors();
            
            // Scroll to success message
            setTimeout(() => {
                const successMsg = document.getElementById('successMessage');
                if (successMsg) {
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    });
    
    // Clear error messages on input focus
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            clearFieldError(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm() {
    let isValid = true;
    
    // Get all form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const helpCategory = document.getElementById('helpCategory');
    const message = document.getElementById('message');
    
    // Clear all previous errors
    clearFormErrors();
    
    // Validate Name
    if (!name.value.trim()) {
        showFieldError(name, 'Please enter your name');
        isValid = false;
    }
    
    // Validate Email
    if (!email.value.trim()) {
        showFieldError(email, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Phone
    if (!phone.value.trim()) {
        showFieldError(phone, 'Please enter your phone number');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showFieldError(phone, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate Help Category
    if (!helpCategory.value) {
        showFieldError(helpCategory, 'Please select a category');
        isValid = false;
    }
    
    // Validate Message
    if (!message.value.trim()) {
        showFieldError(message, 'Please enter a message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, errorMessage) {
    const errorId = field.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
    
    // Add error class to field's parent form-group
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('error');
    }
}

function clearFieldError(field) {
    const errorId = field.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('error');
    }
}

function clearFormErrors() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Trigger animation
        successMessage.style.animation = `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
        
        // Hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation - allows various formats
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href*="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Skip external links and nav links
    if (href.includes('http') || !href.startsWith('#')) return;
    
    const target = document.querySelector(href);
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// ADD STAGGER ANIMATION STYLES
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('✨ Sills Cummis & Gross - Modern site initialized');
