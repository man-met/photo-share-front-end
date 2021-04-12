module.exports = {
  pwa: {
    name: 'QuickChat-service-worker',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
  },
};
