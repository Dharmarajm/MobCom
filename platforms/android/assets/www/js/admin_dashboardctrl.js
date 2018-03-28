angular.module('admin_dashboard', [])

.controller('AdminDashboardCtrl', function($scope, $state, $http, $rootScope, $ionicPopup) {


  $scope.employee = function() {
    $state.go("admin_employeelist");
  }

  $scope.project = function() {
    $state.go("projectlist")
  }


  $scope.contacts = function() {
    $state.go("clients")
  }


})