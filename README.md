Example contents:

```md
# Alex James Shared WordPress Blocks Library

Reusable blocks and components compatible with the WordPress boilerplate.

**Current Blocks:**
- Hero (hero.php, hero.scss, hero.js)
- USPs (usps.php, usps.scss)
- Testimonials (testimonials.php, testimonials.scss)

**Usage**
1. Copy the desired block folder into your theme’s `_blocks/` directory.
2. Copy its `acf-export.json` into your theme’s `acf-json/` directory.
3. Ensure you register the block (if needed) in your theme’s ACF loader file.
4. Compile assets via your build pipeline.

**Note:** All blocks follow the Windsurf rule set defined in `/windsurf-rules/wordpress-boilerplate/rules.yaml`.
