// content.js
//
// A small, dependency-free helper for reading the .md files in /content.
// No npm packages, no build step, just fetch() + string parsing.
//
// Each .md file looks like this:
//
//   ---
//   title: "Some title"
//   impact: "200 customers in 90 days"
//   ---
//   A paragraph of text.
//
//   Another paragraph.
//
// The part between the two "---" lines is the frontmatter (simple
// "key: value" pairs, one per line). Everything after the second "---"
// is the body, split into paragraphs on blank lines.

/**
 * Parses raw markdown text into { data, body }.
 * `data` is a plain object of the frontmatter fields (all strings).
 * `body` is the remaining markdown text, trimmed.
 */
export function parseMarkdown(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw.trim() };
  }
  const [, frontmatterBlock, bodyRaw] = match;
  const data = {};

  frontmatterBlock.split('\n').forEach((line) => {
    if (!line.trim()) return;
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (isQuoted) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });

  return { data, body: bodyRaw.trim() };
}

/**
 * Turns a markdown body into HTML. Deliberately small, not a full markdown
 * engine, but it understands the handful of things these case studies use:
 *
 *   ### A heading            -> <h3>A heading</h3>
 *   ![alt text](path.svg)    -> <img src="path.svg" alt="alt text">
 *   **bold text**            -> <strong>bold text</strong>
 *   a blank line              -> paragraph break
 *
 * Anything else is left as-is inside a <p>, so you can also drop raw HTML
 * into a .md file (e.g. <strong>like this</strong>) and it will render.
 */
export function markdownToHtml(body) {
  const blocks = body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const heading = block.match(/^(#{2,4})\s+(.*)$/);
      if (heading) {
        const level = heading[1].length;
        return `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;
      }

      const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (image) {
        const [, alt, src] = image;
        return `<img src="${src}" alt="${escapeHtml(alt)}" class="case-diagram" loading="lazy" />`;
      }

      return `<p>${inlineMarkdown(block)}</p>`;
    })
    .join('\n');
}

function inlineMarkdown(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Fetches a .md file and parses it in one step.
 * Throws a readable error if the file is missing or the page wasn't
 * served over http (see the README for why that matters).
 */
export async function fetchMarkdown(path) {
  let res;
  try {
    res = await fetch(path);
  } catch (err) {
    throw new Error(
      `Could not fetch "${path}". If you opened this file directly by double-clicking it, ` +
        `browsers block that. Run a local server instead, see the README.`
    );
  }
  if (!res.ok) {
    throw new Error(`Could not find "${path}" (${res.status}).`);
  }
  const raw = await res.text();
  return parseMarkdown(raw);
}

/** Basic HTML-escaping for anything inserted as text, not markup. */
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}
