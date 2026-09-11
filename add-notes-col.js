require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function addNotesColumn() {
  const client = await pool.connect();
  try {
    await client.query(`
      ALTER TABLE job_applications
      ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
    `);
    console.log('Successfully added notes column to job_applications table');
  } finally {
    client.release();
    await pool.end();
  }
}

addNotesColumn().catch(err => {
  console.error('Error adding column:', err.message);
  process.exit(1);
});
