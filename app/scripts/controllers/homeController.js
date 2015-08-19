(function() {
	angular.module('ClientTracker')
		.controller('HomeController', ['$scope', '$location', '$http', '$cookieStore', 'ClientService', 'UserService', 'AuthService','MessageService',
			function($scope, $location, $http, $cookieStore, ClientService, UserService, AuthService, MessageService) {
				
				$scope.users = UserService.allUsers;
				users = UserService.allUsers;
				// console.log( users);
				
				$scope.currentUser = AuthService.userInfo();
				var currentUser = AuthService.userInfo();
				console.log(currentUser)
				
				
				var allClients = ClientService.getClients();
				console.log(allClients);
				
				// var myClients = ClientService.userClients();
				// console.log(myClients)
				
				
				// allClients.forEach(function(x){
				// 	var userClients = [];
				// 	console.log(x);
				// 	if((x.sales_rep == currentUser.username) || (x.client_sales_manager == currentUser.username)){
				// 		userClients.push(x);
				// 	}
				// 	console.log(userClients);
				// })
				
				
				
				
				$scope.clients = ClientService.getClients();
				
				// var currentUser = AuthService.userInfo();
				// 
				// $scope.searchCurrentUser = currentUser.username;
				
				$scope.sortType = 'company_name'; // set the default sort type
				$scope.sortReverse = false; // set the default sort order
				$scope.searchClients = ''; // set the default search/filter term
			
			}
		]);
}());