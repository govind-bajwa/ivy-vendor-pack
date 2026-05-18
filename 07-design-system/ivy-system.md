# Ivy Design System

> The visual + editorial system for Ivy — a 24/7 AI sales agent for life & protection brokers.
> v0.2 · May 2026

When designing **anything** for Ivy (deck, prototype, mock, marketing page, dashboard, email), follow this document.

---

## Files in this system

| File | Purpose |
|---|---|
| `ivy-tokens.css` | Source of truth — colors, type, spacing, radii, shadows. **Link this from every Ivy HTML file.** |
| `ivy-components.html` | Copy-paste component kit. Reference these patterns rather than re-inventing them. |
| `Ivy Design System v2.html` | The full visual showcase (the "manual"). |
| `CLAUDE.md` | Same content as this file, auto-loaded by Claude. |

---

## Brand essence

**Calm, factual, trustworthy.** Ivy is regulated-industry software (FCA / CBI brokers). Every choice — color, weight, density — should make brokers feel *in control* and clients feel *informed*. Avoid AI-slop tropes: no aggressive gradients, no purple→pink washes, no chunky emoji, no SVG illustrations of robots/sparkles.

---

## Color

- **Brand emerald** is `#10B981`. Use it for primary action, brand mark, live agent status.
- **Punchier emerald** `#059669` is the *typographic* emerald — italic display `<em>`, headline highlights. Has more presence than `--ivy-700`.
- **Forest** `#064E3B` for text-on-emerald and the very deepest brand voice.
- **Canvas** `#F5F3EE` is the warm wash page color. Never use pure white as a page background.
- **Pipeline stage colors are semantic.** New / Qualified / Quoted / Booked / Converted / Lost each have a dedicated swatch. Never reuse them for unrelated UI.

**Do:** `var(--ivy-primary)`, `var(--ivy-primary-bright)`, `var(--canvas)`.
**Don't:** invent new greens, use saturated cyan/teal, use emerald for non-brand decoration.

---

## Type

**Inter only.** Weights 400 / 450 / 500 / 600 / 700 + italic 400 / 500 / 600.

- **No JetBrains Mono.** Numbers use Inter with `font-variant-numeric: tabular-nums` and feature settings `"tnum","cv11","ss01"`. The `.mono` / `.num` classes apply this.
- **Density floor: 13px.** Body text is 13–15px. Mono labels can drop to 10–11px in uppercase.
- **Display uses Inter 500–600 with tight tracking** (-0.04 to -0.05em). Italic emerald `<em>` is the signature emphasis treatment.
- Avoid Fraunces or any serif. The earlier hero used Fraunces — it was wrong. Inter alone carries the system.

---

## Surfaces

Two surfaces only:

1. **Solid** — `--paper` (#fff) or `--canvas` (#f5f3ee).
2. **Glass** — `.glass` / `.glass-elevated`. Translucent white with backdrop blur and a warm-tinted shadow.

Glass is for floating elements (Ivy widget, stat tiles, lead cards). Don't use it for full-page backgrounds.

---

## Atmosphere (heroes / cover sections)

The `.atmosphere` utility adds the signature emerald wash + faint 32px grid (radial-masked). Use on hero sections only. Never combine with extra blob `::after` pseudos — that was the AI-slop direction; we removed it.

---

## Voice

- **Plain English.** "Niamh's quote expires Friday." not "Action required: lead status update."
- **Specific.** Use real names, real €/£ amounts, real dates. Lorem ipsum and "Lead 1 / Lead 2" make Ivy feel fake.
- **Short.** One sentence per message in the agent voice. The longer Ivy talks, the less broker-y she sounds.
- **No exclamation points.** No emoji. No "Hey there!" greetings.

---

## Numbers

All numerics use tabular-nums via Inter. Format examples:
- Currency: `€42,180` / `€2,450` / `€42k` (k for chart-context only).
- Percentages: `12.4%`, `−1.2%` (real minus sign, not hyphen).
- Counts: `128 leads`, `47 actions today`.

---

## Iconography

Lucide-style line icons, 1.75–2px stroke, 14–16px size in dense UI, 24px in headers. The Ivy mark itself is a **leaf** glyph — used as the brand mark only, not decoratively.

---

## Density & spacing

4px grid. Use the `--s-1`…`--s-20` spacing tokens. Card padding 14–18px for dense UI, 28–32px for editorial panels. Border-radius scales: `--r-sm` 6 → `--r-2xl` 22.

---

## Don't

- Don't use Fraunces / serifs / mono fonts (JetBrains, IBM Plex Mono).
- Don't use saturated cyan, purple, pink, gradient rainbows.
- Don't draw illustrations in SVG by hand. Use placeholders + monospace explainers.
- Don't use emoji.
- Don't stack glass on glass on glass — depth is one layer deep.
- Don't write generic AI/SaaS hero copy ("Supercharge your workflow", "AI-powered platform"). Ivy is specific to broker work.
- Don't introduce new colors without checking against the token file.

## Do

- Lift values directly from `ivy-tokens.css`.
- Match the editorial rhythm: numbered sections, frontispiece headers, mono eyebrows.
- Use real broker scenarios in mock copy (life cover, serious illness, quote expires, Aviva, Irish Life, etc.).
- When unsure, look at `Ivy Design System v2.html` and copy what's already there.

---

## Quick start (for any new HTML file)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="ivy-tokens.css" />
</head>
<body>
  <!-- you have access to: tokens, .glass, .glass-elevated, .display, .pill, .frontispiece, .atmosphere, .wrap -->
</body>
</html>
```
