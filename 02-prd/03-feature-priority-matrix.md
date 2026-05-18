# ⚖️ Ivy v1.0 — Feature Priority Matrix

## Stage-by-Stage Problems Mapped to Features

---

## Executive Summary

This document maps every Ivy v1.0 feature to the specific broker-workflow problem it solves, scores each feature on five dimensions, and ranks them for v1.0 prioritisation. The analysis is grounded in the Phase 1 ICP definition and the default-state workflow analysis, so this doc focuses purely on **which features matter most, in what order, for what reason**.

**Headline finding:** of 25 candidate features mapped across the 9-stage workflow, **18 score in the v1.0 build set**, distributed across four pillars: 🟢 4 FE Sales, 🔵 4 Adviser Co-pilot, 🟣 4 Call & Compliance, 🟠 6 Admin Co-pilot. This represents a deliberate evolution from the original 13-feature plan: A5 (full RPA) is replaced by the M-series productised admin module; A6 (deep UW tracker) is partially absorbed into M5; C2 (post-call FactFind compliance scorer) is folded into C8 (real-time Ivy Live copilot); and A1 + A3-Lite + C3 are deferred to v1.1.

**The four highest-scoring features by composite score:**
1. **F1 — Omnichannel AI Lead Capture** (52.5) — solves out-of-hours lead death, the single biggest top-of-funnel leak
2. **M2 — Cross-Document Verification** (52.0) — catches NIGO submissions before they reach the insurer; AI-native and genuinely novel
3. **A4 — AI Suitability Letter Draft** (46.7) — solves the Stage 6 time-burn and compliance-risk double-hit
4. **C4 — Auto-Built Compliance File** (43.3) — solves document fragmentation across the 6/7-year retention window

**The deliberate cuts and deferrals:**
- **A1** (Pre-FactFind Disclosure Auto-Send) → v1.1 — the firm's existing process plus A7's version control covers v1.0
- **A3** full quote engine integration → split: A3-Stub ships in v1.0 (structured input generator); A3-Lite (deep-link) ships v1.1 sequenced BIS → SolutionBuilder → Iress
- **A5** Insurer Portal Auto-Fill (full RPA) → REPLACED by M4 guided checklists — more resilient to portal changes, AI-meaningful via M2 cross-verification
- **A6** Smart Underwriting Tracker (deep) → PARTIAL via M5 inbound email parsing in v1.0; deeper API integration with UnderwriteMe in v1.1
- **C2** FactFind Compliance Scorer → FOLDED into C8 (Ivy Live surfaces compliance prompts in real-time during the call rather than scoring after)
- **C3** Advice Quality Scorer → v1.1 (A4's self-scoring covers the v1.0 baseline)
- **C5** Manager Coaching Dashboard → v1.5
- **C7** Audit-Ready File Search → v1.5
- **B-series** (Back-End Sales) → v2.0+ (Phase 1 ICP firms don't have the back-book yet)

---

## Scoring Framework

Every feature scored 1–5 on five dimensions. Composite = (ROI × Severity × Moat) ÷ (6 − Ease) × (1 + Progress÷10).

| Dimension | What it measures |
|---|---|
| **ROI** | Customer value delivered (time saved, conversion lift, compliance risk reduction, revenue uplift). 5 = transformative; 1 = marginal. |
| **Severity** | How acute is the broker's pain in default state today. 5 = adviser brings it up unprompted in every demo; 1 = annoying but tolerated. |
| **Moat** | How defensible is this feature once shipped. 5 = creates switching cost or proprietary data asset; 1 = competitor builds same in 3 months. |
| **Ease** | How easy is this to build to production quality. 5 = trivial / off-the-shelf; 1 = months of build, novel ML. |
| **Progress** | How much have we already shipped of this. 5 = production-ready at one or more current customers; 1 = net new idea. |

**Score interpretation:** 35+ = clear v1.0 build · 20–35 = v1.0 conditional / v1.5 build · 10–20 = v1.5 / Phase 2 · <10 = park or skip.

---

## Branch Legend

🟢 **F-series — FE Sales:** lead capture, qualification, booking, voice. Customer-facing top of funnel.

🔵 **A-series — Adviser Co-pilot:** the adviser-facing AI that automates the work the adviser would otherwise do — FactFind capture, quote inputs, suitability drafting, template management. Where the adviser's 6.7-hour case becomes a 3.4-hour case.

🟣 **C-series — Call Analysis & Compliance:** recording, real-time copilot, vulnerability detection, audit-ready compliance file. The compliance scaffolding around the workflow.

🟠 **M-series — Admin Co-pilot:** the back-office admin team's productised workflow — document ingestion, cross-verification, kanban pipeline, per-insurer portal guidance, email integration, client comms. Productised from the LowQuotes-derived module; spans Stages 7–9.

🟫 **B-series — Back-End Sales:** lifecycle and book economics — lapse prevention, cross-sell, annual reviews, trail health. Not in v1.0; activates v2.0+ once Phase 1 ICP firms have meaningful in-force books.

---

## Stage 1 — Lead Capture

The broker receives an inbound prospect from a paid channel (PCW, Meta, Google) or referral, routes it into the CRM, and attempts first contact. Where the firm wins or loses against competing brokers in the same shared-lead pool.

**Top problems:** out-of-hours lead death (Sev 5) · speed-to-lead lag (Sev 4) · shared-lead competition (Sev 4) · no qualification at lead level (Sev 3) · no AI lead scoring (Sev 3).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Out-of-hours lead death | **F1 — Omnichannel AI Lead Capture** | 🟢 F | 24/7 conversational lead capture across web chat, WhatsApp, SMS, email, and PCW handoffs. Now extended in v1.0 with **dynamic AI lead scoring** via external data connectors (Companies House, address validation, fraud signals) — captures, scores, and qualifies inbound enquiries before any human is awake | 5 | 5 | 3 | 4 | 4 | **52.5** |

---

## Stage 2 — Triage and Qualify

A human (or AI) confirms the prospect is genuinely advisable and worth scheduling for a full FactFind. Where knockout cases should be filtered out.

**Top problems:** no structured qualification framework (Sev 4) · knockout cases reaching FactFind (Sev 4) · no vulnerability screening (Sev 4) · adviser-by-adviser variability (Sev 3) · voice-only customers underserved (Sev 3) · scheduling friction across multiple advisers (Sev 3).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Knockout cases reaching FactFind | **F2 — AI Conversational Qualifier** | 🟢 F | Replaces the human triage call with a conversational AI that asks structured qualifying questions, scores fit, and books the FactFind appointment | 5 | 4 | 3 | 4 | 4 | **42** |
| Voice-channel customers underserved | **F6 — AI Voice Caller** *(new in v1.0)* | 🟢 F | Voice-native equivalent of F2, built on Retell/Vapi — handles inbound calls, runs outbound campaign queues, executes the same qualifying flow tree but via voice rather than chat. Insurance-specific prompts and disclosures baked in | 4 | 4 | 4 | 3 | 2 | **25.6** |
| Scheduling friction across multiple advisers | **F4 — Calendar Integration + Routing** | 🟢 F | Integrates with the adviser's existing calendar (Google / Outlook — *no Ivy calendar UI*); auto-routes booked appointments to the right adviser based on availability, specialism, and load | 4 | 3 | 1 | 5 | 5 | **18** |
| No vulnerability screening at first touch | **C6 — Vulnerable Customer Detector** | 🟣 C | Flags vulnerability indicators from the first conversation onwards — financial pressure, recent bereavement, mental health signals — for adviser awareness and Consumer Duty / CPC 2025 evidence | 4 | 5 | 4 | 2 | 1 | **22** |

---

## Stage 3 — Pre-FactFind Disclosure

Send the IDD, Terms of Business, and Privacy Notice; capture e-signature; send the document checklist; confirm the FactFind logistics. Mostly automation territory.

**Top problems:** document version drift (Sev 4) · document checklist gaps (Sev 4) · e-signature webhook failures (Sev 3) · client doesn't read disclosures (Sev 3).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Document version drift across templates | **A7 — Document Template Version Manager** | 🔵 A | Version-aware central template store — every document sent to a client is tagged with the template version that was current at send time, providing a defensible audit trail. Used across Stages 3, 6, 9 | 3 | 4 | 2 | 5 | 1 | **26.4** |
| Manual disclosure document send | ~~A1 — Pre-FactFind Disclosure Auto-Send~~ *(deferred to v1.1)* | 🔵 A | Triggers IDD, ToB, Privacy Notice (and CPC 2025 Statement for IE) automatically on FactFind booking — with e-signature, checklist, and reminders. **In v1.0, the firm continues using its existing disclosure send process; A7 still tracks template versions.** | 3 | 4 | 2 | 5 | 5 | **36 (v1.1)** |

---

## Stage 4 — FactFind Call

The 60–90 minute structured client interview that captures everything the suitability recommendation will reference. The single biggest stage at 25% of total fee-earning time.

**Top problems:** post-call typing-up cost (Sev 5) · health-section depth varies by adviser (Sev 5) · vulnerability indicators missed (Sev 5) · live typing slows the conversation (Sev 4) · client memory imprecision (Sev 4) · adviser doesn't know what to probe next (Sev 4).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Post-call typing-up consumes 25 min/case | **A2 — Live FactFind from Call Recording** | 🔵 A | Listens to the FactFind call as it happens, auto-populates the FactFind document in real time, and produces the typed-up version automatically — eliminating post-call data entry | 5 | 5 | 4 | 2 | 3 | **32.5** |
| Compliance baseline — capturing the call | **C1 — Call Recording Auto-Capture** | 🟣 C | Automatic, integrated call recording across Zoom / Teams / Meet / phone — encrypted storage, 6/7-year retention, audit-ready. Foundation for the entire C-series and A2 | 4 | 4 | 3 | 4 | 3 | **31.2** |
| Adviser doesn't know what to probe + compliance signals missed | **C8 — Live Adviser Copilot (Ivy Live)** *(new in v1.0)* | 🟣 C | Real-time AI copilot during calls — surfaces probing questions, regulatory reminders, vulnerability follow-ups, and advice-relevance triggers as the conversation unfolds. **Absorbs the original C2's compliance-scoring role** and extends it from a passive post-call score into an active in-call copilot. Single-click acknowledgement; logged for compliance | 5 | 5 | 5 | 1 | 1 | **27.5** |
| Vulnerability indicators slipped past adviser | **C6 — Vulnerable Customer Detector** | 🟣 C | *(see Stage 2 — same feature, listening continues across stages)* | 4 | 5 | 4 | 2 | 1 | **22** |
| Post-call FactFind compliance scoring | ~~C2 — FactFind Compliance Scorer~~ *(folded into C8)* | 🟣 C | Original concept: post-call compliance score with section-level flags. **In v1.0, C8 (Ivy Live) handles this in real time during the call** — surfacing the same compliance gaps when the adviser can act on them rather than after the call ends. C2 is no longer a separate feature | 5 | 5 | 4 | 2 | 1 | *27.5 (folded)* |

---

## Stage 5 — Research and Quote

The adviser translates FactFind data into a shortlist of 3–5 specific products from specific insurers. Re-keying penalty hits hard here, plus context-switching across multiple research tools.

**Top problems:** re-keying from FactFind to quote engine (Sev 5) · indicative underwriting blind-spots (Sev 5) · multiple disconnected research tools (Sev 4) · quote engine panel gaps (Sev 4).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| 12-min re-key from FactFind to quote engine | **A3-Stub — Quote Inputs Generator** *(in v1.0)* | 🔵 A | Auto-generates a structured, paste-ready quote input pack from the FactFind for each preferred quote engine (SolutionBuilder, BIS, Iress). Adviser pastes into the engine; runs the quote externally; pastes results back. **Eliminates the 12-min re-key burn but doesn't yet eliminate the paste step** — that lands with A3-Lite in v1.1 | 4 | 5 | 3 | 4 | 3 | **39** |
| Full deep-link integration with quote engines | ~~A3-Lite — Quote Engine Deep-Link~~ *(deferred to v1.1)* | 🔵 A | Direct API integration with SolutionBuilder, BIS, Iress — eliminates the paste step entirely; pulls quote results back automatically. Sequenced BIS → SolutionBuilder → Iress | 5 | 5 | 4 | 2 | 2 | **30 (v1.1)** |

---

## Stage 6 — Suitability Letter

The formal recommendation document — primary compliance artefact and biggest single source of FOS complaint risk. 45–75 min drafting plus 1–5 day compliance review wait.

**Top problems:** compliance review bottleneck (Sev 5) · suitability letter as biggest complaint risk (Sev 5) · word template version drift (Sev 4) · same data re-stated multiple times (Sev 4) · justification of rejected alternatives (Sev 4).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| 45-75 min drafting + 2-5 day compliance wait | **A4 — AI Suitability Letter Draft** | 🔵 A | Drafts the full Suitability Letter from FactFind + quote shortlist — every claim traceable to a FactFind data point, formatted to firm template, ready for adviser review. Self-scores against firm + regulatory criteria so high-scoring drafts clear compliance review faster | 5 | 5 | 4 | 3 | 4 | **46.7** |
| Template version drift in suitability docs | **A7 — Document Template Version Manager** | 🔵 A | *(see Stage 3 — same feature, applies equally to Suitability templates)* | 3 | 4 | 2 | 5 | 1 | **26.4** |
| Deeper substantive advice quality scoring | ~~C3 — Advice Quality Scorer~~ *(deferred to v1.1)* | 🟣 C | Pre-screens drafted Suitability Letters for substantive recommendation quality — flags weak alternative-rejection rationale, Consumer Duty gaps, vulnerability-aware adjustments. **In v1.0, A4's self-scoring covers the baseline; C3 adds the substantive depth in v1.1** | 4 | 4 | 4 | 2 | 1 | **17.6 (v1.1)** |

---

## Stage 7 — Application Submission

The case transitions from adviser to admin team. Client signs the application bundle; admin team ingests, verifies, and submits to insurer. The single biggest individual time-bottleneck in default state (30 min/case re-keying) and the worst multi-portal context-switching pain.

**Top problems:** multi-portal credential management (Sev 5) · re-keying penalty (Sev 5) · multi-insurer cases compound the work (Sev 5) · NIGO submissions cause customer-side rework (Sev 4) · adviser-to-admin handoff friction (Sev 4) · document version mismatches across application + suitability + FactFind (Sev 4).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Adviser-admin handoff + document ingestion | **M1 — Document Ingestion** | 🟠 M | Triggers on signed e-signature envelope (DocuSign, Adobe Sign, manual upload); pulls all documents from the bundle; runs Mistral OCR to extract structured data per document. Foundational for the entire M-series | 4 | 4 | 3 | 4 | 5 | **36** |
| NIGO submissions due to data mismatches across docs | **M2 — Cross-Document Verification** *(new in v1.0)* | 🟠 M | AI cross-references key fields (name, DOB, address, policy number, premium, sum assured, beneficiary, bank details) across application + suitability + FactFind. Flags substantive mismatches before submission. **Catches NIGO before it reaches the insurer** — saving 1-3 days of customer-side rework per affected case | 5 | 4 | 4 | 4 | 3 | **52** |
| 30 min re-keying into insurer portal per case | ~~A5 — Insurer Portal Auto-Fill~~ *(REPLACED by M-series)* | 🟠 M | Original concept: full RPA browser-automation agent that logs into insurer portals and auto-fills application forms. **In v1.0, this is replaced by M3 + M4 + M5 (guided manual processing).** Rationale: full RPA is fragile and breaks on portal updates; guided manual is resilient — when an insurer updates their portal, the M4 checklist gets a 30-min update with no code change | 5 | 5 | 5 | 1 | 1 | *27.5 (replaced)* |

---

## Stage 8 — Underwriting Tracking

Multi-week passive case management while the insurer underwrites — GP reports, additional questions, decisions. Where client engagement decays. Now run by the back-office admin team via the M-series kanban + portal guidance, not the adviser.

**Top problems:** GP report latency (Sev 5) · loading/exclusion forces Stage 5–7 redo (Sev 5) · manual status tracking across in-flight cases (Sev 4) · no proactive insurer notifications (Sev 4) · client engagement decay (Sev 4) · per-insurer portal idiosyncrasies (Sev 4).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Admin team has no unified view of in-flight cases | **M3 — Kanban Pipeline Management** | 🟠 M | Visual kanban surface for the admin team — generic 4-stage flow: AI Verified Pending Review → Approved → Portal Processing → Sent to Client. Cards transition automatically based on M2 verification + M5 inbound email parsing. **Per-broker SOP customisation deferred to v1.1** | 4 | 3 | 2 | 5 | 5 | **36** |
| Per-insurer portal complexity + idiosyncrasies | **M4 — Per-Insurer Portal Guidance** | 🟠 M | Tailored submission checklist per insurer (Royal London IE, New Ireland, Aviva IE, Zurich IE in v1.0 launch; L&G UK, Vitality UK, Aviva UK, Royal London UK + 1-2 more added before v1.0 ship). Guides the admin step-by-step through the portal with the right document at the right moment. Cost to add new insurer: 4-8 hours of discovery (no engineering) | 4 | 4 | 3 | 4 | 4 | **33.6** |
| No structured tracking of insurer email responses | **M5 — Insurer Email Integration** | 🟠 M | Outbound: auto-drafts submission emails per insurer's required format. Inbound: parses insurer responses — submission acknowledgements, GP report requests, additional info requests, UW decisions (standard / loaded / declined). Auto-classifies status; surfaces actions to admin. **Covers the email-based UW tracking that A6 was originally scoped for; deeper UnderwriteMe API integration lands v1.1** | 4 | 4 | 3 | 4 | 4 | **33.6** |
| Deeper insurer API integration (multi-insurer) | ~~A6 — Smart Underwriting Tracker~~ *(PARTIAL via M5; deeper v1.1)* | 🟠 M | Original concept: deep API integration with insurer underwriting platforms. **In v1.0, M5's email parsing handles the practical case for ~85% of UW interactions; deeper API integration via UnderwriteMe partnership lands in v1.1** | 4 | 4 | 3 | 3 | 3 | *20.8 (partial)* |

---

## Stage 9 — On-Risk and Compliance File

Confirm policy on risk, deliver client onboarding, assemble the 11-document compliance file with 6/7-year retention. Document fragmentation hurts most here.

**Top problems:** document fragmentation across systems (Sev 5) · long retention institutional memory decay (Sev 5) · audit-retrieval cost (Sev 4) · manual file assembly (Sev 4) · client onboarding email crafted from scratch each time (Sev 3).

| Problem | Feature | Branch | What It Does | ROI | Sev | Moat | Ease | Prog | **Score** |
|---|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| 11-document file split across 2+ systems | **C4 — Auto-Built Compliance File** | 🟣 C | Assembles every case's IDD, FactFind, recording, quotes, suitability letter, application, UW correspondence, and policy schedule into a single audit-ready file with one-click retrieval over the full 6/7-year retention window. Auto-generates the case summary cover note | 5 | 5 | 4 | 3 | 3 | **43.3** |
| Client onboarding email drafted from scratch | **M6 — Approved Policy Client Communication** | 🟠 M | When M5 detects insurer's on-risk confirmation email, M6 auto-drafts the client onboarding email with policy details + DD start date + signed policy schedule attached. Admin reviews, personalises one line, sends. Standardises tone firm-wide | 3 | 3 | 2 | 5 | 4 | **25.2** |
| 30-90 min retrieval cost on old cases | ~~C7 — Audit-Ready File Search~~ *(deferred to v1.5)* | 🟣 C | Search interface across the compliance file archive — query by client, date, insurer, status, regulatory event — for FOS complaints, audits, regulator visits. **In v1.0, C4 indexes; full search lands v1.5** | 3 | 4 | 3 | 4 | 1 | **19.8 (v1.5)** |
| No structural QA across firm's case files | ~~C5 — Manager Coaching Dashboard~~ *(deferred to v1.5)* | 🟣 C | Aggregates compliance scores, advice quality scores, FactFind completeness, and vulnerability flagging across the team — surfaces patterns of adviser drift and training needs | 3 | 3 | 3 | 4 | 4 | **18.9 (v1.5)** |

---

## Cross-Stage Features

Five v1.0 features solve problems in multiple stages, which makes their effective value higher than any single-stage view shows.

| Feature | Stages it Touches | Effective Value |
|---|---|---|
| **C1 — Call Recording Auto-Capture** | Stage 4 (foundation) → Stage 6 (suitability evidence) → Stage 9 (compliance file component) | Anchors the entire C-series; nothing in Call Analysis ships without it |
| **C8 — Live Adviser Copilot (Ivy Live)** | Stage 4 (FactFind call) — and absorbs C2's role across compliance scoring | Single biggest moat (Moat 5) of any v1.0 feature; no competitor has real-time vertical-specific in-call AI |
| **A7 — Document Template Version Manager** | Stage 3 (IDD/ToB) + Stage 6 (Suitability) + Stage 9 (compliance file) | Quietly closes the version-drift compliance risk across three stages; relatively cheap to build |
| **C6 — Vulnerable Customer Detector** | Stage 2 (first contact) + Stage 4 (FactFind) + Stage 8 (revised pricing reaction) | Consumer Duty / CPC 2025 obligation runs across the entire client journey, not just one stage |
| **M-series (M1–M6)** | Stage 7 (M1, M2) + Stage 8 (M3, M4, M5) + Stage 9 (M6) — **bundled productisation** | The productised LowQuotes-derived admin module — ships as one coherent capability across three stages. Replaces what would otherwise be 3-4 separate features (A5, A6, parts of A7) |

The B-series (Back-End Sales) features are not stage-mapped above because they operate *after* the 9-stage closed-sale workflow — they fire on the in-force book, not on new business. They show up in the consolidated matrix below for completeness, but Phase 1 priority for them is conditional on the firm having a meaningful in-force book to operate against.

---

## The Consolidated Feature Priority Matrix

All candidate features ranked by composite score.

| Rank | Feature | Branch | Stage(s) | ROI | Sev | Moat | Ease | Prog | **Score** | **Tier** |
|:-:|---|---|---|:-:|:-:|:-:|:-:|:-:|:-:|---|
| 1 | F1 — Omnichannel AI Lead Capture (with AI scoring) | 🟢 F | 1 | 5 | 5 | 3 | 4 | 4 | **52.5** | **v1.0** |
| 2 | M2 — Cross-Document Verification | 🟠 M | 7 | 5 | 4 | 4 | 4 | 3 | **52.0** | **v1.0** |
| 3 | A4 — AI Suitability Letter Draft | 🔵 A | 6 | 5 | 5 | 4 | 3 | 4 | **46.7** | **v1.0** |
| 4 | C4 — Auto-Built Compliance File | 🟣 C | 9 | 5 | 5 | 4 | 3 | 3 | **43.3** | **v1.0** |
| 5 | F2 — AI Conversational Qualifier | 🟢 F | 1, 2 | 5 | 4 | 3 | 4 | 4 | **42** | **v1.0** |
| 6 | A3-Stub — Quote Inputs Generator | 🔵 A | 5 | 4 | 5 | 3 | 4 | 3 | **39** | **v1.0** |
| 7 | M1 — Document Ingestion | 🟠 M | 7 | 4 | 4 | 3 | 4 | 5 | **36** | **v1.0** |
| 8 | M3 — Kanban Pipeline Management | 🟠 M | 8 | 4 | 3 | 2 | 5 | 5 | **36** | **v1.0** |
| 9 | A1 — Pre-FactFind Disclosure Auto-Send | 🔵 A | 3 | 3 | 4 | 2 | 5 | 5 | **36** | **v1.1** |
| 10 | M4 — Per-Insurer Portal Guidance | 🟠 M | 8 | 4 | 4 | 3 | 4 | 4 | **33.6** | **v1.0** |
| 11 | M5 — Insurer Email Integration | 🟠 M | 8 | 4 | 4 | 3 | 4 | 4 | **33.6** | **v1.0** |
| 12 | A2 — Live FactFind from Call Recording | 🔵 A | 4 | 5 | 5 | 4 | 2 | 3 | **32.5** | **v1.0** |
| 13 | C1 — Call Recording Auto-Capture | 🟣 C | 4 | 4 | 4 | 3 | 4 | 3 | **31.2** | **v1.0** |
| 14 | A3-Lite — Quote Engine Deep-Link | 🔵 A | 5 | 5 | 5 | 4 | 2 | 2 | **30** | **v1.1** |
| 15 | C8 — Live Adviser Copilot (Ivy Live) | 🟣 C | 4 | 5 | 5 | 5 | 1 | 1 | **27.5** | **v1.0 — moat-critical** |
| 16 | ~~A5 — Insurer Portal Auto-Fill~~ | 🟠 M | 7 | 5 | 5 | 5 | 1 | 1 | *27.5* | *Replaced by M3+M4+M5* |
| 17 | ~~C2 — FactFind Compliance Scorer~~ | 🟣 C | 4 | 5 | 5 | 4 | 2 | 1 | *27.5* | *Folded into C8* |
| 18 | A7 — Document Template Version Manager | 🔵 A | 3, 6, 9 | 3 | 4 | 2 | 5 | 1 | **26.4** | **v1.0** |
| 19 | F6 — AI Voice Caller | 🟢 F | 2 | 4 | 4 | 4 | 3 | 2 | **25.6** | **v1.0** |
| 20 | M6 — Approved Policy Client Communication | 🟠 M | 9 | 3 | 3 | 2 | 5 | 4 | **25.2** | **v1.0** |
| 21 | C6 — Vulnerable Customer Detector | 🟣 C | 2, 4, 8 | 4 | 5 | 4 | 2 | 1 | **22** | **v1.0** |
| 22 | A6 — Smart Underwriting Tracker (deeper) | 🟠 M | 8 | 4 | 4 | 3 | 3 | 3 | **20.8** | **v1.1 (partial via M5 in v1.0)** |
| 23 | C7 — Audit-Ready File Search | 🟣 C | 9 | 3 | 4 | 3 | 4 | 1 | **19.8** | **v1.5** |
| 24 | C5 — Manager Coaching Dashboard | 🟣 C | 9 | 3 | 3 | 3 | 4 | 4 | **18.9** | **v1.5** |
| 25 | F4 — Calendar Integration + Routing | 🟢 F | 2 | 4 | 3 | 1 | 5 | 5 | **18** | **v1.0** |
| 26 | C3 — Advice Quality Scorer | 🟣 C | 6 | 4 | 4 | 4 | 2 | 1 | **17.6** | **v1.1** |
| 27 | B4 — Cross-Sell Campaigns | 🟫 B | post-9 | 4 | 3 | 2 | 4 | 3 | **15.6** | **v2.0** |
| 28 | B1 — Lapse Risk Alerts | 🟫 B | post-9 | 4 | 3 | 3 | 3 | 2 | **14.4** | **v2.0** |
| 29 | B3 — Coverage Gap Finder | 🟫 B | post-9 | 4 | 3 | 3 | 3 | 2 | **14.4** | **v2.0** |
| 30 | F5 — Lead Nurture Automation | 🟢 F | 1 | 3 | 3 | 2 | 4 | 2 | **10.8** | **Phase 2** |
| 31 | F3 — Indicative Quote Engine | 🟢 F | 5 | 4 | 3 | 3 | 2 | 1 | **9.9** | **Phase 2** |
| 32 | B5 — Trail-Book Health Dashboard | 🟫 B | post-9 | 3 | 2 | 2 | 4 | 1 | **6.6** | **Park** |
| 33 | B6 — Client Onboarding Pack | 🟫 B | 9 | 2 | 3 | 2 | 4 | 1 | **6.6** | **Park** |
| 34 | B2 — Annual Review Automation | 🟫 B | post-9 | 3 | 2 | 2 | 3 | 1 | **4.4** | **Park** |

### Distribution by Branch (v1.0 build set)

The v1.0 cut: **4 FE Sales features** (F1, F2, F4, F6), **4 Adviser Co-pilot features** (A2, A3-Stub, A4, A7), **4 Call & Compliance features** (C1, C4, C6, C8), **6 Admin Co-pilot features** (M1, M2, M3, M4, M5, M6) — totalling **18 features**. This matches where the workflow doc said the pain lives: Adviser Co-pilot (Stages 4–6, 60% of total adviser time) and Admin Co-pilot (Stages 7–9, the entire post-DocuSign back-office workflow).

---

## What This Tells Us About v1.0

**Three observations.**

**(a) The v1.0 build set is workflow-shaped, not branch-shaped.** Every Stage 4–9 problem (the core advised-sale workflow plus admin processing) gets at least one v1.0 feature attacking it. The FE Sales pillar contributes the lead-capture wedge (F1, F2) plus the voice channel (F6). The Adviser Co-pilot pillar attacks the live-call burn (A2, A4). The Call & Compliance pillar provides the compliance scaffolding (C1, C4, C6, C8). The new Admin Co-pilot pillar (M-series) productises the LowQuotes-derived back-office workflow that previously fell to A5+A6+admin spreadsheets. The B-series is deliberately deferred — Phase 1 ICP firms haven't built up a back-book big enough for B-series features to compound yet.

**(b) The biggest moat plays are also the hardest to build.** C8 (Moat 5), M2 (Moat 4), C6 (Moat 4), A2 (Moat 4), A4 (Moat 4), C4 (Moat 4) — the features that defend the position once shipped are the same features that take real engineering effort. C8 in particular (Moat 5, Ease 1) is the single hardest feature in v1.0, and it ships imperfect by design — it improves over months as we collect real-call data. **The build sequence has to balance shipping value fast (using F1, F2, M1, M3, A7, F4 — high Progress, high Ease) with shipping moat features steadily (C8, A2, A4, C4, M2, C6) so the platform doesn't get commoditised in months 4–8 of the build.**

**(c) The M-series productisation is the highest-leverage strategic choice in v1.0.** Original plan: build A5 (full RPA portal auto-fill, Score 27.5) + A6 (deep UW tracker, Score 20.8). New plan: productise the LowQuotes admin module as M1–M6 (combined effective score: ~33-52 across six features, with M2 alone scoring 52). The M-series replaces fragile RPA with resilient guided manual processing, adds AI cross-verification (M2 — the second-highest-scoring feature in v1.0), and ships substantially of pre-built infrastructure. This is the call where Ivy v1.0 stops being "another adviser AI tool" and becomes "the AI workflow OS for protection brokers" — covering Stages 1-9 end-to-end where competitors cover only Stages 1-6.

---

## Glossary

| Term | What it actually is |
|---|---|
| **v1.0** | The recommended initial Ivy SaaS build set — 18 features scoring 18+ on composite, distributed across 4 pillars |
| **v1.1** | Next-tier features to add 3–6 months after v1.0 launch — A1, A3-Lite, C3, configurable workflow engine, deeper UnderwriteMe |
| **v1.5** | Mid-cycle features — C5, C7, deeper analytics |
| **v2.0** | Adjacent segment expansion + B-series Back-End Sales activation |
| **Phase 2 / Park** | Features deprioritised — score below 12, or out of Phase 1 ICP scope |
| **Branch** | Internal product structure — 🟢 FE Sales / 🔵 Adviser Co-pilot / 🟣 Call & Compliance / 🟠 Admin Co-pilot / 🟫 Back-End Sales |
| **Composite score** | (ROI × Severity × Moat) ÷ (6 − Ease) × (1 + Progress÷10) |
| **F-series, A-series, C-series, M-series, B-series** | Feature codes by branch |

---

*Input for the Ivy v1.0 Roadmap document — next in sequence.*
