// next-pwa will handle service worker generation automatically
// This file is a placeholder for custom service worker logic

if (typeof window !== 'undefined') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(
        function (registration) {
          console.log('Service Worker registered:', registration);
        },
        function (error) {
          console.log('Service Worker registration failed:', error);
        }
      );
    });
  }
}
