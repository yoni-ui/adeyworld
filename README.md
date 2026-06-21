# Adey World — Landing site (Vercel-ready)

Static site. No build step. `index.html` is the landing page; `about.html` and
`product.html` are linked from the nav. All images/fonts resolve locally.

## Deploy

**Option A — drag & drop**
1. Go to https://vercel.com/new
2. Drag this whole `deploy/` folder onto the page.
3. Framework preset: **Other** (no build command, output dir = root). Deploy.

**Option B — CLI**
```bash
cd deploy
npx vercel        # preview
npx vercel --prod # production
```

`cleanUrls` is on, so pages are served at `/about` and `/product` (the `.html`
links still work too).

## Structure
```
deploy/
├── index.html      ← landing page (/)
├── about.html
├── product.html
├── site.css
├── site.js
├── vercel.json
└── assets/
    ├── adeyworld-logo.png, hero-kids.png
    ├── scenes/
    └── characters/
```
