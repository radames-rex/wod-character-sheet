angular.module('wodApp').controller('vampireCtrl', function($rootScope, $scope, $routeParams) {
    var vampiresSheet = [];
    $scope.addSheet = function() {
        vampiresSheet.push($scope.vampire);
        $rootScope.sheets.push($scope.vampire);
    }
})
