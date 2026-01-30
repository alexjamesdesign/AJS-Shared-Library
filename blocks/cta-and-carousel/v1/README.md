## 🧱 CTA and Carousel

A combined CTA section with carousel showing related content cards. Features a text area with button on the left (25% width) and a card carousel on the right (75% width). Displays 3-4 cards on desktop and 1 on mobile.

---

### 📁 Structure
```
_views/
├── _blocks/
│   └── cta-and-carousel.twig     ← Main block template
└── _components/
    └── card.twig                  ← Card component (from global theme)

acf/
└── acf-export-cta-carousel.json   ← ACF field export (if applicable)
```

---

### 🧩 Twig Usage

Use this block within any page template or flexible content area:

```twig
{% include '_blocks/cta-and-carousel.twig' %}
```

---

### ⚙️ JavaScript

This block uses **Tiny Slider** for the carousel functionality:

```js
// CTA and Carousel Slider (Tiny Slider)
var $sectorsWrappers = $('.js-sectors-slider');
$sectorsWrappers.each(function () {
    var $wrapper = $(this);
    if ($wrapper.data('tns-init')) return;
    $wrapper.data('tns-init', true);
    window.tns({
        container: this,
        items: 1,
        gutter: 16,
        controls: true,
        controlsContainer: '.tns-controls-sectors',
        nav: false,
        mouseDrag: true,
        swipeAngle: false,
        speed: 400,
        responsive: {
            768: { items: 2 },
            1024: { items: 3 },
        }
    });
});
```

**Ensure:**  
- Tiny Slider library is included in your project
- The script is included in your global JS bundle (e.g. `run.js`)

---

### 🎨 Standard Block Settings

This block uses standardized settings for background and corners:

**Fields Required:**
- `background_colour` (Select/Color)
- `rounded_top` (Toggle)
- `rounded_bottom` (Toggle)

**Implementation:**
```twig
{% import "_atoms/block_settings.twig" as settings %}
<section class="container ... {{ settings.bg_class(fields.background_colour) }} {{ settings.rounded_classes(fields.rounded_top, fields.rounded_bottom) }}">
```

---

### 🧱 ACF Setup

**Field Group:** `CTA and Carousel`  
**Location:** `[Block]`  

**Fields:**
- `sectors_title` (Text) - CTA heading
- `sectors_copy` (Textarea) - CTA description
- `sectors_button` (Link) - CTA button link and text
- `cards` (Post Object - Multiple) - Select posts to display in carousel

---

### 💅 Styling Notes

- Built with Tailwind utilities
- Responsive layout: 100% width on mobile, 25%/75% split on desktop
- Card component should be defined globally in theme's `_atoms/card.twig`
- Custom navigation controls positioned at bottom right

---

### 💡 Tips

- **Dependencies:** Tiny Slider library  
- **Performance:** Consider limiting the number of cards to 6-8 for optimal performance
- **Reusability:** Uses global card component for consistency across the site
