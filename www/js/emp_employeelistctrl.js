angular.module('emp_employeelist', [])
.controller('EmpEmployeelistCtrl', function($filter,ionicDatePicker,$scope,$state,$http,$rootScope,$ionicPopup,$cordovaImagePicker,$ionicLoading,$timeout,$ionicModal,$cordovaSms,$cordovaDevice,$ionicHistory) {


      $scope.search="";
      $scope.ImageUrl='';
      $rootScope.EmployeeID_timesheet=localStorage.getItem("id")
      $scope.AuthToken=localStorage.getItem("auth_token")
      $scope.getlocalurl="http://192.168.1.52:5050" 

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
              }else{
                $scope.ImageUrl=$scope.EmployeesDetails[i].image.url;
               
              }
            }
          }
       })

         $http.get(Baseurl+'employees/assigned_project?employee_id='+$rootScope.EmployeeID_timesheet,{
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
                   $scope.Timesheets=response.date;
                if($scope.Timesheets!=undefined){                  
                  $scope.FromDate=$scope.Timesheets.from_date;
                  $scope.ToDate=$scope.Timesheets.to_date;

                  if($scope.WeekStatus == 'current'){
                       $scope.start=new Date($scope.FromDate);
                       $scope.end=new Date($scope.ToDate);  
                          var ipObj1 = {
                          from: $scope.start,
                          to: $scope.end,
                          inputDate:new Date(),
                           callback: function (val) {  //Mandatory 
                            $scope.selectdate = $filter('date')(val, "yyyy-MM-dd");
                            },             
                        };
               
                        $scope.openDatePicker = function(){
                          ionicDatePicker.openDatePicker(ipObj1);
                        };
                  }else{
                     $scope.start=new Date($scope.FromDate);
                     $scope.end=new Date($scope.ToDate);  
                        var ipObj1 = {
                        from: $scope.start,
                        to: $scope.end,
                        inputDate:$scope.start,
                         callback: function (val) {  //Mandatory 
                          $scope.selectdate = $filter('date')(val, "yyyy-MM-dd");
                          },             
                      };
             
                      $scope.openDatePicker = function(){
                        ionicDatePicker.openDatePicker(ipObj1);
                      };
                  }

                            
                }
                $scope.TimesheetsDetails=response.time_sheet;

                $scope.ID=[]
                if($scope.TimesheetsDetails!=undefined){
                    for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {                   
                      
                        if($scope.TimesheetsDetails[i].day1!=undefined && $scope.TimesheetsDetails[i].day1!="" && $scope.TimesheetsDetails[i].day1!=null){
                          $scope.Day1 +=$scope.TimesheetsDetails[i].day1;
                          $scope.ID.push($scope.TimesheetsDetails[i].id1);
                        }
                        if($scope.TimesheetsDetails[i].day2!=undefined && $scope.TimesheetsDetails[i].day2!="" && $scope.TimesheetsDetails[i].day2!=null){
                          $scope.Day2 +=$scope.TimesheetsDetails[i].day2;
                          $scope.ID.push($scope.TimesheetsDetails[i].id2);
                        }
                        if($scope.TimesheetsDetails[i].day3!=undefined && $scope.TimesheetsDetails[i].day3!="" && $scope.TimesheetsDetails[i].day3!=null){
                          $scope.Day3 +=$scope.TimesheetsDetails[i].day3;
                          $scope.ID.push($scope.TimesheetsDetails[i].id3);
                        }
                        if($scope.TimesheetsDetails[i].day4!=undefined && $scope.TimesheetsDetails[i].day4!="" && $scope.TimesheetsDetails[i].day4!=null){
                          $scope.Day4 +=$scope.TimesheetsDetails[i].day4;
                          $scope.ID.push($scope.TimesheetsDetails[i].id4);
                        }
                        if($scope.TimesheetsDetails[i].day5!=undefined && $scope.TimesheetsDetails[i].day5!="" && $scope.TimesheetsDetails[i].day5!=null){
                          $scope.Day5 +=$scope.TimesheetsDetails[i].day5;
                          $scope.ID.push($scope.TimesheetsDetails[i].id5);
                        }
                        if($scope.TimesheetsDetails[i].day6!=undefined && $scope.TimesheetsDetails[i].day6!="" && $scope.TimesheetsDetails[i].day6!=null){
                          $scope.Day6 +=$scope.TimesheetsDetails[i].day6;
                          $scope.ID.push($scope.TimesheetsDetails[i].id6);
                        }
                        if($scope.TimesheetsDetails[i].day7!=undefined && $scope.TimesheetsDetails[i].day7!="" && $scope.TimesheetsDetails[i].day7!=null){
                          $scope.Day7 +=$scope.TimesheetsDetails[i].day7;
                          $scope.ID.push($scope.TimesheetsDetails[i].id7);
                        }
                    }
                }              
            })

         }



        $scope.getHours=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];  

        $scope.timesheetcreate=function(hour){
                     $scope.Day_approval1=0;

                 $scope.hours=hour;
             
                if($scope.projectnametype == undefined || $scope.projectnametype=="" || $scope.projectnametype==null){
                  alert("Please select the project name")
                }else if($scope.selectdate == undefined || $scope.selectdate=="" || $scope.selectdate==null){
                  alert("Please select the date")
                } else if($scope.hours == undefined || $scope.hours==null || $scope.hours==""){
                  alert("Please select the hours")
                }else {


                  /* if($scope.TimesheetsDetails!=undefined){
                      for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {                   

                        if($scope.TimesheetsDetails[i].day1!=undefined && $scope.TimesheetsDetails[i].day1!="" && $scope.TimesheetsDetails[i].day1!=null){
                          
                          if($scope.TimesheetsDetails[i].approval_status1 == true && $scope.TimesheetsDetails[i].approval_status1!=null){
                          $scope.Day_approval1 +=$scope.TimesheetsDetails[i].day1;
                            $scope.Result1=parseInt($scope.Day_approval1)+parseInt($scope.hours);

                            if($scope.Result1 > 24){
                               $scope.day_values1=24 - $scope.Day_approval1;
                              alert("You have avaiable only  "+$scope.day_values1+" hours")
                              return;
                            }
                        }else if($scope.selectdate != $scope.TimesheetsDetails[i].date1 && $scope.projectnametype != $scope.TimesheetsDetails[i].project_name){
                             $scope.Day_approval1 +=$scope.TimesheetsDetails[i].day1;
                            $scope.Result1=parseInt($scope.Day_approval1)+parseInt($scope.hours);

                            if($scope.Result1 > 24){
                               $scope.day_values1=24 - $scope.Day_approval1;
                              alert("You have avaiable only  "+$scope.day_values1+" hours")
                              return;
                            }
                        }
                      }
                    }
                  }*/

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
                      $scope.show=2;
                          if(response.data.message){
                            alert(response.data.message)                   
                            $scope.selectdate='';
                            $scope.projectnametype="";
                            $scope.hour="";                      
                            $scope.Timesheetcal();
                          }else if(response.data.id){
                             alert("success")
                             $scope.selectdate='';
                             $scope.projectnametype="";
                             $scope.hour="";                     
                             $scope.Timesheetcal();
                          }                                      
                   })
                }

          }  

          /*  




     $scope.Day11=0;
            $scope.Day22=0;
            $scope.Day33=0;
            $scope.Day44=0;
            $scope.Day55=0;
            $scope.Day66=0;
            $scope.Day77=0;
            $scope.Day_no_approval1=0;
            
                   if($scope.TimesheetsDetails!=undefined){
                   for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {                   

                        if($scope.TimesheetsDetails[i].day1!=undefined && $scope.TimesheetsDetails[i].day1!="" && $scope.TimesheetsDetails[i].day1!=null && $scope.TimesheetsDetails[i].approval_status1 == true && $scope.TimesheetsDetails[i].approval_status1!=null){
                          $scope.Day11 +=$scope.TimesheetsDetails[i].day1;
                            $scope.ss=parseInt($scope.Day11)+parseInt($scope.hours);
                            if($scope.ss > 24){
                               $scope.day_values=24 - $scope.Day11;
                              alert("You have avaiable only  "+$scope.day_values+" hours")
                              return;
                            }
                        }else if($scope.TimesheetsDetails[i].day2!=undefined && $scope.TimesheetsDetails[i].day2!="" && $scope.TimesheetsDetails[i].day2!=null && $scope.TimesheetsDetails[i].approval_status2 == true && $scope.TimesheetsDetails[i].approval_status2!=null){
                          $scope.Day22 +=$scope.TimesheetsDetails[i].day2;
                            $scope.ss=parseInt($scope.Day22)+parseInt($scope.hours);
                            if($scope.ss > 24){
                               $scope.day_values=24 - $scope.Day22;
                              alert("You have avaiable only  "+$scope.day_values+" hours")
                              return;
                            }
                        }else if($scope.TimesheetsDetails[i].day3!=undefined && $scope.TimesheetsDetails[i].day3!="" && $scope.TimesheetsDetails[i].day3!=null && $scope.TimesheetsDetails[i].approval_status3 == true && $scope.TimesheetsDetails[i].approval_status3!=null){
                          $scope.Day33 +=$scope.TimesheetsDetails[i].day3;
                            $scope.ss=parseInt($scope.Day33)+parseInt($scope.hours);
                            if($scope.ss > 24){
                               $scope.day_values=24 - $scope.Day33;
                              alert("You have avaiable only  "+$scope.day_values+" hours")
                              return;
                            }
                        }else if($scope.TimesheetsDetails[i].day4!=undefined && $scope.TimesheetsDetails[i].day4!="" && $scope.TimesheetsDetails[i].day4!=null && $scope.TimesheetsDetails[i].approval_status4 == true && $scope.TimesheetsDetails[i].approval_status4!=null){
                          $scope.Day44 +=$scope.TimesheetsDetails[i].day4;
                            $scope.ss=parseInt($scope.Day44)+parseInt($scope.hours);
                            if($scope.ss > 24){
                               $scope.day_values=24 - $scope.Day44;
                              alert("You have avaiable only  "+$scope.day_values+" hours")
                              return;
                            }
                        }else if($scope.TimesheetsDetails[i].day5!=undefined && $scope.TimesheetsDetails[i].day5!="" && $scope.TimesheetsDetails[i].day5!=null && $scope.TimesheetsDetails[i].approval_status5 == true && $scope.TimesheetsDetails[i].approval_status5!=null){
                          $scope.Day55 +=$scope.TimesheetsDetails[i].day5;
                            $scope.ss=parseInt($scope.Day55)+parseInt($scope.hours);
                            if($scope.ss > 24){
                               $scope.day_values=24 - $scope.Day55;
                              alert("You have avaiable only  "+$scope.day_values+" hours")
                              return;
                            }
                        }else if($scope.TimesheetsDetails[i].day6!=undefined && $scope.TimesheetsDetails[i].day6!="" && $scope.TimesheetsDetails[i].day6!=null && $scope.TimesheetsDetails[i].approval_status6 == true && $scope.TimesheetsDetails[i].approval_status6!=null){
                          $scope.Day66 +=$scope.TimesheetsDetails[i].day6;
                            $scope.ss=parseInt($scope.Day66)+parseInt($scope.hours);
                            if($scope.ss > 24){
                               $scope.day_values=24 - $scope.Day66;
                              alert("You have avaiable only  "+$scope.day_values+" hours")
                              return;
                            }
                        }else if($scope.TimesheetsDetails[i].day7!=undefined && $scope.TimesheetsDetails[i].day7!="" && $scope.TimesheetsDetails[i].day7!=null && $scope.TimesheetsDetails[i].approval_status7 == true && $scope.TimesheetsDetails[i].approval_status7!=null){
                          $scope.Day77 +=$scope.TimesheetsDetails[i].day7;
                            $scope.ss=parseInt($scope.Day77)+parseInt($scope.hours);
                            if($scope.ss > 24){
                               $scope.day_values=24 - $scope.Day77;
                              alert("You have avaiable only  "+$scope.day_values+" hours")
                              return;
                            }
                        }else if($scope.TimesheetsDetails[i].day1!=undefined && $scope.TimesheetsDetails[i].day1!="" && $scope.TimesheetsDetails[i].day1!=null){
                          
                          console.log($scope.selectdate+"======"+$scope.TimesheetsDetails[i].date1)

                          console.log($scope.projectnametype+"======"+$scope.TimesheetsDetails[i].project_name  )


                          $scope.Day_no_approval1 +=$scope.TimesheetsDetails[i].day1;
                            $scope.ss=parseInt($scope.Day_no_approval1)+parseInt($scope.hours);
                            if($scope.ss > 24){
                               $scope.day_values=24 - $scope.Day_no_approval1;
                              alert("You have avaiable only  "+$scope.day_values+" hours")
                              return;
                            }
                        }

                      }
                 }*/
                
                   
          

 

          $scope.empback=function(){
            //$state.go("emp_dashboard");
            $ionicHistory.goBack();
          }

         
    
         $scope.call = function(number,id){ 
          
            window.plugins.CallNumber.callNumber(function(result){
              if (window.PhoneCallTrap) {
                PhoneCallTrap.onCall(function(state) {  
                });
              }
             //success logic goes here
            }, function(error){
             // alert(error)
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
          
          $scope.mode={response:""};

          $scope.openModal = function(mobile_number,id,pname) {
            $scope.mode={response:""};
            $scope.mNumber=mobile_number;
            $scope.selectedId=id;
            $scope.nameOpen=pname;
            $scope.modal.show();
            
            };
            $scope.closeModal = function() {
                $scope.modal.hide();
                $scope.mode={response:""};
            };
        

              $scope.popup=function(mobile_number,id,response){       
                  var data=response;  
                 
                //CONFIGURATION    
                    var options = {
                      replaceLineBreaks: false, // true to replace \n by a new line, false by default
                      android: {
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
                           var create={
                            "message_log": 
                              {
                                "employee_id":$rootScope.EmployeeID_timesheet,
                                "image": $rootScope.getimgData
                              }
                             }   
                              $http({
                                method: 'post',
                                url:Baseurl+"employees/image_upload",
                                data: create,
                                headers: { "Authorization": "Token token="+$scope.AuthToken}    
                              }).then(function(response) {
                                  $scope.ImageUrl='';
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
                     $state.go("emp_information");
                  }
                  

                  $scope.empinfoback=function(){
                    $ionicHistory.goBack();
                  }

                  $scope.add=function(){
                    $scope.show=1;
                  }

 })
