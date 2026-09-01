# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Ivaí.news portal and its GraphQL backend are shut down. This repository is now a single
static page (`index.html`) telling visitors the service is off, plus the favicons and logos it
references under `static/`.

There is no build step, no package manager, no dependencies and no framework. Netlify publishes
the repository root as-is (`netlify.toml`). To preview, open `index.html` in a browser or serve
the directory with any static server.

## Conventions

- Content is pt-BR — user-facing strings in Portuguese.
- All CSS is inlined in a single `<style>` block in `index.html`. Keep it that way: no external
  stylesheet, no JavaScript, no web fonts (the page uses a system font stack).
- Light/dark is pure `prefers-color-scheme` — CSS variables plus the `.light-only` / `.dark-only`
  logo swap. There is no theme toggle, since that would require JavaScript.
- Asset URLs are absolute and rooted at `/static/...`; `site.webmanifest` and
  `browserconfig.xml` must use the same prefix.

## History

The previous Next.js + TypeScript + TailwindCSS + Apollo application was removed in the commit
that introduced `index.html`. Recover it from git history if the site is ever revived — do not
try to reconstruct it.
