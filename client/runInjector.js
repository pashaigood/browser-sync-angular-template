;(function() {
  angular
    .module('%MODULE_NAME%')
    .run(function($compile, $templateCache) {
      window.igat = {
        '$compile': $compile,
        '$templateCache': $templateCache
      };
    });
})();
