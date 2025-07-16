const CACHE_NAME = 'native-web-app-v1';
const STATIC_ASSETS = [
	'/',
	'/dashboard',
	'/profile',
	'/chat',
	'/glass',
	'/settings',
	'/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				console.log('Caching static assets');
				return cache.addAll(STATIC_ASSETS);
			})
			.then(() => {
				console.log('Service worker installed');
				return self.skipWaiting();
			})
	);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames
						.filter((cacheName) => cacheName !== CACHE_NAME)
						.map((cacheName) => caches.delete(cacheName))
				);
			})
			.then(() => {
				console.log('Service worker activated');
				return self.clients.claim();
			})
	);
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
	// Skip non-GET requests
	if (event.request.method !== 'GET') return;
	
	// Skip chrome-extension and other non-http requests
	if (!event.request.url.startsWith('http')) return;
	
	event.respondWith(
		caches.match(event.request)
			.then((cachedResponse) => {
				if (cachedResponse) {
					// Serve from cache
					return cachedResponse;
				}
				
				// Fetch from network
				return fetch(event.request)
					.then((response) => {
						// Check if we received a valid response
						if (!response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}
						
						// Clone the response
						const responseToCache = response.clone();
						
						// Cache the response
						caches.open(CACHE_NAME)
							.then((cache) => {
								cache.put(event.request, responseToCache);
							});
						
						return response;
					})
					.catch(() => {
						// Network failed, try to serve offline page for navigation requests
						if (event.request.mode === 'navigate') {
							return caches.match('/');
						}
						throw new Error('Network failed and no cache available');
					});
			})
	);
});

// Push notification event
self.addEventListener('push', (event) => {
	if (!event.data) return;
	
	const data = event.data.json();
	const options = {
		body: data.body || 'You have a new message',
		icon: '/icon-192.png',
		badge: '/icon-192.png',
		tag: data.tag || 'default',
		data: data.data || {},
		actions: [
			{
				action: 'view',
				title: 'View',
				icon: '/icon-192.png'
			},
			{
				action: 'dismiss',
				title: 'Dismiss'
			}
		],
		requireInteraction: false,
		silent: false
	};
	
	event.waitUntil(
		self.registration.showNotification(data.title || 'Native Web App', options)
	);
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
	event.notification.close();
	
	if (event.action === 'view') {
		// Open the app
		event.waitUntil(
			self.clients.openWindow('/')
		);
	} else if (event.action === 'dismiss') {
		// Just close the notification
		return;
	} else {
		// Default action - open the app
		event.waitUntil(
			self.clients.openWindow('/')
		);
	}
});

// Background sync event
self.addEventListener('sync', (event) => {
	if (event.tag === 'background-sync') {
		console.log('Background sync triggered');
		// Handle background sync tasks here
	}
});

// Message event - communication with main thread
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});