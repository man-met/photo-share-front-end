exports.timeSince = (createdAt) => {
  createdAt = new Date(createdAt).getTime();
  const timeElapsed = Date.now() - createdAt;
  const seconds = timeElapsed / 1000;

  let interval = seconds / 31536000;

  // for years
  // if (interval > 1) {
  //   return Math.floor(interval) + ' years';
  // }

  if (interval > 1) {
    const year = new Date(createdAt).getFullYear();
    const month = new Date(createdAt).toLocaleString('en-GB', {
      month: 'long',
    });
    const day = new Date(createdAt).getDay();

    return `${month.toUpperCase()} ${day}, ${year}`;
  }

  // for months
  // interval = seconds / 2592000;
  // if (interval > 1) {
  //   return Math.floor(interval) + ' months';
  // }

  interval = seconds / 2592000;
  if (interval > 1) {
    const date = new Date(createdAt);

    const day = date.toLocaleString('en-GB', {
      day: 'numeric',
    });
    const month = date.toLocaleString('en-GB', {
      month: 'long',
    });
    return `${month.toUpperCase()} ${day}`;
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' day(s) ago';
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }

  return Math.floor(seconds) + ' seconds ago';
};

exports.urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

exports.displayGrantedNotification = () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then((swreg) => {
      swreg.showNotification('You are subscribed to notifications', {
        body: 'Thanks for subscribing!',
        image: require('@/assets/logo.png'),
        icon: require('@/assets/logo.png'),
        badge: require('@/assets/logo.png'),
        dir: 'ltr',
        lang: 'en-US',
        vibrate: [100, 50, 200],
        tag: 'confirm-notification',
        renotify: true,
        actions: [
          {
            action: 'hello',
            title: 'Hello',
            icons: require('@/assets/logo.png'),
          },
        ],
      });
    });
  }
};
