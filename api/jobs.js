const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return pool;
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'object') return req.body;
  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-lock-passcode');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // 1. Lock check (if LOCK env variable is configured)
  const configuredLock = process.env.LOCK ? process.env.LOCK.trim() : '';
  if (configuredLock) {
    const userPasscode = (
      req.headers['x-lock-passcode'] || 
      (req.query && req.query.lock) || 
      ''
    ).trim();
    if (userPasscode !== configuredLock) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or missing LOCK passcode' });
    }
  }

  const p = getPool();
  const body = parseBody(req);
  
  // Extract ID from query or regex match on path or searchParams
  let id = req.query && req.query.id;
  if (!id && req.url) {
    const match = req.url.match(/\/api\/jobs\/([^\/?#]+)/);
    if (match) id = match[1];
  }
  if (!id && req.url) {
    try {
      const u = new URL(req.url, 'http://localhost');
      id = u.searchParams.get('id');
    } catch {}
  }

  try {
    // GET /api/jobs
    if (req.method === 'GET') {
      const result = await p.query('SELECT * FROM job_applications ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    }

    // POST /api/jobs
    if (req.method === 'POST') {
      const {
        company,
        role,
        platform = 'LinkedIn',
        status = 'Applied',
        hr_contact_status = 'Pending',
        date_applied = new Date().toISOString().split('T')[0],
        notes = ''
      } = body;

      if (!company || !role) {
        return res.status(400).json({ error: 'Missing required fields: company and role' });
      }

      const query = `
        INSERT INTO job_applications (company, role, platform, status, hr_contact_status, date_applied, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [company, role, platform, status, hr_contact_status, date_applied, notes];
      const result = await p.query(query, values);
      return res.status(201).json(result.rows[0]);
    }

    // PATCH /api/jobs/:id or /api/jobs?id=:id
    if (req.method === 'PATCH' && id) {
      const data = body;
      const fields = [];
      const values = [];
      let idx = 1;

      if (data.status !== undefined) {
        fields.push(`status = $${idx++}`);
        values.push(data.status);
      }
      if (data.hr_contact_status !== undefined) {
        fields.push(`hr_contact_status = $${idx++}`);
        values.push(data.hr_contact_status);
      }
      if (data.notes !== undefined) {
        fields.push(`notes = $${idx++}`);
        values.push(data.notes);
      }
      if (data.company !== undefined) {
        fields.push(`company = $${idx++}`);
        values.push(data.company);
      }
      if (data.role !== undefined) {
        fields.push(`role = $${idx++}`);
        values.push(data.role);
      }
      if (data.platform !== undefined) {
        fields.push(`platform = $${idx++}`);
        values.push(data.platform);
      }
      if (data.date_applied !== undefined) {
        fields.push(`date_applied = $${idx++}`);
        values.push(data.date_applied);
      }

      if (fields.length === 0) {
        return res.status(400).json({ error: 'No fields provided to update' });
      }

      fields.push(`updated_at = NOW()`);
      values.push(id);

      const query = `
        UPDATE job_applications
        SET ${fields.join(', ')}
        WHERE id = $${idx}
        RETURNING *;
      `;
      const result = await p.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      return res.status(200).json(result.rows[0]);
    }

    // DELETE /api/jobs/:id or /api/jobs?id=:id
    if (req.method === 'DELETE' && id) {
      const deleteResult = await p.query('DELETE FROM job_applications WHERE id = $1 RETURNING id', [id]);
      if (deleteResult.rowCount === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      return res.status(200).json({ success: true, deletedId: id });
    }

    return res.status(404).json({ error: 'Endpoint not found' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message });
  }
};
