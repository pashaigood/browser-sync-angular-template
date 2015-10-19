(function (bs) {
  var EVENT_NAME = "%EVENT%";
  var sockets = bs.socket;


  sockets.on(
    EVENT_NAME, function (data) {
      console.log('client: hi', data);
      var domElement = document.querySelector(data.selector);
      var element = angular.element(domElement);
      var scope = element.scope();

      var $injector = angular.injector(['ng']);

      $injector.invoke(function($rootScope, $compile) {
        scope.$apply(function() {
          var newElement = $compile(data.content)(scope);
          element.replaceWith(newElement);
          element = null;
          newElement = null;
          scope = null;
          domElement = null;
          console.log('ok!');
        });
      });
    }
  );

})(window.___browserSync___);

