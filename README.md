# João Paulo Azevedo — Portfolio

Personal portfolio site for João Paulo Azevedo, AI Agents & Frontend Engineer.

> Built in the void.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js (App Router) |
| 3D / Particles | React Three Fiber + Three.js |
| Animation | Framer Motion |
| Styling | Inline styles + CSS variables |
| Fonts | Space Grotesk, Inter, JetBrains Mono |
| Deploy | Vercel |

## Features

- Fullscreen particle field with scroll-driven camera — enters the void as you scroll
- macOS-inspired design system: frosted glass cards, window chrome, dock-style footer
- Scroll snap between sections
- Floating content animations with staggered timing
- Fully responsive

## Sections

1. **Hero** — particle field, name, CTAs
2. **About** — bio, stats, tech stack terminal panel
3. **Work** — project cards as macOS window panels
4. **Contact** — headline, socials, dock footer

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push to GitHub:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/jpazv/joao-space.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com), import the repo — zero config needed.
