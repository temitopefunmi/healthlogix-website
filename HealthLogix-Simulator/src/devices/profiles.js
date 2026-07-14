import freezer from './profiles/freezer.js';
import generator from './profiles/generator.js';
import hvac from './profiles/hvac.js';

const profiles = new Map([
  [freezer.name, freezer],
  [generator.name, generator],
  [hvac.name, hvac],
]);

export const getProfile = (profileName) => {
  const profile = profiles.get(profileName);

  if (!profile) {
    throw new Error(`Unknown device profile: ${profileName}`);
  }

  return profile;
};
