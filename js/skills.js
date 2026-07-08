// skills.js
//
// The "What I bring to the table" grid on the homepage.
//
// To change text: edit a `label` below.
// To change an icon: swap the `icon` value for another key from icons.js.
// To add a brand-new icon: add it to js/icons.js first, then reference its
// key here.
// To add/remove a whole category or skill: add/remove an object below.
// Nothing else needs to change, index.html reads this file directly.

export const skillCategories = [
  {
    category: 'Product & Strategy',
    accent: 'blue',
    skills: [
      { label: 'Roadmapping', icon: 'ganttChart' },
      { label: 'PRD Authoring', icon: 'fileText' },
      { label: 'Feature Prioritization', icon: 'target' },
      { label: 'Growth Strategy', icon: 'trendingUp' },
    ],
  },
  {
    category: 'Research & Discovery',
    accent: 'amber',
    skills: [
      { label: 'Customer Insight', icon: 'users' },
      { label: 'User Journey Mapping', icon: 'compass' },
      { label: 'Business Process Analysis', icon: 'workflow' },
      { label: 'Google Analytics', icon: 'lineChart' },
    ],
  },
  {
    category: 'Tools & Delivery',
    accent: 'blue',
    skills: [
      { label: 'Figma', icon: 'penTool' },
      { label: 'Agile', icon: 'kanban' },
      { label: 'Notion', icon: 'notebook' },
      { label: 'Visio', icon: 'layoutGrid' },
    ],
  },
];
