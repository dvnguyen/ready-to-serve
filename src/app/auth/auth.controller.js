(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', '$firebaseAuth', 'FIREBASE_URL', 'authService'];

  function AuthController($location, $firebaseAuth, FIREBASE_URL, authService) {
  	var vm = this;
  	var firebaseReference = new Firebase('https://ready-to-serve.firebaseio.com/');
  	var firebaseAuthObject = $firebaseAuth(firebaseReference);

  	vm.user = {
  		email: '',
  		password: ''
  	};

		vm.register = register;
		vm.login    = login;
		vm.logout   = logout;

  	function register(user) {
  		return authService.register(user)
  			.then(function() {
  				vm.login(user);
  			})
  			.catch(function(error) {
  				console.log(error);
  			});
  	}

  	function login(user) {
  		return firebaseAuthObject.$authWithPassword(user)
  			.then(function(loggedInUser) {
  				console.log(loggedInUser);
  				$location.path('/waitlist');
  			})
  			.catch(function(error) {
  				console.log(error);
  			});
  	}

  	function logout() {
  		console.log('Logging out.');
  		firebaseAuthObject.$unauth();
  		$location.path('/');
  	}

  }

})();
