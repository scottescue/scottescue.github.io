# scottescue.com

Scott Escue's professional portfolio, built as a static Astro site and deployed to GitHub Pages at [scottescue.com](https://scottescue.com).

## Requirements

- Node.js 24 or newer
- npm 9.6.5 or newer

## Local development

```sh
npm install
npm run dev
```

Astro prints the local development URL, normally `http://localhost:4321`.

## Quality checks

```sh
npm run format
npm run check
npm run build
```

`npm run build` runs Astro's type and content checks before generating the static site in `dist/`. Use `npm run preview` to inspect the production build locally.

## Content

Project pages live in `src/content/projects/`. Each Markdown file is validated against the project schema in `src/content.config.ts` and automatically appears on `/projects/`.

To add a project, create a Markdown file with this frontmatter:

```yaml
---
title: Project name
summary: A concise project description.
repository: https://github.com/owner/repository
language: TypeScript
status: active
statusLabel: Active development
technologies:
  - TypeScript
  - Astro
order: 4
featured: true
---
```

Writing uses the `writing` collection. Add articles under `src/content/writing/` with `title`, `description`, `publishedAt`, optional `updatedAt`, `draft`, and `topics` fields. The `/writing/` route is available but intentionally omitted from primary navigation until an article is published.

Site-wide identity and contact links are centralized in `src/site.ts`. Replace `public/resume.pdf` when publishing a new resume.

## Deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys the static site whenever `master` is updated. The repository's GitHub Pages source must be set to **GitHub Actions**.

Astro is configured with `site: 'https://scottescue.com'`, and `public/CNAME` preserves the custom domain without a repository subpath. DNS remains managed outside this repository.
