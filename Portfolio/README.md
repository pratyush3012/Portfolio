# Pratyush Sharma — Portfolio

A modern, single-page 3D portfolio showcasing experience, education, projects, and skills. It features a liquid glass aesthetic, glassmorphism panels, motion/tilt effects, and a lightweight Three.js background.

## Preview
Open `index.html` in your browser to see the site. The background uses animated translucent blobs, a parallax image, and interactive 3D tilts.

## Features
- Glassmorphism UI with gradients and animated sheen
- Responsive layout (two-column desktop → single-column mobile)
- Parallax background image with subtle motion
- Three.js background with animated translucent blobs
- Interactive 3D tilt on panels and avatar
- Accessible semantics (semantic `nav`, heading order)
- Reduced-motion support (CSS + JS gates)
- SEO/meta tags, favicon, and preconnect

## Tech Stack
- HTML5 + CSS3
- Vanilla JavaScript (no frameworks)
- [Three.js](https://threejs.org/) via CDN
- Google Fonts (Inter)

## Getting Started
You can simply open the HTML file in a browser, or use a small local server for best results.

### Option 1: Open directly
- Double-click `index.html` to open in your default browser.

### Option 2: Run a local server (recommended)
This ensures consistent behavior for all APIs and is useful for mobile testing.

- Using Python (comes with macOS):
  - Python 3: `python3 -m http.server 8080`
  - Visit: `http://localhost:8080`

- Using Node (if installed):
  - `npx serve --single --listen 8080`
  - Visit: `http://localhost:8080`

## Project Structure
```
/ (project root)
├─ index.html        # Main page with inline CSS and JS
├─ avtar.png         # Avatar image (used as favicon too)
├─ background.jpg    # Background image (parallax and OG image)
└─ README.md         # This guide
```

## Customization
- Name, subtitle, bio: edit inside the `<!-- Hero -->` section.
- Email/LinkedIn links: update the anchors in the `actions` div.
- Education/Experience/Projects/Skills: update the corresponding sections with your content.
- Avatar: replace `avtar.png` with your image (keep the same filename or update the `<img>` src and the `<link rel="icon">`).
- Background: replace `background.jpg` (consider using a compressed `.webp` for performance).
- Colors and design tokens: update CSS variables in the `:root { ... }` block.
- Motion: tweak or disable motion by adjusting the reduced-motion CSS and the `prefers-reduced-motion` gates in JS.

## Performance Tips
- Convert `background.jpg` to `background.webp` and update the inline style URL.
- Keep avatar to ~200×200 for fast LCP.
- Use `defer` (already set) for any additional scripts.

## Accessibility
- Semantic `<nav aria-label="Primary">` and heading levels use `h1` → `h2`.
- Reduced motion is respected via CSS and JS.

## SEO & Social
- Editable meta tags live in the `<head>` of `index.html`:
  - `description`, `author`, Open Graph (`og:*`), and Twitter card.
- `background.jpg` is used for social previews. Replace with your own if desired.

## Deployment
- GitHub Pages:
  1. Push the repo to GitHub
  2. In the repository settings → Pages, select `main` branch and `/ (root)`
  3. Wait for the site to build and use the provided URL
- Netlify/Vercel: drag-and-drop the folder or connect the repository.

## Notes
- On iOS, device orientation input may require user permission. The site gates motion with `prefers-reduced-motion`; users who prefer less motion get a static experience.

## License
Personal portfolio — feel free to use this structure as inspiration. If you reuse the design, please credit or link back.
