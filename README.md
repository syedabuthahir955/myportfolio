# R. M. Syed Abuthahir — Portfolio Website

Digital Marketing & UI/UX Designer · Madurai, Tamil Nadu, India

A five-page, blue/lavender glassmorphism portfolio built with plain **HTML, CSS and vanilla JavaScript** (no build step, no dependencies).

## Run locally
- **Quickest:** double-click `index.html` to open it in your browser.
- **Local server (optional):** in this folder run `python3 -m http.server 8000`, then open http://localhost:8000
- Web fonts (Inter, Sora) load from Google Fonts when online; offline the site falls back to system fonts.

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About (About Me, Career Objective, Education) |
| `skills.html` | Skills |
| `projects.html` | Projects (6 cards: 3 Digital Marketing + 3 UI/UX Design) |
| `contact.html` | Contact |

## Folder structure
```
index.html about.html skills.html projects.html contact.html
css/style.css          all styles + light/dark theme colours
js/theme.js            saves/applies theme (localStorage) — runs before paint
js/config.js           ★ YOUR links: email, LinkedIn, GitHub, resume, project links
js/layout.js           shared navigation, footer, icons, link wiring
js/projects.js         "View Project" buttons
js/contact.js          contact form validation
assets/images/         placeholder images (replace these)
assets/resume/         placeholder resume PDF (replace this)
```

## What to edit (placeholders)
1. **Email / LinkedIn / GitHub:** open `js/config.js` and fill in the values. Until then, these buttons show as disabled placeholders — no fake links are used.
2. **Profile photo:** save your photo (e.g. `assets/images/profile.jpg`) and change `profile-placeholder.svg` to `profile.jpg` in the `<img src>` in `index.html` and `about.html` (or overwrite the placeholder file keeping its name). Update the `alt` text too.
3. **Project images:** UI/UX images are `project-bm-star-gold-app.jpg`, `project-bm-star-gold-website.jpg`, `project-chickbook-website.jpg`. The three digital marketing cards use placeholders `project-dm-1.svg` … `project-dm-3.svg` — replace them with your own images, and edit their titles/descriptions in `projects.html` (search for "Digital Marketing Project"). Or change the `src` in `projects.html` (and the three small cards on `index.html`). Recommended ratio 16:10 (e.g. 1600×1000).
4. **Resume:** replace `assets/resume/Syed-Abuthahir-Resume.pdf` with your real resume (same filename, or change `resume` in `js/config.js`). The placeholder PDF only says "Resume placeholder".
5. **Project links:** put a Figma / live / Behance URL for each project in `js/config.js` → `projects`. Until then, "View Project" opens a details pop-up.
6. **Skills / text:** edit the HTML directly. Skills use simple category tags — no proficiency percentages. Education details (degree, years) can be added in `about.html`.

## Profile photo fit
The photo uses `object-fit: contain` inside the circle, so your whole head and shoulders are always visible and the face is never stretched or cropped. Spare space is filled with `--photo-bg` (white by default; set it to your photo's background colour). Headroom above the head comes from `--photo-padding` (default `7% 7% 0`). Override any of these in `:root` in `css/style.css`, e.g. `--photo-padding: 10% 10% 0;` for more space, `--photo-bg: #f4f6fb;`.

## Home heading animation
The large HELLO.. heading animates in letter by letter on load, each letter lifts on hover, and the heading moves slightly with scroll (max 40px). Code: `js/hero.js` (speed/cap values at the top) and `.hero-heading` in `css/style.css`. It is disabled automatically for visitors who prefer reduced motion.

## Theme (Dark / Light)
The moon/sun button in the navigation toggles the theme on every page. The choice is stored in `localStorage` (key `portfolio-theme`) and applied before the page paints; on first visit it follows the visitor's system preference. Colours are CSS variables at the top of `css/style.css`.

## ⚠ Contact form limitation
The contact form is **front-end only**. It validates name, email, subject and message in the browser, but **does not send anything** because no backend is configured. After validation it says so, and — if you set `email` in `js/config.js` — offers a "mailto:" link to send via the visitor's email app. To receive messages directly, connect a form service (e.g. Formspree, Web3Forms, Netlify Forms) or your own backend.

## Project content note
- **BM Star Gold Mobile App UI/UX Design** — app UI/UX design project.
- **BM Star Gold Website Design** — separate website design project.
- **ChickBook Website** — website project for a fried chicken business.
Descriptions only state what was provided; no features, results or production-development claims were added.

## Accessibility & responsiveness
Skip link, semantic landmarks, visible focus rings, keyboard-operable menu/dialog (Esc closes), labelled form fields with error messages, `prefers-reduced-motion` support, and layouts for desktop, tablet and mobile.

## Deploy
Upload the folder to any static host (GitHub Pages, Netlify, Vercel, etc.).
