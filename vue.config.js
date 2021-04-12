module.exports = {
  runtimeCompiler: true,
  pwa: {
    name: 'QuickChat-service-worker',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
  },
};
