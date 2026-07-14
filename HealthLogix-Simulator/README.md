# HealthLogix Simulator

A lightweight Node.js simulator for HealthLogix devices.

## Features

- ES Modules JavaScript project
- Dotenv configuration support
- Configuration-driven device definitions
- Device behavior profiles
- Gradual drift telemetry engine
- Natural event engine with recovery

Telemetry is generated locally and printed to the console. No external telemetry integration is implemented yet.

## Getting Started

```bash
npm install
npm start
```

Expected startup output includes:

```text
HealthLogix Simulator Started
Loaded 4 devices
```

The simulator then prints telemetry readings every 10 seconds.

## Configuration

Devices are defined in `src/config/devices.json`. Each device includes:

- `DeviceId`
- `DeviceName`
- `Facility`
- `Asset`
- `DeviceType`
- `Profile`
- `Enabled`

Set `TELEMETRY_INTERVAL_MS` in a `.env` file to override profile intervals during local development.
