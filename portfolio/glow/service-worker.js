importScripts("/portofolio/glow/precache-manifest.da5063be30f067d002d00385d5ea6519.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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

