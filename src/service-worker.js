// DEPENDENCIES

import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

import { Queue } from 'workbox-background-sync';

// PRECACHING

// eslint-disable-next-line no-undef
workbox.core.setCacheNameDetails({ prefix: 'quickchat-cache' });

self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// CACHING STRATEGIES

// stalewhilerevalidate

registerRoute(
  ({ url }) => url.pathname.startsWith('http'),
  new StaleWhileRevalidate()
);

// BACKGROUND SYNC

// create posts

const createPostQueue = new Queue('create-post-queue');

self.addEventListener('fetch', (event) => {
  // Clone the request to ensure it's safe to read when
  // adding to the Queue.
  const promiseChain = fetch(event.request.clone()).catch((err) => {
    console.log(err);
    return createPostQueue.pushRequest({ request: event.request });
  });

  event.waitUntil(promiseChain);
});
