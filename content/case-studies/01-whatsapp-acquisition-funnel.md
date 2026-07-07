---
title: "Rebuilding an Acquisition Funnel Around WhatsApp"
tag: "Product Strategy"
summary: "Four iterations of one experiment: every time we cut reply time, conversion jumped. The final answer was rebuilding the entire journey as WhatsApp-native."
role: "Product Manager, ACC ONE Platform"
timeline: "4 iterations, ongoing"
impact: "Conversion nearly 2x non-WhatsApp channels"
quote: "The final redesign was not a bet, it was the logical conclusion of evidence the funnel had been giving us all along."
order: 1
coverImage: "images/case-study-01/case-study-1-thumb.jpg"
---
### The Baseline: A Broken Flow That Still Won

Every customer reply to a WhatsApp promotion was manually recapped, fed into the telemarketing system, and followed up the next day. Customers who had just raised their hand waited 12 to 24 hours to hear back.

And yet, even broken, the channel outperformed. WhatsApp promotion converted 30 to 40 percent better than pure cold calling. That gap was the signal: the channel had real pull, and the process was the bottleneck.

![Baseline flow: manual recap, 12 to 24 hour reply time, still 30 to 40 percent better than cold calling](images/case-study-01/iter-0-baseline.svg)

### Iteration 1: Same Process, Hourly Cadence

The first move was deliberately minimal. Keep the manual recap workflow untouched, but run it every hour during working hours instead of once a day. One variable changed, so the result would be readable.

The result was immediate. WhatsApp conversion jumped to roughly 80 percent above non-WhatsApp channels, and the channel's contribution helped push revenue up to Rp 4.9 billion.

![Iteration 1: same manual process, run hourly instead of daily, conversion up 80 percent, revenue up to Rp 4.9 billion](images/case-study-01/iter-1-hourly.svg)

### Iteration 2: Live Agent in the Chat

If hourly was that much better than daily, what would near-instant look like? We removed the recap-and-queue pipeline entirely and put live agents directly into the conversation.

Conversion stepped up again, to nearly double the non-WhatsApp flow. Two experiments, one consistent pattern: the faster the reply, the better the conversion. Speed of response was the single biggest lever in the funnel.

![Iteration 2: live agent responds directly inside the chat, conversion nearly 2x non-WhatsApp](images/case-study-01/iter-2-live-agent.svg)

### The Friction Speed Couldn't Fix

Even at maximum response speed, the journey had a structural flaw left over from its web-first origins. After agreeing on a deal in chat, the customer had to leave WhatsApp, open the ACC ONE app, log in, find the plafond menu, and re-enter an application based on a conversation that had already happened. Then they waited for the same telemarketer who already knew everything to review and approve it before it went to a branch for signing.

We had optimized the conversation and never touched the handoff after it.

![The remaining friction: after the deal is made in chat, the customer is routed through a separate web app to re-apply and wait for review again](images/case-study-01/iter-3-friction.svg)

### The Redesign: WhatsApp-Native End to End

The current project closes that gap by rebuilding the journey as WhatsApp-native from first message to final decision. The YUNA chatbot qualifies leads and captures application data inside the same thread, low-risk cases get an instant decision, and human agents handle only the cases that need judgment, the exact pattern the live-agent experiment had already validated.

The goal is straightforward: cut customer lead time, increase acquisition speed, remove the friction the old flow kept reintroducing, and let conversion climb further on top of what speed alone had already proven.

![WhatsApp-native acquisition flow: chatbot qualifies the lead, low-risk cases get an instant decision, harder cases go to a human agent, all inside WhatsApp](images/case-study-01/funnel-diagram.svg)

I documented the full flow as a BRD with a BPMN 2.0 process diagram, which became the shared reference across product, operations, and engineering during the build.

### What This Shows

I did not start by assuming WhatsApp-native was the answer. Each iteration was a small, cheap test with one variable changed, and each result justified the next investment. The final redesign was not a bet, it was the logical conclusion of evidence the funnel had been giving us all along.
