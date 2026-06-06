# Alireza Iman — Portfolio

Single-page portfolio with a horizontal scroll layout and an interactive 3D vinyl project showcase.

## Stack

- **React + Vite** — UI and build
- **Three.js / React Three Fiber** — vinyl crate scene
- **Framer Motion + GSAP** — section and interaction animation
- **Lenis** — smooth horizontal scroll
- **Tailwind CSS** — styling
- **Vercel** — hosting and analytics

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run preview
```

## Project structure

```
src/
├── App.jsx                 # single-page layout
├── components/
│   ├── layout/Block.jsx    # scroll section shell
│   ├── sections/           # intro, about, works, experience, contact…
│   └── vinyl-portfolio/    # 3D scene, showcase, audio
├── data/
│   ├── projects.js         # project content + asset paths
│   └── showcaseLayout.js   # bento grid layout
├── hooks/
└── styles/

public/
├── audio/                  # room ambient + hover sfx
├── fonts/
├── models/                 # GLTF assets
├── textures/               # 3D scene textures
└── projects/{slug}/        # vinyl covers + showcase images
```

## Content & assets

- **Copy / project data:** `src/data/projects.js`, section files in `src/components/sections/`
- **Images & audio:** `public/` — see [`public/projects/README.md`](public/projects/README.md)
- **Hosting strategy:** [`docs/ASSETS.md`](docs/ASSETS.md)

## Deploy

Push to GitHub and connect the repo to Vercel. Static assets in `public/` are served from the CDN automatically — no separate asset host required for typical portfolio sizes.
