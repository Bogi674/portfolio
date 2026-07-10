// render-home.js
//
// Fetches content/profile/profile.md and every file listed in
// content/case-studies/manifest.js, then fills in index.html.
// No build step, this runs in the browser exactly as written.

import { fetchMarkdown, markdownToHtml, escapeHtml } from './content.js';
import { caseStudyFiles } from '../content/case-studies/manifest.js';
import { skillCategories } from './skills.js';
import { ICONS } from './icons.js';
import { engagements, wwmAudience } from './work-with-me.js';
import { testimonials } from './testimonials.js';

const statusEl = document.getElementById('status');
const pageEl = document.getElementById('page');

function showError(message) {
  statusEl.textContent = message;
  statusEl.classList.add('is-error');
}

function renderProfile(profile) {
  const p = profile.data;

  document.title = `${p.name} | Product Manager`;
  document.getElementById('meta-description').setAttribute('content', p.intro || '');

  document.getElementById('nav-brand').textContent = p.name;
  document.getElementById('hero-eyebrow').textContent = p.eyebrow;
  document.getElementById('hero-headline').textContent = p.headline;
  document.getElementById('hero-intro').textContent = p.intro;

  if (p.headshot) {
    document.getElementById('hero-portrait').innerHTML =
      `<img src="${escapeHtml(p.headshot)}" alt="Portrait" />`;
  }

  if (p.resumeUrl) {
    const resumeLink = document.getElementById('hero-resume');
    resumeLink.href = p.resumeUrl;
    resumeLink.hidden = false;
  }

  const highlightsEl = document.getElementById('story');
  [
    [p.stat1Value, p.stat1Label],
    [p.stat2Value, p.stat2Label],
    [p.stat3Value, p.stat3Label],
  ]
    .filter(([value, label]) => value && label)
    .forEach(([value, label]) => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.innerHTML = `
        <div class="stat-value">${escapeHtml(value)}</div>
        <div class="stat-label">${escapeHtml(label)}</div>
      `;
      highlightsEl.appendChild(card);
    });

  document.getElementById('story-prose').innerHTML = markdownToHtml(profile.body);

  document.getElementById('cta-headline').textContent = p.ctaHeadline;
  document.getElementById('cta-body').textContent = p.ctaBody;
  document.getElementById('cta-email').href = p.email || '#contact';

  document.getElementById('footer-copyright').textContent =
    `\u00A9 ${new Date().getFullYear()} ${p.name}`;

  const footerLinks = document.getElementById('footer-links');
  const links = [];
  if (p.linkedin) links.push(`<a href="${p.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>`);
  if (p.email) links.push(`<a href="${p.email}">Email</a>`);
  if (p.upwork) links.push(`<a href="${p.upwork}" target="_blank" rel="noreferrer">Upwork</a>`);
  footerLinks.innerHTML = links.join('');
}

async function renderCaseStudies() {
  const entries = await Promise.all(
    caseStudyFiles.map(async (slug) => {
      const entry = await fetchMarkdown(`content/case-studies/${slug}.md`);
      return { slug, ...entry };
    })
  );

  const visible = entries
    .filter((entry) => entry.data.published !== 'false')
    .sort((a, b) => Number(a.data.order || 0) - Number(b.data.order || 0));

  const caseGrid = document.getElementById('case-grid');
  visible.forEach((cs) => {
    const card = document.createElement('a');
    card.className = 'case-card';
    card.href = `case-study.html?slug=${encodeURIComponent(cs.slug)}`;
    card.innerHTML = `
      <div class="case-cover" style="${cs.data.coverImage ? `background-image:url(${cs.data.coverImage})` : ''}">
        ${cs.data.coverImage ? '' : '<span>cover image / product shot</span>'}
      </div>
      <div class="case-body">
        <span class="case-tag">${escapeHtml(cs.data.tag)}</span>
        <h3>${escapeHtml(cs.data.title)}</h3>
        <p>${escapeHtml(cs.data.summary)}</p>
      </div>
    `;
    caseGrid.appendChild(card);
  });
}

function renderSkills() {
  const skillsPanel = document.getElementById('skills-panel');
  skillCategories.forEach((cat) => {
    const catEl = document.createElement('div');
    catEl.className = 'skills-category';

    const skillsHtml = cat.skills
      .map(
        (skill) => `
        <div class="skill">
          <div class="skill-icon ${cat.accent}">${ICONS[skill.icon] || ''}</div>
          <div class="skill-label">${escapeHtml(skill.label)}</div>
        </div>
      `
      )
      .join('');

    catEl.innerHTML = `
      <p class="skills-cat-label">${escapeHtml(cat.category)}</p>
      <div class="skills-grid">${skillsHtml}</div>
    `;
    skillsPanel.appendChild(catEl);
  });
}

function renderWorkWithMe() {
  const engagementsEl = document.getElementById('wwm-engagements');
  engagements.forEach((e) => {
    const card = document.createElement('div');
    card.className = 'wwm-card';
    card.innerHTML = `
      <span class="wwm-timing">${escapeHtml(e.timing)}</span>
      <h3 class="wwm-card-title">${escapeHtml(e.title)}</h3>
      <p class="wwm-card-desc">${escapeHtml(e.description)}</p>
    `;
    engagementsEl.appendChild(card);
  });

  const audienceEl = document.getElementById('wwm-audience');
  const listItems = wwmAudience
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');
  audienceEl.innerHTML = `
    <div class="wwm-audience-inner">
      <p class="wwm-audience-label">This works best if you are</p>
      <ul class="wwm-audience-list">${listItems}</ul>
      <a href="#contact" class="btn wwm-cta">Let's figure out the right fit</a>
    </div>
  `;
}

function renderTestimonials() {
  const gridEl = document.getElementById('testimonials-grid');
  testimonials.forEach((t) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <p class="testimonial-quote">${escapeHtml(t.quote)}</p>
      <div class="testimonial-attr">
        <span class="testimonial-name">${escapeHtml(t.name)}</span>
        <span class="testimonial-role">${escapeHtml(t.role)}, ${escapeHtml(t.company)}</span>
      </div>
    `;
    gridEl.appendChild(card);
  });
}

async function init() {
  try {
    const profile = await fetchMarkdown('content/profile/profile.md');
    renderProfile(profile);
    await renderCaseStudies();
    renderSkills();
    renderWorkWithMe();
    renderTestimonials();

    statusEl.hidden = true;
    pageEl.hidden = false;
  } catch (err) {
    console.error(err);
    showError(err.message || 'Something went wrong loading this page.');
  }
}

init();
