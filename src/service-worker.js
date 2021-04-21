
// PRECACHING

// eslint-disable-next-line no-undef
workbox.core.setCacheNameDetails({ prefix: 'quickchat-cache' });

self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// CACHING STRATEGIES
workbox.routing.registerRoute(
  new RegExp('http'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'all-assets',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
      }),
    ],
    method: 'GET',
    cacheableResponse: { statuses: [0, 200] },
  })
);
