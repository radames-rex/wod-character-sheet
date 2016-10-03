angular.module('wodApp',['ngRoute'])
angular.module('wodApp').config(function($routeProvider){
  $routeProvider
    .when('/vampire/:type',{
      templateUrl: 'components/sheets/vampire.html',
      controller: 'vampireCtrl'
    })
    .when('/wolf',{
      templateUrl: 'components/sheets/werewolf.html',
      controller: 'werewolfCtrl'
    })
})
angular.module('wodApp').controller('worldCtrl', function($rootScope, $scope){
  $scope.sheets = [];
  $rootScope.sheets = [];
  $scope.sheets = $rootScope.sheets;

})
