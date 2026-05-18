# ADM-01 — Admin Kanban (+ ADM-02 Card Drawer)

> **Path:** `/kanban` *(default home for admin role)* · drawer at `/kanban?case=:id`
> **Surface:** Admin · **Persona:** Niamh O'Reilly (administrator)
> **Phase:** P0
> **Features:** M3 · M2 · M5 · M1 · M4 · M6
> **Sample data:** ~14 cards across 4 lanes; Mark Roberts in "AI Verified Pending Review"

---

## Goal

Niamh's home screen. Visual 4-lane kanban that makes the back-office admin pipeline glanceable — no spreadsheet, no email triage. Cards transition automatically as M1, M2, M5 do their work; Niamh handles exceptions and approvals.

The kanban + the card drawer (ADM-02) together cover the entire admin's day.

---

## Entry context

- Niamh logs in (admin role) → redirects to `/kanban`
- Cards already populated from prior days; new cards arrive via M1 (DocuSign envelope completed)
- Top-of-page metrics: cards in flight, M2 NIGO prevention this week, M5 actions awaiting

---

## Layout

### Kanban (full-page)

```
┌──────────────────────────────────────────────────────────────────────┐
│ TOP BAR · Ivy · Admin · Niamh O'Reilly             [🔔 2]  [User ▾] │
├──────────────────────────────────────────────────────────────────────┤
│  Today · 18 cards in flight · M2 prevented 2 NIGOs this week         │
│                                                                       │
│  AI Verified      Not Matching     Portal           Sent to           │
│  Pending Review   ⚠ 3              Processing       Client            │
│  ──────── 14      ──────── 3       ────────── 8     ──────── 5        │
│                                                                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │ Mark Roberts │ │ Tom Harris   │ │ Anna Klein   │ │ Sarah Lee    │ │
│  │ Vitality UK  │ │ RL UK        │ │ Aviva UK     │ │ Vitality UK  │ │
│  │ £245k DTL+CI │ │ Address      │ │ Day 3 UW     │ │ Sent today   │ │
│  │ ✓ M2 green   │ │ mismatch     │ │ M5 watching  │ │ M6 drafted   │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │ Priya Shah   │ │ David Patel  │ │ Murphy fam.  │ │ Walsh        │ │
│  │ Vitality UK  │ │ L&G UK       │ │ RL IE        │ │ Aviva IE     │ │
│  │ £180k LIFE   │ │ Premium flag │ │ Day 6 ⚠      │ │ Sent today   │ │
│  │ ✓ M2 green   │ │ ping adviser │ │ chase needed │ │ — DD live 1J │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │
│  + 12 more         + 1 more         + 6 more         + 3 more        │
│                                                                       │
│  ─── Needs your attention ─────────────────────────────────────────   │
│   · Tom Harris  · M2 flagged address mismatch     [Ping Sarah]        │
│   · David Patel · M2 flagged premium delta        [Ping Sarah]        │
│   · Murphy fam. · 6 days in Portal Processing     [Chase RL IE]       │
│                                                                       │
│  [Kanban] [Email feed] [Portal guides] [Reports]                     │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
                                                              (Co-pilot)
```

Lane colors per design tokens:
- **AI Verified Pending Review** — neutral grey-ink lane header
- **Not Matching** — `--stage-lost-fg` icon (warning), neutral lane bg
- **Portal Processing** — `--stage-booked-fg` (in-flight blue tone)
- **Sent to Client** — `--stage-converted-fg` (emerald)

### Card detail drawer (ADM-02)

Click any card → 520px right drawer slides in. Drawer contains the **Customer Card in drawer mode** (per ADV-05) with the M-series specifics surfaced first.

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Mark Roberts · Vitality UK · AI Verified Pending Review  [×]  │
├─────────────────────────────────────────────────────────────────┤
│ [Open full]                                                      │
│                                                                  │
│  M1 ingested 5 documents from DocuSign envelope ABC-78901       │
│   ✓ Application form (12 pages, OCR clean)                      │
│   ✓ FactFind PDF                                                 │
│   ✓ Suitability letter v2 (signed)                              │
│   ✓ Direct Debit mandate                                         │
│   ✓ Beneficiary nomination                                       │
│                                                                  │
│  M2 cross-verification (all green ✓):                           │
│   ✓ Name: Mark John Roberts — matches across 4 docs             │
│   ✓ DOB: 14 Mar 1988 — matches                                  │
│   ✓ Address: 47 Broughton Lane, Manchester M6 4LP — matches     │
│   ✓ Premium: £42.80/month — matches application + suitability   │
│   ✓ Sum assured: £245,000                                        │
│   ✓ Term: 22 years                                               │
│   ✓ Beneficiary: Sophie Roberts (spouse)                        │
│   ✓ Bank: confirmed sort code + account                         │
│                                                                  │
│  Next action ─────────────────────────────────────────          │
│   Approve to move to Portal Processing                           │
│   Vitality submission checklist will load when you do           │
│                                                                  │
│  [Approve & move →]   [Flag issue]   [Open full]                │
└─────────────────────────────────────────────────────────────────┘
```

For a "Not Matching" card, the drawer surfaces the M2 flag with a diff view (FactFind says X, application says Y) + [Ping adviser via Co-pilot] CTA.

For a "Portal Processing" card, the drawer surfaces the M4 checklist + M5 inbound timeline.

For a "Sent to Client" card, the drawer surfaces the M6 sent comms + DD start date.

---

## States to design

1. **Default kanban** — main state above
2. **Empty kanban** — first-day state: "No cards yet — your first signed application will land here"
3. **Card hover** — subtle elevation (`--shadow-warm`); reveals "Open" hint
4. **Card being ingested** — skeleton card with shimmer ("M1 ingesting…")
5. **Drawer · M2 all green** — main state above
6. **Drawer · M2 mismatch** — diff visible with FactFind / application / suitability columns
7. **Drawer · M4 portal step** — checklist with current step highlighted
8. **Drawer · M5 inbound timeline** — chronological event log

---

## Interactions

- **Card drag** — drag card across lanes manually if needed (rare; M2/M5 normally auto-transition)
- **Card click** — opens drawer
- **Drawer "Open full"** — switches to full Customer Card at `/cases/:id`
- **Approve & move** — single click; card animates to next lane; toast "Mark Roberts moved to Portal Processing"
- **Ping adviser** — opens Co-pilot with a draft message pre-populated; one click to send
- **Filters** — top of kanban: filter by adviser, insurer, days-in-lane (chips)

---

## Mock data shape

```js
{
  metrics: {
    cardsInFlight: 18,
    nigosPreventedThisWeek: 2,
    cardsAwaitingNiamh: 14,
    cardsNotMatching: 3,
    cardsInPortal: 8,
    cardsSentToClient: 5
  },
  lanes: [
    {
      id: "ai_verified", label: "AI Verified Pending Review", count: 14,
      cards: [
        { id: "MR-2026-08914", client: "Mark Roberts", insurer: "Vitality UK", product: "£245k DTL+CI", flag: "m2_green" },
        { id: "PS-2026-08915", client: "Priya Shah",   insurer: "Vitality UK", product: "£180k LIFE",   flag: "m2_green" },
        // ...
      ]
    },
    {
      id: "not_matching", label: "Not Matching", count: 3, warning: true,
      cards: [
        { id: "TH-2026-08901", client: "Tom Harris",  insurer: "RL UK",  product: "Address mismatch",  flag: "m2_address_mismatch", actor: "Sarah" },
        { id: "DP-2026-08905", client: "David Patel", insurer: "L&G UK", product: "Premium delta flag", flag: "m2_premium_delta",   actor: "Sarah" }
      ]
    },
    {
      id: "portal_processing", label: "Portal Processing", count: 8,
      cards: [
        { id: "AK-2026-08820", client: "Anna Klein",  insurer: "Aviva UK", product: "Day 3 UW", flag: "m5_watching" },
        { id: "MF-2026-08750", client: "Murphy family", insurer: "RL IE", product: "Day 6 — chase needed", flag: "m5_overdue" }
      ]
    },
    {
      id: "sent_to_client", label: "Sent to Client", count: 5,
      cards: [
        { id: "SL-2026-08699", client: "Sarah Lee", insurer: "Vitality UK", product: "Sent today",   flag: "m6_sent" },
        { id: "WM-2026-08700", client: "Walsh",     insurer: "Aviva IE",   product: "DD live 1 Jun", flag: "m6_dd_set" }
      ]
    }
  ],
  needsAttention: [
    { caseId: "TH-2026-08901", text: "Tom Harris · M2 flagged address mismatch", action: { label: "Ping Sarah", type: "copilot_ping" } },
    { caseId: "DP-2026-08905", text: "David Patel · M2 flagged premium delta",   action: { label: "Ping Sarah", type: "copilot_ping" } },
    { caseId: "MF-2026-08750", text: "Murphy family · 6 days in Portal Processing", action: { label: "Chase RL IE", type: "draft_chase" } }
  ]
}
```

---

## Voice / copy

- Lane labels exactly as used in workflow doc — "AI Verified Pending Review", "Not Matching", "Portal Processing", "Sent to Client"
- Card body line 1: insurer name. Line 2: product summary. Line 3: status flag in plain English ("Address mismatch", "Day 3 UW", "Sent today", "DD live 1 Jun")
- "Needs your attention" panel uses imperative tone for the action ("Ping Sarah", "Chase RL IE")

---

## Design system anchor

- Page wrap: `--canvas`
- Lane background: `--canvas-2`
- Card surface: `--paper` with `--hair-2` border, `--shadow-warm-sm`
- Card hover: lift to `--shadow-warm`
- Status flag pill on card: `.pill` with stage-color tokens (green for `m2_green`, red for `m2_*_mismatch`, blue for `m5_*`, emerald for `m6_*`)
- Drawer container: `.glass-elevated`
- "Needs your attention" surface: `.glass` strip across bottom

---

## Open decisions

1. Card drag is allowed or kanban is auto-only? **Default: drag allowed but logged; card returns to its computed lane if move is "wrong" per M2/M5 state.**
2. Lane count limits / WIP limits? **Default: no limits — admin team handles ramp organically.**
3. Card timestamp visible? **Default: relative ("Day 3", "today") — absolute timestamps in drawer.**
4. Cards across both UK and IE clients in same kanban? **Default: yes — single kanban; admins handle both jurisdictions.**

---

*The most "lived-in" feeling screen — sample data needs to feel like a real working day.*
