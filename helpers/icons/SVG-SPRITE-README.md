#### SVG Sprite

- All icons are stored as `<symbol>` elements inside `_assets/images/icons-sprite.svg` and have an ID.
- Access them anywhere in Twig via the `icon()` function.
- The third argument being optional keeps it flexible per context (`text-xl` in one place, `w-4 h-4` in another).

**Syntax:**
```twig
{{ function('icon', 'icon-name', 'optional classes') }}

**Examples:**
{{ function('icon', 'arrow-right') }}
{{ function('icon', 'facebook', 'text-primary text-xl') }}

