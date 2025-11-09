// binds $ to jquery, requires you to write strict code. Will fail validation if it doesn't match requirements.
(function ($) {
	"use strict";

	// add all of your code within here, not above or below
	$(function () {
		// Services Slider (Tiny Slider)
		if (typeof window.tns !== 'undefined') {

			// Why Us Slider (Tiny Slider)
			var $whyUsWrappers = $('.js-why-us-slider');
			$whyUsWrappers.each(function () {
				var $wrapper = $(this);
				if ($wrapper.data('tns-init')) return;
				$wrapper.data('tns-init', true);
				window.tns({
					container: this,
					items: 1,
					gutter: 16,
					controls: false,
					nav: true,
					navPosition: 'bottom',
					navAsThumbnails: false,
					mouseDrag: true,
					swipeAngle: false,
					speed: 400,
					autoplay: true,
					autoplayTimeout: 5000,
					autoplayButtonOutput: false,
					responsive: {
						640: { items: 2 },
						768: { items: 3 },
						1280: { items: 4 }
					}
				});
			});
		}

	});

}(jQuery));