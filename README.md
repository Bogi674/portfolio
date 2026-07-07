# Bogiva Mirdyanto — PM Portfolio

Live at **[portfolio-bogi-personal.vercel.app](https://portfolio-bogi-personal.vercel.app)**

Plain HTML, CSS, and JavaScript. No framework, no build step, no npm install.
Open the files, edit them, push, and the site updates in about a minute.

---

## How it works

`index.html` and `case-study.html` are mostly empty shells.
A small JS module (`js/render-home.js` and `js/render-case-study.js`) fetches the `.md` files in `content/` and fills in the page in the browser.
No server, no database, no build tool.

The one non-obvious constraint: browsers block `fetch()` on `file://` URLs, so this site must be served over HTTP even locally (see [Running locally](#running-locally)).

---

## Project structure

```
portfolio/
├── index.html                  Homepage shell
├── case-study.html             Case study detail shell
├── favicon.svg
├── headshot.jpeg
├── css/
│   └── style.css               All styles in one file
├── js/
│   ├── render-home.js          Fetches profile + case studies, renders homepage
│   ├── render-case-study.js    Fetches and renders a single case study
│   ├── content.js              Markdown fetching and frontmatter parser
│   ├── skills.js               Skills grid data
│   └── icons.js                Inline SVG icon library
├── content/
│   ├── profile/
│   │   └── profile.md          All homepage copy: name, headline, bio, stats, links
│   └── case-studies/
│       ├── manifest.js         Lists which case study files exist (required, see below)
│       ├── 01-whatsapp-acquisition-funnel.md
│       ├── 02-digital-migration.md
│       ├── 03-lead-filtering.md
│       ├── 04-digital-catalogue.md
│       └── 05-project-tracker-realtime.md
└── images/
    ├── case-study-01/          Diagrams for CS1 (5 SVGs + 1 thumbnail)
    ├── case-study-02/          Diagrams for CS2 (2 SVGs + 1 thumbnail)
    └── case-study-05/          Diagrams for CS5 (6 SVGs + 1 cover)
```

---

## What to edit, and where

| What | Where | Format |
|---|---|---|
| Name, headline, bio, stats, contact links | `content/profile/profile.md` | Plain text frontmatter |
| Case study cards + detail pages | `content/case-studies/*.md` | One file per case study |
| Which case study files the site loads | `content/case-studies/manifest.js` | One filename per line |
| Skills grid (text + icons) | `js/skills.js` | Plain JS array |
| Icon shapes | `js/icons.js` | Plain JS, inline SVG paths |
| Headshot | `headshot.jpeg` (project root) | Static file |
| Resume | `resume.pdf` (project root, does not exist yet) | Static file |

---

## Case studies

There are currently five case studies:

| # | Title | Tag | Images |
|---|---|---|---|
| 01 | Rebuilding an Acquisition Funnel Around WhatsApp | Product Strategy | 5 SVG diagrams + thumbnail |
| 02 | Moving 50%+ of Walk-in Customers to Digital | Digital Adoption | 2 SVG diagrams + thumbnail |
| 03 | Turning Better Data Filtering into Rp 4.9B in GMV | Optimization | None yet |
| 04 | Launching the Digital Catalogue for Car Financing | 0 to 1 Launch | None yet |
| 05 | Growing a One-File Tracker Into a Real-Time Team App | Product Building | 6 SVG diagrams + cover |

### Editing a case study

Each file has a frontmatter block at the top (between the `---` lines) and a story body below it.

**Frontmatter fields:**

```
title        Shown on the card and the detail page heading
tag          Small label on the card (e.g. "Product Strategy")
summary      Card excerpt, 1 to 2 sentences
role         Shows in the meta bar on the detail page
timeline     Shows in the meta bar
impact       Shows in the meta bar
quote        Pull quote on the detail page
order        Controls card sort order on the homepage (lower = first)
coverImage   Path to a cover image, e.g. "images/case-study-01/cover.png"
published    Set to "false" to hide without deleting
```

The body text starts after the second `---`. Leave a blank line between paragraphs.

A line starting with `###` becomes a section heading.
A line like `![alt text](images/case-study-01/diagram.svg)` on its own line becomes an embedded image.

Always write image paths starting from the project root (`images/...`), not relative to the markdown file.

### Adding a case study

1. Create `content/case-studies/your-slug.md` with the frontmatter and body.
2. Add `'your-slug'` (no `.md`) to the array in `content/case-studies/manifest.js`.

That second step is the one thing a build tool would normally automate. Plain HTML cannot scan a folder, so `manifest.js` is how the site knows what exists.

### Removing a case study

Delete the `.md` file and remove its entry from `manifest.js`.

### Reordering

Change the `order` field inside each file. Lower numbers appear first.
The order inside `manifest.js` does not affect display order.

### Adding images

Put image and diagram files under `images/case-study-XX/` (create the folder if needed), then reference them in frontmatter or body text using a root-relative path like `images/case-study-XX/filename.svg`.

SVG diagrams are rendered as `<img>` tags (not inlined) to avoid CSS conflicts.
A recommended width for embedded diagrams is 720px, with hardcoded fill colors (not CSS variables, which would be overridden by the page stylesheet).

---

## Profile content

`content/profile/profile.md` controls:

- Hero: `name`, `eyebrow`, `headline`, `intro`, `headshot`, `resumeUrl`
- Stat cards: `stat1Value`, `stat1Label`, `stat2Value`, `stat2Label`, `stat3Value`, `stat3Label`
- CTA section: `ctaHeadline`, `ctaBody`
- Footer links: `linkedin`, `email`
- My Story card: the body text below the second `---`

---

## Skills grid

`js/skills.js` exports an array grouped by category. Each skill has a `label` (display text) and an `icon` key that maps to a shape in `js/icons.js`.

To change a label: edit the `label` field.
To use a different icon: change the `icon` value to another key from `icons.js`.
To add a new icon: add an entry to `icons.js` first (copy the format of an existing one, it is an SVG path string), then reference its key in `skills.js`.

---

## Running locally

Browsers block `fetch()` on `file://` URLs. Serve the project over HTTP instead:

**Option A — Python (no install needed, works on most Macs and Linux):**
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

**Option B — VS Code:** install the Live Server extension, right-click `index.html`, choose "Open with Live Server."

---

## Deploying to Vercel

This is a static site with no build step. Deployment is straightforward:

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), click **Add New > Project**, and import the repository.
3. When Vercel asks for a framework preset, choose **Other**. Leave the build command blank and the output directory as `.` (the project root). There is nothing to build.
4. Click **Deploy**.
5. Every `git push` to the main branch redeploys automatically. The content workflow is: edit a `.md` file and, if you added or removed a case study, update `manifest.js`, then commit and push. Live in about a minute.

A custom domain is available under **Settings > Domains** in the Vercel dashboard.
