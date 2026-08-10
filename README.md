# Andalusia — Local Wikipedia Mockup

A basic, fully local Wikipedia-style mockup for the fictional nation of Andalusia.

## Run

You can open `index.html` directly, but using a tiny local server is recommended:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

## Files

- `index.html` — article structure and nation information
- `style.css` — Wikipedia-like styling
- `script.js` — search, navigation, printing, dark mode and small UI interactions
- `images/flag.jpg` — supplied Andalusian flag
- `images/coat-of-arms.jpg` — supplied coat of arms

## Note

The current build uses only information that was present in the supplied PDF mockup. Sections whose detailed content was not present in the PDF are deliberately marked as placeholders rather than inventing lore.
