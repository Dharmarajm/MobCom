angular.module('login', [])

.controller('LoginCtrl', function($scope,$state,$http,$rootScope,$ionicPopup,$ionicLoading,$timeout) {

    $scope.user = {username :"", password :""};

    cordova.getAppVersion.getVersionNumber(function (version) {
     var mobversion = version;
      if(mobversion!="0.0.2"){
       var myPopup = $ionicPopup.confirm({
        title: "Mobcom",
        template: 'New version available',
          buttons: [{ text: 'EXIT',
          type: 'button-dark',
          onTap: function(){
            ionic.Platform.exitApp();
          }
          },{
           text: 'UPDATE',
           type: 'button-positive',
           onTap: function(){
             hockeyapp.checkForUpdate();
           }
        }]
      });
      myPopup.then(function(res) {
       myNullAction();
      }); 
     }
    console.log(mobversion)
   });
    
    $scope.login=function(){
		  
		
		if($scope.user.username==""){
			var alertPopup = $ionicPopup.alert({
			title: "Error",
			content: "Please enter your username"
			})
		}else if($scope.user.password==""){
			var alertPopup1 =$ionicPopup.alert({
			title: "Error",
			content: "Please enter your password"
			})
		}else{
	
				$ionicLoading.show
				({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
				});

		        $http.get(Baseurl+'users/login_validation?email=' + $scope.user.username +"&password="+$scope.user.password)
				 .success(function(response) {
					$timeout(function () {
							$ionicLoading.hide(); 
					})
					if(response == false){
						alert("username and password wrong")
						 $scope.user.username="";
						 $scope.user.password="";
					}else{
            localStorage.setItem("id",response.employee_id)
            localStorage.setItem("auth_token",response.auth_token)
            localStorage.setItem("role",response.role.name)
            /*if(response.employee.image.url==null){
             sessionStorage.setItem("image",null)  
            }else{
              sessionStorage.setItem("image",response.employee.image.url)  
            }*/
						//alert("sucess")
						if(response.role.name == 'Admin'){
							$state.go("admin_dashboard");
						}else if(response.role.name == 'Employee'){
							$state.go("emp_dashboard");
						}
						
					}                   
				
	          }).error(function(error){
              $timeout(function () {
              $ionicLoading.hide(); 
              })
              var alertPopup3 =$ionicPopup.alert({
              title: "Login Error",
              content: "Failed to connect the server"
              })
            })
	        }

	}        


	        $scope.ForgotPasswordModal = function() {
                  
                  $scope.data = { resetMail:"" };

                  var customTemplate ='<label class="item item-input"><input type="email" ng-model="data.resetMail" placeholder="your Email"></label>';
                  var myPopup = $ionicPopup.show({
                  template: customTemplate,
                  title: 'Reset your password',
                  scope: $scope,
                  buttons: [
                    { text: 'Cancel',
                      type: 'button-dark'
                    },
                    {
                      text: 'Ok',
                      type: 'button-positive',
                      onTap: function(e) {
                        
                        if($scope.data.resetMail==""){
                            var alertPopup8 =$ionicPopup.alert({
                            title: "Error",
                            content: "Please enter the E-mail"
                          })
                        }else {
                          $ionicLoading.show({
                            content: 'Loading',
                            animation: 'fade-in',
                            showBackdrop: true,
                            maxWidth: 200,
                            showDelay: 0
                          });
                        $http.get(Baseurl+'users/forgot_password?email='+$scope.data.resetMail)
                        .success(function(response) {
                      	console.log(response)
                          $timeout(function () {
                              $ionicLoading.hide(); 
                          })
                           var alertPopup6 =$ionicPopup.alert({
                           title: "Reset Password",
                           content: response.message
                          })
                        })
                       .error(function(error){
                          $timeout(function () {
                              $ionicLoading.hide(); 
                          })
                          var alertPopup6 =$ionicPopup.alert({
                           title: "Reset Password",
                           content: "Failed to connect the server"
                          })
                        }) 
                          /*return $scope.data.wifi;*/
                        }
                      }
                    }
                  ]
                });
       }





   
    $scope.Registration=function(){
        $state.go("registration");
    }

 })



