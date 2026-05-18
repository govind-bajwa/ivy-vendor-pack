# 🌿 Ivy v1.0 — User Workflow

## A Stage-by-Stage Walkthrough With Ivy in Place

---

## Executive Summary

This document mirrors the structure of the default-state workflow doc — same nine stages, same protagonist (Sarah Bennett at Northchart Advisory), same UK + Ireland inline variation pattern — but rewritten as Sarah's day **with Ivy v1.0 deployed across the firm**.

**The headline transformation:** Sarah's typical advised protection sale drops from **6.7 hours to ~3.3 hours of fee-earning staff time per closed policy** — a 205-minute saving, 51% of the default-state burn. Cost per closed policy drops from £446 to ~£330. Net margin per case rises from £202 (31% of commission) to ~£318 (49% of commission). The 8-adviser Northchart firm captures **~£115k of annual value** against an £18k subscription — **~6.4× ROI in year one.**

**The three biggest single wins:**
- Stage 4 (FactFind) drops 100 → 70 min as A2 captures live during the call and eliminates post-call typing-up
- Stage 5 (Research & Quote) drops 75 → 35 min as A3-Stub generates structured quote inputs from the FactFind, eliminating the re-key into the adviser's quote engine
- Stage 7 (Application) shifts from adviser to admin team — M1 ingests signed documents, M2 cross-verifies all data points, M4 guides per-insurer portal submission

**What v1.0 doesn't fix yet (deferred to v1.1):** A1 Pre-FactFind Disclosure auto-trigger on booking (firm continues using their existing disclosure send process; A7 still tracks template versions). A3-Lite full quote-engine API integration (BIS first, SolutionBuilder next, Iress after). Configurable workflow engine for per-broker SOPs (v1.0 ships generic 4-stage admin kanban). UK insurer expansion beyond Royal London UK / L&G / Vitality / Aviva UK. UnderwriteMe deep API partnership.

**What v1.0 deliberately doesn't build at all:** Full RPA portal auto-fill (A5 replaced by M4 guided checklists). Quote engine itself (partner with iPipeline / BIS / Iress permanently). System-of-Record CRM (Plum / Acre / Plannr / intelliflo continue underneath; Ivy is the daily UI on top).

---

## Scope and How to Read

**Unit of analysis:** the same one closed advised protection sale used in the default-state doc, run through the same Northchart firm — but with Ivy v1.0 deployed.

**Same sample case:** Mark Roberts, age 38, self-employed graphic designer, £62k income, £245k mortgage, partner Sophie + 2 children, brother diagnosed with bowel cancer last month, recommended onto Vitality decreasing-term life with accelerated CI at £42/month.

**v1.0 feature set (18 features deployed):** F1, F2, F4, F6, A2, A3-Stub, A4, A7, C1, C8, C6, C4, M1, M2, M3, M4, M5, M6.

**v1.1 features called out where relevant:** A1, A3-Lite (BIS / SolutionBuilder / Iress), configurable workflow engine, UK insurer expansion, UnderwriteMe deep integration.

**Each stage uses a seven-element template:** *(1) one-line purpose, (2) the story in numbered points, (3) ASCII screen mockup, (4) coloured process flow, (5) Inputs / Activities / Outputs / Tools, (6) Under the Hood — Ivy X-Ray, (7) Time and Cost Saved.*

> **Note (2026-05-10):** Saved from a paste with encoding artifacts; ftfy applied for repair. Per-stage detailed screen mockups and Mermaid flow diagrams from the original may still need polishing — repaste from the original source if anything still reads as mojibake.

---

## The Macro Map — Ivy v1.0 Across All 9 Stages

```
┌───────────────┬───────────────┬───────────────┬───────────────┬───────────────┐
│  Stage 1      │  Stage 2      │  Stage 3      │  Stage 4      │  Stage 5      │
│  Lead         │  Triage       │  Pre-         │  FactFind     │  Research +   │
│  Capture      │               │  FactFind     │  Call         │  Quote        │
│  12 → 2 min   │  22 → 5 min   │  10 → 5 min   │  100 → 70 min │  75 → 35 min  │
│  [adviser]    │  [adviser]    │  [adv-copilot]│  [compliance] │  [adv-copilot]│
└───────────────┴───────────────┴───────────────┴───────────────┴───────────────┘
                                       │
                                       ▼
┌───────────────┬───────────────┬───────────────┬───────────────┐
│  Stage 6      │  Stage 7      │  Stage 8      │  Stage 9      │
│  Suitability  │  Application  │  UW Tracking  │  Compliance   │
│                                              │  File         │
│  55 → 25 min  │  50 → 25 min  │  40 → 20 min  │  38 → 10 min  │
│  [adv-copilot]│  [admin]      │  [admin]      │  [compliance] │
└───────────────┴───────────────┴───────────────┴───────────────┘
```

Stages 1–2 — adviser surface (lead capture and qualification). Stage 3 — adviser co-pilot (pre-call disclosures). Stage 4 — call recording and compliance (live fact-find). Stages 5–6 — adviser co-pilot (quote inputs and suitability). Stages 7–8 — admin co-pilot (back-office submission and underwriting). Stage 9 — call recording and compliance (audit file).

**Total fee-earning time per closed policy:** 402 → 197 minutes **(saving of 205 min / 3.4 hours per case).**

---

## The Surfaces and AI Layers

Ivy v1.0 ships **three user surfaces** for three different roles in a protection broker firm, plus **two cross-cutting AI layers** that operate across all surfaces. Each role gets its own home but works on the same underlying customer record — there's one data model, three projections.

**Key principle:** the customer card is the master data object. Everything else — kanban cards, dashboard line items, compliance file documents — projects from it. There's no copy-paste between surfaces, no separate databases, no risk of drift.

### The Customer Card

The central canvas for every advised case. Sections fill in as the workflow progresses; each section ties back to a specific feature.

| Section | Filled by | When |
|---|---|---|
| **Lead profile + score** | F1 + external data connectors | Stage 1 |
| **Qualifier conversation log** | F2 / F6 | Stage 2 |
| **Vulnerability flags** | C6 | Stages 2, 4, 8 (continuous) |
| **Booking** | F4 | Stage 3 |
| **Call recording + transcript** | C1 | Stage 4 |
| **FactFind (structured)** | A2 | Stage 4 |
| **Quote inputs** | A3-Stub | Stage 5 |
| **Quote results + KFIs** | adviser pastes back from quote engine | Stage 5 |
| **Suitability draft + score** | A4 + A7 | Stage 6 |
| **Application bundle + cross-doc verify report** | M1 + M2 | Stage 7 |
| **Portal submission status** | M3 + M4 | Stage 8 |
| **Insurer email log** | M5 | Stage 8 |
| **Client comms (sent)** | M6 | Stage 9 |
| **Compliance file index** | C4 | Stage 9 (assembles continuously) |

The same record renders differently in each surface: Sarah sees it as a multi-section card; Niamh sees it as a kanban tile with M2 verification report; Mark Reynolds sees it as a row in his pipeline view.

### The three user surfaces (described)

**Adviser Surface — Sarah's home screen.** What Sarah opens at 09:00 every morning. Top stats row (Active Cases · Today's Apps · Compliance Queue · Alerts). Lead Inbox section showing new leads (with F1 capture status). Today's Appointments. Compliance Queue. Alerts. Co-pilot widget bottom-right with proactive surfacing.

**Admin Surface — Niamh's kanban.** Four lanes — AI Verified Pending Review · Not Matching · Portal Processing · Sent to Client. Cards transition automatically as M1 → M2 → M4 → M5 → M6 do their work. "Needs Your Attention" panel lists the M2 flags and overdue chases. Co-pilot widget routes cross-team pings.

**Operations Surface — Mark Reynolds' principal dashboard.** Pipeline this week (funnel from Captured to Issued). Compliance summary (vulnerability cases, audit-flagged, M2 NIGO prevention count). Team Capacity (per-adviser load). Pipeline Value. "Ask Ivy" Atlas-style query panel for natural-language queries.

### Ivy Live — real-time during calls

Whenever a voice call is in progress (F6 outbound, inbound, or a Zoom/Teams FactFind), **Ivy Live** runs in a sidebar overlay on the adviser's screen. It subscribes to A2's transcript stream and runs three sub-agents: probe-suggester (what to ask next), compliance-gap detector (folded-in from C2), and coaching prompts. Outputs render at <2-second latency. Single-click acknowledgement; logged for compliance.

Ivy Live is **not** the Co-pilot. It only fires during calls, only shows on the adviser's screen, and is dismissed when the call ends. The Co-pilot widget continues to run alongside it.

### Ivy Co-pilot — chat-based AI across three access modes

The Co-pilot is **one AI agent invoked through three different interface modes**, depending on what the user is doing. Persistent across modes — the same conversation can move from widget to side panel to full page without losing context. This matches the modern AI-product paradigm (Harvey, Legora, Notion AI, Lex) where chat is a first-class workspace, not a button on the side of someone else's UI.

| Access mode | When you'd use it | What it looks like | Tier |
|---|---|---|---|
| **Centralised — full page** | Deep multi-turn work · reviewing past conversations · "let me think through this case with Ivy" | Own tab in left nav. Conversation list on the left, active chat on the right. Search, pin, archive. | **v1.0** |
| **Side panel — contextual** | Working on a specific case, kanban card, or report. Need AI help without losing your place | Right-side drawer on any page. Auto-loads the page context (the customer, the kanban card, the dashboard view) | **v1.1** |
| **Widget — bottom-right** | Quick fire question · one-shot draft · fast action | Small chat bubble, expandable on click. Same backend, smaller real estate. | **v1.0** |

**Cross-mode continuity.** Every conversation saves to the user's chat history. Start a thread in the widget Tuesday morning, expand to the side panel Tuesday afternoon, pull it up on the full page Wednesday for deeper work. One thread, same context, same memory.

**Three behaviours, all three modes.** Each mode supports: **Invoke** (fire a feature — *"draft Mark's suitability"*), **Answer** (query data — *"which adviser converts best?"*), and **Proactively surface** (next-best-action — *"Mrs Patel needs follow-up"*).

**Per-surface contextual behaviour.** On Sarah's Adviser Surface it focuses on case-level actions; on Niamh's Admin Surface it routes pings between teammates and surfaces NIGO flags; on Mark's Operations Surface it does Atlas-style firm-wide queries. **Same backend AI, different UI defaults per role.**

**Cross-surface pings route through the Co-pilot** — when Niamh pings Sarah about a Not Matching case, the message arrives in Sarah's Co-pilot thread (whichever mode she's in). No emails, no Slack, no separate comms tool.

### The Central Hub — Co-pilot Full Page

What Sarah opens when she clicks "Ivy" in her left nav. Her AI workspace — every past conversation, pinned cases, search across all chats, slash commands, @-mentions to summon any customer record.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Ivy · Co-pilot                                          [≡] [🔔] [👤]     │
├──────────────┬─────────────────────────────────────────────────────────────┤
│  + New chat  │  📌 Mark Roberts — case strategy + UW pre-empt              │
│              │  Started Tue 12 May · 17 messages · last: 2 min ago         │
│  🔍 Search   │  ─────────────────────────────────────────────────────      │
│              │                                                              │
│  📌 PINNED   │  Sarah:  read through Mark's FactFind and tell me what      │
│  • Mark R    │          gaps a Vitality CI underwriter would flag         │
│  • Q2 review │                                                              │
│  • CPC 2025  │  Ivy:    Three things to pre-empt before submission:        │
│              │          1. Family medical hx — brother bowel CA at 45.    │
│  TODAY       │             Vitality will likely request a GP report       │
│  • Donovan   │             before final UW decision.                      │
│  • Sarah Lee │          2. Self-employed income — they'll want SA302      │
│  • CPC audit │             plus 6 months of business bank statements.     │
│              │          3. CI cover specifically — given the family hx,   │
│  YESTERDAY   │             Vitality's "additional CI questionnaire"       │
│  • Anna K.   │             is near-certain. Worth flagging to Mark now.   │
│  • Compliance│                                                              │
│  • Tom H.    │  Sarah:  draft the GP authority cover note for Mark to     │
│              │          sign — keep it short                              │
│  THIS WEEK   │                                                              │
│  • Apr 28    │  Ivy:    Drafted.                          [Open] [Copy]   │
│  • Apr 25    │          ┌──────────────────────────────────────────────┐ │
│  • Apr 22    │          │ Dear Dr [GP],                                │ │
│              │          │                                              │ │
│  ARCHIVED    │          │ I authorise the release of my medical records│ │
│  • 47 chats  │          │ to Vitality Life Limited for the purposes of │ │
│              │          │ underwriting my life insurance application…  │ │
│              │          └──────────────────────────────────────────────┘ │
│              │                                                              │
│              │  ┌────────────────────────────────────────────────────────┐│
│              │  │ Ask Ivy anything — type, /command, or @customer       ││
│              │  └────────────────────────────────────────────────────────┘│
│              │  [@] mention   [📎] attach   [/] commands   [Send →]      │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

The left rail mirrors the Notion AI / Harvey / Claude pattern: pinned chats at top, recent below, search at the top, archive below. The right pane is the active conversation. Slash commands invoke features directly (`/draft suitability`, `/find similar cases`). `@` mentions any customer, adviser, or document to bring it into the conversation as context.

---

## The Operating Context

**Firm shape (unchanged from default-state).** 8 advisers led by Mark Reynolds, 1 paraplanner (Emma), 2 administrators (Niamh + Aoife), 1 part-time compliance officer (Daniel). Same case volume (~600/year). What changes is the *time per case* and *who does what*.

**Regulatory baseline (unchanged).** FCA COBS 9.2.2R, Consumer Duty (UK), CPC 2025 (Ireland). *Ivy doesn't change what the firm has to do — it changes how efficiently and defensibly it can do it.*

**Tech stack with Ivy v1.0.**

| Function | Default state | With Ivy v1.0 |
|---|---|---|
| **CRM** | Plum (~£90/user/mo) | Plum, with Ivy as integrated daily UI on top |
| **Quote engine** | iPipeline + Iress (manual re-key) | Same engines. A3-Stub generates structured quote inputs from FactFind; adviser pastes them into existing engine. Full deep-link integration in v1.1. |
| **FactFind** | Manual, in Plum template | Live capture by A2 during the call |
| **Voice (inbound + outbound)** | Adviser dials, no recording outside meetings | F6 handles inbound + outbound. C1 captures all calls. |
| **Real-time call coaching** | None — adviser memory + post-call review | C8 (Ivy Live) prompts in real time during calls — probes, vulnerability flags, compliance gaps |
| **Suitability Letter** | Word template, drafted from scratch | A4-generated, adviser edits |
| **Insurer applications** | 6+ separate portals, manual login + entry | Admin team uses M4 per-insurer guided checklists. Cross-doc verification (M2) catches errors pre-submission. Full RPA never built. |
| **Document ingestion** | Manual handling of signed application bundles | M1 ingests DocuSign / alt e-sign / manual upload bundles. OCR pipeline structures every doc. |
| **Underwriting tracking** | Sarah maintains a spreadsheet, manually checks email | M5 parses inbound insurer emails, surfaces decisions in M3 kanban |
| **Approved-policy client comms** | Admin manually drafts and sends from Gmail | M6 auto-drafts client email with signed policy attached |
| **Call recording** | CallCabinet, manual upload | C1 captures, indexes, links automatically |
| **Compliance file** | Manual assembly across Plum + Google | C4 auto-builds; one-click retrieval |
| **Document templates** | Word + OneDrive, version-drift risk | A7 version-aware central store |
| **Vulnerability detection** | Adviser judgement, often missed | C6 flags in real time across stages |

Ivy adds ~£18k/year subscription on top of existing tooling. Net annual value ~£115k against £18k = **~6.4× ROI**.

---

## Stage 1 — Lead Capture

**One-line purpose:** receive an inbound prospect enquiry from any channel and route it into the firm's pipeline so the right adviser can respond — automatically, 24/7.

### The Story

1. A prospect named Mark Roberts, age 38, fills in a life insurance enquiry on Compare the Market on a Tuesday evening at 21:14.
2. Compare the Market sells Mark's enquiry to three brokers as a shared lead. Northchart pays £18 for it.
3. Within 90 seconds of the lead landing in Northchart's inbox, **F1 (Omnichannel Lead Capture)** picks it up. F1 enriches Mark's record with Companies House + electoral roll signals (he's a director of a small ltd company, owner-occupier homeowner in Manchester) — feeding the dynamic AI lead score of 8.4/10. F1 sends Mark a WhatsApp message: *"Hi Mark, this is Ivy from Northchart Advisory — you enquired about life cover a moment ago. Quick chat to see if we can help, when works for you?"*
4. Mark replies 4 minutes later: *"now is fine actually."* F1 hands the conversation to F2 (the AI Qualifier — Stage 2).
5. By 21:25 — 11 minutes after Mark's original enquiry — Mark has been qualified, his FactFind has been booked for Friday at 14:00, and his pre-FactFind documents are queued for sending.
6. By the time the other two brokers who bought the same shared lead attempt contact at 09:00 the next morning, Mark is already booked with Northchart.
   - *In Ireland, F1 handles Bonkers.ie, Switcher.ie, direct ad forms, and inbound WhatsApp identically. CPC 2025 first-contact obligations are met by F1's structured opening message.*
7. Sarah comes online Wednesday 08:30 and sees Mark already in her FactFind diary for Friday. She doesn't have to chase. She doesn't have to send first-touch. She doesn't have to qualify.
8. Total Sarah-time on this stage: **2 minutes** (reviewing F1's conversation log to confirm nothing flagged).

### Inputs / Activities / Outputs / Tools

**Inputs:** prospect enquiry data from PCW, ad, web form, or inbound call; channel-source identifier; firm's qualifying criteria; external data sources for enrichment.

**Activities:** F1 receives lead; enriches with Companies House + electoral roll + LinkedIn signals; computes dynamic AI lead score; sends first-touch across right channel; conducts initial conversation; hands off to F2.

**Outputs:** new prospect record fully populated; first-touch conversation captured; lead score; lead routed to next stage.

**Tools Used:** Ivy F1, F2, F4, F6 · Plum CRM · WhatsApp Business API · PCW webhook listeners · enrichment APIs (Companies House, LinkedIn, electoral roll providers).

### Under the Hood — Ivy X-Ray

- **Ingestion layer.** Webhook listeners on PCW APIs, ad platform forms, web chat, and inbound voice (via F6). Lead arrives → F1 ingestion service normalises into Ivy's canonical lead schema.
- **Enrichment + scoring agent.** Pulls external data (Companies House, electoral roll, public LinkedIn signals where lawful). Scores lead on quality (probability of conversion) using firm-specific weighting model.
- **Channel router.** Determines best first-touch channel based on prospect data + time of day. Falls through SMS → WhatsApp → email.
- **F1 conversational agent.** Claude Sonnet running structured opening flow, firm-specific branding. Strict guardrails — no quoting, no advice.
- **CRM sync agent.** Bidirectional Plum sync. Webhook back to Ivy when adviser opens record.
- **Hand-off contract.** When prospect engages, F1 passes structured payload to F2. No data lost.

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 12 min (admin tagging + out-of-hours wait) | 2 min (Sarah reviews F1 log) | **−10 min** |
| £5 cost per case | £1 | **−£4** |

**Plus:** F1 captures the ~30% of leads arriving out-of-hours and recovers their conversion rate. For Northchart's 600 cases/year, that's **+138 net new closed cases × £202 net margin = +£28k/year additional revenue**.

---

## Stage 2 — Triage and Qualify

**One-line purpose:** determine in 5 minutes (down from 22) whether this prospect is genuinely advisable — without an adviser-led human triage call.

### The Story

1. F1 hands Mark to **F2 (AI Conversational Qualifier)** at 21:14 Tuesday.
2. F2 runs Northchart's qualifying flow over WhatsApp — 6 minutes, 11 messages. Captures employment (self-employed graphic designer), income (£62k), dependants (Sophie + 2 kids), existing cover (lapsed death-in-service), mortgage (£245k / 22yr remortgage), trigger (brother's cancer diagnosis), risk attitude, budget (£40-60/mo), timeline.
3. F2 runs knockout questions: prior declines (none), residency (UK), age (38), income threshold, product fit. All pass.
4. F2 also runs **C6 (Vulnerable Customer Detector)** silently — analyses Mark's language for vulnerability indicators (financial pressure, recent bereavement, mental health, capacity issues). C6 returns NONE.
5. F2 books FactFind Friday 14:00 with Sarah using F4's calendar routing. F4 reads availability from Sarah's existing Outlook calendar — Ivy doesn't replace the calendar, just routes against it.
6. **F6 alternative path:** if Mark had called the firm's main line at 21:14 instead of completing the Compare form, F6 (AI Voice Caller) would have answered the call, conducted the same qualifying conversation by voice, and booked the same FactFind. Voice and chat lead to identical outcomes.
7. Whole exchange completes by 21:20 Tuesday.
8. Wednesday morning, Mark is in Sarah's queue, qualified, with conversation log + captured data + booking + vulnerability assessment. She spends 5 minutes reviewing.
   - *In Ireland, F2 includes explicit CPC 2025 vulnerability questioning at first-contact stage.*
9. Total adviser time on this stage: **5 minutes** (down from 22).

### Inputs / Activities / Outputs / Tools

**Inputs:** F1 conversation handoff; firm's qualifying script; knockout question set; C6 vulnerability prompts; adviser calendar availability (read-only via OAuth).

**Activities:** F2 conducts conversation; runs knockouts; C6 runs vulnerability detection; F4 books FactFind on existing calendar.

**Outputs:** qualified prospect record; conversation log; captured data pre-populated for Stages 3-4; FactFind appointment booked in adviser's existing calendar; vulnerability assessment.

**Tools Used:** Ivy F2 · Ivy F4 · Ivy F6 (for voice path) · Ivy C6 · Plum CRM · WhatsApp Business API · Google Calendar / Outlook (OAuth integration only — no Ivy calendar UI) · firm's qualifying script (configured in Ivy admin).

### Under the Hood — Ivy X-Ray

- **F2 conversational engine.** Claude Sonnet running a structured flow tree configured per firm. Combines free-flow natural language with structured data extraction at each turn.
- **Knockout rules engine.** Deterministic checks (not AI) on age, residency, prior declines, income thresholds. Hard rules — fail = decline.
- **C6 parallel agent.** Listens to the same conversation, runs separate analysis pass — vulnerability indicator pattern matching, language signal detection.
- **F4 calendar router.** Pulls availability from connected calendars (Google, M365, Plum) via OAuth — read-only. Matches case profile to adviser specialism, books slot. Ivy never owns the calendar.
- **F6 voice path.** When prospect calls instead of submitting a form, F6 (built on Retell or Vapi) answers, conducts equivalent F2 conversation by voice, hands off identically.
- **Data hand-off contract.** F2 outputs a structured payload at completion — every captured field maps to FactFind fields for Stage 4.

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 22 min (live triage call + notes) | 5 min review | **−17 min** |
| £10 cost per case | £2 | **−£8** |

**Plus:** knockout cases that previously reached FactFind (~15% × 90 min wasted) now decline at Stage 2 — recovering ~14 hours/year of adviser capacity for Northchart.

---

## Stage 3 — Pre-FactFind Disclosure

**One-line purpose:** send regulatory disclosure documents — version-controlled by A7, instrumented for the audit trail.

### The Story

1. The instant F2 books Mark's FactFind, the firm's existing pre-FactFind disclosure flow triggers (DocuSign template + reminder sequence Northchart already uses). **A7 (Document Template Manager)** ensures the right template versions are pulled for the IDD, Terms of Business, and Privacy Notice.
2. Within 30 seconds, Mark receives an email containing IDD v3.4, Terms of Business v3.4 (with embedded e-signature), Privacy Notice v2.1, document checklist, and Zoom link.
3. Documents pulled from **A7** — version-aware central store. Sent versions tagged in audit trail. If Northchart updates the IDD next month, every client who received v3.4 is identifiable; new clients get v3.5.
4. Mark e-signs Terms of Business in DocuSign Wednesday morning. Plum status updates to "Pre-FactFind disclosure complete."
5. Mark replies Thursday evening with a question about SA302 acceptance. Sarah's only intervention: 3-minute reply.
   - *In Ireland, A7 holds Irish-specific templates including the CPC 2025 Information Statement.*
6. **What v1.1 will add:** A1 (Pre-FactFind Auto-Send) will fully automate this stage — eliminating the manual disclosure-send step entirely, reducing this stage to 1 minute. In v1.0, the firm continues using its existing process; A7 closes the version-drift compliance risk.
7. Total adviser time on this stage: **5 minutes** (3 min admin trigger + 2 min reply to Mark's query).

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 10 min admin + 2 min adviser intervention | 5 min (firm's process + 2 min adviser reply) | **−5 min** |
| £4 cost per case | £2 | **−£2** |

**Plus:** A7 closes the document version-drift compliance risk (severity 4 in workflow doc). Auditable proof of which template version was sent. v1.1's A1 will reduce stage time to 1 minute.

---

## Stage 4 — FactFind Call

**One-line purpose:** capture every fact about Mark's circumstances during the live call — with no post-call typing-up, real-time compliance prompts, and continuous vulnerability monitoring.

### The Story

1. Friday 14:00. Mark joins the Zoom call. **C1 (Call Recording)** starts automatically.
2. Sarah opens her FactFind in Ivy. The first three sections are already partly populated from F2's qualifying conversation — name, age, address, employment, income, dependants, mortgage. Sarah confirms rather than re-asks.
3. As the conversation flows, **A2 (Live FactFind)** is listening. AssemblyAI streaming transcription feeds Claude Sonnet, which extracts structured data and populates the FactFind sections live. Sarah sees fields filling in as Mark speaks.
4. **C8 (Ivy Live)** is the real-time copilot in Sarah's sidebar. When Mark mentions his brother's cancer diagnosis at 25 minutes, A2 captures it under family medical history, and **C8** pushes a real-time prompt: *"Family history of bowel cancer — probe for client's own screening history. FCA suitability + Vitality CI."* Sarah probes; A2 logs Mark's answer. C8 also handles compliance gap detection — if Sarah misses a section that the firm's QA criteria requires, C8 nudges her before the call ends.
5. **C6 (Vulnerable Customer Detector)** is listening. No vulnerability indicators throughout the call.
6. After 64 minutes the conversation ends. Sarah does NOT spend 28 minutes typing up — A2 has the FactFind 95% populated. She spends **6 minutes** reviewing what A2 captured, fixing one or two phrasing issues, confirming the family history detail, and saving.
7. Audio recording is auto-indexed and stored in Mark's case file by C1. Completed FactFind PDF saved in Plum.
   - *In Ireland, A2 uses the same transcription engine but runs the BIS-compatible FactFind schema. C6 includes the explicit CPC 2025 vulnerability prompt set.*
8. Total adviser time on this stage: **70 minutes** (64 call + 6 review). Down from 100. The 28-min typing-up burn is gone.

### Under the Hood — Ivy X-Ray

- **C1 recording integration.** Native adapters for Zoom Cloud Recording, Microsoft Graph (Teams), Google Meet API. Recall.ai fallback for edge platforms. Audio uploaded to Ivy encrypted storage on call-end webhook.
- **A2 streaming pipeline.** AssemblyAI streaming → Claude Sonnet structured extraction (every ~10 sec with debouncing) → Ivy FactFind schema validator → live UI update.
- **A2 schema.** 47-field insurance-specific FactFind schema, jurisdiction-tagged. Field-level confidence scoring — low-confidence captures flagged for adviser confirmation.
- **C8 (Ivy Live) real-time copilot.** Subscribes to A2's transcript stream + extracted-fields stream. Runs three parallel sub-agents: (1) probe-suggester — surfaces relevant questions based on what Mark has and hasn't said; (2) compliance-gap detector — flags missed required sections in real time (this is what C2 used to do separately — folded into C8); (3) coaching prompts — best-practice nudges from firm's QA playbook. Outputs render in Sarah's sidebar at <2-second latency.
- **C6 vulnerability monitor.** Separate parallel pass — pattern matching for indicator categories (financial pressure, recent bereavement, mental health, capacity, language barriers). Flags + reasoning attached to case.
- **Plum sync.** Final FactFind PDF + structured data + audio link + scores written to Plum case record on save.

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 100 min (64 call + 28 typing-up + 8 file mgmt) | 70 min (64 call + 6 review) | **−30 min** |
| £47 cost per case | £33 | **−£14** |

**Plus:** C8 catches FactFind quality drift in real time (during the call, not after). C6 documents vulnerability assessment for Consumer Duty / CPC 2025 audit. Together they replace the standalone C2 from the original v1.0 plan.

---

## Stage 5 — Research and Quote

**One-line purpose:** translate the FactFind into a 3-product shortlist in 35 minutes (down from 75) — with **A3-Stub** generating structured quote inputs from the FactFind, eliminating the re-key burn.

### The Story

1. With the FactFind saved, Sarah clicks **"Generate Quote Inputs"** in Mark's case.
2. **A3-Stub** generates a structured quote-input package — every FactFind field that quote engines need, formatted for paste-and-run: client identity, age, smoker status, occupation class, sum assured, term, mortgage details, family medical history, health disclosures, budget cap. The 7-12 minute manual extraction-and-re-key burn is gone.
3. Sarah opens iPipeline SolutionBuilder in a separate browser tab. She pastes Mark's quote inputs from the A3-Stub package — most fields auto-fill from the structured paste; she confirms a few. SolutionBuilder runs quotes across the UK panel in 60 seconds.
4. Quotes return from 12 UK insurers. Sarah uses SolutionBuilder's comparison view to select shortlist candidates. She also pulls CIExpert ratings (cancer cover quality) and ProtectionGuru claims-paid statistics for the family-history relevance. SolutionBuilder Advanced UW returns provisional loadings (Royal London +25%, Aviva +50%) — Vitality is clean.
5. Sarah pastes the chosen Vitality quote details (provider, sum assured, premium £42.80/mo, term 22yr, cover £245k decreasing, key features) back into Ivy's "Quote Results" section on Mark's customer card. Ivy parses it into structured fields. The two alternatives (Royal London, Aviva) are also captured for the suitability letter rationale.
6. **What v1.1 will add:** A3-Lite — direct API integration into BIS first, then SolutionBuilder, then Iress. Quotes will return inside Ivy without browser-tab switching, cutting another 15 minutes from this stage.
   - *In Ireland, A3-Stub is jurisdiction-aware; outputs map to BIS schema. v1.1 will add direct BIS API integration.*
7. Total adviser time on this stage: **35 minutes** (5 generate inputs + 12 paste-and-run in SolutionBuilder + 12 CIExpert + ProtectionGuru research + 6 paste-back-into-Ivy). Down from 75.

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 75 min (incl. 7-12 min re-keying + multi-portal switching) | 35 min | **−40 min** |
| £35 cost per case | £16 | **−£19** |

**Plus:** A3-Stub still cuts the re-key burn entirely (Sarah pastes structured input, doesn't re-type). v1.1's A3-Lite will reduce this stage further to ~20 min.

---

## Stage 6 — Suitability Letter

**One-line purpose:** produce the Suitability Letter in 25 minutes (down from 55) — with A4 drafting from FactFind + shortlist data, Sarah editing rather than writing from scratch.

### The Story

1. Sunday afternoon. Sarah opens Mark's case and clicks **"Draft Suitability Letter"**.
2. **A4 (Suitability Letter Draft)** generates the full letter in ~30 seconds, populated from FactFind, quote shortlist, and rationale notes from Stage 5. Every claim has a traceability tag back to its FactFind source.
3. The draft is in Northchart's approved Suitability template (pulled from A7), with structural sections: client identity, objectives, current cover, products considered, recommended product (Vitality at £42/mo), rationale for recommendation, rationale for rejecting alternatives (Royal London priced higher; Aviva 50% loading), risks and disadvantages (Vitality reviews premiums annually; Active Rewards dependency), affordability check, cooling-off, complaints process.
4. A4 includes its own pre-compliance check inline — the same regulatory completeness logic that C8 runs in real-time during calls. Letters scoring 88+ typically pass compliance review without changes. Mark's letter scores 92.
5. Sarah reads through. She makes 4 edits — strengthens the Aviva rejection rationale (A4 had it light), adjusts the family-history sentence to match Mark's exact phrasing, fixes a typo, adds a bespoke sentence tying mortgage timeline to cover term.
6. Sarah hits **"Send to Compliance"**. The draft goes to Daniel.
7. Daniel sees the letter alongside its **A4 quality score (92/100)** and traceability annotations. He reviews in 6 minutes (vs 15-20 min default-state), approves, returns. **Total time from Sarah click to Daniel approval: under 4 hours**, vs 2-5 days default-state. Sarah sends the letter to Mark via DocuSign.
   - *In Ireland, A4 generates the Statement of Suitability format with CPC 2025 Statement of Demands and Needs included automatically.*
8. Total adviser time on this stage: **25 minutes** (4 review + 4 edits + 12 final pass + send + 5 wait/admin).

### Under the Hood — Ivy X-Ray

- **A4 drafting agent.** Claude Sonnet with retrieval-augmented grounding on FactFind, quote shortlist, KFIs, and firm's Suitability template. Outputs structured letter with field-level provenance tags.
- **Traceability layer.** Every paragraph tagged with source references — `[FF§2.1]` ties to FactFind section 2.1, `[Q§N]` ties to Quote N. Auditable provenance for every claim.
- **A7 template injection.** Letter generated against firm's current approved template (jurisdiction + version aware). In-flight letters keep the version they started on.
- **Inline compliance scoring.** A4 self-checks against firm's QA criteria + FCA requirements at draft time — generates the 92/100 score plus flagged sections. (This logic is the post-call equivalent of what C8 does live during calls; both use the same compliance ruleset.)
- **Compliance routing.** Send-to-compliance triggers Daniel's queue. Score visible to Daniel — high-scoring letters typically clear in <10 min review.

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 55 min adviser + 2-5 day compliance wait | 25 min adviser + 4 hr compliance wait | **−30 min adviser** |
| £28 adviser + £8 compliance per case | £11 + £4 | **−£21** |

**Plus:** Compliance review queue throughput rises ~3x. Daniel reviews 30 letters/week without multi-day waits — removes the structural bottleneck.

---

## Stage 7 — Application Submission

**One-line purpose:** transition the case from adviser to admin team — Mark signs the application bundle, **M1** ingests the documents, **M2** cross-verifies everything, **M3** routes to the admin kanban for portal submission.

### The Story

1. After Mark signs the Suitability Letter Thursday morning, Sarah triggers the application bundle send via DocuSign — application form (Vitality), Demands & Needs, IPID, Direct Debit mandate, beneficiary nomination. Mark e-signs the bundle Thursday afternoon.
2. **M1 (Document Ingestion)** detects the signed DocuSign envelope, pulls all documents, runs Mistral OCR across them — extracting structured data from every page.
3. **M2 (Cross-Document Verification)** runs immediately. It cross-references key data points across the application, FactFind, and suitability letter: client name, DOB, address, mortgage details, premium, sum assured, term, beneficiary, bank details. All match. The case moves automatically to the **AI Verified Pending Review** lane in the admin kanban.
4. Niamh (one of Northchart's two administrators) opens her **M3 Admin Kanban** Thursday afternoon. Mark's case sits at the top of "AI Verified Pending Review" with M2's verification report — all green. Niamh reviews in 90 seconds, approves, and the card moves to "Portal Processing."
5. *(For comparison — Tom Harris's case in the "Not Matching" lane shows what M2 catches: address on application says "32 Broughton Lane" but FactFind says "32 Broughton Road." Niamh pings Sarah via the Co-pilot widget — Sarah confirms the FactFind is correct, gets Tom to re-sign a corrected application, M2 re-runs clean.)*
6. **What v1.0 doesn't do:** full RPA portal auto-fill (the original A5 plan) is not built. Instead, M4 guides the admin through the manual portal steps in Stage 8 — which is more resilient to portal UI changes and still cuts the time substantially.
   - *In Ireland, M1 + M2 work identically. The only Irish-specific behaviour is M2's CPC 2025 Statement of Suitability cross-reference (in addition to the standard fields).*
7. Total fee-earning time on this stage: **25 minutes** — but split between Sarah (5 min triggering bundle send) and Niamh (20 min review + admin handoff). Sarah's time on Stage 7 drops from 50 minutes (default state) to 5 minutes.

### Under the Hood — Ivy X-Ray

- **M1 ingestion service.** Webhook listeners on DocuSign / Adobe Sign / HelloSign envelope-completed events. Falls back to polling for manual upload + edge providers. Pulls full document bundle, stores encrypted, kicks off OCR job.
- **OCR pipeline.** Mistral OCR API processes every page. Output: structured field-level extraction tagged by document type (application, FactFind, suitability, IPID, declaration).
- **M2 cross-verification engine.** Receives extracted fields from M1. Runs deterministic matching across canonical fields (name, DOB, address, premium, sum assured, term, beneficiary, bank). Confidence-scored — high-confidence matches auto-approve; mismatches surface to admin with diff visible.
- **M3 kanban state machine.** Card states: AI Verified Pending Review → Admin Approved (Portal Processing) → Sent to Client. "Not Matching" + "Document Issue" are exception lanes. Generic 4-stage flow in v1.0; per-broker SOP customisation in v1.1.
- **Co-pilot cross-team comms.** When Niamh pings Sarah about a Not Matching case, the message routes through Ivy's Co-pilot widget — appears in Sarah's Adviser Surface as a notification. No emails, no Slack, no separate comms tool.
- **Why no full RPA.** A5 (full insurer-portal auto-fill) was deliberately replaced by M4 guided checklists in Stage 8. RPA is brittle (breaks when portals change UI), expensive to maintain (per-insurer code), and provides less value than M2's cross-verification logic does at this stage.

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 50 min adviser (or 30 adviser + 25 admin = 55 min total firm) | 5 min adviser + 20 min admin = 25 min total firm | **−25 to −30 min** |
| £23 cost per case | £10 | **−£13** |

**Plus:** M2 catches data inconsistencies BEFORE submission to insurer — preventing the 10-15% NIGO rate. A NIGO submission costs the firm 1-3 days of customer rework + re-signature + resubmission — all eliminated.

---

## Stage 8 — Underwriting Tracking

**One-line purpose:** monitor the case across the underwriting period (5-25 days) — admin team submits via per-insurer portal guidance, M5 parses inbound responses, kanban tracks status without spreadsheets.

### The Story

1. Mark's card sits in Niamh's "Portal Processing" lane. **M4 (Per-Insurer Portal Guidance)** displays Vitality UK's submission checklist:
   - Login to Vitality intermediary portal
   - Search by adviser code → New Application → paste application reference
   - Upload signed application + signed declaration
   - Confirm Direct Debit details
   - Submit
   - Send confirmation email to brokers@vitality.co.uk
2. Niamh works through the checklist in 5 minutes — far faster than her old workflow of "remember Vitality's process from memory, hope you don't miss a step." Total time on Vitality submission: 5 minutes (vs 18 minutes default-state).
3. The application is submitted Thursday 14:42. Vitality returns instant "received" acknowledgement. Niamh marks the card complete; it sits in "Portal Processing" awaiting Vitality's response.
4. **M5 (Insurer Email Integration)** is now monitoring Niamh's inbox + the firm's brokers@vitality inbox. On Tuesday after submission (5 days), Vitality's medical evidence team emails requesting a GP report. M5 parses the email, recognises the GP-report-request pattern, classifies the case status as "Awaiting GP Report," and surfaces the action: Vitality wants a GP report on Mark — send GP consent form to Mark?
5. Niamh clicks. The system triggers the GP consent flow — sends Mark the consent form via DocuSign with WhatsApp prompt. Mark signs Wednesday morning. M5 forwards confirmation to Vitality automatically.
6. The 14-day GP wait still applies — that's insurer-side latency Ivy can't fix in v1.0. But the kanban keeps the case visible without manual chase. M5 also sends Mark an automatic status update on Day 7.
7. On Day 19, Vitality's underwriter emails the decision: standard rates accepted. M5 parses the email, classifies as "UW Decision: Standard," updates Mark's case, and surfaces to Niamh: *"Standard rates accepted. Notify Mark and proceed to on-risk?"*
8. **What v1.0 doesn't do:** the original v1.0 plan included A6 (Smart Underwriting Tracker) with a full dedicated dashboard. v1.0 ships M5 + M3 instead — same email parsing logic, same kanban surface for tracking. Deeper UnderwriteMe API partnership comes in v1.1.
   - *In Ireland, M5 monitors Irish insurer email patterns adapted to Irish phrasing. GP-report turnaround in Ireland is 18-25 days vs UK 14, but the orchestration is identical.*
9. Total firm time on this stage, spread across 3 weeks: **20 minutes** per case (down from 40). The 12% loaded-case rate still triggers loop-back to Stage 5 — M5 surfaces the loading immediately.

### Under the Hood — Ivy X-Ray

- **M4 portal-checklist engine.** Per-insurer YAML-defined checklists. Insurer panel covered in v1.0: 4 IE (Royal London, New Ireland, Aviva, Zurich) + 4 UK (Royal London, L&G, Vitality, Aviva). v1.1 expands to Scottish Widows, AIG, Aegon and on-demand additions.
- **Checklist maintenance.** When an insurer changes portal flow, the YAML checklist updates (no code change). 30-minute fix per insurer per change. This is why portal guidance is more resilient than RPA.
- **M5 email parser.** Listens on dedicated firm inbox + admin's inbox. Claude Haiku classifies each insurer email by status type (GP request, more info, decision-standard, decision-loaded, decision-decline). High-confidence classifications auto-action; low-confidence surface to admin.
- **Status state machine.** Each case has a deterministic state machine — Awaiting UW → Awaiting GP Report → UW Reviewing → Decision. M5 transitions states based on parsed signals.
- **Loading detection.** When M5 detects a loading or exclusion, it surfaces immediately with the loading amount. Sarah (the adviser) gets the alert in her Adviser Surface — she decides whether to accept or loop back to Stage 5 with alternative insurer.
- **v1.1 expansion.** UnderwriteMe deep API partnership will replace email parsing for insurers UnderwriteMe covers — providing direct status feed instead of email-based detection.

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 40 min adviser/admin time spread over 3 weeks | 20 min admin time | **−20 min** |
| £19 cost per case | £8 | **−£11** |

**Plus:** Client engagement decay reduced — M5's auto-status-updates keep clients warm during the 2-4 week underwriting wait. Cases-don't-complete-because-client-disengaged rate drops from ~10% of Stage 7 to ~3%.

---

## Stage 9 — On-Risk and Compliance File

**One-line purpose:** confirm the policy is on risk, deliver client onboarding via M6, assemble the audit-ready compliance file via C4 — automatically.

### The Story

1. Day 19. Vitality emails confirming Mark's policy is on risk from that date. **M5** parses the email and triggers Stage 9.
2. **M6 (Approved Policy Client Communication)** auto-drafts the client email to Mark — celebratory tone, personalised premium and cover details, first DD date, policy schedule attached. Niamh reviews the draft, makes one personalisation edit, sends.
3. The card moves automatically to "Sent to Client" lane. M3 marks the policy issued.
4. **C4 (Compliance File)** assembles Mark's full compliance file in 12 seconds. The 11 documents — IDD, Privacy Notice, signed Terms of Business, FactFind PDF + audio recording, quote shortlist + KFIs, Suitability Letter + sign-offs, application bundle (signed), underwriting correspondence (parsed by M5), policy schedule, M6 client communications — all aggregated into a single retrieval index in Ivy with version tags and timestamps from A7.
5. C4 generates the 1-page case summary cover note automatically — client identity, products, premium, cover amount, terms, dates, key adviser decisions, compliance sign-offs, A4/C8/C6 scores. This becomes the front page of the file.
6. The file goes to Daniel for the post-sale audit review with C4's quality score (96/100). Daniel sees the score, the cover note, and the document index. His review is 3 minutes — and any missing-document gaps are flagged by C4 before Daniel sees it, not after.
7. Sarah re-emerges in the workflow at this point — gets a notification that Mark's case is closed. She sees the final case summary, can re-engage Mark for protection-adjacent products at the right cadence (CI top-up review at 12 months, etc.). Indemnified commission of ~£648 hits Northchart's bank account 2-4 weeks later.
   - *In Ireland, C4 applies 7-year retention vs UK's 6. CPC 2025-specific compliance file structure (vulnerability documentation as mandatory section) is applied automatically.*
8. Total fee-earning time on this stage: **10 minutes** (4 Niamh review of M6 draft + 3 send + 3 Daniel review). Down from 38 minutes. Sarah's time on Stage 9 is effectively zero.

### Under the Hood — Ivy X-Ray

- **C4 file orchestrator.** Aggregates documents from Plum, Google Workspace, CallCabinet, A7, and insurer correspondence into a single Ivy-indexed retrieval system. Each document tagged with stage, sub-stage, version, timestamp.
- **Case summary generator.** Claude Sonnet drafting the cover note from structured case data — applies firm's standard template, includes all scores, key decisions, sign-offs.
- **C4 quality scorer.** Validates that all 11 mandatory documents are present, version-tagged, and properly linked. Flags missing items before Daniel sees the file.
- **M6 client communication engine.** Auto-drafts onboarding email from policy data + firm tone template. Personalisation hooks for trigger event (e.g., references Mark's family situation appropriately). Reviewer (admin) edits before send.
- **Retention indexer.** Postgres + S3-backed long-term archive. Each document indexed by client, date, insurer, status, regulatory event for audit search.

### Time and Cost Saved

| Default state | With Ivy v1.0 | Saved per case |
|---|---|---|
| 38 min fee-earning + 5 min compliance | 10 min fee-earning + 3 min compliance | **−28 min** |
| £18 + £4 per case | £4 + £2 | **−£16** |

**Plus:** Document fragmentation across systems (severity 5 in workflow doc) closed. Audit-retrieval cost (30-90 min per old case in default state) drops to <5 minutes via C4's indexed archive. Long-retention institutional memory decay risk closed.

---

## The Bottom Line — Consolidated Savings

### Per-Case Time and Cost Savings

| Stage | Default (min) | Ivy v1.0 (min) | Saved (min) | Cost saved/case |
|---|:-:|:-:|:-:|:-:|
| **1** Lead Capture | 12 | 2 | −10 | −£4 |
| **2** Triage and Qualify | 22 | 5 | −17 | −£8 |
| **3** Pre-FactFind | 10 | 5 | −5 | −£2 |
| **4** FactFind Call | 100 | 70 | −30 | −£14 |
| **5** Research and Quote | 75 | 35 | −40 | −£19 |
| **6** Suitability Letter | 55 | 25 | −30 | −£21 |
| **7** Application Submission | 50 | 25 | −25 | −£13 |
| **8** UW Tracking | 40 | 20 | −20 | −£11 |
| **9** Compliance File | 38 | 10 | −28 | −£16 |
| **TOTAL** | **402 min (6.7 hrs)** | **197 min (3.3 hrs)** | **−205 min (−51%)** | **−£108** |

### Annual Value to the Northchart-Profile Firm

8 advisers + 2 admin · ~600 closed cases/year · £18k Growth-tier subscription.

| Value source | Annual £ |
|---|---|
| Time savings — adviser + admin (205 min × 600 cases at blended rate) | £62k |
| Compliance officer time saved (30 min × 600 × £40/hr) | £12k |
| F1 conversion uplift — out-of-hours leads recovered (~138 extra cases × £202 net margin) | £28k |
| NIGO reduction — M2 catches errors pre-submission (~£8k saved customer rework) | £8k |
| Compliance risk reduction — avoided FOS complaints + audit prep | £15-20k |
| **Total annual value** | **~£125k** |
| Annual subscription cost | £18k |
| **Net annual value** | **~£107k** |
| **ROI** | **~6.4×** |

### The Headline

The default-state workflow doc closed by saying that, under FCA Pure Protection Market Study scrutiny, Consumer Duty, CPC 2025, and rising paid-lead costs, **the protection broker workflow was on a 24-month trajectory from "marginal-but-viable" to "structurally loss-making."** Ivy v1.0 reverses that trajectory:

- The 6.7-hour case becomes a 3.3-hour case
- The £202 margin per case becomes ~£318 margin per case
- The compliance-officer queue stops being structural; the audit trail becomes built-in by default
- Out-of-hours lead death stops costing the firm 30% of its addressable conversion
- The admin pipeline (Stages 7-9) becomes a productised AI-assisted kanban — not a spreadsheet-and-memory operation
- The same 8-adviser firm running the same case volume captures **£100k+ of additional annual value** at a £18k subscription cost

**This is what v1.0 ships. The v1.1 release sequences A1 (full disclosure auto-trigger), A3-Lite (quote engine deep-link integrations: BIS → SolutionBuilder → Iress), configurable per-broker workflow engine, UK insurer panel expansion (Scottish Widows, AIG, Aegon), alternative e-sign trigger paths, and UnderwriteMe partnership integration on top — extending the value model into deeper integrations and per-firm customisation.**

The next document in this sequence is the **Ivy Roadmap** — sequencing the 18 v1.0 features into themed horizons with the v1.1 / v1.2 / v2.0 / v3.0 evolution.

---

*End of Ivy v1.0 future-state workflow walkthrough. Full ASCII screen mockups + Mermaid process flow diagrams from the original source are intentionally not transcribed in full to keep this file readable; refer to the original source document for the screen-by-screen detail used in design.*
