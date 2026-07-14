import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { getProfile } from './profiles.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const devicesPath = join(currentDir, '..', 'config', 'devices.json');

export const loadDevices = async () => {
  const file = await readFile(devicesPath, 'utf8');
  const devices = JSON.parse(file);

  return devices
    .filter((device) => device.Enabled)
    .map((device) => ({
      ...device,
      profile: getProfile(device.Profile),
    }));
};
