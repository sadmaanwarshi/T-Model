import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import { query } from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/health-score', healthRoutes);

app.get('/', (req, res) => res.send('T-Model backend running'));

const PORT = process.env.PORT || 4000;

async function ensureDb() {
  // simple check - run migrations if necessary
  try {
    await query('SELECT 1');
    console.log('DB connected');
  } catch (err) {
    console.error('DB error', err);
  }
}

ensureDb().then(() => {
  app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
});
