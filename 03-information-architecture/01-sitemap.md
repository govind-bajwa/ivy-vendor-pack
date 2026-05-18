# Ivy v1.0 — Sitemap & Navigation Pattern

> **Status:** v0.1 · 2026-05-10
> **Companion:** [`00-foundation/ivy-l3-prd.md`](../00-foundation/ivy-l3-prd.md) · [`screen-inventory.md`](screen-inventory.md) · per-screen briefs in `screens/`

This doc decides: how the app is organised, what nav pattern we use, what URLs look like, how the Customer Card opens across surfaces, and how cross-cutting overlays (Co-pilot, Ivy Live) coexist.

---

## 1. Top-level navigation pattern

**Single sidebar, role-determined.** Plus persistent top bar and bottom-right Co-pilot widget. Ivy Live is an overlay that fires during calls only.

```
┌──────────────────────────────────────────────────────────────────────┐
│  TOP BAR                                                              │
│  [≡  Ivy · Adviser]   [Breadcrumb]      [Search]  [🔔 3]  [User ▾]   │
├────────────┬─────────────────────────────────────────────────────────┤
│  SIDEBAR   │  CONTENT AREA                                            │
│            │                                                           │
│  Today     │                                                           │
│  Leads     │                                                           │
│  Cases     │  (the active screen renders here)                        │
│  Clients   │                                                           │
│  Pipeline  │                                                           │
│  Compliance│                                                           │
│  Reports   │                                                           │
│  ────      │                                                           │
│  Settings  │                                                  ┌────┐  │
│            │                                                  │ 💬 │  │
│            │                                                  └────┘  │
└────────────┴──────────────────────────────────────────────────────────┘
```

Why sidebar (not top nav): regulated software, dense info, frequent switching between sections. Top nav doesn't scale past 6 items; sidebar does. Matches design-system tone (calm, factual).

The sidebar contents change per surface (role-determined). Top bar and Co-pilot are universal.

---

## 2. Three surfaces + Settings

### Adviser Surface — Sarah's home (role: adviser)
Sidebar:
- **Today** *(default home)*
- **Leads**
- **Cases**
- Clients
- Pipeline
- Compliance
- Reports
- ───
- Settings

### Admin Surface — Niamh's home (role: admin)
Sidebar:
- **Kanban** *(default home)*
- Email Feed
- Portal Guides
- Reports
- ───
- Settings

### Operations Surface — Mark Reynolds' home (role: principal / compliance)
Sidebar:
- **Dashboard** *(default home)*
- Pipeline
- Compliance
- Team
- Reports
- Audit Log
- ───
- Settings

### Settings (cross-cutting — visible from any surface)
Sub-nav within Settings:
- Profile
- Firm
- Users & Roles
- Templates *(A7)*
- Integrations
- Insurers
- Routing
- Billing & Credits *(X4)*
- Notifications

---

## 3. Surface switching (multi-role users)

Most users (Sarah, Niamh) have one role and one surface — no switcher visible.

Mark Reynolds (principal + compliance) has access to **Operations** *(default)* + can dip into **Adviser** or **Admin** views to see what his team sees. He gets a switcher in the top-left chrome:

```
[ ▾ Operations ]   ← click to switch surface
```

Single-role users see only their surface name there, no chevron.

---

## 4. URL conventions

Flat namespace, surface-prefixed only where needed for clarity:

| Surface | Pattern | Examples |
|---|---|---|
| **Adviser** | unprefixed | `/today` · `/leads` · `/leads/:id` · `/cases` · `/cases/:id` · `/cases/:id/factfind` · `/cases/:id/suitability` · `/cases/:id/uw` · `/cases/:id/compliance` · `/clients` · `/pipeline` · `/compliance` · `/reports` |
| **Admin** | (default `/kanban`) | `/kanban` · `/email` · `/portals` · `/portals/:insurer` · `/admin/reports` |
| **Operations** | `/ops` prefix | `/ops` · `/ops/pipeline` · `/ops/compliance` · `/ops/team` · `/ops/reports` · `/ops/audit` |
| **Settings** | `/settings` prefix | `/settings` · `/settings/templates` · `/settings/billing` · `/settings/users` |
| **Auth** | unprefixed | `/login` · `/magic` · `/forgot` · `/login/2fa` |
| **Onboarding** | `/onboarding` prefix | `/onboarding/welcome` · `/onboarding/connect-crm` · `/onboarding/done` |

Conflict avoided: "Admin" the surface lives at `/kanban` (not `/admin`) so it doesn't collide with `/settings` (sometimes called "admin" colloquially).

Root `/` redirects:
- adviser role → `/today`
- admin role → `/kanban`
- principal/compliance role → `/ops`

---

## 5. The Customer Card — how it opens across surfaces

The Customer Card is the central canonical object. Same data, different presentations.

| Entry context | Opens as | Why |
|---|---|---|
| Adviser surface — clicking a case from list, Today, or pipeline | **Full page** at `/cases/:id` | Adviser's primary canvas; needs full real estate for FactFind, Suitability editor, etc. |
| Admin surface — clicking a kanban card | **Right drawer** over kanban (520px wide) | Admin's primary canvas is the kanban; drawer keeps the lane context visible |
| Operations surface — clicking a row in pipeline | **Right drawer** over dashboard | Same logic — keeps firm-wide context visible |
| Co-pilot deep-link | **Full page** at `/cases/:id` regardless of surface | Linked URLs always go canonical |

Within the Customer Card (full page or drawer), tabs for the sections:
- **Overview** *(default)* — lead profile, score, case summary, recent activity
- **FactFind** — captured fields + transcript references (post-call view)
- **Quote** — inputs (A3-Stub) + results pasted-back
- **Suitability** — A4 draft + traceability + score
- **Application** — bundle + M2 verify report
- **UW** — timeline of M5 status changes
- **Calls** — recordings + transcripts (C1)
- **Compliance** — C4 file index

Drawer mode shows the same tabs but in a narrower layout (some panels stack vertically).

---

## 6. Cross-cutting overlays

These render over any screen.

| Overlay | When | Position | Notes |
|---|---|---|---|
| **Co-pilot widget** | Always (collapsible) | Bottom-right · 360px wide expanded · 56px collapsed | Persistent across all surfaces and routes |
| **Ivy Live sidebar** | During FactFind calls only | Right side · 320px wide · auto-dismisses on call end | Only on `/cases/:id/factfind` while call is active |
| **Notifications dropdown** | Click 🔔 in top bar | Top-right · 380px | X6; in-app notifications + email digest |
| **Cmd-K palette** | Cmd/Ctrl-K | Centered modal · 600px | Search across cases, clients, leads, screens |
| **Cross-team toast** | Co-pilot routes a ping | Top-right toast | Click toast → opens in Co-pilot widget |

Visual stacking (z-index):
- Page content: `z=0`
- Drawer (Customer Card): `z=20`
- Ivy Live sidebar: `z=30`
- Co-pilot widget: `z=40`
- Modals (Cmd-K, dialogs): `z=50`
- Toasts: `z=60`

**Co-pilot + Ivy Live coexistence:** when Ivy Live is up (active call), Co-pilot widget compresses to icon-only at bottom-right. After call ends, Co-pilot expands back to its prior state.

---

## 7. Mobile / responsive

v1.0 is **desktop-first**. The mockup is desktop-only (≥1280px). Mobile companion deferred.

A 1024px breakpoint should keep things usable but the FactFind screen (3-column) won't work below 1280px and falls back to stacked panels at narrower widths.

---

## 8. Onboarding flow (X1)

First-run for a new firm, fired after the firm admin account is created:

1. `/onboarding/welcome` — greeting, "what we'll set up" preview
2. `/onboarding/firm` — firm name, jurisdiction (UK / IE / both), Brokers Ireland or PIMFA registration
3. `/onboarding/connect-crm` — Plum / Acre / Plannr / intelliflo OAuth
4. `/onboarding/connect-calendar` — Outlook / Google OAuth
5. `/onboarding/insurers` — pick UK panel + IE panel from supported list
6. `/onboarding/templates` — upload IDD/ToB/Privacy/FactFind/Suitability templates → A7 indexes them
7. `/onboarding/invite-team` — invite first advisers + admins
8. `/onboarding/done` → redirects to `/today`

In v1.0 mockup: stub the first screen (`/onboarding/welcome`) only.

---

## 9. Auth

- `/login` — email + password OR magic link
- `/magic` — post-magic-link landing
- `/forgot` — password reset
- `/login/2fa` — 2FA challenge

Stubbed in mockup: simple `/login` screen drawn but flow not built out.

---

## 10. Decisions captured here (status)

- ✅ Sidebar (not top nav)
- ✅ Single sidebar, role-determined (not unified all-roles sidebar)
- ✅ Surface-switcher in top-left for multi-role users only
- ✅ Customer Card: full page on Adviser, drawer on Admin/Operations
- ✅ URL prefixing: only for `/ops` and `/settings`; Adviser surface unprefixed; Admin surface uses default `/kanban`
- ✅ Co-pilot widget bottom-right, persistent, 360px expanded
- ✅ Ivy Live overrides during calls only

## 11. Decisions deferred

- Mobile companion design
- Multi-firm tenant model (Phase 3 channel deals)
- White-label theming (post-v2.0)
- Search palette scope and ranking
- Notifications digest cadence

---

*See [`screen-inventory.md`](screen-inventory.md) for the screen-by-screen list.*
