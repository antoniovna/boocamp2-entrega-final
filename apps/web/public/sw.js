const CACHE_NAME = 'multiverse-cache-v1';
// Arquivos essenciais para o "Shell" do App
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

// Instalação: Cacheia o estático
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Ativação: Limpa caches antigos (opcional, mas recomendado)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

// Fetch: Estratégia Híbrida
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Se for API (Dados): Stale-While-Revalidate
  // Mostra o dado velho (cache) enquanto busca o novo no fundo
  if (url.pathname.includes('/api/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 2. Padrão (Imagens/JS/CSS): Cache First
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
         // Opcional: Cachear novas requisições dinamicamente
         return caches.open(CACHE_NAME).then((cache) => {
             cache.put(event.request, networkResponse.clone());
             return networkResponse;
         });
      });
    })
  );
});