'use strict';

// Create a global 'pyb' wrapper
window.pyb = {};

// Set a relative URL for JavaScript
pyb.url = '/';

// Preload 'loading' image
pyb.preloader_image = new Image();
pyb.preloader_image.src = awd.BASE_URL + 'img/loading.svg';

// Import modules
(function () {
  console.log('Loaded...');
})();