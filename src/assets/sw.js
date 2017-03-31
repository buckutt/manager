self.addEventListener('install', (e) => {
    e.waitUntil(
    caches.open('pwa').then(cache => cache.addAll([
        '/',
        '/build.js',
        '/font.css',
        '/fonts/MaterialIcons-Regular.eot',
        '/fonts/MaterialIcons-Regular.ttf',
        '/fonts/MaterialIcons-Regular.woff',
        '/fonts/MaterialIcons-Regular.woff2',
        '/fonts/Roboto_300.eot',
        '/fonts/Roboto_300.svg',
        '/fonts/Roboto_300.ttf',
        '/fonts/Roboto_300.woff',
        '/fonts/Roboto_400.eot',
        '/fonts/Roboto_400.svg',
        '/fonts/Roboto_400.ttf',
        '/fonts/Roboto_400.woff',
        '/fonts/Roboto_700.eot',
        '/fonts/Roboto_700.svg',
        '/fonts/Roboto_700.ttf',
        '/fonts/Roboto_700.woff',
        '/images/icon144.png',
        '/images/icon168.png',
        '/images/icon192.png',
        '/images/icon256.png',
        '/images/icon48.png',
        '/images/icon72.png',
        '/images/icon96.png'
    ])
      .then(() => self.skipWaiting()))
  );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
