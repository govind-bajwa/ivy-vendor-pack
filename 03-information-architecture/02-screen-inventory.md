# Ivy v1.0 — Screen Inventory

> **Status:** v0.1 · 2026-05-10
> **Companion:** [`sitemap.md`](sitemap.md) · per-screen briefs in `screens/`

Every screen in v1.0. **12 P0 screens** are designed in detail (5 with full briefs, 7 drawn directly from sitemap + design system + workflow doc). P1/P2 listed; drawn later.

---

## Priority key

- **P0** — round-1 mockup (12 screens)
- **P1** — round-2 (drawn after P0 review)
- **P2** — listed only; drawn when needed

---

## All screens

### Adviser Surface (Sarah)

| ID | Screen | URL | Features served | Priority |
|---|---|---|---|:-:|
| ADV-01 | Today / Home | `/today` | F1 inbox preview · F4 today's appts · A4 queue · X6 alerts | **P0** |
| ADV-02 | Lead Inbox (list) | `/leads` | F1 + F2 + lead score · vulnerability flags | **P0** |
| ADV-03 | Lead Detail | `/leads/:id` | F1 enrichment · F2/F6 conversation log · F4 booking widget · C6 vuln check | **P0** |
| ADV-04 | Cases (list) | `/cases` | sortable case list, all stages | P1 |
| ADV-05 | **Case Detail · Customer Card · Overview** | `/cases/:id` | central canvas projecting all v1.0 features | **P0** |
| ADV-06 | Case · Pre-FactFind | `/cases/:id/disclosure` | A7 templates, e-sig status, doc checklist | P1 |
| ADV-07 | **Case · Live FactFind** | `/cases/:id/factfind` | A2 live capture · C1 recording · C8 Ivy Live sidebar · C6 vuln | **P0** |
| ADV-08 | Case · FactFind Review (post-call, static) | `/cases/:id/factfind/review` | A2 review + edit | P1 |
| ADV-09 | Case · Quote Inputs | `/cases/:id/quote/inputs` | A3-Stub paste-ready package | P1 |
| ADV-10 | Case · Quote Results | `/cases/:id/quote/results` | quote shortlist, KFIs | P1 |
| ADV-11 | **Case · Suitability Letter Draft** | `/cases/:id/suitability` | A4 editor · traceability tags · score panel · A7 template | **P0** |
| ADV-12 | Case · Application Bundle | `/cases/:id/application` | M1 ingested docs · M2 verify report | P1 |
| ADV-13 | **Case · UW Tracker** | `/cases/:id/uw` | A6/M5 timeline · status state machine | **P0** |
| ADV-14 | **Case · Compliance File** | `/cases/:id/compliance` | C4 11-doc index · M6 client comms · scores | **P0** |
| ADV-15 | Case · Calls | `/cases/:id/calls` | C1 recordings + transcripts | P1 |
| ADV-16 | Pipeline (Sarah's own) | `/pipeline` | own-cases pipeline | P1 |
| ADV-17 | Compliance Queue (own) | `/compliance` | own A4 score + queue | P2 |
| ADV-18 | Reports (adviser-level) | `/reports` | own metrics | P2 |

### Admin Surface (Niamh)

| ID | Screen | URL | Features served | Priority |
|---|---|---|---|:-:|
| ADM-01 | **Admin Kanban** | `/kanban` | M3 4-lane board · M2 verify status on cards · M5 inbound classification | **P0** |
| ADM-02 | **Kanban Card Drawer** | `/kanban?case=:id` | M1 ingest · M2 cross-verify report · M4 portal step · M5 email log | **P0** |
| ADM-03 | Email Feed | `/email` | M5 classified inbound · actionable items | P1 |
| ADM-04 | Portal Guides | `/portals` | M4 per-insurer checklists | P1 |
| ADM-05 | Portal Submission Step | `/portals/:insurer` | M4 walkthrough | P1 |
| ADM-06 | Reports (admin-level) | `/admin/reports` | NIGO prevention, throughput | P2 |

### Operations Surface (Mark Reynolds)

| ID | Screen | URL | Features served | Priority |
|---|---|---|---|:-:|
| OPS-01 | **Operations Dashboard** | `/ops` | Pipeline funnel · capacity · compliance summary · Atlas-style Co-pilot | **P0** |
| OPS-02 | Pipeline (firm-wide) | `/ops/pipeline` | full firm pipeline drill-down | P1 |
| OPS-03 | Compliance (firm-wide) | `/ops/compliance` | firm vuln cases · M2 stats · audit-flagged | P1 |
| OPS-04 | Team Capacity (deep) | `/ops/team` | per-adviser load (lite — full C5 in v1.5) | P1 |
| OPS-05 | Reports | `/ops/reports` | firm MI | P2 |
| OPS-06 | Audit Log & Exports | `/ops/audit` | Consumer Duty board · CPC 2025 · FOS · DSAR | P2 |

### Settings (cross-cutting)

| ID | Screen | URL | Features served | Priority |
|---|---|---|---|:-:|
| SET-01 | Settings home + Profile | `/settings` | profile + index | P2 |
| SET-02 | Firm config | `/settings/firm` | firm details, jurisdiction profile | P2 |
| SET-03 | Users & Roles | `/settings/users` | user management · X1 · X2 | P2 |
| SET-04 | Template Library | `/settings/templates` | A7 | P1 |
| SET-05 | Integrations | `/settings/integrations` | CRM · calendar · e-sign · voice | P2 |
| SET-06 | Insurers + Credentials | `/settings/insurers` | insurer panel + creds | P2 |
| SET-07 | Routing | `/settings/routing` | F4 routing rules | P2 |
| SET-08 | Billing & Credits | `/settings/billing` | X4 | P1 |
| SET-09 | Notifications | `/settings/notifications` | X6 prefs | P2 |

### Onboarding & Auth

| ID | Screen | URL | Features served | Priority |
|---|---|---|---|:-:|
| ONB-01 | Onboarding Wizard (multi-step) | `/onboarding/*` | X1 first-run | P1 (stub welcome screen) |
| ONB-02 | Adviser Invite Landing | `/invite/:token` | X2 invite accept | P2 |
| AUTH-01 | Login | `/login` | auth | P2 (stubbed) |
| AUTH-02 | Magic / 2FA | `/magic` · `/login/2fa` | auth | P2 |

---

## The 12 P0 screens (round-1 mockup target)

| # | ID | Screen | Surface | Has full brief? |
|:-:|---|---|---|:-:|
| 1 | ADV-01 | Today / Home | Adviser | drawn from sitemap |
| 2 | ADV-02 | Lead Inbox | Adviser | drawn from sitemap |
| 3 | ADV-03 | Lead Detail | Adviser | drawn from sitemap |
| 4 | ADV-05 | Case Detail / Customer Card Overview | Adviser | ✅ [`screens/adv-05-case-detail.md`](screens/adv-05-case-detail.md) |
| 5 | ADV-07 | Live FactFind | Adviser | ✅ [`screens/adv-07-live-factfind.md`](screens/adv-07-live-factfind.md) |
| 6 | ADV-11 | Suitability Letter Draft | Adviser | ✅ [`screens/adv-11-suitability-draft.md`](screens/adv-11-suitability-draft.md) |
| 7 | ADV-13 | UW Tracker | Adviser | drawn from sitemap |
| 8 | ADV-14 | Compliance File | Adviser | drawn from sitemap |
| 9 | ADM-01 | Admin Kanban | Admin | ✅ [`screens/adm-01-admin-kanban.md`](screens/adm-01-admin-kanban.md) |
| 10 | ADM-02 | Kanban Card Drawer | Admin | covered inside ADM-01 brief |
| 11 | OPS-01 | Operations Dashboard | Operations | ✅ [`screens/ops-01-operations-dashboard.md`](screens/ops-01-operations-dashboard.md) |
| 12 | (chrome) | Sidebar + Top bar + Co-pilot widget | All | drawn from sitemap |

5 full briefs cover the 5 hardest screens. The other 7 P0 screens are drawn directly from the design system + sitemap + workflow doc + sample data.

---

## Sample-data anchor

Every screen uses the same sample data so the mockup tells one continuous story:

- **Firm:** Northchart Advisory · 8 advisers · 2 admins · 1 paraplanner · 1 part-time compliance · ~600 cases/year · UK + IE mix
- **Sample case (every drill-down):** Mark Roberts · 38 · Manchester graphic designer · £62k income · £245k mortgage · partner Sophie + 2 kids · brother bowel cancer · Vitality DTL+CI £42.80/mo
- **Other named cases (in lists/kanban):** Sarah Lee, James Wong, Tom Harris, Anna Klein, David Patel, Priya Shah, Murphy family, Walsh
- **Team members:** Sarah Bennett (adviser, primary) · James, Tom, Aiyana, Connor, Priya (other advisers) · Niamh, Aoife (admins) · Emma (paraplanner) · Daniel (compliance) · Mark Reynolds (principal)
- **Sample insurers:** Vitality, Aviva UK, Royal London UK, L&G, Royal London IE, New Ireland, Aviva IE, Zurich IE

---

*Per-screen briefs in [`screens/`](screens/).*
