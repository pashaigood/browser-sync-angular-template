(function (bs) {
  var EVENT_NAME = "%EVENT%";
  var sockets = bs.socket;

  sockets.on(
    EVENT_NAME, function (data) {
      var $compile = window.igat.$compile,
          $templateCache = window.igat.$templateCache;

      var domElement = document.querySelector(data.selector);
      var templateUrl = data.templateUrl;

      if (! domElement) {
        console.info('[AT] Can\'t find element by selector ' + data.selector);
        return false;
      }

      var element = angular.element(domElement);
      var scope = element.scope();




      var searching = [templateUrl, templateUrl.slice(1)];
      while (searching.length) {
        templateUrl = searching.pop();

        if ($templateCache.get(templateUrl)) {
          break;
        }
      }

      if (! $templateCache.get(templateUrl)) {
        console.info('[AT] Can\'t find template ' + templateUrl);
        return false;
      }
      $templateCache.remove(templateUrl);
      $templateCache.put(templateUrl, data.template);

      scope.$apply(function() {
        var newElement = $compile(data.template)(scope);
        element.replaceWith(newElement);
        element = null;
        newElement = null;
        scope = null;
        domElement = null;
      });
    }
  );

})(window.___browserSync___);
