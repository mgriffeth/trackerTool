(function() {
	angular.module('ClientTracker')
		.service('ClientService',['$firebaseArray','$firebaseObject', 'AuthService' ,function($firebaseArray, $firebaseObject,AuthService){
			var user = AuthService.userInfo();
			var refClients = new Firebase("https://luminous-torch-5681.firebaseio.com/clients");
			
			this.getClients = function(){
				return $firebaseArray(refClients);
			};
			this.getSingleClient = function (id){
				var refClient = new Firebase("https://luminous-torch-5681.firebaseio.com/clients/" + id);
				return $firebaseObject(refClient);
			};
			this.addClient = function(client){
				refClients.push(client);
			};
			this.saveClient = function(client){
				client.$save();
			};
			this.deleteClient = function(id){
				var refClient = new Firebase("https://luminous-torch-5681.firebaseio.com/clients/" + id);
				var onComplete = function(error) {
					if (error) {
						console.log('Synchronization failed');
					} else {
						console.log('Synchronization succeeded');
						
					}
				};
				refClient.remove(onComplete);
			};
			
			
	}])
}())