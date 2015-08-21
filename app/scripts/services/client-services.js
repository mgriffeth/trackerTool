(function() {
	angular.module('ClientTracker')
		.service('ClientService', ['$firebaseArray', '$firebaseObject', 'AuthService', function($firebaseArray, $firebaseObject, AuthService) {
			var user = AuthService.userInfo();
			var refClients = new Firebase("https://luminous-torch-5681.firebaseio.com/clients");
			var ref = new Firebase("https://luminous-torch-5681.firebaseio.com/");

			this.getClients = function() {
				return $firebaseArray(refClients);
			};
			this.getSingleClient = function(id) {
				var refClient = new Firebase("https://luminous-torch-5681.firebaseio.com/clients/" + id);
				return $firebaseObject(refClient);
			};
			this.addClient = function(client, userId, csmId) {
				refClients.push(client);
				ref.child('users').child(userId).child('accounts_active').transaction(function(x) {
					return x + 1;
				});
				ref.child('users').child(csmId).child('accounts_active').transaction(function(x) {
					return x + 1;
				});
			};
			
			this.saveClient = function(client) {
				client.$save();
			};
			this.deleteClient = function(id) {
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
			
			this.deactivateClient = function(id, userId, csmId){
				var refClient = new Firebase("https://luminous-torch-5681.firebaseio.com/clients/" + id);
				refClient.child('status').transaction(function(x){
					return 'deactivated'
				});
				ref.child('users').child(userId).child('accounts_active').transaction(function(x) {
					return x - 1;
				});
				ref.child('users').child(userId).child('accounts_inactive').transaction(function(x) {
					return x + 1;
				});
				ref.child('users').child(csmId).child('accounts_active').transaction(function(x) {
					return x - 1;
				});
				ref.child('users').child(csmId).child('accounts_inactive').transaction(function(x) {
					return x + 1;
				});
				
			};
			
			this.activateClient = function(id, userId, csmId){
				var refClient = new Firebase("https://luminous-torch-5681.firebaseio.com/clients/" + id);
				refClient.child('status').transaction(function(x){
					return 'active'
				});
				ref.child('users').child(userId).child('accounts_active').transaction(function(x) {
					return x + 1;
				});
				ref.child('users').child(userId).child('accounts_inactive').transaction(function(x) {
					return x - 1;
				});
				ref.child('users').child(csmId).child('accounts_active').transaction(function(x) {
					return x + 1;
				});
				ref.child('users').child(csmId).child('accounts_inactive').transaction(function(x) {
					return x - 1;
				});
				
			};



		}])
}())