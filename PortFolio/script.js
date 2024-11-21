// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all main functions
    initializeAOS();
    initializeNavbar();
    initializeSmoothScroll();
    initializeContactForm();
    initializeTypeWriter();
    initializeProjectFilters();
    initializeLoader(); // New loader initialization
    initializeModal(); // New modal initialization
    initializeScrollToTop(); // New scroll to top button initialization
    initializeThemeToggle(); // Ensure theme toggle is called
});

// Initialize AOS (Animate on Scroll)
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// Navbar Functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Collapse navbar on mobile after click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Contact Form Handling
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple form validation
            if (!validateForm(data)) {
                showNotification('Please fill in all fields correctly', 'error');
                return;
            }

            // Simulate form submission
            try {
                await simulateFormSubmission(data);
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Error sending message. Please try again.', 'error');
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.length < 2) return false;
    if (!data.email || !emailRegex.test(data.email)) return false;
    if (!data.message || data.message.length < 10) return false;
    
    return true;
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 1000);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Typewriter effect for hero section
function initializeTypeWriter() {
    const text = document.querySelector('.hero-subtitle');
    if (text) {
        const words = ['FullStack Developer', 'Python Developer', 'IOS Developer', 'Problem Solver', 'WebSite Maker'];
        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                text.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                text.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }
            
            if (!isDeleting && letterIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 1500);
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            const typingSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typingSpeed);
        }
        
        type();
    }
}

// Project Filtering System
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.card');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                projects.forEach(project => {
                    const projectType = project.dataset.type;
                    if (filter === 'all' || filter === projectType) {
                        project.style.display = 'block';
                        project.classList.add('show');
                    } else {
                        project.style.display = 'none';
                        project.classList.remove('show');
                    }
                });
            });
        });
    }
}

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Dark/Light Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            // Save preference
            const isDarkTheme = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
        });
    }
    
    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Loader Handling
function initializeLoader() {
    const loader = document.querySelector('.loader'); // Asegúrate de que haya un loader en tu HTML
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('hidden'); // Asegúrate de ocultar el loader después de cargar
        });
    }
}

// Modal Handling
function initializeModal() {
    const modal = document.querySelector('.modal'); // Modal en tu HTML
    const openModalButton = document.querySelector('.open-modal'); // Botón para abrir el modal
    const closeModalButton = document.querySelector('.close-modal'); // Botón para cerrar el modal

    if (openModalButton) {
        openModalButton.addEventListener('click', () => {
            modal.classList.add('show'); // Añade clase para mostrar
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            modal.classList.remove('show'); // Quita clase para ocultar
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show'); // Cierra modal si se hace clic fuera de él
        }
    });
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top'); // Asegúrate de tener este botón

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show'); // Muestra el botón
        } else {
            scrollToTopBtn.classList.remove('show'); // Oculta el botón
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
