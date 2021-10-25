importScripts("/portfolio/glow/precache-manifest.c582c5c1f89779f2b6c4aad87aceb512.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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

