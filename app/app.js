'use strict';

angular.module('wodApp', [
    'ngRoute',
    'ngMaterial'
]).config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'components/sheets/wod.html',
            controller: 'wodCtrl'
        })
        .when('/angel', {
            templateUrl: 'components/sheets/angel.html',
            controller: 'angelCtrl'
        })
        .when('/changeling', {
            templateUrl: 'components/sheets/changeling.html',
            controller: 'changelingCtrl'
        })
        .when('/demon', {
            templateUrl: 'components/sheets/demon.html',
            controller: 'demonCtrl'
        })
        .when('/hunter', {
            templateUrl: 'components/sheets/hunter.html',
            controller: 'hunterCtrl'
        })
        .when('/mage', {
            templateUrl: 'components/sheets/mage.html',
            controller: 'mageCtrl'
        })
        .when('/mummy', {
            templateUrl: 'components/sheets/mummy.html',
            controller: 'mummyCtrl'
        })
        .when('/vampire', {
            templateUrl: 'components/sheets/vampire.html',
            controller: 'vampireCtrl'
        })
        .when('/wolf', {
            templateUrl: 'components/sheets/werewolf.html',
            controller: 'werewolfCtrl'
        })
        .when('/wraith', {
            templateUrl: 'components/sheets/wraith.html',
            controller: 'wraithCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
