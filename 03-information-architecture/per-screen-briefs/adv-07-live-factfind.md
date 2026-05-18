# ADV-07 — Live FactFind

> **Path:** `/cases/:id/factfind` *(during call)*
> **Surface:** Adviser · **Persona:** Sarah Bennett
> **Phase:** P0 — the headline screen
> **Features:** A2 · C1 · C8 · C6
> **Sample case:** Mark Roberts FactFind, Friday 14:00

---

## Goal

The single hardest screen in v1.0. While Sarah is on a Zoom FactFind call with Mark, this screen does three things at once:

1. **A2** captures the FactFind structurally from the live transcript. Sections fill in as Mark speaks. Sarah confirms rather than types.
2. **C8 (Ivy Live)** runs in a sidebar prompting probes, surfacing compliance gaps, raising vulnerability flags in real time.
3. **C1** captures the recording (already running in background; visible only as a status indicator).

After the call ends, the screen transitions to a static "FactFind Review" mode (ADV-08) where Sarah confirms what was captured.

---

## Entry context

- Sarah opens this screen at the start of her FactFind appointment with Mark
- Pre-call: F2 has already captured Mark's basics (name, age, mortgage, dependants) — those sections are pre-populated
- Just before clicking **Start FactFind**, Sarah confirms her camera + mic
- Co-pilot widget is collapsed bottom-right (Ivy Live takes priority during the call)

---

## Layout — three columns during the call

```
┌─────────────────────────────────────────────────────────────────────────┐
│  TOP BAR · Mark Roberts · FactFind in progress · 47:23 / ~90 min  [End]│
├──────────────────┬──────────────────────────────┬─────────────────────┤
│ TRANSCRIPT       │ FACTFIND (auto-populating)   │ IVY LIVE (sidebar)  │
│ (live, scrolls)  │                              │                     │
│                  │ ▸ § 1 Personal           ✓   │ ⚡ Probe            │
│ Sarah: …income?  │ ▸ § 2 Employment        ✓   │ Family hx of bowel  │
│ Mark: £62k gross │ ▸ § 3 Family            ✓   │ cancer — probe own  │
│ Sarah: SE 6yrs?  │ ▸ § 4 Existing cover    ✓   │ screening hx        │
│ Mark: yes        │ ▸ § 5 Health & lifestyle ●  │ [Ack] [Dismiss]     │
│ Sarah: SA302?    │   ‣ Smoker: stopped 4yr     │                     │
│ Mark: got it     │   ‣ Family hx               │ ⚠ Compliance gap    │
│ ⋮                │     · Brother bowel CA      │ Hazardous occupations│
│                  │   ‣ Personal hx: clean      │ section not asked   │
│                  │ ▸ § 6 Hazardous          ○  │ [Ack]               │
│                  │ ▸ § 7 Financial          ○  │                     │
│                  │ ▸ § 8 Risk attitude      ○  │ Vulnerability: none │
│                  │                              │ Coverage: 91/100    │
│                  │ Sections complete: 5/8       │                     │
│                  │ Confidence: 87%              │ (updated 2s ago)    │
└──────────────────┴──────────────────────────────┴─────────────────────┘
                                                              (Co-pilot)
                                                                  ┌──┐
                                                                  │💬│
                                                                  └──┘
```

Section status icons:
- ✓ green check = section complete with high confidence (>0.85)
- ● amber dot = in progress
- ○ open circle = not yet asked

### Left column — Transcript (live)
- Auto-scrolling transcript stream (latest at bottom, fades upward)
- Speaker labels (Sarah / Mark)
- 13px Inter, dense, tabular-nums on timestamps
- Click a transcript line → highlights the FactFind field that captured it (if any)
- Pause-on-hover (so Sarah can read past lines without losing live updates)

### Middle column — FactFind sections
- 8 sections collapsed by default; click to expand
- Each captured field shows: label · value · confidence indicator · transcript-link icon
- Hover field → tooltip preview of the source transcript moment
- Click field → jump to that moment in transcript + offers audio playback
- Inline edit on each field for in-call corrections

### Right column — Ivy Live sidebar
- Most recent prompt at top, fades older down
- Three prompt types:
  - **⚡ Probe** (emerald accent) — suggested next question
  - **⚠ Compliance gap** (warning red) — missed required section
  - **🛡 Vulnerability** (purple) — vuln indicator detected
- Each prompt has [Ack] / [Dismiss] (single-click)
- Acknowledged prompts log; dismissed prompts log too
- Coverage score updates live (top-right of sidebar)

### Top bar
- Client name + "FactFind in progress"
- Elapsed time + estimated total (tabular-nums)
- [Pause Recording] (rare — only if Mark needs a break)
- [End FactFind] (red; click to end + save)

---

## States to design

1. **In-call active** — main state above
2. **In-call · vulnerability flag raised** — sidebar shows prominent purple alert; required-acknowledge before dismiss
3. **In-call · low-confidence capture** — middle column highlights a field needing confirmation (amber border)
4. **Call paused** — recording icon turns amber; transcript stream pauses; A2 holds capture
5. **Call ending — save dialog** — modal: "Save FactFind? Review captured data first?"
6. **Post-call (ADV-08 transition)** — three-column collapses; transcript becomes a collapsible reference rail; review pane takes more space

---

## Interactions

- **Live transcript:** auto-scroll with pause-on-hover
- **Field correction:** click field → inline edit; Esc cancel, Enter save
- **Ivy Live ack:** single click; logged with timestamp + adviser ID
- **Vulnerability flag:** requires explicit acknowledgement before [Dismiss] appears
- **End FactFind:** confirmation dialog with checklist (all required sections complete? recording saved? Co-pilot will draft post-call summary)

---

## Mock data shape

```js
{
  case: {
    id: "MR-2026-08914",
    clientName: "Mark Roberts",
    appointmentTime: "Friday 14:00",
    elapsed: "47:23",
    estimatedTotal: "~90 min"
  },
  transcript: [
    { speaker: "sarah", t: "47:18", text: "...and your income then?" },
    { speaker: "mark",  t: "47:22", text: "£62k last year, gross." },
    { speaker: "sarah", t: "47:26", text: "Self-employed?" },
    { speaker: "mark",  t: "47:28", text: "Yeah, 6 years now." },
    // ... live appended
  ],
  factfind: {
    section1_personal:    { status: "complete",    confidence: 0.95 },
    section2_employment:  { status: "complete",    confidence: 0.92 },
    section3_family:      { status: "complete",    confidence: 0.94 },
    section4_existing:    { status: "complete",    confidence: 0.88 },
    section5_health: {
      status: "in_progress", confidence: 0.78,
      fields: [
        { label: "Smoker status", value: "Stopped 4yr ago",            confidence: 0.92, t: "23:14" },
        { label: "Family hx",     value: "Brother · bowel CA · age 45", confidence: 0.88, t: "25:03" },
        { label: "Personal hx",   value: "Clean — no disclosures",      confidence: 0.81, t: "32:50" }
      ]
    },
    section6_hazardous:   { status: "not_started", confidence: 0 },
    section7_financial:   { status: "not_started", confidence: 0 },
    section8_risk:        { status: "not_started", confidence: 0 }
  },
  ivy_live: {
    prompts: [
      { id: 1, type: "probe",          text: "Family history of bowel cancer — probe own screening hx",      t: "25:21", ack: false },
      { id: 2, type: "compliance_gap", text: "Hazardous occupations section not yet asked",                  t: "47:00", ack: false }
    ],
    coverage_score: 91,
    vulnerability: "none",
    lastUpdate: "2s ago"
  }
}
```

---

## Voice / copy

Per design system:
- Plain English: *"Family history of bowel cancer — probe own screening hx"* not *"PROBE: family medical history vector"*
- Specific: *"47:23 / ~90 min"* not *"Recording in progress"*
- All times use tabular-nums
- No emoji in body copy; iconography is restricted to the small status glyphs (✓ ● ○) and the prompt-type accents (⚡ ⚠ 🛡)

---

## Design system anchor

- Page wrap: `--canvas`
- Three column backgrounds: `--paper` with `--hair` borders between
- Ivy Live sidebar: `.glass` for subtle separation
- Probe prompt accent: `--ivy-primary-bright`
- Compliance-gap accent: `--stage-lost-fg`
- Vulnerability accent: a purple from existing palette (or extend tokens — propose `--vuln-fg: #7c3aed`)
- Field confidence dot: green `--ivy-700` / amber `--stage-quoted-fg` / red `--stage-lost-fg`
- Recording status indicator: emerald dot when live, amber when paused

---

## Open decisions

1. Transcript auto-scroll on by default? **Default: on.**
2. Acknowledged Ivy Live prompts disappear or stay struck-through? **Default: stay visible struck-through (audit trail).**
3. If Sarah steps away, recording continues? **Default: yes — recording continues; A2 catches up on resume.**
4. Vulnerability prompt: blocking modal or inline sidebar (current design)? **Default: inline sidebar with required-ack.**

---

*This is the headline screen. Spend the most polish here.*
