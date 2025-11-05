# Picture Component

## Overview

Responsive image component that generates optimized `<picture>` elements with WebP/JPEG formats and responsive breakpoints. Supports lazy loading for optimal performance.

**Location**: `_views/_components/picture.twig` or `_views/_atoms/picture.twig`

## Key Features

- Multiple image formats (WebP + JPEG fallback)
- Responsive breakpoints with custom sizes
- Lazy loading support
- Timber integration (`resize`, `towebp`, `tojpg`)
- Flexible sizing and crop control
- Accessibility with alt text support

## Component Parameters

### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `source` | String/Object | Image source URL or Timber image object |

### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lazyload` | Boolean | `true` | Enable/disable lazy loading |
| `pictureClasses` | String | `''` | CSS classes for the `<picture>` element |
| `breakpoints` | Object | `{}` | Responsive breakpoint definitions |
| `img` | Object | `{}` | Image element configuration |

### Breakpoints Object Structure

Each breakpoint key should be a CSS media query width (e.g., `"768px"`, `"1024px"`), with the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `w` | Integer | `1000` | Image width in pixels |
| `h` | Integer/null | `null` | Image height in pixels (null = auto) |
| `crop` | String | `'center'` | Crop position: 'center', 'top', 'bottom', 'left', 'right' |

### Image Object Structure

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `classes` | String | `''` | CSS classes for the `<img>` element |
| `w` | Integer | `640` | Default image width |
| `h` | Integer/null | `null` | Default image height (null = auto) |
| `crop` | String | `'center'` | Crop position |
| `alt` | String | `post_title` | Alt text for accessibility |

## Usage Examples

### Basic Card/Thumbnail

```twig
{% include "_components/picture.twig" with {
    source: image,
    lazyload: false,
    pictureClasses: 'w-full aspect-video',
    img: {
        classes: 'w-full h-full object-center object-cover',
        w: 640,
        h: 360,
        crop: 'center',
        alt: image.alt,
    }
} %}
```

### Hero with Responsive Breakpoints

```twig
{% include "_components/picture.twig" with {
    source: featured_image,
    lazyload: false,
    pictureClasses: 'w-full h-full',
    breakpoints: {
        "1530px" : { w: 1400, h: null, crop: 'center' },
        "1280px" : { w: 1200, h: null, crop: 'center' },
        "1024px" : { w: 1000, h: null, crop: 'center' },
        "1px" : { w: 640, h: null, crop: 'center' },
    },
    img: {
        classes: 'w-full h-full object-center object-cover',
        w: 640,
        h: null,
        crop: 'center',
        alt: featured_image.alt,
    }
} %}
```

### Lazy Loaded (Below Fold)

```twig
{% include "_components/picture.twig" with {
    source: post.thumbnail.src,
    lazyload: true,
    breakpoints: {
        "768px" : { w: 1024, h: 500, crop: 'center' },
        "1px" : { w: 640, h: 640, crop: 'center' },
    },
    img: {
        classes: 'lazyload',
        w: 640,
        h: 640,
        crop: 'center',
    }
} %}
```

## How It Works

- Generates WebP and JPEG `<source>` elements for each breakpoint
- Browser automatically selects best supported format
- Breakpoints defined in descending order (largest first)
- Lazy loading uses `data-srcset` attribute (requires lazysizes or similar)
- Uses Timber filters: `resize()`, `towebp`, `tojpg`

## Best Practices

**Image Sizing**
- Match dimensions to display size (e.g., 640px for cards, 1400px for heroes)
- Mobile: 640-800px | Tablet: 1000-1200px | Desktop: 1400-1800px

**Lazy Loading**
- `lazyload: false` → Above-fold, hero images, critical content
- `lazyload: true` → Below-fold, galleries, long pages

**Breakpoints**
- Define in descending order (largest first)
- Match your design's layout changes

**Accessibility**
- Always provide alt text: `alt: image.alt|default(post.title)`

**Styling**
- Use aspect ratio classes: `aspect-video`, `aspect-square`, `aspect-[4/3]`
- Use `object-cover` for consistent display in fixed containers

## Quick Reference

**Card/Thumbnail Pattern**
- Fixed aspect ratio, no lazy loading
- Use `aspect-video` or `aspect-square`
- Width: 640px, Height: 360px (16:9)

**Hero Pattern**
- Multiple breakpoints, no lazy loading
- Descending breakpoints: 1530px → 1280px → 1024px → 1px
- Widths: 1400px → 1200px → 1000px → 640px

**Lazy Load Pattern**
- Set `lazyload: true`
- Add `lazyload` class to img.classes
- Use for below-fold content

## Troubleshooting

- **Images not loading**: Check source parameter, verify Timber is active
- **Wrong size**: Verify breakpoints in descending order, check w/h values
- **Lazy load not working**: Ensure lazysizes library is loaded
- **No WebP**: Check server WebP support and Timber filters