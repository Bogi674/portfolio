---
title: "Scoping a Complete Savings App for a US Client"
tag: "Client Work"
summary: "A US-based client had a concept for a mobile grocery savings app. No specs, no flows, no UI. I delivered a full PRD across five modules, end-to-end user flow diagrams for every happy path and error branch, and a high-fidelity Figma prototype ready for developer handoff."
role: "Product Consultant"
timeline: "Concept to build-ready delivery"
impact: "Full PRD · 5-module flows · High-fi Figma prototype"
quote: "The client had a good instinct about the problem. The work was to translate that instinct into something a development team could actually build from."
order: 4
coverImage: "images/case-study-03/save-cover.jpg"
---

### The Brief: Concept Without Spec

A US-based entrepreneur came with a clear problem: people overspend on groceries because good deals aren't visible at the moment of purchase. Around 80 percent of US consumers already check their phones for prices while in-store. The market was real. What didn't exist yet was a spec.

The engagement was to take the concept to a complete, developer-ready package: PRD, end-to-end user flows, and high-fidelity UI.

### Why This App Had to Work Differently

Before writing a single requirement, I spent time on the harder question: why do most coupon and savings apps get abandoned?

The answer is consistent. The effort exceeds the benefit before any value is proven. You have to remember to open the app, find deals that match your actual list, then remember to use them at the register. Most people drop off somewhere in that chain.

That diagnosis drove the entire product logic. The app had to show up where the user already was: near a store, mid-planning, or receipt in hand. Not as an extra step. That's what shaped the four core capabilities: proximity-triggered deal discovery, receipt scanning for automatic spend tracking, shopping list deal-matching, and saved deals for recurring favorites.

### Five Modules, Fully Scoped

![Five MVP modules and how they connect: Onboarding, Deals Discovery, Scan Receipt, Shopping List, Saved Deals](images/case-study-03/cs3-modules.svg)

The PRD covered MVP 1 across five modules with over 30 requirements, each written as a user story with acceptance criteria.

Onboarding was scoped for minimum friction: a two-step walkthrough, optional promo cards, and registration collecting only name, phone or email, and password, verified via OTP.

Deals Discovery split into two sub-flows. Proximity deals used periodic GPS refresh to show highlighted map pins. Tapping a pin opened a voucher popup with a "See More" path and a "Navigate to" button that hands off to the device maps app. Online deals loaded inside the app via iframe, keeping the purchase flow contained. Push notifications trigger when the user is near a qualifying store and not already in the app.

Shopping List built directly on the scan output. Scanned items became an editable list, and lists could also be built manually from the item database. A single action triggers a deal search per item, with navigation to the winning store from the same screen.

Saved Deals let users bookmark any deal from the discovery flow, with store details and actions to navigate or remove.

### The Hard Part Was the Error Surface

Happy paths are easy to spec. Scan Receipt had the most error branches to document.

![Scan Receipt: happy path and error branches including retry handling and CS escalation](images/case-study-03/cs3-scan-flow.svg)

Duplicate receipt detection runs via image hash matching. Fake receipts get flagged against store, date, and total value. OCR failures surface a retry prompt, and after a set number of failed attempts, escalation to a "Contact Customer Service" CTA appears alongside the retry. Each branch needed its own requirement ID, error message direction, and acceptance criteria.

Getting that error surface right was the biggest gap between "we have a spec" and "we have something a dev team can actually build to."

### High-Fidelity UI in Figma

![SAVE App deals discovery map view and shopping list](images/case-study-03/save-ui-map.jpg)

The prototype covered the full experience. The deals discovery map was the visual center: store pins highlighting on the map, tappable for voucher popups, with a one-tap navigate handoff. Receipt scanning put the camera experience front and center with unambiguous success and failure states. Shopping list and saved deals followed a consistent card pattern across all list views.

![SAVE App receipt scan and saved deals screens](images/case-study-03/save-ui-scan.jpg)

Purpose was dual: stakeholder demo and developer handoff.

### What This Shows

Most consulting starts with a brief that describes the solution. This one started with a good instinct and no specification.

Getting the spec right meant understanding why the category typically fails before writing any requirement. The PRD, flows, and UI are three views of the same product, all built around the same principle: value has to show up where the user already is, not as a step they have to remember to take.
