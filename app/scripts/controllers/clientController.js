(function() {
	angular.module('ClientTracker')
		.controller('ClientController', ['$scope', '$location', '$http', '$cookieStore', 'ClientService', 'UserService', 'AuthService','MessageService',
			function($scope, $location, $http, $cookieStore, ClientService, UserService, AuthService, MessageService) {

				$scope.clients = ClientService.getClients();
				
				$scope.users = UserService.allUsers;
				users = UserService.allUsers;
				// console.log( users);
				
				var salesRep = AuthService.userInfo();
				
				$scope.currentUser = AuthService.userInfo();
				$scope.sortType = 'company_name'; // set the default sort type
				$scope.sortReverse = false; // set the default sort order
				$scope.searchClients = ''; // set the default search/filter term
				
				$scope.toPartTwo = function() {
					$('#partTwo').removeClass('hidden');
					$('#partOne').addClass('hidden');
				};
				$scope.toPartOne = function() {
					$('#partTwo').addClass('hidden');
					$('#partOne').removeClass('hidden');
				};

				$scope.addNewClient = function(client,userId,csmId) {
					client.sales_rep = salesRep.username;
					client.sales_key = salesRep.$id;
					var date = new Date().toString();
					console.log(date);
					client.contract_added_date = date;
					
					var csm = _.findWhere(users,{username:client.client_service_manager});
					console.log(csm);
					
					ClientService.addClient(client, salesRep.$id, csm.$id)
					
					var messageObj ={
						type:"client added",
						subject:'Client added by '+ client.sales_rep,
						body:'You have been assigned to ' + client.company_name + ' as their new Client Service Manager.',
						status:'unread',
						sales_rep_key: salesRep.$id
					};
					// MessageService.notify(csm.$id,messageObj),
					$location.path('/clients');
				};

			}
		]);
}());