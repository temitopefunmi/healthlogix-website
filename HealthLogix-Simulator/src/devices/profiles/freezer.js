export default {
  name: 'freezer',
  updateIntervalMs: 10_000,
  driftSpeed: 0.18,
  measurements: {
    temperatureC: {
      ideal: 4,
      min: -2,
      max: 14,
      precision: 1,
      noise: 0.08,
    },
    humidityPercent: {
      ideal: 60,
      min: 35,
      max: 85,
      precision: 1,
      noise: 0.4,
    },
    batteryPercent: {
      ideal: 98,
      min: 0,
      max: 100,
      precision: 1,
      noise: 0.12,
    },
  },
};
