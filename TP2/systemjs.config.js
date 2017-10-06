/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  let map = {
      'main': './js'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  let packages = {
      'main': { main: 'main.js',  defaultExtension: 'js', format: 'register' }
  };

  let config = {
      map     : map,
      packages: packages
  };

  System.config(config);
})(this);
