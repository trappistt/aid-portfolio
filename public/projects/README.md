# Project Assets

Runtime assets for the vinyl portfolio live here and are served from `/projects/…` on Vercel.

## Structure

```
projects/{slug}/
├── cover.png          # vinyl sleeve (square, ~512–1024px)
└── showcase/          # optional bento tiles
    ├── 01.jpg
    ├── 02.jpg
    └── …06.jpg
```

## Configure in code

Edit `src/data/projects.js`:

- `image` — vinyl sleeve cover path
- `showcase.images` — bento grid image paths (or upload `01.jpg`–`06.jpg` to `showcase/`)

Default 6-tile layout is defined in `src/data/showcaseLayout.js`.

## Guidelines

- Prefer **WebP or JPG** for photos, **PNG** for UI mockups with transparency
- Target **&lt; 400KB** per showcase tile, **&lt; 200KB** per sleeve cover
- Use **1200–1600px** on the long edge for showcase images
