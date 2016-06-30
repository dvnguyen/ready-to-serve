(function() {
	'use strict';

	angular
		.module('app.layout')
		.directive('rsNavbar', rsNavbar);

	function rsNavbar() {
		// return directive definition object
		return {
		  templateUrl: 'app/layout/navbar.html',
		  restrict: 'E'
		};

	}

})();
