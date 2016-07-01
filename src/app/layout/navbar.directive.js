(function() {
	'use strict';

	angular
		.module('app.layout')
		.directive('rsNavbar', rsNavbar);

	function rsNavbar() {
		// return directive definition object
		return {
		  templateUrl: 'app/layout/navbar.html',
		  restrict: 'E',
		  controller: NavbarController,
		  controllerAs: 'vm'
		};
	}

	NavbarController.$inject = ['$location', 'authService'];

	function NavbarController($location, authService) {
		var vm = this;

		vm.isLoggedIn = authService.isLoggedIn;
		vm.logout     = logout;

		function logout() {
			authService.logout();
			$location.path('/');
		}
	}

})();
