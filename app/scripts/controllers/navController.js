(function(){
   angular.module('ClientTracker')
    .controller('NavController',['$scope','$location','$http','$cookieStore', 'UserService','AuthService',
      function($scope, $location, $http, $cookieStore, UserService, AuthService){
        //   userServ.checkUser();
        //   var currentUser = Parse.User.current();
        //   if (currentUser) {
              // do stuff with the user
            //   console.log('hey current user');
            //   $("#login").addClass('hidden');
            //   $("#logout").removeClass('hidden');
            // var checkUser = function(){
            //     if (UserService.checkUser() ==false){
            //         $location.path('/login')
            //     }
            // }
            // checkUser();
            // 
              $scope.currentUser = AuthService.userInfo
              $scope.logout= function(){
                //   console.log('hi im trying to logout');
                  AuthService.userLogOut();
                      $("#login").removeClass('hidden');
                      $("#logout").addClass('hidden');
                      $location.path('/login')
                      
                  
              };
        //   } else {
              // show the signup or login page
            //   $("#login").removeClass('hidden');
            //   $("#logout").addClass('hidden');
            //   $location.path('/login');
            //   console.log('LOGIN FIRST!');
        //   }
          
          
		
    }
  ]);
}());
