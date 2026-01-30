# Sectors Block

A versatile WordPress/Timber block that displays sector information with optional image or Google Map, sector list, floating action button (FAB), and call-to-action.

## Features

- **Flexible Media Display**:
  - Image mode with responsive breakpoints and lazy loading support
  - Optional gradient overlay with adjustable opacity
  - Google Maps integration with location search
  
- **Content Sections**:
  - Tagline, title, and rich text description
  - Sectors list pulled from Site Options (centralized management)
  - Floating Action Button (FAB) - positioned differently on mobile vs desktop
  - Call-to-action tag component
  
- **Customization Options**:
  - Background color selection
  - Rounded corners (top/bottom)
  - Watermark image with position control
  - Copy position (left/right)
  
- **Animations**:
  - Fade-in viewport transitions
  - Parallax watermark effect

## Dependencies

### Required

- **WordPress** with Gutenberg editor
- **ACF Pro** (Advanced Custom Fields)
- **Timber/Twig** for templating
- **TailwindCSS** (or equivalent utility-first CSS framework)
- **jQuery** for JavaScript functionality

### Custom Twig Filters

The `picture.twig` component requires custom Twig filters to be registered in your theme:
- `resize` - Resize images
- `towebp` - Convert to WebP format
- `tojpg` - Convert to JPG format
- `url_encode` - URL encoding for map locations

### Optional

- Location shortcode `[loc case="title"]` - used in `call-tag.twig`

## File Structure

```
v1/
├── _views/
│   ├── _blocks/
│   │   └── sectors.twig          # Main block template
│   ├── _components/
│   │   ├── picture.twig           # Responsive image component
│   │   ├── button.twig            # Button component
│   │   └── call-tag.twig          # Call-to-action tag
│   └── _atoms/
│       ├── block_settings.twig    # Background/rounded corner macros
│       └── watermark.twig         # Watermark overlay component
├── _assets/
│   ├── js/core/
│   │   ├── transitions.js         # Fade-in viewport animations
│   │   ├── parallax.js            # Parallax watermark effect
│   │   └── call-tag-responsive.js # Responsive button handling
│   ├── styles/
│   │   └── overlays.css           # Gradient overlay styles
│   └── images/
│       └── icons-sprite.svg       # SVG icon sprite (phone, arrow-right)
├── _functions/
│   ├── Icons.php                  # Icon helper function
│   └── GutenbergBlocks.php        # Block registration system
├── acf/
│   ├── group_693558b3193eb.json   # Sectors block fields
│   └── group_61b87c19518b4.json   # Site Options (sectors_covered)
└── README.md                      # This file
```

### 🎨 Standard Block Settings

This block uses standardized settings for background and corners:

**Fields Required:**
- `background_colour` (Select/Color)
- `rounded_top` (Toggle)
- `rounded_bottom` (Toggle)

**Implementation:**
```twig
{% import "_atoms/block_settings.twig" as settings %}
<section class="relative ... {{ settings.bg_class(fields.background_colour) }} {{ settings.rounded_classes(fields.rounded_top, fields.rounded_bottom) }}">
```

### 🧱 ACF Setup
Field Structure

### Block Fields (`group_693558b3193eb.json`)

**Sectors Block Content Tab:**
- `sectors_tagline` (Text) - Subtitle/tagline
- `sectors_title` (Text) - Main heading
- `copy_block` (WYSIWYG) - Rich text description
- `fab_button` (Link) - Floating action button

**Sectors Image Section Tab:**
- `sectors_media_type` (Select) - Choice between "Image" or "Google Map"
- `sectors_map_location` (Text) - Location for Google Map (conditional)
- `sectors_image` (Image) - Featured image (conditional)
- `sectors_enable_overlay` (True/False) - Enable gradient overlay
- `sectors_overlay_opacity` (Number) - Overlay opacity % (0-100, default 40)

**Block Settings Tab:**
- `background_colour` (Select) - Background color options
- `rounded_top` (True/False) - Rounded top corners
- `rounded_bottom` (True/False) - Rounded bottom corners
- `copy_position` (Select) - Left or Right
- `watermark` (Image) - Optional watermark image
- `watermark_position` (Select) - Watermark position (6 options)

### Site Options Fields (`group_61b87c19518b4.json`)

**Sectors Tab:**
- `sectors_covered` (Repeater)
  - `sector_name` (Text) - Name of the sector

> **Note**: The sectors list is managed centrally in Site Options and displayed across all instances of this block.

## Installation

### 1. Copy Files

Copy all files from this directory to your theme:

```bash
# Twig templates
_views/_blocks/sectors.twig → your-theme/_views/_blocks/
_views/_components/ → your-theme/_views/_components/
_views/_atoms/ → your-theme/_views/_atoms/

# JavaScript
_assets/js/core/ → your-theme/_assets/js/core/

# CSS
_assets/styles/overlays.css → your-theme/_assets/styles/

# PHP functions
_functions/Icons.php → your-theme/_functions/
_functions/GutenbergBlocks.php → your-theme/_functions/

# SVG icons
_assets/images/icons-sprite.svg → your-theme/_assets/images/

# ACF JSON
acf/ → your-theme/acf-json/
```

### 2. Register Block

Ensure `GutenbergBlocks.php` is included in your theme's `functions.php`:

```php
require_once get_template_directory() . '/_functions/GutenbergBlocks.php';
require_once get_template_directory() . '/_functions/Icons.php';
```

### 3. Import ACF Fields

1. Place JSON files in `your-theme/acf-json/`
2. ACF will automatically detect and sync them
3. Alternatively, import via ACF Tools → Import

### 4. Enqueue Assets

Add to your theme's enqueue function:

```php
// CSS
wp_enqueue_style('overlays', get_template_directory_uri() . '/_assets/styles/overlays.css');

// JavaScript
wp_enqueue_script('transitions', get_template_directory_uri() . '/_assets/js/core/transitions.js', array('jquery'), null, true);
wp_enqueue_script('parallax', get_template_directory_uri() . '/_assets/js/core/parallax.js', array('jquery'), null, true);
wp_enqueue_script('call-tag-responsive', get_template_directory_uri() . '/_assets/js/core/call-tag-responsive.js', array('jquery'), null, true);
```

### 5. Register Custom Twig Filters

Add these filters to your theme (example using Timber):

```php
add_filter('timber/twig', function($twig) {
    $twig->addFilter(new \Twig\TwigFilter('resize', function($url, $w, $h = null, $crop = 'center') {
        return \Timber\ImageHelper::resize($url, $w, $h, $crop);
    }));
    
    $twig->addFilter(new \Twig\TwigFilter('towebp', function($url) {
        // Your WebP conversion logic
        return str_replace(['.jpg', '.png'], '.webp', $url);
    }));
    
    $twig->addFilter(new \Twig\TwigFilter('tojpg', function($url) {
        // Your JPG conversion  logic
        return $url;
    }));
    
    return $twig;
});
```

## Usage

1. **Add Sectors to Site Options**:
   - Go to WordPress Admin → Site Options → Sectors tab
   - Add your sectors using the repeater field
   
2. **Add Block to Page**:
   - Edit any page with Gutenberg
   - Add the "Sectors" block
   - Configure fields as needed
   
3. **Configure Block Settings**:
   - Set tagline and title
   - Choose between image or map
   - Add rich text description
   - Configure background, rounded corners, watermark
   - Add optional FAB button

## Customization

### Color Palette

Update the TailwindCSS color classes or modify the ACF field choices in the JSON:

```json
"choices": {
    "bg-white": "None",
    "bg-tertiary": "Light Green",
    "bg-your-color": "Your Color Name"
}
```

### Icon Sprite

Add additional icons to `icons-sprite.svg` as needed:

```xml
<symbol id="icon-your-icon" viewBox="0 0 24 24">
  <path d="..."/>
</symbol>
```

Then reference in templates:

```twig
{{ function('icon', 'your-icon', 'w-6 h-6') }}
```

### Gradient Overlay Colors

Modify in `overlays.css`:

```css
.gradient-overlay {
  background: linear-gradient(180deg, #144A69 0%, #99F2BA 100%);
  opacity: 0.4;
  pointer-events: none;
}
```

## Site-Specific Customizations (Greenbox)

The following customizations were made for the Greenbox site that you may want to adjust:

1. **Hardcoded defaults**:
   - Default tagline: "Domestic Skips | Commercial Waste Management"
   - Default title: "Sectors We Help"
   - Background color options specific to brand colors

2. **Call-tag button defaults**:
   - Default "Order Online" button pointing to specific URL
   - Location-based phone number shortcode

3. **Color classes**: 
   - `text-primary`, `text-primary-light`, `bg-secondary`, etc.
   - Update these to match your theme's color names

4. **Sizing**:
   - FAB min-height: 56 (14rem)
   - Map heights: 300px mobile, 550px desktop
   - Sticky positioning: `lg:top-[150px]`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires IntersectionObserver API for transitions (graceful fallback included)
- Requires ResizeObserver API for call-tag responsive behavior (fallback to window resize)

## Notes

- The block pulls sectors from a centralized Site Options repeater field, allowing global management
- The FAB button displays differently on mobile (regular button) vs desktop (floating positioned)
- Images use responsive breakpoints with WebP support for optimal performance
- The watermark has parallax scrolling effect for visual interest

## Version

**v1** - Initial release

## License

Proprietary - AJS Design Library

## Support

For questions or issues, contact Alex James Design.
