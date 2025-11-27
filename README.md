# Portfolio - WebGL & Three.js

A modern, interactive portfolio website featuring WebGL and Three.js experiences, inspired by creative developer portfolios.

## Features

- 🎨 **WebGL Background** - Custom shader-based animated background
- ✨ **Three.js Integration** - Interactive 3D particles and effects
- 🎭 **Smooth Animations** - Framer Motion for fluid transitions
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🚀 **Modern Stack** - React + Vite for fast development

## Tech Stack

- **React** - UI framework
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── WebGLScene.jsx    # Three.js scene with shaders
│   ├── Navigation.jsx    # Navigation component
│   ├── Hero.jsx          # Hero section
│   ├── Projects.jsx      # Projects showcase
│   ├── About.jsx         # About section
│   └── Footer.jsx        # Footer component
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Customization

- Update project data in `src/components/Projects.jsx`
- Modify shader effects in `src/components/WebGLScene.jsx`
- Customize colors and styling in `tailwind.config.js`
- Edit content in respective component files

## License

MIT

