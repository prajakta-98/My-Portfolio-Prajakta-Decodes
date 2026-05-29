# Prajakta Bansod Portfolio

A React and Vite portfolio website for Prajakta Bansod, focused on full-stack UI development, selected work, services, beyond-code interests, and contact flow.

## Overview

This project is a single-page portfolio built with React. It uses animated hero interactions, smooth scrolling, project detail routes, reusable section components, and static assets served from the `public` and `asset` folders.

The production build is generated into `dist/`, which is the folder used by static hosting platforms such as Vercel, Netlify, or any static web server.

## Tech Stack

- React 19
- Vite 7
- React Router
- Framer Motion
- GSAP
- Lenis smooth scrolling
- Matter.js for hero physics interactions

## Project Structure

```text
src/
  App.jsx                         App routes and hash scrolling
  main.jsx                        React entry point
  components/                     Shared UI components
  data/                           Project, service, and beyond-code content
  hooks/                          Page effects and scrolling hooks
  pages/                          Home and project detail pages
  sections/home/                  Home page sections
  styles/main.css                 Global styling

public/
  asset/                          Publicly served images, SVGs, resume, icons
  _headers                        Static host headers
  _redirects                      Static host fallback redirects
  robots.txt                      Search crawler rules

projects/
  */index.html                    Static project demo pages

dist/                             Generated production build, not committed
```

## Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite. The default project script uses:

```text
http://127.0.0.1:5173/
```

## Build

Create a production build:

```bash
npm run build
```

The generated files are written to:

```text
dist/
```

You can also run the included build file directly:

```bash
node build.mjs
```

## Preview Production Build

After building, preview the production output locally:

```bash
npm run preview
```

## Deployment

Recommended deployment settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`
- Framework preset: Vite

The repository includes `vercel.json`, `public/_redirects`, and `public/_headers` so the app can handle client-side routes and static hosting behavior correctly.

## Important Notes

- Do not commit `node_modules/`, `dist/`, logs, reports, or local temporary files.
- Keep images that must be available by URL inside `public/asset/`.
- Keep source-only assets in `asset/` if they are imported or copied during development.
- Update project content from the files inside `src/data/`.
- Update page sections from `src/sections/home/`.

## Common Commands

```bash
npm run dev       # Start local development
npm run build     # Build for production
npm run preview   # Preview the production build locally
```
