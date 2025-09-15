import { query } from './db.js';

export async function createNotification(userId, type, payload = {}) {
  const res = await query(
    `INSERT INTO notifications(user_id, type, payload) VALUES ($1,$2,$3) RETURNING *`,
    [userId, type, payload]
  );
  return res.rows[0];
}

export async function listNotifications(userId) {
  const res = await query('SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50', [userId]);
  return res.rows;
}

// simple evaluator: create notification if low score or specific criteria
export async function evaluateAndCreate(industry, userId, metrics, score) {
  const created = [];
  if (score < 50) {
    const n = await createNotification(userId, 'warning', { text: `${industry} health is low (${score})`});
    created.push(n);
  }
  // vertical custom checks
  if (industry === 'logistics' && metrics.on_time_delivery !== undefined && metrics.on_time_delivery < 0.85) {
    const n = await createNotification(userId, 'alert', { text: 'On-time delivery dropped below 85%'});
    created.push(n);
  }
  if (industry === 'tour' && metrics.avg_rating !== undefined && metrics.avg_rating < 3.5) {
    const n = await createNotification(userId,'critical',{ text:'Average rating below 3.5' });
    created.push(n);
  }
  return created;
}
