# Alexander Domanov Portfolio

Static portfolio website built with HTML, SCSS, and vanilla JavaScript.

## Requirements

- Node.js 18 or newer
- npm

## Setup

```sh
npm install
```

## Development

Start the SCSS watcher:

```sh
npm run dev
```

Open `index.html` in a browser. The SCSS entry point is `scss/main.scss`, and generated styles are written to `styles/main.css`.

## Production build

Create compressed CSS without a source map:

```sh
npm run build
```

## Checks

Run read-only JavaScript, SCSS, HTML, and formatting checks:

```sh
npm run check
```

Apply available automatic fixes explicitly:

```sh
npm run fix
```
