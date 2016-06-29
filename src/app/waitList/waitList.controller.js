(function() {
  'use strict';

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['$firebaseArray', 'FIREBASE_URL'];

  function WaitListController($firebaseArray, FIREBASE_URL) {
		var vm               = this;
		var fireParties      = new Firebase(FIREBASE_URL + 'parties');
		var fireTextMessages = new Firebase(FIREBASE_URL + 'textMessages');

  	function Party() {
			this.name     = '';
			this.phone    = '';
			this.size     = '';
			this.done     = false;
			this.notified = false;
  	}

		vm.newParty        = new Party();
		vm.parties         = $firebaseArray(fireParties);
		vm.addParty        = addParty;
		vm.removeParty     = removeParty;
		vm.sendTextMessage = sendTextMessage;
		vm.toggleDone			 = toggleDone;

  	function addParty() {
  		vm.parties.$add(vm.newParty);
  		vm.newParty = new Party();
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
