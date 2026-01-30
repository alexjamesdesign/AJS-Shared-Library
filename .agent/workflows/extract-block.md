---
description: Extract a block from a website and add it to the AJS Shared Library
---

# Extract Block from Website to Shared Library

Use this workflow when you're working in a website and want to extract a block to add to the shared library.

## Steps

1. Identify the block files in the current website project

2. Ask Antigravity to extract and prepare the block:

**Prompt to use:**
```
I want to extract the [BLOCK-NAME] block from this website and add it to my AJS Shared Library.

Please help me:

1. Identify all related files for this block:
   - Twig templates (usually in _views/_blocks/ or _views/_components/)
   - JavaScript files (look for JS specific to this block)
   - CSS/SCSS files (if any block-specific styles)
   - PHP functions (in _functions/)
   - ACF JSON exports (in acf-json/)

2. Copy these files to the shared library at:
   `/Users/alex.dudley/DSites/freelance/AJS-Shared-Library/blocks/[block-name]/v1/`

3. Organize them in the v1 structure:
   - .twig → v1/_views/_blocks/
   - .js → v1/_assets/js/core/
   - .scss/.css → v1/_assets/styles/
   - .php → v1/_functions/
   - ACF JSON → v1/acf/

4. Create a comprehensive README.md that documents:
   - What the block does
   - Dependencies (Tiny Slider, Leaflet, etc.)
   - ACF field structure
   - How to implement it in new projects
   - Any customizations made in this website

5. Clean up any site-specific references:
   - Remove hardcoded URLs
   - Replace site-specific class names with generic ones
   - Make field names more generic if needed

6. Add a screenshot if possible from the current website

Current block location: [PATH TO BLOCK FILES]
Block name to use in library: [DESIRED NAME]
```

---

## Example

**Scenario:** You're in the Greenbox Kent website and want to extract the "order-online-cta" block

**You say:**
```
I want to extract the order-online-cta block from this website and add it to my AJS Shared Library.

Please help me:
[...full prompt...]

Current block location: _views/_blocks/order-online-cta.twig
Block name to use in library: order-online-cta
```

**Antigravity will:**
- Find the .twig file and any related JS/CSS
- Copy to shared library with proper v1 structure  
- Create README documenting the block
- Remove site-specific references
- Make it ready for reuse

---

## Quick Tips

- **Generic names:** Use descriptive, reusable names like "pricing-table" not "gbox-pricing"
- **Dependencies:** Note all JS libraries used (Tiny Slider, Swiper, etc.)
- **Screenshots:** Great for visual reference in the library
- **Test it:** After extraction, verify no site-specific code remains
