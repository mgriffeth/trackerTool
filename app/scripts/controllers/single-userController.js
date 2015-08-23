(function() {
	angular.module('ClientTracker')
		.controller('SingleUserController', ['$scope', '$location', '$http',  '$cookieStore', 'fb','$routeParams', 'UserService','AuthService',
			function($scope, $location, $http,$cookieStore, fb, $routeParams, UserService,AuthService) {

				// var routeParams = $routeParams.cid;

				var userProfile = new Firebase("https://luminous-torch-5681.firebaseio.com/users/");
				// var inactiveUser = new Firebase('https://luminous-torch-5681.firebaseio.com/users/inactive/'+ routeParams);

				// user = AuthService.user;
                
                $scope.user = UserService.getSingleUser($routeParams.cid)
            
			    $scope.currentUser = AuthService.user;
				$scope.userInfo = AuthService.userInfo();
				
                // $scope.userDisabled = $firebaseObject(inactiveUser);
				// 
                // userDisabled = $firebaseObject(inactiveUser);
                
                // console.log(userDisabled);
                // 
                
                
                // thisUser = $firebaseObject(userProfile);


				$scope.readyEdit = function() {
					$(".edit-user-input").removeClass('hidden');
					$('.info-text').addClass('hidden');
				};
				$scope.closeEdit = function() {
					$(".edit-user-input").addClass('hidden');
					$('.info-text').removeClass('hidden');
				};

				$scope.submitEdit = function(userProfile) {
					UserService.saveUser(userProfile);
					// userProfile.$save();
					$location.path('/users');
				};
				// $scope.deactivateUser = function() {
				// 	UserService.deactivateUser();
				// 	$location.path('/users');
				// 	// console.log(thisUser);
				// 	// var userProfile = {
				// 	// 	first_name:thisUser.first_name || ''  ,
				// 	// 	last_name:thisUser.last_name || ''  ,
				// 	// 	username:thisUser.username || ''  ,
				// 	// 	email:thisUser.email || '',
				// 	// 	phone:thisUser.phone || ''  ,
				// 	// 	department:thisUser.department || '' ,
				// 	// 	permissions:thisUser.permissions || '' 
				// 	// }
				// 	// inactiveUsers.push(userProfile);
                //     // $scope.destroyUser();
				// };


				$scope.destroyUser = function(id,email,password) {
					UserService.deleteUser(email, password)
					var onComplete = function(error) {
						if (error) {
							console.log('Synchronization failed');
						} else {
							console.log('Synchronization succeeded');

						}
					};
					userProfile.child(id).remove(onComplete);
					$location.path('/users');
				};
			}
		]);
}());