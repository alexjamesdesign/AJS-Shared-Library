
(function ($) {
    "use strict";

    /**
     * Parallax Watermark
     * Applies a subtle vertical parallax effect to elements with .js-parallax-watermark
     */
    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('.js-parallax-watermark');

        if (!parallaxElements.length) return;

        // Use IntersectionObserver to only animate when in view (performance)
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                } else {
                    entry.target.classList.remove('is-in-view');
                }
            });
        }, observerOptions);

        parallaxElements.forEach(el => observer.observe(el));

        // Parallax Loop
        const animate = () => {
            const scrollY = window.pageYOffset;

            parallaxElements.forEach(el => {
                if (el.classList.contains('is-in-view')) {
                    const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
                    const rect = el.getBoundingClientRect();
                    // Calculate position relative to viewport center for smoother effect
                    const elementTop = rect.top + scrollY;
                    const offset = (scrollY - elementTop) * speed;

                    el.style.transform = `translateY(${offset}px)`;
                }
            });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    $(document).ready(function () {
        initParallax();
    });

}(jQuery));
