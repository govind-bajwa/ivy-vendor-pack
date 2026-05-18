# Ivy — Vendor Brief

> A complete read of the project, written for someone with no prior context. ~12 minute read.

## The world we're building for

UK and Irish independent insurance brokers — specifically those who sell **protection**. Protection means life insurance, critical illness cover, income protection, and the legally mandated mortgage protection in Ireland.

These are typically firms of four to twenty-five advisers. Regional, family-owned or partner-owned. **Independent**: they don't work for a single insurer; they advise clients on the best protection product across a panel of five to ten carriers — Aviva, Royal London, Vitality, Legal & General, Zurich in the UK; Irish Life, New Ireland, Zurich Ireland, Royal London Ireland, Aviva Ireland in Ireland.

A typical case goes like this. Someone takes out a mortgage. They need life cover. They look online or get a referral, fill out a form, and a broker picks up the phone. The broker arranges a video call (the "fact-find"), spends 60–90 minutes going through the person's full health history, family situation, occupation, finances, hazardous activities, smoking history, existing cover. They go away, source quotes from several insurers, send the client a written recommendation (the "suitability letter"), help the client fill out the chosen insurer's application form, chase that insurer through underwriting (which can take 4–8 weeks), and finally hand over a live policy.

It's a long, paperwork-heavy, regulated process. About **6.7 hours of fee-earning staff time per closed policy** in a typical firm.

## Why this market matters right now

Three things are happening at the same time.

**One. Acute regulatory pressure.** The UK's Financial Conduct Authority introduced *Consumer Duty* in July 2023 — a sweeping standard that requires brokers to evidence "good outcomes" for clients across every product they sell. The FCA is now mid-flight on a separate *Pure Protection Market Study*, looking specifically at protection broker commission structures and switching practices, with the final report due Q3 2026. Ireland's Central Bank introduced a replacement *Consumer Protection Code*, in force from 24 March 2026, which sharpens vulnerable-customer requirements and digital-design rules. Brokers must now demonstrate a defensible audit trail on every case. Most firms know their current evidence file would not survive a real inspection.

**Two. AI has made the cognitive work of broking roughly 100× cheaper than 18 months ago.** Reading documents, drafting letters, matching evidence to rules, extracting structured data from conversations — all of this was done by junior staff costing £30–50k each, and now can be done by AI for pennies per case. The economic basis of the existing broker workflow has collapsed.

**Three. Private-equity-backed consolidation is squeezing independent firms.** Howden, Ardonagh and JMG Group in the UK; Arachas (Ardonagh) and NFP (now part of AON) in Ireland. They acquire firms with clean operational evidence at around 8× EBITDA, and firms with messy evidence at 3–4×. The principal of an independent firm has roughly two years to either tighten operations or sell on poor terms.

This is the moment when a product like Ivy works.

## What we discovered

We started in summer 2025 by building a single bespoke automation for one protection broker. They liked it and referred us to a second. Then a third. By the sixth broker, the pattern was unmistakable: **every protection firm runs the same nine-stage workflow**, with the same friction at the same stages, regardless of size or geography.

The nine stages, in plain English:

```
1. LEAD               A new enquiry arrives — web form, phone, comparison-site lead, social ad.
2. TRIAGE             Score it. Decide who handles it. Book the fact-find call.
3. PRE-FACT-FIND      Send the regulated disclosures (Terms of Business, Privacy, etc.)
                      before the call.
4. FACT-FIND          The big one. 60–90-minute video call. Capture health, family,
                      occupation, finances, hazardous activities, smoking, existing cover.
5. RESEARCH + QUOTE   Run sourced quotes against five to ten insurers. Pick the best one.
6. SUITABILITY        Write a five-to-seven-page letter explaining the recommendation.
                      Legal artifact. Goes to compliance for review before sending to client.
7. SUBMISSION         Submit the application to the chosen insurer's portal. Sometimes
                      three portals in parallel if the case is split.
8. UNDERWRITING       Track GP-report requests, medical exams, insurer queries.
                      Four-to-eight-week wait.
9. COMPLIANCE FILE    Build the eleven-document audit pack. Today this is built reactively
                      at month-end. Tomorrow's regulator wants it on demand.
```

Every firm we worked with had the same stages, the same friction, the same admin tax. **The workflow is the product.**

## What Ivy is

Ivy is an AI-powered operating system for that nine-stage workflow.

It does three things at once.

**One — it runs the workflow end to end inside a single product.** Today, brokers stitch together a CRM (Plum, intelliflo, Wealthcraft, sometimes Salesforce), a call recorder (CallCabinet, Recordsure, Zoom), a quote engine (iPipeline, Iress, BIS for Ireland), insurer portals (one per carrier), Word for letters, DocuSign for signatures, Excel for tracking. Ivy is the single surface they work in for the entire case — every stage, every action, every document — with the existing tools sitting underneath as integrations.

**Two — it threads AI through every stage.** When the adviser is on a fact-find call, Ivy is listening (with consent), capturing the conversation into a structured fact-find form so the adviser doesn't type during the call. It surfaces probe suggestions in real time — *"the client mentioned a brother with cancer — probe for own screening history"*. It detects vulnerability indicators (financial distress, recent bereavement, capability concerns) for regulatory flagging. When the quote comes back, Ivy drafts the seven-page suitability letter against the firm's template, citing the fact-find and the quote, ready for the adviser to review and send. It then auto-builds the eleven-document compliance file as the case progresses, so audit-readiness is a by-product, not a separate project.

**Three — it cuts the workflow's time in half.** From 6.7 hours of fee-earning staff time per closed policy down to about 3.3 hours, while making the resulting compliance evidence dramatically stronger. The economic outcome for a typical eight-adviser firm is roughly £100,000+ of additional annual margin against an annual Ivy subscription of £15–20k. We have receipts on this — the time savings have been measured at the customers already running Ivy in production.

## What the product looks like

Three role-specific surfaces, all built on the same underlying customer record.

**The adviser surface.** What Sarah, a senior adviser, uses every day. Her morning home — what changed overnight, who needs her today, what's flagged. Her lead inbox. Her client cases. The live fact-find screen during a call. The suitability letter editor afterwards. Her in-flight underwriting tracker. Her compliance file viewer.

**The admin surface.** What Niamh, the back-office paraplanner, uses. A kanban board where each case is a card. Cases flow through *Inbox → Verifying documents → Submitting to insurer → Tracking underwriting*. Niamh picks each case up after the adviser has approved the suitability letter, takes it through to the insurer, and hands it back at on-risk.

**The operations surface.** What Mark Reynolds, the firm principal, opens on Monday morning. Firm-wide pipeline, commission run-rate vs target, per-adviser performance, compliance health, ageing cases. Every metric drills down to the underlying cases.

And running across all three: **a cross-cutting AI co-pilot**. Case-aware — Sarah can ask "summarise this case" while she's looking at it; Niamh can pick up a query Sarah started yesterday. Four modes: a dedicated workspace, a slide-in side panel over the current screen, a persistent floating widget bottom-right of every page, and a welcome state with suggestion prompts.

One architectural principle worth understanding before reading further: **the customer case is the central data object.** Every other surface — the kanban card the admin sees, the row in the lead inbox, the line on the operations dashboard, the documents in the compliance file — is a *projection* of that single case. One canonical data model. No copy-paste between surfaces, no separate databases, no risk of drift.

## The functional areas, in plain language

Inside the product, the work breaks into four areas. We describe them here in plain language; deeper specs cover the individual features in detail.

**Lead capture and qualification.** Inbound leads arrive 24/7. AI converses with them at regulated-grade quality, qualifies them, scores them, and books them into the right adviser's calendar based on speciality, region, language, or workload — without the adviser lifting a finger. Vulnerability indicators are flagged during this conversation and surfaced to the adviser before the fact-find.

**Adviser support during the case.** Live fact-find capture during the call. Real-time probe suggestions while the conversation is happening. Vulnerability detection. Sourced quote inputs that flow into the quote engine. AI-drafted suitability letters cited back to the fact-find and the chosen quote. Version-controlled firm templates so the disclosures and letter wording stay consistent across advisers.

**Call recording and compliance.** Recording integration — the call audio itself is never stored in Ivy; we link to the existing provider (CallCabinet UK, Recordsure Ireland, Zoom). Compliance scoring on every fact-find. Real-time vulnerability detection during the call. Automatic assembly of the eleven-document compliance file as the case progresses.

**Back-office submission and tracking.** Document ingest and cross-document verification (catching discrepancies between the fact-find and the application form before submission). Guided per-insurer portal submission. Underwriting tracking with ageing alerts. Insurer email drafting. Client communications. Cross-sell intelligence post-issue.

## How Ivy fits with what the broker already uses

Ivy is not a replacement system. It sits on top of what brokers already run.

- The **CRM** remains in place (Plum, Acre, Plannr, intelliflo, Wealthcraft, MoneyAdvice+, sometimes Salesforce). Ivy reads from and writes to it.
- The **quote engines** remain in place (iPipeline SolutionBuilder, Iress The Exchange, BIS for Ireland). Ivy passes structured inputs in and reads results back.
- The **insurer portals** remain in place (Aviva, Royal London, Vitality, L&G, Zurich in the UK; the equivalents in Ireland). Ivy guides the broker through them; it doesn't replace them.
- The **call recorders** remain in place (CallCabinet UK, Recordsure Ireland, Zoom). Ivy receives metadata and a URL to the recording.

A firm signs up for Ivy without uninstalling anything they already have. They start using Ivy as their daily working surface, with the existing stack continuing to do the systems-of-record work underneath.

## The customers we work with today

Ivy is in production today at a portfolio of broker firms across the UK and Ireland. The mix spans pure-protection independent specialists, mortgage + protection firms, and wealth + protection adjacencies — across both markets.

The product runs today as a hand-delivered service: every customer's deployment is configured by us individually. We are now bringing in a vendor partner to take Ivy from that hand-delivered state to a fully productised, multi-tenant SaaS that customers can sign up to and operate self-serve.

Two reference customers — one in the UK and one in Ireland — are committed to be the first firms on the productised version, both going live this autumn. (Customer names provided under NDA.)

## What we want the vendor to build

A multi-tenant production deployment of Ivy. EU-hosted, audit-grade, with:

- **Fifteen priority screens** that cover the nine-stage workflow plus the cross-cutting AI co-pilot
- **Three role surfaces** — adviser, admin, operations
- **All the integrations described above** — CRMs (Plum primary), call recorders, quote engines (iPipeline, Iress, BIS), the major UK and Irish insurer panels, e-signature, transactional email
- **Auth, billing, and an audit log** that would survive a regulator's inspection
- **Two reference-customer pilot deployments** running real cases — one in the UK end of October, one in Ireland mid-November

Build target: production-ready by autumn 2026, with both pilot customers operating live cases before year-end.

## What's already done

The vendor is doing implementation work, not discovery. What's already complete and contained in this pack:

- The **product vision and requirements** — every feature, who it's for, what it must do, success criteria
- The **stage-by-stage workflow walkthrough** — what each stage looks like with Ivy in place, the timing model, the ROI math
- The **information architecture** — sitemap, full screen inventory, and detailed specs for the five hardest screens
- **Fifteen wireframes** locking the structure of every priority screen
- **Eight high-fidelity mockups** showing the intended visual style
- The **design system** — colour tokens, typography, component patterns, voice rules

Together that gives a vendor enough material to scope, plan, and start building. The next document in the read order is the user-flows document, which threads the fifteen screens onto a single sample case (a real-shaped client called Mark Roberts, 38, self-employed, taking out life cover for his family) — it is the single best document in the pack for understanding how the product behaves.

→ [Continue to user flows](../04-user-flows/README.md)
