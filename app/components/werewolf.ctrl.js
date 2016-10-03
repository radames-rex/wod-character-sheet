angular.module('wodApp').controller('werewolfCtrl', function($rootScope, $scope){
  var wolfsSheet = [];

  $scope.addSheet = function(){
    wolfsSheet.push($scope.wolf);
    $rootScope.sheets.push($scope.wolf);
    // $rootScope.sheets.type = 'wolf';
  }

})
