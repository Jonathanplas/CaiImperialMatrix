var register = {
  templateUrl: './register.html',
   controller: 'RegisterController'
};

angular
  .module('auth')
  .component('register', register)
  .config(function ($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        component: 'register',
        parent: 'auth'
      });
  });
