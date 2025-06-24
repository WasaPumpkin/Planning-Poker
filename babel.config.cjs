// eslint-disable-next-line no-undef
// babel.config.js
// babel.config.cjs (note the .cjs extension)
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // Target the current version of Node for Jest
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript', // <-- ADD THIS
  ],
};