---
description: Add a new block to the AJS Shared Library following the standardized v1 structure
---

# Add New Block to Shared Library

Use this workflow when adding a new block to the AJS Shared Library.

## Steps

// turbo
1. Create the new block's v1 folder structure:
```bash
cd /Users/alex.dudley/DSites/freelance/AJS-Shared-Library/blocks
mkdir -p [block-name]/v1/{_views/{_blocks,_components,_layout},_assets/{images,js/core,styles/partials},_functions,acf}
```

// turbo
2. Add .gitkeep files to preserve empty directories:
```bash
touch [block-name]/v1/_functions/.gitkeep [block-name]/v1/acf/.gitkeep
```

3. Create the main block template file:
```bash
touch [block-name]/v1/_views/_blocks/[block-name].twig
```

4. Copy and customize the README template:
```bash
cp TEMPLATE-BLOCK/v1/README.md [block-name]/v1/README.md
```

5. Ask Antigravity to standardize the new block:

**Prompt to use:**
```
I've added a new block to the shared library at `blocks/[block-name]/`. 

Please help me standardize it following the AJS Shared Library v1 structure:

1. Move any existing files to the proper locations:
   - .twig files → v1/_views/_blocks/
   - JS files → v1/_assets/js/core/
   - CSS/SCSS files → v1/_assets/styles/
   - PHP files → v1/_functions/
   - ACF JSON files → v1/acf/

2. Create a comprehensive README.md at v1/README.md that includes:
   - Block description and purpose
   - File structure overview
   - Twig usage examples
   - JavaScript implementation (if applicable)
   - ACF field setup (if applicable)
   - Styling notes
   - Dependencies and tips

3. Verify the structure follows the standard v1 format with:
   - _views/_blocks/
   - _views/_components/
   - _assets/images/
   - _assets/js/core/
   - _assets/styles/partials/
   - _functions/
   - acf/

4. Ensure no fonts/ or addon/ folders are created.

The block is currently at: [describe current state - e.g., "just a single .twig file" or "has .twig, .js, and .scss files"]

Dependencies: [list any - e.g., "Tiny Slider", "Leaflet", "none"]
```

---

## Quick Reference

**Standard v1 Structure:**
```
[block-name]/
└── v1/
    ├── README.md
    ├── screenshot.png (optional)
    ├── acf/
    ├── _assets/
    │   ├── images/
    │   ├── js/core/
    │   └── styles/partials/
    ├── _functions/
    └── _views/
        ├── _blocks/
        ├── _components/
        └── _layout/
```

---

## Example

Adding a "testimonials" block:

```bash
cd blocks
mkdir -p testimonials/v1/{_views/{_blocks,_components,_layout},_assets/{images,js/core,styles/partials},_functions,acf}
touch testimonials/v1/_functions/.gitkeep testimonials/v1/acf/.gitkeep
touch testimonials/v1/_views/_blocks/testimonials.twig
cp TEMPLATE-BLOCK/v1/README.md testimonials/v1/README.md
```

Then ask Antigravity to help standardize and document it.
