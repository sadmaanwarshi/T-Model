// db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,

  // ✅ FIX 1: Add timeouts to proactively manage connections
  // This helps prevent the server from closing idle connections unexpectedly.
  idleTimeoutMillis: 30000,       // close idle clients after 30 seconds
  connectionTimeoutMillis: 20000, // return an error after 20 seconds if connection could not be established
});

// ✅ FIX 2: Add a global error handler for the pool
// This is crucial for catching errors on idle clients and preventing app crashes.
pool.on('error', (err, client) => {
  console.error('🚨 Unexpected error on idle client', err);
  // You can decide to gracefully shutdown or just log the error.
  // For many apps, just logging is enough as the pool will handle the failed client.
});

// Query helper function
export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
}

export default pool;