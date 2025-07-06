
// Enhanced Typing Effect with Loop
document.addEventListener('DOMContentLoaded', function() {
    const typingAnimation = () => {
        const text = "Muhammad Moeed";
        const typingElement = document.getElementById('typing-text');
        const cursor = document.querySelector('.typing-cursor');
        
        if (!typingElement || !cursor) return;

        let index = 0;
        let isDeleting = false;
        let loopCount = 0;
        const maxLoops = 3; // Set to Infinity for endless loop
        
        function type() {
            const currentText = text.substring(0, index);
            typingElement.textContent = currentText;
            cursor.style.display = 'inline-block';
            
            if (!isDeleting && index < text.length) {
                // Typing phase
                index++;
                setTimeout(type, 150);
            } else if (isDeleting && index > 0) {
                // Deleting phase
                index--;
                setTimeout(type, 100);
            } else {
                // Change state
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    loopCount++;
                    if (loopCount >= maxLoops) {
                        // Stop after maxLoops
                        cursor.style.animation = 'blink 1s infinite';
                        return;
                    }
                }
                setTimeout(type, isDeleting ? 1000 : 500);
            }
        }
        
        setTimeout(type, 1000);
    };

    typingAnimation();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Initialize active link on page load
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === 'index.html' && linkPage === 'index.html') || 
            (currentPage === linkPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Animate skill progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length > 0) {
        const animateOnScroll = () => {
            progressBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (barPosition < screenPosition) {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = `${level}%`;
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on page load
    }
});