// render-home.js

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

const ARROW_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
  <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
</svg>`;

function renderWorkWithMe() {
  const engagementsEl = document.getElementById('wwm-engagements');

  engagements.forEach((e, i) => {
    const card = document.createElement('div');
    card.className = 'wwm-card';
    card.innerHTML = `
      <div class="wwm-icon">${e.icon}</div>
      <div class="wwm-card-body">
        <span class="wwm-timing">${escapeHtml(e.timing)}</span>
        <h3 class="wwm-card-title">${escapeHtml(e.title)}</h3>
        <p class="wwm-card-subtitle">${escapeHtml(e.subtitle)}</p>
      </div>
    `;
    engagementsEl.appendChild(card);

    if (i < engagements.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'wwm-arrow';
      arrow.innerHTML = ARROW_ICON;
      engagementsEl.appendChild(arrow);
    }
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
  const container = document.getElementById('testimonials-grid');
  container.className = 'testimonials-carousel';

  // Row: prev button + track-wrap + next button
  const row = document.createElement('div');
  row.className = 'testimonials-row';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'testimonials-nav testimonials-prev';
  prevBtn.setAttribute('aria-label', 'Previous testimonial');
  prevBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
    stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
    <path d="M15 18l-6-6 6-6"/></svg>`;

  const nextBtn = document.createElement('button');
  nextBtn.className = 'testimonials-nav testimonials-next';
  nextBtn.setAttribute('aria-label', 'Next testimonial');
  nextBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
    stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
    <path d="M9 18l6-6-6-6"/></svg>`;

  const trackWrap = document.createElement('div');
  trackWrap.className = 'testimonials-track-wrap';

  const track = document.createElement('div');
  track.className = 'testimonials-track';

  testimonials.forEach((t) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide';
    slide.innerHTML = `
      <div class="testimonial-card">
        <div class="testimonial-quote-mark">\u201C</div>
        <p class="testimonial-quote">${escapeHtml(t.quote)}</p>
        <div class="testimonial-attr">
          <span class="testimonial-name">${escapeHtml(t.name)}</span>
          <span class="testimonial-role">${escapeHtml(t.role)}, ${escapeHtml(t.company)}</span>
        </div>
      </div>
    `;
    track.appendChild(slide);
  });

  trackWrap.appendChild(track);
  row.appendChild(prevBtn);
  row.appendChild(trackWrap);
  row.appendChild(nextBtn);

  // Dots
  const dots = document.createElement('div');
  dots.className = 'testimonials-dots';
  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonials-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dots.appendChild(dot);
  });

  container.appendChild(row);
  container.appendChild(dots);

  // Carousel logic
  let current = 0;
  let autoTimer = null;
  const total = testimonials.length;
  const dotEls = dots.querySelectorAll('.testimonials-dot');

  function goTo(idx) {
    current = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotEls.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  function startAuto() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    autoTimer = setInterval(() => goTo(current + 1), 15000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  dotEls.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', startAuto);

  // Swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      stopAuto();
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });

  startAuto();
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
