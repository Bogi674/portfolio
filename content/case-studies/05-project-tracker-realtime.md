---
title: "Growing a One-File Tracker Into a Real-Time Team App"
tag: "Product Building"
summary: "Every release removed one coordination friction and exposed the next. A single browser-local HTML file became a real-time, authenticated, multi-user app the PM team runs on."
role: "Product Manager and Builder, ACC ONE PM Team"
timeline: "6 releases (v1 to v2.5), ongoing"
impact: "One shared source of truth, live for the whole PM team"
quote: "I never planned a real-time multi-user app. Each version only solved the friction the last one exposed, and the architecture earned its complexity one proven need at a time."
coverImage: "images/case-study-05/pt-cover.svg"
order: 5
---
### The Baseline: One File, Everyone's Own Copy

The tracker started as a single HTML file. You opened it, edited your projects and checkpoints in a table, and it saved to the browser's own storage. No server, no sign-in, no build step. Sharing meant exporting an Excel snapshot and sending it around.

It worked, and that was the signal. People used it because it matched exactly how our PM checkpoints actually move, in a way no generic spreadsheet did. But everyone held a private copy that drifted the moment someone else made a change. The tool was right. The storage model was the bottleneck.

![Baseline: a single HTML file saving to one browser, shared only as stale Excel exports, so every teammate holds a diverging copy](images/case-study-05/pt-0-baseline.svg)

### Iteration 1: One Shared Source of Truth

The first real move changed one thing: stop saving to the browser, save to a shared live database. I rebuilt the data layer on Firebase Firestore with a normalized model, a config document, a projects collection, and activities nested under each project. Real-time listeners pushed every change to every open screen. Edits applied to the local view instantly and wrote to Firestore in the background, with an offline cache so the app kept working through a dropped connection and a small badge showing live or reconnecting.

The forked-copy problem disappeared. There was now one version of the data, and it updated while you watched. That single change turned a personal utility into something a team could actually stand on, and it immediately raised the next question: if everyone is in here together, a plain editable table is not enough.

![Iteration 1: every client subscribes to one Firestore database through real-time listeners, so a single edit appears on every screen at once](images/case-study-05/pt-1-realtime.svg)

### Iteration 2: From Spreadsheet to Tool

Once people lived in the app together, raw cells started to feel crude. I made status a set of tappable pills instead of typed text, added drag-to-reorder for activity rows with a grip handle and a floating preview so priority became a gesture rather than a renumbering chore, and put rich text into the Work Item, Next Action, and Notes fields so people could structure what they wrote. The Excel export stayed, quietly flattening that formatting back to plain text on the way out.

None of this changed what the tool stored. It changed how much the team trusted it to hold real work. The friction had moved from storage to expression and control.

![Iteration 2: status pills, drag-to-reorder rows, and rich-text fields turn a flat editable table into something that feels like a real tool](images/case-study-05/pt-2-tool.svg)

### The Friction Sync Couldn't Fix

Real-time sync solved staleness and created a new problem in its place. Anyone with the link could open the app and change anything, and nothing recorded who did what. A shared source of truth with no boundaries is also a shared liability, and the better the tool got, the more that gap mattered.

Speed of collaboration was never going to fix this. It was structural. The app knew the data cold and knew nothing about the people touching it.

![The gap sync could not close: one open shared database with no identity, where anyone with the link can edit and nothing records who changed what](images/case-study-05/pt-3-governance-gap.svg)

### Iteration 3: Identity, Then Coordination in the Open

Two releases closed that gap. First I gave the app a proper structure and a real door. I split the single file into a clean index, stylesheet, and script, added Google sign-in with a popup and redirect fallback, and introduced a members list keyed by email with admin and member roles, an admin screen to manage them, and an auth flow that routes each visitor to loading, sign-in, access-denied, or the app.

With identity in place, coordination features made sense. I added view-only share links for stakeholders who should see but not touch, @mentions with autocomplete and a notification bell so you could pull a specific person into a specific row, and live presence avatars driven by a heartbeat so you could see who else was in the tracker right now. The record stopped being a passive table and became a place the team actually coordinated inside.

![Iteration 3: Google sign-in and role-based membership wrap the shared data, then view-only links, mentions, and live presence let the team coordinate on top of it](images/case-study-05/pt-4-collaboration.svg)

### The Hardening Pass: Confidence, and a Spine That Scales

By this point the remaining frictions were subtle and all about confidence. I added a five-step undo on a button and on Ctrl/Cmd Z, covering edits, status changes, adds, deletes, and reorders, so nobody had to fear touching shared data. The same release fixed quiet bugs the earlier features had left behind. Presence flickered because it trusted each machine's clock, so I moved it to a single server timestamp. Mentions sometimes never arrived because of email casing, so I normalized it and made a mention click jump straight to its row. Sign-in kept silently reusing one Google account until I forced the account chooser. Checkpoints also got grouping by week and month with collapsible columns, so a long horizon stayed readable.

Under all of that, I split the one growing script into nine focused modules behind a small entry point. The discipline I held to was sequencing: convert the shared mutable variables into a single state object and confirm the whole thing still works before slicing anything, rather than splitting and refactoring at the same time. Module-private state is reached through setters, not poked at from across files. It is unglamorous work, and it is the reason the tool can keep growing without collapsing under its own weight.

![The hardening pass: undo, a server-timestamp presence fix, mention and sign-in fixes, checkpoint grouping, and a split into nine focused modules behind a small entry point](images/case-study-05/pt-5-architecture.svg)

### What This Shows

I never set out to build a real-time, authenticated, multi-user collaboration app. It began as one HTML file saving to a browser tab. Each version solved the friction the previous one exposed, and rarely more than that. Real-time sync earned auth. Auth earned presence and mentions. Depth of use earned undo and a modular rebuild.

The through-line was one thing: the smaller the gap between doing something and everyone seeing it, the more the team ran on the tool instead of around it. The architecture didn't come from a grand plan. It earned its complexity one proven need at a time.
