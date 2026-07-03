// manifest.js
//
// Plain HTML can't scan a folder and see what files are inside it, only a
// server or a build step can do that. Since this site has neither, this
// one array is how the site knows which case studies exist.
//
// To add a case study: create content/case-studies/your-file.md, then add
// "your-file" to the list below (no .md extension here).
// To remove one: delete both the file and its line here.
// The display order on the page is controlled by the `order` field inside
// each .md file, not by the order of this list.

export const caseStudyFiles = [
  '01-whatsapp-acquisition-funnel',
  '02-digital-migration',
  '03-lead-filtering',
  '04-digital-catalogue',
];
