import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail, getUserById, updateUserIndustry } from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_demo';

// 🔹 Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const user = await createUser(name, email, password, role);
    // const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'User registered successfully' });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 🔹 Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, industry_type: user.industry_type } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 🔹 Get Profile
router.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await getUserById(payload.userId);
    res.json(user);
  } catch {
    res.status(401).json({ error: 'invalid token' });
  }
});

// 🔹 Update Industry
router.put('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const { industry_type } = req.body;
    const user = await updateUserIndustry(payload.userId, industry_type);
    res.json(user);
  } catch {
    res.status(401).json({ error: 'invalid token' });
  }
});

export default router;
