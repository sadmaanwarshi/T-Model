import db from '../db.js';
import bcrypt from 'bcrypt';

export async function createUser(name, email, password, role) {
  const hashed = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, industry_type',
    [name, email, hashed, role]
  );
  return result.rows[0];
}

export async function findUserByEmail(email) {
  const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);
  return result.rows[0];
}

export async function getUserById(id) {
  const result = await db.query('SELECT id, name, email, industry_type, role FROM users WHERE id=$1', [id]);
  return result.rows[0];
}

export async function updateUserIndustry(id, industry) {
  const result = await db.query(
    'UPDATE users SET industry_type=$1 WHERE id=$2 RETURNING id, name, email, industry_type',
    [industry, id]
  );
  return result.rows[0];
}
