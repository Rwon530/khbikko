/**
 * كشري الزعيم - Service Worker
 */

const CACHE_NAME = "zaeem-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./menu.html",
  "./checkout.html",
  "./track.html",
  "./offers.html",
  "./reserve.html",
  "./careers.html",
  "./contact.html",
  "./admin.html",
  "./css/custom.css",
  "./js/data.js",
  "./js/store.js",
  "./js/audio.js",
  "./js/receipt.js",
  "./js/main.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.warn("Service worker precache fallback:", err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Only cache GET requests
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        // Fallback for html pages
        if (e.request.headers.get("accept") && e.request.headers.get("accept").includes("text/html")) {
          return caches.match("./index.html");
        }
      });
    })
  );
});
