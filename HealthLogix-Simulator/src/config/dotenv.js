import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export const loadDotenv = (filePath = resolve(process.cwd(), '.env')) => {
  if (!existsSync(filePath)) {
    return;
  }

  const file = readFileSync(filePath, 'utf8');

  file.split('\n').forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf('=');

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
};
