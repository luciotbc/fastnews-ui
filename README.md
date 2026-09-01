<p align="center">
  <a href="https://ivai.news">
    <img src="./.github/logo-dark.svg" alt="Fastnews UI" width="150">
  </a>
  <a href="https://ivai.news">
    <img src="./.github/logo-light.svg" alt="Fastnews UI" width="150">
  </a>
</p>
<p align="center">
This is the UI for the fastnews project a Hub of blogs and news.
<p>

## ⚠️ Project deactivated

The portal and its GraphQL backend have been shut down. This repository now serves a single
static page (`index.html`) informing visitors that the service is no longer available. The
Next.js application, the news feed, the Apollo client and the GraphQL queries were all removed —
see the git history for the last working version.

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/e0f0a0b6-d408-476f-ab50-5c357f4ce83a/deploy-status)](https://app.netlify.com/sites/ivainews/deploys)

### Environments

- Production:
  - [Primary domain](https://ivai.news)
  - [Netlify subdomain](https://ivainews.netlify.app)

## Getting Started

There is no build step and no dependencies. Open `index.html` in a browser, or serve the
repository root with any static server:

```bash
python3 -m http.server 3000
```

Netlify publishes the repository root as-is; see `netlify.toml`.
