# MoreBC2 site development

This branch contains the first non-destructive Starlight website scaffold for MoreBC2.

## Design rule

The existing Markdown files remain the canonical documentation source. The website build does not require contributors to move or duplicate those files by hand.

`scripts/build-site-content.mjs` generates Starlight-compatible copies under `src/content/docs/` at build time. Generated files are ignored by Git.

The adapter currently:

- reads Markdown under `docs/`, excluding website-planning drafts under `docs/site/`;
- adds required Starlight title and description frontmatter from the existing first-level heading;
- removes the duplicate top-level heading from the generated copy;
- maps section `README.md` files to Starlight `index.md` routes;
- rewrites links between Markdown documentation pages to website routes;
- includes selected root project documents under `/project/` for contributor and status references.

## Local requirements

- Node.js 22.12.0 or newer
- npm

## Local preview

```sh
npm install
npm run dev
```

## Validation

```sh
npm run build
npm run check
```

The branch also includes `.github/workflows/site-check.yml` so GitHub can validate the static build without Codex usage.

## Cloudflare target

No Cloudflare deployment is configured yet. Once the build is clean, the intended Pages settings are:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main` only after the site work is approved and merged

Until then, this branch is only a preview/scaffold and does not publish MoreBC2.
