# Mapping Commons

An open educational publication for learning to understand, read, question, and make maps. This review edition contains 12 complete lesson drafts, 17 planned lessons, and four curated pathways. Draft labels indicate editorial status.

Built with Astro and TypeScript. Lesson content is canonical Markdown; pathway definitions are YAML.

## Develop

Use Node 24, then run `npm ci` and `npm run dev`. Validate with `npm run check`, `npm run build`, and `npm run test:build`.

## Publish

The GitHub Actions workflow deploys only `dist` to GitHub Pages after validation. Repository name determines the base path; repository variables `SITE_URL` and `BASE_PATH` may override it.

Lesson authorship and license appear on each lesson page. No code license is inferred.
