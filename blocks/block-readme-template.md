## 🧱 [Block Name Here]

[Brief 1–2 sentence description of what this block does and where it’s typically used.  
Example: “A full-width hero banner with heading, text, and optional background image pulled from ACF fields.”]

---

### 📁 Structure
```
_views/
└─ _blocks/
   └─ [block-name].twig           ← main block structure
_atoms/
└─ [related-atom].twig            ← optional component partials (cards, items, etc.)
_assets/
└─ js/
   └─ core/
      └─ [block-name].js          ← optional JS logic (e.g. slider init)
acf/
└─ acf-export-[block-name].json   ← optional ACF field export for reuse
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
