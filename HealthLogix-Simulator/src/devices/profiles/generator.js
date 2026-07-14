export default {
  name: 'generator',
  updateIntervalMs: 10_000,
  driftSpeed: 0.12,
  measurements: {
    voltageV: {
      ideal: 230,
      min: 0,
      max: 260,
      precision: 1,
      noise: 0.9,
    },
    fuelPercent: {
      ideal: 82,
      min: 0,
      max: 100,
      precision: 1,
      noise: 0.25,
    },
    batteryPercent: {
      ideal: 96,
      min: 0,
      max: 100,
      precision: 1,
      noise: 0.15,
    },
  },
};
