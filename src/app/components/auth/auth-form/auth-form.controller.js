// Controller for authform to pass bound data to appropriate login or register controllers
function AuthFormController() {
  var ctrl = this;
  ctrl.$onChanges = function (changes) {
    if (changes.user) {
      ctrl.user = angular.copy(ctrl.user);
    }
  };
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
        user: ctrl.user
      }
    });
  };
}

angular
  .module('auth')
  .controller('AuthFormController', AuthFormController);
