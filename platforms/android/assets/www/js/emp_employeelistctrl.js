angular.module('emp_employeelist', [])

.controller('EmpEmployeelistCtrl', function($filter,ionicDatePicker,$scope,$state,$http,$rootScope,$ionicPopup,$cordovaImagePicker,$ionicLoading,$timeout,$ionicModal,$cordovaSms,$cordovaDevice,$ionicHistory) {

/*if(sessionStorage.getItem("image")=='null'){
  $scope.ImageUrl='';
  console.log($scope.ImageUrl)
}else{
  $scope.ImageUrl=sessionStorage.getItem("image");
}*/
      
     /* $scope.reload=function(){
       $state.reload(); 
      }*/
      
      $rootScope.EmployeeID_timesheet=localStorage.getItem("id")
      $scope.AuthToken=localStorage.getItem("auth_token")


      $ionicLoading.show
        ({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
        });

        $http.get(Baseurl+'employees',{
          headers: { "Authorization": "Token token="+$scope.AuthToken}
          })
         .success(function(response) {
          $timeout(function () {
              $ionicLoading.hide(); 
          })
          $scope.EmployeesDetails=response;     
          for(var i in $scope.EmployeesDetails){
            if(localStorage.getItem("id")==$scope.EmployeesDetails[i].id){
              if($scope.EmployeesDetails[i].image.url==null){
                $scope.ImageUrl='';
                console.log($scope.ImageUrl)
                console.log('noImage')
              }else{
                console.log('img')
                $scope.ImageUrl=$scope.EmployeesDetails[i].image.url;
                console.log($scope.ImageUrl)
                
              }
            }
          }
       })


          
       $http.get(Baseurl+'employees/unassigned_project?employee_id='+$rootScope.EmployeeID_timesheet,{
                headers: { "Authorization": "Token token="+$scope.AuthToken}
              })
       .success(function(response) {
            $scope.ProjectDetails=response;
                 $scope.projectnameside=$scope.ProjectDetails ;  
                  $scope.projectname = function(objs)
                  {
                       $scope.projectnametype=objs.id;
                       
                  }
        })


       var ipObj1 = {
      callback: function (val) {  //Mandatory 
        $scope.selectdate = $filter('date')(val, "yyyy-MM-dd");
      }      
    };
 
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

          


            $scope.WeekStatus='current';


          $scope.Previous=function(Previous){
              $scope.WeekStatus=Previous;             
              $scope.Timesheetcal($scope.WeekStatus);
          }

          $scope.Next=function(Next){
              $scope.WeekStatus=Next;
              $scope.Timesheetcal($scope.WeekStatus);
          }

          $scope.Current=function(Current){
              $scope.WeekStatus=Current;
              $scope.Timesheetcal($scope.WeekStatus);
          }

        

        $scope.Timesheetcal=function(WeekStatu){  
            if(WeekStatu!=undefined){
              $scope.WeekStatus=WeekStatu;
            }else{         
              $scope.WeekStatus='current';
            }
            $scope.Day1=0;
            $scope.Day2=0;
            $scope.Day3=0;
            $scope.Day4=0;
            $scope.Day5=0;
            $scope.Day6=0;
            $scope.Day7=0;
           $http.get(Baseurl+'time_sheets/employee_time_sheet?employee_id='+$rootScope.EmployeeID_timesheet+'&date='+$scope.WeekStatus,{
                headers: { "Authorization": "Token token="+$scope.AuthToken}
              })
           .success(function(response) {
                $scope.Timesheets=response[0];
                if($scope.Timesheets!=undefined){                  
                  $scope.FromDate=$scope.Timesheets[0].from_date;
                  $scope.ToDate=$scope.Timesheets[0].to_date;
                }
                $scope.TimesheetsDetails=response[1];
                if($scope.TimesheetsDetails!=undefined){
                    for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {
                        if($scope.TimesheetsDetails[i].day1!=undefined && $scope.TimesheetsDetails[i].day1!="" && $scope.TimesheetsDetails[i].day1!=null){
                          $scope.Day1 +=$scope.TimesheetsDetails[i].day1;
                        }
                        if($scope.TimesheetsDetails[i].day2!=undefined && $scope.TimesheetsDetails[i].day2!="" && $scope.TimesheetsDetails[i].day2!=null){
                          $scope.Day2 +=$scope.TimesheetsDetails[i].day2;
                        }
                        if($scope.TimesheetsDetails[i].day3!=undefined && $scope.TimesheetsDetails[i].day3!="" && $scope.TimesheetsDetails[i].day3!=null){
                          $scope.Day3 +=$scope.TimesheetsDetails[i].day3;
                        }
                        if($scope.TimesheetsDetails[i].day4!=undefined && $scope.TimesheetsDetails[i].day4!="" && $scope.TimesheetsDetails[i].day4!=null){
                          $scope.Day4 +=$scope.TimesheetsDetails[i].day4;
                        }
                        if($scope.TimesheetsDetails[i].day5!=undefined && $scope.TimesheetsDetails[i].day5!="" && $scope.TimesheetsDetails[i].day5!=null){
                          $scope.Day5 +=$scope.TimesheetsDetails[i].day5;
                        }
                        if($scope.TimesheetsDetails[i].day6!=undefined && $scope.TimesheetsDetails[i].day6!="" && $scope.TimesheetsDetails[i].day6!=null){
                          $scope.Day6 +=$scope.TimesheetsDetails[i].day6;
                        }
                        if($scope.TimesheetsDetails[i].day7!=undefined && $scope.TimesheetsDetails[i].day7!="" && $scope.TimesheetsDetails[i].day7!=null){
                          $scope.Day7 +=$scope.TimesheetsDetails[i].day7;
                        }
                    }
                }               
            })

         }





        $scope.timesheetcreate=function(hour){
          $scope.hours=hour;
          if($scope.projectnametype == undefined){
            alert("Please select the project name")
          }else if($scope.selectdate == undefined){
            alert("Please select the date")
          } else if($scope.hours == undefined){
            alert("Please enter the hours")
          }else{
           var create={           
                  "date":$scope.selectdate,
                  "hours":$scope.hours,
                  "project_id":$scope.projectnametype,
                  "employee_id":$rootScope.EmployeeID_timesheet
                }           

              $http({
                method: 'post',
                url:Baseurl+"time_sheets",
                data: create,
                headers: { "Authorization": "Token token="+$scope.AuthToken}                  
              }).then(function(response) {
                    alert("success")
                    $scope.selectdate='';
                    $scope.projectnametype='';
                    $scope.hours='';                    
                    $scope.Timesheetcal();                   
             })
            }

          }  

 

          $scope.empback=function(){
            $state.go("emp_dashboard");
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
          
          $scope.response="";

          $scope.openModal = function(mobile_number,id,pname) {
            $scope.response="";
            $scope.mNumber=mobile_number;
            $scope.selectedId=id;
            $scope.nameOpen=pname;
            $scope.modal.show();
            
            };
            $scope.closeModal = function() {
                console.log('tets')
                $scope.modal.hide();
                $scope.response="";
                console.log($scope.response)
            };
        

              $scope.popup=function(mobile_number,id,response){       
                  $scope.response="";
                  console.log(mobile_number,id,response)  
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
                                  "to_employee_id": id,
                                  "to_contact_id": 0,
                                  "start_time": "00:00",
                                  "end_time": "00:00"
                              }
                            }      

                           $http({
                            method: 'post',
                            url:Baseurl+"logs/call_create",
                            data: create,
                           headers: { "Authorization": "Token token="+$scope.AuthToken}                  
                          }).then(function(response) {                                
                         })

                  }  

                   $scope.SMSPost=function(selectedId,response){
                           var create={
                            "message_log": 
                              {
                                "from_employee_id":$rootScope.EmployeeID_timesheet,
                                "to_employee_id": selectedId,
                                "to_contact_id": 0,
                                "message":response
                              }
                             }   

                              $http({
                                method: 'post',
                                url:Baseurl+"logs/message_create",
                                data: create    
                              }).then(function(response) {

                             })

                  }
                   
                   $scope.Image=[];

                   $scope.upload = function(){
                        

                       $scope.Image=[];
                       $scope.profileData=[]; 

                         var options = {
                         maximumImagesCount: 1,
                         width: 800,
                         height: 800,
                         quality: 80
                        };
                        
                       $cordovaImagePicker.getPictures(options)
                         .then(function (results) {
                             console.log('Image URI: ' + results[0]);
                             /*$scope.Image=results[0];*/
                              $scope.Image=[];
                             if (results[0] != undefined) {
                               $scope.Image.push({
                                 "file": results[0]
                               })
                             }
                             window.resolveLocalFileSystemURL(results[0],
                                 function (fileEntry) {
                                     // convert to Base64 string
                                     fileEntry.file(
                                         function(file) {
                                             //got file
                                             
                                             var reader = new FileReader();
                                             reader.onloadend = function (evt) {
                                                 var imgData = evt.target.result; // this is your Base64 string
                                                 $rootScope.getimgData=imgData
                                                 console.log($rootScope.getimgData)
                                             };
                                             reader.readAsDataURL(file);
                                             
                                         },
                                     function (evt) {
                                         //failed to get file
                                     });

                                 },
                                 // error callback
                                 function () { }
                             )
                         }, function(error) {
                           // error getting photos
                           alert(error);
                         })
                 }



                  $scope.ImagePost=function(){
                           console.log($rootScope.getimgData)
                           var create={
                            "message_log": 
                              {
                                "employee_id":$rootScope.EmployeeID_timesheet,
                                "image": $rootScope.getimgData
                              }
                             }   
                           console.log(create)
                              $http({
                                method: 'post',
                                url:Baseurl+"employees/image_upload",
                                data: create,
                                headers: { "Authorization": "Token token="+$scope.AuthToken}    
                              }).then(function(response) {
                                
                                  $ionicPopup.alert({
                                    title: 'Employee Profile',
                                    template: 'Your profile updated successfully',
                                    buttons: [{
                                      text: '<b>OK</b>',
                                      type: 'button-positive',
                                      onTap: function() {
                                        $state.go("emp_dashboard");        
                                      }
                                    }]
                                  }) 
                                
                             },function(error){
                                $ionicPopup.alert({
                                    title: 'Employee Profile',
                                    template: 'Your profile updated failed',
                                    buttons: [{
                                      text: '<b>OK</b>',
                                      type: 'button-positive',
                                      onTap: function() {
                                               
                                      }
                                    }]
                                  }) 
                             })

                  }   


                  $scope.moreDetail=function(detail){
                     $rootScope.empdetail=detail; 
                     console.log($rootScope.empdetail)
                     $state.go("emp_information");
                  }
                  

                  $scope.empinfoback=function(){
                    $ionicHistory.goBack();
                  }

 })



                      