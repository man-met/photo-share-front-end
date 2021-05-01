// PRECACHING
// eslint-disable-next-line no-undef
workbox.core.setCacheNameDetails({ prefix: 'quickchat-cache' });

self.__precacheManifest = [].concat(self.__precacheManifest || []);

// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// CACHING STRATEGIES - WORKBOX STRATEGIES
workbox.routing.registerRoute(
  ({ url }) => url.host === 'unpkg.com',
  new workbox.strategies.CacheFirst({
    cacheName: 'app-skeleton',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
      }),
    ],
    method: 'GET',
    cacheableResponse: { statuses: [0, 200] },
  })
);

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

// EVENTS NOTIFICATIONS

self.addEventListener('notificationclick', (event) => {
  let { notification } = event;
  let { action } = event;

  if (action === 'hello') {
    console.log('hello button clicked');
  } else {
    event.waitUntil(
      clients.matchAll().then((clientsArray) => {
        const isClientUsingApp = clientsArray.find((client) => {
          return client.visibilityState === 'visible';
        });
        if (isClientUsingApp) {
          isClientUsingApp.navigate(notification.data.openUrl);
          isClientUsingApp.focus();
        } else {
          clients.openWindow(notification.data.openUrl);
        }
      })
    );
  }
  notification.close();
});

self.addEventListener('notificationclose', (event) => {
  console.log('Notification was closed', event);
});

// Listen for push event

self.addEventListener('push', (event) => {
  console.log('Push message received: ', event);
  if (event.data) {
    const data = JSON.parse(event.data.text());

    // to ensure service worker does not go to sleep and stays alive
    // to listen for push notifications.
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        // icon: require('@/assets/logo.png'),
        // badge: require('@/assets/logo.png'),
        data: {
          openUrl: data.openUrl,
        },
      })
    );
    console.log(data);
  }
});
