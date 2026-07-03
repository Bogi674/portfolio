// Skills & tools shown in the "What I bring to the table" grid.
//
// To change text: edit the `label` values below.
// To change an icon on an existing row: swap the `icon` key for another one already
//   listed in ICON_KEYS at the bottom of this file.
// To add a brand-new icon: browse https://lucide.dev/icons for a name, then add it to
//   the ICON_KEYS list at the bottom of this file (one line) and reference it here.
// To add/remove a whole category or skill: add/remove an object below, no other file
//   needs to change.

export interface Skill {
  label: string;
  icon: IconKey;
}

export interface SkillCategory {
  category: string;
  accent: 'blue' | 'amber';
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Product & Strategy',
    accent: 'blue',
    skills: [
      { label: 'Roadmapping', icon: 'gantt-chart' },
      { label: 'PRD Authoring', icon: 'file-text' },
      { label: 'Feature Prioritization', icon: 'target' },
      { label: 'A/B Testing', icon: 'trending-up' },
    ],
  },
  {
    category: 'Research & Discovery',
    accent: 'amber',
    skills: [
      { label: 'Customer Interviews', icon: 'users' },
      { label: 'User Journey Mapping', icon: 'compass' },
      { label: 'Business Process Analysis', icon: 'workflow' },
      { label: 'Google Analytics', icon: 'line-chart' },
    ],
  },
  {
    category: 'Tools & Delivery',
    accent: 'blue',
    skills: [
      { label: 'Figma', icon: 'figma' },
      { label: 'Agile & Scrum', icon: 'kanban' },
      { label: 'Notion', icon: 'notebook-text' },
      { label: 'Monday.com', icon: 'layout-grid' },
    ],
  },
];

// Every key here must have a matching import + entry in the ICON_MAP inside
// src/components/SkillsGrid.astro. Keep the two files in sync.
export const ICON_KEYS = [
  'gantt-chart',
  'file-text',
  'target',
  'trending-up',
  'users',
  'compass',
  'workflow',
  'line-chart',
  'figma',
  'kanban',
  'notebook-text',
  'layout-grid',
] as const;

export type IconKey = (typeof ICON_KEYS)[number];
