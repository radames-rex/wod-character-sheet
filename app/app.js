'use strict';

  angular.module('wodApp',[
    'ngRoute',
    'ngMaterial'
  ]).config(function($routeProvider){
    $routeProvider
      .when('/vampire',{
        templateUrl: 'components/sheets/vampire.html',
        controller: 'vampireCtrl'
      })
      .when('/wolf',{
        templateUrl: 'components/sheets/werewolf.html',
        controller: 'werewolfCtrl'
      })
      .otherwise({
        redirectTo: '/vampire'
      })
  })
  angular.module('wodApp').controller('worldCtrl', function($rootScope, $scope){
    $scope.sheets = [];
    $rootScope.sheets = [];
    $scope.sheets = $rootScope.sheets;
  })
