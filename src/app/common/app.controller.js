// App contoller, for use in the future
function AppController(AuthService, $state) {
  var ctrl = this;
  ctrl.user = AuthService.getUser();
  ctrl.logout = function () {
  AuthService.logout().then(function () {
      $state.go('login');
    });
  };
}

// Register controller to the app
angular
  .module('common')
  .controller('AppController', AppController);
