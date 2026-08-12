# Portfolio

My personal frontend portfolio — designed and built with HTML, SCSS and vanilla JavaScript.

[View live portfolio](https://alexander-domanov.github.io/portfolio-dev/)

## About

The site is intentionally built without a frontend framework, with a focus on semantic HTML, responsive layouts, accessibility and lightweight JavaScript interactions.

The interface includes keyboard-accessible interactions, progressive enhancement and reduced-motion support.

## Built with

HTML · SCSS · JavaScript (ES modules) · Vite

## Project structure

```text
.
├── index.html
├── public/
├── src/
│   └── scripts/
├── scss/
├── vite.config.mjs
└── .github/
    └── workflows/
```

Generated `dist/` output and installed dependencies are not stored in the repository.

## Local development

Install dependencies and start the development server:

```sh
npm ci
npm run dev
```

Create a production build or preview it locally:

```sh
npm run build
npm run preview
```

## Quality checks

```sh
npm run check:format
npm run check:styles
npm run check:html
npm run check:js
```

## Deployment

Deployed to GitHub Pages through GitHub Actions from the `main` branch.
