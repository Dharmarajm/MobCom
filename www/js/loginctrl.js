angular.module('login', [])

.controller('LoginCtrl', function($scope,$state,$http,$rootScope,$ionicPopup,$ionicLoading,$timeout) {

    $scope.user = {username :"", password :""};

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
            sessionStorage.setItem("id",response.employee_id)
            sessionStorage.setItem("auth_token",response.auth_token)
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
				
	          })
	        }

	}        


	        $scope.ForgotPasswordModal = function() 
        {
                  $scope.data = { resetMail:"" ,resetPassword:"" };

                  var customTemplate ='<label class="item item-input"><input type="email" ng-model="data.resetMail" placeholder="your Email"></label>' + '<br>' +'<label class="item item-input"><input type="text" ng-model="data.resetPassword" placeholder="new Password"></label>';
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
                            content: "Please entry the email-id"
                          })
                        }else
                          if($scope.data.resetPassword==""){
                            var alertPopup8 =$ionicPopup.alert({
                              title: "Error",
                              content: "Please entry the new Password"
                            })
                          }
                         else {
                        $http.get(Baseurl+'users/forgot_password?email='+$scope.data.resetMail+'&password='+$scope.data.resetPassword)
                      .success(function(response) {
                      	console.log(response)
                        if(response==true){
                           var alertPopup6 =$ionicPopup.alert({
                           title: "Reset Password",
                           content: "Your password is reset sucessfully"
                          })
                        }else if(response==false){
                           var alertPopup7 =$ionicPopup.alert({
                           title: "Error",
                           content: "Your  Email-ID is wrong.Please try again"
                          })
                        } 
                   
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



