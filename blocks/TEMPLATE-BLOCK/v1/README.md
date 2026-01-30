## 🧱 [Block Name Here]

[Brief 1–2 sentence description of what this block does and where it’s typically used.  
Example: “A full-width hero banner with heading, text, and optional background image pulled from ACF fields.”]

---

### 📁 Structure
```
_assets/
├─ images/
│  └─ icons-sprite.svg                 ← SVG sprite sheet
├─ js/
│  └─ core/
│     └─ run.js                        ← Main JS entry point
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
│  └─ base.twig                        ← Global layout wrapper
├─ _atoms/
│  └─ block_settings.twig              ← Standard block settings macros
├─ _components/                        ← Reusable partials (logos, cards, etc.)
└─ _blocks/                            ← ACF block templates
   └─ [block-name].twig                ← Main block structure
```

---

### 🧩 Twig Usage

Use this block within any page template or flexible content area:

```twig
{% include '_blocks/[block-name].twig' %}
```

[Optional: Add an example of context variables if the block supports dynamic data.]

```twig
{% include '_blocks/[block-name].twig' with { items: options.reviews } %}
```

---

### ⚙️ JavaScript (Optional)

If the block has JavaScript interactivity, document it here.

```js
// [Block Name] Handler
function init[BlockName]() {
  // Example logic here
}
```

**Ensure:**  
- The script is included in your global JS bundle (e.g. `run.js`)  
- The function is called on DOM load or via your init pattern

---

### 🎨 Standard Block Settings

This block uses the standardized `block_settings.twig` macros for consistent styling.

**Importing Macros:**
```twig
{% import "_atoms/block_settings.twig" as settings %}
```

**Macro Usage:**
| Macro | Parameters | Description |
|---|---|---|
| `bg_class` | `colour_key` | Applies a background class (e.g. `bg-primary`). Defaults to `bg-white`. |
| `rounded_classes` | `top`, `bottom` | Applies `rounded-t-4xl` and/or `rounded-b-4xl` based on boolean toggles. |

**Example Implementation:**
```twig
<section class="{{ settings.bg_class(fields.background_colour) }} {{ settings.rounded_classes(fields.rounded_top, fields.rounded_bottom) }}">
  ...
</section>
```

---

### 🧱 ACF Setup (If Applicable)

**Field Group:** `[Group Name]`  
**Location:** `[Template, Post Type, or Options Page]`  

**Fields:**
- `field_one` (Text)
- `field_two` (Image)
- `field_three` (Repeater → sub fields: `title`, `quote`, etc.)

ACF export: [`acf-export-[block-name].json`](acf/acf-export-[block-name].json)

Import this JSON into ACF on new projects to instantly recreate the field structure.

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
<section class="[block-name]">
  {% for item in items %}
    {% include '_atoms/[related-atom].twig' with { item: item } %}
  {% endfor %}
</section>
```
