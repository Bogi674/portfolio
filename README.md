# Portfolio (plain HTML, CSS, JS)

No framework, no build step, no npm install. Open the files, edit them, deploy them.

## How it works

`index.html` and `case-study.html` are mostly empty shells. A small JS file in
each fetches the `.md` files in `content/` and fills in the page in the
browser. That is the entire mechanism, there is no server, no database, no
build tool converting anything.

## What's editable, and where

| What | Where | Format |
|---|---|---|
| Name, headline, bio, stats, contact links | `content/profile/profile.md` | Plain text file |
| Case studies (cards + detail pages) | `content/case-studies/*.md` | One file per case study |
| Which case study files exist | `content/case-studies/manifest.js` | One line per file |
| Skills grid (text + icons) | `js/skills.js` | Plain JS array |
| Icon shapes | `js/icons.js` | Plain JS, inline SVG |
| Photo / resume PDF | `headshot.jpg`, `resume.pdf` (place at the project root) | Static files |

### Case studies: add, edit, delete

1. **Edit**: open a file in `content/case-studies/`, change the fields between
   the `---` lines at the top (title, tag, role, timeline, impact, quote), or
   the paragraphs below the second `---` (that's the text on the detail page,
   leave a blank line between paragraphs).
2. **Add**: copy an existing file, rename it, edit the content, then add its
   filename (no `.md`) to the list in `content/case-studies/manifest.js`.
   That second step is the one thing a build tool would normally do for you
   automatically. Plain HTML can't scan a folder by itself, so this file
   is how the page knows what exists.
3. **Delete**: delete the file and remove its line from `manifest.js`.
4. **Hide without deleting**: add `published: "false"` to that file's
   frontmatter.
5. **Reorder**: change the `order` number in each file (lower shows first).
6. **Images**: put image/diagram files under `images/case-studies/`, then
   reference them from the project root, e.g.
   `coverImage: "images/case-studies/billing-cover.jpg"` (also
   `beforeImage` / `afterImage`). Leave a field out and a placeholder block
   renders instead, nothing breaks if you haven't added an image yet.
   Root-relative paths matter here: the browser resolves an image path
   against the page's URL (`index.html` or `case-study.html`), not the
   `.md` file's own folder, so always write the path starting from
   `images/...`, not just a bare filename.
7. **Inside the story text**: a line starting with `###` becomes a
   subheading, and a line like `![alt text](images/case-studies/diagram.svg)`
   on its own becomes an embedded image. Both work anywhere in the body,
   not just case studies, useful for breaking a longer story into sections
   with a diagram per step.

### Profile / about content

`content/profile/profile.md` is a single file. The fields at the top drive
the hero, the three stat cards, and the closing CTA and footer links. The
text below the `---` is the "My Story" card.

### Skills grid

`js/skills.js` is a plain array grouped by category. Change a `label` to
change the text. Change an `icon` value to use a different icon (see the
list of available keys in `js/icons.js`). Add a new icon by adding an entry
to `js/icons.js` first (copy the format of an existing one, it's just an SVG
shape), then reference its key in `skills.js`.

## Running it locally

Browsers block `fetch()` when you open an HTML file directly by
double-clicking it (a `file://` link, not `http://`). This site uses
`fetch()` to load the `.md` files, so it needs to be served over `http`, even
locally. Two easy ways, pick whichever you have:

**Option A, no installs, if you have Python (most Macs and Linux machines
already do):**

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**Option B, if you use VS Code:** install the "Live Server" extension,
right-click `index.html`, choose "Open with Live Server."

## Deploying to Vercel

This is a static site with no build step, which makes Vercel deployment
about as simple as it gets:

1. Push this folder to a GitHub (or GitLab/Bitbucket) repository.
2. Go to [vercel.com](https://vercel.com), sign in, click **Add New → Project**,
   and import that repository.
3. When Vercel asks for a framework preset, choose **Other**. Leave the
   build command blank and the output directory as the project root (`.`).
   There is nothing to build, Vercel just serves the files as they are.
4. Click **Deploy**. No environment variables needed, there's no backend.
5. Every future `git push` to your main branch redeploys automatically. Your
   content workflow is: edit a `.md` file (and `manifest.js` if you added or
   removed a case study) → commit → push → live in about a minute.
6. You get a free `your-project.vercel.app` URL immediately. A custom domain
   is a couple of clicks in **Settings → Domains**.

You can also drag the project folder straight into
[vercel.com/new](https://vercel.com/new) without using git at all, though
you'd lose the automatic redeploy-on-push workflow that makes editing the
`.md` files convenient later.
