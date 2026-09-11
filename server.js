require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Serve static file
function serveStatic(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Parse JSON helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-lock-passcode');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    // 1. Static Root
    if (pathname === '/' || pathname === '/index.html') {
      const filePath = fs.existsSync(path.join(__dirname, 'index.html'))
        ? path.join(__dirname, 'index.html')
        : path.join(__dirname, 'public', 'index.html');
      serveStatic(res, filePath, 'text/html; charset=utf-8');
      return;
    }

    // 2. Lock Verification Endpoint: /api/verify-lock
    if (pathname === '/api/verify-lock') {
      const configuredLock = process.env.LOCK ? process.env.LOCK.trim() : '';
      if (!configuredLock) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ locked: false, valid: true }));
        return;
      }
      const data = await parseBody(req);
      const userPasscode = (
        req.headers['x-lock-passcode'] || 
        data.passcode || 
        url.searchParams.get('lock') || 
        ''
      ).trim();

      if (userPasscode === configuredLock) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ locked: true, valid: true }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ locked: true, valid: false, error: 'Incorrect passcode' }));
      }
      return;
    }

    // LOCK Check middleware for /api/jobs
    const configuredLock = process.env.LOCK ? process.env.LOCK.trim() : '';
    if (configuredLock) {
      const userPasscode = (
        req.headers['x-lock-passcode'] || 
        url.searchParams.get('lock') || 
        ''
      ).trim();
      if (userPasscode !== configuredLock) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized: Invalid or missing LOCK passcode' }));
        return;
      }
    }

    // 3. GET /api/jobs - List all applications
    if (req.method === 'GET' && pathname === '/api/jobs') {
      const result = await pool.query('SELECT * FROM job_applications ORDER BY created_at DESC');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
      return;
    }

    // 4. POST /api/jobs - Create new application
    if (req.method === 'POST' && pathname === '/api/jobs') {
      const data = await parseBody(req);
      const {
        company,
        role,
        platform = 'LinkedIn',
        status = 'Applied',
        hr_contact_status = 'Pending',
        date_applied = new Date().toISOString().split('T')[0],
        notes = ''
      } = data;

      if (!company || !role) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing required fields: company and role' }));
        return;
      }

      const query = `
        INSERT INTO job_applications (company, role, platform, status, hr_contact_status, date_applied, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [company, role, platform, status, hr_contact_status, date_applied, notes];
      const result = await pool.query(query, values);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows[0]));
      return;
    }

    // 5. PATCH /api/jobs/:id - Update application
    if (req.method === 'PATCH' && pathname.startsWith('/api/jobs/')) {
      const id = pathname.split('/')[3];
      const data = await parseBody(req);
      
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
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'No fields provided to update' }));
        return;
      }

      fields.push(`updated_at = NOW()`);
      values.push(id);

      const query = `
        UPDATE job_applications
        SET ${fields.join(', ')}
        WHERE id = $${idx}
        RETURNING *;
      `;
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Record not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows[0]));
      return;
    }

    // 6. DELETE /api/jobs/:id - Delete application
    if (req.method === 'DELETE' && pathname.startsWith('/api/jobs/')) {
      const id = pathname.split('/')[3];
      await pool.query('DELETE FROM job_applications WHERE id = $1', [id]);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, deletedId: id }));
      return;
    }

    // Not found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));

  } catch (err) {
    console.error('API Error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Job Tracker server running on http://localhost:${PORT}`);
});
