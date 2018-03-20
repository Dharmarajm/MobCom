angular.module('emp_employeelist', [])
.controller('EmpEmployeelistCtrl', function($filter,ionicDatePicker,$scope,$state,$http,$rootScope,$ionicPlatform,$ionicPopup,$cordovaImagePicker,$ionicLoading,$timeout,$ionicModal,$cordovaSms,$cordovaDevice,$ionicHistory) {
      
      $scope.hour_values=24;
      $scope.search="";
      $scope.ImageUrl='';
      $rootScope.EmployeeID_timesheet=localStorage.getItem("id")
      $scope.AuthToken=localStorage.getItem("auth_token")
      $scope.getlocalurl="http://mobcom.altiussolution.com" 

       $http.get(Baseurl+'employees?app_version='+versioncheck,{
          headers: { "Authorization": "Token token="+$scope.AuthToken}
          })
         .success(function(response) {
          $timeout(function () {
              $ionicLoading.hide(); 
          })
          $scope.EmployeesDetails=response;    
          for(var i in $scope.EmployeesDetails){
            if(localStorage.getItem("id")==$scope.EmployeesDetails[i].id){
              if($scope.EmployeesDetails[i].image.url==null || $scope.EmployeesDetails[i].image.url==undefined || $scope.EmployeesDetails[i].image.url==""){
                $scope.ImageUrl='';
              }else{
                $scope.ImageUrl=$scope.EmployeesDetails[i].image.url;
               
              }
            }
          }
       })

         $http.get(Baseurl+'employees/assigned_project?employee_id='+$rootScope.EmployeeID_timesheet+"&app_version="+versioncheck,{headers: { "Authorization": "Token token="+$scope.AuthToken}
              })
             .success(function(response) {
               $scope.ProjectDetails=response;
                 $scope.projectnameside=$scope.ProjectDetails ;  
                  $scope.projectname = function(objs)
                  {
                     if(objs!=null){
                       $scope.projectnametype=objs.id;
                       $scope.project_name=objs.name;                    
                     }else{
                       $scope.projectnametype=null;   
                     }
                       
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
           $http.get(Baseurl+'time_sheets/employee_time_sheet?employee_id='+$rootScope.EmployeeID_timesheet+'&date='+$scope.WeekStatus+"&app_version="+versioncheck,{
                headers: { "Authorization": "Token token="+$scope.AuthToken}
              })
           .success(function(response) {
                   $scope.Timesheets=response.date;
                   $scope.TimesheetsDetails=response.time_sheet;
                if($scope.Timesheets!=undefined){                  
                  $scope.FromDate=$scope.Timesheets.from_date;
                  $scope.ToDate=$scope.Timesheets.to_date;
              
               $scope.Dates_Record=[];
                  for(var i=0;i<7;i++){
                    $scope.mydate = new Date($scope.FromDate);
                    $scope.newdate = $scope.mydate.setDate($scope.mydate.getDate() + i); 
                    $scope.All_Dates = $filter('date')($scope.newdate, "dd-MM-yyyy");
                    $scope.Dates_Record.push($scope.All_Dates);
                  }

                  if($scope.WeekStatus == 'current'){
                       $scope.start=new Date($scope.FromDate);
                       $scope.end=new Date();  
                          var ipObj1 = {
                          from: $scope.start,
                          to: $scope.end,
                          inputDate:new Date(),
                           callback: function (val) {  //Mandatory 
                            $scope.timesheet.selectdate = $filter('date')(val, "dd-MM-yyyy");
                            /*$scope.hours_cal();*/
                            
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
                          $scope.timesheet.selectdate = $filter('date')(val, "dd-MM-yyyy");
                          /*$scope.hours_cal();*/
                          $scope.isDisabled = true;
                          },             
                      };
             
                      $scope.openDatePicker = function(){                        
                        ionicDatePicker.openDatePicker(ipObj1);
                      };
                  }

                            
                }
                $scope.Day1=0;
                $scope.Day2=0;
                $scope.Day3=0;
                $scope.Day4=0;
                $scope.Day5=0;
                $scope.Day6=0;
                $scope.Day7=0;

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

          /*$scope.hours_cal=function(){
            $scope.hour_values=24;
            $scope.Day_hours1=0;
            $scope.Day_hours2=0;
            $scope.Day_hours3=0;
            $scope.Day_hours4=0;
            $scope.Day_hours5=0;
            $scope.Day_hours6=0;
            $scope.Day_hours7=0;  

            if($scope.TimesheetsDetails!=undefined){
                  if($scope.Dates_Record[0] == $scope.selectdate ){
                    for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {   
                      if($scope.TimesheetsDetails[i].day1!=undefined && $scope.TimesheetsDetails[i].day1!="" && $scope.TimesheetsDetails[i].day1!=null){
                         $scope.Day_hours1 +=$scope.TimesheetsDetails[i].day1;                 
                         if($scope.project_name == $scope.TimesheetsDetails[i].project_name && $scope.selectdate == $scope.TimesheetsDetails[i].date1){
                            var result=$scope.Day1 - $scope.TimesheetsDetails[i].day1;  
                            $scope.hour_values=24 - result;                      
                          }else{
                            $scope.hour_values=24 - $scope.Day_hours1;                      
                          }
                      }
                    }
                  }

              if($scope.Dates_Record[1] == $scope.selectdate ){
                for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {   
                  if($scope.TimesheetsDetails[i].day2!=undefined && $scope.TimesheetsDetails[i].day2!="" && $scope.TimesheetsDetails[i].day2!=null){
                      $scope.Day_hours2 +=$scope.TimesheetsDetails[i].day2;                  
                      if($scope.project_name == $scope.TimesheetsDetails[i].project_name && $scope.selectdate == $scope.TimesheetsDetails[i].date2){                          
                          var result=$scope.Day2 - $scope.TimesheetsDetails[i].day2;  
                          $scope.hour_values=24 - result;                    
                      }else{
                          $scope.hour_values=24 - $scope.Day_hours2;
                      }                  
                  }
                }
              }


              if($scope.Dates_Record[2] == $scope.selectdate ){
                for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {   
                  if($scope.TimesheetsDetails[i].day3!=undefined && $scope.TimesheetsDetails[i].day3!="" && $scope.TimesheetsDetails[i].day3!=null){
                      $scope.Day_hours3 +=$scope.TimesheetsDetails[i].day3;                  
                      if($scope.project_name == $scope.TimesheetsDetails[i].project_name && $scope.selectdate == $scope.TimesheetsDetails[i].date3){                          
                          var result=$scope.Day3 - $scope.TimesheetsDetails[i].day3;  
                          $scope.hour_values=24 - result;                    
                      }else{
                          $scope.hour_values=24 - $scope.Day_hours3;
                      }                  
                  }
                }
              }


              if($scope.Dates_Record[3] == $scope.selectdate ){
                for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {   
                  if($scope.TimesheetsDetails[i].day4!=undefined && $scope.TimesheetsDetails[i].day4!="" && $scope.TimesheetsDetails[i].day4!=null){
                      $scope.Day_hours4 +=$scope.TimesheetsDetails[i].day4;                  
                      if($scope.project_name == $scope.TimesheetsDetails[i].project_name && $scope.selectdate == $scope.TimesheetsDetails[i].date4){                          
                          var result=$scope.Day4 - $scope.TimesheetsDetails[i].day4;  
                          $scope.hour_values=24 - result;                    
                      }else{
                          $scope.hour_values=24 - $scope.Day_hours4;
                      }                  
                  }
                }
              }



              if($scope.Dates_Record[4] == $scope.selectdate ){
                for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {   
                  if($scope.TimesheetsDetails[i].day5!=undefined && $scope.TimesheetsDetails[i].day5!="" && $scope.TimesheetsDetails[i].day5!=null){
                      $scope.Day_hours5 +=$scope.TimesheetsDetails[i].day5;                  
                      if($scope.project_name == $scope.TimesheetsDetails[i].project_name && $scope.selectdate == $scope.TimesheetsDetails[i].date5){                          
                          var result=$scope.Day5 - $scope.TimesheetsDetails[i].day5;  
                          $scope.hour_values=24 - result;                    
                      }else{
                          $scope.hour_values=24 - $scope.Day_hours5;
                      }                  
                  }
                }
              }


              if($scope.Dates_Record[5] == $scope.selectdate ){
                for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {   
                  if($scope.TimesheetsDetails[i].day6!=undefined && $scope.TimesheetsDetails[i].day6!="" && $scope.TimesheetsDetails[i].day6!=null){
                      $scope.Day_hours6 +=$scope.TimesheetsDetails[i].day6;                  
                      if($scope.project_name == $scope.TimesheetsDetails[i].project_name && $scope.selectdate == $scope.TimesheetsDetails[i].date6){                          
                          var result=$scope.Day6 - $scope.TimesheetsDetails[i].day6;  
                          $scope.hour_values=24 - result;                    
                      }else{
                          $scope.hour_values=24 - $scope.Day_hours6;
                      }                  
                  }
                }
              }


              if($scope.Dates_Record[6] == $scope.selectdate ){
                for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {   
                  if($scope.TimesheetsDetails[i].day7!=undefined && $scope.TimesheetsDetails[i].day7!="" && $scope.TimesheetsDetails[i].day7!=null){
                      $scope.Day_hours7 +=$scope.TimesheetsDetails[i].day7;                  
                      if($scope.project_name == $scope.TimesheetsDetails[i].project_name && $scope.selectdate == $scope.TimesheetsDetails[i].date7){                          
                          var result=$scope.Day7 - $scope.TimesheetsDetails[i].day7;  
                          $scope.hour_values=24 - result;                    
                      }else{
                          $scope.hour_values=24 - $scope.Day_hours7;
                      }                  
                  }
                }
              }


             }
          }
*/

$scope.hoursempty=function(project){
  if(project == "" || project == null || project == undefined){
     $scope.timesheet.hours=0;
  }
}

$scope.checkProject=function(test, value){
  if((test == "" || test == null || test == undefined) && value > 0){
    var alertPopuptimepro= $ionicPopup.alert({
    title: "MobCom",
    content: "Please select the project"
    })
    $scope.timesheet.hours=0;
  }
}



$scope.timesheet={selectdate:'',projectnametype:'',hours:""};

$scope.LocalData=[];

   $scope.addfield = function() {

     console.log($scope.timesheet)
      if($scope.timesheet.hours==0){
        $scope.attendance=false;
       }
      else{
        $scope.attendance=true;
      }
      var check=false
      for(var i in $scope.LocalData){

        if($scope.timesheet.projectnametype == null){
          $scope.project_name=null;
        }
        else{
          $scope.project_name=$scope.timesheet.projectnametype.name;
        }

        if($scope.LocalData[i].project_name == $scope.project_name  && $scope.LocalData[i].date == $scope.timesheet.selectdate){
          check=true;
        }

      }

      if(check!=false){
        var alertPopuptimedate= $ionicPopup.alert({
        title: "MobCom",
        content: "Please select different Project or Date"
        })
        $scope.timesheet.selectdate='';
        $scope.timesheet.projectnametype=null;
        $scope.timesheet.hours=null;
      } 
      else{
        if($scope.timesheet.projectnametype==null || $scope.timesheet.projectnametype=="" || $scope.timesheet.projectnametype==undefined){
           $scope.project_id=null;
           $scope.project_name= null;
        }
        else{
          $scope.project_id=$scope.timesheet.projectnametype.id;
          $scope.project_name=$scope.timesheet.projectnametype.name
        }
           $scope.LocalData.push({
            "date": $scope.timesheet.selectdate,
            "project_id": $scope.project_id,
            "project_name": $scope.project_name,
            "hours": $scope.timesheet.hours,
            "employee_id":$rootScope.EmployeeID_timesheet,
            "attendance_log": $scope.attendance
          })
          $scope.timesheet.selectdate='';
          $scope.timesheet.projectnametype=null;
          $scope.timesheet.hours=null;
        }
   }

   $scope.remove=function(index){
    $scope.LocalData.splice(index,1)
   }

        $scope.timesheetcreate=function(){
               console.log($scope.LocalData)
             /*
                if($scope.timesheet.selectdate == undefined || $scope.selectdate=="" || $scope.selectdate==null){
                  var alertPopuptimedate= $ionicPopup.alert({
                  title: "MobCom",
                  content: "Please select the date"
                  })
                }else if($scope.timesheet.projectnametype == undefined || $scope.projectnametype=="" || $scope.projectnametype==null){
                  var alertPopuptimepro= $ionicPopup.alert({
                  title: "MobCom",
                  content: "Please select the project name"
                  })
                }
                else if($scope.timesheet.hours==undefined || $scope.hours==null || $scope.hours==""){
                  var alertPopuptimehour= $ionicPopup.alert({
                  title: "MobCom",
                  content: "Please enter the hours"
                  })
                }else if($scope.hours>24 || $scope.hours<0){
                  var alertPopuptimehour2= $ionicPopup.alert({
                  title: "MobCom",
                  content: "Please select the valid hours"
                  })
                }else{*/
                   
                   $scope.timeCreate=[];
                   for(var i in $scope.LocalData){
                      $scope.timeCreate.push({           
                        "date":$scope.LocalData[i].date,
                        "hours":$scope.LocalData[i].hours,
                        "project_id":$scope.LocalData[i].project_id,
                        "employee_id":$scope.LocalData[i].employee_id,
                        "attendance_log": $scope.LocalData[i].attendance_log
                      })
                   }
                   var data={
                      "data":$scope.timeCreate
                    };
                    $http({
                      method: 'post',
                      url:Baseurl+"time_sheets?app_version="+versioncheck,
                      data: data,
                      headers: { "Authorization": "Token token="+$scope.AuthToken}                  
                    }).then(function(response) {
                       $scope.hour_values=24;
                        $scope.show=2;
                            
                            var alertPopuptimesheet1 = $ionicPopup.alert({
                             template: "Timesheet has been created",
                             title: "MobCom",
                             buttons: [{
                               text: 'OK',
                               type: 'button-positive',
                               onTap: function(e) {
                                 $scope.LocalData=[]
                                 $scope.Timesheetcal($scope.WeekStatus)
                               }
                             }]
                           })
                            $scope.LocalData=[]
                            $scope.Timesheetcal($scope.WeekStatus)
                          /* alertPopuptimesheet1.then(function(res) {
                            myNullAction();
                           });  */                 
                        })   
                          /*   var alertPopuptimesheet2 = $ionicPopup.show({
                             template: "Timesheet has been updated",
                             title: "MobCom",
                             buttons: [{
                               text: 'OK',
                               type: 'button-positive',
                               onTap: function(e) {
                                 $scope.LocalData=[]
                                 $scope.Timesheetcal($scope.WeekStatus)
                               }
                             }]
                           })
                           alertPopuptimesheet2.then(function(res) {
                            myNullAction();
                           });*/
                             
                             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                

          }  

                
          /*var myNullAction = $ionicPlatform.registerBackButtonAction(function(){
            return; // do nothing
          }, 401);         */
          

 

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
                            var myPopup = $ionicPopup.alert({
                            template: "Message has been sent",
                            title: "MobCom",
                            buttons: [
                            {
                              text: 'OK',
                              type: 'button-dark',
                              onTap: function(e) { return true; } 
                             }]
                            })
                          }
                      }, function(error) {                       
                         var myPopup = $ionicPopup.alert({
                              template: "Message can't sent",
                              title: "MobCom",
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
                            url:Baseurl+"logs/call_create?app_version="+versioncheck,
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
                                "message":response,
                              }
                             }   

                              $http({
                                method: 'post',
                                url:Baseurl+"logs/message_create?app_version="+versioncheck,
                                data: create,
                                headers: { "Authorization": "Token token="+$scope.AuthToken}    
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
                                url:Baseurl+"employees/image_upload?app_version="+versioncheck,
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


/*.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=1; i<=total; i++) {
      input.push(i);
    }

    return input;
  };
})*/