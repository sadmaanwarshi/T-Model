import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserById } from '../models/userModel.js';
import { getTourMetrics, mapTourToScoreSchema } from '../dataProviders/tourProvider.js';
import { getTravelMetrics, mapTravelToScoreSchema } from '../dataProviders/travelProvider.js';
import { getLogisticsMetrics, mapLogisticsToScoreSchema } from '../dataProviders/logisticsProvider.js';
import { calculateScore } from '../scoreEngine.js';
import { evaluateAndCreate } from '../notificationService.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_demo';
const router = express.Router();

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

router.post('/', authMiddleware, async (req, res) => {
  const user = await getUserById(req.userId);
  const industry = user?.industry_type ?? 'others';
  let metrics = {};
  let schema = [];
  if (industry === 'tour') {
    metrics = await getTourMetrics(req.userId);
    schema = mapTourToScoreSchema(metrics);
  } else if (industry === 'travel') {
    metrics = await getTravelMetrics(req.userId);
    schema = mapTravelToScoreSchema(metrics);
  } else if (industry === 'logistics') {
    metrics = await getLogisticsMetrics(req.userId);
    schema = mapLogisticsToScoreSchema(metrics);
  } else {
    // default
    metrics = { generic: 1 };
    schema = [{ key: 'generic', value: 1, min: 0, max: 1, weight: 1 }];
  }

  const score = calculateScore(schema);
  const notifications = await evaluateAndCreate(industry, req.userId, metrics, score);

  res.json({
    industry,
    score,
    breakdown: schema,
    metrics,
    notifications
  });
});

export default router;
