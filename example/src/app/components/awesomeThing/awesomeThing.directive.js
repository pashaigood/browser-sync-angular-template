(function() {
  'use strict';

  angular
    .module('example')
    .directive('awesomeThing', awesomeThing);

  /** @ngInject */
  function awesomeThing() {
    var directive = {
      restrict: 'A',
      scope: {
        awesomeThing: '='
      },
      templateUrl: 'app/components/awesomeThing/awesomeThing.html'
      //link: linkFunc,
      //controller: MalarkeyController,
      //controllerAs: 'vm'
    };

    return directive;
  }
})();
