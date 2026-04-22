/* OrbexDev - Interactive Elements */
document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Simplified for now)
    // Add logic here if needed for mobile hamburger

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal on Scroll Animation
    const revealElements = document.querySelectorAll('.glass-card, .service-card, .portfolio-item');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial state for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-item h2');
    let started = false;

    const startCounter = () => {
        if (started) return;
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;
            
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.innerText = Math.ceil(current) + (stat.innerText.includes('%') ? '%' : '+');
                    setTimeout(updateCount, 20);
                } else {
                    stat.innerText = target + (stat.innerText.includes('%') ? '%' : '+');
                }
            };
            updateCount();
        });
        started = true;
    };

    // Trigger counter when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            const sectionPos = statsSection.getBoundingClientRect().top;
            if (sectionPos < window.innerHeight * 0.8) {
                startCounter();
            }
        });
    }

    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
            
            // Close other items (optional accordion style)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
        });
    });
});
