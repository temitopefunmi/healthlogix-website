import { config } from '../config/index.js';
import { loadDevices } from '../devices/deviceLoader.js';
import { EventEngine } from '../events/eventEngine.js';
import { TelemetryEngine } from '../services/telemetryEngine.js';
import { logger } from '../utils/logger.js';

export class Simulator {
  async start() {
    console.log('HealthLogix Simulator Started');

    const devices = await loadDevices();
    console.log(`Loaded ${devices.length} devices`);

    const telemetryEngine = new TelemetryEngine(devices);
    const eventEngine = new EventEngine();
    const intervalMs = config.telemetryIntervalMs;

    const tick = () => {
      telemetryEngine.deviceStates.forEach((deviceState) => {
        const eventUpdate = eventEngine.update(deviceState);

        if (eventUpdate.startedEvent) {
          logger.info(`${deviceState.device.DeviceId} event started: ${eventUpdate.startedEvent.type}`);
        }

        if (eventUpdate.endedEvent) {
          logger.info(`${deviceState.device.DeviceId} event ended: ${eventUpdate.endedEvent.type}`);
        }
      });

      telemetryEngine.generate().forEach((telemetry) => logger.info(telemetry));
    };

    tick();
    setInterval(tick, intervalMs);
  }
}
