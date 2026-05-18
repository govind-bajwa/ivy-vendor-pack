# OPS-01 — Operations Dashboard

> **Path:** `/ops` *(default home for principal / compliance role)*
> **Surface:** Operations · **Persona:** Mark Reynolds (principal + compliance lead)
> **Phase:** P0
> **Features:** firm-wide views over F1, M2, M5, C4, C6 + Atlas-style Co-pilot
> **Sample data:** Northchart Advisory week of 12 May 2026

---

## Goal

Mark Reynolds' home screen. Tells him on Monday morning what to worry about this week. Drill from any summary into actionable case detail in ≤2 clicks.

This is the **buyer's screen** — what gets demoed in sales calls. It must feel calm, in-control, and informationally complete without being noisy. Per design system: regulated-software, calm-factual.

**Constraint:** C5 (Manager Coaching Dashboard — adviser drift detection, training-need surfacing) is deferred to v1.5. So this screen ships in v1.0 without the deepest analytics. Design accordingly: don't promise what isn't built.

---

## Entry context

- Mark logs in (principal role) → redirects to `/ops`
- Sees current week's data; can navigate to prior weeks via top-bar control
- Most of his interaction is reading + Co-pilot Atlas-style queries

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│ TOP BAR · Ivy · Operations · Mark Reynolds          [🔔 1]  [User ▾] │
├──────────────────────────────────────────────────────────────────────┤
│  Northchart Advisory · Week of 12 May 2026                            │
│                                                                       │
│  ┌─ Pipeline this week ──────────────────────────────────────────┐   │
│  │  Captured     ████████████████████████████████████  47        │   │
│  │  Qualified    ████████████████████████████          38        │   │
│  │  Called       ████████████████████                  28        │   │
│  │  Drafted      ██████████████████                    22        │   │
│  │  Issued       ████████████                          18        │   │
│  │                                                                │   │
│  │  Pipeline value: £142k expected commission                     │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─ Compliance ──────────────────┐  ┌─ Team capacity ─────────────┐  │
│  │ Vulnerability cases     4 ✓   │  │ Sarah     ████████████ 92% ⚠│  │
│  │ Audit-flagged cases     0     │  │ James     ██████████   78%  │  │
│  │ Avg compliance file     98%   │  │ Tom       ███████████  88%  │  │
│  │ M2 NIGO prevention      12    │  │ Aiyana    ████████     65%  │  │
│  │ (saved ~30 case-days this wk) │  │ Connor    ██████████   81%  │  │
│  │                               │  │ Priya     ██████████   84%  │  │
│  │ [Open compliance →]           │  │ [Open team →]                │  │
│  └───────────────────────────────┘  └─────────────────────────────┘  │
│                                                                       │
│  ┌─ This week's attention items ─────────────────────────────────┐   │
│  │  · Sarah at 92% — at risk; rebalance considered                │   │
│  │  · Aiyana ramping (post-mat) — capacity climbing               │   │
│  │  · Murphy family case — 6 days in Portal Processing            │   │
│  │  · CPC 2025 evidence pack ready — Daniel signed off Mon        │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  [Pipeline] [Compliance] [Team] [Reports] [Audit]                    │
└──────────────────────────────────────────────────────────────────────┘
                                                  Co-pilot · Ask Ivy
                                                  ┌───────────────────┐
                                                  │ ▸ "Which adviser  │
                                                  │   has the highest │
                                                  │   conversion?"    │
                                                  │                   │
                                                  │ Sarah at 71%.     │
                                                  │ Team avg 58%.     │
                                                  │ Three drivers...  │
                                                  └───────────────────┘
```

### Sections

1. **Header** — firm name, current week, week selector
2. **Pipeline this week** — funnel from Captured to Issued; pipeline value beneath
3. **Compliance card** — vulnerability cases, audit-flagged, average compliance file score, M2 NIGO prevention count
4. **Team capacity card** — bar list per adviser with % load; at-risk flags (>90%)
5. **This week's attention items** — narrative bullet list of the 3-5 things Mark should know this morning
6. **Sub-nav strip** — Pipeline / Compliance / Team / Reports / Audit (drill-downs)

### Co-pilot in this surface — Atlas mode

The Co-pilot widget on Operations Surface defaults to **Atlas mode** — natural-language queries over firm data. Common asks:
- "Which adviser has the highest conversion this month?"
- "How many cases did Sarah close last quarter vs this quarter?"
- "Show me all loaded UW decisions this month"
- "What's our M2 NIGO prevention saving us in £?"

Responses include reasoning chains visible to the principal (so Mark trusts the answer).

---

## States to design

1. **Default (Monday morning)** — main state above
2. **Empty week** — first-week state: "Your firm's first week of data will appear here"
3. **Heavy attention week** — attention items list expands to 8+ items; Mark scrolls
4. **All-green week** — "No attention items this week — nice." (rare but should be designed)
5. **Compliance alert** — banner above pipeline: "1 audit-flagged case · review by EOW"
6. **Co-pilot expanded** — Atlas query result takes over the right side; pipeline + cards stay readable on left

---

## Interactions

- **Pipeline bar click** — drill into that stage's cases (e.g., click "Drafted: 22" → opens `/ops/pipeline?stage=drafted`)
- **Adviser bar click** — drill into that adviser's view (`/ops/team/sarah-bennett`)
- **Compliance / Team "Open →" buttons** — go to the dedicated drill-down screens
- **Attention item click** — opens the related case or screen
- **Co-pilot query** — type or click a suggested query; result renders in widget; expandable to full-screen for deeper analysis
- **Week selector** — top-right of header; defaults to current week; arrows for prev/next

---

## Mock data shape

```js
{
  firm: { name: "Northchart Advisory", week: "Week of 12 May 2026" },
  pipeline: {
    stages: [
      { id: "captured",  label: "Captured",  count: 47 },
      { id: "qualified", label: "Qualified", count: 38 },
      { id: "called",    label: "Called",    count: 28 },
      { id: "drafted",   label: "Drafted",   count: 22 },
      { id: "issued",    label: "Issued",    count: 18 }
    ],
    expectedCommission: "£142k"
  },
  compliance: {
    vulnerabilityCases: 4,
    audutFlagged: 0,
    avgFileScore: 98,
    nigoPreventionCount: 12,
    nigoSavingsDays: 30
  },
  team: [
    { id: "sarah",  name: "Sarah Bennett",   capacityPct: 92, status: "at_risk" },
    { id: "james",  name: "James Whittaker", capacityPct: 78 },
    { id: "tom",    name: "Tom",             capacityPct: 88 },
    { id: "aiyana", name: "Aiyana",          capacityPct: 65, status: "ramping_post_mat" },
    { id: "connor", name: "Connor",          capacityPct: 81 },
    { id: "priya",  name: "Priya",           capacityPct: 84 }
  ],
  attentionItems: [
    { type: "capacity_warning", text: "Sarah at 92% — at risk; rebalance considered", deeplink: "/ops/team/sarah" },
    { type: "ramp_status",      text: "Aiyana ramping (post-mat) — capacity climbing", deeplink: "/ops/team/aiyana" },
    { type: "case_overdue",     text: "Murphy family case — 6 days in Portal Processing", deeplink: "/cases/MF-2026-08750" },
    { type: "compliance_milestone", text: "CPC 2025 evidence pack ready — Daniel signed off Mon", deeplink: "/ops/compliance" }
  ],
  copilotSuggestedQueries: [
    "Which adviser has the highest conversion this month?",
    "How many cases did Sarah close last quarter vs this quarter?",
    "Show me all loaded UW decisions this month",
    "What's our M2 NIGO prevention saving us in £?"
  ]
}
```

---

## Voice / copy

- "This week's attention items" — list bullets in the narrative voice (specific, plain English: *"Sarah at 92% — at risk; rebalance considered"* not *"Adviser capacity threshold exceeded"*)
- Counts in tabular-nums
- Currency in tabular-nums (£142k for chart context, £42,180 for line items)
- Section labels: title case, light weight (Inter 500)

---

## Design system anchor

- Page wrap: `--canvas`
- Cards: `--paper` with `--hair-2` border, padded 28-32px (editorial density)
- Pipeline bars: solid emerald (`--ivy-primary`) with thinner trailing bars for context
- Capacity bars: emerald solid with a thin "at-risk" warning ring at 90%+
- Co-pilot widget on this surface: pre-expanded to Atlas mode by default
- Cards use `.glass-elevated` if Mark has Co-pilot expanded over them

---

## Open decisions

1. C5 features (adviser-drift detection, training surface) — show as a "coming in v1.5" placeholder card, or omit entirely? **Default: omit (don't promise what's not built); add when v1.5 lands.**
2. Default Co-pilot state on this surface — pre-expanded with suggested queries, or collapsed like other surfaces? **Default: pre-expanded with 4 suggested queries (Atlas mode).**
3. Pipeline funnel: this week vs rolling 4-week vs MoM? **Default: this week, with a small chip selector for prior weeks.**
4. Mark's view of compliance vs Daniel's view: same screen? **Default: same screen; Daniel sees additional drill-down link to his audit queue.**

---

*The buyer's screen. Calm-factual is the brief.*
