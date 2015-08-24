(function() {
	angular.module('ClientTracker')
		.controller('SingleClientController', ['$scope', '$location', '$http', '$routeParams', '$cookieStore','ClientService','UserService','AuthService',
			function($scope, $location, $http, $routeParams, $cookieStore, ClientService,UserService, AuthService) {
				var routeParams = $routeParams.cid;
				// var refClient = new Firebase(fb.url + '/clients/' + routeParams);

				// var client = $firebaseObject(refClient);
				$scope.client = ClientService.getSingleClient(routeParams);
				var client = ClientService.getSingleClient(routeParams);
				// console.log(ClientService.getSingleClient(routeParams));
				
				$scope.users = UserService.allUsers;
				
				var users = UserService.allUsers;
				$scope.user = AuthService.userInfo();
				

				$scope.readyEdit = function() {
					$(".edit-client-input").removeClass('hidden');
					$('.client-info-text').addClass('hidden');
					$("#editClose").removeClass('hidden');
					$("#editOpen").addClass('hidden');
				}
				$scope.closeEdit = function() {
					$(".edit-client-input").addClass('hidden');
					$('.client-info-text').removeClass('hidden');
					$("#editClose").addClass('hidden');
					$("#editOpen").removeClass('hidden');
				}
				
				$scope.deleteClient = function() {
					ClientService.deleteClient(routeParams);
					$location.path('/clients');
					
				}
				
				$scope.deactivateClient = function(){
					var sales = _.findWhere(users,{username: client.sales_rep});
					var csm = _.findWhere(users,{username: client.client_service_manager});
					ClientService.deactivateClient(routeParams, sales.$id, csm.$id);
					// $location.path('/clients');
				}
				
				$scope.activateClient = function(){
					var sales = _.findWhere(users,{username: client.sales_rep});
					var csm = _.findWhere(users,{username: client.client_service_manager});
					ClientService.activateClient(routeParams, sales.$id, csm.$id);
					// $location.path('/clients');
				}

				$scope.updateClient = function(client) {
					var x = $(".salesRep").attr('checked');
					var y = $(".serviceMan").attr('checked')
					if($(".salesRep").attr('checked')){
							client.sales_rep =x.val(); 
					}
					if( $(".serviceMan").attr('checked')){
							client.client_service_manager = y.val()
					}
					ClientService.saveClient(client);
					$location.path('/clients');


				}
				// $scope.salesReps = UserService.getByDept('sales');
	



				// });
			}


			// }
		]);
}());