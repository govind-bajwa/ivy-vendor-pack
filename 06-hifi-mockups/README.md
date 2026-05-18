# 06 · High-fidelity mockups (visual reference)

What the product should look like when shipped. Eight of the fifteen priority screens are done at high fidelity; the remaining seven are visually inferable from the completed siblings.

## How to view

- **Live HTML** — open [`index.html`](index.html) in any browser
- **PNG screenshots** — in [`screenshots/`](screenshots/)

## Completed high-fidelity screens

`adv-01-today.html` · `adv-02-leads.html` · `adv-05-case-detail.html` · `adv-07-factfind.html` · `adv-11-suitability.html` · `adv-14-compliance-file.html` · `adm-01-kanban.html` · `ops-01-dashboard.html`

For the remaining screens (`adv-03`, `adv-13`, `adm-02`, the four `cop-*` screens), use the wireframes plus the visual direction set by the completed mockups. A final design polish round will happen during build.

## Resolution rules

When wireframe and high-fidelity mockup diverge for the same screen:

- **High-fidelity wins** on visual style (colour, typography, spacing, motion, micro-interactions)
- **Wireframe wins** on layout and behaviour (where things go, what triggers what)
- **Design system wins** if a mockup and the tokens disagree

All visual style ultimately resolves to [`../07-design-system/ivy-tokens.css`](../07-design-system/ivy-tokens.css).
