// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoader();
    initParticles();
    initScrollAnimations();
    initCountdown();
    initSmoothScrolling();
    initScrollIndicator();
});

// Loading Animation
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Particle System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 6;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Countdown Timer
function initCountdown() {
    // Set target date (30 days from now)
    const targetDate = new Date("11-01-2025");
    //targetDate.setDate(targetDate.getDate() + 30);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Countdown finished
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // Add pulse animation to seconds
        secondsEl.parentElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            if (secondsEl.parentElement) {
                secondsEl.parentElement.style.transform = 'scale(1)';
            }
        }, 100);
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const mottoSection = document.getElementById('motto');
            if (mottoSection) {
                mottoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Logo Enhancement Effects
function initLogoEffects() {
  
}

// Card Hover Effects
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card, .card, .motto-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(30, 41, 59, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(30, 41, 59, 0.1)';
        });
    });
}

// Email Link Animation
function initEmailEffects() {
    const emailLinks = document.querySelectorAll('.contact-email');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a pulse animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1) translateY(-2px)';
            }, 150);
        });
        
        // Enhanced hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const particles = document.querySelector('.particles');
        
        if (heroBackground) {
            const yPos = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${yPos}px)`;
        }
        
        if (particles) {
            const yPos = scrolled * 0.3;
            particles.style.transform = `translateY(${yPos}px)`;
        }
    }, 10));
}

// Floating Animation for Feature Icons
function initFloatingIcons() {
    const icons = document.querySelectorAll('.feature-icon');
    
    icons.forEach((icon, index) => {
        icon.style.animation = `float ${4 + index * 0.5}s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.3}s`;
        
        // Add hover effect
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.filter = 'brightness(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Ripple Effect for Interactive Elements
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.contact-email, .feature-card, .countdown-item, .logo-container');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(37, 99, 235, 0.3);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // Add ripple animation keyframes if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Section Reveal Animation
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                
                // Trigger any child animations
                const childElements = entry.target.querySelectorAll('.fade-in-up, .fade-in');
                childElements.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animationPlayState = 'running';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => {
        revealObserver.observe(section);
    });
}

// Performance optimization - throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Countdown Enhancement
function enhanceCountdown() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    countdownItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(30, 41, 59, 0.1)';
        });
    });
}

// Logo Loading Animation
function initLogoLoadAnimation() {
    const logo = document.querySelector('.tekits-logo');
    const logoContainer = document.querySelector('.logo-container');
    
    if (logo && logoContainer) {
        logo.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            logoContainer.classList.add('logo-loaded');
        });
        
        // Fallback if image is already loaded
        if (logo.complete) {
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
            logoContainer.classList.add('logo-loaded');
        }
    }
}

// Initialize additional effects after page load
window.addEventListener('load', function() {
    setTimeout(() => {
        //initLogoEffects();
        initCardEffects();
        initEmailEffects();
        initFloatingIcons();
        initRippleEffect();
        initSectionReveal();
        enhanceCountdown();
        //initLogoLoadAnimation();
        initParallax();
    }, 1500);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Reinitialize particles on resize
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && window.innerWidth > 768) {
        particlesContainer.innerHTML = '';
        initParticles();
    }   
}, 250));

// Add custom cursor effect for premium feel
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(37, 99, 235, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Hide default cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .contact-email, .feature-card, .logo-container');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(16, 185, 129, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(37, 99, 235, 0.6)';
        });
    });
}

// Initialize custom cursor on larger screens
if (window.innerWidth > 768) {
    window.addEventListener('load', () => {
        setTimeout(initCustomCursor, 2000);
    });
}
