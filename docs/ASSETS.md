# Asset Hosting Guide

## Recommendation for this portfolio

**Use Vercel + `public/` for now.** This is the right default.

| Approach | When to use |
|----------|-------------|
| **`public/` on Vercel** | Solo portfolio, you edit code/data, assets under ~100MB total |
| **Vercel Blob / Cloudinary / S3** | Large 3D textures, many 4K images, or frequent asset swaps without redeploying |
| **CMS (Sanity, Contentful)** | Non-developers editing copy/projects often; worth the setup cost |

You do **not** need a CMS today. Project copy lives in `src/data/projects.js` and section components. That keeps deploys simple and fast.

---

## What goes where

### `public/` (deployed to Vercel CDN)

```
public/
├── audio/              # ambient + hover sounds
├── fonts/              # web fonts
├── models/             # GLTF 3D models
├── textures/           # runtime 3D textures (jpg/png only)
├── projects/{slug}/    # vinyl covers + showcase images
└── Main.gif            # intro animation
```

Only put files here that the **live site** needs.

### `src/data/` (content, not binary)

- `projects.js` — project metadata, image paths, showcase config
- `showcaseLayout.js` — bento grid layout

### `docs/` (not deployed)

- Resume, LinkedIn drafts, one-off HTML exports

### Keep out of the repo

- Blender `.blend` files, source EXR/4K archives, font source packages
- Duplicate copies of assets already in `public/`

Add large design sources to `.gitignore` or store locally / in cloud drive.

---

## When to upgrade from `public/`

Move heavy assets to **Vercel Blob** or **Cloudinary** if:

1. Total `public/` size slows git or deploys (rough guide: **> 100MB**)
2. You want to swap showcase images without a code deploy
3. You need automatic image optimization (WebP, responsive sizes)

Example Cloudinary flow: upload image → get URL → paste URL in `projects.js` `showcase.images` array.

---

## CMS — only if you need it later

Consider **Sanity** if you want:

- Edit project titles, descriptions, and images in a UI
- Add/remove projects without touching React code
- Preview changes before publish

Skip CMS if you're comfortable editing `projects.js` and dropping files into `public/projects/`.

---

## Quick checklist for new project assets

1. Create `public/projects/{slug}/`
2. Add cover image (e.g. `{slug}.png`)
3. Add up to 6 showcase images (or reuse paths in `projects.js`)
4. Add entry to `src/data/projects.js`
5. Deploy to Vercel — assets ship with the build automatically
