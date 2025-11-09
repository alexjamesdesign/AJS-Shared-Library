# ⚙️ Gulp Build System

This WordPress theme uses a custom **Gulp 4** build process tailored for the  
Alex James Design boilerplate. It compiles **TailwindCSS**, bundles **ES6 JavaScript** via Rollup,  
and runs **BrowserSync** for live reloading during local development.

---

## 🧩 Overview

**Gulpfile location:**
```
wp-content/themes/{theme-name}/gulpfile.js
```

**Primary purpose:**
- Compile CSS via PostCSS + Tailwind
- Bundle and minify JavaScript via Rollup
- Watch for changes and reload BrowserSync
- Create production-ready builds

---

## 📁 File Structure

```
_assets/
├── styles/             → Tailwind + PostCSS input (main.css)
├── js/
│   ├── core/           → Global JS modules (bundled into production-dist.js)
│   └── addon/          → Page/feature-specific scripts (bundled separately)
└── images/             → Optional assets folder
dist/
├── main.min.css
└── production-dist.js
```

---

## ⚙️ Dependencies

### 🧱 Core build tools
- `gulp` – task runner
- `gulp-if` – conditionally run tasks (e.g., only minify in production)
- `yargs` – CLI flags (e.g., `--production`)
- `browser-sync` – local development server with live reload

### 🎨 CSS processing
- `postcss`, `postcss-import`, `postcss-nested`, `postcss-simple-vars`
- `tailwindcss` – utility-first CSS framework
- `autoprefixer` & `cssnano` – only run in production for prefixes & minification

### ⚡ JavaScript bundling
- `@rollup/stream`, `@rollup/plugin-multi-entry`
- `@rollup/plugin-commonjs`, `@rollup/plugin-node-resolve`
- `vinyl-source-stream`, `vinyl-buffer` – convert Rollup output for Gulp
- `gulp-terser` – ES6-safe JS minification

---

## 🧱 Tasks Overview

### 🧩 `gulp styles`
Compiles Tailwind and PostCSS into `dist/main.min.css`.

**Pipeline:**
1. Input: `_assets/styles/main.css`
2. Processors:
   - `postcss-import`, `postcss-nested`, `postcss-simple-vars`
   - `tailwindcss`
3. On `--production`: adds `autoprefixer` + `cssnano`
4. Output: `dist/main.min.css`
5. Triggers BrowserSync reload

```bash
gulp styles
gulp styles --production
```

---

### ⚙️ `gulp core-scripts`
Bundles all core JS files from `_assets/js/core/` into one browser-ready file.

**Pipeline:**
1. Input: `_assets/js/core/*.js`
2. Plugins:
   - `@rollup/plugin-commonjs`
   - `@rollup/plugin-node-resolve`
   - `@rollup/plugin-multi-entry`
3. On `--production`: minifies via `gulp-terser`
4. Output: `dist/production-dist.js`

```bash
gulp core-scripts
gulp core-scripts --production
```

---

### 🧩 Addon Scripts (dynamic)
Automatically detects and creates Gulp tasks for each JS file in `_assets/js/addon/`.  
Each file is bundled individually (useful for page-specific or modular scripts).

**Example output:**
```
dist/production-map.js
dist/production-slider.js
dist/production-contact.js
```

Each task mirrors `core-scripts` behaviour with Rollup + Terser.

---

### 👀 `gulp watch`
Watches for changes in:
- `_assets/styles/**/*.css`
- `_views/**/*.twig`
- `_assets/js/core/*.js`
- `_assets/js/addon/*.js`

Triggers the relevant tasks and reloads BrowserSync on save.

---

### 🖥️ `gulp serve`
Starts **BrowserSync** to proxy your local WordPress environment.

**Default settings:**
```js
proxy: 'greenbox.test',
files: ['**/*.php', '**/*.js', '**/*.twig', '**/*.css'],
ghostMode: false,
open: false,
notify: false
```

You can update the `proxy` to match your local domain.

---

### 🚀 `gulp default`
Runs all core tasks in parallel:
- `styles`
- `core-scripts`
- all addon JS tasks
- `watch`
- `serve`

**Usage:**
```bash
gulp
```

---

### 📦 `gulp build`
Creates a production-ready build:
- Compiles CSS with minification
- Bundles & minifies JS (core and addon)
- Skips watch/serve

**Usage:**
```bash
gulp build --production
```

---

## 🧰 CLI Commands Summary

| Command | Description |
|----------|-------------|
| `gulp` | Runs styles, scripts, watch, and serve (default dev mode) |
| `gulp styles` | Compiles CSS (Tailwind + PostCSS) |
| `gulp core-scripts` | Bundles core JS |
| `gulp build` | Production build for deployment |
| `gulp serve` | Runs BrowserSync local server |
| `gulp watch` | Watches files for changes and reloads browser |

---

## 🧾 Example Enqueue in WordPress

```php
// functions.php
wp_enqueue_style(
  'main',
  get_template_directory_uri() . '/dist/main.min.css',
  [],
  filemtime(get_template_directory() . '/dist/main.min.css')
);

wp_enqueue_script(
  'production',
  get_template_directory_uri() . '/dist/production-dist.js',
  [],
  filemtime(get_template_directory() . '/dist/production-dist.js'),
  true
);
```

---

## 💡 Tips

- Use `--production` flag when deploying live to enable minification.
- Keep `_assets/js/addon/` lightweight — only include scripts used conditionally.
- BrowserSync can proxy any `.test` domain used by Warden, MAMP, or Local.
- You can safely delete old `dist/` files — Gulp will recreate them.
- If you add a new addon JS file, restart Gulp so it’s picked up dynamically.

---

## 📚 References
- [Gulp Documentation](https://gulpjs.com/docs/en/getting-started/quick-start)
- [PostCSS Docs](https://postcss.org/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Rollup Docs](https://rollupjs.org/)
- [Tiny Slider Docs](https://github.com/ganlanyuan/tiny-slider)
