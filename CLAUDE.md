# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a static portfolio website for Shreeansh Srivastava, a Cloud-first Software Engineer. The portfolio is built using vanilla HTML, CSS, and JavaScript with a focus on a terminal-inspired dark theme aesthetic.

## Architecture and Structure

### Core Files
- `index.html` - Main HTML structure with semantic sections (hero, about, skills, certifications, experience, projects, education, contact)
- `app.js` - JavaScript functionality including navigation, scroll effects, modal handling, and form interactions
- `style.css` - Comprehensive CSS with dark theme variables, responsive design, and terminal-inspired styling
- `DSC04111-PhotoRoom.png-PhotoRoom.png` - Profile image
- `Shreeansh_Srivastava_Resume_2025.pdf` - Downloadable resume

### Case Study Content
- `CaseStudy/` directory contains project documentation and images
- Case studies are embedded in JavaScript objects within `app.js`
- Images are referenced for visual documentation of project architectures

## Key Design Patterns

### Theme System
- Uses CSS custom properties (variables) for consistent theming
- Dark theme with terminal/monospace aesthetic using JetBrains Mono font
- Color scheme based on accent colors: primary (#E879F9), secondary (#10B981), tertiary (#3B82F6)

### JavaScript Architecture
- Event-driven architecture with DOMContentLoaded initialization
- Modular functions for different features (navigation, modals, forms, animations)
- Intersection Observer API for scroll-based animations
- Modal system for displaying detailed case studies

### Responsive Design
- Mobile-first approach with breakpoints at 768px, 1024px, and 480px
- CSS Grid and Flexbox for layout management
- Collapsible navigation for mobile devices

## Development Workflow

### No Build Process Required
This is a static website that can be served directly from any web server or opened locally in a browser. No compilation, bundling, or build steps are needed.

### Development Commands
```bash
# Serve locally (using any static server)
python -m http.server 8000
# or
npx serve .
# or simply open index.html in a browser
```

### Testing
- Test responsive design across different screen sizes
- Verify modal functionality for case studies
- Check form behavior (currently uses mailto links)
- Validate smooth scrolling navigation
- Test accessibility features and keyboard navigation

## Content Management

### Adding New Projects
1. Add project card HTML to the `.projects-grid` section in `index.html`
2. Add corresponding case study data to the `caseStudies` object in `app.js`
3. Ensure proper data-project attributes match the case study keys

### Updating Case Studies
- Case study content is stored as HTML strings in the `caseStudies` object in `app.js:228-541`
- Images should be placed in the `CaseStudy/` directory
- Use the established HTML structure with `.case-study-section` classes

### Modifying Skills
- Skills are organized in categories within the `.skills-grid` section
- Each skill uses `.skill-badge` class with icons and descriptive titles
- Categories include: Languages & Frameworks, Frontend Technologies, Cloud Platforms, Integration Services, DevOps & Infrastructure, Authentication & Security, and Domains

## Key Features

### Interactive Elements
- Smooth scrolling navigation with active link highlighting
- Case study modals with detailed project information
- Contact form that generates mailto links
- Responsive hamburger menu for mobile
- Scroll-based animations using Intersection Observer

### Accessibility
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus states for interactive elements
- High contrast color scheme

### Performance Optimizations
- Preloading of critical fonts
- CSS animations with requestAnimationFrame
- Optimized images and minimal external dependencies
- Throttled scroll event handlers

## Browser Compatibility
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Intersection Observer API for animations
- No polyfills included - targets modern browsers

## Deployment
This static site can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.) by serving the root directory contents.