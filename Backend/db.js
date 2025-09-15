// db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,       // e.g. "postgres"
  host: process.env.DB_HOST,       // e.g. "localhost"
  database: process.env.DB_NAME,   // your db name
  password: process.env.DB_PASSWORD, // your db password
  port: process.env.DB_PORT || 5432, // default PostgreSQL port
});

// Query helper function
export async function query(text, params) {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
}

export default pool;
