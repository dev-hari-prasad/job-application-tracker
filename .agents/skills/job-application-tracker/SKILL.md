---
name: job-application-tracker
description: >-
  Comprehensive guide and protocol for AI agents to interact with the Job Application Command Center. Use this skill to query existing applications, record new job submissions, update recruiter communication statuses, log notes, and prevent duplicate applications via REST API or direct Postgres connection.
---

# Job Application Command Center — Agent Skill

Use this skill whenever you are tasked with:
1. Applying to a job on behalf of the user.
2. Checking whether the user has already applied to a company or position.
3. Logging recruiter/HR correspondence (outreach, replies, interview bookings).
4. Updating application lifecycle states (Screening, Interviewing, Offer, Rejection).

---

## 1. System Architecture & Base URLs

Depending on where the agent is running:
- **Local Dev Server:** `http://localhost:3001`
- **Production Server / Vercel:** `https://<deployed-vercel-domain>.vercel.app`

### Authentication & Passcode Lock
If the platform has the `LOCK` passcode enabled, **all** API requests must include the `x-lock-passcode` header:
```http
x-lock-passcode: <configured-passcode>
```
If no `LOCK` is configured, requests succeed without authentication headers.

---

## 2. Agent Decision Protocols & Workflows

### Workflow A: Pre-Application Deduplication (Always Check First!)
Before applying to a company, query the database to verify if an application already exists:
1. Send `GET /api/jobs`
2. Filter the JSON response for matching `company` (case-insensitive)
3. If an application already exists within the last 90 days:
   - **Do not submit a duplicate application.**
   - Notify the user or update the existing record if this is a different role.

### Workflow B: Recording a New Job Application
Immediately after submitting an application (via LinkedIn, Wellfound, company careers portal, or direct referral):
1. Send `POST /api/jobs` with the job details.
2. Ensure `date_applied` matches the submission date (`YYYY-MM-DD`).
3. Set `hr_contact_status` to `"Pending"` (unless the agent already contacted a recruiter directly, in which case use `"Contacted"`).

### Workflow C: Updating Status on Recruiter Contact / Interview
When an email, LinkedIn InMail, or message is received from HR or a hiring manager:
1. Find the application `id` from `GET /api/jobs`.
2. Send `PATCH /api/jobs/:id` updating `status` and `hr_contact_status`.
3. Append any relevant interview context or recruiter names in `notes`.

---

## 3. REST API Specification

### Endpoint: `GET /api/jobs`
Fetch all applications ordered by newest first.

**Headers:**
- `x-lock-passcode: <passcode>` *(if LOCK is set)*

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "company": "Stripe",
    "role": "Backend / Systems Engineer",
    "platform": "LinkedIn",
    "status": "Interviewing",
    "hr_contact_status": "Replied",
    "notes": "Recruiter Jane reached out; screening scheduled for Monday",
    "date_applied": "2026-09-11",
    "created_at": "2026-09-11T17:12:41.677Z",
    "updated_at": "2026-09-11T17:44:15.068Z"
  }
]
```

---

### Endpoint: `POST /api/jobs`
Record a new application.

**Request Payload:**
```json
{
  "company": "Supabase",
  "role": "Database Infrastructure Engineer",
  "platform": "Direct",
  "status": "Applied",
  "hr_contact_status": "Pending",
  "notes": "Applied via Supabase careers page. Highlighted pgAdmin 4 contributions.",
  "date_applied": "2026-09-11"
}
```

**Field Rules:**
- `company` (string, **required**): Name of organization.
- `role` (string, **required**): Job title.
- `platform` (string, optional): Submission source (`"LinkedIn"`, `"Wellfound"`, `"Direct"`, `"Indeed"`, `"Referral"`). Defaults to `"LinkedIn"`.
- `status` (string, optional): One of:
  - `"Applied"` (Default)
  - `"Screening"`
  - `"Interviewing"`
  - `"Offer"`
  - `"Rejected"`
  - `"Withdrawn"`
- `hr_contact_status` (string, optional): One of:
  - `"Pending"` (Default — no contact yet)
  - `"Contacted"` (Outreach message sent to recruiter)
  - `"Replied"` (Recruiter replied)
  - `"Ghosted"` (No reply after follow-up)
- `notes` (string, optional): Freeform text, recruiter contact info, referral context.
- `date_applied` (string, optional): Date formatted `YYYY-MM-DD`. Defaults to current date.

---

### Endpoint: `PATCH /api/jobs/:id`
Update an existing application record.

**Request Payload:** (Include only the fields to modify)
```json
{
  "status": "Interviewing",
  "hr_contact_status": "Replied",
  "notes": "Technical screening cleared. System design round on Friday."
}
```

---

### Endpoint: `DELETE /api/jobs/:id`
Remove an accidental duplicate or withdrawn application.

---

## 4. Code Examples for Agents

### cURL
```bash
# Record application
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -H "x-lock-passcode: secret123" \
  -d '{"company":"Datadog","role":"Systems Engineer","platform":"LinkedIn","status":"Applied","hr_contact_status":"Pending"}'

# Update status
curl -X PATCH http://localhost:3001/api/jobs/2 \
  -H "Content-Type: application/json" \
  -H "x-lock-passcode: secret123" \
  -d '{"status":"Screening","hr_contact_status":"Replied","notes":"Recruiter phone screen scheduled"}'
```

### Node.js (fetch)
```javascript
const BASE_URL = process.env.JOB_TRACKER_URL || 'http://localhost:3001';
const PASSCODE = process.env.LOCK || '';

async function recordJob(jobData) {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(PASSCODE ? { 'x-lock-passcode': PASSCODE } : {})
    },
    body: JSON.stringify(jobData)
  });
  return await res.json();
}
```

### Python (requests)
```python
import os
import requests

BASE_URL = os.getenv("JOB_TRACKER_URL", "http://localhost:3001")
PASSCODE = os.getenv("LOCK", "")

headers = {"Content-Type": "application/json"}
if PASSCODE:
    headers["x-lock-passcode"] = PASSCODE

def record_application(company, role, platform="LinkedIn", notes=""):
    payload = {
        "company": company,
        "role": role,
        "platform": platform,
        "status": "Applied",
        "hr_contact_status": "Pending",
        "notes": notes
    }
    response = requests.post(f"{BASE_URL}/api/jobs", json=payload, headers=headers)
    return response.json()
```

---

## 5. Direct Neon Database Fallback

If the web service is unreachable, use direct connection via `DATABASE_URL`:
```sql
INSERT INTO job_applications (company, role, platform, status, hr_contact_status, notes, date_applied)
VALUES ('Cloudflare', 'Systems Engineer', 'Direct', 'Applied', 'Pending', 'Applied via site', CURRENT_DATE);
```