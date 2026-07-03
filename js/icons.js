// icons.js
//
// A small hand-drawn icon set as raw SVG strings. No npm package, no
// external requests, everything ships in this one file.
//
// To use a different icon on an existing skill, just point to a different
// key from this file in skills.js.
// To add a brand-new icon, add a new "yourKey: `<svg ...>...</svg>`" entry
// below (copy the format of an existing one) and reference "yourKey" in
// skills.js. Each icon uses stroke="currentColor" so it automatically
// picks up whatever color CSS gives it, you don't need to edit colors here.

const svg = (paths) => `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
  ${paths}
</svg>`;

export const ICONS = {
  // Roadmapping
  ganttChart: svg(`
    <rect x="3" y="4" width="10" height="3" rx="1"></rect>
    <rect x="7" y="10.5" width="14" height="3" rx="1"></rect>
    <rect x="3" y="17" width="8" height="3" rx="1"></rect>
  `),

  // PRD Authoring / Notion
  fileText: svg(`
    <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"></path>
    <path d="M15 2v5h5"></path>
    <path d="M8.5 13h7"></path>
    <path d="M8.5 17h7"></path>
  `),

  // Feature Prioritization
  target: svg(`
    <circle cx="12" cy="12" r="9"></circle>
    <circle cx="12" cy="12" r="5"></circle>
    <circle cx="12" cy="12" r="1"></circle>
  `),

  // A/B Testing
  trendingUp: svg(`
    <path d="M3 17l6-6 4 4 8-9"></path>
    <path d="M15 6h6v6"></path>
  `),

  // Customer Interviews
  users: svg(`
    <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>
    <circle cx="8" cy="8" r="3.5"></circle>
    <path d="M15 8.5c1.8.4 3 2 3 3.9"></path>
    <path d="M16.5 14.3c2.1.6 3.5 2.6 3.5 5.2"></path>
  `),

  // User Journey Mapping
  compass: svg(`
    <circle cx="12" cy="12" r="9"></circle>
    <path d="M15 9l-2 6-6 2 2-6 6-2z"></path>
  `),

  // Business Process Analysis
  workflow: svg(`
    <rect x="3" y="4" width="6" height="5" rx="1"></rect>
    <rect x="15" y="4" width="6" height="5" rx="1"></rect>
    <rect x="9" y="15" width="6" height="5" rx="1"></rect>
    <path d="M6 9v3a2 2 0 0 0 2 2h1"></path>
    <path d="M18 9v3a2 2 0 0 1-2 2h-1"></path>
  `),

  // Google Analytics
  lineChart: svg(`
    <path d="M3 3v18h18"></path>
    <path d="M7 15l4-5 3 3 5-7"></path>
  `),

  // Figma (generic design-tool mark, not the Figma logo)
  penTool: svg(`
    <path d="M12 3l7 7-9 9-4 1 1-4 9-9"></path>
    <path d="M15 6l3 3"></path>
  `),

  // Agile & Scrum
  kanban: svg(`
    <rect x="3" y="4" width="5" height="16" rx="1"></rect>
    <rect x="10" y="4" width="5" height="10" rx="1"></rect>
    <rect x="17" y="4" width="4" height="13" rx="1"></rect>
  `),

  // Notion / notes
  notebook: svg(`
    <rect x="4" y="3" width="16" height="18" rx="1"></rect>
    <path d="M8 3v18"></path>
    <path d="M12 8h5"></path>
    <path d="M12 12h5"></path>
    <path d="M12 16h5"></path>
  `),

  // Monday.com
  layoutGrid: svg(`
    <rect x="3" y="3" width="8" height="8" rx="1"></rect>
    <rect x="13" y="3" width="8" height="8" rx="1"></rect>
    <rect x="3" y="13" width="8" height="8" rx="1"></rect>
    <rect x="13" y="13" width="8" height="8" rx="1"></rect>
  `),
};
