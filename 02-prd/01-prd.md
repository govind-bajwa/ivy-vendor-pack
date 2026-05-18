# Ivy v1.0 — Product Requirements Document (PRD)

> **Version:** v0.2 (supersedes v0.1) · 2026-05-10
> **Scope:** the v1.0 launch release of the L3 productised platform.
> **Companion canonical docs (user-authored, pending save to `00-foundation/`):**
> - `ivy-v1-user-workflow.md` — the stage-by-stage walkthrough of how Ivy v1.0 runs an advised protection sale (the *how it works*)
> - `ivy-v1-roadmap.md` — what's in v1.0, v1.1, v1.2, v2.0, v3.0 (the *when it ships*)
> - `ivy-v1-feature-priority-matrix.md` — every candidate feature scored ROI/Sev/Moat/Ease/Progress with v1.0 cuts justified (the *why these features*)
>
> **This PRD's job:** be the tight canonical "what is the product" index. The workflow doc is the depth; this doc is the contract.
> **Downstream:** sitemap → screen inventory → per-screen briefs → mockups.

---

## 1. The product in one paragraph

Ivy v1.0 is the AI workflow OS for protection insurance broker firms in the UK and Republic of Ireland. **18 features** across **4 pillars** (FE Sales, Adviser Co-pilot, Call & Compliance, Admin Co-pilot) running on **3 user surfaces** (Adviser, Admin, Operations) connected by a **Co-pilot widget** and a single **Customer Card** data object. It compresses the 9-stage advised-protection-sale workflow from 6.7 hours to ~3.3 hours of fee-earning time per closed policy, lifts net margin per case from £202 (31%) to ~£318 (49%), and delivers ~6.4× ROI in year one on an £18k subscription for an 8-adviser firm.

---

## 2. Personas (compressed cards)

The full personas live in `../../ivy-brain/wiki/foundations/l3/icp-blueprint/` (auto-loaded via CLAUDE.md). The walkthrough doc names the protagonists used in mockups. These compressed cards are what every feature entry references.

### P1 · Sarah Bennett — *Adviser* (the daily user)
- Protection adviser at Northchart Advisory, Manchester. ~5–15 yrs in protection. QFA / Diploma-qualified.
- Daily context: 4–6 client-facing slots a day, FactFinds, suitability drafting, follows up own cases.
- Top jobs: convert leads, run a clean FactFind, draft a suitability letter that survives compliance, hand applications to admin cleanly.
- Surface: **Adviser Surface**. Lives in Today / Cases / Calls / Drafts.

### P2 · Niamh O'Reilly — *Administrator* (the back-office daily user)
- One of two admins at Northchart. Handles application bundles after sign-off; submits to insurer portals; tracks underwriting; sends client onboarding comms.
- Daily context: 8–15 cards on the kanban at any time. Receives M2 verification reports; pings advisers when M2 flags mismatches.
- Top jobs: clear the kanban, prevent NIGOs, keep insurer email triage fast, never lose a case to chase-decay.
- Surface: **Admin Surface**. Lives in Kanban / Email Feed / Portal Guides.

### P3 · Mark Reynolds — *Principal + Compliance Lead* (the buyer)
- Northchart's MD. Doesn't work cases himself in v1.0; runs the firm. Combined principal + senior compliance role.
- Daily context: pipeline glance morning + evening; deals with anything red/amber. Most interaction is conversational with the Co-pilot (Atlas-style queries).
- Top jobs: know firm health on demand, defend valuation through clean compliance evidence, retain key advisers, see capacity early enough to rebalance.
- Surface: **Operations Surface**. Lives in Pipeline / Capacity / Compliance / MI.

### P4 · Daniel — *Part-Time Compliance Officer*
- Reviews suitability letters + post-sale audit. ~30–50 letters/week in default state; throughput rises ~3× under v1.0 (compliance bottleneck no longer structural).
- Daily context: clears letter queue, deep-audits 10–15% of cases, signs off C4 compliance files at on-risk.
- Top jobs: triage the queue fast, spot weak letters before they're filed, evidence vulnerable customer handling.
- Surface: shares **Adviser Surface** + **Operations Surface** (with role-scoped views).

### P5 · Emma — *Paraplanner* (supporting role in v1.0)
- One paraplanner at Northchart. Draft suitability letters were her remit in default state; in v1.0 advisers (and A4) take more of that load. Emma supports complex cases.
- Surface: shares **Adviser Surface**.

### Sample client used in mockups: *Mark Roberts*
- Age 38, self-employed graphic designer, Manchester, £62k income, £245k mortgage, partner Sophie + 2 children, brother diagnosed with bowel cancer last month, recommended onto Vitality decreasing-term life with accelerated CI at £42/month.
- Use this exact case across every screen in the mockup so the data tells one continuous story.

### The reference firm: *Northchart Advisory*
- 8 advisers led by Mark Reynolds, 1 paraplanner (Emma), 2 administrators (Niamh + Aoife), 1 part-time compliance officer (Daniel). ~600 closed protection cases/year. £450k+ commission/year. UK + Ireland mix. Plum CRM underneath.

---

## 3. Surface architecture (the product chrome)

This is the v1.0 structural addition that didn't exist in PRD v0.1. **Three user surfaces + Customer Card + two AI layers.** Every screen we draw lives inside one of the three surfaces.

```
   ┌────────────────────────────────────────────────────────────────────┐
   │                        USER SURFACES                                │
   │                                                                      │
   │   Adviser Surface         Admin Surface         Operations Surface  │
   │   (Sarah)                 (Niamh)               (Mark Reynolds)     │
   │   Today · Cases ·         Kanban · Email ·      Pipeline · Cap ·    │
   │   Calls · Drafts          Portal Guides         Compliance · MI     │
   │                                                                      │
   └────────────────────────────────────────────────────────────────────┘
                  │                  │                  │
                  ▼                  ▼                  ▼
   ┌────────────────────────────────────────────────────────────────────┐
   │                    CUSTOMER CARD (the canonical data object)        │
   │   one record · projects into all three surfaces · no copy-paste     │
   │   sections fill in stage-by-stage from F1 → C4                      │
   └────────────────────────────────────────────────────────────────────┘
                                     ▲
                                     │ reads/writes
   ┌────────────────────────────────────────────────────────────────────┐
   │                    CROSS-CUTTING AI LAYERS                          │
   │                                                                      │
   │   Ivy Live (C8)                Ivy Co-pilot                         │
   │   real-time during calls       chat widget on all 3 surfaces        │
   │   sidebar overlay              Invoke · Answer · Surface            │
   │   probes · compliance gaps     case actions · firm queries · pings  │
   │   coaching prompts             cross-team comms route here          │
   └────────────────────────────────────────────────────────────────────┘
```

### Customer Card sections (filled stage-by-stage)
| Section | Filled by | Stage |
|---|---|---|
| Lead profile + score | F1 + enrichment | 1 |
| Qualifier conversation log | F2 / F6 | 2 |
| Vulnerability flags | C6 (continuous) | 2, 4, 8 |
| Booking | F4 | 3 |
| Call recording + transcript | C1 | 4 |
| FactFind (structured) | A2 | 4 |
| Quote inputs | A3-Stub | 5 |
| Quote results + KFIs | adviser pastes back | 5 |
| Suitability draft + score | A4 + A7 | 6 |
| Application bundle + cross-doc verify | M1 + M2 | 7 |
| Portal submission status | M3 + M4 | 7-8 |
| Insurer email log | M5 | 8 |
| Client comms (sent) | M6 | 9 |
| Compliance file index | C4 (continuous, finalised stage 9) | 3-9 |

### Co-pilot widget — three modes (same backend, contextual UI per surface)
| Mode | What it does | Example |
|---|---|---|
| **Invoke** | Trigger any backend feature by natural language | *"Draft Mark Roberts' suitability letter"* → fires A4 |
| **Answer** | Query firm data | *"Which adviser has the highest conversion this month?"* → returns Sarah, with reasoning |
| **Proactively surface** | Suggest next-best-action based on context | *"Mrs Patel hasn't been followed up since Tuesday. Draft check-in?"* |

Cross-team pings route through the Co-pilot. When Niamh pings Sarah about a Not Matching case, the message arrives in Sarah's Co-pilot widget on the Adviser Surface. No separate Slack, no email side-channel.

---

## 4. Decision framework (every feature judged against this)

In priority order:
1. Net Revenue Retention impact?
2. Gross margin impact?
3. Onboarding speed impact?
4. Builds the data moat?
5. Shippable in <1 week?
6. Moves toward "OS for insurance brokers" positioning?

A feature failing (1) and (2) doesn't ship in v1.0 regardless of how cool.

---

## 5. The 18 v1.0 features

Format: ID · Name · Pillar · Stage(s) · Composite score · Persona · Purpose · 3 user stories · Success criteria · Surface signals (which screens it appears on).

Composite scores are from the matrix. Surface signals are pulled from the workflow doc's screen mockups.

---

### Pillar 1 — FE Sales · 4 features

#### F1 · Omnichannel AI Lead Capture · Stage 1 · Score 52.5
- **Persona:** Adviser (Firm admin sets up channels)
- **Purpose:** 24/7 conversational lead capture across web chat, WhatsApp, SMS, email, PCW handoffs. Now extended with **dynamic AI lead scoring** via external data connectors (Companies House, address validation, fraud signals).
- **User stories:**
  - As an *adviser*, I want every overnight enquiry to land in one inbox already scored, so I never lose a weekend lead to a competing broker.
  - As a *firm admin*, I want to wire Compare the Market + Meta Lead Ads + a custom web form in <30 minutes so the firm can test channels fast.
  - As a *principal*, I want lead score + source + cost-per-lead visible on every record so I know which channel actually pays back.
- **Success criteria:**
  - 100% of inbound enquiries from connected channels arrive in the lead inbox within 60 seconds.
  - Lead score generated using ≥2 enrichment sources for ≥90% of UK leads.
  - +30% conversion uplift on previously-lost out-of-hours leads.
- **Surface signals:** Adviser Surface — Lead Inbox · Lead Detail (with conversation log + score + enrichment).

#### F2 · AI Conversational Qualifier · Stages 1-2 · Score 42
- **Persona:** Adviser (Lead is end-user-facing)
- **Purpose:** Replaces the human triage call with structured conversational qualifier. Captures employment, income, dependants, mortgage, trigger event, risk attitude, budget, timeline. Runs C6 vulnerability detection in parallel. Books FactFind via F4.
- **User stories:**
  - As an *adviser*, I want overnight leads qualified and booked into my Outlook calendar before I open my laptop.
  - As a *principal*, I want every qualifier conversation logged with the prompt-template version so I can show a regulator how the conversation was run.
  - As a *lead*, I want the conversation to feel human, short, respectful — not a 40-question form.
- **Success criteria:**
  - ≥60% of inbound leads complete qualification without adviser involvement.
  - Knockout cases that previously reached FactFind (~15% × 90 min) now decline at Stage 2.
  - +25% booking rate vs manual.
- **Surface signals:** Adviser Surface — AI Qualifier conversation panel (transcript + captured-data preview + knockout result + vulnerability check).

#### F4 · Calendar Integration + Routing · Stage 2 · Score 18
- **Persona:** Adviser (Firm admin sets routing rules)
- **Purpose:** Books qualified leads into the right adviser's existing calendar (Google / Outlook / Plum, OAuth read-only). **Ivy never owns the calendar.** Routes by specialism, region, language, workload, round-robin.
- **User stories:**
  - As a *firm admin*, I want to set "Niamh handles Cork mortgage protection" without writing code.
  - As an *adviser*, I want my Outlook to be the source of truth — Ivy reads, doesn't duplicate.
  - As a *principal*, I want a live capacity view to spot rebalance moments early.
- **Success criteria:**
  - 99%+ of booked appointments reflect calendar availability in real time.
  - Routing rules editable by non-technical admin in <2 minutes.
- **Surface signals:** Lead Detail (booking widget) · Operations Surface — Team Capacity panel · Settings — Routing Rules.

#### F6 · AI Voice Caller · Stage 2 · Score 25.6 · NEW IN v1.0
- **Persona:** Adviser (Lead is end-user-facing)
- **Purpose:** Voice-native equivalent of F2. Built on Retell / Vapi. Handles inbound calls and runs outbound campaign queues. Same qualifying flow tree as F2, executed by voice. Insurance-specific prompts and disclosures baked in.
- **User stories:**
  - As an *adviser*, when a lead calls our main line at 9pm, I want F6 to qualify and book just like F2 does on chat.
  - As a *principal*, I want F6 outbound campaigns we can target at lapsed-quote follow-ups without hiring an SDR.
- **Success criteria:**
  - Voice + chat lead to identical FactFind quality (no quality delta by channel).
  - <2-second latency on F6's responses during inbound calls.
- **Surface signals:** Adviser Surface — Lead Detail (voice transcript) · Operations Surface — Voice Campaign panel (firm admin scope).

---

### Pillar 2 — Adviser Co-pilot · 4 features

#### A2 · Live FactFind from Call Recording · Stage 4 · Score 32.5
- **Persona:** Adviser
- **Purpose:** Captures FactFind from the live call (AssemblyAI streaming → Claude Sonnet structured extraction). Eliminates post-call typing-up. Sarah looks at Mark, not at a form.
- **User stories:**
  - As an *adviser*, I want to run the FactFind looking my client in the eye, not at a template.
  - As an *adviser*, I want the post-call review to be 5–8 minutes of confirmation, not 25–30 minutes of transcription.
  - As a *compliance officer*, I want every extracted FactFind field linked to the exact transcript moment so I can verify what was actually asked.
- **Success criteria:**
  - <5 minutes from "call ends" to "structured FactFind ready for review."
  - <8 minutes adviser review-and-edit time.
  - Every captured field linked to its transcript timestamp.
- **Surface signals:** **Live FactFind screen** (split: transcript stream + auto-populating sections) · Customer Card — FactFind tab.

#### A3-Stub · Quote Inputs Generator · Stage 5 · Score 39
- **Persona:** Adviser
- **Purpose:** Generates structured paste-ready quote-input pack from the FactFind for SolutionBuilder, BIS, or Iress. **Eliminates the 12-min re-key burn** but keeps adviser running quotes in their existing engine. Adviser pastes results back into Ivy. (A3-Lite full deep-link integration: v1.1, sequenced BIS → SolutionBuilder → Iress.)
- **User stories:**
  - As an *adviser*, I want to send a sourced FactFind to SolutionBuilder without re-typing 47 fields.
  - As an *adviser*, I want quote results to slot back into Ivy without writing a comparison table from scratch.
- **Success criteria:**
  - Re-key into quote engine eliminated for ≥90% of cases.
  - Quote-results parser handles ≥3 insurer formats correctly in v1.0.
- **Surface signals:** Customer Card — Quote Inputs panel · Customer Card — Quote Results panel.

#### A4 · AI Suitability Letter Draft · Stage 6 · Score 46.7
- **Persona:** Paraplanner / Adviser
- **Purpose:** Drafts the full Suitability Letter from FactFind + quote shortlist. Every claim traceable to its FactFind source (`[FF§N.N]`) or quote source (`[Q§N]`). Self-scores against firm + regulatory criteria. High-scoring drafts (≥88) typically clear compliance review without changes.
- **User stories:**
  - As an *adviser*, I want a fully-cited first draft within 90 seconds of selecting the recommended quote.
  - As a *paraplanner*, I want to spend my time on judgement, not boilerplate.
  - As a *compliance officer*, I want every claim in the letter linked back to the FactFind evidence and quote source.
- **Success criteria:**
  - Draft generation <90 seconds.
  - Adviser/paraplanner edit time <15 minutes.
  - First-pass compliance approval rate ≥75%.
- **Surface signals:** **Suitability Letter Draft screen** (the editor with traceability tags + score panel + edits queue) · Customer Card — Suitability tab.

#### A7 · Document Template Version Manager · Stages 3, 6, 9 · Score 26.4
- **Persona:** Firm admin / Compliance officer
- **Purpose:** Version-aware central template store. Every doc sent to a client is tagged with the template version current at send time. Used across IDD/ToB/Privacy (Stage 3), Suitability (Stage 6), and Compliance File assembly (Stage 9). Quietly closes the version-drift compliance risk.
- **User stories:**
  - As a *firm admin*, I want one place to update the firm's IDD/ToB so every adviser uses the right version.
  - As a *compliance officer*, I want every disclosure tied to its canonical version with the audit trail.
- **Success criteria:**
  - Template version drift across advisers eliminated.
  - In-flight letters keep the version they started on (no mid-flight re-templating).
- **Surface signals:** Settings — Template Library · Customer Card — Disclosures section · Customer Card — Suitability section · Compliance File index.

---

### Pillar 3 — Call & Compliance · 4 features

#### C1 · Call Recording Auto-Capture · Stage 4 · Score 31.2
- **Persona:** Adviser (Compliance + audit consume)
- **Purpose:** Native adapters for Zoom Cloud Recording, Microsoft Graph (Teams), Google Meet API, with Recall.ai fallback. Audio uploaded to Ivy encrypted storage on call-end webhook. Ivy may store or link, depending on firm's existing CallCabinet/Recordsure usage.
- **User stories:**
  - As an *adviser*, I want every FactFind call automatically linked to its case, no manual upload.
  - As a *compliance officer*, I want to jump from "this letter says Mark is a non-smoker" to the exact 32-second transcript moment.
- **Success criteria:**
  - 100% of recorded calls linked to the right case within 5 minutes of call end.
  - <3 clicks from FactFind field → transcript → audio playback.
- **Surface signals:** Customer Card — Calls tab · Live FactFind screen (transcript pane).

#### C8 · Live Adviser Copilot — Ivy Live · Stage 4 · Score 27.5 · MOAT-CRITICAL · NEW IN v1.0
- **Persona:** Adviser
- **Purpose:** **Real-time copilot during calls.** Sidebar overlay during F4/F6/FactFind. Subscribes to A2's transcript stream and runs three sub-agents: probe-suggester, compliance-gap detector (the work formerly scoped as standalone C2), coaching prompts. Outputs render at <2-second latency. Single-click ack; logged for compliance.
- **User stories:**
  - As an *adviser*, when Mark mentions his brother's cancer diagnosis, I want a real-time prompt to probe his own screening history — *during* the call, not after.
  - As an *adviser*, I want compliance gaps flagged before the call ends, when I can still close them.
  - As a *compliance officer*, I want every C8 prompt logged with what the adviser did about it.
- **Success criteria:**
  - <2-second latency on real-time prompts.
  - In-call compliance-gap closure rate ≥85% (gaps flagged → adviser addresses).
  - 100% of prompts logged with adviser response.
- **Surface signals:** **Ivy Live sidebar** (rendered alongside Live FactFind screen during calls only).
- **Note:** Highest moat score in v1.0 (Moat 5). Also hardest to build (Ease 1). Ships imperfect by design — improves with real-call data over months.

#### C6 · Vulnerable Customer Detector · Stages 2, 4, 8 · Score 22
- **Persona:** Adviser (Compliance reviews)
- **Purpose:** Continuous detection across qualifier conversation, FactFind transcript, post-UW reaction. Pattern matching for indicator categories (financial pressure, recent bereavement, mental health, capacity, language barriers). Flag + reasoning attached to case. Consumer Duty / CPC 2025 evidence.
- **User stories:**
  - As an *adviser*, I want a non-intrusive flag the moment a vulnerability indicator surfaces, with the exact moment cited.
  - As a *compliance officer*, I want every flag's audit trail showing the indicator, the handling, and the evidence captured.
- **Success criteria:**
  - 0 false-negative on indicators present verbatim in transcript (validated against test set quarterly).
  - Detection coverage matches FCA / CBI canonical indicator list.
- **Surface signals:** Customer Card — Vulnerability panel (continuous, updated stage-by-stage) · Operations Surface — Compliance section (firm-wide vulnerability log).

#### C4 · Auto-Built Compliance File · Stage 9 · Score 43.3
- **Persona:** Compliance officer / Principal (Adviser benefits)
- **Purpose:** Aggregates 11 documents (IDD, ToB, Privacy, FactFind+audio, quote shortlist+KFIs, Suitability Letter, application bundle, M2 verify report, UW correspondence, policy schedule, M6 client comms) into a single retrieval index. Auto-generates 1-page case summary cover note. Audit-ready at on-risk, not at month-end.
- **User stories:**
  - As a *compliance officer*, I want the file assembled by the time the case goes on-risk, not built reactively at month-end.
  - As a *principal*, I want any 2-year-old file retrievable in <5 minutes.
  - As a *firm admin*, I want one-click DSAR export when a client requests their data.
- **Success criteria:**
  - 100% of cases have an audit-ready file at on-risk.
  - File retrieval on a 2-year-old case <5 minutes.
  - C4 quality score ≥95 on 90%+ of files.
- **Surface signals:** Compliance File screen · Customer Card — Compliance tab · Operations Surface — Compliance section.

---

### Pillar 4 — Admin Co-pilot · 6 features (the M-series)

The largest single new addition vs PRD v0.1. Productised from a LowQuotes-derived module. Replaces the originally-scoped A5 (full RPA) and parts of A6 (deep UW tracker). Spans Stages 7-9.

#### M1 · Document Ingestion · Stage 7 · Score 36
- **Persona:** Administrator
- **Purpose:** Webhook listeners on DocuSign / Adobe Sign / HelloSign envelope-completed events. Polling fallback for manual upload. Pulls full document bundle, stores encrypted, runs Mistral OCR.
- **User stories:**
  - As an *administrator*, I want signed application bundles in my queue automatically, with every page already OCR'd.
  - As a *firm admin*, I want manual upload to be a backup path that works the same way.
- **Success criteria:**
  - Document ingestion latency <2 minutes from envelope-completed event.
  - OCR accuracy ≥98% on standard insurer application forms.
- **Surface signals:** Admin Surface — Kanban tile (M1 ingest report) · Customer Card — Application Bundle tab.

#### M2 · Cross-Document Verification · Stage 7 · Score 52.0 · NEW IN v1.0
- **Persona:** Administrator (Adviser handles flags)
- **Purpose:** Cross-references key fields (name, DOB, address, premium, sum assured, term, beneficiary, bank details) across application + suitability + FactFind. Flags substantive mismatches **before** submission to the insurer. Catches NIGO before it reaches the insurer.
- **User stories:**
  - As an *administrator*, when M2 flags an address mismatch between FactFind and application, I want a one-click ping to the adviser to fix it before I submit.
  - As an *adviser*, I want corrections to round-trip cleanly without me having to re-DocuSign the whole bundle from scratch.
- **Success criteria:**
  - NIGO submission rate <3% (vs default-state 10–15%).
  - M2 catches ≥80% of cross-document mismatches that would otherwise have caused NIGO.
- **Surface signals:** **Admin Kanban — "Not Matching" lane** · Admin Kanban — Card detail (M2 verification report) · Co-pilot widget (cross-team ping).

#### M3 · Kanban Pipeline Management · Stage 8 · Score 36
- **Persona:** Administrator (Principal sees aggregated view)
- **Purpose:** Visual kanban for the admin team. Generic 4-stage flow in v1.0: AI Verified Pending Review · Not Matching · Portal Processing · Sent to Client. Cards transition automatically on M2 + M5 signals. (Per-broker SOP customisation: v1.1 configurable workflow engine.)
- **User stories:**
  - As an *administrator*, I want a kanban that auto-moves cards based on M2/M5 signals so I focus on exceptions, not bookkeeping.
  - As a *principal*, I want a firm-wide pipeline aggregation that rolls up the kanban per-adviser.
- **Success criteria:**
  - Kanban auto-transitions match expected state ≥95% of the time.
  - Average admin time per card across the kanban <8 minutes.
- **Surface signals:** **Admin Surface — Kanban (the headline screen for Niamh)** · Operations Surface — Pipeline rollup.

#### M4 · Per-Insurer Portal Guidance · Stage 8 · Score 33.6
- **Persona:** Administrator
- **Purpose:** Per-insurer YAML-defined submission checklists. Replaces the originally-scoped A5 full RPA. **More resilient** — when an insurer changes portal flow, checklist updates in 30 minutes (no code change). Insurer panel at v1.0 launch: UK (L&G, Vitality, Aviva UK, Royal London UK + 1-2 demand-driven), IE (Royal London IE, New Ireland, Aviva IE, Zurich IE).
- **User stories:**
  - As an *administrator*, I want a step-by-step Vitality submission checklist that I follow without remembering the order.
  - As a *firm admin*, I want adding a new insurer to be a discovery exercise, not an engineering project.
- **Success criteria:**
  - Stage 7 admin time per insurer <8 minutes.
  - New insurer onboarding ≤8 hours of discovery work.
- **Surface signals:** Admin Kanban — Card detail (M4 checklist panel) · Settings — Insurer Library.

#### M5 · Insurer Email Integration · Stage 8 · Score 33.6
- **Persona:** Administrator
- **Purpose:** Outbound — auto-drafts submission emails per insurer's required format. Inbound — Claude Haiku classifies inbound insurer emails (GP-report-request, more-info, decision-standard, decision-loaded, decision-decline). High-confidence classifications auto-action; low-confidence surface to admin. Covers ~85% of UW interactions; deeper UnderwriteMe API integration: v1.1.
- **User stories:**
  - As an *administrator*, when Vitality emails asking for a GP report on Mark, I want the GP consent flow already drafted, ready for me to send.
  - As an *adviser*, I want loaded/excluded UW decisions surfaced immediately so I can decide whether to accept or loop back to Stage 5.
  - As a *principal*, I want a firm-wide "what's stuck" view from M5's status changes.
- **Success criteria:**
  - Email classification accuracy ≥92% on insurer correspondence.
  - Loaded/excluded UW decisions trigger Stage 5–7 redo workflow within 15 minutes of detection.
- **Surface signals:** Admin Surface — Email Feed · Admin Kanban — Card detail (M5 inbound tracking) · Adviser Surface — Alerts.

#### M6 · Approved Policy Client Communication · Stage 9 · Score 25.2
- **Persona:** Administrator
- **Purpose:** When M5 detects insurer's on-risk confirmation, M6 auto-drafts the client onboarding email — celebratory tone, personalised premium + cover details, first DD date, policy schedule attached. Admin reviews, makes one personalisation edit, sends. Standardises tone firm-wide.
- **User stories:**
  - As an *administrator*, I want approved-policy onboarding emails drafted in firm tone with one personalisation hook.
  - As a *principal*, I want client-facing comms to feel like the firm, not like an AI.
- **Success criteria:**
  - 100% of on-risk events trigger an M6 draft within 5 minutes.
  - Admin edit time per email <2 minutes.
- **Surface signals:** Admin Kanban — "Sent to Client" lane · Customer Card — Client Comms tab.

---

## 6. Platform substrate (assumed in v1.0; not in the 18-feature catalogue)

These were X1–X6 in PRD v0.1. The new spec doesn't list them as features but they must exist for the surfaces to function. Treat as substrate, draw lightweight in mockups, cover in detail post-mockup.

| ID | Capability | Surface where it lives | Round-1 mockup priority |
|---|---|---|---|
| X1 | Setup wizard / firm onboarding | Operations Surface (firm admin first-run) | P1 (round 2) |
| X2 | Adviser onboarding + invite | Operations Surface | P2 |
| X3 | Settings & firm config (users, roles, integrations, templates, branding, routing, regulatory profile) | Operations Surface (firm admin) | P1 — at minimum stub the Settings shell |
| X4 | Billing & credit ledger (Starter/Growth/Scale/Enterprise tiers, credit consumption per action) | Operations Surface | P1 — at minimum stub the Billing shell |
| X5 | Audit log & exports (Consumer Duty board report, CPC 2025 evidence, FOS, DSAR) | Operations Surface | P0 — explicitly visible in Mark's Compliance section |
| X6 | Notifications inbox (in-app + email; Slack/Teams later) | All 3 surfaces (top-right) | P0 — visible in chrome of all surfaces |

---

## 7. Cross-feature dependency view

```
              ┌──────────────────────────────────────────────────────────┐
              │              PLATFORM SUBSTRATE  (X1-X6)                  │
              └──────────────────────────────────────────────────────────┘
                                       ▲
                                       │
   ┌──────────────┬─────────────┬─────┴───────┬────────────────────────┐
   │              │             │             │                         │
   ▼              ▼             ▼             ▼                         ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────────┐
   │ FE SALES │  │ ADVISER  │  │ CALL &   │  │  ADMIN   │  │   CO-PILOT       │
   │          │─▶│ CO-PILOT │─▶│COMPLIANCE│─▶│ CO-PILOT │  │ (cross-cutting   │
   │ F1 F2    │  │          │  │          │  │          │  │  AI layer        │
   │ F4 F6    │  │ A2 A3-S  │  │ C1 C4    │  │ M1 M2 M3 │  │  on all 3        │
   │          │  │ A4 A7    │  │ C6 C8    │  │ M4 M5 M6 │  │  surfaces)       │
   └──────────┘  └──────────┘  └──────────┘  └──────────┘  └─────────────────┘
       │              │              │             │               ▲
       │              │              │             │               │
       └──────────────┴──────────────┴─────────────┴───────────────┘
                       Customer Card (single data object)
```

Reading the diagram: features write to the Customer Card. The 3 surfaces project from the same Customer Card. The Co-pilot reads the Customer Card and invokes features by natural language. Platform substrate is always-on underneath.

---

## 8. v1.0 vs Next (summary — full detail in `ivy-v1-roadmap.md`)

| Horizon | Theme | What's in |
|---|---|---|
| **NOW · v1.0** | The AI workflow OS for protection brokers | The 18 features above |
| **NEXT · v1.1** | Closing the application loop + workflow customisation | A1, A3-Lite (BIS → SolutionBuilder → Iress), C3, configurable workflow engine, UK insurer expansion, deeper UnderwriteMe |
| **LATER · v1.2** | Multi-channel intake at scale + analytics depth | F3, F5, deeper PCW integrations, C5 manager coaching dashboard, persistency analytics, Atlas v2 |
| **LATER · v2.0** | Adjacent segments + Back-End Sales | Mortgage+Protection (UK), Pensions/Wealth (IE), B-series (B1-B4) |
| **BACKLOG · v3.0** | System of Record graduation (optional) | Only if 3 conditions converge — see roadmap |

Round-1 mockup represents v1.0 explicitly. v1.1 features show as roadmap surfaces or coming-soon placeholders only.

---

## 9. Out of scope (explicitly not in v1.0 or v1.1)

Same list across the new spec. Worth listing here so the mockup never accidentally implies these.

- Quote engine (partner with iPipeline, BIS, Iress permanently)
- Full RPA portal automation (replaced by M4 guided checklists)
- CRM / System of Record (Plum / Acre / Plannr / intelliflo continue underneath)
- Calendar UI (F4 integrates with adviser's existing calendar)
- Wealth-IFA-only product
- Pure mortgage broker product
- US market
- Autonomous AI agent that sells without an adviser (regulatory + trust)
- White-label / reseller programme
- Native mobile app (phone-responsive web only — see open question 5)

---

## 10. Open questions (status update vs PRD v0.1)

| # | Question | Status |
|---|---|---|
| 1 | Cases vs leads — single object or two? | **Closed.** The Customer Card is the single canonical object. State transitions through stages. |
| 2 | Compliance officer access pattern (internal vs external consultant) | **Closed for v1.0.** v1.0 assumes internal compliance (Daniel) plus principal-as-compliance-lead (Mark Reynolds). External consultant access pattern: deferred decision. |
| 3 | Multi-jurisdiction firms (UK + IE same firm) | **Still open.** Per-case jurisdiction assumed but not pinned. Affects A7 template selection + C2/C3 scoring. |
| 4 | Suitability draft ownership (paraplanner-led vs adviser-led) | **Closed.** v1.0 centres on adviser-led editing of A4 drafts; paraplanner (Emma) supports complex cases. The Suitability Letter Draft screen is owned by the adviser. |
| 5 | Mobile companion | **Still open.** Default desktop-only for round 1. |
| 6 | Setup wizard scope (in 18 features?) | **Closed.** Not in the 18 features; lives in the platform substrate (X1) on the Operations Surface. Round-1 mockup stubs it. |
| 7 | Credit-usage transparency (advisers see, or admin-only?) | **Still open.** Default: admin-only on the Operations Surface (X4). |

### New open questions raised by the v1.0 spec
| # | Question | Why it matters |
|---|---|---|
| 8 | What does the Operations Surface look like at launch given C5 (Manager Coaching Dashboard) is v1.5? | The Operations Surface in workflow doc shows pipeline + capacity + compliance + MI; C5 deferral means coaching depth (adviser drift, training needs) is v1.5. Need to draw a v1.0 Operations Surface that's useful but not loaded with C5 features. |
| 9 | Where does the Customer Card live structurally? | Universal cross-surface. Need a canonical Customer Card screen design that works as a primary canvas (Adviser Surface) AND as an inline drawer (Admin Surface) AND as a referenced object (Operations Surface). |
| 10 | How does Ivy Live coexist with the Co-pilot widget visually? | Both are AI surfaces. Live during calls only, sidebar overlay; Co-pilot persistent bottom-right. Need to make sure the mockup shows both without clutter. |
| 11 | Does v1.0 ship a multi-firm tenant model or single-firm-per-tenant? | The specs talk about Northchart specifically. Multi-firm (network HQ) is a Phase 3 channel motion. Confirm v1.0 = single-firm-per-tenant. |
| 12 | Co-pilot widget — what triggers proactive surfacing? | The "Mrs Patel hasn't been followed up since Tuesday" example is great but unclear which signals fire it. Affects the screen mockup of the Co-pilot. |

Carrying forward into per-screen briefs (Artifact 5).

---

## 11. Northchart's reference numbers (use these in mockups)

Pulled from the workflow doc + matrix. Use real firm-shape data so screens feel solid.

| Metric | Value |
|---|---|
| Firm name | Northchart Advisory |
| Advisers | 8 (Sarah, James, Tom, Aiyana, Connor, Priya, +2) |
| Paraplanner | 1 (Emma) |
| Administrators | 2 (Niamh, Aoife) |
| Compliance | 1 part-time (Daniel) + Mark Reynolds (principal) |
| Cases per year | ~600 |
| Cost per closed policy (default state → v1.0) | £446 → £330 |
| Net margin per case (default → v1.0) | £202 → £318 |
| Time per case (default → v1.0) | 6.7 hrs → 3.3 hrs |
| Annual subscription (Growth tier) | £18k |
| Annual net value | ~£107k |
| ROI | ~6.4× |

Sample case: Mark Roberts. 38, self-employed graphic designer, Manchester, £62k income, £245k mortgage, partner Sophie + 2 children, brother diagnosed with bowel cancer, recommended onto Vitality decreasing-term life with accelerated CI at £42.80/month over 22 years.

---

## 12. What this PRD does and does not decide

- **Does decide:** what features exist · who they're for · what they must do · how we judge "done" · which surfaces they live in · which pillar · what's in v1.0 vs v1.1 vs out.
- **Doesn't decide:** screen designs, navigation patterns, URL structure, component patterns, mock data shape, copy, visual style. All of that lives in Artifacts 3–6.

---

*End of PRD v0.2. Companion canonical docs: `ivy-v1-user-workflow.md` (the depth), `ivy-v1-roadmap.md` (the sequencing), `ivy-v1-feature-priority-matrix.md` (the rationale).*
