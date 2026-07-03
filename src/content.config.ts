import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every .md file in src/content/case-studies becomes one card + one detail page.
// Add a new file to add a case study. Delete a file to remove one. No code changes needed.
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),                 // small pill, e.g. "0→1 Launch", "Growth", "Platform"
    summary: z.string(),              // one or two sentences shown on the card
    role: z.string(),
    timeline: z.string(),
    impact: z.string(),
    quote: z.string().optional(),     // optional pull-quote shown on the detail page
    coverImage: z.string().optional(),
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    order: z.number().default(0),     // lower shows first
    published: z.boolean().default(true),
  }),
});

// Single-entry collection for the "about you" content: hero, story, stats, contact links.
// Edit src/content/profile/profile.md directly, there is only ever one file here.
const profile = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    eyebrow: z.string(),              // small line above the headline, e.g. "PRODUCT MANAGER · B2B SAAS"
    headline: z.string(),
    intro: z.string(),                // short paragraph under the headline
    resumeUrl: z.string().optional(),
    headshot: z.string().optional(),  // path under /public, e.g. "/headshot.jpg"
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    ctaHeadline: z.string(),
    ctaBody: z.string(),
    linkedin: z.string().optional(),
    email: z.string().optional(),
    upwork: z.string().optional(),
  }),
});

export const collections = { 'case-studies': caseStudies, profile };
