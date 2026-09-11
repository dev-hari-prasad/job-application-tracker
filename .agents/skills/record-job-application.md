---
name: record-job-application
description: >-
  Allows an AI agent to automatically record and update job applications into the Job Tracker Command Center database via HTTP POST requests to http://localhost:3001/api/jobs.
---

# Record Job Application Skill

Use this skill whenever you apply to a job on behalf of the user or interact with a recruiter / HR agent.

---

## Endpoint Details

* **Method:** `POST`
* **URL:** `http://localhost:3001/api/jobs`
* **Headers:**
  - `Content-Type: application/json`
  - `x-lock-passcode: <your-lock-passcode>` *(required only if `LOCK` environment variable is configured)*

---

## Request Payload Specification

```json
{
  "company": "Stripe",
  "role": "Backend Engineer",
  "platform": "LinkedIn",
  "status": "Applied",
  "hr_contact_status": "Contacted",
  "notes": "Sent personalized note to technical recruiter on LinkedIn mentioning pgAdmin 4 contributions",
  "date_applied": "2026-09-11"
}
```

### Fields:
* **`company`** (string, required): Name of the organization (e.g., `"Stripe"`, `"Vercel"`).
* **`role`** (string, required): Position title (e.g., `"Backend Engineer"`, `"Systems Engineer"`).
* **`platform`** (string, optional): Platform where applied. Defaults to `"LinkedIn"`. (e.g., `"LinkedIn"`, `"Wellfound"`, `"Indeed"`, `"Direct"`).
* **`status`** (string, optional): Current application status. Defaults to `"Applied"`.
  - Values: `"Applied"`, `"Screening"`, `"Interviewing"`, `"Offer"`, `"Rejected"`, `"Withdrawn"`
* **`hr_contact_status`** (string, optional): AI agent or applicant contact status with the HR representative. Defaults to `"Pending"`.
  - Values: `"Pending"`, `"Contacted"`, `"Replied"`, `"Ghosted"`
* **`notes`** (string, optional): Custom remarks, recruiter message summary, or referral details.
* **`date_applied`** (string, optional): Date formatted as `YYYY-MM-DD`. Defaults to current date if omitted.

---

## Execution Examples

### Using cURL:
```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -H "x-lock-passcode: secret123" \
  -d '{"company":"Stripe","role":"Backend Engineer","platform":"LinkedIn","status":"Applied","hr_contact_status":"Contacted","notes":"Recruiter outreach on LinkedIn"}'
```

### Updating an Existing Application:
```bash
curl -X PATCH http://localhost:3001/api/jobs/1 \
  -H "Content-Type: application/json" \
  -H "x-lock-passcode: secret123" \
  -d '{"status":"Interviewing","hr_contact_status":"Replied","notes":"Screening call scheduled for Monday"}'
```
