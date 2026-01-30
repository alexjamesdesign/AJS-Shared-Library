// Viewport transition animations using Intersection Observer
(function ($) {
    "use strict";

    $(function () {

        // Check if browser supports Intersection Observer
        if (!('IntersectionObserver' in window)) {
            // Fallback: make all elements visible immediately
            $('.fade-in-viewport, .fade-in-viewport-simple').addClass('is-visible');
            return;
        }

        // Configuration for the observer
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px 0px -20px 0px', // trigger slightly before element enters viewport
            threshold: 0.1 // trigger when 10% of element is visible
        };

        // Callback function when elements intersect
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class to trigger animation
                    entry.target.classList.add('is-visible');
                    // Stop observing this element once it's animated
                    observer.unobserve(entry.target);
                }
            });
        };

        // Create the observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all elements with fade-in-viewport or fade-in-viewport-simple classes
        const animatedElements = document.querySelectorAll('.fade-in-viewport, .fade-in-viewport-simple');
        animatedElements.forEach(element => {
            observer.observe(element);
        });

    });

}(jQuery));