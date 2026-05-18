# 🌿 Ivy Roadmap

What we're building, what's coming next, and what's on the horizon.

This roadmap works for both internal team alignment and prospect / customer conversations. It commits to themes and feature names — not dates.

---

## At a Glance

```
NOW          →   NEXT         →   LATER        →   LATER        →   BACKLOG
v1.0             v1.1             v1.2             v2.0             v3.0
─────────────    ─────────────    ─────────────    ─────────────    ─────────────
The AI           Closing the      Multi-channel    Adjacent         System of
workflow OS      application      intake +         segment          Record
for protection   loop +           analytics        expansion        graduation
brokers          workflow         depth
                 customisation                     Mortgage +       Optional ·
18 features                       PCW              Protection UK    long-horizon
4 pillars        Quote engine     integrations     Pensions /
UK + Ireland     deep-link        Deeper           Wealth Ireland
Stages 1–9       Configurable     analytics        BE Sales pillar
                 workflows        Atlas v2
                 UK insurer
                 expansion
```

| Horizon | Version | Theme | Trigger to advance |
|---|---|---|---|
| **Now** | v1.0 | The AI workflow OS for protection brokers | Ship + 50 paying customers |
| **Next** | v1.1 | Closing the application loop + workflow customisation | After v1.0 success criteria met |
| **Later** | v1.2 | Multi-channel intake at scale + analytics depth | After v1.1 ships |
| **Later** | v2.0 | Adjacent segment expansion (Mortgage+Protection, Pensions/Wealth) | Phase 1 beachhead dominated |
| **Backlog** | v3.0 | System of Record graduation (optional) | 150+ customers + customer signal + partnership constraints |

---

## NOW — v1.0: The AI workflow OS for protection brokers

**The theme.** Take a protection broker firm from receiving a lead through to issuing a policy — every stage assisted by AI, every adviser empowered, every admin task accelerated, every compliance requirement met automatically.

**The outcome.** Replace ~6.7 hours of manual work per case with ~3.4 hours of AI-assisted work. Sellable to UK and Ireland protection IFAs from launch. Counter-positioning narrative locked: carrier-neutral, AI-native, vertical-deep, adviser-first.

### What's in v1.0 — 18 features across 4 pillars

🟢 **FE Sales — Customer-facing intake**
- **F1** Omnichannel AI Lead Capture (with dynamic AI lead scoring + external data connectors)
- **F2** AI Conversational Qualifier
- **F4** Calendar Integration + Routing *(integrates with adviser's existing calendar — no Ivy calendar UI)*
- **F6** AI Voice Caller (built on Retell / Vapi)

🔵 **Adviser Co-pilot — Adviser-facing AI assist**
- **A2** Live FactFind from Call Recording
- **A3-Stub** Quote Inputs Generator *(structured paste-ready inputs; deep-link integration in v1.1)*
- **A4** AI Suitability Letter Draft
- **A7** Document Template Version Manager

🟣 **Call Analysis & Compliance**
- **C1** Call Recording Auto-Capture
- **C8** Live Adviser Copilot — Ivy Live *(real-time prompts during calls)*
- **C6** Vulnerable Customer Detector
- **C4** Auto-Built Compliance File

🟠 **Admin Co-pilot — Back-office productised module** *(productised from LowQuotes-derived system)*
- **M1** Document Ingestion *(DocuSign + alt e-sign + manual upload)*
- **M2** Cross-Document Verification
- **M3** Kanban Pipeline Management *(generic 4-stage flow)*
- **M4** Per-Insurer Portal Guidance *(IE + UK coverage at launch)*
- **M5** Insurer Email Integration
- **M6** Approved Policy Client Communication

### Cross-cutting AI surfaces in v1.0

- **Ivy Live** — real-time copilot during calls *(C8)*
- **Ivy Co-pilot** — bottom-right chat widget across all three user surfaces *(invoke / answer / proactively surface)*

### User surfaces in v1.0

- **Adviser Surface** — Today dashboard, customer cards, Ivy Live, Co-pilot
- **Admin Surface** — Kanban, portal guidance, Co-pilot
- **Operations Surface** — Dashboard, MI, Atlas-style queries

### Geography + insurer coverage at launch

- **United Kingdom:** L&G, Vitality, Aviva UK, Royal London UK + 1-2 more (demand-driven)
- **Ireland:** Royal London IE, New Ireland, Aviva IE, Zurich IE

### v1.0 success criteria (trigger to advance to v1.1)

- ✅ All 18 features shipped and in production
- ✅ 50+ paying customers (UK + IE protection IFAs)
- ✅ 14-day TTFV consistently achieved (>80% of new customers)
- ✅ At least 12 on-record customer case studies + 1 trade body endorsement (PIMFA, AMI, or Brokers Ireland)

---

## NEXT — v1.1: Closing the application loop + workflow customisation

**The theme.** Take Ivy from "great out of the box" to "configured exactly how your firm operates." Close the application loop with deep quote engine integration. Open the platform to firm-specific workflow customisation. Expand UK insurer coverage.

### What's coming in v1.1

🔵 **Adviser Co-pilot deepens**
- **A1** Pre-FactFind Disclosure Auto-Send — fully Ivy-native automation triggered on FactFind booking
- **A3-Lite** Quote Engine Deep-Link — direct API integrations *(sequenced: BIS first → SolutionBuilder → Iress)*
- **C3** Advice Quality Scorer — substantive recommendation review on top of A4's self-scoring

🟠 **Admin Co-pilot opens up**
- **Configurable workflow engine** — per-broker SOPs, multi-stage approvals, custom routing logic *(replaces v1.0's generic 4-stage kanban for firms that need LowQuotes-depth customisation)*
- **UK insurer expansion** — Scottish Widows, AIG, Aegon, LV=, Guardian, others on demand
- **Alternative e-sign deepening** — Adobe Sign, HelloSign as first-class triggers
- **Deeper UnderwriteMe partnership integration** — direct API where available, augmenting M5's email-based tracking

🟣 **Call & Compliance deepens**
- **C7** Audit-Ready File Search — search across the full archive *(originally scheduled v1.5; promoted to v1.1 if customer demand surfaces)*

### What v1.1 enables strategically

- Pricing tier expansion — workflow customisation justifies enterprise tier pricing
- Larger broker firms become addressable — currently practical at 10-adviser firms; v1.1 supports 20-50 adviser firms
- iPipeline partnership wedge — A3-Lite SolutionBuilder integration

### Trigger to start v1.1

All four v1.0 success criteria met. Build can run in parallel with late-stage v1.0 if engineering capacity allows.

---

## LATER — v1.2: Multi-channel intake at scale + analytics depth

**The theme.** Take Ivy from a tool that handles inbound leads to a tool that aggressively sources them. Add the analytics depth principals need to run sophisticated multi-adviser firms.

### What's themed for v1.2

🟢 **FE Sales scales up**
- **F3** Indicative Quote Engine — gives prospects a ballpark premium during the qualifier conversation
- **F5** Lead Nurture Automation — drip sequences for prospects who don't book first time
- **PCW deeper integrations** — direct handoffs from Compare the Market, MoneySupermarket, Confused.com (UK), Bonkers.ie, Switcher.ie (Ireland)

📊 **Operations Surface deepens**
- **C5** Manager Coaching Dashboard — surfaces patterns of adviser drift, training needs, vulnerability handling quality
- **Cross-customer benchmarking** — anonymised, aggregated, opt-in
- **Persistency analytics** — leveraging long-term policy data accumulated through v1.0 + v1.1
- **Atlas v2** — natural-language queries get deeper, including predictive ("which leads are most likely to convert?")

🟫 **Early Back-End Sales triggers**
- Renewal and cross-sell triggers *(early form of B-series — fires when a client's circumstances change in ways that affect their cover needs)*

### Trigger to start v1.2

v1.1 has shipped successfully · Operations Surface mature with 80%+ paying-firm dashboard usage · 100+ paying customers with 6+ months of data each.

**Discipline:** v1.2 features above are themed only. Specific feature scoping happens when v1.2 enters the Now horizon, based on what customers actually need at that point.

---

## LATER — v2.0: Adjacent segment expansion

**The theme.** Take Ivy from protection-IFA-only to multi-segment. Activate Phase 2 ICP segments and the Back-End Sales pillar.

### What's themed for v2.0

🟠 **Mortgage + Protection (UK)**
- Mortgage workflow modules — sourcing, application, completion tracking *(partnership with Twenty7Tec or Mortgage Brain for sourcing)*
- Multi-product-line firm support — one Ivy running mortgage + protection workflows simultaneously

💼 **Pensions / Wealth (Ireland)**
- COBS 9/9A-equivalent compliance schemas
- Drawdown rules, SIPP handling
- *Targeting Irish firms whose protection business expands into wealth — not a wealth-IFA-first product*

🟫 **B-series Back-End Sales activation**
- **B1** Lapse Risk Alerts
- **B2** Annual Review Automation
- **B3** Coverage Gap Finder
- **B4** Cross-Sell Campaigns
- *Activated for product lines with annual renewal cycles (PMI, group risk, pensions/wealth) — not relevant for protection-only firms*

### Trigger to start v2.0

Phase 1 beachhead fully dominated *(100+ customers across UK and IE protection IFAs)* · 30%+ of v1.1 customers ask "can I run my mortgage / wealth business in Ivy too?" · Strategic competitive landscape stable.

### What v2.0 explicitly does NOT do

- Pure wealth IFA play *(AdvisoryAI's territory — Ivy enters wealth in IE only because IE customers' protection business expands into wealth naturally)*
- Pure mortgage broker play *(Twenty7Tec, 360 Lifecycle territory — Ivy enters Mortgage+Protection because protection customers do mortgages)*

---

## BACKLOG — v3.0: System of Record graduation (optional)

**The theme.** Only happens if customer signal supports it AND partnership constraints with Plum / Acre / Plannr / intelliflo emerge. The default expectation is that this never happens — the layered partnership model is working in v1.0 and v1.1 and we don't want to break it.

### What it would mean

- Ivy becomes the standalone System of Record for client and policy data
- Customers can drop Plum / Acre / Plannr / intelliflo if they want single-product simplicity
- Long-term policy tracking (multi-year persistency, claims, surrenders) lives in Ivy
- Commission reconciliation, persistency reports, multi-adviser firm structure native

### Three triggers that must converge

All three required:
1. **150+ paying customers** with majority preferring single-product simplicity over the layered model
2. **Plum / Acre / Plannr / intelliflo become competitive constraints** — APIs degrade, partnership terms tighten, or they ship features that compete with Ivy directly
3. **Ivy's accumulated policy data is more valuable unified than synced** — cross-customer benchmarking, AI-driven renewal targeting, predictive analytics that need a unified data model

Until all three converge, v3.0 stays in the backlog. Force-functioning v3.0 prematurely destroys the layered partnership model that's working.

---

## What we're explicitly NOT building

For clarity — these are things customers and team sometimes ask about that we're explicitly not building, in any horizon.

| Not building | Why | What customers should use instead |
|---|---|---|
| **Quote engine** | iPipeline (SolutionBuilder), BIS, Iress have decades of carrier integrations. Category fratricide to compete. | Partner with SolutionBuilder (UK), BIS (IE), Iress (where used) — A3-Lite integrates directly in v1.1 |
| **Full RPA portal automation** | Maintenance nightmare; commodity work; better to guide humans through manual steps | M4 per-insurer guided checklists ship in v1.0 |
| **CRM / System of Record (in v1.0-v2.0)** | Plum, Acre, Plannr, intelliflo own this. Ivy is System of Intelligence on top. | Background SoR partnership — Ivy is the daily UI; CRM lives underneath |
| **Calendar UI** | Calendar is Commodity — Google Cal, Outlook do it brilliantly. No AI moat. | F4 integrates with adviser's existing calendar |
| **Wealth-IFA-only product** | AdvisoryAI's territory. Stay protection-deep until 100+ customers. | Refer wealth-only firms to AdvisoryAI; expect reciprocal protection referrals |
| **Pure mortgage broker product** | Twenty7Tec, 360 Lifecycle territory | Mortgage+Protection coverage in v2.0 — but not mortgage-broker-first |
| **US market** | iPipeline territory + completely different regulatory framework | UK + IE only for at least 3 years |
| **AI agent that sells autonomously (no adviser)** | Regulatory minefield + customer trust killer | F6 + C8 augment the adviser; not replace |
| **White-label / reseller programme** | Distracts from direct GTM in beachhead phase | Considered post-v2.0 if at all |

---

## How this roadmap is maintained

### Cadence

- **Quarterly review** — entire roadmap re-examined each quarter. Move items forward / backward / out of backlog as data demands.
- **Monthly check** — Now horizon (current build) reviewed monthly. Adjust scope if reality diverges.
- **Continuous backlog grooming** — backlog items can be added at any time. Prioritisation happens at quarterly review only.

### Decision-making authority

- **Now horizon** — scope locked. Changes require explicit founder + head of delivery sign-off.
- **Next horizon** — themes locked. Specific features can flex based on customer feedback.
- **Later horizons** — themes locked. Specific features deliberately undefined until horizon enters Now.
- **Backlog** — open to additions any time. Removals require justification.

### What gets re-examined quarterly

Three core questions every quarter:
1. **Has anything in the strategic landscape shifted?** (AdvisoryAI moves, iPipeline product releases, regulatory changes, AI capability breakthroughs)
2. **Is the current Now horizon on track?** (build progress, customer count, TTFV measurement)
3. **Are the trigger conditions for advancing horizons being met?**

If (1) shows a major shift, the roadmap may rewire significantly. If (2) is off track, scope adjusts. If (3) is being met, advance to next horizon.

---

## What would change this roadmap

Five triggers that would force a major rewrite:

1. **iPipeline ships an adviser-workflow AI product** — anything called "FactFind Assistant", "Adviser Copilot", "Suitability Generator." Counter-positioning thesis breaks. Possibly need to pull v1.1 features forward and accelerate iPipeline partnership conversation.

2. **A well-funded protection-vertical AI startup raises significant capital** — new entrant with money to attack the same niche. May force compression of v1.0 + v1.1 into a single faster ship.

3. **AdvisoryAI strategic move into protection** — they currently own wealth, deliberately avoid protection. If they pivot, defend Phase 1 aggressively. May force v1.2 / v2.0 themes to shift toward defending.

4. **Major regulatory change** — significant FCA Consumer Duty update, new IE CPC regulation, GDPR-related AI regulation. May force compliance-related features to accelerate.

5. **Strategic acquisition interest** — intelliflo, FNZ, iPipeline, or a PE-backed roll-up shows acquisition interest. Roadmap may be packaged differently for buyer narrative.

---

## A note on roadmap discipline

The most common roadmap mistake at this stage is **pulling v1.2 or v2.0 features forward into v1.0 because they sound exciting**. Resist this. Every feature pulled forward extends v1.0 timeline, delays the 50-customer milestone, and weakens the counter-positioning thesis.

The discipline to stick with the current Now horizon, even when shiny v2.0 themes call, is what separates focused vertical SaaS from feature-bloated also-rans. **Crossing the Chasm requires beachhead dominance before expansion.** The roadmap is structured to enforce this.

When in doubt, ask: "Does this feature help us hit the v1.0 success criteria?" If no, it's v1.1 or later. If yes, why isn't it already in scope?

---

## Customer feature requests

If you have a feature request or a workflow we haven't covered, the best place to share it is via the Ivy Co-pilot widget in your account, or directly to your customer success contact. Customer-driven priorities shape every quarterly review.

We commit to themes, not dates. We'll always tell you what's actually shipping in the next 60 days, and we update the roadmap publicly each quarter.

---

*Companion documents: Ivy v1.0 User Workflow · Ivy v1.0 Feature Priority Matrix · Master Features Catalogue.*
