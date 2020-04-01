const cacheName = 'messanger-app';
const staticAssets = [
    './',
    './style.css',
    './bundle.js',
    './api/*.json',
];

self.addEventListener('activate', event => {
});

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('fetch', async event => {
    const request = event.request;
    const url = new URL(request.url);

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkAndCache(request));
    }
});

async function cacheFirst(request) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    return cached || fetch(request);
}

async function networkAndCache(request) {
    const cache = await caches.open(cacheName);
    try {
        const connect = await fetch(request);
        await cache.put(request, connect.clone());
        return connect;
    } catch (error) {
        return await cache.match(request);
    }
}

self.addEventListener('push', (event) => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Сообщение Push-уведомления';
    }

    const options = {
        body,
        icon: './manifest/magic_tablet_64.png',
        actions: [
            {action: 'explore', title: 'Перейти'},
            {action: 'close', title: 'Закрыть'}
        ],
    };

    event.waitUntil(
        self.registration.showNotification('Заголовок Push-уведомления', options)
    );
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'messanger-app') {
        console.log('Messanger App Sync.');
    }
});