# ADV-11 — Suitability Letter Draft

> **Path:** `/cases/:id/suitability`
> **Surface:** Adviser · **Persona:** Sarah Bennett (with Daniel review)
> **Phase:** P0
> **Features:** A4 · A7
> **Sample case:** Mark Roberts → Vitality DTL+CI £42.80/mo

---

## Goal

Sarah opens this screen on Sunday afternoon, ~30 seconds after clicking **Draft Suitability Letter** on the case detail. A4 has generated a 7-page suitability letter pulled from FactFind + quote shortlist + A7 template. Sarah's job: review, edit the judgement parts, send to Daniel for compliance.

The screen is two columns: **letter editor** (centre) + **traceability + score sidebar** (right).

---

## Entry context

- Sarah arrives from the case detail screen via "Draft Suitability Letter" CTA, OR directly via `/cases/:id/suitability`
- A4 generation happens before this screen renders; if she lands during generation, brief loading state (≤5s)
- A7 has selected the firm's currently-approved Suitability template version (e.g., v3.4)
- The Mark Roberts case has all upstream data: FactFind complete, quote shortlist saved (Vitality recommended; Royal London + Aviva alternatives)

---

## Layout — two columns

```
┌───────────────────────────────────────────────────────────────────────┐
│ TOP BAR · Mark Roberts · Suitability draft · A4 score 92  [Send to compliance]│
├──────────────────────────────────────────────┬────────────────────────┤
│ LETTER EDITOR (rich text)                    │ TRACEABILITY + SCORE   │
│                                              │                        │
│ # Suitability Letter — Mark Roberts          │ Score · 92 / 100       │
│ 13 May 2026 · Template A7 v3.4               │ ───────────────────    │
│                                              │ Sections                │
│ ## Your circumstances                        │  ✓ Circumstances    +5  │
│ You told us you're self-employed [FF§2.1],   │  ✓ Family hx        +6  │
│ aged 38, with your wife Sophie and two       │  ✓ Recommendation   +9  │
│ children [FF§3.1]. You recently remortgaged  │  ⚠ Rejected alts   −4  │
│ with £245k outstanding over 22 years         │  ✓ Risks            +5  │
│ [FF§7.2]. ...                                │  ✓ Affordability    +4  │
│                                              │                        │
│ ## Family medical history                    │ Compliance flags        │
│ You shared that your brother was recently    │  ⚠ Aviva rejection     │
│ diagnosed with bowel cancer at age 45        │    rationale thin       │
│ [FF§5.4]. We've taken this into account...   │    (line 184) [Jump]   │
│                                              │                        │
│ ## Recommended product                       │ Edits pending           │
│ Vitality decreasing-term life + accelerated  │  · Aviva rationale      │
│ CI [Q§1] · £42.80/month over 22 years...     │  · Family-history line  │
│                                              │  · Typo (line 92)       │
│ ## Why we did not recommend the alternatives │  · Mortgage timeline    │
│ ⚠ Royal London priced higher with similar    │                        │
│ cover [Q§2]. Aviva offered a 50% loading on  │ ───────────────────    │
│ family history alone [Q§3]...                │ Template               │
│                                              │  Suitability v3.4      │
│ ⋮ (4 more pages)                             │  (A7 · current)        │
│                                              │                        │
└──────────────────────────────────────────────┴────────────────────────┘
                                                              (Co-pilot)
```

### Centre column — Letter editor
- Rich-text editor (heading levels, bold, italic, lists). No tables in v1.0.
- **Traceability tags inline** — `[FF§2.1]`, `[Q§1]` rendered as small emerald pills inline; click → highlights the source FactFind field or quote source in a tooltip-popover (or jumps to source if user clicks again)
- Sticky top-of-page header showing template version + A4 generation timestamp
- Edits highlighted in mustard underline; original A4 text in plain ink
- Right-click any text → "Justify with FactFind reference" / "Mark as bespoke addition"

### Right sidebar — Traceability + Score
- A4 score (92/100) prominent at top; click → drawer with section-level breakdown
- Section-level scores listed; weak sections (under threshold) flagged with ⚠
- Compliance flags from A4's inline check (e.g., "Aviva rejection rationale thin")
- Edits pending (list of changes Sarah has made; numbered)
- Template version (A7 link) + status

---

## Top bar
- Client name + status ("Suitability draft")
- A4 score badge
- Actions: [Save draft] [Generate v2] [Compliance preview] **[Send to compliance]**

---

## States to design

1. **Just generated (default)** — clean A4 draft, no edits yet, score visible, flags listed
2. **In-edit** — Sarah is mid-typing; sidebar shows pending edits in real time
3. **Sent to compliance** — read-only mode; "Awaiting Daniel · sent 14:23" banner; sidebar shows compliance review state
4. **Returned with revisions** — banner: "Daniel returned with comments"; revisions inline in track-changes style
5. **Approved** — banner: "Daniel approved"; CTA changes to [Send to client via DocuSign]
6. **Loading (initial generation)** — skeleton with shimmering blocks, "Generating your draft… ~30s" message
7. **A4 regenerate** — modal: "Generate v2? Your edits will be preserved as track-changes."

---

## Interactions

- **Click traceability tag** `[FF§5.4]` → tooltip popover shows the FactFind field + transcript moment; click again → opens the source in a side panel
- **Inline edit** — standard rich-text behaviour; auto-save every 5s; offline buffer
- **Section scores** — click a section in the sidebar to scroll the editor to that section
- **Compliance flag** — click → jumps to the flagged line; line gets a brief pulse highlight
- **Send to compliance** — confirmation dialog: "Send to Daniel? Drafts under 80 typically take longer to clear; this scores 92."
- **Generate v2** — modal warning that edits become track-changes

---

## Mock data shape

```js
{
  case: { id: "MR-2026-08914", clientName: "Mark Roberts" },
  letter: {
    template: { id: "A7-suitability-v3.4", name: "Suitability v3.4", source: "A7" },
    generated: "2026-05-10T14:21:33Z",
    generationTimeSec: 28,
    score: { total: 92, sections: {
      circumstances: 95, familyHx: 96, recommendation: 94, rejected: 76, risks: 90, affordability: 91, complaints: 100
    }},
    sections: [
      { id: "circumstances", title: "Your circumstances and objectives", body: "You told us you're self-employed [FF§2.1]...", refs: ["FF§2.1","FF§3.1","FF§7.2","FF§8.1"] },
      { id: "familyHx", title: "Family medical history", body: "Your brother was recently diagnosed with bowel cancer at age 45 [FF§5.4]...", refs: ["FF§5.4"] },
      { id: "recommendation", title: "Recommended product: Vitality DTL + accelerated CI", body: "[Q§1] £42.80/month over 22 years...", refs: ["Q§1","FF§7.2"] },
      { id: "rejected", title: "Why we did not recommend the alternatives", body: "Royal London [Q§2]... Aviva [Q§3]...", refs: ["Q§2","Q§3"], flags: [{ line: 184, type: "thin_rationale", message: "Aviva rejection rationale thin" }] },
      // ...
    ],
    edits: [
      { line: 92,  type: "typo",      summary: "Fixed 'Vitalty' → 'Vitality'" },
      { line: 184, type: "rationale", summary: "Strengthened Aviva rejection rationale" },
      { line: 245, type: "bespoke",   summary: "Added: mortgage timeline → cover term link" },
      { line: 167, type: "phrasing",  summary: "Family-history sentence matches Mark's exact words" }
    ],
    status: "draft" // draft | in_review | revisions_requested | approved | sent_to_client
  }
}
```

---

## Voice / copy

- Letter body uses Northchart's existing voice (formal-but-warm; second-person addressing the client)
- Sidebar labels: plain English ("Edits pending", "Compliance flags", not "Modifications queue", "Lint warnings")
- Score: integer with /100 ("92 / 100")

---

## Design system anchor

- Page wrap: `--canvas`
- Editor surface: `--paper` with subtle `--hair` border
- Traceability pill: small emerald pill, `--ivy-50` bg with `--ivy-700` text
- Edits underline: amber (`--stage-quoted-fg`)
- Compliance flag pill: `.pill` with `--stage-lost-bg`/`--stage-lost-fg`
- Score circle: emerald ring, tabular-nums centre

---

## Open decisions

1. Inline traceability tags visible by default, or toggleable? **Default: visible (auditable feel).**
2. When Sarah generates v2 of the draft, do her existing edits survive? **Default: preserve as track-changes; warn explicitly.**
3. Does compliance reviewer (Daniel) see the same screen with edit access, or a read-only review screen with a comment lane? **Default: same screen with comment-only mode + "approve" button.**

---

*Second-most-polished screen after Live FactFind.*
