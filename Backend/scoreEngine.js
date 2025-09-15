// Simple ScoreEngine used by all verticals
export function normalize(value, min, max) {
  if (min === undefined || max === undefined) return value; // pass-through
  if (max === min) return 0.5;
  return (value - min) / (max - min);
}

/*
 metrics: [
  { key, value, min, max, weight, invert }
 ]
*/
export function calculateScore(metrics = []) {
  let totalWeight = 0;
  let sum = 0;
  for (const m of metrics) {
    const norm = normalize(m.value, m.min, m.max);
    const adjusted = m.invert ? 1 - norm : norm;
    sum += (adjusted * (m.weight ?? 1));
    totalWeight += (m.weight ?? 1);
  }
  if (totalWeight === 0) return 0;
  const score = (sum / totalWeight) * 100;
  return Math.round(score);
}
