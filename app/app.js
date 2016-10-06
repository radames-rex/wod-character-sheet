'use strict';

angular.module('wodApp', [
    'ngMaterial',
    'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('wod', {
            abstract: true,
            url: '/wod',
            templateUrl: 'components/root/root.html',
        })
        .state('wod.world', {
            url: '/world',
            templateUrl: 'components/world/world.html',
            controller: 'worldCtrl'
        })
        .state('wod.player', {
            url: '/player',
            templateUrl: 'components/world/player/player.html',
            // controller: 'worldCtrl'
        })
        .state('wod.master', {
            url: '/master',
            templateUrl: 'components/world/master/master.html',
            // controller: 'worldCtrl'
        })
        .state('wod.angel', {
            url: '/angel',
            templateUrl: 'components/sheets/angel.html',
            controller: 'angelCtrl'
        })
        .state('wod.changeling', {
            url: '/changeling',
            templateUrl: 'components/sheets/changeling.html',
            controller: 'changelingCtrl'
        })
        .state('wod.demon', {
            url: '/demon',
            templateUrl: 'components/sheets/demon.html',
            controller: 'demonCtrl'
        })
        .state('wod.hunter', {
            url: '/hunter',
            templateUrl: 'components/sheets/hunter.html',
            controller: 'hunterCtrl'
        })
        .state('wod.mage', {
            url: '/mage',
            templateUrl: 'components/sheets/mage.html',
            controller: 'mageCtrl'
        })
        .state('wod.mummy', {
            url: '/mummy',
            templateUrl: 'components/sheets/mummy.html',
            controller: 'mummyCtrl'
        })
        .state('wod.vampire', {
            url: '/vampire',
            templateUrl: 'components/sheets/vampire.html',
            controller: 'vampireCtrl'
        })
        .state('wod.wolf', {
            url: '/wolf',
            templateUrl: 'components/sheets/werewolf.html',
            controller: 'werewolfCtrl'
        })
        .state('wod.wraith', {
            url: '/wraith',
            templateUrl: 'components/sheets/wraith.html',
            controller: 'wraithCtrl'
        });

        $urlRouterProvider.otherwise(function () {
          return '/wod/world';
        });
});
