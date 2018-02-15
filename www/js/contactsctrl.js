angular.module('contacts', [])

.controller('ContactsCtrl', function($scope,$state,$http,$rootScope,$ionicPopup,$ionicModal,$cordovaSms,$cordovaDevice) {


         $rootScope.EmployeeID_timesheet=sessionStorage.getItem("id")
               $scope.AuthToken=sessionStorage.getItem("auth_token")

       

         $http.get(Baseurl+'clients/client_projects',{
                headers: { "Authorization": "Token token="+$scope.AuthToken}
              })
         .success(function(response) {
            $scope.ClientsDetails=response; 
            console.log($scope.ClientsDetails)    
       })

         $scope.contactlist=function(id){
         	$rootScope.ClientID=id;
         	$state.go("contacts");         
         }


        if($rootScope.ClientID!=undefined){
            $http.get(Baseurl+'clients/client_contacts?client_id='+$rootScope.ClientID,{
                headers: { "Authorization": "Token token="+$scope.AuthToken}
              })
           .success(function(response) {
              $scope.ContactsDetails=response;     
             })


           $http.get(Baseurl+'clients/'+$rootScope.ClientID,{
                headers: { "Authorization": "Token token="+$scope.AuthToken}
              })
           .success(function(response) {
              $scope.ClientsAddress=response;     
             })
        }


         $scope.clientback=function(){
            $state.go("admin_dashboard");
         }

         $scope.contactback=function(){
            $state.go("clients");
         }


      $scope.call = function(number,id){ 
          
            window.plugins.CallNumber.callNumber(function(result){
              if (window.PhoneCallTrap) {
                PhoneCallTrap.onCall(function(state) {  
                });
              }
             //success logic goes here
            }, function(error){
              alert(error)
             //error logic goes here
            }, number) 
          };


          $ionicModal.fromTemplateUrl("templates/modal.html", {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.modal = modal;
            return modal;
          });

          $scope.openModal = function(mobile_number,id,pname) {

            $scope.mNumber=mobile_number;
            $scope.selectedId=id;
            $scope.nameOpen=pname;
            $scope.modal.show();
            
            };
            $scope.closeModal = function() {
                $scope.modal.hide();
                $state.reload('project_details');
            };
        

           $scope.popup=function(mobile_number,id,response){       

                  var data=response;                   
                //CONFIGURATION    
                    var options = {
                      replaceLineBreaks: false, // true to replace \n by a new line, false by default
                      android: {
                          //intent: 'INTENT' // send SMS with the native android SMS messaging
                          intent: '' // send SMS without open any other app
                        }
                    };

                    $cordovaSms
                      .send(mobile_number,data, options) 
                      .then(function(success) {     
                          if(success==true)
                          {
                            var myPopup = $ionicPopup.show({
                            template: number,
                            title: "Message has been sent",
                            buttons: [
                            {
                              text: 'OK',
                              type: 'button-dark',
                              onTap: function(e) { return true; } 
                             }]
                            })
                          }
                      }, function(error) {                       
                         var myPopup = $ionicPopup.show({
                              template: number,
                              title: "Message can't sent",
                              buttons: [
                              {
                              text: 'OK',
                              type: 'button-dark',
                              onTap: function(e) { return true; } 
                              }]
                          }) 
                    });        
               }



                $scope.CallPost=function(id){
                       var create={
                              "call_log": 
                              {
                                  "from_employee_id":$rootScope.EmployeeID_timesheet,
                                  "to_employee_id":0,
                                  "to_contact_id": id,
                                  "start_time": "00:00",
                                  "end_time": "00:00"
                              }
                            }      

                          $http({
                            method: 'post',
                            url:Baseurl+"logs/call_create",
                            data: create ,
                             headers: { "Authorization": "Token token="+$scope.AuthToken}                 
                          }).then(function(response) {                                
                         })

                  }  

                   $scope.SMSPost=function(selectedId,response){
                           var create={
                            "message_log": 
                              {
                                "from_employee_id":$rootScope.EmployeeID_timesheet,
                                "to_employee_id": 0,
                                "to_contact_id":selectedId,
                                "message":response
                              }
                             }   

                              $http({
                                method: 'post',
                                url:Baseurl+"logs/message_create",
                                data: create ,
                                headers: { "Authorization": "Token token="+$scope.AuthToken}                
                              }).then(function(response) {

                             })

                  }          
 
 })


