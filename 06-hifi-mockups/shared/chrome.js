/* ──────────────────────────────────────────────────────────────
   Ivy v1.0 mockup · chrome injector
   Each screen sets window.IVY_SCREEN config; this injects:
     - sidebar (role-determined nav)
     - top bar (logo + surface pill + breadcrumb + actions)
     - co-pilot widget bottom-right
   ────────────────────────────────────────────────────────────── */

const NAVS = {
  adviser: [
    { id: "today",      label: "Today",      href: "adv-01-today.html",          icon: "◐" },
    { id: "leads",      label: "Leads",      href: "adv-02-leads.html",          icon: "▷", count: 12 },
    { id: "cases",      label: "Cases",      href: "adv-05-case-detail.html",    icon: "▦", count: 47 },
    { id: "clients",    label: "Clients",    href: "#",                          icon: "◯" },
    { id: "pipeline",   label: "Pipeline",   href: "#",                          icon: "▤" },
    { id: "compliance", label: "Compliance", href: "#",                          icon: "◇", count: 3 },
    { id: "reports",    label: "Reports",    href: "#",                          icon: "▥" }
  ],
  admin: [
    { id: "kanban",  label: "Kanban",        href: "adm-01-kanban.html", icon: "▦", count: 18 },
    { id: "email",   label: "Email Feed",    href: "#",                  icon: "▷", count: 4 },
    { id: "portals", label: "Portal Guides", href: "#",                  icon: "◇" },
    { id: "reports", label: "Reports",       href: "#",                  icon: "▥" }
  ],
  ops: [
    { id: "dashboard",  label: "Dashboard",  href: "ops-01-dashboard.html", icon: "◐" },
    { id: "pipeline",   label: "Pipeline",   href: "#",                     icon: "▤" },
    { id: "compliance", label: "Compliance", href: "#",                     icon: "◇" },
    { id: "team",       label: "Team",       href: "#",                     icon: "◯" },
    { id: "reports",    label: "Reports",    href: "#",                     icon: "▥" },
    { id: "audit",      label: "Audit Log",  href: "#",                     icon: "▢" }
  ]
};

const SURFACE_LABEL = {
  adviser: "Adviser",
  admin:   "Admin",
  ops:     "Operations"
};

const USER_INITIALS = {
  adviser: "SB",   // Sarah Bennett
  admin:   "NO",   // Niamh O'Reilly
  ops:     "MR"    // Mark Reynolds
};

const COPILOT_DEFAULT = {
  adviser: {
    body: '<strong>Mrs Patel</strong> hasn\'t been followed up since Tuesday. Want me to draft a check-in based on her FactFind?',
    actions: [{ label: 'Draft', primary: true }, { label: 'Dismiss' }]
  },
  admin: {
    body: 'Sarah responded — Tom\'s correct address is "Lane" not "Road". Re-ingesting now…',
    actions: [{ label: 'View thread' }]
  },
  ops: {
    body: '<em style="color:var(--ink-3)">Ask Ivy:</em> "Which adviser has the highest conversion this month?"<br><br><strong>Sarah at 71%.</strong> Team avg 58%. Three drivers behind her lead:<br>• 27% more time on FactFind capture<br>• 100% same-day vulnerability response<br>• Edits A4 drafts vs starting from scratch',
    actions: [{ label: 'Ask follow-up' }]
  }
};

function mountChrome(cfg) {
  const surface = cfg.surface || "adviser";
  const activeNav = cfg.activeNav || "";
  const breadcrumb = cfg.breadcrumb || "";
  const userInitials = USER_INITIALS[surface];
  const surfaceLabel = SURFACE_LABEL[surface];
  const items = NAVS[surface];
  const copilotConfig = cfg.copilot || COPILOT_DEFAULT[surface];

  const root = document.body;
  const main = root.querySelector("main") || root.querySelector(".content");
  const mainHTML = main ? main.outerHTML : "";

  root.innerHTML = `
    <div class="app">
      <aside class="sidebar">
        <div class="sidebar-section">
          ${items.map(it => `
            <a href="${it.href}" class="nav-item ${it.id === activeNav ? 'active' : ''}">
              <span class="ico">${it.icon}</span>
              <span>${it.label}</span>
              ${it.count ? `<span class="count">${it.count}</span>` : ''}
            </a>
          `).join('')}
        </div>
        <div class="sidebar-section" style="margin-top:auto">
          <a href="#" class="nav-item"><span class="ico">⚙</span><span>Settings</span></a>
        </div>
      </aside>

      <header class="topbar">
        <a href="index.html" class="topbar-logo">
          <span class="topbar-logo-mark">🌿</span>
          <span>Ivy</span>
        </a>
        <span class="topbar-surface-pill ${surface === 'ops' ? 'switchable' : ''}">${surfaceLabel}</span>
        <span class="topbar-breadcrumb">${breadcrumb}</span>
        <div class="topbar-actions">
          <button class="topbar-icon" title="Search">⌕</button>
          <button class="topbar-icon" title="Notifications">
            🔔 <span class="badge">3</span>
          </button>
          <span class="topbar-user">${userInitials}</span>
        </div>
      </header>

      ${mainHTML}
    </div>

    <aside class="copilot" id="copilot">
      <header class="copilot-header">
        <span class="dot"></span>
        <span>Ivy Co-pilot</span>
        <button class="topbar-icon" style="margin-left:auto;width:24px;height:24px" onclick="document.getElementById('copilot').style.display='none'">×</button>
      </header>
      <div class="copilot-body">${copilotConfig.body}</div>
      ${copilotConfig.actions ? `
        <div class="copilot-actions">
          ${copilotConfig.actions.map(a => `<button class="btn ${a.primary ? 'btn-primary' : ''}">${a.label}</button>`).join('')}
        </div>
      ` : ''}
      <div class="copilot-input">
        <input type="text" placeholder="Ask Ivy or invoke a command…" />
        <button class="topbar-icon" style="width:28px;height:28px">↵</button>
      </div>
    </aside>
  `;
}

// Boot
document.addEventListener("DOMContentLoaded", () => {
  if (window.IVY_SCREEN) mountChrome(window.IVY_SCREEN);
});
