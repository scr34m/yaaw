const CACHE_VERSION = "2018-01-04T19:27:43";
const URLS = [
    "./index.html",
    "./css/main.css",
    "./css/bootstrap.min.css",
    "./css/bootstrap-responsive.min.css",
    "./img/favicon.ico",
    "./img/glyphicons-halflings-white.png",
    "./img/glyphicons-halflings.png",
    "./js/jquery-1.7.2.min.js",
    "./js/bootstrap.min.js",
    "./js/jquery.jsonrpc.js",
    "./js/jquery.Storage.js",
    "./js/jquery.base64.min.js",
    "./js/mustache.js",
    "./js/peerid.js",
    "./js/aria2.js",
    "./js/yaaw.js",
];

self.addEventListener("install", event => {
    const done = caches.open(CACHE_VERSION).then(cache => cache.addAll(URLS));
    event.waitUntil(done);
});

self.addEventListener("activate", event => {
    const done = caches.keys().then(keyList => {
        const cs = keyList
            .filter(key => key !== CACHE_VERSION)
            .map(key => caches.delete(key));
        return Promise.all(cs);
    });
    event.waitUntil(done);
});

self.addEventListener("fetch", event => {
    if (event.request.url.match(/jsonrpc/)) return;
    const done = caches
        .match(event.request)
        .then(resp => resp || fetch(event.request));
    event.respondWith(done);
});
