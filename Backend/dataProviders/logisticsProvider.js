export async function getLogisticsMetrics(userId) {
  // mocked
  return {
    on_time_delivery: 0.8,
    avg_transit_time: 48, // hours
    incidents_count: 1,
    delivery_volume: 200
  };
}

export function mapLogisticsToScoreSchema(metrics) {
  return [
    { key:'on_time_delivery', value: metrics.on_time_delivery, min: 0, max: 1, weight: 0.6 },
    { key:'avg_transit_time', value: metrics.avg_transit_time, min: 10, max: 120, weight: 0.3, invert: true },
    { key:'incidents_count', value: metrics.incidents_count, min: 0, max: 10, weight: 0.1, invert: true}
  ];
}
