(function() {
	angular.module('ClientTracker')
		.controller('SingleClientController', ['$scope', '$location', '$http', '$routeParams', '$cookieStore','ClientService','UserService',
			function($scope, $location, $http, $routeParams, $cookieStore, ClientService,UserService) {
				var routeParams = $routeParams.cid;
				// var refClient = new Firebase(fb.url + '/clients/' + routeParams);

				// var client = $firebaseObject(refClient);
				$scope.client = ClientService.getSingleClient(routeParams);
				console.log(ClientService.getSingleClient(routeParams));
				
				$scope.users = UserService.allUsers;
				

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