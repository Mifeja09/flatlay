const CACHE = "flatlay-shell-v1";
const SHELL = ["./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const isShellFile = SHELL.some((p) => url.pathname.endsWith(p.replace("./", "/")));
  const isNav = req.mode === "navigate";
  if (!isShellFile && !isNav) return;

  event.respondWith(
    caches.match(isNav ? "./index.html" : req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(isNav ? "./index.html" : req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
