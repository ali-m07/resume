# Ali Mansouri — Solutions Architect (Résumé)

A multilingual, single-page résumé web app (React + Vite + Tailwind) plus a LaTeX source for PDF. Positions Ali as a **Solutions Architect** bridging strategic foresight (Ph.D. Futures Studies) with production cloud-native engineering and AI/LLM automation.

**Live:** https://ali-m07.github.io/resume

## Highlights
- **Hybrid design** — dark gradient hero (identity, headline metrics, contact, language + PDF controls) over a clean, editorial light body.
- **5 locales** — English, Deutsch, Français, فارسی (RTL), Türkçe — all fully synced to the Solutions Architect narrative.
- **Responsive** — 2-column layout on desktop, single column on mobile and in print.
- **PDF export** — in-app button (via `html2pdf.js`) and a tuned `@media print` stylesheet for native Print → A4.

## Content model
All copy lives in `public/locales/{en,de,fr,fa,tr}.json`. Experience bullets support inline `<b>` (rendered via `dangerouslySetInnerHTML`) to bold key metrics. Skills are organized into 4 high-signal categories: Core Architecture · Cloud-Native & DevOps · AI & Automation · Systems Thinking & Foresight.

## Develop
```bash
npm install
npm run dev      # http://localhost:5173/resume/
```

## Build & deploy
```bash
npm run build    # outputs to ./build
npm run deploy   # publishes ./build to gh-pages
```
GitHub Actions (`.github/workflows`) builds and deploys to GitHub Pages on push.

## LaTeX PDF
`resume/ali-mansouri-cv.tex` is an A4, two-column LaTeX source aligned to the same content. Compile with any modern TeX distribution (pdfLaTeX/XeLaTeX).

## Structure
```
src/
  App.jsx                 # responsive layout (hero + 2-col body)
  Hero.jsx                # dark gradient header
  components/Section.jsx  # shared editorial section card
  *Section.jsx            # one per résumé section (i18n-driven)
public/locales/*.json     # content (5 languages)
resume/ali-mansouri-cv.tex
```
