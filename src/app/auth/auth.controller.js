(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$firebaseAuth'];

  function AuthController($firebaseAuth) {
  	var vm = this;
  	var firebaseReference = new Firebase('https://ready-to-serve.firebaseio.com/');
  	var firebaseAuthObject = $firebaseAuth(firebaseReference);

  	vm.user = {
  		email: '',
  		password: ''
  	};

  	vm.register = register;
  	vm.login 		= login;

  	function register(user) {
  		return firebaseAuthObject.$createUser(user)
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
  			})
  			.catch(function(error) {
  				console.log(error);
  			});
  	}

  }

})();
