self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  const action = event.action;
  const notification = event.notification;

  if (action && action.startsWith('check_')) {
    const hid = action.replace('check_', '');
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'TOGGLE_HABIT_FROM_NOTI', hid: hid });
        });
      })
    );
  }
  notification.close();
});
