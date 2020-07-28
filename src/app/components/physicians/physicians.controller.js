function PhysiciansController($mdDialog) {
    var ctrl = this;
    var originatorEv
    console.log("Test2")

    ctrl.openMenu = function($mdMenu, ev) {
        console.log("Hello")
        originatorEv = ev;
        $mdMenu.open(ev);
    }
}

angular
  .module('physicians')
  .controller('PhysiciansController', PhysiciansController);