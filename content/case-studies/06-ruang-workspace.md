---
title: "Building Ruang: A Full-Stack App I Shipped Without Writing a Single Line of Code"
tag: "Personal Project"
summary: "Ruang is a production-ready personal workspace app I built in 18 days using AI-directed development. 8 versions, 25+ features, 0 lines written by hand."
role: "Product Manager / Owner"
timeline: "Aug 6–24, 2026 (18 days)"
impact: "8 releases, 25+ features, 0 lines written by hand"
quote: "I stopped treating the BRD as planning overhead around line 200. At 950 lines it was the most important document in the entire project."
order: 1
---

### What This Is

Ruang is a deployed web application I built as a personal project. A full-stack personal workspace: rich text notes, checklists, organized spaces, file widgets, reminders, calendar view, dark theme, per-space expressiveness, and a first-class to-do system with recurrence and drag-and-drop reordering.

Every file in the repository was written by Claude Code. I wrote nothing by hand. My job was to describe what I needed, catch what was wrong, and make the calls on scope, architecture, and quality.

This case study covers the architectural decisions I made, the things that went wrong, and what I learned about what PM work actually looks like when there is no engineering team to hand things off to.

### The First Version I Had to Kill

The project started as something else entirely. My original idea was a team project management tool built around a four-level hierarchy: Platform, Project, Workstream, and Entry. Something between Notion's flexibility and a focused PM tool's structure, anchored to dates and team workflows.

I built that version. Auth, CRUD, a TipTap note editor, file uploads to Cloudflare R2, task entries, a Today View that pulled cross-project content into one place. It ran. It did what I designed it to do.

Then I deprecated everything.

The hierarchy was technically fine. The direction was wrong. Getting to the point where you could write a note required too many upfront decisions. Every improvement I planned was reinforcing the wrong structure rather than building something genuinely better. The working version had one real value: it proved the tech stack. That was enough to justify the time spent on it.

The rebuild started from scratch. Notes, Spaces, Widgets. Capture first, organize later if you want to. Before any new code ran, I wrote a 950-line Business Requirements Document and built high-fidelity prototypes for desktop and mobile. When the written spec conflicted with the prototype, the prototype won.

![Architecture diagram: the shift from a four-level PM hierarchy to a note-first model](images/case-study-06/arch-pivot.svg)

### How the Build Actually Worked

Each session followed the same cycle. I described what was broken or what I wanted. Claude read the repository, identified the root cause, proposed a targeted fix, applied it with surgical file edits rather than full rewrites, and pushed to GitHub. Vercel autodeploys on every push. Each iteration took minutes.

The thing that made this sustainable across weeks and multiple sessions was a file called CLAUDE.md, kept in the repository as a persistent handoff artifact. Architectural rules, column names that had caused bugs, confirmed viewport measurements, decisions that needed to survive session resets. Every new session started from that file. No re-explaining from scratch.

![The development loop: PM describes, AI diagnoses, fix applied, push and deploy, PM reviews](images/case-study-06/workflow.svg)

### 8 Versions in 18 Days

Every version represents a focused cluster of sessions with its own bounded scope, not just a feature drop on a rolling branch.

![Development timeline: 8 versions from Aug 6 to Aug 24](images/case-study-06/timeline.svg)

The pivot happened before v1.0 even started. v1.0 through v1.2 built the structural foundation and connected notes to time. v1.3 was the expressiveness push. v1.4 was a dedicated mobile quality release. v1.5 was purely security hardening with no user-facing changes. v1.6, internally called Phase 7, added the first-class to-do system.

### The PM Decisions That Actually Mattered

The real work here was not choosing what to build. It was deciding whether something was worth building, when it needed to happen, and whether what already existed was actually doing anything.

**v1.3 revealed something quiet and bad.** The `surface_preference` field and `space.color` both existed in the database and settings UI before v1.3. Neither did anything visible to a user. Surface preference was dead code. Space color rendered as a 12-pixel dot in the sidebar, and nothing else. A feature that lives in the database but produces no visible output is worse than a missing feature. It creates a false sense of completeness and hides the real gap. The entire expressiveness push in v1.3 started from catching that.

**v1.5 shipped before a feature I was excited about.** The to-do system was planned and ready to begin. But before building it, I ran a dedicated security release. Two Supabase schema vulnerabilities needed fixing: `search_path` injection risk in SQL functions, and inadvertent RPC exposure on internal helper functions. I knew about both. I could have pushed the to-do release and fixed these afterward. I didn't, because every new feature shipped on top of a known vulnerability makes that vulnerability harder to address cleanly. Fixing the foundation first was the right sequence.

**v1.6 had to define "first-class" before a line of code ran.** To-dos in Ruang are not extended checklists. They have their own route, their own data lifecycle, their own view hierarchy. Building them as an extension of notes would have been faster. Building them correctly required pinning down what "first-class" actually meant before any code was generated. The extra scope came from how people think about tasks versus written content, not from what was closest to existing code.

### What Was Shipped

18 days from first commit to v1.6. 8 version tags on a single continuous main branch. 25+ features: auth, rich text notes, checklists, spaces, widgets, calendar, search, version history, export, note locking, focus mode, dark theme, mobile PWA, keyboard shortcuts, per-space expressiveness, and a full to-do system with drag-and-drop reordering, PeriodView, and recurrence support.

0 lines of code written by hand.

### Six Things This Project Taught Me

**The spec is the engineering document.** Every vague line in the BRD came back as something half-built or broken in the code. I stopped treating it as planning overhead around line 200 and started treating it as the engineering document it actually was. At 950 lines, nothing else in the project came close to it in terms of influence on the final output.

**Deprecating a working product is the hardest call.** The legacy version ran. It did what I designed it to do. Calling it wrong and starting over felt like failure even though I knew it was the right move. What made it easier was reframing the whole first version as prototype work. It confirmed the stack, surfaced the real architecture problem, and its patterns carried into the rebuild. The sunk cost was the tuition.

**What you cut shapes the codebase as much as what you ship.** Cutting file versioning from scope meant never having to build version diffing logic, rollback UI, storage cost management, or migration paths for schema changes. One cut removed four future problems at once. The shape of the product is also the shape of what was deliberately excluded.

**"Built" and "working" are not the same thing.** Before v1.3, both surface_preference and space.color existed in the schema and the settings UI. Neither did anything a user could see. Finding that was more useful than the new features I had originally planned for that release.

**Known vulnerabilities accumulate surface area.** The search_path issue and the RPC exposure were both on my radar before v1.6. I could have shipped the to-dos first and circled back. But every new feature makes existing vulnerabilities harder to address cleanly. Giving the fixes their own version tag was what stopped that pattern from forming.

**The session handoff is a real engineering artifact.** Every Claude Code session starts without memory of the previous one. CLAUDE.md was the solution. Column names that caused bugs, confirmed viewport measurements, architectural decisions that needed to survive resets. The time I spent maintaining it was paid back several times over in context that didn't need re-establishing across eight versions of development.

---

[GitHub](https://github.com/Bogi674/ruang-project-management) · [Live App](https://ruang-project-management.vercel.app)
