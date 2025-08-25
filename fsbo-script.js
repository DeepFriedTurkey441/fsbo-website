// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = navbar.offsetHeight;
        const sectionTop = section.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to all nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Photo Gallery Lightbox
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Beautiful Home Exterior - Welcoming entrance with modern landscaping'
    },
    {
        src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Spacious Living Room - Open concept with natural light'
    },
    {
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Modern Kitchen - Granite countertops and stainless steel appliances'
    },
    {
        src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Master Bedroom - Peaceful retreat with walk-in closet'
    },
    {
        src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Master Bathroom - Spa-like luxury with modern fixtures'
    },
    {
        src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        caption: 'Private Backyard - Perfect for entertaining and relaxation'
    }
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImage.src = galleryImages[index].src;
    lightboxImage.alt = galleryImages[index].caption;
    lightboxCaption.textContent = galleryImages[index].caption;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openLightbox(currentImageIndex);
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentImageIndex);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
        }
    }
});

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

// Set minimum date to today
const dateInput = document.getElementById('preferred-date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Form validation and submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Basic validation
    if (!validateForm(formObject)) {
        return;
    }
    
    // Simulate form submission
    submitForm(formObject);
});

function validateForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = data.phone.replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    // Date validation
    if (!data['preferred-date']) {
        errors.push('Please select a preferred viewing date');
    }
    
    // Time validation
    if (!data.time) {
        errors.push('Please select a preferred time');
    }
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function submitForm(data) {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to your server
        console.log('Form submitted:', data);
    }, 2000);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.classList.remove('active');
    document.body.style.overflow = '';
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to cards
    document.querySelectorAll('.detail-card, .neighborhood-card, .gallery-item').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initial animation check
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Intersection Observer for better performance
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    });
}

// Price calculator (optional feature)
function calculateMortgage(principal, rate, years) {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    return monthlyPayment;
}

// Add mortgage calculator to page (can be called from console for demo)
function showMortgageCalculator() {
    const homePrice = 485000;
    const downPayment = homePrice * 0.2; // 20%
    const loanAmount = homePrice - downPayment;
    const interestRate = 6.5; // Current average
    const loanTerm = 30;
    
    const monthlyPayment = calculateMortgage(loanAmount, interestRate, loanTerm);
    
    console.log(`
    Mortgage Calculator for $${homePrice.toLocaleString()}:
    
    Down Payment (20%): $${downPayment.toLocaleString()}
    Loan Amount: $${loanAmount.toLocaleString()}
    Interest Rate: ${interestRate}%
    Loan Term: ${loanTerm} years
    
    Estimated Monthly Payment: $${monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 0})}
    
    * Does not include taxes, insurance, or HOA fees
    * Rates and terms may vary based on credit score and lender
    `);
}

// Add click tracking for analytics (placeholder)
function trackEvent(eventName, properties = {}) {
    // In a real application, this would send data to analytics service
    console.log('Event tracked:', eventName, properties);
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('button_click', {
                button_text: button.textContent.trim(),
                button_type: button.classList.contains('btn-primary') ? 'primary' : 'secondary'
            });
        });
    });
    
    // Track gallery interactions
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            trackEvent('gallery_view', {
                image_index: index,
                image_caption: galleryImages[index].caption
            });
        });
    });
    
    // Track form submission
    contactForm.addEventListener('submit', () => {
        trackEvent('contact_form_submit', {
            form_type: 'viewing_request'
        });
    });
});

// SEO and Performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images that are not immediately visible
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Social sharing
function shareProperty(platform) {
    const url = window.location.href;
    const title = 'Beautiful Family Home For Sale - 123 Maple Street';
    const description = '4BR/3BA home with modern amenities in desirable neighborhood. For Sale By Owner.';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`;
            break;
    }
    
    if (shareUrl) {
        if (platform === 'email') {
            window.location.href = shareUrl;
        } else {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
        
        trackEvent('property_shared', { platform });
    }
}

// Add to favorites (localStorage)
function toggleFavorite() {
    const propertyId = '123-maple-street';
    let favorites = JSON.parse(localStorage.getItem('fsbo-favorites') || '[]');
    
    if (favorites.includes(propertyId)) {
        favorites = favorites.filter(id => id !== propertyId);
        console.log('Property removed from favorites');
    } else {
        favorites.push(propertyId);
        console.log('Property added to favorites');
    }
    
    localStorage.setItem('fsbo-favorites', JSON.stringify(favorites));
    trackEvent('favorite_toggled', { property_id: propertyId, favorited: favorites.includes(propertyId) });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('FSBO Website Loaded Successfully');
    console.log('Available functions: showMortgageCalculator(), shareProperty(platform), toggleFavorite()');
    
    // Add any initialization code here
    trackEvent('page_view', {
        page: 'property_listing',
        property_id: '123-maple-street'
    });
});
