## 🧭 Reviews Carousel

A reusable reviews/testimonials carousel block built with **Tiny Slider**, designed for projects using the WordPress boilerplate setup.  
Pulls testimonial data from an **ACF repeater** in the global Site Options.

---

### 📁 Structure
```
_assets/
├─ images/
├─ js/
│  └─ core/
│     └─ run.js                        ← contains Tiny Slider initialization
└─ styles/
   └─ tiny-slider.css                  ← Tiny Slider styles

_functions/
└─ index.php                           ← PHP initialization (optional)

_views/
├─ _blocks/
│  └─ reviews-carousel.twig            ← main block template (carousel markup)
├─ _components/
│  └─ review-card.twig                 ← individual review card template
└─ _atoms/
   └─ block_settings.twig              ← standard block settings macros
```

---

### ⚙️ JavaScript Initialization

The carousel uses **Tiny Slider** (`tns`) and is initialized via a function in `run.js`.

```js
// Reviews Slider (Tiny Slider) Handler
function initReviewsSliders() {
  if (typeof tns === 'undefined') return;

  const wrappers = document.querySelectorAll('.reviews-slider');

  wrappers.forEach((wrapper) => {
    if (wrapper.querySelector('.tns-outer')) return;

    const sliderEl = wrapper.querySelector('.my-slider');
    const controlsEl = wrapper.querySelector('.tns-controls-custom');
    if (!sliderEl) return;

    tns({
      container: sliderEl,
      items: 1,
      gutter: 16,
      controls: true,
      controlsContainer: controlsEl,
      nav: true,
      navPosition: 'bottom',
      mouseDrag: true,
      swipeAngle: false,
      speed: 400,
      responsive: {
        768: { items: 2 },
        1024: { items: 3 }
      }
    });
  });
}
```

Make sure this function is called on DOM load within your global JS entry (e.g. in `run.js` or via your init handler).

---

### 🧩 Twig Usage

Include this block in any template or flexible content area:

```twig
{% include '_blocks/reviews-carousel.twig' %}
```

The block loops through `options.reviews` from the Site Options ACF group.  
Each repeater item renders a `review-card.twig` partial with testimonial data.

---

### 🎨 Standard Block Settings

This block uses standardized settings for background and corners:

**Fields Required:**
- `background_colour` (Select/Color)
- `rounded_top` (Toggle)
- `rounded_bottom` (Toggle) - Defaults to `true` (rounded bottom)

**Implementation:**
```twig
{% import "_atoms/block_settings.twig" as settings %}
<div class="{{ settings.bg_class(fields.background_colour) }} {{ settings.rounded_classes(fields.rounded_top, fields.rounded_bottom|default(true)) }}">
```

---

### 🧱 ACF Setup

- **Location:** Options Page → “Site Options”
- **Field Group:** `Reviews`
- **Repeater Fields:**
  - `review_text` (Text Area)
  - `review_author` (Text)
  - `review_role` (Optional Text)
  - `review_image` (Image)

ACF export: [`acf-export-site-options-reviews.json`](acf/acf-export-site-options-reviews.json)

Import this JSON into ACF on new projects to instantly recreate the data structure.

---

### 💅 Styling Notes

- The carousel cards inherit your Tailwind typography and spacing defaults.
- Cards can include an image, name, role, and quote.
- Add additional utilities (e.g. `bg-gray-50`, `rounded-2xl`, etc.) directly in the Twig partial as needed.

---

### 💡 Tips

- **Dependencies:**  
  Requires `tiny-slider` JS (ensure it’s enqueued globally or per-block).  
  Example enqueue:
  ```php
  wp_enqueue_script('tiny-slider', 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.js', [], null, true);
  ```
- **Accessibility:**  
  Include `aria-label="Reviews carousel"` on your wrapper for better screen reader support.
- **Performance:**  
  Lazy-load images in `review-card.twig` for better Lighthouse scores.

---

### ✅ Example Output

```twig
<section class="reviews-slider">
  <div class="my-slider">
    {% for review in options.reviews %}
      {% include '_components/review-card.twig' with { review: review } %}
    {% endfor %}
  </div>
  <div class="tns-controls-custom"></div>
</section>
```