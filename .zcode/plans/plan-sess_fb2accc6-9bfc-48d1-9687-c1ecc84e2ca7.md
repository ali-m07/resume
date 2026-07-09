## Rebuild: Solutions Architect CV (web + LaTeX) — all 5 locales, hybrid dark-hero / light-body design

### Decision summary (locked with you)
- **Design:** Hybrid — dark gradient hero (name, title, metric pills, contact, lang/PDF controls) + clean light body (refined cards, hairline rules, 2-col on desktop, 1-col mobile, RTL preserved for Persian).
- **Locales:** All 5 (EN, DE, FR, FA, TR) fully synced to the Solutions Architect narrative.
- **PDF:** Both — fix the floating button (re-wire to `html2pdf.js`, already a dependency) AND add a tuned `@media print` stylesheet for native Print→A4.
- **Scope:** Redesign the React/Vite/Tailwind web app + add a refreshed `.tex` to the repo; LinkedIn About + GitHub bio/README delivered as copy-paste text in the final message.

---

### Phase 1 — Content rebuild (all 5 locale JSONs)

Sync every locale to the LinkedIn/LaTeX architect story. **Synchronized job-titles matrix:**

| Role | EN | DE | FR | FA | TR |
|---|---|---|---|---|---|
| Snapp #1 | Solutions Architect (Cloud, Systems & AI) | Solutions Architect (Cloud, Systeme & KI) | Architecte Solutions (Cloud, Systèmes & IA) | معمار راه‌حل (کلاد، سیستم‌ها و هوش مصنوعی) | Solutions Architect (Bulut, Sistemler & Yapay Zeka) |
| Snapp #2 | Solutions Architect (Workflow, Systems & Integrations) | …(Workflow, Systeme & Integrationen) | …(Workflow, Systèmes & Intégrations) | …(گردش کار، سیستم‌ها و یکپارچه‌سازی) | …(İş Akışı, Sistemler & Entegrasyonlar) |
| Snapp #3 | Solutions Architect (Organizational Systems & P&OD) | …(Organisationssysteme & P&OD) | …(Systèmes Organisationnels & P&OD) | …(سیستم‌های سازمانی و P&OD) | …(Kurumsal Sistemler & P&OD) |
| Bodyspinner | Data & Systems Analyst (Part-Time) — keep | | | | |
| Shahrzaad | Digital Transformation Specialist — keep | | | | |
| KarenCrowd | Business Evaluator & Investment Analyst — keep | | | | |

**Header subtitle** → `Solutions Architect | Cloud-Native · Kubernetes · LLM/RAG · Enterprise Automation` (localized).

**Experience bullets** — rewrite with architect verbs (*Architected/Governed/Engineered/Modelled*) and embed the metrics, bolded via inline `<b>` (components already render with `dangerouslySetInnerHTML`):
- Snapp (Cloud/AI): K8s+Helm platform governance; 10+ services via GitHub Actions CI/CD; **1,000+ user** multi-module platform (LDAP/OIDC SSO, RBAC); LLM/RAG+LangChain pipeline **15+ hrs/wk saved**; LMS/HR infra across 3+ units.
- Snapp (Workflow): ScriptRunner/Behaviours automation; Jira Assets model across **20+ teams**; n8n mesh unifying **6+ backend APIs**; **35%** fewer ad-hoc IT tickets.
- Snapp (P&OD): root-cause diagnosis of **4+** recurring failures; digitized onboarding, **40%** faster new-hire cycle.
- Bodyspinner: Power BI **−40%** manual reporting; CNN/MLflow pricing on **1,000+ SKUs**; ticketing at **99% uptime**; **25%** data accuracy.
- Shahrzaad: **100%** ops migrated paper→digital; task system for **50+ employees**; **25%** productivity.
- KarenCrowd: **1,000+** startups; framework cutting review time **30%**; **40%** funding success.

**Skills** — restructure into 4 high-signal categories (drop Brand Consulting/Data Entry; add IT Consulting, Strategic Planning):
- *Core Architecture:* Solutions Architecture · System Dynamics · Digital Transformation · Process Re-engineering · Enterprise Integration · Scenario Planning · Roadmapping · Technology Evaluation
- *Cloud-Native & DevOps:* Docker · Kubernetes (prod) · Helm · Terraform (IaC) · GitHub Actions · AWS (VPC/EC2/S3/Lambda/IAM) · GCP · SRE
- *AI & Automation:* LLMs · RAG & Vector DBs · LangChain/LlamaIndex · LLM Agents & MCP · n8n workflow mesh · Jira (ScriptRunner/Assets) · Python · SQL · Power BI · Grafana
- *Systems Thinking & Foresight:* Strategic Foresight · Causal Modeling · Decision Intelligence · Organizational Development · Change Management · IT Consulting · Strategic Planning

**Summary/About** — unified architect narrative drawn from your LinkedIn About + LaTeX summary. **Achievements** → condensed into a hero metric strip (5+ yrs · 1,000+ users · 15+ hrs/wk · 10+ services) so it stops duplicating the experience bullets.

---

### Phase 2 — UI/UX redesign (hybrid dark-hero / light-body)

- **New shared `Section` component** (`src/components/Section.jsx`): indexed title + accent + hairline divider, consistent premium card. Rewrite each existing section to use it (removes the per-component `max-w-4xl mx-auto mt-10` duplication).
- **New `Hero` (dark gradient)** — name (display font), title, tagline, contact icon row, 4 metric pills, language selector + PDF button. Anchored at top.
- **New responsive layout in `App.jsx`** — desktop: main (Summary, Experience, Key Projects) + aside (Skills, Education, Languages & Mobility); Publications + Research full-width below; Contact in hero/footer.
- **Typography** — add Inter (body) + a display font for the name via Google Fonts in `index.html`; monospace accent for the cybernetic tagline.
- **Brand palette** — extend `tailwind.config.js` with `navy`, `accent` (blue), `ink`, `muted`, `line`; apply consistently.
- **RTL preserved** for `fa`; language toggle keeps all 5 flags.
- **Print stylesheet** — `@media print` in `index.css`: hide controls, flatten to single column, exact A4, keep colors via `print-color-adjust`.

### Phase 3 — PDF
- Rebuild `ExportPDFButton.jsx` on `html2pdf.js` (already in deps) targeting the resume container; wire it into the hero and remove the old floating button.
- Keep the print stylesheet as the second path.

### Phase 4 — LaTeX refresh
- Save `resume/ali-mansouri-cv.tex` to the repo, aligned to the same content: fix P&OD dates to **Jun 2023 – Jan 2024**, update skills to the 4-category structure, keep the existing strong typesetting.

### Phase 5 — Verify
- `npm run build` must pass (the deploy workflow runs the same); spot-check EN/DE/FR/FA/TR render and RTL.

### Out of scope
- No backend changes; no new runtime deps (html2pdf.js already present); deploy workflow untouched.

### Deliverable in final message (not files)
- LinkedIn About copy-paste · synchronized titles matrix · GitHub profile bio + README strategy.