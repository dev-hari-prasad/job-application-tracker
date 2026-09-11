require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id SERIAL PRIMARY KEY,
        date_applied DATE NOT NULL DEFAULT CURRENT_DATE,
        company VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        platform VARCHAR(100) NOT NULL DEFAULT 'LinkedIn',
        status VARCHAR(50) NOT NULL DEFAULT 'Applied',
        hr_contact_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_job_applications_created ON job_applications(created_at DESC);
    `);
    console.log('Migration successful: job_applications table created/verified');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(e => {
  console.error('Migration failed:', e.message);
  process.exit(1);
});
