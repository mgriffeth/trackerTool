(function() {
	'use strict';
	angular.module('ClientTracker')
		.service('UserService', ['$firebaseArray', '$firebaseObject', '$location', 'AuthService', function($firebaseArray, $firebaseObject, $location, AuthService) {

			var self = this;

			var ref = new Firebase("https://luminous-torch-5681.firebaseio.com");

			var userProfiles = new Firebase("https://luminous-torch-5681.firebaseio.com/users");


			// // TODO: fix for one variable
			var userProfile;
			var singleUser;

			var user = AuthService.user;
			// this.userInfo = AuthService.userInfo;
			// console.log(this.userInfo);

			this.allUsers = $firebaseArray(userProfiles);
			// var allUsers = $firebaseArray(userProfiles);
			// console.log(this.allUsers)

			this.addUser = function(user) {
				ref.createUser({
					email: user.email,
					password: user.password
				}, function(error, userData) {
					if (error) {
						console.log("Error creating user:", error);
					} else {
						console.log(userData);
						user.status = 'active';
						userProfiles.child(userData.uid).set(user)
					}
				});
			};

			this.getUsers = function() {
				return $firebaseArray(userProfiles);
			};
			this.deleteUser = function(email, password) {
					ref.removeUser({
						email: email,
						password: password
					}, function(error) {
						if (error) {
							switch (error.code) {
								case "INVALID_USER":
									console.log("The specified user account does not exist.");
									break;
								case "INVALID_PASSWORD":
									console.log("The specified user account password is incorrect.");
									break;
								default:
									console.log("Error removing user:", error);
							}
						} else {
							console.log("User account deleted successfully!");
						}
					});

				}
				// this.getByDept = function(dept){
				// 	var matches = []
				// 	var userList = $firebaseArray(userProfiles)
				// 	userList.$loaded()
				// 	.then(function(){
				// 		userList.forEach(function(x){
				// 			if(x.department == dept){
				// 				matches.push(x);
				// 				console.log(x);	
				// 			}
				// 		})
				// 	})
				// 	console.log(matches);
				// 	
				// };

			// this.userLogin = function(email, password) {
			// 	ref.authWithPassword({
			// 		email: email,
			// 		password: password
			// 	}, function(error, authData) {
			// 		if (error) {
			// 			console.log("Login Failed!", error);
			// 		} else {
			// 			console.log("Authenticated successfully with payload:", authData);
			// 			// $("#login").removeClass('hidden');
			//             // $("#logout").addClass('hidden');
			// 			self.loggedInUser = userProfiles.child(authData.uid);
			// 		}
			// 	});
			// };

			// this.userLogOut = function(){
			// 	ref.unauth();
			// };

			this.getSingleUser = function(id) {
				userProfile = new Firebase("https://luminous-torch-5681.firebaseio.com/users/" + id);
				singleUser = $firebaseObject(userProfile);
				return $firebaseObject(userProfile);
			};

			this.saveUser = function(profile) {
				profile.$save();
			};




			//end of factory
		}])
}())