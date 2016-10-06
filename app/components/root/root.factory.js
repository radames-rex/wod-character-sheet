angular.module('wodApp').factory('rootFactory', function($scope, $state){
    var initialPage = function() {
        $state.transitionTo('wod.world');
    }
})
