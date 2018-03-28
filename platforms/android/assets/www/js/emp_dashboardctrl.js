angular.module('emp_dashboard', [])

.controller('EmpDashboardCtrl', function($scope, $state, $http, $rootScope, $ionicPopup, $cordovaImagePicker) {


  $scope.timesheet = function() {
    $state.go("emp_timesheet");
  }

  $scope.employee = function() {
    $state.go("emp_employeelist");
  }

  $scope.profile = function() {
    $state.go("profile");
  }



  /*$rootScope.logout=function(){
      $ionicPopup.confirm({
        title: "Do you want to Logout?",
        template: '<style>.popup { width:700px; } .popup-head { background-color: #FFFFFF; } .popup-title { color: #000; }</style>',
          buttons: [{ text: 'OK',
          type: 'button-danger',
          onTap: function(){
            localStorage.clear();
            $state.go("login")
          }
          },{
           text: 'CANCEL',
           type: 'button-danger',
           onTap: function(){}
        }]
      });
      
    }   */


  /*$rootScope.Exit=function(){
        $ionicPopup.confirm({
          title: "Do you want to Exit?",
          template: '<style>.popup { width:700px; } .popup-head { background-color: #FFFFFF; } .popup-title { color: #000; }</style>',
            buttons: [{ text: 'OK',
            type: 'button-danger',
            onTap: function(){
              localStorage.clear();
              $state.go("login")
            }
            },{
             text: 'CANCEL',
             type: 'button-danger',
             onTap: function(){}
          }]
        });
        
      }
  */

})