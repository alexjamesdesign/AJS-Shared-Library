# 📝 Quick Prompt: Add New Block to AJS Shared Library

Save this prompt and use it whenever you add a new block to your shared library.

---

## Prompt Template

```
I've added a new block to the shared library at `blocks/[BLOCK-NAME]/`. 

Please help me standardize it following the AJS Shared Library v1 structure:

1. Move any existing files to the proper locations:
   - .twig files → v1/_views/_blocks/
   - JS files → v1/_assets/js/core/
   - CSS/SCSS files → v1/_assets/styles/
   - PHP files → v1/_functions/
   - ACF JSON → v1/acf/
   - Standard block settings → v1/_views/_atoms/block_settings.twig (Copy from `sectors` or `TEMPLATE-BLOCK`)

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

The block is currently at: [DESCRIBE CURRENT STATE]

Dependencies: [LIST DEPENDENCIES]
```

---

## How to Use

1. **Create the block folder** (manual or via workflow)
2. **Add your files** (.twig, .js, .scss, etc.)
3. **Run the prompt** with Antigravity
4. **Review** the generated README and structure

---

## Quick Setup Commands

**Option 1: Create structure first (recommended)**
```bash
cd /Users/alex.dudley/DSites/freelance/AJS-Shared-Library/blocks
mkdir -p [block-name]/v1/{_views/{_blocks,_components,_layout},_assets/{images,js/core,styles/partials},_functions,acf}
touch [block-name]/v1/_functions/.gitkeep [block-name]/v1/acf/.gitkeep
```

**Option 2: Just create the folder and let Antigravity do the rest**
```bash
mkdir -p [block-name]
# Add your files, then run the prompt
```

---

## Example Usage

**Adding a "testimonials-grid" block:**

1. Create folder:
   ```bash
   mkdir -p testimonials-grid
   ```

2. Add your testimonials-grid.twig file to the folder

3. Run prompt:
   ```
   I've added a new block to the shared library at `blocks/testimonials-grid/`. 
   
   Please help me standardize it following the AJS Shared Library v1 structure...
   
   The block is currently at: just a single testimonials-grid.twig file
   
   Dependencies: none
   ```

4. Antigravity will:
   - Create the v1 folder structure
   - Move your .twig file to v1/_views/_blocks/
   - Create a comprehensive README
   - Add .gitkeep files
   - Verify everything is correct

---

## Alternative: Use Workflow

You can also use the workflow command:
```
/add-block
```

Then follow the instructions and ask Antigravity to help with step 5.
