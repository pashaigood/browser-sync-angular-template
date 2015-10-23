;(function() {
  angular
    .module('%MODULE_NAME%')
    .run(function($compile, $templateCache) {
      window.igat = {} || window.igat;
      window.igat['%MODULE_NAME%'] = {
        '$compile': $compile,
        '$templateCache': $templateCache
      };
    });
})();
