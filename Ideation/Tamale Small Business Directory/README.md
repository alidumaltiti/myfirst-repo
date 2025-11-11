Tamale TVET Marketplace — Local changes

What I changed (summary):

- Fixed JavaScript errors:
  - Removed duplicate recursive performSearch function.
  - Added a missing `createProviderCard` function to render provider cards.
  - Added a click handler for the nav `#login-btn` to open the login modal.

- Improved HTML & accessibility:
  - Fixed the login modal (proper labels, required attributes, form submit handling, ARIA attributes).
  - Replaced several inline styles with CSS utility classes for consistency.

- Styling:
  - Added utility classes to `styles.css` (.accent-blue, .bg-accent-blue, .bg-tamale-orange, .bg-charcoal) to modernize the look and remove inline styles.

Files edited:
- `index.html` — accessibility improvements, removed inline styles, login modal fixes
- `styles.css` — added utility classes
- `marketplace.js` — bug fixes and added `createProviderCard` implementation

How to preview locally:

1. Open `index.html` in a browser. On Windows you can right-click the file and choose "Open with" -> your browser.
2. Alternatively, run a simple static server (recommended) and visit http://localhost:PORT
   - With Python 3: `python -m http.server 8000`
   - Then open: http://localhost:8000/index.html

Next suggested steps (optional):
- Replace remote example images with local optimized assets in the `resources/` folder.
- Add unit tests for key JS functions (e.g., search, filter logic).
- Make the nav responsive (mobile menu toggle) and improve keyboard navigation.

If you'd like, I can continue and update `register.html` and `admin.html` to remove inline styles and improve their accessibility as well.
