## 🧱 Hero

A full-width hero banner section typically used at the top of pages. Features heading, text content, optional background image, and call-to-action buttons.

---

### 📁 Structure
```
_views/
└── _blocks/
    └── hero.twig              ← Main hero block template

acf/
└── acf-export-hero.json       ← ACF field export (if applicable)
```

---

### 🧩 Twig Usage

Use this block within any page template:

```twig
{% include '_blocks/hero.twig' %}
```

---

### 🎨 Standard Block Settings

This block uses standardized settings for background and corners:

**Fields Required:**
- `background_colour` (Select/Color) - Defaults to `bg-grey-light`
- `rounded_top` (Toggle)
- `rounded_bottom` (Toggle) - Defaults to `true` (rounded bottom)

**Implementation:**
```twig
{% import "_atoms/block_settings.twig" as settings %}
<header class="... {{ settings.bg_class(fields.background_colour|default('bg-grey-light')) }} {{ settings.rounded_classes(fields.rounded_top, fields.rounded_bottom|default(true)) }}">
```

---

### 🧱 ACF Setup

**Field Group:** `Hero`  
**Location:** `[Block or Page Template]`  

**Fields:**
- `hero_heading` (Text) - Main heading
- `hero_text` (Textarea) - Descriptive text
- `hero_image` (Image) - Background image
- `hero_button` (Link) - CTA button

---

### 💅 Styling Notes

- Built with Tailwind utilities
- Full-width responsive design
- Background image with overlay support
- Optimized for visual hierarchy

---

### 💡 Tips

- **Accessibility:** Ensure proper heading hierarchy (typically h1)
- **Performance:** Optimize hero images for web (recommend WebP format)
- **Reusability:** Can be customized per page via ACF fields
