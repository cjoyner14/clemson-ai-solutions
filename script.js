// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');

        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = mobileNav.classList.contains('active')
            ? 'rotate(45deg) translateY(8px)' : 'none';
        spans[1].style.opacity = mobileNav.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = mobileNav.classList.contains('active')
            ? 'rotate(-45deg) translateY(-8px)' : 'none';
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // Close mobile menu if open
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }

        // Scroll to target
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + 100;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--navy)';
            link.style.fontWeight = '600';
        }
    });
});

// Form Handling - Consultation Form
const consultationForm = document.getElementById('consultationForm');
if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData);

        // Show success message (in production, this would send to a server)
        showNotification('Thank you! We\'ll contact you within 24 hours to confirm your consultation.', 'success');

        // Reset form
        consultationForm.reset();

        // Log form data (remove in production)
        console.log('Consultation Form Data:', data);
    });
}

// Form Handling - Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Log form data (remove in production)
        console.log('Contact Form Data:', data);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;

    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .stat, .about-content, .mission-content');

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(30, 58, 95, 0.1)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 20px rgba(30, 58, 95, 0.15)';
    }

    lastScroll = currentScroll;
});

// Add transition to navbar
if (navbar) {
    navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
}

// Form Field Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone);
}

// Add real-time validation to form fields
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#dc3545';
            input.setCustomValidity('Please enter a valid email address');
        } else {
            input.style.borderColor = '#ddd';
            input.setCustomValidity('');
        }
    });
});

const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validatePhone(input.value)) {
            input.style.borderColor = '#dc3545';
            input.setCustomValidity('Please enter a valid phone number');
        } else {
            input.style.borderColor = '#ddd';
            input.setCustomValidity('');
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('form button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        const form = this.closest('form');
        if (form.checkValidity()) {
            this.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⏳</span> Processing...';
            this.disabled = true;

            // Reset button after form submission
            setTimeout(() => {
                this.innerHTML = this.textContent.includes('Schedule') ? 'Schedule Consultation' : 'Send Message';
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add spinning animation for loading
if (!document.querySelector('#spinner-styles')) {
    const style = document.createElement('style');
    style.id = 'spinner-styles';
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter Egg
console.log('%c🚀 Welcome to Clemson AI Solutions!', 'color: #1e3a5f; font-size: 20px; font-weight: bold;');
console.log('%cWe\'re excited to help your business grow with AI!', 'color: #4a90e2; font-size: 14px;');
console.log('%cInterested in joining our team? Contact us at careers@clemsonai.com', 'color: #666; font-size: 12px;');