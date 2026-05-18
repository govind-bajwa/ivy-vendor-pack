# ADV-05 — Case Detail / Customer Card · Overview

> **Path:** `/cases/:id` *(also opens as drawer on Admin/Operations surfaces)*
> **Surface:** Adviser primary; Admin/Operations as drawer
> **Persona:** Sarah Bennett (full page); Niamh / Mark Reynolds (drawer)
> **Phase:** P0 — the universal canvas pattern
> **Features:** projects all v1.0 features
> **Sample case:** Mark Roberts (full case spanning all stages)

---

## Goal

The Customer Card is the central canonical object. The Overview tab is the front door — at-a-glance summary of where the case is, who's working on it, what's next.

This screen is the **universal layout pattern** that has to work as:
- A full page on Adviser surface (1280px wide)
- A 520px right drawer on Admin/Operations surfaces (over the kanban / dashboard)

Same data, different presentations.

---

## Entry context

- **From Adviser:** clicking a case from list, Today, pipeline, search → full page
- **From Admin:** clicking a kanban card → 520px right drawer
- **From Operations:** clicking a pipeline row → 520px right drawer
- **From Co-pilot deep-link:** always full page

In the drawer mode, the user can click "open full" to switch to the full page (will switch surface if needed and they have permission).

---

## Layout

### Full-page mode (Adviser, 1280px+)

Three-row layout: header, primary panel, activity rail.

```
┌──────────────────────────────────────────────────────────────────────┐
│  HEADER                                                               │
│  Mark Roberts · 38 · Manchester    [Stage badge: UW · Day 7]         │
│  Vitality DTL+CI · £42.80/mo · £245k · 22yr                          │
│  Adviser: Sarah Bennett · Admin: Niamh · Source: Compare the Market  │
│  ────────────────────────────────────────────────────────────────    │
│  TABS · Overview · FactFind · Quote · Suitability · Application · UW │
│         · Calls · Compliance                                          │
├──────────────────────────────────────────────┬───────────────────────┤
│  PRIMARY PANEL (Overview content)            │  ACTIVITY RAIL        │
│                                              │                        │
│  ┌─ At a glance ────────────────────────┐    │  Day 7 · Vitality     │
│  │  Stage: UW · Awaiting GP report      │    │  email parsed by M5   │
│  │  Next event: GP report ETA Day 14    │    │  (Status: GP report)  │
│  │  Compliance: 96 (file ready) · ✓     │    │                        │
│  │  Vulnerability: none                 │    │  Day 6 · Mark signed  │
│  └──────────────────────────────────────┘    │  GP consent           │
│                                              │  (DocuSign envelope)  │
│  ┌─ Lead profile ───────────────────────┐    │                        │
│  │  Score: 8.4/10 · Source: CtM         │    │  Day 5 · Vitality     │
│  │  Trigger: brother bowel CA dx        │    │  requested GP report  │
│  │  Companies House: dir of XYZ Design  │    │                        │
│  │  Owner-occupier · Manchester M6      │    │  Day 1 · Application  │
│  └──────────────────────────────────────┘    │  submitted via M4     │
│                                              │  (M2: all green)      │
│  ┌─ Recommendation ─────────────────────┐    │                        │
│  │  Vitality DTL + accelerated CI       │    │  ⋮ (Suitability,      │
│  │  £42.80/mo · £245k · 22yr            │    │  FactFind, Lead       │
│  │  Standard rates accepted             │    │  capture …)           │
│  │  Loading: none                       │    │                        │
│  │  Sum assured matches mortgage term   │    │                        │
│  └──────────────────────────────────────┘    │                        │
│                                              │                        │
│  ┌─ FactFind summary ───────────────────┐    │                        │
│  │  Captured Friday 14:00 (Sarah)       │    │                        │
│  │  All 8 sections · confidence 94%     │    │                        │
│  │  Family hx: brother bowel CA age 45  │    │                        │
│  │  Health: stopped smoker 4yr · clean  │    │                        │
│  └──────────────────────────────────────┘    │                        │
│                                              │                        │
│  ┌─ Compliance file ────────────────────┐    │                        │
│  │  ● Auto-built · 11/11 docs           │    │                        │
│  │  Score: 96/100                       │    │                        │
│  │  Daniel approved · Mon 14:02         │    │                        │
│  │  Retention: 6yr (UK)                 │    │                        │
│  └──────────────────────────────────────┘    │                        │
│                                              │                        │
└──────────────────────────────────────────────┴───────────────────────┘
                                                              (Co-pilot)
```

### Drawer mode (Admin / Operations, 520px wide)

Same content, single column. Tabs along the top. "Open full" link in the drawer header takes the user to `/cases/:id` (full page). Activity rail collapses below the primary panel.

---

## Sections in primary panel (Overview tab)

1. **Header band** — name, age, location, stage badge, product summary, team
2. **At a glance** — stage, next event, compliance, vulnerability — one-card-per-fact
3. **Lead profile** — F1 score + enrichment + source + trigger
4. **Recommendation** — chosen product, premium, sum, term, UW outcome
5. **FactFind summary** — when, by whom, confidence, key findings
6. **Compliance file** — C4 status, score, sign-off

Plus the right activity rail (chronological event log, latest first).

---

## States to design

1. **Active case** — main state above (Mark Roberts at UW Day 7)
2. **Pre-FactFind case** — most sections empty/skeleton; "FactFind booked Friday" prominent
3. **On-risk / closed case** — green banner, indemnified commission status, retention clock
4. **Loaded UW decision** — amber banner; "Loading +25%" prominent; CTAs: accept / loop back to Stage 5
5. **Vulnerability flagged** — purple banner above primary panel
6. **Empty Mark Roberts case** (for new-case view) — shows "Pre-FactFind" state with appointment booked

---

## Interactions

- **Tab navigation** — click tab → loads tab content; URL updates (`/cases/:id/factfind`, `/cases/:id/suitability`, etc.)
- **Section card** — click any section → expands to a deeper view (FactFind summary → opens FactFind tab; recommendation → opens Quote tab)
- **Activity rail item** — click → jumps to relevant tab/screen with that event highlighted
- **Drawer mode "Open full"** — link in header switches to `/cases/:id` full page
- **Co-pilot context** — when this screen is open, Co-pilot proactively offers context-aware actions (e.g., "Draft client status update?", "Check Sarah's notes on this case?")

---

## Mock data shape

```js
{
  case: {
    id: "MR-2026-08914",
    client: { name: "Mark Roberts", age: 38, location: "Manchester M6", dob: "1988-03-14" },
    stage: { name: "Underwriting", subStage: "Awaiting GP report", day: 7 },
    nextEvent: { type: "GP report ETA", eta: "Day 14" },
    product: { insurer: "Vitality", name: "DTL + accelerated CI", premium: "£42.80/mo", cover: "£245k", term: "22yr", uwDecision: "standard" },
    team: { adviser: "Sarah Bennett", admin: "Niamh O'Reilly" },
    source: { channel: "Compare the Market", paid: "£18", scoreInitial: 8.4 },
    trigger: "Brother diagnosed with bowel cancer last month",
    enrichment: { companiesHouse: "Director · XYZ Design Ltd", residency: "Owner-occupier" },
    factfind: { capturedAt: "Friday 14:00", confidence: 0.94, sections: 8, completedSections: 8, keyFindings: [
      "Family hx: brother bowel CA age 45",
      "Health: stopped smoker 4yr · clean personal hx"
    ]},
    compliance: { fileStatus: "complete", score: 96, signOff: { by: "Daniel", at: "Mon 14:02" }, retention: "6yr UK" },
    vulnerability: "none"
  },
  activity: [
    { day: 7, type: "uw_email_parsed", summary: "Vitality medical evidence team — GP report status check", source: "M5" },
    { day: 6, type: "client_signed", summary: "Mark signed GP consent (DocuSign)", source: "DocuSign" },
    { day: 5, type: "uw_email_parsed", summary: "Vitality requested GP report", source: "M5" },
    { day: 1, type: "submitted", summary: "Application submitted via M4 · M2 all green", source: "M2 + M4" },
    { day: 0, type: "ff_done", summary: "FactFind completed (Sarah)", source: "A2" },
    // ...
  ]
}
```

---

## Voice / copy

- Section headings sentence-case, terse: "At a glance", "Lead profile", "Recommendation"
- Stage badge uses pipeline colors from tokens (UW → blue `--stage-booked-bg`/`--stage-booked-fg`)
- All currency: tabular-nums; specific (`£42.80/mo` not `~£43`)
- All ages, days, scores: tabular-nums

---

## Design system anchor

- Page wrap: `--canvas`
- Section cards: `--paper` with `--hair-2` border, subtle `--shadow-warm-sm`
- Activity rail items: 13px Inter, tabular-nums on day numbers
- Stage badge: `.pill` with stage-color tokens
- Drawer mode: `.glass-elevated` for the drawer container

---

## Open decisions

1. Section cards expandable in place, or click → switch tab? **Default: switch tab (cleaner).**
2. Activity rail filterable by source (M5, M2, A2, etc.)? **Default: yes — small filter chips at top of rail.**
3. Drawer mode: tabs along top, or compressed into a select? **Default: tabs along top, slightly tighter.**
4. Multiple in-flight cases per client (e.g., Mark Roberts also has a CI top-up next year): single Customer Card with multiple cases tab? **Default: defer — out of v1.0 scope. v1.0 = one client → one current case at a time.**

---

*The pattern here repeats inside every other tab (FactFind, Quote, Suitability, etc.).*
