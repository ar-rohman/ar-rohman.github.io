importScripts("/portfolio/glow/precache-manifest.65238fbd79ea627bf65d8cc8280f728e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
workbox.core.setCacheNameDetails({
    prefix: 'Glow',
});

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
    // /http:\/\/openweathermap\.org\/img\/wn/,
    new RegExp('http://openweathermap\\.org/img/wn/.*\\.png'),
    new workbox.strategies.CacheFirst(),
);

