# 05 · Wireframes (low-fi, structural)

The fifteen priority wireframes that lock the structure of the product.

## How to view

- **Live HTML** — open [`index.html`](index.html) in any browser. Links every wireframe in workflow order, with a three-sentence narrative per screen.
- **PNG screenshots** — in [`screenshots/`](screenshots/). Used by the user-flows document for inline display.

## Structure principles

- One canonical case threads them together — **Mark Roberts**, an inbound lead that becomes a closed Vitality protection sale.
- Three role surfaces — `adv-*` for the adviser, `adm-*` for back-office admin, `ops-*` for the principal — plus the cross-cutting AI co-pilot (`cop-*`).
- One central data object — the customer case canvas (`adv-05`). Every other surface is a projection of it.
- Real broker copy throughout. No Lorem ipsum, no "Lead 1 / Lead 2".

## File map

| File | What it shows |
|---|---|
| `adv-01-today.html` | Adviser home (morning, today's view) |
| `adv-02-leads.html` | Lead inbox |
| `adv-03-lead-detail.html` | Lead detail · Mark Roberts |
| `adv-05-case-detail.html` | Customer case canvas (the central object) |
| `adv-07-factfind.html` | Live fact-find (during the call) |
| `adv-11-suitability.html` | Suitability letter editor |
| `adv-13-uw.html` | Underwriting tracking |
| `adv-14-compliance-file.html` | Compliance file viewer |
| `adm-01-kanban.html` | Admin kanban (back-office pipeline) |
| `adm-02-drawer.html` | Admin drawer (case detail in admin surface) |
| `ops-01-dashboard.html` | Operations dashboard (firm principal) |
| `cop-00-welcome.html` to `cop-03-widget.html` | Co-pilot — welcome, full-page, side panel, widget |

Use these wireframes for **layout and behaviour**. For visual style, look at the high-fidelity mockups in [`../06-hifi-mockups/`](../06-hifi-mockups/) and the design system in [`../07-design-system/`](../07-design-system/).
