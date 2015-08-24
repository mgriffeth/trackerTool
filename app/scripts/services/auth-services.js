(function() {
	'use strict';
	angular.module('ClientTracker')
		.service('AuthService', ['$firebaseArray', '$firebaseObject', '$location', '$firebaseAuth',  function($firebaseArray, $firebaseObject, $location, $firebaseAuth) {
			// var loggedInUser = getAuth();

			var ref = new Firebase("https://luminous-torch-5681.firebaseio.com");
			// var users = UserService.allUsers;

			this.user = ref.getAuth();
			if (this.user) {
				var id = this.user.uid;
			};

			var self = this;
			// console.log(id);

			this.userInfo = function() {
				var userRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/" + id);
				return $firebaseObject(userRef);
				console.log($firebaseObject(userRef));

			}

			this.login = function(email, password) {
				
					ref.authWithPassword({
						email: email,
						password: password
					}, function(error, authData) {
						if (error) {
							console.log("Login Failed!", error);
							alert(error);
							
						} else {
							console.log("Authenticated successfully with payload:", authData);
							// $location.path('/');
							location.reload();
						}
					});
			}
			this.logOut = function() {
					ref.unauth();
					location.reload();
				}
				//end of service
		}])
}())