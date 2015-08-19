(function() {
	'use strict';
	angular.module('ClientTracker')
		.service('AuthService', ['$firebaseArray', '$firebaseObject', '$location', function($firebaseArray, $firebaseObject, $location) {
			// var loggedInUser = getAuth();

			var ref = new Firebase("https://luminous-torch-5681.firebaseio.com");
			

			this.user = ref.getAuth();
			if(this.user){
			var id = this.user.uid;	
			};
			
			// console.log(id);
			
			this.userInfo = function(){
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
					} else {
						console.log("Authenticated successfully with payload:", authData);
					}
				});
			}
			this.logOut = function() {
					ref.unauth();
				}
				//end of service
		}])
}())