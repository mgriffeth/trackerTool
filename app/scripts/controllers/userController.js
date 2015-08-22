(function() {
	angular.module('ClientTracker')
		.controller('UserController', ['$scope','$location', 'UserService','AuthService','$firebaseAuth',
			function($scope,$location, UserService, AuthService, $firebaseAuth) {
				
				var ref = new Firebase("https://luminous-torch-5681.firebaseio.com");
				
				$scope.users = UserService.allUsers;
				
				$scope.sortType = 'Last_name'; // set the default sort type
				$scope.sortReverse = false; // set the default sort order
				$scope.searchUsers = ''; // set the default search/filter term
				
				
				$scope.currentUser = AuthService.user;
				// console.log(AuthService.user)
				$scope.userInfo = AuthService.userInfo();
				// console.log(AuthService.userInfo())
			
				$scope.registerUser = function(user) {
					UserService.addUser(user)
					$location.path('users/');
				};

				$scope.userLogin = function(email, password) {
					AuthService.login(email,password);
					$location.path('/');
				};
				$scope.logOut = function(){
					AuthService.logOut();
					$scope.currentUser = null;
					
					$location.path('/login');
				}
				
				
			}
		]);
}());