# Profile Context: Hari Prasad

> This profile document serves as an exhaustive context baseline for AI agents generating tailored, high-impact resumes, cover letters, and technical biographies for Hari Prasad.

---

## 1. Identity & Core Positioning

* **Full Name:** Hari Prasad
* **Target Title & Headline:** **Backend / Systems Engineer** (Node.js, TypeScript, PostgreSQL, Distributed Systems)
* **Years of Professional Experience:** 3+ years in the Node.js / TypeScript ecosystem
* **Core Value Proposition:** A high-ownership, product-minded backend engineer who specializes in server performance, database systems, supply chain security, and developer tooling. Has delivered production systems at startup speed while maintaining the discipline and rigor required for enterprise-grade open-source codebases (e.g., pgAdmin 4).

### Contact & Digital Footprint
* **Email:** `harii.codess@gmail.com`
* **Phone:** `+91 93912-07039` / `+919391207039`
* **Personal Website:** `https://www.heyhari.tech` (also hosted at `https://dev-hari-prasad.vercel.app`)
* **GitHub:** `https://github.com/dev-hari-prasad/`
* **LinkedIn:** `https://www.linkedin.com/in/harii-prasadd/`
* **X (Twitter):** `https://x.com/hari__prasadd`
* **Reddit:** `https://www.reddit.com/user/Hari-Prasad-12/`
* **Geographic Location:** **Hyderabad, India** (Available immediately for Remote worldwide, Hybrid, or On-site Relocation)

### Education & Academic Background
* **MIT World Peace University, Pune:** Undergraduate Studies *(2023 – 2026)*
* **Bharatiya Public School, Rajasthan:** Senior Secondary Education / 10th – 12th Grade *(2021 – 2023)*

---

## 2. Technical Stack Taxonomy

### Languages & Runtimes
* **Core:** TypeScript, JavaScript (ESNext), Node.js (v18, v20, v22)
* **Databases / Querying:** SQL (PostgreSQL, MySQL), Database Schema DDL/DML
* **Scripting / Systems:** Python (3.x), Bash / POSIX Shell

### Backend Architecture & APIs
* **Frameworks & Runtimes:** Express.js, Hono, Node.js HTTP/HTTPS core
* **Architecture:** RESTful API Design, Microservices, Event-Driven Architecture, Stateful vs. Stateless Server Design, Monolith to Service decomposition
* **Performance & Data Layers:** Redis (Caching, TTL management, Pub/Sub), Connection Pooling, Latency Optimization (p50/p95/p99), Cold-Start Mitigation
* **Data Modeling & ORMs:** Drizzle ORM, Raw SQL migrations, PostgreSQL Indexing, Foreign Key constraints, Transaction isolation levels

### Cloud, Systems & Infrastructure
* **Cloud Providers:** Amazon Web Services (AWS - EC2, S3, SES, IAM), DigitalOcean (Droplets, App Platform), Cloudflare (Workers, DNS, CDN, Edge Caching), Vercel
* **DevOps & Containers:** Docker (Dockerfile optimization, multi-stage builds, container isolation), Linux / Unix System Administration (systemd, process supervision, firewall, memory monitoring), Git, GitHub Actions (CI/CD workflows)

### AI, LLM Integration & Developer Tools
* **AI & LLM Tooling:** Vercel AI SDK, OpenAI API, Structured Output generation, RAG (Retrieval-Augmented Generation) pipelines, Vector embeddings, MCP (Model Context Protocol) servers, AI observability
* **Compiler & AST Engineering:** Abstract Syntax Trees (AST), Regular Expressions (RegEx), Lexical Tokenization, CLI development

### Frontend (Secondary Competency)
* **Stack:** React, Tailwind CSS, HTML5, CSS3, Vite, Next.js, Phosphor Icons, Lucide, Canvas API

---

## 3. Detailed Work Experience

### Role 1: Software Engineer — Not Boring
* **Duration:** July 2024 – February 2026 (1 year 8 months)
* **Company Type:** Client product studio & digital engineering agency
* **Scope & Responsibilities:**
  * **Architectural Leadership:** Designed scalable backend architectures for multiple client-facing projects from inception to production deployment. Led cross-functional teams of **5+ engineers** (both frontend and backend developers), establishing code review standards, branch strategies, and schema conventions.
  * **Performance Engineering (4x Speedup):** Analyzed and re-architected client APIs previously running on serverless endpoints. Migrated compute to a persistent, stateful Node.js architecture, eliminating cold-start overhead and connection establishment latency. Reduced API response times by **4x (from 800ms+ down to sub-200ms)** with zero cold starts and 99.9% uptime.
  * **Internal Productivity Tooling:** Architected and deployed proprietary internal business tools used daily by **50+ active employees**. Built on containerized, auto-scaling infrastructure configured with automated horizontal scaling thresholds to gracefully absorb sudden traffic spikes without degraded throughput.

### Role 2: OSS Contributor & Maintainer — Open Source Software
* **Duration:** December 2024 – Present (Ongoing)
* **Key Focus:** pgAdmin 4 (the flagship open-source administration and management platform for PostgreSQL, utilized by millions of developers and enterprise DBAs worldwide), along with independent developer tooling.

#### pgAdmin 4 Key Contributions (8+ Merged Engineering Contributions)
1. **Supply Chain Security Hardening (#10363, #10390, #10391, #10395, #10372):**
   * *The Problem:* Open-source ecosystems face frequent supply chain hijacking and malicious dependency injections in build pipelines.
   * *The Solution:* Formulated and implemented strict supply chain security policies across pgAdmin 4 web and runtime distributions:
     * Configured an automated 3-day minimum release age gate for incoming npm dependencies to prevent zero-day package takeovers.
     * Disabled untrusted package install scripts (`ignore-scripts`) by default.
     * Restored strict cryptographic checksum verification in lockfiles.
     * Pinned critical production dependencies to eliminate wildcard poisoning.
2. **Adaptive Server Startup Optimization (PR #9782):**
   * *The Problem:* Desktop users experienced sluggish launch latency due to a static 1-second interval polling loop checking for backend readiness.
   * *The Solution:* Replaced static polling with an adaptive health-check algorithm that begins with immediate pings at 100ms and utilizes exponential backoff. Reduced desktop startup wait times drastically on modern systems.
3. **Lazy-Loading & Deferred Cloud SDK Imports (PR #10362, Commit 50d7676):**
   * *The Problem:* Loading AWS (`boto3`), Azure, and Google Cloud SDKs on application boot introduced severe CPU and memory bloat, even when the user was only connecting to local databases.
   * *The Solution:* Deferred all heavyweight cloud provider SDK imports to the exact moment cloud database deployment wizards are triggered. Reduced cold launch memory overhead and CPU cycles across every user session.
4. **Gated External Authentication in Desktop Mode (PR #10240, Commit 2de30f2):**
   * *The Problem:* Desktop mode was unconditionally importing enterprise-only authentication providers (LDAP, Kerberos, OAuth2, Webserver auth, MFA modules), wasting resources.
   * *The Solution:* Gated authentication providers behind server-mode runtime checks, eliminating module evaluation overhead on desktop launches.
5. **Session Restore Auto-Query Execution Fix (PR #10055):**
   * *The Problem:* Restoring active user workspace sessions inadvertently triggered automatic execution of previously loaded queries, risking accidental data mutations.
   * *The Solution:* Decoupled editor buffer restoration from query execution pipelines, safeguarding database states on restart.
6. **Core Documentation & Developer Experience (PR #10093):**
   * Authored the official starter `CONTRIBUTING.md` guide for pgAdmin 4, standardizing local environment setup, Docker testing, database migrations, and PR review standards for new contributors.

---

## 4. Key Open Source & Engineering Projects

### Project 1: Go Better (`gobetter.dev`)
* **URL:** `https://gobetter.dev`
* **Category:** Developer Platform / AI Code Intelligence
* **Overview:** An AI-assisted code review platform that connects to GitHub repositories, analyzes incoming pull requests, and generates actionable, context-aware architectural feedback.
* **Backend Architecture:**
  * Chunked Git diff streaming pipeline that breaks massive PRs into semantically coherent AST hunks.
  * Structured LLM prompt pipelines utilizing Vercel AI SDK to enforce deterministic, machine-readable review outputs.
  * Built using TypeScript, Next.js, and serverless background orchestration.

### Project 2: copy-env (`npm: copy-env`)
* **URL:** `https://www.npmjs.com/package/copy-env`
* **Category:** Developer CLI Tool / Open Source Utility
* **Overview:** A lightweight developer CLI tool designed to automatically extract, sync, and maintain environment variable templates into `.env.example` files without leaking sensitive secrets.
* **Technical Implementation:**
  * State-preserving AST and lexical regex parser that strips secret values while preserving inline comments, multi-line declarations, and escaped quotes across Unix and Windows shells.
  * Deterministic lexer capable of parsing complex shell environment formats.
  * Zero-dependency execution footprint engineered for rapid CI/CD pipeline integration.

---

## 5. Engineering Principles & Technical Writing

Hari frequently writes technical articles exploring distributed systems, Linux operations, and database optimization (`https://www.heyhari.tech/blogs`):
* *"The New HTTP QUERY Method and How to Use It"* — In-depth technical analysis of RFC specifications for safe, idempotent HTTP request bodies in complex data querying.
* *"Why LLM Performance Degrades After Two Weeks of Release"* — Architectural analysis of context degradation, token drift, and semantic embedding decay in production AI systems.
* *"Rethinking the Correct Repo Structure for the Age of AI Agents"* — Engineering guidelines on modular codebase topographies for autonomous coding assistants and deterministic indexing.

---

## 6. How the LLM Should Generate Resumes for Hari

1. **Strict 1-Page Layout:** Modern tech screeners expect high signal density on exactly 1 page.
2. **Lead with Systems Impact:** Focus heavily on pgAdmin 4 and Not Boring backend optimizations. Quantify using latency (4x faster, from 800ms+ to sub-200ms), scale (50+ daily active users, 5+ developers led), and security metrics.
3. **Core Featured Projects:** Focus specifically on **gobetter.dev** and **copy-env**.
4. **Highlight Technical Writing:** Include the 3 key technical articles (HTTP QUERY, LLM degradation, AI agent repo structure).
5. **Education Section at End:** Place **MIT World Peace University, Pune (2023 – 2026)** and **Bharatiya Public School, Rajasthan (2021 – 2023)** cleanly at the bottom.
6. **Enforce Target Typography:**
   * For **Modern Tech, Startups, & All US Companies**: strictly use **Inter**.
   * For **Legacy Enterprise Mammoths (Banking, Defense, Fortune 100)**: strictly use **Arial** (or **Calibri**).
7. **Follow ATS Invariants:** Single-column layout, standard headers, contact info in main flow, zero icons, clean bullet structure following Google's XYZ formula.
