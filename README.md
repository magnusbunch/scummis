# Sills Cummis & Gross - Marketing Website

A modern, professional 3-page marketing website for Sills Cummis & Gross, a U.S. business law firm.

## Features

- **Modern Design**: Contemporary, visually exciting UI with gradients, animations, and smooth transitions
- **Responsive**: Mobile-first design that looks great on all devices
- **Fast**: Pure HTML5, CSS3, and vanilla JavaScript - no frameworks
- **Accessible**: Semantic HTML and WCAG AA compliant
- **Interactive**: Smooth animations, scroll effects, and form validation

## Pages

- **index.html** - Home page with hero, practice areas, benefits, and recognition
- **about.html** - About the firm with team, services, and recognitions
- **contact.html** - Contact page with form and office information

## Tech Stack

- HTML5
- Modern CSS3 (Flexbox, CSS Grid, Gradients, Animations)
- Vanilla JavaScript (no dependencies)

## Structure

```
├── index.html          # Home page
├── about.html          # About the firm
├── contact.html        # Contact & inquiry
├── styles.css          # Global styles
├── script.js           # JavaScript functionality
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Features

### Design
- Gradient backgrounds and text effects
- Smooth hover animations
- Card elevation on interaction
- Modern color palette (blue, cyan, purple)
- Floating background elements
- Shine effects on images

### Functionality
- Form validation (front-end)
- Active navigation highlighting
- Scroll-triggered animations
- Smooth scrolling
- Responsive layout

### Accessibility
- Semantic HTML5 elements
- ARIA labels where appropriate
- Good color contrast
- Keyboard navigation support
- Reduced motion preferences respected

## Getting Started

Simply open `index.html` in any modern web browser. No build process or dependencies required.

### Local Development

```bash
# Navigate to the project folder
cd scummis

# Open in your browser
# - macOS: open index.html
# - Windows: start index.html
# - Linux: xdg-open index.html
```

## Browser Support

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Color Palette

- **Primary Dark**: #0f1b2e
- **Primary Light**: #1a3a52
- **Accent Blue**: #2563eb
- **Accent Cyan**: #06b6d4
- **Accent Purple**: #7c3aed

## Customization

All design tokens (colors, spacing, fonts) are defined in CSS custom properties in `styles.css`:

```css
:root {
    --primary-dark: #0f1b2e;
    --accent-blue: #2563eb;
    /* ... more variables ... */
}
```

## Assets (Images & Logo)

The hero slideshow uses local images stored in an `assets/` folder. Please place the images you provided into the `assets/` folder with these exact filenames so the slideshow displays correctly:

```
assets/logo.png        # square logo (used in slide header)
assets/slide-1.jpg     # slide 1 - library / statues image
assets/slide-2.jpg     # slide 2 - meeting room image
assets/slide-3.jpg     # slide 3 - bright boardroom image
assets/slide-4.jpg     # optional extra slide; bookshelf closeup
assets/slide-5.jpg     # optional extra slide; additional bookshelf
```

Once the files are placed there the slideshow will use the local images automatically. If you want me to commit the image files, upload them to the project folder and I will add, commit, and push them for you.

Simply update these values to customize the entire site.

## License

© 2025 Sills Cummis & Gross. All rights reserved.

---

**Built with** ❤️ **and** ✨ **modern web standards**
