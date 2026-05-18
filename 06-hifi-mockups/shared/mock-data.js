/* ──────────────────────────────────────────────────────────────
   Ivy v1.0 mockup · canonical sample data
   Mark Roberts as the sample case across every screen.
   Northchart Advisory as the reference firm.
   ────────────────────────────────────────────────────────────── */

window.IVY_DATA = {
  firm: {
    name: "Northchart Advisory",
    week: "Week of 12 May 2026",
    advisers: [
      { id: "sarah",  name: "Sarah Bennett",   capacity: 92, status: "at_risk" },
      { id: "james",  name: "James Whittaker", capacity: 78 },
      { id: "tom",    name: "Tom Wilkinson",   capacity: 88 },
      { id: "aiyana", name: "Aiyana Patel",    capacity: 65, status: "ramping_post_mat" },
      { id: "connor", name: "Connor Murphy",   capacity: 81 },
      { id: "priya",  name: "Priya Shah",      capacity: 84 }
    ],
    admins: ["Niamh O'Reilly", "Aoife Doyle"],
    paraplanner: "Emma Walsh",
    compliance: "Daniel Foster (part-time)",
    principal: "Mark Reynolds"
  },

  leads: [
    { id: "MR", name: "Mark Roberts",   age: 38, cover: "£245k LIFE+CI", status: "qualified",   stage: "factfind_booked", score: 8.4, source: "Compare the Market", time: "21:14 Tue · F1 out-of-hours", vuln: false },
    { id: "SL", name: "Sarah Lee",      age: 42, cover: "£150k LIFE",     status: "qualified",   stage: "triage_review",    score: 7.6, source: "MoneySuperMarket",   time: "06:42 Wed · F1 out-of-hours", vuln: false },
    { id: "JW", name: "James Wong",     age: 35, cover: "£80k IP",        status: "vuln_flag",   stage: "review_needed",    score: 6.9, source: "Meta Ads",            time: "23:48 Tue · F1 out-of-hours", vuln: true  },
    { id: "PS", name: "Priya Shah",     age: 39, cover: "£180k LIFE",     status: "qualified",   stage: "factfind_booked", score: 8.1, source: "Compare the Market", time: "Mon 14:22",                vuln: false },
    { id: "DP", name: "David Patel",    age: 44, cover: "£300k LIFE",     status: "qualified",   stage: "factfind_booked", score: 8.8, source: "Bonkers.ie",          time: "Mon 11:15",                vuln: false }
  ],

  appointments: [
    { time: "10:30", type: "FactFind",  client: "Mark Roberts",   duration: "90 min", channel: "Zoom" },
    { time: "13:00", type: "FactFind",  client: "Sarah Lee",       duration: "60 min", channel: "Zoom" },
    { time: "14:30", type: "UW review", client: "Tom Harris",      duration: "30 min", channel: "Phone" },
    { time: "16:00", type: "FactFind",  client: "Priya Shah",      duration: "75 min", channel: "Teams" }
  ],

  complianceQueue: [
    { type: "Suitability", client: "Anna Klein",  drafted: "A4 · 4 hr ago",  score: 94 },
    { type: "Suitability", client: "David Patel", drafted: "A4 · 2 hr ago",  score: 87 },
    { type: "Comp file",   client: "Tom Harris",  drafted: "C4 · 1 hr ago",  score: 96 }
  ],

  alerts: [
    { type: "vuln",   text: "Vulnerability flag: James Wong (Stage 2) — review before booking" },
    { type: "uw",     text: "UW status: Anna Klein — Standard accepted (Aviva, parsed by M5)" },
    { type: "chase",  text: "Murphy family — 6 days in Portal Processing (RL IE)" }
  ],

  case: {
    id: "MR-2026-08914",
    client: { name: "Mark Roberts", age: 38, location: "Manchester M6 4LP", dob: "14 Mar 1988" },
    stage:  { name: "Underwriting", subStage: "Awaiting GP report", day: 7 },
    product: { insurer: "Vitality", name: "Decreasing-term life + accelerated CI", premium: "£42.80/mo", cover: "£245,000", term: "22 years", uw: "Standard accepted" },
    team: { adviser: "Sarah Bennett", admin: "Niamh O'Reilly" },
    source: { channel: "Compare the Market", cost: "£18", initialScore: 8.4 },
    trigger: "Brother diagnosed with bowel cancer last month",
    enrichment: {
      companiesHouse: "Director · XYZ Design Ltd",
      residency:      "Owner-occupier",
      household:      "Wife Sophie · 2 children (4, 7)"
    },
    factfind: {
      capturedAt:  "Friday 14:00 (Sarah)",
      confidence:  94,
      sections:    8,
      complete:    8,
      keyFindings: [
        "Family hx: brother bowel CA age 45",
        "Smoker status: stopped 4yr ago",
        "Personal hx: clean — no current/past conditions",
        "Self-employed graphic designer · £62k SA302"
      ]
    },
    compliance: {
      fileStatus: "Complete · 11/11 docs",
      score:      96,
      signOff:    { by: "Daniel Foster", at: "Mon 14:02" },
      retention:  "6yr (UK)"
    },
    vulnerability: "None"
  },

  factfind: {
    elapsed: "47:23",
    estimated: "~90 min",
    sections: [
      { id: "personal",   label: "1 · Personal",            status: "complete",    conf: 0.95 },
      { id: "employment", label: "2 · Employment & Income", status: "complete",    conf: 0.92,
        fields: [
          { label: "Status",       value: "Self-employed",                   conf: 0.96, t: "12:04" },
          { label: "Trade",        value: "Graphic design",                  conf: 0.94, t: "12:08" },
          { label: "Years",        value: "6",                                conf: 0.92, t: "12:12" },
          { label: "Income",       value: "£62,000 (SA302)",                  conf: 0.88, t: "12:18" }
        ]
      },
      { id: "family",     label: "3 · Family & Dependants", status: "complete",    conf: 0.94,
        fields: [
          { label: "Partner",      value: "Sophie",                           conf: 0.97, t: "14:22" },
          { label: "Children",     value: "2 (ages 4, 7)",                    conf: 0.96, t: "14:38" }
        ]
      },
      { id: "existing",   label: "4 · Existing cover",       status: "complete",    conf: 0.88 },
      { id: "health",     label: "5 · Health & Lifestyle",   status: "progress",    conf: 0.78,
        fields: [
          { label: "Smoker",       value: "Stopped 4yr ago",                  conf: 0.92, t: "23:14" },
          { label: "Family hx",    value: "Brother · bowel CA · age 45",      conf: 0.88, t: "25:03" },
          { label: "Personal hx",  value: "Clean — no disclosures",            conf: 0.81, t: "32:50" }
        ]
      },
      { id: "hazardous",  label: "6 · Hazardous occupations", status: "pending",    conf: 0 },
      { id: "financial",  label: "7 · Financial situation",   status: "pending",    conf: 0 },
      { id: "risk",       label: "8 · Risk attitude",         status: "pending",    conf: 0 }
    ],
    transcript: [
      { who: "sarah", t: "47:18", what: "...and your income then?" },
      { who: "mark",  t: "47:22", what: "£62k last year, gross." },
      { who: "sarah", t: "47:26", what: "Self-employed?" },
      { who: "mark",  t: "47:28", what: "Yeah, 6 years now." },
      { who: "sarah", t: "47:30", what: "SA302 to evidence?" },
      { who: "mark",  t: "47:34", what: "Got the screenshots." },
      { who: "sarah", t: "47:38", what: "Perfect. Family — Sophie's your wife?" },
      { who: "mark",  t: "47:42", what: "Yes, two kids 4 and 7." },
      { who: "sarah", t: "47:50", what: "Health stuff — anything in the family?" },
      { who: "mark",  t: "47:58", what: "My brother just got diagnosed, bowel cancer." }
    ],
    ivyLive: {
      prompts: [
        { id: 1, type: "probe",  title: "Probe", text: "Family history of bowel cancer — probe own screening hx (FCA suitability + Vitality CI)", t: "25:21" },
        { id: 2, type: "warn",   title: "Compliance gap", text: "Hazardous occupations section not yet asked", t: "47:00" }
      ],
      coverage: 91,
      vulnerability: "none"
    }
  },

  suitability: {
    template: "A7 · Suitability v3.4",
    generated: "2 sec ago",
    score: 92,
    breakdown: [
      { label: "Circumstances",      delta: "+5" },
      { label: "Family hx",          delta: "+6" },
      { label: "Recommendation",     delta: "+9" },
      { label: "Rejected alts",      delta: "−4", warn: true },
      { label: "Risks",              delta: "+5" },
      { label: "Affordability",      delta: "+4" }
    ],
    flags: [
      { line: 184, type: "warn", text: "Aviva rejection rationale thin" }
    ],
    edits: [
      "Aviva rejection rationale",
      "Family-history sentence",
      "Typo · line 92",
      "Mortgage timeline link"
    ]
  },

  kanban: {
    metrics: { inFlight: 18, nigosPrevented: 2 },
    lanes: [
      {
        id: "ai_verified", label: "AI Verified Pending Review", count: 14,
        cards: [
          { client: "Mark Roberts",  insurer: "Vitality UK", product: "£245k DTL+CI", status: "✓ M2 green",   tone: "green" },
          { client: "Priya Shah",    insurer: "Vitality UK", product: "£180k LIFE",   status: "✓ M2 green",   tone: "green" }
        ]
      },
      {
        id: "not_matching", label: "Not Matching", count: 3, warning: true,
        cards: [
          { client: "Tom Harris",  insurer: "RL UK",  product: "Address mismatch",   status: "⚠ ping Sarah",  tone: "danger" },
          { client: "David Patel", insurer: "L&G UK", product: "Premium delta flag", status: "⚠ ping Sarah",  tone: "danger" }
        ]
      },
      {
        id: "portal_processing", label: "Portal Processing", count: 8,
        cards: [
          { client: "Anna Klein",   insurer: "Aviva UK", product: "Day 3 UW",      status: "M5 watching",   tone: "info" },
          { client: "Murphy fam.",  insurer: "RL IE",    product: "Day 6 chase",   status: "chase needed",  tone: "warn" }
        ]
      },
      {
        id: "sent_to_client", label: "Sent to Client", count: 5,
        cards: [
          { client: "Sarah Lee", insurer: "Vitality UK", product: "Sent today",   status: "M6 drafted", tone: "green" },
          { client: "Walsh",     insurer: "Aviva IE",    product: "DD live 1 Jun", status: "M6 sent",   tone: "green" }
        ]
      }
    ],
    attention: [
      { text: "Tom Harris · M2 flagged address mismatch", action: "Ping Sarah" },
      { text: "David Patel · M2 flagged premium delta",    action: "Ping Sarah" },
      { text: "Murphy fam. · 6 days in Portal Processing", action: "Chase RL IE" }
    ]
  },

  ops: {
    pipeline: [
      { id: "captured",  label: "Captured",  count: 47, width: 100 },
      { id: "qualified", label: "Qualified", count: 38, width: 81 },
      { id: "called",    label: "Called",    count: 28, width: 60 },
      { id: "drafted",   label: "Drafted",   count: 22, width: 47 },
      { id: "issued",    label: "Issued",    count: 18, width: 38 }
    ],
    pipelineValue: "£142k",
    compliance: {
      vulnCases: 4,
      auditFlagged: 0,
      avgFileScore: 98,
      nigoSaved: 12,
      nigoSavedDays: 30
    },
    attention: [
      "Sarah at 92% — at risk; rebalance considered",
      "Aiyana ramping (post-mat) — capacity climbing",
      "Murphy family case — 6 days in Portal Processing",
      "CPC 2025 evidence pack ready — Daniel signed off Mon"
    ],
    suggestedQueries: [
      "Which adviser has the highest conversion this month?",
      "How many cases did Sarah close last quarter vs this quarter?",
      "Show me all loaded UW decisions this month",
      "What's our M2 NIGO prevention saving us in £?"
    ]
  },

  uw: {
    insurer: "Vitality UK",
    day: 7,
    estDays: 14,
    timeline: [
      { day: 1, type: "submitted", text: "Application submitted via M4 — Vitality intermediary portal (Niamh)" },
      { day: 1, type: "ack",       text: "Vitality acknowledged · ref VTL-78901" },
      { day: 5, type: "gp_request",text: "Vitality medical evidence team requested GP report (M5 parsed)" },
      { day: 5, type: "consent",   text: "GP consent sent to Mark via DocuSign" },
      { day: 6, type: "signed",    text: "Mark signed consent · M5 forwarded to Vitality" },
      { day: 6, type: "client_upd",text: "Auto-update sent to Mark — GP typical 14 days" },
      { day: 7, type: "waiting",   text: "Awaiting GP report · est. Day 14–19" }
    ]
  },

  complianceFile: {
    score: 96,
    retention: "6yr (UK)",
    autoBuiltSec: 12,
    docs: [
      { num: 1,  label: "IDD v3.4",                  status: "Sent Tue 21:25 · opened Wed 08:14" },
      { num: 2,  label: "Privacy Notice v2.1",        status: "Sent Tue 21:25 · acknowledged" },
      { num: 3,  label: "Terms of Business v3.4",     status: "Signed Wed 09:02 (DocuSign ABC123)" },
      { num: 4,  label: "FactFind PDF + audio",       status: "Saved Fri 16:08 · 110MB (CallCabinet)" },
      { num: 5,  label: "Quote shortlist + 3 KFIs",   status: "Saved Sat 11:23" },
      { num: 6,  label: "Suitability Letter v2",      status: "Signed Mark Tue 11:14 · Daniel Mon 14:02" },
      { num: 7,  label: "Application bundle",         status: "Signed Thu 13:12 · M1 ingested" },
      { num: 8,  label: "M2 cross-verification",      status: "All green Thu 13:14" },
      { num: 9,  label: "UW correspondence",          status: "3 emails parsed + classified by M5" },
      { num: 10, label: "Policy schedule",            status: "Issued by Vitality Day 19" },
      { num: 11, label: "M6 client onboarding email", status: "Sent Day 19 + signed receipt" }
    ],
    summary: {
      adviser:       "Sarah Bennett",
      admin:         "Niamh O'Reilly",
      product:       "Vitality DTL + accelerated CI",
      premium:       "£42.80/mo (Standard rates accepted)",
      cover:         "£245,000 over 22 years",
      indemnified:   "£648 (1st DD 1 Jun)",
      keyDecisions:  "Family CA history → Vitality selected for cancer cover"
    },
    danielReview: "✓ Approved · 3 min · no issues flagged"
  }
};
