# Flatlay

A digital closet that turns photos of your clothes into styled outfit pairings.

- **Closet** — photograph or upload a piece of clothing; its dominant color is detected automatically from the image, and you tag its category and (optionally) give it a name.
- **Outfits** — generates outfit pairings using color-harmony rules (complementary, analogous, neutral) computed entirely client-side, with a shuffle for more options.
- **Saved** — keep favorite looks.
- **Preview on you** — add a photo of yourself and see an outfit's pieces overlaid on it (a quick styling mock-up, not a photorealistic try-on).

Installable as a PWA: open `index.html` in a browser, then "Add to Home Screen" on iOS/Android for a full-screen, app-like experience with offline support for the app shell.

## Storage

This static build has no backend. Closet items, favorites, and your photo are kept in memory for the current browser session only — nothing persists across reloads.

The version published as a [Claude Artifact](https://claude.ai) uses the platform's `db`/`assets` capabilities for real persistence (private to the owner). Those calls no-op safely here (`window.claude` isn't present outside that runtime), so the app still works — it just won't remember your closet between visits.

## Running locally

No build step — it's a single static page plus a manifest, service worker, and icons.

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/index.html`.

## Tech

Vanilla HTML/CSS/JS, no framework, no build tooling. Color extraction runs on a downscaled `<canvas>` read of each uploaded photo.
