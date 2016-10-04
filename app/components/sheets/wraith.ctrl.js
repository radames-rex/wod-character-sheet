angular.module('wodApp').controller('vampireCtrl', function($rootScope, $scope, $routeParams){
  var vampiresSheet = [];
  console.log($routeParams.type);
  $scope.addSheet = function(){
    vampiresSheet.push($scope.vampire);
    $rootScope.sheets.push($scope.vampire);
    // $rootScope.sheets.type = 'vampire';
  }

})
