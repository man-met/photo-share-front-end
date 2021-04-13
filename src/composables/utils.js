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
