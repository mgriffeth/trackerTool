(function() {
	// Parse.initialize("XRUAeOde1Oyyj88SvGCC4AJinUSEKxe1RxRyC81U", "4v6sVnankHUsy5TB8LvutwiA4iTWOA4GhtAuY307");

	angular.module('ClientTracker', ['ngRoute', 'ngCookies', 'firebase'])
		.constant('fb', {
			url: "https://luminous-torch-5681.firebaseio.com"
				//   headers:{
				//   "X-Parse-Application-Id" : "XRUAeOde1Oyyj88SvGCC4AJinUSEKxe1RxRyC81U",
				// 	"X-Parse-REST-API-Key" : "uDvycoMFy1wO3DXNstIbEcKDhBVB87tCI7dxGOyM",
				// 	"Content-Type" : "application/json"
				//   }

		})
		.config(function($routeProvider, $locationProvider) {

			$routeProvider.when('/', {
				templateUrl: 'templates/home-view.html',
				controller: 'HomeController'
			});
			$routeProvider.when('/clients', {
				templateUrl: 'templates/clients-view.html',
				controller: 'ClientController'
			});

			$routeProvider.when('/login', {
				templateUrl: 'templates/login-view.html',
				controller: 'UserController'
			});

			$routeProvider.when('/add-client', {
				templateUrl: 'templates/add-client-view.html',
				controller: 'ClientController'
			});

			$routeProvider.when('/add-user', {
				templateUrl: 'templates/add-user-view.html',
				controller: 'UserController'
			});

			$routeProvider.when('/users', {
				templateUrl: 'templates/users-view.html',
				controller: 'UserController'
			});
			
			$routeProvider.when('/users-deactivated', {
				templateUrl: 'templates/disabled-users-view.html',
				controller: 'UserController'
			});

			$routeProvider.when('/single-user/:cid', {
				templateUrl: 'templates/single-user-view.html',
				controller: 'SingleUserController'
			});
			
			$routeProvider.when('/single-disabled-user/:cid', {
				templateUrl: 'templates/single-deactivated-user-view.html',
				controller: 'SingleUserController'
			});

			$routeProvider.when('/single-client/:cid', {
				templateUrl: 'templates/single-client-view.html',
				controller: 'SingleClientController'
			});

		});
}())