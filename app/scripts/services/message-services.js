(function() {
	'use strict';
	angular.module('ClientTracker')
		.service('MessageService', ['$firebaseArray', '$firebaseObject', '$location','AuthService', function($firebaseArray, $firebaseObject, $location, AuthService) {
			// var loggedInUser = getAuth();
			
			// var currentUser = AuthService.userInfo;
			// var messagesRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/"+ currentUser.$id+'/messages');
			// var currentUserMessages = $firebaseArray(messagesRef);
			// console.log(currentUserMessages);
			var userRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/");
			
			this.userMessages = function(userId){
				var userMessageRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/" + userId +"/messages");
				
				return $firebaseArray(userMessageRef);
				
			};
			
			this.notify = function(id, messageObj){
				console.log(id);	
				userRef.child(id).child("messages").push(messageObj);
			};
			
			this.markAsRead = function(userid, messageId){
				var messageRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/"+ userid + '/messages/'+ messageId);
				
				messageRef.child('status').set('read');
				// messageRef.child("new").child(messageObj.$id).remove();
				// messageRef.child("read").push(messageObj);
				
			};
			
			this.delete = function(userid, messageId){
				var messageRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/"+ userid + '/messages/'+ messageId);
				
				messageRef.remove();
			};
			
			

			
				//end of service
		}])
}())