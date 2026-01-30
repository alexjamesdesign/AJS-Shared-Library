## 🧱 [Why Choose Us]

A full-width carousel with 4 slides showing on desktop and 1 on mobile. Data is pulled from the ACF field `why_choose_us` located in the options page.

---

### 📁 Structure
```
_views/
└─ _blocks/
   └─ why-choose-us.twig           ← main block structure
└─ _components/
   └─ why-choose-us.twig           ← content for the carousel
_assets/
└─ js/
   └─ core/
      └─ run.js          ← Lpgic for Tiny Slider is added here
acf/
└─ acf-export-why-choose-us.json   ← optional ACF field export for reuse
```

```
_assets/
├─ fonts/                              ← Custom theme fonts
├─ images/
│  └─ icons-sprite.svg                 ← SVG sprite sheet
├─ js/
│  ├─ core/
│  │  └─ tiny-slider-init.js           ← JS for Tiny Slider
│  └─ addon/
│     └─ README.md                     ← Notes for optional JS addons
└─ styles/
   ├─ main.css                         ← Compiled CSS output
   └─ partials/                        ← SCSS/CSS partials

_functions/                            ← Theme functionality (custom PHP classes)

_views/
├─ 404.twig                            ← Error page template
├─ index.twig                          ← Main index template
├─ page.twig                           ← Static page template
├─ single.twig                         ← Single post template
├─ _layout/
│  └─ (header, footer, base, etc.)     ← Global layout wrappers
├─ _components/                        ← Reusable partials (logos, social links, etc.)
└─ _blocks/                            ← ACF block templates
```

---

### 🧩 Twig Usage

Use this block within any page template or flexible content area:

```twig
{% include '_blocks/why-choose-us.twig' %}
```

---

### ⚙️ JavaScript (Optional)

If the block has JavaScript interactivity, document it here.

```js
// [Block Name] Handler
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
```

**Ensure:**  
- The script is included in your global JS bundle `run.js`.

---

### 🎨 Standard Block Settings

This block uses standardized settings for background and corners:

**Fields Required:**
- `background_colour` (Select/Color) - Defaults to `bg-primary`
- `rounded_top` (Toggle)
- `rounded_bottom` (Toggle)

**Implementation:**
```twig
{% import "_atoms/block_settings.twig" as settings %}
<div class="py-6 ... {{ settings.bg_class(fields.background_colour|default('bg-primary')) }} {{ settings.rounded_classes(fields.rounded_top, fields.rounded_bottom) }}">
```

---

### 🧱 ACF Setup (If Applicable)

**Field Group:** `why_choose_us`  
**Location:** `[Options Page]`  

**Fields:**
- `field_one` (Text)
- `field_two` (Image)
- `field_three` (Repeater → sub fields: `title`, `quote`, etc.)

ACF export: [`acf-export-why-choose-us.json`](acf/acf-export-why-choose-us.json)

Import this JSON into ACF on new projects to instantly recreate the field structure.

---

### 💅 Styling Notes

- Built with Tailwind utilities where possible.
- Keep block-level layout styles minimal; rely on global typography and spacing tokens.
- Use contextual classes (e.g. `bg-secondary-light`, `rounded-2xl`) for visual flexibility similar to usecases of other blocks across the site.