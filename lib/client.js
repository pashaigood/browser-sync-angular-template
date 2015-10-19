(function (bs) {
  var EVENT_NAME = "%EVENT%";
  var sockets = bs.socket;


  sockets.on(EVENT_NAME, function (data) {
    console.log('client: hi', data);
    var domElement = document.querySelector(data.selector);
    var element = angular.element(domElement);
    var scope = element.scope();

    var $injector = angular.injector(['ng']);

    //$injector.invoke(function($rootScope, $compile, $document) {
      console.log(scope);
      //var newElement = $compile(data.content)(scope);
      var newElement = window._$compile(data.content)(scope);

      element.replaceWith(newElement);
      element = null;
      newElement = null;
      scope = null;
      domElement = null;
      console.log('ok!');
    //});



  });

  console.log(!!angular);
  angular
    .module('example')
    .factory('ngTemplateLoader',function($compile) {
               console.log($compile);
               return {};
             })
    .config(function() {
                console.log(1);
              });
})(window.___browserSync___);
