(function (bs) {
  var EVENT_NAME = "%EVENT%";
  var sockets = bs.socket;

  // TODO: Поулчать имя шаблона.
  var templateName = 'app/components/navbar/navbar.html';

  sockets.on(
    EVENT_NAME, function (data) {
      console.log('client: hi', data);
      var domElement = document.querySelector(data.selector);
      var element = angular.element(domElement);
      var scope = element.scope();

      //var $injector = angular.injector(['ng']);

      // TODO: Заменить на имя приложения.
      $compile = window.igat['example'].$compile;
      $templateCache = window.igat['example'].$templateCache;

      console.log($compile, $templateCache.get('app/components/navbar/navbar.html'));
      //$injector.invoke(function($rootScope, $compile) {
      $templateCache.remove(templateName);
      $templateCache.set(templateName, data.content);

      scope.$apply(function() {
        var newElement = $compile(data.content)(scope);
        element.replaceWith(newElement);
        element = null;
        newElement = null;
        scope = null;
        domElement = null;
        console.log('ok!');
      });
      //});
    }
  );

})(window.___browserSync___);

(function(){

})();
