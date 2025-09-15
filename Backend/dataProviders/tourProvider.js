// Returns mocked metrics for tour vertical
export async function getTourMetrics(userId) {
  // in real app: query tour_bookings, reviews etc filtered by userId
  return {
    bookings_count: 120,
    avg_rating: 4.3,
    cancellations_rate: 0.08,
    new_customers: 30
  };
}

export function mapTourToScoreSchema(metrics) {
  return [
    { key: 'bookings_count', value: metrics.bookings_count, min: 0, max: 500, weight: 0.5 },
    { key: 'avg_rating', value: metrics.avg_rating / 5, min: 0, max: 1, weight: 0.3 }, // scale 0..1
    { key: 'cancellations_rate', value: metrics.cancellations_rate, min: 0, max: 1, weight: 0.2, invert: true }
  ];
}
