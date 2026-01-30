## 🧱 [Map]

LeafletMaps component which allows for a map to be displayed with markers for locations stored in the "locations" post type. This utilises an ACF group which is assigned to the "locations" post type, for the latitude and longitude coordinates.

---

### 📁 Structure
```
_assets/
├─ fonts/                              ← Custom theme fonts
├─ images/
│  └─ icons-sprite.svg                 ← SVG sprite sheet
├─ js/
│  ├─ core/
│  │  └─ run.js                        ← Main JS entry point (global scripts)
|  |  └─ map.js                        ← Main LeafletJS JS code for this block
│  └─ addon/
│     └─ README.md                     ← Notes for optional JS addons
└─ styles/
   ├─ main.css                         ← Compiled CSS output
   └─ partials/                        ← SCSS/CSS partials

_functions/                            ← Theme functionality (custom PHP classes)
  ├─ MapLocations.php                  ← Custom PHP for map locations to pull long and lat coordinates from "locations" post type

_views/
├─ 404.twig                            ← Error page template
├─ index.twig                          ← Main index template
├─ page.twig                           ← Static page template
├─ single.twig                         ← Single post template
├─ _layout/
│  └─ (header, footer, base, etc.)     ← Global layout wrappers
├─ _components/                        ← Reusable partials (logos, social links, etc.)
└─ _blocks/                            ← ACF block templates
  └─ map.twig                          ← main block structure for this component

acf/
└─ acf-export-map-locations.json       ← ACF group for supporting long and lat coordinates for locations
```

---

### 🧩 Twig Usage

Use this block within any page template or flexible content area:

```twig
{% include '_blocks/map.twig' %}
```

---

**Ensure:**  
- The script is included in your global JS bundle (e.g. `run.js`)  
- The function is called on DOM load or via your init pattern

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
<div class="relative ... {{ settings.bg_class(fields.background_colour) }} {{ settings.rounded_classes(fields.rounded_top, fields.rounded_bottom) }}">
```

---

### 🧱 ACF Setup (If Applicable)

**Field Group:** `Map Settings`  
**Location:** `Site Options`  

**Fields:**
- `latitude` (text)
- `longitude` (text)

Suggest adding this to the Site Options page in ACF when building this component.
---

### 💅 Styling Notes

- Built with Tailwind utilities where possible.
- Keep block-level layout styles minimal; rely on global typography and spacing tokens.
- Use contextual classes (e.g. `bg-gray-50`, `rounded-2xl`) for visual flexibility.

---

### 💡 Tips

- **Dependencies:** List any required libraries (e.g. Swiper, Tiny Slider).  
- **Accessibility:** Mention ARIA roles, keyboard handling, or screen reader labels.  
- **Performance:** Consider lazy-loading or deferring heavy scripts.  
- **Reusability:** Blocks should avoid hard-coded data paths; always use flexible field names or passed context.

---

✅ **Example Output**

```twig
{# Requires an ACF image field called 'map_background' adding to 'site options' in the ACF options page. #}
{% if options.map_background %}
    {% set map_background = options.map_background.url|resize(1920, 1080, 'center')|towebp %}
    <style>
        .map-background {
            background-image: url({{ map_background }});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    </style>
{% endif %}

<div class="relative z-10 pt-84 map-background lg:pt-64 xl:pt-32 2xl:pt-0">
    <div id="leafletMap" class="w-full h-[550px] lg:h-[900px] 2xl:h-[800px]"></div>

    {% if options.map_cta_text %}
        <div class="container flex absolute right-0 left-0 top-28 justify-center items-start w-full lg:items-center lg:top-20 2xl:justify-start 2xl:top-0 2xl:h-full">
            <div class="drop-shadow-2xl doodle-border max-w-[570px] relative z-[99999] 3xl:max-w-[576px]">
                <div class="~p-6/12 doodle-lg-cream bg-cream">
                    {% for cta in options.map_cta_text %}
                    {% set count = loop.index %}
                        <p class="{{ loop.first ? 'title text-dark-green ~text-3xl/5xl ~mb-8/6' : 'text-black-green ~text-sm/base' }} animate fadeIn delay-{{ count }}">{{ cta.text }}</p>
                    {% endfor %}

                    {% if options.map_ctas %}
                        <div class="flex flex-wrap ~gap-2/4 items-center mt-10 animate fadeIn delay-1">
                            {% for cta in options.map_ctas %}
                                {% include "_atoms/button.twig" with {
                                    doodleClass: '',
                                    link: cta.map_cta.url,
                                    text: cta.map_cta.title,
                                    colour: loop.index is even ? 'green' : 'dark-green',
                                    btnClass: 'btn--large',
                                    icon: 'angle-right',
                                    iconPosition: 'right',
                                } %}
                            {% endfor %}
                        </div>
                    {% endif %}
                </div>
            </div>
        </div>
    {% endif %}
</div>
```
