(function() {
	angular.module('ClientTracker')
		.controller('HomeController', ['$scope', '$location', '$http', '$cookieStore', 'ClientService', 'UserService', 'AuthService','MessageService',
			function($scope, $location, $http, $cookieStore, ClientService, UserService, AuthService, MessageService) {
				
				$scope.users = UserService.allUsers;
				users = UserService.allUsers;
				
				$scope.currentUser = AuthService.userInfo();
				var currentUser = AuthService.userInfo();
				console.log(currentUser)
				
				$scope.clients = ClientService.getClients();
				
				$scope.messages = MessageService.userMessages(currentUser.$id);
				var messages = MessageService.userMessages(currentUser.$id);
				console.log(messages);
				
				$scope.sortType = 'company_name'; // set the default sort type
				$scope.sortReverse = false; // set the default sort order
				$scope.searchClients = ''; // set the default search/filter term
			
			
			
			$scope.markAsRead = function(messageId){
				
				MessageService.markAsRead(currentUser.$id, messageId);
				
			};
			
			$scope.deleteMessage= function(messageId){
				MessageService.delete(currentUser.$id,messageId)
				
			};
			
			}
		]);
}());