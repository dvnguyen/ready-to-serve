(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('textMessageService', textMessageService);

  textMessageService.$inject = ['firebaseDataService'];

  function textMessageService(firebaseDataService) {
  	var service = {
  		sendTextMessage: sendTextMessage
  	};

  	return service;

  	//////////////////

  	function sendTextMessage(party, parties) {
  		var newTextMessage = {
				name        : party.name,
				phoneNumber : party.phone,
				size        : party.size
  		};

  		firebaseDataService.textMessages.push(newTextMessage);
  		party.notified = true;
  		parties.$save(party);
  	}
  }

})();
