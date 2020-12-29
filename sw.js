const CACHE_NAME = 'cache1';
const urlsToCache = [
    'index.html',
    'bundle.js',
    'styles.css',
    'images/JAB-Logo.png',
    'images/JAB_Logo.png',
    'ark_coffee.png',
    'burger.jpg',
    'main.webmanifest'
];

self.addEventListener('install', ev => {

    console.log('Installed the service worker...');
    ev.waitUntil(
        cacheOpened = caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', ev => {
    console.log('Claiming control...');
    return self.clients.claim();
});

self.addEventListener('fetch', ev => {

    console.log(`Service worker intercepted request for: ${ev.request.url}`);
    const url = new URL(ev.request.url);

    ev.respondWith(
        caches.match(ev.request).then(res => {

            if (res) {
                console.log('This is in the cache');
                return res;
            }
            // If it's not in the cache, check the URL
            if (ev.request.url.indexOf("hikar.org/fm/ws/tsvr.php?") != -1) {
                // If it's a web API URL, fetch the response AND cache it
                return fetch(ev.request).then(res2 => {
                    console.log("Caching as matches pattern");
                    return caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(ev.request, res2.clone());
                            return res2;
                        });
                });
            } else {
                return fetch(ev.request);
            }
        })
    )
})
