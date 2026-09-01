# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: deactivated

The Ivaí.news project and its GraphQL backend are shut down. This repo now ships a single static
page (`src/pages/index.tsx`) telling visitors the service is off. All data-layer code (Apollo
client, `.graphql` queries, `Post`, infinite scroll, date formatting) has been removed — do not
reintroduce it; recover it from git history (`7a7256c^`) if the site is ever revived.

## Commands

```bash
yarn dev            # dev server on :3000
yarn build          # next build
yarn typecheck      # tsc --noEmit (non-incremental)
yarn lint:strict    # eslint --max-warnings=0 src  (what pre-commit enforces)
yarn lint:fix       # eslint --fix + prettier -w
yarn format:check   # prettier -c .
```

No test framework is configured. Husky pre-commit runs `lint-staged`
(`eslint --max-warnings=0` + prettier); warnings are errors, so run `yarn lint:strict` before
committing.

## Architecture

Next.js 15 **Pages Router** + TypeScript + TailwindCSS, statically prerendered, deployed to
Netlify (site `ivainews`, https://ivai.news). Content is pt-BR — user-facing strings in
Portuguese.

- `src/pages/_app.tsx` — `ThemeProvider` (next-themes, class strategy) → `Analytics` → `Layout`.
- `src/data/siteMetadata.tsx` — single source for title, URLs, locale, social links, default
  theme, analytics IDs. Read from it instead of hardcoding.
- `src/components/analytics/` — GA + Hotjar, rendered only in production and only when
  `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` / `NEXT_PUBLIC_HOTJAR_ID` are set. These are the only env
  vars left.
- Imports use the `@/*` alias for `src/*`. `simple-import-sort` enforces import order;
  `@typescript-eslint/no-explicit-any` is an error.
- Tailwind runs with no plugins — `prose`, `line-clamp`, `aspect-ratio` and `forms` classes are
  no longer available.

## Netlify build

`netlify.toml` pins `NODE_VERSION = "18.20.4"`. Netlify's default (Node 22) breaks the build
because the UI-installed `@netlify/plugin-lighthouse` declares `engines: ">=14.15 <20"`. If that
plugin is removed in the Netlify UI, the pin (and `.tool-versions`) can move back to Node 20+.

`package.json` has a `resolutions` entry forcing `postcss@^8.5.26` — Next pins a vulnerable
8.4.31 transitively.
