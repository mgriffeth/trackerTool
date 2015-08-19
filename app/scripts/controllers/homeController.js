(function() {
	angular.module('ClientTracker')
		.controller('HomeController', ['$scope', '$location', '$http', '$cookieStore', 'ClientService', 'UserService', 'AuthService','MessageService',
			function($scope, $location, $http, $cookieStore, ClientService, UserService, AuthService, MessageService) {

				$scope.clients = ClientService.getClients();
				
				$scope.users = UserService.allUsers;
				users = UserService.allUsers;
				// console.log( users);
				
				$scope.currentUser = AuthService.userInfo();
				var currentUser = AuthService.userInfo();
				
				$scope.searchCurrentUser = currentUser.username;
				// 
				// $scope.sortType = 'company_name'; // set the default sort type
				// $scope.sortReverse = false; // set the default sort order
				// $scope.searchClients = ''; // set the default search/filter term
				// 
				// $scope.toPartTwo = function() {
				// 	$('#partTwo').removeClass('hidden');
				// 	$('#partOne').addClass('hidden');
				// };
				// $scope.toPartOne = function() {
				// 	$('#partTwo').addClass('hidden');
				// 	$('#partOne').removeClass('hidden');
				// };
				// 
				// $scope.addNewClient = function(client) {
				// 	client.sales_rep = salesRep.username;
				// 	client.sales_key = salesRep.$id;
				// 	
				// 	ClientService.addClient(client)
				// 	var csm = _.findWhere(users,{username:client.client_service_manager});
				// 	console.log(csm.$id);
				// 	var messageObj ={
				// 		titel:'notification',
				// 		body:'You have been assigned a new client'
				// 	};
				// 	MessageService.notify(csm.$id,messageObj),
				// 	$location.path('/clients');
				// };

			}
		]);
}());