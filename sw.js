var CACHE_NAME = 'my-site-cache-v14';
var urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/js/init.js',
  '/css/style.css',
  '/css/materialize.css',
  '/images/logosmall.png',
  '/images/leatherseats.jpg',
  '/images/logo.png',
  '/images/adventurebus.jpg',
  '/images/IMG_2034.jpg',
  '/images/IMG_2011.jpg',
  '/images/IMG_2051.jpg',
  '/images/IMG_2058.jpg',
  '/images/IMG_2263.jpg',
  '/images/IMG_2034.jpg',
  '/images/governmenthouse.jpg',
  '/js/materialize.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});


// Updating Website - change the var CACHE_NAME in line 1 to my-site-cache-v2, then uncomment this code to have new files loaded and delete old ones from browser cache
// More info at https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#update-a-service-worker

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['my-site-cache-v14'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});