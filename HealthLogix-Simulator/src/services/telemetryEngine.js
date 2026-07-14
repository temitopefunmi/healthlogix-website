const roundToPrecision = (value, precision) => Number(value.toFixed(precision));
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getInitialMeasurements = (profile) => Object.fromEntries(
  Object.entries(profile.measurements).map(([measurement, settings]) => [
    measurement,
    settings.ideal,
  ]),
);

export class TelemetryEngine {
  constructor(devices) {
    this.deviceStates = devices.map((device) => ({
      device,
      measurements: getInitialMeasurements(device.profile),
      event: null,
    }));
  }

  generate() {
    return this.deviceStates.map((deviceState) => {
      const { device, event } = deviceState;
      const readings = {};

      Object.entries(device.profile.measurements).forEach(([measurement, settings]) => {
        const previousValue = deviceState.measurements[measurement];
        const eventImpact = event?.impact[measurement] ?? 0;
        const target = settings.ideal + eventImpact;
        const drift = (target - previousValue) * device.profile.driftSpeed;
        const noise = (Math.random() - 0.5) * settings.noise;
        const nextValue = clamp(previousValue + drift + noise, settings.min, settings.max);

        readings[measurement] = roundToPrecision(nextValue, settings.precision);
      });

      deviceState.measurements = readings;

      return {
        timestamp: new Date().toISOString(),
        deviceId: device.DeviceId,
        deviceName: device.DeviceName,
        deviceType: device.DeviceType,
        event: event?.type ?? null,
        readings,
      };
    });
  }
}
