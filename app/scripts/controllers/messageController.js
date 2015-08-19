(function() {
	angular.module('ClientTracker')
		.controller('MessageController', ['$scope', '$location', '$http', '$routeParams', '$cookieStore', 'fb', '$firebaseObject','$firebaseArray',
			function($scope, $location, $http, $routeParams, $cookieStore, fb, $firebaseObject, $firebaseArray) {

				var allMessages = new Firebase("https://luminous-torch-5681.firebaseio.com/messages");
				
				$scope.allMessages=$firebaseArray(allMessages);
				
				messages=$firebaseArray(allMessages);
				// console.log(messages);
				
				$scope.addMessage=function(message){
					console.log('im here')
					allMessages.push(message)
					$('.messageform').val('');
				}
			}
		]);
}());