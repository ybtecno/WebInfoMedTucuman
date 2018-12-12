//Asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_infomedtucuman_pwa';

//Ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './sass/estilos.css',
    './img/favicon.png',
    './img/apple-touch-icon.png',
    './img/ionicons_svg_md-checkmark-circle-outline.svg',
    './img/fondo/bg-resumen.jpg',
    './img//logo/logoinfomedcabecera.png',
    './img//logo/logoinfomedtuc01.png',
    './img/servicios/clinicas.png',
    './img/servicios/especialidades.png',
    './img/servicios/farmacias.gif',
    './img/servicios/laboratorios.jpg',
    './img/servicios/medicos.png',
    './img/servicios/opticas.jpg',
    './img/servicios/ortopedias.jpg',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
];

//Evento Install
//Instalacion del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                  return cache.addAll(urlsToCache)
                              .then(() => {
                                  self.skipWaiting();
                              });              
              })
              .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//Evento Activate
//Que la app funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                  return Promise.all(
                      cacheNames.map(cacheName => {

                          if(cacheWhitelist.indexOf(cacheName) === -1){
                                //Borrar elemntos que no se necesitan
                                return caches.delete(cacheName);
                          }
                      })
                  );
              })
              .then(() => {
                  //Activar cache
                  self.clients.claim();
              })
    );
});

//Evento fetch
self.addEventListener('fetch', e => {

    e.respondWith(
        caches.match(e.request)
              .then(res => {
                  if(res){
                      //Devuelvo datos desde cache
                      return res;
                  }
                  return fetch(e.request);
              })
    );
});