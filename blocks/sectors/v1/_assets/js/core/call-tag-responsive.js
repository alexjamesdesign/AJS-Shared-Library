// Call Tag Responsive Buttons
// Moves buttons outside parent div when width < 678px
(function ($) {
	"use strict";

	$(function () {
		const BREAKPOINT = 620;

		function handleCallTagResize() {
			$('.call-tag-wrapper:not(.no-responsive-buttons)').each(function() {
				const $wrapper = $(this);
				const $callTag = $wrapper.find('.call-tag');
				const width = $callTag.outerWidth();

				if (width < BREAKPOINT) {
					$wrapper.addClass('buttons-external');
				} else {
					$wrapper.removeClass('buttons-external');
				}
			});
		}

		// Initial check
		handleCallTagResize();

		// Use ResizeObserver for efficient resize detection
		if (typeof ResizeObserver !== 'undefined') {
			const resizeObserver = new ResizeObserver(handleCallTagResize);
			
			$('.call-tag-wrapper:not(.no-responsive-buttons) .call-tag').each(function() {
				resizeObserver.observe(this);
			});
		} else {
			// Fallback to window resize for older browsers
			$(window).on('resize', handleCallTagResize);
		}
	});

}(jQuery));
