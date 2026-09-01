# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Ivaí.news portal and its GraphQL backend are shut down. This repository is now a single
static page (`index.html`) telling visitors the service is off, plus the favicons and logos it
references under `static/`.

There is no build step, no package manager, no dependencies and no framework. To preview, open
`index.html` in a browser or serve the directory with any static server.

## Netlify

`netlify.toml` is authoritative and overrides the UI build settings: a no-op build command,
`publish = "."`, a catch-all `/*` → `/index.html` rewrite served with status 404 (so old article
URLs show the notice and get de-indexed), security headers and a long cache for `/static/*`.

Two things still have to be done in the Netlify UI, because `netlify.toml` cannot undo them:

- Remove every UI-installed build plugin (`@netlify/plugin-lighthouse`, and the Next.js Runtime
  if it was pinned manually). Plugins installed through the UI run regardless of this file and
  will fail the deploy.
- Clear the `NEXT_PUBLIC_*` environment variables — they are unused now.

Since the repository root is published, `README.md` and `CLAUDE.md` are reachable as
`/README.md` and `/CLAUDE.md`. Harmless for a public repo; move the site into a subdirectory and
repoint `publish` if that ever matters.

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
