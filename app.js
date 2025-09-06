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
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    
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
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
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
            secondsEl.parentElement.style.transform = 'scale(1)';
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
        let scrollTimer = null;
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

// Parallax Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Card Hover Effects
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card, .card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Email Link Animation
function initEmailEffects() {
    const emailLinks = document.querySelectorAll('.contact-email');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a small animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            if (i > text.length - 1) {
                clearInterval(typeTimer);
            }
        }, 100);
    }
}

// Mouse Trail Effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Update existing trail elements or create new ones
        trail.forEach((point, index) => {
            let trailElement = document.getElementById(`trail-${index}`);
            
            if (!trailElement) {
                trailElement = document.createElement('div');
                trailElement.id = `trail-${index}`;
                trailElement.style.position = 'fixed';
                trailElement.style.width = '4px';
                trailElement.style.height = '4px';
                trailElement.style.background = 'var(--tekits-primary)';
                trailElement.style.borderRadius = '50%';
                trailElement.style.pointerEvents = 'none';
                trailElement.style.zIndex = '9998';
                trailElement.style.transition = 'all 0.1s ease';
                document.body.appendChild(trailElement);
            }
            
            trailElement.style.left = point.x + 'px';
            trailElement.style.top = point.y + 'px';
            trailElement.style.opacity = (index + 1) / trailLength * 0.5;
            trailElement.style.transform = `scale(${(index + 1) / trailLength})`;
        });
    });
}

// Performance optimization - throttle scroll events
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

// Navbar scroll effect (if needed in future)
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10));
    }
}

// Add floating animation to feature icons
function initFloatingIcons() {
    const icons = document.querySelectorAll('.feature-icon');
    
    icons.forEach((icon, index) => {
        icon.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.2}s`;
    });
}

// Add ripple effect to buttons and clickable elements
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn, .contact-email, .feature-card');
    
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
                background-color: rgba(255, 255, 255, 0.3);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
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

// Initialize additional effects after page load
window.addEventListener('load', function() {
    setTimeout(() => {
        initCardEffects();
        initEmailEffects();
        initFloatingIcons();
        initRippleEffect();
        // initMouseTrail(); // Uncomment if you want mouse trail effect
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
