(function() {
	'use strict';
	angular.module('ClientTracker')
		.service('MessageService', ['$firebaseArray', '$firebaseObject', '$location','AuthService', function($firebaseArray, $firebaseObject, $location, AuthService) {
			// var loggedInUser = getAuth();
			
			// var currentUser = AuthService.userInfo;
			// var messagesRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/"+ currentUser.$id+'/messages');
			// var currentUserMessages = $firebaseArray(messagesRef);
			// console.log(currentUserMessages);
			
			this.notify = function(id, messageObj){
				console.log(id);
				var userRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/");
				userRef.child(id).child("messages").child("new").push(messageObj);
			};
			
			

			
				//end of service
		}])
}())