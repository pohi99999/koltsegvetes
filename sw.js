const CACHE_NAME = 'penzugyi-koveto-cache-v1';
const urlsToCache = [
  '/',
  '/penzugyi_koveto.html'
];

// Telepítés esemény: a cache feltöltése
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch esemény: a kérések kezelése
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Ha a válasz a cache-ben van, onnan adjuk vissza
        if (response) {
          return response;
        }
        // Különben hálózati kérést indítunk
        return fetch(event.request);
      }
    )
  );
});

// Aktiválás esemény: a régi cache-ek törlése
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
