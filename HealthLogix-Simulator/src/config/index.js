import { loadDotenv } from './dotenv.js';

loadDotenv();

const DEFAULT_TELEMETRY_INTERVAL_MS = 10_000;

export const config = {
  telemetryIntervalMs: Number.parseInt(
    process.env.TELEMETRY_INTERVAL_MS ?? `${DEFAULT_TELEMETRY_INTERVAL_MS}`,
    10,
  ),
};
