// Main JavaScript functionality for Sam Jonker's Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileNavigation();
    initContactForm();
    initSmoothScrolling();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInsideNav) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill out all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission logic)
            submitContactForm(name, email, subject, message);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission
function submitContactForm(name, email, subject, message) {
    // Show loading state
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showFormMessage('Thank you for your message! Ill get back to you soon.', 'success');
        
        // Reset form
        document.querySelector('.contact-form').reset();
        
        // In a real implementation, you would send the data to your server:
        // fetch('/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, email, subject, message }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         showFormMessage('Thank you for your message! I'll get back to you soon.', 'success');
        //         document.querySelector('.contact-form').reset();
        //     } else {
        //         showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        //     }
        // })
        // .catch(error => {
        //     showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        // })
        // .finally(() => {
        //     submitButton.textContent = originalText;
        //     submitButton.disabled = false;
        // });
        
    }, 1000);
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function to handle external links
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Add click handlers for external links that need special handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle LinkedIn link
    const linkedinLinks = document.querySelectorAll('a[href="#"]:not([href*="/"])');
    linkedinLinks.forEach(link => {
        if (link.textContent.includes('LinkedIn') || link.textContent.includes('Connect')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Replace with actual LinkedIn URL
                alert('LinkedIn profile would open here. Update the href with your actual LinkedIn URL.');
            });
        }
    });
});

// Add loading states and improve UX
function addLoadingState(element, originalText = 'Loading...') {
    element.classList.add('loading');
    element.disabled = true;
    element.textContent = originalText;
}

function removeLoadingState(element, originalText) {
    element.classList.remove('loading');
    element.disabled = false;
    element.textContent = originalText;
}

// Handle resume download
function handleResumeDownload() {
    // This function can be called when the resume download button is clicked
    // In a real implementation, this would trigger the actual file download
    console.log('Resume download initiated');
}

// Add subtle animations and interactions
function initEnhancedInteractions() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.highlight-card, .experience-card, .project-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize enhanced interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', initEnhancedInteractions);

// Handle form validation feedback
function validateFormField(field, validationFn, errorMessage) {
    const value = field.value.trim();
    const isValid = validationFn(value);
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Find or create error message element
    let errorElement = field.parentNode.querySelector('.field-error');
    
    if (!isValid) {
        field.classList.add('error');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = errorMessage;
    } else if (errorElement) {
        errorElement.remove();
    }
    
    return isValid;
}

// Real-time form validation
function initRealTimeValidation() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    if (nameField) {
        nameField.addEventListener('blur', function() {
            validateFormField(this, val => val.length >= 2, 'Name must be at least 2 characters long');
        });
    }
    
    if (emailField) {
        emailField.addEventListener('blur', function() {
            validateFormField(this, isValidEmail, 'Please enter a valid email address');
        });
    }
    
    if (messageField) {
        messageField.addEventListener('blur', function() {
            validateFormField(this, val => val.length >= 10, 'Message must be at least 10 characters long');
        });
    }
}

// Initialize real-time validation
document.addEventListener('DOMContentLoaded', initRealTimeValidation);
