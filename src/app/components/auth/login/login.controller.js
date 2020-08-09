// Login contoller which utilizes AuthService to login users
function LoginController(AuthService, $state) {
  var ctrl = this;
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = {
      email: '',
      password: ''
    };
  };
  ctrl.loginUser = function (event) {
    return AuthService
      .login(event.user)
      .then(function () {
        $state.go('phenoTable'); // Reroute to main pehnotable page
      }, function (reason) {
        ctrl.error = reason.message;
      });
  };
}

angular
  .module('auth')
  .controller('LoginController', LoginController);
