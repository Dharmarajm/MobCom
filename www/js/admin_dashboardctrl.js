angular.module('admin_dashboard', [])

.controller('AdminDashboardCtrl', function($scope,$state,$http,$rootScope,$ionicPopup) {

  
    $scope.employee=function(){
		  $state.go("admin_employeelist");
    }

    $scope.project=function(){
    $state.go("projectlist")  
    }


    $scope.contacts=function(){
    $state.go("clients")  
     }

  

     
     $rootScope.logout=function(){
      $ionicPopup.confirm({
        title: "Do you want to Logout?",
        template: '<style>.popup { width:700px; } .popup-head { background-color: #FFFFFF; } .popup-title { color: #000; }</style>',
          buttons: [{ text: 'OK',
          type: 'button-danger',
          onTap: function(){
            sessionStorage.clear();
            $state.go("login")
          }
          },{
           text: 'CANCEL',
           type: 'button-danger',
           onTap: function(){}
        }]
      });
      
    }



     $rootScope.Exit=function(){
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




    




 })



