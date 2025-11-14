# ✨ Global Animation System

This theme includes a lightweight IntersectionObserver-based animation system  
used across all projects in the Alex James Design WordPress boilerplate.

It allows any element to fade/slide in when entering the viewport simply by  
adding utility classes (`animate`, `delay-*`) in Twig/HTML.

---

## 🧱 Core Script

**File:** `_assets/js/core/animations.js`  
**Bundled into:** `dist/production-dist.js` via the `core-scripts` Gulp task.

The script observes all elements with the `.animate` class, and adds `.animated`  
when they enter the viewport:

```js
(function () {
    function initAnimations() {
        const elements = document.querySelectorAll('.animate');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    if (!element.classList.contains('animated')) {
                        element.classList.add('animated');
                    }

                    if (element.dataset.animate) {
                        element.classList.add(element.dataset.animate);
                    }

                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
})();
```

---

## 🧩 Required Markup

Add `.animate` to any element that should animate on scroll:

```html
<div class="animate">
    Fade me in when visible
</div>
```

When triggered, JS adds an `animated` class:

```html
<div class="animate animated">
```

Your CSS/Tailwind styles should target `.animated` for visible state.

---

## ⏱️ Delay Classes (Optional, for Staggered Animations)

Use delay classes to stagger elements with different entry timings:

```html
<div class="animate delay-1">First</div>
<div class="animate delay-2">Second</div>
<div class="animate delay-3">Third</div>
```

Example CSS:

```css
.delay-1 { transition-delay: .1s; }
.delay-2 { transition-delay: .2s; }
.delay-3 { transition-delay: .3s; }
```

---

## 🎨 CSS Requirements

Include base animation classes globally:

```css
.animate {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity .5s ease, transform .5s ease;
}

.animated {
    opacity: 1;
    transform: translateY(0);
}
```

These can be customized per project.

---

## 🧠 Usage in Twig + ACF Blocks

```twig
<h2 class="animate delay-1">{{ fields.heading }}</h2>

<p class="animate delay-2">
    {{ fields.text }}
</p>

<div class="feature-card animate delay-3">
    {% include '_atoms/feature-card.twig' with { item: item } %}
</div>
```

---

## 💡 Tips & Conventions

- Only apply `.animate`; JS handles `.animated`
- Stagger repeating items with delay classes
- Works well for:
  - hero text
  - cards
  - icon lists
  - feature grids
  - CTAs
- Uses efficient IntersectionObserver (no jQuery)

---

## 📚 Related Files

- `_assets/js/core/animations.js`
- `helpers/icon-system.md`
- `helpers/animation-system.md` (this file)
