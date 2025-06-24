// jest.config.js
// jest.config.js
export default {
  // ... other config
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // <-- ADD THIS SECTION
  },
  collectCoverageFrom: [
    // ... your coverage rules
  ],
};