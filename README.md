# Portfolio

Built with [Astro](https://astro.build). Static site, no server, no CMS, no database.
Everything you'll want to change day to day lives in plain files.

## What's editable, and where

| What | Where | Format |
|---|---|---|
| Name, headline, bio, stats, contact links | `src/content/profile/profile.md` | Markdown + frontmatter |
| Case studies (cards + detail pages) | `src/content/case-studies/*.md` | One file per case study |
| Skills grid (text + icons) | `src/config/skills.ts` | Code |
| Photo / resume PDF | `public/headshot.jpg`, `public/resume.pdf` | Static files |

### Case studies: add, edit, delete

Each file in `src/content/case-studies/` is one card on the homepage and one detail
page at `/case-studies/<filename-without-.md>`.

- **Edit**: open the file, change the frontmatter (title, tag, role, timeline, impact,
  quote) or the body text below the `---` (this is the narrative on the detail page,
  written in normal Markdown, one paragraph per line-break).
- **Add**: copy an existing file, rename it, change the content. It shows up
  automatically, no registration anywhere else needed.
- **Delete**: delete the file. It disappears from the homepage grid and its URL
  404s.
- **Hide without deleting**: set `published: false` in the frontmatter.
- **Reorder**: change the `order` number (lower numbers show first).
- **Images**: drop image files in `public/`, e.g. `public/case-studies/billing-cover.jpg`,
  then reference them as `coverImage: "/case-studies/billing-cover.jpg"` (also
  `beforeImage` / `afterImage`). Leave the field out and a placeholder block renders
  instead, so nothing breaks if you haven't added images yet.

### Profile / about content

`src/content/profile/profile.md` is a single file. The frontmatter drives the hero,
the stats strip, and the closing CTA and footer links. The Markdown body below the
`---` is the "My Story" card, edit it like any other paragraph text.

### Skills grid

`src/config/skills.ts` is a plain array, grouped by category. To change a label or
swap which icon a row uses, edit the array. Icons come from
[lucide.dev/icons](https://lucide.dev/icons); if you want an icon that isn't already
wired up, add its name to the `ICON_KEYS` list at the bottom of `skills.ts`, then add
a matching import + map entry in `src/components/SkillsGrid.astro` (both files say
where).

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:4321`.

```bash
npm run build      # outputs a static site to dist/
npm run preview    # serve that build locally to sanity-check it
```

## Deploying to Vercel

1. Push this folder to a GitHub (or GitLab/Bitbucket) repository.
2. Go to [vercel.com](https://vercel.com), sign in, click **Add New → Project**,
   and import that repository.
3. Vercel auto-detects Astro. Leave the defaults:
   - Build command: `astro build` (or `npm run build`)
   - Output directory: `dist`
   - Install command: `npm install`
4. Click **Deploy**. No environment variables are needed, this site has no backend.
5. Every future `git push` to your main branch redeploys automatically. Since your
   case studies and profile are just Markdown files in the repo, editing content
   is: edit the `.md` file, commit, push, and the live site updates in about a
   minute. That's the whole workflow, no CMS login required.
6. Optional: **Settings → Domains** in the Vercel project to attach a custom domain.
   Vercel gives you a free `your-project.vercel.app` URL immediately either way.

You can also skip GitHub and deploy straight from your machine with the
[Vercel CLI](https://vercel.com/docs/cli): run `npx vercel` from this folder the
first time, then `npx vercel --prod` for production deploys. The GitHub route is
usually nicer here since it gives you the git-push-to-publish workflow described
above.
