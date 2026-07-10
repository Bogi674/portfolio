// work-with-me.js

const icon = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
    stroke-linecap="round" stroke-linejoin="round" width="32" height="32">${paths}</svg>`;

export const engagements = [
  {
    icon: icon(`
      <circle cx="8" cy="7" r="4"/>
      <path d="M2 21c0-3.9 2.7-7 6-7h2"/>
      <path d="m17 13 2 2 2-2"/>
      <path d="M19 15v-3a4 4 0 0 0-4-4h-1"/>
    `),
    title: 'Fractional PM',
    subtitle: 'Your embedded PM, part-time.',
    timing: 'Ongoing',
  },
  {
    icon: icon(`
      <circle cx="11" cy="11" r="7"/>
      <path d="m21 21-4.3-4.3"/>
    `),
    title: 'Discovery Sprint',
    subtitle: 'Diagnose the problem. Define the path.',
    timing: '2 to 4 weeks',
  },
  {
    icon: icon(`
      <rect x="8" y="2" width="8" height="4" rx="1"/>
      <path d="M4 6h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>
      <path d="m9 14 2 2 4-4"/>
    `),
    title: 'Process + Product Audit',
    subtitle: 'Find where operations and product drift apart.',
    timing: 'One-time',
  },
];

export const wwmAudience = [
  'Early-stage startups that need senior PM thinking without a full-time hire',
  'Fintech, multi-finance, or digital-first companies building or scaling their digital products',
  'Teams where the gap between how the business runs and how the product works is the actual blocker',
];
