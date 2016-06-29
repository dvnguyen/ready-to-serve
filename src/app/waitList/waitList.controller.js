(function() {
  'use strict';

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['FIREBASE_URL', 'partyService'];

  function WaitListController(FIREBASE_URL, partyService) {
		var vm               = this;
		var fireTextMessages = new Firebase(FIREBASE_URL + 'textMessages');

		vm.newParty        = new partyService.Party();
		vm.parties         = partyService.parties;
		vm.addParty        = addParty;
		vm.removeParty     = removeParty;
		vm.sendTextMessage = sendTextMessage;
		vm.toggleDone			 = toggleDone;

  	function addParty() {
  		vm.parties.$add(vm.newParty);
  		vm.newParty = new partyService.Party();
  	}

  	function removeParty(party) {
  		vm.parties.$remove(party);
  	}

  	function sendTextMessage(party) {
  		var newTextMessage = {
				name        : party.name,
				phoneNumber : party.phone,
				size        : party.size
  		};

  		fireTextMessages.push(newTextMessage);
  		party.notified = true;
  		vm.parties.$save(party);
  	}

  	function toggleDone(party) {
  		vm.parties.$save(party);
  	}
  }
})();
