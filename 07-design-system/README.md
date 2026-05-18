# 07 · Design system

The canonical visual and editorial system for Ivy. **Use these tokens directly in production code — don't reinvent.**

| File | Purpose |
|---|---|
| [ivy-system.md](ivy-system.md) | Brand essence, colour rules, type rules, voice, do / don't. Read once cover to cover. |
| [ivy-tokens.css](ivy-tokens.css) | Source of truth. Colours, type, spacing, radii, shadows. Import into the production build. |
| [ivy-components.html](ivy-components.html) | Copy-paste component patterns — buttons, pills, cards, forms, tables. |
| [Ivy Design System v2.html](Ivy%20Design%20System%20v2.html) | Full visual showcase — every token and component with examples. |

## Canonical values

| Token | Value | Use |
|---|---|---|
| `--ivy-primary` | `#10B981` | Brand emerald — primary action, brand mark |
| `--ivy-primary-bright` | `#059669` | Typographic emerald — italic display, highlights |
| `--canvas` | `#F5F3EE` | Page background — warm wash, **never pure white** |
| `--paper` | `#FFFFFF` | Card / panel surface only |
| Typeface | **Inter** only | Weights 400 / 450 / 500 / 600 / 700 plus italics |
| Density floor | 13px body · 10–11px monospace caps | |

## Voice (verbatim)

- **Plain English** — "Niamh's quote expires Friday" not "Action required: lead status update"
- **Specific** — real names, real € / £ amounts, real dates
- **Short** — one sentence per AI message
- **No exclamation points · no emoji · no "Hey there!" greetings**

## Don't

- No Fraunces, serifs, or monospace display fonts (JetBrains, IBM Plex)
- No saturated cyan, purple, pink, gradient rainbows
- No hand-drawn SVG illustrations
- No glass-on-glass-on-glass — depth is one layer deep
- No generic AI / SaaS hero copy
- No new colours without checking the token file
