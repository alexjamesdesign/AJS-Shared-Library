# 📝 Quick Prompt: Extract Block from Website to Shared Library

Save this prompt and use it when you're in a website project and want to extract a block to add to your shared library.

---

## Prompt Template

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
   /Users/alex.dudley/DSites/freelance/AJS-Shared-Library/blocks/[BLOCK-NAME]/v1/

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

Current block location: [PATH TO FILES IN CURRENT WEBSITE]
Block name to use in library: [DESIRED GENERIC NAME]
Dependencies: [LIST ANY - e.g., "Tiny Slider", "none"]
```

---

## How to Use

**When in a website project:**

1. **Identify the block** you want to extract (e.g., a hero, carousel, pricing table)
2. **Note the file locations** (main .twig file at minimum)
3. **Run the prompt** with Antigravity
4. **Review** the extracted files in the shared library

---

## Real-World Example

**You're in:** `/Users/alex.dudley/DSites/greenbox-kent/`

**You want to extract:** The "sectors" carousel block

**You say:**
```
I want to extract the sectors block from this website and add it to my AJS Shared Library.

Please help me:
[...full prompt from above...]

Current block location: _views/_blocks/sectors.twig
Block name to use in library: sectors-carousel
Dependencies: Tiny Slider
```

**Antigravity will:**
- Find `_views/_blocks/sectors.twig`
- Look for related JS in `_assets/js/`
- Find ACF JSON in `acf-json/`
- Copy everything to `/AJS-Shared-Library/blocks/sectors-carousel/v1/`
- Create organized structure with README
- Clean up "Greenbox Kent" specific code

---

## Quick Checklist

Before extracting, ask yourself:

- [ ] Is this block **reusable** across multiple sites?
- [ ] Does it have a **generic purpose**? (not too site-specific)
- [ ] Do I know what **dependencies** it uses?
- [ ] Have I chosen a **descriptive, generic name**?

If yes to all, extract away! 🚀

---

## Alternative: Use Workflow

You can also use the workflow command:
```
/extract-block
```

Then provide the details when prompted.

---

## After Extraction

Once in the shared library, you can use it in future projects with the `/add-block` workflow or by asking:

```
Please implement the [block-name] from my shared library into this website
```
