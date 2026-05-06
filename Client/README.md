# Ramesh M — Portfolio Website

A production-ready React portfolio built with mobile-first responsive design, scroll-reveal animations, and a dark aesthetic using custom CSS variables.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ installed
- npm or yarn

### Installation & Run

```bash
# 1. Navigate into the project folder
cd ramesh-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

Output goes to the `/build` folder — ready to deploy on Netlify, Vercel, or GitHub Pages.

---

## 📁 Project Structure

```
ramesh-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Skills.jsx / Skills.css
│   │   ├── Experience.jsx / Experience.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── Education.jsx / Education.css
│   │   ├── Contact.jsx / Contact.css
│   │   └── Footer.jsx / Footer.css
│   ├── hooks/
│   │   └── useReveal.js       ← scroll animation hook
│   ├── styles/
│   │   └── global.css         ← CSS variables, resets, utilities
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

---

## ✏️ Customization

### Update personal info
Each section is data-driven. Edit the arrays at the top of each component:

| File | What to edit |
|---|---|
| `Hero.jsx` | Stats numbers |
| `Skills.jsx` | `SKILLS` array |
| `Experience.jsx` | `EXPERIENCE` array |
| `Projects.jsx` | `PROJECTS` array |
| `Education.jsx` | `EDUCATION` + `CERTIFICATIONS` arrays |
| `Contact.jsx` | `CONTACTS` array |

### Change colors
All colors are defined as CSS variables in `src/styles/global.css`:

```css
:root {
  --accent: #00e5a0;      /* primary green accent */
  --accent2: #7c5cfc;     /* purple accent */
  --bg: #0a0a0f;          /* page background */
  --card: #16161f;        /* card backgrounds */
}
```

---

## 🌐 Deploy to Netlify (Free)

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
3. Drag & drop the `/build` folder
4. Done — your portfolio is live!

---

## 📱 Mobile Responsive

- Hamburger menu on screens < 768px
- Fluid typography with `clamp()`
- Single-column grid layouts on small screens
- Touch-friendly tap targets

---

Built with React 18 · No external UI libraries · Pure CSS animations
