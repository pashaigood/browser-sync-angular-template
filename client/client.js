(function (bs) {
  var EVENT_NAME = "%EVENT%";
  var sockets = bs.socket;

  sockets.on(EVENT_NAME, function (data) {
      var $compile = window.igat.$compile,
          $templateCache = window.igat.$templateCache,
          templateUrl = findTemplate(data.templateUrl, $templateCache),
          element,
          scope,
          newElement;

      if (! templateUrl) {
        console.info('[AT] Can\'t find template ' + data.templateUrl);
        return false;
      }

      var domElements = document.querySelectorAll(data.selector);

      if (! domElements.length) {
        console.info('[AT] Can\'t find element by selector ' + data.selector);
        return false;
      }

      $templateCache.remove(templateUrl);
      $templateCache.put(templateUrl, data.template);

      angular.forEach(domElements, function(domElement) {

        element = angular.element(domElement);
        scope = element.scope();

        scope.$apply(function() {
          newElement = $compile(data.template)(scope);
          element.replaceWith(newElement);
          domElement = null;
        });
      });

      element = null;
      newElement = null;
      scope = null;
    }
  );


  function findTemplate(templateUrl, $templateCache) {
    var searching = [templateUrl, templateUrl.slice(1)];
    while (searching.length) {
      templateUrl = searching.pop();

      if ($templateCache.get(templateUrl)) {
        return templateUrl;
      }
    }

    return false;
  }
})(window.___browserSync___);
