export async function getTravelMetrics(userId) {
  // mocked
  return {
    reservations_growth: 0.12, // 12% moM
    conversion_rate: 0.025,
    refund_rate: 0.03,
    avg_booking_value: 250
  };
}

export function mapTravelToScoreSchema(metrics) {
  return [
    { key:'reservations_growth', value: metrics.reservations_growth, min: -1, max: 1, weight: 0.4 },
    { key:'conversion_rate', value: metrics.conversion_rate, min: 0, max: 0.1, weight: 0.4 },
    { key:'refund_rate', value: metrics.refund_rate, min: 0, max: 0.2, weight: 0.2, invert: true}
  ];
}
