// Register controller which uses authservice to register new users
function RegisterController(AuthService, $state) {
  var ctrl = this;
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = {
      email: '',
      password: ''
    };
  };
  ctrl.createUser = function (event) {
    return AuthService
      .register(event.user)
      .then(function () {
        $state.go('phenoTable'); //reroute to main phenotable page
      }, function (reason) {
        ctrl.error = reason.message;
      });
  };
}

angular
  .module('auth')
  .controller('RegisterController', RegisterController);
