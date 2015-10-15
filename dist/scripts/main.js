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
(function() {
	'use strict';
	angular.module('ClientTracker')
		.service('AuthService', ['$firebaseArray', '$firebaseObject', '$location', '$firebaseAuth',  function($firebaseArray, $firebaseObject, $location, $firebaseAuth) {
			// var loggedInUser = getAuth();

			var ref = new Firebase("https://luminous-torch-5681.firebaseio.com");
			// var users = UserService.allUsers;

			this.user = ref.getAuth();
			if (this.user) {
				var id = this.user.uid;
			};

			var self = this;
			// console.log(id);

			this.userInfo = function() {
				var userRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/" + id);
				return $firebaseObject(userRef);
				console.log($firebaseObject(userRef));

			}

			this.login = function(email, password) {
				
					ref.authWithPassword({
						email: email,
						password: password
					}, function(error, authData) {
						if (error) {
							console.log("Login Failed!", error);
							alert(error);
							
						} else {
							console.log("Authenticated successfully with payload:", authData);
							// $location.path('/');
							location.reload();
						}
					});
			}
			this.logOut = function() {
					ref.unauth();
					location.reload();
				}
				//end of service
		}])
}())
(function() {
	'use strict';
	angular.module('ClientTracker')
		.service('UserService', ['$firebaseArray', '$firebaseObject', '$location', 'AuthService', function($firebaseArray, $firebaseObject, $location, AuthService) {

			var self = this;

			var ref = new Firebase("https://luminous-torch-5681.firebaseio.com");

			var userProfiles = new Firebase("https://luminous-torch-5681.firebaseio.com/users");


			// // TODO: fix for one variable
			var userProfile;
			var singleUser;

			var user = AuthService.user;
			// this.userInfo = AuthService.userInfo;
			// console.log(this.userInfo);

			this.allUsers = $firebaseArray(userProfiles);
			// var allUsers = $firebaseArray(userProfiles);
			// console.log(this.allUsers)

			this.addUser = function(user) {
				ref.createUser({
					email: user.email,
					password: user.password
				}, function(error, userData) {
					if (error) {
						console.log("Error creating user:", error);
					} else {
						console.log(userData);
						user.status = 'active';
						user.accounts_inactive = 0;
						user.accounts_active = 0;
						userProfiles.child(userData.uid).set(user)
					}
				});
			};

			this.getUsers = function() {
				return $firebaseArray(userProfiles);
			};
			this.deleteUser = function(email, password) {
					ref.removeUser({
						email: email,
						password: password
					}, function(error) {
						if (error) {
							switch (error.code) {
								case "INVALID_USER":
									console.log("The specified user account does not exist.");
									break;
								case "INVALID_PASSWORD":
									console.log("The specified user account password is incorrect.");
									break;
								default:
									console.log("Error removing user:", error);
							}
						} else {
							console.log("User account deleted successfully!");
						}
					});

				}
				// this.getByDept = function(dept){
				// 	var matches = []
				// 	var userList = $firebaseArray(userProfiles)
				// 	userList.$loaded()
				// 	.then(function(){
				// 		userList.forEach(function(x){
				// 			if(x.department == dept){
				// 				matches.push(x);
				// 				console.log(x);	
				// 			}
				// 		})
				// 	})
				// 	console.log(matches);
				// 	
				// };

			// this.userLogin = function(email, password) {
			// 	ref.authWithPassword({
			// 		email: email,
			// 		password: password
			// 	}, function(error, authData) {
			// 		if (error) {
			// 			console.log("Login Failed!", error);
			// 		} else {
			// 			console.log("Authenticated successfully with payload:", authData);
			// 			// $("#login").removeClass('hidden');
			//             // $("#logout").addClass('hidden');
			// 			self.loggedInUser = userProfiles.child(authData.uid);
			// 		}
			// 	});
			// };

			// this.userLogOut = function(){
			// 	ref.unauth();
			// };

			this.getSingleUser = function(id) {
				userProfile = new Firebase("https://luminous-torch-5681.firebaseio.com/users/" + id);
				singleUser = $firebaseObject(userProfile);
				return $firebaseObject(userProfile);
			};

			this.saveUser = function(profile) {
				profile.$save();
			};




			//end of factory
		}])
}())
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
(function() {
	'use strict';
	angular.module('ClientTracker')
		.service('MessageService', ['$firebaseArray', '$firebaseObject', '$location','AuthService', function($firebaseArray, $firebaseObject, $location, AuthService) {
			// var loggedInUser = getAuth();
			
			// var currentUser = AuthService.userInfo;
			// var messagesRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/"+ currentUser.$id+'/messages');
			// var currentUserMessages = $firebaseArray(messagesRef);
			// console.log(currentUserMessages);
			var userRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/");
			
			this.userMessages = function(userId){
				var userMessageRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/" + userId +"/messages");
				
				return $firebaseArray(userMessageRef);
				
			};
			
			this.notify = function(id, messageObj){
				console.log(id);	
				userRef.child(id).child("messages").push(messageObj);
			};
			
			this.markAsRead = function(userid, messageId){
				var messageRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/"+ userid + '/messages/'+ messageId);
				
				messageRef.child('status').set('read');
				// messageRef.child("new").child(messageObj.$id).remove();
				// messageRef.child("read").push(messageObj);
				
			};
			
			this.delete = function(userid, messageId){
				var messageRef = new Firebase("https://luminous-torch-5681.firebaseio.com/users/"+ userid + '/messages/'+ messageId);
				
				messageRef.remove();
			};
			
			

			
				//end of service
		}])
}())
(function() {
	angular.module('ClientTracker')
		.controller('UserController', ['$scope','$location', 'UserService','AuthService','$firebaseAuth',
			function($scope,$location, UserService, AuthService, $firebaseAuth) {
				
				
				var ref = new Firebase("https://luminous-torch-5681.firebaseio.com");
				// location.reload();
				$scope.users = UserService.allUsers;
				
				$scope.sortType = 'Last_name'; // set the default sort type
				$scope.sortReverse = false; // set the default sort order
				$scope.searchUsers = ''; // set the default search/filter term
				
				
				$scope.currentUser = AuthService.user;
				var currentUser = AuthService.user;
				// console.log(AuthService.user)
				$scope.userInfo = AuthService.userInfo();
				// console.log(AuthService.userInfo())
			
				$scope.registerUser = function(user) {
					UserService.addUser(user)
					$location.path('users/');
				};

				$scope.userLogin = function(email, password) {
					AuthService.login(email,password);
					
					$location.path('/');
					// location.reload();
				};
				$scope.logOut = function(){
					AuthService.logOut();
					$scope.currentUser = null;
					
					$location.path('/login');
				}
				
				
			}
		]);
}());
(function() {
	angular.module('ClientTracker')
		.controller('SingleUserController', ['$scope', '$location', '$http',  '$cookieStore', 'fb','$routeParams', 'UserService','AuthService',
			function($scope, $location, $http,$cookieStore, fb, $routeParams, UserService,AuthService) {

				// var routeParams = $routeParams.cid;

				var userProfile = new Firebase("https://luminous-torch-5681.firebaseio.com/users/");
				// var inactiveUser = new Firebase('https://luminous-torch-5681.firebaseio.com/users/inactive/'+ routeParams);

				// user = AuthService.user;
                
                $scope.user = UserService.getSingleUser($routeParams.cid)
            
			    $scope.currentUser = AuthService.user;
				$scope.userInfo = AuthService.userInfo();
				
                // $scope.userDisabled = $firebaseObject(inactiveUser);
				// 
                // userDisabled = $firebaseObject(inactiveUser);
                
                // console.log(userDisabled);
                // 
                
                
                // thisUser = $firebaseObject(userProfile);


				$scope.readyEdit = function() {
					$(".edit-user-input").removeClass('hidden');
					$('.info-text').addClass('hidden');
				};
				$scope.closeEdit = function() {
					$(".edit-user-input").addClass('hidden');
					$('.info-text').removeClass('hidden');
				};

				$scope.submitEdit = function(userProfile) {
					UserService.saveUser(userProfile);
					// userProfile.$save();
					$location.path('/users');
				};
				// $scope.deactivateUser = function() {
				// 	UserService.deactivateUser();
				// 	$location.path('/users');
				// 	// console.log(thisUser);
				// 	// var userProfile = {
				// 	// 	first_name:thisUser.first_name || ''  ,
				// 	// 	last_name:thisUser.last_name || ''  ,
				// 	// 	username:thisUser.username || ''  ,
				// 	// 	email:thisUser.email || '',
				// 	// 	phone:thisUser.phone || ''  ,
				// 	// 	department:thisUser.department || '' ,
				// 	// 	permissions:thisUser.permissions || '' 
				// 	// }
				// 	// inactiveUsers.push(userProfile);
                //     // $scope.destroyUser();
				// };


				$scope.destroyUser = function(id,email,password) {
					UserService.deleteUser(email, password)
					var onComplete = function(error) {
						if (error) {
							console.log('Synchronization failed');
						} else {
							console.log('Synchronization succeeded');

						}
					};
					userProfile.child(id).remove(onComplete);
					$location.path('/users');
				};
			}
		]);
}());
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
					MessageService.notify(csm.$id,messageObj),
					$location.path('/clients');
				};

			}
		]);
}());
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
(function(){
   angular.module('ClientTracker')
    .controller('NavController',['$scope','$location','$http','$cookieStore', 'UserService','AuthService',
      function($scope, $location, $http, $cookieStore, UserService, AuthService){
        //   userServ.checkUser();
        //   var currentUser = Parse.User.current();
        //   if (currentUser) {
              // do stuff with the user
            //   console.log('hey current user');
            //   $("#login").addClass('hidden');
            //   $("#logout").removeClass('hidden');
            // var checkUser = function(){
            //     if (UserService.checkUser() ==false){
            //         $location.path('/login')
            //     }
            // }
            // checkUser();
            // 
              $scope.currentUser = AuthService.userInfo
              $scope.logout= function(){
                //   console.log('hi im trying to logout');
                  AuthService.userLogOut();
                      $("#login").removeClass('hidden');
                      $("#logout").addClass('hidden');
                      $location.path('/login')
                      
                  
              };
        //   } else {
              // show the signup or login page
            //   $("#login").removeClass('hidden');
            //   $("#logout").addClass('hidden');
            //   $location.path('/login');
            //   console.log('LOGIN FIRST!');
        //   }
          
          
		
    }
  ]);
}());

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