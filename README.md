# Josh Plaza - Personal Website

This is my (Josh Plaza) personal website showcasing my professional experience, skills, and career as a Senior Software Engineer based in Portland, Oregon.

## About This Site

This website was built using:
- HTML5 for structure
- CSS3 with a custom organization system for styling
- JavaScript for interactivity
- Custom fonts (Geist and GeistMono)
- PostHog for analytics tracking
- Claude Code

The site is intentionally designed to be lightweight, with no frameworks or build tools required, focusing on performance and simplicity while still providing a modern, responsive experience.

## Local Development

### Prerequisites

- Python 3.x (for local serving)

### Running Locally

To run the website locally:

1. Clone this repository
2. Navigate to the project directory
3. Run the server script:

```bash
./serve.sh
```

4. Open your browser and navigate to http://localhost:8000

### Troubleshooting

If you see styling issues:

- Make sure you're running the site via a local web server (not opening the HTML file directly) to avoid CORS issues
- Check that the fonts directory exists and contains the required font files
- If styles still look broken, the core-styles.css file should provide basic styling

## Project Structure

- `index.html` - Main HTML file
- CSS files:
  - `core-styles.css` - Minimal CSS for basic styling (fallback)
  - `tailwind-base.css` - Base styles and utility classes
  - `animations.css` - Animation effects
  - `social-icons.css` - Social media icon animations
  - `components.css` - UI component styles
  - `toast-notifications.css` - Toast notification styles
- JavaScript files:
  - `analytics.js` - Analytics tracking (disabled for local development)
  - `posthog-config.js` - PostHog configuration (disabled for local development)

## Fonts

The website uses custom fonts:
- Geist - Primary font for text
- GeistMono - Monospace font for code

These fonts should be placed in the `fonts` directory:
- `fonts/GeistVF.woff2`
- `fonts/GeistMonoVF.woff2`

If you don't have these font files, the site will fall back to system fonts.

## CSS Organization

The CSS files have been renamed and formatted for better maintainability:
- Original minified files have been split into logical components
- Files are properly formatted with consistent indentation
- CSS variables are used for theming

## Notes

- Analytics scripts are commented out for local development to avoid CORS issues
- The website should work with or without the custom fonts
- The site uses CSS custom properties (variables) for theming