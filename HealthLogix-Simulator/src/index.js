import { Simulator } from './simulator/simulator.js';
import { logger } from './utils/logger.js';

const simulator = new Simulator();

simulator.start().catch((error) => {
  logger.error(error.message);
  process.exitCode = 1;
});
