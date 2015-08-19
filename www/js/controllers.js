angular.module('apotd.controllers', ['apotd.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('AboutCtrl', function($scope) {

})

.controller('DayCtrl', function($scope,date,DayService) {
  $scope.request = DayService.getCurrentDay();
  if (date === "") {
    DayService.setDay(new Date()).then(function() {
      $scope.request = DayService.getCurrentDay();
    });
  } else {
    DayService.setDay(new Date(1*date)).then(function() {
      $scope.request = DayService.getCurrentDay();
    });
  }
})

.controller('SearchCtrl', function($scope,$location,DayService) {
  $scope.recentDates = DayService.recentDates();
  var movingTime = new Date();
  $scope.lastDay = movingTime;
  for (var i = 1; i <= 5; i++) {
    movingTime = new Date(movingTime.getTime() - 864E5);
    $scope.lastDay = movingTime;
    DayService.addDay(movingTime);
  }
  $scope.go = function(date) {
    $location.path("/app/day/"+date);
  };
  $scope.more = function() {
    var movingTime = new Date($scope.lastDay);
    for (var i = 1; i <= 5; i++) {
      movingTime = new Date(movingTime.getTime() - 864E5);
      $scope.lastDay = movingTime;
      DayService.addDay(movingTime);
    }
  };
});
