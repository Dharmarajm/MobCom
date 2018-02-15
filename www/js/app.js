// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic-datepicker','ngCordova','login','registration','admin_dashboard',
  'emp_dashboard','emp_employeelist','admin_employeelist','projectlist','contacts'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });





 $ionicPlatform.registerBackButtonAction(function(e) {
    e.preventDefault();
    function showConfirm() {
      var confirmPopup = $ionicPopup.show({
      title : 'Mobcom',
      template : 'Are you sure you want to exit ?',
      buttons : [{
        text : 'Cancel',
        type : 'button-danger',
       }, {
        text : 'Ok',           
        type : 'button-danger',
        onTap : function() {
         ionic.Platform.exitApp();
        }
       }]
      });
     };
      if($state.current.name=='login' || $state.current.name=='admin_dashboard' || $state.current.name=='emp_dashboard'){
       showConfirm();
      }
      else {
        navigator.app.backHistory();
      }
    }, 100)




})

 .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      //todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      //from: new Date(1930, 1, 1),
      //to: new Date()-1,
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })





 
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  
  var jsScrolling = (ionic.Platform.isAndroid() ) ? false : true;
  $ionicConfigProvider.scrolling.jsScrolling(jsScrolling);

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })

  .state('registration', {
    url: '/registration',
    templateUrl: 'templates/registration.html'
  })

  .state('admin_dashboard', {
    url: '/admin_dashboard',
    templateUrl: 'templates/admin_dashboard.html'
  })

  .state('emp_dashboard', {
    url: '/emp_dashboard',
    templateUrl: 'templates/emp_dashboard.html'
  })


  .state('admin_employeelist', {
    url: '/admin_employeelist',
    templateUrl: 'templates/admin_employeelist.html'
  })

  .state('emp_employeelist', {
    url: '/emp_employeelist',
    templateUrl: 'templates/emp_employeelist.html'
  })

  .state('emp_information', {
    url: '/emp_information',
    templateUrl: 'templates/emp_information.html'
  })

  .state('admin_timesheet', {
    url: '/admin_timesheet',
    templateUrl: 'templates/admin_timesheet.html'
  })


  .state('emp_timesheet', {
    url: '/emp_timesheet',
    templateUrl: 'templates/emp_timesheet.html'
  })

  .state('projectlist', {
    url: '/projectlist',
    templateUrl: 'templates/projectlist.html'
  })

   .state('project_timesheet', {
    url: '/project_timesheet',
    templateUrl: 'templates/project_timesheet.html'
  })

   .state('createnewproject', {
    url: '/createnewproject',
    templateUrl: 'templates/createnewproject.html'
  })

  .state('assigntoemp', {
    url: '/assigntoemp',
    templateUrl: 'templates/assigntoemp.html'
  })


  .state('employeedetails', {
    url: '/employeedetails',
    templateUrl: 'templates/employeedetails.html'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'EmpEmployeelistCtrl'
  })   

  .state('contacts', {
    url: '/contacts',
    templateUrl: 'templates/contacts.html'
  })

  .state('clients', {
    url: '/clients',
    templateUrl: 'templates/clients.html'
  })

   .state('teams', {
    url: '/teams',
    templateUrl: 'templates/teams.html'
  })

   .state('cost', {
    url: '/cost',
    templateUrl: 'templates/cost.html'
  })


  
  $urlRouterProvider.otherwise('/login');
})


var Baseurl='http://192.168.1.52:5050/api/v1/';
