# Project Images

Upload your project visuals/images here, organized by project.

## Folder Structure

Organize each project's assets in its own folder:

```
projects/
├── ikea-comfort-guide/
│   ├── IKEA-comfortguide.png (main/hero image)
│   ├── IKEA-comfortguide-0.png (preview image)
│   ├── IKEA-comfortguide-1.png (preview image)
│   ├── IKEA-comfortguide-2.png (preview image)
│   └── IKEA-comfort-guide-3.png (preview image)
├── project-2-name/
│   ├── hero-image.jpg
│   └── preview-1.jpg
└── project-3-name/
    └── ...
```

## Naming Convention

- Use kebab-case for folder names (e.g., `ikea-comfort-guide`)
- Use descriptive filenames for images
- Main/hero image should be clearly named (e.g., `hero.jpg` or project name)

## Supported Formats

- JPG/JPEG
- PNG
- WebP (recommended for better performance)

## Image Guidelines

- Recommended size: 1200x800px or similar aspect ratio
- Keep file sizes optimized (under 500KB if possible)
- Use descriptive filenames

## How to Use

1. Create a folder for your project: `/public/projects/your-project-name/`
2. Upload your images to that folder
3. Update the `image` field in `Projects.jsx` with the path: `/projects/your-project-name/hero-image.jpg`
4. Update the `images` array in `CaseStudy.jsx` with all preview images:
   ```javascript
   images: [
     '/projects/your-project-name/hero-image.jpg',
     '/projects/your-project-name/preview-1.jpg',
     '/projects/your-project-name/preview-2.jpg',
   ]
   ```

## Current Projects

- **ikea-comfort-guide**: IKEA Comfort Guide for Canadian market
