const EVENT_TYPES = [
  {
    type: 'Door Open',
    durationTicks: 4,
    impact: { temperatureC: 5, humidityPercent: 8 },
  },
  {
    type: 'Door Closed',
    durationTicks: 2,
    impact: { temperatureC: -1, humidityPercent: -2 },
  },
  {
    type: 'Power Failure',
    durationTicks: 5,
    impact: { temperatureC: 7, voltageV: -180, batteryPercent: -12, airFlowPercent: -40 },
  },
  {
    type: 'Battery Drain',
    durationTicks: 6,
    impact: { batteryPercent: -20 },
  },
  {
    type: 'Sensor Failure',
    durationTicks: 3,
    impact: { temperatureC: 2, humidityPercent: -5, voltageV: 12, airFlowPercent: -8 },
  },
];

export class EventEngine {
  constructor({ eventChance = 0.12 } = {}) {
    this.eventChance = eventChance;
  }

  update(deviceState) {
    if (deviceState.event) {
      deviceState.event.remainingTicks -= 1;

      if (deviceState.event.remainingTicks <= 0) {
        const endedEvent = deviceState.event;
        deviceState.event = null;
        return { endedEvent };
      }

      return {};
    }

    if (Math.random() > this.eventChance) {
      return {};
    }

    const eventTemplate = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
    deviceState.event = { ...eventTemplate };

    return { startedEvent: deviceState.event };
  }
}
