# React + Vite
# Harini Priya P — MERN Stack Developer Portfolio

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.
An interactive, responsive portfolio website for **Harini Priya P**—Aspiring Full-Stack MERN Developer and Electronics & Communication Engineering (ECE) scholar at Adithya Institute of Technology, Coimbatore.

Currently, two official plugins are available:
Featuring a custom dark copper/amber electronics aesthetic (`#C87F4F` accent on `#0F1419` near-black background), 3D canvas visualizers powered by `@react-three/fiber` and `@react-three/drei`, smooth scroll animations via `framer-motion`, and a PCB circuit trace layout.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
---

## React Compiler
## 🛠️ Tech Stack & Architecture

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **3D Graphics & Canvas:** Three.js (`three`), `@react-three/fiber`, `@react-three/drei`
- **Animations:** `framer-motion` (staggered entrance reveals, scroll observer)
- **Icons:** `lucide-react`
- **Styling:** Plain CSS with CSS Custom Variables (`index.css`) — PCB trace aesthetic, Fraunces serif display font, Inter body font

## Expanding the Oxlint configuration
---

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
## 📁 Directory & Folder Structure

```
portfolio/
├── public/
│   ├── resume.pdf
│   ├── favicon.ico
│   └── models/
│       ├── laptop.glb
│       └── avatar.glb
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── logos/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.css
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── Skills/
│   │   │   └── Skills.jsx
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   └── ProjectCard.jsx
│   │   ├── Services/
│   │   │   └── Services.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   └── Footer/
│   │       └── Footer.jsx
│   ├── canvas/
│   │   ├── Laptop.jsx
│   │   ├── Earth.jsx
│   │   ├── Avatar.jsx
│   │   └── Stars.jsx
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── services.js
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Quick Start & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

4. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 📌 Note on Binary Assets & Procedural 3D Fallbacks

The website is engineered to be fully self-contained. The 3D canvas components (`Laptop.jsx` and `Avatar.jsx`) attempt to load 3D GLTF models from the `public/` directory:
- `public/resume.pdf` — PDF résumé file linked to "Download résumé" buttons
- `public/favicon.ico` — Website tab icon
- `public/models/laptop.glb` — 3D Laptop mesh model
- `public/models/avatar.glb` — 3D Developer Avatar model

> **Note:** If the `.glb` files are missing or incomplete, the application automatically catches the load event using React `Suspense` and Error Boundaries, rendering sleek procedural 3D box models with glowing copper PCB accents. This guarantees the application builds and runs without runtime errors regardless of asset presence.

---

## 👤 Developer Profile

- **Developer:** Harini Priya P
- **Role:** Aspiring Full-Stack Developer (MERN Stack)
- **Education:** B.E. Electronics and Communication Engineering, Adithya Institute of Technology (2023–2027), Coimbatore, India (SGPA: 8.26)
- **Email:** [harinipriyapk@gmail.com](mailto:harinipriyapk@gmail.com)
- **Phone:** +91 9791280304
- **LinkedIn:** [linkedin.com/in/harini-priya-p-ba7125327](https://linkedin.com/in/harini-priya-p-ba7125327)
