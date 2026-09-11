---
name: perfect-resume
description: >-
  Guides an AI agent on how to craft the perfect, ATS-passing, high-impact software engineering resume (specifically backend/systems-oriented). Enforces dual-layer optimization (LLM semantic vector matching + deterministic parsing), recruiter F-pattern scanning, single-column rules, Google's XYZ impact formula, and typography standards (Inter for modern/American companies, Arial for legacy enterprise mammoths).
---

# Perfect Resume Engineering Skill

This skill provides step-by-step procedures, formatting invariants, cognitive scanning patterns, impact frameworks, and typography standards to create industry-leading, ATS-optimized engineering resumes.

---

## 1. Dual-Screening Optimization (ATS Bots + Human Recruiters)

Every elite engineering resume must succeed across two distinct evaluation phases:

### Layer 1: Machine Parsing & LLM Semantic Evaluation
Modern ATS platforms (Ashby, Greenhouse, Workday Illuminate) use a hybrid model:
1. **Deterministic Parser (Initial Extraction):** Converts the document into structured JSON fields. Fails if multi-column, tables, icons, or complex CSS are present.
2. **Vector Embeddings & Semantic Matching:** Transforms the resume into high-dimensional embeddings and calculates cosine similarity against the job specification.
   * *Critical Rule:* Avoid raw keyword dumping. Keywords must be embedded organically into action-oriented bullet points with context (e.g. *"Architected distributed caching using Redis and connection pooling"* rather than a naked *"Redis"* in a random list).

### Layer 2: The 6-Second Recruiter F-Pattern Scan
Human screeners spend only **6 to 10 seconds** reviewing a resume, tracking the page in an **F-pattern**:
1. **Top Horizontal Bar:** Candidate identity, contact links, and immediate role alignment.
2. **The "Top Third" Zone:** Core Technical Skills strip and the most recent role's title + company.
3. **First 2 Bullets Rule:** Recruiters make 80% of keep/reject decisions on the first two bullet points of the current/most recent position. These bullets must lead with your biggest quantifiable technical achievement.
4. **Left-Margin Scan:** Left-aligned bold action verbs and clear company anchors.

---

## 2. Typography & Target Company Archetypes

Font selection is a strategic differentiator depending on the candidate's target company:

| Target Company Category | Examples | Recommended Font | Why |
| :--- | :--- | :--- | :--- |
| **Modern Tech & All US Companies** | Startups, Scale-ups, Stripe, Vercel, Supabase, Google, Meta, US Tech firms | **Inter** | Clean, modern geometric sans-serif engineered specifically for screens and modern document rendering. Signatures contemporary tech acumen. |
| **Legacy Enterprises ("Mammoths")** | Banking (JPMorgan, Citi, Wells Fargo), Defense, Insurance, Government, Old-line Fortune 100 conglomerates | **Arial** (or **Calibri**) | Universally baked into every Linux/Windows server running legacy enterprise ATS platforms (Taleo, iCIMS, older Workday instances). Zero risk of character substitution or font rendering bugs. |

### Typography Hierarchy & Sizing
* **Name / Top Heading:** 20pt – 24pt, Bold.
* **Section Headings:** 11pt – 12pt, Bold, UPPERCASE with subtle bottom border (`border-bottom: 1px solid #e5e7eb`).
* **Job Title & Company:** 10pt – 10.5pt, Bold / Semi-bold.
* **Dates & Locations:** 9pt – 9.5pt, Regular or Tabular numbers, right-aligned.
* **Body / Bullet Text:** 9pt – 9.5pt, Regular, line-height 1.35.
* **Margins:** Exactly 0.5 in to 0.65 in.

---

## 3. Hard ATS Parsing Invariants (100% Extractability)

To guarantee a **99%+ ATS parsing rate**, adhere strictly to these structural rules:

1. **Strict Single-Column Layout Only:**
   * NEVER use two-column layouts, tables, text boxes, or floating sidebars. Parsers read left-to-right across columns, jumbling dates, titles, and bullet points.
2. **Text in Primary Body Flow:**
   * Never place critical contact info in the document's header or footer layers. ATS parsers frequently strip header/footer metadata.
3. **Standard Section Titles:**
   * Parsers classify text blocks using exact keyword matching on headings. Use only:
     * `TECHNICAL SKILLS`
     * `WORK EXPERIENCE`
     * `OPEN SOURCE & ENGINEERING PROJECTS`
     * `EDUCATION`
4. **No Visual Icons / Emoticons:**
   * Avoid icon fonts (e.g. phone/mail icons) in the text stream; parsers convert them into invalid ASCII or blank glyphs. Use plain text dividers: `|` or `•`.
5. **Machine-Readable Dates:**
   * Standard formats: `MMM YYYY – MMM YYYY` (e.g., `Jul 2024 – Feb 2026`) or `YYYY – Present`.
6. **Selectable Text & OCR Integrity:**
   * Always output clean vector text. Never rasterize or flatten text to bitmap images.

---

## 4. Impact Bullet Formula: Google XYZ Framework

Every bullet point must adhere to Google's XYZ formula:
> **"Accomplished [X] as measured by [Y], by doing [Z]"**

* **X (Outcome / Business Impact):** What improved or was solved?
* **Y (Quantified Metric):** Latency reduction, throughput, user scale, memory footprint, cost, dollar savings.
* **Z (Technical Method / Architecture):** What specific language, data structure, caching layer, or protocol made it possible?

### Backend-Specific Impact Levers
When crafting backend bullets, always ground them in these engineering dimensions:
* **Latency & Performance:** API response time (p50/p95/p99), database query speedup, elimination of cold starts (4x faster, 100ms vs 1s).
* **Reliability & Scalability:** Concurrency limits, auto-scaling thresholds, high availability (99.9%+), fault isolation, memory leak resolution.
* **Security & Supply Chain:** Vulnerability mitigations, package checksum verification, access boundary enforcement, RBAC / SSO.
* **Developer Productivity & Operational Efficiency:** Build time cut by X%, automated deployment pipelines, CLI tooling saving developer hours.

---

## 5. Resume Architecture for a Backend Engineer

A complete, 1-page backend software engineer resume should be organized in this order:

### 1. Header (Contact Details)
* **Name** (Bold, prominent)
* **Contact Line:** Email | Phone with country code | Location (City, Country or Remote) | Portfolio URL | GitHub URL | LinkedIn URL

### 2. Technical Skills (Top Third placement for immediate scan & vector scoring)
Categorized logically so both the parser and the hiring manager can scan in 5 seconds:
* **Languages & Runtimes:** Node.js, TypeScript, JavaScript, SQL (PostgreSQL, MySQL), Python, Bash.
* **Backend Systems & APIs:** Express.js, Hono, REST APIs, Microservices, Event-Driven Architecture, Caching (Redis), Connection Pooling.
* **Databases & Tooling:** PostgreSQL, Drizzle ORM, Prisma, Database Migrations, Query Optimization, Indexing.
* **Cloud & DevOps:** AWS (EC2, S3), Docker, Linux/Unix, Cloudflare, CI/CD, Git/GitHub.
* **AI & Engineering Tools:** AI SDK, OpenAI, RAG Pipelines, MCP, AST & RegEx Parsing.

### 3. Work Experience (Reverse-chronological)
* Company Name, Location, Role Title, Date Range (`MMM YYYY – MMM YYYY`).
* 3 to 4 high-density bullets per role utilizing the Google XYZ framework.
* Lead with the highest-impact technical achievement in bullets 1 and 2.

### 4. Open Source & Engineering Projects
* Project Name, Role/Maintainer status, Link.
* 2 to 3 bullets detailing the technical problem, system architecture, and adoption metrics (GitHub stars, downloads, daily users).

### 5. Education
* Degree, Major, Institution, Graduation Year.

---

## 6. Automated PDF Compilation Workflow

To generate the finished resume as a crisp, ATS-compliant PDF:

1. **Create HTML Template:**
   * Configure exact standard print dimensions:
     - Page size: A4 or Letter, margins 12mm - 15mm.
     - Font family: `'Inter', -apple-system, sans-serif` for modern/American tech; `'Arial', sans-serif` for legacy mammoths.
     - Line-height: 1.35.
2. **Compile to PDF:**
   * Use headless Chromium / Edge:
     `msedge.exe --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="path/to/resume.pdf" "path/to/resume.html"`
3. **Verify:**
   * Extract plain text to verify all text, dates, and bullet points extract cleanly in linear order without scrambling.
