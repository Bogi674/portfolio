// render-case-study.js
//
// Reads ?slug=your-file from the URL, fetches content/case-studies/your-file.md,
// and fills in case-study.html. Also fetches profile.md just for the nav/footer.

import { fetchMarkdown, markdownToHtml, escapeHtml } from './content.js';

const statusEl = document.getElementById('status');
const pageEl = document.getElementById('page');

function showError(message) {
  statusEl.textContent = message;
  statusEl.classList.add('is-error');
}

function renderNavAndFooter(profile) {
  const p = profile.data;
  document.getElementById('nav-brand').textContent = p.name;
  document.getElementById('footer-copyright').textContent =
    `\u00A9 ${new Date().getFullYear()} ${p.name}`;

  const footerLinks = document.getElementById('footer-links');
  const links = [];
  if (p.linkedin) links.push(`<a href="${p.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>`);
  if (p.email) links.push(`<a href="${p.email}">Email</a>`);
  if (p.upwork) links.push(`<a href="${p.upwork}" target="_blank" rel="noreferrer">Upwork</a>`);
  footerLinks.innerHTML = links.join('');

  const ctaBtn = document.getElementById('cs-cta-btn');
  if (ctaBtn && p.email) ctaBtn.href = p.email;
}

function renderCaseStudy(entry, profileName) {
  const d = entry.data;

  document.title = `${d.title} | ${profileName}`;
  document.getElementById('meta-description').setAttribute('content', d.summary || '');

  if (d.coverImage) {
    document.getElementById('detail-cover').style.backgroundImage = `url(${d.coverImage})`;
    document.getElementById('detail-cover').innerHTML = '';
  }

  document.getElementById('detail-tag').textContent = d.tag;
  document.getElementById('detail-title').textContent = d.title;
  document.getElementById('detail-role').textContent = d.role;
  document.getElementById('detail-timeline').textContent = d.timeline;
  document.getElementById('detail-impact').textContent = d.impact;

  document.getElementById('detail-prose').innerHTML = markdownToHtml(entry.body);

  if (d.beforeImage || d.afterImage) {
    const beforeAfterEl = document.getElementById('detail-before-after');
    beforeAfterEl.hidden = false;
    beforeAfterEl.innerHTML = `
      <div class="detail-ba-image" style="${d.beforeImage ? `background-image:url(${d.beforeImage})` : ''}">
        ${d.beforeImage ? '' : '<span>before screenshot</span>'}
      </div>
      <div class="detail-ba-image" style="${d.afterImage ? `background-image:url(${d.afterImage})` : ''}">
        ${d.afterImage ? '' : '<span>after screenshot</span>'}
      </div>
    `;
  }

  if (d.quote) {
    const quoteEl = document.getElementById('detail-quote');
    quoteEl.hidden = false;
    quoteEl.textContent = `"${d.quote}"`;
  }
}

async function init() {
  const slug = new URLSearchParams(window.location.search).get('slug');

  if (!slug) {
    showError('No case study specified. Go back and click a case study card, or add ?slug=your-file to the URL.');
    return;
  }

  try {
    const [profile, entry] = await Promise.all([
      fetchMarkdown('content/profile/profile.md'),
      fetchMarkdown(`content/case-studies/${slug}.md`),
    ]);

    renderNavAndFooter(profile);
    renderCaseStudy(entry, profile.data.name);

    statusEl.hidden = true;
    pageEl.hidden = false;
  } catch (err) {
    console.error(err);
    showError(err.message || 'Something went wrong loading this case study.');
  }
}

init();
