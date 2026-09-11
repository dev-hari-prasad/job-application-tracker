# Job Application Command Center

A modern job application tracking dashboard backed by **Neon PostgreSQL** and built with **Tailwind CSS**, **Node.js**, and **Vercel Serverless Functions**. Designed for personal tracking and autonomous AI agents.

---

## Features

- **Neon PostgreSQL Persistence**: Serverless connection pooling with SSL resilience.
- **Access Lock Layer (`LOCK`)**: Passcode security protecting the frontend and REST endpoints.
- **Inline Editing**:
  - HTML5 native date picker per row for `date_applied`.
  - Instant dropdowns for `status` and `hr_contact_status`.
  - Inline text editor for `notes` (recruiter outreach, screening feedback).
- **Search & Multi-Filter**: Filter applications in real time by search query, status, HR contact status, and date.
- **Autonomous AI Agent API**: Clean REST API (`/api/jobs`) allowing AI agents to record applications and log recruiter interactions automatically.
- **Vercel-Ready**: Pre-configured `vercel.json` and serverless handlers for zero-friction production hosting.

---

## Tech Stack

- **Frontend**: HTML5, Tailwind CSS (Dark Mode), Inter, JetBrains Mono.
- **Backend / API**: Node.js HTTP Server (`server.js`) & Vercel Serverless Functions (`api/jobs.js`, `api/verify-lock.js`).
- **Database**: Neon Serverless PostgreSQL with `pg` connection pooling.

---

## Quick Start (Local Development)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Copy `.env.example` to `.env` and provide your Neon credentials:
   ```ini
   DATABASE_URL="postgresql://neondb_owner:...@ep-cool-morning-...neon.tech/neondb?sslmode=require"
   LOCK="your_secret_passcode"
   PORT=3001
   ```

3. **Run Dev Server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## Deployment on Vercel

1. **Deploy with Vercel CLI:**
   ```bash
   npx vercel
   ```

2. **Configure Environment Variables in Vercel:**
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `LOCK`: Your access passcode (leave empty to disable the lock screen).

3. **Deploy to Production:**
   ```bash
   npx vercel --prod
   ```

---

## AI Agent Integration

An agent skill is included under `.agents/skills/job-application-tracker.md`.

### Record an Application:
```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -H "x-lock-passcode: your_secret_passcode" \
  -d '{"company":"Stripe","role":"Backend Engineer","platform":"LinkedIn","status":"Applied","hr_contact_status":"Contacted","notes":"Recruiter outreach"}'
```

### Update an Application:
```bash
curl -X PATCH http://localhost:3001/api/jobs/1 \
  -H "Content-Type: application/json" \
  -H "x-lock-passcode: your_secret_passcode" \
  -d '{"status":"Interviewing","hr_contact_status":"Replied","notes":"Screening call scheduled"}'
```

---

## License

MIT