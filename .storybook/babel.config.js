module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    // Explicitly exclude react-refresh plugin
  ],
  env: {
    development: {
      plugins: [
        // No react-refresh plugin in development either
      ]
    }
  }
};