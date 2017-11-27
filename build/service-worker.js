"use strict";

function setOfCachedUrls(e) { return e.keys().then(function(e) { return e.map(function(e) { return e.url }) }).then(function(e) { return new Set(e) }) }
var precacheConfig = [
        ["/build/index.html", "8789ca920c2c82adf7126deb5989583f"],
        ["/build/static/css/main.232d0272.css", "9d2df53ffb6961f9a1fdad3e324c2702"],
        ["/build/static/js/main.ffba25f8.js", "6a23f9ec25bcc4076129ce6b4214ea1e"],
        ["/build/static/media/icomoon.4dab502a.woff", "4dab502a804942441226f99dc71599c0"],
        ["/build/static/media/icomoon.81d0af12.svg", "81d0af121a8dd54c2130af69de38b6e0"],
        ["/build/static/media/icomoon.8d39a70c.ttf", "8d39a70c90d4998483606352395f65f9"],
        ["/build/static/media/icomoon.cb2eef5d.eot", "cb2eef5d4994ea9c339c7ff75f007fb7"]
    ],
    cacheName = "sw-precache-v3-sw-precache-webpack-plugin-" + (self.registration ? self.registration.scope : ""),
    ignoreUrlParametersMatching = [/^utm_/],
    addDirectoryIndex = function(e, t) { var n = new URL(e); return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString() },
    cleanResponse = function(e) { return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) { return new Response(t, { headers: e.headers, status: e.status, statusText: e.statusText }) }) : Promise.resolve(e) },
    createCacheKey = function(e, t, n, r) { var a = new URL(e); return r && a.pathname.match(r) || (a.search += (a.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(n)), a.toString() },
    isPathWhitelisted = function(e, t) { if (0 === e.length) return !0; var n = new URL(t).pathname; return e.some(function(e) { return n.match(e) }) },
    stripIgnoredUrlParameters = function(e, t) { var n = new URL(e); return n.hash = "", n.search = n.search.slice(1).split("&").map(function(e) { return e.split("=") }).filter(function(e) { return t.every(function(t) { return !t.test(e[0]) }) }).map(function(e) { return e.join("=") }).join("&"), n.toString() },
    hashParamName = "_sw-precache",
    urlsToCacheKeys = new Map(precacheConfig.map(function(e) { var t = e[0],
            n = e[1],
            r = new URL(t, self.location),
            a = createCacheKey(r, hashParamName, n, /\.\w{8}\./); return [r.toString(), a] }));
self.addEventListener("install", function(e) { e.waitUntil(caches.open(cacheName).then(function(e) { return setOfCachedUrls(e).then(function(t) { return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n) { if (!t.has(n)) { var r = new Request(n, { credentials: "same-origin" }); return fetch(r).then(function(t) { if (!t.ok) throw new Error("Request for " + n + " returned a response with status " + t.status); return cleanResponse(t).then(function(t) { return e.put(n, t) }) }) } })) }) }).then(function() { return self.skipWaiting() })) }), self.addEventListener("activate", function(e) { var t = new Set(urlsToCacheKeys.values());
    e.waitUntil(caches.open(cacheName).then(function(e) { return e.keys().then(function(n) { return Promise.all(n.map(function(n) { if (!t.has(n.url)) return e.delete(n) })) }) }).then(function() { return self.clients.claim() })) }), self.addEventListener("fetch", function(e) { if ("GET" === e.request.method) { var t, n = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
        (t = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, "index.html"), t = urlsToCacheKeys.has(n));!t && "navigate" === e.request.mode && isPathWhitelisted(["^(?!\\/__).*"], e.request.url) && (n = new URL("/build/index.html", self.location).toString(), t = urlsToCacheKeys.has(n)), t && e.respondWith(caches.open(cacheName).then(function(e) { return e.match(urlsToCacheKeys.get(n)).then(function(e) { if (e) return e; throw Error("The cached response that was expected is missing.") }) }).catch(function(t) { return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t), fetch(e.request) })) } });