export default {
  name: 'hvac',
  updateIntervalMs: 10_000,
  driftSpeed: 0.14,
  measurements: {
    temperatureC: {
      ideal: 22,
      min: 15,
      max: 32,
      precision: 1,
      noise: 0.12,
    },
    humidityPercent: {
      ideal: 50,
      min: 25,
      max: 80,
      precision: 1,
      noise: 0.5,
    },
    airFlowPercent: {
      ideal: 74,
      min: 0,
      max: 100,
      precision: 1,
      noise: 0.35,
    },
  },
};
