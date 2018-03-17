angular.module('admin_employeelist', [])

.controller('AdminEmployeelistCtrl', function($filter, ionicDatePicker, $scope, $state, $http, $rootScope, $ionicPopup, $ionicLoading, $timeout, $ionicModal, $cordovaSms, $cordovaDevice) {

  $rootScope.EmployeeID = localStorage.getItem("id")
  $scope.AuthToken = localStorage.getItem("auth_token")


  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $http.get(Baseurl + 'employees?app_version=' + versioncheck, {
      headers: {
        "Authorization": "Token token=" + $scope.AuthToken
      }
    })
    .success(function(response) {
      $timeout(function() {
        $ionicLoading.hide();
      })
      $scope.EmployeesDetails = response;
    }).error(function(error) {
      $timeout(function() {
        $ionicLoading.hide();
      })
    })

  $scope.timesheet = function(id, name) {
    $rootScope.EmployeeID_timesheet = id;
    $rootScope.EmployeeName = name;
    $state.go("admin_timesheet");
  }

  $scope.search = "";

  $scope.assigntoemp = function(id, name) {
    $rootScope.EmployeeID_toassign = id;
    $rootScope.EmployeeName = name;
    $state.go("assigntoemp");
  }

  if ($rootScope.EmployeeID_toassign != undefined) {
    $http.get(Baseurl + 'employees/unassigned_project?employee_id=' + $rootScope.EmployeeID_toassign + '&app_version=' + versioncheck, {
      headers: {
        "Authorization": "Token token=" + $scope.AuthToken
      }
    }).success(function(response) {
      $scope.AllProject = response;
      $scope.projectnameside = $scope.AllProject;
      $scope.projectname = function(objs) {
        $scope.projectnametype = objs.id;

      }
    })
  }


  $scope.WeekStatus = 'current';

  $scope.Previous = function(Previous) {
    $scope.WeekStatus = Previous;
    $scope.Timesheetcal($scope.WeekStatus);
  }

  $scope.Next = function(Next) {
    $scope.WeekStatus = Next;
    $scope.Timesheetcal($scope.WeekStatus);
  }

  $scope.Current = function(Current) {
    $scope.WeekStatus = Current;
    $scope.Timesheetcal($scope.WeekStatus);
  }


  $scope.Timesheetcal = function(WeekStatu) {
    if (WeekStatu != undefined) {
      $scope.WeekStatus = WeekStatu;
    } else {
      $scope.WeekStatus = 'current';
    }
    $scope.Day1 = 0;
    $scope.Day2 = 0;
    $scope.Day3 = 0;
    $scope.Day4 = 0;
    $scope.Day5 = 0;
    $scope.Day6 = 0;
    $scope.Day7 = 0;
    $http.get(Baseurl + 'time_sheets/employee_time_sheet?employee_id=' + $rootScope.EmployeeID_timesheet + '&date=' + $scope.WeekStatus + '&app_version=' + versioncheck, {
      headers: {
        "Authorization": "Token token=" + $scope.AuthToken
      }
    }).success(function(response) {
      $scope.Timesheets = response.date;
      if ($scope.Timesheets != undefined) {
        $scope.FromDate = $scope.Timesheets.from_date;
        $scope.ToDate = $scope.Timesheets.to_date;
      }
      if (response.time_sheet != undefined) {
        $scope.TimesheetsDetl = response.time_sheet;
        /*New code Begins here*/
        $scope.TimesheetsDetails = [];
        if ($scope.TimesheetsDetl.length > 1) {
          for (var i = 0; i < $scope.TimesheetsDetl.length; i++) {
            if ($scope.TimesheetsDetl[i].project_name != 'nil') {
              $scope.TimesheetsDetails.push($scope.TimesheetsDetl[i]);
              console.log($scope.TimesheetsDetails)
            }

          }
          $scope.shApprove = true;
          $scope.showApprove = [];
          for (var i in $scope.TimesheetsDetails) {
            console.log(($scope.TimesheetsDetails[i].approval_status1 != true || $scope.TimesheetsDetails[i].approval_status1 == undefined || $scope.TimesheetsDetails[i].approval_status1 == null ) && ($scope.TimesheetsDetails[i].approval_status2 != true || $scope.TimesheetsDetails[i].approval_status2 == undefined || $scope.TimesheetsDetails[i].approval_status2 == null )&&($scope.TimesheetsDetails[i].approval_status3 != true || $scope.TimesheetsDetails[i].approval_status3 == undefined || $scope.TimesheetsDetails[i].approval_status3 == null)&&($scope.TimesheetsDetails[i].approval_status4 != true || $scope.TimesheetsDetails[i].approval_status4 == undefined || $scope.TimesheetsDetails[i].approval_status4 == null)&&($scope.TimesheetsDetails[i].approval_status5 != true || $scope.TimesheetsDetails[i].approval_status5 == undefined || $scope.TimesheetsDetails[i].approval_status5 == null)&&($scope.TimesheetsDetails[i].approval_status6 != true || $scope.TimesheetsDetails[i].approval_status6 == undefined || $scope.TimesheetsDetails[i].approval_status6 == null)&&($scope.TimesheetsDetails[i].approval_status7 != true || $scope.TimesheetsDetails[i].approval_status7 == undefined || $scope.TimesheetsDetails[i].approval_status7 == null))
            if(($scope.TimesheetsDetails[i].approval_status1 != true || $scope.TimesheetsDetails[i].approval_status1 == undefined || $scope.TimesheetsDetails[i].approval_status1 == null ) && ($scope.TimesheetsDetails[i].approval_status2 != true || $scope.TimesheetsDetails[i].approval_status2 == undefined || $scope.TimesheetsDetails[i].approval_status2 == null )&&($scope.TimesheetsDetails[i].approval_status3 != true || $scope.TimesheetsDetails[i].approval_status3 == undefined || $scope.TimesheetsDetails[i].approval_status3 == null)&&($scope.TimesheetsDetails[i].approval_status4 != true || $scope.TimesheetsDetails[i].approval_status4 == undefined || $scope.TimesheetsDetails[i].approval_status4 == null)&&($scope.TimesheetsDetails[i].approval_status5 != true || $scope.TimesheetsDetails[i].approval_status5 == undefined || $scope.TimesheetsDetails[i].approval_status5 == null)&&($scope.TimesheetsDetails[i].approval_status6 != true || $scope.TimesheetsDetails[i].approval_status6 == undefined || $scope.TimesheetsDetails[i].approval_status6 == null)&&($scope.TimesheetsDetails[i].approval_status7 != true || $scope.TimesheetsDetails[i].approval_status7 == undefined || $scope.TimesheetsDetails[i].approval_status7 == null)){
              $scope.showApprove.push("Not Approval");
            }
            else{
              $scope.showApprove.push("Approval");
            }
          }

          console.log($scope.showApprove)



          if($scope.showApprove == true) {
            alert("hai")
            $scope.shApprove = true;
          }
          else{
            alert("bey")
           $scope.shApprove = false; 
          }

          /*if($scope.showApprove.length!=0){
            var array=$scope.showApprove;
            !!array.reduce(function(a, b){ return (a === b) ? a : NaN; });
            console.log(array)
          }*/


        } else {
          $scope.TimesheetsDetails = response.time_sheet;
        }
        /*End here*/

      }
      $scope.Day1 = 0;
      $scope.Day2 = 0;
      $scope.Day3 = 0;
      $scope.Day4 = 0;
      $scope.Day5 = 0;
      $scope.Day6 = 0;
      $scope.Day7 = 0;
      $scope.ID = []
      if ($scope.TimesheetsDetails != undefined) {
        for (var i = 0; i < $scope.TimesheetsDetails.length; i++) {

          if ($scope.TimesheetsDetails[i].day1 != undefined && $scope.TimesheetsDetails[i].day1 != "" && $scope.TimesheetsDetails[i].day1 != null) {
            $scope.Day1 += $scope.TimesheetsDetails[i].day1;
            $scope.ID.push($scope.TimesheetsDetails[i].id1);
          }
          if ($scope.TimesheetsDetails[i].day2 != undefined && $scope.TimesheetsDetails[i].day2 != "" && $scope.TimesheetsDetails[i].day2 != null) {
            $scope.Day2 += $scope.TimesheetsDetails[i].day2;
            $scope.ID.push($scope.TimesheetsDetails[i].id2);
          }
          if ($scope.TimesheetsDetails[i].day3 != undefined && $scope.TimesheetsDetails[i].day3 != "" && $scope.TimesheetsDetails[i].day3 != null) {
            $scope.Day3 += $scope.TimesheetsDetails[i].day3;
            $scope.ID.push($scope.TimesheetsDetails[i].id3);
          }
          if ($scope.TimesheetsDetails[i].day4 != undefined && $scope.TimesheetsDetails[i].day4 != "" && $scope.TimesheetsDetails[i].day4 != null) {
            $scope.Day4 += $scope.TimesheetsDetails[i].day4;
            $scope.ID.push($scope.TimesheetsDetails[i].id4);
          }
          if ($scope.TimesheetsDetails[i].day5 != undefined && $scope.TimesheetsDetails[i].day5 != "" && $scope.TimesheetsDetails[i].day5 != null) {
            $scope.Day5 += $scope.TimesheetsDetails[i].day5;
            $scope.ID.push($scope.TimesheetsDetails[i].id5);
          }
          if ($scope.TimesheetsDetails[i].day6 != undefined && $scope.TimesheetsDetails[i].day6 != "" && $scope.TimesheetsDetails[i].day6 != null) {
            $scope.Day6 += $scope.TimesheetsDetails[i].day6;
            $scope.ID.push($scope.TimesheetsDetails[i].id6);
          }
          if ($scope.TimesheetsDetails[i].day7 != undefined && $scope.TimesheetsDetails[i].day7 != "" && $scope.TimesheetsDetails[i].day7 != null) {
            $scope.Day7 += $scope.TimesheetsDetails[i].day7;
            $scope.ID.push($scope.TimesheetsDetails[i].id7);
          }
        }
      }

    })

  }



  $scope.assignto = function() {
    if ($scope.projectnametype == undefined) {
      alert("Please select the project name")
    } else {

      $http.get(Baseurl + 'employees/project_assign?project_id=' + $scope.projectnametype + "&employee_id=" + $rootScope.EmployeeID_toassign + '&app_version=' + versioncheck, {
          headers: {
            "Authorization": "Token token=" + $scope.AuthToken
          }
        })
        .success(function(response) {
          alert("success")
          $state.go("admin_employeelist");
        })
    }
  }

  $scope.back = function() {
    $state.go("admin_employeelist");
  }


  $scope.empback = function() {
    $state.go("admin_dashboard");
  }

  $scope.call = function(number, id) {

    window.plugins.CallNumber.callNumber(function(result) {
      if (window.PhoneCallTrap) {
        PhoneCallTrap.onCall(function(state) {});
      }
      //success logic goes here
    }, function(error) {
      // alert(error)
      //error logic goes here
    }, number)
  };


  $ionicModal.fromTemplateUrl("templates/modal.html", {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    return modal;
  });


  $scope.admin = {
    response: ""
  }

  $scope.openModal = function(mobile_number, id, pname) {
    $scope.admin = {
      response: ""
    }
    $scope.mNumber = mobile_number;
    $scope.selectedId = id;
    $scope.nameOpen = pname;
    $scope.modal.show();

  };
  $scope.closeModal = function() {
    console.log('test')
    $scope.admin = {
      response: ""
    };
    $scope.modal.hide();
  };

  $scope.popup = function(mobile_number, id, response) {
    $scope.admin = {
      response: ""
    };
    var data = response;

    //CONFIGURATION    
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        //intent: 'INTENT' // send SMS with the native android SMS messaging
        intent: '' // send SMS without open any other app
      }
    };

    $cordovaSms
      .send(mobile_number, data, options)
      .then(function(success) {
        if (success == true) {
          var myPopup = $ionicPopup.show({
            template: number,
            title: "Message has been sent",
            buttons: [{
              text: 'OK',
              type: 'button-dark',
              onTap: function(e) {
                return true;
              }
            }]
          })
        }
      }, function(error) {
        var myPopup = $ionicPopup.show({
          template: number,
          title: "Message can't sent",
          buttons: [{
            text: 'OK',
            type: 'button-dark',
            onTap: function(e) {
              return true;
            }
          }]
        })
      });
  }




  $scope.CallPost = function(id) {
    var create = {
      "call_log": {
        "from_employee_id": $rootScope.EmployeeID,
        "to_employee_id": id,
        "to_contact_id": 0,
        "start_time": "00:00",
        "end_time": "00:00"
      }
    }

    $http({
      method: 'post',
      url: Baseurl + "logs/call_create?app_version=" + versioncheck,
      data: create,
      headers: {
        "Authorization": "Token token=" + $scope.AuthToken
      }
    }).then(function(response) {})

  }

  $scope.SMSPost = function(selectedId, response) {
    var create = {
      "message_log": {
        "from_employee_id": $rootScope.EmployeeID,
        "to_employee_id": selectedId,
        "to_contact_id": 0,
        "message": response
      }
    }

    $http({
      method: 'post',
      url: Baseurl + "logs/message_create?app_version=" + versioncheck,
      data: create,
      headers: {
        "Authorization": "Token token=" + $scope.AuthToken
      }
    }).then(function(response) {

    })

  }


  $scope.Approval = function() {
    if ($scope.ID.length == 0) {
      alert("No Data")
    } else {
      $http.get(Baseurl + 'time_sheets/time_approval_status?id=' + $scope.ID + "&app_version=" + versioncheck, {
          headers: {
            "Authorization": "Token token=" + $scope.AuthToken
          }
        })
        .success(function(response) {
          alert("success")
        })
    }
  }


})