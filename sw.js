const cacheName = "v1";
const cacheAssets = [
  "index.html",
  "restaurant.html",
  "data/restaurants.json",
  "css/styles.css",
  "js/main.js",
  "js/dbhelper.js",
  "js/restaurant_info.js"
];
  
  self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
    );
  });
  
  self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request, {ignoreSearch:true}).then(response => {
        return response || fetch(event.request);
      })
      .catch(err => console.log(err, event.request))
    );
  });