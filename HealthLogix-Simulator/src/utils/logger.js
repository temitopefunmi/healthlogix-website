const formatValue = (value) => {
  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
};

const write = (level, values) => {
  const message = values.map(formatValue).join(' ');
  console.log(`${new Date().toISOString()} [${level}] ${message}`);
};

export const logger = {
  info: (...values) => write('INFO', values),
  warn: (...values) => write('WARN', values),
  error: (...values) => write('ERROR', values),
};
